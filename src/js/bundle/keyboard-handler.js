
function KeyboardHandler(l) {
	this.Lq = {};
	this.dX = 0;
	this._v();
	if (l != !0) window.__kb = this
}

KeyboardHandler.c9 = null;
KeyboardHandler.prototype._v = function() {
	var l = navigator.keyboard;
	if (l && window.top == window.self) l.getLayoutMap().then(function(d) {
		KeyboardHandler.c9 = d
	})
};

KeyboardHandler.prototype.atc = function(l) {
	var d = {
		shiftKey: KeyboardHandler.Zz,
		altKey: KeyboardHandler.Jm,
		ctrlKey: KeyboardHandler.wz
	};
	for (var G in d) {
		var b = l[G],
			V = d[G],
			Q = this.l(V);
		if (!b && Q) {
			for (var A = 0; A < V.zt.length; A++) this.o6(V.zt[A])
		}
	}
};

KeyboardHandler.prototype.sm = function(l) {
	this.dX++;
	this.Lq[l] = !0
};

KeyboardHandler.prototype.o6 = function(l) {
	this.dX--;
	delete this.Lq[l];
	if (this.dX <= 0 || KeyboardHandler._Q(l, KeyboardHandler.oL)) this.reset()
};

KeyboardHandler.prototype.l = function(l) {
	for (var A = 0; A < l.zt.length; A++)
		if (this.Lq[l.zt[A]]) return !0;
	return !1
};

KeyboardHandler.prototype.reset = function() {
	this.Lq = {};
	this.dX = 0
};

KeyboardHandler.prototype._9 = function(l) {
	var d = this,
		G = d.l(KeyboardHandler.Zz) ? 10 : 1,
		b = 0,
		V = 0;
	if (d.l(KeyboardHandler.ld)) b = -G;
	else if (d.l(KeyboardHandler.T7)) b = G;
	else if (d.l(KeyboardHandler.ZZ)) V = -G;
	else if (d.l(KeyboardHandler.Wz)) V = G;
	var Q = new Point2D(b, V);
	if (l != null) {
		var t = new Matrix2D;
		t.rotate(l);
		Q = t.kD(Q);
		if (Math.abs(Q.x) < Math.abs(Q.y)) Q.x = 0;
		else Q.y = 0;
		Q.x = Math.round(Q.x);
		Q.y = Math.round(Q.y)
	}
	return Q
};

KeyboardHandler.prototype.Aq = function() {
	var l = this,
		d = KeyboardHandler.rc;
	for (var A = 0; A < 10; A++)
		if (l.l(d[A])) return A;
	return -1
};

KeyboardHandler._Q = function(l, d) {
	return d.zt.indexOf(l) != -1
};
// hbi: added "KeyR"
KeyboardHandler.a4g = "ZoomToggle BrightnessDown BrightnessUp AudioVolumeMute AudioVolumeDown AudioVolumeUp LaunchApplication1 F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Enter Shift Escape KeyV".split(" ");
KeyboardHandler.Fl = function(l) {
	var d = l.code;
	if (d == "") return !1;
	var G = KeyboardHandler._Q;
	if (l.altKey && !l.shiftKey && !l.ctrlKey) {
		var b = KeyboardHandler.rc.concat([KeyboardHandler.W$, KeyboardHandler.Zw, KeyboardHandler.vz, KeyboardHandler.uM]),
			V = !1;
		for (var A = 0; A < b.length; A++)
			if (G(d, b[A])) return !1
	}
	return KeyboardHandler.a4g.indexOf(d) == -1 || l.shiftKey && (d == "F5" || d == "F6")
};

KeyboardHandler.nc = function(l) {
	if (typeof l == "string") return l;
	var d = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
	if (l == null) return "";
	var G = [];
	for (var A = 0; A < l.length; A++) {
		var b = l[A].hy ? l[A].hy : l[A];
		if (d && l[A].VU) b = l[A].VU;
		G.push(b)
	}
	if (d || G.length == 1) return G.join(" + ");
	else {
		var V = G.pop();
		return G.join("+") + " + " + V
	}
};

KeyboardHandler.BQ = function(l) {
	window.__kb._v();
	var d = l.code,
		G = KeyboardHandler.c9;
	if (G && G.get(d)) {
		var b = {
				"+": "NumpadAdd",
				"-": "NumpadSubtract",
				".": "Period"
			},
			V = G.get(d).toLowerCase(),
			Q = V.charCodeAt(0);
		if (97 <= Q && Q <= 122) {
			var t = "Key" + V.toUpperCase();
			d = t
		} else if (b[V]) d = b[V];
		return d
	}
	var b = {
			"+": "NumpadAdd",
			"-": "NumpadSubtract",
			".": "Period"
		},
		V = l.key.toLowerCase(),
		Q = V.charCodeAt(0);
	if (V.length == 1) {
		if (97 <= Q && Q <= 122) {
			var t = "Key" + V.toUpperCase();
			d = t
		} else if (b[V]) d = b[V]
	}
	if (V == "control" && d != "") d = "ControlLeft";
	return d
};

