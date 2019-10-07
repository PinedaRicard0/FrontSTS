export class Team{
    public id: number;
    public name: string;
    public category: string;
    public pool: number;
    public firebaseId?: string;

    constructor(id:number, name:string, category: string, pool: number){
        this.id = id;
        this.name = name;
        this.category = category;
        this.pool = pool;
    }
}