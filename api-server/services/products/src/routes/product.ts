export default ({ app, Product }) => {
  app.get('/', function(req, res) {
    Product.find()
    .then(products => res.send({ products }))
    .catch(e => res.status(400).send(e));
  })
}
