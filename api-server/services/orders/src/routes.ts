import { pick } from 'lodash';
import * as express from 'express';
import { Model } from 'mongoose';

export default (
  { app, model } : { app: express.Application, model: Model<any> },
) => {
  app.get('/', (req, res) => {
    model.find()
      .then(orders => res.send({ orders }));
  });

  app.get('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((order) => {
        if (!order) {
          return res.status(404).send({});
        }

        res.send({ order });
      })
      .catch(e => res.status(400).send({}));
  });

  app.post('/', (req, res) => {
    new model(pick(req.body, [
      '_id',
      'products',
      'user',
    ]))
      .save()
      .then(order => res.send({ order }))
      .catch(e => res.status(400).send({}));
  });
};
