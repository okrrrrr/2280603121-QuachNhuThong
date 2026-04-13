const dateUtils = require('../src/bai12_3_date_utilities');

describe('Date Utilities Module', () => {
    const date = new Date('2023-10-27T10:30:00');

    test('format should return correct string', () => {
        expect(dateUtils.format(date, 'YYYY-MM-DD')).toBe('2023-10-27');
        expect(dateUtils.format(date, 'DD/MM/YYYY HH:mm')).toBe('27/10/2023 10:30');
    });

    test('addDays should add correctly', () => {
        const nextDay = dateUtils.addDays(date, 1);
        expect(nextDay.getDate()).toBe(28);
    });

    test('isLeapYear should work', () => {
        expect(dateUtils.isLeapYear(2000)).toBe(true);
        expect(dateUtils.isLeapYear(2023)).toBe(false);
    });

    test('startOf day should reset hours', () => {
        const start = dateUtils.startOf(date, 'day');
        expect(start.getHours()).toBe(0);
        expect(start.getMinutes()).toBe(0);
    });
});
