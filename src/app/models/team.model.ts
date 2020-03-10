export class Team{
    public id: number;
    public name: string;
    public category: string;
    public poolId: number;
    public poolName: string;

    constructor(id:number, name:string, category: string, poolId: number){
        this.id = id;
        this.name = name;
        this.category = category;
        this.poolId = poolId;
    }
}