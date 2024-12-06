import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Roles } from '@models/roles';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { addUser } from '@state/user/user.actions';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { AppConstants } from '@constants/app-constants';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  private store = inject(Store);

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

  public eMailErrorMessage: WritableSignal<string> = signal('');

  constructor(private router: Router) {
    merge(this.formGroup.controls['email'].statusChanges, this.formGroup.controls['email'].valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateMailError());
  }

  public save() : void {
    this.updateMailError();

    if (this.formGroup.valid) {
      const user: User = {eMail: this.formGroup.controls['email'].value, name: this.formGroup.controls['name'].value, role: this.formGroup.controls['role'].value, loginDate: null};
      this.store.dispatch(addUser({user: user}));
      this.router.navigate([AppConstants.USER_LIST_ROUTE]).then();
    }
  }

  get getRoles(): Roles [] {
    return Object.values(Roles);
  }

  private updateMailError(): void {
    if (this.formGroup.controls['email'].hasError('required')) {
      this.eMailErrorMessage.set('Bitte gebe deine E-Mail an!');
    } else if (this.formGroup.controls['email'].hasError('email')) {
      this.eMailErrorMessage.set('Bitte gebe eine korrekte eMail an!');
    } else {
      this.eMailErrorMessage.set('');
    }
  }

}
