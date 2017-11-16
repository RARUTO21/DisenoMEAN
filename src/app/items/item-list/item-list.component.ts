import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { User } from '../../users/user';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemListComponent implements OnInit {

  @Input
  user: User;

  items: Item[]
  itemsAux: Item[]
  selectedItem: Item

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService
      .getItems()
      .then((items: Item[]) => {
        this.items = items.map((item) => {
          return item;
        });

      });

    this.userItems();
    this.itemsAux = [];
  }

  userItems() {
    this.itemsAux = [];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]._id in this.user.items) {
        this.itemsAux.push(this.items[i]);
      }
    }
  };

  selectItem (item: Item) {
    this.selectedItem = item;
  }

  private getIndexOfItem = (itemID: number) => {
    return this.items.findIndex((item) => {
      return item._id === itemID;
    });
  }

  updateItem = (item: Item) => {
    const idx = this.getIndexOfItem(item._id);
    if (idx !== -1) {
      this.items[idx] = item;
      this.selectItem(item);
    }
    return this.items;
  }

}
