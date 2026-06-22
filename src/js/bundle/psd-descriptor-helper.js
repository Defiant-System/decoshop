
var PsdDescriptorHelper = {};

PsdDescriptorHelper.Fw = function(l, d) {
	var G = {
		t: "Clss",
		v: {
			classID: l
		}
	};
	if (d) G = {
		t: "Enmr",
		v: {
			classID: l,
			typeID: "Ordn",
			enum: "Trgt"
		}
	};
	return {
		t: "obj ",
		v: [G]
	}
};

PsdDescriptorHelper.D1 = function(l, d) {
	var G = {
		classID: "Lyr"
	};
	G[l] = d;
	return {
		kT: "set",
		a0: {
			classID: "null",
			null: PsdDescriptorHelper.Fw("Lyr", !0),
			T: {
				t: "Objc",
				v: G
			}
		}
	}
};

PsdDescriptorHelper.azx = function(l, d, G, b, V) {
	var Q = new Action(ActionTypes.E.g5, !0),
		t = [],
		A = 0,
		I = PsdDescriptorHelper.ZT(d, G, b, t);
	while (t.length != 0) {
		var y = t.pop();
		A++;
		if (!y.p) continue;
		console.log(A - 1);
		if (y.kT == "conditional") {
			var e = l.B[l.g[0]],
				M = y.a0.null.v.Cndt,
				R = !1;
			if (M == "Bckg") R = !1;
			else if (M == "Pxel" && l.T8(!1)) R = !0;
			else if (M == "Adjs" && LayerEffectsHelper.detectAdjustmentKey(e.add)) R = !0;
			else if (M == "Shp" && e.add.vogk) R = !0;
			else if (M == "Grup" && e.IQ()) R = !0;
			else if (M == "Opn" && l != null) R = !0;
			else if (M == "32Bt") R = !1;
			else if (M == "RGB") R = !0;
			var J = y.a0.then,
				n = y.a0.else;
			if (R && J) PsdDescriptorHelper.ZT(d, J.v[0].v.val, J.v[1].v.val, t);
			if (!R && n) PsdDescriptorHelper.ZT(d, n.v[0].v.val, n.v[1].v.val, t)
		} else if (y.kT == "stop") {
			if (y.a0.Cntn && y.a0.Cntn.v == !0) window.confirm(y.a0.Msge.v);
			else {
				alert(y.a0.Msge.v);
				break
			}
		} else if (y.kT == "play") {
			var r = y.a0.null.v,
				T = new Action(ActionTypes.E.L, !0);
			T.data = {
				a: ActionTypes.$.du,
				X9: [r[0].v.val, r[1].v.val]
			};
			V.dispatch(T)
		} else {
			Q.data = {
				kT: y.kT,
				a0: y.a0
			};
			V.dispatch(Q)
		}
	}
};

PsdDescriptorHelper.ZT = function(l, d, G, b) {
	var V;
	for (var A = 0; A < l.length; A++) {
		if (l[A].Il != G) continue;
		var Q = l[A].Vm;
		for (var t = 0; t < Q.length; t++) {
			if (Q[t].Il != d) continue;
			V = Q[t].Vm
		}
	}
	var I = V.length;
	for (var A = 0; A < I; A++) b.push(V[I - 1 - A])
};

