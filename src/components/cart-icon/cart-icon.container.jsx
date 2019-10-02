import React from "react";
import { Mutation, Query, graphql } from "react-apollo";
import { gql } from "apollo-boost";

import { flowRight } from "lodash";

import CartIcon from "./cart-icon.component";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

// destructure off the parts of the props we want to pass to the component in the arguments
const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

// flowRight takes the component and returns a higher order component with the mutations on it
// formerly compose in the Apollo library (deprecated)
export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: `toggleCartHidden` }) // the second property assigns the name to prop that passed in for this mutation (in the container, here, above)...7:48 in lecture 231
)(CartIconContainer);
