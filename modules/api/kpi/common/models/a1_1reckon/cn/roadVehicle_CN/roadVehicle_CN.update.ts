const promisify = require('bluebird').promisify
const _ = require('lodash')
var util = require('util')
import { kpiA11ARoadVehicleCalulate_CN, kpiA12ARoadVehicleCalulate_CN, classifyVehicles } from '../../utils'

module.exports = function(RoadVehicle_CN) {
  RoadVehicle_CN.updateData = async function(data, id) {
    console.log('id=', id)
    if (!id) throw new Error('please login first!')
    let key1
    let EfValue = RoadVehicle_CN.app.models.EfValue
    let Emission = RoadVehicle_CN.app.models.Emission
    let GasEmission = RoadVehicle_CN.app.models.GasEmission
    let RoadVehicleType = RoadVehicle_CN.app.models.RoadVehicleType_CN
    let RoadVehicleFuel = RoadVehicle_CN.app.models.RoadVehicleFuel_CN
    let RoadFuelType = RoadVehicle_CN.app.models.RoadFuelType_CN
    let RoadEmissionStandard = RoadVehicle_CN.app.models.RoadEmissionStandard_CN

    let roadVehicle_CNId = data.id
    let qRoadVehicle_CNFindbyId = promisify(RoadVehicle_CN.findById, { context: RoadVehicle_CN })
    let roadVehicle = await qRoadVehicle_CNFindbyId(roadVehicle_CNId)
    let roadVehicle_origin = roadVehicle.__data
    const vehicleTypeId_primary = roadVehicle_origin.vehicleTypeId
    const fuelTypeId_primary = roadVehicle_origin.fuelTypeId
    const emissionStandardId_primary = roadVehicle_origin.emissionStandardId
    const vehicleWeight_primary = roadVehicle_origin.vehicleWeight
    const systemUserId = roadVehicle_origin.systemUserId

    let dataArr = data.roadVehicleFuel_CNs
    let originArr = roadVehicle_origin.roadVehicleFuel_CNs
    let mergeData = _.merge(roadVehicle_origin, data)
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
    mergeData.roadVehicleFuel_CNs = list
    console.log('list:', list)
    let serialNumber = mergeData.serialNumber
    let licensePlateNumber = mergeData.licensePlateNumber
    let vehicleTypeId = mergeData.vehicleTypeId
    let fuelTypeId = mergeData.fuelTypeId
    let emissionStandardId = mergeData.emissionStandardId
    let vehicleWeight = mergeData.vehicleWeight
    let efValue1_1 = mergeData.efValue1_1
    let efValue1_2 = mergeData.efValue1_2

    let qVehicleTypeFindById = promisify(RoadVehicleType.findById, { context: RoadVehicleType })
    let qFuelTypeFindById = promisify(RoadFuelType.findById, { context: RoadFuelType })
    let qEmissionStandardFindById = promisify(RoadEmissionStandard.findById, { context: RoadEmissionStandard })
    let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    let vehicleType = await qVehicleTypeFindById(vehicleTypeId)
    let fuelType = await qFuelTypeFindById(fuelTypeId)
    let emissionStandard = await qEmissionStandardFindById(emissionStandardId)

    key1 = vehicleType.name + '-' + fuelType.name + '-' + emissionStandard.name

    if (
      vehicleTypeId != vehicleTypeId_primary ||
      fuelTypeId != fuelTypeId_primary ||
      emissionStandardId != emissionStandardId_primary
    ) {
      let efValue1_11 = await qEfValueFindByKey({ where: { key: key1, group: 'roadVehicle_CN_kpiA1_1' } })
      if (!efValue1_11) throw new Error("sorry,the efValue1_1 doesn't exsist!")
      efValue1_1 = efValue1_11.value
    }
    //更新RoadVehicle_CN
    let qRoadVehicleReplaceById = promisify(RoadVehicle_CN.replaceById, { context: RoadVehicle_CN })
    let roadVehicle_update = await qRoadVehicleReplaceById(roadVehicle_CNId, {
      serialNumber: serialNumber,
      licensePlateNumber: licensePlateNumber,
      vehicleTypeId: vehicleTypeId,
      fuelTypeId: fuelTypeId,
      emissionStandardId: emissionStandardId,
      vehicleWeight: vehicleWeight,
      efValue1_1: efValue1_1,
      systemUserId: systemUserId,
    })
    //更新emission
    let idCollection = []
    for (let i in list) {
      let roadVehicleFuel_CNId = list[i].id
      let timeStartValue = list[i].timeStartValue
      let timeEndValue = list[i].timeEndValue
      let timeUnit = list[i].timeUnit
      let year = list[i].year
      let tripDistance = list[i].tripDistance
      let fuelConsumption = list[i].fuelConsumption
      let emissionId = list[i].emissionId
      let emissionData = kpiA11ARoadVehicleCalulate_CN(tripDistance, fuelConsumption, fuelType.name, efValue1_1)
      let qEmissionUpdate = promisify(Emission.upsert, { context: Emission })
      let emission = await qEmissionUpdate({
        id: emissionId,
        nox: emissionData.emission_NOx,
        sox: emissionData.emission_SOx,
        co: emissionData.emission_CO,
        pm2_5: emissionData.emission_PM2_5,
        pm10: emissionData.emission_PM10,
      })
      if (!emissionId) emissionId = emission.id
      //更新RoadVehicleFuel_CN
      let qRoadVehicleFuelUpdate = promisify(RoadVehicleFuel.upsert, { context: RoadVehicleFuel })
      let roadVehicleFuel = await qRoadVehicleFuelUpdate({
        id: roadVehicleFuel_CNId,
        roadVehicle_CNId: roadVehicle_CNId,
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        tripDistance: tripDistance,
        fuelConsumption: fuelConsumption,
        emissionId: emissionId,
      })
      idCollection.push(roadVehicleFuel.id)
    }
    //kpi1.2 logic
    //给车辆分类
    let realType = classifyVehicles(vehicleType.name, vehicleWeight)
    let key2 = realType + '-' + fuelType.name + '-' + emissionStandard.name

    if (
      vehicleTypeId != vehicleTypeId_primary ||
      vehicleWeight != vehicleWeight_primary ||
      fuelTypeId != fuelTypeId_primary ||
      emissionStandardId != emissionStandardId_primary
    ) {
      let efValue1 = await qEfValueFindByKey({ where: { key: key2, group: 'roadVehicle_CN_kpiA1_2' } })
      //若找不到对应的ef，返回-1
      if (!efValue1) return -1
      efValue1_2 = efValue1.value
    }
    let qRoadVehicleUpdateEfvalue = promisify(RoadVehicle_CN.upsert, {
      context: RoadVehicle_CN,
    })
    let roadVehicle_updateEfvalue = await qRoadVehicleUpdateEfvalue(
      {
        id: roadVehicle_CNId,
        efValue1_2: efValue1_2,
      },
      { validate: false }
    )
    for (let i in list) {
      let roadVehicleFuel_CNId = idCollection[i]
      let gasEmissionId = list[i].gasEmissionId
      let tripDistance = list[i].tripDistance
      let consumption = list[i].fuelConsumption
      let gasEmissionData = kpiA12ARoadVehicleCalulate_CN(efValue1_2, consumption, tripDistance)
      let qGasEmissionUpdate = promisify(GasEmission.upsert, { context: GasEmission })
      let gasEmission = await qGasEmissionUpdate({
        id: gasEmissionId,
        co2: gasEmissionData.co2,
        ch4: gasEmissionData.ch4,
        n2o: gasEmissionData.n2o,
      })
      //更新roadVehicleFuel_CN中的gasEmission
      let qRoadVehicleFuelUpdate = promisify(RoadVehicleFuel.upsert, { context: RoadVehicleFuel })
      if (!gasEmissionId) {
        gasEmissionId = gasEmission.id
        let nonRoadVehicleFuel_update = await qRoadVehicleFuelUpdate(
          {
            id: roadVehicleFuel_CNId,
            gasEmissionId: gasEmissionId,
          },
          { validate: false }
        )
      }
    }
    return 'update success!'
  }

  RoadVehicle_CN.remoteMethod('updateData', {
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
