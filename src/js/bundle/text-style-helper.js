/**
* textStyleHelper (de-obfuscated partial from rest.js)
* Lines 70626-73136. Original identifier: textStyleHelper
*/

var TextStyleHelper = {};

TextStyleHelper.axC = "BrSm BrsL BrDR BrsW BrbW BrSp".split(" ");

TextStyleHelper.WA = "LDBt LDBL LDLf LDTL LDTp LDTR LDRg LDBR".split(" ");

TextStyleHelper.pj = ["ScrC", "ScrD", "ScrL"];

TextStyleHelper.Kc = ["SDRD", "SDHz", "SDLD", "SDVt"];

TextStyleHelper.N5 = "TxBl TxCa TxFr TxTL TxBr TxBu TxSt".split(" ");

TextStyleHelper.gF = "LPBt LPBL LPLf LPTL LPTp LPTR LPRg LPBR".split(" ");

TextStyleHelper.gJ = "GrnR GrSf GrSr GrnC GrCn GrnE GrSt GrnH GrnV GrSp".split(" ");

TextStyleHelper.JJ = [
	[24, 19, 0],
	[24, 19, 1],
	[24, 4],
	[24, 19, 2],
	[24, 14],
	[12, 67]
];

TextStyleHelper.names = {
	ClrP: [0, [24, 20, 0]],
	Ct: [0, [24, 20, 1]],
	DryB: [0, [24, 20, 2]],
	FlmG: [0, [24, 20, 3]],
	Frsc: [0, [24, 20, 4]],
	NGlw: [0, [24, 20, 5]],
	PntD: [0, [24, 20, 6]],
	PltK: [0, [24, 20, 7]],
	PlsW: [0, [24, 20, 8]],
	PstE: [0, [24, 20, 9]],
	RghP: [0, [24, 20, 10]],
	SmdS: [0, [24, 20, 11]],
	Spng: [0, [24, 20, 12]],
	Undr: [0, [24, 20, 13]],
	Wtrc: [0, [24, 20, 14]],
	AccE: [1, [24, 20, 15]],
	AngS: [1, [24, 20, 16]],
	Crsh: [1, [24, 20, 17]],
	DrkS: [1, [24, 20, 18]],
	InkO: [1, [24, 20, 19]],
	Spt: [1, [24, 20, 20]],
	SprS: [1, [24, 20, 21]],
	Smie: [1, [24, 20, 22]],
	DfsG: [2, [24, 20, 23]],
	Gls: [2, [24, 20, 24]],
	OcnR: [2, [24, 20, 25]],
	BsRl: [3, [24, 20, 26]],
	ChlC: [3, [24, 20, 27]],
	Chrc: [3, [24, 20, 28]],
	Chrm: [3, [24, 20, 29]],
	CntC: [3, [24, 20, 30]],
	GraP: [3, [24, 20, 31]],
	HlfS: [3, [24, 20, 32]],
	NtPr: [3, [24, 20, 33]],
	Phtc: [3, [24, 20, 34]],
	Plst: [3, [24, 20, 35]],
	Rtcl: [3, [24, 20, 36]],
	Stmp: [3, [24, 20, 37]],
	TrnE: [3, [24, 20, 38]],
	WtrP: [3, [24, 20, 39]],
	GlwE: [4, [24, 20, 40]],
	Crql: [5, [24, 20, 41]],
	Grn: [5, [24, 20, 42]],
	MscT: [5, [24, 20, 43]],
	Ptch: [5, [24, 20, 44]],
	StnG: [5, [24, 20, 45]],
	Txtz: [5, [24, 20, 46]]
};

