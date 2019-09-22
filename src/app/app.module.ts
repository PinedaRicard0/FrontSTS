import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu/menu.component';
import { TeamComponent } from './main/team/team.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamCreateComponent } from './main/team/team-create/team-create.component';
import { HomeComponent } from './main/home/home.component';

// const appRoutes: Routes = [
//   {

//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TeamComponent,
    TeamCreateComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