KeyboardHandler._n = 0;
KeyboardHandler.O0 = function(l, d) {
	var G = 0;
	if (Date.now() - KeyboardHandler._n > 1e3) {
		G = d == 0 ? 100 : d * 10
	} else {
		if (l % 10 != 0) l *= 10;
		G = (l + d) % 100
	}
	KeyboardHandler._n = Date.now();
	return G
};

KeyboardHandler.a3K = {
	nm: "No Touch",
	zt: ["NoTouch"]
};

KeyboardHandler.lm = {
	hy: "Enter",
	zt: ["Enter", "NumpadEnter"]
};

KeyboardHandler.Zz = {
	hy: "Shift",
	VU: "\u21E7",
	zt: ["ShiftLeft", "ShiftRight"]
};

KeyboardHandler.oL = {
	hy: "Meta",
	zt: ["MetaLeft", "MetaRight", "OSLeft", "OSRight"]
};

KeyboardHandler.wz = {
	hy: "Ctrl",
	VU: "\u2318",
	zt: "ControlLeft ControlRight MetaLeft MetaRight OSLeft OSRight".split(" ")
};

KeyboardHandler.Jm = {
	hy: "Alt",
	VU: "\u2325",
	zt: ["AltLeft", "AltRight"]
};

KeyboardHandler.a2Q = {
	hy: "CtrlOrAlt",
	zt: KeyboardHandler.wz.zt.concat(KeyboardHandler.Jm.zt)
};

KeyboardHandler.mp = {
	hy: "Escape",
	zt: ["Escape"]
};

KeyboardHandler.Mm = {
	hy: "Space",
	zt: ["Space"]
};

KeyboardHandler.Kn = {
	hy: "Tab",
	zt: ["Tab"]
};

KeyboardHandler.IU = {
	hy: "Home",
	zt: ["Home"]
};

KeyboardHandler.aiD = {
	hy: "End",
	zt: ["End"]
};

KeyboardHandler.ld = {
	hy: "Left",
	zt: ["ArrowLeft"]
};

KeyboardHandler.ZZ = {
	hy: "Up",
	zt: ["ArrowUp"]
};

KeyboardHandler.T7 = {
	hy: "Right",
	zt: ["ArrowRight"]
};

KeyboardHandler.Wz = {
	hy: "Down",
	zt: ["ArrowDown"]
};

KeyboardHandler.W$ = {
	hy: "+",
	zt: ["NumpadAdd", "Equal"]
};

KeyboardHandler.Zw = {
	hy: "-",
	zt: ["NumpadSubtract", "Minus"]
};

KeyboardHandler._z = {
	hy: ";",
	zt: ["Semicolon"]
};

KeyboardHandler.a69 = {
	hy: "Dead",
	zt: ["Dead"]
};

KeyboardHandler.a8d = {
	hy: "=",
	zt: ["Equal"]
};

KeyboardHandler.kJ = {
	hy: "Backspace",
	zt: ["Backspace"]
};

KeyboardHandler.HD = {
	hy: "Delete",
	zt: ["Delete"]
};

KeyboardHandler.azB = {
	hy: "Backslash",
	zt: ["Backslash", "IntlBackslash"]
};

KeyboardHandler.a60 = {
	hy: "Slash",
	zt: ["NumpadDivide", "Slash"]
};

KeyboardHandler.aAE = {
	hy: "Backquote",
	zt: ["Backquote"]
};

KeyboardHandler.vz = {
	hy: "[",
	zt: ["BracketLeft"]
};

KeyboardHandler.uM = {
	hy: "]",
	zt: ["BracketRight"]
};

KeyboardHandler.Vy = {
	hy: ".",
	zt: ["Period"]
};

KeyboardHandler.cb = {
	hy: ",",
	zt: ["Comma"]
};

KeyboardHandler.kS = {
	hy: "'",
	zt: ["Quote"]
};

KeyboardHandler.$ = {
	hy: "A",
	zt: ["KeyA"]
};

KeyboardHandler.Zt = {
	hy: "B",
	zt: ["KeyB"]
};

KeyboardHandler.nA = {
	hy: "C",
	zt: ["KeyC"]
};

KeyboardHandler.HM = {
	hy: "D",
	zt: ["KeyD"]
};

