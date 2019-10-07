import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../models/team.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TeamsSevice {

    categoryTeams = new EventEmitter<Team[]>();
    startedEditingTeam = new Subject<string>();
    editingTeam: Team;

    constructor(private http: HttpClient) { }

    createTeam(team: Team) {
        this.http
            .post<{ name: string }>(
                'https://sts-api-67d7d.firebaseio.com/teams.json',
                team
            )
            .subscribe(response => {
                this.getTeamsByCategory(parseInt(team.category));
            });
    }

    updateTeam(team: Team){
        let firebaseId = team.firebaseId;
        team.firebaseId = null;
        return this.http
            .put<{ rTeam: Team }>(
                'https://sts-api-67d7d.firebaseio.com/teams/' + firebaseId + '/.json',
                team
            )
    }

    //Populate categoryTeams attr according to category
    getTeamsByCategory(category: Number) {
        this.http
            .get<{ [key: string]: Team }>(
                'https://sts-api-67d7d.firebaseio.com/teams.json?orderBy="category"&equalTo=' + category
            )
            .pipe(
                map(
                    response => {
                        const teamsArray: Team[] = [];
                        for (const key in response) {
                            if (response.hasOwnProperty(key)) {
                                teamsArray.push({ ...response[key], firebaseId: key });
                            }
                        }
                        console.log(teamsArray.length);
                        return teamsArray;
                    })
            )
            .subscribe(teams => {
                this.categoryTeams.emit(teams);
            })
    }

    getItemById(id: string) {
        let url = 'https://sts-api-67d7d.firebaseio.com/teams.json?orderBy="$key"&equalTo=' + '"' + id + '"';
        return this.http.get<{ [key: string]: Team }>(url)
            .pipe(
                map(
                    response => {
                        let team: Team;
                        for (const key in response) {
                            if (response.hasOwnProperty(key)) {
                                team = new Team(response[key].id,response[key].name,response[key].category
                                    ,response[key].pool);
                                team.firebaseId = key;
                            }
                        }
                        return team;
                    }
                )
            )
    }
}