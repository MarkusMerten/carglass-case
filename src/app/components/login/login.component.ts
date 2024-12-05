import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { markUserAsLoggedIn } from '@state/user/user.actions';
import { AppConstants } from '@constants/app-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatFormField,
    MatLabel,
    MatError,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private store = inject(Store);

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  eMailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  loginErrorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {
    merge(this.formGroup.controls['email'].statusChanges, this.formGroup.controls['email'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateMailError());

    merge(this.formGroup.controls['password'].statusChanges, this.formGroup.controls['password'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordError());
  }

  login() : void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.controls['email'].value, this.formGroup.controls['password'].value).subscribe((value: boolean) => {
        this.loginErrorMessage.set('');
        if (value) {
          this.store.dispatch(markUserAsLoggedIn({eMail: this.formGroup.controls['email'].value}));
          this.router.navigate([AppConstants.USER_LIST_ROUTE]).then();
        } else {
          this.loginErrorMessage.set('Anmeldung nicht erfolgreich. Passwort oder E-Mail falsch!');
        }
      });
    }
  }

  private updateMailError(): void {
    if (this.formGroup.controls['email'].hasError('required')) {
      this.eMailErrorMessage.set('Bitte gebe deine eMail an!');
    } else if (this.formGroup.controls['email'].hasError('email')) {
      this.eMailErrorMessage.set('Bitte gebe eine korrekte eMail an!');
    } else {
      this.eMailErrorMessage.set('');
    }
  }

  private updatePasswordError(): void {
    if (this.formGroup.controls['password'].hasError('required')) {
      this.passwordErrorMessage.set('Bitte gebe ein Passwort an!');
    } else if (this.formGroup.controls['password'].hasError('minlength')) {
      this.passwordErrorMessage.set('Bitte mindestens 6 Zeichen an!');
    } else {
      this.passwordErrorMessage.set('');
    }
  }
}
