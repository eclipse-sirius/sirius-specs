/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';
import { Link } from 'gatsby';

const Specification = ({ node, ...props }) => {
  return (
    <Link
      to={node.fields.slug}
      css={{
        display: 'block',
        padding: '30px',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(38,41,58,.1)',
        boxShadow: '0 1px 4px 0 rgba(31, 45, 61, 0.15)',
        borderRadius: '5px',
      }}
      {...props}
    >
      <h3
        css={{
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '0px 0px 10px 0px',
        }}
      >
        {node.frontmatter.title}
      </h3>
      <h4
        css={{
          display: 'block',
          fontSize: '12px',
          padding: '0px 0px 20px 0px',
        }}
      >
        {node.frontmatter.date}
      </h4>
      <p css={{ display: 'block', fontSize: '16px' }}>
        By {node.frontmatter.author}
      </p>
    </Link>
  );
};

export default Specification;
