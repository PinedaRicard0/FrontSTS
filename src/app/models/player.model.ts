export class Player{
    name : string;
    nickName? : string;
    teamId : string;
    firebaseId?: string;

    constructor(name: string, teamId: string, nickName?: string){
        this.name = name;
        this.teamId = teamId;
        this.nickName = nickName;
    }
}