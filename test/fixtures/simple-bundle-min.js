! function r(e, n, t) {
  function o(u, f) {
    if (!n[u]) {
      if (!e[u]) {
        var c = "function" == typeof require && require;
        if (!f && c) return c(u, !0);
        if (i) return i(u, !0);
        var a = new Error("Cannot find module '" + u + "'");
        throw a.code = "MODULE_NOT_FOUND", a
      }
      var l = n[u] = {
        exports: {}
      };
      e[u][0].call(l.exports, function(r) {
        var n = e[u][1][r];
        return o(n ? n : r)
      }, l, l.exports, r, e, n, t)
    }
    return n[u].exports
  }
  for (var i = "function" == typeof require && require, u = 0; u < t.length; u++) o(t[u]);
  return o
}({
  1: [function() {
    console.log("Simple test")
  }, {}]
}, {}, [1]);