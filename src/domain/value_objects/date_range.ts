export class DateRange{
    private readonly startDate: Date;
    private readonly endDate: Date;

    constructor(startDate: Date, endDate: Date){
        this.validateDateRange(startDate, endDate);
        this.startDate = startDate;
        this.endDate = endDate;
    }  

    private validateDateRange(startDate: Date, endDate: Date): void{
        if(startDate.getTime() > endDate.getTime()){
            throw new Error('A data de término deve ser maior ou igual a data de início');
        }
        if(startDate.getTime() === endDate.getTime()){
            throw new Error('A data de início e término não podem ser iguais');
        }
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