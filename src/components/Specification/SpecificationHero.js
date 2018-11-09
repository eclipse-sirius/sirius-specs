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

const SpecificationHero = () => {
  return (
    <div
      css={{
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        padding: ' 64px 0px',
      }}
    >
      <h2
        css={{
          justifySelf: 'center',
          textAlign: 'center',
        }}
      >
        <Link
          to="/specifications"
          css={{ borderBottom: '1px solid lightgrey' }}
        >
          Have a look at all our specifications
        </Link>
      </h2>
    </div>
  );
};

export default SpecificationHero;
