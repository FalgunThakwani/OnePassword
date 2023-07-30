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
            accessKeyId: 'ASIARKW74NUEMSIYEWDY',
            secretAccessKey: '4puN7x3JhJzY52TkAxChHDfVQRDvmoTDVnW1D7LL',
            sessionToken:'FwoGZXIvYXdzEB4aDKOoBAPxrGmQ1oxxQyLAAaT9Nuar8bq4SuGTvGlItmo6JNUxjNM9g1pGNxY7ED3Qnd6eItr3wkdBQ8p6CIzWnu4cVehSYW1mftGgV/xMIlvoPd/hsZ6QPQvhyXBgih7tcTxw4n28JO/5Hd0XT4jdN9zvBgzpVZr7r/805sC7idb9JiujUfP2/UW2Nrd5HuelkEbMrzBEOX9JWf1pdW3OOBoE8H4G5EAcSJ6BZpAjoGjh3y33lKxJZPoxLl/ncjB0i2/U9udQn65e3YQFLpzMRCj7pZmmBjItwfm6AUBVXCcDmaZU3zxIC+nTegpqH0tjYLqTOZSF3trehsMVmNz0z1B6YmBI'
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
