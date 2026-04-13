const scheduler = require('../src/bai9_2_scheduler');

describe('Scheduler Module', () => {
    beforeEach(() => {
        scheduler.getScheduledTasks().forEach(t => scheduler.cancel(t.id));
    });

    test('schedule should run task after delay', done => {
        const task = jest.fn(() => {
            expect(task).toHaveBeenCalled();
            done();
        });
        scheduler.schedule(task, 50);
    });

    test('scheduleInterval should run task periodically', done => {
        let count = 0;
        const task = () => {
            count++;
            if (count === 2) {
                scheduler.cancel(id);
                done();
            }
        };
        const id = scheduler.scheduleInterval(task, 50);
    });

    test('cancel should stop task', () => {
        const task = jest.fn();
        const id = scheduler.schedule(task, 100);
        scheduler.cancel(id);

        setTimeout(() => {
            expect(task).not.toHaveBeenCalled();
        }, 150);
    });
});
