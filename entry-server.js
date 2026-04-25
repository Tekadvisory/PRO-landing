import { jsxs, jsx } from "react/jsx-runtime";
import React, { forwardRef, createElement, useState, useEffect, useMemo, useRef } from "react";
import { renderToString } from "react-dom/server";
import { motion } from "framer-motion";
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$s = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$s);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$r = [
  ["path", { d: "M12 6v16", key: "nqf5sj" }],
  ["path", { d: "m19 13 2-1a9 9 0 0 1-18 0l2 1", key: "y7qv08" }],
  ["path", { d: "M9 11h6", key: "1fldmi" }],
  ["circle", { cx: "12", cy: "4", r: "2", key: "muu5ef" }]
];
const Anchor = createLucideIcon("anchor", __iconNode$r);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$q = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$q);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$p = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$p);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$o = [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2", key: "p02svl" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2", key: "xm4xkj" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M14 10h4", key: "ru81e7" }],
  ["path", { d: "M6 14h2v6", key: "16z9wg" }],
  ["path", { d: "M14 4h2v6", key: "1idq9u" }]
];
const Binary = createLucideIcon("binary", __iconNode$o);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$n = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$n);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$m = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$m);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$l = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$l);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$k = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$k);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$j = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$j);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$i = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$i);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$h = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$h);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$g = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$g);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$f = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$f);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$e = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$e);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$d = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$d);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$c = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$c);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$b = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$b);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$a);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34", key: "z3du51" }],
  ["path", { d: "M4 6h.01", key: "oypzma" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35", key: "qzzz0" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67", key: "1yjesh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67", key: "1u2y91" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "m13.41 10.59 5.66-5.66", key: "mhq4k0" }]
];
const Radar = createLucideIcon("radar", __iconNode$9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Radio = createLucideIcon("radio", __iconNode$8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "m19 8 3 8a5 5 0 0 1-6 0zV7", key: "zcdpyk" }],
  ["path", { d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1", key: "1yorad" }],
  ["path", { d: "m5 8 3 8a5 5 0 0 1-6 0zV7", key: "eua70x" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }]
];
const Scale = createLucideIcon("scale", __iconNode$7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M16 3h5v5", key: "1806ms" }],
  ["path", { d: "M8 3H3v5", key: "15dfkv" }],
  ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3", key: "1qrqzj" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }]
];
const Split = createLucideIcon("split", __iconNode$5);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$4);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode$3);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$2);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317", key: "193nxd" }],
  ["path", { d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773", key: "27a7lr" }],
  [
    "path",
    {
      d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",
      key: "1e0qe9"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const ZapOff = createLucideIcon("zap-off", __iconNode$1);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const AI_PROJECTS = [
  {
    id: "lex-sovereign",
    name: "LexSovereign",
    description: {
      en: "AI agent for monitoring and anticipating European and international public regulation shifts (AI Act, DMA, DSA, export controls).",
      fr: "Agent IA pour la surveillance et l'anticipation des évolutions réglementaires publiques européennes et internationales (AI Act, DMA, DSA, contrôles export)."
    },
    status: "LIVE",
    tech: ["Regulatory OSINT", "LLM Analysis", "Predictive Compliance"],
    business: ["Public Regulation", "Lawfare Protection", "Compliance Strategy"],
    industry: "Public Regulation"
  },
  {
    id: "techstack-vanguard",
    name: "TechStack Vanguard",
    description: {
      en: "Mapping critical tech dependencies and identifying sovereignty vulnerabilities in the value chain (semiconductors, cloud, cyber).",
      fr: "Cartographie des dépendances technologiques critiques et identification des vulnérabilités de souveraineté dans la chaîne de valeur (semi-conducteurs, cloud, cyber)."
    },
    status: "R&D",
    tech: ["Supply Chain Mapping", "Vulnerability Scanning", "Tech Graph"],
    business: ["Geo-tech", "Strategic Autonomy", "Value Chain Recomposition"],
    industry: "Tech"
  },
  {
    id: "aegis-command",
    name: "Aegis Command",
    description: {
      en: "Multi-domain intelligence for the defense economy. Tracking defense budgets, procurement programs, and dual-use technology proliferation.",
      fr: "Renseignement multi-milieux pour l'économie de défense. Suivi des budgets de défense, des programmes d'acquisition et de la prolifération des technologies à double usage."
    },
    status: "LIVE",
    tech: ["Defense OSINT", "Signal Intelligence", "Dual-use Tracking"],
    business: ["Defense Economy", "War Economy", "Strategic Stock"],
    industry: "Defense"
  },
  {
    id: "europa-nexus",
    name: "Europa Nexus",
    description: {
      en: "Analyzing the European strategic landscape, tracking industrial policies, state aid, and the formation of European tech champions.",
      fr: "Analyse du paysage stratégique européen, suivi des politiques industrielles, des aides d'État et de la formation des champions technologiques européens."
    },
    status: "LIVE",
    tech: ["Policy Tracking", "Industrial Data", "Ecosystem Mapping"],
    business: ["European Sovereignty", "Industrial Policy", "Market Intel"],
    industry: "Europe"
  },
  {
    id: "atlas-geopolitics",
    name: "Atlas Geopolitics",
    description: {
      en: "Real-time geopolitical risk correlation engine. Monitoring sanctions, trade wars, and decoupling dynamics across international markets.",
      fr: "Moteur de corrélation des risques géopolitiques en temps réel. Surveillance des sanctions, des guerres commerciales et des dynamiques de découplage sur les marchés internationaux."
    },
    status: "BETA",
    tech: ["Geopolitical OSINT", "Risk Correlation", "Event Prediction"],
    business: ["Geo-economics", "Strategic Decoupling", "Trade War"],
    industry: "International"
  }
];
const StrategicIntelligenceMap = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    const nodes = [];
    const nodeCount = 18;
    const labels = ["NODE_A1", "PORT_SNG", "NODE_ROT", "HUB_DBX", "LNK_X", "SIG_ALPHA", "THREAT_MAP"];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        label: labels[Math.floor(Math.random() * labels.length)]
      });
    }
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.05)";
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist / 200)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            const pulsePos = (time * 0.05 + i * j) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
            ctx.fillStyle = "#d4af37";
            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        ctx.fillStyle = "#d4af37";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#d4af37";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (i % 3 === 0) {
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
        if (i === 4 || i === 12) {
          const radarSize = (time * 0.03 + i * 10) % 60;
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.3 * (1 - radarSize / 60)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radarSize, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    animationFrameId = requestAnimationFrame(draw);
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative bg-transparent overflow-hidden", children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "w-full h-full" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 flex flex-col items-end opacity-40", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[8px] font-mono text-blue-400", children: "LAT: 48.8566" }),
      /* @__PURE__ */ jsx("div", { className: "text-[8px] font-mono text-blue-400", children: "LON: 2.3522" })
    ] })
  ] });
};
const ARTICLES = [
  {
    id: "sovereign-ai",
    title: {
      en: "The Architectures of Sovereignty",
      fr: "Les Architectures de la Souveraineté"
    },
    date: { en: "March 12, 2025", fr: "12 Mars 2025" },
    category: { en: "Tech Autonomy", fr: "Autonomie Tech" },
    readTime: { en: "6 min", fr: "6 min" },
    excerpt: {
      en: "Why generalist AI is a strategic liability. The shift toward proprietary, air-gapped agentic systems within global networks.",
      fr: "Pourquoi l'IA généraliste est un risque stratégique. La transition vers des systèmes agentiques propriétaires dans les réseaux mondiaux."
    },
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
    content: {
      en: [
        "In the current geopolitical landscape, reliance on third-party AI infrastructure is no longer just an operational risk; it's a direct threat to strategic autonomy.",
        "We are witnessing the emergence of 'Digital Iron Curtains' where data flows and compute power are being weaponized. The dependency on centralized black-box models controlled by foreign entities creates a structural vulnerability for European industry.",
        "Prometheus Advisory advocates for a decoupling from public models in favor of custom, localized architectures that preserve decisional integrity. This 'sovereign layer' is not about isolationism, but about the ability to maintain a conceptual lead even when external networks become hostile or opaque."
      ],
      fr: [
        "Dans le paysage géopolitique actuel, la dépendance à l'égard des infrastructures d'IA tierces n'est plus seulement un risque opérationnel ; c'est une menace directe pour l'autonomie stratégique.",
        "Nous assistons à l'émerégence de 'rideaux de fer numériques' où les flux de données et la puissance de calcul sont militarisés. La dépendance à des modèles boîte noire centralisés contrôlés par des entités étrangères crée une vulnérabilité structurelle pour l'industrie européenne.",
        "Prometheus Advisory préconise un découplage des modèles publics au profit d'architectures personnalisées et localisées qui préservent l'intégrité décisionnelle. Cette 'couche souveraine' ne concerne pas l'isolationnisme, mais la capacité à maintenir une avance conceptuelle même lorsque les réseaux externes deviennent hostiles ou opaques."
      ]
    }
  },
  {
    id: "supply-chain-warfare",
    title: {
      en: "Supply Chain Asymmetry",
      fr: "L'Asymétrie des Chaînes de Valeur"
    },
    date: { en: "February 28, 2025", fr: "28 Février 2025" },
    category: { en: "Geopolitics", fr: "Géopolitique" },
    readTime: { en: "8 min", fr: "8 min" },
    excerpt: {
      en: "Mapping the weaponization of maritime nodes and the end of linear shipping globalization.",
      fr: "Cartographier la militarisation des nœuds maritimes et la fin de la mondialisation linéaire des flux."
    },
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
    content: {
      en: [
        "The era of peaceful globalization is over. Supply chains are being reshaped by security imperatives rather than efficiency. What was once 'Just-in-Time' is becoming 'Just-in-Case' or 'Friend-Shoring'.",
        "Critical dependencies on adversarial states are being identified as 'strategic choke points'. These maritime and logistical nodes are no longer neutral infrastructure but instruments of power projection.",
        "Resilience now requires a complete overhaul of logistics, moving from optimization to strategic redundancy. We map these asymmetries to allow our clients to navigate the high-friction corridors of modern trade."
      ],
      fr: [
        "L'ère de la mondialisation pacifique est révolue. Les chaînes d'approvisionnement sont remodelées par des impératifs de sécurité plutôt que d'efficacité. Ce qui était autrefois le 'Juste-à-Temps' devient le 'Juste-au-Cas' ou le 'Friend-Shoring'.",
        "Les dépendances critiques vis-à-vis d'États adversaires sont identifiées comme des 'points d'étranglement stratégiques'. Ces nœuds maritimes et logistiques ne sont plus des infrastructures neutres mais des instruments de projection de puissance.",
        "La résilience nécessite désormais une refonte complète de la logistique, passant de l'optimisation à la redondance stratégique. Nous cartographions ces asymétries pour permettre à nos clients de naviguer dans les couloirs à haute friction du commerce moderne."
      ]
    }
  }
];
const UI_TEXT = {
  en: {
    nav: { manifesto: "Briefing", services: "Advisory", education: "Education", foundry: "AI Foundry", expertise: "Fields", contact: "Contact" },
    domains: {
      subtitle: "Focus",
      title: "Core Expertise.",
      intro: "Power transition, the end of globalization, the advent of AI — three simultaneous disruptions that redefine who wins and who loses. Prometheus helps you get ahead thanks to our areas of strategic expertise.",
      items: [
        { title: "Regulation", icon: /* @__PURE__ */ jsx(Scale, { size: 24 }) },
        { title: "Tech", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) },
        { title: "Defense", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }) },
        { title: "Europe", icon: /* @__PURE__ */ jsx(Map, { size: 24 }) },
        { title: "Global", icon: /* @__PURE__ */ jsx(Globe, { size: 24 }) }
      ]
    },
    solutions: { subtitle: "Our services", title: "Strategic Solutions." },
    hero: {
      tag: "Status: Operative",
      headline: "Think different is easy.",
      headlineItalic: "Being right makes the difference.",
      subheadline: "A new world is emerging. Only those who see clearly survive. Prometheus helps you write your rules — and enforce them.",
      ctaPrimary: "Briefing",
      ctaSecondary: "Manifesto",
      labels: ["Geo-economics", "Geo-tech", "Geo-org"]
    },
    visionSection: {
      subtitle: "Doctrine",
      title: "Accuracy is Advantage.",
      body: "Reality is inescapable. In a world of radical friction, only the finest endure. We fuse machine speed with human taste. Think against the consensus. Preserve autonomy.",
      pillars: [
        { title: "Discernment", desc: "See what competitors miss. Filter noise. Act first. Preserve autonomy." },
        { title: "Global Grid", desc: "Decode new rules: blocs, sanctions, sovereignty, and standards." },
        { title: "Clarity", desc: "Master speed and dependencies. Separate reversible from terminal options." }
      ]
    },
    useCase: {
      subtitle: "A new-generation boutique.",
      title: "For a shifting world.",
      intro: "Analysis is not missing. The courage to see what one sees is.",
      cells: [
        { label: "The market", body: "Frameworks. Methods. Reports. <b>But still just mainstream.</b>" },
        { label: "Prometheus", body: "<b>Say what you see. See what you see.</b>", accent: true },
        { label: "Data vs Judgment", body: "<b>We built the only model that needs both.</b> AI sees what humans miss. Humans conclude where AI cannot." },
        { label: "Analysis vs Conviction", body: "We help you establish the ground rules <b>so you capitalize on your advantage.</b>" }
      ],
      quote: "“Thinking different is easy.”",
      answer: "Being right makes the difference."
    },
    intelligence: {
      subtitle: "Methodology",
      title: "Three layers. Your decision.",
      story: "Data without judgment is noise. Judgment without data is intuition. Prometheus is structured to respond to the increasing complexity of strategic environments — by articulating what AI does better than humans with what humans do better than AI.",
      synthesis: "Optimized AI. Human Judgment.",
      layers: [
        {
          id: "ai",
          title: "AI Foundry",
          subtitle: "Proprietary IA Agent Library",
          desc: "Regulatory monitoring, ecosystem mapping, geopolitical OSINT, predictive compliance, supply chain — real-time, global scale.",
          dot: "bg-emerald-500",
          shadow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        },
        {
          id: "specialists",
          title: "Hyper-specialists",
          subtitle: "Global Expert Network",
          desc: "Cutting-edge analysis from experts who know their industry from the inside (finance, industry, energy, regulation).",
          dot: "bg-indigo-500",
          shadow: "shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        },
        {
          id: "strategic",
          title: "Strategic Intelligence",
          subtitle: "Judgment, experience, culture",
          desc: "Transforming analysis into a stand. Common sense, courage, and general culture — what AI lacks alone.",
          dot: "bg-amber-600",
          shadow: "shadow-[0_0_10px_rgba(217,119,6,0.5)]"
        }
      ]
    },
    foundryPage: {
      subtitle: "AI Foundry",
      title: "Our team of AI agents",
      intro: "Proprietary AI for accurate vision. The foundation of next-gen advisory.",
      previewCta: "Explore Index",
      filters: {
        industry: "Sphere",
        tech: "Capability",
        business: "Domain",
        all: "All"
      }
    },
    briefingsPage: {
      subtitle: "Reports",
      title: "Tactical Insights.",
      back: "Archives"
    },
    manifestoPage: {
      subtitle: "The Lead",
      title: "Reality has no substitute.",
      discernment: "Contrarian thinking is the only path to advantage.",
      points: [
        "Eliminate noise. Recover speed. Protect autonomy.",
        "Decrypt brutal rules. Dominate the geostrategic revolution.",
        "Analyze reversible vs terminal options in complex environments."
      ],
      militarization: "Conflict is the new order. Business fog is political. Power is back: supply chain warfare, extraterritoriality, cognitive shock. We face reality.",
      regain: "Regain the lead. Execute advantage in the battles ahead.",
      intelligenceArchitecture: {
        title: "AI & HUMAN INTELLIGENCE.",
        aiTitle: "Proprietary Agents",
        aiDescription: "WE TRANSFORM CHAOS INTO ACTIONABLE DECISIONS.",
        aiItems: [
          { title: "Auto OSINT", desc: "FILTERING, CORRELATION, AND ANOMALY DETECTION.", icon: /* @__PURE__ */ jsx(Database, { size: 24 }) },
          { title: "Analytics", desc: "HIGH-FIDELITY GEOPOLITICAL AND TECHNICAL INTERPRETATION.", icon: /* @__PURE__ */ jsx(Binary, { size: 24 }) },
          { title: "AcademIA", desc: "DIRECT ACCESS TO FUNDAMENTAL RESEARCH.", icon: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }
        ],
        humanTitle: "Decisional Layer",
        humanDescription: "EXPERIENCED EXPERTISE TO CONTEXTUALIZE MACHINE SIGNALS.",
        humanItems: [
          { title: "Core Culture", desc: "DEEP KNOWLEDGE IN HISTORY AND SCIENCE.", icon: /* @__PURE__ */ jsx(History, { size: 24 }) },
          { title: "High-Level", desc: "DIRECT ENGAGEMENT WITH SENIOR DECISION-MAKERS.", icon: /* @__PURE__ */ jsx(Users, { size: 24 }) },
          { title: "Polyvalence", desc: "CROSS-INDUSTRY EXPERTISE TO DETECT RISK CONTAMINATION.", icon: /* @__PURE__ */ jsx(Layers, { size: 24 }) }
        ]
      },
      whyPrometheusTitle: "Prometheus: Bringer of Fire",
      whyPrometheusIntro: "The titan who stole fire to illuminate the dark.",
      howItInspires: [
        { title: "Flow Control", desc: "Injecting intelligence where it accelerates most." },
        { title: "Passage", desc: "Finding exits in strategic dead-ends." },
        { title: "Asymmetry", desc: "Advantage through non-obvious options." },
        { title: "Realism", desc: "No sugar-coating. Hard facts." }
      ]
    },
    expertisePage: {
      subtitle: "Domains",
      hero: "Intelligence Fields.",
      intro: "Where power and tech collide. We operate in high-friction environments.",
      domains: [
        { id: "reg", title: "Global Regulation", icon: /* @__PURE__ */ jsx(FileText, { size: 24 }), desc: "Extraterritoriality and cognitive warfare.", tags: ["Lawfare", "Sovereignty", "Lobbying"] },
        { id: "tech", title: "Tech Autonomy", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }), desc: "Transforming chaos into signals.", tags: ["OSINT", "Agentic AI", "Cyber"] },
        { id: "def", title: "Defense Economy", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }), desc: "Securing critical dependencies.", tags: ["Resilience", "Stocks", "Armor"] },
        { id: "int", title: "Geopolitics", icon: /* @__PURE__ */ jsx(Globe, { size: 24 }), desc: "Mapping the return of raw power.", tags: ["Risk", "Brussels", "Trade War"] }
      ]
    },
    servicesPage: {
      subtitle: "Command",
      title: "Advisory",
      cta: "Explore Framework",
      intro: "Align your trajectory with the coming global friction. We decode power to protect your sovereignty.",
      items: [
        {
          title: "Strategic Advisory",
          subtitle: "Master Brief",
          icon: /* @__PURE__ */ jsx(Briefcase, { size: 24 }),
          desc: "Radical realignment. We audit sovereignty, map exposure, and redefine your trajectory.",
          features: ["Sovereignty Audit", "Decoupling Strategy", "Executive Training"]
        },
        {
          title: "Fresh Eyes",
          subtitle: "Red Teaming",
          icon: /* @__PURE__ */ jsx(Eye, { size: 24 }),
          desc: "Stress-testing assumptions. We expose blind spots and challenge the consensus.",
          features: ["Blind Spot Extraction", "Pre-mortem Analysis", "Dissidence Simulation"]
        },
        {
          title: "Continuous intelligence",
          subtitle: "Signal 24/7",
          icon: /* @__PURE__ */ jsx(Radar, { size: 24 }),
          desc: "Automated signal extraction with elite analysis. Stay ahead of emerging threats.",
          features: ["Monthly Reports", "OSINT Access", "Real-time Correlation"]
        }
      ]
    },
    educationPage: {
      subtitle: "Leadership",
      title: "Executive Education.",
      cta: "View Programs",
      intro: "Transferring strategic lead through intensive high-level immersions for decision-makers.",
      offers: [
        {
          id: "exco",
          title: "Strategic EXCO",
          icon: /* @__PURE__ */ jsx(Users, { size: 24 }),
          desc: "Board-level alignment sessions for new geopolitical realities.",
          details: ["Stress Tests", "Red-Teaming"]
        },
        {
          id: "seminars",
          title: "Seminars",
          icon: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }),
          desc: "Expert-led immersions on friction points and contested frameworks.",
          details: ["Data Sovereignty", "War Economy"]
        }
      ]
    },
    teamSection: {
      subtitle: "Our Command team",
      title: "Strategy Command.",
      members: [
        {
          name: "Bruno Alomar",
          role: "Managing Partner",
          bio: "Economist and senior strategist. Expert: European Affairs, competition and defence.",
          image: "https://www.sansdoute.info/wp-content/uploads/2025/02/Bruno-Alomar.webp"
        },
        {
          name: "Thomas Kurkdjian",
          role: "Managing Partner",
          bio: "Entrepreneur and consultant. Expert: Tech, AI, Defence.",
          image: "https://media.licdn.com/dms/image/v2/D4E03AQGVPsr_u0XTIg/profile-displayphoto-scale_400_400/B4EZu5DTUbKQAk-/0/1768336212447?e=1772064000&v=beta&t=WrcB-yazRUT2HB7wwOgJevLCnXSk5n3OMsO8sFsd7bM"
        }
      ]
    },
    contactPage: {
      subtitle: "Secure",
      title: "Establish Communication.",
      intro: "Establish a secure line.",
      labels: {
        name: "User",
        email: "Operational Contact",
        company: "Organization",
        subject: "Intent",
        message: "Brief",
        submit: "Send Request",
        success: "Transmitted. Absolute discretion."
      },
      subjects: ["Strategic Audit", "Executive Education", "Defense Advisory", "Red Teaming"]
    },
    finalCta: { title: "Recover the Lead.", desc: "Build strategies others can't.", ctaPrimary: "Establish Session" },
    useCaseTaiwan: {
      subtitle: "Simulation",
      title: "The Taiwan Equation.",
      intro: "What if China seizes Taiwan? We analyze irreversible shifts in Tech & Finance.",
      scenario: "Kinetic Reunification & Global Blockade",
      methodology: {
        ai: {
          title: "AI: The Watchers",
          desc: "Proprietary agents monitoring friction points standard audits miss.",
          items: [
            { title: "OSINT Node", desc: "Real-time tracking of maritime logistics and mobilization signals.", icon: /* @__PURE__ */ jsx(Radar, { size: 24 }) },
            { title: "Tech Graph", desc: "Mapping TSMC dependencies and value chain choke points.", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) },
            { title: "Sanction Engine", desc: "Predictive modeling of 'Digital Iron Curtains' on financial flows.", icon: /* @__PURE__ */ jsx(Binary, { size: 24 }) }
          ]
        },
        advisory: {
          title: "Advisory: Decision",
          desc: "Human judgment navigating the end of linear globalization.",
          items: [
            { title: "Decoupling", desc: "Phased exit from high-risk dependencies without losing speed.", icon: /* @__PURE__ */ jsx(Split, { size: 24 }) },
            { title: "Red Teaming", desc: "Stress-testing strategy against total US-China tech decoupling.", icon: /* @__PURE__ */ jsx(Eye, { size: 24 }) },
            { title: "Fresh Eyes", desc: "Contrarian views on the 'One China' consensus.", icon: /* @__PURE__ */ jsx(Target, { size: 24 }) }
          ]
        },
        education: {
          title: "Education: Shield",
          desc: "Transferring the lead to your executive committee.",
          items: [
            { title: "EXCO War Games", desc: "Simulating the first 72 hours of conflict to find failure points.", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }) },
            { title: "War Economy", desc: "Training teams to operate in high-friction, sanctioned environments.", icon: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }
          ]
        }
      },
      cta: "Request Simulation Briefing"
    },
    footer: { quote: "Bypass consensus. Navigate the new rules.", legal: "Protocols", privacy: "Policy", methodology: "Action" }
  },
  fr: {
    nav: { manifesto: "Briefing", services: "Advisory", education: "Formation", foundry: "AI Foundry", expertise: "Champs", contact: "Contact" },
    domains: {
      subtitle: "Focus",
      title: "Expertise Centrale.",
      intro: "Transition de puissance, fin de la mondialisation, avènement de l'IA — trois ruptures simultanées qui redéfinissent qui gagne et qui perd. Prometheus vous aide à en faire une longueur d'avance grâce à nos domaines d'expertises stratégiques.",
      items: [
        { title: "Régulation", icon: /* @__PURE__ */ jsx(Scale, { size: 24 }) },
        { title: "Tech", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) },
        { title: "Défense", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }) },
        { title: "Europe", icon: /* @__PURE__ */ jsx(Map, { size: 24 }) },
        { title: "Global", icon: /* @__PURE__ */ jsx(Globe, { size: 24 }) }
      ]
    },
    solutions: { subtitle: "Nos services", title: "Solutions Stratégiques." },
    hero: {
      tag: "Statut : Opérationnel",
      headline: "Penser différemment est facile.",
      headlineItalic: "Avoir raison fait la différence.",
      subheadline: "Un nouveau monde émerge. Seuls ceux qui voient juste survivent. Prometheus vous aide à écrire vos règles — et à les imposer.",
      ctaPrimary: "Briefing",
      ctaSecondary: "Manifeste",
      labels: ["Géo-économie", "Géo-tech", "Géo-org"]
    },
    visionSection: {
      subtitle: "Doctrine",
      title: "La Justesse est l'Avantage.",
      body: "Le réel est incontournable. Dans un monde de friction radicale, seuls les plus fins perdurent. Nous fusionnons vitesse machine et saveur humaine. Pensez contre le consensus. Préservez l'autonomie.",
      pillars: [
        { title: "Discernement", desc: "Voir ce que les concurrents manquent. Filtrer le bruit. Agir d'abord. Préserver l'autonomie." },
        { title: "Grille Globale", desc: "Décrypter les nouvelles règles : blocs, sanctions, souveraineté et standards." },
        { title: "Clarté", desc: "Maîtriser la vitesse et les dépendances. Distinguer options réversibles et terminales." }
      ]
    },
    useCase: {
      subtitle: "Une boutique nouvelle génération.",
      title: "Pour un monde qui bascule.",
      intro: "Ce n'est pas l'analyse qui manque. C'est le courage de voir ce que l'on voit.",
      cells: [
        { label: "Le marché", body: "Frameworks. Méthodes. Rapports. <b>Mais toujours le consensus.</b>" },
        { label: "Prometheus", body: "<b>Dire ce que l'on voit. Voir ce que l'on voit.</b>", accent: true },
        { label: "Donnée vs jugement", body: "<b>Nous avons bâti le seul modèle qui nécessite les deux.</b> L'IA capte ce que l'humain rate. L'humain conclut là où l'IA ne peut pas." },
        { label: "Analyse vs conviction", body: "Nous vous aidons à établir les règles du jeu <b>pour capitaliser sur votre avantage.</b>" }
      ],
      quote: "« Penser différemment est facile. »",
      answer: "Avoir raison fait la différence."
    },
    intelligence: {
      subtitle: "Méthodologie",
      title: "Trois couches. Votre décision.",
      story: "La donnée sans jugement est du bruit. Le jugement sans données est de l'intuition. Prometheus est structuré pour répondre à la complexité croissante des environnements stratégiques — en articulant ce que l’IA fait mieux que l’humain avec ce que l’humain fait mieux que l’IA.",
      synthesis: "IA Optimisée. Jugement Humain.",
      layers: [
        {
          id: "ai",
          title: "AI Foundry",
          subtitle: "Librairie d'agents IA propriétaire",
          desc: "Veille réglementaire, cartographie des écosystèmes, OSINT géopolitique, compliance prédictive, supply chain — en temps réel, à l'échelle mondiale.",
          dot: "bg-emerald-500",
          shadow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        },
        {
          id: "specialists",
          title: "Hyper-spécialistes",
          subtitle: "Réseau d'experts sectoriels",
          desc: "Des analyses de pointe produites par des experts qui connaissent leur secteur de l'intérieur — finance, industrie, santé, énergie, régulation.",
          dot: "bg-indigo-500",
          shadow: "shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        },
        {
          id: "strategic",
          title: "Intelligence stratégique",
          subtitle: "Jugement, expérience, culture",
          desc: "Transformer l'analyse en position assumée. Bon sens, expérience de terrain, courage intellectuel et culture générale — ce qui manque à toute IA seule.",
          dot: "bg-amber-600",
          shadow: "shadow-[0_0_10px_rgba(217,119,6,0.5)]"
        }
      ]
    },
    foundryPage: {
      subtitle: "AI Foundry",
      title: "Notre équipe d'agents IA",
      intro: "IA propriétaire pour une vision juste. Le socle du conseil de nouvelle génération.",
      previewCta: "Explorer l'Index",
      filters: {
        industry: "Sphère",
        tech: "Capacité",
        business: "Domaine",
        all: "Tous"
      }
    },
    briefingsPage: {
      subtitle: "Rapports",
      title: "Insights Tactiques.",
      back: "Archives"
    },
    manifestoPage: {
      subtitle: "L'Avance",
      title: "La réalité n'a pas de substitut.",
      discernment: "La pensée à contre-courant est la seule voie vers l'avantage.",
      points: [
        "Éliminer le bruit. Retrouver la vitesse. Protéger l'autonomie.",
        "Décrypter les règles brutales. Dominer la révolution géostratégique.",
        "Analyser les options réversibles vs terminales en milieu complexe."
      ],
      militarization: "Le conflit est le nouvel ordre. Le brouillard des affaires est politique. La puissance est de retour : guerre logistique, extraterritorialité, choc cognitif. Face au réel.",
      regain: "Retrouvez l'avance. Exécutez l'avantage dans les batailles à venir.",
      intelligenceArchitecture: {
        title: "IA & INTELLIGENCE HUMAINE.",
        aiTitle: "Agents Propriétaires",
        aiDescription: "NOUS TRANSFORMONS LE CHAOS EN DÉCISIONS ACTIONNABLES.",
        aiItems: [
          { title: "OSINT Auto", desc: "FILTRAGE, CORRÉLATION ET DÉTECTION D'ANOMALIES.", icon: /* @__PURE__ */ jsx(Database, { size: 24 }) },
          { title: "Analytique", desc: "INTERPRÉTATION GÉOPOLITIQUE ET TECHNIQUE HAUTE FIDÉLITÉ.", icon: /* @__PURE__ */ jsx(Binary, { size: 24 }) },
          { title: "AcademIA", desc: "ACCÈS DIRECT À LA RECHERCHE FONDAMENTALE.", icon: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }
        ],
        humanTitle: "Couche Décisionnelle",
        humanDescription: "EXPERTISE EXPÉRIMENTÉE POUR CONTEXTUALISER LA MACHINE.",
        humanItems: [
          { title: "Culture", desc: "CONNAISSANCES PROFONDES EN HISTOIRE ET SCIENCE.", icon: /* @__PURE__ */ jsx(History, { size: 24 }) },
          { title: "Haut Niveau", desc: "ENGAGEMENT DIRECT AVEC LES DÉCIDEURS SENIORS.", icon: /* @__PURE__ */ jsx(Users, { size: 24 }) },
          { title: "Polyvalence", desc: "EXPERTISE INTER-INDUSTRIES CONTRE LA CONTAMINATION DES RISQUES.", icon: /* @__PURE__ */ jsx(Layers, { size: 24 }) }
        ]
      },
      whyPrometheusTitle: "Prometheus : Porteur de Feu",
      whyPrometheusIntro: "Le titan qui vola le feu pour éclairer les ténèbres.",
      howItInspires: [
        { title: "Contrôle des Flux", desc: "Injecter l'intelligence là où elle accélère le plus." },
        { title: "Passage", desc: "Trouver des issues dans les impasses stratégiques." },
        { title: "Asymétrie", desc: "Avantage par des options non évidentes." },
        { title: "Réalisme", desc: "Pas d'édulcoration. Faits bruts." }
      ]
    },
    expertisePage: {
      subtitle: "Domaines",
      hero: "Champs d'Intelligence.",
      intro: "Où puissance et tech entrent en collision. Nous opérons en haute friction.",
      domains: [
        { id: "reg", title: "Régulation Mondiale", icon: /* @__PURE__ */ jsx(FileText, { size: 24 }), desc: "Extraterritorialité et guerre cognitive.", tags: ["Lawfare", "Souveraineté", "Lobbying"] },
        { id: "tech", title: "Autonomie Tech", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }), desc: "Transformer le chaos en signaux.", tags: ["OSINT", "IA Agentique", "Cyber"] },
        { id: "def", title: "Économie de Défense", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }), desc: "Sécuriser les dépendances critiques.", tags: ["Résilience", "Stocks", "Blindage"] },
        { id: "int", title: "Géopolitique", icon: /* @__PURE__ */ jsx(Globe, { size: 24 }), desc: "Cartographier le retour de la puissance brute.", tags: ["Risque", "Bruxelles", "Trade War"] }
      ]
    },
    servicesPage: {
      subtitle: "Commandement",
      title: "Advisory",
      cta: "Explorer le Cadre",
      intro: "Réalignez votre trajectoire face aux frictions mondiales. Nous décodons la puissance pour protéger votre souveraineté.",
      items: [
        {
          title: "Conseil Stratégique",
          subtitle: "Master Brief",
          icon: /* @__PURE__ */ jsx(Briefcase, { size: 24 }),
          desc: "Réalignement radical. Audit de souveraineté, cartographie d'exposition et redéfinition de trajectoire.",
          features: ["Audit Souveraineté", "Stratégie Découplage", "Formation Exécutive"]
        },
        {
          title: "Second Avis",
          subtitle: "Red Teaming",
          icon: /* @__PURE__ */ jsx(Eye, { size: 24 }),
          desc: "Stress-test des hypothèses. Exposition des angles morts et défi du consensus.",
          features: ["Angles Morts", "Analyse Pré-mortem", "Simulation Dissidence"]
        },
        {
          title: "Intelligence continue",
          subtitle: "Signal 24/7",
          icon: /* @__PURE__ */ jsx(Radar, { size: 24 }),
          desc: "Extraction de signaux automatisée et analyse d'élite. Anticiper les menaces.",
          features: ["Rapports Mensuels", "Accès OSINT", "Corrélation Temps Réel"]
        }
      ]
    },
    educationPage: {
      subtitle: "Leadership",
      title: "Formation Exécutive.",
      cta: "Voir les Programmes",
      intro: "Transfert d'avance stratégique par des immersions intensives de haut niveau pour les décideurs.",
      offers: [
        {
          id: "exco",
          title: "EXCO Stratégique",
          icon: /* @__PURE__ */ jsx(Users, { size: 24 }),
          desc: "Alignement du conseil face aux nouvelles réalités géopolitiques.",
          details: ["Stress Tests", "Red-Teaming"]
        },
        {
          id: "seminars",
          title: "Séminaires",
          icon: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }),
          desc: "Immersions expertes sur les points de friction et cadres contestés.",
          details: ["Souveraineté Données", "Économie de Guerre"]
        }
      ]
    },
    teamSection: {
      subtitle: "Notre équipe de commandement",
      title: "Commandement Stratégique.",
      members: [
        {
          name: "Bruno Alomar",
          role: "Managing Partner",
          bio: "Économiste et stratège senior. Expert : Affaires européennes, concurrence et défense.",
          image: "https://www.sansdoute.info/wp-content/uploads/2025/02/Bruno-Alomar.webp"
        },
        {
          name: "Thomas Kurkdjian",
          role: "Managing Partner",
          bio: "Entrepreneur et consultant. Expert : Tech, IA, Défense.",
          image: "https://media.licdn.com/dms/image/v2/D4E03AQGVPsr_u0XTIg/profile-displayphoto-scale_400_400/B4EZu5DTUbKQAk-/0/1768336212447?e=1772064000&v=beta&t=WrcB-yazRUT2HB7wwOgJevLCnXSk5n3OMsO8sFsd7bM"
        }
      ]
    },
    contactPage: {
      subtitle: "Sécurisé",
      title: "Établir la Liaison.",
      intro: "Établir une ligne sécurisée.",
      labels: {
        name: "Utilisateur",
        email: "Point de Contact",
        company: "Organisation",
        subject: "Intention",
        message: "Brief",
        submit: "Transmettre",
        success: "Transmis. Discrétion absolue."
      },
      subjects: ["Audit Stratégique", "Formation Exécutive", "Conseil Défense", "Red Teaming"]
    },
    finalCta: { title: "Retrouvez l'Avance.", desc: "Construisez des stratégies inaccessibles aux autres.", ctaPrimary: "Établir une Session" },
    useCaseTaiwan: {
      subtitle: "Simulation",
      title: "L'Équation Taïwan.",
      intro: "Et si la Chine s'emparait de Taïwan ? Analyse des basculements irréversibles en Tech & Finance.",
      scenario: "Réunification Cinétique & Blocus Global",
      methodology: {
        ai: {
          title: "IA : Les Veilleurs",
          desc: "Agents propriétaires surveillant les frictions ignorées par les audits standards.",
          items: [
            { title: "Nœud OSINT", desc: "Suivi temps réel de la logistique maritime et des signaux de mobilisation.", icon: /* @__PURE__ */ jsx(Radar, { size: 24 }) },
            { title: "Graphe Tech", desc: "Cartographie des dépendances TSMC et points d'étranglement.", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) },
            { title: "Moteur Sanctions", desc: "Modélisation prédictive des 'Rideaux de Fer Numériques' sur les flux.", icon: /* @__PURE__ */ jsx(Binary, { size: 24 }) }
          ]
        },
        advisory: {
          title: "Advisory : Décision",
          desc: "Jugement humain naviguant la fin de la mondialisation linéaire.",
          items: [
            { title: "Découplage", desc: "Sortie progressive des dépendances sans perte de vitesse.", icon: /* @__PURE__ */ jsx(Split, { size: 24 }) },
            { title: "Red Teaming", desc: "Stress-test stratégique face au découplage total US-Chine.", icon: /* @__PURE__ */ jsx(Eye, { size: 24 }) },
            { title: "Second Avis", desc: "Vision à contre-courant sur le consensus 'Une seule Chine'.", icon: /* @__PURE__ */ jsx(Target, { size: 24 }) }
          ]
        },
        education: {
          title: "Formation : Bouclier",
          desc: "Transférer l'avance à votre comité exécutif.",
          items: [
            { title: "War Games EXCO", desc: "Simulation des 72 premières heures pour trouver les ruptures.", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }) },
            { title: "Économie Guerre", desc: "Former les équipes à opérer sous sanctions et haute friction.", icon: /* @__PURE__ */ jsx(GraduationCap, { size: 24 }) }
          ]
        }
      },
      cta: "Demander le Briefing"
    },
    footer: { quote: "Bypass consensus. Navigate the new rules.", legal: "Protocoles", privacy: "Politique", methodology: "Action" }
  }
};
const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? window.scrollY / total * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full h-[2px] z-[110] pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#d4af37] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(212,175,55,0.8)]", style: { width: `${scroll}%` } }) });
};
const PrometheusIcon = ({ className = "w-8 h-8" }) => /* @__PURE__ */ jsx(Flame, { className });
const SectionHeading = ({ subtitle, title, mono = false, theme = "dark", accentColor }) => /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
    /* @__PURE__ */ jsx("div", { className: `w-8 h-[2px] ${accentColor ? accentColor : theme === "light" ? "bg-[#7a641d]" : "bg-[#d4af37]"}` }),
    /* @__PURE__ */ jsx("p", { className: `font-mono ${accentColor ? accentColor.replace("bg-", "text-") : theme === "light" ? "text-[#7a641d]" : "text-[#d4af37]"} tracking-[0.2em] text-[13px] font-bold`, children: subtitle })
  ] }),
  /* @__PURE__ */ jsx("h2", { className: `${mono ? "font-mono tracking-tighter" : "font-sans tracking-tight"} text-4xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.15] ${theme === "light" ? "text-black font-extrabold" : "text-white"} relative z-10`, children: title })
] });
const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayedText;
};
const Navbar = ({ lang, setLang, page, setPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = UI_TEXT[lang].nav;
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isLightBackground = page === "foundry";
  return /* @__PURE__ */ jsx("nav", { className: `fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? "py-3" : "py-8"}`, children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: `flex justify-between items-center h-14 px-6 rounded-2xl border transition-all duration-500 ${isScrolled ? "glass-panel bg-black/60 border-white/20" : "bg-transparent border-transparent"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 cursor-pointer group", onClick: () => setPage("home"), children: [
      /* @__PURE__ */ jsx(PrometheusIcon, { className: "w-8 h-8 text-[#d4af37]" }),
      /* @__PURE__ */ jsxs("span", { className: `font-sans text-xl font-bold transition-colors ${isLightBackground && !isScrolled ? "text-slate-950" : "text-white"}`, children: [
        "Prometheus ",
        /* @__PURE__ */ jsx("span", { className: "text-[#d4af37]", children: "Advisory" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest font-bold transition-colors ${isLightBackground && !isScrolled ? "text-slate-700" : "text-slate-300"}`, children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setPage("manifesto"), className: page === "manifesto" ? "text-[#d4af37]" : "hover:text-[#d4af37] transition-colors", children: t.manifesto }),
      /* @__PURE__ */ jsx("button", { onClick: () => setPage("services"), className: page === "services" ? "text-[#d4af37]" : "hover:text-[#d4af37] transition-colors", children: t.services }),
      /* @__PURE__ */ jsx("button", { onClick: () => setPage("education"), className: page === "education" ? "text-[#d4af37]" : "hover:text-[#d4af37] transition-colors", children: t.education }),
      /* @__PURE__ */ jsx("button", { onClick: () => setPage("foundry"), className: page === "foundry" ? "text-[#d4af37]" : "hover:text-[#d4af37] transition-colors", children: t.foundry }),
      /* @__PURE__ */ jsx("button", { onClick: () => setPage("contact"), className: "px-5 py-2 bg-[#d4af37] text-slate-950 rounded-lg hover:bg-slate-950 hover:text-[#d4af37] transition-all", children: t.contact }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 ml-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setLang("en"), className: lang === "en" ? "text-[#d4af37]" : "text-slate-500", children: "EN" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setLang("fr"), className: lang === "fr" ? "text-[#d4af37]" : "text-slate-500", children: "FR" })
      ] })
    ] })
  ] }) }) });
};
const ParallaxMemberCard = ({ member }) => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleParallax = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(distance * 0.1);
    };
    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "glass-panel grid grid-cols-1 lg:grid-cols-12 gap-8 p-10 rounded-3xl border-white/10 group overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { ref: containerRef, className: "lg:col-span-5 aspect-square overflow-hidden rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 relative", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: member.image,
        className: "w-full h-full object-cover",
        style: { transform: `translateY(${offset}px) scale(1.1)` },
        alt: member.name
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-[#d4af37] font-black uppercase tracking-[0.4em] mb-4", children: member.role }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-sans tracking-tight text-white mb-4 font-bold", children: member.name }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-200 font-mono text-[14px] font-bold opacity-80 leading-relaxed", children: member.bio })
    ] })
  ] });
};
const FoundryView = ({ lang }) => {
  const t = UI_TEXT[lang].foundryPage;
  const [activeIndustry, setActiveIndustry] = useState("all");
  const [activeTech, setActiveTech] = useState(null);
  const [activeBusiness, setActiveBusiness] = useState(null);
  const industries = useMemo(() => Array.from(new Set(AI_PROJECTS.map((p) => p.industry))), []);
  const techs = useMemo(() => Array.from(new Set(AI_PROJECTS.flatMap((p) => p.tech))), []);
  const businesses = useMemo(() => Array.from(new Set(AI_PROJECTS.flatMap((p) => p.business))), []);
  const filteredProjects = useMemo(() => {
    return AI_PROJECTS.filter((p) => {
      const matchIndustry = activeIndustry === "all" || p.industry === activeIndustry;
      const matchTech = !activeTech || p.tech.includes(activeTech);
      const matchBusiness = !activeBusiness || p.business.includes(activeBusiness);
      return matchIndustry && matchTech && matchBusiness;
    });
  }, [activeIndustry, activeTech, activeBusiness]);
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title, theme: "light" }),
    /* @__PURE__ */ jsx("p", { className: "text-black text-xl font-mono font-black mb-20 max-w-3xl border-l-4 border-[#d4af37] pl-8 opacity-100", children: t.intro }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 mb-20 space-y-12 transition-all hover:shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Globe, { size: 14, className: "text-[#d4af37]" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] uppercase font-bold tracking-widest text-slate-600", children: t.filters.industry })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveIndustry("all"),
              className: `px-6 py-2 rounded-full font-mono text-[11px] uppercase font-bold border transition-all ${activeIndustry === "all" ? "bg-slate-900 text-white border-slate-900 shadow-md" : "border-slate-200 text-slate-600 hover:border-[#d4af37]"}`,
              children: t.filters.all
            }
          ),
          industries.map((ind) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveIndustry(ind),
              className: `px-6 py-2 rounded-full font-mono text-[11px] uppercase font-bold border transition-all ${activeIndustry === ind ? "bg-slate-900 text-white border-slate-900 shadow-md" : "border-slate-200 text-slate-600 hover:border-[#d4af37]"}`,
              children: ind
            },
            ind
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Cpu, { size: 14, className: "text-blue-600" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] uppercase font-bold tracking-widest text-slate-600", children: t.filters.tech })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: techs.map((tech) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTech(activeTech === tech ? null : tech),
              className: `px-4 py-2 rounded-lg font-mono text-[10px] uppercase font-bold border transition-all ${activeTech === tech ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600 hover:border-blue-400"}`,
              children: tech
            },
            tech
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Briefcase, { size: 14, className: "text-emerald-600" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] uppercase font-bold tracking-widest text-slate-600", children: t.filters.business })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: businesses.map((biz) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveBusiness(activeBusiness === biz ? null : biz),
              className: `px-4 py-2 rounded-lg font-mono text-[10px] uppercase font-bold border transition-all ${activeBusiness === biz ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 text-slate-600 hover:border-emerald-400"}`,
              children: biz
            },
            biz
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: filteredProjects.length > 0 ? filteredProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "bg-white group p-10 rounded-[2.5rem] border border-slate-200 hover:border-[#d4af37]/60 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl flex flex-col md:flex-row justify-between gap-8 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-sans tracking-tight text-slate-950 font-bold group-hover:text-[#d4af37] transition-colors", children: project.name }),
          /* @__PURE__ */ jsx("div", { className: `px-3 py-1 rounded-md font-mono text-[9px] font-black tracking-widest border uppercase ${project.status === "LIVE" ? "text-emerald-700 border-emerald-100 bg-emerald-50" : project.status === "R&D" ? "text-blue-700 border-blue-100 bg-blue-50" : "text-[#d4af37] border-amber-100 bg-amber-50"}`, children: project.status }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-100", children: [
            "/ ",
            project.industry
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-700 font-mono text-[13px] leading-relaxed font-black max-w-3xl opacity-100", children: project.description[lang] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: [...project.tech, ...project.business].map((tag, idx) => /* @__PURE__ */ jsx("span", { className: `px-2.5 py-0.5 rounded-md font-mono text-[8px] uppercase font-black border ${idx < project.tech.length ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-amber-50 text-[#d4af37]/90 border-amber-100"}`, children: tag }, tag)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 group-hover:translate-x-2 transition-transform", children: /* @__PURE__ */ jsx("div", { className: "p-4 bg-slate-50 border border-slate-100 text-[#d4af37] rounded-full group-hover:bg-[#d4af37] group-hover:text-white transition-all shadow-sm", children: /* @__PURE__ */ jsx(ArrowRight, { size: 24 }) }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-[2px] bg-slate-50 group-hover:bg-[#d4af37]/20 transition-colors" })
    ] }, project.id)) : /* @__PURE__ */ jsxs("div", { className: "py-32 md:py-48 text-center bg-white rounded-[3rem] border border-slate-200 shadow-inner", children: [
      /* @__PURE__ */ jsx(ZapOff, { size: 48, className: "mx-auto mb-8 text-slate-300" }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-slate-500 uppercase font-black", children: "No matching assets found in local node." })
    ] }) })
  ] }) });
};
const UseCaseTaiwanView = ({ lang }) => {
  const t = UI_TEXT[lang].useCaseTaiwan;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "pt-32 pb-48 px-6 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none opacity-[0.03] z-0", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] animate-scan" }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
          /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title, accentColor: "bg-red-500" }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mb-24", children: [
            /* @__PURE__ */ jsx(
              motion.p,
              {
                initial: { y: 20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { delay: 0.2 },
                className: "text-3xl md:text-5xl font-sans tracking-tight text-white leading-tight font-bold mb-10",
                children: t.intro
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0.9, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { delay: 0.4 },
                className: "inline-block font-mono text-red-500 text-[12px] uppercase font-black tracking-widest bg-red-500/10 px-8 py-4 rounded-full border border-red-500/20 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]",
                children: t.scenario
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { y: 30, opacity: 0 },
                whileInView: { y: 0, opacity: 1 },
                viewport: { once: true },
                className: "glass-panel p-10 rounded-[3rem] border-[#d4af37]/20 relative overflow-hidden group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-50" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center rounded-2xl", children: /* @__PURE__ */ jsx(Cpu, { size: 28 }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-sans tracking-tight text-white font-bold", children: t.methodology.ai.title })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-[14px] mb-12 leading-relaxed font-medium", children: t.methodology.ai.desc }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-10", children: t.methodology.ai.items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "border-l-2 border-[#d4af37]/30 pl-6 group/item", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white mb-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[#d4af37] group-hover/item:scale-110 transition-transform", children: item.icon }),
                        /* @__PURE__ */ jsx("span", { className: "font-sans font-bold text-lg", children: item.title })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "font-mono text-[12px] text-slate-400 leading-relaxed font-medium", children: item.desc })
                    ] }, i)) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { y: 30, opacity: 0 },
                whileInView: { y: 0, opacity: 1 },
                viewport: { once: true },
                transition: { delay: 0.2 },
                className: "glass-panel p-10 rounded-[3rem] border-red-500/20 relative overflow-hidden group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center rounded-2xl", children: /* @__PURE__ */ jsx(Briefcase, { size: 28 }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-sans tracking-tight text-white font-bold", children: t.methodology.advisory.title })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-[14px] mb-12 leading-relaxed font-medium", children: t.methodology.advisory.desc }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-10", children: t.methodology.advisory.items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "border-l-2 border-red-400/30 pl-6 group/item", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white mb-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-red-400 group-hover/item:scale-110 transition-transform", children: item.icon }),
                        /* @__PURE__ */ jsx("span", { className: "font-sans font-bold text-lg", children: item.title })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "font-mono text-[12px] text-slate-400 leading-relaxed font-medium", children: item.desc })
                    ] }, i)) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { y: 30, opacity: 0 },
                whileInView: { y: 0, opacity: 1 },
                viewport: { once: true },
                transition: { delay: 0.4 },
                className: "glass-panel p-10 rounded-[3rem] border-slate-500/20 relative overflow-hidden group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-50" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-slate-500/10 border border-slate-500/30 text-slate-400 flex items-center justify-center rounded-2xl", children: /* @__PURE__ */ jsx(GraduationCap, { size: 28 }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-sans tracking-tight text-white font-bold", children: t.methodology.education.title })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-[14px] mb-12 leading-relaxed font-medium", children: t.methodology.education.desc }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-10", children: t.methodology.education.items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "border-l-2 border-slate-400/30 pl-6 group/item", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-white mb-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-slate-400 group-hover/item:scale-110 transition-transform", children: item.icon }),
                        /* @__PURE__ */ jsx("span", { className: "font-sans font-bold text-lg", children: item.title })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "font-mono text-[12px] text-slate-400 leading-relaxed font-medium", children: item.desc })
                    ] }, i)) })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              className: "mt-32 text-center",
              children: /* @__PURE__ */ jsx("button", { onClick: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), className: "px-16 py-8 bg-[#d4af37] text-slate-950 font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(239,68,68,0.3)] text-sm", children: t.cta })
            }
          )
        ] })
      ]
    }
  );
};
const LandingView = ({ lang, setPage, t }) => {
  const heroSub = useTypewriter(t.hero.subheadline, 20);
  const intelT = t.intelligence;
  const servicesT = t.servicesPage;
  const educationT = t.educationPage;
  const briefingsT = t.briefingsPage;
  const foundryT = t.foundryPage;
  const caseT = t.useCase;
  const solutionsT = t.solutions;
  return /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in duration-1000", children: [
    /* @__PURE__ */ jsx("section", { className: "relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full mb-8", children: [
          /* @__PURE__ */ jsx(Activity, { size: 12, className: "text-[#d4af37]" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-black", children: t.hero.tag })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "font-sans text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] md:leading-[1.0] mb-8 text-white", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: t.hero.headline }),
          /* @__PURE__ */ jsx("span", { className: "text-[#d4af37] font-sans tracking-tight block mt-2", children: t.hero.headlineItalic })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-mono text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl mb-10 border-l-2 border-[#d4af37] pl-6 bg-gradient-to-r from-[#d4af37]/5 to-transparent py-3", children: [
          heroSub,
          /* @__PURE__ */ jsx("span", { className: "inline-block w-2 h-4 bg-[#d4af37] animate-pulse ml-2 align-middle" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-5", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => setPage("contact"), className: "px-8 py-4 bg-[#d4af37] text-slate-950 font-black uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-3 hover:bg-white hover:text-slate-950 transition-all text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]", children: [
            t.hero.ctaPrimary,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setPage("manifesto"), className: "px-8 py-4 border border-white/20 uppercase tracking-[0.15em] font-black rounded-xl text-white hover:bg-white hover:text-slate-950 transition-all text-sm", children: t.hero.ctaSecondary })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:col-span-5", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-950/80 border border-white/10 aspect-[4/5] rounded-[2rem] relative overflow-hidden group shadow-2xl shadow-black/50", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#d4af37]/5 mix-blend-color z-10 group-hover:bg-transparent transition-all duration-1000" }),
        /* @__PURE__ */ jsx(StrategicIntelligenceMap, {}),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-8 left-8 space-y-2 z-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-slate-300 tracking-wider", children: [
            "OSINT_STREAM: ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "25s" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-slate-300 tracking-wider", children: [
            "ACTIVE_CORRELATIONS: ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "54" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-slate-300 tracking-wider", children: [
            "LAT: ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "48.8566" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-mono text-[10px] text-slate-300 tracking-wider", children: [
            "LON: ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "2.3522" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-8 space-y-4 z-20", children: t.hero.labels.map((l, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]" }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-white font-black", children: l })
        ] }, i)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-24 md:py-32 px-6 relative overflow-hidden bg-[#0d0d0b] border-b border-white/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-grid-tactical opacity-10" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto relative z-10 text-left", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-2 max-w-xl text-white", style: { fontFamily: "'Playfair Display', serif" }, children: caseT.subtitle }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-8 max-w-xl text-[#d4af37]", style: { fontFamily: "'Playfair Display', serif" }, children: caseT.title }),
        /* @__PURE__ */ jsx("p", { className: "font-serif text-lg md:text-xl italic text-slate-500 mb-16 max-w-2xl", style: { fontFamily: "'Playfair Display', serif" }, children: caseT.intro }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50", children: caseT.cells.map((cell, idx) => /* @__PURE__ */ jsxs("div", { className: `p-10 md:p-14 flex flex-col gap-6 transition-all duration-700 hover:bg-white/[0.03] group ${cell.accent ? "bg-white/[0.02]" : "bg-[#0d0d0b]"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: `w-1 h-4 ${cell.accent ? "bg-[#d4af37]" : "bg-white/20"}` }),
            /* @__PURE__ */ jsx("p", { className: `font-mono text-[10px] tracking-[0.2em] uppercase font-black ${cell.accent ? "text-[#d4af37]" : "text-white/40"}`, children: cell.label })
          ] }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `font-sans text-lg md:text-xl leading-relaxed font-medium transition-colors ${cell.accent ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`,
              dangerouslySetInnerHTML: { __html: cell.body }
            }
          )
        ] }, idx)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-col md:flex-row items-stretch gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50", children: [
          /* @__PURE__ */ jsx("div", { className: "p-10 md:p-14 bg-[#0d0d0b] flex-1 flex items-center italic", children: /* @__PURE__ */ jsx("p", { className: "font-serif text-xl md:text-2xl text-white/40 leading-relaxed italic", style: { fontFamily: "'Playfair Display', serif" }, children: caseT.quote }) }),
          /* @__PURE__ */ jsx("div", { className: "p-10 md:p-14 bg-white/[0.02] flex-1 flex items-center", children: /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl md:text-3xl font-bold text-[#d4af37] leading-tight max-w-[280px]", style: { fontFamily: "'Playfair Display', serif" }, children: caseT.answer }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden border-y border-white/10 group", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            className: "w-full h-full object-cover filter brightness-50 contrast-125 grayscale",
            children: /* @__PURE__ */ jsx("source", { src: "https://player.vimeo.com/external/538749842.hd.mp4?s=12643a6c117e3f8a4f9103e3347514125f4836f6&profile_id=174", type: "video/mp4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/90 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-80" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-transparent to-slate-950 opacity-80" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none opacity-20", children: Array.from({ length: 10 }).map((_, idx) => /* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-white animate-pulse", style: { marginTop: `${idx * 10}%`, animationDelay: `${idx * 0.2}s` } }, idx)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 sticky top-32 glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl bg-slate-950/60 backdrop-blur-xl", children: [
          /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.visionSection.subtitle, title: t.visionSection.title }),
          /* @__PURE__ */ jsx("p", { className: "text-white font-mono text-base leading-relaxed border-l-2 border-[#d4af37] pl-6 py-2 opacity-100", children: t.visionSection.body })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 space-y-8", children: t.visionSection.pillars.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-10 md:p-12 rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/40 transition-all group/pillar relative overflow-hidden flex flex-col sm:flex-row gap-8 items-start bg-slate-950/60 backdrop-blur-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover/pillar:opacity-100 transition-opacity" }),
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 shrink-0 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center rounded-2xl relative z-10 group-hover/pillar:bg-[#d4af37] group-hover/pillar:text-slate-950 transition-colors duration-500", children: i === 0 ? /* @__PURE__ */ jsx(Shield, { size: 28 }) : i === 1 ? /* @__PURE__ */ jsx(Target, { size: 28 }) : /* @__PURE__ */ jsx(Zap, { size: 28 }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-3xl font-sans tracking-tight text-white mb-4 font-bold group-hover/pillar:text-[#d4af37] transition-colors", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-200 font-mono text-[15px] font-medium leading-relaxed opacity-100", children: p.desc })
          ] })
        ] }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 px-6 relative overflow-hidden border-b border-white/10 bg-black/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-end justify-between gap-12 mb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsx(SectionHeading, { subtitle: intelT.subtitle, title: intelT.title, mono: true }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl md:text-2xl font-sans tracking-tight text-white leading-tight font-bold mb-6", children: [
            intelT.story.split(". ")[0],
            ". ",
            intelT.story.split(". ")[1],
            "."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm md:text-md font-mono text-slate-400 leading-relaxed opacity-80 font-black max-w-xl", children: intelT.story.split(". ").slice(2).join(". ") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-[#d4af37] hidden lg:block mb-4" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: intelT.layers.map((layer, i) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-8 rounded-[2rem] border-white/5 relative group hover:bg-white/[0.02] transition-all duration-500 flex flex-col h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-3xl font-black text-white/5 group-hover:text-white/10 transition-colors", children: (i + 1).toString().padStart(2, "0") }),
          /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${layer.dot} ${layer.shadow}` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#d4af37] font-mono text-[9px] uppercase font-black tracking-[0.2em] mb-2 opacity-60", children: layer.subtitle }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-sans font-bold text-white tracking-tight leading-tight", children: layer.title })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-auto pt-6 border-t border-white/5", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-mono text-[13px] leading-relaxed font-medium", children: layer.desc }) })
      ] }, layer.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 glass-panel py-8 px-12 rounded-2xl border-white/5 flex flex-col items-center justify-center relative overflow-hidden group max-w-xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsx(Zap, { size: 18, className: "text-emerald-500 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-[1px] w-8 bg-white/10" }),
          /* @__PURE__ */ jsx(Zap, { size: 18, className: "text-amber-600 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsx("h4", { className: "text-white font-mono text-[13px] uppercase tracking-[0.4em] font-black", children: intelT.synthesis })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 md:py-48 px-6 bg-black relative overflow-hidden border-b border-white/10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsx(SectionHeading, { subtitle: solutionsT.subtitle, title: solutionsT.title }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-2 w-full mt-24", children: [
          /* @__PURE__ */ jsx("div", { className: "p-8 md:p-14 lg:border-r border-white/10 relative group", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4 py-2 px-5 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-full", children: [
                /* @__PURE__ */ jsx(Briefcase, { size: 20, className: "text-[#d4af37]" }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase font-black tracking-[0.3em] text-[#d4af37]", children: servicesT.subtitle || "Mandates" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-sans tracking-tight text-white font-bold leading-none", children: servicesT.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-mono text-[15px] leading-relaxed max-w-md border-l border-[#d4af37]/30 pl-6 py-2", children: servicesT.intro })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6 mt-4", children: servicesT.items.slice(0, 3).map((item, i) => /* @__PURE__ */ jsxs("div", { className: "group/item relative overflow-hidden p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-[#d4af37]/30 group-hover/item:bg-[#d4af37] transition-colors" }),
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-sans tracking-tight text-white mb-2 font-bold transition-colors", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-mono text-[13px] font-medium leading-relaxed opacity-80", children: item.desc })
            ] }, i)) }),
            /* @__PURE__ */ jsx("div", { className: "pt-8", children: /* @__PURE__ */ jsxs("button", { onClick: () => setPage("services"), className: "flex items-center gap-4 font-mono text-[11px] uppercase font-black text-[#d4af37] tracking-[0.4em] hover:gap-8 transition-all", children: [
              servicesT.cta,
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "p-8 md:p-14 relative group", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4 py-2 px-5 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-full", children: [
                /* @__PURE__ */ jsx(GraduationCap, { size: 20, className: "text-[#d4af37]" }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase font-black tracking-[0.3em] text-[#d4af37]", children: educationT.subtitle })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-4xl md:text-5xl font-sans tracking-tight text-white font-bold leading-none", children: educationT.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-mono text-[15px] leading-relaxed max-w-md border-l border-[#d4af37]/30 pl-6 py-2", children: educationT.intro })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6 mt-4", children: educationT.offers.map((offer, i) => /* @__PURE__ */ jsxs("div", { className: "group/item relative overflow-hidden p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 h-full", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-[#d4af37]/30 group-hover/item:bg-[#d4af37] transition-colors" }),
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-sans tracking-tight text-white mb-2 font-bold transition-colors", children: offer.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-mono text-[13px] font-medium leading-relaxed opacity-80", children: offer.desc })
            ] }, i)) }),
            /* @__PURE__ */ jsx("div", { className: "pt-8", children: /* @__PURE__ */ jsxs("button", { onClick: () => setPage("education"), className: "flex items-center gap-4 font-mono text-[11px] uppercase font-black text-[#d4af37] tracking-[0.4em] hover:gap-8 transition-all", children: [
              educationT.cta,
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
            ] }) })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden bg-black/60 border-b border-white/5 font-mono", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.domains.subtitle, title: t.domains.title }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mb-20 p-8 md:p-12 glass-panel border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-[2.5rem] relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#d4af37]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" }),
          /* @__PURE__ */ jsx("p", { className: "text-white font-serif text-xl md:text-2xl leading-relaxed border-l-4 border-[#d4af37] pl-8 italic", style: { fontFamily: "'Playfair Display', serif" }, children: t.domains.intro })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8", children: t.domains.items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-8 rounded-3xl border-white/5 group hover:border-[#d4af37]/30 transition-all bg-slate-900/20 hover:bg-slate-900/40 flex flex-col items-center text-center gap-6 shadow-xl shadow-black/20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-slate-950 transition-all duration-500", children: item.icon }),
          /* @__PURE__ */ jsx("h3", { className: "font-sans text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors", children: item.title })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden bg-white border-b border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHeading, { subtitle: foundryT.subtitle, title: foundryT.title, theme: "light" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mb-20", children: /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-sans tracking-tight text-slate-900 leading-relaxed font-medium", children: foundryT.intro }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20", children: AI_PROJECTS.slice(0, 4).map((project) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => setPage("foundry"),
          className: "bg-slate-50 group p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity", children: /* @__PURE__ */ jsx(Cpu, { size: 80, className: "text-slate-900" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-sans tracking-tight text-slate-950 font-bold group-hover:text-[#d4af37] transition-colors", children: project.name }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[8px] px-2 py-0.5 border border-amber-200 bg-amber-50 text-[#8c7324] rounded font-black tracking-widest", children: project.status })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-slate-800 font-mono text-[14px] font-bold leading-relaxed mb-6 opacity-100", children: [
                project.description[lang].slice(0, 100),
                "..."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-slate-200/50 pt-6", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: project.tech.slice(0, 2).map((t2) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-slate-200/40 rounded font-mono text-[8px] uppercase font-black text-slate-800", children: t2 }, t2)) }),
              /* @__PURE__ */ jsx("div", { className: "text-[#d4af37] group-hover:translate-x-2 transition-transform", children: /* @__PURE__ */ jsx(ArrowRight, { size: 20 }) })
            ] })
          ]
        },
        project.id
      )) }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setPage("foundry"),
          className: "group flex items-center gap-4 font-mono text-[11px] uppercase font-black text-[#d4af37] tracking-[0.3em]",
          children: [
            foundryT.previewCta,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "group-hover:translate-x-3 transition-transform" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6 bg-black/80", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHeading, { subtitle: briefingsT.subtitle, title: briefingsT.title }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: ARTICLES.map((article) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => setPage(`briefings/${article.id}`),
          className: "glass-panel group cursor-pointer overflow-hidden rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/30 transition-all duration-500 bg-white/[0.02] shadow-xl hover:shadow-[#d4af37]/10",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "aspect-[16/9] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out", children: [
              /* @__PURE__ */ jsx("img", { src: article.imageUrl, className: "w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 img-tactical-gold", alt: article.title[lang] }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-2 border-transparent group-hover:border-[#d4af37]/30 transition-all duration-500 z-20 pointer-events-none" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest text-[#d4af37] font-black", children: article.category[lang] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-100 font-mono text-[14px] uppercase font-bold", children: [
                  /* @__PURE__ */ jsx(Timer, { size: 12 }),
                  " ",
                  article.readTime[lang]
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-sans tracking-tight text-white mb-6 font-bold group-hover:text-[#d4af37] transition-colors duration-500", children: article.title[lang] }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-100 font-mono text-[14px] font-bold leading-relaxed opacity-100 mb-8", children: article.excerpt[lang] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#d4af37] font-mono text-[11px] uppercase font-bold tracking-widest group-hover:gap-5 transition-all", children: [
                "Read Report ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
              ] })
            ] })
          ]
        },
        article.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.teamSection.subtitle, title: t.teamSection.title }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: t.teamSection.members.map((m, i) => /* @__PURE__ */ jsx(ParallaxMemberCard, { member: m }, i)) })
    ] }) })
  ] });
};
const ArticleDetailView = ({ lang, articleId, setPage }) => {
  const article = ARTICLES.find((a) => a.id === articleId);
  UI_TEXT[lang].briefingsPage;
  if (!article) return /* @__PURE__ */ jsx("div", { className: "pt-56 text-center text-white", children: "Report not found." });
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-700", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setPage("home"),
        className: "flex items-center gap-3 font-mono text-[11px] uppercase font-bold text-[#d4af37] mb-16 hover:gap-5 transition-all",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 14 }),
          " Return home"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-8 font-mono text-[11px] uppercase font-bold text-slate-300", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[#d4af37]", children: article.category[lang] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar, { size: 12 }),
          " ",
          article.date[lang]
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Timer, { size: 12 }),
          " ",
          article.readTime[lang]
        ] })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-sans tracking-tight text-white font-bold leading-tight mb-12", children: article.title[lang] }),
      /* @__PURE__ */ jsxs("div", { className: "aspect-video rounded-[3rem] overflow-hidden grayscale brightness-75 mb-16 border border-white/10 shadow-2xl relative", children: [
        /* @__PURE__ */ jsx("img", { src: article.imageUrl, className: "w-full h-full object-cover", alt: article.title[lang] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: article.content[lang].map((para, i) => /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-200 leading-relaxed font-sans opacity-90", children: para }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] border-l-4 border-[#d4af37] bg-[#d4af37]/5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase font-black tracking-widest text-[#d4af37] mb-6 italic opacity-80", children: "Transmission Summary" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-sm leading-relaxed font-black", children: "Strategic autonomy requires a decoupling from foreign dependencies. This report maps the transition towards sovereign agentic systems as the primary mode of operational security." })
    ] })
  ] }) });
};
const ManifestoView = ({ lang }) => {
  const t = UI_TEXT[lang].manifestoPage;
  const arch = t.intelligenceArchitecture;
  return /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in duration-1000", children: [
    /* @__PURE__ */ jsx("section", { className: "pt-56 pb-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[#d4af37] font-sans text-3xl tracking-tight mb-16 font-bold", children: t.discernment }),
        /* @__PURE__ */ jsx("div", { className: "space-y-12 mb-20", children: t.points.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-8 group", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-[#d4af37] text-5xl italic font-black opacity-40 group-hover:opacity-100 transition-all duration-500", children: [
            "0",
            i + 1
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-100 text-xl leading-relaxed pt-2 font-medium", children: p })
        ] }, i)) }),
        /* @__PURE__ */ jsx("div", { className: "p-12 glass-panel border-l-4 border-[#d4af37] font-mono text-[13px] tracking-widest text-slate-200 leading-[1.8] italic rounded-r-3xl font-black bg-[#d4af37]/5", children: t.militarization })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxs("div", { className: "aspect-[4/5] glass-panel p-2 border-white/20 overflow-hidden relative rounded-[3rem] shadow-2xl", children: [
        /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000", className: "w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 animate-breath", alt: "Tactical Port Nodes" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/40 mix-blend-multiply group-hover:opacity-0 transition-opacity" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-80" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-mono text-4xl md:text-7xl leading-tight mb-20 text-white tracking-tight uppercase", children: arch.title }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass-panel p-10 md:p-14 rounded-[3.5rem] border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent relative group overflow-hidden animate-scan", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[10px] break-all select-none overflow-hidden", children: Array.from({ length: 60 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: `inline-block mx-1 ${i % 3 === 0 ? "animate-pulse text-[#d4af37]" : "text-white"}`, style: { animationDelay: `${i * 0.05}s` }, children: [
            Math.random() > 0.5 ? "0" : "1",
            Math.random() > 0.5 ? "1" : "0",
            Math.random() > 0.5 ? "0" : "1",
            Math.random() > 0.5 ? "1" : "1"
          ] }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-12 relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] rounded-2xl shadow-xl shadow-[#d4af37]/20 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-700 bg-black/40 group-hover:bg-[#d4af37]/10", children: /* @__PURE__ */ jsx(Cpu, { size: 32, className: "group-hover:animate-pulse group-hover:scale-110" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-4xl font-sans tracking-tight text-white font-bold group-hover:translate-x-2 transition-transform duration-500", children: arch.aiTitle })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[13px] text-slate-100 font-bold tracking-widest mb-16 relative z-10 group-hover:text-[#d4af37] transition-colors", children: arch.aiDescription }),
          /* @__PURE__ */ jsx("div", { className: "space-y-12 relative z-10", children: arch.aiItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start group/item", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 glass-panel border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] rounded-2xl group-hover/item:bg-[#d4af37] group-hover/item:text-slate-950 group-hover/item:rotate-[12deg] group-hover/item:scale-110 group-hover/item:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 cursor-pointer", children: React.cloneElement(item.icon, { className: "group-hover/item:animate-spin-slow" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-sans tracking-tight text-white mb-3 font-bold group-hover/item:text-[#d4af37] transition-colors flex items-center gap-3", children: [
                item.title,
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#d4af37] rounded-full group-hover/item:animate-ping shadow-[0_0_8px_#d4af37]" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden group/text", children: [
                /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs tracking-tight font-bold leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity", children: item.desc }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent -translate-x-[200%] group-hover/item:animate-[scan-shimmer_1.5s_infinite] pointer-events-none" }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-0 bottom-0 w-full h-[1px] bg-white/10 group-hover/item:bg-[#d4af37]/40 transition-colors" })
              ] })
            ] })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-panel p-10 md:p-14 rounded-[3.5rem] border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent relative group overflow-hidden animate-aura", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-12 relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-blue-400 flex items-center justify-center text-blue-400 rounded-2xl shadow-xl shadow-blue-500/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 bg-black/40", children: /* @__PURE__ */ jsx(Anchor, { size: 32, className: "group-hover:animate-bounce" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-4xl font-sans tracking-tight text-white font-bold", children: arch.humanTitle })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[13px] text-slate-100 font-bold tracking-widest mb-16 relative z-10", children: arch.humanDescription }),
          /* @__PURE__ */ jsx("div", { className: "space-y-12 relative z-10", children: arch.humanItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start group/item", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 glass-panel border-blue-400/40 flex items-center justify-center text-blue-400 rounded-2xl group-hover/item:bg-blue-400 group-hover/item:text-slate-950 group-hover/item:animate-subtle-bounce transition-all duration-300", children: item.icon }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-2xl font-sans tracking-tight text-white mb-3 font-bold group-hover/item:text-blue-400 transition-colors", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs tracking-tight font-bold leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity", children: item.desc })
            ] })
          ] }, idx)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden border-y border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(SectionHeading, { subtitle: "The Mythos", title: t.whyPrometheusTitle, mono: true }),
      /* @__PURE__ */ jsx("p", { className: "text-[#d4af37] text-2xl font-sans tracking-tight mb-10 font-bold", children: t.whyPrometheusIntro }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: t.howItInspires.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "p-12 glass-panel border-white/10 group hover:border-[#d4af37]/60 transition-all rounded-[2.5rem] bg-white/[0.04] shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 flex items-center justify-center text-slate-950 mb-10 bg-[#d4af37] rounded-2xl shadow-xl shadow-[#d4af37]/20", children: i === 0 ? /* @__PURE__ */ jsx(Radio, { size: 28 }) : i === 1 ? /* @__PURE__ */ jsx(Compass, { size: 28 }) : i === 2 ? /* @__PURE__ */ jsx(ZapOff, { size: 28 }) : /* @__PURE__ */ jsx(Scale, { size: 28 }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-2xl font-sans tracking-tight mb-6 text-white group-hover:text-[#d4af37] transition-colors font-bold", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-100 font-mono text-[13px] tracking-wider leading-relaxed font-bold opacity-90", children: item.desc })
      ] }, i)) })
    ] }) })
  ] });
};
const ServicesView = ({ lang }) => {
  const t = UI_TEXT[lang].servicesPage;
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-mono font-black mb-20", children: t.intro }),
    /* @__PURE__ */ jsx("div", { className: "space-y-12", children: t.items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-12 gap-12 border-white/10 bg-white/[0.01]", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-1 text-[#d4af37]", children: item.icon }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-sans tracking-tight text-white font-bold mb-4", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[#d4af37] font-mono text-xs font-black mb-8", children: item.subtitle }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed font-medium", children: item.desc })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-4 glass-panel bg-white/5 rounded-2xl p-8 border-white/5", children: /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: item.features.map((f, j) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 items-center font-mono text-[11px] font-bold", children: [
        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-[#d4af37] rounded-full" }),
        f
      ] }, j)) }) })
    ] }, i)) })
  ] }) });
};
const ExecutiveEducationView = ({ lang }) => {
  const t = UI_TEXT[lang].educationPage;
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-mono font-black mb-20", children: t.intro }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: t.offers.map((offer) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/30 transition-all bg-white/[0.02]", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[#d4af37] mb-8", children: offer.icon }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-sans tracking-tight text-white font-bold mb-6", children: offer.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs font-black mb-10 opacity-80", children: offer.desc }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 pt-8 border-t border-white/10", children: offer.details.map((d, i) => /* @__PURE__ */ jsxs("p", { className: "font-mono text-[11px] font-bold text-slate-300", children: [
        "• ",
        d
      ] }, i)) })
    ] }, offer.id)) })
  ] }) });
};
const ContactView = ({ lang }) => {
  const t = UI_TEXT[lang].contactPage;
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const errors = {
    name: formData.name.trim().length < 2 ? "Name must be at least 2 characters." : null,
    email: !validateEmail(formData.email) ? "Please enter a valid email address." : null,
    message: formData.message.trim().length < 10 ? "Message must be at least 10 characters." : null
  };
  const isFormValid = !errors.name && !errors.email && !errors.message;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const subject = encodeURIComponent(`Contact Request from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`);
      window.location.href = `mailto:thomas@skilmi.fr?subject=${subject}&body=${body}`;
      setSuccess(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
    /* @__PURE__ */ jsx("div", { className: "glass-panel p-12 rounded-[2.5rem]", children: success ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20 animate-in zoom-in", children: [
      /* @__PURE__ */ jsx(CircleCheck, { size: 64, className: "text-[#d4af37] mx-auto mb-10" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-sans tracking-tight text-white font-bold mb-4", children: "Transmission Successful" }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-slate-300 font-black", children: t.labels.success })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8 text-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("label", { className: "font-mono text-[10px] text-[#d4af37] font-black uppercase", children: t.labels.name }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "name",
                value: formData.name,
                onChange: handleChange,
                onBlur: handleBlur,
                className: `w-full bg-black/40 border-2 p-5 rounded-2xl outline-none transition-colors pr-12 ${touched.name && errors.name ? "border-red-500/50 focus:border-red-500" : touched.name && !errors.name ? "border-emerald-500/50 focus:border-emerald-500" : "border-white/10 focus:border-[#d4af37]"}`
              }
            ),
            touched.name && !errors.name && /* @__PURE__ */ jsx(CircleCheck, { size: 18, className: "absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" })
          ] }),
          touched.name && errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-400 font-mono text-[10px] uppercase tracking-wider", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("label", { className: "font-mono text-[10px] text-[#d4af37] font-black uppercase", children: t.labels.email }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                onBlur: handleBlur,
                className: `w-full bg-black/40 border-2 p-5 rounded-2xl outline-none transition-colors pr-12 ${touched.email && errors.email ? "border-red-500/50 focus:border-red-500" : touched.email && !errors.email ? "border-emerald-500/50 focus:border-emerald-500" : "border-white/10 focus:border-[#d4af37]"}`
              }
            ),
            touched.email && !errors.email && /* @__PURE__ */ jsx(CircleCheck, { size: 18, className: "absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" })
          ] }),
          touched.email && errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-400 font-mono text-[10px] uppercase tracking-wider", children: errors.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("label", { className: "font-mono text-[10px] text-[#d4af37] font-black uppercase", children: t.labels.message }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 5,
              name: "message",
              value: formData.message,
              onChange: handleChange,
              onBlur: handleBlur,
              className: `w-full bg-black/40 border-2 p-5 rounded-2xl outline-none resize-none transition-colors pr-12 ${touched.message && errors.message ? "border-red-500/50 focus:border-red-500" : touched.message && !errors.message ? "border-emerald-500/50 focus:border-emerald-500" : "border-white/10 focus:border-[#d4af37]"}`
            }
          ),
          touched.message && !errors.message && /* @__PURE__ */ jsx(CircleCheck, { size: 18, className: "absolute right-5 top-6 text-emerald-500" })
        ] }),
        touched.message && errors.message && /* @__PURE__ */ jsx("p", { className: "text-red-400 font-mono text-[10px] uppercase tracking-wider", children: errors.message })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: !isFormValid,
          className: `w-full py-6 font-black uppercase tracking-[0.4em] rounded-2xl transition-all ${isFormValid ? "bg-[#d4af37] text-slate-950 hover:bg-white cursor-pointer" : "bg-white/5 text-slate-500 cursor-not-allowed"}`,
          children: t.labels.submit
        }
      )
    ] }) })
  ] }) });
};
const App = () => {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const t = UI_TEXT[lang];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  const getBgColor = () => {
    switch (page) {
      case "services":
        return "bg-gradient-to-br from-[#060b1e] via-[#030510] to-[#010205]";
      // Distinct Midnight Command Navy for Advisory
      case "education":
        return "bg-gradient-to-br from-[#120e0c] via-[#0a0705] to-[#050302]";
      // Distinct Walnut Antique Charcoal for Education
      case "foundry":
        return "bg-slate-50";
      // Keep flat for light mode readability
      case "manifesto":
        return "bg-gradient-to-br from-[#0a0c10] via-[#030406] to-[#000000]";
      // Pure Obsidian for Briefing/Manifesto
      case "use-case-taiwan":
        return "bg-gradient-to-br from-[#1a0a0a] via-[#080404] to-[#000000]";
      // Deep Kinetic Red for Taiwan Scenario
      case "contact":
        return "bg-gradient-to-br from-[#111111] via-[#080808] to-[#000000]";
      // Neutral Deep Black for Contact
      default:
        return "bg-gradient-to-br from-[#0a0c10] via-[#030406] to-[#000000]";
    }
  };
  const renderContent = () => {
    if (page === "home") return /* @__PURE__ */ jsx(LandingView, { lang, setPage, t });
    if (page === "manifesto") return /* @__PURE__ */ jsx(ManifestoView, { lang });
    if (page === "services") return /* @__PURE__ */ jsx(ServicesView, { lang });
    if (page === "education") return /* @__PURE__ */ jsx(ExecutiveEducationView, { lang });
    if (page === "foundry") return /* @__PURE__ */ jsx(FoundryView, { lang });
    if (page === "use-case-taiwan") return /* @__PURE__ */ jsx(UseCaseTaiwanView, { lang });
    if (page === "contact") return /* @__PURE__ */ jsx(ContactView, { lang });
    if (page.startsWith("briefings/")) {
      const id = page.split("/")[1];
      return /* @__PURE__ */ jsx(ArticleDetailView, { lang, articleId: id, setPage });
    }
    return /* @__PURE__ */ jsx(LandingView, { lang, setPage, t });
  };
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen ${getBgColor()} bg-fixed ${page === "foundry" ? "text-slate-900" : "text-slate-100"} selection:bg-[#d4af37] selection:text-slate-950 transition-colors duration-[1200ms] ease-in-out`, children: [
    /* @__PURE__ */ jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsx(Navbar, { lang, setLang, page, setPage }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10", children: [
      renderContent(),
      /* @__PURE__ */ jsxs("section", { className: `py-56 bg-[#d4af37] text-slate-950 px-6 text-center transition-all duration-700`, children: [
        /* @__PURE__ */ jsx("h2", { className: "font-sans tracking-tight text-6xl md:text-8xl mb-16 font-bold", children: "Recover the Lead." }),
        /* @__PURE__ */ jsx("button", { onClick: () => setPage("contact"), className: "px-16 py-6 bg-slate-950 text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-105 transition-all", children: "Establish Session" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: `py-20 border-t border-white/10 px-6 bg-black/80 transition-all duration-700`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrometheusIcon, { className: "w-8 h-8 text-[#d4af37]" }),
        /* @__PURE__ */ jsx("span", { className: "font-sans text-2xl font-bold text-white", children: "Prometheus Advisory" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-10 font-mono text-[10px] uppercase font-bold text-slate-300", children: [
        /* @__PURE__ */ jsx("button", { className: "hover:text-[#d4af37]", children: "Protocols" }),
        /* @__PURE__ */ jsx("button", { className: "hover:text-[#d4af37]", children: "Data Policy" }),
        /* @__PURE__ */ jsx("button", { className: "hover:text-[#d4af37]", children: "Theory of Action" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-[9px] opacity-40 uppercase font-black", children: "© 2025 PROMETHEUS ADVISORY GROUP" })
    ] }) })
  ] });
};
function render() {
  try {
    const html = renderToString(
      /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
    );
    return { html };
  } catch (error) {
    console.error("SSR Render Error:", error);
    return { html: `<div id="ssr-error">SSR Error occurred: ${error instanceof Error ? error.message : String(error)}</div>` };
  }
}
export {
  render
};
