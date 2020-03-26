// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateDugnad = /* GraphQL */ `
  subscription OnCreateDugnad {
    onCreateDugnad {
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
export const onUpdateDugnad = /* GraphQL */ `
  subscription OnUpdateDugnad {
    onUpdateDugnad {
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
export const onDeleteDugnad = /* GraphQL */ `
  subscription OnDeleteDugnad {
    onDeleteDugnad {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
