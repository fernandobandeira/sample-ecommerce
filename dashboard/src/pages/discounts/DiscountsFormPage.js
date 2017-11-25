import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import DiscountsForm from './DiscountsForm';
import { qProducts } from '../../queries/products';
import { qCategories } from '../../queries/categories';
import { 
  qDiscount,
  qDiscounts,
  mCreateDiscount,
  mUpdateDiscount,
  mUpdateDiscountCategories,
  mUpdateDiscountProducts,
} from '../../queries/discounts';

class DiscountsFormPage extends Component {
  createDiscount = (values) => {
    this.props.createDiscount(values)
      .then((data) => {
        this.updateRelationships(data.data.createDiscount._id, values);

        return data;
      });
    this.props.history.push('/discounts');
  }

  updateDiscount = (values) => {
    if (Object.keys(values).length !== 0) {
      this.props.updateDiscount(this.props.match.params.id, values)
        .then((data) => {
          this.updateRelationships(data.data.updateDiscount._id, values);

          return data;
        });
    }
    this.props.history.push('/discounts');
  }

  updateRelationships(id, values) {
    if (values.categories !== undefined) {
      this.props.updateDiscountCategories(id, values.categories);
    }
    if (values.products !== undefined) {
      this.props.updateDiscountProducts(id, values.products);
    }
  }

  render() {
    let { categories = [] } = this.props.categories;
    categories = categories.filter((c) => !c.deleted);

    let { products = [] } = this.props.products;
    products = products.reduce((cur, p) => {
      if (!p.deleted) {
        cur.push({ key: p._id, ...p });
      }

      return cur;
    }, []);

    if (this.props.discount) {
      const { discount, loading } = this.props.discount;

      return (
        <DiscountsForm loading={loading} categories={categories} products={products} discount={discount} handleSubmit={this.updateDiscount} />
      );
    }

    return (
      <DiscountsForm loading={false} categories={categories} products={products} handleSubmit={this.createDiscount} />
    );
  }
}

const optimisticFields = (discount) => ({
  __typename: 'Discount',
  name: discount.name || '',
  active: discount.active || false,
  percentage: discount.percentage || 0,
  start: discount.start || moment(),
  end: discount.end || moment(),
  categories: discount.categories || [],
  products: discount.products || [],
  deleted: false,
});

export default compose(
  graphql(qCategories, {name: 'categories'}),
  graphql(qProducts, {name: 'products'}),
  graphql(qDiscount, {
    name: 'discount',
    skip: (ownProps) => !ownProps.match.params.id,
    options: (ownProps) => ({ variables: { id: ownProps.match.params.id } }),
  }),
  graphql(mCreateDiscount, {
    props: ({ mutate }) => ({
      createDiscount: (discount) => mutate({ 
        variables: { discount },
        optimisticResponse: {
          __typename: 'Mutation',
          createDiscount: {
            _id: -1,
            ...optimisticFields(discount)
          },
        },
        update: (proxy, { data: { createDiscount } }) => {
          const data = proxy.readQuery({ query: qDiscounts });
          data.discounts.push(createDiscount);
          proxy.writeQuery({ query: qDiscounts, data });
        },
      }),
    }),
  }),
  graphql(mUpdateDiscount, {
    props: ({ mutate }) => ({
      updateDiscount: (id, discount) => mutate({
        variables: { id, discount },
        optimisticResponse: {
          __typename: 'Mutation',
          updateDiscount: {            
            _id: id,
            ...optimisticFields(discount)
          },
        },
      }),
    }),
  }),
  graphql(mUpdateDiscountCategories, {
    props: ({ mutate }) => ({
      updateDiscountCategories: (id, categories) => mutate({
        variables: { id, categories },
        update: (proxy) => {
          const data = proxy.readQuery({ query: qDiscount, variables: { id } });
          data.discount.categories = categories;
          proxy.writeQuery({ query: qDiscount, variables: { id }, data });          
        },
      }),
    }),
  }),
  graphql(mUpdateDiscountProducts, {
    props: ({ mutate }) => ({
      updateDiscountProducts: (id, products) => mutate({
        variables: { id, products },
        update: (proxy) => {
          const data = proxy.readQuery({ query: qDiscount, variables: { id } });
          data.discount.products = products;
          proxy.writeQuery({ query: qDiscount, variables: { id }, data });          
        },
      }),
    }),
  }),
)(
  DiscountsFormPage
);
