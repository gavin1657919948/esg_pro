const promisify = require('bluebird').promisify
import { unifyPowerUnit, getStatus, kpiA11AFacilityCalulate_CN, kpiA12AFacilityCalulate_CN } from '../../utils'

module.exports = function(Facility_CN) {
  Facility_CN.inputData = async function(data, id) {
    console.log('id=', id)
    if (!id) throw new Error('please login first!')
    //假设已传入organizationId
    // let organizationId=data.organizationId
    // let Organization =Facility_CN.app.models.Organization
    // let qOrganizationFindById = promisify(Organization.findById, { context: Organization })
    // let organization = await qOrganizationFindById(organizationId)
    // let industry=organization.industry
    //石油化工企业为例
    let industry = '石油化工企业'
    // injectId to be deleted
    let injectId = data.id
    let serialNumber = data.serialNumber
    let fuelTypeId = data.fuelTypeId
    let fuelDefineId = data.fuelDefineId
    let facilityTypeId = data.facilityTypeId
    let power = data.power
    let powerUnit = data.powerUnit
    let systemDomainId = 'default'
    let systemUserId = id

    let EfValue = Facility_CN.app.models.EfValue
    let FacilityFuel_CN = Facility_CN.app.models.FacilityFuel_CN
    let FuelDefine = Facility_CN.app.models.FuelDefine_CN
    let FacilityType = Facility_CN.app.models.FacilityType_CN
    let FuelType = Facility_CN.app.models.FuelType_CN
    let Emission = Facility_CN.app.models.Emission
    let GasEmission = Facility_CN.app.models.GasEmission

    let qFuelDefineFindById = promisify(FuelDefine.findById, { context: FuelDefine })
    let fuelDefine = await qFuelDefineFindById(fuelDefineId)
    let unifyPower = unifyPowerUnit(powerUnit, power)
    let status = getStatus(fuelDefine.name, unifyPower)

    let qFacilityTypeFindById = promisify(FacilityType.findById, { context: FacilityType })
    let facilityType = await qFacilityTypeFindById(facilityTypeId)
    let key = status + '-' + fuelDefine.name + '-' + facilityType.name
    let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    let efValue1_1 = await qEfValueFindByKey({ where: { key: key, group: 'facility_CN_kpiA1_1' } })
    if (!efValue1_1) throw new Error("sorry,the efValue1_1 doesn't exsist!")
    if (efValue1_1.value.condensiblepm == 'none')
      throw new Error('this condensiblepm factor of EF DataBase is not completed!')
    let qSaveFacility = promisify(Facility_CN.create, { context: Facility_CN })
    let facility = await qSaveFacility({
      id: injectId,
      serialNumber: serialNumber,
      fuelTypeId: fuelTypeId,
      fuelDefineId: fuelDefineId,
      facilityTypeId: facilityTypeId,
      power: power,
      powerUnit: powerUnit,
      efValue1_1: efValue1_1.value,
      systemDomainId: systemDomainId,
      systemUserId: systemUserId,
    })
    let facilityId = facility.id
    let facilityFuelData = data.facilityFuel_CNs
    let idCollection = []
    for (let i in facilityFuelData) {
      let timeStartValue = facilityFuelData[i].timeStartValue
      let timeEndValue = facilityFuelData[i].timeEndValue
      let timeUnit = facilityFuelData[i].timeUnit
      let year = facilityFuelData[i].year
      let sul = facilityFuelData[i].sul
      let ash = facilityFuelData[i].ash
      let consumption = facilityFuelData[i].consumption
      let emissionData = kpiA11AFacilityCalulate_CN(fuelDefine, facilityType, efValue1_1.value, ash, sul, consumption)
      let qEmissionCreate = promisify(Emission.create, { context: Emission })
      let emission = await qEmissionCreate({
        nox: emissionData.emission_NOx,
        sox: emissionData.emission_SOx,
        co: emissionData.emission_CO,
        pm: emissionData.emission_PM,
      })
      let emissionId = emission.id
      let qFacilityFuelCreate = promisify(FacilityFuel_CN.create, { context: FacilityFuel_CN })
      let facilityFuel_CN = await qFacilityFuelCreate({
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        sul: sul,
        ash: ash,
        consumption: consumption,
        facility_CNId: facilityId,
        emissionId: emissionId,
      })
      idCollection.push(facilityFuel_CN.id)
    }
    let key2 = industry + '-' + fuelDefine.name
    let efValue1_2 = await qEfValueFindByKey({ where: { key: key2, group: 'facility_CN_kpiA1_2' } })
    //若找不到对应的ef，返回-1
    if (!efValue1_2) return -1
    //若对应的记录不完整，返回-2
    if (efValue1_2.value.ALHV === 'none' || efValue1_2.value.UHC === 'none' || efValue1_2.value.FCO === 'none')
      return -2
    let qUpdateFacility = promisify(Facility_CN.upsert, { context: Facility_CN })
    let facility_update = await qUpdateFacility({ id: facilityId, efValue1_2: efValue1_2.value }, { validate: false })
    let qFuelTypeFindById = promisify(FuelType.findById, { context: FuelType })
    let fuelType = await qFuelTypeFindById(fuelTypeId)

    for (let i in facilityFuelData) {
      let consumption = facilityFuelData[i].consumption
      let qGasEmissionCreate = promisify(GasEmission.create, { context: GasEmission })
      let gasEmissionData = kpiA12AFacilityCalulate_CN(fuelType.name, efValue1_2.value, consumption)
      let gasEmission = await qGasEmissionCreate({
        co2: gasEmissionData.co2,
      })
      let gasEmissionId = gasEmission.id
      let qFacilityFuelUpdate = promisify(FacilityFuel_CN.upsert, { context: FacilityFuel_CN })
      let facilityFuel = await qFacilityFuelUpdate(
        {
          id: idCollection[i],
          gasEmissionId: gasEmissionId,
        },
        { validate: false }
      )
    }
    return 'create success!'
  }
  Facility_CN.remoteMethod('inputData', {
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
