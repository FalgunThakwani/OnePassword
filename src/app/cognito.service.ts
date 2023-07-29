import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Amplify} from 'aws-amplify';
import {Auth} from 'aws-amplify';
import { HttpClient } from '@angular/common/http';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  private userPoolId: String ="";
  private userPoolClientId: String = "";

  constructor(private http:HttpClient) {
    Amplify.configure({
      Auth: {
       userPoolId: this.userPoolId,
       userPoolWebClientId: this.userPoolClientId,
       region: 'us-east-1',
      }});

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  getUserPoolDetails(){
    const userPoolFilePath = '../assets/user_pool_id.txt';
    const userPoolClientFilePath = '../assets/user_pool_client_id.txt';
    console.log('user_pool')
    this.http.get(userPoolFilePath, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log(response)
        this.userPoolId= response;
      },
      (error) => {
        console.error('Error reading file:', error);
      }
    );
    this.http.get(userPoolClientFilePath, { responseType: 'text' }).subscribe(
      (response: string) => {
        console.log(response)
        this.userPoolClientId= response;
      },
      (error) => {
        console.error('Error reading file:', error);
      }
    );
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}