
var exportHelper = {};

// Offline premium session (no login / no server sync).
// Keeps local settings persistence and treats build as always Premium.
var premiumSession = function() {
	var storageKey = "premium_stateLocal";
	return {
		initSession: function(callback) {
			if (callback) setTimeout(callback, 1)
		},
		// Always premium in this build
		hasActiveEntitlement: function() {
			return !0
		},
		isLoggedIn: function() {
			return !1
		},
		getCurrentUserRecord: function() {
			return null
		},
		getSavedRecord: function() {
			var raw = localStorage[storageKey];
			if (raw == null) return null;
			try {
				return JSON.parse(raw)
			} catch (e) {
				return null
			}
		},
		$O: function() {
			return this.getSavedRecord()
		},
		saveRecordLocally: function(record, callback) {
			localStorage[storageKey] = JSON.stringify(record);
			if (callback) setTimeout(callback, 1)
		},
		// No-op in offline build
		event: function() {},
		sendTemplateRecord: function() {},
		openOrderWindow: function() {},
		openInsertKeyWindow: function() {},
		openLoginPopup: function(cb) {
			if (cb) setTimeout(cb, 1)
		},
		logout: function() {}
	}
	}();

exportHelper.encodeDocumentToFormat = function(l, d, G, b) {
	var V = d.split(":"),
		Q = V[0];
	if (V.length == 2) {
		if (Q == "jpg") b = [Math.round(100 * parseFloat(V[1]))];
		if (Q == "webp") b = [Math.round(100 * parseFloat(V[1])), 100, 0, !1, !1];
		if (Q == "psd") b = [!0, !0, !1, !1, !1];
		if (Q == "svg") b = V[1].split(",").map(function(I) {
			return I == "true"
		})
	}
	var t = FormatHandler.h9(l, Q.toUpperCase(), null, null, b, G);
	return t
};

exportHelper.exportFromOptionsArray = function(l, d, G) {
	var b = l.LT(),
		V = d[0];
	return exportHelper.encodeDocumentToFormat(l, V, G)
};

exportHelper.uploadToServer = function() {
	var l = this.e9,
		d = this.caller,
		G = l.pb.RG,
		b = G.formats,
		V, Q;
	l.LT();
	var t = Date.now();
	if (G.version == 1) {
		var I = [],
			y = 0,
			M = 0;
		for (var A = 0; A < b.length; A++) {
			var e = exportHelper.encodeDocumentToFormat(l, b[A], d.mN);
			I.push(e);
			y += e.byteLength
		}
		V = new Uint8Array(2e3 + y);
		var R = "{ \"source\": " + JSON.stringify(l.$a) + ", \"versions\": [\n";
		for (var A = 0; A < b.length; A++) {
			var J = new Uint8Array(I[A]);
			R += "\t{\"format\": \"" + b[A].split(":")[0] + "\", \"start\": " + M + ", \"size\": " + J.length + " }" + (A + 1 < b.length ? ", " : "") + "\n";
			V.set(J, 2e3 + M);
			M += I[A].byteLength
		}
		R += "] }";
		var n = X.nR(R, V, 0);
		for (var A = n; A < 2e3; A++) V[A] = 32;
		Q = "application/octet-stream"
	} else {
		var r = new GrowableByteBuffer,
			T = 0,
			j = "",
			g = encodeURIComponent;
		j = "p=" + g("{ \"source\": " + JSON.stringify(l.$a) + ", \"versions\": [");
		X.zr(r, T, j);
		T += j.length;
		for (var A = 0; A < b.length; A++) {
			j = g(" {\"format\": \"" + b[A].split(":")[0] + "\", \"data\": \"");
			X.zr(r, T, j);
			T += j.length;
			var e = exportHelper.encodeDocumentToFormat(l, b[A], d.mN),
				Y = ClipboardHandler.a0$(e, e.byteLength),
				n = Y.length;
			r.ensureCapacity(T, n);
			for (var k = 0; k < n; k++) {
				r.ensureCapacity(T, 3);
				var F = Y[k];
				if (F == 43) {
					r.data[T] = 37;
					r.data[T + 1] = 50;
					r.data[T + 2] = 66;
					T += 3
				} else if (F == 47) {
					r.data[T] = 37;
					r.data[T + 1] = 50;
					r.data[T + 2] = 70;
					T += 3
				} else if (F == 61) {
					r.data[T] = 37;
					r.data[T + 1] = 51;
					r.data[T + 2] = 68;
					T += 3
				} else {
					r.data[T] = F;
					T++
				}
			}
			j = g("\" }" + (A + 1 < b.length ? ", " : ""));
			X.zr(r, T, j);
			T += j.length
		}
		j = g("] }");
		X.zr(r, T, j);
		T += j.length;
		V = r.data.slice(0, T);
		Q = "application/x-www-form-urlencoded"
	}
	var D = new XMLHttpRequest;
	D.open("POST", G.url, !0);
	if (Q) D.setRequestHeader("Content-Type", Q);
	D.addEventListener("load", exportHelper.handleUploadResponse.bind(this));
	D.send(new Blob([V.buffer]))
};