TextStyleHelper.oT = function(l) {
	var d;
	if (l == "ClrP") d = {
		Pncl: {
			t: "long",
			v: 4
		},
		StrP: {
			t: "long",
			v: 8
		},
		PprB: {
			t: "long",
			v: 25
		}
	};
	if (l == "Ct") d = {
		NmbL: {
			t: "long",
			v: 4
		},
		EdgS: {
			t: "long",
			v: 3
		},
		EdgF: {
			t: "long",
			v: 1
		}
	};
	if (l == "DryB") d = {
		BrsS: {
			t: "long",
			v: 4
		},
		BrsD: {
			t: "long",
			v: 4
		},
		Txtr: {
			t: "long",
			v: 2
		}
	};
	if (l == "FlmG") d = {
		Grn: {
			t: "long",
			v: 4
		},
		HghA: {
			t: "long",
			v: 0
		},
		Intn: {
			t: "long",
			v: 10
		},
		FlRs: {
			t: "long",
			v: 23068185
		}
	};
	if (l == "Frsc") d = {
		BrsS: {
			t: "long",
			v: 2
		},
		BrsD: {
			t: "long",
			v: 8
		},
		Txtr: {
			t: "long",
			v: 1
		}
	};
	if (l == "NGlw") d = {
		Sz: {
			t: "long",
			v: 5
		},
		Brgh: {
			t: "long",
			v: 15
		},
		Clr: {
			t: "Objc",
			v: {
				classID: "RGBC",
				Rd: {
					t: "doub",
					v: 0
				},
				Grn: {
					t: "doub",
					v: 0
				},
				Bl: {
					t: "doub",
					v: 255
				}
			}
		}
	};
	if (l == "PntD") d = {
		Sz: {
			t: "long",
			v: 10
		},
		Shrp: {
			t: "long",
			v: 10
		},
		BrsT: {
			t: "enum",
			v: {
				BrsT: "BrSm"
			}
		}
	};
	if (l == "PltK") d = {
		StrS: {
			t: "long",
			v: 25
		},
		StDt: {
			t: "long",
			v: 3
		},
		Sftn: {
			t: "long",
			v: 2
		}
	};
	if (l == "PlsW") d = {
		HghS: {
			t: "long",
			v: 20
		},
		Dtl: {
			t: "long",
			v: 4
		},
		Smth: {
			t: "long",
			v: 5
		}
	};
	if (l == "PstE") d = {
		EdgT: {
			t: "long",
			v: 2
		},
		EdgI: {
			t: "long",
			v: 1
		},
		Pstr: {
			t: "long",
			v: 2
		}
	};
	if (l == "RghP") d = {
		StrL: {
			t: "long",
			v: 6
		},
		StDt: {
			t: "long",
			v: 4
		},
		TxtT: {
			t: "enum",
			v: {
				TxtT: "TxCa"
			}
		},
		Scln: {
			t: "long",
			v: 100
		},
		Rlf: {
			t: "long",
			v: 20
		},
		LghD: {
			t: "enum",
			v: {
				LghD: "LDBt"
			}
		},
		InvT: {
			t: "bool",
			v: !1
		}
	};
	if (l == "SmdS") d = {
		StrL: {
			t: "long",
			v: 2
		},
		HghA: {
			t: "long",
			v: 0
		},
		Intn: {
			t: "long",
			v: 10
		},
		FlRs: {
			t: "long",
			v: 6399750
		}
	};
	if (l == "Spng") d = {
		BrsS: {
			t: "long",
			v: 2
		},
		Dfnt: {
			t: "long",
			v: 12
		},
		Smth: {
			t: "long",
			v: 5
		},
		FlRs: {
			t: "long",
			v: 218877241
		}
	};
	if (l == "Undr") d = {
		BrsS: {
			t: "long",
			v: 6
		},
		TxtC: {
			t: "long",
			v: 16
		},
		TxtT: {
			t: "enum",
			v: {
				TxtT: "TxCa"
			}
		},
		Scln: {
			t: "long",
			v: 100
		},
		Rlf: {
			t: "long",
			v: 4
		},
		LghD: {
			t: "enum",
			v: {
				LghD: "LDTp"
			}
		},
		InvT: {
			t: "bool",
			v: !1
		}
	};
	if (l == "Wtrc") d = {
		BrsD: {
			t: "long",
			v: 9
		},
		ShdI: {
			t: "long",
			v: 1
		},
		Txtr: {
			t: "long",
			v: 3
		}
	};
	if (l == "AccE") d = {
		EdgW: {
			t: "long",
			v: 2
		},
		EdgB: {
			t: "long",
			v: 38
		},
		Smth: {
			t: "long",
			v: 5
		}
	};
	if (l == "AngS") d = {
		DrcB: {
			t: "long",
			v: 50
		},
		StrL: {
			t: "long",
			v: 15
		},
		Shrp: {
			t: "long",
			v: 3
		}
	};
	if (l == "Crsh") d = {
		StrL: {
			t: "long",
			v: 9
		},
		Shrp: {
			t: "long",
			v: 6
		},
		Strg: {
			t: "long",
			v: 1
		}
	};
	if (l == "DrkS") d = {
		Blnc: {
			t: "long",
			v: 5
		},
		BlcI: {
			t: "long",
			v: 6
		},
		WhtI: {
			t: "long",
			v: 2
		}
	};
	if (l == "InkO") d = {
		StrL: {
			t: "long",
			v: 4
		},
		DrkI: {
			t: "long",
			v: 20
		},
		LghI: {
			t: "long",
			v: 10
		}
	};
	if (l == "Smie") d = {
		StrW: {
			t: "long",
			v: 10
		},
		StrP: {
			t: "long",
			v: 5
		},
		Cntr: {
			t: "long",
			v: 16
		}
	};
	if (l == "Spt") d = {
		SprR: {
			t: "long",
			v: 10
		},
		Smth: {
			t: "long",
			v: 5
		},
		FlRs: {
			t: "long",
			v: 10738420
		}
	};
	if (l == "SprS") d = {
		StrL: {
			t: "long",
			v: 12
		},
		SprR: {
			t: "long",
			v: 7
		},
		SDir: {
			t: "enum",
			v: {
				StrD: "SDRD"
			}
		},
		FlRs: {
			t: "long",
			v: 893120664
		}
	};
	if (l == "DfsG") d = {
		Grns: {
			t: "long",
			v: 6
		},
		GlwA: {
			t: "long",
			v: 10
		},
		ClrA: {
			t: "long",
			v: 15
		},
		FlRs: {
			t: "long",
			v: 325892160
		}
	};
	if (l == "Gls") d = {
		Dstr: {
			t: "long",
			v: 3
		},
		Smth: {
			t: "long",
			v: 1
		},
		TxtT: {
			t: "enum",
			v: {
				TxtT: "TxTL"
			}
		},
		Scln: {
			t: "long",
			v: 100
		},
		InvT: {
			t: "bool",
			v: !1
		}
	};
	if (l == "OcnR") d = {
		RplS: {
			t: "long",
			v: 5
		},
		RplM: {
			t: "long",
			v: 15
		},
		FlRs: {
			t: "long",
			v: 64008840
		}
	};
	if (l == "BsRl") d = {
		Dtl: {
			t: "long",
			v: 11
		},
		Smth: {
			t: "long",
			v: 7
		},
		LghD: {
			t: "enum",
			v: {
				LghD: "LDBt"
			}
		}
	};
	if (l == "ChlC") d = {
		ChrA: {
			t: "long",
			v: 6
		},
		ChlA: {
			t: "long",
			v: 6
		},
		StrP: {
			t: "long",
			v: 1
		},
		FlRs: {
			t: "long",
			v: 314004633
		}
	};
	if (l == "Chrc") d = {
		ChAm: {
			t: "long",
			v: 1
		},
		Dtl: {
			t: "long",
			v: 5
		},
		LgDr: {
			t: "long",
			v: 50
		},
		GELv: {
			t: "bool",
			v: !0
		}
	};
	if (l == "Chrm") d = {
		Dtl: {
			t: "long",
			v: 4
		},
		Smth: {
			t: "long",
			v: 4
		}
	};
	if (l == "CntC") d = {
		FrgL: {
			t: "long",
			v: 11
		},
		BckL: {
			t: "long",
			v: 7
		},
		TxtT: {
			t: "enum",
			v: {
				TxtT: "TxCa"
			}
		},
		Scln: {
			t: "long",
			v: 100
		},
		Rlf: {
			t: "long",
			v: 4
		},
		LghD: {
			t: "enum",
			v: {
				LghD: "LDTp"
			}
		},
		InvT: {
			t: "bool",
			v: !1
		}
	};
	if (l == "GraP") d = {
		StrL: {
			t: "long",
			v: 7
		},
		LgDr: {
			t: "long",
			v: 50
		},
		SDir: {
			t: "enum",
			v: {
				StrD: "SDRD"
			}
		},
		FlRs: {
			t: "long",
			v: 55993248
		}
	};
	if (l == "HlfS") d = {
		HlSz: {
			t: "long",
			v: 1
		},
		Cntr: {
			t: "long",
			v: 5
		},
		ScrT: {
			t: "enum",
			v: {
				ScrT: "ScrD"
			}
		}
	};
	if (l == "NtPr") d = {
		ImgB: {
			t: "long",
			v: 25
		},
		Grns: {
			t: "long",
			v: 10
		},
		Rlf: {
			t: "long",
			v: 11
		},
		FlRs: {
			t: "long",
			v: 52642770
		}
	};
	if (l == "Phtc") d = {
		Dtl: {
			t: "long",
			v: 10
		},
		Drkn: {
			t: "long",
			v: 4
		}
	};
	if (l == "Plst") d = {
		ImgB: {
			t: "long",
			v: 20
		},
		Smth: {
			t: "long",
			v: 2
		},
		LghP: {
			t: "enum",
			v: {
				LghP: "LPTp"
			}
		}
	};
	if (l == "Rtcl") d = {
		Dnst: {
			t: "long",
			v: 12
		},
		BlcL: {
			t: "long",
			v: 40
		},
		WhtL: {
			t: "long",
			v: 5
		},
		FlRs: {
			t: "long",
			v: 301835400
		}
	};
	if (l == "Stmp") d = {
		LgDr: {
			t: "long",
			v: 25
		},
		Smth: {
			t: "long",
			v: 4
		}
	};
	if (l == "TrnE") d = {
		ImgB: {
			t: "long",
			v: 25
		},
		Smth: {
			t: "long",
			v: 11
		},
		Cntr: {
			t: "long",
			v: 17
		},
		FlRs: {
			t: "long",
			v: 461109340
		}
	};
	if (l == "WtrP") d = {
		FbrL: {
			t: "long",
			v: 15
		},
		Brgh: {
			t: "long",
			v: 60
		},
		Cntr: {
			t: "long",
			v: 80
		},
		FlRs: {
			t: "long",
			v: 83852682
		}
	};
	if (l == "GlwE") d = {
		EdgW: {
			t: "long",
			v: 1
		},
		EdgB: {
			t: "long",
			v: 10
		},
		Smth: {
			t: "long",
			v: 1
		}
	};
	if (l == "Crql") d = {
		CrcS: {
			t: "long",
			v: 15
		},
		CrcD: {
			t: "long",
			v: 6
		},
		CrcB: {
			t: "long",
			v: 9
		},
		FlRs: {
			t: "long",
			v: 495615720
		}
	};
	if (l == "Grn") d = {
		Intn: {
			t: "long",
			v: 40
		},
		Cntr: {
			t: "long",
			v: 50
		},
		Grnt: {
			t: "enum",
			v: {
				Grnt: "GrnR"
			}
		},
		FlRs: {
			t: "long",
			v: 217582197
		}
	};
	if (l == "MscT") d = {
		TlSz: {
			t: "long",
			v: 12
		},
		GrtW: {
			t: "long",
			v: 3
		},
		LghG: {
			t: "long",
			v: 9
		},
		FlRs: {
			t: "long",
			v: 25445584
		}
	};
	if (l == "Ptch") d = {
		SqrS: {
			t: "long",
			v: 4
		},
		Rlf: {
			t: "long",
			v: 8
		},
		FlRs: {
			t: "long",
			v: 383529723
		}
	};
	if (l == "StnG") d = {
		ClSz: {
			t: "long",
			v: 10
		},
		BrdT: {
			t: "long",
			v: 4
		},
		LghI: {
			t: "long",
			v: 0
		},
		FlRs: {
			t: "long",
			v: 319935998
		}
	};
	if (l == "Txtz") d = {
		TxtT: {
			t: "enum",
			v: {
				TxtT: "TxBr"
			}
		},
		Scln: {
			t: "long",
			v: 100
		},
		Rlf: {
			t: "long",
			v: 10
		},
		LghD: {
			t: "enum",
			v: {
				LghD: "LDBL"
			}
		},
		InvT: {
			t: "bool",
			v: !1
		}
	};
	d.__name = "Filter Gallery";
	d.classID = "GEfc";
	d.GEfk = {
		t: "enum",
		v: {
			GEft: l
		}
	};
	d.GELv = {
		t: "bool",
		v: !0
	};
	return d
};

