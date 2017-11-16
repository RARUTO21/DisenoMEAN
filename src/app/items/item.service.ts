import { Injectable } from '@angular/core';
import { Item } from './item';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {

  private itemsURL = '/api/items';

  constructor(private http: Http) { }

  // get("/api/items")
  getItems(): Promise<void | Item[]> {
    return this.http.get(this.itemsURL)
      .toPromise()
      .then(response => response.json() as Item[])
      .catch(this.handleError);
  }

  // put("/api/users/:id")
  updateItem(putItem: Item): Promise<void | Item> {
    const putUrl = this.itemsURL + '/' + putItem._id;
    return this.http.put(putUrl, putItem)
      .toPromise()
      .then(response => response.json() as Item)
      .catch(this.handleError);
  }


  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
