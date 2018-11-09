---
title: GraphQL Workspace
author: Stéphane Bégaudeau
date: 2018-11-09
---

The GraphQL workspace schema is used to manipulate projects, folders and files. It allows users to quickly navigate between the various elements available, manipulate them and create new ones.

## Capabilities

This API will provide the following capabilities:

- Retrieve a project
- Retrieve the list of the projects
- Navigate downward from a project to files and folders
- Retrieve directly a file or folder
- Navigate upward from a file or folder up to the project
- Retrieve the content of a file
- Creating a new project, folder or file

## Retrieve a project

Files, folders and projects will all have a non-null name and projects will also have a description. In order to obtain a project, we can request it thanks to its name.

<!-- prettier-ignore -->
```graphql
type Query {
  project(name: String!): Project
}

type File {
  name: String!
}

type Folder {
  name: String!
}

type Project {
  name: String!
  description: String!
}
```

The root element of the workspace schema is the project which represent a container of some work to be done. Inside a project, we will have folders with resources and sub-folders allowing the users to create a tree structure to store some data. This schema would allow us to retrieve a project with the following query.

<!-- prettier-ignore -->
```graphql
query findProjectByName($name: String!) {
  project(name: $name) {
    name
    description
  }
}
```

Using `test` as the argument name, we could retrieve the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "project": {
      "name": "test",
      "description": "Lorem Ipsum"
    }
  }
}
```

## Retrieving all the projects

We will also need to retrieve all the projects available to create an index for our users. For that a fields named projects will give us access to all projects using a cursor-based pagination strategy inspired by Facebook Relay. The query will thus provide a connection to with edges to the resources requested. This connection will also provide some additional information indicating if there are additional data which can be requested.

<!-- prettier-ignore -->
```graphql
type Query {
  project(name: String!): Project
  projects(first: Int, after: String, last: Int, before: String): QueryProjectConnection!
}

type QueryProjectConnection {
  edges: [QueryProjectEdge!]!
  pageInfo: PageInfo!
}

