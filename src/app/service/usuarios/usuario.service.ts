import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = "http://localhost:5000/usuarios"
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get(`${this.url}`).pipe(
      map(this.getResponseArray)
    );
  }
  save(request:UsuarioModel){
    return this.http.post(`${this.url}`,request);
  }

  update(request:UsuarioModel){
    return this.http.put(`${this.url}/${request.idUsuario}`,request);
  }
  delete(request:UsuarioModel){
    return this.http.delete(`${this.url}/${request.idUsuario}`);
  }

  private getResponseArray(responseObj: Object){
    const resp : UsuarioModel[] = [];
    if(null == responseObj){ return [];}
    Object.keys(responseObj).forEach(key=>{
      const item : UsuarioModel =responseObj[key];
      // item.columna1 = key;
      resp.push(item);
    });
    return resp;
  }
}
