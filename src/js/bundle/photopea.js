
function BaseAppUI(l) {
	UIComponent.call(this);
	if (l) return;
	this.e = s.createElement("div", "flexrow app");
	this.X8 = s.createElement("div");
	this.e.appendChild(this.X8);
	this.Ib = new KeyboardHandler;
	var d = this.X8;
	this.dx = new DialogManager;
	this.dx.parent = this;
	d.appendChild(this.dx.e);
	this.i2 = new CommandPalette;
	this.i2.parent = this;
	d.appendChild(this.i2.e);
	this.addListener(ActionTypes.E.L, this.$e, this);
	this.aB = this.io.bind(this);
}

BaseAppUI.prototype = new UIComponent;
BaseAppUI.prototype.io = function(l) {
	if (decoshop._stopped) return;

	this.fA();
	window.requestAnimationFrame(this.aB)
};

BaseAppUI.prototype.refresh = function() {};
BaseAppUI.prototype.e3 = function(l) {
	if (!window.PP) return;
	var d = PP.window.innerWidth,
		G = PP.window.innerHeight;
	this.resize(d, G)
};

BaseAppUI.prototype.resize = function(l, d) {
	this.i2.resize(l, d);
	this.dx.resize(l, d)
};

BaseAppUI.prototype.$e = function(l) {
	var d = l.data.a;
	if (d == ActionTypes.$.dY) this.i2.awF(l.data);
	if (d == ActionTypes.$.qH) this.i2.a9X(l.data);
	if (d == ActionTypes.$.B8) this.i2.a5C(l.data.wh);
	if (d == ActionTypes.$.jn) this.i2.acm(l.data.wh);
	if (d == ActionTypes.$.xt) this.i2.iO()
};



function PhotopeaApp() {
	BaseAppUI.call(this);

	this.YE = {
		x: 0,
		y: 0,
		oW: !1
	};
	this.w4 = !1;
	this.h$ = !1;
	this.CA = null;
	this.aeT = 0;
	this.ahu = !1;
	this.vE = 0;

	var l = this,
		I = "",
		y = "";
		
	this.d = {
		a41: [
			{
				G: f.t7,
				Ol: !1,
				C0: [KeyboardHandler.a2Q, KeyboardHandler.Mm]
			},
			{
				G: f._O,
				Ol: !1,
				C0: [KeyboardHandler.Mm]
			},
			{
				G: f.E7,
				Ol: !0,
				C0: [KeyboardHandler.wz],
				xk: [f.AD]
			},
			{
				G: f.AD,
				Ol: !0,
				C0: [KeyboardHandler.wz],
				xk: [f.E7]
			},
			{
				G: f.Kp,
				Ol: !0,
				C0: [KeyboardHandler.wz],
				xk: [f.o2, f.tA, f.YQ]
			},
			{
				G: f.o2,
				Ol: !0,
				C0: [KeyboardHandler.wz],
				xk: [f.Kp, f.LI, f.Rn, f.MO, f.OZ, f.YL]
			},
			{
				G: f.$C,
				Ol: !0,
				C0: [KeyboardHandler.wz]
			}
		],
		vu: [
			[
				{ G: new f.Pq, _g: MoveToolOptions },
			]
		],
		L7: [],
		keys: [
			KeyboardHandler.AR,
			KeyboardHandler.dQ,
			KeyboardHandler.Hm,
			KeyboardHandler.p6,
			KeyboardHandler.nA,
			KeyboardHandler.wo,
			KeyboardHandler.Ns,
			KeyboardHandler.Zt,
			KeyboardHandler.kC,
			KeyboardHandler.E,
			KeyboardHandler.Jv,
			null,
			KeyboardHandler.vc,
			KeyboardHandler.hD,
			KeyboardHandler.Ho,
			KeyboardHandler.$,
			KeyboardHandler.fu,
			KeyboardHandler.Zi,
			KeyboardHandler.dr
		],
		map: {},
		Vu: null,
		JB: null,
		rE: null
	};

	for (var A = 0; A < this.d.vu.length; A++) {
		var e = this.d.vu[A];
		if (e == "---") continue;
		var M = this.d.keys[A];
		for (var R = 0; R < e.length; R++) {
			this.d.map[e[R].G.id] = e[R];
			e[R].vv = A;
			e[R].a6C = R;
		}
		this.d.L7[A] = 0
	}

	this.fB = {
		av3: !1,
		QN: null,
		WN: 0,
		pO: {
			yO: [],
			BF: [],
			list: [],
			Em: null
		},
		UL: [],
		a8v: [],
		dR: [],
		Oz: [],
		w1: [],
		_N: [],
		ak1: [],
		apR: [],
		w1: [],
		t6: [eU.oT()],
		Pr: [],
		rJ: [],
		X4: null,
		dV: 0,
		Xf: {
			hA: 1,
			rU: JSON.parse(JSON.stringify(LayerStyleConstants.defaultContentStyles[0]))
		},
		PB: JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default)),
		avK: [null].concat(LayerStyleConstants.defaultContentStyles),
		air: [null].concat(LayerStyleConstants.defaultContentStyles),
		Hg: new FontHelper(function(j) {
			var g = new Action(ActionTypes.E.L, !0);
			g.data = {
				a: ActionTypes.$.ub,
				Oo: {
					url: "rsrc/fonts/" + j
				}
			};
			this.dispatch(g)
		}.bind(this)),
		XG: {
			rA: [],
			xg: null,
			GB: null
		},
		font: null,
		fL: [],
		G2: [],
		a5N: {},
		Y7: 0,
		GF: 16777215,
		bI: !1,
		Wi: !0,
		hq: {
			qz: !0,
			Sp: !1,
			vF: !0,
			t_: !0,
			vr: !0,
			Vp: !0,
			rp: 20,
			v7: 0,
			ra: 0,
			SF: 0,
			E6: 8421504
		},
		gX: !0,
		v1: [!0, !0, !1, !0, !0],
		J_: [0, 1, 2, 3, 5, 6, 7, 9, 10, 16, 17, 100],
		j$: 1,
		N_: !0,
		QR: {},
		ki: !0,
		axZ: !1,
		compact: !1,
		r8: 1,
		dS: 0,
		Ix: !0,
		sv: null,
		Fr: {
			ab$: !1,
			ahj: !1,
			XH: {},
			Nc: null
		},
		aaw: 0,
		al2: null,
		wH: null,
		a3n: null,
		C6: null
	};

	this.aij = {
		vD: new Rect,
		XM: new Point2D
	};

	this.fB.XG = dt.ae5();
	this.gD = new WorkspacePanelContainer(this);
	this.U3 = !1;
	this.vg = this.aA0.bind(this);

	s.addClass(this.gD.e, "mainblock");

	this.gD.parent = this;
	this.gD.addListener(ActionTypes.E.A, this.MF, this);
	this.gD.addListener(ActionTypes.E.Ax, this.awi, this);
	this.gD.addListener("shuffleItems", this.acY, this);
	this.gD.addListener(ActionTypes.E.azc, this.agE, this);
	this.addListener("mouse", this.azg, this);
	this.addListener(ActionTypes.E.v, this.TA, this);
	this.addListener(ActionTypes.E.g5, this.ah4, this);

	window.addEventListener("paste", this.adG.bind(this), !1);
	window.addEventListener("copy", this.avj.bind(this), !1);
	window.addEventListener("wheel", function(j) {
		if (j.ctrlKey) j.preventDefault()
	}, { passive: !1 });

	this.AQ = 0;
	this.Mt = [];
	this.DE = new ClipboardHandler(exportHelper.openFile);
	this.DE.parent = this;

	this.DE.SP({ url: "~/rsrc/basic.zip" });
	this.fr(f.$C);
	premiumSession.initSession(this.ash.bind(this));
}

PhotopeaApp.prototype = new BaseAppUI(!0);

PhotopeaApp.prototype.init = function(w) {
	this.window = w;
};

PhotopeaApp.prototype.pp = function(l) {
	var d = new Action(ActionTypes.E.L);
	d.data = {
		a: ActionTypes.$.QT,
		Oo: l ? l : "done"
	};
	this.dispatch(d);
};

PhotopeaApp.prototype.ash = function() {
	// s.global.setTimeout(this.ayt.bind(this), Math.pow(Math.PI, 8) + Math.random() * 1e4);
	// var l = premiumSession.$O();
	// if (l != null && l.globals != null) this.I2(l.globals);
	// else {
		this.ahu = !0;
		// var d = navigator.languages;
		// if (d && d.length != 0) {
		// 	var G = d[0];
		// 	languageManager.loadLanguageByCode(G, this.vg)
		// }
	// }

	// auto load "en" as default language
	languageManager.loadLanguageByCode("en", this.vg);

	this.a5d();
	this.S7();
	this.w4 = !0;
	this.pp();

	// hbi: init event
	var d = new Action(ActionTypes.E.L, !0);
	d.data = { a: ActionTypes.$.h73, Oo: "ready" };
	this.dispatch(d);
};

PhotopeaApp.prototype.awJ = function(l) {
	var d = JSON.parse(l.target.response),
		G = Date.now() / 1e3,
		b = document.referrer,
		V = !1;
	for (var Q in d)
		if (Q.indexOf(".") != -1 && b.indexOf(Q) != -1 && parseInt(d[Q]) > G) V = !0;
	if (V) this.fB.ki = !1;
	this.a5d();
	this.S7()
};

PhotopeaApp.prototype.S7 = function(l) {
	this.h$ = !0;
	if (!this.fB.Ix) this.gD.Ix = null;
	else if (this.Mt.length == 0) this.gD.aee();
	this.Sh(PsdResourceTypes.Wx);
	this.refresh();
	this.e3();
};

PhotopeaApp.prototype.I2 = function(l) {
	var d = this.fB;
	if (l.fcolor != null) d.Y7 = l.fcolor;
	if (l.bcolor != null) d.GF = l.bcolor;
	if (l.rulers != null) d.bI = l.rulers;
	if (l.extras != null) d.Wi = l.extras;
	if (l.favFam != null) d.fL = l.favFam;
	if (l.rsrc != null) d.G2 = l.rsrc;
	if (l.font != null) d.XG.rA[0].Name = l.font;
	if (l.panels != null) d.J_ = l.panels;
	if (l.as != null) d.r8 = l.as;
	if (l.co != null) d.dS = l.co;
	if (l.eparams) {
		var G = l.eparams,
			b = d.hq;
		if (G.guides != null) b.qz = G.guides;
		if (G.grid != null) b.Sp = G.grid;
		if (G.gsize != null) b.rp = G.gsize;
		if (G.gunits != null) b.v7 = G.gunits;
		if (G.gtype != null) b.ra = G.gtype;
		if (G.runits != null) b.SF = G.runits;
		if (G.gcol != null) b.E6 = G.gcol;
		if (G.sels != null) b.vF = G.sels;
		if (G.paths != null) b.t_ = G.paths;
		if (G.pgrid != null) b.vr = G.pgrid;
		if (G.slices != null) b.Vp = G.slices
	}
	if (l.lang != null) languageManager.loadLanguageByCode(l.lang, this.vg);
	if (l.theme != null) d.j$ = l.theme;
	if (l.topt || d.Kd) {
		var V = l.topt ? l.topt : {},
			Q = d.Kd ? d.Kd : {};
		for (var t in this.d.map) {
			if (t >= 103) continue;
			var I = "t" + t;
			if (V[I] || Q[I]) this.d.map[t].G.j6(V[I], Q[I], this)
		}
	}
};

