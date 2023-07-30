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
            accessKeyId: 'ASIARKW74NUEALNDH5W2',
            secretAccessKey: 'rjiagpx65MGbc+1t/0F9iRonbbfPLwKL4on1cO2H',
            sessionToken:'FwoGZXIvYXdzECkaDLz3ILz8WaTpNtmKrSLAAZG8Nfx88Jj42NunyOAA58RwLtC/XcazRMt+c/vCxVSFYl1+uAZMjvFz37++cvQnrGd9MruAMuwFx3O5S3IFSpwLm+tWSx4RLFQJZLeUUZCH8sOO5T+SfKzqa9muwoEB41EYSzQp0//0+QOcjstLy/bcrThatHVKOxjVuGj3g75oFuiDV3m+2AAmO0qZIkUV9rT+LidGJvigelv/caJINxr+wBVT3z6qQGVXLd8Fu8EZlJAdsUSUGGZH652oDB5Wyijd6JumBjItmoFvirSnql2ssz21XU61xaGzN7wapFh0Jf1YlhTOI+XSOshj2xb2tPKNRce9'
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
