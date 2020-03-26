// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDugnad = /* GraphQL */ `
  query GetDugnad($id: ID!) {
    getDugnad(id: $id) {
      id
      name
      description
      startsAt
      endsAt
      tasks {
        items {
          id
          title
          description
          dugnadID
          status
        }
        nextToken
      }
    }
  }
`;
export const listDugnads = /* GraphQL */ `
  query ListDugnads(
    $filter: ModelDugnadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDugnads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        startsAt
        endsAt
        tasks {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      description
      dugnadID
      dugnad {
        id
        name
        description
        startsAt
        endsAt
        tasks {
          nextToken
        }
      }
      status
      comments {
        items {
          id
          taskID
          author
          content
        }
        nextToken
      }
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        dugnadID
        dugnad {
          id
          name
          description
          startsAt
          endsAt
        }
        status
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      taskID
      task {
        id
        title
        description
        dugnadID
        dugnad {
          id
          name
          description
          startsAt
          endsAt
        }
        status
        comments {
          nextToken
        }
      }
      author
      content
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        taskID
        task {
          id
          title
          description
          dugnadID
          status
        }
        author
        content
      }
      nextToken
    }
  }
`;