type QueryProjectEdge {
  node: Project!
  cursor: String!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

type File {
  name: String!
}

type Folder {
  name: String!
}

type Project {
  name: String!
  description: String!
}
```

With this improvement, we could retrieve the list of the projects with the following query.

<!-- prettier-ignore -->
```graphql
query findProjects(first: $first) {
  projects(first: $first, after: null) {
    edges {
      node {
        name
        description
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
    }
  }
}
```

This query could produce the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "projects": {
      "edges": [
        {
          "node": {
            "name": "First Project",
            "description": "The first project"
          },
          "cursor": "IGJ5IGhpcyByZWFzb24sIGJ1dCBi"
        },
        {
          "node": {
            "name": "First Project",
            "description": "The first project"
          },
          "cursor": "IG1pbmQsIHRoYXQgYnkgYSBwZXJz"
        }
      ],
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false
      }
    }
  }
}
```

The ability to list all the projects available is interesting but without fields allowing us to navigate between projects, folders and files this schema would not be very relevant.

## Navigating downward

Both projects and folders will contain child folders and files. For that two interfaces will be used, the first one to indicate that both files and folders are resources and the second one to represent both projects and folders as containers of resources. Since we will manipulate those elements thanks to their interfaces quite often, the field name will also be available on both the interfaces Container and Resource.

<!-- prettier-ignore -->
```graphql
type Query {
  project(name: String!): Project
  projects(first: Int, after: String, last: Int, before: String): QueryProjectConnection!
}

type QueryProjectConnection {
  edges: [QueryProjectEdge!]!
  pageInfo: PageInfo!
}

type QueryProjectEdge {
  node: Project!
  cursor: String!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

interface Resource {
  name: String!
}

type File implements Resource {
  name: String!
}

interface Container {
  name: String!
}

type Folder implements Resource, Container {
  name: String!
}

type Project implements Container {
  name: String!
  description: String!
}
```

A container will have access to a list of resources but we don't want to return all the resources available at once for scalability reasons. As a result, we will require users to provide pagination arguments to compute a subset of the resources to return. Those arguments will also use a cursor-based pagination strategy inspired by Facebook Relay.

<!-- prettier-ignore -->
```graphql
type Query {
  project(name: String!): Project
  projects(first: Int, after: String, last: Int, before: String): QueryProjectConnection!
}

type QueryProjectConnection {
  edges: [QueryProjectEdge!]!
  pageInfo: PageInfo!
}

type QueryProjectEdge {
  node: Project!
  cursor: String!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

interface Resource {
  name: String!
}

type File implements Resource {
  name: String!
}

interface Container {
  name: String!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
}

type ContainerResourceConnection {
  edges: [ContainerResourceEdge!]!
  pageInfo: PageInfo!
}

type ContainerResourceEdge {
  node: Resource!
  cursor: String!
}

type Folder implements Resource, Container {
  name: String!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
}

type Project implements Container {
  name: String!
  description: String!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
}
```

Using this new schema, we could create queries allowing us to navigate the whole tree structure of a project.

<!-- prettier-ignore -->
```graphql
query findProjectByNameWithResources($name: String!) {
  project(name: $name) {
    name
    description
    resources(first: 10, after: null) {
      edges {
        node {
          name
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
}
```

This query could produce the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "project": {
      "name": "test",
      "description": "Lorem Ipsum",
      "resources": {
        "edges": [
          {
            "node": {
              "name": "LICENSE.md"
            },
            "cursor": "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbm"
          },
          {
            "node": {
              "name": "README.md"
            },
            "cursor": "BvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGDq"
          }
        ],
        "pageInfo": {
          "hasPreviousPage": false,
          "hasNextPage": false
        }
      }
    }
  }
}
```

Thanks to those improvements, we can start from the top by retrieving a project and then navigate downward to find its folders and files. This kind of query will be useful to have a discover the content of a project to create an index of a project but users of this API will also need a way to retrieve directly a specific resource in a project.

## Direct retrieval of a resource

In order to retrieve quickly a resource deeply nested inside of a project, we will need a specific identifier for the resource along with a way to retrieve it. For that all resources will have a field named path used to uniquely identify a resource inside of a project.

<!-- prettier-ignore -->
```graphql
interface Resource {
  name: String!
  path: String!
}
```

On top of that, a project will have the ability to directly retrieve a resource thanks to a field named `resourceByPath` which will need a path as an argument to find a resource.

<!-- prettier-ignore -->
```graphql
type Project implements Container {
  name: String!
  description: String!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
  resourceByPath(path: String!): Resource
}
```

Using those two improvements to our schema, we will have the ability to navigate quickly to a specific resource as you can see it in the following query.

<!-- prettier-ignore -->
```graphql
query findResourceInProject($projectName: String!, $resourcePath: String!) {
  project(name: $projectName) {
    name
    resourceByPath(path: $resourcePath) {
      name
    }
  }
}
```

Using this query, we could obtain the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "project": {
      "name": "test",
      "resourceByPath": {
        "name": "LICENSE.md"
      }
    }
  }
}
```

Now that we have the ability to both have an overview of the content of a project and retrieve a specific resource, we will also need to be able to navigate upward from a specific resource. This kind of queries will be especially useful to display a breadcrumb for a specific resource for example.

## Navigating upward

Any resource will be able to retrieve both its container to navigate to its containing element quickly. On top of that, it should be possible to navigate back to the project directly from any resource.

<!-- prettier-ignore -->
```graphql
interface Resource {
  name: String!
  path: String!
  container: Container!
  project: Project!
}
```

With this improvement, we could create a query retrieving a specific resource, some information on its direct container and on its containing project.

<!-- prettier-ignore -->
```graphql
query findResourceInProject($projectName: String!, $resourcePath: String!) {
  project(name: $projectName) {
    name
    resourceByPath(path: $resourcePath) {
      name
      path
      container {
        name
      }
    }
  }
}
```

This kind of query could produce the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "project": {
      "name": "test",
      "resourceByPath": {
        "name": "test.js",
        "path": "src/components/test",
        "container": {
          "name": "test"
        }
      }
    }
  }
}
```

Resources that are located at the root of the project will receive the same result for both the fields container and project.

## Retrieve the content of a file

Users will need to retrieve the content of a file but there are various ways to see it. We could see the raw content but also some specific representations showing a structured view of the file. Such a representation could also be available on a part of the file only. In this schema, we will only handle the retrieval of the raw content of the file as a string along with its encoding.

<!-- prettier-ignore -->
```graphql
type File implements Resource {
  name: String!
  path: String!
  container: Container!
  project: Project!
  content: String!
  encoding: String!
}
```

Thanks to this improvement, we could retrieve the content of a specific file in a project with the following query.

<!-- prettier-ignore -->
```graphql
query findFile($projectName: String!, $resourcePath: String!) {
  project(name: $projectName) {
    name
    resourceByPath(path: $resourcePath) {
      name
      ... on File {
        content
        encoding
      }
    }
  }
}
```

We could thus obtain the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "project": {
      "name": "test",
      "resourceByPath": {
        "name": "LICENSE.md",
        "content": "...",
        "encoding": "UTF-8"
      }
    }
  }
}
```

