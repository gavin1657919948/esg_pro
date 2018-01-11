function unifyPowerUnit(powerUnit, power) {
  if (powerUnit.toLowerCase() == 'ton/hr') return power * 0.672
  if (powerUnit.toLowerCase() == 'kg/hr') return power * 0.000672
  if (powerUnit.toLowerCase() == 'kw') return power * 0.001
  if (powerUnit.toLowerCase() == 'hp') return power * 0.00075
  if (powerUnit.toLowerCase() == 'mmbtu/hr') return power * 0.29307107
  if (powerUnit.toLowerCase() == 'mw') return power
}
function classifyVehicles(vehicleType, weight) {
  if (
    vehicleType == '微型或小型载客汽车' ||
    vehicleType == '三轮汽车' ||
    vehicleType == '普通摩托车' ||
    vehicleType == '轻便摩托车' ||
    vehicleType == '微型或小型载客汽车'
  )
    return '轿车'
  if (
    (vehicleType == '中型载客汽车' && weight > 3500) ||
    (vehicleType == '大型载客汽车' && weight > 3500) ||
    (vehicleType == '微型或轻型载货汽车' && weight > 3500) ||
    (vehicleType == '中型载货汽车' && weight > 3500) ||
    (vehicleType == '重型载货汽车' && weight > 3500) ||
    (vehicleType == '低速货车' && weight > 3500)
  )
    return '重型车'
  if (
    (vehicleType == '中型载客汽车' && weight <= 3500) ||
    (vehicleType == '大型载客汽车' && weight <= 3500) ||
    (vehicleType == '微型或轻型载货汽车' && weight <= 3500) ||
    (vehicleType == '中型载货汽车' && weight <= 3500) ||
    (vehicleType == '重型载货汽车' && weight <= 3500) ||
    (vehicleType == '低速货车' && weight > 3500)
  )
    return '其他轻型车'
}
function getStatus(name, power) {
  if (name == '烟煤' || name == '次烟煤' || name == '无烟煤' || name == '褐煤') {
    if (power >= 73) {
      return 2
    } else {
      return 1
    }
  } else if (name == '天然气') {
    if (power >= 73) {
      return 2
    } else if (power <= 29) {
      return 3
    } else return 4
  } else {
    if (power <= 29) return 3
    else return 4
  }
}
function kpiA11AFacilityCalulate_CN(fuelDefine, facilityType, efValue, ash, sul, consumption) {
  let fuelName = fuelDefine.name
  let facilityTypeName = facilityType.name

  if (fuelName == '一号燃料油' || fuelName == '二号燃料油' || fuelName == '四号燃料油') {
    consumption = consumption * (1000 / 859)
  } else if (fuelName == '五号燃料油' || fuelName == '六号燃料油' || fuelName == '七号燃料油') {
    consumption = consumption * (1000 / 945.6)
  }

  let emission_NOx = consumption * efValue.nox
  let emission_CO = consumption * efValue.co

  let emission_SOx = 0
  let emission_PM2_5 = 0
  let emission_PM10 = 0
  let emission_FTPM = 0
  let emission_CPM = 0
  let emission_PM = 0

  if (fuelName != '天然气') {
    emission_SOx = consumption * efValue.sox * sul
  } else {
    emission_SOx = consumption * efValue.sox
  }

  if (
    fuelName != '烟煤' &&
    fuelName != '次烟煤' &&
    fuelName != '无烟煤' &&
    fuelName != '褐煤' &&
    facilityTypeName != '固态排渣对冲式煤粉锅炉-两至三个独立燃烧器' &&
    facilityTypeName != '固态排渣切向燃烧式煤粉锅炉' &&
    facilityTypeName != '固态排渣墙式煤粉锅炉' &&
    facilityTypeName != '液态排渣墙式煤粉锅炉' &&
    facilityTypeName != '旋风式锅炉' &&
    facilityTypeName != '煤粉锅炉'
  ) {
    emission_PM2_5 = consumption * efValue.pm2_5
    emission_PM10 = consumption * efValue.pm10
  } else {
    emission_PM2_5 = consumption * efValue.pm2_5 * ash
    emission_PM10 = consumption * efValue.pm10 * ash
  }

  if (
    fuelName != '无烟煤' &&
    fuelName != '褐煤' &&
    fuelName != '七号燃料油' &&
    fuelName != '六号燃料油' &&
    facilityTypeName != '固态排渣对冲式煤粉锅炉-两至三个独立燃烧器' &&
    facilityTypeName != '固态排渣切向燃烧式煤粉锅炉' &&
    facilityTypeName != '固态排渣墙式煤粉锅炉' &&
    facilityTypeName != '液态排渣墙式煤粉锅炉' &&
    facilityTypeName != '旋风式锅炉' &&
    facilityTypeName != '煤粉锅炉'
  ) {
    emission_FTPM = consumption * efValue.filterabletpm
  } else if ((fuelName == '六号燃料油' || fuelName == '七号燃料油') && efValue.filterabletpm != 0) {
    emission_FTPM = consumption * (efValue.filterabletpm * sul * consumption + 3.22)
  } else {
    emission_FTPM = consumption * efValue.filterabletpm * ash
  }

  if (fuelName == '无烟煤') {
    emission_CPM = consumption * efValue.condensiblepm * ash
  } else {
    emission_CPM = consumption * efValue.condensiblepm
  }
  emission_PM = emission_FTPM + emission_CPM
  /*
  *乘以1000是为了后期单位的一致性，该处将kg换算为g
  */
  let emission = {
    emission_NOx: emission_NOx * 1000,
    emission_SOx: emission_SOx * 1000,
    emission_CO: emission_CO * 1000,
    emission_PM: emission_PM * 1000,
  }
  return emission
}

