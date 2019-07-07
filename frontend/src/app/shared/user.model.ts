export class User {
    email: string;
    roles: Roles;
}

export interface Roles {
    reader: boolean;
    admin?:  boolean;
  }
