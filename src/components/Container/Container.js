/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';

const Container = ({ children }) => {
  return (
    <div
      css={{
        backgroundColor: '#f6f9fa',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
