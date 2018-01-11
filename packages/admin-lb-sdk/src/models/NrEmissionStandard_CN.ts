/* tslint:disable */

declare var Object: any;
export interface NrEmissionStandard_CNInterface {
  "id"?: number;
  "name": string;
  "nrVehicleType_CNId"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class NrEmissionStandard_CN implements NrEmissionStandard_CNInterface {
  "id": number;
  "name": string;
  "nrVehicleType_CNId": number;
  "created": Date;
  "modified": Date;
  constructor(data?: NrEmissionStandard_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NrEmissionStandard_CN`.
   */
  public static getModelName() {
    return "NrEmissionStandard_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NrEmissionStandard_CN for dynamic purposes.
  **/
  public static factory(data: NrEmissionStandard_CNInterface): NrEmissionStandard_CN{
    return new NrEmissionStandard_CN(data);
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
      name: 'NrEmissionStandard_CN',
      plural: 'NrEmissionStandard_CNs',
      path: 'NrEmissionStandard_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "nrVehicleType_CNId": {
          name: 'nrVehicleType_CNId',
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