PhotopeaApp.prototype.a5d = function() {
	if (this.fB.av3) return;
	this.fB.av3 = !0;
	var l = null,
		d = window.location.href,
		G = d.indexOf("="),
		b = d.indexOf("#");
	if (G != -1) l = d.substring(d.indexOf("?") + 1, G);
	if (b != -1 && b != d.length - 1) {
		l = "p";
		G = b
	}
	if (b != -1 && d[b + 1] == "i") {
		this.DE.wq(d.slice(b + 2, b + 10))
	} else if (b != -1 && d[b + 1] == "t") {
		this.DE.wq(d.slice(b + 2, b + 10).split("").reverse().join(""), !0)
	} else if (l == "p" || l == "state") {
		var V = d.substring(G + 1, d.length);
		V = JSON.parse(decodeURI(V));
		if (l == "p") {
			if (V.script == "alert(73)") this.fB.ki = !1;
			if (V.script) je.ao2(this);
			if (V.server) this.CA = V.server;
			if (V.resources)
				for (var A = 0; A < V.resources.length; A++) this.DE.SP({
					url: V.resources[A]
				});
			if (V.files)
				for (var A = 0; A < V.files.length; A++) this.DE.SP({
					url: V.files[A],
					pb: {
						RG: V.server,
						an2: V.script
					}
				});
			var Q = V.environment;
			if (Q == null) Q = {};
			if (Q.localsave != null) this.fB.N_ = Q.localsave;
			if (Q.customIO != null) this.fB.QR = Q.customIO;
			if (Q.vmode != null) {
				var t = Q.vmode;
				if (t == 1) this.fB.compact = !0;
				if (t == 2) this.tO(1)
			}
			if (Q.intro != null) this.fB.Ix = Q.intro;
			if (Q.menus != null) this.fB.ae2 = Q.menus;
			if (Q.tmnu != null) this.fB.Kd = Q.tmnu;
			if (Q.panels != null) this.fB.J_ = Q.panels;
			if (Q.showtools != null) {
				var I = Q.showtools,
					y = I.indexOf(this.fB.QN);
				this.fB.df = I;
				if (y == -1) this.fr(I[0])
			}
			if (Q.phrases != null) languageManager.addCustomPhrases(Q.phrases);
			if (Q.autosave != null) {
				this.fB.r8 = 0;
				window.setInterval(function() {
					var R = new Action(ActionTypes.E.L);
					R.data = {
						a: ActionTypes.$.WD
					};
					this.dispatch(R)
				}.bind(this), Q.autosave * 1e3)
			}
			if (Q.icons != null) {
				for (var e in Q.icons)
					if (Q.icons[e].indexOf("\"") == -1) {
						if ((e == "logo" || e == "bottom") && this.fB.ki) continue;
						PIMG[e] = Q.icons[e];
						PIMG["__" + e] = !0
					}
			}
			this.I2(Q);
			if (V.files == null && V.script) {
				ScriptingEngine.runScript(V.script, this);
				this.pp()
			}
		} else if (l == "state") {
			var M = this.DE;
			if (V.action == "create") {
				var R = new Action(ActionTypes.E.L);
				R.data = {
					a: ActionTypes.$.SN,
					GU: "newproject",
					aAd: V.folderId
				};
				this.dispatch(R)
			}
			if (V.action == "open") {
				for (var A = 0; A < V.ids.length; A++) d$.b9(function() {
					var n = "https://www.googleapis.com/drive/v3/files/" + this.ar5,
						r = new XMLHttpRequest;
					r.open("GET", n);
					r.setRequestHeader("Authorization", d$.GI());
					r.send();
					r.onload = function(T) {
						var j = JSON.parse(T.target.response);
						M.SP({
							url: n + "?alt=media",
							name: j.name,
							yi: {
								file: j,
								cZ: ""
							},
							sE: {
								Authorization: d$.GI()
							}
						})
					}
				}.bind({
					ar5: V.ids[A]
				}));
				alert("Loading files from Google Drive ...")
			}
		}
	} else {
		var J = window.launchQueue;
		if (J) {
			var M = this.DE;
			J.setConsumer(function(n) {
				var r = n.files;
				for (var A = 0; A < r.length; A++) {
					var T = r[A];
					T.getFile().then(function(j) {
						M.lI([j], null, null, null, [T])
					})
				}
			})
		}
	}
};

PhotopeaApp.prototype.refresh = function() {
	var l = document.getElementById("cap");
	if (l) {
		var d = !1,
			G = l.getElementsByTagName("h1")[0],
			Q = 0,
			I = 0,
			y = 0;
		G.textContent = d ? "Photopea" : "Photopea: advanced image editor";
		var b = l.getElementsByTagName("p"),
			V = s.escapeHtml("Free online editor supporting PSD, XCF, Sketch, XD and CDR formats."),
			t = ["PSD", "XCF", "Sketch", "XD", "CDR"];
		for (var A = 0; A < t.length; A++) V = V.replace(t[A], "<b>" + t[A] + "</b>");
		if (!d) V += " (<b>Adobe Photoshop</b>, <b>GIMP</b>, <b>Sketch App</b>,  <b>Adobe XD</b>, <b>CorelDRAW</b>).";
		b[0].innerHTML = V;
		V = `Create a new image or open existing files from your computer. Save your work as PSD (File - Save as PSD) or as JPG / PNG / SVG (File - Export as).
			Suggest new features at our <GitHub> or <Facebook>. Our goal is to create <the most advanced and affordable photo editor>.`;
		for (var A = 0; A < V.length; A++) {
			var e = V[A];
			if (e == "<") I++;
			if (e == ">") y++
		}
		if (!d && I * y == 9) {
			var M = ["//github.com/photopea/photopea/issues", "//www.facebook.com/photopea/", "//blog.photopea.com/introduction.html"];
			for (var A = 0; A < 3; A++) {
				var R = V.indexOf("<", Q),
					J = V.indexOf(">", Q),
					n = V.slice(0, R) + "<a href=\"" + M[A] + "\" target=\"_blank\">" + V.slice(R + 1, J) + "</a>";
				Q = n.length;
				V = n + V.slice(J + 1)
			}
			b[1].innerHTML = V
		} else b[1].innerHTML = "Create a new image or open existing files from your computer. Save your work as PSD (File - Save as PSD) or as JPG / PNG / SVG (File - Export as).";
	}
	var r = document.getElementById("sponsors");
	if (r) r.textContent = "Sponsor links open in new window.";
	this.dx.refresh();
	this.gD.refresh();
	for (var T in this.d.map)
		if (this.d.map[T].x5) this.d.map[T].x5.refresh()
};

PhotopeaApp.prototype.QG = function() {
	return 4 < s.document.location.href.indexOf("8000")
};

PhotopeaApp.prototype.resize = function(l, d) {
	if (!PP) return;
	l = Math.floor(l);
	d = Math.floor(d);
	var G = "hideCap",
		b = "style",
		V = document,
		Q = Math.max(l, PP.window.innerWidth),
		t = Math.max(d, PP.window.innerHeight),
		R = 0;
	if (this.TQ == null) this.TQ = Math.min(Q, t) < 500 || Q < 750 ? 0 : Q < 1600 ? 1 : 2;
	var I = this.TQ,
		y = !this.h$ || this.QG() || !this.fB.ki || premiumSession.hasActiveEntitlement() || I == 0;
	if (!y) {
		if (this.a6I == null) this.a6I = Math.random() < .5;
		y = this.a6I
	}
	if (y) {
		if (I != 0 && s.global[G] && this.h$) s.global[G]()
	} else {
		if (I == 0) d -= 60;
		else l -= I == 1 ? 180 : 320
	}
	BaseAppUI.prototype.resize.call(this, l, d);
	if (y && this.U3) {
		this.U3 = !1
	}
	if (!y && !this.U3) {
		var e = function(r) {
			// if (Math.random() < .002) {
			// 	premiumSession.event("gota_1")
			// }
			this.aob(l, d);
			var T = I == 0 ? V.body : this.e;
		}.bind(this);

		this.U3 = !0

		// edited by hbi
		e(1);
	}
	this.gD.resize(PP.window.innerWidth, PP.window.innerHeight);
};

PhotopeaApp.prototype.aob = function(l, d) {
	var G = function() {
		var b = new Action(ActionTypes.E.L);
		b.data = {
			a: ActionTypes.$.SN,
			GU: "account"
		};
		this.dispatch(b)
	}.bind(this);
};

PhotopeaApp.prototype.avj = function(l) {
	console.log("systemCopy")
};

PhotopeaApp.prototype.adG = function(l) {
	if (s.hasClipboardSupport()) return;
	console.log("systemPaste");
	if (!l.clipboardData) return;
	var d = l.target.tagName.toLowerCase(),
		G = l.clipboardData.items;
	if (G == null) return;
	var b = this.acq.bind(this);
	for (var A = 0; A < G.length; A++) {
		var V = G[A],
			Q = V.getAsFile();
		if (V.type.indexOf("text") != -1) {
			V.getAsString(this.aaR.bind(this))
		}
		if (V.type.indexOf("image") != -1) {
			if (Q.size == this.fB.aaw) return;
			this.fB.aaw = Q.size;
			if (Q) {
				Q.name = "image.png";
				this.DE.lI([Q], b)
			}
		}
	}
};

PhotopeaApp.prototype.aaR = function(l) {
	if (l.startsWith("http")) {
		if (l == this.fB.arv) return;
		this.fB.arv = l;
		var d = new Action(ActionTypes.E.L, !0);
		d.data = {
			a: ActionTypes.$.ub,
			Oo: {
				url: l,
				FZ: !0
			}
		};
		this.dispatch(d);
	}
};

PhotopeaApp.prototype.acq = function(l, d) {
	var G = {
			buffer: l,
			rect: d
		},
		b = this.fB;
	if (s.hasClipboardSupport()) {
		var V = this.aij,
			Q = V.vD;
		if (Q.m == d.m && Q.n == d.n) {
			G.rect = Q;
			G.XM = V.XM
		}
	} else {
		if (b.wH) {
			var t = new Action(ActionTypes.E.v, !0);
			t.G = f.lv;
			t.data = {
				a: "h_stepbck"
			};
			this.dispatch(t)
		}
	}
	b.wH = G;
	var t = new Action(ActionTypes.E.L, !0);
	t.data = {
		a: ActionTypes.$.EZ,
		asO: !0
	};
	this.dispatch(t)
};

PhotopeaApp.prototype.a30 = function() {
	if (this.dx.Uf() != null) alert("Close the current window first.");
	else alert("Escape or Confirm the current action (in the top menu).")
};

PhotopeaApp.prototype.TA = function(l) {
	var d = this.fk();
	if (d == null) {
		alert("Open a document first.");
		return
	}
	var G = l.G == f._O || l.G == f.t7;
	if (this.dx.in() && l.Fj != !0 && !G) {
		this.a30();
		return
	}
	var b = this.d,
		V = this.fB.QN,
		Q = l.G;
	if (Q == f.zl && V == f.zk) Q = f.zk;
	if (V != Q && b.map[V].G.in() && !G && !(V == f.MU && Q == f.WH)) {
		b.map[V].G.disable(d, this, this.fB, this.Ib)
	}
	var t = this.d.map[Q].G;
	t.TA(l.data, this, d, this.Ib, this.fB)
};

PhotopeaApp.prototype.ah4 = function(l) {
	var d = this.fB;
	if (l.data.FP != !0) PsdDescriptorHelper.a2v({
		kT: l.data.kT,
		a0: l.data.a0
	}, this, d, this.fk());
	var G = d.X4,
		b = d.rJ;
	if (G == null) return;
	var V = {
		awX: !1,
		ZL: "Step",
		afl: 0,
		p: !0,
		exp: !1,
		kT: l.data.kT
	};
	if (G[2] == null) G[2] = b[G[0]].Vm[G[1]].Vm.length - 1;
	if (l.data.a0) V.a0 = l.data.a0;
	b[G[0]].Vm[G[1]].Vm.splice(G[2] + 1, 0, V);
	G[2]++;
	this.Sh(PsdResourceTypes.v)
};

