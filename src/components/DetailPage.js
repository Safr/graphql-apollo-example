import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo';
import Spinner from 'react-spinkit';

import { DRAFTS_QUERY, FEED_QUERY, POST_QUERY } from '../graphql/queries';
import { DELETE_MUTATION, PUBLISH_MUTATION } from '../graphql/mutations';

class DetailPage extends Component {
  _renderAction = ({ id, isPublished = false }) => {
    const publishButton = (
      <Mutation
        mutation={PUBLISH_MUTATION}
        variables={{ id }}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          const { feed } = cache.readQuery({ query: FEED_QUERY })
          cache.writeQuery({
            query: FEED_QUERY,
            data: { feed: feed.concat([data.publish]) },
          })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: {
              drafts: drafts.filter(draft => draft.id !== data.publish.id),
            },
          })
        }}
        >
        {(publish, { data, loading, error }) => {
          return (
            <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer mr2"
              onClick={async () => {
                await publish({
                  // variables: { id },
                })
                this.props.history.replace('/')
              }}
            >
              Publish
            </a>
          )
        }}
      </Mutation>
    );
    const deleteButton = (
    <Mutation
    mutation={DELETE_MUTATION}
    variables={{ id }}
    update={(cache, { data }) => {
          if (isPublished) {
            const { feed } = cache.readQuery({ query: FEED_QUERY });
            cache.writeQuery({
              query: FEED_QUERY,
              data: { feed: feed.filter(post => post.id !== data.deletePost.id) },
            })
          } else {
            const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
            cache.writeQuery({
              query: DRAFTS_QUERY,
              data: {
                drafts: drafts.filter(draft => draft.id !== data.deletePost.id),
              },
            })
          }
        }}
  >
    {(deletePost, { data, loading, error }) => {
      return (
      <a
      className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
      onClick={async () => {
        await deletePost({
          // variables: { id },
        })
        this.props.history.replace('/')
      }}
    >
      Delete
    </a>
    )
    }}
      </Mutation>
    );
    return isPublished ?
      deleteButton :
      <Fragment>
        {publishButton} 
        {deleteButton} 
      </Fragment>
  }
  render() {
    return (
      <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
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
  
          const { post } = data
          const action = this._renderAction(post)
          return (
            <Fragment>
              <h1 className="f3 black-80 fw4 lh-solid">{data.post.title}</h1>
              <p className="black-80 fw3">{data.post.text}</p>
              {action}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(DetailPage);
