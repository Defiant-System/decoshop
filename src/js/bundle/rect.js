
function Rect(l, d, G, b) {
	if (!l) l = 0;
	if (!d) d = 0;
	if (!G) G = 0;
	if (!b) b = 0;
	this.x = l;
	this.y = d;
	this.m = G;
	this.n = b
}

Rect.prototype.O = function() {
	return this.m * this.n
};

Rect.prototype.clone = function() {
	return new Rect(this.x, this.y, this.m, this.n)
};

Rect.prototype.contains = function(l, d) {
	return l >= this.x && l <= this.x + this.m && (d >= this.y && d <= this.y + this.n)
};

Rect.prototype.xC = function(l) {
	return this.contains(l.x, l.y)
};

Rect.prototype.iL = function(l) {
	return this.x <= l.x && this.y <= l.y && l.x + l.m <= this.x + this.m && l.y + l.n <= this.y + this.n
};

Rect.prototype.Ac = function(l) {
	this.x = l.x;
	this.y = l.y;
	this.m = l.m;
	this.n = l.n
};

Rect.prototype.XB = function(l) {
	return this.x == l.x && this.y == l.y && this.m == l.m && this.n == l.n
};

Rect.prototype.rC = function(l, d) {
	this.x -= l;
	this.y -= d;
	this.m += 2 * l;
	this.n += 2 * d
};

Rect.prototype.awM = function(l) {
	this.rC(l.x, l.y)
};

Rect.prototype.wD = function(l) {
	var d = Math.max(this.x, l.x),
		G = Math.max(this.y, l.y),
		b = Math.min(this.x + this.m, l.x + l.m),
		V = Math.min(this.y + this.n, l.y + l.n);
	if (b < d || V < G) return new Rect;
	else return new Rect(d, G, b - d, V - G)
};

Rect.prototype.N1 = function(l) {
	if (l.y + l.n < this.y || l.x > this.x + this.m || l.y > this.y + this.n || l.x + l.m < this.x) return !1;
	return !0
};

Rect.prototype.W6 = function() {
	return this.m <= 0 || this.n <= 0
};

Rect.prototype.offset = function(l, d) {
	this.x += l;
	this.y += d
};

Rect.prototype.pA = function(l) {
	this.offset(l.x, l.y)
};

Rect.prototype.a5P = function() {
	this.x = this.y = this.m = this.n = 0
};

Rect.prototype.T6 = function(l, d, G, b) {
	this.x = l;
	this.y = d;
	this.m = G;
	this.n = b
};

Rect.prototype.Cw = function(l) {
	if (this.W6()) return l.clone();
	if (l.W6()) return this.clone();
	var d = this.clone();
	d.apn(l);
	return d
};

Rect.GV = new Float32Array(2);

Rect.prototype.apn = function(l) {
	if (l.W6()) return;
	if (this.W6()) {
		this.Ac(l);
		return
	}
	this.gW(l.x, l.y);
	this.gW(l.x + l.m, l.y + l.n)
};

Rect.prototype.gW = function(l, d) {
	var G = Math.min(this.x, l),
		b = Math.min(this.y, d);
	this.m = Math.max(this.x + this.m, l) - G;
	this.n = Math.max(this.y + this.n, d) - b;
	this.x = G;
	this.y = b
};

Rect.prototype.aav = function(l, d) {
	this.x = l;
	this.y = d;
	this.m = this.n = 0
};
