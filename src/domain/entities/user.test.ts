import { User } from './user';

describe('User Entity', () => {
    it('deve criar uma instancia de User com ID e Nome', () => {
        const user = new User('1', 'Teste');
        expect(user.getId()).toBe('1');
        expect(user.getName()).toBe('Teste');
    });

    it('deve lançar um erro se o nome for vazio', () => {
        expect(() => new User('1', '')).toThrow('Nome é obrigatório');
    });

    it('deve lançar um erro se o id for vazio', () => {
        expect(() => new User('', 'teste')).toThrow('ID é obrigatório');
    });
});