
function DialogManager() {
	UIComponent.call(this);
	this.e = s.createElement("div", "");
	this.kA = 0;
	this.hW = 0;
	this.mN = null;
	this.Ju = s.createElement("div", "");
	this.Ju.setAttribute("style", "width:200em; height:100em; position:absolute;");
	this.tx = [];
	this.cF = [];
	this.u6 = {}
}

DialogManager.prototype = new UIComponent;

DialogManager.prototype.Eg = function(l) {
	var d = Date.now(),
		G = [];
	this.u6[l] = !0
};

DialogManager.prototype.av1 = function(l) {
	var d = this.mN;
	for (var A = 0; A < l.length; A++) {
		var G = l[A];
		G.parent = this;
		this.cF.push(G);
		this.$T(G);
		G.refresh();
		if (d) G.BM(d, PsdResourceTypes.Wx);
		G.addListener(ActionTypes.E.Ax, this.qL, this);
		s.hideWithTransition(G)
	}
};

DialogManager.prototype.resize = function(l, d) {
	this.kA = l;
	this.hW = d;
	for (var A = 0; A < this.cF.length; A++) this.$T(this.cF[A])
};

DialogManager.prototype.refresh = function() {
	for (var A = 0; A < this.cF.length; A++) this.cF[A].refresh()
};

DialogManager.prototype.Uf = function() {
	return this.tx.length == 0 ? null : this.tx[this.tx.length - 1]
};

DialogManager.prototype.in = function() {
	for (var A = 0; A < this.tx.length; A++)
		if (this.tx[A].in()) return !0;
	return !1
};

DialogManager.prototype.aqd = function(l, d, G, b, V) {
	var Q = l.startsWith("afw_"),
		t = null;
	if (!Q && !this.u6["-"]) this.Eg("-");
	if (Q && !this.u6[l]) this.Eg(l);
	if (typeof l == "object") {
		t = l;
		if (!t.hasListener(ActionTypes.E.Ax, this.qL)) t.addListener(ActionTypes.E.Ax, this.qL, this);
		t.parent = this
	} else
		for (var A = 0; A < this.cF.length; A++)
			if (this.cF[A].id == l) t = this.cF[A]; if (this.in() && t.in()) {
		alert("Finish the current action first");
		return
	}
	if (!t.Ah(d)) return;
	if (this.tx.indexOf(t) != -1) {
		if (l == "colorpicker") t.Yw(d, G, b, V);
		return
	}
	var I = this.tx.length - 1;
	if (I >= 0) s.addClass(this.tx[I].e, "wdisabled");
	this.e.appendChild(t.e);
	this.tx.push(t);
	this.$T(t);
	s.showWithTransition(t);
	t.Yw(d, G, b, V)
};

DialogManager.prototype.$T = function(l) {
	var d = this.kA,
		G = this.hW,
		b = l.px(d, G),
		V;
	if (b != null) {
		V = b
	} else {
		b = new Point2D(0, 0);
		V = l.a9c();
		if (V == null) {
			var Q = this.tx.indexOf(l) + 1;
			if (d < 450 || G < 450) V = new Point2D(0, 0);
			else V = new Point2D(Q * 150, Q * 150)
		}
	}
	l.e.style.left = V.x + "px";
	l.e.style.top = this.e.offsetTop + V.y + "px";
	l.resize(this.kA - b.x * 2, this.hW - b.y * 2 - 34)
};

DialogManager.prototype.BM = function(l, d) {
	this.mN = l;
	for (var A = 0; A < this.cF.length; A++) this.cF[A].BM(l, d)
};

DialogManager.prototype.qL = function(l) {
	if (this.tx.length == 0) return;
	var d = this.tx.pop();
	if (d == null || d.e == null) return;
	s.hideWithTransition(d, this.e);
	var G = this.tx.length - 1;
	if (G >= 0) s.removeClass(this.tx[G].e, "wdisabled");
	if (this.Ju.parentNode == this.e) this.e.removeChild(this.Ju)
};
