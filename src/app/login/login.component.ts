import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { IUser, CognitoService } from '../cognito.service';
import { HttpClient } from '@angular/common/http';
import { AwsSecretsService } from '../aws-secrets-manager';
@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formData = {
    platform: '',
    username: '',
    password: ''
  };
  loading: boolean;
  user: IUser;
  successMessage: string = '';
  jsonData :any = [];
  api_gateway :any = '';
  secretValue: any = '';
  constructor(private router: Router,
              private cognitoService: CognitoService,private http: HttpClient, private awsSecretsService: AwsSecretsService) {
    this.loading = false;
    this.user = {} as IUser;
    this.getSecret();
  }
  ngOnInit(){
    this.fetchData();
  }

  fetchData(){
    let userEmail;
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
        userEmail = user.attributes.email;
        console.log(this.api_gateway)
        const apiUrl = 'https://'+this.api_gateway+'.execute-api.us-east-1.amazonaws.com/default/PerformEncryption';
        console.log(apiUrl);
        const body = {
          email: userEmail,
          type: 'decrypt'
        };
        this.http.post(apiUrl, body).subscribe(
          (response) => {
            console.log('API Response:', response);
            this.jsonData = response; 
            // Add any further actions you want to perform after a successful API call.
          },
          (error) => {
            console.error('API Error:', error);
            // Handle errors or display error messages.
          }
        );
      })
      .catch((err) => {
        console.error('Error getting authenticated user:', err);
      });
    }
  
  async getSecret(): Promise<void> {
    try {
      const secretName = 'PasswordsUserPoolID';
      const secretResponse = await this.awsSecretsService.getSecretValue(secretName);
      this.api_gateway = secretResponse.SecretString;
    } catch (error) {
      console.error('Error fetching secret:', error);
    }
  }


  submitForm() {
    let userEmail;
    
    Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user)
       userEmail = user.attributes.email;
       const apiUrl = 'https://dmzs517vpa.execute-api.us-east-1.amazonaws.com/default/PerformEncryption';
       const body = {
           email:userEmail,
           platform:this.formData.platform,
           username:this.formData.username,
           password:this.formData.password,
           type:"encrypt"
       }
       // Send the form data to the API using POST method
       this.http.post(apiUrl, body).subscribe(
         (response) => {
           console.log('API Response:', response);
           this.successMessage="Your Credentials are secured!"
           // Add any further actions you want to perform after a successful API call.
         },
         (error) => {
           console.error('API Error:', error);
           // Handle errors or display error messages.
         }
       );
       
    })
   
  }

  revealPassword(item: any) {
    item.revealPassword = !item.revealPassword;
  }


}