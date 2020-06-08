import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditUsersComponent } from '../add-edit-users/add-edit-users.component';
import { UserDetailsService } from '../services/user-details.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // for sorting in user details table based on names
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  userDetails: any[];

  // get user details from backend on init
  ngOnInit() {
    this.service.getAllUsers().subscribe((data: any[]) => {
      this.userDetails = data;
    },
      () => {
        console.log('error');
      },
      // on completion
      () => {
        this.initializeTable(this.userDetails)
      }
    )
  }

  // populate the user details in table
  initializeTable(userDetails: any[]) {
    this.dataSource = new MatTableDataSource(userDetails);
    this.dataSource.sort = this.sort;
  }

  // constructor
  constructor(public dialogRef: MatDialogRef<AddEditUsersComponent>, private service: UserDetailsService, public dialog: MatDialog) { }

  // for searching in user details table
  dataSource: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // title of the displayed columns
  columns: string[] = ['name', 'email', 'roleType', 'status', 'deleteUser', 'editUser'];

  // open edit user dialog box from add-edit-users.component 
  openEditUserDialog(user: any) {
    // update details in service to be populated for editing
    this.service.populateUserData(user);
    // display the dialog
    this.showAddEditUserDialog();
  }

  // method to display the dialog with specified configs
  showAddEditUserDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    this.dialogRef = this.dialog.open(AddEditUsersComponent, dialogConfig);

    // reset user details in service on dialog close
    this.dialogRef.afterClosed().subscribe(() => {
      // refresh view after add/edit
      this.ngOnInit();

      // reset User in service after add/edit
      this.service.resetUserDetails();
    });
  }

  // delete user details
  deleteUser(userId: string) {
    this.service.deleteUser(userId).subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      }
    );
  }
}
