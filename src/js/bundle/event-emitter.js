
function EventEmitter() {
	this.py = {};
	this.xo = {}
}

EventEmitter.prototype.hasListener = function(l) {
	var d = this.py[l];
	if (d == null) return !1;
	return d.length > 0
};

EventEmitter.prototype.addEventListener = function(l, d) {
	this.addListener(l, d, null)
};

EventEmitter.prototype.addListener = function(l, d, G) {
	if (this.py[l] == null) {
		this.py[l] = [];
		this.xo[l] = []
	}
	this.py[l].push(d);
	this.xo[l].push(G);
};

EventEmitter.prototype.removeEventListener = function(l, d) {
	var G = this.py[l];
	if (G == null) return;
	var b = G.indexOf(d);
	if (b < 0) return;
	var V = this.xo[l];
	G.splice(b, 1);
	V.splice(b, 1)
};

EventEmitter.prototype.dispatch = function(l) {
	l.currentTarget = this;
	if (l.target == null) l.target = this;
	var d = this.py[l.type];
	if (d == null) return;
	var G = this.xo[l.type];
	for (var A = 0; A < d.length; A++) {
		if (typeof d[A] != "function") continue;
		if (G[A] == null) {
			d[A](l);
		} else {
			d[A].call(G[A], l)
		}
	}
};
