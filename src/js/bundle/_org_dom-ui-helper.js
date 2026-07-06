
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


function ContextPanel(l, d, G) {
	UIComponent.call(this);
	this.G$ = null;
	this.as0 = this.qd.bind(this);
	this.ab7 = this.oj.bind(this);
	this.akL = this.afp.bind(this);
	this.a4H = this.a1I.bind(this);
	this.Ru = [];
	this.lT = [];
	this.DA = [];
	this.abO = [];
	this.e = s.createElement("div", "contextpanel " + (G ? "cp_dark" : "cp_trsp"));
	this.e.addEventListener("contextmenu", s.preventDefaultHandler, !1);
	this.wb = null;
	this.cA = 0;
	this.iV = l;
	this.E0 = d;
	this.Kf = [];
	for (var _local36 = 0; _local36 < l.length; _local36++) {
		var _local40 = s.createElement("div", "enab");
		this.lT.push(_local40);
		this.e.appendChild(_local40);
		var _local39 = l[_local36].e2;
		if (_local39) {
			if (_local39.startsWith("#")) {
				var _local38 = s.createElement("span");
				_local38.setAttribute("style", "display:inline-block; width:16px; height:16px; vertical-align:middle; margin:0 5px 0 -3px; border-radius:4px; background-color:" + _local39);
				_local40.appendChild(_local38);
			} else _local40.innerHTML = s.getIconImgHtml(l[_local36].e2, null, "thumb");
		} else {
			var _local42 = s.createElement("span", "check");
			this.abO.push(_local42);
			_local40.appendChild(_local42);
		}
		var _local37 = s.createElement("span", "label");
		_local37.textContent = languageManager.get(l[_local36].name);
		_local40.appendChild(_local37);
		this.DA.push(_local37);
		if (l[_local36].xX) this.e.appendChild(s.createElement("hr"));
		if (l[_local36].C0 || l[_local36].sub) {
			var _local43 = _local40.CM = s.createElement("span", "right");
			_local40.appendChild(_local43);
			if (l[_local36].C0) _local43.textContent = KeyboardHandler.nc(l[_local36].C0);else
			if (l[_local36].sub) _local43.innerHTML = "<svg height='10px' width='6px'  fill='none' stroke-width='1.35' stroke='currentColor'><path d='M 1 1 L 5 5 L 1 9'/></svg>";
		}
		_local40.addEventListener("click", this.as0, !1);
		_local40.addEventListener("mouseover", this.ab7, !0);
		_local40.addEventListener("mouseout", this.akL, !0);
		if (l[_local36].sub) {
			var _local41 = new ContextPanel(l[_local36].sub, d ? d[_local36].sub : null);
			_local41.parent = this;
			this.Kf.push(_local41);
			_local41.addListener("select", this.ayV, this);
		} else this.Kf.push(null);
	}
}

ContextPanel.prototype = new UIComponent();

ContextPanel.prototype.avV = function (l) {
	s.clearChildren(this.e);
	for (var _local44 = 0; _local44 < l.length; _local44++)
	if (l[_local44] != 0 && l[_local44] != null) {
		this.e.appendChild(this.lT[_local44]);
		if (l[_local44] != 1 && this.Kf[_local44]) this.Kf[_local44].avV(l[_local44]);
	}
};

ContextPanel.prototype.refresh = function () {
	var _local46 = this.iV;
	for (var _local45 = 0; _local45 < _local46.length; _local45++) {
		if (_local46[_local45].title) this.lT[_local45].title = languageManager.get(_local46[_local45].title);
		this.DA[_local45].textContent = languageManager.get(_local46[_local45].name) + (_local46[_local45].pR ? "..." : "");
	}
	for (var _local45 = 0; _local45 < this.Kf.length; _local45++)
	if (this.Kf[_local45]) this.Kf[_local45].refresh();
};

ContextPanel.prototype.update = function (l, d) {
	var _local48 = this.iV,
		_local51 = PP.window.innerWidth < 450 ? "none" : "inline";
	for (var _local47 = 0; _local47 < _local48.length; _local47++) {
		var _local50 = this.lT[_local47];
		if (_local50.CM && !this.Kf[_local47]) _local50.CM.style.display = _local51;
		if (_local48[_local47].p) {
			var _local49 = _local48[_local47].p(l, d, _local47);
			if (_local49.p != null) this.lT[_local47].className = _local49.p ? "enab" : "disab";
			if (_local49.iH != null) this.DA[_local47].textContent = _local49.iH;
			if (_local49.Zj != null) this.abO[_local47].innerHTML = _local49.Zj ? "<svg height='10px' width='10px'  fill='none' stroke-width='1.35' stroke='currentColor'><path d='M 1 5 L 4 8 L 9 2'/></svg>" : "";
			if (_local49.W != null) this.E0[_local47] = _local49.W;
		}
	}
	for (var _local47 = 0; _local47 < this.Kf.length; _local47++)
	if (this.Kf[_local47]) this.Kf[_local47].update(l, d);
};

ContextPanel.prototype.sz = function () {
	return this.Ru;
};

ContextPanel.prototype.qd = function (l) {
	if (l.button != 0) return;
	var _local52 = this.lT.indexOf(l.currentTarget);
	if (this.Kf[_local52]) {
		this.cA = _local52;
		this.a1I();
	} else {
		if (this.E0) {
			var _local54 = this.E0[_local52],
				_local53 = new Action(_local54.Y, !0);
			_local53.G = _local54.G;
			_local53.data = _local54.W;
			this.dispatch(_local53);
		}
		this.G$ = null;
		this.Ru = [_local52];
		this.dispatch(new Action("select", !1));
		var _local53 = new Action(ActionTypes.E.L, !0);
		_local53.data = {
			a: ActionTypes.$.xt
		};
		this.dispatch(_local53);
	}
};

ContextPanel.prototype.oj = function (l) {
	var _local55 = this.lT.indexOf(l.currentTarget);
	this.N2();
	this.cA = _local55;
	this.wb = setTimeout(this.a4H, 300);
};

ContextPanel.prototype.afp = function (l) {
	this.N2();
};

ContextPanel.prototype.N2 = function () {
	if (this.wb) {
		clearTimeout(this.wb);
		this.wb = null;
	}
};

ContextPanel.prototype.a1I = function () {
	this.N2();
	var _local56 = this.cA;
	if (this.G$) this.G$.a9d();
	if (this.Kf[_local56] == null) return;
	this.G$ = this.Kf[_local56];
	var _local58 = this.lT[_local56].getBoundingClientRect(),
		_local57 = new Action(ActionTypes.E.L, !0);
	_local57.data = {
		a: ActionTypes.$.dY,
		A3: this.Kf[_local56],
		x: _local58.left + _local58.width + 2,
		y: _local58.top
	};
	this.dispatch(_local57);
};

ContextPanel.prototype.a9d = function () {
	for (var _local59 = 0; _local59 < this.Kf.length; _local59++)
	if (this.Kf[_local59]) this.Kf[_local59].a9d();
	var _local60 = new Action(ActionTypes.E.L, !0);
	_local60.data = {
		a: ActionTypes.$.qH,
		A3: this
	};
	this.dispatch(_local60);
};

ContextPanel.prototype.ayV = function (l) {
	var _local61 = this.Kf.indexOf(l.target);
	this.Ru = [_local61].concat(l.target.sz());
	this.dispatch(new Action("select", !1));
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


function ToolbarColumn(l, d) {
	SidebarColumnBase.call(this, "toolbar");
	this.e.removeChild(this.p1);
	this.eN = s.createElement("div", "tools");
	this.e.appendChild(this.eN);
	this.df = null;
	this.QN = null;
	this.ao3 = d;
	this.ax = null;
	this.aiU = -1;
	this.ay2 = {};
	this.asE = l;
	this.d = null;
	this.k3 = null;
	this.Pd = null;
	this.FW = null;
	this.PK = new ForeBackColorSwatch;
	this.PK.e.style.marginTop = "5px";
	this.PK.e.style.marginBottom = "3px";
	this.PK.parent = this;
	this.kg = new ToolbarButton(s.getIconImgHtml("lrs/mask"), !1, [6, 6, 1]);
	this.kg.addListener("click", function(Q) {
		var t = new Action(ActionTypes.E.v, !0);
		t.G = f.Da;
		t.data = {
			a: "qmask"
		};
		this.dispatch(t)
	}, this);
	var G = new MultiOptionBox(null, ["Ctrl", "Alt", "Shift", "No Touch"], !0, null, null, !0);
	G.addListener(ActionTypes.E.A, this.a5E, this);
	var b = s.createElement("span", "rangecontFloat form padded");
	b.appendChild(G.e);
	b.setAttribute("style", "position:absolute; width:119px; z-index:2;  padding-right:0px; ");
	var V = this.e;
	this.acK = [!1, !1, !1, !1];
	this.hs = new ToolbarButton(s.getIconImgHtml("kb"), !1, "Virtual Keys");
	this.hs.addListener("click", function(Q) {
		var t = this.hs.e.getBoundingClientRect();
		b.style.top = t.top - 110 + "px";
		b.style.left = t.left + t.width + 8 + "px";
		if (s.isInDocument(b)) {
			s.hideWithTransition({
				e: b
			}, V)
		} else {
			V.appendChild(b);
			s.showWithTransition({
				e: b
			})
		}
	}, this)
}
ToolbarColumn.prototype = new SidebarColumnBase;
ToolbarColumn.prototype.a5E = function(l) {
	var d = l.target.b();
	this.hs.c(d[0] || d[1] || d[2] || d[3]);
	var G = new Action(ActionTypes.E.L, !0);
	for (var A = 0; A < 4; A++) {
		if (d[A] != this.acK[A]) {
			G.data = {
				a: ActionTypes.$.agL,
				oW: d[A],
				an9: ["ControlLeft", "AltLeft", "ShiftLeft", "NoTouch"][A]
			};
			this.dispatch(G)
		}
	}
	this.acK = d.slice(0)
};
ToolbarColumn.prototype.aam = function(l, d) {
	this.ax = d;
	if (l == null || l.g.length == 0 || l.B[l.g[0]] == null) return;
	var G = l.kg() != null,
		b = l.u.MX,
		V = l.B[l.g[0]].ht,
		Q = V == 1 || V == 3 || G || b[0] + b[1] + b[2] == 1;
	this.PK.atT(Q);
	this.kg.c(G)
};
ToolbarColumn.prototype.akt = function(l, d) {
	var G = l.length,
		b = [];
	for (var A = 0; A < G; A++) b[A] = l[A].slice(0);
	l = b;
	var V = [1, 2, 4, 5, 7, 8, 7, 9, 11, 12, 14, 15, 14, 16, 10, 11, 1, 3, 17, 18, 7, 6, 13, 14],
		Q = Math.min(V.length / 2, G - d);
	for (var A = 0; A < Q; A++) {
		var t = V[2 * A],
			I = V[2 * A + 1];
		l[t] = l[t].concat(l[I]);
		l[I] = null
	}
	for (var A = 0; A < l.length; A++)
		if (l[A] == null) {
			l.splice(A, 1);
			A--
		}
	return l
};
ToolbarColumn.prototype.adz = function(l, d) {
	for (var A = 0; A < d.length; A++)
		for (var G = 0; G < d[A].length; G++)
			if (d[A][G].G.id == l) return A
};
ToolbarColumn.prototype.agr = function(l) {
	var d = this.asE;
	this.k3 = [];
	this.Pd = [];
	this.FW = [];
	this.d = [];
	var G = d.vu;
	if (l != null && this.ao3) G = this.akt(G, l);
	var b = this.df;
	if (b) {
		var V = [];
		for (var A = 0; A < G.length; A++) {
			var Q = [];
			for (var t = 0; t < G[A].length; t++) {
				var I = G[A][t];
				if (b == null || b.indexOf(parseInt(I.G.id)) != -1) Q.push(I)
			}
			if (Q.length > 0) V.push(Q)
		}
		G = V
	}
	for (var A = 0; A < G.length; A++) {
		var y = [],
			e = this.k3.length,
			M = null,
			R = -1;
		for (var t = 0; t < G[A].length; t++) {
			var I = G[A][t].G,
				J = this.adz(I.id, d.vu),
				n = d.keys[J];
			if (n == KeyboardHandler.Zi && t == 1) n = KeyboardHandler.xA;
			this.d.push(I);
			var r = new ToolButton(I.name, n, I.mq, this.k3.length, A, G[A].length > 1);
			this.k3.push(r);
			var T = this.ay2[I.id];
			if (T == null) T = 0;
			if (T > R) {
				R = T;
				M = r
			}
			r.addListener(ActionTypes.E.A, this.oi, this);
			r.addListener("mover", this.oj, this);
			y.push({
				name: I.name,
				e2: I.mq,
				C0: n ? n.hy : ""
			})
		}
		this.Pd.push(M);
		this.FW.push(y.length == 1 ? null : [y, e])
	}
};
ToolbarColumn.prototype.resize = function(l, d) {
	var G = this.Tq = d,
		b = 32;
	if (1 < s.getDevicePixelRatio() && s.getDevicePixelRatio() < 1.5) b = 18 + 14 * (1 / s.getDevicePixelRatio());
	var V = 39 + 23,
		Q = Math.floor((G - V) / b);
	if (Q != this.aiU) {
		this.aiU = Q;
		this.agr(Q);
		this.fr()
	}
	var t = this.Pd.length * b + V,
		I = Math.min(1, G / t);
	if (.75 <= I) {
		this.eN.setAttribute("style", "width:34px; transform-origin: top left; transform: scale(" + I + "," + I + ");");
		this.e.setAttribute("style", "height:" + (d - 2) + "px;")
	} else {
		G -= 4;
		this.eN.setAttribute("style", "height: " + G + "px;  width:" + Math.ceil(t / G) * 34 + "px");
		this.e.setAttribute("style", "")
	}
};
ToolbarColumn.prototype.refresh = function() {
	if (this.d == null) return;
	for (var A = 0; A < this.k3.length; A++) this.k3[A].refresh()
};
ToolbarColumn.prototype.oi = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	d.data = {
		a: ActionTypes.$.yb,
		G: this.d[l.id].id
	};
	this.dispatch(d)
};
ToolbarColumn.prototype.aju = function(l) {
	var d = l.target.a48 + l.target.sz()[0];
	this.k3[d].qd(null, !0)
};
ToolbarColumn.prototype.oj = function(l) {
	var d = this.ax,
		G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.xt
	};
	this.dispatch(G);
	var b = l.target,
		V = this.FW[b.vv];
	if (V == null) return;
	var Q = new ContextPanel(V[0], null, !0);
	Q.a48 = V[1];
	Q.vv = b.vv;
	Q.addListener("select", this.aju, this);
	Q.parent = this;
	Q.refresh();
	var t = b.e.getBoundingClientRect(),
		G = new Action(ActionTypes.E.L, !0);
	G.data = {
		a: ActionTypes.$.dY,
		A3: Q,
		x: t.left + t.width + 8,
		y: t.top
	};
	if (d == null || !(d.l(KeyboardHandler.Mm) || d.l(KeyboardHandler.wz))) this.dispatch(G)
};
ToolbarColumn.prototype.fr = function(l) {
	if (l == null) l = this.QN;
	this.QN = l;
	if (this.d == null) return;
	this.ay2[l] = Date.now();
	var d = -1;
	for (var A = 0; A < this.d.length; A++)
		if (this.d[A].id == l) d = A;
	for (var A = 0; A < this.k3.length; A++) {
		var G = this.k3[A];
		G.a72(d == A)
	}
	if (d == -1) return;
	this.Pd[this.k3[d].vv] = this.k3[d];
	s.clearChildren(this.eN);
	var b = this.Pd;
	for (var A = 0; A < b.length; A++) {
		this.eN.appendChild(b[A].e)
	}
	if (!this.ao3) return;
	this.eN.appendChild(this.PK.e);
	if (this.Tq > 640) this.eN.appendChild(this.kg.e);
	this.eN.appendChild(this.hs.e)
};
ToolbarColumn.prototype.BM = function(l, d) {
	if (d == PsdResourceTypes.Wx && l.df) {
		this.df = l.df;
		this.agr();
		this.fr()
	}
	this.PK.ah9(l.Y7, l.GF)
};


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
		_local3362 = this.Rk = new ContextPanel([{
			name: "Close"
		}]);
		this.Rk.addListener("select", this.gV, this);
	}
	_local3362.update(null);
	_local3362.refresh();
	_local3362.parent = this;
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
	this.uc = new ContextPanel([{
		name: [6, 20]
	}, {
		name: [5, 2],
		C0: [KeyboardHandler.wz, KeyboardHandler.AR],
		p: function () {
			return {
				p: Storage.af != null
			};
		}
	}]);
	this.uc.parent = this;
	this.uc.addListener("select", this.arF, this);
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
			_local1377 = new ContextPanel(_local1384);
			_local1377.parent = this;
			_local1377.addListener("select", this.arF, this);
		}
		_local1377.parent = this;
		_local1377.refresh();
		_local1377.update();
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
	this.PK = new ContextPanel([{
		name: "Merge Channels",
		pR: !0
	}], [{
		Y: ActionTypes.E.L,
		W: {
			a: ActionTypes.$.SN,
			GU: "mergechannels"
		}
	}]);
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
ChannelsPanel.prototype.AK = function () {
	var _local3556 = this._B,
		_local3553 = this.jo,
		_local3557 = 4;
	s.clearChildren(_local3553);
	if (_local3556 == null || !s.isInDocument(_local3553)) return;
	var _local3544 = _local3556.m,
		_local3552 = _local3556.n,
		_local3551 = new Rect(0, 0, _local3544, _local3552),
		_local3548 = this.Pj = _local3556.u.MX.slice(0),
		_local3559 = _local3548[0] + _local3548[1] + _local3548[2],
		_local3545 = Math.round(34 * s.getDevicePixelRatio()),
		_local3560 = _local3545;
	if (_local3544 > _local3552) _local3560 = Math.round(_local3560 * _local3552 / _local3544);else
	_local3545 = Math.round(_local3545 * _local3544 / _local3552);
	var _local3554 = ["RGB"].concat(LayerEffectsHelper.rgbChannels);
	for (var _local3543 = 0; _local3543 < 4; _local3543++) {
		var _local3547 = this.fw(_local3543);
		PixelUtil.e2.ho(_local3547, _local3545, _local3560, _local3551, _local3556.LT(), _local3551, !1, _local3543 == 0 ? null : _local3543 - 1);
		var _local3549 = _local3543 == 0 ? _local3559 == 3 : _local3548[_local3543 - 1] == 1,
			_local3546 = new ChannelLayerRow(-1 - _local3543, !0, !0, _local3547, _local3554[_local3543], _local3549, _local3549);
		_local3546.parent = this;
		_local3553.appendChild(_local3546.e);
		s.setCanvasCssSizeForDpr(_local3547.canvas);
	}
	for (var _local3543 = 0; _local3543 < _local3556.g.length; _local3543++) {
		var _local3558 = _local3556.B[_local3556.g[_local3543]],
			_local3550 = _local3558.ht;
		if (_local3550 != 1 && _local3550 != 3) continue;
		var _local3555 = _local3550 == 1 ? _local3558.c3() : _local3558.vZ(_local3556).z,
			_local3547 = this.fw(_local3557 + _local3543);
		_local3557++;
		PixelUtil.e2.L6(_local3547, _local3545, _local3560, _local3551, _local3555);
		var _local3546 = new ChannelLayerRow(_local3556.g[_local3543], !0, !0, _local3547, _local3558.getName() + (_local3550 == 1 ? "" : " Filter") + " Mask", !0, _local3555.jv);
		_local3546.parent = this;
		_local3553.appendChild(_local3546.e);
		s.setCanvasCssSizeForDpr(_local3547.canvas);
	}
	for (var _local3543 = 0; _local3543 < _local3556.vj.length; _local3543++) {
		var _local3555 = _local3556.vj[_local3543],
			_local3547 = this.fw(_local3557 + _local3543);
		PixelUtil.e2.L6(_local3547, _local3545, _local3560, _local3551, _local3555);
		var _local3546 = new ChannelLayerRow(-5 - _local3543, !0, _local3555.name == "Quick Mask", _local3547, _local3555.name, _local3556.FB.indexOf(_local3543) != -1, _local3555.jv, f.yS, {
			a: LayerRecord.B1,
			y3: "rnm",
			sy: _local3543
		});
		_local3546.parent = this;
		_local3553.appendChild(_local3546.e);
		s.setCanvasCssSizeForDpr(_local3547.canvas);
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
	this.PK = new ContextPanel([{
		name: "Clear History"
	}], [{
		Y: ActionTypes.E.v,
		G: f.lv,
		W: {
			a: "h_clear"
		}
	}]);
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

// Histogram panel: RGB channel histograms for the composite image (or current selection).
function HistogramPanel() {
	PanelTabBase.call(this, "Historgram", !1, "---panels/histogram", PanelTabBase.xA.a7r);
	var paddedEl = s.createElement("div", "padded");
	this.DK.appendChild(paddedEl);
	this.y9 = new LevelsHistogram(256, !0); // 256 bins; show Mean/Pixels stats
	paddedEl.appendChild(this.y9.e);
	this.KP = null; // current document (set by Yw)
}
HistogramPanel.prototype = new PanelTabBase("");
HistogramPanel.prototype.Yw = function (doc) {
	this.KP = doc;
	this.VP();
};
// Rebuild histogram from composite pixels (masked to selection when doc.P is set).
HistogramPanel.prototype.VP = function () {
	var doc = this.KP;
	if (!s.isInDocument(this.DK)) return;
	if (doc == null || doc.g.length == 0) {
		this.y9.c(PixelUtil.histogramFromRgba(PixelUtil.allocBytes(4)));
		return;
	}
	var rgba = doc.LT(),
		fullBounds = new Rect(0, 0, doc.m, doc.n),
		pixelCount = fullBounds.O();
	if (doc.P) {
		var selRect = doc.P.rect,
			selRgba = PixelUtil.allocBytes(selRect.O() * 4);
		PixelUtil.blitRgbaRect(rgba, fullBounds, selRgba, selRect);
		PixelUtil.multiplyAlphaIntoRgba(doc.P.channel, selRgba);
		rgba = selRgba;
		fullBounds = selRect;
		var selMask = doc.P.channel;
		pixelCount = 0;
		for (var i = 0; i < selMask.length; i++) pixelCount += selMask[i];
		pixelCount = Math.round(pixelCount / 255);
	}
	// histogramFromRgba returns [luma, R, G, B, totalSamples, weightedPixelSum]
	var histogram = PixelUtil.histogramFromRgba(rgba);
	// Correct the 255 bin when masked pixel count differs from histogram's internal sum
	histogram[0][255] += 3 * (pixelCount - histogram[5]);
	for (var ch = 1; ch < 4; ch++) histogram[ch][255] += pixelCount - histogram[5];
	this.y9.c(histogram, pixelCount);
};
HistogramPanel.prototype.BM = function (prefs, theme) {
	this.y9.EB(ThemeManager.themes[prefs.j$]["--text-color"]);
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

// Histogram chart widget: channel dropdown, canvas plot, optional Mean/Pixels readout.
// binCount = number of levels (typically 256); showStats = add Mean/Pixels labels below.
function LevelsHistogram(binCount, showStats) {
	UIComponent.call(this);
	this.e = s.createElement("span", "");
	// Channel view: 0=RGB, 1=R, 2=G, 3=B, 4=all channels overlaid
	this.HA = new DropdownMenu([12, 4], ["RGB", [13, 1, 1],
		[13, 1, 4],
		[13, 1, 5],
		[12, 82]]
	);
	this.HA.addListener(ActionTypes.E.A, this.VP, this);
	this.e.appendChild(this.HA.e);
	s.appendBr(this.e);
	var canvasWrap = s.createElement("div");
	this.e.appendChild(canvasWrap);
	canvasWrap.setAttribute("style", "background-color: var(--bg-canvas); margin:6px 0;");
	this.T = s.createElement("canvas");
	var canvas = this.T;
	canvasWrap.appendChild(canvas);
	canvas.width = Math.round(binCount * s.getDevicePixelRatio());
	canvas.height = Math.round(100 * s.getDevicePixelRatio());
	s.setElementSizePx(canvas, canvas.width, canvas.height);
	canvas.style.display = "block";
	this.k_ = canvas.getContext("2d", { willReadFrequently: true });
	this.y9 = null;   // histogram data from PixelUtil.histogramFromRgba
	this.JU = 0;      // fill color (theme text color as int)
	this.a3g = null;  // pixel count for stats
	this.ayZ = [];    // stat title labels ("Mean:", "Pixels:")
	this.xz = [];     // stat value labels
	var statTitles = ["Mean:", "Pixels:"],
		rootEl = this.e;
	if (showStats)
	for (var i = 0; i < statTitles.length; i++) {
		var titleLabel = new LabelItem(statTitles[i]);
		this.ayZ.push(titleLabel);
		rootEl.appendChild(titleLabel.e);
		var valueLabel = new LabelItem("hi");
		this.xz.push(valueLabel);
		rootEl.appendChild(valueLabel.e);
		s.appendBr(rootEl);
	}
}
LevelsHistogram.prototype = new UIComponent();
LevelsHistogram.prototype.refresh = function () {
	this.HA.refresh();
};
LevelsHistogram.prototype.dk = function (channelIndex) {
	this.HA.c(channelIndex);
	this.VP();
};
// Set histogram data and redraw. histogram = [luma, R, G, B, sampleCount, weightedSum].
LevelsHistogram.prototype.c = function (histogram, pixelCount) {
	this.y9 = histogram;
	this.a3g = pixelCount;
	this.VP();
};
LevelsHistogram.prototype.EB = function (fillColor) {
	if (fillColor == this.JU) return;
	this.JU = fillColor;
	this.VP();
};
LevelsHistogram.prototype.VP = function () {
	if (this.y9 == null) return;
	var canvas = this.T,
		ctx = this.k_,
		histogram = this.y9,
		pixelCount = this.a3g,
		channelView = this.HA.b(),
		// Scale bars so tallest peak uses ~60px of the 100px plot height
		yScale = 6e3 / histogram[4],
		fillHex = "#" + PixelUtil.intToHex6(this.JU),
		drawFill = LevelsHistogram.drawHistogramFill;
	canvas.width = canvas.width; // clear previous frame
	ctx.setTransform(canvas.width / 256, 0, 0, -canvas.height / 100, 0, canvas.height);
	ctx.globalCompositeOperation = "lighter";
	if (channelView == 0) drawFill(ctx, histogram[0], yScale / 3, fillHex);
	else {
		if (channelView < 4) drawFill(ctx, histogram[channelView], yScale, fillHex);
		else {
			drawFill(ctx, histogram[1], yScale, "#ff0000");
			drawFill(ctx, histogram[2], yScale, "#00ff00");
			drawFill(ctx, histogram[3], yScale, "#0000ff");
		}
	}
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	if (pixelCount != null) {
		if (channelView == 4) channelView = 0;
		var levelSum = 0;
		for (var level = 0; level < 256; level++) levelSum += level * histogram[channelView][level];
		if (channelView == 0) levelSum /= 3; // luma hist sums R+G+B
		this.xz[0].c((levelSum / pixelCount).toFixed(1) + "");
		this.xz[1].c(pixelCount + "");
	}
};
// Filled area chart for one channel's 256-bin histogram.
LevelsHistogram.drawHistogramFill = function (ctx, bins, yScale, fillColor) {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	for (var level = 0; level < 256; level++) ctx.lineTo(level, bins[level] * yScale);
	ctx.lineTo(256, 0);
	ctx.closePath();
	ctx.fillStyle = fillColor;
	ctx.fill();
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




var ThemeManager = {};
ThemeManager.applyTheme = function(A) {
	var l = ThemeManager.themes[A],
		d = document.documentElement.style,
		b = 1;
	// hbi
	// d.setProperty("--base", "#" + PixelUtil.intToHex6(l["--base"]));
	// d.setProperty("--bg-panel", "#" + PixelUtil.intToHex6(l["--bg-panel"]));
	// d.setProperty("--bg-canvas", "#" + PixelUtil.intToHex6(l["--bg-canvas"]));
	// d.setProperty("--bg-input", "#" + PixelUtil.intToHex6(l["--bg-input"]));
	// d.setProperty("--bg-bbtn", "#" + PixelUtil.intToHex6(l["--bg-bbtn"]));
	// d.setProperty("--bg-bbtnOver", "#" + PixelUtil.intToHex6(l["--bg-bbtnOver"]));
	// d.setProperty("--brdr", "#" + PixelUtil.intToHex6(l["--brdr"]));
	// d.setProperty("--text-color", "#" + PixelUtil.intToHex6(l["--text-color"]));
	// d.setProperty("--brdrLgt", "rgba(255,255,255," + l["--brdrLgt"] + ")");
	// d.setProperty("--brdrDrk", "rgba(  0,  0,  0," + l["--brdrDrk"] + ")");
	// d.setProperty("--alphaDark", "" + l["--alphaDark"]);
	// d.setProperty("--gs-invert", "" + l["--gs-invert"]);
	// d.setProperty("--accent", "#" + PixelUtil.intToHex6(l["--accent"]));
	// var G = l["--sh-clr"];
	// d.setProperty("--sh-clr", "rgba(" + (G >> 16) + "," + (G >> 8 & 255) + "," + (G & 255) + ", 0.45)");
	// d.setProperty("--absc", "" + l["--absc"]);
	// d.setProperty("--abs255", "" + l["--abs255"]);
	// if (1 < s.getDevicePixelRatio() && s.getDevicePixelRatio() < 1.5) b = 1 / s.getDevicePixelRatio();
	// d.setProperty("--img20", 20 * b + "px");
	// d.setProperty("--img18", 18 * b + "px");
	// d.setProperty("--img15", 15 * b + "px");
	// if (PIMG != null) {
	// 	var V = "lrs/eye lrs/square lrs/arrow_down lrs/arrow_right lrs/chain lrs/link lrs/linkX lrs/clipping lrs/lock lrs/fx lrs/folder cross tools/cshape checkmark".split(" ");
	// 	for (var A = 0; A < V.length; A++) {
	// 		var Q = V[A],
	// 			t = Q.split("/").pop(),
	// 			I = PIMG["__" + Q] == null ? l["--gs-invert"] : "0";
	// 		d.setProperty("--icon_" + t, "url(" + PIMG[Q] + ")");
	// 		d.setProperty("--icon_" + t + "_invrt", I)
	// 	}
	// }
	// var y = document.querySelector("meta[name=theme-color]");
	// if (y) y.setAttribute("content", "#" + PixelUtil.intToHex6(l["--base"]))
};
(function() {
	var l = 3441398,
		d = 3441398;
	ThemeManager.themes = [{
		name: "Light Grey",
		"--base": 14737632,
		"--bg-panel": 11579568,
		"--bg-canvas": 11579568,
		"--bg-input": 16777215,
		"--bg-bbtn": 15921906,
		"--bg-bbtnOver": 16777215,
		"--brdrLgt": .5,
		"--brdrDrk": .4,
		"--alphaDark": .12,
		"--text-color": 3749943,
		"--gs-invert": .22,
		"--brdr": 11579568,
		"--sh-clr": 16777215,
		"--absc": 1,
		"--abs255": 255,
		"--accent": d
	}, {
		name: "Dark Grey",
		"--base": 4671303,
		"--bg-panel": 2434341,
		"--bg-canvas": 2434341,
		"--bg-input": 2434341,
		"--bg-bbtn": 6118749,
		"--bg-bbtnOver": 6974058,
		"--brdrLgt": .15,
		"--brdrDrk": .6,
		"--alphaDark": .25,
		"--text-color": 14013909,
		"--gs-invert": .78,
		"--brdr": 2434341,
		"--sh-clr": 0,
		"--absc": 0,
		"--abs255": 0,
		"--accent": l
	}, {
		name: "Blue",
		"--base": 4212048,
		"--bg-panel": 2435637,
		"--bg-canvas": 2434341,
		"--bg-input": 2435637,
		"--bg-bbtn": 6316138,
		"--bg-bbtnOver": 6974074,
		"--brdrLgt": .15,
		"--brdrDrk": .6,
		"--alphaDark": .25,
		"--text-color": 15790330,
		"--gs-invert": .88,
		"--brdr": 2435637,
		"--sh-clr": 0,
		"--absc": 0,
		"--abs255": 0,
		"--accent": l
	}, {
		name: "Dark Blue",
		"--base": 2237745,
		"--bg-panel": 1513761,
		"--bg-canvas": 1513761,
		"--bg-input": 1513761,
		"--bg-bbtn": 3554128,
		"--bg-bbtnOver": 3158085,
		"--brdrLgt": .15,
		"--brdrDrk": .6,
		"--alphaDark": .25,
		"--text-color": 12303291,
		"--gs-invert": .8,
		"--brdr": 1513761,
		"--sh-clr": 0,
		"--absc": 0,
		"--abs255": 0,
		"--accent": l
	}, {
		name: "Purple",
		"--base": 4931153,
		"--bg-panel": 3287605,
		"--bg-canvas": 2434341,
		"--bg-input": 3287605,
		"--bg-bbtn": 6840430,
		"--bg-bbtnOver": 7694970,
		"--brdrLgt": .15,
		"--brdrDrk": .6,
		"--alphaDark": .25,
		"--text-color": 15790330,
		"--gs-invert": .88,
		"--brdr": 3287605,
		"--sh-clr": 0,
		"--absc": 0,
		"--abs255": 0,
		"--accent": l
	}, {
		name: "Black",
		"--base": 3487029,
		"--bg-panel": 1710618,
		"--bg-canvas": 1710618,
		"--bg-input": 1710618,
		"--bg-bbtn": 5263440,
		"--bg-bbtnOver": 5921370,
		"--brdrLgt": .15,
		"--brdrDrk": .6,
		"--alphaDark": .25,
		"--text-color": 13421772,
		"--gs-invert": .7,
		"--brdr": 1710618,
		"--sh-clr": 0,
		"--absc": 0,
		"--abs255": 0,
		"--accent": l
	}, {
		name: "White",
		"--base": 16250871,
		"--bg-panel": 14737632,
		"--bg-canvas": 14737632,
		"--bg-input": 16777215,
		"--bg-bbtn": 14737632,
		"--bg-bbtnOver": 14079702,
		"--brdrLgt": .2,
		"--brdrDrk": .2,
		"--alphaDark": .065,
		"--text-color": 3355443,
		"--gs-invert": .18,
		"--brdr": 14737632,
		"--sh-clr": 16777215,
		"--absc": 1,
		"--abs255": 255,
		"--accent": d
	}]
}());



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

// Info panel: pixel values under cursor (RGBA, HSV), coordinates, and selection size.
function InfoPanel() {
	PanelTabBase.call(this, "Info", !1, "---panels/info", PanelTabBase.xA.aoQ);
	this.DK.setAttribute("style", "min-width:240px;");
	this.KP = null;  // current document (set by Yw)
	this.mN = null;  // unit/preference settings for display (set by Yw)
	// Flat list of all value labels; indices used by JP / XK:
	//   0–3 = R,G,B,A  4–5 = X,Y  6–7 = W,H  8–10 = H,S,B (HSV)
	var allLabels = this.pK = [];
	for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
		var rowEl = s.createElement("div", "marged row");
		this.DK.appendChild(rowEl);
		var leftCell = s.createElement("div", "cell");
		leftCell.setAttribute("style", "width:10em");
		rowEl.appendChild(leftCell);
		var rightCell = s.createElement("div", "cell");
		rightCell.setAttribute("style", "width:10em");
		rowEl.appendChild(rightCell);
		var labelsInRow = rowIndex == 2 ? 3 : 4;
		for (var labelIndex = 0; labelIndex < labelsInRow; labelIndex++) {
			var label = new LabelItem("");
			allLabels.push(label);
			label.c(0);
			label.e.style.padding = "0";
			// Row 1 splits across two columns: X,Y left; W,H right. Rows 0 and 2 use left only.
			var targetCell = rowIndex != 1 || labelIndex < 2 ? leftCell : rightCell;
			targetCell.appendChild(label.e);
			s.appendBr(targetCell);
		}
		if (rowIndex < 2) s.appendHr(this.DK);
	}
	this.Nt = allLabels[4];  // X coordinate label
	this.lw = allLabels[5];  // Y coordinate label
	this.SU = allLabels[6];  // selection width label
	this.it = allLabels[7];  // selection height label
}
InfoPanel.prototype = new PanelTabBase("");
// Update cursor readout on pointer move. Called from PanelListContainer.JP.
// doc = document, app = Photopea app, units = display units, kbState = keyboard state, pointer = {x,y,oW} in device px.
InfoPanel.prototype.JP = function (doc, app, units, kbState, pointer) {
	if (!s.isInDocument(this.DK) || doc == null) return;
	var docPoint = doc.u.Zx(pointer.x, pointer.y),
		pixelCoord = new Point2D(Math.floor(docPoint.x), Math.floor(docPoint.y));
	if (!pointer.oW) {
		var r = 0,
			g = 0,
			b = 0,
			a = 0,
			labels = this.pK;
		// Sample composite pixels when cursor is in-bounds and no vector selection is active
		if (!pointer.oW && !doc.ajH() && new Rect(0, 0, doc.m - 1, doc.n - 1).xC(pixelCoord)) {
			var composite = doc.LT(),
				pixelOffset = doc.m * pixelCoord.y + pixelCoord.x << 2;
			r = composite[pixelOffset + 0];
			g = composite[pixelOffset + 1];
			b = composite[pixelOffset + 2];
			a = composite[pixelOffset + 3];
		}
		labels[0].c("R: " + r);
		labels[1].c("G: " + g);
		labels[2].c("B: " + b);
		labels[3].c("A: " + a);
		var hsv = PixelUtil.rgbToHsv(r, g, b);
		labels[8].c("H: " + Math.round(hsv.Tq * 360) + "\xB0");
		labels[9].c("S: " + Math.round(hsv.Lm * 100) + "%");
		labels[10].c("B: " + Math.round(hsv.k * 100 / 255) + "%");
	}
	// Show sub-pixel coordinates when zoomed in past 100%
	var displayCoord = doc.u.N > 1 ? new Point2D(docPoint.x, docPoint.y) : pixelCoord;
	this.Nt.c("X: " + PixelUtil.y0.ij(displayCoord.x, doc.m7, units, doc.m));
	this.lw.c("Y: " + PixelUtil.y0.ij(displayCoord.y, doc.m7, units, doc.n));
	this.XK();
};
// Update W/H from the active selection (marquee rect or path bounds).
InfoPanel.prototype.XK = function () {
	var doc = this.KP,
		units = this.mN,
		selWidth = 0,
		selHeight = 0;
	if (doc && units) {
		if (doc.u.M9) {
			selWidth = doc.u.M9.m;
			selHeight = doc.u.M9.n;
		} else if (doc.P) {
			selWidth = doc.P.rect.m;
			selHeight = doc.P.rect.n;
		}
		selWidth = PixelUtil.y0.ij(Math.abs(selWidth), doc.m7, units, doc.m);
		selHeight = PixelUtil.y0.ij(Math.abs(selHeight), doc.m7, units, doc.n);
	}
	this.SU.c("Width".charAt(0) + ": " + selWidth);
	this.it.c("Height".charAt(0) + ": " + selHeight);
};
InfoPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.XK();
};
InfoPanel.prototype.Yw = function (doc, app, units) {
	this.KP = doc;
	this.mN = units;
	this.XK();
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


function ArtboardToolOptions() {
	ToolOptionsBase.call(this);
	this.MP = new ArtboardBackgroundPanel();
	this.MP.addListener(ActionTypes.E.A, this.Ak, this);
	this.body.appendChild(this.MP.e);
}

ArtboardToolOptions.prototype = new ToolOptionsBase();

ArtboardToolOptions.prototype.lx = function () {
	this.MP.refresh();
};

ArtboardToolOptions.prototype.Ak = function (l) {
	var _local4424 = new Action(ActionTypes.E.L, !0);
	_local4424.data = {
		a: ActionTypes.$.kl,
		G: this.G,
		Oo: this.MP.az7()
	};
	this.dispatch(_local4424);
};

ArtboardToolOptions.prototype.IF = function (l) {
	this.MP.akE(l.Ye);
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



function GuideGuyPanel() {
	PanelTabBase.call(this, "Guide Guy", !1, "---panels/guideguy", PanelTabBase.xA.aAh);
	this.KP = null;
	this.HA = new DropdownMenu(null, PixelUtil.y0.Fc);
}
GuideGuyPanel.prototype = new PanelTabBase("");
GuideGuyPanel.prototype.Eg = function () {
	this.pK = [];
	var _local3933 = s.createElement("div", "form padded");
	this.DK.appendChild(_local3933);
	_local3933.setAttribute("style", "width:200px");
	this.DK.appendChild(_local3933);
	var _local3931 = s.createElement("canvas"),
		_local3923 = _local3931.getContext("2d", { willReadFrequently: true });
	_local3931.width = _local3931.height = 160;
	var _local3930 = [32, 0, 16, 160, 0, 32, 160, 16, 0, 112, 160, 16],
		_local3929 = "Margin Left,Margin Top,Margin Right,Margin Bottom,Column Count,Row Count,Column Width,Row Height,Column Gap,Row Gap".split(","),
		_local3927 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	_local3933.appendChild(this.HA.e);
	for (var _local3922 = 0; _local3922 < 10; _local3922++) {
		_local3923.clearRect(0, 0, 160, 160);
		_local3923.setTransform(1, 0, 0, 1, 80, 80);
		_local3923.rotate((_local3922 & 3) * Math.PI / 2);
		_local3923.translate(-80, -80);
		_local3923.fillStyle = "rgba(0,0,0,0.3)";
		if (_local3922 < 4) {
			for (var _local3934 = 0; _local3934 < 12; _local3934 += 4) {
				_local3923.fillStyle = _local3934 == 0 ? "#000000" : "rgba(0,0,0,0.3)";
				_local3923.fillRect(_local3930[_local3934], _local3930[_local3934 + 1], _local3930[_local3934 + 2], _local3930[_local3934 + 3]);
			}
		} else if (_local3922 < 6) {
			var _local3924 = 8 * 6;
			_local3923.fillRect(0, 0, _local3924, 160);
			_local3923.fillRect(8 * 7, 0, _local3924, 160);
			_local3923.fillStyle = "#000000";
			_local3923.fillRect(8 * 14, 0, _local3924, 160);
		} else if (_local3922 < 8) {
			_local3923.fillRect(0, 0, 16, 160);
			_local3923.fillRect(160 - 16, 0, 16, 160);
			_local3923.fillRect(32, 0, 160 - 64, 160);
			_local3923.fillStyle = "#000000";
			_local3923.fillRect(32, 80 - 8, 160 - 64, 8 * 1);
		} else {
			_local3923.fillRect(0, 0, 8 * 7, 160);
			_local3923.fillRect(8 * 13, 0, 160, 160);
			_local3923.fillStyle = "#000000";
			_local3923.fillRect(8 * 7, 80 - 8, 8 * 6, 8 * 1);
		}
		var _local3935 = "<img src=\"" + _local3931.toDataURL() + "\" class=\"autoscale gsicon\" /> ",
			_local3932 = new RangeDropInput(_local3935, 0, 200, null, _local3922 == 4 || _local3922 == 5 ? 0 : 2, null, null, 4, _local3929[_local3922]);
		_local3932.parent = this;
		_local3932.addListener(ActionTypes.E.A, this.a1t, this);
		_local3932.c(_local3927[_local3922]);
		_local3932.refresh();
		this.pK.push(_local3932);
		_local3933.appendChild(_local3932.e);
	}
	var _local3926 = [
	"Add Guides",
	"Clear Guides"];

	this.VS = [];
	for (var _local3922 = 0; _local3922 < _local3926.length; _local3922++) {
		var _local3928 = new ToolbarButton(_local3926[_local3922], !0, null, !0);
		this.VS.push(_local3928);
		_local3928.addListener("click", this.Ab, this);
		_local3933.appendChild(_local3928.e);
	}
	for (var _local3922 = 0; _local3922 < 6; _local3922++) {
		_local3923.setTransform(1, 0, 0, 1, 80, 80);
		_local3923.rotate(Math.floor(_local3922 / 3) * Math.PI / 2);
		_local3923.translate(-80, -80);
		_local3923.clearRect(0, 0, 160, 160);
		_local3923.fillStyle = "rgba(0,0,0,0.3)";
		_local3923.fillRect(0, 0, 160, 160);
		_local3923.clearRect(16, 16, 128, 128);
		_local3923.fillStyle = "#000000";
		var _local3925 = _local3922 % 3;
		_local3923.fillRect([0, 9, 18][_local3925] * 8, 0, 16, 160);
		var _local3935 = "<img src=\"" + _local3931.toDataURL() + "\" class=\"autoscale gsicon\" /> ",
			_local3928 = new ToolbarButton(_local3935, !1, null, !1);
		this.VS.push(_local3928);
		_local3928.addListener("click", this.Ab, this);
		_local3933.appendChild(_local3928.e);
	}
};
GuideGuyPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.HA.refresh();
	if (this.pK == null) return;
	for (var _local3936 = 0; _local3936 < this.VS.length; _local3936++) this.VS[_local3936].refresh();
};
GuideGuyPanel.prototype.a1t = function (l) {
	var _local3942 = this.pK,
		_local3938 = _local3942.indexOf(l.target),
		_local3941 = Math.floor(_local3938 / 2),
		_local3940 = _local3938 & 1,
		_local3939 = [];
	for (var _local3937 = 0; _local3937 < 4; _local3937++) _local3939.push(_local3942[2 * _local3937 + _local3940].b());
	var _local3943 = -1;
	if (_local3941 == 2 && _local3939[2] != 0 && _local3939[3] != 0 && _local3939[4] != 0) _local3943 = 4;
	if (_local3941 == 3 && _local3939[3] != 0 && _local3939[2] != 0 && _local3939[4] != 0) _local3943 = 4;
	if (_local3941 == 4 && _local3939[4] != 0 && _local3939[2] != 0 && _local3939[3] != 0) _local3943 = 3;
	if (_local3943 != -1) _local3942[2 * _local3943 + _local3940].c(0);
};
GuideGuyPanel.prototype.Ab = function (l) {
	var _local3952 = this.KP,
		_local3945 = this.VS.indexOf(l.target),
		_local3951 = [
		[],
		[]];

	if (_local3952 == null) return;
	var _local3950 = _local3952.P ? _local3952.P.rect : new Rect(0, 0, _local3952.m, _local3952.n),
		_local3948 = _local3950.m,
		_local3954 = _local3950.n;
	if (_local3945 == 0) {
		var _local3946 = [
			[],
			[]],

			_local3955 = this.HA.b();
		for (var _local3944 = 0; _local3944 < this.pK.length; _local3944++) {
			var _local3953 = this.pK[_local3944].b();
			_local3953 = PixelUtil.y0.Sw(_local3953, _local3952.m7, _local3952.m, _local3955);
			_local3946[_local3944 & 1].push(_local3953);
		}
		var _local3947 = [GuideGuyPanel.azS(_local3946[0], _local3950.x, _local3950.x + _local3948), GuideGuyPanel.azS(_local3946[1], _local3950.y, _local3950.y + _local3954)];
		_local3951 = GuideGuyPanel.sO(_local3947);
		f.Pq.eF(_local3951, _local3952.Ww());
	} else if (_local3945 == 1) {} else {
		_local3945 -= 2;
		var _local3949 = Math.floor(_local3945 / 3),
			_local3947 = [
			[],
			[]];

		_local3947[_local3949].push([_local3950.x, _local3950.x + _local3948 / 2, _local3950.x + _local3948, _local3950.y, _local3950.y + _local3954 / 2, _local3950.y + _local3954][_local3945]);
		_local3951 = GuideGuyPanel.sO(_local3947);
		f.Pq.eF(_local3951, _local3952.Ww());
	}
	this.aw7(_local3951);
};
GuideGuyPanel.sO = function (l) {
	var _local3959 = [],
		_local3957 = [];
	for (var _local3958 = 0; _local3958 < 2; _local3958++)
	for (var _local3956 = 0; _local3956 < l[_local3958].length; _local3956++) {
		_local3959.push([_local3958, l[_local3958][_local3956]]);
		_local3957.push(-1);
	}
	return [_local3959, _local3957];
};
GuideGuyPanel.prototype.auH = function (l) {
	var _local3960 = this.a16.indexOf(l.target);
};
GuideGuyPanel.prototype.aw7 = function (l) {
	var _local3961 = new Action(ActionTypes.E.v, !0);
	_local3961.G = f.$C;
	_local3961.data = {
		a: "gids",
		jh: l
	};
	this.dispatch(_local3961);
};
GuideGuyPanel.azS = function (l, d, G) {
	var _local3966 = [],
		_local3965 = l[2],
		_local3964 = l[3],
		_local3967 = l[4],
		_local3963 = 0;
	if (_local3965 == 0) _local3963++;
	if (_local3964 == 0) _local3963++;
	if (_local3967 == 0) _local3963++;
	if (_local3963 > 1 && _local3965 == 0 && _local3964 == 0) {
		if (l[0] != 0) _local3966.push(d + l[0]);
		if (l[1] != 0) _local3966.push(G - l[1]);
		return _local3966;
	}
	var _local3968 = G - d - l[0] - l[1];
	if (_local3965 == 0) {
		if (_local3967 == 0) {
			_local3965 = Math.floor(_local3968 / _local3964);
			_local3967 = (_local3968 - _local3965 * _local3964) / (_local3965 - 1);
		} else {
			_local3965 = 1;
			while (_local3964 * _local3965 + _local3967 * (_local3965 - 1) + _local3964 + _local3967 <= _local3968) _local3965++;
		}
	} else if (_local3965 != 0 && _local3964 != 0) {
		if (_local3965 * _local3964 > _local3968) _local3965 = Math.floor(_local3968 / _local3964);
		_local3967 = (_local3968 - _local3965 * _local3964) / (_local3965 - 1);
	}
	_local3966.push(d + l[0], G - l[1]);
	var _local3964 = (_local3968 - _local3967 * (_local3965 - 1)) / _local3965;
	for (var _local3962 = 1; _local3962 < _local3965; _local3962++) {
		if (_local3967 == 0) _local3966.push(d + l[0] + _local3962 * _local3964);else
		_local3966.push(d + l[0] + _local3962 * _local3964 + (_local3962 - 1) * _local3967, d + l[0] + _local3962 * _local3964 + _local3962 * _local3967);
	}
	return _local3966;
};
GuideGuyPanel.prototype.Yw = function (l, d, G) {
	this.KP = l;
};
GuideGuyPanel.prototype.KN = function () {
	if (s.isInDocument(this.DK) && this.pK == null) this.Eg();
	this.refresh();
};
GuideGuyPanel.prototype.BM = function (l) {
	this.HA.c(l.hq.SF);
};

function PropertiesPanel() {
	PanelTabBase.call(this, "Properties", !1, "---panels/properties", PanelTabBase.xA.uB);
	this.apJ = null;
	this.v0 = null;
	this.mN = null;
	this.adU = -1;
	this.pa = null;
}
PropertiesPanel.prototype = new PanelTabBase("");
PropertiesPanel.prototype.resize = function (l, d) {
	this.iJ = l;
	this.Tq = d;
	l = l - 16;
	d = d - 12;
	var _local3970 = this.pa;
	if (_local3970) {
		_local3970.style.width = l + "px";
		_local3970.style.height = d + "px";
		for (var _local3969 = 0; _local3969 < 3; _local3969++) this.MW[_local3969].resize(l - 12, d);
	}
};
PropertiesPanel.prototype.Eg = function () {
	this.pa = s.createElement("div", "padded scrollable");
	this.DK.appendChild(this.pa);
	var _local3973 = s.createElement("span");
	this.pa.appendChild(_local3973);
	this.c2 = [
	new ToolbarButton("Layer"),
	new ToolbarButton("Mask"),
	new ToolbarButton("Live Shape")];

	for (var _local3971 = 0; _local3971 < this.c2.length; _local3971++) {
		var _local3972 = this.c2[_local3971];
		_local3972.addListener("click", this.amZ, this);
		_local3973.appendChild(_local3972.e);
		if (_local3971 == 2) _local3972.e.style.marginRight = "0";
	}
	this.pa.appendChild(s.createElement("hr"));
	this.Yz = new PropertiesPanel.Tv();
	this.Yz.parent = this;
	this.Z_ = new PropertiesPanel.tK();
	this.Z_.parent = this;
	this.i0 = new PropertiesPanel.Iy();
	this.i0.parent = this;
	this.MW = [this.Yz, this.Z_, this.i0];
	this.pa.appendChild(this.Yz.e);
	this.resize(this.iJ, this.Tq);
};
PropertiesPanel.prototype.amZ = function (l) {
	var _local3974 = this.c2.indexOf(l.currentTarget);
	this.Fu(_local3974);
	this.a9H(_local3974 == 1 ? this.Z_.Ih : -1);
};
PropertiesPanel.prototype.Fu = function (l) {
	for (var _local3975 = 0; _local3975 < 3; _local3975++) {
		this.c2[_local3975].kL();
		var _local3976 = this.MW[_local3975].e;
		if (_local3976.parentNode == this.pa && _local3975 != l) this.pa.removeChild(_local3976);
		if (_local3976.parentNode != this.pa && _local3975 == l) this.pa.appendChild(_local3976);
	}
	this.c2[l].Nu();
};
PropertiesPanel.prototype.a9H = function (l) {
	var _local3980 = this.v0.g[0],
		_local3977 = this.v0.B[_local3980],
		_local3979 = l + 1;
	if (l == 1 && _local3977.VM) return;
	var _local3978 = new Action(ActionTypes.E.v, !0);
	_local3978.G = f.yS;
	if (l != 1 && _local3977.VM) {
		_local3978.data = {
			a: LayerRecord.bj,
			j: _local3980,
			VY: 2
		};
		this.dispatch(_local3978);
	}
	_local3978.data = {
		a: LayerRecord.bj,
		j: _local3980,
		VY: _local3979
	};
	this.dispatch(_local3978);
};
PropertiesPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	if (this.pa == null) return;
	this.Yw(this.v0);
	for (var _local3981 = 0; _local3981 < 3; _local3981++) {
		this.c2[_local3981].refresh();
		this.MW[_local3981].refresh();
	}
};
PropertiesPanel.prototype.KN = function () {
	if (!s.isInDocument(this.DK)) return;
	if (this.pa == null) {
		this.Eg();
		this.BM(this.mN, PsdResourceTypes.Wx);
		this.Yw(this.apJ);
		this.refresh();
	}
};
PropertiesPanel.prototype.Yw = function (l) {
	this.apJ = l;
	if (this.pa == null) return;
	this.Yz.Yw(l);
	this.Z_.Yw(l);
	this.i0.Yw(l);
	if (l == null || l.g.length == 0 || l.B[l.g[0]] == null) {
		s.addClass(this.DK, "disabled");
		this.v0 = null;
		return;
	} else s.removeClass(this.DK, "disabled");
	var _local3988 = l.g[0],
		_local3983 = l.B[_local3988],
		_local3987 = l.LW(),
		_local3986 = _local3987[0],
		_local3985 = _local3987[1];
	if (_local3985.length != 0) {
		var _local3990 = _local3986[_local3985[0]],
			_local3984 = _local3990.add.vogk,
			_local3991 = !1;
		if (_local3984)
		for (var _local3982 = 0; _local3982 < _local3984.length; _local3982++) {
			var _local3989 = _local3984[_local3982].v;
			if (!PixelUtil.X.TJ(_local3989)) continue;
			_local3991 = !0;
			_local3988 = _local3990.sy;
		}
	}
	_local3988 += "," + _local3991;
	if (l != this.v0 || this.adU != _local3988) {
		this.v0 = l;
		this.adU = _local3988;
		if (_local3991) this.Fu(2);else
		if (_local3983.ht < 1 && !_local3983.VM || LayerEffectsHelper.detectAdjustmentKey(_local3983.add)) this.Fu(0);else
		this.Fu(1);
	}
	this.c2[1].setEnabled(this.Z_.Ih != -1);
	this.c2[2].setEnabled(_local3991);
};
PropertiesPanel.prototype.BM = function (l, d) {
	this.mN = l;
	if (this.Yz) this.Yz.BM(l, d);
	if (this.i0) this.i0.BM(l, d);
};
PropertiesPanel.Tv = function () {
	UIComponent.call(this);
	this.e = s.createElement("div", "form");
	this.aac = new LabelItem("Hello");
	this.xT = new ToolbarButton("Reset", null, null, !0);
	this.xT.e.style.auj = "right";
	this.xT.addListener("click", this.Jx, this);
	this.e.appendChild(this.aac.e);
	this.e.appendChild(this.xT.e);
	this.tb = null;
	this.Ik = null;
	this.v0 = null;
	this.mN = null;
	this.a33 = -1;
	this.av6 = null;
	this.nK = null;
	this.A4 = new BoundsInput(0, !0, !0);
	this.A4.parent = this;
	this.A4.addListener(ActionTypes.E.A, this.am7, this);
	this.e.appendChild(this.A4.e);
	this.vk = new ColorSwatch(!0);
	this.vk.parent = this;
	this.vk.addListener(ActionTypes.E.A, this.a0j, this);
	this._6 = s.createElement("div", "marged hiline");
	this._6.appendChild(this.vk.e);
	this.P$ = new LayerStyleOptionRow("GrFl", !0);
	this.P$.parent = this;
	this.P$.addListener(ActionTypes.E.A, this.a21, this);
	this.RM = s.createElement("div", "marged hiline");
	var _local3996 = "Grad Rvrs Type Algn Angl Dthr Scl Ofst".split(" ");
	for (var _local3992 = 0; _local3992 < _local3996.length; _local3992++) {
		var _local3995 = this.P$.k7[_local3996[_local3992]].e;
		this.RM.appendChild(_local3995);
	}
	this.bx = new LayerStyleOptionRow("patternFill", !0);
	this.bx.parent = this;
	this.bx.addListener(ActionTypes.E.A, this.a8t, this);
	this.iC = s.createElement("div", "marged hiline");
	var _local3996 = ["Ptrn", "Angl", "Scl", "Algn", "phase"];
	for (var _local3992 = 0; _local3992 < _local3996.length; _local3992++) {
		var _local3995 = this.bx.k7[_local3996[_local3992]].e;
		this.iC.appendChild(_local3995);
	}
	this.n1 = {};
	for (var _local3993 in LayerEffectsHelper.names) {
		if (FilterEffectPanel[_local3993] == null) continue;
		this.n1[_local3993] = new FilterEffectPanel[_local3993]();
		this.n1[_local3993].addListener(ActionTypes.E.A, this.as5, this);
		this.n1[_local3993].parent = this;
	}
	var _local3994 = this.aoT = s.createElement("div", "marged hiline");
	this.Ls = new BoundsInput(0, !0);
	_local3994.appendChild(this.Ls.e);
	this.Ls.addListener(ActionTypes.E.A, this.Ak, this);
	this.ayW = null;
	this.MP = new ArtboardBackgroundPanel();
	this.MP.parent = this;
	this.MP.addListener(ActionTypes.E.A, this.Ak, this);
	_local3994.appendChild(this.MP.e);
};
PropertiesPanel.Tv.prototype = new UIComponent();
PropertiesPanel.Tv.prototype.am7 = function (l) {
	var _local4000 = this.A4.b(),
		_local3997 = this.nK,
		_local3999 = new Rect(_local4000[0], _local4000[1], _local4000[2], _local4000[3]);
	if (_local3999.XB(_local3997)) return;
	this.nK = _local3999;
	var _local3998 = new Action(ActionTypes.E.v, !0);
	if (_local3997.m == _local3999.m && _local3997.n == _local3999.n) {
		_local3998.G = f.$C;
		_local3998.data = {
			a: "trsl",
			wS: _local3999.x - _local3997.x,
			ui: _local3999.y - _local3997.y
		};
	} else {
		_local3998.G = f.qK;
		_local3998.data = {
			a: "scl",
			Il: [2, 4],
			Z: new Point2D(_local3999.m / _local3997.m, _local3999.n / _local3997.n),
			BL: 0
		};
	}
	this.dispatch(_local3998);
};
PropertiesPanel.Tv.prototype.resize = function (l, d) {
	var _local4001 = this.n1;
	for (var _local4002 in _local4001) _local4001[_local4002].resize(l, d);
};
PropertiesPanel.Tv.prototype.Jx = function (l) {
	var _local4005 = this.v0,
		_local4003 = _local4005.B[_local4005.g[0]],
		_local4004 = LayerEffectsHelper.detectAdjustmentKey(_local4003.add);
	this.Ik.c(FilterHelper.oT(_local4004));
	this.as5();
};
PropertiesPanel.Tv.prototype.refresh = function () {
	for (var _local4006 in this.n1) this.n1[_local4006].refresh();
	this.P$.refresh();
	this.bx.refresh();
	this.MP.refresh();
	this.Ls.refresh();
	this.xT.refresh();
	this.A4.refresh();
};
PropertiesPanel.Tv.prototype.Ak = function (l) {
	var _local4011 = new Action(ActionTypes.E.v, !0),
		_local4007 = this.Ls.b(),
		_local4010 = this.ayW;
	if (l.target == this.Ls && _local4007[2] == _local4010[2] && _local4007[3] == _local4010[3]) {
		_local4011.G = f.$C;
		_local4011.data = {
			a: "trsl",
			wS: _local4007[0] - _local4010[0],
			ui: _local4007[1] - _local4010[1]
		};
	} else {
		var _local4009 = LayerRecord.vI(new Rect(_local4007[0], _local4007[1], _local4007[2], _local4007[3])),
			_local4008 = this.MP.az7();
		_local4008.artboardRect = {
			t: "Objc",
			v: _local4009
		};
		_local4011.G = f.yS;
		_local4011.data = {
			a: LayerRecord.ka,
			rX: _local4008
		};
	}
	this.dispatch(_local4011);
};
PropertiesPanel.Tv.prototype.a0j = function (l) {
	var _local4014 = this.v0,
		_local4012 = _local4014.g[0];
	if (_local4014.B[_local4012].add.SoCo == null) return;
	var _local4013 = JSON.parse(JSON.stringify(_local4014.B[_local4012].add.SoCo));
	_local4013.Clr.v = this.vk.b();
	this.Sb({
		hA: 1,
		rU: _local4013
	});
};
PropertiesPanel.Tv.prototype.a21 = function (l) {
	var _local4016 = this.v0,
		_local4015 = _local4016.g[0];
	if (_local4016.B[_local4015].add.GdFl == null) return;
	this.Sb({
		hA: 2,
		rU: this.P$.b()
	});
};
PropertiesPanel.Tv.prototype.a8t = function (l) {
	this.Sb({
		hA: 3,
		rU: this.bx.b()
	});
};
PropertiesPanel.Tv.prototype.Sb = function (l) {
	this.a88(f.yS, {
		a: LayerRecord.sM,
		xn: [this.v0.g[0]],
		T3: !0,
		Z: l
	});
};
PropertiesPanel.Tv.prototype.as5 = function (l) {
	this.a88(f.Qi, {
		a: "edit_layer",
		Z: this.Ik.b()
	});
};
PropertiesPanel.Tv.prototype.a88 = function (l, d) {
	var _local4017 = new Action(ActionTypes.E.v, !0);
	_local4017.G = l;
	_local4017.data = d;
	this.dispatch(_local4017);
};
PropertiesPanel.Tv.prototype.Yw = function (l, d) {
	var _local4018 = "Layer",
		_local4025 = !1,
		_local4024 = !1,
		_local4022 = null;
	this.v0 = l;
	if (l && l.B.length > 0 && l.g.length != 0 && l.B[l.g[0]]) {
		var _local4027 = l.B[l.g[0]],
			_local4019 = LayerEffectsHelper.detectAdjustmentKey(_local4027.add);
		if (_local4019 != null && this.n1[_local4019] != null) {
			_local4022 = this.n1[_local4019].e;
			this.Ik = this.n1[_local4019];
			this.n1[_local4019].c(JSON.parse(JSON.stringify(_local4027.add[_local4019])));
			if (l.g[0] != this.a33) {
				var _local4028 = l.LT(l.g[0] - 1);
				this.av6 = PixelUtil.histogramFromRgba(_local4028);
			}
			this.n1[_local4019].RB(this.av6);
			_local4018 = languageManager.get(LayerEffectsHelper.names[_local4019]);
			_local4025 = !0;
		}
		if (_local4019 == null && _local4027.add.artb == null) {
			var _local4026 = this.nK = PixelUtil.vec.f1(f.NH.Pa(l));
			_local4024 = !_local4026.W6();
			this.A4.c([_local4026.x, _local4026.y, _local4026.m, _local4026.n], [l.m7, l.m, this.mN.hq.SF]);
		}
		if (_local4027.add.SoCo) {
			_local4022 = this._6;
			this.vk.c(_local4027.add.SoCo.Clr.v);
			_local4018 = "Color Fill";
		}
		if (_local4027.add.GdFl) {
			_local4022 = this.RM;
			this.P$.update(l, _local4027.add.GdFl);
			_local4018 = "Gradient Fill";
		}
		if (_local4027.add.PtFl) {
			_local4022 = this.iC;
			this.bx.update(l, _local4027.add.PtFl);
			_local4018 = "Pattern Fill";
		}
		if (_local4027.add.artb) {
			var _local4021 = _local4027.add.artb,
				_local4023 = _local4027.dA();
			_local4022 = this.aoT;
			this.MP.akE(_local4021);
			var _local4020 = this.ayW = [_local4023.x, _local4023.y, _local4023.m, _local4023.n];
			this.Ls.c(_local4020, [l.m7, l.m, this.mN.hq.SF]);
			_local4018 = "Artboard";
		}
		this.a33 = l.g[0];
	}
	if (_local4022 != this.tb) {
		if (this.tb) this.e.removeChild(this.tb);
		if (_local4022 != null) this.e.appendChild(_local4022);
		this.tb = _local4022;
	}
	this.aac.c(_local4018);
	this.xT.e.style.display = _local4025 ? "" : "none";
	this.A4.e.style.display = _local4024 ? "" : "none";
};
PropertiesPanel.Tv.prototype.BM = function (l, d) {
	this.mN = l;
	this.P$.BM(l, d);
	this.bx.BM(l, d);
	if (d == PsdResourceTypes.UW) this.Yw(this.v0, l);
	for (var _local4029 in this.n1) this.n1[_local4029].BM(l, d);
};
PropertiesPanel.tK = function () {
	UIComponent.call(this);
	this.e = s.createElement("div", "form");
	this.v0 = null;
	this.Ih = 0;
	var _local4032 = s.createElement("span", "fitem");
	this.e.appendChild(_local4032);
	this.c2 = [
	new ToolbarButton("Raster Mask"),
	new ToolbarButton("Vector Mask"),
	new ToolbarButton("Filter Mask")];

	for (var _local4030 = 0; _local4030 < this.c2.length; _local4030++) {
		var _local4031 = this.c2[_local4030];
		_local4031.addListener("click", this.ar8, this);
		_local4032.appendChild(_local4031.e);
	}
	this.XS = new RangeInput("Density", 0, 255);
	this.XS.addListener(ActionTypes.E.A, this.Rx, this);
	this.e.appendChild(this.XS.e);
	this.wk = new RangeInput("Feather", 0, 500, "px", 2, !0);
	this.wk.addListener(ActionTypes.E.A, this.Rx, this);
	this.e.appendChild(this.wk.e);
	this.Hq = new ToolbarButton("Invert", null, null, !0);
	this.Hq.addListener("click", this.awD, this);
};
PropertiesPanel.tK.prototype = new UIComponent();
PropertiesPanel.tK.prototype.awD = function () {
	var _local4033 = new Action(ActionTypes.E.v, !0);
	_local4033.G = f.Qi;
	_local4033.data = {
		a: "start",
		ce: "nvrt"
	};
	this.dispatch(_local4033);
};
PropertiesPanel.tK.prototype.Rx = function (l) {
	var _local4036 = this.XS.b(),
		_local4034 = this.wk.b(),
		_local4035 = new Action(ActionTypes.E.v, !0);
	_local4035.G = f.yS;
	_local4035.data = {
		a: LayerRecord.fx,
		NT: this.v0.g[0],
		iQ: {
			GP: this.Ih,
			XS: _local4036,
			wk: _local4034
		}
	};
	this.dispatch(_local4035);
};
PropertiesPanel.tK.prototype.refresh = function () {
	for (var _local4037 = 0; _local4037 < this.c2.length; _local4037++) this.c2[_local4037].refresh();
	this.XS.refresh();
	this.wk.refresh();
	this.Hq.refresh();
};
PropertiesPanel.tK.prototype.Yw = function (l) {
	this.v0 = l;
	this.AK();
};
PropertiesPanel.tK.prototype.ar8 = function (l) {
	this.AK(this.c2.indexOf(l.currentTarget));
	this.parent.a9H(this.Ih);
};
PropertiesPanel.tK.prototype.AK = function (l) {
	var _local4044 = this.v0,
		_local4039 = this.c2;
	for (var _local4038 = 0; _local4038 < 3; _local4038++) {
		var _local4043 = _local4039[_local4038];
		_local4043.kL();
		_local4043.disable();
	}
	if (_local4044 == null || _local4044.B.length == 0 || _local4044.g.length == 0 || _local4044.B[_local4044.g[0]] == null) return;
	var _local4042 = -1,
		_local4041 = _local4044.B[_local4044.g[0]];
	if (_local4041.aW() && _local4041.vZ(_local4044).z != null) {
		_local4039[2].enable();
		_local4042 = 2;
	}
	if (_local4041.add.vmsk) {
		_local4039[1].enable();
		_local4042 = 1;
	}
	if (_local4041.c3()) {
		_local4039[0].enable();
		_local4042 = 0;
	}
	if (l != null) _local4042 = l;else
	if (_local4041.VM) _local4042 = 1;else
	if (_local4041.ht == 3) _local4042 = 2;else
	if (_local4041.ht == 1) _local4042 = 0;
	this.Ih = _local4042;
	if (_local4042 == -1) {
		this.XS.disable();
		this.wk.disable();
		return;
	}
	var _local4045 = _local4041.NM(_local4042);
	this.XS.enable();
	this.wk.enable();
	this.XS.c(_local4045.XS);
	this.wk.c(_local4045.wk);
	_local4039[_local4042].Nu();
	var _local4040 = this.Hq.e;
	if (_local4042 == 0) this.e.appendChild(_local4040);else
	if (_local4040.parentNode == this.e) this.e.removeChild(_local4040);
};
PropertiesPanel.Iy = function () {
	UIComponent.call(this);
	this.e = s.createElement("div", "form");
	this.KP = null;
	this.mN = null;
	this.Kz = -1;
	this.A4 = new BoundsInput(0, !1);
	this.v5 = new RangeInput([12, 15], -180, 180, "\xB0", 2);
	this.EN = new BoundsInput(1, !0);
	this.kV = new RangeInput([12, 94, 0], 0, 100, null, 2);
	this.jg = new RangeInput([12, 78], 3, 30);
	this.UJ = new ToolbarButton(["\u279C  ", [12, 76, 0]], null, null, !0);
	this.A4.addListener(ActionTypes.E.A, this.Yo, this);
	this.v5.addListener(ActionTypes.E.A, this.Yo, this);
	this.EN.addListener(ActionTypes.E.A, this.Yo, this);
	this.kV.addListener(ActionTypes.E.A, this.Yo, this);
	this.jg.addListener(ActionTypes.E.A, this.Yo, this);
	this.UJ.addListener("click", this.Yo, this);
};
PropertiesPanel.Iy.prototype = new UIComponent();
PropertiesPanel.Iy.prototype.refresh = function () {
	this.A4.refresh();
	this.v5.refresh();
	this.EN.refresh();
	this.kV.refresh();
	this.jg.refresh();
};
PropertiesPanel.Iy.prototype.Yo = function (l) {
	var _local4051 = this.KP,
		_local4046 = PixelUtil.X.eP(_local4051),
		_local4050 = l.target.b(),
		_local4049 = [this.A4, this.v5, this.EN, this.kV, this.jg, this.UJ].indexOf(l.target);
	if (_local4049 == 0) {
		var _local4048 = [];
		_local4048[0] = _local4050[0];
		_local4048[1] = _local4050[1];
		_local4048[2] = _local4048[0] + _local4050[2];
		_local4048[3] = _local4048[1] + _local4050[3];
		_local4050 = _local4048;
	}
	if (_local4049 == 1) _local4050 = _local4050 * Math.PI / 180;
	var _local4052 = {
		0: 1,
		1: 2,
		2: 3,
		3: 3,
		4: 4
	}[_local4049];
	_local4046[_local4052] = _local4050;
	var _local4047 = new Action(ActionTypes.E.v, !0);
	_local4047.G = f.yS;
	_local4047.data = {
		a: LayerRecord.ll,
		Z: _local4046,
		azV: _local4049 == 5
	};
	this.dispatch(_local4047);
};
PropertiesPanel.Iy.prototype.Yw = function (l) {
	var _local4058 = this.e;
	this.KP = l;
	if (l == null) return;
	var _local4053 = this.mN,
		_local4057 = [l.m7, l.m, _local4053.hq.SF],
		_local4056 = PixelUtil.X.eP(l),
		_local4055 = _local4056[0],
		_local4059 = _local4056[1];
	if (_local4059 == null) return;
	var _local4054 = _local4055 != this.Kz;
	this.Kz = _local4055;
	if (_local4054) s.clearChildren(_local4058);
	if (_local4054) _local4058.appendChild(this.A4.e);
	if (_local4054) _local4058.appendChild(this.v5.e);
	this.A4.c([_local4059[0], _local4059[1], _local4059[2] - _local4059[0], _local4059[3] - _local4059[1]], _local4057);
	this.v5.c(_local4056[2] * 180 / Math.PI);
	if (_local4055 == 2) {
		if (_local4054) _local4058.appendChild(this.EN.e);
		var _local4060 = _local4056[3];
		this.EN.c(_local4060, _local4057);
	}
	if (_local4055 == 7 || _local4055 == 8) {
		if (_local4054) _local4058.appendChild(this.kV.e);
		this.kV.c(_local4056[3]);
	}
	if (_local4055 == 8) {
		if (_local4054) _local4058.appendChild(this.jg.e);
		this.jg.c(_local4056[4]);
	}
	_local4058.appendChild(this.UJ.e);
};
PropertiesPanel.Iy.prototype.BM = function (l, d) {
	this.mN = l;
	this.Yw(this.KP);
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
	if (this.Kv.hasUnsavedChanges()) return window.confirm("There is unsaved work in " + this.Kv.name + ". Do you really want to close it?");
	return !0;
};

NamedTabPanel.prototype.BM = function (l, d) {
	this.wQ = l;
};

NamedTabPanel.prototype.Yw = function (l) {
	this.KN();
	this.VP();
};

NamedTabPanel.prototype.resize = function (l, d) {
	if (l <= 0 || d <= 0) return;
	this.iJ = l;
	this.Tq = d;
	var _local4066 = this.Kv,
		_local4068 = NamedTabPanel.wn,
		_local4067 = s.getDevicePixelRatio();
	_local4066.u.Vm.m = Math.floor(l * _local4067);
	_local4066.u.Vm.n = Math.floor(d * _local4067);
	s.setCanvasSizeForDpr(_local4068.Lp, l, d);
	s.setCanvasSizeForDpr(_local4068.La, l, d);
	s.setCanvasSizeForDpr(WebGLContext.getCanvas(), l, d);
	
	if (_local4066.u.N == 0) _local4066.u.N = f.gU.agP(_local4066.m, _local4066.n, l * _local4067, d * _local4067);
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
		let el = PP.window.find(`.cvs-wrapper`)[0];
		el.appendChild(workCvs);
		PP.e3();
		PP.resize();
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

NamedTabPanel.prototype.ak0 = function (l, d, G, b) {
	var _local4174 = l.I.Y1 != null || l.I.Bt != null || l.I.Cj != null || l.I.iT.length != 0 || l.I.P4.length != 0,
		_local4162 = this.wQ,
		_local4247 = _local4162.hq,
		_local4269 = ThemeManager.themes[_local4162.j$],
		_local4184 = Math.round(12 * s.getDevicePixelRatio()),
		_local4185 = _local4184 / l.u.N,
		_local4274 = G.Gb(!0);
	_local4274.hI();
	d.save();
	d.setTransform(_local4274.aS, _local4274.k, _local4274.S5, _local4274.Qd, _local4274.cI, _local4274.xu);
	if (l.add.artd) {
		var _local4163 = NamedTabPanel.Ku(l)[0];
		_local4163 = _local4163 < .5 ? _local4163 + .5 : _local4163 - .5;
		_local4163 = "" + Math.round(_local4163 * 255).toString(16);
		while (_local4163.length < 2) _local4163 = "0" + _local4163;
		d.fillStyle = "#" + _local4163 + _local4163 + _local4163;
		d.font = _local4185 + "px sans-serif";
		for (var _local4221 = 0; _local4221 < l.B.length; _local4221++) {
			var _local4219 = l.B[_local4221];
			if (_local4219.add.artb == null || !_local4219.zD()) continue;
			var _local4220 = _local4219.dA();
			d.fillText(_local4219.getName(), _local4220.x + 2, _local4220.y - _local4185 * .7);
			_local4174 = !0;
		}
	}

	function _local4210(segType) {
		return segType == 1 || segType == 2 || segType == 4 || segType == 5;
	}
	var _local4236 = NamedTabPanel.ut([.1, .5, 1, 1]),
		_local4233 = NamedTabPanel.ut([1, 1, 1, 1]);
	if (_local4162.Wi && _local4247.t_) {
		d.fillStyle = d.strokeStyle = _local4236;
		d.lineWidth = 1.5 / G.N;
		var _local4240 = l.LW(),
			_local4243 = _local4240[0],
			_local4242 = _local4240[1];
		for (var _local4239 = 0; _local4239 < _local4242.length; _local4239++) {
			var _local4241 = _local4243[_local4242[_local4239]],
				_local4272 = _local4241.add.vmsk,
				_local4268 = _local4272.i,
				_local4238 = PixelUtil.vec.pathFromSvg(_local4268);
			this.yC(_local4238, null, d);
			d.stroke();
			_local4174 = !0;
			var _local4200 = 3 * s.getDevicePixelRatio() / G.N,
				_local4218 = _local4268.length - 3;
			for (var _local4198 = 0; _local4198 < _local4272.JG.length; _local4198++) {
				var _local4199 = PixelUtil.path.OT(_local4268, _local4272.JG[_local4198]);
				if (_local4199 == null) continue;
				var _local4203 = _local4199.x,
					_local4204 = _local4199.y;
				d.beginPath();
				var _local4211 = _local4198 == 0;
				if (_local4272.as) _local4211 = !_local4211;
				if (_local4211) {
					d.moveTo(_local4203 - _local4200, _local4204 - _local4200);
					d.lineTo(_local4203 + _local4200, _local4204 + _local4200);
					d.moveTo(_local4203 - _local4200, _local4204 + _local4200);
					d.lineTo(_local4203 + _local4200, _local4204 - _local4200);
					d.stroke();
				} else {
					d.arc(_local4203, _local4204, _local4200 * 1, 0, 2 * Math.PI);
					d.fill();
				}
				_local4174 = !0;
			}
			if (l.g.length != 1) continue;
			var _local4267 = -1;
			for (var _local4257 = 0; _local4257 < _local4268.length; _local4257++) {
				if (_local4268[_local4257].type > 5) continue;
				if (_local4268[_local4257].type == 0 || _local4268[_local4257].type == 3) {
					if (_local4268[_local4257].H$ != -1) _local4267++;
					continue;
				}
				if (_local4272.g.indexOf(_local4267) != -1) {
					var _local4159 = _local4268[_local4257].H.x,
						_local4160 = _local4268[_local4257].H.y;
					d.fillRect(_local4159 - _local4200 * .8, _local4160 - _local4200 * .8, 2 * _local4200 * .8, 2 * _local4200 * .8);
				}
				if (_local4272.OE.indexOf(_local4257) != -1) {
					var _local4256 = _local4268[_local4257],
						_local4168 = [_local4256.H];
					d.beginPath();
					d.moveTo(_local4256.Wf.x, _local4256.Wf.y);
					d.lineTo(_local4256.H.x, _local4256.H.y);
					d.lineTo(_local4256.UU.x, _local4256.UU.y);
					var _local4248 = _local4268[_local4257 - 1],
						_local4229 = _local4268[_local4257 + 1];
					if (_local4248 && _local4210(_local4248.type) && _local4272.OE.indexOf(_local4257 - 1) == -1) {
						d.moveTo(_local4248.H.x, _local4248.H.y);
						d.lineTo(_local4248.UU.x, _local4248.UU.y);
						_local4168.push(_local4248.UU);
					}
					if (_local4229 && _local4210(_local4229.type) && _local4272.OE.indexOf(_local4257 + 1) == -1) {
						d.moveTo(_local4229.H.x, _local4229.H.y);
						d.lineTo(_local4229.Wf.x, _local4229.Wf.y);
						_local4168.push(_local4229.Wf);
					}
					d.stroke();
					if (!_local4256.H.XB(_local4256.Wf)) _local4168.push(_local4256.Wf);
					if (!_local4256.H.XB(_local4256.UU)) _local4168.push(_local4256.UU);
					for (var _local4250 = 0; _local4250 < _local4168.length; _local4250++) {
						var _local4249 = _local4168[_local4250],
							_local4251 = _local4249.x,
							_local4252 = _local4249.y;
						if (_local4250 == 0 && (_local4256.type == 2 || _local4256.type == 5)) d.fillRect(_local4251 - 1.2 * _local4200, _local4252 - 1.2 * _local4200, 2.4 * _local4200, 2.4 * _local4200);else
						{
							d.beginPath();
							d.arc(_local4251, _local4252, _local4200 * 1.2, 0, 2 * Math.PI);
							d.fill();
							if (_local4250 != 0) d.fillStyle = _local4233;
							d.beginPath();
							d.arc(_local4251, _local4252, _local4200 * .8, 0, 2 * Math.PI);
							d.fill();
							d.fillStyle = _local4236;
						}
					}
				}
				_local4174 = !0;
			}
		}
	}
	d.lineWidth = 1 / G.N;
	if (l.I.Iq) {
		d.fillStyle = d.strokeStyle = _local4236;
		var _local4166 = {
				C: [],
				F: []
			},
			_local4167 = NamedTabPanel.aq3;
		if (_local4167 == null) {
			_local4167 = NamedTabPanel.aq3 = {
				C: [1, 0],
				F: ["M"]
			};
			for (var _local4266 = 1; _local4266 < 30; _local4266++) {
				var _local4161 = Math.PI * 2 * _local4266 / 30;
				_local4167.C.push(Math.cos(_local4161), Math.sin(_local4161));
				_local4167.F.push("L");
			}
			_local4167.F.push("Z", "M", "L", "M", "L");
			_local4167.C.push(-.5, 0, .5, 0, 0, -.5, 0, .5);
		}
		for (var _local4223 = 0; _local4223 < l.I.Iq.length; _local4223++) {
			var _local4222 = f.Ur.abM(l.I.Iq[_local4223], G),
				_local4224 = new Matrix2D(_local4222[0], 0, 0, _local4222[0], _local4222[1], _local4222[2]);
			PixelUtil.vec.concat(_local4166, _local4167, _local4224);
		}
		this.yC(_local4166, null, d);
		d.stroke();
		_local4174 = !0;
	}
	var _local4197 = new Matrix2D(1, 0, 0, 1, .5 / G.N, .5 / G.N);
	if (l.ZV) {
		d.fillStyle = d.strokeStyle = _local4236;
		var _local4179 = {
			C: [0, 0, l.m, 0, l.m, l.n, 0, l.n],
			F: ["M", "L", "L", "L", "Z"]
		};
		this.yC(_local4179, _local4197, d);
		d.stroke();
		_local4174 = !0;
	}
	if (l.I.Ru) {
		d.fillStyle = d.strokeStyle = NamedTabPanel.ut([0, 0, 0, .5]);
		this.yC(l.I.Ru, null, d, !0);
		d.fill("evenodd");
	}
	d.fillStyle = d.strokeStyle = NamedTabPanel.ut([0, 0, 0, WebGLContext.webglAvailable && l.add.fvec == null ? 1 : .5], !0);
	if (l.I.Y1) {
		this.yC(l.I.Y1, null, d);
		d.fill();
	}
	if (l.I.Bt) {
		this.yC(l.I.Bt, _local4197, d);
		d.stroke();
	}
	for (var _local4234 in l.I.He)
	if (l.I.He[_local4234].Bt) {
		this.yC(l.I.He[_local4234].Bt, null, d);
		d.stroke();
		_local4174 = !0;
	}
	var _local4175 = NamedTabPanel.aoJ(l.I.jf, d, G);
	d.stroke();
	_local4174 = _local4174 || _local4175;
	var _local4246 = l.I.g2;
	d.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
	d.beginPath();
	var _local4245 = 6 * s.getDevicePixelRatio() / G.N;
	for (var _local4249 = 0; _local4249 < _local4246.length; _local4249 += 2) {
		_local4174 = !0;
		var _local4253 = _local4246[_local4249],
			_local4254 = _local4246[_local4249 + 1];
		d.moveTo(_local4253 + _local4245, _local4254);
		d.arc(_local4253, _local4254, _local4245, 0, 2 * Math.PI);
	}
	d.fill();
	var _local4244 = 4 * s.getDevicePixelRatio() / G.N;
	for (var _local4249 = 0; _local4249 < _local4246.length; _local4249 += 2) {
		_local4174 = !0;
		var _local4253 = _local4246[_local4249],
			_local4254 = _local4246[_local4249 + 1];
		d.fillStyle = NamedTabPanel.ut(l.I.Qg.indexOf(_local4249 >>> 1) != -1 ? [0, .6, 1, 1] : [.7, .7, .7, 1]);
		d.beginPath();
		d.moveTo(_local4253 + _local4244, _local4254);
		d.arc(_local4253, _local4254, _local4244, 0, 2 * Math.PI);
		d.fill();
	}
	if (l.I.iT.length != 0) {
		for (var _local4235 = 0; _local4235 < l.I.iT.length; _local4235++) {
			var _local4232 = l.I.iT[_local4235],
				_local4180 = _local4232[1],
				_local4208;
			if (b) {
				_local4208 = d.getImageData(_local4180.x, _local4180.y, _local4180.m, _local4180.n);
				PixelUtil.blend.compositeBlend("norm", _local4232[0], _local4180, new Uint8Array(_local4208.data.buffer), _local4180, _local4180, 1);
			} else _local4208 = new ImageData(new Uint8ClampedArray(_local4232[0].buffer), _local4180.m, _local4180.n);
			d.putImageData(_local4208, _local4180.x, _local4180.y);
		}
	}
	var _local4196 = .5 / G.N;
	d.lineWidth = 1 / G.N;
	if (l.I.nO) {
		_local4174 = !0;
		var _local4225 = l.I.nO,
			_local4227 = _local4225.wx,
			_local4226 = {
				F: [],
				C: []
			};
		for (var _local4256 = 0; _local4256 < _local4225.KB.length; _local4256++) PixelUtil.vec.concat(_local4226, PixelUtil.vec.simplifyPath(_local4225.KB[_local4256]));
		_local4226.C = _local4226.C.concat(_local4227);
		for (var _local4256 = 0; _local4256 < _local4227.length; _local4256 += 4) {
			_local4226.F.push("M", "L");
		}
		for (var _local4165 = 0; _local4165 < _local4226.C.length; _local4165++) {
			_local4226.C[_local4165] += _local4196;
		}
		d.strokeStyle = NamedTabPanel.ut([.9, .2, .2, 1]);
		this.yC(_local4226, null, d);
		d.stroke();
		var _local4173 = s.getDevicePixelRatio(),
			_local4237 = 2 / G.N;
		d.font = _local4185 * .9 + "px sans-serif";
		for (var _local4256 = 0; _local4256 < _local4227.length; _local4256 += 4) {
			var _local4276 = _local4227[_local4256],
				_local4280 = _local4227[_local4256 + 1],
				_local4277 = _local4227[_local4256 + 2],
				_local4281 = _local4227[_local4256 + 3],
				_local4176 = Math.sqrt((_local4281 - _local4280) * (_local4281 - _local4280) + (_local4277 - _local4276) * (_local4277 - _local4276));
			_local4176 = PixelUtil.y0.ij(_local4176, l.m7, _local4162, _local4280 == _local4281 ? l.m : l.n);
			var _local4182 = new Point2D((m + jq) / 2, (p + iv) / 2);
			d.fillStyle = NamedTabPanel.ut([.9, .2, .2, 1]);
			var _local4181 = d.measureText(kq).width;
			d.fillRect(_local4182.x - _local4181 / 2 - _local4237 * _local4173, _local4182.y - 3.5 * _local4237 * _local4173, _local4181 + 2 * _local4237 * _local4173, 7 * _local4237 * _local4173);
			d.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
			d.save();
			d.translate(_local4182.x - _local4181 / 2, _local4182.y + 2 * hn * iw);
			d.scale(.1, .1);
			d.font = e * 9 + "px sans-serif";
			d.fillText(kq, 0, 0);
			d.restore();
		}
	}
	if (_local4162.Wi) {
		if (_local4247.vr && l.u.N > 10 && l.add.fvec == null) {
			this.C9(l, d, 1, 1, .25, _local4247.ra, 16777215);
			_local4174 = !0;
		}
		if (_local4247.Sp) {
			var _local4186 = PixelUtil.y0.Sw(_local4247.rp, l.m7, l.m, _local4247.v7),
				_local4187 = _local4186;
			if (_local4247.v7 == 4) _local4187 *= l.n / l.m;
			this.C9(l, d, _local4186, _local4187, 1, _local4247.ra, _local4247.E6);
			_local4174 = !0;
		}
		if (_local4247.qz) {
			var _local4194 = l.Ww(),
				_local4155 = l.bZ(),
				_local4191 = Math.max(l.u.Vm.m, l.u.Vm.n) / l.u.N;
			_local4191 = Math.max(Math.max(l.m, l.n) * 2, _local4191);
			for (var _local4189 = 0; _local4189 < _local4194[0].length; _local4189++) {
				var _local4188 = _local4194[0][_local4189],
					_local4190 = _local4194[1][_local4189];
				if (_local4190 != -1 && _local4190 != _local4155) continue;
				var _local4193 = G.dN(_local4188[1], _local4188[1]),
					_local4192 = G.Zx(Math.floor(_local4193.x) + .5, Math.floor(_local4193.y) + .5);
				d.beginPath();
				d.strokeStyle = NamedTabPanel.ut([0, _local4190 == -1 ? 1 : .5, 1, 1]);
				if (_local4188[0] == 0) {
					var _local4275 = _local4192.x;
					d.moveTo(_local4275, -_local4191);
					d.lineTo(_local4275, _local4191);
				} else {
					var _local4279 = _local4192.x;
					d.moveTo(-_local4191, _local4279);
					d.lineTo(_local4191, _local4279);
				}
				d.stroke();
				_local4174 = !0;
			}
		}
		var _local4264 = l.Vp;
		if (_local4247.Vp && _local4264.length != 0) {
			d.font = _local4185 * .8 + "px sans-serif";
			var _local4262 = [],
				_local4258 = [];
			for (var _local4260 = 0; _local4260 < _local4264.length; _local4260++) {
				var _local4261 = f.UA.LP(_local4264, _local4260);
				_local4262.push(_local4261);
				if (l.Ci.indexOf(_local4260) != -1) _local4258.push(_local4261);
			}
			_local4262.reverse();
			var _local4265 = Date.now();
			_local4262 = PixelUtil.rect.FA([0, 0, l.m, l.n], _local4262);
			for (var _local4195 = 0; _local4195 < 2; _local4195++)
			for (var _local4207 = 0; _local4207 < _local4262.length; _local4207++) {
				var _local4255 = _local4262[_local4207],
					_local4263 = _local4255[4],
					_local4259 = _local4263 != null ? _local4264[_local4263] : null;
				if (_local4259 && _local4195 == 0 || _local4259 == null && _local4195 == 1) continue;
				var _local4276 = Math.round(_local4255[0]),
					_local4280 = Math.round(_local4255[1]),
					_local4277 = Math.round(_local4255[2]),
					_local4281 = Math.round(_local4255[3]);
				d.strokeStyle = d.fillStyle = NamedTabPanel.ut(f7 ? [0, .7, .7, 1] : [.8, .8, .8, 1]);
				d.strokeRect(_local4276 + _local4196, _local4280 + _local4196, _local4277 - _local4276, _local4281 - _local4280);
				var _local4215 = _local4207 + 1,
					_local4216 = d.measureText(_local4215),
					_local4217 = _local4216.width;
				d.fillRect(_local4276, _local4280, _local4217 + _local4185 / 2, _local4185);
				d.fillStyle = NamedTabPanel.ut([1, 1, 1, 1]);
				d.fillText(_local4215, _local4276 + _local4185 / 4, _local4280 + _local4185 * .8);
			}
			var _local4201 = 2 / l.u.N,
				_local4202 = 2 * _local4201;
			for (var _local4207 = 0; _local4207 < _local4258.length; _local4207++) {
				var _local4255 = _local4258[_local4207],
					_local4276 = Math.round(_local4255[0]),
					_local4280 = Math.round(_local4255[1]),
					_local4277 = Math.round(_local4255[2]),
					_local4281 = Math.round(_local4255[3]);
				d.strokeStyle = d.fillStyle = NamedTabPanel.ut([1, .6, 0, 1]);
				d.strokeRect(_local4276 + _local4196, _local4280 + _local4196, _local4277 - _local4276, _local4281 - _local4280);
				var _local4170 = [_local4276, _local4280, _local4277, _local4280, _local4277, _local4281, _local4276, _local4281];
				for (var _local4165 = 0; _local4165 < _local4170.length; _local4165 += 2) {
					var _local4171 = _local4170[_local4165],
						_local4172 = _local4170[_local4165 + 1],
						_local4230 = _local4170[_local4165 + 2 & 7],
						_local4231 = _local4170[_local4165 + 3 & 7];
					d.fillRect(_local4171 - _local4201, _local4172 - _local4201, _local4202, _local4202);
					d.fillRect(Math.round((_local4171 + _local4230) / 2) - _local4201, Math.round((_local4172 + _local4231) / 2) - _local4201, _local4202, _local4202);
				}
			}
			_local4174 = !0;
		}
		var _local4213 = l.add.Anno;
		if (_local4213 && _local4213.length != 0)
		for (var _local4150 = 0; _local4150 < _local4213.length; _local4150++) {
			var _local4209 = _local4213[_local4150],
				_local4152 = _local4209[2],
				_local4205 = _local4209[0] - gX,
				_local4183 = _local4209[1] - gX,
				_local4212 = 30 / G.ma,
				_local4206 = .4 * _local4212,
				_local4214 = .6 * _local4212;
			d.beginPath();
			d.moveTo(_local4205, _local4183 + _local4214);
			d.lineTo(_local4205, _local4183);
			d.lineTo(_local4205 + _local4212, _local4183);
			d.lineTo(_local4205 + _local4212, _local4183 + _local4212);
			d.lineTo(_local4205 + _local4206, _local4183 + _local4212);
			d.closePath();
			d.lineTo(_local4205 + _local4206, _local4183 + _local4214);
			d.lineTo(_local4205 + _local4206, _local4183 + _local4212);
			if (_local4150 == l.u.$m) {
				d.lineWidth *= 5;
				d.strokeStyle = NamedTabPanel.ut([0, 0, 0, .5]);
				d.stroke();
				d.lineWidth /= 5;
			}
			d.fillStyle = NamedTabPanel.ut([_local4152.o / 255, _local4152.J / 255, _local4152.k / 255, 1]);
			d.fill();
			d.strokeStyle = NamedTabPanel.ut([0, 0, 0, 1]);
			d.stroke();
		}
	}
	d.strokeStyle = NamedTabPanel.ut([1, 0, 0, 1]);
	if (l.I.Cj) {
		this.yC(l.I.Cj, _local4197, d);
		d.stroke();
	}
	d.restore();

	// hbi: render rulers
	_local4162.bI = true;

	if (_local4162.bI) {
		if (l.u.C5 == null || l.u.C5.width != l.u.Vm.m || l.u.XF.height != l.u.Vm.n) {
			l.u.X7 = d.createImageData(PixelUtil.y0.mT, PixelUtil.y0.mT);
			l.u.C5 = d.createImageData(l.u.Vm.m, PixelUtil.y0.mT);
			l.u.XF = d.createImageData(PixelUtil.y0.mT, l.u.Vm.n);
		}
		var _local4270 = ThemeManager.themes[_local4162.j$],
			_local4157 = 0,
			_local4158 = 0,
			_local4156 = l.m,
			_local4154 = l.n;
		if (l.bZ() != -1) {
			var _local4153 = l.B[l.bZ()].dA();
			_local4157 = _local4153.x;
			_local4158 = _local4153.y;
			_local4156 = _local4153.m;
			_local4154 = _local4153.n;
		}
		_local4157 *= G.N;
		_local4158 *= G.N;
		var _local4273 = l.u,
			_local4271 = [1, l.m7, l.m7 / 2.54, l.m7 / 25.4, _local4156 / 100][_local4247.SF],
			_local4178 = _local4273.N * l.m / 2,
			_local4177 = _local4273.N * l.n / 2,
			_local4278 = [_local4273.N * _local4271, new Point2D(_local4273.R.x + (_local4157 + _local4178 * _local4271 - _local4178), _local4273.R.y + (_local4158 + _local4177 * _local4271 - _local4177))];
		if (_local4247.SF == 4) _local4271 *= _local4154 / _local4156;
		var _local4282 = [_local4273.N * _local4271, new Point2D(_local4273.R.x + (_local4157 + _local4178 * _local4271 - _local4178), _local4273.R.y + (_local4158 + _local4177 * _local4271 - _local4177))],
			_local4228 = this.zS.YE;
		PixelUtil.y0.rulers(_local4273, Math.floor(_local4228.x), Math.floor(_local4228.y), _local4278, _local4282);
		var _local4169 = LayerCanvasPanel.ae$(_local4273.N, NamedTabPanel.ut([1, 1, 1, 1]), l.m, l.n);
		NamedTabPanel._f(l.u.XF.data);
		NamedTabPanel._f(l.u.C5.data);
		NamedTabPanel._f(l.u.X7.data);
		d.putImageData(l.u.XF, 0, 72); // left ruler
		d.putImageData(l.u.C5, 0, 72); // top ruler
		d.putImageData(l.u.X7, 0, 72); // ruler corner
		// zoom percentage and "width x height"
		d.putImageData(_local4169, 50, l.u.Vm.n - _local4169.height - 50);
	}
	if (l.I.P4.length != 0) {
		for (var _local4150 = 0; _local4150 < l.I.P4.length; _local4150++) {
			var _local4164 = l.I.P4[_local4150],
				_local4151 = _local4164[1];
			d.putImageData(new ImageData(new Uint8ClampedArray(_local4164[0].buffer), _local4151.m, _local4151.n), _local4151.x, _local4151.y);
		}
	}
	return _local4174 || _local4162.bI;
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
		_local4296 = "\t\t\tprecision mediump float;\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform sampler2D target;\t\t\t" + (l ? "uniform sampler2D lut;  uniform float N;  " + WebGLContext.Li.z7 : "") + "\t\t\tuniform vec3 contSizeZoom;\t\t\tuniform vec2 cnvSize;\t\t\tuniform mat4 ctrn; \t\t\t" + (_local4298 ? "uniform vec4 bgClr;  uniform vec4 ars[" + d + "]; " : "") + "\t\t\t\t\t\tvarying vec2 tCoord;\t\t\tvarying vec2 sCoord;\t\t\tvarying vec2 gCoord;\t\t\t\t\t\t/* This approximates the error function, needed for the gaussian integral */ \t\t\tvec4 erf(vec4 x) { \t\t\t  vec4 s = sign(x), a = abs(x);\t\t\t  x = 1.0 + (0.278393 + (0.230389 + 0.078108 * (a * a)) * a) * a;\t\t\t  x *= x;  \t\t\t  return s - s / (x * x); \t\t\t} \t\t\t/* Return the mask for the shadow of a box from lower to upper */  \t\t\tfloat boxShadow(vec2 lower, vec2 upper, vec2 point, float sigma) { \t\t\t  vec4 query = vec4(point - lower, point-upper); \t\t\t  vec4 integral = 0.5 + 0.5 * erf(query * (sqrt(0.5) / sigma)); \t\t\t  return (integral.z - integral.x) * (integral.w - integral.y); \t\t\t} \t\t\t\t\t\tvec4 simpleBlend(vec4 src, vec4 tgt) {\t\t\t\tfloat na = src.w + tgt.w*(1.0-src.w);\t\t\t\t/* avoid division by zero */ \t\t\t\treturn na==0.0 ? vec4(0,0,0,0) : vec4( (src.xyz*src.w + tgt.w*tgt.xyz*(1.0-src.w))*(1.0/na), na);\t\t\t} \t\t\t\t\t\t" + WebGLContext.Li.Qy + "\t\t\t\t\t\tvoid main(void) {\t\t\t\tvec4 src = texture2D(source, tCoord); \t\t\t\tvec4 tgt = texture2D(target, sCoord" + (G ? "-floor(sCoord)" : "") + "); \t\t\t\t" + (l ? "tgt.rgb = mapLut(tgt, lut, N).rgb; " : "") + "\t\t\t\ttgt = ctrn * tgt; " + (_local4298 ? "\t\t\t\t\tbool inr = false; vec4 BG = bgClr; \t\t\t\t\tfor(int i=0; i<" + d + "; i++) { \t\t\t\t\t\tvec4 ar = ars[i]; \t\t\t\t\t\tvec2 nsc = sCoord - ar.xy; \t\t\t\t\t\tif( ar.z!=0.0 && in01(nsc/ar.zw) ){\t\t\t\t\t\tinr=true; BG=mod(floor(gCoord.x) + floor(gCoord.y), 2.0)==1.0 ? vec4(0.784,0.784,0.784,1) : vec4(1,1,1,1); }\t\t\t\t\t}\t\t\t\t" : "\t\t\t\t\tfloat shdw = 0.3*boxShadow(vec2(0,0),contSizeZoom.xy, sCoord*contSizeZoom.xy+vec2(0.0,-6.0*contSizeZoom.z) , 10.0*contSizeZoom.z);\t\t\t\t\tvec4 grid = mod(floor(gCoord.x) + floor(gCoord.y), 2.0)==1.0 ? vec4(0.784,0.784,0.784,1) : vec4(1,1,1,1);\t\t\t\t\tvec4 BG = " + _local4297 + " ? grid : vec4(0.0,0.0,0.0,shdw); \t\t\t\t") + "\t\t\t\tvec4 outc = " + _local4297 + " ?  simpleBlend(tgt,BG) :  BG ;  \t\t\t\tif(src.b == 0.0 && src.a >0.5) gl_FragColor = mix(outc, vec4(vec3(1,1,1)-outc.rgb,1.0), src.w); \t\t\t\telse             gl_FragColor = simpleBlend(src,outc); \t\t\t\t\t\t\t}",
		_local4299 = "\t\t\tattribute vec2 verPos;\t\t\tvarying vec2 tCoord;\t\t\tvarying vec2 sCoord;\t\t\tvarying vec2 gCoord;\t\t\t\t\t\tuniform mat3 tmat;\t\t\tuniform vec4 gsize;\t\t\tvoid main(void) {\t\t\t\ttCoord = verPos;\t\t\t\tsCoord = (tmat*vec3(verPos,1.0)).xy;\t\t\t\tgCoord = (verPos-gsize.zw) * gsize.xy ; \t\t\t\tgl_Position = vec4(vec2(-1.0, 1.0) + 2.0*vec2(verPos.x,-verPos.y), 0.0, 1.0);\t\t\t}";
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


function BrushPencilOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "strn"]);
}
BrushPencilOptions.prototype = new ToolOptionsWithKeys();

function BrushPaintOptions() {
	ToolOptionsWithKeys.call(this, "brush bmode opacity flow smth prsr".split(" "));
}
BrushPaintOptions.prototype = new ToolOptionsWithKeys();

function MixerBrushOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "bmode0", "samp", "wconf"]);
}
MixerBrushOptions.prototype = new ToolOptionsWithKeys();

function BrushOnlyOptions() {
	ToolOptionsWithKeys.call(this, ["brush"]);
}
BrushOnlyOptions.prototype = new ToolOptionsWithKeys();

function BrushMainOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "bmode", "opacity", "smth", "prsr"]);
}
BrushMainOptions.prototype = new ToolOptionsWithKeys();

function DodgeBurnOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "rng", "expo"]);
}
DodgeBurnOptions.prototype = new ToolOptionsWithKeys();

function CloneStampOptions() {
	ToolOptionsWithKeys.call(this, "brush bmode opacity algnd sfrom alt".split(" "));
}
CloneStampOptions.prototype = new ToolOptionsWithKeys();


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
			_local4446 = aM.mI = new ContextPanel(_local4448.items, _local4448.iD);
		}
		_local4446.refresh();
		_local4446.parent = this;
		_local4446.update(l.T1, l.wQ);
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


function MagicWandToolOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "redge", "wconf", "sall"]);
}
MagicWandToolOptions.prototype = new ToolOptionsWithFeatures(!0);

function PatchToolOptions() {
	ToolOptionsWithKeys.call(this, ["setop", "patch"]);
}
PatchToolOptions.prototype = new ToolOptionsWithKeys();

function QuickSelectionToolOptions() {
	ToolOptionsWithKeys.call(this, ["setop"]);
}
QuickSelectionToolOptions.prototype = new ToolOptionsWithKeys();

function QuickSelectModeOptions() {
	ToolOptionsWithKeys.call(this, ["bmode", "opacity", "wconf", "sall"]);
}
QuickSelectModeOptions.prototype = new ToolOptionsWithKeys();

function PolygonalLassoOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "anta", "redge"]);
}
PolygonalLassoOptions.prototype = new ToolOptionsWithFeatures(!0);

function MagneticLassoOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "anta", "redge"]);
}
MagneticLassoOptions.prototype = new ToolOptionsWithFeatures(!0);

function ObjectSelectToolOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "redge", "cstr"]);
}
ObjectSelectToolOptions.prototype = new ToolOptionsWithFeatures(!0);


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


function BrushEraserBrushOptions() {
	BrushEraserOptionsBase.call(this, !1);
}
BrushEraserBrushOptions.prototype = new BrushEraserOptionsBase();

function BrushEraserEraserOptions() {
	BrushEraserOptionsBase.call(this, !0);
}
BrushEraserEraserOptions.prototype = new BrushEraserOptionsBase();

function SpongeOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "rng", "expo"]);
}
SpongeOptions.prototype = new ToolOptionsWithKeys();

function EraserBrushOptions() {
	ToolOptionsWithKeys.call(this, "brush emode opacity flow smth prsr".split(" "));
}
EraserBrushOptions.prototype = new ToolOptionsWithKeys();

function MixerBrushWetOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "samp", "wconf"]);
}
MixerBrushWetOptions.prototype = new ToolOptionsWithKeys();


function MarqueeToolOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "anta", "redge", "cstr"]);
}
MarqueeToolOptions.prototype = new ToolOptionsWithFeatures(!0);

function EyedropperToolOptions() {
	ToolOptionsBase.call(this);
	var _local4468 = this.pK = [
	new DropdownMenu("Sample Size", ["1x1", "3x3", "5x5", "11x11", "31x31"]),
	new DropdownMenu("Source", ["Current Layer", "Current & Below", "All Layers"]),
	new CheckboxControl("Sampling Ring"),
	new CheckboxControl("Zoom In")];
	_local4468[1].c(2);
	_local4468[2].c(!0);
	for (var _local4466 = 0; _local4466 < _local4468.length; _local4466++) {
		var _local4467 = _local4468[_local4466];
		_local4467.addListener(ActionTypes.E.A, this.S9, this);
		this.body.appendChild(_local4467.e);
	}
}
EyedropperToolOptions.prototype = new ToolOptionsBase();
EyedropperToolOptions.prototype.S9 = function (l) {
	var _local4472 = this.pK,
		_local4470 = [];
	for (var _local4469 = 0; _local4469 < _local4472.length; _local4469++) _local4470[_local4469] = _local4472[_local4469].b();
	var _local4471 = new Action(ActionTypes.E.L, !0);
	_local4471.data = {
		a: ActionTypes.$.kl,
		G: this.G,
		HS: _local4470
	};
	this.dispatch(_local4471);
};
EyedropperToolOptions.prototype.lx = function () {
	for (var _local4473 = 0; _local4473 < this.pK.length; _local4473++) this.pK[_local4473].refresh();
};

function GradientToolOptions() {
	ToolOptionsBase.call(this);
	this.iB = new GradientPickerButton(!1);
	this.iB.parent = this;
	this.iB.addListener(ActionTypes.E.A, this.Rx, this);
	this.body.appendChild(this.iB.e);
	this.iB.c(JSON.parse(LayerStyleConstants.descriptorJsonFragments.ace).v);
	this.y8 = new DropdownMenu(null, LayerStyleConstants.gradientType.names.slice(0, 5));
	this.y8.addListener(ActionTypes.E.A, this.Rx, this);
	this.body.appendChild(this.y8.e);
	this.HV = new DropdownMenu("Blend Mode", au.YJ, au.hY);
	this.HV.addListener(ActionTypes.E.A, this.Rx, this);
	this.body.appendChild(this.HV.e);
	this.O$ = new RangeDropInput("Opacity", 0, 100, "%");
	this.O$.parent = this;
	this.O$.addListener(ActionTypes.E.A, this.Rx, this);
	this.body.appendChild(this.O$.e);
	this.O$.c(100);
	this.wW = new CheckboxControl("Reverse");
	this.wW.addListener(ActionTypes.E.A, this.Rx, this);
	this.body.appendChild(this.wW.e);
	this.zL = new CheckboxControl("Dither");
	this.zL.addListener(ActionTypes.E.A, this.Rx, this);
	this.body.appendChild(this.zL.e);
}
GradientToolOptions.prototype = new ToolOptionsBase();
GradientToolOptions.prototype.lx = function () {
	this.y8.refresh();
	this.HV.refresh();
	this.O$.refresh();
	this.wW.refresh();
	this.zL.refresh();
};
GradientToolOptions.prototype.BM = function (l, d) {
	ToolOptionsBase.prototype.BM.call(this, l, d);
	var _local4474 = d == PsdResourceTypes.K5;
	this.iB.B$(l.Y7, l.GF);
	if (_local4474 || d == PsdResourceTypes.Rz || d == PsdResourceTypes.Wx) this.iB.Z2(l.dR);
};
GradientToolOptions.prototype.Rx = function () {
	var _local4475 = new Action(ActionTypes.E.L, !0);
	_local4475.data = {
		a: ActionTypes.$.kl,
		G: this.G
	};
	_local4475.data.Oo = {
		K: this.iB.b(),
		x1: LayerStyleConstants.gradientType.types[this.y8.b()],
		as: this.wW.dB(),
		O_: this.zL.dB(),
		awp: au.CP[this.HV.b()],
		uh: this.O$.b() / 100
	};
	this.dispatch(_local4475);
};


function ColorSamplerToolOptions() {
	ToolOptionsBase.call(this);
	this.EC = new CheckboxControl("All Documents");
	this.body.appendChild(this.EC.e);
	this.EC.addListener(ActionTypes.E.A, this.S9, this);
}
ColorSamplerToolOptions.prototype = new ToolOptionsBase();
ColorSamplerToolOptions.prototype.S9 = function () {
	var _local4477 = {
			a: ActionTypes.$.kl,
			G: this.G,
			In: this.EC.b()
		},
		_local4476 = new Action(ActionTypes.E.L, !0);
	_local4476.data = _local4477;
	this.dispatch(_local4476);
};

function GradientAngleToolOptions() {
	ToolOptionsBase.call(this);
	var _local4480 = s.createElement("span", "fitem");
	this.body.appendChild(_local4480);
	this.NN = [
	new RangeDropInput("Angle", -180, 180, "\xB0"),
	new ToolbarButton("Reset", null, null, !0)];

	for (var _local4478 = 0; _local4478 < this.NN.length; _local4478++) {
		var _local4479 = this.NN[_local4478];
		_local4479.parent = this;
		_local4480.appendChild(_local4479.e);
		_local4479.addListener(_local4478 == 1 ? "click" : ActionTypes.E.A, this.bL, this);
	}
}
GradientAngleToolOptions.prototype = new ToolOptionsBase();
GradientAngleToolOptions.prototype.lx = function () {
	for (var _local4481 = 0; _local4481 < this.NN.length; _local4481++) this.NN[_local4481].refresh();
};
GradientAngleToolOptions.prototype.IF = function (l) {
	this.NN[0].c(l.cg * 180 / Math.PI);
};
GradientAngleToolOptions.prototype.bL = function (l) {
	var _local4483 = this.NN.indexOf(l.target),
		_local4482 = new Action(ActionTypes.E.L, !0);
	_local4482.data = {
		a: ActionTypes.$.kl,
		G: this.G,
		cg: _local4483 == 1 ? 0 : l.target.b() * Math.PI / 180
	};
	this.dispatch(_local4482);
};

function CloneStampAlignOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "algnd", "sfrom", "alt"]);
}
CloneStampAlignOptions.prototype = new ToolOptionsWithKeys();

function RoundedRectOptions() {
	ShapeVectorToolOptions.call(this, ["fstyle", "sstyle", "crnr", "psnap"]);
}
RoundedRectOptions.prototype = new ShapeVectorToolOptions();

function RectangleShapeOptions() {
	ShapeVectorToolOptions.call(this, "tmode make anta fstyle sstyle binop cstr crad".split(" "));
}
RectangleShapeOptions.prototype = new ShapeVectorToolOptions();

function PolygonShapeOptions() {
	ShapeVectorToolOptions.call(this, "tmode make anta fstyle sstyle binop cstr".split(" "));
}
PolygonShapeOptions.prototype = new ShapeVectorToolOptions();

function PolygonStarOptions() {
	ShapeVectorToolOptions.call(this, "tmode make anta fstyle sstyle binop pshape sides irad crad width aopts length".split(" "));
	this.nJ.aopts.c([!1, !0, 50, 60, 0]);
}
PolygonStarOptions.prototype = new ShapeVectorToolOptions();
PolygonStarOptions.prototype.aom = function (A) {
	var _local4594 = [
	["sides", "crad"],
	["sides", "irad", "crad"],
	["width", "aopts"],
	["length"]];

	return "tmode make fstyle sstyle binop pshape".split(" ").concat(_local4594[A]);
};

function LineArrowOptions() {
	ShapeVectorToolOptions.call(this, "tmode make anta fstyle sstyle binop width aopts".split(" "));
}
LineArrowOptions.prototype = new ShapeVectorToolOptions();

function CustomShapeOptions() {
	ShapeVectorToolOptions.call(this, "tmode make anta fstyle sstyle binop cstr shape".split(" "));
}
CustomShapeOptions.prototype = new ShapeVectorToolOptions();

function MagicEraserOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "redge"]);
}
MagicEraserOptions.prototype = new ToolOptionsWithFeatures(!0);

function BlurSharpenOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "qsmode", "redge"]);
}
BlurSharpenOptions.prototype = new ToolOptionsWithKeys();

function SliceToolOptions() {
	ToolOptionsBase.call(this);
	this.$c = [];
	for (var _local4595 = 0; _local4595 < 2; _local4595++) {
		var _local4596 = new ToolbarButton(_local4595 == 0 ? "Slices from Guides" : "Divide...", null, null, !0);
		this.$c.push(_local4596);
		_local4596.addListener("click", this.Q3, this);
		this.body.appendChild(_local4596.e);
	}
}
SliceToolOptions.prototype = new ToolOptionsBase();
SliceToolOptions.prototype.Q3 = function (l) {
	var _local4597;
	if (this.$c.indexOf(l.target) == 0) {
		_local4597 = new Action(ActionTypes.E.g5, !0);
		_local4597.data = {
			kT: "make",
			a0: {
				__name: "Make",
				classID: "Mk",
				null: {
					t: "obj ",
					v: [{
						t: "Clss",
						v: {
							classID: "slice"
						}
					}]
				},
				Usng: {
					t: "type",
					v: {
						classID: "Gd"
					}
				}
			}
		};
	} else {
		_local4597 = new Action(ActionTypes.E.L, !0);
		_local4597.data = {
			a: ActionTypes.$.SN,
			GU: "divslice"
		};
	}
	this.dispatch(_local4597);
};
SliceToolOptions.prototype.lx = function (l) {
	for (var _local4598 = 0; _local4598 < this.$c.length; _local4598++) this.$c[_local4598].refresh();
};

function SliceSelectToolOptions() {
	ToolOptionsBase.call(this);
	var _local4601 = this.hc = [
	new ToolbarButton("\u25BC", null, null, !0),
	new ToolbarButton("\u25B2", null, null, !0),
	new ToolbarButton("Delete", null, null, !0),
	new ToolbarButton("Divide...", null, null, !0)];

	for (var _local4599 = 0; _local4599 < 4; _local4599++) {
		var _local4600 = _local4601[_local4599];
		this.body.appendChild(_local4600.e);
		_local4600.addListener("click", this.Q3, this);
	}
}
SliceSelectToolOptions.prototype = new ToolOptionsBase();
SliceSelectToolOptions.prototype.Q3 = function (l) {
	var _local4603 = this.hc.indexOf(l.target),
		_local4602;
	if (_local4603 == 3) {
		_local4602 = new Action(ActionTypes.E.L, !0);
		_local4602.data = {
			a: ActionTypes.$.SN,
			GU: "divslice"
		};
	} else {
		_local4602 = new Action(ActionTypes.E.v, !0);
		_local4602.G = f.E7;
		_local4602.data = {
			a: _local4603 == 2 ? "delete" : "reorder",
			dir: _local4603 == 0 ? -1 : 1
		};
	}
	this.dispatch(_local4602);
};
SliceSelectToolOptions.prototype.refresh = function () {
	ToolOptionsBase.prototype.refresh.call(this);
	for (var _local4604 = 0; _local4604 < 4; _local4604++) this.hc[_local4604].refresh();
};

function TypeToolMainOptions() {
	ToolOptionsBase.call(this);
	this.X3 = new TypeToolPanel();
	this.X3.parent = this;
	this.body.appendChild(this.X3.re.e);
	this.body.appendChild(this.X3.rk.e);
	this.body.appendChild(this.X3.xV.e);
	this.body.appendChild(this.X3.rz.e);
	var _local4484 = s.createElement("span", "fitem");
	this.body.appendChild(_local4484);
	_local4484.appendChild(this.X3.eM.e);
	_local4484.appendChild(this.X3.Bx.e);
	_local4484.appendChild(this.X3.j7.e);
	this.E_ = new DropdownMenu("Aa", [
	"None",
	"Sharp",
	"Crisp",
	"Strong",
	"Smooth"]
	);
	this.E_.addListener(ActionTypes.E.A, this.aL, this);
	this.body.appendChild(this.E_.e);
	this.eL = new ToolbarButton("Warp", !1, null, !0);
	this.eL.addListener("click", this.a3N, this);
	this.body.appendChild(this.eL.e);
	this.P_ = new ConfirmCancelButtons();
	this.P_.addListener("click", this.aL, this);
}
TypeToolMainOptions.prototype = new ToolOptionsBase();
TypeToolMainOptions.prototype.lx = function () {
	this.P_.refresh();
	this.X3.refresh();
	this.eL.refresh();
};
TypeToolMainOptions.prototype.a3N = function (l) {
	var _local4486 = {
			a: ActionTypes.$.kl,
			G: this.G,
			DI: "showwarp"
		},
		_local4485 = new Action(ActionTypes.E.L, !0);
	_local4485.data = _local4486;
	this.dispatch(_local4485);
};
TypeToolMainOptions.prototype.IF = function (l) {
	if (l.DI == "showactive") this.body.appendChild(this.P_.e);
	if (l.DI == "hideactive") this.body.removeChild(this.P_.e);
	if (l.DI == "changeAA") this.E_.c(l.mz);
	if (l.DI == "showpan") {
		var _local4491 = [{
				name: [0, 1],
				xX: !0
			}],
			_local4487 = [{
				Y: ActionTypes.E.v,
				G: f.zl,
				W: {
					a: "editCurr",
					ca: l.ca
				}
			}],
			_local4490 = l.Zm;
		if (l.a1w) {
			_local4491 = [{
				name: ["VAR0: VAR1", [0, 5],
				[7, 0]],

				xX: !0
			}];
			_local4487 = [{
				Y: ActionTypes.E.g5,
				W: f.GS.Cc(!0)
			}];
			var _local4489 = hs.ade();
			_local4491 = _local4491.concat(_local4489[0]);
			_local4487 = _local4487.concat(_local4489[1]);
		}
		_local4491.push({
			name: [11, 9]
		});
		_local4487.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.kl,
				G: this.G,
				DI: "showwarp"
			}
		});
		var _local4488 = new ContextPanel(_local4491, _local4487);
		_local4488.parent = this;
		_local4488.refresh();
		_local4488.update(l.T1, l.wQ);
		var _local4492 = new Action(ActionTypes.E.L, !0);
		_local4492.data = {
			a: ActionTypes.$.dY,
			A3: _local4488,
			x: _local4490.pf + 2,
			y: _local4490.pi + 1
		};
		this.dispatch(_local4492);
	}
};
TypeToolMainOptions.prototype.BM = function (l, d) {
	ToolOptionsBase.prototype.BM.call(this, l, d);
	if (d != PsdResourceTypes.Wx && d != PsdResourceTypes.o$ && d != PsdResourceTypes.jz && d != PsdResourceTypes.GG) return;
	this.X3.c(l.XG, l.Hg, l.fL);
};
TypeToolMainOptions.prototype.aL = function (l) {
	var _local4494 = {
		a: ActionTypes.$.kl,
		G: this.G,
		DI: this.P_.b() ? "commit" : "cancel"
	};
	if (l.target == this.E_) {
		_local4494.DI = "changeAA";
		_local4494.mz = this.E_.b();
	}
	var _local4493 = new Action(ActionTypes.E.L, !0);
	_local4493.data = _local4494;
	this.dispatch(_local4493);
};

function LassoToolOptions() {
	ToolOptionsWithFeatures.call(this, !1, ["binop", "feat", "anta", "redge"]);
}
LassoToolOptions.prototype = new ToolOptionsWithFeatures(!0);



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
	if (l.y3 == "vals")
	for (var _local4546 in l.ajy) this.nJ[_local4546].c(l.ajy[_local4546]);else
	{
		var _local4544 = ShapeVectorToolOptions.mI;
		if (_local4544 == null) _local4544 = ShapeVectorToolOptions.mI = new ContextPanel([{
			name: "Remove Anchor Point",
			p: function (V) {
				var _local4547 = V ? V.LW() : null;
				return {
					p: V && _local4547[1].length != 0 && _local4547[0][_local4547[1][0]].add.vmsk.OE.length != 0
				};
			}
		}, {
			name: "Remove Path",
			p: function (V) {
				var _local4548 = V ? V.LW() : null;
				return {
					p: V && _local4548[1].length != 0 && _local4548[0][_local4548[1][0]].add.vmsk.g.length != 0
				};
			},
			xX: !0
		}, {
			name: "Make Selection"
		}, {
			name: [2, 3]
		}, {
			name: [14, 9]
		}], [{
			Y: ActionTypes.E.v,
			G: f.Kp,
			W: {
				a: "remove",
				S6: !0
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.o2,
			W: {
				a: "remove"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "makesel"
			}
		}, {
			Y: ActionTypes.E.g5,
			W: f.nr.xs(0)
		}, {
			Y: ActionTypes.E.g5,
			W: f.nr.xs(1)
		}]);
		_local4544.parent = this;
		_local4544.update(l.T1, l.wQ);
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

function RectangleEllipseShapeOptions() {
	ShapeVectorToolOptions.call(this, ["tmode", "make", "fstyle", "sstyle", "binop"], !0);
}
RectangleEllipseShapeOptions.prototype = new ShapeVectorToolOptions();

function EllipseShapeOptions() {
	ShapeVectorToolOptions.call(this, "tmode make anta fstyle sstyle binop".split(" "));
}
EllipseShapeOptions.prototype = new ShapeVectorToolOptions();

function PathDirectSelectOptions() {
	ShapeVectorToolOptions.call(this, ["fstyle", "sstyle"]);
	this.apB = null;
	this.aqc = null;
	this.azk = null;
	this.Oq = new DropdownMenu("Path", ["Unite", "Subtract", "Intersect", "Exclude", "Merge"], [4]);
	this.Pg = new ToolbarButton("\u25BC");
	this.Pg.Nu();
	this.Rm = new ToolbarButton("\u25B2");
	this.Rm.Nu();
	this.iw = [this.Oq, this.Pg, this.Rm];
	for (var _local4566 = 0; _local4566 < this.iw.length; _local4566++) {
		var _local4567 = this.iw[_local4566];
		this.body.appendChild(_local4567.e);
		_local4567.parent = this;
		_local4567.addListener(_local4566 == 0 ? ActionTypes.E.A : "click", this.Q3, this);
	}
}
PathDirectSelectOptions.prototype = new ShapeVectorToolOptions();
PathDirectSelectOptions.prototype.IF = function (l) {
	if (l.DI == "main") {
		var _local4574 = this.iw,
			_local4569 = l.N4;
		if (_local4569) {
			this.aqc = _local4569.clone();
			this.azk = JSON.stringify(l.X);
			var _local4573 = _local4569.g.slice(0),
				_local4572 = _local4573.length;
			for (var _local4568 = 0; _local4568 < _local4573.length; _local4568++) _local4573[_local4568]++;
			_local4573.sort(function (y, e) {
				return y - e;
			});
			_local4574[0].enable();
			_local4574[1].setEnabled(_local4572 != 0);
			_local4574[2].setEnabled(_local4572 != 0);
			_local4574[0].setLabel(_local4572 == 0 ? "No Paths" : _local4572 == 1 ? "Path " + _local4573[0] : "Paths " + _local4573.slice(0, 3).join(",") + (_local4572 > 3 ? ".." : ""));
			if (_local4572 != 0) {
				var _local4571 = _local4569.g[0],
					_local4575 = PixelUtil.path.W7(_local4569.i, _local4571),
					_local4570 = _local4569.i[_local4575];
				this.Oq.c([3, 0, 1, 2][_local4570.H$]);
			}
		} else
		for (var _local4568 = 0; _local4568 < _local4574.length; _local4568++) _local4574[_local4568].disable();
	} else ShapeVectorToolOptions.prototype.IF.call(this, l);
};
PathDirectSelectOptions.prototype.lx = function () {
	ShapeVectorToolOptions.prototype.lx.call(this);
	this.Oq.refresh();
};
PathDirectSelectOptions.prototype.Q3 = function (l) {
	if (l.target == this.Oq || l.target == this.Pg || l.target == this.Rm) {
		var _local4586 = {},
			_local4577 = this.aqc,
			_local4585 = _local4577.i,
			_local4584 = _local4577.g,
			_local4581 = PixelUtil.path.Mh(_local4585),
			_local4592 = JSON.parse(this.azk);
		_local4584.sort(function (Y, k) {
			return Y - k;
		});
		if (l.target == this.Oq) {
			var _local4578 = this.Oq.b();
			if (_local4578 < 4)
			for (var _local4576 = 0; _local4576 < _local4584.length; _local4576++) _local4585[PixelUtil.path.W7(_local4585, _local4584[_local4576])].H$ = [1, 2, 3, 0][_local4578];else
			{
				if (_local4581 <= 1) return;
				_local4577.i = PixelUtil.path.FontHelper(_local4585);
				_local4577.g = _local4577.i.length == 2 ? [] : [0];
				_local4577.OE = [];
				_local4592 = [PixelUtil.X.UH()];
			}
		} else {
			var _local4593 = l.target == this.Pg ? -1 : 1,
				_local4587 = [];
			for (var _local4576 = 0; _local4576 < _local4581; _local4576++) {
				var _local4580 = PixelUtil.path.W7(_local4585, _local4576),
					_local4582 = _local4580 + 1 + _local4585[_local4580].length;
				_local4587.push(_local4585.slice(_local4580, _local4582));
			}
			var _local4579 = _local4584.slice(0);
			for (var _local4576 = 0; _local4576 < _local4584.length; _local4576++) _local4579[_local4576] = Math.max(_local4576, Math.min(_local4581 - 1 - (_local4584.length - 1 - _local4576), _local4579[_local4576] + _local4593));
			if (_local4584.join(",") == _local4579.join(",")) return;
			var _local4590 = JSON.parse(JSON.stringify(_local4592));
			for (var _local4576 = 0; _local4576 < _local4584.length; _local4576++) {
				var _local4591 = _local4593 == -1 ? _local4576 : _local4584.length - 1 - _local4576,
					_local4580 = _local4584[_local4591],
					_local4582 = _local4579[_local4591];
				if (_local4580 != _local4582) {
					var _local4583 = _local4587[_local4580];
					_local4587[_local4580] = _local4587[_local4582];
					_local4587[_local4582] = _local4583;
					_local4583 = _local4590[_local4580];
					_local4590[_local4580] = _local4590[_local4582];
					_local4590[_local4582] = _local4583;
				}
			}
			var _local4589 = _local4585.slice(0, 2);
			for (var _local4576 = 0; _local4576 < _local4587.length; _local4576++) _local4589 = _local4589.concat(_local4587[_local4576]);
			_local4577.i = _local4589;
			_local4577.g = _local4579;
			_local4592 = _local4590;
		}
		_local4586.N4 = _local4577;
		_local4586.X = _local4592;
		var _local4588 = new Action(ActionTypes.E.L, !0);
		_local4588.data = {
			a: ActionTypes.$.kl,
			G: this.G,
			X9: _local4586
		};
		this.dispatch(_local4588);
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
	if (d != null) {
		this.ZU = new ContextPanel([{
			name: [6, 37]
		}, {
			name: [5, 4]
		}]);
		this.ZU.parent = this;
		this.ZU.addListener("select", this.oB, this);
	}
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
	if (this.ZU == null) {
		this.ZU = new ContextPanel(this.afN);
		this.ZU.parent = this.hg;
		this.ZU.addListener("select", this.oB, this);
	}
	if (s.isInDocument(this.ZU.e)) return;
	l.stopPropagation();
	var _local193 = this.ZU;
	_local193.refresh();
	_local193.update(null);
	var _local191 = l.currentTarget.getBoundingClientRect(),
		_local192 = new Action(ActionTypes.E.L, !0);
	_local192.data = {
		a: ActionTypes.$.dY,
		A3: _local193,
		x: _local191.left,
		y: _local191.top + _local191.height
	};
	this.dispatch(_local192);
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

function CurveEditor(l, d, G) {
	UIComponent.call(this);
	this.e = s.createElement("span", "fitem curveeditor");
	this.y9 = null;
	this.amS = 0;
	this.Rl = "";
	this.mode = 0;
	this.xi = l;
	this.auq = d;
	this.a6U = G;
	this.x0 = null;
	this.AU = null;
	this.akf = 0;
	this.aa_ = 0;
	this.FE = new Point2D();
	this.Rh = this.Tk.bind(this);
	this.IE = this.FS.bind(this);
	this.lP = 256;
	this.T = s.createElement("canvas");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	s.preventTouchAndGesture(this.T);
	this.e.appendChild(this.T);
	this.resize(256, 256);
	s.addPointerDown(this.T, this.Z1.bind(this));
	this.coords = s.createElement("div");
	this.coords.setAttribute("style", "width:250px");
	this.e.appendChild(this.coords);
	var _local474 = this.qx = G ? 100 : 255,
		_local473 = null;
	this.Nt = new RangeDropInput("X (in)", 0, _local474, _local473, 0, !1, !0);
	this.lw = new RangeDropInput("Y (out)", 0, _local474, _local473, 0, !1, !0);
	this.qR = new CheckboxControl([19, 3, 0]);
	this.Nt.addListener(ActionTypes.E.A, this.cL, this);
	this.lw.addListener(ActionTypes.E.A, this.cL, this);
	this.qR.addListener(ActionTypes.E.A, this.cL, this);
	this.coords.appendChild(this.Nt.e);
	if (G) this.coords.appendChild(this.qR.e);
	this.coords.appendChild(this.lw.e);
}
CurveEditor.prototype = new UIComponent();
CurveEditor.prototype.refresh = function () {
	this.qR.refresh();
	this.Nt.refresh();
	this.lw.refresh();
};
CurveEditor.prototype.resize = function (l, d) {
	this.lP = Math.round(l);
	this.k_.resetTransform();
	s.setCanvasSizeForDpr(this.T, this.lP, this.lP, this.k_);
	this.k_.scale(this.lP / 256, this.lP / 256);
	if (this.x0) this.LO();
};
CurveEditor.prototype.cL = function (l) {
	var _local475 = this.aiN(),
		_local477 = this.x0[_local475],
		_local476 = 255 / this.qx;
	_local477.v.Hrzn.v = this.Nt.b() * _local476;
	_local477.v.Vrtc.v = this.lw.b() * _local476;
	if (this.a6U) _local477.v.Cnty.v = this.qR.b();
	this.x0.sort(function (b, V) {
		return b.v.Hrzn.v - V.v.Hrzn.v;
	});
	this.LO();
	this.dispatch(new Action(ActionTypes.E.A));
};
CurveEditor.prototype.c = function (l, A) {
	var _local478 = JSON.stringify(l);
	if (_local478 == JSON.stringify(this.x0)) return;
	this.mode = l.length == 256 ? 1 : 0;
	this.x0 = JSON.parse(_local478);
	if (A != null) this.AU = this.x0[A];
	this.LO();
};
CurveEditor.prototype.RB = function (l, d, G) {
	this.y9 = l;
	this.amS = d;
	this.Rl = G;
	this.LO();
};
CurveEditor.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.x0));
};
CurveEditor.prototype.aiN = function () {
	return this.x0.indexOf(this.AU);
};
CurveEditor.prototype.Z1 = function (l) {
	var _local488 = 256 / this.lP,
		_local480 = s.getEventPositionInElement(l, this.T);
	_local480.x *= _local488;
	_local480.y *= _local488;
	var _local487 = _local480.x,
		_local486 = 256 - _local480.y;
	if (this.xi) {
		var _local484 = _local487;
		_local487 = 256 - _local486;
		_local486 = _local484;
	}
	this.FE.T6(_local487, _local486);
	if (this.mode == 0) {
		var _local490 = 0,
			_local481 = 1e9,
			_local482;
		for (var _local479 = 0; _local479 < this.x0.length; _local479++) {
			var _local491 = this.x0[_local479].v,
				_local489 = _local491.Hrzn.v - _local487,
				_local483 = _local491.Vrtc.v - _local486,
				_local485 = Math.sqrt(_local489 * _local489 + _local483 * _local483);
			if (_local485 < _local481) {
				_local481 = _local485;
				_local490 = _local479;
			}
		}
		if (_local481 < 15) _local482 = this.x0[_local490];else
		{
			_local482 = PixelUtil.presetThumb.yR(_local487, _local486, !0);
			this.x0.push(_local482);
			this.x0.sort(function (n, r) {
				return n.v.Hrzn.v - r.v.Hrzn.v;
			});
		}
		this.AU = _local482;
		this.aa_ = this.x0.slice(0);
	}
	s.addPointerMove(document.body, this.Rh);
	s.addPointerUp(document.body, this.IE);
	this.Tk(l);
};
CurveEditor.prototype.Tk = function (l) {
	var _local502 = 256 / this.lP,
		_local492 = s.getEventPositionInElement(l, this.T);
	_local492.x *= _local502;
	_local492.y *= _local502;
	var _local501 = _local492.x,
		_local499 = 256 - _local492.y;
	if (this.xi) {
		var _local496 = _local501;
		_local501 = 256 - _local499;
		_local499 = _local496;
	}
	if (this.mode == 0) {
		var _local508 = this.x0,
			_local493 = this.AU,
			_local509 = this.aa_,
			_local503 = _local509.indexOf(_local493),
			_local495 = _local508.indexOf(_local493) != -1,
			_local497 = _local509.length - 1,
			_local494 = _local501;
		if (_local503 == 0) {
			_local494 = Math.max(0, Math.min(_local509[1].v.Hrzn.v - 1, _local501));
		} else if (_local503 == _local497) {
			_local494 = Math.min(255, Math.max(_local509[_local497 - 1].v.Hrzn.v + 1, _local501));
		} else {
			var _local506 = _local501 < 0 || _local501 > 255 || _local499 < 0 || _local499 > 255;
			if (_local501 <= _local509[_local503 - 1].v.Hrzn.v || _local501 >= _local509[_local503 + 1].v.Hrzn.v) _local506 = !0;
			if (!_local506 && !_local495) _local508.splice(_local503, 0, _local493);
			if (_local506 && _local495) _local508.splice(_local503, 1);
		}
		if (this.auq && (_local503 == 0 || _local503 == _local509.length - 1)) {} else _local493.v.Hrzn.v = Math.round(_local494);
		_local493.v.Vrtc.v = Math.max(0, Math.min(255, Math.round(_local499)));
	} else {
		_local501 = Math.round(_local501);
		_local499 = Math.round(_local499);
		_local501 = Math.max(0, Math.min(255, _local501));
		_local499 = Math.max(0, Math.min(255, _local499));
		var _local507 = this.FE.x,
			_local498 = _local501,
			_local505 = this.FE.y,
			_local504 = _local499;
		if (_local501 < this.FE.x) {
			_local498 = _local507;
			_local507 = _local501;
			_local504 = _local505;
			_local505 = _local499;
		}
		this.x0[_local501] = _local499;
		if (_local507 != _local498)
		for (var _local500 = _local507; _local500 <= _local498; _local500++) this.x0[_local500] = Math.round(_local505 + (_local500 - _local507) * (_local504 - _local505) / (_local498 - _local507));
	}
	this.FE.T6(_local501, _local499);
	this.LO();
	this.dispatch(new Action(ActionTypes.E.A));
};
CurveEditor.prototype.FS = function (l) {
	s.removePointerMove(document.body, this.Rh);
	s.removePointerUp(document.body, this.IE);
	this.dispatch(new Action(ActionTypes.E.A));
};
CurveEditor.prototype.LO = function () {
	var _local517 = this.k_,
		_local516 = this.T;
	_local517.fillStyle = "#ffffff";
	_local517.fillRect(0, 0, 256, 256);
	var _local511 = 256 / _local516.width;
	if (this.y9) {
		_local517.save();
		_local517.translate(0, 256);
		_local517.scale(1, -1);
		LevelsHistogram.ail(_local517, this.y9, 5700 / this.amS, this.Rl);
		_local517.restore();
	}
	_local517.strokeStyle = "#aaaaaa";
	_local517.lineWidth = 1 * _local511;
	_local517.beginPath();
	for (var _local510 = 1; _local510 < 4; _local510++) {
		var _local515 = (Math.floor(64 * _local510 / _local511) + .5) * _local511;
		_local517.moveTo(0, _local515);
		_local517.lineTo(255, _local515);
		_local517.moveTo(_local515, 0);
		_local517.lineTo(_local515, 255);
	}
	_local517.stroke();
	if (this.xi) {
		_local517.save();
		_local517.transform(0, 1, -1, 0, 256, 0);
	}
	if (this.mode == 0) {
		var _local514 = this.x0,
			_local513 = PixelUtil.presetThumb.d_(_local514, 256);
		_local517.strokeStyle = "#000000";
		_local517.beginPath();
		_local517.moveTo(0, 255.5 - _local513[0]);
		for (var _local510 = 0; _local510 < 256; _local510++) _local517.lineTo(_local510, 255.5 - _local513[_local510]);
		_local517.stroke();
		_local517.lineWidth = 2 * _local511;
		for (var _local510 = 0; _local510 < _local514.length; _local510++) {
			var _local518 = _local514[_local510].v;
			_local517.fillStyle = this.AU == _local514[_local510] ? "#333" : "#fff";
			_local517.beginPath();
			_local517.moveTo(_local518.Hrzn.v, 255.5 - _local518.Vrtc.v);
			_local517.arc(_local518.Hrzn.v, 255.5 - _local518.Vrtc.v, 5 * _local511, 0, 2 * Math.PI);
			_local517.stroke();
			_local517.fill();
		}
	} else {
		var _local513 = this.x0;
		_local517.strokeStyle = "#000000";
		_local517.beginPath();
		_local517.moveTo(0, 255.5 - _local513[0]);
		for (var _local510 = 0; _local510 < 256; _local510++) _local517.lineTo(_local510, 255.5 - _local513[_local510]);
		_local517.stroke();
	}
	if (this.xi) _local517.restore();
	var _local510 = this.aiN();
	this.coords.className = _local510 == -1 ? "disabled" : "";
	if (_local510 == -1) return;
	var _local518 = this.x0[_local510].v,
		_local512 = 255 / this.qx;
	this.Nt.c(Math.round(_local518.Hrzn.v / _local512));
	this.lw.c(Math.round(_local518.Vrtc.v / _local512));
	if (_local518.Cnty) this.qR.c(_local518.Cnty.v);
};


function GlyphsPanel() {
	PanelTabBase.call(this, "Glyphs", !1, "---panels/glyphs", PanelTabBase.xA.al9);
	this.mN = null;
}
GlyphsPanel.prototype = new PanelTabBase("");
GlyphsPanel.prototype.Eg = function () {
	this.Tn = new TypeToolPanel();
	this.Tn.parent = this;
	this.aeq = null;
	this.aoA = null;
	this.l5 = null;
	this.apQ = null;
	this.MN = Math.round(290 * s.getDevicePixelRatio());
	this.sk = 45;
	this.a9D = 4;
	this.arx = this.VP.bind(this);
	this.aeW = 0;
	this.nd = new DropdownMenu(null, ["Hi", "Hello"]);
	this.nd.addListener(ActionTypes.E.A, this.VP, this);
	var _local3612 = this.pW = new ToolbarButton("-", null, null, !0);
	_local3612.addListener("click", this.aa0, this);
	var _local3611 = this.a5$ = new ToolbarButton("+", null, null, !0);
	_local3611.addListener("click", this.aa0, this);
	this.FO = new ImageSet(!1);
	this.FO.addListener(ActionTypes.E.A, this.hm, this);
	this.FO.e.style.height = 250 + "px";
	var _local3610 = this.ph = s.createElement("div", "form padded");
	this.DK.appendChild(_local3610);
	_local3610.appendChild(this.Tn.re.e);
	s.appendBr(_local3610);
	_local3610.appendChild(this.nd.e);
	_local3610.appendChild(_local3612.e);
	_local3610.appendChild(_local3611.e);
	this.DK.appendChild(this.FO.e);
};
GlyphsPanel.prototype.resize = function (l, d) {
	if (this.iJ == l || this.Tn == null) return;
	this.iJ = l;
	this.MN = Math.floor((l - 13) * s.getDevicePixelRatio());
	this.ph.setAttribute("style", "width:" + this.MN / s.getDevicePixelRatio() + "px;");
	this.FO.e.style.height = d - 73 + "px";
	this.VP();
};
GlyphsPanel.prototype.hm = function (l) {
	var _local3618 = this.anD(),
		_local3613 = Math.round(this.MN / _local3618);
	_local3618 /= s.getDevicePixelRatio();
	var _local3617 = this.FO.b()[0] * _local3613 * this.a9D,
		_local3616 = this.FO.az3();
	_local3617 += Math.floor(_local3616.y / _local3618) * _local3613;
	_local3617 += Math.floor(_local3616.x / _local3618);
	var _local3615 = this.l5[this.nd.b()];
	if (_local3617 >= _local3615.length) return;
	var _local3619 = _local3615[_local3617],
		_local3614 = this.apQ[_local3619],
		_local3620 = new Action(ActionTypes.E.v, !0);
	_local3620.G = f.zl;
	if (_local3614.BR.length == 0) _local3620.data = {
		a: "insertGlyph",
		Z: _local3617 + 1
	};else
	_local3620.data = {
		a: "insertText",
		Z: String.fromCodePoint(_local3614.BR[0])
	};
	this.dispatch(_local3620);
};
GlyphsPanel.prototype.aa0 = function (l) {
	var _local3621 = 1.2;
	if (l.target == this.pW) {
		if (this.sk > 20) this.sk /= _local3621;
	} else {
		if (this.sk < 100) this.sk *= _local3621;
	}
	this.VP();
};
GlyphsPanel.prototype.KN = function () {
	this.BM(this.mN);
};
GlyphsPanel.prototype.BM = function (l, d) {
	this.mN = l;
	if (!s.isInDocument(this.DK)) return;
	if (this.Tn == null) this.Eg();
	this.Tn.c(l.XG, l.Hg, l.fL);
	var _local3623 = l.XG,
		_local3631 = _local3623.xg.Font,
		_local3638 = 0;
	if (_local3631 == null) return;
	var _local3630 = _local3623.rA[_local3631].Name;
	if (this.aeq == _local3630) return;
	var _local3631 = l.Hg.U6(_local3630);
	if (_local3631 == null) return;
	var _local3627 = _local3631.maxp.numGlyphs,
		_local3637 = this.apQ = new Array(_local3627);
	for (var _local3622 = 0; _local3622 < _local3627; _local3622++) _local3637[_local3622] = {
		BR: []
	};
	var _local3624 = Date.now(),
		_local3632 = new Uint8Array(1048575);
	for (var _local3622 = 0; _local3622 < 1048575; _local3622++) {
		var _local3626 = Typr.U.codeToGlyph(_local3631, _local3622);
		if (_local3626 != 0 && _local3626 < _local3627) {
			_local3632[_local3622] = 1;
			if (_local3637[_local3626].BR.length == 0) _local3638++;
			_local3637[_local3626].BR.push(_local3622);
		}
	}
	var _local3628 = GlyphsPanel.JJ,
		_local3625 = [];
	for (var _local3622 = 0; _local3622 < _local3628.length; _local3622++) _local3625.push([]);
	for (var _local3626 = 1; _local3626 < _local3627; _local3626++) {
		_local3625[0].push(_local3626);
		var _local3635 = _local3637[_local3626].BR[0];
		if (_local3635 == null) {
			continue;
		}
		for (var _local3636 = 1; _local3636 < _local3628.length; _local3636++) {
			var _local3629 = _local3628[_local3636].Cf;
			for (var _local3622 = 0; _local3622 < _local3629.length; _local3622 += 2)
			if (_local3629[_local3622] <= _local3635 && _local3635 <= _local3629[_local3622 + 1]) {
				_local3625[_local3636].push(_local3626);
				break;
			}
		}
	}
	this.l5 = _local3625;
	var _local3634 = [];
	for (var _local3622 = 0; _local3622 < _local3628.length; _local3622++) _local3634.push(_local3628[_local3622].hy + " (" + _local3625[_local3622].length + ")");
	var _local3633 = this.nd.b();
	this.nd.b3(_local3634);
	this.nd.c(_local3633);
	this.aeq = _local3630;
	this.aoA = _local3631;
	this.VP();
};
GlyphsPanel.prototype.anD = function (l) {
	var _local3639 = Math.floor(this.MN / this.sk);
	return Math.floor(this.MN / _local3639);
};
GlyphsPanel.prototype.VP = function (l) {
	if (!s.isInDocument(this.DK) || this.l5 == null) return;
	var _local3659 = this.l5[this.nd.b()],
		_local3644 = _local3659.length,
		_local3657 = this.aoA,
		_local3652 = Typr.U,
		_local3649 = this.anD(),
		_local3669 = _local3649,
		_local3646 = _local3669 * .8,
		_local3671 = _local3669 * .8 / _local3657.head.unitsPerEm,
		_local3660 = [],
		_local3648 = Math.floor(this.MN / _local3649),
		_local3650 = Math.ceil(_local3644 / _local3648),
		_local3647 = this.a9D,
		_local3665 = Date.now();
	for (var _local3668 = 0; _local3668 < _local3650; _local3668 += _local3647) {
		var _local3651 = s.createElement("canvas"),
			_local3662 = _local3651.getContext("2d", { willReadFrequently: true });
		_local3651.width = _local3649 * _local3648;
		_local3651.height = _local3669 * _local3647;
		_local3662.fillStyle = "white";
		_local3662.fillRect(0, 0, _local3648 * _local3649, _local3669 * _local3647);
		for (var _local3661 = 0; _local3661 < _local3647; _local3661++) {
			for (var _local3654 = 0; _local3654 < _local3648; _local3654++) {
				var _local3640 = _local3659[(_local3668 + _local3661) * _local3648 + _local3654];
				if (_local3640 == null) break;
				var _local3663 = _local3652.glyphToPath(_local3657, _local3640),
					_local3643 = PixelUtil.vec.boundingBox(_local3663.crds);
				_local3662.fillStyle = "#252525";
				if (_local3643.W6()) {
					var _local3642 = _local3657.hmtx,
						_local3667 = [],
						_local3656 = 170;
					for (var _local3645 in _local3642) _local3667.push(_local3645);
					var _local3653 = _local3642[_local3667[0]][_local3640],
						_local3655 = _local3642[_local3667[1]][_local3640],
						_local3641 = Math.max(_local3653, _local3655);
					_local3663 = {
						cmds: "M L M L M L".split(" "),
						crds: [0, 0, _local3641, 0, 0, -_local3656, 0, _local3656, _local3641, -_local3656, _local3641, _local3656]
					};
					_local3643.m = _local3641;
					_local3643.x = 0;
					_local3662.strokeStyle = "rgba(0,255,0,1)";
				}
				_local3662.beginPath();
				var _local3664 = _local3654 * _local3649 + (_local3649 - _local3643.m * _local3671) * .5 - _local3643.x * _local3671,
					_local3666 = _local3661 * _local3669 + _local3646;
				_local3662.translate(_local3664, _local3666);
				_local3662.scale(_local3671, -_local3671);
				_local3652.pathToContext(_local3663, _local3662);
				_local3662.scale(1 / _local3671, -1 / _local3671);
				_local3662.translate(-_local3664, -_local3666);
				_local3643.W6() ? _local3662.stroke() : _local3662.fill();
			}
		}
		_local3662.beginPath();
		for (var _local3654 = 0; _local3654 < _local3648; _local3654++) {
			var _local3658 = _local3654 * _local3649 + _local3649 + .5;
			_local3662.moveTo(_local3658, 0);
			_local3662.lineTo(_local3658, _local3669 * _local3647);
		}
		for (var _local3661 = 0; _local3661 < _local3647; _local3661++) {
			var _local3670 = _local3661 * _local3669 + _local3669 + .5;
			_local3662.moveTo(0, _local3670);
			_local3662.lineTo(_local3648 * _local3649, _local3670);
		}
		_local3662.strokeStyle = "rgba(0,0,0,0.3)";
		_local3662.stroke();
		_local3660.push(_local3651);
	}
	this.FO.LR(_local3660, null, _local3649 * _local3648, _local3669 * _local3647);
};
GlyphsPanel.JJ = [{
	hy: "All Glyphs"
}, {
	hy: "Basic Latin, Latin 1",
	Cf: [0, 127, 128, 143]
}, {
	hy: "Latin Extended-A",
	Cf: [256, 383]
}, {
	hy: "Latin Extended-B",
	Cf: [384, 591]
}, {
	hy: "Punctuations",
	Cf: [33, 35, 37, 39, 42, 42, 44, 44, 46, 47, 58, 59, 63, 63, 64, 64, 92, 92, 161, 161, 167, 167, 182, 183, 191, 191, 894, 894, 903, 903, 1370, 1375, 1417, 1417, 8192, 8303, 11776, 11903]
}, {
	hy: "Greek",
	Cf: [880, 1023]
}, {
	hy: "Cyrillic",
	Cf: [1024, 1279]
}, {
	hy: "Hebrew",
	Cf: [1424, 1535]
}, {
	hy: "Arabic",
	Cf: [1536, 1791]
}, {
	hy: "Emoji",
	Cf: [9728, 10095, 127744, 129535]
}];


function RulerStraightenToolOptions() {
	ToolOptionsBase.call(this);
	this.mN = null;
	this.a9 = null;
	this.jr = [
	new TextInput("X", null, 3.2, null, !0),
	new TextInput("Y", null, 3.2, null, !0),
	new TextInput("W", null, 3.2, null, !0),
	new TextInput("H", null, 3.2, null, !0),
	new TextInput("Angle", "\xB0", 3.7, null, !0),
	new TextInput("Length 1", null, 3.5, null, !0),
	new TextInput("Length 2", null, 3.5, null, !0),
	new ToolbarButton("Straighten Layer", !1, null, !0),
	new ToolbarButton("Clear", !1, null, !0)];

	for (var _local4514 = 0; _local4514 < this.jr.length; _local4514++) {
		var _local4515 = this.jr[_local4514];
		this.body.appendChild(_local4515.e);
		if (_local4514 > 6) _local4515.addListener("click", this.lZ, this);
	}
	this.QL = 0;
}
RulerStraightenToolOptions.prototype = new ToolOptionsBase();
RulerStraightenToolOptions.prototype.lZ = function (l) {
	var _local4518 = this.jr.indexOf(l.target) == 7,
		_local4517 = new Action(ActionTypes.E.v, !0);
	if (_local4518) {
		if (this.QL == 0) return;
		_local4517.G = f.qK;
		_local4517.data = {
			a: "rot",
			Il: [2, 5],
			Z: -this.QL
		};
	} else {
		_local4517.G = f.e7;
		for (var _local4516 = 0; _local4516 < 6; _local4516++) this.jr[_local4516].c(null);
	}
	this.dispatch(_local4517);
};
RulerStraightenToolOptions.prototype.IF = function (l) {
	function _local4523(I, y, e) {
		var _local4526 = Math.sqrt(Math.pow(y.x - I.x, 2) + Math.pow(y.y - I.y, 2)),
			_local4527 = Math.sqrt(Math.pow(y.x - e.x, 2) + Math.pow(y.y - e.y, 2)),
			_local4525 = Math.sqrt(Math.pow(e.x - I.x, 2) + Math.pow(e.y - I.y, 2));
		return Math.acos((_local4527 * _local4527 + _local4526 * _local4526 - _local4525 * _local4525) / (2 * _local4527 * _local4526));
	}
	if (l == null) return;
	this.a9 = l;
	var _local4519 = l.afz,
		_local4522 = l.xJ,
		_local4521 = _local4522.x - _local4519.x,
		_local4520 = _local4522.y - _local4519.y;
	this.QL = -Math.atan2(_local4520, _local4521);
	if (l.LB) this.QL = _local4523(_local4522, _local4519, l.LB);
	var _local4524 = this.jr;
	_local4524[0].c(this.nX(l, _local4519.x));
	_local4524[1].c(this.nX(l, _local4519.y));
	_local4524[2].c(this.nX(l, _local4521));
	_local4524[3].c(this.nX(l, _local4520));
	_local4524[4].c((this.QL * 180 / Math.PI).toFixed(2));
	_local4524[5].c(this.nX(l, Point2D.yZ(_local4519, _local4522)));
	if (l.LB) {
		_local4524[6].c(this.nX(l, Point2D.yZ(_local4519, l.LB)));
	} else _local4524[6].c("");
};
RulerStraightenToolOptions.prototype.nX = function (l, d) {
	var _local4528 = PixelUtil.y0.ij(d, l.m7, this.mN, l.am2, !1);
	return parseFloat(_local4528).toFixed(2);
};
RulerStraightenToolOptions.prototype.BM = function (l, d) {
	this.mN = l;
	this.IF(this.a9);
};
RulerStraightenToolOptions.prototype.lx = function () {
	var _local4530 = this.jr;
	for (var _local4529 = 0; _local4529 < _local4530.length; _local4529++) _local4530[_local4529].refresh();
	s.setWidthHeightLabels(_local4530[2], _local4530[3]);
};

function PencilDetailOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "strn", "pdetail"]);
}
PencilDetailOptions.prototype = new ToolOptionsWithKeys();


function CloneSourceOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "sfrom"]);
	this.a0p = [];
	var _local4533 = [
	[7, 12]];

	for (var _local4531 = 0; _local4531 < _local4533.length; _local4531++) {
		var _local4532 = new ToolbarButton(_local4533[_local4531], !1, null, !0);
		this.a0p.push(_local4532);
		_local4532.parent = this;
		this.body.appendChild(_local4532.e);
		_local4532.addListener("click", this.auO, this);
	}
}
CloneSourceOptions.prototype = new ToolOptionsWithKeys();
CloneSourceOptions.prototype.auO = function (l) {
	var _local4535 = this.a0p.indexOf(l.currentTarget),
		_local4534 = new Action(ActionTypes.E.g5, !0);
	_local4534.data = f.BrushToolBase.ML("contentAware");
	this.dispatch(_local4534);
};

function BrushStrengthOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "strn"]);
}
BrushStrengthOptions.prototype = new ToolOptionsWithKeys();

function BrushFlowOptions() {
	ToolOptionsWithKeys.call(this, ["brush", "flow", "smode"]);
}
BrushFlowOptions.prototype = new ToolOptionsWithKeys();

function ZoomToolOptions() {
	ToolOptionsBase.call(this);
	this.hI = !1;
	var _local4536 = s.createElement("span", "fitem");
	this.body.appendChild(_local4536);
	this.M8 = new ButtonGroupMenu(null, [
	"<img src=\"" + PIMG.zoomIn + "\" class=\"autoscale gsicon\" />",
	"<img src=\"" + PIMG.zoomOut + "\" class=\"autoscale gsicon\" />"]
	);
	_local4536.appendChild(this.M8.e);
	this.M8.addListener(ActionTypes.E.A, this.S9, this);
	this.xD = new ToolbarButton("Pixel to Pixel");
	this.body.appendChild(this.xD.e);
	this.xD.addListener("click", this.acX, this);
	this.pv = new ToolbarButton("Fit The Area");
	this.body.appendChild(this.pv.e);
	this.pv.addListener("click", this.acX, this);
	this.EC = new CheckboxControl("All Documents");
	this.body.appendChild(this.EC.e);
	this.EC.addListener(ActionTypes.E.A, this.S9, this);
}
ZoomToolOptions.prototype = new ToolOptionsBase();
ZoomToolOptions.prototype.lx = function () {
	this.xD.refresh();
	this.pv.refresh();
};
ZoomToolOptions.prototype.S9 = function () {
	var _local4538 = {
			a: ActionTypes.$.kl,
			G: this.G,
			K$: this.M8.b() == 0,
			In: this.EC.b()
		},
		_local4537 = new Action(ActionTypes.E.L, !0);
	_local4537.data = _local4538;
	this.dispatch(_local4537);
};
ZoomToolOptions.prototype.IF = function (l) {
	if (this.hI != l.hI) this.M8.c(1 - this.M8.b());
	this.hI = l.hI;
};
ZoomToolOptions.prototype.acX = function (l) {
	var _local4539 = new Action(ActionTypes.E.v, !0);
	_local4539.G = f.t7;
	_local4539.data = {
		a: "adapt",
		Z: l.target == this.xD ? "pixel" : "fitscr"
	};
	this.dispatch(_local4539);
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
		if (_local4611 == null) _local4611 = this.mI = new ContextPanel(_local4616.azf(), _local4616.ala(this.G));
		_local4611.refresh();
		_local4611.parent = this;
		_local4611.update(l.T1, l.wQ);
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

function TypeToolHorizontalOptions() {
	TypeToolOptions.call(this);
}
TypeToolHorizontalOptions.prototype = new TypeToolOptions(!0);

function TypeToolVerticalOptions() {
	TypeToolOptions.call(this);
}
TypeToolVerticalOptions.prototype = new TypeToolOptions(!0);

function TypeToolWarpOptions() {
	TypeToolOptions.call(this, !1, !0);
}
TypeToolWarpOptions.prototype = new TypeToolOptions(!0);


function PuppetWarpOptions() {
	ToolOptionsBase.call(this);
	var _local4645 = this.gH = [
	new DropdownMenu("Mode", ["Rigid", "Normal", "Distort"]),
	new DropdownMenu("Density", ["Small", "Medium", "Large"]),
	new RangeDropInput("Expand", 0, 100, "px"),
	new CheckboxControl("Show Mesh"),
	new ToolbarButton("\u25BC", null, null, !0),
	new ToolbarButton("\u25B2", null, null, !0)];

	for (var _local4643 = 0; _local4643 < _local4645.length; _local4643++) {
		var _local4644 = _local4645[_local4643];
		_local4644.parent = this;
		this.body.appendChild(_local4644.e);
		_local4644.addListener(_local4643 < 4 ? ActionTypes.E.A : "click", this.ayB, this);
	}
	this.P_ = new ConfirmCancelButtons();
	this.P_.addListener("click", this.aL, this);
	this.body.appendChild(this.P_.e);
}
PuppetWarpOptions.prototype = new ToolOptionsBase();
PuppetWarpOptions.prototype.lx = function () {
	var _local4647 = this.gH;
	for (var _local4646 = 0; _local4646 < 4; _local4646++) _local4647[_local4646].refresh();
	this.P_.refresh();
};
PuppetWarpOptions.prototype.IF = function (l) {
	var l = l.Oo;
	for (var _local4648 = 0; _local4648 < 4; _local4648++) this.gH[_local4648].c(l[_local4648]);
};
PuppetWarpOptions.prototype.ayB = function (l) {
	var _local4651 = [];
	for (var _local4649 = 0; _local4649 < 4; _local4649++) _local4651[_local4649] = this.gH[_local4649].b();
	var _local4650 = this.gH.indexOf(l.target);
	if (_local4650 < 4) this.DR({
		DI: "prm",
		Oo: _local4651
	});else
	this.DR({
		DI: "moveDepth",
		a5h: _local4650 == 5
	});
};
PuppetWarpOptions.prototype.aL = function (l) {
	this.DR({
		DI: this.P_.b() ? "commit" : "cancel"
	});
};
PuppetWarpOptions.prototype.DR = function (l) {
	l.a = ActionTypes.$.kl;
	l.G = this.G;
	var _local4652 = new Action(ActionTypes.E.L, !0);
	_local4652.data = l;
	this.dispatch(_local4652);
};




function FilterEffectPanel(l) {
	UIComponent.call(this);
	this.JI = l;
	this.e = s.createElement("div", "");
	this.go = [];
	this.cC = null;
	this.a6x = [];
}
FilterEffectPanel.prototype = new UIComponent();
FilterEffectPanel.prototype.ul = function (l) {};
FilterEffectPanel.prototype.ZW = function () {
	return !1;
};
FilterEffectPanel.prototype.resize = function (l, d) {};
FilterEffectPanel.prototype.BM = function (l, d) {};
FilterEffectPanel.prototype.RB = function (l) {};
FilterEffectPanel.prototype.c = function (l, d, G, b, V, Q) {
	var _local1465 = [],
		_local1463 = this.go,
		_local1466 = 0,
		_local1464 = FilterHelper.It["s" + this.JI];
	_local1464 ? _local1464(l, _local1465, Q) : this.KJ(l, _local1465, Q);
	for (var _local1462 = 0; _local1462 < _local1463.length; _local1462++)
	if (!(_local1463[_local1462] instanceof LabelItem)) _local1463[_local1462].c(_local1465[_local1466++]);
	if (l.RndS) this.cC = l.RndS.v;
};
FilterEffectPanel.prototype.b = function () {
	var _local1472 = FilterHelper.oT(this.JI),
		_local1471 = [],
		_local1468 = this.go,
		_local1470 = 0;
	for (var _local1467 = 0; _local1467 < _local1468.length; _local1467++)
	if (!(_local1468[_local1467] instanceof LabelItem)) _local1471[_local1470++] = _local1468[_local1467].b();
	var _local1469 = FilterHelper.It["g" + this.JI];
	_local1469 ? _local1469(_local1472, _local1471) : this.PY(_local1472, _local1471);
	if (_local1472.RndS) _local1472.RndS.v = this.cC;
	return _local1472;
};
FilterEffectPanel.prototype.o9 = function (l) {};
FilterEffectPanel.prototype.B5 = function (l) {
	if (l && l.target instanceof ToolbarButton) {
		this.cC = Math.floor(Math.random() * 4294967295);
	}
	var _local1478 = this.a6x;
	for (var _local1473 = 0; _local1473 < _local1478.length; _local1473 += 2) {
		var _local1474 = this.go[_local1478[_local1473]],
			_local1477 = this.go[_local1478[_local1473 + 1]],
			_local1476 = _local1474.b(),
			_local1475 = _local1477.b();
		if (l.target == _local1474) _local1477.c(Math.max(_local1476, _local1475));else
		_local1474.c(Math.min(_local1476, _local1475));
	}
	this.dispatch(new Action(ActionTypes.E.A));
};
FilterEffectPanel.prototype.refresh = function () {
	for (var _local1479 = 0; _local1479 < this.go.length; _local1479++) this.go[_local1479].refresh();
	var _local1480 = this.adT;
	if (_local1480) _local1480.refresh();
};
FilterEffectPanel.prototype.W8 = function (l) {
	s.addClass(this.e, "form");
	var _local1485 = this.go;
	for (var _local1481 = 0; _local1481 < _local1485.length; _local1481++) {
		var _local1482 = _local1485[_local1481];
		_local1482.parent = this;
		_local1482.addListener(ActionTypes.E.A, this.B5, this);
		this.e.appendChild(_local1482.e);
		if (_local1482 instanceof CheckboxControl && _local1485[_local1481 + 1] instanceof ColorSwatch) continue;
		if (l && l.indexOf(_local1481) != -1) s.appendHr(this.e);else
		s.appendBr(this.e);
	}
	var _local1484 = FilterHelper.oT(this.JI);
	if (_local1484.RndS) {
		var _local1483 = this.adT = new ToolbarButton("Randomize", null, null, !0);
		this.e.appendChild(_local1483.e);
		_local1483.addListener("click", this.B5, this);
	}
};
FilterEffectPanel.prototype.ba = function () {
	return !1;
};
FilterEffectPanel.prototype.dJ = function (l, d, G, b, V) {};
FilterEffectPanel.prototype.JP = function (l, d, G, b, V) {};
FilterEffectPanel.prototype.Nl = function (l, d, G, b, V) {};
FilterEffectPanel.prototype.PY = function (l, d) {};
FilterEffectPanel.prototype.KJ = function (l, d) {};
FilterEffectPanel.prototype.Ie = function (l) {
	var _local1487 = l.target.b().indexOf(!0) != -1,
		_local1486 = new Action(ActionTypes.E.L, !0);
	_local1486.Fj = !0;
	_local1486.data = {
		a: _local1487 ? ActionTypes.$.yb : ActionTypes.$.PN,
		G: f.v3
	};
	this.dispatch(_local1486);
	_local1486 = new Action(ActionTypes.E.v, !0);
	_local1486.G = f.v3;
	_local1486.Fj = !0;
	_local1486.data = {
		a: "supertool",
		G: _local1487 ? this : null
	};
	this.dispatch(_local1486);
};
FilterEffectPanel.aaM = function (l) {
	l.ba = function () {
		return !0;
	};
	l.dJ = function (d, G, b, V, Q) {
		this.Pg = !0;
		this.amc(d, Q);
	};
	l.JP = function (d, G, b, V, Q) {
		if (!this.Pg) return;
		this.amc(d, Q);
	};
	l.Nl = function (d, G, b, V, Q) {
		this.Pg = !1;
	};
	l.amc = function (d, G) {
		var _local1490 = new Rect(0, 0, d.m, d.n);
		if (d.P) _local1490 = d.P.rect;
		var _local1489 = d.u.Zx(G.x, G.y);
		_local1489.x -= _local1490.x;
		_local1489.y -= _local1490.y;

		function _local1488(t, I) {
			return Math.round(Math.max(0, Math.min(100, 100 * t / I)));
		}
		this.go[2].c(_local1488(_local1489.x, _local1490.m));
		this.go[3].c(_local1488(_local1489.y, _local1490.n));
		this.B5();
	};
};
FilterEffectPanel.Bokh = function () {
	FilterEffectPanel.call(this, "Bokh");
	this.go = [
	new DropdownMenu("Depth Map", ["A", "b"]),
	new RangeInput("Focal Distance", 0, 255),
	new CheckboxControl("Invert"),
	new DropdownMenu("Shape", ["Triangle (3)", "Square (4)", "Pentagon (5)", "Hexagon (6)", "Heptagon (7)", "Octagon (8)"]),
	new RangeInput("Radius", 0, 100),
	new RangeInput("Angle", 0, 360),
	new RangeInput("Brightness", 0, 100),
	new RangeInput("Threshold", 0, 255),
	new RangeInput("Noise", 0, 100),
	new ButtonGroupMenu("Distribution", ["Uniform", "Gaussian"]),
	new CheckboxControl("Monochromatic")];

	this.W8("Copy Merged");
};
FilterEffectPanel.Bokh.prototype = new FilterEffectPanel();
FilterEffectPanel.Bokh.prototype.KJ = function (l, d, G) {
	var _local1494 = ["None", "From Transparency", "Raster Mask"],
		_local1493 = l.BkDi.v.BtDi,
		_local1492 = l.BkDc,
		_local1495 = 0;
	if (_local1493 == "BeIn") _local1495 = 0;else
	if (_local1493 == "BeIt" && _local1492.v.BtDc == "BeCt") _local1495 = 1;else
	if (_local1493 == "BeIt" && _local1492.v.BtDc == "BeCm") _local1495 = 2;else
	if (_local1492) _local1495 = 3 + _local1492.v;
	var _local1496 = G && G[1];
	if (_local1496)
	for (var _local1491 = 0; _local1491 < _local1496.length; _local1491++) _local1494.push(_local1496[_local1491].name);
	this.go[0].b3(_local1494, [3]);
	d[0] = _local1495;
	d[1] = l.BkDp.v;
	d[2] = l.BkDs.v;
	d[3] = parseInt(l.BkIs.v.BtIs.slice(3)) - 3;
	d[4] = l.BkIb.v;
	d[5] = l.BkIr.v;
	d[6] = l.BkSb.v;
	d[7] = l.BkSt.v;
	d[8] = l.BkNa.v;
	d[9] = l.BkNt.v.BtNt == "BeNu" ? 0 : 1;
	d[10] = l.BkNm.v;
};
FilterEffectPanel.Bokh.prototype.PY = function (l, d) {
	var _local1497;
	if (d[0] == 0) {
		_local1497 = "BeIn";
		delete l.BkDc;
	} else if (d[0] < 3) {
		_local1497 = "BeIt";
		l.BkDc = {
			t: "enum",
			v: {
				BtDc: ["BeCt", "BeCm"][d[0] - 1]
			}
		};
	} else {
		_local1497 = "BeIa";
		l.BkDc = {
			t: "long",
			v: d[0] - 3
		};
	}
	l.BkDi.v.BtDi = _local1497;
	l.BkDp.v = d[1];
	l.BkDs.v = d[2];
	l.BkIs.v.BtIs = "BeS" + (3 + d[3]);
	l.BkIb.v = d[4];
	l.BkIr.v = d[5];
	l.BkSb.v = d[6];
	l.BkSt.v = d[7];
	l.BkNa.v = d[8];
	l.BkNt.v.BtNt = ["BeNu", "BeNg"][d[9]];
	l.BkNm.v = d[10];
};
FilterEffectPanel.oilPaint = function () {
	FilterEffectPanel.call(this, "oilPaint");
	this.go = [
	new RangeInput("Radius", .1, 10, "px", !0),
	new RangeInput("Cleanliness", 0, 10, "px", !0),
	new RangeInput("Scale", .1, 10, null, !0),
	new RangeInput("Bristle Detail", 0, 10, null, !0),
	new CheckboxControl("Lighting"),
	new RangeInput("Shine", 0, 10, null, !0),
	new AngleInput("Angle")];
	this.W8();
};
FilterEffectPanel.oilPaint.prototype = new FilterEffectPanel();
FilterEffectPanel.oilPaint.prototype.KJ = function (l, d) {
	var _local1499 = "stylization cleanliness brushScale microBrush lightingOn specularity".split(" ");
	for (var _local1498 = 0; _local1498 < _local1499.length; _local1498++) d[_local1498] = l[_local1499[_local1498]].v;
	d[6] = [l.LghD.v];
};
FilterEffectPanel.oilPaint.prototype.PY = function (l, d) {
	var _local1501 = "stylization cleanliness brushScale microBrush lightingOn specularity".split(" ");
	for (var _local1500 = 0; _local1500 < _local1501.length; _local1500++) l[_local1501[_local1500]].v = d[_local1500];
	l.LghD.v = d[6][0];
};
FilterEffectPanel.TrcC = function () {
	FilterEffectPanel.call(this, "TrcC");
	this.go = [
	new RangeInput("Level", 0, 255),
	new ButtonGroupMenu("Edge", ["Down", "Up"])];

	this.W8();
};
FilterEffectPanel.TrcC.prototype = new FilterEffectPanel();
FilterEffectPanel.TrcC.prototype.KJ = function (l, d) {
	d[0] = l.Lvl.v;
	d[1] = ["Lwr", "Upr"].indexOf(l.Edg.v.CntE);
};
FilterEffectPanel.TrcC.prototype.PY = function (l, d) {
	l.Lvl.v = d[0];
	l.Edg.v.CntE = ["Lwr", "Upr"][d[1]];
};
FilterEffectPanel["Dfs "] = function () {
	FilterEffectPanel.call(this, "Dfs ");
	this.go = [new ButtonGroupMenu("Mode", ["Normal", "Darker Color", "Lighter Color", "Anisotropic"])];
	this.W8();
};
FilterEffectPanel["Dfs "].prototype = new FilterEffectPanel();
FilterEffectPanel["Dfs "].prototype.KJ = function (l, d) {
	d[0] = ["Nrml", "DrkO", "LghO", "anisotropic"].indexOf(l.Md.v.DfsM);
};
FilterEffectPanel["Dfs "].prototype.PY = function (l, d) {
	l.Md.v.DfsM = ["Nrml", "DrkO", "LghO", "anisotropic"][d[0]];
};
FilterEffectPanel.Embs = function () {
	FilterEffectPanel.call(this, "Embs");
	this.go = [
	new AngleInput("Angle"),
	new RangeInput("Height", 1, 100, "px"),
	new RangeInput("Amount", 1, 500, "%")];

	this.W8();
};
FilterEffectPanel.Embs.prototype = new FilterEffectPanel();
FilterEffectPanel.Embs.prototype.KJ = function (l, d) {
	d[0] = [l.Angl.v];
	d[1] = l.Hght.v;
	d[2] = l.Amnt.v;
};
FilterEffectPanel.Embs.prototype.PY = function (l, d) {
	l.Angl.v = d[0][0];
	l.Hght.v = d[1];
	l.Amnt.v = d[2];
};
FilterEffectPanel["Wnd "] = function () {
	FilterEffectPanel.call(this, "Wnd ");
	this.go = [
	new ButtonGroupMenu("Technique", ["Wind", "Blast", "Stagger"]),
	new ButtonGroupMenu("Direction", ["From the Right", "From the Left"])];

	this.W8();
};
FilterEffectPanel["Wnd "].prototype = new FilterEffectPanel();
FilterEffectPanel["Wnd "].prototype.KJ = function (l, d) {
	d[0] = ["Wnd", "Blst", "Stgr"].indexOf(l.WndM.v.WndM);
	d[1] = ["Left", "Rght"].indexOf(l.Drct.v.Drct);
};
FilterEffectPanel["Wnd "].prototype.PY = function (l, d) {
	l.WndM.v.WndM = ["Wnd", "Blst", "Stgr"][d[0]];
	l.Drct.v.Drct = ["Left", "Rght"][d[1]];
};
FilterEffectPanel.denoise = function () {
	FilterEffectPanel.call(this, "denoise");
	this.go = [
	new RangeInput("Strength", 0, 10),
	new RangeInput("Protect Detail", 0, 100, "%")];

	this.W8();
};
FilterEffectPanel.denoise.prototype = new FilterEffectPanel();
FilterEffectPanel.denoise.prototype.KJ = function (l, d) {
	var _local1502 = l.channelDenoise.v[0].v;
	d[0] = _local1502.Amnt.v;
	d[1] = _local1502.EdgF.v;
};
FilterEffectPanel.denoise.prototype.PY = function (l, d) {
	var _local1503 = l.channelDenoise.v[0].v;
	_local1503.Amnt.v = d[0];
	_local1503.EdgF.v = d[1];
};
FilterEffectPanel.lightFilterGradient = function () {
	FilterEffectPanel.call(this, "lightFilterGradient");
	this.go = [
	new RangeInput("Blur", 0, 100, "px", 1, !0),
	new RangeInput("Scale", 0, 200, "%"),
	new CheckboxControl("Invert"),
	new RangeInput("High", 0, 100, "%"),
	new RangeInput("Medium", 0, 100, "%"),
	new RangeInput("Low", 0, 100, "%")];

	this.W8();
};
FilterEffectPanel.lightFilterGradient.prototype = new FilterEffectPanel();
FilterEffectPanel.lightFilterGradient.prototype.KJ = function (l, d) {
	d[0] = l.blur.v;
	d[1] = l.textureScale.v * 100;
	d[2] = l.Scl.v == -1;
	var _local1504 = l.Dtl.v;
	d[3] = _local1504[0].v * 100;
	d[4] = _local1504[1].v * 100;
	d[5] = _local1504[2].v * 100;
};
FilterEffectPanel.lightFilterGradient.prototype.PY = function (l, d) {
	l.blur.v = d[0];
	l.textureScale.v = d[1] / 100;
	l.Scl.v = d[2] ? -1 : 1;
	var _local1505 = l.Dtl.v;
	_local1505[0].v = d[3] / 100;
	_local1505[1].v = d[4] / 100;
	_local1505[2].v = d[5] / 100;
};
FilterEffectPanel.Fbrs = function () {
	FilterEffectPanel.call(this, "Fbrs");
	this.go = [
	new RangeInput("Variance", 1, 64),
	new RangeInput("Strength", 1, 64)];

	this.W8();
};
FilterEffectPanel.Fbrs.prototype = new FilterEffectPanel();
FilterEffectPanel.Fbrs.prototype.KJ = function (l, d) {
	d[0] = l.Vrnc.v;
	d[1] = l.Strg.v;
};
FilterEffectPanel.Fbrs.prototype.PY = function (l, d) {
	l.Vrnc.v = d[0];
	l.Strg.v = d[1];
};
FilterEffectPanel.LnsF = function () {
	FilterEffectPanel.call(this, "LnsF");
	this.go = [
	new RangeInput("Brightness", 10, 300, "%"),
	new ButtonGroupMenu("Type", ["Lens 1", "Lens 2", "Lens 3", "Lens 4"]),
	new RangeInput("Position X", 0, 100, "%"),
	new RangeInput("Position Y", 0, 100, "%")];

	this.W8();
};
FilterEffectPanel.LnsF.prototype = new FilterEffectPanel();
FilterEffectPanel.LnsF.prototype.KJ = function (l, d) {
	d[0] = l.Brgh.v;
	d[1] = ["Zm", "Nkn", "Nkn1", "PnVs"].indexOf(l.Lns.v.Lns);
	var _local1506 = l.FlrC.v;
	d[2] = Math.round(_local1506.Hrzn.v * 100);
	d[3] = Math.round(_local1506.Vrtc.v * 100);
};
FilterEffectPanel.LnsF.prototype.PY = function (l, d) {
	l.Brgh.v = d[0];
	l.Lns.v.Lns = ["Zm", "Nkn", "Nkn1", "PnVs"][d[1]];
	var _local1507 = l.FlrC.v;
	_local1507.Hrzn.v = d[2] / 100;
	_local1507.Vrtc.v = d[3] / 100;
};
FilterEffectPanel.aaM(FilterEffectPanel.LnsF.prototype);
FilterEffectPanel.blendOptions = function () {
	FilterEffectPanel.call(this, "blendOptions");
	this.go.push(new DropdownMenu("Blend Mode", au.YJ, au.hY));
	this.go.push(new RangeInput("Opacity", 0, 100, "%"));
	this.W8();
};
FilterEffectPanel.blendOptions.prototype = new FilterEffectPanel();
FilterEffectPanel.blendOptions.prototype.KJ = function (l, d) {
	d[0] = au.Point2D.indexOf(l.Md.v.BlnM);
	d[1] = l.Opct.v.val;
};
FilterEffectPanel.blendOptions.prototype.PY = function (l, d) {
	l.Md.v.BlnM = au.Point2D[d[0]];
	l.Opct.v.val = d[1];
};
FilterEffectPanel.LnCr = function () {
	FilterEffectPanel.call(this, "LnCr");
	this.go = [
	new RangeInput("Amount", -100, 100),
	new RangeInput("Scale", 10, 150, "%")];

	this.W8();
};
FilterEffectPanel.LnCr.prototype = new FilterEffectPanel();
FilterEffectPanel.LnCr.prototype.KJ = function (l, d) {
	d[0] = l.LnIa.v;
	d[1] = l.LnSi.v;
};
FilterEffectPanel.LnCr.prototype.PY = function (l, d) {
	l.LnIa.v = d[0];
	l.LnSi.v = d[1];
};
FilterEffectPanel.adaptCorrect = function () {
	FilterEffectPanel.call(this, "adaptCorrect");
	var _local1508 = OffsetRangeInput;
	this.go = [
	new LabelItem("Shadows"),
	new _local1508("Amount", 0, 100, "%"),
	new _local1508("Tone", 0, 100, "%"),
	new _local1508("Radius", 0, 200, "px"),
	new LabelItem("Highlights"),
	new _local1508("Amount", 0, 100, "%"),
	new _local1508("Tone", 0, 100, "%"),
	new _local1508("Radius", 0, 200, "px"),
	new LabelItem("Adjustments"),
	new _local1508("Color", -100, 100)];

	this.W8("Adjustments");
};
FilterEffectPanel.adaptCorrect.prototype = new FilterEffectPanel();
FilterEffectPanel.adaptCorrect.prototype.KJ = function (l, d) {
	var _local1509 = l.sdwM.v;
	d[0] = _local1509.Amnt.v.val;
	d[1] = _local1509.Wdth.v.val;
	d[2] = _local1509.Rds.v;
	var _local1509 = l.hglM.v;
	d[3] = _local1509.Amnt.v.val;
	d[4] = _local1509.Wdth.v.val;
	d[5] = _local1509.Rds.v;
	d[6] = l.ClrC.v;
};
FilterEffectPanel.adaptCorrect.prototype.PY = function (l, d) {
	var _local1510 = l.sdwM.v;
	_local1510.Amnt.v.val = d[0];
	_local1510.Wdth.v.val = d[1];
	_local1510.Rds.v = d[2];
	var _local1510 = l.hglM.v;
	_local1510.Amnt.v.val = d[3];
	_local1510.Wdth.v.val = d[4];
	_local1510.Rds.v = d[5];
	l.ClrC.v = d[6];
};
FilterEffectPanel.Flam = function () {
	FilterEffectPanel.call(this, "Flam");
	var _local1516 = this.go = [
	new DropdownMenu([12, 44], [
	"One Flame Along Path",
	"Multiple Flames Along Path",
	"Multiple Flames One Direction",
	"Multiple Flames Path Directed",
	"Multiple Flames Various Angle",
	"Candle Light"]
	),
	new RangeInput("Length", 20, 1e3, "px"),
	new CheckboxControl("Randomize Length"),
	new RangeInput("Width", 5, 600, "px"),
	new RangeInput("Angle", 0, 360, "\xB0"),
	new RangeInput("Interval", 10, 200, "px"),
	new CheckboxControl("Adapt Interval for Loops"),
	new ColorSwatch(!1),
	new DropdownMenu("Quality", ["1: Draft", "2: Low", "3: Medium", "4: High", "5: Fine"]),
	new RangeInput("Turbulent", 0, 100),
	new RangeInput("Jag", 0, 100),
	new RangeInput("Opacity", 0, 100),
	new RangeInput("Lines", 2, 30),
	new RangeInput("Bottom", 0, 100),
	new DropdownMenu("Style", ["Normal", "Violent", "Flat"]),
	new DropdownMenu("Shape", ["Parallel", "To the center", "Spread", "Oval", "Pointing"]),
	new CheckboxControl("Randomize Shape"),
	new RangeInput("Random Seed", 0, 100)];
	this.W8();
	var _local1515 = this.e;
	s.clearChildren(_local1515);
	var _local1512 = new ButtonGroupMenu(null, ["Basic", "Advanced"]);
	_local1512.addListener(ActionTypes.E.A, this.alm, this);
	_local1515.appendChild(_local1512.e);
	s.appendHr(_local1515);
	var _local1514 = s.createElement("div"),
		_local1513 = s.createElement("div");
	this.at_ = [_local1514, _local1513];
	_local1515.appendChild(_local1514);
	for (var _local1511 = 0; _local1511 < _local1516.length; _local1511++) {
		(_local1511 < 9 ? _local1514 : _local1513).appendChild(_local1516[_local1511].e);
		if (_local1511 == 6) s.appendBr(_local1514);
	}
	_local1516[0].addListener(ActionTypes.E.A, this.awZ, this);
	this.awZ();
};
FilterEffectPanel.Flam.prototype = new FilterEffectPanel();
FilterEffectPanel.Flam.prototype.awZ = function (l) {
	var _local1518 = this.go,
		_local1517 = _local1518[0].b();
	_local1518[1].setEnabled(_local1517 != 0 && _local1517 != 5);
	_local1518[2].setEnabled(_local1517 != 0 && _local1517 != 5);
	_local1518[4].setEnabled(_local1517 != 0 && _local1517 != 5 && _local1517 != 1);
	_local1518[5].setEnabled(_local1517 != 0 && _local1517 != 5);
	_local1518[6].setEnabled(_local1517 != 0 && _local1517 != 5);
};
FilterEffectPanel.Flam.prototype.alm = function (l) {
	var _local1519 = l.target.b(),
		_local1521 = this.at_,
		_local1520 = this.e;
	_local1520.removeChild(_local1521[1 - _local1519]);
	_local1520.appendChild(_local1521[_local1519]);
};
FilterEffectPanel.boxblur = function () {
	FilterEffectPanel.call(this, "boxblur");
	this.go = [new RangeInput("Radius", 1, 200, " px")];
	this.W8();
};
FilterEffectPanel.boxblur.prototype = new FilterEffectPanel();
FilterEffectPanel.boxblur.prototype.KJ = function (l, d) {
	d[0] = l.Rds.v.val;
};
FilterEffectPanel.boxblur.prototype.PY = function (l, d) {
	l.Rds.v.val = d[0];
};
FilterEffectPanel.GsnB = function () {
	FilterEffectPanel.call(this, "GsnB");
	this.go = [new RangeInput("Radius", .1, 400, "px", 1, !0)];
	this.W8();
};
FilterEffectPanel.GsnB.prototype = new FilterEffectPanel();
FilterEffectPanel.Dila = function () {
	FilterEffectPanel.call(this, "Dila");
	this.go = [
	new RangeInput("Crop", 0, 20, "px", 0),
	new RangeInput("Radius", 0, 400, "px", 0, !0)];

	this.W8();
};
FilterEffectPanel.Dila.prototype = new FilterEffectPanel();
FilterEffectPanel.MtnB = function () {
	FilterEffectPanel.call(this, "MtnB");
	this.go = [
	new AngleInput("Angle"),
	new RangeInput("Distance", 1, 100, " px")];

	this.W8();
};
FilterEffectPanel.MtnB.prototype = new FilterEffectPanel();
FilterEffectPanel.RdlB = function () {
	FilterEffectPanel.call(this, "RdlB");
	this.go = [
	new RangeInput("Amount", 1, 100),
	new ButtonGroupMenu("Mode", ["Spin", "Zoom"]),
	new RangeInput("Position X", 0, 100, "%"),
	new RangeInput("Position Y", 0, 100, "%")];

	this.W8();
};
FilterEffectPanel.RdlB.prototype = new FilterEffectPanel();
FilterEffectPanel.RdlB.prototype.KJ = function (l, d) {
	d[0] = l.Amnt.v;
	d[1] = ["Spn", "Zm"].indexOf(l.BlrM.v.BlrM);
	d[2] = l.Cntr.v.Hrzn.v * 100;
	d[3] = l.Cntr.v.Vrtc.v * 100;
};
FilterEffectPanel.RdlB.prototype.PY = function (l, d) {
	l.Amnt.v = d[0];
	l.BlrM.v.BlrM = ["Spn", "Zm"][d[1]];
	l.Cntr.v.Hrzn.v = d[2] / 100;
	l.Cntr.v.Vrtc.v = d[3] / 100;
};
FilterEffectPanel.aaM(FilterEffectPanel.RdlB.prototype);

// Filter: Displace
FilterEffectPanel.Dspl = function () {
	FilterEffectPanel.call(this, "Dspl");
	this.go = [
	new DropdownMenu("Source (Smart Object)", ["a", "b"]),
	new RangeInput("Horizontal", -100, 100, "px"),
	new RangeInput("Vertical", -100, 100, "px"),
	new DropdownMenu("Undefined Area", ["Wrap Around", "Repeat Edge Pixels"])];

	this.W8();
};
FilterEffectPanel.Dspl.prototype = new FilterEffectPanel();
FilterEffectPanel.Dspl.prototype.KJ = function (l, d, G) {
	this.aqC = [];
	this.mD = [];
	var _local1525 = -1,
		_local1524 = G ? G[0] : null;
	if (_local1524 == null) _local1524 = this.a1Q;else
	this.a1Q = _local1524;
	if (_local1524)
	for (var _local1522 = 0; _local1522 < _local1524.length; _local1522++) {
		var _local1523 = _local1524[_local1522];
		this.aqC.push(_local1523.bf.trim());
		this.mD.push(_local1523.AN);
		if (_local1523.AN == l.DspF.v.pth) _local1525 = _local1522;
	}
	this.go[0].b3(this.aqC);
	d[0] = _local1525 == -1 ? 0 : _local1525;
	d[1] = l.HrzS.v;
	d[2] = l.VrtS.v;
	d[3] = ["WrpA", "RptE"].indexOf(l.UndA.v.UndA);
};
FilterEffectPanel.Dspl.prototype.PY = function (l, d) {
	if (this.mD.length == 0) return;
	l.DspF.v.pth = this.mD[d[0]];
	l.HrzS.v = d[1];
	l.VrtS.v = d[2];
	l.UndA.v.UndA = ["WrpA", "RptE"][d[3]];
};

// Filter: Pinch
FilterEffectPanel.Pnch = function () {
	FilterEffectPanel.call(this, "Pnch");
	this.go = [new RangeInput("Amount", -100, 100, "%")];
	this.W8();
};
FilterEffectPanel.Pnch.prototype = new FilterEffectPanel();

// Filter: Polar Coordinates
FilterEffectPanel["Plr "] = function () {
	FilterEffectPanel.call(this, "Plr ");
	this.go = [new ButtonGroupMenu(null, ["Rect to Polar", "Polar to Rect"])];
	this.W8();
};
FilterEffectPanel["Plr "].prototype = new FilterEffectPanel();

// Filter: Ripple
FilterEffectPanel.Rple = function () {
	FilterEffectPanel.call(this, "Rple");
	this.go = [
	new RangeInput("Amount", -999, 999),
	new DropdownMenu("Size", ["Small", "Medium", "Large"])];

	this.W8();
};
FilterEffectPanel.Rple.prototype = new FilterEffectPanel();

// Filter: Shear
FilterEffectPanel["Shr "] = function () {
	FilterEffectPanel.call(this, "Shr ");
	this.go = [
	new CurveEditor(!0, !0),
	new DropdownMenu("Undefined Area", ["Wrap Around", "Repeat Edge Pixels"])];

	this.W8();
};
FilterEffectPanel["Shr "].prototype = new FilterEffectPanel();
FilterEffectPanel["Shr "].prototype.KJ = function (l, d) {
	var _local1526 = new Matrix2D(0, 255 / 127, 255 / 127, 0, -2, 128),
		_local1527 = JSON.parse(JSON.stringify(l.ShrP.v));
	PixelUtil.presetThumb.D(_local1527, _local1526);
	d[0] = _local1527;
	d[1] = ["WrpA", "RptE"].indexOf(l.UndA.v.UndA);
};
FilterEffectPanel["Shr "].prototype.PY = function (l, d) {
	var _local1528 = new Matrix2D(0, 255 / 127, 255 / 127, 0, -2, 128);
	_local1528.hI();
	PixelUtil.presetThumb.D(d[0], _local1528);
	l.ShrP.v = d[0];
	l.ShrE.v = d[0].length - 1;
	l.UndA.v.UndA = ["WrpA", "RptE"][d[1]];
};

// Filter: Spherize
FilterEffectPanel.Sphr = function () {
	FilterEffectPanel.call(this, "Sphr");
	this.go = [
	new RangeInput("Amount", -100, 100),
	new DropdownMenu("Mode", ["Normal", "Horizontal", "Vertical"])];

	this.W8();
};
FilterEffectPanel.Sphr.prototype = new FilterEffectPanel();
FilterEffectPanel.Sphr.prototype.KJ = function (l, d) {
	d[0] = l.Amnt.v;
	d[1] = ["Nrml", "HrzO", "VrtO"].indexOf(l.SphM.v.SphM);
};
FilterEffectPanel.Sphr.prototype.PY = function (l, d) {
	l.Amnt.v = d[0];
	l.SphM.v.SphM = ["Nrml", "HrzO", "VrtO"][d[1]];
};

// Filter: Dither
FilterEffectPanel.Dthr = function () {
	FilterEffectPanel.call(this, "Dthr");
	this.go = [
	new DropdownMenu("Palette", ["Black & White", "RGB 2x2x2", "RGB 4x4x4", "RGB 8x8x4"]),
	new ButtonGroupMenu("Method", ["None", "Floyd-Steinberg", "Bayer 4x4"])];

	this.W8();
};
FilterEffectPanel.Dthr.prototype = new FilterEffectPanel();
FilterEffectPanel.Dthr.prototype.KJ = function (l, d) {
	d[0] = l.Plte.v;
	d[1] = l.Mthd ? l.Mthd.v : 1;
};
FilterEffectPanel.Dthr.prototype.PY = function (l, d) {
	l.Plte.v = d[0];
	l.Mthd.v = d[1];
};

// Filter: Particles
FilterEffectPanel.Part = function () {
	FilterEffectPanel.call(this, "Part");
	this.go = [
	new RangeInput("Count", 0, 100, "%"),
	new RangeInput("Size", 1, 50, "px"),
	new RangeInput("Depth", 0, 100, "%"),
	new RangeInput("Brightness", 10, 1e3, "%"),
	new ColorSwatch(!0),
	new RangeInput("Time", 0, 1, null, 3),
	new RangeInput("Turbulence", 0, 100, "%"),
	new CheckboxControl("Blink"),
	new CheckboxControl("Fall")];
	this.W8([4]);
};
FilterEffectPanel.Part.prototype = new FilterEffectPanel();
FilterEffectPanel.Part.prototype.KJ = function (l, d) {
	d[0] = l.Cont.v;
	d[1] = l.Size.v;
	d[2] = l.Dpth.v;
	d[3] = l.Brgh.v;
	d[4] = l.Clr.v;
	d[5] = l.Time.v;
	d[6] = l.Turb.v;
	d[7] = l.Blnk.v;
	d[8] = l.Fall.v;
};
FilterEffectPanel.Part.prototype.PY = function (l, d) {
	l.Cont.v = d[0];
	l.Size.v = d[1];
	l.Dpth.v = d[2];
	l.Brgh.v = d[3];
	l.Clr.v = d[4];
	l.Time.v = d[5];
	l.Turb.v = d[6];
	l.Blnk.v = d[7];
	l.Fall.v = d[8];
};

// Filter: Twirl
FilterEffectPanel.Twrl = function () {
	FilterEffectPanel.call(this, "Twrl");
	this.go = [new RangeInput("Angle", -999, 999)];
	this.W8();
};
FilterEffectPanel.Twrl.prototype = new FilterEffectPanel();

// Filter: Wave
FilterEffectPanel.Wave = function () {
	FilterEffectPanel.call(this, "Wave");
	this.a6x = [1, 2, 3, 4];
	this.go = [
	new RangeInput("Number of Generators", 1, 100),
	new OffsetRangeInput("Min Length", 1, 999),
	new OffsetRangeInput("Max Length", 1, 999),
	new OffsetRangeInput("Min Ampl.", 1, 999),
	new OffsetRangeInput("Max Ampl.", 1, 999),
	new OffsetRangeInput("Scale X", 1, 100, "%"),
	new OffsetRangeInput("Scale Y", 1, 100, "%"),
	new ButtonGroupMenu("Type", ["Sine", "Triangle", "Square"]),
	new DropdownMenu("Undefined Area", ["Wrap Around", "Repeat Edge Pixels"])];

	this.W8();
};
FilterEffectPanel.Wave.prototype = new FilterEffectPanel();

// Filter: ZigZag
FilterEffectPanel.ZgZg = function () {
	FilterEffectPanel.call(this, "ZgZg");
	this.go = [
	new RangeInput("Amount", -100, 100),
	new RangeInput("Ridges", 0, 20),
	new DropdownMenu("Style", ["Around Center", "Out From Center", "Pond Ripples"])];

	this.W8();
};
FilterEffectPanel.ZgZg.prototype = new FilterEffectPanel();

// Filter: Surface Blur
FilterEffectPanel.surfaceBlur = function () {
	FilterEffectPanel.call(this, "surfaceBlur");
	this.go = [
	new RangeInput("Radius", 1, 200, " px"),
	new RangeInput("Threshold", 1, 255, " px")];

	this.W8();
};
FilterEffectPanel.surfaceBlur.prototype = new FilterEffectPanel();
FilterEffectPanel.surfaceBlur.prototype.KJ = function (l, d) {
	d[0] = l.Rds.v.val;
	d[1] = l.Thsh.v;
};
FilterEffectPanel.surfaceBlur.prototype.PY = function (l, d) {
	l.Rds.v.val = d[0];
	l.Thsh.v = d[1];
};

FilterEffectPanel.AdNs = function () {
	FilterEffectPanel.call(this, "AdNs");
	this.go = [
	new RangeInput("Amount", 0, 200, " %"),
	new DropdownMenu("Distribution", ["Gaussian", "Uniform"]),
	new CheckboxControl("Monochromatic")];
	this.W8();
};
FilterEffectPanel.AdNs.prototype = new FilterEffectPanel();
FilterEffectPanel.DstS = function () {
	FilterEffectPanel.call(this, "DstS");
	this.go = [
	new RangeInput("Radius", 1, 200, " px"),
	new RangeInput("Threshold", 1, 255, " px")];

	this.W8();
};
FilterEffectPanel.DstS.prototype = new FilterEffectPanel();
FilterEffectPanel["Mdn "] = function () {
	FilterEffectPanel.call(this, "Mdn ");
	this.go = [new RangeInput("Radius", 1, 200, " px")];
	this.W8();
};
FilterEffectPanel["Mdn "].prototype = new FilterEffectPanel();
FilterEffectPanel["Mdn "].prototype.KJ = function (l, d) {
	d[0] = l.Rds.v.val;
};
FilterEffectPanel["Mdn "].prototype.PY = function (l, d) {
	l.Rds.v.val = d[0];
};


FilterEffectPanel.ClrH = function () {
	FilterEffectPanel.call(this, "ClrH");
	this.go = [new RangeInput("Radius", 4, 100, " px")];
	for (var _local1529 = 1; _local1529 < 4; _local1529++) this.go.push(new RangeInput("Angle " + _local1529, 0, 90, " \xB0"));
	this.W8();
};
FilterEffectPanel.ClrH.prototype = new FilterEffectPanel();
FilterEffectPanel.ClrH.prototype.KJ = function (l, d) {
	d[0] = l.Rds.v;
	for (var _local1530 = 1; _local1530 < 4; _local1530++) d[_local1530] = l["Ang" + _local1530].v;
};
FilterEffectPanel.ClrH.prototype.PY = function (l, d) {
	l.Rds.v = d[0];
	for (var _local1531 = 1; _local1531 < 4; _local1531++) l["Ang" + _local1531].v = d[_local1531];
};
FilterEffectPanel.ClrH.prototype.refresh = function () {
	var _local1533 = this.go;
	_local1533[0].refresh();
	for (var _local1532 = 1; _local1532 < 4; _local1532++) _local1533[_local1532].setLabel("Angle" + " " + _local1532);
};


FilterEffectPanel.Crst = function () {
	FilterEffectPanel.call(this, "Crst");
	this.go = [new RangeInput("Cell Size", 3, 100, " px")];
	this.W8();
};
FilterEffectPanel.Crst.prototype = new FilterEffectPanel();
FilterEffectPanel.Crst.prototype.KJ = function (l, d) {
	d[0] = l.ClSz.v;
};
FilterEffectPanel.Crst.prototype.PY = function (l, d) {
	l.ClSz.v = d[0];
};


FilterEffectPanel.Mztn = function () {
	FilterEffectPanel.call(this, "Mztn");
	this.go.push(new DropdownMenu("Type", "Fine Dots,Medium Dots,Grainy Dots,Coarse Dots,Short Lines,Medium Lines,Long Lines,Short Strokes,Medium Strokes,Long Strokes".split(","), "Exposure"));
	this.mD = "FnDt MdmD GrnD CrsD ShrL MdmL LngL ShSt MdmS LngS".split(" ");
	this.W8();
};
FilterEffectPanel.Mztn.prototype = new FilterEffectPanel();
FilterEffectPanel.Mztn.prototype.KJ = function (l, d) {
	d[0] = this.mD.indexOf(l.MztT.v.MztT);
};
FilterEffectPanel.Mztn.prototype.PY = function (l, d) {
	l.MztT.v.MztT = this.mD[d[0]];
};


FilterEffectPanel["Msc "] = function () {
	FilterEffectPanel.call(this, "Msc ");
	this.go = [new RangeInput("Cell Size", 2, 200, " px")];
	this.W8();
};
FilterEffectPanel["Msc "].prototype = new FilterEffectPanel();
FilterEffectPanel["Msc "].prototype.KJ = function (l, d) {
	d[0] = l.ClSz.v.val;
};
FilterEffectPanel["Msc "].prototype.PY = function (l, d) {
	l.ClSz.v.val = d[0];
};


FilterEffectPanel.Pntl = function () {
	FilterEffectPanel.call(this, "Pntl");
	this.go = [new RangeInput("Cell Size", 3, 100, " px")];
	this.W8();
};
FilterEffectPanel.Pntl.prototype = new FilterEffectPanel();
FilterEffectPanel.Pntl.prototype.KJ = function (l, d) {
	d[0] = l.ClSz.v;
};
FilterEffectPanel.Pntl.prototype.PY = function (l, d) {
	l.ClSz.v = d[0];
};


FilterEffectPanel.smartSharpen = function () {
	FilterEffectPanel.call(this, "smartSharpen");
	this.go = [
	new RangeInput("Amount", 1, 200, "%"),
	new RangeInput("Radius", 0, 200, "px", 1, !0)];

	this.W8();
};
FilterEffectPanel.smartSharpen.prototype = new FilterEffectPanel();
FilterEffectPanel.smartSharpen.prototype.KJ = function (l, d) {
	d[0] = l.Amnt ? l.Amnt.v.val : 200;
	d[1] = l.Rds ? l.Rds.v.val : 1;
};
FilterEffectPanel.smartSharpen.prototype.PY = function (l, d) {
	l.Amnt.v.val = d[0];
	l.Rds.v.val = d[1];
};


FilterEffectPanel.UnsM = function () {
	FilterEffectPanel.call(this, "UnsM");
	this.go = [
	new RangeInput("Amount", 1, 200, " %"),
	new RangeInput("Radius", .1, 400, "px", 1, !0),
	new RangeInput("Threshold", 0, 255, " ")];

	this.W8();
};
FilterEffectPanel.UnsM.prototype = new FilterEffectPanel();
FilterEffectPanel.HghP = function () {
	FilterEffectPanel.call(this, "HghP");
	this.go = [new RangeInput("Radius", .1, 400, "px", 1, !0)];
	this.W8();
};
FilterEffectPanel.HghP.prototype = new FilterEffectPanel();
FilterEffectPanel.HsbP = function () {
	FilterEffectPanel.call(this, "HsbP");
	this.go = [
	new ButtonGroupMenu("Input", ["RGB", "HSB", "HSL"]),
	new ButtonGroupMenu("Output", ["RGB", "HSB", "HSL"])];

	this.W8();
};
FilterEffectPanel.HsbP.prototype = new FilterEffectPanel();
FilterEffectPanel["Mxm "] = function () {
	FilterEffectPanel.call(this, "Mxm ");
	this.go = [
	new RangeInput("Radius", .1, 200, " px", 1, !0),
	new DropdownMenu("Shape", ["Square", "Circle"])];

	this.W8();
};
FilterEffectPanel["Mxm "].prototype = new FilterEffectPanel();
FilterEffectPanel["Mnm "] = function () {
	FilterEffectPanel.call(this, "Mnm ");
	this.go = [
	new RangeInput("Radius", .1, 200, " px", 1, !0),
	new DropdownMenu("Shape", ["Square", "Circle"])];

	this.W8();
};
FilterEffectPanel["Mnm "].prototype = new FilterEffectPanel();
FilterEffectPanel.Ofst = function () {
	FilterEffectPanel.call(this, "Ofst");
	this.go = [
	new RangeInput("Horizonal", -1024, 1024, " px"),
	new RangeInput("Vertical", -1024, 1024, " px"),
	new DropdownMenu("Undefined Area", ["Repeat Edge Pixels", "Set to Transparent", "Wrap Around"])];

	this.W8();
};
FilterEffectPanel.Ofst.prototype = new FilterEffectPanel();
FilterEffectPanel.Kale = function () {
	FilterEffectPanel.call(this, "Kale");
	this.go = [
	new OffsetRangeInput("Mirrors", 2, 20),
	new OffsetRangeInput("Angle", 0, 360, "\xB0")];

	this.W8();
};
FilterEffectPanel.Kale.prototype = new FilterEffectPanel();
FilterEffectPanel.Kale.prototype.KJ = function (l, d) {
	d[0] = l.Mirr.v;
	d[1] = l.MRot.v;
};
FilterEffectPanel.Kale.prototype.PY = function (l, d) {
	l.Mirr.v = d[0];
	l.MRot.v = d[1];
};
FilterEffectPanel.Rept = function () {
	FilterEffectPanel.call(this, "Rept");
	this.go = [
	new OffsetRangeInput("Scale", 1, 300, " %"),
	new OffsetRangeInput("Row Shift", -50, 50, " %"),
	new OffsetRangeInput("Space X", -99, 200, " %"),
	new OffsetRangeInput("Space Y", -99, 200, " %"),
	new CheckboxControl("Auto Color"),
	new AngleInput("Angle")];
	this.W8();
};
FilterEffectPanel.Rept.prototype = new FilterEffectPanel();
FilterEffectPanel.Rept.prototype.KJ = function (l, d) {
	d[0] = l.Scl.v.val;
	d[1] = l.Rsft.v.val;
	d[2] = l.SpcX.v.val;
	d[3] = l.SpcY.v.val;
	d[4] = l.SpcC.v;
	d[5] = [l.Angl.v];
};
FilterEffectPanel.Rept.prototype.PY = function (l, d) {
	l.Scl.v.val = d[0];
	l.Rsft.v.val = d[1];
	l.SpcX.v.val = d[2];
	l.SpcY.v.val = d[3];
	l.SpcC.v = d[4];
	l.Angl.v = d[5][0];
	return l;
};
FilterEffectPanel.Ctoa = function () {
	FilterEffectPanel.call(this, "Ctoa");
	this.go = [
	new LabelItem("Color"),
	new ColorSwatch(!0),
	new RangeInput("Transparency Threshold", 0, 100, " %"),
	new RangeInput("Opacity Threshold", 0, 100, " %")];
	this.W8();
};
FilterEffectPanel.Ctoa.prototype = new FilterEffectPanel();
FilterEffectPanel.Ctoa.prototype.KJ = function (l, d) {
	d[0] = l.Clr.v;
	d[1] = l.Trsp.v.val;
	d[2] = l.Opct.v.val;
};
FilterEffectPanel.Ctoa.prototype.PY = function (l, d) {
	l.Clr.v = d[0];
	l.Trsp.v.val = d[1];
	l.Opct.v.val = d[2];
};
FilterEffectPanel.LqFy = function () {
	FilterEffectPanel.call(this, "LqFy");
	this.Fb = !1;
	this.nt = !1;
	this.YE = null;
	this.azQ = null;
	this.G = 0;
	this.qj = -1;
	this.d = {
		vu: [
		[{
			G: {
				id: 0,
				name: "Smudge",
				mq: "liq/smudge"
			}
		}],
		[{
			G: {
				id: 1,
				name: "Reconstruct",
				mq: "liq/reconstruct"
			}
		}],
		[{
			G: {
				id: 2,
				name: "Smoothen",
				mq: "liq/smooth"
			}
		}],
		[{
			G: {
				id: 3,
				name: "Twirl",
				mq: "liq/twirl"
			}
		}],
		[{
			G: {
				id: 4,
				name: "Shrink",
				mq: "liq/shrink"
			}
		}],
		[{
			G: {
				id: 5,
				name: "Blow",
				mq: "liq/blow"
			}
		}],
		[{
			G: {
				id: 6,
				name: "Push Left",
				mq: "liq/pleft"
			}
		}],
		[{
			G: {
				id: 7,
				name: "Hand",
				mq: "tools/hand"
			}
		}],
		[{
			G: {
				id: 8,
				name: "Zoom In",
				mq: "zoomIn"
			}
		}],
		[{
			G: {
				id: 9,
				name: "Zoom Out",
				mq: "zoomOut"
			}
		}]],

		keys: []
	};
	this.QB = new ToolbarColumn(this.d, !1);
	this.QB.fr(0);
	this.QB.addListener(ActionTypes.E.L, this.a2x, this);
	this.QP = es._k();
	this.c9 = null;
	this.hr = [];
	this.Jb = -1;
	this.B7 = null;
	this.aek = null;
	this.J0 = null;
	this.D5 = null;
	this.S4 = null;
	var _local1540 = s.createElement("div", "flexrow");
	this.jo = _local1540;
	this.e.appendChild(_local1540);
	_local1540.appendChild(this.QB.e);
	this.view = new LayerCanvasPanel(!0);
	this.view.resize(100, 100);
	this.view.addListener("mousedown", this.JO, this);
	this.view.addListener("mousemove", this.D2, this);
	this.view.addListener("mouseup", this.qd, this);
	this.view.addListener("zoom", this.ed, this);
	_local1540.appendChild(this.view.e);
	var _local1539 = s.createElement("div", "form");
	_local1540.appendChild(_local1539);
	this.nY = _local1539;
	_local1539.style.width = "230px";
	this.pK = [
	new RangeInput("Size", 0, 1e3, null, !1, !0),
	new RangeInput("Density", 0, 100, null, !1, !1),
	new RangeInput("Rate", 0, 100, null, !1, !1),
	new CheckboxControl("Background"),
	new RangeInput("Opacity", 0, 100, null, !1, !1),
	new CheckboxControl("Preview")];

	var _local1535 = this.QP.Brsh.v;
	_local1535.Dmtr.v.val = 100;
	var _local1538 = [100, 50, 100, !1, 100, !0];
	for (var _local1534 = 0; _local1534 < this.pK.length; _local1534++) {
		var _local1537 = this.pK[_local1534];
		_local1537.c(_local1538[_local1534]);
		if (_local1534 == 4) _local1537.disable();
		_local1537.addListener(ActionTypes.E.A, this.ajJ, this);
		_local1539.appendChild(_local1537.e);
	}
	var _local1536 = this.ay1 = new ToolbarButton("Reset", !0, null, !0);
	_local1536.addListener("click", this.Jx, this);
	_local1539.appendChild(_local1536.e);
	this.abi = this.fA.bind(this);
	this.r5 = new UIComponent();
	this.r5.e = s.createElement("div", "floatcont");
	this.Z0 = new ToolbarButton("Menu", !1, null, !0);
	var _local1541 = this.Z0.e;
	_local1541.setAttribute("style", "position:absolute; right:13px; top:47px");
	s.addPointerDown(_local1541, this.auz.bind(this));
};
FilterEffectPanel.LqFy.prototype = new FilterEffectPanel();
FilterEffectPanel.LqFy.prototype.ZW = function () {
	return !0;
};
FilterEffectPanel.LqFy.prototype.ul = function (l) {
	this.nY.appendChild(l);
};
FilterEffectPanel.LqFy.prototype.auz = function (l) {
	if (s.isInDocument(this.r5.e)) return;
	l.stopPropagation();
	var _local1543 = this.Z0.e.getBoundingClientRect();
	this.r5.e.appendChild(this.nY);
	var _local1542 = new Action(ActionTypes.E.L, !0);
	_local1542.data = {
		a: ActionTypes.$.dY,
		A3: this.r5,
		x: _local1543.right + _local1543.width - 290,
		y: _local1543.top + _local1543.height
	};
	this.dispatch(_local1542);
};
FilterEffectPanel.LqFy.prototype.o9 = function (l) {
	this.Fb = l.l(KeyboardHandler.Jm);
	var _local1548 = f.BrushToolBase.HK(this.QP, l);
	if (_local1548 != null) {
		this.QP = _local1548;
		this.ed();
		this.pK[0].c(_local1548.Brsh.v.Dmtr.v.val);
	} else if (l.l(KeyboardHandler.wz) && l.l(KeyboardHandler.dr)) {
		var _local1544 = this.hr;
		if (l.l(KeyboardHandler.Zz)) {
			if (this.Jb + 1 < _local1544.length) this.Jb++;
		} else if (this.Jb > 0) this.Jb--;
		this.c9.map = _local1544[this.Jb].slice(0);
		this.VP(null);
	} else if (this.G <= 6) this.view.o9(l);
	var _local1547 = this.G,
		_local1546 = -1,
		_local1545 = l.l(KeyboardHandler.Jm);
	if (_local1545 && this.qj == -1) {
		if (_local1547 == 0) _local1546 = 1;
		if (_local1547 == 4) _local1546 = 5;
		if (_local1547 == 5) _local1546 = 4;
		if (_local1546 != -1) this.qj = _local1547;
	}
	if (!_local1545 && this.qj != -1) {
		_local1546 = this.qj;
		this.qj = -1;
	}
	if (_local1546 != -1) {
		this.G = _local1546;
		this.QB.fr(this.G);
	}
};
FilterEffectPanel.LqFy.prototype.a2x = function (l) {
	if (l.data.a == ActionTypes.$.yb) {
		var _local1549 = this.G = l.data.G;
		this.QB.fr(this.G);
		this.view.o9(_local1549 > 6 ? LayerCanvasPanel.a9m(_local1549 - 7) : new KeyboardHandler());
	}
};
FilterEffectPanel.LqFy.prototype.ajJ = function (l) {
	var _local1552 = l.currentTarget,
		_local1550 = this.pK.indexOf(_local1552),
		_local1551 = this.QP.Brsh.v;
	if (_local1550 == 0) {
		_local1551.Dmtr.v.val = _local1552.b();
		this.ed();
	}
	this.pK[4].setEnabled(this.pK[3].b());
	if (_local1550 > 2) this.VP(null);
};
FilterEffectPanel.LqFy.prototype.Zy = function () {
	var _local1553 = this.hr;
	this.Jb++;
	_local1553[this.Jb] = this.c9.map.slice(0);
	while (_local1553.length > this.Jb + 1) _local1553.pop();
	while (_local1553.length > 50) {
		_local1553 = _local1553.slice(1);
		this.Jb--;
	}
};
FilterEffectPanel.LqFy.prototype.JO = function (l) {
	this.YE = this.view.KE();
	this.azQ = new Point2D(0, 0);
	this.nt = !0;
	window.requestAnimationFrame(this.abi);
};
FilterEffectPanel.LqFy.prototype.D2 = function (l) {
	var _local1555 = this.view.KE(),
		_local1554 = new Point2D(_local1555.x - this.YE.x, _local1555.y - this.YE.y);
	if (this.G == 0 || this.G == 6) this.afo(_local1554);
	this.YE = _local1555;
};
FilterEffectPanel.LqFy.prototype.qd = function (l) {
	this.Zy();
	this.nt = !1;
};
FilterEffectPanel.LqFy.prototype.fA = function (l) {
	if (this.G != 0 && this.G != 6) this.afo(new Point2D(0, 0));
	if (this.nt) window.requestAnimationFrame(this.abi);
};
FilterEffectPanel.LqFy.prototype.afo = function (l) {
	var _local1573 = this.c9,
		_local1560 = _local1573.iJ / this.B7.m,
		_local1572 = this.YE,
		_local1568 = this.QP.Brsh.v,
		_local1565 = _local1568.Dmtr.v.val,
		_local1581 = Date.now(),
		_local1562 = _local1573.iJ,
		_local1582 = _local1573.Tq,
		_local1574 = Math.sqrt(l.x * l.x + l.y * l.y),
		_local1564 = Math.max(1, Math.ceil(_local1574 / 2)),
		_local1566 = l.x / _local1564,
		_local1563 = l.y / _local1564,
		_local1578 = _local1572.clone(),
		_local1580 = this.G,
		_local1567 = this.pK[1].b() / 100,
		_local1576 = this.pK[2].b() / 100,
		_local1575 = [.005, .015, 0, 0, .2, .2, .01, .01, .05, .35, .1, .1, .005, .015],
		_local1570 = _local1575[_local1580 * 2],
		_local1577 = _local1575[_local1580 * 2 + 1],
		_local1559 = (1 - _local1567) * _local1570 + _local1567 * _local1577,
		_local1558 = _local1565 * _local1560 / 2;

	for (var _local1556 = 0; _local1556 < _local1564; _local1556++) {
		var _local1579 = [];
		_local1578.x += _local1566;
		_local1578.y += _local1563;
		PixelUtil.Ad.aga(_local1573.map, _local1562, _local1582, _local1580, _local1578.x * _local1560, _local1578.y * _local1560, _local1558, _local1567, _local1576, _local1566 * _local1560, _local1563 * _local1560, _local1579, this.Fb);
		PixelUtil.Ad.a6o(_local1562, _local1582, _local1573.map, _local1579, 2 * _local1559 * _local1576);
	}
	var _local1561 = new Rect(0, 0, _local1562, _local1582),
		_local1569 = new Rect(_local1572.x * _local1560, _local1572.y * _local1560, 0, 0);
	_local1569.rC(_local1565 * _local1560 * .5, _local1565 * _local1560 * .5);
	var _local1571 = _local1569.clone();
	_local1571.offset(l.x * _local1560, l.y * _local1560);
	_local1569 = _local1569.Cw(_local1571);
	var _local1557 = new Rect(_local1569.x / _local1560, _local1569.y / _local1560, _local1569.m / _local1560, _local1569.n / _local1560);
	_local1557 = PixelUtil.vec.f1(_local1557).wD(this.B7);
	this.pK[5].c(!0);
	this.VP(_local1557);
};
FilterEffectPanel.LqFy.prototype.ed = function () {
	var _local1583 = iU.$I(this.QP, null, this.view.KI().N);
	this.view.uH(_local1583);
};
FilterEffectPanel.LqFy.prototype.c = function (l, d, G, b, V) {
	G = G.clone();
	if (d == null) return;
	if (!b.XB(G)) {
		var _local1585 = G.Cw(b),
			_local1587 = PixelUtil.allocBytes(_local1585.O() * 4);
		PixelUtil.blitRgbaRect(d, G, _local1587, _local1585);
		d = _local1587;
		G = _local1585;
		var _local1584 = PixelUtil.allocBytes(_local1585.O() * 4);
		PixelUtil.blitRgbaRect(V, b, _local1584, _local1585);
		V = _local1584;
	}
	G.x = G.y = 0;
	this.J0 = d;
	this.aek = V;
	this.S4 = d.slice(0);
	this.D5 = d.slice(0);
	this.B7 = G;
	this.c9 = ei.Cd(new Uint8Array(l.LqMe.v).buffer);
	var _local1588 = G.m,
		_local1586 = G.n;
	if (this.c9.iJ / _local1588 < .22) {
		this.c9 = {
			iJ: Math.floor(_local1588 / 4),
			Tq: Math.floor(_local1586 / 4)
		};
		this.c9.map = new Float32Array(this.c9.iJ * this.c9.Tq * 2);
	}
	this.hr = [];
	this.Jb = -1;
	this.Zy();
	this.VP(null);
	this.view.kn();
	this.ed();
};
FilterEffectPanel.LqFy.prototype.b = function () {
	var _local1592 = FilterHelper.oT("LqFy"),
		_local1591 = new Uint8Array(ei.CO(this.c9)),
		_local1590 = [];
	for (var _local1589 = 0; _local1589 < _local1591.length; _local1589++) _local1590.push(_local1591[_local1589]);
	_local1592.LqMe.v = _local1590;
	return _local1592;
};
FilterEffectPanel.LqFy.prototype.resize = function (l, d) {
	this.QB.resize(l, d);
	var _local1593 = this.Z0.e,
		_local1594 = this.nY;
	this.jo.appendChild(_local1594);
	this.jo.appendChild(_local1593);
	if (l > 450 && l - d > 200) {
		_local1594.style.marginLeft = "1em";
		this.jo.removeChild(_local1593);
		this.view.resize(l - 238 - 45, d);
	} else {
		_local1594.style.marginLeft = "";
		this.jo.removeChild(_local1594);
		this.view.resize(l - 40, d);
	}
};
FilterEffectPanel.LqFy.prototype.refresh = function () {
	this.QB.refresh();
	this.ay1.refresh();
	for (var _local1595 = 0; _local1595 < this.pK.length; _local1595++) this.pK[_local1595].refresh();
};
FilterEffectPanel.LqFy.prototype.Jx = function () {
	this.c9.map.fill(0);
	this.Zy();
	this.VP(null);
};
FilterEffectPanel.LqFy.prototype.VP = function (l) {
	var _local1599 = this.B7,
		_local1596 = this.J0,
		_local1598 = this.S4,
		_local1597 = this.c9;
	if (this.pK[5].b()) PixelUtil.Ad.Dq(_local1596, this.D5, _local1599.m, _local1599.n, l, _local1597.map, _local1597.iJ, _local1597.Tq, 0);else
	this.D5.set(_local1596);
	if (this.pK[3].dB()) {
		PixelUtil.blitRgbaRect(this.aek, _local1599, _local1598, _local1599, l ? l : _local1599);
		PixelUtil.blend.compositeBlend("norm", this.D5, _local1599, _local1598, _local1599, l ? l : _local1599, this.pK[4].b() / 100);
	} else PixelUtil.copyByteBuffer(this.D5, _local1598);
	this.view.c([{
		uA: _local1599,
		data: _local1598.buffer
	}]);
};
FilterEffectPanel.GEfc = function () {
	FilterEffectPanel.call(this, "GEfc");
	this.kA = 0;
	this.hW = 0;
	this.J0 = null;
	this.S4 = null;
	this.B7 = null;
	this.mN = null;
	this.iQ = null;
	this.xr = 0;
	var _local1604 = s.createElement("div", "flexrow");
	this.jo = _local1604;
	this.e.appendChild(_local1604);
	this.view = new LayerCanvasPanel(null);
	this.view.resize(100, 100);
	_local1604.appendChild(this.view.e);
	this.b0 = "";
	this.Xg = 270;
	var _local1603 = this.nS = s.createElement("div", "form scrollable");
	_local1604.appendChild(_local1603);
	_local1603.setAttribute("style", "width:" + this.Xg + "px;");
	var _local1600 = this.G3 = s.createElement("div", "form");
	_local1604.appendChild(_local1600);
	_local1600.setAttribute("style", "width:230px;  margin:0 10px");
	this.mw = {};
	for (var _local1602 in TextStyleHelper.names) {
		var _local1601 = new FilterEffectPanel.GEfc.mV(_local1602);
		_local1601.parent = this;
		this.mw[_local1602] = _local1601;
		_local1601.addListener(ActionTypes.E.A, this.aAr, this);
	}
	this.MG = !0;
	this.Z0 = new ToolbarButton("Menu", null, null, !0);
	this.Z0.addListener("click", this.akQ, this);
	_local1604.appendChild(this.Z0.e);
	this.By = new ToolbarButton(">>", null, null, !0);
	this.By.addListener("click", this.ahz, this);
	_local1600.appendChild(this.By.e);
	this.Y5 = s.createElement("div");
	this.Y5.setAttribute("style", "margin-bottom:1.5em;  display:inline-block;  width:calc(100% - 40px);");
	_local1600.appendChild(this.Y5);
	this.Qt = s.createElement("div");
	this.Qt.style.minHeight = "14em";
	this.Qt.style.marginBottom = "1em";
	_local1600.appendChild(this.Qt);
	this.K0 = s.createElement("div", "lpbody scrollable");
	this.S8 = s.createElement("div", "lpfoot");
	_local1600.appendChild(this.K0);
	_local1600.appendChild(this.S8);
	this.addListener("click", this.ag7, this);
	this.lM = [];
	ChannelsPanel.sY([
	[5, 3],
	[5, 4]],
	this.lM, this.S8, this.vR.bind(this));
};
FilterEffectPanel.GEfc.prototype = new FilterEffectPanel();
FilterEffectPanel.GEfc.prototype.ZW = function () {
	return !0;
};
FilterEffectPanel.GEfc.prototype.ul = function (l) {
	this.Y5.appendChild(l);
};
FilterEffectPanel.GEfc.prototype.BM = function (l, d) {
	this.mN = l;
};
FilterEffectPanel.GEfc.prototype.ahz = function (l) {
	var _local1605 = this.nS.style.display != "none";
	this.nS.style.display = _local1605 ? "none" : "";
	this.By.setLabel(_local1605 ? "<<" : ">>");
	this.resize();
};
FilterEffectPanel.GEfc.prototype.akQ = function (l) {
	this.MG = !this.MG;
	this.resize();
};
FilterEffectPanel.GEfc.prototype.resize = function (l, d) {
	var _local1606 = this.nS.style.display != "none";
	if (l != null) {
		this.kA = l;
		this.hW = d;
		if (l < 1e3 && _local1606 || l >= 1e3 && !_local1606) {
			this.ahz();
			_local1606 = !_local1606;
		}
		this.MG = l > 600;
	} else {
		l = this.kA;
		d = this.hW;
	}
	var _local1607 = this.MG ? 240 + (_local1606 ? this.Xg + 10 : 0) : 0;
	if (s.isInDocument(this.G3) && !this.MG) {
		this.jo.removeChild(this.nS);
		this.jo.removeChild(this.G3);
	}
	if (!s.isInDocument(this.G3) && this.MG) {
		this.jo.appendChild(this.nS);
		this.jo.appendChild(this.G3);
	}
	this.nS.style.height = d + "px";
	this.view.resize(l - _local1607, d);
	this.K0.style.height = d - Math.max(this.Qt.getBoundingClientRect().height, 186) - 96 + "px";
	this.Z0.e.setAttribute("style", "position:absolute; top:46px;  right:" + (_local1607 + 16) + "px");
};
FilterEffectPanel.GEfc.prototype.ax9 = function () {
	var _local1623 = FormatHandler.RT.get("img/beach", !0)[0],
		_local1619 = _local1623.uA,
		_local1609 = this.nS,
		_local1618 = Math.floor(s.getDevicePixelRatio() * (this.Xg - 40) / 3),
		_local1616 = ~~(_local1618 * .7),
		_local1613 = new Rect(0, 0, _local1618, _local1616),
		_local1626 = PixelUtil.allocBytes(_local1618 * _local1616 * 4),
		_local1610 = _local1626.slice(0),
		_local1627 = Math.round(10 * s.getDevicePixelRatio()),
		_local1620 = new ImageData(new Uint8ClampedArray(_local1610.buffer), _local1618, _local1616);
	PixelUtil.blitRgbaRect(new Uint8Array(_local1623.data), _local1619, _local1626, new Rect(Math.round((_local1619.m - _local1618) / 2), Math.round((_local1619.n - _local1616) / 2), _local1618, _local1616));
	var _local1612 = s.createElement("canvas"),
		_local1614 = _local1612.getContext("2d", { willReadFrequently: true });
	_local1612.width = _local1618;
	_local1612.height = _local1616 + Math.round(_local1627 * 1.5);
	_local1614.font = _local1627 + "px sans-serif";
	this.$A = {};
	var _local1611 = this.as3.bind(this);
	for (var _local1608 = 0; _local1608 < TextStyleHelper.JJ.length; _local1608++) {
		var _local1624 = TextStyleHelper.JJ[_local1608],
			_local1625 = s.createElement("div");
		_local1609.appendChild(_local1625);
		_local1625.setAttribute("style", "background-color:rgba(0,0,0,0.2); padding:0px 8px; margin-bottom:8px");
		_local1625.textContent = languageManager.get(_local1624);
		for (var _local1615 in TextStyleHelper.names) {
			var _local1622 = TextStyleHelper.names[_local1615];
			if (_local1622[0] != _local1608) continue;
			TextStyleHelper.Qz(_local1615, {
				rect: _local1613,
				buffer: _local1626
			}, TextStyleHelper.oT(_local1615), {
				o: 0,
				J: 0,
				k: 0
			}, {
				o: 255,
				J: 255,
				k: 255
			}, {
				rect: _local1613,
				buffer: _local1610
			}, {});
			_local1614.fillStyle = "black";
			_local1614.fillRect(0, 0, 500, 500);
			_local1614.putImageData(_local1620, 0, 0);
			var _local1621 = languageManager.get(_local1622[1]);
			_local1614.fillStyle = "white";
			_local1614.fillText(_local1621, (_local1618 - _local1614.measureText(_local1621).width) / 2, _local1616 + Math.round(_local1627 * 1.1));
			var _local1617 = s.createElement("div");
			_local1609.appendChild(_local1617);
			_local1617.setAttribute("style", "display:inline-block; cursor:pointer; padding: 5px 5px 0 5px; margin-bottom:5px");
			_local1617.addEventListener("click", _local1611, !1);
			var _local1625 = s.createElement("img");
			_local1617.appendChild(_local1625);
			_local1625.setAttribute("src", _local1612.toDataURL());
			_local1625.setAttribute("style", "width:" + _local1618 / s.getDevicePixelRatio() + "px; margin-bottom:0px;");
			this.$A[_local1615] = _local1617;
		}
	}
};
FilterEffectPanel.GEfc.prototype.as3 = function (l) {
	var _local1629;
	for (var _local1628 in this.$A)
	if (this.$A[_local1628] == l.currentTarget) this.b0 = _local1628;
	this.aAr();
};
FilterEffectPanel.GEfc.prototype.vR = function (l) {
	var _local1632 = ChannelsPanel.YO(this.lM, l),
		_local1630 = this.iQ.GEfs.v,
		_local1631 = _local1630[this.xr].v;
	if (_local1632 == 0) {
		_local1630.push(JSON.parse(JSON.stringify(_local1630[this.xr])));
		this.xr = _local1630.length - 1;
	} else if (_local1630.length > 1) {
		_local1630.splice(this.xr, 1);
		if (this.xr == _local1630.length) this.xr--;
	}
	this.Nv();
	this.VP();
};
FilterEffectPanel.GEfc.prototype.aAr = function (l) {
	var _local1634 = this.b0,
		_local1633;
	if (l == null) _local1633 = TextStyleHelper.oT(_local1634);else
	_local1633 = this.mw[_local1634].b();
	this.iQ.GEfs.v[this.xr].v = _local1633;
	this.Nv();
	this.VP();
};
FilterEffectPanel.GEfc.prototype.c = function (l, d, G, b, V) {
	if (this.$A == null) this.ax9();
	l = this.iQ = JSON.parse(JSON.stringify(l));
	if (l.GEfs == null) l = this.iQ = {
		__name: "Filter Gallery",
		classID: "GEfc",
		GEfs: {
			t: "VlLs",
			v: [{
				t: "Objc",
				v: l
			}]
		}
	};
	var _local1637 = l.GEfs.v;
	for (var _local1635 = 0; _local1635 < _local1637.length; _local1635++)
	if (_local1637[_local1635].v.GELv == null) _local1637[_local1635].v.GELv = {
		t: "bool",
		v: !0
	};
	this.xr = _local1637.length - 1;
	this.Nv();
	G = G.clone();
	if (d == null) return;
	if (!b.XB(G) && TextStyleHelper.dn(l).x != 0) {
		var _local1638 = G.Cw(b),
			_local1636 = PixelUtil.allocBytes(_local1638.O() * 4);
		PixelUtil.blitRgbaRect(d, G, _local1636, _local1638);
		d = _local1636;
		G = _local1638;
	}
	G.x = G.y = 0;
	this.J0 = d;
	this.S4 = d.slice(0);
	this.B7 = G;
	this.VP();
	this.view.kn();
};
FilterEffectPanel.GEfc.prototype.ag7 = function (l) {
	var _local1641 = l.data,
		_local1639 = _local1641.sy,
		_local1640 = this.iQ.GEfs.v;
	if (_local1641.Z6) {
		_local1640[_local1639].v.GELv.v = !_local1640[_local1639].v.GELv.v;
		this.VP();
	} else this.xr = _local1639;
	this.Nv();
};
FilterEffectPanel.GEfc.prototype.Nv = function () {
	var _local1650 = this.iQ.GEfs.v,
		_local1648 = _local1650[this.xr].v,
		_local1643 = _local1648.GEfk.v.GEft,
		_local1647 = this.Qt;
	if (TextStyleHelper.names[_local1643] == null) {
		alert("Unsupported gallery filter");
		s.clearChildren(_local1647);
	} else {
		this.b0 = _local1643;
		for (var _local1646 in this.$A) s.removeClass(this.$A[_local1646], "selected");
		s.addClass(this.$A[_local1643], "selected");
		var _local1645 = this.mw[_local1643];
		_local1645.c(_local1648);
		if (_local1647.firstChild != _local1645.e) {
			s.clearChildren(_local1647);
			_local1647.appendChild(_local1645.e);
		}
	}
	var _local1651 = [];
	for (var _local1642 = 0; _local1642 < _local1650.length; _local1642++) {
		var _local1644 = _local1650[_local1642].v,
			_local1652 = TextStyleHelper.names[_local1644.GEfk.v.GEft],
			_local1649 = new ChannelLayerRow(_local1642, !0, !0, null, _local1652 ? _local1652[1] : "Filter", _local1642 == this.xr, _local1644.GELv.v);
		_local1649.parent = this;
		_local1651.push(_local1649.e);
	}
	s.clearChildren(this.K0);
	_local1651.reverse();
	for (var _local1642 = 0; _local1642 < _local1651.length; _local1642++) this.K0.appendChild(_local1651[_local1642]);
	this.resize();
};
FilterEffectPanel.GEfc.prototype.b = function () {
	return JSON.parse(JSON.stringify(this.iQ));
};
FilterEffectPanel.GEfc.prototype.VP = function (l) {
	var _local1658 = this.B7,
		_local1653 = this.J0,
		_local1657 = this.S4,
		_local1656 = this.b0,
		_local1655 = this.iQ,
		_local1659 = this.mN;

	function _local1654(y) {
		return {
			o: y >>> 16,
			J: y >>> 8 & 255,
			k: y & 255
		};
	}
	FilterHelper.Qz("GEfc", {
		rect: this.B7,
		buffer: this.J0
	}, _local1655, _local1654(_local1659.Y7), _local1654(_local1659.GF), {
		rect: this.B7,
		buffer: this.S4
	}, null);
	this.view.c([{
		uA: _local1658,
		data: _local1657.buffer
	}]);
};
FilterEffectPanel.GEfc.prototype.refresh = function () {
	for (var _local1660 in this.mw) this.mw[_local1660].refresh();
	ChannelsPanel.no(this.lM, ["lrs/newlayer", "lrs/bin"]);
};
FilterEffectPanel.GEfc.mV = function (l) {
	UIComponent.call(this);
	this.az = l;
	this.e = s.createElement("div");
	this.yc = {};
	var _local1663 = TextStyleHelper.oT(l);
	for (var _local1661 in _local1663) {
		var _local1662 = null;
		if (_local1661 == "__name" || _local1661 == "classID" || _local1661 == "GEfk" || _local1661 == "GELv" || ["FlRs"].indexOf(_local1661) != -1) continue;else
		if (_local1661 == "EdgW") _local1662 = new RangeInput("Edge Width", 1, 14);else
		if (_local1661 == "EdgB") _local1662 = new RangeInput("Edge Brightness", 0, l == "AccE" ? 50 : 20);else
		if (_local1661 == "Smth") _local1662 = new RangeInput("Smoothness", 1, l == "Stmp" ? 50 : 15);else
		if (_local1661 == "ClSz") _local1662 = new RangeInput("Cell Size", 3, 100);else
		if (_local1661 == "BrdT") _local1662 = new RangeInput("Border", 1, 20);else
		if (_local1661 == "HghS") _local1662 = new RangeInput("Strength", 0, 20);else
		if (_local1661 == "HlSz") _local1662 = new RangeInput("Size", 1, 15);else
		if (_local1661 == "Cntr") _local1662 = new RangeInput("Contrast", 0, l == "WtrP" ? 100 : 50);else
		if (_local1661 == "Shrp") _local1662 = new RangeInput("Sharpness", 0, 40);else
		if (_local1661 == "SprR") _local1662 = new RangeInput("Spray Radius", 0, 25);else
		if (_local1661 == "LgDr") _local1662 = new RangeInput("Light/Dark Balance", 0, l == "Stmp" ? 50 : 100);else
		if (_local1661 == "Drkn") _local1662 = new RangeInput("Darkness", 1, 50);else
		if (_local1661 == "Dstr") _local1662 = new RangeInput("Distortion", 0, 20);else
		if (_local1661 == "Scln") _local1662 = new RangeInput("Scale", 50, 200);else
		if (_local1661 == "Rlf") _local1662 = new RangeInput("Relief", 0, l == "Ptch" || l == "NtPr" ? 25 : 50);else
		if (_local1661 == "ChAm") _local1662 = new RangeInput("Thickness", 1, 7);else
		if (_local1661 == "Pncl") _local1662 = new RangeInput("Stroke Width", 1, 30);else
		if (_local1661 == "StrP") _local1662 = new RangeInput("Stroke Pressure", 0, 15);else
		if (_local1661 == "PprB") _local1662 = new RangeInput("Paper Brightness", 0, 50);else
		if (_local1661 == "BrsS") _local1662 = new RangeInput("Brush Size", 0, 10);else
		if (_local1661 == "BrsD") _local1662 = new RangeInput("Brush Detail", 0, 10);else
		if (_local1661 == "Txtr") _local1662 = new RangeInput("Texture", 1, 3);else
		if (_local1661 == "Grn") _local1662 = new RangeInput("Grain", 0, 20);else
		if (_local1661 == "HghA") _local1662 = new RangeInput("Highlight Area", 0, 20);else
		if (_local1661 == "Intn") _local1662 = new RangeInput("Intensity", 0, 10);else
		if (_local1661 == "Brgh") _local1662 = new RangeInput("Glow Brightness", 0, l == "WtrP" ? 100 : 50);else
		if (_local1661 == "StrS") _local1662 = new RangeInput("Stroke Size", 1, 50);else
		if (_local1661 == "StDt") _local1662 = new RangeInput("Stroke Detail", 1, 3);else
		if (_local1661 == "Sftn") _local1662 = new RangeInput("Softness", 0, 10);else
		if (_local1661 == "EdgT") _local1662 = new RangeInput("Edge Thickness", 0, 10);else
		if (_local1661 == "EdgI") _local1662 = new RangeInput("Edge Intensity", 0, 10);else
		if (_local1661 == "Pstr") _local1662 = new RangeInput("Posterization", 0, 6);else
		if (_local1661 == "Dfnt") _local1662 = new RangeInput("Definition", 0, 25);else
		if (_local1661 == "TxtC") _local1662 = new RangeInput("Texture Coverage", 0, 50);else
		if (_local1661 == "ShdI") _local1662 = new RangeInput("Shadow Intensity", 0, 10);else
		if (_local1661 == "DrcB") _local1662 = new RangeInput("Direction Balance", 0, 100);else
		if (_local1661 == "Strg") _local1662 = new RangeInput("Strenth", 1, 3);else
		if (_local1661 == "Blnc") _local1662 = new RangeInput("Balance", 0, 10);else
		if (_local1661 == "BlcI") _local1662 = new RangeInput("Black Intensity", 0, 10);else
		if (_local1661 == "WhtI") _local1662 = new RangeInput("White Intensity", 0, 10);else
		if (_local1661 == "DrkI") _local1662 = new RangeInput("Dark Intensity", 0, 50);else
		if (_local1661 == "LghI") _local1662 = new RangeInput("Light Intensity", 0, 50);else
		if (_local1661 == "StrW") _local1662 = new RangeInput("Stroke Width", 3, 15);else
		if (_local1661 == "Grns") _local1662 = new RangeInput("Graininess", 0, l == "NtPr" ? 20 : 10);else
		if (_local1661 == "GlwA") _local1662 = new RangeInput("Glow Amount", 0, 20);else
		if (_local1661 == "ClrA") _local1662 = new RangeInput("Clear Amount", 0, 20);else
		if (_local1661 == "ChrA") _local1662 = new RangeInput("Charcoal Area", 0, 20);else
		if (_local1661 == "ChlA") _local1662 = new RangeInput("Chalk Area", 0, 20);else
		if (_local1661 == "FrgL") _local1662 = new RangeInput("Foreground Level", 1, 15);else
		if (_local1661 == "BckL") _local1662 = new RangeInput("Background Level", 1, 15);else
		if (_local1661 == "WhtL") _local1662 = new RangeInput("Background Level", 0, 50);else
		if (_local1661 == "BlcL") _local1662 = new RangeInput("Foreground Level", 0, 50);else
		if (_local1661 == "ImgB") _local1662 = new RangeInput("Image Balance", 0, 50);else
		if (_local1661 == "Dnst") _local1662 = new RangeInput("Density", 0, 50);else
		if (_local1661 == "FbrL") _local1662 = new RangeInput("Fiber Length", 3, 50);else
		if (_local1661 == "CrcS") _local1662 = new RangeInput("Crack Sapcing", 2, 100);else
		if (_local1661 == "CrcD") _local1662 = new RangeInput("Crack Depth", 0, 10);else
		if (_local1661 == "CrcB") _local1662 = new RangeInput("Crack Brightness", 0, 10);else
		if (_local1661 == "TlSz") _local1662 = new RangeInput("Tile Size", 2, 100);else
		if (_local1661 == "GrtW") _local1662 = new RangeInput("Grout Width", 1, 15);else
		if (_local1661 == "LghG") _local1662 = new RangeInput("Lighten Grout", 0, 10);else
		if (_local1661 == "SqrS") _local1662 = new RangeInput("Square Size", 0, 10);else
		if (_local1661 == "RplS") _local1662 = new RangeInput("Ripple Size", 1, 15);else
		if (_local1661 == "RplM") _local1662 = new RangeInput("Ripple Magnitude", 0, 20);else
		if (_local1661 == "NmbL") _local1662 = new RangeInput("Number of Levels", 2, 8);else
		if (_local1661 == "EdgS") _local1662 = new RangeInput("Edge Simplicity", 0, 10);else
		if (_local1661 == "EdgF") _local1662 = new RangeInput("Edge Fidelity", 1, 3);else
		if (_local1661 == "Sz") _local1662 = l == "NGlw" ? new RangeInput("Glow Size", -24, 24) : new RangeInput("Brush Size", 1, 50);else
		if (_local1661 == "Dtl") _local1662 = l == "Chrc" ? new RangeInput("Detail", 0, 5) : new RangeInput("Detail", 1, 15);else
		if (_local1661 == "StrL") _local1662 = l == "InkO" ? new RangeInput("Stroke Length", 1, 50) : new RangeInput("Stroke Length", 0, 20);else
		if (_local1661 == "TxtT") _local1662 = new DropdownMenu("Texture", "Blocks,Canvas,Frosted,Tiny Lens,Bricks,Burlap,Sandstone".split(","));else
		if (_local1661 == "BrsT") _local1662 = new DropdownMenu("Brush Type", "Simple,Light Rough,Dark Rough,Wide Sharp,Wide Blurry,Sparkle".split(","));else
		if (_local1661 == "Grnt") _local1662 = new DropdownMenu("Grain Type", "Regular Soft Sprinkles Clumped Contrasty Enlarged Stippled Horizontal Vertical Speckle".split(" "));else
		if (_local1661 == "SDir") _local1662 = new DropdownMenu("Direction", ["Right Diagonal", "Horizontal", "Left Diagonal", "Vertical"]);else
		if (_local1661 == "ScrT") _local1662 = new DropdownMenu("Pattern", ["Circle", "Dot", "Line"]);else
		if (_local1661 == "LghD" || _local1661 == "LghP") _local1662 = new DropdownMenu("Light", "Bottom,Bottom Left,Left,Top Left,Top,Top Right,Right,Bottom Right".split(","));else
		if (_local1661 == "Clr") _local1662 = new ColorSwatch("Glow Color");else
		if (_local1661 == "InvT") _local1662 = new CheckboxControl("Invert");else
		console.log(_local1661);
		_local1662.addListener(ActionTypes.E.A, this.Rx, this);
		_local1662.parent = this;
		this.yc[_local1661] = _local1662;
		this.e.appendChild(_local1662.e);
	}
};
FilterEffectPanel.GEfc.mV.prototype = new UIComponent();
FilterEffectPanel.GEfc.mV.prototype.Rx = function (l) {
	this.dispatch(new Action(ActionTypes.E.A, !1));
};
FilterEffectPanel.GEfc.aiM = "Sz Dtl Shrp EdgW EdgB Smth ClSz BrdT HghS HlSz Cntr SprR StrL LgDr Drkn Dstr Scln Rlf ChAm InvT RplS RplM Pncl StrP PprB BrsS BrsD Txtr Grn HghA Intn Brgh Clr StrS StDt Sftn EdgT EdgI Pstr Dfnt TxtC ShdI DrcB Strg Blnc BlcI WhtI DrkI LghI StrW Grns GlwA ClrA ChrA ChlA FrgL BckL WhtL BlcL ImgB Dnst FbrL CrcS CrcD CrcB TlSz GrtW LghG SqrS NmbL EdgS EdgF".split(" ");
FilterEffectPanel.GEfc.mV.prototype.c = function (l) {
	for (var _local1665 in this.yc) {
		var _local1664;
		if (FilterEffectPanel.GEfc.aiM.indexOf(_local1665) != -1) _local1664 = l[_local1665].v;else
		if (_local1665 == "TxtT") _local1664 = TextStyleHelper.N5.indexOf(l[_local1665].v[_local1665]);else
		if (_local1665 == "BrsT") _local1664 = TextStyleHelper.axC.indexOf(l[_local1665].v[_local1665]);else
		if (_local1665 == "LghD") _local1664 = TextStyleHelper.WA.indexOf(l[_local1665].v[_local1665]);else
		if (_local1665 == "LghP") _local1664 = TextStyleHelper.gF.indexOf(l[_local1665].v[_local1665]);else
		if (_local1665 == "Grnt") _local1664 = TextStyleHelper.gJ.indexOf(l[_local1665].v[_local1665]);else
		if (_local1665 == "ScrT") _local1664 = TextStyleHelper.pj.indexOf(l[_local1665].v[_local1665]);else
		if (_local1665 == "SDir") _local1664 = TextStyleHelper.Kc.indexOf(l[_local1665].v.StrD);
		this.yc[_local1665].c(_local1664);
	}
};
FilterEffectPanel.GEfc.mV.prototype.b = function () {
	var _local1668 = TextStyleHelper.oT(this.az);
	for (var _local1667 in this.yc) {
		var _local1666 = this.yc[_local1667].b();
		if (FilterEffectPanel.GEfc.aiM.indexOf(_local1667) != -1) _local1668[_local1667].v = _local1666;else
		if (_local1667 == "TxtT") _local1668[_local1667].v[_local1667] = TextStyleHelper.N5[_local1666];else
		if (_local1667 == "BrsT") _local1668[_local1667].v[_local1667] = TextStyleHelper.axC[_local1666];else
		if (_local1667 == "LghD") _local1668[_local1667].v[_local1667] = TextStyleHelper.WA[_local1666];else
		if (_local1667 == "LghP") _local1668[_local1667].v[_local1667] = TextStyleHelper.gF[_local1666];else
		if (_local1667 == "Grnt") _local1668[_local1667].v[_local1667] = TextStyleHelper.gJ[_local1666];else
		if (_local1667 == "ScrT") _local1668[_local1667].v[_local1667] = TextStyleHelper.pj[_local1666];else
		if (_local1667 == "SDir") _local1668[_local1667].v.StrD = TextStyleHelper.Kc[_local1666];
	}
	return _local1668;
};
FilterEffectPanel.GEfc.mV.prototype.refresh = function () {
	for (var _local1669 in this.yc) this.yc[_local1669].refresh();
};
FilterEffectPanel["Adobe Camera Raw Filter"] = function (l) {
	FilterEffectPanel.call(this, "Adobe Camera Raw Filter");
	var _local1674 = this.e;
	this.ayN = l;
	this._7 = null;
	this.an = null;
	this.hh = null;
	s.addClass(_local1674, "flexrow");
	var _local1671 = s.createElement("div"),
		_local1673 = s.createElement("div", "padded");
	_local1674.appendChild(_local1671);
	_local1674.appendChild(_local1673);
	this.Fm = new LayerCanvasPanel();
	_local1671.appendChild(this.Fm.e);
	this.y9 = new LevelsHistogram(225);
	this.y9.dk(4);
	_local1673.appendChild(this.y9.e);
	this.mk = s.createElement("div");
	this.mk.setAttribute("style", "width:18em;");
	_local1673.appendChild(this.mk);
	this.adg = new LabelItem("Hi", !0);
	this.mk.appendChild(this.adg.e);
	this.yw = s.createElement("div", "scrollable");
	this.mk.appendChild(this.yw);
	this.yc = [
	new RangeInput("Temperature", -100, 100),
	new RangeInput("Tint", -100, 100),
	new RangeInput("Exposure", -4, 4, null, !0),
	new RangeInput("Contrast", -100, 100),
	new RangeInput("Vibrance", -100, 100),
	new RangeInput("Saturation", -100, 100)];

	this.CI = "Temp Tint Ex12 Cr12 Vibr Strt".split(" ");
	for (var _local1670 = 0; _local1670 < this.yc.length; _local1670++) {
		var _local1672 = this.yc[_local1670];
		_local1672.c(0);
		_local1672.addListener(ActionTypes.E.A, this.VP, this);
		this.yw.appendChild(_local1672.e);
		if (_local1670 == 1 || _local1670 == 3) this.yw.appendChild(s.createElement("hr"));
	}
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype = new FilterEffectPanel();
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.ZW = function () {
	return !0;
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.ul = function (l) {
	this.mk.appendChild(l);
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.BM = function (l, d) {
	this.y9.EB(ThemeManager.themes[l.j$]["--text-color"]);
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.c = function (l, d, G, b, V) {
	this.iQ = l;
	var _local1679 = G.m,
		_local1682 = G.n,
		_local1676 = _local1679 * _local1682;
	this.adg.c(_local1679 + " x " + _local1682 + ", " + (_local1679 * _local1682 / 1e6).toFixed(1) + " MPx");
	this.B7 = G;
	this.an = new Float32Array(_local1679 * _local1682 * 3);
	this.hh = new Uint8Array(_local1679 * _local1682 * 4);
	this.hh.fill(255);
	if (d instanceof Float32Array) this._7 = d;else
	{
		var _local1683 = this._7 = new Float32Array(_local1679 * _local1682 * 3);
		for (var _local1675 = 0; _local1675 < _local1676; _local1675++) {
			var _local1681 = _local1675 * 3,
				_local1678 = _local1675 * 4;
			_local1683[_local1681 + 0] = d[_local1678 + 0] * (1 / 255);
			_local1683[_local1681 + 1] = d[_local1678 + 1] * (1 / 255);
			_local1683[_local1681 + 2] = d[_local1678 + 2] * (1 / 255);
		}
	}
	var _local1680 = this.CI;
	for (var _local1675 = 0; _local1675 < _local1680.length; _local1675++) {
		var _local1677 = _local1680[_local1675];
		this.yc[_local1675].c(l[_local1677] ? l[_local1677].v : 0);
	}
	this.VP(null, !0);
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.b = function (l) {
	if (l) return this.hh;
	return JSON.parse(JSON.stringify(this.iQ));
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.arV = function () {
	this._7 = null;
	this.an = null;
	this.hh = null;
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.VP = function (l, d) {
	var _local1685 = this.CI;
	for (var _local1684 = 0; _local1684 < _local1685.length; _local1684++) {
		var _local1691 = _local1685[_local1684];
		this.iQ[_local1691] = {
			t: _local1691 == "Ex12" ? "doub" : "long",
			v: this.yc[_local1684].b()
		};
	}
	var _local1690 = this.B7,
		_local1688 = _local1690.O();
	cL(this._7, _local1690.m, _local1690.n, this.an, this.iQ, this.ayN);
	var _local1693 = Date.now(),
		_local1686 = this.an,
		_local1694 = this.hh;
	for (var _local1684 = 0; _local1684 < _local1688; _local1684++) {
		var _local1692 = _local1684 * 3,
			_local1687 = _local1684 * 4;
		_local1694[_local1687 + 0] = ~~(.5 + _local1686[_local1692 + 0] * 255);
		_local1694[_local1687 + 1] = ~~(.5 + _local1686[_local1692 + 1] * 255);
		_local1694[_local1687 + 2] = ~~(.5 + _local1686[_local1692 + 2] * 255);
	}
	console.log(Date.now() - _local1693, "integer conversion");
	_local1693 = Date.now();
	var _local1689 = PixelUtil.histogramFromRgba(_local1694, Math.max(1, Math.floor(_local1688 / 2e5)));
	this.y9.c(_local1689);
	console.log(Date.now() - _local1693, "histogram done");
	_local1693 = Date.now();
	this.Fm.c([{
		uA: _local1690,
		data: _local1694.buffer
	}]);
	if (d) this.Fm.kn();
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.resize = function (l, d) {
	this.at0 = l - 248;
	this.aaf = d;
	this.Fm.resize(this.at0, this.aaf);
	this.yw.style.height = d - 236 + "px";
};
FilterEffectPanel["Adobe Camera Raw Filter"].prototype.refresh = function () {
	for (var _local1695 = 0; _local1695 < this.yc.length; _local1695++) this.yc[_local1695].refresh();
};
FilterEffectPanel.blnc = function () {
	FilterEffectPanel.call(this);
	var _local1698 = this.e;
	this.Et = null;
	this.Oe = new DropdownMenu("Rangle", ["Shadows", "Midtones", "Highlights"]);
	this.Oe.addListener(ActionTypes.E.A, this.VP, this);
	_local1698.appendChild(this.Oe.e);
	this.I3 = [];
	for (var _local1696 = 0; _local1696 < 3; _local1696++) {
		var _local1697 = new RangeInput(["VAR0 - VAR1", LayerEffectsHelper.cmykChannels[_local1696], LayerEffectsHelper.rgbChannels[_local1696]], -100, 100);
		_local1697.addListener(ActionTypes.E.A, this.B5, this);
		this.I3.push(_local1697);
		_local1698.appendChild(_local1697.e);
	}
	this.aI = new CheckboxControl("Preserve Luminosity");
	this.aI.addListener(ActionTypes.E.A, this.B5, this);
	_local1698.appendChild(this.aI.e);
};
FilterEffectPanel.blnc.prototype = new FilterEffectPanel();
FilterEffectPanel.blnc.prototype.refresh = function () {
	this.Oe.refresh();
	for (var _local1699 = 0; _local1699 < 3; _local1699++) this.I3[_local1699].refresh();
	this.aI.refresh();
};
FilterEffectPanel.blnc.prototype.c = function (l) {
	this.Et = JSON.parse(JSON.stringify(l));
	this.VP();
};
FilterEffectPanel.blnc.prototype.b = function (l) {
	var _local1702 = ["ShdL", "MdtL", "HghL"],
		_local1701 = this.Et[_local1702[this.Oe.b()]].v;
	for (var _local1700 = 0; _local1700 < 3; _local1700++) _local1701[_local1700].v = this.I3[_local1700].b();
	this.Et.PrsL.v = this.aI.b();
	return JSON.parse(JSON.stringify(this.Et));
};
FilterEffectPanel.blnc.prototype.VP = function (l) {
	var _local1705 = ["ShdL", "MdtL", "HghL"],
		_local1704 = this.Et[_local1705[this.Oe.b()]].v;
	for (var _local1703 = 0; _local1703 < 3; _local1703++) this.I3[_local1703].c(_local1704[_local1703].v);
	this.aI.c(this.Et.PrsL.v);
};

// Filter: Brightness/Contrast
FilterEffectPanel.brit = function () {
	FilterEffectPanel.call(this, "brit");
	this.go.push(new RangeInput("Brightness", -150, 150, ""));
	this.go.push(new RangeInput("Contrast", -100, 100, ""));
	this.go.push(new CheckboxControl("Use Legacy"));
	this.W8();
};
FilterEffectPanel.brit.prototype = new FilterEffectPanel();
FilterEffectPanel.curv = function () {
	FilterEffectPanel.call(this);
	this.value = null;
	this.G_ = null;
	this.mN = null;
	var _local1706 = this.e;
	this.Bm = new DropdownMenu("Preset", ["basic", "advanced"]);
	this.Bm.addListener(ActionTypes.E.A, this.a2u, this);
	_local1706.appendChild(this.Bm.e);
	s.appendBr(_local1706);
	this.zA = new DropdownMenu("Channel", ["RGB", "Red", "Green", "Blue"]);
	this.zA.addListener(ActionTypes.E.A, this.LO, this);
	_local1706.appendChild(this.zA.e);
	this.jR = new DropdownMenu(null, ["Spline", "Sketch"]);
	this.jR.addListener(ActionTypes.E.A, this.a2u, this);
	_local1706.appendChild(this.jR.e);
	this.ppConfig = new AutoEnhanceOptions();
	this.ppConfig.parent = this;
	this.ppConfig.addListener(ActionTypes.E.A, this.tl, this);
	_local1706.appendChild(this.ppConfig.e);
	s.appendBr(_local1706);
	this.Td = new CurveEditor();
	this.Td.addListener(ActionTypes.E.A, this.j2, this);
	_local1706.appendChild(this.Td.e);
	this.G5 = null;
	this.a1c = 0;
	this.Q4 = 0;
	s.appendBr(_local1706);
	this.uL = new MultiOptionBox("Sample from image", ButtonGroupMenu.Ze(["-\u2195", "#000000", "#888888", "#ffffff"]), !0, null, !0);
	this.uL.addListener(ActionTypes.E.A, this.Ie, this);
	this.uL.e.style.marginRight = "0";
	_local1706.appendChild(this.uL.e);
};
FilterEffectPanel.curv.prototype = new FilterEffectPanel();
FilterEffectPanel.curv.prototype.BM = function (l, d) {
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.X5) {
		var _local1708 = l.w1,
			_local1709 = ["Default"];
		for (var _local1707 = 0; _local1707 < _local1708.length; _local1707++) _local1709.push(_local1708[_local1707].presetFileName.v);
		_local1709.push("Custom");
		this.Bm.b3(_local1709, [1, _local1708.length, 1]);
		this.mN = l;
	}
};
FilterEffectPanel.curv.prototype.resize = function (l, d) {
	this.Td.resize(l, d);
};
FilterEffectPanel.curv.prototype.refresh = function () {
	this.zA.refresh();
	this.Td.refresh();
};
FilterEffectPanel.curv.prototype.gz = function () {
	this.Bm.c(this.mN.w1.length + 1);
};
FilterEffectPanel.curv.prototype.a2u = function (l) {
	if (l.target == this.Bm) {
		var _local1716 = this.Bm.b(),
			_local1711 = this.mN.w1,
			_local1715;
		if (_local1716 == 0) _local1715 = FilterHelper.oT("curv");else
		if (_local1716 - 1 < _local1711.length) _local1715 = JSON.parse(JSON.stringify(_local1711[_local1716 - 1]));else
		return;
		this.c(_local1715);
		this.B5();
		return;
	}
	this.gz();
	var _local1714 = cb.RX(this.value, 0),
		_local1713 = _local1714.length == 256 ? 1 : 0,
		_local1717 = this.jR.b();
	if (_local1713 == _local1717) return;
	var _local1715 = FilterHelper.oT("curv");
	if (_local1717 == 1) {
		var _local1712 = [];
		for (var _local1710 = 0; _local1710 < 256; _local1710++) _local1712.push(_local1710);
		cb.fZ(_local1715, 0, _local1712);
	}
	this.c(_local1715);
	this.B5();
};
FilterEffectPanel.curv.prototype.j2 = function () {
	this.gz();
	cb.fZ(this.value, this.zA.b(), this.Td.b());
	this.B5();
};
FilterEffectPanel.curv.prototype.LO = function () {
	var _local1720 = this.zA.b(),
		_local1719 = cb.RX(this.value, _local1720),
		_local1718 = _local1719.length == 256 ? 1 : 0;
	this.jR.c(_local1718);
	if (this.G_) this.Td.RB(this.G_[_local1720], this.G_[4] * [1, .33, .33, .33][_local1720], ["#ccc", "#fcc", "#cfc", "#ccf"][_local1720]);
	this.Td.c(_local1719);
};
FilterEffectPanel.curv.prototype.ba = function () {
	return !0;
};
FilterEffectPanel.curv.prototype.dJ = function (l, d, G, b, V) {
	var _local1725 = this.value;
	this.value = FilterHelper.oT("curv");
	this.B5();
	var _local1730 = f.lS.dh(l, V, 1),
		_local1722 = this.G5 = [_local1730 >>> 16 & 255, _local1730 >>> 8 & 255, _local1730 & 255];
	this.a1c = V.y;
	var _local1731 = this.uL.b().indexOf(!0);
	if (_local1731 == 0) {
		var _local1727 = (_local1722[0] + _local1722[1] + _local1722[2]) / 3,
			_local1724 = this.zA.b(),
			_local1726 = cb.RX(_local1725, _local1724),
			_local1723 = _local1724 == 0 ? _local1727 : _local1722[_local1724 - 1],
			_local1728 = -1;
		for (var _local1721 = 0; _local1721 < _local1726.length; _local1721++)
		if (_local1726[_local1721].v.Hrzn.v == _local1723) _local1728 = _local1721;
		if (_local1728 == -1) {
			var _local1729 = JSON.parse(JSON.stringify(_local1726[0]));
			_local1729.v.Hrzn.v = _local1723;
			_local1729.v.Vrtc.v = _local1723;
			_local1726.push(_local1729);
			_local1726.sort(function (T, j) {
				return T.v.Hrzn.v - j.v.Hrzn.v;
			});
			cb.fZ(_local1725, _local1724, _local1726);
			this.Q4 = _local1726.indexOf(_local1729);
		} else this.Q4 = _local1728;
	}
	this.c(_local1725);
	this.B5();
};
FilterEffectPanel.curv.prototype.JP = function (l, d, G, b, V) {
	if (this.G5 == null) return;
	if (this.uL.b().indexOf(!0) == 0) {
		var _local1733 = this.value,
			_local1734 = this.zA.b(),
			_local1732 = cb.RX(_local1733, _local1734),
			_local1735 = _local1732[this.Q4];
		_local1735.v.Vrtc.v = Math.max(0, Math.min(255, Math.round(_local1735.v.Hrzn.v + (this.a1c - V.y))));
		cb.fZ(_local1733, _local1734, _local1732);
		this.c(_local1733);
		this.B5();
	}
};
FilterEffectPanel.curv.prototype.Nl = function (l, d, G, b, V) {
	var _local1739 = this.value,
		_local1742 = this.G5,
		_local1737 = (_local1742[0] + _local1742[1] + _local1742[2]) / 3,
		_local1743 = this.uL.b().indexOf(!0) - 1;
	if (_local1743 <= -1) {} else
	for (var _local1736 = 0; _local1736 < 3; _local1736++) {
		var _local1741 = cb.RX(_local1739, 1 + _local1736);
		if (_local1743 == 0) _local1741[0].v.Hrzn.v = _local1742[_local1736];
		if (_local1743 == 1) {
			var _local1738 = Math.log(_local1742[_local1736] / 255) / Math.log(_local1737 / 255),
				_local1740 = Math.min(999, Math.max(10, Math.round(100 * _local1738)));
			if (_local1741.length == 2) _local1741.splice(1, 0, JSON.parse(JSON.stringify(_local1741[0])));
			_local1741[1].v.Hrzn.v = 127 - Math.log(_local1740 / 100) * 127;
			_local1741[1].v.Vrtc.v = 127;
		}
		if (_local1743 == 2) _local1741[_local1741.length - 1].v.Hrzn.v = _local1742[_local1736];
		cb.fZ(_local1739, 1 + _local1736, _local1741);
	}
	this.c(_local1739);
	this.B5();
	this.gz();
	this.G5 = null;
};
FilterEffectPanel.curv.prototype.c = function (l) {
	this.value = l;
	this.LO();
};
FilterEffectPanel.curv.prototype.RB = function (l) {
	this.G_ = l;
	this.LO();
};
FilterEffectPanel.curv.prototype.b = function (l) {
	return JSON.parse(JSON.stringify(this.value));
};
FilterEffectPanel.curv.prototype.tl = function () {
	var _local1751 = this.ppConfig.b(),
		_local1750 = this.G_,
		_local1745 = this.value,
		_local1749 = PixelUtil.levelsFromHistogram(_local1751, _local1750);
	for (var _local1744 = 0; _local1744 < 4; _local1744++) {
		var _local1748 = _local1749[_local1744][0],
			_local1747 = _local1749[_local1744][1],
			_local1752 = _local1749[_local1744][2],
			_local1746 = [PixelUtil.presetThumb.yR(_local1748, 0, !0), PixelUtil.presetThumb.yR(_local1747, 255, !0)];
		if (_local1752 != null) _local1746.splice(1, 0, PixelUtil.presetThumb.yR(128, _local1752, !0));
		cb.fZ(_local1745, _local1744, _local1746);
	}
	this.LO();
	this.B5();
};
FilterEffectPanel.expA = function () {
	FilterEffectPanel.call(this, "expA");
	this.go.push(new RangeInput("Exposure", -20, 20, null, 2, !0));
	this.go.push(new RangeInput("Offset", -.5, .5, null, 2));
	this.go.push(new RangeInput("Gamma Correction", .01, 9.99, null, 2, !0));
	this.W8();
};
FilterEffectPanel.expA.prototype = new FilterEffectPanel();
FilterEffectPanel.expA.prototype.KJ = function (l, d) {
	d[0] = l.Exps.v;
	d[1] = l.Ofst ? l.Ofst.v : 0;
	d[2] = l.gammaCorrection ? l.gammaCorrection.v : 1;
};
FilterEffectPanel.expA.prototype.PY = function (l, d) {
	l.Exps = {
		t: "doub",
		v: d[0]
	};
	l.Ofst = {
		t: "doub",
		v: d[1]
	};
	l.gammaCorrection = {
		t: "doub",
		v: d[2]
	};
};
FilterEffectPanel.grdm = function () {
	FilterEffectPanel.call(this, "grdm");
	this.go.push(new GradientPickerButton(!0, null, !0));
	this.go.push(new CheckboxControl("Reverse"));
	this.W8();
};
FilterEffectPanel.grdm.prototype = new FilterEffectPanel();
FilterEffectPanel.grdm.prototype.KJ = function (l, d) {
	d[0] = l.Grad.v;
	d[1] = l.Rvrs ? l.Rvrs.v : !1;
};
FilterEffectPanel.grdm.prototype.PY = function (l, d) {
	l.Grad.v = d[0];
	l.Rvrs = {
		t: "bool",
		v: d[1]
	};
};
FilterEffectPanel.grdm.prototype.BM = function (l, d) {
	this.go[0].B$(l.Y7, l.GF);
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.K5 || d == PsdResourceTypes.Rz) this.go[0].Z2(l.dR);
};
FilterEffectPanel.selc = function () {
	FilterEffectPanel.call(this);
	var _local1756 = this.e;
	this.iq = [];
	this.cf = null;
	this.Oe = new DropdownMenu("Colors", LayerEffectsHelper.colorRanges.concat(["White", "Neutral", "Black"]));
	this.Oe.addListener(ActionTypes.E.A, this.Rx, this);
	_local1756.appendChild(this.Oe.e);
	s.appendBr(_local1756);
	for (var _local1753 = 0; _local1753 < 4; _local1753++) {
		// hbi edit
		var _local1755 = ["Cyan", "Magenta", "Yellow", "Black"],
			_local1754 = new RangeInput(_local1755[_local1753], -100, 100, "%");
		_local1754.addListener(ActionTypes.E.A, this.Rx, this);
		this.iq.push(_local1754);
		_local1756.appendChild(_local1754.e);
	}
	this.rt = new CheckboxControl("Absolute");
	_local1756.appendChild(this.rt.e);
	this.rt.addListener(ActionTypes.E.A, this.Rx, this);
};
FilterEffectPanel.selc.prototype = new FilterEffectPanel();
FilterEffectPanel.selc.prototype.refresh = function () {
	this.Oe.refresh();
	this.rt.refresh();
	for (var _local1757 = 0; _local1757 < 4; _local1757++) this.iq[_local1757].refresh();
};
FilterEffectPanel.selc.prototype.c = function (l) {
	this.cf = JSON.parse(JSON.stringify(l));
	this.VP();
};
FilterEffectPanel.selc.prototype.b = function (l) {
	return JSON.parse(JSON.stringify(this.cf));
};
FilterEffectPanel.selc.prototype.Rx = function (l) {
	if (l.target != this.Oe) {
		var _local1760 = this.cf,
			_local1759 = [];
		for (var _local1758 = 0; _local1758 < 4; _local1758++) _local1759[_local1758] = this.iq[_local1758].b();
		iX.fZ(_local1760, this.Oe.b(), _local1759);
		_local1760.Mthd = {
			t: "enum",
			v: {
				CrcM: this.rt.b() ? "Absl" : "Rltv"
			}
		};
	}
	this.VP();
	this.B5();
};
FilterEffectPanel.selc.prototype.VP = function () {
	var _local1763 = this.cf,
		_local1762 = iX.RX(_local1763, this.Oe.b());
	for (var _local1761 = 0; _local1761 < 4; _local1761++) this.iq[_local1761].c(_local1762[_local1761]);
	this.rt.c(_local1763.Mthd ? _local1763.Mthd.v.CrcM == "Absl" : !1);
};

// Adjustments: Black & White
FilterEffectPanel.blwh = function () {
	FilterEffectPanel.call(this, "blwh");
	this.go.push(new CheckboxControl([12, 11]));
	this.go.push(new ColorSwatch(!0));
	for (var _local1764 = 0; _local1764 < 6; _local1764++) this.go.push(new RangeInput(LayerEffectsHelper.colorRanges[_local1764], -200, 300));
	this.W8();
};
FilterEffectPanel.blwh.prototype = new FilterEffectPanel();
FilterEffectPanel.blwh.prototype.KJ = function (l, d) {
	d[0] = l.useTint.v;
	d[1] = l.tintColor.v;
	var _local1766 = "Rd Yllw Grn Cyn Bl Mgnt".split(" ");
	for (var _local1765 = 0; _local1765 < 6; _local1765++) d[2 + _local1765] = l[_local1766[_local1765]].v;
};
FilterEffectPanel.blwh.prototype.PY = function (l, d) {
	l.useTint.v = d[0];
	l.tintColor.v = d[1];
	var _local1768 = "Rd Yllw Grn Cyn Bl Mgnt".split(" ");
	for (var _local1767 = 0; _local1767 < 6; _local1767++) l[_local1768[_local1767]].v = d[2 + _local1767];
};

// Adjustments: Hue/Saturation
FilterEffectPanel.hue2 = function () {
	FilterEffectPanel.call(this);
	this.value = null;
	this.q4 = null;
	this.aen = null;
	this.Qx = [
	[0, 0, 0],
	[0, 50, 0]];

	var _local1772 = this.e;
	this.uL = new MultiOptionBox(null, ["\u2194"], !0, ["Click and drag in image to change saturation"], !0);
	this.uL.addListener(ActionTypes.E.A, this.amC, this);
	this.uL.addListener(ActionTypes.E.A, this.Ie, this);
	_local1772.appendChild(this.uL.e);
	var _local1771 = this.go = [
	new DropdownMenu("Range", ["Master", "Red", "Yellow", "Green", "Cyan", "Blue", "Magenta"]),
	new RangeInput("Hue", -180, 180),
	new RangeInput("Saturation", -100, 100),
	new RangeInput("Lightness", -100, 100),
	new CheckboxControl("Colorize")];

	for (var _local1769 = 0; _local1769 < _local1771.length; _local1769++) {
		var _local1770 = _local1771[_local1769];
		_local1770.addListener(ActionTypes.E.A, _local1769 == 0 ? this.LO : this.a6H, this);
		_local1772.appendChild(_local1770.e);
	}
	this.Oe = _local1771[0];
	this.Fx = _local1771[1];
	this.ly = _local1771[2];
	this.k5 = _local1771[3];
	this.Cz = _local1771[4];
	this.Pe = new MultiOptionBox("Sample Hue", ["<img src=\"" + PIMG["tools/eyedropper"] + "\" class=\"autoscale gsicon\" />", "+", "-"], !0, null, !0);
	this.Pe.addListener(ActionTypes.E.A, this.amC, this);
	this.Pe.addListener(ActionTypes.E.A, this.Ie, this);
	this.Pe.e.style.marginLeft = "20px";
	_local1772.appendChild(this.Pe.e);
	this.MJ = s.createElement("div");
	_local1772.appendChild(this.MJ);
	this.Rh = this.Tk.bind(this);
	this.IE = this.FS.bind(this);
	this.T = s.createElement("canvas");
	this.k_ = this.T.getContext("2d", { willReadFrequently: true });
	this.UY = null;
	s.preventTouchAndGesture(this.T);
	s.setCanvasSizeForDpr(this.T, 282, 18);
	_local1772.appendChild(this.T);
	s.addPointerDown(this.T, this.Z1.bind(this));
};
FilterEffectPanel.hue2.prototype = new FilterEffectPanel();
FilterEffectPanel.hue2.prototype.resize = function (l, d) {
	s.setCanvasSizeForDpr(this.T, Math.round(l), 18);
	if (this.value) this.LO();
};
FilterEffectPanel.hue2.prototype.amC = function (l) {
	var _local1773 = l.target.b().indexOf(!0);
	if (_local1773 == -1) return;
	if (l.target == this.uL) this.Pe.c([!1, !1, !1]);else
	this.uL.c([!1, !1, !1]);
};
FilterEffectPanel.hue2.prototype.Z1 = function (l) {
	if (this.Oe.b() == 0 || this.Cz.b()) return;
	var _local1781 = s.getEventPositionInElement(l, this.T).x / (this.T.width / s.getDevicePixelRatio()),
		_local1778 = 1e6;

	function _local1775(R, J, n) {
		return R < J && J < n || n < R && (R < J || J < n);
	}
	var _local1780 = this.fK(),
		_local1779 = -1;
	for (var _local1774 = 0; _local1774 < 4; _local1774++) {
		var _local1783 = Math.abs(_local1781 - (_local1780[_local1774] + _local1774 * 1e-5));
		if (_local1783 < _local1778) {
			_local1778 = _local1783;
			_local1779 = _local1774;
		}
	}
	if (_local1778 > .025) {
		_local1779 = -1;
		var _local1776 = _local1780[0],
			_local1784 = _local1780[1],
			_local1782 = _local1780[2],
			_local1777 = _local1780[3];
		if (_local1775(_local1776, _local1781, _local1784)) _local1779 = 4;
		if (_local1775(_local1784, _local1781, _local1782)) _local1779 = 5;
		if (_local1775(_local1782, _local1781, _local1777)) _local1779 = 6;
	}
	if (_local1779 == -1) return;
	this.UY = _local1779;
	s.addPointerMove(document.body, this.Rh);
	s.addPointerUp(document.body, this.IE);
};
FilterEffectPanel.hue2.prototype.Tk = function (l) {
	var _local1791 = s.getEventPositionInElement(l, this.T).x / (this.T.width / s.getDevicePixelRatio()),
		_local1786 = this.fK(),
		_local1790 = this.UY;
	for (var _local1785 = 1; _local1785 < 4; _local1785++)
	if (_local1786[_local1785] < _local1786[_local1785 - 1]) {
		_local1786[_local1785] += 1;
	}
	if (_local1790 < 4) {
		var _local1789 = 1e6,
			_local1788 = 0;
		for (var _local1785 = -20; _local1785 < 20; _local1785++) {
			var _local1792 = Math.abs(_local1786[_local1790] - (_local1791 + _local1785));
			if (_local1792 < _local1789) {
				_local1789 = _local1792;
				_local1788 = _local1785;
			}
		}
		_local1791 += _local1788;
		_local1786[_local1790] = _local1791;
		for (var _local1785 = _local1790 + 1; _local1785 < 4; _local1785++)
		if (_local1786[_local1785] < _local1786[_local1785 - 1]) {
			_local1786[_local1785] = _local1786[_local1785 - 1];
		}
		for (var _local1785 = _local1790 - 1; _local1785 >= 0; _local1785--)
		if (_local1786[_local1785] > _local1786[_local1785 + 1]) {
			_local1786[_local1785] = _local1786[_local1785 + 1];
		}
	} else {
		var _local1787 = _local1791 - (_local1786[_local1790 - 4] + _local1786[_local1790 - 3]) / 2;
		if (_local1787 < -.5) _local1787 += 1;
		if (_local1790 == 4) {
			_local1786[0] += _local1787;
			_local1786[1] += _local1787;
			_local1786[2] = Math.max(_local1786[1], _local1786[2]);
			_local1786[3] = Math.max(_local1786[1], _local1786[3]);
		}
		if (_local1790 == 5)
		for (var _local1785 = 0; _local1785 < 4; _local1785++) _local1786[_local1785] += _local1787;
		if (_local1790 == 6) {
			_local1786[2] += _local1787;
			_local1786[3] += _local1787;
			_local1786[0] = Math.min(_local1786[0], _local1786[2]);
			_local1786[1] = Math.min(_local1786[1], _local1786[2]);
		}
	}
	for (var _local1785 = 1; _local1785 < 4; _local1785++)
	if (_local1786[_local1785] < _local1786[_local1785 - 1]) throw "e";
	this.a9n(_local1786);
	this.LO();
	this.B5();
};
FilterEffectPanel.hue2.prototype.FS = function (l) {
	s.removePointerMove(document.body, this.Rh);
	s.removePointerUp(document.body, this.IE);
};
FilterEffectPanel.hue2.prototype.refresh = function () {
	for (var _local1793 = 0; _local1793 < this.go.length; _local1793++) this.go[_local1793].refresh();
};
FilterEffectPanel.hue2.prototype.a6H = function (l) {
	var _local1798 = this.value.Clrz.v = this.Cz.b();
	if (_local1798) this.Oe.c(0);
	if (l && l.target == this.Cz) {
		var _local1794 = _local1798 ? 1 : 0;
		this.Qx[1 - _local1794] = d8.RX(this.value, 0);
		var _local1797 = this.Qx[_local1794];
		d8.fZ(this.value, 0, _local1797);
		if (this.Oe.b() == 0) {
			this.Fx.c(_local1797[0]);
			this.ly.c(_local1797[1]);
			this.k5.c(_local1797[2]);
		}
	}
	var _local1796 = this.Oe.b(),
		_local1795 = d8.RX(this.value, _local1796),
		_local1797 = _local1796 == 0 ? _local1795 : _local1795.I3;
	_local1797[0] = this.Fx.b();
	var _local1799 = this.ly.b();
	_local1797[1] = _local1798 ? Math.max(0, _local1799) : _local1799;
	_local1797[2] = this.k5.b();
	d8.fZ(this.value, _local1796, _local1795);
	this.LO();
	this.B5();
};
FilterEffectPanel.hue2.prototype.LO = function () {
	var _local1813 = this.Oe.b(),
		_local1810 = this.value.Clrz ? this.value.Clrz.v : !1;
	this.Cz.c(_local1810);
	this.Oe.setEnabled(!_local1810);
	this.Pe.setEnabled(!_local1810 && _local1813 != 0);
	var _local1801 = d8.RX(this.value, _local1813),
		_local1809 = _local1813 == 0 ? _local1801 : _local1801.I3;
	this.Fx.c(_local1809[0]);
	this.ly.c(_local1809[1]);
	this.k5.c(_local1809[2]);
	var _local1808 = this.T.width,
		_local1805 = this.T.height,
		_local1816 = this.k_;
	_local1816.clearRect(0, 0, _local1808, _local1805);
	if (_local1810 || _local1813 == 0) {
		this.MJ.innerHTML = "";
		return;
	}
	var _local1802 = _local1801.mE;
	this.MJ.innerHTML = _local1802[0] + "\xB0 / " + _local1802[1] + "\xB0<span style=\"float:right\">" + _local1802[2] + "\xB0 \\ " + _local1802[3] + "\xB0</span>";
	var _local1817 = PixelUtil.allocBytes(_local1808 * 4);
	ColorMapCanvas.ayQ(_local1817, 1, _local1808, -1, .5);
	var _local1811 = new ImageData(new Uint8ClampedArray(_local1817.buffer), _local1808, 1),
		_local1804 = Math.round(_local1805 / 4);
	for (var _local1800 = 0; _local1800 < _local1804; _local1800++) _local1816.putImageData(_local1811, 0, _local1800);

	function _local1806(g, Y, k) {
		_local1816.fillStyle = k;
		var _local1818 = _local1804 * 2;
		if (g <= Y) _local1816.fillRect(g * _local1808, _local1818, (Y - g) * _local1808, _local1804);else
		{
			_local1816.fillRect(0, _local1818, Y * _local1808, _local1804);
			_local1816.fillRect(g * _local1808, _local1818, (1 - g) * _local1808, _local1804);
		}
	}
	var _local1803 = this.fK();
	_local1806(_local1803[0], _local1803[1], "#888888");
	_local1806(_local1803[1], _local1803[2], "#cccccc");
	_local1806(_local1803[2], _local1803[3], "#888888");
	_local1816.fillStyle = "#ffffff";
	_local1816.lineWidth = 1;
	_local1816.beginPath();
	var _local1814 = _local1804 + .5,
		_local1815 = 4 * _local1804 + .5;
	for (var _local1800 = 0; _local1800 < 4; _local1800++) {
		var _local1807 = Math.floor(_local1808 * _local1803[_local1800]) + .5,
			_local1812 = (_local1800 < 2 ? -1 : 1) * _local1804 * (_local1800 == 1 || _local1800 == 2 ? 1 : 2);
		_local1816.moveTo(_local1807, _local1814);
		_local1816.lineTo(_local1807, _local1815);
		_local1816.lineTo(_local1807 + _local1812, _local1815);
		_local1816.lineTo(_local1807 + _local1812, _local1804 + _local1804 + .5);
		_local1816.closePath();
	}
	_local1816.fill();
	_local1816.stroke();
};
FilterEffectPanel.hue2.prototype.fK = function () {
	var _local1821 = this.Oe.b(),
		_local1820 = d8.RX(this.value, _local1821).mE;
	for (var _local1819 = 0; _local1819 < 4; _local1819++) _local1820[_local1819] = (1000.5 + _local1820[_local1819] / 360) % 1;
	return _local1820;
};
FilterEffectPanel.hue2.prototype.a9n = function (l) {
	var _local1824 = this.Oe.b(),
		_local1823 = d8.RX(this.value, _local1824);
	for (var _local1822 = 0; _local1822 < 4; _local1822++) _local1823.mE[_local1822] = Math.round(36e3 + (l[_local1822] - .5) * 360) % 360;
	d8.fZ(this.value, _local1824, _local1823);
};
FilterEffectPanel.hue2.prototype.ba = function () {
	return !0;
};
FilterEffectPanel.hue2.prototype.anP = function () {
	var _local1826 = this.uL.b().indexOf(!0),
		_local1825 = this.Pe.b().indexOf(!0);
	return _local1826 != -1 ? _local1826 : _local1825 != -1 ? _local1825 + 1 : -1;
};
FilterEffectPanel.hue2.prototype.dJ = function (l, d, G, b, V) {
	var _local1830 = this.anP();
	if (_local1830 == -1) return;
	var _local1836 = this.value;
	this.value = FilterHelper.oT("hue2");
	this.B5();
	var _local1827 = f.lS.dh(l, V, 1);
	this.c(_local1836);
	var _local1837 = [_local1827 >>> 16 & 255, _local1827 >>> 8 & 255, _local1827 & 255],
		_local1833 = PixelUtil.rgbToHsb(_local1837[0] / 255, _local1837[1] / 255, _local1837[2] / 255);
	if (_local1830 == 0) {
		this.Oe.c(1 + Math.round(_local1833.Tq * 6) % 6);
	} else {
		var _local1829 = this.fK(),
			_local1831 = .5 + _local1833.Tq,
			_local1828 = 1 / 12,
			_local1834 = _local1829[1],
			_local1835 = _local1829[2];
		if (_local1835 < _local1834) {
			_local1835++;
			if (_local1831 < _local1834 && _local1831 + 1 - _local1835 < _local1834 - _local1831) _local1831++;
		}
		var _local1832 = _local1834 <= _local1831 && _local1831 <= _local1835;
		if (_local1830 == 1) {
			_local1834 = _local1831 - _local1828 / 2;
			_local1835 = _local1831 + _local1828 / 2;
		} else if (_local1830 == 2 && !_local1832) {
			_local1834 = Math.min(_local1831, _local1834);
			_local1835 = Math.max(_local1831, _local1835);
		} else if (_local1830 == 3 && _local1832) {
			if (_local1831 - _local1834 < _local1835 - _local1831) _local1834 = _local1831;else
			_local1835 = _local1831;
		}
		_local1829 = [_local1834 - _local1828, _local1834, _local1835, _local1835 + _local1828];
		this.a9n(_local1829);
	}
	this.B5();
	this.q4 = V.x;
	this.aen = this.ly.b();
};
FilterEffectPanel.hue2.prototype.JP = function (l, d, G, b, V) {
	var _local1838 = this.anP();
	if (_local1838 == -1) return;
	if (_local1838 == 0) {
		if (this.q4 != null) {
			var _local1839 = V.x - this.q4;
			_local1839 = Math.max(-100, Math.min(100, this.aen + .5 * _local1839));
			this.ly.c(_local1839);
			this.a6H();
		}
	}
};
FilterEffectPanel.hue2.prototype.Nl = function (l, d, G, b, V) {
	this.q4 = null;
};
FilterEffectPanel.hue2.prototype.c = function (l) {
	this.value = JSON.parse(JSON.stringify(l));
	var _local1840 = this.value.Clrz ? this.value.Clrz.v : !1;
	this.Qx[_local1840 ? 1 : 0] = d8.RX(this.value, 0);
	this.LO();
};
FilterEffectPanel.hue2.prototype.b = function (l) {
	return JSON.parse(JSON.stringify(this.value));
};

// Adjustments: Levels
FilterEffectPanel.levl = function () {
	function _local1841() {
		FilterEffectPanel.call(this);
		this.value = null;
		this.G_ = null;
		this.wT = [new Point2D(0, 0), new Point2D(0, 0), new Point2D(0, 0), new Point2D(0, 0), new Point2D(0, 0)];
		this.Qs = -1;
		this.Rh = this.Tk.bind(this);
		this.IE = this.FS.bind(this);
		var _local1847 = this.e;
		this.zA = new DropdownMenu("Channel", ["RGB", "Red", "Green", "Blue"]);
		this.zA.addListener(ActionTypes.E.A, this.LO, this);
		_local1847.appendChild(this.zA.e);
		this.ppConfig = new AutoEnhanceOptions();
		this.ppConfig.parent = this;
		this.ppConfig.addListener(ActionTypes.E.A, this.tl, this);
		_local1847.appendChild(this.ppConfig.e);
		var _local1843 = s.createElement("div", "");
		_local1847.appendChild(_local1843);
		var _local1846 = s.createElement("div", "");
		_local1847.appendChild(_local1846);
		this.T = s.createElement("canvas");
		_local1843.appendChild(this.T);
		this.k_ = this.T.getContext("2d", { willReadFrequently: true });
		this.ab = new Point2D(256, 120);
		this.T.setAttribute("style", "display:block");
		s.preventTouchAndGesture(this.T);
		s.addPointerDown(this.T, this.Z1.bind(this));
		this.NJ = s.createElement("canvas", "");
		_local1846.appendChild(this.NJ);
		this.I1 = this.NJ.getContext("2d", { willReadFrequently: true });
		this.BY = new Point2D(this.ab.x, 40);
		this.NJ.setAttribute("style", "display:block");
		s.preventTouchAndGesture(this.NJ);
		s.addPointerDown(this.NJ, this.anG.bind(this));
		var _local1845 = this.a_ = [];
		for (var _local1842 = 0; _local1842 < 5; _local1842++) {
			var _local1844 = new TextInput(null, null, 3);
			_local1845.push(_local1844);
			_local1844.addListener(ActionTypes.E.A, this.ayb, this);
			(_local1842 < 2 || _local1842 == 4 ? _local1843 : _local1846).appendChild(_local1844.e);
		}
		_local1843.appendChild(_local1845[1].e);
		this.uL = new MultiOptionBox("Sample from image", ButtonGroupMenu.Ze(["#000000", "#888888", "#ffffff"]), !0, null, !0);
		this.uL.addListener(ActionTypes.E.A, this.Ie, this);
		_local1847.appendChild(this.uL.e);
		this.resize(250, 100);
	}
	_local1841.prototype = new FilterEffectPanel();
	_local1841.prototype.tl = function () {
		var _local1854 = this.ppConfig.b(),
			_local1849 = this.G_,
			_local1853 = this.value,
			_local1852 = PixelUtil.levelsFromHistogram(_local1854, _local1849);
		for (var _local1848 = 0; _local1848 < 4; _local1848++) {
			var _local1851 = _local1852[_local1848][0],
				_local1856 = _local1852[_local1848][1],
				_local1850 = _local1852[_local1848][2],
				_local1857 = [PixelUtil.presetThumb.yR(_local1851, 0, !0), PixelUtil.presetThumb.yR(_local1856, 255, !0)];
			if (_local1850 != null) _local1857.splice(1, 0, PixelUtil.presetThumb.yR(128, _local1850, !0));
			var _local1855 = [~~_local1851, ~~_local1856, 0, 255, _local1850 == null ? 100 : ~~(100 + .75 * 100 * (_local1850 - 128) / 128)];
			hg.fZ(_local1853, _local1848, _local1855);
		}
		this.LO();
		this.B5();
	};
	_local1841.prototype.resize = function (d, G) {
		d += 6;
		this.ab.x = this.BY.x = d;
		s.setCanvasSizeForDpr(this.T, d, this.ab.y, this.k_);
		s.setCanvasSizeForDpr(this.NJ, d, this.BY.y, this.I1);
		var _local1858 = this.a_;
		_local1858[3].e.setAttribute("style", "margin-left: " + (d - 104) + "px");
		_local1858[4].e.setAttribute("style", "margin: 0 " + (d / 2 - 74) + "px");
		if (this.value) this.LO();
	};
	_local1841.prototype.refresh = function () {
		this.zA.refresh();
	};
	_local1841.prototype.ayb = function (d) {
		var _local1860 = [];
		for (var _local1859 = 0; _local1859 < 5; _local1859++) {
			var _local1863 = 255,
				_local1862 = 1;
			if (_local1859 == 4) {
				_local1863 = 999;
				_local1862 = 100;
			}
			var _local1861 = parseFloat(this.a_[_local1859].b());
			_local1860[_local1859] = Math.max(0, Math.min(_local1863, _local1861 * _local1862));
		}
		hg.fZ(this.value, this.zA.b(), _local1860);
		this.LO();
		this.B5();
	};
	_local1841.prototype.LO = function (d) {
		var _local1865 = this.ab.x,
			_local1874 = this.ab.y,
			_local1872 = this.zA.b(),
			_local1869 = this.k_;
		_local1869.clearRect(0, 0, _local1865, _local1874);
		_local1869.fillStyle = "#cccccc";
		_local1869.fillRect(8, 8, _local1865 - 16, _local1874 - 16 - 8);
		if (this.G_) {
			var _local1880 = this.G_[0].slice(0),
				_local1879 = 0;
			if (_local1872 == 0) {
				_local1880.fill(0);
				var _local1866 = JSON.parse(JSON.stringify(this.value));
				hg.fZ(_local1866, 0, [0, 255, 0, 255, 100]);
				var _local1881 = LayerEffectsHelper.buildEffect("levl", _local1866),
					_local1875 = [_local1881.mK, _local1881._J, _local1881.xm];
				for (var _local1868 = 0; _local1868 < 3; _local1868++) {
					var _local1870 = this.G_[1 + _local1868],
						_local1867 = _local1875[_local1868];
					for (var _local1864 = 0; _local1864 < 256; _local1864++) _local1880[_local1867[_local1864]] += _local1870[_local1864];
				}
			}
			var _local1878 = _local1872 == 0 ? _local1880 : this.G_[_local1872];
			for (var _local1864 = 0; _local1864 < _local1878.length; _local1864++) _local1879 += _local1878[_local1864];
			_local1869.fillStyle = "#333333";
			_local1869.beginPath();
			_local1869.moveTo(8, _local1874 - 16);
			for (var _local1864 = 0; _local1864 < 256; _local1864++) {
				var _local1871 = 55 * _local1878[_local1864] / _local1879;
				_local1869.lineTo(8 + _local1864 / 256 * (_local1865 - 16), Math.max(8, _local1874 - 16 - _local1874 * _local1871));
			}
			_local1869.lineTo(_local1865 - 8, _local1874 - 16);
			_local1869.closePath();
			_local1869.fill();
		}
		var _local1877 = hg.RX(this.value, _local1872);
		for (var _local1864 = 0; _local1864 < 5; _local1864++) this.a_[_local1864].c(_local1877[_local1864] / (_local1864 == 4 ? 100 : 1));
		this.wT[0].T6(8 + _local1877[0] / 255 * (_local1865 - 16), _local1874 - 14);
		this.wT[1].T6(8 + _local1877[1] / 255 * (_local1865 - 16), _local1874 - 14);
		var _local1876 = Math.log(_local1877[4] / 100) / Math.log(9.99);
		_local1876 = .5 - _local1876 / 2;
		this.wT[4].T6(this.wT[0].x + _local1876 * (this.wT[1].x - this.wT[0].x), _local1874 - 14);
		this.B4(_local1869, this.wT[0], "#000000");
		this.B4(_local1869, this.wT[1], "#ffffff");
		this.B4(_local1869, this.wT[4], "#777777");
		var _local1865 = this.BY.x,
			_local1874 = this.BY.y;
		_local1869 = this.I1;
		_local1869.clearRect(0, 0, _local1865, _local1874);
		var _local1873 = _local1869.createLinearGradient(0, 0, _local1865 - 16, 0);
		_local1873.addColorStop(0, "black");
		_local1873.addColorStop(1, "white");
		_local1869.fillStyle = _local1873;
		_local1869.fillRect(8, 8, _local1865 - 16, 16);
		this.wT[2].T6(8 + _local1877[2] / 255 * (_local1865 - 16), _local1874 - 14);
		this.wT[3].T6(8 + _local1877[3] / 255 * (_local1865 - 16), _local1874 - 14);
		this.B4(_local1869, this.wT[2], "#000000");
		this.B4(_local1869, this.wT[3], "#ffffff");
	};
	_local1841.prototype.B4 = function (d, G, b) {
		d.fillStyle = b;
		d.fillRect(G.x - 5, G.y, 10, 10);
	};
	_local1841.prototype.Z1 = function (d) {
		var _local1882 = s.getEventPositionInElement(d, this.T),
			_local1883 = this.aep([0, 1, 4], _local1882);
		if (_local1883 != -1) this.Qs = _local1883;
		this.ab9();
	};
	_local1841.prototype.anG = function (d) {
		var _local1884 = s.getEventPositionInElement(d, this.NJ),
			_local1885 = this.aep([2, 3], _local1884);
		if (_local1885 != -1) this.Qs = _local1885;
		this.ab9();
	};
	_local1841.prototype.aep = function (d, G) {
		var _local1889 = -1,
			_local1888 = 1e9;
		for (var _local1886 = 0; _local1886 < d.length; _local1886++) {
			var _local1887 = Math.abs(this.wT[d[_local1886]].x - G.x);
			if (_local1887 < _local1888) {
				_local1888 = _local1887;
				_local1889 = d[_local1886];
			}
		}
		return _local1888 < 16 ? _local1889 : -1;
	};
	_local1841.prototype.ab9 = function (d) {
		if (this.Qs == -1) return;
		s.addPointerMove(document.body, this.Rh);
		s.addPointerUp(document.body, this.IE);
	};
	_local1841.prototype.Tk = function (d) {
		var _local1890 = hg.RX(this.value, this.zA.b()),
			_local1893 = s.getEventPositionInElement(d, this.Qs == 2 && this.Qs == 3 ? this.NJ : this.T),
			_local1892 = 255 * (_local1893.x - 8) / (this.ab.x - 16);
		_local1892 = Math.max(0, Math.min(255, _local1892));
		if (this.Qs == 0) _local1892 = Math.min(_local1892, _local1890[1] - 2);
		if (this.Qs == 1) _local1892 = Math.max(_local1892, _local1890[0] + 2);
		if (this.Qs != 4) _local1890[this.Qs] = Math.round(_local1892);else
		{
			var _local1891 = (_local1892 - _local1890[0]) / (_local1890[1] - _local1890[0]);
			_local1891 = 1 - 2 * _local1891;
			_local1891 = Math.pow(9.99, _local1891);
			_local1890[4] = Math.min(999, Math.max(10, Math.round(_local1891 * 100)));
		}
		hg.fZ(this.value, this.zA.b(), _local1890);
		this.LO();
		this.B5();
	};
	_local1841.prototype.FS = function (d) {
		s.removePointerMove(document.body, this.Rh);
		s.removePointerUp(document.body, this.IE);
		this.Qs = -1;
	};
	_local1841.prototype.ba = function () {
		return !0;
	};
	_local1841.prototype.Nl = function (d, G, b, V, Q) {
		var _local1899 = this.value,
			_local1895 = this.uL.b().indexOf(!0);
		if (_local1895 == -1) return;
		this.value = FilterHelper.oT("levl");
		this.B5();
		var _local1900 = f.lS.dh(d, Q, 1),
			_local1898 = [_local1900 >>> 16 & 255, _local1900 >>> 8 & 255, _local1900 & 255];
		for (var _local1894 = 0; _local1894 < 3; _local1894++) {
			var _local1896 = hg.RX(_local1899, 1 + _local1894);
			if (_local1895 == 0) _local1896[0] = _local1898[_local1894];
			if (_local1895 == 1) {
				var _local1897 = Math.log(_local1898[_local1894] / 255) / Math.log((_local1898[0] + _local1898[1] + _local1898[2]) * .333 / 255);
				_local1896[4] = Math.min(999, Math.max(10, Math.round(100 * _local1897)));
			}
			if (_local1895 == 2) _local1896[1] = _local1898[_local1894];
			hg.fZ(_local1899, 1 + _local1894, _local1896);
		}
		this.c(_local1899);
		this.B5();
	};
	_local1841.prototype.c = function (d) {
		this.value = d;
		this.LO();
	};
	_local1841.prototype.RB = function (d) {
		this.G_ = d;
		this.LO();
	};
	_local1841.prototype.b = function (d) {
		return JSON.parse(JSON.stringify(this.value));
	};
	return _local1841;
}();
FilterEffectPanel.phfl = function () {
	FilterEffectPanel.call(this, "phfl");
	this.go.push(new ColorSwatch());
	this.go.push(new RangeInput("Density", 0, 100, "%"));
	this.go.push(new CheckboxControl("Preserve Luminosity"));
	this.W8();
};
FilterEffectPanel.phfl.prototype = new FilterEffectPanel();
FilterEffectPanel.phfl.prototype.KJ = function (l, d) {
	d[0] = l.Clr.v;
	d[1] = l.Dnst.v;
	d[2] = l.PrsL.v;
};
FilterEffectPanel.phfl.prototype.PY = function (l, d) {
	var _local1901 = PixelUtil.color.sampleGradientColor(d[0]),
		_local1903 = l.Clr.v,
		_local1902 = PixelUtil.rgbToLab(_local1901.o, _local1901.J, _local1901.k);
	_local1903.Lmnc.v = _local1902.Hm;
	_local1903.A.v = _local1902.aS;
	_local1903.B.v = _local1902.k;
	l.Dnst.v = d[1];
	l.PrsL.v = d[2];
};
FilterEffectPanel.vibA = function () {
	FilterEffectPanel.call(this, "vibA");
	this.go.push(new RangeInput("Vibrance", -100, 100, null));
	this.go.push(new RangeInput("Saturation", -100, 100, null));
	this.W8();
};
FilterEffectPanel.vibA.prototype = new FilterEffectPanel();
FilterEffectPanel.vibA.prototype.KJ = function (l, d) {
	d[0] = l.vibrance ? l.vibrance.v : 0;
	d[1] = l.Strt ? l.Strt.v : 0;
};
FilterEffectPanel.vibA.prototype.PY = function (l, d) {
	l.vibrance.v = d[0];
	l.Strt.v = d[1];
};
FilterEffectPanel.thrs = function () {
	FilterEffectPanel.call(this, "thrs");
	this.go.push(new RangeInput("Threshold", 1, 255, null));
	this.W8();
};
FilterEffectPanel.thrs.prototype = new FilterEffectPanel();
FilterEffectPanel.thrs.prototype.KJ = function (l, d) {
	d[0] = l.Lvl.v;
};
FilterEffectPanel.thrs.prototype.PY = function (l, d) {
	l.Lvl.v = d[0];
};
FilterEffectPanel.mixr = function () {
	FilterEffectPanel.call(this);
	var _local1906 = this.e;
	this.iq = [];
	this.cf = null;
	this.Oe = new DropdownMenu("Channel", ["Red", "Green", "Blue"]);
	this.a7Q = !1;
	this.Oe.addListener(ActionTypes.E.A, this.Rx, this);
	_local1906.appendChild(this.Oe.e);
	s.appendBr(_local1906);
	this.Mo = new CheckboxControl([12, 60]);
	_local1906.appendChild(this.Mo.e);
	this.Mo.addListener(ActionTypes.E.A, this.Rx, this);
	for (var _local1904 = 0; _local1904 < 4; _local1904++) {
		var _local1905 = new RangeInput(["Red", "Green", "Blue", "Total"][_local1904], -200, 200, "%");
		_local1905.addListener(ActionTypes.E.A, this.Rx, this);
		this.iq.push(_local1905);
		_local1906.appendChild(_local1905.e);
	}
};
FilterEffectPanel.mixr.prototype = new FilterEffectPanel();
FilterEffectPanel.mixr.prototype.refresh = function () {
	this.Oe.refresh();
	this.Mo.refresh();
	for (var _local1907 = 0; _local1907 < 4; _local1907++) this.iq[_local1907].refresh();
};
FilterEffectPanel.mixr.prototype.c = function (l) {
	this.cf = JSON.parse(JSON.stringify(l));
	this.VP();
};
FilterEffectPanel.mixr.prototype.b = function (l) {
	return JSON.parse(JSON.stringify(this.cf));
};
FilterEffectPanel.mixr.prototype.Rx = function (l) {
	if (l.target != this.Oe) {
		var _local1910 = LayerEffectsHelper.parseChannelMixerDescriptor(this.cf);
		if (l.target == this.Mo) {
			_local1910.Mo = this.Mo.b();
			if (_local1910.Mo) _local1910.Z = [40, 40, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];else
			_local1910.Z = [100, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0];
		} else {
			var _local1909 = (_local1910.Mo ? 0 : this.Oe.b()) * 5,
				_local1908 = this.iq.indexOf(l.target);
			_local1910.Z[_local1909 + (_local1908 < 3 ? _local1908 : 4)] = l.target.b();
		}
		this.cf = LayerEffectsHelper.buildChannelMixerDescriptor(_local1910);
	}
	this.VP();
	this.B5();
};
FilterEffectPanel.mixr.prototype.VP = function () {
	var _local1913 = LayerEffectsHelper.parseChannelMixerDescriptor(this.cf);
	if (_local1913.Mo != this.a7Q) this.Oe.b3(_local1913.Mo ? [
	[13, 1, 7]] :
	LayerEffectsHelper.rgbChannels);
	this.a7Q = _local1913.Mo;
	this.Mo.c(_local1913.Mo);
	var _local1912 = (_local1913.Mo ? 0 : this.Oe.b()) * 5;
	for (var _local1911 = 0; _local1911 < 4; _local1911++) this.iq[_local1911].c(_local1913.Z[_local1912 + (_local1911 < 3 ? _local1911 : 4)]);
};
FilterEffectPanel.post = function () {
	FilterEffectPanel.call(this, "post");
	this.go.push(new RangeInput("Levels", 2, 255, null));
	this.W8();
};
FilterEffectPanel.post.prototype = new FilterEffectPanel();
FilterEffectPanel.post.prototype.KJ = function (l, d) {
	d[0] = l.Lvls.v;
};
FilterEffectPanel.post.prototype.PY = function (l, d) {
	l.Lvls.v = d[0];
};
FilterEffectPanel.clrL = function () {
	FilterEffectPanel.call(this, "clrL");
	this.go.push(new ICCProfileButton("LUTs"));
	this.W8();
};
FilterEffectPanel.clrL.prototype = new FilterEffectPanel();
FilterEffectPanel.clrL.prototype.KJ = function (l, d) {
	d[0] = l;
};
FilterEffectPanel.clrL.prototype.PY = function (l, d) {
	var _local1914 = d[0];
	for (var _local1915 in _local1914) l[_local1915] = _local1914[_local1915];
};
FilterEffectPanel.clrL.prototype.BM = function (l, d) {
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.Qo) this.go[0].Z2(l.a8v);
};
FilterEffectPanel.rplc = function () {
	FilterEffectPanel.call(this, "rplc");
	this.go.push(new RangeInput("Fuzziness", 0, 200));
	this.go.push(new ColorSwatch());
	this.go.push(new RangeInput("Hue", -180, 180));
	this.go.push(new RangeInput("Saturation", -100, 100));
	this.go.push(new RangeInput("Lightness", -100, 100));
	this.W8();
};
FilterEffectPanel.rplc.prototype = new FilterEffectPanel();
FilterEffectPanel.rplc.prototype.KJ = function (l, d) {
	d[0] = l.Fzns.v;
	d[1] = l.Mxm.v;
	d[2] = l.H.v;
	d[3] = l.Strt.v;
	d[4] = l.Lght.v;
};
FilterEffectPanel.rplc.prototype.PY = function (l, d) {
	function _local1916(V, Q) {
		Q.Lmnc.v = V.Hm;
		Q.A.v = V.aS;
		Q.B.v = V.k;
	}
	l.Fzns.v = d[0];
	l.H.v = d[2];
	l.Strt.v = d[3];
	l.Lght.v = d[4];
	var _local1918 = PixelUtil.color.sampleGradientColor(d[1]),
		_local1917 = PixelUtil.rgbToLab(_local1918.o, _local1918.J, _local1918.k);
	_local1916(_local1917, l.Mnm.v);
	_local1916(_local1917, l.Mxm.v);
};
FilterEffectPanel.fade = function () {
	FilterEffectPanel.call(this, "fade");
	this.go.push(new RangeInput("Opacity", 0, 100, "%"));
	this.go.push(new DropdownMenu("Blend Mode", au.YJ, au.hY));
	this.W8();
};
FilterEffectPanel.fade.prototype = new FilterEffectPanel();
FilterEffectPanel.fade.prototype.KJ = function (l, d) {
	d[0] = l.Opct.v.val;
	d[1] = au.Point2D.indexOf(l.Md.v.BlnM);
};
FilterEffectPanel.fade.prototype.PY = function (l, d) {
	l.Opct.v.val = d[0];
	l.Md.v.BlnM = au.Point2D[d[1]];
};
FilterEffectPanel.aply = function () {
	var _local1922 = au.Point2D.concat(["Add", "Sbtr"]);
	_local1922.splice(21, 1);
	var _local1921 = au.YJ.concat([
	[15, 10, 28],
	[15, 10, 21]]
	);
	_local1921.splice(21, 1);
	var _local1919 = au.hY.slice(0);
	_local1919[4]--;

	function _local1920() {
		FilterEffectPanel.call(this, "aply");
		this.go.push(new DropdownMenu("Layer", []));
		this.go.push(new DropdownMenu("Channel", ["RGB", "Red", "Green", "Blue", "Transparency"]));
		this.go.push(new CheckboxControl("Invert"));
		this.go.push(new DropdownMenu("Blend Mode", _local1921, _local1919));
		this.go.push(new RangeInput("Opacity", 0, 100, "%"));
		this.go.push(new RangeDropInput("Scale", 1, 2, null, 2));
		this.go.push(new RangeDropInput("Offset", -255, 255));
		this.go.push(new CheckboxControl("Preserve Transparency"));
		this.W8([2]);
		this.VC = null;
	}
	_local1920.prototype = new FilterEffectPanel();
	_local1920.prototype.KJ = function (V, Q, t) {
		if (t) {
			var _local1924 = t[2].B,
				_local1928 = this.VC = [];
			for (var _local1923 = 0; _local1923 < _local1924.length; _local1923++) {
				var _local1927 = _local1924[_local1923].getName();
				_local1928.push(_local1927.length < 30 ? _local1927 : _local1927.slice(0, 27) + "...");
			}
			_local1928.reverse();
			this.go[0].b3([
			[5, 7]].
			concat(_local1928), [1, _local1928.length]);
		} else var _local1928 = this.VC;
		V = V.With.v;
		var _local1925 = V.T.v;
		Q[0] = _local1925[1].t == "name" ? 1 + _local1928.indexOf(_local1925[1].v.val) : 0;
		Q[1] = ["RGB", "Rd", "Grn", "Bl", "Trsp"].indexOf(_local1925[0].v.enum);
		Q[2] = V.Invr.v;
		var _local1926 = V.Clcl.v.Clcn;
		Q[3] = _local1922.indexOf(_local1926);
		Q[4] = V.Opct.v.val;
		Q[5] = V.Scl.v;
		Q[6] = V.Ofst.v;
		Q[7] = V.PrsT.v;
	};
	_local1920.prototype.PY = function (V, Q) {
		V = V.With.v;
		var _local1930 = V.T.v;
		if (Q[0] == 0) _local1930[1] = {
			t: "Enmr",
			v: {
				classID: "Lyr",
				typeID: "Ordn",
				enum: "Mrgd"
			}
		};else
		_local1930[1] = {
			t: "name",
			v: {
				classID: "Lyr",
				val: this.VC[Q[0] - 1]
			}
		};
		_local1930[0].v.enum = ["RGB", "Rd", "Grn", "Bl", "Trsp"][Q[1]];
		V.Invr.v = Q[2];
		var _local1929 = V.Clcl.v.Clcn = _local1922[Q[3]];
		V.Opct.v.val = Q[4];
		V.Scl.v = Q[5];
		V.Ofst.v = Q[6];
		V.PrsT.v = Q[7];
		var _local1931 = _local1929 == "Add" || _local1929 == "Sbtr";
		this.go[5].setEnabled(_local1931);
		this.go[6].setEnabled(_local1931);
	};
	return _local1920;
}();
FilterEffectPanel.matc = function () {
	var _local1936,_local1935,_local1932 = 0;

	function _local1934() {
		FilterEffectPanel.call(this, "matc");
		this.go.push(new RangeInput("Luminance", 1, 200));
		this.go.push(new RangeInput("Color Intensity", 1, 200));
		this.go.push(new RangeInput("Fade", 0, 100, "%"));
		this.go.push(new CheckboxControl("Neutralize"));
		this.go.push(new DropdownMenu("Source", []));
		this.go.push(new DropdownMenu("Layer", []));
		this.W8("Step Forward");
	}

	function _local1933(Q, t) {
		Q.go[5].b3([
		[5, 7]].
		concat(t), [1, t.length]);
	}
	_local1934.prototype = new FilterEffectPanel();
	_local1934.prototype.KJ = function (Q, t, I) {
		_local1932 = 0;
		t[0] = Q.Lght.v;
		t[1] = Q.ClrR.v;
		t[2] = Q.Fade.v;
		t[3] = Q.neutralizeColor ? Q.neutralizeColor.v : !1;
		t[4] = t[5] = 0;
		var _local1946 = Q.Srce;
		if (_local1946) _local1946 = _local1946.v;
		if (I) {
			_local1936 = [];
			_local1935 = [];
			var _local1942 = I[2],
				_local1939 = I[3];
			for (var _local1937 = 0; _local1937 < _local1939.length; _local1937++) {
				var _local1940 = _local1939[_local1937];
				_local1936.push(_local1940.name);
				var _local1938 = _local1940.B,
					_local1944 = [];
				_local1935.push(_local1944);
				for (var _local1945 = 0; _local1945 < _local1938.length; _local1945++) _local1944.push(_local1938[_local1945].getName());
				_local1944.reverse();
			}
			this.go[4].b3([
			[13, 1, 0]].
			concat(_local1936), [1, _local1936.length]);
			var _local1941 = _local1939.indexOf(_local1942);
			if (_local1946) _local1941 = _local1936.indexOf(_local1946[1].v.val);
			_local1933(this, _local1935[_local1941]);
		}
		if (_local1946) {
			var _local1943 = _local1936.indexOf(_local1946[1].v.val);
			t[3] = _local1932 = 1 + _local1943;
			if (_local1946[0].t == "name") t[4] = 1 + _local1935[_local1943].indexOf(_local1946[0].v.val);
		}
	};
	_local1934.prototype.PY = function (Q, t) {
		Q.Lght.v = t[0];
		Q.ClrR.v = t[1];
		Q.Fade.v = t[2];
		Q.neutralizeColor.v = t[3];
		if (t[4] == 0) {
			Q.noReference = {
				t: "bool",
				v: !0
			};
			delete Q.Srce;
		} else {
			if (t[4] != _local1932) {
				_local1932 = t[4];
				_local1933(this, _local1935[t[4] - 1]);
			}
			delete Q.noReference;
			var _local1947 = {
					t: "Enmr",
					v: {
						classID: "Lyr",
						typeID: "Ordn",
						enum: "Mrgd"
					}
				},
				_local1948 = _local1935[t[4] - 1];
			if (t[5] != 0) _local1947 = {
				t: "name",
				v: {
					classID: "Lyr",
					val: _local1948[t[5] - 1]
				}
			};
			Q.Srce = {
				t: "obj ",
				v: [_local1947, {
					t: "name",
					v: {
						classID: "Dcmn",
						val: _local1936[t[4] - 1]
					}
				}]
			};
		}
	};
	return _local1934;
}();


function LayerCompsPanel() {
	PanelTabBase.call(this, "Layer Comps", !1, "---panels/layercomps", PanelTabBase.xA.ax2);
	this.DK.setAttribute("style", "min-width:240px;");
	this.v0 = null;
	this.WG = -1;
	this.Yb = [];
	this.jo = s.createElement("div", "scrollable");
	this.jo.style.height = "160px";
	this.DK.appendChild(this.jo);
	this.S8 = s.createElement("div", "lpfoot");
	this.DK.appendChild(this.S8);
	this.VS = [];
	var _local4307 = ["<svg  class=\"miniscale gsicon\" viewBox=\"0 0 15 15\" width=\"15\" height=\"15\" fill=\"black\"><path d=\"M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,14 L0,16 L14,16 L14,14 Z\" /></svg>", "reload", "lrs/newlayer", "lrs/bin"],
		_local4306 = ["Layer Comps to Files", [5, 10],
		[5, 3],
		[5, 4]];

	for (var _local4303 = 0; _local4303 < _local4307.length; _local4303++) {
		var _local4304 = _local4307[_local4303];
		if (_local4303 > 0) _local4304 = "<img src=\"" + PIMG[_local4307[_local4303]] + "\" class=\"miniscale gsicon\" />";
		var _local4305 = new ToolbarButton(_local4304, !1, _local4306[_local4303]);
		_local4305.addListener("click", this.azr, this);
		this.S8.appendChild(_local4305.e);
		this.VS.push(_local4305);
	}
}
LayerCompsPanel.prototype = new PanelTabBase("");
LayerCompsPanel.prototype.resize = function (l, d) {
	this.DK.setAttribute("style", "width:" + (l - 2) + "px;");
	this.jo.style.height = d - 28 + "px";
};
LayerCompsPanel.prototype.zh = function (l) {
	var _local4308 = new Action(ActionTypes.E.v, !0);
	_local4308.data = l;
	_local4308.G = f.X6;
	this.dispatch(_local4308);
};
LayerCompsPanel.atk = `var opts = new ExportOptionsSaveForWeb();
opts.format = SaveDocumentType.PNG;
opts.PNG8 = false;
opts.quality = 100;
var doc = app.activeDocument;
var lc = doc.layerComps;
if(lc.length==0) alert("No layer comps.");
else {
	var stat = doc.historyStates.length - 1;
	for(var i=0; i<lc.length; i++) {
		lc[i].apply();
		pngFile = new File(lc[i].name +".png");
		app.activeDocument.exportDocument(pngFile, ExportType.SAVEFORWEB, opts);
	}
	doc.activeHistoryState = doc.historyStates[stat];
}`;
LayerCompsPanel.prototype.azr = function (l) {
	var _local4309 = this.VS.indexOf(l.currentTarget) - 1;
	if (_local4309 == -1) {
		var _local4310 = new Action(ActionTypes.E.L, !0);
		_local4310.data = {
			a: ActionTypes.$.WM,
			nM: LayerCompsPanel.atk
		};
		this.dispatch(_local4310);
		return;
	}
	if (_local4309 != 1)
	if (this.WG == -1) return;
	this.zh({
		a: ["updLC", "addLC", "delLC"][_local4309],
		sy: this.WG
	});
	if (_local4309 == 2) this.WG = -1;
};
LayerCompsPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	for (var _local4311 = 0; _local4311 < this.VS.length; _local4311++) this.VS[_local4311].refresh();
};
LayerCompsPanel.prototype.Yw = function (l) {
	if (l == null) s.addClass(this.DK, "disabled");else
	s.removeClass(this.DK, "disabled");
	this.v0 = l;
	s.clearChildren(this.jo);
	if (l == null) return;
	var _local4316 = l.MV.lastAppliedComp ? l.MV.lastAppliedComp.v : 0,
		_local4313 = l.MV.list.v.slice(0);
	_local4313.unshift({
		v: {
			Nm: {
				v: "Last Document State"
			},
			compID: {
				v: 0
			},
			capturedInfo: {
				v: 0
			}
		}
	});
	for (var _local4312 = 0; _local4312 < _local4313.length; _local4312++) {
		var _local4315 = _local4313[_local4312].v,
			_local4314 = new LayerCompRow(_local4315.Nm.v, _local4315.compID.v, _local4315.capturedInfo.v, _local4316, this.WG);
		_local4314.addListener("activate", this.O5, this);
		_local4314.parent = this;
		this.jo.appendChild(_local4314.e);
		this.Yb.push(_local4314);
	}
};
LayerCompsPanel.prototype.O5 = function (l) {
	this.WG = l.currentTarget.sy;
	this.Yw(this.v0);
};

function LayerCompRow(l, A, d, G, b) {
	UIComponent.call(this);
	this.sy = A;
	this.e = s.createElement("div", "head listitem" + (A == b ? " selected" : ""));
	var _local4320 = A == G,
		_local4319 = new ToolbarButton(_local4320 ? "\u2713" : "\u2014");
	if (_local4320) _local4319.Nu();
	this.e.appendChild(_local4319.e);
	_local4319.addListener("click", this.rq, this);
	var _local4322 = this.c1 = s.createElement("span");
	_local4322.textContent = l;
	this.e.appendChild(_local4322);
	this.VS = [];
	if (A != 0) {
		this.e.addEventListener("mouseup", this.O5.bind(this), !1);
		this.axU = s.createElement("span", "headR");
		this.e.appendChild(this.axU);
		var _local4317 = ["lrs/eye", "pos", "lrs/fx"],
			_local4323 = ["Visibility", "Position", "Appearance"];
		for (var _local4321 = 0; _local4321 < _local4317.length; _local4321++) {
			var _local4318 = new ToolbarButton("<img src=\"" + PIMG[_local4317[_local4321]] + "\" class=\"autoscale gsicon\" />", !1, _local4323[_local4321]);
			if ((d >> _local4321 & 1) == 0) _local4318.e.setAttribute("style", "opacity:0.3");
			_local4318.addListener("click", this.ax_, this);
			this.axU.appendChild(_local4318.e);
			this.VS.push(_local4318);
		}
	}
}
LayerCompRow.prototype = new UIComponent();
LayerCompRow.prototype.O5 = function (l) {
	if (l.target != this.c1 && l.target != this.e) return;
	if (l.detail == 1) this.dispatch(new Action("activate", !1));else
	{
		var _local4324 = new PanelTabBase.di(this.c1, this.sd.bind(this));
	}
};
LayerCompRow.prototype.ax_ = function (l) {
	var _local4325 = this.VS.indexOf(l.currentTarget);
	this.zh({
		a: "editLC",
		aqX: _local4325,
		sy: this.sy
	});
};
LayerCompRow.prototype.sd = function (l) {
	this.zh({
		a: "editLC",
		Xu: l,
		sy: this.sy
	});
};
LayerCompRow.prototype.rq = function (l) {
	this.zh({
		a: "setLC",
		sy: this.sy
	});
};
LayerCompRow.prototype.zh = function (l) {
	var _local4326 = new Action(ActionTypes.E.v, !0);
	_local4326.data = l;
	_local4326.G = f.X6;
	this.dispatch(_local4326);
};


function NavigatorPanel() {
	PanelTabBase.call(this, "Navigator", !1, "---panels/navigator", PanelTabBase.xA.afm);
	var _local4328 = s.createElement("div", "padded");
	_local4328.setAttribute("style", "min-width:15em");
	this.DK.appendChild(_local4328);
	var _local4327 = s.createElement("div");
	_local4328.appendChild(_local4327);
	_local4327.setAttribute("style", "cursor:grab;");
	this.T = s.createElement("canvas");
	this.T.width = 100;
	_local4327.appendChild(this.T);
	s.preventTouchAndGesture(this.T);
	s.addPointerDown(this.T, this.TC.bind(this));
	this.yT = new OffsetRangeInput(null, 2, 6400, "%", null, !0);
	this.yT.addListener(ActionTypes.E.A, this.asq, this);
	_local4328.appendChild(this.yT.e);
	this.a3A = this.w7.bind(this);
	this.ach = this.ha.bind(this);
	this.KP = null;
	this.EI = null;
	this.Pg = !1;
}
NavigatorPanel.prototype = new PanelTabBase("");
NavigatorPanel.prototype.resize = function (l, d) {
	this.VP();
};
NavigatorPanel.prototype.asq = function (l) {
	var _local4332 = this.yT.b(),
		_local4329 = this.KP,
		_local4331 = _local4332 / 100;
	if (.8 < _local4331 && _local4331 < 1.2) _local4331 = 1;else
	if (1.8 < _local4331) _local4331 = Math.round(_local4331);
	var _local4330 = new Action(ActionTypes.E.v, !0);
	_local4330.G = f.t7;
	_local4330.data = {
		a: "zoom",
		N: _local4331
	};
	this.dispatch(_local4330);
};
NavigatorPanel.prototype.TC = function (l) {
	var _local4333 = this.KP;
	if (_local4333 == null) return;
	this.Pg = !0;
	s.addPointerMove(window, this.a3A);
	s.addPointerUp(window, this.ach);
};
NavigatorPanel.prototype.w7 = function (l) {
	var _local4339 = s.getEventPositionInElement(l, this.T),
		_local4334 = this.KP,
		_local4338 = this.T.width,
		_local4337 = this.T.height,
		_local4336 = (_local4339.x * s.getDevicePixelRatio() - _local4338 / 2) / _local4338,
		_local4341 = (_local4339.y * s.getDevicePixelRatio() - _local4337 / 2) / _local4337,
		_local4335 = s.getDevicePixelRatio() * _local4334.u.N,
		_local4342 = Math.round(-_local4334.u.N * _local4334.m * _local4336),
		_local4340 = Math.round(-_local4334.u.N * _local4334.n * _local4341);
	f.Mi.if(_local4334, _local4342, _local4340);
};
NavigatorPanel.prototype.ha = function (l) {
	s.removePointerMove(window, this.a3A);
	s.removePointerUp(window, this.ach);
	this.Pg = !1;
};
NavigatorPanel.prototype.Yw = function (l) {
	if (l == null && this.KP != null) this.T.width = 100;
	this.KP = l;
	this.VP();
};
NavigatorPanel.prototype.a6_ = function () {
	var _local4346 = 300 * s.getDevicePixelRatio(),
		_local4345 = 0,
		_local4343 = this.KP,
		_local4344 = [_local4343.LT(), new Rect(0, 0, _local4343.m, _local4343.n)];
	PixelUtil.pyramidDownsampleRgba(_local4344);
	while (Math.max(_local4344[_local4345 + 1].m, _local4344[_local4345 + 1].n) > _local4346) {
		_local4345 += 2;
	}
	this.EI = _local4344.slice(_local4345);
};
NavigatorPanel.prototype.VP = function () {
	var _local4357 = this.KP;
	if (_local4357 == null || _local4357.u.N == 0) return;
	var _local4355 = _local4357.u;
	if (!s.isInDocument(this.DK)) return;
	this.yT.c(_local4355.N * 100);
	if (!this.Pg) this.a6_();
	var _local4347 = this.EI[0],
		_local4354 = this.EI[1],
		_local4353 = _local4354.m,
		_local4351 = _local4354.n,
		_local4358 = this.T;
	_local4358.width = _local4353;
	_local4358.height = _local4351;
	s.setElementSizePx(_local4358, _local4353, _local4351);
	var _local4348 = _local4358.getContext("2d", { willReadFrequently: true }),
		_local4359 = _local4348.createImageData(_local4353, _local4351);
	PixelUtil.copyByteBuffer(_local4347, _local4359.data);
	_local4348.putImageData(_local4359, 0, 0);
	_local4348.getImageData(0, 0, 1, 1);
	var _local4356 = _local4355.Vm,
		_local4350 = _local4355.Zx(_local4356.x, _local4356.y),
		_local4352 = _local4355.Zx(_local4356.x + _local4356.m, _local4356.y + _local4356.n),
		_local4349 = _local4353 / _local4357.m;
	_local4348.scale(_local4349, _local4349);
	_local4348.lineWidth = 4 / _local4349;
	_local4348.strokeStyle = "#ff0000";
	_local4348.strokeRect(_local4350.x, _local4350.y, _local4352.x - _local4350.x, _local4352.y - _local4350.y);
};
NavigatorPanel.prototype.BM = function (l, d) {};
NavigatorPanel.prototype.KN = function () {
	this.VP();
};


function NotesPanel() {
	PanelTabBase.call(this, "Notes", !1, "---panels/notes", PanelTabBase.xA.avR);
	this.DK.setAttribute("style", "min-width:240px;");
	var _local4413 = s.createElement("div", "padded");
	this.DK.appendChild(_local4413);
	this.r3 = new TextInput("Author");
	_local4413.appendChild(this.r3.e);
	this.e8 = s.createElement("textarea");
	s.addKeydownBlocker(this.e8);
	_local4413.appendChild(this.e8);
	var _local4412 = new ToolbarButton("<<", null, null, !0);
	_local4413.appendChild(_local4412.e);
	this.af2 = _local4412;
	var _local4410 = new ToolbarButton(">>", null, null, !0);
	_local4413.appendChild(_local4410.e);
	_local4412.addListener("click", this.W9, this);
	_local4410.addListener("click", this.W9, this);
	var _local4411 = this.a5n = new LabelItem("");
	_local4413.appendChild(_local4411.e);
}
NotesPanel.prototype = new PanelTabBase("");
NotesPanel.prototype.W9 = function (l) {
	var _local4418 = l.target == this.af2 ? -1 : 1,
		_local4414 = this.KP,
		_local4417 = _local4414.add.Anno;
	if (_local4417 == null) return;
	var _local4416 = _local4417.length,
		_local4415 = _local4414.u.$m;
	_local4414.u.$m = (_local4415 + _local4418 + _local4416) % _local4416;
	_local4414.bV = !0;
	this.VP();
};
NotesPanel.prototype.VP = function () {
	var _local4422 = this.KP;
	if (_local4422 == null) return;
	var _local4421 = _local4422.add.Anno;
	if (_local4421 == null || _local4421.length == 0) return;
	var _local4419 = _local4422.u.$m,
		_local4420 = _local4421[_local4419];
	this.e8.value = _local4420[4];
	this.a5n.c(_local4419 + 1 + " / " + _local4421.length);
	this.r3.c(_local4420[3]);
};
NotesPanel.prototype.resize = function (l, d) {
	if (this.iJ == l) return;
	this.iJ = l;
	d = Math.min(d, 200);
	this.e8.setAttribute("style", "display:block;tab-size:4;  margin:0; font-family:monospace; width:" + (l - 10) + "px; height:" + (d - 66) + "px");
};
NotesPanel.prototype.Yw = function (l, d, G) {
	this.KP = l;
	this.VP();
};



function LayersPanel() {
	PanelTabBase.call(this, "Layers", !1, "---panels/layers", PanelTabBase.xA.yS);
	this.$E = null;
	this.Yb = [];
	this.Kv = null;
	this.z8 = null;
	this.lg = s.createElement("div", "lphead");
	this.jo = s.createElement("div", "lpbody scrollable");
	// this.jo.addEventListener("scroll", this.axz.bind(this), !1);
	this.S8 = s.createElement("div", "lpfoot");
	var _local3730 = this.a9i = s.createElement("span");
	_local3730.setAttribute("style", "display:inline-block; height:26px");
	this.lg.appendChild(_local3730);
	this.ru = new DropdownMenu(null, au.YJ, au.hY);
	this.ru.addListener(ActionTypes.E.A, this.a5p, this);
	this.lg.appendChild(this.ru.e);
	this.eR = new RangeDropInput("Opacity", 0, 100, "%", 0);
	this.eR.addListener(ActionTypes.E.A, this.aoS, this);
	this.eR.parent = this;
	this.lg.appendChild(this.eR.e);
	this.__ = new MultiOptionBox("Lock", [
	"<img src=\"" + PIMG.trsp3 + "\" class=\"miniscale gsicon\" />",
	"<img src=\"" + PIMG["tools/brush"] + "\" class=\"miniscale gsicon\" />",
	"<img src=\"" + PIMG.pos + "\" class=\"miniscale gsicon\" />",
	"<img src=\"" + PIMG["lrs/lock"] + "\" class=\"miniscale gsicon\" />"],
	!0, ["Transparency", "Pixels", "Position", "All"]);
	this.__.addListener(ActionTypes.E.A, this.asd, this);
	this.lg.appendChild(this.__.e);
	this.z2 = new RangeDropInput("Fill", 0, 100, "%", 0);
	this.z2.addListener(ActionTypes.E.A, this.afg, this);
	this.z2.parent = this;
	this.lg.appendChild(this.z2.e);
	this.lM = [];
	this.sY();
	this.DK.appendChild(this.lg);
	this.DK.appendChild(this.jo);
	this.jo.addEventListener("dragover", function (V) {
		V.preventDefault();
	}, !1);
	this.jo.addEventListener("dragenter", s.stopAndPreventHandler, !1);
	this.jo.addEventListener("drop", this.aA6.bind(this), !1);
	this.DK.appendChild(this.S8);
	this.DK.addEventListener("contextmenu", s.stopAndPreventHandler, !1);
	this.addListener("rclick", this.a2r, this);
	var _local3729 = function (V, Q, A) {
		return {
			Zj: this.Nj[A] == 1
		};
	}.bind(this);
	this.aeZ = new ContextPanel([
	{ name: "Filter", p: _local3729 },
	{ name: "Blending Options", p: _local3729 },
	{ name: "Lock", p: _local3729, xX: !0 },
	{ name: "Long-tap as a right click", p: _local3729, xX: !0 },
	{ name: "\u2796 Thumbnail Size" },
	{ name: "\u2795 Thumbnail Size" },
	{ name: "Thumbnails by Layer",
		p: function () {
			return {
				Zj: LayerTreeNode.iR == 0,
				p: !0
			};
		}
	},
	{ name: "Thumbnails by Document",
		p: function () {
			return {
				Zj: LayerTreeNode.iR == 1,
				p: !0
			};
		}
	}]);
	this.aeZ.addListener("select", this.a0_, this);
	this.Nj = [0, 1, 1, 0];
	var _local3727 = window.localStorage;
	if (_local3727) {
		var _local3728 = _local3727.getItem("lpOpt");
		if (_local3728) {
			_local3728 = JSON.parse(_local3728);
			this.Nj = _local3728[0];
			LayerTreeNode.hC = _local3728[1];
			LayerTreeNode.iR = _local3728[2];
		}
	}
	this.a0_();
}
LayersPanel.prototype = new PanelTabBase("");
LayersPanel.prototype.nh = function () {
	if (this.aje) return;
	var _local3732 = LayerStyleDialog.bb(!0),
		_local3731 = LayerStyleDialog.bQ(!0);
	this.aje = new ContextPanel(_local3732, _local3731);
	var _local3732 = [
		{ name: "Blending Options" },
		{ name: "Select Pixels", xX: !0 },
		{ name: "Duplicate Layer" },
		{ name: "Duplicate Into ..." },
		{ name: "Delete", xX: !0 },
		{ name: "Convert to Smart Object" },
		{ name: "New Smart Obj. via Copy",
			p: function (G) {
				return {
					p: G.B[G.g[0]].add.SoLd != null
				};
			},
			xX: !0
		},
		{ name: "Rasterize", p: LayersPanel.a51 },
		{ name: "Rasterize Layer Style",
			p: function (G) {
				var _local3733 = G.B[G.g[0]];
				return {
					p: _local3733.add.lmfx != null && !_local3733.IQ()
				};
			}
		},
		{ name: "Convert to Shape",
			xX: !0,
			p: function (G) {
				var _local3734 = G.B[G.g[0]];
				return {
					p: _local3734.add.TySh != null
				};
			}
		},
		{
			name: "",
			xX: !0,
			p: function (G) {
				var _local3737 = G.B[G.g[0]],
					_local3736 = _local3737.add.TySh,
					_local3735 = _local3736 ? _local3736.zC : null;
				return {
					p: _local3736 != null && _local3735.Curve == null,
					iH: _local3736 && dt.WK(_local3735) == 0 ? "Convert to Paragraph Text" : "Convert to Point Text"
				};
			}
		},
		LayersPanel.a1S(!1),
		LayerStyleDialog.a1T(),
		{
			name: "Merge Layers",
			p: function (G) {
				var _local3738 = G == null ? 0 : G.g.length;
				return {
					p: _local3738 != 0 && (_local3738 != 1 || G.g[0] != 0),
					iH: _local3738 > 1 || _local3738 == 1 && G.B[G.g[0]].IQ() ? "Merge Layers" : "Merge Down"
				};
			}
		},
		{ name: "Flatten Image", xX: !0 },
		{ name: "Color",
			sub: function () {
				var _local3740 = [];
				for (var _local3739 = 0; _local3739 < LayerPanelRow.J2.length; _local3739++) _local3740.push({
					name: [13, 1, _local3739],
					e2: "#" + PixelUtil.intToHex6(LayerPanelRow.J2[_local3739])
				});
				return _local3740;
			}()
		}],
		_local3731 = [{
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "layerstyle"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.Da,
			W: {
				a: "fromlayer",
				X9: [null, 0, 0]
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.ZY
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "duplinto"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.Qe
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "newPlacedLayer"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.zY
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "rasterizeLayer",
				a0: {
					classID: "rasterizeLayer",
					null: PsdDescriptorHelper.Fw("Lyr", !0)
				}
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.pL
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.aon
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.zl,
			W: {
				a: "switchPntPrgr"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.Gk
			}
		}, LayerStyleDialog.asB(), {
			Y: ActionTypes.E.g5,
			W: {
				kT: "mergeLayersNew",
				a0: {
					__name: "Merge Layers",
					classID: "Mrg2"
				}
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "flattenImage"
			}
		}, {
			sub: function () {
				var _local3742 = [];
				for (var _local3741 = 0; _local3741 < 8; _local3741++) _local3742.push({
					Y: ActionTypes.E.v,
					G: f.yS,
					W: {
						a: LayerRecord.dZ,
						anr: _local3741
					}
				});
				return _local3742;
			}()
		}];

	this.DM = new ContextPanel(_local3732, _local3731);

	var _local3732 = [
		{
			name: "Add Filter Mask",
			p: function (G) {
				var _local3743 = G.B[G.g[0]];
				return {
					p: _local3743.vZ(G).z == null
				};
			}
		},
		{ name: "Clear Smart Filters" }],

		_local3731 = [
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.ev } },
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.OL } }];


	this.a7F = new ContextPanel(_local3732, _local3731);

	var _local3732 = [
		{
			name: "enab/disab",
			p: function (G) {
				return {
					iH: G.B[G.g[0]].c3().isEnabled ? "Disable Raster Mask" : "Enable Raster Mask"
				};
			}
		},
		{ name: "Delete Raster Mask" },
		{
			name: "Apply",
			p: function (G) {
				return {
					p: G.T8(!1, !0)
				};
			}
		}],
		_local3731 = [
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.sF } },
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.uU } },
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.n9 } }];


	this.a3R = new ContextPanel(_local3732, _local3731);

	var _local3732 = [
		{
			name: "enab/disab",
			p: function (G) {
				return {
					iH: G.B[G.g[0]].vZ(G).z.isEnabled ? "Disable Filter Mask" : "Enable Filter Mask"
				};
			}
		},
		{ name: "Delete Filter Mask" }],

		_local3731 = [
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.W0 } },
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.V2 } }];


	this.aj8 = new ContextPanel(_local3732, _local3731);

	var _local3732 = [{
			name: "enab/disab",
			p: function (G) {
				return {
					iH: G.B[G.g[0]].add.vmsk.isEnabled ? "Disable Vector Mask" : "Enable Vector Mask"
				};
			}
		},
		{ name: "Delete Vector Mask" },
		{ name: "Rasterize" }],

		_local3731 = [
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.dD } },
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.W1 } },
		{ Y: ActionTypes.E.v, G: f.yS, W: { a: LayerRecord.g_ } }];

	this.ajc = new ContextPanel(_local3732, _local3731);
	this.alw = new ContextPanel(LayerStyleDialog.alE(!0), LayerStyleDialog.ye(!0));
	this.aoa = new ContextPanel(LayerStyleDialog.bb(), LayerStyleDialog.bQ());
};
LayersPanel.prototype.axz = function (l) {
	var _local3747 = this.jo.scrollTop - 600;
	for (var _local3744 = 0; _local3744 < this.Yb.length; _local3744++) {
		var _local3745 = this.Yb[_local3744],
			_local3746 = _local3745.Xl;
		if (_local3747 < _local3745.Xl) _local3745.ast();
		if (_local3745.Xl > _local3747 + this.Tq + 600) break;
	}
};
LayersPanel.prototype.xI = function () {
	return this.aeZ;
};
LayersPanel.prototype.a0_ = function (l) {
	var _local3753 = this.Nj;
	if (l) {
		var _local3749 = l.target.sz(),
			_local3748 = _local3749[0];
		if (_local3748 < 4) _local3753[_local3748] = 1 - _local3753[_local3748];else
		if (_local3748 < 6) {
			if (_local3748 == 4 && LayerTreeNode.hC - 10 >= 10) LayerTreeNode.hC -= 10;
			if (_local3748 == 5 && LayerTreeNode.hC + 10 <= 200) LayerTreeNode.hC += 10;
			if (this.Kv) this.Kv.i_ = !0;
		} else {
			if (_local3748 == 6) LayerTreeNode.iR = 0;
			if (_local3748 == 7) LayerTreeNode.iR = 1;
			if (this.Kv) this.Kv.i_ = !0;
		}
		var _local3752 = window.localStorage;
		if (_local3752) _local3752.setItem("lpOpt", JSON.stringify([_local3753, LayerTreeNode.hC, LayerTreeNode.iR]));
	}
	if (_local3753[0] == 1) this.aqN();
	var _local3751 = [
	[{ e: this.a9i }],
	[this.ru, this.eR],
	[this.__, this.z2]];

	for (var _local3748 = 0; _local3748 < 3; _local3748++) {
		for (var _local3750 = 0; _local3750 < _local3751[_local3748].length; _local3750++) {
			_local3751[_local3748][_local3750].e.style.display = _local3753[_local3748] == 1 ? "inline-block" : "none";
		}
	}
	this.resize(this.iJ, this.Tq);
};
LayersPanel.prototype.axk = function () {
	var _local3756 = this.mR;
	if (_local3756 == null) return !1;
	if (_local3756.b()) {
		var _local3755 = this.xa.b(),
			_local3754 = this.fq[_local3755].b();
		if (_local3755 == 0) return _local3754.indexOf(!0) != -1;
		if (_local3755 == 1) return _local3754 != "";
	}
	return !1;
};
LayersPanel.a1S = function (l) {
	var _local3758 = function (b) {
			var _local3759 = b != null && b.g.length != 0 && b.B[b.g[0]].usesClippingMask;
			return {
				Zj: _local3759,
				p: b != null && b.Hz(b.g[0]),
				W: {
					Y: ActionTypes.E.g5,
					W: {
						kT: _local3759 ? "ungroup" : "groupEvent",
						a0: {
							classID: _local3759 ? "Ungr" : "GrpL",
							null: PsdDescriptorHelper.Fw("Lyr", !0)
						}
					}
				}
			};
		},
		_local3757 = {
			name: [6, 6, 0],
			xX: !0,
			p: _local3758
		};
	if (l) _local3757.C0 = [KeyboardHandler.Jm, KeyboardHandler.wz, KeyboardHandler.Jv];
	return _local3757;
};
LayersPanel.a51 = function (l, d) {
	if (l)
	for (var _local3760 = 0; _local3760 < l.g.length; _local3760++) {
		var _local3761 = l.B[l.g[_local3760]];
		if (_local3761.add.TySh || _local3761.add.SoLd || _local3761.add.SoCo || _local3761.add.GdFl || _local3761.add.PtFl) return {
			p: !0
		};
	}
	return {
		p: !1
	};
};
LayersPanel.prototype.aA6 = function (l) {
	s.stopAndPreventHandler(l);
	var _local3765 = l.dataTransfer.getData("Text"),
		_local3762 = 1,
		_local3764 = 0;
	if (_local3765 == "") {
		s.handleDataTransferDrop(l, this, this.z8.indexOf(this.Kv), _local3764 + (_local3762 > .5 ? 0 : 1));
	} else if (_local3765 != "--panel") {
		var _local3765 = JSON.parse(_local3765),
			_local3763 = _local3765.Ts;
		if (_local3763 == "l") this.zh({
			a: LayerRecord.jD,
			source: _local3765.yD,
			target: _local3764,
			yu: _local3762
		});
	}
};
LayersPanel.prototype.a2r = function (l) {
	var _local3770 = this.Kv,
		_local3766 = l.data,
		_local3768;
	if (_local3770.g.indexOf(_local3766.j) == -1) {
		var _local3769 = {
			a: LayerRecord.bj,
			j: l.target.Qj.index,
			VY: _local3766.ht
		};
		this.zh(_local3769);
	}
	if (_local3770.g.indexOf(_local3766.j) == -1) return;
	this.nh();
	if (_local3766.ht == 1) {
		_local3768 = this.a3R;
	} else if (_local3766.ht == 2) {
		_local3768 = this.ajc;
	} else if (_local3766.ht == 3) {
		_local3768 = this.aj8;
	} else if (_local3766.ht == 4) {
		_local3768 = this.a7F;
	} else if (_local3766.ht == 5) {
		_local3768 = this.aje;
	} else {
		_local3768 = this.DM;
	}
	_local3768.refresh();
	_local3768.update(_local3770);
	_local3768.parent = this;
	var _local3767 = new Action(ActionTypes.E.L, !0);
	_local3767.data = {
		a: ActionTypes.$.dY,
		A3: _local3768,
		x: _local3766.be.x + 1,
		y: _local3766.be.y + 1
	};
	this.dispatch(_local3767);
};
LayersPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.ru.refresh();
	this.eR.refresh();
	this.__.refresh();
	this.z2.refresh();
	if (this.mR) {
		this.mR.refresh();
		this.fq[0].refresh();
	}
	if (this.Kv) this.Yw(this.Kv);
	var _local3774 = "lrs/link lrs/fx lrs/adj lrs/mask lrs/folder lrs/newlayer lrs/bin".split(" ");
	for (var _local3771 = 0; _local3771 < this.lM.length; _local3771++) {
		var _local3773 = this.lM[_local3771];
		_local3773.setLabel(s.getIconImgHtml(_local3774[_local3771], null, "miniscale"));
		if (_local3771 == 1 || _local3771 == 2) {
			_local3773.e.style.position = "relative";
			var _local3772 = s.createElement("img", "gsicon");
			_local3772.setAttribute("src", PIMG["tools/corner"]);
			_local3772.setAttribute("style", "position:absolute; right:0;  bottom:0; width:100%;  height:100%;");
			_local3773.e.appendChild(_local3772);
		}
	}
};
LayersPanel.prototype.Yw = function (l, d) {
	if (l && !l.i_) return;
	if (l == null) s.addClass(this.DK, "disabled");else
	s.removeClass(this.DK, "disabled");
	this.Kv = l;
	this.z8 = d;
	if (this.$E != null) {
		s.clearChildren(this.jo);
		this.$E = null;
		this.Yb = [];
	}
	if (l == null) return;
	var _local3776 = !1;
	for (var _local3775 = 0; _local3775 < l.vj.length; _local3775++)
	if (l.vj[_local3775].jv) _local3776 = !0;
	this.$E = new LayerPanelRow(l.root, this, l, {
		_A: 0,
		LG: !1
	}, {
		a35: _local3776,
		aty: this.axk()
	}, this.Yb, 0, new Rect(0, 0, l.m, l.n));

	if (l.g.length == 0 || l.B[l.g[0]] == null) {
		s.addClass(this.lg, "disabled");
	} else {
		s.removeClass(this.lg, "disabled");
		if (l.g.length == 1 && l.DF) {
			var _local3780 = l.g[0];
			for (var _local3775 = 0; _local3775 < this.Yb.length; _local3775++) {
				var _local3779 = this.Yb[_local3775];
				if (_local3779.Qj.index == _local3780 && _local3779.lg.scrollIntoView) _local3779.lg.scrollIntoView({
					block: "nearest"
				});
			}
		}
		var _local3778 = l.B[l.g[0]];
		if (_local3778.IQ()) {
			this.ru.b3([
			[15, 10, 27]].
			concat(au.YJ), [1].concat(au.hY));
			var _local3781 = au.CP.indexOf(_local3778.blendModeKey);
			this.ru.c(_local3781 + 1);
		} else {
			this.ru.b3(au.YJ, au.hY);
			var _local3781 = au.CP.indexOf(_local3778.blendModeKey);
			this.ru.c(_local3781);
		}
		this.eR.c(Math.round(100 * _local3778.opacity / 255));
		this.__.c([_local3778.Ka(0), _local3778.Ka(1), _local3778.Ka(2), _local3778.Ka(31)]);
		var _local3777 = l.jq();
		this.ru.setEnabled(!_local3777);
		this.z2.setEnabled(!_local3777);
		this.eR.setEnabled(!_local3777);
		this.__.setEnabled(!(_local3777 && !_local3778.Ka(31)));
		this.z2.c(Math.round(100 * (_local3778.add.iOpa != null ? _local3778.add.iOpa / 255 : 1)));
		this.lM[3].arb(_local3778.c3() ? "Add Vector Mask" : "Add Raster Mask");
	}
	this.axz(null);
};
LayersPanel.prototype.resize = function (l, d) {
	this.iJ = l;
	this.Tq = d;
	var _local3782 = this.lg.getBoundingClientRect().height;
	if (55 < _local3782 && _local3782 < 56) _local3782 = 60.2;
	var _local3784 = this.S8.getBoundingClientRect().height,
		_local3783 = d - (_local3782 + _local3784 + 3);
	this.jo.style.height = _local3783 + "px";
	this.jo.style.width = l + "px";
};
LayersPanel.prototype.a5p = function (l) {
	this.zh({
		a: LayerRecord.zZ,
		mz: this.ru.b()
	});
};
LayersPanel.prototype.aoS = function (l) {
	this.zh({
		a: LayerRecord.y$,
		mz: Math.round(255 * this.eR.b() / 100)
	});
};
LayersPanel.prototype.asd = function (l) {
	this.zh({
		a: LayerRecord.ss,
		mz: [this.__.b(), [0, 1, 2, 31]]
	});
};
LayersPanel.prototype.afg = function (l) {
	this.zh({
		a: LayerRecord.Ij,
		mz: Math.round(255 * this.z2.b() / 100)
	});
};
LayersPanel.prototype.$M = function (l) {
	if (l.target == this.xa) this.aqN();
	var _local3785 = this.mR.b();
	if (_local3785) s.removeClass(this.Mg, "disabled");else
	s.addClass(this.Mg, "disabled");
	this.refresh();
	this.Kv.i_ = !0;
	this.Yw(this.Kv);
	this.Kv.i_ = !1;
};
LayersPanel.prototype.aqN = function () {
	var _local3789 = this.Mg;
	if (_local3789 == null) {
		var _local3788 = this.a9i,
			_local3786 = this.mR = new CheckboxControl("Filter");
		_local3786.addListener(ActionTypes.E.A, this.$M, this);
		_local3788.appendChild(_local3786.e);
		_local3789 = this.Mg = s.createElement("span", "disabled");
		_local3788.appendChild(_local3789);
		this.xa = new DropdownMenu(null, ["Kind", "Name"], []);
		this.xa.addListener(ActionTypes.E.A, this.$M, this);
		var _local3787 = this.fq = [
		new MultiOptionBox(null, [
		"<img src=\"" + PIMG.pix_layer + "\" class=\"miniscale gsicon\" />",
		"<img src=\"" + PIMG["lrs/adj"] + "\" class=\"miniscale gsicon\" />",
		"<img src=\"" + PIMG["tools/htype"] + "\" class=\"miniscale gsicon\" />",
		"<img src=\"" + PIMG.shape_layer + "\" class=\"miniscale gsicon\" />",
		"<img src=\"" + PIMG.so_layer + "\" class=\"miniscale gsicon\" />"],
		!0, [
		"Pixels",
		"Adjustments",
		"Type",
		"Shapes",
		"Smart Object"]
		), new TextInput(null, null, 8)];
		_local3787[0].addListener(ActionTypes.E.A, this.$M, this);
		_local3787[1].addListener("input", this.$M, this);
	}
	s.clearChildren(_local3789);
	_local3789.appendChild(this.xa.e);
	_local3789.appendChild(this.fq[this.xa.b()].e);
};
LayersPanel.prototype.akS = function (l) {
	this.nh();
	this.a4k(l, this.alw);
};
LayersPanel.prototype.agK = function (l) {
	this.nh();
	this.a4k(l, this.aoa);
};
LayersPanel.prototype.a4k = function (l, d) {
	var _local3790 = l.currentTarget;
	if (s.isInDocument(d.e)) return;
	l.stopPropagation();
	var _local3792 = _local3790.getBoundingClientRect();
	d.refresh();
	d.update(this.Kv);
	d.parent = this;
	var _local3791 = new Action(ActionTypes.E.L, !0);
	_local3791.data = {
		a: ActionTypes.$.dY,
		A3: d,
		x: _local3792.left,
		y: _local3792.top,
		a8G: !0
	};
	this.dispatch(_local3791);
};
LayersPanel.prototype.ajw = function (l) {
	this.zh({
		a: LayerRecord.ai0
	});
};
LayersPanel.prototype.a5Z = function (l) {
	this.zh({
		a: this.Kv.g.length > 1 ? LayerRecord.mQ : LayerRecord.C2
	});
};
LayersPanel.prototype.aqk = function (l) {
	this.zh({
		a: LayerRecord.vx
	});
};
LayersPanel.prototype.a5m = function (l) {
	var _local3795 = this.Kv;
	if (_local3795.g.length == 0) return;
	var _local3793 = _local3795.B[_local3795.g[0]],
		_local3794 = _local3793.ht;
	this.zh({
		a: _local3794 <= 0 ? _local3793.VM ? LayerRecord.W1 : LayerRecord.Qe : _local3794 == 3 ? LayerRecord.V2 : LayerRecord.uU
	});
};
LayersPanel.prototype.a6r = function (l) {
	this.zh({
		a: LayerRecord.cr
	});
};
LayersPanel.prototype.zh = function (l) {
	var _local3796 = new Action(ActionTypes.E.v, !0);
	_local3796.data = l;
	_local3796.G = f.yS;
	this.dispatch(_local3796);
};
LayersPanel.prototype.sY = function () {
	var _local3802 = [
		"Link Layers",
		"Layer Style",
		"New Adjustment Layer",
		"Add Raster Mask",
		"New Folder",
		"New Layer",
		"Delete"],

		_local3801 = [this.a6r, this.agK, this.akS, this.ajw, this.a5Z, this.aqk, this.a5m],
		_local3798 = this.aiE.bind(this);
	for (var _local3797 = 0; _local3797 < _local3802.length; _local3797++) {
		var _local3800 = new ToolbarButton("W", !1, _local3802[_local3797]);
		this.lM.push(_local3800);
		s.addPointerDown(_local3800.e, _local3801[_local3797].bind(this));
		this.S8.appendChild(_local3800.e);
		if (_local3797 >= _local3802.length - 3) {
			var _local3799 = _local3800.e;
			_local3799.addEventListener("drop", _local3798, !1);
			_local3799.addEventListener("dragover", function (Q) {
				Q.preventDefault();
			}, !1);
			_local3799.addEventListener("dragenter", s.stopAndPreventHandler, !1);
		}
	}
};
LayersPanel.prototype.aiE = function (l) {
	s.stopAndPreventHandler(l);
	var _local3807 = 0,
		_local3803 = this.lM;
	while (_local3803[_local3807].e != l.currentTarget) _local3807++;
	_local3803[_local3807].kL();
	var _local3806 = l.dataTransfer.getData("Text");
	if (_local3806 == "") return;
	var _local3806 = JSON.parse(_local3806);
	if (_local3806.Ts == "l") {
		var _local3805 = {
			a: [LayerRecord.mQ, LayerRecord.ZY, LayerRecord.Qe][_local3807 - 4]
		};
		if (this.Kv.g.indexOf(_local3806.yD) == -1) _local3805.j = _local3806.yD;
		this.zh(_local3805);
	}
	if (_local3807 != 6) return;
	if (_local3806.Ts == "sm" || _local3806.Ts == "s") {
		var _local3804 = new Action(ActionTypes.E.v, !0);
		_local3804.G = f.LY;
		_local3804.data = {
			a: _local3806.Ts == "sm" ? "st_clear" : "st_delsingle",
			j: _local3806.yD,
			yD: _local3806.aN
		};
		this.dispatch(_local3804);
	}
	if (_local3806.Ts == "fm" || _local3806.Ts == "f") {
		this.zh({
			a: _local3806.Ts == "fm" ? LayerRecord.OL : LayerRecord.Sk,
			src: _local3806.yD,
			aN: _local3806.aN
		});
	}
	if (_local3806.Ts == "m" || _local3806.Ts == "vm") {
		this.zh({
			a: _local3806.Ts == "m" ? LayerRecord.uU : LayerRecord.W1,
			j: _local3806.yD
		});
	}
};


function LayerPanelRow(l, d, G, b, V, Q, t, I) {
	UIComponent.call(this);
	this.parent = d;
	this.Xl = t;
	this.Qj = l;
	Q.push(this);
	this.v0 = G;
	this.a9 = b;
	var _local3830 = d.jo,
		_local3821 = l.j,
		_local3814 = G.g.indexOf(l.index) != -1,
		_local3829 = null;
	this.lg = s.createElement("div", _local3814 ? "head selected" : "head");
	if (_local3821.add.artb != null) {
		s.addClass(this.lg, "artb");
		I = _local3821.dA();
	}
	var _local3815 = this.a3X = Math.floor(10 + _local3821.a80 / s.getDevicePixelRatio()),
		_local3813 = "height: " + _local3815 + "px;";
	if (_local3814 && V.a35) _local3813 += "background-color:rgba(255,50,50,0.4);";
	this.lg.setAttribute("style", _local3813);
	this.Fm = I;
	var _local3826 = this.avG = this.acP.bind(this),
		_local3816 = V.aty && !this.a97();
	if (!_local3816) {
		if (l.depth != 0) {
			_local3830.appendChild(this.lg);
			t += _local3815;
		}
		if (_local3821.sc() || _local3821.aW())
		if (_local3821.bn()) {
			_local3829 = this.a1W = s.createElement("div", "lpineck");
			_local3830.appendChild(_local3829);
			if (_local3821.sc()) {
				_local3829.addEventListener("contextmenu", _local3826, !1);
				var _local3823 = new LayersPanel.s0("Effects", "sm", "layerstyle", l.depth, 0, null);
				t += 21;
				_local3823.parent = this;
				_local3829.appendChild(_local3823.e);
				var _local3822 = _local3821.add.lmfx;
				LayerStyleConstants.ensureEffectMultiLists(_local3822);
				var _local3818 = _local3822.masterFXSwitch.v;
				_local3823.Oj(_local3818);
				for (var _local3808 = 0; _local3808 < LayerStyleConstants.effectOrder.length; _local3808++) {
					var _local3824 = _local3822[LayerStyleConstants.effectMultiKeys[_local3808]].v;
					if (_local3824.length == 0) continue;
					for (var _local3811 = 0; _local3811 < _local3824.length; _local3811++) {
						var _local3823 = new LayersPanel.s0(languageManager.get(LayerStyleConstants.effectDisplayNames[_local3808]), "s", "layerstyle", l.depth, 1, [_local3808, _local3811]);
						t += 21;
						_local3823.Oj(_local3818 && _local3824[_local3811].v.enab.v);
						_local3823.parent = this;
						_local3829.appendChild(_local3823.e);
					}
				}
			}
			if (_local3821.aW()) {
				var _local3810 = _local3821.vZ(G).z;
				if (_local3810) this.N$ = s.createElement("div", "thumb");
				var _local3823 = new LayersPanel.s0("Smart Filters", "fm", null, l.depth, 0, -1, _local3810 ? this.N$ : null);
				t += _local3810 ? _local3815 : 21;
				_local3823.parent = this;
				_local3829.appendChild(_local3823.e);
				this.a0e = _local3823.e;
				this.a0e.addEventListener("contextmenu", _local3826, !1);
				var _local3822 = _local3821.add.SoLd.filterFX.v,
					_local3828 = _local3822.filterFXList.v,
					_local3818 = _local3822.enab.v;
				_local3823.Oj(_local3818);
				for (var _local3808 = _local3828.length - 1; _local3808 >= 0; _local3808--) {
					var _local3812 = _local3828[_local3808].v,
						_local3817 = FilterHelper.ko(_local3812);
					if (LayerEffectsHelper.classIdToKey[_local3817]) _local3817 = LayerEffectsHelper.classIdToKey[_local3817];
					var _local3819 = _local3812.Nm.v;
					if (FilterHelper.names[_local3817]) _local3819 = languageManager.get(FilterHelper.names[_local3817]);
					if (LayerEffectsHelper.names[_local3817]) _local3819 = languageManager.get(LayerEffectsHelper.names[_local3817]);
					var _local3809 = "afw_" + _local3817,
						_local3823 = new LayersPanel.s0(_local3819, "f", _local3809, l.depth, 1, _local3808);
					t += 21;
					_local3823.Oj(_local3818 && _local3812.enab.v);
					_local3823.parent = this;
					_local3829.appendChild(_local3823.e);
				}
			}
		}
	}
	var _local3820 = _local3821.add.lclr;
	if (_local3820 == null) _local3820 = 0;
	_local3820 = _local3820 == 0 ? b._A : LayerPanelRow.J2[_local3820];
	this.ayi = _local3820;
	if (_local3821.IQ() && (_local3821.add.lsct == LayerSectionType.open || V.aty)) {
		var _local3825 = {
			_A: _local3820,
			LG: b.LG || _local3821.Ka(31)
		};
		for (var _local3808 = l.children.length - 1; _local3808 >= 0; _local3808--) {
			var _local3827 = new LayerPanelRow(l.children[_local3808], d, G, _local3825, V, Q, t, I);
			t = _local3827.a3z;
		}
	}
	this.a3z = t;
}
LayerPanelRow.prototype = new UIComponent();
LayerPanelRow.J2 = [16777215, 16711680, 16748544, 16763904, 4513024, 22015, 11141375, 7829367];
LayerPanelRow.prototype.ast = function () {
	if (this.qc) return;
	var _local3855 = this.Qj,
		_local3850 = _local3855.j,
		_local3835 = this.v0,
		_local3848 = this.a9,
		_local3841 = !0,
		_local3856 = !1;
	_local3855.Gx(_local3835, this.Fm, !0);
	var _local3843 = s.createElement("div", "headL"),
		_local3840 = s.createElement("div", "headR");
	this.lg.appendChild(_local3843);
	this.lg.appendChild(_local3840);
	var _local3861 = this.lg;
	_local3861.setAttribute("draggable", "true");
	_local3861.addEventListener("dragstart", this.Hk.bind(this), !1);
	_local3861.addEventListener("drop", this.TR.bind(this), !1);
	_local3861.addEventListener("dragover", this.Xq.bind(this), !1);
	_local3861.addEventListener("dragenter", s.stopAndPreventHandler, !1);
	_local3861.addEventListener("dragleave", this.up.bind(this), !1);
	var _local3837 = [],
		_local3863 = [null, null, null, null],
		_local3851 = _local3850.zD(),
		_local3839 = _local3855;
	while (_local3839.parent) {
		_local3839 = _local3839.parent;
		_local3851 = _local3851 && _local3839.j.zD();
	}
	if (_local3850.usesClippingMask) {
		for (var _local3831 = _local3855.index - 1; _local3831 >= 0; _local3831--) {
			var _local3838 = _local3835.B[_local3831];
			if (!_local3838.usesClippingMask) {
				_local3841 = _local3838.zD();
				break;
			}
		}
	}
	var _local3857 = _local3850.zD() ? _local3851 && _local3841 ? 2 : 1 : 0;
	this.qc = s.createElement("div");
	var _local3860 = s.createElement("div", _local3857 == 0 ? "sqr" : "eye");
	this.qc.appendChild(_local3860);
	_local3860.style.opacity = [.12, .33, 1][_local3857];
	var _local3842 = s.createElement("div", "space");
	this.Me = s.createElement("div", "label");
	this.Me.setAttribute("style", "max-width:calc(100% - " + (96 + _local3855.depth * 20) + "px); margin-top:" + (this.a3X - 19) / 2 + "px;");
	this.Me.textContent = _local3850.getName();
	this.Ed = s.createElement("div", "lock");
	this.a0Y = s.createElement("div", "lrfx");
	this.PE = s.createElement("div", "arfx");
	var _local3853 = this.avG,
		_local3852 = this.aeB.bind(this);
	this.lg.addEventListener("click", _local3852, !1);
	this.lg.addEventListener("contextmenu", _local3853, !1);
	var _local3845 = this.ayi;
	if (_local3845 != 0) {
		var _local3854 = [_local3845 >> 16, _local3845 >> 8 & 255, _local3845 & 255];
		for (var _local3831 = 0; _local3831 < 3; _local3831++) {
			_local3854[_local3831] = "calc(" + _local3854[_local3831] + "*0.7 + (var(--absc)) * 255 * 0.3)";
		}
		this.qc.setAttribute("style", "background-color:rgba(" + _local3854.join(",") + ",1);");
	}
	var _local3834 = this.a1O.bind(this);
	this.qc.addEventListener("mousedown", _local3834, !1);
	this.qc.addEventListener("mouseover", _local3834, !1);
	this.PE.addEventListener("click", this.a3I.bind(this), !1);
	_local3837[0] = this.qc;
	_local3837[1] = _local3842;
	_local3837[10] = this.Me;
	if (_local3850.IQ()) {
		var _local3833 = s.createElement("div", "arrow"),
			_local3859 = s.createElement("div", "folder");
		this.qh(_local3859);
		_local3833.addEventListener("click", this.a6X.bind(this), !1);
		_local3837[2] = _local3833;
		_local3837[3] = _local3859;
		_local3833.className = _local3850.add.lsct == LayerSectionType.open ? "open" : "closed";
	} else {
		this.Ct = s.createElement("div", "thumb");
		_local3837[5] = this.Ct;
		LayerPanelRow.LF(this.Ct, _local3850.at);
		this.qh(this.Ct);
		if (LayerEffectsHelper.detectAdjustmentKey(_local3850.add)) s.addClass(_local3850.at.canvas, "gsicon");
	}
	var _local3836 = _local3850.c3();
	if (_local3836) {
		this.KC = s.createElement("div", "chain");
		this.Pz = s.createElement("div", "thumb");
		LayerPanelRow.LF(this.Pz, _local3850.yY, !0);
		this.KC.style.opacity = _local3836.cv ? 1 : 0;
		this.KC.addEventListener("click", this.ae8.bind(this), !1);
	}
	var _local3844 = _local3850.VF() && _local3850.add.vmsk;
	if (_local3850.add.vmsk && !_local3844) {
		this.nW = s.createElement("div", "chain");
		this.jy = s.createElement("div", "thumb");
		LayerPanelRow.LF(this.jy, _local3850.bX, !0);
		this.nW.style.opacity = _local3850.add.vmsk.cv ? 1 : 0;
		this.nW.addEventListener("click", this.aba.bind(this), !1);
	}
	if (_local3850.aW() && _local3850.bn() && _local3850.vZ(_local3835).z) {
		LayerPanelRow.LF(this.N$, _local3850.Fp, !1);
		this.qh(this.N$);
		this.N$.addEventListener("click", _local3852, !1);
		this.N$.addEventListener("contextmenu", _local3853, !1);
	}
	if (_local3855.index == _local3835.g[0]) {
		var _local3846 = _local3850.ht,
			_local3832;
		if (_local3846 <= 0) _local3832 = this.Ct;else
		if (_local3846 == 1) _local3832 = this.Pz;else
		if (_local3846 == 3) _local3832 = this.N$;
		if (_local3832) _local3832.className = "thumb active";
		if (_local3850.VM && this.jy) this.jy.className = "thumb active";
	}
	_local3842.setAttribute("style", "width:" + Math.max(0, _local3855.depth - 1) * 18 + "px");
	var _local3847 = _local3850.add.lspf != null && _local3850.add.lspf != 0 || _local3848.LG;
	this.Ed.style.opacity = _local3850.Ka(31) ? 1 : .5;
	_local3837[4] = _local3850.usesClippingMask ? s.createElement("div", "clipp") : null;
	_local3837[6] = _local3836 ? this.KC : null;
	_local3837[7] = _local3836 ? this.Pz : null;
	_local3837[8] = _local3850.add.vmsk && !_local3844 ? this.nW : null;
	_local3837[9] = _local3850.add.vmsk && !_local3844 ? this.jy : null;
	var _local3858 = _local3850.folderStackIndex,
		_local3849 = _local3835.g;
	if (_local3858 != 0)
	for (var _local3831 = 0; _local3831 < _local3849.length; _local3831++)
	if (_local3835.B[_local3849[_local3831]].folderStackIndex == _local3858) {
		_local3856 = !0;
		break;
	}
	if (_local3856) {
		_local3863[0] = s.createElement("div", _local3850.layerLinkEnabled ? "link" : "linkX");
		_local3863[0].addEventListener("click", this.apy.bind(this), !1);
	}
	_local3863[1] = _local3847 ? this.Ed : null;
	_local3863[2] = _local3850.sc() ? this.a0Y : null;
	_local3863[3] = _local3850.sc() || _local3850.aW() ? this.PE : null;
	this.PE.className = _local3850.bn() ? "arfx open  gsicon" : "arfx closed  gsicon";
	var _local3862 = _local3837;
	for (var _local3831 = 0; _local3831 < _local3862.length; _local3831++)
	if (_local3862[_local3831]) _local3843.appendChild(_local3862[_local3831]);
	_local3862 = _local3863;
	for (var _local3831 = 0; _local3831 < _local3862.length; _local3831++)
	if (_local3862[_local3831]) _local3840.appendChild(_local3862[_local3831]);
};
LayerPanelRow.LF = function (l, d, G) {
	var _local3864 = d.canvas;
	s.setCanvasCssSizeForDpr(_local3864);
	if (G) l.setAttribute("draggable", "true");
	l.appendChild(_local3864);
	_local3864.setAttribute("style", _local3864.getAttribute("style") + "; pointer-events:none");
};
LayerPanelRow.prototype.qh = function (l) {
	s.addPointerDown(l, function (d) {
		if (this.parent.Nj[3] == 0) return;
		s.preventDefaultHandler(d);
		s.addPointerUp(document.body, function () {
			clearTimeout(this.aaH);
		}.bind(this));
		this.aaH = setTimeout(function () {
			var _local3865 = new Action("rclick", !0);
			_local3865.data = {
				j: this.Qj.index,
				ht: this.ht(d),
				be: s.getEventPositionInElement(d, document.body)
			};
			this.dispatch(_local3865);
		}.bind(this), 600);
	}.bind(this));
};
LayerPanelRow.C_ = function (l, d) {
	var _local3866 = d.getBoundingClientRect();
	return (l.clientY - _local3866.top) / _local3866.height;
};
LayerPanelRow.prototype.Hk = function (l) {
	l.stopPropagation();
	var _local3867 = l.target == this.Pz ? "m" : l.target == this.jy ? "vm" : "l";
	l.dataTransfer.setData("Text", JSON.stringify({
		Ts: _local3867,
		yD: this.Qj.index
	}));
};
LayerPanelRow.prototype.up = function (l) {
	s.stopAndPreventHandler(l);
	this.hb();
};
LayerPanelRow.prototype.TR = function (l) {
	s.stopAndPreventHandler(l);
	this.hb();
	var _local3873 = l.dataTransfer.getData("Text"),
		_local3868 = this.parent.Kv,
		_local3872 = LayerPanelRow.C_(l, this.lg),
		_local3871 = this.Qj.index;
	if (_local3872 > .8) {
		var _local3870 = !0,
			_local3875 = _local3868.root.O4(_local3871);
		while (_local3875.parent != null) {
			var _local3869 = _local3875.parent,
				_local3876 = _local3869.children;
			if (_local3876.indexOf(_local3875) != 0) _local3870 = !1;
			_local3875 = _local3875.parent;
		}
		if (_local3870) {
			_local3871 = 0;
			_local3872 = 1;
		}
	}
	if (_local3873 == "") {
		s.handleDataTransferDrop(l, this, this.parent.z8.indexOf(_local3868), _local3871 + (_local3872 > .5 ? 0 : 1));
	} else if (_local3873 != "--panel") {
		var _local3873 = JSON.parse(_local3873),
			_local3874 = _local3873.Ts;
		if (_local3874 == "l") this.zh({
			a: LayerRecord.jD,
			source: _local3873.yD,
			target: _local3871,
			yu: _local3872
		});else
		if (_local3874 == "m" || _local3874 == "vm") this.zh({
			a: _local3874 == "m" ? LayerRecord.aqH : LayerRecord.Es,
			src: _local3873.yD,
			hw: _local3871
		});else
		LayerPanelRow.aiL(l, _local3873, this);
	}
};
LayerPanelRow.aiL = function (l, d, G, b) {
	var _local3878 = d.Ts,
		_local3877 = G.Qj.index,
		_local3879 = d.yD;
	if (_local3878 == "s" || _local3878 == "sm") G.zh({
		a: LayerRecord.R4,
		src: _local3879,
		hw: _local3877,
		aN: d.aN
	});
	if (_local3878 == "f" || _local3878 == "fm") G.zh({
		a: LayerRecord.agf,
		src: _local3879,
		hw: _local3877,
		aN: d.aN,
		_L: b == null ? 0 : b
	});
};
LayerPanelRow.prototype.Xq = function (l) {
	s.stopAndPreventHandler(l);
	var _local3882 = LayerPanelRow.C_(l, this.lg),
		_local3880 = this.Qj.j.IQ() && .5 < _local3882 && _local3882 < .8;
	this.hb();
	var _local3881 = "inset 0 " + (_local3880 ? 0 : _local3882 > .5 ? -3 : 3) + "px " + (_local3880 ? "5px black" : "0 rgba(0,0,0,0.5)");
	this.lg.style.boxShadow = _local3881;
};
LayerPanelRow.prototype.hb = function (l) {
	this.lg.style.boxShadow = "";
};
LayerPanelRow.aou = -1;
LayerPanelRow.lY = !1;
LayerPanelRow.ae7 = function (l) {
	LayerPanelRow.lY = !1;
	document.body.removeEventListener("mouseup", LayerPanelRow.ae7);
};
LayerPanelRow.prototype.a1O = function (l) {
	if (l.button != 0) return;
	if (l.type == "mousedown") {
		LayerPanelRow.lY = !0;
		document.body.addEventListener("mouseup", LayerPanelRow.ae7, !1);
	}
	if (l.type == "mouseover" && (!LayerPanelRow.lY || LayerPanelRow.aou == this.Qj.index)) return;
	s.stopAndPreventHandler(l);
	this.zh({
		a: LayerRecord.mH,
		j: this.Qj.index
	});
	LayerPanelRow.aou = this.Qj.index;
};
LayerPanelRow.prototype.a6X = function (l) {
	s.stopAndPreventHandler(l);
	this.zh({
		a: LayerRecord.ac5,
		j: this.Qj.index
	});
};
LayerPanelRow.prototype.ae8 = function (l) {
	this.zh({
		a: LayerRecord.JX,
		j: this.Qj.index
	});
};
LayerPanelRow.prototype.aba = function (l) {
	this.zh({
		a: LayerRecord.GD,
		j: this.Qj.index
	});
};
LayerPanelRow.pm = 0;
LayerPanelRow.prototype.sd = function (l) {
	this.zh({
		a: LayerRecord.oY,
		j: this.Qj.index,
		name: l
	});
};
LayerPanelRow.prototype.a3I = function (l) {
	this.zh({
		a: LayerRecord.ami,
		j: this.Qj.index
	});
};
LayerPanelRow.prototype.apy = function (l) {
	this.zh({
		a: LayerRecord.Ok,
		j: this.Qj.index
	});
};
LayerPanelRow.prototype.acP = function (l) {
	if (l.button != 2 && !s.isTouchEvent(l)) return;
	var _local3884 = this.ht(l);
	if (_local3884 != 3 && l.currentTarget == this.a0e) _local3884 = 4;
	if (l.target == this.a0Y || l.currentTarget == this.a1W) _local3884 = 5;
	var _local3883 = new Action("rclick", !0);
	_local3883.data = {
		j: this.Qj.index,
		ht: _local3884,
		be: s.getEventPositionInElement(l, document.body)
	};
	this.dispatch(_local3883);
};
LayerPanelRow.prototype.ht = function (l) {
	var _local3886 = l.target,
		_local3885 = _local3886;
	return _local3885 == this.jy ? 2 : _local3885 == this.Pz ? 1 : _local3885 == this.Ct ? 0 : _local3885 == this.N$ ? 3 : -1;
};
LayerPanelRow.prototype.aeB = function (l) {
	var _local3896 = l.target,
		_local3898;
	if (_local3896 == this.qc.firstChild || _local3896 == this.PE || _local3896 == this.KC || _local3896 == this.nW || _local3896.tagName && _local3896.tagName.toLowerCase() == "input") return;
	var _local3887 = this.ht(l),
		_local3895 = this.parent.Kv,
		_local3894 = this.Qj.index,
		_local3891 = _local3895.B[_local3894];
	if (_local3896 == this.Ed) {
		this.zh({
			a: LayerRecord.ss,
			j: _local3894,
			mz: [
			[!1, !1, !1, !1, !1],
			[0, 1, 2, 3, 31]]

		});
		return;
	}
	var _local3900 = LayerPanelRow.pm,
		_local3888 = Date.now() - _local3900 < 300;
	LayerPanelRow.pm = Date.now();
	if (_local3896 == this.Me) {
		if (_local3888) {
			this.lg.setAttribute("draggable", "false");
			var _local3901 = new PanelTabBase.di(this.Me, this.sd.bind(this));
		} else this.zh({
			a: LayerRecord.bj,
			j: _local3894,
			VY: _local3887,
			St: !0
		});
		return;
	}
	if (l.button == 0 && _local3888) {
		if (_local3896 == this.Me) return;
		var _local3897 = new Action(ActionTypes.E.v, !0),
			_local3890 = new Action(ActionTypes.E.L, !0),
			_local3892 = new Action(ActionTypes.E.g5, !0);
		if (_local3887 == 0 && _local3891.add.SoCo) {
			var _local3889 = PixelUtil.color.sampleGradientColor(_local3891.add.SoCo.Clr.v);
			_local3890.data = {
				a: ActionTypes.$.SN,
				GU: "colorpicker",
				_A: _local3889.o << 16 | _local3889.J << 8 | _local3889.k,
				qF: function (j) {
					var _local3903 = PixelUtil.color.rgbColorDescriptor({
						k: j & 255,
						J: j >>> 8 & 255,
						o: j >> 16 & 255
					});
					_local3903 = {
						classID: "null",
						Clr: {
							t: "Objc",
							v: _local3903
						}
					};
					var _local3902 = new Action(ActionTypes.E.v, !0);
					_local3902.G = f.yS;
					_local3902.data = {
						a: LayerRecord.sM,
						xn: [_local3894],
						T3: !0,
						Z: {
							hA: 1,
							rU: _local3903
						}
					};
					this.dispatch(_local3902);
				}.bind(this),
				bH: !0
			};
		} else if (_local3887 == 0 && (LayerEffectsHelper.detectAdjustmentKey(_local3891.add) || _local3891.add.SoCo || _local3891.add.GdFl || _local3891.add.PtFl)) {
			_local3890.data = {
				a: ActionTypes.$.B_,
				GU: PanelTabBase.xA.uB
			};
		} else if (_local3887 != 0 && _local3887 != -1) {
			_local3890.data = {
				a: ActionTypes.$.B_,
				GU: PanelTabBase.xA.uB
			};
		} else if (_local3887 == 0 && _local3891.add.SoLd) {
			_local3892.data = {
				kT: "placedLayerEditContents",
				a0: {
					classID: "placedLayerEditContents"
				}
			};
		} else if (_local3887 == 0 && _local3891.add.TySh) {
			_local3897.G = f.zl;
			_local3897.data = {
				a: "editCurr",
				ca: _local3894
			};
		} else {
			_local3890.data = {
				a: ActionTypes.$.SN,
				GU: "layerstyle",
				j: _local3894
			};
		}
		this.dispatch(_local3892.data ? _local3892 : _local3890.data ? _local3890 : _local3897);
		return;
	}
	if (l.button != 0) return;
	if (_local3887 == 1 || _local3887 == 3) {
		var _local3899 = _local3887 == 3 ? _local3891.vZ(_local3895).z : _local3891.c3();
		_local3898 = _local3899.jv ? _local3895.u.MX.join("") == "111" ? 1 : 2 : 0;
	}
	var _local3893 = {
		a: LayerRecord.bj,
		j: _local3894,
		VY: _local3887,
		ayc: _local3898,
		St: !0
	};
	this.zh(_local3893);
};
LayerPanelRow.prototype.zh = function (l) {
	var _local3904 = new Action(ActionTypes.E.v, !0);
	_local3904.data = l;
	_local3904.G = f.yS;
	this.dispatch(_local3904);
};
LayerPanelRow.prototype.a97 = function () {
	var _local3908 = this.Qj.j,
		_local3907 = _local3908.add,
		_local3905 = this.parent.xa.b(),
		_local3906 = this.parent.fq[_local3905].b();
	if (_local3905 == 0) {
		if (_local3906[0] && _local3907.SoLd == null && _local3907.TySh == null && _local3908.Eo()) return !0;
		if (_local3906[1] && LayerEffectsHelper.detectAdjustmentKey(_local3907) != null) return !0;
		if (_local3906[2] && _local3907.TySh != null) return !0;
		if (_local3906[3] && _local3907.vstk != null) return !0;
		if (_local3906[4] && _local3907.SoLd != null) return !0;
		return !1;
	}
	if (_local3905 == 1) return _local3908.getName().toLowerCase().indexOf(_local3906.toLowerCase()) != -1;
};
LayersPanel.s0 = function (l, d, G, b, V, Q, t) {
	UIComponent.call(this);
	this.a4O = d;
	this.H8 = G;
	this.index = Q;
	this.e = s.createElement("div", "styleitem");
	this.lg = s.createElement("div", "head");
	this.afK = null;
	if (d == "f") {
		var _local3909 = this.afK = s.createElement("div", "headR");
		_local3909.textContent = "\u2699";
		this.lg.appendChild(_local3909);
	}
	this.qc = s.createElement("div", "eye gsicon");
	this.Me = s.createElement("div", "label");
	this.e.appendChild(this.lg);
	this.lg.appendChild(this.qc);
	if (t) {
		this.Pz = t;
		this.lg.appendChild(t);
		this.lg.setAttribute("style", "height: " + (26 / s.getDevicePixelRatio() + 10) + "px");
	}
	this.Me.innerHTML = l;
	this.e.setAttribute("style", "margin-left: " + (24 + b * 16 + V * 22) + "px");
	this.lg.appendChild(this.Me);
	this.qc.addEventListener("click", this.alW.bind(this), !1);
	var _local3910 = this.e;
	_local3910.setAttribute("draggable", "true");
	_local3910.addEventListener("dragstart", this.Hk.bind(this), !1);
	if (!0) {
		_local3910.addEventListener("drop", this.TR.bind(this), !1);
		_local3910.addEventListener("dragover", this.Xq.bind(this), !1);
		_local3910.addEventListener("dragenter", s.stopAndPreventHandler, !1);
		_local3910.addEventListener("dragleave", this.up.bind(this), !1);
	}
	this.e.addEventListener("click", this.Nl.bind(this), !1);
};
LayersPanel.s0.prototype = new UIComponent();
LayersPanel.s0.prototype.Hk = function (l) {
	l.stopPropagation();
	l.dataTransfer.setData("Text", JSON.stringify({
		Ts: this.a4O,
		yD: this.parent.Qj.index,
		aN: this.index
	}));
};
LayersPanel.s0.prototype.up = function (l) {
	s.stopAndPreventHandler(l);
	this.hb();
};
LayersPanel.s0.prototype.TR = function (l) {
	s.stopAndPreventHandler(l);
	this.hb();
	var _local3911 = l.dataTransfer.getData("Text");
	if (_local3911 == "") return;
	var _local3911 = JSON.parse(_local3911);
	LayerPanelRow.aiL(l, _local3911, this.parent, this.index + (LayerPanelRow.C_(l, this.lg) > .5 ? 0 : 1));
};
LayersPanel.s0.prototype.Xq = function (l) {
	s.stopAndPreventHandler(l);
	var _local3913 = LayerPanelRow.C_(l, this.lg) > .5;
	this.hb();
	var _local3912 = "border-" + (_local3913 ? "bottom" : "top");
	this.lg.style[_local3912] = "0.2em solid rgba(0,0,0,0.5)";
};
LayersPanel.s0.prototype.hb = function (l) {
	this.lg.style.border = "none";
};
LayersPanel.s0.prototype.Oj = function (l) {
	this.qc.style.opacity = l ? 1 : .2;
};
LayersPanel.s0.prototype.Nl = function (l) {
	var _local3919 = LayerPanelRow.pm,
		_local3914 = Date.now() - _local3919 < 300;
	LayerPanelRow.pm = Date.now();
	if (l.target == this.qc) return;
	var _local3918 = this.parent.Qj.index;
	if (_local3914 && this.H8 != null) {
		var _local3918 = this.parent.Qj.index,
			_local3917 = new Action(ActionTypes.E.L, !0);
		if (this.H8.indexOf("afw_") == 0) {
			var _local3916 = this.H8.slice(4),
				_local3920 = FilterEffectPanel[_local3916] || FilterHelper.d[_local3916],
				_local3915 = l.target == this.afK;
			if (!_local3915 && !_local3920) return;
			_local3917.data = f.uY.avp(_local3915 ? "blendOptions" : _local3916, {
				j: _local3918,
				index: this.index
			});
		} else _local3917.data = {
			a: ActionTypes.$.SN,
			GU: this.H8,
			j: _local3918,
			index: this.index
		};
		this.dispatch(_local3917);
	} else {
		if (l.target.className != "thumb") this.parent.zh({
			a: LayerRecord.bj,
			j: _local3918,
			VY: 0
		});
	}
};
LayersPanel.s0.prototype.alW = function (l) {
	var _local3921 = {
		fm: LayerRecord.Wj,
		f: LayerRecord.GQ,
		sm: LayerRecord.M0,
		s: LayerRecord.f0
	}[this.a4O];
	this.parent.zh({
		a: _local3921,
		j: this.parent.Qj.index,
		index: this.index
	});
};


function ActionsPanel() {
	PanelTabBase.call(this, "Actions", !1, "---panels/actions", PanelTabBase.xA.abR);
	this.mN = null;
	this.au = [0, 0];
}
ActionsPanel.prototype = new PanelTabBase("");
ActionsPanel.prototype.Eg = function () {
	if (!s.isInDocument(this.DK) || this.pa) return;
	this.pa = s.createElement("div", "padded scrollable");
	this.pa.setAttribute("style", "width:260px;  height:260px");
	this.DK.appendChild(this.pa);
	this.addListener(ActionTypes.E.A, this.bL, this);
	this.S8 = s.createElement("div", "lpfoot");
	this.DK.appendChild(this.S8);
	this.VS = [];
	var _local3380 = "<svg  class=\"miniscale gsicon\" viewBox=\"0 0 15 15\" width=\"15\" height=\"15\" fill=\"black\">",
		_local3379 = "</svg>",
		_local3374 = _local3380 + "<path d=\"M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,14 L0,16 L14,16 L14,14 Z\" />" + _local3379,
		_local3378 = _local3380 + "<path d=\"M0,0 L15,7.5 L0,15 Z\" />" + _local3379;
	this.afD = _local3380 + "<circle cx=\"7.5\" cy=\"7.5\" r=\"7.5\" />" + _local3379;
	this.aeI = _local3380 + "<path d=\"M1,1 L14,1 L14,14 L1,14 Z\" />" + _local3379;
	var _local3377 = [this.afD, _local3378, "lrs/folder", "lrs/newlayer", "lrs/bin", _local3374],
		_local3376 = [
		[15, 8, 0],
		[5, 8],
		[15, 8, 1],
		[15, 8, 2],
		[5, 4],
		[1, 2]];

	for (var _local3373 = 0; _local3373 < _local3377.length; _local3373++) {
		var _local3381 = _local3377[_local3373];
		if (1 < _local3373 && _local3373 != _local3377.length - 1) _local3381 = "<img src=\"" + PIMG[_local3377[_local3373]] + "\" class=\"miniscale gsicon\" />";
		var _local3375 = new ToolbarButton(_local3381, !1, _local3376[_local3373]);
		_local3375.addListener("click", this.a0X, this);
		this.S8.appendChild(_local3375.e);
		this.VS.push(_local3375);
	}
	this.VP();
};
ActionsPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	if (this.pa == null) return;
	for (var _local3382 = 0; _local3382 < this.VS.length; _local3382++) this.VS[_local3382].refresh();
};
ActionsPanel.prototype.a0X = function (l) {
	var _local3383 = this.VS.indexOf(l.currentTarget),
		_local3390 = this.au,
		_local3384 = this.mN,
		_local3389 = _local3384.rJ;
	if (_local3383 == 0) {
		var _local3388,_local3387 = _local3384.X4;
		if (_local3389.length == 0) {
			alert("Create an Action Set first.");
			return;
		}
		if (_local3390.length < 2) {
			alert("Select a target action first.");
			return;
		}
		if (_local3387 == null) {
			_local3388 = this.aeI;
			_local3387 = this.au;
		} else {
			_local3388 = this.afD;
			_local3387 = null;
		}
		this.VS[0].setLabel(_local3388);
		_local3384.X4 = _local3387;
	} else if (_local3383 == 1) this.are();else
	if (_local3383 == 2 || _local3383 == 3) {
		var _local3392 = {
			Il: "Action Set " + _local3389.length,
			Vm: [],
			exp: !0
		};
		if (_local3383 == 2 || _local3389.length == 0) {
			_local3390 = [_local3389.length];
			_local3389.push(_local3392);
		}
		if (_local3383 == 3) {
			var _local3385 = _local3389[_local3390[0]].Vm;
			_local3390 = [_local3390[0], _local3385.length];
			_local3385.push({
				Il: "Action " + _local3385.length,
				color: 0,
				Vm: [],
				a0c: !1,
				shift: !1,
				exp: !0,
				sy: _local3385.length
			});
		}
		this.au = _local3390;
		this.VP();
	} else if (_local3383 == 4) {
		var _local3393;
		if (_local3390.length == 1) _local3393 = _local3389;else
		if (_local3390.length == 2) _local3393 = _local3389[_local3390[0]].Vm;else
		_local3393 = _local3389[_local3390[0]].Vm[_local3390[1]].Vm;
		var _local3391 = _local3390.length - 1;
		_local3393.splice(_local3390[_local3391], 1);
		if (_local3393.length == 0) _local3390.pop();else

		while (_local3390[_local3391] >= _local3393.length) _local3390[_local3391]--;
		if (_local3390.length == 0) _local3390.push(0);
		this.VP();
	} else if (_local3383 == 5) {
		if (_local3389.length == 0) {
			alert("No Actions Present.");
			return;
		}
		var _local3386 = new Action(ActionTypes.E.L, !0);
		_local3386.data = {
			a: ActionTypes.$.Bs,
			abe: PsdResourceTypes.v,
			yD: _local3390[0]
		};
		this.dispatch(_local3386);
	}
};
ActionsPanel.prototype.bL = function (l) {
	var _local3397 = this.mN.rJ,
		_local3394 = l.data.a,
		_local3396 = l.data.Ow;
	if (_local3394 == "sel") this.au = _local3396;
	if (_local3394 == "fold") {
		if (_local3396.length == 1) _local3397[_local3396[0]].exp = !_local3397[_local3396[0]].exp;else
		_local3397[_local3396[0]].Vm[_local3396[1]].exp = !_local3397[_local3396[0]].Vm[_local3396[1]].exp;
	}
	if (_local3394 == "enab") {
		var _local3395 = _local3397[_local3396[0]].Vm[_local3396[1]].Vm[_local3396[2]];
		_local3395.p = !_local3395.p;
	}
	if (_local3394 == "nchange") {
		if (_local3396.length == 1) _local3397[_local3396[0]].Il = l.data.Xu;else
		_local3397[_local3396[0]].Vm[_local3396[1]].Il = l.data.Xu;
	}
	this.VP();
};
ActionsPanel.prototype.Yw = ActionsPanel.prototype.KN = function () {
	this.Eg();
};
ActionsPanel.prototype.BM = function (l, d) {
	this.mN = l;
	if (this.pa == null) return;
	if (d == PsdResourceTypes.v || d == PsdResourceTypes.Wx) this.VP();
};
ActionsPanel.prototype.VP = function () {
	if (this.mN == null) return;
	s.clearChildren(this.pa);
	var _local3405 = this.mN.rJ;
	if (_local3405.length == 0) return;
	var _local3404 = JSON.stringify(this.au);
	for (var _local3398 = 0; _local3398 < _local3405.length; _local3398++) {
		var _local3399 = _local3405[_local3398],
			_local3403 = new ActionsPanel.$X([_local3398], _local3404, _local3399.exp, _local3399.Il.split("=").pop());
		_local3403.parent = this;
		this.pa.appendChild(_local3403.e);
		if (!_local3399.exp) continue;
		for (var _local3402 = 0; _local3402 < _local3399.Vm.length; _local3402++) {
			var _local3401 = _local3399.Vm[_local3402],
				_local3403 = new ActionsPanel.$X([_local3398, _local3402], _local3404, _local3401.exp, _local3401.Il.split("=").pop());
			_local3403.parent = this;
			this.pa.appendChild(_local3403.e);
			if (!_local3401.exp) continue;
			for (var _local3406 = 0; _local3406 < _local3401.Vm.length; _local3406++) {
				var _local3400 = _local3401.Vm[_local3406],
					_local3403 = new ActionsPanel.$X([_local3398, _local3402, _local3406], _local3404, null, languageManager.get(PsdDescriptorHelper.ahE(_local3400)), _local3400.p);
				_local3403.parent = this;
				this.pa.appendChild(_local3403.e);
			}
		}
	}
};
ActionsPanel.prototype.are = function () {
	var _local3411 = this.mN.rJ,
		_local3410 = this.au;
	if (_local3411.length == 0) {
		alert("No Actions Present");
		return;
	}
	if (_local3410.length == 1) {
		alert("Select an Action first");
		return;
	}
	if (this.mN.X4 != null) {
		alert("You can not apply actions while recording actions");
		return;
	}
	if (_local3410.length == 1) _local3410.push(0);
	var _local3407 = _local3411[_local3410[0]],
		_local3409 = _local3407.Vm[_local3410[1]],
		_local3408 = new Action(ActionTypes.E.L, !0);
	_local3408.data = {
		a: ActionTypes.$.du,
		X9: [_local3409.Il, _local3407.Il]
	};
	this.dispatch(_local3408);
};
ActionsPanel.$X = function (l, d, G, b, V) {
	UIComponent.call(this);
	this.Ow = l;
	var _local3414 = this.Ow.length - 1;
	this.e = s.createElement("div", "layeritem" + (JSON.stringify(l) == d ? " selected" : ""));
	this.lg = s.createElement("div", "head");
	this.e.appendChild(this.lg);
	this.lg.setAttribute("style", "height:24px");
	this.Ld = s.createElement("div", "headL");
	this.lg.appendChild(this.Ld);
	if (_local3414 != 0) {
		var _local3416 = s.createElement("div");
		_local3416.style.width = _local3414 * 20 + "px";
		this.Ld.appendChild(_local3416);
	}
	if (G != null) {
		var _local3412 = this.avf = s.createElement("div", G ? "open" : "closed");
		this.Ld.appendChild(_local3412);
	} else {
		var _local3417 = this.a3L = s.createElement("div", "cmark");
		_local3417.setAttribute("style", "background-size:12px 12px; opacity:" + (V ? 1 : .3));
		this.Ld.appendChild(_local3417);
	}
	if (_local3414 == 0) {
		var _local3415 = s.createElement("div", "folder");
		this.Ld.appendChild(_local3415);
	}
	var _local3413 = this.c1 = s.createElement("div", "label");
	_local3413.textContent = b;
	this.Ld.appendChild(_local3413);
	this.e.addEventListener("mouseup", this.O5.bind(this), !1);
};
ActionsPanel.$X.prototype = new UIComponent();
ActionsPanel.$X.prototype.O5 = function (l) {
	if (l.detail == 1 && l.target.tagName.toLowerCase() != "input") {
		var _local3420 = "sel";
		if (l.target == this.avf) _local3420 = "fold";
		if (l.target == this.a3L) _local3420 = "enab";
		var _local3418 = new Action(ActionTypes.E.A, !0);
		_local3418.data = {
			a: _local3420,
			Ow: this.Ow
		};
		this.dispatch(_local3418);
	} else if (this.Ow.length < 3) var _local3419 = new PanelTabBase.di(this.c1, this.sd.bind(this));
};
ActionsPanel.$X.prototype.sd = function (l) {
	var _local3421 = new Action(ActionTypes.E.A, !0);
	_local3421.data = {
		a: "nchange",
		Xu: l,
		Ow: this.Ow
	};
	this.dispatch(_local3421);
};

function AdjustmentsPanel() {
	PanelTabBase.call(this, "Adjustments", !1, "---lrs/adj", PanelTabBase.xA.auV);
}
AdjustmentsPanel.prototype = new PanelTabBase("");
AdjustmentsPanel.prototype.Eg = function () {
	if (!s.isInDocument(this.DK) || this.VS) return;
	this.DK.setAttribute("style", "text-align:center;  padding:6px; min-width:220px");
	this.VS = [];
	var _local3422 = 0;
	for (var _local3424 in LayerEffectsHelper.names) {
		var _local3423 = new ToolbarButton("<img src=\"" + PIMG["adj/" + _local3424] + "\" class=\"autoscale gsicon\" style=\"margin:4px 4px;\"/>", !1, LayerEffectsHelper.names[_local3424]);
		_local3423.addListener("click", this.adx, this);
		this.VS.push(_local3423);
		this.DK.appendChild(_local3423.e);
		if (_local3422 == 4 || _local3422 == 10) s.appendBr(this.DK);
		_local3422++;
	}
	this.refresh();
};
AdjustmentsPanel.prototype.Yw = function () {
	this.Eg();
};
AdjustmentsPanel.prototype.KN = function () {
	this.Eg();
};
AdjustmentsPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	if (this.VS == null) return;
	for (var _local3425 = 0; _local3425 < this.VS.length; _local3425++) this.VS[_local3425].refresh();
};
AdjustmentsPanel.prototype.adx = function (l) {
	var _local3428 = this.VS.indexOf(l.target),
		_local3426 = LayerStyleDialog.ye()[_local3428],
		_local3427 = new Action(_local3426.Y, !0);
	_local3427.data = _local3426.W;
	this.dispatch(_local3427);
};


function StylePanel() {
	PanelTabBase.call(this, "Style", !1, null, PanelTabBase.xA.G9);
	this.pa = s.createElement("div", "padded");
	this.mN = null;
	this.DK.appendChild(this.pa);
	this.aF = new PatternPickerWide(null, 17.7, 10);
	this.aF.parent = this;
	this.aF.addListener(ActionTypes.E.A, this.Q3, this);
	this.pa.appendChild(this.aF.Sc);
}
StylePanel.prototype = new PanelTabBase("");
StylePanel.prototype.Q3 = function (l) {
	var _local3430 = this.aF.b(),
		_local3429 = new Action(ActionTypes.E.v, !0);
	_local3429.data = {
		a: "setstl",
		Z: _local3430.x1
	};
	_local3429.G = f.LY;
	this.dispatch(_local3429);
	_local3429.data = {
		a: "confirm"
	};
	this.dispatch(_local3429);
};
StylePanel.prototype.BM = function (l, d) {
	this.mN = l;
	this.VP();
};
StylePanel.prototype.VP = function () {
	var _local3431 = this.mN;
	if (_local3431 == null) return;
	this.aF.Z2([_local3431.Pr, _local3431._N]);
};
StylePanel.prototype.Yw = function () {
	this.VP();
};
StylePanel.prototype.KN = function () {
	this.VP();
};


function PluginTabPanel(l, d) {
	PanelTabBase.call(this, l.name, !1, l.icon, d);
	this.az4 = l;
}
PluginTabPanel.prototype = new PanelTabBase("");
PluginTabPanel.prototype.Eg = function () {
	var _local4362 = this.DK,
		_local4361 = this.az4;
	if (!s.isInDocument(_local4362) || this.SE) return;
	var _local4360 = this.SE = s.createElement("iframe");
	_local4360.setAttribute("src", _local4361.url);
	this.DK.appendChild(_local4360);
};
PluginTabPanel.prototype.KN = PluginTabPanel.prototype.Yw = function () {
	this.Eg();
};
PluginTabPanel.prototype.em = function (l) {
	if (s.isInDocument(this.SE)) this.SE.contentWindow.postMessage(l, "*");
};
PluginTabPanel.prototype.resize = function (l, d) {
	if (this.SE == null) return;
	this.SE.setAttribute("style", "width:" + l + "px; height:" + d + "px");
};

function ToolPresetsPanel() {
	PanelTabBase.call(this, "Tool Presets", !1, "---panels/tpreset", PanelTabBase.xA.qa);
	this.mN = null;
	this.Fd = new ToolPresetButton(f.CV);
	this.Fd.parent = this;
	var _local4363 = s.createElement("div", "padded");
	_local4363.setAttribute("style", "width:20em");
	this.DK.appendChild(_local4363);
	_local4363.appendChild(this.Fd.Sc);
}
ToolPresetsPanel.prototype = new PanelTabBase("");
ToolPresetsPanel.prototype.KN = function () {
	this.Fd.Z2(this.mN.UL);
};
ToolPresetsPanel.prototype.BM = function (l, d) {
	this.mN = l;
	if (d == PsdResourceTypes.Wx || d == PsdResourceTypes.qa) this.Fd.Z2(l.UL);
};
ToolPresetsPanel.prototype.resize = function (l, d) {
	this.Fd.ajv(this.mN.QN);
};
ToolPresetsPanel.prototype.refresh = function () {
	PanelTabBase.prototype.refresh.call(this);
	this.Fd.refresh();
};



var MemoryPanel = function () {
	var _local4373 = [],
		_local4371 = null,
		_local4364 = null,
		_local4370 = null,
		_local4369 = [
		[100, 180, 255],
		[100, 255, 100],
		[255, 200, 100],
		[200, 100, 255],
		[255, 100, 200]];


	function _local4367() {
		PanelTabBase.call(this, "Memory", !1, null, PanelTabBase.xA.al6);
		var _local4376 = s.createElement("div", "padded");
		this.DK.appendChild(_local4376);
		_local4364 = new ToolbarButton("<< Back", !1, null, !0);
		_local4364.addEventListener("click", function (n) {
			_local4373.pop();
			_local4365();
		});
		_local4376.appendChild(_local4364.e);
		_local4371 = s.createElement("div", "scrollable");
		_local4371.setAttribute("style", "width:20em;  height:26em; margin-top:8px;");
		_local4376.appendChild(_local4371);
	}
	_local4367.prototype = new PanelTabBase("");
	_local4367.prototype.Yw = function (J, n, r) {
		_local4370 = n;
		this.KN();
	};
	_local4367.prototype.KN = function () {
		_local4364.setEnabled(!1);
		if (!s.isInDocument(_local4371)) return;
		var _local4378 = {
			MS: "Total:",
			LK: []
		};
		for (var _local4377 = 0; _local4377 < _local4370.length; _local4377++) _local4378.LK.push(_local4372(_local4370[_local4377]));
		_local4368(_local4378);
		_local4373 = [_local4378];
		_local4365();
	};
	_local4367.prototype.refresh = function () {
		PanelTabBase.prototype.refresh.call(this);
		_local4364.refresh();
	};

	function _local4374(J) {
		var _local4380 = J.currentTarget,
			_local4379 = 0;
		while ((_local4380 = _local4380.previousSibling) != null) _local4379++;
		_local4373.push(_local4373[_local4373.length - 1].LK[_local4379 - 1]);
		_local4365();
	}

	function _local4365() {
		_local4364.setEnabled(_local4373.length > 1);
		var _local4382 = _local4373[_local4373.length - 1];
		s.clearChildren(_local4371);
		_local4375(_local4382, _local4371, 0);
		_local4382.LK.sort(function (n, r) {
			return r.E3[0] - n.E3[0];
		});
		for (var _local4381 = 0; _local4381 < _local4382.LK.length; _local4381++) _local4375(_local4382.LK[_local4381], _local4371, 1);
	}

	function _local4375(J, n, r) {
		var _local4383 = SaveForWebDialog.fa,
			_local4386 = r != 0 && J.LK,
			_local4385 = "margin-left:" + r * 10 + "px; margin-bottom:8px; padding:3px 5px;";
		if (_local4386) _local4385 += "cursor:pointer;";
		if (J.Ts != null) _local4385 += "background-color:rgba(" + _local4369[J.Ts].join(",") + ",0.2);";
		var _local4384 = s.createElement("div");
		n.appendChild(_local4384);
		_local4384.setAttribute("style", _local4385);
		_local4384.innerHTML = s.escapeHtml(J.MS) + "<br />RAM: <b>" + _local4383(J.E3[0]) + "</b>\u2001GPU: <b>" + _local4383(J.E3[1]) + "</b>";
		if (_local4386) _local4384.addEventListener("click", _local4374, !1);
	}

	function _local4372(J) {
		var _local4395 = {
				MS: J.name,
				LK: [],
				Ts: 0
			},
			_local4396 = WebGLContext.webglAvailable ? 1 : 0,
			_local4390 = 1 - _local4396,
			_local4393 = {
				MS: "Final Image",
				E3: [J.m * J.n * 4, _local4396 * J.m * J.n * 4],
				Ts: 2
			};
		_local4395.LK.push(_local4393);
		for (var _local4387 = 0; _local4387 < J.B.length; _local4387++) {
			var _local4392 = _local4366(J.B[_local4387]);
			if (_local4392.LK.length != 0) _local4395.LK.push(_local4392);
		}
		var _local4391 = J.add.lnk2;
		if (_local4391)
		for (var _local4387 = 0; _local4387 < _local4391.length; _local4387++) {
			var _local4392 = _local4391[_local4387],
				_local4394 = {
					MS: _local4392.bf,
					LK: [],
					Ts: 4
				},
				_local4389 = 0;
			_local4394.LK.push({
				MS: "Raw file",
				E3: [_local4392.raw.length, 0]
			});
			if (_local4392.hF)
			for (var _local4388 = 0; _local4388 < _local4392.hF.length; _local4388 += 2) _local4389 += _local4392.hF[_local4388].length;
			if (_local4389 != 0) _local4394.LK.push({
				MS: "Decoded pixels",
				E3: [_local4389, 0]
			});
			_local4368(_local4394);
			_local4395.LK.push(_local4394);
		}
		_local4368(_local4395);
		return _local4395;
	}

	function _local4366(J) {
		var _local4406 = {
				MS: J.getName(),
				LK: [],
				Ts: 1
			},
			_local4408 = WebGLContext.webglAvailable ? 1 : 0,
			_local4400 = 1 - _local4408,
			_local4404 = J.rect.O();
		if (_local4404 != 0) _local4406.LK.push({
			MS: "Layer pixels",
			E3: [_local4404 * 4, _local4408 * _local4404 * 4]
		});
		if (J.add.lmfx && J.hD.Pr.type) {
			var _local4403 = J.hD.Pr.type,
				_local4397 = 0;
			for (var _local4402 in _local4403) {
				var _local4405 = 0;
				for (var _local4398 = 0; _local4398 < _local4403[_local4402].length; _local4398++)
				if (_local4402 == "ebbl") {
					if (_local4403[_local4402][_local4398].Ei) _local4405 += _local4403[_local4402][_local4398].Ei.We.O();
					if (_local4403[_local4402][_local4398].p9) _local4405 += _local4403[_local4402][_local4398].p9.We.O();
					if (_local4403[_local4402][_local4398].l2) _local4405 += _local4403[_local4402][_local4398].l2.We.O();
					if (_local4403[_local4402][_local4398].gp) _local4405 += _local4403[_local4402][_local4398].gp.We.O();
				} else _local4405 += _local4403[_local4402][_local4398].We.O();
				if (_local4405 != 0) _local4406.LK.push({
					MS: languageManager.get(LayerStyleConstants.effectDisplayNames[LayerStyleConstants.effectOrder.indexOf(_local4402)]),
					E3: [_local4400 * _local4405 * 4, _local4408 * _local4405 * 4],
					Ts: 3
				});
			}
			if (J.hD.VK) _local4397 += _local4404;
			if (J.hD.GA) _local4397 += _local4404;
			if (J.hD.Vn) _local4397 += _local4404;
			if (J.hD.Vn) _local4397 += _local4404;
			if (J.hD.me) _local4397 += _local4404;
			if (J.hD.dO) _local4397 += _local4404;
			var _local4407 = J.hD.tw ? J.hD.tw.length : 0;
			if (_local4397 + _local4407 != 0) _local4406.LK.push({
				MS: "Additional Blending Data",
				E3: [_local4400 * _local4397 * 4 + _local4407, _local4408 * _local4397 * 4]
			});
		}
		var _local4399 = J.c3(),
			_local4401 = _local4399 ? _local4399.rect.O() : 0;
		if (_local4401 != 0) {
			_local4406.LK.push({
				MS: "Raster Mask",
				E3: [_local4401, 0]
			});
		}
		var _local4399 = J.add.vmsk,
			_local4401 = _local4399 && _local4399.UG ? _local4399.UG.rect.O() : 0;
		if (_local4401 != 0) {
			_local4406.LK.push({
				MS: "Vector Mask",
				E3: [_local4401, 0]
			});
		}
		_local4368(_local4406);
		return _local4406;
	}

	function _local4368(J) {
		J.E3 = [0, 0];
		for (var _local4409 = 0; _local4409 < J.LK.length; _local4409++) {
			J.E3[0] += J.LK[_local4409].E3[0];
			J.E3[1] += J.LK[_local4409].E3[1];
		}
	}
	return _local4367;
}();


function ConfigBar() {
	UIComponent.call(this);
	this.e = s.createElement("div", "confbar");
}
ConfigBar.prototype = new UIComponent();
ConfigBar.prototype.ajt = function (l) {
	l.parent = this;
	s.clearChildren(this.e);
	this.e.appendChild(l.e);
};



function PanelListContainer() {
	UIComponent.call(this);
	this.mN = null;
	this.rD = PanelListContainer.Ho;
	this.akd = "";
	this.e = s.createElement("div", "rightbar");
	this.Z8 = [new VerticalSidebarColumn(300), new VerticalSidebarColumn(268, !0)];
	this.xY = [new PanelContainer, new PanelContainer, new PanelContainer, new PanelContainer, new PanelContainer, new PanelContainer, new PanelContainer];
	this.aa6 = []
}
PanelListContainer.prototype = new UIComponent;
PanelListContainer.prototype.refresh = function() {
	var l = this.rD;
	// for (var A = 0; A < l.length; A++) l[A].A3.refresh(); // hbi
};
// hbi: disabled
PanelListContainer.Ho = [{
	A3: new ActionsPanel,
	Ju: 3
}, {
	A3: new AdjustmentsPanel,
	Ju: 1
}, {
	A3: new BrushPanel,
	Ju: 4
}, {
	A3: new ChannelsPanel,
	Ju: 2
}, {
	A3: new CharacterParagraphPanel(!0),
	Ju: 5
}, {
	A3: new ColorPanel,
	Ju: 0
}, {
	A3: new GlyphsPanel,
	Ju: 5
}, {
	A3: new HistogramPanel,
	Ju: 3
}, {
	A3: new HistoryPanel,
	Ju: 0
}, {
	A3: new InfoPanel,
	Ju: 3
}, {
	A3: new LayersPanel,
	Ju: 2
}, {
	A3: new LayerCompsPanel,
	Ju: 4
}, {
	A3: new NavigatorPanel,
	Ju: 3
}, {
	A3: new NotesPanel,
	Ju: 5
}, {
	A3: new CharacterParagraphPanel(!1),
	Ju: 5
}, {
	A3: new PathsPanel,
	Ju: 2
}, {
	A3: new PropertiesPanel,
	Ju: 3
}, {
	A3: new StylePanel,
	Ju: 1
}, {
	A3: new SwatchesPanel,
	Ju: 0
}, {
	A3: new ToolPresetsPanel,
	Ju: 5
}, {
	A3: new CssPanel,
	Ju: 6,
	ME: !0
}, {
	A3: new GuideGuyPanel,
	Ju: 6,
	ME: !0
}, {
	A3: new MemoryPanel,
	Ju: 6,
	ME: !0
}];
(function() {
	var l = [{
		id: PanelTabBase.xA.aas,
		name: "Gallery",
		url: "plugins/gallery.html",
		icon: "===data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtyhvagAAAAp0Uk5TAP+mc4pfC+rILiKk3cQAAALjSURBVHic7dq/bxMxFAdwKy1HM16up4QtDCDYkv8gTIgtZWGNWMpIJKhgLAtriyrx71Lnh8/2e76c3/tOxW9olUb56Fvf3bPPOWNKlSpVqtSxPv6uIfXj1d77hOFs/bTeGc6r68UjuESCjTHPkF5dr801FrwxV1iwNS+x4MRs7a+3iNP5j5Vmxv5sEN7+fJnuwDkGHFlrB95hwLEDNxiwciDGM+Zpgw9v6vrXBxg4fr+/Lr6F54cYrNz1OtlAQK/Hf0eAI78bzPVgdRu0l40avAgblhdRCEYddKIFySS0VoJkErpRgmTO6P5nETiOPa+disBzCq5U4HMKflWB9xR8oQLfUfBSBTILA3eYReAtBWcqkHrd5ws4rOAHBX7aMCe2Ww2KwHsK6i49eHOAty94g4VPAfhJSjGNngUj7ko+0e/OYXoPMwrB+WDwcIIs4r9XQcSMxdJy/4kTEb2AJ0B3p08iChecy+NnLslboiWxtxWxIm9KFu1em6IRBbcVwcDTiHz1gUEfHXo/3QNGTYoe6FwwavQDI6bB6OryG4AMJD2v1YFMmx8UMQkyU+WgiCmQjGAU8Tx14FMgu9nkRUz0ySTIBvQipvpkEkzshrmIhxFmIvJgIqCL2NMneTC5XXeItIxenwKTAQ8RvT5JIrJgz35iGwRkInJgT0BacUQOzNrwjCMyYFZAEpEBM3dk21NgZsC4CVEwe8u47QeZPpgVkYCCPe2mD8weQVuLHlC06d6kQcEIRhEjUPitQJsCP8s8P2IIMvetuREDUHSIo4gBqPhepeVARcAuogdW4hG01VDwi8ZzETtQF9CtwjtQGfAYsQPVX501ISi+SLpaB6ByBG21AYioNRps0aA90FiwQYOPEcFggwbrBRps0GBdwAIW8AmBW6w3la8z+Zrhn7e5woIt/pkl4d1JqlbqpWFYs40xf5GgfdZtvMV50zvVLRSt1/ul8QPqccF4X7tUqVKl/uf6BxTPzN+MDvNvAAAAAElFTkSuQmCC"
	}];
	for (var A = 0; A < l.length; A++) {
		PanelListContainer.Ho.push({
			A3: new PluginTabPanel(l[A], 100 + A),
			Ju: 6,
			ME: !0
		})
	}
}());
PanelListContainer.prototype.ak7 = function(l) {
	for (var A = 0; A < l.length; A++) {
		var d = l[A],
			G = new PluginTabPanel(d, "plg_" + d.name);
		this.rD.push({
			A3: G,
			Ju: 6
		});
		this.aa6.push(G.kR)
	}
	this.VP()
};
PanelListContainer.prototype.BM = function(l, d) {
	this.mN = l;
	var G = this.rD;
	// hbi
	// for (var A = 0; A < G.length; A++) G[A].A3.BM(l, d);
	if (d == PsdResourceTypes.X2 || d == PsdResourceTypes.Wx) this.VP()
};
PanelListContainer.prototype.em = function(l) {
	var d = this.rD;
	// hbi
	// for (var A = 0; A < d.length; A++) d[A].A3.em(l)
};
PanelListContainer.prototype.resize = function(l, d) {
	this.iJ = l;
	this.Tq = d;
	this.VP();
	this.Z8[0].resize(l, d);
	this.Z8[1].resize(l, d)
};
PanelListContainer.prototype.VP = function() {
	var l = this.mN,
		d = this.iJ,
		G = this.Tq;
	if (l == null || d == 0) return;
	var b = l.J_.concat(this.aa6),
		V = d < 500 || d < 700 && d < G,
		Q = JSON.stringify(b) + "," + V;
	if (Q != this.akd) {
		this.akd = Q;
		s.clearChildren(this.e);
		var t = [];
		for (var A = 0; A < this.Z8.length; A++) {
			var I = this.Z8[A];
			t[A] = I.TL();
			while (I.aoj() != 0) I.akg(0);
			I.sS()
		}
		var y = [];
		for (var A = 0; A < this.xY.length; A++) {
			var e = this.xY[A];
			e.sS();
			while (e.a5B() != 0) e.cd(0);
			y.push(0)
		}
		for (var A = 0; A < b.length; A++) {
			var M = this.abu(b[A].toString());
			if (M == null) continue;
			this.xY[M.Ju].$J(M.A3);
			this.xY[M.Ju].AT(0);
			y[M.Ju]++
		}
		var R = [];
		for (var A = 0; A < y.length; A++) {
			if (y[A] == 0) continue;
			var J = A < 3 || V ? 1 : 0,
				I = this.Z8[J];
			I.parent = this;
			I.ayf(this.xY[A]);
			R[J] = !0
		}
		for (var A = 0; A < this.Z8.length; A++)
			if (R[A]) this.e.appendChild(this.Z8[A].e);
		this.Z8[0].collapse();
		if (d < 700 || this.mN.compact || !t[1]) {
			this.Z8[1].collapse()
		}
		var n = new Action(ActionTypes.E.L, !0);
		n.data = {
			a: ActionTypes.$.to
		};
		this.dispatch(n)
	}
};
PanelListContainer.prototype.abu = function(l) {
	for (var A = 0; A < this.rD.length; A++)
		if (this.rD[A].A3.kR == l) return this.rD[A]
};
PanelListContainer.prototype.aoY = function(l) {
	var d = this.abu(l);
	this.xY[d.Ju].$J(d.A3)
};
PanelListContainer.prototype.Yw = function(l, d, G) {
	var b = this.rD;
	// for (var A = 0; A < b.length; A++) b[A].A3.Yw(l, d, G); // hbi
};
PanelListContainer.prototype.dJ = function(l, d, G, b, V) {
	var Q = this.rD;
	for (var A = 0; A < Q.length; A++) Q[A].A3.dJ(l, d, G, b, V)
};
PanelListContainer.prototype.JP = function(l, d, G, b, V) {
	var Q = this.rD;
	for (var A = 0; A < Q.length; A++) Q[A].A3.JP(l, d, G, b, V)
};
PanelListContainer.prototype.Nl = function(l, d, G, b, V) {
	var Q = this.rD;
	for (var A = 0; A < Q.length; A++) Q[A].A3.Nl(l, d, G, b, V)
};



function TopBar() {
	UIComponent.call(this);
	this.e = s.createElement("div", "topbar");
	this.mJ = s.createElement("span", "");
	this.amU = 0;
	this.e.appendChild(this.mJ);
	this._B = null;
	this.cH = null;
	this.lT = [];
	this.J_ = [];
	var l = this.JO.bind(this);
	for (var A = 0; A < TopBar.data.length; A++) {
		var d = s.createElement("button");
		this.lT.push(d);
		this.mJ.appendChild(d);
		d.addEventListener("mouseover", l, !1);
		s.addPointerDown(d, l)
	}
	this.OK = new ToolbarButton([0, 13, 0], !1, null, !0);
	this.OK.addListener("click", this.Yu, this);
	this.e.appendChild(this.OK.e);
	this.rm = new ToolbarButton(s.getIconImgHtml("tools/zoom", null, "autoscale"), !1, [12, 86]);
	this.rm.addListener("click", this.Yu, this);
	this.e.appendChild(this.rm.e);
	this.U1 = new ToolbarButton("<svg class=\"gsicon\" version=\"1.1\"  width=\"20\" height=\"20\" viewBox=\"8 8 20 20\"><path d=\"m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z\"></path><path d=\"m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z\"></path><path d=\"m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z\"></path><path d=\"M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z\"></path></svg>", !1, "Fullscreen");
	this.U1.addListener("click", this.Yu, this);
	this.e.appendChild(this.U1.e)
}
TopBar.prototype = new UIComponent;
TopBar.prototype.aA8 = function() {
	if (this.J_.length != 0) return;
	for (var A = 0; A < TopBar.data.length; A++) {
		var l = TopBar.data[A],
			d = new ContextPanel(l.items, l.iD);
		d.parent = this;
		this.J_.push(d)
	}
	this.refresh()
};
TopBar.prototype.refresh = function() {
	this.OK.refresh();
	this.rm.refresh();
	this.U1.refresh();
	for (var A = 0; A < this.lT.length; A++) this.lT[A].textContent = languageManager.get(TopBar.data[A].name);
	this.afC();
	for (var A = 0; A < this.J_.length; A++) this.J_[A].refresh()
};
TopBar.prototype.Yu = function(l) {
	var d = new Action(ActionTypes.E.L, !0);
	if (l.target == this.OK) d.data = {
		a: ActionTypes.$.SN,
		GU: "account"
	};
	else if (l.target == this.rm) d.data = {
		a: ActionTypes.$.V7
	};
	else d.data = {
		a: ActionTypes.$.Mc,
		Xs: !0
	};
	this.dispatch(d)
};
TopBar.prototype.aef = function(l, d) {
	this._B = l;
	this.cH = d
};
TopBar.prototype.BM = function(l, d) {
	this.cH = l;
	if (d == PsdResourceTypes.Wx) {
		var G = l.ae2;
		s.clearChildren(this.mJ);
		for (var A = 0; A < this.lT.length; A++) {
			if (G == null || G[A] == 1 || G[A] instanceof Array) this.mJ.appendChild(this.lT[A]);
			if (G != null && G[A] instanceof Array) {
				this.aA8();
				this.J_[A].avV(G[A])
			}
		}
		this.e.removeChild(this.OK.e);
		this.e.removeChild(this.rm.e);
		this.e.removeChild(this.U1.e);
		if (l.ki) this.e.appendChild(this.OK.e);
		this.e.appendChild(this.rm.e);
		this.e.appendChild(this.U1.e)
	}
	this.afC()
};
TopBar.prototype.afC = function(l, d) {
	var G = this.OK,
		b = 12255232;
	if (premiumSession.getCurrentUserRecord()) b = premiumSession.hasActiveEntitlement() ? 43520 : 16755200;
	G.e.setAttribute("style", "color:#ffffff; background-color:#" + PixelUtil.intToHex6(b))
};
TopBar.prototype.JO = function(l) {
	this.aA8();
	var A = this.lT.indexOf(l.currentTarget),
		d = this.J_[A];
	if (l.type == "mouseover" && !s.isInDocument(this.J_[this.amU].e)) return;
	if (s.isInDocument(d.e)) return;
	l.al8 = !0;
	this.amU = A;
	for (var A = 0; A < TopBar.data.length; A++) this.J_[A].update(this._B, this.cH);
	var G = l.target.getBoundingClientRect(),
		b = new Action(ActionTypes.E.L, !0);
	b.data = {
		a: ActionTypes.$.dY,
		A3: d,
		x: G.left,
		y: G.top + G.height + 2,
		amW: !0
	};
	this.dispatch(b)
};
TopBar.aj2 = function(l) {
	var d = KeyboardHandler,
		G = d.wz,
		b = d.Zz,
		V = d.Jm,
		Q = function(e) {
			return {
				p: e != null
			}
		},
		t = function(e) {
			return {
				p: e != null && e.P != null
			}
		},
		I = {
			name: [0, 5],
			items: [{
				name: [7, 0],
				p: Q,
				C0: [G, d.$]
			}, {
				name: [7, 1],
				C0: [G, d.HM],
				p: t
			}, {
				name: [7, 2],
				C0: [b, G, d.wo],
				p: t,
				xX: !0
			}, {
				name: [7, 8],
				p: Q,
				pR: !0
			}, {
				name: [7, 13],
				pR: !0,
				p: function(e) {
					return {
						p: e != null && e.g.length != 0 && !e.B[e.g[0]].rect.W6()
					}
				},
				xX: !0
			}, {
				name: [7, 11],
				pR: !0,
				p: function(e) {
					return {
						p: e != null && e.g.length != 0 && !e.B[e.g[0]].rect.W6()
					}
				}
			}, {
				name: [7, 3],
				p: Q,
				xX: !0,
				sub: [{
					name: [7, 9],
					pR: !0,
					p: t
				}, {
					name: [19, 3, 0],
					pR: !0,
					p: t
				}, {
					name: [7, 4],
					pR: !0,
					p: t
				}, {
					name: [7, 5],
					pR: !0,
					p: t
				}, {
					name: [7, 6],
					pR: !0,
					p: t,
					C0: "Shift+F6"
				}]
			}, {
				name: "Grow",
				p: t
			}, {
				name: "Similar",
				p: t,
				xX: !0
			}, {
				name: [7, 10],
				p: t,
				xX: !0
			}, {
				name: [6, 6, 1],
				p: function(e) {
					return {
						p: e != null,
						Zj: e != null && e.kg() != null
					}
				},
				C0: [d.og],
				xX: !0
			}, {
				name: ["VAR0 VAR1", [1, 2],
					[17, 2]
				],
				p: t
			}],
			iD: [{
				Y: ActionTypes.E.g5,
				W: f.GS.Cc(!0)
			}, {
				Y: ActionTypes.E.g5,
				W: f.GS.Cc()
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "inverse"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "crange"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "magiccut"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "redge"
				}
			}, {
				sub: [{
					Y: ActionTypes.E.L,
					W: {
						a: ActionTypes.$.SN,
						GU: "sel_border"
					}
				}, {
					Y: ActionTypes.E.L,
					W: {
						a: ActionTypes.$.SN,
						GU: "sel_smoothness"
					}
				}, {
					Y: ActionTypes.E.L,
					W: {
						a: ActionTypes.$.SN,
						GU: "sel_expand"
					}
				}, {
					Y: ActionTypes.E.L,
					W: {
						a: ActionTypes.$.SN,
						GU: "sel_contract"
					}
				}, {
					Y: ActionTypes.E.L,
					W: {
						a: ActionTypes.$.SN,
						GU: "sel_feather"
					}
				}]
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "grow",
					a0: {
						classID: "null",
						null: {
							t: "obj ",
							v: [{
								t: "prop",
								v: {
									classID: "Chnl",
									keyID: "fsel"
								}
							}]
						}
					}
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "similar",
					a0: {
						classID: "null",
						null: {
							t: "obj ",
							v: [{
								t: "prop",
								v: {
									classID: "Chnl",
									keyID: "fsel"
								}
							}]
						}
					}
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.yb,
					G: f.tr
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.Da,
				W: {
					a: "qmask"
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "duplicate",
					a0: {
						classID: "null",
						null: {
							t: "obj ",
							v: [{
								t: "prop",
								v: {
									classID: "Chnl",
									keyID: "fsel"
								}
							}]
						}
					}
				}
			}]
		};
	if (l) {
		var y = I.items.length - 1;
		I.items.splice(y - 2, 0, {
			name: [6, 49],
			C0: [G, d.Ns],
			xX: !0
		});
		I.iD.splice(y - 2, 0, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "copyToLayer"
			}
		});
		I.items.splice(y - 1, 0, {
			name: [10, 16],
			C0: [V, G, d.hD]
		});
		I.iD.splice(y - 1, 0, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.yb,
				G: f.qK
			}
		})
	}
	return I
};
TopBar.oc = function(l, d) {
	if (l == null || l.g.length == 0) return !1;
	var G = l.B[l.g[0]];
	return G.add.TySh != null && d.QN == f.zl
};
TopBar.ade = function() {
	var l = KeyboardHandler,
		d = l.wz,
		G = l.Zz,
		b = l.Jm,
		V = function(Q) {
			return {
				p: Q != null
			}
		};
	return [
		[{
			name: [5, 0],
			C0: [d, l.QD],
			p: function(Q, t) {
				return {
					p: Q != null && (Q.P9() || TopBar.oc(Q, t))
				}
			}
		}, {
			name: [5, 1],
			C0: [d, l.nA],
			p: V
		}, {
			name: [5, 2],
			C0: [d, l.AR],
			p: function(Q, t) {
				return {
					p: TopBar.oc() || s.hasClipboardSupport() || t.wH != null || t.C6 != null || t.arv != null
				}
			}
		}, {
			name: [2, 2],
			p: function(Q, t) {
				return {
					p: Q != null && (Q.P != null || TopBar.oc(Q, t))
				}
			},
			C0: "Delete",
			xX: !0
		}],
		[{
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.Yq
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.n4
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.EZ
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "delete"
			}
		}]
	]
};
TopBar.data = function() {
	var l = KeyboardHandler,
		d = l.wz,
		G = l.Zz,
		b = l.Jm,
		V = function(n) {
			return {
				p: n != null && n.g.length != 0
			}
		},
		Q = function(n) {
			return {
				p: n != null && n.g.length != 0 && n.B[n.g[0]].add.SoLd != null
			}
		},
		t = function(n) {
			return {
				p: n != null
			}
		},
		I = function(n) {
			return {
				p: n != null && n.T8(!1)
			}
		},
		y = [],
		e = [],
		M = "none maxx avrg medn minn rang stdv summ vari".split(" "),
		R = [
			[22, 5, 0],
			[24, 17, 2],
			[24, 3, 0],
			[24, 7, 3],
			[24, 17, 3],
			[12, 12], "Standard Deviation", "Summation", "Variance"
		];
	for (var A = 0; A < M.length; A++) {
		y.push({
			name: R[A],
			p: function(n, r) {
				if (n == null || n.g.length != 1) return {
					p: !1
				};
				var T = n.B[n.g[0]].add.SoLd;
				if (T == null) return {
					p: !1
				};
				return {
					p: !0,
					Zj: T.Impr.v.classID == this.alz
				}
			}.bind({
				alz: M[A]
			})
		});
		e.push({
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.OF,
				mz: M[A]
			}
		})
	}
	// hbi: Menu
	var J = TopBar.ade(!0);
	return [{
		name: "File",
		items: [{
			name: "New",
			C0: [b, d, l.q5],
			title: "New Project",
			pR: !0
		}, {
			name: "Open",
			C0: [d, l.vc],
			pR: !0
		}, {
			name: "Open & Place",
			pR: !0,
			p: t
		}, {
			name: "Open More",
			xX: !0,
			sub: [{
				name: "Storage",
				pR: !0,
				C0: [b, d, l.vc]
			}, {
				name: "Open from URL",
				pR: !0
			}, {
				name: "Take a picture",
				pR: !0
			}, {
				name: "PSD Templates",
				pR: !0
			}]
		}, {
			name: "Publish  Online",
			xX: !0,
			p: t,
			sub: [{
				name: "PNG",
				C0: "Imgur.com",
				p: function(n, r) {
					return {
						p: n != null && r.N_
					}
				}
			}, {
				name: "JPG",
				C0: "Imgur.com",
				p: function(n, r) {
					return {
						p: n != null && r.N_
					}
				}
			}, {
				name: "PSD",
				C0: "Photopea.com",
				p: function(n, r) {
					return {
						p: n != null && r.N_ && !n.vs
					}
				}
			}]
		}, {
			name: "Save ...",
			C0: [d, l.kC],
			p: function(n, r) {
				var T = "Save",
					j = !0;
				if (n) {
					if (n.Ta) T += " (Smart Object)";
					if (n.yi) T += " (Google Drive)";
					if (n.O2) T += " (" + Storage.list[n.O2[0]][0] + ")";
					j = "psd jpg png gif webp svg bmp".split(" ").indexOf(n.o8) != -1
				}
				return {
					p: n != null && (n.O2 != null || n.vG != null && j || n.Ta != null || n.pb != null && n.pb.RG != null || n.yi != null || r.QR.save != null),
					iH: T
				}
			}
		}, {
			name: "Save as PSD",
			p: function(n, r) {
				return {
					p: n != null && r.N_
				}
			}
		}, {
			name: "Save More",
			p: t,
			sub: [{
				name: "PSD to Storage",
				p: function(n, r) {
					return {
						p: n != null && r.N_
					}
				}
			}, {
				name: "Save PSD/PSB",
				pR: !0,
				p: function(n, r) {
					return {
						p: n != null && r.N_
					}
				}
			}]
		}, {
			name: "Export as",
			p: t,
			sub: function() {
				var n = FormatHandler.EK(0),
					r = [];
				for (var A = 0; A < n.length; A++) r.push({
					name: n[A],
					C0: "." + n[A].toLowerCase()
				});
				r.push({
					name: [0, 14],
					sub: function() {
						var n = FormatHandler.EK(1),
							r = [];
						for (var A = 0; A < n.length; A++) r.push({
							name: n[A],
							C0: "." + n[A].toLowerCase()
						});
						return r
					}()
				});
				return r
			}()
		}, {
			name: "Print",
			pR: !0,
			p: t,
			xX: !0
		}, {
			name: "Export Layers",
			pR: !0,
			p: t
		}, {
			name: "Export Color Lookup",
			pR: !0,
			p: t,
			xX: !0
		}, {
			name: "File Info",
			pR: !0,
			p: t,
			xX: !0
		}, {
			name: "Automate",
			sub: [{
				name: "PDF Presentation",
				pR: !0
			}, {
				name: "Convert Formats",
				pR: !0
			}]
		}, {
			name: "Script"
		}],
		iD: [{
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "newproject"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.Um
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.Um,
				ar3: !0
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "storwindow",
					fz: 0
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "open_from_url"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "camera"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "res0"
				}
			}]
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.mb,
					oE: "png"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.mb,
					oE: "jpg"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.mb,
					oE: "psd"
				}
			}]
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.WD
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.a1
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "storwindow",
					fz: 1
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "savepsb"
				}
			}]
		}, {
			sub: function() {
				var n = FormatHandler.EK(0),
					r = [];
				for (var A = 0; A < n.length; A++) r.push({
					Y: ActionTypes.E.L,
					W: {
						a: ActionTypes.$.SN,
						GU: "saveforweb",
						oE: A
					}
				});
				r.push({
					sub: function() {
						var T = FormatHandler.EK(0).length,
							n = FormatHandler.EK(1),
							r = [];
						for (var A = 0; A < n.length; A++) r.push({
							Y: ActionTypes.E.L,
							W: {
								a: ActionTypes.$.SN,
								GU: "saveforweb",
								oE: T + A
							}
						});
						return r
					}()
				});
				return r
			}()
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "saveforweb",
				oE: 4,
				amJ: !0
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "eassets"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "exlut"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "finfo"
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "pdfpres"
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "cformat"
				}
			}]
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "script"
			}
		}]
	}, {
		name: "Edit",
		items: [{
			name: "Undo / Redo",
			p: t
		}, {
			name: "Step Forward",
			p: t,
			C0: [G, d, l.dr]
		}, {
			name: "Step Backward",
			p: t,
			C0: [d, l.dr],
			xX: !0
		}, {
			name: "Fade",
			C0: [G, d, l.vW],
			xX: !0,
			pR: !0,
			p: function(n, r) {
				return {
					p: FilterEffectDialog.a7h(n) && r.QN != f.qK
				}
			}
		}, J[0][0], J[0][1], {
			name: "Copy Merged",
			C0: [G, d, l.nA],
			p: function(n) {
				return {
					p: n != null && n.P9()
				}
			}
		}, J[0][2], J[0][3], {
			name: "Fill",
			p: t,
			pR: !0,
			C0: [G, l.YF]
		}, {
			name: "Stroke",
			p: t,
			pR: !0,
			xX: !0
		}, {
			name: "Content-Aware Scale",
			p: I
		}, {
			name: "Puppet Warp",
			p: function(n) {
				return {
					p: f.XR.a4t(n)
				}
			}
		}, {
			name: "Free Transform",
			p: t,
			C0: [b, d, l.hD]
		}, {
			name: "Transform",
			p: t,
			sub: TypeToolOptions.azf()
		}, {
			name: "Auto-Align",
			p: t
		}, {
			name: "Auto-Blend",
			p: t,
			xX: !0
		}, {
			name: "Define New",
			p: t,
			sub: [{
				name: "Pattern",
				p: t
			}, {
				name: "Brush",
				p: t
			}, {
				name: "Cursom Shape",
				p: function(n) {
					return {
						p: n != null && n.LW()[1].length != 0
					}
				}
			}]
		}, {
			name: "Preset Manager",
			pR: !0
		}, {
			name: "Preferences",
			pR: !0,
			C0: [d, l.TY]
		}, {
			name: "Local Storage",
			pR: !0
		}],
		iD: [{
			Y: ActionTypes.E.v,
			G: f.lv,
			W: {
				a: "h_undoredo"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.lv,
			W: {
				a: "h_stepfwd"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.lv,
			W: {
				a: "h_stepbck"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "afw_fade"
			}
		}, J[1][0], J[1][1], {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.n4,
				sW: !0
			}
		}, J[1][2], J[1][3], {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "fill"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "stroke"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.yb,
				G: f.Z5
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.WH,
			W: {
				a: "start",
				_K: "rigidTransform"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.yb,
				G: f.qK
			}
		}, {
			sub: TypeToolOptions.ala()
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "align",
				a0: {
					classID: "null",
					null: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Lyr",
								typeID: "Ordn",
								enum: "Trgt"
							}
						}]
					},
					Usng: {
						t: "enum",
						v: {
							ADSt: "ADSContent"
						}
					},
					alignToCanvas: {
						t: "bool",
						v: !1
					},
					Aply: {
						t: "enum",
						v: {
							projection: "Auto"
						}
					},
					vignette: {
						t: "bool",
						v: !1
					},
					radialDistort: {
						t: "bool",
						v: !1
					}
				}
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.ZP
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kc,
					Oo: 0
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kc,
					Oo: 1
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kc,
					Oo: 2
				}
			}]
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "pmanager"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "preferences"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "locstor"
			}
		}]
	}, {
		name: "Image",
		items: [{
			name: "Mode",
			p: t,
			xX: !0,
			sub: [{
				name: "RGB",
				p: function(n) {
					if (n == null) return {
						p: !1
					};
					return {
						Zj: n.add.fcmy == null,
						p: !0
					}
				}
			}, {
				name: "CMYK",
				p: function(n) {
					if (n == null) return {
						p: !1
					};
					return {
						Zj: n.add.fcmy != null,
						p: !0
					}
				},
				xX: !0
			}, {
				name: "Raster",
				p: function(n) {
					if (n == null) return {
						p: !1
					};
					return {
						Zj: n.add.fvec == null,
						p: !0
					}
				}
			}, {
				name: "Vector (Beta)",
				p: function(n) {
					if (n == null) return {
						p: !1
					};
					return {
						Zj: n.add.fvec != null,
						p: !0
					}
				}
			}]
		}, {
			name: "Adjustments",
			p: t,
			xX: !0,
			sub: function() {
				var n = [];
				for (var r in LayerEffectsHelper.names) {
					n.push({
						name: LayerEffectsHelper.names[r],
						pR: FilterEffectPanel[r] != null,
						C0: LayerEffectsHelper.keys[r],
						xX: LayerEffectsHelper.advancedAdjustmentKeys.indexOf(r) != -1
					});
					if (r == "selc") {
						n.push({
							name: "Shadows/Highlights",
							pR: !0,
							xX: !0
						});
						n.push({
							name: "Desaturate",
							C0: [d, G, l.fu],
							p: I
						});
						n.push({
							name: "Match Color",
							pR: !0,
							p: I
						})
					}
				}
				return n
			}()
		}, {
			name: "Auto Tone",
			p: I
		}, {
			name: "Auto Contrast",
			p: I
		}, {
			name: "Auto Color",
			p: I,
			xX: !0
		}, {
			name: "Reduce Colors",
			p: I
		}, {
			name: "Vectorize Bitmap",
			p: I,
			xX: !0
		}, {
			name: "Canvas Size",
			p: t,
			pR: !0,
			C0: [b, d, l.nA]
		}, {
			name: "Image Size",
			p: t,
			pR: !0,
			C0: [b, d, l.wo]
		}, {
			name: "Transform",
			p: t,
			sub: [{
				name: "Rotate 90\xB0 \u21BB"
			}, {
				name: "Rotate 90\xB0 \u21BA"
			}, {
				name: "Rotate 180\xB0"
			}, {
				name: "Flip Horizontally"
			}, {
				name: "Flip Vertically"
			}]
		}, {
			name: "Crop",
			p: function(n) {
				return {
					p: n != null && n.P != null
				}
			}
		}, {
			name: "Trim",
			p: t,
			C0: [d, l.Vy],
			pR: !0
		}, {
			name: "Reveal All",
			p: t,
			xX: !0
		}, {
			name: "Apply Image",
			p: I,
			pR: !0,
			xX: !0
		}, {
			name: "Variables",
			p: t,
			pR: !0
		}],
		iD: [{
			sub: [{
				Y: ActionTypes.E.v,
				G: f.$C,
				W: {
					a: "fcmy",
					Z: 0
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.$C,
				W: {
					a: "fcmy",
					Z: 1
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.$C,
				W: {
					a: "fvec",
					Z: 0
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.$C,
				W: {
					a: "fvec",
					Z: 1
				}
			}]
		}, {
			sub: function() {
				var n = [];
				for (var r in LayerEffectsHelper.names) {
					n.push({
						Y: ActionTypes.E.v,
						G: f.Qi,
						W: {
							a: "start",
							ce: r
						}
					});
					if (r == "selc") {
						n.push({
							Y: ActionTypes.E.v,
							G: f.WH,
							W: {
								a: "start",
								_K: "adaptCorrect"
							}
						});
						n.push({
							Y: ActionTypes.E.g5,
							W: {
								kT: "desaturate"
							}
						});
						n.push({
							Y: ActionTypes.E.v,
							G: f.Qi,
							W: {
								a: "start",
								ce: "matc"
							}
						})
					}
				}
				return n
			}()
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "levels",
				a0: {
					classID: "Lvls",
					Auto: {
						t: "bool",
						v: !0
					}
				}
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "levels",
				a0: {
					classID: "Lvls",
					AuCo: {
						t: "bool",
						v: !0
					}
				}
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "levels",
				a0: {
					classID: "Lvls",
					autoBlackWhite: {
						t: "bool",
						v: !0
					},
					autoNeutrals: {
						t: "bool",
						v: !0
					}
				}
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "rcolors"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "vbitmap"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "csize"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "isize"
			}
		}, {
			sub: [{
				Y: ActionTypes.E.g5,
				W: f.NH.Lg(!0, 90)
			}, {
				Y: ActionTypes.E.g5,
				W: f.NH.Lg(!0, -90)
			}, {
				Y: ActionTypes.E.g5,
				W: f.NH.Lg(!0, -180)
			}, {
				Y: ActionTypes.E.g5,
				W: f.NH.Lg(!1, "Hrzn")
			}, {
				Y: ActionTypes.E.g5,
				W: f.NH.Lg(!1, "Vrtc")
			}]
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "crop",
				a0: {
					__name: "Crop",
					classID: "Crop"
				}
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "trim"
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "revealAll",
				a0: {
					classID: "RvlA"
				}
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.Qi,
			W: {
				a: "start",
				ce: "aply"
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "varsdats"
			}
		}]
	}, {
		name: "Layer",
		items: [{
			name: "New",
			p: t,
			sub: [{
				name: "Layer",
				C0: [G, d, l.q5]
			}, {
				name: "Folder"
			}, {
				name: "Artboard",
				pR: !0
			}, {
				name: "Artboard from Layer",
				pR: !0,
				xX: !0
			}, {
				name: "Layer Via Copy",
				C0: [d, l.Ns]
			}, {
				name: "Layer Via Cut",
				C0: [G, d, l.Ns],
				p: function(n) {
					return {
						p: n != null && n.P != null && n.T8(!1)
					}
				}
			}]
		}, {
			name: "Duplicate Layer",
			p: V,
			C0: [d, l.Ns]
		}, {
			name: "Duplicate Into ...",
			p: V
		}, {
			name: "Delete",
			p: V,
			xX: !0
		}, {
			name: "Layer Style",
			p: V,
			xX: !0,
			sub: LayerStyleDialog.bb(!0)
		}, {
			name: "New Fill Layer",
			p: t,
			sub: [{
				name: "Color Fill"
			}, {
				name: "Gradient Fill"
			}, {
				name: "Pattern Fill"
			}]
		}, {
			name: "New Adjustment Layer",
			p: t,
			xX: !0,
			sub: LayerStyleDialog.alE()
		}, {
			name: "Raster Mask",
			p: t,
			sub: [{
				name: "Add (Reveal All)",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() == null
					}
				}
			}, {
				name: "Add (Hide All)",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() == null
					}
				}
			}, {
				name: "Reveal Selection",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() == null && n.P != null
					}
				}
			}, {
				name: "Hide Selection",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() == null && n.P != null
					}
				}
			}, {
				name: "From Transparency",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() == null
					}
				},
				xX: !0
			}, {
				name: "Delete",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() != null
					}
				}
			}, {
				name: "Apply",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() != null && n.T8(!1, !0)
					}
				}
			}, {
				name: "Enable/Disable",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].c3() != null
					}
				}
			}]
		}, {
			name: "Vector Mask",
			p: t,
			sub: [{
				name: "Add (Reveal All)",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].add.vmsk == null
					}
				}
			}, {
				name: "Add (Hide All)",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].add.vmsk == null
					}
				}
			}, {
				name: "Current Path",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].add.vmsk == null
					}
				},
				xX: !0
			}, {
				name: "Delete",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].add.vmsk != null
					}
				}
			}, {
				name: "Enable/Disable",
				p: function(n) {
					return {
						p: n != null && n.g.length != 0 && n.B[n.g[0]].add.vmsk != null
					}
				}
			}]
		}, LayersPanel.a1S(!0), {
			name: "Smart Object",
			p: t,
			xX: !0,
			sub: [{
				name: "Convert to Smart Object",
				xX: !0
			}, {
				name: "Open (Edit Contents)",
				p: Q,
				pR: !0
			}, {
				name: "Replace Contents",
				p: Q,
				pR: !0
			}, {
				name: "Export Contents",
				p: Q,
				pR: !0,
				xX: !0
			}, {
				name: "Stack Mode",
				p: Q,
				sub: y
			}, {
				name: "Turn into JPG",
				p: Q
			}]
		}, {
			name: "Rasterize",
			p: LayersPanel.a51
		}, {
			name: "Rasterize Layer Style",
			xX: !0,
			p: function(n) {
				if (n == null || n.g.length == 0) return {
					p: !1
				};
				var r = n.B[n.g[0]];
				return {
					p: r.add.lmfx != null && !r.IQ()
				}
			}
		}, {
			name: "Group Layers",
			p: t,
			xX: !0,
			C0: [d, l.Jv]
		}, {
			name: "Arrange",
			p: t,
			xX: !0,
			sub: [{
				name: "Bring to Front",
				C0: [G, d, l.uM]
			}, {
				name: "Bring Forward",
				C0: [d, l.uM]
			}, {
				name: "Send Backward",
				C0: [d, l.vz]
			}, {
				name: "Send to Back",
				C0: [G, d, l.vz]
			}]
		}, {
			name: "Animation",
			p: t,
			xX: !0,
			sub: [{
				name: ["Make Frames"]
			}, {
				name: ["Unmake Frames"]
			}, {
				name: "Merge"
			}]
		}, {
			name: "Merge Layers",
			C0: [d, l.E],
			p: function(n) {
				var r = n == null ? 0 : n.g.length;
				return {
					p: r != 0 && (r != 1 || n.g[0] != 0),
					iH: r > 1 || r == 1 && n.B[n.g[0]].IQ() ? "Merge Layers" : "Merge Down"
				}
			}
		}, {
			name: "Flatten Image",
			p: t
		}, {
			name: "Defringe",
			p: t
		}],
		iD: [{
			sub: [{
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.vx
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.C2
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "newartb",
					fz: 0
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "newartb",
					fz: 1
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "copyToLayer"
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "cutToLayer"
				}
			}]
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.ZY
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "duplinto"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.Qe
			}
		}, {
			sub: LayerStyleDialog.bQ(!0)
		}, {
			sub: [{
				Y: ActionTypes.E.v,
				G: f.LI,
				W: {
					a: "newfill",
					Ts: 0
				}
			}, {
				Y: ActionTypes.E.g5,
				W: f.Ga.ML(1)
			}, {
				Y: ActionTypes.E.g5,
				W: f.Ga.ML(2)
			}]
		}, {
			sub: LayerStyleDialog.ye()
		}, {
			sub: [{
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.a5,
					fz: "RvlA"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.a5,
					fz: "HdAl"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.a5,
					fz: "RvlS"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.a5,
					fz: "HdSl"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.a5,
					fz: "Trns"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.uU
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.n9
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.sF
				}
			}]
		}, {
			sub: [{
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.dL,
					afG: !1
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.dL,
					afG: !0
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.dL,
					ajQ: !0
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.W1
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.dD
				}
			}]
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.Gk
			}
		}, {
			sub: [{
				Y: ActionTypes.E.g5,
				W: {
					kT: "newPlacedLayer"
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "placedLayerEditContents",
					a0: {
						classID: "placedLayerEditContents"
					}
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "placedLayerReplaceContents",
					a0: {
						classID: "placedLayerReplaceContents"
					}
				}
			}, {
				Y: ActionTypes.E.g5,
				W: {
					kT: "placedLayerExportContents",
					a0: {
						classID: "placedLayerExportContents"
					}
				}
			}, {
				sub: e
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.aeu
				}
			}]
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "rasterizeLayer",
				a0: {
					classID: "rasterizeLayer",
					null: PsdDescriptorHelper.Fw("Lyr", !0)
				}
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.pL
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.yS,
			W: {
				a: LayerRecord.mQ
			}
		}, {
			sub: [{
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.CU,
					y3: 0
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.CU,
					y3: 1
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.CU,
					y3: 2
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.CU,
					y3: 3
				}
			}]
		}, {
			sub: [{
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.WW,
					y3: "makeframes"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.WW,
					y3: "unmakeframes"
				}
			}, {
				Y: ActionTypes.E.v,
				G: f.yS,
				W: {
					a: LayerRecord.WW,
					y3: "merge"
				}
			}]
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "mergeLayersNew",
				a0: {
					__name: "Merge Layers",
					classID: "Mrg2"
				}
			}
		}, {
			Y: ActionTypes.E.g5,
			W: {
				kT: "flattenImage"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.WH,
			W: {
				a: "start",
				_K: "defr"
			}
		}]
	}, TopBar.aj2(!1), function() {
		var n = {
			name: "Filter",
			items: [{
				name: "Last Filter",
				C0: [b, d, l.vW],
				p: t,
				xX: !0
			}],
			iD: [{
				Y: ActionTypes.E.v,
				G: f.WH,
				W: {
					a: "applylast"
				}
			}]
		};
		for (var A = 0; A < FilterHelper.JJ.length; A++) {
			var r = FilterHelper.JJ[A];
			if (r.rU != null) {
				n.items.push({
					name: FilterHelper.names[r.rU],
					pR: !0,
					xX: r.xX,
					p: t
				});
				n.iD.push({
					Y: ActionTypes.E.v,
					G: f.WH,
					W: {
						a: "start",
						_K: r.rU
					}
				});
				continue
			}
			var T = {
				name: r.X$,
				sub: [],
				p: t
			};
			n.items.push(T);
			var j = {
				sub: []
			};
			n.iD.push(j);
			for (var g = 0; g < r.Uv.length; g++) {
				var Y = {
					name: FilterHelper.names[r.Uv[g]],
					pR: FilterHelper.oT(r.Uv[g]) != null
				};
				T.sub.push(Y);
				var k = {
					Y: ActionTypes.E.v,
					G: f.WH,
					W: {
						a: "start",
						_K: r.Uv[g]
					}
				};
				j.sub.push(k)
			}
		}
		return n
	}(), {
		name: "View",
		items: [{
			name: "Zoom In",
			p: t,
			C0: [d, l.W$]
		}, {
			name: "Zoom Out",
			p: t,
			C0: [d, l.Zw]
		}, {
			name: "Fit The Area",
			p: t,
			C0: [d, l.ZD]
		}, {
			name: "Pixel to Pixel",
			p: t,
			C0: [d, l.wY]
		}, {
			name: "Pattern Preview",
			p: function(n, r) {
				return {
					p: n != null,
					Zj: n != null && n.ZV
				}
			},
			xX: !0
		}, {
			name: "Mode",
			xX: !0,
			sub: [{
				name: "Fullscreen",
				p: function(n, r) {
					return {
						Zj: document.fullscreenElement != null
					}
				},
				xX: !0
			}, {
				name: "Standard",
				p: function(n, r) {
					return {
						Zj: r.WN == 0
					}
				}
			}, {
				name: "Menu Bar and Canvas",
				p: function(n, r) {
					return {
						Zj: r.WN == 1
					}
				}
			}]
		}, {
			name: "Extras",
			C0: [d, l.Zi],
			p: function(n, r) {
				return {
					Zj: r.Wi
				}
			}
		}, {
			name: "Show",
			xX: !0,
			sub: [{
				name: "Selection",
				p: function(n, r) {
					return {
						p: r.Wi,
						Zj: r.hq.vF
					}
				}
			}, {
				name: "Paths",
				p: function(n, r) {
					return {
						p: r.Wi,
						Zj: r.hq.t_
					}
				}
			}, {
				name: "Guides",
				p: function(n, r) {
					return {
						p: r.Wi,
						Zj: r.hq.qz
					}
				},
				C0: [d, l._z]
			}, {
				name: "Grid",
				p: function(n, r) {
					return {
						p: r.Wi,
						Zj: r.hq.Sp
					}
				},
				C0: [d, l.kS]
			}, {
				name: "Pixel Grid",
				p: function(n, r) {
					return {
						p: r.Wi,
						Zj: r.hq.vr
					}
				}
			}, {
				name: "Slices",
				p: function(n, r) {
					return {
						p: r.Wi,
						Zj: r.hq.Vp
					}
				}
			}]
		}, {
			name: "Rulers",
			p: function(n, r) {
				return {
					Zj: r.bI
				}
			},
			C0: [d, l.xA],
			xX: !0
		}, {
			name: "Snap",
			p: function(n, r) {
				return {
					Zj: r.gX
				}
			}
		}, {
			name: "Snap To",
			xX: !0,
			sub: [{
				name: "Guides",
				p: function(n, r) {
					return {
						Zj: r.v1[0]
					}
				}
			}, {
				name: "Grid",
				p: function(n, r) {
					return {
						Zj: r.v1[1]
					}
				}
			}, {
				name: "Layers",
				p: function(n, r) {
					return {
						Zj: r.v1[2]
					}
				}
			}, {
				name: "Slices",
				p: function(n, r) {
					return {
						Zj: r.v1[3]
					}
				}
			}, {
				name: "Document Bounds",
				p: function(n, r) {
					return {
						Zj: r.v1[4]
					}
				}
			}]
		}, {
			name: "Lock Guides",
			p: function(n, r) {
				return {
					p: n != null,
					Zj: n != null && n.HH
				}
			}
		}, {
			name: "Clear Guides",
			p: t
		}, {
			name: "Add Guides",
			p: t,
			pR: !0
		}, {
			name: "Guides from Layers",
			p: function(n, r) {
				return {
					p: n != null && n.g.length != 0
				}
			},
			xX: !0
		}, {
			name: "Clear Slices",
			p: function(n, r) {
				return {
					p: n != null && n.Vp.length != 0
				}
			}
		}],
		iD: [{
			Y: ActionTypes.E.v,
			G: f.t7,
			W: {
				a: "zoom",
				K$: !0
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.t7,
			W: {
				a: "zoom",
				K$: !1
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.t7,
			W: {
				a: "adapt",
				Z: "fitscr"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.t7,
			W: {
				a: "adapt",
				Z: "pixel"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.$C,
			W: {
				a: "pview"
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.Mc,
					Xs: !0
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.Mc,
					Z: 0
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.Mc,
					Z: 1
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.Mc,
					Z: 2
				}
			}]
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.Z3
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.Xe
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.fe
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.ef
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.oV
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.pn
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.T$
				}
			}]
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.yv
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.a0B
			}
		}, {
			sub: [{
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.LU,
					XY: 0
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.LU,
					XY: 1
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.LU,
					XY: 2
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.LU,
					XY: 3
				}
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.LU,
					XY: 4
				}
			}]
		}, {
			Y: ActionTypes.E.v,
			G: f.$C,
			W: {
				a: "lockguides"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.$C,
			W: {
				a: "gids",
				jh: [
					[],
					[]
				]
			}
		}, {
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "addguides"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.$C,
			W: {
				a: "gidsFromLayer"
			}
		}, {
			Y: ActionTypes.E.v,
			G: f.E7,
			W: {
				a: "deleteAll"
			}
		}]
	}, function() {
		var n = {
			name: "Window",
			items: [{
				name: "More",
				xX: !0,
				sub: []
			}, {
				name: "Plugins",
				xX: !0
			}],
			iD: [{
				sub: []
			}, {
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.SN,
					GU: "res1"
				}
			}]
		};
		for (var A = 0; A < PanelListContainer.Ho.length; A++) {
			var r = PanelListContainer.Ho[A],
				T = function() {
					var j = r.A3.kR;
					return function(g, Y) {
						return {
							Zj: Y.J_.indexOf(parseInt(j)) != -1
						}
					}
				}();
			(r.ME ? n.items[0].sub : n.items).push({
				name: r.A3.name,
				p: T
			});
			(r.ME ? n.iD[0].sub : n.iD).push({
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.B_,
					GU: r.A3.kR
				}
			})
		}
		return n
	}(), function() {
		var n = {
				name: "More",
				items: [],
				iD: []
			},
			r = {
				name: "Language",
				sub: []
			};
		n.items.push(r);
		var T = {
			sub: []
		};
		n.iD.push(T);
		var j = languageManager.getSortedLanguages();
		for (var A = 0; A < j.length; A++) {
			var g = j[A],
				Y = g.code,
				k = languageManager.findLanguageIndexByCode(Y);
			r.sub.push({
				name: g.name,
				C0: Y,
				p: function(F, D) {
					return {
						Zj: this.C0 == languageManager.getCurrentLanguageCode()
					}
				}
			});
			T.sub.push({
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.Ef,
					lang: k
				}
			})
		}
		r.sub.push({
			name: "Create Translation"
		});
		T.sub.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.dG,
				link: "https://www.photopea.com/translate/"
			}
		});
		var r = {
			name: "Theme",
			sub: []
		};
		n.items.push(r);
		var T = {
			sub: []
		};
		n.iD.push(T);
		for (var A = 0; A < ThemeManager.themes.length; A++) {
			r.sub.push({
				name: ThemeManager.themes[A].name,
				p: function(F, D) {
					return {
						Zj: this.name == ThemeManager.themes[D.j$].name
					}
				}
			});
			T.sub.push({
				Y: ActionTypes.E.L,
				W: {
					a: ActionTypes.$.kI,
					Oo: PsdResourceTypes.userMask$,
					j$: A
				}
			})
		}
		n.items.push({
			name: "Install Photopea",
			p: function(F, D) {
				return {
					p: D.sv != null
				}
			}
		});
		n.iD.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.at7
			}
		});
		n.items.push({
			name: "Keyboard Shortcuts"
		});
		n.iD.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "shortcuts"
			}
		});
		n.items.push({
			name: "Use WebGL",
			p: function(F) {
				return {
					Zj: WebGLContext.webglAvailable,
					p: WebGLContext.webglEnabled
				}
			},
			xX: !0
		});
		n.iD.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.amK
			}
		});
		n.items.push({
			name: "",
			p: function(F, D) {
				return D.ki ? {
					iH: "About Photopea",
					p: !0
				} : {
					iH: "",
					p: !1
				}
			}
		});
		n.iD.push({
			Y: ActionTypes.E.L,
			W: {
				a: ActionTypes.$.SN,
				GU: "aboutpp"
			}
		});
		return n
	}()]
}();
