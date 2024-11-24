import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../state/user.service';
import { Observable, timer, map, switchMap, of, take } from 'rxjs';
import { UserQuery } from '../../state/user-query.service';
import { User } from '../../state/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private userQuery: UserQuery
  ) {
    this.addUserForm = this.fb.group({
      name: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.nameValidator()],
        }
      ],
      active: [false, Validators.required]
    });
  }

  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return timer(500).pipe(
        switchMap(() => this.userQuery.selectAll()),
        take(1),
        map((users: User[]) => {
          const nameExists = users.some(user => user.name === control.value);
          return nameExists ? { nameTaken: true } : null;
        })
      );
    };
  }

  addUser() {
    if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
