
function BaseAppUI(l) {
	UIComponent.call(this);
	if (l) return;
	// ThemeManager.applyTheme(1);
	this.e = s.createElement("div", "flexrow app");
	this.X8 = s.createElement("div");
	this.e.appendChild(this.X8);
	this.Ib = new KeyboardHandler;
	/*
	window.addEventListener("blur", function(G) {
		this.Ib.reset()
	}.bind(this), !1);
	*/
	window.addEventListener("resize", this.e3.bind(this), !1);
	var d = this.X8;
	this.dx = new DialogManager;
	this.dx.parent = this;
	d.appendChild(this.dx.e);
	this.i2 = new CommandPalette;
	this.i2.parent = this;
	d.appendChild(this.i2.e);
	this.Nf = new LinkBar(!0);
	this.Nf.parent = this;
	d.appendChild(this.Nf.e);
	this.addListener(ActionTypes.E.L, this.$e, this);
	this.aB = this.io.bind(this);
	// window.requestAnimationFrame(this.aB)
}

BaseAppUI.prototype = new UIComponent;
BaseAppUI.prototype.io = function(l) {
	this.fA();
	window.requestAnimationFrame(this.aB)
};

BaseAppUI.prototype.refresh = function() {};
BaseAppUI.prototype.e3 = function(l) {
	var d = window.innerWidth,
		G = window.innerHeight;
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
