const TaskQueue = require('../src/bai4_2_task_queue');

describe('Task Queue Module', () => {
    let queue;

    beforeEach(() => {
        queue = new TaskQueue();
    });

    test('should emit taskAdded when adding a task', done => {
        const task = () => Promise.resolve('ok');
        queue.on('taskAdded', () => {
            done();
        });
        queue.addTask(task);
    });

    test('should process tasks and emit taskCompleted', done => {
        const task = () => Promise.resolve('success');
        queue.on('taskCompleted', result => {
            expect(result).toBe('success');
            done();
        });
        queue.addTask(task);
    });

    test('should pause and resume processing', async () => {
        queue.pause();
        const completed = jest.fn();
        queue.on('taskCompleted', completed);

        queue.addTask(() => Promise.resolve('paused'));

        // Wait a bit to ensure it doesn't run
        await new Promise(r => setTimeout(r, 50));
        expect(completed).not.toHaveBeenCalled();

        queue.resume();
        await new Promise(r => setTimeout(r, 50));
        expect(completed).toHaveBeenCalledWith('paused');
    });

    test('should emit queueEmpty when all tasks are done', done => {
        queue.on('queueEmpty', () => {
            done();
        });
        queue.addTask(() => Promise.resolve('done'));
    });
});
