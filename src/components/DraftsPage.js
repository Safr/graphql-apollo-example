import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import Spinner from 'react-spinkit';
import Post from './Post';
import { DRAFTS_QUERY } from '../graphql/queries';
export default class DraftsPage extends Component {
  render() {
    return (
      <Query query={DRAFTS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <Spinner name='double-bounce' />
              </div>
           );
          }

          if (error) {
            return (
            <div className="flex w-100 h-100 items-center justify-center pt7">
              <div>An unexpected error occured.</div>
            </div>
            );
          }
          return (
            <Fragment>
              <div className="flex justify-between items-center">
                <h1>Drafts</h1>
              </div>
              {data.drafts &&
                data.drafts.map(draft => (
                  <Post
                    key={draft.id}
                    post={draft}
                    refresh={() => console.log(`Refetch`)}
                    isDraft={!draft.isPublished}
                  />
                ))}
              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

