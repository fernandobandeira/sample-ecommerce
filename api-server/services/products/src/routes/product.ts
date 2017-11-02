export default ({ app, Product }) => {
  app.get('/', function(req, res) {
    Product.find()
    .then(products => res.send({ products }))
    .catch(e => res.status(400).send(e))
  })
  app.get('/:id', (req, res) => {
    const { id } = req.params;

    Product.findById(id)
      .then((product) => {
        if (!product) {
          return res.status(404).send({});
        }

        return res.send({ product });
      })
      .catch(e => res.status(400).send(e));
  })
}
