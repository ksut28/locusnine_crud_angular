import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {

  constructor(private service: UserDetailsService) { }

  // Check whether this is an edit or add operation to populate the title of Dialog
  ngOnInit(): void {
    if (this.service.editFlag == false) {
      this.title = "Add User";
    }
    else {
      this.title = "Edit User";
    }
  }

  roleTypes: string[] = ['Admin', 'Customer Executive'];
  userDetails: any[];
  title: any;
  

  // To Add or Edit user details
  addOrEditUser() {

    // Add new User
    if (this.service.editFlag === false) {
      this.service.addUser(this.service.user).subscribe(
        (data: any[]) => {
          this.userDetails = data;
        },
        () => {
          console.log('error');
        }
      );
    }
    else {

      // Edit an existing user
      this.service.editUser(this.service.user).subscribe(
        (data: any[]) => {
          this.userDetails = data;
        },
        () => {
          console.log('error');
        }
      );
    }

    // Reset user object after add/edit
    this.service.resetUserDetails();
  }
}
