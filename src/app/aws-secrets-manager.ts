import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';


@Injectable({
  providedIn: 'root',
})
export class AwsSecretsService {
  private secretsManager: AWS.SecretsManager;

  constructor() {
    AWS.config.update({
        region: 'us-east-1',
        credentials: new AWS.Credentials({
            accessKeyId: 'ASIARKW74NUEOK6F7D5K',
            secretAccessKey: 'upSVFPPYwz4fiv5IUcwC9rzpVV4md62dqtw3ESgl',
            sessionToken:'FwoGZXIvYXdzEA0aDFLNBLGSWMAZAr7AQCLAAQB8O9kgcR2f8+z2ItJWRgjggv8z/daLQEj3kRTitVO3coyc5IDqs9eIbaZi+88V6Tcv6f1JIxnp97TXu6QmhoFhq5Kjrc7MgjLHi6qoevAu0p8UhZOXH1QVxwnHPes6OQsZ5WJqhlY+tdnYWyKPlzNKL+J3Yr5F4QNM6givdOod0RQa3mXu6tis/sOv+xCkcvJmNiCRbeRZw4CP4rF8z4+wy6/Q9+JkXnxRTyzcldxUsT0WoeFM6yTwt2SI80D/WCip0pWmBjItAvfWpSxdCYhARSzIMPNarDqk5bE2jTpxb4svS6RcbWsPjPp+UgeWp76PIxfi'
        }),
      });
      this.secretsManager = new AWS.SecretsManager();
  }

  getSecretValue(secretName: string): Promise<AWS.SecretsManager.GetSecretValueResponse> {
    const params = {
      SecretId: secretName,
    };
    
    return this.secretsManager.getSecretValue(params).promise();
  }
}
