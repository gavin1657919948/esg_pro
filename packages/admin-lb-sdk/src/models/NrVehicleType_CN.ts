/* tslint:disable */
import {
  NrEmissionStandard_CN
} from '../index';

declare var Object: any;
export interface NrVehicleType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
  nrEmissionStandard_CNs?: NrEmissionStandard_CN[];
}

export class NrVehicleType_CN implements NrVehicleType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  nrEmissionStandard_CNs: NrEmissionStandard_CN[];
  constructor(data?: NrVehicleType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NrVehicleType_CN`.
   */
  public static getModelName() {
    return "NrVehicleType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NrVehicleType_CN for dynamic purposes.
  **/
  public static factory(data: NrVehicleType_CNInterface): NrVehicleType_CN{
    return new NrVehicleType_CN(data);
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
      name: 'NrVehicleType_CN',
      plural: 'NrVehicleType_CNs',
      path: 'NrVehicleType_CNs',
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
      },
      relations: {
        nrEmissionStandard_CNs: {
          name: 'nrEmissionStandard_CNs',
          type: 'NrEmissionStandard_CN[]',
          model: 'NrEmissionStandard_CN'
        },
      }
    }
  }
}
