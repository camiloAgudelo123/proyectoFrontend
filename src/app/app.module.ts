import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './pages/components/footer/footer.component';
import { DataTablesModule } from 'angular-datatables';
import { HomeComponent } from './pages/home/home.component';
import { LaboratorioComponent } from './pages/laboratorio/laboratorio.component';
import { PracticaComponent } from './pages/practica/practica.component';
import { ModificarProductoComponent } from './pages/modificar-producto/modificar-producto.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    HeaderComponent,
    UsuariosComponent,
    FooterComponent,
    HomeComponent,
    LaboratorioComponent,
    PracticaComponent,
    ModificarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    DataTablesModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
