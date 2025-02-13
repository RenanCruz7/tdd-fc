export class User {
    private readonly id: string;
    private readonly name: string; 

    constructor(id: string, name: string) {
        if(!name) {
            throw new Error('Nome é obrigatório');
        }

        if(!id) {
            throw new Error('ID é obrigatório');
        }
        
        this.id = id;
        this.name = name;
    }

    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
}