PhotopeaApp.prototype.$e = function(l) {
	if (this.axZ) {
		l.data = 0;
		return l.type
	}
	BaseAppUI.prototype.$e.call(this, l);
	var d = l.data.a;
	if (d == ActionTypes.$.du) PsdDescriptorHelper.azx(this.fk(), this.fB.rJ, l.data.X9[0], l.data.X9[1], this);
	if (d == ActionTypes.$.a3e) {
		this.a9z(l.data.aph)
	}
	if (d == ActionTypes.$.asj) {
		this.refresh();
		this.e3()
	}
	if (d == ActionTypes.$.to) this.e3();
	if (d == ActionTypes.$.at7)
		if (this.fB.sv) {
			this.fB.sv.prompt();
			this.fB.sv = null
		}
	if (d == ActionTypes.$.e5) this.gD.uH(l.data.ew, l.data.push);
	if (d == ActionTypes.$.a10) this.gD.a0x();
	if (d == ActionTypes.$.ab8) this.MF(null, l.data.dir);
	if (d == ActionTypes.$.jN) this.gD.cd(this.Mt.indexOf(l.data.e9));
	if (d == ActionTypes.$.Mc) {
		if (l.data.Xs && document.fullscreenEnabled) {
			if (document.fullscreenElement) document.exitFullscreen();
			else document.body.requestFullscreen()
		} else if (l.data.Xs) document.body.webkitRequestFullScreen();
		if (l.data.Z != null) this.tO(l.data.Z)
	}
	if (d == ActionTypes.$.agL) {
		if (l.data.oW) this.Ib.sm(l.data.an9);
		else this.Ib.o6(l.data.an9);
		this.o9(l.data.oW ? "down" : "up")
	}
	if (d == ActionTypes.$.a7q) {
		var G = l.data.Z;
		this.refresh()
	}
	if (d == ActionTypes.$.kc) {
		var b = this.fk(),
			V = b.LT().slice(0),
			Q = b.B[b.g[0]],
			t = new Rect(0, 0, b.m, b.n),
			I = PsdDocument.Xb() + "-d71c-11e5-b1ae-a548a96e5f9f",
			y = new Action(ActionTypes.E.L, !0);
		if (l.data.Oo == 0) {
			var e = {
				name: b.name.split(".")[0],
				id: I,
				Rj: [V, t]
			};
			y.data = {
				a: ActionTypes.$.kI,
				pb: "add",
				Oo: PsdResourceTypes.lL,
				G2: [e]
			};
			this.dispatch(y)
		}
		if (l.data.Oo == 1) {
			var M = PixelUtil.allocBytes(t.O() * 4);
			PixelUtil.andMaskUint32(M, 4294967295);
			PixelUtil.blend.compositeBlend("norm", V, t, M, t, t, 1);
			var R = PixelUtil.allocBytes(t.O());
			PixelUtil.rgbaToGrayPlane(M, R);
			PixelUtil.invertUint32Buffer(R);
			var J = PixelUtil.tightBoundsFromGray(R, t);
			if (J.W6()) J = t;
			var n = PixelUtil.allocBytes(J.O());
			PixelUtil.copyBufferRect(R, t, n, J);
			J.x = J.y = 0;
			var r = {
					vD: J,
					id: I,
					Rj: [n, J]
				},
				T = es._k(I),
				g = T.Brsh.v;
			g.Dmtr.v.val = Math.max(J.m, J.n);
			g.Spcn.v.val = 10;
			y.data = {
				a: ActionTypes.$.kI,
				pb: "add",
				Oo: PsdResourceTypes.CV,
				G2: {
					list: [{
						t: "Objc",
						v: T
					}],
					BF: [r],
					yO: []
				}
			};
			this.dispatch(y);
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.Sq,
				Q_: T
			};
			this.dispatch(y)
		}
		if (l.data.Oo == 2) {
			var Y = b.LW(),
				k = Y[0][Y[1][0]],
				F = {
					GC: Q.getName(),
					Zc: I,
					i: k.add.vmsk.clone().i
				},
				D = PixelUtil.path.oh(F.i),
				q = new Matrix2D(D.m, 0, 0, D.n, D.x, D.y);
			q.hI();
			PixelUtil.path.transformFlatCoords(F.i, q);
			D.x = D.y = 0;
			F.W5 = D.clone();
			y.data = {
				a: ActionTypes.$.kI,
				pb: "add",
				Oo: PsdResourceTypes.XX,
				G2: [F]
			};
			this.dispatch(y)
		}
	}
	if (d == ActionTypes.$.ub) {
		this.DE.SP(l.data.Oo);
	}
	if (d == ActionTypes.$.Um) {
		var H = l.data.ar3,
			W = l.data.bR;
		if (H != !0 && W != !0 && this.WO("open")) return;
		var Z = this.gD.ZF();
		if (W) Z = -1 - Z;
		this.DE.anB(H || W ? Z : null, l.data.aux)
	}
	if (d == ActionTypes.$.Bs) {
		var B = l.data.abe,
			a = l.data.F0,
			m;
		if (B == PsdResourceTypes.G9 && l.data.stylePresets != null) m = l.data.stylePresets;
		else {
			m = this.oZ(B);
			if (a) {
				var p = B == PsdResourceTypes.CV,
					c = [],
					Q = p ? m.list : m;
				for (var A = 0; A < a.length; A++) {
					var t = Q[a[A]];
					if (t == null) continue;
					if (B == PsdResourceTypes.XX && t.GC == null) continue;
					c.push(t)
				}
				m = p ? {
					yO: m.yO,
					BF: m.BF,
					list: c
				} : c
			}
		}
		if (B == PsdResourceTypes.G9) {
			var t = new PsdDocument;
			m = this.resolveLayerStyleExportList(m);
			for (var A = 0; A < m.length; A++) {
				if (m[A] == null) continue;
				var v = m[A].x1 && m[A].x1.Lefx;
				if (v) PatternHelper.afI(v, t, this.fB._N)
			}
			m = {
				rL: t.add.Patt ? t.add.Patt : [],
				RY: m
			}
		}
		if (B == PsdResourceTypes.qa) {
			var i = this.fB.pO;
			m = {
				BF: [],
				yO: [],
				list: m
			};
			console.log(m)
		}
		if (B == PsdResourceTypes.v) m = m[l.data.yD];
		if (B == PsdResourceTypes.lL && m) {
			var hK = this.fB._N;
			for (var hA = 0; hA < m.length; hA++) {
				var hL = m[hA];
				if (hL && !hL.Rj && hL.id) {
					var hM = PatternHelper.xQ({
						classID: "Ptrn",
						Idnt: {
							t: "TEXT",
							v: hL.id
						},
						Nm: {
							t: "TEXT",
							v: hL.name || ""
						}
					}, hK);
					if (hM && hM.Rj) m[hA] = hM
				}
			}
			m = m.filter(function(hN) {
				return hN && hN.Rj
			})
		}
		if (B == PsdResourceTypes.XX && Array.isArray(m)) {
			m = m.filter(function(hO) {
				return hO && hO.GC != null && hO.W5 && hO.i
			})
		}
		var z = PsdResourceTypes.Gz[B],
			V = z[2].IN(m);
		ClipboardHandler.save(V, z[1] + "." + z[0])
	}
	if (d == ActionTypes.$.bs) {
		var P = this.fB.Fr,
			C = l.data.ali;
		if (P.Nc && !P.ab$ && !C) {
			P.ahj = window.confirm("Load \"" + l.data.MS + "\" also next time you use the editor?\nManage it in Edit - Local Storage.");
			P.ab$ = !0
		}
		if ((P.ahj || C) && P.Nc) {
			P.XH[l.data.MS] = l.data.Ey;
			var y = new Action(ActionTypes.E.L);
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.ag
			};
			this.dispatch(y)
		}
	}
	if (d == ActionTypes.$.ay5) {
		var b = this.fk(),
			U = "<!DOCTYPE HTML>";
		if (b == null) return;
		var h = FormatHandler.CY(b.LT().buffer, b.m, b.n),
			L = window.open();
		U += "<head><script>setTimeout(function() {window.print();}, 10);</script></head>";
		U += "<body><img src=\"" + h + "\" /></body>";
		U += "</html>";
		L.document.write(U)
	}
	if (d == ActionTypes.$.mb) {
		if (this.WO("publishOnline")) return;
		var S = l.data.oE != "psd",
			b = this.fk();
		if (b == null) return;
		if (!S && b.vs) return;
		var E = "Your " + (S ? "picture" : "document") + " will be published at " + (S ? "Imgur" : "Photopea") + ".com under a public URL (known only to you). Proceed?";
		if (!S) E += " We guarantee 6+ months of storage.";
		var x = l.data.B9 ? !0 : confirm(E);
		if (x) {
			if (!S) {
				var y = new Action(ActionTypes.E.v, !0);
				y.G = f.yS;
				y.data = {
					a: LayerRecord.JQ
				};
				this.dispatch(y);
				var K = new Rect(0, 0, b.m, b.n);
				for (var A = 0; A < b.B.length; A++) {
					var Q = b.B[A];
					if (Q.rect.W6() || Q.IQ() || Q.c3() || Q._G() || Q.VF() || Q.add.TySh || Q.add.vmsk || Q.add.SoLd) continue;
					var u = K.wD(Q.rect);
					if (!u.XB(Q.rect) && !u.W6()) {
						var bC = PixelUtil.allocBytes(u.O() * 4);
						PixelUtil.blitRgbaRect(Q.buffer, Q.rect, bC, u);
						Q.buffer = bC;
						Q.rect = u
					}
					if (!PixelUtil.isSimpleFlatImage(Q.buffer, Q.rect.m, Q.rect.n)) continue;
					var O = Q.zD(),
						$ = Q.opacity,
						gX = Q.blendModeKey,
						_ = Q.usesClippingMask;
					Q.Oj(!0);
					Q.opacity = 255;
					Q.blendModeKey = "norm";
					b.g = [A];
					y.data = {
						a: LayerRecord.md,
						oE: "jpg"
					};
					this.dispatch(y);
					var jI = b.B[A];
					Q.Oj(O);
					jI.Oj(O);
					Q.opacity = jI.opacity = $;
					Q.blendModeKey = jI.blendModeKey = gX, Q.usesClippingMask = jI.usesClippingMask = _
				}
			}
			if (b.Gg) {
				b.Po()
			}
			var iw = b.m,
				hn = b.n,
				jq = l.data.azH,
				iv;
			if (jq)
				while (Math.max(iw, hn) > jq) {
					iw = iw >>> 1;
					hn = hn >>> 1
				}
			if (l.data.oE == "psd") iv = FormatHandler.h9(b, "psd", 0, 0, [!0, !0, !0, !1, !0]);
			else if (l.data.oE == "png") iv = FormatHandler.h9(b, "png", iw, hn);
			else {
				var kq = FormatHandler.h9(b, "png", iw, hn),
					eE = FormatHandler.h9(b, "jpg", iw, hn);
				iv = kq.byteLength < eE.byteLength ? kq : eE
			}
			if (S) ClipboardHandler.a7o(iv, l.data.B9);
			else this.DE.acQ(iv, b.name, l.data.B9, "psdshared")
		}
	}
	if (d == ActionTypes.$.WD) {
		var b = this.fk(),
			e8 = !1;
		if (b == null) return;
		if (b.Gg) {
			b.Po()
		}
			if (l.data.jO) {
			if (!this.wM(b, l.data.jO)) return;
			var V = exportHelper.exportFromOptionsArray(b, l.data.jO, this.fB);
			this.pp(V);
			e8 = !0
		} else if (b.Ta) {
			if (this.Mt.indexOf(b.Ta.Lf) != -1) {
				var V = new Uint8Array(FormatHandler.jA("PSD").bi(b, null, null, [!0, !1])),
					y = new Action(ActionTypes.E.v, !0);
				y.data = {
					a: LayerRecord.vH,
					Kv: b.Ta.Lf,
					data: V,
					id: b.Ta.au$,
					bf: b.name
				};
				y.G = f.yS;
				this.dispatch(y);
				alert("Smart Object updated")
			}
			e8 = !0
		} else if (this.WO("save")) {
			e8 = !0
		} else if (b.yi) {
			exportHelper.saveToGoogleDrive(b);
			e8 = !0
		} else if (b.O2) {
			exportHelper.saveToLocalStorage(b);
			e8 = !0
		} else if (b.pb && b.pb.RG) {
			if (!this.wM(b, b.pb.RG.formats)) return;
			this.DE.a5Q(b, this.fB, exportHelper.uploadToServer);
			e8 = !0
		} else if (b.vG && "psd jpg png gif webp svg bmp".split(" ").indexOf(b.o8) != -1) {
			this.adH();
			return
		}
		if (e8) {
			b.savedHistoryIndex = b.historyIndex;
			b.T_ = Date.now();
			b.uK = !0
		} else {
			var y = new Action(ActionTypes.E.L, !0);
			y.data = {
				a: ActionTypes.$.a1
			};
			this.dispatch(y)
		}
	}
	if (d == ActionTypes.$.a1) {
		if (!this.fB.N_) {
			alert("function is disabled");
			return
		}
		if (this.WO("saveAsPSD")) return;
		var b = this.fk();
		if (b == null) return;
		if (!this.wM(b)) return;
		var y = new Action(ActionTypes.E.v, !0);
		y.data = {
			a: LayerRecord.JQ
		};
		y.G = f.yS;
		this.dispatch(y);
		if (b.B.length > 8e3 && !confirm("Your document has " + b.B.length + " layers. Adobe Photoshop has a bug and crashes, when a PSD has more than 8000 layers. Do you want to proceed?")) return;
		var aI = {
			qv: []
		};
		b.root.asb([], aI);
		var dK = aI.qv;
		if (dK.length > 11 && !confirm("One layer is nested " + (dK.length - 1) + " times. Adobe Photoshop crashes, when a layer in a PSD is nested more than 10 times. Do you want to proceed?\n\nLongest nesting: " + dK.join(" \uD83E\uDC1A ") + ".")) return;
		var jC = window.showSaveFilePicker;
		if (window.parent != window) jC = null;
		if (jC && !l.data.a4z) {
			var d7 = {
				suggestedName: b.name,
				types: [{
					description: "PSD Files",
					accept: {
						"image/psd": [".psd"]
					}
				}]
			};
			jC(d7).then(function(l) {
				b.vG = l;
				b.name = l.name;
				b.bV = !0;
				b.o8 = "psd";
				this.adH()
			}.bind(this));
			return
		}
		var ka = window.gtag;
		if (b.pT() && ka) ka("event", b.o8 + ":" + s.decodeString(premiumSession.hasActiveEntitlement() ? "\"'|('61" : "w'| "), {
			event_category: "Formats"
		});
		if (b.Gg) {
			b.Po()
		}
		if (l.data.a4z) {
			var V = b.o8 == "psd" ? FormatHandler.jA("PSD").bi(b) : exportHelper.encodeDocumentToFormat(b, b.o8, this.fB);
			this.ahX(V, b, this)
		} else {
			var V = FormatHandler.jA("PSD").bi(b);
			ClipboardHandler.save(V, b.name);
			b.savedHistoryIndex = b.historyIndex;
			b.T_ = Date.now();
			b.uK = !0
		}
	}
	if (d == ActionTypes.$.dG) window.open(l.data.link, "_blank");
	if (d == ActionTypes.$.aw3) {
		if (this.dx.in()) {
			this.a30();
			return
		}
		var b = this.fk(),
			Q = b.B[b.g[0]],
			G = b.Lu(Q.add.SoLd.Idnt.v);
		for (var A = 0; A < this.Mt.length; A++) {
			var hS = this.Mt[A].Ta;
			if (hS != null && hS.au$ == G.AN && hS.Lf == b) {
				this.gD.AT(A);
				return
			}
		}
		ClipboardHandler.oy({
			name: G.bf,
			Ta: {
				au$: Q.add.SoLd.Idnt.v,
				Lf: b
			}
		}, G.raw.buffer, this)
	}
	if (d == ActionTypes.$.a2O) {
		var b = this.fk(),
			Q = b.B[b.g[0]],
			G = b.Lu(Q.add.SoLd.Idnt.v);
		ClipboardHandler.save(G.raw.buffer, G.bf)
	}
	if (d == ActionTypes.$.ajq) {
		ClipboardHandler.oy({
			name: l.data.O2[1].split("/").pop(),
			O2: l.data.O2
		}, l.data.XO, this)
	}
	if (d == ActionTypes.$.asn) {
		var b = this.fk();
		b.O2 = l.data.O2;
		b.name = b.O2[1].split("/").pop();
		var y = new Action(ActionTypes.E.L);
		y.data = {
			a: ActionTypes.$.WD
		};
		this.dispatch(y)
	}
	if (d == ActionTypes.$.Yq) {
		this.ayU()
	}
	if (d == ActionTypes.$.n4) {
		this.alR(l.data.sW, l.data.b4, l.data.$s)
	}
	if (d == ActionTypes.$.EZ) {
		this.ajM(l.data.asO, l.data.bl, l.data.$s)
	}
	if (d == ActionTypes.$.azm) {
		var eH = l.data.Z;
		if (this.fB.QN == f.zl && this.GK().in()) {
			var y = new Action(ActionTypes.E.v, !0);
			y.G = f.zl;
			y.data = {
				a: "insertText",
				Z: eH
			};
			this.dispatch(y);
			return
		}
		if (eH.startsWith("vcb;")) {
			var kA = JSON.parse(eH.slice(4));
			kA[0] = eU.aK(kA[0]);
			var y = new Action(ActionTypes.E.v, !0);
			y.G = f.o2;
			y.data = {
				a: "append",
				Il: "Paste Paths",
				avn: kA
			};
			this.dispatch(y)
		} else if (eH.startsWith("lrs;")) {
			var gq = eH.split(";"),
				hb = this.Mt[parseInt(gq[1])];
			if (hb == null) return;
			var ex = this.fk(),
				fs = hb.g;
			hb.g = JSON.parse(gq[2]);
			var f_ = hb.OB(null, hb != ex),
				y = new Action(ActionTypes.E.v, !0);
			y.data = {
				a: LayerRecord.Bl,
				B: f_,
				Lf: hb,
				IC: ex
			};
			y.G = f.yS;
			this.dispatch(y);
			hb.g = fs
		} else if (eH.startsWith("<!--") || eH.startsWith("<svg")) {
			var bD = X.zE(eH),
				ae = FormatHandler.jA("svg"),
				t = new PsdDocument("image.psd");
			ae.gR(bD.buffer, t);
			if (this.Mt.length != 0) {
				var em = t.B;
				if (em.length == 3 && em[0].getName() == "</Layer group>" && em[2].IQ()) em = [em[1]];
				var y = new Action(ActionTypes.E.v, !0);
				y.G = f.yS;
				y.data = {
					a: LayerRecord.Bl,
					B: em,
					Lf: t,
					IC: this.fk()
				};
				this.dispatch(y)
			} else this.aly(t)
		}
	}
	if (d == ActionTypes.$.WM) {
		ScriptingEngine.runScript(l.data.nM, this)
	}
	if (d == ActionTypes.$.B_) {
		var dY = parseFloat(l.data.GU);
		if (this.fB.J_.indexOf(dY) == -1) {
			var y = new Action(ActionTypes.E.L, !0);
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.X2,
				Z: dY,
				pb: "add"
			};
			this.dispatch(y)
		}
	}
	if (d == ActionTypes.$.V7) {
		this.i2.a1U(this.fk(), this.fB)
	}
	if (d == ActionTypes.$.SN) {
		var f7 = "open_from_url openFromURL camera takePic templates showTemplates newproject new eassets exportLayers".split(" ");
		for (var A = 0; A < f7.length; A += 2)
			if (l.data.GU == f7[A] && this.WO(f7[A + 1])) return;
		if (!this.fB.N_ && l.data.window == "saveforweb") {
			alert("function is disabled");
			return
		}
		this.dx.aqd(l.data.GU, this.fk(), l.data, this.Mt, this.Ib)
	}
	if (d == ActionTypes.$.hK) ClipboardHandler.save(l.data.data, l.data.name);
	if (d == ActionTypes.$.lr) {
		if (!this.dx.in() || l.Fj) this.aly(l.data.Kv)
	}
	if (d == ActionTypes.$.gL) {
		this.gD.AT(l.data.target);
		var y = new Action(ActionTypes.E.v, !0);
		y.data = {
			a: LayerRecord.abT,
			Kv: l.data.Kv,
			tZ: l.data.tZ,
			ca: l.data.ca
		};
		y.G = f.yS;
		this.dispatch(y);
		this.fr(f.qK)
	}
	if (d == ActionTypes.$.amK) {
		WebGLContext.webglAvailable = !WebGLContext.webglAvailable;
		if (this.Mt.length > 0) this.fk().U()
	}
	if (d == ActionTypes.$.a4a) {
		var bM = premiumSession.$O();
		if (bM != null && bM.globals != null) this.I2(bM.globals);
		this.S7()
	}
	if (d == ActionTypes.$.dw) {
		this.DE.lI(l.data.data, null, l.data.lh, l.data.cz, l.data.asr)
	}
	if (d == ActionTypes.$.yb) {
		var iP = this.GK();
		if (!this.dx.Uf() != null) this.fr(l.data.G, l.data.Ye);
		var jp = this.GK();
		if (jp != iP && l.data.a1Z) jp.dJ(this.fk(), this, this.fB, this.Ib, this.YE)
	}
	if (d == ActionTypes.$.PN) {
		if (this.d.Vu) this.fr(this.d.Vu)
	}
	if (d == ActionTypes.$.kl) {
		var hG = this.d.map[l.data.G].G,
			b = this.fk();
		hG.A0(l.data, this, b, this.Ib, this.fB);
		if (b) b.i_ = !0;
		this.abF()
	}
	if (d == ActionTypes.$.vq) {
		var hf = this.d.map[l.data.G];
		this.auf(hf);
		hf.x5.IF(l.data)
	}
	if (d == ActionTypes.$.kI) {
		var b = this.fk(),
			d2 = l.data.Oo,
			gu = l.data.G2,
			ip = this.fB;
		if (l.data.pb == "set") {
			var jp = f.avH(gu);
			if (ip.QN != jp) this.fr(jp);
			this.d.map[jp].x5.a81(gu, ip)
		}
		if (l.data.pb == "add") {
			var z = PsdResourceTypes.Gz[d2];
			if (d2 == PsdResourceTypes.X2) {
				ip.J_.push(l.data.Z);
				ip.J_.sort(function(e6, fi) {
					return e6 - fi
				})
			} else if (z == null) {
				if (gu) ip.Hg.aym(gu, l.data.a9t);
				if (b) b.uK = !0
			} else {
				var aQ = this.oZ(d2);
				if (d2 == PsdResourceTypes.CV) {
					aQ.BF = aQ.BF.concat(gu.BF);
					aQ.yO = aQ.yO.concat(gu.yO);
					aQ = aQ.list;
					gu = gu.list
				}
				if (d2 == PsdResourceTypes.G9 && b) {
					for (var A = 0; A < gu.length; A++) {
						var v = gu[A].x1.Lefx;
						if (v) PatternHelper.aeG(v, b, ip._N)
					}
				}
				if (d2 == PsdResourceTypes.qa && gu == null) {
					var t = this.d.map[ip.QN].x5.a5o();
					if (t == null) return;
					gu = [t]
				}
				for (var A = 0; A < gu.length; A++) aQ.push(gu[A]);
				if (d2 == PsdResourceTypes.XX) {
					var iL = {};
					for (var A = 0; A < aQ.length; A++) {
						var jx = aQ[A].GC;
						while (iL[jx] != null) jx = aQ[A].GC = jx + "X";
						iL[jx] = !0
					}
				}
				if (l.data.a9t != !0)
					if (aQ.length != gu.length || d2 == PsdResourceTypes.Sv || d2 == PsdResourceTypes.G9 || d2 == PsdResourceTypes.X5 || d2 == PsdResourceTypes.v) alert(languageManager.get(z[3]) + " added.")
			}
		}
		if (l.data.pb == "del") {
			if (d2 == PsdResourceTypes.X2) {
				ip.J_.splice(ip.J_.indexOf(l.data.Z), 1)
			} else {
				var z = PsdResourceTypes.Gz[d2],
					a = l.data.F0,
					aQ = this.oZ(d2);
				if (d2 == PsdResourceTypes.CV) aQ = aQ.list;
				for (var A = 0; A < a.length; A++) aQ[a[A]] = null;
				for (var A = 0; A < aQ.length; A++)
					if (aQ[A] == null) {
						aQ.splice(A, 1);
						A--
					}
				alert(languageManager.get(z[3]) + " deleted.")
			}
		}
		if (l.data.pb == "rnm") {
			var z = PsdResourceTypes.Gz[d2],
				aQ = this.oZ(d2);
			if (d2 == PsdResourceTypes.CV) aQ = aQ.list;
			if (aQ[l.data.F0[0]] == null) return;
			z[2].Pl(aQ[l.data.F0[0]], l.data.Z)
		}
		if (d2 == PsdResourceTypes.pc) {
			var ep = l.data.Z;
			ip.Xf = ep;
			ip.avK[ep.hA] = ep.rU
		}
		if (d2 == PsdResourceTypes.$o) {
			var ep = l.data.Z;
			ip.PB = JSON.parse(JSON.stringify(ep));
			var gz = ep.strokeEnabled.v,
				ed = ep.strokeStyleContent.v,
				bo = gz ? {
					hA: 1 + LayerStyleConstants.strokeStyle.contentLayerClassIDs.indexOf(ed.classID),
					rU: ed
				} : {
					hA: 0
				};
			ip.air[bo.hA] = bo.rU
		}
		if (d2 == PsdResourceTypes.W_) {
			ip.dV = l.data.Z
		}
		if (d2 == PsdResourceTypes.o$) {
			ip.XG = l.data.XG
		}
		if (d2 == PsdResourceTypes.Sq) {
			var bC = JSON.parse(JSON.stringify(l.data.Q_)),
				d0 = bC.useBrushSize;
			if (d0 && d0.v) {
				bC.Brsh.v.Dmtr.v.val = ip.pO.Em.Brsh.v.Dmtr.v.val;
				d0.v = !1
			}
			ip.pO.Em = bC
		}
		if (d2 == PsdResourceTypes.GG) {
			ip.fL = l.data.mz
		}
		if (d2 == PsdResourceTypes.Gp) {
			ip.G2 = l.data.mz
		}
		if (d2 == PsdResourceTypes.K5) {
			var c0, cv = "Clrs";
			if (l.data.y3 < 2) {
				var iH = l.data.Z,
					bS = l.data.y3 == 0,
					gg = PixelUtil.color.rgbColorDescriptor({
						o: iH >>> 16,
						J: iH >>> 8 & 255,
						k: iH & 255
					});
				if (bS) ip.Y7 = iH;
				else ip.GF = iH;
				cv = bS ? "FrgC" : "BckC";
				c0 = {
					kT: "set",
					a0: {
						__name: "Set",
						classID: "setd",
						T: {
							t: "Objc",
							v: gg
						}
					}
				}
			}
			if (l.data.y3 == 2) {
				var bG = ip.Y7;
				ip.Y7 = ip.GF;
				ip.GF = bG;
				c0 = {
					kT: "exchange",
					a0: {
						__name: "Exchange",
						classID: "Exch"
					}
				}
			}
			if (l.data.y3 == 3) {
				ip.Y7 = 0;
				ip.GF = 16777215;
				if (b != null && b.g.length != 0 && b.B[b.g[0]].ht == 1) {
					var bG = ip.Y7;
					ip.Y7 = ip.GF;
					ip.GF = bG
				}
				c0 = {
					kT: "reset",
					a0: {
						__name: "Reset",
						classID: "Rset"
					}
				}
			}
			if (c0) {
				c0.a0.null = {
					t: "obj ",
					v: [{
						t: "prop",
						v: {
							classID: "Clr",
							keyID: cv
						}
					}]
				};
				var hf = this.GK();
				hf.QF = this;
				hf.track(c0)
			}
		}
		if (d2 == PsdResourceTypes.yv) {
			ip.bI = !ip.bI;
			this.e3()
		}
		if (d2 == PsdResourceTypes.Z3) {
			ip.Wi = !ip.Wi;
			this.e3()
		}
		var jj = ip.hq;
		if (d2 == PsdResourceTypes.Xe) {
			jj.vF = !jj.vF;
			this.e3()
		}
		if (d2 == PsdResourceTypes.fe) {
			jj.t_ = !jj.t_;
			this.e3()
		}
		if (d2 == PsdResourceTypes.ef) {
			jj.qz = !jj.qz;
			this.e3()
		}
		if (d2 == PsdResourceTypes.oV) {
			jj.Sp = !jj.Sp;
			this.e3()
		}
		if (d2 == PsdResourceTypes.pn) {
			jj.vr = !jj.vr;
			this.e3()
		}
		if (d2 == PsdResourceTypes.T$) {
			jj.Vp = !jj.Vp;
			this.e3()
		}
		if (d2 == PsdResourceTypes.UW) {
			ip.hq = l.data.mz;
			this.e3()
		}
		if (d2 == PsdResourceTypes.a0B) {
			ip.gX = !ip.gX;
			this.e3()
		}
		if (d2 == PsdResourceTypes.LU) {
			ip.v1[l.data.XY] = !ip.v1[l.data.XY];
			this.e3()
		}
		if (d2 == PsdResourceTypes.Ef) {
			languageManager.loadLanguageByIndex(l.data.lang, this.vg)
		}
		if (d2 == PsdResourceTypes.userMask$) {
			ip.j$ = l.data.j$;
			this.refresh()
		}
		if (d2 == PsdResourceTypes.ag && ip.Fr.Nc) {
			var ay = ip.Fr.Nc.transaction(["rsrc"], "readwrite").objectStore("rsrc"),
				cH = ay.put({
					k: "fs0",
					fset: ip.Fr.XH
				});
			cH.onerror = function(l) {
				alert("Storing failed. Browser says: " + l.target.error.message, 7e3)
			}
		}
		this.Sh(d2)
	}
};

