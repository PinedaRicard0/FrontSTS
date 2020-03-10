import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Player } from '../models/player.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class PlayerService{

    players:Player[] = [];
    constructor(private http: HttpClient){}

    createPlayer(player: Player){
        let url =`${environment.apiUrl}players/addteamplayer`;
        return this.http
            .post<string>(url,player);
    }


    getPlayerByTeam(teamId: string){
        let url = `${environment.apiUrl}players/getteamplayers/${teamId}`
        return this.http.get<Player[]>(url).pipe(
            map(
                response => {
                    return response;
                }
            )
        )
    }

    updatePlayer(player: Player){
        return this.http
            .put<string>(`${environment.apiUrl}players/update`,
            player)
    }

    getMemPlayerById(id : string){
        return this.players.filter(p => p.id == Number(id))[0];
    }
}