/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';

import Specification from './Specification';

const Specifications = ({ nodes }) => {
  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
          gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
          gridColumnGap: '20px',
          gridRowGap: '20px',
          justifySelf: 'stretch',
          padding: '0px 16px',
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        {nodes.map(({ node }) => (
          <Specification node={node} key={node.id} />
        ))}
      </div>
    </div>
  );
};

export default Specifications;