PhotopeaApp.prototype.adH = function() {
	var l = new Action(ActionTypes.E.L, !0);
	l.data = {
		a: ActionTypes.$.B8,
		wh: "Saving ..."
	};
	this.dispatch(l);
	setTimeout(function() {
		var l = new Action(ActionTypes.E.L, !0);
		l.data = {
			a: ActionTypes.$.a1,
			a4z: !0
		};
		this.dispatch(l)
	}.bind(this), 20)
};

PhotopeaApp.prototype.ahX = function(l, d) {
	d.vG.createWritable().then(function(G) {
		G.write(l);
		return G
	}).then(function(G) {
		return G.close()
	}).then(function(G) {
		d.savedHistoryIndex = d.historyIndex;
		d.T_ = Date.now();
		d.uK = !0;
		var b = new Action(ActionTypes.E.L, !0);
		b.data = {
			a: ActionTypes.$.jn,
			wh: "Saving ..."
		};
		this.dispatch(b)
	}.bind(this)).catch(function(G) {
		var b = new Action(ActionTypes.E.L, !0);
		b.data = {
			a: ActionTypes.$.jn,
			wh: "Saving ..."
		};
		this.dispatch(b)
	}.bind(this))
};

PhotopeaApp.prototype.aq6 = function() {
	var l = this.fB,
		d = l.G2,
		G = l.a5N;
	for (var A = 0; A < d.length; A++) {
		var b = d[A];
		if (G[b]) continue;
		G[b] = !0;
		this.DE.wq(b, !1, !0)
	}
};

