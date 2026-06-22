
var UPNG = function() {
	var y = {
		nextZero: function(V, o) {
			while (V[o] != 0) o++;
			return o
		},
		readUshort: function(V, o) {
			return V[o] << 8 | V[o + 1]
		},
		writeUshort: function(V, o, R) {
			V[o] = R >> 8 & 255;
			V[o + 1] = R & 255
		},
		readUint: function(V, o) {
			return V[o] * (256 * 256 * 256) + (V[o + 1] << 16 | V[o + 2] << 8 | V[o + 3])
		},
		writeUint: function(V, o, R) {
			V[o] = R >> 24 & 255;
			V[o + 1] = R >> 16 & 255;
			V[o + 2] = R >> 8 & 255;
			V[o + 3] = R & 255
		},
		readASCII: function(V, o, R) {
			var w = "";
			for (var i = 0; i < R; i++) w += String.fromCharCode(V[o + i]);
			return w
		},
		writeASCII: function(V, o, R) {
			for (var w = 0; w < R.length; w++) V[o + w] = R.charCodeAt(w)
		},
		readBytes: function(V, o, R) {
			var w = [];
			for (var u = 0; u < R; u++) w.push(V[o + u]);
			return w
		},
		pad: function(V) {
			return V.length < 2 ? "0" + V : V
		},
		readUTF8: function(V, o, R) {
			var w = "",
				i;
			for (var L = 0; L < R; L++) w += "%" + y.pad(V[o + L].toString(16));
			try {
				i = decodeURIComponent(w)
			} catch (ao) {
				return y.readASCII(V, o, R)
			}
			return i
		}
	};

	function ag(V) {
		var o = V.width,
			r = V.height;
		if (V.tabs.acTL == null) return [a3(V.data, o, r, V).buffer];
		var R = [];
		if (V.frames[0].data == null) V.frames[0].data = V.data;
		var w = o * r * 4,
			u = new Uint8Array(w),
			i = new Uint8Array(w),
			L = new Uint8Array(w);
		for (var c = 0; c < V.frames.length; c++) {
			var v = V.frames[c],
				z = v.rect.x,
				F = v.rect.y,
				d = v.rect.width,
				H = v.rect.height,
				s = a3(v.data, d, H, V);
			if (c != 0)
				for (var p = 0; p < w; p++) L[p] = u[p];
			if (v.blend == 0) al(s, d, H, u, o, r, z, F, 0);
			else if (v.blend == 1) al(s, d, H, u, o, r, z, F, 1);
			R.push(u.buffer.slice(0));
			if (v.dispose == 0) {} else if (v.dispose == 1) al(i, d, H, u, o, r, z, F, 0);
			else if (v.dispose == 2)
				for (var p = 0; p < w; p++) u[p] = L[p]
		}
		return R
	}

	function a3(V, o, r, R) {
		var w = o * r,
			u = ac(R),
			i = Math.ceil(o * u / 8),
			L = new Uint8Array(w * 4),
			c = new Uint32Array(L.buffer),
			v = R.ctype,
			z = R.depth,
			F = y.readUshort,
			d = Date.now();
		if (v == 6) {
			var H = w << 2;
			if (z == 8)
				for (var s = 0; s < H; s += 4) {
					L[s] = V[s];
					L[s + 1] = V[s + 1];
					L[s + 2] = V[s + 2];
					L[s + 3] = V[s + 3]
				}
			if (z == 16)
				for (var s = 0; s < H; s++) {
					L[s] = V[s << 1]
				}
		} else if (v == 2) {
			var p = R.tabs.tRNS;
			if (p == null) {
				if (z == 8)
					for (var s = 0; s < w; s++) {
						var I = s * 3;
						c[s] = 255 << 24 | V[I + 2] << 16 | V[I + 1] << 8 | V[I]
					}
				if (z == 16)
					for (var s = 0; s < w; s++) {
						var I = s * 6;
						c[s] = 255 << 24 | V[I + 4] << 16 | V[I + 2] << 8 | V[I]
					}
			} else {
				var t = p[0],
					G = p[1],
					Q = p[2];
				if (z == 8)
					for (var s = 0; s < w; s++) {
						var D = s << 2,
							I = s * 3;
						c[s] = 255 << 24 | V[I + 2] << 16 | V[I + 1] << 8 | V[I];
						if (V[I] == t && V[I + 1] == G && V[I + 2] == Q) L[D + 3] = 0
					}
				if (z == 16)
					for (var s = 0; s < w; s++) {
						var D = s << 2,
							I = s * 6;
						c[s] = 255 << 24 | V[I + 4] << 16 | V[I + 2] << 8 | V[I];
						if (F(V, I) == t && F(V, I + 2) == G && F(V, I + 4) == Q) L[D + 3] = 0
					}
			}
		} else if (v == 3) {
			var f = R.tabs.PLTE,
				g = R.tabs.tRNS,
				A = g ? g.length : 0;
			if (z == 1)
				for (var e = 0; e < r; e++) {
					var P = e * i,
						b = e * o;
					for (var s = 0; s < o; s++) {
						var D = b + s << 2,
							J = V[P + (s >> 3)] >> 7 - ((s & 7) << 0) & 1,
							a = 3 * J;
						L[D] = f[a];
						L[D + 1] = f[a + 1];
						L[D + 2] = f[a + 2];
						L[D + 3] = J < A ? g[J] : 255
					}
				}
			if (z == 2)
				for (var e = 0; e < r; e++) {
					var P = e * i,
						b = e * o;
					for (var s = 0; s < o; s++) {
						var D = b + s << 2,
							J = V[P + (s >> 2)] >> 6 - ((s & 3) << 1) & 3,
							a = 3 * J;
						L[D] = f[a];
						L[D + 1] = f[a + 1];
						L[D + 2] = f[a + 2];
						L[D + 3] = J < A ? g[J] : 255
					}
				}
			if (z == 4)
				for (var e = 0; e < r; e++) {
					var P = e * i,
						b = e * o;
					for (var s = 0; s < o; s++) {
						var D = b + s << 2,
							J = V[P + (s >> 1)] >> 4 - ((s & 1) << 2) & 15,
							a = 3 * J;
						L[D] = f[a];
						L[D + 1] = f[a + 1];
						L[D + 2] = f[a + 2];
						L[D + 3] = J < A ? g[J] : 255
					}
				}
			if (z == 8)
				for (var s = 0; s < w; s++) {
					var D = s << 2,
						J = V[s],
						a = 3 * J;
					L[D] = f[a];
					L[D + 1] = f[a + 1];
					L[D + 2] = f[a + 2];
					L[D + 3] = J < A ? g[J] : 255
				}
		} else if (v == 4) {
			if (z == 8)
				for (var s = 0; s < w; s++) {
					var D = s << 2,
						n = s << 1,
						W = V[n];
					L[D] = W;
					L[D + 1] = W;
					L[D + 2] = W;
					L[D + 3] = V[n + 1]
				}
			if (z == 16)
				for (var s = 0; s < w; s++) {
					var D = s << 2,
						n = s << 2,
						W = V[n];
					L[D] = W;
					L[D + 1] = W;
					L[D + 2] = W;
					L[D + 3] = V[n + 2]
				}
		} else if (v == 0) {
			var t = R.tabs.tRNS ? R.tabs.tRNS : -1;
			for (var e = 0; e < r; e++) {
				var S = e * i,
					B = e * o;
				if (z == 1)
					for (var $ = 0; $ < o; $++) {
						var W = 255 * (V[S + ($ >>> 3)] >>> 7 - ($ & 7) & 1),
							q = W == t * 255 ? 0 : 255;
						c[B + $] = q << 24 | W << 16 | W << 8 | W
					} else if (z == 2)
						for (var $ = 0; $ < o; $++) {
							var W = 85 * (V[S + ($ >>> 2)] >>> 6 - (($ & 3) << 1) & 3),
								q = W == t * 85 ? 0 : 255;
							c[B + $] = q << 24 | W << 16 | W << 8 | W
						} else if (z == 4)
							for (var $ = 0; $ < o; $++) {
								var W = 17 * (V[S + ($ >>> 1)] >>> 4 - (($ & 1) << 2) & 15),
									q = W == t * 17 ? 0 : 255;
								c[B + $] = q << 24 | W << 16 | W << 8 | W
							} else if (z == 8)
								for (var $ = 0; $ < o; $++) {
									var W = V[S + $],
										q = W == t ? 0 : 255;
									c[B + $] = q << 24 | W << 16 | W << 8 | W
								} else if (z == 16)
									for (var $ = 0; $ < o; $++) {
										var W = V[S + ($ << 1)],
											q = F(V, S + ($ << 1)) == t ? 0 : 255;
										c[B + $] = q << 24 | W << 16 | W << 8 | W
									}
			}
		}
		return L
	}

	function aj(V) {
		var o = new Uint8Array(V),
			r = 8,
			R = y,
			w = R.readUshort,
			u = R.readUint,
			i = {
				tabs: {},
				frames: []
			},
			L = new Uint8Array(o.length),
			c = 0,
			h, v = 0,
			z = [137, 80, 78, 71, 13, 10, 26, 10];
		for (var F = 0; F < 8; F++)
			if (o[F] != z[F]) throw "The input is not a PNG file!";
		while (r < o.length) {
			var d = R.readUint(o, r);
			r += 4;
			var H = R.readASCII(o, r, 4);
			r += 4;
			if (H == "IHDR") {
				ap(o, r, i)
			} else if (H == "iCCP") {
				var s = r;
				while (o[s] != 0) s++;
				var p = R.readASCII(o, r, s - r),
					I = o[s + 1],
					t = o.slice(s + 2, r + d);
				i.tabs[H] = U(t)
			} else if (H == "CgBI") {
				i.tabs[H] = o.slice(r, r + 4)
			} else if (H == "IDAT") {
				for (var F = 0; F < d; F++) L[c + F] = o[r + F];
				c += d
			} else if (H == "acTL") {
				i.tabs[H] = {
					num_frames: u(o, r),
					num_plays: u(o, r + 4)
				};
				h = new Uint8Array(o.length)
			} else if (H == "fcTL") {
				if (v != 0) {
					var G = i.frames[i.frames.length - 1];
					G.data = ao(i, h.slice(0, v), G.rect.width, G.rect.height);
					v = 0
				}
				var Q = {
						x: u(o, r + 12),
						y: u(o, r + 16),
						width: u(o, r + 4),
						height: u(o, r + 8)
					},
					D = w(o, r + 22);
				D = w(o, r + 20) / (D == 0 ? 100 : D);
				var f = {
					rect: Q,
					delay: Math.round(D * 1e3),
					dispose: o[r + 24],
					blend: o[r + 25]
				};
				i.frames.push(f)
			} else if (H == "fdAT") {
				for (var F = 0; F < d - 4; F++) h[v + F] = o[r + F + 4];
				v += d - 4
			} else if (H == "pHYs") {
				i.tabs[H] = [R.readUint(o, r), R.readUint(o, r + 4), o[r + 8]]
			} else if (H == "cHRM") {
				i.tabs[H] = [];
				for (var F = 0; F < 8; F++) i.tabs[H].push(R.readUint(o, r + F * 4))
			} else if (H == "tEXt" || H == "zTXt") {
				if (i.tabs[H] == null) i.tabs[H] = {};
				var g = R.nextZero(o, r),
					A = R.readASCII(o, r, g - r),
					e, P = r + d - g - 1;
				if (H == "tEXt") e = R.readASCII(o, g + 1, P);
				else {
					var b = U(o.slice(g + 2, g + 2 + P));
					e = R.readUTF8(b, 0, b.length)
				}
				i.tabs[H][A] = e
			} else if (H == "iTXt") {
				if (i.tabs[H] == null) i.tabs[H] = {};
				var g = 0,
					s = r,
					e;
				g = R.nextZero(o, s);
				var A = R.readASCII(o, s, g - s);
				s = g + 1;
				var J = o[s],
					a = o[s + 1];
				s += 2;
				g = R.nextZero(o, s);
				var n = R.readASCII(o, s, g - s);
				s = g + 1;
				g = R.nextZero(o, s);
				var W = R.readUTF8(o, s, g - s);
				s = g + 1;
				var P = d - (s - r);
				if (J == 0) e = R.readUTF8(o, s, P);
				else {
					var b = U(o.slice(s, s + P));
					e = R.readUTF8(b, 0, b.length)
				}
				i.tabs[H][A] = e
			} else if (H == "PLTE") {
				i.tabs[H] = R.readBytes(o, r, d)
			} else if (H == "hIST") {
				var S = i.tabs.PLTE.length / 3;
				i.tabs[H] = [];
				for (var F = 0; F < S; F++) i.tabs[H].push(w(o, r + F * 2))
			} else if (H == "tRNS") {
				if (i.ctype == 3) i.tabs[H] = R.readBytes(o, r, d);
				else if (i.ctype == 0) i.tabs[H] = w(o, r);
				else if (i.ctype == 2) i.tabs[H] = [w(o, r), w(o, r + 2), w(o, r + 4)]
			} else if (H == "gAMA") i.tabs[H] = R.readUint(o, r) / 1e5;
			else if (H == "sRGB") i.tabs[H] = o[r];
			else if (H == "bKGD") {
				if (i.ctype == 0 || i.ctype == 4) i.tabs[H] = [w(o, r)];
				else if (i.ctype == 2 || i.ctype == 6) i.tabs[H] = [w(o, r), w(o, r + 2), w(o, r + 4)];
				else if (i.ctype == 3) i.tabs[H] = o[r]
			} else if (H == "IEND") {
				break
			}
			r += d;
			var B = R.readUint(o, r);
			r += 4
		}
		if (v != 0) {
			var G = i.frames[i.frames.length - 1];
			G.data = ao(i, h.slice(0, v), G.rect.width, G.rect.height)
		}
		i.data = ao(i, L, i.width, i.height);
		delete i.compress;
		delete i.interlace;
		delete i.filter;
		return i
	}

	function ao(V, o, r, R) {
		var w = Date.now(),
			u = ac(V),
			i = Math.ceil(r * u / 8),
			L = new Uint8Array((i + 1 + V.interlace) * R);
		if (V.tabs.CgBI) o = a4(o, L);
		else o = U(o, L);
		var w = Date.now();
		if (V.interlace == 0) o = a7(o, V, 0, r, R);
		else if (V.interlace == 1) o = aa(o, V);
		return o
	}

	function U(V, o) {
		var r = a4(new Uint8Array(V.buffer, 2, V.length - 6), o);
		return r
	}
	var a4 = function() {
		var V = {};
		V.H = {};
		V.H.N = function(o, r) {
			var R = Uint8Array,
				w = 0,
				u = 0,
				i = 0,
				L = 0,
				c = 0,
				h = 0,
				v = 0,
				z = 0,
				F = 0,
				d, H;
			if (o[0] == 3 && o[1] == 0) return r ? r : new R(0);
			var p = V.H,
				I = p.b,
				t = p.e,
				G = p.R,
				D = p.n,
				g = p.A,
				A = p.Z,
				b = p.m,
				J = r == null;
			if (J) r = new R(o.length >>> 2 << 5);
			while (w == 0) {
				w = I(o, F, 1);
				u = I(o, F + 1, 2);
				F += 3;
				if (u == 0) {
					if ((F & 7) != 0) F += 8 - (F & 7);
					var W = (F >>> 3) + 4,
						S = o[W - 4] | o[W - 3] << 8;
					if (J) r = V.H.W(r, z + S);
					r.set(new R(o.buffer, o.byteOffset + W, S), z);
					F = W + S << 3;
					z += S;
					continue
				}
				if (J) r = V.H.W(r, z + (1 << 17));
				if (u == 1) {
					d = b.J;
					H = b.h;
					h = (1 << 9) - 1;
					v = (1 << 5) - 1
				}
				if (u == 2) {
					i = t(o, F, 5) + 257;
					L = t(o, F + 5, 5) + 1;
					c = t(o, F + 10, 4) + 4;
					F += 14;
					var B = F,
						x = 1;
					for (var C = 0; C < 38; C += 2) {
						b.Q[C] = 0;
						b.Q[C + 1] = 0
					}
					for (var C = 0; C < c; C++) {
						var l = t(o, F + C * 3, 3);
						b.Q[(b.X[C] << 1) + 1] = l;
						if (l > x) x = l
					}
					F += 3 * c;
					D(b.Q, x);
					g(b.Q, x, b.u);
					d = b.w;
					H = b.d;
					F = G(b.u, (1 << x) - 1, i + L, o, F, b.v);
					var Z = p.V(b.v, 0, i, b.C);
					h = (1 << Z) - 1;
					var K = p.V(b.v, i, L, b.D);
					v = (1 << K) - 1;
					D(b.C, Z);
					g(b.C, Z, d);
					D(b.D, K);
					g(b.D, K, H)
				}
				while (!0) {
					var Y = d[A(o, F) & h];
					F += Y & 15;
					var E = Y >>> 4;
					if (E >>> 8 == 0) {
						r[z++] = E
					} else if (E == 256) {
						break
					} else {
						var m = z + E - 254;
						if (E > 264) {
							var O = b.q[E - 257];
							m = z + (O >>> 3) + t(o, F, O & 7);
							F += O & 7
						}
						var j = H[A(o, F) & v];
						F += j & 15;
						var T = j >>> 4,
							X = b.c[T],
							_ = (X >>> 4) + I(o, F, X & 15);
						F += X & 15;
						while (z < m) {
							r[z] = r[z++ - _];
							r[z] = r[z++ - _];
							r[z] = r[z++ - _];
							r[z] = r[z++ - _]
						}
						z = m
					}
				}
			}
			return r.length == z ? r : r.slice(0, z)
		};
		V.H.W = function(o, r) {
			var R = o.length;
			if (r <= R) return o;
			var w = new Uint8Array(R << 1);
			w.set(o, 0);
			return w
		};
		V.H.R = function(o, r, R, w, u, i) {
			var L = V.H.e,
				c = V.H.Z,
				h = 0;
			while (h < R) {
				var v = o[c(w, u) & r];
				u += v & 15;
				var z = v >>> 4;
				if (z <= 15) {
					i[h] = z;
					h++
				} else {
					var F = 0,
						H = 0;
					if (z == 16) {
						H = 3 + L(w, u, 2);
						u += 2;
						F = i[h - 1]
					} else if (z == 17) {
						H = 3 + L(w, u, 3);
						u += 3
					} else if (z == 18) {
						H = 11 + L(w, u, 7);
						u += 7
					}
					var s = h + H;
					while (h < s) {
						i[h] = F;
						h++
					}
				}
			}
			return u
		};
		V.H.V = function(o, r, R, w) {
			var u = 0,
				i = 0,
				L = w.length >>> 1;
			while (i < R) {
				var c = o[i + r];
				w[i << 1] = 0;
				w[(i << 1) + 1] = c;
				if (c > u) u = c;
				i++
			}
			while (i < L) {
				w[i << 1] = 0;
				w[(i << 1) + 1] = 0;
				i++
			}
			return u
		};
		V.H.n = function(o, r) {
			var R = V.H.m,
				w = o.length,
				u, i, L, c, h, v = R.j;
			for (var c = 0; c <= r; c++) v[c] = 0;
			for (c = 1; c < w; c += 2) v[o[c]]++;
			var z = R.K;
			u = 0;
			v[0] = 0;
			for (i = 1; i <= r; i++) {
				u = u + v[i - 1] << 1;
				z[i] = u
			}
			for (L = 0; L < w; L += 2) {
				h = o[L + 1];
				if (h != 0) {
					o[L] = z[h];
					z[h]++
				}
			}
		};
		V.H.A = function(o, r, R) {
			var w = o.length,
				u = V.H.m,
				i = u.r;
			for (var L = 0; L < w; L += 2)
				if (o[L + 1] != 0) {
					var c = L >> 1,
						h = o[L + 1],
						v = c << 4 | h,
						z = r - h,
						F = o[L] << z,
						H = F + (1 << z);
					while (F != H) {
						var s = i[F] >>> 15 - r;
						R[s] = v;
						F++
					}
				}
		};
		V.H.l = function(o, r) {
			var R = V.H.m.r,
				w = 15 - r;
			for (var u = 0; u < o.length; u += 2) {
				var i = o[u] << r - o[u + 1];
				o[u] = R[i] >>> w
			}
		};
		V.H.M = function(o, r, R) {
			R = R << (r & 7);
			var w = r >>> 3;
			o[w] |= R;
			o[w + 1] |= R >>> 8
		};
		V.H.I = function(o, r, R) {
			R = R << (r & 7);
			var w = r >>> 3;
			o[w] |= R;
			o[w + 1] |= R >>> 8;
			o[w + 2] |= R >>> 16
		};
		V.H.e = function(o, r, R) {
			return (o[r >>> 3] | o[(r >>> 3) + 1] << 8) >>> (r & 7) & (1 << R) - 1
		};
		V.H.b = function(o, r, R) {
			return (o[r >>> 3] | o[(r >>> 3) + 1] << 8 | o[(r >>> 3) + 2] << 16) >>> (r & 7) & (1 << R) - 1
		};
		V.H.Z = function(o, r) {
			return (o[r >>> 3] | o[(r >>> 3) + 1] << 8 | o[(r >>> 3) + 2] << 16) >>> (r & 7)
		};
		V.H.i = function(o, r) {
			return (o[r >>> 3] | o[(r >>> 3) + 1] << 8 | o[(r >>> 3) + 2] << 16 | o[(r >>> 3) + 3] << 24) >>> (r & 7)
		};
		V.H.m = function() {
			var o = Uint16Array,
				r = Uint32Array;
			return {
				K: new o(16),
				j: new o(16),
				X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
				S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
				T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
				q: new o(32),
				p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
				z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
				c: new r(32),
				J: new o(512),
				_: [],
				h: new o(32),
				$: [],
				w: new o(32768),
				C: [],
				v: [],
				d: new o(32768),
				D: [],
				u: new o(512),
				Q: [],
				r: new o(1 << 15),
				s: new r(286),
				Y: new r(30),
				a: new r(19),
				t: new r(15e3),
				k: new o(1 << 16),
				g: new o(1 << 15)
			}
		}();
		(function() {
			var o = V.H.m,
				r = 1 << 15;
			for (var R = 0; R < r; R++) {
				var w = R;
				w = (w & 2863311530) >>> 1 | (w & 1431655765) << 1;
				w = (w & 3435973836) >>> 2 | (w & 858993459) << 2;
				w = (w & 4042322160) >>> 4 | (w & 252645135) << 4;
				w = (w & 4278255360) >>> 8 | (w & 16711935) << 8;
				o.r[R] = (w >>> 16 | w << 16) >>> 17
			}

			function u(i, L, c) {
				while (L-- != 0) i.push(0, c)
			}
			for (var R = 0; R < 32; R++) {
				o.q[R] = o.S[R] << 3 | o.T[R];
				o.c[R] = o.p[R] << 4 | o.z[R]
			}
			u(o._, 144, 8);
			u(o._, 255 - 143, 9);
			u(o._, 279 - 255, 7);
			u(o._, 287 - 279, 8);
			V.H.n(o._, 9);
			V.H.A(o._, 9, o.J);
			V.H.l(o._, 9);
			u(o.$, 32, 5);
			V.H.n(o.$, 5);
			V.H.A(o.$, 5, o.h);
			V.H.l(o.$, 5);
			u(o.Q, 19, 0);
			u(o.C, 286, 0);
			u(o.D, 30, 0);
			u(o.v, 320, 0)
		}());
		return V.H.N
	}();

	function aa(V, o) {
		var r = o.width,
			R = o.height,
			w = ac(o),
			u = w >> 3,
			i = Math.ceil(r * w / 8),
			L = new Uint8Array(R * i),
			c = 0,
			v = [0, 0, 4, 0, 2, 0, 1],
			z = [0, 4, 0, 2, 0, 1, 0],
			F = [8, 8, 8, 4, 4, 2, 2],
			d = [8, 8, 4, 4, 2, 2, 1],
			H = 0;
		while (H < 7) {
			var s = F[H],
				p = d[H],
				I = 0,
				t = 0,
				G = v[H],
				f = 0;
			while (G < R) {
				G += s;
				t++
			}
			var Q = z[H];
			while (Q < r) {
				Q += p;
				I++
			}
			var D = Math.ceil(I * w / 8);
			a7(V, o, c, I, t);
			var g = v[H];
			while (g < R) {
				var A = z[H],
					e = c + f * D << 3;
				while (A < r) {
					if (w == 1) {
						var P = V[e >> 3];
						P = P >> 7 - (e & 7) & 1;
						L[g * i + (A >> 3)] |= P << 7 - ((A & 7) << 0)
					}
					if (w == 2) {
						var P = V[e >> 3];
						P = P >> 6 - (e & 7) & 3;
						L[g * i + (A >> 2)] |= P << 6 - ((A & 3) << 1)
					}
					if (w == 4) {
						var P = V[e >> 3];
						P = P >> 4 - (e & 7) & 15;
						L[g * i + (A >> 1)] |= P << 4 - ((A & 1) << 2)
					}
					if (w >= 8) {
						var b = g * i + A * u;
						for (var J = 0; J < u; J++) L[b + J] = V[(e >> 3) + J]
					}
					e += w;
					A += p
				}
				f++;
				g += s
			}
			if (I * t != 0) c += t * (1 + D);
			H = H + 1
		}
		return L
	}

	function ac(V) {
		var o = [1, null, 3, 1, 2, null, 4][V.ctype];
		return o * V.depth
	}

	function a7(V, o, r, R, w) {
		var u = ac(o),
			i = Math.ceil(R * u / 8),
			L, c, z = 0;
		u = Math.ceil(u / 8);
		var v = V[r];
		if (v > 1) V[r] = [0, 0, 1][v - 2];
		if (v == 3)
			for (z = u; z < i; z++) V[z + 1] = V[z + 1] + (V[z + 1 - u] >>> 1) & 255;
		for (var F = 0; F < w; F++) {
			L = r + F * i;
			c = L + F + 1;
			v = V[c - 1];
			z = 0;
			if (v == 0)
				for (; z < i; z++) V[L + z] = V[c + z];
			else if (v == 1) {
				for (; z < u; z++) V[L + z] = V[c + z];
				for (; z < i; z++) V[L + z] = V[c + z] + V[L + z - u]
			} else if (v == 2) {
				for (; z < i; z++) V[L + z] = V[c + z] + V[L + z - i]
			} else if (v == 3) {
				for (; z < u; z++) V[L + z] = V[c + z] + (V[L + z - i] >>> 1);
				for (; z < i; z++) V[L + z] = V[c + z] + (V[L + z - i] + V[L + z - u] >>> 1)
			} else {
				for (; z < u; z++) V[L + z] = V[c + z] + a6(0, V[L + z - i], 0);
				for (; z < i; z++) V[L + z] = V[c + z] + a6(V[L + z - u], V[L + z - i], V[L + z - u - i])
			}
		}
		return V
	}

	function a6(V, o, r) {
		var R = V + o - r,
			w = R - V,
			u = R - o,
			i = R - r;
		if (w * w <= u * u && w * w <= i * i) return V;
		else if (u * u <= i * i) return o;
		return r
	}

	function ap(V, o, r) {
		r.width = y.readUint(V, o);
		o += 4;
		r.height = y.readUint(V, o);
		o += 4;
		r.depth = V[o];
		o++;
		r.ctype = V[o];
		o++;
		r.compress = V[o];
		o++;
		r.filter = V[o];
		o++;
		r.interlace = V[o];
		o++
	}

	function al(V, o, r, R, w, u, i, L, c) {
		var h = Math.min(o, w),
			v = Math.min(r, u),
			z = 0,
			F = 0;
		for (var d = 0; d < v; d++)
			for (var H = 0; H < h; H++) {
				if (i >= 0 && L >= 0) {
					z = d * o + H << 2;
					F = (L + d) * w + i + H << 2
				} else {
					z = (-L + d) * o - i + H << 2;
					F = d * w + H << 2
				}
				if (c == 0) {
					R[F] = V[z];
					R[F + 1] = V[z + 1];
					R[F + 2] = V[z + 2];
					R[F + 3] = V[z + 3]
				} else if (c == 1) {
					var s = V[z + 3] * (1 / 255),
						p = V[z] * s,
						I = V[z + 1] * s,
						t = V[z + 2] * s,
						G = R[F + 3] * (1 / 255),
						Q = R[F] * G,
						D = R[F + 1] * G,
						f = R[F + 2] * G,
						g = 1 - s,
						A = s + G * g,
						e = A == 0 ? 0 : 1 / A;
					R[F + 3] = 255 * A;
					R[F + 0] = (p + Q * g) * e;
					R[F + 1] = (I + D * g) * e;
					R[F + 2] = (t + f * g) * e
				} else if (c == 2) {
					var s = V[z + 3],
						p = V[z],
						I = V[z + 1],
						t = V[z + 2],
						G = R[F + 3],
						Q = R[F],
						D = R[F + 1],
						f = R[F + 2];
					if (s == G && p == Q && I == D && t == f) {
						R[F] = 0;
						R[F + 1] = 0;
						R[F + 2] = 0;
						R[F + 3] = 0
					} else {
						R[F] = p;
						R[F + 1] = I;
						R[F + 2] = t;
						R[F + 3] = s
					}
				} else if (c == 3) {
					var s = V[z + 3],
						p = V[z],
						I = V[z + 1],
						t = V[z + 2],
						G = R[F + 3],
						Q = R[F],
						D = R[F + 1],
						f = R[F + 2];
					if (s == G && p == Q && I == D && t == f) continue;
					if (s < 220 && G > 20) return !1
				}
			}
		return !0
	}
	return {
		decode: aj,
		toRGBA8: ag,
		_paeth: a6,
		_copyTile: al,
		_bin: y
	}
}();
(function() {
	var y = UPNG._copyTile,
		ag = UPNG._bin,
		a3 = UPNG._paeth,
		aj = {
			table: function() {
				var I = new Uint32Array(256);
				for (var t = 0; t < 256; t++) {
					var G = t;
					for (var Q = 0; Q < 8; Q++) {
						if (G & 1) G = 3988292384 ^ G >>> 1;
						else G = G >>> 1
					}
					I[t] = G
				}
				return I
			}(),
			update: function(I, t, G, Q) {
				for (var D = 0; D < Q; D++) I = aj.table[(I ^ t[G + D]) & 255] ^ I >>> 8;
				return I
			},
			crc: function(I, t, G) {
				return aj.update(4294967295, I, t, G) ^ 4294967295
			}
		};

	function ao(I, t, G, Q) {
		t[G] += I[0] * Q >> 4;
		t[G + 1] += I[1] * Q >> 4;
		t[G + 2] += I[2] * Q >> 4;
		t[G + 3] += I[3] * Q >> 4
	}

	function U(I) {
		return Math.max(0, Math.min(255, I))
	}

	function a4(I, t) {
		var G = I[0] - t[0],
			Q = I[1] - t[1],
			D = I[2] - t[2],
			f = I[3] - t[3];
		return G * G + Q * Q + D * D + f * f
	}

	function aa(I, t, G, Q, D, f, g) {
		if (g == null) g = 1;
		var A = Q.length,
			e = [],
			b = [],
			x = 4;
		for (var J = 0; J < A; J++) {
			var a = Q[J];
			e.push([a >>> 0 & 255, a >>> 8 & 255, a >>> 16 & 255, a >>> 24 & 255])
		}
		for (var J = 0; J < A; J++) {
			var n = 4294967295,
				W = 0;
			for (var S = 0; S < A; S++) {
				var B = a4(e[J], e[S]);
				if (S != J && B < n) {
					n = B;
					W = S
				}
			}
			var $ = Math.sqrt(n) / 2;
			b[J] = ~~($ * $)
		}
		var q = new Uint32Array(D.buffer),
			M = new Int16Array(t * G * 4),
			N = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
		for (var J = 0; J < N.length; J++) N[J] = 255 * (-.5 + (N[J] + .5) / (x * x));
		for (var C = 0; C < G; C++) {
			for (var l = 0; l < t; l++) {
				var J = (C * t + l) * 4,
					Z, W = 0,
					K = 16777215;
				if (g != 2) Z = [U(I[J] + M[J]), U(I[J + 1] + M[J + 1]), U(I[J + 2] + M[J + 2]), U(I[J + 3] + M[J + 3])];
				else {
					var B = N[(C & x - 1) * x + (l & x - 1)];
					Z = [U(I[J] + B), U(I[J + 1] + B), U(I[J + 2] + B), U(I[J + 3] + B)]
				}
				for (var S = 0; S < A; S++) {
					var Y = a4(Z, e[S]);
					if (Y < K) {
						K = Y;
						W = S
					}
				}
				var E = e[W],
					m = [Z[0] - E[0], Z[1] - E[1], Z[2] - E[2], Z[3] - E[3]];
				if (g == 1) {
					if (l != t - 1) ao(m, M, J + 4, 7);
					if (C != G - 1) {
						if (l != 0) ao(m, M, J + 4 * t - 4, 3);
						ao(m, M, J + 4 * t, 5);
						if (l != t - 1) ao(m, M, J + 4 * t + 4, 1)
					}
				}
				f[J >> 2] = W;
				q[J >> 2] = Q[W]
			}
		}
	}

	function ac(I, t, G, Q, D, f, g) {
		if (Q == null) Q = 0;
		if (g == null) g = !1;
		var A = al(I, t, G, Q, [!1, !1, !1, 0, g, !1]);
		ap(A, -1);
		return a6(A, t, G, D, f)
	}

	function a7(I, t, G, Q, D, f, g, A) {
		var e = {
				ctype: 0 + (Q == 1 ? 0 : 2) + (D == 0 ? 0 : 4),
				depth: f,
				frames: []
			},
			b = Date.now(),
			J = (Q + D) * f,
			a = J * t;
		for (var n = 0; n < I.length; n++) e.frames.push({
			rect: {
				x: 0,
				y: 0,
				width: t,
				height: G
			},
			img: new Uint8Array(I[n]),
			blend: 0,
			dispose: 1,
			bpp: Math.ceil(J / 8),
			bpl: Math.ceil(a / 8)
		});
		ap(e, 0, !0);
		var W = a6(e, t, G, g, A);
		return W
	}

	function a6(I, t, G, Q, D) {
		if (D == null) D = {};
		var f = aj.crc,
			g = ag.writeUint,
			A = ag.writeUshort,
			e = ag.writeASCII,
			b = 8,
			J = I.frames.length > 1,
			a = !1,
			n, W = 8 + (16 + 5 + 4) + (J ? 20 : 0),
			E = 0;
		if (D.sRGB != null) W += 8 + 1 + 4;
		if (D.pHYs != null) W += 8 + 9 + 4;
		if (D.iCCP != null) {
			n = pako.deflate(D.iCCP);
			W += 8 + 11 + 2 + n.length + 4
		}
		if (I.ctype == 3) {
			var S = I.plte.length;
			for (var B = 0; B < S; B++)
				if (I.plte[B] >>> 24 != 255) a = !0;
			W += 8 + S * 3 + 4 + (a ? 8 + S * 1 + 4 : 0)
		}
		for (var $ = 0; $ < I.frames.length; $++) {
			var q = I.frames[$];
			if (J) W += 38;
			W += q.cimg.length + 12;
			if ($ != 0) W += 4
		}
		W += 12;
		var M = new Uint8Array(W),
			x = [137, 80, 78, 71, 13, 10, 26, 10];
		for (var B = 0; B < 8; B++) M[B] = x[B];
		g(M, b, 13);
		b += 4;
		e(M, b, "IHDR");
		b += 4;
		g(M, b, t);
		b += 4;
		g(M, b, G);
		b += 4;
		M[b] = I.depth;
		b++;
		M[b] = I.ctype;
		b++;
		M[b] = 0;
		b++;
		M[b] = 0;
		b++;
		M[b] = 0;
		b++;
		g(M, b, f(M, b - 17, 17));
		b += 4;
		if (D.sRGB != null) {
			g(M, b, 1);
			b += 4;
			e(M, b, "sRGB");
			b += 4;
			M[b] = D.sRGB;
			b++;
			g(M, b, f(M, b - 5, 5));
			b += 4
		}
		if (D.iCCP != null) {
			var N = 11 + 2 + n.length;
			g(M, b, N);
			b += 4;
			e(M, b, "iCCP");
			b += 4;
			e(M, b, "ICC profile");
			b += 11;
			b += 2;
			M.set(n, b);
			b += n.length;
			g(M, b, f(M, b - (N + 4), N + 4));
			b += 4
		}
		if (D.pHYs != null) {
			g(M, b, 9);
			b += 4;
			e(M, b, "pHYs");
			b += 4;
			g(M, b, D.pHYs[0]);
			b += 4;
			g(M, b, D.pHYs[1]);
			b += 4;
			M[b] = D.pHYs[2];
			b++;
			g(M, b, f(M, b - 13, 13));
			b += 4
		}
		if (J) {
			g(M, b, 8);
			b += 4;
			e(M, b, "acTL");
			b += 4;
			g(M, b, I.frames.length);
			b += 4;
			g(M, b, D.loop != null ? D.loop : 0);
			b += 4;
			g(M, b, f(M, b - 12, 12));
			b += 4
		}
		if (I.ctype == 3) {
			var S = I.plte.length;
			g(M, b, S * 3);
			b += 4;
			e(M, b, "PLTE");
			b += 4;
			for (var B = 0; B < S; B++) {
				var C = B * 3,
					l = I.plte[B],
					Z = l & 255,
					K = l >>> 8 & 255,
					Y = l >>> 16 & 255;
				M[b + C + 0] = Z;
				M[b + C + 1] = K;
				M[b + C + 2] = Y
			}
			b += S * 3;
			g(M, b, f(M, b - S * 3 - 4, S * 3 + 4));
			b += 4;
			if (a) {
				g(M, b, S);
				b += 4;
				e(M, b, "tRNS");
				b += 4;
				for (var B = 0; B < S; B++) M[b + B] = I.plte[B] >>> 24 & 255;
				b += S;
				g(M, b, f(M, b - S - 4, S + 4));
				b += 4
			}
		}
		for (var $ = 0; $ < I.frames.length; $++) {
			var q = I.frames[$];
			if (J) {
				g(M, b, 26);
				b += 4;
				e(M, b, "fcTL");
				b += 4;
				g(M, b, E++);
				b += 4;
				g(M, b, q.rect.width);
				b += 4;
				g(M, b, q.rect.height);
				b += 4;
				g(M, b, q.rect.x);
				b += 4;
				g(M, b, q.rect.y);
				b += 4;
				A(M, b, Q[$]);
				b += 2;
				A(M, b, 1e3);
				b += 2;
				M[b] = q.dispose;
				b++;
				M[b] = q.blend;
				b++;
				g(M, b, f(M, b - 30, 30));
				b += 4
			}
			var m = q.cimg,
				S = m.length;
			g(M, b, S + ($ == 0 ? 0 : 4));
			b += 4;
			var O = b;
			e(M, b, $ == 0 ? "IDAT" : "fdAT");
			b += 4;
			if ($ != 0) {
				g(M, b, E++);
				b += 4
			}
			M.set(m, b);
			b += S;
			g(M, b, f(M, O, b - O));
			b += 4
		}
		g(M, b, 0);
		b += 4;
		e(M, b, "IEND");
		b += 4;
		g(M, b, f(M, b - 4, 4));
		b += 4;
		return M.buffer
	}

	function ap(I, t, G) {
		for (var Q = 0; Q < I.frames.length; Q++) {
			var D = I.frames[Q],
				f = D.rect.width,
				g = D.rect.height,
				A = new Uint8Array(g * D.bpl + g);
			D.cimg = R(D.img, g, D.bpp, D.bpl, A, t, G)
		}
	}

	function al(I, t, G, Q, D) {
		var f = D[0],
			g = D[1],
			A = D[2],
			e = D[3],
			b = D[4],
			J = D[5],
			a = 6,
			n = 8,
			W = 255;
		for (var S = 0; S < I.length; S++) {
			var B = new Uint8Array(I[S]),
				$ = B.length;
			for (var q = 0; q < $; q += 4) W &= B[q + 3]
		}
		var M = W != 255,
			x = V(I, t, G, f, g, A),
			N = {},
			C = [],
			l = [];
		if (Q != 0) {
			var Z = [],
				E = 0;
			for (var q = 0; q < x.length; q++) Z.push(x[q].img.buffer);
			var K = s(Z),
				Y = u(K, Q);
			for (var q = 0; q < Y.plte.length; q++) C.push(Y.plte[q].est.rgba);
			for (var q = 0; q < x.length; q++) {
				var m = x[q],
					O = m.img.length,
					j = new Uint8Array(Y.inds.buffer, E >> 2, O >> 2);
				l.push(j);
				var T = new Uint8Array(Y.abuf, E, O);
				if (J) aa(m.img, m.rect.width, m.rect.height, C, T, j);
				m.img.set(T);
				E += O
			}
		} else {
			for (var S = 0; S < x.length; S++) {
				var m = x[S],
					X = new Uint32Array(m.img.buffer),
					_ = m.rect.width,
					$ = X.length,
					j = new Uint8Array($);
				l.push(j);
				for (var q = 0; q < $; q++) {
					var aq = X[q];
					if (q != 0 && aq == X[q - 1]) j[q] = j[q - 1];
					else if (q > _ && aq == X[q - _]) j[q] = j[q - _];
					else {
						var af = N[aq];
						if (af == null) {
							N[aq] = af = C.length;
							C.push(aq);
							if (C.length >= 300) break
						}
						j[q] = af
					}
				}
			}
		}
		var ae = C.length;
		if (ae <= 256 && b == !1) {
			if (ae <= 2) n = 1;
			else if (ae <= 4) n = 2;
			else if (ae <= 16) n = 4;
			else n = 8;
			n = Math.max(n, e)
		}
		for (var S = 0; S < x.length; S++) {
			var m = x[S],
				ar = m.rect.x,
				a2 = m.rect.y,
				_ = m.rect.width,
				a5 = m.rect.height,
				an = m.img,
				a9 = new Uint32Array(an.buffer),
				ak = 4 * _,
				ah = 4;
			if (ae <= 256 && b == !1) {
				ak = Math.ceil(n * _ / 8);
				var a8 = new Uint8Array(ak * a5),
					a0 = l[S];
				for (var am = 0; am < a5; am++) {
					var q = am * ak,
						ai = am * _;
					if (n == 8)
						for (var k = 0; k < _; k++) a8[q + k] = a0[ai + k];
					else if (n == 4)
						for (var k = 0; k < _; k++) a8[q + (k >> 1)] |= a0[ai + k] << 4 - (k & 1) * 4;
					else if (n == 2)
						for (var k = 0; k < _; k++) a8[q + (k >> 2)] |= a0[ai + k] << 6 - (k & 3) * 2;
					else if (n == 1)
						for (var k = 0; k < _; k++) a8[q + (k >> 3)] |= a0[ai + k] << 7 - (k & 7) * 1
				}
				an = a8;
				a = 3;
				ah = 1
			} else if (M == !1 && x.length == 1) {
				var a8 = new Uint8Array(_ * a5 * 3),
					ad = _ * a5;
				for (var q = 0; q < ad; q++) {
					var a1 = q * 3,
						ab = q * 4;
					a8[a1] = an[ab];
					a8[a1 + 1] = an[ab + 1];
					a8[a1 + 2] = an[ab + 2]
				}
				an = a8;
				a = 2;
				ah = 3;
				ak = 3 * _
			}
			m.img = an;
			m.bpl = ak;
			m.bpp = ah
		}
		return {
			ctype: a,
			depth: n,
			plte: C,
			frames: x
		}
	}

	function V(I, t, G, Q, D, f) {
		var g = [],
			a5 = 0;
		for (var A = 0; A < I.length; A++) {
			var e = new Uint8Array(I[A]),
				b = new Uint32Array(e.buffer),
				J, a = 0,
				n = 0,
				W = t,
				S = G,
				B = Q ? 1 : 0;
			if (A != 0) {
				var $ = f || Q || A == 1 || g[A - 2].dispose != 0 ? 1 : 2,
					q = 0,
					M = 1e9;
				for (var x = 0; x < $; x++) {
					var N = new Uint8Array(I[A - 1 - x]),
						C = new Uint32Array(I[A - 1 - x]),
						l = t,
						Z = G,
						K = -1,
						Y = -1;
					for (var E = 0; E < G; E++)
						for (var m = 0; m < t; m++) {
							var O = E * t + m;
							if (b[O] != C[O]) {
								if (m < l) l = m;
								if (m > K) K = m;
								if (E < Z) Z = E;
								if (E > Y) Y = E
							}
						}
					if (K == -1) l = Z = K = Y = 0;
					if (D) {
						if ((l & 1) == 1) l--;
						if ((Z & 1) == 1) Z--
					}
					var j = (K - l + 1) * (Y - Z + 1);
					if (j < M) {
						M = j;
						q = x;
						a = l;
						n = Z;
						W = K - l + 1;
						S = Y - Z + 1
					}
				}
				var N = new Uint8Array(I[A - 1 - q]);
				if (q == 1) g[A - 1].dispose = 2;
				J = new Uint8Array(W * S * 4);
				y(N, t, G, J, W, S, -a, -n, 0);
				B = y(e, t, G, J, W, S, -a, -n, 3) ? 1 : 0;
				if (B == 1) r(e, t, G, J, {
					x: a,
					y: n,
					width: W,
					height: S
				});
				else y(e, t, G, J, W, S, -a, -n, 0)
			} else J = e.slice(0);
			g.push({
				rect: {
					x: a,
					y: n,
					width: W,
					height: S
				},
				img: J,
				blend: B,
				dispose: 0
			})
		}
		if (Q)
			for (var A = 0; A < g.length; A++) {
				var T = g[A];
				if (T.blend == 1) continue;
				var X = T.rect,
					_ = g[A - 1].rect,
					aq = Math.min(X.x, _.x),
					af = Math.min(X.y, _.y),
					ae = Math.max(X.x + X.width, _.x + _.width),
					ar = Math.max(X.y + X.height, _.y + _.height),
					a2 = {
						x: aq,
						y: af,
						width: ae - aq,
						height: ar - af
					};
				g[A - 1].dispose = 1;
				if (A - 1 != 0) o(I, t, G, g, A - 1, a2, D);
				o(I, t, G, g, A, a2, D)
			}
		if (I.length != 1)
			for (var O = 0; O < g.length; O++) {
				var T = g[O];
				a5 += T.rect.width * T.rect.height
			}
		return g
	}

	function o(I, t, G, Q, D, f, g) {
		var A = Uint8Array,
			e = Uint32Array,
			b = new A(I[D - 1]),
			J = new e(I[D - 1]),
			a = D + 1 < I.length ? new A(I[D + 1]) : null,
			n = new A(I[D]),
			W = new e(n.buffer),
			S = t,
			B = G,
			$ = -1,
			q = -1;
		for (var M = 0; M < f.height; M++)
			for (var x = 0; x < f.width; x++) {
				var N = f.x + x,
					C = f.y + M,
					l = C * t + N,
					Z = W[l];
				if (Z == 0 || Q[D - 1].dispose == 0 && J[l] == Z && (a == null || a[l * 4 + 3] != 0)) {} else {
					if (N < S) S = N;
					if (N > $) $ = N;
					if (C < B) B = C;
					if (C > q) q = C
				}
			}
		if ($ == -1) S = B = $ = q = 0;
		if (g) {
			if ((S & 1) == 1) S--;
			if ((B & 1) == 1) B--
		}
		f = {
			x: S,
			y: B,
			width: $ - S + 1,
			height: q - B + 1
		};
		var K = Q[D];
		K.rect = f;
		K.blend = 1;
		K.img = new Uint8Array(f.width * f.height * 4);
		if (Q[D - 1].dispose == 0) {
			y(b, t, G, K.img, f.width, f.height, -f.x, -f.y, 0);
			r(n, t, G, K.img, f)
		} else y(n, t, G, K.img, f.width, f.height, -f.x, -f.y, 0)
	}

	function r(I, t, G, Q, D) {
		y(I, t, G, Q, D.width, D.height, -D.x, -D.y, 2)
	}

	function R(I, t, G, Q, D, f, g) {
		var A = [],
			e = [0, 1, 2, 3, 4],
			b, S, B = 1e9;
		if (f != -1) e = [f];
		else if (t * Q > 5e5 || G == 1) e = [0];
		if (g) b = {
			level: 0
		};
		var J = D.length > 1e7 && UZIP != null ? UZIP : pako,
			a = Date.now();
		for (var n = 0; n < e.length; n++) {
			for (var W = 0; W < t; W++) w(D, I, W, Q, G, e[n]);
			A.push(J.deflate(D, b))
		}
		for (var n = 0; n < A.length; n++)
			if (A[n].length < B) {
				S = n;
				B = A[n].length
			}
		return A[S]
	}

	function w(I, t, G, Q, D, f) {
		var g = G * Q,
			A = g + G;
		I[A] = f;
		A++;
		if (f == 0) {
			if (Q < 500)
				for (var e = 0; e < Q; e++) I[A + e] = t[g + e];
			else I.set(new Uint8Array(t.buffer, g, Q), A)
		} else if (f == 1) {
			for (var e = 0; e < D; e++) I[A + e] = t[g + e];
			for (var e = D; e < Q; e++) I[A + e] = t[g + e] - t[g + e - D] + 256 & 255
		} else if (G == 0) {
			for (var e = 0; e < D; e++) I[A + e] = t[g + e];
			if (f == 2)
				for (var e = D; e < Q; e++) I[A + e] = t[g + e];
			if (f == 3)
				for (var e = D; e < Q; e++) I[A + e] = t[g + e] - (t[g + e - D] >> 1) + 256 & 255;
			if (f == 4)
				for (var e = D; e < Q; e++) I[A + e] = t[g + e] - a3(t[g + e - D], 0, 0) + 256 & 255
		} else {
			if (f == 2) {
				for (var e = 0; e < Q; e++) I[A + e] = t[g + e] + 256 - t[g + e - Q] & 255
			}
			if (f == 3) {
				for (var e = 0; e < D; e++) I[A + e] = t[g + e] + 256 - (t[g + e - Q] >> 1) & 255;
				for (var e = D; e < Q; e++) I[A + e] = t[g + e] + 256 - (t[g + e - Q] + t[g + e - D] >> 1) & 255
			}
			if (f == 4) {
				for (var e = 0; e < D; e++) I[A + e] = t[g + e] + 256 - a3(0, t[g + e - Q], 0) & 255;
				for (var e = D; e < Q; e++) I[A + e] = t[g + e] + 256 - a3(t[g + e - D], t[g + e - Q], t[g + e - D - Q]) & 255
			}
		}
	}

	function u(I, t) {
		var G = new Uint8Array(I),
			Q = G.slice(0),
			D = new Uint32Array(Q.buffer),
			f = i(Q, t),
			g = f[0],
			A = f[1],
			e = G.length,
			b = new Uint8Array(e >> 2),
			J;
		if (G.length < 2e7)
			for (var a = 0; a < e; a += 4) {
				var n = G[a] * (1 / 255),
					W = G[a + 1] * (1 / 255),
					S = G[a + 2] * (1 / 255),
					B = G[a + 3] * (1 / 255);
				J = L(g, n, W, S, B);
				b[a >> 2] = J.ind;
				D[a >> 2] = J.est.rgba
			} else
				for (var a = 0; a < e; a += 4) {
					var n = G[a] * (1 / 255),
						W = G[a + 1] * (1 / 255),
						S = G[a + 2] * (1 / 255),
						B = G[a + 3] * (1 / 255);
					J = g;
					while (J.left) J = c(J.est, n, W, S, B) <= 0 ? J.left : J.right;
					b[a >> 2] = J.ind;
					D[a >> 2] = J.est.rgba
				}
		return {
			abuf: Q.buffer,
			inds: b,
			plte: A
		}
	}

	function i(I, t, G) {
		if (G == null) G = 1e-4;
		var Q = new Uint32Array(I.buffer),
			D = {
				i0: 0,
				i1: I.length,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
		D.bst = F(I, D.i0, D.i1);
		D.est = d(D.bst);
		var f = [D];
		while (f.length < t) {
			var g = 0,
				A = 0;
			for (var e = 0; e < f.length; e++)
				if (f[e].est.L > g) {
					g = f[e].est.L;
					A = e
				}
			if (g < G) break;
			var b = f[A],
				J = v(I, Q, b.i0, b.i1, b.est.e, b.est.eMq255),
				a = b.i0 >= J || b.i1 <= J;
			if (a) {
				b.est.L = 0;
				continue
			}
			var n = {
				i0: b.i0,
				i1: J,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
			n.bst = F(I, n.i0, n.i1);
			n.est = d(n.bst);
			var W = {
				i0: J,
				i1: b.i1,
				bst: null,
				est: null,
				tdst: 0,
				left: null,
				right: null
			};
			W.bst = {
				R: [],
				m: [],
				N: b.bst.N - n.bst.N
			};
			for (var e = 0; e < 16; e++) W.bst.R[e] = b.bst.R[e] - n.bst.R[e];
			for (var e = 0; e < 4; e++) W.bst.m[e] = b.bst.m[e] - n.bst.m[e];
			W.est = d(W.bst);
			b.left = n;
			b.right = W;
			f[A] = n;
			f.push(W)
		}
		f.sort(function(S, B) {
			return B.bst.N - S.bst.N
		});
		for (var e = 0; e < f.length; e++) f[e].ind = e;
		return [D, f]
	}

	function L(I, t, G, Q, D) {
		if (I.left == null) {
			I.tdst = h(I.est.q, t, G, Q, D);
			return I
		}
		var f = c(I.est, t, G, Q, D),
			g = I.left,
			A = I.right;
		if (f > 0) {
			g = I.right;
			A = I.left
		}
		var e = L(g, t, G, Q, D);
		if (e.tdst <= f * f) return e;
		var b = L(A, t, G, Q, D);
		return b.tdst < e.tdst ? b : e
	}

	function c(I, t, G, Q, D) {
		var f = I.e;
		return f[0] * t + f[1] * G + f[2] * Q + f[3] * D - I.eMq
	}

	function h(I, t, G, Q, D) {
		var f = t - I[0],
			g = G - I[1],
			A = Q - I[2],
			e = D - I[3];
		return f * f + g * g + A * A + e * e
	}

	function v(I, t, G, Q, D, f) {
		Q -= 4;
		var g = 0;
		while (G < Q) {
			while (z(I, G, D) <= f) G += 4;
			while (z(I, Q, D) > f) Q -= 4;
			if (G >= Q) break;
			var A = t[G >> 2];
			t[G >> 2] = t[Q >> 2];
			t[Q >> 2] = A;
			G += 4;
			Q -= 4
		}
		while (z(I, G, D) > f) G -= 4;
		return G + 4
	}

	function z(I, t, G) {
		return I[t] * G[0] + I[t + 1] * G[1] + I[t + 2] * G[2] + I[t + 3] * G[3]
	}

	function F(I, t, G) {
		var Q = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			D = [0, 0, 0, 0],
			U = G - t >> 2;
		for (var f = t; f < G; f += 4) {
			var g = I[f] * (1 / 255),
				A = I[f + 1] * (1 / 255),
				e = I[f + 2] * (1 / 255),
				b = I[f + 3] * (1 / 255);
			D[0] += g;
			D[1] += A;
			D[2] += e;
			D[3] += b;
			Q[0] += g * g;
			Q[1] += g * A;
			Q[2] += g * e;
			Q[3] += g * b;
			Q[5] += A * A;
			Q[6] += A * e;
			Q[7] += A * b;
			Q[10] += e * e;
			Q[11] += e * b;
			Q[15] += b * b
		}
		Q[4] = Q[1];
		Q[8] = Q[2];
		Q[9] = Q[6];
		Q[12] = Q[3];
		Q[13] = Q[7];
		Q[14] = Q[11];
		return {
			R: Q,
			m: D,
			N: U
		}
	}

	function d(F) {
		var I = F.R,
			t = F.m,
			U = F.N,
			G = t[0],
			Q = t[1],
			D = t[2],
			f = t[3],
			g = U == 0 ? 0 : 1 / U,
			A = [I[0] - G * G * g, I[1] - G * Q * g, I[2] - G * D * g, I[3] - G * f * g, I[4] - Q * G * g, I[5] - Q * Q * g, I[6] - Q * D * g, I[7] - Q * f * g, I[8] - D * G * g, I[9] - D * Q * g, I[10] - D * D * g, I[11] - D * f * g, I[12] - f * G * g, I[13] - f * Q * g, I[14] - f * D * g, I[15] - f * f * g],
			e = A,
			b = H,
			J = [Math.random(), Math.random(), Math.random(), Math.random()],
			a = 0,
			W = 0;
		if (U != 0)
			for (var S = 0; S < 16; S++) {
				J = b.multVec(e, J);
				W = Math.sqrt(b.dot(J, J));
				J = b.sml(1 / W, J);
				if (S != 0 && Math.abs(W - a) < 1e-9) break;
				a = W
			}
		var B = [G * g, Q * g, D * g, f * g],
			$ = b.dot(b.sml(255, B), J);
		return {
			Cov: A,
			q: B,
			e: J,
			L: a,
			eMq255: $,
			eMq: b.dot(J, B),
			rgba: (Math.round(255 * B[3]) << 24 | Math.round(255 * B[2]) << 16 | Math.round(255 * B[1]) << 8 | Math.round(255 * B[0]) << 0) >>> 0
		}
	}
	var H = {
		multVec: function(I, t) {
			return [I[0] * t[0] + I[1] * t[1] + I[2] * t[2] + I[3] * t[3], I[4] * t[0] + I[5] * t[1] + I[6] * t[2] + I[7] * t[3], I[8] * t[0] + I[9] * t[1] + I[10] * t[2] + I[11] * t[3], I[12] * t[0] + I[13] * t[1] + I[14] * t[2] + I[15] * t[3]]
		},
		dot: function(I, t) {
			return I[0] * t[0] + I[1] * t[1] + I[2] * t[2] + I[3] * t[3]
		},
		sml: function(I, t) {
			return [I * t[0], I * t[1], I * t[2], I * t[3]]
		}
	};

	function s(I) {
		var t = 0,
			D = 0;
		for (var G = 0; G < I.length; G++) t += I[G].byteLength;
		var Q = new Uint8Array(t);
		for (var G = 0; G < I.length; G++) {
			var f = new Uint8Array(I[G]),
				g = f.length;
			for (var A = 0; A < g; A += 4) {
				var e = f[A],
					b = f[A + 1],
					J = f[A + 2],
					a = f[A + 3];
				if (a == 0) e = b = J = 0;
				Q[D + A] = e;
				Q[D + A + 1] = b;
				Q[D + A + 2] = J;
				Q[D + A + 3] = a
			}
			D += g
		}
		return Q.buffer
	}
	UPNG.encode = ac;
	UPNG.encodeLL = a7;
	UPNG.encode.compress = al;
	UPNG.encode.dither = aa;
	UPNG.quantize = u;
	UPNG.quantize.getKDtree = i;
	UPNG.quantize.getNearest = L
}());
