import { Component, Input, ViewEncapsulation } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ItemService } from '../../items/item.service';
import { ItemListComponent} from '../../items/item-list/item-list.component';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent {

  @Input()
  user: User;
  @Input()
  updateHandler: Function;

  constructor(private userService: UserService) { }

  updateUser(user: User): void {
    this.userService.updateUser(user).then((updatedUser: User) => {
      this.updateHandler(updatedUser);
    });
  }

}
