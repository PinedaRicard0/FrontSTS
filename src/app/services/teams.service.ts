import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../models/team.model';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class TeamsSevice {

    categoryTeams : Team[] = [];

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

    getTeamsByCategory(category: Number){
        this.http
            .get< {[key: string]: Team} >(
                'https://sts-api-67d7d.firebaseio.com/teams.json'
            )
            .pipe(
                map(
                    response => {
                        const teamsArray : Team [] = [];
                        for(const key in response){
                            if(response.hasOwnProperty(key)){
                                teamsArray.push({ ...response[key], firebaseId: key });
                            }
                        }
                        return teamsArray;
                })
            )
            .subscribe(teams => {
                this.categoryTeams = teams.filter((t) => {
                    return t.category == category;
                })
                console.log(this.categoryTeams);
            })
    }
}