PsdDescriptorHelper.ahE = function(l) {
	var d = l.kT,
		G = l.a0,
		b, t, I, y, e;
	if (G && G.null) b = G.null.v[0];
	if (G && b == null && G.At) b = G.At.v[0];
	if (b && b.t == "obj ") b = b.v[0];
	var V = b && b.v ? b.v.classID : null,
		Q = ["purge"];
	if (Q.indexOf(d) != -1) return d[0].toUpperCase() + d.slice(1);
	if (d == "GEfc" || d == "paintDaubs") return TextStyleHelper.names[G.GEfk.v.GEft][1];
	e = LayerEffectsHelper.Tb;
	for (t in e)
		if (e[t] == d) I = t;
	e = FilterHelper.Tb;
	for (t in e)
		if (e[t] == d) y = t;
	if (I) {
		var M = LayerEffectsHelper.Gs(I, G);
		if (M != -1) return [4, 16, M];
		return LayerEffectsHelper.names[I]
	}
	if (y) return FilterHelper.names[y];
	var R = PsdDescriptorHelper.asy;
	if (d == "make") {
		if (b) {
			if (V == "AdjL") return [6, 1];
			else if (V == "layerSection") return G.From ? [6, 9] : [6, 20];
			else if (V == "Lyr") return [6, 13];
			else if (V == "Chnl" && b.v.enum == "Msk") return [6, 2];
			else if (V == "contentLayer") return [6, 48, 1];
			else if (V == "BckL") return "Make Background Layer";
			else if (V == "Path") return "Make Path";
			else if (V == "TxLr") return "Make Text Layer";
			else if (V == "slice") return "Make Slices";
			else if (V == "Dcmn") return [11, 7];
			else if (V == "Gd") return [23, 4]
		}
		if (G.Nw) {
			V = G.Nw.v.classID;
			if (V == "Dcmn") return [11, 7];
			else if (V == "Chnl" || V == "SCch") return "New Channel"
		}
	} else if (d == "deselect") {
		if (V == "Path") return "Deselect current path";
		else throw V
	} else if (d == "draw") {
		return "Draw"
	} else if (d == "select") {
		if (V == "Chnl") return "Select " + (b.v.enum == "Msk" ? "Mask " : "") + "Channel";
		else if (V == "Mn") return "Select Panel \"" + b.v.enum + "\"";
		else if (V == "Lyr") {
			if (b.t == "Enmr") return "Select " + {
				Bckw: "Backward",
				Frwr: "Forward",
				Back: "Back",
				Frnt: "Front"
			}[b.v.enum] + " Layer";
			return "Select Layer \"" + b.v.val + "\""
		} else if (V == "Path") return "Select Path";
		else if (V == "Brsh") return "Select Brush";
		else if (V == "Dcmn") return "Select Document"
	} else if (R[d] && V == "Chnl") {
		var J = b.v.keyID == "fsel";
		return R[d] + " " + (J ? "Selection" : "Channel")
	} else if (d == "set") {
		if (V == "Lyr") return "Set Current Layer";
		else if (V == "AdjL") return [6, 39];
		else if (V == "contentLayer") return [6, 48, 2];
		else if (V == "Prpr") {
			var n = b.v.keyID;
			if (n == "TxtS") return "Set Text Style";
			else if (n == "paragraphStyle") return "Set Paragraph Style";
			else if (n == "Lefx") return [11, 6];
			else console.log(n)
		} else if (V == "Clr") return "Set " + (b.v.keyID == "FrgC" ? "Foreground" : "Background") + " color";
		else if (V == "Brsh") return "Set Brush";
		else if (V == "Path") return "Set Work Path";
		else console.log(V)
	} else if (d == "move") {
		if (V == "Lyr") return "Move Layer";
		else if (V == "Chnl" && b.v.keyID == "fsel") return [7, 7];
		else console.log(V)
	} else if (d == "show" || d == "hide") {
		var r = "";
		if (V == "Lyr") + "Layer";
		if (V == "Chnl") + "Channel";
		return (d == "show" ? "Show" : "Hide") + " " + r
	} else if (d == "reset") {
		if (V == "Clr") return "Reset Colors"
	} else if (d == "exchange") {
		if (V == "Clr") return [22, 7, 0]
	} else if (d == "rotateEventEnum") return [2, 5];
	else if (d == "flip") {
		var T = G.Axis.v.Ornt == "Hrzn";
		return [
			[2, 6],
			[22, 4, T ? 2 : 3]
		]
	}
	if (V == "Chnl") {
		if (d == "duplicate") {
			if (b.v.keyID == "fsel") return "Selection to Channel";
			else return "Duplicate Channel"
		}
		if (d == "delete") return "Delete Channel"
	}
	if (d == "transform") return b && b.v.keyID == "fsel" ? [7, 10] : [10, 16];
	var j = {
			cut: [5, 0],
			copyEvent: [5, 1],
			copyToLayer: [6, 49, 0],
			cutToLayer: [6, 49, 1],
			copyMerged: [5, 7],
			paste: [5, 2],
			close: [1, 12, 0],
			save: [1, 2],
			groupEvent: [6, 18],
			ungroup: [6, 19],
			duplicate: [6, 0],
			mergeLayersNew: [6, 12, 0],
			mergeVisible: "Merge Visible",
			flattenImage: [6, 12, 1],
			updatePlacedLayer: [6, 36, 1],
			fade: [2, 11],
			applyImageEvent: [2, 12],
			matchColor: [4, 18],
			fill: [2, 3],
			colorRange: [7, 8],
			desaturate: [19, 7, 0],
			delete: G ? V == "Lyr" ? [6, 31] : "Delete Path" : [2, 2],
			align: [20, 4, 0],
			applyLocking: [6, 57, 1],
			crop: [11, 12, 1],
			placedLayerEditContents: "Edit Contents",
			placedLayerExportContents: "Export Contents",
			placedLayerReplaceContents: "Replace Contents",
			convertMode: "Convert Mode",
			grow: "Grow Selection",
			similar: "Similar Selection",
			newPlacedLayer: [6, 7, 0],
			selectNoLayers: "Deselect Layers",
			canvasSize: [11, 3],
			imageSize: [11, 10],
			rasterizeLayer: [6, 8],
			revealAll: [11, 12, 2],
			divide: "Divide Current Slice",
			collapseAllGroupsEvent: "Collapse All Groups",
			conditional: "If"
		},
		g = j[d];
	if (g == null) g = PsdDescriptorHelper.afJ[d];
	if (g) return g;
	return d
};

