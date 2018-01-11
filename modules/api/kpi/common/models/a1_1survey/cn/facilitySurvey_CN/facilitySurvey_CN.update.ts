import { inspect } from 'util'
const _ = require('lodash')
const promisify = require('bluebird').promisify
const log = require('@colmena/logger')
module.exports = function(FacilitySurvey_CN) {
  FacilitySurvey_CN.updateData = async function(data, id) {
    console.log('id=', id)
    //整合数据
    let facilitySurveyId = data.id
    let qFacilitySurveyFindbyId = promisify(FacilitySurvey_CN.findById, { context: FacilitySurvey_CN })
    let facilitySurvey = await qFacilitySurveyFindbyId(facilitySurveyId)
    let facilitySurvey_origin = facilitySurvey.__data
    const systemUserId = facilitySurvey_origin.systemUserId
    let dataArr = data.facilitySurveyData_CNs
    let originArr = facilitySurvey_origin.facilitySurveyData_CNs
    let mergeData = _.merge(facilitySurvey_origin, data)
    let list = []
    if (dataArr.length > 0) {
      for (let i in dataArr) {
        if (dataArr[i].id) {
          for (let j in originArr) {
            if (dataArr[i].id == originArr[j].id) {
              list.push(_.merge(originArr[j], dataArr[i]))
            }
          }
        } else {
          list.push(dataArr[i])
        }
      }
    }
    //更新数据
    let qFacilitySurveyReplaceById = promisify(FacilitySurvey_CN.replaceById, { context: FacilitySurvey_CN })
    let facilitySurvey_updated = await qFacilitySurveyReplaceById(facilitySurveyId, {
      serialNumber: mergeData.serialNumber,
      objUnit: mergeData.objUnit,
      pollutantTypeId: mergeData.pollutantTypeId,
      remark: mergeData.remark,
      systemUserId: systemUserId,
    })
    let facilitySurvey_CNs_last = mergeData.facilitySurveyData_CNs
    let FacilitySurveyData_CN = FacilitySurvey_CN.app.models.FacilitySurveyData_CN
    for (let i in list) {
      let facilitySurveyData_CNId = list[i].id
      let timeStartValue = list[i].timeStartValue
      let timeEndValue = list[i].timeEndValue
      let timeUnit = list[i].timeUnit
      let year = list[i].year
      let concentrationPerHour = list[i].concentrationPerHour
      let gasFlowPerHour = list[i].gasFlowPerHour
      let workingHour = list[i].workingHour
      let pollutantAmount
      if (concentrationPerHour && gasFlowPerHour && workingHour)
        pollutantAmount = concentrationPerHour * gasFlowPerHour * workingHour * Math.pow(10, -9)
      let qFacilitySurveyDataUpdate = promisify(FacilitySurveyData_CN.upsert, { context: FacilitySurveyData_CN })
      let facilitySurveyData_CN = await qFacilitySurveyDataUpdate({
        id: facilitySurveyData_CNId,
        facilitySurvey_CNId: facilitySurveyId,
        timeStartValue: timeStartValue,
        timeEndValue: timeEndValue,
        timeUnit: timeUnit,
        year: year,
        concentrationPerHour: concentrationPerHour,
        gasFlowPerHour: gasFlowPerHour,
        workingHour: workingHour,
        pollutantAmount: pollutantAmount,
      })
    }
    return 'update success!'
  }
  FacilitySurvey_CN.remoteMethod('updateData', {
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
