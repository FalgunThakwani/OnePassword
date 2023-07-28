import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  email!: string;
  showForm: boolean = true;
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  onSubmit(): void {
    const formData = { email: this.email };
    
    // Make the HTTP POST request to your API
    this.http.post('https://5rwqji8j08.execute-api.us-east-1.amazonaws.com/default/CreateSubscribers2', formData)
      .subscribe(
        response => {
          console.log('API response:', response);
          this.showForm = false;
          this.successMessage = 'Thank you for subscribing to RecipeLish! An email has been sent to your mailbox. Please check your inbox and click on the confirmation link to complete the subscription process.';
        },
        error => {
          console.error('API error:', error);
          // Handle any errors from the API request
        }
      );
  }
}
