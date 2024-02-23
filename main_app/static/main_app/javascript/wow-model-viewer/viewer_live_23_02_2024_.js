/*! For license information please see viewer.min.js.LICENSE.txt */
(() => {
  var t = {
      287: () => {
        var t, e;
        (window.requestAnimFrame =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (t, e) {
            window.setTimeout(t, 1e3 / 60);
          }),
          (jQuery.support.cors = !0),
          $.ajaxTransport
            ? ($.ajaxSetup({ flatOptions: { renderer: !0 } }),
              $.ajaxTransport("+binary", function (t, e, i) {
                if (
                  window.FormData &&
                  ((t.dataType && "binary" == t.dataType) ||
                    (t.data &&
                      ((window.ArrayBuffer && t.data instanceof ArrayBuffer) ||
                        (window.Blob && t.data instanceof Blob))))
                )
                  return {
                    send: function (e, i) {
                      var r = new XMLHttpRequest(),
                        s = t.url,
                        n = t.type,
                        a = t.responseType || "blob",
                        o = t.data || null;
                      t.renderer &&
                        r.addEventListener("progress", function (e) {
                          e.lengthComputable &&
                            (t.renderer.downloads[this.responseURL]
                              ? (t.renderer.downloads[this.responseURL].loaded =
                                  e.loaded)
                              : (t.renderer.downloads[this.responseURL] = {
                                  loaded: e.loaded,
                                  total: e.total,
                                }),
                            t.renderer.updateProgress());
                        }),
                        r.addEventListener("load", function () {
                          t.renderer &&
                            (delete t.renderer.downloads[this.responseURL],
                            t.renderer.updateProgress());
                          var e = {};
                          (e[t.dataType] = r.response),
                            i(
                              r.status,
                              r.statusText,
                              e,
                              r.getAllResponseHeaders()
                            );
                        }),
                        r.open(n, s, !0),
                        (r.responseType = a),
                        r.send(o);
                    },
                    abort: function () {
                      i.abort();
                    },
                  };
              }))
            : ((t = $.httpData),
              ($.httpData = function (e, i, r) {
                return "binary" == i ? e.response : t(e, i, r);
              }),
              $.ajaxSetup({
                beforeSend: function (t, e) {
                  "binary" == e.dataType &&
                    ((t.responseType = e.responseType || "arraybuffer"),
                    t.addEventListener(
                      "progress",
                      function (t) {
                        e.renderer &&
                          t.lengthComputable &&
                          (e.renderer.downloads[this.responseURL]
                            ? (e.renderer.downloads[this.responseURL].loaded =
                                t.loaded)
                            : (e.renderer.downloads[this.responseURL] = {
                                loaded: t.loaded,
                                total: t.total,
                              }),
                          e.renderer.updateProgress());
                      },
                      !1
                    ),
                    t.addEventListener(
                      "load",
                      function () {
                        e.renderer &&
                          (delete e.renderer.downloads[this.responseURL],
                          e.renderer.updateProgress());
                      },
                      !1
                    ));
                },
              })),
          (Math.randomInt =
            Math.randomInt ||
            function (t, e) {
              return Math.floor(Math.random() * (e - t)) + t;
            }),
          "function" != typeof Object.create &&
            (Object.create =
              ((e = function () {}),
              function (t) {
                if (arguments.length > 1)
                  throw Error("Second argument not supported");
                if ("object" != typeof t)
                  throw TypeError("Argument must be an object");
                e.prototype = t;
                var i = new e();
                return (e.prototype = null), i;
              })),
          (window.console = window.console || {
            log: function () {},
            error: function () {},
            warn: function () {},
          });
      },
    },
    e = {};
  function i(r) {
    var s = e[r];
    if (void 0 !== s) return s.exports;
    var n = (e[r] = { exports: {} });
    return t[r](n, n.exports, i), n.exports;
  }
  (() => {
    "use strict";
    i(287);
    let t = Float32Array;
    function e(e, i, r) {
      const s = new t(3);
      return e && (s[0] = e), i && (s[1] = i), r && (s[2] = r), s;
    }
    function r(e, i, r) {
      return (
        ((r = r || new t(3))[0] = e[0] + i[0]),
        (r[1] = e[1] + i[1]),
        (r[2] = e[2] + i[2]),
        r
      );
    }
    function s(e, i, r) {
      return (
        ((r = r || new t(3))[0] = e[0] * i[0]),
        (r[1] = e[1] * i[1]),
        (r[2] = e[2] * i[2]),
        r
      );
    }
    let n = Float32Array;
    function a(t) {
      return (
        ((t = t || new n(16))[0] = 1),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 0),
        (t[5] = 1),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 0),
        (t[9] = 0),
        (t[10] = 1),
        (t[11] = 0),
        (t[12] = 0),
        (t[13] = 0),
        (t[14] = 0),
        (t[15] = 1),
        t
      );
    }
    function o(t, e) {
      e = e || new n(16);
      const i = t[0],
        r = t[1],
        s = t[2],
        a = t[3],
        o = t[4],
        l = t[5],
        h = t[6],
        u = t[7],
        c = t[8],
        f = t[9],
        d = t[10],
        b = t[11],
        g = t[12],
        _ = t[13],
        p = t[14],
        m = t[15],
        v = d * m,
        x = p * b,
        T = h * m,
        w = p * u,
        y = h * b,
        A = d * u,
        E = s * m,
        C = p * a,
        M = s * b,
        S = d * a,
        k = s * u,
        D = h * a,
        F = c * _,
        R = g * f,
        I = o * _,
        U = g * l,
        P = o * f,
        O = c * l,
        z = i * _,
        B = g * r,
        N = i * f,
        G = c * r,
        L = i * l,
        H = o * r,
        j = v * l + w * f + y * _ - (x * l + T * f + A * _),
        V = x * r + E * f + S * _ - (v * r + C * f + M * _),
        q = T * r + C * l + k * _ - (w * r + E * l + D * _),
        W = A * r + M * l + D * f - (y * r + S * l + k * f),
        X = 1 / (i * j + o * V + c * q + g * W);
      return (
        (e[0] = X * j),
        (e[1] = X * V),
        (e[2] = X * q),
        (e[3] = X * W),
        (e[4] = X * (x * o + T * c + A * g - (v * o + w * c + y * g))),
        (e[5] = X * (v * i + C * c + M * g - (x * i + E * c + S * g))),
        (e[6] = X * (w * i + E * o + D * g - (T * i + C * o + k * g))),
        (e[7] = X * (y * i + S * o + k * c - (A * i + M * o + D * c))),
        (e[8] = X * (F * u + U * b + P * m - (R * u + I * b + O * m))),
        (e[9] = X * (R * a + z * b + G * m - (F * a + B * b + N * m))),
        (e[10] = X * (I * a + B * u + L * m - (U * a + z * u + H * m))),
        (e[11] = X * (O * a + N * u + H * b - (P * a + G * u + L * b))),
        (e[12] = X * (I * d + O * p + R * h - (P * p + F * h + U * d))),
        (e[13] = X * (N * p + F * s + B * d - (z * d + G * p + R * s))),
        (e[14] = X * (z * h + H * p + U * s - (L * p + I * s + B * h))),
        (e[15] = X * (L * d + P * s + G * h - (N * h + H * d + O * s))),
        e
      );
    }
    function l(t, i, r) {
      r = r || e();
      const s = i[0],
        n = i[1],
        a = i[2],
        o = s * t[3] + n * t[7] + a * t[11] + t[15];
      return (
        (r[0] = (s * t[0] + n * t[4] + a * t[8] + t[12]) / o),
        (r[1] = (s * t[1] + n * t[5] + a * t[9] + t[13]) / o),
        (r[2] = (s * t[2] + n * t[6] + a * t[10] + t[14]) / o),
        r
      );
    }
    function h(t, i, r) {
      r = r || e();
      const s = i[0],
        n = i[1],
        a = i[2];
      return (
        (r[0] = s * t[0] + n * t[4] + a * t[8]),
        (r[1] = s * t[1] + n * t[5] + a * t[9]),
        (r[2] = s * t[2] + n * t[6] + a * t[10]),
        r
      );
    }
    const u = 5120,
      c = 5121,
      f = 5122,
      d = 5123,
      b = 5124,
      g = 5125,
      _ = 5126,
      p = {};
    {
      const t = p;
      (t[u] = Int8Array),
        (t[c] = Uint8Array),
        (t[f] = Int16Array),
        (t[d] = Uint16Array),
        (t[b] = Int32Array),
        (t[g] = Uint32Array),
        (t[_] = Float32Array),
        (t[32819] = Uint16Array),
        (t[32820] = Uint16Array),
        (t[33635] = Uint16Array),
        (t[5131] = Uint16Array),
        (t[33640] = Uint32Array),
        (t[35899] = Uint32Array),
        (t[35902] = Uint32Array),
        (t[36269] = Uint32Array),
        (t[34042] = Uint32Array);
    }
    function m(t) {
      if (t instanceof Int8Array) return u;
      if (t instanceof Uint8Array) return c;
      if (t instanceof Uint8ClampedArray) return c;
      if (t instanceof Int16Array) return f;
      if (t instanceof Uint16Array) return d;
      if (t instanceof Int32Array) return b;
      if (t instanceof Uint32Array) return g;
      if (t instanceof Float32Array) return _;
      throw new Error("unsupported typed array type");
    }
    function v(t) {
      if (t === Int8Array) return u;
      if (t === Uint8Array) return c;
      if (t === Uint8ClampedArray) return c;
      if (t === Int16Array) return f;
      if (t === Uint16Array) return d;
      if (t === Int32Array) return b;
      if (t === Uint32Array) return g;
      if (t === Float32Array) return _;
      throw new Error("unsupported typed array type");
    }
    function x(t) {
      const e = p[t];
      if (!e) throw new Error("unknown gl type");
      return e;
    }
    const T =
      "undefined" != typeof SharedArrayBuffer
        ? function (t) {
            return (
              t &&
              t.buffer &&
              (t.buffer instanceof ArrayBuffer ||
                t.buffer instanceof SharedArrayBuffer)
            );
          }
        : function (t) {
            return t && t.buffer && t.buffer instanceof ArrayBuffer;
          };
    function w(...t) {
      console.error(...t);
    }
    const y = new Map();
    function A(t, e) {
      if (!t || "object" != typeof t) return !1;
      let i = y.get(e);
      i || ((i = new WeakMap()), y.set(e, i));
      let r = i.get(t);
      if (void 0 === r) {
        const s = Object.prototype.toString.call(t);
        (r = s.substring(8, s.length - 1) === e), i.set(t, r);
      }
      return r;
    }
    function E(t, e) {
      return "undefined" != typeof WebGLTexture && A(e, "WebGLTexture");
    }
    const C = 35044,
      M = 34962,
      S = 34963,
      k = 34660,
      D = 5120,
      F = 5121,
      R = 5122,
      I = 5123,
      U = 5124,
      P = 5125,
      O = 5126,
      z = { attribPrefix: "" };
    function B(t, e, i, r, s) {
      t.bindBuffer(e, i), t.bufferData(e, r, s || C);
    }
    function N(t, e, i, r) {
      if (((s = e), "undefined" != typeof WebGLBuffer && A(s, "WebGLBuffer")))
        return e;
      var s;
      i = i || M;
      const n = t.createBuffer();
      return B(t, i, n, e, r), n;
    }
    function G(t) {
      return "indices" === t;
    }
    function L(t) {
      return t.length ? t : t.data;
    }
    const H = /coord|texture/i,
      j = /color|colour/i;
    function V(t, e, i) {
      return (
        t.numComponents ||
        t.size ||
        (function (t, e) {
          let i;
          if (((i = H.test(t) ? 2 : j.test(t) ? 4 : 3), e % i > 0))
            throw new Error(
              `Can not guess numComponents for attribute '${t}'. Tried ${i} but ${e} values is not evenly divisible by ${i}. You should specify it.`
            );
          return i;
        })(e, i || L(t).length)
      );
    }
    function q(t, e) {
      if (T(t)) return t;
      if (T(t.data)) return t.data;
      Array.isArray(t) && (t = { data: t });
      let i = t.type ? W(t.type) : void 0;
      return i || (i = G(e) ? Uint16Array : Float32Array), new i(t.data);
    }
    function W(t) {
      return "number" == typeof t ? x(t) : t || Float32Array;
    }
    function X(t, e) {
      return {
        buffer: e.buffer,
        numValues: 24,
        type: ((i = e.type), "number" == typeof i ? i : i ? v(i) : O),
        arrayType: W(e.type),
      };
      var i;
    }
    function Z(t, e) {
      const i = e.data || e,
        r = W(e.type),
        s = i * r.BYTES_PER_ELEMENT,
        n = t.createBuffer();
      return (
        t.bindBuffer(M, n),
        t.bufferData(M, s, e.drawType || C),
        { buffer: n, numValues: i, type: v(r), arrayType: r }
      );
    }
    function K(t, e, i) {
      const r = q(e, i);
      return {
        arrayType: r.constructor,
        buffer: N(t, r, void 0, e.drawType),
        type: m(r),
        numValues: 0,
      };
    }
    function Y(t, e) {
      const i = {};
      return (
        Object.keys(e).forEach(function (r) {
          if (!G(r)) {
            const n = e[r],
              a = n.attrib || n.name || n.attribName || z.attribPrefix + r;
            if (n.value) {
              if (!Array.isArray(n.value) && !T(n.value))
                throw new Error("array.value is not array or typedarray");
              i[a] = { value: n.value };
            } else {
              let e;
              e =
                n.buffer && n.buffer instanceof WebGLBuffer
                  ? X
                  : "number" == typeof n || "number" == typeof n.data
                  ? Z
                  : K;
              const {
                  buffer: o,
                  type: l,
                  numValues: h,
                  arrayType: u,
                } = e(t, n, r),
                c =
                  void 0 !== n.normalize
                    ? n.normalize
                    : (s = u) === Int8Array || s === Uint8Array,
                f = V(n, r, h);
              i[a] = {
                buffer: o,
                numComponents: f,
                type: l,
                normalize: c,
                stride: n.stride || 0,
                offset: n.offset || 0,
                divisor: void 0 === n.divisor ? void 0 : n.divisor,
                drawType: n.drawType,
              };
            }
          }
          var s;
        }),
        t.bindBuffer(M, null),
        i
      );
    }
    const J = ["position", "positions", "a_position"];
    function Q(t, e) {
      let i, r;
      for (
        r = 0;
        r < J.length &&
        ((i = J[r]), !(i in e)) &&
        ((i = z.attribPrefix + i), !(i in e));
        ++r
      );
      r === J.length && (i = Object.keys(e)[0]);
      const s = e[i];
      if (!s.buffer) return 1;
      t.bindBuffer(M, s.buffer);
      const n = t.getBufferParameter(M, k);
      t.bindBuffer(M, null);
      var a;
      const o =
          n /
          ((a = s.type) === D || a === F
            ? 1
            : a === R || a === I
            ? 2
            : a === U || a === P || a === O
            ? 4
            : 0),
        l = s.numComponents || s.size,
        h = o / l;
      if (h % 1 != 0)
        throw new Error(`numComponents ${l} not correct for length ${length}`);
      return h;
    }
    function tt(t, e, i) {
      const r = Y(t, e),
        s = Object.assign({}, i || {});
      s.attribs = Object.assign({}, i ? i.attribs : {}, r);
      const n = e.indices;
      if (n) {
        const e = q(n, "indices");
        (s.indices = N(t, e, S)),
          (s.numElements = e.length),
          (s.elementType = m(e));
      } else s.numElements || (s.numElements = Q(t, s.attribs));
      return s;
    }
    function et(t, e, i) {
      const r = "indices" === i ? S : M;
      return N(t, q(e, i), r);
    }
    function it(t, e) {
      const i = {};
      return (
        Object.keys(e).forEach(function (r) {
          i[r] = et(t, e[r], r);
        }),
        e.indices
          ? ((i.numElements = e.indices.length),
            (i.elementType = m(q(e.indices))))
          : (i.numElements = (function (t) {
              let e, i;
              for (i = 0; i < J.length && ((e = J[i]), !(e in t)); ++i);
              i === J.length && (e = Object.keys(t)[0]);
              const r = t[e],
                s = L(r).length;
              if (void 0 === s) return 1;
              const n = V(r, e),
                a = s / n;
              if (s % n > 0)
                throw new Error(
                  `numComponents ${n} not correct for length ${s}`
                );
              return a;
            })(e)),
        i
      );
    }
    function rt(t, e) {
      let i = 0;
      return (
        (t.push = function () {
          for (let e = 0; e < arguments.length; ++e) {
            const r = arguments[e];
            if (r instanceof Array || T(r))
              for (let e = 0; e < r.length; ++e) t[i++] = r[e];
            else t[i++] = r;
          }
        }),
        (t.reset = function (t) {
          i = t || 0;
        }),
        (t.numComponents = e),
        Object.defineProperty(t, "numElements", {
          get: function () {
            return (this.length / this.numComponents) | 0;
          },
        }),
        t
      );
    }
    function st(t, e, i) {
      return rt(new (i || Float32Array)(t * e), t);
    }
    function nt(t, e, i) {
      const r = t.length,
        s = new Float32Array(3);
      for (let n = 0; n < r; n += 3)
        i(e, [t[n], t[n + 1], t[n + 2]], s),
          (t[n] = s[0]),
          (t[n + 1] = s[1]),
          (t[n + 2] = s[2]);
    }
    function at(t, i, r) {
      r = r || e();
      const s = i[0],
        n = i[1],
        a = i[2];
      return (
        (r[0] = s * t[0] + n * t[1] + a * t[2]),
        (r[1] = s * t[4] + n * t[5] + a * t[6]),
        (r[2] = s * t[8] + n * t[9] + a * t[10]),
        r
      );
    }
    function ot(t, e) {
      return nt(t, e, h), t;
    }
    function lt(t, e) {
      return nt(t, o(e), at), t;
    }
    function ht(t, e) {
      return nt(t, e, l), t;
    }
    function ut(t, e) {
      return (
        Object.keys(t).forEach(function (i) {
          const r = t[i];
          i.indexOf("pos") >= 0
            ? ht(r, e)
            : i.indexOf("tan") >= 0 || i.indexOf("binorm") >= 0
            ? ot(r, e)
            : i.indexOf("norm") >= 0 && lt(r, e);
        }),
        t
      );
    }
    function ct(t, e, i) {
      return (
        (t = t || 2),
        {
          position: {
            numComponents: 2,
            data: [
              (e = e || 0) + -1 * (t *= 0.5),
              (i = i || 0) + -1 * t,
              e + 1 * t,
              i + -1 * t,
              e + -1 * t,
              i + 1 * t,
              e + 1 * t,
              i + 1 * t,
            ],
          },
          normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
          texcoord: [0, 0, 1, 0, 0, 1, 1, 1],
          indices: [0, 1, 2, 2, 1, 3],
        }
      );
    }
    function ft(t, e, i, r, s) {
      (t = t || 1), (e = e || 1), (i = i || 1), (r = r || 1), (s = s || a());
      const n = (i + 1) * (r + 1),
        o = st(3, n),
        l = st(3, n),
        h = st(2, n);
      for (let s = 0; s <= r; s++)
        for (let n = 0; n <= i; n++) {
          const a = n / i,
            u = s / r;
          o.push(t * a - 0.5 * t, 0, e * u - 0.5 * e),
            l.push(0, 1, 0),
            h.push(a, u);
        }
      const u = i + 1,
        c = st(3, i * r * 2, Uint16Array);
      for (let t = 0; t < r; t++)
        for (let e = 0; e < i; e++)
          c.push((t + 0) * u + e, (t + 1) * u + e, (t + 0) * u + e + 1),
            c.push((t + 1) * u + e, (t + 1) * u + e + 1, (t + 0) * u + e + 1);
      return ut({ position: o, normal: l, texcoord: h, indices: c }, s);
    }
    function dt(t, e, i, r, s, n, a) {
      if (e <= 0 || i <= 0)
        throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
      (r = r || 0), (n = n || 0);
      const o = (s = s || Math.PI) - r,
        l = (a = a || 2 * Math.PI) - n,
        h = (e + 1) * (i + 1),
        u = st(3, h),
        c = st(3, h),
        f = st(2, h);
      for (let s = 0; s <= i; s++)
        for (let a = 0; a <= e; a++) {
          const h = a / e,
            d = s / i,
            b = l * h + n,
            g = o * d + r,
            _ = Math.sin(b),
            p = Math.cos(b),
            m = Math.sin(g),
            v = p * m,
            x = Math.cos(g),
            T = _ * m;
          u.push(t * v, t * x, t * T), c.push(v, x, T), f.push(1 - h, d);
        }
      const d = e + 1,
        b = st(3, e * i * 2, Uint16Array);
      for (let t = 0; t < e; t++)
        for (let e = 0; e < i; e++)
          b.push((e + 0) * d + t, (e + 0) * d + t + 1, (e + 1) * d + t),
            b.push((e + 1) * d + t, (e + 0) * d + t + 1, (e + 1) * d + t + 1);
      return { position: u, normal: c, texcoord: f, indices: b };
    }
    const bt = [
      [3, 7, 5, 1],
      [6, 2, 0, 4],
      [6, 7, 3, 2],
      [0, 1, 5, 4],
      [7, 6, 4, 5],
      [2, 3, 1, 0],
    ];
    function gt(t) {
      const e = (t = t || 1) / 2,
        i = [
          [-e, -e, -e],
          [+e, -e, -e],
          [-e, +e, -e],
          [+e, +e, -e],
          [-e, -e, +e],
          [+e, -e, +e],
          [-e, +e, +e],
          [+e, +e, +e],
        ],
        r = [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 1, 0],
          [0, -1, 0],
          [0, 0, 1],
          [0, 0, -1],
        ],
        s = [
          [1, 0],
          [0, 0],
          [0, 1],
          [1, 1],
        ],
        n = st(3, 24),
        a = st(3, 24),
        o = st(2, 24),
        l = st(3, 12, Uint16Array);
      for (let t = 0; t < 6; ++t) {
        const e = bt[t];
        for (let l = 0; l < 4; ++l) {
          const h = i[e[l]],
            u = r[t],
            c = s[l];
          n.push(h), a.push(u), o.push(c);
        }
        const h = 4 * t;
        l.push(h + 0, h + 1, h + 2), l.push(h + 0, h + 2, h + 3);
      }
      return { position: n, normal: a, texcoord: o, indices: l };
    }
    function _t(t, e, i, r, s, n, a) {
      if (r < 3) throw new Error("radialSubdivisions must be 3 or greater");
      if (s < 1) throw new Error("verticalSubdivisions must be 1 or greater");
      const o = void 0 === n || n,
        l = void 0 === a || a,
        h = (o ? 2 : 0) + (l ? 2 : 0),
        u = (r + 1) * (s + 1 + h),
        c = st(3, u),
        f = st(3, u),
        d = st(2, u),
        b = st(3, r * (s + h / 2) * 2, Uint16Array),
        g = r + 1,
        _ = Math.atan2(t - e, i),
        p = Math.cos(_),
        m = Math.sin(_),
        v = s + (l ? 2 : 0);
      for (let n = o ? -2 : 0; n <= v; ++n) {
        let a,
          o = n / s,
          l = i * o;
        n < 0
          ? ((l = 0), (o = 1), (a = t))
          : n > s
          ? ((l = i), (o = 1), (a = e))
          : (a = t + (n / s) * (e - t)),
          (-2 !== n && n !== s + 2) || ((a = 0), (o = 0)),
          (l -= i / 2);
        for (let t = 0; t < g; ++t) {
          const e = Math.sin((t * Math.PI * 2) / r),
            i = Math.cos((t * Math.PI * 2) / r);
          c.push(e * a, l, i * a),
            n < 0
              ? f.push(0, -1, 0)
              : n > s
              ? f.push(0, 1, 0)
              : 0 === a
              ? f.push(0, 0, 0)
              : f.push(e * p, m, i * p),
            d.push(t / r, 1 - o);
        }
      }
      for (let t = 0; t < s + h; ++t)
        if (!((1 === t && o) || (t === s + h - 2 && l)))
          for (let e = 0; e < r; ++e)
            b.push(
              g * (t + 0) + 0 + e,
              g * (t + 0) + 1 + e,
              g * (t + 1) + 1 + e
            ),
              b.push(
                g * (t + 0) + 0 + e,
                g * (t + 1) + 1 + e,
                g * (t + 1) + 0 + e
              );
      return { position: c, normal: f, texcoord: d, indices: b };
    }
    function pt(t, e) {
      e = e || [];
      const i = [];
      for (let r = 0; r < t.length; r += 4) {
        const s = t[r],
          n = t.slice(r + 1, r + 4);
        n.push.apply(n, e);
        for (let t = 0; t < s; ++t) i.push.apply(i, n);
      }
      return i;
    }
    function mt() {
      const t = [
          0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, 30, 0,
          0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0, 30, 60, 0,
          30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0, 0, 0, 30, 30,
          0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, 30, 0, 30, 100,
          0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, 30, 60, 30,
          67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30, 0, 0, 0,
          100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30, 100, 0, 0, 100,
          30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, 30, 30, 0, 30,
          30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, 30, 30, 0,
          30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30, 30, 60, 0,
          67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30, 67, 60, 0,
          67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, 30, 90, 0,
          30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, 30, 90, 0,
          30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30, 0, 150,
          0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0, 0, 0,
          0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
        ],
        e = pt([
          18, 0, 0, 1, 18, 0, 0, -1, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1,
          0, 0, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6,
          -1, 0, 0,
        ]),
        i = pt(
          [
            18, 200, 70, 120, 18, 80, 70, 200, 6, 70, 200, 210, 6, 200, 200, 70,
            6, 210, 100, 70, 6, 210, 160, 70, 6, 70, 180, 210, 6, 100, 70, 210,
            6, 76, 210, 100, 6, 140, 210, 80, 6, 90, 130, 110, 6, 160, 160, 220,
          ],
          [255]
        ),
        r = t.length / 3,
        s = {
          position: st(3, r),
          texcoord: st(2, r),
          normal: st(3, r),
          color: st(4, r, Uint8Array),
          indices: st(3, r / 3, Uint16Array),
        };
      s.position.push(t),
        s.texcoord.push([
          0.22, 0.19, 0.22, 0.79, 0.34, 0.19, 0.22, 0.79, 0.34, 0.79, 0.34,
          0.19, 0.34, 0.19, 0.34, 0.31, 0.62, 0.19, 0.34, 0.31, 0.62, 0.31,
          0.62, 0.19, 0.34, 0.43, 0.34, 0.55, 0.49, 0.43, 0.34, 0.55, 0.49,
          0.55, 0.49, 0.43, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0,
          1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0,
          1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0,
          1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0,
          1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0,
          0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1,
          0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1,
          0,
        ]),
        s.normal.push(e),
        s.color.push(i);
      for (let t = 0; t < r; ++t) s.indices.push(t);
      return s;
    }
    function vt(t, e, i, n, a, o, l) {
      if (a <= 0) throw new Error("subdivisionDown must be > 0");
      const h = (l = l || 1) - (o = o || 0),
        u = 2 * (a + 1) * 4,
        c = st(3, u),
        f = st(3, u),
        d = st(2, u);
      function b(t, e, i) {
        return t + (e - t) * i;
      }
      function g(e, i, l, u, g, _) {
        for (let p = 0; p <= a; p++) {
          const m = i / 1,
            v = p / a,
            x = 2 * (m - 0.5),
            T = (o + v * h) * Math.PI,
            w = Math.sin(T),
            y = Math.cos(T),
            A = b(t, e, w),
            E = x * n,
            C = y * t,
            M = w * A;
          c.push(E, C, M);
          const S = r(s([0, w, y], l), u);
          f.push(S), d.push(m * g + _, v);
        }
      }
      for (let t = 0; t < 2; t++) {
        const r = 2 * (t / 1 - 0.5);
        g(e, t, [1, 1, 1], [0, 0, 0], 1, 0),
          g(e, t, [0, 0, 0], [r, 0, 0], 0, 0),
          g(i, t, [1, 1, 1], [0, 0, 0], 1, 0),
          g(i, t, [0, 0, 0], [r, 0, 0], 0, 1);
      }
      const _ = st(3, 2 * a * 4, Uint16Array);
      function p(t, e) {
        for (let i = 0; i < a; ++i)
          _.push(t + i + 0, t + i + 1, e + i + 0),
            _.push(t + i + 1, e + i + 1, e + i + 0);
      }
      const m = a + 1;
      return (
        p(0 * m, 4 * m),
        p(5 * m, 7 * m),
        p(6 * m, 2 * m),
        p(3 * m, 1 * m),
        { position: c, normal: f, texcoord: d, indices: _ }
      );
    }
    function xt(t, e, i, r, s, n) {
      return _t(t, t, e, i, r, s, n);
    }
    function Tt(t, e, i, r, s, n) {
      if (i < 3) throw new Error("radialSubdivisions must be 3 or greater");
      if (r < 3) throw new Error("verticalSubdivisions must be 3 or greater");
      s = s || 0;
      const a = (n = n || 2 * Math.PI) - s,
        o = i + 1,
        l = r + 1,
        h = o * l,
        u = st(3, h),
        c = st(3, h),
        f = st(2, h),
        d = st(3, i * r * 2, Uint16Array);
      for (let n = 0; n < l; ++n) {
        const l = n / r,
          h = l * Math.PI * 2,
          d = Math.sin(h),
          b = t + d * e,
          g = Math.cos(h),
          _ = g * e;
        for (let t = 0; t < o; ++t) {
          const e = t / i,
            r = s + e * a,
            n = Math.sin(r),
            o = Math.cos(r),
            h = n * b,
            p = o * b,
            m = n * d,
            v = o * d;
          u.push(h, _, p), c.push(m, g, v), f.push(e, 1 - l);
        }
      }
      for (let t = 0; t < r; ++t)
        for (let e = 0; e < i; ++e) {
          const i = 1 + e,
            r = 1 + t;
          d.push(o * t + e, o * r + e, o * t + i),
            d.push(o * r + e, o * r + i, o * t + i);
        }
      return { position: u, normal: c, texcoord: f, indices: d };
    }
    function wt(t, e, i, r, s) {
      if (e < 3) throw new Error("divisions must be at least 3");
      (s = s || 1), (r = r || 0);
      const n = (e + 1) * ((i = i || 1) + 1),
        a = st(3, n),
        o = st(3, n),
        l = st(2, n),
        h = st(3, i * e * 2, Uint16Array);
      let u = 0;
      const c = t - r,
        f = e + 1;
      for (let t = 0; t <= i; ++t) {
        const n = r + c * Math.pow(t / i, s);
        for (let r = 0; r <= e; ++r) {
          const s = (2 * Math.PI * r) / e,
            c = n * Math.cos(s),
            d = n * Math.sin(s);
          if (
            (a.push(c, 0, d),
            o.push(0, 1, 0),
            l.push(1 - r / e, t / i),
            t > 0 && r !== e)
          ) {
            const t = u + (r + 1),
              e = u + r,
              i = u + r - f,
              s = u + (r + 1) - f;
            h.push(t, e, i), h.push(t, i, s);
          }
        }
        u += e + 1;
      }
      return { position: a, normal: o, texcoord: l, indices: h };
    }
    function yt(t) {
      return function (e) {
        return it(e, t.apply(this, Array.prototype.slice.call(arguments, 1)));
      };
    }
    function At(t) {
      return function (e) {
        return tt(e, t.apply(null, Array.prototype.slice.call(arguments, 1)));
      };
    }
    At(mt),
      yt(mt),
      At(gt),
      yt(gt),
      At(ft),
      yt(ft),
      At(dt),
      yt(dt),
      At(_t),
      yt(_t),
      At(ct),
      yt(ct),
      At(vt),
      yt(vt),
      At(xt),
      yt(xt),
      At(Tt),
      yt(Tt),
      At(wt),
      yt(wt);
    function Et(t) {
      return !!t.texStorage2D;
    }
    const Ct = (function () {
      const t = {},
        e = {};
      return function (i, r) {
        return (
          (function (i) {
            const r = i.constructor.name;
            if (!t[r]) {
              for (const t in i)
                if ("number" == typeof i[t]) {
                  const r = e[i[t]];
                  e[i[t]] = r ? `${r} | ${t}` : t;
                }
              t[r] = !0;
            }
          })(i),
          e[r] || ("number" == typeof r ? `0x${r.toString(16)}` : r)
        );
      };
    })();
    new Uint8Array([128, 192, 255, 255]),
      (function () {
        let t;
      })();
    const Mt = 6406,
      St = 6407,
      kt = 6408,
      Dt = 6409,
      Ft = 6410,
      Rt = 6402,
      It = 34041,
      Ut = 33319,
      Pt = 33320,
      Ot = 6403,
      zt = 36244,
      Bt = 36248,
      Nt = 36249,
      Gt = {};
    {
      const t = Gt;
      (t[Mt] = { numColorComponents: 1 }),
        (t[Dt] = { numColorComponents: 1 }),
        (t[Ft] = { numColorComponents: 2 }),
        (t[St] = { numColorComponents: 3 }),
        (t[kt] = { numColorComponents: 4 }),
        (t[Ot] = { numColorComponents: 1 }),
        (t[zt] = { numColorComponents: 1 }),
        (t[Ut] = { numColorComponents: 2 }),
        (t[Pt] = { numColorComponents: 2 }),
        (t[St] = { numColorComponents: 3 }),
        (t[Bt] = { numColorComponents: 3 }),
        (t[kt] = { numColorComponents: 4 }),
        (t[Nt] = { numColorComponents: 4 }),
        (t[Rt] = { numColorComponents: 1 }),
        (t[It] = { numColorComponents: 2 });
    }
    const Lt = w;
    function Ht(t) {
      return "undefined" != typeof document && document.getElementById
        ? document.getElementById(t)
        : null;
    }
    const jt = 33984,
      Vt = 34962,
      qt = 35713,
      Wt = 35714,
      Xt = 35632,
      Zt = 35633,
      Kt = 35981,
      Yt = 35718,
      Jt = 35721,
      $t = 35971,
      Qt = 35382,
      te = 35396,
      ee = 35398,
      ie = 35392,
      re = 35395,
      se = 5126,
      ne = 5124,
      ae = 5125,
      oe = 3553,
      le = 34067,
      he = 32879,
      ue = 35866,
      ce = {};
    function fe(t, e) {
      return ce[e].bindPoint;
    }
    function de(t, e) {
      return function (i) {
        t.uniform1i(e, i);
      };
    }
    function be(t, e) {
      return function (i) {
        t.uniform1iv(e, i);
      };
    }
    function ge(t, e) {
      return function (i) {
        t.uniform2iv(e, i);
      };
    }
    function _e(t, e) {
      return function (i) {
        t.uniform3iv(e, i);
      };
    }
    function pe(t, e) {
      return function (i) {
        t.uniform4iv(e, i);
      };
    }
    function me(t, e, i, r) {
      const s = fe(0, e);
      return Et(t)
        ? function (e) {
            let n, a;
            !e || E(0, e)
              ? ((n = e), (a = null))
              : ((n = e.texture), (a = e.sampler)),
              t.uniform1i(r, i),
              t.activeTexture(jt + i),
              t.bindTexture(s, n),
              t.bindSampler(i, a);
          }
        : function (e) {
            t.uniform1i(r, i), t.activeTexture(jt + i), t.bindTexture(s, e);
          };
    }
    function ve(t, e, i, r, s) {
      const n = fe(0, e),
        a = new Int32Array(s);
      for (let t = 0; t < s; ++t) a[t] = i + t;
      return Et(t)
        ? function (e) {
            t.uniform1iv(r, a),
              e.forEach(function (e, r) {
                let s, o;
                t.activeTexture(jt + a[r]),
                  !e || E(0, e)
                    ? ((s = e), (o = null))
                    : ((s = e.texture), (o = e.sampler)),
                  t.bindSampler(i, o),
                  t.bindTexture(n, s);
              });
          }
        : function (e) {
            t.uniform1iv(r, a),
              e.forEach(function (e, i) {
                t.activeTexture(jt + a[i]), t.bindTexture(n, e);
              });
          };
    }
    function xe(t, e) {
      return function (i) {
        if (i.value)
          switch ((t.disableVertexAttribArray(e), i.value.length)) {
            case 4:
              t.vertexAttrib4fv(e, i.value);
              break;
            case 3:
              t.vertexAttrib3fv(e, i.value);
              break;
            case 2:
              t.vertexAttrib2fv(e, i.value);
              break;
            case 1:
              t.vertexAttrib1fv(e, i.value);
              break;
            default:
              throw new Error(
                "the length of a float constant value must be between 1 and 4!"
              );
          }
        else
          t.bindBuffer(Vt, i.buffer),
            t.enableVertexAttribArray(e),
            t.vertexAttribPointer(
              e,
              i.numComponents || i.size,
              i.type || se,
              i.normalize || !1,
              i.stride || 0,
              i.offset || 0
            ),
            t.vertexAttribDivisor && t.vertexAttribDivisor(e, i.divisor || 0);
      };
    }
    function Te(t, e) {
      return function (i) {
        if (i.value) {
          if ((t.disableVertexAttribArray(e), 4 !== i.value.length))
            throw new Error(
              "The length of an integer constant value must be 4!"
            );
          t.vertexAttrib4iv(e, i.value);
        } else
          t.bindBuffer(Vt, i.buffer),
            t.enableVertexAttribArray(e),
            t.vertexAttribIPointer(
              e,
              i.numComponents || i.size,
              i.type || ne,
              i.stride || 0,
              i.offset || 0
            ),
            t.vertexAttribDivisor && t.vertexAttribDivisor(e, i.divisor || 0);
      };
    }
    function we(t, e) {
      return function (i) {
        if (i.value) {
          if ((t.disableVertexAttribArray(e), 4 !== i.value.length))
            throw new Error(
              "The length of an unsigned integer constant value must be 4!"
            );
          t.vertexAttrib4uiv(e, i.value);
        } else
          t.bindBuffer(Vt, i.buffer),
            t.enableVertexAttribArray(e),
            t.vertexAttribIPointer(
              e,
              i.numComponents || i.size,
              i.type || ae,
              i.stride || 0,
              i.offset || 0
            ),
            t.vertexAttribDivisor && t.vertexAttribDivisor(e, i.divisor || 0);
      };
    }
    function ye(t, e, i) {
      const r = i.size,
        s = i.count;
      return function (i) {
        t.bindBuffer(Vt, i.buffer);
        const n = i.size || i.numComponents || r,
          a = n / s,
          o = i.type || se,
          l = ce[o].size * n,
          h = i.normalize || !1,
          u = i.offset || 0,
          c = l / s;
        for (let r = 0; r < s; ++r)
          t.enableVertexAttribArray(e + r),
            t.vertexAttribPointer(e + r, a, o, h, l, u + c * r),
            t.vertexAttribDivisor &&
              t.vertexAttribDivisor(e + r, i.divisor || 0);
      };
    }
    (ce[5126] = {
      Type: Float32Array,
      size: 4,
      setter: function (t, e) {
        return function (i) {
          t.uniform1f(e, i);
        };
      },
      arraySetter: function (t, e) {
        return function (i) {
          t.uniform1fv(e, i);
        };
      },
    }),
      (ce[35664] = {
        Type: Float32Array,
        size: 8,
        setter: function (t, e) {
          return function (i) {
            t.uniform2fv(e, i);
          };
        },
        cols: 2,
      }),
      (ce[35665] = {
        Type: Float32Array,
        size: 12,
        setter: function (t, e) {
          return function (i) {
            t.uniform3fv(e, i);
          };
        },
        cols: 3,
      }),
      (ce[35666] = {
        Type: Float32Array,
        size: 16,
        setter: function (t, e) {
          return function (i) {
            t.uniform4fv(e, i);
          };
        },
        cols: 4,
      }),
      (ce[ne] = { Type: Int32Array, size: 4, setter: de, arraySetter: be }),
      (ce[35667] = { Type: Int32Array, size: 8, setter: ge, cols: 2 }),
      (ce[35668] = { Type: Int32Array, size: 12, setter: _e, cols: 3 }),
      (ce[35669] = { Type: Int32Array, size: 16, setter: pe, cols: 4 }),
      (ce[5125] = {
        Type: Uint32Array,
        size: 4,
        setter: function (t, e) {
          return function (i) {
            t.uniform1ui(e, i);
          };
        },
        arraySetter: function (t, e) {
          return function (i) {
            t.uniform1uiv(e, i);
          };
        },
      }),
      (ce[36294] = {
        Type: Uint32Array,
        size: 8,
        setter: function (t, e) {
          return function (i) {
            t.uniform2uiv(e, i);
          };
        },
        cols: 2,
      }),
      (ce[36295] = {
        Type: Uint32Array,
        size: 12,
        setter: function (t, e) {
          return function (i) {
            t.uniform3uiv(e, i);
          };
        },
        cols: 3,
      }),
      (ce[36296] = {
        Type: Uint32Array,
        size: 16,
        setter: function (t, e) {
          return function (i) {
            t.uniform4uiv(e, i);
          };
        },
        cols: 4,
      }),
      (ce[35670] = { Type: Uint32Array, size: 4, setter: de, arraySetter: be }),
      (ce[35671] = { Type: Uint32Array, size: 8, setter: ge, cols: 2 }),
      (ce[35672] = { Type: Uint32Array, size: 12, setter: _e, cols: 3 }),
      (ce[35673] = { Type: Uint32Array, size: 16, setter: pe, cols: 4 }),
      (ce[35674] = {
        Type: Float32Array,
        size: 32,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix2fv(e, !1, i);
          };
        },
        rows: 2,
        cols: 2,
      }),
      (ce[35675] = {
        Type: Float32Array,
        size: 48,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix3fv(e, !1, i);
          };
        },
        rows: 3,
        cols: 3,
      }),
      (ce[35676] = {
        Type: Float32Array,
        size: 64,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix4fv(e, !1, i);
          };
        },
        rows: 4,
        cols: 4,
      }),
      (ce[35685] = {
        Type: Float32Array,
        size: 32,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix2x3fv(e, !1, i);
          };
        },
        rows: 2,
        cols: 3,
      }),
      (ce[35686] = {
        Type: Float32Array,
        size: 32,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix2x4fv(e, !1, i);
          };
        },
        rows: 2,
        cols: 4,
      }),
      (ce[35687] = {
        Type: Float32Array,
        size: 48,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix3x2fv(e, !1, i);
          };
        },
        rows: 3,
        cols: 2,
      }),
      (ce[35688] = {
        Type: Float32Array,
        size: 48,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix3x4fv(e, !1, i);
          };
        },
        rows: 3,
        cols: 4,
      }),
      (ce[35689] = {
        Type: Float32Array,
        size: 64,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix4x2fv(e, !1, i);
          };
        },
        rows: 4,
        cols: 2,
      }),
      (ce[35690] = {
        Type: Float32Array,
        size: 64,
        setter: function (t, e) {
          return function (i) {
            t.uniformMatrix4x3fv(e, !1, i);
          };
        },
        rows: 4,
        cols: 3,
      }),
      (ce[35678] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: oe,
      }),
      (ce[35680] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: le,
      }),
      (ce[35679] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: he,
      }),
      (ce[35682] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: oe,
      }),
      (ce[36289] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: ue,
      }),
      (ce[36292] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: ue,
      }),
      (ce[36293] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: le,
      }),
      (ce[36298] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: oe,
      }),
      (ce[36299] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: he,
      }),
      (ce[36300] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: le,
      }),
      (ce[36303] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: ue,
      }),
      (ce[36306] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: oe,
      }),
      (ce[36307] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: he,
      }),
      (ce[36308] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: le,
      }),
      (ce[36311] = {
        Type: null,
        size: 0,
        setter: me,
        arraySetter: ve,
        bindPoint: ue,
      });
    const Ae = {};
    (Ae[5126] = { size: 4, setter: xe }),
      (Ae[35664] = { size: 8, setter: xe }),
      (Ae[35665] = { size: 12, setter: xe }),
      (Ae[35666] = { size: 16, setter: xe }),
      (Ae[ne] = { size: 4, setter: Te }),
      (Ae[35667] = { size: 8, setter: Te }),
      (Ae[35668] = { size: 12, setter: Te }),
      (Ae[35669] = { size: 16, setter: Te }),
      (Ae[5125] = { size: 4, setter: we }),
      (Ae[36294] = { size: 8, setter: we }),
      (Ae[36295] = { size: 12, setter: we }),
      (Ae[36296] = { size: 16, setter: we }),
      (Ae[35670] = { size: 4, setter: Te }),
      (Ae[35671] = { size: 8, setter: Te }),
      (Ae[35672] = { size: 12, setter: Te }),
      (Ae[35673] = { size: 16, setter: Te }),
      (Ae[35674] = { size: 4, setter: ye, count: 2 }),
      (Ae[35675] = { size: 9, setter: ye, count: 3 }),
      (Ae[35676] = { size: 16, setter: ye, count: 4 });
    const Ee = /ERROR:\s*\d+:(\d+)/gi;
    const Ce = /^[ \t]*\n/;
    function Me(t) {
      let e = 0;
      return (
        Ce.test(t) && ((e = 1), (t = t.replace(Ce, ""))),
        { lineOffset: e, shaderSource: t }
      );
    }
    function Se(t, e) {
      return (
        t.errorCallback(e),
        t.callback &&
          setTimeout(() => {
            t.callback(`${e}\n${t.errors.join("\n")}`);
          }),
        null
      );
    }
    function ke(t, e, i, r) {
      r = r || Lt;
      if (!t.getShaderParameter(i, qt)) {
        const s = t.getShaderInfoLog(i),
          { lineOffset: n, shaderSource: a } = Me(t.getShaderSource(i)),
          o = `${(function (t, e = "", i = 0) {
            const r = [...e.matchAll(Ee)],
              s = new Map(
                r.map((t, i) => {
                  const s = parseInt(t[1]),
                    n = r[i + 1],
                    a = n ? n.index : e.length;
                  return [s - 1, e.substring(t.index, a)];
                })
              );
            return t
              .split("\n")
              .map((t, e) => {
                const r = s.get(e);
                return `${e + 1 + i}: ${t}${r ? `\n\n^^^ ${r}` : ""}`;
              })
              .join("\n");
          })(a, s, n)}\nError compiling ${Ct(t, e)}: ${s}`;
        return r(o), o;
      }
      return "";
    }
    function De(t, e, i) {
      let r, s, n;
      if (
        ("function" == typeof e && ((i = e), (e = void 0)),
        "function" == typeof t)
      )
        (i = t), (t = void 0);
      else if (t && !Array.isArray(t)) {
        const e = t;
        (i = e.errorCallback),
          (t = e.attribLocations),
          (r = e.transformFeedbackVaryings),
          (s = e.transformFeedbackMode),
          (n = e.callback);
      }
      const a = i || Lt,
        o = [],
        l = {
          errorCallback(t, ...e) {
            o.push(t), a(t, ...e);
          },
          transformFeedbackVaryings: r,
          transformFeedbackMode: s,
          callback: n,
          errors: o,
        };
      {
        let i = {};
        Array.isArray(t)
          ? t.forEach(function (t, r) {
              i[t] = e ? e[r] : r;
            })
          : (i = t || {}),
          (l.attribLocations = i);
      }
      return l;
    }
    const Fe = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
    const Re = (t = 0) => new Promise((e) => setTimeout(e, t));
    function Ie(t, e, i) {
      const r = t.createProgram(),
        {
          attribLocations: s,
          transformFeedbackVaryings: n,
          transformFeedbackMode: a,
        } = De(i);
      for (let i = 0; i < e.length; ++i) {
        let s = e[i];
        if ("string" == typeof s) {
          const e = Ht(s),
            n = e ? e.text : s;
          let a = t[Fe[i]];
          e &&
            e.type &&
            (a =
              ((o = e.type).indexOf("frag") >= 0
                ? Xt
                : o.indexOf("vert") >= 0
                ? Zt
                : void 0) || a),
            (s = t.createShader(a)),
            t.shaderSource(s, Me(n).shaderSource),
            t.compileShader(s),
            t.attachShader(r, s);
        }
      }
      var o;
      Object.entries(s).forEach(([e, i]) => t.bindAttribLocation(r, i, e));
      {
        let e = n;
        e &&
          (e.attribs && (e = e.attribs),
          Array.isArray(e) || (e = Object.keys(e)),
          t.transformFeedbackVaryings(r, e, a || Kt));
      }
      return t.linkProgram(r), r;
    }
    function Ue(t, e, i, r, s) {
      const n = De(i, r, s),
        a = new Set(e),
        o = Ie(t, e, n);
      function l(t, e) {
        const i = ze(t, e, n.errorCallback);
        return (
          i &&
            (function (t, e, i) {
              const r = t.getAttachedShaders(e);
              for (const e of r) i.has(e) && t.deleteShader(e);
              t.deleteProgram(e);
            })(t, e, a),
          i
        );
      }
      if (!n.callback) return l(t, o) ? void 0 : o;
      Oe(t, o).then(() => {
        const e = l(t, o);
        n.callback(e, e ? void 0 : o);
      });
    }
    function Pe(t) {
      return function (e, i, ...r) {
        return new Promise((s, n) => {
          const a = De(...r);
          (a.callback = (t, e) => {
            t ? n(t) : s(e);
          }),
            t(e, i, a);
        });
      };
    }
    Pe(Ue), Pe(Je);
    async function Oe(t, e) {
      const i = t.getExtension("KHR_parallel_shader_compile"),
        r = i
          ? (t, e) => t.getProgramParameter(e, i.COMPLETION_STATUS_KHR)
          : () => !0;
      let s = 0;
      do {
        await Re(s), (s = 1e3 / 60);
      } while (!r(t, e));
    }
    function ze(t, e, i) {
      i = i || Lt;
      if (!t.getProgramParameter(e, Wt)) {
        const r = t.getProgramInfoLog(e);
        i(`Error in program linking: ${r}`);
        return `${r}\n${t
          .getAttachedShaders(e)
          .map((e) => ke(t, t.getShaderParameter(e, t.SHADER_TYPE), e, i))
          .filter((t) => t)
          .join("\n")}`;
      }
    }
    function Be(t, e, i, r, s) {
      return Ue(t, e, i, r, s);
    }
    function Ne(t) {
      const e = t.name;
      return e.startsWith("gl_") || e.startsWith("webgl_");
    }
    const Ge = /(\.|\[|]|\w+)/g,
      Le = (t) => t >= "0" && t <= "9";
    function He(t, e, i, r) {
      const s = t.split(Ge).filter((t) => "" !== t);
      let n = 0,
        a = "";
      for (;;) {
        const t = s[n++];
        a += t;
        const o = Le(t[0]),
          l = o ? parseInt(t) : t;
        o && (a += s[n++]);
        if (n === s.length) {
          i[l] = e;
          break;
        }
        {
          const t = s[n++],
            e = "[" === t,
            o = i[l] || (e ? [] : {});
          (i[l] = o),
            (i = o),
            (r[a] =
              r[a] ||
              (function (t) {
                return function (e) {
                  We(t, e);
                };
              })(o)),
            (a += t);
        }
      }
    }
    function je(t, e) {
      let i = 0;
      function r(e, r, s) {
        const n = r.name.endsWith("[0]"),
          a = r.type,
          o = ce[a];
        if (!o) throw new Error(`unknown type: 0x${a.toString(16)}`);
        let l;
        if (o.bindPoint) {
          const e = i;
          (i += r.size),
            (l = n
              ? o.arraySetter(t, a, e, s, r.size)
              : o.setter(t, a, e, s, r.size));
        } else l = o.arraySetter && n ? o.arraySetter(t, s) : o.setter(t, s);
        return (l.location = s), l;
      }
      const s = {},
        n = {},
        a = t.getProgramParameter(e, Yt);
      for (let i = 0; i < a; ++i) {
        const a = t.getActiveUniform(e, i);
        if (Ne(a)) continue;
        let o = a.name;
        o.endsWith("[0]") && (o = o.substr(0, o.length - 3));
        const l = t.getUniformLocation(e, a.name);
        if (l) {
          const t = r(0, a, l);
          (s[o] = t), He(o, t, n, s);
        }
      }
      return s;
    }
    function Ve(t, e) {
      const i = {},
        r = t.getProgramParameter(e, $t);
      for (let s = 0; s < r; ++s) {
        const r = t.getTransformFeedbackVarying(e, s);
        i[r.name] = { index: s, type: r.type, size: r.size };
      }
      return i;
    }
    function qe(t, e) {
      const i = t.getProgramParameter(e, Yt),
        r = [],
        s = [];
      for (let n = 0; n < i; ++n) {
        s.push(n), r.push({});
        const i = t.getActiveUniform(e, n);
        r[n].name = i.name;
      }
      [
        ["UNIFORM_TYPE", "type"],
        ["UNIFORM_SIZE", "size"],
        ["UNIFORM_BLOCK_INDEX", "blockNdx"],
        ["UNIFORM_OFFSET", "offset"],
      ].forEach(function (i) {
        const n = i[0],
          a = i[1];
        t.getActiveUniforms(e, s, t[n]).forEach(function (t, e) {
          r[e][a] = t;
        });
      });
      const n = {},
        a = t.getProgramParameter(e, Qt);
      for (let i = 0; i < a; ++i) {
        const r = t.getActiveUniformBlockName(e, i),
          s = {
            index: t.getUniformBlockIndex(e, r),
            usedByVertexShader: t.getActiveUniformBlockParameter(e, i, te),
            usedByFragmentShader: t.getActiveUniformBlockParameter(e, i, ee),
            size: t.getActiveUniformBlockParameter(e, i, ie),
            uniformIndices: t.getActiveUniformBlockParameter(e, i, re),
          };
        (s.used = s.usedByVertexShader || s.usedByFragmentShader), (n[r] = s);
      }
      return { blockSpecs: n, uniformData: r };
    }
    function We(t, e) {
      for (const i in e) {
        const r = t[i];
        "function" == typeof r ? r(e[i]) : We(t[i], e[i]);
      }
    }
    function Xe(t, ...e) {
      const i = t.uniformSetters || t,
        r = e.length;
      for (let t = 0; t < r; ++t) {
        const r = e[t];
        if (Array.isArray(r)) {
          const t = r.length;
          for (let e = 0; e < t; ++e) Xe(i, r[e]);
        } else
          for (const t in r) {
            const e = i[t];
            e && e(r[t]);
          }
      }
    }
    function Ze(t, e) {
      const i = {},
        r = t.getProgramParameter(e, Jt);
      for (let s = 0; s < r; ++s) {
        const r = t.getActiveAttrib(e, s);
        if (Ne(r)) continue;
        const n = t.getAttribLocation(e, r.name),
          a = Ae[r.type],
          o = a.setter(t, n, a);
        (o.location = n), (i[r.name] = o);
      }
      return i;
    }
    function Ke(t, e) {
      const i = {
        program: e,
        uniformSetters: je(t, e),
        attribSetters: Ze(t, e),
      };
      return (
        Et(t) &&
          ((i.uniformBlockSpec = qe(t, e)),
          (i.transformFeedbackInfo = Ve(t, e))),
        i
      );
    }
    const Ye = /\s|{|}|;/;
    function Je(t, e, i, r, s) {
      const n = De(i, r, s),
        a = [];
      if (
        ((e = e.map(function (t) {
          if (!Ye.test(t)) {
            const e = Ht(t);
            if (e) t = e.text;
            else {
              const e = `no element with id: ${t}`;
              n.errorCallback(e), a.push(e);
            }
          }
          return t;
        })),
        a.length)
      )
        return Se(n, "");
      const o = n.callback;
      o &&
        (n.callback = (e, i) => {
          o(e, e ? void 0 : Ke(t, i));
        });
      const l = Be(t, e, n);
      return l ? Ke(t, l) : null;
    }
    function $e(t, e, i, r, s) {
      for (const [n, a] of Object.entries(e)) {
        const o = { ...s },
          l = i[n];
        Array.isArray(l) || Object.assign(o, l);
        const h = ze(t, a, o.errorCallback);
        if (h) {
          for (const i of Object.values(e)) {
            const e = t.getAttachedShaders(i);
            t.deleteProgram(i);
            for (const i of e) r.has(i) || t.deleteShader(i);
          }
          return h;
        }
      }
    }
    function Qe(t, e, i = {}) {
      const r = new Set(),
        s = Object.fromEntries(
          Object.entries(e).map(([e, s]) => {
            const n = { ...i },
              a = Array.isArray(s) ? s : s.shaders;
            return (
              Array.isArray(s) || Object.assign(n, s),
              a.forEach(r.add, r),
              [e, Ie(t, a, n)]
            );
          })
        );
      if (i.callback)
        return void (async function (t, e) {
          for (const i of Object.values(e)) await Oe(t, i);
        })(t, s).then(() => {
          const n = $e(t, s, e, r, i);
          i.callback(n, n ? void 0 : s);
        });
      return $e(t, s, e, r, i) ? void 0 : s;
    }
    function ti(t, e, i) {
      function r(t, e) {
        return Object.fromEntries(
          Object.entries(e).map(([e, i]) => [e, Ke(t, i)])
        );
      }
      const s = (i = De(i)).callback;
      s &&
        (i.callback = (e, i) => {
          s(e, e ? void 0 : r(t, i));
        });
      const n = Qe(t, e, i);
      if (!s && n) return r(t, n);
    }
    Pe(Qe), Pe(ti);
    const ei = 36096,
      ii = 33306,
      ri = {};
    (ri[34041] = ii),
      (ri[6401] = 36128),
      (ri[36168] = 36128),
      (ri[6402] = ei),
      (ri[33189] = ei),
      (ri[33190] = ei),
      (ri[36012] = ei),
      (ri[35056] = ii),
      (ri[36013] = ii);
    const si = {};
    (si[32854] = !0),
      (si[32855] = !0),
      (si[36194] = !0),
      (si[34041] = !0),
      (si[33189] = !0),
      (si[6401] = !0),
      (si[36168] = !0);
    var ni = {};
    const ai = {
      position: 3,
      normal: 3,
      tangent: 3,
      texcoord: 2,
      texcoord0: 2,
      texcoord1: 2,
      texcoord2: 2,
    };
    var oi = {};
    class li {
      constructor() {
        this.attribs = {};
      }
      disableAll() {
        for (let t in this.attribs)
          this.gl.disableVertexAttribArray(this.attribs[t]);
        this.attribs = {};
      }
      enable(t, e) {
        this.gl = t;
        var i = {};
        for (let s in e) {
          var r = e[s];
          void 0 !== r.loc &&
            (void 0 === this.attribs[r.loc] && t.enableVertexAttribArray(r.loc),
            t.vertexAttribPointer(
              r.loc,
              r.size,
              r.type,
              !1,
              r.stride,
              r.offset
            ),
            (i[r.loc] = r.loc),
            (this.attribs[s] = null));
        }
        for (let t in this.attribs);
        this.attribs = i;
      }
    }
    class hi {
      static CreateProgramAttributes(t, e) {
        var i = {},
          r = 0;
        for (let a in e) {
          var s = e[a],
            n = ai[a];
          (i[s] = { type: t.FLOAT, size: n, offset: 4 * r }), (r += n);
        }
        for (let t in i) i[t].stride = 4 * r;
        return i;
      }
      CleanUpPrograms() {
        oi = {};
      }
      ReleaseProgram(t) {}
      static _GetProgram(t) {
        return oi[t];
      }
      static RegisterProgram(t, e) {
        if (!oi[t]) {
          var i = e.shaders;
          oi[t] = { shaders: [i[0], i[1]], attributes: e.attributes };
        }
        return oi[t];
      }
      static GetProgram(t, e, i, r) {
        var s = oi[e],
          n = "";
        for (var a in i) n += a + ":" + i[a] + "-";
        if (!s) {
          var o = e.split("."),
            l = ni[o[0]][o[1]];
          l && (s = hi.RegisterProgram(e, l));
        }
        if (!s) throw "Program not registered: " + o;
        s.programInfo || (s.programInfo = {}),
          (s.programInfo[n] = hi.CompileProgram(t, s.shaders, i)),
          (r =
            r || (s.attributes && hi.CreateProgramAttributes(t, s.attributes)));
        var h = s.programInfo[n];
        if (r)
          for (var a in r) {
            var u = h.attribSetters[a];
            u && ((r[a] = r[a] || {}), (r[a].loc = u.location));
          }
        return (h.attributes = r), h;
      }
      static CompileProgram(t, e, i, r) {
        var s = "";
        for (var n in i) {
          var a = i[n];
          s = "#define " + n + " " + (null === a ? "" : a) + "\n";
        }
        var o = {};
        const l = Je(t, [s + e[0], s + e[1]], null, null);
        if (r)
          for (var n in r) {
            var h = l.attribSetters[n];
            h && ((r[n] = r[n] || {}), (r[n].loc = h.location));
          }
        for (var n in l.uniformSetters) o[n] = l.uniformSetters[n].location;
        return (l.uniforms = o), l;
      }
    }
    var ui = new hi(),
      ci = 1e-6,
      fi = "undefined" != typeof Float32Array ? Float32Array : Array;
    Math.random;
    Math.PI;
    function di() {
      var t = new fi(3);
      return fi != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), t;
    }
    function bi(t) {
      var e = new fi(3);
      return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
    }
    function gi(t) {
      var e = t[0],
        i = t[1],
        r = t[2];
      return Math.hypot(e, i, r);
    }
    function _i(t, e, i) {
      var r = new fi(3);
      return (r[0] = t), (r[1] = e), (r[2] = i), r;
    }
    function pi(t, e) {
      return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
    }
    function mi(t, e, i, r) {
      return (t[0] = e), (t[1] = i), (t[2] = r), t;
    }
    function vi(t, e, i) {
      return (
        (t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), (t[2] = e[2] + i[2]), t
      );
    }
    function xi(t, e, i) {
      return (
        (t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), (t[2] = e[2] - i[2]), t
      );
    }
    function Ti(t, e, i) {
      return (
        (t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), (t[2] = e[2] * i[2]), t
      );
    }
    function wi(t, e, i) {
      return (
        (t[0] = Math.min(e[0], i[0])),
        (t[1] = Math.min(e[1], i[1])),
        (t[2] = Math.min(e[2], i[2])),
        t
      );
    }
    function yi(t, e, i) {
      return (
        (t[0] = Math.max(e[0], i[0])),
        (t[1] = Math.max(e[1], i[1])),
        (t[2] = Math.max(e[2], i[2])),
        t
      );
    }
    function Ai(t, e, i) {
      return (t[0] = e[0] * i), (t[1] = e[1] * i), (t[2] = e[2] * i), t;
    }
    function Ei(t, e, i, r) {
      return (
        (t[0] = e[0] + i[0] * r),
        (t[1] = e[1] + i[1] * r),
        (t[2] = e[2] + i[2] * r),
        t
      );
    }
    function Ci(t) {
      var e = t[0],
        i = t[1],
        r = t[2];
      return e * e + i * i + r * r;
    }
    function Mi(t, e) {
      return (t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), t;
    }
    function Si(t, e) {
      var i = e[0],
        r = e[1],
        s = e[2],
        n = i * i + r * r + s * s;
      return (
        n > 0 && (n = 1 / Math.sqrt(n)),
        (t[0] = e[0] * n),
        (t[1] = e[1] * n),
        (t[2] = e[2] * n),
        t
      );
    }
    function ki(t, e) {
      return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
    }
    function Di(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2],
        a = i[0],
        o = i[1],
        l = i[2];
      return (
        (t[0] = s * l - n * o),
        (t[1] = n * a - r * l),
        (t[2] = r * o - s * a),
        t
      );
    }
    function Fi(t, e, i, r) {
      var s = e[0],
        n = e[1],
        a = e[2];
      return (
        (t[0] = s + r * (i[0] - s)),
        (t[1] = n + r * (i[1] - n)),
        (t[2] = a + r * (i[2] - a)),
        t
      );
    }
    function Ri(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2],
        a = i[3] * r + i[7] * s + i[11] * n + i[15];
      return (
        (a = a || 1),
        (t[0] = (i[0] * r + i[4] * s + i[8] * n + i[12]) / a),
        (t[1] = (i[1] * r + i[5] * s + i[9] * n + i[13]) / a),
        (t[2] = (i[2] * r + i[6] * s + i[10] * n + i[14]) / a),
        t
      );
    }
    function Ii(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2];
      return (
        (t[0] = r * i[0] + s * i[3] + n * i[6]),
        (t[1] = r * i[1] + s * i[4] + n * i[7]),
        (t[2] = r * i[2] + s * i[5] + n * i[8]),
        t
      );
    }
    Math.hypot ||
      (Math.hypot = function () {
        for (var t = 0, e = arguments.length; e--; )
          t += arguments[e] * arguments[e];
        return Math.sqrt(t);
      });
    var Ui,
      Pi = xi,
      Oi = gi;
    Ui = di();
    function zi() {
      var t = new fi(16);
      return (
        fi != Float32Array &&
          ((t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[11] = 0),
          (t[12] = 0),
          (t[13] = 0),
          (t[14] = 0)),
        (t[0] = 1),
        (t[5] = 1),
        (t[10] = 1),
        (t[15] = 1),
        t
      );
    }
    function Bi(t, e) {
      return (
        (t[0] = e[0]),
        (t[1] = e[1]),
        (t[2] = e[2]),
        (t[3] = e[3]),
        (t[4] = e[4]),
        (t[5] = e[5]),
        (t[6] = e[6]),
        (t[7] = e[7]),
        (t[8] = e[8]),
        (t[9] = e[9]),
        (t[10] = e[10]),
        (t[11] = e[11]),
        (t[12] = e[12]),
        (t[13] = e[13]),
        (t[14] = e[14]),
        (t[15] = e[15]),
        t
      );
    }
    function Ni(t, e, i, r, s, n, a, o, l, h, u, c, f, d, b, g) {
      var _ = new fi(16);
      return (
        (_[0] = t),
        (_[1] = e),
        (_[2] = i),
        (_[3] = r),
        (_[4] = s),
        (_[5] = n),
        (_[6] = a),
        (_[7] = o),
        (_[8] = l),
        (_[9] = h),
        (_[10] = u),
        (_[11] = c),
        (_[12] = f),
        (_[13] = d),
        (_[14] = b),
        (_[15] = g),
        _
      );
    }
    function Gi(t) {
      return (
        (t[0] = 1),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 0),
        (t[5] = 1),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 0),
        (t[9] = 0),
        (t[10] = 1),
        (t[11] = 0),
        (t[12] = 0),
        (t[13] = 0),
        (t[14] = 0),
        (t[15] = 1),
        t
      );
    }
    function Li(t, e) {
      if (t === e) {
        var i = e[1],
          r = e[2],
          s = e[3],
          n = e[6],
          a = e[7],
          o = e[11];
        (t[1] = e[4]),
          (t[2] = e[8]),
          (t[3] = e[12]),
          (t[4] = i),
          (t[6] = e[9]),
          (t[7] = e[13]),
          (t[8] = r),
          (t[9] = n),
          (t[11] = e[14]),
          (t[12] = s),
          (t[13] = a),
          (t[14] = o);
      } else
        (t[0] = e[0]),
          (t[1] = e[4]),
          (t[2] = e[8]),
          (t[3] = e[12]),
          (t[4] = e[1]),
          (t[5] = e[5]),
          (t[6] = e[9]),
          (t[7] = e[13]),
          (t[8] = e[2]),
          (t[9] = e[6]),
          (t[10] = e[10]),
          (t[11] = e[14]),
          (t[12] = e[3]),
          (t[13] = e[7]),
          (t[14] = e[11]),
          (t[15] = e[15]);
      return t;
    }
    function Hi(t, e) {
      var i = e[0],
        r = e[1],
        s = e[2],
        n = e[3],
        a = e[4],
        o = e[5],
        l = e[6],
        h = e[7],
        u = e[8],
        c = e[9],
        f = e[10],
        d = e[11],
        b = e[12],
        g = e[13],
        _ = e[14],
        p = e[15],
        m = i * o - r * a,
        v = i * l - s * a,
        x = i * h - n * a,
        T = r * l - s * o,
        w = r * h - n * o,
        y = s * h - n * l,
        A = u * g - c * b,
        E = u * _ - f * b,
        C = u * p - d * b,
        M = c * _ - f * g,
        S = c * p - d * g,
        k = f * p - d * _,
        D = m * k - v * S + x * M + T * C - w * E + y * A;
      return D
        ? ((D = 1 / D),
          (t[0] = (o * k - l * S + h * M) * D),
          (t[1] = (s * S - r * k - n * M) * D),
          (t[2] = (g * y - _ * w + p * T) * D),
          (t[3] = (f * w - c * y - d * T) * D),
          (t[4] = (l * C - a * k - h * E) * D),
          (t[5] = (i * k - s * C + n * E) * D),
          (t[6] = (_ * x - b * y - p * v) * D),
          (t[7] = (u * y - f * x + d * v) * D),
          (t[8] = (a * S - o * C + h * A) * D),
          (t[9] = (r * C - i * S - n * A) * D),
          (t[10] = (b * w - g * x + p * m) * D),
          (t[11] = (c * x - u * w - d * m) * D),
          (t[12] = (o * E - a * M - l * A) * D),
          (t[13] = (i * M - r * E + s * A) * D),
          (t[14] = (g * v - b * T - _ * m) * D),
          (t[15] = (u * T - c * v + f * m) * D),
          t)
        : null;
    }
    function ji(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2],
        a = e[3],
        o = e[4],
        l = e[5],
        h = e[6],
        u = e[7],
        c = e[8],
        f = e[9],
        d = e[10],
        b = e[11],
        g = e[12],
        _ = e[13],
        p = e[14],
        m = e[15],
        v = i[0],
        x = i[1],
        T = i[2],
        w = i[3];
      return (
        (t[0] = v * r + x * o + T * c + w * g),
        (t[1] = v * s + x * l + T * f + w * _),
        (t[2] = v * n + x * h + T * d + w * p),
        (t[3] = v * a + x * u + T * b + w * m),
        (v = i[4]),
        (x = i[5]),
        (T = i[6]),
        (w = i[7]),
        (t[4] = v * r + x * o + T * c + w * g),
        (t[5] = v * s + x * l + T * f + w * _),
        (t[6] = v * n + x * h + T * d + w * p),
        (t[7] = v * a + x * u + T * b + w * m),
        (v = i[8]),
        (x = i[9]),
        (T = i[10]),
        (w = i[11]),
        (t[8] = v * r + x * o + T * c + w * g),
        (t[9] = v * s + x * l + T * f + w * _),
        (t[10] = v * n + x * h + T * d + w * p),
        (t[11] = v * a + x * u + T * b + w * m),
        (v = i[12]),
        (x = i[13]),
        (T = i[14]),
        (w = i[15]),
        (t[12] = v * r + x * o + T * c + w * g),
        (t[13] = v * s + x * l + T * f + w * _),
        (t[14] = v * n + x * h + T * d + w * p),
        (t[15] = v * a + x * u + T * b + w * m),
        t
      );
    }
    function Vi(t, e, i) {
      var r,
        s,
        n,
        a,
        o,
        l,
        h,
        u,
        c,
        f,
        d,
        b,
        g = i[0],
        _ = i[1],
        p = i[2];
      return (
        e === t
          ? ((t[12] = e[0] * g + e[4] * _ + e[8] * p + e[12]),
            (t[13] = e[1] * g + e[5] * _ + e[9] * p + e[13]),
            (t[14] = e[2] * g + e[6] * _ + e[10] * p + e[14]),
            (t[15] = e[3] * g + e[7] * _ + e[11] * p + e[15]))
          : ((r = e[0]),
            (s = e[1]),
            (n = e[2]),
            (a = e[3]),
            (o = e[4]),
            (l = e[5]),
            (h = e[6]),
            (u = e[7]),
            (c = e[8]),
            (f = e[9]),
            (d = e[10]),
            (b = e[11]),
            (t[0] = r),
            (t[1] = s),
            (t[2] = n),
            (t[3] = a),
            (t[4] = o),
            (t[5] = l),
            (t[6] = h),
            (t[7] = u),
            (t[8] = c),
            (t[9] = f),
            (t[10] = d),
            (t[11] = b),
            (t[12] = r * g + o * _ + c * p + e[12]),
            (t[13] = s * g + l * _ + f * p + e[13]),
            (t[14] = n * g + h * _ + d * p + e[14]),
            (t[15] = a * g + u * _ + b * p + e[15])),
        t
      );
    }
    function qi(t, e, i) {
      var r = i[0],
        s = i[1],
        n = i[2];
      return (
        (t[0] = e[0] * r),
        (t[1] = e[1] * r),
        (t[2] = e[2] * r),
        (t[3] = e[3] * r),
        (t[4] = e[4] * s),
        (t[5] = e[5] * s),
        (t[6] = e[6] * s),
        (t[7] = e[7] * s),
        (t[8] = e[8] * n),
        (t[9] = e[9] * n),
        (t[10] = e[10] * n),
        (t[11] = e[11] * n),
        (t[12] = e[12]),
        (t[13] = e[13]),
        (t[14] = e[14]),
        (t[15] = e[15]),
        t
      );
    }
    function Wi(t, e, i) {
      var r = Math.sin(i),
        s = Math.cos(i),
        n = e[4],
        a = e[5],
        o = e[6],
        l = e[7],
        h = e[8],
        u = e[9],
        c = e[10],
        f = e[11];
      return (
        e !== t &&
          ((t[0] = e[0]),
          (t[1] = e[1]),
          (t[2] = e[2]),
          (t[3] = e[3]),
          (t[12] = e[12]),
          (t[13] = e[13]),
          (t[14] = e[14]),
          (t[15] = e[15])),
        (t[4] = n * s + h * r),
        (t[5] = a * s + u * r),
        (t[6] = o * s + c * r),
        (t[7] = l * s + f * r),
        (t[8] = h * s - n * r),
        (t[9] = u * s - a * r),
        (t[10] = c * s - o * r),
        (t[11] = f * s - l * r),
        t
      );
    }
    function Xi(t, e, i) {
      var r = Math.sin(i),
        s = Math.cos(i),
        n = e[0],
        a = e[1],
        o = e[2],
        l = e[3],
        h = e[8],
        u = e[9],
        c = e[10],
        f = e[11];
      return (
        e !== t &&
          ((t[4] = e[4]),
          (t[5] = e[5]),
          (t[6] = e[6]),
          (t[7] = e[7]),
          (t[12] = e[12]),
          (t[13] = e[13]),
          (t[14] = e[14]),
          (t[15] = e[15])),
        (t[0] = n * s - h * r),
        (t[1] = a * s - u * r),
        (t[2] = o * s - c * r),
        (t[3] = l * s - f * r),
        (t[8] = n * r + h * s),
        (t[9] = a * r + u * s),
        (t[10] = o * r + c * s),
        (t[11] = l * r + f * s),
        t
      );
    }
    function Zi(t, e, i) {
      var r = Math.sin(i),
        s = Math.cos(i),
        n = e[0],
        a = e[1],
        o = e[2],
        l = e[3],
        h = e[4],
        u = e[5],
        c = e[6],
        f = e[7];
      return (
        e !== t &&
          ((t[8] = e[8]),
          (t[9] = e[9]),
          (t[10] = e[10]),
          (t[11] = e[11]),
          (t[12] = e[12]),
          (t[13] = e[13]),
          (t[14] = e[14]),
          (t[15] = e[15])),
        (t[0] = n * s + h * r),
        (t[1] = a * s + u * r),
        (t[2] = o * s + c * r),
        (t[3] = l * s + f * r),
        (t[4] = h * s - n * r),
        (t[5] = u * s - a * r),
        (t[6] = c * s - o * r),
        (t[7] = f * s - l * r),
        t
      );
    }
    function Ki(t, e) {
      return (
        (t[0] = 1),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 0),
        (t[5] = 1),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 0),
        (t[9] = 0),
        (t[10] = 1),
        (t[11] = 0),
        (t[12] = e[0]),
        (t[13] = e[1]),
        (t[14] = e[2]),
        (t[15] = 1),
        t
      );
    }
    function Yi(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2],
        a = e[3],
        o = r + r,
        l = s + s,
        h = n + n,
        u = r * o,
        c = r * l,
        f = r * h,
        d = s * l,
        b = s * h,
        g = n * h,
        _ = a * o,
        p = a * l,
        m = a * h;
      return (
        (t[0] = 1 - (d + g)),
        (t[1] = c + m),
        (t[2] = f - p),
        (t[3] = 0),
        (t[4] = c - m),
        (t[5] = 1 - (u + g)),
        (t[6] = b + _),
        (t[7] = 0),
        (t[8] = f + p),
        (t[9] = b - _),
        (t[10] = 1 - (u + d)),
        (t[11] = 0),
        (t[12] = i[0]),
        (t[13] = i[1]),
        (t[14] = i[2]),
        (t[15] = 1),
        t
      );
    }
    function Ji(t, e) {
      return (t[0] = e[12]), (t[1] = e[13]), (t[2] = e[14]), t;
    }
    function $i(t, e) {
      var i = e[0],
        r = e[1],
        s = e[2],
        n = e[4],
        a = e[5],
        o = e[6],
        l = e[8],
        h = e[9],
        u = e[10];
      return (
        (t[0] = Math.hypot(i, r, s)),
        (t[1] = Math.hypot(n, a, o)),
        (t[2] = Math.hypot(l, h, u)),
        t
      );
    }
    var Qi = function (t, e, i, r, s) {
      var n,
        a = 1 / Math.tan(e / 2);
      return (
        (t[0] = a / i),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 0),
        (t[5] = a),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 0),
        (t[9] = 0),
        (t[11] = -1),
        (t[12] = 0),
        (t[13] = 0),
        (t[15] = 0),
        null != s && s !== 1 / 0
          ? ((n = 1 / (r - s)), (t[10] = (s + r) * n), (t[14] = 2 * s * r * n))
          : ((t[10] = -1), (t[14] = -2 * r)),
        t
      );
    };
    var tr = ji;
    const er = { 147259: !0 },
      ir = {
        28060: !0,
        28063: !0,
        28082: !0,
        41903: !0,
        42147: !0,
        44808: !0,
        45271: !0,
      },
      rr = {
        2: { GeosetType: 15, Original: 2, Override: 11 },
        3: { GeosetType: 15, Original: 3, Override: 12 },
        4: { GeosetType: 15, Original: 4, Override: 13 },
        5: { GeosetType: 15, Original: 5, Override: 14 },
        6: { GeosetType: 15, Original: 6, Override: 15 },
        7: { GeosetType: 15, Original: 7, Override: 16 },
        8: { GeosetType: 15, Original: 8, Override: 17 },
        9: { GeosetType: 15, Original: 9, Override: 18 },
        10: { GeosetType: 15, Original: 10, Override: 19 },
        11: { GeosetType: 12, Original: 2, Override: 0 },
        12: { GeosetType: 12, Original: 3, Override: 0 },
        13: { GeosetType: 12, Original: 1, Override: 5 },
        14: { GeosetType: 12, Original: 2, Override: 3 },
        15: { GeosetType: 12, Original: 2, Override: 2 },
        16: { GeosetType: 22, Original: 2, Override: 1 },
        17: { GeosetType: 22, Original: 1, Override: 2 },
        18: { GeosetType: 22, Original: 1, Override: 3 },
        19: { GeosetType: 22, Original: 2, Override: 3 },
        20: { GeosetType: 12, Original: 1, Override: 1 },
        21: { GeosetType: 12, Original: 1, Override: 9 },
        22: { GeosetType: 12, Original: 2, Override: 10 },
        23: { GeosetType: 12, Original: 2, Override: 6 },
        24: { GeosetType: 12, Original: 1, Override: 5 },
        25: { GeosetType: 27, Original: 0, Override: 1 },
        26: { GeosetType: 27, Original: 0, Override: 1 },
        27: { GeosetType: 27, Original: 0, Override: 1 },
        28: { GeosetType: 13, Original: 1, Override: 0 },
        31: { GeosetType: 12, Original: 1, Override: 13 },
        32: { GeosetType: 12, Original: 2, Override: 14 },
        33: { GeosetType: 42, Original: 11, Override: 1 },
      },
      sr = {
        ITEM: 1,
        HELM: 2,
        SHOULDER: 4,
        NPC: 8,
        CHARACTER: 16,
        HUMANOIDNPC: 32,
        OBJECT: 64,
        ARMOR: 128,
        PATH: 256,
        ITEMVISUAL: 512,
        COLLECTION: 1024,
      },
      nr = [
        0, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 21, 22, 22, 16, 21, 0, 19, 5,
        21, 22, 22, 0, 21, 21, 27,
      ],
      ar = [
        0, 16, 0, 15, 1, 8, 10, 5, 6, 6, 7, 0, 0, 17, 18, 19, 14, 20, 0, 9, 8,
        21, 22, 23, 0, 24, 25, 0,
      ],
      or = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 22, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
      ],
      lr = [
        0, 2, 0, 4, 128, 128, 128, 128, 128, 128, 128, 0, 0, 1, 1, 1, 128, 1, 0,
        128, 128, 1, 1, 1, 0, 1, 1, 2,
      ],
      hr = [13, 14, 15, 16, 17, 88, 89],
      ur = [8, 9, 10, 11, 12, 86, 87],
      cr = {
        77: [5, 1, 0, -1, 5, 0, 0, -1],
        76: [10, 0, 1, 1, 10, 0, 1, 1],
        75: [10, 0, 1, 1, 10, 0, 1, 1],
        74: [5, 1, 0, -1, 5, 0, 0, -1],
        73: [5, 1, 0, -1, 5, 0, 0, -1],
        72: [5, 1, 0, -1, 5, 0, 0, -1],
        71: [5, 1, 0, -1, 5, 0, 0, -1],
        37: [7, 0, 7, 1, 7, 0, 7, 1],
        36: [2, 0, 2, 1, 2, 0, 2, 1],
        34: [3, 0, 3, 1, 3, 0, 3, 1],
        33: [5, 1, 0, -1, 5, 0, 0, -1],
        31: [0, -1, 8, 1, 0, -1, 8, 1],
        30: [11, 0, 11, 1, 11, 0, 11, 1],
        29: [10, 0, 10, 1, 10, 0, 10, 1],
        28: [6, 0, 6, 1, 6, 0, 6, 1],
        27: [4, 0, 4, 1, 4, 0, 4, 1],
        26: [24, 0, 24, 1, 24, 0, 24, 1],
        25: [24, 0, 24, 1, 24, 0, 24, 1],
        23: [1, 0, 1, 1, 1, 0, 1, 1],
        15: [5, 0, 5, 1, 5, 0, 5, 1],
      },
      fr = {
        21: 26,
        22: 27,
        15: 28,
        17: 26,
        25: 32,
        13: 32,
        23: 33,
        14: 28,
        26: 26,
      },
      dr = {
        0: { 21: 26, 22: 27 },
        1: { 21: 26, 22: 27 },
        2: { 21: 30, 22: 31 },
        3: { 21: 32, 22: 33 },
        4: { 21: 26, 22: 27, 15: 28 },
        5: { 21: 26 },
        6: { 21: 26, 22: 27 },
        7: { 21: 26, 22: 27 },
        8: { 21: 26, 22: 27 },
        9: { 21: 33, 22: 28 },
      };
    function br() {
      var t = new fi(4);
      return (
        fi != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0)),
        t
      );
    }
    function gr(t) {
      var e = new fi(4);
      return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
    }
    function _r(t, e, i, r) {
      var s = new fi(4);
      return (s[0] = t), (s[1] = e), (s[2] = i), (s[3] = r), s;
    }
    function pr(t, e) {
      return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
    }
    function mr(t, e, i) {
      return (
        (t[0] = e[0] + i[0]),
        (t[1] = e[1] + i[1]),
        (t[2] = e[2] + i[2]),
        (t[3] = e[3] + i[3]),
        t
      );
    }
    function vr(t, e, i) {
      return (
        (t[0] = e[0] - i[0]),
        (t[1] = e[1] - i[1]),
        (t[2] = e[2] - i[2]),
        (t[3] = e[3] - i[3]),
        t
      );
    }
    function xr(t, e, i) {
      return (
        (t[0] = e[0] * i),
        (t[1] = e[1] * i),
        (t[2] = e[2] * i),
        (t[3] = e[3] * i),
        t
      );
    }
    function Tr(t) {
      var e = t[0],
        i = t[1],
        r = t[2],
        s = t[3];
      return Math.hypot(e, i, r, s);
    }
    function wr(t, e) {
      var i = e[0],
        r = e[1],
        s = e[2],
        n = e[3],
        a = i * i + r * r + s * s + n * n;
      return (
        a > 0 && (a = 1 / Math.sqrt(a)),
        (t[0] = i * a),
        (t[1] = r * a),
        (t[2] = s * a),
        (t[3] = n * a),
        t
      );
    }
    function yr(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2],
        a = e[3];
      return (
        (t[0] = i[0] * r + i[4] * s + i[8] * n + i[12] * a),
        (t[1] = i[1] * r + i[5] * s + i[9] * n + i[13] * a),
        (t[2] = i[2] * r + i[6] * s + i[10] * n + i[14] * a),
        (t[3] = i[3] * r + i[7] * s + i[11] * n + i[15] * a),
        t
      );
    }
    var Ar = Tr;
    !(function () {
      var t = br();
    })();
    const Er = class {
      constructor(t) {
        var e = this;
        (e.a = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.b = _r(t.getFloat(), t.getFloat(), t.getFloat(), 0)),
          (e.c = t.getFloat()),
          (e.d = t.getFloat()),
          (e.e = t.getFloat()),
          (e.f = t.getFloat()),
          (e.g = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
          (e.h = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
          (e.i = bi(e.a)),
          (e.j = gr(e.b));
      }
      l() {
        var t = this;
        (t.a = null),
          (t.b = null),
          (t.g = null),
          (t.h = null),
          (t.i = null),
          (t.j = null);
      }
    };
    const Cr = class {
      constructor(t) {
        var e = this;
        (e.a = t.getUint16()),
          (e.b = t.getUint16()),
          (e.g = t.getUint32()),
          (e.c = t.getUint32()),
          (e.d = t.getUint16()),
          (e.e = t.getUint16()),
          (e.f = t.getUint16()),
          (e.h = t.getInt16()),
          (e.i = t.getUint16()),
          t.getBool() && (e.j = t.getString());
      }
      k() {}
    };
    function Mr() {
      var t = new fi(2);
      return fi != Float32Array && ((t[0] = 0), (t[1] = 0)), t;
    }
    function Sr(t, e) {
      var i = new fi(2);
      return (i[0] = t), (i[1] = e), i;
    }
    function kr(t, e, i) {
      return (t[0] = e), (t[1] = i), t;
    }
    function Dr(t, e, i) {
      return (t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), t;
    }
    function Fr(t, e, i) {
      return (t[0] = e[0] * i), (t[1] = e[1] * i), t;
    }
    !(function () {
      var t = Mr();
    })();
    function Rr() {
      var t = new fi(9);
      return (
        fi != Float32Array &&
          ((t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[5] = 0),
          (t[6] = 0),
          (t[7] = 0)),
        (t[0] = 1),
        (t[4] = 1),
        (t[8] = 1),
        t
      );
    }
    function Ir(t, e) {
      return (
        (t[0] = e[0]),
        (t[1] = e[1]),
        (t[2] = e[2]),
        (t[3] = e[4]),
        (t[4] = e[5]),
        (t[5] = e[6]),
        (t[6] = e[8]),
        (t[7] = e[9]),
        (t[8] = e[10]),
        t
      );
    }
    function Ur(t, e, i) {
      var r = e[0],
        s = e[1],
        n = e[2],
        a = e[3],
        o = e[4],
        l = e[5],
        h = e[6],
        u = e[7],
        c = e[8],
        f = i[0],
        d = i[1],
        b = i[2],
        g = i[3],
        _ = i[4],
        p = i[5],
        m = i[6],
        v = i[7],
        x = i[8];
      return (
        (t[0] = f * r + d * a + b * h),
        (t[1] = f * s + d * o + b * u),
        (t[2] = f * n + d * l + b * c),
        (t[3] = g * r + _ * a + p * h),
        (t[4] = g * s + _ * o + p * u),
        (t[5] = g * n + _ * l + p * c),
        (t[6] = m * r + v * a + x * h),
        (t[7] = m * s + v * o + x * u),
        (t[8] = m * n + v * l + x * c),
        t
      );
    }
    function Pr() {
      var t = new fi(4);
      return (
        fi != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)),
        (t[3] = 1),
        t
      );
    }
    function Or(t, e, i) {
      i *= 0.5;
      var r = Math.sin(i);
      return (
        (t[0] = r * e[0]),
        (t[1] = r * e[1]),
        (t[2] = r * e[2]),
        (t[3] = Math.cos(i)),
        t
      );
    }
    function zr(t, e, i, r) {
      var s,
        n,
        a,
        o,
        l,
        h = e[0],
        u = e[1],
        c = e[2],
        f = e[3],
        d = i[0],
        b = i[1],
        g = i[2],
        _ = i[3];
      return (
        (n = h * d + u * b + c * g + f * _) < 0 &&
          ((n = -n), (d = -d), (b = -b), (g = -g), (_ = -_)),
        1 - n > ci
          ? ((s = Math.acos(n)),
            (a = Math.sin(s)),
            (o = Math.sin((1 - r) * s) / a),
            (l = Math.sin(r * s) / a))
          : ((o = 1 - r), (l = r)),
        (t[0] = o * h + l * d),
        (t[1] = o * u + l * b),
        (t[2] = o * c + l * g),
        (t[3] = o * f + l * _),
        t
      );
    }
    var Br,
      Nr,
      Gr,
      Lr,
      Hr,
      jr,
      Vr = pr,
      qr = function (t, e, i, r, s) {
        return (t[0] = e), (t[1] = i), (t[2] = r), (t[3] = s), t;
      },
      Wr = wr;
    (Br = di()),
      (Nr = _i(1, 0, 0)),
      (Gr = _i(0, 1, 0)),
      (Lr = Pr()),
      (Hr = Pr()),
      (jr = Rr());
    class Xr {
      constructor() {
        (this.a = -1), (this.b = null), (this.c = 0);
      }
    }
    class Zr {
      constructor() {
        (this.a = new Xr()), (this.b = new Xr()), (this.c = 0), (this.d = !1);
      }
    }
    class Kr {
      f() {
        var t = this;
        if (t.b) for (var e = 0; e < t.b.length; ++e) t.b[e] = null;
        return (t.a = null), (t.b = null), null;
      }
      k(t, e, i, r) {
        let s = this;
        if (
          (null == r && (r = this.g()),
          this.d >= 0 && (t = this.d < e.length ? e[this.d] : e[0]),
          0 != s.c || s.b.length > 1)
        ) {
          if (s.a.length > 1) {
            var n = s.a[s.a.length - 1];
            n > 0 && t > n && this.d < 0 && (t %= n);
            for (var a = 0, o = s.a.length, l = 0; l < o; ++l)
              if (t >= s.a[l] && t < s.a[l + 1]) {
                a = l;
                break;
              }
            var h = s.a[a],
              u = s.a[a + 1],
              c = 0;
            return (
              h != u && (c = (t - h) / (u - h)),
              1 == s.c ? s.h(s.b[a], s.b[a + 1], c, r) : (r = s.i(r, s.b[a]))
            );
          }
          return s.b.length > 0 ? (r = s.i(r, s.b[0])) : i;
        }
        return 0 == s.b.length ? r : (r = s.i(r, s.b[0]));
      }
      l(t) {
        var e,
          i = this;
        (i.c = t.getInt16()), (i.d = t.getInt16()), (i.e = t.getBool());
        var r = t.getInt32();
        for (i.a = new Array(r), e = 0; e < r; ++e) i.a[e] = t.getInt32();
        var s = t.getInt32();
        for (i.b = new Array(s), e = 0; e < s; ++e) i.b[e] = i.j(t);
      }
    }
    class Yr extends Kr {
      constructor(t) {
        super();
        (this.ba = di()), this.l(t);
      }
      g() {
        return di();
      }
      h(t, e, i, r) {
        return Fi(r, t, e, i);
      }
      i(t, e) {
        return pi(t, e), t;
      }
      j(t) {
        return mi(di(), t.getFloat(), t.getFloat(), t.getFloat());
      }
    }
    class Jr extends Kr {
      constructor(t) {
        super();
        this.l(t), (this.ba = Pr());
      }
      g() {
        return Pr();
      }
      h(t, e, i, r) {
        return zr(r, t, e, i);
      }
      i(t, e) {
        return Vr(t, e), t;
      }
      j(t) {
        return qr(
          Pr(),
          -t.getFloat(),
          -t.getFloat(),
          -t.getFloat(),
          t.getFloat()
        );
      }
    }
    class $r extends Kr {
      constructor(t) {
        super();
        this.l(t);
      }
      j(t) {
        return t.getUint16();
      }
      g() {
        return 0;
      }
      h(t, e, i, r) {
        return t + (e - t) * i;
      }
      i(t, e) {
        return e;
      }
    }
    class Qr extends $r {
      j(t) {
        return t.getFloat();
      }
    }
    class ts extends $r {
      j(t) {
        return t.getUint8();
      }
    }
    class es {
      d() {
        for (var t = this, e = 0; e < t.b.length; ++e) t.b[e] = null;
        return (t.a = null), (t.b = null), (t.c = null), null;
      }
      i(t, e, i, r) {
        let s = this;
        i || (i = this.e());
        let n = r || s.b;
        if (s.b.length > 1 && s.a.length > 1) {
          var a = s.a[s.a.length - 1];
          a > 0 && t > a && (t %= a);
          for (var o = 0, l = s.a.length, h = 0; h < l - 1; ++h)
            if (t > s.a[h] && t <= s.a[h + 1]) {
              o = h;
              break;
            }
          var u = s.a[o],
            c = s.a[o + 1],
            f = 0;
          return u != c && (f = (t - u) / (c - u)), s.f(n[o], n[o + 1], f, i);
        }
        return n.length > 0 ? (i = s.g(i, n[0])) : e;
      }
      j(t) {
        var e,
          i = this,
          r = t.getInt32();
        for (i.a = new Array(r), e = 0; e < r; ++e)
          i.a[e] = t.getInt16() / 32767;
        var s = t.getInt32();
        for (i.b = new Array(s), e = 0; e < s; ++e) i.b[e] = i.h(t);
      }
    }
    class is extends es {
      constructor(t) {
        super();
        (this.ba = Mr()), this.j(t);
      }
      e() {
        return Mr();
      }
      f(t, e, i, r) {
        return (
          (s = r),
          (a = e),
          (o = i),
          (l = (n = t)[0]),
          (h = n[1]),
          (s[0] = l + o * (a[0] - l)),
          (s[1] = h + o * (a[1] - h)),
          s
        );
        var s, n, a, o, l, h;
      }
      g(t, e) {
        var i, r;
        return (r = e), ((i = t)[0] = r[0]), (i[1] = r[1]), t;
      }
      h(t) {
        return kr(Mr(), t.getFloat(), t.getFloat());
      }
    }
    class rs extends es {
      constructor(t) {
        super();
        this.j(t);
      }
      e() {
        return di();
      }
      f(t, e, i, r) {
        return Fi(r, t, e, i);
      }
      g(t, e) {
        return pi(t, e), t;
      }
      h(t) {
        return mi(di(), t.getFloat(), t.getFloat(), t.getFloat());
      }
    }
    class ss extends es {
      constructor(t) {
        super();
        this.j(t);
      }
      e() {
        return 0;
      }
      f(t, e, i, r) {
        return t + (e - t) * i;
      }
      g(t, e) {
        return t;
      }
      h(t) {
        return t.getUint16();
      }
    }
    class ns {
      constructor(t, e) {
        this.b(t, e);
      }
      b(t, e) {
        var i = t.getInt32();
        this.a = new Array(i);
        for (let r = 0; r < i; ++r) this.a[r] = new e(t);
      }
      c(t) {
        return (
          !(!this.a || 0 == this.a.length) &&
          (t >= this.a.length && (t = 0), this.a[t].e)
        );
      }
      d(t, e, i, r) {
        if (!this.a || 0 == this.a.length) return i;
        let s = t.a.a;
        s >= this.a.length && (s = 0);
        let n = this.a[s].k(t.a.c, e, i, r);
        if (t.c > 0 && t.c < 1) {
          let s = this.a[0].g(),
            a = t.b.a;
          a >= this.a.length && (a = 0);
          let o = this.a[a].k(t.b.c, e, i, s);
          o || (o = s),
            (s = this.a[0].g()),
            (n = this.a[0].h(o, n, t.c, s)),
            r && this.a[0].i(r, s);
        }
        return n;
      }
      e() {
        if (this.a && 0 != this.a.length) {
          for (var t = 0; t < this.a.length; ++t)
            this.a[t].f(), (this.a[t] = null);
          return null;
        }
      }
    }
    function as(t, e) {
      return _r(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2], 0);
    }
    function os(t, e, i) {
      for (let r = 0; r < 4; r++) t[4 * e + r] = i[r];
    }
    const ls = class {
      constructor(t, e, i) {
        (this.v = null), (this.w = null), (this.x = null);
        var r = this;
        (r.a = t),
          (r.b = e),
          (r.c = i.getInt32()),
          (r.d = i.getUint32()),
          (r.e = i.getInt16()),
          (r.f = i.getUint16()),
          (r.g = i.getUint32()),
          (r.h = _i(i.getFloat(), i.getFloat(), i.getFloat())),
          (r.i = new ns(i, Yr)),
          (r.j = new ns(i, Jr)),
          (r.k = new ns(i, Yr)),
          (r.l = di()),
          (r.m = zi()),
          (r.n = zi()),
          (r.o = zi()),
          (r.p = di()),
          (r.q = Pr()),
          (r.r = zi()),
          (r.s = !1),
          (r.t = !1),
          (r.u = !1);
      }
      A() {
        var t = this;
        (t.a = null),
          (t.h = null),
          (t.l = null),
          (t.m = null),
          (t.p = null),
          (t.q = null),
          (t.r = null),
          t.i.e(),
          t.j.e(),
          t.k.e(),
          (t.i = null),
          (t.j = null),
          (t.k = null);
      }
      B() {
        this.s = !0;
        for (var t = 0; t < 16; ++t) this.m[t] = 0;
      }
      C(t) {
        t
          ? (null == this.v && (this.v = new Zr()), this.a.bu(t, this.v))
          : (this.v = null);
        let e = this.a.aj[this.b];
        for (let i = 0; i < e.length; i++) this.a.aq[e[i]].C(t);
      }
      D(t) {
        t
          ? (null == this.w && (this.w = new Zr()), this.a.bu(t, this.w))
          : (this.w = null);
        let e = this.a.aj[this.b];
        for (let i = 0; i < e.length; i++) this.a.aq[e[i]].D(t);
      }
      E(t) {
        var e = this;
        if (e.s) return void e.B();
        if ((null != this.v && this.a.cc(this.v, t), e.t || e.u)) return;
        if (((e.t = !0), !e.a)) return;
        Gi(e.m);
        var i = e.a.S;
        if (!i) return;
        let r = zi();
        if (
          (ji(r, r, this.a.aS.viewMatrix),
          ji(r, r, this.a.V),
          ji(e.m, e.m, r),
          e.e > -1)
        ) {
          e.a.aq[e.e].E(t);
          let i = zi();
          if (
            (Bi(i, e.a.aq[e.e].m), ji(i, r, i), 1 & e.d || 2 & e.d || 4 & e.d)
          ) {
            if (4 & e.d && 2 & e.d)
              os(i, 0, as(r, 0)), os(i, 1, as(r, 1)), os(i, 2, as(r, 2));
            else if (4 & e.d) {
              {
                let t = as(r, 0),
                  e = Tr(t);
                xr(t, t, Tr(as(i, 0)) / e), os(i, 0, t);
              }
              {
                let t = as(r, 1),
                  e = Tr(t);
                xr(t, t, Tr(as(i, 1)) / e), os(i, 1, t);
              }
              {
                let t = as(r, 2),
                  e = Tr(t);
                xr(t, t, Tr(as(i, 2)) / e), os(i, 2, t);
              }
            } else if (2 & e.d) {
              {
                let t = as(r, 0);
                xr(t, t, 1 / Tr(as(i, 0))), xr(t, t, Tr(as(r, 0))), os(i, 0, t);
              }
              {
                let t = as(r, 1);
                xr(t, t, 1 / Tr(as(i, 1))), xr(t, t, Tr(as(r, 1))), os(i, 1, t);
              }
              {
                let t = as(r, 2);
                xr(t, t, 1 / Tr(as(i, 2))), xr(t, t, Tr(as(r, 2))), os(i, 2, t);
              }
            }
            if (1 & e.d) os(i, 3, as(r, 3));
            else {
              let t = _r(e.h[0], e.h[1], e.h[2], 1),
                s = br();
              pr(s, t), (s[3] = 0);
              let n = br(),
                a = br();
              yr(n, t, e.a.aq[e.e].m),
                yr(n, n, r),
                yr(a, s, i),
                vr(n, n, a),
                (n[3] = 1),
                os(i, 3, n);
            }
          }
          let s = zi();
          Hi(s, r), ji(i, s, i), ji(e.m, e.m, i);
        }
        let s = null;
        if (null != this.v) {
          let t = this.F(this.v);
          this.a.T || (this.y = t), (s = this.a.T ? this.y : t);
        } else {
          let t = this.F(i);
          this.a.T || (this.y = t), (s = this.a.T ? this.y : t);
        }
        let n = null;
        if (null != this.w) {
          let t = this.F(this.w);
          this.a.T || (this.z = t), (n = this.a.T ? this.z : t);
        }
        let a = null != s || null != n,
          o = zi();
        a && (null != s && ji(o, o, s), null != n && ji(o, o, n)),
          null != this.x &&
            (Vi(o, o, this.h), ji(o, o, this.x), Vi(o, o, Mi(this.p, this.h))),
          ji(e.m, e.m, o);
        let l = 120 & e.d;
        if (l) {
          let t = zi();
          Bi(t, e.m);
          let i = e.m,
            r = di();
          $i(r, e.m);
          let s = br();
          if (16 == l) {
            let t = as(e.m, 0);
            xr(t, t, 1 / gi(t)), os(e.m, 0, t);
            let r = _r(i[4], -i[0], 0, 0);
            os(i, 1, wr(r, r)), Di(s, r, t), (s[3] = 0), os(i, 2, s);
          } else if (l > 16) {
            if (32 == l) {
              let t = as(i, 1);
              xr(t, t, 1 / Tr(t)), os(e.m, 1, t);
              let r = _r(-i[5], i[1], 0, 0);
              os(i, 0, wr(r, r)), (s[3] = 0), os(i, 2, s);
            } else if (64 == l) {
              let t = as(i, 2);
              wr(t, t), os(i, 2, t);
              let e = _r(t[1], -t[0], 0, 0);
              wr(e, e), os(i, 1, e), Di(s, t, e), (s[3] = 0), os(i, 0, s);
            }
          } else if (8 == l) {
            let t = this.a.i;
            if (a) {
              let e = as(o, 0);
              (e = _r(e[1], e[2], -e[0], 0)), wr(e, e), os(i, 0, e);
              let r = as(o, 1);
              (r = _r(t ? -r[1] : r[1], t ? -r[2] : r[2], t ? r[0] : -r[0], 0)),
                wr(r, r),
                os(i, 1, r);
              let s = as(o, 2);
              (s = _r(s[1], s[2], -s[0], 0)), wr(s, s), os(i, 2, s);
            } else {
              os(i, 0, _r(0, 0, -1, 0)),
                os(i, 1, _r(t ? -1 : 1, 0, 0, 0)),
                os(i, 2, _r(0, 1, 0, 0));
            }
          }
          let n = _r(this.h[0], this.h[1], this.h[2], 1),
            h = _r(this.h[0], this.h[1], this.h[2], 0),
            u = as(i, 0),
            c = as(i, 1),
            f = as(i, 2);
          xr(u, u, r[0]),
            xr(c, c, r[1]),
            xr(f, f, r[2]),
            os(i, 0, u),
            os(i, 1, c),
            os(i, 2, f),
            yr(n, n, t),
            yr(h, h, i);
          let d = br();
          vr(d, n, h), (d[3] = 1), os(i, 3, d);
        }
        Hi(r, r),
          ji(e.m, r, e.m),
          Hi(e.n, e.m),
          Li(e.o, e.n),
          Ri(e.l, e.h, e.m);
      }
      F(t) {
        var e = this.i.c(t.a.a),
          i = this.j.c(t.a.a),
          r = this.k.c(t.a.a);
        if (0 != (640 & this.d)) {
          let w = zi();
          return (
            Gi(w),
            Vi(w, w, this.h),
            e && ((this.p = this.i.d(t, this.a.aX)), Vi(w, w, this.p)),
            i &&
              ((this.q = this.j.d(t, this.a.aX, Pr())),
              (s = this.r),
              (n = this.q),
              (a = n[0]),
              (o = n[1]),
              (l = n[2]),
              (h = n[3]),
              (d = a * (u = a + a)),
              (b = o * u),
              (g = o * (c = o + o)),
              (_ = l * u),
              (p = l * c),
              (m = l * (f = l + l)),
              (v = h * u),
              (x = h * c),
              (T = h * f),
              (s[0] = 1 - g - m),
              (s[1] = b + T),
              (s[2] = _ - x),
              (s[3] = 0),
              (s[4] = b - T),
              (s[5] = 1 - d - m),
              (s[6] = p + v),
              (s[7] = 0),
              (s[8] = _ + x),
              (s[9] = p - v),
              (s[10] = 1 - d - g),
              (s[11] = 0),
              (s[12] = 0),
              (s[13] = 0),
              (s[14] = 0),
              (s[15] = 1),
              ji(w, w, this.r)),
            r && ((this.p = this.k.d(t, this.a.aX)), qi(w, w, this.p)),
            Vi(w, w, Mi(this.p, this.h)),
            w
          );
        }
        var s, n, a, o, l, h, u, c, f, d, b, g, _, p, m, v, x, T;
        return null;
      }
    };
    const hs = class {
      constructor(t) {
        var e = this;
        (e.a = t.getUint16()),
          (e.b = t.getUint16()),
          (e.c = t.getUint16()),
          (e.d = t.getUint16()),
          (e.e = t.getUint16() + 65536 * e.b),
          (e.f = t.getUint16()),
          (e.g = t.getUint16()),
          (e.h = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.i = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.j = t.getFloat());
      }
      k() {
        (this.h = null), (this.i = null);
      }
    };
    function us(t) {
      let e = t.length;
      for (; --e >= 0; ) t[e] = 0;
    }
    const cs = 256,
      fs = 286,
      ds = 30,
      bs = 15,
      gs = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0,
      ]),
      _s = new Uint8Array([
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ]),
      ps = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
      ]),
      ms = new Uint8Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]),
      vs = new Array(576);
    us(vs);
    const xs = new Array(60);
    us(xs);
    const Ts = new Array(512);
    us(Ts);
    const ws = new Array(256);
    us(ws);
    const ys = new Array(29);
    us(ys);
    const As = new Array(ds);
    function Es(t, e, i, r, s) {
      (this.static_tree = t),
        (this.extra_bits = e),
        (this.extra_base = i),
        (this.elems = r),
        (this.max_length = s),
        (this.has_stree = t && t.length);
    }
    let Cs, Ms, Ss;
    function ks(t, e) {
      (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
    }
    us(As);
    const Ds = (t) => (t < 256 ? Ts[t] : Ts[256 + (t >>> 7)]),
      Fs = (t, e) => {
        (t.pending_buf[t.pending++] = 255 & e),
          (t.pending_buf[t.pending++] = (e >>> 8) & 255);
      },
      Rs = (t, e, i) => {
        t.bi_valid > 16 - i
          ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
            Fs(t, t.bi_buf),
            (t.bi_buf = e >> (16 - t.bi_valid)),
            (t.bi_valid += i - 16))
          : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += i));
      },
      Is = (t, e, i) => {
        Rs(t, i[2 * e], i[2 * e + 1]);
      },
      Us = (t, e) => {
        let i = 0;
        do {
          (i |= 1 & t), (t >>>= 1), (i <<= 1);
        } while (--e > 0);
        return i >>> 1;
      },
      Ps = (t, e, i) => {
        const r = new Array(16);
        let s,
          n,
          a = 0;
        for (s = 1; s <= bs; s++) (a = (a + i[s - 1]) << 1), (r[s] = a);
        for (n = 0; n <= e; n++) {
          let e = t[2 * n + 1];
          0 !== e && (t[2 * n] = Us(r[e]++, e));
        }
      },
      Os = (t) => {
        let e;
        for (e = 0; e < fs; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < ds; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
        (t.dyn_ltree[512] = 1),
          (t.opt_len = t.static_len = 0),
          (t.sym_next = t.matches = 0);
      },
      zs = (t) => {
        t.bi_valid > 8
          ? Fs(t, t.bi_buf)
          : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
          (t.bi_buf = 0),
          (t.bi_valid = 0);
      },
      Bs = (t, e, i, r) => {
        const s = 2 * e,
          n = 2 * i;
        return t[s] < t[n] || (t[s] === t[n] && r[e] <= r[i]);
      },
      Ns = (t, e, i) => {
        const r = t.heap[i];
        let s = i << 1;
        for (
          ;
          s <= t.heap_len &&
          (s < t.heap_len && Bs(e, t.heap[s + 1], t.heap[s], t.depth) && s++,
          !Bs(e, r, t.heap[s], t.depth));

        )
          (t.heap[i] = t.heap[s]), (i = s), (s <<= 1);
        t.heap[i] = r;
      },
      Gs = (t, e, i) => {
        let r,
          s,
          n,
          a,
          o = 0;
        if (0 !== t.sym_next)
          do {
            (r = 255 & t.pending_buf[t.sym_buf + o++]),
              (r += (255 & t.pending_buf[t.sym_buf + o++]) << 8),
              (s = t.pending_buf[t.sym_buf + o++]),
              0 === r
                ? Is(t, s, e)
                : ((n = ws[s]),
                  Is(t, n + cs + 1, e),
                  (a = gs[n]),
                  0 !== a && ((s -= ys[n]), Rs(t, s, a)),
                  r--,
                  (n = Ds(r)),
                  Is(t, n, i),
                  (a = _s[n]),
                  0 !== a && ((r -= As[n]), Rs(t, r, a)));
          } while (o < t.sym_next);
        Is(t, 256, e);
      },
      Ls = (t, e) => {
        const i = e.dyn_tree,
          r = e.stat_desc.static_tree,
          s = e.stat_desc.has_stree,
          n = e.stat_desc.elems;
        let a,
          o,
          l,
          h = -1;
        for (t.heap_len = 0, t.heap_max = 573, a = 0; a < n; a++)
          0 !== i[2 * a]
            ? ((t.heap[++t.heap_len] = h = a), (t.depth[a] = 0))
            : (i[2 * a + 1] = 0);
        for (; t.heap_len < 2; )
          (l = t.heap[++t.heap_len] = h < 2 ? ++h : 0),
            (i[2 * l] = 1),
            (t.depth[l] = 0),
            t.opt_len--,
            s && (t.static_len -= r[2 * l + 1]);
        for (e.max_code = h, a = t.heap_len >> 1; a >= 1; a--) Ns(t, i, a);
        l = n;
        do {
          (a = t.heap[1]),
            (t.heap[1] = t.heap[t.heap_len--]),
            Ns(t, i, 1),
            (o = t.heap[1]),
            (t.heap[--t.heap_max] = a),
            (t.heap[--t.heap_max] = o),
            (i[2 * l] = i[2 * a] + i[2 * o]),
            (t.depth[l] =
              (t.depth[a] >= t.depth[o] ? t.depth[a] : t.depth[o]) + 1),
            (i[2 * a + 1] = i[2 * o + 1] = l),
            (t.heap[1] = l++),
            Ns(t, i, 1);
        } while (t.heap_len >= 2);
        (t.heap[--t.heap_max] = t.heap[1]),
          ((t, e) => {
            const i = e.dyn_tree,
              r = e.max_code,
              s = e.stat_desc.static_tree,
              n = e.stat_desc.has_stree,
              a = e.stat_desc.extra_bits,
              o = e.stat_desc.extra_base,
              l = e.stat_desc.max_length;
            let h,
              u,
              c,
              f,
              d,
              b,
              g = 0;
            for (f = 0; f <= bs; f++) t.bl_count[f] = 0;
            for (
              i[2 * t.heap[t.heap_max] + 1] = 0, h = t.heap_max + 1;
              h < 573;
              h++
            )
              (u = t.heap[h]),
                (f = i[2 * i[2 * u + 1] + 1] + 1),
                f > l && ((f = l), g++),
                (i[2 * u + 1] = f),
                u > r ||
                  (t.bl_count[f]++,
                  (d = 0),
                  u >= o && (d = a[u - o]),
                  (b = i[2 * u]),
                  (t.opt_len += b * (f + d)),
                  n && (t.static_len += b * (s[2 * u + 1] + d)));
            if (0 !== g) {
              do {
                for (f = l - 1; 0 === t.bl_count[f]; ) f--;
                t.bl_count[f]--,
                  (t.bl_count[f + 1] += 2),
                  t.bl_count[l]--,
                  (g -= 2);
              } while (g > 0);
              for (f = l; 0 !== f; f--)
                for (u = t.bl_count[f]; 0 !== u; )
                  (c = t.heap[--h]),
                    c > r ||
                      (i[2 * c + 1] !== f &&
                        ((t.opt_len += (f - i[2 * c + 1]) * i[2 * c]),
                        (i[2 * c + 1] = f)),
                      u--);
            }
          })(t, e),
          Ps(i, h, t.bl_count);
      },
      Hs = (t, e, i) => {
        let r,
          s,
          n = -1,
          a = e[1],
          o = 0,
          l = 7,
          h = 4;
        for (
          0 === a && ((l = 138), (h = 3)), e[2 * (i + 1) + 1] = 65535, r = 0;
          r <= i;
          r++
        )
          (s = a),
            (a = e[2 * (r + 1) + 1]),
            (++o < l && s === a) ||
              (o < h
                ? (t.bl_tree[2 * s] += o)
                : 0 !== s
                ? (s !== n && t.bl_tree[2 * s]++, t.bl_tree[32]++)
                : o <= 10
                ? t.bl_tree[34]++
                : t.bl_tree[36]++,
              (o = 0),
              (n = s),
              0 === a
                ? ((l = 138), (h = 3))
                : s === a
                ? ((l = 6), (h = 3))
                : ((l = 7), (h = 4)));
      },
      js = (t, e, i) => {
        let r,
          s,
          n = -1,
          a = e[1],
          o = 0,
          l = 7,
          h = 4;
        for (0 === a && ((l = 138), (h = 3)), r = 0; r <= i; r++)
          if (((s = a), (a = e[2 * (r + 1) + 1]), !(++o < l && s === a))) {
            if (o < h)
              do {
                Is(t, s, t.bl_tree);
              } while (0 != --o);
            else
              0 !== s
                ? (s !== n && (Is(t, s, t.bl_tree), o--),
                  Is(t, 16, t.bl_tree),
                  Rs(t, o - 3, 2))
                : o <= 10
                ? (Is(t, 17, t.bl_tree), Rs(t, o - 3, 3))
                : (Is(t, 18, t.bl_tree), Rs(t, o - 11, 7));
            (o = 0),
              (n = s),
              0 === a
                ? ((l = 138), (h = 3))
                : s === a
                ? ((l = 6), (h = 3))
                : ((l = 7), (h = 4));
          }
      };
    let Vs = !1;
    const qs = (t, e, i, r) => {
      Rs(t, 0 + (r ? 1 : 0), 3),
        zs(t),
        Fs(t, i),
        Fs(t, ~i),
        i && t.pending_buf.set(t.window.subarray(e, e + i), t.pending),
        (t.pending += i);
    };
    var Ws = (t) => {
        Vs ||
          ((() => {
            let t, e, i, r, s;
            const n = new Array(16);
            for (i = 0, r = 0; r < 28; r++)
              for (ys[r] = i, t = 0; t < 1 << gs[r]; t++) ws[i++] = r;
            for (ws[i - 1] = r, s = 0, r = 0; r < 16; r++)
              for (As[r] = s, t = 0; t < 1 << _s[r]; t++) Ts[s++] = r;
            for (s >>= 7; r < ds; r++)
              for (As[r] = s << 7, t = 0; t < 1 << (_s[r] - 7); t++)
                Ts[256 + s++] = r;
            for (e = 0; e <= bs; e++) n[e] = 0;
            for (t = 0; t <= 143; ) (vs[2 * t + 1] = 8), t++, n[8]++;
            for (; t <= 255; ) (vs[2 * t + 1] = 9), t++, n[9]++;
            for (; t <= 279; ) (vs[2 * t + 1] = 7), t++, n[7]++;
            for (; t <= 287; ) (vs[2 * t + 1] = 8), t++, n[8]++;
            for (Ps(vs, 287, n), t = 0; t < ds; t++)
              (xs[2 * t + 1] = 5), (xs[2 * t] = Us(t, 5));
            (Cs = new Es(vs, gs, 257, fs, bs)),
              (Ms = new Es(xs, _s, 0, ds, bs)),
              (Ss = new Es(new Array(0), ps, 0, 19, 7));
          })(),
          (Vs = !0)),
          (t.l_desc = new ks(t.dyn_ltree, Cs)),
          (t.d_desc = new ks(t.dyn_dtree, Ms)),
          (t.bl_desc = new ks(t.bl_tree, Ss)),
          (t.bi_buf = 0),
          (t.bi_valid = 0),
          Os(t);
      },
      Xs = (t, e, i, r) => {
        let s,
          n,
          a = 0;
        t.level > 0
          ? (2 === t.strm.data_type &&
              (t.strm.data_type = ((t) => {
                let e,
                  i = 4093624447;
                for (e = 0; e <= 31; e++, i >>>= 1)
                  if (1 & i && 0 !== t.dyn_ltree[2 * e]) return 0;
                if (
                  0 !== t.dyn_ltree[18] ||
                  0 !== t.dyn_ltree[20] ||
                  0 !== t.dyn_ltree[26]
                )
                  return 1;
                for (e = 32; e < cs; e++)
                  if (0 !== t.dyn_ltree[2 * e]) return 1;
                return 0;
              })(t)),
            Ls(t, t.l_desc),
            Ls(t, t.d_desc),
            (a = ((t) => {
              let e;
              for (
                Hs(t, t.dyn_ltree, t.l_desc.max_code),
                  Hs(t, t.dyn_dtree, t.d_desc.max_code),
                  Ls(t, t.bl_desc),
                  e = 18;
                e >= 3 && 0 === t.bl_tree[2 * ms[e] + 1];
                e--
              );
              return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
            })(t)),
            (s = (t.opt_len + 3 + 7) >>> 3),
            (n = (t.static_len + 3 + 7) >>> 3),
            n <= s && (s = n))
          : (s = n = i + 5),
          i + 4 <= s && -1 !== e
            ? qs(t, e, i, r)
            : 4 === t.strategy || n === s
            ? (Rs(t, 2 + (r ? 1 : 0), 3), Gs(t, vs, xs))
            : (Rs(t, 4 + (r ? 1 : 0), 3),
              ((t, e, i, r) => {
                let s;
                for (
                  Rs(t, e - 257, 5), Rs(t, i - 1, 5), Rs(t, r - 4, 4), s = 0;
                  s < r;
                  s++
                )
                  Rs(t, t.bl_tree[2 * ms[s] + 1], 3);
                js(t, t.dyn_ltree, e - 1), js(t, t.dyn_dtree, i - 1);
              })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1),
              Gs(t, t.dyn_ltree, t.dyn_dtree)),
          Os(t),
          r && zs(t);
      },
      Zs = (t, e, i) => (
        (t.pending_buf[t.sym_buf + t.sym_next++] = e),
        (t.pending_buf[t.sym_buf + t.sym_next++] = e >> 8),
        (t.pending_buf[t.sym_buf + t.sym_next++] = i),
        0 === e
          ? t.dyn_ltree[2 * i]++
          : (t.matches++,
            e--,
            t.dyn_ltree[2 * (ws[i] + cs + 1)]++,
            t.dyn_dtree[2 * Ds(e)]++),
        t.sym_next === t.sym_end
      ),
      Ks = {
        _tr_init: Ws,
        _tr_stored_block: qs,
        _tr_flush_block: Xs,
        _tr_tally: Zs,
        _tr_align: (t) => {
          Rs(t, 2, 3),
            Is(t, 256, vs),
            ((t) => {
              16 === t.bi_valid
                ? (Fs(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
                : t.bi_valid >= 8 &&
                  ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
                  (t.bi_buf >>= 8),
                  (t.bi_valid -= 8));
            })(t);
        },
      };
    var Ys = (t, e, i, r) => {
      let s = (65535 & t) | 0,
        n = ((t >>> 16) & 65535) | 0,
        a = 0;
      for (; 0 !== i; ) {
        (a = i > 2e3 ? 2e3 : i), (i -= a);
        do {
          (s = (s + e[r++]) | 0), (n = (n + s) | 0);
        } while (--a);
        (s %= 65521), (n %= 65521);
      }
      return s | (n << 16) | 0;
    };
    const Js = new Uint32Array(
      (() => {
        let t,
          e = [];
        for (var i = 0; i < 256; i++) {
          t = i;
          for (var r = 0; r < 8; r++)
            t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
          e[i] = t;
        }
        return e;
      })()
    );
    var $s = (t, e, i, r) => {
        const s = Js,
          n = r + i;
        t ^= -1;
        for (let i = r; i < n; i++) t = (t >>> 8) ^ s[255 & (t ^ e[i])];
        return -1 ^ t;
      },
      Qs = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version",
      },
      tn = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8,
      };
    const {
        _tr_init: en,
        _tr_stored_block: rn,
        _tr_flush_block: sn,
        _tr_tally: nn,
        _tr_align: an,
      } = Ks,
      {
        Z_NO_FLUSH: on,
        Z_PARTIAL_FLUSH: ln,
        Z_FULL_FLUSH: hn,
        Z_FINISH: un,
        Z_BLOCK: cn,
        Z_OK: fn,
        Z_STREAM_END: dn,
        Z_STREAM_ERROR: bn,
        Z_DATA_ERROR: gn,
        Z_BUF_ERROR: _n,
        Z_DEFAULT_COMPRESSION: pn,
        Z_FILTERED: mn,
        Z_HUFFMAN_ONLY: vn,
        Z_RLE: xn,
        Z_FIXED: Tn,
        Z_DEFAULT_STRATEGY: wn,
        Z_UNKNOWN: yn,
        Z_DEFLATED: An,
      } = tn,
      En = 258,
      Cn = 262,
      Mn = 42,
      Sn = 113,
      kn = 666,
      Dn = (t, e) => ((t.msg = Qs[e]), e),
      Fn = (t) => 2 * t - (t > 4 ? 9 : 0),
      Rn = (t) => {
        let e = t.length;
        for (; --e >= 0; ) t[e] = 0;
      },
      In = (t) => {
        let e,
          i,
          r,
          s = t.w_size;
        (e = t.hash_size), (r = e);
        do {
          (i = t.head[--r]), (t.head[r] = i >= s ? i - s : 0);
        } while (--e);
        (e = s), (r = e);
        do {
          (i = t.prev[--r]), (t.prev[r] = i >= s ? i - s : 0);
        } while (--e);
      };
    let Un = (t, e, i) => ((e << t.hash_shift) ^ i) & t.hash_mask;
    const Pn = (t) => {
        const e = t.state;
        let i = e.pending;
        i > t.avail_out && (i = t.avail_out),
          0 !== i &&
            (t.output.set(
              e.pending_buf.subarray(e.pending_out, e.pending_out + i),
              t.next_out
            ),
            (t.next_out += i),
            (e.pending_out += i),
            (t.total_out += i),
            (t.avail_out -= i),
            (e.pending -= i),
            0 === e.pending && (e.pending_out = 0));
      },
      On = (t, e) => {
        sn(
          t,
          t.block_start >= 0 ? t.block_start : -1,
          t.strstart - t.block_start,
          e
        ),
          (t.block_start = t.strstart),
          Pn(t.strm);
      },
      zn = (t, e) => {
        t.pending_buf[t.pending++] = e;
      },
      Bn = (t, e) => {
        (t.pending_buf[t.pending++] = (e >>> 8) & 255),
          (t.pending_buf[t.pending++] = 255 & e);
      },
      Nn = (t, e, i, r) => {
        let s = t.avail_in;
        return (
          s > r && (s = r),
          0 === s
            ? 0
            : ((t.avail_in -= s),
              e.set(t.input.subarray(t.next_in, t.next_in + s), i),
              1 === t.state.wrap
                ? (t.adler = Ys(t.adler, e, s, i))
                : 2 === t.state.wrap && (t.adler = $s(t.adler, e, s, i)),
              (t.next_in += s),
              (t.total_in += s),
              s)
        );
      },
      Gn = (t, e) => {
        let i,
          r,
          s = t.max_chain_length,
          n = t.strstart,
          a = t.prev_length,
          o = t.nice_match;
        const l = t.strstart > t.w_size - Cn ? t.strstart - (t.w_size - Cn) : 0,
          h = t.window,
          u = t.w_mask,
          c = t.prev,
          f = t.strstart + En;
        let d = h[n + a - 1],
          b = h[n + a];
        t.prev_length >= t.good_match && (s >>= 2),
          o > t.lookahead && (o = t.lookahead);
        do {
          if (
            ((i = e),
            h[i + a] === b &&
              h[i + a - 1] === d &&
              h[i] === h[n] &&
              h[++i] === h[n + 1])
          ) {
            (n += 2), i++;
            do {} while (
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              h[++n] === h[++i] &&
              n < f
            );
            if (((r = En - (f - n)), (n = f - En), r > a)) {
              if (((t.match_start = e), (a = r), r >= o)) break;
              (d = h[n + a - 1]), (b = h[n + a]);
            }
          }
        } while ((e = c[e & u]) > l && 0 != --s);
        return a <= t.lookahead ? a : t.lookahead;
      },
      Ln = (t) => {
        const e = t.w_size;
        let i, r, s;
        do {
          if (
            ((r = t.window_size - t.lookahead - t.strstart),
            t.strstart >= e + (e - Cn) &&
              (t.window.set(t.window.subarray(e, e + e - r), 0),
              (t.match_start -= e),
              (t.strstart -= e),
              (t.block_start -= e),
              t.insert > t.strstart && (t.insert = t.strstart),
              In(t),
              (r += e)),
            0 === t.strm.avail_in)
          )
            break;
          if (
            ((i = Nn(t.strm, t.window, t.strstart + t.lookahead, r)),
            (t.lookahead += i),
            t.lookahead + t.insert >= 3)
          )
            for (
              s = t.strstart - t.insert,
                t.ins_h = t.window[s],
                t.ins_h = Un(t, t.ins_h, t.window[s + 1]);
              t.insert &&
              ((t.ins_h = Un(t, t.ins_h, t.window[s + 3 - 1])),
              (t.prev[s & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = s),
              s++,
              t.insert--,
              !(t.lookahead + t.insert < 3));

            );
        } while (t.lookahead < Cn && 0 !== t.strm.avail_in);
      },
      Hn = (t, e) => {
        let i,
          r,
          s,
          n =
            t.pending_buf_size - 5 > t.w_size
              ? t.w_size
              : t.pending_buf_size - 5,
          a = 0,
          o = t.strm.avail_in;
        do {
          if (((i = 65535), (s = (t.bi_valid + 42) >> 3), t.strm.avail_out < s))
            break;
          if (
            ((s = t.strm.avail_out - s),
            (r = t.strstart - t.block_start),
            i > r + t.strm.avail_in && (i = r + t.strm.avail_in),
            i > s && (i = s),
            i < n &&
              ((0 === i && e !== un) || e === on || i !== r + t.strm.avail_in))
          )
            break;
          (a = e === un && i === r + t.strm.avail_in ? 1 : 0),
            rn(t, 0, 0, a),
            (t.pending_buf[t.pending - 4] = i),
            (t.pending_buf[t.pending - 3] = i >> 8),
            (t.pending_buf[t.pending - 2] = ~i),
            (t.pending_buf[t.pending - 1] = ~i >> 8),
            Pn(t.strm),
            r &&
              (r > i && (r = i),
              t.strm.output.set(
                t.window.subarray(t.block_start, t.block_start + r),
                t.strm.next_out
              ),
              (t.strm.next_out += r),
              (t.strm.avail_out -= r),
              (t.strm.total_out += r),
              (t.block_start += r),
              (i -= r)),
            i &&
              (Nn(t.strm, t.strm.output, t.strm.next_out, i),
              (t.strm.next_out += i),
              (t.strm.avail_out -= i),
              (t.strm.total_out += i));
        } while (0 === a);
        return (
          (o -= t.strm.avail_in),
          o &&
            (o >= t.w_size
              ? ((t.matches = 2),
                t.window.set(
                  t.strm.input.subarray(
                    t.strm.next_in - t.w_size,
                    t.strm.next_in
                  ),
                  0
                ),
                (t.strstart = t.w_size),
                (t.insert = t.strstart))
              : (t.window_size - t.strstart <= o &&
                  ((t.strstart -= t.w_size),
                  t.window.set(
                    t.window.subarray(t.w_size, t.w_size + t.strstart),
                    0
                  ),
                  t.matches < 2 && t.matches++,
                  t.insert > t.strstart && (t.insert = t.strstart)),
                t.window.set(
                  t.strm.input.subarray(t.strm.next_in - o, t.strm.next_in),
                  t.strstart
                ),
                (t.strstart += o),
                (t.insert +=
                  o > t.w_size - t.insert ? t.w_size - t.insert : o)),
            (t.block_start = t.strstart)),
          t.high_water < t.strstart && (t.high_water = t.strstart),
          a
            ? 4
            : e !== on &&
              e !== un &&
              0 === t.strm.avail_in &&
              t.strstart === t.block_start
            ? 2
            : ((s = t.window_size - t.strstart),
              t.strm.avail_in > s &&
                t.block_start >= t.w_size &&
                ((t.block_start -= t.w_size),
                (t.strstart -= t.w_size),
                t.window.set(
                  t.window.subarray(t.w_size, t.w_size + t.strstart),
                  0
                ),
                t.matches < 2 && t.matches++,
                (s += t.w_size),
                t.insert > t.strstart && (t.insert = t.strstart)),
              s > t.strm.avail_in && (s = t.strm.avail_in),
              s &&
                (Nn(t.strm, t.window, t.strstart, s),
                (t.strstart += s),
                (t.insert +=
                  s > t.w_size - t.insert ? t.w_size - t.insert : s)),
              t.high_water < t.strstart && (t.high_water = t.strstart),
              (s = (t.bi_valid + 42) >> 3),
              (s =
                t.pending_buf_size - s > 65535
                  ? 65535
                  : t.pending_buf_size - s),
              (n = s > t.w_size ? t.w_size : s),
              (r = t.strstart - t.block_start),
              (r >= n ||
                ((r || e === un) &&
                  e !== on &&
                  0 === t.strm.avail_in &&
                  r <= s)) &&
                ((i = r > s ? s : r),
                (a = e === un && 0 === t.strm.avail_in && i === r ? 1 : 0),
                rn(t, t.block_start, i, a),
                (t.block_start += i),
                Pn(t.strm)),
              a ? 3 : 1)
        );
      },
      jn = (t, e) => {
        let i, r;
        for (;;) {
          if (t.lookahead < Cn) {
            if ((Ln(t), t.lookahead < Cn && e === on)) return 1;
            if (0 === t.lookahead) break;
          }
          if (
            ((i = 0),
            t.lookahead >= 3 &&
              ((t.ins_h = Un(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart)),
            0 !== i &&
              t.strstart - i <= t.w_size - Cn &&
              (t.match_length = Gn(t, i)),
            t.match_length >= 3)
          )
            if (
              ((r = nn(t, t.strstart - t.match_start, t.match_length - 3)),
              (t.lookahead -= t.match_length),
              t.match_length <= t.max_lazy_match && t.lookahead >= 3)
            ) {
              t.match_length--;
              do {
                t.strstart++,
                  (t.ins_h = Un(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                  (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart);
              } while (0 != --t.match_length);
              t.strstart++;
            } else
              (t.strstart += t.match_length),
                (t.match_length = 0),
                (t.ins_h = t.window[t.strstart]),
                (t.ins_h = Un(t, t.ins_h, t.window[t.strstart + 1]));
          else
            (r = nn(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
          if (r && (On(t, !1), 0 === t.strm.avail_out)) return 1;
        }
        return (
          (t.insert = t.strstart < 2 ? t.strstart : 2),
          e === un
            ? (On(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : t.sym_next && (On(t, !1), 0 === t.strm.avail_out)
            ? 1
            : 2
        );
      },
      Vn = (t, e) => {
        let i, r, s;
        for (;;) {
          if (t.lookahead < Cn) {
            if ((Ln(t), t.lookahead < Cn && e === on)) return 1;
            if (0 === t.lookahead) break;
          }
          if (
            ((i = 0),
            t.lookahead >= 3 &&
              ((t.ins_h = Un(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart)),
            (t.prev_length = t.match_length),
            (t.prev_match = t.match_start),
            (t.match_length = 2),
            0 !== i &&
              t.prev_length < t.max_lazy_match &&
              t.strstart - i <= t.w_size - Cn &&
              ((t.match_length = Gn(t, i)),
              t.match_length <= 5 &&
                (t.strategy === mn ||
                  (3 === t.match_length &&
                    t.strstart - t.match_start > 4096)) &&
                (t.match_length = 2)),
            t.prev_length >= 3 && t.match_length <= t.prev_length)
          ) {
            (s = t.strstart + t.lookahead - 3),
              (r = nn(t, t.strstart - 1 - t.prev_match, t.prev_length - 3)),
              (t.lookahead -= t.prev_length - 1),
              (t.prev_length -= 2);
            do {
              ++t.strstart <= s &&
                ((t.ins_h = Un(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart));
            } while (0 != --t.prev_length);
            if (
              ((t.match_available = 0),
              (t.match_length = 2),
              t.strstart++,
              r && (On(t, !1), 0 === t.strm.avail_out))
            )
              return 1;
          } else if (t.match_available) {
            if (
              ((r = nn(t, 0, t.window[t.strstart - 1])),
              r && On(t, !1),
              t.strstart++,
              t.lookahead--,
              0 === t.strm.avail_out)
            )
              return 1;
          } else (t.match_available = 1), t.strstart++, t.lookahead--;
        }
        return (
          t.match_available &&
            ((r = nn(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
          (t.insert = t.strstart < 2 ? t.strstart : 2),
          e === un
            ? (On(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : t.sym_next && (On(t, !1), 0 === t.strm.avail_out)
            ? 1
            : 2
        );
      };
    function qn(t, e, i, r, s) {
      (this.good_length = t),
        (this.max_lazy = e),
        (this.nice_length = i),
        (this.max_chain = r),
        (this.func = s);
    }
    const Wn = [
      new qn(0, 0, 0, 0, Hn),
      new qn(4, 4, 8, 4, jn),
      new qn(4, 5, 16, 8, jn),
      new qn(4, 6, 32, 32, jn),
      new qn(4, 4, 16, 16, Vn),
      new qn(8, 16, 32, 32, Vn),
      new qn(8, 16, 128, 128, Vn),
      new qn(8, 32, 128, 256, Vn),
      new qn(32, 128, 258, 1024, Vn),
      new qn(32, 258, 258, 4096, Vn),
    ];
    function Xn() {
      (this.strm = null),
        (this.status = 0),
        (this.pending_buf = null),
        (this.pending_buf_size = 0),
        (this.pending_out = 0),
        (this.pending = 0),
        (this.wrap = 0),
        (this.gzhead = null),
        (this.gzindex = 0),
        (this.method = An),
        (this.last_flush = -1),
        (this.w_size = 0),
        (this.w_bits = 0),
        (this.w_mask = 0),
        (this.window = null),
        (this.window_size = 0),
        (this.prev = null),
        (this.head = null),
        (this.ins_h = 0),
        (this.hash_size = 0),
        (this.hash_bits = 0),
        (this.hash_mask = 0),
        (this.hash_shift = 0),
        (this.block_start = 0),
        (this.match_length = 0),
        (this.prev_match = 0),
        (this.match_available = 0),
        (this.strstart = 0),
        (this.match_start = 0),
        (this.lookahead = 0),
        (this.prev_length = 0),
        (this.max_chain_length = 0),
        (this.max_lazy_match = 0),
        (this.level = 0),
        (this.strategy = 0),
        (this.good_match = 0),
        (this.nice_match = 0),
        (this.dyn_ltree = new Uint16Array(1146)),
        (this.dyn_dtree = new Uint16Array(122)),
        (this.bl_tree = new Uint16Array(78)),
        Rn(this.dyn_ltree),
        Rn(this.dyn_dtree),
        Rn(this.bl_tree),
        (this.l_desc = null),
        (this.d_desc = null),
        (this.bl_desc = null),
        (this.bl_count = new Uint16Array(16)),
        (this.heap = new Uint16Array(573)),
        Rn(this.heap),
        (this.heap_len = 0),
        (this.heap_max = 0),
        (this.depth = new Uint16Array(573)),
        Rn(this.depth),
        (this.sym_buf = 0),
        (this.lit_bufsize = 0),
        (this.sym_next = 0),
        (this.sym_end = 0),
        (this.opt_len = 0),
        (this.static_len = 0),
        (this.matches = 0),
        (this.insert = 0),
        (this.bi_buf = 0),
        (this.bi_valid = 0);
    }
    const Zn = (t) => {
        if (!t) return 1;
        const e = t.state;
        return !e ||
          e.strm !== t ||
          (e.status !== Mn &&
            57 !== e.status &&
            69 !== e.status &&
            73 !== e.status &&
            91 !== e.status &&
            103 !== e.status &&
            e.status !== Sn &&
            e.status !== kn)
          ? 1
          : 0;
      },
      Kn = (t) => {
        if (Zn(t)) return Dn(t, bn);
        (t.total_in = t.total_out = 0), (t.data_type = yn);
        const e = t.state;
        return (
          (e.pending = 0),
          (e.pending_out = 0),
          e.wrap < 0 && (e.wrap = -e.wrap),
          (e.status = 2 === e.wrap ? 57 : e.wrap ? Mn : Sn),
          (t.adler = 2 === e.wrap ? 0 : 1),
          (e.last_flush = -2),
          en(e),
          fn
        );
      },
      Yn = (t) => {
        const e = Kn(t);
        var i;
        return (
          e === fn &&
            (((i = t.state).window_size = 2 * i.w_size),
            Rn(i.head),
            (i.max_lazy_match = Wn[i.level].max_lazy),
            (i.good_match = Wn[i.level].good_length),
            (i.nice_match = Wn[i.level].nice_length),
            (i.max_chain_length = Wn[i.level].max_chain),
            (i.strstart = 0),
            (i.block_start = 0),
            (i.lookahead = 0),
            (i.insert = 0),
            (i.match_length = i.prev_length = 2),
            (i.match_available = 0),
            (i.ins_h = 0)),
          e
        );
      },
      Jn = (t, e, i, r, s, n) => {
        if (!t) return bn;
        let a = 1;
        if (
          (e === pn && (e = 6),
          r < 0 ? ((a = 0), (r = -r)) : r > 15 && ((a = 2), (r -= 16)),
          s < 1 ||
            s > 9 ||
            i !== An ||
            r < 8 ||
            r > 15 ||
            e < 0 ||
            e > 9 ||
            n < 0 ||
            n > Tn ||
            (8 === r && 1 !== a))
        )
          return Dn(t, bn);
        8 === r && (r = 9);
        const o = new Xn();
        return (
          (t.state = o),
          (o.strm = t),
          (o.status = Mn),
          (o.wrap = a),
          (o.gzhead = null),
          (o.w_bits = r),
          (o.w_size = 1 << o.w_bits),
          (o.w_mask = o.w_size - 1),
          (o.hash_bits = s + 7),
          (o.hash_size = 1 << o.hash_bits),
          (o.hash_mask = o.hash_size - 1),
          (o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3)),
          (o.window = new Uint8Array(2 * o.w_size)),
          (o.head = new Uint16Array(o.hash_size)),
          (o.prev = new Uint16Array(o.w_size)),
          (o.lit_bufsize = 1 << (s + 6)),
          (o.pending_buf_size = 4 * o.lit_bufsize),
          (o.pending_buf = new Uint8Array(o.pending_buf_size)),
          (o.sym_buf = o.lit_bufsize),
          (o.sym_end = 3 * (o.lit_bufsize - 1)),
          (o.level = e),
          (o.strategy = n),
          (o.method = i),
          Yn(t)
        );
      };
    var $n = (t, e) => {
        if (Zn(t) || e > cn || e < 0) return t ? Dn(t, bn) : bn;
        const i = t.state;
        if (
          !t.output ||
          (0 !== t.avail_in && !t.input) ||
          (i.status === kn && e !== un)
        )
          return Dn(t, 0 === t.avail_out ? _n : bn);
        const r = i.last_flush;
        if (((i.last_flush = e), 0 !== i.pending)) {
          if ((Pn(t), 0 === t.avail_out)) return (i.last_flush = -1), fn;
        } else if (0 === t.avail_in && Fn(e) <= Fn(r) && e !== un)
          return Dn(t, _n);
        if (i.status === kn && 0 !== t.avail_in) return Dn(t, _n);
        if (
          (i.status === Mn && 0 === i.wrap && (i.status = Sn), i.status === Mn)
        ) {
          let e = (An + ((i.w_bits - 8) << 4)) << 8,
            r = -1;
          if (
            ((r =
              i.strategy >= vn || i.level < 2
                ? 0
                : i.level < 6
                ? 1
                : 6 === i.level
                ? 2
                : 3),
            (e |= r << 6),
            0 !== i.strstart && (e |= 32),
            (e += 31 - (e % 31)),
            Bn(i, e),
            0 !== i.strstart && (Bn(i, t.adler >>> 16), Bn(i, 65535 & t.adler)),
            (t.adler = 1),
            (i.status = Sn),
            Pn(t),
            0 !== i.pending)
          )
            return (i.last_flush = -1), fn;
        }
        if (57 === i.status)
          if (((t.adler = 0), zn(i, 31), zn(i, 139), zn(i, 8), i.gzhead))
            zn(
              i,
              (i.gzhead.text ? 1 : 0) +
                (i.gzhead.hcrc ? 2 : 0) +
                (i.gzhead.extra ? 4 : 0) +
                (i.gzhead.name ? 8 : 0) +
                (i.gzhead.comment ? 16 : 0)
            ),
              zn(i, 255 & i.gzhead.time),
              zn(i, (i.gzhead.time >> 8) & 255),
              zn(i, (i.gzhead.time >> 16) & 255),
              zn(i, (i.gzhead.time >> 24) & 255),
              zn(
                i,
                9 === i.level ? 2 : i.strategy >= vn || i.level < 2 ? 4 : 0
              ),
              zn(i, 255 & i.gzhead.os),
              i.gzhead.extra &&
                i.gzhead.extra.length &&
                (zn(i, 255 & i.gzhead.extra.length),
                zn(i, (i.gzhead.extra.length >> 8) & 255)),
              i.gzhead.hcrc &&
                (t.adler = $s(t.adler, i.pending_buf, i.pending, 0)),
              (i.gzindex = 0),
              (i.status = 69);
          else if (
            (zn(i, 0),
            zn(i, 0),
            zn(i, 0),
            zn(i, 0),
            zn(i, 0),
            zn(i, 9 === i.level ? 2 : i.strategy >= vn || i.level < 2 ? 4 : 0),
            zn(i, 3),
            (i.status = Sn),
            Pn(t),
            0 !== i.pending)
          )
            return (i.last_flush = -1), fn;
        if (69 === i.status) {
          if (i.gzhead.extra) {
            let e = i.pending,
              r = (65535 & i.gzhead.extra.length) - i.gzindex;
            for (; i.pending + r > i.pending_buf_size; ) {
              let s = i.pending_buf_size - i.pending;
              if (
                (i.pending_buf.set(
                  i.gzhead.extra.subarray(i.gzindex, i.gzindex + s),
                  i.pending
                ),
                (i.pending = i.pending_buf_size),
                i.gzhead.hcrc &&
                  i.pending > e &&
                  (t.adler = $s(t.adler, i.pending_buf, i.pending - e, e)),
                (i.gzindex += s),
                Pn(t),
                0 !== i.pending)
              )
                return (i.last_flush = -1), fn;
              (e = 0), (r -= s);
            }
            let s = new Uint8Array(i.gzhead.extra);
            i.pending_buf.set(s.subarray(i.gzindex, i.gzindex + r), i.pending),
              (i.pending += r),
              i.gzhead.hcrc &&
                i.pending > e &&
                (t.adler = $s(t.adler, i.pending_buf, i.pending - e, e)),
              (i.gzindex = 0);
          }
          i.status = 73;
        }
        if (73 === i.status) {
          if (i.gzhead.name) {
            let e,
              r = i.pending;
            do {
              if (i.pending === i.pending_buf_size) {
                if (
                  (i.gzhead.hcrc &&
                    i.pending > r &&
                    (t.adler = $s(t.adler, i.pending_buf, i.pending - r, r)),
                  Pn(t),
                  0 !== i.pending)
                )
                  return (i.last_flush = -1), fn;
                r = 0;
              }
              (e =
                i.gzindex < i.gzhead.name.length
                  ? 255 & i.gzhead.name.charCodeAt(i.gzindex++)
                  : 0),
                zn(i, e);
            } while (0 !== e);
            i.gzhead.hcrc &&
              i.pending > r &&
              (t.adler = $s(t.adler, i.pending_buf, i.pending - r, r)),
              (i.gzindex = 0);
          }
          i.status = 91;
        }
        if (91 === i.status) {
          if (i.gzhead.comment) {
            let e,
              r = i.pending;
            do {
              if (i.pending === i.pending_buf_size) {
                if (
                  (i.gzhead.hcrc &&
                    i.pending > r &&
                    (t.adler = $s(t.adler, i.pending_buf, i.pending - r, r)),
                  Pn(t),
                  0 !== i.pending)
                )
                  return (i.last_flush = -1), fn;
                r = 0;
              }
              (e =
                i.gzindex < i.gzhead.comment.length
                  ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++)
                  : 0),
                zn(i, e);
            } while (0 !== e);
            i.gzhead.hcrc &&
              i.pending > r &&
              (t.adler = $s(t.adler, i.pending_buf, i.pending - r, r));
          }
          i.status = 103;
        }
        if (103 === i.status) {
          if (i.gzhead.hcrc) {
            if (i.pending + 2 > i.pending_buf_size && (Pn(t), 0 !== i.pending))
              return (i.last_flush = -1), fn;
            zn(i, 255 & t.adler), zn(i, (t.adler >> 8) & 255), (t.adler = 0);
          }
          if (((i.status = Sn), Pn(t), 0 !== i.pending))
            return (i.last_flush = -1), fn;
        }
        if (
          0 !== t.avail_in ||
          0 !== i.lookahead ||
          (e !== on && i.status !== kn)
        ) {
          let r =
            0 === i.level
              ? Hn(i, e)
              : i.strategy === vn
              ? ((t, e) => {
                  let i;
                  for (;;) {
                    if (0 === t.lookahead && (Ln(t), 0 === t.lookahead)) {
                      if (e === on) return 1;
                      break;
                    }
                    if (
                      ((t.match_length = 0),
                      (i = nn(t, 0, t.window[t.strstart])),
                      t.lookahead--,
                      t.strstart++,
                      i && (On(t, !1), 0 === t.strm.avail_out))
                    )
                      return 1;
                  }
                  return (
                    (t.insert = 0),
                    e === un
                      ? (On(t, !0), 0 === t.strm.avail_out ? 3 : 4)
                      : t.sym_next && (On(t, !1), 0 === t.strm.avail_out)
                      ? 1
                      : 2
                  );
                })(i, e)
              : i.strategy === xn
              ? ((t, e) => {
                  let i, r, s, n;
                  const a = t.window;
                  for (;;) {
                    if (t.lookahead <= En) {
                      if ((Ln(t), t.lookahead <= En && e === on)) return 1;
                      if (0 === t.lookahead) break;
                    }
                    if (
                      ((t.match_length = 0),
                      t.lookahead >= 3 &&
                        t.strstart > 0 &&
                        ((s = t.strstart - 1),
                        (r = a[s]),
                        r === a[++s] && r === a[++s] && r === a[++s]))
                    ) {
                      n = t.strstart + En;
                      do {} while (
                        r === a[++s] &&
                        r === a[++s] &&
                        r === a[++s] &&
                        r === a[++s] &&
                        r === a[++s] &&
                        r === a[++s] &&
                        r === a[++s] &&
                        r === a[++s] &&
                        s < n
                      );
                      (t.match_length = En - (n - s)),
                        t.match_length > t.lookahead &&
                          (t.match_length = t.lookahead);
                    }
                    if (
                      (t.match_length >= 3
                        ? ((i = nn(t, 1, t.match_length - 3)),
                          (t.lookahead -= t.match_length),
                          (t.strstart += t.match_length),
                          (t.match_length = 0))
                        : ((i = nn(t, 0, t.window[t.strstart])),
                          t.lookahead--,
                          t.strstart++),
                      i && (On(t, !1), 0 === t.strm.avail_out))
                    )
                      return 1;
                  }
                  return (
                    (t.insert = 0),
                    e === un
                      ? (On(t, !0), 0 === t.strm.avail_out ? 3 : 4)
                      : t.sym_next && (On(t, !1), 0 === t.strm.avail_out)
                      ? 1
                      : 2
                  );
                })(i, e)
              : Wn[i.level].func(i, e);
          if (((3 !== r && 4 !== r) || (i.status = kn), 1 === r || 3 === r))
            return 0 === t.avail_out && (i.last_flush = -1), fn;
          if (
            2 === r &&
            (e === ln
              ? an(i)
              : e !== cn &&
                (rn(i, 0, 0, !1),
                e === hn &&
                  (Rn(i.head),
                  0 === i.lookahead &&
                    ((i.strstart = 0), (i.block_start = 0), (i.insert = 0)))),
            Pn(t),
            0 === t.avail_out)
          )
            return (i.last_flush = -1), fn;
        }
        return e !== un
          ? fn
          : i.wrap <= 0
          ? dn
          : (2 === i.wrap
              ? (zn(i, 255 & t.adler),
                zn(i, (t.adler >> 8) & 255),
                zn(i, (t.adler >> 16) & 255),
                zn(i, (t.adler >> 24) & 255),
                zn(i, 255 & t.total_in),
                zn(i, (t.total_in >> 8) & 255),
                zn(i, (t.total_in >> 16) & 255),
                zn(i, (t.total_in >> 24) & 255))
              : (Bn(i, t.adler >>> 16), Bn(i, 65535 & t.adler)),
            Pn(t),
            i.wrap > 0 && (i.wrap = -i.wrap),
            0 !== i.pending ? fn : dn);
      },
      Qn = (t, e) => {
        let i = e.length;
        if (Zn(t)) return bn;
        const r = t.state,
          s = r.wrap;
        if (2 === s || (1 === s && r.status !== Mn) || r.lookahead) return bn;
        if (
          (1 === s && (t.adler = Ys(t.adler, e, i, 0)),
          (r.wrap = 0),
          i >= r.w_size)
        ) {
          0 === s &&
            (Rn(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0));
          let t = new Uint8Array(r.w_size);
          t.set(e.subarray(i - r.w_size, i), 0), (e = t), (i = r.w_size);
        }
        const n = t.avail_in,
          a = t.next_in,
          o = t.input;
        for (
          t.avail_in = i, t.next_in = 0, t.input = e, Ln(r);
          r.lookahead >= 3;

        ) {
          let t = r.strstart,
            e = r.lookahead - 2;
          do {
            (r.ins_h = Un(r, r.ins_h, r.window[t + 3 - 1])),
              (r.prev[t & r.w_mask] = r.head[r.ins_h]),
              (r.head[r.ins_h] = t),
              t++;
          } while (--e);
          (r.strstart = t), (r.lookahead = 2), Ln(r);
        }
        return (
          (r.strstart += r.lookahead),
          (r.block_start = r.strstart),
          (r.insert = r.lookahead),
          (r.lookahead = 0),
          (r.match_length = r.prev_length = 2),
          (r.match_available = 0),
          (t.next_in = a),
          (t.input = o),
          (t.avail_in = n),
          (r.wrap = s),
          fn
        );
      },
      ta = {
        deflateInit: (t, e) => Jn(t, e, An, 15, 8, wn),
        deflateInit2: Jn,
        deflateReset: Yn,
        deflateResetKeep: Kn,
        deflateSetHeader: (t, e) =>
          Zn(t) || 2 !== t.state.wrap ? bn : ((t.state.gzhead = e), fn),
        deflate: $n,
        deflateEnd: (t) => {
          if (Zn(t)) return bn;
          const e = t.state.status;
          return (t.state = null), e === Sn ? Dn(t, gn) : fn;
        },
        deflateSetDictionary: Qn,
        deflateInfo: "pako deflate (from Nodeca project)",
      };
    const ea = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
    var ia = {
      assign: function (t) {
        const e = Array.prototype.slice.call(arguments, 1);
        for (; e.length; ) {
          const i = e.shift();
          if (i) {
            if ("object" != typeof i)
              throw new TypeError(i + "must be non-object");
            for (const e in i) ea(i, e) && (t[e] = i[e]);
          }
        }
        return t;
      },
      flattenChunks: (t) => {
        let e = 0;
        for (let i = 0, r = t.length; i < r; i++) e += t[i].length;
        const i = new Uint8Array(e);
        for (let e = 0, r = 0, s = t.length; e < s; e++) {
          let s = t[e];
          i.set(s, r), (r += s.length);
        }
        return i;
      },
    };
    let ra = !0;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
      ra = !1;
    }
    const sa = new Uint8Array(256);
    for (let t = 0; t < 256; t++)
      sa[t] =
        t >= 252
          ? 6
          : t >= 248
          ? 5
          : t >= 240
          ? 4
          : t >= 224
          ? 3
          : t >= 192
          ? 2
          : 1;
    sa[254] = sa[254] = 1;
    var na = {
      string2buf: (t) => {
        if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
          return new TextEncoder().encode(t);
        let e,
          i,
          r,
          s,
          n,
          a = t.length,
          o = 0;
        for (s = 0; s < a; s++)
          (i = t.charCodeAt(s)),
            55296 == (64512 & i) &&
              s + 1 < a &&
              ((r = t.charCodeAt(s + 1)),
              56320 == (64512 & r) &&
                ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), s++)),
            (o += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
        for (e = new Uint8Array(o), n = 0, s = 0; n < o; s++)
          (i = t.charCodeAt(s)),
            55296 == (64512 & i) &&
              s + 1 < a &&
              ((r = t.charCodeAt(s + 1)),
              56320 == (64512 & r) &&
                ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), s++)),
            i < 128
              ? (e[n++] = i)
              : i < 2048
              ? ((e[n++] = 192 | (i >>> 6)), (e[n++] = 128 | (63 & i)))
              : i < 65536
              ? ((e[n++] = 224 | (i >>> 12)),
                (e[n++] = 128 | ((i >>> 6) & 63)),
                (e[n++] = 128 | (63 & i)))
              : ((e[n++] = 240 | (i >>> 18)),
                (e[n++] = 128 | ((i >>> 12) & 63)),
                (e[n++] = 128 | ((i >>> 6) & 63)),
                (e[n++] = 128 | (63 & i)));
        return e;
      },
      buf2string: (t, e) => {
        const i = e || t.length;
        if ("function" == typeof TextDecoder && TextDecoder.prototype.decode)
          return new TextDecoder().decode(t.subarray(0, e));
        let r, s;
        const n = new Array(2 * i);
        for (s = 0, r = 0; r < i; ) {
          let e = t[r++];
          if (e < 128) {
            n[s++] = e;
            continue;
          }
          let a = sa[e];
          if (a > 4) (n[s++] = 65533), (r += a - 1);
          else {
            for (e &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < i; )
              (e = (e << 6) | (63 & t[r++])), a--;
            a > 1
              ? (n[s++] = 65533)
              : e < 65536
              ? (n[s++] = e)
              : ((e -= 65536),
                (n[s++] = 55296 | ((e >> 10) & 1023)),
                (n[s++] = 56320 | (1023 & e)));
          }
        }
        return ((t, e) => {
          if (e < 65534 && t.subarray && ra)
            return String.fromCharCode.apply(
              null,
              t.length === e ? t : t.subarray(0, e)
            );
          let i = "";
          for (let r = 0; r < e; r++) i += String.fromCharCode(t[r]);
          return i;
        })(n, s);
      },
      utf8border: (t, e) => {
        (e = e || t.length) > t.length && (e = t.length);
        let i = e - 1;
        for (; i >= 0 && 128 == (192 & t[i]); ) i--;
        return i < 0 || 0 === i ? e : i + sa[t[i]] > e ? i : e;
      },
    };
    var aa = function () {
      (this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ""),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0);
    };
    const oa = Object.prototype.toString,
      {
        Z_NO_FLUSH: la,
        Z_SYNC_FLUSH: ha,
        Z_FULL_FLUSH: ua,
        Z_FINISH: ca,
        Z_OK: fa,
        Z_STREAM_END: da,
        Z_DEFAULT_COMPRESSION: ba,
        Z_DEFAULT_STRATEGY: ga,
        Z_DEFLATED: _a,
      } = tn;
    function pa(t) {
      this.options = ia.assign(
        {
          level: ba,
          method: _a,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: ga,
        },
        t || {}
      );
      let e = this.options;
      e.raw && e.windowBits > 0
        ? (e.windowBits = -e.windowBits)
        : e.gzip &&
          e.windowBits > 0 &&
          e.windowBits < 16 &&
          (e.windowBits += 16),
        (this.err = 0),
        (this.msg = ""),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new aa()),
        (this.strm.avail_out = 0);
      let i = ta.deflateInit2(
        this.strm,
        e.level,
        e.method,
        e.windowBits,
        e.memLevel,
        e.strategy
      );
      if (i !== fa) throw new Error(Qs[i]);
      if (
        (e.header && ta.deflateSetHeader(this.strm, e.header), e.dictionary)
      ) {
        let t;
        if (
          ((t =
            "string" == typeof e.dictionary
              ? na.string2buf(e.dictionary)
              : "[object ArrayBuffer]" === oa.call(e.dictionary)
              ? new Uint8Array(e.dictionary)
              : e.dictionary),
          (i = ta.deflateSetDictionary(this.strm, t)),
          i !== fa)
        )
          throw new Error(Qs[i]);
        this._dict_set = !0;
      }
    }
    function ma(t, e) {
      const i = new pa(e);
      if ((i.push(t, !0), i.err)) throw i.msg || Qs[i.err];
      return i.result;
    }
    (pa.prototype.push = function (t, e) {
      const i = this.strm,
        r = this.options.chunkSize;
      let s, n;
      if (this.ended) return !1;
      for (
        n = e === ~~e ? e : !0 === e ? ca : la,
          "string" == typeof t
            ? (i.input = na.string2buf(t))
            : "[object ArrayBuffer]" === oa.call(t)
            ? (i.input = new Uint8Array(t))
            : (i.input = t),
          i.next_in = 0,
          i.avail_in = i.input.length;
        ;

      )
        if (
          (0 === i.avail_out &&
            ((i.output = new Uint8Array(r)),
            (i.next_out = 0),
            (i.avail_out = r)),
          (n === ha || n === ua) && i.avail_out <= 6)
        )
          this.onData(i.output.subarray(0, i.next_out)), (i.avail_out = 0);
        else {
          if (((s = ta.deflate(i, n)), s === da))
            return (
              i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)),
              (s = ta.deflateEnd(this.strm)),
              this.onEnd(s),
              (this.ended = !0),
              s === fa
            );
          if (0 !== i.avail_out) {
            if (n > 0 && i.next_out > 0)
              this.onData(i.output.subarray(0, i.next_out)), (i.avail_out = 0);
            else if (0 === i.avail_in) break;
          } else this.onData(i.output);
        }
      return !0;
    }),
      (pa.prototype.onData = function (t) {
        this.chunks.push(t);
      }),
      (pa.prototype.onEnd = function (t) {
        t === fa && (this.result = ia.flattenChunks(this.chunks)),
          (this.chunks = []),
          (this.err = t),
          (this.msg = this.strm.msg);
      });
    var va = {
      Deflate: pa,
      deflate: ma,
      deflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), ma(t, e);
      },
      gzip: function (t, e) {
        return ((e = e || {}).gzip = !0), ma(t, e);
      },
      constants: tn,
    };
    const xa = 16209;
    var Ta = function (t, e) {
      let i,
        r,
        s,
        n,
        a,
        o,
        l,
        h,
        u,
        c,
        f,
        d,
        b,
        g,
        _,
        p,
        m,
        v,
        x,
        T,
        w,
        y,
        A,
        E;
      const C = t.state;
      (i = t.next_in),
        (A = t.input),
        (r = i + (t.avail_in - 5)),
        (s = t.next_out),
        (E = t.output),
        (n = s - (e - t.avail_out)),
        (a = s + (t.avail_out - 257)),
        (o = C.dmax),
        (l = C.wsize),
        (h = C.whave),
        (u = C.wnext),
        (c = C.window),
        (f = C.hold),
        (d = C.bits),
        (b = C.lencode),
        (g = C.distcode),
        (_ = (1 << C.lenbits) - 1),
        (p = (1 << C.distbits) - 1);
      t: do {
        d < 15 && ((f += A[i++] << d), (d += 8), (f += A[i++] << d), (d += 8)),
          (m = b[f & _]);
        e: for (;;) {
          if (
            ((v = m >>> 24),
            (f >>>= v),
            (d -= v),
            (v = (m >>> 16) & 255),
            0 === v)
          )
            E[s++] = 65535 & m;
          else {
            if (!(16 & v)) {
              if (0 == (64 & v)) {
                m = b[(65535 & m) + (f & ((1 << v) - 1))];
                continue e;
              }
              if (32 & v) {
                C.mode = 16191;
                break t;
              }
              (t.msg = "invalid literal/length code"), (C.mode = xa);
              break t;
            }
            (x = 65535 & m),
              (v &= 15),
              v &&
                (d < v && ((f += A[i++] << d), (d += 8)),
                (x += f & ((1 << v) - 1)),
                (f >>>= v),
                (d -= v)),
              d < 15 &&
                ((f += A[i++] << d), (d += 8), (f += A[i++] << d), (d += 8)),
              (m = g[f & p]);
            i: for (;;) {
              if (
                ((v = m >>> 24),
                (f >>>= v),
                (d -= v),
                (v = (m >>> 16) & 255),
                !(16 & v))
              ) {
                if (0 == (64 & v)) {
                  m = g[(65535 & m) + (f & ((1 << v) - 1))];
                  continue i;
                }
                (t.msg = "invalid distance code"), (C.mode = xa);
                break t;
              }
              if (
                ((T = 65535 & m),
                (v &= 15),
                d < v &&
                  ((f += A[i++] << d),
                  (d += 8),
                  d < v && ((f += A[i++] << d), (d += 8))),
                (T += f & ((1 << v) - 1)),
                T > o)
              ) {
                (t.msg = "invalid distance too far back"), (C.mode = xa);
                break t;
              }
              if (((f >>>= v), (d -= v), (v = s - n), T > v)) {
                if (((v = T - v), v > h && C.sane)) {
                  (t.msg = "invalid distance too far back"), (C.mode = xa);
                  break t;
                }
                if (((w = 0), (y = c), 0 === u)) {
                  if (((w += l - v), v < x)) {
                    x -= v;
                    do {
                      E[s++] = c[w++];
                    } while (--v);
                    (w = s - T), (y = E);
                  }
                } else if (u < v) {
                  if (((w += l + u - v), (v -= u), v < x)) {
                    x -= v;
                    do {
                      E[s++] = c[w++];
                    } while (--v);
                    if (((w = 0), u < x)) {
                      (v = u), (x -= v);
                      do {
                        E[s++] = c[w++];
                      } while (--v);
                      (w = s - T), (y = E);
                    }
                  }
                } else if (((w += u - v), v < x)) {
                  x -= v;
                  do {
                    E[s++] = c[w++];
                  } while (--v);
                  (w = s - T), (y = E);
                }
                for (; x > 2; )
                  (E[s++] = y[w++]),
                    (E[s++] = y[w++]),
                    (E[s++] = y[w++]),
                    (x -= 3);
                x && ((E[s++] = y[w++]), x > 1 && (E[s++] = y[w++]));
              } else {
                w = s - T;
                do {
                  (E[s++] = E[w++]),
                    (E[s++] = E[w++]),
                    (E[s++] = E[w++]),
                    (x -= 3);
                } while (x > 2);
                x && ((E[s++] = E[w++]), x > 1 && (E[s++] = E[w++]));
              }
              break;
            }
          }
          break;
        }
      } while (i < r && s < a);
      (x = d >> 3),
        (i -= x),
        (d -= x << 3),
        (f &= (1 << d) - 1),
        (t.next_in = i),
        (t.next_out = s),
        (t.avail_in = i < r ? r - i + 5 : 5 - (i - r)),
        (t.avail_out = s < a ? a - s + 257 : 257 - (s - a)),
        (C.hold = f),
        (C.bits = d);
    };
    const wa = 15,
      ya = new Uint16Array([
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
      ]),
      Aa = new Uint8Array([
        16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
        19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
      ]),
      Ea = new Uint16Array([
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
        0, 0,
      ]),
      Ca = new Uint8Array([
        16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
        24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
      ]);
    var Ma = (t, e, i, r, s, n, a, o) => {
      const l = o.bits;
      let h,
        u,
        c,
        f,
        d,
        b,
        g = 0,
        _ = 0,
        p = 0,
        m = 0,
        v = 0,
        x = 0,
        T = 0,
        w = 0,
        y = 0,
        A = 0,
        E = null;
      const C = new Uint16Array(16),
        M = new Uint16Array(16);
      let S,
        k,
        D,
        F = null;
      for (g = 0; g <= wa; g++) C[g] = 0;
      for (_ = 0; _ < r; _++) C[e[i + _]]++;
      for (v = l, m = wa; m >= 1 && 0 === C[m]; m--);
      if ((v > m && (v = m), 0 === m))
        return (s[n++] = 20971520), (s[n++] = 20971520), (o.bits = 1), 0;
      for (p = 1; p < m && 0 === C[p]; p++);
      for (v < p && (v = p), w = 1, g = 1; g <= wa; g++)
        if (((w <<= 1), (w -= C[g]), w < 0)) return -1;
      if (w > 0 && (0 === t || 1 !== m)) return -1;
      for (M[1] = 0, g = 1; g < wa; g++) M[g + 1] = M[g] + C[g];
      for (_ = 0; _ < r; _++) 0 !== e[i + _] && (a[M[e[i + _]]++] = _);
      if (
        (0 === t
          ? ((E = F = a), (b = 20))
          : 1 === t
          ? ((E = ya), (F = Aa), (b = 257))
          : ((E = Ea), (F = Ca), (b = 0)),
        (A = 0),
        (_ = 0),
        (g = p),
        (d = n),
        (x = v),
        (T = 0),
        (c = -1),
        (y = 1 << v),
        (f = y - 1),
        (1 === t && y > 852) || (2 === t && y > 592))
      )
        return 1;
      for (;;) {
        (S = g - T),
          a[_] + 1 < b
            ? ((k = 0), (D = a[_]))
            : a[_] >= b
            ? ((k = F[a[_] - b]), (D = E[a[_] - b]))
            : ((k = 96), (D = 0)),
          (h = 1 << (g - T)),
          (u = 1 << x),
          (p = u);
        do {
          (u -= h), (s[d + (A >> T) + u] = (S << 24) | (k << 16) | D | 0);
        } while (0 !== u);
        for (h = 1 << (g - 1); A & h; ) h >>= 1;
        if ((0 !== h ? ((A &= h - 1), (A += h)) : (A = 0), _++, 0 == --C[g])) {
          if (g === m) break;
          g = e[i + a[_]];
        }
        if (g > v && (A & f) !== c) {
          for (
            0 === T && (T = v), d += p, x = g - T, w = 1 << x;
            x + T < m && ((w -= C[x + T]), !(w <= 0));

          )
            x++, (w <<= 1);
          if (((y += 1 << x), (1 === t && y > 852) || (2 === t && y > 592)))
            return 1;
          (c = A & f), (s[c] = (v << 24) | (x << 16) | (d - n) | 0);
        }
      }
      return (
        0 !== A && (s[d + A] = ((g - T) << 24) | (64 << 16) | 0),
        (o.bits = v),
        0
      );
    };
    const {
        Z_FINISH: Sa,
        Z_BLOCK: ka,
        Z_TREES: Da,
        Z_OK: Fa,
        Z_STREAM_END: Ra,
        Z_NEED_DICT: Ia,
        Z_STREAM_ERROR: Ua,
        Z_DATA_ERROR: Pa,
        Z_MEM_ERROR: Oa,
        Z_BUF_ERROR: za,
        Z_DEFLATED: Ba,
      } = tn,
      Na = 16180,
      Ga = 16190,
      La = 16191,
      Ha = 16192,
      ja = 16194,
      Va = 16199,
      qa = 16200,
      Wa = 16206,
      Xa = 16209,
      Za = (t) =>
        ((t >>> 24) & 255) +
        ((t >>> 8) & 65280) +
        ((65280 & t) << 8) +
        ((255 & t) << 24);
    function Ka() {
      (this.strm = null),
        (this.mode = 0),
        (this.last = !1),
        (this.wrap = 0),
        (this.havedict = !1),
        (this.flags = 0),
        (this.dmax = 0),
        (this.check = 0),
        (this.total = 0),
        (this.head = null),
        (this.wbits = 0),
        (this.wsize = 0),
        (this.whave = 0),
        (this.wnext = 0),
        (this.window = null),
        (this.hold = 0),
        (this.bits = 0),
        (this.length = 0),
        (this.offset = 0),
        (this.extra = 0),
        (this.lencode = null),
        (this.distcode = null),
        (this.lenbits = 0),
        (this.distbits = 0),
        (this.ncode = 0),
        (this.nlen = 0),
        (this.ndist = 0),
        (this.have = 0),
        (this.next = null),
        (this.lens = new Uint16Array(320)),
        (this.work = new Uint16Array(288)),
        (this.lendyn = null),
        (this.distdyn = null),
        (this.sane = 0),
        (this.back = 0),
        (this.was = 0);
    }
    const Ya = (t) => {
        if (!t) return 1;
        const e = t.state;
        return !e || e.strm !== t || e.mode < Na || e.mode > 16211 ? 1 : 0;
      },
      Ja = (t) => {
        if (Ya(t)) return Ua;
        const e = t.state;
        return (
          (t.total_in = t.total_out = e.total = 0),
          (t.msg = ""),
          e.wrap && (t.adler = 1 & e.wrap),
          (e.mode = Na),
          (e.last = 0),
          (e.havedict = 0),
          (e.flags = -1),
          (e.dmax = 32768),
          (e.head = null),
          (e.hold = 0),
          (e.bits = 0),
          (e.lencode = e.lendyn = new Int32Array(852)),
          (e.distcode = e.distdyn = new Int32Array(592)),
          (e.sane = 1),
          (e.back = -1),
          Fa
        );
      },
      $a = (t) => {
        if (Ya(t)) return Ua;
        const e = t.state;
        return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), Ja(t);
      },
      Qa = (t, e) => {
        let i;
        if (Ya(t)) return Ua;
        const r = t.state;
        return (
          e < 0
            ? ((i = 0), (e = -e))
            : ((i = 5 + (e >> 4)), e < 48 && (e &= 15)),
          e && (e < 8 || e > 15)
            ? Ua
            : (null !== r.window && r.wbits !== e && (r.window = null),
              (r.wrap = i),
              (r.wbits = e),
              $a(t))
        );
      },
      to = (t, e) => {
        if (!t) return Ua;
        const i = new Ka();
        (t.state = i), (i.strm = t), (i.window = null), (i.mode = Na);
        const r = Qa(t, e);
        return r !== Fa && (t.state = null), r;
      };
    let eo,
      io,
      ro = !0;
    const so = (t) => {
        if (ro) {
          (eo = new Int32Array(512)), (io = new Int32Array(32));
          let e = 0;
          for (; e < 144; ) t.lens[e++] = 8;
          for (; e < 256; ) t.lens[e++] = 9;
          for (; e < 280; ) t.lens[e++] = 7;
          for (; e < 288; ) t.lens[e++] = 8;
          for (
            Ma(1, t.lens, 0, 288, eo, 0, t.work, { bits: 9 }), e = 0;
            e < 32;

          )
            t.lens[e++] = 5;
          Ma(2, t.lens, 0, 32, io, 0, t.work, { bits: 5 }), (ro = !1);
        }
        (t.lencode = eo), (t.lenbits = 9), (t.distcode = io), (t.distbits = 5);
      },
      no = (t, e, i, r) => {
        let s;
        const n = t.state;
        return (
          null === n.window &&
            ((n.wsize = 1 << n.wbits),
            (n.wnext = 0),
            (n.whave = 0),
            (n.window = new Uint8Array(n.wsize))),
          r >= n.wsize
            ? (n.window.set(e.subarray(i - n.wsize, i), 0),
              (n.wnext = 0),
              (n.whave = n.wsize))
            : ((s = n.wsize - n.wnext),
              s > r && (s = r),
              n.window.set(e.subarray(i - r, i - r + s), n.wnext),
              (r -= s)
                ? (n.window.set(e.subarray(i - r, i), 0),
                  (n.wnext = r),
                  (n.whave = n.wsize))
                : ((n.wnext += s),
                  n.wnext === n.wsize && (n.wnext = 0),
                  n.whave < n.wsize && (n.whave += s))),
          0
        );
      };
    var ao = (t, e) => {
        let i,
          r,
          s,
          n,
          a,
          o,
          l,
          h,
          u,
          c,
          f,
          d,
          b,
          g,
          _,
          p,
          m,
          v,
          x,
          T,
          w,
          y,
          A = 0;
        const E = new Uint8Array(4);
        let C, M;
        const S = new Uint8Array([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]);
        if (Ya(t) || !t.output || (!t.input && 0 !== t.avail_in)) return Ua;
        (i = t.state),
          i.mode === La && (i.mode = Ha),
          (a = t.next_out),
          (s = t.output),
          (l = t.avail_out),
          (n = t.next_in),
          (r = t.input),
          (o = t.avail_in),
          (h = i.hold),
          (u = i.bits),
          (c = o),
          (f = l),
          (y = Fa);
        t: for (;;)
          switch (i.mode) {
            case Na:
              if (0 === i.wrap) {
                i.mode = Ha;
                break;
              }
              for (; u < 16; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              if (2 & i.wrap && 35615 === h) {
                0 === i.wbits && (i.wbits = 15),
                  (i.check = 0),
                  (E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (i.check = $s(i.check, E, 2, 0)),
                  (h = 0),
                  (u = 0),
                  (i.mode = 16181);
                break;
              }
              if (
                (i.head && (i.head.done = !1),
                !(1 & i.wrap) || (((255 & h) << 8) + (h >> 8)) % 31)
              ) {
                (t.msg = "incorrect header check"), (i.mode = Xa);
                break;
              }
              if ((15 & h) !== Ba) {
                (t.msg = "unknown compression method"), (i.mode = Xa);
                break;
              }
              if (
                ((h >>>= 4),
                (u -= 4),
                (w = 8 + (15 & h)),
                0 === i.wbits && (i.wbits = w),
                w > 15 || w > i.wbits)
              ) {
                (t.msg = "invalid window size"), (i.mode = Xa);
                break;
              }
              (i.dmax = 1 << i.wbits),
                (i.flags = 0),
                (t.adler = i.check = 1),
                (i.mode = 512 & h ? 16189 : La),
                (h = 0),
                (u = 0);
              break;
            case 16181:
              for (; u < 16; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              if (((i.flags = h), (255 & i.flags) !== Ba)) {
                (t.msg = "unknown compression method"), (i.mode = Xa);
                break;
              }
              if (57344 & i.flags) {
                (t.msg = "unknown header flags set"), (i.mode = Xa);
                break;
              }
              i.head && (i.head.text = (h >> 8) & 1),
                512 & i.flags &&
                  4 & i.wrap &&
                  ((E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (i.check = $s(i.check, E, 2, 0))),
                (h = 0),
                (u = 0),
                (i.mode = 16182);
            case 16182:
              for (; u < 32; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              i.head && (i.head.time = h),
                512 & i.flags &&
                  4 & i.wrap &&
                  ((E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (E[2] = (h >>> 16) & 255),
                  (E[3] = (h >>> 24) & 255),
                  (i.check = $s(i.check, E, 4, 0))),
                (h = 0),
                (u = 0),
                (i.mode = 16183);
            case 16183:
              for (; u < 16; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              i.head && ((i.head.xflags = 255 & h), (i.head.os = h >> 8)),
                512 & i.flags &&
                  4 & i.wrap &&
                  ((E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (i.check = $s(i.check, E, 2, 0))),
                (h = 0),
                (u = 0),
                (i.mode = 16184);
            case 16184:
              if (1024 & i.flags) {
                for (; u < 16; ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                (i.length = h),
                  i.head && (i.head.extra_len = h),
                  512 & i.flags &&
                    4 & i.wrap &&
                    ((E[0] = 255 & h),
                    (E[1] = (h >>> 8) & 255),
                    (i.check = $s(i.check, E, 2, 0))),
                  (h = 0),
                  (u = 0);
              } else i.head && (i.head.extra = null);
              i.mode = 16185;
            case 16185:
              if (
                1024 & i.flags &&
                ((d = i.length),
                d > o && (d = o),
                d &&
                  (i.head &&
                    ((w = i.head.extra_len - i.length),
                    i.head.extra ||
                      (i.head.extra = new Uint8Array(i.head.extra_len)),
                    i.head.extra.set(r.subarray(n, n + d), w)),
                  512 & i.flags &&
                    4 & i.wrap &&
                    (i.check = $s(i.check, r, d, n)),
                  (o -= d),
                  (n += d),
                  (i.length -= d)),
                i.length)
              )
                break t;
              (i.length = 0), (i.mode = 16186);
            case 16186:
              if (2048 & i.flags) {
                if (0 === o) break t;
                d = 0;
                do {
                  (w = r[n + d++]),
                    i.head &&
                      w &&
                      i.length < 65536 &&
                      (i.head.name += String.fromCharCode(w));
                } while (w && d < o);
                if (
                  (512 & i.flags &&
                    4 & i.wrap &&
                    (i.check = $s(i.check, r, d, n)),
                  (o -= d),
                  (n += d),
                  w)
                )
                  break t;
              } else i.head && (i.head.name = null);
              (i.length = 0), (i.mode = 16187);
            case 16187:
              if (4096 & i.flags) {
                if (0 === o) break t;
                d = 0;
                do {
                  (w = r[n + d++]),
                    i.head &&
                      w &&
                      i.length < 65536 &&
                      (i.head.comment += String.fromCharCode(w));
                } while (w && d < o);
                if (
                  (512 & i.flags &&
                    4 & i.wrap &&
                    (i.check = $s(i.check, r, d, n)),
                  (o -= d),
                  (n += d),
                  w)
                )
                  break t;
              } else i.head && (i.head.comment = null);
              i.mode = 16188;
            case 16188:
              if (512 & i.flags) {
                for (; u < 16; ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                if (4 & i.wrap && h !== (65535 & i.check)) {
                  (t.msg = "header crc mismatch"), (i.mode = Xa);
                  break;
                }
                (h = 0), (u = 0);
              }
              i.head &&
                ((i.head.hcrc = (i.flags >> 9) & 1), (i.head.done = !0)),
                (t.adler = i.check = 0),
                (i.mode = La);
              break;
            case 16189:
              for (; u < 32; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              (t.adler = i.check = Za(h)), (h = 0), (u = 0), (i.mode = Ga);
            case Ga:
              if (0 === i.havedict)
                return (
                  (t.next_out = a),
                  (t.avail_out = l),
                  (t.next_in = n),
                  (t.avail_in = o),
                  (i.hold = h),
                  (i.bits = u),
                  Ia
                );
              (t.adler = i.check = 1), (i.mode = La);
            case La:
              if (e === ka || e === Da) break t;
            case Ha:
              if (i.last) {
                (h >>>= 7 & u), (u -= 7 & u), (i.mode = Wa);
                break;
              }
              for (; u < 3; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              switch (((i.last = 1 & h), (h >>>= 1), (u -= 1), 3 & h)) {
                case 0:
                  i.mode = 16193;
                  break;
                case 1:
                  if ((so(i), (i.mode = Va), e === Da)) {
                    (h >>>= 2), (u -= 2);
                    break t;
                  }
                  break;
                case 2:
                  i.mode = 16196;
                  break;
                case 3:
                  (t.msg = "invalid block type"), (i.mode = Xa);
              }
              (h >>>= 2), (u -= 2);
              break;
            case 16193:
              for (h >>>= 7 & u, u -= 7 & u; u < 32; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              if ((65535 & h) != ((h >>> 16) ^ 65535)) {
                (t.msg = "invalid stored block lengths"), (i.mode = Xa);
                break;
              }
              if (
                ((i.length = 65535 & h),
                (h = 0),
                (u = 0),
                (i.mode = ja),
                e === Da)
              )
                break t;
            case ja:
              i.mode = 16195;
            case 16195:
              if (((d = i.length), d)) {
                if ((d > o && (d = o), d > l && (d = l), 0 === d)) break t;
                s.set(r.subarray(n, n + d), a),
                  (o -= d),
                  (n += d),
                  (l -= d),
                  (a += d),
                  (i.length -= d);
                break;
              }
              i.mode = La;
              break;
            case 16196:
              for (; u < 14; ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              if (
                ((i.nlen = 257 + (31 & h)),
                (h >>>= 5),
                (u -= 5),
                (i.ndist = 1 + (31 & h)),
                (h >>>= 5),
                (u -= 5),
                (i.ncode = 4 + (15 & h)),
                (h >>>= 4),
                (u -= 4),
                i.nlen > 286 || i.ndist > 30)
              ) {
                (t.msg = "too many length or distance symbols"), (i.mode = Xa);
                break;
              }
              (i.have = 0), (i.mode = 16197);
            case 16197:
              for (; i.have < i.ncode; ) {
                for (; u < 3; ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                (i.lens[S[i.have++]] = 7 & h), (h >>>= 3), (u -= 3);
              }
              for (; i.have < 19; ) i.lens[S[i.have++]] = 0;
              if (
                ((i.lencode = i.lendyn),
                (i.lenbits = 7),
                (C = { bits: i.lenbits }),
                (y = Ma(0, i.lens, 0, 19, i.lencode, 0, i.work, C)),
                (i.lenbits = C.bits),
                y)
              ) {
                (t.msg = "invalid code lengths set"), (i.mode = Xa);
                break;
              }
              (i.have = 0), (i.mode = 16198);
            case 16198:
              for (; i.have < i.nlen + i.ndist; ) {
                for (
                  ;
                  (A = i.lencode[h & ((1 << i.lenbits) - 1)]),
                    (_ = A >>> 24),
                    (p = (A >>> 16) & 255),
                    (m = 65535 & A),
                    !(_ <= u);

                ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                if (m < 16) (h >>>= _), (u -= _), (i.lens[i.have++] = m);
                else {
                  if (16 === m) {
                    for (M = _ + 2; u < M; ) {
                      if (0 === o) break t;
                      o--, (h += r[n++] << u), (u += 8);
                    }
                    if (((h >>>= _), (u -= _), 0 === i.have)) {
                      (t.msg = "invalid bit length repeat"), (i.mode = Xa);
                      break;
                    }
                    (w = i.lens[i.have - 1]),
                      (d = 3 + (3 & h)),
                      (h >>>= 2),
                      (u -= 2);
                  } else if (17 === m) {
                    for (M = _ + 3; u < M; ) {
                      if (0 === o) break t;
                      o--, (h += r[n++] << u), (u += 8);
                    }
                    (h >>>= _),
                      (u -= _),
                      (w = 0),
                      (d = 3 + (7 & h)),
                      (h >>>= 3),
                      (u -= 3);
                  } else {
                    for (M = _ + 7; u < M; ) {
                      if (0 === o) break t;
                      o--, (h += r[n++] << u), (u += 8);
                    }
                    (h >>>= _),
                      (u -= _),
                      (w = 0),
                      (d = 11 + (127 & h)),
                      (h >>>= 7),
                      (u -= 7);
                  }
                  if (i.have + d > i.nlen + i.ndist) {
                    (t.msg = "invalid bit length repeat"), (i.mode = Xa);
                    break;
                  }
                  for (; d--; ) i.lens[i.have++] = w;
                }
              }
              if (i.mode === Xa) break;
              if (0 === i.lens[256]) {
                (t.msg = "invalid code -- missing end-of-block"), (i.mode = Xa);
                break;
              }
              if (
                ((i.lenbits = 9),
                (C = { bits: i.lenbits }),
                (y = Ma(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, C)),
                (i.lenbits = C.bits),
                y)
              ) {
                (t.msg = "invalid literal/lengths set"), (i.mode = Xa);
                break;
              }
              if (
                ((i.distbits = 6),
                (i.distcode = i.distdyn),
                (C = { bits: i.distbits }),
                (y = Ma(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, C)),
                (i.distbits = C.bits),
                y)
              ) {
                (t.msg = "invalid distances set"), (i.mode = Xa);
                break;
              }
              if (((i.mode = Va), e === Da)) break t;
            case Va:
              i.mode = qa;
            case qa:
              if (o >= 6 && l >= 258) {
                (t.next_out = a),
                  (t.avail_out = l),
                  (t.next_in = n),
                  (t.avail_in = o),
                  (i.hold = h),
                  (i.bits = u),
                  Ta(t, f),
                  (a = t.next_out),
                  (s = t.output),
                  (l = t.avail_out),
                  (n = t.next_in),
                  (r = t.input),
                  (o = t.avail_in),
                  (h = i.hold),
                  (u = i.bits),
                  i.mode === La && (i.back = -1);
                break;
              }
              for (
                i.back = 0;
                (A = i.lencode[h & ((1 << i.lenbits) - 1)]),
                  (_ = A >>> 24),
                  (p = (A >>> 16) & 255),
                  (m = 65535 & A),
                  !(_ <= u);

              ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              if (p && 0 == (240 & p)) {
                for (
                  v = _, x = p, T = m;
                  (A = i.lencode[T + ((h & ((1 << (v + x)) - 1)) >> v)]),
                    (_ = A >>> 24),
                    (p = (A >>> 16) & 255),
                    (m = 65535 & A),
                    !(v + _ <= u);

                ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                (h >>>= v), (u -= v), (i.back += v);
              }
              if (
                ((h >>>= _), (u -= _), (i.back += _), (i.length = m), 0 === p)
              ) {
                i.mode = 16205;
                break;
              }
              if (32 & p) {
                (i.back = -1), (i.mode = La);
                break;
              }
              if (64 & p) {
                (t.msg = "invalid literal/length code"), (i.mode = Xa);
                break;
              }
              (i.extra = 15 & p), (i.mode = 16201);
            case 16201:
              if (i.extra) {
                for (M = i.extra; u < M; ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                (i.length += h & ((1 << i.extra) - 1)),
                  (h >>>= i.extra),
                  (u -= i.extra),
                  (i.back += i.extra);
              }
              (i.was = i.length), (i.mode = 16202);
            case 16202:
              for (
                ;
                (A = i.distcode[h & ((1 << i.distbits) - 1)]),
                  (_ = A >>> 24),
                  (p = (A >>> 16) & 255),
                  (m = 65535 & A),
                  !(_ <= u);

              ) {
                if (0 === o) break t;
                o--, (h += r[n++] << u), (u += 8);
              }
              if (0 == (240 & p)) {
                for (
                  v = _, x = p, T = m;
                  (A = i.distcode[T + ((h & ((1 << (v + x)) - 1)) >> v)]),
                    (_ = A >>> 24),
                    (p = (A >>> 16) & 255),
                    (m = 65535 & A),
                    !(v + _ <= u);

                ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                (h >>>= v), (u -= v), (i.back += v);
              }
              if (((h >>>= _), (u -= _), (i.back += _), 64 & p)) {
                (t.msg = "invalid distance code"), (i.mode = Xa);
                break;
              }
              (i.offset = m), (i.extra = 15 & p), (i.mode = 16203);
            case 16203:
              if (i.extra) {
                for (M = i.extra; u < M; ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                (i.offset += h & ((1 << i.extra) - 1)),
                  (h >>>= i.extra),
                  (u -= i.extra),
                  (i.back += i.extra);
              }
              if (i.offset > i.dmax) {
                (t.msg = "invalid distance too far back"), (i.mode = Xa);
                break;
              }
              i.mode = 16204;
            case 16204:
              if (0 === l) break t;
              if (((d = f - l), i.offset > d)) {
                if (((d = i.offset - d), d > i.whave && i.sane)) {
                  (t.msg = "invalid distance too far back"), (i.mode = Xa);
                  break;
                }
                d > i.wnext
                  ? ((d -= i.wnext), (b = i.wsize - d))
                  : (b = i.wnext - d),
                  d > i.length && (d = i.length),
                  (g = i.window);
              } else (g = s), (b = a - i.offset), (d = i.length);
              d > l && (d = l), (l -= d), (i.length -= d);
              do {
                s[a++] = g[b++];
              } while (--d);
              0 === i.length && (i.mode = qa);
              break;
            case 16205:
              if (0 === l) break t;
              (s[a++] = i.length), l--, (i.mode = qa);
              break;
            case Wa:
              if (i.wrap) {
                for (; u < 32; ) {
                  if (0 === o) break t;
                  o--, (h |= r[n++] << u), (u += 8);
                }
                if (
                  ((f -= l),
                  (t.total_out += f),
                  (i.total += f),
                  4 & i.wrap &&
                    f &&
                    (t.adler = i.check =
                      i.flags
                        ? $s(i.check, s, f, a - f)
                        : Ys(i.check, s, f, a - f)),
                  (f = l),
                  4 & i.wrap && (i.flags ? h : Za(h)) !== i.check)
                ) {
                  (t.msg = "incorrect data check"), (i.mode = Xa);
                  break;
                }
                (h = 0), (u = 0);
              }
              i.mode = 16207;
            case 16207:
              if (i.wrap && i.flags) {
                for (; u < 32; ) {
                  if (0 === o) break t;
                  o--, (h += r[n++] << u), (u += 8);
                }
                if (4 & i.wrap && h !== (4294967295 & i.total)) {
                  (t.msg = "incorrect length check"), (i.mode = Xa);
                  break;
                }
                (h = 0), (u = 0);
              }
              i.mode = 16208;
            case 16208:
              y = Ra;
              break t;
            case Xa:
              y = Pa;
              break t;
            case 16210:
              return Oa;
            default:
              return Ua;
          }
        return (
          (t.next_out = a),
          (t.avail_out = l),
          (t.next_in = n),
          (t.avail_in = o),
          (i.hold = h),
          (i.bits = u),
          (i.wsize ||
            (f !== t.avail_out && i.mode < Xa && (i.mode < Wa || e !== Sa))) &&
            no(t, t.output, t.next_out, f - t.avail_out),
          (c -= t.avail_in),
          (f -= t.avail_out),
          (t.total_in += c),
          (t.total_out += f),
          (i.total += f),
          4 & i.wrap &&
            f &&
            (t.adler = i.check =
              i.flags
                ? $s(i.check, s, f, t.next_out - f)
                : Ys(i.check, s, f, t.next_out - f)),
          (t.data_type =
            i.bits +
            (i.last ? 64 : 0) +
            (i.mode === La ? 128 : 0) +
            (i.mode === Va || i.mode === ja ? 256 : 0)),
          ((0 === c && 0 === f) || e === Sa) && y === Fa && (y = za),
          y
        );
      },
      oo = {
        inflateReset: $a,
        inflateReset2: Qa,
        inflateResetKeep: Ja,
        inflateInit: (t) => to(t, 15),
        inflateInit2: to,
        inflate: ao,
        inflateEnd: (t) => {
          if (Ya(t)) return Ua;
          let e = t.state;
          return e.window && (e.window = null), (t.state = null), Fa;
        },
        inflateGetHeader: (t, e) => {
          if (Ya(t)) return Ua;
          const i = t.state;
          return 0 == (2 & i.wrap) ? Ua : ((i.head = e), (e.done = !1), Fa);
        },
        inflateSetDictionary: (t, e) => {
          const i = e.length;
          let r, s, n;
          return Ya(t)
            ? Ua
            : ((r = t.state),
              0 !== r.wrap && r.mode !== Ga
                ? Ua
                : r.mode === Ga &&
                  ((s = 1), (s = Ys(s, e, i, 0)), s !== r.check)
                ? Pa
                : ((n = no(t, e, i, i)),
                  n ? ((r.mode = 16210), Oa) : ((r.havedict = 1), Fa)));
        },
        inflateInfo: "pako inflate (from Nodeca project)",
      };
    var lo = function () {
      (this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ""),
        (this.comment = ""),
        (this.hcrc = 0),
        (this.done = !1);
    };
    const ho = Object.prototype.toString,
      {
        Z_NO_FLUSH: uo,
        Z_FINISH: co,
        Z_OK: fo,
        Z_STREAM_END: bo,
        Z_NEED_DICT: go,
        Z_STREAM_ERROR: _o,
        Z_DATA_ERROR: po,
        Z_MEM_ERROR: mo,
      } = tn;
    function vo(t) {
      this.options = ia.assign(
        { chunkSize: 65536, windowBits: 15, to: "" },
        t || {}
      );
      const e = this.options;
      e.raw &&
        e.windowBits >= 0 &&
        e.windowBits < 16 &&
        ((e.windowBits = -e.windowBits),
        0 === e.windowBits && (e.windowBits = -15)),
        !(e.windowBits >= 0 && e.windowBits < 16) ||
          (t && t.windowBits) ||
          (e.windowBits += 32),
        e.windowBits > 15 &&
          e.windowBits < 48 &&
          0 == (15 & e.windowBits) &&
          (e.windowBits |= 15),
        (this.err = 0),
        (this.msg = ""),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new aa()),
        (this.strm.avail_out = 0);
      let i = oo.inflateInit2(this.strm, e.windowBits);
      if (i !== fo) throw new Error(Qs[i]);
      if (
        ((this.header = new lo()),
        oo.inflateGetHeader(this.strm, this.header),
        e.dictionary &&
          ("string" == typeof e.dictionary
            ? (e.dictionary = na.string2buf(e.dictionary))
            : "[object ArrayBuffer]" === ho.call(e.dictionary) &&
              (e.dictionary = new Uint8Array(e.dictionary)),
          e.raw &&
            ((i = oo.inflateSetDictionary(this.strm, e.dictionary)), i !== fo)))
      )
        throw new Error(Qs[i]);
    }
    function xo(t, e) {
      const i = new vo(e);
      if ((i.push(t), i.err)) throw i.msg || Qs[i.err];
      return i.result;
    }
    (vo.prototype.push = function (t, e) {
      const i = this.strm,
        r = this.options.chunkSize,
        s = this.options.dictionary;
      let n, a, o;
      if (this.ended) return !1;
      for (
        a = e === ~~e ? e : !0 === e ? co : uo,
          "[object ArrayBuffer]" === ho.call(t)
            ? (i.input = new Uint8Array(t))
            : (i.input = t),
          i.next_in = 0,
          i.avail_in = i.input.length;
        ;

      ) {
        for (
          0 === i.avail_out &&
            ((i.output = new Uint8Array(r)),
            (i.next_out = 0),
            (i.avail_out = r)),
            n = oo.inflate(i, a),
            n === go &&
              s &&
              ((n = oo.inflateSetDictionary(i, s)),
              n === fo ? (n = oo.inflate(i, a)) : n === po && (n = go));
          i.avail_in > 0 && n === bo && i.state.wrap > 0 && 0 !== t[i.next_in];

        )
          oo.inflateReset(i), (n = oo.inflate(i, a));
        switch (n) {
          case _o:
          case po:
          case go:
          case mo:
            return this.onEnd(n), (this.ended = !0), !1;
        }
        if (((o = i.avail_out), i.next_out && (0 === i.avail_out || n === bo)))
          if ("string" === this.options.to) {
            let t = na.utf8border(i.output, i.next_out),
              e = i.next_out - t,
              s = na.buf2string(i.output, t);
            (i.next_out = e),
              (i.avail_out = r - e),
              e && i.output.set(i.output.subarray(t, t + e), 0),
              this.onData(s);
          } else
            this.onData(
              i.output.length === i.next_out
                ? i.output
                : i.output.subarray(0, i.next_out)
            );
        if (n !== fo || 0 !== o) {
          if (n === bo)
            return (
              (n = oo.inflateEnd(this.strm)),
              this.onEnd(n),
              (this.ended = !0),
              !0
            );
          if (0 === i.avail_in) break;
        }
      }
      return !0;
    }),
      (vo.prototype.onData = function (t) {
        this.chunks.push(t);
      }),
      (vo.prototype.onEnd = function (t) {
        t === fo &&
          ("string" === this.options.to
            ? (this.result = this.chunks.join(""))
            : (this.result = ia.flattenChunks(this.chunks))),
          (this.chunks = []),
          (this.err = t),
          (this.msg = this.strm.msg);
      });
    var To = {
      Inflate: vo,
      inflate: xo,
      inflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), xo(t, e);
      },
      ungzip: xo,
      constants: tn,
    };
    const { Deflate: wo, deflate: yo, deflateRaw: Ao, gzip: Eo } = va,
      { Inflate: Co, inflate: Mo, inflateRaw: So, ungzip: ko } = To;
    var Do = Mo;
    const Fo = class {
      constructor(t) {
        (this.a = t.getUint16()), (this.b = t.getUint16());
      }
      static c(t) {
        (t.E = !1),
          t.o.aw && t.g < t.o.aw.length
            ? (t.r = t.o.aw[t.g])
            : (t.r = { a: 0, b: 0 }),
          (t.x = 0 != (1 & t.r.a)),
          (t.y = 0 == (4 & t.r.a)),
          (t.z = 0 != (16 & t.r.a));
      }
    };
    class Ro {
      static a(t) {
        const e = 32767 & t;
        return e < Io.length
          ? Io[e]
          : (WH.debug("Unknown shader effect:", e),
            ["PS_Combiners_Opaque", "VS_Diffuse_T1"]);
      }
      static b(t, e) {
        var i = "";
        if (-1e3 == t && 3 == e) return "Skin";
        if (32768 & t) return Ro.a(t)[0];
        if (1 == e) i = 112 & t ? "PS_Combiners_Mod" : "PS_Combiners_Opaque";
        else {
          i =
            (112 & t ? "PS_Combiners_Mod" : "PS_Combiners_Opaque") +
            "_" +
            (112 & t
              ? [
                  "Opaque",
                  "Mod",
                  "Mod",
                  "Add",
                  "Mod2x",
                  "Mod",
                  "Mod2xNA",
                  "AddNA",
                ]
              : [
                  "Opaque",
                  "Mod",
                  "Mod",
                  "AddAlpha",
                  "Mod2x",
                  "Mod",
                  "Mod2xNA",
                  "AddAlpha",
                ])[7 & t];
        }
        return i;
      }
      static c(t, e) {
        var i = "";
        if (-1e3 == t && 3 == e) i = "T1_T1_T1";
        else {
          if (32768 & t) return Ro.a(t)[1];
          i =
            1 == e
              ? 128 & t
                ? "Env"
                : 16384 & t
                ? "T2"
                : "T1"
              : 128 & t
              ? 8 & t
                ? "Env_Env"
                : "Env_T1"
              : 8 & t
              ? "T1_Env"
              : 16384 & t
              ? "T1_T2"
              : "T1_T1";
        }
        return "VS_Diffuse_" + i;
      }
      static d(t, e, i) {
        var r = Ro.b(t, e),
          s = Ro.c(t, e),
          n = "Wow." + s + "_" + r;
        if (hi._GetProgram(n)) return { name: n };
        var a = {
          shaders: [Ro.g(s), Ro.h(s, r, i)],
          attributes: {
            position: "aPosition",
            normal: "aNormal",
            texcoord0: "aTexCoord0",
            texcoord1: "aTexCoord1",
          },
        };
        return hi.RegisterProgram(n, a), { name: n };
      }
      static e(t) {
        var e = {},
          i = {
            texcoord1: function (t, e) {
              t.INPUT_TEXCOORD1 = "aTexCoord" + e;
            },
          };
        for (var r in t.options) {
          var s = t.options[r];
          i[r](e, s);
        }
        return { name: "Wow." + t.name, config: e };
      }
      static f(t) {
        var e = "";
        if (
          ((e +=
            "lTexCoord1 = (uTextureMatrix1 * vec4(vTexCoord1, 0, 1)).st;\n"),
          (e +=
            "lTexCoord2 = (uTextureMatrix2 * vec4(vTexCoord2, 0, 1)).st;\n"),
          "VS" === t.slice(0, 2))
        ) {
          var i = (t = t.slice(3)).split("_"),
            r = i[0];
          if ("Diffuse" === r || "Color" === r) {
            (e = ""), i.splice(0, 1);
            var s = {
                T1: ["uTextureMatrix1", "vTexCoord1"],
                T2: ["uTextureMatrix2", "vTexCoord2"],
                T3: ["", "aTexCoord2"],
                Env: ["", "texEnv"],
              },
              n = 1;
            for (var a in i)
              s[i[a]]
                ? (s[i[a]][0] && "texEnv" != s[i[a]][1]
                    ? (e +=
                        "lTexCoord" +
                        n +
                        " = (" +
                        s[i[a]][0] +
                        " * vec4(" +
                        s[i[a]][1] +
                        ", 0, 1)).st;\n")
                    : "texEnv" == s[i[a]][1]
                    ? (e += "lTexCoord" + n + " = texEnv;\n")
                    : (e +=
                        "lTexCoord" +
                        n +
                        " = (uTextureMatrix" +
                        n +
                        " * vec4(" +
                        s[i[a]][1] +
                        ", 0, 1)).st;\n"),
                  n++)
                : WH.debug("Missing vertex shader def?", t);
          }
        }
        return e;
      }
      static g(t) {
        return (
          "            attribute vec3 aPosition;\n            attribute vec3 aNormal;\n            attribute vec2 aTexCoord0;\n            attribute vec2 aTexCoord1;\n            attribute vec3 aColor;\n            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            \n            uniform mat4 uModelMatrix;\n            uniform mat4 uPanningMatrix;\n            uniform mat4 uViewMatrix;\n            uniform mat4 uInvTranspViewModelMat;\n            uniform mat4 uProjMatrix;\n            uniform vec3 uCameraPos;\n            \n            void main(void) {\n              vec4 pos = uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vPosition = pos.rgb;\n              gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vTexCoord1 = aTexCoord0;\n              vTexCoord2 = aTexCoord1;\n              vNormal = normalize((uInvTranspViewModelMat * vec4(aNormal, 0.0)).xyz);            }",
          "            attribute vec3 aPosition;\n            attribute vec3 aNormal;\n            attribute vec2 aTexCoord0;\n            attribute vec2 aTexCoord1;\n            attribute vec3 aColor;\n            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            \n            uniform mat4 uModelMatrix;\n            uniform mat4 uPanningMatrix;\n            uniform mat4 uViewMatrix;\n            uniform mat4 uInvTranspViewModelMat;\n            uniform mat4 uProjMatrix;\n            uniform vec3 uCameraPos;\n            \n            void main(void) {\n              vec4 pos = uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vPosition = pos.rgb;\n              gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vTexCoord1 = aTexCoord0;\n              vTexCoord2 = aTexCoord1;\n              vNormal = normalize((uInvTranspViewModelMat * vec4(aNormal, 0.0)).xyz);            }"
        );
      }
      static h(t, e, i) {
        var r = Uo[e];
        r ||
          (WH.debug("Missing pixel shader def", e),
          (r = Uo[(e = "PS_Combiners_Opaque_Mod")]));
        for (
          var s = "\t\t" + r.slice(1, r.length).join("\n\t\t"), n = 0;
          n < r[0];
          n++
        ) {
          var a = n + 1;
          s =
            "vec4 tex" +
            n +
            " = texture2D(uTexture" +
            a +
            ", lTexCoord" +
            a +
            ".st);\n" +
            s;
        }
        return (
          "            precision mediump float;            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform bool uHasAlpha;\n            uniform bool uHasSpecEmiss;\n            uniform bool uHasEmissiveGlowing;\n            uniform int uBlendMode;\n            uniform bool uUnlit;\n            uniform vec4 uColor;\n            uniform vec4 uAmbientColor;\n            uniform vec4 uDiffuseColor;\n            uniform vec4 uPrimaryColor;\n            uniform vec4 uSecondaryColor;\n            uniform vec3 uLightDir1;\n            uniform vec3 uLightDir2;\n            uniform vec3 uLightDir3;\n            uniform mat4 uTextureMatrix1;\n            uniform mat4 uTextureMatrix2;\n            uniform mat4 uTextureMatrix3;\n            uniform mat4 uTextureMatrix4;\n            uniform sampler2D uTexture1;\n            uniform sampler2D uTexture2;\n            uniform sampler2D uTexture3;\n            uniform sampler2D uTexture4;\n            uniform sampler2D uAlpha;\n            uniform vec4 uTexSampleAlpha;\n            \n            vec2 sphereMap(vec3 vertex, vec3 normal)\n            {\n               vec3 normPos = (normalize(vertex.xyz));\n               vec3 reflection = reflect(normPos, normalize(normal));\n               reflection = vec3(reflection.x, reflection.y, reflection.z + 1.0);\n               vec2 texCoord = ((normalize(reflection).xy * 0.5) + vec2(0.5));\n               return texCoord;\n            }\n            void main(void) {\n            vec2 lTexCoord1 = vec2(0.0);            vec2 lTexCoord2 = vec2(0.0);            vec2 lTexCoord3 = vec2(0.0);            vec4 _output = vec4(1.0);\n            vec4 _input = uColor;\n            vec3 _specular = vec3(0.0);            vec2 texEnv = sphereMap(vPosition.xyz,normalize(vNormal.xyz));\n            " +
          this.f(t) +
          "\n            " +
          s +
          "\n            \n            if (uBlendMode == 13) {\n                _output.a = _output.a * _input.a;\n            } else if (uBlendMode == 1) {\n                if (_output.a < (128.0/255.0))\n                    discard;\n                _output.a = _input.a;\n            } else if (uBlendMode == 0) {\n                _output.a = _input.a;\n            } else {\n                _output.a = _output.a * _input.a;\n            }\n            // if (uBlendMode > 1) {\n            //     if (_output.a < (1.0/255.0)) {\n            //         discard;\n            //     }\n            // }\n            if (!uUnlit) {                vec4 litColor = uAmbientColor;                vec3 normal = normalize(vNormal);                                float dp = max(0.0, dot(normal, uLightDir1));                litColor += uPrimaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir2));                litColor += uSecondaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir3));                litColor += uSecondaryColor * dp;                                litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));                _output *= (litColor * uDiffuseColor);            }            _output += vec4(_specular, 0.0);\n            gl_FragColor = _output;\n            }"
        );
      }
    }
    const Io = [
        [
          "PS_Combiners_Opaque_Mod2xNA_Alpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_AddAlpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_AddAlpha_Alpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Mod2xNA_Alpha_Add",
          "VS_Diffuse_T1_Env_T1",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        [
          "PS_Combiners_Mod_AddAlpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_AddAlpha",
          "VS_Diffuse_T1_T1",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Mod_AddAlpha",
          "VS_Diffuse_T1_T1",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Mod_AddAlpha_Alpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Alpha_Alpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Mod2xNA_Alpha_3s",
          "VS_Diffuse_T1_Env_T1",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        [
          "PS_Combiners_Opaque_AddAlpha_Wgt",
          "VS_Diffuse_T1_T1",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Mod_Add_Alpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_ModNA_Alpha",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Mod_AddAlpha_Wgt",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Mod_AddAlpha_Wgt",
          "VS_Diffuse_T1_T1",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_AddAlpha_Wgt",
          "VS_Diffuse_T1_T2",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Mod_Add_Wgt",
          "VS_Diffuse_T1_Env",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha",
          "VS_Diffuse_T1_Env_T1",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        ["PS_Combiners_Mod_Dual_Crossfade", "VS_Diffuse_T1", "HS_T1", "DS_T1"],
        ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_T1", "HS_T1", "DS_T1"],
        [
          "PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha",
          "VS_Diffuse_T1_Env_T2",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        [
          "PS_Combiners_Mod_Mod",
          "VS_Diffuse_EdgeFade_T1_T2",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Mod_Masked_Dual_Crossfade",
          "VS_Diffuse_T1_T2",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Alpha",
          "VS_Diffuse_T1_T1",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        [
          "PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha",
          "VS_Diffuse_T1_Env_T2",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        ["PS_Combiners_Mod_Depth", "VS_Diffuse_EdgeFade_Env", "HS_T1", "DS_T1"],
        ["PS_Guild", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"],
        ["PS_Guild_NoBorder", "VS_Diffuse_T1_T2", "HS_T1_T2", "DS_T1_T2_T3"],
        ["PS_Guild_Opaque", "VS_Diffuse_T1_T2_T1", "HS_T1_T2_T3", "DS_T1_T2"],
        ["PS_Illum", "VS_Diffuse_T1_T1", "HS_T1_T2", "DS_T1_T2"],
        [
          "PS_Combiners_Mod_Mod_Mod_Const",
          "VS_Diffuse_T1_T2_T3",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        [
          "PS_Combiners_Mod_Mod_Mod_Const",
          "VS_Color_T1_T2_T3",
          "HS_T1_T2_T3",
          "DS_T1_T2_T3",
        ],
        ["PS_Combiners_Opaque", "VS_Diffuse_T1", "HS_T1", "DS_T1"],
        [
          "PS_Combiners_Mod_Mod2x",
          "VS_Diffuse_EdgeFade_T1_T2",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
        ["PS_Combiners_Mod", "VS_Diffuse_EdgeFade_T1", "HS_T1_T2", "DS_T1_T2"],
        [
          "PS_Combiners_Mod_Mod_Depth",
          "VS_Diffuse_EdgeFade_T1_T2",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
      ],
      Uo = {
        PS_Combiners_Add: [
          1,
          "_output.rgb = _input.rgb + tex0.rgb;",
          "_output.a = _input.a + tex0.a;",
        ],
        PS_Combiners_Decal: [
          1,
          "_output.rgb = mix(_input.rgb, tex0.rgb, _input.a);",
          "_output.a = _input.a;",
        ],
        PS_Combiners_Fade: [
          1,
          "_output.rgb = mix(tex0.rgb, _input.rgb, _input.a);",
          "_output.a = _input.a;",
        ],
        PS_Combiners_Mod: [
          1,
          "_output.rgb = _input.rgb * tex0.rgb;",
          "_output.a = tex0.a;",
        ],
        PS_Combiners_Mod2x: [
          1,
          "_output.rgb = _input.rgb * tex0.rgb * 2.0;",
          "_output.a = tex0.a * 2.0;",
        ],
        PS_Combiners_Opaque: [
          1,
          "_output.rgb = _input.rgb * tex0.rgb;",
          "_output.a = 1.0;",
        ],
        PS_Combiners_Add_Add: [
          2,
          "_output.rgb = (_input.rgb + tex0.rgb) + tex1.rgb;",
          "_output.a = (_input.a + tex0.a) + tex1.a;",
        ],
        PS_Combiners_Add_Mod: [
          2,
          "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;",
          "_output.a = (_input.a + tex0.a) * tex1.a;",
        ],
        PS_Combiners_Add_Mod2x: [
          2,
          "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb * 2.0;",
          "_output.a = (_input.a + tex0.a) * tex1.a * 2.0;",
        ],
        PS_Combiners_Add_Opaque: [
          2,
          "_output.rgb = (_input.rgb + tex0.rgb) * tex1.rgb;",
          "_output.a = _input.a + tex0.a;",
        ],
        PS_Combiners_Mod_AddNA: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_output.a = tex0.a;",
          "_specular = tex1.rgb;",
        ],
        PS_Combiners_Mod_Mod: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
          "_output.a = tex0.a * tex1.a;",
        ],
        PS_Combiners_Mod_Mod2x: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
          "_output.a = tex0.a * tex1.a * 2.0;",
        ],
        PS_Combiners_Mod_Add: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_output.a = tex0.a + tex1.a;",
          "_specular = tex1.rgb;",
        ],
        PS_Combiners_Mod_Mod2xNA: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
          "_output.a = tex0.a;",
        ],
        PS_Combiners_Mod_Opaque: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
          "_output.a = tex0.a;",
        ],
        PS_Combiners_Mod2x_Add: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * 2.0 + tex1.rgb;",
          "_output.a = (tex0.a) * 2.0 + tex1.a;",
        ],
        PS_Combiners_Mod2x_Mod2x: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 4.0;",
          "_output.a = (tex0.a) * tex1.a * 4.0;",
        ],
        PS_Combiners_Mod2x_Opaque: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
          "_output.a = tex0.a * 2.0;",
        ],
        PS_Combiners_Opaque_Add: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;",
          "_output.a = _input.a + tex1.a;",
        ],
        PS_Combiners_Opaque_AddAlpha: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_specular = (tex1.rgb * tex1.a);",
        ],
        PS_Combiners_Opaque_AddAlpha_Wgt: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_specular = (tex1.rgb * tex1.a) * uTexSampleAlpha.g;",
        ],
        PS_Combiners_Opaque_AddAlpha_Alpha: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_specular = (tex1.rgb * tex1.a * (1.0 - tex0.a));",
        ],
        PS_Combiners_Opaque_AddNA: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) + tex1.rgb;",
          "_output.a = _input.a;",
        ],
        PS_Combiners_Opaque_Mod: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
          "_output.a = tex1.a;",
        ],
        PS_Combiners_Opaque_Mod2x: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
          "_output.a = tex1.a * 2.0;",
        ],
        PS_Combiners_Opaque_Mod2xNA: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb * 2.0;",
          "",
        ],
        PS_Combiners_Opaque_Mod2xNA_Alpha: [
          2,
          "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));",
          "",
        ],
        PS_Combiners_Opaque_Opaque: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
          "",
        ],
        PS_Combiners_Opaque_Mod2xNA_Alpha_Add: [
          3,
          "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex0.rgb, vec3(tex0.a));",
          "_specular = tex2.rgb * tex2.a * uTexSampleAlpha.b;",
        ],
        PS_Combiners_Mod_Mod_Mod_Const: [
          3,
          "_output.rgb = _input.rgb * (tex0 * tex1 * tex2).rgb;",
          "_output.a = (tex0 * tex1 * tex2).a;",
        ],
        PS_Combiners_Mod_AddAlpha: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_output.a = tex0.a;",
          "_specular = tex1.rgb * tex1.a;",
        ],
        PS_Combiners_Mod_AddAlpha_Wgt: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb);",
          "_output.a = tex0.a;",
          "_specular = tex1.rgb * tex1.a * uTexSampleAlpha.g;",
        ],
        PS_Combiners_Mod_AddAlpha_Alpha: [
          2,
          "_output.rgb = _input.rgb * tex0.rgb;",
          "_output.a = (tex0.a + tex1.a * (0.3 * tex1.r + 0.59 * tex1.g + 0.11 * tex1.b));",
          "_specular = tex1.rgb * tex1.a * (1.0 - tex0.a);",
        ],
        PS_Combiners_Opaque_Mod_Add_Wgt: [
          2,
          "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));",
          "_specular = (tex0.rgb * tex0.a) * uTexSampleAlpha.r;",
        ],
        PS_Guild: [
          3,
          "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));",
          "_output.a = tex0.a;",
        ],
        PS_Guild_Opaque: [
          3,
          "_output.rgb = _input.rgb * mix(tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a)), tex2.rgb * vec3(1.0, 1.0, 1.0), vec3(tex2.a));",
          "",
        ],
        PS_Guild_NoBorder: [
          2,
          "_output.rgb = _input.rgb * tex0.rgb * mix(vec3(1.0, 1.0, 1.0), tex1.rgb * vec3(1.0, 1.0, 1.0), vec3(tex1.a));",
          "_output.a = tex0.a;",
        ],
        PS_Combiners_Opaque_Alpha_Alpha: [
          2,
          "_output.rgb = _input.rgb * mix(mix(tex0.rgb, tex1.rgb, vec3(tex1.a)), tex0.rgb, vec3(tex0.a));",
          "",
        ],
        PS_Combiners_Opaque_Mod2xNA_Alpha_3s: [
          3,
          "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.0, tex2.rgb, vec3(tex2.a));",
        ],
        PS_Combiners_Mod_Add_Alpha: [
          2,
          "_output.rgb = _input.rgb * tex0.rgb;",
          "_output.a = (tex0.a + tex1.a);",
          "_specular = tex1.rgb * (1.0 - tex0.a);",
        ],
        PS_Combiners_Opaque_ModNA_Alpha: [
          2,
          "_output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb, tex0.rgb, vec3(tex0.a));",
          "",
        ],
        PS_Combiners_Opaque_Mod2xNA_Alpha_UnshAlpha: [
          3,
          "float glowOpacity = clamp((tex2.a * vec4(1.0, 1.0, 1.0, 1.0).z), 0.0, 1.0); _output.rgb = _input.rgb * mix(tex0.rgb * tex1.rgb * 2.000000, tex0.rgb, vec3(tex0.a)) * (1.0 - glowOpacity);",
          "_specular = tex2.rgb * glowOpacity;",
        ],
        PS_Combiners_Opaque_Mod2xNA_Alpha_Alpha: [
          3,
          "_output.rgb = _input.rgb * mix(mix(tex0.rgb * tex1.rgb * 2.000000, tex2.rgb, vec3(tex2.a)), tex0.rgb, vec3(tex0.a));",
          "",
        ],
        PS_Combiners_Mod_Depth: [
          1,
          "_output.rgb = _input.rgb * tex0.rgb;",
          "_output.a = tex0.a;",
        ],
        PS_Combiners_Opaque_Alpha: [
          2,
          "_output.rgb = _input.rgb * mix(tex0.rgb, tex1.rgb, vec3(tex1.a));",
          "",
        ],
        Skin: [
          3,
          "//Fresnel Rim\r\nif (uHasSpecEmiss) {\r\n    vec3 emissiveColor = tex2.rgb;\r\n    vec3 emissiveTerm = tex2.rgb;\r\n    if (uHasEmissiveGlowing) {\r\n        vec3 eyeVec_120 = vPosition.xyz;\r\n        vec3 t121 = -(eyeVec_120);\r\n        vec2 term_126 = vec2(dot(t121, vNormal), dot(normalize(t121), (vNormal * vec3(0.0500000007, 0.0500000007, 1.0))));\r\n        vec2 invTerm_128 = (vec2(1.0) - clamp(term_126, 0.0, 1.0));\r\n        vec2 f_129 = (invTerm_128 * invTerm_128);\r\n        float fresnel_rim_133 = pow((f_129.x + f_129.y), 0.600000024);\r\n        vec3 t136 = (tex2.rgb /*+ ((vec3(0.0500000007, 0.0, 0.400000006) * 1.0) * fresnel_rim_133)*/);\r\n        emissiveColor = vec3(t136.r, tex2.g, t136.b);\r\n\r\n        float t267 = dot(normalize(vNormal),  normalize(-(vPosition.xyz)));\r\n        emissiveTerm = mix(vec3(0.0), 2.0*emissiveColor, vec3(pow(clamp(t267, 0.0, 1.0), (( 128.0 * (tex2.a)) + 9.99999975e-006))));\r\n    }\r\n\r\n    _output.rgb = _input.rgb * tex0.rgb + tex1.rgb + emissiveTerm.rgb;\r\n} else {\r\n    _output.rgb = _input.rgb * tex0.rgb;\r\n}\r\n_output.a = tex0.a; //",
        ],
        PS_Combiners_Mod_Dual_Crossfade: [
          3,
          "_output.rgb = _input.rgb * mix(mix(tex0, texture2D(uTexture2,vTexCoord1), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,vTexCoord1), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).rgb;",
          "_output.a = mix(mix(tex0, texture2D(uTexture2,vTexCoord1), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,vTexCoord1), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).a;",
        ],
        PS_Combiners_Mod_Masked_Dual_Crossfade: [
          4,
          "_output.rgb = _input.rgb * mix(mix(tex0, texture2D(uTexture2,texCoord), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,texCoord), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).rgb;",
          "_output.a = mix(mix(tex0, texture2D(uTexture2,texCoord), vec4(clamp(uTexSampleAlpha.g, 0.000000, 1.000000))), texture2D(uTexture3,texCoord), vec4(clamp(uTexSampleAlpha.b, 0.000000, 1.000000))).a * texture(uTexture4,texCoord2).a;",
        ],
        PS_Combiners_Mod_Mod_Depth: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
          "_output.a = tex0.a * tex1.a;",
        ],
      },
      Po = Ro;
    const Oo = class {
        constructor() {
          (this.h = !1), (this.i = !0);
        }
      },
      zo = [0, 1, 2, 10, 3, 4, 5, 13];
    const Bo = class {
      constructor(t) {
        (this.E = !1),
          (this.F = !1),
          (this.a = t.getUint8()),
          (this.b = t.getInt8()),
          (this.c = t.getUint16()),
          (this.d = t.getUint16()),
          (this.e = t.getUint16()),
          (this.f = t.getInt16()),
          (this.g = t.getUint16()),
          (this.h = t.getUint16()),
          (this.i = t.getUint16()),
          (this.j = t.getInt16()),
          (this.k = t.getUint16()),
          (this.l = t.getInt16()),
          (this.m = t.getInt16()),
          (this.n = !0),
          (this.o = null),
          (this.p = null),
          (this.q = 0),
          (this.r = null),
          (this.s = []),
          (this.t = []),
          (this.u = new Array()),
          (this.v = null),
          (this.w = []),
          (this.x = !1),
          (this.y = !1),
          (this.z = !1),
          (this.A = br()),
          (this.B = di()),
          (this.C = Pr());
      }
      K(t) {
        (this.o = t), (this.p = t.at[this.d]), (this.q = this.p.a), Fo.c(this);
        let e = this.o.ay[this.j];
        1 == this.i &&
          e > -1 &&
          1 == this.o.ax[e].type &&
          ((this.c = -1e3), (this.i = 3));
        const i = Po.d(this.c, this.i, this.r);
        this.H = i;
        for (let e = 0; e < this.i; e++) {
          if (this.j > -1 && this.j < t.ay.length) {
            let i = t.ay[this.j + e];
            i > -1 && i < t.ax.length && this.s.splice(e, 0, t.ax[i]);
          }
          if (this.m > -1 && this.m < t.aA.length) {
            let i = t.aA[this.m + e];
            i > -1 && t.az && i < t.az.length
              ? this.t.splice(e, 0, t.az[i])
              : this.t.splice(e, 0, null);
          }
          if (this.l > -1 && this.l < t.aG.length) {
            let i = t.aG[this.l + e];
            i > -1 && i < t.aF.length
              ? this.w.splice(e, 0, t.aF[i])
              : this.w.splice(e, 0, null);
          }
        }
        this.u = new Array(this.t.length);
        for (let t = 0; t < this.u.length; t++) this.u[t] = zi();
        this.E && ((this.s = this.s.reverse()), (this.t = this.t.reverse())),
          t.aE &&
            this.f > -1 &&
            this.f < t.aE.length &&
            (this.v = t.aE[this.f]),
          (this.D = this.r.b > 1);
      }
      L() {
        const t = this.o.aS.context,
          e = hi.GetProgram(t, this.H.name, this.H.config);
        (this.G = e), (this.H = e.program), (this.I = e.uniforms);
      }
      M() {
        let t = _r(this.p.i[0], this.p.i[1], this.p.i[2], 1),
          e = this.o.aq[this.p.g].m,
          i = zi();
        ji(i, i, this.o.aW.uViewMatrix),
          ji(i, i, this.o.V),
          ji(i, i, e),
          yr(t, t, i),
          (t[3] = 0);
        let r = Ar(t);
        if ((3 & this.a) > 0) {
          let e = br();
          r > 0 ? xr(e, t, 1 / r) : pr(e, t),
            xr(e, e, gi(_i(i[8], i[9], i[10])) * this.p.j),
            1 & this.a ? vr(e, t, e) : mr(e, t, e),
            (r = Tr(e));
        }
        return r;
      }
      N(t) {
        const e = this.o,
          i = this.o.aS.context,
          r = this.o.S;
        if ((this.G || this.L(), !this.G.program)) return;
        if (
          (this.J ||
            ((this.J = new Oo()),
            (this.J.a = this.G),
            (this.J.b = Object.assign({}, e.aW))),
          (this.J.c = e.aU),
          (this.J.d = e.aV),
          (this.J.b = Object.assign({}, e.aW)),
          (this.A[0] = this.A[1] = this.A[2] = this.A[3] = 1),
          this.v && this.v.g(r, this.o.aX, this.A),
          this.w[0] && (this.A[3] *= this.w[0].d(r, this.o.aX)),
          this.A[3] <= 0.001)
        )
          return;
        let s = this.r.b;
        const n = [1, 1, 1];
        for (let t = 0; t < this.w.length; t++) {
          const e = this.w[t];
          e && (n[t] = e.d(r, this.o.aX));
        }
        (this.J.b.uColor = this.A),
          (this.J.b.uTexSampleAlpha = _r(n[0], n[1], n[2], 1)),
          (this.J.b.uBlendMode = s),
          (this.J.b.uHasSpecEmiss = e.aK[1] && e.aK[1].i),
          (this.J.b.uHasEmissiveGlowing = 27 == e.o || 30 == e.o),
          (this.J.e = zo[s]),
          (this.J.i = !this.o.aY),
          (this.J.b.uUnlit = this.x ? 1 : 0),
          (this.J.n = this.M()),
          (this.J.m = this.b),
          (this.J.o = this.h);
        const a = this.P();
        let o = !0;
        for (const t in a) {
          const e = a[t],
            i = e.a && e.a.d;
          (o = o && (null == e.a || null != i)), i && (this.J.b[e.c] = i);
        }
        o && !this.F && (this.F = !0),
          this.t.forEach((t, e) => {
            if (!this.o.T && (Gi(this.u[e]), this.t[e])) {
              let t = !1,
                i = !1;
              this.t[e].a && this.t[e].a.c(r.a.a)
                ? ((this.B = this.t[e].a.d(r, this.o.aX)), (i = !0))
                : mi(this.B, 0, 0, 0),
                this.t[e].b && this.t[e].b.c(r.a.a)
                  ? ((this.C = this.t[e].b.d(r, this.o.aX)), (t = !0))
                  : qr(this.C, 0, 0, 0, 1);
              let s,
                n = !1;
              if (
                (this.t[e].c &&
                  this.t[e].c.c(r.a.a) &&
                  ((s = this.t[e].c.d(r, this.o.aX)), (n = !0)),
                Gi(this.u[e]),
                Vi(this.u[e], this.u[e], _i(0.5, 0.5, 0)),
                n && qi(this.u[e], this.u[e], s),
                t)
              ) {
                let t = zi();
                Yi(t, this.C, [0, 0, 0]), ji(this.u[e], this.u[e], t);
              }
              i && Vi(this.u[e], this.u[e], this.B),
                Vi(this.u[e], this.u[e], _i(-0.5, -0.5, 0));
            }
            this.J.b["uTextureMatrix" + (e + 1).toString()] = this.u[e];
          }),
          (this.J.h = this.y),
          (this.J.f = !this.z),
          (this.J.j = i.TRIANGLES),
          (this.J.l = 2 * this.p.e),
          (this.J.k = this.p.f),
          t.push(this.J);
      }
      O() {
        return this.s;
      }
      P() {
        let t = 0;
        const e = [];
        this.s.forEach((i, r) => {
          let s = null;
          if (this.s[r]) {
            if (-1e3 == this.c) {
              const t = this.o.aK[1];
              if (t) s = { d: t.m(r) };
              else if (this.o.w) {
                const t = this.o.w.aK[1];
                t && (s = { d: t.m(r) });
              }
            } else
              this.o.aL && 1 == this.s[r].type
                ? (s = this.o.aL.a)
                : this.o.aK[this.s[r].type] && this.o.aK[this.s[r].type].a
                ? (s = { d: this.o.aK[this.s[r].type].a })
                : this.o.w &&
                  this.o.w.aK[this.s[r].type] &&
                  this.o.w.aK[this.s[r].type].a
                ? (s = { d: this.o.w.aK[this.s[r].type].a })
                : this.s[r].f
                ? (s = this.s[r].f)
                : this.o.C[this.s[r].type]
                ? (s = this.o.C[this.s[r].type])
                : !this.s[r].e &&
                  this.j + t < this.o.ax.length &&
                  this.o.ax[this.j + t] &&
                  this.o.ax[this.j + t].f &&
                  (s = this.o.ax[this.j + t].f);
            s ||
              (this.s[r].g ||
                (WH.debug(
                  "can't find texture for material",
                  r,
                  "type",
                  this.s[r].type,
                  "index",
                  this.s[r].b
                ),
                (this.s[r].g = !0)),
              (s = { d: this.o.aS.greenPixelTexture }));
          }
          (e[r] = s), t++;
        });
        const i = {};
        for (let r = 0; r < t; r++)
          i["Texture" + (r + 1)] = {
            a: e[r],
            b: r,
            c: "uTexture" + (r + 1),
            d: "TEXTURE" + r,
          };
        return i;
      }
      get show() {
        return this.n;
      }
      set show(t) {
        this.n = t;
      }
      get meshId() {
        return this.q;
      }
      Q() {
        (this.o = null),
          (this.p = null),
          (this.r = null),
          (this.s = null),
          (this.t = null),
          (this.v = null),
          (this.w = null),
          (this.A = null),
          (this.u = null),
          (this.B = null),
          (this.C = null);
      }
    };
    const No = class {
      constructor(t, e) {
        if (((this.d = null), (this.e = !1), 0 == e))
          return void console.log("Texture file is 0");
        (this.b = t), (this.c = t.l.contentPath + "textures/" + e + ".png");
        !(function (t) {
          (t.a = new Image()),
            (t.a.crossOrigin = ""),
            (t.a.onload = function () {
              t.h();
            }),
            (t.a.onerror = function () {
              t.a = null;
            }),
            (t.a.src = t.c);
        })(this);
      }
      f() {
        return this.e;
      }
      g() {
        if (!this.b) return;
        const t = this.b.aS.context;
        this.d && t.deleteTexture(this.d), (this.d = null), (this.b = null);
      }
      h() {
        if (!this.b) return;
        const t = this.b.aS.context;
        function e(t) {
          return 0 == (t & (t - 1));
        }
        (this.d = t.createTexture()),
          t.bindTexture(t.TEXTURE_2D, this.d),
          t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            t.RGBA,
            t.RGBA,
            t.UNSIGNED_BYTE,
            this.a
          ),
          e(this.a.width) && e(this.a.height)
            ? t.generateMipmap(t.TEXTURE_2D)
            : (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR));
        const i = this.b.aS.aniFilterExt;
        i &&
          t.texParameteri(
            t.TEXTURE_2D,
            i.TEXTURE_MAX_ANISOTROPY_EXT,
            this.b.aS.aniFilterMax
          ),
          (this.e = !0);
      }
    };
    const Go = class {
      constructor(t, e, i) {
        (this.a = t),
          (this.b = e),
          (this.c = i.getInt32()),
          (this.d = i.getUint32()),
          (this.e = i.getUint32()),
          (this.f = null),
          (this.g = !1),
          this.i();
      }
      h() {
        (this.a = null), this.f && this.f.g(), (this.f = null);
      }
      i() {
        0 != this.e && (this.f = new No(this.a, this.e));
      }
      get type() {
        return this.c;
      }
    };
    const Lo = class {
      constructor(t) {
        (this.a = new ns(t, Yr)),
          (this.b = new ns(t, Jr)),
          (this.c = new ns(t, Yr));
      }
      d() {
        var t = this;
        t.a && (t.a.e(), (t.a = null)),
          t.b && (t.b.e(), (t.b = null)),
          t.c && (t.c.e(), (t.c = null));
      }
    };
    const Ho = class {
      constructor(t) {
        var e = this;
        (e.a = t.getInt32()),
          (e.b = t.getInt32()),
          (e.c = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.d = -1);
      }
      e() {
        this.c = null;
      }
    };
    const jo = class {
      constructor(t) {
        (this.a = new ns(t, Yr)), (this.b = new ns(t, $r));
      }
      c() {
        var t = this;
        t.a && t.a.e(), t.b && t.b.e();
      }
      d(t) {
        return !!this.a && this.a.c(t);
      }
      e(t) {
        return !!this.b && this.b.c(t);
      }
      f(t) {
        return this.d(t) || this.e(t);
      }
      g(t, e, i) {
        var r = this;
        i ? (i[0] = i[1] = i[2] = i[3] = 1) : (i = _r(1, 1, 1, 1));
        let s = _i(1, 1, 1);
        return (
          r.d(t.a.a) && r.a.d(t, e, s, s),
          r.e(t.a.a) && (i[3] = r.b.d(t, e, i[3]) / 32767),
          (i[0] = s[0]),
          (i[1] = s[1]),
          (i[2] = s[2]),
          i
        );
      }
    };
    const Vo = class {
      constructor(t) {
        this.a = new ns(t, $r);
      }
      b() {
        this.a.e(), (this.a = null);
      }
      c(t) {
        return this.a.c(t);
      }
      d(t, e) {
        var i = 1;
        this.c(t.a.a) && (i = this.a.d(t, e, i) / 32767);
        return i > 1 ? (i = 1) : i < 0 && (i = 0), i;
      }
    };
    const qo = class {
      constructor() {
        (this.a = 0),
          (this.b = 0),
          (this.c = -1),
          (this.d = null),
          (this.e = null),
          (this.f = null);
      }
    };
    class Wo extends qo {}
    const Xo = class {
      constructor(t, e) {
        (this.d = !1),
          (this.a = t),
          (this.b = e),
          (this.c = new Array(e.length));
      }
      e(t) {
        for (let e = 0; e < this.b.length; e++)
          this.c[e] && this.c[e].e && this.c[e].e.setAnimation(t);
      }
      f(t) {
        this.d = t;
      }
      g(t) {
        for (let e = 0; e < this.b.length; e++)
          switch (this.b[e].EffectType) {
            case 1:
              if (1 == this.b[e].ProcEffectType) {
                let t = this.b[e].Value[0];
                this.a.W = _r(
                  ((t >> 16) & 255) / 255,
                  ((t >> 8) & 255) / 255,
                  (255 & t) / 255,
                  this.a.W[3]
                );
              } else if (14 == this.b[e].ProcEffectType) {
                let t = Math.min(Math.max(this.b[e].Value[0], 0), 1);
                this.a.W[3] = t;
              } else if (22 == this.b[e].ProcEffectType) {
                let t = this.b[e].Value[3];
                this.a.W = _r(
                  ((t >> 16) & 255) / 255,
                  ((t >> 8) & 255) / 255,
                  (255 & t) / 255,
                  this.a.W[3]
                );
              }
              break;
            case 2:
              this.h(e, t);
          }
      }
      h(t, e) {
        if (!this.a) return;
        if (!this.a.d) return;
        if (!this.c[t]) {
          let e = this.b[t].AttachmentID;
          this.b[t].Positioner > -1 && (e = this.b[t].Positioner),
            e < 0 && (e = 19);
          let i = this.a.ca(e);
          if (
            ((this.c[t] = new Wo()),
            (this.c[t].d = i),
            (this.c[t].c = i ? i.b : -1),
            0 == this.b[t].ModelType)
          ) {
            let e = {
              type: sr.PATH,
              id: this.b[t].Model,
              parent: this.a,
              shoulder: -1,
            };
            const i = new kl(this.a.aS, this.a.l, e, 0, !1, !0, !1);
            0 != this.b[t].Texture && (i.C[2] = new No(i, this.b[t].Texture)),
              (this.c[t].e = i);
          } else if (1 == this.b[t].ModelType) {
            let e = this.a.o > 0 ? this.a.o : 1,
              i = -1 != this.a.p ? this.a.p : 0;
            (this.a.o = e),
              (this.a.p = i),
              (this.c[t].ba = new Yo(
                this.a,
                this.b[t].InvType,
                this.b[t].Model,
                e,
                i
              ));
          } else if (2 == this.b[t].ModelType) {
            let e = {
              type: sr.NPC,
              id: this.b[t].Model,
              parent: this.a,
              shoulder: -1,
            };
            this.c[t].e = new kl(this.a.aS, this.a.l, e, 0, !1, !0, !1);
          }
        }
        if (!(0 != this.b[t].ModelType || (this.c[t].e && this.c[t].e.d)))
          return;
        if (!(1 != this.b[t].ModelType || (this.c[t].ba && this.c[t].ba.n)))
          return;
        if (!(2 != this.b[t].ModelType || (this.c[t].e && this.c[t].e.d)))
          return;
        let i = zi();
        Zi(i, i, -this.b[t].Yaw),
          Xi(i, i, this.b[t].Pitch),
          Wi(i, i, this.b[t].Roll),
          qi(i, i, [this.b[t].Scale1, this.b[t].Scale1, this.b[t].Scale1]),
          qi(i, i, [this.b[t].Scale2, this.b[t].Scale2, this.b[t].Scale2]);
        let r = zi();
        if (this.c[t].d) {
          let e = this.c[t].d.c;
          ji(r, r, this.a.aq[this.c[t].c].m), Vi(r, r, _i(e[0], e[1], e[2]));
        }
        if (
          (Vi(
            r,
            r,
            _i(this.b[t].Offset[0], -this.b[t].Offset[1], this.b[t].Offset[2])
          ),
          ji(r, r, i),
          0 == this.b[t].ModelType)
        ) {
          let i = this.c[t].e;
          i.setAnimPaused(this.d), i.bt(this.a.V, r, null, null), i.cd(e);
        } else if (1 == this.b[t].ModelType)
          for (let i = 0; i < this.c[t].ba.i.length; i++) {
            let s = this.c[t].ba.i[i].e;
            s.d &&
              (s.setAnimPaused(this.d), s.bt(this.a.V, r, null, null), s.cd(e));
          }
        else if (2 == this.b[t].ModelType) {
          let i = this.c[t].e;
          i.setAnimPaused(this.d), i.bt(this.a.V, r, null, null), i.cd(e);
        }
      }
    };
    const Zo = class {
      constructor(t, e, i) {
        var r = this;
        (r.a = t), (r.d = e), (r.b = []), (r.c = !1), (r.f = []), i && r.h(i);
      }
      g() {
        var t = this;
        if (((t.a = null), t.b)) {
          for (var e = 0; e < t.b.length; ++e) {
            var i = t.b[e];
            i && (i.e && i.e.ba(), (i.e = null), (i.d = null), (t.b[e] = null));
          }
          t.b = null;
        }
      }
      h(t) {
        var e = this;
        e.e = t;
        var i = e.a.l.contentPath + "meta/itemvisual/" + e.e + ".json";
        $.getJSON(i, function (t) {
          e.i(t);
        });
      }
      i(t) {
        var e = this;
        if (((e.b = new Array(7)), t.ItemEffects))
          for (let r = 0; r < t.ItemEffects.length; ++r) {
            let s = t.ItemEffects[r];
            if (-1 == s.SubClass || this.d == s.SubClass) {
              if (s.Model) {
                let t = null;
                s.Scale &&
                  1 != s.Scale &&
                  ((t = zi()), qi(t, t, _i(s.Scale, s.Scale, s.Scale))),
                  (e.b[s.Slot - 1] = new qo());
                var i = {
                  type: sr.PATH,
                  id: s.Model,
                  parent: e.a,
                  shoulder: -1,
                };
                (e.b[s.Slot - 1].e = new kl(e.a.aS, e.a.l, i, 0, !1, !0, !1)),
                  (e.b[s.Slot - 1].f = t);
              }
              s.kit && (this.a.E, this.a.E.push(new Xo(this.a, s.kit.effects)));
            }
          }
        for (var r = 0; r < e.b.length; ++r)
          if (t.Equipment[r] && null == e.b[r]) {
            e.b[r] = new qo();
            i = {
              type: sr.PATH,
              id: t.Equipment[r],
              parent: e.a,
              shoulder: -1,
            };
            e.b[r].e = new kl(e.a.aS, e.a.l, i, r, !1, !0, !1);
          }
        (e.c = !0), e.a.bL();
      }
      j(t) {
        if (this.a.d) {
          for (var e = 0; e < this.f.length; e++) this.f[e].g(t);
          for (var i = 0; i < this.b.length; i++) {
            var r = this.b[i];
            if (r) {
              let e = _i(0, 0, 0);
              if ((i >= 5 || (r && r.d && (e = r.d.c)), -1 != r.c)) {
                let i = this.a.aq[r.c].m;
                r.e.bt(this.a.V, i, e, r.f), r.e.cd(t);
              }
            }
          }
        }
      }
    };
    class Ko {
      static a(t, e, i, r, s) {
        let n = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ];
        if (!e)
          return WH.debug("selectBestTexture:", "textures are null"), null;
        for (let t = 0; t < e.length; t++) {
          let a = e[t],
            o = a.Gender,
            l = a.Class,
            h = a.Race,
            u = a.ExtraData,
            c = 0;
          if (i > 1 || o != i) {
            if (o < 2) continue;
            c = 0;
          } else c = 2;
          let f = 1;
          if (r > 0 && l == r) f = 0;
          else if (l > 0) continue;
          let d = 1;
          if (s > 0 && h == s) d = 0;
          else if (h > 0) continue;
          n[u + 3 * (d + 2 * (c + f))] = a.FileDataId;
        }
        for (let t = 0; t < 2; t++)
          for (let e = 0; e < 2; e++)
            for (let i = 0; i < 2; i++) {
              let r = 3 * (t + 2 * (e + 2 * i));
              if (n[r] > 0) {
                let t;
                return (t = { a: n[r], b: n[r + 1], c: n[r + 2] }), t;
              }
            }
        if (t) {
          let n = t.bW(i, s, !0);
          if (n && 0 != n[0])
            return (s = n[0]), (i = n[1]), Ko.a(t, e, i, r, s);
        }
        return null;
      }
      static b(t, e, i, r, s, n) {
        let a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let t = 0; t < e.length; t++) {
          let o = e[t],
            l = o.Gender,
            h = o.Class,
            u = o.Race,
            c = o.ExtraData,
            f = 0;
          if (r > 1 || l != r) {
            if (l < 2) continue;
            f = 0;
          } else f = 2;
          let d = 1;
          if (s > 0 && h == s) d = 0;
          else if (h > 0) continue;
          let b = 1;
          if (n > 0 && u == n) b = 0;
          else if (u > 0) continue;
          let g = 1;
          if (-1 == i || c != i) {
            if (-1 != c && -1 != i) continue;
          } else g = 0;
          a[g + 2 * (b + 2 * (f + d))] = o.FileDataId;
        }
        for (let t = 0; t < 2; t++)
          for (let e = 0; e < 2; e++)
            for (let i = 0; i < 2; i++)
              for (let r = 0; r < 2; r++) {
                let s = r + 2 * (t + 2 * (e + 2 * i));
                if (a[s]) return a[s];
              }
        if (t) {
          var o = t.bW(r, n, !1);
          if (o && 0 != o[0])
            return (n = o[0]), (r = o[1]), Ko.b(t, e, i, r, s, n);
        }
        return 0;
      }
    }
    const Yo = class {
      constructor(t, e, i, r, s) {
        (this.r = null),
          (this.s = []),
          WH.debug("Creating item", i),
          (this.a = t),
          (this.b = e),
          (this.t = i),
          (this.u = r),
          (this.v = s),
          (this.e = nr[e]),
          (this.f = ar[e]),
          (this.i = null),
          (this.j = null),
          (this.k = null),
          (this.l = null),
          (this.g = 0),
          (this.h = 0),
          (this.n = !1),
          (this.o = !1),
          (this.p = 0),
          (this.q = 3),
          (this.m = 0),
          i && this.z();
      }
      y() {
        var t = this;
        if (t.i) {
          for (let e = 0; e < t.i.length; ++e)
            t.i[e].e && t.i[e].e.ba(),
              (t.i[e].e = null),
              (t.i[e].d = null),
              (t.i[e] = null);
          t.i = null;
        }
        if (t.j) {
          for (let e = 0; e < t.j.length; ++e)
            t.j[e].texture && t.j[e].texture.g(),
              (t.j[e].texture = null),
              (t.j[e] = null);
          t.j = null;
        }
        if (((t.k = null), (t.l = null), t.s)) {
          for (let e = 0; e < t.s.length; e++) t.s[e].g();
          t.s = null;
        }
        (t.n = !1),
          t.r && (t.r.ba(), (t.r = null)),
          t.a && (t.a.bC(), (t.a = null)),
          WH.debug("Destroyed item", this.t);
      }
      z() {
        let t = this;
        WH.debug("Loading item", this.t);
        let e = "meta/item/";
        const i = this.b;
        (1 != i &&
          3 != i &&
          4 != i &&
          5 != i &&
          6 != i &&
          7 != i &&
          8 != i &&
          9 != i &&
          10 != i &&
          16 != i &&
          19 != i &&
          20 != i) ||
          (e = "meta/armor/" + i + "/");
        let r = t.a.l.contentPath + e + t.t + ".json";
        $.getJSON(r)
          .done(function (e) {
            t.A(e);
          })
          .fail(function (e, i, r) {
            let s = i + ", " + r;
            WH.debug("Error loading item metadata", t.t, s), (t.o = !0);
          });
      }
      A(t) {
        if (!this.a)
          return void WH.debug(
            "Item was destroyed before it was loaded",
            this.t
          );
        if (
          ((this.h = t.Item.Flags),
          (this.g = t.Item.InventoryType),
          (this.c = t.Item.ItemClass),
          (this.d = t.Item.ItemSubClass),
          t.ComponentTextures)
        ) {
          this.j = [];
          for (let e in t.ComponentTextures) {
            const i = parseInt(e),
              r = Ko.a(
                this.a,
                t.TextureFiles[t.ComponentTextures[e]],
                this.a.p,
                this.a.q,
                this.a.o
              );
            if (r) {
              let t;
              (t = { region: i, gender: this.a.p, file: r.a, texture: null }),
                12 != i
                  ? (t.texture = new No(this.a, r.a))
                  : 16 == this.b && (this.a.C[2] = new No(this.a, r.a)),
                this.j.push(t);
            }
          }
        }
        if (
          ((this.k = t.Item.GeosetGroup),
          (this.l = t.Item.AttachGeosetGroup),
          (this.m = t.Item.GeosetGroupOverride),
          1 == this.b)
        ) {
          0 == this.a.p
            ? (this.w = t.Item.HideGeosetMale)
            : (this.x = t.Item.HideGeosetFemale);
        }
        if (
          (3 == this.b
            ? (this.i = new Array(2))
            : lr[this.b] != sr.ARMOR && (this.i = new Array(1)),
          this.i && t.ComponentModels)
        )
          for (let e = 0; e < this.i.length; ++e) {
            const i = {
                race: this.u,
                gender: this.v,
                bone: -1,
                attachment: null,
                model: null,
                scaleMat: null,
              },
              r = { type: lr[this.b], id: this.t, parent: this.a, shoulder: 0 };
            3 == this.b && (r.shoulder = e + 1),
              (i.e = new kl(this.a.aS, this.a.l, r, e, !1, !1, !0)),
              (i.e.o = this.u),
              (i.e.p = this.v),
              i.e.bX(t, r.type),
              (this.i[e] = i);
          }
        if ((6 == this.b || 16 == this.b) && t.ComponentModels) {
          let e = 0;
          if ((16 == this.b && (e = 1), t.ComponentModels[e])) {
            const i = {
                type: lr[this.b],
                id: this.t,
                parent: this.a,
                shoulder: 0,
              },
              r = new kl(this.a.aS, this.a.l, i, 0, !1, !1, !0);
            r.v = t;
            const s = {
              race: 0,
              gender: 0,
              bone: -1,
              attachment: null,
              model: null,
              scaleMat: null,
            };
            (s.e = r), (this.i = [s]);
            let n = 1,
              a = 0,
              o = 1;
            this.a && ((n = this.a.o), (a = this.a.p), (o = this.a.q));
            const l = t.ComponentModels[e],
              h = Ko.b(r, t.ModelFiles[l], -1, a, o, n);
            if (h) {
              r.bV(sr.PATH, h);
              const i = 0 == e ? t.Textures : t.Textures2;
              if (i) for (let t in i) 0 != i[t] && (r.C[+t] = new No(r, i[t]));
            }
          }
        }
        const e = this.b;
        if (
          (4 == e ||
            5 == e ||
            20 == e ||
            6 == e ||
            7 == e ||
            10 == e ||
            8 == e ||
            1 == e ||
            9 == e ||
            19 == e ||
            16 == e) &&
          t.ComponentModels
        ) {
          let i = 0;
          if (((1 != e && 6 != e) || (i = 1), t.ComponentModels[i])) {
            const r = t.ComponentModels[i];
            if (r && t.ModelFiles && t.ModelFiles[r]) {
              const s = {
                  type: lr[e],
                  id: this.t,
                  parent: this.a,
                  shoulder: 0,
                },
                n = new kl(this.a.aS, this.a.l, s, 0, !1, !1, !0);
              n.v = t;
              let a = 1,
                o = 0,
                l = 1;
              this.a && ((a = this.a.o), (o = this.a.p), (l = this.a.q));
              const h = Ko.b(n, t.ModelFiles[r], -1, o, l, a);
              if (h) {
                (this.r = n), n.bV(sr.PATH, h);
                const e = 0 == i ? t.Textures : t.Textures2;
                if (e)
                  for (let t in e) 0 != e[t] && (n.C[+t] = new No(n, e[t]));
              }
            }
          }
        }
        if ((7 == e && this.k[2] > 0 && (this.f += 2), 0 != this.p)) {
          const t = 2 == this.c ? this.d : -1;
          for (let e = 0; e < this.i.length; e++)
            this.s.push(new Zo(this.i[e].e, t, this.p));
        }
        (this.n = !0),
          WH.debug(
            "Loaded item:",
            "DisplayId",
            this.t,
            "InventoryType",
            this.g
          ),
          this.a.bL();
      }
      B(t) {
        for (let t = 0; t < this.s.length; t++) this.s[t].g();
        (this.s = []), (this.p = t);
      }
      C(t) {
        this.q = t;
      }
      D(t) {
        if (!this.i) return;
        if (this.a.d) {
          const t = this.a.bS(this.e, this);
          for (let e = 0; e < this.i.length; ++e)
            if (this.i[e] && t.length > e) {
              let i = this.a.aC[t[e]];
              if (
                ((this.i[e].c = i.b),
                (this.i[e].d = i),
                this.s[e] && this.s[e].b)
              ) {
                const t = this.i[e].e;
                for (let r = 0; r < this.s[e].b.length; r++)
                  if (t.aC && this.s[e].b[r]) {
                    if (r < 5) {
                      if (!t.aC[r]) continue;
                      i = t.aC[r];
                    } else i = t.ca(19);
                    (this.s[e].b[r].c = i.b), (this.s[e].b[r].d = i);
                  }
              }
            }
        }
        let e = zi(),
          i = di();
        for (let r = 0; r < this.i.length; ++r) {
          const s = this.i[r];
          if (s && s.e) {
            if (3 == this.b) {
              if (1 == s.e.a.shoulder && 0 == (1 & this.q)) continue;
              if (2 == s.e.a.shoulder && 0 == (2 & this.q)) continue;
            }
            if (s.c > -1 && s.c < this.a.aq.length) {
              this.s[r] && s.e.d && this.s[r].j(t);
              let n = !1,
                a = er[s.e.a.id];
              if (
                (Gi(e),
                a && (mi(i, 1, 1, -1), qi(e, e, i), (n = !0)),
                (22 != this.b && 23 != this.b && 22 != this.e) ||
                  0 == (256 & this.h) ||
                  (mi(i, 1, -1, 1), qi(e, e, i), (n = !0), (s.e.i = !0)),
                (s.e.aY = n),
                5 == this.a.H &&
                  26 == this.b &&
                  2 == this.c &&
                  18 == this.d &&
                  (Gi(e), Wi(e, e, -Math.PI / 2)),
                27 == this.b)
              ) {
                let t = s.e.v.Scale;
                mi(i, t, t, t), qi(e, e, i);
              }
              s.e.bt(this.a.V, this.a.aq[s.c].m, s.d.c, e), s.e.cb(), s.e.cd(t);
            } else -1 == s.c && this.a.bI(s.e, t);
          }
        }
      }
    };
    const Jo = class {
      constructor(t) {
        (this.c = t), (this.b = 267320826 ^ t);
        let e = new ArrayBuffer(4);
        this.a = new DataView(e);
      }
      d() {
        let t = this.b;
        return (t ^= t << 13), (t ^= t >> 17), (t ^= t << 5), (this.b = t), t;
      }
      e() {
        let t,
          e = this.d();
        return (
          this.a.setInt32(0, 1065353216 | (8388607 & e)),
          (t =
            2147483648 & e
              ? 2 - this.a.getFloat32(0)
              : this.a.getFloat32(0) - 2),
          t
        );
      }
      f() {
        let t = this.d();
        return (
          this.a.setInt32(0, 1065353216 | (8388607 & t)),
          this.a.getFloat32(0) - 1
        );
      }
    };
    const $o = class {
      constructor() {
        (this.a = 0),
          (this.b = 0),
          (this.c = 0),
          (this.d = 0),
          (this.e = di()),
          (this.f = 0),
          (this.g = 0),
          (this.h = 0),
          (this.i = 0),
          (this.j = 0);
      }
    };
    const Qo = class {
      constructor(t, e) {
        (this.b = t), (this.c = e), (this.a = new $o());
      }
      d() {
        return this.a.d + this.b.e() * this.c.u;
      }
      e() {
        return this.a.d + this.c.u;
      }
      f() {
        return this.a.c + this.c.s;
      }
      g(t) {
        return this.a.c + 30518509e-12 * t * this.c.s;
      }
      h() {
        let t = this.a.a;
        return (t *= 1 + this.a.b * this.b.e()), t;
      }
      i() {
        return this.a;
      }
      j(t) {
        pi(t, this.a.e);
      }
    };
    const tl = class extends Qo {
      k(t, e) {
        let i,
          r = e * this.b.f(),
          s = this.b.e();
        (i = s < 1 ? (s > -1 ? Math.trunc(32767 * s + 0.5) : -32767) : 32767),
          (t.d = i);
        let n = this.g(i);
        n < 0.001 && (n = 0.001),
          (t.b = (function (t, e) {
            let i = Math.abs(t),
              r = Math.abs(e);
            return (
              Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t)
            );
          })(r, n)),
          (t.e = 65535 & this.b.d()),
          mi(t.a, this.b.e() * this.a.g * 0.5, this.b.e() * this.a.h * 0.5, 0);
        let a = this.h(),
          o = this.a.f;
        if (o < 0.001) {
          let e = this.a.i * this.b.e(),
            i = this.a.j * this.b.e(),
            r = Math.sin(e),
            s = Math.sin(i),
            n = Math.cos(e),
            o = Math.cos(i);
          mi(t.c, o * r * a, s * r * a, n * a);
        } else {
          let e = di();
          pi(e, t.a),
            (e[2] = e[2] - o),
            gi(e) > 1e-4 && (Si(e, e), Ai(t.c, e, a));
        }
      }
    };
    const el = class extends Qo {
      constructor(t, e, i) {
        super(t, e), (this.ba = i);
      }
      k(t, e) {
        let i,
          r = e * this.b.f(),
          s = this.b.e();
        (i = s < 1 ? (s > -1 ? Math.trunc(32767 * s + 0.5) : -32767) : 32767),
          (t.d = i);
        let n = this.g(i);
        n < 0.001 && (n = 0.001),
          (t.b = (function (t, e) {
            let i = Math.abs(t),
              r = Math.abs(e);
            return (
              Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t)
            );
          })(r, n)),
          (t.e = 65535 & this.b.d());
        let a = this.a.h - this.a.g,
          o = this.a.g + a * this.b.f(),
          l = this.a.i * this.b.e(),
          h = this.a.j * this.b.e(),
          u = Math.cos(l),
          c = _i(u * Math.cos(h), u * Math.sin(h), Math.sin(l));
        Ai(t.a, c, o);
        let f = this.h(),
          d = this.a.f,
          b = _i(0.5, 0.5, 0.5);
        0 == d
          ? this.ba
            ? mi(b, 0, 0, 1)
            : mi(b, u * Math.cos(h), u * Math.sin(h), Math.sin(l))
          : (mi(b, 0, 0, d), xi(b, t.a, b), gi(b) > 1e-4 && Si(b, b)),
          Ai(t.c, b, f);
      }
    };
    const il = class {
      constructor(t) {
        (this.a = t.getInt32()),
          (this.b = t.getUint32()),
          (this.c = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.d = t.getInt16()),
          (this.e = t.getInt16()),
          0 != (268435456 & this.b) &&
            ((this.f = [0, 0, 0]),
            (this.f[0] = 31 & this.e),
            (this.f[1] = (this.e >> 5) & 31),
            (this.f[2] = (this.e >> 10) & 31)),
          (this.g = t.getUint8()),
          (this.h = t.getUint8()),
          (this.i = t.getUint16()),
          (this.j = t.getUint16()),
          (this.k = t.getUint16()),
          (this.l = t.getUint16()),
          (this.m = new ns(t, Qr)),
          (this.n = new ns(t, Qr)),
          (this.o = new ns(t, Qr)),
          (this.p = new ns(t, Qr)),
          (this.q = new ns(t, Yr)),
          (this.r = new ns(t, Qr)),
          (this.s = t.getFloat()),
          (this.t = new ns(t, Qr)),
          (this.u = t.getFloat()),
          (this.v = new ns(t, Qr)),
          (this.w = new ns(t, Qr)),
          (this.x = new ns(t, Qr)),
          (this.y = new rs(t)),
          (this.z = new ss(t)),
          (this.A = new is(t)),
          (this.B = [t.getFloat(), t.getFloat()]),
          (this.C = new ss(t)),
          (this.D = new ss(t)),
          (this.E = t.getFloat()),
          (this.F = t.getFloat()),
          (this.G = t.getFloat()),
          (this.H = [t.getFloat(), t.getFloat()]),
          (this.I = t.getFloat()),
          (this.J = t.getFloat()),
          (this.K = t.getFloat()),
          (this.L = t.getFloat()),
          (this.M = t.getFloat()),
          (this.N = t.getFloat()),
          (this.O = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.P = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.Q = _i(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.R = t.getFloat()),
          (this.S = t.getFloat()),
          (this.T = t.getFloat()),
          (this.U = t.getFloat()),
          (this.V = t.getFloat());
        var e = t.getInt32();
        this.W = new Array(e);
        for (var i = 0; i < e; i++)
          this.W[i] = _i(t.getFloat(), t.getFloat(), t.getFloat());
        (this.X = new ns(t, ts)),
          (this.Y = Sr(t.getFloat(), t.getFloat())),
          (this.Z = [
            Sr(t.getFloat(), t.getFloat()),
            Sr(t.getFloat(), t.getFloat()),
          ]),
          (this.aa = [
            Sr(t.getFloat(), t.getFloat()),
            Sr(t.getFloat(), t.getFloat()),
          ]);
      }
    };
    const rl = class {
      constructor() {
        (this.a = di()),
          (this.b = 0),
          (this.c = di()),
          (this.d = 0),
          (this.e = (2147483647 * Math.random()) >> 0),
          (this.f = [Mr(), Mr()]),
          (this.g = [Mr(), Mr()]);
      }
    };
    let sl = new Array(128);
    for (let t = 0; t < 128; t++) sl[t] = Math.random();
    const nl = Ni(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    class al {}
    class ol {
      constructor() {
        (this.a = di()),
          (this.b = 0),
          (this.c = { a: Mr(), b: di(), c: 0, d: 0, e: 1, f: 0 });
      }
    }
    function ll(t) {
      return _r(
        ((t >> 16) & 255) / 255,
        ((t >> 8) & 255) / 255,
        ((t >> 0) & 255) / 255,
        ((t >> 24) & 255) / 255
      );
    }
    const hl = class {
      constructor(t, e) {
        (this.d = null),
          (this.F = 0),
          (this.V = !1),
          (this.a = new Date().getTime()),
          (this.b = t);
        let i = new il(e);
        if (i.i >= 11 && i.i <= 13) {
          let e;
          t.v.Item && t.v.Item.ParticleColor
            ? (e = t.v.Item.ParticleColor)
            : t.v.Creature &&
              t.v.Creature.ParticleColor &&
              (e = t.v.Creature.ParticleColor),
            e &&
              ((this.I = [br(), br(), br()]),
              pr(this.I[0], ll(e.Start[i.i - 11])),
              pr(this.I[1], ll(e.Mid[i.i - 11])),
              pr(this.I[2], ll(e.End[i.i - 11])));
        }
        (this.c = i),
          (this.e = zi()),
          (this.f = zi()),
          (this.g = zi()),
          (this.h = zi()),
          (this.i = br()),
          (this.j = Rr()),
          (this.k = di()),
          (this.l = 1),
          (this.m = di()),
          (this.n = 0),
          (this.o = di()),
          (this.p = di()),
          (this.q = []),
          (this.r = di()),
          (this.s = 0),
          (this.t = 0),
          (this.u = 0),
          (this.v = 0),
          (this.w = di()),
          (this.x = di()),
          (this.y = 0),
          (this.z = 0),
          (this.A = 0),
          (this.B = 0),
          (this.C = 0),
          (this.D = 0),
          (this.E = 0),
          (this.G = []),
          (this.H = []);
        for (let t = 0; t < 1e3; t++)
          this.H.push(4 * t + 0),
            this.H.push(4 * t + 1),
            this.H.push(4 * t + 2),
            this.H.push(4 * t + 3),
            this.H.push(4 * t + 2),
            this.H.push(4 * t + 1);
        switch (
          ((this.K = new Jo((2147483647 * Math.random()) >> 0)), this.c.h)
        ) {
          case 1:
            this.J = new tl(this.K, i);
            break;
          case 2:
            this.J = new el(this.K, i, 0 != (256 & this.c.b));
            break;
          default:
            (this.J = null),
              WH.debug("Found unimplemented generator ", this.c.h);
        }
        const r = this.c.U - this.c.S;
        0 != r
          ? ((this.t = (this.c.V - this.c.T) / r),
            (this.u = this.c.T - this.c.S * this.t))
          : ((this.t = 0), (this.u = 0));
        let s = this.c.l;
        s <= 0 && (s = 1);
        let n = this.c.k;
        n <= 0 && (n = 1), (this.z = s * n - 1), (this.A = 0);
        let a = s,
          o = -1;
        do {
          ++o, (a >>= 1);
        } while (a);
        if (
          ((this.B = o), (this.C = s - 1), (this.A = 0), (32768 & this.c.b) > 0)
        ) {
          let t = (this.z + 1) * this.K.d();
          this.A = (t / 4294967296) | 0;
        }
        if (((this.D = 1 / s), (this.E = 1 / n), (269484032 & this.c.b) > 0)) {
          const t = 0 != (1 & (this.c.b >> 28));
          this.s = t ? 2 : 3;
        } else this.s = 0;
        this.L = i.g > 1;
      }
      X() {
        var t = this;
        (t.b = null),
          (t.c.c = null),
          (t.c.O = null),
          (t.c.P = null),
          (t.c.m = t.c.m.e()),
          (t.c.n = t.c.n.e()),
          (t.c.o = t.c.o.e()),
          (t.c.p = t.c.p.e()),
          (t.c.q = t.c.q.e()),
          (t.c.r = t.c.r.e()),
          (t.c.t = t.c.t.e()),
          (t.c.v = t.c.v.e()),
          (t.c.w = t.c.w.e()),
          (t.c.x = t.c.x.e()),
          (t.c.X = t.c.X.e()),
          (t.c.y = t.c.y.d()),
          (t.c.z = t.c.z.d()),
          (t.c.A = t.c.A.d()),
          (t.c.C = t.c.C.d()),
          (t.c.D = t.c.D.d()),
          (t.q = null);
      }
      Y(t) {
        this.d = t;
      }
      Z(t, e) {
        if (!this.J) return;
        let i = zi(),
          r = this.J.i(),
          s = !0;
        this.c.X.c(t.a.a) && (s = this.c.X.d(t, this.b.aX) > 0), (this.U = s);
        const n = _i(0, 0, 0);
        s &&
          ((r.a = this.c.m.d(t, this.b.aX, 0)),
          (r.b = this.c.n.d(t, this.b.aX, 0)),
          (r.i = this.c.o.d(t, this.b.aX, 0)),
          (r.j = this.c.p.d(t, this.b.aX, 0)),
          this.c.q.d(t, this.b.aX, n, r.e),
          (r.c = this.c.r.d(t, this.b.aX, 0)),
          (r.d = this.c.t.d(t, this.b.aX, 0)),
          (r.h = this.c.w.d(t, this.b.aX, 0)),
          (r.g = this.c.v.d(t, this.b.aX, 0)),
          this.d ? (r.f = this.d.a) : (r.f = this.c.x.d(t, this.b.aX, 0))),
          ji(i, i, this.b.V),
          ji(i, i, this.b.aq[this.c.d].m);
        let a = zi();
        Ki(a, _i(this.c.c[0], this.c.c[1], this.c.c[2])),
          ji(i, i, a),
          ji(i, i, nl);
        let o = zi(),
          l = di();
        Hi(o, this.b.aS.viewMatrix),
          Ji(l, o),
          this.ac(e, i, l, null, this.b.aS.viewMatrix),
          this.am(this.b.aS.viewMatrix);
        let h = this.b.aS.context;
        this.M
          ? (h.bindBuffer(h.ARRAY_BUFFER, this.M),
            h.bufferData(
              h.ARRAY_BUFFER,
              new Float32Array(this.G),
              h.DYNAMIC_DRAW
            ))
          : ((this.M = h.createBuffer()),
            h.bindBuffer(h.ARRAY_BUFFER, this.M),
            h.bufferData(
              h.ARRAY_BUFFER,
              new Float32Array(this.G),
              h.DYNAMIC_DRAW
            )),
          this.N ||
            ((this.N = h.createBuffer()),
            h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, this.N),
            h.bufferData(
              h.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(this.H),
              h.DYNAMIC_DRAW
            ));
      }
      aa(t) {
        if (this.q.length <= 0) return;
        const e = this.b.aS.context;
        if (
          (this.W ||
            ((this.W = new Oo()),
            (this.W.a = Je(
              e,
              [
                "attribute vec3 aPosition;\r\nattribute vec4 aColor;\r\nattribute vec2 aTexcoord0;\r\nattribute vec2 aTexcoord1;\r\nattribute vec2 aTexcoord2;\r\nattribute float aAlphaCutoff;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexcoord0;\r\nvarying vec2 vTexcoord1;\r\nvarying vec2 vTexcoord2;\r\nvarying float vAlphaCutoff;\r\n\r\nuniform mat4 uModelMatrix;\r\nuniform mat4 uViewMatrix;\r\nuniform mat4 uProjMatrix;\r\n\r\nvoid main(void) {\r\n    vec4 pos = vec4(aPosition, 1);\r\n\r\n    gl_Position = uProjMatrix * pos;\r\n\r\n    vColor = aColor;\r\n    vTexcoord0 = aTexcoord0;\r\n    vTexcoord1 = aTexcoord1;\r\n    vTexcoord2 = aTexcoord2;\r\n    vAlphaCutoff = aAlphaCutoff;\r\n}",
                "precision mediump float;\r\n\r\nvarying vec4 vColor;\r\nvarying vec2 vTexcoord0;\r\nvarying vec2 vTexcoord1;\r\nvarying vec2 vTexcoord2;\r\nvarying float vAlphaCutoff;\r\n\r\nuniform bool uHasTexture;\r\nuniform bool uHasTexture2;\r\nuniform bool uHasTexture3;\r\nuniform bool uHasAlpha;\r\nuniform int uBlendMode;\r\nuniform int uPixelShader;\r\nuniform sampler2D uTexture;\r\nuniform sampler2D uTexture2;\r\nuniform sampler2D uTexture3;\r\nuniform float uAlphaTreshold;\r\n\r\nuniform float alphaMult;\r\nuniform float colorMult;\r\n\r\nvoid main(void) {\r\n    float lo_thresh = 0.01;\r\n    vec4 color = vec4(1, 1, 1, 1);\r\n    vec4 tex = vec4(1, 1, 1, 1);\r\n    vec4 tex2 = vec4(1, 1, 1, 1);\r\n    vec4 tex3 = vec4(1, 1, 1, 1);\r\n    if (uHasTexture) {\r\n        tex = texture2D(uTexture, vTexcoord0).rgba;\r\n    }\r\n    if (uHasTexture2) {\r\n        tex2 = texture2D(uTexture2, vTexcoord1).rgba;\r\n    }\r\n    if (uHasTexture3) {\r\n        tex3 = texture2D(uTexture3, vTexcoord2).rgba;\r\n    }\r\n    vec4 finalColor = vec4((tex * vColor ).rgb, tex.a*vColor.a );\r\n    vec3 matDiffuse = vec3(1.0);\r\n    float opacity = 1.0;\r\n    if (uPixelShader == 0) {\r\n        matDiffuse = vColor.xyz * tex.rgb;\r\n        opacity = tex.a*vColor.a;\r\n    } else if (uPixelShader == 1) {\r\n        vec4 textureMod = tex*tex2;\r\n        float texAlpha = (textureMod.w * tex3.w);\r\n        opacity = texAlpha*vColor.a;\r\n        matDiffuse = vColor.xyz * 4.0 * textureMod.rgb;\r\n    } else if (uPixelShader == 2) {\r\n        vec4 textureMod = tex*tex2*tex3;\r\n        float texAlpha = (textureMod.w);\r\n        opacity = texAlpha*vColor.a;\r\n        vec3 matDiffuse = vColor.xyz * textureMod.rgb;\r\n    } else if (uPixelShader == 3) {\r\n        vec4 textureMod = tex*tex2*tex3;\r\n        float texAlpha = (textureMod.w);\r\n        opacity = texAlpha*vColor.a;\r\n\r\n        matDiffuse = vColor.xyz * textureMod.rgb;\r\n    };\r\n\r\n    finalColor = vec4(matDiffuse.rgb * colorMult, opacity * alphaMult);\r\n\r\n    if (finalColor.a < vAlphaCutoff ) discard;\r\n    if (finalColor.a < uAlphaTreshold ) discard;\r\n    gl_FragColor = finalColor;\r\n}\r\n",
              ],
              null,
              null
            )),
            (this.W.b = {}),
            (this.W.a.attributes = [
              {
                loc: e.getAttribLocation(this.W.a.program, "aPosition"),
                type: e.FLOAT,
                size: 3,
                offset: 0,
                stride: 56,
              },
              {
                loc: e.getAttribLocation(this.W.a.program, "aColor"),
                type: e.FLOAT,
                size: 4,
                offset: 12,
                stride: 56,
              },
              {
                loc: e.getAttribLocation(this.W.a.program, "aTexcoord0"),
                type: e.FLOAT,
                size: 2,
                offset: 28,
                stride: 56,
              },
              {
                loc: e.getAttribLocation(this.W.a.program, "aTexcoord1"),
                type: e.FLOAT,
                size: 2,
                offset: 36,
                stride: 56,
              },
              {
                loc: e.getAttribLocation(this.W.a.program, "aTexcoord2"),
                type: e.FLOAT,
                size: 2,
                offset: 44,
                stride: 56,
              },
              {
                loc: e.getAttribLocation(this.W.a.program, "aAlphaCutoff"),
                type: e.FLOAT,
                size: 1,
                offset: 52,
                stride: 56,
              },
            ]),
            (this.W.c = this.M),
            (this.W.d = this.N),
            (this.W.m = this.c.j)),
          !this.T)
        )
          if (((this.T = [null, null, null]), 0 != (268435456 & this.c.b))) {
            WH.debug(
              "multitexture particle",
              this.c.f[0],
              this.c.f[1],
              this.c.f[2],
              this
            );
            for (let t = 0; t < this.c.f.length; t++) {
              const e = this.c.f[t];
              e > -1 && e < this.b.ax.length && (this.T[t] = this.b.ax[e]);
            }
          } else
            this.c.e > -1 &&
              this.c.e < this.b.ax.length &&
              (this.T[0] = this.b.ax[this.c.e]);
        if (!this.T[0].f || !this.T[0].f.e) return;
        (this.W.b.uViewMatrix = this.b.aS.viewMatrix),
          (this.W.b.uProjMatrix = this.b.aS.projMatrix),
          (this.W.b.uBlendMode = this.c.g),
          (this.W.b.uPixelShader = this.s > 1 ? this.s - 1 : 0),
          (this.W.b.colorMult = this.d ? this.d.b : 1),
          (this.W.b.alphaMult = this.d ? this.d.c : 1);
        let i = [
          this.T[0] && this.T[0].f && this.T[0].f.e,
          this.T[1] && this.T[1].f && this.T[1].f.e,
          this.T[2] && this.T[2].f && this.T[2].f.e,
        ];
        (this.W.b.uTexture = this.T[0].f.d),
          (this.W.b.uTexture2 = i[1] ? this.T[1].f.d : null),
          (this.W.b.uTexture3 = i[2] ? this.T[2].f.d : null),
          (this.W.b.uHasTexture = i[0] ? 1 : 0),
          (this.W.b.uHasTexture2 = i[1] ? 1 : 0),
          (this.W.b.uHasTexture3 = i[2] ? 1 : 0);
        let r = this.c.g;
        4 == r && (r = 3), (this.W.e = r), (this.W.i = !this.b.aY);
        let s = -1;
        1 == r ? (s = 0.501960814) : r > 1 && (s = 1 / 255),
          (this.W.b.uAlphaTreshold = s),
          (this.W.h = !1),
          (this.W.f = !1),
          (this.W.j = e.TRIANGLES),
          (this.W.k = (6 * this.F) >> 0),
          (this.W.l = 0),
          t.push(this.W);
      }
      ab(t, e) {
        if (0 == (16 & this.c.b))
          for (let i = 0; i < this.q.length; i++) {
            const r = this.q[i];
            Ri(r.a, r.a, t), Ii(r.c, r.c, e);
          }
      }
      ac(t, e, i, r, s) {
        if (null == this.J) return;
        if (this.b.T) return;
        Ji(this.m, this.e);
        let n = br();
        Ji(n, e), (n[3] = 1), yr(n, n, s), (this.n = n[2]);
        let a = di();
        if ((Ji(a, s), this.ad(e, a, r), t > 0)) {
          let e = di();
          if ((Ji(e, this.e), 16384 & this.c.b)) {
            xi(this.p, e, this.m);
            let i = this.t * (gi(this.p) / t) + this.u;
            i >= 0 && (i = Math.min(i, 1)), Ai(this.o, this.p, i);
          }
          if (64 & this.c.b) {
            this.v += t;
            let i = 0.03;
            if (this.v > i)
              if (((this.v = 0), 0 == this.q.length)) {
                let t = i / this.v,
                  r = di();
                xi(r, e, this.m);
                let s = t * this.c.I;
                Ti(this.w, r, _i(s, s, s));
              } else mi(this.w, 0, 0, 0);
          }
          this.ae(t);
        }
      }
      ad(t, e, i) {
        if ((pi(this.x, e), null == i || 16 & this.c.b)) Bi(this.e, t);
        else {
          let e = zi();
          Hi(e, i), ji(this.e, e, t);
        }
        let r = di();
        $i(r, t), (this.l = r[0]);
      }
      ae(t) {
        if ((t = Math.max(t, 0)) < 0.1) pi(this.o, this.p);
        else {
          let e = Math.floor(t / 0.1);
          t = -0.1 * e + t;
          let i = Math.min(Math.floor(this.J.i().lifespan / 0.1), e),
            r = i + 1,
            s = 1;
          (s = r < 0 ? ((1 & r) | (r >> 1)) + ((1 & r) | (r >> 1)) : r),
            Ai(this.o, this.p, 1 / s);
          for (let t = 0; t < i; t++) this.af(0.1);
        }
        this.af(t);
      }
      af(t) {
        let e = new al();
        if (t < 0) return;
        this.c.b, this.ag(e, t), this.ah(t);
        let i = 0;
        for (; i < this.q.length; ) {
          let r = this.q[i];
          (r.b = r.b + t),
            r.b > Math.max(this.J.g(r.e), 0.001)
              ? (this.ak(i), i--)
              : this.al(r, t, e) || (this.ak(i), i--),
            i++;
        }
      }
      ag(t, e) {
        (t.a = di()), (t.b = di()), (t.c = di()), (t.d = 0);
        let i = _i(e, e, e),
          r = e * e * 0.5,
          s = _i(r, r, r);
        Ti(t.a, this.c.Q, i);
        let n = di();
        this.J.j(n), Ti(t.b, n, i), Ti(t.c, n, s), (t.d = this.c.J * e);
      }
      ah(t) {
        if (!this.U) return;
        let e = this.J.d();
        for (this.y = this.y + t * e; this.y > 1; ) this.ai(t), (this.y -= 1);
      }
      ai(t) {
        let e = this.aj();
        if ((this.J.k(e, t), !(16 & this.c.b))) {
          let t = _r(e.a[0], e.a[1], e.a[2], 1),
            i = _r(e.c[0], e.c[1], e.c[2], 0);
          yr(t, t, this.e),
            yr(i, i, this.e),
            pi(e.a, t),
            pi(e.c, i),
            8192 & this.c.b && (e.a[2] = 0);
        }
        if (64 & this.c.b) {
          let t = 1 + this.J.i().speedVariation * this.K.e(),
            i = di();
          Ai(i, this.w, t), vi(e.c, e.c, i);
        }
        if (this.s >= 2)
          for (let t = 0; t < 2; t++) {
            (e.f[t][0] = this.K.f()), (e.f[t][1] = this.K.f());
            let n = Mr();
            Fr(n, this.c.aa[t], this.K.e()),
              (i = e.g[t]),
              (r = n),
              (s = this.c.Z[t]),
              (i[0] = r[0] + s[0]),
              (i[1] = r[1] + s[1]);
          }
        var i, r, s;
      }
      aj() {
        let t = new rl();
        return this.q.push(t), t;
      }
      ak(t) {
        this.q.splice(t, 1);
      }
      al(t, e, i) {
        if (this.s >= 2)
          for (let i = 0; i < 2; i++) {
            let r = t.f[i][0] + e * t.g[i][0];
            (t.f[i][0] = r - Math.floor(r)),
              (r = t.f[i][1] + e * t.g[i][1]),
              (t.f[i][1] = r - Math.floor(r));
          }
        vi(t.c, t.c, i.a),
          16384 & this.c.b && 2 * e < t.b && vi(t.a, t.a, this.o);
        let r = _i(e, e, e),
          s = di();
        if (
          (Ti(s, t.c, r),
          vi(t.c, t.c, i.b),
          Ai(t.c, t.c, 1 - i.d),
          vi(t.a, t.a, s),
          vi(t.a, t.a, i.c),
          2 == this.c.h && 128 & this.c.b)
        ) {
          let e = di();
          if ((pi(e, t.a), 16 & this.c.b)) {
            if (ki(e, s) > 0) return !1;
          } else {
            let i = di();
            if ((Ji(i, this.e), xi(e, t.a, i), ki(e, s) > 0)) return !1;
          }
        }
        return !0;
      }
      am(t) {
        if (((this.G.length = 0), 0 == this.q.length && null != this.J)) return;
        Hi(this.g, t), Ir(Rr(), t), this.an(null, t);
        let e = 0;
        for (let t = 0; t < this.q.length; t++) {
          let i = this.q[t],
            r = new ol();
          if (
            (this.ap(i, r) &&
              (131072 & this.c.b && (this.ar(i, r), e++),
              262144 & this.c.b && (this.as(i, r), e++)),
            e >= 1e3)
          )
            break;
        }
        this.F = e;
      }
      an(t, e) {
        var i, r, s;
        16 & this.c.b
          ? ji(this.h, e, this.e)
          : null != t
          ? ji(this.h, e, t)
          : Bi(this.h, e),
          Ji(this.i, e),
          4096 & this.c.b &&
            (Ir(this.j, this.h),
            16 & this.c.b &&
              Math.abs(this.l) > 0 &&
              ((i = this.j),
              (r = this.j),
              (s = 1 / this.l),
              (i[0] = r[0] * s),
              (i[1] = r[1] * s),
              (i[2] = r[2] * s),
              (i[3] = r[3] * s),
              (i[4] = r[4] * s),
              (i[5] = r[5] * s),
              (i[6] = r[6] * s),
              (i[7] = r[7] * s),
              (i[8] = r[8] * s)),
            mi(this.k, this.j[6], this.j[7], this.j[8]),
            Ci(this.k) <= 2.3841858e-7
              ? mi(this.k, 0, 0, 1)
              : Si(this.k, this.k));
      }
      ao(t) {
        let e = 0,
          i = 0;
        if (0 != this.c.K || 0 != this.c.N) {
          let r = new Jo(t.e);
          (e = 0 == this.c.L ? this.c.K : this.c.K + r.e() * this.c.L),
            (i = 0 == this.c.N ? this.c.M : this.c.M + r.e() * this.c.N);
        } else (e = this.c.K), (i = this.c.M);
        return { deltaSpin: i, baseSpin: e };
      }
      ap(t, e) {
        let i = this.c.G,
          r = this.c.H,
          s = r[0],
          n = r[1] - s,
          a = 0,
          o = t.e,
          l = t.b;
        if (((i < 1 || 0 != n) && (a = 127 & (l * this.c.F + o)), i < sl[a]))
          return 0;
        this.aq(t, e, o);
        let h = n * sl[a] + s;
        Fr(e.c.a, e.c.a, h), 32 & this.c.b && Fr(e.c.a, e.c.a, this.l);
        let u = _r(t.a[0], t.a[1], t.a[2], 1);
        return yr(u, u, this.h), pi(e.a, u), (e.b = 1), 1;
      }
      aq(t, e, i) {
        let r = t.b / this.J.f(),
          s = new Jo(i);
        Math.min(r, 1) <= 0 ? (r = 0) : r >= 1 && (r = 1);
        let n = _i(255, 255, 255),
          a = Sr(1, 1),
          o = 1,
          l = e.c;
        this.c.y.i(r, n, l.b, this.I),
          this.I || Ai(l.b, l.b, 1 / 255),
          this.c.A.i(r, a, l.a),
          (l.e = this.c.z.i(r, 32767) / 32767),
          this.d ? (l.f = this.d.d.i(r, 0) / 32767) : (l.f = 0);
        let h = 0;
        this.c.C.a.length > 0
          ? ((o = 0), (l.c = this.c.C.i(r, o)), (l.c = this.z & (l.c + this.A)))
          : 65536 & this.c.b
          ? ((h = (this.z + 1) * s.d()), (l.c = (h / 4294967296) | 0))
          : (l.c = 0),
          (o = 0),
          (l.d = this.c.D.i(r, o)),
          (l.d = (l.d + this.A) & this.z);
        let u = 1;
        524288 & this.c.b
          ? ((u = Math.max(1 + s.e() * this.c.B[1], 99999997e-12)),
            (l.a[0] = Math.max(1 + s.e() * this.c.B[0], 99999997e-12) * l.a[0]))
          : ((u = Math.max(1 + s.e() * this.c.B[0], 99999997e-12)),
            (l.a[0] = u * l.a[0])),
          (l.a[1] = u * l.a[1]);
      }
      ar(t, e) {
        let i = Sr((e.c.c & this.C) * this.D, (e.c.c >> this.B) * this.E),
          r = 0,
          s = 0,
          n = this.ao(t);
        (r = n.baseSpin), (s = n.deltaSpin);
        let a = 0,
          o = _i(0, 0, 0),
          l = _i(0, 0, 0),
          h = !1,
          u = !1;
        if (4 & this.c.b && Ci(t.c) > 2.3841858e-7)
          if (((a = 1), 4096 & this.c.b)) h = !0;
          else {
            let i = _r(-t.c[0], -t.c[1], -t.c[2], 0);
            yr(i, i, this.h);
            let r = di();
            pi(r, i);
            let s = 0,
              n = Ci(r);
            s = n <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(n);
            let a = di();
            pi(a, r),
              Ai(a, a, s),
              pi(o, a),
              Ai(o, o, e.c.a[0]),
              (l = _i(a[1], -a[0], 0)),
              Ai(l, l, e.c.a[1]),
              (u = !0),
              (h = !1);
          }
        if ((4096 & this.c.b || h) && !u) {
          let i = Rr();
          (c = i),
            (f = this.j),
            (c[0] = f[0]),
            (c[1] = f[1]),
            (c[2] = f[2]),
            (c[3] = f[3]),
            (c[4] = f[4]),
            (c[5] = f[5]),
            (c[6] = f[6]),
            (c[7] = f[7]),
            (c[8] = f[8]);
          let n = e.c.a[0];
          if (a) {
            let r = 0,
              s = _i(-t.c[0], -t.c[1], -t.c[2]),
              a = Ci(s);
            (r = a <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(a)),
              Ur(
                i,
                this.j,
                (function (t, e, i, r, s, n, a, o, l) {
                  var h = new fi(9);
                  return (
                    (h[0] = t),
                    (h[1] = e),
                    (h[2] = i),
                    (h[3] = r),
                    (h[4] = s),
                    (h[5] = n),
                    (h[6] = a),
                    (h[7] = o),
                    (h[8] = l),
                    h
                  );
                })(s[0] * r, s[1] * r, 0, -s[1] * r, s[0] * r, 0, 0, 0, 1)
              ),
              r > 2.3841858e-7 && (n = e.c.a[0] * (1 / Math.sqrt(Ci(t.c)) / r));
          }
          if (
            (this.s,
            mi(o, i[0], i[1], i[2]),
            Ai(o, o, n),
            mi(l, i[3], i[4], i[5]),
            Ai(l, l, e.c.a[1]),
            (s = l[0]),
            (u = !0),
            0 != this.c.M || 0 != this.c.N)
          ) {
            let e = r + s * t.b;
            512 & this.c.b && 1 & t.e && (e = -e);
            let i = di();
            pi(i, this.k), this.s;
            let n = Rr(),
              a = Pr();
            Or(a, i, e),
              (function (t, e) {
                var i = e[0],
                  r = e[1],
                  s = e[2],
                  n = e[3],
                  a = i + i,
                  o = r + r,
                  l = s + s,
                  h = i * a,
                  u = r * a,
                  c = r * o,
                  f = s * a,
                  d = s * o,
                  b = s * l,
                  g = n * a,
                  _ = n * o,
                  p = n * l;
                (t[0] = 1 - c - b),
                  (t[3] = u - p),
                  (t[6] = f + _),
                  (t[1] = u + p),
                  (t[4] = 1 - h - b),
                  (t[7] = d - g),
                  (t[2] = f - _),
                  (t[5] = d + g),
                  (t[8] = 1 - h - c);
              })(n, a),
              Ii(o, o, n),
              mi(l, s, l[1], l[2]),
              Ii(l, l, n);
          }
        }
        var c, f;
        if (!u)
          if (0 != this.c.M || 0 != this.c.N) {
            let i = r + s * t.b;
            512 & this.c.b && 1 & t.e && (i = -i);
            let n = Math.cos(i),
              a = Math.sin(i);
            mi(o, n, a, 0),
              Ai(o, o, e.c.a[0]),
              mi(l, -a, n, 0),
              Ai(l, l, e.c.a[1]),
              134217728 & this.c.b && vi(e.a, e.a, _i(l[0], l[1], 0));
          } else mi(o, e.c.a[0], 0, 0), mi(l, 0, e.c.a[1], 0);
        return this.at(o, l, e.a, e.c.b, e.c.e, e.c.f, i[0], i[1], t.f), 0;
      }
      as(t, e) {
        let i = Sr((e.c.d & this.C) * this.D, (e.c.d >> this.B) * this.E),
          r = _i(0, 0, 0),
          s = _i(0, 0, 0),
          n = this.c.E;
        1024 & this.c.b && (n = Math.min(t.b, n));
        let a = br();
        Ai(a, t.c, -1), (a[3] = 0), yr(a, a, this.h), Ai(a, a, n);
        let o = _i(a[0], a[1], 0);
        if (ki(o, o) > 1e-4) {
          let t = 1 / gi(o);
          Fr(e.c.a, e.c.a, t),
            Dr(o, o, e.c.a),
            (s = _i(-o[1], o[0], 0)),
            Ai(r, a, 0.5),
            vi(e.a, e.a, r);
        } else (r = _i(0.05 * e.c.a[0], 0, 0)), (s = _i(0, 0.05 * e.c.a[1], 0));
        return this.at(r, s, e.a, e.c.b, e.c.e, e.c.f, i[0], i[1], t.f), 1;
      }
      at(t, e, i, r, s, n, a, o, l) {
        const h = [-1, -1, 1, 1],
          u = [1, -1, 1, -1],
          c = [0, 0, 1, 1],
          f = [0, 1, 0, 1];
        let d = di(),
          b = Mr(),
          g = Mr(),
          _ = Mr();
        for (let p = 0; p < 4; p++)
          mi(d, 0, 0, 0),
            Ei(d, d, t, h[p]),
            Ei(d, d, e, u[p]),
            vi(d, d, i),
            kr(b, c[p] * this.D + a, f[p] * this.E + o),
            kr(g, c[p] * this.c.Y[0] + l[0][0], f[p] * this.c.Y[0] + l[0][1]),
            kr(_, c[p] * this.c.Y[1] + l[1][0], f[p] * this.c.Y[1] + l[1][1]),
            this.G.push(d[0]),
            this.G.push(d[1]),
            this.G.push(d[2]),
            this.G.push(r[0]),
            this.G.push(r[1]),
            this.G.push(r[2]),
            this.G.push(s),
            this.G.push(b[0]),
            this.G.push(b[1]),
            this.G.push(g[0]),
            this.G.push(g[1]),
            this.G.push(_[0]),
            this.G.push(_[1]),
            this.G.push(n);
      }
    };
    const ul = class {
      constructor(t) {
        var e = this;
        (e.a = t.getFloat()),
          (e.b = t.getFloat()),
          (e.c = t.getFloat()),
          (e.d = new ss(t));
      }
    };
    const cl = class {
      constructor(t) {
        (this.buffer = new DataView(t)), (this.position = 0);
      }
      getBool() {
        var t = 0 != this.buffer.getUint8(this.position);
        return (this.position += 1), t;
      }
      getUint8() {
        var t = this.buffer.getUint8(this.position);
        return (this.position += 1), t;
      }
      getInt8() {
        var t = this.buffer.getInt8(this.position);
        return (this.position += 1), t;
      }
      getUint16() {
        var t = this.buffer.getUint16(this.position, !0);
        return (this.position += 2), t;
      }
      getInt16() {
        var t = this.buffer.getInt16(this.position, !0);
        return (this.position += 2), t;
      }
      getUint32() {
        var t = this.buffer.getUint32(this.position, !0);
        return (this.position += 4), t;
      }
      getInt32() {
        var t = this.buffer.getInt32(this.position, !0);
        return (this.position += 4), t;
      }
      getFloat() {
        var t = this.buffer.getFloat32(this.position, !0);
        return (this.position += 4), t;
      }
      getString(t) {
        void 0 === t && (t = this.getUint16());
        for (var e = "", i = 0; i < t; ++i)
          e += String.fromCharCode(this.getUint8());
        return e;
      }
      setBool(t) {
        this.buffer.setUint8(this.position, t ? 1 : 0), (this.position += 1);
      }
      setUint8(t) {
        this.buffer.setUint8(this.position, t), (this.position += 1);
      }
      setInt8(t) {
        this.buffer.setInt8(this.position, t), (this.position += 1);
      }
      setUint16(t) {
        this.buffer.setUint16(this.position, t, !0), (this.position += 2);
      }
      setInt16(t) {
        this.buffer.setInt16(this.position, t, !0), (this.position += 2);
      }
      setUint32(t) {
        this.buffer.setUint32(this.position, t, !0), (this.position += 4);
      }
      setInt32(t) {
        this.buffer.setInt32(this.position, t, !0), (this.position += 4);
      }
      setFloat(t) {
        this.buffer.setFloat32(this.position, t, !0), (this.position += 4);
      }
    };
    class fl {
      constructor() {
        (this.a = di()), (this.b = br()), (this.c = Mr());
      }
    }
    class dl {}
    const bl = [0, 1, 2, 10, 3, 4, 5, 13];
    function gl(t, e) {
      return _i(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2]);
    }
    class _l {}
    const pl = class {
        constructor(t, e) {
          (this.g = di()),
            (this.h = di()),
            (this.p = new dl()),
            (this.q = di()),
            (this.r = di()),
            (this.s = di()),
            (this.t = di()),
            (this.u = di()),
            (this.v = di()),
            (this.w = di()),
            (this.x = di()),
            (this.y = di()),
            (this.z = di()),
            (this.A = di()),
            (this.B = di()),
            (this.O = di()),
            (this.V = t.aS.context),
            (this.a = t);
          let i = new _l();
          var r;
          if (
            ((i.a = e.getInt32()),
            (i.b = e.getInt32()),
            (i.c = _i(e.getFloat(), e.getFloat(), e.getFloat())),
            (r = e.getInt32()) > 0)
          ) {
            i.j = new Array(r);
            for (let t = 0; t < r; ++t) i.j[t] = e.getInt16();
          }
          if ((r = e.getInt32()) > 0) {
            i.k = new Array(r);
            for (let t = 0; t < r; ++t) i.k[t] = e.getInt16();
          }
          (i.l = new ns(e, Yr)),
            (i.m = new ns(e, $r)),
            (i.n = new ns(e, Qr)),
            (i.o = new ns(e, Qr)),
            (i.d = e.getFloat()),
            (i.e = e.getFloat()),
            (i.f = e.getFloat()),
            (i.g = e.getInt16()),
            (i.h = e.getInt16()),
            (i.p = new ns(e, $r)),
            (i.q = new ns(e, ts)),
            (i.r = e.getInt16()),
            (this.U = i),
            (this.ab = new Array(i.k.length)),
            (this.ae = new Array(i.k.length));
          for (let e = 0; e < i.k.length; e++) this.ae[e] = t.aw[i.k[e]];
          let s = _r(255, 255, 255, 255),
            n = new dl();
          (n.a = 0),
            (n.b = 0),
            (n.c = 1),
            (n.d = 1),
            this.au(i.d, i.e, s, n, i.h, i.g),
            this.ag(i.f),
            this.af(!1);
        }
        af(t) {
          (this.L = t), this.L || (this.J = !1);
        }
        ag(t) {
          this.S = t;
        }
        ah() {
          return this.e == this.d;
        }
        ai(t) {
          this.R = t;
        }
        aj(t) {
          this.Q = t;
        }
        ak(t) {
          this.F[3] = Math.max(t, 0);
        }
        al() {
          let t = di();
          Pi(t, this.g, this.O);
          let e = Ci(t);
          Ai(t, this.q, this.R),
            xi(this.w, this.g, t),
            Ai(t, this.r, this.R),
            xi(this.x, this.O, t),
            Ai(t, this.q, this.Q),
            vi(this.y, this.g, t),
            Ai(t, this.r, this.Q),
            vi(this.z, this.O, t),
            Ai(this.u, this.s, e),
            Ai(this.v, this.t, e);
        }
        am(t, e, i) {
          let r;
          if (this.M && this.L) {
            r = t;
            let i = di();
            Ji(i, r),
              vi(i, i, e),
              pi(this.h, e),
              this.J
                ? (pi(this.g, this.O), pi(this.s, this.t), pi(this.q, this.r))
                : (pi(this.g, i),
                  (this.s = gl(r, 2)),
                  (this.q = gl(r, 1)),
                  (this.f = 0),
                  (this.J = !0)),
              (this.O = i),
              (this.t = gl(r, 2)),
              (this.r = gl(r, 1));
          }
        }
        an(t) {
          var e = Rr();
          Ir(e, t),
            (this.s = Ii(this.s, this.s, e)),
            (this.q = Ii(this.q, this.q, e)),
            (this.t = Ii(this.t, this.t, e)),
            (this.r = Ii(this.r, this.r, e)),
            (this.g = Ri(this.g, this.g, t)),
            (this.O = Ri(this.O, this.O, t));
          for (var i = 0; i < this.i.length; i++)
            Ri(this.i[i].a, this.i[i].a, t);
        }
        ao(t, e, i) {
          (this.F[2] = i), (this.F[1] = e), (this.F[0] = t);
        }
        ap(t) {
          if (this.P != t) {
            this.P = t;
            let e = t % this.I,
              i = e;
            0 != (2147483648 & e) &&
              (i = ((1 & e) | (e >> 1)) + ((1 & e) | (e >> 1)));
            let r = i * this.l + this.G.b;
            this.p.b = r;
            let s = t / this.I,
              n = s;
            0 != (2147483648 & s) &&
              ((s = (1 & s) | (s >> 1)), (n = s + s), (r = this.p.b));
            let a = n * this.m + this.G.a;
            (this.p.a = a), (this.p.d = r + this.l), (this.p.c = a + this.m);
          }
        }
        aq(t, e, i) {
          let r,
            s = this.i[2 * this.d],
            n = this.i[2 * this.d + 1],
            a = di();
          Ai(a, this.v, 1 - e),
            xi(a, this.x, a),
            Ai(s.a, a, e),
            Ai(a, this.u, e),
            vi(a, this.w, a),
            Ai(a, a, 1 - e),
            vi(s.a, s.a, a),
            Ai(a, this.v, 1 - e),
            xi(a, this.z, a),
            Ai(n.a, a, e),
            Ai(a, this.u, e),
            vi(a, this.y, a),
            Ai(a, a, 1 - e),
            vi(n.a, n.a, a),
            (this.c[this.d] = t),
            (r = i),
            (this.d = this.d + r),
            this.d >= this.c.length && (this.d -= this.c.length);
        }
        ar(t, e) {
          if (this.a.T) return;
          let i = di(),
            r = 1;
          (i = this.U.l.d(t, this.a.aX, i)),
            (r = this.U.m.d(t, this.a.aX)),
            this.ao(i[0], i[1], i[2]),
            this.ak(r / 32767);
          let s = this.U.n.d(t, this.a.aX);
          this.aj(s);
          let n = this.U.o.d(t, this.a.aX);
          this.ai(n);
          let a = this.U.p.d(t, this.a.aX);
          this.ap(a);
          let o = this.U.q.d(t, this.a.aX, 1);
          this.af(0 != o);
          let l = zi();
          tr(l, this.a.V, this.a.aq[this.U.b].m), Vi(l, l, this.U.c);
          let h = di();
          this.am(l, h, null), this.as(e, !1);
        }
        as(t, e) {
          let i,
            r,
            s,
            n,
            a,
            o,
            l,
            h,
            u,
            c,
            f,
            d,
            b,
            g,
            _,
            p,
            m,
            v,
            x,
            T,
            w,
            y,
            A,
            E,
            C,
            M,
            S,
            k,
            D,
            F,
            R,
            I,
            U,
            P,
            O,
            z,
            B,
            N,
            G,
            L,
            H,
            j,
            V,
            q,
            W,
            X,
            Z,
            K;
          for (
            this.N || (this.C > 0 && (t = 1 / this.C + 99999997e-12)),
              t >= 0 ? this.D <= t && (t = this.D) : (t = 0),
              v = this.e;
            v != this.d && !(t + this.c[v] <= this.D);
            v = this.e
          )
            this.e = this.at(this.e, 1);
          if (!e && this.M && this.L && this.J) {
            (R = t * this.C + this.f), (K = this.F), this.al();
            let e = !1;
            if (
              ((P = 0),
              R < 1
                ? (e = !0)
                : ((Z = this.f),
                  (U = 1 / (R - Z)),
                  (m = Math.floor(R - 1)),
                  (P = Math.ceil(Math.max(m, 0)))),
              -1 == P || e)
            );
            else
              for (
                I = 1, v = 1;
                (F = this.d),
                  (N = this.i.length),
                  (this.i[2 * F].b = K),
                  (x = 2 * this.d + 1),
                  (G = this.i.length),
                  (this.i[x].b = K),
                  this.aq((v - Z) * U * -t, (v - Z) * U, 1),
                  -1 != --P;
                v = I
              )
                (I += 1), (Z = this.f);
            (T = Math.floor(R)),
              (this.f = R - T),
              this.aq(0, 1, 0),
              (D = this.d),
              (L = this.i.length),
              (w = this.i[2 * D]),
              (y = this.p.b),
              (w.c[1] = this.p.a),
              (w.c[0] = y),
              (A = 2 * this.d + 1),
              (H = this.i.length),
              (E = this.i[A]),
              (C = this.p.b),
              (E.c[1] = this.p.c),
              (E.c[0] = C),
              (k = this.d),
              (j = this.i.length),
              (this.i[2 * k].b = K),
              (M = 2 * this.d + 1),
              (V = this.i.length),
              (this.i[M].b = K);
          }
          (this.A[2] = 34028235e31),
            (this.A[1] = 34028235e31),
            (this.A[0] = 34028235e31),
            (this.B[2] = -34028235e31),
            (this.B[1] = -34028235e31),
            (this.B[0] = -34028235e31),
            (O = this.e);
          for (let e = this.e; e != this.d; O = e)
            (p = 2 * e),
              (X = this.i.length),
              (S = O),
              (B = this.i[2 * e]),
              (i = p + 1),
              (r = this.i[2 * e + 1]),
              (s = (this.S + this.S) * this.c[S] * t + t * this.S * t),
              (B.a[2] = B.a[2] + s),
              (r.a[2] = s + r.a[2]),
              (n = B.a[0]),
              (a = this.A[0]),
              a > B.a[0] && ((a = B.a[0]), (this.A[0] = n), (n = B.a[0])),
              (o = B.a[1]),
              (l = this.A[1]),
              l > o && ((l = B.a[1]), (this.A[1] = o), (o = B.a[1])),
              (h = B.a[2]),
              (u = this.A[2]),
              u > h && ((u = B.a[2]), (this.A[2] = h), (h = B.a[2])),
              n > this.B[0] && (this.B[0] = n),
              o > this.B[1] && (this.B[1] = o),
              h > this.B[2] && (this.B[2] = h),
              (c = r.a[0]),
              a > r.a[0] && ((this.A[0] = c), (c = r.a[0])),
              (f = r.a[1]),
              l > f && ((this.A[1] = f), (f = r.a[1])),
              (d = r.a[2]),
              u > d && ((this.A[2] = d), (d = r.a[2])),
              c > this.B[0] && (this.B[0] = c),
              f > this.B[1] && (this.B[1] = f),
              d > this.B[2] && (this.B[2] = d),
              (q = this.c.length),
              (this.c[S] = t + this.c[S]),
              (b = this.l),
              (W = this.c.length),
              (g = b * this.c[S] * this.k + this.p.b),
              (B.c[1] = this.p.a),
              (B.c[0] = g),
              (r.c[1] = this.p.c),
              (r.c[0] = g),
              (_ = this.c.length),
              (z = O + 1),
              (e = z - _),
              _ > z && (e = z);
          this.N = !0;
        }
        at(t, e) {
          let i = e + t;
          t = i;
          let r = this.c.length;
          return i >= r && (t = i - r), t;
        }
        au(t, e, i, r, s, n) {
          let a, o, l, h, u, c, f, d;
          (f = Math.ceil(t)),
            (d = Math.max(0.25, e)),
            (a = Math.ceil(d * f)),
            (o = Math.ceil(Math.max(a + 1 + 1, 0))),
            (this.c = new Array(o)),
            (this.e = 0),
            (this.d = 0),
            (this.f = 0),
            (this.J = !1),
            (this.i = new Array(2 * o));
          for (let t = 0; t < this.i.length; t++) {
            this.i[t] = new fl();
            let e = this.i[t];
            (e.a[0] = 0),
              (e.a[1] = 0),
              (e.a[2] = 0),
              (e.b = _r(0, 0, 0, 0)),
              (e.c[0] = 0),
              (e.c[1] = 0);
          }
          this.j = new Array(4 * o);
          for (let t = 0; t < this.j.length; t++) this.j[t] = t % (2 * o);
          (this.k = 1 / d),
            (l = n),
            0 != (2147483648 & n) &&
              (l = ((1 & n) | (n >> 1)) + ((1 & n) | (n >> 1))),
            (this.l = (r.d - r.b) / l),
            (h = s),
            0 != (2147483648 & s) &&
              (h = ((1 & s) | (s >> 1)) + ((1 & s) | (s >> 1))),
            (this.m = (r.c - r.a) / h),
            (this.n = 1 / this.l),
            (this.o = 1 / this.m),
            (this.C = f),
            (this.D = d),
            xr(i, i, 1 / 255),
            (this.F = i),
            (this.G = r),
            (this.H = s),
            (this.I = n),
            (this.P = 0),
            (u = 0 * this.l + this.G.b),
            (this.p.b = u),
            (c = 0 * this.m + this.G.a),
            (this.p.a = c),
            (this.p.d = u + this.l),
            (this.p.c = c + this.m),
            (this.Q = 10),
            (this.R = 10),
            (this.S = 0),
            (this.M = !0),
            (this.L = !0),
            (this.K = !0);
        }
        av() {
          let t = new Array(this.i.length);
          for (let e = 0, i = 0; e < this.i.length; ++e)
            (t[i++] = this.i[e].a[0]),
              (t[i++] = this.i[e].a[1]),
              (t[i++] = this.i[e].a[2]),
              (t[i++] = this.i[e].b[0]),
              (t[i++] = this.i[e].b[1]),
              (t[i++] = this.i[e].b[2]),
              (t[i++] = this.i[e].b[3]),
              (t[i++] = this.i[e].c[0]),
              (t[i++] = this.i[e].c[1]);
          if (this.ah()) return;
          let e = this.V;
          this.W
            ? (e.bindBuffer(e.ARRAY_BUFFER, this.W),
              e.bufferData(e.ARRAY_BUFFER, new Float32Array(t), e.DYNAMIC_DRAW))
            : ((this.W = e.createBuffer()),
              e.bindBuffer(e.ARRAY_BUFFER, this.W),
              e.bufferData(
                e.ARRAY_BUFFER,
                new Float32Array(t),
                e.DYNAMIC_DRAW
              )),
            this.X
              ? (e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.X),
                e.bufferData(
                  e.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(this.j),
                  e.DYNAMIC_DRAW
                ))
              : ((this.X = e.createBuffer()),
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.X),
                e.bufferData(
                  e.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(this.j),
                  e.DYNAMIC_DRAW
                ));
        }
        aw(t) {
          if (this.ah()) return;
          let e = this.V;
          for (let r = 0; r < this.U.j.length; r++) {
            if (!this.ab[r]) {
              let t = new Oo();
              (t.a = Je(
                e,
                [
                  "        attribute vec3 aPosition;\n        attribute vec4 aColor;\n        attribute vec2 aTexcoord0;\n        uniform mat4 uViewMatrix;\n        uniform mat4 uProjMatrix;\n        varying vec4 vColor;\n        varying vec2 vTexcoord0;\n        void main() {\n            vec4 aPositionVec4 = vec4(aPosition, 1);\n            vColor = aColor;\n            vTexcoord0 = aTexcoord0;\n            gl_Position = uProjMatrix * uViewMatrix * aPositionVec4;\n        }",
                  "    precision mediump float;    varying vec4 vColor;\n    varying vec2 vTexcoord0;\n    uniform sampler2D uTexture;\n    void main() {\n        vec4 tex = texture2D(uTexture, vTexcoord0).rgba;\n        gl_FragColor = vec4((vColor.rgb*tex.rgb), tex.a * vColor.a );\n    }",
                ],
                null,
                null
              )),
                (t.b = {}),
                (t.a.attributes = [
                  {
                    loc: e.getAttribLocation(t.a.program, "aPosition"),
                    type: e.FLOAT,
                    size: 3,
                    offset: 0,
                    stride: 36,
                  },
                  {
                    loc: e.getAttribLocation(t.a.program, "aColor"),
                    type: e.FLOAT,
                    size: 4,
                    offset: 12,
                    stride: 36,
                  },
                  {
                    loc: e.getAttribLocation(t.a.program, "aTexcoord0"),
                    type: e.FLOAT,
                    size: 2,
                    offset: 28,
                    stride: 36,
                  },
                ]),
                (t.c = this.W),
                (t.d = this.X),
                (this.ab[r] = t);
            }
            var i = this.U.j[r];
            if (i <= -1 || i > this.a.ax.length) continue;
            let s = this.a.ax[i];
            if (!s.f || !s.f.e) continue;
            let n = r;
            n >= this.U.k.length && (n = 0);
            let a = this.a.aw[this.U.k[n]];
            (this.ab[r].b.uViewMatrix = this.a.aS.viewMatrix),
              (this.ab[r].b.uProjMatrix = this.a.aS.projMatrix),
              (this.ab[r].b.uTexture = s.f.d),
              (this.ab[r].h = !1),
              (this.ab[r].f = !1),
              (this.ab[r].e = bl[a.b]),
              (this.ab[r].i = !this.a.aY);
            let o =
              this.d > this.e
                ? 2 * (this.d - this.e) + 2
                : 2 * (this.c.length + this.d - this.e) + 2;
            (this.ab[r].j = e.TRIANGLE_STRIP),
              (this.ab[r].k = o),
              (this.ab[r].l = 2 * this.e * 2),
              t.push(this.ab[r]);
          }
        }
      },
      ml =
        "uniform float x;\r\nuniform float y;\r\nuniform float width;\r\nuniform float height;\r\n\r\nattribute vec2 aTextCoord;\r\nvarying vec2 vTextCoords;\r\nvoid main() {\r\n    vTextCoords = aTextCoord;\r\n\r\n    vec2 pos = vec2(\r\n        (x + aTextCoord.x*width)* 2.0 - 1.0,\r\n        (y + aTextCoord.y*height)* 2.0 - 1.0\r\n    );\r\n\r\n    gl_Position = vec4(pos.x, pos.y, 0, 1);\r\n}";
    class vl {
      constructor() {
        (this.a = null), (this.b = null), (this.c = null);
      }
      d() {
        null != this.a && this.a.g(),
          null != this.b && this.b.g(),
          null != this.c && this.c.g();
      }
      e() {
        return (
          !(this.a && !this.a.f()) &&
          !(this.b && !this.b.f()) &&
          !(this.c && !this.c.f())
        );
      }
    }
    class xl {
      constructor() {
        (this.a = null),
          (this.b = null),
          (this.c = null),
          (this.d = {}),
          (this.i = new li()),
          (this.j = null),
          (this.k = null);
      }
    }
    class Tl {
      constructor(t, e, i) {
        (this.e = null),
          (this.i = !1),
          (this.f = t),
          (this.g = e),
          (this.h = i),
          (this.e = (function (t) {
            let e = t.createTexture();
            t.bindTexture(t.TEXTURE_2D, e),
              t.texImage2D(
                t.TEXTURE_2D,
                0,
                t.RGBA,
                1,
                1,
                0,
                t.RGBA,
                t.UNSIGNED_BYTE,
                new Uint8Array([0, 0, 0, 0])
              ),
              t.bindTexture(t.TEXTURE_2D, null);
            let i = t.createTexture();
            t.bindTexture(t.TEXTURE_2D, i),
              t.texImage2D(
                t.TEXTURE_2D,
                0,
                t.RGBA,
                1,
                1,
                0,
                t.RGBA,
                t.UNSIGNED_BYTE,
                new Uint8Array([0, 0, 0, 255])
              ),
              t.bindTexture(t.TEXTURE_2D, null);
            let r = new xl();
            return (
              (r.j = e),
              (r.k = i),
              (r.a = Je(
                t,
                [
                  ml,
                  "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\nuniform vec2 screenResolution;\r\nuniform int layer;\r\n\r\nfloat overlayBlend(float a, float b) {\r\n    if (b > 0.5) {\r\n        return (1.0 - (1.0 - 2.0 * (a - 0.5)) * (1.0 - b));\r\n    } else {\r\n        return ((2.0 * a) * b);\r\n    }\r\n}\r\n\r\nfloat alphaStraightBlend(float a, float b, float alpha) {\r\n    return (a * alpha) + (b * (1.0 - alpha));\r\n}\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    if (uBlendMode == 1) {\r\n        // Blit (we do nothing?)\r\n        //if (diffuse.a < 0.001) discard;\r\n\r\n        //vec4 finalColor = diffuse;\r\n\r\n        //diffuse = vec4(finalColor.rgb, finalColor.a);\r\n    } else if (uBlendMode == 2) {\r\n        // Multiply\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 multTexture = diffuse;\r\n        vec3 finalColor = (backGround.rgb * multTexture.rgb);\r\n\r\n        diffuse = vec4(finalColor.rgb, 1.0);\r\n    } else if (uBlendMode == 3) {\r\n        // Overlay\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 overlayTex = diffuse;\r\n\r\n        vec3 finalColor = vec3(\r\n            overlayBlend(overlayTex.r, backGround.r),\r\n            overlayBlend(overlayTex.g, backGround.g),\r\n            overlayBlend(overlayTex.b, backGround.b)\r\n        );\r\n\r\n        vec3 mainTexVisible = backGround.rgb * (1.0 - overlayTex.a);\r\n        vec3 overlayTexVisible = finalColor.rgb * (overlayTex.a);\r\n        finalColor = (mainTexVisible + overlayTexVisible);\r\n\r\n        diffuse = vec4(finalColor, backGround.a);\r\n    } else if (uBlendMode == 5) {\r\n        // AlphaStraight\r\n        vec4 overlayTex = diffuse;\r\n\r\n        //float alphaMult = 1.0;\r\n        //vec3 finalColor = vec3(\r\n        //    alphaStraightBlend(overlayTex.r, backGround.r, alphaMult*overlayTex.a),\r\n        //    alphaStraightBlend(overlayTex.g, backGround.g, alphaMult*overlayTex.a),\r\n        //    alphaStraightBlend(overlayTex.b, backGround.b, alphaMult*overlayTex.a)\r\n        //);\r\n        vec3 finalColor = overlayTex.rgb * overlayTex.a + backGround.rgb * (1.0 - overlayTex.a);\r\n\r\n        diffuse = vec4(finalColor.rgb, 1.0);\r\n    } else if (uBlendMode == 0 || uBlendMode == 4 || uBlendMode == 6 || uBlendMode == 7) {\r\n        // default, Screen, InferAlphaBlend, Unknown1\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec3 finalColor = mix(backGround.rgb, diffuse.rgb, diffuse.a);\r\n\r\n        diffuse = vec4(finalColor.rgb, 1.0);\r\n    }\r\n\r\n    gl_FragColor = diffuse;\r\n}",
                ],
                null,
                null
              )),
              (r.b = Je(
                t,
                [
                  ml,
                  "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 specular = texture2D( uSpecularTexture, vTextCoords.xy );\r\n    if (diffuse.a < 0.001) discard;\r\n    gl_FragColor = vec4(specular.rgb, 1.0);\r\n}",
                ],
                null,
                null
              )),
              (r.c = Je(
                t,
                [
                  ml,
                  "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\nuniform vec2 screenResolution;\r\nuniform float emissiveAlphaOverride;\r\nuniform int layer;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 emissive = texture2D( uEmissiveTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    if (diffuse.a < 0.001) discard;\r\n//    if (emissive.a < 0.001) discard;\r\n\r\n    //TODO: This is a hack from what was observed in Nightborne texture customization with tatoos.\r\n    //TODO: But Maybe switch should be over layer or something else instead of blend\r\n    float alpha = 1.0;\r\n\r\n    if (emissiveAlphaOverride > -1.0) {\r\n        alpha = emissiveAlphaOverride;\r\n    } else if (layer <= 1) {\r\n        alpha = 0.0;\r\n    } else {\r\n        alpha = emissive.a;\r\n    }\r\n\r\n    gl_FragColor = vec4(emissive.rgb, alpha);\r\n}",
                ],
                null,
                null
              )),
              (r.d = {}),
              (r.f = t.createBuffer()),
              t.bindBuffer(t.ARRAY_BUFFER, r.f),
              t.bufferData(
                t.ARRAY_BUFFER,
                new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
                t.STATIC_DRAW
              ),
              t.bindBuffer(t.ARRAY_BUFFER, null),
              (r.e = t.createBuffer()),
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, r.e),
              t.bufferData(
                t.ELEMENT_ARRAY_BUFFER,
                new Int16Array([0, 1, 2, 1, 3, 2]),
                t.STATIC_DRAW
              ),
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null),
              (r.g = t.createFramebuffer()),
              (r.h = {
                loc: t.getAttribLocation(r.a.program, "aTextCoord"),
                type: t.FLOAT,
                size: 2,
                offset: 0,
                stride: 0,
              }),
              r
            );
          })(t));
      }
      j() {
        let t = this.f;
        this.d && t.deleteTexture(this.d),
          this.a && t.deleteTexture(this.a),
          this.b && t.deleteTexture(this.b),
          this.c && t.deleteTexture(this.c),
          (this.d = t.createTexture()),
          t.bindTexture(t.TEXTURE_2D, this.d),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            t.RGBA,
            this.g,
            this.h,
            0,
            t.RGBA,
            t.UNSIGNED_BYTE,
            null
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
          (this.a = t.createTexture()),
          t.bindTexture(t.TEXTURE_2D, this.a),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            t.RGBA,
            this.g,
            this.h,
            0,
            t.RGBA,
            t.UNSIGNED_BYTE,
            null
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
          (this.b = t.createTexture()),
          t.bindTexture(t.TEXTURE_2D, this.b),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            t.RGBA,
            this.g,
            this.h,
            0,
            t.RGBA,
            t.UNSIGNED_BYTE,
            null
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
          (this.c = t.createTexture()),
          t.bindTexture(t.TEXTURE_2D, this.c),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            t.RGBA,
            this.g,
            this.h,
            0,
            t.RGBA,
            t.UNSIGNED_BYTE,
            null
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
          t.bindTexture(t.TEXTURE_2D, null),
          t.bindFramebuffer(t.FRAMEBUFFER, this.e.g),
          t.framebufferTexture2D(
            t.FRAMEBUFFER,
            t.COLOR_ATTACHMENT0,
            t.TEXTURE_2D,
            this.a,
            0
          ),
          t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
          t.framebufferTexture2D(
            t.FRAMEBUFFER,
            t.COLOR_ATTACHMENT0,
            t.TEXTURE_2D,
            this.b,
            0
          ),
          t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
          t.framebufferTexture2D(
            t.FRAMEBUFFER,
            t.COLOR_ATTACHMENT0,
            t.TEXTURE_2D,
            this.c,
            0
          ),
          t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
          t.useProgram(this.e.b.program),
          t.bindBuffer(t.ARRAY_BUFFER, this.e.f),
          t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.e.e),
          this.e.i.disableAll(),
          this.e.i.enable(t, [this.e.h]),
          t.viewport(0, 0, this.g, this.h);
      }
      k(t, e, i, r, s, n, a, o) {
        let l = this.f;
        (this.e.d.x = e),
          (this.e.d.y = i),
          (this.e.d.width = r),
          (this.e.d.height = s),
          (null == t.b && null == t.c) || (this.i = !0);
        let h = 0;
        1 == n
          ? (h = 1)
          : 4 == n
          ? (h = 2)
          : 6 == n
          ? (h = 3)
          : 7 == n
          ? (h = 4)
          : 9 == n
          ? (h = 5)
          : 15 == n
          ? (h = 6)
          : 16 == n && (h = 7),
          (this.e.d.uBlendMode = h),
          (this.e.d.screenResolution = new Float32Array([this.g, this.h])),
          (this.e.d.uDiffuseTexture = null != t.a ? t.a.d : this.e.j),
          (this.e.d.uSpecularTexture = null != t.b ? t.b.d : this.e.j),
          (this.e.d.uEmissiveTexture = null != t.c ? t.c.d : this.e.k),
          (this.e.d.renderResultTexture = null != this.d ? this.d : this.e.j),
          (this.e.d.layer = a),
          (this.e.d.emissiveAlphaOverride = o),
          l.disable(l.CULL_FACE),
          l.disable(l.DEPTH_TEST),
          l.disable(l.BLEND),
          l.useProgram(this.e.a.program),
          l.framebufferTexture2D(
            l.FRAMEBUFFER,
            l.COLOR_ATTACHMENT0,
            l.TEXTURE_2D,
            this.a,
            0
          ),
          l.bindTexture(l.TEXTURE_2D, this.d),
          l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.g, this.h, 0),
          l.bindTexture(l.TEXTURE_2D, null),
          Xe(this.e.a, this.e.d),
          l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
          l.useProgram(this.e.b.program),
          l.framebufferTexture2D(
            l.FRAMEBUFFER,
            l.COLOR_ATTACHMENT0,
            l.TEXTURE_2D,
            this.b,
            0
          ),
          l.bindTexture(l.TEXTURE_2D, this.d),
          l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.g, this.h, 0),
          l.bindTexture(l.TEXTURE_2D, null),
          Xe(this.e.b, this.e.d),
          l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
          l.useProgram(this.e.c.program),
          l.framebufferTexture2D(
            l.FRAMEBUFFER,
            l.COLOR_ATTACHMENT0,
            l.TEXTURE_2D,
            this.c,
            0
          ),
          l.bindTexture(l.TEXTURE_2D, this.d),
          l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.g, this.h, 0),
          l.bindTexture(l.TEXTURE_2D, null),
          Xe(this.e.c, this.e.d),
          l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
          l.useProgram(null);
      }
      l() {
        let t = this.f;
        t.bindFramebuffer(t.FRAMEBUFFER, null),
          t.enable(t.CULL_FACE),
          t.enable(t.DEPTH_TEST);
      }
      m(t) {
        if (0 == t) return this.a;
        if (1 == t) return this.b;
        if (2 == t) return this.c;
        throw new Error("unknown usage " + t);
      }
      n() {
        let t = this.f;
        this.d && t.deleteTexture(this.d),
          this.a && t.deleteTexture(this.a),
          this.b && t.deleteTexture(this.b),
          this.c && t.deleteTexture(this.c),
          (this.a = null),
          (this.b = null),
          (this.c = null),
          (this.d = null),
          (this.e = null),
          (this.f = null);
      }
    }
    class wl {
      constructor(t, e) {
        (this.a = t), (this.b = e);
      }
      c() {
        const t = [];
        for (let e of this.b.Options)
          for (let i of e.Choices)
            for (let e of i.Elements)
              e.SkinnedModel && t.push(e.SkinnedModel.CollectionFileDataID);
        const e = new Set(t);
        if (0 != e.size)
          for (let t of e) {
            let e = { type: sr.PATH, id: t, parent: this.a, shoulder: 0 };
            this.a.A[t] = new kl(this.a.aS, this.a.l, e, 0, !1, !1, !1);
          }
      }
      d(t) {
        return Ko.a(
          this.a,
          this.b.TextureFiles[t],
          this.a.p,
          this.a.q,
          this.a.o
        );
      }
      e(t) {
        WH.debug("applyCustomization options", t),
          (this.a.N = []),
          this.a.bv(0);
        for (let t = 0; t < this.a.K.length; t++) this.a.K[t] = -1;
        for (let t in this.a.A) {
          let e = this.a.A[t];
          for (let t = 0; t < e.K.length; t++) (e.K[t] = -1), (e.L[t] = !1);
        }
        for (let e = 0; e < t.length; e++) {
          let i = this.b.Options.find((i) => i.Id == t[e].optionId);
          if ((WH.debug("option", i), i)) {
            let r = i.Choices.find((i) => i.Id == t[e].choiceId);
            if ((WH.debug("choice", r), r)) {
              let e = r.Elements.filter(
                (e) =>
                  e.BoneSet &&
                  e.BoneSet.BoneFileDataID &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              e.length > 0 && this.a.bv(e[0].BoneSet.BoneFileDataID);
              let s = r.Elements.filter(
                (e) =>
                  e.Material &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              s.sort((t, e) => e.VariationChoiceID - t.VariationChoiceID),
                s.forEach((t) => {
                  WH.debug("element material", t);
                  let e = this.d(t.Material.MaterialResourcesID);
                  if (!e)
                    return void WH.debug(
                      "element material: can't get texture files for material",
                      t
                    );
                  let i = this.b.TextureLayers.find(
                    (e) => e.ChrModelTextureTargetID == t.Material.TextureTarget
                  );
                  i
                    ? this.a.D[t.Material.TextureTarget]
                      ? WH.debug(
                          "texture for target",
                          t.Material.TextureTarget,
                          "already registered"
                        )
                      : (this.a.D[t.Material.TextureTarget] = this.a.bB(
                          i.TextureType,
                          e
                        ))
                    : WH.debug(
                        "element material: can't get texture layer for material",
                        t
                      );
                }),
                r.Elements.filter(
                  (e) =>
                    e.Geoset &&
                    (0 == e.VariationChoiceID ||
                      t.some((t) => t.choiceId == e.VariationChoiceID))
                )
                  .sort(
                    (t, e) =>
                      t.Geoset.GeosetType - e.Geoset.GeosetType ||
                      t.Geoset.GeosetID - e.Geoset.GeosetID
                  )
                  .forEach((t) => {
                    WH.debug("element geoset", t), this.a.bE(t.Geoset);
                  }),
                r.Elements.filter(
                  (e) =>
                    e.SkinnedModel &&
                    (0 == e.VariationChoiceID ||
                      t.some((t) => t.choiceId == e.VariationChoiceID))
                ).forEach((t) => {
                  WH.debug("element skinnedmodel", t),
                    this.a.A[t.SkinnedModel.CollectionFileDataID] &&
                      this.a.A[t.SkinnedModel.CollectionFileDataID].bF(
                        t.SkinnedModel
                      );
                });
              let n = r.Elements.find(
                (e) =>
                  0 != e.CondModelFileDataId &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              if (24 == i.Id || 353 == i.Id)
                if (n && !this.a.c) {
                  WH.debug("element condModel", n);
                  let e = this.a.aS,
                    i = this.a.a,
                    r = e.models.indexOf(this.a);
                  if (r > -1) {
                    e.models.splice(r, 1),
                      WH.debug("test 1!", t, e.options, i),
                      (e.options.charCustomization = this.a.r);
                    let s = new kl(
                      e,
                      e.options,
                      i,
                      r,
                      !0,
                      !1,
                      !1,
                      n.CondModelFileDataId
                    );
                    return (
                      (s.r = this.a.r),
                      e.models.push(s),
                      this.a.ba(),
                      void (this.a = s)
                    );
                  }
                } else if (!n && this.a.c) {
                  let e = this.a.aS,
                    i = this.a.a,
                    r = e.models.indexOf(this.a);
                  if (r > -1) {
                    e.models.splice(r, 1),
                      WH.debug("test 2!", t, e.options, i),
                      (e.options.charCustomization = this.a.r);
                    let s = new kl(e, e.options, i, r, !0, !1, !1);
                    return (
                      (s.r = this.a.r),
                      e.models.push(s),
                      this.a.ba(),
                      void (this.a = s)
                    );
                  }
                }
              r.Elements.filter(
                (e) =>
                  e.ChrCustItemGeoModifyID &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              ).forEach((t) => {
                WH.debug("element ChrCustItemGeoModify", t),
                  this.a && this.a.N.push(t.ChrCustItemGeoModifyID);
              });
            }
          }
        }
        if (!this.a.D[10]) {
          let e = this.b.Options.find((t) => t.Id == this.b.HairStyleOptionId);
          if (e) {
            let i = e.Choices[1];
            if (i) {
              let e = i.Elements.filter(
                (e) =>
                  e.Material &&
                  10 == e.Material.TextureTarget &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              if (e.length > 0) {
                let t = this.d(e[0].Material.MaterialResourcesID);
                t && (this.a.D[e[0].Material.TextureTarget] = this.a.bB(6, t));
              }
            }
          }
        }
      }
      f() {
        let t = [];
        for (let e = 0; e < this.b.Options.length; e++) {
          let i = this.b.Options[e];
          if (i) {
            let e = i.Choices[0];
            e && t.push({ optionId: i.Id, choiceId: e.Id });
          }
        }
        this.e(t);
      }
      g(t) {
        let e = { options: t, sheathMain: -1, sheathOff: -1 };
        for (let t of this.b.Options)
          e.options.some((e) => e.optionId == t.Id) ||
            e.options.push({ optionId: t.Id, choiceId: t.Choices[0].Id });
        return e;
      }
    }
    const yl = function (t, e) {
        const i = Math.abs(t),
          r = Math.abs(e);
        return (
          Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t)
        );
      },
      Al = 51,
      El = 5200,
      Cl = "DressingRoom",
      Ml = "Stand";
    class Sl {
      constructor(t, e, i, r, s, n, a, o) {
        (this.f = !1),
          (this.s = 0),
          (this.t = null),
          (this.u = null),
          (this.E = []),
          (this.N = []),
          (this.S = new Zr()),
          (this.U = !1),
          (this.ao = []),
          (this.aH = []),
          (this.aI = []),
          (this.aR = !1),
          (this.aT = null),
          (this.aU = null),
          (this.aV = null),
          (this.aX = []),
          (this.aY = !1);
        var l = this;
        if (
          ((l.f = s),
          (l.aS = t),
          (l.a = i),
          (l.b = r),
          (l.c = o),
          (l.d = !1),
          (l.g = !0),
          (l.h = !0),
          (this.i = !1),
          (l.ae = n),
          (l.l = e),
          "classic" == l.l.gameDataEnv
            ? ((nr[14] = 14), (nr[15] = 15))
            : ((nr[14] = 22), (nr[15] = 22)),
          (l.j = null),
          (l.m =
            l.l.mount && l.l.mount.type == sr.NPC && l.l.mount.id == l.a.id),
          (l.k = null),
          (l.n = l.l.pet && l.l.pet.type == sr.NPC && l.l.pet.id == l.a.id),
          l.a.type == sr.CHARACTER &&
            l.l.mount &&
            l.l.mount.type == sr.NPC &&
            l.l.mount.id &&
            ((l.l.mount.parent = l),
            (l.j = new Sl(t, e, l.l.mount, 0, !1, !1, !1))),
          l.a.type == sr.CHARACTER &&
            l.l.pet &&
            l.l.pet.type == sr.NPC &&
            l.l.pet.id &&
            ((l.l.pet.parent = l),
            (l.k = new Sl(t, e, l.l.pet, 0, !1, !1, !1))),
          l.l.extraModels && !l.a.parent)
        ) {
          l.B = [];
          const i = l.l.extraModels;
          if ($.isArray(i))
            for (let r = 0; r < i.length; ++r) {
              const s = { type: sr.PATH, id: i[r][0], parent: l, shoulder: -1 };
              l.B.push(new Sl(t, e, s, 0, !1, !1, !1));
            }
        }
        (l.o = 0),
          (l.p = -1),
          (l.q = l.l.cls ? parseInt(l.l.cls) : 0),
          (l.v = null),
          (l.w = l.a.parent || null),
          (l.y = new Map()),
          (this.z = [null, null]),
          (l.x = !1),
          (l.A = {}),
          (l.C = {}),
          (l.aK = {}),
          (l.aL = null),
          (l.D = {}),
          (l.H = -1),
          (l.I = -1),
          (l.J = new Array(Al)),
          (l.K = new Array(Al)),
          (l.L = new Array(Al)),
          (l.M = [
            1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1,
            1, 0, 0, 1, 0, 1, 0, 0, 0, 2, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
          ]),
          (l.O = null),
          (l.P = 0);
        for (let t = 0; t < Al; t++) l.J[t] = 100 * t + l.M[t];
        (l.Q = 0),
          (l.R = 0),
          (l.S.c = 0),
          (l.S.a.a = -1),
          (l.T = !1),
          (l.V = zi()),
          (l.W = _r(1, 1, 1, 1)),
          (l.X = [0.35, 0.35, 0.35, 1]),
          (l.Y = [1, 1, 1, 1]),
          (l.Z = [0.35, 0.35, 0.35, 1]),
          (l.aa = di()),
          (l.ab = di()),
          (l.ac = di()),
          Si(l.aa, [5, -3, 3]),
          Si(l.ab, [5, 5, 5]),
          Si(l.ac, [-5, -5, -5]),
          (l.ad = !1),
          (l.af = _i(0, 0, 0)),
          (l.ag = _i(0, 0, 0)),
          (l.ah = _i(0, 0, 0)),
          (l.boundsSize = _i(0, 0, 0)),
          (l.al = null),
          (l.am = null),
          (l.ao = null),
          (l.ap = null),
          (l.aq = null),
          (l.ar = null),
          (l.as = null),
          (l.at = null),
          (l.au = null),
          (l.av = null),
          (l.aw = null),
          (l.ax = null),
          (l.ay = null),
          (l.az = null),
          (l.aA = null),
          (l.aB = null),
          (l.aC = null),
          (l.aD = null),
          (l.aE = null),
          (l.aF = null),
          (l.aG = null),
          (l.aH = null),
          (l.aI = null),
          (l.aN = zi()),
          (l.aO = di()),
          (l.aP = di()),
          (l.aQ = br()),
          a || l.bU();
      }
      bZ(t) {
        if (this[t]) {
          for (var e = this[t], i = 0; i < e.length; ++i)
            e[i] && e[i].destroy && e[i].destroy(), (e[i] = null);
          this[t] = null;
        }
      }
      ba() {
        var t = this;
        if (
          ((this.aR = !0), (this.d = !1), t.aL && t.aL.d(), (t.aL = null), t.C)
        )
          for (const e in t.C) t.C[e].g(), delete t.C[e];
        if (t.aK) for (const e in t.aK) t.aK[e].n(), delete t.aK[e];
        if (
          (t.am && (t.am = null),
          t.ap && (t.ap = null),
          t.ar && (t.ar = null),
          t.as && (t.as = null),
          t.av && (t.av = null),
          t.ay && (t.ay = null),
          t.aA && (t.aA = null),
          t.aB && (t.aB = null),
          t.aD && (t.aD = null),
          t.aG && (t.aG = null),
          t.aw)
        )
          for (let e = 0; e < t.aw.length; ++e) t.aw[e] = null;
        if (
          ((t.aw = null),
          this.bZ("vertices"),
          this.bZ("animations"),
          this.bZ("bones"),
          this.bZ("meshes"),
          this.bZ("texUnits"),
          this.bZ("materials"),
          this.bZ("textureAnims"),
          this.bZ("attachments"),
          this.bZ("colors"),
          this.bZ("alphas"),
          this.bZ("particleEmitters"),
          this.bZ("ribbonEmitters"),
          this.bZ("skins"),
          this.bZ("faces"),
          this.bZ("hairs"),
          (this.ao = null),
          t.y &&
            t.y.forEach((e, i) => {
              e.y(), t.y.set(i, null);
            }),
          t.j && t.j.ba(),
          (t.j = null),
          t.k && t.k.ba(),
          (t.k = null),
          t.A)
        ) {
          for (const e in t.A) t.A[e].ba(), delete t.A[e];
          t.A = null;
        }
        (t.a = null),
          (t.y = null),
          (t.C = null),
          (t.aK = null),
          (t.J = null),
          (t.V = null),
          (t.X = null),
          (t.Y = null),
          (t.Z = null),
          (t.aa = null),
          (t.ab = null),
          (t.ac = null),
          (t.af = null),
          (t.ag = null),
          (t.ah = null),
          (t.boundsSize = null),
          (t.aN = null),
          (t.aO = null),
          (t.aP = null),
          (t.aQ = null);
      }
      getNumAnimations() {
        const t = this.j ? this.j : this;
        return t.ao ? t.ao.length + 1 : 0;
      }
      getAnimation(t) {
        const e = this.j ? this.j : this;
        return e.ao && t > -1 && t < e.ao.length
          ? e.ao[t].j
          : t == e.ao.length
          ? Cl
          : "";
      }
      resetAnimation() {
        (this.j ? this.j : this).setAnimation(Ml);
      }
      setAnimPaused(t) {
        var e;
        (this.T = t),
          null === (e = this.j) || void 0 === e || e.setAnimPaused(t),
          this.E.forEach((e) => e.f(t));
      }
      setAnimNoSubAnim(t) {
        this.U = t;
      }
      bg(t) {
        var e;
        null === (e = this.k) || void 0 === e || e.setAnimation(t);
      }
      setItems(t) {
        WH.debug("setItems", t);
        const e = [];
        for (let i = 0; i < t.length; i++)
          e.push([t[i].slot, t[i].display, t[i].visual]);
        e.forEach((t) => {
          const e = [parseInt(t[0]), parseInt(t[1])];
          this.l.items.push(e);
        }),
          this.bP(e),
          (this.x = !0);
      }
      attachList(t) {
        WH.debug("attachList", t);
        const e = t.split(","),
          i = [];
        for (let t = 0; t < e.length; t += 2) i.push([e[t], e[t + 1]]);
        i.forEach((t) => {
          const e = [parseInt(t[0]), parseInt(t[1])];
          this.l.items.push(e);
        }),
          this.bP(i),
          (this.x = !0);
      }
      clearSlots(t) {
        WH.debug("clearSlots", t);
        const e = t.split(",");
        for (let t = 0; t < e.length; ++t) {
          this.bR(parseInt(e[t]));
          const i = [];
          this.l.items.forEach((e) => {
            0 != this.l.items[t].indexOf(parseInt(e)) && i.push(e);
          }),
            (this.l.items = i);
        }
        this.bO(), (this.x = !0);
      }
      setShouldersOverride(t) {
        if ((WH.debug("setShouldersOverride", t), !t || 2 != t.length)) return;
        for (let t = 0; t < 2; t++) {
          const e = this.z[t];
          e && e.y(), (this.z[t] = null);
        }
        for (let e = 0; e < 2; e++)
          if (null != t[e]) {
            const i = new Yo(this, 3, t[e], this.o, this.p);
            let r = 0;
            (r = 0 == e ? 1 : 2), i.C(r), (this.z[e] = i);
          }
        const e = this.y.get(3);
        if (e) {
          let t = 3;
          for (let e = 0; e < 2; e++) this.z[e] && (t &= ~(1 << e));
          e.C(t);
        }
      }
      setSheath(t, e) {
        (this.H = t), (this.I = e), this.bO();
      }
      setAppearance(t) {
        var e;
        if (this.D) for (const t in this.D) this.D[t].d(), delete this.D[t];
        (this.r = t),
          (this.H = t.sheathMain),
          (this.I = t.sheathOff),
          null === (e = this.F) || void 0 === e || e.e(t.options),
          (this.x = !0),
          this.bC(),
          this.bO();
      }
      setCustomizationsLoadedCallback(t) {
        this.G = t;
      }
      setModelLoadedCallback(t) {
        this.e = t;
      }
      isLoaded() {
        return this.j ? this.j.d && this.d : this.d;
      }
      setParticlesEnabled(t) {
        (this.g = t),
          this.y.forEach((e) => {
            if (e.i)
              for (let i = 0; i < e.i.length; ++i)
                if (
                  e.i[i] &&
                  (e.i[i].e.setParticlesEnabled(t), e.s[i] && e.s[i].b)
                ) {
                  const r = e.i[i].e;
                  for (let s = 0; s < e.s[i].b.length; s++)
                    r.aC &&
                      r.aC[s] &&
                      e.s[i].b[s] &&
                      e.s[i].b[s].e.setParticlesEnabled(t);
                }
          });
      }
      setRibbonsEnabled(t) {
        this.h = t;
      }
      getTexUnits() {
        return this.aM;
      }
      bt(t, e, i, r) {
        Bi(this.V, t),
          ji(this.V, this.V, e),
          i && Vi(this.V, this.V, i),
          r && ji(this.V, this.V, r);
      }
      bu(t, e) {
        let i = !1;
        const r = t == Cl;
        r && (t = Ml);
        for (let s = 0; s < this.ao.length; ++s) {
          const n = this.ao[s];
          if (n.j && n.j == t && 0 == n.b) {
            (i = !0),
              (e.a.a = s),
              (e.a.b = n),
              (e.a.c = 0),
              (e.b = new Xr()),
              (e.c = 0),
              (e.d = r),
              WH.debug("Set animation to", n.a, n.j);
            break;
          }
        }
        t == Ml || i || this.bu(Ml, e);
      }
      bv(t) {
        if (this.s == t) return;
        if (this.d)
          for (let t = 0; t < this.aq.length; t++) this.aq[t].x = null;
        if (((this.s = t), t <= 0)) return;
        let e = this.l.contentPath + "bone/" + t + ".bone",
          i = this;
        $.ajax({
          url: e,
          type: "GET",
          dataType: "binary",
          responseType: "arraybuffer",
          processData: !1,
          renderer: this.aS,
          success: function (t) {
            i.bw(t);
          },
          error: function (t, e, i) {
            console.log(i);
          },
        });
      }
      bw(t) {
        let e = new cl(t);
        e.getInt32();
        for (; e.position < e.buffer.byteLength; ) {
          let t = String.fromCharCode(
              e.getUint8(),
              e.getUint8(),
              e.getUint8(),
              e.getUint8()
            ),
            i = e.getUint32();
          if ("BIDA" == t) {
            let t = i / 2;
            this.t = new Array(t);
            for (let i = 0; i < t; i++) this.t[i] = e.getUint16();
          }
          if ("BOMT" == t) {
            let t = i / 64;
            this.u = new Array(t);
            for (let i = 0; i < t; i++) {
              let t = Ni(
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat(),
                e.getFloat()
              );
              this.u[i] = t;
            }
          }
        }
        this.d && this.bx();
      }
      bx() {
        if (!(this.s <= 0) && this.t && this.t.length)
          for (let t = 0; t < this.t.length; t++)
            this.aq[this.t[t]].x = this.u[t];
      }
      setAnimation(t) {
        this.ao &&
          (this.j &&
            (this.j.setAnimation(t),
            (t = ir[this.j.a.id] ? "StealthStand" : "Mount")),
          this.bu(t, this.S),
          this.y.forEach((e) => {
            if (e.i)
              for (let i = 0; i < e.i.length; i++)
                e.i[i] && e.i[i].e.setAnimation(t);
          }),
          this.E && this.E.forEach((e) => e.e(t)));
      }
      bz(t) {
        let e = this,
          i = e.aS.context;
        if (!e.al || !e.am) return;
        const r = 10 * e.al.length;
        if ((e.aT || (e.aT = new Float32Array(r)), t)) {
          var s = e.aT,
            n = e.al;
          for (let t = 0, e = 0; t < r; ++e)
            (s[t + 0] = n[e].i[0]),
              (s[t + 1] = n[e].i[1]),
              (s[t + 2] = n[e].i[2]),
              (s[t + 3] = n[e].j[0]),
              (s[t + 4] = n[e].j[1]),
              (s[t + 5] = n[e].j[2]),
              (s[t + 6] = n[e].c),
              (s[t + 7] = n[e].d),
              (s[t + 8] = n[e].e),
              (s[t + 9] = n[e].f),
              (t += 10);
        }
        e.aU
          ? (i.bindBuffer(i.ARRAY_BUFFER, e.aU),
            i.bufferSubData(i.ARRAY_BUFFER, 0, e.aT))
          : ((e.aU = i.createBuffer()),
            i.bindBuffer(i.ARRAY_BUFFER, e.aU),
            i.bufferData(i.ARRAY_BUFFER, e.aT, i.DYNAMIC_DRAW),
            (e.aV = i.createBuffer()),
            i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.aV),
            i.bufferData(
              i.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(e.am),
              i.STATIC_DRAW
            ));
      }
      bA() {
        let t,
          e = this,
          i = _r(1, 1, 1, 1),
          r = e.af,
          s = e.ag,
          n = e.aO;
        if ((mi(r, 9999, 9999, 999), mi(s, -9999, -9999, -9999), !e.au))
          return Gi(e.V), e.w || (e.aS.distance = 1), !1;
        for (let n = 0; n < e.au.length; ++n) {
          let a = e.au[n];
          if (!a.show) continue;
          if (
            ((i[0] = i[1] = i[2] = i[3] = 1),
            e.S.a.a > 0 &&
              (a.v && (i = a.v.g(e.S, this.aX)),
              a.w[0] && (i[3] *= a.w[0].d(e.S, this.aX))),
            i[3] < 0.01)
          )
            continue;
          let o = a.p;
          for (let i = 0; i < o.f; ++i)
            (t = e.al[e.am[o.e + i]].i), wi(r, r, t), yi(s, s, t);
        }
        for (const e in this.A) {
          const i = this.A[e];
          if (i && i.d && i.au && i.au.length > 0)
            for (let e = 0; e < i.au.length; ++e) {
              let n = i.au[e];
              if (!n.show) continue;
              let a = n.p;
              for (let e = 0; e < a.f; ++e)
                (t = i.al[i.am[a.e + e]].i), wi(r, r, t), yi(s, s, t);
            }
        }
        e.j &&
          e.j.d &&
          e.j.bA() &&
          (pi(r, Ai(r, e.j.af, 1.1)),
          pi(s, Ai(s, e.j.ag, 1.1)),
          (s[2] *= 1.75)),
          e.a.type == sr.NPC && (Ai(r, r, e.v.Scale), Ai(s, s, e.v.Scale)),
          xi(e.boundsSize, s, r),
          Ei(e.ah, r, e.boundsSize, 0.5);
        let a,
          o,
          l = e.boundsSize[2];
        const h = e.v && e.v.Scale ? e.v.Scale : 1;
        if (
          (e.a.type != sr.ITEM
            ? ((a = e.boundsSize[1]), (o = e.boundsSize[0]))
            : ((a = e.boundsSize[0]), (o = e.boundsSize[1])),
          !e.w)
        ) {
          const t = e.aS.width / e.aS.height,
            i = 2 * Math.tan((e.aS.fov / 2) * 0.0174532925),
            r = (1.2 * l) / i,
            s = (1.2 * a) / (i * t);
          e.aS.distance = Math.max(Math.max(r, s), 2 * o);
        }
        return (
          Gi(e.V),
          e.a.type != sr.ITEM && Zi(e.V, e.V, Math.PI / 2),
          Vi(e.V, e.V, Mi(n, e.ah)),
          mi(e.aO, h, h, h),
          qi(e.V, e.V, e.aO),
          !0
        );
      }
      bB(t, e) {
        let i = new vl();
        return (
          e.a > 0 && (i.a = new No(this, e.a)),
          e.b > 0 && (i.b = new No(this, e.b)),
          e.c > 0 && (i.c = new No(this, e.c)),
          i
        );
      }
      bC() {
        if (!this.aR)
          if (
            (this.a.type != sr.CHARACTER &&
              this.a.type != sr.NPC &&
              this.a.type != sr.HUMANOIDNPC) ||
            !this.v.Character
          ) {
            if ((this.bH(), this.a.type == sr.HELM)) {
              const t = this.v;
              this.bK(t.Item.AttachGeosetGroup[0], 27),
                this.bK(t.Item.AttachGeosetGroup[1], 21);
            }
            if (this.a.type == sr.SHOULDER) {
              const t = this.v;
              this.bK(t.Item.AttachGeosetGroup[0], 26);
            }
          } else this.bL(), this.aL || (this.x = !0);
      }
      bD(t) {
        t && (this.J[t.geosetType] = 100 * t.geosetType + t.geosetID);
      }
      bE(t) {
        t && (this.K[t.GeosetType] = 100 * t.GeosetType + t.GeosetID);
      }
      bF(t) {
        t &&
          ((this.K[t.GeosetType] = 100 * t.GeosetType + t.GeosetID),
          (this.L[t.GeosetType] = 0 == (1 & t.Flags)));
      }
      bG(t, e, i) {
        if (!this.au || 0 == this.au.length) return !1;
        let r;
        for (let s = 0; s < this.au.length; ++s)
          (r = this.au[s]), r.meshId >= t && r.meshId <= e && (r.show = i);
        return !0;
      }
      bH() {
        if ((this.bG(0, 0, !0), 0 != this.P && (this.bG(1, 1699, !1), this.O)))
          for (let t of this.O) {
            let e = 100 * (t.GeosetIndex + 1),
              i = e + t.GeosetValue;
            this.bG(e, e + 99, !1), this.bG(i, i, !0);
          }
      }
      bI(t, e) {
        let i = [];
        for (let t = 0; t < this.aq.length; t++) i[this.aq[t].g] = t;
        let r = t.aq;
        if (r) {
          for (let t = 0; t < r.length; t++) {
            let e = i[r[t].g];
            if ("number" != typeof e) continue;
            let s = r[t].m,
              n = this.aq[e].m;
            (r[t].u = !0), Bi(s, n);
          }
          Gi(this.aN), t.bt(this.V, this.aN), t.cb(), t.cd(e);
        }
      }
      bJ(t, e) {
        if (!this.au) return;
        let i = e + 1,
          r = t > 0 ? e + t : i,
          s = this.au.some((t) => t.meshId == r);
        (r = s ? r : i), this.bG(r, r, !0);
      }
      bK(t, e) {
        if (!this.au) return;
        let i = 100 * e,
          r = i + this.M[e] + t,
          s = this.au.some((t) => t.meshId == r);
        (r = s ? r : 100 * e + 1), this.bG(i, i + 99, !1), this.bG(r, r, !0);
      }
      bL() {
        var t = this;
        if (!t.au || 0 == t.au.length) return;
        for (let e = 0; e < Al; e++) t.J[e] = 100 * e + t.M[e];
        t.bG(0, El, !1), t.bG(0, 0, !0);
        for (let e = 0; e < t.K.length; e++)
          -1 != this.K[e] && (this.J[e] = this.K[e]);
        for (let e = 0; e < t.J.length; e++) t.bG(t.J[e], t.J[e], !0);
        t.y.forEach((t) => {
          if (t && t.r) {
            let e = t.r;
            e.bG(0, El, !1),
              1 == t.b
                ? (e.bJ(t.k[0], 2700), e.bJ(t.k[1], 2100))
                : 3 == t.b
                ? e.bJ(t.k[0], 2600)
                : 4 == t.b
                ? (e.bJ(t.k[0], 800), e.bJ(t.k[1], 1e3))
                : 5 == t.b || 20 == t.b
                ? (e.bJ(t.k[0], 800),
                  e.bJ(t.k[1], 1e3),
                  e.bJ(t.k[2], 1300),
                  e.bJ(t.k[3], 2200),
                  e.bJ(t.k[4], 2800))
                : 6 == t.b
                ? e.bJ(t.k[0], 1800)
                : 7 == t.b
                ? (e.bJ(t.k[0], 1100), e.bJ(t.k[1], 900), e.bJ(t.k[2], 1300))
                : 8 == t.b
                ? (e.bJ(t.k[0], 500), e.bJ(t.k[1], 2e3))
                : 10 == t.b
                ? (e.bJ(t.k[0], 400), e.bJ(t.k[1], 2300))
                : 16 == t.b
                ? e.bJ(t.k[0], 1500)
                : 19 == t.b
                ? e.bJ(t.k[0], 1200)
                : 9 == t.b && e.bJ(t.k[0], 2300);
          }
        }),
          t.z.forEach((t) => {
            if (t && t.r) {
              let e = t.r;
              e.bG(0, El, !1), e.bJ(t.k[0], 2600);
            }
          }),
          t.y.forEach((t) => {
            if (t && t.i)
              for (let e of t.i) {
                if (!e) continue;
                let i = e.e;
                1 == t.b
                  ? (i.bK(t.l[0], 27), i.bK(t.l[1], 21))
                  : 3 == t.b
                  ? i.bK(t.l[0], 26)
                  : 4 == t.b
                  ? (i.bK(t.l[0], 8), i.bK(t.l[1], 10))
                  : 5 == t.b || 20 == t.b
                  ? (i.bK(t.l[0], 8),
                    i.bK(t.l[1], 10),
                    i.bK(t.l[2], 13),
                    i.bK(t.l[3], 22),
                    i.bK(t.l[4], 28))
                  : 6 == t.b
                  ? i.bK(t.l[0], 18)
                  : 7 == t.b
                  ? (i.bK(t.l[0], 11), i.bK(t.l[1], 9), i.bK(t.l[2], 13))
                  : 8 == t.b
                  ? (i.bK(t.l[0], 5), i.bK(t.l[1], 20))
                  : 10 == t.b
                  ? (i.bK(t.l[0], 4), i.bK(t.l[1], 23))
                  : 16 == t.b
                  ? i.bK(t.l[0], 15)
                  : 19 == t.b
                  ? i.bK(t.l[0], 12)
                  : 9 == t.b && i.bK(t.l[0], 23);
              }
          }),
          t.z.forEach((t) => {
            if (t && t.i)
              for (let e of t.i) {
                let i = e.e;
                i.bK(t.l[0], 26),
                  t.m > 0 && (i.bG(2600, 2699, !1), i.bK(t.m, 26));
              }
          });
        let e = t.y.get(1),
          i = t.y.get(3),
          r = t.y.get(4),
          s = t.y.get(5),
          n = t.y.get(6),
          a = t.y.get(7),
          o = t.y.get(8),
          l = t.y.get(9),
          h = t.y.get(10),
          u = t.y.get(19),
          c = t.y.get(16);
        if (e && e.n) {
          const i = e.r || e.i[0],
            r = t.o,
            s = 0 == t.p ? e.w : e.x;
          if (i && s)
            for (let e = 0; e < s.length; e++)
              if (s[e].RaceId == r) {
                const i = s[e].GeosetGroup;
                if (5 == r && (1 == i || 2 == i)) continue;
                if (i < Al)
                  if (0 == i) t.bG(1, 99, !1);
                  else {
                    const e = 100 * i;
                    t.bG(e, e + 99, !1);
                  }
              }
        }
        if (e && e.i && e.m > 0)
          for (let t of e.i) {
            let i = t.e;
            i.bG(2600, 2799, !1), i.bK(e.m, 27);
          }
        if (i && i.i && i.m > 0)
          for (let t of i.i) {
            let e = t.e;
            e.bG(2600, 2699, !1), e.bK(i.m, 26);
          }
        if (n && n.i && n.m > 0)
          for (let t of n.i) {
            let e = t.e;
            e.bG(1800, 1899, !1), e.bK(n.m, 18);
          }
        let f = 0;
        if ((u && (f |= 16), h && h.k && h.k[0])) {
          let e = 401 + h.k[0];
          t.bG(401, 499, !1), t.bG(e, e, !0), (h.f += 2);
        } else if (s && s.k && s.k[0]) {
          let e = 801 + s.k[0];
          t.bG(e, e, !0);
        }
        if (!(s || n || l) && r && r.k && r.k[0]) {
          let e = 801 + r.k[0];
          t.bG(e, e, !0);
        }
        if (u)
          0 == (1048576 & u.h) && (t.bG(2200, 2299, !1), t.bG(2202, 2202, !0));
        else if (s && s.k && s.k[3]) {
          let e = 2201 + s.k[3];
          t.bG(2200, 2299, !1), t.bG(e, e, !0);
        }
        let d = !1;
        n && n.k && n.k[0] && (d = 0 != (512 & n.h));
        let b,
          g = !1,
          _ = !1;
        if (s && s.k && s.k[2]) {
          (_ = !0),
            t.bG(501, 599, !1),
            t.bG(902, 999, !1),
            t.bG(1100, 1199, !1),
            t.bG(1300, 1399, !1);
          let e = 1301 + s.k[2];
          t.bG(e, e, !0);
        } else if (a && a.k && a.k[2]) {
          (g = !0),
            t.bG(501, 599, !1),
            t.bG(902, 999, !1),
            t.bG(1100, 1199, !1),
            t.bG(1300, 1399, !1);
          let e = 1301 + a.k[2];
          t.bG(e, e, !0);
        } else if (o && o.k && o.k[0]) {
          t.bG(501, 599, !1), t.bG(901, 901, !0);
          let e = 501 + o.k[0];
          t.bG(e, e, !0);
        } else {
          let e;
          (e = a && a.k && a.k[1] ? 901 + a.k[1] : 901), t.bG(e, e, !0);
        }
        (b =
          o && o.k && o.k[1]
            ? 2e3 + o.k[1]
            : o && 0 == (1048576 & o.h)
            ? 2002
            : 2001),
          t.bG(2001, 2099, !1),
          t.bG(b, b, !0);
        let p = !1,
          m = _ || g;
        if (!m && u && u.k && u.k[0]) {
          let e;
          (p = !1),
            d ? ((p = !0), (e = 1203)) : ((p = !0), (e = 1201 + u.k[0])),
            t.bG(e, e, !0);
        } else
          16 & f &&
            (t.bG(1201, 1201, !0), m || (t.bG(1202, 1202, !0), (p = !0)));
        if (!p && !_)
          if (s && s.k && s.k[1]) {
            let e = 1001 + s.k[1];
            t.bG(e, e, !0);
          } else if (r && r.k && r.k[1]) {
            let e = 1001 + r.k[1];
            t.bG(e, e, !0);
          }
        if (!_ && a && a.k && a.k[0]) {
          let e = a.k[0],
            i = 1101 + e,
            r = this.au.some((t) => t.meshId == i);
          e > 2
            ? (t.bG(1300, 1399, !1), r ? t.bG(i, i, !0) : t.bG(1301, 1301, !0))
            : p || t.bG(i, i, !0);
        }
        if (u && u.k && u.k[0] && this.N.length > 0)
          for (let e of this.N) {
            const i = rr[e];
            if (i && 12 == i.GeosetType && i.Original == u.k[0] + 1) {
              t.bG(1200, 1299, !1);
              let e = 1200 + i.Override;
              t.bG(e, e, !0);
              break;
            }
          }
        if (c && c.k && c.k[0]) {
          t.bG(1500, 1599, !1);
          let e = 1501 + c.k[0];
          if (this.N.length > 0)
            for (let t of this.N) {
              const i = rr[t];
              if (i && 15 == i.GeosetType && i.Original == c.k[0] + 1) {
                e = 1500 + i.Override;
                break;
              }
            }
          t.bG(e, e, !0);
        }
        if (n && n.k && n.k[0]) {
          t.bG(1800, 1899, !1);
          let e = 1801 + n.k[0];
          t.bG(e, e, !0);
        }
        a || _ || g || p || d ? t.bG(1400, 1499, !1) : t.bG(1401, 1401, !0);
        for (const e in this.A) {
          const i = t.A[e];
          i.bG(0, El, !1);
          for (let t = 0; t < i.K.length; t++)
            if ((i.bG(i.K[t], i.K[t], !0), i.L[t] && i.au)) {
              const e = i.K[t];
              if (i.au.some((t) => t.meshId == e)) {
                const e = 100 * t;
                this.bG(e, e + 99, !1);
              }
            }
        }
      }
      bM() {
        let t = !1;
        if (
          (this.y.forEach((e) => {
            if (e.n || e.o) {
              if (e.j)
                for (let i = 0; i < e.j.length; ++i)
                  if (e.j[i].texture && !e.j[i].texture.f())
                    return void (t = !0);
            } else t = !0;
          }),
          t)
        )
          return;
        if (!this.F) return;
        const e = this.F.b.Materials,
          i = this.F.b.TextureLayers,
          r = this.F.b.TextureSections;
        let s = !0,
          n = !0;
        (15 != this.o && 21 != this.o) || (n = !1),
          this.y.forEach((t) => {
            let e = t.e;
            (4 != e && 5 != e && 19 != e) || (s = !1), 7 == e && (n = !1);
          });
        let a = -1;
        if (27 == this.o)
          for (let t of i)
            9 == t.BlendMode &&
              1 == t.TextureType &&
              t.Layer > a &&
              (a = t.Layer);
        const o =
          ((l = (t) => t.TextureType),
          i.reduce((t, e) => {
            var i;
            return (t[(i = l(e))] || (t[i] = [])).push(e), t;
          }, {}));
        var l;
        for (const t in o) {
          const i = o[t],
            l = i[0].TextureType;
          if (!this.aK[t]) {
            const i = e.find((t) => t.TextureType == l);
            if (!i) {
              WH.debug("unable to find material info", l);
              continue;
            }
            this.aK[t] = new Tl(this.aS.context, i.Width, i.Height);
          }
          const h = this.aK[t];
          h.j();
          for (const t of i) {
            let e = -1;
            t.Layer == a && (e = 0);
            const i = this.D[t.ChrModelTextureTargetID];
            if (!i) continue;
            if (!i.e()) return;
            const o = t.TextureSection;
            if ((3 != o && 5 != o) || (s && 3 == o) || (n && 5 == o)) {
              let s = 0,
                n = 0,
                a = 1,
                l = 1;
              if (-1 != o && r) {
                const t = r.find((t) => t.SectionType == o);
                if (!t) {
                  WH.debug("can't find texture section data", o);
                  continue;
                }
                (s = t.X), (n = t.Y), (a = t.Width), (l = t.Height);
              }
              h.k(i, s, n, a, l, t.BlendMode, t.Layer, e);
            }
          }
          1 == l && 52 != this.o && 70 != this.o && this.bN(h),
            26 != l || (52 != this.o && 70 != this.o) || this.bN(h),
            h.l();
        }
        this.x = !1;
        // Friskes Callback //
        if (this.aS.e) this.aS.e();
        // Friskes Callback //
      }
      bN(t) {
        const e = [];
        this.y.forEach((t) => {
          e.push(t);
        }),
          e.sort(function (t, e) {
            return t.f - e.f;
          });
        const i = this.F.b.TextureSections;
        for (let r = 0; r < e.length; r++) {
          const s = e[r];
          if (s.j)
            for (let e = 0; e < s.j.length; e++) {
              const r = s.j[e];
              if (
                r.gender == this.p &&
                r.texture &&
                r.texture.f() &&
                12 != r.region
              ) {
                if (0 != (1 & this.v.Character.ChrModelFlags) && 7 == r.region)
                  continue;
                const e = i.find((t) => t.SectionType == r.region);
                if (!e) {
                  WH.debug("can't find texture section data", r.region);
                  continue;
                }
                const s = new vl();
                (s.a = r.texture),
                  t.k(s, e.X, e.Y, e.Width, e.Height, 0, -1, -1);
              }
            }
        }
      }
      bO() {
        if (!this.d) return;
        let t = (-1 == this.I || !this.I) && null != this.y.get(22),
          e = !(
            (-1 != this.H && this.H) ||
            (null == this.y.get(13) && null == this.y.get(21))
          );
        for (let e of hr) {
          let i = this.as[e];
          i > 0 && i < this.aq.length && this.aq[i].C(t ? "HandsClosed" : "");
        }
        for (let t of ur) {
          let i = this.as[t];
          i > 0 && i < this.aq.length && this.aq[i].C(e ? "HandsClosed" : "");
        }
      }
      bP(t) {
        if ($.isArray(t))
          for (let e = 0; e < t.length; ++e) this.bQ(t[e][0], t[e][1], t[e][2]);
        else for (let e in t) this.bQ(parseInt(e), t[e]);
        this.bO();
      }
      bQ(t, e, i) {
        if (!this.y) return;
        let r = new Yo(this, t, e, this.o, this.p);
        i && r.B(i);
        let s = r.e,
          n = or[t];
        this.y.get(s) && 0 != n
          ? ((r.e = n), this.y.set(n, r))
          : this.y.set(s, r);
      }
      bR(t) {
        var e = this.y.get(t);
        e || ((t = nr[t]), (e = this.y.get(t))), e && (this.y.delete(t), e.y());
      }
      bS(t, e) {
        const i = [],
          r = {
            14: (t) => [0],
            26: (t) => (2 == t.c && 18 == t.d ? [1] : null),
          };
        if (this.aC && this.aD) {
          const s = {
            1: (t) => [11],
            3: (t) => [6, 5],
            22: (t) => {
              var e;
              return (
                (null === (e = r[t.b]) || void 0 === e
                  ? void 0
                  : e.call(r, t)) || [2]
              );
            },
            21: (t) => [1],
            17: (t) => [1],
            15: (t) => [2],
            25: (t) => [1],
            13: (t) => [1],
            14: (t) => [0],
            23: (t) => [2],
            6: (t) => [53],
            26: (t) => [1],
            16: (t) => [57],
            27: (t) => [55],
          };
          if (s[t]) {
            const r = s[t](e);
            for (let s = 0; s < r.length; ++s) {
              let n = r[s];
              (this.H >= 0 || this.I >= 0 || this.j) && fr[t] && (n = fr[t]),
                this.H >= 0 && 21 == t && dr[this.H][t] && (n = dr[this.H][t]),
                this.I >= 0 && 22 == t && dr[this.I][t] && (n = dr[this.I][t]),
                15 == e.g &&
                  this.I >= 0 &&
                  22 == t &&
                  dr[this.I][e.b] &&
                  (n = dr[this.I][e.b]),
                n >= this.aD.length || -1 == this.aD[n] || i.push(this.aD[n]);
            }
          }
        }
        return i;
      }
      bT() {
        var t;
        if (!this.aR) {
          if (this.au) {
            for (let t = 0; t < this.au.length; ++t) this.au[t].K(this);
            this.aM = this.au.concat();
          }
          this.setAnimation(Ml),
            this.bz(!0),
            this.bA(),
            this.bC(),
            (this.d = !0),
            this.bx(),
            this.bO(),
            this.m && this.w.d && this.w.bA(),
            this.n && this.w.d && this.w.bA(),
            this.w && this.w.d && !this.ae && this.w.bL(),
            null === (t = this.e) || void 0 === t || t.call(this);
        }
      }
      bU() {
        this.a && this.a.type && this.a.id && this.bV(this.a.type, this.a.id);
      }
      bV(t, e) {
        let i,
          r = this;
        t == sr.ITEM
          ? (i = "meta/item/")
          : t == sr.HELM
          ? (i = "meta/armor/1/")
          : t == sr.SHOULDER
          ? (i = "meta/armor/3/")
          : t == sr.NPC || t == sr.HUMANOIDNPC
          ? (i = "meta/npc/")
          : t == sr.OBJECT
          ? (i = "meta/object/")
          : t == sr.CHARACTER
          ? (i = "meta/character/")
          : t == sr.ITEMVISUAL && (i = "meta/itemvisual/"),
          i
            ? ((i = this.l.contentPath + i + e + ".json"),
              (function (t) {
                $.getJSON(i)
                  .done(function (e) {
                    r.bX(e, t);
                  })
                  .fail(function (t, e, i) {
                    let r = e + ", " + i;
                    console.log("Model:_load Error loading metadata: " + r);
                  });
              })(t))
            : t == sr.PATH &&
              (this.v || (this.v = {}),
              (i = this.l.contentPath + "mo3/" + e + ".mo3"),
              $.ajax({
                url: i,
                type: "GET",
                dataType: "binary",
                responseType: "arraybuffer",
                processData: !1,
                renderer: this.aS,
                success: function (t) {
                  r.bY(t);
                },
                error: function (t, e, i) {
                  console.log(i);
                },
              }));
      }
      bW(t, e, i) {
        const r = cr[e];
        if (r) {
          const e = i ? 4 : 0;
          return r.slice(2 * t + e, 2 * t + e + 2);
        }
      }
      bX(t, e) {
        var i,
          r,
          s,
          n = this;
        if ((e || (e = n.a.type), n.v || (n.v = t), e == sr.CHARACTER)) {
          let e = this.c ? this.c : t.Model;
          (n.o = t.Character.Race),
            (n.p = t.Character.Gender),
            n.l.cls && (n.q = parseInt(n.l.cls));
          let a =
            n.l.contentPath +
            "meta/charactercustomization/" +
            t.Character.ChrModelId +
            ".json";
          if (
            ($.getJSON(a, function (t) {
              var e, i, r, s;
              if (
                (WH.debug("Got customization data v2", t),
                (n.F = new wl(n, t)),
                null === (e = n.G) || void 0 === e || e.call(n, n.F.b),
                n.F.c(),
                n.r)
              )
                n.setAppearance(n.r);
              else if (
                (null === (i = n.a) || void 0 === i ? void 0 : i.type) !=
                  sr.CHARACTER &&
                n.v.Character.Race > 0 &&
                (null ===
                  (s =
                    null === (r = n.v) || void 0 === r ? void 0 : r.Creature) ||
                void 0 === s
                  ? void 0
                  : s.CreatureCustomizations)
              ) {
                let t = n.F.g(n.v.Creature.CreatureCustomizations);
                n.setAppearance(t);
              } else n.F.f();
              n.x && n.bC();
            }),
            n.v.Creature &&
              n.v.Creature.Texture &&
              (n.aL = this.bB(
                -1,
                Ko.a(null, n.v.TextureFiles[n.v.Creature.Texture], 3, 0, 0)
              )),
            n.bV(sr.PATH, e),
            n.v.Equipment && n.bP(n.v.Equipment),
            n.l.items && n.bP(n.l.items),
            n.l.shouldersOverride &&
              n.setShouldersOverride(n.l.shouldersOverride),
            (null === (i = n.a) || void 0 === i ? void 0 : i.type) !=
              sr.CHARACTER && n.v.Character.Race > 0)
          ) {
            if (
              n.F &&
              (null ===
                (s =
                  null === (r = n.v) || void 0 === r ? void 0 : r.Creature) ||
              void 0 === s
                ? void 0
                : s.CreatureCustomizations)
            ) {
              let t = n.F.g(n.v.Creature.CreatureCustomizations);
              n.r = t;
            }
          } else n.l.charCustomization && (n.r = n.l.charCustomization);
        } else if (e == sr.HELM) {
          let e = 1,
            i = 0,
            r = 1;
          if (
            (n.w && ((e = n.w.o), (i = n.w.p), (r = n.w.q)), t.ComponentModels)
          ) {
            let s = t.ComponentModels[0];
            s &&
              t.ModelFiles &&
              t.ModelFiles[s] &&
              (27 == t.Item.InventoryType
                ? n.bV(sr.PATH, t.ModelFiles[s][0].FileDataId)
                : (n.w ||
                    t.ModelFiles[s].some((t) => t.Race == e) ||
                    (e = t.ModelFiles[s][0].Race),
                  n.bV(sr.PATH, Ko.b(n, t.ModelFiles[s], -1, i, r, e))));
          }
          if (t.Textures)
            for (let e in t.Textures)
              0 != t.Textures[e] &&
                (n.C[parseInt(e)] = new No(n, t.Textures[e]));
        } else if (e == sr.SHOULDER) {
          let e = 1,
            i = 0,
            r = 1;
          if (
            (n.w && ((e = n.w.o), (i = n.w.p), (r = n.w.q)), t.ComponentModels)
          ) {
            let s = t.ComponentModels[0],
              a = t.ComponentModels[1];
            if (1 == n.a.shoulder || (void 0 === n.a.shoulder && s)) {
              if (
                (s &&
                  t.ModelFiles[s] &&
                  n.bV(sr.PATH, Ko.b(n, t.ModelFiles[s], 0, i, r, e)),
                t.Textures)
              )
                for (let e in t.Textures)
                  0 != t.Textures[e] && (n.C[+e] = new No(n, t.Textures[e]));
            } else if (
              (2 == n.a.shoulder || (void 0 === n.a.shoulder && a)) &&
              (a &&
                t.ModelFiles[a] &&
                n.bV(sr.PATH, Ko.b(n, t.ModelFiles[a], 1, i, r, e)),
              t.Textures2)
            )
              for (let e in t.Textures2)
                0 != t.Textures2[e] && (n.C[+e] = new No(n, t.Textures2[e]));
          }
        } else if (e == sr.ITEMVISUAL) n.bV(sr.PATH, t.Equipment[n.b]);
        else if (e == sr.ITEM) {
          let e = 1,
            i = 0,
            r = 1;
          if (
            (n.w && ((e = n.w.o), (i = n.w.p), (r = n.w.q)), t.ComponentModels)
          ) {
            let s = t.ComponentModels[0];
            s &&
              t.ModelFiles &&
              t.ModelFiles[s] &&
              n.bV(sr.PATH, Ko.b(n, t.ModelFiles[s], -1, i, r, e));
          }
          if (t.Textures)
            for (let e in t.Textures)
              0 != t.Textures[e] && (n.C[+e] = new No(n, t.Textures[e]));
        } else {
          if (
            (t.StateKit && this.E.push(new Xo(this, t.StateKit.effects)),
            t.Creature &&
              ((n.O = t.Creature.CreatureGeosetData),
              (n.P = t.Creature.CreatureGeosetDataID)),
            t.Textures)
          )
            for (let e in t.Textures)
              0 != t.Textures[e] && (n.C[+e] = new No(n, t.Textures[e]));
          else if (t.ComponentTextures && n.w) {
            let e = n.w.p;
            for (let i in t.ComponentTextures) {
              let r = t.TextureFiles[t.ComponentTextures[i]];
              for (let t = 0; t < r.length; t++) {
                let s = r[t];
                (s.Gender != e && 3 != s.Gender) ||
                  (n.C[+i] = new No(n, s.FileDataId));
              }
            }
          }
          t.Model
            ? (n.bV(sr.PATH, t.Model),
              e == sr.NPC && n.l.items && !n.w && n.bP(n.l.items))
            : t.Character &&
              t.Character.Race > 0 &&
              ((n.o = t.Character.Race),
              (n.p = t.Character.Gender),
              n.bV(sr.CHARACTER, t.Character.ChrModelId));
        }
      }
      bY(t) {
        if (!t) return void console.error("Bad buffer for DataView");
        let e = this,
          i = new cl(t);
        if (604210112 != i.getUint32())
          return void console.log("Bad magic value");
        if (i.getUint32() < 2e3) return void console.log("Bad version");
        e.ak = i.getUint32();
        var r = i.getUint32(),
          s = i.getUint32(),
          n = i.getUint32(),
          a = i.getUint32(),
          o = i.getUint32(),
          l = i.getUint32(),
          h = i.getUint32(),
          u = i.getUint32(),
          c = i.getUint32(),
          f = i.getUint32(),
          d = i.getUint32(),
          b = i.getUint32(),
          g = i.getUint32(),
          _ = i.getUint32(),
          p = i.getUint32(),
          m = i.getUint32(),
          v = i.getUint32(),
          x = i.getUint32(),
          T = i.getUint32(),
          w = i.getUint32(),
          y = i.getUint32(),
          A = i.getUint32(),
          E = i.getUint32(),
          C = i.getUint32(),
          M = i.getUint32(),
          S = i.getUint32();
        let k = new Uint8Array(t, i.position),
          D = null;
        try {
          D = Do(k);
        } catch (t) {
          return void console.log("Decompression error: " + t);
        }
        if (D.length < S) console.log("Unexpected data size", D.length, S);
        else {
          (i = new cl(D.buffer)), (i.position = r);
          var F = i.getInt32();
          if (F > 0) {
            e.al = new Array(F);
            for (let t = 0; t < F; ++t) e.al[t] = new Er(i);
          }
          i.position = s;
          var R = i.getInt32();
          if (R > 0) {
            e.am = new Array(R);
            for (let t = 0; t < R; ++t) e.am[t] = i.getUint16();
          }
          i.position = n;
          var I = i.getInt32();
          if (I > 0) {
            (e.an = new Array(I)), (e.aX = new Array(I));
            for (let t = 0; t < I; ++t)
              (e.an[t] = i.getUint32()), (e.aX[t] = 0);
          }
          i.position = a;
          var U = i.getInt32();
          if (U > 0) {
            e.ao = new Array(U);
            for (let t = 0; t < U; ++t) e.ao[t] = new Cr(i);
          }
          i.position = o;
          var P = i.getInt32();
          if (P > 0) {
            e.ap = new Array(P);
            for (let t = 0; t < P; ++t) e.ap[t] = i.getInt16();
          }
          i.position = l;
          var O = i.getInt32();
          if (O > 0) {
            e.aq = new Array(O);
            for (let t = 0; t < O; ++t) e.aq[t] = new ls(e, t, i);
            this.aj = new Array(O);
            for (let t = 0; t < O; t++) {
              this.aj[t] = [];
              for (let i = 0; i < O; i++) e.aq[i].e == t && this.aj[t].push(i);
            }
          }
          i.position = h;
          var z = i.getInt32();
          if (z > 0) {
            e.ar = new Array(z);
            for (let t = 0; t < z; ++t) e.ar[t] = i.getInt16();
          }
          i.position = u;
          var B = i.getInt32();
          if (B > 0) {
            e.as = new Array(B);
            for (let t = 0; t < B; ++t) e.as[t] = i.getInt16();
          }
          i.position = c;
          var N = i.getInt32();
          if (N > 0) {
            e.at = new Array(N);
            for (let t = 0; t < N; ++t) e.at[t] = new hs(i);
          }
          i.position = f;
          var G = i.getInt32();
          if (G > 0) {
            e.au = new Array(G);
            for (let t = 0; t < G; ++t) e.au[t] = new Bo(i);
          }
          i.position = d;
          var L = i.getInt32();
          if (L > 0) {
            e.av = new Array(L);
            for (let t = 0; t < L; ++t) e.av[t] = i.getInt16();
          }
          i.position = b;
          var H = i.getInt32();
          if (H > 0) {
            e.aw = new Array(H);
            for (let t = 0; t < H; ++t) e.aw[t] = new Fo(i);
          }
          i.position = g;
          var j = i.getInt32();
          if (j > 0) {
            e.ax = new Array(j);
            for (let t = 0; t < j; ++t) e.ax[t] = new Go(e, t, i);
          }
          i.position = _;
          var V = i.getInt32();
          if (V > 0) {
            e.ay = new Array(V);
            for (let t = 0; t < V; ++t) e.ay[t] = i.getInt16();
          }
          i.position = p;
          var q = i.getInt32();
          if (q > 0) {
            e.az = new Array(q);
            for (let t = 0; t < q; ++t) e.az[t] = new Lo(i);
          }
          i.position = m;
          var W = i.getInt32();
          if (W > 0) {
            e.aA = new Array(W);
            for (let t = 0; t < W; ++t) e.aA[t] = i.getInt16();
          }
          i.position = v;
          var X = i.getInt32();
          if (X > 0) {
            e.aB = new Array(X);
            for (let t = 0; t < X; ++t) e.aB[t] = i.getInt16();
          }
          i.position = x;
          var Z = i.getInt32();
          if (Z > 0) {
            e.aC = new Array(Z);
            for (let t = 0; t < Z; ++t) e.aC[t] = new Ho(i);
          }
          i.position = T;
          var K = i.getInt32();
          if (K > 0) {
            e.aD = new Array(K);
            for (let t = 0; t < K; ++t) e.aD[t] = i.getInt16();
          }
          i.position = w;
          var Y = i.getInt32();
          if (Y > 0) {
            e.aE = new Array(Y);
            for (let t = 0; t < Y; ++t) e.aE[t] = new jo(i);
          }
          i.position = y;
          var J = i.getInt32();
          if (J > 0) {
            e.aF = new Array(J);
            for (let t = 0; t < J; ++t) e.aF[t] = new Vo(i);
          }
          i.position = A;
          var $ = i.getInt32();
          if ($ > 0) {
            e.aG = new Array($);
            for (let t = 0; t < $; ++t) e.aG[t] = i.getInt16();
          }
          i.position = E;
          var Q = i.getInt32();
          if (Q > 0) {
            e.aH = new Array(Q);
            for (let t = 0; t < Q; ++t) e.aH[t] = new hl(e, i);
          }
          i.position = M;
          var tt = i.getInt32();
          if (tt > 0) {
            e.aJ = new Array(tt);
            for (let t = 0; t < tt; ++t)
              (e.aJ[t] = new ul(i)), e.aH[t] && e.aH[t].Y(e.aJ[t]);
          }
          i.position = C;
          var et = i.getInt32();
          if (et > 0) {
            e.aI = new Array(et);
            for (let t = 0; t < et; ++t) e.aI[t] = new pl(e, i);
          }
          e.bT();
        }
      }
      cZ(t) {
        var e = Rr();
        if ((Ir(e, t), this.aH))
          for (var i = 0; i < this.aH.length; i++) this.aH[i].ab(t, e);
        if (this.aI) for (i = 0; i < this.aI.length; i++) this.aI[i].an(t);
      }
      ca(t) {
        let e = null;
        if (!this.aD || !this.aD.length) return null;
        if (t < this.aD.length) e = this.aC[this.aD[t]];
        else
          for (let t = 0; t < this.aD.length; t++) {
            const i = this.aD[t];
            if (-1 != i) {
              e = this.aC[i];
              break;
            }
          }
        return e;
      }
      cb() {
        const t = this;
        if (!t.d) return;
        t.R++;
        let e = t.aS.time - t.Q;
        if ((e > 0 && (t.Q = t.aS.time), this.f && this.S.a && this.S.a.b)) {
          let i = di();
          const r = [4, 119, 233, 242, 348, 526, 527, 544, 545];
          [5, 143, 234, 524, 525, 540, 541, 556, 557].indexOf(this.S.a.b.a) > -1
            ? (i = _i(0, (-5 * e) / 1e3, 0))
            : r.indexOf(this.S.a.b.a) > -1 && (i = _i(0, (-3 * e) / 1e3, 0));
          let s = zi();
          Ki(s, i), this.cZ(s), this.j && this.j.cZ(s);
          for (const t in this.A) {
            this.A[t].cZ(s);
          }
          if (t.B) for (let e = 0; e < t.B.length; e++) this.B[e].cZ(s);
        }
        if (!this.T && t.S.a.a > -1) {
          let t = e;
          for (let e = 0; e < this.aX.length; e++)
            (this.aX[e] += t), this.an[e] > 0 && (this.aX[e] %= this.an[e]);
          this.cc(this.S, t);
        }
        let i,
          r,
          s,
          n = t.au ? t.au.length : 0;
        for (let e = 0; e < n; ++e)
          if (((s = t.au[e]), s.show)) {
            (i = s.p.f), (r = s.p.e);
            for (let e = 0; e < i; ++e) t.al[t.am[r + e]].k = t.R;
          }
        t.aM &&
          t.aM.sort(function (t, e) {
            return t.b != e.b ? t.b - e.b : t.meshId - e.meshId;
          });
        let a = t.aq.length,
          o = t.aT;
        if (t.aq && t.ao) {
          for (let e = 0; e < a; ++e) t.aq[e].t = !1;
          for (let i = 0; i < a; ++i) t.aq[i].E(e);
          if (t.al) {
            let e,
              i,
              r,
              s,
              n = t.al.length,
              a = t.aP,
              l = t.aQ;
            for (let h = 0; h < n; ++h) {
              if (((e = t.al[h]), e.k != t.R)) continue;
              (s = h * 10),
                (o[s] =
                  o[s + 1] =
                  o[s + 2] =
                  o[s + 3] =
                  o[s + 4] =
                  o[s + 5] =
                    0);
              for (let n = 0; n < 4; ++n)
                (r = e.g[n] / 255),
                  r > 0 &&
                    ((i = t.aq[e.h[n]]),
                    Ri(a, e.a, i.m),
                    yr(l, e.b, i.o),
                    (o[s + 0] += a[0] * r),
                    (o[s + 1] += a[1] * r),
                    (o[s + 2] += a[2] * r),
                    (o[s + 3] += l[0] * r),
                    (o[s + 4] += l[1] * r),
                    (o[s + 5] += l[2] * r));
              (e.i[0] = o[s + 0]),
                (e.i[1] = o[s + 1]),
                (e.i[2] = o[s + 2]),
                (e.j[0] = o[s + 3]),
                (e.j[1] = o[s + 4]),
                (e.j[2] = o[s + 5]);
            }
            t.bz(!1), t.ad || ((t.ad = !0), t.bA());
          }
        }
        if (t.j && t.j.d) {
          const e = t.j.aC[t.j.aD[0]],
            i = 1 / t.j.v.Scale;
          mi(t.aO, i, i, i),
            Gi(t.aN),
            qi(t.aN, t.aN, t.aO),
            t.bt(t.j.V, t.j.aq[e.b].m, e.c, t.aN);
        }
        if (t.k && t.k.d) {
          const e = t.aC[t.aD[19]],
            i = t.l.pet.scale || 0.2 / t.k.v.Scale;
          mi(t.aO, i, i, i), Gi(t.aN), qi(t.aN, t.aN, t.aO);
          const r = bi(e.c);
          vi(r, r, t.l.pet.offset || _i(0, -1.25, 0)),
            t.k.bt(t.V, t.aq[e.b].m, r, t.aN);
        }
        er[t.a.id] && !t.w && (Gi(t.V), mi(t.aO, 1, 1, -1), qi(t.V, t.V, t.aO)),
          t.x && t.bM();
      }
      cc(t, e) {
        if (((t.a.c += e), t.b.a < 0 && !this.U && !t.d))
          if (t.a.b.h > -1) {
            let e = 32767 * Math.random(),
              i = 0,
              r = t.a.a,
              s = this.ao[r];
            for (i += s.d; i < e && s.h > -1; )
              (r = s.h), (s = this.ao[r]), (i += s.d);
            (t.b.a = r), (t.b.b = this.ao[r]), (t.b.c = 0);
          } else {
            let e = this.ao.find((e) => e.a == t.a.b.a && 0 == e.b);
            e && ((t.b.a = e.i), (t.b.b = e), (t.b.c = 0));
          }
        let i = t.a,
          r = t.b,
          s = i.b.g - i.c,
          n = 0,
          a = null;
        if (
          (r.a > -1 && ((a = this.ao[r.a]), (n = a.e)),
          n > 0 && s < n ? ((r.c = yl(n - s, a.g)), (t.c = s / n)) : (t.c = 1),
          i.c >= i.b.g)
        )
          if (r.a > -1) {
            if (r.a > -1)
              for (
                ;
                0 == (32 & this.ao[r.a].c) &&
                (64 & this.ao[r.a].c) > 0 &&
                ((r.a = this.ao[r.a].i), (r.b = this.ao[r.a]), !(r.a < 0));

              );
            (t.a = r), (t.b = new Xr()), (t.c = 1);
          } else i.b.g > 0 && (i.c = yl(i.c, i.b.g));
      }
      cd(t) {
        if (this.aR) return;
        var e = this;
        if (
          (this.w ? pr(e.W, this.w.W) : (e.W = _r(1, 1, 1, 1)),
          e.j && e.j.cd(t),
          !e.d)
        )
          return;
        e.k && e.k.cd(t), e.cb(), this.E && this.E.forEach((e) => e.g(t));
        let i = zi();
        ji(i, e.aS.viewMatrix, e.V);
        let r = zi();
        Hi(r, i);
        let s = zi();
        if (
          (Li(s, r),
          (e.aW = {
            uModelMatrix: e.V,
            uViewMatrix: e.aS.viewMatrix,
            uInvTranspViewModelMat: s,
            uProjMatrix: e.aS.projMatrix,
            uCameraPos: e.aS.eye,
            uAmbientColor: e.X,
            uDiffuseColor: e.W,
            uPrimaryColor: e.Y,
            uSecondaryColor: e.Z,
            uLightDir1: e.aa,
            uLightDir2: e.ab,
            uLightDir3: e.ac,
          }),
          e.aU && e.aM)
        )
          for (let i = 0; i < e.aM.length; ++i) e.aM[i].show && e.aM[i].N(t);
        if (e.aH && e.g)
          for (let i = 0; i < e.aH.length; ++i)
            e.aH[i].Z(e.S, e.aS.delta), e.aH[i].aa(t);
        if (e.aI && e.h)
          for (let i = 0; i < e.aI.length; ++i)
            e.aI[i].ar(e.S, e.aS.delta), e.aI[i].av(), e.aI[i].aw(t);
        for (const i in this.A) {
          const r = this.A[i];
          e.bI(r, t);
        }
        if (
          (e.y.forEach((i) => {
            if (i) {
              if (2 == i.c && 13 == i.d) {
                if (21 == i.e && -1 != e.H) return;
                if (22 == i.e && -1 != e.I) return;
              }
              i.D(t);
            }
          }),
          e.z.forEach((e) => {
            e && e.i && e.D(t);
          }),
          e.B)
        )
          for (let i = 0; i < e.B.length; i++) {
            let r = e.B[i];
            if (!r.d) continue;
            let s = e.aD[e.l.extraModels[i][1]];
            if (-1 == s) {
              console.log(
                "invalid extra model attachment",
                e.l.extraModels[i][1]
              );
              continue;
            }
            let n = e.aC[s],
              a = e.l.extraModels[i][2];
            mi(e.aO, a, a, a),
              Gi(e.aN),
              qi(e.aN, e.aN, e.aO),
              Wi(e.aN, e.aN, e.l.extraModels[i][3]),
              Xi(e.aN, e.aN, e.l.extraModels[i][4]),
              Zi(e.aN, e.aN, e.l.extraModels[i][5]),
              r.bt(e.V, e.aq[n.b].m, n.c, e.aN),
              r.cb(),
              r.cd(t);
          }
        e.y.forEach((i) => {
          i && i.r && e.bI(i.r, t);
        });
      }
    }
    const kl = Sl,
      Dl = { 2: "Wowhead", 3: "LolKing", 6: "HeroKing", 7: "DestinyDB" };
    class Fl {
      constructor(t) {
        if (!t.type || !Dl[t.type]) throw "Viewer error: Bad viewer type given";
        if (!t.container) throw "Viewer error: Bad container given";
        if (!t.aspect) throw "Viewer error: Bad aspect ratio given";
        if (!t.contentPath) throw "Viewer error: No content path given";
        console.log("Creating viewer with options", t),
          (this.type = t.type),
          (this.container = t.container),
          (this.aspect = parseFloat(t.aspect)),
          (this.renderer = null),
          (this.options = t);
        const e = this.container.width(),
          i = Math.round(e / this.aspect);
        this.init(e, i);
      }
      destroy() {
        this.renderer && this.renderer.destroy(),
          (this.options = null),
          (this.container = null);
      }
      init(t, e) {
        if (
          void 0 !== typeof window.Uint8Array &&
          void 0 !== typeof window.DataView
        )
          try {
            const t = document.createElement("canvas");
            if (
              !(
                t.getContext("webgl", { alpha: !1 }) ||
                t.getContext("experimental-webgl", { alpha: !1 })
              )
            )
              return void console.log("viewer init failed");
          } catch (t) {
            return void console.log("viewer init failed");
          }
        (this.mode = 1),
          (this.renderer = new Il(this)),
          this.renderer.resize(t, e),
          this.renderer.init();
      }
      setAdaptiveMode(t) {
        this.renderer.setAdaptiveMode(t);
      }
      setZoom(t) {
        this.renderer.zoom.target = t;
      }
      setOffset(t, e) {
        this.renderer.setTranslation(t, e, 0);
      }
      setFullscreen(t) {
        t ? Fl.requestFullscreen(this.renderer.canvas[0]) : Fl.exitFullscreen();
      }
      method(t, e) {
        return (
          void 0 === e && (e = []),
          this.renderer ? this.renderer.method(t, [].concat(e)) : null
        );
      }
      option(t, e) {
        return void 0 !== e && (this.options[t] = e), this.options[t];
      }
      static isFullscreen() {
        return !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        );
      }
      static requestFullscreen(t) {
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          (t.requestFullscreen
            ? t.requestFullscreen()
            : t.webkitRequestFullscreen
            ? t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            : t.mozRequestFullScreen
            ? t.mozRequestFullScreen()
            : t.msRequestFullscreen && t.msRequestFullscreen());
      }
      static exitFullscreen() {
        (document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement) &&
          (document.exitFullscreen
            ? document.exitFullscreen()
            : document.webkitExitFullscreen
            ? document.webkitExitFullscreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.msExitFullscreen && document.msExitFullscreen());
      }
    }
    const Rl = Fl;
    const Il = class {
      constructor(t) {
        (this.currFrame = 0),
          (this.clearColor = _i(0, 0, 0)),
          (this.addedCss = !1),
          (this.progressShown = !1),
          (this.attributeState = new li()),
          (this.onContextMenu = function (t) {
            return !1;
          });
        var e = this;
        (e.viewer = t),
          (e.options = t.options),
          (e.downloads = {}),
          (e.context = null),
          (e.width = 0),
          (e.height = 0),
          (e.time = 0),
          (e.delta = 0),
          (e.models = []),
          (e.screenshotDataURL = null),
          (e.makeDataURL = !1),
          (e.screenshotCallback = null),
          (e.azimuth = 1.5 * Math.PI),
          (e.zenith = Math.PI / 2),
          (e.distance = 15),
          (e.fov = 30),
          (e.zoom = {
            rateStep: 0.1,
            rateAccelerationDecay: 0.4,
            interpolationRate: 0.3,
            range: [0.3, 4],
            rateCurrent: 0,
            target: 1,
            current: 1,
          }),
          (e.zoom.range = e.zoom.range.map(function (t) {
            return Math.log(t) / Math.log(1 + e.zoom.rateStep);
          })),
          (e.translation = _i(0, 0, 0)),
          (e.target = _i(0, 0, 0)),
          (e.eye = _i(0, 0, 0)),
          (e.up = _i(0, 0, 1)),
          (e.lookDir = di()),
          (e.fullscreen = !1),
          (e.projMatrix = zi()),
          (e.viewMatrix = zi()),
          (e.panningMatrix = zi()),
          (e.viewOffset = di()),
          (e.aniFilterExt = null),
          (e.aniFilterMax = 0),
          this.addedCss ||
            ((this.addedCss = !0),
            $("head").append(
              '<link rel="stylesheet" href="//wow.zamimg.com/modelviewer/live/viewer/viewer.css" type="text/css" />'
            ));
      }
      updateProgress() {
        if (!this.stop) {
          var t = this,
            e = 0,
            i = 0;
          for (var r in t.downloads)
            (e += t.downloads[r].total), (i += t.downloads[r].loaded);
          if (e <= 0)
            t.progressShown &&
              (t.progressBg.hide(),
              t.progressBar.hide(),
              (t.progressShown = !1));
          else {
            t.progressShown ||
              (t.progressBg.show(),
              t.progressBar.show(),
              (t.progressShown = !0));
            var s = i / e;
            t.progressBar.width(Math.round(t.width * s) + "px");
          }
        }
      }
      destroy() {
        var t = this;
        if (
          ((t.stop = !0),
          t.canvas &&
            (t.canvas.detach(),
            t.progressBg.detach(),
            t.progressBar.detach(),
            t.canvas
              .off("mousedown touchstart", t.onMouseDown)
              .off("DOMMouseScroll", t.onMouseScroll)
              .off("mousewheel", t.onMouseWheel)
              .off("dblclick", t.onDoubleClick)
              .off("contextmenu", t.onContextMenu),
            $(window).off("resize", t.onFullscreen),
            $(document)
              .off("mouseup touchend", t.onMouseUp)
              .off("mousemove touchmove", t.onMouseMove),
            (t.canvas = t.progressBg = t.progressBar = null)),
          t.context)
        ) {
          var e = t.context;
          t.bgTexture && e.deleteTexture(t.bgTexture),
            (t.bgTexture = null),
            t.program && e.deleteProgram(t.program),
            (t.program = null),
            t.vb && e.deleteBuffer(t.vb),
            t.vs && e.deleteShader(t.vs),
            t.fs && e.deleteShader(t.fs),
            (t.vb = t.vs = t.fs = null);
        }
        t.bgImg && (t.bgImg = null);
        for (var i = 0; i < t.models.length; ++i)
          t.models[i].ba(), (t.models[i] = null);
        t.models = [];
      }
      method(t, e) {
        if (this.models.length > 0 && this.models[0]) {
          const i = this.models[0][t];
          return i
            ? i.apply(this.models[0], e)
            : void WH.debug("Unknown viewer method", t, "args", e);
        }
      }
      getTime() {
        return window.performance && window.performance.now
          ? window.performance.now()
          : Date.now();
      }
      draw(t) {
        var e,
          i = this,
          r = i.context;
        (i.delta = 0.001 * (t - i.time)),
          (i.time = t),
          i.currFrame++,
          i.updateCamera(),
          r.bindFramebuffer(r.FRAMEBUFFER, null),
          r.viewport(0, 0, i.width, i.height),
          r.clearColor(
            this.clearColor[0],
            this.clearColor[1],
            this.clearColor[2],
            0
          ),
          r.clear(r.COLOR_BUFFER_BIT | r.DEPTH_BUFFER_BIT),
          i.bgTexture &&
            i.program &&
            (r.useProgram(i.program),
            r.activeTexture(r.TEXTURE0),
            r.bindTexture(r.TEXTURE_2D, i.bgTexture),
            r.uniform1i(i.uTexture, 0),
            r.bindBuffer(r.ARRAY_BUFFER, i.vb),
            r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, null),
            r.enableVertexAttribArray(i.aPosition),
            r.vertexAttribPointer(i.aPosition, 2, r.FLOAT, !1, 16, 0),
            r.enableVertexAttribArray(i.aTexCoord),
            r.vertexAttribPointer(i.aTexCoord, 2, r.FLOAT, !1, 16, 8),
            r.depthMask(!1),
            r.disable(r.CULL_FACE),
            r.blendFunc(r.ONE, r.ZERO),
            r.drawArrays(r.TRIANGLE_STRIP, 0, 4),
            r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA),
            r.enable(r.CULL_FACE),
            r.depthMask(!0),
            r.disableVertexAttribArray(i.aPosition),
            r.disableVertexAttribArray(i.aTexCoord));
        let s = new Array();
        for (e = 0; e < i.models.length; ++e) i.models[e].cd(s);
        s.sort((t, e) => {
          let i = t.e > 1,
            r = e.e > 1;
          return i > r
            ? 1
            : i < r
            ? -1
            : t.m != e.m
            ? e.m > t.m
              ? -1
              : 1
            : t.n > e.n
            ? -1
            : t.n < e.n
            ? 1
            : e.o != t.o
            ? e.o < t.o
              ? 1
              : -1
            : e.e != t.e
            ? t.e < e.e
              ? -1
              : 1
            : 0;
        }),
          r.viewport(0, 0, i.width, i.height),
          this.attributeState.disableAll(),
          s.forEach((t) => {
            r.useProgram(t.a.program),
              r.bindBuffer(r.ARRAY_BUFFER, t.c),
              r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t.d),
              this.attributeState.enable(r, t.a.attributes),
              Xe(t.a, t.b),
              t.h ? r.enable(r.CULL_FACE) : r.disable(r.CULL_FACE),
              t.i ? r.frontFace(r.CCW) : r.frontFace(r.CW),
              this.setBlendMode(r, t.e),
              r.depthMask(t.f),
              r.drawElements(t.j, t.k, r.UNSIGNED_SHORT, t.l);
          }),
          this.attributeState.disableAll();
      }
      setAdaptiveMode(t) {
        (this.addaptiveMode = t), t && $(window).trigger("resize");
      }
      setTranslation(t, e, i) {
        this.translation = _i(t, e, i);
      }
      setBlendMode(t, e) {
        switch (
          (0 == e
            ? t.disable(t.BLEND)
            : (t.enable(t.BLEND), t.blendEquation(t.FUNC_ADD)),
          e)
        ) {
          case 0:
            break;
          case 1:
            t.blendFuncSeparate(t.ONE, t.ZERO, t.ONE, t.ONE);
            break;
          case 2:
            t.blendFuncSeparate(
              t.SRC_ALPHA,
              t.ONE_MINUS_SRC_ALPHA,
              t.ONE,
              t.ONE
            );
            break;
          case 3:
            t.blendFuncSeparate(t.SRC_ALPHA, t.ONE, t.ONE, t.ONE);
            break;
          case 4:
            t.blendFuncSeparate(t.DST_COLOR, t.ZERO, t.ONE, t.ONE);
            break;
          case 5:
            t.blendFuncSeparate(t.DST_COLOR, t.SRC_COLOR, t.ONE, t.ONE);
            break;
          case 6:
            t.blendFuncSeparate(t.DST_COLOR, t.ONE, t.ONE, t.ONE);
            break;
          case 10:
            t.blendFunc(t.ONE, t.ONE);
            break;
          case 7:
            t.blendFuncSeparate(t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE, t.ONE);
            break;
          case 8:
            t.blendFuncSeparate(t.ONE_MINUS_SRC_ALPHA, t.ZERO, t.ONE, t.ONE);
            break;
          case 13:
            t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE);
            break;
          default:
            throw 3735927486;
        }
      }
      updateCamera() {
        var t = this;
        (t.zoom.target += t.zoom.rateCurrent),
          (t.zoom.rateCurrent *= 1 - t.zoom.rateAccelerationDecay),
          (t.zoom.target = -Math.max(
            Math.min(-t.zoom.target, t.zoom.range[1]),
            t.zoom.range[0]
          )),
          (t.zoom.current +=
            (t.zoom.target - t.zoom.current) * t.zoom.interpolationRate);
        var e = t.distance * Math.pow(t.zoom.rateStep + 1, -t.zoom.current),
          i = t.azimuth,
          r = t.zenith;
        1 == t.up[2]
          ? ((t.eye[0] = -e * Math.sin(r) * Math.cos(i) + t.target[0]),
            (t.eye[1] = -e * Math.sin(r) * Math.sin(i) + t.target[1]),
            (t.eye[2] = -e * Math.cos(r) + t.target[2]))
          : ((t.eye[0] = -e * Math.sin(r) * Math.cos(i) + t.target[0]),
            (t.eye[1] = -e * Math.cos(r) + t.target[1]),
            (t.eye[2] = -e * Math.sin(r) * Math.sin(i) + t.target[2])),
          xi(t.lookDir, t.target, t.eye),
          Si(t.lookDir, t.lookDir),
          (function (t, e, i, r) {
            var s,
              n,
              a,
              o,
              l,
              h,
              u,
              c,
              f,
              d,
              b = e[0],
              g = e[1],
              _ = e[2],
              p = r[0],
              m = r[1],
              v = r[2],
              x = i[0],
              T = i[1],
              w = i[2];
            Math.abs(b - x) < ci && Math.abs(g - T) < ci && Math.abs(_ - w) < ci
              ? Gi(t)
              : ((u = b - x),
                (c = g - T),
                (f = _ - w),
                (s = m * (f *= d = 1 / Math.hypot(u, c, f)) - v * (c *= d)),
                (n = v * (u *= d) - p * f),
                (a = p * c - m * u),
                (d = Math.hypot(s, n, a))
                  ? ((s *= d = 1 / d), (n *= d), (a *= d))
                  : ((s = 0), (n = 0), (a = 0)),
                (o = c * a - f * n),
                (l = f * s - u * a),
                (h = u * n - c * s),
                (d = Math.hypot(o, l, h))
                  ? ((o *= d = 1 / d), (l *= d), (h *= d))
                  : ((o = 0), (l = 0), (h = 0)),
                (t[0] = s),
                (t[1] = o),
                (t[2] = u),
                (t[3] = 0),
                (t[4] = n),
                (t[5] = l),
                (t[6] = c),
                (t[7] = 0),
                (t[8] = a),
                (t[9] = h),
                (t[10] = f),
                (t[11] = 0),
                (t[12] = -(s * b + n * g + a * _)),
                (t[13] = -(o * b + l * g + h * _)),
                (t[14] = -(u * b + c * g + f * _)),
                (t[15] = 1));
          })(t.viewMatrix, t.eye, t.target, t.up),
          Gi(t.panningMatrix),
          1 == t.up[2]
            ? mi(t.viewOffset, t.translation[0], -t.translation[1], 0)
            : mi(t.viewOffset, t.translation[0], 0, t.translation[1]),
          Vi(t.panningMatrix, t.panningMatrix, t.viewOffset),
          ji(t.viewMatrix, t.panningMatrix, t.viewMatrix);
      }
      init() {
        var t,
          e = this,
          i = e.context;
        (this.blackPixelTexture = i.createTexture()),
          i.bindTexture(i.TEXTURE_2D, this.blackPixelTexture),
          i.texImage2D(
            i.TEXTURE_2D,
            0,
            i.RGBA,
            1,
            1,
            0,
            i.RGBA,
            i.UNSIGNED_BYTE,
            new Uint8Array([0, 0, 0, 255])
          ),
          i.bindTexture(i.TEXTURE_2D, null),
          (this.greenPixelTexture = i.createTexture()),
          i.bindTexture(i.TEXTURE_2D, this.greenPixelTexture),
          i.texImage2D(
            i.TEXTURE_2D,
            0,
            i.RGBA,
            1,
            1,
            0,
            i.RGBA,
            i.UNSIGNED_BYTE,
            new Uint8Array([0, 255, 0, 255])
          ),
          i.bindTexture(i.TEXTURE_2D, null),
          Qi(e.projMatrix, 0.0174532925 * e.fov, e.viewer.aspect, 0.1, 5e3),
          e.updateCamera(),
          i.clearColor(
            this.clearColor[0],
            this.clearColor[1],
            this.clearColor[2],
            0
          ),
          i.enable(i.DEPTH_TEST),
          i.depthFunc(i.LEQUAL),
          i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA),
          i.enable(i.BLEND);
        var r = null;
        if (2 === e.viewer.type) r = kl;
        if ((e.options.models || e.options.items) && r) {
          var s = [].concat(e.options.models);
          if (s.length > 0)
            for (t = 0; t < s.length; ++t)
              e.models.push(new r(e, e.options, s[t], t, !0, !1, !1));
        }
        !(function t() {
          if (!e.stop) {
            window.requestAnimationFrame(t);
            var r = e.getTime();
            if (!1 !== e.makeDataURL) {
              if (e.canvas[0].toDataURL) {
                var s = e.clearColor,
                  n = e.bgTexture;
                e.options.transparent &&
                  ((e.bgTexture = null), (e.clearColor = _i(0, 0, 0))),
                  e.draw(r);
                var a = e.width * e.height * 4,
                  o = new Uint8Array(a);
                i.readPixels(
                  0,
                  0,
                  e.width,
                  e.height,
                  i.RGBA,
                  i.UNSIGNED_BYTE,
                  o
                );
                let t = null;
                e.options.transparent
                  ? ((e.clearColor = _i(1, 1, 1)),
                    e.draw(r),
                    (t = new Uint8Array(a)),
                    i.readPixels(
                      0,
                      0,
                      e.width,
                      e.height,
                      i.RGBA,
                      i.UNSIGNED_BYTE,
                      t
                    ))
                  : (t = o);
                for (
                  var l = new Uint8Array(a), h = 0, u = e.height - 1;
                  u >= 0;
                  u--
                )
                  for (var c = 0; c < e.width; c++) {
                    var f = 4 * (u * e.width + c),
                      d = 255 - (t[h + 0] - o[h + 0]),
                      b = o[h + 0],
                      g = o[h + 1],
                      _ = o[h + 2];
                    o[h + 3];
                    (l[f + 0] = b),
                      (l[f + 1] = g),
                      (l[f + 2] = _),
                      (l[f + 3] = d),
                      (h += 4);
                  }
                var p = document.createElement("canvas"),
                  m = p.getContext("2d");
                (p.width = e.width), (p.height = e.height);
                var v = m.createImageData(e.width, e.height);
                v.data.set(l),
                  m.putImageData(v, 0, 0),
                  (e.screenshotDataURL = p.toDataURL.apply(p, e.makeDataURL)),
                  e.screenshotCallback &&
                    (e.screenshotCallback(), (e.screenshotCallback = null)),
                  (e.clearColor = s),
                  (e.bgTexture = n);
              }
              e.makeDataURL = !1;
            }
            e.draw(r);
          }
        })();
      }
      onDoubleClick(t) {
        Rl.isFullscreen()
          ? Rl.exitFullscreen()
          : Rl.requestFullscreen(this.canvas[0]);
      }
      onFullscreen(t) {
        let e = this;
        if (e.viewer.container)
          if ((!e.fullscreen && Rl.isFullscreen()) || this.addaptiveMode) {
            if (
              ((e.restoreWidth = e.width),
              (e.restoreHeight = e.height),
              (e.fullscreen = !0),
              Rl.isFullscreen())
            ) {
              var i = $(window);
              let t = window.screen.width || i.width(),
                e = window.screen.height || i.height();
              this.onResize(t, e, t / e);
            } else if (this.addaptiveMode) {
              var r = e.viewer.container;
              this.onResize(r.width(), r.height(), r.width() / r.height());
            }
          } else
            e.fullscreen &&
              !Rl.isFullscreen() &&
              ((e.fullscreen = !1),
              this.onResize(e.restoreWidth, e.restoreHeight, e.viewer.aspect));
      }
      onResize(t, e, i) {
        this.resize(t, e),
          Qi(this.projMatrix, 0.0174532925 * this.fov, i, 0.1, 5e3);
      }
      onMouseDown(t) {
        let e = this;
        3 == t.which || t.ctrlKey
          ? (e.rightMouseDown = !0)
          : (e.mouseDown = !0),
          "touchstart" == t.type
            ? ((e.mouseX = t.originalEvent.touches[0].clientX),
              (e.mouseY = t.originalEvent.touches[0].clientY))
            : ((e.mouseX = t.clientX), (e.mouseY = t.clientY)),
          $("body").addClass("unselectable");
      }
      onMouseScroll(t) {
        return (
          (this.zoom.rateCurrent += t.originalEvent.detail > 0 ? 1 : -1),
          t.preventDefault(),
          !1
        );
      }
      onMouseWheel(t) {
        if (
          !this.options.wheelEventValidation ||
          this.options.wheelEventValidation.call(this, t)
        )
          return (
            (this.zoom.rateCurrent += t.originalEvent.wheelDelta > 0 ? 1 : -1),
            t.preventDefault(),
            !1
          );
      }
      onMouseUp(t) {
        let e = this;
        (e.mouseDown || e.rightMouseDown) &&
          ($("body").removeClass("unselectable"),
          (e.mouseDown = !1),
          (e.rightMouseDown = !1));
      }
      onMouseMove(t) {
        let e = this;
        if ((e.mouseDown || e.rightMouseDown) && void 0 !== e.mouseX) {
          var i, r;
          "touchmove" == t.type
            ? (t.preventDefault(),
              (i = t.originalEvent.touches[0].clientX),
              (r = t.originalEvent.touches[0].clientY))
            : ((i = t.clientX), (r = t.clientY));
          var s = ((i - e.mouseX) / e.width) * Math.PI * 2,
            n = ((r - e.mouseY) / e.width) * Math.PI * 2;
          if (e.mouseDown) {
            1 == e.up[2] ? (e.azimuth -= s) : (e.azimuth += s), (e.zenith += n);
            for (var a = 2 * Math.PI; e.azimuth < 0; ) e.azimuth += a;
            for (; e.azimuth > a; ) e.azimuth -= a;
            e.zenith < 1e-4 && (e.zenith = 1e-4),
              e.zenith >= Math.PI && (e.zenith = Math.PI - 1e-4);
          } else (e.translation[0] += s), (e.translation[1] += n);
          (e.mouseX = i), (e.mouseY = r);
        }
      }
      resize(t, e) {
        var i = this;
        if (i.width !== t || i.height !== e) {
          if (
            (i.fullscreen ||
              i.viewer.container.css({
                height: e + "px",
                position: "relative",
              }),
            (i.width = t),
            (i.height = e),
            i.canvas)
          )
            i.canvas.attr({ width: t, height: e }),
              i.canvas.css({ width: t + "px", height: e + "px" }),
              i.context.viewport(0, 0, i.width, i.height);
          else {
            if (
              ((i.canvas = $("<canvas/>")),
              i.canvas.attr({ width: t, height: e }),
              i.viewer.container.append(i.canvas),
              (i.context =
                i.canvas[0].getContext("webgl", {
                  alpha: !0,
                  premultipliedAlpha: !1,
                }) ||
                i.canvas[0].getContext("experimental-webgl", {
                  alpha: !0,
                  premultipliedAlpha: !1,
                })),
              (i.progressBg = $("<div/>", {
                css: {
                  display: "none",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "10px",
                  backgroundColor: "#000",
                },
              })),
              (i.progressBar = $("<div/>", {
                css: {
                  display: "none",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: "10px",
                  backgroundColor: "#ccc",
                },
              })),
              i.viewer.container.append(i.progressBg),
              i.viewer.container.append(i.progressBar),
              !i.context)
            )
              return (
                alert(
                  "No WebGL support, sorry! You should totally use Chrome."
                ),
                i.canvas.detach(),
                void (i.canvas = null)
              );
            const r =
              i.context.getExtension("EXT_texture_filter_anisotropic") ||
              i.context.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
              i.context.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            r
              ? ((i.aniFilterExt = r),
                (i.aniFilterMax = i.context.getParameter(
                  r.MAX_TEXTURE_MAX_ANISOTROPY_EXT
                )),
                WH.debug("Texture anisotropy enabled", i.aniFilterMax))
              : WH.debug("Texture anisotropy disabled (not supported)"),
              i.canvas
                .on("mousedown touchstart", i.onMouseDown.bind(i))
                .on("DOMMouseScroll", i.onMouseScroll.bind(i))
                .on("mousewheel", i.onMouseWheel.bind(i))
                .on("dblclick", i.onDoubleClick.bind(i))
                .on("contextmenu", i.onContextMenu.bind(i)),
              $(window).on("resize", i.onFullscreen.bind(i)),
              $(document)
                .on("mouseup touchend", i.onMouseUp.bind(i))
                .on("mousemove touchmove", i.onMouseMove.bind(i)),
              i.onFullscreen(null);
          }
          i.options.background && i.loadBackground();
        }
      }
      loadBackground() {
        var t = this,
          e = t.context;
        const i = function () {
            (t.vb = e.createBuffer()),
              e.bindBuffer(e.ARRAY_BUFFER, t.vb),
              e.bufferData(
                e.ARRAY_BUFFER,
                new Float32Array(16),
                e.DYNAMIC_DRAW
              );
            var i = t.compileShader(
                e.VERTEX_SHADER,
                "    attribute vec2 aPosition;    attribute vec2 aTexCoord;        varying vec2 vTexCoord;        void main(void) {        vTexCoord = aTexCoord;        gl_Position = vec4(aPosition, 0, 1);    }    "
              ),
              r = t.compileShader(
                e.FRAGMENT_SHADER,
                "    precision mediump float;    varying vec2 vTexCoord;        uniform sampler2D uTexture;        void main(void) {        gl_FragColor = texture2D(uTexture, vTexCoord);    }    "
              ),
              s = e.createProgram();
            e.attachShader(s, i),
              e.attachShader(s, r),
              e.linkProgram(s),
              e.getProgramParameter(s, e.LINK_STATUS)
                ? ((t.vs = i),
                  (t.fs = r),
                  (t.program = s),
                  (t.uTexture = e.getUniformLocation(s, "uTexture")),
                  (t.aPosition = e.getAttribLocation(s, "aPosition")),
                  (t.aTexCoord = e.getAttribLocation(s, "aTexCoord")))
                : console.error("Error linking shaders");
          },
          r = function () {
            var i = t.width / t.bgImg.width,
              r = t.height / t.bgImg.height;
            const s = [-1, -1, 0, r, 1, -1, i, r, -1, 1, 0, 0, 1, 1, i, 0];
            e.bindBuffer(e.ARRAY_BUFFER, t.vb),
              e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(s));
          };
        t.bgImg
          ? t.bgImg.loaded && (t.vb || i(), r())
          : ((t.bgImg = new Image()),
            (t.bgImg.crossOrigin = ""),
            (t.bgImg.onload = function () {
              var s;
              null === (s = t.bgImg) || void 0 === s || (s.loaded = !0),
                (t.bgTexture = e.createTexture()),
                e.bindTexture(e.TEXTURE_2D, t.bgTexture),
                e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  e.RGBA,
                  e.RGBA,
                  e.UNSIGNED_BYTE,
                  t.bgImg
                ),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                t.vb || i(),
                r();
            }),
            (t.bgImg.onerror = function () {
              t.bgImg = null;
            }),
            (t.bgImg.src = t.options.contentPath + t.options.background));
      }
      compileShader(t, e) {
        var i = this.context,
          r = i.createShader(t);
        if (
          (i.shaderSource(r, e),
          i.compileShader(r),
          !i.getShaderParameter(r, i.COMPILE_STATUS))
        )
          throw "Shader compile error: " + i.getShaderInfoLog(r);
        return r;
      }
    };
    let Ul = { Types: sr };
    const Pl = Object.assign(Rl, {
      Tools: ui,
      WebGL: Il,
      WEBGL: 1,
      WOW: 2,
      FLASH: 2,
      Wow: Ul,
    });
    window.ZamModelViewer = Pl;
  })();
})();