PhotopeaApp.prototype.aA0 = function() {
	this.refresh();
	this.e3()
};

PhotopeaApp.prototype.WO = function(l) {
	var d = this.fB.QR[l];
	if (d) {
		var G = new Action(ActionTypes.E.L, !0);
		G.data = {
			a: ActionTypes.$.WM,
			nM: d
		};
		this.dispatch(G)
	}
	return d != null
};

PhotopeaApp.prototype.wM = function(l, d) {
	var G = !0,
		t = 15;
	if (d) {
		G = !1;
		for (var A = 0; A < d.length; A++)
			if (d[A].startsWith("psd")) G = !0
	}
	var b = l.pT() || l.Ta && l.Ta.Lf.pT();
	if (this.QG()) b = !1;
	var V = new s.global.Date,
		Q = (V.getHours() & 1) * 60 + V.getMinutes();
	if (b && !premiumSession.hasActiveEntitlement() && Q > t && G) {
		var I = s.document.location.href,
			y = `To get money for our development, Sketch/XD to PSD conversion can be used only during the first 15 minutes every two hours.`;
		y += "\n\n" + `Get a Premium account (for the unlimited access), or wait` + (-Q + 120) + " minutes";
		if (I.indexOf("photopea.com") == -1) {
			y = "This feature is not available";
		}
		s.global._cwY(y);
		return !1
	}
	return !0
};

PhotopeaApp.prototype.oZ = function(l) {
	var d = this.fB,
		G = [PsdResourceTypes.CV, PsdResourceTypes.Rz, PsdResourceTypes.HJ, PsdResourceTypes.X5, PsdResourceTypes.lL, PsdResourceTypes.XX, PsdResourceTypes.G9, PsdResourceTypes.Sv, PsdResourceTypes.v, PsdResourceTypes.qa, PsdResourceTypes.Qo],
		b = [d.pO, d.dR, d.Oz, d.w1, d._N, d.t6, d.Pr, d.ak1, d.rJ, d.UL, d.a8v];
	return b[G.indexOf(l)]
};

PhotopeaApp.prototype.resolveLayerStyleExportList = function(l) {
	if (l == null) return [];
	if (l.RY && Array.isArray(l.RY)) return l.RY;
	if (!Array.isArray(l)) return [];
	if (l.length === 2 && Array.isArray(l[0]) && Array.isArray(l[1])) {
		var hR = l[0][0],
			hS = l[1][0];
		if (hR && hR.Zc != null) return l[0];
		if (hS && hS.Zc != null) return l[1];
		return l[0]
	}
	var hT = [];
	for (var A = 0; A < l.length; A++)
		if (l[A] && l[A].Zc != null) hT.push(l[A]);
	return hT
};

PhotopeaApp.prototype.ayU = function() {
	var l = this.alR(),
		d = this.fk();
	if (d == null || d.g.length == 0) return;
	var G = d.B[d.g[0]],
		b = new Action(ActionTypes.E.v);
	if (l == 1) {
		b.G = f.o2;
		b.data = {
			a: "remove",
			Il: "Cut Paths"
		}
	} else {
		b = new Action(ActionTypes.E.g5);
		b.data = {
			kT: "delete"
		}
	}
	this.dispatch(b)
};

