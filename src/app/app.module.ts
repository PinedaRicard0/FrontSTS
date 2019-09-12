import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu/menu.component';
import { TeamComponent } from './main/team/team.component';
import { AppRoutingModule } from './app-routing.module';

// const appRoutes: Routes = [
//   {

//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
