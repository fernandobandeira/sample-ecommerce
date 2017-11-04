import { pick } from 'lodash';
import * as express from 'express';
import { Model } from 'mongoose';

export default (
  { app, model } : { app: express.Application, model: Model<any> },
) => {
  app.get('/', (req, res) => {
    model.find()
      .then(discounts => res.send({ discounts }));
  });

  app.get('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((discount) => {
        if (!discount) {
          return res.status(404).send({});
        }

        res.send({ discount });
      })
      .catch(e => res.status(400).send({}));
  });

  app.post('/', (req, res) => {
    new model(pick(req.body, [
      '_id',
      'name',
      'active',
      'start',
      'end',
      'percentage',
    ]))
      .save()
      .then(discount => res.send({ discount }))
      .catch(e => res.status(400).send({}));
  });

  app.patch('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((discount) => {
        if (!discount) {
          return res.status(404).send({});
        }

        const { _version } = req.body;
        if (_version && _version !== discount._version) {
          return res.status(409).send({ discount });
        }

        discount.set(pick(req.body, [
          'name',
          'active',
          'start',
          'end',
          'percentage',
        ]));

        discount.save()
          .then(discount => res.send({ discount }));             
      })
      .catch(e => res.status(400).send({}));
  });

  app.delete('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((discount) => {
        if (!discount) {
          return res.status(404).send({});
        }

        discount.delete()
          .then(discount => res.send({ discount }));        
      })
      .catch(e => res.status(400).send({}));
  });
};