exportHelper.handleUploadResponse = function(l) {
	this.caller.V1("Saving ...");
	var d = l.target.response;
	if (d.charAt(0) == "{") {
		d = JSON.parse(d);
		if (d.newSource) this.e9.$a = d.newSource;
		if (d.message) alert(d.message, 2e3);
		if (d.script) {
			var G = new Action(ActionTypes.E.L, !0);
			G.data = {
				a: ActionTypes.$.WM,
				nM: d.script
			};
			this.caller.dispatch(G)
		}
	} else alert("Saved. Response: " + d, 1500)
};

exportHelper.saveToLocalStorage = function(l) {
	var d = l.O2,
		G = d[1].split(".").pop(),
		b = exportHelper.encodeDocumentToFormat(l, G, null, G == "psd" && d[0] == 1 ? [!0, !1, !0, !1] : null);
	console.log(b);
	var V = Storage.WU(d[0]);
	V.akx(d[1], b)
};

exportHelper.saveToGoogleDrive = function(l, d) {
	var G = l.yi.cZ;
	if (d == null) d = exportHelper.encodeDocumentToFormat(l, G);
	d$.b9(function() {
		var b = new XMLHttpRequest,
			V = "https://www.googleapis.com/upload/drive/v3/files/" + l.yi.file.id + "?uploadType=media&" + d$.L1();
		b.open("PATCH", V, !0);
		b.addEventListener("load", function(Q) {
			var t = JSON.parse(Q.target.response);
			alert(t.name + " updated")
		});
		b.send(d);
		alert("Saving \"" + l.yi.file.name + "\" to Google Drive ...")
	})
};

exportHelper.openFile = function(l, d, G, b) {
	// edited by hbi
	// if (window.location.href.indexOf("photopea.com") == -1 || window.top != window.self) exportHelper.handleOpenedFile(l, d, G, b);
	// else {
		try {
			exportHelper.handleOpenedFile(l, d, G, b);
		} catch (dk) {
			console.log(dk); // hbi add
			if (dk == "low_ram") {} else {
				var V = "Error. Please, send your file to support@photopea.com and we will solve it.";
				if (FormatHandler.aJ(d) == "eps") V = "We support only basic EPS files. Convert your file into PDF (with an online converter) and open the PDF in Photopea.";
				// alert(V, 1e4)
			}
		}
	// }
};

