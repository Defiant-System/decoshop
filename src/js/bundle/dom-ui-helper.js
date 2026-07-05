

function PointerInputHandler(l) {
	UIComponent.call(this);
	this.s$ = [];
	this.MI = !1;
	this.agQ = 0;
	this.YE = {
		x: 0,
		y: 0,
		oW: !1
	};
	this.Qj = l;
	this.aw_ = this.JO.bind(this);
	this.Vz = this.D2.bind(this);
	this.a5i = this.qd.bind(this);
	s.addPointerDown(l, this.aw_);
	s.addPointerMove(l, this.Vz);
	l.addEventListener("wheel", this.Uh.bind(this), !1);
	l.addEventListener("contextmenu", this.ap5.bind(this), !1);
	var _local0 = this.agd.bind(this);
	l.addEventListener("gesturestart", _local0, !1);
	l.addEventListener("gesturechange", _local0, !1);
	l.addEventListener("gestureend", _local0, !1);
	s.preventTouchAndGesture(l);
}
PointerInputHandler.prototype = new UIComponent();
PointerInputHandler.prototype.agd = function (l) {
	if (l.type == "gesturestart") this.l9 = l.scale;
	if (l.type == "gesturechange") {
		var _local10 = new Action("mouse", !0);
		_local10.action = "scroll";
		_local10.Bd = !0;
		this.aO(l, _local10);
		var _local1 = (this.l9 - l.scale) / this.l9;
		_local10.tc = new Point2D(0, 100 * _local1);
		this.l9 = l.scale;
		this.dispatch(_local10);
	}
};
PointerInputHandler.prototype.TE = function (l) {
	var _local13 = -1,
		_local12 = this.s$;
	for (var _local11 = 0; _local11 < _local12.length; _local11++)
	if (_local12[_local11].pointerId == l.pointerId) _local13 = _local11;
	return _local13;
};
PointerInputHandler.k$ = function (l) {
	var _local15 = l.pointerType,
		_local14 = window.__kb;
	return _local15 == "touch" && _local14.l(KeyboardHandler.a3K);
};
PointerInputHandler.prototype.JO = function (l) {
	if (PointerInputHandler.k$(l)) return;
	var _local18 = this.TE(l);
	if (_local18 != -1) this.s$[_local18] = l;else
	this.s$.push(l);
	if (this.s$.length == 1) {
		this.agQ = Date.now();
		var _local16 = l.button != null && l.button != 0 ? l.which == 2 ? "idown" : "rdown" : "down",
			_local17 = new Action("mouse", !0);
		_local17.action = _local16;
		this.aO(l, _local17);
		this.dispatch(_local17);
		s.removePointerMove(this.Qj, this.Vz);
		s.addPointerMove(window, this.Vz);
		s.addPointerUp(window, this.a5i);
	}
	if (this.s$.length == 2) {
		if (Date.now() - this.agQ < 100) {
			var _local17 = new Action("mouse", !0);
			_local17.action = "cancellast";
			this.aO(l, _local17);
			this.dispatch(_local17);
		}
		this.MI = !0;
	}
	if (this.s$.length == 2) this.au7("multidown");
};
PointerInputHandler.prototype.D2 = function (l) {
	if (PointerInputHandler.k$(l)) return;
	var _local20 = this.TE(l);
	if (_local20 != -1) this.s$[_local20] = l;
	if (this.s$.length > 1) {
		this.au7("multimove");
	}
	if (this.MI) return;
	if (this.s$.length == 1 && _local20 == -1) return;
	var _local19 = new Action("mouse", !0);
	_local19.action = "move";
	this.aO(l, _local19);
	this.dispatch(_local19);
};
PointerInputHandler.prototype.qd = function (l) {
	if (PointerInputHandler.k$(l)) return;
	var _local23 = this.s$;
	_local23 = this.s$ = [];
	if (_local23.length == 0) {
		var _local21 = l.button != null && l.button > 0 ? l.which == 2 ? "iup" : "rup" : "up",
			_local22 = new Action("mouse", !0);
		_local22.action = _local21;
		this.aO(l, _local22);
		this.dispatch(_local22);
		s.removePointerMove(window, this.Vz);
		s.removePointerUp(window, this.a5i);
		s.addPointerMove(this.Qj, this.Vz);
		this.MI = !1;
	}
};
PointerInputHandler.prototype.Uh = function (l) {
	l.preventDefault();
	if (l.deltaX == 0 && l.deltaY == 0) return;
	var _local24 = new Action("mouse", !0);
	_local24.action = "scroll";
	_local24.Bd = l.ctrlKey;
	this.aO(l, _local24);
	this.dispatch(_local24);
};
PointerInputHandler.prototype.ap5 = function (l) {
	s.stopAndPreventHandler(l);
	if (s.isTouchEvent(l)) {
		var _local25 = new Action("mouse", !0);
		this.aO(l, _local25);
		_local25.action = "rdown";
		this.dispatch(_local25);
		_local25.action = "rup";
		this.dispatch(_local25);
	}
};
PointerInputHandler.prototype.au7 = function (l) {
	var _local31 = this.s$,
		_local27 = s.getDevicePixelRatio(),
		_local30 = [];
	for (var _local26 = 0; _local26 < _local31.length; _local26++) {
		var _local29 = _local30[_local26] = s.getEventPositionInElement(_local31[_local26], this.Qj);
		_local29.x *= _local27;
		_local29.y *= _local27;
	}
	var _local28 = new Action("mouse", !0);
	_local28.action = l;
	_local28.Cs = _local30;
	if (_local31.length == 2) this.dispatch(_local28);
};
PointerInputHandler.prototype.aO = function (l, d, G) {
	var _local34 = this.s$.length != 0;
	if (d.action != "up") {
		var _local33 = s.getDevicePixelRatio();
		if (G == null) G = s.getEventPositionInElement(l, this.Qj);
		this.YE = d.OJ = {
			x: _local33 * G.x,
			y: _local33 * G.y,
			oW: _local34
		};
		var _local32 = s.getEventPositionInElement(l, document.body);
		d.OJ.pf = _local32.x;
		d.OJ.pi = _local32.y;
	} else this.YE = d.OJ = {
		x: this.YE.x,
		y: this.YE.y,
		oW: _local34
	};
	d.OJ.uT = .5;
	if (l.pressure != null && l.pressure != 0) d.OJ.uT = l.pressure;
	if (l.pointerType == "mouse") d.OJ.uT *= 2;
	d.OJ.a71 = l.pointerType;
	if (l.deltaX != null) {
		var _local35 = l.deltaMode == 0 ? 1 : 40;
		d.tc = new Point2D(l.deltaX * _local35, l.deltaY * _local35);
	}
};




function CheckboxControl(l, d, G) {
	UIComponent.call(this);
	this.e = s.createElement("span", "fitem cbox");
	if (d == null) d = !0;
	if (G == null) G = "flabel";
	var _local62 = "cb" + s.getNextId();
	this.I6 = s.createElement("input", "");
	this.I6.setAttribute("type", "checkbox");
	this.I6.setAttribute("id", _local62);
	this.e.appendChild(this.I6);
	this.$w = l;
	this.oG = s.createElement("label", G);
	if (d) this.oG.setAttribute("for", _local62);
	this.e.appendChild(this.oG);
	this.refresh();
	this.I6.addEventListener("change", this.oi.bind(this), !1);
}
CheckboxControl.prototype = new UIComponent();
CheckboxControl.prototype.ap2 = function () {
	return this.$w;
};
CheckboxControl.prototype.setLabel = function (l) {
	this.oG.textContent = l;
};
CheckboxControl.prototype.refresh = function () {
	var _local63 = this.$w;
	if (typeof _local63 == "string" && _local63.startsWith("<")) this.oG.innerHTML = _local63;else
	this.oG.textContent = languageManager.get(_local63);
};
CheckboxControl.prototype.Nu = function () {
	this.I6.checked = !0;
};
CheckboxControl.prototype.kL = function () {
	this.I6.checked = !1;
};
CheckboxControl.prototype.dB = function () {
	return this.I6.checked;
};
CheckboxControl.prototype.c = function (l) {
	this.I6.checked = l;
};
CheckboxControl.prototype.b = CheckboxControl.prototype.dB;
CheckboxControl.prototype.oi = function (l) {
	this.dispatch(new Action(ActionTypes.E.A, !1));
};


function TextInput(l, d, G, b, V) {
	UIComponent.call(this);
	var _local68 = s.getNextId();
	this.e = s.createElement("span", "fitem tinput");
	if (l) {
		this.$w = l;
		this.IL = s.createElement("label", "flabel");
		this.e.appendChild(this.IL);
		this.IL.setAttribute("for", _local68);
		this.refresh();
	}
	if (V) {
		this.I6 = s.createElement("span");
	} else if (b == null) {
		this.I6 = s.createElement("input");
		this.I6.setAttribute("type", "text");
	} else this.I6 = s.createElement("textarea", "scrollable");
	this.I6.setAttribute("id", _local68);
	if (G) this.I6.setAttribute("style", "width:" + G + "em;" + (V ? " display:inline-block; margin-left:6px;" : ""));
	if (b) this.I6.setAttribute("rows", b);
	this.e.appendChild(this.I6);
	if (d) {
		this.GZ = s.createElement("span");
		this.GZ.textContent = d;
		this.GZ.style.marginLeft = "2px";
		this.e.appendChild(this.GZ);
	}
	s.addKeydownBlocker(this.I6);
	this.I6.addEventListener("change", this.oi.bind(this), !1);
	this.I6.addEventListener("input", this.aeL.bind(this), !1);
	if (b == null) this.I6.addEventListener("keyup", this.M1.bind(this), !1);
}
TextInput.prototype = new UIComponent();
TextInput.prototype.refresh = function () {
	this.updateLabel();
};
TextInput.prototype.M1 = function (l) {
	var _local70 = KeyboardHandler._Q(l.code, KeyboardHandler.mp),
		_local69 = KeyboardHandler._Q(l.code, KeyboardHandler.lm);
	if (_local69 || _local70) this.I6.blur();
};
TextInput.prototype.setLabel = function (l) {
	this.IL.textContent = l;
};
TextInput.prototype.c = function (l) {
	var _local73 = this.I6,
		_local71 = l == null ? "" : l,
		_local72 = _local73.tagName == "SPAN";
	if (_local72) {
		_local73.textContent = " " + _local71;
		if (this.GZ) _local73.appendChild(this.GZ);
	} else _local73.value = _local71;
};
TextInput.prototype.aoI = function (l) {
	this.GZ.textContent = l;
};
TextInput.prototype.b = function () {
	return this.I6.value;
};
TextInput.prototype.KY = function () {
	this.I6.select();
	this.I6.focus();
};
TextInput.prototype.oi = function (l) {
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
TextInput.prototype.aeL = function (l) {
	this.dispatch(new Action("input", !1));
};


function FormPanel(l, d, G, b, V, Q, t, I, y) {
	UIComponent.call(this);
	if (V == null) V = 0;
	this.e = s.createElement("span", "fitem");
	var _local74 = s.getNextId();
	this.$w = l;
	this.pd = I;
	this.Et = 0;
	this.xM = y;
	this.pW = d;
	this.qx = G;
	this.uq = null;
	if (b instanceof Array) {
		this.uq = b;
		b = b[0];
	}
	this.X0 = b;
	this.hT = V;
	this.ayA = Q;
	this.ct = t;
	this.rO = 0;
	this.IL = s.createElement("label", "flabel");
	this.IL.setAttribute("style", "cursor:col-resize;");
	this.rF = s.createElement("input");
	this.rF.setAttribute("type", "range");
	if (t) {
		this.rF.min = 0;
		this.rF.max = 400;
	} else {
		this.rF.min = d;
		this.rF.max = G;
		if (V != 0) this.rF.step = (G - d) / 200;
	}
	this.I6 = s.createElement("input");
	this.I6.setAttribute("type", "text");
	this.I6.setAttribute("id", _local74);
	this.GZ = s.createElement("span");
	this.GZ.textContent = b;
	s.addKeydownBlocker(this.I6);
	this.I6.addEventListener("change", this.oi.bind(this), !1);
	this.I6.addEventListener("keydown", this.D3.bind(this), !1);
	this.I6.addEventListener("keyup", this.M1.bind(this), !1);
	this.I6.addEventListener("wheel", this.Uh.bind(this), !1);
	this.rF.addEventListener("input", this.oi.bind(this), !1);
	if (y) this.rF.addEventListener("change", this.oi.bind(this), !1);
	this.rF.addEventListener("click", this.aqr.bind(this), !1);
	this.a5K = this.als.bind(this);
	this.a3a = this.a2t.bind(this);
	this.ahs = this.ajr.bind(this);
	this.SH = 0;
	this.RR = 0;
	this.oR = !1;
	s.addPointerDown(this.IL, this.a5K);
	s.preventTouchAndGesture(this.IL);
}
FormPanel.prototype = new UIComponent();
FormPanel.prototype.r7 = function (l) {
	this.hT = l;
};
FormPanel.prototype.setLabel = function (l) {
	this.IL.style.display = l ? "inherit" : "none";
	if (l) this.IL.textContent = languageManager.get(l);
};
FormPanel.prototype.refresh = function () {
	var _local75 = this.$w,
		_local76 = this.pd;
	if (_local75) {
		if (typeof _local75 == "string" && _local75.startsWith("<")) this.IL.innerHTML = _local75;else
		this.updateLabel();
	}
	if (_local76) {
		_local76 = languageManager.get(_local76);
		if (_local75) this.IL.setAttribute("title", _local76);
		this.I6.setAttribute("title", _local76);
	}
};
FormPanel.prototype.c = function (l, d) {
	var _local77 = this.pW == this.qx,
		_local78;
	if (!_local77 && this.pW >= 0) l = Math.max(this.pW, l);
	if (this.hT == 0) l = Math.round(l);
	var _local79 = this.X0;
	this.Et = l;
	this.I6.value = (this.hT != 0 ? l.toFixed(this.hT) : l) + (this.ayA && _local79 ? (_local79.toLowerCase() == _local79.toUpperCase() ? "" : " ") + _local79 : "");
	if (-this.pW == this.qx) _local78 = 200 + Math.sign(l) * 200 * Math.pow(Math.abs(l) / this.qx, 1 / 2.7);else
	_local78 = 400 * Math.pow((l - this.pW) / (this.qx - this.pW), 1 / 2.7);
	this.rF.value = this.ct ? _local78 : l;
	if (d) this.Rx();
};
FormPanel.prototype.b = function () {
	var _local80 = this.Et;
	if (isNaN(_local80)) _local80 = 0;
	return _local80;
};
FormPanel.prototype.lz = function () {
	return this.X0;
};
FormPanel.prototype.oi = function (l) {
	var _local84 = 0;
	if (l.currentTarget == this.I6) {
		var _local81 = l.target.value,
			_local83 = 0;
		_local84 = _local81 == "" ? 0 : this.X0 ? parseFloat(_local81) : console.log("eval", _local81);
		if (isNaN(_local84)) _local84 = 0;
		while (_local83 < _local81.length && (_local81.charAt(_local83) == "." || 48 <= _local81.charCodeAt(_local83) && _local81.charCodeAt(_local83) <= 57)) _local83++;
		var _local82 = _local81.slice(_local83).trim();
		if (this.uq && this.uq.indexOf(_local82) != -1) this.X0 = _local82;
	} else {
		if (Date.now() - this.rO < 10) return;
		_local84 = parseFloat(l.target.value);
		if (this.ct) {
			if (-this.pW == this.qx) _local84 = Math.sign(_local84 - 200) * Math.pow(Math.abs(_local84 - 200) / 200, 2.7) * this.qx;else
			_local84 = this.pW + Math.pow(_local84 / 400, 2.7) * (this.qx - this.pW);
			_local84 = this.acp(_local84);
		}
	}
	this.c(_local84);
	if (l.type == "input" && this.xM) return;
	this.Rx();
};
FormPanel.prototype.Rx = function () {
	this.dispatch(new Action(ActionTypes.E.A));
};
FormPanel.prototype.acp = function (l) {
	if (this.qx - this.pW > 50 && l > 10) l = Math.round(l);
	return l;
};
FormPanel.prototype.D3 = function (l) {
	var _local85 = 0;
	if (KeyboardHandler._Q(l.code, KeyboardHandler.ZZ)) _local85 = 1;
	if (KeyboardHandler._Q(l.code, KeyboardHandler.Wz)) _local85 = -1;
	if (_local85 != 0) this.a2G(_local85, l.shiftKey);
};
FormPanel.prototype.M1 = function (l) {
	var _local87 = KeyboardHandler._Q(l.code, KeyboardHandler.mp),
		_local86 = KeyboardHandler._Q(l.code, KeyboardHandler.lm);
	if (_local87) this.c(this.b());
	if (_local86 || _local87) this.I6.blur();
};
FormPanel.prototype.Uh = function (l) {
	this.a2G(l.deltaY > 0 ? -1 : 1, l.shiftKey);
};
FormPanel.prototype.a2G = function (l, d) {
	var _local88 = this.b(),
		_local91 = this.hT,
		_local90 = l * (_local91 == null || _local91 == 0 || _local88 > 5 ? 1 : .1);
	if (d) _local90 *= 10;
	var _local89 = _local88 + _local90;
	if (!this.ct && this.qx != this.pW) _local89 = Math.min(this.qx, _local89);
	this.c(_local89);
	this.Rx();
};
FormPanel.prototype.aqr = function (l) {
	var _local95 = Date.now() - this.rO;
	this.rO = Date.now();
	if (_local95 > 200) return;
	var _local92 = this.pW,
		_local94 = this.qx,
		_local93 = (_local92 + _local94) / 2;
	if (_local92 < 1 && _local94 > 1 && _local94 < 10) _local93 = 1;else
	if (_local92 < 90 && _local94 > 110) _local93 = 100;else
	if (_local92 < 0 && _local94 > 0) _local93 = 0;
	this.c(_local93);
	this.Rx();
};
FormPanel.prototype.als = function (l) {
	s.addPointerMove(document, this.a3a);
	s.addPointerUp(document, this.ahs);
	this.SH = s.getEventPositionInElement(l, document.body).x;
	this.RR = this.b();
};
FormPanel.prototype.a2t = function (l) {
	s.stopAndPreventHandler(l);
	var _local99 = this.pW == this.qx,
		_local96 = s.getEventPositionInElement(l, document.body).x,
		_local98 = (_local96 - this.SH) * (_local99 ? 1 : 1 / 120 * (this.qx - this.pW)),
		_local97 = this.RR + _local98;
	if (_local99) _local97 = Math.round(_local97);
	if (!_local99) {
		if (!0) {
			_local97 = Math.max(this.pW, _local97);
			if (_local97 == this.pW) {
				this.SH = _local96;
				this.RR = this.pW;
			}
		}
		if (!this.ct) {
			_local97 = Math.min(this.qx, _local97);
			if (_local97 == this.qx) {
				this.SH = _local96;
				this.RR = this.qx;
			}
		}
		_local97 = this.acp(_local97);
	}
	this.oR = !0;
	this.c(_local97);
	if (!this.xM) this.Rx();
};
FormPanel.prototype.ajr = function (l) {
	if (!this.oR) this.I6.focus();
	this.oR = !1;
	if (this.xM) this.Rx();
	s.removePointerMove(document, this.a3a);
	s.removePointerUp(document, this.ahs);
};
FormPanel.prototype.KY = function () {
	this.I6.select();
	this.I6.focus();
};


function RangeDropInput(l, d, G, b, V, Q, t, I, y, e) {
	FormPanel.call(this, l, d, G, b, V, !0, Q, y, e);
	s.addClass(this.e, "rangedropinput");
	this.e.appendChild(this.IL);
	this.I6.setAttribute("style", "width:" + (I ? I : 3.3) + "em");
	this.e.appendChild(this.I6);
	this.aaO = s.createElement("span", "rangecontFloat");
	this.aaO.appendChild(this.rF);
	this.Dl = s.createElement("button");
	this.Dl.textContent = "\u25BC";
	s.addPointerDown(this.Dl, this.ayu.bind(this));
	if (t != !0) this.e.appendChild(this.Dl);
	this.TR = new UIComponent();
	this.TR.e = this.aaO;
}
RangeDropInput.prototype = new FormPanel();
RangeDropInput.prototype.ayu = function (l) {
	if (s.isInDocument(this.TR.e)) return;
	l.stopPropagation();
	var _local101 = this.e.getBoundingClientRect();
	this.rF.setAttribute("style", "width:" + _local101.width + "px;");
	var _local100 = new Action(ActionTypes.E.L, !0);
	_local100.data = {
		a: ActionTypes.$.dY,
		A3: this.TR,
		x: _local101.left - 10,
		y: _local101.top + _local101.height
	};
	this.dispatch(_local100);
};

function OffsetRangeInput(l, d, G, b, V, Q) {
	FormPanel.call(this, l, d, G, b, V, !1, Q);
	this.e.appendChild(this.IL);
	var _local102 = s.createElement("span");
	this.e.appendChild(_local102);
	_local102.appendChild(this.rF);
	this.e.appendChild(this.I6);
	this.I6.setAttribute("style", "width:3.3em");
	if (this.X0) this.e.appendChild(this.GZ);
}
OffsetRangeInput.prototype = new FormPanel();

function RangeInput(l, d, G, b, V, Q, t, I) {
	FormPanel.call(this, l, d, G, b, V, !0, Q, null, t);
	s.addClass(this.e, "trangeinput");
	this.e.appendChild(this.IL);
	this.e.appendChild(this.I6);
	var _local103 = s.createElement("span");
	if (I != !0) this.e.appendChild(_local103);
	_local103.appendChild(this.rF);
}
RangeInput.prototype = new FormPanel();



function DropdownMenu(l, d, G) {
	UIComponent.call(this);
	if (!d) return;
	this.Lq = 0;
	this.$w = l;
	this.CI = null;
	this.aor = G;
	this.EF = [];
	var _local105 = "dd" + s.getNextId();
	this.e = s.createElement("span", "fitem ddmenu");
	if (l) {
		this.IL = s.createElement("label", "flabel");
		this.e.appendChild(this.IL);
		this.IL.setAttribute("for", _local105);
	}
	this.I6 = s.createElement("select");
	this.I6.setAttribute("id", _local105);
	this.e.appendChild(this.I6);
	this.I6.addEventListener("change", this.oi.bind(this), !1);

	function _local104(Q) {
		var _local106 = 0;
		if (KeyboardHandler._Q(Q.code, KeyboardHandler.ZZ)) _local106 = 1;
		if (KeyboardHandler._Q(Q.code, KeyboardHandler.Wz)) _local106 = -1;
		if (_local106 != 0) Q.stopPropagation();
	}
	this.I6.addEventListener("keydown", _local104, !1);
	this.I6.addEventListener("keyup", _local104, !1);
	this.ES = [];
	this.i$ = null;
	this.b3(d, G);
	this.refresh();
}
DropdownMenu.prototype = new UIComponent();
DropdownMenu.prototype.setLabel = function (l) {
	this.$w = l;
	this.refresh();
};
DropdownMenu.prototype.refresh = function () {
	this.updateLabel();
	if (this.i$) this.b3(this.i$, this.aor);
	this.c(this.Lq);
};
DropdownMenu.prototype.b = function () {
	return this.Lq;
};
DropdownMenu.prototype.b3 = function (l, d) {
	s.clearChildren(this.I6);
	var _local108 = [],
		_local111 = 0;
	if (d) {
		_local108.push(d[0]);
		for (var _local107 = 1; _local107 < d.length; _local107++) _local108.push(_local108[_local107 - 1] + d[_local107]);
	}
	this.i$ = l;
	this.CI = [];
	this.aor = d;
	for (var _local107 = 0; _local107 < l.length; _local107++) {
		var _local110 = s.createElement("option");
		if (this.EF.indexOf(_local107) != -1) _local110.setAttribute("disabled", "");
		_local110.textContent = languageManager.get(l[_local107]);
		_local110.setAttribute("value", _local107);
		this.I6.appendChild(_local110);
		this.ES.push(_local110);
		this.CI.push(_local107 + _local111);
		if (_local108.indexOf(_local107 + 1) != -1 && _local107 != l.length - 1) {
			var _local109 = s.createElement("option");
			_local109.setAttribute("disabled", "");
			_local109.textContent = "";
			this.I6.appendChild(_local109);
			_local111++;
		}
	}
};
DropdownMenu.prototype.a27 = function (A) {
	var _local113 = this.EF,
		_local112 = _local113.indexOf(A);
	if (_local112 == -1) _local113.push(A);
	this.refresh();
};
DropdownMenu.prototype.aAz = function (A) {
	var _local115 = this.EF,
		_local114 = _local115.indexOf(A);
	if (_local114 != -1) _local115.splice(_local114, 1);
	this.refresh();
};
DropdownMenu.prototype.c = function (l) {
	this.Lq = l;
	this.I6.selectedIndex = this.CI[l];
};
DropdownMenu.prototype.oi = function (l) {
	this.Lq = this.CI.indexOf(this.I6.selectedIndex);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
DropdownMenu.prototype.KY = function () {
	this.I6.focus();
};


function ButtonGroupMenu(l, d, G, b) {
	UIComponent.call(this);
	if (!d) return;
	this.Lq = 0;
	this.aqU = b;
	this.e = s.createElement("span", "fitem bbmenu");
	this.oG = s.createElement("label", "flabel");
	if (l) {
		this.$w = l;
		this.oG.textContent = l + ":";
		this.e.appendChild(this.oG);
	}
	this.ES = [];
	this.Hh = s.createElement("span");
	this.e.appendChild(this.Hh);
	this.i$ = null;
	this.b3(d, G);
	this.c(0);
}
ButtonGroupMenu.prototype = new UIComponent();
ButtonGroupMenu.prototype.setLabel = function (l) {
	this.$w = l;
	this.refresh();
};
ButtonGroupMenu.prototype.refresh = function () {
	var _local118 = this.oG.parentNode != null,
		_local117 = this.e;
	if (this.$w != null) {
		if (!_local118) {
			_local117.appendChild(this.oG);
			_local117.appendChild(this.Hh);
		}
		this.oG.textContent = languageManager.get(this.$w) + ": ";
	} else if (_local118) _local117.removeChild(this.oG);
	for (var _local116 = 0; _local116 < this.ES.length; _local116++) this.ES[_local116].refresh();
};
ButtonGroupMenu.prototype.b = function () {
	return this.Lq;
};
ButtonGroupMenu.prototype.b3 = function (l, d) {
	s.clearChildren(this.Hh);
	this.ES = [];
	this.i$ = l;
	for (var _local119 = 0; _local119 < l.length; _local119++) {
		var _local120 = new ToolbarButton(l[_local119], !1, d ? d[_local119] : null, this.aqU);
		_local120.addListener("click", this.oi, this);
		this.Hh.appendChild(_local120.e);
		this.ES.push(_local120);
	}
	this.refresh();
};
ButtonGroupMenu.prototype.c = function (l) {
	this.Lq = l;
	for (var _local121 = 0; _local121 < this.ES.length; _local121++) this.ES[_local121].kL();
	this.ES[l].Nu();
};
ButtonGroupMenu.prototype.oi = function (l) {
	var _local122 = this.ES.indexOf(l.target);
	if (_local122 < 0 && l.target && l.target.e) {
		for (var _local123 = 0; _local123 < this.ES.length; _local123++) {
			if (this.ES[_local123].e === l.target || this.ES[_local123].e === l.target.e) {
				_local122 = _local123;
				break;
			}
		}
	}
	if (_local122 < 0) return;
	this.c(_local122);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
ButtonGroupMenu.Ze = function (l, d, G) {
	if (d == null) d = 16;
	var _local127 = ButtonGroupMenu.nv,
		_local126 = _local127.getContext("2d", { willReadFrequently: true }),
		_local125 = d >>> 1;
	_local127.width = _local127.height = d;
	var _local128 = [];
	for (var _local124 = 0; _local124 < l.length; _local124++) {
		if (l[_local124][0] == "-") _local128.push(l[_local124].slice(1));else
		if (l[_local124] == "checker" || l[_local124].startsWith("#")) {
			if (l[_local124] == "checker") {
				_local126.fillStyle = "white";
				_local126.fillRect(0, 0, d, d);
				_local126.fillStyle = "#bbbbbb";
				_local126.fillRect(_local125, 0, _local125, _local125);
				_local126.fillRect(0, _local125, _local125, _local125);
			} else if (l[_local124].startsWith("#")) {
				_local126.fillStyle = l[_local124];
				_local126.fillRect(0, 0, d, d);
			}
			_local128.push("<img src=\"" + _local127.toDataURL() + "\" />");
		} else _local128.push(s.getIconImgHtml(l[_local124], null, G ? G : "autoscale"));
	}
	return _local128;
};
ButtonGroupMenu.nv = s.createElement("canvas");


function SidebarColumnBase(l) {
	UIComponent.call(this);
	if (l == null) return;
	this.iJ = null;
	this.Tq = null;
	this.e = s.createElement("div", "sbar " + l);
	this.p1 = new s.createElement("div", "top");
	this.p1.innerHTML = "> <";
	this.e.appendChild(this.p1);
	this._h = 1;
	// this.p1.addEventListener("click", this.a2b.bind(this), !1)
}
SidebarColumnBase.prototype = new UIComponent;
SidebarColumnBase.prototype.a2b = function(l) {
	if (this.iJ != null && this.iJ < 500 && this._h == 0) return;
	if (this._h == 0) this.sS(!0);
	else this.collapse(!0)
};
SidebarColumnBase.prototype.arM = function(l) {
	this._h = l;
	this.p1.innerHTML = this._h == 0 ? "< >" : "> <"
};
SidebarColumnBase.prototype.aae = function() {
	var l = new Action(ActionTypes.E.L, !0);
	l.data = {
		a: ActionTypes.$.to
	};
	this.dispatch(l)
};
SidebarColumnBase.prototype.sS = function(l) {
	this.arM(1);
	if (l) this.aae()
};
SidebarColumnBase.prototype.collapse = function(l) {
	this.arM(0);
	if (l) this.aae()
};
SidebarColumnBase.prototype.TL = function() {
	return this._h == 1
};

function VerticalSidebarColumn(l, d) {
	SidebarColumnBase.call(this, "vcolumn");
	this.NG = l;
	this.asM = d;
	this.nD();
	this.BC = s.createElement("div");
	this.BC.setAttribute("style", "cursor:default;");
	this.anY = this.a3B.bind(this);
	this.aj3 = this.a0u.bind(this);
	this.a3W = this.azN.bind(this);
	s.addPointerDown(this.e, this.anY);
	this.e.appendChild(this.BC);
	this.Ki = s.createElement("div");
	this.BC.appendChild(this.Ki);
	this.r0 = -1;
	this.aca = s.createElement("div", "float");
	var G = this.Yg = s.createElement("canvas", "gsicon"),
		b = Math.round(12 * s.getDevicePixelRatio());
	G.width = G.height = b;
	var V = G.getContext("2d", { willReadFrequently: true });
	V.moveTo(2, 2);
	V.lineTo(b - 2, b - 2);
	V.moveTo(2, 7);
	V.lineTo(b - 7, b - 2);
	V.stroke();
	this.Yg.setAttribute("style", "position:absolute; bottom:0;  left:0;  cursor:nesw-resize;");
	s.preventTouchAndGesture(this.Yg);
	s.addPointerDown(this.Yg, this.anY);
	s.setCanvasCssSizeForDpr(G);
	this.xY = [];
	this.rd = [];
	this.a7L = null;
	this.$W = null;
	this.abt = 0
}
VerticalSidebarColumn.prototype = new SidebarColumnBase;
VerticalSidebarColumn.prototype.a3B = function(l) {
	var d = l.target == this.Yg;
	if (!d) {
		if (l.target != this.e) return;
		if (!this.TL()) return
	} else {
		var G = this.xY[this.r0]._F;
		G.style.pointerEvents = "none";
		var b = G.getBoundingClientRect();
		this.a7L = [b.width, b.height];
		this.rd[this.r0] = [b.width, b.height]
	}
	l.stopPropagation();
	this.$W = s.getEventPositionInElement(l, document.body);
	this.abt = this.NG;
	s.addPointerMove(document, this.aj3);
	s.addPointerUp(document, this.a3W)
};
VerticalSidebarColumn.prototype.a0u = function(l) {
	var d = s.getEventPositionInElement(l, document.body);
	if (this.TL()) {
		this.NG = this.abt + this.$W.x - d.x;
		this.nD()
	} else {
		var G = this.rd[this.r0],
			b = this.a7L;
		G[0] = b[0] + this.$W.x - d.x;
		G[1] = b[1] + d.y - this.$W.y
	}
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.to
	};
	this.dispatch(V)
};
VerticalSidebarColumn.prototype.azN = function(l) {
	if (!this.TL()) {
		var d = this.xY[this.r0]._F;
		d.style.pointerEvents = "auto"
	}
	s.removePointerMove(document, this.aj3);
	s.removePointerUp(document, this.a3W)
};
VerticalSidebarColumn.prototype.ayf = function(l) {
	l.addListener("showFloat", this.a7Z, this);
	l.addListener("hideFloat", this.Lb, this);
	this.xY.push(l);
	l.parent = this;
	this.BC.appendChild(l.e)
};
VerticalSidebarColumn.prototype.akg = function(A) {
	var l = this.xY[A];
	l.removeEventListener("showFloat", this.a7Z, this);
	l.removeEventListener("hideFloat", this.Lb, this);
	this.xY.splice(A, 1);
	l.parent = null;
	this.BC.removeChild(l.e)
};
VerticalSidebarColumn.prototype.aoj = function() {
	return this.xY.length
};
VerticalSidebarColumn.prototype.AH = function() {
	for (var A = 0; A < this.xY.length; A++) this.xY[A].AH()
};
VerticalSidebarColumn.prototype.a7Z = function(l) {
	this.AH();
	var d = this.aca;
	this.Ki.appendChild(d);
	this.r0 = this.xY.indexOf(l.currentTarget);
	var G = this.xY[this.r0]._F;
	s.clearChildren(d);
	d.appendChild(G);
	d.appendChild(this.Yg);
	this.resize(this.iJ, this.Tq)
};
VerticalSidebarColumn.prototype.Lb = function(l) {
	this.AH();
	if (this.r0 != -1) {
		this.Ki.removeChild(this.aca);
		this.r0 = -1
	}
};
VerticalSidebarColumn.prototype.nD = function() {
	function l(d) {
		return Math.round(d * s.getDevicePixelRatio()) / s.getDevicePixelRatio()
	}
	this.e.setAttribute("style", "width: " + this.NG + "px; border-left-width:" + l(4) + "px; cursor:ew-resize;")
};
VerticalSidebarColumn.prototype.sS = function(l) {
	this.nD();
	this.Lb();
	for (var A = 0; A < this.xY.length; A++) this.xY[A].sS();
	SidebarColumnBase.prototype.sS.call(this, l)
};
VerticalSidebarColumn.prototype.collapse = function(l) {
	this.e.removeAttribute("style");
	for (var A = 0; A < this.xY.length; A++) this.xY[A].collapse();
	SidebarColumnBase.prototype.collapse.call(this, l)
};
VerticalSidebarColumn.aoR = 11;
VerticalSidebarColumn.prototype.resize = function(l, d) {
	this.iJ = l;
	this.Tq = d;
	d -= VerticalSidebarColumn.aoR;
	var G = this.xY.length;
	if (G == 0) return;
	if (!this.TL()) {
		var b = d < 400 ? d : 400 + (d - 400) * .5;
		for (var A = 0; A < G; A++) {
			var V = this.xY[A],
				Q = this.rd[A];
			V.resize(Q ? Q[0] : this.NG, Q ? Q[1] : b)
		}
	} else {
		var t = d;
		for (var A = 0; A < G; A++) {
			var V = this.xY[A],
				I = V.aeM();
			if (A == G - 1) {
				I = t;
				V.e.style.borderBottom = "none"
			}
			V.resize(this.NG, I);
			t -= I + 4
		}
	}
};


function ForeBackColorSwatch() {
	UIComponent.call(this);
	this.K2 = !1;
	this.qn = 20;
	this.auo = 10;
	this.D$ = 0;
	this.K2 = !1;
	this.gl = {
		o: 255,
		J: 0,
		k: 0
	};
	this.H3 = {
		o: 0,
		J: 0,
		k: 0
	};
	this.e = s.createElement("canvas");
	this.VP();
	s.preventTouchAndGesture(this.e);
	s.addPointerDown(this.e, this.TC.bind(this));
}
ForeBackColorSwatch.prototype = new UIComponent();
ForeBackColorSwatch.prototype.atT = function (l) {
	if (this.K2 == l) return;
	this.K2 = l;
	this.VP();
};
ForeBackColorSwatch.prototype.refresh = function () {};
ForeBackColorSwatch.prototype.ah9 = function (l, d) {
	function _local308(b) {
		return {
			o: b >> 16 & 255,
			J: b >> 8 & 255,
			k: b & 255
		};
	}
	if (l != null) this.gl = _local308(l);
	if (d != null) this.H3 = _local308(d);
	this.VP();
};
ForeBackColorSwatch.prototype.TC = function (l) {
	var _local313 = s.getEventPositionInElement(l, this.e),
		_local309 = _local313.x * s.getDevicePixelRatio(),
		_local312 = _local313.y * s.getDevicePixelRatio(),
		_local311 = this.qn,
		_local310 = this.auo,
		_local314 = 0;
	if (_local309 < _local310 && _local312 < _local310) {
		_local314 = 0;
	} else if (_local309 > _local311 - _local310 && _local312 > _local311 - _local310) {
		_local314 = 1;
	} else if (_local309 < _local310) {
		_local314 = 2;
	} else {
		_local314 = 3;
	}
	this.BN(_local314);
};
ForeBackColorSwatch.prototype.BN = function (l) {
	var _local316 = new Action(ActionTypes.E.L, !0);
	if (l > 1) _local316.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.K5,
		y3: l
	};else
	{
		this.D$ = l;
		var _local315 = l == 0 ? this.gl : this.H3;
		_local316.data = {
			a: ActionTypes.$.SN,
			GU: "colorpicker",
			_A: _local315.o << 16 | _local315.J << 8 | _local315.k,
			qF: this.Y_.bind(this)
		};
	}
	this.dispatch(_local316);
};
ForeBackColorSwatch.prototype.Y_ = function (l) {
	var _local317 = new Action(ActionTypes.E.L, !0);
	_local317.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.K5,
		y3: this.D$,
		Z: l
	};
	this.dispatch(_local317);
};
ForeBackColorSwatch.prototype.VP = function () {
	var _local329 = this.e,
		_local327 = _local329.getContext("2d", { willReadFrequently: true }),
		_local319 = s.getDevicePixelRatio(),
		_local325 = "#aaaaaa",
		_local323 = .62;
	s.setCanvasSizeForDpr(_local329, 34, 34);
	_local329.setAttribute("style", _local329.getAttribute("style") + ";cursor:pointer");
	var _local326 = this.qn = _local329.width,
		_local331 = this.auo = Math.round(_local326 * _local323);

	function _local320(r, T) {
		var _local335 = r.o,
			_local334 = r.J,
			_local333 = r.k;
		if (T) _local335 = _local334 = _local333 = Math.round(PixelUtil.luminanceRgb(_local335, _local334, _local333));
		var _local336 = _local335 << 16 | _local334 << 8 | _local333;
		return "#" + PixelUtil.intToHex6(_local336);
	}

	function _local332(d, r, T, j, g, Y) {
		d.beginPath();
		if (j >= Y * 2 && g >= Y * 2) {
			d.moveTo(r + Y, T);
			d.lineTo(r + j - Y, T);
			d.quadraticCurveTo(r + j, T, r + j, T + Y);
			d.lineTo(r + j, T + g - Y);
			d.quadraticCurveTo(r + j, T + g, r + j - Y, T + g);
			d.lineTo(r + Y, T + g);
			d.quadraticCurveTo(r, T + g, r, T + g - Y);
			d.lineTo(r, T + Y);
			d.quadraticCurveTo(r, T, r + Y, T);
		}
		d.closePath();
	}

	function _local328(r, T, t, j, g) {
		_local327.strokeStyle = g ? g : "black";
		_local327.fillStyle = j;
		_local332(_local327, r + .5, T + .5, t - 1, t - 1, t * .2);
		_local327.fill();
		_local327.stroke();
	}
	_local328(_local326 - _local331, _local326 - _local331, _local331, _local320(this.H3, this.K2));
	_local328(0, 0, _local331, _local320(this.gl, this.K2));
	var _local322 = _local326 - _local331,
		_local324 = Math.round(_local322 * _local323);
	_local328(_local326 - _local324, _local322 - _local324, _local324, "white", _local325);
	_local328(_local326 - _local322, 0, _local324, "black", _local325);
	_local327.save();
	_local327.fillStyle = _local325;
	_local327.translate(0, _local326);
	_local327.rotate(-Math.PI / 2);
	_local322 = _local326 - _local331;
	var _local321 = Math.round(_local322 * .28),
		_local330 = Math.round(_local322 * .25);
	for (var _local318 = 0; _local318 < 2; _local318++) {
		_local327.fillRect(_local321, _local321, _local322 - _local321, 1);
		_local327.beginPath();
		_local327.moveTo(_local322 - _local330, _local321 + .5 - _local330);
		_local327.lineTo(_local322, _local321 + .5);
		_local327.lineTo(_local322 - _local330, _local321 + .5 + _local330);
		_local327.closePath();
		_local327.fill();
		_local327.transform(0, 1, 1, 0, 0, 0);
	}
	_local327.restore();
};


function MultiOptionBox(l, d, G, b, V, Q) {
	UIComponent.call(this);
	this.e = s.createElement("span", "fitem mbox");
	this.axT = G;
	this.az$ = V;
	if (l) {
		this.$w = l;
		this.oG = s.createElement("label", "flabel");
		this.e.appendChild(this.oG);
	}
	this.jr = d;
	this.pK = [];
	for (var _local129 = 0; _local129 < d.length; _local129++) {
		var _local130 = G ? new ToolbarButton(d[_local129], !1, b ? b[_local129] : null, !1, Q) : new CheckboxControl(d[_local129], !0, "");
		_local130.addListener(G ? "click" : ActionTypes.E.A, this.oi, this);
		this.pK.push(_local130);
		this.e.appendChild(_local130.e);
	}
	this.refresh();
}
MultiOptionBox.prototype = new UIComponent();
MultiOptionBox.prototype.c = function (l) {
	for (var _local131 = 0; _local131 < this.jr.length; _local131++) this.pK[_local131].c(l[_local131]);
};
MultiOptionBox.prototype.b = function () {
	var _local133 = [];
	for (var _local132 = 0; _local132 < this.jr.length; _local132++) _local133[_local132] = this.pK[_local132].b();
	return _local133;
};
MultiOptionBox.prototype.refresh = function () {
	if (this.$w) this.oG.innerHTML = languageManager.get(this.$w) + ": ";
	var _local135 = this.pK;
	for (var _local134 = 0; _local134 < _local135.length; _local134++) {
		_local135[_local134].refresh();
		if (_local134 == _local135.length - 1) _local135[_local134].e.style.marginRight = "0px";
	}
};
MultiOptionBox.prototype.oi = function (l) {
	var _local136 = this.pK.indexOf(l.currentTarget),
		_local138 = this.pK[_local136];
	if (this.axT) _local138.c(!_local138.b());
	if (this.az$) {
		var _local137 = _local138.b();
		for (var _local136 = 0; _local136 < this.pK.length; _local136++) this.pK[_local136].c(!1);
		_local138.c(_local137);
	}
	this.dispatch(new Action(ActionTypes.E.A, !1));
};


function LabelItem(l, d) {
	UIComponent.call(this);
	this.$w = l;
	this.e = s.createElement("span", "labelitem fitem" + (d ? " spread" : ""));
	this.refresh();
}
LabelItem.prototype = new UIComponent();
LabelItem.prototype.c = function (l) {
	this.e.textContent = l;
};
LabelItem.prototype.b = function () {
	return this.e.textContent;
};
LabelItem.prototype.zn = function () {
	this.e.removeAttribute("disabled");
};
LabelItem.prototype.$F = function () {
	this.e.setAttribute("disabled", "");
};
LabelItem.prototype.setLabel = function (l) {
	this.e.textContent = l;
};
LabelItem.prototype.refresh = function () {
	this.e.textContent = languageManager.get(this.$w);
};
LabelItem.prototype.ap2 = function () {
	return this.$w;
};


function ToolbarButton(l, d, G, b, V) {
	UIComponent.call(this);
	this.Eg = !1;
	this.e = s.createElement("button", "fitem" + (d ? " spread" : "") + (b ? " bbtn" : ""));
	this.$w = l;
	this.pd = G;
	this.refresh();
	var _local64 = V && window.PointerEvent ? "pointerup" : "click";
	// console.log(this.e);
	this.e.addEventListener(_local64, this.ec.bind(this), !1);
}

ToolbarButton.prototype = new UIComponent();

ToolbarButton.prototype.refresh = function () {
	var _local67 = this.e,
		_local66 = this.$w,
		_local65 = this.pd;
	if (typeof _local66 == "string" && (_local66.startsWith("<img") || _local66.startsWith("<svg") || _local66.startsWith("<span"))) {
		if (!this.Eg) {
			_local67.innerHTML = _local66;
			_local67.setAttribute("style", "padding:2px");
			this.Eg = !0;
		}
	} else _local67.textContent = languageManager.get(_local66);
	if (_local65) {
		_local67.setAttribute("title", languageManager.get(_local65));
	}
};

ToolbarButton.prototype.arb = function (l) {
	this.e.setAttribute("title", l);
};

ToolbarButton.prototype.ec = function (l) {
	this.dispatch(new Action("click", !1));
};

ToolbarButton.prototype.Nu = function () {
	s.addClass(this.e, "bactive");
};

ToolbarButton.prototype.kL = function () {
	s.removeClass(this.e, "bactive");
};

ToolbarButton.prototype.setLabel = function (l, d) {
	if (l && l != this.$w) {
		this.$w = l;
		this.Eg = !1;
	}
	if (d) this.pd = d;
	this.refresh();
};

ToolbarButton.prototype.c = function (l) {
	if (l) this.Nu();else
	this.kL();
};

ToolbarButton.prototype.dB = function () {
	return this.e.getAttribute("class").indexOf("bactive") != -1;
};

ToolbarButton.prototype.b = function () {
	return this.dB();
};



function PanelTabBase(l, d, G, b) {
	UIComponent.call(this);
	this.name = l;
	this.amM = G;
	this.kR = b;
	this.PT = s.createElement("div", "");
	this.PT.setAttribute("draggable", "true");
	this.DK = s.createElement("div", "pbody");	
	this.wZ = new ToolbarButton("", !1, "");
	this.wZ.parent = this;
	this.a8x = s.createElement("span", "cross gsicon");
	this.c1 = s.createElement("span", "label");
	var _local3351 = this.a7f.bind(this);
	this.PT.addEventListener("mousedown", this.av_.bind(this), !1);
	this.PT.addEventListener("contextmenu", _local3351, !1);
	this.wZ.e.addEventListener("contextmenu", _local3351, !1);
	this.a8x.addEventListener("mousedown", this.gV.bind(this), !1);
	this.PT.appendChild(this.c1);
	if (d) this.PT.appendChild(this.a8x);
	this.Lq = !1;
	this.c1.textContent = l;
}

PanelTabBase.prototype = new UIComponent();

PanelTabBase.prototype.xI = function () {
	return null;
};

PanelTabBase.prototype.refresh = function () {
	var _local3359 = languageManager.get(this.name),
		_local3357 = !1,
		_local3352 = this.iJ == 0 ? 22 : Math.round(2 + this.iJ / 50);
	if (_local3359.endsWith(" *")) {
		_local3357 = !0;
		_local3359 = _local3359.slice(0, _local3359.length - 2);
		_local3352 -= 2;
	}
	var _local3356 = _local3359.length > _local3352;
	this.c1.textContent = _local3356 ? _local3359.slice(0, _local3352 - 2) : _local3359;
	if (_local3356)
	for (var _local3355 = 0; _local3355 < 2; _local3355++) {
		var _local3354 = s.createElement("span");
		_local3354.textContent = _local3359.charAt(_local3352 - 2 + _local3355);
		_local3354.setAttribute("style", "opacity:" + (.6 - _local3355 * .4));
		this.c1.appendChild(_local3354);
	}
	if (_local3357) {
		var _local3354 = s.createElement("span");
		_local3354.textContent = " *";
		this.c1.appendChild(_local3354);
	}
	var _local3360 = _local3359.split(" "),
		_local3353 = _local3360.length == 2 ? _local3360[0].substring(0, 2) + _local3360[1][0] : _local3359.substring(0, 3);
	if (_local3353.charCodeAt(0) >= 11776) _local3353 = _local3353.substring(0, 1);
	var _local3361 = this.amM;
	if (_local3361 == null) this.wZ.setLabel(_local3353, _local3359);else
	{
		var _local3358;
		if (_local3361.startsWith("---")) _local3358 = "<img src=\"" + PIMG[_local3361.slice(3)] + "\" class=\"autoscale gsicon\" style=\"margin:2px 4px;\"/>";else
		if (_local3361.startsWith("===")) _local3358 = "<img src=\"" + _local3361.slice(3) + "\" class=\"autoscale gsicon\" style=\"margin:2px 4px;\"/>";else
		if (_local3361.indexOf("\"") == -1) _local3358 = "<img src=\"" + _local3361 + "\" alt=\"" + s.escapeHtml(_local3359).replace(/"/g, "&quot;") + "\" height=\"18\" width=\"18\" loading=\"lazy\" style=\"margin:1px 3px;\" />";
		this.wZ.setLabel(_local3358, _local3359);
	}
};

PanelTabBase.prototype.enable = function () {
	this.DK.className = "pbody";
};

PanelTabBase.prototype.disable = function () {
	this.DK.className = "pbody disabled";
};

PanelTabBase.prototype.BM = function (l, d) {};

PanelTabBase.prototype.Yw = function (l, d, G) {};

PanelTabBase.prototype.em = function (l) {};

PanelTabBase.prototype.resize = function (l, d) {};

PanelTabBase.prototype.Pl = function (l) {
	this.name = l;
	this.refresh();
};

PanelTabBase.prototype.KN = function () {};

PanelTabBase.prototype.av_ = function (l) {
	if (l.button == 0) this.dispatch(new Action("select", !1));
};

PanelTabBase.prototype.a7f = function (l) {
	s.stopAndPreventHandler(l);
	if (this.kR != null && isNaN(this.kR)) return;
	var _local3364 = s.getEventPositionInElement(l, document.body),
		_local3362 = this.Rk;
	if (_local3362 == null) {
		// _local3362 = this.Rk = new ContextPanel([{
		// 	name: "Close"
		// }]);
		// this.Rk.addListener("select", this.gV, this);
	}
	// _local3362.update(null);
	// _local3362.refresh();
	// _local3362.parent = this;
	var _local3363 = new Action(ActionTypes.E.L, !0);
	_local3363.data = {
		a: ActionTypes.$.dY,
		A3: _local3362,
		x: _local3364.x + 1,
		y: _local3364.y + 1
	};
	this.dispatch(_local3363);
};

PanelTabBase.prototype.pN = function () {
	this.gV({});
};

PanelTabBase.prototype.gV = function (l) {
	if (l.stopPropagation) l.stopPropagation();
	if (this.kR != null && !isNaN(this.kR)) {
		var _local3365 = new Action(ActionTypes.E.L, !0);
		_local3365.data = {
			a: ActionTypes.$.qH,
			A3: this.Rk
		};
		this.dispatch(_local3365);
		_local3365.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.X2,
			Z: parseFloat(this.kR),
			pb: "del"
		};
		this.dispatch(_local3365);
	} else if (this.ah$()) this.dispatch(new Action(ActionTypes.E.Ax, !1));
};

PanelTabBase.prototype.ah$ = function (l) {
	return !0;
};

PanelTabBase.prototype.dJ = function (l, d, G, b, V) {};

PanelTabBase.prototype.JP = function (l, d, G, b, V) {};

PanelTabBase.prototype.Nl = function (l, d, G, b, V) {};

PanelTabBase.di = function (l, d, G) {
	if (l.childElementCount != 0) return;
	var _local3367 = l.textContent;
	this.M1 = this.auP.bind(this);
	this.a6e = this.a0b.bind(this);
	this.sd = d;
	this.apP = G;
	this.Qj = l;
	this.afZ = _local3367;
	var _local3366 = s.createElement("input", "");
	_local3366.setAttribute("type", "text");
	_local3366.setAttribute("size", "10");
	_local3366.setAttribute("value", _local3367);
	s.clearChildren(l);
	l.appendChild(_local3366);
	_local3366.select();
	_local3366.focus();
	s.addKeydownBlocker(l);
	l.addEventListener("keyup", this.M1, !1);
	document.body.addEventListener("mousedown", this.a6e, !1);
};

PanelTabBase.di.prototype.auP = function (l) {
	var _local3369 = KeyboardHandler._Q,
		_local3368 = _local3369(l.code, KeyboardHandler.lm);
	if (_local3369(l.code, KeyboardHandler.mp) || _local3368) this.azL(_local3368);
};

PanelTabBase.di.prototype.a0b = function (l) {
	var _local3370 = l.target;
	if (_local3370.tagName && _local3370.tagName.toLowerCase() == "input") return;
	this.azL(!0);
};

PanelTabBase.di.prototype.azL = function (l) {
	var _local3372 = this.Qj,
		_local3371 = _local3372.firstChild.value;
	_local3372.removeEventListener("keyup", this.M1);
	document.body.removeEventListener("mousedown", this.a6e);
	if (this.apP || l && _local3371 != "" && _local3371 != this.afZ) {
		this.sd(_local3371);
	} else {
		s.clearChildren(_local3372);
		_local3372.textContent = this.afZ;
	}
};

PanelTabBase.xA = {
	lv: "0",
	agA: "1",
	yS: "2",
	aoQ: "3",
	a7r: "4",
	uB: "5",
	CSS: "6",
	CV: "7",
	ax2: "8",
	a46: "9",
	alU: "10",
	abR: "11",
	afm: "12",
	K5: "13",
	qa: "14",
	aAh: "15",
	aan: "16",
	fe: "17",
	auV: "18",
	al9: "19",
	al6: "20",
	G9: "21",
	avR: "22",
	atY: "23"
};


function PanelContainer(l) {
UIComponent.call(this);
this.u7 = PanelContainer.u7++;
	this.SB = l;
	this.a9a = this.a6v.bind(this);
	this.azi = this.aqE.bind(this);
	this.avU = this.r5.bind(this);
	this.aqm = this.agR.bind(this);
	this.aye = this.a0Z.bind(this);
	this.ait = this.ado.bind(this);
	this.gm = 0;
	this.amD = 0;
	this.aqA = 0;
	this.e = s.createElement("div", "panelblock");
	this._F = s.createElement("div", "block");
	this.ar = s.createElement("div", "collapsed");
	this.e.appendChild(this._F);
	this.Lq = -1;
	this.Is = !0;
	this.lH = s.createElement("div", "panelhead");
	this._F.appendChild(this.lH);
	this.A5(this.lH);
	this._W = new ToolbarButton("\u2261");
	this._W.e.setAttribute("style", "position:absolute; right:0;");
	this._W.addListener("click", this.awl, this);
	this.jo = s.createElement("div", "body");
	this._F.appendChild(this.jo);
	this.k3 = [];
	this.bN = null;
	this.jM = null
}
PanelContainer.u7 = 0;
PanelContainer.prototype = new UIComponent;
PanelContainer.DV = 26.1;
PanelContainer.prototype.awl = function(l) {
	var d = this.k3[this.Lq].xI(),
		G = l.currentTarget.e.getBoundingClientRect();
	d.refresh();
	d.update();
	d.parent = this;
	var b = new Action(ActionTypes.E.L, !0);
	b.data = {
		a: ActionTypes.$.dY,
		A3: d,
		x: G.left,
		y: G.top + G.height + 2
	};
	this.dispatch(b)
};
PanelContainer.prototype.tO = function(l) {
	var d = this._F,
		G = this.lH,
		b = this.jo;
	if (s.isInDocument(G)) d.removeChild(G);
	if (s.isInDocument(b)) d.removeChild(b);
	if (l == 0) d.appendChild(G);
	d.appendChild(b);
	this.aqA = l
};
PanelContainer.Ht = function(l) {
	l.stopPropagation();
	l.preventDefault()
};
PanelContainer.prototype.a6v = function(l) {
	var d = l.dataTransfer.types;
	if (d[1] != null && d[1] != this.u7 + "") return;
	PanelContainer.Ht(l);
	var hZ = l.currentTarget;
	if (l.target == hZ) s.addClass(hZ, "highlight")
};
PanelContainer.prototype.aqE = function(l) {
	PanelContainer.Ht(l);
	var hZ = l.currentTarget;
	if (l.target == hZ) s.removeClass(hZ, "highlight")
};
PanelContainer.prototype.A5 = function(l) {
	// edit: binding event handler
	l.addEventListener("dragenter", this.a9a, !1);
	l.addEventListener("dragleave", this.azi, !1);
	l.addEventListener("dragover", PanelContainer.Ht, !1);
	l.addEventListener("drop", this.avU, !1);
	l.addEventListener("dragstart", function(d) {
		d.dataTransfer.setData("Text", "--panel");
		d.dataTransfer.setData(this.u7 + "", "")
	}.bind(this), !1)
};
PanelContainer.prototype.r5 = function(l) {
	this.azi(l);
	var d = null,
		hZ = l.currentTarget,
		G = this.abm(hZ);
	
	if (hZ == this.jo && this.Lq != -1) d = this.Lq;
	else if (hZ == this.lH) d = null;
	else if (G != -1) d = G;

	var b = l.dataTransfer.getData("Text");
	if (b == "" || b.startsWith("http")) {
		s.handleDataTransferDrop(l, this, d);
	} else if (b == "--panel") {
		var V = s.getEventPositionInElement(l, hZ),
			Q = this.k3,
			t = Q.slice(0),
			A = this.Lq,
			I = G == -1 ? Q.length : V.x < hZ.getBoundingClientRect().width / 2 ? G : G + 1;
		if (A == I || A + 1 == I || hZ == this.jo) return;
		var y = A < I ? I - 1 : I,
			e = Q[A];
		Q.splice(A, 1);
		Q.splice(y, 0, e);
		s.clearChildren(this.lH);
		for (var M = 0; M < Q.length; M++) this.lH.appendChild(Q[M].PT);
		this.AT(y);
		var R = [];
		for (var A = 0; A < Q.length; A++) R[A] = t.indexOf(Q[A]);
		var J = new Action("shuffleItems", !1);
		J.data = {
			aqF: R
		};
		this.dispatch(J)
	} else if (d != null && this instanceof WorkspacePanelContainer) {
		var J = new Action(ActionTypes.E.L, !0);
		J.data = {
			a: ActionTypes.$.a3e,
			aph: d
		};
		this.dispatch(J)
	}
};
PanelContainer.prototype.XQ = function() {
	return null
};
PanelContainer.prototype.aee = function() {
	if (this.XQ()) {
		this.lH.style.padding = "0px";
		this.jM = this.XQ();
		this.jo.appendChild(this.jM);
		this.HX.setEnabled(!1);
		var l = new Action(ActionTypes.E.L, !0);
		l.data = {
			a: ActionTypes.$.Mc,
			Z: 1
		};
		this.dispatch(l)
	}
};
PanelContainer.prototype.a5I = function() {
	if (this.jM) {
		this.lH.style.padding = "";
		this.jo.removeChild(this.jM);
		this.jM = null;
		this.HX.setEnabled(!0);
		var l = new Action(ActionTypes.E.L, !0);
		l.data = {
			a: ActionTypes.$.Mc,
			Z: 0
		};
		this.dispatch(l)
	}
};
PanelContainer.prototype.abm = function(l) {
	var d = this.k3;
	for (var A = 0; A < d.length; A++)
		if (d[A].PT == l) return A;
	return -1
};
PanelContainer.prototype.AH = function() {
	for (var A = 0; A < this.k3.length; A++) this.k3[A].wZ.kL()
};
PanelContainer.prototype.ZF = function() {
	return this.Lq
};
PanelContainer.prototype.sS = function() {
	if (this.Is) return;
	this.Is = !0;
	this.e.removeChild(this.ar);
	this.e.appendChild(this._F)
};
PanelContainer.prototype.collapse = function() {
	if (!this.Is) return;
	this.Is = !1;
	this.e.appendChild(this.ar);
	this.e.removeChild(this._F)
};
PanelContainer.prototype.DV = function() {
	var l = 0;
	if (this.aqA == 0) {
		l = this.lH.getBoundingClientRect().height + 1;
		l = Math.max(l, PanelContainer.DV)
	}
	return l
};
PanelContainer.prototype.aeM = function() {
	return this.DV() + this.jo.getBoundingClientRect().height
};
PanelContainer.prototype.resize = function(l, d) {
	this.lH.style.maxWidth = l + "px";
	var G = this.DV();
	if (this.Lq != -1) {
		// this.k3[this.Lq].resize(l, d - G);
		this.k3[this.Lq].resize(l, d);
	}
	return d - G
};
PanelContainer.prototype.BM = function(l, d) {
	if (this.Lq != -1) this.k3[this.Lq].BM(l, d)
};
PanelContainer.prototype.Yw = function(l, d, G) {
	this.k3[this.Lq].Yw(l, d, G)
};
PanelContainer.prototype.$J = function(l) {
	this.a5I();
	if (this.k3.indexOf(l) != -1) {
		this.AT(this.k3.indexOf(l));
		return
	}
	l.parent = this;
	this.k3.push(l);
	this.lH.appendChild(l.PT);
	l.PT.addEventListener("mouseover", this.aqm, !1);
	this.A5(l.PT);
	this.ar.appendChild(l.wZ.e);
	l.wZ.addListener("click", this.ajN, this);
	// l.addListener("select", this.axL, this);
	// l.addListener(ActionTypes.E.Ax, this.azD, this);
	this.AT(this.k3.length - 1)
};
PanelContainer.prototype.agR = function(l) {
	if (l.buttons == 0) return;
	var d = l.currentTarget,
		G = d,
		A = 0;
	while ((G = G.previousSibling) != null) A++;
	this.amD = A;
	d.addEventListener("mouseout", this.aye, !1);
	this.gm = setTimeout(this.ait, 700)
};
PanelContainer.prototype.a0Z = function(l) {
	var d = l.currentTarget,
		G = d,
		A = 0;
	while ((G = G.previousSibling) != null) A++;
	d.removeEventListener("mouseout", this.aye);
	clearTimeout(this.gm)
};
PanelContainer.prototype.ado = function(l) {
	this.dispatch(new Action(ActionTypes.E.azc, !1))
};
PanelContainer.prototype.arO = function(l) {
	return this.amD
};
PanelContainer.prototype.cd = function(A) {
	var l = new Action(ActionTypes.E.Ax, !1);
	l.data = {
		iu: A
	};
	this.dispatch(l);
	var d = this.k3[A];
	this.k3.splice(A, 1);
	this.lH.removeChild(d.PT);
	this.ar.removeChild(d.wZ.e);
	d.PT.className = "";
	d.wZ.removeEventListener("click", this.ajN, this);
	d.wZ.kL();
	d.removeEventListener("activate", this.axL);
	d.removeEventListener(ActionTypes.E.Ax, this.azD);
	var G = this.Lq;
	if (A < G) G--;
	else if (A == G && A == this.k3.length) G--;
	this.AT(G);
	if (this.k3.length == 0) this.aee()
};
PanelContainer.prototype.a5B = function() {
	return this.k3.length
};
PanelContainer.prototype.pN = function() {
	if (this.k3.length != 0) this.k3[this.Lq].pN()
};
PanelContainer.prototype.AT = function(l, d) {
	if (d == null) d = !0;
	for (var A = 0; A < this.k3.length; A++) this.k3[A].PT.className = "";
	if (this.bN) this.jo.removeChild(this.bN);
	this.bN = null;
	this.Lq = l;
	if (l == -1) return;
	var G = this.k3[this.Lq];
	this.bN = G.DK;
	this.jo.appendChild(G.DK);
	G.PT.className = "active";
	if (!this.Is) {
		this.dispatch(new Action("showFloat"));
		this.k3[l].wZ.Nu()
	}
	if (d) this.dispatch(new Action(ActionTypes.E.A, !1));
	G.KN(); // hbi
	var b = this._W.e;
	if (b.parentNode) this.lH.removeChild(b);
	if (G.xI()) this.lH.appendChild(b); // hbi
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.to
	};
	this.dispatch(V);
};
PanelContainer.prototype.axL = function(l) {
	if (this.SB && !this.SB.a3S()) return;
	var A = this.k3.indexOf(l.currentTarget);
	this.AT(A)
};
PanelContainer.prototype.azD = function(l) {
	if (this.SB && !this.SB.a3S()) return;
	var A = this.k3.indexOf(l.currentTarget);
	this.cd(A)
};
PanelContainer.prototype.ajN = function(l) {
	var d = this.k3.indexOf(l.currentTarget.parent);
	if (this.k3[d].wZ.dB()) this.dispatch(new Action("hideFloat"));
	else this.AT(d)
};
PanelContainer.prototype.apq = function(l) {
	this.dispatch(l)
};



function StoragePanel(l) {
	UIComponent.call(this);
	this.Dy = l;
	this.GL = 0;
	this.agX = !1;
	this.I_ = l ? new StoragePanel.IU() : null;
	this.e = s.createElement("div", "flexrow storageset");
	this.e.style.background = "var(--bg-panel)";
	this.SS = s.createElement("div");
	this.e.appendChild(this.SS);
	this.CM = s.createElement("div");
	this.e.appendChild(this.CM);
	this.VS = [];
	var _local1188 = Storage.list.length;
	if (l) _local1188++;
	var _local1186 = this.ps.bind(this);
	for (var _local1185 = 0; _local1185 < _local1188; _local1185++) {
		var _local1187 = s.createElement("div");
		this.VS.push(_local1187);
		this.SS.appendChild(_local1187);
		_local1187.addEventListener("click", _local1186, !1);
	}
	this.ps(null, 0);
}
StoragePanel.prototype = new UIComponent();
StoragePanel.N0 = [];
StoragePanel.yx = function (l) {
	StoragePanel.N0.push(l);
	l.VP();
};
StoragePanel.Ky = function () {
	var _local1189 = StoragePanel.N0;
	_local1189.pop();
	_local1189[_local1189.length - 1].VP();
};
StoragePanel.prototype.VP = function () {
	this.ps(null, this.GL);
};
StoragePanel.prototype.BM = function (l, d) {
	if (!l.ki && !this.agX) {
		var _local1191 = this.Dy ? 2 : 1;
		for (var _local1190 = _local1191; _local1190 < this.VS.length; _local1190++) this.SS.removeChild(this.VS[_local1190]);
		this.agX = !0;
		if (this.Dy) this.I_.BM(l, d);
	}
	if (this.Ny) this.Ny.BM(l, d);
};
StoragePanel.prototype.refresh = function () {
	if (this.Dy) this.I_.refresh();
	if (this.Ny) this.Ny.refresh();
};
StoragePanel.prototype.ps = function (l, d) {
	var _local1193 = this.VS,
		_local1194;
	if (d == null) d = _local1193.indexOf(l.currentTarget);
	this.GL = d;
	for (var _local1192 = 0; _local1192 < _local1193.length; _local1192++) s.removeClass(_local1193[_local1192], "active");
	s.addClass(_local1193[d], "active");
	if (this.Dy) d--;
	s.clearChildren(this.CM);
	if (d == -1) _local1194 = this.I_;else
	_local1194 = Storage.WU(d);
	this.Ny = _local1194;
	_local1194.parent = this;
	this.CM.appendChild(_local1194.e);
	this.resize(this.iJ, this.Tq);
	this.refresh();
};
StoragePanel.prototype.resize = function (l, d) {
	this.iJ = l;
	this.Tq = d;
	var _local1196 = l < 850,
		_local1199 = _local1196 ? 50 : 200,
		_local1198 = Storage.list;
	if (this.Dy) _local1198 = [
	["Home", null, "strg/home"]].
	concat(_local1198);
	for (var _local1195 = 0; _local1195 < _local1198.length; _local1195++) {
		var _local1197 = this.VS[_local1195],
			_local1200 = "padding: 8px " + (_local1196 ? 13 : 36) + "px; cursor:pointer;";
		_local1197.setAttribute("style", _local1200);
		_local1197.innerHTML = "<img style=\"margin:0 10px -6px 0; width:22px;\" class=\"gsicon\" src=\"" + PIMG[_local1198[_local1195][2]] + "\" /> " + (_local1196 ? "" : _local1198[_local1195][0]);
	}
	this.e.style.width = l + "px";
	this.e.style.height = d + "px";
	this.SS.style.width = _local1199 + "px";
	this.SS.style.paddingTop = "32px";
	if (this.Ny) this.Ny.resize(l - _local1199, d);
};
StoragePanel.IU = function () {
	var _local1210 = this.e = s.createElement("div");
	_local1210.style.background = "var(--bg-canvas)";
	var _local1208 = this.BC = s.createElement("div");
	_local1210.appendChild(_local1208);
	var _local1202 = s.createElement("style");
	_local1210.appendChild(_local1202);
	_local1202.textContent = `.bhover       { transition: background 0.2s ease-in-out;  background:rgba(255,255,255,0   );}
						 .bhover:hover { transition: background 0.2s ease-in-out;  background:rgba(255,255,255,0.05);}`;
	for (var _local1201 = 0; _local1201 < 2; _local1201++) {
		var _local1207 = s.createElement("div"),
			_local1202 = "filter: drop-shadow(4px 6px 4px rgba(0,0,0,0.25)); ";
		_local1208.appendChild(_local1207);
		if (_local1201 == 0) _local1202 += "padding: 12px 0px";
		if (_local1201 == 1) _local1202 += "position:absolute;  bottom:0;";
		_local1207.setAttribute("style", _local1202);
		var _local1206 = s.createElement("img");
		_local1207.appendChild(_local1206);
		_local1206.setAttribute("src", PIMG[_local1201 == 0 ? "logo" : "bottom"]);
		if (_local1201 == 0) this.hh = _local1206;else
		this.a1M = _local1206;
		if (_local1201 == 0) this.aoy = _local1207;else
		this.axa = _local1207;
	}
	this.VS = [];
	_local1202 = "display:inline-block;  font-size:1.25em; border:1px solid #aaa;  border-radius:6px;  margin:20px 0 0 20px;";
	var _local1205 = this.br.bind(this);
	for (var _local1201 = 0; _local1201 < 3; _local1201++) {
		var _local1211 = s.createElement("span", "bhover");
		this.VS.push(_local1211);
		_local1211.setAttribute("style", _local1202 + "cursor:pointer; padding:12px;");
		_local1211.addEventListener("click", _local1205, !1);
		_local1208.appendChild(_local1211);
	}
	s.appendBr(_local1208);
	s.appendBr(_local1208);
	var _local1211 = s.createElement("div");
	_local1211.setAttribute("style", _local1202 + "width:min(80%,556px);  padding:60px 0;  text-align:center; opacity:0.3;");
	_local1211.textContent = "Drop any files here";
	_local1208.appendChild(_local1211);
	this.T = s.createElement("canvas");
	this.T.setAttribute("style", "position:absolute;top:0;pointer-events:none; mix-blend-mode: screen;");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	this.ayM = PixelUtil.allocBytes(4);
	_local1210.appendChild(this.T);
	var _local1203 = new Date().getDate(),
		_local1212 = new Date().getMonth();
	if (_local1212 == 11 && _local1203 > 20 || _local1212 == 0 && _local1203 < 10) {
		var _local1209 = Math.random() < .5,
			_local1204 = {
				o: 255,
				J: 255,
				k: 255
			};
		if (!_local1209) {
			_local1204 = PixelUtil.hsbToRgb(Math.random(), Math.random() * .7, 1);
			_local1204.o *= 255;
			_local1204.J *= 255;
			_local1204.k *= 255;
		}
		this.ZX = [
		Math.round(1048575 * Math.random()), _local1209 ? .05 : .02, Math.round(4 + Math.random() * 8), 1, _local1209 ? 3 : 15, _local1204, 0, !0, _local1209, _local1209 ? 1 : .2, 3];
		this.atx = _local1209 ? .1 : .2;
		this.aB = this.io.bind(this);
		window.requestAnimationFrame(this.aB);
	}
};
StoragePanel.IU.prototype = new UIComponent();
StoragePanel.IU.prototype.io = function () {
	window.requestAnimationFrame(this.aB);
	if (!s.isInDocument(this.e)) return;
	var _local1217 = this.ayM,
		_local1216 = this.T,
		_local1213 = this.k_,
		_local1215 = _local1216.width,
		_local1214 = _local1216.height;
	this.ZX[6] = Date.now() * .001 * this.atx;
	PixelUtil.fd.Q6(_local1217, _local1215, _local1214, this.ZX, !0);
	_local1213.putImageData(new ImageData(new Uint8ClampedArray(_local1217.buffer), _local1215, _local1214), 0, 0);
};
StoragePanel.IU.prototype.br = function (l) {
	var _local1218 = this.VS.indexOf(l.currentTarget),
		_local1219 = new Action(ActionTypes.E.L, !0);
	if (_local1218 == 0) {
		_local1219.data = {
			a: ActionTypes.$.SN,
			GU: "newproject"
		};
	}
	if (_local1218 == 1) {
		_local1219.data = {
			a: ActionTypes.$.Um
		};
	}
	if (_local1218 == 2) {
		_local1219.data = {
			a: ActionTypes.$.SN,
			GU: "res0"
		};
	}
	this.dispatch(_local1219);
};
StoragePanel.IU.prototype.refresh = function () {
	var _local1224 = this.VS,
		_local1223 = [
		"\u2605 New Project",
		"\uD83E\uDC7F Open From Computer",
		"\u25A3 PSD Templates"];

	for (var _local1220 = 0; _local1220 < _local1224.length; _local1220++) _local1224[_local1220].textContent = _local1223[_local1220];
	// for (var A = 0; A < l.length; A++) l[A].textContent = G[A] + "\u2000" + languageManager.get(d[A]);
	var _local1222 = "logo",
		_local1221 = new Date();
	if (_local1221.getMonth() == 3 && _local1221.getDate() == 1) _local1222 = "logo_cucumber";
	this.hh.setAttribute("src", PIMG[_local1222]);
	this.a1M.setAttribute("src", PIMG["bottom"]);
};
StoragePanel.IU.prototype.resize = function (l, d) {
	var _local1225 = Math.min(d * 1.5, Math.min(l, 600));
	s.setCanvasSizeForDpr(this.T, l, _local1225 * .26);
	var _local1227 = this.T.width,
		_local1226 = this.T.height;
	this.ayM = PixelUtil.allocBytes(_local1227 * _local1226 * 4);
	this.e.style.width = l + "px";
	this.e.style.height = d + "px";
	this.axa.style.width = l + "px";
	this.BC.style.marginLeft = Math.max(0, Math.round((l + 200 - 600) / 2) - 200) + "px";
	this.hh.style.width = _local1225 + "px";
	this.a1M.style.width = _local1225 + "px";
};
StoragePanel.IU.prototype.BM = function (l, d) {
	if (!l.ki && this.VS[2].parent) this.BC.removeChild(this.VS[2]);
};



function Storage(l) {
	UIComponent.call(this);
	var _local1236 = this.e = s.createElement("div", "storage");
	s.addKeydownBlocker(_local1236);
	_local1236.addEventListener("drop", this.aft.bind(this), !1);
	var _local1229 = this.a1B = s.createElement("style");
	_local1236.appendChild(_local1229);
	_local1236.setAttribute("tabindex", "0");
	_local1236.style.outline = "none";
	_local1236.addEventListener("keydown", this.amL.bind(this), !1);
	this.Xx = this.acw.bind(this);
	this.BK = 0;
	var _local1235 = s.createElement("div");
	_local1236.appendChild(_local1235);
	var _local1234 = this.ad7.bind(this);
	this.NU = s.createElement("div", "bar");
	_local1235.appendChild(this.NU);
	this.ae = s.createElement("div", "fls scrollable");
	_local1235.appendChild(this.ae);
	this.Ox = s.createElement("div");
	_local1235.appendChild(this.Ox);
	this.Ox.setAttribute("style", "position:absolute; bottom:0;  background-color:white; padding: 2px 8px 0px 8px;");
	this.wf = s.createElement("div", "bar");
	this.wf.textContent = "Name: ";
	var _local1232 = this.KW = s.createElement("input");
	_local1232.setAttribute("type", "text");
	this.wf.appendChild(_local1232);
	var _local1238 = this.ej = s.createElement("div", "btn");
	_local1238.textContent = "Save";
	this.wf.appendChild(_local1238);
	s.addPointerUp(_local1238, _local1234);
	s.addPointerDown(this.ae, this.Xx);
	this.jH = 0;
	this.BH = l;
	var _local1230 = this.a7E.bind(this),
		_local1239 = this.agl = s.createElement("div");
	_local1239.setAttribute("style", "text-align:center; font-size:1.6em");
	var _local1237 = s.createElement("img");
	_local1239.appendChild(_local1237);
	s.appendBr(_local1239);
	_local1237.setAttribute("src", PIMG[Storage.list[this.BH][2]]);
	_local1237.setAttribute("style", "opacity:0.5;  width:25%; cursor:pointer;");
	s.addPointerUp(_local1237, _local1230);
	this.iM = s.createElement("div", "btn");
	_local1239.appendChild(this.iM);
	s.addPointerUp(this.iM, _local1230);
	// this.uc = new ContextPanel([{
	// 	name: [6, 20]
	// }, {
	// 	name: [5, 2],
	// 	C0: [KeyboardHandler.wz, KeyboardHandler.AR],
	// 	p: function () {
	// 		return {
	// 			p: Storage.af != null
	// 		};
	// 	}
	// }]);
	// this.uc.parent = this;
	// this.uc.addListener("select", this.arF, this);
	this.ae.addEventListener("contextmenu", this.Xx);
	this.a9Q = s.createElement("span");
	this.G3 = s.createElement("span");
	this.G3.setAttribute("style", "position:absolute; right:0; top:5px;");
	this.u9 = [];
	this.qg = [];
	for (var _local1228 = 0; _local1228 < 3; _local1228++) {
		var _local1231 = s.createElement("div", "btn");
		this.u9.push(_local1231);
		this.a9Q.appendChild(_local1231);
		s.addPointerUp(_local1231, _local1234);
		_local1231.textContent = ["\u2B9C", "\u2B9E", "\uD83E\uDC09"][_local1228];
	}
	for (var _local1228 = 0; _local1228 < 5; _local1228++) {
		var _local1231 = s.createElement("div", "btn");
		this.qg.push(_local1231);
		this.G3.appendChild(_local1231);
		s.addPointerUp(_local1231, _local1234);
	}
	window.addEventListener("message", this.aoo.bind(this), !1);
	this.aw2 = !1;
	this.qw = 0;
	setInterval(this.aa8.bind(this), 300);
	this.Eg();
	var _local1233 = this.aiZ = document.createElement("input");
	_local1233.setAttribute("type", "file");
	_local1233.addEventListener("change", this.aft.bind(this), !1);
	document.body.appendChild(_local1233);
	_local1233.setAttribute("style", "display:none");
	_local1233.setAttribute("multiple", "");
}
Storage.prototype = new UIComponent();
Storage.Vt = !1;
Storage.prototype.aft = function (l) {
	l.stopPropagation();
	l.preventDefault();
	var _local1243 = l.dataTransfer ? l.dataTransfer.files : l.target.files;
	this.abg = _local1243.length;
	for (var _local1240 = 0; _local1240 < _local1243.length; _local1240++) {
		var _local1241 = _local1243[_local1240],
			_local1242 = new FileReader();
		_local1242.Ul = _local1241;
		_local1242.onload = this.aai.bind(this);
		_local1242.readAsArrayBuffer(_local1241);
	}
};
Storage.prototype.aai = function (l) {
	var _local1244 = Storage.af;
	if (_local1244 == null) _local1244 = Storage.af = {};
	_local1244[l.target.Ul.name] = l.target.result;
	this.abg--;
	if (this.abg == 0) this.II();
};
Storage.prototype.BM = function (l, d) {
	var _local1245 = Storage.list[this.BH][3],
		_local1246 = premiumSession.getCurrentUserRecord();
	if (_local1245) {
		if (this.qw == 1 && s.isInDocument(this.e) && _local1246 != null) {
			this.Eg();
		}
		if (this.qw == 2 && _local1246 == null) {
			this.zM("forget", "");
		}
	}
};
Storage.prototype.aa8 = function () {
	var _local1248 = s.isInDocument(this.e),
		_local1247 = this.aw2;
	if (_local1248 && !_local1247) {
		history.pushState(null, null, location.href);
		window.onpopstate = function () {
			history.go(1);
		};
	}
	if (!_local1248 && _local1247) {
		window.onpopstate = function () {};
		history.go(-1);
	}
	this.aw2 = _local1248;
};
Storage.prototype.Eg = function () {
	if (this.Wh) document.body.removeChild(this.Wh);
	this.WI = [
	[]];

	this._U = 0;
	this.ase = {
		"/": []
	};
	this.ayP = "";
	this._t = null;
	this.$c = [];
	this.iX = [];
	this.adR = [];
	this.abW = null;
	var _local1250 = "code/storages/" + Storage.list[this.BH][1],
		_local1249 = this.Wh = s.createElement("iframe");
	_local1249.setAttribute("src", _local1250);
	_local1249.setAttribute("style", "display:none");
	document.body.appendChild(_local1249);
};
Storage.prototype.WY = function () {
	return this.ase[this.PM()];
};
Storage.prototype.Ph = function (l) {
	this.ase[this.PM()] = l;
};
Storage.WU = function (A) {
	var _local1251 = Storage.nE[A];
	if (_local1251 == null) _local1251 = Storage.nE[A] = new Storage(A);
	return _local1251;
};
Storage.nE = [];
Storage.WV = 0;
Storage.aiV = "";
Storage.dk = function (l, d) {
	Storage.WV = l;
	Storage.aiV = d;
	var _local1253 = Storage.nE;
	for (var _local1252 = 0; _local1252 < _local1253.length; _local1252++)
	if (_local1253[_local1252]) _local1253[_local1252].VP();
};
Storage.asH = [200 * (1 << 20), 2e3 * (1 << 20)];
Storage.HI = 0;
Storage.Yy = 2;
Storage.OI = 0;
Storage.list = [
["This Device", "deviceStorage.html", "strg/tdevice", !1, "Give Photopea a direct access to a specific folder in your device."],
["PeaDrive", "peadriveStorage.html", "strg/peadrive", !0, "A cloud storage system from Photopea."],
["Dropbox", "dropboxStorage.html", "strg/dropbox", !1, "Give Photopea a direct access to your DropBox."],
["OneDrive", "onedriveStorage.html", "strg/onedrive", !1, "Give Photopea a direct access to your OneDrive."],
["Google Drive", "googledriveStorage.html?mode=0", "strg/gdrive", !1, "Give Photopea a direct access to your Google Drive."],
["Shared Drives", "googledriveStorage.html?mode=1", "strg/gdrive", !1, "Give Photopea a direct access to Shared Drives in your Google Drive."],
["Private Folder", "googledriveStorage.html?mode=3", "strg/gdrive", !1, "Let's make a folder \"Photopea\" in your Google Drive (we will have access only to that folder)."]];

Storage.a8E = function (l) {
	for (var _local1254 = 0; _local1254 < Storage.nE.length; _local1254++) {
		if (Storage.nE[_local1254] && Storage.nE[_local1254].Wh.contentWindow == l) return !0;
	}
	return !1;
};
Storage.prototype.amL = function (l) {
	if (l.target.tagName == "INPUT") return;
	var _local1261 = KeyboardHandler;
	if (_local1261._Q(l.code, _local1261.HD) && this.PM().length != 0) this.asx();else
	if (l.ctrlKey) {
		if (_local1261._Q(l.code, _local1261.$)) {
			var _local1256 = [];
			this.Ph(_local1256);
			for (var _local1255 = 0; _local1255 < this._t.length; _local1255++) _local1256.push(_local1255);
			this.Jk();
		}
		if (_local1261._Q(l.code, _local1261.nA)) this.ao(2);
		if (_local1261._Q(l.code, _local1261.AR)) this.II();
	} else if (_local1261._Q(l.code, _local1261.lm)) {
		var _local1260 = this.WY();
		if (_local1260.length != 0) this.ak4(_local1260[0]);
	} else if (_local1261._Q(l.code, _local1261.kJ)) {
		this._U = Math.max(this._U - 1, 0);
		this.ke();
	} else {
		var _local1259 = 0;
		for (var _local1255 = 65; _local1255 <= 90; _local1255++)
		if (l.code == "Key" + String.fromCharCode(_local1255)) _local1259 = _local1255;
		if (_local1259 != 0) {
			var _local1258 = String.fromCharCode(_local1259).toLowerCase(),
				_local1263 = [],
				_local1257 = this._t,
				_local1264;
			for (var _local1255 = 0; _local1255 < _local1257.length; _local1255++)
			if (_local1257[_local1255][0][0].toLowerCase() == _local1258) _local1263.push(_local1255);
			if (_local1263.length == 0) return;
			var _local1260 = this.WY();
			if (_local1260.length == 0) _local1264 = _local1263[0];else
			{
				var _local1262 = _local1263.indexOf(_local1260[0]);
				if (_local1262 == -1) {
					_local1264 = _local1263[0];
					for (var _local1255 = 0; _local1255 < _local1263.length; _local1255++)
					if (_local1263[_local1255] > _local1260[0]) {
						_local1264 = _local1263[_local1255];
						break;
					}
				} else _local1264 = _local1263[(_local1262 + 1) % _local1263.length];
			}
			this.Ph([_local1264]);
			this.Jk(!0);
		}
	}
};
Storage.prototype.resize = function (l, d) {
	this.iJ = l;
	this.Tq = d;
	this.e.style.width = l + "px";
	this.e.style.height = d + "px";
	var _local1265 = l - 30,
		_local1266 = Math.floor(_local1265 / 230),
		_local1265 = Math.floor(_local1265 / _local1266) - 70;
	this.a1B.textContent = ".storage .tile .name {  width:" + _local1265 + "px;  }";
	this.KW.style.width = l - 140 + "px";
	this.ae.style.width = this.NU.style.width = l - 20 + "px";
	this.ae.style.height = d - 70 - (Storage.WV == 0 ? 0 : 45) + "px";
};
Storage.prototype.a7E = function () {
	this.ke();
};
Storage.prototype.ke = function () {
	this.zM("show", this.PM());
};
Storage.prototype.PM = function (l) {
	var _local1268 = this.WI[this._U],
		_local1267 = "/" + _local1268.join("/");
	if (l && _local1268.length != 0) _local1267 += "/";
	return _local1267;
};
Storage.prototype.ad7 = function (l) {
	var _local1275 = l.currentTarget,
		_local1270 = this._U,
		_local1274 = this.u9.indexOf(_local1275),
		_local1273 = this.qg.indexOf(_local1275);
	if (_local1274 >= 0 && !this.a19(_local1274)) return;
	if (_local1274 == 0) {
		this._U = Math.max(_local1270 - 1, 0);
		this.ke();
	}
	if (_local1274 == 1) {
		this._U = Math.min(_local1270 + 1, this.WI.length - 1);
		this.ke();
	}
	if (_local1274 == 2) {
		var _local1272 = this.WI[_local1270 + 1] = this.WI[_local1270].slice(0);
		_local1272.pop();
		this._U++;
		this.WI = this.WI.slice(0, this._U + 1);
		this.ke();
	}
	if (_local1273 == 0) {
		var _local1277 = document.createEvent("MouseEvents");
		_local1277.initMouseEvent("click", !0, !0, document.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
		this.aiZ.dispatchEvent(_local1277);
	}
	if (_local1273 == 1) {
		Storage.HI = (Storage.HI + 1) % 2;
		this.VP();
	}
	if (_local1273 == 2) {
		Storage.Yy = (Storage.Yy + 1) % 3;
		this.VP();
	}
	if (_local1273 == 3) {
		Storage.OI = (Storage.OI + 1) % 3;
		this.VP();
	}
	if (_local1273 == 4) {
		this.zM("forget", "");
	}
	if (_local1275 == this.ej) {
		var _local1271 = this.KW.value.trim(),
			_local1278 = this._t,
			_local1276 = -1;
		if (!_local1271.toLowerCase().endsWith("psd")) {
			alert("File Name has to end with \".psd\".");
			return;
		}
		for (var _local1269 = 0; _local1269 < _local1278.length; _local1269++)
		if (_local1278[_local1269][0] == _local1271) _local1276 = _local1269;
		if (_local1276 != -1) {
			this.XE("Do you really want to replace \"" + _local1271 + "\"?", this.alQ.bind(this));
		} else this.alQ();
	}
};

Storage.prototype.alQ = function () {
	var _local1280 = this.KW.value.trim(),
		_local1279 = [this.BH, this.PM(!0) + _local1280];
	this.G7({
		a: ActionTypes.$.asn,
		O2: _local1279
	});
	this.dispatch(new Action("canclose", !0));
};
Storage.prototype.II = function () {
	if (Storage.af == null) return;
	this.G7({
		a: ActionTypes.$.B8,
		wh: "Uploading ..."
	});
	this.BK = 4;
	hC.WU(2, this.Wh, [this.PM(), Storage.af, this._t], null, this.a75.bind(this));
};
Storage.prototype.a75 = function (l) {
	this.BK = 0;
	this.G7({
		a: ActionTypes.$.jn,
		wh: "Uploading ..."
	});
	this.ke();
};
Storage.prototype.arF = function (l) {
	var _local1288 = l.target.sz();
	if (l.target == this.uc) {
		if (_local1288[0] == 0) {
			var _local1282 = ["New Folder", -1, 0];
			this._t.push(_local1282);
			this.VP();
			var _local1281 = this._t.indexOf(_local1282),
				_local1287 = this.$c[_local1281].querySelector(".name");
			var _local1286 = new PanelTabBase.di(_local1287, function (R) {
				this.G7({
					a: ActionTypes.$.B8,
					wh: "Save ..."
				});
				var _local1292 = this.PM(!0) + R + "/";
				this.zM("save", _local1292);
			}.bind(this), !0);
		} else this.II();
	} else {
		if (_local1288[0] == 0) {
			this.ao(2);
		} else if (_local1288[0] == 1) {
			var _local1281 = this.WY()[0],
				_local1285 = this._t[_local1281],
				_local1287 = this.$c[_local1281].querySelector(".name");
			_local1287.innerHTML = _local1285[0];
			var _local1286 = new PanelTabBase.di(_local1287, function (R) {
				R = R.trim();
				var _local1294 = this._t;
				for (var _local1293 = 0; _local1293 < _local1294.length; _local1293++)
				if (_local1294[_local1293][0] == R) {
					alert("Item with such name already exists.");
					this.VP();
					return;
				}
				var _local1295 = this.PM(!0) + _local1285[0] + ":" + R;
				this.zM("rename", _local1295);
			}.bind(this));
		} else if (_local1288[0] == 2) {
			this.ao(3);
		} else if (_local1288[0] == 3) this.asx();else
		if (_local1288[0] == 4) {
			this.ao(1);
		} else {
			var _local1290 = this._t[this.WY()[0]],
				_local1283 = Storage.d6(_local1290),
				_local1291 = _local1283[_local1288[1]],
				_local1289 = _local1291[0],
				_local1284 = this.R$().pop()[1];
			if (Storage.av7(_local1290, _local1289) != -1) {
				this.zM("share", _local1284 + ":" + _local1289 + ":-1");
				alert("Unshared.");
			} else {
				this.zM("share", _local1284 + ":" + _local1289 + ":" + _local1288[2]);
				alert("Shared.");
			}
		}
	}
};
Storage.av7 = function (l, d) {
	var _local1296 = l[4];
	if (_local1296 == null) return -1;
	if (_local1296.indexOf(d + ":0") != -1) return 0;
	if (_local1296.indexOf(d + ":1") != -1) return 1;
	return -1;
};
Storage.prototype.asx = function () {
	var _local1297 = this.WY();
	this.XE("Do you really want to delete " + (_local1297.length == 1 ? "\"" + this._t[_local1297[0]][0] + "\"" : "these files") + "?", this.i8.bind(this));
};
Storage.prototype.XE = function (l, d) {
	var _local1298 = {
		a: ActionTypes.$.SN,
		GU: "confirm",
		Z: l,
		Fk: d
	};
	this.G7(_local1298);
};
Storage.prototype.ao = function (l) {
	this.BK = l;
	if (1 < l) this.G7({
		a: ActionTypes.$.B8,
		wh: "Downloading ..."
	});else
	this.G7({
		a: ActionTypes.$.B8,
		wh: "Getting info ..."
	});
	hC.WU(0, this.Wh, this.PM(), this.R$(!0), this.a0H.bind(this));
};
Storage.prototype.a0H = function (l) {
	if (this.BK == 1) {
		var _local1302 = 0,
			_local1299 = 0;
		for (var _local1301 in l) {
			var _local1300 = l[_local1301];
			_local1302 += _local1300[1];
			_local1299++;
		}
		this.XE(_local1299 + " files, " + SaveForWebDialog.fa(_local1302) + " in total.", function () {});
		this.G7({
			a: ActionTypes.$.jn,
			wh: "Getting info ..."
		});
		this.BK = 0;
	}
	if (1 < this.BK) hC.WU(1, this.Wh, l, null, this.aeE.bind(this));
};
Storage.prototype.aeE = function (l) {
	if (1 < this.BK) {
		if (1 < this.BK) this.G7({
			a: ActionTypes.$.jn,
			wh: "Downloading ..."
		});
		var _local1306 = {},
			_local1303 = this.PM(!0);
		for (var _local1305 in l) _local1306[_local1305.slice(_local1303.length)] = l[_local1305];
		if (this.BK == 2) {
			Storage.af = _local1306;
			alert("Copied to a clipboard");
		}
		if (this.BK == 3) {
			var _local1304 = Object.keys(l);
			if (_local1304.length == 1) ClipboardHandler.save(l[_local1304[0]].buffer, _local1304[0].split("/").pop());else
			ClipboardHandler.save(UZIP.encode(_local1306), _local1303 == "/" ? "files.zip" : this.PM().split("/").pop() + ".zip");
		}
	}
	this.BK = 0;
};
Storage.af = null;
Storage.prototype.i8 = function () {
	this.G7({
		a: ActionTypes.$.B8,
		wh: "Delete ..."
	});
	this.iX = this.R$();
	this.Jw();
};
Storage.prototype.Jw = function () {
	if (this.iX.length == 0) {
		this.G7({
			a: ActionTypes.$.jn,
			wh: "Delete[5, 4] ..."
		});
		this.Ph([]);
		this.ke();
	} else this.zM("delete", this.iX.pop()[1]);
};
Storage.prototype.R$ = function (l) {
	var _local1311 = [],
		_local1308 = this.PM(!0),
		_local1310 = this.WY();
	for (var _local1307 = 0; _local1307 < _local1310.length; _local1307++) {
		var _local1309 = this._t[_local1310[_local1307]];
		if (l) _local1311.push(_local1309[0]);else
		_local1311.push([this.BH, _local1308 + _local1309[0]]);
	}
	return _local1311;
};
Storage.prototype.zM = function (l, d) {
	s.addClass(this.e, "disabled");
	this.ayP = l;
	if (Storage.Vt) console.log(Math.floor(Date.now() / 1e3), "{\"code\": \"" + l + "\", \"prm\": " + JSON.stringify(d) + "  }");
	this.Wh.contentWindow.postMessage("{\"code\": \"" + l + "\", \"prm\": " + JSON.stringify(d) + "  }", "*");
};
Storage.prototype.aoo = function (l) {
	if (l.source != this.Wh.contentWindow || this.BK != 0) return;
	s.removeClass(this.e, "disabled");
	if (typeof l.data == "string") {
		if (Storage.Vt) console.log("==", Math.floor(Date.now() / 1e3), l.data);
		var _local1321 = JSON.parse(l.data),
			_local1313 = _local1321.code,
			_local1320 = _local1321.prm,
			_local1319 = this.ayP,
			_local1317 = Storage.list[this.BH][3];
		if (_local1313 == "ready") {
			if (_local1317 && !_local1320) {
				var _local1325 = premiumSession.getCurrentUserRecord();
				var _local1314 = premiumSession.$O(),
					_local1326 = _local1314.acc;
				if (_local1325 == null) {
					this.qw = 1;
					alert("Log in to use this storage (press Account at the top).");
					this.sp();
					return;
				}
				var _local1322 = [],
					_local1316 = _local1325.wantToJoin;
				for (var _local1318 in _local1316) _local1322.push(parseInt(_local1318.slice(1)));
				var _local1315 = [],
					_local1323 = _local1325.inTeams;
				for (var _local1312 = 0; _local1312 < _local1323.length; _local1312++) _local1315.push(_local1323[_local1312][2]);
				var _local1324 = {
					uid: _local1325.id,
					limit: Storage.asH[premiumSession.hasActiveEntitlement() ? 1 : 0],
					inTeams: _local1315,
					myTeams: _local1322
				};
				_local1324.secret = _local1326 && _local1326.pds ? _local1326.pds : "";
				this.zM("login", _local1324);
				return;
			}
			if (_local1317) this.qw = 2;
			if (_local1317 && _local1321.secret) {
				var _local1314 = premiumSession.$O(),
					_local1326 = _local1314.acc;
				if (_local1326 == null) _local1326 = _local1314.acc = {};
				_local1326.pds = _local1321.secret;
				premiumSession.saveRecordLocally(_local1314);
			}
			if (_local1320) this.ke();else
			this.sp();
		} else if (_local1313 != "0") {
			if (_local1319 == "save") this.G7({
				a: ActionTypes.$.jn,
				wh: "Save ..."
			});
			if (_local1319 == "delete") this.Jw();
			alert(_local1320);
			this.VP();
		} else if (_local1319 == "show") {
			this._t = _local1320;
			this.VP();
		} else if (_local1319 == "save") {
			this.G7({
				a: ActionTypes.$.jn,
				wh: "Save ..."
			});
			this.ke();
		} else if (_local1319 == "delete") {
			this.Jw();
		} else if (_local1319 == "forget") {
			if (_local1317) this.sp();else
			this.Eg();
		} else if (_local1319 == "rename" || _local1319 == "share") {
			this.ke();
		} else throw _local1313;
	} else {
		if (Storage.Vt) console.log(Math.floor(Date.now() / 1e3, "==", "ArrayBuffer[]"));
		this.G7({
			a: ActionTypes.$.ajq,
			O2: this.R$()[0],
			XO: l.data
		});
		this.G7({
			a: ActionTypes.$.jn,
			wh: "Opening ..."
		});
	}
};
Storage.prototype.sp = function () {
	s.clearChildren(this.NU);
	s.clearChildren(this.ae);
	s.clearChildren(this.Ox);
	this.ae.appendChild(this.agl);
};
Storage.prototype.a19 = function (A) {
	if (A == 0) return this._U > 0;
	if (A == 1) return this._U < this.WI.length - 1;
	if (A == 2) return this.PM() != "/";
};
Storage.prototype.VP = function () {
	var _local1350 = Storage.list[this.BH][3],
		_local1345 = this._t,
		_local1331 = Storage.Yy,
		_local1344 = Storage.HI,
		_local1339 = Storage.OI;
	if (_local1345 == null) return;
	_local1345.sort(function (p, c) {
		var _local1358 = p[1] == -1 ? 1 : 5,
			_local1357 = c[1] == -1 ? 1 : 5,
			_local1359 = 0;
		if (Math.min(_local1358, _local1357) == 1 && _local1358 != _local1357) return _local1358 - _local1357;else
		if (_local1358 == 1 || _local1331 == 0) _local1359 = p[0].toLowerCase() < c[0].toLowerCase() ? -1 : 1;else
		if (_local1331 == 1) _local1359 = p[1] - c[1];else
		if (_local1331 == 2) _local1359 = p[2] - c[2];
		if (_local1344 == 1) _local1359 = -_local1359;
		if (p[0] == "Shared") _local1359 = -1;
		if (c[0] == "Shared") _local1359 = 1;
		return _local1359;
	});
	var _local1336 = this.ae,
		_local1355 = this.NU,
		_local1333 = this.WI[this._U];
	s.clearChildren(_local1336);
	s.clearChildren(_local1355);
	this.$c = [];
	for (var _local1327 = 0; _local1327 < 3; _local1327++)
	if (this.a19(_local1327)) s.removeClass(this.u9[_local1327], "disabled");else
	s.addClass(this.u9[_local1327], "disabled");
	_local1355.appendChild(this.a9Q);
	_local1355.appendChild(this.G3);
	var _local1356 = s.createElement("span");
	_local1356.textContent = "/";
	_local1355.appendChild(_local1356);
	for (var _local1327 = 0; _local1327 < _local1333.length; _local1327++) {
		var _local1356 = s.createElement("span");
		_local1356.textContent = _local1333[_local1327];
		_local1355.appendChild(_local1356);
		var _local1356 = s.createElement("span");
		_local1356.textContent = "/";
		_local1355.appendChild(_local1356);
	}
	var _local1346 = ["tile", "icon", "litm"][_local1339];
	for (var _local1327 = 0; _local1327 < _local1345.length; _local1327++) {
		var _local1335 = _local1345[_local1327],
			_local1337 = _local1335[1] == -1,
			_local1334 = _local1337 ? "" : SaveForWebDialog.fa(_local1335[1]),
			_local1352 = s.createElement("div", "cont " + _local1346),
			_local1332 = !1;
		_local1336.appendChild(_local1352);
		this.$c.push(_local1352);
		_local1352.setAttribute("title", _local1335[0] + (_local1337 ? "" : "\nSize: " + _local1334 + "\nDate Modified: " + new Date(_local1335[2] * 1e3).toLocaleString().replaceAll(". ", ".")));
		var _local1354 = s.createElement("img");
		_local1354.setAttribute("src", _local1337 ? Storage.aeh : _local1335[3] ? _local1335[3] : Storage.Ul);
		if (!_local1337 && _local1335[3]) _local1354.setAttribute("style", "box-shadow: 1px 1px 2.5px rgba(0,0,0, .4);");
		var _local1338 = s.createElement("span", "name"),
			_local1348 = _local1335[0];
		if (_local1346 == "icon" && _local1348.length > 30) _local1348 = _local1348.slice(0, 24) + ".." + _local1348.slice(_local1348.length - 5);
		if (_local1350 && _local1333.length == 1 && _local1333[0] == "Shared") {
			var _local1347 = Storage.d6(),
				_local1341 = parseInt(_local1348.slice(5));
			for (var _local1349 = 0; _local1349 < _local1347.length; _local1349++)
			if (_local1347[_local1349][0] == _local1341) _local1348 = _local1347[_local1349][1];
		}
		_local1338.textContent = _local1348;
		_local1352.appendChild(_local1354);
		_local1352.appendChild(_local1338);
		if (_local1346 != "icon" && !_local1337) {
			if (_local1346 == "tile") s.appendBr(_local1338);
			var _local1330 = s.createElement("span");
			_local1330.textContent = _local1334;
			_local1330.style.opacity = "0.8";
			(_local1346 == "tile" ? _local1338 : _local1352).appendChild(_local1330);
		}
		var _local1329 = _local1335[0].split("."),
			_local1353 = (_local1329.length == 1 ? "" : _local1329.pop()).toUpperCase();
		if (_local1350 && _local1335[0] == "Shared" && _local1333.length == 0) {
			_local1332 = !0;
			_local1353 = "\u21E7";
		}
		if (_local1346 != "litm" && (!_local1337 && _local1335[3] == null || _local1332)) {
			var _local1340 = s.createElement("span", "ext");
			_local1340.textContent = _local1353;
			var _local1342 = Storage.K6[_local1353];
			_local1340.style.backgroundColor = _local1342 ? _local1342 : Storage.awW(_local1353);
			_local1352.appendChild(_local1340);
		}
		s.addPointerDown(_local1352, this.Xx);
		_local1352.addEventListener("contextmenu", this.Xx);
	}
	this.Jk();
	var _local1328 = this.wf.parentNode != null,
		_local1343 = Storage.WV,
		_local1351 = this.e;
	if (_local1328 && _local1343 == 0) _local1351.removeChild(this.wf);
	if (!_local1328 && _local1343 == 1) _local1351.appendChild(this.wf);
	this.resize(this.iJ, this.Tq);
	this.refresh();
};
Storage.prototype.Jk = function (l) {
	var _local1366 = this.$c,
		_local1361 = this._t,
		_local1365 = this.WY(),
		_local1364 = !1,
		_local1363 = 0;
	for (var _local1360 = 0; _local1360 < _local1366.length; _local1360++) {
		var _local1368 = _local1361[_local1360],
			_local1362 = _local1368[1] == -1,
			_local1369 = _local1366[_local1360];
		if (Storage.WV == 1 && !_local1362 && !_local1368[0].toLowerCase().endsWith(".psd")) _local1369.style.display = "none";else
		_local1369.style.display = "auto";
		if (_local1365.indexOf(_local1360) == -1) s.removeClass(_local1369, "active");else
		{
			if (_local1362) _local1364 = !0;else
			_local1363 += _local1368[1];
			s.addClass(_local1369, "active");
			if (l) _local1369.scrollIntoView({
				block: "center",
				behavior: "smooth"
			});
		}
	}
	var _local1367 = _local1364 ? "" : SaveForWebDialog.fa(_local1363);
	this.Ox.textContent = _local1365.length == 0 ? "" : _local1365.length + " item" + (_local1365.length == 1 ? "" : "s") + " selected\u2001" + _local1367;
	this.KW.value = _local1365.length == 1 && !_local1364 ? _local1361[_local1365[0]][0] : Storage.aiV;
};
Storage.prototype.ak4 = function (A) {
	var _local1372 = this._t[A];
	if (_local1372[1] == -1) {
		var _local1371 = this.WI[this._U].slice(0);
		_local1371.push(_local1372[0]);
		this._U++;
		this.WI[this._U] = _local1371;
		this.WI = this.WI.slice(0, this._U + 1);
		this.Ph([]);
		this.ke();
	} else if (Storage.WV == 0) {
		this.G7({
			a: ActionTypes.$.B8,
			wh: "Opening ..."
		});
		this.dispatch(new Action("canclose", !0));
		var _local1370 = this.PM(!0) + _local1372[0];
		this.zM("load", _local1370);
	}
};
Storage.prototype.refresh = function () {
	var _local1375 = Storage.Yy,
		_local1374 = Storage.HI,
		_local1373 = Storage.OI;
	this.qg[0].textContent = "Upload";
	this.qg[1].textContent = ["\uD83E\uDC0B", "\uD83E\uDC09"][_local1374];
	this.qg[2].textContent = languageManager.get([
	[12, 48],
	[12, 14, 0], "Date"][
	_local1375]);
	this.qg[3].textContent = languageManager.get(["Tiles", "Icons", [25, 3, 1]][_local1373]);
	this.qg[4].textContent = "\u2716";
	this.iM.innerHTML = languageManager.get([
	[23, 6], Storage.list[this.BH][0]]
	) + "<br/><small><small>" + Storage.list[this.BH][4] + "</small></small>";
	this.BM();
};
Storage.prototype.acw = function (l) {
	this.G7({
		a: ActionTypes.$.xt
	});
	if (s.isInDocument(this.agl)) return;
	if (l.button == 3 || l.button == 4) {
		if (Date.now() - this.aui > 50) {
			var _local1385 = this._U;
			if (l.button == 3) this._U = Math.max(_local1385 - 1, 0);else
			this._U = Math.min(_local1385 + 1, this.WI.length - 1);
			this.ke();
		}
		this.aui = Date.now();
		return;
	}
	l.stopPropagation();
	var _local1376 = this.$c.indexOf(l.currentTarget);
	if (l.type == "contextmenu") {
		if (this._t == null) return;
		l.preventDefault();
		var _local1377 = this.uc;
		if (_local1376 != -1) {
			var _local1384 = [{
				name: [5, 1],
				C0: [KeyboardHandler.wz, KeyboardHandler.nA]
			}, {
				name: [6, 37]
			}, {
				name: "Download",
				xX: !0
			}, {
				name: [5, 4],
				C0: [KeyboardHandler.HD]
			}, {
				name: "Properties"
			}];
			if (Storage.list[this.BH][3]) {
				var _local1383 = this._t[_local1376],
					_local1381 = Storage.d6(_local1383);
				if (_local1381.length != 0) {
					var _local1389 = [];
					for (var _local1378 = 0; _local1378 < _local1381.length; _local1378++) {
						var _local1390 = [],
							_local1386 = _local1381[_local1378],
							_local1380 = Storage.av7(_local1383, _local1386[0]);
						if (_local1380 != -1) _local1390.push({
							name: "Unshare"
						});else
						_local1390.push({
							name: "Allow Read"
						}, {
							name: "Allow Read & Write"
						});
						_local1389.push({
							name: _local1386[1] + ["", " (R)", " (R,W)"][_local1380 + 1],
							sub: _local1390
						});
					}
					_local1384.push({
						name: "Share With",
						sub: _local1389
					});
				}
			}
			// _local1377 = new ContextPanel(_local1384);
			// _local1377.parent = this;
			// _local1377.addListener("select", this.arF, this);
		}
		// _local1377.parent = this;
		// _local1377.refresh();
		// _local1377.update();
		this.G7({
			a: ActionTypes.$.dY,
			A3: _local1377,
			x: l.clientX + 4,
			y: l.clientY
		});
		return;
	}
	var _local1382 = this.WY(),
		_local1379 = _local1382.indexOf(_local1376);
	if (l.button != 0 && _local1379 != -1) return;
	if (l.target == this.ae) this.Ph([]);else
	{
		if (l.ctrlKey) {
			if (_local1379 == -1) _local1382.push(_local1376);else
			_local1382.splice(_local1379, 1);
		} else if (l.shiftKey && _local1382.length != 0) {
			var _local1378 = _local1382[0];
			if (_local1378 < _local1376) {
				var _local1387 = _local1376;
				_local1376 = _local1378;
				_local1378 = _local1387;
			}
			_local1382 = [];
			this.Ph(_local1382);
			for (var _local1388 = _local1376; _local1388 <= _local1378; _local1388++) _local1382.push(_local1388);
		} else {
			this.Ph([_local1376]);
			if (Date.now() - this.jH < 300 && _local1382.length != 0 && _local1382[0] == _local1376) {
				this.ak4(_local1376);
				this.jH = 0;
			}
		}
	}
	this.jH = Date.now();
	this.Jk();
};
Storage.prototype.G7 = function (l) {
	var _local1391 = new Action(ActionTypes.E.L, !0);
	_local1391.data = l;
	this.dispatch(_local1391);
};
Storage.d6 = function (l) {
	var _local1397 = [],
		_local1393 = [],
		_local1396 = premiumSession.$O(),
		_local1395 = _local1396.acc.tstart;
	if (_local1395)
	for (var _local1392 = 0; _local1392 < _local1395.length; _local1392++) {
		_local1397.push([_local1395[_local1392][2], _local1395[_local1392][0]]);
		_local1393.push(_local1395[_local1392][2]);
	}
	var _local1394 = premiumSession.getCurrentUserRecord();
	_local1395 = _local1394.inTeams;
	if (_local1395)
	for (var _local1392 = 0; _local1392 < _local1395.length; _local1392++) {
		_local1397.push([_local1395[_local1392][2], _local1395[_local1392][0]]);
		_local1393.push(_local1395[_local1392][2]);
	}
	if (l && l[4]) {
		for (var _local1392 = 0; _local1392 < l[4].length; _local1392++) {
			var _local1398 = parseInt(l[4][_local1392].split(":")[0]);
			if (_local1393.indexOf(_local1398) == -1) _local1397.push([_local1398, "Team " + _local1398]);
		}
	}
	return _local1397;
};
Storage.prototype.akx = function (l, d) {
	this.G7({
		a: ActionTypes.$.B8,
		wh: "Save ..."
	});
	this.zM("save", l);
	if (Storage.Vt) console.log(Math.floor(Date.now() / 1e3), "ArrayBuffer[]");
	this.Wh.contentWindow.postMessage(d, "*");
};
Storage.K6 = {
	PDF: "#ff2222",
	PSD: "#005599",
	PSB: "#005599"
};
Storage.awW = function (l) {
	l = l.toLowerCase();
	var _local1400 = 0;
	for (var _local1399 = 0; _local1399 < l.length; _local1399++) _local1400 += l.charCodeAt(_local1399) * 613 << 8 * _local1399;
	return "#" + PixelUtil.intToHex6(_local1400 & 16777215);
};
Storage.aeh = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIGJhc2VQcm9maWxlPSJ0aW55LXBzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODggNDEwIiB3aWR0aD0iNDg4IiBoZWlnaHQ9IjQxMCI+PHRpdGxlPmZvbGRlci1zdmc8L3RpdGxlPjxzdHlsZT50c3BhbiB7IHdoaXRlLXNwYWNlOnByZSB9LnNocDAgeyBmaWxsOiAjZGJiMDY1IH0gLnNocDEgeyBmaWxsOiAjOTY3YTQ0IH0gLnNocDIgeyBmaWxsOiAjZjVjZTg1IH0gPC9zdHlsZT48cGF0aCBjbGFzcz0ic2hwMCIgZD0iTTcuMiA0MDMuNEw3LjIgNi42TDEzOC45NSA2LjZMMTc3LjM1IDQ1TDQ4MC44IDQ1TDQ4MC44IDQwMy40TDcuMiA0MDMuNFoiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0ic2hwMSIgZD0iTTE0MS42IDAuMkwxODAgMzguNkw0ODcuMiAzOC42TDQ4Ny4yIDQwOS44TDAuOCA0MDkuOEwwLjggMC4yTDE0MS42IDAuMlpNMTMuNiAxM0wxMy42IDM5N0w0NzQuNCAzOTdMNDc0LjQgNTEuNEwxNzQuNyA1MS40TDEzNi4zIDEzTDEzLjYgMTNaIiAvPjxnID48cGF0aCBjbGFzcz0ic2hwMiIgZD0iTTcuMiA0MDMuNEw3LjIgNzAuNkwxNDMuNTMgNzAuNkwxODEuOTMgNDVMNDgwLjggNDVMNDgwLjggNDAzLjRMNy4yIDQwMy40WiIgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsYXNzPSJzaHAxIiBkPSJNNDg3LjIgMzguNkw0ODcuMiA0MDkuOEwwLjggNDA5LjhMMC44IDY0LjJMMTQxLjYgNjQuMkwxODAgMzguNkw0ODcuMiAzOC42Wk0xODMuODggNTEuNEwxNDUuNDggNzdMMTMuNiA3N0wxMy42IDM5N0w0NzQuNCAzOTdMNDc0LjQgNTEuNEwxODMuODggNTEuNFoiIC8+PC9nPjwvc3ZnPg==";
Storage.Ul = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIGJhc2VQcm9maWxlPSJ0aW55LXBzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNDggNDI0IiB3aWR0aD0iMzQ4IiBoZWlnaHQ9IjQyNCI+PHRpdGxlPmZpbGUtc3ZnPC90aXRsZT48c3R5bGU+dHNwYW4geyB3aGl0ZS1zcGFjZTpwcmUgfS5zaHAwIHsgZmlsbDogI2ZmZmZmZiB9IC5zaHAxIHsgZmlsbDogI2M3ZDdlMiB9IC5zaHAyIHsgZmlsbDogIzQ1NGI1NCB9IDwvc3R5bGU+PHBhdGggY2xhc3M9InNocDAiIGQ9Ik0yOTYgNDEyTDUyIDQxMkMzMCA0MTIgMTIgMzk0IDEyIDM3MkwxMiA1MkMxMiAzMCAzMCAxMiA1MiAxMkwyOTYgMTJDMzE4IDEyIDMzNiAzMCAzMzYgNTJMMzM2IDM3MkMzMzYgMzk0IDMxOCA0MTIgMjk2IDQxMloiIC8+PHBhdGggY2xhc3M9InNocDEiIGQ9Ik01MiA1MkwyOTYgNTJMMjk2IDExMkw1MiAxMTJMNTIgNTJaTTI3MiAxOTJMNjggMTkyQzYxLjIgMTkyIDU2IDE4Ni44IDU2IDE4MEM1NiAxNzMuMiA2MS4yIDE2OCA2OCAxNjhMMjcyIDE2OEMyNzguOCAxNjggMjg0IDE3My4yIDI4NCAxODBDMjg0IDE4Ni44IDI3OC44IDE5MiAyNzIgMTkyWk0yNzIgMjUyTDY4IDI1MkM2MS4yIDI1MiA1NiAyNDYuOCA1NiAyNDBDNTYgMjMzLjIgNjEuMiAyMjggNjggMjI4TDI3MiAyMjhDMjc4LjggMjI4IDI4NCAyMzMuMiAyODQgMjQwQzI4NCAyNDYuOCAyNzguOCAyNTIgMjcyIDI1MlpNMTc0IDMxMkw2OCAzMTJDNjEuMiAzMTIgNTYgMzA2LjggNTYgMzAwQzU2IDI5My4yIDYxLjIgMjg4IDY4IDI4OEwxNzQgMjg4QzE4MC44IDI4OCAxODYgMjkzLjIgMTg2IDMwMEMxODYgMzA2LjggMTgwLjggMzEyIDE3NCAzMTJaIiAvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xhc3M9InNocDIiIGQ9Ik0yOTYgNDI0TDUyIDQyNEMyMy4yIDQyNCAwIDQwMC44IDAgMzcyTDAgNTJDMCAyMy4yIDIzLjIgMCA1MiAwTDI5NiAwQzMyNC44IDAgMzQ4IDIzLjIgMzQ4IDUyTDM0OCAzNzJDMzQ4IDQwMC44IDMyNC44IDQyNCAyOTYgNDI0Wk01MiAyNEMzNi40IDI0IDI0IDM2LjQgMjQgNTJMMjQgMzcyQzI0IDM4Ny42IDM2LjQgNDAwIDUyIDQwMEwyOTYgNDAwQzMxMS42IDQwMCAzMjQgMzg3LjYgMzI0IDM3MkwzMjQgNTJDMzI0IDM2LjQgMzExLjYgMjQgMjk2IDI0TDUyIDI0WiIgLz48L3N2Zz4=";



function WorkspacePanelContainer(l) {
	PanelContainer.call(this, l);
	this.iJ = 0;
	this.Tq = 0;
	s.addPointerUp(this.lH, this.acV.bind(this));
	this.R9 = 0;
	this.alN = this.afu.bind(this);
	this.A5(this.jo);
	this.qq = ["default;"];
	this.HX = new s.CursorPreview(this.jo);
	this.od = new StoragePanel(!0);
	this.od.parent = this;
	this.Ix = this.od.e;
	StoragePanel.yx(this.od)
}
WorkspacePanelContainer.prototype = new PanelContainer;
WorkspacePanelContainer.prototype.acV = function(l) {
	if (l.target != this.lH) return;
	var d = this.R9;
	this.R9 = Date.now();
	if (Date.now() - d > 300) return;
	var G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.SN,
		GU: "newproject"
	};
	this.dispatch(G)
};
WorkspacePanelContainer.prototype.uH = function(l, d) {
	if (d) this.qq.push(l);
	else {
		var G = this.qq.length - 1;
		if (this.qq[G] == l) return;
		this.qq[G] = l
	}
	this.LN()
};
WorkspacePanelContainer.prototype.a0x = function() {
	this.qq.pop();
	this.LN()
};
WorkspacePanelContainer.prototype.LN = function() {
	var l = this.qq[this.qq.length - 1];
	this.HX.setSource(l, this.tn)
};
WorkspacePanelContainer.prototype.BM = function(l, d) {
	PanelContainer.prototype.BM.call(this, l, d);
	this.od.BM(l, d);
	if (!l.ki) {}
};
WorkspacePanelContainer.prototype.refresh = function() {
	PanelContainer.prototype.refresh.call(this);
	this.od.refresh()
};
WorkspacePanelContainer.prototype.Yw = function(l, d) {
	for (var A = 0; A < d.length; A++) {
		var G = d[A];
		this.k3[A].Pl(G.name + (G.hasUnsavedChanges() ? " *" : ""))
	}
	PanelContainer.prototype.Yw.call(this, l, d)
};
WorkspacePanelContainer.prototype.XQ = function() {
	return this.Ix
};
WorkspacePanelContainer.prototype.resize = function(l, d) {
	if (this.k3.length == 0) d += PanelContainer.DV - 1;
	this.iJ = l;
	this.Tq = d;
	d = PanelContainer.prototype.resize.call(this, l, d);
	this.tn = "height:" + d + "px; width:" + l + "px; overflow:hidden; position:relative;";
	this.LN();
	this.od.resize(l, d)
};
WorkspacePanelContainer.prototype.$J = function(l) {
	PanelContainer.prototype.$J.call(this, l);        
	l.PT.addEventListener("click", this.alN, !1)
};
WorkspacePanelContainer.prototype.cd = function(A) {
	var l = this.k3[A];
	s.removePointerUp(l.PT, this.alN);
	PanelContainer.prototype.cd.call(this, A)
};
WorkspacePanelContainer.prototype.afu = function(l) {
	var d = this.R9;
	this.R9 = Date.now();
	if (Date.now() - d > 300) return;
	var G = this.abm(l.currentTarget),
		b = this.k3[G].Kv.name,
		V = new Action(ActionTypes.E.L, !0),
		Q = {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.w0
			}
		};
	V.data = {
		a: ActionTypes.$.SN,
		GU: "namewindow",
		mS: b.slice(0, b.length - 4),
		P7: Q
	};
	this.dispatch(V)
};


var BrushPanel = function () {
	function _local3435() {
		PanelTabBase.call(this, "Brush", !1, "---panels/brush", PanelTabBase.xA.CV);
		this.Q_ = null;
		this.mN = null;
	}
	_local3435.prototype = new PanelTabBase("");
	_local3435.prototype.Eg = function () {
		var _local3439 = s.createElement("div", "");
		this.DK.appendChild(_local3439);
		this.ms = s.createElement("div", "bordered cell");
		this.ms.setAttribute("style", "width:10em; height:28.5em;");
		_local3439.appendChild(this.ms);
		this.k3 = [];
		this.Ob = null;
		this.DB = [];
		var _local3438 = this.ahl.bind(this);
		this.J_ = [
		new _local3432("basic"),
		new _local3432("useTipDynamics"),
		new _local3432("useScatter"),
		new _local3432("useColorDynamics"),
		new _local3432("usePaintDynamics")];

		for (var _local3436 = 0; _local3436 < this.J_.length; _local3436++) {
			var _local3441 = s.createElement("div", "listitem"),
				_local3437 = this.J_[_local3436],
				_local3440 = null;
			_local3437.parent = this;
			_local3437.addListener("brushchange", this.ako, this);
			var _local3442 = _local3437.tZ;
			if (_local3436 == 0) {
				this.Ob = new LabelItem(_local3442);
				_local3441.appendChild(this.Ob.e);
			} else {
				_local3440 = new CheckboxControl(_local3442, !1);
				_local3440.addListener(ActionTypes.E.A, this.an$, this);
				_local3441.appendChild(_local3440.e);
			}
			this.DB.push(_local3440);
			this.ms.appendChild(_local3441);
			this.k3.push(_local3441);
			_local3441.addEventListener("click", _local3438, !1);
		}
		this.DM = s.createElement("div", "cell padded");
		_local3439.appendChild(this.DM);
		this.setItem(0);
		this.T = s.createElement("canvas");
		this.T.height = 10;
		_local3439.appendChild(this.T);
		this.k_ = this.T.getContext("2d", { willReadFrequently: true });
		this.LO();
	};
	_local3435.prototype.resize = function (V, Q) {
		if (this.iJ == V) return;
		this.iJ = V;
		this.Tq = Q;
		this.LO();
	};
	_local3435.prototype.KN = function () {
		if (!s.isInDocument(this.DK)) return;
		if (this.ms) {
			this.LO();
			return;
		}
		this.Eg();
		this.refresh();
		this.BM(this.mN, PsdResourceTypes.Wx);
	};
	_local3435.prototype.refresh = function () {
		PanelTabBase.prototype.refresh.call(this);
		if (this.ms == null) return;
		this.Ob.refresh();
		for (var _local3443 = 1; _local3443 < this.DB.length; _local3443++) this.DB[_local3443].refresh();
		for (var _local3443 = 0; _local3443 < this.J_.length; _local3443++) this.J_[_local3443].refresh();
	};
	_local3435.prototype.ako = function (V) {
		var _local3445 = this.J_.indexOf(V.currentTarget),
			_local3446 = JSON.parse(JSON.stringify(this.J_[_local3445].Q_)),
			_local3444 = new Action(ActionTypes.E.L, !0);
		_local3444.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.Sq,
			Q_: _local3446
		};
		this.dispatch(_local3444);
	};
	_local3435.prototype.an$ = function (V) {
		this.am1(this.DB.indexOf(V.currentTarget), V.currentTarget.dB());
	};
	_local3435.prototype.ahl = function (V) {
		var _local3447 = this.k3.indexOf(V.currentTarget);
		if (V.target.tagName.toLowerCase() == "input") return;
		if (this.DB[_local3447] && !this.DB[_local3447].dB()) {
			this.DB[_local3447].Nu();
			this.am1(_local3447, !0);
		}
		this.setItem(_local3447);
	};
	_local3435.prototype.am1 = function (V, Q) {
		this.J_[V].aj$(Q);
	};
	_local3435.prototype.setItem = function (V) {
		for (var _local3448 = 0; _local3448 < this.J_.length; _local3448++) this.k3[_local3448].className = "listitem";
		if (this.DM.firstChild) this.DM.removeChild(this.DM.firstChild);
		this.k3[V].className = "listitem selected";
		this.DM.appendChild(this.J_[V].e);
	};
	_local3435.prototype.BM = function (V, Q) {
		this.mN = V;
		if (this.ms == null) return;
		for (var _local3449 = 0; _local3449 < this.J_.length; _local3449++) this.J_[_local3449].BM(V, Q);
		if (Q == PsdResourceTypes.Sq || Q == PsdResourceTypes.Wx) {
			this.Q_ = V.pO.Em;
			this.LO();
		}
		if (Q == PsdResourceTypes.K5) this.LO();
	};
	_local3435.prototype.LO = function () {
		if (this.Q_) this.enable();else
		{
			this.disable();
			return;
		}
		if (!s.isInDocument(this.DK)) return;
		var _local3455 = this.mN;
		for (var _local3450 = 0; _local3450 < this.J_.length; _local3450++) {
			this.J_[_local3450].c(this.Q_);
			if (this.DB[_local3450]) this.DB[_local3450].c(this.J_[_local3450].dB());
		}
		var _local3453 = JSON.parse(JSON.stringify(this.Q_));
		_local3453.Brsh.v.Dmtr.v.val = Math.min(_local3453.Brsh.v.Dmtr.v.val, 50);
		s.setCanvasSizeForDpr(this.T, this.iJ, 80);
		var _local3457 = new Rect(0, 0, this.T.width, this.T.height),
			_local3451 = this.mN.pO,
			_local3458 = new iU(_local3453, _local3451 ? _local3451.BF : null, _local3451 ? _local3451.yO : null, {
				uh: 1
			}, _local3455.Y7, _local3455.GF, _local3457, null, 0),
			_local3456 = _local3457.n / 2,
			_local3452 = _local3457.m - _local3456 * 2;
		_local3458.moveTo(_local3456, _local3456);
		for (var _local3450 = 0; _local3450 <= _local3452; _local3450 += 10) _local3458.lineTo(_local3456 + _local3450, _local3456 + 20 * Math.sin(2 * Math.PI * _local3450 / _local3452));
		_local3458.finish();
		var _local3454 = this.k_.createImageData(_local3457.m, _local3457.n);
		PixelUtil.blitRgbaRect(_local3458.XI(), _local3458.Pa(), _local3454.data, _local3457);
		this.k_.putImageData(_local3454, 0, 0);
	};

	function _local3434(V) {
		UIComponent.call(this);
		V = V.split(".")[0];
		this.oz = V;
		var _local3460 = this.e = s.createElement("span"),
			_local3461 = ["Off", "Fade"];
		_local3461.push(V == "angleDynamics" ? "Direction" : "Pen Pressure");
		var _local3459 = this.HA = new DropdownMenu("Control", _local3461);
		_local3459.addListener(ActionTypes.E.A, this.Rx, this);
		_local3460.appendChild(_local3459.e);
		var _local3462 = this.att = new RangeDropInput(null, 0, 100, null, null, null, !0);
		_local3462.c(50);
		_local3462.addListener(ActionTypes.E.A, this.Rx, this);
	}
	_local3434.prototype = new UIComponent();
	_local3434.prototype.c = function (V) {
		V = V < 2 ? V : 2;
		this.HA.c(V);
		this.VP();
	};
	_local3434.prototype.b = function () {
		var _local3464 = this.HA.b(),
			_local3463 = this.oz;
		_local3464 = _local3464 <= 1 ? _local3464 : _local3463 == "angleDynamics" ? 6 : 2;
		return _local3464;
	};
	_local3434.prototype.Rx = function (V) {
		this.VP();
		V.target = V.currentTarget = this;
		this.dispatch(V);
	};
	_local3434.prototype.VP = function (V) {
		this.att.setEnabled(this.HA.b() == 1);
	};

	function _local3432(V) {
		UIComponent.call(this);
		this.e = s.createElement("div");
		this.Q_ = null;
		var _local3467 = ["basic", "useTipDynamics", "useScatter", "useColorDynamics", "usePaintDynamics"].indexOf(V);
		this.tZ = [
		[15, 0],
		[15, 1],
		[15, 2],
		[15, 3], "Transfer"][
		_local3467];
		this.WV = V;
		this.k7 = {};
		this.ayw = null;
		var _local3468 = ["--br Brsh.Dmtr Brsh.Angl Brsh.Rndn Brsh.Hrdn Brsh.Spcn".split(" "), "szVr.jitter szVr.bVTy szVr.fStp minimumDiameter angleDynamics.jitter angleDynamics.bVTy angleDynamics.fStp roundnessDynamics.jitter minimumRoundness".split(" "), ["scatterDynamics.jitter", "Cnt", "countDynamics.jitter"],
		["clVr.jitter", "H", "Strt", "Brgh"], "opVr.jitter opVr.bVTy opVr.fStp prVr.jitter prVr.bVTy prVr.fStp".split(" ")][
		_local3467];
		for (var _local3465 = 0; _local3465 < _local3468.length; _local3465++) {
			var _local3466 = _local3468[_local3465],
				_local3469;
			if (_local3466 == "--br") {
				_local3469 = new BrushPickerButton();
				this.e.appendChild(_local3469.Sc.firstChild);
			} else if (_local3466 == "Brsh.Dmtr") _local3469 = new RangeInput("Size", 1, 1e3, " px", 0, !0);else
			if (_local3466 == "Brsh.Angl") _local3469 = new RangeInput("Angle", 0, 359, " \xB0");else
			if (_local3466 == "Brsh.Rndn") _local3469 = new RangeInput("Roundness", 0, 100, " %");else
			if (_local3466 == "Brsh.Hrdn") _local3469 = new RangeInput("Hardness", 0, 100, " %");else
			if (_local3466 == "Brsh.Spcn") _local3469 = new RangeInput("Spacing", 1, 300, " %");else
			if (_local3466 == "szVr.jitter") _local3469 = new RangeInput("Size Jitter", 0, 100, "%");else
			if (_local3466 == "minimumDiameter") _local3469 = new RangeInput("Minimal Diameter", 0, 100, "%");else
			if (_local3466 == "angleDynamics.jitter") _local3469 = new RangeInput("Angle Jitter", 0, 100, "%");else
			if (_local3466.endsWith("bVTy")) _local3469 = new _local3434(_local3466);else
			if (_local3466.endsWith("fStp")) _local3469 = new RangeDropInput(null, 0, 100, null, null, null, !0);else
			if (_local3466 == "roundnessDynamics.jitter") _local3469 = new RangeInput("Roundness Jitter", 0, 100, "%");else
			if (_local3466 == "minimumRoundness") _local3469 = new RangeInput("Minimal Roundness", 1, 100, "%");else
			if (_local3466 == "scatterDynamics.jitter") _local3469 = new RangeInput("Position Jitter", 0, 1e3, " %");else
			if (_local3466 == "Cnt") _local3469 = new RangeInput("Count", 1, 20);else
			if (_local3466 == "countDynamics.jitter") _local3469 = new RangeInput("Count Jitter", 0, 100, " %");else
			if (_local3466 == "clVr.jitter") _local3469 = new RangeInput("Foreground/Background Jitter", 0, 100, " %");else
			if (_local3466 == "H") _local3469 = new RangeInput("Hue Jitter", 0, 100, " %");else
			if (_local3466 == "Strt") _local3469 = new RangeInput("Saturation Jitter", 0, 100, " %");else
			if (_local3466 == "Brgh") _local3469 = new RangeInput("Brightness Jitter", 0, 100, " %");else
			if (_local3466 == "opVr.jitter") _local3469 = new RangeInput("Opacity Jitter", 0, 100, " %");else
			if (_local3466 == "prVr.jitter") _local3469 = new RangeInput("Flow Jitter", 0, 100, " %");else
			throw _local3466;
			this.k7[_local3466] = _local3469;
			_local3469.parent = this;
			_local3469.addListener(ActionTypes.E.A, this.Rx, this);
		}
	}
	_local3432.prototype = new UIComponent();
	_local3432.prototype.a1G = function () {
		this.dispatch(new Action("brushchange"));
	};
	_local3432.prototype.c = function (V) {
		this.Q_ = JSON.parse(JSON.stringify(V));
		this.e.className = this.dB() ? "" : "disabled";
		this.LO();
	};
	_local3432.prototype.refresh = function () {
		for (var _local3470 in this.k7) this.k7[_local3470].refresh();
	};
	_local3432.prototype.dB = function () {
		return !0;
	};
	_local3432.prototype.BM = function (V, Q) {
		if (Q == PsdResourceTypes.CV || Q == PsdResourceTypes.Wx) {
			var _local3471 = this.k7["--br"];
			if (_local3471) _local3471.Z2(V.pO);
		}
	};
	_local3432.prototype.Rx = function (V) {
		var _local3475 = V.target,
			_local3472 = this.k7,
			_local3478;
		for (var _local3477 in _local3472)
		if (_local3472[_local3477] == _local3475) _local3478 = _local3477;
		if (_local3478 == "--br") {
			var _local3474 = new Action(ActionTypes.E.L, !0);
			_local3474.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.Sq,
				Q_: _local3475.b()
			};
			this.dispatch(_local3474);
		} else {
			var _local3476 = _local3433(this.Q_, _local3478),
				_local3473 = _local3475.b();
			if (_local3476) {
				if (_local3478.endsWith("bVTy") || _local3478.endsWith("fStp") || _local3478 == "Cnt") _local3476.v = _local3473;else
				_local3476.v.val = _local3473;
				this.a1G();
			}
		}
	};
	_local3432.prototype.LO = function () {
		var _local3484 = this.Q_,
			_local3482 = _local3484.Brsh.v.classID,
			_local3486 = this.k7,
			_local3479 = _local3482 != this.ayw;
		this.ayw = _local3482;
		if (_local3479) {
			s.clearChildren(this.e);
			for (var _local3487 in _local3486) {
				if (_local3482 != "computedBrush" && _local3482 != "sampledBrush" && _local3487 == "Brsh.Rndn") continue;
				if (_local3482 != "computedBrush" && _local3487 == "Brsh.Hrdn") continue;
				var _local3485 = _local3486[_local3487],
					_local3481 = _local3485.e;
				if (_local3487 == "--br") {
					_local3481 = _local3485.FO.e;
					_local3481.style.width = "auto";
				}
				this.e.appendChild(_local3481);
			}
		}
		for (var _local3487 in _local3486) {
			if (_local3487 == "--br") continue;
			var _local3483 = _local3433(_local3484, _local3487),
				_local3480;
			if (_local3483) {
				if (_local3487.endsWith("bVTy") || _local3487.endsWith("fStp") || _local3487 == "Cnt") _local3480 = _local3483.v;else
				_local3480 = _local3483.v.val;
				_local3486[_local3487].c(_local3480);
				if (_local3487.endsWith("fStp")) _local3486[_local3487].setEnabled(_local3433(_local3484, _local3487.split(".")[0] + ".bVTy").v == 1);
			}
		}
	};
	_local3432.prototype.dB = function () {
		var _local3488 = this.WV;
		return _local3488 == "basic" ? !0 : this.Q_[_local3488].v;
	};
	_local3432.prototype.aj$ = function (V) {
		var _local3489 = this.WV;
		if (_local3489 == "basic") return;
		this.Q_[_local3489].v = V;
		es.HW.awH(this.Q_);
		this.a1G();
	};

	function _local3433(V, Q) {
		var _local3491 = Q.split(".");
		V = V[_local3491[0]];
		for (var _local3490 = 1; _local3490 < _local3491.length; _local3490++) {
			if (V == null) return V;
			V = V.v[_local3491[_local3490]];
		}
		return V;
	}
	return _local3435;
}();

function ChannelsPanel() {
	PanelTabBase.call(this, "Channels", !1, "---adj/mixr", PanelTabBase.xA.aan);
	this.Pj = null;
	this._B = null;
	this.jo = s.createElement("div", "lpbody scrollable");
	this.jo.style.marginTop = "4px";
	this.S8 = s.createElement("div", "lpfoot");
	this.DK.appendChild(this.jo);
	this.DK.appendChild(this.S8);
	this.rg = [];
	this.addListener("click", this.YG, this);
	this.lM = [];
	ChannelsPanel.sY([
	[17, 2], "Save Selection as Channel", [5, 3],
	[5, 4]],
	this.lM, this.S8, this.vR.bind(this), this.DS.bind(this));
	// this.PK = new ContextPanel([{
	// 	name: "Merge Channels",
	// 	pR: !0
	// }], [{
	// 	Y: ActionTypes.E.L,
	// 	W: {
	// 		a: ActionTypes.$.SN,
	// 		GU: "mergechannels"
	// 	}
	// }]);
}
ChannelsPanel.prototype = new PanelTabBase("");
ChannelsPanel.prototype.xI = function () {
	return this.PK;
};
ChannelsPanel.sY = function (l, d, G, b, V) {
	for (var _local3520 = 0; _local3520 < l.length; _local3520++) {
		var _local3521 = new ToolbarButton("W", !1, l[_local3520]);
		d.push(_local3521);
		s.addPointerDown(_local3521.e, b);
		G.appendChild(_local3521.e);
		var _local3522 = _local3521.e;
		_local3522.addEventListener("drop", V, !1);
		_local3522.addEventListener("dragover", function (I) {
			I.preventDefault();
		}, !1);
		_local3522.addEventListener("dragenter", s.stopAndPreventHandler, !1);
	}
};
ChannelsPanel.YO = function (l, d) {
	for (var _local3523 = 0; _local3523 < l.length; _local3523++)
	if (l[_local3523].e == d.currentTarget) return _local3523;
};
ChannelsPanel.prototype.vR = function (l) {
	var _local3526 = ChannelsPanel.YO(this.lM, l);
	if (_local3526 == 0) this.dispatch(ChannelLayerRow.$z(!0, null, l));else
	{
		_local3526--;
		var _local3524 = new Action(ActionTypes.E.g5, !0),
			_local3525 = {
				classID: "null"
			};
		if (_local3526 == 0) _local3525.null = {
			t: "obj ",
			v: [{
				t: "prop",
				v: {
					classID: "Chnl",
					keyID: "fsel"
				}
			}]
		};else
		if (_local3526 == 1) _local3525.Nw = {
			t: "Objc",
			v: {
				classID: "Chnl",
				ClrI: {
					t: "enum",
					v: {
						MskI: "SlcA"
					}
				},
				Opct: {
					t: "long",
					v: 50
				}
			}
		};else
		_local3525.null = PsdDescriptorHelper.Fw("Chnl", !0);
		_local3524.data = {
			kT: ["duplicate", "make", "delete"][_local3526],
			a0: _local3525
		};
		this.dispatch(_local3524);
	}
};
ChannelsPanel.prototype.DS = function (l) {
	var _local3529 = ChannelsPanel.YO(this.lM, l);
	if (_local3529 == 2) {
		var _local3527 = new Action(ActionTypes.E.g5, !0),
			_local3528 = {
				classID: "null"
			};
		_local3528.null = PsdDescriptorHelper.Fw("Chnl", !0);
		_local3527.data = {
			kT: "duplicate",
			a0: _local3528
		};
		this.dispatch(_local3527);
	} else this.vR(l);
};
ChannelsPanel.prototype.fw = function (A) {
	var _local3532 = this.rg,
		_local3531 = _local3532[A];
	if (_local3531 == null) {
		var _local3530 = s.createElement("canvas");
		_local3531 = _local3530.getContext("2d", { willReadFrequently: true });
		_local3532.push(_local3531);
	}
	return _local3531;
};
ChannelsPanel.prototype.YG = function (l) {
	var _local3539 = this.Pj.slice(0),
		_local3534 = l.data.sy,
		_local3538 = _local3539[0] + _local3539[1] + _local3539[2],
		_local3537 = this._B;
	if (-5 < _local3534 && _local3534 < 0) {
		var _local3536 = -_local3534 - 1;
		if (l.data.Z6) {
			if (_local3536 == 0) _local3539 = _local3538 == 3 ? [0, 0, 0] : [1, 1, 1];else
			{
				if (_local3539[_local3536 - 1] == 0) _local3539[_local3536 - 1] = 1;else
				if (!0) _local3539[_local3536 - 1] = 0;
			}
		} else {
			if (_local3536 == 0) _local3539 = [1, 1, 1];else
			{
				_local3539 = [0, 0, 0];
				_local3539[_local3536 - 1] = 1;
			}
			for (var _local3533 = 0; _local3533 < _local3537.vj.length; _local3533++) _local3537.vj[_local3533].jv = !1;
			_local3537.FB = [];
		}
		var _local3541 = new Action(ActionTypes.E.v, !0);
		_local3541.G = f._O;
		_local3541.data = {
			a: "setcls",
			MX: _local3539
		};
		this.dispatch(_local3541);
		return;
	}
	if (-1 < _local3534) {
		var _local3535 = _local3537.B[_local3534],
			_local3542 = _local3535.ht == 1 ? _local3535.c3() : _local3535.vZ(_local3537).z;
		if (l.data.Z6) _local3542.jv = !_local3542.jv;else
		{
			for (var _local3533 = 0; _local3533 < _local3537.vj.length; _local3533++) _local3537.vj[_local3533].jv = !1;
			_local3537.FB = [];
		}
	} else {
		var _local3540 = -_local3534 - 5,
			_local3542 = _local3537.vj[_local3540];
		if (l.data.Z6) _local3542.jv = !_local3542.jv;else
		{
			for (var _local3533 = 0; _local3533 < _local3537.vj.length; _local3533++) _local3537.vj[_local3533].jv = !1;
			_local3542.jv = !0;
			_local3537.FB = [_local3540];
			if (_local3538 != 0) {
				var _local3541 = new Action(ActionTypes.E.v, !0);
				_local3541.G = f._O;
				_local3541.data = {
					a: "setcls",
					MX: [0, 0, 0]
				};
				this.dispatch(_local3541);
			}
		}
	}
	_local3537.uK = _local3537.bV = !0;
};
ChannelsPanel.prototype.KN = function () {
	this.AK();
};
ChannelsPanel.prototype.Yw = function (l) {
	this._B = l;
	this.AK();
};
// Rebuild the Channels panel list: RGB composite + components, layer masks, then alpha/spot channels.
ChannelsPanel.prototype.AK = function () {
	var doc = this._B,
		listEl = this.jo,
		nextThumbIndex = 4; // first 4 cached canvases are RGB composite + R/G/B
	s.clearChildren(listEl);
	if (doc == null || !s.isInDocument(listEl)) return;

	var docWidth = doc.m,
		docHeight = doc.n,
		fullDocBounds = new Rect(0, 0, docWidth, docHeight),
		// doc.u.MX = [R visible, G visible, B visible]; mirrored on the panel for click handlers
		channelVisibility = this.Pj = doc.u.MX.slice(0),
		visibleRgbCount = channelVisibility[0] + channelVisibility[1] + channelVisibility[2],
		thumbWidth = Math.round(34 * s.getDevicePixelRatio()),
		thumbHeight = thumbWidth;
	// Keep thumbnail aspect ratio matching the document
	if (docWidth > docHeight) thumbHeight = Math.round(thumbHeight * docHeight / docWidth);else
	thumbWidth = Math.round(thumbWidth * docWidth / docHeight);

	var rgbLabels = ["RGB"].concat(LayerEffectsHelper.rgbChannels);

	// --- RGB composite (index 0) + R, G, B channels (indices 1–3) ---
	// Row ids are negative: -1 = RGB, -2 = R, -3 = G, -4 = B
	for (var channelIndex = 0; channelIndex < 4; channelIndex++) {
		var thumbCtx = this.fw(channelIndex);
		PixelUtil.e2.ho(thumbCtx, thumbWidth, thumbHeight, fullDocBounds, doc.LT(), fullDocBounds, !1, channelIndex == 0 ? null : channelIndex - 1);
		var isSelected = channelIndex == 0 ? visibleRgbCount == 3 : channelVisibility[channelIndex - 1] == 1,
			row = new ChannelLayerRow(-1 - channelIndex, !0, !0, thumbCtx, rgbLabels[channelIndex], isSelected, isSelected);
		row.parent = this;
		listEl.appendChild(row.e);
		s.setCanvasCssSizeForDpr(thumbCtx.canvas);
	}

	// --- Layer masks for currently selected layers (doc.g) ---
	// layer.ht: 1 = raster mask, 3 = filter mask; other edit targets are skipped
	for (var selIndex = 0; selIndex < doc.g.length; selIndex++) {
		var layer = doc.B[doc.g[selIndex]],
			editTarget = layer.ht;
		if (editTarget != 1 && editTarget != 3) continue;
		var maskBuffer = editTarget == 1 ? layer.c3() : layer.vZ(doc).z,
			thumbCtx = this.fw(nextThumbIndex + selIndex);
		nextThumbIndex++;
		PixelUtil.e2.L6(thumbCtx, thumbWidth, thumbHeight, fullDocBounds, maskBuffer);
		var row = new ChannelLayerRow(doc.g[selIndex], !0, !0, thumbCtx, layer.getName() + (editTarget == 1 ? "" : " Filter") + " Mask", !0, maskBuffer.jv);
		row.parent = this;
		listEl.appendChild(row.e);
		s.setCanvasCssSizeForDpr(thumbCtx.canvas);
	}

	// --- Alpha / spot channels (doc.vj), including Quick Mask ---
	// Row ids are -5 - channelIndex; doc.FB lists which alpha channels are active for editing
	for (var alphaIndex = 0; alphaIndex < doc.vj.length; alphaIndex++) {
		var alphaChannel = doc.vj[alphaIndex],
			thumbCtx = this.fw(nextThumbIndex + alphaIndex);
		PixelUtil.e2.L6(thumbCtx, thumbWidth, thumbHeight, fullDocBounds, alphaChannel);
		var row = new ChannelLayerRow(-5 - alphaIndex, !0, alphaChannel.name == "Quick Mask", thumbCtx, alphaChannel.name, doc.FB.indexOf(alphaIndex) != -1, alphaChannel.jv, f.yS, {
			a: LayerRecord.B1,
			y3: "rnm",
			sy: alphaIndex
		});
		row.parent = this;
		listEl.appendChild(row.e);
		s.setCanvasCssSizeForDpr(thumbCtx.canvas);
	}
};
ChannelsPanel.prototype.resize = function (l, d) {
	this.jo.style.height = d - 30 - 4 + "px";
	this.jo.style.width = l + "px";
};
ChannelsPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.AK();
	ChannelsPanel.no(this.lM, ["lrs/makesel", "lrs/mask", "lrs/newlayer", "lrs/bin"]);
};
ChannelsPanel.no = function (l, d) {
	var d = ButtonGroupMenu.Ze(d, null, "miniscale");
	for (var _local3561 = 0; _local3561 < l.length; _local3561++) l[_local3561].setLabel(d[_local3561]);
};

function ChannelLayerRow(l, d, G, b, V, Q, t, I, y) {
	UIComponent.call(this);
	this.e = s.createElement("div");
	this.azW = l;
	this.aiY = d;
	this.k_ = b;
	this.ajB = I;
	this.a2V = y;
	this.lg = s.createElement("div", Q ? "head selected" : "head");
	this.lg.setAttribute("style", "height: " + 40 + "px");
	var _local3565 = s.createElement("div", "headL"),
		_local3563 = s.createElement("div", "headR"),
		_local3564 = 15;
	this.e.appendChild(this.lg);
	this.lg.appendChild(_local3565);
	this.lg.appendChild(_local3563);
	this.x$ = s.createElement("div", "eye");
	if (1 < s.getDevicePixelRatio() && s.getDevicePixelRatio() < 1.5) _local3564 = _local3564 / s.getDevicePixelRatio();
	this.x$.setAttribute("style", "background-size: " + _local3564 + "px " + _local3564 + "px;");
	this.x$.style.opacity = t ? 1 : .2;
	if (d) _local3565.appendChild(this.x$);
	this.Ct = s.createElement("div", "thumb");
	if (b) this.Ct.appendChild(b.canvas);
	_local3565.appendChild(this.Ct);
	this.Me = s.createElement("div", "label");
	if (G) this.Me.style.fontStyle = "italic";
	this.Me.textContent = languageManager.get(V);
	_local3565.appendChild(this.Me);
	var _local3562 = this.lg;
	_local3562.setAttribute("draggable", "true");
	_local3562.addEventListener("dragstart", function (n) {
		n.stopPropagation();
		n.dataTransfer.setData("Text", "hello");
	}, !1);
	_local3562.addEventListener("drop", s.stopAndPreventHandler, !1);
	s.addPointerDown(this.lg, this.axN.bind(this));
	if (!G) this.lg.addEventListener("mouseup", this.adP.bind(this), !1);
}
ChannelLayerRow.prototype = new UIComponent();
ChannelLayerRow.prototype.sd = function (l) {
	var _local3566 = new Action(ActionTypes.E.v, !0);
	_local3566.G = this.ajB;
	_local3566.data = this.a2V;
	_local3566.data.name = l;
	this.dispatch(_local3566);
};
ChannelLayerRow.prototype.axN = function (l) {
	var _local3569 = l.ctrlKey || l.metaKey,
		_local3567 = this.azW;
	if (_local3569 && l.target == this.k_.canvas) {
		this.dispatch(ChannelLayerRow.$z(this.aiY, _local3567, l));
	} else {
		var _local3568 = new Action("click", !0);
		_local3568.data = {
			sy: _local3567,
			Z6: l.target == this.x$,
			Bd: _local3569
		};
		this.dispatch(_local3568);
	}
};
ChannelLayerRow.prototype.adP = function (l) {
	if (l.detail == 2 && l.target == this.Me) {
		var _local3570 = new PanelTabBase.di(this.Me, this.sd.bind(this));
	}
};
ChannelLayerRow.$z = function (l, d, G) {
	var _local3572 = 0;
	if (G.shiftKey) _local3572++;
	if (G.altKey) _local3572 += 2;
	var _local3571 = new Action(ActionTypes.E.v, !0);
	_local3571.G = f.Da;
	if (l) {
		if (-5 < d && d < 0) {
			_local3571 = new Action(ActionTypes.E.g5, !0);
			_local3571.data = f.GS.agz(_local3572, ["RGB", "Rd", "Grn", "Bl"][-1 - d]);
		} else _local3571.data = {
			a: "fromchannel",
			X9: [d, 0, _local3572]
		};
	} else _local3571.data = {
		a: "frompath",
		X9: [d, 0, _local3572]
	};
	return _local3571;
};

function PathsPanel() {
	PanelTabBase.call(this, "Paths", !1, "---panels/paths", PanelTabBase.xA.fe);
	this.Pj = null;
	this._B = null;
	this.jo = s.createElement("div", "lpbody scrollable");
	this.jo.style.marginTop = "4px";
	this.S8 = s.createElement("div", "lpfoot");
	this.DK.appendChild(this.jo);
	this.DK.appendChild(this.S8);
	this.DK.addEventListener("click", this.ah5.bind(this), !1);
	this.rg = [];
	this.addListener("click", this.YG, this);
	this.lM = [];
	ChannelsPanel.sY(["Fill Path", "Stroke Path with Brush", [17, 2], "Selection to Path", [5, 3],
	[5, 4]],
	this.lM, this.S8, this.vR.bind(this), this.DS.bind(this));
}
PathsPanel.prototype = new PanelTabBase("");
PathsPanel.prototype.vR = function (l, d) {
	var _local3573 = ChannelsPanel.YO(this.lM, l),
		_local3574;
	if (_local3573 < 2) {
		_local3574 = new Action(ActionTypes.E.g5, !0);
		_local3574.data = f.nr.xs(_local3573);
	} else if (_local3573 == 2) _local3574 = ChannelLayerRow.$z(!1, null, l);else
	if (_local3573 == 3) {
		_local3574 = new Action(ActionTypes.E.g5, !0);
		_local3574.data = {
			kT: "make",
			a0: {
				classID: "null",
				null: {
					t: "obj ",
					v: [{
						t: "Clss",
						v: {
							classID: "Path"
						}
					}]
				},
				From: {
					t: "obj ",
					v: [{
						t: "prop",
						v: {
							classID: "csel",
							keyID: "fsel"
						}
					}]
				},
				Tlrn: {
					t: "UntF",
					v: {
						type: "#Pxl",
						val: 2
					}
				}
			}
		};
	} else if (_local3573 > 3) {
		var _local3574 = new Action(ActionTypes.E.v, !0);
		_local3574.G = f.o2;
		_local3574.data = {
			a: "pathedit",
			y3: ["new", "del"][_local3573 - 4],
			a66: d
		};
	}
	this.dispatch(_local3574);
};
PathsPanel.prototype.DS = function (l) {
	this.vR(l, !0);
};
PathsPanel.prototype.fw = function (A) {
	var _local3577 = this.rg,
		_local3576 = _local3577[A];
	if (_local3576 == null) {
		var _local3575 = s.createElement("canvas");
		_local3576 = _local3575.getContext("2d", { willReadFrequently: true });
		_local3577.push(_local3576);
	}
	return _local3576;
};
PathsPanel.prototype.ah5 = function (l) {
	if (l.target == this.jo) {
		var _local3578 = this._B;
		_local3578.yK = [];
		_local3578.jP = [];
		_local3578.bV = !0;
		_local3578.uK = !0;
	}
};
PathsPanel.prototype.YG = function (l) {
	var _local3584 = l.data.sy,
		_local3579 = this._B,
		_local3583 = l.data.Bd,
		_local3582 = _local3584,
		_local3581 = _local3579.jP,
		_local3585 = _local3579.yK;
	if (_local3584 < 0) {
		_local3582 = -1 - _local3584;
		_local3581 = _local3579.yK;
		_local3585 = _local3579.jP;
	}
	if (_local3583) {
		var _local3580 = _local3581.indexOf(_local3582);
		if (_local3580 == -1) _local3581.push(_local3582);else
		_local3581.splice(_local3580, 1);
	} else {
		while (_local3581.length != 0) _local3581.pop();
		while (_local3585.length != 0) _local3585.pop();
		_local3581.push(_local3582);
	}
	_local3579.bV = !0;
	_local3579.uK = !0;
};
PathsPanel.prototype.KN = function () {
	this.AK();
};
PathsPanel.prototype.Yw = function (l) {
	this._B = l;
	this.AK();
};
PathsPanel.prototype.AK = function () {
	var _local3597 = this._B,
		_local3595 = this.jo;
	s.clearChildren(_local3595);
	if (_local3597 == null || !s.isInDocument(_local3595)) return;
	var _local3587 = _local3597.m,
		_local3594 = _local3597.n,
		_local3593 = new Rect(0, 0, _local3587, _local3594),
		_local3591 = this.Pj = _local3597.u.MX.slice(0),
		_local3599 = _local3591[0] + _local3591[1] + _local3591[2],
		_local3588 = Math.round(34 * s.getDevicePixelRatio()),
		_local3600 = _local3588;
	if (_local3587 > _local3594) _local3600 = Math.round(_local3600 * _local3594 / _local3587);else
	_local3588 = Math.round(_local3588 * _local3587 / _local3594);
	var _local3596 = _local3597.LW(),
		_local3590 = _local3596[0];
	for (var _local3586 = 0; _local3586 < _local3590.length; _local3586++) {
		var _local3592 = _local3590[_local3586],
			_local3589 = this.fw(_local3586);
		PixelUtil.e2.avF(_local3589, _local3588, _local3600, _local3593, _local3592.add.vmsk);
		var _local3598 = new ChannelLayerRow(_local3592.sy, !1, _local3592.sy >= 0, _local3589, _local3592.name, _local3596[1].indexOf(_local3586) != -1, !1, f.o2, {
			a: "pathedit",
			y3: "rnm",
			sy: _local3592.sy
		});
		_local3598.parent = this;
		_local3595.appendChild(_local3598.e);
		s.setCanvasCssSizeForDpr(_local3589.canvas);
	}
};
PathsPanel.prototype.resize = function (l, d) {
	this.jo.style.height = d - 30 - 4 + "px";
	this.jo.style.width = l + "px";
};
PathsPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.AK();
	ChannelsPanel.no(this.lM, "-\u2B24 -\u25EF lrs/makesel lrs/makepath lrs/newlayer lrs/bin".split(" "));
};

function CharacterParagraphPanel(l) {
	PanelTabBase.call(this, l ? "Character" : "Paragraph", !1, "---panels/" + (l ? "character" : "paragraph"), l ? PanelTabBase.xA.a46 : PanelTabBase.xA.alU);
	this.DK.setAttribute("style", "min-width:240px;");
	this.a8D = l;
	this.Tn = null;
	this.mN = null;
}
CharacterParagraphPanel.prototype = new PanelTabBase("");
CharacterParagraphPanel.prototype.Eg = function () {
	this.Tn = new TypeToolPanel();
	var _local3607 = this.Tn,
		_local3606 = this.DK;
	_local3607.parent = this;
	if (this.a8D) {
		var _local3601 = s.createElement("div", "marged");
		_local3606.appendChild(_local3601);
		_local3601.appendChild(_local3607.re.e);
		_local3606.appendChild(s.createElement("hr"));
		var _local3605 = s.createElement("div", "marged");
		_local3606.appendChild(_local3605);
		_local3605.appendChild(_local3607.rk.e);
		_local3605.appendChild(_local3607.yX.e);
		var _local3604 = s.createElement("div", "marged");
		_local3606.appendChild(_local3604);
		_local3604.appendChild(_local3607.tV.e);
		_local3604.appendChild(_local3607.Ha.e);
		_local3606.appendChild(s.createElement("hr"));
		var _local3603 = s.createElement("div", "marged");
		_local3606.appendChild(_local3603);
		_local3603.appendChild(_local3607.eo.e);
		_local3603.appendChild(_local3607.UC.e);
		var _local3608 = s.createElement("div", "marged");
		_local3606.appendChild(_local3608);
		_local3608.appendChild(_local3607.SI.e);
		_local3608.appendChild(_local3607.xV.e);
		_local3608.appendChild(_local3607.rz.e);
		_local3606.appendChild(s.createElement("hr"));
		var _local3602 = s.createElement("div", "marged");
		_local3606.appendChild(_local3602);
		_local3602.appendChild(_local3607.d2.e);
		_local3602.appendChild(_local3607.pY.e);
		_local3602.appendChild(_local3607.Qv.e);
		_local3602.appendChild(_local3607.qO.e);
		_local3602.appendChild(_local3607.FQ.e);
		_local3602.appendChild(_local3607.q0.e);
		_local3602.appendChild(_local3607.h3.e);
		_local3602.appendChild(_local3607.QQ.e);
	} else {
		var _local3601 = s.createElement("div", "marged");
		_local3606.appendChild(_local3601);
		_local3601.appendChild(_local3607.eM.e);
		_local3601.appendChild(_local3607.Bx.e);
		_local3601.appendChild(_local3607.j7.e);
		_local3601.appendChild(_local3607.art.e);
		_local3601.appendChild(_local3607.alV.e);
		_local3601.appendChild(_local3607.apN.e);
		_local3601.appendChild(_local3607.aez.e);
		_local3606.appendChild(s.createElement("hr"));
		var _local3605 = s.createElement("div", "marged");
		_local3606.appendChild(_local3605);
		_local3605.appendChild(_local3607.z_.e);
		_local3605.appendChild(_local3607.j3.e);
		_local3605.appendChild(_local3607.k6.e);
		_local3606.appendChild(s.createElement("hr"));
		var _local3604 = s.createElement("div", "marged");
		_local3606.appendChild(_local3604);
		_local3604.appendChild(_local3607.Bq.e);
		_local3604.appendChild(_local3607.Fg.e);
		_local3604.appendChild(_local3607.a3.e);
		_local3604.appendChild(_local3607.AB.e);
	}
};
CharacterParagraphPanel.prototype.KN = function () {
	if (!s.isInDocument(this.DK)) return;
	if (this.Tn == null) {
		this.Eg();
		var _local3609 = this.mN;
		if (_local3609) this.Tn.c(_local3609.XG, _local3609.Hg, _local3609.fL);
		this.Tn.refresh();
	}
};
CharacterParagraphPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	if (this.Tn) this.Tn.refresh();
};
CharacterParagraphPanel.prototype.BM = function (l, d) {
	this.mN = l;
	if (d != PsdResourceTypes.Wx && d != PsdResourceTypes.o$ && d != PsdResourceTypes.jz && d != PsdResourceTypes.GG) return;
	if (this.Tn) this.Tn.c(l.XG, l.Hg, l.fL);
};

function ColorPanel() {
	PanelTabBase.call(this, "Color", !1, null, PanelTabBase.xA.K5);
	this.GY = 0;
	this.ajR = 0;
	this.mN = null;
}
ColorPanel.prototype = new PanelTabBase("");
ColorPanel.prototype.Eg = function () {
	if (!s.isInDocument(this.DK) || this.w5) return;
	var _local3675 = s.createElement("div", "flexrow padded");
	this.DK.appendChild(_local3675);
	var _local3674 = s.createElement("div");
	_local3675.appendChild(_local3674);
	this.w5 = [];
	for (var _local3672 = 0; _local3672 < 2; _local3672++) {
		var _local3673 = new ColorSwatch();
		this.w5.push(_local3673);
		_local3673.addListener("click", this.ahF, this);
		_local3674.appendChild(_local3673.e);
	}
	this.cu = new ColorMapCanvas(192);
	console.log("hsb picker");
	this.cu.addListener(ActionTypes.E.A, this.R1, this);
	this.d9 = new ForeBackColorSwatch();
	this.d9.parent = this;
	_local3675.appendChild(this.cu.e);
	this.BM(this.mN, PsdResourceTypes.Wx);
};
ColorPanel.prototype.ahF = function (l) {
	var _local3677 = l.currentTarget,
		_local3676 = this.w5.indexOf(_local3677);
	if (_local3676 == this.GY) {
		this.d9.BN(_local3676);
	} else {
		this.GY = _local3676;
		this.VP();
	}
};
ColorPanel.prototype.R1 = function (l) {
	var _local3680 = this.cu.b();
	this.cu.c(_local3680);
	var _local3678 = Math.round(_local3680.o * 255) << 16 | Math.round(_local3680.J * 255) << 8 | Math.round(_local3680.k * 255),
		_local3679 = new Action(ActionTypes.E.L, !0);
	_local3679.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.K5,
		y3: this.GY,
		Z: _local3678
	};
	this.dispatch(_local3679);
	this.ajR = Date.now();
};
ColorPanel.prototype.VP = function () {
	if (this.d9 == null) return;
	var _local3687 = this.mN,
		_local3686 = this.GY,
		_local3682 = [_local3687.Y7, _local3687.GF];
	for (var _local3681 = 0; _local3681 < 2; _local3681++) {
		var _local3685 = this.w5[_local3681],
			_local3684 = _local3685.e.style;
		_local3685.EB(_local3682[_local3681]);
		if (_local3681 == _local3686) _local3684.filter = "drop-shadow(0 0 1px #000000)";
	}
	var _local3683 = _local3682[_local3686];
	if (Date.now() - this.ajR > 100) this.cu.c({
		o: (_local3683 >>> 16) / 255,
		J: (_local3683 >>> 8 & 255) / 255,
		k: (_local3683 & 255) / 255
	});
};
ColorPanel.prototype.BM = function (l, d) {
	this.mN = l;
	if (this.d9 == null) return;
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.K5) {
		this.d9.ah9(l.Y7, l.GF);
		this.VP();
	}
};
ColorPanel.prototype.Yw = function () {
	this.Eg();
};
ColorPanel.prototype.KN = function () {
	this.Eg();
	this.VP();
};

function CssPanel() {
	PanelTabBase.call(this, "CSS", !1, "---panels/css", PanelTabBase.xA.CSS);
	this.KP = null;
	var _local3688 = s.createElement("div", "padded");
	this.DK.appendChild(_local3688);
	this.e8 = s.createElement("textarea");
	s.addKeydownBlocker(this.e8);
	_local3688.appendChild(this.e8);
}
CssPanel.prototype = new PanelTabBase("");
CssPanel.prototype.resize = function (l, d) {
	if (this.iJ == l) return;
	this.iJ = l;
	this.e8.setAttribute("style", "display:block;tab-size:4;  margin:0; font-family:monospace; width:" + (l - 10) + "px; height:" + (d - 10) + "px");
};
CssPanel.prototype.Yw = function (l) {
	this.KP = l;
	this.VP();
};
CssPanel.prototype.BM = function (l, d) {
	if (d == PsdResourceTypes.jz) this.VP();
};
CssPanel.prototype.VP = function () {
	var _local3691 = this.KP;
	if (_local3691 == null || _local3691.g.length == 0) return;
	if (!s.isInDocument(this.DK)) return;
	var _local3690 = _local3691.B[_local3691.g[0]],
		_local3689 = LayerStyleToCss.layerToCssStyles(_local3690, _local3691);
	if (_local3689.length != 0) this.e8.value = _local3689.join(";\n") + ";";else
	this.e8.value = "";
};
CssPanel.prototype.KN = function () {
	this.VP();
};


// History panel UI: shows doc.history list; current state = doc.historyIndex. Clicking an item triggers undo/redo to that index.
function HistoryPanel() {
	PanelTabBase.call(this, "History", !1, "---panels/history", PanelTabBase.xA.lv);
	this.DK.setAttribute("style", "min-width:200px;");
	this.jo = s.createElement("div", "hpbody scrollable");
	this.jo.style.height = "160px";
	this.DK.appendChild(this.jo);
	this.lastClickedHistoryIndex = -1; // last clicked list item index (avoid duplicate actions)
	this.historyListItems = []; // HistoryPanelListItem instances
	this.b_ = "";
	// this.PK = new ContextPanel([{
	// 	name: "Clear History"
	// }], [{
	// 	Y: ActionTypes.E.v,
	// 	G: f.lv,
	// 	W: {
	// 		a: "h_clear"
	// 	}
	// }]);
}
HistoryPanel.prototype = new PanelTabBase("");
HistoryPanel.prototype.xI = function () {
	return this.PK;
};
HistoryPanel.prototype.resize = function (l, d) {
	this.KN();
};
// Rebuild list from doc: one row per non-skip history state; d = index of selected (current) state for styling
HistoryPanel.prototype.Yw = function (l) {
	if (l == null) {
		s.clearChildren(this.jo);
		this.b_ = "";
		return;
	}
	s.clearChildren(this.jo);
	var _local3495 = 0;
	for (var _local3492 = 0; _local3492 < l.history.length; _local3492++)
	if (_local3492 <= l.historyIndex && !l.history[_local3492].skipInHistoryPanel) _local3495 = _local3492;
	for (var _local3492 = 0; _local3492 < l.history.length; _local3492++) {
		var _local3493 = l.history[_local3492];
		if (_local3493.skipInHistoryPanel) continue;
		var _local3494 = new HistoryPanelListItem(_local3493, _local3492, _local3495);
		_local3494.parent = this;
		this.jo.appendChild(_local3494.e);
		this.historyListItems.push(_local3494);
	}
	if (l.historyIndex == l.history.length - 1) this.KN();
};
HistoryPanel.prototype.KN = function () {
	this.jo.scrollTop = this.jo.scrollHeight;
};
HistoryPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	for (var _local3496 = 0; _local3496 < this.historyListItems.length; _local3496++) this.historyListItems[_local3496].refresh();
};

// One row in the History list: index = position in doc.history; click sends h_itemchange so History panel undos/redos to this index
function HistoryPanelListItem(l, A, d) {
	UIComponent.call(this);
	this.index = A;
	this.e = s.createElement("div", A == d ? "listitem selected" : "listitem");
	this.$w = l.name;
	this.refresh();
	if (A > d) this.e.style.opacity = .4;
	this.e.addEventListener("click", this.onHistoryItemClick.bind(this), !1);
}
HistoryPanelListItem.prototype = new UIComponent();
HistoryPanelListItem.prototype.refresh = function () {
	this.e.textContent = languageManager.get(this.$w);
};
HistoryPanelListItem.prototype.onHistoryItemClick = function (l) {
	if (this.index == this.parent.lastClickedHistoryIndex) return;
	this.dispatchHistoryAction({
		a: "h_itemchange",
		index: this.index
	});
};
HistoryPanelListItem.prototype.dispatchHistoryAction = function (l) {
	var _local3497 = new Action(ActionTypes.E.v, !0);
	_local3497.data = l;
	_local3497.G = f.lv;
	this.dispatch(_local3497);
};

function HistogramPanel() {
	PanelTabBase.call(this, "Historgram", !1, "---panels/histogram", PanelTabBase.xA.a7r);
	var _local3498 = s.createElement("div", "padded");
	this.DK.appendChild(_local3498);
	this.y9 = new LevelsHistogram(256, !0);
	_local3498.appendChild(this.y9.e);
	this.KP = null;
}
HistogramPanel.prototype = new PanelTabBase("");
HistogramPanel.prototype.Yw = function (l) {
	this.KP = l;
	this.VP();
};
HistogramPanel.prototype.VP = function () {
	var _local3506 = this.KP;
	if (!s.isInDocument(this.DK)) return;
	if (_local3506 == null || _local3506.g.length == 0) {
		this.y9.c(PixelUtil.histogramFromRgba(PixelUtil.allocBytes(4)));
		return;
	}
	var _local3505 = _local3506.LT(),
		_local3500 = new Rect(0, 0, _local3506.m, _local3506.n),
		_local3504 = _local3500.O();
	if (_local3506.P) {
		var _local3503 = _local3506.P.rect,
			_local3502 = PixelUtil.allocBytes(_local3503.O() * 4);
		PixelUtil.blitRgbaRect(_local3505, _local3500, _local3502, _local3503);
		PixelUtil.multiplyAlphaIntoRgba(_local3506.P.channel, _local3502);
		_local3505 = _local3502;
		_local3500 = _local3503;
		var _local3507 = _local3506.P.channel;
		_local3504 = 0;
		for (var _local3499 = 0; _local3499 < _local3507.length; _local3499++) _local3504 += _local3507[_local3499];
		_local3504 = Math.round(_local3504 / 255);
	}
	var _local3501 = PixelUtil.histogramFromRgba(_local3505);
	_local3501[0][255] += 3 * (_local3504 - _local3501[5]);
	for (var _local3499 = 1; _local3499 < 4; _local3499++) _local3501[_local3499][255] += _local3504 - _local3501[5];
	this.y9.c(_local3501, _local3504);
};
HistogramPanel.prototype.BM = function (l, d) {
	// this.y9.EB(ThemeManager.themes[l.j$]["--text-color"]);
};
HistogramPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.y9.refresh();
};
HistogramPanel.prototype.KN = function () {
	this.VP();
};

function SwatchesPanel() {
	PanelTabBase.call(this, "Swatches", !1, "---adj/clrL", PanelTabBase.xA.agA);
	this.pa = s.createElement("div", "padded");
	this.DK.appendChild(this.pa);
	this.Kz = new ColorSwatchStrip(10);
	this.pa.appendChild(this.Kz.e);
	this.JR = new SwatchPickerButton();
	this.JR.parent = this;
	this.pa.appendChild(this.JR.Sc);
	this.JR.Sc.style.marginTop = "6px";
	this.Kz.addListener(ActionTypes.E.A, this.ain, this);
	this.JR.addListener(ActionTypes.E.A, this.ain, this);
}
SwatchesPanel.prototype = new PanelTabBase("");
SwatchesPanel.prototype.ain = function (l) {
	var _local3510;
	if (l.target == this.Kz) _local3510 = this.Kz.b();else
	{
		var _local3508 = this.JR.b();
		_local3510 = Math.round(_local3508.o) << 16 | Math.round(_local3508.J) << 8 | Math.round(_local3508.k);
	}
	var _local3509 = new Action(ActionTypes.E.L, !0);
	_local3509.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.K5,
		y3: 0,
		Z: _local3510
	};
	this.dispatch(_local3509);
};
SwatchesPanel.dm = function (l, d) {
	var _local3511 = d == PsdResourceTypes.Wx,
		_local3514 = l.Xf,
		_local3513 = l.PB,
		_local3512 = _local3513.strokeStyleContent.v,
		_local3515 = null;
	if ((d == PsdResourceTypes.pc || _local3511) && _local3514.hA == 1) {
		_local3515 = PixelUtil.color.sampleGradientColor(_local3514.rU.Clr.v);
		_local3515 = _local3515.o << 16 | _local3515.J << 8 | _local3515.k;
	}
	if ((d == PsdResourceTypes.$o || _local3511) && _local3513.strokeEnabled.v && _local3512.classID == "solidColorLayer") {
		_local3515 = PixelUtil.color.sampleGradientColor(_local3512.Clr.v);
		_local3515 = _local3515.o << 16 | _local3515.J << 8 | _local3515.k;
	}
	if (d == PsdResourceTypes.K5 || _local3511) _local3515 = l.Y7;
	return _local3515;
};
SwatchesPanel.prototype.BM = function (l, d) {
	var _local3516 = l.Y7,
		_local3519 = d == PsdResourceTypes.Wx,
		_local3518 = SwatchesPanel.dm(l, d);
	if (_local3518 != null) {
		this.Kz.c(_local3518);
		this.JR.c({
			o: _local3518 >>> 16 & 255,
			J: _local3518 >>> 8 & 255,
			k: _local3518 >>> 0 & 255,
			X$: "Color #" + PixelUtil.intToHex6(_local3518)
		});
	}
	if (d == PsdResourceTypes.Sv || _local3519) {
		var _local3517 = l.ak1;
		this.JR.Z2(_local3517);
	}
};

function LevelsHistogram(l, d) {
	UIComponent.call(this);
	this.e = s.createElement("span", "");
	this.HA = new DropdownMenu([12, 4], ["RGB", [13, 1, 1],
	[13, 1, 4],
	[13, 1, 5],
	[12, 82]]
	);
	this.HA.addListener(ActionTypes.E.A, this.VP, this);
	this.e.appendChild(this.HA.e);
	s.appendBr(this.e);
	var _local520 = s.createElement("div");
	this.e.appendChild(_local520);
	_local520.setAttribute("style", "background-color: var(--bg-canvas); margin:6px 0;");
	this.T = s.createElement("canvas");
	var _local524 = this.T;
	_local520.appendChild(_local524);
	_local524.width = Math.round(l * s.getDevicePixelRatio());
	_local524.height = Math.round(100 * s.getDevicePixelRatio());
	s.setElementSizePx(_local524, _local524.width, _local524.height);
	_local524.style.display = "block";
	this.k_ = _local524.getContext("2d", { willReadFrequently: true });
	this.y9 = null;
	this.JU = 0;
	this.a3g = null;
	this.ayZ = [];
	this.xz = [];
	var _local523 = ["Mean:", "Pixels:"],
		_local522 = this.e;
	if (d)
	for (var _local519 = 0; _local519 < _local523.length; _local519++) {
		var _local525 = new LabelItem(_local523[_local519]);
		this.ayZ.push(_local525);
		_local522.appendChild(_local525.e);
		var _local521 = new LabelItem("hi");
		this.xz.push(_local521);
		_local522.appendChild(_local521.e);
		s.appendBr(_local522);
	}
}
LevelsHistogram.prototype = new UIComponent();
LevelsHistogram.prototype.refresh = function () {
	this.HA.refresh();
};
LevelsHistogram.prototype.dk = function (l) {
	this.HA.c(l);
	this.VP();
};
LevelsHistogram.prototype.c = function (l, d) {
	this.y9 = l;
	this.a3g = d;
	this.VP();
};
LevelsHistogram.prototype.EB = function (l) {
	if (l == this.JU) return;
	this.JU = l;
	this.VP();
};
LevelsHistogram.prototype.VP = function () {
	if (this.y9 == null) return;
	var _local533 = this.T,
		_local532 = this.k_,
		_local527 = this.y9,
		_local531 = this.a3g,
		_local530 = this.HA.b(),
		_local529 = 6e3 / _local527[4],
		_local534 = "#" + PixelUtil.intToHex6(this.JU),
		_local528 = LevelsHistogram.ail;
	_local533.width = _local533.width;
	_local532.setTransform(_local533.width / 256, 0, 0, -_local533.height / 100, 0, _local533.height);
	_local532.globalCompositeOperation = "lighter";
	if (_local530 == 0) _local528(_local532, _local527[0], _local529 / 3, _local534);else
	if (_local530 < 4) _local528(_local532, _local527[_local530], _local529, _local534);else
	{
		_local528(_local532, _local527[1], _local529, "#ff0000");
		_local528(_local532, _local527[2], _local529, "#00ff00");
		_local528(_local532, _local527[3], _local529, "#0000ff");
	}
	_local532.setTransform(1, 0, 0, 1, 0, 0);
	if (_local531 != null) {
		if (_local530 == 4) _local530 = 0;
		var _local535 = 0;
		for (var _local526 = 0; _local526 < 256; _local526++) _local535 += _local526 * _local527[_local530][_local526];
		if (_local530 == 0) _local535 /= 3;
		this.xz[0].c((_local535 / _local531).toFixed(1) + "");
		this.xz[1].c(_local531 + "");
	}
};
LevelsHistogram.ail = function (l, d, G, b) {
	l.beginPath();
	l.moveTo(0, 0);
	for (var _local536 = 0; _local536 < 256; _local536++) l.lineTo(_local536, d[_local536] * G);
	l.lineTo(256, 0);
	l.closePath();
	l.fillStyle = b;
	l.fill();
};


function ColorMapCanvas(l, d) {
	UIComponent.call(this);
	this.KG = {
		o: 0,
		J: 0,
		k: 0
	};
	if (Math.abs(l - 256 / s.getDevicePixelRatio()) < 10) l = 256 / s.getDevicePixelRatio();
	var _local537 = this.e = s.createElement("div", "flexrow");
	_local537.style.position = "relative";
	var _local539 = this.a4P = s.createElement("div");
	_local537.appendChild(_local539);
	this.lE = new Point2D();
	this.UQ = new Point2D();
	this.YV = this.a6J.bind(this);
	this.l_ = this.am5.bind(this);
	this.T = s.createElement("canvas", "");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	this.T.width = this.T.height = 256;
	this.a8q = this.k_.getImageData(0, 0, 256, 256);
	this.aht = -1;
	this.auF = "";
	s.preventTouchAndGesture(this.T);
	s.addPointerDown(this.T, this.aem.bind(this));
	_local539.appendChild(this.T);
	this.agF = this.a4T.bind(this);
	this.agV = this.arn.bind(this);
	this.NJ = s.createElement("canvas", "");
	this.I1 = this.NJ.getContext("2d", { willReadFrequently: true });
	this.NJ.width = 20;
	this.NJ.height = 256;
	this.auA = this.I1.getImageData(0, 0, 20, 256);
	ColorMapCanvas.ayQ(this.auA.data, 20, 256);
	s.preventTouchAndGesture(this.NJ);
	s.addPointerDown(this.NJ, this.akG.bind(this));
	_local537.appendChild(this.NJ);
	this.T.setAttribute("style", "width:" + l + "px; height:" + l + "px");
	this.NJ.setAttribute("style", "width:16px; height:" + l + "px");
	this.J$ = new CheckboxControl("Web Colors\u2001");
	this.J$.addListener(ActionTypes.E.A, this.update, this);
	this.fg = new CheckboxControl("CMYK gamut");
	this.fg.addListener(ActionTypes.E.A, this.update, this);
	if (d) {
		s.appendBr(_local539);
		_local539.appendChild(this.J$.e);
		_local539.appendChild(this.fg.e);
	}
	var _local538 = this.Bb = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	_local537.appendChild(_local538);
}
ColorMapCanvas.prototype = new UIComponent();
ColorMapCanvas.prototype.resize = function (l, d) {
	this.T.style.width = this.a4P.style.width = l - 16 + "px";
};
ColorMapCanvas.prototype.c = function (l) {
	if (this.J$.b()) {
		var _local541 = JSON.parse(JSON.stringify(l));
		ColorMapCanvas.aj(_local541);
		var _local540 = this.b();
		if (_local541.o == _local540.o && _local541.J == _local540.J && _local541.k == _local540.k) l = this.KG;
	}
	this.KG = l;
	this.update();
};
ColorMapCanvas.prototype.b = function () {
	var _local542 = JSON.parse(JSON.stringify(this.KG));
	if (this.J$.b()) ColorMapCanvas.aj(_local542);
	return _local542;
};
ColorMapCanvas.prototype.update = function () {
	var _local553 = this.KG,
		_local551 = PixelUtil.rgbToHsb(_local553.o, _local553.J, _local553.k),
		_local544 = 18;
	if (_local551.qv == 0) _local551.Lm = this.lE.x / 255;
	if (_local551.Lm == 0 || _local551.qv == 0) _local551.Tq = (255 - this.HW(this.UQ.y)) / 255;
	if (_local551.qv != 0) this.lE.x = _local551.Lm * 255;
	this.lE.y = (1 - _local551.qv) * 255;
	this.UQ.y = (1 - _local551.Tq) * 255;
	var _local543 = this.a8q,
		_local550 = this.J$.b(),
		_local549 = this.fg.b(),
		_local547 = _local550 + "," + _local549;
	if (Math.abs(_local551.Tq - this.aht) > .002 || this.auF != _local547) {
		this.ab_(_local543.data, 256, 256, _local551.Tq, _local550, _local549);
		this.aht = _local551.Tq;
		this.auF = _local547;
	}
	var _local555 = this.k_;
	_local555.putImageData(_local543, 0, 0);
	_local543 = this.auA;
	_local555 = this.I1;
	_local555.putImageData(_local543, 0, 0);
	_local555.strokeStyle = "#ffffff";
	_local555.beginPath();
	_local555.moveTo(0, this.UQ.y);
	_local555.lineTo(20, this.UQ.y);
	_local555.lineWidth = 2;
	_local555.stroke();
	var _local556 = this.lE.y / 255,
		_local552 = parseFloat(this.T.style.width),
		_local546 = parseFloat(this.T.style.height),
		_local548 = this.Bb;
	_local548.setAttribute("width", _local544);
	_local548.setAttribute("height", _local544);
	var _local545 = Math.round(_local553.o * 255) << 16 | Math.round(_local553.J * 255) << 8 | Math.round(_local553.k * 255),
		_local554 = "<circle cx=\"" + _local544 / 2 + "\" cy=\"" + _local544 / 2 + "\" r=\"" + _local544 / 2 + "\" fill=\"#" + PixelUtil.intToHex6(_local545) + "\"></circle>";
	_local554 += "<circle cx=\"" + _local544 / 2 + "\" cy=\"" + _local544 / 2 + "\" r=\"" + (-.5 + _local544 / 2) + "\" fill=\"none\" stroke=\"rgba(255,255,255," + (.5 - .2 * _local556) + ")\" stroke-width=\"1\"></circle>";
	_local554 += "<circle cx=\"" + _local544 / 2 + "\" cy=\"" + _local544 / 2 + "\" r=\"" + (-1.2 + _local544 / 2) + "\" fill=\"none\" stroke=\"rgba(0,0,0,0.07)\" stroke-width=\"0.4\"></circle>";
	_local548.innerHTML = _local554;
	_local548.style.pointerEvents = "none";
	_local548.style.filter = "drop-shadow(0px 3px 2px rgba(0,0,0,0.4)";
	_local548.style.position = "absolute";
	_local548.style.left = _local552 * (this.lE.x / 255) - _local544 / 2 + "px";
	_local548.style.top = _local546 * (this.lE.y / 255) - _local544 / 2 + "px";
};
ColorMapCanvas.aj = function (l) {
	l.o = ~~(.5 + l.o * 5) * .2;
	l.J = ~~(.5 + l.J * 5) * .2;
	l.k = ~~(.5 + l.k * 5) * .2;
};
ColorMapCanvas.prototype.ab_ = function (l, d, G, b, V, Q) {
	var _local568 = 1 / d,
		_local558 = 1 / G;
	for (var _local569 = 0; _local569 < G; _local569++)
	for (var _local563 = 0; _local563 < d; _local563++) {
		var _local560 = PixelUtil.hsbToRgb(b, _local563 * _local568, (G - _local569 - 1) * _local558);
		if (V) ColorMapCanvas.aj(_local560);
		var _local557 = _local569 * d + _local563 << 2;
		l[_local557 + 0] = ~~(_local560.o * 255);
		l[_local557 + 1] = ~~(_local560.J * 255);
		l[_local557 + 2] = ~~(_local560.k * 255);
		l[_local557 + 3] = 255;
	}
	if (Q) {
		var _local561 = l.slice(0),
			_local559 = PsdDocument.T2[0],
			_local566 = PsdDocument.T2[1];
		ICC.U.applyLUT(_local566, _local559, _local561, _local561);
		for (var _local557 = 0; _local557 < l.length; _local557 += 4) {
			var _local567 = l[_local557] - _local561[_local557],
				_local562 = l[_local557 + 1] - _local561[_local557 + 1],
				_local565 = l[_local557 + 2] - _local561[_local557 + 2],
				_local564 = _local567 * _local567 + _local562 * _local562 + _local565 * _local565;
			if (_local564 > 300) l[_local557] = l[_local557 + 1] = l[_local557 + 2] = 200;
		}
	}
};
ColorMapCanvas.ayQ = function (l, d, G, b, V) {
	if (b == null) b = 1;
	if (V == null) V = 0;
	var _local571 = new Uint32Array(l.buffer);
	for (var _local573 = 0; _local573 < G; _local573++) {
		var _local570 = PixelUtil.hsbToRgb((1 + b * (1 - _local573 / G) + V) % 1, 1, 1),
			_local574 = 255 << 24 | _local570.k * 255 << 16 | _local570.J * 255 << 8 | _local570.o * 255;
		for (var _local572 = 0; _local572 < d; _local572++) _local571[_local573 * d + _local572] = _local574;
	}
};
ColorMapCanvas.prototype.aem = function (l) {
	s.addPointerMove(window, this.YV);
	s.addPointerUp(window, this.l_);
	this.a6J(l);
	this.Bb.style.transition = "transform 150ms cubic-bezier(.4,2.2,.6,.5)";
	this.Bb.style.transform = "scale(2.4)";
};
ColorMapCanvas.prototype.am5 = function (l) {
	s.removePointerMove(window, this.YV);
	s.removePointerUp(window, this.l_);
	this.Bb.style.transition = "transform 200ms cubic-bezier(.4,2.2,.6,.5)";
	this.Bb.style.transform = "scale(1)";
};
ColorMapCanvas.prototype.a6J = function (l) {
	var _local575 = s.getEventPositionInElement(l, this.T);
	_local575.x = _local575.x * (256 / parseFloat(this.T.style.width));
	_local575.y = _local575.y * (256 / parseFloat(this.T.style.height));
	this.lE.T6(this.HW(_local575.x), this.HW(_local575.y));
	this.Rx();
};
ColorMapCanvas.prototype.Rx = function () {
	this.KG = this.a9Z();
	this.dispatch(new Action(ActionTypes.E.A));
};
ColorMapCanvas.prototype.a9Z = function () {
	var _local576 = PixelUtil.hsbToRgb((255 - this.HW(this.UQ.y)) / 255, this.Ks(this.lE.x / 255), this.Ks(1 - this.lE.y / 255));
	return {
		o: _local576.o,
		J: _local576.J,
		k: _local576.k
	};
};
ColorMapCanvas.prototype.akG = function (l) {
	s.addPointerMove(window, this.agF);
	s.addPointerUp(window, this.agV);
	this.a4T(l);
};
ColorMapCanvas.prototype.arn = function (l) {
	s.removePointerMove(window, this.agF);
	s.removePointerUp(window, this.agV);
};
ColorMapCanvas.prototype.a4T = function (l) {
	var _local577 = s.getEventPositionInElement(l, this.NJ);
	_local577.y = _local577.y * (256 / parseFloat(this.NJ.style.height));
	this.UQ.T6(this.HW(_local577.x), this.HW(_local577.y));
	this.Rx();
};
ColorMapCanvas.prototype.HW = function (l) {
	return Math.max(0, Math.min(255, l));
};
ColorMapCanvas.prototype.Ks = function (l) {
	return Math.max(0, Math.min(1, l));
};

function IconButtonGroupMenu(l, d, G, b) {
	var _local578 = ButtonGroupMenu.Ze(d, b);
	ButtonGroupMenu.call(this, l, _local578, G);
}
IconButtonGroupMenu.prototype = new ButtonGroupMenu();

function TypeToolPanel() {
	UIComponent.call(this);
	this.wQ = null;
	this.re = new FontInput();
	this.re.addListener(ActionTypes.E.A, this.ame, this);
	this.re.parent = this;
	this.rk = new RangeDropInput([12, 14, 0], 1, 150, "px", 0, !0);
	this.rk.addListener(ActionTypes.E.A, this.s4, this);
	this.rk.parent = this;
	this.tV = new RangeDropInput([16, 0], .01, 100, "px", 2, !0, null, 5);
	this.tV.addListener(ActionTypes.E.A, this.s4, this);
	this.tV.parent = this;
	this.Ha = new CheckboxControl("Auto");
	this.Ha.addListener(ActionTypes.E.A, this.s4, this);
	this.yX = new RangeDropInput([16, 1], -500, 5e3, "%", 0, !0);
	this.yX.addListener(ActionTypes.E.A, this.s4, this);
	this.yX.parent = this;
	this.eo = new RangeDropInput("\u2B0D", 1, 300, "%", null, null, null, null, [
	[2, 7],
	[22, 4, 3]]
	);
	this.eo.addListener(ActionTypes.E.A, this.s4, this);
	this.eo.parent = this;
	this.UC = new RangeDropInput("\u2B0C", 1, 300, "%", null, null, null, null, [
	[2, 7],
	[22, 4, 2]]
	);
	this.UC.addListener(ActionTypes.E.A, this.s4, this);
	this.UC.parent = this;
	this.SI = new RangeDropInput([16, 2], -10, 10, "px");
	this.SI.addListener(ActionTypes.E.A, this.s4, this);
	this.SI.parent = this;
	this.xV = new ColorSwatch(!0);
	this.xV.addListener(ActionTypes.E.A, this.Nr, this);
	this.xV.parent = this;
	this.vP = new ColorSwatch(!0);
	this.vP.addListener(ActionTypes.E.A, this.Nr, this);
	this.vP.parent = this;
	this.BW = new ColorSwatch(!0);
	this.BW.addListener(ActionTypes.E.A, this.Nr, this);
	this.BW.parent = this;
	this.$j = new ColorSwatch(!0);
	this.$j.addListener(ActionTypes.E.A, this.Nr, this);
	this.$j.parent = this;
	this.eA = new CheckboxControl([2, 3]);
	this.eA.addListener(ActionTypes.E.A, this.s4, this);
	this.aV = new CheckboxControl([14, 9]);
	this.aV.addListener(ActionTypes.E.A, this.s4, this);
	this.Qp = new CheckboxControl([12, 46]);
	this.Qp.addListener(ActionTypes.E.A, this.s4, this);
	this.rz = new ToolbarButton("...", null, null, !0);
	this.rz.e.style.marginLeft = "-8px";
	s.addPointerDown(this.rz.e, this.adc.bind(this));
	this.hg = new UIComponent();
	var _local585 = this.hg.e = s.createElement("div", "floatcont form"),
		_local582 = 100;
	this.hg.parent = this;
	this.pU = new RangeDropInput([12, 41], 1, 20, "px", 0, !0, !0);
	this.pU.e.style.marginLeft = "16px";
	this.pU.addListener(ActionTypes.E.A, this.s4, this);
	this.pU.parent = this.hg;
	_local585.appendChild(this.vP.e);
	_local585.appendChild(this.eA.e);
	s.appendBr(this.hg.e);
	_local585.appendChild(this.BW.e);
	_local585.appendChild(this.aV.e);
	_local585.appendChild(this.pU.e);
	s.appendBr(this.hg.e);
	_local585.appendChild(this.$j.e);
	_local585.appendChild(this.Qp.e);
	this.d2 = new ToolbarButton("<img src=\"" + PIMG["type/bold"] + "\" class=\"autoscale gsicon\" />");
	this.pY = new ToolbarButton("<img src=\"" + PIMG["type/italic"] + "\" class=\"autoscale gsicon\" />");
	this.Qv = new ToolbarButton("<img src=\"" + PIMG["type/caps"] + "\" class=\"autoscale gsicon\" />");
	this.qO = new ToolbarButton("<img src=\"" + PIMG["type/scaps"] + "\" class=\"autoscale gsicon\" />");
	this.q0 = new ToolbarButton("<img src=\"" + PIMG["type/sub"] + "\" class=\"autoscale gsicon\" />");
	this.FQ = new ToolbarButton("<img src=\"" + PIMG["type/sup"] + "\" class=\"autoscale gsicon\" />");
	this.h3 = new ToolbarButton("<img src=\"" + PIMG["type/under"] + "\" class=\"autoscale gsicon\" />");
	this.QQ = new ToolbarButton("<img src=\"" + PIMG["type/strike"] + "\" class=\"autoscale gsicon\" />");
	var _local584 = [this.d2, this.pY, this.Qv, this.qO, this.q0, this.FQ, this.h3, this.QQ];
	for (var _local579 = 0; _local579 < _local584.length; _local579++) _local584[_local579].addListener("click", this.ab2, this);
	this.eM = new ToolbarButton("<img src=\"" + PIMG["par/left"] + "\" class=\"autoscale gsicon\" />");
	this.j7 = new ToolbarButton("<img src=\"" + PIMG["par/right"] + "\" class=\"autoscale gsicon\" />");
	this.Bx = new ToolbarButton("<img src=\"" + PIMG["par/center"] + "\" class=\"autoscale gsicon\" />");
	this.art = new ToolbarButton("<img src=\"" + PIMG["par/jleft"] + "\" class=\"autoscale gsicon\" />");
	this.apN = new ToolbarButton("<img src=\"" + PIMG["par/jright"] + "\" class=\"autoscale gsicon\" />");
	this.alV = new ToolbarButton("<img src=\"" + PIMG["par/jcenter"] + "\" class=\"autoscale gsicon\" />");
	this.aez = new ToolbarButton("<img src=\"" + PIMG["par/jall"] + "\" class=\"autoscale gsicon\" />");
	this.gk = [this.eM, this.j7, this.Bx, this.art, this.apN, this.alV, this.aez];
	for (var _local579 = 0; _local579 < this.gk.length; _local579++) this.gk[_local579].addListener("click", this.s4, this);
	var _local580 = ["lind", "rind", "flind", "bind", "aind"],
		_local583 = [];
	for (var _local579 = 0; _local579 < 5; _local579++) _local583.push("<img src=\"" + PIMG["par/" + _local580[_local579]] + "\" class=\"autoscale gsicon\" /> ");
	this.z_ = new RangeDropInput(_local583[0], -_local582, _local582, "px");
	this.j3 = new RangeDropInput(_local583[1], -_local582, _local582, "px");
	this.k6 = new RangeDropInput(_local583[2], -_local582, _local582, "px");
	this.Bq = new RangeDropInput(_local583[3], -_local582, _local582, "px");
	this.Fg = new RangeDropInput(_local583[4], -_local582, _local582, "px");
	this.AB = new ButtonGroupMenu([12, 33], ["Abc ...", "... \u0623\u064A \u0628\u064A"]);
	this.a3 = new RangeDropInput(["Auto VAR0", [16, 0]], 0, 500, "%");
	this.ez = [this.z_, this.j3, this.k6, this.Bq, this.Fg, this.AB, this.a3];
	for (var _local579 = 0; _local579 < this.ez.length; _local579++) {
		var _local581 = this.ez[_local579];
		_local581.addListener(ActionTypes.E.A, this.s4, this);
		_local581.parent = this;
	}
}
TypeToolPanel.prototype = new UIComponent();
TypeToolPanel.prototype.adc = function (l) {
	if (s.isInDocument(this.hg.e)) return;
	l.stopPropagation();
	var _local587 = this.rz.e.getBoundingClientRect(),
		_local586 = new Action(ActionTypes.E.L, !0);
	_local586.data = {
		a: ActionTypes.$.dY,
		A3: this.hg,
		x: _local587.left,
		y: _local587.top + _local587.height + 4
	};
	this.dispatch(_local586);
};
TypeToolPanel.prototype.refresh = function () {
	this.re.refresh();
	this.rk.refresh();
	this.tV.refresh();
	this.yX.refresh();
	this.SI.refresh();
	this.eo.refresh();
	this.UC.refresh();
	this.eA.refresh();
	this.aV.refresh();
	this.Qp.refresh();
	this.pU.refresh();
	for (var _local588 = 0; _local588 < this.ez.length; _local588++) this.ez[_local588].refresh();
};
TypeToolPanel.prototype.c = function (l, d, G) {
	this.XG = JSON.parse(JSON.stringify(l));
	var _local593 = this.XG,
		_local592 = _local593.xg,
		_local591 = _local593.GB;
	this.d2.c(_local592.FauxBold != null ? _local592.FauxBold : !1);
	this.pY.c(_local592.FauxItalic != null ? _local592.FauxItalic : !1);
	this.Qv.c(_local592.FontCaps == 2);
	this.qO.c(_local592.FontCaps == 1);
	this.FQ.c(_local592.FontBaseline == 1);
	this.q0.c(_local592.FontBaseline == 2);
	this.h3.c(_local592.Underline);
	this.QQ.c(_local592.Strikethrough);
	this.re.c(_local592.Font == null ? null : _local593.rA[_local592.Font].Name, d, G);
	var _local595 = _local592.FontSize == null ? 20 : _local592.FontSize;
	this.rk.c(_local595);
	var _local590 = _local592.Tracking;
	this.yX.c(_local590 == null ? 0 : _local590);
	this.pU.c(_local592._LineWidth != null ? _local592._LineWidth : 1);
	this.tV.c(_local592.Leading != null && _local592.Leading != 0 ? _local592.Leading : _local595);
	this.Ha.c(_local592.AutoLeading);
	this.eo.c((_local592.VerticalScale != null ? _local592.VerticalScale : 0) * 100);
	this.UC.c((_local592.HorizontalScale != null ? _local592.HorizontalScale : 0) * 100);
	this.SI.c(_local592.BaselineShift != null ? _local592.BaselineShift : 0);
	this.eA.c(_local592.FillFlag != null ? _local592.FillFlag : !1);
	this.aV.c(_local592.StrokeFlag != null ? _local592.StrokeFlag : !1);
	this.Qp.c(_local592._FillBackgroundFlag != null ? _local592._FillBackgroundFlag : !1);
	this.d3(_local592.FillColor, this.xV);
	this.d3(_local592.FillColor, this.vP);
	this.d3(_local592.StrokeColor, this.BW);
	this.d3(_local592._FillBackgroundColor, this.$j);
	var _local596 = _local591._Direction != null ? _local591._Direction : 0,
		_local594 = dt.jw(_local591);
	for (var _local589 = 0; _local589 < this.gk.length; _local589++) this.gk[_local589].c(_local594 == _local589);
	this.AB.c(_local596);
	this.a3.c((_local591.AutoLeading != null ? _local591.AutoLeading : 1.2) * 100);
	this.z_.c(_local591.StartIndent != null ? _local591.StartIndent : 0);
	this.j3.c(_local591.EndIndent != null ? _local591.EndIndent : 0);
	this.k6.c(_local591.FirstLineIndent != null ? _local591.FirstLineIndent : 0);
	this.Bq.c(_local591.SpaceBefore != null ? _local591.SpaceBefore : 0);
	this.Fg.c(_local591.SpaceAfter != null ? _local591.SpaceAfter : 0);
};
TypeToolPanel.prototype.d3 = function (l, d) {
	if (l) {
		var _local597 = dt.cc(l);
		d.EB(Math.round(_local597.o) << 16 | Math.round(_local597.J) << 8 | Math.round(_local597.k));
	} else d.EB(0);
};
TypeToolPanel.prototype.B5 = function () {
	var _local598 = new Action(ActionTypes.E.L, !0);
	_local598.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.o$,
		XG: this.XG
	};
	this.dispatch(_local598);
	var _local598 = new Action(ActionTypes.E.v, !0);
	_local598.G = f.zl;
	_local598.data = {
		a: "updateStyles"
	};
	this.dispatch(_local598);
};
TypeToolPanel.prototype.ab2 = function (l) {
	var _local601 = this.XG.xg,
		_local599 = l.target,
		_local600 = !_local599.dB();
	if (_local599 == this.d2) _local601.FauxBold = _local600;
	if (_local599 == this.pY) _local601.FauxItalic = _local600;
	if (_local599 == this.Qv) _local601.FontCaps = _local600 ? 2 : 0;
	if (_local599 == this.qO) _local601.FontCaps = _local600 ? 1 : 0;
	if (_local599 == this.FQ) _local601.FontBaseline = _local600 ? 1 : 0;
	if (_local599 == this.q0) _local601.FontBaseline = _local600 ? 2 : 0;
	if (_local599 == this.h3) _local601.Underline = _local600;
	if (_local599 == this.QQ) _local601.Strikethrough = _local600;
	this.B5();
};
TypeToolPanel.prototype.s4 = function (l) {
	var _local605 = this.XG.xg,
		_local602 = this.XG.GB,
		_local604 = l.target;
	if (_local604 == this.yX) {
		var _local603 = this.yX.b();
		_local605.Tracking = _local603;
	}
	if (_local604 == this.tV) {
		_local605.AutoLeading = !1;
		_local605.Leading = this.tV.b();
	}
	if (_local604 == this.Ha) {
		_local605.AutoLeading = this.Ha.b();
	}
	if (_local604 == this.pU) _local605._LineWidth = _local604.b();
	if (_local604 == this.rk) _local605.FontSize = _local604.b();
	if (_local604 == this.eo) _local605.VerticalScale = _local604.b() / 100;
	if (_local604 == this.UC) _local605.HorizontalScale = _local604.b() / 100;
	if (_local604 == this.SI) _local605.BaselineShift = _local604.b();
	if (_local604 == this.eA) _local605.FillFlag = _local604.b();
	if (_local604 == this.aV) _local605.StrokeFlag = _local604.b();
	if (_local604 == this.Qp) _local605._FillBackgroundFlag = _local604.b();
	if (this.gk.indexOf(_local604) != -1) {
		_local602.Justification = dt.jw(_local602, this.gk.indexOf(_local604));
	}
	if (_local604 == this.z_) _local602.StartIndent = _local604.b();
	if (_local604 == this.j3) _local602.EndIndent = _local604.b();
	if (_local604 == this.k6) _local602.FirstLineIndent = _local604.b();
	if (_local604 == this.Bq) _local602.SpaceBefore = _local604.b();
	if (_local604 == this.Fg) _local602.SpaceAfter = _local604.b();
	if (_local604 == this.AB) _local602._Direction = _local604.b();
	if (_local604 == this.a3) _local602.AutoLeading = _local604.b() / 100;
	this.B5();
};
TypeToolPanel.prototype.ame = function (l) {
	var _local610 = this.XG,
		_local607 = this.re.b(),
		_local609 = -1;
	for (var _local606 = 0; _local606 < _local610.rA.length; _local606++)
	if (_local610.rA[_local606].Name == _local607) _local609 = _local606;
	if (_local609 == -1) {
		_local609 = _local610.rA.length;
		var _local608 = JSON.parse(JSON.stringify(_local610.rA[0]));
		_local608.Name = _local607;
		_local610.rA.splice(_local609, 0, _local608);
	}
	_local610.xg.Font = _local609;
	this.B5();
};
TypeToolPanel.prototype.Nr = function (l) {
	var _local615 = l.target,
		_local612 = _local615.abZ(),
		_local614 = {
			Type: 1,
			Values: [1, (_local612 >> 16 & 255) / 255, (_local612 >> 8 & 255) / 255, (_local612 >> 0 & 255) / 255]
		};
	for (var _local611 = 0; _local611 < 4; _local611++) _local614.Values[_local611] = Math.round(_local614.Values[_local611] * 1e3) / 1e3;
	var _local613 = _local615 == this.xV || _local615 == this.vP ? 0 : _local615 == this.BW ? 1 : 2;
	this.XG.xg[["FillColor", "StrokeColor", "_FillBackgroundColor"][_local613]] = _local614;
	this.B5();
};

function FontInput() {
	UIComponent.call(this);
	this.e = s.createElement("span", "fontinput");
	this.tD = null;
	this.IT = null;
	this.$v = null;
	this.GT = "";
	this.k3 = {};
	this.zz = [];
	this.Sj = {};
	this.aaN = {};
	this.Kz = [];
	this.lj = !1;
	this.F_ = s.createElement("button", "fitem");
	this.F_.setAttribute("style", "width:9em;");
	this.F_.textContent = "Family Name \u25BC";
	this.e.appendChild(this.F_);
	s.addPointerDown(this.F_, this.asW.bind(this));
	this.BP = new UIComponent();
	this.BP.parent = this;
	var _local619 = this.BP.e = s.createElement("div", "floatcont");
	_local619.style.padding = "7px 7px 3px 7px";
	var _local618 = new LabelItem("Recent");
	_local619.appendChild(_local618.e);
	var _local616 = this.ajW = new ToolbarButton("Load Font", !1, "Load OTF / TTF file from your computer", !0);
	_local616.addListener("click", this.a7e, this);
	_local616.e.style.float = "right";
	_local619.appendChild(_local616.e);
	s.appendBr(_local619);
	this.Sf = s.createElement("span", "fitem imageset scrollable");
	this.Sf.style.maxHeight = "8em";
	_local619.appendChild(this.Sf);
	var _local617 = s.createElement("div", "form");
	this.BP.e.appendChild(_local617);
	this.$_ = new ToolbarButton(s.getIconImgHtml("tools/cshape", null, "autoscale"), !1, "Show Favorites Only");
	this.$_.addListener("click", this.adX, this);
	_local617.appendChild(this.$_.e);
	this.WT = new TextInput([12, 86], null, 7.5);
	this.WT.addListener("input", this.SD, this);
	_local617.appendChild(this.WT.e);
	this.NI = new MenuButton(6.8, "\u2630");
	_local617.appendChild(this.NI.e);
	this.NI.parent = this.BP;
	this.NI.addListener(ActionTypes.E.A, this.O3, this);
	this.NI.e.style.float = "right";
	this.NI.e.style.marginRight = "0";
	this.DL = s.createElement("span", "fitem imageset scrollable");
	this.DL.style.height = "30em";
	this.BP.e.appendChild(this.DL);
	this.DL.addEventListener("scroll", this.anV.bind(this), !1);
	this.TT = s.createElement("button", "fitem");
	this.TT.setAttribute("style", "width:7em;");
	this.TT.textContent = "SubFamily Name \u25BC";
	this.e.appendChild(this.TT);
	s.addPointerDown(this.TT, this.asW.bind(this));
	this.gv = new UIComponent();
	this.gv.parent = this;
	this.gv.e = s.createElement("div", "floatcont");
	this.Hb = s.createElement("span", "fitem imageset scrollable");
	this.gv.e.appendChild(this.Hb);
	this.afY = this.aig.bind(this);
	this.aAt = this.av2.bind(this);
}
FontInput.prototype = new UIComponent();
FontInput.prototype.anV = function (l) {
	var _local624 = this.DL.scrollTop,
		_local621 = this.zz,
		_local623 = Math.floor(_local624 / 27),
		_local622 = Math.min(_local623 + 20, _local621.length);
	for (var _local620 = _local623; _local620 < _local622; _local620++) this.ahU(_local621[_local620]);
};
FontInput.prototype.a7e = function () {
	var _local625 = new Action(ActionTypes.E.L, !0);
	_local625.data = {
		a: ActionTypes.$.Um,
		aux: ".otf,.ttf,.ttc"
	};
	this.dispatch(_local625);
};
FontInput.prototype.refresh = function () {
	this.NI.refresh();
	this.ajW.refresh();
	this.$_.setLabel(s.getIconImgHtml("tools/cshape", null, "autoscale"));
};
FontInput.prototype.adX = function (l) {
	this.$_.c(!this.$_.dB());
	this.O3();
};
FontInput.prototype.SD = function (l) {
	this.GT = this.WT.b().toLowerCase();
	this.O3();
};
FontInput.prototype.asW = function (l) {
	s.stopAndPreventHandler(l);
	var _local630 = l.currentTarget,
		_local626 = _local630.getBoundingClientRect(),
		_local629 = _local630 == this.F_,
		_local628 = _local629 ? this.BP : this.gv;
	if (s.isInDocument(_local628.e)) {
		this.amb(_local628);
		return;
	}
	if (!_local629 && this.tD.H7()[this.$v] == null) return;
	var _local627 = new Action(ActionTypes.E.L, !0);
	_local627.data = {
		a: ActionTypes.$.dY,
		A3: _local628,
		x: _local626.left,
		y: _local626.top + _local626.height
	};
	this.dispatch(_local627);
	if (_local629) {
		this.O3(null, !0);
	}
};
FontInput.prototype.aig = function (l) {
	var _local634 = l.currentTarget.firstChild.nextSibling.textContent;
	if (l.target.tagName.toLowerCase() == "button") {
		var _local631 = this.IT.slice(0),
			_local633 = _local631.indexOf(_local634);
		if (_local633 == -1) {
			_local631 = _local631.slice(Math.max(0, _local631.length - 29));
			_local631.push(_local634);
		} else _local631.splice(_local633, 1);
		var _local632 = new Action(ActionTypes.E.L, !0);
		_local632.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.GG,
			mz: _local631
		};
		this.dispatch(_local632);
		this.lj = !0;
		this.O3();
	} else {
		this.am$(_local634, null);
	}
};
FontInput.prototype.av2 = function (l) {
	this.am$(null, l.currentTarget.firstChild.textContent);
};
FontInput.prototype.am$ = function (l, d) {
	var _local635 = l == null ? this.gv : this.BP,
		_local638 = this.tD;
	if (l == null) l = _local638.H7()[this.$v][0];else
	{
		var _local637 = _local638.Th(l),
			_local636 = _local638.H7()[this.$v];
		d = FontHelper.bw(_local637, _local636 ? _local636[1] : "regular");
	}
	var _local639 = _local638.FX(l, d)[2];
	this.c(_local639, _local638);
	this.dispatch(new Action(ActionTypes.E.A, !1));
	this.amb(_local635);
	this.O3();
};
FontInput.prototype.amb = function (l) {
	var _local640 = new Action(ActionTypes.E.L, !0);
	_local640.data = {
		a: ActionTypes.$.qH,
		A3: l
	};
	this.dispatch(_local640);
};
FontInput.prototype.b = function () {
	return this.$v;
};
FontInput.prototype.c = function (l, d, G) {
	var _local646 = this.tD;
	if (l != null) this.$v = l;else
	l = this.$v;
	this.tD = d;
	this.IT = G;
	if (l != null) {
		var _local645 = d.H7()[l],
			_local644,_local648;
		if (_local645 == null) {
			_local644 = "- " + l;
			_local648 = "-------";
		} else {
			_local644 = _local645[0];
			_local648 = _local645[1];
			var _local642 = this.Kz;
			for (var _local641 = 0; _local641 < _local642.length; _local641++)
			if (_local642[_local641][0][0] == _local644) _local642.splice(_local641, 1);
			_local642.push([_local645, Date.now()]);
			_local642.sort(function (R, J) {
				return J[1] - R[1];
			});
			_local642 = _local642.slice(0, 10);
			s.clearChildren(this.Sf);
			for (var _local641 = 1; _local641 < _local642.length; _local641++) {
				var _local649 = _local642[_local641][0],
					_local647 = this.ei(_local649, !0);
				this.Ai(_local647, _local649, !0);
				this.Sf.appendChild(_local647);
			}
			var _local643 = d.Th(_local644);
			_local643.sort(FontHelper.aok);
			this.Hb.textContent = "";
			for (var _local641 = 0; _local641 < _local643.length; _local641++) {
				var _local645 = d.FX(_local644, _local643[_local641]);
				if (!this.NI.wu(_local645)) continue;
				var _local647 = this.ei(_local645, !1);
				this.Hb.appendChild(_local647);
			}
		}
		this.F_.textContent = _local644.substring(0, 15) + " \u25BC";
		this.F_.setAttribute("title", _local644 + ", \"" + l + "\"");
		this.TT.textContent = _local648.substring(0, 10) + " \u25BC";
		this.TT.setAttribute("title", _local648);
	}
};
FontInput.prototype.O3 = function (l, d) {
	var _local651 = this.tD.H7()[this.$v],
		_local659 = this.IT,
		_local658 = this.tD.OV();
	this.zz = [];
	for (var _local655 in _local658) {
		var _local663 = _local659.indexOf(_local655) != -1,
			_local652 = this.tD.Th(_local655),
			_local664 = !1;
		for (var _local650 = 0; _local650 < _local652.length; _local650++) {
			var _local660 = this.tD.FX(_local655, _local652[_local650]),
				_local654 = !0;
			if (this.GT.length > 0 && _local660[0].toLowerCase().indexOf(this.GT) == -1) _local654 = !1;else
			if (!this.NI.wu(_local660)) _local654 = !1;else
			if (this.$_.dB() && !_local663) _local654 = !1;
			if (_local654) _local664 = !0;
		}
		var _local656 = this.k3[_local655];
		if (_local656 == null) {
			var _local653 = FontHelper.bw(_local658[_local655], "regular"),
				_local661 = this.tD.FX(_local655, _local653),
				_local656 = this.ei(_local661, !0);
			this.k3[_local655] = _local656;
			this.DL.appendChild(_local656);
			this.Sj[_local655] = "[true,false,false]";
		}
		if (_local664) this.zz.push(_local655);
		var _local662 = _local651 != null && _local651[0] == _local655;
		this.aaN[_local655] = "[" + _local664 + "," + _local662 + "," + _local663 + "]";
		if (!d) this.ahU(_local655);
	}
	if (_local651 && !this.lj) {
		var _local657 = this.k3[_local651[0]];
		this.DL.scrollTop = _local657.offsetTop - 210;
	}
	this.anV();
	this.lj = !1;
};
FontInput.prototype.ahU = function (l) {
	var _local670 = this.k3[l];
	if (_local670.firstChild == null) {
		var _local665 = this.tD.OV(),
			_local669 = FontHelper.bw(_local665[l], "regular"),
			_local668 = this.tD.FX(l, _local669);
		this.Ai(_local670, _local668, !0);
	}
	var _local667 = this.Sj[l],
		_local672 = this.aaN[l];
	if (_local667 == _local672) return;
	var _local666 = JSON.parse(_local667),
		_local673 = JSON.parse(_local672);
	if (_local666[0] != _local673[0] || _local666[1] != _local673[1]) {
		var _local671 = _local673[0] ? "" : "display:none; ";
		if (_local673[1]) _local671 += "background-color:rgba(0,0,0,0.13);";
		_local670.setAttribute("style", _local671);
	}
	if (_local666[2] != _local673[2]) _local670.firstChild.setAttribute("style", "opacity: " + (_local673[2] ? "1" : "0.2"));
	this.Sj[l] = _local672;
};
FontInput.prototype.ei = function (l, d) {
	var _local674 = s.createElement("div", "fontitem");
	if (!d) this.Ai(_local674, l, d);
	return _local674;
};
FontInput.prototype.Ai = function (l, d, G) {
	var _local682 = d[G ? 0 : 1],
		_local681 = G ? this.afY : this.aAt,
		_local688 = "";
	l.addEventListener("click", _local681, !1);
	if (G) l.appendChild(s.createElement("button", "star"));
	var _local678 = s.createElement("span", "label");
	_local678.setAttribute("title", _local682);
	_local678.textContent = _local682;
	l.appendChild(_local678);
	var _local687 = s.getDevicePixelRatio(),
		_local675 = 1 / _local687,
		_local683 = FontHelper.IM * _local675,
		_local677 = FontHelper.vm * _local675;
	if (1 < _local687 && _local687 < 1.5) _local688 = "width:" + _local683 + "px; height:" + _local677 + "px;";
	var _local679 = s.createElement("span", "thumb gsicon");
	if (d.a1u) {
		_local688 += "background: url(" + d.a1u + ");";
		if (1 < _local687 && _local687 < 1.5) _local688 += "background-size: " + _local683 + "px " + _local677 + "px;";
	} else {
		var _local676 = Math.ceil(FNTS.list.length / FontHelper.cols),
			_local685 = Math.floor(d.sy / _local676),
			_local686 = d.sy % _local676,
			_local680 = _local685 * FontHelper.IM,
			_local684 = _local686 * FontHelper.vm;
		if (1 < _local687 && _local687 < 1.5) {
			_local688 += "background-size: " + FontHelper.cols * _local683 + "px " + _local676 * _local677 + "px;";
			_local680 *= _local675;
			_local684 *= _local675;
		}
		_local688 += "background-position:-" + _local680 + "px -" + _local684 + "px;";
	}
	_local679.setAttribute("style", _local688);
	l.appendChild(_local679);
};

function MenuButton(l, d) {
	UIComponent.call(this);
	this.e = s.createElement("button", "fitem bbtn");
	this.e.addEventListener("click", this.asS.bind(this), !1);
	this.hg = new UIComponent();
	this.hg.e = s.createElement("div", "floatcont");
	this.hg.parent = this;
	this.Og = s.createElement("div", "flexrow");
	this.hg.e.appendChild(this.Og);
	this.ur = d;
	this.Cp = [];
	this.M6 = [];
	var _local690 = this.Og,
		_local693 = s.createElement("div", ""),
		_local692 = s.createElement("div", "");
	_local690.appendChild(_local693);
	_local690.appendChild(_local692);
	this.JJ = [];
	for (var _local689 = 0; _local689 < FNTS.cats.length; _local689++) this.JJ.push({
		name: FNTS.cats[_local689],
		index: _local689,
		hU: 0
	});
	this.Ao = new CheckboxControl([7, 0]);
	this.Ao.c(!0);
	this.Ao.addListener(ActionTypes.E.A, this.anI, this);
	_local693.appendChild(this.Ao.e);
	this.tE = s.createElement("div", "vlist marged scrollable");
	this.tE.setAttribute("style", "width:10.3em; height:" + l + "em; ");
	_local693.appendChild(this.tE);
	this.ir = [];
	for (var _local689 = 0; _local689 < this.JJ.length; _local689++) {
		var _local691 = this.JJ[_local689],
			_local694 = new CheckboxControl(_local691.name);
		this.ir.push(_local694);
		_local694.addListener(ActionTypes.E.A, this.a2A, this);
		_local694.c(!0);
		this.tE.appendChild(_local694.e);
		this.Cp.push(1);
	}
	this.aiv = new CheckboxControl([7, 0]);
	this.aiv.addListener(ActionTypes.E.A, this.aq8, this);
	this.zc = s.createElement("div", "vlist marged scrollable");
	this.zc.setAttribute("style", "width:8.6em; height:" + (l + 1.5) + "em; ");
	_local692.appendChild(this.zc);
	this.Gh = [];
	for (var _local689 = 0; _local689 < FNTS.subsetNames.length; _local689++) {
		var _local694 = new CheckboxControl(FNTS.subsetNames[_local689]);
		this.Gh.push(_local694);
		_local694.addListener(ActionTypes.E.A, this.ahg, this);
		_local694.c(!1);
		this.zc.appendChild(_local694.e);
		this.M6.push(_local694.b() ? 1 : 0);
	}
}
MenuButton.prototype = new UIComponent();
MenuButton.prototype.aib = function (l) {
	var _local697 = this.Gh;
	for (var _local695 = 0; _local695 < _local697.length; _local695++) {
		var _local696 = (l >>> _local695 & 1) == 1;
		this.M6[_local695] = _local696;
		_local697[_local695].c(_local696);
	}
};
MenuButton.prototype.ag2 = function () {
	return this.Og;
};
MenuButton.prototype.refresh = function () {
	this.e.textContent = this.ur ? this.ur : "Font Filter \u25BC";
	this.Ao.refresh();
	this.aiv.refresh();
};
MenuButton.prototype.asS = function (l) {
	var _local699 = this.e.getBoundingClientRect(),
		_local698 = new Action(ActionTypes.E.L, !0);
	_local698.data = {
		a: ActionTypes.$.dY,
		A3: this.hg,
		x: _local699.left,
		y: _local699.top + _local699.height,
		XC: !1
	};
	this.dispatch(_local698);
};
MenuButton.prototype.wu = function (l) {
	if (this.Cp[l[4]] == 0) return !1;else

	for (var _local700 = 0; _local700 < this.M6.length; _local700++)
	if (this.M6[_local700] == 1 && (l[3] >>> _local700 & 1) == 0) return !1;return !0;
};
MenuButton.prototype.anI = function (l) {
	var _local704 = l.target.b(),
		_local702 = this.ir,
		_local703 = this.Cp;
	for (var _local701 = 0; _local701 < _local702.length; _local701++) {
		_local702[_local701].c(_local704);
		_local703[_local701] = _local704 ? 1 : 0;
	}
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
MenuButton.prototype.aq8 = function (l) {
	var _local708 = l.target.b(),
		_local706 = this.Gh,
		_local707 = this.M6;
	for (var _local705 = 0; _local705 < _local706.length; _local705++) {
		_local706[_local705].c(_local708);
		_local707[_local705] = _local708 ? 1 : 0;
	}
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
MenuButton.prototype.a2A = function (l) {
	var _local709 = this.ir.indexOf(l.target),
		_local710 = this.JJ[_local709].index;
	this.Cp[_local710] = 1 - this.Cp[_local710];
	this.dispatch(new Action(ActionTypes.E.A, !1));
	this.a73(this.ir, this.Ao);
};
MenuButton.prototype.ahg = function (l) {
	var _local711 = this.Gh.indexOf(l.target);
	this.M6[_local711] = 1 - this.M6[_local711];
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
MenuButton.prototype.a73 = function (l, d) {
	var _local713 = !0;
	for (var _local712 = 0; _local712 < l.length; _local712++) _local713 = _local713 && l[_local712].b();
	d.c(_local713);
};

function FileLabelRow(l, d, G) {
	UIComponent.call(this);
	this.e = s.createElement(G ? "div" : "span");
	var _local747 = this.Bj = s.createElement("input");
	this.Bj.setAttribute("type", "file");
	if (d) _local747.setAttribute("multiple", "");
	this.Bj.addEventListener("change", this.aoP.bind(this), !1);
	this.a4G = this.aqb.bind(this);
	this._0 = {};
	this.tW = 0;
	this.IL = l;
	var _local746 = this.a4v = new ToolbarButton(languageManager.get(l) + " (0)", null, null, !0);
	this.e.appendChild(_local746.e);
	_local746.addEventListener("click", function (Q) {
		_local747.click();
	});
	if (G) {
		this.N0 = s.createElement("div", "scrollable");
		this.N0.setAttribute("style", "height:120px; width:100%; line-height:1.5em;");
		this.e.appendChild(this.N0);
		this.VP();
	}
}
FileLabelRow.prototype = new UIComponent();
FileLabelRow.prototype.c = function (l) {};
FileLabelRow.prototype.b = function (l) {
	return this._0;
};
FileLabelRow.prototype.aoP = function (l) {
	var _local751 = l.target.files;
	this.tW = _local751.length;
	this._0 = {};
	for (var _local748 = 0; _local748 < _local751.length; _local748++) {
		var _local749 = _local751[_local748],
			_local750 = new FileReader();
		_local750.onload = this.a4G;
		_local750.$w = _local749.name;
		_local750.readAsArrayBuffer(_local749);
	}
	this.a4v.setLabel(languageManager.get(this.IL) + " (" + _local751.length + ")");
};
FileLabelRow.prototype.aqb = function (l) {
	var _local752 = this._0[l.target.$w] = new Uint8Array(l.target.result);
	this.tW--;
	if (this.tW == 0) {
		if (this.N0) this.VP();
		this.dispatch(new Action(ActionTypes.E.A));
		this.Bj.value = null;
	}
};
FileLabelRow.prototype.VP = function () {
	var _local755 = this.N0;
	s.clearChildren(_local755);
	for (var _local754 in this._0) {
		var _local753 = s.createElement("div");
		_local753.textContent = _local754;
		_local755.appendChild(_local753);
	}
};

function SizePositionInput(l, d, G, b, V) {
	if (l == null) l = !1;
	if (d == null) d = !1;
	if (G == null) G = !1;
	UIComponent.call(this);
	this.PL = new Point2D();
	this.iQ = new Point2D();
	this.p0 = 72;
	this.hQ = 72;
	this.vJ = !0;
	this.c$ = !1;
	this.e = s.createElement("span");
	this.SU = new RangeDropInput([12, 41], 0, 0, null, 0, !1, !0, 4);
	this.e.appendChild(this.SU.e);
	this.SU.addListener(ActionTypes.E.A, this.Q3, this);
	var _local756 = ["px", "%"];
	if (l) _local756 = _local756.concat(["mm", "in"]);
	if (V) {
		_local756 = [
		[12, 76, 2],
		[12, 76, 6]];

		if (l) _local756 = _local756.concat([
		[12, 76, 5],
		[12, 76, 3]]
		);
	}
	this.Rd = new DropdownMenu(null, _local756);
	this.e.appendChild(this.Rd.e);
	s.appendBr(this.e);
	this.Rd.addListener(ActionTypes.E.A, this.Q3, this);
	this.it = new RangeDropInput([12, 42], 0, 0, null, 0, !1, !0, 4);
	this.e.appendChild(this.it.e);
	this.it.addListener(ActionTypes.E.A, this.Q3, this);
	var _local757 = new ToolbarButton("\u21F5", !1, null, !0);
	_local757.addListener("click", this.aaY, this);
	this.kz = new ToolbarButton("<img src=\"" + PIMG["lrs/chain"] + "\" class=\"autoscale gsicon\" />", !1, [12, 51]);
	this.kz.addListener("click", this.Q3, this);
	this.mX = new LabelItem("");
	this.mX.e.style.margin = "0";
	this.mX.e.style.padding = "0";
	if (d) {
		this.e.appendChild(this.kz.e);
		this.e.appendChild(this.mX.e);
		this.kz.Nu();
	} else this.e.appendChild(_local757.e);
	this.EL = new RangeDropInput("DPI", 0, 0, null, 3, !1, !0, 4);
	this.fi = new DropdownMenu(null, [
	["VAR0 / Inch", [12, 76, 2]],
	["VAR0 / Cm", [12, 76, 2]]]
	);
	if (l && b == null) {
		s.appendBr(this.e);
		this.e.appendChild(this.EL.e);
		this.e.appendChild(this.fi.e);
	}
	this.fi.addListener(ActionTypes.E.A, this.Q3, this);
	this.EL.addListener(ActionTypes.E.A, this.Q3, this);
	this.pC = new CheckboxControl([12, 23, 1]);
	this.pC.addListener(ActionTypes.E.A, this.Q3, this);
	if (G) {
		s.appendBr(this.e);
		this.e.appendChild(this.pC.e);
	}
	s.appendBr(this.e);
}
SizePositionInput.prototype = new UIComponent();
SizePositionInput.prototype.resize = function (l, d) {
	this.SU.I6.style.width = this.it.I6.style.width = (l - 74 - this.kz.getMeasuredWidth()) / 2 + "px";
};
SizePositionInput.prototype.cp = function () {
	this.SU.useBlockLabel();
	this.it.useBlockLabel();
	this.Rd.useBlockLabel();
	var _local758 = this.e;
	s.clearChildren(_local758);
	this.Rd.e.style.marginRight = "0";
	_local758.appendChild(this.SU.e);
	_local758.appendChild(this.kz.e);
	_local758.appendChild(this.it.e);
	_local758.appendChild(this.Rd.e);
};
SizePositionInput.prototype.KY = function () {
	this.SU.KY();
};
SizePositionInput.prototype.ahi = function (l, d) {
	this.vJ = l;
	if (d != null) this.c$ = d;
	if (!this.vJ && !this.c$ && this.Rd.b() == 0) {
		this.Rd.c(3);
		this.Nb();
	}
};
SizePositionInput.prototype.axB = function (l) {
	this.kz.c(l);
};
SizePositionInput.prototype.refresh = function () {
	this.SU.refresh();
	this.it.refresh();
	this.EL.refresh();
	this.fi.refresh();
	this.kz.refresh();
	this.pC.refresh();
	this.Rd.refresh();
};
SizePositionInput.prototype.aaY = function (l) {
	var _local759 = this.iQ.x;
	this.iQ.x = this.iQ.y;
	this.iQ.y = _local759;
	this.Nb();
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
SizePositionInput.prototype.Q3 = function (l) {
	if (l.target == this.Rd && !this.vJ && !this.c$ && this.Rd.b() == 0) this.Rd.c(3);
	if (l.target == this.Rd || l.target == this.pC) {
		this.Nb();
		return;
	}
	if (l.target == this.kz) l.target.c(!l.target.b());
	var _local766 = this.PL,
		_local760 = parseFloat(this.SU.b());
	if (isNaN(_local760)) _local760 = 1;
	var _local765 = parseFloat(this.it.b());
	if (isNaN(_local765)) _local765 = 1;
	var _local764 = this.EL.b() * [1, 2.54][this.fi.b()],
		_local763 = this.Rd.b();
	if (this.vJ) {
		var _local768 = this.hQ;
		if (_local763 == 1) {
			_local760 = this.PL.x * (_local760 / 100);
			_local765 = this.PL.y * (_local765 / 100);
		}
		var _local761 = [1, 1, 25.4 / _local768, 1 / _local768][_local763];
		_local760 /= _local761;
		_local765 /= _local761;
		if (this.pC.b()) {
			_local760 += this.PL.x;
			_local765 += this.PL.y;
		}
		if (l.target == this.EL) {
			var _local769 = _local764;
			if (!this.c$) {
				var _local767 = _local769 / _local768;
				_local760 *= _local767;
				_local765 *= _local767;
			}
			_local768 = _local769;
		}
		if (this.kz.b()) {
			if (l.target == this.SU) _local765 = _local760 * (_local766.y / _local766.x);else
			_local760 = _local765 * (_local766.x / _local766.y);
		}
		_local760 = Math.max(Math.abs(_local760), 1);
		_local765 = Math.max(Math.abs(_local765), 1);
	} else {
		var _local768 = this.p0;
		if (l.target == this.EL) _local768 = _local764;else
		{
			if (this.kz.b()) {
				if (l.target == this.SU) _local765 = _local760 * (_local766.y / _local766.x);else
				_local760 = _local765 * (_local766.x / _local766.y);
			}
			var _local761 = [1, 1, 25.4 / _local768, 1 / _local768][_local763],
				_local762 = _local760 / (_local763 == 1 ? 100 : _local766.x * _local761);
			_local768 = _local768 / _local762;
		}
		_local760 = _local766.x;
		_local765 = _local766.y;
	}
	this.iQ = new Point2D(Math.round(_local760), Math.round(_local765));
	this.hQ = _local768;
	this.Nb();
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
SizePositionInput.prototype.a4_ = function (A) {
	this.Rd.c(A);
	this.Nb();
};
SizePositionInput.prototype.c = function (l, d, G) {
	if (G != !0) this.PL = l.clone();
	this.iQ = l.clone();
	if (d != null) {
		this.p0 = d;
		this.hQ = d;
	}
	this.Nb();
};
SizePositionInput.prototype.Nb = function () {
	var _local777 = this.iQ.x,
		_local775 = this.iQ.y,
		_local770 = this.hQ,
		_local774 = (_local777 / _local775).toFixed(3);
	while (_local774.charAt(_local774.length - 1) == "0") _local774 = _local774.substring(0, _local774.length - 1);
	if (_local774.charAt(_local774.length - 1) == ".") _local774 = _local774.substring(0, _local774.length - 1);
	var _local773 = "  " + _local774 + " : 1",
		_local772 = function (M, R) {
			while (R != 0) {
				var _local780 = R;
				R = M % R;
				M = _local780;
			}
			return M;
		},
		_local778 = _local772(_local777, _local775);
	if (Math.min(_local777, _local775) / _local778 < 10) _local773 = "  " + Math.round(_local777 / _local778) + " : " + Math.round(_local775 / _local778);
	this.mX.c(_local773);
	if (this.pC.b()) {
		_local777 -= this.PL.x;
		_local775 -= this.PL.y;
	}
	var _local771 = this.Rd.b();
	if (_local771 == 1) {
		if (this.vJ) {
			_local777 = 100 * _local777 / this.PL.x;
			_local775 = 100 * _local775 / this.PL.y;
		} else {
			_local777 = _local775 = 100 * this.p0 / this.hQ;
		}
	} else {
		_local777 = Math.round(_local777);
		_local775 = Math.round(_local775);
	}
	var _local779 = [1, 1, 25.4 / _local770, 1 / _local770][_local771];
	_local777 *= _local779;
	_local775 *= _local779;
	var _local776 = _local771 == 1 || _local771 == 3 ? 2 : 0;
	this.SU.r7(_local776);
	this.it.r7(_local776);
	this.SU.c(_local777);
	this.it.c(_local775);
	this.EL.c(_local770 * [1, 1 / 2.54][this.fi.b()]);
};
SizePositionInput.prototype.b = function () {
	return this.iQ.clone();
};
SizePositionInput.prototype.A7 = function () {
	return this.hQ;
};

function BoundsInput(l, d, G) {
	UIComponent.call(this);
	var _local784 = l == 0 ? ["W", "X", "H", "Y"] : ["\u250F", "\u2513", "\u2517", "\u251B"];
	this.WV = l;
	this.auX = d;
	this.h1 = 1;
	this.Nn = [1, 1, 0];
	var _local783 = this.e = s.createElement("div", "numlist"),
		_local782 = this.cs = [];
	for (var _local781 = 0; _local781 < 4; _local781++) {
		var _local785 = new RangeDropInput(_local784[_local781], 0, 0, null, 2, !1, !0, 4, null, G && (_local781 == 0 || _local781 == 2));
		_local785.addListener(ActionTypes.E.A, this.Q3, this);
		_local783.appendChild(_local785.e);
		_local782[_local781] = _local785;
		if (_local781 == 1 || _local781 == 3) s.appendBr(_local783);
	}
	_local782[4] = new CheckboxControl(l == 0 ? [12, 51] : [12, 91, 2]);
	_local782[4].c(!0);
	_local783.appendChild(_local782[4].e);
}
BoundsInput.prototype = new UIComponent();
BoundsInput.prototype.refresh = function () {
	var _local787 = this.cs;
	for (var _local786 = 0; _local786 < 5; _local786++) _local787[_local786].refresh();
	if (this.WV == 0) s.setWidthHeightLabels(_local787[0], _local787[2]);
};
BoundsInput.prototype.c = function (l, d, G) {
	if (d) this.Nn = d;
	d = this.Nn;
	var _local790 = G ? l : this.WV == 0 ? [l[2], l[0], l[3], l[1]] : [l[0], l[1], l[3], l[2]];
	this.h1 = _local790[0] / _local790[2];
	for (var _local788 = 0; _local788 < 4; _local788++) {
		var _local789 = this.cs[_local788];
		_local789.r7(d[2] == 0 && this.auX ? 0 : 2);
		_local789.c(PixelUtil.y0.a0Q(_local790[_local788], d[0], d[1], d[2]));
	}
};
BoundsInput.prototype.b = function (l) {
	var _local794 = [],
		_local792 = this.Nn;
	for (var _local791 = 0; _local791 < 4; _local791++) {
		var _local793 = PixelUtil.y0.Sw(this.cs[_local791].b(), _local792[0], _local792[1], _local792[2]);
		_local794[_local791] = this.auX ? Math.round(_local793) : _local793;
	}
	return l ? _local794 : this.WV == 0 ? [_local794[1], _local794[3], _local794[0], _local794[2]] : [_local794[0], _local794[1], _local794[3], _local794[2]];
};
BoundsInput.prototype.Q3 = function (l) {
	var _local799 = this.WV,
		_local796 = this.cs.indexOf(l.currentTarget),
		_local798 = this.b(!0),
		_local797 = this.cs[4].b();
	if (_local799 == 0) {
		_local798[0] = Math.max(1, _local798[0]);
		_local798[2] = Math.max(1, _local798[2]);
		if (_local797 && _local796 == 0) _local798[2] = _local798[0] / this.h1;
		if (_local797 && _local796 == 2) _local798[0] = _local798[2] * this.h1;
	}
	if (_local799 == 1) {
		_local798[_local796] = Math.max(0, _local798[_local796]);
		if (_local797)
		for (var _local795 = 0; _local795 < 4; _local795++) _local798[_local795] = _local798[_local796];
	}
	this.c(_local798, null, !0);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};

function ConstraintOptions() {
	UIComponent.call(this);
	this.$q = 0;
	this.xz = [0, 0, 1, 1, 100, 100];
	this.e = s.createElement("span", "fitem");
	this.jR = new DropdownMenu(null, [
	[12, 89, 0],
	[12, 89, 1],
	[12, 89, 2]]
	);
	this.e.appendChild(this.jR.e);
	this.jR.addListener(ActionTypes.E.A, this.Q3, this);
	this.SU = new RangeDropInput("W", 0, 0, null, 0, !1, !0);
	this.e.appendChild(this.SU.e);
	this.SU.addListener(ActionTypes.E.A, this.Q3, this);
	this.it = new RangeDropInput("H", 0, 0, null, 0, !1, !0);
	this.e.appendChild(this.it.e);
	this.it.addListener(ActionTypes.E.A, this.Q3, this);
	this.c({
		sA: 0,
		x: 0,
		y: 0
	});
}
ConstraintOptions.prototype = new UIComponent();
ConstraintOptions.prototype.refresh = function () {
	s.setWidthHeightLabels(this.SU, this.it);
	this.jR.refresh();
};
ConstraintOptions.prototype.Q3 = function (l) {
	if (l.target == this.jR) {
		var _local801 = this.b(),
			_local800 = this.xz;
		_local800[this.$q * 2] = _local801.x;
		_local800[this.$q * 2 + 1] = _local801.y;
		this.$q = _local801.sA;
		this.c({
			sA: _local801.sA,
			x: _local800[_local801.sA * 2],
			y: _local800[_local801.sA * 2 + 1]
		});
	}
	if (this.SU.b() < 1) this.SU.c(1);
	if (this.it.b() < 1) this.it.c(1);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
ConstraintOptions.prototype.c = function (l) {
	this.jR.c(l.sA);
	this.SU.c(l.x);
	this.it.c(l.y);
	if (l.sA == 0) {
		this.SU.disable();
		this.it.disable();
	} else {
		this.SU.enable();
		this.it.enable();
	}
};
ConstraintOptions.prototype.b = function () {
	return {
		sA: this.jR.b(),
		x: this.SU.b(),
		y: this.it.b()
	};
};

function OffsetPhaseToggle(l) {
	UIComponent.call(this);
	this.e = s.createElement("span", "");
	this.ara = l;
	this.q4 = new OffsetRangeInput("Off X", -100, 100, l ? "%" : "px", 0, !1);
	this.Xl = new OffsetRangeInput("Off Y", -100, 100, l ? "%" : "px", 0, !1);
	this.q4.addListener(ActionTypes.E.A, this.Q3, this);
	this.Xl.addListener(ActionTypes.E.A, this.Q3, this);
	this.e.appendChild(this.q4.e);
	this.e.appendChild(this.Xl.e);
}
OffsetPhaseToggle.prototype = new UIComponent();
OffsetPhaseToggle.prototype.refresh = function () {
	this.q4.refresh();
	this.Xl.refresh();
};
OffsetPhaseToggle.prototype.Q3 = function (l) {
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
OffsetPhaseToggle.prototype.a9W = function (l) {
	this.q4.c(l.x);
	this.Xl.c(l.y);
};
OffsetPhaseToggle.prototype.adC = function () {
	return new Point2D(this.q4.b(), this.Xl.b());
};
OffsetPhaseToggle.prototype.c = function (l, d) {
	var _local802 = l.Hrzn.v,
		_local803 = l.Vrtc.v;
	if (this.ara) {
		_local802 = _local802.val;
		_local803 = _local803.val;
	}
	this.q4.c(_local802);
	this.Xl.c(_local803);
	if (d == !0) this.Q3();
};
OffsetPhaseToggle.prototype.b = function () {
	var _local805 = this.q4.b(),
		_local804 = this.Xl.b();
	if (this.ara) return {
		classID: "Pnt",
		Hrzn: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: _local805
			}
		},
		Vrtc: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: _local804
			}
		}
	};else
	return {
		classID: "Pnt",
		Hrzn: {
			v: _local805,
			t: "doub"
		},
		Vrtc: {
			v: _local804,
			t: "doub"
		}
	};
};

function StrokeStyleButton() {
	UIComponent.call(this);
	this.e = s.createElement("span", "fitem strokebutton");
	this.yf = [
	[null, null, null, 50, ""],
	[null, 0, null, 50, "4 2"],
	[1, 1, null, 50, "0 2"]];

	this.NO = JSON.parse(JSON.stringify(LayerStyleConstants.strokeStyle.default));
	this.zs = s.createElement("button");
	this.e.appendChild(this.zs);
	s.addPointerDown(this.e, this.Ll.bind(this));
	var _local812 = s.createElement("canvas", "gsicon");
	this.k_ = _local812.getContext("2d", { willReadFrequently: true });
	this.zs.appendChild(_local812);
	var _local811 = s.createElement("span");
	_local811.textContent = " \u25BC";
	this.zs.appendChild(_local811);
	this.hg = new UIComponent();
	this.hg.parent = this;
	this.hg.e = s.createElement("div", "floatcont form");
	var _local807 = this.hg.e;
	_local807.setAttribute("style", "width: 16.7em;");
	this.k3 = [
	new DropdownMenu("Position", [
	"Inside",
	"Center",
	"Outside"]
	),
	new ButtonGroupMenu("Caps", [`<img src="${PIMG["caps/butt"]}" class="autoscale gsicon" />", "<img src="${PIMG["caps/round"]}" class="autoscale gsicon" />", "<img src="${PIMG["caps/square"]}" class="autoscale gsicon" />`]),
	new ButtonGroupMenu("Corners", [`<img src="${PIMG["joins/miter"]}" class="autoscale gsicon" />", "<img src="${PIMG["joins/round"]}" class="autoscale gsicon" />", "<img src="${PIMG["joins/bevel"]}" class="autoscale gsicon" />`]),
	// new ButtonGroupMenu("Caps", ["<img src=\"" + PIMG["caps/butt"] + "\" class=\"autoscale gsicon\" />", "<img src=\"" + PIMG["caps/round"] + "\" class=\"autoscale gsicon\" />", "<img src=\"" + PIMG["caps/square"] + "\" class=\"autoscale gsicon\" />"]),
	// new ButtonGroupMenu("Corners", ["<img src=\"" + PIMG["joins/miter"] + "\" class=\"autoscale gsicon\" />", "<img src=\"" + PIMG["joins/round"] + "\" class=\"autoscale gsicon\" />", "<img src=\"" + PIMG["joins/bevel"] + "\" class=\"autoscale gsicon\" />"]),
	new RangeDropInput("Limit", 0, 50, null, null, null, !0, 2.5),
	new TextInput([19, 9, 2])];

	for (var _local806 = 0; _local806 < this.k3.length; _local806++) {
		var _local810 = this.k3[_local806];
		_local807.appendChild(_local810.e);
		_local810.addListener(ActionTypes.E.A, this.Q3, this);
	}
	s.appendBr(_local807);
	this.VS = [];
	var _local809 = this.AV.bind(this);
	this.NO.strokeStyleLineWidth.v.val = 3;
	for (var _local806 = 0; _local806 < this.yf.length; _local806++) {
		var _local808 = s.createElement("button", "fitem");
		this.VS.push(_local808);
		_local807.appendChild(_local808);
		_local808.addEventListener("click", _local809, !1);
		var _local812 = s.createElement("canvas", "gsicon"),
			_local813 = _local812.getContext("2d", { willReadFrequently: true });
		_local808.appendChild(_local812);
		this.a9R(_local813, 40, 20, this.yf[_local806]);
	}
	this.NO.strokeStyleLineWidth.v.val = 1;
}
StrokeStyleButton.prototype = new UIComponent();
StrokeStyleButton.prototype.Ll = function (l) {
	if (s.isInDocument(this.hg.e)) return;
	l.stopPropagation();
	var _local815 = this.zs.getBoundingClientRect(),
		_local814 = new Action(ActionTypes.E.L, !0);
	_local814.data = {
		a: ActionTypes.$.dY,
		A3: this.hg,
		x: _local815.left,
		y: _local815.top + _local815.height + 4
	};
	this.dispatch(_local814);
};
StrokeStyleButton.prototype.Q3 = function (l) {
	var _local818 = this.k3,
		_local817 = [];
	for (var _local816 = 0; _local816 < 5; _local816++) _local817.push(_local818[_local816].b());
	this.NO = this.ahp(_local817);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
StrokeStyleButton.prototype.AV = function (l) {
	var _local819 = this.VS.indexOf(l.currentTarget);
	this.c(this.ahp(this.yf[_local819]));
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
StrokeStyleButton.prototype.ahp = function (l) {
	var _local826 = JSON.parse(JSON.stringify(this.NO)),
		_local821 = l[0],
		_local825 = l[1],
		_local824 = l[2],
		_local823 = l[3],
		_local827 = l[4];
	if (_local821 != null) _local826.strokeStyleLineAlignment.v.strokeStyleLineAlignment = LayerStyleConstants.strokeStyle.lineAlignmentTypes[_local821];
	if (_local825 != null) _local826.strokeStyleLineCapType.v.strokeStyleLineCapType = LayerStyleConstants.strokeStyle.lineCapTypes[_local825];
	if (_local824 != null) _local826.strokeStyleLineJoinType.v.strokeStyleLineJoinType = LayerStyleConstants.strokeStyle.lineJoinTypes[_local824];
	_local826.strokeStyleMiterLimit.v = _local823;
	var _local822 = _local826.strokeStyleLineDashSet.v = [];
	_local827 = _local827.split(" ");
	while ((_local827.length & 1) != 0) _local827.pop();
	for (var _local820 = 0; _local820 < _local827.length; _local820++) _local822.push({
		t: "UntF",
		v: {
			type: "#Nne",
			val: parseInt(_local827[_local820])
		}
	});
	return _local826;
};
StrokeStyleButton.prototype.refresh = function () {
	for (var _local828 = 0; _local828 < this.k3.length; _local828++) this.k3[_local828].refresh();
};
StrokeStyleButton.prototype.c = function (l) {
	this.NO = JSON.parse(JSON.stringify(l));
	var _local835 = LayerStyleConstants.strokeStyle.lineAlignmentTypes.indexOf(l.strokeStyleLineAlignment.v.strokeStyleLineAlignment),
		_local830 = LayerStyleConstants.strokeStyle.lineCapTypes.indexOf(l.strokeStyleLineCapType.v.strokeStyleLineCapType),
		_local834 = LayerStyleConstants.strokeStyle.lineJoinTypes.indexOf(l.strokeStyleLineJoinType.v.strokeStyleLineJoinType),
		_local833 = l.strokeStyleMiterLimit.v,
		_local832 = [],
		_local837 = l.strokeStyleLineDashSet.v;
	for (var _local831 = 0; _local831 < _local837.length; _local831++) _local832.push(_local837[_local831].v.val);
	var _local838 = this.k3;
	_local838[0].c(_local835);
	_local838[1].c(_local830);
	_local838[2].c(_local834);
	_local838[3].c(_local833);
	_local838[3].setEnabled(_local834 == 0);
	_local838[4].c(_local832.join(" "));
	var _local836 = [];
	for (var _local829 = 0; _local829 < 5; _local829++) _local836.push(_local838[_local829].b());
	this.a9R(this.k_, 40, 16, _local836);
};
StrokeStyleButton.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.NO));
};
StrokeStyleButton.prototype.a9R = function (l, d, G, b) {
	var _local842 = b[0],
		_local841 = b[1],
		_local844 = b[2],
		_local840 = b[3],
		_local845 = b[4].split(" ").map(parseFloat);
	s.setCanvasSizeForDpr(l.canvas, d, G);
	var _local843 = Math.min(5, this.NO.strokeStyleLineWidth.v.val);
	for (var _local839 = 0; _local839 < _local845.length; _local839++) _local845[_local839] *= _local843;
	l.clearRect(0, 0, d, G);
	l.setLineDash(_local845);
	l.lineCap = ["butt", "round", "square"][_local841];
	l.lineJoin = ["miter", "round", "bevel"][_local844];
	l.lineWidth = _local843;
	l.beginPath();
	l.moveTo(0, G / 2);
	l.lineTo(d * 2, G / 2);
	l.stroke();
};



function ModalDialogBase(l, d) {
	UIComponent.call(this);
	if (l == null) return;
	this.id = d;
	this.XV = l;
	this.$L = null;
	this.e = s.createElement("div", "window " + d);
	this.aeF = null;
	this.lg = s.createElement("div", "whead");
	this.aki = s.createElement("span", "wname");
	this.lg.appendChild(this.aki);
	this.ao1 = !1;
	this.e.appendChild(this.lg);
	this.TC = this.af8.bind(this);
	this.w7 = this.a2C.bind(this);
	this.ha = this.a4r.bind(this);
	s.preventTouchAndGesture(this.lg);
	s.addPointerDown(this.lg, this.TC);
	this.a26 = s.createElement("span", "cross gsicon");
	this.lg.appendChild(this.a26);
	ModalDialogBase.prototype.refresh.call(this);
	s.addPointerUp(this.a26, this.a6i.bind(this));
	this.body = s.createElement("div", "body");
	this.e.appendChild(this.body);
}
ModalDialogBase.prototype = new UIComponent();
ModalDialogBase.prototype.in = function () {
	return !1;
};
ModalDialogBase.prototype.ba = function () {
	return !1;
};
ModalDialogBase.prototype.refresh = function () {
	if (this.XV == null) return;
	this.aki.textContent = languageManager.get(this.XV);
};
ModalDialogBase.prototype.dJ = function (l, d, G, b, V) {};
ModalDialogBase.prototype.AJ = function (l, d, G, b, V) {};
ModalDialogBase.prototype.JP = function (l, d, G, b, V) {};
ModalDialogBase.prototype.Nl = function (l, d, G, b, V) {};
ModalDialogBase.prototype.h_ = function (l, d, G, b, V) {};
ModalDialogBase.prototype.o9 = function (l, d, G, b) {
	if (b.l(KeyboardHandler.lm) && this.DW) this.DW();
	if (b.l(KeyboardHandler.wz)) {
		var _local1949 = new Action(ActionTypes.E.v);
		_local1949.Fj = !0;
		f.gU.a8m(b, _local1949);
		if (_local1949.data) d.dispatch(_local1949);
	}
};
ModalDialogBase.prototype.oH = function (l) {
	return !1;
};
ModalDialogBase.prototype.Ah = function (l, d) {
	return !0;
};
ModalDialogBase.prototype.Yw = function (l, d, G, b) {};
ModalDialogBase.prototype.BM = function (l, d) {};
ModalDialogBase.prototype.px = function (l, d) {
	return null;
};
ModalDialogBase.prototype.a9c = function (l) {
	return this.aeF;
};
ModalDialogBase.prototype.resize = function () {};
ModalDialogBase.prototype.close = function () {
	this.dispatch(new Action(ActionTypes.E.Ax));
};
ModalDialogBase.prototype.af8 = function (l) {
	this.$L = s.getEventPositionInElement(l, this.e);
	s.addPointerMove(window, this.w7);
	s.addPointerUp(window, this.ha);
};
ModalDialogBase.prototype.a2C = function (l) {
	var _local1953 = this.e.parentNode,
		_local1950 = s.getEventPositionInElement(l, _local1953),
		_local1952 = Math.round(_local1950.x - this.$L.x),
		_local1951 = _local1953.offsetTop + Math.max(0, Math.min(PP.window.innerHeight - 36, Math.round(_local1950.y - this.$L.y)));
	this.aeF = new Point2D(_local1952, _local1951);
	this.e.style.left = _local1952 + "px";
	this.e.style.top = _local1951 + "px";
};
ModalDialogBase.prototype.a4r = function (l) {
	s.removePointerMove(window, this.w7);
	s.removePointerUp(window, this.ha);
};
ModalDialogBase.prototype.a6i = function (l) {
	if (this.ao1) {
		this.DW();
		return;
	}
	if (this.hasListener("closebtn")) {
		this.dispatch(new Action("closebtn"));
		var _local1954 = this.parent;
		if (_local1954 && _local1954.tx && _local1954.tx.indexOf(this) != -1) this.close();
	} else this.close();
};



function LayerStyleDialog() {
	ModalDialogBase.call(this, "Layer Style", "layerstyle");
	this.abG = -1;
	this.data = {};
	this.Kv = null;
	this.mN = null;
	this.J_ = [];
	this.NY = [];
	s.addClass(this.body, "flexrow");
	this.ms = s.createElement("div", "bordered");
	this.ms.setAttribute("style", "min-width:13em;");
	this.body.appendChild(this.ms);
	this.DM = s.createElement("div", "");
	this.DM.setAttribute("style", "width:25em; padding-left: 1em;");
	this.body.appendChild(this.DM);
	this.pz = s.createElement("div", "form");
	this.pz.setAttribute("style", "padding-left: 1em; width:7em;");
	this.body.appendChild(this.pz);
	this.BB = s.createOkButton(this, this.pz);
	this.kH = new ToolbarButton("Define New", !0, null, !0);
	this.kH.addListener("click", this.amp, this);
	this.pz.appendChild(this.kH.e);
	this.aF = new PatternPickerWide();
	this.aF.parent = this;
	this.aF.addListener(ActionTypes.E.A, this.agG, this);
	this.pz.appendChild(this.aF.e);
	this.addListener("closebtn", this.N2, this);
	this.addListener("redrawall", this.al$, this);
}
LayerStyleDialog.prototype = new ModalDialogBase();
LayerStyleDialog.prototype.in = function () {
	return !0;
};
LayerStyleDialog.prototype.ba = function () {
	return !0;
};
LayerStyleDialog.prototype.dJ = function (l, d, G, b, V) {
	var _local2659 = this.dH();
	if (_local2659) _local2659.dJ(l, d, G, b, V);
};
LayerStyleDialog.prototype.JP = function (l, d, G, b, V) {
	var _local2660 = this.dH();
	if (_local2660) _local2660.JP(l, d, G, b, V);
};
LayerStyleDialog.prototype.Nl = function (l, d, G, b, V) {
	var _local2661 = this.dH();
	if (_local2661) _local2661.Nl(l, d, G, b, V);
};
LayerStyleDialog.prototype.dH = function (l) {
	if (l == null) l = this.data.index;
	return l == null ? null : l == 0 ? this.J_[0] : this.NY[l[0]][l[1]];
};
LayerStyleDialog.prototype.agG = function (l) {
	var _local2662 = this.aF.b();
	this.zh({
		a: "setstl",
		Z: _local2662.x1
	});
	this.al$(null);
};
LayerStyleDialog.prototype.amp = function (l) {
	var _local2667 = this.Kv,
		_local2663 = this.data.j;
	if (_local2663 == null) _local2663 = _local2667.g[0];
	var _local2666 = this.Kv.B[_local2663],
		_local2665 = PatternHelper.at$(_local2666),
		_local2664 = new Action(ActionTypes.E.L, !0);
	_local2664.data = {
		a: ActionTypes.$.kI,
		pb: "add",
		Oo: PsdResourceTypes.G9,
		G2: [JSON.parse(JSON.stringify(_local2665))]
	};
	this.dispatch(_local2664);
};
LayerStyleDialog.prototype.avP = function (l) {
	this.data.index = l.currentTarget.gb;
	this.Cn(l.currentTarget.gb);
};
LayerStyleDialog.prototype.al$ = function (l) {
	this.Yw(this.Kv, this.data);
};
LayerStyleDialog.prototype.Cn = function (l, d) {
	s.clearChildren(this.DM);
	for (var _local2668 = 0; _local2668 < this.J_.length; _local2668++) this.J_[_local2668].agU();
	var _local2669 = this.dH(l);
	this.DM.appendChild(_local2669.a4f());
	if (d) _local2669.Fe();
	var _local2673 = this.Kv;
	if (_local2673) {
		var _local2672 = _local2673.B[this.data.j];
		this.J_[0].update(_local2673, f.Tt.fS(_local2673, _local2672));
		var _local2671 = _local2672.add.lmfx;
		if (_local2671 == null) return;
		LayerStyleConstants.ensureEffectMultiLists(_local2671);
		for (var _local2668 = 0; _local2668 < LayerStyleConstants.effectOrder.length; _local2668++) {
			var _local2674 = _local2671[LayerStyleConstants.effectMultiKeys[_local2668]].v;
			for (var _local2670 = 0; _local2670 < _local2674.length; _local2670++) this.NY[_local2668][_local2670].update(_local2673, _local2674[_local2670].v);
		}
	}
	if (d) _local2669.Fe();
};
LayerStyleDialog.prototype.refresh = function () {
	ModalDialogBase.prototype.refresh.call(this);
	this.kH.refresh();
	this.aF.refresh();
	this.BB.refresh();
	for (var _local2675 = 0; _local2675 < this.J_.length; _local2675++) this.J_[_local2675].refresh();
};
LayerStyleDialog.prototype.Yw = function (l, d) {
	var _local2677 = d.j == null;
	this.data.j = d.j;
	this.data.index = d.index;
	d = this.data;
	this.Kv = l;
	if (_local2677) d.j = l.g.length == 0 ? l.B.length - 1 : l.g[0];
	s.clearChildren(this.ms);
	var _local2680 = l.B[d.j].add.lmfx;
	if (_local2680 != null) LayerStyleConstants.ensureEffectMultiLists(_local2680);
	this.Ge();
	this.J_ = [new LayerStyleOptionRow("bops", !1, 0)];
	this.NY = [];
	for (var _local2676 = 0; _local2676 < LayerStyleConstants.effectOrder.length; _local2676++) {
		this.NY.push([]);
		var _local2679 = _local2680 == null ? [] : _local2680[LayerStyleConstants.effectMultiKeys[_local2676]].v;
		for (var _local2678 = 0; _local2678 < _local2679.length; _local2678++) {
			var _local2681 = new LayerStyleOptionRow(LayerStyleConstants.effectOrder[_local2676], !1, [_local2676, _local2678]);
			this.J_.push(_local2681);
			this.NY[_local2676].push(_local2681);
		}
		if (_local2679.length == 0) {
			var _local2681 = new LayerStyleOptionRow(LayerStyleConstants.effectOrder[_local2676], !1, [_local2676, 0]);
			this.J_.push(_local2681);
			this.NY[_local2676].push(_local2681);
		}
	}
	this.refresh();
	this.aei(this.mN, PsdResourceTypes.Wx);
	for (var _local2676 = 0; _local2676 < this.J_.length; _local2676++) {
		this.J_[_local2676].parent = this;
		this.J_[_local2676].ak_(this.ms);
		this.J_[_local2676].addListener("showme", this.avP, this);
	}
	if (d.index == null || d.index == 0 || !_local2677 && _local2680[LayerStyleConstants.effectMultiKeys[d.index[0]]].v.length == 0) {
		this.Cn(0);
	} else this.Cn(d.index, _local2677);
	this.addListener("afterchange", this.Ge, this);
};
LayerStyleDialog.prototype.Ge = function (l) {
	var _local2685 = this.Kv,
		_local2682 = this.data.j;
	if (_local2682 == null) _local2682 = _local2685.g[0];
	var _local2684 = this.Kv.B[_local2682],
		_local2683 = PatternHelper.at$(_local2684);
	this.aF.c(_local2683, _local2685.add.Patt ? _local2685.add.Patt : [], _local2685.ie(), _local2685.Yf());
};
LayerStyleDialog.prototype.BM = function (l, d) {
	this.mN = l;
	this.aei(l, d);
	if (d == PsdResourceTypes.G9 || d == PsdResourceTypes.Wx) {
		this.aF.Z2([l.Pr, l._N]);
	}
	if (d == PsdResourceTypes.XX) {}
};
LayerStyleDialog.prototype.aei = function (l, d) {
	for (var _local2686 = 0; _local2686 < this.J_.length; _local2686++) this.J_[_local2686].BM(l, d);
};
LayerStyleDialog.prototype.N2 = function (l) {
	this.zh({
		a: "cancel"
	});
};
LayerStyleDialog.prototype.DW = function (l) {
	this.zh({
		a: "confirm"
	});
	this.close();
};
LayerStyleDialog.prototype.zh = function (l) {
	l.j = this.data.j;
	var _local2687 = new Action(ActionTypes.E.v, !0);
	_local2687.data = l;
	_local2687.G = f.LY;
	_local2687.Fj = !0;
	this.dispatch(_local2687);
	this.Ge();
};
LayerStyleDialog.a1T = function () {
	var _local2688 = function (d) {
		if (d == null || d.g.length == 0) return {
			p: !1
		};
		var _local2689 = d.B[d.g[0]];
		return {
			p: _local2689.add.lmfx != null
		};
	};
	return {
		name: [11, 6],
		xX: !0,
		sub: [{
			name: [5, 1],
			p: _local2688
		}, {
			name: [5, 2]
		}, {
			name: [2, 2],
			p: _local2688
		}]
	};
};
LayerStyleDialog.asB = function () {
	return {
		sub: [{
			Y: ActionTypes.E.v,
			G: f.LY,
			W: {
				a: "st_copy"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.LY,
			W: {
				a: "st_paste"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.LY,
			W: {
				a: "st_clear"
			}
		}]
	};
};
LayerStyleDialog.bb = function (l) {
	var _local2691 = [{
		name: [14, 10],
		xX: !0
	}];
	for (var _local2690 = 0; _local2690 < LayerStyleConstants.effectDisplayNames.length; _local2690++) _local2691.push({
		name: LayerStyleConstants.effectDisplayNames[_local2690]
	});
	if (l) {
		_local2691[_local2691.length - 1].xX = !0;
		_local2691.push(LayerStyleDialog.a1T());
		_local2691.push({
			name: [6, 30, 1],
			p: function (G) {
				return {
					p: G != null && G.g.length != 0 && G.B[G.g[0]].sc()
				};
			}
		});
		_local2691.push({
			name: ["VAR0 VAR1", [12, 49],
			[9, 1]],

			p: function (G) {
				return {
					p: G != null && G.g.length != 0 && G.B[G.g[0]].add.lmfx != null
				};
			}
		});
	}
	return _local2691;
};
LayerStyleDialog.bQ = function (l) {
	var _local2694 = [{
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.SN,
			GU: "layerstyle"
		}
	}];
	for (var _local2692 = 0; _local2692 < LayerStyleConstants.effectDisplayNames.length; _local2692++) _local2694.push({
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.SN,
			GU: "layerstyle",
			index: [_local2692, 0]
		}
	});
	if (l) {
		_local2694.push(LayerStyleDialog.asB());
		_local2694.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "scaleeffects",
				mS: 100,
				P7: {
					Y: ActionTypes.E.v,
					G: f.LY,
					W: {
						a: "scaleeffects"
					}
				}
			}
		});
		var _local2693 = {
			classID: "Mk",
			null: PsdDescriptorHelper.Fw("Lyr"),
			Usng: {
				t: "obj ",
				v: [{
					t: "prop",
					v: {
						classID: "Prpr",
						keyID: "Lefx"
					}
				}, {
					t: "Enmr",
					v: {
						classID: "Lyr",
						typeID: "Ordn",
						enum: "Trgt"
					}
				}]
			}
		};
		_local2694.push({
			Y: ActionTypes.E.g5,
			W: {
				kT: "make",
				a0: _local2693
			}
		});
	}
	return _local2694;
};
LayerStyleDialog.alE = function (l) {
	var _local2696 = [];
	if (l) _local2696.push({
		name: [6, 48, 0, 0],
		pR: !0
	}, {
		name: [6, 48, 0, 1],
		pR: !0
	}, {
		name: [6, 48, 0, 2],
		pR: !0,
		xX: !0
	});
	for (var _local2695 in LayerEffectsHelper.names) _local2696.push({
		name: LayerEffectsHelper.names[_local2695],
		xX: LayerEffectsHelper.advancedAdjustmentKeys.indexOf(_local2695) != -1,
		pR: FilterEffectPanel[_local2695] != null
	});
	return _local2696;
};
LayerStyleDialog.ye = function (l) {
	var _local2702 = [];
	if (l) {
		_local2702.push({
			Y: ActionTypes.E.v,
			G: f.LI,
			W: {
				a: "newfill",
				Ts: 0
			}
		});
		for (var _local2697 = 1; _local2697 < 3; _local2697++) _local2702.push({
			Y: ActionTypes.E.g5,
			W: f.Ga.ML(_local2697)
		});
	}
	for (var _local2698 in LayerEffectsHelper.names) {
		var _local2701 = FilterHelper.oT(_local2698);
		if (_local2701 == null) _local2701 = {};
		for (var _local2700 in LayerEffectsHelper.invertedClassIdToKey)
		if (LayerEffectsHelper.invertedClassIdToKey[_local2700] == _local2698) _local2701.classID = _local2700;
		var _local2699 = {
			kT: "make",
			a0: {
				classID: "Mk",
				null: PsdDescriptorHelper.Fw("AdjL"),
				Usng: {
					t: "Objc",
					v: {
						classID: "AdjL",
						Type: {
							t: "Objc",
							v: _local2701
						}
					}
				}
			}
		};
		_local2702.push({
			Y: ActionTypes.E.g5,
			W: _local2699
		});
	}
	return _local2702;
};



function ToolOptionsBase() {
	UIComponent.call(this);
	this.G = 0;
	this.mq = null;
	this.e = s.createElement("div", "toolconf");
	this.Fd = null;
	this.Mw = null;
	this.body = new s.createElement("div", "body");
}

ToolOptionsBase.prototype = new UIComponent();

ToolOptionsBase.prototype.aoU = function (l, d) {
	this.G = l;
	this.mq = d;
	if (f.y5[l]) {
		var _local4423 = this.Fd = new ToolPresetButton(l);
		this.e.appendChild(_local4423.e);
		_local4423.parent = this;
	} else {
		this.Mw = s.createElement("div");
		this.e.appendChild(this.Mw);
	}
	this.e.appendChild(this.body);
	this.refresh();
};
ToolOptionsBase.prototype.a81 = function (l, d) {};

ToolOptionsBase.prototype.a5o = function (l) {};

ToolOptionsBase.prototype.BM = function (l, d) {
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.qa)
	if (this.Fd) this.Fd.Z2(l.UL);
};

ToolOptionsBase.prototype.IF = function (l) {};

ToolOptionsBase.prototype.refresh = function () {
	if (this.Fd) this.Fd.refresh();else
	this.Mw.innerHTML = s.getIconImgHtml(this.mq, null, "toolicon");
	this.lx();
};

ToolOptionsBase.prototype.lx = function () {};


function MoveToolOptions() {
	ToolOptionsBase.call(this);
	var _local4502 = [],
		_local4496 = "<svg  class=\"autoscale gsicon\" viewBox=\"0 0 14 18\" width=\"14\" height=\"18\" fill=\"black\"><path d=\"M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,14 L0,16 L14,16 L14,14 Z\" /></svg>";
	this.x_ = new CheckboxControl("Auto-Select");
	this.x_.c(!0);
	this.x_.addListener(ActionTypes.E.A, this.S9, this);
	_local4502.push(this.x_.e);
	this.hS = new DropdownMenu(null, ["Folder", "Layer"]);
	this.hS.addListener(ActionTypes.E.A, this.S9, this);
	this.hS.c(1);
	_local4502.push(this.hS.e);
	this.Bw = new CheckboxControl("Transform controls");
	this.Bw.addListener(ActionTypes.E.A, this.S9, this);
	_local4502.push(this.Bw.e);
	this.a8 = new CheckboxControl("Distances");
	this.a8.addListener(ActionTypes.E.A, this.S9, this);
	_local4502.push(this.a8.e);
	this.hg = new UIComponent();
	this.hg.e = s.createElement("div", "floatcont form");
	this.hg.e.setAttribute("style", "max-width: 200px;");
	this.hg.parent = this;
	var _local4501 = this.hg.e;
	this.amj = new DropdownMenu("Scale for exported files", ["1x", "2x", "3x", "4x"]);
	_local4501.appendChild(this.amj.e);
	this.us = new ToolbarButton(_local4496 + " PNG", !1, "Save selected layers as PNG", !0);
	_local4501.appendChild(this.us.e);
	this.us.addListener("click", this.Aj, this);
	this.aw4 = new ToolbarButton(_local4496 + " SVG", !1, "Save selected layers as SVG", !0);
	_local4501.appendChild(this.aw4.e);
	this.aw4.addListener("click", this.Aj, this);
	var _local4500 = new ToolbarButton(_local4496, !1, "Save selected layers", !0);
	_local4502.push(_local4500.e);
	_local4500.addListener("click", function (y) {
		if (s.isInDocument(this.hg.e)) return;
		var _local4505 = _local4500.e.getBoundingClientRect(),
			_local4504 = new Action(ActionTypes.E.L, !0);
		_local4504.data = {
			a: ActionTypes.$.dY,
			A3: this.hg,
			x: _local4505.left,
			y: _local4505.top + _local4505.height,
			XC: !0
		};
		this.dispatch(_local4504);
	}, this);
	var _local4499 = s.createElement("span", "fitem");
	_local4502.push(_local4499);
	var _local4498 = s.createElement("span", "fitem");
	_local4502.push(_local4498);
	this.VS = [];
	for (var _local4495 = 0; _local4495 < 8; _local4495++) {
		var _local4503 = _local4495 == 3 || _local4495 == 7 ? [20, 4, 6] : [20, 4, _local4495 < 3 ? _local4495 : _local4495 - 1],
			_local4497 = new ToolbarButton("Hi", !1, _local4503);
		(_local4495 < 4 ? _local4499 : _local4498).appendChild(_local4497.e);
		_local4497.addListener("click", this.Aj, this);
		this.VS.push(_local4497);
	}
	for (var _local4495 = 0; _local4495 < _local4502.length; _local4495++) this.body.appendChild(_local4502[_local4495]);
	this.aqJ = _local4502;
}

MoveToolOptions.prototype = new ToolOptionsBase();

MoveToolOptions.prototype.IF = function (l) {
	var _local4508 = l.Ye,
		_local4507 = l.axj;
	this.x_.c(_local4508.Pm);
	this.Bw.c(_local4508.yn);
	this.a8.c(_local4508.nO);
	if (_local4507) {
		s.clearChildren(this.body);
		for (var _local4506 = 0; _local4506 < _local4507.length; _local4506++)
		if (_local4507[_local4506] == 1 && this.aqJ[_local4506]) this.body.appendChild(this.aqJ[_local4506]);
	}
};

MoveToolOptions.prototype.Aj = function (l) {
	var _local4510 = this.VS.indexOf(l.target),
		_local4509;
	if (_local4510 == -1) {
		_local4509 = new Action(ActionTypes.E.L, !0);
		_local4509.data = {
			a: ActionTypes.$.kl,
			G: this.G,
			y3: l.target == this.us ? "getPNG" : "getSVG",
			z3: this.amj.b() + 1
		};
	} else {
		_local4509 = new Action(ActionTypes.E.v, !0);
		_local4509.G = f.$C;
		_local4509.data = {
			a: "algn",
			Z: _local4510
		};
	}
	this.dispatch(_local4509);
};

MoveToolOptions.prototype.S9 = function (l) {
	var _local4511 = new Action(ActionTypes.E.L, !0);
	_local4511.data = {
		a: ActionTypes.$.kl,
		G: this.G,
		y3: "prms",
		Pm: this.x_.dB(),
		anl: this.hS.b(),
		yn: this.Bw.dB(),
		nO: this.a8.dB()
	};
	this.dispatch(_local4511);
};

MoveToolOptions.prototype.lx = function () {
	this.x_.refresh();
	this.hS.refresh();
	this.Bw.refresh();
	this.a8.refresh();
	var _local4513 = "h0 h1 h2 hG v0 v1 v2 vG".split(" ");
	for (var _local4512 = 0; _local4512 < 8; _local4512++) {
		this.VS[_local4512].setLabel(s.getIconImgHtml("align/" + _local4513[_local4512], null, "autoscale"));
	}
};




function NamedTabPanel(l) {
	PanelTabBase.call(this, l.name, !0);
	this.Kv = l;
	this.wQ = null;
	this.zS = new PointerInputHandler(this.DK);
	this.zS.parent = this;
}

NamedTabPanel.prototype = new PanelTabBase();

NamedTabPanel.wn = function () {
	var _local4065 = document.createElement("canvas"),
		_local4064 = document.createElement("canvas"),
		_local4061 = 16,
		_local4063 = PixelUtil.allocBytes(16 * 16 * 4);
	PixelUtil.fillCheckerboard(_local4063, _local4061, _local4061, 8);
	var _local4062 = PixelUtil.scale.s2(_local4063, _local4061, _local4061);
	return {
		Lp: _local4065,
		La: _local4064,
		Vm: _local4065.getContext("2d", { willReadFrequently: true }),
		yV: _local4064.getContext("2d", { willReadFrequently: true }),
		Mj: _local4062
	};
}();

NamedTabPanel.prototype.ah$ = function () {
	if (this.Kv.hasUnsavedChanges()) {
		return window.confirm("There is unsaved work in " + this.Kv.name + ". Do you really want to close it?");
	}
	return !0;
};

NamedTabPanel.prototype.BM = function (l, d) {
	this.wQ = l;
};

NamedTabPanel.prototype.Yw = function (l) {
	this.KN();
	this.VP();
};

NamedTabPanel.prototype.resize = function (cssWidth, cssHeight) {
	if (cssWidth <= 0 || cssHeight <= 0) return;
	// HBI: canvas inherits its width/height from its parent (.pbody) instead of the
	// layout-allocated area, so it can stretch beyond its normal bounds.
	if (this.DK && this.DK.clientWidth > 0 && this.DK.clientHeight > 0) {
		cssWidth = this.DK.clientWidth;
		cssHeight = this.DK.clientHeight;
	}
	this.iJ = cssWidth;
	this.Tq = cssHeight;
	var doc = this.Kv,
		canvases = NamedTabPanel.wn,
		dpr = s.getDevicePixelRatio();
	doc.u.Vm.m = Math.floor(cssWidth * dpr);
	doc.u.Vm.n = Math.floor(cssHeight * dpr);
	s.setCanvasSizeForDpr(canvases.Lp, cssWidth, cssHeight);
	s.setCanvasSizeForDpr(canvases.La, cssWidth, cssHeight);
	s.setCanvasSizeForDpr(WebGLContext.getCanvas(), cssWidth, cssHeight);

	// Zoom not yet set (fresh document): fit it to the available rect.
	if (doc.u.N == 0) {
		var availRect = doc.u.aR();
		doc.u.N = f.gU.agP(doc.m, doc.n, availRect.m, availRect.n);
	}
	this.VP();
};

NamedTabPanel.prototype.KN = function () {
	var _local4072 = this.DK.firstChild,
		_local4071 = NamedTabPanel.wn,
		isWebGL = WebGLContext.webglAvailable && this.Kv.add.fvec == null;
	if (!isWebGL && _local4072 == WebGLContext.getCanvas() || isWebGL && _local4072 == _local4071.Lp) this.DK.removeChild(_local4072);
	var workCvs = isWebGL ? WebGLContext.getCanvas() : _local4071.Lp;

	// hbi
	if (!workCvs.parentNode) {
		let el = PP.APP.els.cvsWrapper.append(workCvs);
		PP.e3();
		PP.resize();
		PP.update();

		// event: canvas added
		var event = new Action(ActionTypes.E.hbi, !0);
		event.data = { type: "file-canvas-added", el };
		this.dispatch(event);
	}
	
	// if (!s.isInDocument(workCvs)) {
	// 	this.DK.appendChild(workCvs);
	// }
};

NamedTabPanel.prototype.VP = function () {
	if (this.wQ == null) return;
	var _local4074 = this.Kv,
		_local4073 = WebGLContext.webglAvailable && this.Kv.add.fvec == null;
	if (_local4073) this.a5_();
	else this.a6();
};

NamedTabPanel.prototype.a5_ = function () {
	if (WebGLContext.webglAvailable && NamedTabPanel.Nz == null) {
		var _local4096 = NamedTabPanel.Nz = [],
			_local4091 = [0, 2, 8, 32, 128];
		for (var _local4075 = 0; _local4075 < 5; _local4075++) _local4096[_local4075] = [new NamedTabPanel.Js(!1, _local4091[_local4075], !1), new NamedTabPanel.Js(!0, _local4091[_local4075], !1)];
		_local4096.push([new NamedTabPanel.Js(!1, 0, !0), new NamedTabPanel.Js(!0, 0, !0)]);
	}
	var _local4078 = this.Kv,
		_local4090 = NamedTabPanel.wn,
		_local4084,_local4099 = 0,
		_local4076,_local4098;
	if (_local4078.tP == null) return;
	var _local4086 = _local4078.u,
		_local4083 = _local4086.Vm.m,
		_local4100 = _local4086.Vm.n,
		_local4080 = WebGLContext.gl;
	_local4090.Vm.clearRect(0, 0, _local4083, _local4100);
	var _local4101 = this.abo(_local4078);
	if (_local4086.eW == null || _local4086.eW.m != _local4083 || _local4086.eW.n != _local4100) _local4086.eW = new WebGLContext.RgbaTexture(_local4083, _local4100);
	if (_local4101) {
		var _local4092 = new Uint8Array(_local4090.Vm.getImageData(0, 0, _local4083, _local4100).data.buffer);
		_local4086.eW.set(_local4092);
	} else {
		WebGLContext.setFramebufferViewport(_local4086.eW);
		WebGLContext.clearWithColorMask(1);
	}
	var _local4082 = _local4086.dN(0, 0);
	if (NamedTabPanel.akr == null) NamedTabPanel.akr = new Float32Array(4 * 1024);
	var _local4081 = [0, 0, 0, 0],
		_local4097 = NamedTabPanel.akr;
	if (_local4078.add.artd) {
		_local4097.fill(0);
		_local4081 = NamedTabPanel.Ku(_local4078);
		var _local4085 = _local4078.m,
			_local4094 = _local4078.n,
			_local4077 = 0;
		for (var _local4075 = 0; _local4075 < _local4078.B.length; _local4075++) {
			var _local4093 = _local4078.B[_local4075],
				_local4088 = _local4093.add.artb;
			if (_local4088 == null || !_local4093.zD()) continue;
			var _local4095 = _local4093.dA();
			_local4097[_local4099] = _local4095.x / _local4085;
			_local4097[_local4099 + 1] = _local4095.y / _local4094;
			_local4097[_local4099 + 2] = _local4095.m / _local4085;
			_local4097[_local4099 + 3] = _local4095.n / _local4094;
			_local4099 += 4;
			if (_local4099 == _local4097.length) break;
		}
		if (_local4099 > 2 * 4) _local4077++;
		if (_local4099 > 8 * 4) _local4077++;
		if (_local4099 > 32 * 4) _local4077++;
		_local4084 = NamedTabPanel.Nz[_local4077 + 1];
		_local4097 = new Float32Array(_local4097.buffer, 0, [2, 8, 32, 128][_local4077] * 4);
	} else _local4084 = NamedTabPanel.Nz[_local4078.ZV ? 5 : 0];
	var _local4079 = _local4078.Pi();
	if (_local4079 == null) _local4084 = _local4084[0];else
	{
		_local4084 = _local4084[1];
		_local4098 = _local4079[_local4078.add.fcmy == 1 ? 6 : 4];
		_local4076 = _local4079[2];
	}
	WebGLContext.setViewport(_local4083, _local4100);
	WebGLContext.clearWithColorMask(0);
	WebGLContext.setViewport(_local4083, _local4100);
	_local4084.useProgram();
	var _local4087 = new Matrix2D();
	_local4087.scale(_local4083, _local4100);
	_local4087.concat(_local4086.Gb(!0));
	_local4087.scale(1 / _local4078.m, 1 / _local4078.n);
	var _local4089 = [_local4087.aS, _local4087.k, 0, _local4087.S5, _local4087.Qd, 0, _local4087.cI, _local4087.xu, 1];
	_local4084.draw(
		_local4086.eW.glTexture,
		_local4078.tP.glTexture,
		new Float32Array(_local4089),
		new Float32Array([_local4083 / 8, _local4100 / 8, _local4082.x / _local4083, _local4082.y / _local4100]), _local4078.m, _local4078.n, 1 / _local4078.u.N, _local4083, _local4100,
		new Float32Array(_local4081),
		_local4097,
		new Float32Array(PixelUtil.mat4.Bo(PixelUtil.mat4.ls(_local4086.MX))),
		_local4098,
		_local4076
	);
	_local4080.drawArrays(_local4080.TRIANGLES, 0, 6);
};

NamedTabPanel.Ku = function (l) {
	return [0, 0, 0, 0];
};

NamedTabPanel.axG = function (l) {
	var _local4104 = PixelUtil.color.sampleGradientColor(l.v),
		_local4103 = [_local4104.o / 255, _local4104.J / 255, _local4104.k / 255, 1];
	for (var _local4102 = 0; _local4102 < 4; _local4102++) _local4103[_local4102] = Math.min(1, _local4103[_local4102]);
	return _local4103;
};

NamedTabPanel.ut = function (l, d) {
	var _local4105 = l[2] * 255;
	if (WebGLContext.webglAvailable) _local4105 = d ? 0 : Math.max(2, _local4105);
	return "rgba(" + l[0] * 255 + "," + l[1] * 255 + "," + _local4105 + "," + l[3] + ")";
};

NamedTabPanel._f = function (l) {
	var _local4107 = l.length;
	if (WebGLContext.webglAvailable)
	for (var _local4106 = 0; _local4106 < _local4107; _local4106 += 4) {
		if (l[_local4106 + 2] == 0) l[_local4106 + 2] = 3;
	}
};

NamedTabPanel.prototype.a6 = function () {
	var _local4121 = this.Kv,
		_local4118 = NamedTabPanel.wn;
	if (_local4121.buffer == null) return;
	var _local4109 = _local4121.u,
		_local4117 = _local4109.Vm,
		_local4116 = _local4117.m,
		_local4113 = _local4117.n,
		_local4124 = new Rect(0, 0, _local4121.m, _local4121.n);
	_local4118.yV.clearRect(0, 0, _local4116, _local4113);
	_local4118.Vm.clearRect(0, 0, _local4116, _local4113);
	var _local4110 = _local4109.Gb(!0),
		_local4125 = _local4110.clone();
	_local4125.hI();
	if (_local4121.add.artd == null) {
		_local4118.Vm.save();
		var _local4119 = _local4125.kD(new Point2D(0, 0));
		_local4125.translate(-_local4119.x, -_local4119.y);
		_local4118.Vm.translate(Math.round(_local4119.x), Math.round(_local4119.y));
		_local4118.Vm.fillStyle = _local4118.Mj;
		if (_local4121.ZV) _local4118.Vm.fillRect(-5e3, -5e3, 2e4, 2e4);else
		{
			this.yC(PixelUtil.vec.simplifyPath(_local4124), _local4125, _local4118.Vm);
			_local4118.Vm.fill();
		}
		_local4118.Vm.restore();
	} else {
		_local4118.Vm.fillStyle = NamedTabPanel.ut(NamedTabPanel.Ku(_local4121));
		_local4118.Vm.fillRect(0, 0, _local4116, _local4113);
		_local4118.Vm.save();
		_local4118.Vm.setTransform(_local4125.aS, _local4125.k, _local4125.S5, _local4125.Qd, _local4125.cI, _local4125.xu);
		var _local4112 = _local4121.root.children;
		for (var _local4108 = 0; _local4108 < _local4112.length; _local4108++) {
			var _local4114 = _local4112[_local4108].j;
			if (_local4114.add.artb == null || !_local4114.zD()) continue;
			var _local4111 = _local4114.dA(),
				_local4122 = _local4114.jL();
			if (_local4122 != 0) continue;
			_local4118.Vm.fillStyle = _local4118.Mj;
			_local4118.Vm.save();
			_local4118.Vm.scale(1 / _local4109.N, 1 / _local4109.N);
			_local4118.Vm.fillRect(_local4109.N * _local4111.x, _local4109.N * _local4111.y, _local4111.m * _local4109.N, _local4111.n * _local4109.N);
			_local4118.Vm.restore();
		}
		_local4118.Vm.restore();
	}
	if (_local4109.cM.length != _local4117.O()) {
		_local4109.cM = PixelUtil.allocBytes(_local4117.O());
		_local4109.aT = PixelUtil.allocBytes(_local4117.O() * 4);
	}
	_local4109.aT.fill(0);
	if (_local4121.add.fvec) {
		var _local4125 = _local4109.Gb(!0);
		_local4125.hI();
		_local4118.Vm.save();
		var _local4123 = PixelUtil.vec.simplifyPath(_local4109.Vm);
		PixelUtil.vec.transformCoords(_local4123.C, _local4109.Gb(!0), _local4123.C);
		var _local4115 = PixelUtil.vec.flattenPath(_local4123.C);
		_local4118.Vm.setTransform(_local4125.aS, _local4125.k, _local4125.S5, _local4125.Qd, _local4125.cI, _local4125.xu);
		this.yC(PixelUtil.vec.simplifyPath(new Rect(0, 0, _local4121.m, _local4121.n)), null, _local4118.Vm);
		_local4118.Vm.clip();
		_local4121.root.atE(_local4121, _local4118.Vm, this.wQ, _local4115);
		_local4118.Vm.restore();
	} else {
		PixelUtil.scale.ue(_local4121.buffer, _local4124, _local4110, _local4109.aT, _local4117, _local4121.ZV);
		var _local4120 = _local4121.Pi();
		if (_local4120) ICC.U.applyLUT(_local4120[_local4121.add.fcmy == 1 ? 5 : 3], _local4120[2], _local4109.aT, _local4109.aT);
		if (_local4109.MX[0] + _local4109.MX[1] + _local4109.MX[2] != 3) PixelUtil.mat4.KF(_local4109.aT, _local4109.aT, PixelUtil.mat4.ls(_local4109.MX));
		_local4118.yV.putImageData(new ImageData(new Uint8ClampedArray(_local4109.aT.buffer), _local4117.m, _local4117.n), 0, 0);
		_local4118.Vm.drawImage(_local4118.La, 0, 0);
		_local4118.Vm.getImageData(0, 0, 1, 1);
	}
	this.abo(_local4121);
};

NamedTabPanel.prototype.abo = function (l) {
	var _local4137 = l.u,
		_local4127 = _local4137.MX[0] + _local4137.MX[1] + _local4137.MX[2],
		_local4133 = NamedTabPanel.wn,
		_local4128 = !1,
		_local4135 = [];
	for (var _local4130 = 0; _local4130 < l.g.length; _local4130++) {
		var _local4129 = l.B[l.g[_local4130]];
		if (_local4129 == null) continue;
		var _local4131 = _local4129.ht;
		if (_local4131 != 1 && _local4131 != 3) continue;
		var _local4132 = _local4131 == 1 ? _local4129.c3() : _local4129.vZ(l).z;
		if (_local4132.jv) _local4135.push(_local4132);
	}
	for (var _local4136 = 0; _local4136 < l.vj.length; _local4136++)
	if (l.vj[_local4136].jv) _local4135.push(l.vj[_local4136]);
	for (var _local4134 = 0; _local4134 < _local4135.length; _local4134++) {
		var _local4132 = _local4135[_local4134];
		this.a5F(_local4132, _local4137, _local4135.length == 1 && _local4127 == 0 ? 2 : 1, _local4132.color, _local4132._A);
		_local4128 = !0;
	}
	var _local4126 = this.wQ;
	_local4128 = this.ak0(l, _local4133.Vm, _local4137, _local4135.length != 0) || _local4128;
	if (l.P && _local4126.Wi && _local4126.hq.vF) {
		this.a5F(l.P, _local4137, 0, 0, null);
		_local4128 = !0;
	}
	return _local4128;
};

NamedTabPanel.prototype.a5F = function (l, d, G, b, V) {
	var _local4147 = 0;
	if (V) _local4147 = Math.round(V.k) << 16 | Math.round(V.J) << 8 | Math.round(V.o);
	var _local4148 = d.Gb(!0),
		_local4149 = d.Vm,
		_local4140 = new Rect(0, 0, d.Kv.m, d.Kv.n),
		_local4141 = NamedTabPanel.wn;
	if (d.aT == null || d.aT.length != _local4149.O() * 4) {
		d.cM = PixelUtil.allocBytes(_local4149.O());
		d.aT = PixelUtil.allocBytes(_local4149.O() * 4);
	}
	d.cM.fill(b);
	d.aT.fill(0);
	var _local4142 = l.channel,
		_local4143 = l.rect;
	PixelUtil.scale.D(_local4142, _local4143, _local4148, d.cM, _local4149);
	if (G == 0) {
		var _local4144 = new Uint32Array([4278190080, 4294967295]);
		NamedTabPanel._f(new Uint8Array(_local4144.buffer));
		PixelUtil.P.ax3(d.cM, d.aT, _local4149, _local4144, s.getDevicePixelRatio() > 1.9);
	} else {
		var _local4146 = Date.now();
		PixelUtil.P.ahH(d.cM, d.aT, _local4149, G, _local4147);
		NamedTabPanel._f(d.aT);
	}
	var _local4145 = new ImageData(new Uint8ClampedArray(d.aT.buffer), _local4149.m, _local4149.n);
	_local4141.yV.putImageData(_local4145, 0, 0);
	_local4141.Vm.save();
	if (G != 0) {
		var _local4138 = new Rect(0, 0, _local4140.m, _local4140.n),
			_local4139 = _local4148.clone();
		_local4139.hI();
		this.yC(PixelUtil.vec.simplifyPath(_local4138), _local4139, _local4141.Vm);
		_local4141.Vm.clip();
	}
	_local4141.Vm.drawImage(_local4141.La, 0, 0);
	_local4141.Vm.restore();
};

NamedTabPanel.prototype.ak0 = function (doc, ctx, view, blendWithCanvas) {
	var drewOverlay = doc.I.Y1 != null || doc.I.Bt != null || doc.I.Cj != null || doc.I.iT.length != 0 || doc.I.P4.length != 0,
		prefs = this.wQ,
		viewOpts = prefs.hq,
		// theme = ThemeManager.themes[prefs.j$],
		fontPx = Math.round(12 * s.getDevicePixelRatio()),
		fontDoc = fontPx / doc.u.N,
		viewMatrix = view.Gb(!0);
	viewMatrix.hI();
	ctx.save();
	ctx.setTransform(viewMatrix.aS, viewMatrix.k, viewMatrix.S5, viewMatrix.Qd, viewMatrix.cI, viewMatrix.xu);
	if (doc.add.artd) {
		var labelShade = NamedTabPanel.Ku(doc)[0];
		labelShade = labelShade < .5 ? labelShade + .5 : labelShade - .5;
		labelShade = "" + Math.round(labelShade * 255).toString(16);
		while (labelShade.length < 2) labelShade = "0" + labelShade;
		ctx.fillStyle = "#" + labelShade + labelShade + labelShade;
		ctx.font = fontDoc + "px sans-serif";
		for (var li = 0; li < doc.B.length; li++) {
			var layer = doc.B[li];
			if (layer.add.artb == null || !layer.zD()) continue;
			var abRect = layer.dA();
			ctx.fillText(layer.getName(), abRect.x + 2, abRect.y - fontDoc * .7);
			drewOverlay = !0;
		}
	}

	function isHandleSeg(segType) {
		return segType == 1 || segType == 2 || segType == 4 || segType == 5;
	}
	var colBlue = NamedTabPanel.ut([.1, .5, 1, 1]),
		colWhite = NamedTabPanel.ut([1, 1, 1, 1]);
	if (prefs.Wi && viewOpts.t_) {
		ctx.fillStyle = ctx.strokeStyle = colBlue;
		ctx.lineWidth = 1.5 / view.N;
		var maskSel = doc.LW(),
			maskLayers = maskSel[0],
			maskIdx = maskSel[1];
		for (var mi = 0; mi < maskIdx.length; mi++) {
			var maskLayer = maskLayers[maskIdx[mi]],
				vmask = maskLayer.add.vmsk,
				segs = vmask.i,
				maskPath = PixelUtil.vec.pathFromSvg(segs);
			this.yC(maskPath, null, ctx);
			ctx.stroke();
			drewOverlay = !0;
			var handleR = 3 * s.getDevicePixelRatio() / view.N,
				lastSegIdx = segs.length - 3;
			for (var jgi = 0; jgi < vmask.JG.length; jgi++) {
				var ctrlPt = PixelUtil.path.OT(segs, vmask.JG[jgi]);
				if (ctrlPt == null) continue;
				var cx = ctrlPt.x,
					cy = ctrlPt.y;
				ctx.beginPath();
				var isFirst = jgi == 0;
				if (vmask.as) isFirst = !isFirst;
				if (isFirst) {
					ctx.moveTo(cx - handleR, cy - handleR);
					ctx.lineTo(cx + handleR, cy + handleR);
					ctx.moveTo(cx - handleR, cy + handleR);
					ctx.lineTo(cx + handleR, cy - handleR);
					ctx.stroke();
				} else {
					ctx.arc(cx, cy, handleR * 1, 0, 2 * Math.PI);
					ctx.fill();
				}
				drewOverlay = !0;
			}
			if (doc.g.length != 1) continue;
			var anchorIdx = -1;
			for (var si = 0; si < segs.length; si++) {
				if (segs[si].type > 5) continue;
				if (segs[si].type == 0 || segs[si].type == 3) {
					if (segs[si].H$ != -1) anchorIdx++;
					continue;
				}
				if (vmask.g.indexOf(anchorIdx) != -1) {
					var ax = segs[si].H.x,
						ay = segs[si].H.y;
					ctx.fillRect(ax - handleR * .8, ay - handleR * .8, 2 * handleR * .8, 2 * handleR * .8);
				}
				if (vmask.OE.indexOf(si) != -1) {
					var seg = segs[si],
						handlePts = [seg.H];
					ctx.beginPath();
					ctx.moveTo(seg.Wf.x, seg.Wf.y);
					ctx.lineTo(seg.H.x, seg.H.y);
					ctx.lineTo(seg.UU.x, seg.UU.y);
					var prevSeg = segs[si - 1],
						nextSeg = segs[si + 1];
					if (prevSeg && isHandleSeg(prevSeg.type) && vmask.OE.indexOf(si - 1) == -1) {
						ctx.moveTo(prevSeg.H.x, prevSeg.H.y);
						ctx.lineTo(prevSeg.UU.x, prevSeg.UU.y);
						handlePts.push(prevSeg.UU);
					}
					if (nextSeg && isHandleSeg(nextSeg.type) && vmask.OE.indexOf(si + 1) == -1) {
						ctx.moveTo(nextSeg.H.x, nextSeg.H.y);
						ctx.lineTo(nextSeg.Wf.x, nextSeg.Wf.y);
						handlePts.push(nextSeg.Wf);
					}
					ctx.stroke();
					if (!seg.H.XB(seg.Wf)) handlePts.push(seg.Wf);
					if (!seg.H.XB(seg.UU)) handlePts.push(seg.UU);
					for (var pi = 0; pi < handlePts.length; pi++) {
						var hpt = handlePts[pi],
							hx2 = hpt.x,
							hy2 = hpt.y;
						if (pi == 0 && (seg.type == 2 || seg.type == 5)) ctx.fillRect(hx2 - 1.2 * handleR, hy2 - 1.2 * handleR, 2.4 * handleR, 2.4 * handleR);else
						{
							ctx.beginPath();
							ctx.arc(hx2, hy2, handleR * 1.2, 0, 2 * Math.PI);
							ctx.fill();
							if (pi != 0) ctx.fillStyle = colWhite;
							ctx.beginPath();
							ctx.arc(hx2, hy2, handleR * .8, 0, 2 * Math.PI);
							ctx.fill();
							ctx.fillStyle = colBlue;
						}
					}
				}
				drewOverlay = !0;
			}
		}
	}
	ctx.lineWidth = 1 / view.N;
	if (doc.I.Iq) {
		ctx.fillStyle = ctx.strokeStyle = colBlue;
		var handlesPath = {
				C: [],
				F: []
			},
			unitCircle = NamedTabPanel.aq3;
		if (unitCircle == null) {
			unitCircle = NamedTabPanel.aq3 = {
				C: [1, 0],
				F: ["M"]
			};
			for (var ci = 1; ci < 30; ci++) {
				var ang = Math.PI * 2 * ci / 30;
				unitCircle.C.push(Math.cos(ang), Math.sin(ang));
				unitCircle.F.push("L");
			}
			unitCircle.F.push("Z", "M", "L", "M", "L");
			unitCircle.C.push(-.5, 0, .5, 0, 0, -.5, 0, .5);
		}
		for (var ti = 0; ti < doc.I.Iq.length; ti++) {
			var handleXform = f.Ur.abM(doc.I.Iq[ti], view),
				handleMat = new Matrix2D(handleXform[0], 0, 0, handleXform[0], handleXform[1], handleXform[2]);
			PixelUtil.vec.concat(handlesPath, unitCircle, handleMat);
		}
		this.yC(handlesPath, null, ctx);
		ctx.stroke();
		drewOverlay = !0;
	}
	var halfPxMat = new Matrix2D(1, 0, 0, 1, .5 / view.N, .5 / view.N);
	if (doc.ZV) {
		ctx.fillStyle = ctx.strokeStyle = colBlue;
		var docOutline = {
			C: [0, 0, doc.m, 0, doc.m, doc.n, 0, doc.n],
			F: ["M", "L", "L", "L", "Z"]
		};
		this.yC(docOutline, halfPxMat, ctx);
		ctx.stroke();
		drewOverlay = !0;
	}
	if (doc.I.Ru) {
		ctx.fillStyle = ctx.strokeStyle = NamedTabPanel.ut([0, 0, 0, .5]);
		this.yC(doc.I.Ru, null, ctx, !0);
		ctx.fill("evenodd");
	}
	ctx.fillStyle = ctx.strokeStyle = NamedTabPanel.ut([0, 0, 0, WebGLContext.webglAvailable && doc.add.fvec == null ? 1 : .5], !0);
	if (doc.I.Y1) {
		this.yC(doc.I.Y1, null, ctx);
		ctx.fill();
	}
	if (doc.I.Bt) {
		this.yC(doc.I.Bt, halfPxMat, ctx);
		ctx.stroke();
	}
	for (var heKey in doc.I.He)
	if (doc.I.He[heKey].Bt) {
		this.yC(doc.I.He[heKey].Bt, null, ctx);
		ctx.stroke();
		drewOverlay = !0;
	}
	var drewHandles = NamedTabPanel.aoJ(doc.I.jf, ctx, view);
	ctx.stroke();
	drewOverlay = drewOverlay || drewHandles;
	var gradPts = doc.I.g2;
	ctx.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
	ctx.beginPath();
	var outerR = 6 * s.getDevicePixelRatio() / view.N;
	for (var gi = 0; gi < gradPts.length; gi += 2) {
		drewOverlay = !0;
		var gx = gradPts[gi],
			gy = gradPts[gi + 1];
		ctx.moveTo(gx + outerR, gy);
		ctx.arc(gx, gy, outerR, 0, 2 * Math.PI);
	}
	ctx.fill();
	var innerR = 4 * s.getDevicePixelRatio() / view.N;
	for (var gi = 0; gi < gradPts.length; gi += 2) {
		drewOverlay = !0;
		var gx = gradPts[gi],
			gy = gradPts[gi + 1];
		ctx.fillStyle = NamedTabPanel.ut(doc.I.Qg.indexOf(gi >>> 1) != -1 ? [0, .6, 1, 1] : [.7, .7, .7, 1]);
		ctx.beginPath();
		ctx.moveTo(gx + innerR, gy);
		ctx.arc(gx, gy, innerR, 0, 2 * Math.PI);
		ctx.fill();
	}
	if (doc.I.iT.length != 0) {
		for (var ii = 0; ii < doc.I.iT.length; ii++) {
			var overlay = doc.I.iT[ii],
				oRect = overlay[1],
				imgData;
			if (blendWithCanvas) {
				imgData = ctx.getImageData(oRect.x, oRect.y, oRect.m, oRect.n);
				PixelUtil.blend.compositeBlend("norm", overlay[0], oRect, new Uint8Array(imgData.data.buffer), oRect, oRect, 1);
			} else imgData = new ImageData(new Uint8ClampedArray(overlay[0].buffer), oRect.m, oRect.n);
			ctx.putImageData(imgData, oRect.x, oRect.y);
		}
	}
	var halfPx = .5 / view.N;
	ctx.lineWidth = 1 / view.N;
	if (doc.I.nO) {
		drewOverlay = !0;
		var measure = doc.I.nO,
			measPts = measure.wx,
			measPath = {
				F: [],
				C: []
			};
		for (var mci = 0; mci < measure.KB.length; mci++) PixelUtil.vec.concat(measPath, PixelUtil.vec.simplifyPath(measure.KB[mci]));
		measPath.C = measPath.C.concat(measPts);
		for (var mci = 0; mci < measPts.length; mci += 4) {
			measPath.F.push("M", "L");
		}
		for (var pci = 0; pci < measPath.C.length; pci++) {
			measPath.C[pci] += halfPx;
		}
		ctx.strokeStyle = NamedTabPanel.ut([.9, .2, .2, 1]);
		this.yC(measPath, null, ctx);
		ctx.stroke();
		var dpr2 = s.getDevicePixelRatio(),
			measPad = 2 / view.N;
		ctx.font = fontDoc * .9 + "px sans-serif";
		for (var mci = 0; mci < measPts.length; mci += 4) {
			var x0 = measPts[mci],
				y0 = measPts[mci + 1],
				x1 = measPts[mci + 2],
				y1 = measPts[mci + 3],
				measLen = Math.sqrt((y1 - y0) * (y1 - y0) + (x1 - x0) * (x1 - x0));
			measLen = PixelUtil.y0.ij(measLen, doc.m7, prefs, y0 == y1 ? doc.m : doc.n);
			var measMid = new Point2D((m + jq) / 2, (p + iv) / 2);
			ctx.fillStyle = NamedTabPanel.ut([.9, .2, .2, 1]);
			var measTextW = ctx.measureText(kq).width;
			ctx.fillRect(measMid.x - measTextW / 2 - measPad * dpr2, measMid.y - 3.5 * measPad * dpr2, measTextW + 2 * measPad * dpr2, 7 * measPad * dpr2);
			ctx.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
			ctx.save();
			ctx.translate(measMid.x - measTextW / 2, measMid.y + 2 * hn * iw);
			ctx.scale(.1, .1);
			ctx.font = e * 9 + "px sans-serif";
			ctx.fillText(kq, 0, 0);
			ctx.restore();
		}
	}
	if (prefs.Wi) {
		if (viewOpts.vr && doc.u.N > 10 && doc.add.fvec == null) {
			this.C9(doc, ctx, 1, 1, .25, viewOpts.ra, 16777215);
			drewOverlay = !0;
		}
		if (viewOpts.Sp) {
			var gridStep = PixelUtil.y0.Sw(viewOpts.rp, doc.m7, doc.m, viewOpts.v7),
				gridStepY = gridStep;
			if (viewOpts.v7 == 4) gridStepY *= doc.n / doc.m;
			this.C9(doc, ctx, gridStep, gridStepY, 1, viewOpts.ra, viewOpts.E6);
			drewOverlay = !0;
		}
		if (viewOpts.qz) {
			var guides = doc.Ww(),
				activeBoardIdx = doc.bZ(),
				guideLen = Math.max(doc.u.Vm.m, doc.u.Vm.n) / doc.u.N;
			guideLen = Math.max(Math.max(doc.m, doc.n) * 2, guideLen);
			for (var gdi = 0; gdi < guides[0].length; gdi++) {
				var guide = guides[0][gdi],
					guideBoard = guides[1][gdi];
				if (guideBoard != -1 && guideBoard != activeBoardIdx) continue;
				var gScreen = view.dN(guide[1], guide[1]),
					gSnap = view.Zx(Math.floor(gScreen.x) + .5, Math.floor(gScreen.y) + .5);
				ctx.beginPath();
				ctx.strokeStyle = NamedTabPanel.ut([0, guideBoard == -1 ? 1 : .5, 1, 1]);
				if (guide[0] == 0) {
					var gxPos = gSnap.x;
					ctx.moveTo(gxPos, -guideLen);
					ctx.lineTo(gxPos, guideLen);
				} else {
					var gyPos = gSnap.x;
					ctx.moveTo(-guideLen, gyPos);
					ctx.lineTo(guideLen, gyPos);
				}
				ctx.stroke();
				drewOverlay = !0;
			}
		}
		var slices = doc.Vp;
		if (viewOpts.Vp && slices.length != 0) {
			ctx.font = fontDoc * .8 + "px sans-serif";
			var sliceRects = [],
				selSliceRects = [];
			for (var sli = 0; sli < slices.length; sli++) {
				var sliceRect = f.UA.LP(slices, sli);
				sliceRects.push(sliceRect);
				if (doc.Ci.indexOf(sli) != -1) selSliceRects.push(sliceRect);
			}
			sliceRects.reverse();
			var nowTs = Date.now();
			sliceRects = PixelUtil.rect.FA([0, 0, doc.m, doc.n], sliceRects);
			for (var pass = 0; pass < 2; pass++)
			for (var ri = 0; ri < sliceRects.length; ri++) {
				var rect = sliceRects[ri],
					sliceRef = rect[4],
					sliceObj = sliceRef != null ? slices[sliceRef] : null;
				if (sliceObj && pass == 0 || sliceObj == null && pass == 1) continue;
				var x0 = Math.round(rect[0]),
					y0 = Math.round(rect[1]),
					x1 = Math.round(rect[2]),
					y1 = Math.round(rect[3]);
				ctx.strokeStyle = ctx.fillStyle = NamedTabPanel.ut(f7 ? [0, .7, .7, 1] : [.8, .8, .8, 1]);
				ctx.strokeRect(x0 + halfPx, y0 + halfPx, x1 - x0, y1 - y0);
				var label = ri + 1,
					labelMetrics = ctx.measureText(label),
					labelW = labelMetrics.width;
				ctx.fillRect(x0, y0, labelW + fontDoc / 2, fontDoc);
				ctx.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
				ctx.fillText(label, x0 + fontDoc / 4, y0 + fontDoc * .8);
			}
			var handleHalf = 2 / doc.u.N,
				handleSize = 2 * handleHalf;
			for (var ri = 0; ri < selSliceRects.length; ri++) {
				var rect = selSliceRects[ri],
					x0 = Math.round(rect[0]),
					y0 = Math.round(rect[1]),
					x1 = Math.round(rect[2]),
					y1 = Math.round(rect[3]);
				ctx.strokeStyle = ctx.fillStyle = NamedTabPanel.ut([1, .6, 0, 1]);
				ctx.strokeRect(x0 + halfPx, y0 + halfPx, x1 - x0, y1 - y0);
				var corners = [x0, y0, x1, y0, x1, y1, x0, y1];
				for (var ci2 = 0; ci2 < corners.length; ci2 += 2) {
					var cxv = corners[ci2],
						cyv = corners[ci2 + 1],
						nxv = corners[ci2 + 2 & 7],
						nyv = corners[ci2 + 3 & 7];
					ctx.fillRect(cxv - handleHalf, cyv - handleHalf, handleSize, handleSize);
					ctx.fillRect(Math.round((cxv + nxv) / 2) - handleHalf, Math.round((cyv + nyv) / 2) - handleHalf, handleSize, handleSize);
				}
			}
			drewOverlay = !0;
		}
		var annos = doc.add.Anno;
		if (annos && annos.length != 0)
		for (var ai = 0; ai < annos.length; ai++) {
			var anno = annos[ai],
				annoColor = anno[2],
				annoX = anno[0] - gX,
				annoY = anno[1] - gX,
				annoSize = 30 / view.ma,
				annoInner = .4 * annoSize,
				annoOuter = .6 * annoSize;
			ctx.beginPath();
			ctx.moveTo(annoX, annoY + annoOuter);
			ctx.lineTo(annoX, annoY);
			ctx.lineTo(annoX + annoSize, annoY);
			ctx.lineTo(annoX + annoSize, annoY + annoSize);
			ctx.lineTo(annoX + annoInner, annoY + annoSize);
			ctx.closePath();
			ctx.lineTo(annoX + annoInner, annoY + annoOuter);
			ctx.lineTo(annoX + annoInner, annoY + annoSize);
			if (ai == doc.u.$m) {
				ctx.lineWidth *= 5;
				ctx.strokeStyle = NamedTabPanel.ut([0, 0, 0, .5]);
				ctx.stroke();
				ctx.lineWidth /= 5;
			}
			ctx.fillStyle = NamedTabPanel.ut([annoColor.o / 255, annoColor.J / 255, annoColor.k / 255, 1]);
			ctx.fill();
			ctx.strokeStyle = NamedTabPanel.ut([0, 0, 0, 1]);
			ctx.stroke();
		}
	}
	ctx.strokeStyle = NamedTabPanel.ut([1, 0, 0, 1]);
	if (doc.I.Cj) {
		this.yC(doc.I.Cj, halfPxMat, ctx);
		ctx.stroke();
	}
	ctx.restore();
	if (prefs.bI) {
		var availRect = doc.u.aR();
		var rS = PixelUtil.y0.mT;
		if (doc.u.C5 == null || doc.u.C5.width != availRect.m || doc.u.XF.height != availRect.n) {
			doc.u.X7 = ctx.createImageData(rS, rS);
			doc.u.C5 = ctx.createImageData(availRect.m + rS, rS);
			doc.u.XF = ctx.createImageData(rS, availRect.n + rS);
		}
		var rulerOriginX = -availRect.x,
			rulerOriginY = -availRect.y,
			contentW = doc.m,
			contentH = doc.n;
		// With an active artboard, ruler zero is the artboard's top-left (not the document's).
		if (doc.bZ() != -1) {
			var artboardRect = doc.B[doc.bZ()].dA();
			rulerOriginX = artboardRect.x;
			rulerOriginY = artboardRect.y;
			contentW = artboardRect.m;
			contentH = artboardRect.n;
		}
		rulerOriginX *= view.N;
		rulerOriginY *= view.N;
		var viewState = doc.u,
			// Units: [px, inch, cm, mm, %] -> document-space scale per ruler unit.
			unitScale = [1, doc.m7, doc.m7 / 2.54, doc.m7 / 25.4, contentW / 100][viewOpts.SF],
			halfDocScreenW = viewState.N * doc.m / 2,
			halfDocScreenH = viewState.N * doc.n / 2,
			horizAxisTransform = [viewState.N * unitScale, new Point2D(viewState.R.x + (rulerOriginX + halfDocScreenW * unitScale - halfDocScreenW), viewState.R.y + (rulerOriginY + halfDocScreenH * unitScale - halfDocScreenH))];
		if (viewOpts.SF == 4) unitScale *= contentH / contentW;
		var vertAxisTransform = [viewState.N * unitScale, new Point2D(viewState.R.x + (rulerOriginX + halfDocScreenW * unitScale - halfDocScreenW), viewState.R.y + (rulerOriginY + halfDocScreenH * unitScale - halfDocScreenH))],
			cursorPos = this.zS.YE;
		PixelUtil.y0.rulers(viewState, horizAxisTransform, vertAxisTransform);
		NamedTabPanel._f(doc.u.XF.data);
		NamedTabPanel._f(doc.u.C5.data);
		NamedTabPanel._f(doc.u.X7.data);
		ctx.putImageData(doc.u.XF, availRect.x-rS, availRect.y);    // left ruler
		ctx.putImageData(doc.u.C5, availRect.x,    availRect.y-rS); // top ruler
		ctx.putImageData(doc.u.X7, availRect.x-rS, availRect.y-rS); // ruler corner

		// var zoomLabelImg = LayerCanvasPanel.ae$(viewState.N, NamedTabPanel.ut([1, 1, 1, 1]), doc.m, doc.n);
		// ctx.putImageData(zoomLabelImg, availRect.x, doc.u.Vm.n - zoomLabelImg.height);
	}
	if (doc.I.P4.length != 0) {
		for (var pi3 = 0; pi3 < doc.I.P4.length; pi3++) {
			var p4item = doc.I.P4[pi3],
				p4rect = p4item[1];
			ctx.putImageData(new ImageData(new Uint8ClampedArray(p4item[0].buffer), p4rect.m, p4rect.n), p4rect.x, p4rect.y);
		}
	}
	return drewOverlay || prefs.bI;
};

NamedTabPanel.prototype.C9 = function (l, d, G, b, V, Q, t) {
	while (G * l.u.N < 4) {
		G *= 2;
		b *= 2;
	}
	var _local4283 = l.m,
		_local4289 = l.n,
		_local4287 = .5 / l.u.N;
	t = PixelUtil.intToRgb(t);
	d.strokeStyle = NamedTabPanel.ut([t.o / 255, t.J / 255, t.k / 255, V], !1);
	d.save();
	d.rect(0, 0, _local4283, _local4289);
	d.clip();
	d.beginPath();
	for (var _local4285 = 0; _local4285 <= _local4283; _local4285 += G) {
		d.moveTo(_local4285 + _local4287, 0);
		d.lineTo(_local4285 + _local4287, _local4289);
	}
	if (Q == 0) {
		for (var _local4286 = 0; _local4286 <= _local4289; _local4286 += b) {
			d.moveTo(0, _local4286 + _local4287);
			d.lineTo(_local4283, _local4286 + _local4287);
		}
	} else {
		b *= Math.sqrt(4 / 3);
		var _local4284 = b * Math.floor(_local4283 / b),
			_local4288 = _local4283 * (b / (2 * G));
		for (var _local4286 = -_local4284; _local4286 <= _local4289 + _local4284; _local4286 += b) {
			d.moveTo(0, _local4286);
			d.lineTo(_local4283, _local4286 - _local4288);
			d.moveTo(0, _local4286);
			d.lineTo(_local4283, _local4286 + _local4288);
		}
	}
	d.stroke();
	d.restore();
};

NamedTabPanel.aoJ = function (l, d, G, b) {
	d.beginPath();
	var _local4293 = (b ? b : 1) * (4 * s.getDevicePixelRatio() + .5) / G.N,
		_local4292 = !1;
	for (var _local4290 = 0; _local4290 < l.length; _local4290 += 2) {
		_local4292 = !0;
		var _local4294 = l[_local4290],
			_local4291 = l[_local4290 + 1];
		d.rect(_local4294 - _local4293, _local4291 - _local4293, 2 * _local4293, 2 * _local4293);
	}
	return _local4292;
};

NamedTabPanel.US = function (l, d, G, b) {
	G.beginPath();
	if (b) G.rect(-1e5, -1e5, 1e6, 1e6);
	var _local4295 = l;
	if (d) {
		_local4295 = PixelUtil.vec.clonePoint(l);
		PixelUtil.vec.transformCoords(_local4295.C, d, _local4295.C);
	}
	Typr.U.pathToContext({
		cmds: _local4295.F,
		crds: _local4295.C
	}, G);
};

NamedTabPanel.prototype.yC = NamedTabPanel.US;

NamedTabPanel.Js = function (l, d, G) {
	WebGLContext.ShaderProgram.call(this);
	var _local4298 = d != 0,
		_local4297 = G ? "true" : "in01(sCoord)",
		_local4296 = `
			precision mediump float;
			uniform sampler2D source;
			uniform sampler2D target;
			${l ? "uniform sampler2D lut;  uniform float N;  " + WebGLContext.Li.z7 : ""}
			uniform vec3 contSizeZoom;
			uniform vec2 cnvSize;
			uniform mat4 ctrn;
			${_local4298 ? "uniform vec4 bgClr;  uniform vec4 ars[" + d + "]; " : ""}
			varying vec2 tCoord;
			varying vec2 sCoord;
			varying vec2 gCoord;
			/* This approximates the error function, needed for the gaussian integral */
			vec4 erf(vec4 x) {
				vec4 s = sign(x), a = abs(x);
				x = 1.0 + (0.278393 + (0.230389 + 0.078108 * (a * a)) * a) * a;
				x *= x;
				return s - s / (x * x);
			}
			/* Return the mask for the shadow of a box from lower to upper */
			float boxShadow(vec2 lower, vec2 upper, vec2 point, float sigma) {
				vec4 query = vec4(point - lower, point-upper);
				vec4 integral = 0.5 + 0.5 * erf(query * (sqrt(0.5) / sigma));
				return (integral.z - integral.x) * (integral.w - integral.y);
			}
			vec4 simpleBlend(vec4 src, vec4 tgt) {
				float na = src.w + tgt.w*(1.0-src.w);
				/* avoid division by zero */
				return na==0.0 ? vec4(0,0,0,0) : vec4( (src.xyz*src.w + tgt.w*tgt.xyz*(1.0-src.w))*(1.0/na), na);
			}
			${WebGLContext.Li.Qy}
			void main(void) {
				vec4 src = texture2D(source, tCoord);
				vec4 tgt = texture2D(target, sCoord${G ? "-floor(sCoord)" : ""});
				${l ? "tgt.rgb = mapLut(tgt, lut, N).rgb; " : ""}
				tgt = ctrn * tgt;
				${_local4298 ? `
					bool inr = false; vec4 BG = bgClr;
					for(int i=0; i<${d}; i++) {
						vec4 ar = ars[i];
						vec2 nsc = sCoord - ar.xy;
						if( ar.z!=0.0 && in01(nsc/ar.zw) ){
							inr=true; BG=mod(floor(gCoord.x) + floor(gCoord.y), 2.0)==1.0 ? vec4(0.784,0.784,0.784,1) : vec4(1,1,1,1);
						}
					}
				` : `
					float shdw = 0.3*boxShadow(vec2(0,0),contSizeZoom.xy, sCoord*contSizeZoom.xy+vec2(0.0,-6.0*contSizeZoom.z) , 10.0*contSizeZoom.z);
					vec4 grid = mod(floor(gCoord.x) + floor(gCoord.y), 2.0)==1.0 ? vec4(0.62,0.67,0.67,1) : vec4(0.85,0.9,0.9,1);
					vec4 BG = ${_local4297} ? grid : vec4(0.0,0.0,0.0,shdw);
				`}
				vec4 outc = ${_local4297} ?  simpleBlend(tgt,BG) :  BG ;
				if(src.b == 0.0 && src.a >0.5) gl_FragColor = mix(outc, vec4(vec3(1,1,1)-outc.rgb,1.0), src.w);
				else             gl_FragColor = simpleBlend(src,outc);
			}
		`,
		_local4299 = `
			attribute vec2 verPos;
			varying vec2 tCoord;
			varying vec2 sCoord;
			varying vec2 gCoord;
			uniform mat3 tmat;
			uniform vec4 gsize;
			void main(void) {
				tCoord = verPos;
				sCoord = (tmat*vec3(verPos,1.0)).xy;
				gCoord = (verPos-gsize.zw) * gsize.xy ;
				gl_Position = vec4(vec2(-1.0, 1.0) + 2.0*vec2(verPos.x,-verPos.y), 0.0, 1.0);
			}
		`;
	this.compileProgram(_local4296, _local4299);
};

NamedTabPanel.Js.prototype = new WebGLContext.ShaderProgram();

NamedTabPanel.Js.prototype.draw = function (l, d, G, b, V, Q, t, I, y, e, M, R, J, n) {
	this.initUniformLocations("tmat gsize source target lut N contSizeZoom cnvSize bgClr ars ctrn".split(" "));
	var _local4302 = WebGLContext.gl,
		_local4300 = this.uniformLocations;
	_local4302.uniformMatrix3fv(_local4300.tmat, !1, G);
	_local4302.uniform4fv(_local4300.gsize, b);
	_local4302.uniform3f(_local4300.contSizeZoom, V, Q, t);
	_local4302.uniform2f(_local4300.cnvSize, I, y);
	_local4302.uniformMatrix4fv(_local4300.ctrn, !1, R);
	if (this.at6) {
		_local4302.uniform4fv(_local4300.ars, M);
		_local4302.uniform4fv(_local4300.bgClr, e);
	}
	_local4302.uniform1i(_local4300.source, 0);
	_local4302.uniform1i(_local4300.target, 1);
	_local4302.activeTexture(_local4302.TEXTURE0);
	_local4302.bindTexture(_local4302.TEXTURE_2D, l);
	_local4302.activeTexture(_local4302.TEXTURE1);
	_local4302.bindTexture(_local4302.TEXTURE_2D, d);
	if (J) {
		_local4302.uniform1f(_local4300.N, n);
		_local4302.uniform1i(_local4300.lut, 2);
		_local4302.activeTexture(_local4302.TEXTURE2);
		_local4302.bindTexture(_local4302.TEXTURE_2D, J.glTexture);
		var _local4301 = _local4302.LINEAR;
		_local4302.texParameteri(_local4302.TEXTURE_2D, _local4302.TEXTURE_MIN_FILTER, _local4301);
		_local4302.texParameteri(_local4302.TEXTURE_2D, _local4302.TEXTURE_MAG_FILTER, _local4301);
	}
	_local4302.activeTexture(_local4302.TEXTURE0);
};


function ToolOptionsWithFeatures(l, d) {
	ToolOptionsBase.call(this);
	if (l) return;
	this.pK = {};
	for (var _local4443 = 0; _local4443 < d.length; _local4443++) {
		var _local4444 = d[_local4443],
			_local4445 = null;
		if (_local4444 == "binop") _local4445 = new PathOpsButtonGroup();
		if (_local4444 == "feat") {
			_local4445 = new RangeDropInput("Feather", 0, 100, "px");
			_local4445.c(0);
		}
		if (_local4444 == "redge") _local4445 = new ToolbarButton("Refine Edge", !1, null, !0);
		if (_local4444 == "wconf") _local4445 = new MagicWandOptions();
		if (_local4444 == "cstr") _local4445 = new ConstraintOptions();
		if (_local4444 == "anta") {
			_local4445 = new CheckboxControl("Anti-alias");
			_local4445.c(!0);
		}
		if (_local4444 == "sall") _local4445 = new CheckboxControl("Sample All Layers");
		if (_local4444 == "redge") _local4445.addListener("click", this.gA, this);else
		_local4445.addListener(ActionTypes.E.A, this.S9, this);
		_local4445.parent = this;
		this.body.appendChild(_local4445.e);
		this.pK[_local4444] = _local4445;
	}
}
ToolOptionsWithFeatures.prototype = new ToolOptionsBase();
ToolOptionsWithFeatures.prototype.IF = function (l) {
	if (l.Si != null) this.pK.binop.c(l.Si);else
	if (l.HS) {
		for (var _local4449 in l.HS)
		if (this.pK[_local4449]) this.pK[_local4449].c(l.HS[_local4449]);
	} else {
		var _local4446 = aM.mI;
		if (_local4446 == null) {
			var _local4448 = hs.aj2(!0);
			// _local4446 = aM.mI = new ContextPanel(_local4448.items, _local4448.iD);
		}
		// _local4446.refresh();
		// _local4446.parent = this;
		// _local4446.update(l.T1, l.wQ);
		var _local4447 = new Action(ActionTypes.E.L, !0);
		_local4447.data = {
			a: ActionTypes.$.dY,
			A3: _local4446,
			x: l.Zm.pf + 2,
			y: l.Zm.pi + 1
		};
		this.dispatch(_local4447);
	}
};
ToolOptionsWithFeatures.prototype.lx = function () {
	for (var _local4450 in this.pK) this.pK[_local4450].refresh();
};
ToolOptionsWithFeatures.prototype.gA = function () {
	var _local4451 = new Action(ActionTypes.E.L, !0);
	_local4451.data = {
		a: ActionTypes.$.SN,
		GU: "redge"
	};
	this.dispatch(_local4451);
};
ToolOptionsWithFeatures.prototype.S9 = function () {
	var _local4453 = new Action(ActionTypes.E.L, !0);
	_local4453.data = {
		a: ActionTypes.$.kl,
		G: this.G,
		HS: {}
	};
	for (var _local4452 in this.pK) _local4453.data.HS[_local4452] = this.pK[_local4452].b();
	this.dispatch(_local4453);
};

function ToolOptionsWithKeys(l) {
	ToolOptionsBase.call(this);
	if (l == null) return;
	this.mN = null;
	this.pK = {};
	if (l.indexOf("brush") != -1 && l.indexOf("prsr") == -1) l.push("prsr");
	for (var _local4425 = 0; _local4425 < l.length; _local4425++) {
		var _local4427 = l[_local4425],
			_local4426 = null;
		if (_local4427 == "brush") {
			_local4426 = new BrushPickerButton();
		}
		if (_local4427 == "bmode") {
			_local4426 = new DropdownMenu("Blend Mode", au.YJ, au.hY);
		}
		if (_local4427 == "bmode0") {
			_local4426 = new DropdownMenu("Blend Mode", au.YJ.slice(23));
		}
		if (_local4427 == "emode") {
			_local4426 = new DropdownMenu("Mode", ["Brush", "Pencil Tool"]);
		}
		if (_local4427 == "opacity") {
			_local4426 = new RangeDropInput("Opacity", 0, 100, "%");
			_local4426.c(100);
		}
		if (_local4427 == "flow") {
			_local4426 = new RangeDropInput("Flow", 0, 100, "%");
			_local4426.c(100);
		}
		if (_local4427 == "smth") {
			_local4426 = new RangeDropInput("Smooth", 0, 100, "%");
			_local4426.c(0);
		}
		if (_local4427 == "samp") {
			_local4426 = new DropdownMenu("Mode", ["Continuous", "Once", "Backgroud"]);
		}
		if (_local4427 == "wconf") {
			_local4426 = new MagicWandOptions();
			_local4426.c([40, !0, !0]);
		}
		if (_local4427 == "sall") {
			_local4426 = new CheckboxControl("Sample All Layers");
		}
		if (_local4427 == "strn") {
			_local4426 = new RangeDropInput("Strength", 1, 100, "%");
			_local4426.c(50);
		}
		if (_local4427 == "smode") {
			_local4426 = new DropdownMenu("Mode", ["Desaturate", "Saturate"]);
			_local4426.c(1);
		}
		if (_local4427 == "pdetail") {
			_local4426 = new CheckboxControl("Protect Detail");
			_local4426.Nu();
		}
		if (_local4427 == "rng") {
			_local4426 = new DropdownMenu("Range", ["Shadows", "Midtones", "Highlights"]);
			_local4426.c(1);
		}
		if (_local4427 == "expo") {
			_local4426 = new RangeDropInput("Exposure", 0, 100, "%");
			_local4426.c(50);
		}
		if (_local4427 == "algnd") {
			_local4426 = new CheckboxControl("Aligned");
			_local4426.c(!1);
		}
		if (_local4427 == "sfrom") {
			_local4426 = new DropdownMenu("Source", ["Current Layer", "Current & Below", "All Layers"]);
		}
		if (_local4427 == "alt") {
			_local4426 = new MultiOptionBox(null, ["Alt"], !0, ["Select Source"]);
		}
		if (_local4427 == "qsmode") {
			_local4426 = new ButtonGroupMenu("Mode",
			[
			"<img src=\"" + PIMG["set/front"] + "\" class=\"autoscale gsicon\" />",
			"<img src=\"" + PIMG.zoomIn + "\" class=\"autoscale gsicon\" />",
			"<img src=\"" + PIMG.zoomOut + "\" class=\"autoscale gsicon\" />"],

			["New", "Unite", "Subtract"]
			);
		}
		if (_local4427 == "redge") {
			_local4426 = new ToolbarButton("Refine Edge", !1, null, !0);
		}
		if (_local4427 == "setop") {
			_local4426 = new PathOpsButtonGroup();
		}
		if (_local4427 == "patch") {
			_local4426 = new ButtonGroupMenu(null, ["Source", "Target"]);
		}
		if (_local4427 == "prsr") {
			_local4426 = this.pK.brush.Hp;
		}
		this.body.appendChild(_local4426.e);
		if (_local4427 == "prsr") continue;
		_local4426.parent = this;
		this.pK[_local4427] = _local4426;
		if (_local4427 == "brush") _local4426.addListener(ActionTypes.E.A, this.aop, this);else
		if (_local4427 == "redge") _local4426.addListener("click", this.gA, this);else
		_local4426.addListener(ActionTypes.E.A, this.S9, this);
	}
}
ToolOptionsWithKeys.prototype = new ToolOptionsBase();
ToolOptionsWithKeys.prototype.a81 = function (l, d) {
	l = l[1];
	var _local4428 = this.pK;
	if (l.Md) _local4428.bmode.c(au.Point2D.indexOf(l.Md.v.BlnM));
	if (l.Opct) _local4428.opacity.c(l.Opct.v);
	if (l.flow) _local4428.flow.c(l.flow.v);
	if (l.Brsh) _local4428.brush.c(l, d.pO.BF, d.pO.yO);
	if (l.FrgC) {
		var _local4430 = PixelUtil.color.sampleGradientColor(l.FrgC.v),
			_local4429 = new Action(ActionTypes.E.L, !0);
		_local4429.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.K5,
			y3: 0,
			Z: _local4430.o << 16 | _local4430.J << 8 | _local4430.k
		};
		this.dispatch(_local4429);
	}
	this.aop();
	this.S9();
};
ToolOptionsWithKeys.prototype.a5o = function () {
	if (f.y5[this.G] == null) return null;
	var _local4433 = this.pK,
		_local4432 = JSON.parse(JSON.stringify(_local4433.brush.b()));
	_local4432.classID = f.y5[this.G][1][0];
	if (_local4433.bmode) _local4432.Md = {
		t: "enum",
		v: {
			BlnM: au.Point2D[_local4433.bmode.b()]
		}
	};
	if (_local4433.opacity) _local4432.Opct = {
		t: "long",
		v: _local4433.opacity.b()
	};
	if (_local4433.flow) _local4432.flow = {
		t: "long",
		v: _local4433.flow.b()
	};
	var _local4431 = this.mN.Y7;
	_local4431 = {
		o: _local4431 >>> 16,
		J: _local4431 >>> 8 & 255,
		k: _local4431 & 255
	};
	_local4432.FrgC = {
		t: "Objc",
		v: PixelUtil.color.rgbColorDescriptor(_local4431)
	};
	return ["Brush Preset " + _local4432.Brsh.v.Dmtr.v.val, _local4432];
};
ToolOptionsWithKeys.prototype.gA = function () {
	var _local4434 = new Action(ActionTypes.E.L, !0);
	_local4434.data = {
		a: ActionTypes.$.SN,
		GU: "redge"
	};
	this.dispatch(_local4434);
};
ToolOptionsWithKeys.prototype.lx = function () {
	for (var _local4435 in this.pK) this.pK[_local4435].refresh();
};
ToolOptionsWithKeys.prototype.IF = function (l) {
	if (l.a2q == "showBrushOpts") {
		this.pK.brush.axE(l.be.x, l.be.y);
	}
	for (var _local4437 in l.DY) {
		var _local4436 = l.DY[_local4437];
		if (_local4437 != "qsmode") _local4436 *= 100;
		if (this.pK[_local4437]) this.pK[_local4437].c(_local4436);
	}
};
ToolOptionsWithKeys.prototype.BM = function (l, d) {
	ToolOptionsBase.prototype.BM.call(this, l, d);
	this.mN = l;
	var _local4438 = this.pK.brush;
	if (_local4438 == null) return;
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.CV) _local4438.Z2(l.pO);
	if (d == PsdResourceTypes.Sq) {
		_local4438.c(l.pO.Em, l.pO.BF, l.pO.yO);
	}
};
ToolOptionsWithKeys.prototype.aop = function () {
	var _local4439 = new Action(ActionTypes.E.L, !0);
	_local4439.data = {
		a: ActionTypes.$.kI,
		Oo: PsdResourceTypes.Sq,
		Q_: this.pK.brush.b()
	};
	this.dispatch(_local4439);
};
ToolOptionsWithKeys.prototype.S9 = function () {
	var _local4442 = new Action(ActionTypes.E.L, !0);
	_local4442.data = {
		a: ActionTypes.$.kl,
		G: this.G
	};
	for (var _local4441 in this.pK) {
		if (_local4441 == "brush" || _local4441 == "redge") continue;
		var _local4440 = this.pK[_local4441].b();
		if (["opacity", "flow", "smth", "strn", "expo"].indexOf(_local4441) != -1) _local4442.data[_local4441] = _local4440 / 100;else
		if (_local4441 == "bmode") _local4442.data.bmode = au.CP[_local4440];else
		if (_local4441 == "bmode0") _local4442.data.bmode = au.CP[23 + _local4440];else
		_local4442.data[_local4441] = _local4440;
	}
	this.dispatch(_local4442);
};



function BrushEraserOptionsBase(l) {
	ToolOptionsBase.call(this);
	if (l == null) return;
	var _local4457 = s.createElement("span", "fitem");
	this.body.appendChild(_local4457);
	var _local4455 = [
	[17, 0],
	[17, 1],
	[11, 12, 0],
	[17, 2]];

	this.c2 = [];
	for (var _local4454 = 0; _local4454 < _local4455.length; _local4454++) {
		var _local4456 = new ToolbarButton(_local4455[_local4454], !1, null, !0);
		this.c2.push(_local4456);
		_local4456.addListener("click", this.ax5, this);
		if (!l || _local4454 == 1) _local4457.appendChild(_local4456.e);
	}
	this.Tf = new ConstraintOptions();
	this.Tf.addListener(ActionTypes.E.A, this.ats, this);
	if (!l) this.body.appendChild(this.Tf.e);
	this.wX = new ToolbarButton("Straighten Layer", !1, null, !0);
	this.wX.addListener("click", this.ax5, this);
	if (!l) this.body.appendChild(this.wX.e);
	this.x2 = new CheckboxControl("Delete Cropped Pixels");
	this.x2.addListener(ActionTypes.E.A, this.ats, this);
	if (!l) this.body.appendChild(this.x2.e);
	this.P_ = new ConfirmCancelButtons();
	this.P_.addListener("click", this.aL, this);
}
BrushEraserOptionsBase.prototype = new ToolOptionsBase();
BrushEraserOptionsBase.prototype.lx = function () {
	this.P_.refresh();
	for (var _local4458 = 0; _local4458 < this.c2.length; _local4458++) this.c2[_local4458].refresh();
	this.Tf.refresh();
	this.x2.refresh();
	this.wX.refresh();
};
BrushEraserOptionsBase.prototype.IF = function (l) {
	var _local4459 = this.P_.e;
	if (l.rl) this.body.appendChild(_local4459);else
	if (this.body.contains(_local4459)) this.body.removeChild(_local4459);
	if (l.Tf) this.Tf.c(l.Tf);
};
BrushEraserOptionsBase.prototype.aL = function (l) {
	var _local4461 = {
			a: ActionTypes.$.kl,
			G: this.G,
			DI: this.P_.b() ? "commit" : "cancel"
		},
		_local4460 = new Action(ActionTypes.E.L, !0);
	_local4460.data = _local4461;
	this.dispatch(_local4460);
};
BrushEraserOptionsBase.prototype.ax5 = function (l) {
	l.target.e.blur();
	var _local4463 = {
		a: ActionTypes.$.kl,
		G: this.G,
		DI: "cropby",
		ajO: this.c2.indexOf(l.target)
	};
	if (l.target == this.wX) _local4463.DI = "straighten";
	var _local4462 = new Action(ActionTypes.E.L, !0);
	_local4462.data = _local4463;
	this.dispatch(_local4462);
};
BrushEraserOptionsBase.prototype.ats = function (l) {
	var _local4465 = {
			a: ActionTypes.$.kl,
			G: this.G,
			DI: "config",
			mx: {
				nV: this.Tf.b(),
				UP: this.x2.b()
			},
			amr: l.target == this.Tf
		},
		_local4464 = new Action(ActionTypes.E.L, !0);
	_local4464.data = _local4465;
	this.dispatch(_local4464);
};






function ShapeVectorToolOptions(l, d) {
	ToolOptionsBase.call(this);
	if (l == null) return;
	this.gH = l;
	this.nJ = {};
	this.au1 = d;
	var _local4543 = ShapeVectorToolOptions.prototype.S9.bind(this);
	for (var _local4540 = 0; _local4540 < l.length; _local4540++) {
		var _local4541 = l[_local4540],
			_local4542 = null;
		if (_local4541 == "tmode") {
			_local4542 = new DropdownMenu(null, ["Shape", "Path", "Pixels"]);
			_local4542.c(0);
			if (d) _local4542.a27(2);
		}
		if (_local4541 == "make") {
			_local4542 = new ButtonGroupMenu("Make", ["Selection", "Shape"], null, !0);
		}
		if (_local4541 == "anta") {
			_local4542 = new CheckboxControl("Anti-alias");
			_local4542.c(!0);
		}
		if (_local4541 == "binop") {
			_local4542 = new DropdownMenu(null, ["New Layer", "Unite", "Subtract", "Intersect", "Exclude"]);
		}
		if (_local4541 == "pshape") _local4542 = new DropdownMenu(null, ["Polygon", "Star", "Arrow", "Spiral"]);
		if (_local4541 == "shape") _local4542 = new ContourSizeButton("Shape");
		if (_local4541 == "crad") {
			_local4542 = new RangeDropInput("Corner Radius", 0, 50, "px");
			_local4542.c(0);
		}
		if (_local4541 == "cstr") {
			_local4542 = new ConstraintOptions();
		}
		if (_local4541 == "irad") {
			_local4542 = new RangeDropInput("Inner Radius", 0, 100, "%");
			_local4542.c(40);
		}
		if (_local4541 == "length") {
			_local4542 = new RangeDropInput("Length", 4, 40);
			_local4542.c(4);
		}
		if (_local4541 == "sides") {
			_local4542 = new RangeDropInput("Sides", 3, 30);
			_local4542.c(5);
		}
		if (_local4541 == "width") {
			_local4542 = new RangeDropInput("Width", 1, 100, "px");
			_local4542.c(5);
		}
		if (_local4541 == "tolr") {
			_local4542 = new RangeDropInput("Tolerance", 0, 100);
			_local4542.c(5);
		}
		if (_local4541 == "fstyle") {
			_local4542 = new FillPickerButton("Fill");
		}
		if (_local4541 == "sstyle") {
			_local4542 = new StyleCurveButton();
		}
		if (_local4541 == "psnap") {
			_local4542 = new CheckboxControl("Snap to Pixels");
		}
		if (_local4541 == "crnr") {
			_local4542 = new ToolbarButton("\u2312", !1, "Corner Radius", !0);
		}
		if (_local4541 == "aopts") {
			_local4542 = new ArrowOptionsButton();
			_local4542.c([!1, !1, 50, 60, 0]);
		}
		_local4542.parent = this;
		this.body.appendChild(_local4542.e);
		this.nJ[_local4541] = _local4542;
		_local4542.addListener(_local4541 == "crnr" ? "click" : ActionTypes.E.A, _local4543, null);
	}
}
ShapeVectorToolOptions.prototype = new ToolOptionsBase();
ShapeVectorToolOptions.prototype.IF = function (l) {
	if (l.Si != null) this.nJ.binop.c(l.Si);else
	if (l.y3 == "vals") {
		for (var _local4546 in l.ajy) {
			this.nJ[_local4546].c(l.ajy[_local4546]);
		}
	} else {
		var _local4544 = ShapeVectorToolOptions.mI;
		// if (_local4544 == null) _local4544 = ShapeVectorToolOptions.mI = new ContextPanel([{
		// 	name: "Remove Anchor Point",
		// 	p: function (V) {
		// 		var _local4547 = V ? V.LW() : null;
		// 		return {
		// 			p: V && _local4547[1].length != 0 && _local4547[0][_local4547[1][0]].add.vmsk.OE.length != 0
		// 		};
		// 	}
		// }, {
		// 	name: "Remove Path",
		// 	p: function (V) {
		// 		var _local4548 = V ? V.LW() : null;
		// 		return {
		// 			p: V && _local4548[1].length != 0 && _local4548[0][_local4548[1][0]].add.vmsk.g.length != 0
		// 		};
		// 	},
		// 	xX: !0
		// }, {
		// 	name: "Make Selection"
		// }, {
		// 	name: [2, 3]
		// }, {
		// 	name: [14, 9]
		// }], [{
		// 	Y: ActionTypes.E.v,
		// 	G: f.Kp,
		// 	W: {
		// 		a: "remove",
		// 		S6: !0
		// 	}
		// }, {
		// 	Y: ActionTypes.E.v,
		// 	G: f.o2,
		// 	W: {
		// 		a: "remove"
		// 	}
		// }, {
		// 	Y: ActionTypes.E.L,
		// 	W: {
		// 		a: ActionTypes.$.SN,
		// 		GU: "makesel"
		// 	}
		// }, {
		// 	Y: ActionTypes.E.g5,
		// 	W: f.nr.xs(0)
		// }, {
		// 	Y: ActionTypes.E.g5,
		// 	W: f.nr.xs(1)
		// }]);
		// _local4544.parent = this;
		// _local4544.update(l.T1, l.wQ);
		var _local4545 = new Action(ActionTypes.E.L, !0);
		_local4545.data = {
			a: ActionTypes.$.dY,
			A3: _local4544,
			x: l.Zm.pf + 2,
			y: l.Zm.pi + 1
		};
		this.dispatch(_local4545);
	}
};
ShapeVectorToolOptions.prototype.aom = function (A) {
	return null;
};
ShapeVectorToolOptions.prototype.lx = function () {
	for (var _local4549 in this.nJ) {
		this.nJ[_local4549].refresh();
	}
};
ShapeVectorToolOptions.prototype.S9 = function (l) {
	var _local4553 = new Action(ActionTypes.E.L, !0),
		_local4551 = this.nJ;
	if (l.target == _local4551.crnr) {
		_local4553 = new Action(ActionTypes.E.v, !0);
		_local4553.G = f.Kp;
		_local4553.data = {
			a: "crnr"
		};
	} else if (l.target == _local4551.make) {
		var _local4550 = l.target.b();
		console.log(_local4550);
		if (_local4550 == 0) _local4553.data = {
			a: ActionTypes.$.SN,
			GU: "makesel"
		};else
		{
			_local4553 = new Action(ActionTypes.E.v, !0);
			_local4553.G = f.LI;
			_local4553.data = {
				a: "newfill",
				Ts: 0
			};
		}
	} else if (l.target == _local4551.fstyle) {
		_local4553.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.pc,
			Z: _local4551.fstyle.b()
		};
	} else if (l.target == _local4551.sstyle) {
		_local4553.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.$o,
			Z: _local4551.sstyle.b()
		};
	} else if (l.target == _local4551.tmode) {
		_local4553.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.W_,
			Z: _local4551.tmode.b()
		};
	} else {
		if (_local4551.pshape) this.U0();
		_local4553.data = {
			a: ActionTypes.$.kl,
			G: this.G
		};
		for (var _local4552 in _local4551) _local4553.data[_local4552] = _local4551[_local4552].b();
	}
	this.dispatch(_local4553);
};
ShapeVectorToolOptions.prototype.U0 = function () {
	var _local4560 = this.nJ,
		_local4559 = _local4560.tmode.b(),
		_local4555 = _local4560.pshape ? this.aom(_local4560.pshape.b()) : this.gH,
		_local4558;
	if (_local4559 == 0) _local4558 = ["anta", "make"];
	if (_local4559 == 1) _local4558 = ["anta", "fstyle", "sstyle"];
	if (_local4559 == 2) _local4558 = ["make", "binop", "fstyle", "sstyle"];
	var _local4557 = _local4560.binop;
	if (_local4557) {
		var _local4556 = _local4557.b();
		if (_local4559 == 0) {
			_local4557.aAz(0);
		} else {
			_local4557.a27(0);
			if (_local4556 == 0) {
				_local4557.c(1);
				this.S9({
					target: _local4557
				});
			}
		}
	}
	s.clearChildren(this.body);
	for (var _local4554 = 0; _local4554 < _local4555.length; _local4554++) {
		var _local4561 = _local4555[_local4554];
		if (_local4558.indexOf(_local4561) != -1) continue;
		this.body.appendChild(_local4560[_local4561].e);
	}
};
ShapeVectorToolOptions.prototype.BM = function (l, d) {
	ToolOptionsBase.prototype.BM.call(this, l, d);
	var _local4562 = this.nJ.fstyle,
		_local4565 = this.nJ.sstyle,
		_local4564 = this.nJ.tmode;
	if (_local4562) _local4562.BM(l, d);
	if (_local4565) _local4565.BM(l, d);
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.XX)
	if (l.t6.length != 0 && this.nJ.shape) {
		this.nJ.shape.Z2(l.t6);
	}
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.pc)
	if (_local4562) _local4562.c(null, l.Xf, l.avK);
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.$o)
	if (_local4565) _local4565.c(null, l.PB, l.air);
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.W_) {
		var _local4563 = l.dV;
		if (this.au1 && _local4563 == 2) _local4563 = 0;
		if (_local4564) {
			_local4564.c(_local4563);
			this.U0();
		}
	}
};

function ImageSet(l, d) {
	UIComponent.call(this);
	this.k3 = [];
	this.g = [];
	this.aq4 = l;
	this.Ck = d;
	this.c5 = 0;
	this.kv = null;
	this.oS = new Point2D(0, 0);
	// if (d != null) {
	// 	this.ZU = new ContextPanel([{
	// 		name: [6, 37]
	// 	}, {
	// 		name: [5, 4]
	// 	}]);
	// 	this.ZU.parent = this;
	// 	this.ZU.addListener("select", this.oB, this);
	// }
	this.e = s.createElement("div", "imageset scrollable");
	this.e.addEventListener("contextmenu", s.preventDefaultHandler, !1);
}
ImageSet.prototype = new UIComponent();
ImageSet.prototype.refresh = function () {
	if (this.ZU) this.ZU.refresh();
};
ImageSet.prototype.oB = function (l) {
	var _local139 = this.ZU.sz()[0],
		_local142 = new Action(ActionTypes.E.L, !0),
		_local140 = {
			a: ActionTypes.$.kI,
			Oo: this.Ck,
			F0: this.g.slice(0)
		};
	if (_local139 == 0) {
		var _local141 = this.kv[1][this.g[0]];
		_local140.pb = "rnm";
		_local142.data = {
			a: ActionTypes.$.SN,
			GU: "namewindow",
			mS: _local141,
			P7: {
				Y: ActionTypes.E.L,
				W: _local140
			}
		};
	} else {
		_local142.data = _local140;
		_local140.pb = "del";
	}
	this.dispatch(_local142);
};
ImageSet.prototype.aa4 = function () {
	return this.c5;
};
ImageSet.prototype.dk = function (l) {
	this.c5 = l;
	if (this.kv) this.VP();
};
ImageSet.prototype.LR = function (l, d, G, b) {
	this.kv = [l, d, G, b];
	this.VP();
};
ImageSet.prototype.VP = function () {
	var _local152 = this.kv,
		_local150 = _local152[0],
		_local144 = _local152[1],
		_local149 = _local152[2],
		_local148 = _local152[3];
	this.k3 = [];
	this.e.innerHTML = "";
	var _local147 = this.ec.bind(this),
		_local153 = this.c5;
	if (_local153 == 0) s.addClass(this.e, "imageset");else
	s.removeClass(this.e, "imageset");
	for (var _local143 = 0; _local143 < _local150.length; _local143++) {
		var _local145 = _local150[_local143],
			_local154 = null;
		if (_local145 == null) {
			this.k3.push(null);
			continue;
		}
		if (typeof _local145 == "string") {
			_local154 = s.createElement("img", "image");
			_local154.setAttribute("src", _local145);
		} else _local154 = _local145;
		if (_local149) s.setElementSizePx(_local154, _local149, _local148);
		if (this.aq4) s.addClass(_local154, "gsicon");
		if (_local153 == 0) {} else {
			var _local151 = s.createElement("div", "listitem");
			_local151.appendChild(_local154);
			var _local146 = s.createElement("span");
			_local146.textContent = _local144 ? _local144[_local143] : "Item " + (_local143 + 1);
			_local146.setAttribute("style", "margin-left:4px;");
			_local151.appendChild(_local146);
			_local154 = _local151;
		}
		if (_local144) _local154.setAttribute("title", _local144[_local143]);
		_local154.addEventListener("mousedown", _local147, !1);
		this.k3.push(_local154);
		this.e.appendChild(_local154);
	}
};
ImageSet.prototype.ec = function (l) {
	if (this.Ck == null) l.preventDefault();
	var _local162 = this.k3.indexOf(l.currentTarget),
		_local156 = window.__kb,
		_local161 = this.g,
		_local160 = _local161.length;
	if (_local156.l(KeyboardHandler.Zz)) {
		var _local159 = Math.min(_local161[0], _local161[_local161.length - 1], _local162),
			_local164 = Math.max(_local161[0], _local161[_local161.length - 1], _local162);
		_local161 = [];
		for (var _local155 = _local159; _local155 <= _local164; _local155++) _local161.push(_local155);
	} else if (_local156.l(KeyboardHandler.wz)) {
		var _local157 = _local161.indexOf(_local162);
		if (_local157 == -1) _local161.push(_local162);else
		_local161.splice(_local157, 1);
	} else _local161 = [_local162];
	_local161.sort(function (R, J) {
		return R - J;
	});
	if (l.button == 0 || _local160 == 1) this.c(_local161);
	this.oS = s.getEventPositionInElement(l, l.currentTarget);
	if (l.button == 0) this.dispatch(new Action(ActionTypes.E.A));
	if (l.button == 2 && this.ZU) {
		var _local165 = this.ZU;
		_local165.update(null);
		var _local163 = s.getEventPositionInElement(l, document.body),
			_local158 = new Action(ActionTypes.E.L, !0);
		_local158.data = {
			a: ActionTypes.$.dY,
			A3: _local165,
			x: _local163.x,
			y: _local163.y + 2
		};
		this.dispatch(_local158);
	}
};
ImageSet.prototype.b = function () {
	return this.g.slice(0);
};
ImageSet.prototype.az3 = function () {
	var _local166 = this.oS;
	return new Point2D(_local166.x, _local166.y);
};
ImageSet.prototype.c = function (l) {
	this.g = l.slice(0);
	for (var _local167 = 0; _local167 < this.k3.length; _local167++) {
		var _local168 = this.k3[_local167];
		if (_local168 == null) continue;
		if (l.indexOf(_local167) != -1) s.addClass(_local168, "selected");else
		s.removeClass(_local168, "selected");
	}
};


function FloatPickerControl(l, d, G, b, V, Q, t) {
	UIComponent.call(this);
	this.e = s.createElement("span", "fitem " + G);
	this.hg = new UIComponent();
	this.hg.e = s.createElement("div", "floatcont");
	this.hg.e.setAttribute("style", "width: " + (b + 1.5) + "em;");
	this.hg.parent = this;
	this.a9b = s.createElement("div");
	this.hg.e.appendChild(this.a9b);
	this.Sc = s.createElement("div");
	this.hg.e.appendChild(this.Sc);
	if (l) {
		this.$w = l;
		this.oG = s.createElement("label", "flabel");
		this.e.appendChild(this.oG);
	}
	this.a = s.createElement("button", t ? "nopadding" : "");
	this.a.setAttribute("style", "position:relative;");
	var _local170 = this.Ll.bind(this),
		_local179 = this.gi.bind(this);
	s.addPointerDown(this.a, d ? _local179 : _local170);
	this.e.appendChild(this.a);
	this.Xk = s.createElement("img", t ? "gsicon" : "");
	this.a.appendChild(this.Xk);
	if (d) {
		var _local175 = s.createElement("button");
		_local175.textContent = "\u25BC";
		s.addPointerDown(_local175, _local170);
		this.e.appendChild(_local175);
	} else {
		var _local172 = s.createElement("span");
		_local172.textContent = "\u25BC";
		_local172.setAttribute("style", "position:absolute;  bottom:2px;  right:4px;");
		this.a.appendChild(_local172);
	}
	var _local173 = s.createElement("span");
	this.Sc.appendChild(_local173);
	_local173.setAttribute("style", "display:inline-block;  vertical-align:top; width:" + b + "em;");
	this.FO = new ImageSet(t, Q);
	_local173.appendChild(this.FO.e);
	this.FO.parent = this.hg;
	this.FO.addListener(ActionTypes.E.A, this.eI, this);
	this.FO.e.style.height = V + "em";
	this.t$ = s.createElement("button");
	this.t$.textContent = "\u25BC";
	this.t$.setAttribute("style", "padding:3px");
	s.addPointerDown(this.t$, this.Z$.bind(this));
	this.Sc.appendChild(this.t$);
	var _local171 = this.pP(),
		_local177 = this.a4x = Q != PsdResourceTypes.G9 && Q != PsdResourceTypes.XX ? Q : null,
		_local178 = this.a4Q = Q == null ? !1 : PsdResourceTypes.Gz[Q][4] != 0,
		_local174 = Q == null ? "" : PsdResourceTypes.Gz[Q][0].toUpperCase(),
		_local176 = [];
	if (_local177) _local176.push({
		name: [12, 87]
	});
	_local176.push({
		name: ["VAR0 / VAR1", [25, 3, 0],
		[25, 3, 1]],

		xX: !0
	});
	_local176.push({
		name: [
		[23, 6], "." + (_local174 == "ICC" ? "icc .cube .look .3dl" : _local174)]

	}, {
		name: ["VAR0 ." + _local174, [1, 8]]
	}, {
		name: [6, 37]
	}, {
		name: [5, 4],
		xX: _local171.length != 0
	});
	for (var _local169 = 0; _local169 < _local171.length; _local169++) _local176.push({
		name: _local171[_local169].split("/").pop()
	});
	this.afN = _local176;
	this.Ck = Q;
	this.Ce = null;
	this.LH = !0;
	this.lt = null;
}
FloatPickerControl.prototype = new UIComponent();
FloatPickerControl.prototype.pP = function () {
	return [];
};
FloatPickerControl.prototype.gi = function () {};
FloatPickerControl.prototype.refresh = function () {
	this.FO.refresh();
	var _local180 = this.$w;
	if (_local180) this.oG.textContent = languageManager.get(_local180) + ":";
};
FloatPickerControl.prototype.setLabel = function (l) {
	this.oG.textContent = l;
};
FloatPickerControl.prototype.Z2 = function (l) {
	var _local182 = this.Ck,
		_local181 = 0;
	if (_local182 == PsdResourceTypes.Qo) {
		_local181 = this.Ce ? this.Ce.length : 0;
		l = l.slice(0);
	}
	this.Ce = l;
	this.LH = !0;
	if (s.isInDocument(this.FO.e) || _local182 == PsdResourceTypes.Sv) this.BI();
	if (_local182 == PsdResourceTypes.Qo && l.length - _local181 == 1 && s.isInDocument(this.e)) {
		this.c(l[_local181]);
		this.LH = !0;
		this.BI();
		this.FO.c([_local181]);
		this.dispatch(new Action(ActionTypes.E.A));
	}
};
FloatPickerControl.prototype.oB = function (l) {
	var _local186 = l.target.sz()[0];
	if (this.a4x == null) _local186++;
	var _local183 = new Action(ActionTypes.E.L, !0);
	if (_local186 == 0) {
		var _local185 = this.PH();
		if (this.Ck == PsdResourceTypes.Qo && _local185[0].profile == null) return;
		_local183.data = {
			a: ActionTypes.$.kI,
			pb: "add",
			Oo: this.a4x,
			G2: _local185
		};
	} else if (_local186 == 1) this.FO.dk(1 - this.FO.aa4());else
	if (_local186 <= 5) this.TA(_local186 - 2);else
	{
		var _local184 = this.pP();
		_local183.data = {
			a: ActionTypes.$.ub,
			Oo: {
				url: "rsrc/" + _local184[_local186 - 6]
			}
		};
	}
	if (_local183.data) this.dispatch(_local183);
};
FloatPickerControl.prototype.TA = function (l) {
	var _local190 = new Action(ActionTypes.E.L, !0),
		_local187 = this.FO.b(),
		_local189 = {
			a: ActionTypes.$.kI,
			Oo: this.Ck,
			F0: _local187
		};
	if (l > 1 && _local187.length == 0) {
		alert("No items selected");
		return;
	}
	if (l == 0) _local190.data = {
		a: ActionTypes.$.Um
	};else
	if (l == 1) _local190.data = {
		a: ActionTypes.$.Bs,
		abe: this.Ck,
		F0: _local187.length == 0 ? null : _local187
	};else
	if (l == 2) {
		var _local188 = this.FO.kv[1][_local187[0]];
		_local189.pb = "rnm";
		_local190.data = {
			a: ActionTypes.$.SN,
			GU: "namewindow",
			mS: _local188,
			P7: {
				Y: ActionTypes.E.L,
				W: _local189
			}
		};
	} else if (l == 3) {
		_local190.data = _local189;
		_local189.pb = "del";
	}
	this.dispatch(_local190);
};
FloatPickerControl.prototype.PH = function () {
	return [this.b()];
};
FloatPickerControl.prototype.Z$ = function (l) {
	// if (this.ZU == null) {
	// 	this.ZU = new ContextPanel(this.afN);
	// 	this.ZU.parent = this.hg;
	// 	this.ZU.addListener("select", this.oB, this);
	// }
	// if (s.isInDocument(this.ZU.e)) return;
	// l.stopPropagation();
	// var _local193 = this.ZU;
	// _local193.refresh();
	// _local193.update(null);
	// var _local191 = l.currentTarget.getBoundingClientRect(),
	// 	_local192 = new Action(ActionTypes.E.L, !0);
	// _local192.data = {
	// 	a: ActionTypes.$.dY,
	// 	A3: _local193,
	// 	x: _local191.left,
	// 	y: _local191.top + _local191.height
	// };
	// this.dispatch(_local192);
};
FloatPickerControl.prototype.Ll = function (l, d, G) {
	if (s.isInDocument(this.hg.e)) return;
	if (l) l.stopPropagation();
	this.BI();
	if (d == null) {
		var _local195 = this.a.getBoundingClientRect(),
			d = _local195.left,
			G = _local195.top + _local195.height;
	}
	var _local194 = new Action(ActionTypes.E.L, !0);
	_local194.data = {
		a: ActionTypes.$.dY,
		A3: this.hg,
		x: d,
		y: G,
		XC: !0
	};
	this.dispatch(_local194);
};
FloatPickerControl.prototype.axE = function (l, d) {
	this.Ll(null, l, d);
};


function GradientPickerButton(l, d, G) {
	FloatPickerControl.call(this, d, !0, "gradientbutton", 18, 10, PsdResourceTypes.Rz);
	this.Y7 = -1;
	this.GF = -1;
	this.ajo = null;
	this.a6f = l;
	this.pq = G;
}
GradientPickerButton.prototype = new FloatPickerControl();
GradientPickerButton.prototype.eI = function (l) {
	var _local714 = this.Ce;
	this.c(_local714[this.FO.b()]);
	this.dispatch(new Action(ActionTypes.E.A));
};
GradientPickerButton.prototype.gi = function (l) {
	var _local715 = new Action(ActionTypes.E.L, !0);
	_local715.data = {
		a: ActionTypes.$.SN,
		GU: "gradienteditor",
		K: this.lt,
		qF: this.a2H.bind(this),
		bH: this.pq
	};
	this.dispatch(_local715);
};
GradientPickerButton.prototype.a2H = function (l) {
	this.c(l);
	this.dispatch(new Action(ActionTypes.E.A));
};
GradientPickerButton.prototype.BI = function () {
	if (!this.LH) return;
	var _local723 = Math.floor(38 * s.getDevicePixelRatio()),
		_local722 = Math.floor(38 * s.getDevicePixelRatio()),
		_local717 = [],
		_local721 = [],
		_local720 = this.Ce,
		_local719 = Date.now();
	for (var _local716 = 0; _local716 < _local720.length; _local716++) {
		var _local724 = _local720[_local716];
		_local721.push(_local724.Nm ? _local724.Nm.v.split("=").pop() : "");
		var _local718 = f.RK.Gx(_local724, _local723, _local722, Math.PI / 4, this.Y7, this.GF);
		_local717.push(_local718);
	}
	this.FO.LR(_local717, _local721, _local723, _local722);
	this.LH = !1;
};
GradientPickerButton.prototype.B$ = function (l, d) {
	this.aof(this.lt, l, d);
};
GradientPickerButton.prototype.c = function (l) {
	this.aof(l, this.Y7, this.GF);
};
GradientPickerButton.prototype.aof = function (l, d, G) {
	this.Y7 = d;
	this.GF = G;
	if (l == null) return;
	var _local728 = JSON.stringify(l),
		_local727 = _local728 + d + "," + G;
	if (_local727 == this.ajo) return;
	this.ajo = _local727;
	this.lt = JSON.parse(_local728);
	var _local726 = Math.floor(80 * s.getDevicePixelRatio()),
		_local729 = Math.floor(16 * s.getDevicePixelRatio()),
		_local725 = f.RK.Gx(this.lt, _local726, _local729, 0, this.Y7, this.GF);
	this.Xk.setAttribute("src", _local725);
	s.setElementSizePx(this.Xk, _local726, _local729);
};
GradientPickerButton.prototype.b = function () {
	var _local730;
	if (this.a6f) _local730 = f.RK.a9s(this.lt, this.Y7, this.GF);else
	_local730 = JSON.parse(JSON.stringify(this.lt));
	return _local730;
};


function SwatchPickerButton(l) {
	FloatPickerControl.call(this, l, !1, "swatchbutton", 16, 8.75, PsdResourceTypes.Sv);
}
SwatchPickerButton.prototype = new FloatPickerControl();
SwatchPickerButton.prototype.eI = function (l) {
	this.c(this.Ce[l.target.b()]);
	this.dispatch(new Action(ActionTypes.E.A));
};
SwatchPickerButton.prototype.BI = function () {
	if (!this.LH) return;
	var _local737 = Date.now(),
		_local736 = Math.floor(10 * s.getDevicePixelRatio()),
		_local732 = Math.floor(10 * s.getDevicePixelRatio()),
		_local735 = [],
		_local734 = [],
		_local733 = this.Ce;
	for (var _local731 = 0; _local731 < _local733.length; _local731++) {
		_local734.push(_local733[_local731].X$ ? _local733[_local731].X$.split("=").pop() : "");
		_local735.push(SwatchPickerButton.Gx(_local733[_local731], _local736, _local732));
	}
	this.FO.LR(_local735, _local734, _local736, _local732);
	this.LH = !1;
};
SwatchPickerButton.prototype.c = function (l) {
	this.lt = JSON.parse(JSON.stringify(l));
	this.Vv();
};
SwatchPickerButton.prototype.Vv = function () {
	var _local740 = Math.floor(24 * s.getDevicePixelRatio()),
		_local739 = Math.floor(20 * s.getDevicePixelRatio()),
		_local738 = SwatchPickerButton.Gx(this.lt, _local740, _local739);
	this.Xk.setAttribute("src", _local738);
	s.setElementSizePx(this.Xk, _local740, _local739);
};
SwatchPickerButton.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.lt));
};
SwatchPickerButton.c9 = {};
SwatchPickerButton.Gx = function (l, d, G) {
	var _local744 = SwatchPickerButton.k_,
		_local743 = SwatchPickerButton.c9,
		_local742 = PixelUtil.intToHex6(l.o << 16 | l.J << 8 | l.k);
	if (_local743[_local742]) return _local743[_local742];
	if (_local744 == null) {
		var _local745 = s.createElement("canvas");
		_local744 = SwatchPickerButton.k_ = _local745.getContext("2d", { willReadFrequently: true });
	}
	var _local745 = _local744.canvas;
	_local745.width = d;
	_local745.height = G;
	_local744.fillStyle = "#" + _local742;
	_local744.fillRect(0, 0, d, G);
	var _local741 = _local743[_local742] = _local745.toDataURL();
	return _local741;
};


function ColorChannelRow() {
	UIComponent.call(this);
	this.e = s.createElement("div");
	this.Et = !1;
	this.$c = [new DropdownMenu([12, 19, 1], [
	[13, 1, 7]].
	concat(LayerEffectsHelper.rgbChannels)), new SliderRow([17, 1]), new SliderRow([12, 46])];
	for (var _local196 = 0; _local196 < 3; _local196++) {
		var _local197 = this.$c[_local196];
		this.e.appendChild(_local197.e);
		_local197.addListener(ActionTypes.E.A, this.Q3, this);
	}
	this.refresh();
}
ColorChannelRow.prototype = new UIComponent();
ColorChannelRow.prototype.refresh = function () {
	for (var _local198 = 0; _local198 < 3; _local198++) this.$c[_local198].refresh();
};
ColorChannelRow.prototype.b = function () {
	return this.Et.slice(0);
};
ColorChannelRow.prototype.c = function (l) {
	this.Et = l.slice(0);
	var _local200 = this.$c,
		_local199 = _local200[0].b();
	_local200[1].c(l.slice(_local199 * 8, _local199 * 8 + 4), _local199);
	_local200[2].c(l.slice(_local199 * 8 + 4, _local199 * 8 + 8), _local199);
};
ColorChannelRow.prototype.Q3 = function (l) {
	var _local205 = this.$c,
		_local202 = _local205.indexOf(l.currentTarget);
	if (_local202 == 0) this.c(this.Et);else
	{
		var _local204 = _local205[0].b() * 8 + (_local202 == 1 ? 0 : 4),
			_local203 = _local205[_local202].b();
		for (var _local201 = 0; _local201 < 4; _local201++) this.Et[_local204 + _local201] = _local203[_local201];
		this.dispatch(new Action(ActionTypes.E.A, !1));
	}
};

function SliderRow(l) {
	UIComponent.call(this);
	this.e = s.createElement("div");
	this.T = s.createElement("canvas");
	this.ur = l;
	this.Et = [0, 20, 200, 255];
	this.Rl = 0;
	this.UY = -1;
	this.an1 = [];
	for (var _local206 = 0; _local206 < 5; _local206++) {
		var _local207 = s.createElement("span");
		_local207.setAttribute("style", "display:inline-block;width:" + (_local206 == 0 ? 8 : _local206 == 2 ? 7 : 2) + "em");
		this.an1.push(_local207);
		this.e.appendChild(_local207);
	}
	this.TC = this.JO.bind(this);
	this.w7 = this.D2.bind(this);
	this.ha = this.qd.bind(this);
	s.preventTouchAndGesture(this.T);
	s.addPointerDown(this.T, this.TC);
	this.e.appendChild(this.T);
	this.VP();
}
SliderRow.prototype = new UIComponent();
SliderRow.prototype.refresh = function () {
	this.VP();
};
SliderRow.prototype.c = function (l, d) {
	this.Et = l;
	this.Rl = d;
	this.VP();
};
SliderRow.prototype.b = function () {
	return this.Et.slice(0);
};
SliderRow.prototype.JO = function (l) {
	var _local214 = this.Et,
		_local209 = s.getEventPositionInElement(l, this.T),
		_local213 = _local209.x - 8,
		_local212 = -1,
		_local211 = 1e9;
	for (var _local208 = 0; _local208 < 4; _local208++) {
		var _local215 = _local213 - _local214[_local208],
			_local210 = Math.abs(_local215);
		if (_local210 < 8 && _local210 < _local211 && ((_local208 & 1) == 0 && _local215 < 0 || (_local208 & 1) == 1 && _local215 > 0)) {
			_local211 = _local215;
			_local212 = _local208;
		}
	}
	if (_local212 == -1) return;
	this.UY = _local212;
	this.ZG = window.__kb.l(KeyboardHandler.Jm) || _local214[(_local212 >>> 1) * 2] != _local214[(_local212 >>> 1) * 2 + 1];
	s.addPointerMove(window, this.w7);
	s.addPointerUp(window, this.ha);
};
SliderRow.prototype.D2 = function (l) {
	var _local220 = this.Et,
		_local216 = this.UY,
		_local219 = (_local216 >>> 1) * 2,
		_local218 = _local219 + 1,
		_local217 = s.getEventPositionInElement(l, this.T),
		_local221 = Math.round(Math.max(0, Math.min(255, _local217.x - 8)));
	_local220[_local216] = _local221;
	if (this.ZG && _local220[_local219] >= _local220[_local218]) this.ZG = !1;
	if (!this.ZG) _local220[_local219] = _local220[_local218] = _local221;
	this.VP();
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
SliderRow.prototype.qd = function (l) {
	s.removePointerMove(window, this.w7);
	s.removePointerUp(window, this.ha);
};
SliderRow.prototype.VP = function () {
	var _local231 = this.T;
	s.setCanvasSizeForDpr(_local231, 255 + 16, 16);
	var _local229 = _local231.getContext("2d", { willReadFrequently: true }),
		_local223 = _local231.width,
		_local228 = _local231.height,
		_local227 = Math.round(255 * s.getDevicePixelRatio()),
		_local226 = Math.round(8 * s.getDevicePixelRatio());
	_local229.translate(_local226, 0);
	var _local232 = _local229.createLinearGradient(0, 0, _local227, 0);
	_local232.addColorStop(0, "black");
	_local232.addColorStop(1, "#" + ["ffffff", "ff0000", "00ff00", "0000ff"][this.Rl]);
	_local229.fillStyle = _local232;
	_local229.fillRect(0, 0, _local227, _local226);
	var _local224 = this.an1,
		_local233 = languageManager.get(this.ur) + ":";
	_local224[0].textContent = _local233;
	for (var _local222 = 0; _local222 < 4; _local222++) {
		var _local230 = this.Et[_local222];
		_local224[1 + _local222].textContent = _local230;
		var _local225 = Math.round(_local230 * s.getDevicePixelRatio());
		_local229.beginPath();
		_local229.moveTo(_local225, _local226);
		_local229.lineTo(_local225, _local226 + _local226);
		_local229.lineTo(_local225 + ((_local222 & 1) == 0 ? -1 : 1) * _local226, _local226 + _local226);
		_local229.closePath();
		_local229.fillStyle = _local222 < 2 ? "#666666" : "#cccccc";
		_local229.fill();
		_local229.strokeStyle = "black";
		_local229.stroke();
	}
};

function AngleInput(l, d, G) {
	UIComponent.call(this);
	if (G == null) G = !1;
	this.Z = [0, 0, 1];
	this.ayO = d;
	this.aay = G;
	this.ag3 = 0;
	var _local238 = "ai" + s.getNextId();
	this.e = s.createElement("span", "fitem angleinput");
	if (l) {
		this.oG = s.createElement("label", "flabel");
		this.$w = l;
		this.e.appendChild(this.oG);
		this.oG.setAttribute("for", _local238);
	}
	this.kr = G ? 44 : 20;
	this.T = s.createElement("canvas", "gsicon");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	s.preventTouchAndGesture(this.T);
	s.setCanvasSizeForDpr(this.T, this.kr * 2 + 1, this.kr * 2 + 1);
	this.k_.scale(s.getDevicePixelRatio(), s.getDevicePixelRatio());
	this.e.appendChild(this.T);
	s.addPointerDown(this.T, this.Z1.bind(this));
	this.YV = this.Tk.bind(this);
	this.l_ = this.FS.bind(this);
	var _local237 = this.oi.bind(this),
		_local236 = s.createElement("div");
	_local236.setAttribute("style", "display:inline-block;  vertical-align:middle;");
	if (!G) this.e.appendChild(_local236);
	this.nJ = [];
	for (var _local234 = 0; _local234 < 2; _local234++) {
		var _local239 = s.createElement("input");
		this.nJ.push(_local239);
		_local239.setAttribute("type", "text");
		s.addKeydownBlocker(_local239);
		if (_local234 == 0) _local239.setAttribute("id", _local238);
		_local239.addEventListener("change", _local237, !1);
		var _local235 = s.createElement("span");
		_local235.textContent = "\xB0";
		if (_local234 == 0 || d) {
			_local236.appendChild(_local239);
			_local236.appendChild(_local235);
			s.appendBr(_local236);
		}
	}
	this.c(this.Z);
}
AngleInput.prototype = new UIComponent();
AngleInput.prototype.refresh = function () {
	if (this.$w) this.oG.textContent = languageManager.get(this.$w) + ":";
};
AngleInput.prototype.setLabel = function (l) {
	this.oG.textContent = l;
};
AngleInput.prototype.b = function () {
	return this.Z.slice(0);
};
AngleInput.prototype.c = function (l, d) {
	var _local240 = this.Z;
	l = l.slice(0);
	if (l[0] == null) l[0] = _local240[0];
	if (l[1] == null) l[1] = _local240[1];
	if (l[2] == null) l[2] = _local240[2];
	this.Z = l;
	var _local246 = l[0],
		_local245 = l[1],
		_local243 = l[2],
		_local248 = this.ayO,
		_local241 = this.aay,
		_local249 = this.kr * .85;
	if (!_local248) _local245 = 0;
	this.nJ[0].value = _local246;
	this.nJ[1].value = _local245;
	var _local247 = this.k_;
	_local247.clearRect(0, 0, 100, 100);
	_local246 = Math.PI * _local246 / 180;
	_local245 = _local249 * (90 - _local245) / 90;
	var _local242 = this.kr + .5;
	_local247.save();
	_local247.translate(_local242, _local242);
	_local247.rotate(-_local246);
	_local247.strokeStyle = "rgba(0,0,0,0.5)";
	_local247.beginPath();
	_local247.ellipse(0, 0, _local249, _local249 * _local243, 0, 0, 2 * Math.PI);
	if (_local241) {
		_local247.moveTo(0, -_local249 * _local243);
		_local247.lineTo(0, _local249 * _local243);
		_local247.moveTo(-_local245, 0);
	} else _local247.moveTo(0, 0);
	_local247.lineTo(_local245, 0);
	_local247.stroke();
	var _local244 = this.kr * .15;
	_local247.fillStyle = "black";
	_local247.beginPath();
	if (_local241) {
		_local247.arc(0, -_local249 * _local243, _local244 * .66, 0, 2 * Math.PI);
		_local247.arc(0, _local249 * _local243, _local244 * .66, 0, 2 * Math.PI);
	}
	if (_local248) {
		_local247.arc(_local245, 0, _local244 * .4, 0, 2 * Math.PI);
	} else {
		_local247.moveTo(_local242 - _local244, -_local244 * .66);
		_local247.lineTo(_local242, 0);
		_local247.lineTo(_local242 - _local244, _local244 * .66);
	}
	_local247.fill();
	_local247.restore();
	if (d) this.oi();
};
AngleInput.prototype.oi = function (l) {
	var _local251 = parseInt(this.nJ[0].value);
	if (isNaN(_local251)) _local251 = 0;
	var _local250 = parseInt(this.nJ[1].value);
	if (isNaN(_local250)) _local250 = 0;
	_local251 = _local251 % 360;
	_local250 = _local250 % 360;
	this.c([_local251, _local250]);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
AngleInput.prototype.Z1 = function (l) {
	s.addPointerMove(window, this.YV);
	s.addPointerUp(window, this.l_);
	var _local261 = s.getEventPositionInElement(l, this.T),
		_local256 = 0,
		_local258 = 1e9;
	_local261.x -= this.kr;
	_local261.y -= this.kr;
	var _local253 = this.Z,
		_local260 = _local253[0] * Math.PI / 180,
		_local259 = (90 - _local253[1]) / 90,
		_local257 = _local253[2],
		_local263 = this.kr * .85,
		_local254 = Math.sin(-_local260),
		_local264 = Math.cos(-_local260),
		_local262 = [new Point2D(_local264 * _local263, _local254 * _local263)];
	if (this.aay) _local262.push(new Point2D(-_local254 * _local263 * _local257, _local264 * _local263 * _local257), new Point2D(_local254 * _local263 * _local257, -_local264 * _local263 * _local257));
	for (var _local252 = 0; _local252 < _local262.length; _local252++) {
		var _local255 = Point2D.yZ(_local261, _local262[_local252]);
		if (_local255 < _local258) {
			_local258 = _local255;
			_local256 = _local252;
		}
	}
	this.ag3 = _local256;
	if (_local256 == 0) this.Tk(l);
};
AngleInput.prototype.Tk = function (l) {
	var _local270 = s.getEventPositionInElement(l, this.T),
		_local265 = this.ag3,
		_local269 = [],
		_local268 = _local270.x - this.kr,
		_local267 = _local270.y - this.kr,
		_local271 = this.kr * .85;
	if (_local265 == 0) {
		var _local266 = 180 * Math.atan2(-_local267, _local268) / Math.PI,
			_local272 = 90 - 90 * Math.min(1, Math.sqrt(_local268 * _local268 + _local267 * _local267) / _local271);
		if (l.shiftKey) _local266 = Math.round(_local266 / 15) * 15;
		_local269 = [Math.round(_local266), Math.round(_local272)];
	} else _local269 = [null, null, Math.max(.01, Math.min(1, Math.sqrt(_local268 * _local268 + _local267 * _local267) / _local271))];
	this.c(_local269);
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
AngleInput.prototype.FS = function (l) {
	this.dispatch(new Action(ActionTypes.E.A, !1));
	s.removePointerMove(window, this.YV);
	s.removePointerUp(window, this.l_);
};

function GridSelector(l, d) {
	UIComponent.call(this);
	this.Et = 0;
	this.lP = d;
	this.e = s.createElement("span", "fitem angleinput");
	if (l) {
		this.oG = s.createElement("label", "flabel");
		this.$w = l;
		this.e.appendChild(this.oG);
	}
	this.T = s.createElement("canvas", "gsicon");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	s.setCanvasSizeForDpr(this.T, d, d);
	this.e.appendChild(this.T);
	s.preventTouchAndGesture(this.T);
	s.addPointerDown(this.T, this.Z1.bind(this));
	this.YV = this.Tk.bind(this);
	this.l_ = this.FS.bind(this);
	this.c(0);
}
GridSelector.prototype = new UIComponent();
GridSelector.prototype.refresh = function () {
	if (this.$w) this.oG.textContent = languageManager.get(this.$w) + ":";
};
GridSelector.prototype.setLabel = function (l) {
	this.oG.textContent = l;
};
GridSelector.prototype.b = function () {
	return this.Et;
};
GridSelector.prototype.a8w = function (l) {
	var _local275 = this.Et,
		_local273 = Math.floor(_local275 / 3),
		_local274 = _local275 - _local273 * 3;
	_local274 = Math.max(0, Math.min(2, _local274 + l.x));
	_local273 = Math.max(0, Math.min(2, _local273 + l.y));
	this.c(_local273 * 3 + _local274);
};
GridSelector.prototype.c = function (l) {
	this.Et = l;
	var _local285 = this.T.width,
		_local277 = Math.floor(l / 3),
		_local284 = l - 3 * _local277,
		_local283 = (_local284 + .5) * _local285 / 3,
		_local281 = (_local277 + .5) * _local285 / 3,
		_local287 = this.k_,
		_local278 = [.5, Math.round(_local285 / 3) + .5, Math.round(2 * _local285 / 3) + .5, _local285 - .5];
	_local287.clearRect(0, 0, _local285, _local285);
	var _local288 = this.lP < 30;
	_local287.setLineDash([]);
	_local287.strokeStyle = _local288 ? "rgba(0,0,0,0.5)" : "#000000";
	_local287.beginPath();
	for (var _local276 = 0; _local276 < 4; _local276++) {
		var _local286 = _local278[_local276];
		_local287.moveTo(_local286, 0);
		_local287.lineTo(_local286, _local285);
		_local287.moveTo(0, _local286);
		_local287.lineTo(_local285, _local286);
	}
	_local287.stroke();
	if (l == 9) return;
	if (!_local288) {
		_local287.setLineDash([1, 2]);
		var _local280 = _local285 * .53,
			_local282 = Math.max(0, Math.min(_local285 - _local280, _local283 - _local280 / 2)),
			_local279 = Math.max(0, Math.min(_local285 - _local280, _local281 - _local280 / 2));
		_local287.strokeRect(Math.round(_local282) + .5, Math.round(_local279) + .5, Math.round(_local280), Math.round(_local280));
	}
	_local287.fillStyle = "#000000";
	_local287.beginPath();
	_local287.arc(_local283, _local281, _local285 / 8, 0, Math.PI * 2);
	_local287.fill();
};
GridSelector.prototype.Z1 = function (l) {
	s.addPointerMove(document.body, this.YV);
	s.addPointerUp(document.body, this.l_);
	this.Tk(l);
};
GridSelector.prototype.Tk = function (l) {
	var _local291 = s.getEventPositionInElement(l, this.T),
		_local289 = Math.max(0, Math.min(2, Math.floor(_local291.x / (this.lP / 3)))),
		_local290 = Math.max(0, Math.min(2, Math.floor(_local291.y / (this.lP / 3))));
	this.c(_local290 * 3 + _local289);
};
GridSelector.prototype.FS = function (l) {
	this.dispatch(new Action(ActionTypes.E.A, !1));
	s.removePointerMove(document.body, this.YV);
	s.removePointerUp(document.body, this.l_);
};

function ColorSwatchStrip(hZ) {
	UIComponent.call(this);
	this.e = s.createElement("span", "fitem cswatch");
	this.a9E = 0;
	this.Ft = [];
	this.VS = [];
	var _local296 = this.auW.bind(this);
	for (var _local292 = 0; _local292 < hZ; _local292++) {
		this.Ft.push(0);
		var _local295 = s.createElement("span", "colorsample");
		_local295.addEventListener("click", _local296, !1);
		this.VS.push(_local295);
		this.e.appendChild(_local295);
	}
	var _local293 = [16711680, 65280, 255, 65535, 16711935, 16776960, 0, 8421504, 16777215],
		_local294 = Math.min(hZ, _local293.length);
	for (var _local292 = 0; _local292 < _local294; _local292++) this.Ft[_local292] = _local293[_local292];
	this.AK();
}
ColorSwatchStrip.prototype = new UIComponent();
ColorSwatchStrip.prototype.auW = function (l) {
	this.a9E = this.VS.indexOf(l.currentTarget);
	this.dispatch(new Action(ActionTypes.E.A));
};
ColorSwatchStrip.prototype.b = function () {
	return this.Ft[this.a9E];
};
ColorSwatchStrip.prototype.c = function (l) {
	var _local298 = this.Ft,
		_local297 = _local298.indexOf(l);
	if (_local297 != -1) _local298.splice(_local297, 1);else
	_local298.pop();
	_local298.unshift(l);
	this.AK();
};
ColorSwatchStrip.prototype.AK = function () {
	for (var _local299 = 0; _local299 < this.Ft.length; _local299++) {
		this.VS[_local299].setAttribute("style", "background-color:#" + PixelUtil.intToHex6(this.Ft[_local299]));
	}
};


function ColorSwatch(l) {
	UIComponent.call(this);
	this.hi = {
		o: 0,
		J: 0,
		k: 0
	};
	this.pq = l;
	this.e = s.createElement("span", "fitem colorsample");
	this.e.addEventListener("click", this.hm.bind(this), !1);
}
ColorSwatch.prototype = new UIComponent();
ColorSwatch.prototype.refresh = function () {};
ColorSwatch.prototype.hm = function (l) {
	var _local301 = this.hi;
	this.dispatch(new Action("click"));
	var _local300 = new Action(ActionTypes.E.L, !0);
	_local300.data = {
		a: ActionTypes.$.SN,
		GU: "colorpicker",
		_A: _local301.o << 16 | _local301.J << 8 | _local301.k,
		qF: this.Y_.bind(this),
		bH: this.pq
	};
	this.dispatch(_local300);
};
ColorSwatch.prototype.Y_ = function (l) {
	this.EB(l);
	this.dispatch(new Action(ActionTypes.E.A));
};
ColorSwatch.prototype.BN = function () {
	this.hm(null);
};
ColorSwatch.prototype.abZ = function () {
	var _local302 = this.hi;
	return _local302.o << 16 | _local302.J << 8 | _local302.k;
};
ColorSwatch.prototype.b = function () {
	return PixelUtil.color.rgbColorDescriptor(this.hi);
};
ColorSwatch.prototype.EB = function (l) {
	this.hi = {
		o: l >> 16 & 255,
		J: l >> 8 & 255,
		k: l & 255
	};
	this.aby();
};
ColorSwatch.prototype.c = function (l) {
	this.hi = PixelUtil.color.sampleGradientColor(l);
	this.aby();
};
ColorSwatch.prototype.aby = function () {
	var _local307 = this.hi,
		_local306 = _local307.o,
		_local303 = _local307.J,
		_local305 = _local307.k,
		_local304 = _local306 << 16 | _local303 << 8 | _local305;
	this.e.setAttribute("style", "background-color:#" + PixelUtil.intToHex6(_local304));
};


function BrushPickerButton(l) {
	FloatPickerControl.call(this, l, !1, "brushbutton nopadding", 19, 10, PsdResourceTypes.CV, !0);
	var _local339 = this.a9b;
	s.addClass(_local339, "flexrow");
	var _local337 = s.createElement("div");
	_local339.appendChild(_local337);
	var _local338 = s.createElement("div");
	_local339.appendChild(_local338);
	_local338.setAttribute("style", "margin-left:8px");
	this.Hf = new AngleInput(null, null, !0);
	this.Hf.addListener(ActionTypes.E.A, this.wG, this);
	_local337.appendChild(this.Hf.e);
	this.ln = new RangeInput([12, 14, 0], 1, 1e3, " px", 0, !0);
	this.ln.addListener(ActionTypes.E.A, this.wG, this);
	_local338.appendChild(this.ln.e);
	this.e1 = new RangeInput([12, 17], 0, 100, "%");
	this.e1.addListener(ActionTypes.E.A, this.wG, this);
	_local338.appendChild(this.e1.e);
	this.Hp = new MultiOptionBox(null, ["<img src=\"" + PIMG.prsO + "\" class=\"autoscale gsicon\" />", "<img src=\"" + PIMG.prsS + "\" class=\"autoscale gsicon\" />"], !0, [
	[15, 9, 0],
	[15, 9, 1]]
	);
	this.Hp.addListener(ActionTypes.E.A, this.wG, this);
	_local338.appendChild(this.Hp.e);
}
BrushPickerButton.prototype = new FloatPickerControl();
BrushPickerButton.prototype.pP = function () {
	var _local341 = ["pencil", "trees"];
	for (var _local340 = 0; _local340 < _local341.length; _local340++) _local341[_local340] = "brushes/" + _local341[_local340] + ".abr";
	return _local341;
};
BrushPickerButton.prototype.c = function (l, d, G) {
	this.lt = JSON.parse(JSON.stringify(l));
	var _local345 = Math.floor(20 * s.getDevicePixelRatio()),
		_local344 = Math.floor(36 * s.getDevicePixelRatio()),
		_local343 = Math.floor(24 * s.getDevicePixelRatio()),
		_local346 = iU.Gx(l, d, G, _local345, _local343, _local344);
	this.Xk.setAttribute("src", _local346);
	s.setElementSizePx(this.Xk, _local344, _local343);
	var _local342 = l.Brsh.v;
	this.ln.c(_local342.Dmtr.v.val);
	if (_local342.Hrdn != null) {
		this.e1.enable();
		this.e1.c(_local342.Hrdn.v.val);
	} else this.e1.disable();
	if (_local342.Angl != null) this.Hf.c([_local342.Angl.v.val]);
	if (_local342.Rndn != null) this.Hf.c([null, null, _local342.Rndn.v.val / 100]);
	var _local347 = [!1, !1];
	if (l.opVr) _local347[0] = l.opVr.v.bVTy.v == 2;
	if (l.szVr) _local347[1] = l.szVr.v.bVTy.v == 2;
	this.Hp.c(_local347);
};
BrushPickerButton.prototype.PH = function () {
	return {
		list: [{
			t: "Objc",
			v: this.b()
		}],
		BF: [],
		yO: []
	};
};
BrushPickerButton.prototype.b = function () {
	return this.lt;
};
BrushPickerButton.prototype.BI = function () {
	if (!this.LH) return;
	var _local354 = [],
		_local353 = [],
		_local349 = this.Ce,
		_local352 = Math.floor(33 * s.getDevicePixelRatio()),
		_local351 = Math.floor(40 * s.getDevicePixelRatio());
	for (var _local348 = 0; _local348 < _local349.list.length; _local348++) {
		var _local350 = _local349.list[_local348].v,
			_local355 = iU.Gx(_local350, _local349.BF, _local349.yO, _local352, _local351);
		_local354.push(_local355);
		_local353.push(_local350.Nm.v.split("=").pop());
	}
	this.FO.LR(_local354, _local353, _local352, _local351);
	this.LH = !1;
};
BrushPickerButton.prototype.eI = function (l) {
	var _local356 = this.Ce;
	this.c(_local356.list[this.FO.b()[0]].v, _local356.BF, _local356.yO);
	this.dispatch(new Action(ActionTypes.E.A));
};
BrushPickerButton.prototype.refresh = function () {
	FloatPickerControl.prototype.refresh.call(this);
	this.Hf.refresh();
	this.ln.refresh();
	this.e1.refresh();
};
BrushPickerButton.prototype.wG = function (l) {
	var _local363 = this.Ce,
		_local358 = this.lt,
		_local362 = _local358.Brsh.v;
	_local362.Dmtr.v.val = this.ln.b();
	if (_local362.Hrdn != null) _local362.Hrdn.v.val = this.e1.b();
	if (_local362.Angl != null) _local362.Angl.v.val = this.Hf.b()[0];
	if (_local362.Rndn != null) _local362.Rndn.v.val = Math.round(this.Hf.b()[2] * 100);
	if (l.target == this.Hp) {
		var _local361 = this.Hp.b(),
			_local360 = ["opVr", "szVr"],
			_local364 = ["usePaintDynamics", "useTipDynamics"];
		for (var _local357 = 0; _local357 < 2; _local357++) {
			var _local359 = _local360[_local357];
			if (_local358[_local359] == null) _local358[_local359] = JSON.parse(es.HW.vB[_local359]);
			_local358[_local359].v.bVTy.v = _local361[_local357] ? 2 : 0;
			if (_local361[_local357]) _local358[_local364[_local357]].v = !0;
		}
		es.HW.awH(_local358);
	}
	this.c(_local358, _local363.BF, _local363.yO);
	this.dispatch(new Action(ActionTypes.E.A));
};

function ContourPickerButton(l) {
	FloatPickerControl.call(this, l, !0, "contourbutton", 17, 10.5, PsdResourceTypes.HJ);
}
ContourPickerButton.prototype = new FloatPickerControl();
ContourPickerButton.prototype.eI = function (l) {
	this.c(this.Ce[l.target.b()]);
	this.dispatch(new Action(ActionTypes.E.A));
};
ContourPickerButton.prototype.gi = function (l) {
	var _local365 = new Action(ActionTypes.E.L, !0);
	_local365.data = {
		a: ActionTypes.$.SN,
		GU: "contoureditor",
		Vm: this.lt,
		response: this.azn.bind(this)
	};
	this.dispatch(_local365);
};
ContourPickerButton.prototype.azn = function (l) {
	this.c(l);
	this.dispatch(new Action(ActionTypes.E.A));
};
ContourPickerButton.prototype.BI = function () {
	if (!this.LH) return;
	var _local371 = Math.floor(38 * s.getDevicePixelRatio()),
		_local370 = Math.floor(38 * s.getDevicePixelRatio()),
		_local367 = [],
		_local369 = [],
		_local368 = this.Ce;
	for (var _local366 = 0; _local366 < _local368.length; _local366++) {
		_local369.push(_local368[_local366].Nm ? _local368[_local366].Nm.v : "");
		_local367.push(PixelUtil.presetThumb.Gx(_local368[_local366].Crv.v, _local371, _local370));
	}
	this.FO.LR(_local367, _local369, _local371, _local370);
	this.LH = !1;
};
ContourPickerButton.prototype.c = function (l) {
	this.lt = JSON.parse(JSON.stringify(l));
	var _local373 = this.lt.Crv.v;
	for (var _local372 = 0; _local372 < _local373.length; _local372++)
	if (_local373[_local372].v.Cnty == null) _local373[_local372].v.Cnty = {
		t: "bool",
		v: !0
	};
	this.Vv();
};
ContourPickerButton.prototype.Vv = function () {
	var _local376 = Math.floor(30 * s.getDevicePixelRatio()),
		_local375 = Math.floor(30 * s.getDevicePixelRatio()),
		_local374 = PixelUtil.presetThumb.Gx(this.lt.Crv.v, _local376, _local375);
	this.Xk.setAttribute("src", _local374);
	s.setElementSizePx(this.Xk, _local376, _local375);
};
ContourPickerButton.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.lt));
};

function FillPickerButton(l) {
	UIComponent.call(this);
	this.Gr = null;
	this.mN = null;
	this._B = null;
	this.UZ = null;
	this.axv = [];
	this.a4E = [];
	this.e = s.createElement("span", "fitem fillbutton");
	this.hg = new UIComponent();
	this.hg.e = s.createElement("div", "floatcont form");
	this.hg.e.setAttribute("style", "width: 21em;");
	this.hg.parent = this;
	this.c1 = l;
	this.oG = this.oG = s.createElement("label", "flabel");
	this.e.appendChild(this.oG);
	this.T = s.createElement("canvas");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	this.aoM = null;
	this.e.appendChild(this.T);
	s.addPointerDown(this.T, this.Ll.bind(this));
	this.hz = new ButtonGroupMenu([12, 66], ["", "Color", "Grad", "Patt"]);
	this.hg.e.appendChild(this.hz.e);
	this.hz.addListener(ActionTypes.E.A, this.Q3, this);
	this.hg.e.appendChild(s.createElement("hr"));
	this.ayI = s.createElement("span");
	this.vk = new ColorSwatch(!1);
	this.vk.parent = this.hg;
	this.vk.addListener(ActionTypes.E.A, this.Q3, this);
	this.g1 = new ColorSwatchStrip(10);
	this.g1.addListener(ActionTypes.E.A, this.Q3, this);
	this._6 = s.createElement("div", "marged hiline");
	this._6.appendChild(this.vk.e);
	s.appendBr(this._6);
	this._6.appendChild(this.g1.e);
	this.P$ = new LayerStyleOptionRow("GrFl", !0);
	this.P$.parent = this.hg;
	this.P$.addListener(ActionTypes.E.A, this.Q3, this);
	this.RM = s.createElement("div", "marged hiline");
	var _local379 = "Grad Type Algn Angl Rvrs Scl Ofst".split(" ");
	for (var _local377 = 0; _local377 < _local379.length; _local377++) {
		var _local378 = this.P$.k7[_local379[_local377]].e;
		this.RM.appendChild(_local378);
	}
	this.bx = new LayerStyleOptionRow("patternFill", !0);
	this.bx.parent = this.hg;
	this.bx.addListener(ActionTypes.E.A, this.Q3, this);
	this.iC = s.createElement("div", "marged hiline");
	var _local379 = ["Ptrn", "Angl", "Scl", "Algn", "phase"];
	for (var _local377 = 0; _local377 < _local379.length; _local377++) {
		var _local378 = this.bx.k7[_local379[_local377]].e;
		this.iC.appendChild(_local378);
	}
}
FillPickerButton.prototype = new UIComponent();
FillPickerButton.prototype.BM = function (l, d) {
	var _local380 = SwatchesPanel.dm(l, d);
	if (_local380 != null) this.g1.c(_local380);
	if (d == PsdResourceTypes.lL) {
		this.axv = [];
		this.a4E = [];
		if (this.Gr) this.c(this._B, this.b(), this.Gr);
	}
	this.mN = l;
	this.P$.BM(l, d);
	this.bx.BM(l, d);
};
FillPickerButton.prototype.refresh = function () {
	this.oG.textContent = languageManager.get(this.c1) + ": ";
	this.hz.refresh();
	this.vk.refresh();
	this.P$.refresh();
	this.bx.refresh();
};
FillPickerButton.prototype.Q3 = function (l) {
	var _local383 = l.currentTarget;
	if (_local383 == this.hz) {
		var _local381 = this.hz.b(),
			_local382 = {
				hA: _local381,
				rU: this.Gr[_local381]
			};
		if (_local381 > 0 && _local382.rU == null) _local382.rU = JSON.parse(JSON.stringify(LayerStyleConstants.defaultContentStyles[_local381 - 1]));
		if (this.Gr) this.c(this._B, _local382, this.Gr);
	}
	if (_local383 == this.g1) this.vk.EB(_local383.b());
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
FillPickerButton.prototype.Ll = function (l) {
	if (s.isInDocument(this.hg.e)) return;
	l.stopPropagation();
	var _local385 = this.T.getBoundingClientRect(),
		_local384 = new Action(ActionTypes.E.L, !0);
	_local384.data = {
		a: ActionTypes.$.dY,
		A3: this.hg,
		x: _local385.left,
		y: _local385.top + _local385.height + 4
	};
	this.dispatch(_local384);
};
FillPickerButton.prototype.c = function (l, d, G) {
	this.Gr = G;
	this._B = l;
	var _local392 = [
		[13, 1, 0],
		[13, 0],
		[12, 37],
		[12, 62]],

		_local391 = this.axv,
		_local389 = this.a4E,
		_local394 = !1,
		_local388;
	for (var _local386 = 0; _local386 < 4; _local386++) {
		var _local387 = {
				hA: _local386,
				rU: G[_local386]
			},
			_local395 = FillPickerButton.amu(_local387);
		if (_local389[_local386] == _local395) continue;
		_local394 = !0;
		var _local393 = FillPickerButton.az9(null, _local387, this.mN, this._B, 22, 22, !1);
		_local391[_local386] = "<img width=\"22\" height=\"22\" src=\"" + _local393 + "\" />";
		_local389[_local386] = _local395;
	}
	if (_local394) this.hz.b3(_local391, _local392);
	this.hz.c(d.hA);
	var _local395 = FillPickerButton.amu(d);
	if (_local395 != this.aoM) FillPickerButton.az9(this.k_, d, this.mN, this._B, 30, 23, !0);
	this.aoM = _local395;
	var _local390 = d.hA;
	if (_local390 == 0) {
		_local388 = this.ayI;
	}
	if (_local390 == 1) {
		this.vk.c(d.rU.Clr.v);
		_local388 = this._6;
	}
	if (_local390 == 2) {
		this.P$.update(l, d.rU);
		_local388 = this.RM;
	}
	if (_local390 == 3) {
		this.bx.update(l, d.rU);
		_local388 = this.iC;
	}
	if (_local388 != this.UZ) {
		if (this.UZ != null) {
			this.hg.e.removeChild(this.UZ);
		}
		this.hg.e.appendChild(_local388);
		this.UZ = _local388;
	}
};
FillPickerButton.prototype.b = function () {
	var _local396 = {
		hA: this.hz.b()
	};
	if (_local396.hA == 1) {
		_local396.rU = JSON.parse(JSON.stringify(LayerStyleConstants.defaultContentStyles[0]));
		_local396.rU.Clr.v = this.vk.b();
	}
	if (_local396.hA == 2) {
		_local396.rU = this.P$.b();
	}
	if (_local396.hA == 3) {
		_local396.rU = this.bx.b();
	}
	return _local396;
};
FillPickerButton.amu = function (l) {
	var _local399 = l.hA,
		_local397 = l.rU,
		_local398 = "empty";
	if (_local399 == 1) {
		_local398 = PixelUtil.color.sampleGradientColor(_local397.Clr.v);
		_local398 = _local398.o + "," + _local398.J + "," + _local398.k;
	}
	if (_local399 == 2) _local398 = JSON.stringify(_local397.Grad.v);
	if (_local399 == 3) _local398 = _local397.Ptrn.v.Idnt.v;
	return _local398;
};
FillPickerButton.az9 = function (l, d, G, b, V, Q, t) {
	if (l == null) l = FillPickerButton.k_;
	var _local400 = Math.floor(V * s.getDevicePixelRatio()),
		_local410 = Math.floor(Q * s.getDevicePixelRatio()),
		_local405 = l.canvas,
		_local402;
	_local405.width = _local400;
	_local405.height = _local410;
	s.setElementSizePx(_local405, _local400, _local410);
	var _local403 = d.hA;
	if (_local403 == 0) {
		l.fillStyle = "#ffffff";
		l.fillRect(0, 0, _local400, _local410);
		l.strokeStyle = "#ff0000";
		l.lineWidth = 2;
		l.moveTo(0, 0);
		l.lineTo(_local400, _local410);
		l.moveTo(0, _local410);
		l.lineTo(_local400, 0);
		l.stroke();
	}
	if (_local403 == 1) {
		var _local401 = d.rU.Clr.v;
		_local401 = PixelUtil.color.sampleGradientColor(_local401);
		l.fillStyle = "#" + PixelUtil.intToHex6(_local401.o << 16 | _local401.J << 8 | _local401.k);
		l.fillRect(0, 0, _local400, _local410);
	}
	if (_local403 == 2) {
		f.RK.Gx(d.rU.Grad.v, _local400, _local410, 0, G.Y7, G.GF, l);
	}
	if (_local403 == 3) {
		var _local408 = d.rU.Ptrn.v,
			_local409;
		if (b != null) _local409 = PatternHelper.xQ(_local408, b.add.Patt);
		if (_local409 == null) _local409 = PatternHelper.xQ(_local408, G._N);
		PatternPickerButton.Gx(_local409, _local400, _local410, _local405);
	}
	if (t) {
		l.beginPath();
		l.strokeStyle = "#000000";
		l.fillStyle = "#ffffff";
		l.lineWidth = 2;
		var _local404 = _local400 * .7,
			_local407 = Math.floor(_local410 * .7),
			_local406 = 7 * s.getDevicePixelRatio();
		l.moveTo(_local404, _local407);
		l.lineTo(_local404 + _local406, _local407);
		l.lineTo(_local404 + _local406 / 2, _local407 + _local406 / 2);
		l.closePath();
		l.stroke();
		l.fill();
	}
	if (l == FillPickerButton.k_) return _local405.toDataURL();
};
FillPickerButton.k_ = s.createElement("canvas").getContext("2d", { willReadFrequently: true });

function PatternPickerButton(l) {
	FloatPickerControl.call(this, l, !1, "patternbutton", 18, 10, PsdResourceTypes.lL);
	this.GW = null;
}
PatternPickerButton.prototype = new FloatPickerControl();
PatternPickerButton.prototype.eI = function (l) {
	var _local411 = this.Ce[this.FO.b()];
	this.lt = {
		classID: "Ptrn",
		Nm: {
			t: "TEXT",
			v: _local411.name
		},
		Idnt: {
			t: "TEXT",
			v: _local411.id
		}
	};
	this.dispatch(new Action(ActionTypes.E.A));
	this.Vv();
};
PatternPickerButton.prototype.BI = function () {
	if (!this.LH) return;
	var _local417 = this.Ce,
		_local416 = Math.floor(38 * s.getDevicePixelRatio()),
		_local413 = Math.floor(38 * s.getDevicePixelRatio()),
		_local415 = [],
		_local414 = [];
	for (var _local412 = 0; _local412 < _local417.length; _local412++) {
		_local415.push(PatternPickerButton.Gx(_local417[_local412], _local416, _local413));
		_local414.push(_local417[_local412].name);
	}
	this.FO.LR(_local415, _local414, _local416, _local413);
	this.LH = !1;
};
PatternPickerButton.prototype.c = function (l, d) {
	if (this.lt && l.Idnt.v == this.lt.Idnt.v) return;
	this.lt = JSON.parse(JSON.stringify(l));
	this.Vv(d);
};
PatternPickerButton.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.lt));
};
PatternPickerButton.prototype.PH = function () {
	return this.GW ? [this.GW] : [];
};
PatternPickerButton.prototype.Vv = function (l) {
	var _local421 = Math.floor(50 * s.getDevicePixelRatio()),
		_local418 = Math.floor(50 * s.getDevicePixelRatio()),
		_local420;
	if (l != null) _local420 = PatternHelper.xQ(this.lt, l.add.Patt);
	if (_local420 == null) _local420 = PatternHelper.xQ(this.lt, this.Ce);
	this.GW = _local420;
	var _local419 = PatternPickerButton.Gx(_local420, _local421, _local418);
	this.Xk.setAttribute("src", _local419);
	s.setElementSizePx(this.Xk, _local421, _local418);
};
PatternPickerButton.T = s.createElement("canvas", "");
PatternPickerButton.Gx = function (l, d, G, b) {
	if (b == null) b = PatternPickerButton.T;
	var _local428 = b.getContext("2d", { willReadFrequently: true });
	b.width = d;
	b.height = G;
	if (l) {
		var _local425 = l.Rj[1],
			_local432 = _local425.m,
			_local422 = _local425.n,
			_local433 = l.Rj[0],
			_local429 = Math.min(d / _local432, G / _local422),
			_local424 = _local429;
		if (_local424 * _local432 < 2) _local424 = 2 / _local432;
		var _local426 = _local429;
		if (_local426 * _local422 < 2) _local426 = 2 / _local422;
		var _local423 = f.NH.eJ([_local433, _local425], new Matrix2D(_local424, 0, 0, _local426, 0, 0), _local424 > 2),
			_local430 = _local423.rect.m,
			_local431 = _local423.rect.n,
			_local427 = _local428.createImageData(_local430, _local431);
		PixelUtil.copyByteBuffer(_local423.buffer, _local427.data);
		_local428.putImageData(_local427, Math.floor((d - _local430) / 2), Math.floor((G - _local431) / 2));
	}
	return b.toDataURL();
};


function PatternPickerWide(l, d, G) {
	if (d == null) d = 24.2;
	if (G == null) G = 17;
	FloatPickerControl.call(this, l, !1, "patternbutton", d, G, PsdResourceTypes.G9);
	this.nV = "";
}
PatternPickerWide.prototype = new FloatPickerControl();
PatternPickerWide.prototype.Z2 = function (l) {
	if (l == null) l = [
	[],
	[]];else

	if (!Array.isArray(l[0])) l = [l, this.Ce && this.Ce[1] ? this.Ce[1] : []];
	FloatPickerControl.prototype.Z2.call(this, l);
};
PatternPickerWide.prototype.TA = function (l) {
	var _local435 = this.FO.b(),
		_local440 = this.Ce && this.Ce[0] ? this.Ce[0] : [],
		_local438 = new Action(ActionTypes.E.L, !0),
		_local437 = {
			a: ActionTypes.$.kI,
			Oo: this.Ck,
			F0: _local435
		};
	if (l > 1 && _local435.length == 0) {
		alert("No items selected");
		return;
	}
	if (l == 0) _local438.data = {
		a: ActionTypes.$.Um
	};else
	if (l == 1) {
		var _local439 = [];
		for (var _local434 = 0; _local434 < _local435.length; _local434++)
		if (_local440[_local435[_local434]] != null) _local439.push(_local440[_local435[_local434]]);
		_local438.data = {
			a: ActionTypes.$.Bs,
			abe: this.Ck,
			F0: _local435.length == 0 ? null : _local435,
			stylePresets: _local435.length == 0 ? _local440.slice(0) : _local439
		};
	} else if (l == 2) {
		var _local436 = this.FO.kv[1][_local435[0]];
		_local437.pb = "rnm";
		_local438.data = {
			a: ActionTypes.$.SN,
			GU: "namewindow",
			mS: _local436,
			P7: {
				Y: ActionTypes.E.L,
				W: _local437
			}
		};
	} else if (l == 3) {
		_local438.data = _local437;
		_local437.pb = "del";
	}
	this.dispatch(_local438);
};
PatternPickerWide.prototype.eI = function (l) {
	this.lt = JSON.parse(JSON.stringify(this.Ce[0][this.FO.b()[0]]));
	this.dispatch(new Action(ActionTypes.E.A));
};
PatternPickerWide.prototype.BI = function () {
	var _local446 = this.Ce;
	if (_local446 == null || !this.LH) return;
	var _local445 = Math.floor(50 * s.getDevicePixelRatio()),
		_local442 = Math.floor(50 * s.getDevicePixelRatio()),
		_local444 = [],
		_local443 = [];
	for (var _local441 = 0; _local441 < _local446[0].length; _local441++) {
		_local444.push(PatternPickerWide.Gx(this.Ce[0][_local441].x1, _local445, _local442, this.Ce[1]));
		_local443.push(_local446[0][_local441].Zc.Nm.v.split("=").pop());
	}
	this.FO.LR(_local444, _local443, _local445, _local442);
	this.LH = !1;
};
PatternPickerWide.prototype.c = function (l, d, G, b) {
	var _local447 = JSON.stringify(l.x1) + "," + G + "," + b;
	if (this.nV != _local447) {
		this.nV = _local447;
		this.lt = JSON.parse(JSON.stringify(l));
		this.Vv(d, G, b);
	}
};
PatternPickerWide.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.lt));
};
PatternPickerWide.prototype.Vv = function (l, d, G) {
	var _local450 = Math.floor(68 * s.getDevicePixelRatio()),
		_local449 = Math.floor(68 * s.getDevicePixelRatio()),
		_local448 = PatternPickerWide.Gx(this.lt.x1, _local450, _local449, l ? l : this.Ce[1], d, G);
	this.Xk.setAttribute("src", _local448);
	s.setElementSizePx(this.Xk, _local450, _local449);
};
PatternPickerWide.Gx = function (l, d, G, b, V, Q) {
	var _local455 = new PsdDocument();
	_local455.m = d;
	_local455.n = G;
	_local455.buffer = PixelUtil.allocBytes(d * G * 4);
	_local455.add.Patt = b;
	_local455.Sn(V == null ? 90 : V);
	_local455.Q1(Q == null ? 30 : Q);
	var _local451 = new Rect(0, 0, Math.round(d * .5), Math.round(G * .5));
	_local451.x = Math.round((d - _local451.m) / 2);
	_local451.y = Math.round((G - _local451.n) / 2);
	var _local456 = _local455.V4();
	_local456.rect = _local451;
	_local456.buffer = PixelUtil.allocBytes(_local451.O() * 4);
	PixelUtil.andMaskUint32(_local456.buffer, 4284045657);
	PatternHelper.acB(l, _local456, .5 * 100);
	_local455.B.push(_local456);
	_local455.vp();
	_local455.U();
	var _local454 = WebGLContext.webglAvailable;
	WebGLContext.webglAvailable = false;
	_local455.Po();
	var _local452 = _local455.LT();
	WebGLContext.webglAvailable = _local454;
	var _local453 = FormatHandler.CY(_local452.buffer, _local455.m, _local455.n);
	return _local453;
};


function ToolPresetButton(l) {
	FloatPickerControl.call(this, null, !1, "tpresetbutton", 18, 24, PsdResourceTypes.qa, !0);
	s.removeClass(this.e, "fitem");
	this.FO.dk(1);
	this.id = l;
	this.Vv();
	this.a.style.overflow = "hidden";
	this.D4 = new CheckboxControl([15, 7, 9]);
	this.D4.c(!0);
	this.D4.addListener(ActionTypes.E.A, this.a0E, this);
	this.Sc.appendChild(this.D4.e);
}
ToolPresetButton.prototype = new FloatPickerControl();
ToolPresetButton.prototype.ajv = function (l) {
	if (this.id == l) return;
	this.id = l;
	this.Z2(this.Ce);
};
ToolPresetButton.prototype.eI = function (l) {
	var _local458 = this.Ce[this.FO.b()],
		_local457 = new Action(ActionTypes.E.L, !0);
	_local457.data = {
		a: ActionTypes.$.kI,
		pb: "set",
		Oo: PsdResourceTypes.qa,
		G2: _local458
	};
	this.dispatch(_local457);
};
ToolPresetButton.prototype.refresh = function () {
	FloatPickerControl.prototype.refresh.call(this);
	this.D4.refresh();
};
ToolPresetButton.prototype.a0E = function () {
	this.LH = !0;
	this.BI();
};
ToolPresetButton.prototype.BI = function () {
	if (!this.LH) return;
	var _local465 = Math.floor(16 * s.getDevicePixelRatio()),
		_local464 = Math.floor(16 * s.getDevicePixelRatio()),
		_local460 = [],
		_local463 = [],
		_local462 = this.Ce,
		_local461 = this.D4.b();
	for (var _local459 = 0; _local459 < _local462.length; _local459++) {
		var _local466 = f.avH(_local462[_local459]);
		if (!_local461 || _local466 == this.id) {
			_local463.push(_local462[_local459][0] ? _local462[_local459][0].split("=").pop() : "");
			_local460.push(_local466 == -1 ? "" : PIMG[f.y5[_local466][0]]);
		} else {
			_local460.push(null);
			_local463.push(null);
		}
	}
	this.FO.LR(_local460, _local463, _local465, _local464);
	this.LH = !1;
};
ToolPresetButton.prototype.Vv = function () {
	var _local467 = this.Xk;
	_local467.setAttribute("src", PIMG[f.y5[this.id][0]]);
	s.addClass(_local467, "toolicon");
};
ToolPresetButton.prototype.PH = function () {
	return null;
};
ToolPresetButton.c9 = {};
ToolPresetButton.Gx = function (l, d, G) {
	var _local471 = ToolPresetButton.k_,
		_local470 = ToolPresetButton.c9,
		_local469 = PixelUtil.intToHex6(l.o << 16 | l.J << 8 | l.k);
	if (_local470[_local469]) return _local470[_local469];
	if (_local471 == null) {
		var _local472 = s.createElement("canvas");
		_local471 = ToolPresetButton.k_ = _local472.getContext("2d", { willReadFrequently: true });
	}
	var _local472 = _local471.canvas;
	_local472.width = d;
	_local472.height = G;
	_local471.fillStyle = "#" + _local469;
	_local471.fillRect(0, 0, d, G);
	var _local468 = _local470[_local469] = _local472.toDataURL();
	return _local468;
};



function WarpDistortionPanel(l, d, G) {
	UIComponent.call(this);
	if (l == null) l = !1;
	if (d == null) d = !1;
	if (G == null) G = !1;
	this.aew = d;
	this.$V = null;
	this.XZ = new WarpStyleButton([12, 22], G);
	this.XZ.parent = this;
	this.XZ.addListener(ActionTypes.E.A, this.B5, this);
	this.NW = new DropdownMenu([22, 0], [
	[22, 4, 0],
	[22, 4, 1]]
	);
	this.NW.addListener(ActionTypes.E.A, this.B5, this);
	var _local1010 = l ? RangeDropInput : RangeInput;
	this.gT = new _local1010([22, 1], -100, 100, "%");
	this.eV = new _local1010("Horizontal Distortion:", -100, 100, "%");
	this.la = new _local1010("Vertical Distortion:", -100, 100, "%");
	this.gT.parent = this.eV.parent = this.la.parent = this;
	this.gT.addListener(ActionTypes.E.A, this.B5, this);
	this.eV.addListener(ActionTypes.E.A, this.B5, this);
	this.la.addListener(ActionTypes.E.A, this.B5, this);
}
WarpDistortionPanel.prototype = new UIComponent();
WarpDistortionPanel.prototype.refresh = function () {
	this.XZ.refresh();
	this.NW.refresh();
	this.gT.refresh();
	var _local1011 = this.aew ? 1 : 100;
	this.eV.setLabel("Hoizontal Distortion".substring(0, _local1011) + ":");
	this.la.setLabel("Vertical Distortion".substring(0, _local1011) + ":");
};
WarpDistortionPanel.prototype.B5 = function () {
	var _local1014 = this.$V,
		_local1013 = this.XZ.b(),
		_local1012 = _local1014.warpStyle.v.warpStyle;
	if (_local1013 == "warpCustom") PixelUtil.textWarp.VH(PixelUtil.textWarp.js(_local1014), _local1014);else
	delete _local1014.customEnvelopeWarp;
	_local1014.warpStyle.v.warpStyle = this.XZ.b();
	_local1014.warpRotate.v.Ornt = ["Hrzn", "Vrtc"][this.NW.b()];
	_local1014.warpValue.v = this.gT.b();
	_local1014.warpPerspective.v = this.eV.b();
	_local1014.warpPerspectiveOther.v = this.la.b();
	if (_local1013 == "warpNone" || _local1013 == "warpCustom") {
		_local1014.warpValue.v = 0;
		_local1014.warpPerspective.v = 0;
		_local1014.warpPerspectiveOther.v = 0;
	} else if (_local1012 == "warpNone" || _local1012 == "warpCustom") _local1014.warpValue.v = 50;
	this.dispatch(new Action(ActionTypes.E.A, !1));
	this.c(_local1014);
};
WarpDistortionPanel.prototype.b = function (l) {
	return JSON.parse(JSON.stringify(this.$V));
};
WarpDistortionPanel.prototype.c = function (l) {
	this.$V = JSON.parse(JSON.stringify(l));
	this.XZ.c(l.warpStyle.v.warpStyle);
	this.NW.c(l.warpRotate.v.Ornt == "Hrzn" ? 0 : 1);
	this.gT.c(l.warpValue.v);
	this.eV.c(l.warpPerspective.v);
	this.la.c(l.warpPerspectiveOther.v);
	var _local1018 = l.warpStyle.v.warpStyle,
		_local1016 = _local1018 == "warpNone" || _local1018 == "warpCustom",
		_local1017 = [this.NW, this.gT, this.eV, this.la];
	for (var _local1015 = 0; _local1015 < _local1017.length; _local1015++)
	if (_local1016) _local1017[_local1015].disable();else
	_local1017[_local1015].enable();
};

function LayerCanvasPanel(l) {
	UIComponent.call(this);
	this.acM = {};
	this.e = s.createElement("div");
	this.Gq = l;
	this.OG = null;
	this.oS = new Point2D(0, 0);
	this.tn = "position:relative;overflow:hidden;background-color:var(--bg-canvas);";
	this.A$ = null;
	this.HX = new s.CursorPreview(this.e);
	this.uH("grab");
	this.T = s.createElement("canvas", "canv");
	this.e.appendChild(this.T);
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	this.ajn = null;
	this._Y = null;
	this.V3 = null;
	this.yL = 0;
	this.TK = 0;
	this.KV = 0;
	this.aqP = this.agc.bind(this);
	this.axg = null;
	this.u = new DocumentViewState({
		m: 1,
		n: 1
	});
	this.S3 = null;
	this.e6 = null;
	this.s$ = [];
	this.aaJ = 0;
	this.Fs = 0;
	this.ask = this.JO.bind(this);
	this.a8o = this.D2.bind(this);
	this.a6Z = this.qd.bind(this);
	this.anX = this.Uh.bind(this);
	this.a2j = 0;
	this.Bf = null;
	this.agv(this.T);
	this.t0(this);
}
LayerCanvasPanel.prototype = new UIComponent();
LayerCanvasPanel.prototype.a9O = function (l) {
	this.acM = l;
	this.LO();
};
LayerCanvasPanel.a9m = function (l) {
	var _local1019 = new KeyboardHandler(!0);
	if (l >= 0) _local1019.sm("Space");
	if (l >= 1) {
		_local1019.sm("ControlLeft");
		if (l == 2) _local1019.sm("AltLeft");
	}
	return _local1019;
};
LayerCanvasPanel.prototype.o9 = function (l) {
	var _local1022 = this.A$,
		_local1020 = null;
	if (l.l(KeyboardHandler.Mm)) {
		_local1020 = "grab";
		if (l.l(KeyboardHandler.wz)) {
			_local1020 = "zoom-in";
			if (l.l(KeyboardHandler.Jm)) _local1020 = "zoom-out";
		}
	}
	this.OG = _local1020;
	if (_local1020) _local1022 = _local1020;
	this.HX.setSource(_local1022, this.tn);
	if (l.l(KeyboardHandler.wz)) {
		var _local1021 = 0;
		if (l.l(KeyboardHandler.W$)) _local1021 = 1;
		if (l.l(KeyboardHandler.Zw)) _local1021 = -1;
		if (_local1021 != 0) {
			this.h7(new Point2D(this.T.width / 2, this.T.height / 2), _local1021 == 1);
		}
	}
};
LayerCanvasPanel.prototype.uH = function (l) {
	this.A$ = l;
	if (this.OG) return;
	this.HX.setSource(l, this.tn);
};
LayerCanvasPanel.prototype.agv = function (l) {
	s.addPointerDown(l, this.ask);
	s.preventTouchAndGesture(l);
	l.addEventListener("wheel", this.anX, !1);
};
LayerCanvasPanel.prototype.t0 = function (l) {
	l.addListener("viewchange", this.aaZ, this);
};
LayerCanvasPanel.prototype.aaZ = function (l) {
	var _local1024 = this.u.N,
		_local1023 = l.currentTarget.KI();
	this.u.N = _local1023.N;
	this.u.R = _local1023.R.clone();
	if (_local1024 != _local1023.N) this.Pu();
	this.LO();
};
LayerCanvasPanel.prototype.KI = function () {
	return {
		N: this.u.N,
		R: this.u.R
	};
};
LayerCanvasPanel.prototype.c = function (l, d) {
	var _local1025 = l[0].uA;
	if (this._Y != null && this._Y[0].uA.XB(_local1025)) {} else {
		this.u.Kv = {
			m: _local1025.m,
			n: _local1025.n
		};
		this.u.R = new Point2D(0, 0);
		this.u.N = 1;
	}
	this._Y = l;
	this.Pu();
	this.dU();
	this.yL = 0;
	this.TK = 0;
	this.KV = d == null ? 0 : d;
	this.agc();
};
LayerCanvasPanel.prototype.Uh = function (l) {
	l.preventDefault();
	if (l.deltaY == 0 || Date.now() - this.a2j < 100) return;
	var _local1026 = s.getEventPositionInElement(l);
	_local1026.x = s.getDevicePixelRatio() * _local1026.x;
	_local1026.y = s.getDevicePixelRatio() * _local1026.y;
	this.a2j = Date.now();
	this.h7(_local1026, l.deltaY < 0);
};
LayerCanvasPanel.prototype.h7 = function (l, d) {
	f.gU.p8(this.u, l, d);
	this.a1o();
};
LayerCanvasPanel.prototype.kn = function () {
	var _local1028 = this.u,
		_local1027 = _local1028.Kv;
	this.u.N = f.gU.agP(_local1027.m, _local1027.n, _local1028.Vm.m, _local1028.Vm.n);
	this.a1o();
};
LayerCanvasPanel.prototype.a1o = function () {
	this.Pu();
	this.dispatch(new Action("viewchange"));
	this.dispatch(new Action("zoom"));
};
LayerCanvasPanel.prototype.Pu = function () {
	this.V3 = [];
	var _local1033 = this.u.N;
	if (this._Y == null) return;
	for (var _local1029 = 0; _local1029 < this._Y.length; _local1029++) {
		var _local1032 = this._Y[_local1029],
			_local1030 = new Uint8Array(_local1032.data),
			_local1031;
		if (_local1033 >= 1) _local1031 = {
			QI: _local1030,
			rect: _local1032.uA
		};else
		_local1031 = PixelUtil.buildRgbaPyramid(_local1030, _local1032.uA, _local1033);
		this.V3.push(_local1031);
	}
};
LayerCanvasPanel.prototype.dU = function () {
	clearTimeout(this.axg);
};
LayerCanvasPanel.prototype.LO = function () {
	if (this._Y == null || !s.isInDocument(this.T)) return;
	var _local1054 = this.ajn,
		_local1049 = this.T.width,
		_local1036 = this.T.height,
		_local1057,_local1043;
	if (_local1054 == null || _local1054.width != _local1049 || _local1054.height != _local1036) {
		_local1054 = this.ajn = this.k_.createImageData(_local1049, _local1036);
		console.log("creating image data");
	}
	var _local1048 = this._Y[this.yL],
		_local1044 = this.V3[this.yL],
		_local1041 = this.u,
		_local1058 = _local1041.Kv,
		_local1038 = _local1041.Vm,
		_local1059 = _local1038.m,
		_local1050 = _local1038.n,
		_local1040 = _local1058.m * _local1041.N,
		_local1042 = _local1058.n * _local1041.N,
		_local1039 = Math.round((_local1059 - _local1040) / 2 + _local1041.R.x),
		_local1055 = Math.round((_local1050 - _local1042) / 2 + _local1041.R.y);
	if (_local1041.N <= 1) {
		_local1043 = _local1044.rect.clone();
		_local1043.x = _local1039;
		_local1043.y = _local1055;
		_local1040 = _local1043.m;
		_local1042 = _local1043.n;
		_local1057 = _local1044.QI;
	} else {
		var _local1052 = 1 / _local1041.N,
			_local1051 = new Rect(Math.floor((_local1038.x - _local1039) * _local1052), Math.floor((_local1038.y - _local1055) * _local1052), Math.ceil(_local1038.m * _local1052) + 1, Math.ceil(_local1038.n * _local1052) + 1),
			_local1046 = new Rect(0, 0, _local1051.m * _local1041.N, _local1051.n * _local1041.N);
		_local1046.x = _local1051.x * _local1041.N + _local1039;
		_local1046.y = _local1051.y * _local1041.N + _local1055;
		if (_local1041.xL == null || _local1041.xL.length != _local1051.O() * 4) {
			_local1041.xL = PixelUtil.allocBytes(_local1051.O() * 4);
		}
		if (_local1041.Je == null || _local1041.Je.length != _local1046.O() * 4) {
			_local1041.Je = PixelUtil.allocBytes(_local1046.O() * 4);
		}
		PixelUtil.andMaskUint32(_local1041.xL, 0);
		PixelUtil.blitRgbaRect(_local1044.QI, _local1044.rect, _local1041.xL, _local1051);
		PixelUtil.scale.Pf(_local1041.xL, _local1051.m, _local1051.n, _local1041.Je, _local1046.m, _local1046.n, _local1041.N);
		_local1057 = _local1041.Je;
		_local1043 = _local1046;
	}
	var _local1053 = new Uint8Array(_local1054.data.buffer);
	PixelUtil.fillCheckerboard(_local1053, _local1059, _local1050, 8, -_local1039, -_local1055);
	PixelUtil.blend.compositeBlend("norm", _local1057, _local1043, _local1053, _local1038, _local1038, 1);
	var _local1035 = this.k_;
	_local1035.setTransform(1, 0, 0, 1, 0, 0);
	_local1035.putImageData(_local1054, 0, 0);
	_local1035.clearRect(_local1039 - 1e3, _local1055, 1e3, _local1042);
	_local1035.clearRect(_local1039 + _local1040, _local1055, 1e3, _local1042);
	_local1035.clearRect(_local1039 - 1e3, _local1055 - 1e3, _local1040 + 2e3, 1e3);
	_local1035.clearRect(_local1039 - 1e3, _local1055 + _local1042, _local1040 + 2e3, 1e3);
	var _local1034 = LayerCanvasPanel.ae$(_local1041.N, "#ffffff");
	_local1035.putImageData(_local1034, 0, _local1041.Vm.n - _local1034.height);
	var _local1056 = this.acM,
		_local1041 = this.u;
	if (_local1056) {
		var _local1037 = NamedTabPanel.ut([.1, .5, 1, 1]),
			_local1045 = NamedTabPanel.ut([1, 0, 0, 1]),
			_local1047 = _local1041.Gb(!1);
		_local1047.hI();
		_local1035.save();
		_local1035.setTransform(_local1047.aS, _local1047.k, _local1047.S5, _local1047.Qd, _local1047.cI, _local1047.xu);
		_local1035.strokeStyle = _local1045;
		if (_local1056.abP) {
			NamedTabPanel.US(_local1056.abP, null, _local1035);
			_local1035.lineWidth = 1 / _local1041.N;
			_local1035.stroke();
		}
		_local1035.strokeStyle = _local1037;
		_local1035.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
		if (_local1056.Bt) {
			NamedTabPanel.US(_local1056.Bt, null, _local1035);
			_local1035.lineWidth = 1 / _local1041.N;
			_local1035.stroke();
		}
		if (_local1056.jf) {
			NamedTabPanel.aoJ(_local1056.jf, _local1035, _local1041, .5);
			_local1035.lineWidth = 2 / _local1041.N;
			_local1035.stroke();
			_local1035.fill();
		}
		_local1035.restore();
	}
	_local1035.getImageData(0, 0, 1, 1);
};
LayerCanvasPanel.a92 = "";
LayerCanvasPanel.akC = null;
LayerCanvasPanel.ae$ = function (l, d, G, b) {
	if (G == null) {
		G = 0;
		b = 0;
	}
	var _local1065 = G + " \xD7 " + b,
		_local1063 = "z" + l + "," + d + "," + G + "," + b;
	if (_local1063 == LayerCanvasPanel.a92) return LayerCanvasPanel.akC;
	var _local1069 = Math.round(50 * s.getDevicePixelRatio()),
		_local1060 = Math.round(18 * s.getDevicePixelRatio()),
		_local1070 = G == 0 ? 0 : Math.round((_local1065.length + 2) * _local1060 * .35),
		_local1066 = s.createElement("canvas"),
		_local1062 = _local1066.getContext("2d", { willReadFrequently: true });
	_local1066.width = _local1069 + _local1070;
	_local1066.height = _local1060;
	_local1062.fillStyle = "rgba(1,1,1,1)";
	_local1062.fillRect(0, 0, _local1069, _local1060);
	if (G != 0) _local1062.fillRect(_local1069 + 2, 0, _local1070, _local1060);
	_local1062.font = Math.round(11 * s.getDevicePixelRatio()) + "px monospace";
	_local1062.fillStyle = d;
	var _local1064 = l * 100;
	if (_local1064 < 100) _local1064 = _local1064.toFixed(2);
	else {
		_local1064 = Math.round(_local1064);
	}
	_local1064 = _local1064 + "%";
	var _local1061 = _local1062.measureText(_local1064).width;
	_local1062.fillText(_local1064, (_local1069 - _local1061) / 2, Math.round(_local1060 * .7));
	if (G != 0) {
		var _local1067 = _local1062.measureText(_local1065).width;
		_local1062.fillText(_local1065, _local1069 + (_local1070 - _local1067) / 2 + 1, Math.round(_local1060 * .7));
	}
	var _local1068 = _local1062.getImageData(0, 0, _local1069 + _local1070, _local1060);
	LayerCanvasPanel.a92 = _local1063;
	LayerCanvasPanel.akC = _local1068;
	return _local1068;
};
LayerCanvasPanel.prototype.agc = function () {
	var _local1076 = this._Y,
		_local1075 = _local1076.length,
		_local1071 = this.yL,
		_local1074 = this._Y[_local1071],
		_local1073 = (_local1071 + 1) % _local1075;
	this.LO();
	if (_local1075 != 1 && _local1076[_local1073].uA.XB(_local1074.uA)) {
		var _local1072 = _local1074.ia ? parseInt(_local1074.ia.split(",").pop()) : 30;
		if (_local1072 == 0) _local1072 = 16;
		if (_local1073 == 0) this.TK++;
		if (this.KV == 0 || this.TK < this.KV) this.axg = setTimeout(this.aqP, _local1072);
	}
	this.yL = _local1073;
};
LayerCanvasPanel.prototype.resize = function (l, d) {
	if (l <= 0 || d <= 0) return;
	var _local1077 = Math.floor(l * s.getDevicePixelRatio()),
		_local1078 = Math.floor(d * s.getDevicePixelRatio());
	this.u.Vm = new Rect(0, 0, _local1077, _local1078);
	this.T.width = _local1077;
	this.T.height = _local1078;
	this.T.setAttribute("style", "width:" + _local1077 / s.getDevicePixelRatio() + "px; height:" + _local1078 / s.getDevicePixelRatio() + "px; display:block;");
	this.LO();
};
LayerCanvasPanel.prototype.TE = function (l) {
	var _local1081 = -1,
		_local1080 = this.s$;
	for (var _local1079 = 0; _local1079 < _local1080.length; _local1079++)
	if (_local1080[_local1079].pointerId == l.pointerId) _local1081 = _local1079;
	return _local1081;
};
LayerCanvasPanel.prototype.JO = function (l) {
	var _local1083 = this.TE(l),
		_local1082 = this.s$;
	if (_local1083 != -1) _local1082[_local1083] = l;else
	_local1082.push(l);
	if (_local1082.length == 1) {
		this.Bf = l.target;
		s.addPointerMove(window, this.a8o);
		s.addPointerUp(window, this.a6Z);
		this.S3 = s.getEventPositionInElement(l, this.T);
		this.S3.x *= s.getDevicePixelRatio();
		this.S3.y *= s.getDevicePixelRatio();
		this.oS = this.S3;
		this.e6 = this.u.R.clone();
		if (this.Gq && this.Bf == this.T && !this.OG) this.dispatch(new Action("mousedown"));
	} else this.aaJ = this.Fs = Point2D.yZ(s.getEventPositionInElement(_local1082[0], this.T), s.getEventPositionInElement(_local1082[1], this.T));
};
LayerCanvasPanel.prototype.D2 = function (l) {
	var _local1091 = this.TE(l),
		_local1084 = this.s$;
	if (_local1091 != -1) _local1084[_local1091] = l;
	var _local1090 = this.u,
		_local1088 = this.OG,
		_local1095 = this._Y[this.yL].uA.clone();
	_local1095.m *= _local1090.N;
	_local1095.n *= _local1090.N;
	var _local1085 = s.getEventPositionInElement(l, this.T);
	_local1085.x *= s.getDevicePixelRatio();
	_local1085.y *= s.getDevicePixelRatio();
	this.oS = _local1085;
	if (this.Gq && this.Bf == this.T && !_local1088) this.dispatch(new Action("mousemove"));else
	if (_local1088 == "grab" || _local1088 == null) {
		if (_local1084.length > 1) {
			var _local1096 = s.getEventPositionInElement(_local1084[0], this.T),
				_local1092 = s.getEventPositionInElement(_local1084[1], this.T),
				_local1087 = new Point2D(s.getDevicePixelRatio() * (_local1096.x + _local1092.x) / 2, s.getDevicePixelRatio() * (_local1096.y + _local1092.y) / 2),
				_local1089 = Point2D.yZ(_local1096, _local1092),
				_local1086 = null;
			if (_local1089 > this.Fs + 50) {
				this.Fs += 50;
				_local1086 = !0;
			}
			if (_local1089 < this.Fs - 50) {
				this.Fs -= 50;
				_local1086 = !1;
			}
			if (_local1086 != null) this.h7(_local1087, _local1086);
			return;
		} else {
			var _local1093 = _local1085.x - this.S3.x,
				_local1094 = _local1085.y - this.S3.y;
			_local1090.R.x = this.e6.x + Math.round(_local1093);
			_local1090.R.y = this.e6.y + Math.round(_local1094);
		}
		this.dispatch(new Action("viewchange"));
	}
};
LayerCanvasPanel.prototype.qd = function (l) {
	var _local1100 = this.TE(l),
		_local1097 = this.s$;
	_local1097.splice(_local1100, 1);
	if (_local1097.length == 0) {
		s.removePointerMove(window, this.a8o);
		s.removePointerUp(window, this.a6Z);
		var _local1099 = this.OG;
		if (l.detail > 1) {
			this.u.N = 1;
			this.u.R.T6(0, 0);
			this.LO();
		}
		if (this.Gq && this.Bf == this.T && !this.OG) this.dispatch(new Action("mouseup"));else
		{
			if (_local1099 == "zoom-in" || _local1099 == "zoom-out") this.h7(this.oS, _local1099 == "zoom-in");
		}
	} else {
		var _local1098 = this.S3 = s.getEventPositionInElement(_local1097[0], this.T);
		_local1098.x *= s.getDevicePixelRatio();
		_local1098.y *= s.getDevicePixelRatio();
	}
};
LayerCanvasPanel.prototype.KE = function (l) {
	var _local1101 = this.oS;
	if (l) {
		_local1101 = s.getEventPositionInElement(l, this.T);
		_local1101.x *= s.getDevicePixelRatio();
		_local1101.y *= s.getDevicePixelRatio();
	}
	return this.u.Zx(_local1101.x, _local1101.y);
};

function TypeToolOptions(l, d) {
	ToolOptionsBase.call(this);
	if (window.Typr == null || l) return;
	this.aeC = d;
	this.Pw = null;
	this.axH = s.createElement("span", "");
	this.a68 = s.createElement("span", "");
	var _local4605 = 1;
	this.p7 = {
		BL: new GridSelector(null, 24),
		Nt: new RangeDropInput("X", 0, 0, "px", 0, !1, !0, 4),
		lw: new RangeDropInput("Y", 0, 0, "px", 0, !1, !0, 4),
		SU: new RangeDropInput("W", 0, 0, ["%", "px"], 2, !1, !0, 5),
		Ag: new ToolbarButton("<img src=\"" + PIMG["lrs/link"] + "\" class=\"autoscale gsicon\" />", null, [12, 51], null),
		it: new RangeDropInput("H", 0, 0, ["%", "px"], 2, !1, !0, 5),
		a6a: new RangeDropInput("\u2221", 0, 0, "\xB0", _local4605, !1, !0),
		aoF: new RangeDropInput("\u25B1 H", -85, 85, "\xB0", _local4605, !1, !0),
		avq: new RangeDropInput("\u25B1 V", -85, 85, "\xB0", _local4605, !1, !0),
		jR: new DropdownMenu(null, ["Nearest Neighbor", "Bilinear", "Bicubic Sharper"])
	};
	this.p7.jR.c(1);
	this.p7.Ag.c(!0);
	for (var _local4609 in this.p7) {
		var _local4608 = this.p7[_local4609];
		if (d && (_local4608 == this.p7.a6a || _local4608 == this.p7.aoF || _local4608 == this.p7.avq || _local4608 == this.p7.jR)) {} else this.axH.appendChild(_local4608.e);
		var _local4607 = _local4608 == this.p7.Ag ? "click" : ActionTypes.E.A;
		_local4608.addListener(_local4607, this.a8k, this);
	}
	this.Cb = new WarpDistortionPanel(!0, !0, !0);
	this.Cb.addListener(ActionTypes.E.A, this.aaQ, this);
	this.Cb.parent = this;
	var _local4606 = this.a68,
		_local4610 = this.Cb;
	_local4606.appendChild(_local4610.XZ.e);
	_local4606.appendChild(_local4610.NW.e);
	_local4606.appendChild(_local4610.gT.e);
	_local4606.appendChild(_local4610.eV.e);
	_local4606.appendChild(_local4610.la.e);
	this.eL = new ToolbarButton("Warp");
	this.eL.addListener("click", this.ahC, this);
	this.P_ = new ConfirmCancelButtons();
	this.P_.addListener("click", this.aL, this);
}
TypeToolOptions.prototype = new ToolOptionsBase();
TypeToolOptions.prototype.IF = function (l) {
	if (l.Zm) {
		var _local4616 = TypeToolOptions,
			_local4611 = this.mI;
		// if (_local4611 == null) _local4611 = this.mI = new ContextPanel(_local4616.azf(), _local4616.ala(this.G));
		// _local4611.refresh();
		// _local4611.parent = this;
		// _local4611.update(l.T1, l.wQ);
		var _local4615 = new Action(ActionTypes.E.L, !0);
		_local4615.data = {
			a: ActionTypes.$.dY,
			A3: _local4611,
			x: l.Zm.pf + 2,
			y: l.Zm.pi + 1
		};
		this.dispatch(_local4615);
		return;
	}
	s.clearChildren(this.body);
	this.Pw = l;
	if (l.p7) {
		var _local4614 = l.p7.vD,
			_local4613 = l.p7.lV.clone(),
			_local4617 = Math.atan2(-_local4613.k, _local4613.aS),
			_local4612 = new Matrix2D();
		_local4612.rotate(-_local4617);
		_local4613.concat(_local4612);
		var _local4618 = this.p7;
		_local4618.BL.c(l.p7.eD);
		_local4618.Nt.c(l.p7.Vl.x);
		_local4618.lw.c(l.p7.Vl.y);
		_local4618.SU.c(_local4613.aS * (_local4618.SU.lz() == "%" ? 100 : _local4614.m));
		_local4618.it.c(_local4613.Qd * (_local4618.it.lz() == "%" ? 100 : _local4614.n));
		_local4618.a6a.c(-_local4617 * 180 / Math.PI);
		_local4618.aoF.c(Math.atan(_local4613.S5 / _local4613.Qd) * 180 / Math.PI);
		_local4618.avq.c(0 * 180 / Math.PI);
		this.body.appendChild(this.axH);
		this.eL.kL();
		if (l.p7.Xy != null) _local4618.Ag.c(l.p7.Xy);
	}
	if (l.cB) {
		this.Cb.c(l.cB);
		this.body.appendChild(this.a68);
		this.eL.Nu();
	}
	this.body.appendChild(this.P_.e);
	if (l.aaq && !this.aeC) this.body.appendChild(this.eL.e);
};
TypeToolOptions.prototype.a8k = function (l) {
	var _local4628 = this.p7,
		_local4619 = this.Pw.p7.vD;
	if (l.target == _local4628.Ag) _local4628.Ag.c(!_local4628.Ag.b());else
	if (_local4628.Ag.dB()) {
		var _local4627 = _local4628.it,
			_local4626 = _local4628.SU,
			_local4623 = _local4619.n,
			_local4633 = _local4619.m;
		if (l.target == _local4628.SU) {
			_local4627 = _local4628.SU;
			_local4626 = _local4628.it;
			_local4623 = _local4619.m;
			_local4633 = _local4619.n;
		}
		var _local4620 = _local4627.b() / (_local4627.lz() == "%" ? 100 : _local4623);
		_local4620 *= _local4626.lz() == "%" ? 100 : _local4633;
		_local4626.c(_local4620);
	}
	var _local4634 = [];
	for (var _local4629 in _local4628)
	if (_local4628[_local4629] != _local4628.Ag && _local4628[_local4629] != _local4628.BL) {
		var _local4620 = _local4628[_local4629].b();
		if ((_local4628[_local4629] == _local4628.SU || _local4628[_local4629] == _local4628.it) && _local4620 == 0) {
			_local4620 = .1;
			_local4628[_local4629].c(_local4620);
		}
		if (_local4628[_local4629] == _local4628.SU && _local4628[_local4629].lz() == "px") _local4620 /= _local4619.m / 100;
		if (_local4628[_local4629] == _local4628.it && _local4628[_local4629].lz() == "px") _local4620 /= _local4619.n / 100;
		_local4634.push(_local4620);
	}
	var _local4622 = new Point2D(_local4634[0], _local4634[1]);
	if (l.target == _local4628.BL) {
		this.DR({
			DI: "ctyp",
			eD: _local4628.BL.b()
		});
	} else if (l.target == _local4628.Nt || l.target == _local4628.lw) {
		this.DR({
			DI: "cen",
			Vl: _local4622
		});
	} else {
		var _local4624 = this.Pw.p7.lV.clone(),
			_local4621 = _local4624.clone(),
			_local4631 = Math.atan2(-_local4624.k, _local4624.aS);
		_local4621.translate(-_local4622.x, -_local4622.y);
		_local4621.rotate(-_local4631);
		var _local4632 = new Matrix2D(_local4621.aS, _local4621.k, _local4621.S5, _local4621.Qd, 0, 0);
		_local4632.hI();
		_local4621.concat(_local4632);
		var _local4625 = _local4634[2] / 100,
			_local4630 = _local4634[3] / 100;
		_local4621.concat(new Matrix2D(_local4625, _local4625 * Math.tan(_local4634[6] * Math.PI / 180), _local4630 * Math.tan(_local4634[5] * Math.PI / 180), _local4630, 0, 0));
		_local4621.rotate(-_local4634[4] * Math.PI / 180);
		_local4621.translate(_local4622.x, _local4622.y);
		this.Pw.p7.lV = _local4621;
		this.DR({
			DI: "trn",
			p7: _local4621,
			Nq: this.p7.jR.b(),
			Xy: _local4628.Ag.b()
		});
	}
};
TypeToolOptions.prototype.aaQ = function (l) {
	this.DR({
		DI: "wrp",
		cB: this.Cb.b()
	});
};
TypeToolOptions.prototype.ahC = function (l) {
	this.DR({
		DI: "switchWarp"
	});
};
TypeToolOptions.prototype.aL = function (l) {
	this.DR({
		DI: this.P_.b() ? "commit" : "cancel"
	});
};
TypeToolOptions.prototype.DR = function (l) {
	l.a = ActionTypes.$.kl;
	l.G = this.G;
	var _local4635 = new Action(ActionTypes.E.L, !0);
	_local4635.data = l;
	this.dispatch(_local4635);
};
TypeToolOptions.prototype.lx = function () {
	var _local4637 = this.p7;
	for (var _local4636 in _local4637) _local4637[_local4636].refresh();
	s.setWidthHeightLabels(_local4637.SU, _local4637.it);
	this.P_.refresh();
	this.Cb.refresh();
	this.eL.refresh();
};
TypeToolOptions.azf = function () {
	var _local4638 = function (d) {
		var _local4640 = !0;
		if (d == null || d.g.length == 0) _local4640 = !1;else
		{
			var _local4641 = d.g;
			for (var _local4639 = 0; _local4639 < _local4641.length; _local4639++) {
				if (d.B[_local4641[_local4639]].add.TySh) _local4640 = !1;
			}
		}
		return {
			p: _local4640
		};
	};
	return [{
		name: [5, 9],
		C0: "Shift+Alt+Ctrl + T",
		xX: !0
	}, {
		name: [12, 38]
	}, {
		name: [2, 5]
	}, {
		name: [24, 4],
		p: _local4638
	}, {
		name: [2, 9],
		p: _local4638
	}, {
		name: [11, 9],
		p: function (d) {
			if (d == null || d.g.length != 1) return {
				p: !1
			};
			var _local4642 = d.B[d.g[0]];
			return {
				p: _local4642.add.TySh == null && !_local4642.IQ()
			};
		},
		xX: !0
	}, {
		name: ["VAR0 90\xB0 \u21BB", [2, 5]]
	}, {
		name: ["VAR0 90\xB0 \u21BA", [2, 5]]
	}, {
		name: ["VAR0 180\xB0", [2, 5]]
	}, {
		name: [
		[2, 6],
		[22, 4, 2]]

	}, {
		name: [
		[2, 6],
		[22, 4, 3]]

	}];
};
TypeToolOptions.ala = function (l) {
	if (l == null) l = f.qK;
	return [{
		Y: ActionTypes.E.v,
		G: l,
		W: {
			a: "again"
		}
	}, {
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.yb,
			G: l,
			Ye: {
				fz: 3
			}
		}
	}, {
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.yb,
			G: l,
			Ye: {
				fz: 4
			}
		}
	}, {
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.yb,
			G: l,
			Ye: {
				fz: 2
			}
		}
	}, {
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.yb,
			G: l,
			Ye: {
				fz: 1
			}
		}
	}, {
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.yb,
			G: l,
			Ye: {
				fz: -1
			}
		}
	}, {
		Y: ActionTypes.E.g5,
		W: f.NH.Lg(!0, 90, !0)
	}, {
		Y: ActionTypes.E.g5,
		W: f.NH.Lg(!0, -90, !0)
	}, {
		Y: ActionTypes.E.g5,
		W: f.NH.Lg(!0, -180, !0)
	}, {
		Y: ActionTypes.E.g5,
		W: f.NH.Lg(!1, "Hrzn", !0)
	}, {
		Y: ActionTypes.E.g5,
		W: f.NH.Lg(!1, "Vrtc", !0)
	}];
};





