
function DocumentViewState(l) {
	this.Kv = l;
	this.N = 0;
	this.ma = 1;
	this.R = new Point2D(0, 0);
	this.q8 = new Point2D(0, 0);
	this.Ay = 0;
	this.MX = [1, 1, 1];
	this.$m = 0;
	this.Vm = new Rect(0, 0, 1, 1);
	this.awr = new Rect(0, 0, l.m, l.n);
	this.M9 = null;
	this.Je = null;
	this.xL = new Uint32Array(0);
	this.C5 = null;
	this.XF = null;
	this.cM = PixelUtil.allocBytes(0);
	this.aT = null;
	this.eW = null
}

DocumentViewState.prototype.Gb = function(l) {
	var d = new Matrix2D,
		G = this.Vm,
		b = this.Kv,
		V = l ? this.ma : this.N,
		Q = l ? this.q8 : this.R,
		t = Math.round((G.m - b.m * V) / 2 + Q.x),
		I = Math.round((G.n - b.n * V) / 2 + Q.y);
	d.translate(-t, -I);
	d.scale(1 / V, 1 / V);
	var y = b.m / 2,
		e = b.n / 2;
	d.translate(-y, -e);
	d.rotate(this.Ay);
	d.translate(y, e);
	return d
};

DocumentViewState.prototype.ai7 = function(l) {
	var d = this.Vm,
		G = this.Kv,
		b = Math.atan2(-l.k, l.aS),
		V = G.m / 2,
		Q = G.n / 2;
	l.translate(-V, -Q);
	l.rotate(-b);
	l.translate(V, Q);
	var t = 1 / l.Nw();
	l.scale(t, t);
	var I = -l.cI,
		y = -l.xu,
		e = Math.round(I - (d.m - G.m * t) / 2),
		M = Math.round(y - (d.n - G.n * t) / 2);
	if (Math.abs(t - Math.round(t)) < 1e-6) t = Math.round(t);
	this.Ay = b;
	this.N = t;
	this.R = new Point2D(e, M)
};

DocumentViewState.prototype.Zx = function(l, d) {
	var G = this.Gb();
	return G.kD(new Point2D(l, d))
};

DocumentViewState.prototype.dN = function(l, d) {
	var G = this.Gb();
	G.hI();
	return G.kD(new Point2D(l, d))
};
