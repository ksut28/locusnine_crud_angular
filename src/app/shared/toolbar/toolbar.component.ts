import { Component } from '@angular/core';
import { UsersComponent } from 'src/app/users/users.component'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  userButton = false;
  constructor(public dialog: MatDialog) { }

  makeUserButtonInactive() {
    this.userButton = false;
  }

  openUsersDialog() {
    this.userButton = true;
    this.dialog.open(UsersComponent, {
      height: '80%',
      width: '90%',
    });
  }
}
