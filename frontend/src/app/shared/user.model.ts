export class User {
    email: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.user.email;
        this.roles = { reader: true }
    }
}

export interface Roles {
    reader: boolean;
    admin?:  boolean;
  }
