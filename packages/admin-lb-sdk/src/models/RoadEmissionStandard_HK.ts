/* tslint:disable */

declare var Object: any;
export interface RoadEmissionStandard_HKInterface {
  "id"?: number;
  "name": string;
  "roadSubgroup_HKId"?: number;
  "created"?: Date;
  "modified"?: Date;
}

export class RoadEmissionStandard_HK implements RoadEmissionStandard_HKInterface {
  "id": number;
  "name": string;
  "roadSubgroup_HKId": number;
  "created": Date;
  "modified": Date;
  constructor(data?: RoadEmissionStandard_HKInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoadEmissionStandard_HK`.
   */
  public static getModelName() {
    return "RoadEmissionStandard_HK";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoadEmissionStandard_HK for dynamic purposes.
  **/
  public static factory(data: RoadEmissionStandard_HKInterface): RoadEmissionStandard_HK{
    return new RoadEmissionStandard_HK(data);
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
      name: 'RoadEmissionStandard_HK',
      plural: 'RoadEmissionStandard_HKs',
      path: 'RoadEmissionStandard_HKs',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "roadSubgroup_HKId": {
          name: 'roadSubgroup_HKId',
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
