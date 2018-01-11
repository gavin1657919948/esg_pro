const promisify = require('bluebird').promisify
const _ = require('lodash')
import { unifyPowerUnit, getStatus, kpiA11AFacilityCalulate_CN, kpiA12AFacilityCalulate_CN } from '../../utils'

const log = require('@colmena/logger')

module.exports = function(Facility_CN) {
  Facility_CN.updateData = async function(data, id) {
    console.log('id=', id)
    if (!id) throw new Error('please login first!')
    //先以“中国民用航空企业”为例(假设对应organization拥有industry,"行业"字段)
    let industry = '中国民用航空企业'
    //--------------kpi A1.1业务代码-----------------
    let EfValue = Facility_CN.app.models.EfValue
    let FuelDefine = Facility_CN.app.models.FuelDefine_CN
    let FacilityType = Facility_CN.app.models.FacilityType_CN
    let FacilityFuel_CN = Facility_CN.app.models.FacilityFuel_CN
    let FuelType = Facility_CN.app.models.FuelType_CN
    let Emission = Facility_CN.app.models.Emission
    let GasEmission = Facility_CN.app.models.GasEmission
    //整合数据
    let facilityId = data.id
    let qFacilityFindbyId = promisify(Facility_CN.findById, { context: Facility_CN })
    let facility = await qFacilityFindbyId(facilityId)
    let facility_origin = facility.__data
    const fuelTypeId_primary = facility_origin.fuelTypeId
    const fuelDefineId_primary = facility_origin.fuelDefineId
    const facilityTypeId_primary = facility_origin.facilityTypeId
    const power_primary = facility_origin.power
    const systemUserId = facility_origin.systemUserId
    const powerUnit_primary = facility_origin.powerUnit
    let dataArr = data.facilityFuel_CNs
    let originArr = facility_origin.facilityFuel_CNs
    let mergeData = _.merge(facility_origin, data)
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
    mergeData.facilityFuel_CNs = list
    //更新数据
    let serialNumber = mergeData.serialNumber
    let fuelTypeId = mergeData.fuelTypeId
    let fuelDefineId = mergeData.fuelDefineId
    let facilityTypeId = mergeData.facilityTypeId
    let power = mergeData.power
    let powerUnit = mergeData.powerUnit
    let efValue1_1 = mergeData.efValue1_1
    let efValue1_2 = mergeData.efValue1_2

    let qFuelDefineFindById = promisify(FuelDefine.findById, { context: FuelDefine })
    let fuelDefine = await qFuelDefineFindById(fuelDefineId)
    let unifyPower = unifyPowerUnit(powerUnit, power)
    let status = getStatus(fuelDefine.name, unifyPower)

    let qFacilityTypeFindById = promisify(FacilityType.findById, { context: FacilityType })
    let facilityType = await qFacilityTypeFindById(facilityTypeId)
    let key = status + '-' + fuelDefine.name + '-' + facilityType.name
    let key2 = industry + '-' + fuelDefine.name
    let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    if (
      fuelTypeId != fuelTypeId_primary ||
      fuelDefineId != fuelDefineId_primary ||
      facilityTypeId != facilityTypeId_primary ||
      power != power_primary ||
      powerUnit != powerUnit_primary
    ) {
      let efValue1_11 = await qEfValueFindByKey({ where: { key: key, group: 'facility_CN_kpiA1_1' } })
      if (!efValue1_11) throw new Error("sorry,the efValue1_1 doesn't exsist!")
      efValue1_1 = efValue1_11.value
      if (efValue1_1.condensiblepm == 'none')
        throw new Error('this condensiblepm factor of EF DataBase is not completed!')
    }
    //更新facility_CN
    let qFacilityReplaceById = promisify(Facility_CN.replaceById, { context: Facility_CN })
    let facility_updated = await qFacilityReplaceById(facilityId, {
      serialNumber: serialNumber,
      fuelTypeId: fuelTypeId,
      fuelDefineId: fuelDefineId,
      facilityTypeId: facilityTypeId,
      power: power,
      powerUnit: powerUnit,
      efValue1_1: efValue1_1,
      systemUserId: systemUserId,
    })
    //更新emission

    let idCollection = []
    console.log('list:', list)
    for (let i in list) {
      let facilityFuelId = list[i].id
      let timeStartValue = list[i].timeStartValue
      let timeEndValue = list[i].timeEndValue
      let timeUnit = list[i].timeUnit
      let year = list[i].year
      let sul = list[i].sul
      let ash = list[i].ash
      let emissionId = list[i].emissionId
      let consumption = list[i].consumption
      let emissionData = kpiA11AFacilityCalulate_CN(fuelDefine, facilityType, efValue1_1, ash, sul, consumption)
      let qEmissionUpdate = promisify(Emission.upsert, { context: Emission })
      let emission = await qEmissionUpdate({
        id: emissionId,
        nox: emissionData.emission_NOx,
        co: emissionData.emission_CO,
        sox: emissionData.emission_SOx,
        pm: emissionData.emission_PM,
      })
      if (!emissionId) emissionId = emission.id
      //更新facilityFuel_CN
      let qFacilityFuelUpdate = promisify(FacilityFuel_CN.upsert, { context: FacilityFuel_CN })
      let facilityFuel = await qFacilityFuelUpdate({
        id: facilityFuelId,
        facility_CNId: facilityId,
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        sul: sul,
        ash: ash,
        consumption: consumption,
        emissionId: emissionId,
      })
      idCollection.push(facilityFuel.id)
    }
    //----------------kpi A1.2业务代码-----------------------
    if (fuelTypeId != fuelTypeId_primary || fuelDefineId != fuelDefineId_primary) {
      let efValue1 = await qEfValueFindByKey({ where: { key: key2, group: 'facility_CN_kpiA1_2' } })
      //返回-1表示不存在该key对应的efValue1_2值
      if (!efValue1) return -1
      //返回-2表示该ef值记录不完整，某些值需要完善才能参与计算
      if (efValue1.value.ALHV === 'none' || efValue1.value.UHC === 'none' || efValue1.value.FCO === 'none') return -2
      efValue1_2 = efValue1.value
    }
    let qFacilityUpdateIndustryEfvalue = promisify(Facility_CN.upsert, { context: Facility_CN })
    let facility_updateIndustryEfvalue = await qFacilityUpdateIndustryEfvalue(
      {
        id: facilityId,
        efValue1_2: efValue1_2,
      },
      { validate: false }
    )
    //查询fueltypeName

    let qFuelTypeFindById = promisify(FuelType.findById, { context: FuelType })
    let fuelType = await qFuelTypeFindById(fuelTypeId_primary)

    for (let i in list) {
      let facilityFuelId = idCollection[i]
      let gasEmissionId = list[i].gasEmissionId
      let consumption = list[i].consumption
      let gasEmissionData = kpiA12AFacilityCalulate_CN(fuelType.name, efValue1_2, consumption)
      let qGasEmissionUpdate = promisify(GasEmission.upsert, { context: GasEmission })
      let gasEmission = await qGasEmissionUpdate({
        id: gasEmissionId,
        co2: gasEmissionData.co2,
      })
      //更新facilityFuel_CN
      let qFacilityFuelUpdate = promisify(FacilityFuel_CN.upsert, { context: FacilityFuel_CN })
      if (!gasEmissionId) {
        gasEmissionId = gasEmission.id
        let facilityFuel = await qFacilityFuelUpdate(
          {
            id: facilityFuelId,
            gasEmissionId: gasEmissionId,
          },
          { validate: false }
        )
      }
    }
    return 'update success!'
  }
  Facility_CN.remoteMethod('updateData', {
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