TextStyleHelper.RC = function(l, d) {
	for (var A = 0; A < d.length; A++) ~~(d[A] = (l[4 * A] + l[4 * A + 1] + l[4 * A + 2]) * (1 / 3))
};

TextStyleHelper.aa1 = function(l, d, G, b) {
	var V = UPNG.quantize(l, d);
	V = {
		F0: V.inds,
		SV: V.plte
	};
	var Q = Math.floor((G + b) * .015);
	if (Q != 0) PixelUtil.ml.abY(V.F0, G, b, Q);
	return V
};

TextStyleHelper.Qz = function(l, d, G, b, V, Q, t) {
	l = G.GEfk.v.GEft;
	var I = d.rect,
		y = I.m,
		e = I.n,
		M = y * e,
		R = G.FlRs ? G.FlRs.v >>> 1 : 0;

	function J(D) {
		return D.o << 24 | D.J << 16 | D.k << 8 | 255
	}
	if (l == "ClrP") PixelUtil.fx.arR(d.buffer, y, e, Q.buffer, [G.Pncl.v, G.StrP.v, G.PprB.v]);
	if (l == "Ct") {
		var n = G.NmbL.v,
			r = G.EdgS.v,
			T = TextStyleHelper.aa1(d.buffer.buffer, n * 2, y, e);
		for (var A = 0; A < T.F0.length; A++) T.F0[A]++;
		var j = new Uint8Array((y + 2) * (e + 2));
		PixelUtil.copyBufferRect(T.F0, new Rect(1, 1, y, e), j, new Rect(0, 0, y + 2, e + 2));
		var g = PixelUtil.vec.rs(j, y + 2, e + 2, r, !1),
			Y = new Matrix2D(1, 0, 0, 1, -1, -1);
		for (var A = 0; A < g.length; A++) PixelUtil.vec.transformCoords(g[A].path.C, Y, g[A].path.C);
		var k = [],
			F = T.SV;
		for (var A = 0; A < F.length; A++) {
			var D = F[A].est.q;
			k.push({
				o: Math.round(255 * D[0]),
				J: Math.round(255 * D[1]),
				k: Math.round(255 * D[2]),
				aS: Math.round(255 * D[3])
			})
		}
		var q = PixelUtil.getScratch2dContext(y, e);
		for (var A = 0; A < g.length; A++) {
			var H = g[A],
				D = k[H.color - 1];
			if (D.aS == 0) continue;
			q.fillStyle = "rgba(" + D.o + "," + D.J + "," + D.k + "," + D.aS / 255 + ")";
			q.beginPath();
			Typr.U.pathToContext({
				crds: H.path.C,
				cmds: H.path.F
			}, q);
			q.fill()
		}
		if (!I.W6()) {
			var W = q.getImageData(0, 0, y, e);
			PixelUtil.copyByteBuffer(W.data, Q.buffer)
		}
	}
	if (l == "DryB") PixelUtil.fx.axq(d.buffer, y, e, Q.buffer, [G.BrsS.v, G.BrsD.v, G.Txtr.v]);
	if (l == "FlmG") PixelUtil.fx.a0G(d.buffer, y, e, Q.buffer, [G.Grn.v, G.HghA.v, G.Intn.v, R]);
	if (l == "Frsc") PixelUtil.fx.ava(d.buffer, y, e, Q.buffer, [G.BrsS.v, G.BrsD.v, G.Txtr.v]);
	if (l == "NGlw") PixelUtil.fx.a01(d.buffer, y, e, Q.buffer, [G.Sz.v, G.Brgh.v, J(PixelUtil.color.sampleGradientColor(G.Clr.v)), J(b), J(V)]);
	if (l == "PltK") PixelUtil.fx.aaP(d.buffer, y, e, Q.buffer, [G.StrS.v, G.StDt.v, G.Sftn.v]);
	if (l == "PstE") PixelUtil.fx.aau(d.buffer, y, e, Q.buffer, [G.EdgT.v, G.EdgI.v, G.Pstr.v]);
	if (l == "RghP") PixelUtil.fx.a9q(d.buffer, y, e, Q.buffer, [G.StrL.v, G.StDt.v, TextStyleHelper.N5.indexOf(G.TxtT.v.TxtT), G.Scln.v, G.Rlf.v, TextStyleHelper.WA.indexOf(G.LghD.v.LghD), G.InvT.v]);
	if (l == "SmdS") PixelUtil.fx.aqV(d.buffer, y, e, Q.buffer, [G.StrL.v, G.HghA.v, G.Intn.v, G.FlRs.v, R]);
	if (l == "Spng") PixelUtil.fx.a8F(d.buffer, y, e, Q.buffer, [G.BrsS.v, G.Dfnt.v, G.Smth.v, G.FlRs.v, R]);
	if (l == "Undr") PixelUtil.fx.a8n(d.buffer, y, e, Q.buffer, [G.BrsS.v, G.TxtC.v, TextStyleHelper.N5.indexOf(G.TxtT.v.TxtT), G.Scln.v, G.Rlf.v, TextStyleHelper.WA.indexOf(G.LghD.v.LghD), G.InvT.v]);
	if (l == "Wtrc") PixelUtil.fx.a0F(d.buffer, y, e, Q.buffer, [G.BrsD.v, G.ShdI.v, G.Txtr.v]);
	if (l == "AccE") PixelUtil.fx.afO(d.buffer, y, e, Q.buffer, [G.EdgW.v, G.EdgB.v, G.Smth.v]);
	if (l == "AngS") PixelUtil.fx.avu(d.buffer, y, e, Q.buffer, [G.DrcB.v, G.StrL.v, G.Shrp.v]);
	if (l == "Crsh") PixelUtil.fx.abw(d.buffer, y, e, Q.buffer, [G.StrL.v, G.Shrp.v, G.Strg.v]);
	if (l == "DrkS") PixelUtil.fx.amg(d.buffer, y, e, Q.buffer, [G.Blnc.v, G.BlcI.v, G.WhtI.v]);
	if (l == "InkO") PixelUtil.fx.avb(d.buffer, y, e, Q.buffer, [G.StrL.v, G.DrkI.v, G.LghI.v]);
	if (l == "Smie") PixelUtil.fx.alG(d.buffer, y, e, Q.buffer, [G.StrW.v, G.StrP.v, G.Cntr.v]);
	if (l == "DfsG") PixelUtil.fx.a3q(d.buffer, y, e, Q.buffer, [G.Grns.v, G.GlwA.v, G.ClrA.v, J(V), R]);
	if (l == "CntC") PixelUtil.fx.afn(d.buffer, y, e, Q.buffer, [G.FrgL.v, G.BckL.v, TextStyleHelper.N5.indexOf(G.TxtT.v.TxtT), G.Scln.v, G.Rlf.v, TextStyleHelper.WA.indexOf(G.LghD.v.LghD), G.InvT.v, J(V), J(b)]);
	if (l == "ChlC") PixelUtil.fx.aja(d.buffer, y, e, Q.buffer, [G.ChrA.v, G.ChlA.v, G.StrP.v, R, J(V), J(b)]);
	var Z = l == "GraP" || l == "Chrc" || l == "Plst" || l == "Rtcl" || l == "Stmp" || l == "TrnE";
	if (Z) {
		var B = PixelUtil.allocBytes(y * e);
		if (l == "GraP") PixelUtil.fx.a1p(d.buffer, y, e, Q.buffer, [G.StrL.v, G.LgDr.v, TextStyleHelper.Kc.indexOf(G.SDir.v.StrD), R]);
		if (l == "Chrc") PixelUtil.fx.agJ(d.buffer, y, e, Q.buffer, [G.ChAm.v, G.Dtl.v, G.LgDr.v]);
		if (l == "Plst") PixelUtil.fx.a8b(d.buffer, y, e, Q.buffer, [G.ImgB.v, TextStyleHelper.gF.indexOf(G.LghP.v.LghP), G.Smth.v]);
		if (l == "Rtcl") PixelUtil.fx.ajj(d.buffer, y, e, Q.buffer, [G.Dnst.v, G.BlcL.v, G.WhtL.v, R]);
		if (l == "Stmp") PixelUtil.fx.acu(d.buffer, y, e, Q.buffer, [G.LgDr.v, G.Smth.v]);
		if (l == "TrnE") PixelUtil.fx.a2F(d.buffer, y, e, Q.buffer, [G.ImgB.v, G.Smth.v, G.Cntr.v, R]);
		PixelUtil.extractChannelFromRgba(Q.buffer, B, 0);
		TextStyleHelper.fo(B, Q.buffer, b, V)
	}
	if (l == "NtPr") PixelUtil.fx.awA(d.buffer, y, e, Q.buffer, [G.ImgB.v, G.Grns.v, G.Rlf.v, J(b), J(V), R]);
	if (l == "WtrP") PixelUtil.fx.aqg(d.buffer, y, e, Q.buffer, [G.FbrL.v, G.Brgh.v, G.Cntr.v, R >>> 1]);
	if (l == "Crql") PixelUtil.fx.ab1(d.buffer, y, e, Q.buffer, [G.CrcS.v, G.CrcD.v, G.CrcB.v, R]);
	if (l == "Grn") PixelUtil.fx.aiJ(d.buffer, y, e, Q.buffer, [G.Intn.v, TextStyleHelper.gJ.indexOf(G.Grnt.v.Grnt), G.Cntr.v, J(b), J(V), R]);
	if (l == "MscT") PixelUtil.fx.a2E(d.buffer, y, e, Q.buffer, [G.TlSz.v, G.GrtW.v, G.LghG.v, R]);
	if (l == "Ptch") PixelUtil.fx.atS(d.buffer, y, e, Q.buffer, [G.SqrS.v, G.Rlf.v, R]);
	if (l == "Phtc") {
		function a(gu, jt, I, e7) {
			PixelUtil.sX.ys(gu, jt, I, e7);
			for (var A = 0; A < M; A++) jt[A] = Math.max(0, Math.min(255, 128 + gu[A] - jt[A]))
		}
		var m = G.Dtl.v,
			p = G.Drkn.v,
			c = PixelUtil.allocBytes(M);
		PixelUtil.rgbaToGrayPlane(d.buffer, c);
		var v = PixelUtil.allocBytes(M);
		a(c, v, I, 1);
		if (m == 1) {
			m = 2;
			p = Math.round(p / 4)
		}
		var i = PixelUtil.allocBytes(M);
		a(c, i, I, m);
		for (var A = 0; A < M; A++) c[A] = Math.max(0, Math.min(255, 255 - (v[A] - i[A]) * p));
		TextStyleHelper.fo(c, Q.buffer, b, V)
	}
	if (l == "Spt" || l == "SprS") {
		var z, P = 1,
			C = 1;
		z = {
			iJ: Math.floor(y / C),
			Tq: Math.floor(e / C)
		};
		z.map = new Float32Array(z.iJ * z.Tq * 2);
		var h = new PixelUtil.blend.IR(G.FlRs.v),
			L = new Float32Array(8192),
			U = G.SprR.v,
			S = U < 20 ? .018 * U : .36 + (U - 20) * .128;
		if (l == "SprS") {
			S = .07 + [0, .02, .04, .06, .08, .1, .12, .14, .16, .18, .2, .22, .24, .26, .28, .3, .34, .38, .5, .65, .75, .85, 1, 1.5, 2.2, 3][U]
		}
		for (var A = 0; A < 8192; A++) L[A] = (-1 + 2 * h.get()) * S * 70;
		for (var E = 0; E < e; E++)
			for (var x = 0; x < y; x++) {
				var K = E * y + x << 1;
				z.map[K] = L[K % 7919];
				z.map[K + 1] = L[(K + 1) % 7919]
			}
		var u = z.map.slice(0),
			bC = l == "Spt" ? G.Smth.v - 1 : 1;
		if (l == "Spt" && bC != 0) {
			TextStyleHelper.anE(z.map, u, y, e, bC);
			TextStyleHelper.an0(u, z.map, y, e, bC)
		}
		if (l == "SprS") {
			var O = G.StrL.v >>> 1,
				$ = O == 0 ? 2 : 1;
			TextStyleHelper.anE(z.map, u, y, e, $);
			TextStyleHelper.an0(u, z.map, y, e, $);
			if (O != 0) {
				var gX = TextStyleHelper.Kc.indexOf(G.SDir.v.StrD),
					_ = [1, 1, 1, 0][gX],
					jI = [-1, 0, 1, 1][gX],
					iw = 2 * O + 1,
					hn = 1 / iw;
				for (var E = 0; E < e; E++)
					for (var x = 0; x < y; x++) {
						var K = E * y + x << 1,
							jq = 0,
							iv = 0;
						for (var A = 0; A < iw; A++) {
							var kq = Math.max(0, Math.min(y - 1, x - (O + A) * _)),
								eE = Math.max(0, Math.min(e - 1, E - (O + A) * jI)),
								e8 = eE * y + kq << 1;
							jq += z.map[e8];
							iv += z.map[e8 + 1]
						}
						u[K] = jq * hn;
						u[K + 1] = iv * hn
					}
				z.map = u
			}
		}
		PixelUtil.Ad.Dq(d.buffer, Q.buffer, y, e, null, z.map, z.iJ, z.Tq, P)
	}
	if (l == "BsRl" || l == "PlsW" || l == "Chrm") {
		var aI = Date.now(),
			dK = PixelUtil.allocBytes(M),
			jC = dK.slice(0);
		PixelUtil.rgbaToGrayPlane(d.buffer, dK);
		var m = G.Dtl.v,
			d7 = G.Smth.v;
		if (m != 15) {
			PixelUtil.sX.Dj(dK, jC, I, Math.round((15 - m) * .5));
			PixelUtil.copyByteBuffer(jC, dK)
		}
		var hS = 1.4 / y,
			eH = 1.4 / e,
			kA = new Float32Array(M),
			gq = new Float32Array(M),
			hb = new Float32Array(Q.buffer.buffer);
		for (var E = 0; E < e; E++)
			for (var x = 0; x < y; x++) {
				var A = E * y + x,
					_ = x == y - 1 ? dK[A] - dK[A - 1] : dK[A + 1] - dK[A],
					jI = E == e - 1 ? dK[A] - dK[A - y] : dK[A + y] - dK[A],
					ex = x * hS - .7,
					fs = E * eH - .7;
				kA[A] = _ == 0 ? ex : _ * .4;
				gq[A] = jI == 0 ? fs : jI * .4
			}
		if (l == "BsRl") {
			var f_ = (2 + TextStyleHelper.WA.indexOf(G.LghD.v.LghD)) * Math.PI * .25,
				jq = Math.cos(f_);
			if (Math.abs(jq) < .1) jq = 0;
			jq = Math.sign(jq);
			var iv = Math.sin(f_);
			if (Math.abs(iv) < .1) iv = 0;
			iv = Math.sign(iv);
			var bD = 1 / (jq * jq + iv * iv);
			for (var E = 0; E < e; E++)
				for (var x = 0; x < y; x++) {
					var A = E * y + x,
						ae = Math.max(-1, Math.min(1, jq * kA[A])),
						em = Math.max(-1, Math.min(1, iv * gq[A]));
					jC[A] = 128 + 127 * (ae + em) * bD
				}
			if (d7 != 1) {
				PixelUtil.sX.Dj(jC, dK, I, Math.round((d7 - 1) * .5));
				PixelUtil.copyByteBuffer(dK, jC)
			}
			TextStyleHelper.fo(jC, Q.buffer, b, V)
		} else {
			if (l == "Chrm") d7 = 5 + d7;
			if (d7 > 1) TextStyleHelper.OR(kA, gq, hb, I, d7 - 1);
			if (l == "PlsW") {
				var dY = new Uint8Array(kA.buffer);
				for (var A = 0; A < M; A++) {
					var f7 = A << 2,
						_ = kA[A],
						jI = gq[A],
						bM = 1 / (Math.sqrt(1 + _ * _) * Math.sqrt(1 + jI * jI)),
						iP = bM * bM,
						jp = iP * iP,
						D = ~~(255 * (jp * jp * iP));
					dY[f7 + 0] = D;
					dY[f7 + 1] = D;
					dY[f7 + 2] = D;
					dY[f7 + 3] = D
				}
				Q.buffer.set(d.buffer);
				PixelUtil.blend.compositeBlend("norm", dY, I, Q.buffer, I, I, G.HghS.v / 20)
			} else if (l == "Chrm") {
				var hG = Q.buffer,
					hf = y >>> 1,
					d2 = e >>> 1;
				for (var A = 0; A < M; A++) {
					var f7 = A << 2,
						_ = kA[A],
						jI = gq[A],
						gu = {
							x: 1,
							y: 0,
							V8: _
						};
					PatternHelper.HW(gu);
					var jt = {
						x: 0,
						y: 1,
						V8: jI
					};
					PatternHelper.HW(jt);
					var ip = PatternHelper.as1(gu, jt),
						aQ = 1 / ip.V8,
						iL = ~~Math.max(0, Math.min(y - 1, hf - ip.x * aQ * hf)),
						jx = ~~Math.max(0, Math.min(e - 1, d2 - ip.y * aQ * d2)),
						D = dK[jx * y + iL];
					hG[f7 + 0] = D;
					hG[f7 + 1] = D;
					hG[f7 + 2] = D
				}
			}
		}
	}
	if (l == "Gls" || l == "OcnR" || l == "Txtz") {
		var ep = l == "OcnR" ? 2 : TextStyleHelper.N5.indexOf(G.TxtT.v.TxtT),
			gz = TextStyleHelper.Mn(ep),
			ed = gz[0],
			dK = gz[1],
			bo = ed.m,
			d0 = ed.n,
			iw = 24,
			cH = 0,
			e6, fi;

		function c0(h1, a0, g5) {
			return ~~(cv * (h1 + a0) + 8192) & 127
		}
		var kA = new Float32Array(M),
			gq = new Float32Array(M),
			hb = new Float32Array(Q.buffer.buffer),
			cv = l == "OcnR" ? 1 / (1 + (G.RplS.v - 1) * .1) : 100 / G.Scln.v;
		if (ep == 3) cv *= 32 / 22.2;
		var aI = Date.now(),
			iH = cv,
			hS = 1.4 / y,
			eH = 1.4 / e;
		if (l == "Txtz") {
			iH *= 1 / 255;
			iw = 256
		}
		for (var E = 0; E < e; E++) {
			var bS = c0(E, I.y, d0),
				eE = bS + 1 & 127;
			for (var x = 0; x < y; x++) {
				var A = E * y + x,
					gg = c0(x, I.x, bo),
					kq = gg + 1 & 127,
					bG = 0,
					jj = 0,
					ay = 0;
				if (l == "Txtz") {
					bG = PixelUtil.canvas.Hx(cv * x, cv * E, dK, 128, 128);
					jj = PixelUtil.canvas.Hx(cv * x, cv * E + 1, dK, 128, 128);
					ay = PixelUtil.canvas.Hx(cv * x + 1, cv * E, dK, 128, 128)
				} else {
					bG = dK[bS * bo + gg];
					jj = dK[eE * bo + gg];
					ay = dK[bS * bo + kq]
				}
				kA[A] = Math.max(-iw, Math.min((ay - bG) * iH, iw));
				gq[A] = Math.max(-iw, Math.min((jj - bG) * iH, iw))
			}
		}
		if (l == "Txtz") TextStyleHelper.ahy(kA, gq, hb, I, 6);
		else TextStyleHelper.OR(kA, gq, hb, I, l == "Txtz" ? 1 : l == "OcnR" ? 3.5 / cv : G.Smth.v);
		if (l == "Txtz") cH = G.InvT.v ? -1 : 1;
		else if (l == "Gls") {
			cH = [1, .4, .5, .5][ep] * (Math.exp(G.Dstr.v * .155) - 1);
			if (G.InvT.v) cH = -cH
		} else {
			cH = .5 * (Math.exp(G.RplM.v * .155) - 1)
		}
		var hG = Q.buffer;
		if (l == "Txtz") {
			var f_ = (2 + TextStyleHelper.WA.indexOf(G.LghD.v.LghD)) * Math.PI * .25,
				jq = Math.cos(f_),
				iv = Math.sin(f_);
			e6 = {
				x: jq,
				y: iv,
				V8: 0
			};
			PatternHelper.HW(e6);
			fi = G.Rlf.v;
			fi = fi / 4 + Math.max(0, (fi - 35) * 2)
		}

		function et(gu, jt, c7) {
			var h_ = PixelUtil.blend.overF(jt, gu, 1),
				h1 = (1 - c7) * gu + c7 * (c7 * jt + (1 - c7) * h_);
			return h1 * 255
		}
		for (var E = 0; E < e; E++)
			for (var x = 0; x < y; x++) {
				var A = E * y + x,
					f7 = A << 2,
					_ = kA[A],
					jI = gq[A],
					gu = {
						x: 1,
						y: 0,
						V8: _
					};
				PatternHelper.HW(gu);
				var jt = {
					x: 0,
					y: 1,
					V8: jI
				};
				PatternHelper.HW(jt);
				var ip = PatternHelper.as1(gu, jt);
				if (l == "Txtz") {
					var aD = PatternHelper.ahS(ip, e6) * cH,
						c7 = 1,
						D = 1;
					if (aD < 0) {
						D = 0;
						aD = -aD
					}
					c7 = Math.min(1, aD * fi);
					hG[f7 + 0] = ~~et(d.buffer[f7] * (1 / 255), D, c7);
					hG[f7 + 1] = ~~et(d.buffer[f7 + 1] * (1 / 255), D, c7);
					hG[f7 + 2] = ~~et(d.buffer[f7 + 2] * (1 / 255), D, c7)
				} else {
					var aQ = cH / ip.V8,
						iL = ~~Math.max(0, Math.min(y - 1, x - ip.x * aQ)),
						jx = ~~Math.max(0, Math.min(e - 1, E - ip.y * aQ)),
						ga = jx * y + iL << 2;
					hG[f7 + 0] = d.buffer[ga];
					hG[f7 + 1] = d.buffer[ga + 1];
					hG[f7 + 2] = d.buffer[ga + 2]
				}
			}
	}
	if (l == "PntD") {
		var cY = G.Shrp.v * .4,
			i4 = G.BrsT.v.BrsT,
			jS = {
				BrSm: [.75],
				BrsL: [.85],
				BrDR: [.68],
				BrsW: [.75],
				BrbW: [.78],
				BrSp: [.62]
			}[i4],
			e7 = Math.round(G.Sz.v * .5);
		PixelUtil.g6.bJ = jS[0];
		PixelUtil.g6.nl(d.buffer, Q.buffer, y, e, e7, 0, []);
		var ct = [-.7, -1, -.7, -1, 10, -1, -.7, -1, -.7];
		ct = PixelUtil.s9.nn(ct);
		var bj = Q.buffer.slice(0);
		PixelUtil.s9.iZ(bj, Q.buffer, y, e, ct, 0);
		for (var A = 0; A < d.buffer.length; A++) {
			var jo = Q.buffer[A] - bj[A];
			Q.buffer[A] = Math.max(0, Math.min(255, bj[A] + cY * jo))
		}
	}
	if (l == "GlwE") {
		var er = Q.buffer.slice(0);
		PixelUtil.g6.bJ = .5;
		PixelUtil.g6.nl(d.buffer, er, y, e, G.Smth.v >>> 1, 0, []);
		PixelUtil.s9.n3(er, Q.buffer, y, e);
		PixelUtil.copyByteBuffer(Q.buffer, er);
		PixelUtil.invertUint32Buffer(er);
		PixelUtil.andMaskUint32(er, 4278190080, 16777215);
		PixelUtil.u5.a7l(er, Q.buffer, y, e, (G.EdgW.v >>> 1) * 2 + 1, !0);
		var iV = G.EdgB.v / 10;
		for (var A = 0; A < er.length; A++) {
			if ((A & 3) == 3) continue;
			var h_ = Q.buffer[A];
			Q.buffer[A] = Math.max(0, Math.min(255, h_ * iV))
		}
	}
	if (l == "StnG") {
		PixelUtil.e0.ay3(d.buffer, y, e, Q.buffer, G.ClSz.v, [Math.round(b.o), Math.round(b.J), Math.round(b.k)], G.BrdT.v)
	}
	if (l == "HlfS") {
		var i2 = G.HlSz.v,
			kj = i2 * 2 + 1,
			a3 = G.Cntr.v,
			ke = TextStyleHelper.pj.indexOf(G.ScrT.v.ScrT),
			M = y * e,
			b1 = M * 4,
			fb = PixelUtil.allocBytes(M),
			eg = d.buffer,
			j7 = 0,
			iM = 0;
		TextStyleHelper.RC(eg, fb);
		var gK = fb.slice(0);
		PixelUtil.sX.w3(gK, fb, I, i2);
		var cN = Math.PI / kj,
			iO = new Float64Array(y),
			jq = new Float64Array(y),
			b6 = new Float64Array(2 * y);
		for (var x = 0; x < y; x++) {
			var gg = (x - (y >>> 1)) * cN;
			iO[x] = gg * gg;
			jq[x] = Math.cos(gg);
			var _ = x << 1;
			b6[_] = Math.sin(_ * (1 / 4.5));
			b6[_ + 1] = Math.sin((_ + 1) * (1 / 4.5))
		}
		for (var E = 0; E < e; E++) {
			var bS = (E - (e >>> 1)) * cN,
				iv = Math.cos(bS),
				jr = bS * bS;
			for (var x = 0; x < y; x++) {
				var D = iv;
				if (ke == 0) {
					var bH = .5 + Math.sqrt(iO[x] + jr) * 4.5;
					D = b6[~~bH]
				} else if (ke == 1) {
					D = jq[x] * iv
				}
				var A = E * y + x,
					gi = fb[A] * (.75 + .25 * D),
					c7 = eg[(A << 2) + 3] * (1 / 255),
					cj = Math.max(0, Math.min(255, ~~gi));
				j7 += cj * c7, iM += c7;
				fb[A] = cj
			}
		}
		j7 /= iM;
		var iA = 128 + 1.26 * (j7 - 128),
			iV = .08 + .25 * Math.abs((128 - j7) / 128),
			g9 = 1 + iV * a3;
		for (var A = 0; A < M; A++) {
			var gi = iA + (fb[A] - iA) * g9;
			fb[A] = Math.max(0, Math.min(255, ~~gi))
		}
		if (a3 > 46) PixelUtil.round(fb);
		TextStyleHelper.fo(fb, Q.buffer, b, V)
	}
	for (var A = 0; A < d.buffer.length; A += 4) Q.buffer[A + 3] = d.buffer[A + 3]
};

