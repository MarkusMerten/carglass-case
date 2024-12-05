import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AppRoutingModule, INIT_ROUTES } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from '@components//header/header.component';
import { UserModule } from '@state/user/user.module';
import { AuthModule } from '@state/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    RouterModule.forRoot(INIT_ROUTES, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
    }),
    BrowserModule,
    ReactiveFormsModule,
    HeaderComponent,
    StoreModule.forRoot({}),
    UserModule,
    AuthModule
  ],
  providers: [provideStore(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
