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
                        n = t.url,
                        s = t.type,
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
                        r.open(s, n, !0),
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
    var n = e[r];
    if (void 0 !== n) return n.exports;
    var s = (e[r] = { exports: {} });
    return t[r](s, s.exports, i), s.exports;
  }
  (() => {
    "use strict";
    i(287);
    let t = Float32Array;
    function e(e, i, r) {
      const n = new t(3);
      return e && (n[0] = e), i && (n[1] = i), r && (n[2] = r), n;
    }
    function r(e, i, r) {
      return (
        ((r = r || new t(3))[0] = e[0] + i[0]),
        (r[1] = e[1] + i[1]),
        (r[2] = e[2] + i[2]),
        r
      );
    }
    function n(e, i, r) {
      return (
        ((r = r || new t(3))[0] = e[0] * i[0]),
        (r[1] = e[1] * i[1]),
        (r[2] = e[2] * i[2]),
        r
      );
    }
    let s = Float32Array;
    function a(t) {
      return (
        ((t = t || new s(16))[0] = 1),
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
      e = e || new s(16);
      const i = t[0],
        r = t[1],
        n = t[2],
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
        E = n * m,
        C = p * a,
        S = n * b,
        M = d * a,
        D = n * u,
        k = h * a,
        F = c * _,
        R = g * f,
        I = o * _,
        U = g * l,
        P = o * f,
        z = c * l,
        O = i * _,
        B = g * r,
        N = i * f,
        L = c * r,
        H = i * l,
        G = o * r,
        V = v * l + w * f + y * _ - (x * l + T * f + A * _),
        j = x * r + E * f + M * _ - (v * r + C * f + S * _),
        q = T * r + C * l + D * _ - (w * r + E * l + k * _),
        Y = A * r + S * l + k * f - (y * r + M * l + D * f),
        W = 1 / (i * V + o * j + c * q + g * Y);
      return (
        (e[0] = W * V),
        (e[1] = W * j),
        (e[2] = W * q),
        (e[3] = W * Y),
        (e[4] = W * (x * o + T * c + A * g - (v * o + w * c + y * g))),
        (e[5] = W * (v * i + C * c + S * g - (x * i + E * c + M * g))),
        (e[6] = W * (w * i + E * o + k * g - (T * i + C * o + D * g))),
        (e[7] = W * (y * i + M * o + D * c - (A * i + S * o + k * c))),
        (e[8] = W * (F * u + U * b + P * m - (R * u + I * b + z * m))),
        (e[9] = W * (R * a + O * b + L * m - (F * a + B * b + N * m))),
        (e[10] = W * (I * a + B * u + H * m - (U * a + O * u + G * m))),
        (e[11] = W * (z * a + N * u + G * b - (P * a + L * u + H * b))),
        (e[12] = W * (I * d + z * p + R * h - (P * p + F * h + U * d))),
        (e[13] = W * (N * p + F * n + B * d - (O * d + L * p + R * n))),
        (e[14] = W * (O * h + G * p + U * n - (H * p + I * n + B * h))),
        (e[15] = W * (H * d + P * n + L * h - (N * h + G * d + z * n))),
        e
      );
    }
    function l(t, i, r) {
      r = r || e();
      const n = i[0],
        s = i[1],
        a = i[2],
        o = n * t[3] + s * t[7] + a * t[11] + t[15];
      return (
        (r[0] = (n * t[0] + s * t[4] + a * t[8] + t[12]) / o),
        (r[1] = (n * t[1] + s * t[5] + a * t[9] + t[13]) / o),
        (r[2] = (n * t[2] + s * t[6] + a * t[10] + t[14]) / o),
        r
      );
    }
    function h(t, i, r) {
      r = r || e();
      const n = i[0],
        s = i[1],
        a = i[2];
      return (
        (r[0] = n * t[0] + s * t[4] + a * t[8]),
        (r[1] = n * t[1] + s * t[5] + a * t[9]),
        (r[2] = n * t[2] + s * t[6] + a * t[10]),
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
        (t[5121] = Uint8Array),
        (t[5122] = Int16Array),
        (t[5123] = Uint16Array),
        (t[b] = Int32Array),
        (t[5125] = Uint32Array),
        (t[5126] = Float32Array),
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
    const x =
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
    function T(...t) {
      console.error(...t);
    }
    function w(t, e) {
      return "undefined" != typeof WebGLTexture && e instanceof WebGLTexture;
    }
    const y = 34962,
      A = { attribPrefix: "" };
    function E(t, e, i, r, n) {
      t.bindBuffer(e, i), t.bufferData(e, r, n || 35044);
    }
    function C(t, e, i, r) {
      if (
        ((n = e), "undefined" != typeof WebGLBuffer && n instanceof WebGLBuffer)
      )
        return e;
      var n;
      i = i || y;
      const s = t.createBuffer();
      return E(t, i, s, e, r), s;
    }
    function S(t) {
      return "indices" === t;
    }
    function M(t) {
      return t.length ? t : t.data;
    }
    const D = /coord|texture/i,
      k = /color|colour/i;
    function F(t, e) {
      let i;
      if (((i = D.test(t) ? 2 : k.test(t) ? 4 : 3), e % i > 0))
        throw new Error(
          `Can not guess numComponents for attribute '${t}'. Tried ${i} but ${e} values is not evenly divisible by ${i}. You should specify it.`
        );
      return i;
    }
    function R(t, e) {
      return t.numComponents || t.size || F(e, M(t).length);
    }
    function I(t, e) {
      if (x(t)) return t;
      if (x(t.data)) return t.data;
      Array.isArray(t) && (t = { data: t });
      let i = t.type;
      return i || (i = S(e) ? Uint16Array : Float32Array), new i(t.data);
    }
    function U(t, e) {
      const i = {};
      return (
        Object.keys(e).forEach(function (r) {
          if (!S(r)) {
            const s = e[r],
              a = s.attrib || s.name || s.attribName || A.attribPrefix + r;
            if (s.value) {
              if (!Array.isArray(s.value) && !x(s.value))
                throw new Error("array.value is not array or typedarray");
              i[a] = { value: s.value };
            } else {
              let e, o, l, h;
              if (s.buffer && s.buffer instanceof WebGLBuffer)
                (e = s.buffer),
                  (h = s.numComponents || s.size),
                  (o = s.type),
                  (l = s.normalize);
              else if ("number" == typeof s || "number" == typeof s.data) {
                const i = s.data || s,
                  a = s.type || Float32Array,
                  u = i * a.BYTES_PER_ELEMENT;
                (o = v(a)),
                  (l =
                    void 0 !== s.normalize
                      ? s.normalize
                      : (n = a) === Int8Array || n === Uint8Array),
                  (h = s.numComponents || s.size || F(r, i)),
                  (e = t.createBuffer()),
                  t.bindBuffer(y, e),
                  t.bufferData(y, u, s.drawType || 35044);
              } else {
                const i = I(s, r);
                (e = C(t, i, void 0, s.drawType)),
                  (o = m(i)),
                  (l =
                    void 0 !== s.normalize
                      ? s.normalize
                      : (function (t) {
                          return (
                            t instanceof Int8Array || t instanceof Uint8Array
                          );
                        })(i)),
                  (h = R(s, r));
              }
              i[a] = {
                buffer: e,
                numComponents: h,
                type: o,
                normalize: l,
                stride: s.stride || 0,
                offset: s.offset || 0,
                divisor: void 0 === s.divisor ? void 0 : s.divisor,
                drawType: s.drawType,
              };
            }
          }
          var n;
        }),
        t.bindBuffer(y, null),
        i
      );
    }
    const P = ["position", "positions", "a_position"];
    function z(t, e, i) {
      const r = U(t, e),
        n = Object.assign({}, i || {});
      n.attribs = Object.assign({}, i ? i.attribs : {}, r);
      const s = e.indices;
      if (s) {
        const e = I(s, "indices");
        (n.indices = C(t, e, 34963)),
          (n.numElements = e.length),
          (n.elementType = m(e));
      } else
        n.numElements ||
          (n.numElements = (function (t, e) {
            let i, r;
            for (
              r = 0;
              r < P.length &&
              ((i = P[r]), !(i in e)) &&
              ((i = A.attribPrefix + i), !(i in e));
              ++r
            );
            r === P.length && (i = Object.keys(e)[0]);
            const n = e[i];
            if (!n.buffer) return 1;
            t.bindBuffer(y, n.buffer);
            const s = t.getBufferParameter(y, 34660);
            var a;
            t.bindBuffer(y, null);
            const o =
                s /
                (5120 === (a = n.type) || 5121 === a
                  ? 1
                  : 5122 === a || 5123 === a
                  ? 2
                  : 5124 === a || 5125 === a || 5126 === a
                  ? 4
                  : 0),
              l = n.numComponents || n.size,
              h = o / l;
            if (h % 1 != 0)
              throw new Error(
                `numComponents ${l} not correct for length ${length}`
              );
            return h;
          })(t, n.attribs));
      return n;
    }
    function O(t, e, i) {
      const r = "indices" === i ? 34963 : y;
      return C(t, I(e, i), r);
    }
    function B(t, e) {
      const i = {};
      return (
        Object.keys(e).forEach(function (r) {
          i[r] = O(t, e[r], r);
        }),
        e.indices
          ? ((i.numElements = e.indices.length),
            (i.elementType = m(I(e.indices))))
          : (i.numElements = (function (t) {
              let e, i;
              for (i = 0; i < P.length && ((e = P[i]), !(e in t)); ++i);
              i === P.length && (e = Object.keys(t)[0]);
              const r = t[e],
                n = M(r).length;
              if (void 0 === n) return 1;
              const s = R(r, e),
                a = n / s;
              if (n % s > 0)
                throw new Error(
                  `numComponents ${s} not correct for length ${n}`
                );
              return a;
            })(e)),
        i
      );
    }
    function N(t, e) {
      let i = 0;
      return (
        (t.push = function () {
          for (let e = 0; e < arguments.length; ++e) {
            const r = arguments[e];
            if (r instanceof Array || x(r))
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
    function L(t, e, i) {
      return N(new (i || Float32Array)(t * e), t);
    }
    function H(t, e, i) {
      const r = t.length,
        n = new Float32Array(3);
      for (let s = 0; s < r; s += 3)
        i(e, [t[s], t[s + 1], t[s + 2]], n),
          (t[s] = n[0]),
          (t[s + 1] = n[1]),
          (t[s + 2] = n[2]);
    }
    function G(t, i, r) {
      r = r || e();
      const n = i[0],
        s = i[1],
        a = i[2];
      return (
        (r[0] = n * t[0] + s * t[1] + a * t[2]),
        (r[1] = n * t[4] + s * t[5] + a * t[6]),
        (r[2] = n * t[8] + s * t[9] + a * t[10]),
        r
      );
    }
    function V(t, e) {
      return H(t, e, h), t;
    }
    function j(t, e) {
      return H(t, o(e), G), t;
    }
    function q(t, e) {
      return H(t, e, l), t;
    }
    function Y(t, e) {
      return (
        Object.keys(t).forEach(function (i) {
          const r = t[i];
          i.indexOf("pos") >= 0
            ? q(r, e)
            : i.indexOf("tan") >= 0 || i.indexOf("binorm") >= 0
            ? V(r, e)
            : i.indexOf("norm") >= 0 && j(r, e);
        }),
        t
      );
    }
    function W(t, e, i) {
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
    function X(t, e, i, r, n) {
      (t = t || 1), (e = e || 1), (i = i || 1), (r = r || 1), (n = n || a());
      const s = (i + 1) * (r + 1),
        o = L(3, s),
        l = L(3, s),
        h = L(2, s);
      for (let n = 0; n <= r; n++)
        for (let s = 0; s <= i; s++) {
          const a = s / i,
            u = n / r;
          o.push(t * a - 0.5 * t, 0, e * u - 0.5 * e),
            l.push(0, 1, 0),
            h.push(a, u);
        }
      const u = i + 1,
        c = L(3, i * r * 2, Uint16Array);
      for (let t = 0; t < r; t++)
        for (let e = 0; e < i; e++)
          c.push((t + 0) * u + e, (t + 1) * u + e, (t + 0) * u + e + 1),
            c.push((t + 1) * u + e, (t + 1) * u + e + 1, (t + 0) * u + e + 1);
      return Y({ position: o, normal: l, texcoord: h, indices: c }, n);
    }
    function Z(t, e, i, r, n, s, a) {
      if (e <= 0 || i <= 0)
        throw new Error("subdivisionAxis and subdivisionHeight must be > 0");
      (r = r || 0), (s = s || 0);
      const o = (n = n || Math.PI) - r,
        l = (a = a || 2 * Math.PI) - s,
        h = (e + 1) * (i + 1),
        u = L(3, h),
        c = L(3, h),
        f = L(2, h);
      for (let n = 0; n <= i; n++)
        for (let a = 0; a <= e; a++) {
          const h = a / e,
            d = n / i,
            b = l * h + s,
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
        b = L(3, e * i * 2, Uint16Array);
      for (let t = 0; t < e; t++)
        for (let e = 0; e < i; e++)
          b.push((e + 0) * d + t, (e + 0) * d + t + 1, (e + 1) * d + t),
            b.push((e + 1) * d + t, (e + 0) * d + t + 1, (e + 1) * d + t + 1);
      return { position: u, normal: c, texcoord: f, indices: b };
    }
    const J = [
      [3, 7, 5, 1],
      [6, 2, 0, 4],
      [6, 7, 3, 2],
      [0, 1, 5, 4],
      [7, 6, 4, 5],
      [2, 3, 1, 0],
    ];
    function K(t) {
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
        n = [
          [1, 0],
          [0, 0],
          [0, 1],
          [1, 1],
        ],
        s = L(3, 24),
        a = L(3, 24),
        o = L(2, 24),
        l = L(3, 12, Uint16Array);
      for (let t = 0; t < 6; ++t) {
        const e = J[t];
        for (let l = 0; l < 4; ++l) {
          const h = i[e[l]],
            u = r[t],
            c = n[l];
          s.push(h), a.push(u), o.push(c);
        }
        const h = 4 * t;
        l.push(h + 0, h + 1, h + 2), l.push(h + 0, h + 2, h + 3);
      }
      return { position: s, normal: a, texcoord: o, indices: l };
    }
    function Q(t, e, i, r, n, s, a) {
      if (r < 3) throw new Error("radialSubdivisions must be 3 or greater");
      if (n < 1) throw new Error("verticalSubdivisions must be 1 or greater");
      const o = void 0 === s || s,
        l = void 0 === a || a,
        h = (o ? 2 : 0) + (l ? 2 : 0),
        u = (r + 1) * (n + 1 + h),
        c = L(3, u),
        f = L(3, u),
        d = L(2, u),
        b = L(3, r * (n + h / 2) * 2, Uint16Array),
        g = r + 1,
        _ = Math.atan2(t - e, i),
        p = Math.cos(_),
        m = Math.sin(_),
        v = n + (l ? 2 : 0);
      for (let s = o ? -2 : 0; s <= v; ++s) {
        let a,
          o = s / n,
          l = i * o;
        s < 0
          ? ((l = 0), (o = 1), (a = t))
          : s > n
          ? ((l = i), (o = 1), (a = e))
          : (a = t + (s / n) * (e - t)),
          (-2 !== s && s !== n + 2) || ((a = 0), (o = 0)),
          (l -= i / 2);
        for (let t = 0; t < g; ++t) {
          const e = Math.sin((t * Math.PI * 2) / r),
            i = Math.cos((t * Math.PI * 2) / r);
          c.push(e * a, l, i * a),
            s < 0
              ? f.push(0, -1, 0)
              : s > n
              ? f.push(0, 1, 0)
              : 0 === a
              ? f.push(0, 0, 0)
              : f.push(e * p, m, i * p),
            d.push(t / r, 1 - o);
        }
      }
      for (let t = 0; t < n + h; ++t)
        if (!((1 === t && o) || (t === n + h - 2 && l)))
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
    function tt(t, e) {
      e = e || [];
      const i = [];
      for (let r = 0; r < t.length; r += 4) {
        const n = t[r],
          s = t.slice(r + 1, r + 4);
        s.push.apply(s, e);
        for (let t = 0; t < n; ++t) i.push.apply(i, s);
      }
      return i;
    }
    function et() {
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
        e = tt([
          18, 0, 0, 1, 18, 0, 0, -1, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1,
          0, 0, 6, 0, 1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6, 1, 0, 0, 6, 0, -1, 0, 6,
          -1, 0, 0,
        ]),
        i = tt(
          [
            18, 200, 70, 120, 18, 80, 70, 200, 6, 70, 200, 210, 6, 200, 200, 70,
            6, 210, 100, 70, 6, 210, 160, 70, 6, 70, 180, 210, 6, 100, 70, 210,
            6, 76, 210, 100, 6, 140, 210, 80, 6, 90, 130, 110, 6, 160, 160, 220,
          ],
          [255]
        ),
        r = t.length / 3,
        n = {
          position: L(3, r),
          texcoord: L(2, r),
          normal: L(3, r),
          color: L(4, r, Uint8Array),
          indices: L(3, r / 3, Uint16Array),
        };
      n.position.push(t),
        n.texcoord.push([
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
        n.normal.push(e),
        n.color.push(i);
      for (let t = 0; t < r; ++t) n.indices.push(t);
      return n;
    }
    function it(t, e, i, s, a, o, l) {
      if (a <= 0) throw new Error("subdivisionDown must be > 0");
      const h = (l = l || 1) - (o = o || 0),
        u = 2 * (a + 1) * 4,
        c = L(3, u),
        f = L(3, u),
        d = L(2, u);
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
            E = x * s,
            C = y * t,
            S = w * A;
          c.push(E, C, S);
          const M = r(n([0, w, y], l), u);
          f.push(M), d.push(m * g + _, v);
        }
      }
      for (let t = 0; t < 2; t++) {
        const r = 2 * (t / 1 - 0.5);
        g(e, t, [1, 1, 1], [0, 0, 0], 1, 0),
          g(e, t, [0, 0, 0], [r, 0, 0], 0, 0),
          g(i, t, [1, 1, 1], [0, 0, 0], 1, 0),
          g(i, t, [0, 0, 0], [r, 0, 0], 0, 1);
      }
      const _ = L(3, 2 * a * 4, Uint16Array);
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
    function rt(t, e, i, r, n, s) {
      return Q(t, t, e, i, r, n, s);
    }
    function nt(t, e, i, r, n, s) {
      if (i < 3) throw new Error("radialSubdivisions must be 3 or greater");
      if (r < 3) throw new Error("verticalSubdivisions must be 3 or greater");
      n = n || 0;
      const a = (s = s || 2 * Math.PI) - n,
        o = i + 1,
        l = r + 1,
        h = o * l,
        u = L(3, h),
        c = L(3, h),
        f = L(2, h),
        d = L(3, i * r * 2, Uint16Array);
      for (let s = 0; s < l; ++s) {
        const l = s / r,
          h = l * Math.PI * 2,
          d = Math.sin(h),
          b = t + d * e,
          g = Math.cos(h),
          _ = g * e;
        for (let t = 0; t < o; ++t) {
          const e = t / i,
            r = n + e * a,
            s = Math.sin(r),
            o = Math.cos(r),
            h = s * b,
            p = o * b,
            m = s * d,
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
    function st(t, e, i, r, n) {
      if (e < 3) throw new Error("divisions must be at least 3");
      (n = n || 1), (r = r || 0);
      const s = (e + 1) * ((i = i || 1) + 1),
        a = L(3, s),
        o = L(3, s),
        l = L(2, s),
        h = L(3, i * e * 2, Uint16Array);
      let u = 0;
      const c = t - r,
        f = e + 1;
      for (let t = 0; t <= i; ++t) {
        const s = r + c * Math.pow(t / i, n);
        for (let r = 0; r <= e; ++r) {
          const n = (2 * Math.PI * r) / e,
            c = s * Math.cos(n),
            d = s * Math.sin(n);
          if (
            (a.push(c, 0, d),
            o.push(0, 1, 0),
            l.push(1 - r / e, t / i),
            t > 0 && r !== e)
          ) {
            const t = u + (r + 1),
              e = u + r,
              i = u + r - f,
              n = u + (r + 1) - f;
            h.push(t, e, i), h.push(t, i, n);
          }
        }
        u += e + 1;
      }
      return { position: a, normal: o, texcoord: l, indices: h };
    }
    function at(t) {
      return function (e) {
        const i = t.apply(this, Array.prototype.slice.call(arguments, 1));
        return B(e, i);
      };
    }
    function ot(t) {
      return function (e) {
        const i = t.apply(null, Array.prototype.slice.call(arguments, 1));
        return z(e, i);
      };
    }
    ot(et),
      at(et),
      ot(K),
      at(K),
      ot(X),
      at(X),
      ot(Z),
      at(Z),
      ot(Q),
      at(Q),
      ot(W),
      at(W),
      ot(it),
      at(it),
      ot(rt),
      at(rt),
      ot(nt),
      at(nt),
      ot(st),
      at(st);
    function lt(t) {
      return !!t.texStorage2D;
    }
    const ht = (function () {
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
    const ut = 6407,
      ct = 6408,
      ft = 33319,
      dt = 6403,
      bt = {};
    {
      const t = bt;
      (t[6406] = { numColorComponents: 1 }),
        (t[6409] = { numColorComponents: 1 }),
        (t[6410] = { numColorComponents: 2 }),
        (t[ut] = { numColorComponents: 3 }),
        (t[ct] = { numColorComponents: 4 }),
        (t[dt] = { numColorComponents: 1 }),
        (t[36244] = { numColorComponents: 1 }),
        (t[ft] = { numColorComponents: 2 }),
        (t[33320] = { numColorComponents: 2 }),
        (t[ut] = { numColorComponents: 3 }),
        (t[36248] = { numColorComponents: 3 }),
        (t[ct] = { numColorComponents: 4 }),
        (t[36249] = { numColorComponents: 4 }),
        (t[6402] = { numColorComponents: 1 }),
        (t[34041] = { numColorComponents: 2 });
    }
    const gt = T;
    function _t(t) {
      return "undefined" != typeof document && document.getElementById
        ? document.getElementById(t)
        : null;
    }
    const pt = 33984,
      mt = 34962,
      vt = 5126,
      xt = 5124,
      Tt = 5125,
      wt = 3553,
      yt = 34067,
      At = 32879,
      Et = 35866,
      Ct = {};
    function St(t, e) {
      return Ct[e].bindPoint;
    }
    function Mt(t, e) {
      return function (i) {
        t.uniform1i(e, i);
      };
    }
    function Dt(t, e) {
      return function (i) {
        t.uniform1iv(e, i);
      };
    }
    function kt(t, e) {
      return function (i) {
        t.uniform2iv(e, i);
      };
    }
    function Ft(t, e) {
      return function (i) {
        t.uniform3iv(e, i);
      };
    }
    function Rt(t, e) {
      return function (i) {
        t.uniform4iv(e, i);
      };
    }
    function It(t, e, i, r) {
      const n = St(0, e);
      return lt(t)
        ? function (e) {
            let s, a;
            w(0, e)
              ? ((s = e), (a = null))
              : ((s = e.texture), (a = e.sampler)),
              t.uniform1i(r, i),
              t.activeTexture(pt + i),
              t.bindTexture(n, s),
              t.bindSampler(i, a);
          }
        : function (e) {
            t.uniform1i(r, i), t.activeTexture(pt + i), t.bindTexture(n, e);
          };
    }
    function Ut(t, e, i, r, n) {
      const s = St(0, e),
        a = new Int32Array(n);
      for (let t = 0; t < n; ++t) a[t] = i + t;
      return lt(t)
        ? function (e) {
            t.uniform1iv(r, a),
              e.forEach(function (e, r) {
                let n, o;
                t.activeTexture(pt + a[r]),
                  w(0, e)
                    ? ((n = e), (o = null))
                    : ((n = e.texture), (o = e.sampler)),
                  t.bindSampler(i, o),
                  t.bindTexture(s, n);
              });
          }
        : function (e) {
            t.uniform1iv(r, a),
              e.forEach(function (e, i) {
                t.activeTexture(pt + a[i]), t.bindTexture(s, e);
              });
          };
    }
    function Pt(t, e) {
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
          t.bindBuffer(mt, i.buffer),
            t.enableVertexAttribArray(e),
            t.vertexAttribPointer(
              e,
              i.numComponents || i.size,
              i.type || vt,
              i.normalize || !1,
              i.stride || 0,
              i.offset || 0
            ),
            void 0 !== i.divisor && t.vertexAttribDivisor(e, i.divisor);
      };
    }
    function zt(t, e) {
      return function (i) {
        if (i.value) {
          if ((t.disableVertexAttribArray(e), 4 !== i.value.length))
            throw new Error(
              "The length of an integer constant value must be 4!"
            );
          t.vertexAttrib4iv(e, i.value);
        } else
          t.bindBuffer(mt, i.buffer),
            t.enableVertexAttribArray(e),
            t.vertexAttribIPointer(
              e,
              i.numComponents || i.size,
              i.type || xt,
              i.stride || 0,
              i.offset || 0
            ),
            void 0 !== i.divisor && t.vertexAttribDivisor(e, i.divisor);
      };
    }
    function Ot(t, e) {
      return function (i) {
        if (i.value) {
          if ((t.disableVertexAttribArray(e), 4 !== i.value.length))
            throw new Error(
              "The length of an unsigned integer constant value must be 4!"
            );
          t.vertexAttrib4uiv(e, i.value);
        } else
          t.bindBuffer(mt, i.buffer),
            t.enableVertexAttribArray(e),
            t.vertexAttribIPointer(
              e,
              i.numComponents || i.size,
              i.type || Tt,
              i.stride || 0,
              i.offset || 0
            ),
            void 0 !== i.divisor && t.vertexAttribDivisor(e, i.divisor);
      };
    }
    function Bt(t, e, i) {
      const r = i.size,
        n = i.count;
      return function (i) {
        t.bindBuffer(mt, i.buffer);
        const s = i.size || i.numComponents || r,
          a = s / n,
          o = i.type || vt,
          l = Ct[o].size * s,
          h = i.normalize || !1,
          u = i.offset || 0,
          c = l / n;
        for (let r = 0; r < n; ++r)
          t.enableVertexAttribArray(e + r),
            t.vertexAttribPointer(e + r, a, o, h, l, u + c * r),
            void 0 !== i.divisor && t.vertexAttribDivisor(e + r, i.divisor);
      };
    }
    (Ct[5126] = {
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
      (Ct[35664] = {
        Type: Float32Array,
        size: 8,
        setter: function (t, e) {
          return function (i) {
            t.uniform2fv(e, i);
          };
        },
        cols: 2,
      }),
      (Ct[35665] = {
        Type: Float32Array,
        size: 12,
        setter: function (t, e) {
          return function (i) {
            t.uniform3fv(e, i);
          };
        },
        cols: 3,
      }),
      (Ct[35666] = {
        Type: Float32Array,
        size: 16,
        setter: function (t, e) {
          return function (i) {
            t.uniform4fv(e, i);
          };
        },
        cols: 4,
      }),
      (Ct[5124] = { Type: Int32Array, size: 4, setter: Mt, arraySetter: Dt }),
      (Ct[35667] = { Type: Int32Array, size: 8, setter: kt, cols: 2 }),
      (Ct[35668] = { Type: Int32Array, size: 12, setter: Ft, cols: 3 }),
      (Ct[35669] = { Type: Int32Array, size: 16, setter: Rt, cols: 4 }),
      (Ct[5125] = {
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
      (Ct[36294] = {
        Type: Uint32Array,
        size: 8,
        setter: function (t, e) {
          return function (i) {
            t.uniform2uiv(e, i);
          };
        },
        cols: 2,
      }),
      (Ct[36295] = {
        Type: Uint32Array,
        size: 12,
        setter: function (t, e) {
          return function (i) {
            t.uniform3uiv(e, i);
          };
        },
        cols: 3,
      }),
      (Ct[36296] = {
        Type: Uint32Array,
        size: 16,
        setter: function (t, e) {
          return function (i) {
            t.uniform4uiv(e, i);
          };
        },
        cols: 4,
      }),
      (Ct[35670] = { Type: Uint32Array, size: 4, setter: Mt, arraySetter: Dt }),
      (Ct[35671] = { Type: Uint32Array, size: 8, setter: kt, cols: 2 }),
      (Ct[35672] = { Type: Uint32Array, size: 12, setter: Ft, cols: 3 }),
      (Ct[35673] = { Type: Uint32Array, size: 16, setter: Rt, cols: 4 }),
      (Ct[35674] = {
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
      (Ct[35675] = {
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
      (Ct[35676] = {
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
      (Ct[35685] = {
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
      (Ct[35686] = {
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
      (Ct[35687] = {
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
      (Ct[35688] = {
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
      (Ct[35689] = {
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
      (Ct[35690] = {
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
      (Ct[35678] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: wt,
      }),
      (Ct[35680] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: yt,
      }),
      (Ct[35679] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: At,
      }),
      (Ct[35682] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: wt,
      }),
      (Ct[36289] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: Et,
      }),
      (Ct[36292] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: Et,
      }),
      (Ct[36293] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: yt,
      }),
      (Ct[36298] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: wt,
      }),
      (Ct[36299] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: At,
      }),
      (Ct[36300] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: yt,
      }),
      (Ct[36303] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: Et,
      }),
      (Ct[36306] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: wt,
      }),
      (Ct[36307] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: At,
      }),
      (Ct[36308] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: yt,
      }),
      (Ct[36311] = {
        Type: null,
        size: 0,
        setter: It,
        arraySetter: Ut,
        bindPoint: Et,
      });
    const Nt = {};
    (Nt[5126] = { size: 4, setter: Pt }),
      (Nt[35664] = { size: 8, setter: Pt }),
      (Nt[35665] = { size: 12, setter: Pt }),
      (Nt[35666] = { size: 16, setter: Pt }),
      (Nt[5124] = { size: 4, setter: zt }),
      (Nt[35667] = { size: 8, setter: zt }),
      (Nt[35668] = { size: 12, setter: zt }),
      (Nt[35669] = { size: 16, setter: zt }),
      (Nt[5125] = { size: 4, setter: Ot }),
      (Nt[36294] = { size: 8, setter: Ot }),
      (Nt[36295] = { size: 12, setter: Ot }),
      (Nt[36296] = { size: 16, setter: Ot }),
      (Nt[35670] = { size: 4, setter: zt }),
      (Nt[35671] = { size: 8, setter: zt }),
      (Nt[35672] = { size: 12, setter: zt }),
      (Nt[35673] = { size: 16, setter: zt }),
      (Nt[35674] = { size: 4, setter: Bt, count: 2 }),
      (Nt[35675] = { size: 9, setter: Bt, count: 3 }),
      (Nt[35676] = { size: 16, setter: Bt, count: 4 });
    const Lt = /ERROR:\s*\d+:(\d+)/gi;
    const Ht = /^[ \t]*\n/;
    function Gt(t) {
      let e = 0;
      return (
        Ht.test(t) && ((e = 1), (t = t.replace(Ht, ""))),
        { lineOffset: e, shaderSource: t }
      );
    }
    function Vt(t, e) {
      return (
        t.errorCallback(e),
        t.callback &&
          setTimeout(() => {
            t.callback(`${e}\n${t.errors.join("\n")}`);
          }),
        null
      );
    }
    function jt(t, e, i, r) {
      const n = t.createShader(i);
      return (
        t.shaderSource(n, Gt(e).shaderSource),
        t.compileShader(n),
        r.callback ||
        (function (t, e, i, r) {
          r = r || gt;
          const n = t.getShaderParameter(i, 35713);
          if (!n) {
            const n = t.getShaderInfoLog(i),
              { lineOffset: s, shaderSource: a } = Gt(t.getShaderSource(i));
            r(
              `${(function (t, e = "", i = 0) {
                const r = [...e.matchAll(Lt)],
                  n = new Map(
                    r.map((t, i) => {
                      const n = parseInt(t[1]),
                        s = r[i + 1],
                        a = s ? s.index : e.length;
                      return [n - 1, e.substring(t.index, a)];
                    })
                  );
                return t
                  .split("\n")
                  .map((t, e) => {
                    const r = n.get(e);
                    return `${e + 1 + i}: ${t}${r ? `\n\n^^^ ${r}` : ""}`;
                  })
                  .join("\n");
              })(a, n, s)}\nError compiling ${ht(t, e)}: ${n}`
            );
          }
          return n;
        })(t, i, n, r.errorCallback)
          ? n
          : (t.deleteShader(n), null)
      );
    }
    function qt(t, e, i) {
      let r, n, s;
      if (
        ("function" == typeof e && ((i = e), (e = void 0)),
        "function" == typeof t)
      )
        (i = t), (t = void 0);
      else if (t && !Array.isArray(t)) {
        if (t.errorCallback && t.errors) return t;
        const e = t;
        (i = e.errorCallback),
          (t = e.attribLocations),
          (r = e.transformFeedbackVaryings),
          (n = e.transformFeedbackMode),
          (s = e.callback);
      }
      const a = i || gt,
        o = [],
        l = {
          errorCallback(t, ...e) {
            o.push(t), a(t, ...e);
          },
          transformFeedbackVaryings: r,
          transformFeedbackMode: n,
          callback: s,
          errors: o,
        };
      if (t) {
        let i = {};
        Array.isArray(t)
          ? t.forEach(function (t, r) {
              i[t] = e ? e[r] : r;
            })
          : (i = t),
          (l.attribLocations = i);
      }
      return l;
    }
    const Yt = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
    function Wt(t, e) {
      return e.indexOf("frag") >= 0
        ? 35632
        : e.indexOf("vert") >= 0
        ? 35633
        : void 0;
    }
    function Xt(t, e) {
      e.forEach(function (e) {
        t.deleteShader(e);
      });
    }
    const Zt = (t = 0) => new Promise((e) => setTimeout(e, t));
    function Jt(t, e, i, r, n) {
      const s = qt(i, r, n),
        a = [],
        o = [];
      for (let i = 0; i < e.length; ++i) {
        let r = e[i];
        if ("string" == typeof r) {
          const e = _t(r),
            n = e ? e.text : r;
          let a = t[Yt[i]];
          e && e.type && (a = Wt(0, e.type) || a),
            (r = jt(t, n, a, s)),
            o.push(r);
        }
        (l = r),
          "undefined" != typeof WebGLShader &&
            l instanceof WebGLShader &&
            a.push(r);
      }
      var l;
      if (a.length !== e.length)
        return Xt(t, o), Vt(s, "not enough shaders for program");
      const h = t.createProgram();
      a.forEach(function (e) {
        t.attachShader(h, e);
      }),
        s.attribLocations &&
          Object.keys(s.attribLocations).forEach(function (e) {
            t.bindAttribLocation(h, s.attribLocations[e], e);
          });
      let u = s.transformFeedbackVaryings;
      return (
        u &&
          (u.attribs && (u = u.attribs),
          Array.isArray(u) || (u = Object.keys(u)),
          t.transformFeedbackVaryings(h, u, s.transformFeedbackMode || 35981)),
        t.linkProgram(h),
        s.callback
          ? ((async function (t, e, i) {
              const r = t.getExtension("KHR_parallel_shader_compile"),
                n = r
                  ? (t, e) => t.getProgramParameter(e, r.COMPLETION_STATUS_KHR)
                  : () => !0;
              let s = 0;
              do {
                await Zt(s), (s = 1e3 / 60);
              } while (!n(t, e));
              const a = Kt(t, e, i.errorCallback),
                o = a ? void 0 : i.errors.join("\n");
              if (!a) {
                (i.errorCallback || gt)(o), t.deleteProgram(e), (e = null);
              }
              i.callback(o, e);
            })(t, h, s),
            null)
          : Kt(t, h, s.errorCallback)
          ? h
          : (t.deleteProgram(h), Xt(t, o), null)
      );
    }
    function Kt(t, e, i) {
      i = i || gt;
      const r = t.getProgramParameter(e, 35714);
      if (!r) {
        i(`Error in program linking: ${t.getProgramInfoLog(e)}`);
      }
      return r;
    }
    function $t(t, e, i, r, n) {
      const s = qt(i, r, n),
        a = [];
      for (let i = 0; i < e.length; ++i) {
        const r = jt(t, e[i], t[Yt[i]], s);
        if (!s.callback && !r) return null;
        a.push(r);
      }
      return Jt(t, a, s);
    }
    function Qt(t) {
      const e = t.name;
      return e.startsWith("gl_") || e.startsWith("webgl_");
    }
    const te = /(\.|\[|]|\w+)/g;
    function ee(t, e, i, r) {
      const n = t.split(te).filter((t) => "" !== t);
      let s = 0,
        a = "";
      for (;;) {
        const t = n[s++];
        a += t;
        const l = (o = t[0]) >= "0" && o <= "9",
          h = l ? parseInt(t) : t;
        l && (a += n[s++]);
        if (s === n.length) {
          i[h] = e;
          break;
        }
        {
          const t = n[s++],
            e = "[" === t,
            o = i[h] || (e ? [] : {});
          (i[h] = o),
            (i = o),
            (r[a] =
              r[a] ||
              (function (t) {
                return function (e) {
                  se(t, e);
                };
              })(o)),
            (a += t);
        }
      }
      var o;
    }
    function ie(t, e) {
      let i = 0;
      function r(e, r, n) {
        const s = r.name.endsWith("[0]"),
          a = r.type,
          o = Ct[a];
        if (!o) throw new Error(`unknown type: 0x${a.toString(16)}`);
        let l;
        if (o.bindPoint) {
          const e = i;
          (i += r.size),
            (l = s
              ? o.arraySetter(t, a, e, n, r.size)
              : o.setter(t, a, e, n, r.size));
        } else l = o.arraySetter && s ? o.arraySetter(t, n) : o.setter(t, n);
        return (l.location = n), l;
      }
      const n = {},
        s = {},
        a = t.getProgramParameter(e, 35718);
      for (let i = 0; i < a; ++i) {
        const a = t.getActiveUniform(e, i);
        if (Qt(a)) continue;
        let o = a.name;
        o.endsWith("[0]") && (o = o.substr(0, o.length - 3));
        const l = t.getUniformLocation(e, a.name);
        if (l) {
          const t = r(0, a, l);
          (n[o] = t), ee(o, t, s, n);
        }
      }
      return n;
    }
    function re(t, e) {
      const i = {},
        r = t.getProgramParameter(e, 35971);
      for (let n = 0; n < r; ++n) {
        const r = t.getTransformFeedbackVarying(e, n);
        i[r.name] = { index: n, type: r.type, size: r.size };
      }
      return i;
    }
    function ne(t, e) {
      const i = t.getProgramParameter(e, 35718),
        r = [],
        n = [];
      for (let s = 0; s < i; ++s) {
        n.push(s), r.push({});
        const i = t.getActiveUniform(e, s);
        r[s].name = i.name;
      }
      [
        ["UNIFORM_TYPE", "type"],
        ["UNIFORM_SIZE", "size"],
        ["UNIFORM_BLOCK_INDEX", "blockNdx"],
        ["UNIFORM_OFFSET", "offset"],
      ].forEach(function (i) {
        const s = i[0],
          a = i[1];
        t.getActiveUniforms(e, n, t[s]).forEach(function (t, e) {
          r[e][a] = t;
        });
      });
      const s = {},
        a = t.getProgramParameter(e, 35382);
      for (let i = 0; i < a; ++i) {
        const r = t.getActiveUniformBlockName(e, i),
          n = {
            index: t.getUniformBlockIndex(e, r),
            usedByVertexShader: t.getActiveUniformBlockParameter(e, i, 35396),
            usedByFragmentShader: t.getActiveUniformBlockParameter(e, i, 35398),
            size: t.getActiveUniformBlockParameter(e, i, 35392),
            uniformIndices: t.getActiveUniformBlockParameter(e, i, 35395),
          };
        (n.used = n.usedByVertexShader || n.usedByFragmentShader), (s[r] = n);
      }
      return { blockSpecs: s, uniformData: r };
    }
    function se(t, e) {
      for (const i in e) {
        const r = t[i];
        "function" == typeof r ? r(e[i]) : se(t[i], e[i]);
      }
    }
    function ae(t, ...e) {
      const i = t.uniformSetters || t,
        r = e.length;
      for (let t = 0; t < r; ++t) {
        const r = e[t];
        if (Array.isArray(r)) {
          const t = r.length;
          for (let e = 0; e < t; ++e) ae(i, r[e]);
        } else
          for (const t in r) {
            const e = i[t];
            e && e(r[t]);
          }
      }
    }
    function oe(t, e) {
      const i = {},
        r = t.getProgramParameter(e, 35721);
      for (let n = 0; n < r; ++n) {
        const r = t.getActiveAttrib(e, n);
        if (Qt(r)) continue;
        const s = t.getAttribLocation(e, r.name),
          a = Nt[r.type],
          o = a.setter(t, s, a);
        (o.location = s), (i[r.name] = o);
      }
      return i;
    }
    function le(t, e) {
      const i = {
        program: e,
        uniformSetters: ie(t, e),
        attribSetters: oe(t, e),
      };
      return (
        lt(t) &&
          ((i.uniformBlockSpec = ne(t, e)),
          (i.transformFeedbackInfo = re(t, e))),
        i
      );
    }
    const he = /\s|{|}|;/;
    function ue(t, e, i, r, n) {
      const s = qt(i, r, n),
        a = [];
      if (
        ((e = e.map(function (t) {
          if (!he.test(t)) {
            const e = _t(t);
            if (e) t = e.text;
            else {
              const e = `no element with id: ${t}`;
              s.errorCallback(e), a.push(e);
            }
          }
          return t;
        })),
        a.length)
      )
        return Vt(s, "");
      const o = s.callback;
      o &&
        (s.callback = (e, i) => {
          let r;
          e || (r = le(t, i)), o(e, r);
        });
      const l = $t(t, e, s);
      return l ? le(t, l) : null;
    }
    const ce = 36096,
      fe = 33306,
      de = {};
    (de[34041] = fe),
      (de[6401] = 36128),
      (de[36168] = 36128),
      (de[6402] = ce),
      (de[33189] = ce),
      (de[33190] = ce),
      (de[36012] = ce),
      (de[35056] = fe),
      (de[36013] = fe);
    const be = {};
    (be[32854] = !0),
      (be[32855] = !0),
      (be[36194] = !0),
      (be[34041] = !0),
      (be[33189] = !0),
      (be[6401] = !0),
      (be[36168] = !0);
    var ge = {};
    const _e = {
      position: 3,
      normal: 3,
      tangent: 3,
      texcoord: 2,
      texcoord0: 2,
      texcoord1: 2,
      texcoord2: 2,
    };
    var pe = {};
    class me {
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
        for (let n in e) {
          var r = e[n];
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
            (this.attribs[n] = null));
        }
        for (let t in this.attribs);
        this.attribs = i;
      }
    }
    class ve {
      static CreateProgramAttributes(t, e) {
        var i = {},
          r = 0;
        for (let a in e) {
          var n = e[a],
            s = _e[a];
          (i[n] = { type: t.FLOAT, size: s, offset: 4 * r }), (r += s);
        }
        for (let t in i) i[t].stride = 4 * r;
        return i;
      }
      CleanUpPrograms() {
        pe = {};
      }
      ReleaseProgram(t) {}
      static _GetProgram(t) {
        return pe[t];
      }
      static RegisterProgram(t, e) {
        if (!pe[t]) {
          var i = e.shaders;
          pe[t] = { shaders: [i[0], i[1]], attributes: e.attributes };
        }
        return pe[t];
      }
      static GetProgram(t, e, i, r) {
        var n = pe[e],
          s = "";
        for (var a in i) s += a + ":" + i[a] + "-";
        if (!n) {
          var o = e.split("."),
            l = ge[o[0]][o[1]];
          l && (n = ve.RegisterProgram(e, l));
        }
        if (!n) throw "Program not registered: " + o;
        n.programInfo || (n.programInfo = {}),
          (n.programInfo[s] = ve.CompileProgram(t, n.shaders, i)),
          (r =
            r || (n.attributes && ve.CreateProgramAttributes(t, n.attributes)));
        var h = n.programInfo[s];
        if (r)
          for (var a in r) {
            var u = h.attribSetters[a];
            u && ((r[a] = r[a] || {}), (r[a].loc = u.location));
          }
        return (h.attributes = r), h;
      }
      static CompileProgram(t, e, i, r) {
        var n = "";
        for (var s in i) {
          var a = i[s];
          n = "#define " + s + " " + (null === a ? "" : a) + "\n";
        }
        var o = {};
        const l = ue(t, [n + e[0], n + e[1]], null, null);
        if (r)
          for (var s in r) {
            var h = l.attribSetters[s];
            h && ((r[s] = r[s] || {}), (r[s].loc = h.location));
          }
        for (var s in l.uniformSetters) o[s] = l.uniformSetters[s].location;
        return (l.uniforms = o), l;
      }
    }
    var xe = new ve(),
      Te = 1e-6,
      we = "undefined" != typeof Float32Array ? Float32Array : Array;
    Math.random;
    Math.PI;
    function ye() {
      var t = new we(3);
      return we != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)), t;
    }
    function Ae(t) {
      var e = new we(3);
      return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), e;
    }
    function Ee(t) {
      var e = t[0],
        i = t[1],
        r = t[2];
      return Math.hypot(e, i, r);
    }
    function Ce(t, e, i) {
      var r = new we(3);
      return (r[0] = t), (r[1] = e), (r[2] = i), r;
    }
    function Se(t, e) {
      return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
    }
    function Me(t, e, i, r) {
      return (t[0] = e), (t[1] = i), (t[2] = r), t;
    }
    function De(t, e, i) {
      return (
        (t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), (t[2] = e[2] + i[2]), t
      );
    }
    function ke(t, e, i) {
      return (
        (t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), (t[2] = e[2] - i[2]), t
      );
    }
    function Fe(t, e, i) {
      return (
        (t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), (t[2] = e[2] * i[2]), t
      );
    }
    function Re(t, e, i) {
      return (
        (t[0] = Math.min(e[0], i[0])),
        (t[1] = Math.min(e[1], i[1])),
        (t[2] = Math.min(e[2], i[2])),
        t
      );
    }
    function Ie(t, e, i) {
      return (
        (t[0] = Math.max(e[0], i[0])),
        (t[1] = Math.max(e[1], i[1])),
        (t[2] = Math.max(e[2], i[2])),
        t
      );
    }
    function Ue(t, e, i) {
      return (t[0] = e[0] * i), (t[1] = e[1] * i), (t[2] = e[2] * i), t;
    }
    function Pe(t, e, i, r) {
      return (
        (t[0] = e[0] + i[0] * r),
        (t[1] = e[1] + i[1] * r),
        (t[2] = e[2] + i[2] * r),
        t
      );
    }
    function ze(t) {
      var e = t[0],
        i = t[1],
        r = t[2];
      return e * e + i * i + r * r;
    }
    function Oe(t, e) {
      return (t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), t;
    }
    function Be(t, e) {
      var i = e[0],
        r = e[1],
        n = e[2],
        s = i * i + r * r + n * n;
      return (
        s > 0 && (s = 1 / Math.sqrt(s)),
        (t[0] = e[0] * s),
        (t[1] = e[1] * s),
        (t[2] = e[2] * s),
        t
      );
    }
    function Ne(t, e) {
      return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
    }
    function Le(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2],
        a = i[0],
        o = i[1],
        l = i[2];
      return (
        (t[0] = n * l - s * o),
        (t[1] = s * a - r * l),
        (t[2] = r * o - n * a),
        t
      );
    }
    function He(t, e, i, r) {
      var n = e[0],
        s = e[1],
        a = e[2];
      return (
        (t[0] = n + r * (i[0] - n)),
        (t[1] = s + r * (i[1] - s)),
        (t[2] = a + r * (i[2] - a)),
        t
      );
    }
    function Ge(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2],
        a = i[3] * r + i[7] * n + i[11] * s + i[15];
      return (
        (a = a || 1),
        (t[0] = (i[0] * r + i[4] * n + i[8] * s + i[12]) / a),
        (t[1] = (i[1] * r + i[5] * n + i[9] * s + i[13]) / a),
        (t[2] = (i[2] * r + i[6] * n + i[10] * s + i[14]) / a),
        t
      );
    }
    function Ve(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2];
      return (
        (t[0] = r * i[0] + n * i[3] + s * i[6]),
        (t[1] = r * i[1] + n * i[4] + s * i[7]),
        (t[2] = r * i[2] + n * i[5] + s * i[8]),
        t
      );
    }
    Math.hypot ||
      (Math.hypot = function () {
        for (var t = 0, e = arguments.length; e--; )
          t += arguments[e] * arguments[e];
        return Math.sqrt(t);
      });
    var je,
      qe = ke,
      Ye = Ee;
    je = ye();
    function We() {
      var t = new we(16);
      return (
        we != Float32Array &&
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
    function Xe(t, e) {
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
    function Ze(t, e, i, r, n, s, a, o, l, h, u, c, f, d, b, g) {
      var _ = new we(16);
      return (
        (_[0] = t),
        (_[1] = e),
        (_[2] = i),
        (_[3] = r),
        (_[4] = n),
        (_[5] = s),
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
    function Je(t) {
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
    function Ke(t, e) {
      var i = e[0],
        r = e[1],
        n = e[2],
        s = e[3],
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
        v = i * l - n * a,
        x = i * h - s * a,
        T = r * l - n * o,
        w = r * h - s * o,
        y = n * h - s * l,
        A = u * g - c * b,
        E = u * _ - f * b,
        C = u * p - d * b,
        S = c * _ - f * g,
        M = c * p - d * g,
        D = f * p - d * _,
        k = m * D - v * M + x * S + T * C - w * E + y * A;
      return k
        ? ((k = 1 / k),
          (t[0] = (o * D - l * M + h * S) * k),
          (t[1] = (n * M - r * D - s * S) * k),
          (t[2] = (g * y - _ * w + p * T) * k),
          (t[3] = (f * w - c * y - d * T) * k),
          (t[4] = (l * C - a * D - h * E) * k),
          (t[5] = (i * D - n * C + s * E) * k),
          (t[6] = (_ * x - b * y - p * v) * k),
          (t[7] = (u * y - f * x + d * v) * k),
          (t[8] = (a * M - o * C + h * A) * k),
          (t[9] = (r * C - i * M - s * A) * k),
          (t[10] = (b * w - g * x + p * m) * k),
          (t[11] = (c * x - u * w - d * m) * k),
          (t[12] = (o * E - a * S - l * A) * k),
          (t[13] = (i * S - r * E + n * A) * k),
          (t[14] = (g * v - b * T - _ * m) * k),
          (t[15] = (u * T - c * v + f * m) * k),
          t)
        : null;
    }
    function $e(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2],
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
        (t[1] = v * n + x * l + T * f + w * _),
        (t[2] = v * s + x * h + T * d + w * p),
        (t[3] = v * a + x * u + T * b + w * m),
        (v = i[4]),
        (x = i[5]),
        (T = i[6]),
        (w = i[7]),
        (t[4] = v * r + x * o + T * c + w * g),
        (t[5] = v * n + x * l + T * f + w * _),
        (t[6] = v * s + x * h + T * d + w * p),
        (t[7] = v * a + x * u + T * b + w * m),
        (v = i[8]),
        (x = i[9]),
        (T = i[10]),
        (w = i[11]),
        (t[8] = v * r + x * o + T * c + w * g),
        (t[9] = v * n + x * l + T * f + w * _),
        (t[10] = v * s + x * h + T * d + w * p),
        (t[11] = v * a + x * u + T * b + w * m),
        (v = i[12]),
        (x = i[13]),
        (T = i[14]),
        (w = i[15]),
        (t[12] = v * r + x * o + T * c + w * g),
        (t[13] = v * n + x * l + T * f + w * _),
        (t[14] = v * s + x * h + T * d + w * p),
        (t[15] = v * a + x * u + T * b + w * m),
        t
      );
    }
    function Qe(t, e, i) {
      var r,
        n,
        s,
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
            (n = e[1]),
            (s = e[2]),
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
            (t[1] = n),
            (t[2] = s),
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
            (t[13] = n * g + l * _ + f * p + e[13]),
            (t[14] = s * g + h * _ + d * p + e[14]),
            (t[15] = a * g + u * _ + b * p + e[15])),
        t
      );
    }
    function ti(t, e, i) {
      var r = i[0],
        n = i[1],
        s = i[2];
      return (
        (t[0] = e[0] * r),
        (t[1] = e[1] * r),
        (t[2] = e[2] * r),
        (t[3] = e[3] * r),
        (t[4] = e[4] * n),
        (t[5] = e[5] * n),
        (t[6] = e[6] * n),
        (t[7] = e[7] * n),
        (t[8] = e[8] * s),
        (t[9] = e[9] * s),
        (t[10] = e[10] * s),
        (t[11] = e[11] * s),
        (t[12] = e[12]),
        (t[13] = e[13]),
        (t[14] = e[14]),
        (t[15] = e[15]),
        t
      );
    }
    function ei(t, e, i) {
      var r = Math.sin(i),
        n = Math.cos(i),
        s = e[4],
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
        (t[4] = s * n + h * r),
        (t[5] = a * n + u * r),
        (t[6] = o * n + c * r),
        (t[7] = l * n + f * r),
        (t[8] = h * n - s * r),
        (t[9] = u * n - a * r),
        (t[10] = c * n - o * r),
        (t[11] = f * n - l * r),
        t
      );
    }
    function ii(t, e, i) {
      var r = Math.sin(i),
        n = Math.cos(i),
        s = e[0],
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
        (t[0] = s * n - h * r),
        (t[1] = a * n - u * r),
        (t[2] = o * n - c * r),
        (t[3] = l * n - f * r),
        (t[8] = s * r + h * n),
        (t[9] = a * r + u * n),
        (t[10] = o * r + c * n),
        (t[11] = l * r + f * n),
        t
      );
    }
    function ri(t, e, i) {
      var r = Math.sin(i),
        n = Math.cos(i),
        s = e[0],
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
        (t[0] = s * n + h * r),
        (t[1] = a * n + u * r),
        (t[2] = o * n + c * r),
        (t[3] = l * n + f * r),
        (t[4] = h * n - s * r),
        (t[5] = u * n - a * r),
        (t[6] = c * n - o * r),
        (t[7] = f * n - l * r),
        t
      );
    }
    function ni(t, e) {
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
    function si(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2],
        a = e[3],
        o = r + r,
        l = n + n,
        h = s + s,
        u = r * o,
        c = r * l,
        f = r * h,
        d = n * l,
        b = n * h,
        g = s * h,
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
    function ai(t, e) {
      return (t[0] = e[12]), (t[1] = e[13]), (t[2] = e[14]), t;
    }
    function oi(t, e) {
      var i = e[0],
        r = e[1],
        n = e[2],
        s = e[4],
        a = e[5],
        o = e[6],
        l = e[8],
        h = e[9],
        u = e[10];
      return (
        (t[0] = Math.hypot(i, r, n)),
        (t[1] = Math.hypot(s, a, o)),
        (t[2] = Math.hypot(l, h, u)),
        t
      );
    }
    var li = function (t, e, i, r, n) {
      var s,
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
        null != n && n !== 1 / 0
          ? ((s = 1 / (r - n)), (t[10] = (n + r) * s), (t[14] = 2 * n * r * s))
          : ((t[10] = -1), (t[14] = -2 * r)),
        t
      );
    };
    var hi = $e;
    const ui = { 147259: !0 },
      ci = {
        28060: !0,
        28063: !0,
        28082: !0,
        41903: !0,
        42147: !0,
        44808: !0,
        45271: !0,
      };
    const fi = {
        2: { GeosetType: 15, Original: 2, Override: 11 },
        3: { GeosetType: 15, Original: 3, Override: 12 },
        4: { GeosetType: 15, Original: 4, Override: 13 },
        5: { GeosetType: 15, Original: 5, Override: 14 },
        6: { GeosetType: 15, Original: 6, Override: 15 },
        7: { GeosetType: 15, Original: 7, Override: 16 },
        8: { GeosetType: 15, Original: 8, Override: 17 },
        9: { GeosetType: 15, Original: 9, Override: 18 },
        10: { GeosetType: 15, Original: 10, Override: 19 },
      },
      di = {
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
      bi = { MALE: 0, FEMALE: 1, 0: "male", 1: "female" },
      gi = 5,
      _i = 15,
      pi = 21,
      mi = 27,
      vi = 30,
      xi = {
        1: "human",
        2: "orc",
        3: "dwarf",
        4: "nightelf",
        5: "scourge",
        6: "tauren",
        7: "gnome",
        8: "troll",
        9: "goblin",
        10: "bloodelf",
        11: "draenei",
        12: "felorc",
        13: "naga_",
        14: "broken",
        15: "skeleton",
        16: "vrykul",
        17: "tuskarr",
        18: "foresttroll",
        19: "taunka",
        20: "northrendskeleton",
        21: "icetroll",
        22: "worgen",
        23: "gilnean",
        24: "pandaren",
        25: "pandarena",
        26: "pandarenh",
        27: "nightborne",
        28: "highmountaintauren",
        29: "voidelf",
        30: "lightforgeddraenei",
        31: "zandalaritroll",
        32: "kultiran",
        33: "thinhuman",
        34: "darkirondwarf",
        35: "vulpera",
        36: "magharorc",
        37: "mechagnome",
      },
      Ti = [
        0, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0, 21, 22, 22, 16, 21, 0, 19, 5,
        21, 22, 22, 0, 21, 21, 27,
      ],
      wi = [
        0, 16, 0, 15, 1, 8, 10, 5, 6, 6, 7, 0, 0, 17, 18, 19, 14, 20, 0, 9, 8,
        21, 22, 23, 0, 24, 25, 0,
      ],
      yi = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 22, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
      ],
      Ai = [
        0, 2, 0, 4, 128, 128, 128, 128, 128, 128, 128, 0, 0, 1, 1, 1, 128, 1, 0,
        128, 128, 1, 1, 1, 0, 1, 1, 2,
      ],
      Ei = 1,
      Ci = 3,
      Si = 4,
      Mi = 5,
      Di = 6,
      ki = 7,
      Fi = 8,
      Ri = 9,
      Ii = 10,
      Ui = 13,
      Pi = 14,
      zi = 15,
      Oi = 16,
      Bi = 19,
      Ni = 20,
      Li = 21,
      Hi = 22,
      Gi = 23,
      Vi = 26,
      ji = 1,
      qi = 10,
      Yi = [13, 14, 15, 16, 17, 88, 89],
      Wi = [8, 9, 10, 11, 12, 86, 87],
      Xi = 3,
      Zi = 5,
      Ji = 7,
      Ki = 12,
      $i = [
        { x: 0, y: 0, w: 0.5, h: 0.25 },
        { x: 0, y: 0.25, w: 0.5, h: 0.25 },
        { x: 0, y: 0.5, w: 0.5, h: 0.125 },
        { x: 0.5, y: 0, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0.25, w: 0.5, h: 0.125 },
        { x: 0.5, y: 0.375, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0.625, w: 0.5, h: 0.25 },
        { x: 0.5, y: 0.875, w: 0.5, h: 0.125 },
        {},
        { x: 0, y: 0.625, w: 0.5, h: 0.125 },
        { x: 0, y: 0.75, w: 0.5, h: 0.25 },
        {},
        { x: 0, y: 0, w: 1, h: 1 },
        { x: 0, y: 0, w: 1, h: 1 },
      ],
      Qi = [
        { x: 0, y: 0, w: 0.25, h: 0.25 },
        { x: 0, y: 0.25, w: 0.25, h: 0.25 },
        { x: 0, y: 0.5, w: 0.25, h: 0.125 },
        { x: 0.25, y: 0, w: 0.25, h: 0.25 },
        { x: 0.25, y: 0.25, w: 0.25, h: 0.125 },
        { x: 0.25, y: 0.375, w: 0.25, h: 0.25 },
        { x: 0.25, y: 0.625, w: 0.25, h: 0.25 },
        { x: 0.25, y: 0.875, w: 0.25, h: 0.125 },
        { x: 0.75, y: 0.75, w: 0.25, h: 0.25 },
        { x: 0.5, y: 0, w: 0.5, h: 1 },
        { x: 0.5, y: 0, w: 0.5, h: 1 },
        { x: 0.5, y: 0, w: 0.5, h: 1 },
        { x: 0, y: 0, w: 0.5, h: 1 },
        { x: 0, y: 0, w: 1, h: 1 },
        { x: 0, y: 0, w: 0.5, h: 1 },
      ],
      tr = {
        40: [5, 0, 5, 1, 5, 0, 5, 1],
        37: [7, 0, 7, 1, 7, 0, 7, 1],
        36: [2, 0, 2, 1, 2, 0, 2, 1],
        35: [9, 0, 9, 1, 9, 0, 9, 1],
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
      er = {
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
      ir = {
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
    function rr() {
      var t = new we(4);
      return (
        we != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0)),
        t
      );
    }
    function nr(t) {
      var e = new we(4);
      return (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e;
    }
    function sr(t, e, i, r) {
      var n = new we(4);
      return (n[0] = t), (n[1] = e), (n[2] = i), (n[3] = r), n;
    }
    function ar(t, e) {
      return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t;
    }
    function or(t, e, i) {
      return (
        (t[0] = e[0] + i[0]),
        (t[1] = e[1] + i[1]),
        (t[2] = e[2] + i[2]),
        (t[3] = e[3] + i[3]),
        t
      );
    }
    function lr(t, e, i) {
      return (
        (t[0] = e[0] - i[0]),
        (t[1] = e[1] - i[1]),
        (t[2] = e[2] - i[2]),
        (t[3] = e[3] - i[3]),
        t
      );
    }
    function hr(t, e, i) {
      return (
        (t[0] = e[0] * i),
        (t[1] = e[1] * i),
        (t[2] = e[2] * i),
        (t[3] = e[3] * i),
        t
      );
    }
    function ur(t) {
      var e = t[0],
        i = t[1],
        r = t[2],
        n = t[3];
      return Math.hypot(e, i, r, n);
    }
    function cr(t, e) {
      var i = e[0],
        r = e[1],
        n = e[2],
        s = e[3],
        a = i * i + r * r + n * n + s * s;
      return (
        a > 0 && (a = 1 / Math.sqrt(a)),
        (t[0] = i * a),
        (t[1] = r * a),
        (t[2] = n * a),
        (t[3] = s * a),
        t
      );
    }
    function fr(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2],
        a = e[3];
      return (
        (t[0] = i[0] * r + i[4] * n + i[8] * s + i[12] * a),
        (t[1] = i[1] * r + i[5] * n + i[9] * s + i[13] * a),
        (t[2] = i[2] * r + i[6] * n + i[10] * s + i[14] * a),
        (t[3] = i[3] * r + i[7] * n + i[11] * s + i[15] * a),
        t
      );
    }
    var dr = ur;
    !(function () {
      var t = rr();
    })();
    const br = class {
      constructor(t) {
        var e = this;
        (e.a = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.b = sr(t.getFloat(), t.getFloat(), t.getFloat(), 0)),
          (e.c = t.getFloat()),
          (e.d = t.getFloat()),
          (e.e = t.getFloat()),
          (e.f = t.getFloat()),
          (e.g = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
          (e.h = [t.getUint8(), t.getUint8(), t.getUint8(), t.getUint8()]),
          (e.i = Ae(e.a)),
          (e.j = nr(e.b));
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
    const gr = class {
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
    function _r() {
      var t = new we(2);
      return we != Float32Array && ((t[0] = 0), (t[1] = 0)), t;
    }
    function pr(t, e) {
      var i = new we(2);
      return (i[0] = t), (i[1] = e), i;
    }
    function mr(t, e, i) {
      return (t[0] = e), (t[1] = i), t;
    }
    function vr(t, e, i) {
      return (t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), t;
    }
    function xr(t, e, i) {
      return (t[0] = e[0] * i), (t[1] = e[1] * i), t;
    }
    !(function () {
      var t = _r();
    })();
    function Tr() {
      var t = new we(9);
      return (
        we != Float32Array &&
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
    function wr(t, e) {
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
    function yr(t, e, i) {
      var r = e[0],
        n = e[1],
        s = e[2],
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
        (t[1] = f * n + d * o + b * u),
        (t[2] = f * s + d * l + b * c),
        (t[3] = g * r + _ * a + p * h),
        (t[4] = g * n + _ * o + p * u),
        (t[5] = g * s + _ * l + p * c),
        (t[6] = m * r + v * a + x * h),
        (t[7] = m * n + v * o + x * u),
        (t[8] = m * s + v * l + x * c),
        t
      );
    }
    function Ar() {
      var t = new we(4);
      return (
        we != Float32Array && ((t[0] = 0), (t[1] = 0), (t[2] = 0)),
        (t[3] = 1),
        t
      );
    }
    function Er(t, e, i) {
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
    function Cr(t, e, i, r) {
      var n,
        s,
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
        (s = h * d + u * b + c * g + f * _) < 0 &&
          ((s = -s), (d = -d), (b = -b), (g = -g), (_ = -_)),
        1 - s > Te
          ? ((n = Math.acos(s)),
            (a = Math.sin(n)),
            (o = Math.sin((1 - r) * n) / a),
            (l = Math.sin(r * n) / a))
          : ((o = 1 - r), (l = r)),
        (t[0] = o * h + l * d),
        (t[1] = o * u + l * b),
        (t[2] = o * c + l * g),
        (t[3] = o * f + l * _),
        t
      );
    }
    var Sr,
      Mr,
      Dr,
      kr,
      Fr,
      Rr,
      Ir = ar,
      Ur = function (t, e, i, r, n) {
        return (t[0] = e), (t[1] = i), (t[2] = r), (t[3] = n), t;
      },
      Pr = cr;
    (Sr = ye()),
      (Mr = Ce(1, 0, 0)),
      (Dr = Ce(0, 1, 0)),
      (kr = Ar()),
      (Fr = Ar()),
      (Rr = Tr());
    class zr {
      constructor() {
        (this.a = -1), (this.b = null), (this.c = 0);
      }
    }
    class Or {
      constructor() {
        (this.a = new zr()), (this.b = new zr()), (this.c = 0), (this.d = !1);
      }
    }
    class Br {
      f() {
        var t = this;
        if (t.b) for (var e = 0; e < t.b.length; ++e) t.b[e] = null;
        return (t.a = null), (t.b = null), null;
      }
      k(t, e, i, r) {
        let n = this;
        if (
          (null == r && (r = this.g()),
          this.d >= 0 && (t = this.d < e.length ? e[this.d] : e[0]),
          0 != n.c || n.b.length > 1)
        ) {
          if (n.a.length > 1) {
            var s = n.a[n.a.length - 1];
            s > 0 && t > s && this.d < 0 && (t %= s);
            for (var a = 0, o = n.a.length, l = 0; l < o; ++l)
              if (t >= n.a[l] && t < n.a[l + 1]) {
                a = l;
                break;
              }
            var h = n.a[a],
              u = n.a[a + 1],
              c = 0;
            return (
              h != u && (c = (t - h) / (u - h)),
              1 == n.c ? n.h(n.b[a], n.b[a + 1], c, r) : (r = n.i(r, n.b[a]))
            );
          }
          return n.b.length > 0 ? (r = n.i(r, n.b[0])) : i;
        }
        return 0 == n.b.length ? r : (r = n.i(r, n.b[0]));
      }
      l(t) {
        var e,
          i = this;
        (i.c = t.getInt16()), (i.d = t.getInt16()), (i.e = t.getBool());
        var r = t.getInt32();
        for (i.a = new Array(r), e = 0; e < r; ++e) i.a[e] = t.getInt32();
        var n = t.getInt32();
        for (i.b = new Array(n), e = 0; e < n; ++e) i.b[e] = i.j(t);
      }
    }
    class Nr extends Br {
      constructor(t) {
        super();
        (this.ba = ye()), this.l(t);
      }
      g() {
        return ye();
      }
      h(t, e, i, r) {
        return He(r, t, e, i);
      }
      i(t, e) {
        return Se(t, e), t;
      }
      j(t) {
        return Me(ye(), t.getFloat(), t.getFloat(), t.getFloat());
      }
    }
    class Lr extends Br {
      constructor(t) {
        super();
        this.l(t), (this.ba = Ar());
      }
      g() {
        return Ar();
      }
      h(t, e, i, r) {
        return Cr(r, t, e, i);
      }
      i(t, e) {
        return Ir(t, e), t;
      }
      j(t) {
        return Ur(
          Ar(),
          -t.getFloat(),
          -t.getFloat(),
          -t.getFloat(),
          t.getFloat()
        );
      }
    }
    class Hr extends Br {
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
    class Gr extends Hr {
      j(t) {
        return t.getFloat();
      }
    }
    class Vr extends Hr {
      j(t) {
        return t.getUint8();
      }
    }
    class jr {
      d() {
        for (var t = this, e = 0; e < t.b.length; ++e) t.b[e] = null;
        return (t.a = null), (t.b = null), (t.c = null), null;
      }
      i(t, e, i, r) {
        let n = this;
        i || (i = this.e());
        let s = r || n.b;
        if (n.b.length > 1 && n.a.length > 1) {
          var a = n.a[n.a.length - 1];
          a > 0 && t > a && (t %= a);
          for (var o = 0, l = n.a.length, h = 0; h < l - 1; ++h)
            if (t > n.a[h] && t <= n.a[h + 1]) {
              o = h;
              break;
            }
          var u = n.a[o],
            c = n.a[o + 1],
            f = 0;
          return u != c && (f = (t - u) / (c - u)), n.f(s[o], s[o + 1], f, i);
        }
        return s.length > 0 ? (i = n.g(i, s[0])) : e;
      }
      j(t) {
        var e,
          i = this,
          r = t.getInt32();
        for (i.a = new Array(r), e = 0; e < r; ++e)
          i.a[e] = t.getInt16() / 32767;
        var n = t.getInt32();
        for (i.b = new Array(n), e = 0; e < n; ++e) i.b[e] = i.h(t);
      }
    }
    class qr extends jr {
      constructor(t) {
        super();
        (this.ba = _r()), this.j(t);
      }
      e() {
        return _r();
      }
      f(t, e, i, r) {
        return (
          (n = r),
          (a = e),
          (o = i),
          (l = (s = t)[0]),
          (h = s[1]),
          (n[0] = l + o * (a[0] - l)),
          (n[1] = h + o * (a[1] - h)),
          n
        );
        var n, s, a, o, l, h;
      }
      g(t, e) {
        var i, r;
        return (r = e), ((i = t)[0] = r[0]), (i[1] = r[1]), t;
      }
      h(t) {
        return mr(_r(), t.getFloat(), t.getFloat());
      }
    }
    class Yr extends jr {
      constructor(t) {
        super();
        this.j(t);
      }
      e() {
        return ye();
      }
      f(t, e, i, r) {
        return He(r, t, e, i);
      }
      g(t, e) {
        return Se(t, e), t;
      }
      h(t) {
        return Me(ye(), t.getFloat(), t.getFloat(), t.getFloat());
      }
    }
    class Wr extends jr {
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
    class Xr {
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
        let n = t.a.a;
        n >= this.a.length && (n = 0);
        let s = this.a[n].k(t.a.c, e, i, r);
        if (t.c > 0 && t.c < 1) {
          let n = this.a[0].g(),
            a = t.b.a;
          a >= this.a.length && (a = 0);
          let o = this.a[a].k(t.b.c, e, i, n);
          o || (o = n),
            (n = this.a[0].g()),
            (s = this.a[0].h(o, s, t.c, n)),
            r && this.a[0].i(r, n);
        }
        return s;
      }
      e() {
        if (this.a && 0 != this.a.length) {
          for (var t = 0; t < this.a.length; ++t)
            this.a[t].f(), (this.a[t] = null);
          return null;
        }
      }
    }
    function Zr(t, e) {
      return sr(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2], 0);
    }
    function Jr(t, e, i) {
      for (let r = 0; r < 4; r++) t[4 * e + r] = i[r];
    }
    const Kr = class {
      constructor(t, e, i) {
        (this.t = null), (this.u = null), (this.v = null);
        var r = this;
        (r.a = t),
          (r.b = e),
          (r.c = i.getInt32()),
          (r.d = i.getUint32()),
          (r.e = i.getInt16()),
          (r.f = i.getUint16()),
          (r.g = i.getUint32()),
          (r.h = Ce(i.getFloat(), i.getFloat(), i.getFloat())),
          (r.i = new Xr(i, Nr)),
          (r.j = new Xr(i, Lr)),
          (r.k = new Xr(i, Nr)),
          (r.l = ye()),
          (r.m = We()),
          (r.n = ye()),
          (r.o = Ar()),
          (r.p = We()),
          (r.q = !1),
          (r.r = !1),
          (r.s = !1);
      }
      y() {
        var t = this;
        (t.a = null),
          (t.h = null),
          (t.l = null),
          (t.m = null),
          (t.n = null),
          (t.o = null),
          (t.p = null),
          t.i.e(),
          t.j.e(),
          t.k.e(),
          (t.i = null),
          (t.j = null),
          (t.k = null);
      }
      z() {
        this.q = !0;
        for (var t = 0; t < 16; ++t) this.m[t] = 0;
      }
      A(t) {
        t
          ? (null == this.t && (this.t = new Or()), this.a.bv(t, this.t))
          : (this.t = null);
        let e = this.a.aj[this.b];
        for (let i = 0; i < e.length; i++) this.a.aq[e[i]].A(t);
      }
      B(t) {
        t
          ? (null == this.u && (this.u = new Or()), this.a.bv(t, this.u))
          : (this.u = null);
        let e = this.a.aj[this.b];
        for (let i = 0; i < e.length; i++) this.a.aq[e[i]].B(t);
      }
      C(t) {
        var e = this;
        if (e.q) return void e.z();
        if ((null != this.t && this.a.cZ(this.t, t), e.r || e.s)) return;
        if (((e.r = !0), !e.a)) return;
        Je(e.m);
        var i = e.a.S;
        if (!i) return;
        let r = We();
        if (
          ($e(r, r, this.a.aT.viewMatrix),
          $e(r, r, this.a.V),
          $e(e.m, e.m, r),
          e.e > -1)
        ) {
          e.a.aq[e.e].C(t);
          let i = We();
          if (
            (Xe(i, e.a.aq[e.e].m), $e(i, r, i), 1 & e.d || 2 & e.d || 4 & e.d)
          ) {
            if (4 & e.d && 2 & e.d)
              Jr(i, 0, Zr(r, 0)), Jr(i, 1, Zr(r, 1)), Jr(i, 2, Zr(r, 2));
            else if (4 & e.d) {
              {
                let t = Zr(r, 0),
                  e = ur(t);
                hr(t, t, ur(Zr(i, 0)) / e), Jr(i, 0, t);
              }
              {
                let t = Zr(r, 1),
                  e = ur(t);
                hr(t, t, ur(Zr(i, 1)) / e), Jr(i, 1, t);
              }
              {
                let t = Zr(r, 2),
                  e = ur(t);
                hr(t, t, ur(Zr(i, 2)) / e), Jr(i, 2, t);
              }
            } else if (2 & e.d) {
              {
                let t = Zr(r, 0);
                hr(t, t, 1 / ur(Zr(i, 0))), hr(t, t, ur(Zr(r, 0))), Jr(i, 0, t);
              }
              {
                let t = Zr(r, 1);
                hr(t, t, 1 / ur(Zr(i, 1))), hr(t, t, ur(Zr(r, 1))), Jr(i, 1, t);
              }
              {
                let t = Zr(r, 2);
                hr(t, t, 1 / ur(Zr(i, 2))), hr(t, t, ur(Zr(r, 2))), Jr(i, 2, t);
              }
            }
            if (1 & e.d) Jr(i, 3, Zr(r, 3));
            else {
              let t = sr(e.h[0], e.h[1], e.h[2], 1),
                n = rr();
              ar(n, t), (n[3] = 0);
              let s = rr(),
                a = rr();
              fr(s, t, e.a.aq[e.e].m),
                fr(s, s, r),
                fr(a, n, i),
                lr(s, s, a),
                (s[3] = 1),
                Jr(i, 3, s);
            }
          }
          let n = We();
          Ke(n, r), $e(i, n, i), $e(e.m, e.m, i);
        }
        let n = null;
        if (null != this.t) {
          let t = this.D(this.t);
          this.a.T || (this.w = t), (n = this.a.T ? this.w : t);
        } else {
          let t = this.D(i);
          this.a.T || (this.w = t), (n = this.a.T ? this.w : t);
        }
        let s = null;
        if (null != this.u) {
          let t = this.D(this.u);
          this.a.T || (this.x = t), (s = this.a.T ? this.x : t);
        }
        let a = null != n || null != s,
          o = We();
        a && (null != n && $e(o, o, n), null != s && $e(o, o, s)),
          null != this.v &&
            (Qe(o, o, this.h), $e(o, o, this.v), Qe(o, o, Oe(this.n, this.h))),
          $e(e.m, e.m, o);
        let l = 120 & e.d;
        if (l) {
          let t = We();
          Xe(t, e.m);
          let i = e.m,
            r = ye();
          oi(r, e.m);
          let n = rr();
          if (16 == l) {
            let t = Zr(e.m, 0);
            hr(t, t, 1 / Ee(t)), Jr(e.m, 0, t);
            let r = sr(i[4], -i[0], 0, 0);
            Jr(i, 1, cr(r, r)), Le(n, r, t), (n[3] = 0), Jr(i, 2, n);
          } else if (l > 16) {
            if (32 == l) {
              let t = Zr(i, 1);
              hr(t, t, 1 / ur(t)), Jr(e.m, 1, t);
              let r = sr(-i[5], i[1], 0, 0);
              Jr(i, 0, cr(r, r)), (n[3] = 0), Jr(i, 2, n);
            } else if (64 == l) {
              let t = Zr(i, 2);
              cr(t, t), Jr(i, 2, t);
              let e = sr(t[1], -t[0], 0, 0);
              cr(e, e), Jr(i, 1, e), Le(n, t, e), (n[3] = 0), Jr(i, 0, n);
            }
          } else if (8 == l) {
            let t = this.a.i;
            if (a) {
              let e = Zr(o, 0);
              (e = sr(e[1], e[2], -e[0], 0)), cr(e, e), Jr(i, 0, e);
              let r = Zr(o, 1);
              (r = sr(t ? -r[1] : r[1], t ? -r[2] : r[2], t ? r[0] : -r[0], 0)),
                cr(r, r),
                Jr(i, 1, r);
              let n = Zr(o, 2);
              (n = sr(n[1], n[2], -n[0], 0)), cr(n, n), Jr(i, 2, n);
            } else {
              Jr(i, 0, sr(0, 0, -1, 0)),
                Jr(i, 1, sr(t ? -1 : 1, 0, 0, 0)),
                Jr(i, 2, sr(0, 1, 0, 0));
            }
          }
          let s = sr(this.h[0], this.h[1], this.h[2], 1),
            h = sr(this.h[0], this.h[1], this.h[2], 0),
            u = Zr(i, 0),
            c = Zr(i, 1),
            f = Zr(i, 2);
          hr(u, u, r[0]),
            hr(c, c, r[1]),
            hr(f, f, r[2]),
            Jr(i, 0, u),
            Jr(i, 1, c),
            Jr(i, 2, f),
            fr(s, s, t),
            fr(h, h, i);
          let d = rr();
          lr(d, s, h), (d[3] = 1), Jr(i, 3, d);
        }
        Ke(r, r), $e(e.m, r, e.m), Ge(e.l, e.h, e.m);
      }
      D(t) {
        var e = this.i.c(t.a.a),
          i = this.j.c(t.a.a),
          r = this.k.c(t.a.a);
        if (0 != (640 & this.d)) {
          let w = We();
          return (
            Je(w),
            Qe(w, w, this.h),
            e && ((this.n = this.i.d(t, this.a.aY)), Qe(w, w, this.n)),
            i &&
              ((this.o = this.j.d(t, this.a.aY, Ar())),
              (n = this.p),
              (s = this.o),
              (a = s[0]),
              (o = s[1]),
              (l = s[2]),
              (h = s[3]),
              (d = a * (u = a + a)),
              (b = o * u),
              (g = o * (c = o + o)),
              (_ = l * u),
              (p = l * c),
              (m = l * (f = l + l)),
              (v = h * u),
              (x = h * c),
              (T = h * f),
              (n[0] = 1 - g - m),
              (n[1] = b + T),
              (n[2] = _ - x),
              (n[3] = 0),
              (n[4] = b - T),
              (n[5] = 1 - d - m),
              (n[6] = p + v),
              (n[7] = 0),
              (n[8] = _ + x),
              (n[9] = p - v),
              (n[10] = 1 - d - g),
              (n[11] = 0),
              (n[12] = 0),
              (n[13] = 0),
              (n[14] = 0),
              (n[15] = 1),
              $e(w, w, this.p)),
            r && ((this.n = this.k.d(t, this.a.aY)), ti(w, w, this.n)),
            Qe(w, w, Oe(this.n, this.h)),
            w
          );
        }
        var n, s, a, o, l, h, u, c, f, d, b, g, _, p, m, v, x, T;
        return null;
      }
    };
    const $r = class {
      constructor(t) {
        var e = this;
        (e.a = t.getUint16()),
          (e.b = t.getUint16()),
          (e.c = t.getUint16()),
          (e.d = t.getUint16()),
          (e.e = t.getUint16() + 65536 * e.b),
          (e.f = t.getUint16()),
          (e.g = t.getUint16()),
          (e.h = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.i = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.j = t.getFloat());
      }
      k() {
        (this.h = null), (this.i = null);
      }
    };
    function Qr(t) {
      let e = t.length;
      for (; --e >= 0; ) t[e] = 0;
    }
    const tn = 256,
      en = 286,
      rn = 30,
      nn = 15,
      sn = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0,
      ]),
      an = new Uint8Array([
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ]),
      on = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
      ]),
      ln = new Uint8Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]),
      hn = new Array(576);
    Qr(hn);
    const un = new Array(60);
    Qr(un);
    const cn = new Array(512);
    Qr(cn);
    const fn = new Array(256);
    Qr(fn);
    const dn = new Array(29);
    Qr(dn);
    const bn = new Array(rn);
    function gn(t, e, i, r, n) {
      (this.static_tree = t),
        (this.extra_bits = e),
        (this.extra_base = i),
        (this.elems = r),
        (this.max_length = n),
        (this.has_stree = t && t.length);
    }
    let _n, pn, mn;
    function vn(t, e) {
      (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
    }
    Qr(bn);
    const xn = (t) => (t < 256 ? cn[t] : cn[256 + (t >>> 7)]),
      Tn = (t, e) => {
        (t.pending_buf[t.pending++] = 255 & e),
          (t.pending_buf[t.pending++] = (e >>> 8) & 255);
      },
      wn = (t, e, i) => {
        t.bi_valid > 16 - i
          ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
            Tn(t, t.bi_buf),
            (t.bi_buf = e >> (16 - t.bi_valid)),
            (t.bi_valid += i - 16))
          : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += i));
      },
      yn = (t, e, i) => {
        wn(t, i[2 * e], i[2 * e + 1]);
      },
      An = (t, e) => {
        let i = 0;
        do {
          (i |= 1 & t), (t >>>= 1), (i <<= 1);
        } while (--e > 0);
        return i >>> 1;
      },
      En = (t, e, i) => {
        const r = new Array(16);
        let n,
          s,
          a = 0;
        for (n = 1; n <= nn; n++) r[n] = a = (a + i[n - 1]) << 1;
        for (s = 0; s <= e; s++) {
          let e = t[2 * s + 1];
          0 !== e && (t[2 * s] = An(r[e]++, e));
        }
      },
      Cn = (t) => {
        let e;
        for (e = 0; e < en; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < rn; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
        (t.dyn_ltree[512] = 1),
          (t.opt_len = t.static_len = 0),
          (t.last_lit = t.matches = 0);
      },
      Sn = (t) => {
        t.bi_valid > 8
          ? Tn(t, t.bi_buf)
          : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
          (t.bi_buf = 0),
          (t.bi_valid = 0);
      },
      Mn = (t, e, i, r) => {
        const n = 2 * e,
          s = 2 * i;
        return t[n] < t[s] || (t[n] === t[s] && r[e] <= r[i]);
      },
      Dn = (t, e, i) => {
        const r = t.heap[i];
        let n = i << 1;
        for (
          ;
          n <= t.heap_len &&
          (n < t.heap_len && Mn(e, t.heap[n + 1], t.heap[n], t.depth) && n++,
          !Mn(e, r, t.heap[n], t.depth));

        )
          (t.heap[i] = t.heap[n]), (i = n), (n <<= 1);
        t.heap[i] = r;
      },
      kn = (t, e, i) => {
        let r,
          n,
          s,
          a,
          o = 0;
        if (0 !== t.last_lit)
          do {
            (r =
              (t.pending_buf[t.d_buf + 2 * o] << 8) |
              t.pending_buf[t.d_buf + 2 * o + 1]),
              (n = t.pending_buf[t.l_buf + o]),
              o++,
              0 === r
                ? yn(t, n, e)
                : ((s = fn[n]),
                  yn(t, s + tn + 1, e),
                  (a = sn[s]),
                  0 !== a && ((n -= dn[s]), wn(t, n, a)),
                  r--,
                  (s = xn(r)),
                  yn(t, s, i),
                  (a = an[s]),
                  0 !== a && ((r -= bn[s]), wn(t, r, a)));
          } while (o < t.last_lit);
        yn(t, 256, e);
      },
      Fn = (t, e) => {
        const i = e.dyn_tree,
          r = e.stat_desc.static_tree,
          n = e.stat_desc.has_stree,
          s = e.stat_desc.elems;
        let a,
          o,
          l,
          h = -1;
        for (t.heap_len = 0, t.heap_max = 573, a = 0; a < s; a++)
          0 !== i[2 * a]
            ? ((t.heap[++t.heap_len] = h = a), (t.depth[a] = 0))
            : (i[2 * a + 1] = 0);
        for (; t.heap_len < 2; )
          (l = t.heap[++t.heap_len] = h < 2 ? ++h : 0),
            (i[2 * l] = 1),
            (t.depth[l] = 0),
            t.opt_len--,
            n && (t.static_len -= r[2 * l + 1]);
        for (e.max_code = h, a = t.heap_len >> 1; a >= 1; a--) Dn(t, i, a);
        l = s;
        do {
          (a = t.heap[1]),
            (t.heap[1] = t.heap[t.heap_len--]),
            Dn(t, i, 1),
            (o = t.heap[1]),
            (t.heap[--t.heap_max] = a),
            (t.heap[--t.heap_max] = o),
            (i[2 * l] = i[2 * a] + i[2 * o]),
            (t.depth[l] =
              (t.depth[a] >= t.depth[o] ? t.depth[a] : t.depth[o]) + 1),
            (i[2 * a + 1] = i[2 * o + 1] = l),
            (t.heap[1] = l++),
            Dn(t, i, 1);
        } while (t.heap_len >= 2);
        (t.heap[--t.heap_max] = t.heap[1]),
          ((t, e) => {
            const i = e.dyn_tree,
              r = e.max_code,
              n = e.stat_desc.static_tree,
              s = e.stat_desc.has_stree,
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
            for (f = 0; f <= nn; f++) t.bl_count[f] = 0;
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
                  s && (t.static_len += b * (n[2 * u + 1] + d)));
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
          En(i, h, t.bl_count);
      },
      Rn = (t, e, i) => {
        let r,
          n,
          s = -1,
          a = e[1],
          o = 0,
          l = 7,
          h = 4;
        for (
          0 === a && ((l = 138), (h = 3)), e[2 * (i + 1) + 1] = 65535, r = 0;
          r <= i;
          r++
        )
          (n = a),
            (a = e[2 * (r + 1) + 1]),
            (++o < l && n === a) ||
              (o < h
                ? (t.bl_tree[2 * n] += o)
                : 0 !== n
                ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++)
                : o <= 10
                ? t.bl_tree[34]++
                : t.bl_tree[36]++,
              (o = 0),
              (s = n),
              0 === a
                ? ((l = 138), (h = 3))
                : n === a
                ? ((l = 6), (h = 3))
                : ((l = 7), (h = 4)));
      },
      In = (t, e, i) => {
        let r,
          n,
          s = -1,
          a = e[1],
          o = 0,
          l = 7,
          h = 4;
        for (0 === a && ((l = 138), (h = 3)), r = 0; r <= i; r++)
          if (((n = a), (a = e[2 * (r + 1) + 1]), !(++o < l && n === a))) {
            if (o < h)
              do {
                yn(t, n, t.bl_tree);
              } while (0 != --o);
            else
              0 !== n
                ? (n !== s && (yn(t, n, t.bl_tree), o--),
                  yn(t, 16, t.bl_tree),
                  wn(t, o - 3, 2))
                : o <= 10
                ? (yn(t, 17, t.bl_tree), wn(t, o - 3, 3))
                : (yn(t, 18, t.bl_tree), wn(t, o - 11, 7));
            (o = 0),
              (s = n),
              0 === a
                ? ((l = 138), (h = 3))
                : n === a
                ? ((l = 6), (h = 3))
                : ((l = 7), (h = 4));
          }
      };
    let Un = !1;
    const Pn = (t, e, i, r) => {
      wn(t, 0 + (r ? 1 : 0), 3),
        ((t, e, i, r) => {
          Sn(t),
            r && (Tn(t, i), Tn(t, ~i)),
            t.pending_buf.set(t.window.subarray(e, e + i), t.pending),
            (t.pending += i);
        })(t, e, i, !0);
    };
    var zn = (t) => {
        Un ||
          ((() => {
            let t, e, i, r, n;
            const s = new Array(16);
            for (i = 0, r = 0; r < 28; r++)
              for (dn[r] = i, t = 0; t < 1 << sn[r]; t++) fn[i++] = r;
            for (fn[i - 1] = r, n = 0, r = 0; r < 16; r++)
              for (bn[r] = n, t = 0; t < 1 << an[r]; t++) cn[n++] = r;
            for (n >>= 7; r < rn; r++)
              for (bn[r] = n << 7, t = 0; t < 1 << (an[r] - 7); t++)
                cn[256 + n++] = r;
            for (e = 0; e <= nn; e++) s[e] = 0;
            for (t = 0; t <= 143; ) (hn[2 * t + 1] = 8), t++, s[8]++;
            for (; t <= 255; ) (hn[2 * t + 1] = 9), t++, s[9]++;
            for (; t <= 279; ) (hn[2 * t + 1] = 7), t++, s[7]++;
            for (; t <= 287; ) (hn[2 * t + 1] = 8), t++, s[8]++;
            for (En(hn, 287, s), t = 0; t < rn; t++)
              (un[2 * t + 1] = 5), (un[2 * t] = An(t, 5));
            (_n = new gn(hn, sn, 257, en, nn)),
              (pn = new gn(un, an, 0, rn, nn)),
              (mn = new gn(new Array(0), on, 0, 19, 7));
          })(),
          (Un = !0)),
          (t.l_desc = new vn(t.dyn_ltree, _n)),
          (t.d_desc = new vn(t.dyn_dtree, pn)),
          (t.bl_desc = new vn(t.bl_tree, mn)),
          (t.bi_buf = 0),
          (t.bi_valid = 0),
          Cn(t);
      },
      On = (t, e, i, r) => {
        let n,
          s,
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
                for (e = 32; e < tn; e++)
                  if (0 !== t.dyn_ltree[2 * e]) return 1;
                return 0;
              })(t)),
            Fn(t, t.l_desc),
            Fn(t, t.d_desc),
            (a = ((t) => {
              let e;
              for (
                Rn(t, t.dyn_ltree, t.l_desc.max_code),
                  Rn(t, t.dyn_dtree, t.d_desc.max_code),
                  Fn(t, t.bl_desc),
                  e = 18;
                e >= 3 && 0 === t.bl_tree[2 * ln[e] + 1];
                e--
              );
              return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
            })(t)),
            (n = (t.opt_len + 3 + 7) >>> 3),
            (s = (t.static_len + 3 + 7) >>> 3),
            s <= n && (n = s))
          : (n = s = i + 5),
          i + 4 <= n && -1 !== e
            ? Pn(t, e, i, r)
            : 4 === t.strategy || s === n
            ? (wn(t, 2 + (r ? 1 : 0), 3), kn(t, hn, un))
            : (wn(t, 4 + (r ? 1 : 0), 3),
              ((t, e, i, r) => {
                let n;
                for (
                  wn(t, e - 257, 5), wn(t, i - 1, 5), wn(t, r - 4, 4), n = 0;
                  n < r;
                  n++
                )
                  wn(t, t.bl_tree[2 * ln[n] + 1], 3);
                In(t, t.dyn_ltree, e - 1), In(t, t.dyn_dtree, i - 1);
              })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1),
              kn(t, t.dyn_ltree, t.dyn_dtree)),
          Cn(t),
          r && Sn(t);
      },
      Bn = (t, e, i) => (
        (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
        (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
        (t.pending_buf[t.l_buf + t.last_lit] = 255 & i),
        t.last_lit++,
        0 === e
          ? t.dyn_ltree[2 * i]++
          : (t.matches++,
            e--,
            t.dyn_ltree[2 * (fn[i] + tn + 1)]++,
            t.dyn_dtree[2 * xn(e)]++),
        t.last_lit === t.lit_bufsize - 1
      ),
      Nn = {
        _tr_init: zn,
        _tr_stored_block: Pn,
        _tr_flush_block: On,
        _tr_tally: Bn,
        _tr_align: (t) => {
          wn(t, 2, 3),
            yn(t, 256, hn),
            ((t) => {
              16 === t.bi_valid
                ? (Tn(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
                : t.bi_valid >= 8 &&
                  ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
                  (t.bi_buf >>= 8),
                  (t.bi_valid -= 8));
            })(t);
        },
      };
    var Ln = (t, e, i, r) => {
      let n = (65535 & t) | 0,
        s = ((t >>> 16) & 65535) | 0,
        a = 0;
      for (; 0 !== i; ) {
        (a = i > 2e3 ? 2e3 : i), (i -= a);
        do {
          (n = (n + e[r++]) | 0), (s = (s + n) | 0);
        } while (--a);
        (n %= 65521), (s %= 65521);
      }
      return n | (s << 16) | 0;
    };
    const Hn = new Uint32Array(
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
    var Gn = (t, e, i, r) => {
        const n = Hn,
          s = r + i;
        t ^= -1;
        for (let i = r; i < s; i++) t = (t >>> 8) ^ n[255 & (t ^ e[i])];
        return -1 ^ t;
      },
      Vn = {
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
      jn = {
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
        _tr_init: qn,
        _tr_stored_block: Yn,
        _tr_flush_block: Wn,
        _tr_tally: Xn,
        _tr_align: Zn,
      } = Nn,
      {
        Z_NO_FLUSH: Jn,
        Z_PARTIAL_FLUSH: Kn,
        Z_FULL_FLUSH: $n,
        Z_FINISH: Qn,
        Z_BLOCK: ts,
        Z_OK: es,
        Z_STREAM_END: is,
        Z_STREAM_ERROR: rs,
        Z_DATA_ERROR: ns,
        Z_BUF_ERROR: ss,
        Z_DEFAULT_COMPRESSION: as,
        Z_FILTERED: os,
        Z_HUFFMAN_ONLY: ls,
        Z_RLE: hs,
        Z_FIXED: us,
        Z_DEFAULT_STRATEGY: cs,
        Z_UNKNOWN: fs,
        Z_DEFLATED: ds,
      } = jn,
      bs = 258,
      gs = 262,
      _s = 103,
      ps = 113,
      ms = 666,
      vs = (t, e) => ((t.msg = Vn[e]), e),
      xs = (t) => (t << 1) - (t > 4 ? 9 : 0),
      Ts = (t) => {
        let e = t.length;
        for (; --e >= 0; ) t[e] = 0;
      };
    let ws = (t, e, i) => ((e << t.hash_shift) ^ i) & t.hash_mask;
    const ys = (t) => {
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
      As = (t, e) => {
        Wn(
          t,
          t.block_start >= 0 ? t.block_start : -1,
          t.strstart - t.block_start,
          e
        ),
          (t.block_start = t.strstart),
          ys(t.strm);
      },
      Es = (t, e) => {
        t.pending_buf[t.pending++] = e;
      },
      Cs = (t, e) => {
        (t.pending_buf[t.pending++] = (e >>> 8) & 255),
          (t.pending_buf[t.pending++] = 255 & e);
      },
      Ss = (t, e, i, r) => {
        let n = t.avail_in;
        return (
          n > r && (n = r),
          0 === n
            ? 0
            : ((t.avail_in -= n),
              e.set(t.input.subarray(t.next_in, t.next_in + n), i),
              1 === t.state.wrap
                ? (t.adler = Ln(t.adler, e, n, i))
                : 2 === t.state.wrap && (t.adler = Gn(t.adler, e, n, i)),
              (t.next_in += n),
              (t.total_in += n),
              n)
        );
      },
      Ms = (t, e) => {
        let i,
          r,
          n = t.max_chain_length,
          s = t.strstart,
          a = t.prev_length,
          o = t.nice_match;
        const l = t.strstart > t.w_size - gs ? t.strstart - (t.w_size - gs) : 0,
          h = t.window,
          u = t.w_mask,
          c = t.prev,
          f = t.strstart + bs;
        let d = h[s + a - 1],
          b = h[s + a];
        t.prev_length >= t.good_match && (n >>= 2),
          o > t.lookahead && (o = t.lookahead);
        do {
          if (
            ((i = e),
            h[i + a] === b &&
              h[i + a - 1] === d &&
              h[i] === h[s] &&
              h[++i] === h[s + 1])
          ) {
            (s += 2), i++;
            do {} while (
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              h[++s] === h[++i] &&
              s < f
            );
            if (((r = bs - (f - s)), (s = f - bs), r > a)) {
              if (((t.match_start = e), (a = r), r >= o)) break;
              (d = h[s + a - 1]), (b = h[s + a]);
            }
          }
        } while ((e = c[e & u]) > l && 0 != --n);
        return a <= t.lookahead ? a : t.lookahead;
      },
      Ds = (t) => {
        const e = t.w_size;
        let i, r, n, s, a;
        do {
          if (
            ((s = t.window_size - t.lookahead - t.strstart),
            t.strstart >= e + (e - gs))
          ) {
            t.window.set(t.window.subarray(e, e + e), 0),
              (t.match_start -= e),
              (t.strstart -= e),
              (t.block_start -= e),
              (r = t.hash_size),
              (i = r);
            do {
              (n = t.head[--i]), (t.head[i] = n >= e ? n - e : 0);
            } while (--r);
            (r = e), (i = r);
            do {
              (n = t.prev[--i]), (t.prev[i] = n >= e ? n - e : 0);
            } while (--r);
            s += e;
          }
          if (0 === t.strm.avail_in) break;
          if (
            ((r = Ss(t.strm, t.window, t.strstart + t.lookahead, s)),
            (t.lookahead += r),
            t.lookahead + t.insert >= 3)
          )
            for (
              a = t.strstart - t.insert,
                t.ins_h = t.window[a],
                t.ins_h = ws(t, t.ins_h, t.window[a + 1]);
              t.insert &&
              ((t.ins_h = ws(t, t.ins_h, t.window[a + 3 - 1])),
              (t.prev[a & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = a),
              a++,
              t.insert--,
              !(t.lookahead + t.insert < 3));

            );
        } while (t.lookahead < gs && 0 !== t.strm.avail_in);
      },
      ks = (t, e) => {
        let i, r;
        for (;;) {
          if (t.lookahead < gs) {
            if ((Ds(t), t.lookahead < gs && e === Jn)) return 1;
            if (0 === t.lookahead) break;
          }
          if (
            ((i = 0),
            t.lookahead >= 3 &&
              ((t.ins_h = ws(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart)),
            0 !== i &&
              t.strstart - i <= t.w_size - gs &&
              (t.match_length = Ms(t, i)),
            t.match_length >= 3)
          )
            if (
              ((r = Xn(t, t.strstart - t.match_start, t.match_length - 3)),
              (t.lookahead -= t.match_length),
              t.match_length <= t.max_lazy_match && t.lookahead >= 3)
            ) {
              t.match_length--;
              do {
                t.strstart++,
                  (t.ins_h = ws(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                  (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart);
              } while (0 != --t.match_length);
              t.strstart++;
            } else
              (t.strstart += t.match_length),
                (t.match_length = 0),
                (t.ins_h = t.window[t.strstart]),
                (t.ins_h = ws(t, t.ins_h, t.window[t.strstart + 1]));
          else
            (r = Xn(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
          if (r && (As(t, !1), 0 === t.strm.avail_out)) return 1;
        }
        return (
          (t.insert = t.strstart < 2 ? t.strstart : 2),
          e === Qn
            ? (As(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : t.last_lit && (As(t, !1), 0 === t.strm.avail_out)
            ? 1
            : 2
        );
      },
      Fs = (t, e) => {
        let i, r, n;
        for (;;) {
          if (t.lookahead < gs) {
            if ((Ds(t), t.lookahead < gs && e === Jn)) return 1;
            if (0 === t.lookahead) break;
          }
          if (
            ((i = 0),
            t.lookahead >= 3 &&
              ((t.ins_h = ws(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart)),
            (t.prev_length = t.match_length),
            (t.prev_match = t.match_start),
            (t.match_length = 2),
            0 !== i &&
              t.prev_length < t.max_lazy_match &&
              t.strstart - i <= t.w_size - gs &&
              ((t.match_length = Ms(t, i)),
              t.match_length <= 5 &&
                (t.strategy === os ||
                  (3 === t.match_length &&
                    t.strstart - t.match_start > 4096)) &&
                (t.match_length = 2)),
            t.prev_length >= 3 && t.match_length <= t.prev_length)
          ) {
            (n = t.strstart + t.lookahead - 3),
              (r = Xn(t, t.strstart - 1 - t.prev_match, t.prev_length - 3)),
              (t.lookahead -= t.prev_length - 1),
              (t.prev_length -= 2);
            do {
              ++t.strstart <= n &&
                ((t.ins_h = ws(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart));
            } while (0 != --t.prev_length);
            if (
              ((t.match_available = 0),
              (t.match_length = 2),
              t.strstart++,
              r && (As(t, !1), 0 === t.strm.avail_out))
            )
              return 1;
          } else if (t.match_available) {
            if (
              ((r = Xn(t, 0, t.window[t.strstart - 1])),
              r && As(t, !1),
              t.strstart++,
              t.lookahead--,
              0 === t.strm.avail_out)
            )
              return 1;
          } else (t.match_available = 1), t.strstart++, t.lookahead--;
        }
        return (
          t.match_available &&
            ((r = Xn(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
          (t.insert = t.strstart < 2 ? t.strstart : 2),
          e === Qn
            ? (As(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : t.last_lit && (As(t, !1), 0 === t.strm.avail_out)
            ? 1
            : 2
        );
      };
    function Rs(t, e, i, r, n) {
      (this.good_length = t),
        (this.max_lazy = e),
        (this.nice_length = i),
        (this.max_chain = r),
        (this.func = n);
    }
    const Is = [
      new Rs(0, 0, 0, 0, (t, e) => {
        let i = 65535;
        for (i > t.pending_buf_size - 5 && (i = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if ((Ds(t), 0 === t.lookahead && e === Jn)) return 1;
            if (0 === t.lookahead) break;
          }
          (t.strstart += t.lookahead), (t.lookahead = 0);
          const r = t.block_start + i;
          if (
            (0 === t.strstart || t.strstart >= r) &&
            ((t.lookahead = t.strstart - r),
            (t.strstart = r),
            As(t, !1),
            0 === t.strm.avail_out)
          )
            return 1;
          if (
            t.strstart - t.block_start >= t.w_size - gs &&
            (As(t, !1), 0 === t.strm.avail_out)
          )
            return 1;
        }
        return (
          (t.insert = 0),
          e === Qn
            ? (As(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : (t.strstart > t.block_start && (As(t, !1), t.strm.avail_out), 1)
        );
      }),
      new Rs(4, 4, 8, 4, ks),
      new Rs(4, 5, 16, 8, ks),
      new Rs(4, 6, 32, 32, ks),
      new Rs(4, 4, 16, 16, Fs),
      new Rs(8, 16, 32, 32, Fs),
      new Rs(8, 16, 128, 128, Fs),
      new Rs(8, 32, 128, 256, Fs),
      new Rs(32, 128, 258, 1024, Fs),
      new Rs(32, 258, 258, 4096, Fs),
    ];
    function Us() {
      (this.strm = null),
        (this.status = 0),
        (this.pending_buf = null),
        (this.pending_buf_size = 0),
        (this.pending_out = 0),
        (this.pending = 0),
        (this.wrap = 0),
        (this.gzhead = null),
        (this.gzindex = 0),
        (this.method = ds),
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
        Ts(this.dyn_ltree),
        Ts(this.dyn_dtree),
        Ts(this.bl_tree),
        (this.l_desc = null),
        (this.d_desc = null),
        (this.bl_desc = null),
        (this.bl_count = new Uint16Array(16)),
        (this.heap = new Uint16Array(573)),
        Ts(this.heap),
        (this.heap_len = 0),
        (this.heap_max = 0),
        (this.depth = new Uint16Array(573)),
        Ts(this.depth),
        (this.l_buf = 0),
        (this.lit_bufsize = 0),
        (this.last_lit = 0),
        (this.d_buf = 0),
        (this.opt_len = 0),
        (this.static_len = 0),
        (this.matches = 0),
        (this.insert = 0),
        (this.bi_buf = 0),
        (this.bi_valid = 0);
    }
    const Ps = (t) => {
        if (!t || !t.state) return vs(t, rs);
        (t.total_in = t.total_out = 0), (t.data_type = fs);
        const e = t.state;
        return (
          (e.pending = 0),
          (e.pending_out = 0),
          e.wrap < 0 && (e.wrap = -e.wrap),
          (e.status = e.wrap ? 42 : ps),
          (t.adler = 2 === e.wrap ? 0 : 1),
          (e.last_flush = Jn),
          qn(e),
          es
        );
      },
      zs = (t) => {
        const e = Ps(t);
        var i;
        return (
          e === es &&
            (((i = t.state).window_size = 2 * i.w_size),
            Ts(i.head),
            (i.max_lazy_match = Is[i.level].max_lazy),
            (i.good_match = Is[i.level].good_length),
            (i.nice_match = Is[i.level].nice_length),
            (i.max_chain_length = Is[i.level].max_chain),
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
      Os = (t, e, i, r, n, s) => {
        if (!t) return rs;
        let a = 1;
        if (
          (e === as && (e = 6),
          r < 0 ? ((a = 0), (r = -r)) : r > 15 && ((a = 2), (r -= 16)),
          n < 1 ||
            n > 9 ||
            i !== ds ||
            r < 8 ||
            r > 15 ||
            e < 0 ||
            e > 9 ||
            s < 0 ||
            s > us)
        )
          return vs(t, rs);
        8 === r && (r = 9);
        const o = new Us();
        return (
          (t.state = o),
          (o.strm = t),
          (o.wrap = a),
          (o.gzhead = null),
          (o.w_bits = r),
          (o.w_size = 1 << o.w_bits),
          (o.w_mask = o.w_size - 1),
          (o.hash_bits = n + 7),
          (o.hash_size = 1 << o.hash_bits),
          (o.hash_mask = o.hash_size - 1),
          (o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3)),
          (o.window = new Uint8Array(2 * o.w_size)),
          (o.head = new Uint16Array(o.hash_size)),
          (o.prev = new Uint16Array(o.w_size)),
          (o.lit_bufsize = 1 << (n + 6)),
          (o.pending_buf_size = 4 * o.lit_bufsize),
          (o.pending_buf = new Uint8Array(o.pending_buf_size)),
          (o.d_buf = 1 * o.lit_bufsize),
          (o.l_buf = 3 * o.lit_bufsize),
          (o.level = e),
          (o.strategy = s),
          (o.method = i),
          zs(t)
        );
      };
    var Bs = (t, e) => {
        let i = e.length;
        if (!t || !t.state) return rs;
        const r = t.state,
          n = r.wrap;
        if (2 === n || (1 === n && 42 !== r.status) || r.lookahead) return rs;
        if (
          (1 === n && (t.adler = Ln(t.adler, e, i, 0)),
          (r.wrap = 0),
          i >= r.w_size)
        ) {
          0 === n &&
            (Ts(r.head), (r.strstart = 0), (r.block_start = 0), (r.insert = 0));
          let t = new Uint8Array(r.w_size);
          t.set(e.subarray(i - r.w_size, i), 0), (e = t), (i = r.w_size);
        }
        const s = t.avail_in,
          a = t.next_in,
          o = t.input;
        for (
          t.avail_in = i, t.next_in = 0, t.input = e, Ds(r);
          r.lookahead >= 3;

        ) {
          let t = r.strstart,
            e = r.lookahead - 2;
          do {
            (r.ins_h = ws(r, r.ins_h, r.window[t + 3 - 1])),
              (r.prev[t & r.w_mask] = r.head[r.ins_h]),
              (r.head[r.ins_h] = t),
              t++;
          } while (--e);
          (r.strstart = t), (r.lookahead = 2), Ds(r);
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
          (t.avail_in = s),
          (r.wrap = n),
          es
        );
      },
      Ns = {
        deflateInit: (t, e) => Os(t, e, ds, 15, 8, cs),
        deflateInit2: Os,
        deflateReset: zs,
        deflateResetKeep: Ps,
        deflateSetHeader: (t, e) =>
          t && t.state
            ? 2 !== t.state.wrap
              ? rs
              : ((t.state.gzhead = e), es)
            : rs,
        deflate: (t, e) => {
          let i, r;
          if (!t || !t.state || e > ts || e < 0) return t ? vs(t, rs) : rs;
          const n = t.state;
          if (
            !t.output ||
            (!t.input && 0 !== t.avail_in) ||
            (n.status === ms && e !== Qn)
          )
            return vs(t, 0 === t.avail_out ? ss : rs);
          n.strm = t;
          const s = n.last_flush;
          if (((n.last_flush = e), 42 === n.status))
            if (2 === n.wrap)
              (t.adler = 0),
                Es(n, 31),
                Es(n, 139),
                Es(n, 8),
                n.gzhead
                  ? (Es(
                      n,
                      (n.gzhead.text ? 1 : 0) +
                        (n.gzhead.hcrc ? 2 : 0) +
                        (n.gzhead.extra ? 4 : 0) +
                        (n.gzhead.name ? 8 : 0) +
                        (n.gzhead.comment ? 16 : 0)
                    ),
                    Es(n, 255 & n.gzhead.time),
                    Es(n, (n.gzhead.time >> 8) & 255),
                    Es(n, (n.gzhead.time >> 16) & 255),
                    Es(n, (n.gzhead.time >> 24) & 255),
                    Es(
                      n,
                      9 === n.level
                        ? 2
                        : n.strategy >= ls || n.level < 2
                        ? 4
                        : 0
                    ),
                    Es(n, 255 & n.gzhead.os),
                    n.gzhead.extra &&
                      n.gzhead.extra.length &&
                      (Es(n, 255 & n.gzhead.extra.length),
                      Es(n, (n.gzhead.extra.length >> 8) & 255)),
                    n.gzhead.hcrc &&
                      (t.adler = Gn(t.adler, n.pending_buf, n.pending, 0)),
                    (n.gzindex = 0),
                    (n.status = 69))
                  : (Es(n, 0),
                    Es(n, 0),
                    Es(n, 0),
                    Es(n, 0),
                    Es(n, 0),
                    Es(
                      n,
                      9 === n.level
                        ? 2
                        : n.strategy >= ls || n.level < 2
                        ? 4
                        : 0
                    ),
                    Es(n, 3),
                    (n.status = ps));
            else {
              let e = (ds + ((n.w_bits - 8) << 4)) << 8,
                i = -1;
              (i =
                n.strategy >= ls || n.level < 2
                  ? 0
                  : n.level < 6
                  ? 1
                  : 6 === n.level
                  ? 2
                  : 3),
                (e |= i << 6),
                0 !== n.strstart && (e |= 32),
                (e += 31 - (e % 31)),
                (n.status = ps),
                Cs(n, e),
                0 !== n.strstart &&
                  (Cs(n, t.adler >>> 16), Cs(n, 65535 & t.adler)),
                (t.adler = 1);
            }
          if (69 === n.status)
            if (n.gzhead.extra) {
              for (
                i = n.pending;
                n.gzindex < (65535 & n.gzhead.extra.length) &&
                (n.pending !== n.pending_buf_size ||
                  (n.gzhead.hcrc &&
                    n.pending > i &&
                    (t.adler = Gn(t.adler, n.pending_buf, n.pending - i, i)),
                  ys(t),
                  (i = n.pending),
                  n.pending !== n.pending_buf_size));

              )
                Es(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
              n.gzhead.hcrc &&
                n.pending > i &&
                (t.adler = Gn(t.adler, n.pending_buf, n.pending - i, i)),
                n.gzindex === n.gzhead.extra.length &&
                  ((n.gzindex = 0), (n.status = 73));
            } else n.status = 73;
          if (73 === n.status)
            if (n.gzhead.name) {
              i = n.pending;
              do {
                if (
                  n.pending === n.pending_buf_size &&
                  (n.gzhead.hcrc &&
                    n.pending > i &&
                    (t.adler = Gn(t.adler, n.pending_buf, n.pending - i, i)),
                  ys(t),
                  (i = n.pending),
                  n.pending === n.pending_buf_size)
                ) {
                  r = 1;
                  break;
                }
                (r =
                  n.gzindex < n.gzhead.name.length
                    ? 255 & n.gzhead.name.charCodeAt(n.gzindex++)
                    : 0),
                  Es(n, r);
              } while (0 !== r);
              n.gzhead.hcrc &&
                n.pending > i &&
                (t.adler = Gn(t.adler, n.pending_buf, n.pending - i, i)),
                0 === r && ((n.gzindex = 0), (n.status = 91));
            } else n.status = 91;
          if (91 === n.status)
            if (n.gzhead.comment) {
              i = n.pending;
              do {
                if (
                  n.pending === n.pending_buf_size &&
                  (n.gzhead.hcrc &&
                    n.pending > i &&
                    (t.adler = Gn(t.adler, n.pending_buf, n.pending - i, i)),
                  ys(t),
                  (i = n.pending),
                  n.pending === n.pending_buf_size)
                ) {
                  r = 1;
                  break;
                }
                (r =
                  n.gzindex < n.gzhead.comment.length
                    ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++)
                    : 0),
                  Es(n, r);
              } while (0 !== r);
              n.gzhead.hcrc &&
                n.pending > i &&
                (t.adler = Gn(t.adler, n.pending_buf, n.pending - i, i)),
                0 === r && (n.status = _s);
            } else n.status = _s;
          if (
            (n.status === _s &&
              (n.gzhead.hcrc
                ? (n.pending + 2 > n.pending_buf_size && ys(t),
                  n.pending + 2 <= n.pending_buf_size &&
                    (Es(n, 255 & t.adler),
                    Es(n, (t.adler >> 8) & 255),
                    (t.adler = 0),
                    (n.status = ps)))
                : (n.status = ps)),
            0 !== n.pending)
          ) {
            if ((ys(t), 0 === t.avail_out)) return (n.last_flush = -1), es;
          } else if (0 === t.avail_in && xs(e) <= xs(s) && e !== Qn)
            return vs(t, ss);
          if (n.status === ms && 0 !== t.avail_in) return vs(t, ss);
          if (
            0 !== t.avail_in ||
            0 !== n.lookahead ||
            (e !== Jn && n.status !== ms)
          ) {
            let i =
              n.strategy === ls
                ? ((t, e) => {
                    let i;
                    for (;;) {
                      if (0 === t.lookahead && (Ds(t), 0 === t.lookahead)) {
                        if (e === Jn) return 1;
                        break;
                      }
                      if (
                        ((t.match_length = 0),
                        (i = Xn(t, 0, t.window[t.strstart])),
                        t.lookahead--,
                        t.strstart++,
                        i && (As(t, !1), 0 === t.strm.avail_out))
                      )
                        return 1;
                    }
                    return (
                      (t.insert = 0),
                      e === Qn
                        ? (As(t, !0), 0 === t.strm.avail_out ? 3 : 4)
                        : t.last_lit && (As(t, !1), 0 === t.strm.avail_out)
                        ? 1
                        : 2
                    );
                  })(n, e)
                : n.strategy === hs
                ? ((t, e) => {
                    let i, r, n, s;
                    const a = t.window;
                    for (;;) {
                      if (t.lookahead <= bs) {
                        if ((Ds(t), t.lookahead <= bs && e === Jn)) return 1;
                        if (0 === t.lookahead) break;
                      }
                      if (
                        ((t.match_length = 0),
                        t.lookahead >= 3 &&
                          t.strstart > 0 &&
                          ((n = t.strstart - 1),
                          (r = a[n]),
                          r === a[++n] && r === a[++n] && r === a[++n]))
                      ) {
                        s = t.strstart + bs;
                        do {} while (
                          r === a[++n] &&
                          r === a[++n] &&
                          r === a[++n] &&
                          r === a[++n] &&
                          r === a[++n] &&
                          r === a[++n] &&
                          r === a[++n] &&
                          r === a[++n] &&
                          n < s
                        );
                        (t.match_length = bs - (s - n)),
                          t.match_length > t.lookahead &&
                            (t.match_length = t.lookahead);
                      }
                      if (
                        (t.match_length >= 3
                          ? ((i = Xn(t, 1, t.match_length - 3)),
                            (t.lookahead -= t.match_length),
                            (t.strstart += t.match_length),
                            (t.match_length = 0))
                          : ((i = Xn(t, 0, t.window[t.strstart])),
                            t.lookahead--,
                            t.strstart++),
                        i && (As(t, !1), 0 === t.strm.avail_out))
                      )
                        return 1;
                    }
                    return (
                      (t.insert = 0),
                      e === Qn
                        ? (As(t, !0), 0 === t.strm.avail_out ? 3 : 4)
                        : t.last_lit && (As(t, !1), 0 === t.strm.avail_out)
                        ? 1
                        : 2
                    );
                  })(n, e)
                : Is[n.level].func(n, e);
            if (((3 !== i && 4 !== i) || (n.status = ms), 1 === i || 3 === i))
              return 0 === t.avail_out && (n.last_flush = -1), es;
            if (
              2 === i &&
              (e === Kn
                ? Zn(n)
                : e !== ts &&
                  (Yn(n, 0, 0, !1),
                  e === $n &&
                    (Ts(n.head),
                    0 === n.lookahead &&
                      ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))),
              ys(t),
              0 === t.avail_out)
            )
              return (n.last_flush = -1), es;
          }
          return e !== Qn
            ? es
            : n.wrap <= 0
            ? is
            : (2 === n.wrap
                ? (Es(n, 255 & t.adler),
                  Es(n, (t.adler >> 8) & 255),
                  Es(n, (t.adler >> 16) & 255),
                  Es(n, (t.adler >> 24) & 255),
                  Es(n, 255 & t.total_in),
                  Es(n, (t.total_in >> 8) & 255),
                  Es(n, (t.total_in >> 16) & 255),
                  Es(n, (t.total_in >> 24) & 255))
                : (Cs(n, t.adler >>> 16), Cs(n, 65535 & t.adler)),
              ys(t),
              n.wrap > 0 && (n.wrap = -n.wrap),
              0 !== n.pending ? es : is);
        },
        deflateEnd: (t) => {
          if (!t || !t.state) return rs;
          const e = t.state.status;
          return 42 !== e &&
            69 !== e &&
            73 !== e &&
            91 !== e &&
            e !== _s &&
            e !== ps &&
            e !== ms
            ? vs(t, rs)
            : ((t.state = null), e === ps ? vs(t, ns) : es);
        },
        deflateSetDictionary: Bs,
        deflateInfo: "pako deflate (from Nodeca project)",
      };
    const Ls = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
    var Hs = function (t) {
        const e = Array.prototype.slice.call(arguments, 1);
        for (; e.length; ) {
          const i = e.shift();
          if (i) {
            if ("object" != typeof i)
              throw new TypeError(i + "must be non-object");
            for (const e in i) Ls(i, e) && (t[e] = i[e]);
          }
        }
        return t;
      },
      Gs = (t) => {
        let e = 0;
        for (let i = 0, r = t.length; i < r; i++) e += t[i].length;
        const i = new Uint8Array(e);
        for (let e = 0, r = 0, n = t.length; e < n; e++) {
          let n = t[e];
          i.set(n, r), (r += n.length);
        }
        return i;
      };
    let Vs = !0;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
      Vs = !1;
    }
    const js = new Uint8Array(256);
    for (let t = 0; t < 256; t++)
      js[t] =
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
    js[254] = js[254] = 1;
    var qs = (t) => {
        if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
          return new TextEncoder().encode(t);
        let e,
          i,
          r,
          n,
          s,
          a = t.length,
          o = 0;
        for (n = 0; n < a; n++)
          (i = t.charCodeAt(n)),
            55296 == (64512 & i) &&
              n + 1 < a &&
              ((r = t.charCodeAt(n + 1)),
              56320 == (64512 & r) &&
                ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), n++)),
            (o += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
        for (e = new Uint8Array(o), s = 0, n = 0; s < o; n++)
          (i = t.charCodeAt(n)),
            55296 == (64512 & i) &&
              n + 1 < a &&
              ((r = t.charCodeAt(n + 1)),
              56320 == (64512 & r) &&
                ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), n++)),
            i < 128
              ? (e[s++] = i)
              : i < 2048
              ? ((e[s++] = 192 | (i >>> 6)), (e[s++] = 128 | (63 & i)))
              : i < 65536
              ? ((e[s++] = 224 | (i >>> 12)),
                (e[s++] = 128 | ((i >>> 6) & 63)),
                (e[s++] = 128 | (63 & i)))
              : ((e[s++] = 240 | (i >>> 18)),
                (e[s++] = 128 | ((i >>> 12) & 63)),
                (e[s++] = 128 | ((i >>> 6) & 63)),
                (e[s++] = 128 | (63 & i)));
        return e;
      },
      Ys = (t, e) => {
        const i = e || t.length;
        if ("function" == typeof TextDecoder && TextDecoder.prototype.decode)
          return new TextDecoder().decode(t.subarray(0, e));
        let r, n;
        const s = new Array(2 * i);
        for (n = 0, r = 0; r < i; ) {
          let e = t[r++];
          if (e < 128) {
            s[n++] = e;
            continue;
          }
          let a = js[e];
          if (a > 4) (s[n++] = 65533), (r += a - 1);
          else {
            for (e &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < i; )
              (e = (e << 6) | (63 & t[r++])), a--;
            a > 1
              ? (s[n++] = 65533)
              : e < 65536
              ? (s[n++] = e)
              : ((e -= 65536),
                (s[n++] = 55296 | ((e >> 10) & 1023)),
                (s[n++] = 56320 | (1023 & e)));
          }
        }
        return ((t, e) => {
          if (e < 65534 && t.subarray && Vs)
            return String.fromCharCode.apply(
              null,
              t.length === e ? t : t.subarray(0, e)
            );
          let i = "";
          for (let r = 0; r < e; r++) i += String.fromCharCode(t[r]);
          return i;
        })(s, n);
      },
      Ws = (t, e) => {
        (e = e || t.length) > t.length && (e = t.length);
        let i = e - 1;
        for (; i >= 0 && 128 == (192 & t[i]); ) i--;
        return i < 0 || 0 === i ? e : i + js[t[i]] > e ? i : e;
      };
    var Xs = function () {
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
    const Zs = Object.prototype.toString,
      {
        Z_NO_FLUSH: Js,
        Z_SYNC_FLUSH: Ks,
        Z_FULL_FLUSH: $s,
        Z_FINISH: Qs,
        Z_OK: ta,
        Z_STREAM_END: ea,
        Z_DEFAULT_COMPRESSION: ia,
        Z_DEFAULT_STRATEGY: ra,
        Z_DEFLATED: na,
      } = jn;
    function sa(t) {
      this.options = Hs(
        {
          level: ia,
          method: na,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: ra,
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
        (this.strm = new Xs()),
        (this.strm.avail_out = 0);
      let i = Ns.deflateInit2(
        this.strm,
        e.level,
        e.method,
        e.windowBits,
        e.memLevel,
        e.strategy
      );
      if (i !== ta) throw new Error(Vn[i]);
      if (
        (e.header && Ns.deflateSetHeader(this.strm, e.header), e.dictionary)
      ) {
        let t;
        if (
          ((t =
            "string" == typeof e.dictionary
              ? qs(e.dictionary)
              : "[object ArrayBuffer]" === Zs.call(e.dictionary)
              ? new Uint8Array(e.dictionary)
              : e.dictionary),
          (i = Ns.deflateSetDictionary(this.strm, t)),
          i !== ta)
        )
          throw new Error(Vn[i]);
        this._dict_set = !0;
      }
    }
    function aa(t, e) {
      const i = new sa(e);
      if ((i.push(t, !0), i.err)) throw i.msg || Vn[i.err];
      return i.result;
    }
    (sa.prototype.push = function (t, e) {
      const i = this.strm,
        r = this.options.chunkSize;
      let n, s;
      if (this.ended) return !1;
      for (
        s = e === ~~e ? e : !0 === e ? Qs : Js,
          "string" == typeof t
            ? (i.input = qs(t))
            : "[object ArrayBuffer]" === Zs.call(t)
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
          (s === Ks || s === $s) && i.avail_out <= 6)
        )
          this.onData(i.output.subarray(0, i.next_out)), (i.avail_out = 0);
        else {
          if (((n = Ns.deflate(i, s)), n === ea))
            return (
              i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)),
              (n = Ns.deflateEnd(this.strm)),
              this.onEnd(n),
              (this.ended = !0),
              n === ta
            );
          if (0 !== i.avail_out) {
            if (s > 0 && i.next_out > 0)
              this.onData(i.output.subarray(0, i.next_out)), (i.avail_out = 0);
            else if (0 === i.avail_in) break;
          } else this.onData(i.output);
        }
      return !0;
    }),
      (sa.prototype.onData = function (t) {
        this.chunks.push(t);
      }),
      (sa.prototype.onEnd = function (t) {
        t === ta && (this.result = Gs(this.chunks)),
          (this.chunks = []),
          (this.err = t),
          (this.msg = this.strm.msg);
      });
    var oa = {
      Deflate: sa,
      deflate: aa,
      deflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), aa(t, e);
      },
      gzip: function (t, e) {
        return ((e = e || {}).gzip = !0), aa(t, e);
      },
      constants: jn,
    };
    var la = function (t, e) {
      let i,
        r,
        n,
        s,
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
        (n = t.next_out),
        (E = t.output),
        (s = n - (e - t.avail_out)),
        (a = n + (t.avail_out - 257)),
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
            E[n++] = 65535 & m;
          else {
            if (!(16 & v)) {
              if (0 == (64 & v)) {
                m = b[(65535 & m) + (f & ((1 << v) - 1))];
                continue e;
              }
              if (32 & v) {
                C.mode = 12;
                break t;
              }
              (t.msg = "invalid literal/length code"), (C.mode = 30);
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
                (t.msg = "invalid distance code"), (C.mode = 30);
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
                (t.msg = "invalid distance too far back"), (C.mode = 30);
                break t;
              }
              if (((f >>>= v), (d -= v), (v = n - s), T > v)) {
                if (((v = T - v), v > h && C.sane)) {
                  (t.msg = "invalid distance too far back"), (C.mode = 30);
                  break t;
                }
                if (((w = 0), (y = c), 0 === u)) {
                  if (((w += l - v), v < x)) {
                    x -= v;
                    do {
                      E[n++] = c[w++];
                    } while (--v);
                    (w = n - T), (y = E);
                  }
                } else if (u < v) {
                  if (((w += l + u - v), (v -= u), v < x)) {
                    x -= v;
                    do {
                      E[n++] = c[w++];
                    } while (--v);
                    if (((w = 0), u < x)) {
                      (v = u), (x -= v);
                      do {
                        E[n++] = c[w++];
                      } while (--v);
                      (w = n - T), (y = E);
                    }
                  }
                } else if (((w += u - v), v < x)) {
                  x -= v;
                  do {
                    E[n++] = c[w++];
                  } while (--v);
                  (w = n - T), (y = E);
                }
                for (; x > 2; )
                  (E[n++] = y[w++]),
                    (E[n++] = y[w++]),
                    (E[n++] = y[w++]),
                    (x -= 3);
                x && ((E[n++] = y[w++]), x > 1 && (E[n++] = y[w++]));
              } else {
                w = n - T;
                do {
                  (E[n++] = E[w++]),
                    (E[n++] = E[w++]),
                    (E[n++] = E[w++]),
                    (x -= 3);
                } while (x > 2);
                x && ((E[n++] = E[w++]), x > 1 && (E[n++] = E[w++]));
              }
              break;
            }
          }
          break;
        }
      } while (i < r && n < a);
      (x = d >> 3),
        (i -= x),
        (d -= x << 3),
        (f &= (1 << d) - 1),
        (t.next_in = i),
        (t.next_out = n),
        (t.avail_in = i < r ? r - i + 5 : 5 - (i - r)),
        (t.avail_out = n < a ? a - n + 257 : 257 - (n - a)),
        (C.hold = f),
        (C.bits = d);
    };
    const ha = 15,
      ua = new Uint16Array([
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
      ]),
      ca = new Uint8Array([
        16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
        19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
      ]),
      fa = new Uint16Array([
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
        0, 0,
      ]),
      da = new Uint8Array([
        16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
        24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
      ]);
    var ba = (t, e, i, r, n, s, a, o) => {
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
        E = null,
        C = 0;
      const S = new Uint16Array(16),
        M = new Uint16Array(16);
      let D,
        k,
        F,
        R = null,
        I = 0;
      for (g = 0; g <= ha; g++) S[g] = 0;
      for (_ = 0; _ < r; _++) S[e[i + _]]++;
      for (v = l, m = ha; m >= 1 && 0 === S[m]; m--);
      if ((v > m && (v = m), 0 === m))
        return (n[s++] = 20971520), (n[s++] = 20971520), (o.bits = 1), 0;
      for (p = 1; p < m && 0 === S[p]; p++);
      for (v < p && (v = p), w = 1, g = 1; g <= ha; g++)
        if (((w <<= 1), (w -= S[g]), w < 0)) return -1;
      if (w > 0 && (0 === t || 1 !== m)) return -1;
      for (M[1] = 0, g = 1; g < ha; g++) M[g + 1] = M[g] + S[g];
      for (_ = 0; _ < r; _++) 0 !== e[i + _] && (a[M[e[i + _]]++] = _);
      if (
        (0 === t
          ? ((E = R = a), (b = 19))
          : 1 === t
          ? ((E = ua), (C -= 257), (R = ca), (I -= 257), (b = 256))
          : ((E = fa), (R = da), (b = -1)),
        (A = 0),
        (_ = 0),
        (g = p),
        (d = s),
        (x = v),
        (T = 0),
        (c = -1),
        (y = 1 << v),
        (f = y - 1),
        (1 === t && y > 852) || (2 === t && y > 592))
      )
        return 1;
      for (;;) {
        (D = g - T),
          a[_] < b
            ? ((k = 0), (F = a[_]))
            : a[_] > b
            ? ((k = R[I + a[_]]), (F = E[C + a[_]]))
            : ((k = 96), (F = 0)),
          (h = 1 << (g - T)),
          (u = 1 << x),
          (p = u);
        do {
          (u -= h), (n[d + (A >> T) + u] = (D << 24) | (k << 16) | F | 0);
        } while (0 !== u);
        for (h = 1 << (g - 1); A & h; ) h >>= 1;
        if ((0 !== h ? ((A &= h - 1), (A += h)) : (A = 0), _++, 0 == --S[g])) {
          if (g === m) break;
          g = e[i + a[_]];
        }
        if (g > v && (A & f) !== c) {
          for (
            0 === T && (T = v), d += p, x = g - T, w = 1 << x;
            x + T < m && ((w -= S[x + T]), !(w <= 0));

          )
            x++, (w <<= 1);
          if (((y += 1 << x), (1 === t && y > 852) || (2 === t && y > 592)))
            return 1;
          (c = A & f), (n[c] = (v << 24) | (x << 16) | (d - s) | 0);
        }
      }
      return (
        0 !== A && (n[d + A] = ((g - T) << 24) | (64 << 16) | 0),
        (o.bits = v),
        0
      );
    };
    const {
        Z_FINISH: ga,
        Z_BLOCK: _a,
        Z_TREES: pa,
        Z_OK: ma,
        Z_STREAM_END: va,
        Z_NEED_DICT: xa,
        Z_STREAM_ERROR: Ta,
        Z_DATA_ERROR: wa,
        Z_MEM_ERROR: ya,
        Z_BUF_ERROR: Aa,
        Z_DEFLATED: Ea,
      } = jn,
      Ca = 12,
      Sa = 30,
      Ma = (t) =>
        ((t >>> 24) & 255) +
        ((t >>> 8) & 65280) +
        ((65280 & t) << 8) +
        ((255 & t) << 24);
    function Da() {
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
    const ka = (t) => {
        if (!t || !t.state) return Ta;
        const e = t.state;
        return (
          (t.total_in = t.total_out = e.total = 0),
          (t.msg = ""),
          e.wrap && (t.adler = 1 & e.wrap),
          (e.mode = 1),
          (e.last = 0),
          (e.havedict = 0),
          (e.dmax = 32768),
          (e.head = null),
          (e.hold = 0),
          (e.bits = 0),
          (e.lencode = e.lendyn = new Int32Array(852)),
          (e.distcode = e.distdyn = new Int32Array(592)),
          (e.sane = 1),
          (e.back = -1),
          ma
        );
      },
      Fa = (t) => {
        if (!t || !t.state) return Ta;
        const e = t.state;
        return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), ka(t);
      },
      Ra = (t, e) => {
        let i;
        if (!t || !t.state) return Ta;
        const r = t.state;
        return (
          e < 0
            ? ((i = 0), (e = -e))
            : ((i = 1 + (e >> 4)), e < 48 && (e &= 15)),
          e && (e < 8 || e > 15)
            ? Ta
            : (null !== r.window && r.wbits !== e && (r.window = null),
              (r.wrap = i),
              (r.wbits = e),
              Fa(t))
        );
      },
      Ia = (t, e) => {
        if (!t) return Ta;
        const i = new Da();
        (t.state = i), (i.window = null);
        const r = Ra(t, e);
        return r !== ma && (t.state = null), r;
      };
    let Ua,
      Pa,
      za = !0;
    const Oa = (t) => {
        if (za) {
          (Ua = new Int32Array(512)), (Pa = new Int32Array(32));
          let e = 0;
          for (; e < 144; ) t.lens[e++] = 8;
          for (; e < 256; ) t.lens[e++] = 9;
          for (; e < 280; ) t.lens[e++] = 7;
          for (; e < 288; ) t.lens[e++] = 8;
          for (
            ba(1, t.lens, 0, 288, Ua, 0, t.work, { bits: 9 }), e = 0;
            e < 32;

          )
            t.lens[e++] = 5;
          ba(2, t.lens, 0, 32, Pa, 0, t.work, { bits: 5 }), (za = !1);
        }
        (t.lencode = Ua), (t.lenbits = 9), (t.distcode = Pa), (t.distbits = 5);
      },
      Ba = (t, e, i, r) => {
        let n;
        const s = t.state;
        return (
          null === s.window &&
            ((s.wsize = 1 << s.wbits),
            (s.wnext = 0),
            (s.whave = 0),
            (s.window = new Uint8Array(s.wsize))),
          r >= s.wsize
            ? (s.window.set(e.subarray(i - s.wsize, i), 0),
              (s.wnext = 0),
              (s.whave = s.wsize))
            : ((n = s.wsize - s.wnext),
              n > r && (n = r),
              s.window.set(e.subarray(i - r, i - r + n), s.wnext),
              (r -= n)
                ? (s.window.set(e.subarray(i - r, i), 0),
                  (s.wnext = r),
                  (s.whave = s.wsize))
                : ((s.wnext += n),
                  s.wnext === s.wsize && (s.wnext = 0),
                  s.whave < s.wsize && (s.whave += n))),
          0
        );
      };
    var Na = (t, e) => {
        let i,
          r,
          n,
          s,
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
        let C, S;
        const M = new Uint8Array([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]);
        if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in))
          return Ta;
        (i = t.state),
          i.mode === Ca && (i.mode = 13),
          (a = t.next_out),
          (n = t.output),
          (l = t.avail_out),
          (s = t.next_in),
          (r = t.input),
          (o = t.avail_in),
          (h = i.hold),
          (u = i.bits),
          (c = o),
          (f = l),
          (y = ma);
        t: for (;;)
          switch (i.mode) {
            case 1:
              if (0 === i.wrap) {
                i.mode = 13;
                break;
              }
              for (; u < 16; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              if (2 & i.wrap && 35615 === h) {
                (i.check = 0),
                  (E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (i.check = Gn(i.check, E, 2, 0)),
                  (h = 0),
                  (u = 0),
                  (i.mode = 2);
                break;
              }
              if (
                ((i.flags = 0),
                i.head && (i.head.done = !1),
                !(1 & i.wrap) || (((255 & h) << 8) + (h >> 8)) % 31)
              ) {
                (t.msg = "incorrect header check"), (i.mode = Sa);
                break;
              }
              if ((15 & h) !== Ea) {
                (t.msg = "unknown compression method"), (i.mode = Sa);
                break;
              }
              if (((h >>>= 4), (u -= 4), (w = 8 + (15 & h)), 0 === i.wbits))
                i.wbits = w;
              else if (w > i.wbits) {
                (t.msg = "invalid window size"), (i.mode = Sa);
                break;
              }
              (i.dmax = 1 << i.wbits),
                (t.adler = i.check = 1),
                (i.mode = 512 & h ? 10 : Ca),
                (h = 0),
                (u = 0);
              break;
            case 2:
              for (; u < 16; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              if (((i.flags = h), (255 & i.flags) !== Ea)) {
                (t.msg = "unknown compression method"), (i.mode = Sa);
                break;
              }
              if (57344 & i.flags) {
                (t.msg = "unknown header flags set"), (i.mode = Sa);
                break;
              }
              i.head && (i.head.text = (h >> 8) & 1),
                512 & i.flags &&
                  ((E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (i.check = Gn(i.check, E, 2, 0))),
                (h = 0),
                (u = 0),
                (i.mode = 3);
            case 3:
              for (; u < 32; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              i.head && (i.head.time = h),
                512 & i.flags &&
                  ((E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (E[2] = (h >>> 16) & 255),
                  (E[3] = (h >>> 24) & 255),
                  (i.check = Gn(i.check, E, 4, 0))),
                (h = 0),
                (u = 0),
                (i.mode = 4);
            case 4:
              for (; u < 16; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              i.head && ((i.head.xflags = 255 & h), (i.head.os = h >> 8)),
                512 & i.flags &&
                  ((E[0] = 255 & h),
                  (E[1] = (h >>> 8) & 255),
                  (i.check = Gn(i.check, E, 2, 0))),
                (h = 0),
                (u = 0),
                (i.mode = 5);
            case 5:
              if (1024 & i.flags) {
                for (; u < 16; ) {
                  if (0 === o) break t;
                  o--, (h += r[s++] << u), (u += 8);
                }
                (i.length = h),
                  i.head && (i.head.extra_len = h),
                  512 & i.flags &&
                    ((E[0] = 255 & h),
                    (E[1] = (h >>> 8) & 255),
                    (i.check = Gn(i.check, E, 2, 0))),
                  (h = 0),
                  (u = 0);
              } else i.head && (i.head.extra = null);
              i.mode = 6;
            case 6:
              if (
                1024 & i.flags &&
                ((d = i.length),
                d > o && (d = o),
                d &&
                  (i.head &&
                    ((w = i.head.extra_len - i.length),
                    i.head.extra ||
                      (i.head.extra = new Uint8Array(i.head.extra_len)),
                    i.head.extra.set(r.subarray(s, s + d), w)),
                  512 & i.flags && (i.check = Gn(i.check, r, d, s)),
                  (o -= d),
                  (s += d),
                  (i.length -= d)),
                i.length)
              )
                break t;
              (i.length = 0), (i.mode = 7);
            case 7:
              if (2048 & i.flags) {
                if (0 === o) break t;
                d = 0;
                do {
                  (w = r[s + d++]),
                    i.head &&
                      w &&
                      i.length < 65536 &&
                      (i.head.name += String.fromCharCode(w));
                } while (w && d < o);
                if (
                  (512 & i.flags && (i.check = Gn(i.check, r, d, s)),
                  (o -= d),
                  (s += d),
                  w)
                )
                  break t;
              } else i.head && (i.head.name = null);
              (i.length = 0), (i.mode = 8);
            case 8:
              if (4096 & i.flags) {
                if (0 === o) break t;
                d = 0;
                do {
                  (w = r[s + d++]),
                    i.head &&
                      w &&
                      i.length < 65536 &&
                      (i.head.comment += String.fromCharCode(w));
                } while (w && d < o);
                if (
                  (512 & i.flags && (i.check = Gn(i.check, r, d, s)),
                  (o -= d),
                  (s += d),
                  w)
                )
                  break t;
              } else i.head && (i.head.comment = null);
              i.mode = 9;
            case 9:
              if (512 & i.flags) {
                for (; u < 16; ) {
                  if (0 === o) break t;
                  o--, (h += r[s++] << u), (u += 8);
                }
                if (h !== (65535 & i.check)) {
                  (t.msg = "header crc mismatch"), (i.mode = Sa);
                  break;
                }
                (h = 0), (u = 0);
              }
              i.head &&
                ((i.head.hcrc = (i.flags >> 9) & 1), (i.head.done = !0)),
                (t.adler = i.check = 0),
                (i.mode = Ca);
              break;
            case 10:
              for (; u < 32; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              (t.adler = i.check = Ma(h)), (h = 0), (u = 0), (i.mode = 11);
            case 11:
              if (0 === i.havedict)
                return (
                  (t.next_out = a),
                  (t.avail_out = l),
                  (t.next_in = s),
                  (t.avail_in = o),
                  (i.hold = h),
                  (i.bits = u),
                  xa
                );
              (t.adler = i.check = 1), (i.mode = Ca);
            case Ca:
              if (e === _a || e === pa) break t;
            case 13:
              if (i.last) {
                (h >>>= 7 & u), (u -= 7 & u), (i.mode = 27);
                break;
              }
              for (; u < 3; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              switch (((i.last = 1 & h), (h >>>= 1), (u -= 1), 3 & h)) {
                case 0:
                  i.mode = 14;
                  break;
                case 1:
                  if ((Oa(i), (i.mode = 20), e === pa)) {
                    (h >>>= 2), (u -= 2);
                    break t;
                  }
                  break;
                case 2:
                  i.mode = 17;
                  break;
                case 3:
                  (t.msg = "invalid block type"), (i.mode = Sa);
              }
              (h >>>= 2), (u -= 2);
              break;
            case 14:
              for (h >>>= 7 & u, u -= 7 & u; u < 32; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
              }
              if ((65535 & h) != ((h >>> 16) ^ 65535)) {
                (t.msg = "invalid stored block lengths"), (i.mode = Sa);
                break;
              }
              if (
                ((i.length = 65535 & h),
                (h = 0),
                (u = 0),
                (i.mode = 15),
                e === pa)
              )
                break t;
            case 15:
              i.mode = 16;
            case 16:
              if (((d = i.length), d)) {
                if ((d > o && (d = o), d > l && (d = l), 0 === d)) break t;
                n.set(r.subarray(s, s + d), a),
                  (o -= d),
                  (s += d),
                  (l -= d),
                  (a += d),
                  (i.length -= d);
                break;
              }
              i.mode = Ca;
              break;
            case 17:
              for (; u < 14; ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
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
                (t.msg = "too many length or distance symbols"), (i.mode = Sa);
                break;
              }
              (i.have = 0), (i.mode = 18);
            case 18:
              for (; i.have < i.ncode; ) {
                for (; u < 3; ) {
                  if (0 === o) break t;
                  o--, (h += r[s++] << u), (u += 8);
                }
                (i.lens[M[i.have++]] = 7 & h), (h >>>= 3), (u -= 3);
              }
              for (; i.have < 19; ) i.lens[M[i.have++]] = 0;
              if (
                ((i.lencode = i.lendyn),
                (i.lenbits = 7),
                (C = { bits: i.lenbits }),
                (y = ba(0, i.lens, 0, 19, i.lencode, 0, i.work, C)),
                (i.lenbits = C.bits),
                y)
              ) {
                (t.msg = "invalid code lengths set"), (i.mode = Sa);
                break;
              }
              (i.have = 0), (i.mode = 19);
            case 19:
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
                  o--, (h += r[s++] << u), (u += 8);
                }
                if (m < 16) (h >>>= _), (u -= _), (i.lens[i.have++] = m);
                else {
                  if (16 === m) {
                    for (S = _ + 2; u < S; ) {
                      if (0 === o) break t;
                      o--, (h += r[s++] << u), (u += 8);
                    }
                    if (((h >>>= _), (u -= _), 0 === i.have)) {
                      (t.msg = "invalid bit length repeat"), (i.mode = Sa);
                      break;
                    }
                    (w = i.lens[i.have - 1]),
                      (d = 3 + (3 & h)),
                      (h >>>= 2),
                      (u -= 2);
                  } else if (17 === m) {
                    for (S = _ + 3; u < S; ) {
                      if (0 === o) break t;
                      o--, (h += r[s++] << u), (u += 8);
                    }
                    (h >>>= _),
                      (u -= _),
                      (w = 0),
                      (d = 3 + (7 & h)),
                      (h >>>= 3),
                      (u -= 3);
                  } else {
                    for (S = _ + 7; u < S; ) {
                      if (0 === o) break t;
                      o--, (h += r[s++] << u), (u += 8);
                    }
                    (h >>>= _),
                      (u -= _),
                      (w = 0),
                      (d = 11 + (127 & h)),
                      (h >>>= 7),
                      (u -= 7);
                  }
                  if (i.have + d > i.nlen + i.ndist) {
                    (t.msg = "invalid bit length repeat"), (i.mode = Sa);
                    break;
                  }
                  for (; d--; ) i.lens[i.have++] = w;
                }
              }
              if (i.mode === Sa) break;
              if (0 === i.lens[256]) {
                (t.msg = "invalid code -- missing end-of-block"), (i.mode = Sa);
                break;
              }
              if (
                ((i.lenbits = 9),
                (C = { bits: i.lenbits }),
                (y = ba(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, C)),
                (i.lenbits = C.bits),
                y)
              ) {
                (t.msg = "invalid literal/lengths set"), (i.mode = Sa);
                break;
              }
              if (
                ((i.distbits = 6),
                (i.distcode = i.distdyn),
                (C = { bits: i.distbits }),
                (y = ba(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, C)),
                (i.distbits = C.bits),
                y)
              ) {
                (t.msg = "invalid distances set"), (i.mode = Sa);
                break;
              }
              if (((i.mode = 20), e === pa)) break t;
            case 20:
              i.mode = 21;
            case 21:
              if (o >= 6 && l >= 258) {
                (t.next_out = a),
                  (t.avail_out = l),
                  (t.next_in = s),
                  (t.avail_in = o),
                  (i.hold = h),
                  (i.bits = u),
                  la(t, f),
                  (a = t.next_out),
                  (n = t.output),
                  (l = t.avail_out),
                  (s = t.next_in),
                  (r = t.input),
                  (o = t.avail_in),
                  (h = i.hold),
                  (u = i.bits),
                  i.mode === Ca && (i.back = -1);
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
                o--, (h += r[s++] << u), (u += 8);
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
                  o--, (h += r[s++] << u), (u += 8);
                }
                (h >>>= v), (u -= v), (i.back += v);
              }
              if (
                ((h >>>= _), (u -= _), (i.back += _), (i.length = m), 0 === p)
              ) {
                i.mode = 26;
                break;
              }
              if (32 & p) {
                (i.back = -1), (i.mode = Ca);
                break;
              }
              if (64 & p) {
                (t.msg = "invalid literal/length code"), (i.mode = Sa);
                break;
              }
              (i.extra = 15 & p), (i.mode = 22);
            case 22:
              if (i.extra) {
                for (S = i.extra; u < S; ) {
                  if (0 === o) break t;
                  o--, (h += r[s++] << u), (u += 8);
                }
                (i.length += h & ((1 << i.extra) - 1)),
                  (h >>>= i.extra),
                  (u -= i.extra),
                  (i.back += i.extra);
              }
              (i.was = i.length), (i.mode = 23);
            case 23:
              for (
                ;
                (A = i.distcode[h & ((1 << i.distbits) - 1)]),
                  (_ = A >>> 24),
                  (p = (A >>> 16) & 255),
                  (m = 65535 & A),
                  !(_ <= u);

              ) {
                if (0 === o) break t;
                o--, (h += r[s++] << u), (u += 8);
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
                  o--, (h += r[s++] << u), (u += 8);
                }
                (h >>>= v), (u -= v), (i.back += v);
              }
              if (((h >>>= _), (u -= _), (i.back += _), 64 & p)) {
                (t.msg = "invalid distance code"), (i.mode = Sa);
                break;
              }
              (i.offset = m), (i.extra = 15 & p), (i.mode = 24);
            case 24:
              if (i.extra) {
                for (S = i.extra; u < S; ) {
                  if (0 === o) break t;
                  o--, (h += r[s++] << u), (u += 8);
                }
                (i.offset += h & ((1 << i.extra) - 1)),
                  (h >>>= i.extra),
                  (u -= i.extra),
                  (i.back += i.extra);
              }
              if (i.offset > i.dmax) {
                (t.msg = "invalid distance too far back"), (i.mode = Sa);
                break;
              }
              i.mode = 25;
            case 25:
              if (0 === l) break t;
              if (((d = f - l), i.offset > d)) {
                if (((d = i.offset - d), d > i.whave && i.sane)) {
                  (t.msg = "invalid distance too far back"), (i.mode = Sa);
                  break;
                }
                d > i.wnext
                  ? ((d -= i.wnext), (b = i.wsize - d))
                  : (b = i.wnext - d),
                  d > i.length && (d = i.length),
                  (g = i.window);
              } else (g = n), (b = a - i.offset), (d = i.length);
              d > l && (d = l), (l -= d), (i.length -= d);
              do {
                n[a++] = g[b++];
              } while (--d);
              0 === i.length && (i.mode = 21);
              break;
            case 26:
              if (0 === l) break t;
              (n[a++] = i.length), l--, (i.mode = 21);
              break;
            case 27:
              if (i.wrap) {
                for (; u < 32; ) {
                  if (0 === o) break t;
                  o--, (h |= r[s++] << u), (u += 8);
                }
                if (
                  ((f -= l),
                  (t.total_out += f),
                  (i.total += f),
                  f &&
                    (t.adler = i.check =
                      i.flags
                        ? Gn(i.check, n, f, a - f)
                        : Ln(i.check, n, f, a - f)),
                  (f = l),
                  (i.flags ? h : Ma(h)) !== i.check)
                ) {
                  (t.msg = "incorrect data check"), (i.mode = Sa);
                  break;
                }
                (h = 0), (u = 0);
              }
              i.mode = 28;
            case 28:
              if (i.wrap && i.flags) {
                for (; u < 32; ) {
                  if (0 === o) break t;
                  o--, (h += r[s++] << u), (u += 8);
                }
                if (h !== (4294967295 & i.total)) {
                  (t.msg = "incorrect length check"), (i.mode = Sa);
                  break;
                }
                (h = 0), (u = 0);
              }
              i.mode = 29;
            case 29:
              y = va;
              break t;
            case Sa:
              y = wa;
              break t;
            case 31:
              return ya;
            default:
              return Ta;
          }
        return (
          (t.next_out = a),
          (t.avail_out = l),
          (t.next_in = s),
          (t.avail_in = o),
          (i.hold = h),
          (i.bits = u),
          (i.wsize ||
            (f !== t.avail_out && i.mode < Sa && (i.mode < 27 || e !== ga))) &&
            Ba(t, t.output, t.next_out, f - t.avail_out),
          (c -= t.avail_in),
          (f -= t.avail_out),
          (t.total_in += c),
          (t.total_out += f),
          (i.total += f),
          i.wrap &&
            f &&
            (t.adler = i.check =
              i.flags
                ? Gn(i.check, n, f, t.next_out - f)
                : Ln(i.check, n, f, t.next_out - f)),
          (t.data_type =
            i.bits +
            (i.last ? 64 : 0) +
            (i.mode === Ca ? 128 : 0) +
            (20 === i.mode || 15 === i.mode ? 256 : 0)),
          ((0 === c && 0 === f) || e === ga) && y === ma && (y = Aa),
          y
        );
      },
      La = {
        inflateReset: Fa,
        inflateReset2: Ra,
        inflateResetKeep: ka,
        inflateInit: (t) => Ia(t, 15),
        inflateInit2: Ia,
        inflate: Na,
        inflateEnd: (t) => {
          if (!t || !t.state) return Ta;
          let e = t.state;
          return e.window && (e.window = null), (t.state = null), ma;
        },
        inflateGetHeader: (t, e) => {
          if (!t || !t.state) return Ta;
          const i = t.state;
          return 0 == (2 & i.wrap) ? Ta : ((i.head = e), (e.done = !1), ma);
        },
        inflateSetDictionary: (t, e) => {
          const i = e.length;
          let r, n, s;
          return t && t.state
            ? ((r = t.state),
              0 !== r.wrap && 11 !== r.mode
                ? Ta
                : 11 === r.mode &&
                  ((n = 1), (n = Ln(n, e, i, 0)), n !== r.check)
                ? wa
                : ((s = Ba(t, e, i, i)),
                  s ? ((r.mode = 31), ya) : ((r.havedict = 1), ma)))
            : Ta;
        },
        inflateInfo: "pako inflate (from Nodeca project)",
      };
    var Ha = function () {
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
    const Ga = Object.prototype.toString,
      {
        Z_NO_FLUSH: Va,
        Z_FINISH: ja,
        Z_OK: qa,
        Z_STREAM_END: Ya,
        Z_NEED_DICT: Wa,
        Z_STREAM_ERROR: Xa,
        Z_DATA_ERROR: Za,
        Z_MEM_ERROR: Ja,
      } = jn;
    function Ka(t) {
      this.options = Hs({ chunkSize: 65536, windowBits: 15, to: "" }, t || {});
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
        (this.strm = new Xs()),
        (this.strm.avail_out = 0);
      let i = La.inflateInit2(this.strm, e.windowBits);
      if (i !== qa) throw new Error(Vn[i]);
      if (
        ((this.header = new Ha()),
        La.inflateGetHeader(this.strm, this.header),
        e.dictionary &&
          ("string" == typeof e.dictionary
            ? (e.dictionary = qs(e.dictionary))
            : "[object ArrayBuffer]" === Ga.call(e.dictionary) &&
              (e.dictionary = new Uint8Array(e.dictionary)),
          e.raw &&
            ((i = La.inflateSetDictionary(this.strm, e.dictionary)), i !== qa)))
      )
        throw new Error(Vn[i]);
    }
    function $a(t, e) {
      const i = new Ka(e);
      if ((i.push(t), i.err)) throw i.msg || Vn[i.err];
      return i.result;
    }
    (Ka.prototype.push = function (t, e) {
      const i = this.strm,
        r = this.options.chunkSize,
        n = this.options.dictionary;
      let s, a, o;
      if (this.ended) return !1;
      for (
        a = e === ~~e ? e : !0 === e ? ja : Va,
          "[object ArrayBuffer]" === Ga.call(t)
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
            s = La.inflate(i, a),
            s === Wa &&
              n &&
              ((s = La.inflateSetDictionary(i, n)),
              s === qa ? (s = La.inflate(i, a)) : s === Za && (s = Wa));
          i.avail_in > 0 && s === Ya && i.state.wrap > 0 && 0 !== t[i.next_in];

        )
          La.inflateReset(i), (s = La.inflate(i, a));
        switch (s) {
          case Xa:
          case Za:
          case Wa:
          case Ja:
            return this.onEnd(s), (this.ended = !0), !1;
        }
        if (((o = i.avail_out), i.next_out && (0 === i.avail_out || s === Ya)))
          if ("string" === this.options.to) {
            let t = Ws(i.output, i.next_out),
              e = i.next_out - t,
              n = Ys(i.output, t);
            (i.next_out = e),
              (i.avail_out = r - e),
              e && i.output.set(i.output.subarray(t, t + e), 0),
              this.onData(n);
          } else
            this.onData(
              i.output.length === i.next_out
                ? i.output
                : i.output.subarray(0, i.next_out)
            );
        if (s !== qa || 0 !== o) {
          if (s === Ya)
            return (
              (s = La.inflateEnd(this.strm)),
              this.onEnd(s),
              (this.ended = !0),
              !0
            );
          if (0 === i.avail_in) break;
        }
      }
      return !0;
    }),
      (Ka.prototype.onData = function (t) {
        this.chunks.push(t);
      }),
      (Ka.prototype.onEnd = function (t) {
        t === qa &&
          ("string" === this.options.to
            ? (this.result = this.chunks.join(""))
            : (this.result = Gs(this.chunks))),
          (this.chunks = []),
          (this.err = t),
          (this.msg = this.strm.msg);
      });
    var Qa = {
      Inflate: Ka,
      inflate: $a,
      inflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), $a(t, e);
      },
      ungzip: $a,
      constants: jn,
    };
    const { Deflate: to, deflate: eo, deflateRaw: io, gzip: ro } = oa,
      { Inflate: no, inflate: so, inflateRaw: ao, ungzip: oo } = Qa;
    var lo = so;
    const ho = class {
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
    class uo {
      static a(t) {
        const e = 32767 & t;
        return e < co.length
          ? co[e]
          : (WH.debug("Unknown shader effect:", e),
            ["PS_Combiners_Opaque", "VS_Diffuse_T1"]);
      }
      static b(t, e) {
        var i = "";
        if (-1e3 == t && 3 == e) return "Skin";
        if (32768 & t) return uo.a(t)[0];
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
          if (32768 & t) return uo.a(t)[1];
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
        var r = uo.b(t, e),
          n = uo.c(t, e);
        WH.debug("ShaderId", t, "OpCount", e, "PS:", r, "VS:", n);
        var s = "Wow." + n + "_" + r;
        if (ve._GetProgram(s)) return { name: s };
        var a = {
          shaders: [uo.f(n), uo.g(r, i)],
          attributes: {
            position: "aPosition",
            normal: "aNormal",
            texcoord0: "aTexCoord0",
            texcoord1: "aTexCoord1",
          },
        };
        return ve.RegisterProgram(s, a), { name: s };
      }
      static e(t) {
        var e = {},
          i = {
            texcoord1: function (t, e) {
              t.INPUT_TEXCOORD1 = "aTexCoord" + e;
            },
          };
        for (var r in t.options) {
          var n = t.options[r];
          i[r](e, n);
        }
        return { name: "Wow." + t.name, config: e };
      }
      static f(t) {
        var e = "";
        if (
          ((e +=
            "vTexCoord1 = (uTextureMatrix1 * vec4(aTexCoord0, 0, 1)).st;\n"),
          (e +=
            "vTexCoord2 = (uTextureMatrix2 * vec4(aTexCoord1, 0, 1)).st;\n"),
          "VS" === t.substr(0, 2))
        ) {
          var i = (t = t.substr(3)).split("_"),
            r = i[0];
          if ("Diffuse" === r || "Color" === r) {
            (e = ""), i.splice(0, 1);
            var n = {
                T1: ["uTextureMatrix1", "aTexCoord0"],
                T2: ["uTextureMatrix2", "aTexCoord1"],
                T3: ["", "aTexCoord2"],
                Env: ["", "texEnv"],
              },
              s = 1;
            for (var a in i)
              n[i[a]]
                ? (n[i[a]][0] && "texEnv" != n[i[a]][1]
                    ? (e +=
                        "vTexCoord" +
                        s +
                        " = (" +
                        n[i[a]][0] +
                        " * vec4(" +
                        n[i[a]][1] +
                        ", 0, 1)).st;\n")
                    : "texEnv" == n[i[a]][1]
                    ? (e += "vTexCoord" + s + " = texEnv;\n")
                    : (e +=
                        "vTexCoord" +
                        s +
                        " = (uTextureMatrix" +
                        s +
                        " * vec4(" +
                        n[i[a]][1] +
                        ", 0, 1)).st;\n"),
                  s++)
                : WH.debug("Missing vertex shader def?", t);
          }
        }
        return (
          "            attribute vec3 aPosition;\n            attribute vec3 aNormal;\n            attribute vec2 aTexCoord0;\n            attribute vec2 aTexCoord1;\n            attribute vec3 aColor;\n            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform mat4 uModelMatrix;\n            uniform mat4 uPanningMatrix;\n            uniform mat4 uViewMatrix;\n            uniform mat4 uProjMatrix;\n            uniform mat4 uTextureMatrix1;\n            uniform mat4 uTextureMatrix2;\n            uniform mat4 uTextureMatrix3;\n            uniform mat4 uTextureMatrix4;\n            uniform vec3 uCameraPos;\n            uniform bool uHasTexture1;\n            uniform bool uHasTexture2;\n            uniform bool uHasTexture3;\n            uniform bool uHasTexture4;\n            \n            vec2 sphereMap(vec3 vertex, vec3 normal)\n            {\n               vec3 normPos = -(normalize(vertex.xyz));\n               vec3 temp = (normPos - (normal * (2.0 * dot(normPos, normal))));\n               temp = vec3(temp.x, temp.y, temp.z + 1.0);\n               vec2 texCoord = ((normalize(temp).xy * 0.5) + vec2(0.5));\n               return texCoord;\n            }\n            void main(void) {\n              vec4 pos = uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n              vPosition = pos.rgb;\n              vNormal = normalize(mat3(uViewMatrix * uModelMatrix) * aNormal);\n              vec2 texEnv = sphereMap(pos.xyz,vNormal.xyz);\n              gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1);\n            \n            " +
          e +
          "\n              vNormal = mat3(uViewMatrix * uModelMatrix) * aNormal;            }"
        );
      }
      static g(t, e) {
        var i = fo[t];
        i ||
          (WH.debug("Missing pixel shader def", t),
          (i = fo[(t = "PS_Combiners_Opaque_Mod")]));
        for (
          var r = "\t\t" + i.slice(1, i.length).join("\n\t\t"), n = 0;
          n < i[0];
          n++
        ) {
          var s = n + 1;
          r =
            "vec4 tex" +
            n +
            " = texture2D(uTexture" +
            s +
            ", vTexCoord" +
            s +
            ".st);\n" +
            r;
        }
        return (
          "            precision mediump float;            \n            varying vec3 vPosition;\n            varying vec3 vNormal;\n            varying vec2 vTexCoord1;\n            varying vec2 vTexCoord2;\n            varying vec2 vTexCoord3;\n            varying vec2 vTexCoord4;\n            \n            uniform bool uHasTexture1;\n            uniform bool uHasTexture2;\n            uniform bool uHasTexture3;\n            uniform bool uHasTexture4;\n            uniform bool uHasAlpha;\n            uniform bool uHasSpecEmiss;\n            uniform bool uHasEmissiveGlowing;\n            uniform int uBlendMode;\n            uniform bool uUnlit;\n            uniform vec4 uColor;\n            uniform vec4 uAmbientColor;\n            uniform vec4 uDiffuseColor;\n            uniform vec4 uPrimaryColor;\n            uniform vec4 uSecondaryColor;\n            uniform vec3 uLightDir1;\n            uniform vec3 uLightDir2;\n            uniform vec3 uLightDir3;\n            uniform sampler2D uTexture1;\n            uniform sampler2D uTexture2;\n            uniform sampler2D uTexture3;\n            uniform sampler2D uTexture4;\n            uniform sampler2D uAlpha;\n            uniform vec4 uTexSampleAlpha;\n            \n            void main(void) {\n            vec4 _output = vec4(1.0);\n            vec4 _input = uColor;\n            vec3 _specular = vec3(0.0);            " +
          r +
          "\n            \n            if (uBlendMode == 13) {\n                _output.a = _output.a * _input.a;\n            } else if (uBlendMode == 1) {\n                if (_output.a < (128.0/255.0))\n                    discard;\n                _output.a = _input.a;\n            } else if (uBlendMode == 0) {\n                _output.a = _input.a;\n            } else {\n                _output.a = _output.a * _input.a;\n            }\n            // if (uBlendMode > 1) {\n            //     if (_output.a < (1.0/255.0)) {\n            //         discard;\n            //     }\n            // }\n            if (!uUnlit) {                vec4 litColor = uAmbientColor;                vec3 normal = normalize(vNormal);                                float dp = max(0.0, dot(normal, uLightDir1));                litColor += uPrimaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir2));                litColor += uSecondaryColor * dp;                                dp = max(0.0, dot(normal, uLightDir3));                litColor += uSecondaryColor * dp;                                litColor = clamp(litColor, vec4(0,0,0,0), vec4(1,1,1,1));                _output *= (litColor * uDiffuseColor);            }            _output += vec4(_specular, 0.0);            gl_FragColor = _output.xyzw;\n            }"
        );
      }
    }
    const co = [
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
          "PS_Unknown_34821",
          "VS_Diffuse_EdgeFade_T1_T2",
          "HS_T1_T2",
          "DS_T1_T2",
        ],
      ],
      fo = {
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
          "_specular = tex2.rgb * tex2.a * uTexSampleAlpha.b; ",
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
        PS_Unknown_34821: [
          2,
          "_output.rgb = (_input.rgb * tex0.rgb) * tex1.rgb;",
          "_output.a = tex0.a * tex1.a;",
        ],
      },
      bo = uo;
    const go = class {
        constructor() {
          (this.h = !1), (this.i = !0);
        }
      },
      _o = [0, 1, 2, 10, 3, 4, 5, 13];
    const po = class {
      constructor(t) {
        (this.E = !1), (this.F = !1);
        var e = this;
        (e.a = t.getUint8()),
          (e.b = t.getInt8()),
          (e.c = t.getUint16()),
          (e.d = t.getUint16()),
          (e.e = t.getUint16()),
          (e.f = t.getInt16()),
          (e.g = t.getUint16()),
          (e.h = t.getUint16()),
          (e.i = t.getUint16()),
          (e.j = t.getInt16()),
          (e.k = t.getUint16()),
          (e.l = t.getInt16()),
          (e.m = t.getInt16()),
          (e.n = !0),
          (e.o = null),
          (e.p = null),
          (e.q = 0),
          (e.r = null),
          (e.s = []),
          (e.t = []),
          (e.u = new Array()),
          (e.v = null),
          (e.w = []),
          (e.x = !1),
          (e.y = !1),
          (e.z = !1),
          (e.A = rr()),
          (e.B = ye()),
          (e.C = Ar());
      }
      K(t) {
        var e = this;
        (e.o = t), (e.p = t.at[e.d]), (e.q = e.p.a), ho.c(e);
        let i = this.o.ay[e.j];
        1 == this.i &&
          i > -1 &&
          1 == this.o.ax[i].c &&
          ((this.c = -1e3), (this.i = 3));
        const r = bo.d(e.c, e.i, e.r);
        e.H = r;
        for (let i = 0; i < e.i; i++) {
          if (e.j > -1 && e.j < t.ay.length) {
            let r = t.ay[e.j + i];
            r > -1 && r < t.ax.length && e.s.splice(i, 0, t.ax[r]);
          }
          if (e.m > -1 && e.m < t.aA.length) {
            let r = t.aA[e.m + i];
            r > -1 && t.az && r < t.az.length
              ? e.t.splice(i, 0, t.az[r])
              : e.t.splice(i, 0, null);
          }
          if (e.l > -1 && e.l < t.aG.length) {
            let r = t.aG[e.l + i];
            r > -1 && r < t.aF.length
              ? e.w.splice(i, 0, t.aF[r])
              : e.w.splice(i, 0, null);
          }
        }
        this.u = new Array(e.t.length);
        for (let t = 0; t < this.u.length; t++) this.u[t] = We();
        e.E && ((e.s = e.s.reverse()), (e.t = e.t.reverse())),
          t.aE && e.f > -1 && e.f < t.aE.length && (e.v = t.aE[e.f]),
          (e.D = this.r.b > 1);
      }
      L() {
        const t = this,
          e = t.o.aT.context,
          i = ve.GetProgram(e, t.H.name, t.H.config);
        (t.G = i), (t.H = i.program), (t.I = i.uniforms);
      }
      M() {
        let t = sr(this.p.i[0], this.p.i[1], this.p.i[2], 1),
          e = this.o.aq[this.p.g].m,
          i = We();
        $e(i, i, this.o.aX.uViewMatrix),
          $e(i, i, this.o.V),
          $e(i, i, e),
          fr(t, t, i),
          (t[3] = 0);
        let r = dr(t);
        if ((3 & this.a) > 0) {
          let e = rr();
          r > 0 ? hr(e, t, 1 / r) : ar(e, t),
            hr(e, e, Ee(Ce(i[8], i[9], i[10])) * this.p.j),
            1 & this.a ? lr(e, t, e) : or(e, t, e),
            (r = ur(e));
        }
        return r;
      }
      N(t) {
        const e = this,
          i = e.o,
          r = e.o.aT.context,
          n = e.o.S;
        if ((e.G || e.L(), !e.G.program)) return;
        if (
          (this.J ||
            ((this.J = new go()),
            (this.J.a = e.G),
            (this.J.b = Object.assign({}, i.aX))),
          (this.J.c = i.aV),
          (this.J.d = i.aW),
          (this.J.b = Object.assign({}, i.aX)),
          (e.A[0] = e.A[1] = e.A[2] = e.A[3] = 1),
          e.v && e.v.g(n, e.o.aY, e.A),
          e.w[0] && (e.A[3] *= e.w[0].d(n, e.o.aY)),
          e.A[3] <= 0.001)
        )
          return;
        let s = e.r.b;
        const a = [0, 0, 0];
        for (let t = 0; t < e.w.length; t++) {
          const i = e.w[t];
          i && (a[t] = i.d(n, e.o.aY));
        }
        (this.J.b.uColor = e.A),
          (this.J.b.uTexSampleAlpha = sr(a[0], a[1], a[2], 0)),
          (this.J.b.uBlendMode = s),
          (this.J.b.uHasSpecEmiss = i.aK && i.aK.h),
          (this.J.b.uHasEmissiveGlowing = i.o == mi || i.o == vi),
          (this.J.e = _o[s]),
          (this.J.i = !this.o.bZ),
          (this.J.b.uUnlit = e.x ? 1 : 0),
          (this.J.n = this.M()),
          (this.J.m = this.b),
          (this.J.o = this.h);
        const o = this.O();
        let l = !0;
        for (const t in o) {
          const e = o[t],
            i = e.a && e.a.d;
          (l = l && (null == e.a || null != i)), i && (this.J.b[e.c] = i);
        }
        l && !e.F && (e.F = !0),
          e.t.forEach((t, i) => {
            if (!e.o.T && (Je(e.u[i]), e.t[i])) {
              let t = !1,
                r = !1;
              e.t[i].a && e.t[i].a.c(n.a.a)
                ? ((e.B = e.t[i].a.d(n, e.o.aY)), (r = !0))
                : Me(e.B, 0, 0, 0),
                e.t[i].b && e.t[i].b.c(n.a.a)
                  ? ((e.C = e.t[i].b.d(n, e.o.aY)), (t = !0))
                  : Ur(e.C, 0, 0, 0, 1);
              let s,
                a = !1;
              if (
                (e.t[i].c &&
                  e.t[i].c.c(n.a.a) &&
                  ((s = e.t[i].c.d(n, e.o.aY)), (a = !0)),
                Je(e.u[i]),
                Qe(e.u[i], e.u[i], Ce(0.5, 0.5, 0)),
                a && ti(e.u[i], e.u[i], s),
                t)
              ) {
                let t = We();
                si(t, e.C, [0, 0, 0]), $e(e.u[i], e.u[i], t);
              }
              r && Qe(e.u[i], e.u[i], e.B),
                Qe(e.u[i], e.u[i], Ce(-0.5, -0.5, 0));
            }
            this.J.b["uTextureMatrix" + (i + 1).toString()] = e.u[i];
          }),
          (this.J.h = e.y),
          (this.J.f = !e.z),
          (this.J.j = r.TRIANGLES),
          (this.J.l = 2 * e.p.e),
          (this.J.k = e.p.f),
          t.push(this.J);
      }
      O() {
        let t = 0;
        const e = [];
        this.s.forEach((i, r) => {
          const n = r;
          let s = null;
          if (this.s[n])
            if (this.s[0] && 1 == this.s[0].c && r > 0)
              1 == r
                ? (s =
                    this.o.aK && this.o.aK.b
                      ? { d: this.o.aK.b }
                      : { d: this.o.aT.blackPixelTexture })
                : 2 == r &&
                  (s =
                    this.o.aK && this.o.aK.c
                      ? { d: this.o.aK.c }
                      : { d: this.o.aT.blackPixelTexture });
            else if (1 == this.s[n].c)
              this.o.aL
                ? (s = this.o.aL.a)
                : this.o.aK && this.o.aK.a && (s = { d: this.o.aK.a });
            else if (this.s[n].f) s = this.s[n].f;
            else if (
              (((this.o.a.type < 8 || this.o.a.type > 32) &&
                2 == this.s[n].c) ||
                [2, 11, 12, 13].includes(this.s[n].c)) &&
              this.o.C[this.s[n].b]
            )
              s = this.o.C[this.s[n].b];
            else if (-1 != this.s[n].c && this.o.C[this.s[n].c])
              s = this.o.C[this.s[n].c];
            else if (-1 != this.s[n].c && this.o.D[this.s[n].c][n])
              s = this.o.D[this.s[n].c][n].a;
            else if (8 == this.s[n].c && this.o.w)
              s = this.o.w.D[this.s[n].c][0].a;
            else if (!this.s[n].e && this.j + t < this.o.ax.length) {
              let e = this.o.ax[this.j + t];
              e && e.f && (s = e.f);
            } else
              this.s[n].g ||
                WH.debug(
                  "can't find texture for material",
                  n,
                  "type",
                  this.s[n].c
                ),
                (this.s[n].g = !0);
          (e[n] = s), t++;
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
      P() {
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
    const mo = class {
      constructor(t, e, i) {
        var r = this;
        t.aT.context;
        0 == i && console.log("Texture file is 0"),
          (r.b = t),
          (r.c = t.l.contentPath + "textures/" + i + ".png"),
          (r.d = null),
          (r.f = !1),
          (function (t, e) {
            (t.a = new Image()),
              (t.a.crossOrigin = ""),
              (t.a.onload = function () {
                t.i();
              }),
              (t.a.onerror = function () {
                t.a = null;
              }),
              (t.a.src = t.c);
          })(r);
      }
      g() {
        return this.f;
      }
      h() {
        var t = this;
        if (t.b) {
          var e = t.b.aT.context;
          t.d && e.deleteTexture(t.d), (t.d = null), (t.b = null);
        }
      }
      i() {
        var t = this;
        if (t.b) {
          var e = t.b.aT.context;
          (t.d = e.createTexture()),
            e.bindTexture(e.TEXTURE_2D, t.d),
            e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
            e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.a),
            r(t.a.width) && r(t.a.height)
              ? e.generateMipmap(e.TEXTURE_2D)
              : (e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_S,
                  e.CLAMP_TO_EDGE
                ),
                e.texParameteri(
                  e.TEXTURE_2D,
                  e.TEXTURE_WRAP_T,
                  e.CLAMP_TO_EDGE
                ),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR));
          var i = t.b.aT.aniFilterExt;
          i &&
            e.texParameteri(
              e.TEXTURE_2D,
              i.TEXTURE_MAX_ANISOTROPY_EXT,
              t.b.aT.aniFilterMax
            ),
            (t.f = !0);
        }
        function r(t) {
          return 0 == (t & (t - 1));
        }
      }
    };
    const vo = class {
      constructor(t, e, i) {
        var r = this;
        (r.a = t),
          (r.b = e),
          (r.c = i.getInt32()),
          (r.d = i.getUint32()),
          (r.e = i.getUint32()),
          (r.f = null),
          (r.g = !1),
          r.i();
      }
      h() {
        var t = this;
        (t.a = null), t.f && t.f.h(), (t.f = null);
      }
      i() {
        var t = this;
        0 != t.e && (t.f = new mo(t.a, 0, t.e));
      }
    };
    const xo = class {
      constructor(t) {
        (this.a = new Xr(t, Nr)),
          (this.b = new Xr(t, Lr)),
          (this.c = new Xr(t, Nr));
      }
      d() {
        var t = this;
        t.a && (t.a.e(), (t.a = null)),
          t.b && (t.b.e(), (t.b = null)),
          t.c && (t.c.e(), (t.c = null));
      }
    };
    const To = class {
      constructor(t) {
        var e = this;
        (e.a = t.getInt32()),
          (e.b = t.getInt32()),
          (e.c = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (e.d = -1);
      }
      e() {
        this.c = null;
      }
    };
    const wo = class {
      constructor(t) {
        (this.a = new Xr(t, Nr)), (this.b = new Xr(t, Hr));
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
        i ? (i[0] = i[1] = i[2] = i[3] = 1) : (i = sr(1, 1, 1, 1));
        let n = Ce(1, 1, 1);
        return (
          r.d(t.a.a) && r.a.d(t, e, n, n),
          r.e(t.a.a) && (i[3] = r.b.d(t, e, i[3]) / 32767),
          (i[0] = n[0]),
          (i[1] = n[1]),
          (i[2] = n[2]),
          i
        );
      }
    };
    const yo = class {
      constructor(t) {
        this.a = new Xr(t, Hr);
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
    const Ao = class {
      constructor() {
        (this.a = 0),
          (this.b = 0),
          (this.c = -1),
          (this.d = null),
          (this.e = null);
      }
    };
    class Eo extends Ao {}
    const Co = class {
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
                this.a.W = sr(
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
                this.a.W = sr(
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
          let i = this.a.bX(e);
          if (
            ((this.c[t] = new Eo()),
            (this.c[t].d = i),
            (this.c[t].c = i ? i.b : -1),
            0 == this.b[t].ModelType)
          ) {
            let e = {
              type: di.PATH,
              id: this.b[t].Model,
              parent: this.a,
              shoulder: -1,
            };
            this.c[t].e = new cl(this.a.aT, this.a.l, e, 0, !1, !0, !1);
          } else if (1 == this.b[t].ModelType) {
            let e = this.a.o > 0 ? this.a.o : 1,
              i = -1 != this.a.p ? this.a.p : 0;
            (this.a.o = e),
              (this.a.p = i),
              (this.c[t].ba = new Do(
                this.a,
                this.b[t].InvType,
                this.b[t].Model,
                e,
                i
              ));
          } else if (2 == this.b[t].ModelType) {
            let e = {
              type: di.NPC,
              id: this.b[t].Model,
              parent: this.a,
              shoulder: -1,
            };
            this.c[t].e = new cl(this.a.aT, this.a.l, e, 0, !1, !0, !1);
          }
        }
        if (!(0 != this.b[t].ModelType || (this.c[t].e && this.c[t].e.d)))
          return;
        if (!(1 != this.b[t].ModelType || (this.c[t].ba && this.c[t].ba.m)))
          return;
        if (!(2 != this.b[t].ModelType || (this.c[t].e && this.c[t].e.d)))
          return;
        let i = We();
        ri(i, i, -this.b[t].Yaw),
          ii(i, i, this.b[t].Pitch),
          ei(i, i, this.b[t].Roll),
          ti(i, i, [this.b[t].Scale1, this.b[t].Scale1, this.b[t].Scale1]),
          ti(i, i, [this.b[t].Scale2, this.b[t].Scale2, this.b[t].Scale2]);
        let r = We();
        if (this.c[t].d) {
          let e = this.c[t].d.c;
          $e(r, r, this.a.aq[this.c[t].c].m), Qe(r, r, Ce(e[0], e[1], e[2]));
        }
        if (
          (Qe(
            r,
            r,
            Ce(this.b[t].Offset[0], -this.b[t].Offset[1], this.b[t].Offset[2])
          ),
          $e(r, r, i),
          0 == this.b[t].ModelType)
        ) {
          let i = this.c[t].e;
          i.setAnimPaused(this.d), i.bu(this.a.V, r, null, null), i.ca(e);
        } else if (1 == this.b[t].ModelType)
          for (let i = 0; i < this.c[t].ba.i.length; i++) {
            let n = this.c[t].ba.i[i].e;
            n.d &&
              (n.setAnimPaused(this.d), n.bu(this.a.V, r, null, null), n.ca(e));
          }
        else if (2 == this.b[t].ModelType) {
          let i = this.c[t].e;
          i.setAnimPaused(this.d), i.bu(this.a.V, r, null, null), i.ca(e);
        }
      }
    };
    const So = class {
      constructor(t, e, i) {
        var r = this;
        (r.a = t), (r.d = e), (r.b = []), (r.c = !1), (r.f = []), i && r.h(i);
      }
      g() {
        var t = this;
        if (((t.a = null), t.b)) {
          for (var e = 0; e < t.b.length; ++e) {
            var i = t.b[e];
            i && (i.e && i.e.bb(), (i.e = null), (i.d = null), (t.b[e] = null));
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
            let n = t.ItemEffects[r];
            if (-1 == n.SubClass || this.d == n.SubClass) {
              if (n.Model) {
                e.b[n.Slot - 1] = new Ao();
                var i = {
                  type: di.PATH,
                  id: n.Model,
                  parent: e.a,
                  shoulder: -1,
                };
                e.b[n.Slot - 1].e = new cl(e.a.aT, e.a.l, i, 0, !1, !0, !1);
              }
              n.kit && (this.a.F, this.a.F.push(new Co(this.a, n.kit.effects)));
            }
          }
        for (var r = 0; r < e.b.length; ++r)
          if (t.Equipment[r] && null == e.b[r]) {
            e.b[r] = new Ao();
            i = {
              type: di.PATH,
              id: t.Equipment[r],
              parent: e.a,
              shoulder: -1,
            };
            e.b[r].e = new cl(e.a.aT, e.a.l, i, r, !1, !0, !1);
          }
        (e.c = !0), e.a.bJ();
      }
      j(t) {
        if (this.a.d) {
          for (var e = 0; e < this.f.length; e++) this.f[e].g(t);
          for (var i = 0; i < this.b.length; i++) {
            var r = this.b[i];
            if (r) {
              let e = Ce(0, 0, 0);
              if ((i >= 5 || (r && r.d && (e = r.d.c)), -1 != r.c)) {
                let i = this.a.aq[r.c].m;
                r.e.bu(this.a.V, i, e, null), r.e.ca(t);
              }
            }
          }
        }
      }
    };
    class Mo {
      static a(t, e, i, r, n) {
        let s = [
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
          if (n > 0 && h == n) d = 0;
          else if (h > 0) continue;
          s[u + 3 * (d + 2 * (c + f))] = a.FileDataId;
        }
        for (let t = 0; t < 2; t++)
          for (let e = 0; e < 2; e++)
            for (let i = 0; i < 2; i++) {
              let r = 3 * (t + 2 * (e + 2 * i));
              if (s[r] > 0) {
                let t;
                return (t = { a: s[r], b: s[r + 1], c: s[r + 2] }), t;
              }
            }
        if (t) {
          let s = t.bT(i, n, !0);
          if (s && 0 != s[0])
            return (n = s[0]), (i = s[1]), Mo.a(t, e, i, r, n);
        }
        return null;
      }
      static b(t, e, i, r, n, s) {
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
          if (n > 0 && h == n) d = 0;
          else if (h > 0) continue;
          let b = 1;
          if (s > 0 && u == s) b = 0;
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
                let n = r + 2 * (t + 2 * (e + 2 * i));
                if (a[n]) return a[n];
              }
        if (t) {
          var o = t.bT(r, s, !1);
          if (o && 0 != o[0])
            return (s = o[0]), (r = o[1]), Mo.b(t, e, i, r, n, s);
        }
        return 0;
      }
    }
    const Do = class {
      constructor(t, e, i, r, n) {
        (this.q = null),
          (this.r = []),
          WH.debug("Creating item", i),
          (this.a = t),
          (this.b = e),
          (this.s = i),
          (this.t = r),
          (this.u = n),
          (this.e = Ti[e]),
          (this.f = wi[e]),
          (this.i = null),
          (this.j = null),
          (this.k = null),
          (this.g = 0),
          (this.h = 0),
          (this.m = !1),
          (this.n = !1),
          (this.o = 0),
          (this.p = 3),
          i && this.y();
      }
      x() {
        var t = this;
        if (t.i) {
          for (let e = 0; e < t.i.length; ++e)
            t.i[e].e && t.i[e].e.bb(),
              (t.i[e].e = null),
              (t.i[e].d = null),
              (t.i[e] = null);
          t.i = null;
        }
        if (t.j) {
          for (let e = 0; e < t.j.length; ++e)
            t.j[e].texture && t.j[e].texture.h(),
              (t.j[e].texture = null),
              (t.j[e] = null);
          t.j = null;
        }
        if (((t.k = null), (t.l = null), t.r)) {
          for (let e = 0; e < t.r.length; e++) t.r[e].g();
          t.r = null;
        }
        (t.m = !1),
          t.q && (t.q.bb(), (t.q = null)),
          t.a && (t.a.bD(), (t.a = null)),
          WH.debug("Destroyed item", this.s);
      }
      y() {
        let t = this;
        WH.debug("Loading item", this.s);
        let e = "meta/item/";
        const i = this.b;
        (i != Ei &&
          i != Ci &&
          i != Si &&
          i != Mi &&
          i != Di &&
          i != ki &&
          i != Fi &&
          i != Ri &&
          i != Ii &&
          i != Oi &&
          i != Bi &&
          i != Ni) ||
          (e = "meta/armor/" + i + "/");
        let r = t.a.l.contentPath + e + t.s + ".json";
        $.getJSON(r)
          .done(function (e) {
            t.z(e);
          })
          .fail(function (e, i, r) {
            let n = i + ", " + r;
            WH.debug("Error loading item metadata", t.s, n), (t.n = !0);
          });
      }
      z(t) {
        if (!this.a)
          return void WH.debug(
            "Item was destroyed before it was loaded",
            this.s
          );
        if (
          ((this.h = parseInt(t.Item.Flags)),
          (this.g = parseInt(t.Item.InventoryType)),
          (this.c = parseInt(t.Item.ItemClass)),
          (this.d = parseInt(t.Item.ItemSubClass)),
          t.ComponentTextures)
        ) {
          this.j = [];
          for (let e in t.ComponentTextures) {
            const i = parseInt(e),
              r = Mo.a(
                this.a,
                t.TextureFiles[t.ComponentTextures[e]],
                this.a.p,
                this.a.q,
                this.a.o
              );
            if (r) {
              let t;
              (t = { region: i, gender: this.a.p, file: r.a, texture: null }),
                i != Ki
                  ? (t.texture = new mo(this.a, i, r.a))
                  : this.b == Oi && (this.a.C[2] = new mo(this.a, 2, r.a)),
                this.j.push(t);
            }
          }
        }
        if (
          ((this.k = t.Item.GeosetGroup),
          (this.l = t.Item.AttachGeosetGroup),
          this.b == Ei)
        ) {
          0 == this.a.p
            ? (this.v = t.Item.HideGeosetMale)
            : (this.w = t.Item.HideGeosetFemale);
        }
        if (
          (this.b == Ci
            ? (this.i = new Array(2))
            : Ai[this.b] != di.ARMOR && (this.i = new Array(1)),
          this.i)
        )
          for (let e = 0; e < this.i.length; ++e) {
            const i = {
                race: this.t,
                gender: this.u,
                bone: -1,
                attachment: null,
                model: null,
              },
              r = { type: Ai[this.b], id: this.s, parent: this.a, shoulder: 0 };
            this.b == Ci && (r.shoulder = e + 1),
              (i.e = new cl(this.a.aT, this.a.l, r, e, !1, !1, !0)),
              (i.e.o = this.t),
              (i.e.p = this.u),
              i.e.bU(t, r.type),
              (this.i[e] = i);
          }
        if ((this.b == Di || this.b == Oi) && t.ComponentModels) {
          let e = 0;
          if ((this.b == Oi && (e = 1), t.ComponentModels[e])) {
            const i = {
                type: Ai[this.b],
                id: this.s,
                parent: this.a,
                shoulder: 0,
              },
              r = new cl(this.a.aT, this.a.l, i, 0, !1, !1, !0);
            r.v = t;
            const n = {
              race: 0,
              gender: 0,
              bone: -1,
              attachment: null,
              model: null,
            };
            (n.e = r), (this.i = [n]);
            let s = 1,
              a = 0,
              o = 1;
            this.a && ((s = this.a.o), (a = this.a.p), (o = this.a.q));
            const l = t.ComponentModels[e],
              h = Mo.b(r, t.ModelFiles[l], -1, a, o, s);
            if (h) {
              r.bS(di.PATH, h);
              const i = 0 == e ? t.Textures : t.Textures2;
              if (i)
                for (let t in i)
                  0 != i[t] && (r.C[+t] = new mo(r, parseInt(t), i[t]));
            }
          }
        }
        const e = this.b;
        if (
          (e == Si ||
            e == Mi ||
            e == Ni ||
            e == Di ||
            e == ki ||
            e == Ii ||
            e == Fi ||
            e == Ei ||
            e == Oi) &&
          t.ComponentModels
        ) {
          let i = 0;
          if (((e != Ei && e != Di) || (i = 1), t.ComponentModels[i])) {
            const r = t.ComponentModels[i];
            if (r && t.ModelFiles && t.ModelFiles[r]) {
              const n = {
                  type: Ai[e],
                  id: this.s,
                  parent: this.a,
                  shoulder: 0,
                },
                s = new cl(this.a.aT, this.a.l, n, 0, !1, !1, !0);
              s.v = t;
              let a = 1,
                o = 0,
                l = 1;
              this.a && ((a = this.a.o), (o = this.a.p), (l = this.a.q));
              const h = Mo.b(s, t.ModelFiles[r], -1, o, l, a);
              if (h) {
                (this.q = s), s.bS(di.PATH, h);
                const e = 0 == i ? t.Textures : t.Textures2;
                if (e)
                  for (let t in e)
                    0 != e[t] && (s.C[+t] = new mo(s, parseInt(t), e[t]));
              }
            }
          }
        }
        if ((e == ki && this.k[2] > 0 && (this.f += 2), 0 != this.o)) {
          const t = 2 == this.c ? this.d : -1;
          for (let e = 0; e < this.i.length; e++)
            this.r.push(new So(this.i[e].e, t, this.o));
        }
        this.a.bJ(), (this.m = !0), WH.debug("Loaded item", this.s);
      }
      A(t) {
        for (let t = 0; t < this.r.length; t++) this.r[t].g();
        (this.r = []), (this.o = t);
      }
      B(t) {
        this.p = t;
      }
      C(t) {
        if (!this.i) return;
        if (this.a.d) {
          const t = this.a.bP(this.e, this);
          for (let e = 0; e < this.i.length; ++e)
            if (this.i[e] && t.length > e) {
              let i = this.a.aC[t[e]];
              if (
                ((this.i[e].c = i.b),
                (this.i[e].d = i),
                this.r[e] && this.r[e].b)
              ) {
                const t = this.i[e].e;
                for (let r = 0; r < this.r[e].b.length; r++)
                  if (t.aC && this.r[e].b[r]) {
                    if (r < 5) {
                      if (!t.aC[r]) continue;
                      i = t.aC[r];
                    } else i = t.bX(19);
                    (this.r[e].b[r].c = i.b), (this.r[e].b[r].d = i);
                  }
              }
            }
        }
        let e = We(),
          i = ye();
        for (let r = 0; r < this.i.length; ++r) {
          const n = this.i[r];
          if (n && n.e) {
            if (this.b == Ci) {
              if (1 == n.e.a.shoulder && 0 == (1 & this.p)) continue;
              if (2 == n.e.a.shoulder && 0 == (2 & this.p)) continue;
            }
            if (n.c > -1 && n.c < this.a.aq.length) {
              this.r[r] && n.e.d && this.r[r].j(t);
              let s = !1,
                a = ui[n.e.a.id];
              if (
                (Je(e),
                a && (Me(i, 1, 1, -1), ti(e, e, i), (s = !0)),
                (this.b != Hi && this.b != Gi && this.e != Hi) ||
                  0 == (256 & this.h) ||
                  (Me(i, 1, -1, 1), ti(e, e, i), (s = !0), (n.e.i = !0)),
                (n.e.bZ = s),
                5 == this.a.I &&
                  this.b == Vi &&
                  2 == this.c &&
                  18 == this.d &&
                  (Je(e), ei(e, e, -Math.PI / 2)),
                27 == this.b)
              ) {
                let t = n.e.v.Scale;
                Me(i, t, t, t), ti(e, e, i);
              }
              n.e.bu(this.a.V, this.a.aq[n.c].m, n.d.c, e), n.e.bY(), n.e.ca(t);
            } else -1 == n.c && this.a.bI(n.e, t);
          }
        }
      }
    };
    const ko = class {
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
    const Fo = class {
      constructor() {
        (this.a = 0),
          (this.b = 0),
          (this.c = 0),
          (this.d = 0),
          (this.e = ye()),
          (this.f = 0),
          (this.g = 0),
          (this.h = 0),
          (this.i = 0),
          (this.j = 0);
      }
    };
    const Ro = class {
      constructor(t, e) {
        (this.b = t), (this.c = e), (this.a = new Fo());
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
        Se(t, this.a.e);
      }
    };
    const Io = class extends Ro {
      k(t, e) {
        let i,
          r = e * this.b.f(),
          n = this.b.e();
        (i = n < 1 ? (n > -1 ? Math.trunc(32767 * n + 0.5) : -32767) : 32767),
          (t.d = i);
        let s = this.g(i);
        s < 0.001 && (s = 0.001),
          (t.b = (function (t, e) {
            let i = Math.abs(t),
              r = Math.abs(e);
            return (
              Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t)
            );
          })(r, s)),
          (t.e = 65535 & this.b.d()),
          Me(t.a, this.b.e() * this.a.g * 0.5, this.b.e() * this.a.h * 0.5, 0);
        let a = this.h(),
          o = this.a.f;
        if (o < 0.001) {
          let e = this.a.i * this.b.e(),
            i = this.a.j * this.b.e(),
            r = Math.sin(e),
            n = Math.sin(i),
            s = Math.cos(e),
            o = Math.cos(i);
          Me(t.c, o * r * a, n * r * a, s * a);
        } else {
          let e = ye();
          Se(e, t.a),
            (e[2] = e[2] - o),
            Ee(e) > 1e-4 && (Be(e, e), Ue(t.c, e, a));
        }
      }
    };
    const Uo = class extends Ro {
      constructor(t, e, i) {
        super(t, e), (this.ba = i);
      }
      k(t, e) {
        let i,
          r = e * this.b.f(),
          n = this.b.e();
        (i = n < 1 ? (n > -1 ? Math.trunc(32767 * n + 0.5) : -32767) : 32767),
          (t.d = i);
        let s = this.g(i);
        s < 0.001 && (s = 0.001),
          (t.b = (function (t, e) {
            let i = Math.abs(t),
              r = Math.abs(e);
            return (
              Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t)
            );
          })(r, s)),
          (t.e = 65535 & this.b.d());
        let a = this.a.h - this.a.g,
          o = this.a.g + a * this.b.f(),
          l = this.a.i * this.b.e(),
          h = this.a.j * this.b.e(),
          u = Math.cos(l),
          c = Ce(u * Math.cos(h), u * Math.sin(h), Math.sin(l));
        Ue(t.a, c, o);
        let f = this.h(),
          d = this.a.f,
          b = Ce(0.5, 0.5, 0.5);
        0 == d
          ? this.ba
            ? Me(b, 0, 0, 1)
            : Me(b, u * Math.cos(h), u * Math.sin(h), Math.sin(l))
          : (Me(b, 0, 0, d), ke(b, t.a, b), Ee(b) > 1e-4 && Be(b, b)),
          Ue(t.c, b, f);
      }
    };
    const Po = class {
      constructor(t) {
        (this.a = t.getInt32()),
          (this.b = t.getUint32()),
          (this.c = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
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
          (this.m = new Xr(t, Gr)),
          (this.n = new Xr(t, Gr)),
          (this.o = new Xr(t, Gr)),
          (this.p = new Xr(t, Gr)),
          (this.q = new Xr(t, Nr)),
          (this.r = new Xr(t, Gr)),
          (this.s = t.getFloat()),
          (this.t = new Xr(t, Gr)),
          (this.u = t.getFloat()),
          (this.v = new Xr(t, Gr)),
          (this.w = new Xr(t, Gr)),
          (this.x = new Xr(t, Gr)),
          (this.y = new Yr(t)),
          (this.z = new Wr(t)),
          (this.A = new qr(t)),
          (this.B = [t.getFloat(), t.getFloat()]),
          (this.C = new Wr(t)),
          (this.D = new Wr(t)),
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
          (this.O = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.P = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.Q = Ce(t.getFloat(), t.getFloat(), t.getFloat())),
          (this.R = t.getFloat()),
          (this.S = t.getFloat()),
          (this.T = t.getFloat()),
          (this.U = t.getFloat()),
          (this.V = t.getFloat());
        var e = t.getInt32();
        this.W = new Array(e);
        for (var i = 0; i < e; i++)
          this.W[i] = Ce(t.getFloat(), t.getFloat(), t.getFloat());
        (this.X = new Xr(t, Vr)),
          (this.Y = pr(t.getFloat(), t.getFloat())),
          (this.Z = [
            pr(t.getFloat(), t.getFloat()),
            pr(t.getFloat(), t.getFloat()),
          ]),
          (this.aa = [
            pr(t.getFloat(), t.getFloat()),
            pr(t.getFloat(), t.getFloat()),
          ]);
      }
    };
    const zo = class {
      constructor() {
        (this.a = ye()),
          (this.b = 0),
          (this.c = ye()),
          (this.d = 0),
          (this.e = (2147483647 * Math.random()) >> 0),
          (this.f = [_r(), _r()]),
          (this.g = [_r(), _r()]);
      }
    };
    let Oo = new Array(128);
    for (let t = 0; t < 128; t++) Oo[t] = Math.random();
    const Bo = Ze(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    class No {}
    class Lo {
      constructor() {
        (this.a = ye()),
          (this.b = 0),
          (this.c = { a: _r(), b: ye(), c: 0, d: 0, e: 0 });
      }
    }
    function Ho(t) {
      return sr(
        ((t >> 16) & 255) / 255,
        ((t >> 8) & 255) / 255,
        ((t >> 0) & 255) / 255,
        ((t >> 24) & 255) / 255
      );
    }
    const Go = class {
      constructor(t, e) {
        (this.E = 0),
          (this.U = !1),
          (this.a = new Date().getTime()),
          (this.b = t);
        let i = new Po(e);
        if (i.i >= 11 && i.i <= 13) {
          let e;
          t.v.Item && t.v.Item.ParticleColor
            ? (e = t.v.Item.ParticleColor)
            : t.v.Creature &&
              t.v.Creature.ParticleColor &&
              (e = t.v.Creature.ParticleColor),
            e &&
              ((this.H = [rr(), rr(), rr()]),
              ar(this.H[0], Ho(e.Start[i.i - 11])),
              ar(this.H[1], Ho(e.Mid[i.i - 11])),
              ar(this.H[2], Ho(e.End[i.i - 11])));
        }
        (this.c = i),
          (this.d = We()),
          (this.e = We()),
          (this.f = We()),
          (this.g = We()),
          (this.h = rr()),
          (this.i = Tr()),
          (this.j = ye()),
          (this.k = 1),
          (this.l = ye()),
          (this.m = 0),
          (this.n = ye()),
          (this.o = ye()),
          (this.p = []),
          (this.q = ye()),
          (this.r = 0),
          (this.s = 0),
          (this.t = 0),
          (this.u = 0),
          (this.v = ye()),
          (this.w = ye()),
          (this.x = 0),
          (this.y = 0),
          (this.z = 0),
          (this.A = 0),
          (this.B = 0),
          (this.C = 0),
          (this.D = 0),
          (this.F = []),
          (this.G = []);
        for (let t = 0; t < 1e3; t++)
          this.G.push(4 * t + 0),
            this.G.push(4 * t + 1),
            this.G.push(4 * t + 2),
            this.G.push(4 * t + 3),
            this.G.push(4 * t + 2),
            this.G.push(4 * t + 1);
        switch (
          ((this.J = new ko((2147483647 * Math.random()) >> 0)), this.c.h)
        ) {
          case 1:
            this.I = new Io(this.J, i);
            break;
          case 2:
            this.I = new Uo(this.J, i, 0 != (256 & this.c.b));
            break;
          default:
            (this.I = null),
              WH.debug("Found unimplemented generator ", this.c.h);
        }
        const r = this.c.U - this.c.S;
        0 != r
          ? ((this.s = (this.c.V - this.c.T) / r),
            (this.t = this.c.T - this.c.S * this.s))
          : ((this.s = 0), (this.t = 0));
        let n = this.c.l;
        n <= 0 && (n = 1);
        let s = this.c.k;
        s <= 0 && (s = 1), (this.y = n * s - 1), (this.z = 0);
        let a = n,
          o = -1;
        do {
          ++o, (a >>= 1);
        } while (a);
        if (
          ((this.A = o), (this.B = n - 1), (this.z = 0), (32768 & this.c.b) > 0)
        ) {
          let t = (this.y + 1) * this.J.d();
          this.z = (t / 4294967296) | 0;
        }
        if (((this.C = 1 / n), (this.D = 1 / s), (269484032 & this.c.b) > 0)) {
          const t = 0 != (1 & (this.c.b >> 28));
          this.r = t ? 2 : 3;
        } else this.r = 0;
        this.K = i.g > 1;
      }
      W() {
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
          (t.p = null);
      }
      X(t, e, i) {
        if (!this.I) return;
        let r = We(),
          n = this.I.i(),
          s = !0;
        this.c.X.c(t.a.a) && (s = this.c.X.d(t, this.b.aY) > 0), (this.T = s);
        const a = Ce(0, 0, 0);
        s &&
          ((n.a = this.c.m.d(t, this.b.aY, 0)),
          (n.b = this.c.n.d(t, this.b.aY, 0)),
          (n.i = this.c.o.d(t, this.b.aY, 0)),
          (n.j = this.c.p.d(t, this.b.aY, 0)),
          this.c.q.d(t, this.b.aY, a, n.e),
          (n.c = this.c.r.d(t, this.b.aY, 0)),
          (n.d = this.c.t.d(t, this.b.aY, 0)),
          (n.h = this.c.w.d(t, this.b.aY, 0)),
          (n.g = this.c.v.d(t, this.b.aY, 0)),
          (n.f = i ? i.a : this.c.x.d(t, this.b.aY, 0))),
          $e(r, r, this.b.V),
          $e(r, r, this.b.aq[this.c.d].m);
        let o = We();
        ni(o, Ce(this.c.c[0], this.c.c[1], this.c.c[2])),
          $e(r, r, o),
          $e(r, r, Bo);
        let l = We(),
          h = ye();
        Ke(l, this.b.aT.viewMatrix),
          ai(h, l),
          this.aa(e, r, h, null, this.b.aT.viewMatrix),
          this.ak(this.b.aT.viewMatrix);
        let u = this.b.aT.context;
        this.L
          ? (u.bindBuffer(u.ARRAY_BUFFER, this.L),
            u.bufferData(
              u.ARRAY_BUFFER,
              new Float32Array(this.F),
              u.DYNAMIC_DRAW
            ))
          : ((this.L = u.createBuffer()),
            u.bindBuffer(u.ARRAY_BUFFER, this.L),
            u.bufferData(
              u.ARRAY_BUFFER,
              new Float32Array(this.F),
              u.DYNAMIC_DRAW
            )),
          this.M ||
            ((this.M = u.createBuffer()),
            u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, this.M),
            u.bufferData(
              u.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(this.G),
              u.DYNAMIC_DRAW
            ));
      }
      Y(t) {
        if (this.p.length <= 0) return;
        const e = this.b.aT.context;
        if (
          (this.V ||
            ((this.V = new go()),
            (this.V.a = ue(
              e,
              [
                "        attribute vec3 aPosition;\n        attribute vec4 aColor;        attribute vec2 aTexcoord0;        attribute vec2 aTexcoord1;        attribute vec2 aTexcoord2;                varying vec4 vColor;        varying vec2 vTexcoord0;        varying vec2 vTexcoord1;        varying vec2 vTexcoord2;                uniform mat4 uModelMatrix;        uniform mat4 uViewMatrix;        uniform mat4 uProjMatrix;                void main(void) {            vec4 pos = vec4(aPosition, 1);                        gl_Position = uProjMatrix * pos;                    vColor = aColor;        vTexcoord0 = aTexcoord0;        vTexcoord1 = aTexcoord1;        vTexcoord2 = aTexcoord2;        }    ",
                "        precision mediump float;\n                varying vec4 vColor;        varying vec2 vTexcoord0;        varying vec2 vTexcoord1;        varying vec2 vTexcoord2;                uniform bool uHasTexture;        uniform bool uHasTexture2;        uniform bool uHasTexture3;        uniform bool uHasAlpha;        uniform int uBlendMode;        uniform int uPixelShader;        uniform sampler2D uTexture;        uniform sampler2D uTexture2;        uniform sampler2D uTexture3;        uniform float uAlphaTreshold;                void main(void) {            float lo_thresh = 0.01;            vec4 color = vec4(1, 1, 1, 1);            vec4 tex = vec4(1, 1, 1, 1);            vec4 tex2 = vec4(1, 1, 1, 1);            vec4 tex3 = vec4(1, 1, 1, 1);            if (uHasTexture) {                tex = texture2D(uTexture, vTexcoord0).rgba;            }            if (uHasTexture2) {                tex2 = texture2D(uTexture2, vTexcoord1).rgba;            }            if (uHasTexture3) {                tex3 = texture2D(uTexture3, vTexcoord2).rgba;            }            vec4 finalColor = vec4((tex * vColor ).rgb, tex.a*vColor.a );            if (uPixelShader == 0) {                 vec3 matDiffuse = vColor.xyz * tex.rgb;                finalColor = vec4(matDiffuse.rgb, tex.a*vColor.a);            } else if (uPixelShader == 1) {             vec4 textureMod = tex*tex2;             float texAlpha = (textureMod.w * tex3.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            } else if (uPixelShader == 2) {              vec4 textureMod = tex*tex2*tex3;             float texAlpha = (textureMod.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            } else if (uPixelShader == 3) {              vec4 textureMod = tex*tex2*tex3;             float texAlpha = (textureMod.w);             float opacity = texAlpha*vColor.a;             vec3 matDiffuse = vColor.xyz * textureMod.rgb;             finalColor = vec4(matDiffuse.rgb, opacity);            };            if (finalColor.a < uAlphaTreshold ) discard;            gl_FragColor = finalColor;        }    ",
              ],
              null,
              null
            )),
            (this.V.b = {}),
            (this.V.a.attributes = [
              {
                loc: e.getAttribLocation(this.V.a.program, "aPosition"),
                type: e.FLOAT,
                size: 3,
                offset: 0,
                stride: 52,
              },
              {
                loc: e.getAttribLocation(this.V.a.program, "aColor"),
                type: e.FLOAT,
                size: 4,
                offset: 12,
                stride: 52,
              },
              {
                loc: e.getAttribLocation(this.V.a.program, "aTexcoord0"),
                type: e.FLOAT,
                size: 2,
                offset: 28,
                stride: 52,
              },
              {
                loc: e.getAttribLocation(this.V.a.program, "aTexcoord1"),
                type: e.FLOAT,
                size: 2,
                offset: 36,
                stride: 52,
              },
              {
                loc: e.getAttribLocation(this.V.a.program, "aTexcoord2"),
                type: e.FLOAT,
                size: 2,
                offset: 44,
                stride: 52,
              },
            ]),
            (this.V.c = this.L),
            (this.V.d = this.M),
            (this.V.m = this.c.j)),
          !this.S)
        )
          if (((this.S = [null, null, null]), 0 != (268435456 & this.c.b))) {
            WH.debug(
              "multitexture particle",
              this.c.f[0],
              this.c.f[1],
              this.c.f[2],
              this
            );
            for (let t = 0; t < this.c.f.length; t++) {
              const e = this.c.f[t];
              e > -1 && e < this.b.ax.length && (this.S[t] = this.b.ax[e]);
            }
          } else
            this.c.e > -1 &&
              this.c.e < this.b.ax.length &&
              (this.S[0] = this.b.ax[this.c.e]);
        if (!this.S[0].f || !this.S[0].f.f) return;
        (this.V.b.uViewMatrix = this.b.aT.viewMatrix),
          (this.V.b.uProjMatrix = this.b.aT.projMatrix),
          (this.V.b.uBlendMode = this.c.g),
          (this.V.b.uPixelShader = this.r > 1 ? this.r - 1 : 0);
        let i = [
          this.S[0] && this.S[0].f && this.S[0].f.f,
          this.S[1] && this.S[1].f && this.S[1].f.f,
          this.S[2] && this.S[2].f && this.S[2].f.f,
        ];
        (this.V.b.uTexture = this.S[0].f.d),
          (this.V.b.uTexture2 = i[1] ? this.S[1].f.d : null),
          (this.V.b.uTexture3 = i[2] ? this.S[2].f.d : null),
          (this.V.b.uHasTexture = i[0] ? 1 : 0),
          (this.V.b.uHasTexture2 = i[1] ? 1 : 0),
          (this.V.b.uHasTexture3 = i[2] ? 1 : 0);
        let r = this.c.g;
        4 == r && (r = 3), (this.V.e = r), (this.V.i = !this.b.bZ);
        let n = -1;
        1 == r ? (n = 0.501960814) : r > 1 && (n = 1 / 255),
          (this.V.b.uAlphaTreshold = n),
          (this.V.h = !1),
          (this.V.f = !1),
          (this.V.j = e.TRIANGLES),
          (this.V.k = (6 * this.E) >> 0),
          (this.V.l = 0),
          t.push(this.V);
      }
      Z(t, e) {
        if (0 == (16 & this.c.b))
          for (let i = 0; i < this.p.length; i++) {
            const r = this.p[i];
            Ge(r.a, r.a, t), Ve(r.c, r.c, e);
          }
      }
      aa(t, e, i, r, n) {
        if (null == this.I) return;
        if (this.b.T) return;
        ai(this.l, this.d);
        let s = rr();
        ai(s, e), (s[3] = 1), fr(s, s, n), (this.m = s[2]);
        let a = ye();
        if ((ai(a, n), this.ab(e, a, r), t > 0)) {
          let e = ye();
          if ((ai(e, this.d), 16384 & this.c.b)) {
            ke(this.o, e, this.l);
            let i = this.s * (Ee(this.o) / t) + this.t;
            i >= 0 && (i = Math.min(i, 1)), Ue(this.n, this.o, i);
          }
          if (64 & this.c.b) {
            this.u += t;
            let i = 0.03;
            if (this.u > i)
              if (((this.u = 0), 0 == this.p.length)) {
                let t = i / this.u,
                  r = ye();
                ke(r, e, this.l);
                let n = t * this.c.I;
                Fe(this.v, r, Ce(n, n, n));
              } else Me(this.v, 0, 0, 0);
          }
          this.ac(t);
        }
      }
      ab(t, e, i) {
        if ((Se(this.w, e), null == i || 16 & this.c.b)) Xe(this.d, t);
        else {
          let e = We();
          Ke(e, i), $e(this.d, e, t);
        }
        let r = ye();
        oi(r, t), (this.k = r[0]);
      }
      ac(t) {
        if ((t = Math.max(t, 0)) < 0.1) Se(this.n, this.o);
        else {
          let e = Math.floor(t / 0.1);
          t = -0.1 * e + t;
          let i = Math.min(Math.floor(this.I.i().lifespan / 0.1), e),
            r = i + 1,
            n = 1;
          (n = r < 0 ? ((1 & r) | (r >> 1)) + ((1 & r) | (r >> 1)) : r),
            Ue(this.n, this.o, 1 / n);
          for (let t = 0; t < i; t++) this.ad(0.1);
        }
        this.ad(t);
      }
      ad(t) {
        let e = new No();
        if (t < 0) return;
        this.c.b, this.ae(e, t), this.af(t);
        let i = 0;
        for (; i < this.p.length; ) {
          let r = this.p[i];
          (r.b = r.b + t),
            r.b > Math.max(this.I.g(r.e), 0.001)
              ? (this.ai(i), i--)
              : this.aj(r, t, e) || (this.ai(i), i--),
            i++;
        }
      }
      ae(t, e) {
        (t.a = ye()), (t.b = ye()), (t.c = ye()), (t.d = 0);
        let i = Ce(e, e, e),
          r = e * e * 0.5,
          n = Ce(r, r, r);
        Fe(t.a, this.c.Q, i);
        let s = ye();
        this.I.j(s), Fe(t.b, s, i), Fe(t.c, s, n), (t.d = this.c.J * e);
      }
      af(t) {
        if (!this.T) return;
        let e = this.I.d();
        for (this.x = this.x + t * e; this.x > 1; ) this.ag(t), (this.x -= 1);
      }
      ag(t) {
        let e = this.ah();
        if ((this.I.k(e, t), !(16 & this.c.b))) {
          let t = sr(e.a[0], e.a[1], e.a[2], 1),
            i = sr(e.c[0], e.c[1], e.c[2], 0);
          fr(t, t, this.d),
            fr(i, i, this.d),
            Se(e.a, t),
            Se(e.c, i),
            8192 & this.c.b && (e.a[2] = 0);
        }
        if (64 & this.c.b) {
          let t = 1 + this.I.i().speedVariation * this.J.e(),
            i = ye();
          Ue(i, this.v, t), De(e.c, e.c, i);
        }
        if (this.r >= 2)
          for (let t = 0; t < 2; t++) {
            (e.f[t][0] = this.J.f()), (e.f[t][1] = this.J.f());
            let s = _r();
            xr(s, this.c.aa[t], this.J.e()),
              (i = e.g[t]),
              (r = s),
              (n = this.c.Z[t]),
              (i[0] = r[0] + n[0]),
              (i[1] = r[1] + n[1]);
          }
        var i, r, n;
      }
      ah() {
        let t = new zo();
        return this.p.push(t), t;
      }
      ai(t) {
        this.p.splice(t, 1);
      }
      aj(t, e, i) {
        if (this.r >= 2)
          for (let i = 0; i < 2; i++) {
            let r = t.f[i][0] + e * t.g[i][0];
            (t.f[i][0] = r - Math.floor(r)),
              (r = t.f[i][1] + e * t.g[i][1]),
              (t.f[i][1] = r - Math.floor(r));
          }
        De(t.c, t.c, i.a),
          16384 & this.c.b && 2 * e < t.b && De(t.a, t.a, this.n);
        let r = Ce(e, e, e),
          n = ye();
        if (
          (Fe(n, t.c, r),
          De(t.c, t.c, i.b),
          Ue(t.c, t.c, 1 - i.d),
          De(t.a, t.a, n),
          De(t.a, t.a, i.c),
          2 == this.c.h && 128 & this.c.b)
        ) {
          let e = ye();
          if ((Se(e, t.a), 16 & this.c.b)) {
            if (Ne(e, n) > 0) return !1;
          } else {
            let i = ye();
            if ((ai(i, this.d), ke(e, t.a, i), Ne(e, n) > 0)) return !1;
          }
        }
        return !0;
      }
      ak(t) {
        if (((this.F.length = 0), 0 == this.p.length && null != this.I)) return;
        Ke(this.f, t), wr(Tr(), t), this.al(null, t);
        let e = 0;
        for (let t = 0; t < this.p.length; t++) {
          let i = this.p[t],
            r = new Lo();
          if (
            (this.an(i, r) &&
              (131072 & this.c.b && (this.ap(i, r), e++),
              262144 & this.c.b && (this.aq(i, r), e++)),
            e >= 1e3)
          )
            break;
        }
        this.E = e;
      }
      al(t, e) {
        var i, r, n;
        16 & this.c.b
          ? $e(this.g, e, this.d)
          : null != t
          ? $e(this.g, e, t)
          : Xe(this.g, e),
          ai(this.h, e),
          4096 & this.c.b &&
            (wr(this.i, this.g),
            16 & this.c.b &&
              Math.abs(this.k) > 0 &&
              ((i = this.i),
              (r = this.i),
              (n = 1 / this.k),
              (i[0] = r[0] * n),
              (i[1] = r[1] * n),
              (i[2] = r[2] * n),
              (i[3] = r[3] * n),
              (i[4] = r[4] * n),
              (i[5] = r[5] * n),
              (i[6] = r[6] * n),
              (i[7] = r[7] * n),
              (i[8] = r[8] * n)),
            Me(this.j, this.i[6], this.i[7], this.i[8]),
            ze(this.j) <= 2.3841858e-7
              ? Me(this.j, 0, 0, 1)
              : Be(this.j, this.j));
      }
      am(t) {
        let e = 0,
          i = 0;
        if (0 != this.c.K || 0 != this.c.N) {
          let r = new ko(t.e);
          (e = 0 == this.c.L ? this.c.K : this.c.K + r.e() * this.c.L),
            (i = 0 == this.c.N ? this.c.M : this.c.M + r.e() * this.c.N);
        } else (e = this.c.K), (i = this.c.M);
        return { deltaSpin: i, baseSpin: e };
      }
      an(t, e) {
        let i = this.c.G,
          r = this.c.H,
          n = r[0],
          s = r[1] - n,
          a = 0,
          o = t.e,
          l = t.b;
        if (((i < 1 || 0 != s) && (a = 127 & (l * this.c.F + o)), i < Oo[a]))
          return 0;
        this.ao(t, e, o);
        let h = s * Oo[a] + n;
        xr(e.c.a, e.c.a, h), 32 & this.c.b && xr(e.c.a, e.c.a, this.k);
        let u = sr(t.a[0], t.a[1], t.a[2], 1);
        return fr(u, u, this.g), Se(e.a, u), (e.b = 1), 1;
      }
      ao(t, e, i) {
        let r = t.b / this.I.f(),
          n = new ko(i);
        Math.min(r, 1) <= 0 ? (r = 0) : r >= 1 && (r = 1);
        let s = Ce(255, 255, 255),
          a = pr(1, 1),
          o = 1,
          l = e.c;
        this.c.y.i(r, s, l.b, this.H),
          this.H || Ue(l.b, l.b, 1 / 255),
          this.c.A.i(r, a, l.a),
          (l.e = this.c.z.i(r, 1) / 32767);
        let h = 0;
        this.c.C.a.length > 0
          ? ((o = 0), (l.c = this.c.C.i(r, o)), (l.c = this.y & (l.c + this.z)))
          : 65536 & this.c.b
          ? ((h = (this.y + 1) * n.d()), (l.c = (h / 4294967296) | 0))
          : (l.c = 0),
          (o = 0),
          (l.d = this.c.D.i(r, o)),
          (l.d = (l.d + this.z) & this.y);
        let u = 1;
        524288 & this.c.b
          ? ((u = Math.max(1 + n.e() * this.c.B[1], 99999997e-12)),
            (l.a[0] = Math.max(1 + n.e() * this.c.B[0], 99999997e-12) * l.a[0]))
          : ((u = Math.max(1 + n.e() * this.c.B[0], 99999997e-12)),
            (l.a[0] = u * l.a[0])),
          (l.a[1] = u * l.a[1]);
      }
      ap(t, e) {
        let i = pr((e.c.c & this.B) * this.C, (e.c.c >> this.A) * this.D),
          r = 0,
          n = 0,
          s = this.am(t);
        (r = s.baseSpin), (n = s.deltaSpin);
        let a = 0,
          o = Ce(0, 0, 0),
          l = Ce(0, 0, 0),
          h = !1,
          u = !1;
        if (4 & this.c.b && ze(t.c) > 2.3841858e-7)
          if (((a = 1), 4096 & this.c.b)) h = !0;
          else {
            let i = sr(-t.c[0], -t.c[1], -t.c[2], 0);
            fr(i, i, this.g);
            let r = ye();
            Se(r, i);
            let n = 0,
              s = ze(r);
            n = s <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(s);
            let a = ye();
            Se(a, r),
              Ue(a, a, n),
              Se(o, a),
              Ue(o, o, e.c.a[0]),
              (l = Ce(a[1], -a[0], 0)),
              Ue(l, l, e.c.a[1]),
              (u = !0),
              (h = !1);
          }
        if ((4096 & this.c.b || h) && !u) {
          let i = Tr();
          (c = i),
            (f = this.i),
            (c[0] = f[0]),
            (c[1] = f[1]),
            (c[2] = f[2]),
            (c[3] = f[3]),
            (c[4] = f[4]),
            (c[5] = f[5]),
            (c[6] = f[6]),
            (c[7] = f[7]),
            (c[8] = f[8]);
          let s = e.c.a[0];
          if (a) {
            let r = 0,
              n = Ce(-t.c[0], -t.c[1], -t.c[2]),
              a = ze(n);
            (r = a <= 2.3841858e-7 ? 0 : 1 / Math.sqrt(a)),
              yr(
                i,
                this.i,
                (function (t, e, i, r, n, s, a, o, l) {
                  var h = new we(9);
                  return (
                    (h[0] = t),
                    (h[1] = e),
                    (h[2] = i),
                    (h[3] = r),
                    (h[4] = n),
                    (h[5] = s),
                    (h[6] = a),
                    (h[7] = o),
                    (h[8] = l),
                    h
                  );
                })(n[0] * r, n[1] * r, 0, -n[1] * r, n[0] * r, 0, 0, 0, 1)
              ),
              r > 2.3841858e-7 && (s = e.c.a[0] * (1 / Math.sqrt(ze(t.c)) / r));
          }
          if (
            (this.r,
            Me(o, i[0], i[1], i[2]),
            Ue(o, o, s),
            Me(l, i[3], i[4], i[5]),
            Ue(l, l, e.c.a[1]),
            (n = l[0]),
            (u = !0),
            0 != this.c.M || 0 != this.c.N)
          ) {
            let e = r + n * t.b;
            512 & this.c.b && 1 & t.e && (e = -e);
            let i = ye();
            Se(i, this.j), this.r;
            let s = Tr(),
              a = Ar();
            Er(a, i, e),
              (function (t, e) {
                var i = e[0],
                  r = e[1],
                  n = e[2],
                  s = e[3],
                  a = i + i,
                  o = r + r,
                  l = n + n,
                  h = i * a,
                  u = r * a,
                  c = r * o,
                  f = n * a,
                  d = n * o,
                  b = n * l,
                  g = s * a,
                  _ = s * o,
                  p = s * l;
                (t[0] = 1 - c - b),
                  (t[3] = u - p),
                  (t[6] = f + _),
                  (t[1] = u + p),
                  (t[4] = 1 - h - b),
                  (t[7] = d - g),
                  (t[2] = f - _),
                  (t[5] = d + g),
                  (t[8] = 1 - h - c);
              })(s, a),
              Ve(o, o, s),
              Me(l, n, l[1], l[2]),
              Ve(l, l, s);
          }
        }
        var c, f;
        if (!u)
          if (0 != this.c.M || 0 != this.c.N) {
            let i = r + n * t.b;
            512 & this.c.b && 1 & t.e && (i = -i);
            let s = Math.cos(i),
              a = Math.sin(i);
            Me(o, s, a, 0),
              Ue(o, o, e.c.a[0]),
              Me(l, -a, s, 0),
              Ue(l, l, e.c.a[1]),
              134217728 & this.c.b && De(e.a, e.a, Ce(l[0], l[1], 0));
          } else Me(o, e.c.a[0], 0, 0), Me(l, 0, e.c.a[1], 0);
        return this.ar(o, l, e.a, e.c.b, e.c.e, i[0], i[1], t.f), 0;
      }
      aq(t, e) {
        let i = pr((e.c.d & this.B) * this.C, (e.c.d >> this.A) * this.D),
          r = Ce(0, 0, 0),
          n = Ce(0, 0, 0),
          s = this.c.E;
        1024 & this.c.b && (s = Math.min(t.b, s));
        let a = rr();
        Ue(a, t.c, -1), (a[3] = 0), fr(a, a, this.g), Ue(a, a, s);
        let o = Ce(a[0], a[1], 0);
        if (Ne(o, o) > 1e-4) {
          let t = 1 / Ee(o);
          xr(e.c.a, e.c.a, t),
            vr(o, o, e.c.a),
            (n = Ce(-o[1], o[0], 0)),
            Ue(r, a, 0.5),
            De(e.a, e.a, r);
        } else (r = Ce(0.05 * e.c.a[0], 0, 0)), (n = Ce(0, 0.05 * e.c.a[1], 0));
        return this.ar(r, n, e.a, e.c.b, e.c.e, i[0], i[1], t.f), 1;
      }
      ar(t, e, i, r, n, s, a, o) {
        const l = [-1, -1, 1, 1],
          h = [1, -1, 1, -1],
          u = [0, 0, 1, 1],
          c = [0, 1, 0, 1];
        let f = ye(),
          d = _r(),
          b = _r(),
          g = _r();
        for (let _ = 0; _ < 4; _++)
          Me(f, 0, 0, 0),
            Pe(f, f, t, l[_]),
            Pe(f, f, e, h[_]),
            De(f, f, i),
            mr(d, u[_] * this.C + s, c[_] * this.D + a),
            mr(b, u[_] * this.c.Y[0] + o[0][0], c[_] * this.c.Y[0] + o[0][1]),
            mr(g, u[_] * this.c.Y[1] + o[1][0], c[_] * this.c.Y[1] + o[1][1]),
            this.F.push(f[0]),
            this.F.push(f[1]),
            this.F.push(f[2]),
            this.F.push(r[0]),
            this.F.push(r[1]),
            this.F.push(r[2]),
            this.F.push(n),
            this.F.push(d[0]),
            this.F.push(d[1]),
            this.F.push(b[0]),
            this.F.push(b[1]),
            this.F.push(g[0]),
            this.F.push(g[1]);
      }
    };
    const Vo = class {
      constructor(t) {
        this.a = t.getFloat();
      }
    };
    const jo = class {
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
    class qo {
      constructor() {
        (this.a = ye()), (this.b = rr()), (this.c = _r());
      }
    }
    class Yo {}
    const Wo = [0, 1, 2, 10, 3, 4, 5, 13];
    function Xo(t, e) {
      return Ce(t[4 * e + 0], t[4 * e + 1], t[4 * e + 2]);
    }
    class Zo {}
    const Jo = class {
        constructor(t, e) {
          (this.g = ye()),
            (this.h = ye()),
            (this.p = new Yo()),
            (this.q = ye()),
            (this.r = ye()),
            (this.s = ye()),
            (this.t = ye()),
            (this.u = ye()),
            (this.v = ye()),
            (this.w = ye()),
            (this.x = ye()),
            (this.y = ye()),
            (this.z = ye()),
            (this.A = ye()),
            (this.B = ye()),
            (this.O = ye()),
            (this.V = t.aT.context),
            (this.a = t);
          let i = new Zo();
          var r;
          if (
            ((i.a = e.getInt32()),
            (i.b = e.getInt32()),
            (i.c = Ce(e.getFloat(), e.getFloat(), e.getFloat())),
            (r = e.getInt32()) > 0)
          ) {
            i.j = new Array(r);
            for (let t = 0; t < r; ++t) i.j[t] = e.getInt16();
          }
          if ((r = e.getInt32()) > 0) {
            i.k = new Array(r);
            for (let t = 0; t < r; ++t) i.k[t] = e.getInt16();
          }
          (i.l = new Xr(e, Nr)),
            (i.m = new Xr(e, Hr)),
            (i.n = new Xr(e, Gr)),
            (i.o = new Xr(e, Gr)),
            (i.d = e.getFloat()),
            (i.e = e.getFloat()),
            (i.f = e.getFloat()),
            (i.g = e.getInt16()),
            (i.h = e.getInt16()),
            (i.p = new Xr(e, Hr)),
            (i.q = new Xr(e, Vr)),
            (i.r = e.getInt16()),
            (this.U = i),
            (this.ab = new Array(i.k.length)),
            (this.ae = new Array(i.k.length));
          for (let e = 0; e < i.k.length; e++) this.ae[e] = t.aw[i.k[e]];
          let n = sr(255, 255, 255, 255),
            s = new Yo();
          (s.a = 0),
            (s.b = 0),
            (s.c = 1),
            (s.d = 1),
            this.au(i.d, i.e, n, s, i.h, i.g),
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
          let t = ye();
          qe(t, this.g, this.O);
          let e = ze(t);
          Ue(t, this.q, this.R),
            ke(this.w, this.g, t),
            Ue(t, this.r, this.R),
            ke(this.x, this.O, t),
            Ue(t, this.q, this.Q),
            De(this.y, this.g, t),
            Ue(t, this.r, this.Q),
            De(this.z, this.O, t),
            Ue(this.u, this.s, e),
            Ue(this.v, this.t, e);
        }
        am(t, e, i) {
          let r;
          if (this.M && this.L) {
            r = t;
            let i = ye();
            ai(i, r),
              De(i, i, e),
              Se(this.h, e),
              this.J
                ? (Se(this.g, this.O), Se(this.s, this.t), Se(this.q, this.r))
                : (Se(this.g, i),
                  (this.s = Xo(r, 2)),
                  (this.q = Xo(r, 1)),
                  (this.f = 0),
                  (this.J = !0)),
              (this.O = i),
              (this.t = Xo(r, 2)),
              (this.r = Xo(r, 1));
          }
        }
        an(t) {
          var e = Tr();
          wr(e, t),
            (this.s = Ve(this.s, this.s, e)),
            (this.q = Ve(this.q, this.q, e)),
            (this.t = Ve(this.t, this.t, e)),
            (this.r = Ve(this.r, this.r, e)),
            (this.g = Ge(this.g, this.g, t)),
            (this.O = Ge(this.O, this.O, t));
          for (var i = 0; i < this.i.length; i++)
            Ge(this.i[i].a, this.i[i].a, t);
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
            let n = t / this.I,
              s = n;
            0 != (2147483648 & n) &&
              ((n = (1 & n) | (n >> 1)), (s = n + n), (r = this.p.b));
            let a = s * this.m + this.G.a;
            (this.p.a = a), (this.p.d = r + this.l), (this.p.c = a + this.m);
          }
        }
        aq(t, e, i) {
          let r,
            n = this.i[2 * this.d],
            s = this.i[2 * this.d + 1],
            a = ye();
          Ue(a, this.v, 1 - e),
            ke(a, this.x, a),
            Ue(n.a, a, e),
            Ue(a, this.u, e),
            De(a, this.w, a),
            Ue(a, a, 1 - e),
            De(n.a, n.a, a),
            Ue(a, this.v, 1 - e),
            ke(a, this.z, a),
            Ue(s.a, a, e),
            Ue(a, this.u, e),
            De(a, this.y, a),
            Ue(a, a, 1 - e),
            De(s.a, s.a, a),
            (this.c[this.d] = t),
            (r = i),
            (this.d = this.d + r),
            this.d >= this.c.length && (this.d -= this.c.length);
        }
        ar(t, e) {
          if (this.a.T) return;
          let i = ye(),
            r = 1;
          (i = this.U.l.d(t, this.a.aY, i)),
            (r = this.U.m.d(t, this.a.aY)),
            this.ao(i[0], i[1], i[2]),
            this.ak(r / 32767);
          let n = this.U.n.d(t, this.a.aY);
          this.aj(n);
          let s = this.U.o.d(t, this.a.aY);
          this.ai(s);
          let a = this.U.p.d(t, this.a.aY);
          this.ap(a);
          let o = this.U.q.d(t, this.a.aY, 1);
          this.af(0 != o);
          let l = We();
          hi(l, this.a.V, this.a.aq[this.U.b].m), Qe(l, l, this.U.c);
          let h = ye();
          this.am(l, h, null), this.as(e, !1);
        }
        as(t, e) {
          let i,
            r,
            n,
            s,
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
            S,
            M,
            D,
            k,
            F,
            R,
            I,
            U,
            P,
            z,
            O,
            B,
            N,
            L,
            H,
            G,
            V,
            j,
            q,
            Y,
            W,
            X,
            Z;
          for (
            this.N || (this.C > 0 && (t = 1 / this.C + 99999997e-12)),
              t >= 0 ? this.D <= t && (t = this.D) : (t = 0),
              v = this.e;
            v != this.d && !(t + this.c[v] <= this.D);
            v = this.e
          )
            this.e = this.at(this.e, 1);
          if (!e && this.M && this.L && this.J) {
            (R = t * this.C + this.f), (Z = this.F), this.al();
            let e = !1;
            if (
              ((P = 0),
              R < 1
                ? (e = !0)
                : ((X = this.f),
                  (U = 1 / (R - X)),
                  (m = Math.floor(R - 1)),
                  (P = Math.ceil(Math.max(m, 0)))),
              -1 == P || e)
            );
            else
              for (
                I = 1, v = 1;
                (F = this.d),
                  (N = this.i.length),
                  (this.i[2 * F].b = Z),
                  (x = 2 * this.d + 1),
                  (L = this.i.length),
                  (this.i[x].b = Z),
                  this.aq((v - X) * U * -t, (v - X) * U, 1),
                  -1 != --P;
                v = I
              )
                (I += 1), (X = this.f);
            (T = Math.floor(R)),
              (this.f = R - T),
              this.aq(0, 1, 0),
              (k = this.d),
              (H = this.i.length),
              (w = this.i[2 * k]),
              (y = this.p.b),
              (w.c[1] = this.p.a),
              (w.c[0] = y),
              (A = 2 * this.d + 1),
              (G = this.i.length),
              (E = this.i[A]),
              (C = this.p.b),
              (E.c[1] = this.p.c),
              (E.c[0] = C),
              (D = this.d),
              (V = this.i.length),
              (this.i[2 * D].b = Z),
              (S = 2 * this.d + 1),
              (j = this.i.length),
              (this.i[S].b = Z);
          }
          (this.A[2] = 34028235e31),
            (this.A[1] = 34028235e31),
            (this.A[0] = 34028235e31),
            (this.B[2] = -34028235e31),
            (this.B[1] = -34028235e31),
            (this.B[0] = -34028235e31),
            (z = this.e);
          for (let e = this.e; e != this.d; z = e)
            (p = 2 * e),
              (W = this.i.length),
              (M = z),
              (B = this.i[2 * e]),
              (i = p + 1),
              (r = this.i[2 * e + 1]),
              (n = (this.S + this.S) * this.c[M] * t + t * this.S * t),
              (B.a[2] = B.a[2] + n),
              (r.a[2] = n + r.a[2]),
              (s = B.a[0]),
              (a = this.A[0]),
              a > B.a[0] && ((a = B.a[0]), (this.A[0] = s), (s = B.a[0])),
              (o = B.a[1]),
              (l = this.A[1]),
              l > o && ((l = B.a[1]), (this.A[1] = o), (o = B.a[1])),
              (h = B.a[2]),
              (u = this.A[2]),
              u > h && ((u = B.a[2]), (this.A[2] = h), (h = B.a[2])),
              s > this.B[0] && (this.B[0] = s),
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
              (this.c[M] = t + this.c[M]),
              (b = this.l),
              (Y = this.c.length),
              (g = b * this.c[M] * this.k + this.p.b),
              (B.c[1] = this.p.a),
              (B.c[0] = g),
              (r.c[1] = this.p.c),
              (r.c[0] = g),
              (_ = this.c.length),
              (O = z + 1),
              (e = O - _),
              _ > O && (e = O);
          this.N = !0;
        }
        at(t, e) {
          let i = e + t;
          t = i;
          let r = this.c.length;
          return i >= r && (t = i - r), t;
        }
        au(t, e, i, r, n, s) {
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
            this.i[t] = new qo();
            let e = this.i[t];
            (e.a[0] = 0),
              (e.a[1] = 0),
              (e.a[2] = 0),
              (e.b = sr(0, 0, 0, 0)),
              (e.c[0] = 0),
              (e.c[1] = 0);
          }
          this.j = new Array(4 * o);
          for (let t = 0; t < this.j.length; t++) this.j[t] = t % (2 * o);
          (this.k = 1 / d),
            (l = s),
            0 != (2147483648 & s) &&
              (l = ((1 & s) | (s >> 1)) + ((1 & s) | (s >> 1))),
            (this.l = (r.d - r.b) / l),
            (h = n),
            0 != (2147483648 & n) &&
              (h = ((1 & n) | (n >> 1)) + ((1 & n) | (n >> 1))),
            (this.m = (r.c - r.a) / h),
            (this.n = 1 / this.l),
            (this.o = 1 / this.m),
            (this.C = f),
            (this.D = d),
            hr(i, i, 1 / 255),
            (this.F = i),
            (this.G = r),
            (this.H = n),
            (this.I = s),
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
              let t = new go();
              (t.a = ue(
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
            let n = this.a.ax[i];
            if (!n.f || !n.f.f) continue;
            let s = r;
            s >= this.U.k.length && (s = 0);
            let a = this.a.aw[this.U.k[s]];
            (this.ab[r].b.uViewMatrix = this.a.aT.viewMatrix),
              (this.ab[r].b.uProjMatrix = this.a.aT.projMatrix),
              (this.ab[r].b.uTexture = n.f.d),
              (this.ab[r].h = !1),
              (this.ab[r].f = !1),
              (this.ab[r].e = Wo[a.b]),
              (this.ab[r].i = !this.a.bZ);
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
      Ko =
        "uniform float x;\r\nuniform float y;\r\nuniform float width;\r\nuniform float height;\r\n\r\nattribute vec2 aTextCoord;\r\nvarying vec2 vTextCoords;\r\nvoid main() {\r\n    vTextCoords = aTextCoord;\r\n\r\n    vec2 pos = vec2(\r\n        (x + aTextCoord.x*width)* 2.0 - 1.0,\r\n        (y + aTextCoord.y*height)* 2.0 - 1.0\r\n    );\r\n\r\n    gl_Position = vec4(pos.x, pos.y, 0, 1);\r\n}";
    class $o {
      constructor() {
        (this.a = null), (this.b = null), (this.c = null);
      }
      d() {
        null != this.a && this.a.h(),
          null != this.b && this.b.h(),
          null != this.c && this.c.h();
      }
      e() {
        return (
          !(this.a && !this.a.g()) &&
          !(this.b && !this.b.g()) &&
          !(this.c && !this.c.g())
        );
      }
    }
    class Qo {
      constructor() {
        (this.a = null),
          (this.b = null),
          (this.c = null),
          (this.d = {}),
          (this.i = new me());
      }
    }
    let tl = null,
      el = null,
      il = null;
    class rl {
      constructor(t, e, i) {
        (this.h = !1),
          (this.e = t),
          (this.f = e),
          (this.g = i),
          (function (t) {
            (el = t.createTexture()),
              t.bindTexture(t.TEXTURE_2D, el),
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
              t.bindTexture(t.TEXTURE_2D, null),
              (il = t.createTexture()),
              t.bindTexture(t.TEXTURE_2D, il),
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
              t.bindTexture(t.TEXTURE_2D, null),
              (tl = new Qo());
            let e = tl;
            (e.a = ue(
              t,
              [
                Ko,
                "precision mediump float;\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\nuniform int layer;\r\nuniform vec2 screenResolution;\r\n\r\nfloat overlayBlend(float a, float b) {\r\n//    if (b <= 0.5) {\r\n//        return 2.0 * a * b;\r\n//    } else {\r\n//        return 1.0 - ((2.0 * (1.0 - a) * (1.0 - b)));\r\n//        return (1.0 - (1.0 - 2.0 * (a - 0.5)) * (1.0 - b));\r\n//    }\r\n    if (b > 0.5) {\r\n        return (1.0 - (1.0 - 2.0 * (a - 0.5)) * (1.0 - b));\r\n    } else {\r\n        return ((2.0 * a) * b);\r\n    }\r\n}\r\n\r\nfloat alphaStraightBlend(float a, float b, float alpha) {\r\n    return (a * alpha) + (b * (1.0 - alpha));\r\n}\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    //Blit and Inferior Alpha\r\n    if (uBlendMode == 0 || uBlendMode == 4) {\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec3 finalColor = mix(backGround.rgb, diffuse.rgb, diffuse.a);\r\n\r\n        diffuse  = vec4(finalColor.rgb, 1.0);\r\n    } else\r\n    if (uBlendMode == 1) {\r\n        // Multiply blending //\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 multTexture = diffuse;\r\n        vec3 finalColor = (diffuse.rgb * backGround.rgb);\r\n\r\n        diffuse  = vec4(finalColor.rgb, 1.0);\r\n    }  else if (uBlendMode == 2) {\r\n        // Overlay Blending //\r\n        if (diffuse.a < 0.001) discard;\r\n\r\n        vec4 overlayTex = diffuse;\r\n\r\n        vec3 finalColor = vec3(\r\n            overlayBlend(overlayTex.r, backGround.r),\r\n            overlayBlend(overlayTex.g, backGround.g),\r\n            overlayBlend(overlayTex.b, backGround.b)\r\n        );\r\n\r\n        vec3 mainTexVisible = backGround.rgb * (1.0 - overlayTex.a);\r\n        vec3 overlayTexVisible = finalColor.rgb * (overlayTex.a);\r\n        finalColor = (mainTexVisible + overlayTexVisible);\r\n\r\n        diffuse = vec4(finalColor, backGround.a);\r\n//        diffuse = vec4(finalColor, 1.0);\r\n//        diffuse  = vec4(finalColor.rgb, overlayTex.a);\r\n    } else if (uBlendMode == 3) {\r\n//        if (diffuse.a > 0.5) discard;\r\n        // Alpha Straight //\r\n        vec4 overlayTex = diffuse;\r\n\r\n        float alphaMult = 1.0;\r\n        vec3 finalColor = vec3(\r\n            alphaStraightBlend(overlayTex.r, backGround.r, alphaMult*overlayTex.a),\r\n            alphaStraightBlend(overlayTex.g, backGround.g, alphaMult*overlayTex.a),\r\n            alphaStraightBlend(overlayTex.b, backGround.b, alphaMult*overlayTex.a)\r\n        );\r\n\r\n        diffuse  = vec4(finalColor.rgb, 1.0);\r\n//        diffuse  = vec4(1.0,1.0,1.0, 1.0-overlayTex.a);\r\n    }\r\n\r\n    gl_FragColor = diffuse;\r\n}",
              ],
              null,
              null
            )),
              (e.b = ue(
                t,
                [
                  Ko,
                  "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform int uBlendMode;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 specular = texture2D( uSpecularTexture, vTextCoords.xy );\r\n    if (diffuse.a < 0.001) discard;\r\n    gl_FragColor = vec4(specular.rgb, 1.0);\r\n}",
                ],
                null,
                null
              )),
              (e.c = ue(
                t,
                [
                  Ko,
                  "precision mediump float;\r\n\r\nvarying vec2 vTextCoords;\r\nuniform sampler2D uDiffuseTexture;\r\nuniform sampler2D uSpecularTexture;\r\nuniform sampler2D uEmissiveTexture;\r\nuniform sampler2D renderResultTexture;\r\nuniform vec2 screenResolution;\r\nuniform int uBlendMode;\r\nuniform float emissiveAlphaOverride;\r\nuniform int layer;\r\n\r\nvoid main() {\r\n    vec4 diffuse = texture2D( uDiffuseTexture, vTextCoords.xy );\r\n    vec4 emissive = texture2D( uEmissiveTexture, vTextCoords.xy );\r\n    vec4 backGround = texture2D( renderResultTexture, gl_FragCoord.xy / screenResolution );\r\n\r\n    if (diffuse.a < 0.001) discard;\r\n//    if (emissive.a < 0.001) discard;\r\n\r\n    //TODO: This is a hack from what was obeserved in Nightbourn texture customization with tatoos.\r\n    //TODO: But Maybe switch should be over layer or something else instead of blend\r\n    float alpha = 1.0;\r\n\r\n    if (emissiveAlphaOverride > -1.0) {\r\n        alpha = emissiveAlphaOverride;\r\n    } else if (layer <= 1) {\r\n        alpha = 0.0;\r\n    } else {\r\n        alpha = emissive.a;\r\n    }\r\n\r\n\r\n    gl_FragColor = vec4(emissive.rgb, alpha);\r\n}",
                ],
                null,
                null
              )),
              (e.d = {}),
              (e.f = t.createBuffer()),
              t.bindBuffer(t.ARRAY_BUFFER, e.f),
              t.bufferData(
                t.ARRAY_BUFFER,
                new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
                t.STATIC_DRAW
              ),
              t.bindBuffer(t.ARRAY_BUFFER, null),
              (e.e = t.createBuffer()),
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e.e),
              t.bufferData(
                t.ELEMENT_ARRAY_BUFFER,
                new Int16Array([0, 1, 2, 1, 3, 2]),
                t.STATIC_DRAW
              ),
              t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null),
              (e.g = t.createFramebuffer()),
              (e.h = {
                loc: t.getAttribLocation(e.a.program, "aTextCoord"),
                type: t.FLOAT,
                size: 2,
                offset: 0,
                stride: 0,
              });
          })(t);
      }
      i() {
        let t = this.e;
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
            this.f,
            this.g,
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
            this.f,
            this.g,
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
            this.f,
            this.g,
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
            this.f,
            this.g,
            0,
            t.RGBA,
            t.UNSIGNED_BYTE,
            null
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
          t.bindTexture(t.TEXTURE_2D, null),
          t.bindFramebuffer(t.FRAMEBUFFER, tl.g),
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
          t.useProgram(tl.b.program),
          t.bindBuffer(t.ARRAY_BUFFER, tl.f),
          t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, tl.e),
          tl.i.disableAll(),
          tl.i.enable(t, [tl.h]),
          t.viewport(0, 0, this.f, this.g);
      }
      j(t, e, i, r, n, s, a, o) {
        let l = this.e;
        (tl.d.x = e),
          (tl.d.y = i),
          (tl.d.width = r),
          (tl.d.height = n),
          (null == t.b && null == t.c) || (this.h = !0);
        let h = 0;
        4 == s
          ? (h = 1)
          : 6 == s
          ? (h = 2)
          : 9 == s
          ? (h = 3)
          : 15 == s && (h = 4),
          (tl.d.uBlendMode = h),
          (tl.d.screenResolution = new Float32Array([this.f, this.g])),
          (tl.d.uDiffuseTexture = null != t.a ? t.a.d : el),
          (tl.d.uSpecularTexture = null != t.b ? t.b.d : el),
          (tl.d.uEmissiveTexture = null != t.c ? t.c.d : il),
          (tl.d.renderResultTexture = null != this.d ? this.d : el),
          (tl.d.layer = a),
          (tl.d.emissiveAlphaOverride = o),
          l.disable(l.CULL_FACE),
          l.disable(l.DEPTH_TEST),
          l.disable(l.BLEND),
          l.useProgram(tl.a.program),
          l.framebufferTexture2D(
            l.FRAMEBUFFER,
            l.COLOR_ATTACHMENT0,
            l.TEXTURE_2D,
            this.a,
            0
          ),
          l.bindTexture(l.TEXTURE_2D, this.d),
          l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.f, this.g, 0),
          l.bindTexture(l.TEXTURE_2D, null),
          ae(tl.a, tl.d),
          l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
          l.useProgram(tl.b.program),
          l.framebufferTexture2D(
            l.FRAMEBUFFER,
            l.COLOR_ATTACHMENT0,
            l.TEXTURE_2D,
            this.b,
            0
          ),
          l.bindTexture(l.TEXTURE_2D, this.d),
          l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.f, this.g, 0),
          l.bindTexture(l.TEXTURE_2D, null),
          ae(tl.b, tl.d),
          l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
          l.useProgram(tl.c.program),
          l.framebufferTexture2D(
            l.FRAMEBUFFER,
            l.COLOR_ATTACHMENT0,
            l.TEXTURE_2D,
            this.c,
            0
          ),
          l.bindTexture(l.TEXTURE_2D, this.d),
          l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.f, this.g, 0),
          l.bindTexture(l.TEXTURE_2D, null),
          ae(tl.c, tl.d),
          l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
          l.useProgram(null);
      }
      k() {
        let t = this.e;
        t.bindFramebuffer(t.FRAMEBUFFER, null),
          t.enable(t.CULL_FACE),
          t.enable(t.DEPTH_TEST);
      }
    }
    class nl {
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
        if (0 != e.size) {
          e.size > 1 && WH.debug("more than 1 skinned model detected!");
          let i = t[0],
            r = { type: di.PATH, id: i, parent: this.a, shoulder: 0 };
          this.a.aS = new cl(this.a.aT, this.a.l, r, 0, !1, !1, !1);
        }
      }
      d(t) {
        return Mo.a(
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
          this.a.bw(0);
        for (let t = 0; t < this.a.L.length; t++) this.a.L[t] = -1;
        if (this.a.aS)
          for (let t = 0; t < this.a.aS.L.length; t++) this.a.aS.L[t] = -1;
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
              e.length > 0 && this.a.bw(e[0].BoneSet.BoneFileDataID);
              let n = r.Elements.filter(
                (e) =>
                  e.Material &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              n.sort((t, e) => e.VariationChoiceID - t.VariationChoiceID),
                n.forEach((t) => {
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
                    ? 1 == i.TextureType
                      ? t.Material.TextureTarget == ji
                        ? (this.a.D[1][0] = this.a.bC(1, e))
                        : this.a.E[t.Material.TextureTarget] ||
                          (this.a.E[t.Material.TextureTarget] = this.a.bC(
                            i.TextureSection,
                            e
                          ))
                      : 6 == i.TextureType
                      ? (this.a.D[6][0] = this.a.bC(6, e))
                      : 7 == i.TextureType
                      ? (this.a.D[7][0] = this.a.bC(7, e))
                      : 8 == i.TextureType
                      ? (this.a.D[8][0] = this.a.bC(8, e))
                      : 10 == i.TextureType
                      ? (this.a.D[10][0] = this.a.bC(10, e))
                      : 19 == i.TextureType
                      ? (this.a.D[19][0] = this.a.bC(19, e))
                      : 20 == i.TextureType
                      ? (this.a.D[20][0] = this.a.bC(20, e))
                      : 21 == i.TextureType
                      ? (this.a.D[21][0] = this.a.bC(21, e))
                      : 22 == i.TextureType
                      ? (this.a.D[22][0] = this.a.bC(22, e))
                      : WH.debug(
                          "unhandled texture type",
                          i.TextureType,
                          "target",
                          t.Material.TextureTarget
                        )
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
                ).forEach((t) => {
                  WH.debug("element geoset", t), this.a.bF(t.Geoset);
                }),
                r.Elements.filter(
                  (e) =>
                    e.SkinnedModel &&
                    (0 == e.VariationChoiceID ||
                      t.some((t) => t.choiceId == e.VariationChoiceID))
                ).forEach((t) => {
                  WH.debug("element skinnedmodel", t),
                    this.a.aS && this.a.aS.bF(t.SkinnedModel);
                });
              let s = r.Elements.find(
                (e) =>
                  0 != e.CondModelFileDataId &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              if (24 == i.Id || 353 == i.Id)
                if (s && !this.a.c) {
                  WH.debug("element condModel", s);
                  let e = this.a.aT,
                    i = this.a.a,
                    r = e.models.indexOf(this.a);
                  if (r > -1) {
                    e.models.splice(r, 1),
                      WH.debug("test 1!", t, e.options, i),
                      (e.options.charCustomization = this.a.r);
                    let n = new cl(
                      e,
                      e.options,
                      i,
                      r,
                      !0,
                      !1,
                      !1,
                      s.CondModelFileDataId
                    );
                    return (n.r = this.a.r), e.models.push(n), void this.a.bb();
                  }
                } else if (!s && this.a.c) {
                  let e = this.a.aT,
                    i = this.a.a,
                    r = e.models.indexOf(this.a);
                  if (r > -1) {
                    e.models.splice(r, 1),
                      WH.debug("test 2!", t, e.options, i),
                      (e.options.charCustomization = this.a.r);
                    let n = new cl(e, e.options, i, r, !0, !1, !1);
                    return (n.r = this.a.r), e.models.push(n), void this.a.bb();
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
        if (!this.a.D[6][0]) {
          let e = this.b.Options.find((t) => t.Id == this.b.HairStyleOptionId);
          if (e) {
            let i = e.Choices[1];
            if (i) {
              let e = i.Elements.filter(
                (e) =>
                  e.Material &&
                  e.Material.TextureTarget == qi &&
                  (0 == e.VariationChoiceID ||
                    t.some((t) => t.choiceId == e.VariationChoiceID))
              );
              if (e.length > 0) {
                let t = this.d(e[0].Material.MaterialResourcesID);
                t && (this.a.D[6][0] = this.a.bC(6, t));
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
    const sl = function (t, e) {
        const i = Math.abs(t),
          r = Math.abs(e);
        return (
          Number((i - Math.floor(i / r) * r).toPrecision(8)) * Math.sign(t)
        );
      },
      al = 44,
      ol = 4400,
      ll = "DressingRoom",
      hl = "Stand";
    class ul {
      constructor(t, e, i, r, n, s, a, o) {
        (this.f = !1),
          (this.s = 0),
          (this.t = null),
          (this.u = null),
          (this.F = []),
          (this.N = []),
          (this.S = new Or()),
          (this.U = !1),
          (this.ao = []),
          (this.aH = []),
          (this.aI = []),
          (this.aK = null),
          (this.aR = !1),
          (this.aU = null),
          (this.aV = null),
          (this.aW = null),
          (this.aY = []),
          (this.bZ = !1);
        var l = this;
        if (
          ((l.f = n),
          (l.aT = t),
          (l.a = i),
          (l.b = r),
          (l.c = o),
          (l.d = !1),
          (l.g = !0),
          (l.h = !0),
          (this.i = !1),
          (l.ae = s),
          (l.l = e),
          "classic" == l.l.gameDataEnv
            ? ((Ti[14] = 14), (Ti[15] = 15))
            : ((Ti[14] = 22), (Ti[15] = 22)),
          (l.j = null),
          (l.m =
            l.l.mount && l.l.mount.type == di.NPC && l.l.mount.id == l.a.id),
          (l.k = null),
          (l.n = l.l.pet && l.l.pet.type == di.NPC && l.l.pet.id == l.a.id),
          l.a.type == di.CHARACTER &&
            l.l.mount &&
            l.l.mount.type == di.NPC &&
            l.l.mount.id &&
            ((l.l.mount.parent = l),
            (l.j = new ul(t, e, l.l.mount, 0, !1, !1, !1))),
          l.a.type == di.CHARACTER &&
            l.l.pet &&
            l.l.pet.type == di.NPC &&
            l.l.pet.id &&
            ((l.l.pet.parent = l),
            (l.k = new ul(t, e, l.l.pet, 0, !1, !1, !1))),
          l.l.extraModels && !l.a.parent)
        ) {
          l.B = [];
          const i = l.l.extraModels;
          if ($.isArray(i))
            for (let r = 0; r < i.length; ++r) {
              const n = { type: di.PATH, id: i[r][0], parent: l, shoulder: -1 };
              l.B.push(new ul(t, e, n, 0, !1, !1, !1));
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
          (l.C = {}),
          (l.aK = null),
          (l.aL = null),
          (l.D = []);
        for (let t = 0; t < 25; t++) l.D.push({});
        (l.E = {}),
          (l.I = -1),
          (l.J = -1),
          (l.K = new Array(al)),
          (l.L = new Array(al)),
          (l.M = [
            1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1,
            1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1,
          ]),
          (l.O = null),
          (l.P = 0);
        for (let t = 0; t < al; t++) l.K[t] = 100 * t + l.M[t];
        (l.Q = 0),
          (l.R = 0),
          (l.S.c = 0),
          (l.S.a.a = -1),
          (l.T = !1),
          (l.V = We()),
          (l.W = sr(1, 1, 1, 1)),
          (l.X = [0.35, 0.35, 0.35, 1]),
          (l.Y = [1, 1, 1, 1]),
          (l.Z = [0.35, 0.35, 0.35, 1]),
          (l.aa = ye()),
          (l.ab = ye()),
          (l.ac = ye()),
          Be(l.aa, [5, -3, 3]),
          Be(l.ab, [5, 5, 5]),
          Be(l.ac, [-5, -5, -5]),
          (l.ad = !1),
          (l.af = Ce(0, 0, 0)),
          (l.ag = Ce(0, 0, 0)),
          (l.ah = Ce(0, 0, 0)),
          (l.boundsSize = Ce(0, 0, 0)),
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
          (l.aN = We()),
          (l.aO = ye()),
          (l.aP = ye()),
          (l.aQ = rr()),
          a || l.bR();
      }
      ba(t) {
        if (this[t]) {
          for (var e = this[t], i = 0; i < e.length; ++i)
            e[i] && e[i].destroy && e[i].destroy(), (e[i] = null);
          this[t] = null;
        }
      }
      bb() {
        var t = this;
        if (((this.aR = !0), (this.d = !1), t.aL && t.aL.d(), t.D))
          for (let e = 0; e < t.D.length; ++e)
            for (const i in t.D[e]) t.D[e][i].d();
        if (t.C) for (const e in t.C) t.C[e].h();
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
        (t.aw = null),
          this.ba("vertices"),
          this.ba("animations"),
          this.ba("bones"),
          this.ba("meshes"),
          this.ba("texUnits"),
          this.ba("materials"),
          this.ba("textureAnims"),
          this.ba("attachments"),
          this.ba("colors"),
          this.ba("alphas"),
          this.ba("particleEmitters"),
          this.ba("ribbonEmitters"),
          this.ba("skins"),
          this.ba("faces"),
          this.ba("hairs"),
          (this.ao = null),
          t.y &&
            t.y.forEach((e, i) => {
              e.x(), t.y.set(i, null);
            }),
          t.j && t.j.bb(),
          (t.j = null),
          t.k && t.k.bb(),
          (t.k = null),
          t.aS && t.aS.bb(),
          (t.aS = null),
          (t.a = null),
          (t.y = null),
          (t.C = null),
          (t.D = null),
          (t.K = null),
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
          ? ll
          : "";
      }
      resetAnimation() {
        (this.j ? this.j : this).setAnimation(hl);
      }
      setAnimPaused(t) {
        var e;
        (this.T = t),
          null === (e = this.j) || void 0 === e || e.setAnimPaused(t),
          this.F.forEach((e) => e.f(t));
      }
      setAnimNoSubAnim(t) {
        this.U = t;
      }
      bh(t) {
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
          this.bM(e),
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
          this.bM(i),
          (this.x = !0);
      }
      clearSlots(t) {
        WH.debug("clearSlots", t);
        const e = t.split(",");
        for (let t = 0; t < e.length; ++t) {
          this.bO(parseInt(e[t]));
          const i = [];
          this.l.items.forEach((e) => {
            0 != this.l.items[t].indexOf(parseInt(e)) && i.push(e);
          }),
            (this.l.items = i);
        }
        this.bL(), (this.x = !0);
      }
      setShouldersOverride(t) {
        if ((WH.debug("setShouldersOverride", t), !t || 2 != t.length)) return;
        for (let t = 0; t < 2; t++) {
          const e = this.z[t];
          e && e.x(), (this.z[t] = null);
        }
        for (let e = 0; e < 2; e++)
          if (null != t[e]) {
            const i = new Do(this, Ci, t[e], this.o, this.p);
            let r = 0;
            (r = 0 == e ? 1 : 2), i.B(r), (this.z[e] = i);
          }
        const e = this.y.get(Ci);
        if (e) {
          let t = 3;
          for (let e = 0; e < 2; e++) this.z[e] && (t &= ~(1 << e));
          e.B(t);
        }
      }
      setSheath(t, e) {
        (this.I = t), (this.J = e), this.bL();
      }
      setAppearance(t) {
        var e;
        const i = function (t, e) {
          t[e].d(), delete t[e];
        };
        if (
          (this.D[1][0] && i(this.D[1], 0),
          this.D[6][0] && i(this.D[6], 0),
          this.D[8][0] && i(this.D[8], 0),
          this.D[19][0] && i(this.D[19], 0),
          this.D[19][1] && i(this.D[19], 1),
          this.E)
        )
          for (const t in this.E) this.E[t].d(), delete this.E[t];
        (this.r = t),
          (this.I = t.sheathMain),
          (this.J = t.sheathOff),
          null === (e = this.G) || void 0 === e || e.e(t.options),
          (this.x = !0),
          this.bD(),
          this.bL();
      }
      setCustomizationsLoadedCallback(t) {
        this.H = t;
      }
      setModelLoadedCallback(t) {
        this.e = t;
      }
      isLoaded() {
        return this.j ? this.j.d && this.d : this.d;
      }
      setParticlesEnabled(t) {
        (this.g = t),
          this.y.forEach(function (e) {
            if (e.i)
              for (let i = 0; i < e.i.length; ++i)
                if (
                  e.i[i] &&
                  (e.i[i].e.setParticlesEnabled(t), e.r[i] && e.r[i].b)
                ) {
                  const r = e.i[i].e;
                  for (let n = 0; n < e.r[i].b.length; n++)
                    r.aC &&
                      r.aC[n] &&
                      e.r[i].b[n] &&
                      e.r[i].b[n].e.setParticlesEnabled(t);
                }
          });
      }
      setRibbonsEnabled(t) {
        this.h = t;
      }
      getTexUnits() {
        return this.aM;
      }
      bu(t, e, i, r) {
        Xe(this.V, t),
          $e(this.V, this.V, e),
          i && Qe(this.V, this.V, i),
          r && $e(this.V, this.V, r);
      }
      bv(t, e) {
        let i = !1;
        const r = t == ll;
        r && (t = hl);
        for (let n = 0; n < this.ao.length; ++n) {
          const s = this.ao[n];
          if (s.j && s.j == t && 0 == s.b) {
            (i = !0),
              (e.a.a = n),
              (e.a.b = s),
              (e.a.c = 0),
              (e.b = new zr()),
              (e.c = 0),
              (e.d = r),
              WH.debug("Set animation to", s.a, s.j);
            break;
          }
        }
        t == hl || i || this.bv(hl, e);
      }
      bw(t) {
        if (this.s == t) return;
        if (this.d)
          for (let t = 0; t < this.aq.length; t++) this.aq[t].v = null;
        if (((this.s = t), t <= 0)) return;
        let e = this.l.contentPath + "bone/" + t + ".bone",
          i = this;
        $.ajax({
          url: e,
          type: "GET",
          dataType: "binary",
          responseType: "arraybuffer",
          processData: !1,
          renderer: this.aT,
          success: function (t) {
            i.bx(t);
          },
          error: function (t, e, i) {
            console.log(i);
          },
        });
      }
      bx(t) {
        let e = new jo(t);
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
              let t = Ze(
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
        this.d && this.by();
      }
      by() {
        if (!(this.s <= 0) && this.t && this.t.length)
          for (let t = 0; t < this.t.length; t++)
            this.aq[this.t[t]].v = this.u[t];
      }
      setAnimation(t) {
        this.ao &&
          (this.j &&
            (this.j.setAnimation(t),
            (t = ci[this.j.a.id] ? "StealthStand" : "Mount")),
          this.bv(t, this.S),
          this.y.forEach((e) => {
            if (e.i)
              for (let i = 0; i < e.i.length; i++) e.i[i].e.setAnimation(t);
          }),
          this.F && this.F.forEach((e) => e.e(t)));
      }
      bA(t) {
        let e = this,
          i = e.aT.context;
        if (!e.al || !e.am) return;
        const r = 10 * e.al.length;
        if ((e.aU || (e.aU = new Float32Array(r)), t)) {
          var n = e.aU,
            s = e.al;
          for (let t = 0, e = 0; t < r; ++e)
            (n[t + 0] = s[e].i[0]),
              (n[t + 1] = s[e].i[1]),
              (n[t + 2] = s[e].i[2]),
              (n[t + 3] = s[e].j[0]),
              (n[t + 4] = s[e].j[1]),
              (n[t + 5] = s[e].j[2]),
              (n[t + 6] = s[e].c),
              (n[t + 7] = s[e].d),
              (n[t + 8] = s[e].e),
              (n[t + 9] = s[e].f),
              (t += 10);
        }
        e.aV
          ? (i.bindBuffer(i.ARRAY_BUFFER, e.aV),
            i.bufferSubData(i.ARRAY_BUFFER, 0, e.aU))
          : ((e.aV = i.createBuffer()),
            i.bindBuffer(i.ARRAY_BUFFER, e.aV),
            i.bufferData(i.ARRAY_BUFFER, e.aU, i.DYNAMIC_DRAW),
            (e.aW = i.createBuffer()),
            i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.aW),
            i.bufferData(
              i.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(e.am),
              i.STATIC_DRAW
            ));
      }
      bB() {
        let t,
          e = this,
          i = sr(1, 1, 1, 1),
          r = e.af,
          n = e.ag,
          s = e.aO;
        if ((Me(r, 9999, 9999, 999), Me(n, -9999, -9999, -9999), !e.au))
          return Je(e.V), e.w || (e.aT.distance = 1), !1;
        for (let s = 0; s < e.au.length; ++s) {
          let a = e.au[s];
          if (!a.show) continue;
          if (
            ((i[0] = i[1] = i[2] = i[3] = 1),
            e.S.a.a > 0 &&
              (a.v && (i = a.v.g(e.S, this.aY)),
              a.w[0] && (i[3] *= a.w[0].d(e.S, this.aY))),
            i[3] < 0.01)
          )
            continue;
          let o = a.p;
          for (let i = 0; i < o.f; ++i)
            (t = e.al[e.am[o.e + i]].i), Re(r, r, t), Ie(n, n, t);
        }
        const a = e.aS;
        if (a && a.d && a.au && a.au.length > 0)
          for (let e = 0; e < a.au.length; ++e) {
            let i = a.au[e];
            if (!i.show) continue;
            let s = i.p;
            for (let e = 0; e < s.f; ++e)
              (t = a.al[a.am[s.e + e]].i), Re(r, r, t), Ie(n, n, t);
          }
        e.j &&
          e.j.d &&
          e.j.bB() &&
          (Se(r, Ue(r, e.j.af, 1.1)),
          Se(n, Ue(n, e.j.ag, 1.1)),
          (n[2] *= 1.75)),
          e.a.type == di.NPC && (Ue(r, r, e.v.Scale), Ue(n, n, e.v.Scale)),
          ke(e.boundsSize, n, r),
          Pe(e.ah, r, e.boundsSize, 0.5);
        let o,
          l,
          h = e.boundsSize[2];
        const u = e.v && e.v.Scale ? e.v.Scale : 1;
        if (
          (e.a.type != di.ITEM
            ? ((o = e.boundsSize[1]), (l = e.boundsSize[0]))
            : ((o = e.boundsSize[0]), (l = e.boundsSize[1])),
          !e.w)
        ) {
          const t = e.aT.width / e.aT.height,
            i = 2 * Math.tan((e.aT.fov / 2) * 0.0174532925),
            r = (1.2 * h) / i,
            n = (1.2 * o) / (i * t);
          e.aT.distance = Math.max(Math.max(r, n), 2 * l);
        }
        return (
          Je(e.V),
          e.a.type != di.ITEM && ri(e.V, e.V, Math.PI / 2),
          Qe(e.V, e.V, Oe(s, e.ah)),
          Me(e.aO, u, u, u),
          ti(e.V, e.V, e.aO),
          !0
        );
      }
      bC(t, e) {
        let i = new $o();
        return (
          e.a > 0 && (i.a = new mo(this, t, e.a)),
          e.b > 0 && (i.b = new mo(this, t, e.b)),
          e.c > 0 && (i.c = new mo(this, t, e.c)),
          i
        );
      }
      bD() {
        this.aR ||
          ((this.a.type != di.CHARACTER &&
            this.a.type != di.NPC &&
            this.a.type != di.HUMANOIDNPC) ||
          this.o < 1
            ? this.bH()
            : (this.bJ(), this.aL || (this.x = !0)));
      }
      bE(t) {
        t && (this.K[t.geosetType] = 100 * t.geosetType + t.geosetID);
      }
      bF(t) {
        t && (this.L[t.GeosetType] = 100 * t.GeosetType + t.GeosetID);
      }
      bG(t, e, i) {
        if (!this.au || 0 == this.au.length) return !1;
        let r;
        for (let n = 0; n < this.au.length; ++n)
          (r = this.au[n]), r.meshId >= t && r.meshId <= e && (r.show = i);
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
            let n = r[t].m,
              s = this.aq[e].m;
            (r[t].s = !0), Xe(n, s);
          }
          Je(this.aN), t.bu(this.V, this.aN), t.bY(), t.ca(e);
        }
      }
      bJ() {
        var t = this;
        if (!t.au || 0 == t.au.length) return;
        for (let e = 0; e < al; e++) t.K[e] = 100 * e + t.M[e];
        t.bG(0, ol, !1), t.bG(0, 0, !0);
        for (let e = 0; e < t.L.length; e++)
          -1 != this.L[e] && (this.K[e] = this.L[e]);
        for (let e = 0; e < t.K.length; e++) t.bG(t.K[e], t.K[e], !0);
        let e = t.y.get(Ei),
          i = t.y.get(Si),
          r = t.y.get(Mi),
          n = t.y.get(Di),
          s = t.y.get(ki),
          a = t.y.get(Fi),
          o = t.y.get(Ri),
          l = t.y.get(Ii),
          h = t.y.get(Bi),
          u = t.y.get(Oi);
        function c(t, e, i) {
          if (!t.au) return;
          let r = i + 1,
            n = e > 0 ? i + e : r,
            s = t.au.some((t) => t.meshId == n);
          (n = s ? n : r), t.bG(n, n, !0);
        }
        function f(t, e, i) {
          if (!t.au) return;
          let r = 100 * i,
            n = r + t.M[i] + e;
          t.bG(r, r + 99, !1), t.bG(n, n, !0);
        }
        if (
          (t.y.forEach((t) => {
            if (t && t.q) {
              let e = t.q;
              e.bG(0, ol, !1),
                t.b == Ei
                  ? (c(e, t.k[0], 2700), c(e, t.k[1], 2100))
                  : t.b == Ci
                  ? c(e, t.k[0], 2600)
                  : t.b == Si
                  ? (c(e, t.k[0], 800), c(e, t.k[1], 1e3))
                  : t.b == Mi || t.b == Ni
                  ? (c(e, t.k[0], 800),
                    c(e, t.k[1], 1e3),
                    c(e, t.k[2], 1300),
                    c(e, t.k[3], 2200),
                    c(e, t.k[4], 2800))
                  : t.b == Di
                  ? c(e, t.k[0], 1800)
                  : t.b == ki
                  ? (c(e, t.k[0], 1100), c(e, t.k[1], 900), c(e, t.k[2], 1300))
                  : t.b == Fi
                  ? (c(e, t.k[0], 500), c(e, t.k[1], 2e3))
                  : t.b == Ii
                  ? (c(e, t.k[0], 400), c(e, t.k[1], 2300))
                  : t.b == Oi
                  ? c(e, t.k[0], 1500)
                  : t.b == Bi && c(e, t.k[0], 1200);
            }
          }),
          t.y.forEach((t) => {
            if (t && t.i)
              for (let e of t.i) {
                let i = e.e;
                t.b == Ei
                  ? (f(i, t.l[0], 27), f(i, t.l[1], 21))
                  : t.b == Ci
                  ? f(i, t.l[0], 26)
                  : t.b == Si
                  ? (f(i, t.l[0], 8), f(i, t.l[1], 10))
                  : t.b == Mi || t.b == Ni
                  ? (f(i, t.l[0], 8),
                    f(i, t.l[1], 10),
                    f(i, t.l[2], 13),
                    f(i, t.l[3], 22),
                    f(i, t.l[4], 28))
                  : t.b == Di
                  ? f(i, t.l[0], 18)
                  : t.b == ki
                  ? (f(i, t.l[0], 11), f(i, t.l[1], 9), f(i, t.l[2], 13))
                  : t.b == Fi
                  ? (f(i, t.l[0], 5), f(i, t.l[1], 20))
                  : t.b == Ii
                  ? (f(i, t.l[0], 4), f(i, t.l[1], 23))
                  : t.b == Oi
                  ? f(i, t.l[0], 15)
                  : t.b == Bi && f(i, t.l[0], 12);
              }
          }),
          e)
        ) {
          const i = t.o,
            r = t.p == bi.MALE ? e.v : e.w;
          if (r)
            for (let e = 0; e < r.length; e++)
              if (r[e].RaceId == i) {
                const n = r[e].GeosetGroup;
                if (i == gi && (1 == n || 2 == n)) continue;
                if (n < al)
                  if (0 == n) t.bG(1, 99, !1);
                  else {
                    const e = 100 * n;
                    t.bG(e, e + 99, !1);
                  }
              }
        }
        let d = 0;
        if ((h && (d |= 16), l && l.k && l.k[0])) {
          let e = 401 + l.k[0];
          t.bG(401, 499, !1), t.bG(e, e, !0), (l.f += 2);
        } else if (r && r.k && r.k[0]) {
          let e = 801 + r.k[0];
          t.bG(e, e, !0);
        }
        if (!(r || n || o) && i && i.k && i.k[0]) {
          let e = 801 + i.k[0];
          t.bG(e, e, !0);
        }
        if (h)
          0 == (1048576 & h.h) && (t.bG(2200, 2299, !1), t.bG(2202, 2202, !0));
        else if (r && r.k && r.k[3]) {
          let e = 2201 + r.k[3];
          t.bG(2200, 2299, !1), t.bG(e, e, !0);
        }
        let b = !1;
        n && n.k && n.k[0] && (b = 0 != (512 & n.h));
        let g,
          _ = !1,
          p = !1;
        if (r && r.k && r.k[2]) {
          (p = !0),
            t.bG(501, 599, !1),
            t.bG(902, 999, !1),
            t.bG(1100, 1199, !1),
            t.bG(1300, 1399, !1);
          let e = 1301 + r.k[2];
          t.bG(e, e, !0);
        } else if (s && s.k && s.k[2]) {
          (_ = !0),
            t.bG(501, 599, !1),
            t.bG(902, 999, !1),
            t.bG(1100, 1199, !1),
            t.bG(1300, 1399, !1);
          let e = 1301 + s.k[2];
          t.bG(e, e, !0);
        } else if (a && a.k && a.k[0]) {
          t.bG(501, 599, !1), t.bG(901, 901, !0);
          let e = 501 + a.k[0];
          t.bG(e, e, !0);
        } else {
          let e;
          (e = s && s.k && s.k[1] ? 901 + s.k[1] : 901), t.bG(e, e, !0);
        }
        (g =
          a && a.k && a.k[1]
            ? 2e3 + a.k[1]
            : a && 0 == (1048576 & a.h)
            ? 2002
            : 2001),
          t.bG(2001, 2099, !1),
          t.bG(g, g, !0);
        let m = !1,
          v = p || _;
        if (!v && h && h.k && h.k[0]) {
          let e;
          (m = !1),
            b ? ((m = !0), (e = 1203)) : ((m = !0), (e = 1201 + h.k[0])),
            t.bG(e, e, !0);
        } else
          16 & d &&
            (t.bG(1201, 1201, !0), v || (t.bG(1202, 1202, !0), (m = !0)));
        if (!m && !p)
          if (r && r.k && r.k[1]) {
            let e = 1001 + r.k[1];
            t.bG(e, e, !0);
          } else if (i && i.k && i.k[1]) {
            let e = 1001 + i.k[1];
            t.bG(e, e, !0);
          }
        if (!p && s && s.k && s.k[0]) {
          let e = s.k[0],
            i = 1101 + e;
          e > 2 ? (t.bG(1300, 1399, !1), t.bG(i, i, !0)) : m || t.bG(i, i, !0);
        }
        if (u && u.k && u.k[0]) {
          t.bG(1500, 1599, !1);
          let e = 1501 + u.k[0];
          if (this.N.length > 0)
            for (let t of this.N) {
              const i = fi[t];
              i && 15 == i.a && i.b == u.k[0] + 1 && (e = 1500 + i.c);
            }
          t.bG(e, e, !0);
        }
        if (n && n.k && n.k[0]) {
          t.bG(1800, 1899, !1);
          let e = 1801 + n.k[0];
          t.bG(e, e, !0);
        }
        if (
          (s || p || _ || m || b ? t.bG(1400, 1499, !1) : t.bG(1401, 1401, !0),
          t.aS)
        ) {
          let e = t.aS;
          e.bG(0, ol, !1);
          for (let t = 0; t < e.L.length; t++)
            if ((e.bG(e.L[t], e.L[t], !0), e.au)) {
              let i = e.L[t];
              if (e.au.some((t) => t.meshId == i)) {
                let e = 100 * t;
                this.bG(e, e + 99, !1);
              }
            }
        }
      }
      bK() {
        var t,
          e = this;
        let i = !1;
        if (
          (e.y.forEach((t) => {
            if (t.m || t.n) {
              if (t.j)
                for (let e = 0; e < t.j.length; ++e)
                  t.j[e].texture && !t.j[e].texture.g() && (i = !0);
            } else i = !0;
          }),
          i)
        )
          return;
        if (!e.D[1][0] || (e.D[1][0] && !e.D[1][0].e())) return;
        if (!this.aK) {
          var r = e.D[1][0].a,
            n = r.a.width,
            s = r.a.height;
          this.aK = new rl(e.aT.context, n, s);
        }
        let a = this.aK;
        a.i();
        let o = !0,
          l = !0;
        (e.o != _i && e.o != pi) || (l = !1),
          e.y.forEach((t) => {
            let e = t.e;
            (e != Si && e != Mi && e != Bi) || (o = !1), e == ki && (l = !1);
          });
        let h,
          u = $i;
        a.f != a.g && (u = Qi);
        let c = this.G.b.TextureLayers,
          f = this.G.b.TextureSections,
          d = -1;
        if (this.o == mi)
          for (let t of c)
            9 == t.BlendMode &&
              1 == t.TextureType &&
              t.Layer > d &&
              (d = t.Layer);
        for (let i of c) {
          if (1 != i.TextureType) continue;
          if (0 == i.Layer) {
            a.j(e.D[1][0], 0, 0, 1, 1, 0, 0, 0);
            continue;
          }
          let r = -1;
          i.Layer == d && (r = 0);
          let n = this.E[i.ChrModelTextureTargetID];
          if (n) {
            if (!n.e())
              return void WH.debug(
                "texture target",
                i.ChrModelTextureTargetID,
                "layer",
                i.Layer,
                "not ready!"
              );
            let e = i.TextureSection;
            if ((e != Xi && e != Zi) || (o && e == Xi) || (l && e == Zi)) {
              let s = 0,
                o = 0,
                l = 1,
                c = 1;
              if (-1 != e)
                if (f) {
                  let t = f.find((t) => t.SectionType == e);
                  (s = t.X), (o = t.Y), (l = t.Width), (c = t.Height);
                } else (h = u[e]), (s = h.x), (o = h.y), (l = h.w), (c = h.h);
              a.j(n, s, o, l, c, i.BlendMode, i.Layer, r),
                WH.debug(
                  "texLayer",
                  i.BlendMode,
                  i.Layer,
                  null === (t = n.a) || void 0 === t ? void 0 : t.c
                );
            }
          }
        }
        let b = [];
        e.y.forEach((t) => {
          b.push(t);
        }),
          b.sort(function (t, e) {
            return t.f - e.f;
          });
        for (let t = 0; t < b.length; ++t) {
          let i = b[t];
          if (i.j)
            for (let t = 0; t < i.j.length; ++t) {
              let r = i.j[t];
              if (
                r.gender == e.p &&
                r.texture &&
                r.texture.g() &&
                r.region != Ki
              ) {
                if (0 != (2 & e.v.RaceFlags) && r.region == Ji) continue;
                h = u[r.region];
                let t = new $o();
                (t.a = r.texture), a.j(t, h.x, h.y, h.w, h.h, 0, -1, -1);
              }
            }
        }
        a.k(), (e.x = !1);
      }
      bL() {
        if (!this.d) return;
        let t = (-1 == this.J || !this.J) && null != this.y.get(Hi),
          e = !(
            (-1 != this.I && this.I) ||
            (null == this.y.get(Ui) && null == this.y.get(Li))
          );
        for (let e of Yi) {
          let i = this.as[e];
          i > 0 && i < this.aq.length && this.aq[i].A(t ? "HandsClosed" : "");
        }
        for (let t of Wi) {
          let i = this.as[t];
          i > 0 && i < this.aq.length && this.aq[i].A(e ? "HandsClosed" : "");
        }
      }
      bM(t) {
        if ($.isArray(t))
          for (let e = 0; e < t.length; ++e) this.bN(t[e][0], t[e][1], t[e][2]);
        else for (let e in t) this.bN(parseInt(e), t[e]);
        this.bL();
      }
      bN(t, e, i) {
        let r = new Do(this, t, e, this.o, this.p);
        i && r.A(i);
        let n = r.e,
          s = yi[t];
        this.y.get(n) && 0 != s
          ? ((r.e = s), this.y.set(s, r))
          : this.y.set(n, r);
      }
      bO(t) {
        var e = this.y.get(t);
        e || ((t = Ti[t]), (e = this.y.get(t))), e && (this.y.delete(t), e.x());
      }
      bP(t, e) {
        const i = [],
          r = {
            [Pi]: (t) => [0],
            [Vi]: (t) => (2 == t.c && 18 == t.d ? [1] : null),
          };
        if (this.aC && this.aD) {
          const n = {
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
          if (n[t]) {
            const r = n[t](e);
            for (let n = 0; n < r.length; ++n) {
              let s = r[n];
              (this.I >= 0 || this.J >= 0 || this.j) && er[t] && (s = er[t]),
                this.I >= 0 && t == Li && ir[this.I][t] && (s = ir[this.I][t]),
                this.J >= 0 && t == Hi && ir[this.J][t] && (s = ir[this.J][t]),
                e.g == zi &&
                  this.J >= 0 &&
                  t == Hi &&
                  ir[this.J][e.b] &&
                  (s = ir[this.J][e.b]),
                s >= this.aD.length || -1 == this.aD[s] || i.push(this.aD[s]);
            }
          }
        }
        return i;
      }
      bQ() {
        var t;
        if (this.au) {
          for (let t = 0; t < this.au.length; ++t) this.au[t].K(this);
          this.aM = this.au.concat();
        }
        this.setAnimation(hl),
          this.bA(!0),
          this.bB(),
          this.bD(),
          (this.d = !0),
          this.by(),
          this.bL(),
          this.m && this.w.d && this.w.bB(),
          this.n && this.w.d && this.w.bB(),
          this.w && this.w.d && !this.ae && this.w.bJ(),
          null === (t = this.e) || void 0 === t || t.call(this);
      }
      bR() {
        this.a && this.a.type && this.a.id && this.bS(this.a.type, this.a.id);
      }
      bS(t, e) {
        let i,
          r = this;
        t == di.ITEM
          ? (i = "meta/item/")
          : t == di.HELM
          ? (i = "meta/armor/1/")
          : t == di.SHOULDER
          ? (i = "meta/armor/3/")
          : t == di.NPC || t == di.HUMANOIDNPC
          ? (i = "meta/npc/")
          : t == di.OBJECT
          ? (i = "meta/object/")
          : t == di.CHARACTER
          ? (i = "meta/character/")
          : t == di.ITEMVISUAL && (i = "meta/itemvisual/"),
          i
            ? ((i = this.l.contentPath + i + e + ".json"),
              (function (t) {
                $.getJSON(i)
                  .done(function (e) {
                    r.bU(e, t);
                  })
                  .fail(function (t, e, i) {
                    let r = e + ", " + i;
                    console.log("Model:_load Error loading metadata: " + r);
                  });
              })(t))
            : t == di.PATH &&
              (this.v || (this.v = {}),
              (i = this.l.contentPath + "mo3/" + e + ".mo3"),
              $.ajax({
                url: i,
                type: "GET",
                dataType: "binary",
                responseType: "arraybuffer",
                processData: !1,
                renderer: this.aT,
                success: function (t) {
                  r.bV(t);
                },
                error: function (t, e, i) {
                  console.log(i);
                },
              }));
      }
      bT(t, e, i) {
        const r = tr[e];
        if (r) {
          const e = i ? 4 : 0;
          return r.slice(2 * t + e, 2 * t + e + 2);
        }
      }
      bU(t, e) {
        var i,
          r,
          n = this;
        if ((e || (e = n.a.type), n.v || (n.v = t), e == di.CHARACTER)) {
          let e = this.c ? this.c : t.Model;
          (n.o = t.Race),
            (n.p = t.Gender),
            n.l.cls && (n.q = parseInt(n.l.cls));
          let s =
            n.l.contentPath +
            "meta/charactercustomization2/" +
            t.Race +
            "_" +
            t.Gender +
            ".json";
          if (
            ($.getJSON(s, function (t) {
              var e, i, r;
              if (
                (WH.debug("Got customization data v2", t),
                (n.G = new nl(n, t)),
                null === (e = n.H) || void 0 === e || e.call(n, n.G.b),
                n.G.c(),
                n.r)
              )
                n.setAppearance(n.r);
              else if (
                n.a.type != di.CHARACTER &&
                n.v.Race > 0 &&
                (null ===
                  (r =
                    null === (i = n.v) || void 0 === i ? void 0 : i.Creature) ||
                void 0 === r
                  ? void 0
                  : r.CreatureCustomizations)
              ) {
                let t = n.G.g(n.v.Creature.CreatureCustomizations);
                n.setAppearance(t);
              } else n.G.f();
              n.x && n.bD();
            }),
            n.v.Creature &&
              n.v.Creature.Texture &&
              (n.aL = this.bC(
                -1,
                Mo.a(null, n.v.TextureFiles[n.v.Creature.Texture], 3, 0, 0)
              )),
            n.bS(di.PATH, e),
            n.v.Equipment && n.bM(n.v.Equipment),
            n.l.items && n.bM(n.l.items),
            n.l.shouldersOverride &&
              n.setShouldersOverride(n.l.shouldersOverride),
            n.a.type != di.CHARACTER && n.v.Race > 0)
          ) {
            if (
              n.G &&
              (null ===
                (r =
                  null === (i = n.v) || void 0 === i ? void 0 : i.Creature) ||
              void 0 === r
                ? void 0
                : r.CreatureCustomizations)
            ) {
              let t = n.G.g(n.v.Creature.CreatureCustomizations);
              n.r = t;
            }
          } else n.l.charCustomization && (n.r = n.l.charCustomization);
        } else if (e == di.HELM) {
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
                ? n.bS(di.PATH, t.ModelFiles[s][0].FileDataId)
                : (n.w ||
                    t.ModelFiles[s].some((t) => t.Race == e) ||
                    (e = t.ModelFiles[s][0].Race),
                  n.bS(di.PATH, Mo.b(n, t.ModelFiles[s], -1, i, r, e))));
          }
          if (t.Textures)
            for (let e in t.Textures)
              0 != t.Textures[e] &&
                (n.C[parseInt(e)] = new mo(n, parseInt(e), t.Textures[e]));
        } else if (e == di.SHOULDER) {
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
                  n.bS(di.PATH, Mo.b(n, t.ModelFiles[s], 0, i, r, e)),
                t.Textures)
              )
                for (let e in t.Textures)
                  0 != t.Textures[e] &&
                    (n.C[+e] = new mo(n, parseInt(e), t.Textures[e]));
            } else if (
              (2 == n.a.shoulder || (void 0 === n.a.shoulder && a)) &&
              (a &&
                t.ModelFiles[a] &&
                n.bS(di.PATH, Mo.b(n, t.ModelFiles[a], 1, i, r, e)),
              t.Textures2)
            )
              for (let e in t.Textures2)
                0 != t.Textures2[e] &&
                  (n.C[+e] = new mo(n, parseInt(e), t.Textures2[e]));
          }
        } else if (e == di.ITEMVISUAL) n.bS(di.PATH, t.Equipment[n.b]);
        else if (e == di.ITEM) {
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
              n.bS(di.PATH, Mo.b(n, t.ModelFiles[s], -1, i, r, e));
          }
          if (t.Textures)
            for (let e in t.Textures)
              0 != t.Textures[e] &&
                (n.C[+e] = new mo(n, parseInt(e), t.Textures[e]));
        } else {
          if (
            (t.stateKit && this.F.push(new Co(this, t.stateKit.effects)),
            t.Creature &&
              ((n.O = t.Creature.CreatureGeosetData),
              (n.P = t.Creature.CreatureGeosetDataID)),
            t.Textures)
          )
            for (let e in t.Textures)
              0 != t.Textures[e] &&
                (n.C[+e] = new mo(n, parseInt(e), t.Textures[e]));
          else if (t.ComponentTextures && n.w) {
            let e = n.w.p;
            for (let i in t.ComponentTextures) {
              let r = t.TextureFiles[t.ComponentTextures[i]];
              for (let t = 0; t < r.length; t++) {
                let s = r[t];
                (s.Gender != e && 3 != s.Gender) ||
                  (n.C[+i] = new mo(n, parseInt(i), s.FileDataId));
              }
            }
          }
          if (t.Model) n.bS(di.PATH, t.Model);
          else if (t.Race > 0) {
            const e = xi[t.Race] + bi[t.Gender];
            (n.o = t.Race), (n.p = t.Gender), n.bS(di.CHARACTER, e);
          }
        }
      }
      bV(t) {
        if (!t) return void console.error("Bad buffer for DataView");
        let e = this,
          i = new jo(t);
        if (604210112 != i.getUint32())
          return void console.log("Bad magic value");
        if (i.getUint32() < 2e3) return void console.log("Bad version");
        e.ak = i.getUint32();
        var r = i.getUint32(),
          n = i.getUint32(),
          s = i.getUint32(),
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
          S = i.getUint32(),
          M = i.getUint32();
        let D = new Uint8Array(t, i.position),
          k = null;
        try {
          k = lo(D);
        } catch (t) {
          return void console.log("Decompression error: " + t);
        }
        if (k.length < M) console.log("Unexpected data size", k.length, M);
        else {
          (i = new jo(k.buffer)), (i.position = r);
          var F,
            R = i.getInt32();
          if (R > 0) {
            e.al = new Array(R);
            for (let t = 0; t < R; ++t) e.al[t] = new br(i);
          }
          if (((i.position = n), (F = i.getInt32()) > 0)) {
            e.am = new Array(F);
            for (let t = 0; t < F; ++t) e.am[t] = i.getUint16();
          }
          if (((i.position = s), (F = i.getInt32()) > 0)) {
            (e.an = new Array(F)), (e.aY = new Array(F));
            for (let t = 0; t < F; ++t)
              (e.an[t] = i.getUint32()), (e.aY[t] = 0);
          }
          i.position = a;
          var I = i.getInt32();
          if (I > 0) {
            e.ao = new Array(I);
            for (let t = 0; t < I; ++t) e.ao[t] = new gr(i);
          }
          i.position = o;
          var U = i.getInt32();
          if (U > 0) {
            e.ap = new Array(U);
            for (let t = 0; t < U; ++t) e.ap[t] = i.getInt16();
          }
          i.position = l;
          var P = i.getInt32();
          if (P > 0) {
            e.aq = new Array(P);
            for (let t = 0; t < P; ++t) e.aq[t] = new Kr(e, t, i);
            this.aj = new Array(P);
            for (let t = 0; t < P; t++) {
              this.aj[t] = [];
              for (let i = 0; i < P; i++) e.aq[i].e == t && this.aj[t].push(i);
            }
          }
          i.position = h;
          var z = i.getInt32();
          if (z > 0) {
            e.ar = new Array(z);
            for (let t = 0; t < z; ++t) e.ar[t] = i.getInt16();
          }
          i.position = u;
          var O = i.getInt32();
          if (O > 0) {
            e.as = new Array(O);
            for (let t = 0; t < O; ++t) e.as[t] = i.getInt16();
          }
          i.position = c;
          var B = i.getInt32();
          if (B > 0) {
            e.at = new Array(B);
            for (let t = 0; t < B; ++t) e.at[t] = new $r(i);
          }
          i.position = f;
          var N = i.getInt32();
          if (N > 0) {
            e.au = new Array(N);
            for (let t = 0; t < N; ++t) e.au[t] = new po(i);
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
            for (let t = 0; t < H; ++t) e.aw[t] = new ho(i);
          }
          i.position = g;
          var G = i.getInt32();
          if (G > 0) {
            e.ax = new Array(G);
            for (let t = 0; t < G; ++t) e.ax[t] = new vo(e, t, i);
          }
          i.position = _;
          var V = i.getInt32();
          if (V > 0) {
            e.ay = new Array(V);
            for (let t = 0; t < V; ++t) e.ay[t] = i.getInt16();
          }
          i.position = p;
          var j = i.getInt32();
          if (j > 0) {
            e.az = new Array(j);
            for (let t = 0; t < j; ++t) e.az[t] = new xo(i);
          }
          i.position = m;
          var q = i.getInt32();
          if (q > 0) {
            e.aA = new Array(q);
            for (let t = 0; t < q; ++t) e.aA[t] = i.getInt16();
          }
          i.position = v;
          var Y = i.getInt32();
          if (Y > 0) {
            e.aB = new Array(Y);
            for (let t = 0; t < Y; ++t) e.aB[t] = i.getInt16();
          }
          i.position = x;
          var W = i.getInt32();
          if (W > 0) {
            e.aC = new Array(W);
            for (let t = 0; t < W; ++t) e.aC[t] = new To(i);
          }
          i.position = T;
          var X = i.getInt32();
          if (X > 0) {
            e.aD = new Array(X);
            for (let t = 0; t < X; ++t) e.aD[t] = i.getInt16();
          }
          i.position = w;
          var Z = i.getInt32();
          if (Z > 0) {
            e.aE = new Array(Z);
            for (let t = 0; t < Z; ++t) e.aE[t] = new wo(i);
          }
          i.position = y;
          var J = i.getInt32();
          if (J > 0) {
            e.aF = new Array(J);
            for (let t = 0; t < J; ++t) e.aF[t] = new yo(i);
          }
          i.position = A;
          var K = i.getInt32();
          if (K > 0) {
            e.aG = new Array(K);
            for (let t = 0; t < K; ++t) e.aG[t] = i.getInt16();
          }
          i.position = E;
          var $ = i.getInt32();
          if ($ > 0) {
            e.aH = new Array($);
            for (let t = 0; t < $; ++t) e.aH[t] = new Go(e, i);
          }
          i.position = S;
          var Q = i.getInt32();
          if (Q > 0 && S > 0) {
            e.aJ = new Array(Q);
            for (let t = 0; t < Q; ++t) e.aJ[t] = new Vo(i);
          }
          i.position = C;
          var tt = i.getInt32();
          if (tt > 0) {
            e.aI = new Array(tt);
            for (let t = 0; t < tt; ++t) e.aI[t] = new Jo(e, i);
          }
          e.bQ();
        }
      }
      bW(t) {
        var e = Tr();
        if ((wr(e, t), this.aH))
          for (var i = 0; i < this.aH.length; i++) this.aH[i].Z(t, e);
        if (this.aI) for (i = 0; i < this.aI.length; i++) this.aI[i].an(t);
      }
      bX(t) {
        let e = null;
        return this.aD && this.aD.length
          ? ((e =
              t < this.aD.length ? this.aC[this.aD[t]] : this.aC[this.aD[0]]),
            e)
          : null;
      }
      bY() {
        const t = this;
        if (!t.d) return;
        t.R++;
        let e = t.aT.time - t.Q;
        if ((e > 0 && (t.Q = t.aT.time), this.f && this.S.a && this.S.a.b)) {
          let i = ye();
          const r = [4, 119, 233, 242, 348, 526, 527, 544, 545];
          [5, 143, 234, 524, 525, 540, 541, 556, 557].indexOf(this.S.a.b.a) > -1
            ? (i = Ce(0, (-5 * e) / 1e3, 0))
            : r.indexOf(this.S.a.b.a) > -1 && (i = Ce(0, (-3 * e) / 1e3, 0));
          let n = We();
          if (
            (ni(n, i),
            this.bW(n),
            this.j && this.j.bW(n),
            this.aS && this.aS.bW(n),
            t.B)
          )
            for (let e = 0; e < t.B.length; e++) this.aS.bW(n);
        }
        if (!this.T && t.S.a.a > -1) {
          let t = e;
          for (let e = 0; e < this.aY.length; e++)
            (this.aY[e] += t), this.an[e] > 0 && (this.aY[e] %= this.an[e]);
          this.cZ(this.S, t);
        }
        let i,
          r,
          n,
          s = t.au ? t.au.length : 0;
        for (let e = 0; e < s; ++e)
          if (((n = t.au[e]), n.show)) {
            (i = n.p.f), (r = n.p.e);
            for (let e = 0; e < i; ++e) t.al[t.am[r + e]].k = t.R;
          }
        t.aM &&
          t.aM.sort(function (t, e) {
            return t.b != e.b ? t.b - e.b : t.meshId - e.meshId;
          });
        let a = t.aq.length,
          o = t.aU;
        if (t.aq && t.ao) {
          for (let e = 0; e < a; ++e) t.aq[e].r = !1;
          for (let i = 0; i < a; ++i) t.aq[i].C(e);
          if (t.al) {
            let e,
              i,
              r,
              n,
              s = t.al.length,
              a = t.aP,
              l = t.aQ;
            for (let h = 0; h < s; ++h) {
              if (((e = t.al[h]), e.k != t.R)) continue;
              (n = h * 10),
                (o[n] =
                  o[n + 1] =
                  o[n + 2] =
                  o[n + 3] =
                  o[n + 4] =
                  o[n + 5] =
                    0);
              for (let s = 0; s < 4; ++s)
                (r = e.g[s] / 255),
                  r > 0 &&
                    ((i = t.aq[e.h[s]]),
                    Ge(a, e.a, i.m),
                    fr(l, e.b, i.m),
                    (o[n + 0] += a[0] * r),
                    (o[n + 1] += a[1] * r),
                    (o[n + 2] += a[2] * r),
                    (o[n + 3] += l[0] * r),
                    (o[n + 4] += l[1] * r),
                    (o[n + 5] += l[2] * r));
              (e.i[0] = o[n + 0]),
                (e.i[1] = o[n + 1]),
                (e.i[2] = o[n + 2]),
                (e.j[0] = o[n + 3]),
                (e.j[1] = o[n + 4]),
                (e.j[2] = o[n + 5]);
            }
            t.bA(!1), t.ad || ((t.ad = !0), t.bB());
          }
        }
        if (t.j && t.j.d) {
          const e = t.j.aC[t.j.aD[0]],
            i = 1 / t.j.v.Scale;
          Me(t.aO, i, i, i),
            Je(t.aN),
            ti(t.aN, t.aN, t.aO),
            t.bu(t.j.V, t.j.aq[e.b].m, e.c, t.aN);
        }
        if (t.k && t.k.d) {
          const e = t.aC[t.aD[19]],
            i = t.l.pet.scale || 0.2 / t.k.v.Scale;
          Me(t.aO, i, i, i), Je(t.aN), ti(t.aN, t.aN, t.aO);
          const r = Ae(e.c);
          De(r, r, t.l.pet.offset || Ce(0, -1.25, 0)),
            t.k.bu(t.V, t.aq[e.b].m, r, t.aN);
        }
        ui[t.a.id] && !t.w && (Je(t.V), Me(t.aO, 1, 1, -1), ti(t.V, t.V, t.aO)),
          t.x && t.bK();
      }
      cZ(t, e) {
        if (((t.a.c += e), t.b.a < 0 && !this.U && !t.d))
          if (t.a.b.h > -1) {
            let e = 32767 * Math.random(),
              i = 0,
              r = t.a.a,
              n = this.ao[r];
            for (i += n.d; i < e && n.h > -1; )
              (r = n.h), (n = this.ao[r]), (i += n.d);
            (t.b.a = r), (t.b.b = this.ao[r]), (t.b.c = 0);
          } else {
            let e = this.ao.find((e) => e.a == t.a.b.a && 0 == e.b);
            e && ((t.b.a = e.i), (t.b.b = e), (t.b.c = 0));
          }
        let i = t.a,
          r = t.b,
          n = i.b.g - i.c,
          s = 0,
          a = null;
        if (
          (r.a > -1 && ((a = this.ao[r.a]), (s = a.e)),
          s > 0 && n < s ? ((r.c = sl(s - n, a.g)), (t.c = n / s)) : (t.c = 1),
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
            (t.a = r), (t.b = new zr()), (t.c = 1);
          } else i.b.g > 0 && (i.c = sl(i.c, i.b.g));
      }
      ca(t) {
        var e = this;
        if (
          (this.w ? ar(e.W, this.w.W) : (e.W = sr(1, 1, 1, 1)),
          e.j && e.j.ca(t),
          e.d)
        ) {
          if (
            (e.k && e.k.ca(t),
            e.bY(),
            this.F && this.F.forEach((e) => e.g(t)),
            (e.aX = {
              uModelMatrix: e.V,
              uViewMatrix: e.aT.viewMatrix,
              uProjMatrix: e.aT.projMatrix,
              uCameraPos: e.aT.eye,
              uAmbientColor: e.X,
              uDiffuseColor: e.W,
              uPrimaryColor: e.Y,
              uSecondaryColor: e.Z,
              uLightDir1: e.aa,
              uLightDir2: e.ab,
              uLightDir3: e.ac,
            }),
            e.aV && e.aM)
          )
            for (let i = 0; i < e.aM.length; ++i) e.aM[i].show && e.aM[i].N(t);
          if (e.aH && e.g)
            for (let i = 0; i < e.aH.length; ++i) {
              let r = e.aJ ? e.aJ[i] : null;
              e.aH[i].X(e.S, e.aT.delta, r), e.aH[i].Y(t);
            }
          if (e.aI && e.h)
            for (let i = 0; i < e.aI.length; ++i)
              e.aI[i].ar(e.S, e.aT.delta), e.aI[i].av(), e.aI[i].aw(t);
          if (
            (e.aS && e.bI(e.aS, t),
            e.y.forEach((i, r) => {
              if (i) {
                if (2 == i.c && 13 == i.d) {
                  if (i.e == Li && -1 != e.I) return;
                  if (i.e == Hi && -1 != e.J) return;
                }
                i.C(t);
              }
            }),
            e.z.forEach((e, i) => {
              e && e.i && e.C(t);
            }),
            e.B)
          )
            for (let i = 0; i < e.B.length; i++)
              for (let i = 0; i < e.B.length; i++) {
                let r = e.B[i];
                if (!r.d) continue;
                let n = e.aD[e.l.extraModels[i][1]];
                if (-1 == n) {
                  console.log(
                    "invalid extra model attachment",
                    e.l.extraModels[i][1]
                  );
                  continue;
                }
                let s = e.aC[n],
                  a = e.l.extraModels[i][2];
                Me(e.aO, a, a, a),
                  Je(e.aN),
                  ti(e.aN, e.aN, e.aO),
                  ei(e.aN, e.aN, e.l.extraModels[i][3]),
                  ii(e.aN, e.aN, e.l.extraModels[i][4]),
                  ri(e.aN, e.aN, e.l.extraModels[i][5]),
                  r.bu(e.V, e.aq[s.b].m, s.c, e.aN),
                  r.bY(),
                  r.ca(t);
              }
          e.y.forEach((i, r) => {
            i && i.q && e.bI(i.q, t);
          });
        }
      }
    }
    const cl = ul,
      fl = { 2: "Wowhead", 3: "LolKing", 6: "HeroKing", 7: "DestinyDB" };
    class dl {
      constructor(t) {
        if (!t.type || !fl[t.type]) throw "Viewer error: Bad viewer type given";
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
          (this.renderer = new gl(this)),
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
        t ? dl.requestFullscreen(this.renderer.canvas[0]) : dl.exitFullscreen();
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
    const bl = dl;
    const gl = class {
      constructor(t) {
        (this.currFrame = 0),
          (this.clearColor = Ce(0, 0, 0)),
          (this.addedCss = !1),
          (this.progressShown = !1),
          (this.canvasObserver = null),
          (this.attributeState = new me()),
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
          (e.translation = Ce(0, 0, 0)),
          (e.target = Ce(0, 0, 0)),
          (e.eye = Ce(0, 0, 0)),
          (e.up = Ce(0, 0, 1)),
          (e.lookDir = ye()),
          (e.fullscreen = !1),
          (e.projMatrix = We()),
          (e.viewMatrix = We()),
          (e.panningMatrix = We()),
          (e.viewOffset = ye()),
          (e.aniFilterExt = null),
          (e.aniFilterMax = 0),
          this.addedCss ||
            ((this.addedCss = !0),
            $("head").append(
              '<link rel="stylesheet" href="//wow.zamimg.com/modelviewer/live/viewer/viewer.css" type="text/css" />'
            ));
      }
      updateProgress() {
        var t = this,
          e = 0,
          i = 0;
        for (var r in t.downloads)
          (e += t.downloads[r].total), (i += t.downloads[r].loaded);
        if (e <= 0)
          t.progressShown &&
            (t.progressBg.hide(), t.progressBar.hide(), (t.progressShown = !1));
        else {
          t.progressShown ||
            (t.progressBg.show(), t.progressBar.show(), (t.progressShown = !0));
          var n = i / e;
          t.progressBar.width(Math.round(t.width * n) + "px");
        }
      }
      destroyCanvasObserver() {
        var t;
        this.canvasObserver &&
          (this.canvas && this.canvasObserver.unobserve(this.canvas[0]),
          (null === (t = this.viewer) || void 0 === t ? void 0 : t.container) &&
            this.canvasObserver.unobserve(this.viewer.container[0]),
          (this.canvasObserver = null));
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
            $(document)
              .off("mouseup touchend", t.onMouseUp)
              .off("mousemove touchmove", t.onMouseMove),
            t.destroyCanvasObserver(),
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
          t.models[i].bb(), (t.models[i] = null);
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
        let n = new Array();
        for (e = 0; e < i.models.length; ++e) i.models[e].ca(n);
        n.sort((t, e) => {
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
          n.forEach((t) => {
            r.useProgram(t.a.program),
              r.bindBuffer(r.ARRAY_BUFFER, t.c),
              r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t.d),
              this.attributeState.enable(r, t.a.attributes),
              ae(t.a, t.b),
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
        this.translation = Ce(t, e, i);
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
          ke(t.lookDir, t.target, t.eye),
          Be(t.lookDir, t.lookDir),
          (function (t, e, i, r) {
            var n,
              s,
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
            Math.abs(b - x) < Te && Math.abs(g - T) < Te && Math.abs(_ - w) < Te
              ? Je(t)
              : ((u = b - x),
                (c = g - T),
                (f = _ - w),
                (n = m * (f *= d = 1 / Math.hypot(u, c, f)) - v * (c *= d)),
                (s = v * (u *= d) - p * f),
                (a = p * c - m * u),
                (d = Math.hypot(n, s, a))
                  ? ((n *= d = 1 / d), (s *= d), (a *= d))
                  : ((n = 0), (s = 0), (a = 0)),
                (o = c * a - f * s),
                (l = f * n - u * a),
                (h = u * s - c * n),
                (d = Math.hypot(o, l, h))
                  ? ((o *= d = 1 / d), (l *= d), (h *= d))
                  : ((o = 0), (l = 0), (h = 0)),
                (t[0] = n),
                (t[1] = o),
                (t[2] = u),
                (t[3] = 0),
                (t[4] = s),
                (t[5] = l),
                (t[6] = c),
                (t[7] = 0),
                (t[8] = a),
                (t[9] = h),
                (t[10] = f),
                (t[11] = 0),
                (t[12] = -(n * b + s * g + a * _)),
                (t[13] = -(o * b + l * g + h * _)),
                (t[14] = -(u * b + c * g + f * _)),
                (t[15] = 1));
          })(t.viewMatrix, t.eye, t.target, t.up),
          Je(t.panningMatrix),
          1 == t.up[2]
            ? Me(t.viewOffset, t.translation[0], -t.translation[1], 0)
            : Me(t.viewOffset, t.translation[0], 0, t.translation[1]),
          Qe(t.panningMatrix, t.panningMatrix, t.viewOffset),
          $e(t.viewMatrix, t.panningMatrix, t.viewMatrix);
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
            new Uint8Array([0, 0, 0, 1])
          ),
          i.bindTexture(i.TEXTURE_2D, null),
          li(e.projMatrix, 0.0174532925 * e.fov, e.viewer.aspect, 0.1, 5e3),
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
        if (2 === e.viewer.type) r = cl;
        if ((e.options.models || e.options.items) && r) {
          var n = [].concat(e.options.models);
          if (n.length > 0)
            for (t = 0; t < n.length; ++t)
              e.models.push(new r(e, e.options, n[t], t, !0, !1, !1));
        }
        !(function t() {
          if (!e.stop) {
            window.requestAnimationFrame(t);
            var r = e.getTime();
            if (!1 !== e.makeDataURL) {
              if (e.canvas[0].toDataURL) {
                var n = e.clearColor,
                  s = e.bgTexture;
                e.options.transparent &&
                  ((e.bgTexture = null), (e.clearColor = Ce(0, 0, 0))),
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
                  ? ((e.clearColor = Ce(1, 1, 1)),
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
                  (e.clearColor = n),
                  (e.bgTexture = s);
              }
              e.makeDataURL = !1;
            }
            e.draw(r);
          }
        })();
      }
      onDoubleClick(t) {
        bl.isFullscreen()
          ? bl.exitFullscreen()
          : bl.requestFullscreen(this.canvas[0]);
      }
      onFullscreen(t) {
        let e = this;
        if (e.viewer.container)
          if ((!e.fullscreen && bl.isFullscreen()) || this.addaptiveMode) {
            if (
              ((e.restoreWidth = e.width),
              (e.restoreHeight = e.height),
              (e.fullscreen = !0),
              bl.isFullscreen())
            ) {
              var i = $(window);
              let t = window.screen.width || i.width(),
                e = window.screen.height || i.height();
              this.onResize(t, e, t / e);
            } else if (this.addaptiveMode) {
              var r = e.viewer.container;
              this.onResize(r.width(), r.height(), r.width() / r.height());
            }
          } else if (e.fullscreen && !bl.isFullscreen())
            (e.fullscreen = !1),
              this.onResize(e.restoreWidth, e.restoreHeight, e.viewer.aspect);
          else {
            r = e.viewer.container;
            this.onResize(r.width(), r.height(), r.width() / r.height());
          }
      }
      onResize(t, e, i) {
        this.resize(t, e),
          li(this.projMatrix, 0.0174532925 * this.fov, i, 0.1, 5e3);
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
          var n = ((i - e.mouseX) / e.width) * Math.PI * 2,
            s = ((r - e.mouseY) / e.width) * Math.PI * 2;
          if (e.mouseDown) {
            1 == e.up[2] ? (e.azimuth -= n) : (e.azimuth += n), (e.zenith += s);
            for (var a = 2 * Math.PI; e.azimuth < 0; ) e.azimuth += a;
            for (; e.azimuth > a; ) e.azimuth -= a;
            e.zenith < 1e-4 && (e.zenith = 1e-4),
              e.zenith >= Math.PI && (e.zenith = Math.PI - 1e-4);
          } else (e.translation[0] += n), (e.translation[1] += s);
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
              (this.canvasObserver = new ResizeObserver((t) => {
                t && this.onFullscreen(null);
              })),
              this.canvasObserver.observe(i.canvas[0]),
              this.canvasObserver.observe(i.viewer.container[0]),
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
                i.destroyCanvasObserver(),
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
              n = e.createProgram();
            e.attachShader(n, i),
              e.attachShader(n, r),
              e.linkProgram(n),
              e.getProgramParameter(n, e.LINK_STATUS)
                ? ((t.vs = i),
                  (t.fs = r),
                  (t.program = n),
                  (t.uTexture = e.getUniformLocation(n, "uTexture")),
                  (t.aPosition = e.getAttribLocation(n, "aPosition")),
                  (t.aTexCoord = e.getAttribLocation(n, "aTexCoord")))
                : console.error("Error linking shaders");
          },
          r = function () {
            var i = t.width / t.bgImg.width,
              r = t.height / t.bgImg.height;
            const n = [-1, -1, 0, r, 1, -1, i, r, -1, 1, 0, 0, 1, 1, i, 0];
            e.bindBuffer(e.ARRAY_BUFFER, t.vb),
              e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(n));
          };
        t.bgImg
          ? t.bgImg.loaded && (t.vb || i(), r())
          : ((t.bgImg = new Image()),
            (t.bgImg.crossOrigin = ""),
            (t.bgImg.onload = function () {
              (t.bgImg.loaded = !0),
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
    let _l = { Types: di };
    const pl = Object.assign(bl, {
      Tools: xe,
      WebGL: gl,
      WEBGL: 1,
      WOW: 2,
      FLASH: 2,
      Wow: _l,
    });
    window.ZamModelViewer = pl;
  })();
})();
