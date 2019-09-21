import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../models/team.model';


@Injectable({providedIn: 'root'})
export class TeamsSevice {
constructor(private http: HttpClient){}

    createTeam(team: Team){
        this.http
            .post<{ name: string }>(
                'https://sts-api-67d7d.firebaseio.com/teams.json',
                team
            )
            .subscribe(response => {
            });
    }
}