exportHelper.handleOpenedFile = function(l, d, G, b) {
	var V;
	if (l.name) {
		var Q = l.name.lastIndexOf(".");
		V = Q == -1 ? l.name : l.name.slice(0, Q)
	} else {
		if (l.url.substring(0, 5) == "data:" || l.url.indexOf("googleapis") != -1) V = "image";
		else V = l.url.substring(l.url.lastIndexOf("/") + 1).split(".")[0];
		V = V.slice(0, 50)
	}
	var t = l.name ? l.name : l.url,
		I = new Uint8Array(d),
		y = FormatHandler.aJ(d),
		e = window.gtag;
	if (Math.random() < .25 && e && y != null && FormatHandler.jA(y)) e("event", y, {
		event_category: "Formats"
	});
	if (y == null) y = X.Ko(I, 0, 4);
	if (t && t.toLowerCase().endsWith(".raw")) {
		var M = new Action(ActionTypes.E.L, !0);
		M.data = {
			a: ActionTypes.$.SN,
			GU: "importraw",
			Ey: d,
			bf: t.split("/").pop()
		};
		G.dispatch(M);
		return
	} else if (y == "json") {
		var R = "";
		for (var A = 0; A < I.length; A++) R += String.fromCharCode(I[A]);
		R = decodeURIComponent(escape(R));
		var J = JSON.parse(R);
		if (J.name && J.url) {
			var M = new Action(ActionTypes.E.L, !0);
			M.data = {
				a: ActionTypes.$.a7q,
				Z: J
			};
			G.dispatch(M)
		} else {
			alert("Unknown JSON file opened. See the content in the console.", 5e3);
			console.log(J)
		}
		return
	}
	if (y == "html") {
		var R = X.Kw(I, 0, I.length),
			n = new DOMParser,
			r = n.parseFromString(R, "text/html"),
			T = r.getElementsByTagName("meta");
		for (var A = 0; A < T.length; A++) {
			var g = T[A],
				Y = g.getAttribute("property"),
				k = g.getAttribute("content"),
				F = null;
			if (Y == "og:image") F = k;
			if (Y == null && k && k.startsWith("0;url=/imgres?")) {
				var D = k.slice(14).split("&");
				for (var q = 0; q < D.length; q++)
					if (D[q].startsWith("imgurl")) F = decodeURIComponent(D[q].slice(7))
			}
			if (F == null) continue;
			var M = new Action(ActionTypes.E.L, !0);
			M.data = {
				a: ActionTypes.$.ub,
				Oo: {
					url: F,
					FZ: !0,
					lh: l.lh
				}
			};
			G.dispatch(M)
		}
		return
	}
	if (FormatHandler.jA(y)) {
		var H, W, Z = FormatHandler.jA(y);
		if (l.lh != null && "jpg png gif pdf svg ai psd".split(" ").indexOf(y) != -1) {
			var M = new Action(ActionTypes.E.L, !0);
			if (0 <= l.lh) M.data = {
				a: ActionTypes.$.gL,
				target: l.lh,
				ca: l.cz,
				Kv: d,
				tZ: V
			};
			else {
				M = new Action(ActionTypes.E.v, !0);
				M.data = {
					a: LayerRecord.vH,
					data: new Uint8Array(d),
					bf: V + "." + y
				};
				M.G = f.yS
			}
			G.dispatch(M);
			return
		}
		var B = [V, Z, y, l, G, b, d];
		if (Z.zm) {
			H = new PsdDocument(V + (y == "psd" ? "" : "-" + y) + ".psd");
			Z.gR(d, H, exportHelper.handleOpenResult, B)
		} else {
			W = Z.gR(d, null, exportHelper.handleOpenResult, B, G)
		}
		if (Z.Lz != !0) exportHelper.handleOpenResult(H, W, B);
		else G.sV();
		return
	}
	var a = new Action(ActionTypes.E.L, !0);
	a.data = {
		a: ActionTypes.$.bs,
		Ey: d,
		MS: l.name
	};
	var m = l instanceof File && l.aky != !0,
		M = new Action(ActionTypes.E.L, !0);
	M.data = {
		a: ActionTypes.$.kI,
		pb: "add",
		Oo: null,
		G2: null,
		a9t: l.aky
	};
	if (y == "zip") {
		var p = Date.now(),
			c = UZIP.parse(d),
			v = "xml rels plist iwa db ds_store txt rtf".split(" ");
		for (var i in c) {
			var z = !1;
			for (var A = 0; A < v.length; A++)
				if (i.toLowerCase().endsWith("." + v[A])) z = !0;
			if (i.startsWith("__MACOSX/") || c[i].length == 0) z = !0;
			if (z) continue;
			var P = i.split("/").pop();
			exportHelper.openFile({
				name: P
			}, c[i].buffer, G, b)
		}
	} else if (y == "jsx" || t && t.toLowerCase().endsWith(".jsx")) {
		var R = X.Kw(new Uint8Array(d));
		M.data = {
			a: ActionTypes.$.WM,
			nM: R
		};
		G.dispatch(M)
	} else if (y == "otf") {
		if (m) G.dispatch(a);
		var C = Typr.parse(d);
		M.data.Oo = PsdResourceTypes.jz;
		for (var A = 0; A < C.length; A++) {
			M.data.G2 = C[A];
			G.dispatch(M)
		}
	} else if (y == "asl") {
		if (m) G.dispatch(a);
		var C = d1.Cd(d);
		M.data.Oo = PsdResourceTypes.lL;
		M.data.G2 = C.rL;
		G.dispatch(M);
		M.data.Oo = PsdResourceTypes.G9;
		M.data.G2 = C.RY;
		G.dispatch(M)
	} else if (y == "tpl") {
		if (m) G.dispatch(a);
		var C = cG.Cd(d);
		M.data.Oo = PsdResourceTypes.CV;
		M.data.G2 = {
			BF: C.BF,
			yO: C.yO,
			list: []
		};
		G.dispatch(M);
		if (C.axe.length != 0) {
			M.data.Oo = PsdResourceTypes.XX;
			M.data.G2 = C.axe;
			G.dispatch(M)
		}
		if (C.RY.length != 0) {
			M.data.Oo = PsdResourceTypes.G9;
			M.data.G2 = C.RY;
			G.dispatch(M)
		}
		M.data.Oo = PsdResourceTypes.qa;
		M.data.G2 = C.list;
		G.dispatch(M)
	} else {
		var h = "";
		for (var L in PsdResourceTypes.Gz)
			if (PsdResourceTypes.Gz[L][0] == y) h = L;
		if (h != "") {
			if (m) G.dispatch(a);
			M.data.G2 = PsdResourceTypes.Gz[h][2].Cd(d, t);
			M.data.Oo = h;
			G.dispatch(M)
		} else if (d.byteLength == 0) alert("Empty file (0 Bytes)");
		else alert("Unknown file format: " + JSON.stringify(y))
	}
};