KeyboardHandler.E = {
	hy: "E",
	zt: ["KeyE"]
};

KeyboardHandler.vW = {
	hy: "F",
	zt: ["KeyF"]
};

KeyboardHandler.Jv = {
	hy: "G",
	zt: ["KeyG"]
};

KeyboardHandler.Zi = {
	hy: "H",
	zt: ["KeyH"]
};

KeyboardHandler.wo = {
	hy: "I",
	zt: ["KeyI"]
};

KeyboardHandler.Ns = {
	hy: "J",
	zt: ["KeyJ"]
};

KeyboardHandler.TY = {
	hy: "K",
	zt: ["KeyK"]
};

KeyboardHandler.Hm = {
	hy: "L",
	zt: ["KeyL"]
};

KeyboardHandler.dQ = {
	hy: "M",
	zt: ["KeyM"]
};

KeyboardHandler.q5 = {
	hy: "ActionTypes",
	zt: ["KeyN"]
};

KeyboardHandler.vc = {
	hy: "O",
	zt: ["KeyO"]
};

KeyboardHandler.Ho = {
	hy: "P",
	zt: ["KeyP"]
};

KeyboardHandler.og = {
	hy: "Q",
	zt: ["KeyQ"]
};

KeyboardHandler.xA = {
	hy: "R",
	zt: ["KeyR"]
};

KeyboardHandler.kC = {
	hy: "S",
	zt: ["KeyS"]
};

KeyboardHandler.hD = {
	hy: "T",
	zt: ["KeyT"]
};

KeyboardHandler.fu = {
	hy: "U",
	zt: ["KeyU"]
};

KeyboardHandler.AR = {
	hy: "V",
	zt: ["KeyV"]
};

KeyboardHandler.p6 = {
	hy: "W",
	zt: ["KeyW"]
};

KeyboardHandler.QD = {
	hy: "X",
	zt: ["KeyX"]
};

KeyboardHandler.ac2 = {
	hy: "Y",
	zt: ["KeyY"]
};

KeyboardHandler.dr = {
	hy: "Z",
	zt: ["KeyZ"]
};

KeyboardHandler.ZD = {
	hy: "0",
	zt: ["Numpad0", "Digit0"]
};

KeyboardHandler.wY = {
	hy: "1",
	zt: ["Numpad1", "Digit1"]
};

KeyboardHandler.ax7 = {
	hy: "2",
	zt: ["Numpad2", "Digit2"]
};

KeyboardHandler.aev = {
	hy: "3",
	zt: ["Numpad3", "Digit3"]
};

KeyboardHandler.azJ = {
	hy: "4",
	zt: ["Numpad4", "Digit4"]
};

KeyboardHandler.asC = {
	hy: "5",
	zt: ["Numpad5", "Digit5"]
};

KeyboardHandler.aso = {
	hy: "6",
	zt: ["Numpad6", "Digit6"]
};

KeyboardHandler.ao9 = {
	hy: "7",
	zt: ["Numpad7", "Digit7"]
};

KeyboardHandler.aqS = {
	hy: "8",
	zt: ["Numpad8", "Digit8"]
};

KeyboardHandler.a4d = {
	hy: "9",
	zt: ["Numpad9", "Digit9"]
};

KeyboardHandler.rc = [KeyboardHandler.ZD, KeyboardHandler.wY, KeyboardHandler.ax7, KeyboardHandler.aev, KeyboardHandler.azJ, KeyboardHandler.asC, KeyboardHandler.aso, KeyboardHandler.ao9, KeyboardHandler.aqS, KeyboardHandler.a4d];
KeyboardHandler.an4 = {
	hy: "F1",
	zt: ["F1"]
};

KeyboardHandler.a9g = {
	hy: "F2",
	zt: ["F2"]
};

KeyboardHandler.a15 = {
	hy: "F3",
	zt: ["F3"]
};

KeyboardHandler.ale = {
	hy: "FF",
	zt: ["F4"]
};

KeyboardHandler.YF = {
	hy: "F5",
	zt: ["F5"]
};

KeyboardHandler.a3s = {
	hy: "F6",
	zt: ["F6"]
};

KeyboardHandler.am9 = {
	hy: "F7",
	zt: ["F7"]
};

KeyboardHandler.asT = {
	hy: "F8",
	zt: ["F8"]
};

KeyboardHandler.aej = {
	hy: "F9",
	zt: ["F9"]
};

KeyboardHandler.azb = {
	hy: "F10",
	zt: ["F10"]
};

KeyboardHandler.a5A = {
	hy: "F11",
	zt: ["F11"]
};

KeyboardHandler.akq = {
	hy: "F12",
	zt: ["F12"]
};
