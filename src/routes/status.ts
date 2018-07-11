import { Router, RequestHandler } from 'express';

export const statusRouter = Router();

statusRouter.get('/', (req: any, res, next) => {
  let data: {} = { status: 'running' };
  if (req.user) {
    const { id, username } = req.user;
    data = { ...data, user: { id, username } };
  }

  res.json({ data });

});
