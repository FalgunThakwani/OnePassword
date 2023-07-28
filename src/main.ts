import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import {Amplify} from 'aws-amplify';


Amplify.configure({
  Auth: {
   userPoolId: 'us-east-1_Z59kaBAlZ',
   userPoolWebClientId: '6b5o7eqv5ougfgrh9cve7m3jrl',
   region: 'us-east-1',
  }});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
