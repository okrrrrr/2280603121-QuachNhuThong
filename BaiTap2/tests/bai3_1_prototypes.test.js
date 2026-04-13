import { Person, Student } from '../src/bai3_1_prototypes';

describe('Bài 3.1: Prototypes', () => {
    test('Person nên introduce đúng', () => {
        const p = new Person('Dũng', 20);
        expect(p.introduce()).toBe('Xin chào, tôi là Dũng, 20 tuổi');
    });

    test('Student nên kế thừa từ Person', () => {
        const s = new Student('An', 19, 'HUTECH');
        expect(s.introduce()).toBe('Xin chào, tôi là An, 19 tuổi');
        expect(s.study()).toBe('An đang học tại HUTECH');
    });
});