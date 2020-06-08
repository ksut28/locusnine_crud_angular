import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  // API URLs
  getApi = "http://localhost:8081/users";
  postApi = "http://localhost:8081/users/add";
  editApi = "http://localhost:8081/users/edit";
  deleteApi = "http://localhost:8081/users/delete";

  // To Get All User Details
  getAllUsers() {
    return this.http.get(this.getApi);
  }

  // To Add New User
  addUser(userData: Object) {
    return this.http.post(this.postApi, userData);
  }

  // To Edit an existing User
  editUser(userData: Object) {
    return this.http.put(this.editApi, userData);
  }

  // To Delete an existing User
  deleteUser(userId: string) {
    return this.http.delete(this.deleteApi + '?id=' + userId);
  }

  editFlag = false;

  user = {
    id: '',
    name: '',
    email: '',
    roleType: '',
    status: ''
  }

  populateUserData(user: any) {
    this.user.id = user.id;
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.roleType = user.roleType;
    this.user.status = user.status;
    this.editFlag = true;
  }

  resetUserDetails() {
    this.user.id = ''
    this.user.name = ''
    this.user.email = ''
    this.user.roleType = ''
    this.user.status = ''
    this.editFlag = false;
  }

  constructor(public http: HttpClient) { }
}