## Creation of projects, folders and files

The GraphQL workspace schema will also provide multiple mutations in order to let users create new projects, folders and files.

### Project creation

In order to create a project, we will need to provide both its name and its description. The description can be an empty string but it can't be null.

<!-- prettier-ignore -->
```graphql
type Mutation {
  createProject(description: ProjectCreationDescription!): Project
}

input ProjectCreationDescription {
  name: String!
  description: String!
}
```

Users will need to be able to create projects already initialized. For that, they will be able to define how the project should be initialized thanks to an initialization strategy.

<!-- prettier-ignore -->
```graphql
type Mutation {
  createProject(description: ProjectCreationDescription!): Project
}

enum ProjectCreationStrategy {
  DEFAULT_PROJECT
}

input ProjectCreationDescription {
  name: String!
  description: String!
  strategy: ProjectCreationStrategy!
}
```

Developers should be able to contribute additional project creation strategy programmatically to the server. In order to provide a proper user interface to let users select the desired strategy, it should be possible to retrieve the descriptors of the various project creation strategies available.

<!-- prettier-ignore -->
```graphql
type Query {
  project(name: String!): Project
  projects(first: Int, after: String, last: Int, before: String): QueryProjectConnection
  projectCreationStrategyDescriptors(first: Int, after: String, last: Int, before: String): QueryProjectCreationStrategyDescriptorConnection!
}

type QueryProjectCreationStrategyDescriptorConnection {
  edges: [QueryProjectCreationStrategyDescriptorEdge!]!
  pageInfo: PageInfo!
}

type QueryProjectCreationStrategyDescriptorEdge {
  node: ProjectCreationStrategyDescriptor!
  cursor: String!
}

type ProjectCreationStrategyDescriptor {
  name: String!
  description: String!
  strategy: ProjectCreationStrategy!
}
```

As such, thanks to the following query, we could retrieve the strategies available.

<!-- prettier-ignore -->
```graphql
query findAllProjectCreationStrategyDescriptors($first: Int!, after: String!) {
  projectCreationStrategyDescriptors(first: $first, after: $after) {
    edges {
      node {
        name
        description
        strategy
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
    }
  }
}
```

