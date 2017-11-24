import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import CategoriesForm from './CategoriesForm';
import { qCategory, fCategory, qCategories } from '../../queries/categories';

class CategoriesFormPage extends Component {
  createCategory = (values) => {
    this.props.createCategory(values);
    this.props.history.push('/categories');
  }

  updateCategory = (values) => {
    this.props.updateCategory(this.props.match.params.id, values);
    this.props.history.push('/categories');
  }

  render() {
    if (this.props.data) {
      const { category, loading } = this.props.data;

      return (
        <CategoriesForm loading={loading} category={category} handleSubmit={this.updateCategory} />
      );
    }

    return (
      <CategoriesForm loading={false} handleSubmit={this.createCategory} />
    );
  }
}

const createCategory = gql`
  mutation createCategory($category: CategoryInput!) {
    createCategory(category: $category) {
      ...categoryFragment
    }
  }

  ${fCategory}
`;

const updateCategory = gql`
  mutation updateCategory($id: ID!, $category: CategoryInput!) {
    updateCategory(id: $id, category: $category) {
      ...categoryFragment
    }
  }

  ${fCategory}
`;

const optimisticFields = (category) => ({
  __typename: 'Category',
  name: category.name,
  slug: category.slug || '',
  active: category.active || false,
  description: category.description || null,
  discounts: [],
  deleted: false,
});

export default compose(
  graphql(qCategory, {
    skip: (ownProps) => !ownProps.match.params.id,
    options: (ownProps) => ({ variables: { id: ownProps.match.params.id } }),
  }),
  graphql(createCategory, {
    props: ({ mutate }) => ({
      createCategory: (category) => mutate({ 
        variables: { category },
        optimisticResponse: {
          __typename: 'Mutation',
          createCategory: {            
            _id: -1,
            ...optimisticFields(category)
          }
        },
        update: (proxy, { data: { createCategory } }) => {
          const data = proxy.readQuery({ query: qCategories });
          data.categories.push(createCategory);
          proxy.writeQuery({ query: qCategories, data });
        },
      })
    })
  }),
  graphql(updateCategory, {
    props: ({ mutate }) => ({
      updateCategory: (id, category) => mutate({
        variables: { id: id, category },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCategory: {            
            _id: id,
            ...optimisticFields(category)
          }
        },
      })
    })
  }),
)(
  CategoriesFormPage
);
