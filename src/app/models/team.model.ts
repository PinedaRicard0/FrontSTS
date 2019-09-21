export class Team{
    public id: number;
    public name: string;
    public category: number;
    public pool: number;
    public firebaseId?: string;

    constructor(id:number, name:string, category: number, pool: number){
        this.id = id;
        this.name = name;
        this.category = category;
        this.pool = pool;
    }
}