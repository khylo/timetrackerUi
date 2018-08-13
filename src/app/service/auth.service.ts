import { User } from '../model/user.model';
import { AuthData } from '../model/auth-data.model';
import { Subject } from 'rxjs';
import { Injectable} from '@angular/core';
import { Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public static AuthSuccessPage = '/home'
    public static AuthErrorPage = '/home'
    public static AuthFailPage = '/home'
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.router = router;
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.authSuccess(result)
        }).catch(error => {
            console.log(error);
        })
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.authSuccess(result)
        }).catch(error => {
            console.log(error);
        })
    }

    private authSuccess(result) {
        console.log(result);
        this.isAuthenticated=true;
        this.authChange.next(true);
        this.router.navigate([AuthService.AuthSuccessPage]);
    }

    logout() {
        this.isAuthenticated=false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
         return this.isAuthenticated;
    }
}
