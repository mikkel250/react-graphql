import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

// query the DB.
//The gql tag and backtics let us use the GraphQL style of queries inside of our JavaScript
const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => (
  // Query returns a function. On that function is going to be an object that holds a number of different properties
  // Wrap the Query component around whatever component you want to receive the data
  <Query query={GET_COLLECTIONS}>
    {/* destructure off the things you want to get from the object to use */}
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      return <CollectionsOverview collections={data.collections} />; //data is the top level key for what's returned from GraphQL in this case, so data.collections will return the collections
    }}
  </Query>
);

export default CollectionsOverviewContainer;
