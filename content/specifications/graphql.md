---
title: GraphQL
author: Stéphane Bégaudeau
date: 2018-11-14
---

This document will describe how to manipulate GraphQL inside of Eclipse Sirius. It will list all the capabilities available and how to use them.

## Capabilities

* Contributing a GraphQL schema
* Create a schema from an Ecore metamodel
* Execute a query
* Serialize the result in JSON
* Use GraphQL over HTTP

## Contributing a GraphQL schema

Thanks to GraphQL Java, developers are able to create a GraphQL schema quite easily. A GraphQL schema will be composed of a set of types with fields that the user can manipulate to request its data. In order to start creating a GraphQL schema, you should use the plugin com.graphql.java along with the documentation of the GraphQL Java project.

Once your schema has been created, you can contribute it to our GraphQL schema registry using our extension point. This extension point requires an instance of a GraphQL schema provider which will contribute some schema to our registry. An extension will be able to provide multiple schema at once into our registry.

<!-- prettier-ignore -->
```java
import graphql.schema.GraphQLSchema;

import java.util.List;

public interface ISiriusGraphQLSchemaProvider {
  public List<GraphQLSchema> getSchemas();
}
```

In a GraphQL schema provider, we could easily create a schema manually, reuse one of the existing schema or use a schema computed from an Ecore metamodel.

## Create a schema from an Ecore metamodel

In order to create a GraphQL schema from an Ecore metamodel, you can use the Sirius GraphQL EMF schema builder which will produce a GraphQL schema from an EMF metamodel.

<!-- prettier-ignore -->
```java
import graphql.schema.GraphQLSchema;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.sirius.sample.basicfamily.BasicfamilyPackage;

import org.eclipse.sirius.services.graphql.core.api.ISiriusGraphQLSchemaProvider;
import org.eclipse.sirius.services.graphql.emf.api.SiriusGraphQLEMFSchemaBuilder;

public class BasicFamilySchemaProvider implements ISiriusGraphQLSchemaProvider {
  @Override
  public List<GraphQLSchema> getSchemas() {
    GraphQLSchema schema = new SiriusGraphQLEMFSchemaBuilder(BasicfamilyPackage.eINSTANCE).build();
    
    List<GraphQLSchema> schemas = new ArrayList<>();
    schemas.add(schema);
    return schemas;
  }
}
```

Using the GraphQL schema provider extension point, this code would allow us to transform a given Ecore model into a GraphQL schema easily.

## Execute a GraphQL query

In order to execute a GraphQL query, you just have to create an execution input and then use the GraphQL schema to execute it.

<!-- prettier-ignore -->
```java
ExecutionInput executionInput = ExecutionInput.newExecutionInput()
  .query(query)
  .variables(variables)
  .operationName(operationName)
  .context(context)
  .build();

GraphQL graphQL = GraphQL.newGraphQL(schema)
  .build();

ExecutionResult executionResult = graphQL.execute(executionInput);
```

You can retrieve the GraphQL schema available from the Sirius GraphQL schema registry which will contain all the schema registered thanks to our schema provider extension point.

<!-- prettier-ignore -->
```java
String schemaId = "...";
SiriusGraphQLSchemaRegistry registry = SiriusGraphQLCorePlugin.getPlugin().getSchemaRegistry();
GraphQLSchema schema = registry.getSchema(schemaId);
```

Instead of using a GraphQL schema directly, we may want instead to stitch together some capabilities provided by various schemas. For that, we can call the GraphQL interpreter with a custom schema created from stitching various schema together.

<!-- prettier-ignore -->
```java
GraphQLSchema schema = new SiriusGraphQLSchemaStitcher(registry).build();
```

The Sirius GraphQL schema stitcher will look for some required schema in the GraphQL schema registry and stitch them together in a default schema. It will create links between some concepts of the following schemas:

* Diagram
* EMF
* Workspace

In order to create those links, the following concepts will be added to the default schema:

* UserProjectConnection
* UserProjectEdge
* UserEPackageConnection
* UserEPackageEdge
* UserViewpointConnection
* UserViewpointEdge
* ProjectViewpointConnection
* ProjectViewpointEdge
* FileRepresentationConnection
* FileRepresentationEdge
* RepresentationDescriptionEPackageConnection
* RepresentationDescriptionEPackageEdge

| Schema    | Concept                   | Field                                                                                                          |
|-----------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Core      | User                      | project(name: String!): Project                                                                                |
| Core      | User                      | projects(first: Int, after: String, last: Int, before: String): UserProjectConnection                          |
| Core      | User                      | ePackage(nsURI: String!): EPackage                                                                             |
| Core      | User                      | ePackages(first: Int, after: String, last: Int, before: String): UserEPackageConnection                        |
| Core      | User                      | viewpoint(name: String!): Viewpoint                                                                            |
| Core      | User                      | viewpoints(first: Int, after: String, last: Int, before: String): UserViewpointConnection                      |
| Core      | RepresentationDescription | ePackages(first: Int, after: String, last: Int, before: String): RepresentationDescriptionEPackageConnection   |
| Workspace | Project                   | activatedViewpoints(first: Int, after: String, last: Int, before: String): ProjectViewpointConnection          |
| Workspace | File                      | representations(first: Int, after: String, last: Int, before: String): FileRepresentationConnection            |
| Workspace | File                      | eObjects(first: Int, after: String, last: Int, before: String): FileEObjectConnection                          |

Along with those connection, the default schema will add the following mutation to the schema.

* activateViewpoint(projectName: String!, viewpointIdentifier: String!): Project
* deactivateViewpoint(projectName: String!, viewpointIdentifier: String!): Project
* createRepresentation(projectName: String!, resourcePath: String!, description: RepresentationCreationDescription!): Project

## Serialize the result in JSON

Once the query has been executed, we can transform the result quite easily in JSON using the following code.


```java
ExecutionResult executionResult = graphQL.execute(executionInput);
Map<String, Object> result = executionResult.toSpecification();
String json = new Gson().toJson(result);
```

After having serialized the result in JSON, we can send it over the network as a HTTP response for example.