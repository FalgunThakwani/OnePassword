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
            accessKeyId: 'ASIARKW74NUEMIPUVLEL',
            secretAccessKey: 'P37ggC/HLAJPUqhN8yZ+YjdFVABn3QrzhpAvnPtu',
            sessionToken:'FwoGZXIvYXdzEAcaDNIRQNWOPiGnZXSTkyLAAYWuIh9FIGt21oz0dhSbt4zPB2QWcBUkhIhEtDf5jHFNJLzd4ZBryfWXWrqdxJh7HdeXW9nSv9KJxeN7hBG5CzEmSh0qEc3jexTN48fcfLyjjB6KV5PFx1YZ44I7C5NzmsN5ynGpdxXV9hf+aZGMWctfCjhjtlqqzTDeGxQVcSOxappy6luztc3P1xkFcpbR0aaG79RZkAy8P4/cFFvPD4BvE6TIJ/swBWKJIBaUbDwrNLVFqARqMFPo0SZAIE0smCjEopSmBjItLSgIFebkx2GLMjX7SeL8TRc27I48QjgLgMgiXPb9P+lshDcABURHE22N1UwR'
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
