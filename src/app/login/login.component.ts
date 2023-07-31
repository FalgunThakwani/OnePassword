import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { IUser} from '../cognito.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  user: IUser;
  username: string = "";
  password: string = "";
  errorMessage: string="";
  isSignUp: boolean = false;
  signupUsername: string ="";
  signupPassword: string="";
  isVerificationCode: boolean = false;
  verificationCode: string = "";
  constructor(private router: Router) {
    this.user = {} as IUser;
}
toggleSignUp() {
  this.isSignUp = !this.isSignUp;
}
onSignUp() {
  Auth.signUp({
    username: this.signupUsername,
    password: this.signupPassword,
  })
    .then((data) => {
      this.isVerificationCode = true;
      this.errorMessage = '';
    })
    .catch((error) => {
      console.log(error);
      this.errorMessage = error.message || 'An error occurred during sign up.';
    });
}
onVerify() {
  Auth.confirmSignUp(this.signupUsername, this.verificationCode)
    .then(() => {
      this.isSignUp = false;
      this.isVerificationCode = false;
      this.errorMessage = '';
    })
    .catch((error) => {
      console.log(error);
      this.errorMessage = error.message || 'An error occurred during verification.';
    });
}
  onLogin() {
    Auth.signIn(this.username, this.password)
      .then(() => {
        // Login successful, redirect to the protected page or do any other actions
        // For example, you can navigate to a different route:
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.errorMessage = error.message || 'An error occurred during login.';
      });
  }
 


}