TextStyleHelper.fo = function(l, d, G, b) {
	var V = l.length,
		Q = G.o,
		t = G.J,
		I = G.k,
		y = b.o,
		e = b.J,
		M = b.k;
	for (var A = 0; A < V; A++) {
		var R = l[A] * (1 / 255),
			J = 1 - R,
			n = A << 2;
		d[n] = ~~(Q * J + y * R);
		d[n + 1] = ~~(t * J + e * R);
		d[n + 2] = ~~(I * J + M * R)
	}
};

TextStyleHelper.Mn = function(l) {
	if (l == 6) l = 2;
	var d = "blocks canvas frosted tinylens brick burlap".split(" ")[l];
	if (TextStyleHelper.Zk == null) TextStyleHelper.Zk = [];
	if (TextStyleHelper.Zk[l] == null) {
		var G, b;
		if (l == 2) {
			b = new Rect(0, 0, 128, 128);
			var V = FilterHelper.oT("AdNs");
			V.Mnch.v = !0;
			V.Dstr.v.Dstr = "Gsn";
			V.Nose.v.val = 50;
			var G = PixelUtil.allocBytes(b.O() * 4),
				Q = G.slice(0);
			new Uint32Array(Q.buffer).fill(4286611584);
			FilterHelper.Qz("AdNs", {
				buffer: Q,
				rect: b
			}, V, 0, 0, {
				buffer: G,
				rect: b
			})
		} else {
			var t = FormatHandler.RT.get("tex/" + d, !0)[0];
			b = t.uA;
			G = new Uint8Array(t.data)
		}
		var I = PixelUtil.allocBytes(b.O());
		PixelUtil.extractChannelFromRgba(G, I, 0);
		TextStyleHelper.Zk[l] = [b, I]
	}
	return TextStyleHelper.Zk[l]
};

