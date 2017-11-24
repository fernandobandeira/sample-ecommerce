import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import DiscountsForm from './DiscountsForm';
import { qDiscount, fDiscount, qDiscounts } from '../../queries/discounts';

class DiscountsFormPage extends Component {
  createDiscount = (values) => {
    this.props.createDiscount(values);
    this.props.history.push('/discounts');
  }

  updateDiscount = (values) => {
    this.props.updateDiscount(this.props.match.params.id, values);
    this.props.history.push('/discounts');
  }

  render() {
    if (this.props.data) {
      const { discount, loading } = this.props.data;

      return (
        <DiscountsForm loading={loading} discount={discount} handleSubmit={this.updateDiscount} />
      );
    }

    return (
      <DiscountsForm loading={false} handleSubmit={this.createDiscount} />
    );
  }
}

const createDiscount = gql`
  mutation createDiscount($discount: DiscountInput!) {
    createDiscount(discount: $discount) {
      ...discountFragment
    }
  }

  ${fDiscount}
`;

const updateDiscount = gql`
  mutation updateDiscount($id: ID!, $discount: DiscountInput!) {
    updateDiscount(id: $id, discount: $discount) {
      ...discountFragment
    }
  }

  ${fDiscount}
`;

const optimisticFields = (discount) => ({
  __typename: 'Discount',
  name: discount.name,
  active: discount.active || false,
  percentage: discount.percentage || 0,
  start: discount.start || moment(),
  end: discount.end || moment(),
  deleted: false,
});

export default compose(
  graphql(qDiscount, {
    skip: (ownProps) => !ownProps.match.params.id,
    options: (ownProps) => ({ variables: { id: ownProps.match.params.id } }),
  }),
  graphql(createDiscount, {
    props: ({ mutate }) => ({
      createDiscount: (discount) => mutate({ 
        variables: { discount },
        optimisticResponse: {
          __typename: 'Mutation',
          createDiscount: {            
            _id: -1,
            ...optimisticFields(discount)
          }
        },
        update: (proxy, { data: { createDiscount } }) => {
          const data = proxy.readQuery({ query: qDiscounts });
          data.discounts.push(createDiscount);
          proxy.writeQuery({ query: qDiscounts, data });
        },
      })
    })
  }),
  graphql(updateDiscount, {
    props: ({ mutate }) => ({
      updateDiscount: (id, discount) => mutate({
        variables: { id: id, discount },
        optimisticResponse: {
          __typename: 'Mutation',
          updateDiscount: {            
            _id: id,
            ...optimisticFields(discount)
          }
        },
      })
    })
  }),
)(
  DiscountsFormPage
);
