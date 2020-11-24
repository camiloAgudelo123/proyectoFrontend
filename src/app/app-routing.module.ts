import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LaboratorioComponent } from './pages/laboratorio/laboratorio.component';
import { ModificarProductoComponent } from './pages/modificar-producto/modificar-producto.component';
import { PracticaComponent } from './pages/practica/practica.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {path:'inicio', component: HomeComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'laboratorios', component: LaboratorioComponent},
  {path:'practicas', component: PracticaComponent},
  {path:'productos', component: ProductsComponent},
  {path:'producto/nuevo', component: ProductComponent},
  {path:'productos/:', component: ModificarProductoComponent},
  {path:'**:', pathMatch: 'full',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
