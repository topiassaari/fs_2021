import { gql } from "@apollo/client";

export const AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author
      title
    }
  }
`;
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`;
