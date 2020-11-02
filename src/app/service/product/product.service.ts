import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:5000/productos"
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${this.url}`).pipe(
      map(this.getResponseArray)
    );
  }
  save(request: ProductoModel) {
    return this.http.post(`${this.url}`, request);
  }

  update(request: ProductoModel) {
    return this.http.put(`${this.url}/${request.idProducto}`, request);
  }
  delete(request: ProductoModel) {
    return this.http.delete(`${this.url}/${request.idProducto}`);
  }

  private getResponseArray(responseObj: Object) {
    const resp: ProductoModel[] = [];
    if (null == responseObj) { return []; }
    Object.keys(responseObj).forEach(key => {
      const item: ProductoModel = responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
