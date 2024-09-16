import BlogCtrl from '../controllers/blog.js';
import authentication from '../middlewares/authentication.js';

export default (app) => {
    app.post('/blog/add', authentication, async (req, res) => {
        const { body, user } = req;
        body.userId = user._id;
        const result = await BlogCtrl.add(body);
        res.json(result);
    })
    app.post('/blog/list', authentication, async (req, res) => {
        const { body, user } = req;
        body.userId = user._id;
        const result = await BlogCtrl.list(body);
        res.json(result);
    })
    app.put('/blog/update', authentication, async (req, res) => {
        const { body, user } = req;
        body.userId = user._id;
        const result = await BlogCtrl.update(body);
        res.json(result);
    })
    app.put('/blog/publish', authentication, async (req, res) => {
        const { body, user } = req;
        body.userId = user._id;
        const result = await BlogCtrl.publish(body);
        res.json(result);
    })
    app.delete('/blog/delete', authentication, async (req, res) => {
        const { body, user } = req;
        body.userId = user._id;
        const result = await BlogCtrl.delete(body);
        res.json(result);
    })
    app.get('/blog/:_id', authentication, async (req, res) => {
        const { params } = req;
        const result = await BlogCtrl.getById(params);
        res.json(result);
    })
}