PhotopeaApp.prototype.alR = function(l, d, G) {
	if (l == null) l = !1;
	var b = this.fB;
	console.log("doCopy", l, d);
	var V = this.fk();
	if (b.QN == f.zl && this.GK().in()) {
		var Q = new Action(ActionTypes.E.v, !0);
		Q.G = f.zl;
		Q.data = {
			a: "copyText"
		};
		this.dispatch(Q);
		return
	}
	if (V == null || V.g.length == 0) return;
	var t = V.B[d == null ? V.g[0] : d],
		I = V.LW(),
		y = I[0],
		e = I[1],
		M = y[e[0]];
	if (!l && M != null && M.add.vmsk.g.length != 0) {
		var R = f.nr.ii(M.add.vmsk, M.add.vogk);
		if (s.hasClipboardSupport()) {
			R[0] = eU.axP(R[0]);
			var J = "vcb;" + JSON.stringify(R);
			ClipboardHandler.W4(new Blob([J], {
				type: "text/plain"
			}))
		} else b.C6 = R;
		return 1
	} else if (V.P == null) {
		if (s.hasClipboardSupport()) {
			var J = "lrs;" + this.Mt.indexOf(V) + ";" + JSON.stringify(V.g);
			ClipboardHandler.W4(new Blob([J], {
				type: "text/plain"
			}))
		}
	} else {
		var n, r;
		if (l) {
			var T = new Rect(0, 0, V.m, V.n);
			r = T.wD(V.P.rect);
			n = PixelUtil.allocBytes(r.O() * 4);
			PixelUtil.blitRgbaRect(V.LT(), T, n, r);
			PixelUtil.multiplyMaskIntoRgbaAlpha(V.P.channel, V.P.rect, n, r)
		} else if (V.FB.length != 0) {
			r = V.P.rect.clone();
			n = PixelUtil.allocBytes(r.O() * 4);
			var g = V.vj[V.FB[0]],
				Y = g.Ua(r);
			PixelUtil.grayPlaneToRgbaChannels(Y, n);
			PixelUtil.writeChannelToRgba(V.P.channel, n, 3)
		} else {
			var k = t.VA(V, V.P);
			if (k == null) {
				alert("Copied area is empty");
				return
			}
			n = k.XO;
			r = k.rect
		}
		var F = V.u.MX,
			D = F[0] + F[1] + F[2];
		if (D == 1) {
			var q = F.indexOf(1);
			for (var A = 0; A < n.length; A += 4) n[A] = n[A + 1] = n[A + 2] = n[A + q]
		}
		var H = new Point2D(V.m, V.n);
		if (s.hasClipboardSupport() && G != !0) {
			var W = FormatHandler.jA("PNG").a7u(n.buffer, r.m, r.n);
			ClipboardHandler.W4(new Blob([new Uint8Array(W)], {
				type: "image/png"
			}));
			this.aij = {
				vD: r,
				XM: H
			}
		} else b.wH = {
			buffer: n,
			rect: r,
			XM: H
		};
		b.al2 = r.clone();
		b.C6 = null
	}
};

PhotopeaApp.prototype.ajM = function(l, d, G) {
	if (d) this.a0P = !0;
	console.log("doPaste");
	var b = this.fB,
		V = b.wH,
		y;
	if (this.Mt.length == 0) {
		if (!l && s.hasClipboardSupport()) {
			ClipboardHandler.Wy(this, null);
			return
		}
		if (V) {
			var Q = FormatHandler.wP("image.psd", [{
					data: V.buffer.buffer,
					uA: V.rect
				}]),
				t = new Action(ActionTypes.E.L);
			t.data = {
				a: ActionTypes.$.lr,
				Kv: Q
			};
			this.dispatch(t)
		}
		return
	}
	var Q = this.fk();
	if (b.QN == f.zl && this.GK().in()) {
		ClipboardHandler.Wy(this, null);
		return
	}
	var I = Q.B[Q.g.length == 0 ? Q.B.length - 1 : Q.g[0]];
	if (b.C6) {
		var e = Q.LW(!0),
			M = e[0],
			R = e[1];
		y = M[R[0]]
	}
	var t = new Action(ActionTypes.E.v, !0);
	if (b.C6 != null && y != null) {
		t.G = f.o2;
		t.data = {
			a: "append",
			Il: "Paste Paths",
			avn: b.C6
		}
	} else if (!l && s.hasClipboardSupport() && G != !0) {
		ClipboardHandler.Wy(this, this.acq.bind(this));
		return
	} else {
		if (V == null) return;
		if (Q.T8(!1) && (Q.u.MX.join("") != "111" || Q.FB.length != 0 || I.ht > 0 || I.rect.W6())) {
			t.G = f.CV;
			t.data = {
				a: "draw",
				apC: !0,
				Il: [5, 2]
			}
		} else {
			t.G = f.yS;
			t.data = {
				a: LayerRecord.H0,
				bl: this.a0P
			};
			this.a0P = !1
		}
		// edit: clipbard paste JPEG
		t.data.wH = V
	}
	this.dispatch(t)
};

PhotopeaApp.prototype.awP = function() {
	var l = this.fB.Hg;
	if (l.a2w()) return;
	for (var A = 0; A < this.Mt.length; A++) {
		var d = this.Mt[A];
		if (!StyleHelper.allTextLayersHaveFonts(d, l, this)) continue;
		if (d.ya) StyleHelper.rasterizeTextLayersWithFonts(d, l, this);
		var G = d.add.lnk2;
		if (G)
			for (var b = 0; b < G.length; b++) {
				var V = G[b];
				if (V.ya) f.uj.$x(d, V.AN, V.hF[1], V.hF[1], l)
			}
		if (d.a8Q) continue;
		d.a8Q = !0;
		if (d.pb && d.pb.an2) ScriptingEngine.runScript(d.pb.an2, this);
		this.pp();
		var Q = new Action(ActionTypes.E.v);
		Q.G = f.yS;
		Q.data = {
			a: LayerRecord.ZP
		};
		var t = new Action(ActionTypes.E.L);
		t.data = {
			a: ActionTypes.$.B_,
			GU: PanelTabBase.xA.atY
		};
		t.data = {
			a: ActionTypes.$.SN,
			GU: "eassets",
			oE: 3
		}
	}
};

PhotopeaApp.prototype.Sh = function(l) {
	this.aq6();
	var d = this.fB,
		G = d.QN,
		t = !1;
	if (l == PsdResourceTypes.Sq) {
		if (this.d.map[G].x5) this.d.map[G].x5.BM(d, l)
	} else
		for (var b in this.d.map)
			if (this.d.map[b].x5) this.d.map[b].x5.BM(d, l);
	if (l == PsdResourceTypes.jz) {
		if (G != f.zl) this.d.map[f.zl].G.BM(d, l);
		this.awP()
	}
	this.gD.BM(d, l);
	this.dx.BM(d, l);
	this.GK().BM(d, l);

	var V = d.XG,
		Q = V.xg.Font;
	if (l == PsdResourceTypes.o$ && Q != null && V.rA[Q].Name != d.font) {
		d.font = V.rA[Q].Name;
		t = !0
	}
	if ([PsdResourceTypes.X2, PsdResourceTypes.GG, PsdResourceTypes.Gp, PsdResourceTypes.K5, PsdResourceTypes.yv, PsdResourceTypes.Z3, PsdResourceTypes.UW, PsdResourceTypes.ef, PsdResourceTypes.oV, PsdResourceTypes.Xe, PsdResourceTypes.fe, PsdResourceTypes.pn, PsdResourceTypes.T$, PsdResourceTypes.Ef, PsdResourceTypes.userMask$].indexOf(l) != -1 || t) this.abF()
};

PhotopeaApp.prototype.abF = function() {
	if (!this.w4) return;
	var l = {},
		d = this.d.map;
	for (var G in d) {
		var b = d[G].G;
		if (b.v2 && b.v2() != null) l["t" + G] = b.v2()
	}
	var V = this.fB,
		Q = V.hq,
		t = {
			guides: Q.qz,
			grid: Q.Sp,
			sels: Q.vF,
			paths: Q.t_,
			pgrid: Q.vr,
			slices: Q.Vp,
			gsize: parseFloat(Q.rp.toFixed(2)),
			gunits: Q.v7,
			gtype: Q.ra,
			runits: Q.SF
		};
	if (Q.E6 != 8421504) t.gcol = Q.E6;
	var I = {
		fcolor: V.Y7,
		bcolor: V.GF,
		rulers: V.bI,
		extras: V.Wi,
		favFam: V.fL,
		rsrc: V.G2,
		panels: V.J_,
		eparams: t,
		lang: languageManager.getCurrentLanguageCode(),
		theme: V.j$,
		as: V.r8,
		co: V.dS,
		topt: l
	};
	if (V.font != null) I.font = V.font;
	var y = premiumSession.$O();
	if (y == null) y = {};
	y.globals = I;
	premiumSession.saveRecordLocally(y)
};

PhotopeaApp.prototype.Gd = function(l) {
	var d = this.Ib,
		G = this.YE,
		b = this.fB.QN,
		V = this.d.map[b].G,
		Q = null,
		t = !1;
	for (var A = 0; A < this.d.a41.length; A++) {
		var I = this.d.a41[A],
			y = !0;
		for (var e = 0; e < I.C0.length; e++) {
			var M = I.C0[e];
			if (!d.l(M)) y = !1
		}
		if (y && (!I.Ol || !V.in()) && (I.xk == null || I.xk.indexOf(b) != -1)) {
			Q = I.G;
			t = I.Ol;
			break
		}
	}
	if ((!G.oW || b == f.gc || l) && this.d.JB != Q && (Q != b || !t)) {
		var R = this.fk();
		if (this.d.JB != null && Q == null) this.GK().disable(R, this, this.fB, d, !0);
		this.d.JB = Q;
		this.GK().enable(R, this, this.fB, d, Q != null && Q != b)
	}
};

PhotopeaApp.prototype.Xh = function(l) {
	var d = this.fB.QN,
		G = this.fk();
	if (d != null) {
		this.d.map[d].G.disable(G, this, this.fB, this.Ib)
	}
};

PhotopeaApp.prototype.auf = function(l) {
	if (l.x5 == null) {
		l.x5 = new l._g;
		l.x5.aoU(l.G.id, l.G.mq);
		l.x5.BM(this.fB, PsdResourceTypes.Wx);
		l.x5.refresh()
	}
};

PhotopeaApp.prototype.fr = function(l, d) {
	if (l == f.qK && this.dx.Uf()) return;
	var G = this.fk(),
		b = this.fB;
	if (this.d.map[l].G.Py(G, b)) {
		this.Xh();
		if (l != b.QN) this.d.Vu = b.QN ? b.QN : f.$C;
		b.QN = l;
		var V = this.d.map[l];
		this.d.L7[V.vv] = V.a6C;
		this.auf(V);
		var Q = V.G;
		Q.enable(G, this, this.fB, this.Ib, !1, d);
		if (G) G.i_ = !0;
		this.e3();
	}
};

PhotopeaApp.prototype.GK = function(l) {
	var d = this.d,
		G = d.rE,
		b = d.JB,
		V = this.fB.QN;
	if (G) V = G;
	else if (b && l == null) V = b;
	return d.map[V].G
};

PhotopeaApp.prototype.aly = function(l) {
	var d = this.fB,
		G = this.Mt.indexOf(l);
	if (G != -1) {
		this.gD.AT(G);
		return
	}
	if (this.CA && (l.pb == null || l.pb.RG == null)) {
		l.pb = {
			RG: this.CA
		}
	}
	if (l.$a == null) {
		l.$a = "local," + this.aeT + "," + l.name;
		this.aeT++
	}
	l.T_ = Date.now();

	for (var A = 0; A < l.B.length; A++) {
		var b = l.B[A];
		if (b.add.SoLd != null) {
			var V = Date.now()
		}
	}
	
	if (WebGLContext.webglAvailable) {
		WebGLContext.checkMaxTextureSize(Math.max(l.m, l.n));
		for (var A = 0; A < l.B.length; A++) {
			var b = l.B[A];
			if (b.Eo()) {
				WebGLContext.checkMaxTextureSize(Math.max(b.rect.m, b.rect.n))
			}
		}
	}
	l.vp();
	l.vo();
	if (l.a00) l.a93();
	else l.U();
	l.a00 = !1;
	this.Mt.push(l);
	this.gD.$J(new NamedTabPanel(l));
	l.i_ = !0;
	l.uK = !0;
	this.awP();

	// var y = new Action(ActionTypes.E.v);
	// y.G = f.Qi;
	// y.data = {
	// 	a: "auto",
	// 	nx: 2
	// };
};

PhotopeaApp.prototype.fk = function() {
	return this.Mt[this.AQ]
};

PhotopeaApp.prototype.a3S = function() {
	return this.dx.Uf() == null
};

PhotopeaApp.prototype.MF = function(l, d) {
	this.Xh();
	var G = this.Mt.length;
	if (d != null) this.gD.AT((this.gD.ZF() + d + G) % G);
	this.AQ = this.gD.ZF();
	var b = this.fk();
	this.e3();
	if (b) b.i_ = !0
};

PhotopeaApp.prototype.awi = function(l) {
	this.Xh();
	var d = this.Mt[l.data.iu];
	this.Mt.splice(l.data.iu, 1);
	if (this.Mt.length == 0) {
		this.MF(l);
		var G = WebGLContext.getCanvas(),
			b = NamedTabPanel.wn.Lp;
		if (G.parentNode) G.parentNode.removeChild(G);
		if (b.parentNode) b.parentNode.removeChild(b)
	}
};

