export class Category{
    public id: number;
    public name: string;
    public description: string;
    public firebaseId?: string;

    constructor(id:number, name:string, description: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}