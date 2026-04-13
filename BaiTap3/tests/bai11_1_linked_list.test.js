const LinkedList = require('../src/bai11_1_linked_list');

describe('LinkedList Module', () => {
    let list;

    beforeEach(() => {
        list = new LinkedList();
    });

    test('append should add to end', () => {
        list.append(1);
        list.append(2);
        expect(list.toArray()).toEqual([1, 2]);
        expect(list.size).toBe(2);
    });

    test('prepend should add to start', () => {
        list.append(1);
        list.prepend(0);
        expect(list.toArray()).toEqual([0, 1]);
    });

    test('remove should delete specific value', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        list.remove(2);
        expect(list.toArray()).toEqual([1, 3]);
    });

    test('reverse should invert the list', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        list.reverse();
        expect(list.toArray()).toEqual([3, 2, 1]);
    });
});
