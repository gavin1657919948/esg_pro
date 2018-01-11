const promisify = require('bluebird').promisify
import { kpiA11ARoadVehicleCalulate_CN, kpiA12ARoadVehicleCalulate_CN, classifyVehicles } from '../../utils'

module.exports = function(RoadVehicle_CN) {
  RoadVehicle_CN.inputData = async function(data, id) {
    console.log('id=', id)
    if (!id) throw new Error('please login first!')
    let key1
    let systemDomainId = 'default'
    let systemUserId = id
    let injectId = data.id
    let serialNumber = data.serialNumber
    let licensePlateNumber = data.licensePlateNumber
    let vehicleTypeId = data.vehicleTypeId
    let fuelTypeId = data.fuelTypeId
    let emissionStandardId = data.emissionStandardId
    let vehicleWeight = data.vehicleWeight

    let EfValue = RoadVehicle_CN.app.models.EfValue
    let Emission = RoadVehicle_CN.app.models.Emission
    let GasEmission = RoadVehicle_CN.app.models.GasEmission
    let RoadVehicleType = RoadVehicle_CN.app.models.RoadVehicleType_CN
    let RoadVehicleFuel = RoadVehicle_CN.app.models.RoadVehicleFuel_CN
    let RoadFuelType = RoadVehicle_CN.app.models.RoadFuelType_CN
    let RoadEmissionStandard = RoadVehicle_CN.app.models.RoadEmissionStandard_CN

    let qRoadVehicleTypeFindById = promisify(RoadVehicleType.findById, { context: RoadVehicleType })
    let qRoadFuelTypeFindById = promisify(RoadFuelType.findById, { context: RoadFuelType })
    let qRoadEmissionStandardFindById = promisify(RoadEmissionStandard.findById, { context: RoadEmissionStandard })

    let qRoadVehicleCreate = promisify(RoadVehicle_CN.create, { context: RoadVehicle_CN })

    let roadVehicleType = await qRoadVehicleTypeFindById(vehicleTypeId)
    let roadFuelType = await qRoadFuelTypeFindById(fuelTypeId)
    let roadEmissionStandard = await qRoadEmissionStandardFindById(emissionStandardId)

    key1 = roadVehicleType.name + '-' + roadFuelType.name + '-' + roadEmissionStandard.name
    let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    let efValue1_1 = await qEfValueFindByKey({ where: { key: key1, group: 'roadVehicle_CN_kpiA1_1' } })
    if (!efValue1_1) throw new Error("sorry,the efValue1_1 doesn't exsist!")
    let roadVehicle = await qRoadVehicleCreate({
      id: injectId,
      serialNumber: serialNumber,
      licensePlateNumber: licensePlateNumber,
      vehicleTypeId: vehicleTypeId,
      fuelTypeId: fuelTypeId,
      emissionStandardId: emissionStandardId,
      vehicleWeight: vehicleWeight,
      efValue1_1: efValue1_1.value,
      systemDomainId: systemDomainId,
      systemUserId: systemUserId,
    })
    let roadVehicleFuel_CNs = data.roadVehicleFuel_CNs
    let idCollection = []
    for (let i in roadVehicleFuel_CNs) {
      let timeStartValue = roadVehicleFuel_CNs[i].timeStartValue
      let timeEndValue = roadVehicleFuel_CNs[i].timeEndValue
      let timeUnit = roadVehicleFuel_CNs[i].timeUnit
      let year = roadVehicleFuel_CNs[i].year
      let tripDistance = roadVehicleFuel_CNs[i].tripDistance
      let fuelConsumption = roadVehicleFuel_CNs[i].fuelConsumption
      let emissionData = kpiA11ARoadVehicleCalulate_CN(
        tripDistance,
        fuelConsumption,
        roadFuelType.name,
        efValue1_1.value
      )
      console.log('emissionData:', emissionData)
      let qEmissionCreate = promisify(Emission.create, { context: Emission })
      let emission = await qEmissionCreate({
        nox: emissionData.emission_NOx,
        sox: emissionData.emission_SOx,
        co: emissionData.emission_CO,
        pm2_5: emissionData.emission_PM2_5,
        pm10: emissionData.emission_PM10,
      })
      let emissionId = emission.id

      let qRoadVehicleFuelCreate = promisify(RoadVehicleFuel.create, { context: RoadVehicleFuel })
      let roadVehicleFuel_CN = await qRoadVehicleFuelCreate({
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        tripDistance: tripDistance,
        fuelConsumption: fuelConsumption,
        roadVehicle_CNId: roadVehicle.id,
        emissionId: emissionId,
      })
      idCollection.push(roadVehicleFuel_CN.id)
    }

    //给车辆分类
    let realType = classifyVehicles(roadVehicleType.name, vehicleWeight)
    let key2 = realType + '-' + roadFuelType.name + '-' + roadEmissionStandard.name
    let efValue1_2 = await qEfValueFindByKey({ where: { key: key2, group: 'roadVehicle_CN_kpiA1_2' } })
    //若找不到对应的ef，返回-1
    if (!efValue1_2) return -1
    let qUpdateRoadVehicle = promisify(RoadVehicle_CN.upsert, { context: RoadVehicle_CN })
    let roadVehicle_update = await qUpdateRoadVehicle(
      { id: roadVehicle.id, efValue1_2: efValue1_2.value },
      { validate: false }
    )
    for (let i in roadVehicleFuel_CNs) {
      let tripDistance = roadVehicleFuel_CNs[i].tripDistance
      let consumption = roadVehicleFuel_CNs[i].fuelConsumption
      let qGasEmissionCreate = promisify(GasEmission.create, { context: GasEmission })
      let gasEmissionData = kpiA12ARoadVehicleCalulate_CN(efValue1_2.value, consumption, tripDistance)
      let gasEmission = await qGasEmissionCreate({
        co2: gasEmissionData.co2,
        ch4: gasEmissionData.ch4,
        n2o: gasEmissionData.n2o,
      })
      let gasEmissionId = gasEmission.id
      let qRoadVehicleFuelUpdate = promisify(RoadVehicleFuel.upsert, { context: RoadVehicleFuel })
      let roadVehicleFuel_update = await qRoadVehicleFuelUpdate(
        {
          id: idCollection[i],
          gasEmissionId: gasEmissionId,
        },
        { validate: false }
      )
    }
    return 'create success!'
  }

  RoadVehicle_CN.remoteMethod('inputData', {
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
