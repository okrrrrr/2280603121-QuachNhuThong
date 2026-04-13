const { createServer } = require('./bai8_1_basic_http_server');
const Router = require('./bai8_2_router_module');

/**
 * Bài 8.3: REST API Server
 * 
 * Server REST API cho quản lý Tasks sử dụng Router module tự tạo
 * @module restApiServer
 */

const tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a REST API', completed: false }
];

const router = new Router();

router.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

router.get('/api/tasks/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const filtered = tasks.filter(t => t.title.toLowerCase().includes(query));
    res.json(filtered);
});

router.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) res.json(task);
    else res.status(404).json({ error: 'Task not found' });
});

router.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks[index] = { ...tasks[index], ...req.body, id };
    res.json(tasks[index]);
});

router.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(index, 1);
    res.status(204).end();
});

const app = createServer();

app.handleRequest = async (req, res) => {
    await app._parseRequest(req, res);

    const handled = await router.handle(req, res);

    if (!handled && !res.writableEnded) {
        res.status(404).json({ error: 'Not Found' });
    }
};

module.exports = app;

if (require.main === module) {
    app.listen(3000, () => console.log('REST API Server running on http://localhost:3000'));
}
