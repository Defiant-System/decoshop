
function DocumentViewState(doc) {
	this.Kv = doc;
	this.N = 0;
	this.ma = 1;
	this.R = new Point2D(0, 0);
	this.q8 = new Point2D(0, 0);
	this.Ay = 0;
	this.MX = [1, 1, 1];
	this.$m = 0;
	this.Vm = new Rect(0, 0, 1, 1);
	// HBI: optional "available" sub-rect of the viewport (device px, same space as Vm).
	// When set, the document is centered/fit inside this rect instead of the whole canvas.
	// null = use the full viewport. Set via setAvailable()/clearAvailable().
	this.av = null;
	this.awr = new Rect(0, 0, doc.m, doc.n);
	this.M9 = null;
	this.Je = null;
	this.xL = new Uint32Array(0);
	this.C5 = null;
	this.XF = null;
	this.cM = PixelUtil.allocBytes(0);
	this.aT = null;
	this.eW = null

	// viewstate initiated
	var event = new Action(ActionTypes.E.hbi, !0);
	event.data = { type: "init-view-state", viewState: this };
	PP.dispatch(event);
}

// HBI: effective area the document is centered within (the "available" rect when set,
// otherwise the whole viewport). Returns plain {x, y, m, n} in device pixels.
DocumentViewState.prototype.aR = function() {
	var viewport = this.Vm,
		avail = this.av;
	if (avail == null) return { x: 0, y: 0, m: viewport.m, n: viewport.n };
	return { x: avail.x, y: avail.y, m: avail.m, n: avail.n };
};

DocumentViewState.prototype.setAvailable = function(x, y, w, h) {
	this.av = new Rect(x, y, w, h);
};

DocumentViewState.prototype.clearAvailable = function() {
	this.av = null;
};

DocumentViewState.prototype.Gb = function(useAnim) {
	var matrix = new Matrix2D,
		availRect = this.aR(),
		doc = this.Kv,
		zoom = useAnim ? this.ma : this.N,
		pan = useAnim ? this.q8 : this.R,
		originX = Math.round(availRect.x + (availRect.m - doc.m * zoom) / 2 + pan.x),
		originY = Math.round(availRect.y + (availRect.n - doc.n * zoom) / 2 + pan.y);
	matrix.translate(-originX, -originY);
	matrix.scale(1 / zoom, 1 / zoom);
	var halfDocW = doc.m / 2,
		halfDocH = doc.n / 2;
	matrix.translate(-halfDocW, -halfDocH);
	matrix.rotate(this.Ay);
	matrix.translate(halfDocW, halfDocH);
	return matrix;
};

DocumentViewState.prototype.ai7 = function(matrix) {
	var availRect = this.aR(),
		doc = this.Kv,
		angle = Math.atan2(-matrix.k, matrix.aS),
		halfDocW = doc.m / 2,
		halfDocH = doc.n / 2;
	matrix.translate(-halfDocW, -halfDocH);
	matrix.rotate(-angle);
	matrix.translate(halfDocW, halfDocH);
	var zoom = 1 / matrix.Nw();
	matrix.scale(zoom, zoom);
	var transX = -matrix.cI,
		transY = -matrix.xu,
		panX = Math.round(transX - availRect.x - (availRect.m - doc.m * zoom) / 2),
		panY = Math.round(transY - availRect.y - (availRect.n - doc.n * zoom) / 2);
	if (Math.abs(zoom - Math.round(zoom)) < 1e-6) zoom = Math.round(zoom);
	this.Ay = angle;
	this.N = zoom;
	this.R = new Point2D(panX, panY);
};

DocumentViewState.prototype.Zx = function(x, y) {
	var matrix = this.Gb();
	return matrix.kD(new Point2D(x, y));
};

DocumentViewState.prototype.dN = function(x, y) {
	var matrix = this.Gb();
	matrix.hI();
	return matrix.kD(new Point2D(x, y));
};
