/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';

const News = () => {
  return (
    <div
      css={{
        backgroundColor: '#ffffff',
        justifySelf: 'center',
        borderRadius: '5px',
        boxShadow: '0 1px 4px 0 rgba(31, 45, 61, 0.15)',
        margin: '-80px 16px 0 16px',
        maxWidth: '900px',
      }}
    >
      <a href="https://www.eclipse.org/sirius/doc" target="_blank" rel="noopener noreferrer" css={{ display: 'block', padding: '30px' }}>
        <h3 css={{ margin: '0px 0px 20px 0px' }}>Looking for the Sirius documentation?</h3>
        <p css={{ fontSize: '16px', lineHeight: '24px' }}>
          The Sirius documentation can be found directly on the Sirius website where you will also
          be able to find a gallery with tons of examples. The documentation includes everything
          you need to whether you are a Sirius end user, a Sirius specifier or a developer looking
          to extend Sirius programmatically.
        </p>
      </a>
    </div>
  );
};

export default News;
