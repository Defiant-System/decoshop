/**
* layerEffectsHelper (de-obfuscated partial from rest.js)
* Lines 64882-65838. Original identifier: layerEffectsHelper
*/

var LayerEffectsHelper = {};

LayerEffectsHelper.names = {
	brit: "Brightness/Contrast",
	levl: "Levels",
	curv: "Curves",
	expA: "Exposure",
	vibA: "Vibrance",
	hue2: "Hue/Saturation",
	blnc: "Color Balance",
	blwh: "Black & White",
	phfl: "Photo Filter",
	mixr: "Channel Mixer",
	clrL: "Color Lookup",
	nvrt: "Invert",
	post: "Posterize",
	thrs: "Threshold",
	grdm: "Gradient Map",
	selc: "Selective Color",
	rplc: "Replace Color"
};

LayerEffectsHelper.advancedAdjustmentKeys = ["expA", "clrL", "selc"];

LayerEffectsHelper.colorRanges = [
	"Red",
	"Yellow",
	"Green",
	"Cyan",
	"Blue",
	"Magenta"
];

LayerEffectsHelper.cmykChannels = [
	"Cyan",
	"Magenta",
	"Yellow",
	"Black"
];

LayerEffectsHelper.rgbChannels = [
	"Red",
	"Green",
	"Blue"
];

LayerEffectsHelper.classIdToKey = {
	BrgC: "brit",
	Lvls: "levl",
	Crvs: "curv",
	Exps: "expA",
	vibrance: "vibA",
	HStr: "hue2",
	ClrB: "blnc",
	BanW: "blwh",
	photoFilter: "phfl",
	Invr: "nvrt",
	Pstr: "post",
	Thrs: "thrs",
	GrMp: "grdm",
	SlcC: "selc",
	ChnM: "mixr",
	colorLookup: "clrL",
	rplc: "rplc"
};

LayerEffectsHelper.invertedClassIdToKey = function() {
	var l = JSON.parse(JSON.stringify(LayerEffectsHelper.classIdToKey));
	delete l.GrMp;
	l.GdMp = "grdm";
	return l
}();

LayerEffectsHelper.actionEventNames = {
	brit: "brightnessEvent",
	levl: "levels",
	curv: "curves",
	expA: "exposure",
	vibA: "vibrance",
	hue2: "hueSaturation",
	blnc: "colorBalance",
	blwh: "blackAndWhite",
	phfl: "photoFilter",
	mixr: "channelMixer",
	clrL: "colorLookup",
	nvrt: "invert",
	post: "posterization",
	thrs: "thresholdClassEvent",
	grdm: "gradientMapEvent",
	selc: "selectiveColor",
	rplc: "replaceColor"
};

LayerEffectsHelper.keys = {
	levl: [KeyboardHandler.wz, KeyboardHandler.Hm],
	curv: [KeyboardHandler.wz, KeyboardHandler.dQ],
	hue2: [KeyboardHandler.wz, KeyboardHandler.fu],
	nvrt: [KeyboardHandler.wz, KeyboardHandler.wo],
	blnc: [KeyboardHandler.wz, KeyboardHandler.Zt]
};

LayerEffectsHelper.buildChannelMixerDescriptor = function(l) {
	var d = FilterHelper.oT("mixr");
	d.Mnch = {
		t: "bool",
		v: l.Mo
	};

	function G(b, A) {
		var V = {
				classID: "ChMx"
			},
			Q = {
				Rd: 0,
				Grn: 1,
				Bl: 2,
				Cnst: 4
			};
		for (var t in Q) V[t] = {
			t: "UntF",
			v: {
				type: "#Prc",
				val: b[A + Q[t]]
			}
		};
		return {
			t: "Objc",
			v: V
		}
	}
	if (l.Mo) d.Gry = G(l.Z, 0);
	else {
		d.Rd = G(l.Z, 0);
		d.Grn = G(l.Z, 5);
		d.Bl = G(l.Z, 10)
	}
	return d
};

LayerEffectsHelper.parseChannelMixerDescriptor = function(l) {
	function d(b, V, A) {
		var Q = {
			Rd: 0,
			Grn: 1,
			Bl: 2,
			Cnst: 4
		};
		for (var t in Q)
			if (b[t]) V[A + Q[t]] = b[t].v.val
	}
	var G = {
		Mo: !1,
		Z: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	};
	if (l.Mnch && l.Mnch.v) G.Mo = !0;
	if (G.Mo) d(l.Gry.v, G.Z, 0);
	else {
		d(l.Rd.v, G.Z, 0);
		d(l.Grn.v, G.Z, 5);
		d(l.Bl.v, G.Z, 10)
	}
	return G
};

