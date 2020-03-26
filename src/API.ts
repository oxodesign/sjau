/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDugnadInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  startsAt?: string | null,
  endsAt?: string | null,
};

export type ModelDugnadConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startsAt?: ModelStringInput | null,
  endsAt?: ModelStringInput | null,
  and?: Array< ModelDugnadConditionInput | null > | null,
  or?: Array< ModelDugnadConditionInput | null > | null,
  not?: ModelDugnadConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateDugnadInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  startsAt?: string | null,
  endsAt?: string | null,
};

export type DeleteDugnadInput = {
  id?: string | null,
};

export type CreateTaskInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  dugnadID: string,
  status: string,
};

export type ModelTaskConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dugnadID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateTaskInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  dugnadID?: string | null,
  status?: string | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  taskID: string,
  author: string,
  content: string,
};

export type ModelCommentConditionInput = {
  taskID?: ModelIDInput | null,
  author?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  taskID?: string | null,
  author?: string | null,
  content?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type ModelDugnadFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startsAt?: ModelStringInput | null,
  endsAt?: ModelStringInput | null,
  and?: Array< ModelDugnadFilterInput | null > | null,
  or?: Array< ModelDugnadFilterInput | null > | null,
  not?: ModelDugnadFilterInput | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dugnadID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  taskID?: ModelIDInput | null,
  author?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type CreateDugnadMutationVariables = {
  input: CreateDugnadInput,
  condition?: ModelDugnadConditionInput | null,
};

export type CreateDugnadMutation = {
  createDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateDugnadMutationVariables = {
  input: UpdateDugnadInput,
  condition?: ModelDugnadConditionInput | null,
};

export type UpdateDugnadMutation = {
  updateDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteDugnadMutationVariables = {
  input: DeleteDugnadInput,
  condition?: ModelDugnadConditionInput | null,
};

export type DeleteDugnadMutation = {
  deleteDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};

export type GetDugnadQueryVariables = {
  id: string,
};

export type GetDugnadQuery = {
  getDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListDugnadsQueryVariables = {
  filter?: ModelDugnadFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDugnadsQuery = {
  listDugnads:  {
    __typename: "ModelDugnadConnection",
    items:  Array< {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      taskID: string,
      task:  {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null,
      author: string,
      content: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateDugnadSubscription = {
  onCreateDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateDugnadSubscription = {
  onUpdateDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteDugnadSubscription = {
  onDeleteDugnad:  {
    __typename: "Dugnad",
    id: string,
    name: string,
    description: string | null,
    startsAt: string | null,
    endsAt: string | null,
    tasks:  {
      __typename: "ModelTaskConnection",
      items:  Array< {
        __typename: "Task",
        id: string,
        title: string,
        description: string | null,
        dugnadID: string,
        status: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask:  {
    __typename: "Task",
    id: string,
    title: string,
    description: string | null,
    dugnadID: string,
    dugnad:  {
      __typename: "Dugnad",
      id: string,
      name: string,
      description: string | null,
      startsAt: string | null,
      endsAt: string | null,
      tasks:  {
        __typename: "ModelTaskConnection",
        nextToken: string | null,
      } | null,
    } | null,
    status: string,
    comments:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        taskID: string,
        author: string,
        content: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    taskID: string,
    task:  {
      __typename: "Task",
      id: string,
      title: string,
      description: string | null,
      dugnadID: string,
      dugnad:  {
        __typename: "Dugnad",
        id: string,
        name: string,
        description: string | null,
        startsAt: string | null,
        endsAt: string | null,
      } | null,
      status: string,
      comments:  {
        __typename: "ModelCommentConnection",
        nextToken: string | null,
      } | null,
    } | null,
    author: string,
    content: string,
  } | null,
};
