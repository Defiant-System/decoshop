
function Matrix2D(l, d, G, b, V, Q) {
	if (typeof l === "undefined") {
		l = 1;
		d = 0;
		G = 0;
		b = 1;
		V = 0;
		Q = 0
	}
	this.aS = l;
	this.k = d;
	this.S5 = G;
	this.Qd = b;
	this.cI = V;
	this.xu = Q
}

Matrix2D.prototype.Nw = function() {
	return Math.sqrt(Math.abs(this.aS * this.Qd - this.k * this.S5))
};

Matrix2D.prototype.auT = function() {
	var l = this,
		d = function(G) {
			return Math.abs(G) < 1e-9 ? 0 : G
		};
	l.aS = d(l.aS);
	l.k = d(l.k);
	l.S5 = d(l.S5);
	l.Qd = d(l.Qd);
	l.cI = d(l.cI);
	l.xu = d(l.xu)
};

Matrix2D.prototype.kD = function(l) {
	return new Point2D(l.x * this.aS + l.y * this.S5 + this.cI, l.x * this.k + l.y * this.Qd + this.xu)
};

Matrix2D.prototype.translate = function(l, d) {
	this.cI += l;
	this.xu += d
};

Matrix2D.prototype.rotate = function(l) {
	var d = new Matrix2D(Math.cos(l), -Math.sin(l), Math.sin(l), Math.cos(l), 0, 0);
	this.concat(d)
};

Matrix2D.prototype.scale = function(l, d) {
	var G = new Matrix2D(l, 0, 0, d, 0, 0);
	this.concat(G)
};

Matrix2D.prototype.concat = function(l) {
	this.Ac(new Matrix2D(this.aS * l.aS + this.k * l.S5, this.aS * l.k + this.k * l.Qd, this.S5 * l.aS + this.Qd * l.S5, this.S5 * l.k + this.Qd * l.Qd, this.cI * l.aS + this.xu * l.S5 + l.cI, this.cI * l.k + this.xu * l.Qd + l.xu))
};

Matrix2D.prototype.hI = function() {
	var l = this.aS * this.Qd - this.k * this.S5;
	this.Ac(new Matrix2D(this.Qd / l, -this.k / l, -this.S5 / l, this.aS / l, (this.S5 * this.xu - this.Qd * this.cI) / l, (this.k * this.cI - this.aS * this.xu) / l))
};

Matrix2D.prototype.clone = function() {
	return new Matrix2D(this.aS, this.k, this.S5, this.Qd, this.cI, this.xu)
};

Matrix2D.prototype.Ac = function(l) {
	this.aS = l.aS;
	this.k = l.k;
	this.S5 = l.S5;
	this.Qd = l.Qd;
	this.cI = l.cI;
	this.xu = l.xu
};
