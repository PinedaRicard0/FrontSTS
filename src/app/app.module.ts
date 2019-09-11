import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu/menu.component';

// const appRoutes: Routes = [
//   {

//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
