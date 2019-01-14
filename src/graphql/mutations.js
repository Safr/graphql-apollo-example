import{ gql } from 'apollo-boost';

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
      isPublished
    }
  }
`


export const PUBLISH_MUTATION = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

export const DELETE_MUTATION = gql`
  mutation DeleteMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`