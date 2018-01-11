/* tslint:disable */
import {
  SystemDomain,
  SystemUser
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  "parentId"?: string;
  "type": string;
  "description"?: string;
  "city"?: string;
  "street"?: string;
  "zipCode"?: string;
  "phoneNo"?: string;
  "id"?: number;
  "systemDomainId"?: string;
  "systemUserId": string;
  systemDomain?: SystemDomain;
  systemUser?: SystemUser;
}

export class Organization implements OrganizationInterface {
  "parentId": string;
  "type": string;
  "description": string;
  "city": string;
  "street": string;
  "zipCode": string;
  "phoneNo": string;
  "id": number;
  "systemDomainId": string;
  "systemUserId": string;
  systemDomain: SystemDomain;
  systemUser: SystemUser;
  constructor(data?: OrganizationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Organization`.
   */
  public static getModelName() {
    return "Organization";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Organization for dynamic purposes.
  **/
  public static factory(data: OrganizationInterface): Organization{
    return new Organization(data);
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
      name: 'Organization',
      plural: 'Organizations',
      path: 'Organizations',
      properties: {
        "parentId": {
          name: 'parentId',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "street": {
          name: 'street',
          type: 'string'
        },
        "zipCode": {
          name: 'zipCode',
          type: 'string'
        },
        "phoneNo": {
          name: 'phoneNo',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "systemDomainId": {
          name: 'systemDomainId',
          type: 'string'
        },
        "systemUserId": {
          name: 'systemUserId',
          type: 'string'
        },
      },
      relations: {
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
