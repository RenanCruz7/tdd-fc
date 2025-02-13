export class DateRange{
    private readonly startDate: Date;
    private readonly endDate: Date;

    constructor(startDate: Date, endDate: Date){
        if(startDate == endDate){
            throw new Error('A data de início e término não podem ser iguais');
        }
        if(endDate < startDate){
            throw new Error('A data de término deve ser maior ou igual a data de início');
        }
        this.startDate = startDate;
        this.endDate = endDate;
    }    

    getStartDate(){
        return this.startDate;
    }

    getEndDate(){
        return this.endDate;
    }

    getTotalNights() {
        const timeDiff = this.endDate.getTime() - this.startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }  

    overlaps(other: DateRange){
        return this.startDate < other.endDate && other.getStartDate() < this.endDate;

    }
}