/* tslint:disable */

declare var Object: any;
export interface RoadEmissionStandard_CNInterface {
  "id"?: number;
  "name": string;
  "roadVehicleType_CNId"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class RoadEmissionStandard_CN implements RoadEmissionStandard_CNInterface {
  "id": number;
  "name": string;
  "roadVehicleType_CNId": number;
  "created": Date;
  "modified": Date;
  constructor(data?: RoadEmissionStandard_CNInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadEmissionStandard_CN`.
   */
  public static getModelName() {
    return "RoadEmissionStandard_CN";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadEmissionStandard_CN for dynamic purposes.
  **/
  public static factory(data: RoadEmissionStandard_CNInterface): RoadEmissionStandard_CN{
    return new RoadEmissionStandard_CN(data);
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
      name: 'RoadEmissionStandard_CN',
      plural: 'RoadEmissionStandard_CNs',
      path: 'RoadEmissionStandard_CNs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "roadVehicleType_CNId": {
          name: 'roadVehicleType_CNId',
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
