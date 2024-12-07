import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { AuthService } from '@services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { setLoginStatus } from '@state/user/user.actions';
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
export class LoginComponent implements OnInit {

  private store = inject(Store);

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  public eMailErrorMessage: WritableSignal<string> = signal('');
  public passwordErrorMessage: WritableSignal<string> = signal('');
  public loginErrorMessage: WritableSignal<string> = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Initializes the component after Angular first displays the data-bound properties
   * and sets the directive or component's input properties. Subscribes to status and value changes
   * of 'email' and 'password' form controls, and updates corresponding error messages.
   *
   * @return {void}
   */
  ngOnInit(): void {
    merge(this.formGroup.controls['email'].statusChanges, this.formGroup.controls['email'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateMailError());

    merge(this.formGroup.controls['password'].statusChanges, this.formGroup.controls['password'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordError());
    }

  /**
   * Logs in the user using the provided email and password.
   * If the form group is valid, it calls the authentication service login method
   * with the email and password from the form group controls.
   * If the login is successful, it updates the login status and navigates to the user list page.
   * If the login fails, it sets an error message.
   *
   * @return {void}
   */
  public login() : void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.controls['email'].value, this.formGroup.controls['password'].value).subscribe((value: boolean) => {
        this.loginErrorMessage.set('');
        if (value) {
          this.store.dispatch(setLoginStatus({eMail: this.formGroup.controls['email'].value, login: true}));
          this.router.navigate([AppConstants.USER_LIST_ROUTE]).then();
        } else {
          this.loginErrorMessage.set('Anmeldung nicht erfolgreich. Passwort oder E-Mail falsch!');
        }
      });
    }
  }

  /**
   * Updates the error message for the email input based on the validation errors.
   * @private
   * @return {void}
   */
  private updateMailError(): void {
    if (this.formGroup.controls['email'].hasError('required')) {
      this.eMailErrorMessage.set('Bitte gebe deine eMail an!');
    } else if (this.formGroup.controls['email'].hasError('email')) {
      this.eMailErrorMessage.set('Bitte gebe eine korrekte eMail an!');
    } else {
      this.eMailErrorMessage.set('');
    }
  }

  /**
   * Updates the error message for the password field based on the form controls' error status.
   *
   * @private
   * @return {void}
   */
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