This query would produce the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "projectCreationStrategyDescriptors": {
      "edges": [
        {
          "node": {
            "name": "Default project",
            "description": "Create an empty project",
            "strategy": "DEFAULT_PROJECT"
          },
          "cursor": "GFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyY"
        },
        {
          "node": {
            "name": "Initialized project",
            "description": "Create a project initialized with some data",
            "strategy": "INITIALIZED_PROJECT"
          },
          "cursor": "xlIGdlbmVyYXRpb24gb2Yga25vd2xlqs"
        }
      ],
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false
      }
    }
  }
}
```

After having retrieved the available creation strategies, we could create a project with the following query.

<!-- prettier-ignore -->
```graphql
mutation newProject(
  $description: ProjectCreationDescription
) {
  createProject(description: $description) {
    name
    description
    resources(first: 10, after: null) {
      edges {
        node {
          name
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
}
```

This would produce the following result with a strategy which would initialize a new project with both a license and a readme file.

<!-- prettier-ignore -->
```json
{
  "data": {
    "createProject": {
      "name": "New Project",
      "description": "The description of our project",
      "resources": {
        "edges": [
          {
            "node": {
              "name": "LICENSE.md"
            },
            "cursor": "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbm"
          },
          {
            "node": {
              "name": "README.md"
            },
            "cursor": "BvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGDq"
          }
        ],
        "pageInfo": {
          "hasPreviousPage": false,
          "hasNextPage": false
        }
      }
    }
  }
}
```

### Folder creation

Creating a folder will be more straightforward since there won't be any need for a specific strategy, it will only require the name of the project and the path of a container.

<!-- prettier-ignore -->
```graphql
type Mutation {
  createProject(description: ProjectCreationDescription!): Project
  createFolder(projectName: String! description: FolderCreationDescription!): Folder
}

input FolderCreationDescription {
  name: String!
  containerPath: String!
}
```

With this addition to our schema, we could run the following query to create a new folder named "components" inside of a folder named "src".

<!-- prettier-ignore -->
```graphql
mutation newFolder(
  $projectName: String!,
  $description: FolderCreationDescription
) {
  createFolder(projectName: $projectName, description: $description) {
    name
    container {
      name
    }
    project {
      name
    }
  }
}
```

It would return the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "createFolder": {
      "name": "components",
      "container": {
        "name": "src"
      },
      "project": {
        "name": "New Project"
      }
    }
  }
}
```

### File creation

In order to create a file, we need to supply some information including its name, the path of its container and its initial content.

<!-- prettier-ignore -->
```graphql
type Mutation {
  createProject(description: ProjectCreationDescription!): Project
  createFolder(projectName: String! description: FolderCreationDescription!): Folder
  createFile(projectName: String!, containerPath: String!, description: FileCreationDescription!): File
}

input FileCreationDescription {
  name: String!
  content: String!
  encoding: String!
}
```

Thanks to those additions, we can execute the following query to create a new file.

<!-- prettier-ignore -->
```graphql
mutation createFile(
  $projectName: String!,
  $containerPath: String!,
  $description: FileCreationDescription
) {
  createFile(projectName: $projectName, containerPath: $containerPath, description: $description) {
    name
    content
    encoding
    container {
      name
    }
    project {
      name
    }
  }
}
```

The creation of the file could produce the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "createFile": {
      "name": "test.js",
      "content": "...",
      "encoding": "UTF-8",
      "container": {
        "name": "src"
      },
      "project": {
        "name": "New Project"
      }
    }
  }
}
```

## Complete Schema

<!-- prettier-ignore -->
```graphql
type Query {
  project(name: String!): Project
  projects(first: Int, after: String, last: Int, before: String): QueryProjectConnection
  projectCreationStrategyDescriptors(first: Int, after: String, last: Int, before: String): QueryProjectCreationStrategyDescriptorConnection!
}

type QueryProjectConnection {
  edges: [QueryProjectEdge!]!
  pageInfo: PageInfo!
}

type QueryProjectEdge {
  node: Project!
  cursor: String!
}

type QueryProjectCreationStrategyDescriptorConnection {
  edges: [QueryProjectCreationStrategyDescriptorEdge!]!
  pageInfo: PageInfo!
}

type QueryProjectCreationStrategyDescriptorEdge {
  node: ProjectCreationStrategyDescriptor!
  cursor: String!
}

type ProjectCreationStrategyDescriptor {
  name: String!
  description: String!
  strategy: ProjectCreationStrategy!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

interface Resource {
  name: String!
  path: String!
  container: Container!
  project: Project!
}

type File implements Resource {
  name: String!
  path: String!
  container: Container!
  project: Project!
  content: String!
  encoding: String!
}

interface Container {
  name: String!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
}

type ContainerResourceConnection {
  edges: [ContainerResourceEdge!]!
  pageInfo: PageInfo!
}

type ContainerResourceEdge {
  node: Resource!
  cursor: String!
}

type Folder implements Resource, Container {
  name: String!
  path: String!
  container: Container!
  project: Project!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
}

type Project implements Container {
  name: String!
  description: String!
  resources(first: Int, after: String, last: Int, before: String): ContainerResourceConnection!
  resourceByPath(path: String!): Resource
}

type Mutation {
  createProject(description: ProjectCreationDescription!): Project
  createFolder(projectName: String! description: FolderCreationDescription!): Folder
  createFile(projectName: String!, containerPath: String!, description: FileCreationDescription!): File
}

enum ProjectCreationStrategy {
  DEFAULT_PROJECT
}

input ProjectCreationDescription {
  name: String!
  description: String!
  strategy: ProjectCreationStrategy!
}

input FolderCreationDescription {
  name: String!
  containerPath: String!
}

input FileCreationDescription {
  name: String!
  content: String!
  encoding: String!
}
```
