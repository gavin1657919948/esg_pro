const promisify = require('bluebird').promisify
import { kpiA11ANonRoadVehicleCalulate_CN, kpiA12ANonRoadVehicleCalulate_CN } from '../../utils'

module.exports = function(NonRoadVehicle_CN) {
  NonRoadVehicle_CN.inputData = async function(data, id) {
    console.log('id=', id)
    console.log(data)
    if (!id) throw new Error('please login first!')
    //nonRoadVehicleTypeId,nrRatedPowerTypeId,nrEmissionStandardId,efValue1_1,efValue1_2;
    let key1
    let systemDomainId = 'default'
    let systemUserId = id
    let injectId = data.id
    let serialNumber = data.serialNumber
    let licensePlateNumber = data.licensePlateNumber
    let nrVehicleTypeId = data.nrVehicleTypeId
    let nrRatedPowerTypeId = data.nrRatedPowerTypeId
    let nrEmissionStandardId = data.nrEmissionStandardId

    let EfValue = NonRoadVehicle_CN.app.models.EfValue
    let NrVehicleType = NonRoadVehicle_CN.app.models.NrVehicleType_CN
    let NrRatedPowerType = NonRoadVehicle_CN.app.models.NrRatedPowerType_CN
    let NrEmissionStandard = NonRoadVehicle_CN.app.models.NrEmissionStandard_CN
    let NonRoadVehicleFuel = NonRoadVehicle_CN.app.models.NonRoadVehicleFuel_CN
    let Emission = NonRoadVehicle_CN.app.models.Emission
    let GasEmission = NonRoadVehicle_CN.app.models.GasEmission

    let qNrVehicleTypeFindById = promisify(NrVehicleType.findById, { context: NrVehicleType })
    let qNrRatedPowerTypeFindById = promisify(NrRatedPowerType.findById, { context: NrRatedPowerType })
    let qNrEmissionStandardFindById = promisify(NrEmissionStandard.findById, { context: NrEmissionStandard })

    let qNonRoadVehicleCreate = promisify(NonRoadVehicle_CN.create, { context: NonRoadVehicle_CN })

    let nrVehicleType = await qNrVehicleTypeFindById(nrVehicleTypeId)
    let nrRatedPowerType = await qNrRatedPowerTypeFindById(nrVehicleTypeId)
    let nrEmissionStandard = await qNrEmissionStandardFindById(nrVehicleTypeId)

    if (nrVehicleType.name != '三轮农用运输车' && nrVehicleType.name != '四轮农用运输车')
      key1 = nrVehicleType.name + '-' + nrRatedPowerType.name + '-' + nrEmissionStandard.name
    key1 = nrVehicleType.name + '-' + nrEmissionStandard.name

    let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    let efValue1_1 = await qEfValueFindByKey({ where: { key: key1, group: 'nonRoadVehicle_CN_kpiA1_1' } })
    if (!efValue1_1) throw new Error("sorry,the efValue1_1 doesn't exsist!")
    if (efValue1_1.value.condensiblepm == 'none')
      throw new Error('this condensiblepm factor of EF DataBase is not completed!')
    let nonRoadVehicle = await qNonRoadVehicleCreate({
      id: injectId,
      serialNumber: serialNumber,
      licensePlateNumber: licensePlateNumber,
      nrVehicleTypeId: nrVehicleTypeId,
      nrRatedPowerTypeId: nrRatedPowerTypeId,
      nrEmissionStandardId: nrEmissionStandardId,
      efValue1_1: efValue1_1.value,
      systemDomainId: systemDomainId,
      systemUserId: systemUserId,
    })
    let nonRoadVehicleFuel_CNs = data.nonRoadVehicleFuel_CNs
    console.log('nonRoadVehicleFuel_CNs:', nonRoadVehicleFuel_CNs)
    let idCollection = []
    for (let i in nonRoadVehicleFuel_CNs) {
      let timeStartValue = nonRoadVehicleFuel_CNs[i].timeStartValue
      let timeEndValue = nonRoadVehicleFuel_CNs[i].timeEndValue
      let timeUnit = nonRoadVehicleFuel_CNs[i].timeUnit
      let year = nonRoadVehicleFuel_CNs[i].year
      let tripDistance = nonRoadVehicleFuel_CNs[i].tripDistance
      let fuelConsumption = nonRoadVehicleFuel_CNs[i].fuelConsumption
      let emissionData = kpiA11ANonRoadVehicleCalulate_CN(
        nrVehicleType.name,
        efValue1_1.value,
        tripDistance,
        fuelConsumption
      )
      let qEmissionCreate = promisify(Emission.create, { context: Emission })
      let emission = await qEmissionCreate({
        nox: emissionData.emission_NOx,
        sox: emissionData.emission_SOx,
        co: emissionData.emission_CO,
        pm2_5: emissionData.emission_PM2_5,
        pm: emissionData.emission_PM,
      })
      let emissionId = emission.id

      let qNonRoadVehicleFuelCreate = promisify(NonRoadVehicleFuel.create, { context: NonRoadVehicleFuel })
      let nonRoadVehicleFuel_CN = await qNonRoadVehicleFuelCreate({
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        tripDistance: tripDistance,
        fuelConsumption: fuelConsumption,
        nonRoadVehicle_CNId: nonRoadVehicle.id,
        emissionId: emissionId,
      })
      idCollection.push(nonRoadVehicleFuel_CN.id)
    }
    //暂时设定燃料类型为"柴油"
    let fuelTypeName = '柴油'
    let key2 = nrVehicleType.name + '-' + fuelTypeName
    console.log('key2:', key2)
    let efValue1_2 = await qEfValueFindByKey({ where: { key: key2, group: 'nonRoadVehicle_CN_kpiA1_2' } })
    //若找不到对应的ef，返回-1
    if (!efValue1_2) return -1
    //若对应的记录不完整，返回-2
    if (
      efValue1_2.value.co2_EmissionFactor === 'none' ||
      efValue1_2.value.ch4_EmissionFactor === 'none' ||
      efValue1_2.value.ch4_GWP === 'none' ||
      efValue1_2.value.n2o === 'none' ||
      efValue1_2.value.n2o_GWP === 'none'
    )
      return -2
    let qUpdateNonRoadVehicle = promisify(NonRoadVehicle_CN.upsert, { context: NonRoadVehicle_CN })
    let nonRoadVehicle_update = await qUpdateNonRoadVehicle(
      { id: nonRoadVehicle.id, efValue1_2: efValue1_2.value },
      { validate: false }
    )
    for (let i in nonRoadVehicleFuel_CNs) {
      let consumption = nonRoadVehicleFuel_CNs[i].fuelConsumption
      let qGasEmissionCreate = promisify(GasEmission.create, { context: GasEmission })
      let gasEmissionData = kpiA12ANonRoadVehicleCalulate_CN(efValue1_2.value, consumption)
      let gasEmission = await qGasEmissionCreate({
        co2: gasEmissionData.co2,
        ch4: gasEmissionData.ch4,
        n2o: gasEmissionData.n2o,
      })
      let gasEmissionId = gasEmission.id
      let qNonRoadVehicleFuelUpdate = promisify(NonRoadVehicleFuel.upsert, { context: NonRoadVehicleFuel })
      let nonRoadVehicleFuel_update = await qNonRoadVehicleFuelUpdate(
        {
          id: idCollection[i],
          gasEmissionId: gasEmissionId,
        },
        { validate: false }
      )
    }
    return 'create success!'
  }
  NonRoadVehicle_CN.remoteMethod('inputData', {
    accepts: [
      { arg: 'data', type: 'object', http: { source: 'body' } },
      {
        arg: 'id',
        type: 'any',
        http: ctx => ctx.req.accessToken && ctx.req.accessToken.userId,
      },
    ],
    returns: { arg: 'result', type: 'string' },
  })
}
