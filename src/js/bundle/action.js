
// Base event-like action object.
let Action = function(type, bubbles) {
	if (!bubbles) bubbles = !1;
	this.type = type;
	this.target = null;
	this.currentTarget = null;
	this.bubbles = bubbles;
	this.G = null;
	this.Fj = !1
};

// Enum-like registry of action types.
let ActionTypes = {
	E: {
		v: "0",
		L: "1",
		g5: "1.5",
		A: "2",
		Ax: "3",
		azc: "4"
	},
	$: {
		to: "10",
		dY: "11",
		qH: "12",
		xt: "13",
		e5: "14",
		a10: "14.1",
		ub: "15",
		Um: "16",
		a1: "17",
		mb: "18",
		WD: "19",
		ay5: "19.5",
		aw3: "20",
		a2O: "20.1",
		ajq: "20.5",
		asn: "20.6",
		Yq: "21",
		n4: "22",
		EZ: "23",
		B_: "24",
		SN: "25",
		hK: "26",
		lr: "27",
		gL: "28",
		a7q: "28.5",
		amK: "29",
		dw: "30",
		yb: "31",
		PN: "32",
		kl: "33",
		vq: "34",
		kI: "35",
		agL: "35.5",
		dG: "37",
		asj: "38",
		B8: "39",
		jn: "40",
		WM: "41",
		QT: "41.5",
		at7: "42",
		kc: "43",
		ab8: "43.5",
		jN: "44",
		a3e: "45",
		Bs: "46",
		bs: "47",
		V7: "48",
		du: "49",
		azm: "50",
		Mc: "51"
	}
};
