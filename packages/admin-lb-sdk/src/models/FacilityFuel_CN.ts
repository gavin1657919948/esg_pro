/* tslint:disable */

declare var Object: any;
export interface FacilityFuel_CNInterface {
  "id"?: number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "sul"?: number;
  "ash"?: number;
  "consumption": number;
  "facility_CNId"?: number;
  "created"?: Date;
  "modified"?: Date;
  "emissionId"?: number;
  "gasEmissionId"?: number;
  emission?: any;
  gasEmission?: any;
}

export class FacilityFuel_CN implements FacilityFuel_CNInterface {
  "id": number;
  "timeStartValue": Date;
  "timeEndValue": Date;
  "timeUnit": string;
  "year": number;
  "sul": number;
  "ash": number;
  "consumption": number;
  "facility_CNId": number;
  "created": Date;
  "modified": Date;
  "emissionId": number;
  "gasEmissionId": number;
  emission: any;
  gasEmission: any;
  constructor(data?: FacilityFuel_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FacilityFuel_CN`.
   */
  public static getModelName() {
    return "FacilityFuel_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FacilityFuel_CN for dynamic purposes.
  **/
  public static factory(data: FacilityFuel_CNInterface): FacilityFuel_CN{
    return new FacilityFuel_CN(data);
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
      name: 'FacilityFuel_CN',
      plural: 'FacilityFuel_CNs',
      path: 'FacilityFuel_CNs',
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
        "timeUnit": {
          name: 'timeUnit',
          type: 'string'
        },
        "year": {
          name: 'year',
          type: 'number'
        },
        "sul": {
          name: 'sul',
          type: 'number'
        },
        "ash": {
          name: 'ash',
          type: 'number'
        },
        "consumption": {
          name: 'consumption',
          type: 'number'
        },
        "facility_CNId": {
          name: 'facility_CNId',
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
        "emissionId": {
          name: 'emissionId',
          type: 'number'
        },
        "gasEmissionId": {
          name: 'gasEmissionId',
          type: 'number'
        },
      },
      relations: {
        emission: {
          name: 'emission',
          type: 'any',
          model: ''
        },
        gasEmission: {
          name: 'gasEmission',
          type: 'any',
          model: ''
        },
      }
    }
  }
}
