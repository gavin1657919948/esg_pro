const promisify = require('bluebird').promisify
const _ = require('lodash')
import { kpiA11ANonRoadVehicleCalulate_CN, kpiA12ANonRoadVehicleCalulate_CN } from '../../utils'
module.exports = function(NonRoadVehicle_CN) {
  NonRoadVehicle_CN.updateData = async function(data, id) {
    console.log('id=', id)
    if (!id) throw new Error('please login first!')
    //--------------kpi A1.1业务代码-----------------
    let key1
    let EfValue = NonRoadVehicle_CN.app.models.EfValue
    let NonRoadVehicleFuel = NonRoadVehicle_CN.app.models.NonRoadVehicleFuel_CN
    let NrVehicleType = NonRoadVehicle_CN.app.models.NrVehicleType_CN
    let NrRatedPowerType = NonRoadVehicle_CN.app.models.NrRatedPowerType_CN
    let NrEmissionStandard = NonRoadVehicle_CN.app.models.NrEmissionStandard_CN
    let Emission = NonRoadVehicle_CN.app.models.Emission
    let GasEmission = NonRoadVehicle_CN.app.models.GasEmission
    //整合数据
    let nonRoadVehicle_CNId = data.id
    let qNonRoadVehicleFindById = promisify(NonRoadVehicle_CN.findById, { context: NonRoadVehicle_CN })
    let nonRoadVehicle = await qNonRoadVehicleFindById(nonRoadVehicle_CNId)
    let nonRoadVehicle_origin = nonRoadVehicle.__data
    const nrVehicleTypeId_primary = nonRoadVehicle_origin.nrVehicleTypeId
    const nrRatedPowerTypeId_primary = nonRoadVehicle_origin.nrRatedPowerTypeId
    const nrEmissionStandardId_primary = nonRoadVehicle_origin.nrEmissionStandardId
    const systemUserId = nonRoadVehicle_origin.systemUserId

    let dataArr = data.nonRoadVehicleFuel_CNs
    let originArr = nonRoadVehicle_origin.nonRoadVehicleFuel_CNs
    let mergeData = _.merge(nonRoadVehicle_origin, data)
    let list = []
    if (dataArr instanceof Array) {
      list = dataArr.map(function(val1) {
        if (val1.id) {
          return originArr.find(function(val2) {
            if (val1.id == val2.id) {
              return _.merge(val2, val1)
            }
          })
        } else {
          return val1
        }
      })
    } else {
      originArr.map(function(val3) {
        list.push(val3)
      })
    }
    mergeData.nonRoadVehicleFuel_CNs = list
    //更新数据
    let serialNumber = mergeData.serialNumber
    let licensePlateNumber = mergeData.licensePlateNumber
    let nrVehicleTypeId = mergeData.nrVehicleTypeId
    let nrRatedPowerTypeId = mergeData.nrRatedPowerTypeId
    let nrEmissionStandardId = mergeData.nrEmissionStandardId
    let efValue1_1 = mergeData.efValue1_1
    let efValue1_2 = mergeData.efValue1_2

    let qNrVehicleTypeFindById = promisify(NrVehicleType.findById, { context: NrVehicleType })
    let qNrRatedPowerTypeFindById = promisify(NrRatedPowerType.findById, { context: NrRatedPowerType })
    let qNrEmissionStandardFindById = promisify(NrEmissionStandard.findById, { context: NrEmissionStandard })
    let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    let nrVehicleType = await qNrVehicleTypeFindById(nrVehicleTypeId)
    let nrRatedPowerType = await qNrRatedPowerTypeFindById(nrVehicleTypeId)
    let nrEmissionStandard = await qNrEmissionStandardFindById(nrVehicleTypeId)

    if (nrVehicleType.name != '三轮农用运输车' && nrVehicleType.name != '四轮农用运输车')
      key1 = nrVehicleType.name + '-' + nrRatedPowerType.name + '-' + nrEmissionStandard.name
    key1 = nrVehicleType.name + '-' + nrEmissionStandard.name

    if (
      nrVehicleTypeId != nrVehicleTypeId_primary ||
      nrRatedPowerTypeId != nrRatedPowerTypeId_primary ||
      nrEmissionStandardId != nrEmissionStandardId_primary
    ) {
      let efValue1_11 = await qEfValueFindByKey({ where: { key: key1, group: 'nonRoadVehicle_CN_kpiA1_1' } })
      if (!efValue1_11) throw new Error("sorry,the efValue1_1 doesn't exsist!")
      efValue1_1 = efValue1_11.value
    }
    //更新nonRoadVehicle_CN
    let qNonRoadVehicleReplaceById = promisify(NonRoadVehicle_CN.replaceById, { context: NonRoadVehicle_CN })
    let nonRoadVehicle_update = await qNonRoadVehicleReplaceById(nonRoadVehicle_CNId, {
      serialNumber: serialNumber,
      licensePlateNumber: licensePlateNumber,
      nrVehicleTypeId: nrVehicleTypeId,
      NrRatedPowerType: NrRatedPowerType,
      nrEmissionStandardId: nrEmissionStandardId,
      efValue1_1: efValue1_1,
      systemUserId: systemUserId,
    })
    //更新emission
    let idCollection = []
    for (let i in list) {
      let nonRoadVehicleFuel_CNId = list[i].id
      let timeStartValue = list[i].timeStartValue
      let timeEndValue = list[i].timeEndValue
      let timeUnit = list[i].timeUnit
      let year = list[i].year
      let tripDistance = list[i].tripDistance
      let fuelConsumption = list[i].fuelConsumption
      let emissionId = list[i].emissionId

      let emissionData = kpiA11ANonRoadVehicleCalulate_CN(nrVehicleType.name, efValue1_1, tripDistance, fuelConsumption)

      let qEmissionUpdate = promisify(Emission.upsert, { context: Emission })
      let emission = await qEmissionUpdate({
        id: emissionId,
        nox: emissionData.emission_NOx,
        sox: emissionData.emission_SOx,
        co: emissionData.emission_CO,
        pm2_5: emissionData.emission_PM2_5,
        pm: emissionData.emission_PM,
      })
      if (!emissionId) emissionId = emission.id

      //更新nonRoadVehicleFuel_CN
      let qNonRoadVehicleFuelUpdate = promisify(NonRoadVehicleFuel.upsert, { context: NonRoadVehicleFuel })
      let nonRoadVehicleFuel = await qNonRoadVehicleFuelUpdate({
        id: nonRoadVehicleFuel_CNId,
        nonRoadVehicle_CNId: nonRoadVehicle_CNId,
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        tripDistance: tripDistance,
        fuelConsumption: fuelConsumption,
        emissionId: emissionId,
      })
      idCollection.push(nonRoadVehicleFuel.id)
    }
    //----------------kpi A1.2业务代码-----------------------
    //暂时设定燃料类型为"柴油"
    let fuelTypeName = '柴油'
    let key2 = nrVehicleType.name + '-' + fuelTypeName
    if (nrVehicleTypeId != nrVehicleTypeId_primary) {
      let efValue1 = await qEfValueFindByKey({ where: { key: key2, group: 'nonRoadVehicle_CN_kpiA1_2' } })
      //返回-1表示不存在该key对应的efValue1_2值
      if (!efValue1) return -1
      efValue1_2 = efValue1.value
    }
    let qNonRoadVehicleUpdateEfvalue = promisify(NonRoadVehicle_CN.upsert, {
      context: NonRoadVehicle_CN,
    })
    let nonRoadVehicle_updateEfvalue = await qNonRoadVehicleUpdateEfvalue(
      {
        id: nonRoadVehicle_CNId,
        efValue1_2: efValue1_2,
      },
      { validate: false }
    )
    for (let i in list) {
      let nonRoadVehicleFuel_CNId = idCollection[i]
      let gasEmissionId = list[i].gasEmissionId
      let fuelConsumption = list[i].fuelConsumption
      let gasEmissionData = kpiA12ANonRoadVehicleCalulate_CN(efValue1_2, fuelConsumption)
      let qGasEmissionUpdate = promisify(GasEmission.upsert, { context: GasEmission })
      let gasEmission = await qGasEmissionUpdate({
        id: gasEmissionId,
        co2: gasEmissionData.co2,
        ch4: gasEmissionData.ch4,
        n2o: gasEmissionData.n2o,
      })
      //更新nonRoadVehicleFuel_CN中的gasEmission
      let qNonRoadVehicleFuelUpdate = promisify(NonRoadVehicleFuel.upsert, { context: NonRoadVehicleFuel })
      if (!gasEmissionId) {
        gasEmissionId = gasEmission.id
        let nonRoadVehicleFuel_update = await qNonRoadVehicleFuelUpdate(
          {
            id: nonRoadVehicleFuel_CNId,
            gasEmissionId: gasEmissionId,
          },
          { validate: false }
        )
      }
    }
    return 'update success!'
  }
  NonRoadVehicle_CN.remoteMethod('updateData', {
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
