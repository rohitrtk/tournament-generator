import { isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimations } from "@angular/platform-browser/animations";

import { AppComponent } from "./app/app.component";
import { bracketFeatureKey, bracketReducer } from "./app/store/reducers";

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideState(bracketFeatureKey, bracketReducer),
    // provideEffects(authEffects),
    provideAnimations(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ]
})