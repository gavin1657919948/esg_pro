import { inspect } from 'util'

const promisify = require('bluebird').promisify
const log = require('@colmena/logger')
module.exports = function(FacilitySurvey_CN) {
  FacilitySurvey_CN.inputData = async function(data, id) {
    console.log('id=', id)
    //"injectId" to be deleted
    let injectId = data.id
    let serialNumber = data.serialNumber
    let objUnit = data.objUnit
    let pollutantTypeId = data.pollutantTypeId
    let remark = data.remark
    let systemDomainId = 'default'
    let systemUserId = id
    if (!pollutantTypeId && !remark) throw new Error('pollutantTypeId and remark should not be blank at the same time!')
    let qSaveFacilitySurvey = promisify(FacilitySurvey_CN.create, { context: FacilitySurvey_CN })
    let facilitySurvey = await qSaveFacilitySurvey({
      id: injectId,
      systemDomainId: systemDomainId,
      systemUserId: systemUserId,
      serialNumber: serialNumber,
      objUnit: objUnit,
      pollutantTypeId: pollutantTypeId,
      remark: remark,
    })
    log.yellow.b('facilitySurvey:' + inspect(facilitySurvey))
    let facilitySurveyData_CNs = data.facilitySurveyData_CNs
    let FacilitySurveyData_CN = FacilitySurvey_CN.app.models.FacilitySurveyData_CN
    let facilitySurvey_CNId = facilitySurvey.id
    console.log('facilitySurveyData_CNs:', facilitySurveyData_CNs)
    for (let i in facilitySurveyData_CNs) {
      let timeStartValue = facilitySurveyData_CNs[i].timeStartValue
      let timeEndValue = facilitySurveyData_CNs[i].timeEndValue
      let timeUnit = facilitySurveyData_CNs[i].timeUnit
      let year = facilitySurveyData_CNs[i].year
      let concentrationPerHour = facilitySurveyData_CNs[i].concentrationPerHour
      let gasFlowPerHour = facilitySurveyData_CNs[i].gasFlowPerHour
      let workingHour = facilitySurveyData_CNs[i].workingHour
      let pollutantAmount
      if (concentrationPerHour && gasFlowPerHour && workingHour)
        pollutantAmount = concentrationPerHour * gasFlowPerHour * workingHour * Math.pow(10, -9)
      let qSaveFacilitySurveyData = promisify(FacilitySurveyData_CN.create, { context: FacilitySurveyData_CN })
      let facilitySurveyData = await qSaveFacilitySurveyData({
        facilitySurvey_CNId: facilitySurvey_CNId,
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
    return 'create success!'
  }
  FacilitySurvey_CN.remoteMethod('inputData', {
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
