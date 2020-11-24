import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PeligrosidadNTCModel } from 'src/app/models/peligrosidadNTC.model';

@Injectable({
  providedIn: 'root'
})
export class PeligrosidadNtcService {
  private url = "http://localhost:5000/peligrosidadntc"
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${this.url}`).pipe(
      map(this.getResponseArray)
    );
  }
  private getResponseArray(responseObj: Object) {
    const resp: PeligrosidadNTCModel[] = [];
    if (null == responseObj) { return []; }
    Object.keys(responseObj).forEach(key => {
      const item: PeligrosidadNTCModel = responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
