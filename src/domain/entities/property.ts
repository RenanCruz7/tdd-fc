export class Property {
    private readonly id: string;
    private readonly name: string;
    private readonly description: string;
    private readonly maxGuests: number;
    private readonly basePricePerNight: number;
  constructor(id: string,name: string,description: string,maxGuests: number,basePricePerNight: number) {
    if(!name){
        throw new Error('Nome da propriedade deve ser preenchido');
    }
    if (maxGuests <= 0) {
      throw new Error('Numero de hospedes deve ser maior que 0');
    }
    this.id = id;
    this.name = name;
    this.description = description;
    this.maxGuests = maxGuests;
    this.basePricePerNight = basePricePerNight;
  }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getMaxGuests(): number {
        return this.maxGuests;
    }

    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }

    validateGuestCount(guests: number): void {
        if (guests > this.maxGuests) {
            throw new Error('Numero de hospedes excede o limite da propriedade');
        }
    }
}