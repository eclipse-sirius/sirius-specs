/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import React from 'react';

import Grid from '../Grid';

import logo from './white_logo.png';

const gradient =
  'radial-gradient( circle farthest-corner at 52.1% -29.6%,  rgba(144,17,105,1) 0%, rgba(51,0,131,1) 100.2% )';

const Hero = () => {
  return (
    <div
      css={{
        background: gradient,
        color: '#ffffff',
        padding: '32px 0px 150px 0px',
      }}
    >
      <Grid
        gridTemplateColumns="1fr"
        gridTemplateRows="min-content min-content min-content"
      >
        <img
          src={logo}
          alt="Sirius logo"
          css={{ height: '200px', justifySelf: 'center' }}
        />
        <h1
          css={{
            justifySelf: 'center',
            padding: '20px 0',
            fontSize: '80px',
            textAlign: 'center',
          }}
        >
          Sirius Specs
        </h1>
        <h2
          css={{
            justifySelf: 'center',
            padding: '8px 0',
            textAlign: 'center',
            fontSize: '24px',
            lineHeight: '32px',
          }}
        >
          Technical documents and specifications for Eclipse Sirius
        </h2>
      </Grid>
    </div>
  );
};

export default Hero;
