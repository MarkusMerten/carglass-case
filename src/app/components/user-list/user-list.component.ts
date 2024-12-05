import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
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
import { MatButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectUsers } from '@state/user/user.selector';
import { removeUser } from '@state/user/user.actions';

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
    NgIf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
    private store = inject(Store);

    displayedColumns: string[] = ['Name', 'E-Mail', 'Rolle', 'Angemeldet', 'deletion'];
    users$ = this.store.select(selectUsers);

    constructor(private router: Router) {
    }

    onDelete(user: User): void {
      this.store.dispatch(removeUser({user}));
    }

    createNewUser(): void {
      this.router.navigate(['user-create']).then();
    }

  ngOnInit(): void {

  }
}
