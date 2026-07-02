
// https://github.com/photopea/Typr.js/tree/gh-pages

var Typr = function() {
    var g = {};
    g.parse = function(x) {
        var T = function(E, j, f, r) {
            var Y = g.B,
                k = g.T,
                I = {
                    cmap: k.v,
                    head: k.head,
                    hhea: k.aJ,
                    maxp: k.aq,
                    hmtx: k.aI,
                    name: k.name,
                    "OS/2": k.N,
                    post: k.b1,
                    loca: k.aF,
                    kern: k.g,
                    glyf: k.n,
                    "CFF ": k.L,
                    CBLC: k.aM,
                    CBDT: k.ap,
                    "SVG ": k.au,
                    COLR: k.ag,
                    CPAL: k.aZ,
                    sbix: k.az
                },
                o = {
                    _data: E,
                    _index: j,
                    _offset: f
                };
            for (var s in I) {
                var $ = g.findTable(E, s, f);
                if ($) {
                    var z = $[0],
                        K = r[z];
                    if (K == null) K = I[s].Q(E, z, $[1], o);
                    o[s] = r[z] = K
                }
            }
            return o
        },
        Y = g.B,
        E = new Uint8Array(x),
        r = {},
        Z = Y.B(E, 0, 4);
        if (Z == "ttcf") {
            var f = 4,
                d = Y.k(E, f);
            f += 2;
            var F = Y.k(E, f);
            f += 2;
            var b = Y.u(E, f);
            f += 4;
            var n = [];
            for (var v = 0; v < b; v++) {
                var W = Y.u(E, f);
                f += 4;
                n.push(T(E, v, W, r))
            }
            return n
        } else return [T(E, 0, 0, r)]
    };
    g.findTable = function(x, T, Y) {
        var E = g.B,
            r = E.k(x, Y + 4),
            Z = Y + 12;
        for (var f = 0; f < r; f++) {
            var F = E.B(x, Z, 4),
                b = E.u(x, Z + 4),
                n = E.u(x, Z + 8),
                v = E.u(x, Z + 12);
            if (F == T) return [n, v];
            Z += 16
        }
        return null
    };
    g.T = {};
    g.B = {
        i: function(x, T) {
            return (x[T] << 8 | x[T + 1]) + (x[T + 2] << 8 | x[T + 3]) / (256 * 256 + 4)
        },
        f: function(x, T) {
            var Y = g.B.X(x, T);
            return Y / 16384
        },
        a: function(x, T) {
            var Y = g.B.e.q;
            Y[0] = x[T + 3];
            Y[1] = x[T + 2];
            Y[2] = x[T + 1];
            Y[3] = x[T];
            return g.B.e.b6[0]
        },
        U: function(x, T) {
            var Y = g.B.e.q;
            Y[0] = x[T];
            return g.B.e.aK[0]
        },
        X: function(x, T) {
            var Y = g.B.e.af;
            Y[0] = x[T] << 8 | x[T + 1];
            return g.B.e.aC[0]
        },
        k: function(x, T) {
            return x[T] << 8 | x[T + 1]
        },
        ad: function(x, T, Y) {
            x[T] = Y >> 8 & 255;
            x[T + 1] = Y & 255
        },
        a$: function(x, T, Y) {
            var E = [];
            for (var r = 0; r < Y; r++) {
                var Z = g.B.k(x, T + r * 2);
                E.push(Z)
            }
            return E
        },
        u: function(x, T) {
            var Y = g.B.e.q;
            Y[3] = x[T];
            Y[2] = x[T + 1];
            Y[1] = x[T + 2];
            Y[0] = x[T + 3];
            return g.B.e.b5[0]
        },
        b2: function(x, T, Y) {
            x[T] = Y >> 24 & 255;
            x[T + 1] = Y >> 16 & 255;
            x[T + 2] = Y >> 8 & 255;
            x[T + 3] = Y >> 0 & 255
        },
        A: function(x, T) {
            return g.B.u(x, T) * (4294967295 + 1) + g.B.u(x, T + 4)
        },
        B: function(x, T, Y) {
            var E = "";
            for (var r = 0; r < Y; r++) E += String.fromCharCode(x[T + r]);
            return E
        },
        ak: function(x, T, Y) {
            for (var E = 0; E < Y.length; E++) x[T + E] = Y.charCodeAt(E)
        },
        K: function(x, T, Y) {
            var E = "";
            for (var r = 0; r < Y; r++) {
                var Z = x[T++] << 8 | x[T++];
                E += String.fromCharCode(Z)
            }
            return E
        },
        aU: window.TextDecoder ? new window.TextDecoder : null,
        aT: function(x, T, Y) {
            var E = g.B.aU;
            if (E && T == 0 && Y == x.length) return E.decode(x);
            return g.B.B(x, T, Y)
        },
        d: function(x, T, Y) {
            var E = [];
            for (var r = 0; r < Y; r++) E.push(x[T + r]);
            return E
        },
        ai: function(x, T, Y) {
            var E = [];
            for (var r = 0; r < Y; r++) E.push(String.fromCharCode(x[T + r]));
            return E
        },
        e: function() {
            var x = new ArrayBuffer(8);
            return {
                b0: x,
                aK: new Int8Array(x),
                q: new Uint8Array(x),
                aC: new Int16Array(x),
                af: new Uint16Array(x),
                b6: new Int32Array(x),
                b5: new Uint32Array(x)
            }
        }()
    };
    g.T.L = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = g.T.L;
            x = new Uint8Array(x.buffer, T, Y);
            T = 0;
            var Z = x[T];
            T++;
            var f = x[T];
            T++;
            var d = x[T];
            T++;
            var F = x[T];
            T++;
            var b = [];
            T = r.W(x, T, b);
            var n = [];
            for (var v = 0; v < b.length - 1; v++) n.push(E.B(x, T + b[v], b[v + 1] - b[v]));
            T += b[b.length - 1];
            var W = [];
            T = r.W(x, T, W);
            var j = [];
            for (var v = 0; v < W.length - 1; v++) j.push(r.T(x, T + W[v], T + W[v + 1]));
            T += W[W.length - 1];
            var k = j[0],
                I = [];
            T = r.W(x, T, I);
            var o = [];
            for (var v = 0; v < I.length - 1; v++) o.push(E.B(x, T + I[v], I[v + 1] - I[v]));
            T += I[I.length - 1];
            r.o(x, T, k);
            if (k.CharStrings) k.CharStrings = r.d(x, k.CharStrings);
            if (k.ROS) {
                T = k.FDArray;
                var s = [];
                T = r.W(x, T, s);
                k.FDArray = [];
                for (var v = 0; v < s.length - 1; v++) {
                    var B = r.T(x, T + s[v], T + s[v + 1]);
                    r.Z(x, B, o);
                    k.FDArray.push(B)
                }
                T += s[s.length - 1];
                T = k.FDSelect;
                k.FDSelect = [];
                var $ = x[T];
                T++;
                if ($ == 3) {
                    var z = E.k(x, T);
                    T += 2;
                    for (var v = 0; v < z + 1; v++) {
                        k.FDSelect.push(E.k(x, T), x[T + 2]);
                        T += 3
                    }
                } else throw $
            }
            if (k.charset) k.charset = r.aY(x, k.charset, k.CharStrings.length);
            r.Z(x, k, o);
            return k
        },
        Z: function(x, T, Y) {
            var E = g.T.L,
                r;
            if (T.Private) {
                r = T.Private[1];
                T.Private = E.T(x, r, r + T.Private[0]);
                if (T.Private.Subrs) E.o(x, r + T.Private.Subrs, T.Private)
            }
            for (var Z in T)
                if ("FamilyName FontName FullName Notice version Copyright".split(" ").indexOf(Z) != -1) T[Z] = Y[T[Z] - 426 + 35]
        },
        o: function(x, T, Y) {
            Y.Subrs = g.T.L.d(x, T);
            var E, r = Y.Subrs.length + 1;
            if (!1) E = 0;
            else if (r < 1240) E = 107;
            else if (r < 33900) E = 1131;
            else E = 32768;
            Y.Bias = E
        },
        d: function(x, T) {
            var Y = g.B,
                E = [];
            T = g.T.L.W(x, T, E);
            var r = [],
                Z = E.length - 1,
                f = x.byteOffset + T;
            for (var d = 0; d < Z; d++) {
                var F = E[d];
                r.push(new Uint8Array(x.buffer, f + F, E[d + 1] - F))
            }
            return r
        },
        aV: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0],
        a6: function(x, T) {
            for (var Y = 0; Y < x.charset.length; Y++)
                if (x.charset[Y] == T) return Y;
            return -1
        },
        r: function(x, T) {
            if (T < 0 || T > 255) return -1;
            return g.T.L.a6(x, g.T.L.aV[T])
        },
        aY: function(x, T, Y) {
            var E = g.B,
                r = [".notdef"],
                Z = x[T];
            T++;
            if (Z == 0) {
                for (var f = 0; f < Y; f++) {
                    var F = E.k(x, T);
                    T += 2;
                    r.push(F)
                }
            } else if (Z == 1 || Z == 2) {
                while (r.length < Y) {
                    var F = E.k(x, T),
                        b = 0;
                    T += 2;
                    if (Z == 1) {
                        b = x[T];
                        T++
                    } else {
                        b = E.k(x, T);
                        T += 2
                    }
                    for (var f = 0; f <= b; f++) {
                        r.push(F);
                        F++
                    }
                }
            } else throw "error: format: " + Z;
            return r
        },
        W: function(x, T, Y) {
            var E = g.B,
                r = E.k(x, T) + 1;
            T += 2;
            var Z = x[T];
            T++;
            if (Z == 1)
                for (var f = 0; f < r; f++) Y.push(x[T + f]);
            else if (Z == 2)
                for (var f = 0; f < r; f++) Y.push(E.k(x, T + f * 2));
            else if (Z == 3)
                for (var f = 0; f < r; f++) Y.push(E.u(x, T + f * 3 - 1) & 16777215);
            else if (Z == 4)
                for (var f = 0; f < r; f++) Y.push(E.u(x, T + f * 4));
            else if (r != 1) throw "unsupported offset size: " + Z + ", count: " + r;
            T += r * Z;
            return T - 1
        },
        ah: function(x, T, Y) {
            var E = g.B,
                r = x[T],
                Z = x[T + 1],
                f = x[T + 2],
                d = x[T + 3],
                F = x[T + 4],
                b = 1,
                n = null,
                v = null;
            if (r <= 20) {
                n = r;
                b = 1
            }
            if (r == 12) {
                n = r * 100 + Z;
                b = 2
            }
            if (21 <= r && r <= 27) {
                n = r;
                b = 1
            }
            if (r == 28) {
                v = E.X(x, T + 1);
                b = 3
            }
            if (29 <= r && r <= 31) {
                n = r;
                b = 1
            }
            if (32 <= r && r <= 246) {
                v = r - 139;
                b = 1
            }
            if (247 <= r && r <= 250) {
                v = (r - 247) * 256 + Z + 108;
                b = 2
            }
            if (251 <= r && r <= 254) {
                v = -(r - 251) * 256 - Z - 108;
                b = 2
            }
            if (r == 255) {
                v = E.a(x, T + 1) / 65535;
                b = 5
            }
            Y.aP = v != null ? v : "o" + n;
            Y.size = b
        },
        a5: function(x, T, Y) {
            var E = T + Y,
                r = g.B,
                Z = [];
            while (T < E) {
                var f = x[T],
                    d = x[T + 1],
                    F = x[T + 2],
                    b = x[T + 3],
                    n = x[T + 4],
                    v = 1,
                    W = null,
                    j = null;
                if (f <= 20) {
                    W = f;
                    v = 1
                }
                if (f == 12) {
                    W = f * 100 + d;
                    v = 2
                }
                if (f == 19 || f == 20) {
                    W = f;
                    v = 2
                }
                if (21 <= f && f <= 27) {
                    W = f;
                    v = 1
                }
                if (f == 28) {
                    j = r.X(x, T + 1);
                    v = 3
                }
                if (29 <= f && f <= 31) {
                    W = f;
                    v = 1
                }
                if (32 <= f && f <= 246) {
                    j = f - 139;
                    v = 1
                }
                if (247 <= f && f <= 250) {
                    j = (f - 247) * 256 + d + 108;
                    v = 2
                }
                if (251 <= f && f <= 254) {
                    j = -(f - 251) * 256 - d - 108;
                    v = 2
                }
                if (f == 255) {
                    j = r.a(x, T + 1) / 65535;
                    v = 5
                }
                Z.push(j != null ? j : "o" + W);
                T += v
            }
            return Z
        },
        T: function(x, T, Y) {
            var E = g.B,
                r = {},
                Z = [];
            while (T < Y) {
                var f = x[T],
                    d = x[T + 1],
                    F = x[T + 2],
                    b = x[T + 3],
                    n = x[T + 4],
                    v = 1,
                    W = null,
                    j = null;
                if (f == 28) {
                    j = E.X(x, T + 1);
                    v = 3
                }
                if (f == 29) {
                    j = E.a(x, T + 1);
                    v = 5
                }
                if (32 <= f && f <= 246) {
                    j = f - 139;
                    v = 1
                }
                if (247 <= f && f <= 250) {
                    j = (f - 247) * 256 + d + 108;
                    v = 2
                }
                if (251 <= f && f <= 254) {
                    j = -(f - 251) * 256 - d - 108;
                    v = 2
                }
                if (f == 255) {
                    j = E.a(x, T + 1) / 65535;
                    v = 5;
                    throw "unknown number"
                }
                if (f == 30) {
                    var k = [],
                        B = "";
                    v = 1;
                    while (!0) {
                        var I = x[T + v];
                        v++;
                        var o = I >> 4,
                            s = I & 15;
                        if (o != 15) k.push(o);
                        if (s != 15) k.push(s);
                        if (s == 15) break
                    }
                    var $ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"];
                    for (var z = 0; z < k.length; z++) B += $[k[z]];
                    j = parseFloat(B)
                }
                if (f <= 21) {
                    var K = "version Notice FullName FamilyName Weight FontBBox BlueValues OtherBlues FamilyBlues FamilyOtherBlues StdHW StdVW escape UniqueID XUID charset Encoding CharStrings Private Subrs defaultWidthX nominalWidthX".split(" ");
                    W = K[f];
                    v = 1;
                    if (f == 12) {
                        var K = "Copyright isFixedPitch ItalicAngle UnderlinePosition UnderlineThickness PaintType CharstringType FontMatrix StrokeWidth BlueScale BlueShift BlueFuzz StemSnapH StemSnapV ForceBold   LanguageGroup ExpansionFactor initialRandomSeed SyntheticBase PostScript BaseFontName BaseFontBlend       ROS CIDFontVersion CIDFontRevision CIDFontType CIDCount UIDBase FDArray FDSelect FontName".split(" ");
                        W = K[d];
                        v = 2
                    }
                }
                if (W != null) {
                    r[W] = Z.length == 1 ? Z[0] : Z;
                    Z = []
                } else Z.push(j);
                T += v
            }
            return r
        }
    };
    g.T.v = {
        Q: function(x, T, Y) {
            var E = {
                h: [],
                C: {},
                as: T
            };
            x = new Uint8Array(x.buffer, T, Y);
            T = 0;
            var r = T,
                Z = g.B,
                f = Z.k,
                d = g.T.v,
                F = f(x, T);
            T += 2;
            var b = f(x, T);
            T += 2;
            var n = [];
            for (var v = 0; v < b; v++) {
                var W = f(x, T);
                T += 2;
                var j = f(x, T);
                T += 2;
                var k = Z.u(x, T);
                T += 4;
                var I = "p" + W + "e" + j,
                    o = n.indexOf(k);
                if (o == -1) {
                    o = E.h.length;
                    var s = {};
                    n.push(k);
                    var B = s.ba = f(x, k);
                    if (B == 0) s = d.a0(x, k, s);
                    else if (B == 4) s = d.a8(x, k, s);
                    else if (B == 6) s = d.a7(x, k, s);
                    else if (B == 12) s = d.a9(x, k, s);
                    E.h.push(s)
                }
                if (E.C[I] != null) console.log("multiple tables for one platform+encoding: " + I);
                E.C[I] = o
            }
            return E
        },
        a0: function(x, T, Y) {
            var E = g.B;
            T += 2;
            var r = E.k(x, T);
            T += 2;
            var Z = E.k(x, T);
            T += 2;
            Y.map = [];
            for (var f = 0; f < r - 6; f++) Y.map.push(x[T + f]);
            return Y
        },
        a8: function(x, T, Y) {
            var E = g.B,
                r = E.k,
                Z = E.a$,
                f = T;
            T += 2;
            var d = r(x, T);
            T += 2;
            var F = r(x, T);
            T += 2;
            var b = r(x, T);
            T += 2;
            var n = b >>> 1;
            Y.ab = r(x, T);
            T += 2;
            Y.a_ = r(x, T);
            T += 2;
            Y.at = r(x, T);
            T += 2;
            Y.ae = Z(x, T, n);
            T += n * 2;
            T += 2;
            Y.al = Z(x, T, n);
            T += n * 2;
            Y.aQ = [];
            for (var v = 0; v < n; v++) {
                Y.aQ.push(E.X(x, T));
                T += 2
            }
            Y.p = Z(x, T, n);
            T += n * 2;
            Y.P = Z(x, T, f + d - T >>> 1);
            return Y
        },
        a7: function(x, T, Y) {
            var E = g.B,
                r = T;
            T += 2;
            var Z = E.k(x, T);
            T += 2;
            var f = E.k(x, T);
            T += 2;
            Y.aA = E.k(x, T);
            T += 2;
            var d = E.k(x, T);
            T += 2;
            Y.P = [];
            for (var F = 0; F < d; F++) {
                Y.P.push(E.k(x, T));
                T += 2
            }
            return Y
        },
        a9: function(x, T, Y) {
            var E = g.B,
                r = E.u,
                Z = T;
            T += 4;
            var f = r(x, T);
            T += 4;
            var d = r(x, T);
            T += 4;
            var F = r(x, T) * 3;
            T += 4;
            var b = Y.ay = new Uint32Array(F);
            for (var n = 0; n < F; n += 3) {
                b[n] = r(x, T + (n << 2));
                b[n + 1] = r(x, T + (n << 2) + 4);
                b[n + 2] = r(x, T + (n << 2) + 8)
            }
            return Y
        }
    };
    g.T.aM = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = T,
                Z = E.k(x, T);
            T += 2;
            var f = E.k(x, T);
            T += 2;
            var d = E.u(x, T);
            T += 4;
            var F = [];
            for (var b = 0; b < d; b++) {
                var n = E.u(x, T);
                T += 4;
                var v = E.u(x, T);
                T += 4;
                var W = E.u(x, T);
                T += 4;
                T += 4;
                T += 2 * 12;
                var j = E.k(x, T);
                T += 2;
                var k = E.k(x, T);
                T += 2;
                T += 4;
                var I = r + n;
                for (var o = 0; o < 3; o++) {
                    var s = E.k(x, I);
                    I += 2;
                    var B = E.k(x, I);
                    I += 2;
                    var $ = E.u(x, I);
                    I += 4;
                    var z = B - s + 1,
                        K = r + n + $,
                        y = E.k(x, K);
                    K += 2;
                    if (y != 1) throw y;
                    var H = E.k(x, K);
                    K += 2;
                    var q = E.u(x, K);
                    K += 4;
                    var c = [];
                    for (var D = 0; D < z; D++) {
                        var M = E.u(x, K + D * 4);
                        c.push(q + M)
                    }
                    F.push([s, B, H, c])
                }
            }
            return F
        }
    };
    g.T.ap = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = T;
            return new Uint8Array(x.buffer, x.byteOffset + T, Y)
        }
    };
    g.T.n = {
        Q: function(x, T, Y, E) {
            var r = [],
                Z = E.maxp.numGlyphs;
            for (var f = 0; f < Z; f++) r.push(null);
            return r
        },
        an: function(x, T) {
            var Y = g.B,
                E = x._data,
                r = x.loca;
            if (r[T] == r[T + 1]) return null;
            var f = g.findTable(E, "glyf", x._offset)[0] + r[T],
                d = {};
            d.I = Y.X(E, f);
            f += 2;
            d.ax = Y.X(E, f);
            f += 2;
            d.aj = Y.X(E, f);
            f += 2;
            d.aW = Y.X(E, f);
            f += 2;
            d.aS = Y.X(E, f);
            f += 2;
            if (d.ax >= d.aW || d.aj >= d.aS) return null;
            if (d.I > 0) {
                d.J = [];
                for (var F = 0; F < d.I; F++) {
                    d.J.push(Y.k(E, f));
                    f += 2
                }
                var b = Y.k(E, f),
                    o = 0,
                    s = 0;
                f += 2;
                if (E.length - f < b) return null;
                d.aN = Y.d(E, f, b);
                f += b;
                var n = d.J[d.I - 1] + 1;
                d.O = [];
                for (var F = 0; F < n; F++) {
                    var v = E[f];
                    f++;
                    d.O.push(v);
                    if ((v & 8) != 0) {
                        var W = E[f];
                        f++;
                        for (var j = 0; j < W; j++) {
                            d.O.push(v);
                            F++
                        }
                    }
                }
                d.$ = [];
                for (var F = 0; F < n; F++) {
                    var k = (d.O[F] & 2) != 0,
                        I = (d.O[F] & 16) != 0;
                    if (k) {
                        d.$.push(I ? E[f] : -E[f]);
                        f++
                    } else {
                        if (I) d.$.push(0);
                        else {
                            d.$.push(Y.X(E, f));
                            f += 2
                        }
                    }
                }
                d.c = [];
                for (var F = 0; F < n; F++) {
                    var k = (d.O[F] & 4) != 0,
                        I = (d.O[F] & 32) != 0;
                    if (k) {
                        d.c.push(I ? E[f] : -E[f]);
                        f++
                    } else {
                        if (I) d.c.push(0);
                        else {
                            d.c.push(Y.X(E, f));
                            f += 2
                        }
                    }
                }
                for (var F = 0; F < n; F++) {
                    o += d.$[F];
                    s += d.c[F];
                    d.$[F] = o;
                    d.c[F] = s
                }
            } else {
                var B = 1 << 0,
                    $ = 1 << 1,
                    z = 1 << 2,
                    K = 1 << 3,
                    q = 1 << 4,
                    c = 1 << 5,
                    D = 1 << 6,
                    M = 1 << 7,
                    S = 1 << 8,
                    N = 1 << 9,
                    O = 1 << 10,
                    i = 1 << 11,
                    a = 1 << 12,
                    u;
                d.R = [];
                do {
                    u = Y.k(E, f);
                    f += 2;
                    var p = {
                        M: {
                            m: 1,
                            aD: 0,
                            a4: 0,
                            V: 1,
                            b3: 0,
                            aG: 0
                        },
                        aR: -1,
                        b4: -1
                    };
                    d.R.push(p);
                    p.aE = Y.k(E, f);
                    f += 2;
                    if (u & B) {
                        var h = Y.X(E, f);
                        f += 2;
                        var J = Y.X(E, f);
                        f += 2
                    } else {
                        var h = Y.U(E, f);
                        f++;
                        var J = Y.U(E, f);
                        f++
                    }
                    if (u & $) {
                        p.M.b3 = h;
                        p.M.aG = J
                    } else {
                        p.aR = h;
                        p.b4 = J
                    }
                    if (u & K) {
                        p.M.m = p.M.V = Y.f(E, f);
                        f += 2
                    } else if (u & D) {
                        p.M.m = Y.f(E, f);
                        f += 2;
                        p.M.V = Y.f(E, f);
                        f += 2
                    } else if (u & M) {
                        p.M.m = Y.f(E, f);
                        f += 2;
                        p.M.aD = Y.f(E, f);
                        f += 2;
                        p.M.a4 = Y.f(E, f);
                        f += 2;
                        p.M.V = Y.f(E, f);
                        f += 2
                    }
                } while (u & c);
                if (u & S) {
                    var a6 = Y.k(E, f);
                    f += 2;
                    d.aH = [];
                    for (var F = 0; F < a6; F++) {
                        d.aH.push(E[f]);
                        f++
                    }
                }
            }
            return d
        }
    };
    g.T.head = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = {},
                Z = E.i(x, T);
            T += 4;
            r.fontRevision = E.i(x, T);
            T += 4;
            var f = E.u(x, T);
            T += 4;
            var d = E.u(x, T);
            T += 4;
            r.flags = E.k(x, T);
            T += 2;
            r.unitsPerEm = E.k(x, T);
            T += 2;
            r.created = E.A(x, T);
            T += 8;
            r.modified = E.A(x, T);
            T += 8;
            r.xMin = E.X(x, T);
            T += 2;
            r.yMin = E.X(x, T);
            T += 2;
            r.xMax = E.X(x, T);
            T += 2;
            r.yMax = E.X(x, T);
            T += 2;
            r.macStyle = E.k(x, T);
            T += 2;
            r.lowestRecPPEM = E.k(x, T);
            T += 2;
            r.fontDirectionHint = E.X(x, T);
            T += 2;
            r.indexToLocFormat = E.X(x, T);
            T += 2;
            r.glyphDataFormat = E.X(x, T);
            T += 2;
            return r
        }
    };
    g.T.aJ = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = {},
                Z = E.i(x, T);
            T += 4;
            var f = "ascender descender lineGap advanceWidthMax minLeftSideBearing minRightSideBearing xMaxExtent caretSlopeRise caretSlopeRun caretOffset res0 res1 res2 res3 metricDataFormat numberOfHMetrics".split(" ");
            for (var d = 0; d < f.length; d++) {
                var F = f[d],
                    b = F == "advanceWidthMax" || F == "numberOfHMetrics" ? E.k : E.X;
                r[F] = b(x, T + d * 2)
            }
            return r
        }
    };
    g.T.aI = {
        Q: function(x, T, Y, E) {
            var r = g.B,
                Z = [],
                f = [],
                d = E.maxp.numGlyphs,
                F = E.hhea.numberOfHMetrics,
                b = 0,
                n = 0,
                v = 0;
            while (v < F) {
                b = r.k(x, T + (v << 2));
                n = r.X(x, T + (v << 2) + 2);
                Z.push(b);
                f.push(n);
                v++
            }
            while (v < d) {
                Z.push(b);
                f.push(n);
                v++
            }
            return {
                b8: Z,
                aX: f
            }
        }
    };
    g.T.g = {
        Q: function(x, T, Y, E) {
            var r = g.B,
                Z = g.T.g,
                f = r.k(x, T);
            if (f == 1) return Z.ar(x, T, Y, E);
            var d = r.k(x, T + 2);
            T += 4;
            var F = {
                F: [],
                b: []
            };
            for (var b = 0; b < d; b++) {
                T += 2;
                var Y = r.k(x, T);
                T += 2;
                var n = r.k(x, T);
                T += 2;
                var v = n >>> 8;
                v &= 15;
                if (v == 0) T = Z.G(x, T, F)
            }
            return F
        },
        ar: function(x, T, Y, E) {
            var r = g.B,
                Z = g.T.g,
                f = r.i(x, T),
                d = r.u(x, T + 4);
            T += 8;
            var F = {
                F: [],
                b: []
            };
            for (var b = 0; b < d; b++) {
                var Y = r.u(x, T);
                T += 4;
                var n = r.k(x, T);
                T += 2;
                var v = r.k(x, T);
                T += 2;
                var W = n & 255;
                if (W == 0) T = Z.G(x, T, F)
            }
            return F
        },
        G: function(x, T, Y) {
            var E = g.B,
                r = E.k,
                Z = -1,
                f = r(x, T),
                d = r(x, T + 2),
                F = r(x, T + 4),
                b = r(x, T + 6);
            T += 8;
            for (var n = 0; n < f; n++) {
                var v = r(x, T);
                T += 2;
                var W = r(x, T);
                T += 2;
                var j = E.X(x, T);
                T += 2;
                if (v != Z) {
                    Y.F.push(v);
                    Y.b.push({
                        av: [],
                        a3: []
                    })
                }
                var k = Y.b[Y.b.length - 1];
                k.av.push(W);
                k.a3.push(j);
                Z = v
            }
            return T
        }
    };
    g.T.aF = {
        Q: function(x, T, Y, E) {
            var r = g.B,
                Z = [],
                f = E.head.indexToLocFormat,
                d = E.maxp.numGlyphs + 1;
            if (f == 0)
                for (var F = 0; F < d; F++) Z.push(r.k(x, T + (F << 1)) << 1);
            if (f == 1)
                for (var F = 0; F < d; F++) Z.push(r.u(x, T + (F << 2)));
            return Z
        }
    };
    g.T.aq = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = E.k,
                Z = {},
                f = E.u(x, T);
            T += 4;
            Z.numGlyphs = r(x, T);
            T += 2;
            return Z
        }
    };
    g.T.name = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = {},
                Z = E.k(x, T),
                y = "fontFamily";
            T += 2;
            var f = E.k(x, T);
            T += 2;
            var d = E.k(x, T);
            T += 2;
            var F = "copyright fontFamily fontSubfamily ID fullName version postScriptName trademark manufacturer designer description urlVendor urlDesigner licence licenceURL --- typoFamilyName typoSubfamilyName compatibleFull sampleText postScriptCID wwsFamilyName wwsSubfamilyName lightPalette darkPalette".split(" "),
                b = T,
                n = E.k;
            for (var v = 0; v < f; v++) {
                var W = n(x, T),
                    $;
                T += 2;
                var j = n(x, T);
                T += 2;
                var k = n(x, T);
                T += 2;
                var I = n(x, T);
                T += 2;
                var o = n(x, T);
                T += 2;
                var s = n(x, T);
                T += 2;
                var B = b + f * 12 + s;
                if (!1) {} else if (W == 0) $ = E.K(x, B, o / 2);
                else if (W == 3 && j == 0) $ = E.K(x, B, o / 2);
                else if (W == 1 && j == 25) $ = E.K(x, B, o / 2);
                else if (j == 0) $ = E.B(x, B, o);
                else if (j == 1) $ = E.K(x, B, o / 2);
                else if (j == 3) $ = E.K(x, B, o / 2);
                else if (j == 4) $ = E.K(x, B, o / 2);
                else if (j == 5) $ = E.K(x, B, o / 2);
                else if (j == 10) $ = E.K(x, B, o / 2);
                else if (W == 1) {
                    $ = E.B(x, B, o);
                    console.log("reading unknown MAC encoding " + j + " as ASCII")
                } else {
                    console.log("unknown encoding " + j + ", platformID: " + W);
                    $ = E.B(x, B, o)
                }
                var z = "p" + W + "," + k.toString(16);
                if (r[z] == null) r[z] = {};
                r[z][F[I]] = $;
                r[z]._lang = k
            }
            var K = g.T.name.b7(r);
            if (K[y] == null)
                for (var H in r)
                    if (r[H][y] != null) K[y] = r[H][y];
            return K
        },
        b7: function(x) {
            var T = "postScriptName",
                E;
            for (var Y in x)
                if (x[Y][T] != null && x[Y]._lang == 1033) return x[Y];
            for (var Y in x)
                if (x[Y][T] != null && x[Y]._lang == 0) return x[Y];
            for (var Y in x)
                if (x[Y][T] != null && x[Y]._lang == 3084) return x[Y];
            for (var Y in x)
                if (x[Y][T] != null) return x[Y];
            for (var Y in x) {
                E = x[Y];
                break
            }
            console.log("returning name table with languageID " + E.aa);
            if (E[T] == null && E.ID != null) E[T] = E.ID;
            return E
        }
    };
    g.T.N = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = E.k(x, T);
            T += 2;
            var Z = g.T.N,
                f = {};
            if (r == 0) Z.D(x, T, f);
            else if (r == 1) Z.s(x, T, f);
            else if (r == 2 || r == 3 || r == 4) Z.ao(x, T, f);
            else if (r == 5) Z.aL(x, T, f);
            else throw "unknown OS/2 table version: " + r;
            return f
        },
        D: function(x, T, Y) {
            var E = g.B;
            Y.xAvgCharWidth = E.X(x, T);
            T += 2;
            Y.usWeightClass = E.k(x, T);
            T += 2;
            Y.usWidthClass = E.k(x, T);
            T += 2;
            Y.fsType = E.k(x, T);
            T += 2;
            Y.ySubscriptXSize = E.X(x, T);
            T += 2;
            Y.ySubscriptYSize = E.X(x, T);
            T += 2;
            Y.ySubscriptXOffset = E.X(x, T);
            T += 2;
            Y.ySubscriptYOffset = E.X(x, T);
            T += 2;
            Y.ySuperscriptXSize = E.X(x, T);
            T += 2;
            Y.ySuperscriptYSize = E.X(x, T);
            T += 2;
            Y.ySuperscriptXOffset = E.X(x, T);
            T += 2;
            Y.ySuperscriptYOffset = E.X(x, T);
            T += 2;
            Y.yStrikeoutSize = E.X(x, T);
            T += 2;
            Y.yStrikeoutPosition = E.X(x, T);
            T += 2;
            Y.sFamilyClass = E.X(x, T);
            T += 2;
            Y.panose = E.d(x, T, 10);
            T += 10;
            Y.ulUnicodeRange1 = E.u(x, T);
            T += 4;
            Y.ulUnicodeRange2 = E.u(x, T);
            T += 4;
            Y.ulUnicodeRange3 = E.u(x, T);
            T += 4;
            Y.ulUnicodeRange4 = E.u(x, T);
            T += 4;
            Y.achVendID = E.B(x, T, 4);
            T += 4;
            Y.fsSelection = E.k(x, T);
            T += 2;
            Y.usFirstCharIndex = E.k(x, T);
            T += 2;
            Y.usLastCharIndex = E.k(x, T);
            T += 2;
            Y.sTypoAscender = E.X(x, T);
            T += 2;
            Y.sTypoDescender = E.X(x, T);
            T += 2;
            Y.sTypoLineGap = E.X(x, T);
            T += 2;
            Y.usWinAscent = E.k(x, T);
            T += 2;
            Y.usWinDescent = E.k(x, T);
            T += 2;
            return T
        },
        s: function(x, T, Y) {
            var E = g.B;
            T = g.T.N.D(x, T, Y);
            Y.ulCodePageRange1 = E.u(x, T);
            T += 4;
            Y.ulCodePageRange2 = E.u(x, T);
            T += 4;
            return T
        },
        ao: function(x, T, Y) {
            var E = g.B,
                r = E.k;
            T = g.T.N.s(x, T, Y);
            Y.sxHeight = E.X(x, T);
            T += 2;
            Y.sCapHeight = E.X(x, T);
            T += 2;
            Y.usDefault = r(x, T);
            T += 2;
            Y.usBreak = r(x, T);
            T += 2;
            Y.usMaxContext = r(x, T);
            T += 2;
            return T
        },
        aL: function(x, T, Y) {
            var E = g.B.k;
            T = g.T.N.ao(x, T, Y);
            Y.usLowerOpticalPointSize = E(x, T);
            T += 2;
            Y.usUpperOpticalPointSize = E(x, T);
            T += 2;
            return T
        }
    };
    g.T.b1 = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = {};
            r.version = E.i(x, T);
            T += 4;
            r.italicAngle = E.i(x, T);
            T += 4;
            r.underlinePosition = E.X(x, T);
            T += 2;
            r.underlineThickness = E.X(x, T);
            T += 2;
            return r
        }
    };
    g.T.au = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = {
                    entries: []
                },
                Z = T,
                f = E.k(x, T);
            T += 2;
            var d = E.u(x, T);
            T += 4;
            var F = E.u(x, T);
            T += 4;
            T = d + Z;
            var b = E.k(x, T);
            T += 2;
            for (var n = 0; n < b; n++) {
                var v = E.k(x, T);
                T += 2;
                var W = E.k(x, T);
                T += 2;
                var j = E.u(x, T);
                T += 4;
                var k = E.u(x, T);
                T += 4;
                var I = new Uint8Array(x.buffer, Z + j + d, k);
                if (I[0] == 31 && I[1] == 139 && I[2] == 8) I = pako.inflate(I);
                var o = E.aT(I, 0, I.length);
                for (var s = v; s <= W; s++) {
                    r.entries[s] = o
                }
            }
            return r
        }
    };
    g.T.az = {
        Q: function(x, T, Y, E) {
            var r = E.maxp.numGlyphs,
                Z = T,
                f = g.B,
                d = f.u(x, T + 4),
                F = [];
            for (var b = d - 1; b < d; b++) {
                var n = Z + f.u(x, T + 8 + b * 4);
                for (var v = 0; v < r; v++) {
                    var W = f.u(x, n + 4 + v * 4),
                        j = f.u(x, n + 4 + v * 4 + 4);
                    if (W == j) {
                        F[v] = null;
                        continue
                    }
                    var k = n + W,
                        I = f.B(x, k + 4, 4);
                    if (I != "png ") throw I;
                    F[v] = new Uint8Array(x.buffer, x.byteOffset + k + 8, j - W - 8)
                }
            }
            return F
        }
    };
    g.T.ag = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = T;
            T += 2;
            var Z = E.k(x, T);
            T += 2;
            var f = E.u(x, T);
            T += 4;
            var d = E.u(x, T);
            T += 4;
            var F = E.k(x, T);
            T += 2;
            var b = {},
                n = r + f;
            for (var v = 0; v < Z; v++) {
                b["g" + E.k(x, n)] = [E.k(x, n + 2), E.k(x, n + 4)];
                n += 6
            }
            var W = [];
            n = r + d;
            for (var v = 0; v < F; v++) {
                W.push(E.k(x, n), E.k(x, n + 2));
                n += 4
            }
            return [b, W]
        }
    };
    g.T.aZ = {
        Q: function(x, T, Y) {
            var E = g.B,
                r = T,
                Z = E.k(x, T);
            T += 2;
            if (Z == 0) {
                var f = E.k(x, T);
                T += 2;
                var d = E.k(x, T);
                T += 2;
                var F = E.k(x, T);
                T += 2;
                var b = E.u(x, T);
                T += 4;
                return new Uint8Array(x.buffer, r + b, F * 4)
            } else throw Z
        }
    };
    g.U = {
        shape: function(x, T, Y) {
            var E = function(x, r, k, Y) {
                    var I = r[k],
                        o = r[k + 1],
                        s = x.kern;
                    if (s) {
                        var B = s.F.indexOf(I);
                        if (B != -1) {
                            var $ = s.b[B].av.indexOf(o);
                            if ($ != -1) return [0, 0, s.b[B].a3[$], 0]
                        }
                    }
                    return [0, 0, 0, 0]
                },
                r = [],
                b = 0,
                n = 0;
            for (var Z = 0; Z < T.length; Z++) {
                var f = T.codePointAt(Z);
                if (f > 65535) Z++;
                r.push(g.U.codeToGlyph(x, f))
            }
            var F = [];
            for (var Z = 0; Z < r.length; Z++) {
                var v = E(x, r, Z, Y),
                    W = r[Z],
                    j = x.hmtx.b8[W] + v[2];
                F.push({
                    g: W,
                    cl: Z,
                    dx: 0,
                    dy: 0,
                    ax: j,
                    ay: 0
                });
                b += j
            }
            return F
        },
        shapeToPath: function(x, T, Y) {
            var E = {
                    w: [],
                    j: []
                },
                r = 0,
                Z = 0;
            for (var f = 0; f < T.length; f++) {
                var F = T[f],
                    b = g.U.glyphToPath(x, F.g),
                    n = b.crds;
                for (var v = 0; v < n.length; v += 2) {
                    E.j.push(n[v] + r + F.dx);
                    E.j.push(n[v + 1] + Z + F.dy)
                }
                if (Y) E.w.push(Y);
                for (var v = 0; v < b.cmds.length; v++) E.w.push(b.cmds[v]);
                var W = E.w.length;
                if (Y)
                    if (W != 0 && E.w[W - 1] != "X") E.w.push("X");
                r += F.ax;
                Z += F.ay
            }
            return {
                cmds: E.w,
                crds: E.j
            }
        },
        codeToGlyph: function() {
            function x(Z, f, F) {
                var n = 0,
                    v = ~~(Z.length / f);
                while (n + 1 != v) {
                    var W = n + (v - n >>> 1);
                    if (Z[W * f] <= F) n = W;
                    else v = W
                }
                return n * f
            }
            var T = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 6158, 8232, 8233, 8239, 8288, 12288, 65279],
                Y = {};
            for (var E = 0; E < T.length; E++) Y[T[E]] = 1;
            for (var E = 8192; E <= 8205; E++) Y[E] = 1;

            function r(Z, f) {
                if (Z._ctab == null) {
                    var F = Z.cmap,
                        b = -1,
                        n = "p3e10 p0e4 p3e1 p1e0 p0e3 p0e1 p3e0 p3e5".split(" ");
                    for (var E = 0; E < n.length; E++)
                        if (F.C[n[E]] != null) {
                            b = F.C[n[E]];
                            break
                        }
                    if (b == -1) throw "no familiar platform and encoding!";
                    Z._ctab = F.h[b]
                }
                var v = Z._ctab,
                    W = v.ba,
                    j = -1;
                if (W == 0) {
                    if (f >= v.map.length) j = 0;
                    else j = v.map[f]
                } else if (W == 4) {
                    var k = v.ae;
                    j = 0;
                    if (f <= k[k.length - 1]) {
                        var I = x(k, 1, f);
                        if (k[I] < f) I++;
                        if (f >= v.al[I]) {
                            var o = 0;
                            if (v.p[I] != 0) o = v.P[f - v.al[I] + (v.p[I] >> 1) - (v.p.length - I)];
                            else o = f + v.aQ[I];
                            j = o & 65535
                        }
                    }
                } else if (W == 6) {
                    var s = f - v.aA,
                        B = v.P;
                    if (s < 0 || s >= B.length) j = 0;
                    else j = B[s]
                } else if (W == 12) {
                    var $ = v.ay;
                    j = 0;
                    if (f <= $[$.length - 2]) {
                        var E = x($, 3, f);
                        if ($[E] <= f && f <= $[E + 1]) {
                            j = $[E + 2] + (f - $[E])
                        }
                    }
                } else throw "unknown cmap table format " + v.ba;
                var z = Z["SVG "],
                    K = Z.loca;
                if (j != 0 && Z["CFF "] == null && (z == null || z.entries[j] == null) && K && K[j] == K[j + 1] && Y[f] == null) j = 0;
                return j
            }
            return r
        }(),
        glyphToPath: function(x, T, Y) {
            var E = {
                    w: [],
                    j: []
                },
                r = x["SVG "],
                Z = x["CFF "],
                f = x.COLR,
                d = x.CBLC,
                F = x.CBDT,
                b = x.sbix,
                n = window.UPNG,
                v = g.U,
                W = null;
            if (d && n)
                for (var j = 0; j < d.length; j++)
                    if (d[j][0] <= T && T <= d[j][1]) W = d[j];
            if (W || b && b[T]) {
                if (W && W[2] != 17) throw "not a PNG";
                if (x.__tmp == null) x.__tmp = {};
                var k = x.__tmp["g" + T];
                if (k == null) {
                    var I, o, B = "";
                    if (b) {
                        I = b[T];
                        o = I.length
                    } else {
                        var s = W[3][T - W[0]] + 5;
                        o = F[s + 1] << 16 | F[s + 2] << 8 | F[s + 3];
                        s += 4;
                        I = new Uint8Array(F.buffer, F.byteOffset + s, o)
                    }
                    for (var j = 0; j < o; j++) B += String.fromCharCode(I[j]);
                    k = x.__tmp["g" + T] = "data:image/png;base64," + btoa(B)
                }
                E.w.push(k);
                var $ = x.head.unitsPerEm * 1.15,
                    z = Math.round($),
                    K = Math.round($),
                    y = Math.round(-K * .15);
                E.j.push(0, K + y, z, K + y, z, y, 0, y)
            } else if (r && r.entries[T]) {
                var H = r.entries[T];
                if (H != null) {
                    if (typeof H == "string") {
                        H = v.SVG.a2(H);
                        r.entries[T] = H
                    }
                    E = H
                }
            } else if (Y != !0 && f && f[0]["g" + T] && f[0]["g" + T][1] > 1) {
                function q(h) {
                    var J = h.toString(16);
                    return (J.length == 1 ? "0" : "") + J
                }
                var c = x.CPAL,
                    D = f[0]["g" + T];
                for (var j = 0; j < D[1]; j++) {
                    var M = D[0] + j,
                        S = f[1][2 * M],
                        N = f[1][2 * M + 1] * 4,
                        O = g.U.glyphToPath(x, S, S == T),
                        i = "#" + q(c[N + 2]) + q(c[N + 1]) + q(c[N + 0]);
                    E.w.push(i);
                    E.w = E.w.concat(O.cmds);
                    E.j = E.j.concat(O.crds);
                    E.w.push("X")
                }
            } else if (Z) {
                var a = Z.Private,
                    u = {
                        x: 0,
                        y: 0,
                        stack: [],
                        l: 0,
                        z: !1,
                        width: a ? a.defaultWidthX : 0,
                        open: !1
                    };
                if (Z.ROS) {
                    var p = 0;
                    while (Z.FDSelect[p + 2] <= T) p += 2;
                    a = Z.FDArray[Z.FDSelect[p + 1]].Private
                }
                v._drawCFF(Z.CharStrings[T], u, Z, a, E)
            } else if (x.glyf) {
                v._drawGlyf(T, x, E)
            }
            return {
                cmds: E.w,
                crds: E.j
            }
        },
        _drawGlyf: function(x, T, Y) {
            var E = T.glyf[x];
            if (E == null) E = T.glyf[x] = g.T.n.an(T, x);
            if (E != null) {
                if (E.I > -1) g.U._simpleGlyph(E, Y);
                else g.U._compoGlyph(E, T, Y)
            }
        },
        _simpleGlyph: function(x, T) {
            var Y = g.U.P;
            for (var E = 0; E < x.I; E++) {
                var r = E == 0 ? 0 : x.J[E - 1] + 1,
                    Z = x.J[E];
                for (var f = r; f <= Z; f++) {
                    var F = f == r ? Z : f - 1,
                        b = f == Z ? r : f + 1,
                        n = x.O[f] & 1,
                        v = x.O[F] & 1,
                        W = x.O[b] & 1,
                        j = x.$[f],
                        I = x.c[f];
                    if (f == r) {
                        if (n) {
                            if (v) Y.S(T, x.$[F], x.c[F]);
                            else {
                                Y.S(T, j, I);
                                continue
                            }
                        } else {
                            if (v) Y.S(T, x.$[F], x.c[F]);
                            else Y.S(T, Math.floor((x.$[F] + j) * .5), Math.floor((x.c[F] + I) * .5))
                        }
                    }
                    if (n) {
                        if (v) Y.H(T, j, I)
                    } else {
                        if (W) Y.a1(T, j, I, x.$[b], x.c[b]);
                        else Y.a1(T, j, I, Math.floor((j + x.$[b]) * .5), Math.floor((I + x.c[b]) * .5))
                    }
                }
                Y._(T)
            }
        },
        _compoGlyph: function(x, T, Y) {
            for (var E = 0; E < x.R.length; E++) {
                var r = {
                        w: [],
                        j: []
                    },
                    Z = x.R[E];
                g.U._drawGlyf(Z.aE, T, r);
                var f = Z.M;
                for (var d = 0; d < r.j.length; d += 2) {
                    var b = r.j[d],
                        n = r.j[d + 1];
                    Y.j.push(b * f.m + n * f.a4 + f.b3);
                    Y.j.push(b * f.aD + n * f.V + f.aG)
                }
                for (var d = 0; d < r.w.length; d++) Y.w.push(r.w[d])
            }
        },
        pathToSVG: function(x, T) {
            var Y = x.cmds,
                E = x.crds,
                d = 0,
                b = 0,
                n = 0,
                v = 0,
                W = 0,
                j = 0,
                k = 0;
            if (T == null) T = 5;

            function r(M) {
                return parseFloat(M.toFixed(T))
            }

            function Z(M) {
                var S = [],
                    N = !1,
                    O = "";
                for (var I = 0; I < M.length; I++) {
                    var i = M[I],
                        a = typeof i == "number";
                    if (!a) {
                        if (i == O && i.length == 1 && i != "m") continue;
                        O = i
                    }
                    if (N && a && i >= 0) S.push(" ");
                    S.push(i);
                    N = a
                }
                return S.join("")
            }
            var f = [],
                F = {
                    M: 2,
                    L: 2,
                    Q: 4,
                    C: 6
                };
            for (var I = 0; I < Y.length; I++) {
                var o = Y[I],
                    s = F[o] ? F[o] : 0,
                    B = [],
                    $, z, K, q;
                if (o == "L") {
                    $ = E[d] - b;
                    z = E[d + 1] - n;
                    K = r($ + v);
                    q = r(z + W);
                    if (Y[I + 1] == "Z" && E[d] == j && E[d + 1] == k) {
                        K = $;
                        q = z
                    } else if (K == 0 && q == 0) {} else if (K == 0) B.push("v", q);
                    else if (q == 0) B.push("h", K);
                    else {
                        B.push("l", K, q)
                    }
                } else {
                    B.push(o.toLowerCase());
                    for (var c = 0; c < s; c += 2) {
                        $ = E[d + c] - b;
                        z = E[d + c + 1] - n;
                        K = r($ + v);
                        q = r(z + W);
                        B.push(K, q)
                    }
                }
                if (s != 0) {
                    v += $ - K;
                    W += z - q
                }
                var D = B;
                for (var c = 0; c < D.length; c++) f.push(D[c]);
                if (s != 0) {
                    d += s;
                    b = E[d - 2];
                    n = E[d - 1]
                }
                if (o == "M") {
                    j = b;
                    k = n
                }
                if (o == "Z") {
                    b = j;
                    n = k
                }
            }
            return Z(f)
        },
        SVGToPath: function(x) {
            var T = {
                w: [],
                j: []
            };
            g.U.SVG.am(x, T);
            return {
                cmds: T.w,
                crds: T.j
            }
        },
        pathToContext: function() {
            var x, T;

            function Y(E, r) {
                var Z = 0,
                    f = E.cmds,
                    d = E.crds;
                for (var F = 0; F < f.length; F++) {
                    var b = f[F];
                    if (b == "M") {
                        r.moveTo(d[Z], d[Z + 1]);
                        Z += 2
                    } else if (b == "L") {
                        r.lineTo(d[Z], d[Z + 1]);
                        Z += 2
                    } else if (b == "C") {
                        r.bezierCurveTo(d[Z], d[Z + 1], d[Z + 2], d[Z + 3], d[Z + 4], d[Z + 5]);
                        Z += 6
                    } else if (b == "Q") {
                        r.quadraticCurveTo(d[Z], d[Z + 1], d[Z + 2], d[Z + 3]);
                        Z += 4
                    } else if (b[0] == "d") {
                        var n = window.UPNG,
                            v = d[Z],
                            W = d[Z + 1],
                            j = d[Z + 2],
                            k = d[Z + 3],
                            I = d[Z + 4],
                            o = d[Z + 5],
                            s = d[Z + 6],
                            B = d[Z + 7];
                        Z += 8;
                        if (n == null) {
                            r.moveTo(v, W);
                            r.lineTo(j, k);
                            r.lineTo(I, o);
                            r.lineTo(s, B);
                            r.closePath();
                            continue
                        }
                        r.save();
                        var $ = j - v,
                            z = k - W,
                            K = Math.sqrt($ * $ + z * z),
                            y = Math.atan2(z, $),
                            H = s - v,
                            q = B - W,
                            c = Math.sqrt(H * H + q * q),
                            D = Math.sign($ * q - z * H),
                            M = atob(b.slice(22)),
                            S = [];
                        for (var N = 0; N < M.length; N++) S[N] = M.charCodeAt(N);
                        var O = n.decode(new Uint8Array(S)),
                            i = O.width,
                            a = O.height,
                            u = new Uint8Array(n.toRGBA8(O)[0]);
                        if (x == null) {
                            x = document.createElement("canvas");
                            T = x.getContext("2d", { willReadFrequently: true })
                        }
                        if (x.width != i || x.height != a) {
                            x.width = i;
                            x.height = a
                        }
                        T.putImageData(new ImageData(new Uint8ClampedArray(u.buffer), i, a), 0, 0);
                        r.translate(v, W);
                        r.rotate(y);
                        r.scale(K * (i / a) / i, D * c / a);
                        r.drawImage(x, 0, 0);
                        r.restore()
                    } else if (b.charAt(0) == "#" || b.charAt(0) == "r") {
                        r.beginPath();
                        r.fillStyle = b
                    } else if (b.charAt(0) == "O" && b != "OX") {
                        r.beginPath();
                        var p = b.split("-");
                        r.lineWidth = parseFloat(p[2]);
                        r.strokeStyle = p[1]
                    } else if (b == "Z") {
                        r.closePath()
                    } else if (b == "X") {
                        r.fill()
                    } else if (b == "OX") {
                        r.stroke()
                    }
                }
            }
            return Y
        }(),
        P: {
            S: function(x, T, Y) {
                x.w.push("M");
                x.j.push(T, Y)
            },
            H: function(x, T, Y) {
                x.w.push("L");
                x.j.push(T, Y)
            },
            Y: function(x, T, Y, E, r, Z, f) {
                x.w.push("C");
                x.j.push(T, Y, E, r, Z, f)
            },
            a1: function(x, T, Y, E, r) {
                x.w.push("Q");
                x.j.push(T, Y, E, r)
            },
            _: function(x) {
                x.w.push("Z")
            }
        },
        _drawCFF: function(x, T, Y, E, r) {
            var Z = T.stack,
                f = T.l,
                d = T.z,
                F = T.width,
                b = T.open,
                n = 0,
                v = T.x,
                W = T.y,
                j = 0,
                I = 0,
                o = 0,
                s = 0,
                B = 0,
                $ = 0,
                z = 0,
                K = 0,
                q = 0,
                c = 0,
                D = g.T.L,
                M = g.U.P,
                S = E.nominalWidthX,
                N = {
                    aP: 0,
                    size: 0
                };
            while (n < x.length) {
                D.ah(x, n, N);
                var O = N.aP;
                n += N.size;
                if (!1) {} else if (O == "o1" || O == "o18") {
                    var i;
                    i = Z.length % 2 !== 0;
                    if (i && !d) {
                        F = Z.shift() + S
                    }
                    f += Z.length >> 1;
                    Z.length = 0;
                    d = !0
                } else if (O == "o3" || O == "o23") {
                    var i;
                    i = Z.length % 2 !== 0;
                    if (i && !d) {
                        F = Z.shift() + S
                    }
                    f += Z.length >> 1;
                    Z.length = 0;
                    d = !0
                } else if (O == "o4") {
                    if (Z.length > 1 && !d) {
                        F = Z.shift() + S;
                        d = !0
                    }
                    if (b) M._(r);
                    W += Z.pop();
                    M.S(r, v, W);
                    b = !0
                } else if (O == "o5") {
                    while (Z.length > 0) {
                        v += Z.shift();
                        W += Z.shift();
                        M.H(r, v, W)
                    }
                } else if (O == "o6" || O == "o7") {
                    var a = Z.length,
                        u = O == "o6";
                    for (var p = 0; p < a; p++) {
                        var h = Z.shift();
                        if (u) v += h;
                        else W += h;
                        u = !u;
                        M.H(r, v, W)
                    }
                } else if (O == "o8" || O == "o24") {
                    var a = Z.length,
                        J = 0;
                    while (J + 6 <= a) {
                        j = v + Z.shift();
                        I = W + Z.shift();
                        o = j + Z.shift();
                        s = I + Z.shift();
                        v = o + Z.shift();
                        W = s + Z.shift();
                        M.Y(r, j, I, o, s, v, W);
                        J += 6
                    }
                    if (O == "o24") {
                        v += Z.shift();
                        W += Z.shift();
                        M.H(r, v, W)
                    }
                } else if (O == "o11") break;
                else if (O == "o1234" || O == "o1235" || O == "o1236" || O == "o1237") {
                    if (O == "o1234") {
                        j = v + Z.shift();
                        I = W;
                        o = j + Z.shift();
                        s = I + Z.shift();
                        q = o + Z.shift();
                        c = s;
                        B = q + Z.shift();
                        $ = s;
                        z = B + Z.shift();
                        K = W;
                        v = z + Z.shift();
                        M.Y(r, j, I, o, s, q, c);
                        M.Y(r, B, $, z, K, v, W)
                    }
                    if (O == "o1235") {
                        j = v + Z.shift();
                        I = W + Z.shift();
                        o = j + Z.shift();
                        s = I + Z.shift();
                        q = o + Z.shift();
                        c = s + Z.shift();
                        B = q + Z.shift();
                        $ = c + Z.shift();
                        z = B + Z.shift();
                        K = $ + Z.shift();
                        v = z + Z.shift();
                        W = K + Z.shift();
                        Z.shift();
                        M.Y(r, j, I, o, s, q, c);
                        M.Y(r, B, $, z, K, v, W)
                    }
                    if (O == "o1236") {
                        j = v + Z.shift();
                        I = W + Z.shift();
                        o = j + Z.shift();
                        s = I + Z.shift();
                        q = o + Z.shift();
                        c = s;
                        B = q + Z.shift();
                        $ = s;
                        z = B + Z.shift();
                        K = $ + Z.shift();
                        v = z + Z.shift();
                        M.Y(r, j, I, o, s, q, c);
                        M.Y(r, B, $, z, K, v, W)
                    }
                    if (O == "o1237") {
                        j = v + Z.shift();
                        I = W + Z.shift();
                        o = j + Z.shift();
                        s = I + Z.shift();
                        q = o + Z.shift();
                        c = s + Z.shift();
                        B = q + Z.shift();
                        $ = c + Z.shift();
                        z = B + Z.shift();
                        K = $ + Z.shift();
                        if (Math.abs(z - v) > Math.abs(K - W)) {
                            v = z + Z.shift()
                        } else {
                            W = K + Z.shift()
                        }
                        M.Y(r, j, I, o, s, q, c);
                        M.Y(r, B, $, z, K, v, W)
                    }
                } else if (O == "o14") {
                    if (Z.length > 0 && Z.length != 4 && !d) {
                        F = Z.shift() + Y.nominalWidthX;
                        d = !0
                    }
                    if (Z.length == 4) {
                        var a6 = 0,
                            G = Z.shift(),
                            A = Z.shift(),
                            ai = Z.shift(),
                            ag = Z.shift(),
                            ap = D.r(Y, ai),
                            a9 = D.r(Y, ag);
                        g.U._drawCFF(Y.CharStrings[ap], T, Y, E, r);
                        T.x = G;
                        T.y = A;
                        g.U._drawCFF(Y.CharStrings[a9], T, Y, E, r)
                    }
                    if (b) {
                        M._(r);
                        b = !1
                    }
                } else if (O == "o19" || O == "o20") {
                    var i;
                    i = Z.length % 2 !== 0;
                    if (i && !d) {
                        F = Z.shift() + S
                    }
                    f += Z.length >> 1;
                    Z.length = 0;
                    d = !0;
                    n += f + 7 >> 3
                } else if (O == "o21") {
                    if (Z.length > 2 && !d) {
                        F = Z.shift() + S;
                        d = !0
                    }
                    W += Z.pop();
                    v += Z.pop();
                    if (b) M._(r);
                    M.S(r, v, W);
                    b = !0
                } else if (O == "o22") {
                    if (Z.length > 1 && !d) {
                        F = Z.shift() + S;
                        d = !0
                    }
                    v += Z.pop();
                    if (b) M._(r);
                    M.S(r, v, W);
                    b = !0
                } else if (O == "o25") {
                    while (Z.length > 6) {
                        v += Z.shift();
                        W += Z.shift();
                        M.H(r, v, W)
                    }
                    j = v + Z.shift();
                    I = W + Z.shift();
                    o = j + Z.shift();
                    s = I + Z.shift();
                    v = o + Z.shift();
                    W = s + Z.shift();
                    M.Y(r, j, I, o, s, v, W)
                } else if (O == "o26") {
                    if (Z.length % 2) {
                        v += Z.shift()
                    }
                    while (Z.length > 0) {
                        j = v;
                        I = W + Z.shift();
                        o = j + Z.shift();
                        s = I + Z.shift();
                        v = o;
                        W = s + Z.shift();
                        M.Y(r, j, I, o, s, v, W)
                    }
                } else if (O == "o27") {
                    if (Z.length % 2) {
                        W += Z.shift()
                    }
                    while (Z.length > 0) {
                        j = v + Z.shift();
                        I = W;
                        o = j + Z.shift();
                        s = I + Z.shift();
                        v = o + Z.shift();
                        W = s;
                        M.Y(r, j, I, o, s, v, W)
                    }
                } else if (O == "o10" || O == "o29") {
                    var w = O == "o10" ? E : Y;
                    if (Z.length == 0) {
                        console.log("error: empty stack")
                    } else {
                        var C = Z.pop(),
                            e = w.Subrs[C + w.Bias];
                        T.x = v;
                        T.y = W;
                        T.l = f;
                        T.z = d;
                        T.width = F;
                        T.open = b;
                        g.U._drawCFF(e, T, Y, E, r);
                        v = T.x;
                        W = T.y;
                        f = T.l;
                        d = T.z;
                        F = T.width;
                        b = T.open
                    }
                } else if (O == "o30" || O == "o31") {
                    var a, U = Z.length,
                        J = 0,
                        m = O == "o31";
                    a = U & ~2;
                    J += U - a;
                    while (J < a) {
                        if (m) {
                            j = v + Z.shift();
                            I = W;
                            o = j + Z.shift();
                            s = I + Z.shift();
                            W = s + Z.shift();
                            if (a - J == 5) {
                                v = o + Z.shift();
                                J++
                            } else v = o;
                            m = !1
                        } else {
                            j = v;
                            I = W + Z.shift();
                            o = j + Z.shift();
                            s = I + Z.shift();
                            v = o + Z.shift();
                            if (a - J == 5) {
                                W = s + Z.shift();
                                J++
                            } else W = s;
                            m = !0
                        }
                        M.Y(r, j, I, o, s, v, W);
                        J += 4
                    }
                } else if ((O + "").charAt(0) == "o") {
                    console.log("Unknown operation: " + O, x);
                    throw O
                } else Z.push(O)
            }
            T.x = v;
            T.y = W;
            T.l = f;
            T.z = d;
            T.width = F;
            T.open = b
        },
        SVG: function() {
            var x = {
                b9: function(n) {
                    return Math.sqrt(Math.abs(n[0] * n[3] - n[1] * n[2]))
                },
                translate: function(n, W, j) {
                    x.concat(n, [1, 0, 0, 1, W, j])
                },
                rotate: function(n, W) {
                    x.concat(n, [Math.cos(W), -Math.sin(W), Math.sin(W), Math.cos(W), 0, 0])
                },
                scale: function(n, W, j) {
                    x.concat(n, [W, 0, 0, j, 0, 0])
                },
                concat: function(n, W) {
                    var j = n[0],
                        k = n[1],
                        I = n[2],
                        o = n[3],
                        s = n[4],
                        B = n[5];
                    n[0] = j * W[0] + k * W[2];
                    n[1] = j * W[1] + k * W[3];
                    n[2] = I * W[0] + o * W[2];
                    n[3] = I * W[1] + o * W[3];
                    n[4] = s * W[0] + B * W[2] + W[4];
                    n[5] = s * W[1] + B * W[3] + W[5]
                },
                aB: function(n) {
                    var W = n[0],
                        j = n[1],
                        k = n[2],
                        I = n[3],
                        o = n[4],
                        s = n[5],
                        B = W * I - j * k;
                    n[0] = I / B;
                    n[1] = -j / B;
                    n[2] = -k / B;
                    n[3] = W / B;
                    n[4] = (k * s - I * o) / B;
                    n[5] = (j * o - W * s) / B
                },
                ac: function(n, W) {
                    var j = W[0],
                        I = W[1];
                    return [j * n[0] + I * n[2] + n[4], j * n[1] + I * n[3] + n[5]]
                },
                aO: function(n, W) {
                    for (var j = 0; j < W.length; j += 2) {
                        var k = W[j],
                            I = W[j + 1];
                        W[j] = k * n[0] + I * n[2] + n[4];
                        W[j + 1] = k * n[1] + I * n[3] + n[5]
                    }
                }
            };

            function T(n, v, W) {
                var j = [],
                    k = 0,
                    I = 0,
                    o = 0;
                while (!0) {
                    var s = n.indexOf(v, I),
                        B = n.indexOf(W, I);
                    if (s == -1 && B == -1) break;
                    if (B == -1 || s != -1 && s < B) {
                        if (o == 0) {
                            j.push(n.slice(k, s).trim());
                            k = s + 1
                        }
                        o++;
                        I = s + 1
                    } else if (s == -1 || B != -1 && B < s) {
                        o--;
                        if (o == 0) {
                            j.push(n.slice(k, B).trim());
                            k = B + 1
                        }
                        I = B + 1
                    }
                }
                return j
            }

            function Y(n) {
                var v = T(n, "{", "}"),
                    W = {};
                for (var j = 0; j < v.length; j += 2) {
                    var k = v[j].split(",");
                    for (var I = 0; I < k.length; I++) {
                        var o = k[I].trim();
                        if (W[o] == null) W[o] = "";
                        W[o] += v[j + 1]
                    }
                }
                return W
            }

            function E(n) {
                var v = T(n, "(", ")"),
                    W = [1, 0, 0, 1, 0, 0];
                for (var j = 0; j < v.length; j += 2) {
                    var k = W;
                    W = r(v[j], v[j + 1]);
                    x.concat(W, k)
                }
                return W
            }

            function r(n, v) {
                var W = [1, 0, 0, 1, 0, 0],
                    j = !0;
                for (var k = 0; k < v.length; k++) {
                    var I = v.charAt(k);
                    if (I == "," || I == " ") j = !0;
                    else if (I == ".") {
                        if (!j) {
                            v = v.slice(0, k) + "," + v.slice(k);
                            k++
                        }
                        j = !1
                    } else if (I == "-" && k > 0 && v[k - 1] != "e") {
                        v = v.slice(0, k) + " " + v.slice(k);
                        k++;
                        j = !0
                    }
                }
                v = v.split(/\s*[\s,]\s*/).map(parseFloat);
                if (!1) {} else if (n == "translate") {
                    if (v.length == 1) x.translate(W, v[0], 0);
                    else x.translate(W, v[0], v[1])
                } else if (n == "scale") {
                    if (v.length == 1) x.scale(W, v[0], v[0]);
                    else x.scale(W, v[0], v[1])
                } else if (n == "rotate") {
                    var o = 0,
                        s = 0;
                    if (v.length != 1) {
                        o = v[1];
                        s = v[2]
                    }
                    x.translate(W, -o, -s);
                    x.rotate(W, -Math.PI * v[0] / 180);
                    x.translate(W, o, s)
                } else if (n == "matrix") W = v;
                else console.log("unknown transform: ", n);
                return W
            }

            function Z(n) {
                var v = {
                    w: [],
                    j: []
                };
                if (n == null) return v;
                var W = new DOMParser,
                    j = W.parseFromString(n, "image/svg+xml"),
                    k = j.getElementsByTagName("svg")[0],
                    I = k.getAttribute("viewBox");
                if (I) I = I.trim().split(" ").map(parseFloat);
                else I = [0, 0, 1e3, 1e3];
                f(k.children, v);
                for (var o = 0; o < v.j.length; o += 2) {
                    var s = v.j[o],
                        B = v.j[o + 1];
                    s -= I[0];
                    B -= I[1];
                    B = -B;
                    v.j[o] = s;
                    v.j[o + 1] = B
                }
                return v
            }

            function f(n, v, W) {
                for (var j = 0; j < n.length; j++) {
                    var k = n[j],
                        I = k.tagName,
                        o = k.getAttribute("fill");
                    if (o == null) o = W;
                    if (I == "g") {
                        var s = {
                            j: [],
                            w: []
                        };
                        f(k.children, s, o);
                        var B = k.getAttribute("transform");
                        if (B) {
                            var $ = E(B);
                            x.aO($, s.j)
                        }
                        v.j = v.j.concat(s.j);
                        v.w = v.w.concat(s.w)
                    } else if (I == "path" || I == "circle" || I == "ellipse") {
                        v.w.push(o ? o : "#000000");
                        var z;
                        if (I == "path") z = k.getAttribute("d");
                        if (I == "circle" || I == "ellipse") {
                            var K = [0, 0, 0, 0],
                                y = ["cx", "cy", "rx", "ry", "r"];
                            for (var H = 0; H < 5; H++) {
                                var q = k.getAttribute(y[H]);
                                if (q) {
                                    q = parseFloat(q);
                                    if (H < 4) K[H] = q;
                                    else K[2] = K[3] = q
                                }
                            }
                            var c = K[0],
                                D = K[1],
                                M = K[2],
                                S = K[3];
                            z = ["M", c - M, D, "a", M, S, 0, 1, 0, M * 2, 0, "a", M, S, 0, 1, 0, -M * 2, 0].join(" ")
                        }
                        b(z, v);
                        v.w.push("X")
                    } else if (I == "defs") {} else console.log(I, k)
                }
            }

            function d(n) {
                var v = [],
                    W = 0,
                    j = !1,
                    k = "",
                    I = "",
                    o = "",
                    s = 0;
                while (W < n.length) {
                    var B = n.charCodeAt(W),
                        $ = n.charAt(W);
                    W++;
                    var z = 48 <= B && B <= 57 || $ == "." || $ == "-" || $ == "+" || $ == "e" || $ == "E";
                    if (j) {
                        if (($ == "+" || $ == "-") && I != "e" || $ == "." && k.indexOf(".") != -1 || z && (o == "a" || o == "A") && (s % 7 == 3 || s % 7 == 4)) {
                            v.push(parseFloat(k));
                            s++;
                            k = $
                        } else if (z) k += $;
                        else {
                            v.push(parseFloat(k));
                            s++;
                            if ($ != "," && $ != " ") {
                                v.push($);
                                o = $;
                                s = 0
                            }
                            j = !1
                        }
                    } else {
                        if (z) {
                            k = $;
                            j = !0
                        } else if ($ != "," && $ != " ") {
                            v.push($);
                            o = $;
                            s = 0
                        }
                    }
                    I = $
                }
                if (j) v.push(parseFloat(k));
                return v
            }

            function F(n, v, W) {
                var j = v;
                while (j < n.length) {
                    if (typeof n[j] == "string") break;
                    j += W
                }
                return (j - v) / W
            }

            function b(n, v) {
                var W = d(n),
                    j = 0,
                    k = 0,
                    I = 0,
                    o = 0,
                    s = 0,
                    B = v.j.length,
                    $ = {
                        M: 2,
                        L: 2,
                        H: 1,
                        V: 1,
                        T: 2,
                        S: 4,
                        A: 7,
                        Q: 4,
                        C: 6
                    },
                    z = v.w,
                    K = v.j;
                while (j < W.length) {
                    var q = W[j];
                    j++;
                    var c = q.toUpperCase();
                    if (c == "Z") {
                        z.push("Z");
                        k = o;
                        I = s
                    } else {
                        var D = $[c],
                            M = F(W, j, D);
                        for (var S = 0; S < M; S++) {
                            if (S == 1 && c == "M") {
                                q = q == c ? "L" : "l";
                                c = "L"
                            }
                            var N = 0,
                                O = 0;
                            if (q != c) {
                                N = k;
                                O = I
                            }
                            if (!1) {} else if (c == "M") {
                                k = N + W[j++];
                                I = O + W[j++];
                                z.push("M");
                                K.push(k, I);
                                o = k;
                                s = I
                            } else if (c == "L") {
                                k = N + W[j++];
                                I = O + W[j++];
                                z.push("L");
                                K.push(k, I)
                            } else if (c == "H") {
                                k = N + W[j++];
                                z.push("L");
                                K.push(k, I)
                            } else if (c == "V") {
                                I = O + W[j++];
                                z.push("L");
                                K.push(k, I)
                            } else if (c == "Q") {
                                var i = N + W[j++],
                                    a = O + W[j++],
                                    u = N + W[j++],
                                    p = O + W[j++];
                                z.push("Q");
                                K.push(i, a, u, p);
                                k = u;
                                I = p
                            } else if (c == "T") {
                                var h = Math.max(K.length - (z[z.length - 1] == "Q" ? 4 : 2), B),
                                    i = k + k - K[h],
                                    a = I + I - K[h + 1],
                                    u = N + W[j++],
                                    p = O + W[j++];
                                z.push("Q");
                                K.push(i, a, u, p);
                                k = u;
                                I = p
                            } else if (c == "C") {
                                var i = N + W[j++],
                                    a = O + W[j++],
                                    u = N + W[j++],
                                    p = O + W[j++],
                                    J = N + W[j++],
                                    G = O + W[j++];
                                z.push("C");
                                K.push(i, a, u, p, J, G);
                                k = J;
                                I = G
                            } else if (c == "S") {
                                var h = Math.max(K.length - (z[z.length - 1] == "C" ? 4 : 2), B),
                                    i = k + k - K[h],
                                    a = I + I - K[h + 1],
                                    u = N + W[j++],
                                    p = O + W[j++],
                                    J = N + W[j++],
                                    G = O + W[j++];
                                z.push("C");
                                K.push(i, a, u, p, J, G);
                                k = J;
                                I = G
                            } else if (c == "A") {
                                var i = k,
                                    a = I,
                                    A = W[j++],
                                    Q = W[j++],
                                    ai = W[j++] * (Math.PI / 180),
                                    ag = W[j++],
                                    ap = W[j++],
                                    u = N + W[j++],
                                    p = O + W[j++];
                                if (u == k && p == I && A == 0 && Q == 0) continue;
                                var a9 = (i - u) / 2,
                                    w = (a - p) / 2,
                                    C = Math.cos(ai),
                                    e = Math.sin(ai),
                                    U = C * a9 + e * w,
                                    m = -e * a9 + C * w,
                                    a4 = A * A,
                                    a0 = Q * Q,
                                    ao = U * U,
                                    ad = m * m,
                                    ab = (a4 * a0 - a4 * ad - a0 * ao) / (a4 * ad + a0 * ao),
                                    ae = (ag != ap ? 1 : -1) * Math.sqrt(Math.max(ab, 0)),
                                    an = ae * (A * m) / Q,
                                    as = -ae * (Q * U) / A,
                                    a1 = C * an - e * as + (i + u) / 2,
                                    ar = e * an + C * as + (a + p) / 2,
                                    aa = function(R, l, V, t) {
                                        var a3 = Math.sqrt(R * R + l * l),
                                            P = Math.sqrt(V * V + t * t),
                                            at = (R * V + l * t) / (a3 * P);
                                        return (R * t - l * V >= 0 ? 1 : -1) * Math.acos(Math.max(-1, Math.min(1, at)))
                                    },
                                    au = (U - an) / A,
                                    ah = (m - as) / Q,
                                    am = aa(1, 0, au, ah),
                                    af = aa(au, ah, (-U - an) / A, (-m - as) / Q);
                                af = af % (2 * Math.PI);
                                var a5 = function(a8, k, I, R, l, V, t) {
                                        var a3 = function(L, X) {
                                                var ak = Math.sin(X),
                                                    h = Math.cos(X),
                                                    X = L[0],
                                                    aq = L[1],
                                                    a2 = L[2],
                                                    n = L[3];
                                                L[0] = X * h + aq * ak;
                                                L[1] = -X * ak + aq * h;
                                                L[2] = a2 * h + n * ak;
                                                L[3] = -a2 * ak + n * h
                                            },
                                            P = function(L, X) {
                                                for (var S = 0; S < X.length; S += 2) {
                                                    var k = X[S],
                                                        I = X[S + 1];
                                                    X[S] = L[0] * k + L[2] * I + L[4];
                                                    X[S + 1] = L[1] * k + L[3] * I + L[5]
                                                }
                                            },
                                            at = function(L, X) {
                                                for (var S = 0; S < X.length; S++) L.push(X[S])
                                            },
                                            ac = function(L, R) {
                                                at(L.w, R.w);
                                                at(L.j, R.j)
                                            };
                                        if (t)
                                            while (V > l) V -= 2 * Math.PI;
                                        else
                                            while (V < l) V += 2 * Math.PI;
                                        var a7 = (V - l) / 4,
                                            al = Math.cos(a7 / 2),
                                            aj = -Math.sin(a7 / 2),
                                            i = (4 - al) / 3,
                                            a = aj == 0 ? aj : (1 - al) * (3 - al) / (3 * aj),
                                            u = i,
                                            p = -a,
                                            J = al,
                                            G = -aj,
                                            D = [i, a, u, p, J, G],
                                            v = {
                                                w: ["C", "C", "C", "C"],
                                                j: D.slice(0)
                                            },
                                            _ = [1, 0, 0, 1, 0, 0];
                                        a3(_, -a7);
                                        for (var S = 0; S < 3; S++) {
                                            P(_, D);
                                            at(v.j, D)
                                        }
                                        a3(_, -l + a7 / 2);
                                        _[0] *= R;
                                        _[1] *= R;
                                        _[2] *= R;
                                        _[3] *= R;
                                        _[4] = k;
                                        _[5] = I;
                                        P(_, v.j);
                                        P(a8.aw, v.j);
                                        ac(a8.bb, v)
                                    },
                                    a8 = {
                                        bb: v,
                                        aw: [A * C, A * e, -Q * e, Q * C, a1, ar]
                                    };
                                a5(a8, 0, 0, 1, am, am + af, ap == 0);
                                k = u;
                                I = p
                            } else console.log("Unknown SVG command " + q)
                        }
                    }
                }
            }
            return {
                cssMap: Y,
                readTrnf: E,
                am: b,
                a2: Z
            }
        }(),
        initHB: function(x, T) {
            var Y = function(E) {
                var r = 0;
                if ((E & 4294967295 - (1 << 7) + 1) == 0) {
                    r = 1
                } else if ((E & 4294967295 - (1 << 11) + 1) == 0) {
                    r = 2
                } else if ((E & 4294967295 - (1 << 16) + 1) == 0) {
                    r = 3
                } else if ((E & 4294967295 - (1 << 21) + 1) == 0) {
                    r = 4
                }
                return r
            };
            fetch(x).then(function(E) {
                return E.arrayBuffer()
            }).then(function(E) {
                return WebAssembly.instantiate(E)
            }).then(function(E) {
                var r = E.instance.exports,
                    Z = r.memory,
                    f, d, F, b, n, v, W, j;
                g.U.shapeHB = function() {
                    var k = function(o) {
                            var s = r.hb_buffer_get_length(o),
                                B = [],
                                $ = r.hb_buffer_get_glyph_infos(o, 0) >>> 2,
                                z = r.hb_buffer_get_glyph_positions(o, 0) >>> 2;
                            for (var K = 0; K < s; ++K) {
                                var y = $ + K * 5,
                                    H = z + K * 5;
                                B.push({
                                    g: d[y + 0],
                                    cl: d[y + 2],
                                    ax: F[H + 0],
                                    ay: F[H + 1],
                                    dx: F[H + 2],
                                    dy: F[H + 3]
                                })
                            }
                            return B
                        },
                        I;
                    return function(o, s, B) {
                        var $ = o._data,
                            z = o.name.postScriptName,
                            K = Z.buffer.byteLength,
                            y = 2 * $.length + s.length * 16 + 4e6,
                            N = 0,
                            O = 0;
                        if (K < y) {
                            Z.grow((y - K >>> 16) + 4)
                        }
                        f = new Uint8Array(Z.buffer);
                        d = new Uint32Array(Z.buffer);
                        F = new Int32Array(Z.buffer);
                        if (b != z) {
                            if (n != null) {
                                r.hb_blob_destroy(n);
                                r.free(v);
                                r.hb_face_destroy(W);
                                r.hb_font_destroy(j)
                            }
                            v = r.malloc($.byteLength);
                            f.set($, v);
                            n = r.hb_blob_create(v, $.byteLength, 2, 0, 0);
                            W = r.hb_face_create(n, 0);
                            j = r.hb_font_create(W);
                            b = z
                        }
                        if (window.TextEncoder == null) {
                            alert("Your browser is too old. Please, update it.");
                            return
                        }
                        if (I == null) I = new window.TextEncoder("utf8");
                        var H = r.hb_buffer_create(),
                            q = I.encode(s),
                            c = q.length,
                            D = r.malloc(c);
                        f.set(q, D);
                        r.hb_buffer_add_utf8(H, D, c, 0, c);
                        r.free(D);
                        r.hb_buffer_set_direction(H, B ? 4 : 5);
                        r.hb_buffer_guess_segment_properties(H);
                        r.hb_shape(j, H, 0, 0);
                        var M = k(H);
                        r.hb_buffer_destroy(H);
                        var S = M.slice(0);
                        if (!B) S.reverse();
                        for (var i = 1; i < S.length; i++) {
                            var a = S[i],
                                u = a.cl;
                            while (!0) {
                                var p = s.codePointAt(N),
                                    h = Y(p);
                                if (O + h <= u) {
                                    O += h;
                                    N += p <= 65535 ? 1 : 2
                                } else break
                            }
                            a.cl = N
                        }
                        return M
                    }
                }();
                T()
            })
        }
    };
    return g
}()
