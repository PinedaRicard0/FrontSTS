export class Player{
    id: number;
    name : string;
    nickName? : string;
    teamId : number;
    firebaseId?: string;

    constructor(name: string, teamId: number, nickName?: string){
        this.name = name;
        this.teamId = teamId;
        this.nickName = nickName;
    }
}