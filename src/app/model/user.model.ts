import {AuthData} from './auth-data.model';
export class User{
  id: string;
  email: string;
  dateCreate: Date;
  lastLogin: Date;
  roles: Array<string>;

}
