import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import ProductsForm from './ProductsForm';
import { qProducts, qProduct, fProduct } from '../../queries/products';
import { qCategories } from '../../queries/categories';

class ProductsFormPage extends Component {
  createProduct = (values) => {
    this.props.createProduct(values);
    this.props.history.push('/products');
  }

  updateProduct = (values) => {
    if (Object.keys(values).length !== 0) {
      this.props.updateProduct(this.props.match.params.id, values);
    }
    this.props.history.push('/products');
  }

  render() {
    let { categories = [] } = this.props.categories;
    categories = categories.filter((c) => !c.deleted);

    if (this.props.product) {
      const loading = this.props.product.loading || this.props.categories.loading;
      const { product } = this.props.product;

      return (
        <ProductsForm loading={loading} product={product} categories={categories} handleSubmit={this.updateProduct} />
      );
    }

    const { loading } = this.props.categories;

    return (
      <ProductsForm loading={loading} categories={categories} handleSubmit={this.createProduct} />
    );
  }
}

const createProduct = gql`
  mutation createProduct($product: ProductInput!) {
    createProduct(product: $product) {
      ...productFragment
    }
  }

  ${fProduct}
`;

const updateProduct = gql`
  mutation updateProduct($id: ID!, $product: ProductInput!) {
    updateProduct(id: $id, product: $product) {
      ...productFragment
    }
  }

  ${fProduct}
`;

const optimisticFields = (product) => ({
  __typename: 'Product',
  name: product.name,
  active: product.active || false,
  price: product.price || 0,
  slug: product.slug || '',
  description: product.description || null,
  categories: product.categories ? product.categories.map(c => ({ _id: c, __typename: 'Category' })) : [],
  discounts: [],
  deleted: false,
});

export default compose(
  graphql(qCategories, {
    name: 'categories',
  }),
  graphql(qProduct, {
    name: 'product',
    skip: (ownProps) => !ownProps.match.params.id,
    options: (ownProps) => ({ variables: { id: ownProps.match.params.id } }),
  }),
  graphql(createProduct, {
    props: ({ mutate }) => ({
      createProduct: (product) => mutate({ 
        variables: { product },
        optimisticResponse: {
          __typename: 'Mutation',
          createProduct: {            
            _id: -1,
            ...optimisticFields(product)
          }
        },
        update: (proxy, { data: { createProduct } }) => {
          const data = proxy.readQuery({ query: qProducts });
          data.products.push(createProduct);
          proxy.writeQuery({ query: qProducts, data });
        },
      })
    })
  }),
  graphql(updateProduct, {
    props: ({ mutate }) => ({
      updateProduct: (id, product) => mutate({
        variables: { id: id, product },
        optimisticResponse: {
          __typename: 'Mutation',
          updateProduct: {            
            _id: id,
            ...optimisticFields(product)
          }
        },
      })
    })
  }),
)(
  ProductsFormPage
);
