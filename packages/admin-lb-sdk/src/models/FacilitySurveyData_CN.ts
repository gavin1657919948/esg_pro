/* tslint:disable */

declare var Object: any;
export interface FacilitySurveyData_CNInterface {
  "id"?: number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "year": number;
  "concentrationPerHour": number;
  "gasFlowPerHour"?: number;
  "workingHour"?: number;
  "pollutantAmount"?: number;
  "facilitySurvey_CNId"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class FacilitySurveyData_CN implements FacilitySurveyData_CNInterface {
  "id": number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "year": number;
  "concentrationPerHour": number;
  "gasFlowPerHour": number;
  "workingHour": number;
  "pollutantAmount": number;
  "facilitySurvey_CNId": number;
  "created": Date;
  "modified": Date;
  constructor(data?: FacilitySurveyData_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FacilitySurveyData_CN`.
   */
  public static getModelName() {
    return "FacilitySurveyData_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FacilitySurveyData_CN for dynamic purposes.
  **/
  public static factory(data: FacilitySurveyData_CNInterface): FacilitySurveyData_CN{
    return new FacilitySurveyData_CN(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'FacilitySurveyData_CN',
      plural: 'FacilitySurveyData_CNs',
      path: 'FacilitySurveyData_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "timeStartValue": {
          name: 'timeStartValue',
          type: 'Date'
        },
        "timeEndValue": {
          name: 'timeEndValue',
          type: 'Date'
        },
        "year": {
          name: 'year',
          type: 'number'
        },
        "concentrationPerHour": {
          name: 'concentrationPerHour',
          type: 'number'
        },
        "gasFlowPerHour": {
          name: 'gasFlowPerHour',
          type: 'number'
        },
        "workingHour": {
          name: 'workingHour',
          type: 'number'
        },
        "pollutantAmount": {
          name: 'pollutantAmount',
          type: 'number'
        },
        "facilitySurvey_CNId": {
          name: 'facilitySurvey_CNId',
          type: 'number'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
