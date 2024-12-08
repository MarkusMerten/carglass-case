import { NgModule } from '@angular/core';
import {provideStore, StoreModule} from '@ngrx/store';
import { reducer } from '@state/user/user.reducer';
import {EffectsModule, provideEffects} from '@ngrx/effects';
import * as userEffects from '@state/user/user.effects';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

@NgModule({
  imports: [
    StoreModule.forFeature('user', reducer)
  ],
})
export class UserModule {}
