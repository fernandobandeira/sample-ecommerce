import { pick } from 'lodash';

export default ({ app, model }) => {
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

        return res.send({ product });
      })
      .catch(e => res.status(400).send({}));
  });

  app.post('/', (req, res) => {
    return new model(pick(req.body, [
      '_id',
      'name',
      'active',
      'price',
      'description',
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

        const { __v } = req.body;
        if (__v && __v !== product.__v) {
          return res.status(409).send({ product });
        }

        product.set(pick(req.body, [
          'name',
          'active',
          'price',
          'description',
        ]));

        return product.save()
          .then(product => res.send({ product }))  ;             
      })
      .catch(e => res.status(400).send({}));
  });

  app.delete('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((product) => {
        if (!product) {
          return res.status(404).send({});
        }

        return product.delete()
          .then(product => res.send({ product }))  ;        
      })
      .catch(e => res.status(400).send({}));
  });
};
