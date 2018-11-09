/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';
import Helmet from 'react-helmet';

const Head = () => {
  return (
    <Helmet
      title="Sirius Specifications"
      meta={[
        { name: 'description', content: 'Sirius Specifications' },
        { name: 'keywords', content: 'Eclipse Sirius, Sirius' },
      ]}
    >
      <html lang="en" />
      <meta property="og:title" content="Sirius Specifications" />
      <meta property="og:type" content="website" />
      <link
        href="https://fonts.googleapis.com/css?family=Lora|Open+Sans:800"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default Head;
