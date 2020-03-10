import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../models/team.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class TeamsSevice {

    categoryTeams = new EventEmitter<Team[]>();
    startedEditingTeam = new Subject<string>();
    editingTeam: Team;

    constructor(private http: HttpClient) { }

    createTeam(team: Team) {
        this.http.post< string >(`${environment.apiUrl}teams/create`,
                team
            )
            .subscribe(response => {
                this.getTeamsByCategory(team.category);
            });
    }

    updateTeam(team: Team){
        debugger;
        // let firebaseId = team.firebaseId;
        // team.firebaseId = null;
        return this.http
            .put<string>(
                `${environment.apiUrl}teams/update`,
                team
            )
    }

    //Populate categoryTeams attr according to category
    getTeamsByCategory(category: string) {
        this.http
            .get<Team[]>(
                `${environment.apiUrl}teams/categorieteams/${category}`
            )
            .pipe(
                map(
                    response => {
                        const teamsArray: Team[] = [];
                        let tmpTeam: Team;
                        response.forEach(function(team){
                            teamsArray.push(team);
                        })
                         return teamsArray;
                    })
            )
            .subscribe(teams => {
                this.categoryTeams.emit(teams);
            })
    }

    getTeamById(id: string) {
        // let url = 'https://sts-api-67d7d.firebaseio.com/teams.json?orderBy="$key"&equalTo=' + '"' + id + '"';
        let url = `${environment.apiUrl}teams/getteam/${id}`
        return this.http.get<Team>(url)
            .pipe(
                map(
                    response => {
                        return response;
                    }
                )
            )
    }
}