const promisify = require('bluebird').promisify
module.exports = function(RoadVehicle_HK) {
  RoadVehicle_HK.observe('before save', async function(ctx, next) {
    console.log('entered RoadVehicle_HK updated method------------')
    //   let vehicleTypeId = ctx.instance.vehicleTypeId
    //   let fuelTypeId = ctx.instance.fuelTypeId
    //   let subgroupId = ctx.instance.subgroupId
    //   let emissionStandardId = ctx.instance.emissionStandardId
    //   let RmVehicleType = RoadVehicle_HK.app.models.RmVehicleType_HK
    //   let qRmVehicleTypeFindById = promisify(RmVehicleType.findById, { context: RmVehicleType })
    //   let rmVehicleType = await qRmVehicleTypeFindById(vehicleTypeId)
    //   let RmFuelType = RoadVehicle_HK.app.models.RmFuelType_HK
    //   let qRmFuelTypeFindById = promisify(RmFuelType.findById, { context: RmFuelType })
    //   let rmFuelType = await qRmFuelTypeFindById(fuelTypeId)
    //   let RmSubgroup = RoadVehicle_HK.app.models.RmSubgroup_HK
    //   let qRmSubgroupFindById = promisify(RmSubgroup.findById, { context: RmSubgroup })
    //   let rmSubgroup = await qRmSubgroupFindById(subgroupId)
    //   let RmEmissionStandard = RoadVehicle_HK.app.models.RmEmissionStandard_HK
    //   let qRmEmissionStandardFindById = promisify(RmEmissionStandard.findById, {
    //     context: RmEmissionStandard,
    //   })
    //   let rmEmissionStandard = await qRmEmissionStandardFindById(emissionStandardId)
    //   let key = rmVehicleType.name + '-' + rmFuelType.name + '-' + rmSubgroup.name + '-' + rmEmissionStandard.name
    //   let EfValue = RoadVehicle_HK.app.models.EfValue
    //   let qEfValueFindByKey = promisify(EfValue.findOne, { context: EfValue })
    //   let efValue = await qEfValueFindByKey({ where: { key: key, group: 'roadMobile_HK' } })
    //   if (efValue) {
    //     ctx.instance.efValue = efValue.value
    //   } else throw new Error("sorry,the efValue doesn't exsist!")
  })
}
