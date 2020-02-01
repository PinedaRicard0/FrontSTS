import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu/menu.component';
import { TeamComponent } from './main/team/team.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamCreateComponent } from './main/team/team-create/team-create.component';
import { HomeComponent } from './main/home/home.component';
import { TeamPlayersComponent } from './main/team/team-players/team-players.component';
import { FieldComponent } from './main/field/field.component';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from './share-components/spinner/spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TeamComponent,
    TeamCreateComponent,
    HomeComponent,
    TeamPlayersComponent,
    FieldComponent,
    LoginComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }