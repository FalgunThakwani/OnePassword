import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { IUser, CognitoService } from '../cognito.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router,
              private cognitoService: CognitoService,private http: HttpClient) {
    this.loading = false;
    this.user = {} as IUser;
  }
  ngOnInit(){
    let userEmail;
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
        userEmail = user.attributes.email;
        const apiUrl = 'https://dmzs517vpa.execute-api.us-east-1.amazonaws.com/default/PerformEncryption';
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