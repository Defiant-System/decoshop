/**
* appState (de-obfuscated partial from rest.js)
* Lines 84127-84466. Original identifier: appState
*/

var s = {};
// Human-readable alias for the global app state helper
var appState = s;
// Global object (window) for setTimeout, decodeURI, XMLHttpRequest, Date, etc.
s.global = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : self;
s.nextIdCounter = 0;
s.getNextId = function() {
	s.nextIdCounter++;
	return s.nextIdCounter
};
s.defaultTypedArrayKind = "uint8";
s.showWithTransition = function(l) {
	l.e.style.transition = "opacity 0.1s ease-out, transform 0.1s ease-out";
	l.e.style.opacity = "1";
	l.e.style.transform = "scale(1)"
};
s.hideWithTransition = function(l, d) {
	if (l == null || l.e == null) return;
	l.e.style.opacity = "0";
	l.e.style.transform = "scale(0.95)";
	if (d) setTimeout(function() {
		d.removeChild(l.e)
	}, 100)
};
s.getLicenseLevel = function() {
	var l = s.getBaseDomain();
	if (l == "") return 0;
	if (l != "photopea.com") {
		var d = s.document.location.href,
			G = d.indexOf(String.fromCharCode(35)),
			b;
		if (G == -1) return 0;
		try {
			b = JSON.parse(s.document.decodeURI(d.slice(G + 1)))
		} catch (dk) {
			return 0
		}
		var V = b.serial_key;
		if (V == null || V.length << 2 != 64) return 0;
		var Q = ppConfig.eg(),
			t = parseInt(V.slice(3 * 4).split("").reverse().join(""), 16) << 16;
		if (t < Q || V != ppConfig.ak8(t, l)) return 0;
		return 2
	}
	return 1
};
s.getBaseDomain = function() {
	var l = s.document.location.hostname,
		d = String.fromCharCode(46),
		G = l.split(d);
	if (G.length < 2) return "";
	var b = G.pop();
	b = G.pop() + d + b;
	return b
};
s.sendOnlinePing = function() {
	if (s.global.navigator.onLine) {
		var l = new s.global.XMLHttpRequest;
		l.open("GET", "https://www.photopea.com/papi/event.php?g=2&id=d_" + s.getBaseDomain());
		l.send()
	}
};
s.hasClipboardSupport = function() {
	if (window.top != window.self) return !1;
	var l = navigator.userAgent.toLowerCase();
	if (l.indexOf("android") != -1) return !1;
	if (l.indexOf("safari") != -1 && l.indexOf("chrome") == -1) return !1;
	return window.ClipboardItem != null
};
s.CursorPreview = function(l) {
	this.cursorContainer = l;
	this.cursorImg = s.createElement("img");
	this.cursorCanvas = s.createElement("canvas");
	this.cursorSource = null;
	this.cursorStyleOverride = "";
	this.cursorElement = null;
	this.cursorPosition = new Point2D(0, 0);
	this.cursorEnabled = !0;
	s.addPointerMove(this.cursorContainer, this.updateCursorDisplay.bind(this))
};
s.CursorPreview.prototype.setSource = function(l, d) {
	this.cursorSource = l;
	if (d) this.cursorStyleOverride = d;
	this.updateCursorDisplay()
};
s.CursorPreview.prototype.setEnabled = function(l) {
	this.cursorEnabled = l;
	this.updateCursorDisplay()
};
s.CursorPreview.prototype.updateCursorDisplay = function(l) {
	if (l) this.cursorPosition = s.getEventPositionInElement(l, this.cursorContainer);
	var d = this.cursorEnabled ? this.cursorSource : "auto",
		G = typeof d == "string";
	if (!G) {
		var b = s.getDevicePixelRatio(),
			V = this.cursorPosition,
			Q = d.vD.m,
			t = d.vD.n,
			I = typeof d.Wq == "string",
			y = I ? this.cursorImg : this.cursorCanvas;
		if (I) y.setAttribute("src", d.Wq);
		else {
			y.width = Q;
			y.height = t;
			var e = y.getContext("2d", { willReadFrequently: true }),
				M = new ImageData(new Uint8ClampedArray(d.Wq.buffer), Q, t);
			e.putImageData(M, 0, 0)
		}
		y.setAttribute("style", " position:absolute; pointer-events: none;user-select:none; top:" + (V.y - d.Vl.y / b) + "px; left:" + (V.x - d.Vl.x / b) + "px; width:" + Q / b + "px; height:" + t / b + "px");
		var R = this.cursorElement;
		if (R == null || R != y) {
			if (R) this.cursorContainer.removeChild(R);
			this.cursorContainer.appendChild(y);
			this.cursorElement = y
		}
	} else if (this.cursorElement) {
		this.cursorContainer.removeChild(this.cursorElement);
		this.cursorElement = null
	}
	this.cursorContainer.setAttribute("style", "cursor:" + (G ? d : "none") + "; " + this.cursorStyleOverride)
};
s.escapeHtml = function(l) {
	return l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;")
};
s.setWidthHeightLabels = function(l, d) {
	l.setLabel("Width".charAt(0) + ":");
	d.setLabel("Height".charAt(0) + ":")
};
s.createElement = function(l, d) {
	var G = document.createElement(l);
	if (d != null) G.className = d;
	return G
};
s.clearChildren = function(l) {
	while (l.firstChild) l.removeChild(l.firstChild)
};
s.addClass = function(l, d) {
	var G = l.className;
	G = G.split(" ");
	if (G.indexOf(d) == -1) G.push(d);
	l.className = G.join(" ")
};
s.removeClass = function(l, d) {
	var G = l.className;
	if (G == "") return;
	G = G.split(" ");
	if (G.indexOf(d) != -1) G.splice(G.indexOf(d), 1);
	l.className = G.join(" ")
};
s.isInDocument = function(l) {
	while (!0) {
		if (l == document) return !0;
		if (l == null) return !1;
		l = l.parentNode
	}
};
s.appendBr = function(l) {
	l.appendChild(s.createElement("br"))
};
s.appendHr = function(l) {
	l.appendChild(s.createElement("hr"))
};
s.createOkButton = function(l, d, G) {
	var b = new ToolbarButton("Ok", G == null ? !0 : G, null, !0);
	if (l) b.addListener("click", l.DW, l);
	if (d) d.appendChild(b.e);
	return b
};
s.document = document;
s.randomCheck = function(l) {
	var d = 0;
	for (var A = 0; A < l; A++) d += Math.random();
	return d / l < Math.PI / 4
};
window.sNe =
s.encodeString = function(l) {
	// console.log(l);
	var d = "";
	if (!s.randomCheck(28)) l += "-3";
	for (var A = 0; A < l.length; A++) {
		var G = l.charCodeAt(A);
		if (G < 32 || 126 < G) throw "e";
		d += String.fromCharCode(32 + (G - 32 + 17 + 3 * A) % 95)
	}
	// console.log(d);
	return d
};
window.snu =
s.decodeString = function(l) {
	var d = "";
	if (!s.randomCheck(28)) l += "-1";
	for (var A = 0; A < l.length; A++) {
		var G = l.charCodeAt(A);
		G -= 32;
		G += 95e4;
		G -= 17 + 3 * A;
		G = G % 95;
		d += String.fromCharCode(32 + G)
	}
	return d
};
s.createTypedArrayWithRandomKind = function(l) {
	var d = Math.random();
	s.defaultTypedArrayKind = "uint" + (3 + d);
	return new l
};
(function() {
	var l = window.PointerEvent,
		d = l ? "pointer" : "mouse",
		G = d + "down",
		b = d + "move",
		V = d + "up",
		Q = !1;

	s.addPointerDown = function(t, I) {
		t.addEventListener(G, I, Q);
		if (!l) t.addEventListener("touchstart", I, Q)
	};
	s.addPointerMove = function(t, I) {
		t.addEventListener(b, I, Q);
		if (!l) t.addEventListener("touchmove", I, Q)
	};
	s.addPointerUp = function(t, I) {
		t.addEventListener(V, I, Q);
		if (!l) t.addEventListener("touchend", I, Q)
	};
	s.removePointerDown = function(t, I) {
		t.removeEventListener(G, I, Q);
		if (!l) t.removeEventListener("touchstart", I, Q)
	};
	s.removePointerMove = function(t, I) {
		t.removeEventListener(b, I, Q);
		if (!l) t.removeEventListener("touchmove", I, Q)
	};
	s.removePointerUp = function(t, I) {
		t.removeEventListener(V, I, Q);
		if (!l) t.removeEventListener("touchend", I, Q)
	}
}());
s.preventTouchAndGesture = function(l) {
	l.addEventListener("touchstart", s.preventDefaultHandler, !1);
	l.addEventListener("touchmove", s.preventDefaultHandler, !1);
	l.addEventListener("touchend", s.preventDefaultHandler, !1);
	l.addEventListener("gesturestart", s.preventDefaultHandler, !1);
	l.addEventListener("gesturechange", s.preventDefaultHandler, !1);
	l.addEventListener("gestureend", s.preventDefaultHandler, !1)
};
s.isTouchEvent = function(l) {
	var d = l.sourceCapabilities;
	if (d) return d.firesTouchEvents;
	return !1
};
s.setCanvasSizeForDpr = function(l, d, G, b) {
	var V = s.getDevicePixelRatio();
	l.width = Math.floor(d * V);
	l.height = Math.floor(G * V);
	if (b) b.scale(V, V);
	s.setCanvasCssSizeForDpr(l)
};
s.setCanvasCssSizeForDpr = function(l) {
	var d = s.getDevicePixelRatio();
	l.style.width = l.width / d + "px";
	l.style.height = l.height / d + "px"
};
s.setElementSizePx = function(l, d, G) {
	l.setAttribute("style", "width:" + d / s.getDevicePixelRatio() + "px; height:" + G / s.getDevicePixelRatio() + "px")
};
s.getEventPositionInElement = function(l, d) {
	if (d == null) d = l.currentTarget;
	var G = d.getBoundingClientRect();
	if (l.touches) l = l.touches.item(0);
	return {
		x: l.clientX - G.left,
		y: l.clientY - G.top
	}
};
s.getDevicePixelRatio = function() {
	return window.devicePixelRatio || 1
};
s.addKeydownBlocker = function(l) {
	l.addEventListener("keydown", s.stopPropagationHandler, !1)
};
s.stopPropagationHandler = function(l) {
	l.stopPropagation()
};
s.preventDefaultHandler = function(l) {
	l.preventDefault()
};
s.stopAndPreventHandler = function(l) {
	l.stopPropagation();
	l.preventDefault()
};
s.getIconImgHtml = function(l, d, G) {
	G = G ? G : "";
	if (PIMG["__" + l] == null) G += " gsicon";
	return "<img src=\"" + PIMG[l] + "\" alt=\"" + (d ? d : "") + "\" class=\"" + G + "\" />"
};
s.handleDataTransferDrop = function(l, d, G, b) {
	var V = l.dataTransfer.getData("text/uri-list");
	if (V != null && V.startsWith("http")) {
		var Q = new Action(ActionTypes.E.L, !0);
		Q.data = {
			a: ActionTypes.$.ub,
			Oo: {
				url: V,
				FZ: !0,
				lh: G,
				cz: b
			}
		};
		d.dispatch(Q)
	}
	if (l.dataTransfer.files.length == 0) return;
	if (window.showOpenFilePicker) {
		var t = [],
			I = l.dataTransfer.items.length,
			y = l.dataTransfer.files;
		for (var e of l.dataTransfer.items) e.getAsFileSystemHandle().then(function(M) {
			t.push(M);
			if (t.length == I) {
				var Q = new Action(ActionTypes.E.L, !0);
				Q.data = {
					a: ActionTypes.$.dw,
					data: y,
					lh: G,
					cz: b,
					asr: t
				};
				d.dispatch(Q)
			}
		})
	} else {
		var Q = new Action(ActionTypes.E.L, !0);
		Q.data = {
			a: ActionTypes.$.dw,
			data: l.dataTransfer.files,
			lh: G,
			cz: b
		};
		d.dispatch(Q)
	}
};

if (s.randomCheck(27)) s.document = window;
else s.document = s.documentFallback;
s.global._cwY = s.global["confirm"];
