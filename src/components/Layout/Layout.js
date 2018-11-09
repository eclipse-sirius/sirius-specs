/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';
import Header from '../Header';

const Layout = ({ children }) => (
  <div
    css={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'min-content 1fr min-content',
      minHeight: '100vh',
    }}
  >
    <Header />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
