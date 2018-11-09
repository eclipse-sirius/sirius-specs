---
title: GraphQL Sirius
author: Stéphane Bégaudeau
date: 2018-11-12
---

The GraphQL Sirius schema is used to activate or deactivate viewpoints, manipulate representations and navigate inside of their descriptions.

## Capabilities

The API will provide the following capabilities:

- Retrieve a viewpoint
- Retrieve the list of the viewpoints
- Retrieve a representation
- Retrieve the description of a representation

Those capabilities can barely be used by themselves and they should mostly be used by stitching them to other GraphQL schema. As such, this document will present some capabilities once connected to some other concepts. The stitching presented here will only represent some examples that may ot be representative of any stitching strategy in the final product.

## Retrieve a viewpoint

A viewpoint can be retrieved using its name quite easily.

<!-- prettier-ignore -->
```graphql
type Query {
  viewpoint(name: String!): Viewpoint
}

type Viewpoint {
  name: String!
}
```

A viewpoint will mostly be used asto contain a set of representation description which can be created later on. It will allow us to create queries such as this one to retrieve a viewpoint.

<!-- prettier-ignore -->
```graphql
query findViewpointByName($name: String!) {
  viewpoint(name: $name) {
    name
  }
}
```

A query such as the previous one could give us the following result.

<!-- prettier-ignore -->
```json
{
  "data": {
    "viewpoint" {
      "name": "Design"
    }
  }
}
```

## Retrieve a list of the viewpoints

We can also retrieve a list of viewpoints at once using a cursor-based pagination strategy inspired by Facebook Relay.

<!-- prettier-ignore -->
```graphql
type Query {
  viewpoint(name: String!): Viewpoint
  viewpoints(first: Int, after: String, last: Int, before: String): QueryViewpointConnection!
}

type QueryViewpointConnection {
  edges: [QueryViewpointEdge!]!
  pageInfo: PageInfo!
}

type QueryViewpointEdge {
  node: Viewpoint!
  cursor: String!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

type Viewpoint {
  name: String!
}
```

Thanks to this pagination strategy, we could ask for the viewpoints available with the following query.

<!-- prettier-ignore -->
```graphql
query getViewpoints($first: Int!, $after: String!) {
  viewpoints(first: $first, after: $after) {
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
```

This query could return us a paginated result allowing us to retrieve progressively all the viewpoints available.

<!-- prettier-ignore -->
```json
{
  "data": {
    "viewpoints": {
      "edges": [
        {
          "node": {
            "name": "Design"
          },
          "cursor": "IGJ5IGhpcyByZWFzb24sIGJ1dCBi"
        },
        {
          "node": {
            "name": "Architecture"
          },
          "cursor": "IG1pbmQsIHRoYXQgYnkgYSBwZXJz"
        }
      ],
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": true
      }
    }
  }
}
```

## Retrieving a representation description

Viewpoints will be used to hold the list of the representations descriptions which can be created later on.

<!-- prettier-ignore -->
```graphql
type Query {
  viewpoint(name: String!): Viewpoint
  viewpoints(first: Int, after: String, last: Int, before: String): QueryViewpointConnection!
}

type QueryViewpointConnection {
  edges: [QueryViewpointEdge!]!
  pageInfo: PageInfo!
}

type QueryViewpointEdge {
  node: Viewpoint!
  cursor: String!
}

type PageInfo {
  hasPreviousPage: Boolean!
  hasNextPage: Boolean!
}

type Viewpoint {
  name: String!
  representationDescription(name: String!): RepresentationDescription
  representationDescriptions(first: Int, after: String, last: Int, before: String): ViewpointRepresentationDescriptionConnection!
}

type RepresentationDescription {
  name: String!
  viewpoint: Viewpoint!
}

type ViewpointRepresentationDescriptionConnection {
  edges: [ViewpointRepresentationDescriptionEdge!]!
  pageInfo: PageInfo!
}
type ViewpointRepresentationDescriptionEdge {
  node: RepresentationDescription!
  cursor: String!
}
```

Retrieving all the representation description available in a viewpoint can be done with the following query.

<!-- prettier-ignore -->
```graphql
query findRepresentationDescriptionForViewpoint($viewpointName: String!, $first: Int!, $after: String!) {
  viewpoint(name: $viewpointName) {
    name
    representationDescriptions(first: $first, after: $after) {
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
    "viewpoint": {
      "name": "Design",
      "representationDescriptions": {
        "edges": [
          {
            "node": {
              "name": "Navigation Diagram"
            },
            "cursor": "IGJ5IGhpcyByZWFzb24sIGJ1dCBi"
          },
          {
            "node": {
              "name": "Activity Diagram"
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
}
```

## Manipulation a representation

User will be able to create and retrieve representations thanks to the GraphQL API. The creation and retrieval of a representation will be done by stitching the Sirius GraphQL schema with another schema. All representations will at least contain a name and a reference to their description. The description of the representation will contain a reference to its containing viewpoint. Additional information will be available depending on the type of the representation.

<!-- prettier-ignore -->
```graphql
interface Representation {
  name: String!
  description: RepresentationDescription!
}

interface RepresentationDescription {
  name: String!
  viewpoint: Viewpoint!
}
```

### Diagram

<!-- prettier-ignore -->
```graphql
interface Representation {
  name: String!
  description: RepresentationDescription!
}

type Diagram implements Representation {
  name: String!
  description: DiagramDescription!
}

interface RepresentationDescription {
  name: String!
  viewpoint: Viewpoint!
}

type DiagramDescription implements RepresentationDescription {
  name: String!
  viewpoint: Viewpoint!
}
```
