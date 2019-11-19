export class Field{

    public name : string;
    public address : string;
    public description: string;
    public firebaseId?: string;

    constructor(name: string, address: string,description: string){
        this.name = name;
        this.address = address;
        this.description = description;
    }
}