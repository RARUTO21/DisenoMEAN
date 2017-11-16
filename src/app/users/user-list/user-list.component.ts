import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

  users: User[];
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  this.userService.getUsers().then((users: User[]) => {
    this.users = users.map((user) => {
      return user;
    });

  });

  }

}
