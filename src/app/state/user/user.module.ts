import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from '@state/user/user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('user', reducer), // Auth Feature registrieren
  ],
})
export class UserModule {}
