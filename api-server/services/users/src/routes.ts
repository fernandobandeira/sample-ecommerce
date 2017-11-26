import { pick } from 'lodash';
import * as express from 'express';
import { Model } from 'mongoose';

export default (
  { app, model } : { app: express.Application, model: Model<any> },
) => {
  app.get('/', (req, res) => {
    model.find()
      .then(users => res.send({ users }));
  });

  app.get('/:username', (req, res) => {
    model.find({ username: req.params.username })
      .then(([user]) => {
        if (!user) {
          return res.status(404).send({});
        }

        res.send({ user });
      })
      .catch(e => res.status(400).send({}));
  });

  app.post('/', (req, res) => {
    new model(pick(req.body, [
      '_id',
      'username',
      'password',
      'admin',
    ]))
      .save()
      .then(user => res.send({ user }))
      .catch(e => res.status(400).send({}));
  });

  app.patch('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({});
        }

        const { _version } = req.body;
        if (_version && _version !== user._version) {
          return res.status(409).send({ user });
        }

        user.set(pick(req.body, [
          'username',
          'password',
          'admin',
        ]));

        user.save()
          .then(user => res.send({ user }));             
      })
      .catch(e => res.status(400).send({}));
  });

  app.delete('/:id', (req, res) => {
    model.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({});
        }

        user.delete()
          .then(user => res.send({ user }));        
      })
      .catch(e => res.status(400).send({}));
  });
};
