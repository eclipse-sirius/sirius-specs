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

const Grid = ({
  children,
  gridTemplateRows,
  gridTemplateColumns,
  gridRowGap,
  gridColumnGap,
  gridAutoColumns,
}) => {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateRows,
        gridTemplateColumns,
        gridRowGap,
        gridColumnGap,
        gridAutoColumns,
      }}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  gridTemplateRows: PropTypes.string.isRequired,
  gridTemplateColumns: PropTypes.string.isRequired,
  gridRowGap: PropTypes.string.isRequired,
  gridColumnGap: PropTypes.string.isRequired,
  gridAutoColumns: PropTypes.string.isRequired,
};
Grid.defaultProps = {
  gridRowGap: '0px',
  gridColumnGap: '0px',
  gridAutoColumns: '1fr',
};

export default Grid;
