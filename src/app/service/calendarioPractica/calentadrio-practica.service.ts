import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CalendarioPracticaModel } from 'src/app/models/calendarioPractica.model';

@Injectable({
  providedIn: 'root'
})
export class CalentadrioPracticaService {
  private url = "http://localhost:5000/calendariopractica";
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${this.url}`).pipe(
      map(this.getResponseArray)
    );
  }
  findBy(request:CalendarioPracticaModel) {
    return this.http.get(`${this.url}/${request.idCalendario}`);
  }
  save(request: CalendarioPracticaModel) {
    return this.http.post(`${this.url}`, request);
  }
  delete(request: CalendarioPracticaModel) {
    return this.http.delete(`${this.url}/${request.idCalendario}`);
  }
  private getResponseArray(responseObj: Object) {
    const resp: CalendarioPracticaModel[] = [];
    if (null == responseObj) { return []; }
    Object.keys(responseObj).forEach(key => {
      const item: CalendarioPracticaModel = responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
