import { pick } from 'lodash';
import * as express from 'express';
import { Model } from 'mongoose';

export default (
  { app, model } : { app: express.Application, model: Model<any> },
) => {
  app.get('/', (req, res) => {
    model.find()
      .then(products => res.send({ products }));
  });

  app.get('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((product) => {
        if (!product) {
          return res.status(404).send({});
        }

        res.send({ product });
      })
      .catch(e => res.status(400).send({}));
  });

  app.post('/', (req, res) => {
    new model(pick(req.body, [
      '_id',
      'name',
      'active',
      'price',
      'description',
      'categories',
      'discounts',
    ]))
      .save()
      .then(product => res.send({ product }))
      .catch(e => res.status(400).send({}));
  });

  app.patch('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((product) => {
        if (!product) {
          return res.status(404).send({});
        }

        const { _version } = req.body;
        if (_version && _version !== product._version) {
          return res.status(409).send({ product });
        }

        product.set(pick(req.body, [
          'name',
          'active',
          'price',
          'description',
          'categories',
          'discounts',
        ]));

        product.save()
          .then(product => res.send({ product }));             
      })
      .catch(e => res.status(400).send({}));
  });

  app.delete('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((product) => {
        if (!product) {
          return res.status(404).send({});
        }

        product.delete()
          .then(product => res.send({ product }));        
      })
      .catch(e => res.status(400).send({}));
  });

  // Relashionship routes
  app.get('/category/:id/products', (req, res) => {
    const { id } = req.params;

    model.find({ categories: id })
      .then(products => res.send({ products }));
  });

  app.get('/discount/:id/products', (req, res) => {
    const { id } = req.params;

    model.find({ discounts: id })
      .then(products => res.send({ products }));
  });
};
