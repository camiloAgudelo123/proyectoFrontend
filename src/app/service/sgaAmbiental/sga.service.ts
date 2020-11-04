import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SgaAmbientalModel } from 'src/app/models/sgaambiental.model';

@Injectable({
  providedIn: 'root'
})
export class SgaService {
  private url = "http://localhost:5000/";
  constructor(private http: HttpClient) { }

  findAll(type:string) {
    return this.http.get(`${this.url}/${type}`).pipe(
      map(this.getResponseArray)
    );
  }

  private getResponseArray(responseObj: Object){
    const resp : SgaAmbientalModel[] = [];
    if(null == responseObj){ return [];}
    Object.keys(responseObj).forEach(key=>{
      const item : SgaAmbientalModel =responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