PhotopeaApp.prototype.acY = function(l) {
	var d = [],
		G = l.data.aqF;
	for (var A = 0; A < G.length; A++) d[A] = this.Mt[G[A]];
	this.Mt = d;
	this.AQ = this.gD.ZF()
};

PhotopeaApp.prototype.agE = function(l) {
	var d = this.gD,
		G = d.arO(),
		b = this.GK(),
		V = this.fk();
	if (G == d.ZF() || !b.azC()) return;
	this.a9z(G, b)
};

PhotopeaApp.prototype.a9z = function(l, d) {
	console.log("dup2doc");
	var G = this.fB,
		b = this.gD,
		V = this.fk(),
		Q = this.Mt[l],
		t, I = new Action(ActionTypes.E.v, !0);
	I.G = f.yS;
	if (V.P == null) {
		I.data = {
			a: LayerRecord.Bl,
			B: V.OB(null, !0),
			Lf: V,
			IC: Q
		};
		this.dispatch(I)
	} else t = V.B[V.g[0]].VA(V, V.P);
	var y = this.YE,
		e = G.bI;
	G.bI = !1;
	y = V.u.Zx(y.x, y.y);
	if (d) d.fW(V, this, G, this.Ib);
	b.AT(l);
	if (V.P) {
		I.data = {
			a: LayerRecord.H0,
			wH: {
				buffer: t.XO,
				rect: t.rect
			}
		};
		this.dispatch(I)
	}
	y = Q.u.dN(y.x, y.y);
	y.x += 48;
	y.y += 121;
	if (d) d.dJ(Q, this, G, this.Ib, y);
	G.bI = e
};

PhotopeaApp.prototype.azg = function(l) {
	var d = this.fk(),
		G = this.Ib,
		b = this.fB,
		V = l.OJ;
	if (V) this.YE = V;
	if (V) V.y -= b.dS;
	if (this.DP == null) this.DP = 0;
	if (l.action == "multidown") {
		this.pZ = l.Cs.length;
		this.DP = Date.now()
	}
	if (l.action == "up" && Date.now() - this.DP < 100) {
		var Q = new Action(ActionTypes.E.v);
		Q.G = f.lv;
		Q.data = {
			a: this.pZ == 2 ? "h_stepbck" : "h_stepfwd"
		};
		this.dispatch(Q)
	}
	if (l.action.startsWith("multi")) {
		var t = new Action(ActionTypes.E.v, !0);
		t.data = {
			a: l.action,
			Cs: l.Cs
		};
		t.G = f.t7;
		this.dispatch(t);
		return
	}
	var I = this.d.map[f.$C].G;
	if ((l.action == "down" || l.action == "rdown") && b.QN != f.$C && this.d.JB != f.$C && I.anf(d, this, b, G, V)) {
		this.d.rE = f.$C;
		I.enable(d, this, b, G, !0)
	}
	if (l.action == "idown") {
		G.sm("Space");
		this.Gd(!0);
		l.action = "down"
	}
	var y = this.dx.Uf(),
		e = y != null && y.ba() && this.d.JB == null ? y : this.GK();
	if (l.action == "scroll") {
		var M = !G.l(KeyboardHandler.wz) && l.Bd,
			t = new Action(ActionTypes.E.v, !0);
		t.data = {
			a: "scroll",
			tc: l.tc.clone(),
			OJ: V,
			azv: M
		};
		t.G = G.l(KeyboardHandler.Jm) || M ? f.t7 : f._O;
		this.dispatch(t)
	}
	if (y != null && e != y && this.dx.in() && e.id != f._O && e.id != f.t7) return;
	if (l.action == "down") e.dJ(d, this, b, G, V);
	if (l.action == "rdown") e.AJ(d, this, b, G, V);
	if (l.action == "move") e.JP(d, this, b, G, V);
	if (l.action == "up" || l.action == "iup" || l.action == "cancellast") e.Nl(d, this, b, G, V, l.action == "cancellast");
	if (l.action == "rup") e.h_(d, this, b, G, V);
	if (l.action == "iup") {
		G.o6("Space");
		this.Gd(!0)
	}
	if (l.action == "cancellast") {
		if (d && d.history.length != 0 && Date.now() - d.history[d.history.length - 1].aod < 200) {
			var Q = new Action(ActionTypes.E.v);
			Q.G = f.lv;
			Q.data = {
				a: "h_stepbck"
			};
			this.dispatch(Q)
		}
	}
	if (l.action == "down" || l.action == "up") {
		this.Gd()
	}
	if (l.action == "down" || l.action == "up" || l.action == "ctx") {
		d.i_ = !0
	}
	if ((l.action == "up" || l.action == "rup") && this.d.rE) {
		this.d.rE = null;
		I.disable(d, this, b, G)
	}
};

PhotopeaApp.prototype.fA = function(l) {
	var d = this.fk(),
		G = this.YE;
	if (d && this.GK().Q0(G, this.Ib)) {
		var b = d.u,
			V = b.Vm.m,
			Q = b.Vm.n,
			t = 0,
			I = 0,
			y = 16;
		if (G.x < y) t = y - G.x;
		if (G.x > V - y) t = G.x - (V - y);
		if (G.y < y) I = y - G.y;
		if (G.y > Q - y) I = G.y - (Q - y);
		var e = this.Ib.l(KeyboardHandler.Zz) ? 8 : 1;
		if ((t != 0 || I != 0) && (d.m * b.N > V || d.n * b.N > Q)) {
			t = Math.min(5, t * .5) * e;
			I = Math.min(5, I * .5) * e;
			if (G.x > y) t = -t;
			if (G.y > y) I = -I;
			b.R.x += t;
			b.R.y += I;
			this.azg({
				OJ: this.YE,
				action: "move"
			});
			d.bV = !0
		}
	}
	this.update();
};

PhotopeaApp.prototype.update = function(l) {
	var d = this.fk();
	if (d == null) return;
	if (d.i_) {
		var G = this.d.map;
		for (var b in G) {
			if (G[b].G.Ew) G[b].G.Ew(d, this, this.fB, this.Ib)
		}
	}
	if (d.Gg) {
		if (WebGLContext.webglAvailable) {
			WebGLContext.checkMaxTextureSize(Math.max(d.m, d.n));
		}
	}
	if (d.Gg) {
		d.Po()
	}
	var V = d.u,
		Q = this.vE,
		t = this.vE = Date.now();
	if (d.Gg || d.Of || d.uK || d.bV || l || V.ma != V.N || !V.q8.XB(V.R)) {
		var I = V.ma;
		if (V.ma != V.N) {
			var y = f.gU.asX(V.N, V.ma > V.N),
				e = .12;
			if (V.ma < V.N && V.ma < y) V.ma = y;
			if (V.ma > V.N && V.ma > y) V.ma = y;
			var M = Math.abs(V.N - y) * (t - Q) * .001 / e;
			if (V.ma < V.N) V.ma = Math.min(V.N, V.ma + M);
			else V.ma = Math.max(V.N, V.ma - M)
		}
		var R = I == V.N ? 0 : (V.ma - V.N) / (I - V.N);
		V.q8.x = V.R.x + R * (V.q8.x - V.R.x);
		V.q8.y = V.R.y + R * (V.q8.y - V.R.y);
		this.gD.BM(this.fB, null);
		this.gD.Yw(d, this.Mt)
	}
	if ((d.Gg || d.bV || d.i_) && (!this.YE.oW || d.Va)) {
		if (d.i_) d.vo();
		d.DF = !1
	}
	d.Va = !1;
	d.i_ = !1;
	d.Gg = null;
	d.Of = d.uK = d.bV = !1
};

PhotopeaApp.prototype.D3 = function(l) {
	var d = l.target.tagName.toLowerCase(),
		G = l.target.getAttribute("type"),
		b = KeyboardHandler,
		V = b._Q(l.code, b.lm);
	if (!((d == "input" || d == "select" || d == "button") && b._Q(l.code, b.Kn))) {
		if (b.Fl(l) && d != "select") {
			l.preventDefault()
		}
		this.Ib.sm(b.BQ(l));
		this.o9("down")
	}
};

PhotopeaApp.prototype.M1 = function(l) {
	if (l.key == " ") this.Ib._v();
	if (KeyboardHandler._Q(l.code, KeyboardHandler.oL)) this.Ib.reset();
	this.Ib.o6(KeyboardHandler.BQ(l));
	var d = l.target.tagName.toLowerCase();
	if (KeyboardHandler.Fl(l) && d != "select") {
		l.preventDefault()
	}
	this.o9("up")
};