function kpiA11ANonRoadVehicleCalulate_CN(nrVehicleName, efValue, tripDistance, fuelConsumption) {
  let emission_NOx
  let emission_CO
  let emission_PM2_5
  let emission_PM
  if (nrVehicleName == '小型通用机械') {
    fuelConsumption = fuelConsumption * 0.001 * 747.5
  } else {
    fuelConsumption = fuelConsumption * 0.001 * 820
  }
  if (nrVehicleName == '三轮农用运输车' || nrVehicleName == '四轮农用运输车') {
    emission_NOx = tripDistance * efValue.nox
    emission_CO = tripDistance * efValue.co
    emission_PM2_5 = tripDistance * efValue.pm2_5
    emission_PM = tripDistance * efValue.pm
  } else {
    emission_NOx = fuelConsumption * efValue.nox
    emission_CO = fuelConsumption * efValue.co
    emission_PM2_5 = fuelConsumption * efValue.pm2_5
    emission_PM = fuelConsumption * efValue.pm
  }
  let emission_SOx = fuelConsumption * efValue.sulphurContent * 2 * 0.001
  let emission = {
    emission_NOx: emission_NOx,
    emission_SOx: emission_SOx,
    emission_CO: emission_CO,
    emission_PM2_5: emission_PM2_5,
    emission_PM: emission_PM,
  }
  return emission
}

function kpiA11ARoadVehicleCalulate_CN(tripDistance, fuelConsumption, fuelTypeName, efValue) {
  let emission_NOx = tripDistance * efValue.nox
  let emission_CO = tripDistance * efValue.co
  let emission_PM2_5 = tripDistance * efValue.pm2_5
  let emission_PM10 = tripDistance * efValue.pm10
  let emission_SOx = 0
  if (fuelTypeName == '柴油') emission_SOx = fuelConsumption * 0.001 * 820 * efValue.sulphurContent * 2 * 0.001
  else if (fuelTypeName == '汽油') emission_SOx = fuelConsumption * 0.001 * 747.5 * efValue.sulphurContent * 2 * 0.001
  else if (fuelTypeName == '液化石油气')
    emission_SOx = fuelConsumption * 0.001 * 580 * efValue.sulphurContent * 2 * 0.001
  else if (fuelTypeName == '液化天然气')
    emission_SOx = fuelConsumption * 0.001 * 449.7 * efValue.sulphurContent * 2 * 0.001
  else emission_SOx = fuelConsumption * efValue.sulphurContent * 2 * 0.001
  let emission = {
    emission_NOx: emission_NOx,
    emission_SOx: emission_SOx,
    emission_CO: emission_CO,
    emission_PM2_5: emission_PM2_5,
    emission_PM10: emission_PM10,
  }
  return emission
}

