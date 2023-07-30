import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Amplify} from 'aws-amplify';
import {Auth} from 'aws-amplify';
import { HttpClient } from '@angular/common/http';
import { AwsSecretsService } from './aws-secrets-manager';

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
  private userPoolId: any ="";
  private userPoolClientId: any = "";

  constructor(private http:HttpClient,private awsSecretsService: AwsSecretsService) {
    this.getSecret().then(()=>{
      console.log(this.userPoolId);
      Amplify.configure({
        Auth: {
         userPoolId: this.userPoolId,
         userPoolWebClientId: this.userPoolClientId,
         region: 'us-east-1',
        }});

    })
      
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }


    async getSecret(): Promise<void> {
      try {
        const secretNameUserPool = 'PasswordsUserPoolID';
        const secretResponseUserPool = await this.awsSecretsService.getSecretValue(secretNameUserPool);
        this.userPoolId = secretResponseUserPool.SecretString;
        const secretNameUserPoolClient = 'PasswordsUserPoolClientID';
        const secretResponseUserPoolClient = await this.awsSecretsService.getSecretValue(secretNameUserPoolClient);
        this.userPoolClientId = secretResponseUserPoolClient.SecretString;
      } catch (error) {
        console.error('Error fetching secret:', error);
      }
    }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email
    }
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