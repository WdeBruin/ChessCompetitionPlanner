// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  api: 'http://localhost:5000/api',
  firebase: {
    apiKey: 'AIzaSyDf4_PGKAn9XZ-M7ShYFMedqIiqnYSDuOM',
    authDomain: 'chess-prod-e695e.firebaseapp.com',
    databaseURL: 'https://chess-prod-e695e.firebaseio.com',
    projectId: 'chess-prod-e695e',
    storageBucket: 'chess-prod-e695e.appspot.com',
    messagingSenderId: '905399664437'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
