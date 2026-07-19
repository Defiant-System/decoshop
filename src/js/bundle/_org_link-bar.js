
function LinkBar(l) {
	UIComponent.call(this);
	this.e = s.createElement("div");
	this.BC = null;
	this.kA = 0;
	this.hW = 0;
	this.a6E = l;
	this.a7U = this.JO.bind(this);
	this.arQ = this.D2.bind(this);
	this.abQ = this.qd.bind(this);
	this.Wp = null;
	this.Tg = null;
	this.G0 = null;
	s.addPointerDown(this.e, this.a7U);
	var d = this.e,
		b = "<svg class=\"gsicon\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">";
	d.addEventListener("touchmove", s.preventDefaultHandler, !1);
	this.ayF = !0;
	this.VS = [];
	var G = this.a8r = s.createElement("div");
	G.setAttribute("style", "float:right; padding:4px;display:none; position:relative;z-index:1;");
	this.e.appendChild(G);
	var V = [
		[0, 13, 3],
		[0, 13, 4],
		[0, 13, 5], "Blog", "API", b + "<path d=\"m21.325 9.308c-.758 0-1.425.319-1.916.816-1.805-1.268-4.239-2.084-6.936-2.171l1.401-6.406 4.461 1.016c0 1.108.89 2.013 1.982 2.013 1.113 0 2.008-.929 2.008-2.038s-.889-2.038-2.007-2.038c-.779 0-1.451.477-1.786 1.129l-4.927-1.108c-.248-.067-.491.113-.557.365l-1.538 7.062c-2.676.113-5.084.928-6.895 2.197-.491-.518-1.184-.837-1.942-.837-2.812 0-3.733 3.829-1.158 5.138-.091.405-.132.837-.132 1.268 0 4.301 4.775 7.786 10.638 7.786 5.888 0 10.663-3.485 10.663-7.786 0-.431-.045-.883-.156-1.289 2.523-1.314 1.594-5.115-1.203-5.117zm-15.724 5.41c0-1.129.89-2.038 2.008-2.038 1.092 0 1.983.903 1.983 2.038 0 1.109-.89 2.013-1.983 2.013-1.113.005-2.008-.904-2.008-2.013zm10.839 4.798c-1.841 1.868-7.036 1.868-8.878 0-.203-.18-.203-.498 0-.703.177-.18.491-.18.668 0 1.406 1.463 6.07 1.488 7.537 0 .177-.18.491-.18.668 0 .207.206.207.524.005.703zm-.041-2.781c-1.092 0-1.982-.903-1.982-2.011 0-1.129.89-2.038 1.982-2.038 1.113 0 2.008.903 2.008 2.038-.005 1.103-.895 2.011-2.008 2.011z\"/>", b + "<path d=\"M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z\"/></svg>", b + "<path d=\"M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z\"/></svg>"
	];
	// for (var A = 0; A < V.length; A++) {
	// 	var Q = new ToolbarButton(V[A]);
	// 	this.VS.push(Q);
	// 	Q.e.setAttribute("style", "margin-left:" + (A < 7 ? 4 : 0) + "px;cursor:pointer;");
	// 	Q.addListener("click", this.Ab, this)
	// }
}

LinkBar.prototype = new UIComponent;
LinkBar.prototype.refresh = function() {
	var l = this.a8r;
	s.clearChildren(l);
	for (var A = 0; A < this.VS.length; A++) {
		var d = this.VS[A];
		if (A < 5) d.refresh();
		l.appendChild(d.e)
	}
};

LinkBar.prototype.Ab = function(l) {
	var A = this.VS.indexOf(l.currentTarget);
	if (A == 0) {
		if (window.showCap) window.showCap();
		return
	}
	var d = " issues learn blog api twitter facebook".split(" "),
		G = " //github.com/photopea/photopea/issues //www.photopea.com/learn //blog.photopea.com //www.photopea.com/api //www.reddit.com/r/photopea //www.twitter.com/photopeacom //www.facebook.com/photopea".split(" "),
		b = window.ga;
	if (b) b("send", "event", "Links", d[A]);
	var V = new Action(ActionTypes.E.L, !0);
	V.data = {
		a: ActionTypes.$.dG,
		link: G[A]
	};
	this.dispatch(V)
};

LinkBar.prototype.JO = function(l) {
	if (l.al8) {
		l.preventDefault();
		l.stopPropagation()
	}
	var d = window;
	s.addPointerMove(d, this.arQ);
	s.addPointerUp(d, this.abQ);
	d = this.BC;
	this.Wp = new Point2D(parseInt(d.style.left), parseInt(d.style.top));
	this.Tg = s.getEventPositionInElement(l, this.e);
	this.G0 = d.getBoundingClientRect()
};

LinkBar.prototype.D2 = function(l) {
	var d = s.getEventPositionInElement(l, this.e),
		G = this.Wp.x + d.x - this.Tg.x,
		b = this.Wp.y + d.y - this.Tg.y,
		V = this.kA - this.G0.width,
		Q = this.hW - this.G0.height;
	if (this.a6E) this.BC.style.left = Math.min(0, Math.max(V, G)) + "px";
	else this.BC.style.top = Math.min(0, Math.max(Q, b)) + "px";
	if (G - 10 > 0) {
		this.Tg.x = d.x - 10;
		this.Wp.x = 0
	}
	if (G + 10 < V) {
		this.Tg.x = d.x + 10;
		this.Wp.x = V
	}
};

LinkBar.prototype.qd = function(l) {
	var d = window;
	s.removePointerMove(d, this.arQ);
	s.removePointerUp(d, this.abQ)
};

LinkBar.prototype.af4 = function(l) {
	if (this.BC) {
		this.e.removeChild(this.BC)
	}
	this.BC = l;
	this.e.appendChild(l);
	l.style.position = "absolute";
	if (this.a6E) l.style.left = 0;
	else l.style.top = 0
};

LinkBar.prototype.resize = function(l, d) {
	this.kA = l;
	this.hW = d;
	this.e.setAttribute("style", "position:relative; width: " + l + "px; height: " + d + "px; overflow:hidden; white-space: nowrap; ");
	var G = this.BC.firstChild,
		b = this.a8r,
		V = G ? G.firstChild.getBoundingClientRect().width + 80 : 1e9,
		Q = 170,
		t = this.ayF && l > V + Q;
	b.style.display = t ? "" : "none";
	var I = this.VS;
	for (var A = 0; A < I.length; A++) {
		var y = A > 4 || l - V > 500 ? "" : "none",
			e = I[A];
		e.e.style.display = y
	}
};

LinkBar.prototype.aoC = function() {
	this.BC.style.left = "0";
	this.BC.style.top = "0"
};
