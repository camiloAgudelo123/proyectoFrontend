import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RiesgoQuimicoPeligroModel } from 'src/app/models/riesgoQuimicoPeligro.model';

@Injectable({
  providedIn: 'root'
})
export class RiesgoQuimicoPeligroService {
  private url = "http://localhost:5000/riesgosquimicospeligro";
  constructor(private http: HttpClient) { }

  save(request: RiesgoQuimicoPeligroModel) {
    return this.http.post(`${this.url}`, request);
  }
  delete(request: RiesgoQuimicoPeligroModel) {
    return this.http.delete(`${this.url}/${request.id}`);
  }
  private getResponseArray(responseObj: Object) {
    const resp: RiesgoQuimicoPeligroModel[] = [];
    if (null == responseObj) { return []; }
    Object.keys(responseObj).forEach(key => {
      const item: RiesgoQuimicoPeligroModel = responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