TextStyleHelper.OR = function(l, d, G, b, V) {
	if (V <= 1) {
		V = Math.round(V);
		TextStyleHelper.ahy(l, d, G, b, [1, 16, 4][V]);
		return
	}
	var Q = V * .42;
	if (l) {
		PixelUtil.sX.sU(l, G, b, Q, 3);
		l.set(G)
	}
	if (d) {
		PixelUtil.sX.sU(d, G, b, Q, 3);
		d.set(G)
	}
};

TextStyleHelper.ahy = function(l, d, G, b, V) {
	var Q = PixelUtil.s9.nn([1, 2, 1, 2, V, 2, 1, 2, 1]);
	if (l) {
		G.set(l);
		PixelUtil.s9.K_(l, G, b.m, b.n, Q);
		l.set(G)
	}
	if (d) {
		G.set(d);
		PixelUtil.s9.K_(d, G, b.m, b.n, Q);
		d.set(G)
	}
};

TextStyleHelper.dn = function(l) {
	if (l == null) return new Point2D(0, 0);
	var d = 0,
		G = l.GEfs ? l.GEfs.v : [{
			v: l
		}];
	for (var A = 0; A < G.length; A++) {
		var b = G[A].v,
			Q = 1e4;
		if (b.GELv && !b.GELv.v) continue;
		var V = b.GEfk.v.GEft;
		if (V == "GlwE" || V == "Phtc" || V == "BsRl" || V == "PlsW" || V == "Chrm" || V == "Gls" || V == "OcnR" || V == "InkO") Q = 0;
		d = Math.max(d, Q)
	}
	return new Point2D(d, d)
};

