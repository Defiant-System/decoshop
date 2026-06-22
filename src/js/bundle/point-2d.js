
function Point2D(l, d) {
	if (!l) l = 0;
	if (!d) d = 0;
	this.x = l;
	this.y = d
}

Point2D.prototype.add = function(l) {
	return new Point2D(this.x + l.x, this.y + l.y)
};

Point2D.prototype.clone = function() {
	return new Point2D(this.x, this.y)
};

Point2D.prototype.Ac = function(l) {
	this.x = l.x;
	this.y = l.y
};

Point2D.prototype.XB = function(l) {
	return this.x == l.x && this.y == l.y
};

Point2D.prototype.normalize = function(l) {
	var d = Math.sqrt(this.x * this.x + this.y * this.y);
	this.x *= l / d;
	this.y *= l / d
};

Point2D.prototype.offset = function(l, d) {
	this.x += l;
	this.y += d
};

Point2D.prototype.T6 = function(l, d) {
	this.x = l;
	this.y = d
};

Point2D.prototype.gu = function(l) {
	return new Point2D(this.x - l.x, this.y - l.y)
};

Point2D.yZ = function(l, d) {
	return Point2D.a4Y(l.x, l.y, d.x, d.y)
};

Point2D.gO = function(l, d, G) {
	return new Point2D(l.x + G * (d.x - l.x), l.y + G * (d.y - l.y))
};

Point2D.afX = function(l, d) {
	return new Point2D(l * Math.cos(d), l * Math.sin(d))
};

Point2D.a4Y = function(l, d, G, b) {
	return Math.sqrt((G - l) * (G - l) + (b - d) * (b - d))
};

Point2D.Db = {};
Point2D.JL = {};
Point2D.Db.create = function() {
	var l = new Float32Array(4);
	return l
};

Point2D.JL.create = function(l) {
	var d = new Float32Array(16);
	d[0] = d[5] = d[10] = d[15] = 1;
	if (l) Point2D.JL.set(l, d);
	return d
};

Point2D.Db.add = function(l, d, G) {
	G[0] = l[0] + d[0];
	G[1] = l[1] + d[1];
	G[2] = l[2] + d[2];
	G[3] = l[3] + d[3]
};

Point2D.Db.set = function(l, d) {
	d[0] = l[0];
	d[1] = l[1];
	d[2] = l[2];
	d[3] = l[3]
};

Point2D.JL.set = function(l, d) {
	d[0] = l[0];
	d[1] = l[1];
	d[2] = l[2];
	d[3] = l[3];
	d[4] = l[4];
	d[5] = l[5];
	d[6] = l[6];
	d[7] = l[7];
	d[8] = l[8];
	d[9] = l[9];
	d[10] = l[10];
	d[11] = l[11];
	d[12] = l[12];
	d[13] = l[13];
	d[14] = l[14];
	d[15] = l[15]
};

Point2D.JL.multiply = function(l, d, G) {
	var b = l[0],
		V = l[1],
		Q = l[2],
		t = l[3],
		I = l[4],
		y = l[5],
		e = l[6],
		M = l[7],
		R = l[8],
		J = l[9],
		n = l[10],
		r = l[11],
		T = l[12],
		j = l[13],
		g = l[14],
		Y = l[15],
		k = d[0],
		F = d[1],
		D = d[2],
		q = d[3];
	G[0] = k * b + F * I + D * R + q * T;
	G[1] = k * V + F * y + D * J + q * j;
	G[2] = k * Q + F * e + D * n + q * g;
	G[3] = k * t + F * M + D * r + q * Y;
	k = d[4];
	F = d[5];
	D = d[6];
	q = d[7];
	G[4] = k * b + F * I + D * R + q * T;
	G[5] = k * V + F * y + D * J + q * j;
	G[6] = k * Q + F * e + D * n + q * g;
	G[7] = k * t + F * M + D * r + q * Y;
	k = d[8];
	F = d[9];
	D = d[10];
	q = d[11];
	G[8] = k * b + F * I + D * R + q * T;
	G[9] = k * V + F * y + D * J + q * j;
	G[10] = k * Q + F * e + D * n + q * g;
	G[11] = k * t + F * M + D * r + q * Y;
	k = d[12];
	F = d[13];
	D = d[14];
	q = d[15];
	G[12] = k * b + F * I + D * R + q * T;
	G[13] = k * V + F * y + D * J + q * j;
	G[14] = k * Q + F * e + D * n + q * g;
	G[15] = k * t + F * M + D * r + q * Y;
	return G
};

Point2D.JL.inverse = function(l, d) {
	var G = l[0],
		b = l[1],
		V = l[2],
		Q = l[3],
		t = l[4],
		I = l[5],
		y = l[6],
		e = l[7],
		M = l[8],
		R = l[9],
		J = l[10],
		n = l[11],
		r = l[12],
		T = l[13],
		j = l[14],
		g = l[15],
		Y = G * I - b * t,
		k = G * y - V * t,
		F = G * e - Q * t,
		D = b * y - V * I,
		q = b * e - Q * I,
		H = V * e - Q * y,
		W = M * T - R * r,
		Z = M * j - J * r,
		B = M * g - n * r,
		a = R * j - J * T,
		m = R * g - n * T,
		p = J * g - n * j,
		c = Y * p - k * m + F * a + D * B - q * Z + H * W;
	if (!c) {
		return null
	}
	c = 1 / c;
	d[0] = (I * p - y * m + e * a) * c;
	d[1] = (V * m - b * p - Q * a) * c;
	d[2] = (T * H - j * q + g * D) * c;
	d[3] = (J * q - R * H - n * D) * c;
	d[4] = (y * B - t * p - e * Z) * c;
	d[5] = (G * p - V * B + Q * Z) * c;
	d[6] = (j * F - r * H - g * k) * c;
	d[7] = (M * H - J * F + n * k) * c;
	d[8] = (t * m - I * B + e * W) * c;
	d[9] = (b * B - G * m - Q * W) * c;
	d[10] = (r * q - T * F + g * Y) * c;
	d[11] = (R * F - M * q - n * Y) * c;
	d[12] = (I * Z - t * a - y * W) * c;
	d[13] = (G * a - b * Z + V * W) * c;
	d[14] = (T * k - r * D - j * Y) * c;
	d[15] = (M * D - R * k + J * Y) * c;
	return d
};

Point2D.JL.a0J = function(l, d, G) {
	var b = d[0],
		V = d[1];
	G[0] = b * l[0] + V * l[4] + l[12];
	G[1] = b * l[1] + V * l[5] + l[13]
};

Point2D.JL.a9w = function(l, d, G) {
	var b = d[0],
		V = d[1],
		Q = d[2],
		t = d[3];
	G[0] = l[0] * b + l[4] * V + l[8] * Q + l[12] * t;
	G[1] = l[1] * b + l[5] * V + l[9] * Q + l[13] * t;
	G[2] = l[2] * b + l[6] * V + l[10] * Q + l[14] * t;
	G[3] = l[3] * b + l[7] * V + l[11] * Q + l[15] * t
};