LayerEffectsHelper.detectAdjustmentKey = function(l) {
	for (var d in LayerEffectsHelper.names)
		if (l[d] != null) return d;
	return null
};

LayerEffectsHelper.buildEffect = function(l, d) {
	var G = LayerEffectsHelper.PO,
		b;
	if (l == "brit") {
		var V = d.Brgh ? d.Brgh.v : 0,
			Q = d.Cntr ? d.Cntr.v : 0,
			t = d.useLegacy ? d.useLegacy.v : !1;
		if (t) {
			var I = V / 255,
				y = 1 + Q / 100;
			if (y > 1) y = 1 + Math.tan(Math.PI / 2 * Q / 101);
			var e = (1 - y) / 2,
				M = PixelUtil.mat4.WL(I, I, I),
				R = [y, 0, 0, e, 0, y, 0, e, 0, 0, y, e, 0, 0, 0, 1],
				J = PixelUtil.mat4.multiply(R, M),
				n = new WebGLContext.RgbaFloatPlanes(256);
			for (var A = 0; A < 256; A++) n.o[A] = A;
			PixelUtil.mat4.transform(n, n, J);
			b = {
				type: G.TF,
				mK: n.o,
				_J: n.o,
				xm: n.o,
				RC: !1,
				mf: !1
			}
		} else {
			var r = 1024,
				T = -30 + 60 * (Q + 100) / 200,
				j = [];
			for (var A = 0; A < 4; A++) j.push(PixelUtil.presetThumb.yR(A / 3 * 255, A / 3 * 255, !0));
			j[1].v.Hrzn.v = 64;
			j[1].v.Vrtc.v = 64 - T;
			j[2].v.Hrzn.v = 128 + 64;
			j[2].v.Vrtc.v = 128 + 64 + T;
			j.sort(function(iO, b6) {
				return iO.v.Hrzn.v - b6.v.Hrzn.v
			});
			var g = PixelUtil.presetThumb.j0(j, r);

			function Y(iO, r) {
				var j = [],
					hZ = 3;
				for (var A = 0; A < hZ + 1; A++) j.push(PixelUtil.presetThumb.yR(A / hZ * 255, A / hZ * 255, !0));
				j[1].v.Hrzn.v = 130 - iO * 26;
				j[1].v.Vrtc.v = 130 + iO * 51;
				j[2].v.Hrzn.v = 233 - iO * 48;
				j[2].v.Vrtc.v = 233 + iO * 10;
				return PixelUtil.presetThumb.j0(j, r)
			}
			var k = Y(Math.abs(V) / 100, r);
			if (V < 0) {
				var F = [],
					D = 1 / r;
				for (var A = 0; A < r; A++) {
					var q = A * D,
						H = A;
					while (k[H] > q && H > 1) H--;
					F[A] = H * D
				}
				k = F
			}
			var W = new Uint8Array(r);
			for (var A = 0; A < r; A++) {
				var Z = Math.round((r - 1) * k[A]);
				W[A] = Math.round(255 * g[Z])
			}
			b = {
				type: G.TF,
				mK: W,
				_J: W,
				xm: W,
				RC: !1,
				mf: !1
			}
		}
	}
	if (l == "levl") {
		var B = [],
			a, m, M, p, c, v;
		for (var A = 0; A < 4; A++) B.push(hg.RX(d, A));
		a = -B[0][0] / 255;
		m = 1 / (B[0][1] / 255 - B[0][0] / 255);
		M = PixelUtil.mat4.multiply(PixelUtil.mat4.e_(m, m, m), PixelUtil.mat4.WL(a, a, a));
		p = PixelUtil.mat4.e_(1 / (B[1][1] / 255 - B[1][0] / 255), 1 / (B[2][1] / 255 - B[2][0] / 255), 1 / (B[3][1] / 255 - B[3][0] / 255));
		c = PixelUtil.mat4.WL(-B[1][0] / 255, -B[2][0] / 255, -B[3][0] / 255);
		v = PixelUtil.mat4.multiply(p, c);
		var W = new WebGLContext.RgbaFloatPlanes(256);
		for (var A = 0; A < 256; A++) W.o[A] = W.J[A] = W.k[A] = A;
		var i = 1 / (B[0][4] / 100),
			z = 1 / (B[1][4] / 100),
			P = 1 / (B[2][4] / 100),
			C = 1 / (B[3][4] / 100);
		PixelUtil.mat4.transform(W, W, v);
		for (var A = 0; A < 256; A++) {
			W.o[A] = Math.round(Math.max(0, Math.min(255, 255 * Math.pow(W.o[A] / 255, z))));
			W.J[A] = Math.round(Math.max(0, Math.min(255, 255 * Math.pow(W.J[A] / 255, P))));
			W.k[A] = Math.round(Math.max(0, Math.min(255, 255 * Math.pow(W.k[A] / 255, C))))
		}
		PixelUtil.mat4.transform(W, W, M);
		for (var A = 0; A < 256; A++) {
			W.o[A] = Math.round(Math.max(0, Math.min(255, 255 * Math.pow(W.o[A] / 255, i))));
			W.J[A] = Math.round(Math.max(0, Math.min(255, 255 * Math.pow(W.J[A] / 255, i))));
			W.k[A] = Math.round(Math.max(0, Math.min(255, 255 * Math.pow(W.k[A] / 255, i))))
		}
		a = B[0][2] / 255;
		m = B[0][3] / 255 - B[0][2] / 255;
		M = PixelUtil.mat4.multiply(PixelUtil.mat4.WL(a, a, a), PixelUtil.mat4.e_(m, m, m));
		p = PixelUtil.mat4.e_(B[1][3] / 255 - B[1][2] / 255, B[2][3] / 255 - B[2][2] / 255, B[3][3] / 255 - B[3][2] / 255);
		c = PixelUtil.mat4.WL(B[1][2] / 255, B[2][2] / 255, B[3][2] / 255);
		v = PixelUtil.mat4.multiply(c, p);
		PixelUtil.mat4.transform(W, W, PixelUtil.mat4.multiply(M, v));
		b = {
			type: G.TF,
			mK: W.o,
			_J: W.J,
			xm: W.k,
			RC: !1,
			mf: !1
		}
	}
	if (l == "curv") {
		var h = cb.RX(d, 0).length == 256 ? 1 : 0,
			L = [];
		if (h == 0) {
			var U = PixelUtil.presetThumb.d_(cb.RX(d, 0), 256);
			for (var A = 1; A < 4; A++) {
				var S = PixelUtil.presetThumb.d_(cb.RX(d, A), 256);
				L.push(PixelUtil.presetThumb.u_(S, U))
			}
		} else {
			var E = [];
			for (var A = 0; A < 4; A++) {
				var x = new Uint8Array(256);
				E.push(x);
				var K = cb.RX(d, A);
				for (var H = 0; H < 256; H++) x[H] = K[H]
			}
			for (var A = 1; A < 4; A++) L.push(PixelUtil.presetThumb.u_(E[A], E[0]))
		}
		b = {
			type: G.TF,
			mK: L[0],
			_J: L[1],
			xm: L[2],
			RC: !1,
			mf: !1
		}
	}
	if (l == "expA") {
		var u = d.Exps,
			bC = d.Ofst,
			O = d.gammaCorrection,
			$ = u ? u.v : 0,
			gX = bC ? bC.v : 0,
			_ = O ? O.v : 1,
			W = new Uint8Array(256);
		for (var A = 0; A < 256; A++) {
			var d = A / 255,
				jI = Math.pow(Math.abs(gX), 1 / (Math.PI / 2));
			if (gX > 0) {
				d = Math.max(gX / Math.E, d);
				d = d * Math.exp(gX / 1.75 + $ / Math.PI);
				d = (1 - jI) * d + jI * 1
			} else {
				d = d * Math.exp(-gX * 1.75 + $ / Math.PI);
				d = d + -jI * 1.14
			}
			d = Math.pow(d, 1 / _);
			d = Math.max(0, Math.min(1, d));
			W[A] = Math.round(d * 255)
		}
		b = {
			type: G.TF,
			mK: W,
			_J: W,
			xm: W,
			RC: !1,
			mf: !1
		}
	}
	if (l == "vibA") {
		var iw = (d.vibrance ? d.vibrance.v : 0) / 100,
			hn = (d.Strt ? d.Strt.v : 0) / 100,
			jI = 1 + iw * (iw > 0 ? .25 : .5),
			jq = .8 + .2 / jI;
		b = {
			type: G.fn,
			Oo: [iw, hn, jq, jI]
		}
	}
	if (l == "hue2") {
		var iv = [],
			kq = [],
			eE = [],
			e8 = d.Clrz ? d.Clrz.v : !1;
		for (var A = 0; A < 256; A++) {
			iv[A] = A / 255;
			kq[A] = 0;
			eE[A] = 0
		}
		var aI = d8.RX(d, 0),
			dK = LayerEffectsHelper.J4(aI[1] / 100);
		if (e8) {
			var jC = aI[0] / 360;
			for (var A = 0; A < 256; A++) {
				iv[A] = jC;
				kq[A] = dK
			}
		} else {
			for (var A = 0; A < 256; A++) {
				var d7 = iv[A],
					ka = kq[A];
				iv[A] += aI[0] / 360;
				for (var H = 0; H < 6; H++) {
					var hS = d8.RX(d, H + 1),
						eH = hS.I3,
						kA = hS.mE,
						jI = 0;
					for (var gq = 1; gq < 4; gq++)
						if (kA[gq] < kA[0]) kA[gq] += 360;
					var hb = kA[0],
						ex = kA[1],
						fs = kA[2],
						f_ = kA[3],
						bD = d7 * 360;
					if (bD < kA[0]) bD += 360;
					var ae = (bD - hb) / (ex - hb),
						em = (bD - fs) / (f_ - fs);
					if (ae < 0) jI = 0;
					else if (ae < 1) jI = ae;
					else if (em < 0) jI = 1;
					else if (em < 1) jI = 1 - em;
					else jI = 0;
					var y = LayerEffectsHelper.J4(eH[1] / 100);
					iv[A] += jI * eH[0] / 360;
					kq[A] += jI * y;
					eE[A] += jI * eH[2] / 100
				}
			}
			for (var A = 0; A < 256; A++) {
				kq[A] = (1 + kq[A]) * (1 + dK) - 1;
				eE[A] = Math.max(-1, Math.min(1, eE[A]))
			}
		}
		var dY = new Uint8Array(256),
			f7 = new Uint8Array(256),
			bM = new Uint8Array(256);
		for (var A = 0; A < 256; A++) {
			var iP = iv[A],
				hn = kq[A],
				jp = eE[A];
			if (iP > 1) iP--;
			if (iP < 0) iP++;
			hn = LayerEffectsHelper.apx(hn);
			hn = (1 + hn) * .5;
			jp = (1 + jp) * .5;
			dY[A] = Math.round(255 * iP);
			f7[A] = Math.round(255 * hn);
			bM[A] = Math.round(255 * jp)
		}
		var hG = aI[2] / 100,
			hf = hG < 0 ? -hG : hG,
			d2 = hG < 0 ? 0 : 1;
		b = {
			type: G.YZ,
			abI: dY,
			CG: f7,
			agk: bM,
			a1H: hf * d2,
			Jp: 1 - hf,
			ajl: aI[2] / 100,
			abS: e8 ? 1 : 0
		}
	}
	if (l == "nvrt") {
		var W = new Uint8Array(256);
		for (var A = 0; A < 256; A++) W[A] = 255 - A;
		b = {
			type: G.TF,
			mK: W,
			_J: W,
			xm: W,
			RC: !1,
			mf: !1
		}
	}
	if (l == "post") {
		var gu = d.Lvls.v,
			W = new Uint8Array(256),
			jI = gu / 255.001,
			jt = 255 / (gu - 1);
		for (var A = 0; A < 256; A++) W[A] = Math.floor(A * jI) * jt;
		b = {
			type: G.TF,
			mK: W,
			_J: W,
			xm: W,
			RC: !1,
			mf: !1
		}
	}
	if (l == "grdm") {
		var ip = d.Grad.v,
			aQ = d.Rvrs,
			r = 1024,
			iL;
		if (ip.Clrs) {
			var jx = PixelUtil.color.resolveGradientStops(ip, 0, 0);
			iL = PixelUtil.color.buildGradientLut(ip, jx, r, aQ ? aQ.v : !1)
		} else {
			iL = PixelUtil.color.buildTwoColorLut(ip, r, aQ ? aQ.v : !1)
		}
		var ep = PixelUtil.allocBytes(r),
			gz = PixelUtil.allocBytes(r),
			ed = PixelUtil.allocBytes(r);
		PixelUtil.extractChannelFromRgba(iL, ep, 0);
		PixelUtil.extractChannelFromRgba(iL, gz, 1);
		PixelUtil.extractChannelFromRgba(iL, ed, 2);
		b = {
			type: G.TF,
			mK: ep,
			_J: gz,
			xm: ed,
			RC: !0,
			mf: !1
		}
	}
	if (l == "selc") {
		var bo = new Float32Array(9 * 3 * 2),
			d0 = d.m6,
			c0 = d.Mthd ? d.Mthd.v.CrcM == "Absl" : !1;
		for (var H = 0; H < 9; H++) {
			var cv = H * 6,
				iH = iX.RX(d, H),
				bS = iH[0] / 100,
				gg = iH[1] / 100,
				bG = iH[2] / 100,
				jj = iH[3] / 100;
			if (c0) {
				bo[cv] = bo[cv + 1] = bo[cv + 2] = 1;
				bo[cv + 3] = bS * (1 + jj) + jj;
				bo[cv + 4] = gg * (1 + jj) + jj;
				bo[cv + 5] = bG * (1 + jj) + jj
			} else {
				bo[cv + 0] = (1 + bS) * (1 + jj);
				bo[cv + 1] = (1 + gg) * (1 + jj);
				bo[cv + 2] = (1 + bG) * (1 + jj)
			}
		}
		b = {
			type: G.KM,
			adB: bo
		}
	}
	if (l == "blwh") {
		var ay = "Rd Yllw Grn Cyn Bl Mgnt".split(" "),
			b = [],
			aD = 0,
			c7 = 0;
		for (var A = 0; A < 6; A++) b.push(d[ay[A]].v);
		b.push(d.useTint.v, d.tintColor.v);
		var cH = [];
		for (var A = 0; A < 6; A++) cH.push((b[A] - 50) / 50);
		var e6 = PixelUtil.color.sampleGradientColor(b[7]);
		e6.o /= 255;
		e6.J /= 255;
		e6.k /= 255;
		var fi = PixelUtil.rgbToHsb(e6.o, e6.J, e6.k),
			jp = PixelUtil.rgbObjectLuminance(PixelUtil.hslToRgb(fi.Tq, 1, .5)),
			et = fi.Lm * fi.qv;
		if (jp == .5) aD = c7 = .5;
		else {
			aD = et * (.5 - jp) / (.5 / jp - 1);
			c7 = 1 - et * (.5 - jp) - 1 / (2 * (1 - jp));
			c7 /= 1 - 1 / (2 * (1 - jp))
		}
		b = {
			type: G.Jn,
			a8V: cH,
			Mr: b[6] ? 1 : 0,
			a5z: fi.Tq,
			aC: jp,
			akX: et,
			qm: aD,
			ajp: c7
		}
	}
	if (l == "blnc") {
		var B = [],
			ga = ["ShdL", "MdtL", "HghL"];
		for (var A = 0; A < 3; A++) {
			if (d[ga[A]] == null) {
				B[A] = [0, 0, 0];
				continue
			}
			var gu = d[ga[A]].v,
				cY = gu[0].v / 100,
				i4 = gu[1].v / 100,
				jS = gu[2].v / 100,
				e7 = d.PrsL == null || d.PrsL.v ? (Math.min(cY, i4, jS) + Math.max(cY, i4, jS)) / 2 : 0;
			B[A] = [cY - e7, i4 - e7, jS - e7]
		}
		var L = [PixelUtil.allocBytes(256), PixelUtil.allocBytes(256), PixelUtil.allocBytes(256)];
		for (var H = 0; H < 3; H++)
			for (var A = 0; A < 256; A++) {
				var q = A * (1 / 255),
					ct = 0,
					T = 0,
					bj = 0;
				T = B[2][H];
				bj = Math.abs(T);
				if (T < 0) ct = Math.pow(q, Math.SQRT2);
				else ct = 1.63 * (Math.pow(q + .04, .5) - .2);
				q = bj * ct + (1 - bj) * q;
				T = B[1][H];
				bj = Math.abs(T);
				if (T < 0) ct = Math.pow(q, 2);
				else ct = Math.min(2.35 * (Math.pow(q + .09, .5) - .3), Math.pow(q, 1 / 2));
				q = bj * ct + (1 - bj) * q;
				T = B[0][H];
				bj = Math.abs(T);
				if (T < 0) ct = q < .4 ? 0 : Math.pow((q - .4) / .6, Math.SQRT2);
				else ct = Math.pow(q, Math.SQRT2 / 2);
				q = bj * ct + (1 - bj) * q;
				q = Math.max(0, Math.min(1, q));
				L[H][A] = Math.round(q * 255)
			}
		b = {
			type: G.TF,
			mK: L[0],
			_J: L[1],
			xm: L[2],
			RC: !1,
			mf: !1
		}
	}
	if (l == "phfl") {
		var jo = PixelUtil.color.sampleGradientColor(d.Clr.v),
			er = [jo.o / 255, jo.J / 255, jo.k / 255],
			iV = d.Dnst.v / 100,
			L = [PixelUtil.allocBytes(256), PixelUtil.allocBytes(256), PixelUtil.allocBytes(256)];
		for (var H = 0; H < 3; H++)
			for (var A = 0; A < 256; A++) {
				var q = A * (1 / 255),
					h_ = q * er[H];
				h_ = Math.max(0, Math.min(1, h_));
				q = iV * h_ + (1 - iV) * q;
				L[H][A] = Math.round(q * 255)
			}
		b = {
			type: G.TF,
			mK: L[0],
			_J: L[1],
			xm: L[2],
			RC: !1,
			mf: d.PrsL.v
		}
	}
	if (l == "thrs") {
		var W = PixelUtil.allocBytes(256);
		for (var A = d.Lvl.v; A < 256; A++) W[A] = 255;
		b = {
			type: G.TF,
			mK: W,
			_J: W,
			xm: W,
			RC: !0,
			mf: !1
		}
	}
	if (l == "mixr") {
		var i2 = LayerEffectsHelper.parseChannelMixerDescriptor(d),
			J = [];
		for (var A = 0; A < i2.Z.length; A++)
			if (A % 5 != 3) J.push(i2.Z[A] / 100);
		if (i2.Mo) {
			for (var kj = 1; kj < 3; kj++)
				for (var q = 0; q < 4; q++) J[kj * 4 + q] = J[q]
		}
		b = {
			type: G.Tu,
			lV: J
		}
	}
	if (l == "rplc") {
		var a3 = d.Mnm.v,
			ke = d.Mxm.v;
		b = {
			type: G.uI,
			V5: [a3.Lmnc.v, a3.A.v, a3.B.v],
			Mp: [ke.Lmnc.v, ke.A.v, ke.B.v],
			shift: [d.H.v / 360, d.Strt.v / 100, d.Lght.v / 100],
			Zl: d.Fzns.v / 150
		}
	}
	if (l == "clrL" && d.profile) {
		var b1 = new Uint8Array(d.profile.v),
			fb = ICC.R(b1.buffer),
			eg = [],
			gK = 17,
			eg = ICC.U.sampleLUT(fb, gK);
		b = {
			type: G.ac,
			XO: ICC.U.lutToRGBA8(eg, gK),
			a4R: eg,
			q5: gK
		}
	}
	return b
};