TextStyleHelper.abz = function(l) {
	var d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		G = [0, .6, .7, .8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.6, 3, 4, 5][l];
	for (var A = 0; A < 13; A++) {
		var b = A - 6;
		d[A] = 1 / (G * Math.sqrt(2 * Math.PI)) * Math.exp(-.5 * (b / G) * (b / G))
	}
	return d
};

TextStyleHelper.anE = function(l, d, G, b, V) {
	var Q = TextStyleHelper.abz(V),
		t = 6,
		I = 13;
	for (var y = 0; y < b; y++)
		for (var e = 0; e < G; e++) {
			var M = y * G + e << 1,
				R = 0,
				J = 0;
			for (var A = 0; A < I; A++) {
				var n = e + A - t,
					r = n < 0 ? 0 : n >= G ? G - 1 : n,
					T = (y * G + r) * 2,
					j = Q[A];
				R += j * l[T];
				J += j * l[T + 1]
			}
			d[M] = R;
			d[M + 1] = J
		}
};

TextStyleHelper.an0 = function(l, d, G, b, V) {
	var Q = TextStyleHelper.abz(V),
		t = 6,
		I = 13;
	for (var y = 0; y < b; y++)
		for (var e = 0; e < G; e++) {
			var M = y * G + e << 1,
				R = 0,
				J = 0;
			for (var A = 0; A < I; A++) {
				var n = y + A - t,
					r = n < 0 ? 0 : n >= b ? b - 1 : n,
					T = (r * G + e) * 2,
					j = Q[A];
				R += j * l[T];
				J += j * l[T + 1]
			}
			d[M] = R;
			d[M + 1] = J
		}
};