PhotopeaApp.prototype.o9 = function(l) {
	var d = this.Ib,
		G = this.fk(),
		b = G != null && G.g.length != 0;
	if (this.i2.Uf() != null) {
		if (d.l(KeyboardHandler.mp)) {
			this.i2.ac6()
		}
		return
	}

	this.Gd();
	var V = this.zT(KeyboardHandler.wz),
		Q = d.l(KeyboardHandler.Jm),
		t = d.l(KeyboardHandler.Zz);
	if (V && d.l(KeyboardHandler.dr) && l == "down") {
		var I = new Action(ActionTypes.E.v),
			y = new Action(ActionTypes.E.L);
		I.G = f.lv;
		if (t) {
			I.data = {
				a: "h_stepfwd"
			}
		} else {
			I.data = {
				a: "h_stepbck"
			}
		}
		if (this.dx.Uf() != null && this.dx.Uf().in()) {} else this.dispatch(I)
	}
	if (V) {
		var I = new Action(ActionTypes.E.v),
			e = new Action(ActionTypes.E.g5),
			y = new Action(ActionTypes.E.L);
		if (d.l(KeyboardHandler.wo) && d.l(KeyboardHandler.fu)) {
			y.data = {
				a: ActionTypes.$.SN,
				GU: "storwindow"
			};
			this.dispatch(y)
		}
		if (!Q && l == "down")
			for (var M in LayerEffectsHelper.keys) {
				var R = LayerEffectsHelper.keys[M],
					J = !0;
				for (var A = 0; A < R.length; A++)
					if (!d.l(R[A])) J = !1;
				if (J) {
					I.G = f.Qi;
					if (M == "hue2" && t && G.B[G.g[0]].add.SoLd == null) I.data = {
						a: "auto",
						nx: 3
					};
					else I.data = {
						a: "start",
						ce: M
					}
				}
			}
		if (d.l(KeyboardHandler.$)) {
			e.data = f.GS.Cc(!0)
		}
		if (d.l(KeyboardHandler.nA)) {
			if (Q) y.data = {
				a: ActionTypes.$.SN,
				GU: "csize"
			};
			else if (G) y.data = {
				a: ActionTypes.$.n4,
				sW: t
			}
		}
		if (d.l(KeyboardHandler.HM)) {
			e.data = f.GS.Cc()
		}
		if (d.l(KeyboardHandler.E) && l == "down") {
			if (t) e.data = {
				kT: "mergeVisible"
			};
			else e.data = {
				kT: "mergeLayersNew",
				a0: {
					__name: "Merge Layers",
					classID: "Mrg2"
				}
			}
		}
		if (d.l(KeyboardHandler.vW)) {
			if (t && this.fB.QN != f.qK) y.data = {
				a: ActionTypes.$.SN,
				GU: "afw_fade"
			};
			else if (Q) {
				I.G = f.WH;
				I.data = {
					a: "applylast"
				}
			} else y.data = {
				a: ActionTypes.$.V7
			}
		}
		if (d.l(KeyboardHandler.Jv)) {
			if (Q && G && G.Hz(G.g[0])) {
				I.G = f.yS;
				I.data = {
					a: LayerRecord.Gk
				}
			} else {
				I.G = f.yS;
				I.data = {
					a: LayerRecord.mQ,
					VB: t
				}
			}
		}
		if (d.l(KeyboardHandler.Zi)) {
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.Z3
			}
		}
		if (d.l(KeyboardHandler.wo)) {
			if (t) {
				I.data = null;
				if (Q) y.data = {
					a: ActionTypes.$.SN,
					GU: "finfo"
				};
				else e.data = {
					kT: "inverse"
				}
			} else if (Q) y.data = {
				a: ActionTypes.$.SN,
				GU: "isize"
			}
		}
		if (d.l(KeyboardHandler.Ns)) {
			e.data = {
				kT: (t ? "cut" : "copy") + "ToLayer"
			}
		}
		if (d.l(KeyboardHandler.TY)) {
			y.data = {
				a: ActionTypes.$.SN,
				GU: "preferences"
			}
		}
		if (d.l(KeyboardHandler.q5)) {
			if (t) {
				I.G = f.yS;
				I.data = {
					a: LayerRecord.vx
				}
			} else if (l == "down") y.data = {
				a: ActionTypes.$.SN,
				GU: "newproject"
			}
		}
		if (d.l(KeyboardHandler.vc)) {
			if (Q) y.data = {
				a: ActionTypes.$.SN,
				GU: "storwindow",
				fz: 0
			};
			else {
				y.data = {
					a: ActionTypes.$.Um
				};
				d.reset()
			}
		}
		if (d.l(KeyboardHandler.Ho)) {
			y.data = {
				a: ActionTypes.$.ay5
			};
			d.reset()
		}
		if (d.l(KeyboardHandler.xA)) {
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.yv
			}
		}
		if (d.l(KeyboardHandler.kC) && l == "down") {
			if (t) {
				if (Q) y.data = {
					a: ActionTypes.$.SN,
					GU: "saveforweb"
				};
				else y.data = {
					a: ActionTypes.$.a1
				}
			} else y.data = {
				a: ActionTypes.$.WD
			}
		}
		if (d.l(KeyboardHandler.hD)) {
			if (t) {
				I.G = f.qK;
				I.data = {
					a: "again"
				}
			} else y.data = {
				a: ActionTypes.$.yb,
				G: f.qK
			}
		}
		if (d.l(KeyboardHandler.AR)) {
			y.data = {
				a: ActionTypes.$.EZ
			}
		}
		if (d.l(KeyboardHandler.p6)) {
			this.gD.pN()
		}
		if (d.l(KeyboardHandler.QD) && G && G.P9()) {
			y.data = {
				a: ActionTypes.$.Yq
			}
		}
		if (d.l(KeyboardHandler.vz) || d.l(KeyboardHandler.uM)) {
			I.G = f.yS;
			I.data = {
				a: LayerRecord.CU,
				y3: 0
			};
			if (d.l(KeyboardHandler.vz)) I.data.y3 = t ? 3 : 2;
			else I.data.y3 = t ? 0 : 1
		}
		if (d.l(KeyboardHandler.cb) && G) {
			I.G = f.yS;
			I.data = {
				a: LayerRecord.mH
			}
		}
		if (d.l(KeyboardHandler.lm) && G) {
			var n = 0;
			if (t) n++;
			if (Q) n += 2;
			I.G = f.Da;
			I.data = {
				a: "frompath",
				X9: [null, 0, n]
			}
		}
		if (d.l(KeyboardHandler.Vy)) {
			e.data = f.Gt.bh(0)
		}
		if (d.l(KeyboardHandler.Kn)) {
			var r = this.Mt.length,
				T = d.l(KeyboardHandler.Zz) ? -1 : 1;
			if (r > 1) this.gD.AT((this.gD.ZF() + r + T) % r)
		}
		if (d.l(KeyboardHandler._z)) {
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.ef
			}
		}
		if (d.l(KeyboardHandler.kS)) {
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.oV
			}
		}
		f.gU.a8m(d, I);
		if (this.dx.Uf() != null && this.dx.Uf().in()) {} else {
			if (I.data) this.dispatch(I);
			if (e.data) this.dispatch(e);
			if (y.data) this.dispatch(y)
		}
	}
	if (!V && Q) {
		var j;
		if (d.l(KeyboardHandler.vz)) j = "Bckw";
		if (d.l(KeyboardHandler.uM)) j = "Frwr";
		if (d.l(KeyboardHandler.cb)) j = "Back";
		if (d.l(KeyboardHandler.Vy)) j = "Frnt";
		if (j) {
			var e = new Action(ActionTypes.E.g5);
			e.data = {
				kT: "select",
				a0: {
					__name: "Select",
					classID: "slct",
					null: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Lyr",
								typeID: "Ordn",
								enum: j
							}
						}]
					},
					MkVs: {
						t: "bool",
						v: !1
					}
				}
			};
			this.dispatch(e)
		}
	}
	if (G && G.g.length != 0) {
		var g = G.B[G.g[0]],
			Y = g.ht;
		if (Y == 1 || Y == 3 || V) {
			var I = new Action(ActionTypes.E.v),
				k = Y == 3 ? g.vZ(G).z : g.c3();
			if (k) {
				var F = k.jv ? G.u.MX.join("") == "111" ? 1 : 2 : 0;
				I.G = f.t7;
				if (k && d.l(KeyboardHandler.mp) && F != 0) {
					I.data = {
						a: "mskView",
						Z: 0
					}
				}
				if (k && d.l(KeyboardHandler.azB)) {
					I.data = {
						a: "mskView",
						Z: F == 1 ? 0 : 1
					}
				}
				if (k && d.l(KeyboardHandler.aAE)) {
					I.data = {
						a: "mskView",
						Z: F == 2 ? 0 : 2
					}
				}
				if (I.data) this.dispatch(I)
			}
		}
	}
	var D = d.Aq();
	if (G && V && 2 <= D && D <= 5) {
		var q = [1, 1, 1];
		if (D > 2) {
			q = [0, 0, 0];
			q[D - 3] = 1
		}
		var H = new Action(ActionTypes.E.v, !0);
		H.G = f._O;
		H.data = {
			a: "setcls",
			MX: q
		};
		this.dispatch(H)
	}
	if (!d.l(KeyboardHandler.wz) && !Q && l == "down") {
		var I = new Action(ActionTypes.E.v),
			y = new Action(ActionTypes.E.L),
			W = this.d.map[this.fB.QN],
			Z = -1;
		for (var A = 0; A < this.d.keys.length; A++)
			if (this.d.keys[A] && this.zT(this.d.keys[A])) Z = A;
		if (Z != -1) {
			var B = null;
			if (W.vv != Z) B = this.d.L7[Z];
			if (W.vv == Z && t) B = (W.a6C + 1) % this.d.vu[Z].length;
			if (B != null) {
				var a = this.d.vu[Z][B].G.id,
					m = this.fB.df;
				if ((m == null || m.indexOf(parseInt(a)) != -1) && !this.YE.oW) y.data = {
					a: ActionTypes.$.yb,
					G: a
				}
			}
		}
		if (d.l(KeyboardHandler.Zi)) y.data = {
			a: ActionTypes.$.yb,
			G: f._O
		};
		if (d.l(KeyboardHandler.xA)) y.data = {
			a: ActionTypes.$.yb,
			G: f.EW
		};
		if (d.l(KeyboardHandler.QD)) y.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.K5,
			y3: 2
		};
		if (d.l(KeyboardHandler.HM)) y.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.K5,
			y3: 3
		};
		if (y.data) this.dispatch(y);
		if (d.l(KeyboardHandler.a60) && G && G.g.length == 1) {
			var g = G.B[G.g[0]];
			I.G = f.yS;
			var p = g.Ka(0) || g.Ka(1) || g.Ka(2) || g.Ka(31);
			I.data = {
				a: LayerRecord.ss,
				mz: p ? [
					[!1, !1, !1, !1],
					[0, 1, 2, 31]
				] : [
					[!0],
					[31]
				]
			};
			this.dispatch(I)
		}
		var D = d.Aq();
		if (b && D != -1 && this.zT(KeyboardHandler.rc[D])) {
			var c = G.g[0],
				g = G.B[c],
				v = KeyboardHandler.O0(Math.round(100 * g.opacity / 255), D);
			I.G = f.yS;
			I.data = {
				a: LayerRecord.y$,
				mz: Math.round(255 * v / 100)
			};
			this.dispatch(I)
		}
		var i = this.fB.WN;
		if (d.l(KeyboardHandler.Kn)) {
			y.data = {
				a: ActionTypes.$.Mc,
				Z: i == 0 ? 1 : 0
			};
			this.dispatch(y)
		}
		if (d.l(KeyboardHandler.vW) || d.l(KeyboardHandler.mp) && i == 2) {
			var z = document.fullscreenElement != null == (i == 2);
			y.data = {
				a: ActionTypes.$.Mc,
				Z: i == 0 ? 2 : 0,
				Xs: z
			};
			this.dispatch(y)
		}
		if (d.l(KeyboardHandler.og) && !this.YE.oW) {
			I.G = f.Da;
			I.data = {
				a: "qmask"
			};
			this.dispatch(I)
		}
	}
	if (!d.l(KeyboardHandler.wz) && !Q && t) {
		var I = new Action(ActionTypes.E.v),
			y = new Action(ActionTypes.E.L);
		if (d.l(KeyboardHandler.cb)) y.data = {
			a: ActionTypes.$.SN,
			GU: "shortcuts"
		};
		if (d.l(KeyboardHandler.YF)) y.data = {
			a: ActionTypes.$.SN,
			GU: "fill"
		};
		if (d.l(KeyboardHandler.a3s)) y.data = {
			a: ActionTypes.$.SN,
			GU: "sel_feather"
		};
		if (b && (d.l(KeyboardHandler.W$) || d.l(KeyboardHandler.Zw))) {
			var c = G.g[0],
				g = G.B[c],
				P = au.CP,
				C = P.length,
				h = P.indexOf(g.blendModeKey);
			I.G = f.yS;
			I.data = {
				a: LayerRecord.zZ,
				mz: (h + C + (d.l(KeyboardHandler.W$) ? 1 : -1)) % C
			};
			this.dispatch(I)
		}
		if (y.data) this.dispatch(y)
	}
	var I = new Action(ActionTypes.E.v),
		L = l == "down" && (this.zT(KeyboardHandler.HD) || this.zT(KeyboardHandler.kJ));
	if ((V || Q) && L) {
		I = new Action(ActionTypes.E.g5);
		I.data = f.BrushToolBase.ML(V ? "BckC" : "FrgC");
		this.dispatch(I)
	} else if (G && L && !this.YE.oW) {
		if (G.P != null) {
			I = new Action(ActionTypes.E.g5);
			I.data = {
				kT: "delete"
			}
		} else if (G.g.length != 0) {
			var g = G.B[G.g[0]];
			if (g.ht == 1) I.data = {
				a: LayerRecord.uU
			};
			else if (g.ht == 3) I.data = {
				a: LayerRecord.V2
			};
			else I.data = {
				a: LayerRecord.Qe
			};
			I.G = f.yS
		}
		this.dispatch(I)
	}
	if (this.dx.Uf() != null) {
		if (d.l(KeyboardHandler.mp)) {
			this.dx.Uf().a6i()
		} else {
			this.dx.Uf().o9(G, this, this.fB, d)
		}
	}
	if (this.fB.QN == null) return;
	var W = this.GK();
	if (this.dx.Uf() == null || this.d.JB) W.o9(G, this, this.fB, d)
};

PhotopeaApp.prototype.zT = function(l) {
	var d = this.Ib,
		G = this.d.map[this.fB.QN].G,
		top = this.dx.Uf(),
		b = this.fk();
	return d.l(l) && !G.oH(l, b) && (top == null || !top.oH(l, b))
};

PhotopeaApp.prototype.tO = function(l) {
	this.fB.WN = l;
	this.gD.tO(l == 2 ? 1 : 0);
	this.e3()
};

PhotopeaApp.prototype.ayt = function(l) {
	if (this.QG()) return 1;
	if (s.getLicenseLevel() == 0) {
		this.fB = {};
		this.ua = function(d, G) {
			return Math.sqrt(d * G)
		}
	}
	return -1
};

