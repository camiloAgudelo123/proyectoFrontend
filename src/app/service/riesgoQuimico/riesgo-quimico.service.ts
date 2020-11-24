import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RiesgoQuimicoModel } from 'src/app/models/riesgoQuimico.model';

@Injectable({
  providedIn: 'root'
})
export class RiesgoQuimicoService {

  private url = "http://localhost:5000/riesgosquimicos"
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get(`${this.url}`).pipe(
      map(this.getResponseArray)
    );
  }
  save(request:RiesgoQuimicoModel){
    return this.http.post(`${this.url}`,request);
  }

  update(request:RiesgoQuimicoModel){
    return this.http.put(`${this.url}/${request.idRiesgo}`,request);
  }
  delete(request:RiesgoQuimicoModel){
    return this.http.delete(`${this.url}/${request.idRiesgo}`);
  }

  private getResponseArray(responseObj: Object){
    const resp : RiesgoQuimicoModel[] = [];
    if(null == responseObj){ return [];}
    Object.keys(responseObj).forEach(key=>{
      const item : RiesgoQuimicoModel =responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
