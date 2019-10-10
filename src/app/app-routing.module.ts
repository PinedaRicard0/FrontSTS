import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './main/team/team.component';
import { TeamCreateComponent } from './main/team/team-create/team-create.component';
import { HomeComponent } from './main/home/home.component';
import { TeamPlayersComponent } from './main/team/team-players/team-players.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'teams', component: TeamComponent, children:[
        {path: ':categoryId', component: TeamCreateComponent}
    ]},
    {path: 'team/players/:teamId', component: TeamPlayersComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}