PsdDescriptorHelper.afJ = {
	border: [7, 9],
	smoothness: [19, 3, 0],
	expand: [7, 4],
	contract: [7, 5],
	feather: [7, 6],
	inverse: [7, 2]
};

PsdDescriptorHelper.asy = {
	set: "Set",
	add: "Add Transparency",
	addTo: "Add To",
	subtract: "Subtract Transparency",
	subtractFrom: "Subtract From",
	interfaceIconFrameDimmed: "Intersect Transparency",
	interfaceWhite: "Intersect With"
};

PsdDescriptorHelper.a2v = function(l, d, G, b) {
	var V = l.kT,
		Q = l.a0,
		t = !1,
		I = new Action(ActionTypes.E.v, !0),
		M, R, J, n;
	I.G = f.yS;
	var y = new Action(ActionTypes.E.L, !0),
		e = ["purge", "updatePlacedLayer", "convertMode", "convertToProfile"];
	if (e.indexOf(V) != -1) return;
	n = LayerEffectsHelper.Tb;
	for (M in n)
		if (n[M] == V) R = M;
	n = FilterHelper.Tb;
	for (M in n)
		if (n[M] == V) J = M;
	if (V == "fade") R = V;
	if (V == "matchColor") R = "matc";
	if (V == "applyImageEvent") R = "aply";
	if (R) {
		I.G = f.Qi;
		I.data = {
			a: "start",
			ce: R,
			qv: Q
		}
	} else if (J) {
		I.G = f.WH;
		I.data = {
			a: "start",
			_K: J,
			qv: Q
		}
	} else if (V == "GEfc" || V == "paintDaubs") {
		I.G = f.WH;
		I.data = {
			a: "start",
			_K: "GEfc",
			qv: Q
		}
	} else if (V == "imageSize" || V == "canvasSize" || V == "revealAll" || V == "trim" || V == "crop") {
		I.G = f.ja;
		I.data = {
			a: "fromAction",
			lX: l
		}
	} else if (V == "fill" || V == "stroke" || V == "delete" && Q == null) {
		var r = null;
		if (b.g.length != 0) r = b.B[b.g[0]];
		var T = PixelUtil.intToRgb(G.Y7);
		if (r != null && V == "fill" && r.add.TySh) {
			var g = "var c = new SolidColor();  c.rgb.red=" + T.o + ";  c.rgb.green=" + T.J + ";  c.rgb.blue=" + T.k + ";  app.activeDocument.activeLayer.textItem.color = c;";
			y.data = {
				a: ActionTypes.$.WM,
				nM: g
			}
		} else if (r != null && V == "delete" && r.add.TySh) {
			I.G = f.zl;
			I.data = {
				a: "insertText",
				Z: ""
			}
		} else if (r != null && V == "fill" && r.VF()) {
			var I = new Action(ActionTypes.E.g5, !0),
				Q = {
					classID: "setd",
					null: PsdDescriptorHelper.Fw("contentLayer", !0),
					T: {
						t: "Objc",
						v: {}
					}
				};
			f.uj.ON({
				Clr: {
					v: PixelUtil.color.rgbColorDescriptor(PixelUtil.intToRgb(G.Y7))
				}
			}, Q.T.v, 0);
			I.data = {
				kT: "set",
				a0: Q
			};
			d.dispatch(I);
			return
		} else {
			I.G = G.QN == f.zG ? f.zG : f.CV;
			I.data = {
				a: "fromAction",
				lX: l
			}
		}
	} else if (V == "colorRange" || V == "grow" || V == "similar") {
		I.G = f.we;
		I.data = {
			a: "fromAction",
			lX: l
		}
	} else if (V == "set" && Q && Q.T && Q.T.v.Ordn == "Al" && G.QN == f.zl && d.GK().in()) {
		I.G = f.zl;
		I.data = {
			a: "selectAll"
		}
	} else if (PsdDescriptorHelper.afJ[V] || PsdDescriptorHelper.asy[V] && (!1 || Q.With && Q.With.v[0].v.keyID == "fsel" || Q.From && Q.From.v[0].v.keyID == "fsel" || Q.null && Q.null.v[0].v.keyID == "fsel" || Q.T.v[0] && Q.T.v[0].v.keyID == "fsel")) {
		I.G = f.Da;
		I.data = {
			a: "fromAction",
			lX: l
		}
	}
	var Y = {
		copyToLayer: LayerRecord.Vg,
		cutToLayer: LayerRecord.fG,
		mergeLayersNew: LayerRecord.Oy,
		rasterizeLayer: LayerRecord.amI,
		mergeVisible: LayerRecord.Qn,
		flattenImage: LayerRecord.ai4,
		newPlacedLayer: LayerRecord.md
	};
	if (Y[V]) I.data = {
		a: Y[V],
		a0: Q
	};
	if (I.data) {
		d.dispatch(I);
		return
	}
	if (V == "collapseAllGroupsEvent") {
		for (var A = 0; A < b.B.length; A++) {
			var r = b.B[A];
			if (r.IQ()) r.add.lsct = LayerSectionType.closed
		}
		b.bV = !0;
		return
	}
	if (V == "desaturate") {
		I.G = f.Qi;
		I.data = {
			a: "auto",
			nx: 3
		};
		if (b && b.B[b.g[0]].add.SoLd == null) d.dispatch(I);
		return
	}
	if (V == "close") {
		if (Q && Q.Svng.v.YsN == "Ys") {
			y.data = {
				a: ActionTypes.$.WD
			};
			d.dispatch(y)
		}
		y.data = {
			a: ActionTypes.$.jN,
			e9: b
		};
		d.dispatch(y);
		return
	}
	if (V == "save") {
		y.data = {
			a: ActionTypes.$.WD
		};
		d.dispatch(y);
		return
	}
	if (V == "copyMerged") {
		y.data = {
			a: ActionTypes.$.n4,
			sW: !0,
			$s: !0
		};
		d.dispatch(y);
		return
	}
	if (V == "placedLayerReplaceContents") y.data = {
		a: ActionTypes.$.Um,
		bR: !0
	};
	var Y = {
		placedLayerEditContents: ActionTypes.$.aw3,
		placedLayerExportContents: ActionTypes.$.a2O,
		copyEvent: ActionTypes.$.n4,
		paste: ActionTypes.$.EZ
	};
	if (Y[V]) y.data = {
		a: Y[V],
		$s: !0
	};
	if (y.data) {
		d.dispatch(y);
		return
	}
	var k = Q.null ? Q.null.v : null,
		F = k ? k[0].v.classID : "";
	if (V == "make") {
		if (Q.null == null && Q.Nw) F = Q.Nw.v.classID;
		if (F == "AdjL") {
			I.data = {
				a: LayerRecord.uz,
				a0: Q
			}
		} else if (F == "layerSection") {
			I.data = Q.From ? {
				a: LayerRecord.mQ
			} : {
				a: LayerRecord.C2
			};
			if (Q.Usng) {
				var D = Q.Usng.v;
				if (D.Nm) I.data.Xu = D.Nm.v;
				if (D.Clr) I.data.wg = PsdDescriptorHelper.v8(D)
			}
		} else if (F == "Lyr") {
			if (Q.Usng && Q.Usng.v.length == 2) I.data = {
				a: LayerRecord.aqo
			};
			else {
				I.data = {
					a: LayerRecord.vx
				};
				if (Q.Usng) I.data.Xu = Q.Usng.v.Nm.v;
				if (Q.below && Q.below.v) I.data.atP = !0
			}
		} else if (F == "Chnl" && Q.At && Q.At.v[0].v.enum == "Msk") {
			I.data = {
				a: LayerRecord.a5,
				fz: Q.Usng.v.UsrM
			}
		} else if (F == "Chnl" || F == "SCch") {
			I.data = {
				a: LayerRecord.B1,
				y3: "fromAction",
				Z: l
			}
		} else if (F == "contentLayer") {
			I.data = {
				a: LayerRecord.yl,
				a0: Q
			}
		} else if (F == "BckL") {
			b.B[b.g[0]].a4U();
			return
		} else if (F == "Dcmn") {
			if (Q.Nw == null) return;
			var q = Q.Nw.v;
			y.data = {
				a: ActionTypes.$.lr,
				Kv: PsdDocument.akm(q, G)
			}
		} else if (F == "Ptrn") y.data = {
			a: ActionTypes.$.kc,
			Oo: 0
		};
		else if (F == "Path") {
			I.G = f.o2;
			I.data = {
				a: "pathedit",
				y3: "fromsel"
			}
		} else if (F == "TxLr") {
			I.G = f.zl;
			I.data = {
				a: "fromAction",
				lX: l
			}
		} else if (F == "slice") {
			I.G = f.E7;
			I.data = {
				a: "fromAction",
				lX: l
			}
		} else if (F == "Gd") {
			var H = [
					[],
					[]
				],
				q = Q.Nw.v;
			H[q.Ornt.v.Ornt == "Vrtc" ? 0 : 1].push(q.Pstn.v.val);
			var W = jd.sO(H);
			f.Pq.eF(W, b.Ww());
			I.G = f.$C;
			I.data = {
				a: "gids",
				jh: W
			}
		} else {
			console.log(V, F, Q);
			throw "e"
		}
	} else if (V == "divide") {
		I.G = f.E7;
		I.data = {
			a: "fromAction",
			lX: l
		}
	} else if (V == "deselect") {
		if (F == "Path") {
			b.yK = [];
			b.jP = [];
			b.bV = b.uK = !0;
			return
		} else throw F
	} else if (V == "selectNoLayers") {
		b.g = [];
		b.i_ = !0
	} else if (V == "select") {
		var Z = {
			PcTl: f.zG,
			PbTl: f.CV,
			moveTool: f.$C,
			cloneStampTool: f.uv,
			typeCreateOrEditTool: f.zl,
			artboardTool: f.QC,
			marqueeRectTool: f.Da,
			typeVerticalCreateOrEditTool: f.zk,
			perspectiveCropTool: f.gt,
			marqueeEllipTool: f.adL,
			eyedropperTool: f.vn,
			eraserTool: f.gN,
			pathComponentSelectTool: f.o2,
			lassoTool: f.gc,
			backgroundEraserTool: f.Nm,
			directSelectTool: f.Kp,
			polySelTool: f.abn,
			rectangleTool: f.LI,
			magneticLassoTool: f.avT,
			gradientTool: f.qV,
			quickSelectTool: f.aQ,
			bucketTool: f.ahd,
			ellipseTool: f.Rn,
			magicWandTool: f.we,
			blurTool: f.Yx,
			polygonTool: f.OZ,
			cropTool: f.ja,
			sharpenTool: f.tf,
			lineTool: f.MO,
			sliceTool: f.E7,
			smudgeTool: f.K1,
			customShapeTool: f.YL,
			sliceSelectTool: f.AD,
			dodgeTool: f.l$,
			spotHealingBrushTool: f.vC,
			burnInTool: f.S0,
			saturationTool: f.GX,
			penTool: f.tA,
			redEyeTool: f.A9,
			freeformPenTool: f.YQ,
			rulerTool: f.e7,
			paintbrushTool: f.CV,
			handTool: f._O,
			pencilTool: f.zG,
			zoomTool: f.t7,
			objectSelectTool: f.amo,
			healingBrushTool: f.m4,
			patchTool: f.aH,
			contentAwareMoveTool: f.gg,
			colorReplacementBrushTool: f.gS,
			curvaturePenTool: f.a13,
			rotareViewTool: f.EW
		};
		if (F == "Lyr") {
			var B = Q.selectionModifier,
				a = B ? B.v.selectionModifierType : null,
				m = PsdDescriptorHelper.E8(b, k[0]),
				p = 0;
			if (m == -1) {
				alert("Layer " + k[0].v.val + " does not exist.");
				return
			}
			var r = b.B[m];
			if (r.IQ() && r.c3() && B == null) p = 1;
			I.data = {
				a: LayerRecord.bj,
				j: m,
				ib: a ? ["addToSelection", "addToSelectionContinuous"].indexOf(a) : null,
				VY: p
			}
		} else if (F == "Path") {
			if (k[0].v.keyID == "WrPt") {
				b.yK = [0];
				b.bV = b.uK = !0;
				return
			} else throw k[0]
		} else if (F == "Chnl") {
			I.data = {
				a: LayerRecord.bj,
				j: m,
				VY: k && k[0].v.enum == "RGB" ? 0 : 1
			}
		} else if (F == "Dcmn") {
			if (d.Mt.length < 2) return;
			y.data = {
				a: ActionTypes.$.ab8,
				dir: Q.null.v[0].v.val
			}
		} else if (F == "Brsh") {
			var c = G.pO.list,
				v;
			for (var A = 0; A < c.length; A++) {
				if (c[A].v.Nm.v == k[0].v.val) v = c[A].v
			}
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.Sq,
				Q_: v
			}
		} else if (F == "Mn") {
			if (k[0].v.enum == "Scl") y.data = {
				a: ActionTypes.$.yb,
				G: f.qK,
				Ye: {
					fz: 3
				}
			};
			if (k[0].v.enum == "Plce") y.data = {
				a: ActionTypes.$.Um,
				ar3: !0
			};
			if (k[0].v.enum == "ZmIn") {
				I.G = f.t7;
				I.data = {
					a: "zoom",
					K$: !0
				}
			}
			if (k[0].v.enum == "ZmOt") {
				I.G = f.t7;
				I.data = {
					a: "zoom",
					K$: !1
				}
			}
			if (k[0].v.enum == "FtOn") {
				I.G = f.t7;
				I.data = {
					a: "adapt",
					Z: "fitscr"
				}
			}
		} else if (Z[F]) {
			y.data = {
				a: ActionTypes.$.yb,
				G: Z[F]
			}
		} else throw F
	} else if (V == "draw") {
		I.G = f.o2;
		I.data = {
			a: "fromAction",
			lX: l
		}
	} else if (V == "gradientClassEvent") {
		I.G = f.qV;
		I.data = {
			a: "fromAction",
			lX: l
		}
	} else if ((V == "set" || V == "reset" || V == "exchange") && F == "Clr") {
		y.data = {
			a: ActionTypes.$.kI,
			Oo: PsdResourceTypes.K5,
			y3: V == "reset" ? 3 : 2
		};
		if (V == "set") {
			y.data.y3 = k[0].v.keyID == "FrgC" ? 0 : 1;
			var i = PixelUtil.color.sampleGradientColor(Q.T.v);
			y.data.Z = i.o << 16 | i.J << 8 | i.k
		}
	} else if (V == "set") {
		if (F == "AdjL") {
			var z = Q.T.v.classID;
			z = LayerEffectsHelper.m3[z];
			I.G = f.Qi;
			if (z) I.data = {
				a: "edit_layer",
				Z: Q.T.v
			}
		} else if (F == "Lyr") {
			var P = Q.T.v,
				m = PsdDescriptorHelper.E8(b, k[0]);
			for (var C in P) {
				if (C == "classID") continue;
				I.G = f.yS;
				if (C == "Nm") I.data = {
					a: LayerRecord.oY,
					name: P.Nm.v
				};
				else if (C == "Opct") I.data = {
					a: LayerRecord.y$,
					mz: Math.round(P.Opct.v.val * 255 / 100)
				};
				else if (C == "fillOpacity") I.data = {
					a: LayerRecord.Ij,
					mz: Math.round(P.fillOpacity.v.val * 255 / 100)
				};
				else if (C == "Md") I.data = {
					a: LayerRecord.zZ,
					mz: au.Point2D.indexOf(P.Md.v.BlnM) + (b.B[m].IQ() ? 1 : 0)
				};
				else if (C == "Usrs") I.data = {
					a: LayerRecord.JX,
					j: m
				};
				else if (C == "Blnd") {
					I.G = f.LY;
					I.data = {
						a: "setstl",
						j: m,
						Z: {
							blendOptions: {
								t: "objc",
								v: P
							}
						}
					};
					d.dispatch(I);
					I.data = {
						a: "confirm",
						j: m
					}
				} else if (C == "userMaskFeather" || C == "userMaskDensity") {
					var h = P.userMaskFeather,
						L = P.userMaskDensity,
						m = b.g[0],
						U = b.B[m].NM(0);
					if (h) U.wk = h.v.val;
					if (L) U.XS = L.v.val;
					I.data = {
						a: LayerRecord.fx,
						NT: m,
						iQ: U
					}
				} else if (C == "Clr") {
					var T = PsdDescriptorHelper.v8(P);
					I.data = {
						a: LayerRecord.dZ,
						anr: T
					}
				} else if (C == "Lefx") PsdDescriptorHelper.a4N(d, m, P.Lefx.v, G);
				else {
					console.log(Q);
					throw C
				}
				if (I.data) {
					d.dispatch(I);
					delete I.data
				}
			}
			I.data = {};
			var r = b.B[m];
			r.adM()
		} else if (F == "Prpr") {
			var P = JSON.parse(JSON.stringify(Q.T.v)),
				m = PsdDescriptorHelper.E8(b, Q.null.v[1]),
				r = b.B[m],
				S = k[0].v.keyID;
			if (S == "TxtS" || S == "paragraphStyle") {
				var E = r.add.TySh,
					x = JSON.parse(JSON.stringify(E.zC)),
					K = dt.dW(x),
					u = dt.Au(x, 0, K.length - 2);
				if (S == "TxtS") dt.a0I(P, u);
				else dt.ayq(P, u);
				dt.rW(x, 0, K.length - 1, u);
				I.G = f.zl;
				I.data = {
					a: "newED",
					os: m,
					$B: x
				}
			} else if (S == "Lefx") {
				for (var bC in P)
					if (P[bC].v) {
						if (bC == "Scl") P[bC].v.val = 100
					}
				PsdDescriptorHelper.a4N(d, m, P, G);
				I.data = {}
			} else throw S
		} else if (F == "contentLayer") {
			var m = PsdDescriptorHelper.E8(b, k[0]),
				P = Q.T.v;
			if (P.classID == "shapeStyle") P = P.FlCn.v;
			var O = {
					solidColorLayer: 0,
					gradientLayer: 1,
					patternLayer: 2
				}[P.classID],
				$ = f.nr.wR(b, m),
				J = $.hA == O + 1 ? $.rU : LayerStyleConstants.defaultContentStyles[O];
			J = JSON.parse(JSON.stringify(J));
			f.uj.ON(P, J, O);
			I.data = {
				a: LayerRecord.sM,
				xn: [m],
				T3: !0,
				Z: {
					hA: O + 1,
					rU: J
				}
			}
		} else if (F == "Brsh") {
			var v = JSON.parse(JSON.stringify(G.pO.Em)),
				gX = Q.T.v;
			if (gX.masterDiameter) v.Brsh.v.Dmtr.v.val = gX.masterDiameter.v.val;
			else console.log("unknown brush parameters");
			y.data = {
				a: ActionTypes.$.kI,
				Oo: PsdResourceTypes.Sq,
				Q_: v
			}
		} else if (F == "Path") {
			I.G = f.o2;
			I.data = {
				a: "fromAction",
				lX: l
			}
		} else {
			console.log(k[0], Q);
			throw F
		}
	} else if (V == "move") {
		if (F == "Lyr") {
			var P = Q.T.v;
			if (P.classID == "Ofst") {
				I.data = {
					a: "trsl",
					wS: P.Hrzn.v.val,
					ui: P.Vrtc.v.val
				};
				I.G = f.$C
			} else {
				var _, jI;
				if (P[0].t == "Enmr") {
					if (P[0].v.enum == "Frnt") jI = 0;
					else if (P[0].v.enum == "Nxt") jI = 1;
					else if (P[0].v.enum == "Prvs") jI = 2;
					else if (P[0].v.enum == "Back") jI = 3;
					else throw "e"
				} else _ = P[0].v.val;
				I.data = {
					a: LayerRecord.CU,
					target: _,
					y3: jI,
					a1R: Q.Dplc ? Q.Dplc.v : !1
				}
			}
		} else if (F == "Chnl" && k[0].v.keyID == "fsel") {
			I.G = f.Da;
			I.data = {
				a: "fromAction",
				lX: l
			}
		}
	} else if (V == "groupEvent" || V == "ungroup") I.data = {
		a: LayerRecord.Gk
	};
	else if (V == "show" || V == "hide") {
		var iw = k[0].v;
		for (var A = 0; A < iw.length; A++) {
			var hn = iw[A],
				F = hn.v.classID;
			if (F == "Lyr") {
				if (I.data == null) I.data = {
					a: LayerRecord.mH,
					xn: []
				};
				var m = PsdDescriptorHelper.E8(b, hn);
				if (m == -1) continue;
				var jq = b.B[m].zD();
				if (V == "show" && jq || V == "hide" && !jq) continue;
				I.data.xn.push(m)
			} else if (F == "Chnl") {
				I.data = {
					a: LayerRecord.B1,
					y3: "fromAction",
					Z: l
				}
			} else if (F == "filterFX") {
				if (hn.v.val != null) I.data = {
					a: LayerRecord.GQ,
					index: hn.v.val - 1
				};
				I.data = {
					a: LayerRecord.Wj
				}
			}
		}
	} else if (V == "rotateEventEnum") {
		I.G = F == "Lyr" ? f.qK : f.ja;
		var iv = Q.Angl.v.val;
		I.data = {
			a: "rot",
			Il: [2, 5],
			Z: -iv * Math.PI / 180
		}
	} else if (V == "flip") {
		I.G = F == "Lyr" ? f.qK : f.ja;
		var kq = Q.Axis.v.Ornt == "Hrzn",
			eE = kq ? new Point2D(-1, 1) : new Point2D(1, -1);
		I.data = {
			a: "scl",
			Il: [
				[2, 6],
				[22, 4, kq ? 2 : 3]
			],
			Z: eE
		}
	} else if (V == "transform") {
		var e8 = 1,
			aI = 1,
			dK = 0,
			jC = 0,
			d7 = 0,
			ka = 0,
			hS = 0,
			fs = null,
			f_ = null;
		if (Q.Wdth) e8 = Q.Wdth.v.val / 100;
		if (Q.Hght) aI = Q.Hght.v.val / 100;
		if (Q.Skew) {
			var kA = Q.Skew.v;
			dK = kA.Hrzn.v.val;
			jC = kA.Vrtc.v.val
		}
		if (Q.Ofst) {
			var gq = Q.Ofst.v;
			ka = gq.Hrzn.v.val;
			hS = gq.Vrtc.v.val
		}
		if (Q.Angl) d7 = Q.Angl.v.val;
		var hb = new Matrix2D;
		hb.concat(new Matrix2D(e8, e8 * Math.tan(jC * Math.PI / 180), aI * Math.tan(dK * Math.PI / 180), aI, 0, 0));
		hb.rotate(-d7 * Math.PI / 180);
		hb.translate(ka, hS);
		var ex = PixelUtil.canvas.pu(hb);
		if (Q.Usng) {
			var gq = Q.Usng.v;
			ex[6] = gq.Hrzn.v.val / 100;
			ex[7] = gq.Vrtc.v.val / 100
		}
		var bD = Q.FTcs.v.QCSt;
		if (bD == "Qcsi") {
			var ae = Q.Pstn.v;
			fs = new Point2D(ae.Hrzn.v.val, ae.Vrtc.v.val)
		} else f_ = f.NH.aiA[bD];
		var k = Q.null;
		if (k && k.v instanceof Array) k = k.v[0];
		var m = k ? PsdDescriptorHelper.E8(b, k) : null;
		if (m == -1) m = null;
		I.G = k && k.v.keyID == "fsel" ? f.tr : f.qK;
		I.data = {
			a: "dtr",
			BL: f_,
			Z: ex,
			cB: Q.warp,
			ajS: fs
		}
	} else if (V == "duplicate") {
		if (F == "Chnl") I.data = {
			a: LayerRecord.B1,
			y3: "fromAction",
			Z: l
		};
		else I.data = {
			a: LayerRecord.ZY,
			Xu: Q.Nm ? Q.Nm.v : null
		}
	} else if (V == "delete") {
		if (F == "filterFX") {
			if (k[0].v.val != null) I.data = {
				a: LayerRecord.Sk,
				aN: k[0].v.val - 1
			};
			else I.data = {
				a: LayerRecord.OL
			}
		} else if (F == "Path") {
			I.G = f.o2;
			I.data = {
				a: "pathedit",
				y3: "del"
			}
		} else if (F == "Lyr") I.data = {
			a: LayerRecord.Qe
		};
		else if (F == "Chnl" && k[0].v.enum == "Msk") I.data = {
			a: LayerRecord.uU
		};
		else if (F == "Chnl") I.data = {
			a: LayerRecord.B1,
			y3: "fromAction",
			Z: l
		};
		else throw F
	} else if (V == "align") {
		if (Q.Aply && Q.Aply.v.projection == "Auto") {
			I.G = f.ja;
			I.data = {
				a: "auto-align"
			}
		} else {
			I.G = f.$C;
			var em = Q.Usng.v.ADSt,
				R = {
					AdLf: 0,
					AdCH: 1,
					AdRg: 2,
					AdTp: 4,
					AdCV: 5,
					AdBt: 6
				}[em];
			if (R == null) throw em;
			I.data = {
				a: "algn",
				Z: R
			}
		}
	} else if (V == "applyLocking") {
		var dY = Q.layerLocking.v,
			f7;
		if (dY.protectTransparency) f7 = [
			[dY.protectTransparency.v],
			[0]
		];
		else if (dY.protectNone) f7 = [
			[!1, !1, !1, !1],
			[0, 1, 2, 31]
		];
		else {
			console.log(dY);
			throw "e"
		}
		I.data = {
			a: LayerRecord.ss,
			mz: f7
		}
	}
	if (I.data) d.dispatch(I);
	else if (y.data) d.dispatch(y);
	else {
		console.log(l);
		alert("Unknown action \"" + V + "\"");
		throw "e"
	}
};

