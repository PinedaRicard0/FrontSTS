export class Pool{
    id?: number;
    name: string;
    categoryId: number;
    public status?: string;

    constructor(name: string){
        this.name = name;
    }
}