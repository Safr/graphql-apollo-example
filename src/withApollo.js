import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
});

export default Component => props => (
  <ApolloProvider client={client}>
    <Component {...props } />
  </ApolloProvider>
);
