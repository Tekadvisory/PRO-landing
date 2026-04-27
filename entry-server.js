import { jsx, jsxs } from "react/jsx-runtime";
import * as React3 from "react";
import React3__default, { forwardRef, createElement, useEffect, useState, useRef, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, useScroll, useTransform } from "framer-motion";
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createPath({
  pathname = "/",
  search = "",
  hash = ""
}) {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function matchRoutes(routes, locationArg, basename = "/") {
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(
      branches[i],
      decoded,
      allowPartial
    );
  }
  return matches;
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
  let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
        return;
      }
      invariant(
        meta.relativePath.startsWith(parentPath),
        `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      );
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
      );
      flattenRoutes(
        route.children,
        branches,
        routesMeta,
        path,
        hasParentOptionalSegments
      );
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _a;
    if (route.path === "" || !((_a = route.path) == null ? void 0 : _a.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, true, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(
    ...restExploded.map(
      (subpath) => subpath === "" ? required : [required, subpath].join("/")
    )
  );
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map(
    (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
  );
}
function rankRouteBranches(branches) {
  branches.sort(
    (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
      a.routesMeta.map((meta) => meta.childrenIndex),
      b.routesMeta.map((meta) => meta.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce(
    (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
    initialScore
  );
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
  let { routesMeta } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath(
        {
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        },
        remainingPathname
      );
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([matchedPathname, match.pathnameBase])
      ),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = { path: pattern, caseSensitive: false, end: true };
  }
  let [matcher, compiledParams] = compilePath(
    pattern.path,
    pattern.caseSensitive,
    pattern.end
  );
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce(
    (memo2, { paramName, isOptional }, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index];
      if (isOptional && !value) {
        memo2[paramName] = void 0;
      } else {
        memo2[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo2;
    },
    {}
  );
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive = false, end = true) {
  warning(
    path === "*" || !path.endsWith("*") || path.endsWith("/*"),
    `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
  );
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (match, paramName, isOptional, index, str) => {
      params.push({ paramName, isOptional: isOptional != null });
      if (isOptional) {
        let nextChar = str.charAt(index + match.length);
        if (nextChar && nextChar !== "/") {
          return "/([^\\/]*)";
        }
        return "(?:/([^\\/]*))?";
      }
      return "/([^\\/]+)";
    }
  ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  if (path.endsWith("*")) {
    params.push({ paramName: "*" });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(
      false,
      `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
    );
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    toPathname = removeDoubleSlashes(toPathname);
    if (toPathname.startsWith("/")) {
      pathname = resolvePathname(toPathname.substring(1), "/");
    } else {
      pathname = resolvePathname(toPathname, fromPathname);
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = removeTrailingSlash(fromPathname).split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
    path
  )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(matches) {
  return matches.filter(
    (match, index) => index === 0 || match.route.path && match.route.path.length > 0
  );
}
function getResolveToMatches(matches) {
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches.map(
    (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
  );
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = { ...toArg };
    invariant(
      !to.pathname || !to.pathname.includes("?"),
      getInvalidPathError("?", "pathname", "search", to)
    );
    invariant(
      !to.pathname || !to.pathname.includes("#"),
      getInvalidPathError("#", "pathname", "hash", to)
    );
    invariant(
      !to.search || !to.search.includes("#"),
      getInvalidPathError("#", "search", "hash", to)
    );
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var removeDoubleSlashes = (path) => path.replace(/\/\/+/g, "/");
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
var removeTrailingSlash = (path) => path.replace(/\/+$/, "");
var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var ErrorResponseImpl = class {
  constructor(status, statusText, data2, internal = false) {
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data2 instanceof Error) {
      this.data = data2.toString();
      this.error = data2;
    } else {
      this.data = data2;
    }
  }
};
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
function getRoutePattern(matches) {
  let parts = matches.map((m) => m.route.path).filter(Boolean);
  return joinPaths(parts) || "/";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function parseToInfo(_to, basename) {
  let to = _to;
  if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
    return {
      absoluteURL: void 0,
      isExternal: false,
      to
    };
  }
  let absoluteURL = to;
  let isExternal = false;
  if (isBrowser) {
    try {
      let currentUrl = new URL(window.location.href);
      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
      let path = stripBasename(targetUrl.pathname, basename);
      if (targetUrl.origin === currentUrl.origin && path != null) {
        to = path + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } catch (e) {
      warning(
        false,
        `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  }
  return {
    absoluteURL,
    isExternal,
    to
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
new Set(validRequestMethodsArr);
var DataRouterContext = React3.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = React3.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var RSCRouterContext = React3.createContext(false);
function useIsRSCRouterContext() {
  return React3.useContext(RSCRouterContext);
}
var ViewTransitionContext = React3.createContext({
  isTransitioning: false
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = React3.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = React3.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = React3.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = React3.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = React3.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
RouteContext.displayName = "Route";
var RouteErrorContext = React3.createContext(null);
RouteErrorContext.displayName = "RouteError";
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
var ERROR_DIGEST_REDIRECT = "REDIRECT";
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
function decodeRedirectErrorDigest(digest) {
  if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
    try {
      let parsed = JSON.parse(digest.slice(28));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
        return parsed;
      }
    } catch {
    }
  }
}
function decodeRouteErrorResponseDigest(digest) {
  if (digest.startsWith(
    `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
  )) {
    try {
      let parsed = JSON.parse(digest.slice(40));
      if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
        return new ErrorResponseImpl(
          parsed.status,
          parsed.statusText,
          parsed.data
        );
      }
    } catch {
    }
  }
}
function useHref(to, { relative } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useHref() may be used only in the context of a <Router> component.`
  );
  let { basename, navigator } = React3.useContext(NavigationContext);
  let { hash, pathname, search } = useResolvedPath(to, { relative });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({ pathname: joinedPathname, search, hash });
}
function useInRouterContext() {
  return React3.useContext(LocationContext) != null;
}
function useLocation() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useLocation() may be used only in the context of a <Router> component.`
  );
  return React3.useContext(LocationContext).location;
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React3.useContext(NavigationContext).static;
  if (!isStatic) {
    React3.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let { isDataRoute } = React3.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useNavigate() may be used only in the context of a <Router> component.`
  );
  let dataRouterContext = React3.useContext(DataRouterContext);
  let { basename, navigator } = React3.useContext(NavigationContext);
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  let activeRef = React3.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React3.useCallback(
    (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        options.relative === "path"
      );
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      (!!options.replace ? navigator.replace : navigator.push)(
        path,
        options.state,
        options
      );
    },
    [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]
  );
  return navigate;
}
React3.createContext(null);
function useParams() {
  let { matches } = React3.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return (routeMatch == null ? void 0 : routeMatch.params) ?? {};
}
function useResolvedPath(to, { relative } = {}) {
  let { matches } = React3.useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
  return React3.useMemo(
    () => resolveTo(
      to,
      JSON.parse(routePathnamesJson),
      locationPathname,
      relative === "path"
    ),
    [to, routePathnamesJson, locationPathname, relative]
  );
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
  var _a;
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    `useRoutes() may be used only in the context of a <Router> component.`
  );
  let { navigator } = React3.useContext(NavigationContext);
  let { matches: parentMatches } = React3.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(
      parentPathname,
      !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
    );
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    invariant(
      parentPathnameBase === "/" || ((_a = parsedLocationArg.pathname) == null ? void 0 : _a.startsWith(parentPathnameBase)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
    );
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, { pathname: remainingPathname });
  {
    warning(
      parentRoute || matches != null,
      `No routes matched location "${location.pathname}${location.search}${location.hash}" `
    );
    warning(
      matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  }
  let renderedMatches = _renderMatches(
    matches && matches.map(
      (match) => Object.assign({}, match, {
        params: Object.assign({}, parentParams, match.params),
        pathname: joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes.
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathname
        ]),
        pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
          parentPathnameBase,
          // Re-encode pathnames that were decoded inside matchRoutes
          // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
          // `new URL()` internally and we need to prevent it from treating
          // them as separators
          navigator.encodeLocation ? navigator.encodeLocation(
            match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
          ).pathname : match.pathnameBase
        ])
      })
    ),
    parentMatches,
    dataRouterOpts
  );
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ React3.createElement(
      LocationContext.Provider,
      {
        value: {
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            unstable_mask: void 0,
            ...location
          },
          navigationType: "POP"
          /* Pop */
        }
      },
      renderedMatches
    );
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
  let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
  let devInfo = null;
  {
    console.error(
      "Error handled by React Router default ErrorBoundary:",
      error
    );
    devInfo = /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ React3.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React3.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React3.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React3.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ React3.createElement("pre", { style: preStyles }, stack) : null, devInfo);
}
var defaultErrorElement = /* @__PURE__ */ React3.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends React3.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "React Router caught the following error during render",
        error
      );
    }
  }
  render() {
    let error = this.state.error;
    if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      const decoded = decodeRouteErrorResponseDigest(error.digest);
      if (decoded) error = decoded;
    }
    let result = error !== void 0 ? /* @__PURE__ */ React3.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React3.createElement(
      RouteErrorContext.Provider,
      {
        value: error,
        children: this.props.component
      }
    )) : this.props.children;
    if (this.context) {
      return /* @__PURE__ */ React3.createElement(RSCErrorHandler, { error }, result);
    }
    return result;
  }
};
RenderErrorBoundary.contextType = RSCRouterContext;
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
function RSCErrorHandler({
  children,
  error
}) {
  let { basename } = React3.useContext(NavigationContext);
  if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
    let redirect2 = decodeRedirectErrorDigest(error.digest);
    if (redirect2) {
      let existingRedirect = errorRedirectHandledMap.get(error);
      if (existingRedirect) throw existingRedirect;
      let parsed = parseToInfo(redirect2.location, basename);
      if (isBrowser && !errorRedirectHandledMap.get(error)) {
        if (parsed.isExternal || redirect2.reloadDocument) {
          window.location.href = parsed.absoluteURL || parsed.to;
        } else {
          const redirectPromise = Promise.resolve().then(
            () => window.__reactRouterDataRouter.navigate(parsed.to, {
              replace: redirect2.replace
            })
          );
          errorRedirectHandledMap.set(error, redirectPromise);
          throw redirectPromise;
        }
      }
      return /* @__PURE__ */ React3.createElement(
        "meta",
        {
          httpEquiv: "refresh",
          content: `0;url=${parsed.absoluteURL || parsed.to}`
        }
      );
    }
  }
  return children;
}
function RenderedRoute({ routeContext, match, children }) {
  let dataRouterContext = React3.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ React3.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
  let dataRouterState = dataRouterOpts == null ? void 0 : dataRouterOpts.state;
  if (matches == null) {
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(
      (m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0
    );
    invariant(
      errorIndex >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        errors
      ).join(",")}`
    );
    renderedMatches = renderedMatches.slice(
      0,
      Math.min(renderedMatches.length, errorIndex + 1)
    );
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterOpts && dataRouterState) {
    renderFallback = dataRouterState.renderFallback;
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let { loaderData, errors: errors2 } = dataRouterState;
        let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          if (dataRouterOpts.isStatic) {
            renderFallback = true;
          }
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  let onErrorHandler = dataRouterOpts == null ? void 0 : dataRouterOpts.onError;
  let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
    var _a, _b;
    onErrorHandler(error, {
      location: dataRouterState.location,
      params: ((_b = (_a = dataRouterState.matches) == null ? void 0 : _a[0]) == null ? void 0 : _b.params) ?? {},
      unstable_pattern: getRoutePattern(dataRouterState.matches),
      errorInfo
    });
  } : void 0;
  return renderedMatches.reduceRight(
    (outlet, match, index) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index === 0) {
            warningOnce(
              "route-fallback",
              false,
              "No `HydrateFallback` element provided to render during initial hydration"
            );
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = /* @__PURE__ */ React3.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return /* @__PURE__ */ React3.createElement(
          RenderedRoute,
          {
            match,
            routeContext: {
              outlet,
              matches: matches2,
              isDataRoute: dataRouterState != null
            },
            children
          }
        );
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React3.createElement(
        RenderErrorBoundary,
        {
          location: dataRouterState.location,
          revalidation: dataRouterState.revalidation,
          component: errorElement,
          error,
          children: getChildren(),
          routeContext: { outlet: null, matches: matches2, isDataRoute: true },
          onError
        }
      ) : getChildren();
    },
    null
  );
}
function getDataRouterConsoleError(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(hookName) {
  let ctx = React3.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError(hookName));
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React3.useContext(DataRouterStateContext);
  invariant(state, getDataRouterConsoleError(hookName));
  return state;
}
function useRouteContext(hookName) {
  let route = React3.useContext(RouteContext);
  invariant(route, getDataRouterConsoleError(hookName));
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `${hookName} can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  var _a;
  let error = React3.useContext(RouteErrorContext);
  let state = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  );
  let routeId = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  if (error !== void 0) {
    return error;
  }
  return (_a = state.errors) == null ? void 0 : _a[routeId];
}
function useNavigateStable() {
  let { router } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  );
  let id = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  );
  let activeRef = React3.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React3.useCallback(
    async (to, options = {}) => {
      warning(activeRef.current, navigateEffectWarning);
      if (!activeRef.current) return;
      if (typeof to === "number") {
        await router.navigate(to);
      } else {
        await router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );
  return navigate;
}
var alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
    warning(false, message);
  }
}
React3.memo(DataRoutes);
function DataRoutes({
  routes,
  future,
  state,
  isStatic,
  onError
}) {
  return useRoutesImpl(routes, void 0, { state, isStatic, onError });
}
function Route(props) {
  invariant(
    false,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`
  );
}
function Router({
  basename: basenameProp = "/",
  children = null,
  location: locationProp,
  navigationType = "POP",
  navigator,
  static: staticProp = false,
  unstable_useTransitions
}) {
  invariant(
    !useInRouterContext(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
  );
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = React3.useMemo(
    () => ({
      basename,
      navigator,
      static: staticProp,
      unstable_useTransitions,
      future: {}
    }),
    [basename, navigator, staticProp, unstable_useTransitions]
  );
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default",
    unstable_mask
  } = locationProp;
  let locationContext = React3.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key,
        unstable_mask
      },
      navigationType
    };
  }, [
    basename,
    pathname,
    search,
    hash,
    state,
    key,
    navigationType,
    unstable_mask
  ]);
  warning(
    locationContext != null,
    `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
  );
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ React3.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ React3.createElement(LocationContext.Provider, { children, value: locationContext }));
}
function Routes({
  children,
  location
}) {
  return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children, parentPath = []) {
  let routes = [];
  React3.Children.forEach(children, (element, index) => {
    if (!React3.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === React3.Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children, treePath)
      );
      return;
    }
    invariant(
      element.type === Route,
      `[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
    );
    invariant(
      !element.props.index || !element.props.children,
      "An index route cannot have child routes."
    );
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      middleware: element.props.middleware,
      loader: element.props.loader,
      action: element.props.action,
      hydrateFallbackElement: element.props.hydrateFallbackElement,
      HydrateFallback: element.props.HydrateFallback,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.hasErrorBoundary === true || element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(
        element.props.children,
        treePath
      );
    }
    routes.push(route);
  });
  return routes;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    warning(
      false,
      `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
    );
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`
      );
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let { name, type, value } = target;
      if (type === "image") {
        let prefix = name ? `${name}.` : "";
        formData.append(`${prefix}x`, "0");
        formData.append(`${prefix}y`, "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
    );
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return { action, method: method.toLowerCase(), encType, formData, body };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function invariant2(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (trailingSlashAware) {
    if (url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}_.${extension}`;
    } else {
      url.pathname = `${url.pathname}.${extension}`;
    }
  } else {
    if (url.pathname === "/") {
      url.pathname = `_root.${extension}`;
    } else if (basename && stripBasename(url.pathname, basename) === "/") {
      url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
    } else {
      url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
    }
  }
  return url;
}
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(
      `Error loading route module \`${route.module}\`, reloading page...`
    );
    console.error(error);
    if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
    void 0) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(
    matches.map(async (match) => {
      let route = manifest.routes[match.route.id];
      if (route) {
        let mod = await loadRouteModule(route, routeModules);
        return mod.links ? mod.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
      (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_a = currentMatches[index].route.path) == null ? void 0 : _a.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  if (mode === "assets") {
    return nextMatches.filter(
      (match, index) => isNew(match, index) || matchPathChanged(match, index)
    );
  }
  if (mode === "data") {
    return nextMatches.filter((match, index) => {
      var _a;
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(
            location.pathname + location.search + location.hash,
            window.origin
          ),
          currentParams: ((_a = currentMatches[0]) == null ? void 0 : _a.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    });
  }
  return [];
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
  return dedupeHrefs(
    matches.map((match) => {
      let route = manifest.routes[match.route.id];
      if (!route) return [];
      let hrefs = [route.module];
      if (route.clientActionModule) {
        hrefs = hrefs.concat(route.clientActionModule);
      }
      if (route.clientLoaderModule) {
        hrefs = hrefs.concat(route.clientLoaderModule);
      }
      if (includeHydrateFallback && route.hydrateFallbackModule) {
        hrefs = hrefs.concat(route.hydrateFallbackModule);
      }
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1)
  );
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({ key, link: descriptor });
    }
    return deduped;
  }, []);
}
function useDataRouterContext2() {
  let context = React3.useContext(DataRouterContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterContext.Provider> element"
  );
  return context;
}
function useDataRouterStateContext() {
  let context = React3.useContext(DataRouterStateContext);
  invariant2(
    context,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  );
  return context;
}
var FrameworkContext = React3.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let context = React3.useContext(FrameworkContext);
  invariant2(
    context,
    "You must render this element inside a <HydratedRouter> element"
  );
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let frameworkContext = React3.useContext(FrameworkContext);
  let [maybePrefetch, setMaybePrefetch] = React3.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React3.useState(false);
  let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
  let ref = React3.useRef(null);
  React3.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  React3.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  let setIntent = () => {
    setMaybePrefetch(true);
  };
  let cancelIntent = () => {
    setMaybePrefetch(false);
    setShouldPrefetch(false);
  };
  if (!frameworkContext) {
    return [false, ref, {}];
  }
  if (prefetch !== "intent") {
    return [shouldPrefetch, ref, {}];
  }
  return [
    shouldPrefetch,
    ref,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }
  ];
}
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function PrefetchPageLinks({ page, ...linkProps }) {
  let rsc = useIsRSCRouterContext();
  let { router } = useDataRouterContext2();
  let matches = React3.useMemo(
    () => matchRoutes(router.routes, page, router.basename),
    [router.routes, page, router.basename]
  );
  if (!matches) {
    return null;
  }
  if (rsc) {
    return /* @__PURE__ */ React3.createElement(RSCPrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  return /* @__PURE__ */ React3.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
}
function useKeyedPrefetchLinks(matches) {
  let { manifest, routeModules } = useFrameworkContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React3.useState([]);
  React3.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
      (links) => {
        if (!interrupted) {
          setKeyedPrefetchLinks(links);
        }
      }
    );
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function RSCPrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let dataHrefs = React3.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.unstable_trailingSlashAwareDataRequests,
      "rsc"
    );
    let hasSomeRoutesWithShouldRevalidate = false;
    let targetRoutes = [];
    for (let match of nextMatches) {
      if (typeof match.route.shouldRevalidate === "function") {
        hasSomeRoutesWithShouldRevalidate = true;
      } else {
        targetRoutes.push(match.route.id);
      }
    }
    if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
      url.searchParams.set("_routes", targetRoutes.join(","));
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.unstable_trailingSlashAwareDataRequests,
    page,
    location,
    nextMatches
  ]);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })));
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let { future, manifest, routeModules } = useFrameworkContext();
  let { basename } = useDataRouterContext2();
  let { loaderData, matches } = useDataRouterStateContext();
  let newMatchesForData = React3.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "data"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let newMatchesForAssets = React3.useMemo(
    () => getNewMatchesForLinks(
      page,
      nextMatches,
      matches,
      manifest,
      location,
      "assets"
    ),
    [page, nextMatches, matches, manifest, location]
  );
  let dataHrefs = React3.useMemo(() => {
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m) => {
      var _a;
      let manifestRoute = manifest.routes[m.route.id];
      if (!manifestRoute || !manifestRoute.hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && ((_a = routeModules[m.route.id]) == null ? void 0 : _a.shouldRevalidate)) {
        foundOptOutRoute = true;
      } else if (manifestRoute.hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(
      page,
      basename,
      future.unstable_trailingSlashAwareDataRequests,
      "data"
    );
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set(
        "_routes",
        nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
      );
    }
    return [url.pathname + url.search];
  }, [
    basename,
    future.unstable_trailingSlashAwareDataRequests,
    loaderData,
    location,
    manifest,
    newMatchesForData,
    nextMatches,
    page,
    routeModules
  ]);
  let moduleHrefs = React3.useMemo(
    () => getModuleLinkHrefs(newMatchesForAssets, manifest),
    [newMatchesForAssets, manifest]
  );
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React3.createElement(
      "link",
      {
        key,
        nonce: linkProps.nonce,
        ...link,
        crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
      }
    )
  )));
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
try {
  if (isBrowser2) {
    window.__reactRouterVersion = // @ts-expect-error
    "7.14.2";
  }
} catch (e) {
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = React3.forwardRef(
  function LinkWithRef({
    onClick,
    discover = "render",
    prefetch = "none",
    relative,
    reloadDocument,
    replace: replace2,
    unstable_mask,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...rest
  }, forwardedRef) {
    let { basename, navigator, unstable_useTransitions } = React3.useContext(NavigationContext);
    let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to);
    let parsed = parseToInfo(to, basename);
    to = parsed.to;
    let href = useHref(to, { relative });
    let location = useLocation();
    let maskedHref = null;
    if (unstable_mask) {
      let resolved = resolveTo(
        unstable_mask,
        [],
        location.unstable_mask ? location.unstable_mask.pathname : "/",
        true
      );
      if (basename !== "/") {
        resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
      }
      maskedHref = navigator.createHref(resolved);
    }
    let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
      prefetch,
      rest
    );
    let internalOnClick = useLinkClickHandler(to, {
      replace: replace2,
      unstable_mask,
      state,
      target,
      preventScrollReset,
      relative,
      viewTransition,
      unstable_defaultShouldRevalidate,
      unstable_useTransitions
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    let isSpaLink = !(parsed.isExternal || reloadDocument);
    let link = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ React3.createElement(
        "a",
        {
          ...rest,
          ...prefetchHandlers,
          href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
          onClick: isSpaLink ? handleClick : onClick,
          ref: mergeRefs(forwardedRef, prefetchRef),
          target,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      )
    );
    return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(React3.Fragment, null, link, /* @__PURE__ */ React3.createElement(PrefetchPageLinks, { page: href })) : link;
  }
);
Link.displayName = "Link";
var NavLink = React3.forwardRef(
  function NavLinkWithRef({
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children,
    ...rest
  }, ref) {
    let path = useResolvedPath(to, { relative: rest.relative });
    let location = useLocation();
    let routerState = React3.useContext(DataRouterStateContext);
    let { navigator, basename } = React3.useContext(NavigationContext);
    let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(path) && viewTransition === true;
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    if (nextLocationPathname && basename) {
      nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
    }
    const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let renderProps = {
      isActive,
      isPending,
      isTransitioning
    };
    let ariaCurrent = isActive ? ariaCurrentProp : void 0;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp(renderProps);
    } else {
      className = [
        classNameProp,
        isActive ? "active" : null,
        isPending ? "pending" : null,
        isTransitioning ? "transitioning" : null
      ].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
    return /* @__PURE__ */ React3.createElement(
      Link,
      {
        ...rest,
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to,
        viewTransition
      },
      typeof children === "function" ? children(renderProps) : children
    );
  }
);
NavLink.displayName = "NavLink";
var Form = React3.forwardRef(
  ({
    discover = "render",
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition,
    unstable_defaultShouldRevalidate,
    ...props
  }, forwardedRef) => {
    let { unstable_useTransitions } = React3.useContext(NavigationContext);
    let submit = useSubmit();
    let formAction = useFormAction(action, { relative });
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action);
    let submitHandler = (event) => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      let doSubmit = () => submit(submitter || event.currentTarget, {
        fetcherKey,
        method: submitMethod,
        navigate,
        replace: replace2,
        state,
        relative,
        preventScrollReset,
        viewTransition,
        unstable_defaultShouldRevalidate
      });
      if (unstable_useTransitions && navigate !== false) {
        React3.startTransition(() => doSubmit());
      } else {
        doSubmit();
      }
    };
    return /* @__PURE__ */ React3.createElement(
      "form",
      {
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : submitHandler,
        ...props,
        "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
      }
    );
  }
);
Form.displayName = "Form";
function getDataRouterConsoleError2(hookName) {
  return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(hookName) {
  let ctx = React3.useContext(DataRouterContext);
  invariant(ctx, getDataRouterConsoleError2(hookName));
  return ctx;
}
function useLinkClickHandler(to, {
  target,
  replace: replaceProp,
  unstable_mask,
  state,
  preventScrollReset,
  relative,
  viewTransition,
  unstable_defaultShouldRevalidate,
  unstable_useTransitions
} = {}) {
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });
  return React3.useCallback(
    (event) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();
        let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
        let doNavigate = () => navigate(to, {
          replace: replace2,
          unstable_mask,
          state,
          preventScrollReset,
          relative,
          viewTransition,
          unstable_defaultShouldRevalidate
        });
        if (unstable_useTransitions) {
          React3.startTransition(() => doNavigate());
        } else {
          doNavigate();
        }
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      unstable_mask,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      viewTransition,
      unstable_defaultShouldRevalidate,
      unstable_useTransitions
    ]
  );
}
var fetcherId = 0;
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  );
  let { basename } = React3.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  let routerFetch = router.fetch;
  let routerNavigate = router.navigate;
  return React3.useCallback(
    async (target, options = {}) => {
      let { action, method, encType, formData, body } = getFormSubmissionInfo(
        target,
        basename
      );
      if (options.navigate === false) {
        let key = options.fetcherKey || getUniqueFetcherId();
        await routerFetch(key, currentRouteId, options.action || action, {
          unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          flushSync: options.flushSync
        });
      } else {
        await routerNavigate(options.action || action, {
          unstable_defaultShouldRevalidate: options.unstable_defaultShouldRevalidate,
          preventScrollReset: options.preventScrollReset,
          formData,
          body,
          formMethod: options.method || method,
          formEncType: options.encType || encType,
          replace: options.replace,
          state: options.state,
          fromRouteId: currentRouteId,
          flushSync: options.flushSync,
          viewTransition: options.viewTransition
        });
      }
    },
    [routerFetch, routerNavigate, basename, currentRouteId]
  );
}
function useFormAction(action, { relative } = {}) {
  let { basename } = React3.useContext(NavigationContext);
  let routeContext = React3.useContext(RouteContext);
  invariant(routeContext, "useFormAction must be used inside a RouteContext");
  let [match] = routeContext.matches.slice(-1);
  let path = { ...useResolvedPath(action ? action : ".", { relative }) };
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? `?${qs}` : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
function useViewTransitionState(to, { relative } = {}) {
  let vtContext = React3.useContext(ViewTransitionContext);
  invariant(
    vtContext != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  );
  let path = useResolvedPath(to, { relative });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
function StaticRouter({
  basename,
  children,
  location: locationProp = "/"
}) {
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let action = "POP";
  let location = {
    pathname: locationProp.pathname || "/",
    search: locationProp.search || "",
    hash: locationProp.hash || "",
    state: locationProp.state != null ? locationProp.state : null,
    key: locationProp.key || "default",
    unstable_mask: void 0
  };
  let staticNavigator = getStatelessNavigator();
  return /* @__PURE__ */ React3.createElement(
    Router,
    {
      basename,
      children,
      location,
      navigationType: action,
      navigator: staticNavigator,
      static: true,
      unstable_useTransitions: false
    }
  );
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(
        `You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`
      );
    },
    replace(to) {
      throw new Error(
        `You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`
      );
    },
    go(delta) {
      throw new Error(
        `You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`
      );
    },
    back() {
      throw new Error(
        `You cannot use navigator.back() on the server because it is a stateless environment.`
      );
    },
    forward() {
      throw new Error(
        `You cannot use navigator.forward() on the server because it is a stateless environment.`
      );
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX3.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
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
const __iconNode$q = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$q);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$p = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$p);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$o = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$o);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$n = [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2", key: "p02svl" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2", key: "xm4xkj" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M14 10h4", key: "ru81e7" }],
  ["path", { d: "M6 14h2v6", key: "16z9wg" }],
  ["path", { d: "M14 4h2v6", key: "1idq9u" }]
];
const Binary = createLucideIcon("binary", __iconNode$n);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$m = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$m);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$l = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$l);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$k = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$k);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$j = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$j);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$i = [
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
const Cpu = createLucideIcon("cpu", __iconNode$i);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$h = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$h);
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$g);
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
const Map$1 = createLucideIcon("map", __iconNode$a);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$9);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34", key: "z3du51" }],
  ["path", { d: "M4 6h.01", key: "oypzma" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35", key: "qzzz0" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67", key: "1yjesh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67", key: "1u2y91" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "m13.41 10.59 5.66-5.66", key: "mhq4k0" }]
];
const Radar = createLucideIcon("radar", __iconNode$8);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Radio = createLucideIcon("radio", __iconNode$7);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "m19 8 3 8a5 5 0 0 1-6 0zV7", key: "zcdpyk" }],
  ["path", { d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1", key: "1yorad" }],
  ["path", { d: "m5 8 3 8a5 5 0 0 1-6 0zV7", key: "eua70x" }],
  ["path", { d: "M7 21h10", key: "1b0cd5" }]
];
const Scale = createLucideIcon("scale", __iconNode$6);
/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$5);
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
    nav: { manifesto: "Briefing", services: "Advisory", education: "Education", foundry: "AI Agents", expertise: "Fields", contact: "Contact" },
    domains: {
      subtitle: "Focus",
      title: "Core Expertise.",
      intro: "Power transition, the end of globalization, the advent of AI — three simultaneous disruptions that redefine who wins and who loses. Prometheus helps you get ahead thanks to our areas of strategic expertise.",
      items: [
        { title: "Regulation", icon: /* @__PURE__ */ jsx(Scale, { size: 24 }) },
        { title: "Tech", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) },
        { title: "Defense", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }) },
        { title: "Europe", icon: /* @__PURE__ */ jsx(Map$1, { size: 24 }) },
        { title: "Global", icon: /* @__PURE__ */ jsx(Globe, { size: 24 }) }
      ]
    },
    solutions: { subtitle: "Our services", title: "Strategic Solutions." },
    hero: {
      tag: "Status: Operative",
      headline: "Think different is easy.",
      headlineItalic: "Being right makes the difference.",
      subheadline: "A new world is emerging. Only those who see clearly survive. Prometheus helps you write your rules — and enforce them.",
      ctaPrimary: "BRIEFING",
      ctaSecondary: "MANIFESTO",
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
      quote: "Think different is easy.",
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
          title: "AI Agents",
          subtitle: "Customized AI advisors",
          desc: "Customized agents and from our AI Foundry : regulatory monitoring, ecosystem mapping, geopolitical OSINT, predictive compliance, supply chain — real-time, global scale.",
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
      subtitle: "AI Agents",
      title: "Our team of AI agents",
      intro: "We build AI agents that turn complexity into better decisions — That’s how we’re creating new-generation advisory services.",
      libraryTitle: "Ready-to-deploy agents",
      libraryDesc: "We have a library of AI agents to manage your strategic challenges.",
      customTitle: "Bespoke development",
      customDesc: "We customize new agents to tackle your unique subjects and internal data.",
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
        "Analyser les options réversibles vs terminales en milieu complexe."
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
        { id: "reg", title: "Global Regulation", icon: /* @__PURE__ */ jsx(Briefcase, { size: 24 }), desc: "Extraterritoriality and cognitive warfare.", tags: ["Lawfare", "Sovereignty", "Lobbying"] },
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
          image: "pages/thomas.png"
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
    footer: { quote: "Bypass consensus. Navigate the new rules.", legal: "Legal", privacy: "Data Policy" }
  },
  fr: {
    nav: { manifesto: "Briefing", services: "Advisory", education: "Formation", foundry: "AI Agents", expertise: "Champs", contact: "Contact" },
    domains: {
      subtitle: "Focus",
      title: "Expertise Centrale.",
      intro: "Transition de puissance, fin de la mondialisation, avènement de l'IA — trois ruptures simultanées qui redéfinissent qui gagne et qui perd. Prometheus vous aide à en faire une longueur d'avance grâce à nos domaines d'expertises stratégiques.",
      items: [
        { title: "Régulation", icon: /* @__PURE__ */ jsx(Scale, { size: 24 }) },
        { title: "Tech", icon: /* @__PURE__ */ jsx(Cpu, { size: 24 }) },
        { title: "Défense", icon: /* @__PURE__ */ jsx(Shield, { size: 24 }) },
        { title: "Europe", icon: /* @__PURE__ */ jsx(Map$1, { size: 24 }) },
        { title: "Global", icon: /* @__PURE__ */ jsx(Globe, { size: 24 }) }
      ]
    },
    solutions: { subtitle: "Nos services", title: "Solutions Stratégiques." },
    hero: {
      tag: "Statut : Opérationnel",
      headline: "Penser différemment est facile.",
      headlineItalic: "Avoir raison fait la différence.",
      subheadline: "Un nouveau monde émerge. Seuls ceux qui voient juste survivent. Prometheus vous aide à écrire vos règles — et à les imposer.",
      ctaPrimary: "BRIEFING",
      ctaSecondary: "MANIFESTE",
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
      quote: "Penser différemment est facile.",
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
          title: "AI Agents",
          subtitle: "Conseillers IA personnalisés",
          desc: "Agents personnalisés et issus de notre AI Foundry : veille réglementaire, cartographie des écosystèmes, OSINT géopolitique, compliance prédictive, supply chain — en temps réel, à l'échelle mondiale.",
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
      subtitle: "AI Agents",
      title: "Notre équipe d'agents IA",
      intro: "Nous créons des agents IA qui transforment la complexité en meilleures décisions — C’est ainsi que nous bâtissons le conseil de nouvelle génération.",
      libraryTitle: "Agents prêts à l'emploi",
      libraryDesc: "Nous disposons d'une bibliothèque d'agents IA pour gérer vos défis stratégiques.",
      customTitle: "Développement sur mesure",
      customDesc: "Nous personnalisons de nouveaux agents pour traiter vos sujets uniques et vos données internes.",
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
        { id: "reg", title: "Régulation Mondiale", icon: /* @__PURE__ */ jsx(Briefcase, { size: 24 }), desc: "Extraterritorialité et guerre cognitive.", tags: ["Lawfare", "Souveraineté", "Lobbying"] },
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
          bio: "Entrepreneur et consultant. Expert : Tech, AI, Defence.",
          image: "pages/thomas.png"
        }
      ]
    },
    contactPage: {
      subtitle: "Sécurisé",
      title: "Établir la Communication.",
      intro: "Établir une ligne sécurisée.",
      labels: {
        name: "Utilisateur",
        email: "Contact Opérationnel",
        company: "Organisation",
        subject: "Intention",
        message: "Brief",
        submit: "Envoyer la Demande",
        success: "Transmis. Discrétion absolue."
      },
      subjects: ["Audit Stratégique", "Formation Exécutive", "Conseil Défense", "Red Teaming"]
    },
    finalCta: { title: "Retrouver l'Avance.", desc: "Bâtir des stratégies inaccessibles.", ctaPrimary: "Établir la Session" },
    footer: { quote: "Contourner le consensus. Naviguer les nouvelles règles.", legal: "Mentions Légales", privacy: "Confidentialité" }
  }
};
const SectionHeading = ({ subtitle, title, mono = false, theme = "dark" }) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
    className: "mb-20",
    children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-4 mb-4 ${theme === "light" ? "text-slate-500" : "text-[#d4af37]"}`, children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { width: 0 },
            whileInView: { width: 32 },
            viewport: { once: true },
            transition: { delay: 0.5, duration: 0.8 },
            className: `h-[1px] ${theme === "light" ? "bg-slate-300" : "bg-[#d4af37]"}`
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.4em] font-black", children: subtitle })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: `${mono ? "font-mono" : "font-serif"} text-5xl md:text-8xl tracking-tight leading-none font-bold ${theme === "light" ? "text-slate-950" : "text-white"}`, children: title })
    ]
  }
);
const ScrollProgress = () => {
  const [progress, setProgress] = React3__default.useState(0);
  React3__default.useEffect(() => {
    const update = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(winScroll / height * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full h-[1px] bg-white/5 z-[1000]", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] transition-all duration-100 ease-out", style: { width: `${progress}%` } }) });
};
const Navbar = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = UI_TEXT[lang].nav;
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { label: t.manifesto, path: "/briefing" },
    { label: t.services, path: "/advisory" },
    { label: t.education, path: "/education" },
    { label: t.foundry, path: "/foundry" }
  ];
  return /* @__PURE__ */ jsx("nav", { className: `fixed top-6 left-0 w-full z-[1000] px-6 transition-all duration-500`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-7xl mx-auto flex justify-between items-center bg-black/60 backdrop-blur-2xl border border-white/15 rounded-[2rem] px-8 py-3 shadow-2xl transition-all duration-500 ${scrolled ? "scale-[0.98] bg-black/80" : ""}`, children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-4 group", children: [
      /* @__PURE__ */ jsx(Flame, { className: "w-5 h-5 text-[#d4af37] fill-[#d4af37]/20" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center font-serif tracking-tight leading-none", children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-white uppercase", children: "Prometheus" }),
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#d4af37] ml-1.5 uppercase", children: "Advisory" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
      navItems.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.path,
          className: `font-mono text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#d4af37] ${location.pathname === item.path ? "text-[#d4af37]" : "text-slate-300"}`,
          children: item.label
        },
        item.path
      )),
      /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-7 py-3 bg-[#d4af37] text-slate-950 font-mono text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg shadow-[#d4af37]/20", children: UI_TEXT[lang].nav.contact }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLang("en"),
            className: `font-mono text-[10px] font-black transition-colors ${lang === "en" ? "text-[#d4af37]" : "text-slate-400 hover:text-white"}`,
            children: "EN"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-[1px] h-3 bg-white/10" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLang("fr"),
            className: `font-mono text-[10px] font-black transition-colors ${lang === "fr" ? "text-[#d4af37]" : "text-slate-400 hover:text-white"}`,
            children: "FR"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "lg:hidden text-white p-2", children: /* @__PURE__ */ jsx(Menu, { size: 24 }) })
  ] }) });
};
const MainLayout = ({ children, lang, setLang }) => {
  const location = useLocation();
  const page = location.pathname.substring(1) || "home";
  const getBgColor = () => {
    if (page === "advisory") return "bg-gradient-to-br from-[#060b1e] via-[#030510] to-[#010205]";
    if (page === "education") return "bg-gradient-to-br from-[#120e0c] via-[#0a0705] to-[#050302]";
    if (page === "foundry") return "bg-slate-50";
    if (page === "briefing") return "bg-gradient-to-br from-[#0a0c10] via-[#030406] to-[#000000]";
    if (page === "contact") return "bg-gradient-to-br from-[#111111] via-[#080808] to-[#000000]";
    return "bg-gradient-to-br from-[#0a0c10] via-[#030406] to-[#000000]";
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen ${getBgColor()} bg-fixed ${page === "foundry" ? "text-slate-900" : "text-slate-100"} selection:bg-[#d4af37] selection:text-slate-950 transition-colors duration-[1200ms] ease-in-out`, children: [
    /* @__PURE__ */ jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsx(Navbar, { lang, setLang }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10", children: [
      children,
      /* @__PURE__ */ jsxs("section", { className: `py-56 bg-[#d4af37] text-slate-950 px-6 text-center transition-all duration-700`, children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif tracking-tight text-6xl md:text-8xl mb-16 font-bold", children: "Recover the Lead." }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-16 py-6 bg-slate-950 text-white font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-105 transition-all inline-block", children: "Establish Session" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "py-20 border-t border-white/10 px-6 bg-black/80 transition-all duration-700", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-4 group", children: [
        /* @__PURE__ */ jsx(Flame, { className: "w-6 h-6 text-[#d4af37] fill-[#d4af37]/20" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center font-serif tracking-tight leading-none", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-white uppercase", children: "Prometheus" }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-[#d4af37] ml-1.5 uppercase", children: "Advisory" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-10 font-mono text-[10px] uppercase font-bold text-slate-300", children: [
        /* @__PURE__ */ jsx("button", { className: "hover:text-[#d4af37]", children: UI_TEXT[lang].footer.legal }),
        /* @__PURE__ */ jsx("button", { className: "hover:text-[#d4af37]", children: UI_TEXT[lang].footer.privacy })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono text-[9px] opacity-40 uppercase font-black", children: "© 2025 PROMETHEUS ADVISORY GROUP" })
    ] }) })
  ] });
};
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
      const subStep = 10;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.02)";
      for (let x = 0; x < width; x += subStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += subStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(212, 175, 55, 0.06)";
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
      const scanY = time * 0.1 % height;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();
      const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(1, "rgba(212, 175, 55, 0.05)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, width, 20);
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = 0.15 * (1 - dist / 180);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            const pulseSpeed = 1e-3 + i % 3 * 5e-4;
            const pulsePos = (time * pulseSpeed + i * j) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
            ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 4})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#d4af37";
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        const pulse = Math.sin(time * 3e-3 + i) * 0.5 + 0.5;
        const radius = node.radius + pulse * 1.5;
        ctx.fillStyle = `rgba(212, 175, 55, ${0.4 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        if (i % 3 === 0) {
          ctx.shadowBlur = 10 * pulse;
          ctx.shadowColor = "#d4af37";
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        if (i % 3 === 0) {
          const textAlpha = 0.2 + pulse * 0.3;
          ctx.font = '8px "JetBrains Mono"';
          ctx.fillStyle = `rgba(212, 175, 55, ${textAlpha})`;
          ctx.fillText(node.label, node.x + 10, node.y + 4);
          ctx.font = '6px "JetBrains Mono"';
          ctx.fillStyle = `rgba(212, 175, 55, ${textAlpha * 0.5})`;
          ctx.fillText(`${node.x.toFixed(0)},${node.y.toFixed(0)}`, node.x + 10, node.y + 12);
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
const Hero = ({ lang }) => {
  const t = UI_TEXT[lang].hero;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const img1Rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const img2Rotate = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.3, 1.5]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["blur(40px)", "blur(10px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      className: "relative min-h-screen xl:h-screen px-6 pt-48 lg:pt-80 pb-40 md:pb-64 flex items-center overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsx(
          motion.img,
          {
            style: { scale: bgScale, x: bgX, y: bgY, filter: bgBlur, opacity: bgOpacity },
            src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600",
            alt: "",
            className: "w-full h-full object-cover scale-110",
            referrerPolicy: "no-referrer"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              style: { y: contentY },
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "lg:col-span-7 flex flex-col items-start relative",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.5, duration: 1 },
                    className: "absolute -top-16 -left-32 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-[100px] pointer-events-none"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -10 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.2, duration: 0.5 },
                    className: "mb-8 flex items-center gap-3 px-4 py-2 border border-[#d4af37]/40 bg-[#d4af37]/5 rounded-xl",
                    children: [
                      /* @__PURE__ */ jsx(Activity, { size: 10, className: "text-[#d4af37] animate-pulse" }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-[8px] uppercase tracking-[0.4em] font-black text-[#d4af37]", children: "STATUS: OPERATIVE" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.h1,
                  {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    className: "font-serif text-5xl md:text-6xl xl:text-[5.5rem] leading-[1] tracking-tighter text-white font-bold mb-10",
                    children: [
                      "Think different is easy.",
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx("span", { className: "text-[#d4af37]", children: "Being right makes the difference." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.5, duration: 0.8 },
                    className: "relative pl-6 mb-12 py-1",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]" }),
                      /* @__PURE__ */ jsxs("p", { className: "font-mono text-base md:text-lg text-slate-100 font-bold max-w-lg leading-relaxed tracking-tight group", children: [
                        t.subheadline,
                        /* @__PURE__ */ jsx("span", { className: "inline-block w-2 h-5 bg-[#d4af37] ml-2 animate-pulse align-middle" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.7, duration: 0.6 },
                    className: "flex flex-wrap gap-6",
                    children: [
                      /* @__PURE__ */ jsxs(Link, { to: "/briefing", className: "group px-12 py-6 bg-[#d4af37] text-slate-950 font-serif font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:scale-105 transition-all flex items-center gap-4 shadow-2xl shadow-[#d4af37]/30", children: [
                        t.ctaPrimary,
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx(Link, { to: "/briefing", className: "px-12 py-6 border border-white/20 text-white font-serif font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white/10 transition-all", children: t.ctaSecondary })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.9, duration: 0.8 },
                    className: "mt-16 grid grid-cols-2 gap-4 lg:hidden w-full",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "aspect-[4/5] rounded-3xl overflow-hidden border border-[#d4af37]/20 relative shadow-[0_0_20px_rgba(212,175,55,0.1)]", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400",
                            alt: "Defense",
                            className: "w-full h-full object-cover",
                            referrerPolicy: "no-referrer"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 font-mono text-[8px] text-[#d4af37] font-black uppercase tracking-widest", children: "DEF_INTEL" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "aspect-[4/5] rounded-3xl overflow-hidden border border-[#d4af37]/20 relative shadow-[0_0_20px_rgba(212,175,55,0.1)]", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600",
                            alt: "Supply Chain",
                            className: "w-full h-full object-cover",
                            referrerPolicy: "no-referrer"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-4 font-mono text-[8px] text-[#d4af37] font-black uppercase tracking-widest", children: "OPS_CHAIN" })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95, x: 20 },
              animate: { opacity: 1, scale: 1, x: 0 },
              transition: { delay: 0.4, duration: 1, ease: "easeOut" },
              className: "lg:col-span-5 h-[500px] xl:h-[600px] relative group hidden lg:block",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    style: { y: img1Y, rotate: img1Rotate },
                    className: "absolute top-40 -right-20 z-40",
                    children: /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        animate: {
                          y: [0, -15, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.02, 1]
                        },
                        transition: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        whileHover: { scale: 1.1, rotate: 5 },
                        className: "w-48 h-64 rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-700 cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
                              alt: "Strategic Defense Operations",
                              className: "w-full h-full object-cover opacity-100 transition-all duration-700",
                              referrerPolicy: "no-referrer"
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    style: { y: img2Y, rotate: img2Rotate },
                    className: "absolute bottom-4 -right-12 z-40",
                    children: /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        animate: {
                          y: [0, 20, 0],
                          rotate: [0, -3, 0],
                          scale: [1, 1.05, 1]
                        },
                        transition: {
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        },
                        whileHover: { scale: 1.1, rotate: -5 },
                        className: "w-56 h-40 rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-700 cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
                              alt: "Active Supply Chain Solutions",
                              className: "w-full h-full object-cover opacity-100 transition-all duration-700",
                              referrerPolicy: "no-referrer"
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm overflow-hidden shadow-2xl z-10", children: [
                  /* @__PURE__ */ jsx(StrategicIntelligenceMap, {}),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-x-8 top-12 flex flex-col gap-6 pointer-events-none", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] text-white/40 font-black tracking-widest uppercase", children: [
                        "OSINT_STREAM: ",
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: "25s" })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-[8px] text-blue-400", children: "LAT: 48.8566" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-white/10" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] text-white/40 font-black tracking-widest uppercase", children: [
                        "ACTIVE_CORRELATIONS: ",
                        /* @__PURE__ */ jsx("span", { className: "text-white", children: "54" })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-[8px] text-blue-400", children: "LON: 2.3522" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "absolute left-8 bottom-12 flex flex-col gap-5 pointer-events-none", children: ["GEO-ECONOMICS", "GEO-TECH", "GEO-ORG"].map((label, idx) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -10 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: 1 + idx * 0.1 },
                      className: "flex items-center gap-3",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] font-black text-white/90 tracking-widest uppercase", children: label })
                      ]
                    },
                    label
                  )) })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
};
const VisionSection = ({ lang }) => {
  const t = UI_TEXT[lang].visionSection;
  return /* @__PURE__ */ jsx("section", { className: "py-32 md:py-56 px-6 relative overflow-hidden bg-black/40", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-24 items-center", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-300 font-serif leading-relaxed opacity-90 mb-12", children: t.body })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: t.pillars.map((pillar, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.2, duration: 0.6 },
        className: "glass-panel p-8 flex items-start gap-8 bg-white/[0.01] border-white/10 hover:border-[#d4af37]/40 transition-all rounded-[2rem] group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform duration-500", children: i === 0 ? /* @__PURE__ */ jsx(Eye, { size: 24 }) : i === 1 ? /* @__PURE__ */ jsx(Globe, { size: 24 }) : /* @__PURE__ */ jsx(Zap, { size: 24 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-serif text-white font-bold mb-2 transition-colors group-hover:text-[#d4af37]", children: pillar.title }),
            /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] text-slate-100 font-bold opacity-70 leading-relaxed uppercase tracking-tight", children: pillar.desc })
          ] })
        ]
      },
      i
    )) })
  ] }) }) });
};
const IntelligenceSection = ({ lang }) => {
  const t = UI_TEXT[lang].intelligence;
  return /* @__PURE__ */ jsx("section", { className: "py-32 md:py-56 px-6 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20", children: t.layers.map((layer, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { delay: i * 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
        className: "glass-panel p-12 rounded-[2.5rem] border-white/10 flex flex-col items-center text-center group hover:bg-[#d4af37]/5 transition-all duration-500",
        children: [
          /* @__PURE__ */ jsxs("div", { className: `w-20 h-20 rounded-[2rem] border-2 border-white/10 flex items-center justify-center mb-10 overflow-hidden relative group-hover:border-[#d4af37]/40 transition-all duration-500`, children: [
            /* @__PURE__ */ jsx("div", { className: `absolute inset-0 opacity-10 group-hover:opacity-20 transition-all ${layer.dot}` }),
            layer.id === "ai" ? /* @__PURE__ */ jsx(Database, { size: 32, className: "text-[#d4af37]" }) : layer.id === "specialists" ? /* @__PURE__ */ jsx(Users, { size: 32, className: "text-[#d4af37]" }) : /* @__PURE__ */ jsx(Target, { size: 32, className: "text-[#d4af37]" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-serif text-white font-bold mb-2 tracking-tight group-hover:text-[#d4af37] transition-colors", children: layer.title }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[9px] uppercase tracking-[0.3em] text-[#d4af37] font-black mb-8", children: layer.subtitle }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-[13px] font-bold leading-relaxed opacity-100 italic", children: layer.desc })
        ]
      },
      layer.id
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: 0.5 },
        className: "mt-24 p-12 glass-panel border-[#d4af37]/20 bg-black/60 rounded-[3rem] text-center max-w-4xl mx-auto border-dashed border-2",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-white tracking-[0.5em] uppercase font-black mb-6 opacity-30", children: "Strategic Output" }),
          /* @__PURE__ */ jsxs("h4", { className: "text-4xl md:text-6xl font-serif text-white font-bold tracking-tighter opacity-100 italic group cursor-default", children: [
            t.synthesis,
            /* @__PURE__ */ jsx(Activity, { className: "inline-block ml-6 text-[#d4af37] animate-pulse", size: 40 })
          ] })
        ]
      }
    )
  ] }) });
};
const UseCaseSection = ({ lang }) => {
  const t = UI_TEXT[lang].useCase;
  return /* @__PURE__ */ jsx("section", { className: "py-32 md:py-56 px-6 bg-white overflow-hidden border-y border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-24 items-end mb-24", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title, theme: "light" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl md:text-3xl font-serif text-slate-950 opacity-90 max-w-xl italic mt-12 leading-tight", children: [
              '"',
              t.intro,
              '"'
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          className: "text-right hidden lg:block",
          children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4 py-3 px-6 bg-black rounded-full text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-2xl", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#d4af37] rounded-full animate-ping" }),
            "Live Correlation System"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: t.cells.map((cell, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.15 },
        className: `p-16 rounded-[3rem] flex flex-col justify-between h-[400px] transition-all duration-500 border ${cell.accent ? "bg-[#d4af37] border-[#d4af37] text-slate-950 scale-[1.02] shadow-2xl shadow-[#d4af37]/20 z-10 hover:shadow-[#d4af37]/40" : "bg-slate-50 border-slate-100 text-slate-950 hover:bg-white"}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: `font-mono text-[10px] uppercase tracking-[0.4em] font-black opacity-40 mb-10`, children: cell.label }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-4xl font-serif leading-[1.1] tracking-tight", dangerouslySetInnerHTML: { __html: cell.body } }),
            /* @__PURE__ */ jsx("div", { className: `w-12 h-1 bg-current opacity-20` })
          ] })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-32 border-t border-slate-100 pt-32 text-center", children: [
      /* @__PURE__ */ jsx("h5", { className: "text-6xl md:text-[8rem] font-serif text-slate-300 font-bold tracking-tighter leading-none mb-10 opacity-30 select-none", children: t.quote }),
      /* @__PURE__ */ jsxs("div", { className: "group inline-flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-[1px] h-32 bg-slate-200" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl md:text-5xl font-serif text-slate-950 font-bold tracking-tight px-12 py-6 border-2 border-slate-950 rounded-full group-hover:bg-slate-950 group-hover:text-white transition-all cursor-default", children: t.answer })
      ] })
    ] })
  ] }) });
};
const ParallaxMemberCard = ({ member }) => {
  return /* @__PURE__ */ jsxs("div", { className: "glass-panel group relative overflow-hidden rounded-[2.5rem] border-white/10 bg-white/[0.02] p-2 hover:border-[#d4af37]/40 transition-all duration-700 shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "aspect-[4/3] rounded-[2.2rem] overflow-hidden transition-all duration-1000 relative", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: member.image,
          className: "w-full h-full object-cover transition-all duration-1000 group-hover:scale-105",
          alt: member.name,
          referrerPolicy: "no-referrer",
          onError: (e) => {
            const target = e.target;
            target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-10 left-10 right-10", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-3xl font-serif font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500", children: member.name }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-[#d4af37] font-black translate-y-4 group-hover:translate-y-0 transition-transform duration-700", children: member.role })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-10", children: /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs leading-relaxed font-black opacity-80 border-l border-[#d4af37]/30 pl-4", children: member.bio }) })
  ] });
};
const Landing = ({ lang }) => {
  const t = UI_TEXT[lang];
  const domainsT = t.domains;
  t.visionSection;
  const foundryT = t.foundryPage;
  const briefingsT = t.briefingsPage;
  return /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in duration-1000", children: [
    /* @__PURE__ */ jsx(Hero, { lang }),
    /* @__PURE__ */ jsx("div", { id: "manifesto", children: /* @__PURE__ */ jsx(UseCaseSection, { lang }) }),
    /* @__PURE__ */ jsx("div", { id: "doctrine", children: /* @__PURE__ */ jsx(VisionSection, { lang }) }),
    /* @__PURE__ */ jsx("div", { id: "methodology", children: /* @__PURE__ */ jsx(IntelligenceSection, { lang }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-56 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.solutions.subtitle, title: domainsT.title })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-24 items-center", children: [
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "text-2xl md:text-4xl font-serif tracking-tight leading-snug text-slate-100 font-medium italic opacity-90",
            children: domainsT.intro
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-6", children: domainsT.items.map((item, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            className: "glass-panel group p-10 flex flex-col items-start gap-8 hover:border-[#d4af37]/50 transition-all duration-500 cursor-pointer bg-white/[0.01] rounded-[2.5rem]",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-[#d4af37] group-hover:scale-110 transition-transform duration-500", children: item.icon }),
              /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors", children: item.title })
            ]
          },
          i
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden bg-white border-b border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsx(SectionHeading, { subtitle: foundryT.subtitle, title: foundryT.title, theme: "light" })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "max-w-3xl mb-20",
          children: /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-sans tracking-tight text-slate-900 leading-relaxed font-medium", children: foundryT.intro })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20", children: AI_PROJECTS.slice(0, 4).map((project, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.15 },
          children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/foundry",
              className: "bg-slate-50 group p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#d4af37]/40 transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full shadow-sm hover:shadow-xl",
              children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity", children: /* @__PURE__ */ jsx(Cpu, { size: 80, className: "text-slate-900" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-4", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-serif tracking-tight text-slate-950 font-bold group-hover:text-[#d4af37] transition-colors", children: project.name }),
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
            }
          )
        },
        project.id
      )) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/foundry",
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
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsx(SectionHeading, { subtitle: briefingsT.subtitle, title: briefingsT.title })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: ARTICLES.map((article, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { delay: i * 0.2 },
          children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/briefing/${article.id}`,
              className: "glass-panel group cursor-pointer overflow-hidden rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/30 transition-all duration-500 bg-white/[0.02] shadow-xl hover:shadow-[#d4af37]/10 h-full flex flex-col",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "aspect-[16/9] overflow-hidden relative transition-all duration-1000 ease-in-out", children: [
                  /* @__PURE__ */ jsx("img", { src: article.imageUrl, className: "w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 img-tactical-gold", alt: article.title[lang], referrerPolicy: "no-referrer" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-2 border-transparent group-hover:border-[#d4af37]/30 transition-all duration-500 z-20 pointer-events-none" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-10 flex-1 flex flex-col", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest text-[#d4af37] font-black", children: article.category[lang] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-100 font-mono text-[14px] uppercase font-bold", children: [
                      /* @__PURE__ */ jsx(Timer, { size: 12 }),
                      " ",
                      article.readTime[lang]
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-3xl font-serif tracking-tight text-white mb-6 font-bold group-hover:text-[#d4af37] transition-colors duration-500", children: article.title[lang] }),
                  /* @__PURE__ */ jsx("p", { className: "text-slate-100 font-mono text-[14px] font-bold leading-relaxed opacity-100 mb-8 flex-1", children: article.excerpt[lang] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[#d4af37] font-mono text-[11px] uppercase font-bold tracking-widest group-hover:gap-5 transition-all", children: [
                    "Read Report ",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 14 })
                  ] })
                ] })
              ]
            }
          )
        },
        article.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.teamSection.subtitle, title: t.teamSection.title })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: t.teamSection.members.map((m, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.2 },
          children: /* @__PURE__ */ jsx(ParallaxMemberCard, { member: m })
        },
        i
      )) })
    ] }) })
  ] });
};
const Briefing = ({ lang }) => {
  const t = UI_TEXT[lang].manifestoPage;
  const arch = t.intelligenceArchitecture;
  return /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in duration-1000", children: [
    /* @__PURE__ */ jsx("section", { className: "pt-56 pb-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[#d4af37] font-serif text-3xl tracking-tight mb-16 font-bold", children: t.discernment }),
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
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-12 relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] rounded-2xl shadow-xl shadow-[#d4af37]/20 group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-700 bg-black/40 group-hover:bg-[#d4af37]/10", children: /* @__PURE__ */ jsx(Database, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-4xl font-serif tracking-tight text-white font-bold group-hover:translate-x-2 transition-transform duration-500", children: arch.aiTitle })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[13px] text-slate-100 font-bold tracking-widest mb-16 relative z-10 group-hover:text-[#d4af37] transition-colors", children: arch.aiDescription }),
          /* @__PURE__ */ jsx("div", { className: "space-y-12 relative z-10", children: arch.aiItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start group/item", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 glass-panel border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] rounded-2xl group-hover/item:bg-[#d4af37] group-hover/item:text-slate-950 group-hover/item:rotate-[12deg] group-hover/item:scale-110 transition-all duration-500", children: item.icon }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-serif tracking-tight text-white mb-3 font-bold group-hover/item:text-[#d4af37] transition-colors flex items-center gap-3", children: [
                item.title,
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-[#d4af37] rounded-full group-hover/item:animate-ping" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs tracking-tight font-bold leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity", children: item.desc })
            ] })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-panel p-10 md:p-14 rounded-[3.5rem] border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent relative group overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-12 relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-2 border-blue-400 flex items-center justify-center text-blue-400 rounded-2xl shadow-xl shadow-blue-500/10", children: /* @__PURE__ */ jsx(Users, { size: 32 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-4xl font-serif tracking-tight text-white font-bold", children: arch.humanTitle })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[13px] text-slate-100 font-bold tracking-widest mb-16 relative z-10", children: arch.humanDescription }),
          /* @__PURE__ */ jsx("div", { className: "space-y-12 relative z-10", children: arch.humanItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-8 items-start group/item", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 glass-panel border-blue-400/40 flex items-center justify-center text-blue-400 rounded-2xl group-hover/item:bg-blue-400 group-hover/item:text-slate-950 transition-all duration-300", children: item.icon }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-2xl font-serif tracking-tight text-white mb-3 font-bold group-hover/item:text-blue-400 transition-colors", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs tracking-tight font-bold leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity", children: item.desc })
            ] })
          ] }, idx)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-32 md:py-48 px-6 relative overflow-hidden border-y border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx(SectionHeading, { subtitle: "The Mythos", title: t.whyPrometheusTitle, mono: true }),
      /* @__PURE__ */ jsx("p", { className: "text-[#d4af37] text-2xl font-serif tracking-tight mb-10 font-bold", children: t.whyPrometheusIntro }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: t.howItInspires.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "p-12 glass-panel border-white/10 group hover:border-[#d4af37]/60 transition-all rounded-[2.5rem] bg-white/[0.04] shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 flex items-center justify-center text-slate-950 mb-10 bg-[#d4af37] rounded-2xl shadow-xl shadow-[#d4af37]/20", children: i === 0 ? /* @__PURE__ */ jsx(Radio, { size: 28 }) : i === 1 ? /* @__PURE__ */ jsx(Compass, { size: 28 }) : i === 2 ? /* @__PURE__ */ jsx(ZapOff, { size: 28 }) : /* @__PURE__ */ jsx(Scale, { size: 28 }) }),
        /* @__PURE__ */ jsx("h4", { className: "text-2xl font-serif tracking-tight mb-6 text-white group-hover:text-[#d4af37] transition-colors font-bold", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-100 font-mono text-[13px] tracking-wider leading-relaxed font-bold opacity-90", children: item.desc })
      ] }, i)) })
    ] }) })
  ] });
};
const Advisory = ({ lang }) => {
  const t = UI_TEXT[lang].servicesPage;
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-1000", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-mono font-black mb-20", children: t.intro }),
    /* @__PURE__ */ jsx("div", { className: "space-y-12", children: t.items.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-12 gap-12 border-white/10 bg-white/[0.01]", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-1 text-[#d4af37]", children: item.icon }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-serif tracking-tight text-white font-bold mb-4", children: item.title }),
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
const Education = ({ lang }) => {
  const t = UI_TEXT[lang].educationPage;
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-1000", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-mono font-black mb-20", children: t.intro }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12", children: t.offers.map((offer) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/30 transition-all bg-white/[0.02]", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[#d4af37] mb-8", children: offer.icon }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-serif tracking-tight text-white font-bold mb-6", children: offer.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs font-black mb-10 opacity-80", children: offer.desc }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 pt-8 border-t border-white/10", children: offer.details.map((d, i) => /* @__PURE__ */ jsxs("p", { className: "font-mono text-[11px] font-bold text-slate-300", children: [
        "• ",
        d
      ] }, i)) })
    ] }, offer.id)) })
  ] }) });
};
const Foundry = ({ lang }) => {
  const t = UI_TEXT[lang].foundryPage;
  const [filter, setFilter] = useState("all");
  const filteredProjects = filter === "all" ? AI_PROJECTS : AI_PROJECTS.filter((p) => p.industry === filter || p.tech.includes(filter) || p.business.includes(filter));
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-1000 bg-white min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title, theme: "light" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 pb-20 border-b border-slate-100", children: [
      /* @__PURE__ */ jsx("p", { className: "text-slate-900 text-xl md:text-2xl font-serif tracking-tight max-w-2xl font-medium", children: t.intro }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-serif font-bold text-lg text-slate-950", children: t.libraryTitle }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 font-mono text-[11px] font-black leading-relaxed", children: t.libraryDesc })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 p-6 rounded-2xl border border-amber-100 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-serif font-bold text-lg text-slate-950", children: t.customTitle }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 font-mono text-[11px] font-black leading-relaxed", children: t.customDesc })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mb-12", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setFilter("all"), className: `px-4 py-2 rounded-full font-mono text-[10px] uppercase font-black tracking-widest transition-all ${filter === "all" ? "bg-[#d4af37] text-slate-950" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`, children: t.filters.all }),
      ["Public Regulation", "Tech", "Defense"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: `px-4 py-2 rounded-full font-mono text-[10px] uppercase font-black tracking-widest transition-all ${filter === f ? "bg-[#d4af37] text-slate-950" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`, children: f }, f))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#d4af37]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl group", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity", children: /* @__PURE__ */ jsx(Cpu, { size: 60, className: "text-slate-950" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-serif tracking-tight text-slate-950 font-bold group-hover:text-[#d4af37] transition-colors", children: project.name }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[7px] px-2 py-0.5 border border-amber-200 bg-amber-50 text-[#8c7324] rounded font-black tracking-widest", children: project.status })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-800 font-mono text-[13px] leading-relaxed mb-8 font-black", children: project.description[lang] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 border-t border-slate-200 pt-6", children: project.tech.map((tech) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-slate-200/50 rounded font-mono text-[8px] uppercase font-black text-slate-700", children: tech }, tech)) })
    ] }, project.id)) })
  ] }) });
};
const Fields = ({ lang }) => {
  const t = UI_TEXT[lang].expertisePage;
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-1000", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.hero }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-mono font-black mb-20", children: t.intro }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: t.domains.map((d) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] border-white/10 hover:border-[#d4af37]/40 transition-all bg-white/[0.01] group", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[#d4af37] mb-8 group-hover:scale-110 transition-transform", children: d.icon }),
      /* @__PURE__ */ jsx("h3", { className: "text-4xl font-serif tracking-tight text-white font-bold mb-6", children: d.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-xs font-black mb-10 opacity-70 leading-relaxed", children: d.desc }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: d.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 border border-white/10 rounded-full font-mono text-[9px] font-black tracking-widest text-[#d4af37]", children: tag }, tag)) })
    ] }, d.id)) })
  ] }) });
};
const Contact = ({ lang }) => {
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
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-1000", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionHeading, { subtitle: t.subtitle, title: t.title }),
    /* @__PURE__ */ jsx("div", { className: "glass-panel p-12 rounded-[2.5rem] border-white/10 bg-white/[0.02]", children: success ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20 animate-in zoom-in", children: [
      /* @__PURE__ */ jsx(CircleCheck, { size: 64, className: "text-[#d4af37] mx-auto mb-10" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-serif tracking-tight text-white font-bold mb-4", children: "Transmission Successful" }),
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
const BriefingDetail = ({ lang }) => {
  const { id } = useParams();
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) return /* @__PURE__ */ jsx("div", { className: "pt-56 text-center text-white", children: "Report not found." });
  return /* @__PURE__ */ jsx("div", { className: "pt-56 pb-32 px-6 animate-in fade-in duration-700", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: "flex items-center gap-3 font-mono text-[11px] uppercase font-bold text-[#d4af37] mb-16 hover:gap-5 transition-all inline-block",
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 14, className: "inline mr-2" }),
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
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-serif tracking-tight text-white font-bold leading-tight mb-12", children: article.title[lang] }),
      /* @__PURE__ */ jsxs("div", { className: "aspect-video rounded-[3rem] overflow-hidden grayscale brightness-75 mb-16 border border-white/10 shadow-2xl relative", children: [
        /* @__PURE__ */ jsx("img", { src: article.imageUrl, className: "w-full h-full object-cover", alt: article.title[lang], referrerPolicy: "no-referrer" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-12", children: article.content[lang].map((para, i) => /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-slate-200 leading-relaxed font-serif opacity-90", children: para }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass-panel p-12 rounded-[2.5rem] border-l-4 border-[#d4af37] bg-[#d4af37]/5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs uppercase font-black tracking-widest text-[#d4af37] mb-6 italic opacity-80", children: "Transmission Summary" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-300 font-mono text-sm leading-relaxed font-black", children: "Strategic autonomy requires a decoupling from foreign dependencies. This report maps the transition towards sovereign agentic systems as the primary mode of operational security." })
    ] })
  ] }) });
};
const SEO = ({ title, description, lang = "en", meta = [] }) => {
  const siteTitle = "Prometheus Advisory";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const secondaryDescription = "Strategic intelligence and operational excellence for complex environments.";
  const metaDescription = description || secondaryDescription;
  return /* @__PURE__ */ jsx(
    Helmet,
    {
      htmlAttributes: { lang },
      title: fullTitle,
      meta: [
        {
          name: "description",
          content: metaDescription
        },
        {
          property: "og:title",
          content: fullTitle
        },
        {
          property: "og:description",
          content: metaDescription
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: "twitter:title",
          content: fullTitle
        },
        {
          name: "twitter:description",
          content: metaDescription
        },
        ...meta
      ]
    }
  );
};
const DynamicSEO = ({ lang }) => {
  const location = useLocation();
  const seoData = useMemo(() => {
    const path = location.pathname;
    if (path === "/") {
      return {
        title: lang === "en" ? "Strategic Intelligence" : "Intelligence Stratégique",
        description: lang === "en" ? "Prometheus Advisory: Strategic intelligence and operational excellence for complex environments." : "Prometheus Advisory : Intelligence stratégique et excellence opérationnelle pour les environnements complexes."
      };
    }
    if (path.startsWith("/briefing")) {
      return {
        title: lang === "en" ? "Briefings" : "Briefings",
        description: lang === "en" ? "Expert analysis and briefings on global strategy, tech, and defense." : "Analyses expertes et briefings sur la stratégie mondiale, la technologie et la défense."
      };
    }
    if (path === "/advisory") {
      return {
        title: lang === "en" ? "Advisory Services" : "Services de Conseil",
        description: lang === "en" ? "Strategic consulting for sovereign entities and global industrial leaders." : "Conseil stratégique pour les entités souveraines et les leaders industriels mondiaux."
      };
    }
    if (path === "/contact") {
      return {
        title: lang === "en" ? "Contact" : "Contact",
        description: lang === "en" ? "Get in touch with Prometheus Advisory." : "Contactez Prometheus Advisory."
      };
    }
    return {
      title: "",
      description: ""
    };
  }, [location.pathname, lang]);
  return /* @__PURE__ */ jsx(SEO, { title: seoData.title, description: seoData.description, lang });
};
const App = () => {
  const [lang, setLang] = useState("en");
  return /* @__PURE__ */ jsxs(MainLayout, { lang, setLang, children: [
    /* @__PURE__ */ jsx(DynamicSEO, { lang }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Landing, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/briefing", element: /* @__PURE__ */ jsx(Briefing, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/briefing/:id", element: /* @__PURE__ */ jsx(BriefingDetail, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/advisory", element: /* @__PURE__ */ jsx(Advisory, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/education", element: /* @__PURE__ */ jsx(Education, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/foundry", element: /* @__PURE__ */ jsx(Foundry, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/fields", element: /* @__PURE__ */ jsx(Fields, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, { lang }) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Landing, { lang }) })
    ] })
  ] });
};
function render(url) {
  const helmetContext = {};
  try {
    const html = renderToString(
      /* @__PURE__ */ jsx(React3__default.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }) })
    );
    return { html, helmetContext };
  } catch (error) {
    console.error("SSR Render Error:", error);
    return { html: `<div id="ssr-error">SSR Error occurred: ${error instanceof Error ? error.message : String(error)}</div>`, helmetContext: {} };
  }
}
export {
  render
};
