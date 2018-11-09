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
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  vertical-align: baseline;
  background: transparent;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  line-height: 1;
  color: black;
  background: white;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: none;
}

a {
  margin: 0;
  padding: 0;
  fontSize: 100%;
  vertical-align: baseline;
  background: transparent;
  color: inherit;
}

a,
a:visited,
a:hover {
  text-decoration: none;
}

ins {
  background-color: white;
  color: black;
  text-decoration: none;
}

mark {
  background-color: white;
  color: black;
  font-style: inherit;
  font-weight: inherit;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid black;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

[role='button'],
input[type='submit'],
input[type='reset'],
input[type='button'],
button {
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  --webkit-appearance: button;
  --webkit-user-select: none;
  --moz-user-select: none;
  --ms-user-select: none;
  user-select: none;
}

input::-moz-focus-inner,
button::-moz-focus-inner {
  border: 0;
  padding: 0;
}
`;
