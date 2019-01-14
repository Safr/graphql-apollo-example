import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import Spinner from 'react-spinkit';
import Post from './Post';

import { FEED_QUERY } from '../graphql/queries';

export default class FeedPage extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ data, loading, error, refetch }) => {
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
              <h1>Feed</h1>
              {data.feed &&
                data.feed.map(post => (
                  <Post
                    key={post.id}
                    post={post}
                    refresh={() => refetch()}
                    isDraft={!post.isPublished}
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