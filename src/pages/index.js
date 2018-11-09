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

import Head from '../components/Head';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import News from '../components/News';
import { SpecificationHero, Specifications } from '../components/Specification';

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Head />
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'min-content min-content min-content 1fr',
          backgroundColor: '#f6f9fa',
          padding: '0px 0px 80px 0px',
        }}
      >
        <Hero />
        <News />
        <SpecificationHero />
        <Specifications nodes={data.allMarkdownRemark.edges} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 15
      filter: {
        fileAbsolutePath: { regex: "/(content/specifications)/.*.md$/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
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
