import {ProfileType} from "../../main/core/models/profile-type.enum";

export class User {
  constructor(
    public profile: ProfileType,
    public authorities: any,
    public id: number,
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public roles:string[] ,
  ) {}
}
