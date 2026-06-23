
var UZIP = {};
(function() {
	var u = {
			B: function(O, v) {
				return O[v] | O[v + 1] << 8
			},
			W: function(O, v, I) {
				O[v] = I & 255;
				O[v + 1] = I >> 8 & 255
			},
			c: function(O, v) {
				return O[v + 3] * (256 * 256 * 256) + (O[v + 2] << 16 | O[v + 1] << 8 | O[v])
			},
			N: function(O, v, I) {
				O[v] = I & 255;
				O[v + 1] = I >> 8 & 255;
				O[v + 2] = I >> 16 & 255;
				O[v + 3] = I >> 24 & 255
			},
			T: function(O, v, I) {
				var n = "";
				for (var w = 0; w < I; w++) n += String.fromCharCode(O[v + w]);
				return n
			},
			i: function(O, v, I) {
				for (var n = 0; n < I.length; n++) O[v + n] = I.charCodeAt(n)
			},
			s: function(O) {
				return O.length < 2 ? "0" + O : O
			},
			H: function(O, v, I) {
				var n = [199, 252, 233, 226, 228, 224, 229, 231, 234, 235, 232, 239, 238, 236, 196, 197, 201, 230, 198, 244, 246, 242, 251, 249, 255, 214, 220, 162, 163, 165, 167, 402, 225, 237, 243, 250, 241, 209, 170, 186, 191, 8976, 172, 189, 188, 161, 171, 187],
					N = "";
				for (var w = 0; w < I; w++) {
					var D = O[v + w];
					if (D < 128) D = D;
					else if (D < 176) D = n[D - 128];
					else D = 32;
					N += String.fromCharCode(D)
				}
				return N
			},
			q: function(O, v, I) {
				var n = "",
					w;
				for (var D = 0; D < I; D++) n += "%" + u.s(O[v + D].toString(16));
				try {
					w = decodeURIComponent(n)
				} catch (S) {
					return u.T(O, v, I)
				}
				return w
			},
			b: function(O, v, I) {
				var n = I.length,
					N = 0;
				for (var w = 0; w < n; w++) {
					var D = I.charCodeAt(w);
					if ((D & 4294967295 - (1 << 7) + 1) == 0) {
						O[v + N] = D;
						N++
					} else if ((D & 4294967295 - (1 << 11) + 1) == 0) {
						O[v + N] = 192 | D >> 6;
						O[v + N + 1] = 128 | D >> 0 & 63;
						N += 2
					} else if ((D & 4294967295 - (1 << 16) + 1) == 0) {
						O[v + N] = 224 | D >> 12;
						O[v + N + 1] = 128 | D >> 6 & 63;
						O[v + N + 2] = 128 | D >> 0 & 63;
						N += 3
					} else if ((D & 4294967295 - (1 << 21) + 1) == 0) {
						O[v + N] = 240 | D >> 18;
						O[v + N + 1] = 128 | D >> 12 & 63;
						O[v + N + 2] = 128 | D >> 6 & 63;
						O[v + N + 3] = 128 | D >> 0 & 63;
						N += 4
					} else throw "e"
				}
				return N
			},
			n: function(O) {
				var v = O.length,
					I = 0;
				for (var n = 0; n < v; n++) {
					var N = O.charCodeAt(n);
					if ((N & 4294967295 - (1 << 7) + 1) == 0) {
						I++
					} else if ((N & 4294967295 - (1 << 11) + 1) == 0) {
						I += 2
					} else if ((N & 4294967295 - (1 << 16) + 1) == 0) {
						I += 3
					} else if ((N & 4294967295 - (1 << 21) + 1) == 0) {
						I += 4
					} else throw "e"
				}
				return I
			}
		},
		b = {
			w: function() {
				var O = new Uint32Array(256);
				for (var v = 0; v < 256; v++) {
					var I = v;
					for (var n = 0; n < 8; n++) {
						if (I & 1) I = 3988292384 ^ I >>> 1;
						else I = I >>> 1
					}
					O[v] = I
				}
				return O
			}(),
			update: function(O, v, I, n) {
				for (var N = 0; N < n; N++) O = b.w[(O ^ v[I + N]) & 255] ^ O >>> 8;
				return O
			},
			d: function(O, v, I) {
				return b.update(4294967295, O, v, I) ^ 4294967295
			}
		};

	function Q(O, v, I) {
		var n = 1,
			N = 0,
			w = v,
			D = v + I;
		while (w < D) {
			var P = Math.min(w + 5552, D);
			while (w < P) {
				n += O[w++];
				N += n
			}
			n = n % 65521;
			N = N % 65521
		}
		return N << 16 | n
	}

	function p(O, v) {
		var I = u.B,
			n = u.c,
			N = 0,
			w = {},
			D = new Uint8Array(O),
			P = D.length - 4;
		while (n(D, P) != 101010256) P--;
		var N = P;
		N += 4;
		N += 4;
		var T = I(D, N);
		N += 2;
		var s = I(D, N);
		N += 2;
		var y = n(D, N);
		N += 4;
		var W = n(D, N);
		N += 4;
		N = W;
		for (var E = 0; E < T; E++) {
			var q = n(D, N);
			N += 4;
			N += 4;
			N += 4;
			var C = S(D, N);
			N += 4;
			var c = n(D, N);
			N += 4;
			var y = n(D, N);
			N += 4;
			var f = n(D, N);
			N += 4;
			var t = I(D, N),
				A = I(D, N + 2),
				h = I(D, N + 4);
			N += 6;
			N += 8;
			var R = n(D, N);
			N += 4;
			N += t + A + h;
			K(D, R, w, y, f, v)
		}
		return w
	}

	function S(O, v) {
		var I = u.B(O, v),
			n = u.B(O, v + 2),
			N = 1980 + (n >>> 9),
			w = n >>> 5 & 15,
			D = n & 31,
			P = I >>> 11,
			T = I >>> 5 & 63,
			s = 2 * (I & 31),
			y = new Date(N, w, D, P, T, s).getTime();
		return y
	}

	function ac(O, v, I) {
		var n = new Date(I),
			N = n.getFullYear() - 1980 << 9 | n.getMonth() + 1 << 5 | n.getDate(),
			w = n.getHours() << 11 | n.getMinutes() << 5 | n.getSeconds() >>> 1;
		u.W(O, v, w);
		u.W(O, v + 2, N)
	}

	function K(O, v, I, n, N, w) {
		var D = u.B,
			P = u.c,
			T = P(O, v);
		v += 4;
		var s = D(O, v);
		v += 2;
		var y = D(O, v);
		v += 2;
		var W = D(O, v);
		v += 2;
		var E = S(O, v);
		v += 4;
		var q = P(O, v);
		v += 4;
		v += 8;
		var C = D(O, v);
		v += 2;
		var c = D(O, v);
		v += 2;
		var f = (y & 2048) == 0 ? u.H(O, v, C) : u.q(O, v, C);
		v += C;
		v += c;
		if (w) {
			I[f] = {
				size: N,
				p: n
			};
			return
		}
		var t = new Uint8Array(O.buffer, v);
		if (y & 1) {
			I[f] = new Uint8Array(0);
			alert("ZIPs with a password are not supported.", 3e3)
		} else if (W == 0) I[f] = new Uint8Array(t.buffer.slice(v, v + n));
		else if (W == 8) {
			var A = new Uint8Array(N);
			z(t, A);
			I[f] = A
		} else throw "unknown compression method: " + W
	}

	function z(O, v) {
		return UZIP.F.inflate(O, v)
	}

	function ae(O, v) {
		var I = O[0],
			n = O[1],
			N = I & 15,
			w = I >>> 4;
		return z(new Uint8Array(O.buffer, O.byteOffset + 2, O.length - 6), v)
	}

	function a0(O, v) {
		if (v == null) v = {
			level: 6
		};
		var I = 0,
			n = new Uint8Array(50 + Math.floor(O.length * 1.1));
		n[I] = 120;
		n[I + 1] = 156;
		I += 2;
		I = UZIP.F.deflateRaw(O, n, I, v.level);
		var b = Q(O, 0, O.length);
		n[I + 0] = b >>> 24 & 255;
		n[I + 1] = b >>> 16 & 255;
		n[I + 2] = b >>> 8 & 255;
		n[I + 3] = b >>> 0 & 255;
		return new Uint8Array(n.buffer, 0, I + 4)
	}

	function ad(O, v) {
		if (v == null) v = {
			level: 6
		};
		var I = new Uint8Array(50 + Math.floor(O.length * 1.1)),
			n = UZIP.F.deflateRaw(O, I, n, v.level);
		return new Uint8Array(I.buffer, 0, n)
	}

	function a2(O, v) {
		if (v == null) v = !1;
		var I = 0,
			n = u.N,
			N = u.W,
			w = {},
			W = 0,
			C = 0;
		for (var D in O) {
			var P = !a7(D) && !v,
				T = O[D],
				s = b.d(T, 0, T.length);
			w[D] = {
				Y: P,
				K: T.length,
				d: s,
				file: P ? ad(T) : T
			}
		}
		for (var D in w) I += w[D].file.length + 30 + 46 + 2 * u.n(D);
		I += 22;
		var y = new Uint8Array(I),
			E = [];
		for (var D in w) {
			var q = w[D];
			E.push(W);
			W = a3(y, W, D, q, 0)
		}
		var c = W;
		for (var D in w) {
			var q = w[D];
			E.push(W);
			W = a3(y, W, D, q, 1, E[C++])
		}
		var f = W - c;
		n(y, W, 101010256);
		W += 4;
		W += 4;
		N(y, W, C);
		W += 2;
		N(y, W, C);
		W += 2;
		n(y, W, f);
		W += 4;
		n(y, W, c);
		W += 4;
		W += 2;
		return y.buffer
	}

	function a7(O) {
		var v = O.split(".").pop().toLowerCase();
		return "png,jpg,jpeg,zip".indexOf(v) != -1
	}

	function a3(O, v, I, n, N, D) {
		var P = u.N,
			T = u.W,
			s = n.file;
		P(O, v, N == 0 ? 67324752 : 33639248);
		v += 4;
		if (N == 1) v += 2;
		T(O, v, 20);
		v += 2;
		T(O, v, 2048);
		v += 2;
		T(O, v, n.Y ? 8 : 0);
		v += 2;
		ac(O, v, Date.now());
		v += 4;
		P(O, v, n.d);
		v += 4;
		P(O, v, s.length);
		v += 4;
		P(O, v, n.K);
		v += 4;
		T(O, v, u.n(I));
		v += 2;
		T(O, v, 0);
		v += 2;
		if (N == 1) {
			v += 2;
			v += 2;
			v += 6;
			P(O, v, D);
			v += 4
		}
		var y = u.b(O, v, I);
		v += y;
		if (N == 0) {
			O.set(s, v);
			v += s.length
		}
		return v
	}
	UZIP.crc = b;
	UZIP.adler = Q;
	UZIP.inflate = ae;
	UZIP.inflateRaw = z;
	UZIP.deflate = a0;
	UZIP.deflateRaw = ad;
	UZIP.parse = p;
	UZIP.encode = a2
}());
(function() {
	var u = function() {
		var f = Uint16Array,
			t = Uint32Array;
		return {
			l: new f(16),
			k: new f(16),
			M: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
			U: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
			G: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
			a: new f(32),
			m: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
			O: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
			S: new t(32),
			V: new f(512),
			X: [],
			o: new f(32),
			A: [],
			F: new f(32768),
			j: [],
			v: [],
			z: new f(32768),
			g: [],
			u: new f(512),
			R: [],
			Q: new f(1 << 15),
			J: new t(286),
			h: new t(30),
			I: new t(19),
			f: new t(15e3),
			t: new f(1 << 16),
			r: new f(1 << 15)
		}
	}();

	function b(f, t) {
		var A = f.length,
			h, R, J, $, G, j = u.k;
		for (var $ = 0; $ <= t; $++) j[$] = 0;
		for ($ = 1; $ < A; $ += 2) j[f[$]]++;
		var Y = u.l;
		h = 0;
		j[0] = 0;
		for (R = 1; R <= t; R++) {
			h = h + j[R - 1] << 1;
			Y[R] = h
		}
		for (J = 0; J < A; J += 2) {
			G = f[J + 1];
			if (G != 0) {
				f[J] = Y[G];
				Y[G]++
			}
		}
	}

	function Q(f, t, A) {
		var h = f.length,
			R = u.Q;
		for (var J = 0; J < h; J += 2)
			if (f[J + 1] != 0) {
				var $ = J >> 1,
					G = f[J + 1],
					j = $ << 4 | G,
					Y = t - G,
					Z = f[J] << Y,
					F = Z + (1 << Y);
				while (Z != F) {
					var V = R[Z] >>> 15 - t;
					A[V] = j;
					Z++
				}
			}
	}

	function p(f, t) {
		var A = u.Q,
			h = 15 - t;
		for (var R = 0; R < f.length; R += 2) {
			var J = f[R] << t - f[R + 1];
			f[R] = A[J] >>> h
		}
	}

	function S(f, t, A) {
		A = A << (t & 7);
		var h = t >>> 3;
		f[h] |= A;
		f[h + 1] |= A >>> 8
	}

	function ac(f, t, A) {
		A = A << (t & 7);
		var h = t >>> 3;
		f[h] |= A;
		f[h + 1] |= A >>> 8;
		f[h + 2] |= A >>> 16
	}

	function K(f, t, A) {
		return (f[t >>> 3] | f[(t >>> 3) + 1] << 8) >>> (t & 7) & (1 << A) - 1
	}

	function z(f, t, A) {
		return (f[t >>> 3] | f[(t >>> 3) + 1] << 8 | f[(t >>> 3) + 2] << 16) >>> (t & 7) & (1 << A) - 1
	}

	function ae(f, t) {
		return (f[t >>> 3] | f[(t >>> 3) + 1] << 8 | f[(t >>> 3) + 2] << 16) >>> (t & 7)
	}

	function a0(f, t) {
		return (f[t >>> 3] | f[(t >>> 3) + 1] << 8 | f[(t >>> 3) + 2] << 16 | f[(t >>> 3) + 3] << 24) >>> (t & 7)
	}(function() {
		var f = 1 << 15;
		for (var t = 0; t < f; t++) {
			var A = t;
			A = (A & 2863311530) >>> 1 | (A & 1431655765) << 1;
			A = (A & 3435973836) >>> 2 | (A & 858993459) << 2;
			A = (A & 4042322160) >>> 4 | (A & 252645135) << 4;
			A = (A & 4278255360) >>> 8 | (A & 16711935) << 8;
			u.Q[t] = (A >>> 16 | A << 16) >>> 17
		}

		function h(R, J, $) {
			while (J-- != 0) R.push(0, $)
		}
		for (var t = 0; t < 32; t++) {
			u.a[t] = u.U[t] << 3 | u.G[t];
			u.S[t] = u.m[t] << 4 | u.O[t]
		}
		h(u.X, 144, 8);
		h(u.X, 255 - 143, 9);
		h(u.X, 279 - 255, 7);
		h(u.X, 287 - 279, 8);
		b(u.X, 9);
		Q(u.X, 9, u.V);
		p(u.X, 9);
		h(u.A, 32, 5);
		b(u.A, 5);
		Q(u.A, 5, u.o);
		p(u.A, 5);
		h(u.R, 19, 0);
		h(u.j, 286, 0);
		h(u.g, 30, 0);
		h(u.v, 320, 0)
	}());

	function ad(f, t, A, h) {
		var R = [
				[0, 0, 0, 0, 0],
				[4, 4, 8, 4, 0],
				[4, 5, 16, 8, 0],
				[4, 6, 16, 16, 0],
				[4, 10, 16, 32, 0],
				[8, 16, 32, 32, 0],
				[8, 16, 128, 128, 0],
				[8, 32, 128, 256, 0],
				[32, 128, 258, 1024, 1],
				[32, 258, 258, 4096, 1]
			],
			J = R[h],
			$ = 0,
			G = A << 3,
			j = 0,
			Y = f.length,
			g = 0,
			m = 0,
			X = 0,
			a = 0,
			L = 0,
			e = 0,
			k = 0,
			M = 0;
		if (h == 0) {
			while ($ < Y) {
				var Z = Math.min(65535, Y - $);
				S(t, G, $ + Z == Y ? 1 : 0);
				G = v(f, $, Z, t, G + 8);
				$ += Z
			}
			return G >>> 3
		}
		var F = u.f,
			V = u.t,
			l = u.r;
		if (Y > 2) {
			e = a3(f, 0);
			V[e] = 0
		}
		for ($ = 0; $ < Y; $++) {
			L = e;
			if ($ + 1 < Y - 2) {
				e = a3(f, $ + 1);
				var d = $ + 1 & 32767;
				l[d] = V[e];
				V[e] = d
			}
			if (j <= $) {
				if ((g > 14e3 || m > 26697) && Y - $ > 100) {
					if (j < $) {
						F[g] = $ - j;
						g += 2;
						j = $
					}
					G = O($ == Y - 1 || j == Y ? 1 : 0, F, g, a, f, X, $ - X, t, G);
					g = m = a = 0;
					X = $
				}
				var x = 0;
				if ($ < Y - 2) x = a2(f, $, l, L, Math.min(J[2], Y - $), J[3]);
				var Z = x >>> 16,
					_ = x & 65535;
				if (x != 0) {
					var Z = x >>> 16,
						_ = x & 65535,
						i = W(Z, u.U);
					u.J[257 + i]++;
					var B = W(_, u.m);
					u.h[B]++;
					a += u.G[i] + u.O[B];
					F[g] = Z << 23 | $ - j;
					F[g + 1] = _ << 16 | i << 8 | B;
					g += 2;
					j = $ + Z
				} else {
					u.J[f[$]]++
				}
				m++
			}
		}
		if (X != $ || f.length == 0) {
			if (j < $) {
				F[g] = $ - j;
				g += 2;
				j = $
			}
			G = O(1, F, g, a, f, X, $ - X, t, G);
			g = 0;
			m = 0;
			g = m = a = 0;
			X = $
		}
		while ((G & 7) != 0) G++;
		return G >>> 3
	}

	function a2(f, t, A, h, R, J) {
		var $ = t & 32767,
			G = A[$],
			j = $ - G + (1 << 15) & 32767,
			Y = 0,
			Z = 0;
		if (G == $ || h != a3(f, t - j)) return 0;
		var F = Math.min(32767, t);
		while (j <= F && --J != 0 && G != $) {
			if (Y == 0 || f[t + Y] == f[t + Y - j]) {
				var V = a7(f, t, j);
				if (V > Y) {
					Y = V;
					Z = j;
					if (Y >= R) break;
					if (j + 2 < V) V = j + 2;
					var l = 0;
					for (var g = 0; g < V - 2; g++) {
						var m = t - j + g + (1 << 15) & 32767,
							X = A[m],
							a = m - X + (1 << 15) & 32767;
						if (a > l) {
							l = a;
							G = m
						}
					}
				}
			}
			$ = G;
			G = A[$];
			j += $ - G + (1 << 15) & 32767
		}
		return Y << 16 | Z
	}

	function a7(f, t, A) {
		if (f[t] != f[t - A] || f[t + 1] != f[t + 1 - A] || f[t + 2] != f[t + 2 - A]) return 0;
		var h = t,
			R = Math.min(f.length, t + 258);
		t += 3;
		while (t < R && f[t] == f[t - A]) t++;
		return t - h
	}

	function a3(f, t) {
		return (f[t] << 8 | f[t + 1]) + (f[t + 2] << 4) & 65535
	}

	function O(f, t, A, h, R, J, $, G, j) {
		var Y, Z, F, V, l, m, X, a, L;
		u.J[256]++;
		Y = I();
		Z = Y[0];
		F = Y[1];
		V = Y[2];
		l = Y[3];
		m = Y[4];
		X = Y[5];
		a = Y[6];
		L = Y[7];
		var e = ((j + 3 & 7) == 0 ? 0 : 8 - (j + 3 & 7)) + 32 + ($ << 3),
			k = h + w(u.X, u.J) + w(u.A, u.h),
			M = h + w(u.j, u.J) + w(u.g, u.h);
		M += 14 + 3 * X + w(u.R, u.I) + (u.I[16] * 2 + u.I[17] * 3 + u.I[18] * 7);
		for (var d = 0; d < 286; d++) u.J[d] = 0;
		for (var d = 0; d < 30; d++) u.h[d] = 0;
		for (var d = 0; d < 19; d++) u.I[d] = 0;
		var x = e < k && e < M ? 0 : k < M ? 1 : 2;
		ac(G, j, f);
		ac(G, j + 1, x);
		j += 3;
		var _ = j;
		if (x == 0) {
			while ((j & 7) != 0) j++;
			j = v(R, J, $, G, j)
		} else {
			var i, B;
			if (x == 1) {
				i = u.X;
				B = u.A
			}
			if (x == 2) {
				b(u.j, Z);
				p(u.j, Z);
				b(u.g, F);
				p(u.g, F);
				b(u.R, V);
				p(u.R, V);
				i = u.j;
				B = u.g;
				S(G, j, l - 257);
				j += 5;
				S(G, j, m - 1);
				j += 5;
				S(G, j, X - 4);
				j += 4;
				for (var r = 0; r < X; r++) S(G, j + r * 3, u.R[(u.M[r] << 1) + 1]);
				j += 3 * X;
				j = D(a, u.R, G, j);
				j = D(L, u.R, G, j)
			}
			var ab = J;
			for (var o = 0; o < A; o += 2) {
				var H = t[o],
					a6 = H >>> 23,
					a8 = ab + (H & (1 << 23) - 1);
				while (ab < a8) j = E(R[ab++], i, G, j);
				if (a6 != 0) {
					var a1 = t[o + 1],
						aa = a1 >> 16,
						a9 = a1 >> 8 & 255,
						a4 = a1 & 255;
					j = E(257 + a9, i, G, j);
					S(G, j, a6 - u.U[a9]);
					j += u.G[a9];
					j = E(a4, B, G, j);
					ac(G, j, aa - u.m[a4]);
					j += u.O[a4];
					ab += a6
				}
			}
			j = E(256, i, G, j)
		}
		return j
	}

	function v(f, t, A, h, R) {
		var J = R >>> 3;
		h[J] = A;
		h[J + 1] = A >>> 8;
		h[J + 2] = 255 - h[J];
		h[J + 3] = 255 - h[J + 1];
		J += 4;
		h.set(new Uint8Array(f.buffer, t, A), J);
		return R + (A + 4 << 3)
	}

	function I() {
		var f = T(u.J, u.j, 15),
			t = T(u.h, u.g, 15),
			A = [],
			h = P(u.j, A),
			R = [],
			J = P(u.g, R),
			j = 19;
		for (var $ = 0; $ < A.length; $ += 2) u.I[A[$]]++;
		for (var $ = 0; $ < R.length; $ += 2) u.I[R[$]]++;
		var G = T(u.I, u.R, 7);
		while (j > 4 && u.R[(u.M[j - 1] << 1) + 1] == 0) j--;
		return [f, t, G, h, J, j, A, R]
	}

	function n(f) {
		var t = [];
		for (var A = 0; A < f.length; A += 2) t.push(f[A + 1]);
		return t
	}

	function N(f) {
		var t = "";
		for (var A = 0; A < f.length; A += 2)
			if (f[A + 1] != 0) t += (A >> 1) + ",";
		return t
	}

	function w(f, t) {
		var A = 0;
		for (var h = 0; h < t.length; h++) A += t[h] * f[(h << 1) + 1];
		return A
	}

	function D(f, t, A, h) {
		for (var R = 0; R < f.length; R += 2) {
			var J = f[R],
				$ = f[R + 1];
			h = E(J, t, A, h);
			var G = J == 16 ? 2 : J == 17 ? 3 : 7;
			if (J > 15) {
				S(A, h, $, G);
				h += G
			}
		}
		return h
	}

	function P(f, t) {
		var A = f.length;
		while (A != 2 && f[A - 1] == 0) A -= 2;
		for (var h = 0; h < A; h += 2) {
			var R = f[h + 1],
				J = h + 3 < A ? f[h + 3] : -1,
				$ = h + 5 < A ? f[h + 5] : -1,
				G = h == 0 ? -1 : f[h - 1];
			if (R == 0 && J == R && $ == R) {
				var j = h + 5;
				while (j + 2 < A && f[j + 2] == R) j += 2;
				var Y = Math.min(j + 1 - h >>> 1, 138);
				if (Y < 11) t.push(17, Y - 3);
				else t.push(18, Y - 11);
				h += Y * 2 - 2
			} else if (R == G && J == R && $ == R) {
				var j = h + 5;
				while (j + 2 < A && f[j + 2] == R) j += 2;
				var Y = Math.min(j + 1 - h >>> 1, 6);
				t.push(16, Y - 3);
				h += Y * 2 - 2
			} else t.push(R, 0)
		}
		return A >>> 1
	}

	function T(f, t, A) {
		var h = [],
			R = f.length,
			J = t.length,
			$ = 0,
			V = 0,
			l = 1,
			g = 2;
		for ($ = 0; $ < J; $ += 2) {
			t[$] = 0;
			t[$ + 1] = 0
		}
		for ($ = 0; $ < R; $++)
			if (f[$] != 0) h.push({
				C: $,
				e: f[$]
			});
		var G = h.length,
			j = h.slice(0);
		if (G == 0) return 0;
		if (G == 1) {
			var Y = h[0].C,
				j = Y == 0 ? 1 : 0;
			t[(Y << 1) + 1] = 1;
			t[(j << 1) + 1] = 1;
			return 1
		}
		h.sort(function(Z, F) {
			return Z.e - F.e
		});
		var Z = h[0],
			F = h[1];
		h[0] = {
			C: -1,
			e: Z.e + F.e,
			D: Z,
			L: F,
			P: 0
		};
		while (l != G - 1) {
			if (V != l && (g == G || h[V].e < h[g].e)) {
				Z = h[V++]
			} else {
				Z = h[g++]
			}
			if (V != l && (g == G || h[V].e < h[g].e)) {
				F = h[V++]
			} else {
				F = h[g++]
			}
			h[l++] = {
				C: -1,
				e: Z.e + F.e,
				D: Z,
				L: F
			}
		}
		var m = s(h[l - 1], 0);
		if (m > A) {
			y(j, A, m);
			m = A
		}
		for ($ = 0; $ < G; $++) t[(j[$].C << 1) + 1] = j[$].P;
		return m
	}

	function s(f, t) {
		if (f.C != -1) {
			f.P = t;
			return t
		}
		return Math.max(s(f.D, t + 1), s(f.L, t + 1))
	}

	function y(f, t, A) {
		var h = 0,
			R = 1 << A - t,
			J = 0;
		f.sort(function(G, j) {
			return j.P == G.P ? G.e - j.e : j.P - G.P
		});
		for (h = 0; h < f.length; h++)
			if (f[h].P > t) {
				var $ = f[h].P;
				f[h].P = t;
				J += R - (1 << A - $)
			} else break;
		J = J >>> A - t;
		while (J > 0) {
			var $ = f[h].P;
			if ($ < t) {
				f[h].P++;
				J -= 1 << t - $ - 1
			} else h++
		}
		for (; h >= 0; h--)
			if (f[h].P == t && J < 0) {
				f[h].P--;
				J++
			}
		if (J != 0) console.log("debt left")
	}

	function W(f, t) {
		var A = 0;
		if (t[A | 16] <= f) A |= 16;
		if (t[A | 8] <= f) A |= 8;
		if (t[A | 4] <= f) A |= 4;
		if (t[A | 2] <= f) A |= 2;
		if (t[A | 1] <= f) A |= 1;
		return A
	}

	function E(f, t, A, h) {
		ac(A, h, t[f << 1]);
		return h + t[(f << 1) + 1]
	}

	function a5(f, t) {
		var A = Uint8Array,
			R = 0,
			J = 0,
			$ = 0,
			G = 0,
			j = 0,
			Y = 0,
			Z = 0,
			F = 0,
			V = 0,
			l, g;
		if (f[0] == 3 && f[1] == 0) return t ? t : new A(0);
		var h = t == null;
		if (h) t = new A(f.length >>> 2 << 3);
		while (R == 0) {
			R = z(f, V, 1);
			J = z(f, V + 1, 2);
			V += 3;
			if (J == 0) {
				if ((V & 7) != 0) V += 8 - (V & 7);
				var m = (V >>> 3) + 4,
					X = f[m - 4] | f[m - 3] << 8;
				if (h) t = q(t, F + X);
				t.set(new A(f.buffer, f.byteOffset + m, X), F);
				V = m + X << 3;
				F += X;
				continue
			}
			if (h) t = q(t, F + (1 << 17));
			if (J == 1) {
				l = u.V;
				g = u.o;
				Y = (1 << 9) - 1;
				Z = (1 << 5) - 1
			}
			if (J == 2) {
				$ = K(f, V, 5) + 257;
				G = K(f, V + 5, 5) + 1;
				j = K(f, V + 10, 4) + 4;
				V += 14;
				var a = V,
					e = 1;
				for (var L = 0; L < 38; L += 2) {
					u.R[L] = 0;
					u.R[L + 1] = 0
				}
				for (var L = 0; L < j; L++) {
					var k = K(f, V + L * 3, 3);
					u.R[(u.M[L] << 1) + 1] = k;
					if (k > e) e = k
				}
				V += 3 * j;
				b(u.R, e);
				Q(u.R, e, u.u);
				l = u.F;
				g = u.z;
				V = C(u.u, (1 << e) - 1, $ + G, f, V, u.v);
				var M = c(u.v, 0, $, u.j);
				Y = (1 << M) - 1;
				var d = c(u.v, $, G, u.g);
				Z = (1 << d) - 1;
				b(u.j, M);
				Q(u.j, M, l);
				b(u.g, d);
				Q(u.g, d, g)
			}
			while (!0) {
				var x = l[ae(f, V) & Y];
				V += x & 15;
				var _ = x >>> 4;
				if (_ >>> 8 == 0) {
					t[F++] = _
				} else if (_ == 256) {
					break
				} else {
					var i = F + _ - 254;
					if (_ > 264) {
						var B = u.a[_ - 257];
						i = F + (B >>> 3) + K(f, V, B & 7);
						V += B & 7
					}
					var r = g[ae(f, V) & Z];
					V += r & 15;
					var ab = r >>> 4,
						o = u.S[ab],
						H = (o >>> 4) + z(f, V, o & 15);
					V += o & 15;
					if (h) t = q(t, F + (1 << 17));
					while (F < i) {
						t[F] = t[F++ - H];
						t[F] = t[F++ - H];
						t[F] = t[F++ - H];
						t[F] = t[F++ - H]
					}
					F = i
				}
			}
		}
		return t.length == F ? t : t.slice(0, F)
	}

	function q(f, t) {
		var A = f.length;
		if (t <= A) return f;
		var h = new Uint8Array(Math.max(A << 1, t));
		h.set(f, 0);
		return h
	}

	function C(f, t, A, h, R, J) {
		var $ = 0;
		while ($ < A) {
			var G = f[ae(h, R) & t];
			R += G & 15;
			var j = G >>> 4;
			if (j <= 15) {
				J[$] = j;
				$++
			} else {
				var Y = 0,
					Z = 0;
				if (j == 16) {
					Z = 3 + K(h, R, 2);
					R += 2;
					Y = J[$ - 1]
				} else if (j == 17) {
					Z = 3 + K(h, R, 3);
					R += 3
				} else if (j == 18) {
					Z = 11 + K(h, R, 7);
					R += 7
				}
				var F = $ + Z;
				while ($ < F) {
					J[$] = Y;
					$++
				}
			}
		}
		return R
	}

	function c(f, t, A, h) {
		var R = 0,
			J = 0,
			$ = h.length >>> 1;
		while (J < A) {
			var G = f[J + t];
			h[J << 1] = 0;
			h[(J << 1) + 1] = G;
			if (G > R) R = G;
			J++
		}
		while (J < $) {
			h[J << 1] = 0;
			h[(J << 1) + 1] = 0;
			J++
		}
		return R
	}
	UZIP.F = {
		inflate: a5,
		deflateRaw: ad
	}
}());

