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

const Header = () => (
  <div
    css={{
      backgroundColor: '#26293a',
      color: '#ffffff',
      padding: '16px 32px',
      boxShadow: '0 1px 4px 0 rgba(31, 45, 61, 0.15)',
    }}
  >
    <h1
      css={{
        fontSize: '28px',
        lineHeight: '38px',
        fontWeight: '800',
      }}
    >
      <Link to="/">Sirius Specs</Link>
    </h1>
  </div>
);

export default Header;
