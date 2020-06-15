export class Player{
    id: number;
    name : string;
    nickName? : string;
    dorsal? : number;
    teamId : number;
    firebaseId?: string;

    constructor(name: string, teamId: number, nickName?: string, dorsal?: number){
        this.name = name;
        this.teamId = teamId;
        this.dorsal = dorsal;
        this.nickName = nickName;
    }
}