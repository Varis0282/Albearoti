import { successObj } from '../../utils/settings.js';
import UserCtlr from '../controllers/user.js';
import authentication from '../middlewares/authentication.js';

export default (app) => {
    app.post('/user/add', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.add(body);
        res.json(result);
    })
    app.post('/user/login', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.login(body);
        res.json(result);
    })
    app.post('/user/list', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.list(body);
        res.json(result);
    })
    app.put('/user/update', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.update(body);
        res.json(result);
    })
    app.delete('/user/delete', async (req, res) => {
        const { body } = req;
        const result = await UserCtlr.delete(body);
        res.json(result);
    })
    app.get('/user/me', authentication, async (req, res) => {
        const { user } = req;
        res.json({ ...successObj, data: user });
    })
    app.get('/user/:_id', async (req, res) => {
        const { params } = req;
        const result = await UserCtlr.getById(params);
        res.json(result);
    })
}