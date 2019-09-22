import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamComponent } from './main/team/team.component';
import { TeamCreateComponent } from './main/team/team-create/team-create.component';
import { HomeComponent } from './main/home/home.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'teams', component: TeamComponent, children:[
        {path: ':categoryId', component: TeamCreateComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}