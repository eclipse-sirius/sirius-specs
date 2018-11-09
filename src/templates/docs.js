/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';
import { graphql } from 'gatsby';

import Container from '../components/Container';
import Grid from '../components/Grid';
import Layout from '../components/Layout';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Container>
        <Grid
          gridTemplateRows="1fr"
          gridTemplateColumns="15% 1fr 15%"
          gridRowGap="0"
          gridColumnGap="0"
        >
          <div
            className="doc"
            css={{
              gridColumn: '2 / 3',
              paddingBottom: '24px',
            }}
          >
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
