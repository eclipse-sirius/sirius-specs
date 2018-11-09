/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';
import { Link, graphql } from 'gatsby';

import Container from '../components/Container';
import Grid from '../components/Grid';
import Head from '../components/Head';
import Layout from '../components/Layout';

const SpecificationsPage = ({ data }) => {
  return (
    <Layout>
      <Head />
      <Container>
        <Grid
          gridTemplateRows="1fr"
          gridTemplateColumns="15% 1fr 15%"
          gridRowGap="0"
          gridColumnGap="0"
        >
          <div
            css={{
              gridColumn: '2 / 3',
            }}
          >
            <h1 css={{ fontWeight: 800, margin: '24px 0px' }}>
              All specifications ({data.allMarkdownRemark.totalCount})
            </h1>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <div key={node.id} css={{ marginBottom: '30px' }}>
                <Link to={node.fields.slug}>
                  <h4 css={{ fontWeight: 800, margin: '18px 0px 12px 0px' }}>
                    {node.frontmatter.title} by {node.frontmatter.author}
                  </h4>
                  <p>{node.excerpt}</p>
                </Link>
              </div>
            ))}
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};

export default SpecificationsPage;

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(content/specifications)/.*.md$/" }
      }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            author
            date(formatString: "YYYY/MM/DD")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
