/* tslint:disable */

declare var Object: any;
export interface NrRatedPowerType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
}

export class NrRatedPowerType_CN implements NrRatedPowerType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  constructor(data?: NrRatedPowerType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NrRatedPowerType_CN`.
   */
  public static getModelName() {
    return "NrRatedPowerType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NrRatedPowerType_CN for dynamic purposes.
  **/
  public static factory(data: NrRatedPowerType_CNInterface): NrRatedPowerType_CN{
    return new NrRatedPowerType_CN(data);
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
      name: 'NrRatedPowerType_CN',
      plural: 'NrRatedPowerType_CNs',
      path: 'NrRatedPowerType_CNs',
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
      }
    }
  }
}
