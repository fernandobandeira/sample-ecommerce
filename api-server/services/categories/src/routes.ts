import { pick } from 'lodash';
import * as express from 'express';
import { Model } from 'mongoose';

export default (
  { app, model } : { app: express.Application, model: Model<any> },
) => {
  app.get('/', (req, res) => {
    model.find()
      .then(categories => res.send({ categories }));
  });

  app.get('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({});
        }

        res.send({ category });
      })
      .catch(e => res.status(400).send({}));
  });

  app.post('/', (req, res) => {
    new model(pick(req.body, [
      '_id',
      'name',
      'active',
      'description',
      'discounts',
    ]))
      .save()
      .then(category => res.send({ category }))
      .catch(e => res.status(400).send({}));
  });

  app.patch('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({});
        }

        const { _version } = req.body;
        if (_version && _version !== category._version) {
          return res.status(409).send({ category });
        }

        category.set(pick(req.body, [
          'name',
          'active',
          'description',
          'discounts',
        ]));

        category.save()
          .then(category => res.send({ category }));             
      })
      .catch(e => res.status(400).send({}));
  });

  app.delete('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({});
        }

        category.delete()
          .then(category => res.send({ category }));        
      })
      .catch(e => res.status(400).send({}));
  });

  // Relationship routes
  app.get('/discount/:id/categories', (req, res) => {
    const { id } = req.params;

    model.find({ discounts: id })
      .then(categories => res.send({ categories }));
  });
};
