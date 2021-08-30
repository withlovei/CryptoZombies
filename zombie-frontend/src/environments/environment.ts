// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const CONST = {
  WEI: 1000000000000000000,
  ZOMBIE_CONTRACT: '0x0072901B121fC46570E17730894f09724DC001f3',
  WEI_CHANGE_NAME: 1000000000000000000*0.25,
  WEI_UPLEVEL: 1000000000000000000*0.5,
}
export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
