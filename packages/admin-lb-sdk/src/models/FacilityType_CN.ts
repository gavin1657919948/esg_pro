/* tslint:disable */

declare var Object: any;
export interface FacilityType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  "fuelDefine_CNId"?: number;
}

export class FacilityType_CN implements FacilityType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  "fuelDefine_CNId": number;
  constructor(data?: FacilityType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FacilityType_CN`.
   */
  public static getModelName() {
    return "FacilityType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FacilityType_CN for dynamic purposes.
  **/
  public static factory(data: FacilityType_CNInterface): FacilityType_CN{
    return new FacilityType_CN(data);
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
      name: 'FacilityType_CN',
      plural: 'FacilityType_CNs',
      path: 'FacilityType_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
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
        "fuelDefine_CNId": {
          name: 'fuelDefine_CNId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
