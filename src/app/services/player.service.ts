import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Player } from '../models/player.model';

@Injectable({providedIn:'root'})
export class PlayerService{

    players:Player[] = [];
    constructor(private http: HttpClient){}

    createPlayer(player: Player){
        let url = 'https://sts-api-67d7d.firebaseio.com/players.json';
        return this.http
            .post<{name: string}>(url,player);
    }


    getPlayerByTeam(teamId: string){
        let url = 'https://sts-api-67d7d.firebaseio.com/players.json?orderBy="teamId"&equalTo=' + '"' + teamId + '"';
        return this.http.get<{[key : string] : Player }>(url).pipe(
            map(
                response => {
                    const playersArray: Player[] = [];
                    for (const key in response) {
                        if (response.hasOwnProperty(key)) {
                            playersArray.push({ ...response[key], firebaseId: key });
                        }
                    }
                    return playersArray;
                }
            )
        )
    }

    getMemPlayerById(firebaseId : string){
        return this.players.filter(p => p.firebaseId == firebaseId)[0];
    }
}