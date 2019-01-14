import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Spinner from 'react-spinkit';

import { DRAFTS_QUERY } from '../graphql/queries';
import { CREATE_DRAFT_MUTATION } from '../graphql/mutations';

class CreatePage extends Component {
  state = {
    title: '',
    text: '',
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_DRAFT_MUTATION} variables={this.state}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: { drafts: drafts.concat([data.createDraft]) },
          })
        }}      
      >
        {(createDraft, { data, loading, error }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <Spinner name='double-bounce' />
              </div>
           );
          }
          return (
            <div className="pa4 flex justify-center bg-white">
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  // const { title, text } = this.state
                  // await createDraft({
                  //   variables: { title, text },
                  // })
                  await createDraft();
                  this.props.history.replace('/drafts')
                }}
              >
                <h1>Create Draft</h1>
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={this.handleInput}
                  placeholder="Title"
                  type="text"
                  name="title"
                  value={this.state.title}
                />
                <textarea
                  className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
                  cols={50}
                  onChange={this.handleInput}
                  name="text"
                  placeholder="Content"
                  rows={8}
                  value={this.state.text}
                />
                <input
                  className={`pa2 bg-black-10 mr2 bn ${this.state.text &&
                    this.state.title &&
                    'dim pointer'}`}
                  disabled={!this.state.text || !this.state.title}
                  type="submit"
                  value="Create"
                />
                <a className="f6 pointer" onClick={this.props.history.goBack}>
                  or Cancel
                </a>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(CreatePage);

