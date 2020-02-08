export class Field{

    public name : string;
    public address : string;
    public description: string;
    public id: number;

    constructor(name: string, address: string,description: string){
        this.name = name;
        this.address = address;
        this.description = description;
    }
}