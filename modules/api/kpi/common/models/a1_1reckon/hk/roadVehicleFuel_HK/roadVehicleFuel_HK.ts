const promisify = require('bluebird').promisify
import { kpiA11ARoadMobileCalulateHK } from '../../utils'
module.exports = function(RoadVehicleFuel_HK) {
  RoadVehicleFuel_HK.observe('before save', async function(ctx, next) {
    console.log('enterd RoadVehicleFuel_HK updated method-----------------')
    //   let roadMobile_HKId = ctx.instance.roadMobile_HKId
    //   let RoadMobile = RoadVehicleFuel_HK.app.models.RoadMobile_HK
    //   let qRoadMobileFindById = promisify(RoadMobile.findById, { context: RoadMobile })
    //   let roadMobile = await qRoadMobileFindById(roadMobile_HKId)
    //   let RmFuelType = RoadVehicleFuel_HK.app.models.RmFuelType_HK
    //   let qRmFuelTypeFindById = promisify(RmFuelType.findById, { context: RmFuelType })
    //   let rmFuelType = await qRmFuelTypeFindById(roadMobile.fuelTypeId)
    //   let fuelTypeName = rmFuelType.name
    //   let emissionData = kpiA11ARoadMobileCalulateHK(roadMobile, fuelTypeName, ctx)
    //   let Emission = RoadVehicleFuel_HK.app.models.Emission
    //   let qEmissionCreate = promisify(Emission.create, { context: Emission })
    //   let emission = await qEmissionCreate({
    //     nox: emissionData.emission_NOx,
    //     sox: emissionData.emission_SOx,
    //     co: emissionData.emission_CO,
    //     pm2_5: emissionData.emission_PM2_5,
    //   })
    //   ctx.instance.emissionId = emission.id
  })
}