PsdDescriptorHelper.a4N = function(l, d, G, b) {
	G = JSON.parse(JSON.stringify(G));
	ia.sB(G);
	if (G.masterFXSwitch == null) G.masterFXSwitch = {
		t: "bool",
		v: !0
	};
	console.log(G);
	var V = LayerStyleConstants.effectMultiKeys;
	for (var Q = 0; Q < V.length; Q++)
		if (G[V[Q]]) {
			for (var A = 0; A < G[V[Q]].v.length; A++) {
				var t = G[V[Q]].v[A].v,
					I = t.TrnS;
				if (I == null) I = t.MpgS;
				if (I && I.v.Crv == null) {
					var y = I.v,
						e = y.Nm.v.split("=").pop(),
						M = b.Oz;
					for (var R = 0; R < M.length; R++) {
						var J = M[R].Nm.v.split("=").pop();
						if (J == e) y.Crv = JSON.parse(JSON.stringify(M[R].Crv))
					}
					if (I.v.Crv == null) {
						console.log(I);
						throw "e"
					}
				}
			}
		}
	var n = new Action(ActionTypes.E.v, !0);
	n.G = f.LY;
	n.data = {
		a: "setstl",
		j: d,
		Z: {
			Lefx: {
				t: "objc",
				v: G
			}
		}
	};
	l.dispatch(n);
	n.data = {
		a: "confirm",
		j: d
	};
	l.dispatch(n)
};