function kpiA12ARoadVehicleCalulate_CN(efValue, consumption, tripDistance) {
  let gasEmission_co2
  let gasEmission_ch4
  let gasEmission_n2o
  let efValue_co2 = efValue.co2_EmissionFactor
  let efValue_ch4 = efValue.ch4_EmissionFactor
  let efValue_ch4GWP = efValue.ch4_GWP
  let efValue_n2o = efValue.n2o_EmissionFactor
  let efValue_n2oGWP = efValue.n2o_GWP
  //排放单位暂时统一为g
  gasEmission_co2 = consumption * efValue_co2 * Math.pow(10, 6)
  gasEmission_ch4 = tripDistance * efValue_ch4 * efValue_ch4GWP * Math.pow(10, -9) * Math.pow(10, 6)
  gasEmission_n2o = tripDistance * efValue_n2o * efValue_n2oGWP * Math.pow(10, -9) * Math.pow(10, 6)
  let gasEmission = {
    co2: gasEmission_co2,
    ch4: gasEmission_ch4,
    n2o: gasEmission_n2o,
  }
  return gasEmission
}
function kpiA11ARoadVehicleCalulate_HK(roadMobileHK, fuelTypeName, ctx) {
  let tripDistance = ctx.instance.tripDistance
  let fuelConsumption = ctx.instance.fuelConsumption
  let efValue = roadMobileHK.efValue

  let emission_NOx = tripDistance * efValue.nox
  let emission_CO = tripDistance * efValue.co
  let emission_PM2_5
  if (isNaN(efValue.pm2_5)) emission_PM2_5 = 'n.a.'
  else emission_PM2_5 = tripDistance * efValue.pm2_5
  let emission_SOx = 0

  if (fuelTypeName.indexOf('柴油') >= 0) emission_SOx = fuelConsumption * 0.001 * 832.5 * efValue.sulphurContent * 2
  else if (fuelTypeName.indexOf('汽油') >= 0) emission_SOx = fuelConsumption * 0.001 * 739 * efValue.sulphurContent * 2
  else emission_SOx = fuelConsumption * efValue.sulphurContent * 2
  let emission = {
    emission_NOx: emission_NOx,
    emission_SOx: emission_SOx,
    emission_CO: emission_CO,
    emission_PM2_5: emission_PM2_5,
  }
  return emission
}
function kpiA12AFacilityCalulate_CN(fuelTypeName, efValue, consumption) {
  let gasEmission_co2
  //排放单位暂时统一为g
  if (fuelTypeName == '气体')
    gasEmission_co2 = consumption * efValue.ALHV * efValue.UHC * efValue.FCO * 100 * (44 / 12) * 1000
  gasEmission_co2 = consumption * efValue.ALHV * efValue.UHC * efValue.FCO * (44 / 12) * 1000
  let gasEmission = {
    co2: gasEmission_co2,
  }
  return gasEmission
}
function kpiA12ANonRoadVehicleCalulate_CN(efValue, consumption) {
  let gasEmission_co2
  let gasEmission_ch4
  let gasEmission_n2o
  let efValue_co2 = efValue.co2_EmissionFactor
  let efValue_ch4 = efValue.ch4_EmissionFactor
  let efValue_ch4GWP = efValue.ch4_GWP
  let efValue_n2o = efValue.n2o_EmissionFactor
  let efValue_n2oGWP = efValue.n2o_GWP
  //在此统一单位为克
  gasEmission_co2 = consumption * efValue_co2 * Math.pow(10, 6)
  gasEmission_ch4 = consumption * efValue_ch4 * efValue_ch4GWP * Math.pow(10, -6) * Math.pow(10, 6)
  gasEmission_n2o = consumption * efValue_n2o * efValue_n2oGWP * Math.pow(10, -6) * Math.pow(10, 6)
  let gasEmission = {
    co2: gasEmission_co2,
    ch4: gasEmission_ch4,
    n2o: gasEmission_n2o,
  }
  return gasEmission
}
export {
  unifyPowerUnit,
  classifyVehicles,
  getStatus,
  kpiA11AFacilityCalulate_CN,
  kpiA11ANonRoadVehicleCalulate_CN,
  kpiA12ANonRoadVehicleCalulate_CN,
  kpiA11ARoadVehicleCalulate_CN,
  kpiA12ARoadVehicleCalulate_CN,
  kpiA11ARoadVehicleCalulate_HK,
  kpiA12AFacilityCalulate_CN,
}
