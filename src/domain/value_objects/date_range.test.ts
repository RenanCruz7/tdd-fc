import { DateRange } from './date_range';

describe('DateRange Value Object', () => {

    it('deve criar uma instancia de DateRange e verificar o seu retorno', () =>{
        const startDate = new Date('2020-02-10');
        const endDate = new Date('2020-02-12');
        const dateRange = new DateRange(startDate, endDate);
        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
    });

    it('deve lancar um erro se a data de término for antes da data de início', () => {
       expect(() => {
              new DateRange(new Date('2020-02-12'), new Date('2019-02-10'))
       }).toThrowError('A data de término deve ser maior ou igual a data de início');
    });

    it('deve calcular o total de noites corretamente', () => {
        const startDate = new Date('2020-02-10');
        const endDate = new Date('2020-02-12');
        const dateRange = new DateRange(startDate, endDate);

        const totalNights = dateRange.getTotalNights();
        expect(totalNights).toEqual(2);
    }) ;


    it('Deve verificar se dois intervalos de datas se sobrepõem', () => {
        const dateRange1 = new DateRange(new Date('2020-02-10'), new Date('2020-02-12'));
        const dateRange2 = new DateRange(new Date('2020-02-11'), new Date('2020-02-13'));

        const overlap = dateRange1.overlaps(dateRange2);
        expect(overlap).toBe(true);
    });

    //Edge case
    it("Deve lancar erro se a data de inicio e termino forem  iguais", () => {
        const date = new Date('2020-02-10');
        expect(() => {
            new DateRange(date, date)
        }).toThrow('A data de início e término não podem ser iguais');
    });

    it('deve retornar false se dois intervalos de datas não se sobrepõem', () => {
        const dateRange1 = new DateRange(new Date('2020-02-10'), new Date('2020-02-12'));
        const dateRange2 = new DateRange(new Date('2020-02-13'), new Date('2020-02-15'));

        const overlap = dateRange1.overlaps(dateRange2);
        expect(overlap).toBe(false);
    });

    it('deve retornar true se um intervalo de datas está completamente dentro de outro', () => {
        const dateRange1 = new DateRange(new Date('2020-02-10'), new Date('2020-02-20'));
        const dateRange2 = new DateRange(new Date('2020-02-12'), new Date('2020-02-15'));

        const overlap = dateRange1.overlaps(dateRange2);
        expect(overlap).toBe(true);
    });

    it("Deve retornar false se um invervalo termina exatamente quando o outro começa", () => {
        const dateRange1 = new DateRange(new Date('2020-02-10'), new Date('2020-02-12'));
        const dateRange2 = new DateRange(new Date('2020-02-12'), new Date('2020-02-15'));

        const overlap = dateRange1.overlaps(dateRange2);
        expect(overlap).toBe(false);
    });
});