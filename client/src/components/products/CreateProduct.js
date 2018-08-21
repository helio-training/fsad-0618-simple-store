import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class CreateProduct extends Component {
  render() {
    return(
      <div>Create Product Page</div>
    );
  }
}

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($title: String!, $text: String!) {
    createProduct(title: $title, text: $text) {
      id
      title
      text
    }
  }
`

const CreateProductWithMutation = graphql(CREATE_PRODUCT_MUTATION, {
  name: 'createProductMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreateProduct)

export default withRouter(CreateProductWithMutation)
