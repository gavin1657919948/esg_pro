/* tslint:disable */
import {
  FacilitySurveyData_CN,
  SystemDomain,
  SystemUser
} from '../index';

declare var Object: any;
export interface FacilitySurvey_CNInterface {
  "id"?: number;
  "serialNumber": string;
  "objUnit": string;
  "pollutantTypeId"?: number;
  "remark"?: string;
  "systemDomainId"?: string;
  "systemUserId": string;
  "created"?: Date;
  "modified"?: Date;
  facilitySurveyData_CNs?: FacilitySurveyData_CN[];
  systemDomain?: SystemDomain;
  systemUser?: SystemUser;
}

export class FacilitySurvey_CN implements FacilitySurvey_CNInterface {
  "id": number;
  "serialNumber": string;
  "objUnit": string;
  "pollutantTypeId": number;
  "remark": string;
  "systemDomainId": string;
  "systemUserId": string;
  "created": Date;
  "modified": Date;
  facilitySurveyData_CNs: FacilitySurveyData_CN[];
  systemDomain: SystemDomain;
  systemUser: SystemUser;
  constructor(data?: FacilitySurvey_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FacilitySurvey_CN`.
   */
  public static getModelName() {
    return "FacilitySurvey_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FacilitySurvey_CN for dynamic purposes.
  **/
  public static factory(data: FacilitySurvey_CNInterface): FacilitySurvey_CN{
    return new FacilitySurvey_CN(data);
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
      name: 'FacilitySurvey_CN',
      plural: 'FacilitySurvey_CNs',
      path: 'FacilitySurvey_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "serialNumber": {
          name: 'serialNumber',
          type: 'string'
        },
        "objUnit": {
          name: 'objUnit',
          type: 'string'
        },
        "pollutantTypeId": {
          name: 'pollutantTypeId',
          type: 'number'
        },
        "remark": {
          name: 'remark',
          type: 'string'
        },
        "systemDomainId": {
          name: 'systemDomainId',
          type: 'string'
        },
        "systemUserId": {
          name: 'systemUserId',
          type: 'string'
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
        facilitySurveyData_CNs: {
          name: 'facilitySurveyData_CNs',
          type: 'FacilitySurveyData_CN[]',
          model: 'FacilitySurveyData_CN'
        },
        systemDomain: {
          name: 'systemDomain',
          type: 'SystemDomain',
          model: 'SystemDomain'
        },
        systemUser: {
          name: 'systemUser',
          type: 'SystemUser',
          model: 'SystemUser'
        },
      }
    }
  }
}