exportHelper.handleOpenResult = function(l, d, G) {
	var b = G[0],
		V = G[1],
		Q = G[2],
		t = G[3],
		I = G[4],
		y = G[5],
		e = G[6];
	if (V.Lz) I.V1();
	if (!V.zm) {
		if (d.length == 0) return;
		if (d[0].t33421 || d[0].t50706) {
			PixelUtil.raw.normalize(d[0], e);
			console.log(d[0]);
			var M = new Action(ActionTypes.E.L, !0);
			M.data = {
				a: ActionTypes.$.SN,
				GU: "rawpea",
				Wq: d[0]
			};
			I.dispatch(M);
			return
		}
		if (y) {
			y(new Uint8Array(d[0].data), d[0].uA);
			return
		}
		l = FormatHandler.wP(b, d)
	}
	l.vs = t.vs;
	l.o8 = Q;
	l.pb = t.pb;
	l.$a = t.url;
	l.Ta = t.Ta;
	l.yi = t.yi;
	l.vG = t.vG;
	l.O2 = t.O2;
	if (l.yi) l.yi.cZ = Q;
	if (l.B.length != 0) {
		var M = new Action(ActionTypes.E.L, !0);
		M.data = {
			a: t.lh == null ? ActionTypes.$.lr : ActionTypes.$.gL,
			target: t.lh,
			ca: t.cz,
			Kv: l
		};
		I.dispatch(M)
	}
};
