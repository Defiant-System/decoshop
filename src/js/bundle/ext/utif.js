const UTIF = (function() {
"use strict";

    var b = {};
    // if (typeof module == "object") {
    //     module.exports = b
    // } else {
    //     window.UTIF = b
    // }
    // var bb = typeof require === "function" ? require("pako") : window.pako;
    var bb = pako;

    function az() {
        if (typeof process == "undefined" || process.env.NODE_ENV == "development") console.log.apply(console, arguments)
    }(function(b, bb) {
        (function() {
            "use strict";
            var c = function C() {
                    function c(F) {
                        this.message = "JPEG error: " + F
                    }
                    c.prototype = new Error;
                    c.prototype.name = "JpegError";
                    c.constructor = c;
                    return c
                }(),
                V = function g() {
                    var F = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]),
                        a = 4017,
                        q = 799,
                        R = 3406,
                        d = 2276,
                        T = 1567,
                        i = 3784,
                        _ = 5793,
                        E = 2896;

                    function V(D) {
                        if (D == null) D = {};
                        if (D.w == null) D.w = -1;
                        this.V = D.n;
                        this.N = D.w
                    }

                    function G(D, y) {
                        var e = 0,
                            X = [],
                            n, k, P = 16,
                            A;
                        while (P > 0 && !D[P - 1]) {
                            P--
                        }
                        X.push({
                            children: [],
                            index: 0
                        });
                        var z = X[0];
                        for (n = 0; n < P; n++) {
                            for (k = 0; k < D[n]; k++) {
                                z = X.pop();
                                z.children[z.index] = y[e];
                                while (z.index > 0) {
                                    z = X.pop()
                                }
                                z.index++;
                                X.push(z);
                                while (X.length <= n) {
                                    X.push(A = {
                                        children: [],
                                        index: 0
                                    });
                                    z.children[z.index] = A.children;
                                    z = A
                                }
                                e++
                            }
                            if (n + 1 < P) {
                                X.push(A = {
                                    children: [],
                                    index: 0
                                });
                                z.children[z.index] = A.children;
                                z = A
                            }
                        }
                        return X[0].children
                    }

                    function r(D, y, e) {
                        return 64 * ((D.P + 1) * y + e)
                    }

                    function j(D, y, e, X, n, k, P, A, z, o) {
                        if (o == null) o = !1;
                        var t = e.m,
                            S = e.Z,
                            U = y,
                            B = 0,
                            $ = 0,
                            s = 0,
                            x = 0,
                            a0, Y = 0,
                            K, f, h, w, b7, as, ai = 0,
                            b6, aD, aT, ba;

                        function b0() {
                            if ($ > 0) {
                                $--;
                                return B >> $ & 1
                            }
                            B = D[y++];
                            if (B === 255) {
                                var aR = D[y++];
                                if (aR) {
                                    if (aR === 220 && o) {
                                        y += 2;
                                        var aC = Z(D, y);
                                        y += 2;
                                        if (aC > 0 && aC !== e.s) {
                                            throw new DNLMarkerError("Found DNL marker (0xFFDC) while parsing scan data", aC)
                                        }
                                    } else if (aR === 217) {
                                        if (o) {
                                            var bc = Y * 8;
                                            if (bc > 0 && bc < e.s / 10) {
                                                throw new DNLMarkerError("Found EOI marker (0xFFD9) while parsing scan data, " + "possibly caused by incorrect `scanLines` parameter", bc)
                                            }
                                        }
                                        throw new EOIMarkerError("Found EOI marker (0xFFD9) while parsing scan data")
                                    }
                                    throw new c("unexpected marker")
                                }
                            }
                            $ = 7;
                            return B >>> 7
                        }

                        function aM(aR) {
                            var aC = aR;
                            while (!0) {
                                aC = aC[b0()];
                                switch (typeof aC) {
                                    case "number":
                                        return aC;
                                    case "object":
                                        continue
                                }
                                throw new c("invalid huffman sequence")
                            }
                        }

                        function aL(aR) {
                            var b7 = 0;
                            while (aR > 0) {
                                b7 = b7 << 1 | b0();
                                aR--
                            }
                            return b7
                        }

                        function ad(aR) {
                            if (aR === 1) {
                                return b0() === 1 ? 1 : -1
                            }
                            var b7 = aL(aR);
                            if (b7 >= 1 << aR - 1) {
                                return b7
                            }
                            return b7 + (-1 << aR) + 1
                        }

                        function ak(K, aR) {
                            var aC = aM(K.J),
                                bc = aC === 0 ? 0 : ad(aC),
                                w = 1;
                            K.D[aR] = K.Q += bc;
                            while (w < 64) {
                                var ax = aM(K.i),
                                    aj = ax & 15,
                                    aX = ax >> 4;
                                if (aj === 0) {
                                    if (aX < 15) {
                                        break
                                    }
                                    w += 16;
                                    continue
                                }
                                w += aX;
                                var af = F[w];
                                K.D[aR + af] = ad(aj);
                                w++
                            }
                        }

                        function aJ(K, aR) {
                            var aC = aM(K.J),
                                bc = aC === 0 ? 0 : ad(aC) << z;
                            K.D[aR] = K.Q += bc
                        }

                        function aF(K, aR) {
                            K.D[aR] |= b0() << z
                        }

                        function H(K, aR) {
                            if (s > 0) {
                                s--;
                                return
                            }
                            var w = k,
                                aC = P;
                            while (w <= aC) {
                                var bc = aM(K.i),
                                    ax = bc & 15,
                                    aj = bc >> 4;
                                if (ax === 0) {
                                    if (aj < 15) {
                                        s = aL(aj) + (1 << aj) - 1;
                                        break
                                    }
                                    w += 16;
                                    continue
                                }
                                w += aj;
                                var aX = F[w];
                                K.D[aR + aX] = ad(ax) * (1 << z);
                                w++
                            }
                        }

                        function aI(K, aR) {
                            var w = k,
                                aC = P,
                                bc = 0,
                                ax, aj;
                            while (w <= aC) {
                                var aX = aR + F[w],
                                    af = K.D[aX] < 0 ? -1 : 1;
                                switch (x) {
                                    case 0:
                                        aj = aM(K.i);
                                        ax = aj & 15;
                                        bc = aj >> 4;
                                        if (ax === 0) {
                                            if (bc < 15) {
                                                s = aL(bc) + (1 << bc);
                                                x = 4
                                            } else {
                                                bc = 16;
                                                x = 1
                                            }
                                        } else {
                                            if (ax !== 1) {
                                                throw new c("invalid ACn encoding")
                                            }
                                            a0 = ad(ax);
                                            x = bc ? 2 : 3
                                        }
                                        continue;
                                    case 1:
                                    case 2:
                                        if (K.D[aX]) {
                                            K.D[aX] += af * (b0() << z)
                                        } else {
                                            bc--;
                                            if (bc === 0) {
                                                x = x === 2 ? 3 : 0
                                            }
                                        }
                                        break;
                                    case 3:
                                        if (K.D[aX]) {
                                            K.D[aX] += af * (b0() << z)
                                        } else {
                                            K.D[aX] = a0 << z;
                                            x = 0
                                        }
                                        break;
                                    case 4:
                                        if (K.D[aX]) {
                                            K.D[aX] += af * (b0() << z)
                                        }
                                        break
                                }
                                w++
                            }
                            if (x === 4) {
                                s--;
                                if (s === 0) {
                                    x = 0
                                }
                            }
                        }

                        function a$(K, aR, ai, aC, bc) {
                            var ax = ai / t | 0,
                                aj = ai % t;
                            Y = ax * K.A + aC;
                            var aX = aj * K.h + bc,
                                af = r(K, Y, aX);
                            aR(K, af)
                        }

                        function aY(K, aR, ai) {
                            Y = ai / K.P | 0;
                            var aC = ai % K.P,
                                bc = r(K, Y, aC);
                            aR(K, bc)
                        }
                        var a8 = X.length;
                        if (S) {
                            if (k === 0) {
                                as = A === 0 ? aJ : aF
                            } else {
                                as = A === 0 ? H : aI
                            }
                        } else {
                            as = ak
                        }
                        if (a8 === 1) {
                            aD = X[0].P * X[0].c
                        } else {
                            aD = t * e.R
                        }
                        while (ai <= aD) {
                            var b5 = n ? Math.min(aD - ai, n) : aD;
                            if (b5 > 0) {
                                for (f = 0; f < a8; f++) {
                                    X[f].Q = 0
                                }
                                s = 0;
                                if (a8 === 1) {
                                    K = X[0];
                                    for (b7 = 0; b7 < b5; b7++) {
                                        aY(K, as, ai);
                                        ai++
                                    }
                                } else {
                                    for (b7 = 0; b7 < b5; b7++) {
                                        for (f = 0; f < a8; f++) {
                                            K = X[f];
                                            aT = K.h;
                                            ba = K.A;
                                            for (h = 0; h < ba; h++) {
                                                for (w = 0; w < aT; w++) {
                                                    a$(K, as, ai, h, w)
                                                }
                                            }
                                        }
                                        ai++
                                    }
                                }
                            }
                            $ = 0;
                            b6 = v(D, y);
                            if (!b6) {
                                break
                            }
                            if (b6.u) {
                                var at = b5 > 0 ? "unexpected" : "excessive";
                                y = b6.offset
                            }
                            if (b6.M >= 65488 && b6.M <= 65495) {
                                y += 2
                            } else {
                                break
                            }
                        }
                        return y - U
                    }

                    function M(D, y, e) {
                        var X = D.$,
                            n = D.D,
                            k, P, A, z, o, t, S, U, B, $, s, x, a0, Y, K, a2, f;
                        if (!X) {
                            throw new c("missing required Quantization Table.")
                        }
                        for (var h = 0; h < 64; h += 8) {
                            B = n[y + h];
                            $ = n[y + h + 1];
                            s = n[y + h + 2];
                            x = n[y + h + 3];
                            a0 = n[y + h + 4];
                            Y = n[y + h + 5];
                            K = n[y + h + 6];
                            a2 = n[y + h + 7];
                            B *= X[h];
                            if (($ | s | x | a0 | Y | K | a2) === 0) {
                                f = _ * B + 512 >> 10;
                                e[h] = f;
                                e[h + 1] = f;
                                e[h + 2] = f;
                                e[h + 3] = f;
                                e[h + 4] = f;
                                e[h + 5] = f;
                                e[h + 6] = f;
                                e[h + 7] = f;
                                continue
                            }
                            $ *= X[h + 1];
                            s *= X[h + 2];
                            x *= X[h + 3];
                            a0 *= X[h + 4];
                            Y *= X[h + 5];
                            K *= X[h + 6];
                            a2 *= X[h + 7];
                            k = _ * B + 128 >> 8;
                            P = _ * a0 + 128 >> 8;
                            A = s;
                            z = K;
                            o = E * ($ - a2) + 128 >> 8;
                            U = E * ($ + a2) + 128 >> 8;
                            t = x << 4;
                            S = Y << 4;
                            k = k + P + 1 >> 1;
                            P = k - P;
                            f = A * i + z * T + 128 >> 8;
                            A = A * T - z * i + 128 >> 8;
                            z = f;
                            o = o + S + 1 >> 1;
                            S = o - S;
                            U = U + t + 1 >> 1;
                            t = U - t;
                            k = k + z + 1 >> 1;
                            z = k - z;
                            P = P + A + 1 >> 1;
                            A = P - A;
                            f = o * d + U * R + 2048 >> 12;
                            o = o * R - U * d + 2048 >> 12;
                            U = f;
                            f = t * q + S * a + 2048 >> 12;
                            t = t * a - S * q + 2048 >> 12;
                            S = f;
                            e[h] = k + U;
                            e[h + 7] = k - U;
                            e[h + 1] = P + S;
                            e[h + 6] = P - S;
                            e[h + 2] = A + t;
                            e[h + 5] = A - t;
                            e[h + 3] = z + o;
                            e[h + 4] = z - o
                        }
                        for (var w = 0; w < 8; ++w) {
                            B = e[w];
                            $ = e[w + 8];
                            s = e[w + 16];
                            x = e[w + 24];
                            a0 = e[w + 32];
                            Y = e[w + 40];
                            K = e[w + 48];
                            a2 = e[w + 56];
                            if (($ | s | x | a0 | Y | K | a2) === 0) {
                                f = _ * B + 8192 >> 14;
                                if (f < -2040) {
                                    f = 0
                                } else if (f >= 2024) {
                                    f = 255
                                } else {
                                    f = f + 2056 >> 4
                                }
                                n[y + w] = f;
                                n[y + w + 8] = f;
                                n[y + w + 16] = f;
                                n[y + w + 24] = f;
                                n[y + w + 32] = f;
                                n[y + w + 40] = f;
                                n[y + w + 48] = f;
                                n[y + w + 56] = f;
                                continue
                            }
                            k = _ * B + 2048 >> 12;
                            P = _ * a0 + 2048 >> 12;
                            A = s;
                            z = K;
                            o = E * ($ - a2) + 2048 >> 12;
                            U = E * ($ + a2) + 2048 >> 12;
                            t = x;
                            S = Y;
                            k = (k + P + 1 >> 1) + 4112;
                            P = k - P;
                            f = A * i + z * T + 2048 >> 12;
                            A = A * T - z * i + 2048 >> 12;
                            z = f;
                            o = o + S + 1 >> 1;
                            S = o - S;
                            U = U + t + 1 >> 1;
                            t = U - t;
                            k = k + z + 1 >> 1;
                            z = k - z;
                            P = P + A + 1 >> 1;
                            A = P - A;
                            f = o * d + U * R + 2048 >> 12;
                            o = o * R - U * d + 2048 >> 12;
                            U = f;
                            f = t * q + S * a + 2048 >> 12;
                            t = t * a - S * q + 2048 >> 12;
                            S = f;
                            B = k + U;
                            a2 = k - U;
                            $ = P + S;
                            K = P - S;
                            s = A + t;
                            Y = A - t;
                            x = z + o;
                            a0 = z - o;
                            if (B < 16) {
                                B = 0
                            } else if (B >= 4080) {
                                B = 255
                            } else {
                                B >>= 4
                            }
                            if ($ < 16) {
                                $ = 0
                            } else if ($ >= 4080) {
                                $ = 255
                            } else {
                                $ >>= 4
                            }
                            if (s < 16) {
                                s = 0
                            } else if (s >= 4080) {
                                s = 255
                            } else {
                                s >>= 4
                            }
                            if (x < 16) {
                                x = 0
                            } else if (x >= 4080) {
                                x = 255
                            } else {
                                x >>= 4
                            }
                            if (a0 < 16) {
                                a0 = 0
                            } else if (a0 >= 4080) {
                                a0 = 255
                            } else {
                                a0 >>= 4
                            }
                            if (Y < 16) {
                                Y = 0
                            } else if (Y >= 4080) {
                                Y = 255
                            } else {
                                Y >>= 4
                            }
                            if (K < 16) {
                                K = 0
                            } else if (K >= 4080) {
                                K = 255
                            } else {
                                K >>= 4
                            }
                            if (a2 < 16) {
                                a2 = 0
                            } else if (a2 >= 4080) {
                                a2 = 255
                            } else {
                                a2 >>= 4
                            }
                            n[y + w] = B;
                            n[y + w + 8] = $;
                            n[y + w + 16] = s;
                            n[y + w + 24] = x;
                            n[y + w + 32] = a0;
                            n[y + w + 40] = Y;
                            n[y + w + 48] = K;
                            n[y + w + 56] = a2
                        }
                    }

                    function l(D, y) {
                        var e = y.P,
                            X = y.c,
                            n = new Int16Array(64);
                        for (var k = 0; k < X; k++) {
                            for (var P = 0; P < e; P++) {
                                var A = r(y, k, P);
                                M(y, A, n)
                            }
                        }
                        return y.D
                    }

                    function v(D, y, e) {
                        if (e == null) e = y;
                        var X = D.length - 1,
                            n = e < y ? e : y;
                        if (y >= X) {
                            return null
                        }
                        var k = Z(D, y);
                        if (k >= 65472 && k <= 65534) {
                            return {
                                u: null,
                                M: k,
                                offset: y
                            }
                        }
                        var P = Z(D, n);
                        while (!(P >= 65472 && P <= 65534)) {
                            if (++n >= X) {
                                return null
                            }
                            P = Z(D, n)
                        }
                        return {
                            u: k.toString(16),
                            M: P,
                            offset: n
                        }
                    }
                    V.prototype = {
                        parse(D, y) {
                            if (y == null) y = {};
                            var e = y.F,
                                X = 0,
                                n = null,
                                k = null,
                                P, A, z = 0;

                            function o() {
                                var aX = Z(D, X);
                                X += 2;
                                var af = X + aX - 2,
                                    $ = v(D, af, X);
                                if ($ && $.u) {
                                    af = $.offset
                                }
                                var aH = D.subarray(X, af);
                                X += aH.length;
                                return aH
                            }

                            function t(P) {
                                var aX = Math.ceil(P.o / 8 / P.X),
                                    af = Math.ceil(P.s / 8 / P.B);
                                for (var s = 0; s < P.W.length; s++) {
                                    H = P.W[s];
                                    var aH = Math.ceil(Math.ceil(P.o / 8) * H.h / P.X),
                                        an = Math.ceil(Math.ceil(P.s / 8) * H.A / P.B),
                                        a9 = aX * H.h,
                                        b3 = af * H.A,
                                        a7 = 64 * b3 * (a9 + 1);
                                    H.D = new Int16Array(a7);
                                    H.P = aH;
                                    H.c = an
                                }
                                P.m = aX;
                                P.R = af
                            }
                            var S = [],
                                U = [],
                                B = [],
                                $ = Z(D, X);
                            X += 2;
                            if ($ !== 65496) {
                                throw new c("SOI not found")
                            }
                            $ = Z(D, X);
                            X += 2;
                            markerLoop: while ($ !== 65497) {
                                var s, x, a0;
                                switch ($) {
                                    case 65504:
                                    case 65505:
                                    case 65506:
                                    case 65507:
                                    case 65508:
                                    case 65509:
                                    case 65510:
                                    case 65511:
                                    case 65512:
                                    case 65513:
                                    case 65514:
                                    case 65515:
                                    case 65516:
                                    case 65517:
                                    case 65518:
                                    case 65519:
                                    case 65534:
                                        var Y = o();
                                        if ($ === 65504) {
                                            if (Y[0] === 74 && Y[1] === 70 && Y[2] === 73 && Y[3] === 70 && Y[4] === 0) {
                                                n = {
                                                    version: {
                                                        d: Y[5],
                                                        T: Y[6]
                                                    },
                                                    K: Y[7],
                                                    j: Y[8] << 8 | Y[9],
                                                    H: Y[10] << 8 | Y[11],
                                                    S: Y[12],
                                                    I: Y[13],
                                                    C: Y.subarray(14, 14 + 3 * Y[12] * Y[13])
                                                }
                                            }
                                        }
                                        if ($ === 65518) {
                                            if (Y[0] === 65 && Y[1] === 100 && Y[2] === 111 && Y[3] === 98 && Y[4] === 101) {
                                                k = {
                                                    version: Y[5] << 8 | Y[6],
                                                    k: Y[7] << 8 | Y[8],
                                                    q: Y[9] << 8 | Y[10],
                                                    a: Y[11]
                                                }
                                            }
                                        }
                                        break;
                                    case 65499:
                                        var K = Z(D, X),
                                            a2;
                                        X += 2;
                                        var f = K + X - 2;
                                        while (X < f) {
                                            var h = D[X++],
                                                w = new Uint16Array(64);
                                            if (h >> 4 === 0) {
                                                for (x = 0; x < 64; x++) {
                                                    a2 = F[x];
                                                    w[a2] = D[X++]
                                                }
                                            } else if (h >> 4 === 1) {
                                                for (x = 0; x < 64; x++) {
                                                    a2 = F[x];
                                                    w[a2] = Z(D, X);
                                                    X += 2
                                                }
                                            } else {
                                                throw new c("DQT - invalid table spec")
                                            }
                                            S[h & 15] = w
                                        }
                                        break;
                                    case 65472:
                                    case 65473:
                                    case 65474:
                                        if (P) {
                                            throw new c("Only single frame JPEGs supported")
                                        }
                                        X += 2;
                                        P = {};
                                        P.G = $ === 65473;
                                        P.Z = $ === 65474;
                                        P.precision = D[X++];
                                        var b7 = Z(D, X),
                                            as, ai = 0,
                                            b6 = 0;
                                        X += 2;
                                        P.s = e || b7;
                                        P.o = Z(D, X);
                                        X += 2;
                                        P.W = [];
                                        P._ = {};
                                        var aD = D[X++];
                                        for (s = 0; s < aD; s++) {
                                            as = D[X];
                                            var aT = D[X + 1] >> 4,
                                                ba = D[X + 1] & 15;
                                            if (ai < aT) {
                                                ai = aT
                                            }
                                            if (b6 < ba) {
                                                b6 = ba
                                            }
                                            var b0 = D[X + 2];
                                            a0 = P.W.push({
                                                h: aT,
                                                A: ba,
                                                L: b0,
                                                $: null
                                            });
                                            P._[as] = a0 - 1;
                                            X += 3
                                        }
                                        P.X = ai;
                                        P.B = b6;
                                        t(P);
                                        break;
                                    case 65476:
                                        var aM = Z(D, X);
                                        X += 2;
                                        for (s = 2; s < aM;) {
                                            var aL = D[X++],
                                                ad = new Uint8Array(16),
                                                ak = 0;
                                            for (x = 0; x < 16; x++, X++) {
                                                ak += ad[x] = D[X]
                                            }
                                            var aJ = new Uint8Array(ak);
                                            for (x = 0; x < ak; x++, X++) {
                                                aJ[x] = D[X]
                                            }
                                            s += 17 + ak;
                                            (aL >> 4 === 0 ? B : U)[aL & 15] = G(ad, aJ)
                                        }
                                        break;
                                    case 65501:
                                        X += 2;
                                        A = Z(D, X);
                                        X += 2;
                                        break;
                                    case 65498:
                                        var aF = ++z === 1 && !e,
                                            H;
                                        X += 2;
                                        var aI = D[X++],
                                            a$ = [];
                                        for (s = 0; s < aI; s++) {
                                            var aY = D[X++],
                                                a8 = P._[aY];
                                            H = P.W[a8];
                                            H.index = aY;
                                            var b5 = D[X++];
                                            H.J = B[b5 >> 4];
                                            H.i = U[b5 & 15];
                                            a$.push(H)
                                        }
                                        var at = D[X++],
                                            aR = D[X++],
                                            aC = D[X++];
                                        try {
                                            var bc = j(D, X, P, a$, A, at, aR, aC >> 4, aC & 15, aF);
                                            X += bc
                                        } catch (ex) {
                                            if (ex instanceof DNLMarkerError) {
                                                return this.parse(D, {
                                                    F: ex.s
                                                })
                                            } else if (ex instanceof EOIMarkerError) {
                                                break markerLoop
                                            }
                                            throw ex
                                        }
                                        break;
                                    case 65500:
                                        X += 4;
                                        break;
                                    case 65535:
                                        if (D[X] !== 255) {
                                            X--
                                        }
                                        break;
                                    default:
                                        var ax = v(D, X - 2, X - 3);
                                        if (ax && ax.u) {
                                            X = ax.offset;
                                            break
                                        }
                                        if (X >= D.length - 1) {
                                            break markerLoop
                                        }
                                        throw new c("JpegImage.parse - unknown marker: " + $.toString(16))
                                }
                                $ = Z(D, X);
                                X += 2
                            }
                            this.width = P.o;
                            this.height = P.s;
                            this.g = n;
                            this.b = k;
                            this.W = [];
                            for (s = 0; s < P.W.length; s++) {
                                H = P.W[s];
                                var aj = S[H.L];
                                if (aj) {
                                    H.$ = aj
                                }
                                this.W.push({
                                    index: H.index,
                                    e: l(P, H),
                                    l: H.h / P.X,
                                    t: H.A / P.B,
                                    P: H.P,
                                    c: H.c
                                })
                            }
                            this.p = this.W.length;
                            return undefined
                        },
                        Y(D, y, e) {
                            if (e == null) e = !1;
                            var X = this.width / D,
                                n = this.height / y,
                                k, P, A, z, o, t, S, U, B, $, s = 0,
                                x, a0 = this.W.length,
                                Y = D * y * a0,
                                K = new Uint8ClampedArray(Y),
                                a2 = new Uint32Array(D),
                                f = 4294967288,
                                h;
                            for (S = 0; S < a0; S++) {
                                k = this.W[S];
                                P = k.l * X;
                                A = k.t * n;
                                s = S;
                                x = k.e;
                                z = k.P + 1 << 3;
                                if (P !== h) {
                                    for (o = 0; o < D; o++) {
                                        U = 0 | o * P;
                                        a2[o] = (U & f) << 3 | U & 7
                                    }
                                    h = P
                                }
                                for (t = 0; t < y; t++) {
                                    U = 0 | t * A;
                                    $ = z * (U & f) | (U & 7) << 3;
                                    for (o = 0; o < D; o++) {
                                        K[s] = x[$ + a2[o]];
                                        s += a0
                                    }
                                }
                            }
                            var w = this.V;
                            if (!e && a0 === 4 && !w) {
                                w = new Int32Array([-256, 255, -256, 255, -256, 255, -256, 255])
                            }
                            if (w) {
                                for (S = 0; S < Y;) {
                                    for (U = 0, B = 0; U < a0; U++, S++, B += 2) {
                                        K[S] = (K[S] * w[B] >> 8) + w[B + 1]
                                    }
                                }
                            }
                            return K
                        },
                        get f() {
                            if (this.b) {
                                return !!this.b.a
                            }
                            if (this.p === 3) {
                                if (this.N === 0) {
                                    return !1
                                } else if (this.W[0].index === 82 && this.W[1].index === 71 && this.W[2].index === 66) {
                                    return !1
                                }
                                return !0
                            }
                            if (this.N === 1) {
                                return !0
                            }
                            return !1
                        },
                        z: function L(D) {
                            var y, e, X;
                            for (var n = 0, k = D.length; n < k; n += 3) {
                                y = D[n];
                                e = D[n + 1];
                                X = D[n + 2];
                                D[n] = y - 179.456 + 1.402 * X;
                                D[n + 1] = y + 135.459 - .344 * e - .714 * X;
                                D[n + 2] = y - 226.816 + 1.772 * e
                            }
                            return D
                        },
                        O: function u(D) {
                            var y, e, X, n, k = 0;
                            for (var P = 0, A = D.length; P < A; P += 4) {
                                y = D[P];
                                e = D[P + 1];
                                X = D[P + 2];
                                n = D[P + 3];
                                D[k++] = -122.67195406894 + e * (-660635669420364e-19 * e + .000437130475926232 * X - 54080610064599e-18 * y + .00048449797120281 * n - .154362151871126) + X * (-.000957964378445773 * X + .000817076911346625 * y - .00477271405408747 * n + 1.53380253221734) + y * (.000961250184130688 * y - .00266257332283933 * n + .48357088451265) + n * (-.000336197177618394 * n + .484791561490776);
                                D[k++] = 107.268039397724 + e * (219927104525741e-19 * e - .000640992018297945 * X + .000659397001245577 * y + .000426105652938837 * n - .176491792462875) + X * (-.000778269941513683 * X + .00130872261408275 * y + .000770482631801132 * n - .151051492775562) + y * (.00126935368114843 * y - .00265090189010898 * n + .25802910206845) + n * (-.000318913117588328 * n - .213742400323665);
                                D[k++] = -20.810012546947 + e * (-.000570115196973677 * e - 263409051004589e-19 * X + .0020741088115012 * y - .00288260236853442 * n + .814272968359295) + X * (-153496057440975e-19 * X - .000132689043961446 * y + .000560833691242812 * n - .195152027534049) + y * (.00174418132927582 * y - .00255243321439347 * n + .116935020465145) + n * (-.000343531996510555 * n + .24165260232407)
                            }
                            return D.subarray(0, k)
                        },
                        r: function I(D) {
                            var y, e, X;
                            for (var n = 0, k = D.length; n < k; n += 4) {
                                y = D[n];
                                e = D[n + 1];
                                X = D[n + 2];
                                D[n] = 434.456 - y - 1.402 * X;
                                D[n + 1] = 119.541 - y + .344 * e + .714 * X;
                                D[n + 2] = 481.816 - y - 1.772 * e
                            }
                            return D
                        },
                        U: function J(D) {
                            var y, e, X, n, k = 0;
                            for (var P = 0, A = D.length; P < A; P += 4) {
                                y = D[P];
                                e = D[P + 1];
                                X = D[P + 2];
                                n = D[P + 3];
                                D[k++] = 255 + y * (-6747147073602441e-20 * y + .0008379262121013727 * e + .0002894718188643294 * X + .003264231057537806 * n - 1.1185611867203937) + e * (26374107616089404e-21 * e - 8626949158638572e-20 * X - .0002748769067499491 * n - .02155688794978967) + X * (-3878099212869363e-20 * X - .0003267808279485286 * n + .0686742238595345) - n * (.0003361971776183937 * n + .7430659151342254);
                                D[k++] = 255 + y * (.00013596372813588848 * y + .000924537132573585 * e + .00010567359618683593 * X + .0004791864687436512 * n - .3109689587515875) + e * (-.00023545346108370344 * e + .0002702845253534714 * X + .0020200308977307156 * n - .7488052167015494) + X * (6834815998235662e-20 * X + .00015168452363460973 * n - .09751927774728933) - n * (.0003189131175883281 * n + .7364883807733168);
                                D[k++] = 255 + y * (13598650411385308e-21 * y + .00012423956175490851 * e + .0004751985097583589 * X - 36729317476630424e-22 * n - .05562186980264034) + e * (.00016141380598724676 * e + .0009692239130725186 * X + .0007782692450036253 * n - .44015232367526463) + X * (5.068882914068769e-7 * X + .0017778369011375071 * n - .7591454649749609) - n * (.0003435319965105553 * n + .7063770186160144)
                            }
                            return D.subarray(0, k)
                        },
                        getData: function(D) {
                            var y = D.width,
                                e = D.height,
                                X = D.forceRGB,
                                n = D.isSourcePDF;
                            if (this.p > 4) {
                                throw new c("Unsupported color mode")
                            }
                            var k = this.Y(y, e, n);
                            if (this.p === 1 && X) {
                                var P = k.length,
                                    A = new Uint8ClampedArray(P * 3),
                                    z = 0;
                                for (var o = 0; o < P; o++) {
                                    var t = k[o];
                                    A[z++] = t;
                                    A[z++] = t;
                                    A[z++] = t
                                }
                                return A
                            } else if (this.p === 3 && this.f) {
                                return this.z(k)
                            } else if (this.p === 4) {
                                if (this.f) {
                                    if (X) {
                                        return this.O(k)
                                    }
                                    return this.r(k)
                                } else if (X) {
                                    return this.U(k)
                                }
                            }
                            return k
                        }
                    };
                    return V
                }();

            function p(F, a) {
                return F[a] << 24 >> 24
            }

            function Z(F, a) {
                return F[a] << 8 | F[a + 1]
            }

            function N(F, a) {
                return (F[a] << 24 | F[a + 1] << 16 | F[a + 2] << 8 | F[a + 3]) >>> 0
            }
            b.JpegDecoder = V
        }());
        b.encodeImage = function(c, V, C, g) {
            var Z = {
                t256: [V],
                t257: [C],
                t258: [8, 8, 8, 8],
                t259: [1],
                t262: [2],
                t273: [1e3],
                t277: [4],
                t278: [C],
                t279: [V * C * 4],
                t282: [
                    [72, 1]
                ],
                t283: [
                    [72, 1]
                ],
                t284: [1],
                t286: [
                    [0, 1]
                ],
                t287: [
                    [0, 1]
                ],
                t296: [1],
                t305: ["Photopea (UTIF.js)"],
                t338: [1]
            };
            if (g)
                for (var N in g) Z[N] = g[N];
            var F = new Uint8Array(b.encode([Z])),
                a = new Uint8Array(c),
                q = new Uint8Array(1e3 + V * C * 4);
            for (var N = 0; N < F.length; N++) q[N] = F[N];
            for (var N = 0; N < a.length; N++) q[1e3 + N] = a[N];
            return q.buffer
        };
        b.encode = function(c) {
            var V = !1,
                C = new Uint8Array(2e4),
                g = 4,
                p = V ? b._binLE : b._binBE,
                Z = 8;
            C[0] = C[1] = V ? 73 : 77;
            p.writeUshort(C, 2, 42);
            p.writeUint(C, g, Z);
            g += 4;
            for (var N = 0; N < c.length; N++) {
                var F = b._writeIFD(p, b._types.basic, C, Z, c[N]);
                Z = F[1];
                if (N < c.length - 1) {
                    if ((Z & 3) != 0) Z += 4 - (Z & 3);
                    p.writeUint(C, F[0], Z)
                }
            }
            return C.slice(0, Z).buffer
        };
        b.decode = function(c, V) {
            if (V == null) V = {
                parseMN: !0,
                debug: !1
            };
            var C = new Uint8Array(c),
                g = 0,
                p = b._binBE.readASCII(C, g, 2);
            g += 2;
            var Z = p == "II" ? b._binLE : b._binBE,
                N = Z.readUshort(C, g);
            g += 2;
            var F = Z.readUint(C, g);
            g += 4;
            var a = [];
            while (!0) {
                var q = Z.readUshort(C, F),
                    R = Z.readUshort(C, F + 4);
                if (q != 0)
                    if (R < 1 || 13 < R) {
                        az("error in TIFF");
                        break
                    }
                b._readIFD(Z, C, F, a, 0, V);
                F = Z.readUint(C, F + 2 + q * 12);
                if (F == 0) break
            }
            return a
        };
        b.decodeImage = function(c, V, C) {
            if (V.data) return;
            var g = new Uint8Array(c),
                p = b._binBE.readASCII(g, 0, 2),
                i = 0;
            if (V.t256 == null) return;
            V.isLE = p == "II";
            V.width = V.t256[0];
            V.height = V.t257[0];
            var Z = V.t259 ? V.t259[0] : 1,
                N = V.t266 ? V.t266[0] : 1;
            if (V.t284 && V.t284[0] == 2) az("PlanarConfiguration 2 should not be used!");
            if (Z == 7 && V.t258 && V.t258.length > 3) V.t258 = V.t258.slice(0, 3);
            var F = V.t277 ? V.t277[0] : 1,
                a = V.t258 ? V.t258[0] : 1,
                q = a * F;
            if (Z == 1 && V.t279 != null && V.t278 && V.t262[0] == 32803) {
                q = Math.round(V.t279[0] * 8 / (V.width * V.t278[0]))
            }
            if (V.t50885 && V.t50885[0] == 4) q = V.t258[0] * 3;
            var R = Math.ceil(V.width * q / 8) * 8,
                d = V.t273;
            if (d == null || V.t322) d = V.t324;
            var Q = V.t279;
            if (Z == 1 && d.length == 1) Q = [V.height * (R >>> 3)];
            if (Q == null || V.t322) Q = V.t325;
            var T = new Uint8Array(V.height * (R >>> 3));
            if (V.t322 != null) {
                var _ = V.t322[0],
                    W = V.t323[0],
                    E = Math.floor((V.width + _ - 1) / _),
                    G = Math.floor((V.height + W - 1) / W),
                    r = new Uint8Array(Math.ceil(_ * W * q / 8) | 0);
                console.log("====", E, G);
                for (var j = 0; j < G; j++)
                    for (var l = 0; l < E; l++) {
                        var v = j * E + l;
                        r.fill(0);
                        b.decode._decompress(V, C, g, d[v], Q[v], Z, r, 0, N);
                        if (Z == 6) T = r;
                        else b._copyTile(r, Math.ceil(_ * q / 8) | 0, W, T, Math.ceil(V.width * q / 8) | 0, V.height, Math.ceil(l * _ * q / 8) | 0, j * W)
                    }
                i = T.length * 8
            } else {
                if (d == null) return;
                var L = V.t278 ? V.t278[0] : V.height;
                L = Math.min(L, V.height);
                console.log("====", V.width, L);
                for (var v = 0; v < d.length; v++) {
                    b.decode._decompress(V, C, g, d[v], Q[v], Z, T, Math.ceil(i / 8) | 0, N);
                    i += R * L
                }
                i = Math.min(i, T.length * 8)
            }
            V.data = new Uint8Array(T.buffer, 0, Math.ceil(i / 8) | 0)
        };
        b.decode._decompress = function(c, V, C, g, p, Z, N, F, a) {
            if (c.t271 && c.t271[0] == "Panasonic" && c.t45 && c.t45[0] == 6) Z = 34316;
            if (!1) {} else if (Z == 1)
                for (var q = 0; q < p; q++) N[F + q] = C[g + q];
            else if (Z == 2) b.decode._decodeG2(C, g, p, N, F, c.width, a);
            else if (Z == 3) b.decode._decodeG3(C, g, p, N, F, c.width, a, c.t292 ? (c.t292[0] & 1) == 1 : !1);
            else if (Z == 4) b.decode._decodeG4(C, g, p, N, F, c.width, a);
            else if (Z == 5) b.decode._decodeLZW(C, g, p, N, F, 8);
            else if (Z == 6) b.decode._decodeOldJPEG(c, C, g, p, N, F);
            else if (Z == 7 || Z == 34892) b.decode._decodeNewJPEG(c, C, g, p, N, F);
            else if (Z == 8 || Z == 32946) {
                var R = new Uint8Array(C.buffer, g + 2, p - 6),
                    d = bb.inflateRaw(R);
                N.set(d, F)
            } else if (Z == 9) b.decode._decodeVC5(C, g, p, N, F, c.t33422);
            else if (Z == 32767) b.decode._decodeARW(c, C, g, p, N, F);
            else if (Z == 32773) b.decode._decodePackBits(C, g, p, N, F);
            else if (Z == 32809) b.decode._decodeThunder(C, g, p, N, F);
            else if (Z == 34316) b.decode._decodePanasonic(c, C, g, p, N, F);
            else if (Z == 34713) b.decode._decodeNikon(c, V, C, g, p, N, F);
            else if (Z == 34676) b.decode._decodeLogLuv32(c, C, g, p, N, F);
            else az("Unknown compression", Z);
            var Q = c.t258 ? Math.min(32, c.t258[0]) : 1,
                T = c.t277 ? c.t277[0] : 1,
                i = Q * T >>> 3,
                _ = c.t278 ? c.t278[0] : c.height,
                W = Math.ceil(Q * T * c.width / 8);
            if (Q == 16 && !c.isLE && c.t33422 == null)
                for (var E = 0; E < _; E++) {
                    var G = F + E * W;
                    for (var r = 1; r < W; r += 2) {
                        var l = N[G + r];
                        N[G + r] = N[G + r - 1];
                        N[G + r - 1] = l
                    }
                }
            if (c.t317 && c.t317[0] == 2) {
                for (var E = 0; E < _; E++) {
                    var v = F + E * W;
                    if (Q == 16)
                        for (var q = i; q < W; q += 2) {
                            var L = (N[v + q + 1] << 8 | N[v + q]) + (N[v + q - i + 1] << 8 | N[v + q - i]);
                            N[v + q] = L & 255;
                            N[v + q + 1] = L >>> 8 & 255
                        } else if (T == 3)
                            for (var q = 3; q < W; q += 3) {
                                N[v + q] = N[v + q] + N[v + q - 3] & 255;
                                N[v + q + 1] = N[v + q + 1] + N[v + q - 2] & 255;
                                N[v + q + 2] = N[v + q + 2] + N[v + q - 1] & 255
                            } else
                                for (var q = i; q < W; q++) N[v + q] = N[v + q] + N[v + q - i] & 255
                }
            }
        };
        b.decode._decodePanasonic = function(c, V, C, g, p, Z) {
            var N = V.buffer,
                F = c.t2[0],
                a = c.t3[0],
                q = c.t10[0],
                R = c.t45[0],
                d = 0,
                Q = 0,
                T = 0,
                i = 0,
                _, W, E = R == 6 ? new Uint32Array(18) : new Uint8Array(16),
                G, r, j, M = [0, 0],
                l = [0, 0],
                v, L = 0,
                u, I, J, D, y = new Uint8Array(16384),
                e = new Uint16Array(p.buffer);

            function X(aS) {
                if (T == 0) {
                    var _ = new Uint8Array(N, C + Q + 8184, 16384 - 8184),
                        W = new Uint8Array(N, C + Q, 8184);
                    y.set(_);
                    y.set(W, _.length);
                    Q += 16384
                }
                if (R == 5) {
                    for (G = 0; G < 16; G++) {
                        E[G] = y[T++];
                        T &= 16383
                    }
                } else {
                    T = T - aS & 131071;
                    i = T >> 3 ^ 16368;
                    return (y[i] | y[i + 1] << 8) >> (T & 7) & ~(-1 << aS)
                }
            }

            function n(G) {
                return y[T + 15 - G]
            }

            function k() {
                E[0] = n(0) << 6 | n(1) >> 2;
                E[1] = ((n(1) & 3) << 12 | n(2) << 4 | n(3) >> 4) & 16383;
                E[2] = n(3) >> 2 & 3;
                E[3] = (n(3) & 3) << 8 | n(4);
                E[4] = n(5) << 2 | n(6) >> 6;
                E[5] = (n(6) & 63) << 4 | n(7) >> 4;
                E[6] = n(7) >> 2 & 3;
                E[7] = (n(7) & 3) << 8 | n(8);
                E[8] = n(9) << 2 & 1020 | n(10) >> 6;
                E[9] = (n(10) << 4 | n(11) >> 4) & 1023;
                E[10] = n(11) >> 2 & 3;
                E[11] = (n(11) & 3) << 8 | n(12);
                E[12] = (n(13) << 2 & 1020 | n(14) >> 6) & 1023;
                E[13] = (n(14) << 4 | n(15) >> 4) & 1023;
                T += 16;
                i = 0
            }

            function P() {
                E[0] = n(0) << 4 | n(1) >> 4;
                E[1] = ((n(1) & 15) << 8 | n(2)) & 4095;
                E[2] = n(3) >> 6 & 3;
                E[3] = (n(3) & 63) << 2 | n(4) >> 6;
                E[4] = (n(4) & 63) << 2 | n(5) >> 6;
                E[5] = (n(5) & 63) << 2 | n(6) >> 6;
                E[6] = n(6) >> 4 & 3;
                E[7] = (n(6) & 15) << 4 | n(7) >> 4;
                E[8] = (n(7) & 15) << 4 | n(8) >> 4;
                E[9] = (n(8) & 15) << 4 | n(9) >> 4;
                E[10] = n(9) >> 2 & 3;
                E[11] = (n(9) & 3) << 6 | n(10) >> 2;
                E[12] = (n(10) & 3) << 6 | n(11) >> 2;
                E[13] = (n(11) & 3) << 6 | n(12) >> 2;
                E[14] = n(12) & 3;
                E[15] = n(13);
                E[16] = n(14);
                E[17] = n(15);
                T += 16;
                i = 0
            }

            function A() {
                M[0] = 0;
                M[1] = 0;
                l[0] = 0;
                l[1] = 0
            }
            if (R == 7) {
                throw R
            } else if (R == 6) {
                var z = q == 12,
                    o = z ? P : k,
                    t = z ? 14 : 11,
                    a5 = z ? 128 : 512,
                    S = z ? 2048 : 8192,
                    U = z ? 16383 : 65535,
                    ah = z ? 4095 : 16383,
                    aB = F / t,
                    B = aB * 16,
                    aQ = z ? 18 : 14;
                for (I = 0; I < a - 15; I += 16) {
                    var $ = Math.min(16, a - I),
                        s = B * $;
                    y = new Uint8Array(N, C + d, s);
                    T = 0;
                    d += s;
                    for (D = 0, J = 0; D < $; D++, J = 0) {
                        L = (I + D) * F;
                        for (var aZ = 0; aZ < aB; aZ++) {
                            o();
                            A();
                            j = 0;
                            u = 0;
                            for (G = 0; G < t; G++) {
                                v = G & 1;
                                if (G % 3 == 2) {
                                    var x = i < aQ ? E[i++] : 0;
                                    if (x == 3) x = 4;
                                    u = a5 << x;
                                    j = 1 << x
                                }
                                var a0 = i < aQ ? E[i++] : 0;
                                if (M[v]) {
                                    a0 *= j;
                                    if (u < S && l[v] > u) a0 += l[v] - u;
                                    l[v] = a0
                                } else {
                                    M[v] = a0;
                                    if (a0) l[v] = a0;
                                    else a0 = l[v]
                                }
                                e[L + J++] = a0 - 15 <= U ? a0 - 15 & U : a0 + 2147483633 >> 31 & ah
                            }
                        }
                    }
                }
            } else if (R == 5) {
                var aV = q == 12 ? 10 : 9;
                for (I = 0; I < a; I++) {
                    for (J = 0; J < F; J += aV) {
                        X(0);
                        if (q == 12) {
                            e[L++] = ((E[1] & 15) << 8) + E[0];
                            e[L++] = 16 * E[2] + (E[1] >> 4);
                            e[L++] = ((E[4] & 15) << 8) + E[3];
                            e[L++] = 16 * E[5] + (E[4] >> 4);
                            e[L++] = ((E[7] & 15) << 8) + E[6];
                            e[L++] = 16 * E[8] + (E[7] >> 4);
                            e[L++] = ((E[10] & 15) << 8) + E[9];
                            e[L++] = 16 * E[11] + (E[10] >> 4);
                            e[L++] = ((E[13] & 15) << 8) + E[12];
                            e[L++] = 16 * E[14] + (E[13] >> 4)
                        } else if (q == 14) {
                            e[L++] = E[0] + ((E[1] & 63) << 8);
                            e[L++] = (E[1] >> 6) + 4 * E[2] + ((E[3] & 15) << 10);
                            e[L++] = (E[3] >> 4) + 16 * E[4] + ((E[5] & 3) << 12);
                            e[L++] = ((E[5] & 252) >> 2) + (E[6] << 6);
                            e[L++] = E[7] + ((E[8] & 63) << 8);
                            e[L++] = (E[8] >> 6) + 4 * E[9] + ((E[10] & 15) << 10);
                            e[L++] = (E[10] >> 4) + 16 * E[11] + ((E[12] & 3) << 12);
                            e[L++] = ((E[12] & 252) >> 2) + (E[13] << 6);
                            e[L++] = E[14] + ((E[15] & 63) << 8)
                        }
                    }
                }
            } else if (R == 4) {
                for (I = 0; I < a; I++) {
                    for (J = 0; J < F; J++) {
                        G = J % 14;
                        v = G & 1;
                        if (G == 0) A();
                        if (G % 3 == 2) j = 4 >> 3 - X(2);
                        if (l[v]) {
                            r = X(8);
                            if (r != 0) {
                                M[v] -= 128 << j;
                                if (M[v] < 0 || j == 4) M[v] &= ~(-1 << j);
                                M[v] += r << j
                            }
                        } else {
                            l[v] = X(8);
                            if (l[v] || G > 11) M[v] = l[v] << 4 | X(4)
                        }
                        e[L++] = M[J & 1]
                    }
                }
            } else throw R
        };
        b.decode._decodeVC5 = function() {
            var c = [1, 0, 1, 0, 2, 2, 1, 1, 3, 7, 1, 2, 5, 25, 1, 3, 6, 48, 1, 4, 6, 54, 1, 5, 7, 111, 1, 8, 7, 99, 1, 6, 7, 105, 12, 0, 7, 107, 1, 7, 8, 209, 20, 0, 8, 212, 1, 9, 8, 220, 1, 10, 9, 393, 1, 11, 9, 394, 32, 0, 9, 416, 1, 12, 9, 427, 1, 13, 10, 887, 1, 18, 10, 784, 1, 14, 10, 790, 1, 15, 10, 835, 60, 0, 10, 852, 1, 16, 10, 885, 1, 17, 11, 1571, 1, 19, 11, 1668, 1, 20, 11, 1669, 100, 0, 11, 1707, 1, 21, 11, 1772, 1, 22, 12, 3547, 1, 29, 12, 3164, 1, 24, 12, 3166, 1, 25, 12, 3140, 1, 23, 12, 3413, 1, 26, 12, 3537, 1, 27, 12, 3539, 1, 28, 13, 7093, 1, 35, 13, 6283, 1, 30, 13, 6331, 1, 31, 13, 6335, 180, 0, 13, 6824, 1, 32, 13, 7072, 1, 33, 13, 7077, 320, 0, 13, 7076, 1, 34, 14, 12565, 1, 36, 14, 12661, 1, 37, 14, 12669, 1, 38, 14, 13651, 1, 39, 14, 14184, 1, 40, 15, 28295, 1, 46, 15, 28371, 1, 47, 15, 25320, 1, 42, 15, 25336, 1, 43, 15, 25128, 1, 41, 15, 27300, 1, 44, 15, 28293, 1, 45, 16, 50259, 1, 48, 16, 50643, 1, 49, 16, 50675, 1, 50, 16, 56740, 1, 53, 16, 56584, 1, 51, 16, 56588, 1, 52, 17, 113483, 1, 61, 17, 113482, 1, 60, 17, 101285, 1, 55, 17, 101349, 1, 56, 17, 109205, 1, 57, 17, 109207, 1, 58, 17, 100516, 1, 54, 17, 113171, 1, 59, 18, 202568, 1, 62, 18, 202696, 1, 63, 18, 218408, 1, 64, 18, 218412, 1, 65, 18, 226340, 1, 66, 18, 226356, 1, 67, 18, 226358, 1, 68, 19, 402068, 1, 69, 19, 405138, 1, 70, 19, 405394, 1, 71, 19, 436818, 1, 72, 19, 436826, 1, 73, 19, 452714, 1, 75, 19, 452718, 1, 76, 19, 452682, 1, 74, 20, 804138, 1, 77, 20, 810279, 1, 78, 20, 810790, 1, 79, 20, 873638, 1, 80, 20, 873654, 1, 81, 20, 905366, 1, 82, 20, 905430, 1, 83, 20, 905438, 1, 84, 21, 1608278, 1, 85, 21, 1620557, 1, 86, 21, 1621582, 1, 87, 21, 1621583, 1, 88, 21, 1747310, 1, 89, 21, 1810734, 1, 90, 21, 1810735, 1, 91, 21, 1810863, 1, 92, 21, 1810879, 1, 93, 22, 3621725, 1, 99, 22, 3621757, 1, 100, 22, 3241112, 1, 94, 22, 3494556, 1, 95, 22, 3494557, 1, 96, 22, 3494622, 1, 97, 22, 3494623, 1, 98, 23, 6482227, 1, 102, 23, 6433117, 1, 101, 23, 6989117, 1, 103, 23, 6989119, 1, 105, 23, 6989118, 1, 104, 23, 7243449, 1, 106, 23, 7243512, 1, 107, 24, 13978233, 1, 111, 24, 12964453, 1, 109, 24, 12866232, 1, 108, 24, 14486897, 1, 113, 24, 13978232, 1, 110, 24, 14486896, 1, 112, 24, 14487026, 1, 114, 24, 14487027, 1, 115, 25, 25732598, 1, 225, 25, 25732597, 1, 189, 25, 25732596, 1, 188, 25, 25732595, 1, 203, 25, 25732594, 1, 202, 25, 25732593, 1, 197, 25, 25732592, 1, 207, 25, 25732591, 1, 169, 25, 25732590, 1, 223, 25, 25732589, 1, 159, 25, 25732522, 1, 235, 25, 25732579, 1, 152, 25, 25732575, 1, 192, 25, 25732489, 1, 179, 25, 25732573, 1, 201, 25, 25732472, 1, 172, 25, 25732576, 1, 149, 25, 25732488, 1, 178, 25, 25732566, 1, 120, 25, 25732571, 1, 219, 25, 25732577, 1, 150, 25, 25732487, 1, 127, 25, 25732506, 1, 211, 25, 25732548, 1, 125, 25, 25732588, 1, 158, 25, 25732486, 1, 247, 25, 25732467, 1, 238, 25, 25732508, 1, 163, 25, 25732552, 1, 228, 25, 25732603, 1, 183, 25, 25732513, 1, 217, 25, 25732587, 1, 168, 25, 25732520, 1, 122, 25, 25732484, 1, 128, 25, 25732562, 1, 249, 25, 25732505, 1, 187, 25, 25732504, 1, 186, 25, 25732483, 1, 136, 25, 25928905, 1, 181, 25, 25732560, 1, 255, 25, 25732500, 1, 230, 25, 25732482, 1, 135, 25, 25732555, 1, 233, 25, 25732568, 1, 222, 25, 25732583, 1, 145, 25, 25732481, 1, 134, 25, 25732586, 1, 167, 25, 25732521, 1, 248, 25, 25732518, 1, 209, 25, 25732480, 1, 243, 25, 25732512, 1, 216, 25, 25732509, 1, 164, 25, 25732547, 1, 140, 25, 25732479, 1, 157, 25, 25732544, 1, 239, 25, 25732574, 1, 191, 25, 25732564, 1, 251, 25, 25732478, 1, 156, 25, 25732546, 1, 139, 25, 25732498, 1, 242, 25, 25732557, 1, 133, 25, 25732477, 1, 162, 25, 25732515, 1, 213, 25, 25732584, 1, 165, 25, 25732514, 1, 212, 25, 25732476, 1, 227, 25, 25732494, 1, 198, 25, 25732531, 1, 236, 25, 25732530, 1, 234, 25, 25732529, 1, 117, 25, 25732528, 1, 215, 25, 25732527, 1, 124, 25, 25732526, 1, 123, 25, 25732525, 1, 254, 25, 25732524, 1, 253, 25, 25732523, 1, 148, 25, 25732570, 1, 218, 25, 25732580, 1, 146, 25, 25732581, 1, 147, 25, 25732569, 1, 224, 25, 25732533, 1, 143, 25, 25732540, 1, 184, 25, 25732541, 1, 185, 25, 25732585, 1, 166, 25, 25732556, 1, 132, 25, 25732485, 1, 129, 25, 25732563, 1, 250, 25, 25732578, 1, 151, 25, 25732501, 1, 119, 25, 25732502, 1, 193, 25, 25732536, 1, 176, 25, 25732496, 1, 245, 25, 25732553, 1, 229, 25, 25732516, 1, 206, 25, 25732582, 1, 144, 25, 25732517, 1, 208, 25, 25732558, 1, 137, 25, 25732543, 1, 241, 25, 25732466, 1, 237, 25, 25732507, 1, 190, 25, 25732542, 1, 240, 25, 25732551, 1, 131, 25, 25732554, 1, 232, 25, 25732565, 1, 252, 25, 25732475, 1, 171, 25, 25732493, 1, 205, 25, 25732492, 1, 204, 25, 25732491, 1, 118, 25, 25732490, 1, 214, 25, 25928904, 1, 180, 25, 25732549, 1, 126, 25, 25732602, 1, 182, 25, 25732539, 1, 175, 25, 25732545, 1, 141, 25, 25732559, 1, 138, 25, 25732537, 1, 177, 25, 25732534, 1, 153, 25, 25732503, 1, 194, 25, 25732606, 1, 160, 25, 25732567, 1, 121, 25, 25732538, 1, 174, 25, 25732497, 1, 246, 25, 25732550, 1, 130, 25, 25732572, 1, 200, 25, 25732474, 1, 170, 25, 25732511, 1, 221, 25, 25732601, 1, 196, 25, 25732532, 1, 142, 25, 25732519, 1, 210, 25, 25732495, 1, 199, 25, 25732605, 1, 155, 25, 25732535, 1, 154, 25, 25732499, 1, 244, 25, 25732510, 1, 220, 25, 25732600, 1, 195, 25, 25732607, 1, 161, 25, 25732604, 1, 231, 25, 25732473, 1, 173, 25, 25732599, 1, 226, 26, 51465122, 1, 116, 26, 51465123, 0, 1],
                V, C, g, p = [3, 3, 3, 3, 2, 2, 2, 1, 1, 1],
                Z = 24576,
                N = 16384,
                a = 8192,
                q = N | a;

            function R(l) {
                var L = l[1],
                    I = l[0][L >>> 3] >>> 7 - (L & 7) & 1;
                l[1]++;
                return I
            }

            function Q(l, L) {
                if (V == null) {
                    V = {};
                    for (var I = 0; I < c.length; I += 4) V[c[I + 1]] = c.slice(I, I + 4)
                }
                var D = R(l),
                    y = V[D];
                while (y == null) {
                    D = D << 1 | R(l);
                    y = V[D]
                }
                var X = y[3];
                if (X != 0) X = R(l) == 0 ? X : -X;
                L[0] = y[2];
                L[1] = X
            }

            function T(l, L) {
                for (var I = 0; I < L; I++) {
                    if ((l & 1) == 1) l++;
                    l = l >>> 1
                }
                return l
            }

            function i(l, L) {
                return l >> L
            }

            function _(l, L, I, D, y, X) {
                L[I] = i(i(11 * l[y] - 4 * l[y + X] + l[y + X + X] + 4, 3) + l[D], 1);
                L[I + X] = i(i(5 * l[y] + 4 * l[y + X] - l[y + X + X] + 4, 3) - l[D], 1)
            }

            function W(l, L, I, D, y, X) {
                var k = l[y - X] - l[y + X],
                    A = l[y],
                    z = l[D];
                L[I] = i(i(k + 4, 3) + A + z, 1);
                L[I + X] = i(i(-k + 4, 3) + A - z, 1)
            }

            function E(l, L, I, D, y, X) {
                L[I] = i(i(5 * l[y] + 4 * l[y - X] - l[y - X - X] + 4, 3) + l[D], 1);
                L[I + X] = i(i(11 * l[y] - 4 * l[y - X] + l[y - X - X] + 4, 3) - l[D], 1)
            }

            function G(l) {
                l = l < 0 ? 0 : l > 4095 ? 4095 : l;
                l = g[l] >>> 2;
                return l
            }

            function r(l, L, I, D, y, X) {
                D = new Uint16Array(D.buffer);
                var k = Date.now(),
                    A = b._binBE,
                    z = L + I,
                    a5, S, U, ah, aB, s, aZ, x, aV, aS, aK, Y, ao, K, aa, a2, aG, f;
                L += 4;
                var aU = X[0] == 1;
                while (L < z) {
                    var O = A.readShort(l, L),
                        w = A.readUshort(l, L + 2);
                    L += 4;
                    if (O == 12) a5 = w;
                    else if (O == 20) S = w;
                    else if (O == 21) U = w;
                    else if (O == 48) ah = w;
                    else if (O == 53) aB = w;
                    else if (O == 35) s = w;
                    else if (O == 62) aZ = w;
                    else if (O == 101) x = w;
                    else if (O == 109) aV = w;
                    else if (O == 84) aS = w;
                    else if (O == 106) aK = w;
                    else if (O == 107) Y = w;
                    else if (O == 108) ao = w;
                    else if (O == 102) K = w;
                    else if (O == 104) aa = w;
                    else if (O == 105) a2 = w;
                    else {
                        var ab = O < 0 ? -O : O,
                            ar = ab & 65280,
                            a1 = 0;
                        if (ab & q) {
                            if (ab & a) {
                                a1 = w & 65535;
                                a1 += (ab & 255) << 16
                            } else {
                                a1 = w & 65535
                            }
                        }
                        if ((ab & Z) == Z) {
                            if (aG == null) {
                                aG = [];
                                for (var aw = 0; aw < 4; aw++) aG[aw] = new Int16Array((S >>> 1) * (U >>> 1));
                                f = new Int16Array((S >>> 1) * (U >>> 1));
                                C = new Int16Array(1024);
                                for (var aw = 0; aw < 1024; aw++) {
                                    var a6 = aw - 512,
                                        as = Math.abs(a6),
                                        a5 = Math.floor(768 * as * as * as / (255 * 255 * 255)) + as;
                                    C[aw] = Math.sign(a6) * a5
                                }
                                g = new Uint16Array(4096);
                                var ae = (1 << 16) - 1;
                                for (var aw = 0; aw < 4096; aw++) {
                                    var ai = aw,
                                        b6 = ae * (Math.pow(113, ai / 4095) - 1) / 112;
                                    g[aw] = Math.min(b6, ae)
                                }
                            }
                            var aT = aG[aZ],
                                b0 = T(S, 1 + p[ah]),
                                ad = T(U, 1 + p[ah]);
                            if (ah == 0) {
                                for (var ak = 0; ak < ad; ak++)
                                    for (var H = 0; H < b0; H++) {
                                        var a$ = L + (ak * b0 + H) * 2;
                                        aT[ak * (S >>> 1) + H] = l[a$] << 8 | l[a$ + 1]
                                    }
                            } else {
                                var aY = [l, L * 8],
                                    a8 = [],
                                    b5 = 0,
                                    at = b0 * ad,
                                    aR = [0, 0],
                                    aC = 0,
                                    w = 0;
                                while (b5 < at) {
                                    Q(aY, aR);
                                    aC = aR[0];
                                    w = aR[1];
                                    while (aC > 0) {
                                        a8[b5++] = w;
                                        aC--
                                    }
                                }
                                var bc = (ah - 1) % 3,
                                    ax = bc != 1 ? b0 : 0,
                                    aj = bc != 0 ? ad : 0;
                                for (var ak = 0; ak < ad; ak++) {
                                    var aX = (ak + aj) * (S >>> 1) + ax,
                                        af = ak * b0;
                                    for (var H = 0; H < b0; H++) aT[aX + H] = C[a8[af + H] + 512] * aB
                                }
                                if (bc == 2) {
                                    var aa = S >>> 1,
                                        aH = b0 * 2,
                                        an = ad * 2;
                                    for (var ak = 0; ak < ad; ak++) {
                                        for (var H = 0; H < aH; H++) {
                                            var aw = ak * 2 * aa + H,
                                                a9 = ak * aa + H,
                                                b3 = ad * aa + a9;
                                            if (ak == 0) _(aT, f, aw, b3, a9, aa);
                                            else if (ak == ad - 1) E(aT, f, aw, b3, a9, aa);
                                            else W(aT, f, aw, b3, a9, aa)
                                        }
                                    }
                                    var a7 = aT;
                                    aT = f;
                                    f = a7;
                                    for (var ak = 0; ak < an; ak++) {
                                        for (var H = 0; H < b0; H++) {
                                            var aw = ak * aa + 2 * H,
                                                a9 = ak * aa + H,
                                                b3 = b0 + a9;
                                            if (H == 0) _(aT, f, aw, b3, a9, 1);
                                            else if (H == b0 - 1) E(aT, f, aw, b3, a9, 1);
                                            else W(aT, f, aw, b3, a9, 1)
                                        }
                                    }
                                    var a7 = aT;
                                    aT = f;
                                    f = a7;
                                    var a4 = [],
                                        au = 2 - ~~((ah - 1) / 3);
                                    for (var al = 0; al < 3; al++) a4[al] = aV >> 14 - al * 2 & 3;
                                    var aE = a4[au];
                                    if (aE != 0)
                                        for (var ak = 0; ak < an; ak++)
                                            for (var H = 0; H < aH; H++) {
                                                var aw = ak * aa + H;
                                                aT[aw] = aT[aw] << aE
                                            }
                                }
                            }
                            if (ah == 9 && aZ == 3) {
                                var a_ = aG[0],
                                    aW = aG[1],
                                    a3 = aG[2],
                                    ag = aG[3];
                                for (var ak = 0; ak < U; ak += 2)
                                    for (var H = 0; H < S; H += 2) {
                                        var b2 = ak * S + H,
                                            a$ = (ak >>> 1) * (S >>> 1) + (H >>> 1),
                                            ap = a_[a$],
                                            av = aW[a$] - 2048,
                                            aq = a3[a$] - 2048,
                                            b9 = ag[a$] - 2048,
                                            am = (av << 1) + ap,
                                            ac = (aq << 1) + ap,
                                            b8 = ap + b9,
                                            aN = ap - b9;
                                        if (aU) {
                                            D[b2] = G(b8);
                                            D[b2 + 1] = G(ac);
                                            D[b2 + S] = G(am);
                                            D[b2 + S + 1] = G(aN)
                                        } else {
                                            D[b2] = G(am);
                                            D[b2 + 1] = G(b8);
                                            D[b2 + S] = G(aN);
                                            D[b2 + S + 1] = G(ac)
                                        }
                                    }
                            }
                            L += a1 * 4
                        } else if (ab == 16388) {
                            L += a1 * 4
                        } else if (ar == 8192 || ar == 8448 || ar == 9216) {} else throw ab.toString(16)
                    }
                }
                console.log(Date.now() - k)
            }
            return r
        }();
        b.decode._decodeLogLuv32 = function(c, V, C, g, p, Z) {
            var N = c.width,
                F = N * 4,
                a = 0,
                q = new Uint8Array(F);
            while (a < g) {
                var R = 0;
                while (R < F) {
                    var d = V[C + a];
                    a++;
                    if (d < 128) {
                        for (var Q = 0; Q < d; Q++) q[R + Q] = V[C + a + Q];
                        R += d;
                        a += d
                    } else {
                        d = d - 126;
                        for (var Q = 0; Q < d; Q++) q[R + Q] = V[C + a];
                        R += d;
                        a++
                    }
                }
                for (var T = 0; T < N; T++) {
                    p[Z + 0] = q[T];
                    p[Z + 1] = q[T + N];
                    p[Z + 2] = q[T + N * 2];
                    p[Z + 4] = q[T + N * 3];
                    Z += 6
                }
            }
        };
        b.decode._ljpeg_diff = function(c, V, C) {
            var g = b.decode._getbithuff,
                p, Z;
            p = g(c, V, C[0], C);
            Z = g(c, V, p, 0);
            if ((Z & 1 << p - 1) == 0) Z -= (1 << p) - 1;
            return Z
        };
        b.decode._decodeARW = function(c, V, C, g, p, Z) {
            var N = c.t256[0],
                F = c.t257[0],
                a = c.t258[0],
                q = c.isLE ? b._binLE : b._binBE,
                R = N * F == g || N * F * 1.5 == g,
                G, E, J, D, y, e, X, n, k, i, P;
            if (!R) {
                F += 8;
                var d = [C, 0, 0, 0],
                    Q = new Uint16Array(32770),
                    T = [3857, 3856, 3599, 3342, 3085, 2828, 2571, 2314, 2057, 1800, 1543, 1286, 1029, 772, 771, 768, 514, 513],
                    i, _, W, E, G, r = 0,
                    j = b.decode._ljpeg_diff;
                Q[0] = 15;
                for (W = i = 0; i < 18; i++) {
                    var M = 32768 >>> (T[i] >>> 8);
                    for (var _ = 0; _ < M; _++) Q[++W] = T[i]
                }
                for (E = N; E--;)
                    for (G = 0; G < F + 1; G += 2) {
                        if (G == F) G = 1;
                        r += j(V, d, Q);
                        if (G < F) {
                            var l = r & 4095;
                            b.decode._putsF(p, (G * N + E) * a, l << 16 - a)
                        }
                    }
                return
            }
            if (N * F * 1.5 == g) {
                for (var i = 0; i < g; i += 3) {
                    var v = V[C + i + 0],
                        L = V[C + i + 1],
                        u = V[C + i + 2];
                    p[Z + i] = L << 4 | v >>> 4;
                    p[Z + i + 1] = v << 4 | u >>> 4;
                    p[Z + i + 2] = u << 4 | L >>> 4
                }
                return
            }
            var I = new Uint16Array(16),
                A = new Uint8Array(N + 1);
            for (G = 0; G < F; G++) {
                for (var z = 0; z < N; z++) A[z] = V[C++];
                for (P = 0, E = 0; E < N - 30; P += 16) {
                    D = 2047 & (J = q.readUint(A, P));
                    y = 2047 & J >>> 11;
                    e = 15 & J >>> 22;
                    X = 15 & J >>> 26;
                    for (n = 0; n < 4 && 128 << n <= D - y; n++);
                    for (k = 30, i = 0; i < 16; i++)
                        if (i == e) I[i] = D;
                        else if (i == X) I[i] = y;
                    else {
                        I[i] = ((q.readUshort(A, P + (k >> 3)) >>> (k & 7) & 127) << n) + y;
                        if (I[i] > 2047) I[i] = 2047;
                        k += 7
                    }
                    for (i = 0; i < 16; i++, E += 2) {
                        var l = I[i] << 1;
                        b.decode._putsF(p, (G * N + E) * a, l << 16 - a)
                    }
                    E -= E & 1 ? 1 : 31
                }
            }
        };
        b.decode._decodeNikon = function(c, V, C, g, p, Z, N) {
            var F = [
                    [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 5, 4, 3, 6, 2, 7, 1, 0, 8, 9, 11, 10, 12],
                    [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 57, 90, 56, 39, 22, 5, 4, 3, 2, 1, 0, 11, 12, 12],
                    [0, 0, 1, 4, 2, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 6, 3, 7, 2, 8, 1, 9, 0, 10, 11, 12],
                    [0, 0, 1, 4, 3, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 5, 6, 4, 7, 8, 3, 9, 2, 1, 0, 10, 11, 12, 13, 14],
                    [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 8, 92, 75, 58, 41, 7, 6, 5, 4, 3, 2, 1, 0, 13, 14],
                    [0, 0, 1, 4, 2, 2, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 6, 8, 5, 9, 4, 10, 3, 11, 12, 2, 0, 1, 13, 14]
                ],
                a = c.t256[0],
                q = c.t257[0],
                R = c.t258[0],
                d = 0,
                Q = 0,
                T = b.decode._make_decoder,
                i = b.decode._getbithuff,
                _ = V[0].exifIFD.makerNote,
                W = _.t150 ? _.t150 : _.t140,
                E = 0,
                G = W[E++],
                r = W[E++],
                u = 0,
                l, J, D, y, e, X, n = 0;
            if (G == 73 || r == 88) E += 2110;
            if (G == 70) d = 2;
            if (R == 14) d += 3;
            var j = [
                    [0, 0],
                    [0, 0]
                ],
                M = c.isLE ? b._binLE : b._binBE;
            for (var l = 0; l < 2; l++)
                for (var v = 0; v < 2; v++) {
                    j[l][v] = M.readShort(W, E);
                    E += 2
                }
            var L = 1 << R & 32767,
                I = M.readShort(W, E);
            E += 2;
            if (I > 1) u = Math.floor(L / (I - 1));
            if (G == 68 && r == 32 && u > 0) Q = M.readShort(W, 562);
            var k = [0, 0],
                P = T(F[d]),
                A = [g, 0, 0, 0];
            for (n = J = 0; J < q; J++) {
                if (Q && J == Q) {
                    P = T(F[d + 1])
                }
                for (D = 0; D < a; D++) {
                    l = i(C, A, P[0], P);
                    y = l & 15;
                    e = l >>> 4;
                    X = (i(C, A, y - e, 0) << 1) + 1 << e >>> 1;
                    if ((X & 1 << y - 1) == 0) X -= (1 << y) - (e == 0 ? 1 : 0);
                    if (D < 2) k[D] = j[J & 1][D] += X;
                    else k[D & 1] += X;
                    var z = Math.min(Math.max(k[D & 1], 0), (1 << R) - 1),
                        o = (J * a + D) * R;
                    b.decode._putsF(Z, o, z << 16 - R)
                }
            }
        };
        b.decode._putsF = function(c, V, C) {
            C = C << 8 - (V & 7);
            var g = V >>> 3;
            c[g] |= C >>> 16;
            c[g + 1] |= C >>> 8;
            c[g + 2] |= C
        };
        b.decode._getbithuff = function(c, V, C, g) {
            var p = 0,
                Z = b.decode._get_byte,
                N, F = V[0],
                a = V[1],
                q = V[2],
                R = V[3];
            if (C == 0 || q < 0) return 0;
            while (!R && q < C && (N = c[F++]) != -1 && !(R = p && N == 255 && c[F++])) {
                a = (a << 8) + N;
                q += 8
            }
            N = a << 32 - q >>> 32 - C;
            if (g) {
                q -= g[N + 1] >>> 8;
                N = g[N + 1] & 255
            } else q -= C;
            if (q < 0) throw "e";
            V[0] = F;
            V[1] = a;
            V[2] = q;
            V[3] = R;
            return N
        };
        b.decode._make_decoder = function(c) {
            var V, C, g, Z, N, F = [],
                a = 17;
            for (V = 16; V != 0 && !c[V]; V--);
            F[0] = V;
            for (g = C = 1; C <= V; C++)
                for (Z = 0; Z < c[C]; Z++, ++a)
                    for (N = 0; N < 1 << V - C; N++)
                        if (g <= 1 << V) F[g++] = C << 8 | c[a];
            return F
        };
        b.decode._decodeNewJPEG = function(c, V, C, g, p, Z) {
            g = Math.min(g, V.length - C);
            var N = c.t347,
                F = N ? N.length : 0,
                a = new Uint8Array(F + g);
            if (N) {
                var q = 216,
                    R = 217,
                    d = 0;
                for (var Q = 0; Q < F - 1; Q++) {
                    if (N[Q] == 255 && N[Q + 1] == R) break;
                    a[d++] = N[Q]
                }
                var T = V[C],
                    i = V[C + 1];
                if (T != 255 || i != q) {
                    a[d++] = T;
                    a[d++] = i
                }
                for (var Q = 2; Q < g; Q++) a[d++] = V[C + Q]
            } else
                for (var Q = 0; Q < g; Q++) a[Q] = V[C + Q];
            if (c.t262[0] == 32803 || c.t259[0] == 7 && c.t262[0] == 34892) {
                var _ = c.t258[0],
                    W = b.LosslessJpegDecode(a),
                    E = W.length;
                if (!1) {} else if (_ == 16) {
                    if (c.isLE)
                        for (var Q = 0; Q < E; Q++) {
                            p[Z + (Q << 1)] = W[Q] & 255;
                            p[Z + (Q << 1) + 1] = W[Q] >>> 8
                        } else
                            for (var Q = 0; Q < E; Q++) {
                                p[Z + (Q << 1)] = W[Q] >>> 8;
                                p[Z + (Q << 1) + 1] = W[Q] & 255
                            }
                } else if (_ == 14 || _ == 12) {
                    var G = 16 - _;
                    for (var Q = 0; Q < E; Q++) b.decode._putsF(p, Q * _, W[Q] << G)
                } else if (_ == 8) {
                    for (var Q = 0; Q < E; Q++) p[Z + Q] = W[Q]
                } else throw new Error("unsupported bit depth " + _)
            } else {
                var r = new b.JpegDecoder;
                r.parse(a);
                var j = r.getData({
                    width: r.width,
                    height: r.height,
                    forceRGB: !0,
                    isSourcePDF: !1
                });
                for (var Q = 0; Q < j.length; Q++) p[Z + Q] = j[Q]
            }
            if (c.t262[0] == 6) c.t262[0] = 2
        };
        b.decode._decodeOldJPEGInit = function(c, V, C, g) {
            var p = 216,
                Z = 217,
                N = 219,
                F = 196,
                a = 221,
                q = 192,
                R = 218,
                d = 0,
                Q = 0,
                T, i, _ = !1,
                W, E, G, r = c.t513,
                j = r ? r[0] : 0,
                M = c.t514,
                l = M ? M[0] : 0,
                v = c.t324 || c.t273 || r,
                L = c.t530,
                u = 0,
                I = 0,
                J = c.t277 ? c.t277[0] : 1,
                D = c.t515;
            if (v) {
                Q = v[0];
                _ = v.length > 1
            }
            if (!_) {
                if (V[C] == 255 && V[C + 1] == p) return {
                    jpegOffset: C
                };
                if (r != null) {
                    if (V[C + j] == 255 && V[C + j + 1] == p) d = C + j;
                    else az("JPEGInterchangeFormat does not point to SOI");
                    if (M == null) az("JPEGInterchangeFormatLength field is missing");
                    else if (j >= Q || j + l <= Q) az("JPEGInterchangeFormatLength field value is invalid");
                    if (d != null) return {
                        jpegOffset: d
                    }
                }
            }
            if (L != null) {
                u = L[0];
                I = L[1]
            }
            if (r != null)
                if (M != null)
                    if (l >= 2 && j + l <= Q) {
                        if (V[C + j + l - 2] == 255 && V[C + j + l - 1] == p) T = new Uint8Array(l - 2);
                        else T = new Uint8Array(l);
                        for (W = 0; W < T.length; W++) T[W] = V[C + j + W];
                        az("Incorrect JPEG interchange format: using JPEGInterchangeFormat offset to derive tables")
                    } else az("JPEGInterchangeFormat+JPEGInterchangeFormatLength > offset to first strip or tile");
            if (T == null) {
                var y = 0,
                    e = [];
                e[y++] = 255;
                e[y++] = p;
                var X = c.t519;
                if (X == null) throw new Error("JPEGQTables tag is missing");
                for (W = 0; W < X.length; W++) {
                    e[y++] = 255;
                    e[y++] = N;
                    e[y++] = 0;
                    e[y++] = 67;
                    e[y++] = W;
                    for (E = 0; E < 64; E++) e[y++] = V[C + X[W] + E]
                }
                for (G = 0; G < 2; G++) {
                    var n = c[G == 0 ? "t520" : "t521"];
                    if (n == null) throw new Error((G == 0 ? "JPEGDCTables" : "JPEGACTables") + " tag is missing");
                    for (W = 0; W < n.length; W++) {
                        e[y++] = 255;
                        e[y++] = F;
                        var k = 19;
                        for (E = 0; E < 16; E++) k += V[C + n[W] + E];
                        e[y++] = k >>> 8;
                        e[y++] = k & 255;
                        e[y++] = W | G << 4;
                        for (E = 0; E < 16; E++) e[y++] = V[C + n[W] + E];
                        for (E = 0; E < k; E++) e[y++] = V[C + n[W] + 16 + E]
                    }
                }
                e[y++] = 255;
                e[y++] = q;
                e[y++] = 0;
                e[y++] = 8 + 3 * J;
                e[y++] = 8;
                e[y++] = c.height >>> 8 & 255;
                e[y++] = c.height & 255;
                e[y++] = c.width >>> 8 & 255;
                e[y++] = c.width & 255;
                e[y++] = J;
                if (J == 1) {
                    e[y++] = 1;
                    e[y++] = 17;
                    e[y++] = 0
                } else
                    for (W = 0; W < 3; W++) {
                        e[y++] = W + 1;
                        e[y++] = W != 0 ? 17 : (u & 15) << 4 | I & 15;
                        e[y++] = W
                    }
                if (D != null && D[0] != 0) {
                    e[y++] = 255;
                    e[y++] = a;
                    e[y++] = 0;
                    e[y++] = 4;
                    e[y++] = D[0] >>> 8 & 255;
                    e[y++] = D[0] & 255
                }
                T = new Uint8Array(e)
            }
            var P = -1;
            W = 0;
            while (W < T.length - 1) {
                if (T[W] == 255 && T[W + 1] == q) {
                    P = W;
                    break
                }
                W++
            }
            if (P == -1) {
                var A = new Uint8Array(T.length + 10 + 3 * J);
                A.set(T);
                var z = T.length;
                P = T.length;
                T = A;
                T[z++] = 255;
                T[z++] = q;
                T[z++] = 0;
                T[z++] = 8 + 3 * J;
                T[z++] = 8;
                T[z++] = c.height >>> 8 & 255;
                T[z++] = c.height & 255;
                T[z++] = c.width >>> 8 & 255;
                T[z++] = c.width & 255;
                T[z++] = J;
                if (J == 1) {
                    T[z++] = 1;
                    T[z++] = 17;
                    T[z++] = 0
                } else
                    for (W = 0; W < 3; W++) {
                        T[z++] = W + 1;
                        T[z++] = W != 0 ? 17 : (u & 15) << 4 | I & 15;
                        T[z++] = W
                    }
            }
            if (V[Q] == 255 && V[Q + 1] == R) {
                var o = V[Q + 2] << 8 | V[Q + 3];
                i = new Uint8Array(o + 2);
                i[0] = V[Q];
                i[1] = V[Q + 1];
                i[2] = V[Q + 2];
                i[3] = V[Q + 3];
                for (W = 0; W < o - 2; W++) i[W + 4] = V[Q + W + 4]
            } else {
                i = new Uint8Array(2 + 6 + 2 * J);
                var t = 0;
                i[t++] = 255;
                i[t++] = R;
                i[t++] = 0;
                i[t++] = 6 + 2 * J;
                i[t++] = J;
                if (J == 1) {
                    i[t++] = 1;
                    i[t++] = 0
                } else
                    for (W = 0; W < 3; W++) {
                        i[t++] = W + 1;
                        i[t++] = W << 4 | W
                    }
                i[t++] = 0;
                i[t++] = 63;
                i[t++] = 0
            }
            return {
                jpegOffset: C,
                tables: T,
                sosMarker: i,
                sofPosition: P
            }
        };
        b.decode._decodeOldJPEG = function(c, V, C, g, p, Z) {
            var N, F, a, q, R, d = b.decode._decodeOldJPEGInit(c, V, C, g);
            if (d.jpegOffset != null) {
                F = C + g - d.jpegOffset;
                q = new Uint8Array(F);
                for (N = 0; N < F; N++) q[N] = V[d.jpegOffset + N]
            } else {
                a = d.tables.length;
                q = new Uint8Array(a + d.sosMarker.length + g + 2);
                q.set(d.tables);
                R = a;
                q[d.sofPosition + 5] = c.height >>> 8 & 255;
                q[d.sofPosition + 6] = c.height & 255;
                q[d.sofPosition + 7] = c.width >>> 8 & 255;
                q[d.sofPosition + 8] = c.width & 255;
                if (V[C] != 255 || V[C + 1] != SOS) {
                    q.set(d.sosMarker, R);
                    R += sosMarker.length
                }
                for (N = 0; N < g; N++) q[R++] = V[C + N];
                q[R++] = 255;
                q[R++] = EOI
            }
            var Q = new b.JpegDecoder;
            Q.parse(q);
            var T = Q.getData({
                width: Q.width,
                height: Q.height,
                forceRGB: !0,
                isSourcePDF: !1
            });
            for (var N = 0; N < T.length; N++) p[Z + N] = T[N];
            if (c.t262 && c.t262[0] == 6) c.t262[0] = 2
        };
        b.decode._decodePackBits = function(c, V, C, g, p) {
            var Z = new Int8Array(c.buffer),
                N = new Int8Array(g.buffer),
                F = V + C;
            while (V < F) {
                var a = Z[V];
                V++;
                if (a >= 0 && a < 128)
                    for (var q = 0; q < a + 1; q++) {
                        N[p] = Z[V];
                        p++;
                        V++
                    }
                if (a >= -127 && a < 0) {
                    for (var q = 0; q < -a + 1; q++) {
                        N[p] = Z[V];
                        p++
                    }
                    V++
                }
            }
            return p
        };
        b.decode._decodeThunder = function(c, V, C, g, p) {
            var Z = [0, 1, 0, -1],
                N = [0, 1, 2, 3, 0, -3, -2, -1],
                F = V + C,
                a = p * 2,
                q = 0;
            while (V < F) {
                var R = c[V],
                    d = R >>> 6,
                    Q = R & 63;
                V++;
                if (d == 3) {
                    q = Q & 15;
                    g[a >>> 1] |= q << 4 * (1 - a & 1);
                    a++
                }
                if (d == 0)
                    for (var T = 0; T < Q; T++) {
                        g[a >>> 1] |= q << 4 * (1 - a & 1);
                        a++
                    }
                if (d == 2)
                    for (var T = 0; T < 2; T++) {
                        var i = Q >>> 3 * (1 - T) & 7;
                        if (i != 4) {
                            q += N[i];
                            g[a >>> 1] |= q << 4 * (1 - a & 1);
                            a++
                        }
                    }
                if (d == 1)
                    for (var T = 0; T < 3; T++) {
                        var i = Q >>> 2 * (2 - T) & 3;
                        if (i != 2) {
                            q += Z[i];
                            g[a >>> 1] |= q << 4 * (1 - a & 1);
                            a++
                        }
                    }
            }
        };
        b.decode._dmap = {
            "1": 0,
            "011": 1,
            "000011": 2,
            "0000011": 3,
            "010": -1,
            "000010": -2,
            "0000010": -3
        };
        b.decode._lens = function() {
            var c = function(a, q, R, d) {
                    for (var Q = 0; Q < q.length; Q++) a[q[Q]] = R + Q * d
                },
                V = "00110101,000111,0111,1000,1011,1100,1110,1111,10011,10100,00111,01000,001000,000011,110100,110101," + "101010,101011,0100111,0001100,0001000,0010111,0000011,0000100,0101000,0101011,0010011,0100100,0011000,00000010,00000011,00011010," + "00011011,00010010,00010011,00010100,00010101,00010110,00010111,00101000,00101001,00101010,00101011,00101100,00101101,00000100,00000101,00001010," + "00001011,01010010,01010011,01010100,01010101,00100100,00100101,01011000,01011001,01011010,01011011,01001010,01001011,00110010,00110011,00110100",
                C = "0000110111,010,11,10,011,0011,0010,00011,000101,000100,0000100,0000101,0000111,00000100,00000111,000011000," + "0000010111,0000011000,0000001000,00001100111,00001101000,00001101100,00000110111,00000101000,00000010111,00000011000,000011001010,000011001011,000011001100,000011001101,000001101000,000001101001," + "000001101010,000001101011,000011010010,000011010011,000011010100,000011010101,000011010110,000011010111,000001101100,000001101101,000011011010,000011011011,000001010100,000001010101,000001010110,000001010111," + "000001100100,000001100101,000001010010,000001010011,000000100100,000000110111,000000111000,000000100111,000000101000,000001011000,000001011001,000000101011,000000101100,000001011010,000001100110,000001100111",
                g = "11011,10010,010111,0110111,00110110,00110111,01100100,01100101,01101000,01100111,011001100,011001101,011010010,011010011,011010100,011010101,011010110," + "011010111,011011000,011011001,011011010,011011011,010011000,010011001,010011010,011000,010011011",
                p = "0000001111,000011001000,000011001001,000001011011,000000110011,000000110100,000000110101,0000001101100,0000001101101,0000001001010,0000001001011,0000001001100," + "0000001001101,0000001110010,0000001110011,0000001110100,0000001110101,0000001110110,0000001110111,0000001010010,0000001010011,0000001010100,0000001010101,0000001011010," + "0000001011011,0000001100100,0000001100101",
                Z = "00000001000,00000001100,00000001101,000000010010,000000010011,000000010100,000000010101,000000010110,000000010111,000000011100,000000011101,000000011110,000000011111";
            V = V.split(",");
            C = C.split(",");
            g = g.split(",");
            p = p.split(",");
            Z = Z.split(",");
            var N = {},
                F = {};
            c(N, V, 0, 1);
            c(N, g, 64, 64);
            c(N, Z, 1792, 64);
            c(F, C, 0, 1);
            c(F, p, 64, 64);
            c(F, Z, 1792, 64);
            return [N, F]
        }();
        b.decode._decodeG4 = function(c, V, C, g, p, Z, N) {
            var F = b.decode,
                a = V << 3,
                q = 0,
                R = "",
                d = [],
                Q = [],
                i = 0,
                _ = 0,
                W = 0,
                E = 0,
                G = 0,
                j = 0,
                M = 0,
                l = "",
                v = 0;
            for (var T = 0; T < Z; T++) Q.push(0);
            Q = F._makeDiff(Q);
            var L = Math.ceil(Z / 8) * 8;
            while (a >>> 3 < V + C) {
                E = F._findDiff(Q, i + (i == 0 ? 0 : 1), 1 - j), G = F._findDiff(Q, E, j);
                var u = 0;
                if (N == 1) u = c[a >>> 3] >>> 7 - (a & 7) & 1;
                if (N == 2) u = c[a >>> 3] >>> (a & 7) & 1;
                a++;
                R += u;
                if (l == "H") {
                    if (F._lens[j][R] != null) {
                        var I = F._lens[j][R];
                        R = "";
                        q += I;
                        if (I < 64) {
                            F._addNtimes(d, q, j);
                            i += q;
                            j = 1 - j;
                            q = 0;
                            v--;
                            if (v == 0) l = ""
                        }
                    }
                } else {
                    if (R == "0001") {
                        R = "";
                        F._addNtimes(d, G - i, j);
                        i = G
                    }
                    if (R == "001") {
                        R = "";
                        l = "H";
                        v = 2
                    }
                    if (F._dmap[R] != null) {
                        _ = E + F._dmap[R];
                        F._addNtimes(d, _ - i, j);
                        i = _;
                        R = "";
                        j = 1 - j
                    }
                }
                if (d.length == Z && l == "") {
                    F._writeBits(d, g, p * 8 + M * L);
                    j = 0;
                    M++;
                    i = 0;
                    Q = F._makeDiff(d);
                    d = []
                }
            }
        };
        b.decode._findDiff = function(c, V, C) {
            for (var g = 0; g < c.length; g += 2)
                if (c[g] >= V && c[g + 1] == C) return c[g]
        };
        b.decode._makeDiff = function(c) {
            var V = [];
            if (c[0] == 1) V.push(0, 1);
            for (var C = 1; C < c.length; C++)
                if (c[C - 1] != c[C]) V.push(C, c[C]);
            V.push(c.length, 0, c.length, 1);
            return V
        };
        b.decode._decodeG2 = function(c, V, C, g, p, Z, N) {
            var F = b.decode,
                a = V << 3,
                q = 0,
                R = "",
                d = [],
                Q = 0,
                T = 0,
                i = Math.ceil(Z / 8) * 8;
            while (a >>> 3 < V + C) {
                var _ = 0;
                if (N == 1) _ = c[a >>> 3] >>> 7 - (a & 7) & 1;
                if (N == 2) _ = c[a >>> 3] >>> (a & 7) & 1;
                a++;
                R += _;
                q = F._lens[Q][R];
                if (q != null) {
                    F._addNtimes(d, q, Q);
                    R = "";
                    if (q < 64) Q = 1 - Q;
                    if (d.length == Z) {
                        F._writeBits(d, g, p * 8 + T * i);
                        d = [];
                        T++;
                        Q = 0;
                        if ((a & 7) != 0) a += 8 - (a & 7);
                        if (q >= 64) a += 8
                    }
                }
            }
        };
        b.decode._decodeG3 = function(c, V, C, g, p, Z, N, F) {
            var a = b.decode,
                q = V << 3,
                R = 0,
                d = "",
                Q = [],
                T = [],
                _ = 0,
                W = 0,
                E = 0,
                G = 0,
                j = 0,
                M = 0,
                v = "",
                L = 0,
                u = !0;
            for (var i = 0; i < Z; i++) Q.push(0);
            var l = -1,
                I = Math.ceil(Z / 8) * 8;
            while (q >>> 3 < V + C) {
                G = a._findDiff(T, _ + (_ == 0 ? 0 : 1), 1 - M), j = a._findDiff(T, G, M);
                var J = 0;
                if (N == 1) J = c[q >>> 3] >>> 7 - (q & 7) & 1;
                if (N == 2) J = c[q >>> 3] >>> (q & 7) & 1;
                q++;
                d += J;
                if (u) {
                    if (a._lens[M][d] != null) {
                        var D = a._lens[M][d];
                        d = "";
                        R += D;
                        if (D < 64) {
                            a._addNtimes(Q, R, M);
                            M = 1 - M;
                            R = 0
                        }
                    }
                } else {
                    if (v == "H") {
                        if (a._lens[M][d] != null) {
                            var D = a._lens[M][d];
                            d = "";
                            R += D;
                            if (D < 64) {
                                a._addNtimes(Q, R, M);
                                _ += R;
                                M = 1 - M;
                                R = 0;
                                L--;
                                if (L == 0) v = ""
                            }
                        }
                    } else {
                        if (d == "0001") {
                            d = "";
                            a._addNtimes(Q, j - _, M);
                            _ = j
                        }
                        if (d == "001") {
                            d = "";
                            v = "H";
                            L = 2
                        }
                        if (a._dmap[d] != null) {
                            W = G + a._dmap[d];
                            a._addNtimes(Q, W - _, M);
                            _ = W;
                            d = "";
                            M = 1 - M
                        }
                    }
                }
                if (d.endsWith("000000000001")) {
                    if (l >= 0) a._writeBits(Q, g, p * 8 + l * I);
                    if (F) {
                        if (N == 1) u = (c[q >>> 3] >>> 7 - (q & 7) & 1) == 1;
                        if (N == 2) u = (c[q >>> 3] >>> (q & 7) & 1) == 1;
                        q++
                    }
                    d = "";
                    M = 0;
                    l++;
                    _ = 0;
                    T = a._makeDiff(Q);
                    Q = []
                }
            }
            if (Q.length == Z) a._writeBits(Q, g, p * 8 + l * I)
        };
        b.decode._addNtimes = function(c, V, C) {
            for (var g = 0; g < V; g++) c.push(C)
        };
        b.decode._writeBits = function(c, V, C) {
            for (var g = 0; g < c.length; g++) V[C + g >>> 3] |= c[g] << 7 - (C + g & 7)
        };
        b.decode._decodeLZW = b.decode._decodeLZW = function() {
            var c, C, g, p, Z = 0,
                N = 0,
                F = 0,
                a = 0,
                q = function() {
                    var G = c >>> 3,
                        j = C[G] << 16 | C[G + 1] << 8 | C[G + 2],
                        M = j >>> 24 - (c & 7) - N & (1 << N) - 1;
                    c += N;
                    return M
                },
                R = new Uint32Array(4096 * 4),
                d = 0,
                Q = function(G) {
                    if (G == d) return;
                    d = G;
                    F = 1 << G;
                    a = F + 1;
                    for (var j = 0; j < a + 1; j++) {
                        R[4 * j] = R[4 * j + 3] = j;
                        R[4 * j + 1] = 65535;
                        R[4 * j + 2] = 1
                    }
                },
                T = function(G) {
                    N = G + 1;
                    Z = a + 1
                },
                i = function(G) {
                    var j = G << 2,
                        M = R[j + 2],
                        l = p + M - 1;
                    while (j != 65535) {
                        g[l--] = R[j];
                        j = R[j + 1]
                    }
                    p += M
                },
                _ = function(G, j) {
                    var M = Z << 2,
                        l = G << 2;
                    R[M] = R[(j << 2) + 3];
                    R[M + 1] = l;
                    R[M + 2] = R[l + 2] + 1;
                    R[M + 3] = R[l + 3];
                    Z++;
                    if (Z + 1 == 1 << N && N != 12) N++
                },
                W = function(G, j, M, l, L, u) {
                    c = j << 3;
                    C = G;
                    g = l;
                    p = L;
                    var J = j + M << 3,
                        D = 0,
                        y = 0;
                    Q(u);
                    T(u);
                    while (c < J && (D = q()) != a) {
                        if (D == F) {
                            T(u);
                            D = q();
                            if (D == a) break;
                            i(D)
                        } else {
                            if (D < Z) {
                                i(D);
                                _(y, D)
                            } else {
                                _(y, y);
                                i(Z - 1)
                            }
                        }
                        y = D
                    }
                    return p
                };
            return W
        }();
        b.tags = {};
        b._types = function() {
            var c = new Array(250);
            c.fill(0);
            c = c.concat([0, 0, 0, 0, 4, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 3, 0, 0, 2, 2, 2, 2, 4, 3, 0, 0, 3, 4, 4, 3, 3, 5, 5, 3, 2, 5, 5, 0, 0, 0, 0, 4, 4, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 5, 5, 3, 0, 3, 3, 4, 4, 4, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            var V = {
                33432: 2,
                33434: 5,
                33437: 5,
                34665: 4,
                34850: 3,
                34853: 4,
                34855: 3,
                34864: 3,
                34866: 4,
                36864: 7,
                36867: 2,
                36868: 2,
                37121: 7,
                37377: 10,
                37378: 5,
                37380: 10,
                37381: 5,
                37383: 3,
                37384: 3,
                37385: 3,
                37386: 5,
                37510: 7,
                37520: 2,
                37521: 2,
                37522: 2,
                40960: 7,
                40961: 3,
                40962: 4,
                40963: 4,
                40965: 4,
                41486: 5,
                41487: 5,
                41488: 3,
                41985: 3,
                41986: 3,
                41987: 3,
                41988: 5,
                41989: 3,
                41990: 3,
                41993: 3,
                41994: 3,
                41995: 7,
                41996: 3,
                42032: 2,
                42033: 2,
                42034: 5,
                42036: 2,
                42037: 2,
                59932: 7
            };
            return {
                basic: {
                    main: c,
                    rest: V
                },
                gps: {
                    main: [1, 2, 5, 2, 5, 1, 5, 5, 0, 9],
                    rest: {
                        18: 2,
                        29: 2
                    }
                }
            }
        }();
        b._readIFD = function(c, V, C, g, p, Z) {
            var N = c.readUshort(V, C);
            C += 2;
            var F = {};
            if (Z.debug) az("   ".repeat(p), g.length - 1, ">>>----------------");
            for (var a = 0; a < N; a++) {
                var q = c.readUshort(V, C);
                C += 2;
                var R = c.readUshort(V, C);
                C += 2;
                var d = c.readUint(V, C);
                C += 4;
                var Q = c.readUint(V, C);
                C += 4;
                var T = [];
                if (R == 1 || R == 7) {
                    var i = d < 5 ? C - 4 : Q;
                    if (i + d > V.buffer.byteLength) d = V.buffer.byteLength - i;
                    T = new Uint8Array(V.buffer, i, d)
                }
                if (R == 2) {
                    var _ = d < 5 ? C - 4 : Q,
                        W = V[_],
                        E = Math.max(0, Math.min(d - 1, V.length - _));
                    if (W < 128 || E == 0) T.push(c.readASCII(V, _, E));
                    else T = new Uint8Array(V.buffer, _, E)
                }
                if (R == 3) {
                    for (var G = 0; G < d; G++) T.push(c.readUshort(V, (d < 3 ? C - 4 : Q) + 2 * G))
                }
                if (R == 4 || R == 13) {
                    for (var G = 0; G < d; G++) T.push(c.readUint(V, (d < 2 ? C - 4 : Q) + 4 * G))
                }
                if (R == 5 || R == 10) {
                    var r = R == 5 ? c.readUint : c.readInt;
                    for (var G = 0; G < d; G++) T.push([r(V, Q + G * 8), r(V, Q + G * 8 + 4)])
                }
                if (R == 8) {
                    for (var G = 0; G < d; G++) T.push(c.readShort(V, (d < 3 ? C - 4 : Q) + 2 * G))
                }
                if (R == 9) {
                    for (var G = 0; G < d; G++) T.push(c.readInt(V, (d < 2 ? C - 4 : Q) + 4 * G))
                }
                if (R == 11) {
                    for (var G = 0; G < d; G++) T.push(c.readFloat(V, Q + G * 4))
                }
                if (R == 12) {
                    for (var G = 0; G < d; G++) T.push(c.readDouble(V, Q + G * 8))
                }
                if (d != 0 && T.length == 0) {
                    az(q, "unknown TIFF tag type: ", R, "num:", d);
                    if (a == 0) return;
                    continue
                }
                if (Z.debug) az("   ".repeat(p), q, R, b.tags[q], T);
                F["t" + q] = T;
                if (q == 330 && F.t272 && F.t272[0] == "DSLR-A100") {} else if (q == 330 || q == 34665 || q == 34853 || q == 50740 && c.readUshort(V, c.readUint(T, 0)) < 300 || q == 61440) {
                    var j = q == 50740 ? [c.readUint(T, 0)] : T,
                        M = [];
                    for (var G = 0; G < j.length; G++) b._readIFD(c, V, j[G], M, p + 1, Z);
                    if (q == 330) F.subIFD = M;
                    if (q == 34665) F.exifIFD = M[0];
                    if (q == 34853) F.gpsiIFD = M[0];
                    if (q == 50740) F.dngPrvt = M[0];
                    if (q == 61440) F.fujiIFD = M[0]
                }
                if (q == 37500 && Z.parseMN) {
                    var l = T;
                    if (c.readASCII(l, 0, 5) == "Nikon") F.makerNote = b.decode(l.slice(10).buffer)[0];
                    else if (c.readUshort(V, Q) < 300 && c.readUshort(V, Q + 4) <= 12) {
                        var v = [];
                        b._readIFD(c, V, Q, v, p + 1, Z);
                        F.makerNote = v[0]
                    }
                }
            }
            g.push(F);
            if (Z.debug) az("   ".repeat(p), "<<<---------------");
            return C
        };
        b._writeIFD = function(c, V, C, g, p) {
            var Z = Object.keys(p),
                N = Z.length;
            if (p.exifIFD) N--;
            if (p.gpsiIFD) N--;
            c.writeUshort(C, g, N);
            g += 2;
            var F = g + N * 12 + 4;
            for (var a = 0; a < Z.length; a++) {
                var q = Z[a];
                if (q == "t34665" || q == "t34853") continue;
                if (q == "exifIFD") q = "t34665";
                if (q == "gpsiIFD") q = "t34853";
                var R = parseInt(q.slice(1)),
                    d = V.main[R];
                if (d == null) d = V.rest[R];
                if (d == null || d == 0) throw new Error("unknown type of tag: " + R);
                var Q = p[q];
                if (R == 34665) {
                    var T = b._writeIFD(c, V, C, F, p.exifIFD);
                    Q = [F];
                    F = T[1]
                }
                if (R == 34853) {
                    var T = b._writeIFD(c, b._types.gps, C, F, p.gpsiIFD);
                    Q = [F];
                    F = T[1]
                }
                if (d == 2) Q = Q[0] + "\0";
                var i = Q.length;
                c.writeUshort(C, g, R);
                g += 2;
                c.writeUshort(C, g, d);
                g += 2;
                c.writeUint(C, g, i);
                g += 4;
                var _ = [-1, 1, 1, 2, 4, 8, 0, 1, 0, 4, 8, 0, 8][d] * i,
                    W = g;
                if (_ > 4) {
                    c.writeUint(C, g, F);
                    W = F
                }
                if (d == 1 || d == 7) {
                    for (var E = 0; E < i; E++) C[W + E] = Q[E]
                } else if (d == 2) {
                    c.writeASCII(C, W, Q)
                } else if (d == 3) {
                    for (var E = 0; E < i; E++) c.writeUshort(C, W + 2 * E, Q[E])
                } else if (d == 4) {
                    for (var E = 0; E < i; E++) c.writeUint(C, W + 4 * E, Q[E])
                } else if (d == 5 || d == 10) {
                    var G = d == 5 ? c.writeUint : c.writeInt;
                    for (var E = 0; E < i; E++) {
                        var r = Q[E],
                            j = r[0],
                            M = r[1];
                        if (j == null) throw "e";
                        G(C, W + 8 * E, j);
                        G(C, W + 8 * E + 4, M)
                    }
                } else if (d == 9) {
                    for (var E = 0; E < i; E++) c.writeInt(C, W + 4 * E, Q[E])
                } else if (d == 12) {
                    for (var E = 0; E < i; E++) c.writeDouble(C, W + 8 * E, Q[E])
                } else throw d;
                if (_ > 4) {
                    _ += _ & 1;
                    F += _
                }
                g += 4
            }
            return [g, F]
        };
        b.toRGBA8 = function(c, V) {
            function C(X) {
                return X < .0031308 ? 12.92 * X : 1.055 * Math.pow(X, 1 / 2.4) - .055
            }
            var g = c.width,
                p = c.height,
                Z = g * p,
                N = Z * 4,
                F = c.data,
                a = new Uint8Array(Z * 4),
                q = c.t262 ? c.t262[0] : 2,
                R = c.t258 ? Math.min(32, c.t258[0]) : 1;
            if (c.t262 == null && R == 1) q = 0;
            var d = c.t277 ? c.t277[0] : c.t258 ? c.t258.length : [1, 1, 3, 1, 1, 4, 3][q],
                Q = Math.ceil(d * R * g / 8);
            if (!1) {} else if (q == 0) {
                V = 1 / 256;
                for (var T = 0; T < p; T++) {
                    var i = T * Q,
                        _ = T * g;
                    if (R == 1)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                G = F[i + (W >> 3)] >> 7 - (W & 7) & 1;
                            a[E] = a[E + 1] = a[E + 2] = (1 - G) * 255;
                            a[E + 3] = 255
                        }
                    if (R == 4)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                G = F[i + (W >> 1)] >> 4 - 4 * (W & 1) & 15;
                            a[E] = a[E + 1] = a[E + 2] = (15 - G) * 17;
                            a[E + 3] = 255
                        }
                    if (R == 8)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                G = F[i + W];
                            a[E] = a[E + 1] = a[E + 2] = 255 - G;
                            a[E + 3] = 255
                        }
                    if (R == 16)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                j = i + 2 * W,
                                G = F[j + 1] << 8 | F[j];
                            a[E] = a[E + 1] = a[E + 2] = Math.min(255, 255 - ~~(G * V));
                            a[E + 3] = 255
                        }
                }
            } else if (q == 1) {
                if (V == null) V = 1 / 256;
                for (var T = 0; T < p; T++) {
                    var i = T * Q,
                        _ = T * g;
                    if (R == 1)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                G = F[i + (W >> 3)] >> 7 - (W & 7) & 1;
                            a[E] = a[E + 1] = a[E + 2] = G * 255;
                            a[E + 3] = 255
                        }
                    if (R == 2)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                G = F[i + (W >> 2)] >> 6 - 2 * (W & 3) & 3;
                            a[E] = a[E + 1] = a[E + 2] = G * 85;
                            a[E + 3] = 255
                        }
                    if (R == 8)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                G = F[i + W * d];
                            a[E] = a[E + 1] = a[E + 2] = G;
                            a[E + 3] = 255
                        }
                    if (R == 16)
                        for (var W = 0; W < g; W++) {
                            var E = _ + W << 2,
                                j = i + 2 * W,
                                G = F[j + 1] << 8 | F[j];
                            a[E] = a[E + 1] = a[E + 2] = Math.min(255, ~~(G * V));
                            a[E + 3] = 255
                        }
                }
            } else if (q == 2) {
                if (R == 8) {
                    if (d == 1)
                        for (var W = 0; W < Z; W++) {
                            a[4 * W] = a[4 * W + 1] = a[4 * W + 2] = F[W];
                            a[4 * W + 3] = 255
                        }
                    if (d == 4)
                        for (var W = 0; W < N; W++) a[W] = F[W];
                    if (d == 3)
                        for (var W = 0; W < Z; W++) {
                            var E = W << 2,
                                l = W * 3;
                            a[E] = F[l];
                            a[E + 1] = F[l + 1];
                            a[E + 2] = F[l + 2];
                            a[E + 3] = 255
                        }
                } else if (R == 16) {
                    if (d == 4)
                        for (var W = 0; W < Z; W++) {
                            var E = W << 2,
                                l = W * 8 + 1;
                            a[E] = F[l];
                            a[E + 1] = F[l + 2];
                            a[E + 2] = F[l + 4];
                            a[E + 3] = F[l + 6]
                        }
                    if (d == 3)
                        for (var W = 0; W < Z; W++) {
                            var E = W << 2,
                                l = W * 6 + 1;
                            a[E] = F[l];
                            a[E + 1] = F[l + 2];
                            a[E + 2] = F[l + 4];
                            a[E + 3] = 255
                        }
                } else if (R == 32) {
                    var v = new Float32Array(F.buffer),
                        L = 0;
                    for (var W = 0; W < v.length; W++) L = Math.min(L, v[W]);
                    if (L < 0)
                        for (var W = 0; W < F.length; W += 4) {
                            var u = F[W];
                            F[W] = F[W + 3];
                            F[W + 3] = u;
                            u = F[W + 1];
                            F[W + 1] = F[W + 2];
                            F[W + 2] = u
                        }
                    var I = [];
                    for (var W = 0; W < 65536; W++) I.push(C(W / 65535));
                    for (var W = 0; W < v.length; W++) {
                        var J = Math.max(0, Math.min(1, v[W]));
                        v[W] = I[~~(.5 + J * 65535)]
                    }
                    if (d == 3)
                        for (var W = 0; W < Z; W++) {
                            var E = W << 2,
                                l = W * 3;
                            a[E] = ~~(.5 + v[l] * 255);
                            a[E + 1] = ~~(.5 + v[l + 1] * 255);
                            a[E + 2] = ~~(.5 + v[l + 2] * 255);
                            a[E + 3] = 255
                        } else if (d == 4)
                            for (var W = 0; W < Z; W++) {
                                var E = W << 2,
                                    l = W * 4;
                                a[E] = ~~(.5 + v[l] * 255);
                                a[E + 1] = ~~(.5 + v[l + 1] * 255);
                                a[E + 2] = ~~(.5 + v[l + 2] * 255);
                                a[E + 3] = ~~(.5 + v[l + 3] * 255)
                            } else throw d
                } else throw R
            } else if (q == 3) {
                var D = c.t320,
                    y = 1 << R,
                    e = R == 8 && d > 1 && c.t338 && c.t338[0] != 0;
                for (var T = 0; T < p; T++)
                    for (var X = 0; X < g; X++) {
                        var W = T * g + X,
                            E = W << 2,
                            n = 0,
                            k = T * Q;
                        if (!1) {} else if (R == 1) n = F[k + (X >>> 3)] >>> 7 - (X & 7) & 1;
                        else if (R == 2) n = F[k + (X >>> 2)] >>> 6 - 2 * (X & 3) & 3;
                        else if (R == 4) n = F[k + (X >>> 1)] >>> 4 - 4 * (X & 1) & 15;
                        else if (R == 8) n = F[k + X * d];
                        else throw R;
                        a[E] = D[n] >> 8;
                        a[E + 1] = D[y + n] >> 8;
                        a[E + 2] = D[y + y + n] >> 8;
                        a[E + 3] = e ? F[k + X * d + 1] : 255
                    }
            } else if (q == 5) {
                var P = d > 4 ? 1 : 0;
                for (var W = 0; W < Z; W++) {
                    var E = W << 2,
                        A = W * d;
                    if (UDOC) {
                        var z = F[A],
                            o = F[A + 1],
                            t = F[A + 2],
                            a5 = F[A + 3],
                            S = UDOC.Color.cmykToRgb([z * (1 / 255), o * (1 / 255), t * (1 / 255), a5 * (1 / 255)]);
                        a[E] = ~~(.5 + 255 * S[0]);
                        a[E + 1] = ~~(.5 + 255 * S[1]);
                        a[E + 2] = ~~(.5 + 255 * S[2])
                    } else {
                        var z = 255 - F[A],
                            o = 255 - F[A + 1],
                            t = 255 - F[A + 2],
                            a5 = (255 - F[A + 3]) * (1 / 255);
                        a[E] = ~~(z * a5 + .5);
                        a[E + 1] = ~~(o * a5 + .5);
                        a[E + 2] = ~~(t * a5 + .5)
                    }
                    a[E + 3] = 255 * (1 - P) + F[A + 4] * P
                }
            } else if (q == 6 && c.t278) {
                var U = c.t278[0];
                for (var T = 0; T < p; T += U) {
                    var W = T * g,
                        ah = U * g;
                    for (var aB = 0; aB < ah; aB++) {
                        var E = 4 * (W + aB),
                            A = 3 * W + 4 * (aB >>> 1),
                            t = F[A + (aB & 1)],
                            B = F[A + 2] - 128,
                            aQ = F[A + 3] - 128,
                            $ = t + ((aQ >> 2) + (aQ >> 3) + (aQ >> 5)),
                            aZ = t - ((B >> 2) + (B >> 4) + (B >> 5)) - ((aQ >> 1) + (aQ >> 3) + (aQ >> 4) + (aQ >> 5)),
                            x = t + (B + (B >> 1) + (B >> 2) + (B >> 6));
                        a[E] = Math.max(0, Math.min(255, $));
                        a[E + 1] = Math.max(0, Math.min(255, aZ));
                        a[E + 2] = Math.max(0, Math.min(255, x));
                        a[E + 3] = 255
                    }
                }
            } else if (q == 32845) {
                for (var T = 0; T < p; T++)
                    for (var X = 0; X < g; X++) {
                        var A = (T * g + X) * 6,
                            E = (T * g + X) * 4,
                            a0 = F[A + 1] << 8 | F[A],
                            a0 = Math.pow(2, (a0 + .5) / 256 - 64),
                            aV = (F[A + 3] + .5) / 410,
                            aS = (F[A + 5] + .5) / 410,
                            aK = 9 * aV / (6 * aV - 16 * aS + 12),
                            aO = 4 * aS / (6 * aV - 16 * aS + 12),
                            Y = a0,
                            ao = aK * Y / aO,
                            t = Y,
                            K = (1 - aK - aO) * Y / aO,
                            $ = 2.69 * ao - 1.276 * t - .414 * K,
                            aZ = -1.022 * ao + 1.978 * t + .044 * K,
                            x = .061 * ao - .224 * t + 1.163 * K;
                        a[E] = C(Math.min($, 1)) * 255;
                        a[E + 1] = C(Math.min(aZ, 1)) * 255;
                        a[E + 2] = C(Math.min(x, 1)) * 255;
                        a[E + 3] = 255
                    }
            } else az("Unknown Photometric interpretation: " + q);
            return a
        };
        b.replaceIMG = function(c) {
            if (c == null) c = document.getElementsByTagName("img");
            var V = ["tif", "tiff", "dng", "cr2", "nef"];
            for (var C = 0; C < c.length; C++) {
                var g = c[C],
                    p = g.getAttribute("src");
                if (p == null) continue;
                var N = p.split(".").pop().toLowerCase();
                if (V.indexOf(N) == -1) continue;
                var F = new XMLHttpRequest;
                b._xhrs.push(F);
                b._imgs.push(g);
                F.open("GET", p);
                F.responseType = "arraybuffer";
                F.onload = b._imgLoaded;
                F.send()
            }
        };
        b._xhrs = [];
        b._imgs = [];
        b._imgLoaded = function(c) {
            var C = b._xhrs.indexOf(c.target),
                g = b._imgs[C];
            b._xhrs.splice(C, 1);
            b._imgs.splice(C, 1);
            g.setAttribute("src", b.bufferToURI(c.target.response))
        };
        b.bufferToURI = function(c) {
            var V = b.decode(c),
                C = V,
                g = 0,
                p = C[0];
            if (V[0].subIFD) C = C.concat(V[0].subIFD);
            for (var Z = 0; Z < C.length; Z++) {
                var N = C[Z];
                if (N.t258 == null || N.t258.length < 3) continue;
                var F = N.t256 * N.t257;
                if (F > g) {
                    g = F;
                    p = N
                }
            }
            b.decodeImage(c, p, V);
            var a = b.toRGBA8(p),
                q = p.width,
                R = p.height,
                d = document.createElement("canvas");
            d.width = q;
            d.height = R;
            var Q = d.getContext("2d", { willReadFrequently: true }),
                T = new ImageData(new Uint8ClampedArray(a.buffer), q, R);
            Q.putImageData(T, 0, 0);
            return d.toDataURL()
        };
        b._binBE = {
            nextZero: function(c, V) {
                while (c[V] != 0) V++;
                return V
            },
            readUshort: function(c, V) {
                return c[V] << 8 | c[V + 1]
            },
            readShort: function(c, V) {
                var C = b._binBE.ui8;
                C[0] = c[V + 1];
                C[1] = c[V + 0];
                return b._binBE.i16[0]
            },
            readInt: function(c, V) {
                var C = b._binBE.ui8;
                C[0] = c[V + 3];
                C[1] = c[V + 2];
                C[2] = c[V + 1];
                C[3] = c[V + 0];
                return b._binBE.i32[0]
            },
            readUint: function(c, V) {
                var C = b._binBE.ui8;
                C[0] = c[V + 3];
                C[1] = c[V + 2];
                C[2] = c[V + 1];
                C[3] = c[V + 0];
                return b._binBE.ui32[0]
            },
            readASCII: function(c, V, C) {
                var g = "";
                for (var p = 0; p < C; p++) g += String.fromCharCode(c[V + p]);
                return g
            },
            readFloat: function(c, V) {
                var C = b._binBE.ui8;
                for (var g = 0; g < 4; g++) C[g] = c[V + 3 - g];
                return b._binBE.fl32[0]
            },
            readDouble: function(c, V) {
                var C = b._binBE.ui8;
                for (var g = 0; g < 8; g++) C[g] = c[V + 7 - g];
                return b._binBE.fl64[0]
            },
            writeUshort: function(c, V, C) {
                c[V] = C >> 8 & 255;
                c[V + 1] = C & 255
            },
            writeInt: function(c, V, C) {
                var g = b._binBE.ui8;
                b._binBE.i32[0] = C;
                c[V + 3] = g[0];
                c[V + 2] = g[1];
                c[V + 1] = g[2];
                c[V + 0] = g[3]
            },
            writeUint: function(c, V, C) {
                c[V] = C >> 24 & 255;
                c[V + 1] = C >> 16 & 255;
                c[V + 2] = C >> 8 & 255;
                c[V + 3] = C >> 0 & 255
            },
            writeASCII: function(c, V, C) {
                for (var g = 0; g < C.length; g++) c[V + g] = C.charCodeAt(g)
            },
            writeDouble: function(c, V, C) {
                b._binBE.fl64[0] = C;
                for (var g = 0; g < 8; g++) c[V + g] = b._binBE.ui8[7 - g]
            }
        };
        b._binBE.ui8 = new Uint8Array(8);
        b._binBE.i16 = new Int16Array(b._binBE.ui8.buffer);
        b._binBE.i32 = new Int32Array(b._binBE.ui8.buffer);
        b._binBE.ui32 = new Uint32Array(b._binBE.ui8.buffer);
        b._binBE.fl32 = new Float32Array(b._binBE.ui8.buffer);
        b._binBE.fl64 = new Float64Array(b._binBE.ui8.buffer);
        b._binLE = {
            nextZero: b._binBE.nextZero,
            readUshort: function(c, V) {
                return c[V + 1] << 8 | c[V]
            },
            readShort: function(c, V) {
                var C = b._binBE.ui8;
                C[0] = c[V + 0];
                C[1] = c[V + 1];
                return b._binBE.i16[0]
            },
            readInt: function(c, V) {
                var C = b._binBE.ui8;
                C[0] = c[V + 0];
                C[1] = c[V + 1];
                C[2] = c[V + 2];
                C[3] = c[V + 3];
                return b._binBE.i32[0]
            },
            readUint: function(c, V) {
                var C = b._binBE.ui8;
                C[0] = c[V + 0];
                C[1] = c[V + 1];
                C[2] = c[V + 2];
                C[3] = c[V + 3];
                return b._binBE.ui32[0]
            },
            readASCII: b._binBE.readASCII,
            readFloat: function(c, V) {
                var C = b._binBE.ui8;
                for (var g = 0; g < 4; g++) C[g] = c[V + g];
                return b._binBE.fl32[0]
            },
            readDouble: function(c, V) {
                var C = b._binBE.ui8;
                for (var g = 0; g < 8; g++) C[g] = c[V + g];
                return b._binBE.fl64[0]
            },
            writeUshort: function(c, V, C) {
                c[V] = C & 255;
                c[V + 1] = C >> 8 & 255
            },
            writeInt: function(c, V, C) {
                var g = b._binBE.ui8;
                b._binBE.i32[0] = C;
                c[V + 0] = g[0];
                c[V + 1] = g[1];
                c[V + 2] = g[2];
                c[V + 3] = g[3]
            },
            writeUint: function(c, V, C) {
                c[V] = C >>> 0 & 255;
                c[V + 1] = C >>> 8 & 255;
                c[V + 2] = C >>> 16 & 255;
                c[V + 3] = C >>> 24 & 255
            },
            writeASCII: b._binBE.writeASCII
        };
        b._copyTile = function(c, V, C, g, p, Z, N, F) {
            var a = Math.min(V, p - N),
                q = Math.min(C, Z - F);
            for (var R = 0; R < q; R++) {
                var d = (F + R) * p + N,
                    Q = R * V;
                for (var T = 0; T < a; T++) g[d + T] = c[Q + T]
            }
        };
        b.LosslessJpegDecode = function() {
            var c, V;

            function C() {
                return c[V++]
            }

            function g() {
                return c[V++] << 8 | c[V++]
            }

            function p(G) {
                var r = C(),
                    M = [0, 0, 0, 255],
                    l = [],
                    u = 8;
                for (var J = 0; J < 16; J++) l[J] = C();
                for (var J = 0; J < 16; J++) {
                    for (var D = 0; D < l[J]; D++) {
                        var e = Z(M, 0, J + 1, 1);
                        M[e + 3] = C()
                    }
                }
                var X = new Uint8Array(1 << u);
                G[r] = [new Uint8Array(M), X];
                for (var J = 0; J < 1 << u; J++) {
                    var A = u,
                        z = J,
                        a5 = 0,
                        S = 0;
                    while (M[a5 + 3] == 255 && A != 0) {
                        S = z >> --A & 1;
                        a5 = M[a5 + S]
                    }
                    X[J] = a5
                }
            }

            function Z(G, r, M, l) {
                if (G[r + 3] != 255) return 0;
                if (M == 0) return r;
                for (var u = 0; u < 2; u++) {
                    if (G[r + u] == 0) {
                        G[r + u] = G.length;
                        G.push(0, 0, l, 255)
                    }
                    var J = Z(G, G[r + u], M - 1, l + 1);
                    if (J != 0) return J
                }
                return 0
            }

            function N(G) {
                var r = G.b,
                    M = G.a;
                while (r < 25 && G.e < G.d) {
                    var l = G.data[G.e++];
                    if (!G.c) G.e += l + 1 >>> 8;
                    M = M << 8 | l;
                    r += 8
                }
                if (r < 0) throw "e";
                G.b = r;
                G.a = M
            }

            function F(G, r) {
                if (r.b < G) N(r);
                return r.a >> (r.b -= G) & 65535 >> 16 - G
            }

            function a(G, r) {
                var M = G[0],
                    l = 0,
                    u = 255,
                    J = 0;
                if (r.b < 16) N(r);
                var e = r.a >> r.b - 8 & 255;
                l = G[1][e];
                u = M[l + 3];
                r.b -= M[l + 2];
                while (u == 255) {
                    J = r.a >> --r.b & 1;
                    l = M[l + J];
                    u = M[l + 3]
                }
                return u
            }

            function q(G, r) {
                if (G < 32768 >> 16 - r) G += -(1 << r) + 1;
                return G
            }

            function R(G, r) {
                var M = a(G, r);
                if (M == 0) return 0;
                if (M == 16) return -32768;
                var l = F(M, r);
                return q(l, M)
            }

            function Q(G, r, M, l, u, J) {
                for (var e = 0; e < J; e++) {
                    var V = e * r;
                    for (var X = 0; X < r; X += u)
                        for (var A = 0; A < u; A++) G[V + X + A] = R(l[A], M)
                }
            }

            function T(G, r) {
                return q(F(G, r), G)
            }

            function i(G, r, M, l, u) {
                var J = c.length - V;
                for (var e = 0; e < J; e += 4) {
                    var X = c[V + e];
                    c[V + e] = c[V + e + 3];
                    c[V + e + 3] = X;
                    var X = c[V + e + 1];
                    c[V + e + 1] = c[V + e + 2];
                    c[V + e + 2] = X
                }
                for (var A = 0; A < u; A++) {
                    var z = 32768,
                        a5 = 32768;
                    for (var S = 0; S < r; S += 2) {
                        var U = a(l, M),
                            ah = a(l, M);
                        if (U != 0) z += T(U, M);
                        if (ah != 0) a5 += T(ah, M);
                        G[A * r + S] = z & 65535;
                        G[A * r + S + 1] = a5 & 65535
                    }
                }
            }

            function _(G) {
                c = G;
                V = 0;
                if (g() != 65496) throw "e";
                var r = [],
                    M = 0,
                    l = 0,
                    u = [],
                    J = [],
                    e = [],
                    X = 0,
                    A = 0,
                    z = 0;
                while (!0) {
                    var a5 = g();
                    if (a5 == 65535) {
                        V--;
                        continue
                    }
                    var S = g();
                    if (a5 == 65475) {
                        l = C();
                        A = g();
                        z = g();
                        X = C();
                        for (var U = 0; U < X; U++) {
                            var ah = C(),
                                aB = C(),
                                B = C();
                            if (B != 0) throw "e";
                            r[ah] = [U, aB >> 4, aB & 15]
                        }
                    } else if (a5 == 65476) {
                        var aQ = V + S - 2;
                        while (V < aQ) p(J)
                    } else if (a5 == 65498) {
                        V++;
                        for (var U = 0; U < X; U++) {
                            var s = C(),
                                aV = r[s];
                            e[aV[0]] = J[C() >>> 4];
                            u[aV[0]] = aV.slice(1)
                        }
                        M = C();
                        V += 2;
                        break
                    } else {
                        V += S - 2
                    }
                }
                var aS = l > 8 ? Uint16Array : Uint8Array,
                    aK = new aS(A * z * X),
                    aO = {
                        b: 0,
                        a: 0,
                        c: M == 8,
                        e: V,
                        data: c,
                        d: c.length
                    };
                if (aO.c) i(aK, z * X, aO, e[0], A);
                else {
                    var Y = [],
                        ao = 0,
                        K = 0;
                    for (var U = 0; U < X; U++) {
                        var aa = u[U],
                            a2 = aa[0],
                            aG = aa[1];
                        if (a2 > ao) ao = a2;
                        if (aG > K) K = aG;
                        Y.push(a2 * aG)
                    }
                    if (ao != 1 || K != 1) {
                        var m = [],
                            f = 0;
                        for (var U = 0; U < X; U++) {
                            for (var aU = 0; aU < Y[U]; aU++) m.push(e[U]);
                            f += Y[U]
                        }
                        var O = z / ao,
                            h = A / K;
                        Q(aK, O * f, aO, m, f, h);
                        W(aK, M, O, h, f - 2, f, f, l);
                        var w = aK.slice(0);
                        for (var aG = 0; aG < A; aG++)
                            for (var a2 = 0; a2 < z; a2++) {
                                var aA = (aG * z + a2) * X,
                                    aP = ~~(aG / K),
                                    b1 = ~~(a2 / ao),
                                    ab = aP * O + b1,
                                    ar = 0;
                                for (var U = 0; U < X; U++) {
                                    var b4 = a2 & 1,
                                        a1 = aG & 1,
                                        aw = K == 2 ? aG & 1 : 0,
                                        a6 = ab * f + ar + (U == 0 ? K == 1 ? b4 : b4 * 2 + a1 : 0);
                                    aK[aA + U] = w[a6];
                                    ar += Y[U]
                                }
                            }
                        W(aK, M, z, A, 0, 1, X, l)
                    } else {
                        Q(aK, z * X, aO, e, X, A);
                        W(aK, M, z, A, 0, X, X, l)
                    }
                }
                return aK
            }

            function W(G, r, M, l, u, J, e, X) {
                var A = M * e;
                for (var z = u; z < J; z++) G[z] += 1 << X - 1;
                for (var a5 = e; a5 < A; a5 += e)
                    for (var z = u; z < J; z++) G[a5 + z] += G[a5 + z - e];
                for (var S = 1; S < l; S++) {
                    var U = S * A;
                    for (var z = u; z < J; z++) G[U + z] += G[U + z - A];
                    for (var a5 = e; a5 < A; a5 += e) {
                        for (var z = u; z < J; z++) {
                            var ah = U + a5 + z,
                                aB = ah - A,
                                B = G[ah - e],
                                aQ = 0;
                            if (r == 0) aQ = 0;
                            else if (r == 1) aQ = B;
                            else if (r == 2) aQ = G[aB];
                            else if (r == 3) aQ = G[aB - e];
                            else if (r == 4) aQ = B + (G[aB] - G[aB - e]);
                            else if (r == 5) aQ = B + (G[aB] - G[aB - e] >>> 1);
                            else if (r == 6) aQ = G[aB] + (B - G[aB - e] >>> 1);
                            else if (r == 7) aQ = B + G[aB] >>> 1;
                            else throw r;
                            G[ah] += aQ
                        }
                    }
                }
            }
            return _
        }();
        (function() {
            var c = 0,
                V = 1,
                C = 2,
                g = 3,
                p = 4,
                N = 5,
                F = 6,
                a = 7,
                q = 8,
                R = 9,
                d = 10,
                Q = 11,
                T = 12,
                i = 13,
                W = 14,
                E = 15,
                G = 16,
                r = 17,
                M = 18;

            function l($) {
                var s = b._binBE.readUshort,
                    m = {
                        b: s($, 0),
                        i: $[2],
                        C: $[3],
                        u: $[4],
                        q: s($, 5),
                        k: s($, 7),
                        e: s($, 9),
                        l: s($, 11),
                        s: $[13],
                        d: s($, 14)
                    };
                if (m.b != 18771 || m.i > 1 || m.q < 6 || m.q % 6 || m.e < 768 || m.e % 24 || m.l != 768 || m.k < m.l || m.k % m.l || m.k - m.e >= m.l || m.s > 16 || m.s != m.k / m.l || m.s != Math.ceil(m.e / m.l) || m.d != m.q / 6 || m.u != 12 && m.u != 14 && m.u != 16 || m.C != 16 && m.C != 0) {
                    throw "Invalid data"
                }
                if (m.i == 0) {
                    throw "Not implemented. We need this file!"
                }
                m.h = m.C == 16;
                m.m = (m.h ? m.l * 2 / 3 : m.l >>> 1) | 0;
                m.A = m.m + 2;
                m.f = 64;
                m.g = (1 << m.u) - 1;
                m.n = 4 * m.u;
                return m
            }

            function v($, s) {
                var m = new Array(s.s),
                    f = 4 * s.s,
                    aU = 16 + f;
                if (f & 12) aU += 16 - (f & 12);
                for (var O = 0, h = 16; O < s.s; h += 4) {
                    var w = b._binBE.readUint($, h);
                    m[O] = $.slice(aU, aU + w);
                    m[O].j = 0;
                    m[O].a = 0;
                    aU += w;
                    O++
                }
                if (aU != $.length) throw "Invalid data";
                return m
            }

            function L($, s) {
                for (var m = -s[4], f = 0; m <= s[4]; f++, m++) {
                    $[f] = m <= -s[3] ? -4 : m <= -s[2] ? -3 : m <= -s[1] ? -2 : m < -s[0] ? -1 : m <= s[0] ? 0 : m < s[1] ? 1 : m < s[2] ? 2 : m < s[3] ? 3 : 4
                }
            }

            function u($, s, m) {
                var f = [s, 3 * s + 18, 5 * s + 67, 7 * s + 276, m];
                $.o = s;
                $.w = (f[4] + 2 * s) / (2 * s + 1) + 1 | 0;
                $.v = Math.ceil(Math.log2($.w));
                $.t = 9;
                L($.c, f)
            }

            function I($) {
                var s = {
                    c: new Int8Array(2 << $.u)
                };
                u(s, 0, $.g);
                return s
            }

            function e($) {
                var s = [
                        [],
                        [],
                        []
                    ],
                    m = Math.max(2, $.w + 32 >>> 6);
                for (var f = 0; f < 3; f++) {
                    for (var aU = 0; aU < 41; aU++) {
                        s[f][aU] = [m, 1]
                    }
                }
                return s
            }

            function X($) {
                for (var s = -1, m = 0; !m; s++) {
                    m = $[$.j] >>> 7 - $.a & 1;
                    $.a++;
                    $.a &= 7;
                    if (!$.a) $.j++
                }
                return s
            }

            function k($, s) {
                var m = 0,
                    f = 8 - $.a,
                    aU = $.j,
                    O = $.a;
                if (s) {
                    if (s >= f) {
                        do {
                            m <<= f;
                            s -= f;
                            m |= $[$.j] & (1 << f) - 1;
                            $.j++;
                            f = 8
                        } while (s >= 8)
                    }
                    if (s) {
                        m <<= s;
                        f -= s;
                        m |= $[$.j] >>> f & (1 << s) - 1
                    }
                    $.a = 8 - f
                }
                return m
            }

            function o($, s) {
                var m = 0;
                if (s < $) {
                    while (m <= 14 && s << ++m < $);
                }
                return m
            }

            function t($, s, m, f, aU, O, h, w) {
                if (w == null) w = 0;
                var aA = O + 1,
                    aP = aA % 2,
                    b1 = 0,
                    ab = 0,
                    ar = 0,
                    b4, a1, aw = f[aU],
                    a6 = f[aU - 1],
                    b7 = f[aU - 2][aA],
                    as = a6[aA - 1],
                    ay = a6[aA],
                    ae = a6[aA + 1],
                    ai = aw[aA - 1],
                    b6 = aw[aA + 1],
                    aD = Math.abs,
                    aT, ba, b0, aM;
                if (aP) {
                    aT = aD(ae - ay);
                    ba = aD(b7 - ay);
                    b0 = aD(as - ay)
                }
                if (aP) {
                    aM = aT > b0 && ba < aT ? b7 + as : aT < b0 && ba < b0 ? b7 + ae : ae + as;
                    aM = aM + 2 * ay >>> 2;
                    if (w) {
                        aw[aA] = aM;
                        return
                    }
                    b4 = s.t * s.c[$.g + ay - b7] + s.c[$.g + as - ay]
                } else {
                    aM = ay > as && ay > ae || ay < as && ay < ae ? b6 + ai + 2 * ay >>> 2 : ai + b6 >>> 1;
                    b4 = s.t * s.c[$.g + ay - as] + s.c[$.g + as - ai]
                }
                a1 = aD(b4);
                var aL = X(m);
                if (aL < $.n - s.v - 1) {
                    var ad = o(h[a1][0], h[a1][1]);
                    ar = k(m, ad) + (aL << ad)
                } else {
                    ar = k(m, s.v) + 1
                }
                ar = ar & 1 ? -1 - (ar >>> 1) : ar >>> 1;
                h[a1][0] += aD(ar);
                if (h[a1][1] == $.f) {
                    h[a1][0] >>>= 1;
                    h[a1][1] >>>= 1
                }
                h[a1][1]++;
                aM = b4 < 0 ? aM - ar : aM + ar;
                if ($.i) {
                    if (aM < 0) aM += s.w;
                    else if (aM > $.g) aM -= s.w
                }
                aw[aA] = aM >= 0 ? Math.min(aM, $.g) : 0
            }

            function a5($, s, m) {
                var f = $[0].length;
                for (var aU = s; aU <= m; aU++) {
                    $[aU][0] = $[aU - 1][1];
                    $[aU][f - 1] = $[aU - 1][f - 2]
                }
            }

            function S($) {
                a5($, a, T);
                a5($, C, p);
                a5($, E, r)
            }

            function U($, s, m, f, aU, O, h, w, aA, aP, b1, ab, ar) {
                var b4 = 0,
                    a1 = 1,
                    aw = aU < i && aU > p;
                while (a1 < $.m) {
                    if (b4 < $.m) {
                        t($, s, m, f, aU, b4, h[aA], $.h && (aw && aP || !aw && (b1 || (b4 & ab) == ar)));
                        t($, s, m, f, O, b4, h[aA], $.h && (!aw && aP || aw && (b1 || (b4 & ab) == ar)));
                        b4 += 2
                    }
                    if (b4 > 8) {
                        t($, s, m, f, aU, a1, w[aA]);
                        t($, s, m, f, O, a1, w[aA]);
                        a1 += 2
                    }
                }
                S(f)
            }

            function B($, s, m, f, aU, O) {
                U($, s, m, f, C, a, aU, O, 0, 0, 1, 0, 8);
                U($, s, m, f, q, E, aU, O, 1, 0, 1, 0, 8);
                U($, s, m, f, g, R, aU, O, 2, 1, 0, 3, 0);
                U($, s, m, f, d, G, aU, O, 0, 0, 0, 3, 2);
                U($, s, m, f, p, Q, aU, O, 1, 0, 0, 3, 2);
                U($, s, m, f, T, r, aU, O, 2, 1, 0, 3, 0)
            }

            function aQ($, s, m, f, aU, O) {
                var h = O.length,
                    w = $.l;
                if (aU + 1 == $.s) w = $.e - aU * $.l;
                var aA = 6 * $.e * f + aU * $.l;
                for (var aP = 0; aP < 6; aP++) {
                    for (var b1 = 0; b1 < w; b1++) {
                        var ab = O[aP % h][b1 % h],
                            ar;
                        if (ab == 0) {
                            ar = C + (aP >>> 1)
                        } else if (ab == 2) {
                            ar = E + (aP >>> 1)
                        } else {
                            ar = a + aP
                        }
                        var b4 = $.h ? (b1 * 2 / 3 & 2147483646 | b1 % 3 & 1) + (b1 % 3 >>> 1) : b1 >>> 1;
                        s[aA + b1] = m[ar][b4 + 1]
                    }
                    aA += $.e
                }
            }
            b._decompressRAF = function($, s) {
                var m = l($),
                    f = v($, m),
                    aU = I(m),
                    O = new Int16Array(m.e * m.q);
                if (s == null) {
                    s = m.h ? [
                        [1, 1, 0, 1, 1, 2],
                        [1, 1, 2, 1, 1, 0],
                        [2, 0, 1, 0, 2, 1],
                        [1, 1, 2, 1, 1, 0],
                        [1, 1, 0, 1, 1, 2],
                        [0, 2, 1, 2, 0, 1]
                    ] : [
                        [0, 1],
                        [3, 2]
                    ]
                }
                var h = [
                        [c, g],
                        [V, p],
                        [N, Q],
                        [F, T],
                        [i, G],
                        [W, r]
                    ],
                    w = [];
                for (var aA = 0; aA < M; aA++) {
                    w[aA] = new Uint16Array(m.A)
                }
                for (var aP = 0; aP < m.s; aP++) {
                    var b1 = e(aU),
                        ab = e(aU);
                    for (var aA = 0; aA < M; aA++) {
                        for (var ar = 0; ar < m.A; ar++) {
                            w[aA][ar] = 0
                        }
                    }
                    for (var b4 = 0; b4 < m.d; b4++) {
                        B(m, aU, f[aP], w, b1, ab);
                        for (var aA = 0; aA < 6; aA++) {
                            for (var ar = 0; ar < m.A; ar++) {
                                w[h[aA][0]][ar] = w[h[aA][1]][ar]
                            }
                        }
                        aQ(m, O, w, b4, aP, s);
                        for (var aA = C; aA < M; aA++) {
                            if ([N, F, i, W].indexOf(aA) == -1) {
                                for (var ar = 0; ar < m.A; ar++) {
                                    w[aA][ar] = 0
                                }
                            }
                        }
                        S(w)
                    }
                }
                return O
            }
        }())
    }(b, bb));

    return b;
}())
