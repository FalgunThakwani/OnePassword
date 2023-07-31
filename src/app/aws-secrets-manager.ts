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
            accessKeyId: 'ASIARKW74NUEJDN2CRNE',
            secretAccessKey: 'mmTeHGomunydLoHCw/mRiYFOYY+1sln0RWN7nD+g',
            sessionToken:'FwoGZXIvYXdzEDYaDGQNpo+BZ1ekRk5BuiLAAXbcgvBZ0ZQOwxR+39Aj933ifBj3uhehygN7ZgwVtW6B79jhJQv/BoqQn2Cx/QKIX86Oc9ftyyrlKa2PfBtCrDmm+Y69+SKDymORKX64L7noDW4sfdKig+QgGIqcLHQaO8kp1BGq0ajFycvvTMRxzBWRg4d897RFTPpxEIw4XraRlZf0zM06PmNeoztTT6OC/27TPLWNw5NY+rIFybiBC1Q++8Zfo2Mt11m8Df6VclmakR2bkavffqIg+c8JJ/bUHyiS0p6mBjItsOZwU65CtPDA/DtYKa/da0B7hOFEQJixrD0RnN4oVpPhn+Wjz9gcm8giyHqt'
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