PsdDescriptorHelper.v8 = function(l) {
	var d = {
		None: 0,
		Rd: 1,
		Orng: 2,
		Ylw: 3,
		Grn: 4,
		Bl: 5,
		Vlt: 6,
		Gry: 7
	}[l.Clr.v.Clr];
	if (d == null) throw l.Clr.v.Clr;
	return d
};

PsdDescriptorHelper.E8 = function(l, d) {
	var G = 1e6,
		b = 0,
		V = l.B.length;
	for (var A = 0; A < l.g.length; A++) {
		G = Math.min(G, l.g[A]);
		b = Math.max(b, l.g[A])
	}
	var Q = d.t,
		t = -1;
	if (Q == "name") {
		var I = d.v.val,
			t = -1;
		for (var A = 0; A < V; A++)
			if (l.B[A].getName() == I) {
				t = A;
				break
			}
	} else if (Q == "Enmr") {
		if (l.g.length != 0) t = l.g[0];
		if (d.v.enum == "Frwr") t = b + 1;
		if (d.v.enum == "Bckw") t = G - 1;
		if (d.v.enum == "Back") t = 0;
		if (d.v.enum == "Frnt") t = V - 1;
		t = (t + V) % V
	} else if (Q == "prop") {
		if (d.v.keyID == "Bckg") t = 0
	}
	return t
};
