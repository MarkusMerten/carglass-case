import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User} from '@models/user.model';
import { Roles } from '@models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USERS: User [] = [
    { name: 'Detlef Richter', eMail: 'krichter@gmx.de', role: Roles.ADMIN, loginDate: null},
    { name: 'Markus Merten', eMail: 'markus_merten@gmx.net', role: Roles.ADMIN, loginDate: null},
    { name: 'Martina Mustermann', eMail: 'mustermann_martina@gmx.net', role: Roles.USER, loginDate: null}];

  constructor() { }

  public getAllUser(): Observable<User[]> {
    return of(this.USERS);
  }

  public addUser(user: User): Observable<User> {
    this.USERS.push(user);
    return of(user);
  }
}
