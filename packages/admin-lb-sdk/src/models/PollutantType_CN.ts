/* tslint:disable */

declare var Object: any;
export interface PollutantType_CNInterface {
  "id"?: number;
  "name": string;
  "created"?: Date;
  "modified"?: Date;
}

export class PollutantType_CN implements PollutantType_CNInterface {
  "id": number;
  "name": string;
  "created": Date;
  "modified": Date;
  constructor(data?: PollutantType_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PollutantType_CN`.
   */
  public static getModelName() {
    return "PollutantType_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PollutantType_CN for dynamic purposes.
  **/
  public static factory(data: PollutantType_CNInterface): PollutantType_CN{
    return new PollutantType_CN(data);
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
      name: 'PollutantType_CN',
      plural: 'PollutantType_CNs',
      path: 'PollutantType_CNs',
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
