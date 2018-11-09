/*******************************************************************************
 * Copyright (c) 2018 Obeo and others.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2
 * which accompanies this distribution and is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *******************************************************************************/

import { injectGlobal } from 'react-emotion';

injectGlobal`
body {
  color: #333333;
  font-family: -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
}

.doc a,
.doc a:hover,
.doc a:active {
  text-decoration: underline;
}

.doc h1,
.doc h2,
.doc h3,
.doc h4,
.doc h5,
.doc h6 {
  font-weight: 800;
}

.doc h1 { margin: 24px 0px; }
.doc h2 { margin: 22px 0px; }
.doc h3 { margin: 20px 0px; }
.doc h4 { margin: 18px 0px; }
.doc h5 { margin: 16px 0px; }
.doc h6 { margin: 14px 0px; }

.doc p {
  line-height: 1.5;
  font-size: 16px;
  margin: 16px 0;
}

.doc li {
  line-height: 1.5;
  font-size: 16px;
}

.doc table {
  border: 1px solid #dee2e6;
}
.doc table th,
.doc table td {
  padding .75rem;
  border: 1px solid #dee2e6;
}
`;
