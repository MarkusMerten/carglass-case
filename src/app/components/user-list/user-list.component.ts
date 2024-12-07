import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { User } from '@models/user.model';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { selectUsers } from '@state/user/user.selector';
import { removeUser } from '@state/user/user.actions';
import { AppConstants } from '@constants/app-constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatFabButton,
    MatMiniFabButton,
    MatButton,
    AsyncPipe,
    NgIf,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
    private store = inject(Store);
    public displayedColumns: string[] = ['Name', 'E-Mail', 'Rolle', 'Angemeldet', 'deletion'];
    public users$: Observable<User[]> = this.store.select(selectUsers);

    constructor(private router: Router) {}

  /**
   *
   * @param {User} user - The user object to be deleted.
   * @return {void}
   */
  public onDelete(user: User): void {
      this.store.dispatch(removeUser({user}));
    }

  /**
   * Navigates to the create user route.
   *
   * @return {void}
   */
  public createNewUser(): void {
      this.router.navigate([AppConstants.USER_CREATE_ROUTE]).then();
    }

}