LayerEffectsHelper.Gs = function(l, d) {
	var G = -1;
	if (l != "levl" || d == null) G = -1;
	else if (d.Auto) G = 0;
	else if (d.AuCo) G = 1;
	else if (d.autoBlackWhite) G = 2;
	return G
};

LayerEffectsHelper.PO = {
	TF: 0,
	YZ: 1,
	fn: 2,
	KM: 3,
	Jn: 4,
	Tu: 5,
	uI: 6,
	ac: 7
};

LayerEffectsHelper.J4 = function(l) {
	if (l < 0) return l;
	return Math.pow(Math.tan(Math.PI / 2 * l), 1.3)
};

LayerEffectsHelper.apx = function(l) {
	if (l < 0) return l;
	l = Math.pow(l, 1 / 1.3);
	return Math.atan2(l, 1) / (Math.PI / 2)
};

LayerEffectsHelper.Qz = function(l, d, G, b) {
	var V = LayerEffectsHelper.PO,
		Q = Date.now();
	if (WebGLContext.webglAvailable && b.O() > 300 * 300 && l.type != V.TF && l.type != V.ac) {
		b = b.clone();
		b.x = b.y = 0;
		var t = WebGLContext.getOrCreateTexture(0, b.m, b.n);
		t.set(d);
		WebGLContext.setFramebufferViewport(t, b);
		t.copyToAuxTexture(b);
		LayerEffectsHelper.wF(l, t.auxTexture, b);
		t.get(G);
		return
	}
	if (l.type == V.ac) {
		var I = l.a4R,
			y = l.q5;
		ICC.U.applyLUT(I, y, d, G);
		var e = d.length;
		for (var A = 0; A < e; A += 4) G[A + 3] = d[A + 3]
	}
	if (l.type == V.Tu) PixelUtil.mat4.KF(d, G, l.lV);
	if (l.type == V.Jn) {
		var M = l.akX,
			R = l.aC,
			J = l.qm,
			n = l.ajp,
			e = d.length;
		for (var A = 0; A < e; A += 4) {
			var b = d[A] * (1 / 255),
				r = d[A + 1] * (1 / 255),
				T = d[A + 2] * (1 / 255),
				j = PixelUtil.rgbToHsl(b, r, T),
				g = 0;
			for (var Y = 0; Y < 6; Y++) g += Math.min(1, 1.7 * (1 - j._Z)) * j.Lm * l.a8V[Y] * LayerEffectsHelper.af_(j.Tq, Y * (1 / 6));
			var k = Math.max(0, Math.min(1, j._Z * (1 + g)));
			if (l.Mr == 1) {
				var F = 0;
				if (k < J) F = k * (.5 / R);
				else if (k < n) F = k + M * (.5 - R);
				else F = 1 - (1 - k) * .5 / (1 - R);
				j.Tq = l.a5z;
				j.Lm = Math.min(1, M + 3 * M * Math.abs(k - .5 * (J + n)));
				j._Z = F
			} else {
				j.Tq = 0;
				j.Lm = 0;
				j._Z = k
			}
			var D = PixelUtil.hslToRgb(j.Tq, j.Lm, j._Z);
			G[A] = Math.round(D.o * 255);
			G[A + 1] = Math.round(D.J * 255);
			G[A + 2] = Math.round(D.k * 255)
		}
	}
	if (l.type == V.KM) {
		var q = l.adB,
			e = d.length,
			H = 1 / 255;
		for (var A = 0; A < e; A += 4) {
			var b = d[A] * H,
				r = d[A + 1] * H,
				T = d[A + 2] * H,
				j = PixelUtil.rgbToHsl(b, r, T),
				W = Math.max(b, Math.max(r, T)),
				Z = Math.min(b, Math.min(r, T)),
				B = 1 - b,
				a = 1 - r,
				m = 1 - T,
				p = 0,
				c = 0,
				v = 0;
			for (var Y = 0; Y < 9; Y++) {
				var i = Y * 6,
					h = 0;
				if (q[i] == 1 && q[i + 1] == 1 && q[i + 2] == 1 && q[i + 3] == 0 && q[i + 4] == 0 && q[i + 5] == 0) continue;
				var z = B * q[i] + q[i + 3],
					P = a * q[i + 1] + q[i + 4],
					C = m * q[i + 2] + q[i + 5];
				if (Y < 6) h = LayerEffectsHelper.af_(j.Tq, Y * (1 / 6)) * j.Lm * 2 * Math.min(j._Z, 1 - j._Z);
				else if (Y == 6) h = Math.max(0, Z - .5) * 2;
				else if (Y == 7) h = 1 - (Math.abs(W - .5) + Math.abs(Z - .5));
				else h = Math.max(0, .5 - W) * 2;
				p += (Math.max(0, Math.min(1, z)) - B) * h;
				c += (Math.max(0, Math.min(1, P)) - a) * h;
				v += (Math.max(0, Math.min(1, C)) - m) * h
			}
			B = Math.max(0, Math.min(1, B + p));
			a = Math.max(0, Math.min(1, a + c));
			m = Math.max(0, Math.min(1, m + v));
			b = 1 - B;
			r = 1 - a;
			T = 1 - m;
			G[A] = Math.round(b * 255);
			G[A + 1] = Math.round(r * 255);
			G[A + 2] = Math.round(T * 255)
		}
	}
	if (l.type == V.TF) {
		PixelUtil.applyColorLookupTables(d, G, l.mK, l._J, l.xm, l.RC, l.mf)
	}
	if (l.type == V.YZ) {
		var L = new Uint32Array(d.buffer),
			U = new Uint32Array(G.buffer),
			e = L.length;
		if (LayerEffectsHelper.jZ == null) {
			LayerEffectsHelper.jZ = new Float64Array(256);
			for (var A = 0; A < 256; A++) LayerEffectsHelper.jZ[A] = LayerEffectsHelper.J4(-1 + 2 * A / 255)
		}
		var S = LayerEffectsHelper.jZ;
		for (var A = 0; A < e; A++) {
			var E = L[A],
				b = (E & 255) * (1 / 255),
				r = (E >>> 8 & 255) * (1 / 255),
				T = (E >>> 16 & 255) * (1 / 255),
				x = E >>> 24,
				K = Math.min(b, r, T),
				u = Math.max(b, r, T),
				bC = 0,
				O = 0,
				$ = 0;
			bC = PixelUtil.rgbToHsl(b, r, T).Tq;
			var gX = ~~(bC * 255 + .5),
				_ = l.abI[gX] * (1 / 255),
				jI = l.CG[gX] * (1 / 255) * 2 - 1,
				iw = l.agk[gX] * (1 / 255) * 2 - 1,
				g = -iw,
				hn = K;
			if (0 < iw) {
				g = iw;
				hn = u
			}
			var jq = l.a1H + l.Jp * g * hn,
				iv = l.Jp * (1 - g);
			b = jq + iv * b;
			r = jq + iv * r;
			T = jq + iv * T;
			u = Math.max(b, r, T);
			K = Math.min(b, r, T);
			$ = (u + K) * .5;
			if (u != K) {
				var kq = u - K;
				O = $ > .5 ? kq / (2 - (u + K)) : kq / (u + K)
			}
			var eE = jI;
			if (l.abS == 0) {
				jI = S[Math.floor((1 + jI) * 127.5)];
				eE = Math.min(O * (1 + jI), 1)
			}
			var D = PixelUtil.hslToRgb(_, eE, $);
			b = D.o;
			r = D.J;
			T = D.k;
			U[A] = x << 24 | T * 255 << 16 | r * 255 << 8 | b * 255
		}
	}
	if (l.type == V.uI) {
		PixelUtil.copyByteBuffer(d, G);
		var L = new Uint32Array(d.buffer),
			U = new Uint32Array(G.buffer),
			e = L.length,
			e8 = l.Zl,
			aI = 1 / e8,
			dK = {
				Hm: l.V5[0],
				aS: l.V5[1],
				k: l.V5[2]
			},
			jC = {
				Hm: l.Mp[0],
				aS: l.Mp[1],
				k: l.Mp[2]
			};
		for (var A = 0; A < e; A++) {
			var E = L[A],
				d7 = E & 255,
				ka = E >>> 8 & 255,
				hS = E >>> 16 & 255,
				b = d7 * (1 / 255),
				r = ka * (1 / 255),
				T = hS * (1 / 255),
				x = E >>> 24,
				eH = PixelUtil.rgbToLab(d7, ka, hS),
				kA = PixelUtil.labBlendWeight(eH, dK, jC, e8, aI);
			if (kA == 0) continue;
			var j = PixelUtil.rgbToHsl(b, r, T),
				_ = 2 + j.Tq + l.shift[0];
			j.Tq = _ - ~~_;
			j.Lm = Math.max(0, Math.min(1, j.Lm + l.shift[1]));
			j._Z = Math.max(0, Math.min(1, j._Z + l.shift[2]));
			var D = PixelUtil.hslToRgb(j.Tq, j.Lm, j._Z);
			b = (1 - kA) * b + kA * D.o;
			r = (1 - kA) * r + kA * D.J;
			T = (1 - kA) * T + kA * D.k;
			U[A] = x << 24 | T * 255 << 16 | r * 255 << 8 | b * 255
		}
	}
	if (l.type == V.fn) {
		var L = new Uint32Array(d.buffer),
			U = new Uint32Array(G.buffer),
			e = L.length,
			gq = l.Oo[0],
			hb = l.Oo[1],
			ex = l.Oo[2],
			g = l.Oo[3],
			fs = PixelUtil.mat4._3([.299, .587, .114, -.147, -.289, .436, .615, -.515, -.1]),
			f_ = PixelUtil.mat4.hI(fs),
			bD = 2.4;

		function y(bM) {
			return Math.max(0, Math.min(1, bM))
		}

		function ae(bM) {
			return Math.pow(bM, bD)
		}

		function em(bM) {
			return Math.pow(bM, 1 / bD)
		}

		function dY(b, r, T, bM) {
			b = ae(b);
			r = ae(r);
			T = ae(T);
			var iP = PixelUtil.mat4.Uz(fs, [b, r, T, 1]);
			iP[0] *= ex;
			iP[1] *= g;
			iP[2] *= g;
			var D = PixelUtil.mat4.Uz(f_, iP);
			D[0] = em(y(D[0]));
			D[1] = em(y(D[1]));
			D[2] = em(y(D[2]));
			return D
		}
		for (var A = 0; A < e; A++) {
			var E = L[A],
				b = (E & 255) * (1 / 255),
				r = (E >>> 8 & 255) * (1 / 255),
				T = (E >>> 16 & 255) * (1 / 255),
				x = E >>> 24,
				D = dY(b, r, T, gq);
			b = D[0];
			r = D[1];
			T = D[2];
			var f7 = PixelUtil.rgbToHsl(b, r, T);
			f7.Lm = Math.max(0, Math.min(1, f7.Lm * (1 + hb)));
			D = PixelUtil.hslToRgb(f7.Tq, f7.Lm, f7._Z);
			b = D.o;
			r = D.J;
			T = D.k;
			U[A] = x << 24 | T * 255 << 16 | r * 255 << 8 | b * 255
		}
	}
};

LayerEffectsHelper.wF = function(l, d, G) {
	WebGLContext.ce.wF(l, d)
};

LayerEffectsHelper.af_ = function(l, d) {
	var G = PixelUtil.shortestAngleWrap(d, l) * 6;
	return Math.max(0, Math.min(1, G < 0 ? 1 + G : 1 - G))
};
