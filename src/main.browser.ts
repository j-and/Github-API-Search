
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {decorateModuleRef} from './app/environment';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

import {AppModule} from "./app/app.module";
import {ROUTES} from "./app/app.routes";
import {App} from "./app/app.component";

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// Bootstrap on document ready
if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
