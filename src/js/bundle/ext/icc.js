var ICC = function() {
	var C = new Int16Array(1),
		v = new Uint8Array(C.buffer);

	function D(h, M) {
		return h[M] << 8 | h[M + 1]
	}

	function Q(h, M) {
		v[0] = h[M + 1];
		v[1] = h[M];
		return C[0]
	}

	function q(h, M) {
		return h[M] << 24 | h[M + 1] << 16 | h[M + 2] << 8 | h[M + 3]
	}

	function i(h, M, x) {
		var c = "";
		for (var d = 0; d < x; d++) c += String.fromCharCode(h[M + d]);
		return c
	}

	function J(h, M, x) {
		var c = [];
		for (var d = 0; d < x; d++) c.push(String.fromCharCode(h[M + d]));
		return c
	}

	function I(h, M, x) {
		var c = "";
		for (var d = 0; d < x; d++) {
			var s = h[M++] << 8 | h[M++];
			c += String.fromCharCode(s)
		}
		return c
	}

	function K(h) {
		var M = new Uint8Array(h),
			x = E(M, 128);
		if (x == null) return null;
		return {
			header: U(M, 0),
			tags: x
		}
	}

	function U(h, M) {
		var x = i,
			c = q,
			d = {
				cmmType: x(h, 4, 4),
				version: h[8] + "." + (h[9] >>> 4) + "." + (h[9] & 15),
				profileClass: x(h, 12, 4),
				spaceIn: x(h, 16, 4),
				spaceOut: x(h, 20, 4),
				date: D(h, 24),
				platform: x(h, 40, 4),
				flags: c(h, 44),
				deviceManufac: x(h, 48, 4),
				deviceModel: c(h, 52),
				deviceAttribs: [c(h, 56), c(h, 60)],
				rendIntent: c(h, 64),
				illuminant: e(h, 68),
				creator: x(h, 80, 4)
			};
		for (var s = 0; s < 5; s++) d.date += "." + D(h, 26 + 2 * s);
		return d
	}

	function E(h, M) {
		var x = q,
			c = {},
			d = x(h, M);
		M += 4;
		if (d > 100) return null;
		for (var s = 0; s < d; s++) {
			var y = i(h, M, 4);
			M += 4;
			var P = x(h, M);
			M += 4;
			var m = x(h, M);
			M += 4;
			c[y] = z(h, P, m)
		}
		return c
	}

	function z(h, M, x) {
		var c = i(h, M, 4),
			d = {
				w: c,
				e: x
			};
		M += 4;
		M += 4;
		if (c == "mluc") {
			var s = [];
			for (var y = 0; y < x; y++) s.push(h[M - 8 + y])
		}
		if (c == "mluc") L(d, h, M, x);
		else if (c == "text") o(d, h, M, x);
		else if (c == "desc") A(d, h, M, x);
		else if (c == "mAB ") j(d, h, M, x);
		else if (c == "mft1") N(d, h, M, x);
		else if (c == "mft2") r(d, h, M, x);
		else if (c == "XYZ ") n(d, h, M, x);
		else if (c == "para") O(d, h, M, x);
		else if (c == "curv") B(d, h, M, x);
		else if (c == "sf32") k(d, h, M, x);
		if ((d.e & 3) != 0) d.e += 4 - (d.e & 3);
		return d
	}

	function L(h, M, x, c) {
		var d = x - 8,
			s = q(M, x);
		x += 4;
		var y = q(M, x);
		x += 4;
		h.h = [];
		for (var P = 0; P < s; P++) {
			var m = {};
			h.h.push(m);
			m.code = i(M, x, 4);
			var u = q(M, x + 4),
				R = q(M, x + 8);
			x += 12;
			m.text = I(M, d + R, u >>> 1)
		}
	}

	function A(h, M, x, c) {
		var d = q(M, x);
		x += 4;
		h.g = i(M, x, d - 1);
		x += d;
		var s = q(M, x);
		x += 4;
		var y = q(M, x);
		x += 4;
		h.m = I(M, x, y);
		x += y;
		var P = D(M, x);
		x += 2;
		var m = M[x];
		x++;
		h.z = i(M, x, m)
	}

	function j(h, M, x, c) {
		var d = x - 8;
		h.s = M[x];
		x++;
		h.F = M[x];
		x++;
		x += 2;
		var s = q(M, x);
		x += 4;
		var y = q(M, x);
		x += 4;
		var P = q(M, x);
		x += 4;
		var m = q(M, x);
		x += 4;
		var u = q(M, x);
		x += 4;
		if (s != 0) {
			h.u = [];
			x = d + s;
			for (var R = 0; R < h.F; R++) {
				var t = z(M, x, 0);
				x += t.e;
				h.u.push(t)
			}
		}
		if (y != 0) {
			h.G = [];
			for (var R = 0; R < 12; R++) h.G.push(g(M, d + y + R * 4))
		}
		if (P != 0) {
			h.J = [];
			x = d + P;
			for (var R = 0; R < h.F; R++) {
				var t = z(M, x, 0);
				x += t.e;
				h.J.push(t)
			}
		}
		if (m != 0) {
			h.j = [];
			x = d + m;
			h.C = [];
			for (var R = 0; R < h.s; R++) h.C.push(M[x + R]);
			x += 16;
			var f = M[x];
			x += 4;
			var H = h.F;
			for (var R = 0; R < h.s; R++) H *= h.C[R];
			if (f == 1)
				for (var R = 0; R < H; R++) h.j.push(M[x + R] * (1 / 255));
			if (f == 2)
				for (var R = 0; R < H; R++) h.j.push(D(M, x + 2 * R) * (1 / 65535))
		}
		if (u != 0) {
			h.p = [];
			x = d + u;
			for (var R = 0; R < h.s; R++) {
				var t = z(M, x, 0);
				x += t.e;
				h.p.push(t)
			}
		}
	}

	function N(h, M, x, c) {
		a(h, M, x);
		x += 40;
		h.r = G(M, x, h.s, 256);
		x += h.s * 256;
		h.j = [];
		var d = Math.round(Math.pow(h.H, h.s)) * h.F;
		for (var s = 0; s < d; s++) h.j.push(M[x + s] * (1 / 255));
		x += d;
		h.n = G(M, x, h.F, 256);
		x += h.F * 256
	}

	function r(h, M, x, c) {
		a(h, M, x);
		x += 40;
		var d = D(M, x);
		x += 2;
		var s = D(M, x);
		x += 2;
		h.r = b(M, x, h.s, d);
		x += 2 * h.s * d;
		h.j = [];
		var y = Math.round(Math.pow(h.H, h.s)) * h.F;
		for (var P = 0; P < y; P++) h.j.push(D(M, x + P * 2) * (1 / 65535));
		x += y * 2;
		h.n = b(M, x, h.F, s);
		x += 2 * h.F * s
	}

	function a(h, M, x) {
		h.s = M[x];
		x++;
		h.F = M[x];
		x++;
		h.H = M[x];
		x++;
		x++;
		h.G = [];
		for (var c = 0; c < 9; c++) {
			h.G.push(g(M, x));
			x += 4
		}
	}

	function G(h, M, x, c) {
		var d = [];
		for (var s = 0; s < x; s++) {
			var y = [];
			d.push(y);
			for (var P = 0; P < c; P++) {
				y.push(h[M] * (1 / 255));
				M++
			}
		}
		return d
	}

	function b(h, M, x, c) {
		var d = [];
		for (var s = 0; s < x; s++) {
			var y = [];
			d.push(y);
			for (var P = 0; P < c; P++) {
				y.push(D(h, M) * (1 / 65535));
				M += 2
			}
		}
		return d
	}

	function O(h, M, x, c) {
		h.K = D(M, x);
		x += 2;
		x += 2;
		var d = [1, 3, 4, 5, 7];
		h.h = [];
		for (var s = 0; s < d[h.K]; s++) h.h.push(g(M, x + s * 4))
	}

	function B(h, M, x, c) {
		var d = q(M, x);
		x += 4;
		h.h = [];
		if (d == 1) h.h.push(w(M, x));
		else
			for (var s = 0; s < d; s++) h.h.push(D(M, x + s * 2) * (1 / 65535));
		h.e = 12 + 2 * d
	}

	function n(h, M, x) {
		h.value = e(M, x)
	}

	function o(h, M, x, c) {
		h.value = i(M, x, c - 9)
	}

	function w(h, M) {
		return h[M] + h[M + 1] / 256
	}

	function g(h, M) {
		return Q(h, M) + D(h, M + 2) * (1 / 65536)
	}

	function e(h, M) {
		var x = [];
		for (var c = 0; c < 3; c++) x.push(g(h, M + c * 4));
		return x
	}

	function k(h, M, x, c) {
		var d = c / 4 - 2;
		h.value = [];
		for (var s = 0; s < d; s++) h.value.push(g(M, x + s * 4))
	}
	return {
		R: K
	}
	}();
	ICC.U = function() {
		var C = [.9642, 1, .8249],
			v = {
				b: [3.1338561, -1.6168667, -.4906146, -.9787684, 1.9161415, .033454, .0719453, -.2289914, 1.4052427],
				k: [.4360747, .3850649, .14308038, .2225045, .7168786, .0606169, .0139322, .0971045, .7141733],
				d: function(o) {
					return o < .0031308 ? 12.92 * o : 1.055 * Math.pow(o, 1 / 2.4) - .055
				},
				a: function(o) {
					return o < .04045 ? o / 12.92 : Math.pow((o + .055) / 1.055, 2.4)
				},
				q: function(o, w, g) {
					var e = v.t[0],
						k = v.t[1];
					o = e[~~(.5 + o * 4e3)];
					w = e[~~(.5 + w * 4e3)];
					g = e[~~(.5 + g * 4e3)];
					var M = v.k,
						x = M[0] * o + M[1] * w + M[2] * g,
						c = M[3] * o + M[4] * w + M[5] * g,
						d = M[6] * o + M[7] * w + M[8] * g;
					return v.f(x, c, d)
				},
				f: function(o, w, g, e) {
					if (e == null) e = C;
					o = o * (1 / e[0]);
					w = w * (1 / e[1]);
					g = g < 0 ? 0 : g * (1 / e[2]);
					var k = v.t[1],
						M = k[~~(.5 + o * 4e3)],
						x = k[~~(.5 + w * 4e3)],
						c = k[~~(.5 + g * 4e3)];
					return {
						v: 116 * x - 16,
						c: 500 * (M - x),
						D: 200 * (x - c)
					}
				},
				l: function(o, w, g, e) {
					if (e == null) e = C;
					var k = 903.3,
						M = .008856,
						x = (o + 16) / 116,
						c = x * x * x,
						d = x - g / 200,
						s = d * d * d,
						y = w / 500 + x,
						P = y * y * y,
						m = s > M ? s : (116 * d - 16) / k,
						R = c > M ? c : (116 * x - 16) / k,
						t = P > M ? P : (116 * y - 16) / k,
						f = t * e[0],
						H = R * e[1],
						g = m * e[2],
						F = v.b,
						p = [F[0] * f + F[1] * H + F[2] * g, F[3] * f + F[4] * H + F[5] * g, F[6] * f + F[7] * H + F[8] * g];
					for (var S = 0; S < 3; S++) p[S] = Math.max(0, Math.min(1, v.d(p[S])));
					return {
						I: p[0],
						H: p[1],
						D: p[2]
					}
				}
			};
		v.t = function() {
			var o = [],
				w = [];
			for (var g = 0; g < 8e3; g++) {
				var e = g / 4e3;
				o[g] = v.a(e);
				w[g] = e > .008856 ? Math.pow(e, 1 / 3) : (903.3 * e + 16) * (1 / 116)
			}
			return [o, w]
		}();

		function D(o, w, g) {
			var e = 1 / (o - 1),
				k = [],
				M = [];
			for (var x = 0; x < o; x++)
				for (var c = 0; c < o; c++)
					for (var d = 0; d < o; d++) {
						if (w == 3) {
							k.push([x * e, c * e, d * e, 0]);
							M.push(0, 0, 0);
							if (g == 4) M.push(0)
						} else
							for (var s = 0; s < o; s++) {
								k.push([x * e, c * e, d * e, s * e]);
								M.push(0, 0, 0);
								if (g == 4) M.push(0)
							}
					}
			return [k, M]
		}

		function Q(o, w, g) {
			var e = o.tags,
				k = o.header,
				M = k.spaceIn.toLowerCase(),
				x = k.spaceOut.toLowerCase();
			if (g) {
				var c = M;
				M = x;
				x = c
			}
			var d = M == "cmyk" ? 4 : 3,
				s = x == "cmyk" ? 4 : 3,
				y = D(w, d, s),
				P = y[0],
				m = y[1],
				u = e.wtpt ? e.wtpt.value : null;
			if (M == "cmyk") u = null;
			var R = g ? "B2A0" : "A2B0";
			for (var f = 0; f < P.length; f++) {
				var H = P[f];
				if (M == "rgb ") {} else if (M == "cmyk") {} else if (M == "lab ") q(H, 0, v.q(H[0], H[1], H[2]));
				else throw M;
				if (e.rTRC) {
					var F = e.rTRC,
						p = e.gTRC,
						S = e.bTRC;
					E(H, F, p, S)
				}
				if (e.rXYZ) {
					var F = e.rXYZ.value,
						p = e.gXYZ.value,
						S = e.bXYZ.value;
					K(H, F, p, S)
				}
				if (e[R]) {
					var V = e[R],
						l = V.w;
					if (l == "mAB ") J(H, V);
					else if (l == "mft1" || l == "mft2") i(H, V);
					else throw l
				}
				if (x == "rgb ") {} else if (x == "xyz " || x == "lab ") {
					if (x == "xyz ") q(H, 0, v.f(H[0], H[1], H[2], u));
					var T = v.l(H[0] * 100, -127.5 + 255 * H[1], -127.5 + 255 * H[2], u);
					H[0] = T.I;
					H[1] = T.H;
					H[2] = T.D
				} else if (x == "cmyk") {} else throw x;
				m[f * s] = H[0];
				m[f * s + 1] = H[1];
				m[f * s + 2] = H[2];
				if (s == 4) m[f * s + 3] = H[3]
			}
			return m
		}

		function q(o, w, g) {
			o[w] = g.v / 100;
			o[w + 1] = (127.5 + g.c) / 255;
			o[w + 2] = (127.5 + g.D) / 255
		}

		function i(o, w) {
			for (var g = 0; g < w.s; g++) o[g] = L(o[g], w.r[g]);
			if (w.s == 3) {
				if (w.F == 3) G(w.j, w.H, o, o);
				if (w.F == 4) a(w.j, w.H, o, o)
			}
			if (w.s == 4) O(w.j, w.H, o, o);
			if (w.n)
				for (var g = 0; g < w.F; g++) o[g] = L(o[g], w.n[g])
		}

		function J(o, w) {
			if (w.j) G(w.j, w.C[0], o, o);
			if (w.J) E(o, w.J[0], w.J[1], w.J[2]);
			if (w.G) I(o, w.G)
		}

		function I(o, w) {
			var g = o[0],
				e = o[1],
				k = o[2];
			o[0] = Math.max(0, Math.min(1, w[0] * g + w[1] * e + w[2] * k + w[9]));
			o[1] = Math.max(0, Math.min(1, w[3] * g + w[4] * e + w[5] * k + w[10]));
			o[2] = Math.max(0, Math.min(1, w[6] * g + w[7] * e + w[8] * k + w[11]))
		}

		function K(o, w, g, e) {
			var k = o[0],
				M = o[1],
				x = o[2];
			o[0] = k * w[0] + M * g[0] + x * e[0];
			o[1] = k * w[1] + M * g[1] + x * e[1];
			o[2] = k * w[2] + M * g[2] + x * e[2]
		}

		function U(o, w, g) {
			var e = o[w],
				k = o[w + 1],
				M = o[w + 2];
			o[w] = e * g[0] + k * g[1] + M * g[2];
			o[w + 1] = e * g[3] + k * g[4] + M * g[5];
			o[w + 2] = e * g[6] + k * g[7] + M * g[8]
		}

		function E(o, w, g, e) {
			o[0] = z(o[0], w);
			o[1] = z(o[1], g);
			o[2] = z(o[2], e)
		}

		function z(o, w) {
			var g = w.w,
				e = w.h;
			if (g == "curv") return L(o, e);
			else if (g == "para") return A(o, e);
			else throw g
		}

		function L(o, w) {
			var g = w.length;
			if (g == 0) return o;
			if (g == 1) return Math.pow(o, w[0]);
			var e = o * (g - 1) * .9999999,
				k = ~~e,
				M = e - k;
			return (1 - M) * w[k] + M * w[k + 1]
		}

		function A(o, w) {
			var g = w.length,
				e = o,
				k = w[0],
				M = w[1],
				x = w[2],
				c = w[3],
				d = w[4],
				s = w[5],
				y = w[6];
			if (g == 1) e = Math.pow(o, k);
			else if (g == 3) e = o >= -x / M ? Math.pow(M * o + x, k) : 0;
			else if (g == 4) e = o >= -x / M ? Math.pow(M * o + x, k) + c : c;
			else if (g == 5) e = o >= d ? Math.pow(M * o + x, k) : c * o;
			else if (g == 7) e = o >= d ? Math.pow(M * o + x, k) + s : c * o + y;
			return e
		}

		function j(o, w, g, e, k, M, x) {
			var c = ~~o,
				d = ~~w,
				s = ~~g,
				y = e * e,
				P = s + e * d + e * e * c,
				m = s + e * (d + 1) + e * e * c;
			N(P, P + 1, x, k, g - s, 0, M);
			N(m, m + 1, x, k, g - s, 1, M);
			N(P + y, P + 1 + y, x, k, g - s, 2, M);
			N(m + y, m + 1 + y, x, k, g - s, 3, M);
			N(0, 1, x, M, w - d, 0, M);
			N(2, 3, x, M, w - d, 2, M);
			N(0, 2, x, M, o - c, 0, M)
		}

		function N(o, w, g, e, k, M, x) {
			var c = 1 - k;
			o *= g;
			w *= g;
			M *= g;
			x[M + 0] = c * e[o] + k * e[w];
			x[M + 1] = c * e[o + 1] + k * e[w + 1];
			x[M + 2] = c * e[o + 2] + k * e[w + 2];
			if (g == 4) x[M + 3] = c * e[o + 3] + k * e[w + 3]
		}

		function r(o, w) {
			function g(d) {
				return d < 0 ? 0 : d > 1 ? 1 : d
			}
			var e = w * w * w,
				k = new Uint8Array(e * 4);
			for (var M = 0; M < e; M++) {
				var x = M * 3,
					c = x + M;
				k[c] = ~~(.5 + g(o[x]) * 255);
				k[c + 1] = ~~(.5 + g(o[x + 1]) * 255);
				k[c + 2] = ~~(.5 + g(o[x + 2]) * 255);
				k[c + 3] = 255
			}
			return k
		}

		function a(o, w, g, e) {
			var k = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				M = w - 1.000001;
			j(M * g[0], M * g[1], M * g[2], w, o, k, 4);
			e[0] = k[0];
			e[1] = k[1];
			e[2] = k[2];
			e[3] = k[3]
		}

		function G(o, w, g, e, k) {
			var M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				x = w - 1.000001,
				c = 0,
				d = g.length,
				s = k ? 4 : 3;
			if (k) x /= 255;
			for (var y = c; y < d; y += s) {
				j(x * g[y], x * g[y + 1], x * g[y + 2], w, o, M, 3);
				if (k) {
					e[y] = ~~(.5 + M[0] * 255);
					e[y + 1] = ~~(.5 + M[1] * 255);
					e[y + 2] = ~~(.5 + M[2] * 255)
				} else {
					e[y] = M[0];
					e[y + 1] = M[1];
					e[y + 2] = M[2]
				}
			}
		}

		function b(o, w, g, e) {
			G(o, w, g, e, !0)
		}

		function O(o, w, g, e, k) {
			var M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				x = w - 1.000001,
				c = 0,
				d = g.length,
				s = w * w * w;
			if (k) x /= 255;
			for (var y = c; y < d; y += 4) {
				var P = x * g[y],
					m = x * g[y + 1],
					u = x * g[y + 2],
					R = x * g[y + 3],
					f = ~~P;
				j(m, u, R + f * s, w, o, M, 3);
				M[12] = M[0];
				M[13] = M[1];
				M[14] = M[2];
				j(m, u, R + (f + 1) * s, w, o, M, 3);
				N(4, 0, 3, M, P - f, 0, M);
				if (k) {
					e[y] = ~~(.5 + M[0] * 255);
					e[y + 1] = ~~(.5 + M[1] * 255);
					e[y + 2] = ~~(.5 + M[2] * 255)
				} else {
					var H = (y >>> 2) * 3;
					e[H] = M[0];
					e[H + 1] = M[1];
					e[H + 2] = M[2]
				}
			}
		}

		function B(o, w, g, e) {
			O(o, w, g, e, !0)
		}

		function n(o) {
			var w = o.tags.desc;
			if (w.g) return w.g;
			return w.h[0].text
		}
		return {
			lutToRGBA8: r,
			sampleLUT: Q,
			applyLUT: b,
			applyLUT4: B,
			applyLUTFloat: G,
			applyLUT4Float: O,
			applyLUT3to4Float: a,
			profileName: n
		}
	}()
	/*
	 * [js-sha1]{@link https://github.com/emn178/js-sha1}
	 *
	 * @version 0.6.0
	 * @author Chen, Yi-Cyuan [emn178@gmail.com]
	 * @copyright Chen, Yi-Cyuan 2014-2017
	 * @license MIT
	 */
	! function() {
		"use strict";

		function t(t) {
			t ? (f[0] = f[16] = f[1] = f[2] = f[3] = f[4] = f[5] = f[6] = f[7] = f[8] = f[9] = f[10] = f[11] = f[12] = f[13] = f[14] = f[15] = 0, this.blocks = f) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, this.h4 = 3285377520, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0
		}
		var h = "object" == typeof window ? window : {},
			s = !h.JS_SHA1_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
		s && (h = global);
		var i = !h.JS_SHA1_NO_COMMON_JS && "object" == typeof module && module.exports,
			e = "function" == typeof define && define.amd,
			r = "0123456789abcdef".split(""),
			o = [-2147483648, 8388608, 32768, 128],
			n = [24, 16, 8, 0],
			a = ["hex", "array", "digest", "arrayBuffer"],
			f = [],
			u = function(h) {
				return function(s) {
					return new t(!0).update(s)[h]()
				}
			},
			c = function() {
				var h = u("hex");
				s && (h = p(h)), h.create = function() {
					return new t
				}, h.update = function(t) {
					return h.create().update(t)
				};
				for (var i = 0; i < a.length; ++i) {
					var e = a[i];
					h[e] = u(e)
				}
				return h
			},
			p = function(t) {
				// var h = eval("require('crypto')"),
				// 	s = eval("require('buffer').Buffer"),
				// 	i = function(i) {
				// 		if ("string" == typeof i) return h.createHash("sha1").update(i, "utf8").digest("hex");
				// 		if (i.constructor === ArrayBuffer) i = new Uint8Array(i);
				// 		else if (void 0 === i.length) return t(i);
				// 		return h.createHash("sha1").update(new s(i)).digest("hex")
				// 	};
				// return i
				return t.sha1();
			};
		t.prototype.update = function(t) {
			if (!this.finalized) {
				var s = "string" != typeof t;
				s && t.constructor === h.ArrayBuffer && (t = new Uint8Array(t));
				for (var i, e, r = 0, o = t.length || 0, a = this.blocks; r < o;) {
					if (this.hashed && (this.hashed = !1, a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0), s)
						for (e = this.start; r < o && e < 64; ++r) a[e >> 2] |= t[r] << n[3 & e++];
					else
						for (e = this.start; r < o && e < 64; ++r)(i = t.charCodeAt(r)) < 128 ? a[e >> 2] |= i << n[3 & e++] : i < 2048 ? (a[e >> 2] |= (192 | i >> 6) << n[3 & e++], a[e >> 2] |= (128 | 63 & i) << n[3 & e++]) : i < 55296 || i >= 57344 ? (a[e >> 2] |= (224 | i >> 12) << n[3 & e++], a[e >> 2] |= (128 | i >> 6 & 63) << n[3 & e++], a[e >> 2] |= (128 | 63 & i) << n[3 & e++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(++r)), a[e >> 2] |= (240 | i >> 18) << n[3 & e++], a[e >> 2] |= (128 | i >> 12 & 63) << n[3 & e++], a[e >> 2] |= (128 | i >> 6 & 63) << n[3 & e++], a[e >> 2] |= (128 | 63 & i) << n[3 & e++]);
					this.lastByteIndex = e, this.bytes += e - this.start, e >= 64 ? (this.block = a[16], this.start = e - 64, this.hash(), this.hashed = !0) : this.start = e
				}
				return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
			}
		}, t.prototype.finalize = function() {
			if (!this.finalized) {
				this.finalized = !0;
				var t = this.blocks,
					h = this.lastByteIndex;
				t[16] = this.block, t[h >> 2] |= o[3 & h], this.block = t[16], h >= 56 && (this.hashed || this.hash(), t[0] = this.block, t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.hBytes << 3 | this.bytes >>> 29, t[15] = this.bytes << 3, this.hash()
			}
		}, t.prototype.hash = function() {
			var t, h, s = this.h0,
				i = this.h1,
				e = this.h2,
				r = this.h3,
				o = this.h4,
				n = this.blocks;
			for (t = 16; t < 80; ++t) h = n[t - 3] ^ n[t - 8] ^ n[t - 14] ^ n[t - 16], n[t] = h << 1 | h >>> 31;
			for (t = 0; t < 20; t += 5) s = (h = (i = (h = (e = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (i & e | ~i & r) + o + 1518500249 + n[t] << 0) << 5 | o >>> 27) + (s & (i = i << 30 | i >>> 2) | ~s & e) + r + 1518500249 + n[t + 1] << 0) << 5 | r >>> 27) + (o & (s = s << 30 | s >>> 2) | ~o & i) + e + 1518500249 + n[t + 2] << 0) << 5 | e >>> 27) + (r & (o = o << 30 | o >>> 2) | ~r & s) + i + 1518500249 + n[t + 3] << 0) << 5 | i >>> 27) + (e & (r = r << 30 | r >>> 2) | ~e & o) + s + 1518500249 + n[t + 4] << 0, e = e << 30 | e >>> 2;
			for (; t < 40; t += 5) s = (h = (i = (h = (e = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (i ^ e ^ r) + o + 1859775393 + n[t] << 0) << 5 | o >>> 27) + (s ^ (i = i << 30 | i >>> 2) ^ e) + r + 1859775393 + n[t + 1] << 0) << 5 | r >>> 27) + (o ^ (s = s << 30 | s >>> 2) ^ i) + e + 1859775393 + n[t + 2] << 0) << 5 | e >>> 27) + (r ^ (o = o << 30 | o >>> 2) ^ s) + i + 1859775393 + n[t + 3] << 0) << 5 | i >>> 27) + (e ^ (r = r << 30 | r >>> 2) ^ o) + s + 1859775393 + n[t + 4] << 0, e = e << 30 | e >>> 2;
			for (; t < 60; t += 5) s = (h = (i = (h = (e = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (i & e | i & r | e & r) + o - 1894007588 + n[t] << 0) << 5 | o >>> 27) + (s & (i = i << 30 | i >>> 2) | s & e | i & e) + r - 1894007588 + n[t + 1] << 0) << 5 | r >>> 27) + (o & (s = s << 30 | s >>> 2) | o & i | s & i) + e - 1894007588 + n[t + 2] << 0) << 5 | e >>> 27) + (r & (o = o << 30 | o >>> 2) | r & s | o & s) + i - 1894007588 + n[t + 3] << 0) << 5 | i >>> 27) + (e & (r = r << 30 | r >>> 2) | e & o | r & o) + s - 1894007588 + n[t + 4] << 0, e = e << 30 | e >>> 2;
			for (; t < 80; t += 5) s = (h = (i = (h = (e = (h = (r = (h = (o = (h = s << 5 | s >>> 27) + (i ^ e ^ r) + o - 899497514 + n[t] << 0) << 5 | o >>> 27) + (s ^ (i = i << 30 | i >>> 2) ^ e) + r - 899497514 + n[t + 1] << 0) << 5 | r >>> 27) + (o ^ (s = s << 30 | s >>> 2) ^ i) + e - 899497514 + n[t + 2] << 0) << 5 | e >>> 27) + (r ^ (o = o << 30 | o >>> 2) ^ s) + i - 899497514 + n[t + 3] << 0) << 5 | i >>> 27) + (e ^ (r = r << 30 | r >>> 2) ^ o) + s - 899497514 + n[t + 4] << 0, e = e << 30 | e >>> 2;
			this.h0 = this.h0 + s << 0, this.h1 = this.h1 + i << 0, this.h2 = this.h2 + e << 0, this.h3 = this.h3 + r << 0, this.h4 = this.h4 + o << 0
		}, t.prototype.hex = function() {
			this.finalize();
			var t = this.h0,
				h = this.h1,
				s = this.h2,
				i = this.h3,
				e = this.h4;
			return r[t >> 28 & 15] + r[t >> 24 & 15] + r[t >> 20 & 15] + r[t >> 16 & 15] + r[t >> 12 & 15] + r[t >> 8 & 15] + r[t >> 4 & 15] + r[15 & t] + r[h >> 28 & 15] + r[h >> 24 & 15] + r[h >> 20 & 15] + r[h >> 16 & 15] + r[h >> 12 & 15] + r[h >> 8 & 15] + r[h >> 4 & 15] + r[15 & h] + r[s >> 28 & 15] + r[s >> 24 & 15] + r[s >> 20 & 15] + r[s >> 16 & 15] + r[s >> 12 & 15] + r[s >> 8 & 15] + r[s >> 4 & 15] + r[15 & s] + r[i >> 28 & 15] + r[i >> 24 & 15] + r[i >> 20 & 15] + r[i >> 16 & 15] + r[i >> 12 & 15] + r[i >> 8 & 15] + r[i >> 4 & 15] + r[15 & i] + r[e >> 28 & 15] + r[e >> 24 & 15] + r[e >> 20 & 15] + r[e >> 16 & 15] + r[e >> 12 & 15] + r[e >> 8 & 15] + r[e >> 4 & 15] + r[15 & e]
		}, t.prototype.toString = t.prototype.hex, t.prototype.digest = function() {
			this.finalize();
			var t = this.h0,
				h = this.h1,
				s = this.h2,
				i = this.h3,
				e = this.h4;
			return [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
		}, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function() {
			this.finalize();
			var t = new ArrayBuffer(20),
				h = new DataView(t);
			return h.setUint32(0, this.h0), h.setUint32(4, this.h1), h.setUint32(8, this.h2), h.setUint32(12, this.h3), h.setUint32(16, this.h4), t
		};
		var y = c();
		i ? module.exports = y : (h.sha1 = y, e && define(function() {
			return y
		}))
}();