function au() {}
au.hY = [2, 5, 5, 7, 4, 4];
au.CP = "norm,diss,dark,mul ,idiv,lbrn,dkCl,lite,scrn,div ,lddg,lgCl,over,sLit,hLit,vLit,lLit,pLit,hMix,diff,smud,fsub,fdiv,hue ,sat ,colr,lum ".split(",");
au.Point2D = "Nrml Dslv Drkn Mltp CBrn linearBurn darkerColor Lghn Scrn CDdg linearDodge lighterColor Ovrl SftL HrdL vividLight linearLight pinLight hardMix Dfrn Xclu blendSubtraction blendDivide H Strt Clr Lmns".split(" ");
au.YJ = [
	[15, 10, 0],
	[15, 10, 1],
	[15, 10, 2],
	[15, 10, 3],
	[15, 10, 4],
	[15, 10, 5],
	[15, 10, 6],
	[15, 10, 7],
	[15, 10, 8],
	[15, 10, 9],
	[15, 10, 10],
	[15, 10, 11],
	[15, 10, 12],
	[15, 10, 13],
	[15, 10, 14],
	[15, 10, 15],
	[15, 10, 16],
	[15, 10, 17],
	[15, 10, 18],
	[15, 10, 19],
	[15, 10, 20],
	[15, 10, 21],
	[15, 10, 22],
	[15, 10, 23],
	[15, 10, 24],
	[15, 10, 25],
	[15, 10, 26]
];
au.El = ["normal", null, "darken", "multiply", "color-burn", null, null, "lighten", "screen", "color-dodge", null, null, "overlay", "soft-light", "hard-light", null, null, null, null, "difference", "exclusion", null, null, "hue", "saturation", "color", "luminosity"];
au.bS = function(l) {
	if (l == "passThrough") return "pass";
	return au.CP[au.Point2D.indexOf(l)]
};
au.ci = function(l) {
	if (l == "pass") return "passThrough";
	return au.Point2D[au.CP.indexOf(l)]
};
au.getName = function(l) {
	return au.YJ[au.CP.indexOf(l)]
};
