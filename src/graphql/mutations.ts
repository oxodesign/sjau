// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDugnad = /* GraphQL */ `
  mutation CreateDugnad(
    $input: CreateDugnadInput!
    $condition: ModelDugnadConditionInput
  ) {
    createDugnad(input: $input, condition: $condition) {
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
export const updateDugnad = /* GraphQL */ `
  mutation UpdateDugnad(
    $input: UpdateDugnadInput!
    $condition: ModelDugnadConditionInput
  ) {
    updateDugnad(input: $input, condition: $condition) {
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
export const deleteDugnad = /* GraphQL */ `
  mutation DeleteDugnad(
    $input: DeleteDugnadInput!
    $condition: ModelDugnadConditionInput
  ) {
    deleteDugnad(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
