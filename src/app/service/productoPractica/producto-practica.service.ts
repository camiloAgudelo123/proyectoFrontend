import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductoPracticaModel } from 'src/app/models/productoPractica.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoPracticaService {
  private url = "http://localhost:5000/productopractica";
  constructor(private http: HttpClient) { }

  save(request: ProductoPracticaModel) {
    return this.http.post(`${this.url}`, request);
  }
  delete(request: ProductoPracticaModel) {
    return this.http.delete(`${this.url}/${request.id}`);
  }
  private getResponseArray(responseObj: Object) {
    const resp: ProductoPracticaModel[] = [];
    if (null == responseObj) { return []; }
    Object.keys(responseObj).forEach(key => {
      const item: ProductoPracticaModel = responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
