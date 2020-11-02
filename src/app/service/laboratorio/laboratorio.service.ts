import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaboratorioModel } from 'src/app/models/laboratorio.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private url = "http://localhost:5000/laboratorio";
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get(`${this.url}`).pipe(
      map(this.getResponseArray)
    );
  }
  
  save(request:LaboratorioModel){
    return this.http.post(`${this.url}`,request);
  }

  update(request:LaboratorioModel){
    console.log("resquest");
    console.log(request);
    return this.http.put(`${this.url}/${request.idLaboratorio}`,request);
  }

  delete(request:LaboratorioModel){
    return this.http.delete(`${this.url}/${request.idLaboratorio}`);
  }
  private getResponseArray(responseObj: Object){
    const resp : LaboratorioModel[] = [];
    if(null == responseObj){ return [];}
    Object.keys(responseObj).forEach(key=>{
      const item : LaboratorioModel =responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
