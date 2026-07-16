/**
* pathShapeHelper (de-obfuscated partial from rest.js)
* Lines 65839-70625. Original identifier: pathShapeHelper
*/

var FilterHelper = {};
FilterHelper.ko = function(l) {
	var d = l.filterID.v;
	return d > 16777215 ? X.a5J(d) : l.Fltr.v.classID
};
FilterHelper.JJ = [{
	rU: "GEfc"
}, {
	rU: "LnCr"
}, {
	rU: "Adobe Camera Raw Filter"
}, {
	rU: "LqFy",
	xX: !0
}, {
	X$: "3D",
	Uv: ["lightFilterGradient", "Dila"]
}, {
	X$: "Blur",
	Uv: "Avrg,Blr ,BlrM,boxblur,GsnB,Bokh,MtnB,RdlB,surfaceBlur".split(",")
}, {
	X$: "Distort",
	Uv: "Dspl,Kale,Pnch,Plr ,Rple,Shr ,Sphr,Twrl,Wave,ZgZg".split(",")
}, {
	X$: "Noise",
	Uv: ["AdNs", "Dspc", "DstS", "Mdn ", "denoise"]
}, {
	X$: "Pixelate",
	Uv: "ClrH,Crst,Frgm,Mztn,Msc ,Pntl".split(",")
}, {
	X$: "Render",
	Uv: ["Flam", "Clds", "DfrC", "Fbrs", "LnsF"]
}, {
	X$: "Sharpen",
	Uv: ["Shrp", "ShrE", "ShrM", "smartSharpen", "UnsM"]
}, {
	X$: "Stylize",
	Uv: "Dfs ,Embs,FndE,oilPaint,Slrz,TrcC,Wnd ".split(",")
}, {
	X$: "Other",
	Uv: "HghP,HsbP,Mxm ,Mnm ,Ofst,Rept,Ctoa,Dthr,Part".split(",")
}, {
	X$: "Fourier",
	Uv: ["dDFT", "iDFT"]
}];
FilterHelper.Tb = {
	LqFy: "LqFy",
	Avrg: "Avrg",
	"Blr ": "blurEvent",
	BlrM: "blurMethod",
	boxblur: "boxblur",
	GsnB: "gaussianBlur",
	MtnB: "motionBlur",
	RdlB: "radialBlur",
	surfaceBlur: "surfaceBlur",
	lightFilterGradient: "lightFilterGradient",
	adaptCorrect: "adaptCorrect",
	Pnch: "pinch",
	"Plr ": "polar",
	Rple: "ripple",
	"Shr ": "shear",
	Sphr: "spherize",
	Twrl: "twirl",
	Wave: "wave",
	AdNs: "addNoise",
	DstS: "dustAndScratches",
	"Mdn ": "median",
	denoise: "denoise",
	ClrH: "colorHalftone",
	Crst: "",
	Frgm: "",
	Mztn: "mezzotint",
	"Msc ": "mosaic",
	Pntl: "",
	Flam: "",
	Clds: "clouds",
	DfrC: "differenceClouds",
	LnsF: "LnsF",
	Shrp: "sharpen",
	ShrM: "sharpenMore",
	smartSharpen: "smartSharpen",
	UnsM: "unsharpMask",
	"Dfs ": "diffuse",
	FndE: "findEdges",
	oilPaint: "oilPaint",
	"Adobe Camera Raw Filter": "Adobe Camera Raw Filter",
	HghP: "highPass",
	"Mxm ": "maximum",
	"Mnm ": "minimum",
	Ofst: "offset"
};
FilterHelper.wp = {
	AddNoise: "AdNs",
	Average: "Avrg",
	Blur: "Blr ",
	BlurMore: "BlrM",
	Clouds: "Clds",
	DifferenceClouds: "DfrC",
	DustAndScratches: "DstS",
	GaussianBlur: "GsnB",
	HighPass: "HghP",
	Maximum: "Mxm ",
	Minimum: "Mnm ",
	MotionBlur: "MtnB",
	Offset: "Ofst",
	Pinch: "Pnch",
	PolarCoordinates: "Plr ",
	Ripple: "Rple",
	Sharpen: "Shrp",
	SharpenMore: "ShrM",
	Twirl: "Twrl",
	UnsharpMask: "UnsM",
	Wave: "Wave",
	BrightnessContrast: "brit"
};
FilterHelper.d = {
	rigidTransform: f.MU
};
FilterHelper.names = {
	lightFilterGradient: "Normal Map",
	rigidTransform: "Puppet Warp",
	LnCr: "Lens Correction",
	LqFy: "Liquify",
	GEfc: "Filter Gallery",
	Avrg: "Average",
	"Blr ": "Blur",
	BlrM: "Blur More",
	boxblur: "Box Blur",
	GsnB: "Gaussian Blur",
	Bokh: "Lens Blur",
	MtnB: "Motion Blur",
	RdlB: "Radial Blur",
	surfaceBlur: "Surface Blur",
	Dspl: "Displace",
	Pnch: "Pinch",
	"Plr ": "Polar Coordinates",
	Rple: "Ripple",
	"Shr ": "Shear",
	Sphr: "Spherize",
	Twrl: "Twirl",
	Wave: "Wave",
	ZgZg: "ZigZag",
	Kale: "Kaleidoscope",
	AdNs: "Add Noise",
	Dspc: "Despeckle",
	DstS: "Dust & Scratches",
	"Mdn ": "Median",
	denoise: "Reduce Noise",
	ClrH: "Color Halftone",
	Crst: "Crystallize",
	Frgm: "Fragment",
	Mztn: "Mezzotint",
	"Msc ": "Mosaic",
	Pntl: "Pointillize",
	Clds: "Clouds",
	DfrC: "Difference Clouds",
	LnsF: "Lens Flare",
	Flam: "Flame",
	Fbrs: "Fibers",
	Shrp: "Sharpen",
	ShrE: "Sharpen Edges",
	ShrM: "Sharpen More",
	smartSharpen: "Smart Sharpen",
	UnsM: "Unsharp Mask",
	"Dfs ": "Diffuse",
	Embs: "Emboss",
	FndE: "Find Edges",
	oilPaint: "Oil Paint",
	Slrz: "Solarize",
	TrcC: "Trace Contour",
	"Wnd ": "Wind",
	HghP: [24, 17, 1],
	HsbP: "HSB/HSL",
	"Mxm ": "Maximum",
	"Mnm ": "Minimum",
	Ofst: "Offset",
	Rept: "repeat",
	Ctoa: "Color to Alpha",
	Dthr: "Dither",
	Part: "Particles",
	dDFT: "Fourier Transform",
	iDFT: "Inverse Fourier Transform",
	defr: "Definge",
	Dila: "Texture Dilation",
	VaPo: "Vanishing Point",
	adaptCorrect: "Shadows/Highlights",
	"Adobe Camera Raw Filter": "Camera Raw"
};
FilterHelper.oT = function(l) {
	var d = null;
	if (l == "GEfc") d = {
		__name: "Filter Gallery",
		classID: "GEfc",
		GEfs: {
			t: "VlLs",
			v: [{
				t: "Objc",
				v: TextStyleHelper.oT("GlwE")
			}]
		}
	};
	if (l == "LqFy") {
		var G = {
				iJ: 5,
				Tq: 5,
				map: new Float32Array(5 * 5 * 2)
			},
			b = new Uint8Array(ei.CO(G)),
			V = [];
		for (var A = 0; A < b.length; A++) V.push(b[A]);
		d = {
			__name: "Liquify",
			classID: "LqFy",
			LqMe: {
				t: "tdta",
				v: V
			}
		}
	}
	if (l == "rigidTransform") {
		d = {
			__name: "Puppet Warp",
			classID: "rigidTransform",
			null: {
				t: "obj ",
				v: [{
					t: "Enmr",
					v: {
						classID: "Lyr",
						typeID: "Ordn",
						enum: "Trgt"
					}
				}]
			},
			rigidType: {
				t: "bool",
				v: !0
			},
			puppetShapeList: {
				t: "VlLs",
				v: []
			},
			PuX0: {
				t: "doub",
				v: 0
			},
			PuX1: {
				t: "doub",
				v: 1e3
			},
			PuX2: {
				t: "doub",
				v: 1e3
			},
			PuX3: {
				t: "doub",
				v: 0
			},
			PuY0: {
				t: "doub",
				v: 0
			},
			PuY1: {
				t: "doub",
				v: 0
			},
			PuY2: {
				t: "doub",
				v: 1e3
			},
			PuY3: {
				t: "doub",
				v: 1e3
			}
		}
	}
	if (l == "LnCr") d = {
		__name: "Lens Correction",
		classID: "LnCr",
		LnAg: {
			t: "bool",
			v: !0
		},
		LnAc: {
			t: "bool",
			v: !1
		},
		LnAv: {
			t: "bool",
			v: !1
		},
		LnAs: {
			t: "bool",
			v: !1
		},
		LnIp: {
			t: "bool",
			v: !1
		},
		LnFo: {
			t: "doub",
			v: 0
		},
		LnPr: {
			t: "TEXT",
			v: ""
		},
		LnIa: {
			t: "doub",
			v: 0
		},
		LnI0: {
			t: "doub",
			v: 0
		},
		LnI1: {
			t: "doub",
			v: 0
		},
		LnI2: {
			t: "doub",
			v: 0
		},
		LnI3: {
			t: "doub",
			v: 1
		},
		LnRa: {
			t: "doub",
			v: 0
		},
		LnVp: {
			t: "doub",
			v: 0
		},
		LnHp: {
			t: "doub",
			v: 0
		},
		LnSi: {
			t: "doub",
			v: 100
		},
		LnFt: {
			t: "long",
			v: 2
		},
		LnSb: {
			t: "doub",
			v: 0
		},
		LnSt: {
			t: "long",
			v: 50
		},
		LnRc: {
			t: "doub",
			v: 0
		},
		LnGm: {
			t: "doub",
			v: 0
		},
		LnBy: {
			t: "doub",
			v: 0
		},
		LnNa: {
			t: "long",
			v: 64
		},
		LnIh: {
			t: "long",
			v: 0
		},
		LnIv: {
			t: "long",
			v: 0
		},
		LnIs: {
			t: "Objc",
			v: {
				classID: "RGBC",
				Rd: {
					t: "doub",
					v: 127
				},
				Grn: {
					t: "doub",
					v: 127
				},
				Bl: {
					t: "doub",
					v: 127
				}
			}
		},
		LnNm: {
			t: "bool",
			v: !1
		}
	};
	if (l == "adaptCorrect") d = {
		__name: "Shadow/Highlight",
		classID: "adaptCorrect",
		sdwM: {
			t: "Objc",
			v: {
				__name: "Parameters",
				classID: "adaptCorrectTones",
				Amnt: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 50
					}
				},
				Wdth: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 25
					}
				},
				Rds: {
					t: "long",
					v: 12
				}
			}
		},
		hglM: {
			t: "Objc",
			v: {
				__name: "Parameters",
				classID: "adaptCorrectTones",
				Amnt: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 0
					}
				},
				Wdth: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 0
					}
				},
				Rds: {
					t: "long",
					v: 0
				}
			}
		},
		BlcC: {
			t: "doub",
			v: 0
		},
		WhtC: {
			t: "doub",
			v: 0
		},
		Cntr: {
			t: "long",
			v: 0
		},
		ClrC: {
			t: "long",
			v: 0
		}
	};
	if (l == "Dfs ") d = {
		__name: "Diffuse",
		classID: "Dfs",
		Md: {
			t: "enum",
			v: {
				DfsM: "Nrml"
			}
		},
		FlRs: {
			t: "long",
			v: 14061024
		}
	};
	if (l == "Fbrs") d = {
		__name: "Fibers",
		classID: "Fbrs",
		Vrnc: {
			t: "long",
			v: 10
		},
		Strg: {
			t: "long",
			v: 1
		},
		RndS: {
			t: "long",
			v: 8438429
		}
	};
	if (l == "Embs") d = {
		__name: "Emboss",
		classID: "Embs",
		Angl: {
			t: "long",
			v: 45
		},
		Hght: {
			t: "long",
			v: 5
		},
		Amnt: {
			t: "long",
			v: 100
		}
	};
	if (l == "oilPaint") d = {
		__name: "Oil Paint",
		classID: "oilPaint",
		lightingOn: {
			t: "bool",
			v: !0
		},
		stylization: {
			t: "doub",
			v: 3
		},
		brushScale: {
			t: "doub",
			v: 1
		},
		microBrush: {
			t: "doub",
			v: 0
		},
		LghD: {
			t: "long",
			v: 45
		},
		specularity: {
			t: "doub",
			v: 1
		},
		cleanliness: {
			t: "doub",
			v: 2
		}
	};
	if (l == "TrcC") d = {
		__name: "Trace Contour",
		classID: "TrcC",
		Lvl: {
			t: "long",
			v: 128
		},
		Edg: {
			t: "enum",
			v: {
				CntE: "Lwr"
			}
		}
	};
	if (l == "Wnd ") d = {
		__name: "Wind",
		classID: "Wnd",
		WndM: {
			t: "enum",
			v: {
				WndM: "Wnd"
			}
		},
		Drct: {
			t: "enum",
			v: {
				Drct: "Rght"
			}
		}
	};
	if (l == "lightFilterGradient") d = {
		__name: "Generate Normals",
		classID: "lightFilterGradient",
		blur: {
			t: "doub",
			v: 0
		},
		textureScale: {
			t: "doub",
			v: 1
		},
		Scl: {
			t: "doub",
			v: 1
		},
		Dtl: {
			t: "VlLs",
			v: [{
				t: "doub",
				v: 1
			}, {
				t: "doub",
				v: 1
			}, {
				t: "doub",
				v: 1
			}]
		}
	};
	if (l == "boxblur") d = {
		__name: "Box Blur",
		classID: "boxblur",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 15
			}
		}
	};
	if (l == "GsnB") d = {
		__name: "Gaussian Blur",
		classID: "GsnB",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 7.2
			}
		}
	};
	if (l == "Bokh") d = {
		__name: "Lens Blur",
		classID: "Bokh",
		BkDi: {
			t: "enum",
			v: {
				BtDi: "BeIn"
			}
		},
		BkDp: {
			t: "long",
			v: 0
		},
		BkDs: {
			t: "bool",
			v: !1
		},
		BkIs: {
			t: "enum",
			v: {
				BtIs: "BeS6"
			}
		},
		BkIb: {
			t: "doub",
			v: 30
		},
		BkIc: {
			t: "long",
			v: 0
		},
		BkIr: {
			t: "long",
			v: 0
		},
		BkSb: {
			t: "doub",
			v: 0
		},
		BkSt: {
			t: "long",
			v: 255
		},
		BkNa: {
			t: "long",
			v: 0
		},
		BkNt: {
			t: "enum",
			v: {
				BtNt: "BeNu"
			}
		},
		BkNm: {
			t: "bool",
			v: !1
		}
	};
	if (l == "MtnB") d = {
		__name: "Motion Blur",
		classID: "MtnB",
		Angl: {
			t: "long",
			v: 0
		},
		Dstn: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 4
			}
		}
	};
	if (l == "RdlB") d = {
		__name: "Radial Blur",
		classID: "RdlB",
		Amnt: {
			t: "long",
			v: 10
		},
		BlrM: {
			t: "enum",
			v: {
				BlrM: "Spn"
			}
		},
		BlrQ: {
			t: "enum",
			v: {
				BlrQ: "Gd"
			}
		},
		Cntr: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: {
					t: "doub",
					v: .5
				},
				Vrtc: {
					t: "doub",
					v: .5
				}
			}
		}
	};
	if (l == "surfaceBlur") d = {
		__name: "Surface Blur",
		classID: "surfaceBlur",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 15
			}
		},
		Thsh: {
			t: "long",
			v: 15
		}
	};
	if (l == "denoise") d = {
		__name: "Reduce Noise",
		classID: "denoise",
		ClNs: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 29
			}
		},
		Shrp: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 0
			}
		},
		removeJPEGArtifact: {
			t: "bool",
			v: !1
		},
		channelDenoise: {
			t: "VlLs",
			v: [{
				t: "Objc",
				v: {
					classID: "channelDenoiseParams",
					Chnl: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Chnl",
								typeID: "Chnl",
								enum: "Cmps"
							}
						}]
					},
					Amnt: {
						t: "long",
						v: 5
					},
					EdgF: {
						t: "long",
						v: 0
					}
				}
			}, {
				t: "Objc",
				v: {
					classID: "channelDenoiseParams",
					Chnl: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Chnl",
								typeID: "Chnl",
								enum: "Rd"
							}
						}]
					},
					Amnt: {
						t: "long",
						v: 0
					}
				}
			}, {
				t: "Objc",
				v: {
					classID: "channelDenoiseParams",
					Chnl: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Chnl",
								typeID: "Chnl",
								enum: "Grn"
							}
						}]
					},
					Amnt: {
						t: "long",
						v: 0
					}
				}
			}, {
				t: "Objc",
				v: {
					classID: "channelDenoiseParams",
					Chnl: {
						t: "obj ",
						v: [{
							t: "Enmr",
							v: {
								classID: "Chnl",
								typeID: "Chnl",
								enum: "Bl"
							}
						}]
					},
					Amnt: {
						t: "long",
						v: 0
					}
				}
			}]
		},
		preset: {
			t: "TEXT",
			v: "Default"
		}
	};
	if (l == "Dspl") d = {
		__name: "Displace",
		classID: "Dspl",
		HrzS: {
			t: "long",
			v: 10
		},
		VrtS: {
			t: "long",
			v: 10
		},
		DspM: {
			t: "enum",
			v: {
				DspM: "StrF"
			}
		},
		UndA: {
			t: "enum",
			v: {
				UndA: "RptE"
			}
		},
		DspF: {
			t: "Pth ",
			v: {
				sig: "txtu",
				pth: "file.psd\0"
			}
		}
	};
	if (l == "Pnch") d = {
		__name: "Pinch",
		classID: "Pnch",
		Amnt: {
			t: "long",
			v: -100
		}
	};
	if (l == "Plr ") d = {
		__name: "Polar Coordinates",
		classID: "Plr",
		Cnvr: {
			t: "enum",
			v: {
				Cnvr: "RctP"
			}
		}
	};
	if (l == "Rple") d = {
		__name: "Ripple",
		classID: "Rple",
		Amnt: {
			t: "long",
			v: 999
		},
		RplS: {
			t: "enum",
			v: {
				RplS: "Mdm"
			}
		}
	};
	if (l == "Shr ") d = {
		__name: "Shear",
		classID: "Shr",
		ShrP: {
			t: "VlLs",
			v: [{
				t: "Objc",
				v: {
					classID: "Pnt",
					Hrzn: {
						t: "doub",
						v: 0
					},
					Vrtc: {
						t: "doub",
						v: 1
					}
				}
			}, {
				t: "Objc",
				v: {
					classID: "Pnt",
					Hrzn: {
						t: "doub",
						v: 0
					},
					Vrtc: {
						t: "doub",
						v: 128
					}
				}
			}]
		},
		UndA: {
			t: "enum",
			v: {
				UndA: "WrpA"
			}
		},
		ShrS: {
			t: "long",
			v: 0
		},
		ShrE: {
			t: "long",
			v: 1
		}
	};
	if (l == "Sphr") d = {
		__name: "Spherize",
		classID: "Sphr",
		Amnt: {
			t: "long",
			v: 100
		},
		SphM: {
			t: "enum",
			v: {
				SphM: "Nrml"
			}
		}
	};
	if (l == "Twrl") d = {
		__name: "Twirl",
		classID: "Twrl",
		Angl: {
			t: "long",
			v: 90
		}
	};
	if (l == "Wave") d = {
		__name: "Wave",
		classID: "Wave",
		Wvtp: {
			t: "enum",
			v: {
				Wvtp: "WvSn"
			}
		},
		NmbG: {
			t: "long",
			v: 1
		},
		WLMn: {
			t: "long",
			v: 101
		},
		WLMx: {
			t: "long",
			v: 102
		},
		AmMn: {
			t: "long",
			v: 36
		},
		AmMx: {
			t: "long",
			v: 37
		},
		SclH: {
			t: "long",
			v: 100
		},
		SclV: {
			t: "long",
			v: 100
		},
		UndA: {
			t: "enum",
			v: {
				UndA: "WrpA"
			}
		},
		RndS: {
			t: "long",
			v: 743887
		}
	};
	if (l == "ZgZg") d = {
		__name: "ZigZag",
		classID: "ZgZg",
		Amnt: {
			t: "long",
			v: 50
		},
		NmbR: {
			t: "long",
			v: 10
		},
		ZZTy: {
			t: "enum",
			v: {
				ZZTy: "ArnC"
			}
		}
	};
	if (l == "AdNs") d = {
		__name: "Add Noise",
		classID: "AdNs",
		Dstr: {
			t: "enum",
			v: {
				Dstr: "Unfr"
			}
		},
		Nose: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 20
			}
		},
		Mnch: {
			t: "bool",
			v: !1
		},
		FlRs: {
			t: "long",
			v: 100691320
		}
	};
	if (l == "DstS") d = {
		__name: "Dust & Scratches",
		classID: "DstS",
		Rds: {
			t: "long",
			v: 2
		},
		Thsh: {
			t: "long",
			v: 26
		}
	};
	if (l == "Mdn ") d = {
		__name: "Median",
		classID: "Mdn",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 7
			}
		}
	};
	if (l == "ClrH") d = {
		__name: "Color Halftone",
		classID: "ClrH",
		Rds: {
			t: "long",
			v: 8
		},
		Ang1: {
			t: "long",
			v: 10
		},
		Ang2: {
			t: "long",
			v: 40
		},
		Ang3: {
			t: "long",
			v: 70
		},
		Ang4: {
			t: "long",
			v: 80
		}
	};
	if (l == "Crst") d = {
		__name: "Crystallize",
		classID: "Crst",
		ClSz: {
			t: "long",
			v: 10
		},
		FlRs: {
			t: "long",
			v: 1554929224
		}
	};
	if (l == "Mztn") d = {
		__name: "Mezzotint",
		classID: "Mztn",
		MztT: {
			t: "enum",
			v: {
				MztT: "FnDt"
			}
		},
		FlRs: {
			t: "long",
			v: 204994187
		}
	};
	if (l == "Msc ") d = {
		__name: "Mosaic",
		classID: "Msc",
		ClSz: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 12
			}
		}
	};
	if (l == "Pntl") d = {
		__name: "Pointillize",
		classID: "Pntl",
		ClSz: {
			t: "long",
			v: 10
		},
		FlRs: {
			t: "long",
			v: 1554929236
		}
	};
	if (l == "LnsF") d = {
		__name: "Lens Flare",
		classID: "LnsF",
		Brgh: {
			t: "long",
			v: 100
		},
		FlrC: {
			t: "Objc",
			v: {
				classID: "Pnt",
				Hrzn: {
					t: "doub",
					v: .19140625
				},
				Vrtc: {
					t: "doub",
					v: .185628741979599
				}
			}
		},
		Lns: {
			t: "enum",
			v: {
				Lns: "Zm"
			}
		}
	};
	if (l == "Dthr") d = {
		__name: "Dither",
		classID: "Dthr",
		Plte: {
			t: "long",
			v: 0
		},
		Mthd: {
			t: "long",
			v: 1
		}
	};
	if (l == "Part") d = {
		__name: "Dither",
		classID: "Part",
		Cont: {
			t: "long",
			v: 10
		},
		Size: {
			t: "long",
			v: 8
		},
		Dpth: {
			t: "long",
			v: 100
		},
		Brgh: {
			t: "long",
			v: 800
		},
		Clr: {
			t: "Objc",
			v: {
				classID: "RGBC",
				Rd: {
					v: 255,
					t: "doub"
				},
				Grn: {
					v: 255,
					t: "doub"
				},
				Bl: {
					v: 255,
					t: "doub"
				}
			}
		},
		Time: {
			t: "doub",
			v: 0
		},
		Turb: {
			t: "long",
			v: 0
		},
		Blnk: {
			t: "bool",
			v: !0
		},
		Fall: {
			t: "bool",
			v: !1
		},
		RndS: {
			t: "long",
			v: 8438429
		}
	};
	if (l == "Adobe Camera Raw Filter") d = {
		__name: "Camera Raw Filter",
		classID: "Adobe Camera Raw Filter",
		CMod: {
			t: "TEXT",
			v: "Filter"
		},
		Sett: {
			t: "enum",
			v: {
				Sett: "Cst"
			}
		},
		WBal: {
			t: "enum",
			v: {
				WBal: "AsSh"
			}
		},
		Temp: {
			t: "long",
			v: 0
		},
		Tint: {
			t: "long",
			v: 0
		},
		CtoG: {
			t: "bool",
			v: !1
		},
		Strt: {
			t: "long",
			v: 0
		},
		Shrp: {
			t: "long",
			v: 0
		},
		LNR: {
			t: "long",
			v: 0
		},
		CNR: {
			t: "long",
			v: 0
		},
		VigA: {
			t: "long",
			v: 0
		},
		BlkB: {
			t: "long",
			v: 0
		},
		RHue: {
			t: "long",
			v: 0
		},
		RSat: {
			t: "long",
			v: 0
		},
		GHue: {
			t: "long",
			v: 0
		},
		GSat: {
			t: "long",
			v: 0
		},
		BHue: {
			t: "long",
			v: 0
		},
		BSat: {
			t: "long",
			v: 0
		},
		Vibr: {
			t: "long",
			v: 0
		},
		HA_R: {
			t: "long",
			v: 0
		},
		HA_O: {
			t: "long",
			v: 0
		},
		HA_Y: {
			t: "long",
			v: 0
		},
		HA_G: {
			t: "long",
			v: 0
		},
		HA_A: {
			t: "long",
			v: 0
		},
		HA_B: {
			t: "long",
			v: 0
		},
		HA_P: {
			t: "long",
			v: 0
		},
		HA_M: {
			t: "long",
			v: 0
		},
		SA_R: {
			t: "long",
			v: 0
		},
		SA_O: {
			t: "long",
			v: 0
		},
		SA_Y: {
			t: "long",
			v: 0
		},
		SA_G: {
			t: "long",
			v: 0
		},
		SA_A: {
			t: "long",
			v: 0
		},
		SA_B: {
			t: "long",
			v: 0
		},
		SA_P: {
			t: "long",
			v: 0
		},
		SA_M: {
			t: "long",
			v: 0
		},
		LA_R: {
			t: "long",
			v: 0
		},
		LA_O: {
			t: "long",
			v: 0
		},
		LA_Y: {
			t: "long",
			v: 0
		},
		LA_G: {
			t: "long",
			v: 0
		},
		LA_A: {
			t: "long",
			v: 0
		},
		LA_B: {
			t: "long",
			v: 0
		},
		LA_P: {
			t: "long",
			v: 0
		},
		LA_M: {
			t: "long",
			v: 0
		},
		STSH: {
			t: "long",
			v: 0
		},
		STSS: {
			t: "long",
			v: 0
		},
		STHH: {
			t: "long",
			v: 0
		},
		STHS: {
			t: "long",
			v: 0
		},
		STB: {
			t: "long",
			v: 0
		},
		PC_S: {
			t: "long",
			v: 0
		},
		PC_D: {
			t: "long",
			v: 0
		},
		PC_L: {
			t: "long",
			v: 0
		},
		PC_H: {
			t: "long",
			v: 0
		},
		PC_1: {
			t: "long",
			v: 25
		},
		PC_2: {
			t: "long",
			v: 50
		},
		PC_3: {
			t: "long",
			v: 75
		},
		ShpR: {
			t: "doub",
			v: 1
		},
		ShpD: {
			t: "long",
			v: 25
		},
		ShpM: {
			t: "long",
			v: 0
		},
		PCVA: {
			t: "long",
			v: 0
		},
		GRNA: {
			t: "long",
			v: 0
		},
		LPEn: {
			t: "long",
			v: 0
		},
		MDis: {
			t: "long",
			v: 0
		},
		PerV: {
			t: "long",
			v: 0
		},
		PerH: {
			t: "long",
			v: 0
		},
		PerR: {
			t: "doub",
			v: 0
		},
		PerS: {
			t: "long",
			v: 100
		},
		PerA: {
			t: "long",
			v: 0
		},
		PerU: {
			t: "long",
			v: 0
		},
		PerX: {
			t: "doub",
			v: 0
		},
		PerY: {
			t: "doub",
			v: 0
		},
		AuCA: {
			t: "long",
			v: 0
		},
		Ex12: {
			t: "doub",
			v: 0
		},
		Cr12: {
			t: "long",
			v: 0
		},
		Hi12: {
			t: "long",
			v: 0
		},
		Sh12: {
			t: "long",
			v: 0
		},
		Wh12: {
			t: "long",
			v: 0
		},
		Bk12: {
			t: "long",
			v: 0
		},
		Cl12: {
			t: "long",
			v: 0
		},
		DfPA: {
			t: "long",
			v: 0
		},
		DPHL: {
			t: "long",
			v: 30
		},
		DPHH: {
			t: "long",
			v: 70
		},
		DfGA: {
			t: "long",
			v: 0
		},
		DPGL: {
			t: "long",
			v: 40
		},
		DPGH: {
			t: "long",
			v: 60
		},
		Dhze: {
			t: "long",
			v: 0
		},
		TMMs: {
			t: "long",
			v: 0
		},
		Crv: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 255
			}, {
				t: "long",
				v: 255
			}]
		},
		CrvR: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 255
			}, {
				t: "long",
				v: 255
			}]
		},
		CrvG: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 255
			}, {
				t: "long",
				v: 255
			}]
		},
		CrvB: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 255
			}, {
				t: "long",
				v: 255
			}]
		},
		CamP: {
			t: "TEXT",
			v: "Embedded"
		},
		CP_D: {
			t: "TEXT",
			v: "54650A341B5B5CCAE8442D0B43A92BCE"
		},
		PrVe: {
			t: "long",
			v: 184549376
		},
		Rtch: {
			t: "TEXT",
			v: ""
		},
		REye: {
			t: "TEXT",
			v: ""
		},
		LCs: {
			t: "TEXT",
			v: ""
		},
		Look: {
			t: "TEXT",
			v: ""
		},
		Pset: {
			t: "TEXT",
			v: ""
		}
	};
	if (l == "smartSharpen") d = {
		__name: "Smart Sharpen",
		classID: "smartSharpen",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		useLegacy: {
			t: "bool",
			v: !1
		},
		Amnt: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 150
			}
		},
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 1
			}
		},
		noiseReduction: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 0
			}
		},
		blur: {
			t: "enum",
			v: {
				blurType: "GsnB"
			}
		}
	};
	if (l == "UnsM") d = {
		__name: "Unsharp Mask",
		classID: "UnsM",
		Amnt: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 142
			}
		},
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 4.5
			}
		},
		Thsh: {
			t: "long",
			v: 0
		}
	};
	if (l == "HghP") d = {
		__name: "High Pass",
		classID: "HghP",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 3
			}
		}
	};
	if (l == "HsbP") d = {
		__name: "HSB/HSL",
		classID: "HsbP",
		Inpt: {
			t: "enum",
			v: {
				ClrS: "RGBC"
			}
		},
		Otpt: {
			t: "enum",
			v: {
				ClrS: "HSBl"
			}
		}
	};
	if (l == "Mxm ") d = {
		__name: "Maximum",
		classID: "Mxm",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 8
			}
		},
		preserveShape: {
			t: "enum",
			v: {
				preserveShape: "squareness"
			}
		}
	};
	if (l == "Mnm ") d = {
		__name: "Minimum",
		classID: "Mnm",
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 8
			}
		},
		preserveShape: {
			t: "enum",
			v: {
				preserveShape: "squareness"
			}
		}
	};
	if (l == "Ofst") d = {
		__name: "Offset",
		classID: "Ofst",
		Hrzn: {
			t: "long",
			v: 144
		},
		Vrtc: {
			t: "long",
			v: 278
		},
		Fl: {
			t: "enum",
			v: {
				FlMd: "Wrp"
			}
		}
	};
	if (l == "Kale") d = {
		__name: "Kaleidoscope",
		classID: "Kale",
		Mirr: {
			t: "long",
			v: 6
		},
		MRot: {
			t: "long",
			v: 0
		}
	};
	if (l == "Rept") d = {
		__name: "Repeat",
		classID: "Rept",
		Scl: {
			v: {
				type: "#Prc",
				val: 100
			},
			t: "UntF"
		},
		Rsft: {
			v: {
				type: "#Prc",
				val: 0
			},
			t: "UntF"
		},
		SpcX: {
			v: {
				type: "#Prc",
				val: 0
			},
			t: "UntF"
		},
		SpcY: {
			v: {
				type: "#Prc",
				val: 0
			},
			t: "UntF"
		},
		SpcC: {
			t: "bool",
			v: !1
		},
		Angl: {
			t: "long",
			v: 0
		}
	};
	if (l == "Flam") d = {
		__name: "Repeat",
		classID: "Flam",
		Type: {
			t: "long",
			v: 0
		},
		Leng: {
			t: "long",
			v: 140
		},
		RndL: {
			t: "bool",
			v: !1
		},
		Widt: {
			t: "long",
			v: 100
		},
		Angl: {
			t: "long",
			v: 0
		},
		Intr: {
			t: "long",
			v: 100
		},
		Adpt: {
			t: "bool",
			v: !1
		},
		Qual: {
			t: "long",
			v: 1
		},
		Clr: {
			v: {
				classID: "RGBC",
				Rd: {
					v: 255,
					t: "doub"
				},
				Grn: {
					v: 110,
					t: "doub"
				},
				Bl: {
					v: 28,
					t: "doub"
				}
			},
			t: "Objc"
		},
		Turb: {
			t: "long",
			v: 50
		},
		Jag: {
			t: "long",
			v: 0
		},
		Opct: {
			v: {
				type: "#Prc",
				val: 25
			},
			t: "UntF"
		},
		Lins: {
			t: "long",
			v: 10
		},
		Botm: {
			t: "long",
			v: 30
		},
		Styl: {
			t: "long",
			v: 0
		},
		Shap: {
			t: "long",
			v: 0
		},
		RnSh: {
			t: "bool",
			v: !1
		},
		Arng: {
			t: "long",
			v: 18
		}
	};
	if (l == "Ctoa") d = {
		__name: "Color to Alpha",
		classID: "Ctoa",
		Trsp: {
			v: {
				type: "#Prc",
				val: 0
			},
			t: "UntF"
		},
		Opct: {
			v: {
				type: "#Prc",
				val: 100
			},
			t: "UntF"
		},
		Clr: {
			v: {
				classID: "RGBC",
				Rd: {
					v: 0,
					t: "doub"
				},
				Grn: {
					v: 0,
					t: "doub"
				},
				Bl: {
					v: 0,
					t: "doub"
				}
			},
			t: "Objc"
		}
	};
	if (l == "brit") d = {
		__name: "Brightness/Contrast",
		classID: "BrgC",
		Brgh: {
			t: "long",
			v: 0
		},
		Cntr: {
			t: "long",
			v: 0
		},
		useLegacy: {
			t: "bool",
			v: !1
		}
	};
	if (l == "levl") d = {
		__name: "Levels",
		classID: "Lvls",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		Adjs: {
			t: "VlLs",
			v: []
		}
	};
	if (l == "curv") d = {
		__name: "Curves",
		classID: "Crvs",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		Adjs: {
			t: "VlLs",
			v: []
		}
	};
	if (l == "expA") d = {
		__name: "Exposure",
		classID: "Exps",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		Exps: {
			t: "doub",
			v: 0
		},
		Ofst: {
			t: "doub",
			v: 0
		},
		gammaCorrection: {
			t: "doub",
			v: 1
		}
	};
	if (l == "vibA") d = {
		__name: "Vibrance",
		classID: "vibrance",
		vibrance: {
			t: "long",
			v: 0
		},
		Strt: {
			t: "long",
			v: 0
		}
	};
	if (l == "hue2") d = {
		__name: "Hue/Saturation",
		classID: "HStr",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		Clrz: {
			t: "bool",
			v: !1
		},
		Adjs: {
			t: "VlLs",
			v: []
		}
	};
	if (l == "blnc") d = {
		__name: "Color Balance",
		classID: "ClrB",
		ShdL: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}]
		},
		MdtL: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}]
		},
		HghL: {
			t: "VlLs",
			v: [{
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}, {
				t: "long",
				v: 0
			}]
		},
		PrsL: {
			t: "bool",
			v: !0
		}
	};
	if (l == "blwh") d = {
		__name: "Black & White",
		classID: "BanW",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		Rd: {
			t: "long",
			v: 40
		},
		Yllw: {
			t: "long",
			v: 85
		},
		Grn: {
			t: "long",
			v: 204
		},
		Cyn: {
			t: "long",
			v: 60
		},
		Bl: {
			t: "long",
			v: 20
		},
		Mgnt: {
			t: "long",
			v: 80
		},
		useTint: {
			t: "bool",
			v: !0
		},
		tintColor: {
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
					v: 0
				}
			}
		}
	};
	if (l == "phfl") d = {
		__name: "Photo Filter",
		classID: "photoFilter",
		Clr: {
			t: "Objc",
			v: {
				classID: "LbCl",
				Lmnc: {
					t: "doub",
					v: 67.06
				},
				A: {
					t: "doub",
					v: 32
				},
				B: {
					t: "doub",
					v: 120
				}
			}
		},
		Dnst: {
			t: "long",
			v: 80
		},
		PrsL: {
			t: "bool",
			v: !0
		}
	};
	if (l == "grdm") d = {
		__name: "Gradient Map",
		classID: "GrMp",
		Rvrs: {
			t: "bool",
			v: !1
		},
		Grad: JSON.parse(LayerStyleConstants.defaultEffectJsonStrings[6]).Grad
	};
	if (l == "selc") d = {
		__name: "Selective Color",
		classID: "SlcC",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindCustom"
			}
		},
		Mthd: {
			t: "enum",
			v: {
				CrcM: "Rltv"
			}
		},
		ClrC: {
			t: "VlLs",
			v: []
		}
	};
	if (l == "thrs") d = {
		__name: "Threshold",
		classID: "Thrs",
		Lvl: {
			t: "long",
			v: 128
		}
	};
	if (l == "mixr") d = {
		__name: "Channel Mixer",
		classID: "ChnM",
		presetKind: {
			t: "enum",
			v: {
				presetKindType: "presetKindDefault"
			}
		},
		Mnch: {
			t: "bool",
			v: !1
		},
		Rd: {
			t: "Objc",
			v: {
				classID: "ChMx",
				Rd: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 100
					}
				}
			}
		},
		Grn: {
			t: "Objc",
			v: {
				classID: "ChMx",
				Grn: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 100
					}
				}
			}
		},
		Bl: {
			t: "Objc",
			v: {
				classID: "ChMx",
				Bl: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 100
					}
				}
			}
		}
	};
	if (l == "clrL") d = {
		__name: "Color Lookup",
		classID: "colorLookup"
	};
	if (l == "post") d = {
		__name: "Posterize",
		classID: "Pstr",
		Lvls: {
			t: "long",
			v: 3
		}
	};
	if (l == "rplc") d = {
		__name: "Replace Color",
		classID: "RplC",
		Fzns: {
			t: "long",
			v: 55
		},
		Mnm: {
			t: "Objc",
			v: {
				classID: "LbCl",
				Lmnc: {
					t: "doub",
					v: 73.1
				},
				A: {
					t: "doub",
					v: 23.95
				},
				B: {
					t: "doub",
					v: 8.03
				}
			}
		},
		Mxm: {
			t: "Objc",
			v: {
				classID: "LbCl",
				Lmnc: {
					t: "doub",
					v: 73
				},
				A: {
					t: "doub",
					v: 23
				},
				B: {
					t: "doub",
					v: 8
				}
			}
		},
		H: {
			t: "long",
			v: -22
		},
		Strt: {
			t: "long",
			v: 0
		},
		Lght: {
			t: "long",
			v: 0
		}
	};
	if (l == "fade") d = {
		__name: "Fade",
		classID: "fade",
		Opct: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 100
			}
		},
		Md: {
			t: "enum",
			v: {
				BlnM: "Nrml"
			}
		}
	};
	if (l == "aply") d = {
		classID: "null",
		With: {
			t: "Objc",
			v: {
				classID: "Clcl",
				T: {
					t: "obj ",
					v: [{
						t: "Enmr",
						v: {
							classID: "Chnl",
							typeID: "Chnl",
							enum: "RGB"
						}
					}, {
						t: "Enmr",
						v: {
							classID: "Lyr",
							typeID: "Ordn",
							enum: "Mrgd"
						}
					}]
				},
				Invr: {
					t: "bool",
					v: !1
				},
				Clcl: {
					t: "enum",
					v: {
						Clcn: "Nrml"
					}
				},
				Opct: {
					t: "UntF",
					v: {
						type: "#Prc",
						val: 100
					}
				},
				Ofst: {
					t: "long",
					v: 128
				},
				Scl: {
					t: "doub",
					v: 1
				},
				PrsT: {
					t: "bool",
					v: !1
				}
			}
		}
	};
	if (l == "matc") {
		d = {
			__name: "Match Color",
			classID: "matchColor",
			Lght: {
				t: "long",
				v: 100
			},
			ClrR: {
				t: "long",
				v: 100
			},
			Fade: {
				t: "long",
				v: 0
			},
			fsel: {
				t: "bool",
				v: !0
			},
			neutralizeColor: {
				t: "bool",
				v: !1
			},
			noReference: {
				t: "bool",
				v: !0
			}
		}
	}
	if (l == "Dila") d = {
		__name: "Texture Dilation",
		classID: "Dila",
		Crop: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 0
			}
		},
		Rds: {
			t: "UntF",
			v: {
				type: "#Pxl",
				val: 10
			}
		}
	};
	if (l == "blendOptions") d = {
		classID: "blendOptions",
		Opct: {
			t: "UntF",
			v: {
				type: "#Prc",
				val: 100
			}
		},
		Md: {
			t: "enum",
			v: {
				BlnM: "Nrml"
			}
		}
	};
	return d
};
FilterHelper.It = {
	sFlam: function(l, d) {
		d[0] = l.Type.v;
		d[1] = l.Leng.v;
		d[2] = l.RndL.v;
		d[3] = l.Widt.v;
		d[4] = l.Angl.v;
		d[5] = l.Intr.v;
		d[6] = l.Adpt.v;
		d[7] = l.Clr.v;
		d[8] = l.Qual.v;
		d[9] = l.Turb.v;
		d[10] = l.Jag.v;
		d[11] = l.Opct.v.val;
		d[12] = l.Lins.v;
		d[13] = l.Botm.v;
		d[14] = l.Styl.v;
		d[15] = l.Shap.v;
		d[16] = l.RnSh.v;
		d[17] = l.Arng.v
	},
	gFlam: function(l, d) {
		l.Type.v = d[0];
		l.Leng.v = d[1];
		l.RndL.v = d[2];
		l.Widt.v = d[3];
		l.Angl.v = d[4];
		l.Intr.v = d[5];
		l.Adpt.v = d[6];
		l.Clr.v = d[7];
		l.Qual.v = d[8];
		l.Turb.v = d[9];
		l.Jag.v = d[10];
		l.Opct.v.val = d[11];
		l.Lins.v = d[12];
		l.Botm.v = d[13];
		l.Styl.v = d[14];
		l.Shap.v = d[15];
		l.RnSh.v = d[16];
		l.Arng.v = d[17]
	},
	sAdNs: function(l, d) {
		d[0] = l.Nose.v.val;
		d[1] = ["Gsn", "Unfr"].indexOf(l.Dstr.v.Dstr);
		d[2] = l.Mnch.v
	},
	gAdNs: function(l, d) {
		l.Nose.v.val = d[0];
		l.Dstr.v.Dstr = ["Gsn", "Unfr"][d[1]];
		l.Mnch.v = d[2]
	},
	sDstS: function(l, d) {
		d[0] = l.Rds.v;
		d[1] = l.Thsh.v
	},
	gDstS: function(l, d) {
		l.Rds.v = d[0];
		l.Thsh.v = d[1]
	},
	sGsnB: function(l, d) {
		d[0] = l.Rds.v.val
	},
	gGsnB: function(l, d) {
		l.Rds.v.val = d[0]
	},
	sDila: function(l, d) {
		d[0] = l.Crop.v.val;
		d[1] = l.Rds.v.val
	},
	gDila: function(l, d) {
		l.Crop.v.val = d[0];
		l.Rds.v.val = d[1]
	},
	sHghP: function(l, d) {
		d[0] = l.Rds.v.val
	},
	gHghP: function(l, d) {
		l.Rds.v.val = d[0]
	},
	sHsbP: function(l, d) {
		var G = ["RGBC", "HSBl", "HSLC"];
		d[0] = G.indexOf(l.Inpt.v.ClrS);
		d[1] = G.indexOf(l.Otpt.v.ClrS)
	},
	gHsbP: function(l, d) {
		var G = ["RGBC", "HSBl", "HSLC"];
		l.Inpt.v.ClrS = G[d[0]];
		l.Otpt.v.ClrS = G[d[1]]
	},
	"sMxm ": function(l, d) {
		var G = "preserveShape";
		d[0] = l.Rds.v.val;
		d[1] = l[G] ? ["squareness", "Rndn"].indexOf(l[G].v[G]) : 0
	},
	"gMxm ": function(l, d) {
		var G = "preserveShape";
		l.Rds.v.val = d[0];
		l[G] = {
			t: "enum",
			v: {
				preserveShape: ["squareness", "Rndn"][d[1]]
			}
		}
	},
	"sMnm ": function(l, d) {
		var G = "preserveShape";
		d[0] = l.Rds.v.val;
		d[1] = l[G] ? ["squareness", "Rndn"].indexOf(l[G].v[G]) : 0
	},
	"gMnm ": function(l, d) {
		var G = "preserveShape";
		l.Rds.v.val = d[0];
		l[G] = {
			t: "enum",
			v: {
				preserveShape: ["squareness", "Rndn"][d[1]]
			}
		}
	},
	sMtnB: function(l, d) {
		d[0] = [l.Angl.v];
		d[1] = l.Dstn.v.val;
	},
	gMtnB: function(l, d) {
		l.Angl.v = typeof d[0] == "number" ? d[0] : d[0][0];
		l.Dstn.v.val = d[1]
	},
	sOfst: function(l, d) {
		d[0] = l.Hrzn.v;
		d[1] = l.Vrtc.v;
		d[2] = ["Rpt", "Bckg", "Wrp"].indexOf(l.Fl.v.FlMd)
	},
	gOfst: function(l, d) {
		l.Hrzn.v = d[0];
		l.Vrtc.v = d[1];
		l.Fl.v.FlMd = ["Rpt", "Bckg", "Wrp"][d[2]]
	},
	sPnch: function(l, d) {
		d[0] = l.Amnt.v
	},
	gPnch: function(l, d) {
		l.Amnt.v = d[0]
	},
	"sPlr ": function(l, d) {
		d[0] = ["RctP", "PlrR"].indexOf(l.Cnvr.v.Cnvr)
	},
	"gPlr ": function(l, d) {
		l.Cnvr.v.Cnvr = ["RctP", "PlrR"][d[0]]
	},
	sRple: function(l, d) {
		d[0] = l.Amnt.v;
		d[1] = ["Sml", "Mdm", "Lrg"].indexOf(l.RplS.v.RplS)
	},
	gRple: function(l, d) {
		l.Amnt.v = d[0];
		l.RplS.v.RplS = ["Sml", "Mdm", "Lrg"][d[1]]
	},
	sTwrl: function(l, d) {
		d[0] = l.Angl.v
	},
	gTwrl: function(l, d) {
		l.Angl.v = d[0]
	},
	sZgZg: function(l, d) {
		d[0] = l.Amnt.v;
		d[1] = l.NmbR.v;
		d[2] = ["ArnC", "OtFr", "PndR"].indexOf(l.ZZTy.v.ZZTy)
	},
	gZgZg: function(l, d) {
		l.Amnt.v = d[0];
		l.NmbR.v = d[1];
		l.ZZTy.v.ZZTy = ["ArnC", "OtFr", "PndR"][d[2]]
	},
	sUnsM: function(l, d) {
		d[0] = l.Amnt.v.val;
		d[1] = l.Rds.v.val;
		d[2] = l.Thsh.v
	},
	gUnsM: function(l, d) {
		l.Amnt.v.val = d[0];
		l.Rds.v.val = d[1];
		l.Thsh.v = d[2]
	},
	sWave: function(l, d) {
		d[0] = l.NmbG.v;
		d[1] = l.WLMn.v;
		d[2] = l.WLMx.v;
		d[3] = l.AmMn.v;
		d[4] = l.AmMx.v;
		d[5] = l.SclH.v;
		d[6] = l.SclV.v;
		d[7] = ["WvSn", "WvTr", "WvSq"].indexOf(l.Wvtp.v.Wvtp);
		d[8] = ["WrpA", "RptE"].indexOf(l.UndA.v.UndA);
		d[9] = l.RndS.v
	},
	gWave: function(l, d) {
		l.NmbG.v = d[0];
		l.WLMn.v = d[1];
		l.WLMx.v = d[2];
		l.AmMn.v = d[3];
		l.AmMx.v = d[4];
		l.SclH.v = d[5];
		l.SclV.v = d[6];
		l.Wvtp.v.Wvtp = ["WvSn", "WvTr", "WvSq"][d[7]];
		l.UndA.v.UndA = ["WrpA", "RptE"][d[8]];
		if (d[9] != null) {
			var G = parseInt(d[9]);
			if (isNaN(G)) G = 248325464;
			G = Math.max(0, Math.min(268435455, G));
			l.RndS.v = G
		}
	},
	sbrit: function(l, d) {
		d[0] = l.Brgh ? l.Brgh.v : 0;
		d[1] = l.Cntr ? l.Cntr.v : 0;
		d[2] = l.useLegacy ? l.useLegacy.v : !1
	},
	gbrit: function(l, d) {
		l.Brgh.v = d[0];
		l.Cntr.v = d[1];
		if (d[2] != null) l.useLegacy.v = d[2]
	}
};
FilterHelper.abE = function(l) {
	var d = new Point2D(0, 0);
	if (l.enab.v == !1) return d;
	var G = l.filterFXList.v;
	for (var A = 0; A < G.length; A++) {
		var b = G[A].v;
		if (b.enab.v == !1) continue;
		var V = FilterHelper.ko(b),
			Q = FilterHelper.dn(V, b.Fltr ? b.Fltr.v : null);
		if (Q.x > d.x) d.x = Q.x;
		if (Q.y > d.y) d.y = Q.y
	}
	return d
};
FilterHelper.dn = function(l, d) {
	var G = 0,
		b = 0;
	if (["GsnB", "boxblur", "smartSharpen", "UnsM", "HghP"].indexOf(l) != -1) {
		var V = d.Rds ? d.Rds.v.val : 1;
		G = b = V * 2.57
	}
	if (l == "MtnB") G = b = d.Dstn.v.val;
	if ("Dila,Ofst,Rept,LqFy,Dspl,Pnch,Rple,Shr ,Sphr,Twrl,ZgZg,Wave,RdlB,Clds,DfrC,Plr ,LnCr,Wnd ,lightFilterGradient,rigidTransform,Frgm,Flam".split(",").indexOf(l) != -1) {
		G = b = 1e4
	}
	if (l == "GEfc") return TextStyleHelper.dn(d);
	return new Point2D(Math.ceil(G), Math.ceil(b))
};
FilterHelper.A8 = function() {
	return {
		t: "Objc",
		v: {
			classID: "filterFXStyle",
			enab: {
				t: "bool",
				v: !0
			},
			validAtPosition: {
				t: "bool",
				v: !0
			},
			filterMaskEnable: {
				t: "bool",
				v: !0
			},
			filterMaskLinked: {
				t: "bool",
				v: !0
			},
			filterMaskExtendWithWhite: {
				t: "bool",
				v: !0
			},
			filterFXList: {
				t: "VlLs",
				v: []
			}
		}
	}
};
FilterHelper.bO = function(l, d) {
	var G = {
			o: d.Y7 >> 16,
			J: d.Y7 >> 8 & 255,
			k: d.Y7 & 255
		},
		b = {
			o: d.GF >> 16,
			J: d.GF >> 8 & 255,
			k: d.GF & 255
		},
		V = FilterHelper.names[l];
	if (V == null) V = LayerEffectsHelper.names[l];
	var Q = l;
	for (var t in LayerEffectsHelper.classIdToKey)
		if (LayerEffectsHelper.classIdToKey[t] == l) Q = t;
	var I = {
			t: "Objc",
			v: {
				classID: "filterFX",
				Nm: {
					t: "TEXT",
					v: languageManager.get(V)
				},
				blendOptions: {
					t: "Objc",
					v: {
						classID: "blendOptions",
						Opct: {
							t: "UntF",
							v: {
								type: "#Prc",
								val: 100
							}
						},
						Md: {
							t: "enum",
							v: {
								BlnM: "Nrml"
							}
						}
					}
				},
				enab: {
					t: "bool",
					v: !0
				},
				hasoptions: {
					t: "bool",
					v: !0
				},
				FrgC: {
					t: "Objc",
					v: PixelUtil.color.rgbColorDescriptor(G)
				},
				BckC: {
					t: "Objc",
					v: PixelUtil.color.rgbColorDescriptor(b)
				},
				filterID: {
					t: "long",
					v: Q.length == 4 ? X.afT(Q) : 777
				}
			}
		},
		y = FilterHelper.oT(l);
	if (y) I.v.Fltr = {
		t: "Objc",
		v: y
	};
	return I
};
FilterHelper.OR = function(l, d, G, b) {
	var V = Date.now(),
		Q = WebGLContext.webglAvailable && Math.max(b.m, b.n) <= WebGLContext.gl.getParameter(WebGLContext.gl.MAX_TEXTURE_SIZE);
	if (l < 1) {
		var t = Math.round(l * 5),
			I = [1, 2, 1, 2, [40, 26, 13, 6, 4, 2][t], 2, 1, 2, 1];
		I = PixelUtil.s9.nn(I);
		if (!Q) {
			PixelUtil.premultiplyAlphaRgb(G);
			var y = G.slice(0);
			PixelUtil.s9.iZ(y, G, b.m, b.n, I, 255);
			PixelUtil.unpremultiplyAlphaRgb(G)
		} else {
			var e = b.m,
				M = b.n,
				R = WebGLContext.getOrCreateTexture(0, e, M);
			R.set(G);
			var J = WebGLContext.getOrCreateTexture(1, e, M),
				n = new Float32Array([1 / e, 1 / M]);
			WebGLContext.setFramebufferViewport(J);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.a5O,
				wl: n,
				ajP: new Float32Array(I)
			}, R.glTexture);
			J.get(G)
		}
	} else {
		var r = d == PixelUtil.sX.Eh ? 0 : d == PixelUtil.sX.Ej ? 1 : 2,
			T = [];
		while (r != 2 && l * [1, 2.4][r] > 20 && T.length < 4) {
			var j = PixelUtil.downsampleRgbaWeighted(G, b);
			T.push(G, b);
			G = j.QI;
			b = j.rect;
			l /= 2
		}
		var e = b.m,
			M = b.n;
		if (!Q || r == 2 && l > 15) {
			PixelUtil.premultiplyAlphaRgb(G);
			d(G, b, l);
			PixelUtil.unpremultiplyAlphaRgb(G)
		} else {
			var R = WebGLContext.getOrCreateTexture(0, e, M);
			R.set(G);
			var J = WebGLContext.getOrCreateTexture(1, e, M),
				n = new Float32Array([1 / e, 1 / M]);
			if (r == 0) {
				var g = 1;
				while (g < l) g <<= 1;
				WebGLContext.setFramebufferViewport(J);
				WebGLContext.filter.wF({
					type: WebGLContext.filter.Yx,
					wl: n,
					kr: l,
					Ye: [0, 0, g]
				}, R.glTexture);
				WebGLContext.setFramebufferViewport(R);
				WebGLContext.filter.wF({
					type: WebGLContext.filter.Yx,
					wl: n,
					kr: l,
					Ye: [0, 1, g]
				}, J.glTexture);
				R.get(G)
			} else if (r == 1) {
				var Y = 3,
					k = PixelUtil.sX.pE(l, Y);
				for (var A = 0; A < Y; A++) {
					var F = k[A] >>> 1,
						D = 1;
					while (D < F) D <<= 1;
					if (F == 0) continue;
					WebGLContext.setFramebufferViewport(J);
					WebGLContext.filter.wF({
						type: WebGLContext.filter.Yx,
						wl: n,
						kr: F,
						Ye: [0, 0, D]
					}, R.glTexture);
					WebGLContext.setFramebufferViewport(R);
					WebGLContext.filter.wF({
						type: WebGLContext.filter.Yx,
						wl: n,
						kr: F,
						Ye: [0, 1, D]
					}, J.glTexture)
				}
				R.get(G)
			} else {
				var g = 1;
				while (g < l) g <<= 1;
				WebGLContext.setFramebufferViewport(J);
				WebGLContext.filter.wF({
					type: WebGLContext.filter.Yx,
					wl: n,
					kr: l,
					Ye: [0, 0, g]
				}, R.glTexture);
				J.get(G)
			}
		}
		var q = Date.now();
		while (T.length != 0) {
			var H = T.pop(),
				W = T.pop();
			PixelUtil.scale.an5(G, b.m, b.n, W, H.m, H.n);
			G = W;
			b = H
		}
	}
};
FilterHelper.am8 = function(l, d, G, b) {
	for (var A = 0; A < l.length; A++) {
		G[A] = l[A] * (1 / 255);
		b[A] = 0
	}
	FFT.fft2d(G, b);
	var V = d >>> 1,
		Q = 16384,
		t = 128,
		y = 100;
	while (t < d) {
		t <<= 1;
		Q <<= 2
	}
	var I = 255 / Math.log(Q),
		e = -100;
	for (var M = 0; M < d; M++)
		for (var R = 0; R < V; R++) {
			var J = d + V + M & d - 1,
				n = G[J * d + R],
				r = b[J * d + R],
				T = Math.sqrt(n * n + r * r),
				j = Math.atan2(r, n);
			l[M * d + R] = Math.round(I * Math.log(T + 1));
			l[M * d + V + R] = Math.round((Math.PI + j) * (255 * .5 / Math.PI))
		}
};
FilterHelper.a55 = function(l, d, G, b) {
	G.fill(0);
	b.fill(0);
	var V = d >>> 1,
		Q = 16384,
		t = 128;
	while (t < d) {
		t <<= 1;
		Q <<= 2
	}
	var I = 255 / Math.log(Q),
		y = [],
		e = [],
		M = [];
	for (var A = 0; A < 256; A++) {
		y[A] = Math.exp(A / I) - 1;
		var R = A * (2 * Math.PI / 255) - Math.PI;
		e[A] = Math.sin(R);
		M[A] = Math.cos(R)
	}
	for (var J = 0; J < d; J++)
		for (var n = 0; n < V; n++) {
			var r = d + V + J & d - 1,
				T = y[l[J * d + n]],
				R = l[J * d + V + n],
				j = T * M[R],
				g = T * e[R];
			G[r * d + n] = j;
			b[r * d + n] = g;
			if (n != 0) {
				var Y = r == 0 ? r * d + d - n : (d - r) * d + (d - n);
				G[Y] = j;
				b[Y] = -g
			}
		}
	FFT.ifft2d(G, b);
	for (var A = 0; A < l.length; A++) {
		l[A] = Math.max(0, Math.min(255, ~~(.5 + 255 * G[A])))
	}
};
FilterHelper.a8u = new ArrayBuffer(512);
FilterHelper.agY = function(l) {
	var d = FilterHelper.a8u,
		G = l.length;
	if (d.byteLength < G) FilterHelper.a8u = d = new ArrayBuffer(G);
	var b = new Uint8Array(d);
	for (var A = 0; A < G; A += 4) {
		b[A] = l[A];
		b[A + 1] = l[A + 1];
		b[A + 2] = l[A + 2];
		b[A + 3] = l[A + 3]
	}
	return d
};
FilterHelper.Qz = function(l, d, G, b, V, Q, t) {
	if (Q == null) Q = {
		buffer: PixelUtil.allocBytes(d.buffer.length),
		rect: d.rect.clone()
	};
	Q.buffer.set(d.buffer);
	var I = G && G.RndS ? G.RndS.v >>> 1 : 0;
	if (l == "GEfc") {
		var y = [];
		if (G.GEfs) {
			var e = G.GEfs.v;
			for (var A = 0; A < e.length; A++) {
				var M = e[A].v;
				if (M.GELv && M.GELv.v == !1) continue;
				y.push(M)
			}
		} else y = [G];
		for (var A = 0; A < y.length; A++) {
			var R;
			if (A == 0) TextStyleHelper.Qz(l, d, y[A], b, V, Q, t);
			else {
				if (R == null) R = {
					buffer: PixelUtil.allocBytes(d.buffer.length),
					rect: d.rect.clone()
				};
				PixelUtil.copyByteBuffer(Q.buffer, R.buffer);
				TextStyleHelper.Qz(l, R, y[A], b, V, Q, t)
			}
		}
	}
	if (l == "Dila") {
		var J = G.Crop.v.val,
			n = G.Rds.v.val + J;
		n = n * n;
		if (n == 0) return;
		var r = d.rect,
			T = r.m,
			j = r.n,
			g = T * j,
			Y = d.buffer,
			R = Q.buffer,
			k = PixelUtil.allocBytes(g);
		PixelUtil.extractChannelFromRgba(Y, k, 3);
		if (J != 0) {
			var F = r.clone();
			F.rC(1, 1);
			var D = PixelUtil.allocBytes(F.O());
			PixelUtil.copyBufferRect(k, r, D, F);
			PixelUtil.invertUint32Buffer(D);
			PixelUtil.style.stroke(D, D, F, J);
			PixelUtil.invertUint32Buffer(D);
			PixelUtil.copyBufferRect(D, F, k, r)
		}
		var q = PixelUtil.style.i5(k, T, j);
		R.fill(0);
		for (var H = 0; H < j; H++)
			for (var W = 0; W < T; W++) {
				var A = H * T + W,
					Z = A << 1,
					B = A << 2,
					a = q[Z],
					m = q[Z + 1];
				if (a * a + m * m < n) {
					var p = (H + m) * T + (W + a) << 2;
					R[B] = Y[p];
					R[B + 1] = Y[p + 1];
					R[B + 2] = Y[p + 2];
					R[B + 3] = 255
				}
			}
	}
	if (l == "Adobe Camera Raw Filter") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			g = T * j,
			c = g * 4,
			v = g * 3,
			i = new Float32Array(T * j * 3),
			z = d.buffer;
		for (var A = 0; A < g; A++) {
			var P = A * 3,
				B = A * 4;
			i[P] = z[B] * (1 / 255);
			i[P + 1] = z[B + 1] * (1 / 255);
			i[P + 2] = z[B + 2] * (1 / 255)
		}
		var C = JSON.parse(JSON.stringify(G));
		delete C.Upri;
		delete C.GuUr;
		var h = i.slice(0);
		cL(i, T, j, h, C);
		i = h;
		z = Q.buffer;
		for (var A = 0; A < g; A++) {
			var P = A * 3,
				B = A * 4;
			z[B] = 255 * Math.max(0, Math.min(1, i[P]));
			z[B + 1] = 255 * Math.max(0, Math.min(1, i[P + 1]));
			z[B + 2] = 255 * Math.max(0, Math.min(1, i[P + 2]))
		}
	}
	if (l == "Fct ") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			g = T * j,
			c = g * 4;

		function L(b5) {
			var f_ = b5.slice(0);
			for (var H = 0; H < 3; H++)
				for (var W = 0; W < 3; W++) f_[H * 3 + W] = b5[(2 - W) * 3 + H];
			return f_
		}

		function U(i_, b8, gY, jh) {
			var dL = 0;
			for (var H = 0; H < 3; H++)
				for (var W = 0; W < 3; W++) dL += b8[H * 3 + W] * i_[(jh - 1 + H) * T + gY - 1 + W];
			return dL
		}
		var S = [8, 5, 2, 5, 2, -1, 2, -1, -4],
			E = [5, 5, 5, 2, 2, 2, -1, -1, -1],
			x = [2, 2, 2, 2, 2, 2, 2, 2, 2],
			K = [];
		K.push(S);
		for (var A = 0; A < 3; A++) K.push(L(K[K.length - 1]));
		K.push(E);
		for (var A = 0; A < 3; A++) K.push(L(K[K.length - 1]));
		K.push(x);
		for (var A = 0; A < 9; A++) K[A] = PixelUtil.s9.nn(K[A]);
		var u = [-T - 1, -T, -T + 1, -1, 0, 1, T - 1, T, T + 1],
			bC = [-1, -1, 0, -1, 1, -1, -1, 0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1],
			O = PixelUtil.allocBytes(g),
			$ = new Float32Array(g),
			h = PixelUtil.allocBytes(g);
		for (var gX = 0; gX < 3; gX++) {
			PixelUtil.extractChannelFromRgba(d.buffer, O, gX);
			for (var _ = 0; _ < 1; _++) {
				for (var H = 1; H < j - 1; H++)
					for (var W = 1; W < T - 1; W++) {
						var jI = H * T + W,
							iw = O[jI];
						$[jI] = 1e9;
						for (var A = 0; A < 9; A++) {
							var hn = U(O, K[A], W, H),
								jq = (hn - iw) * (hn - iw);
							if (jq < $[jI]) $[jI] = jq
						}
					}
				for (var H = 1; H < j - 1; H++)
					for (var W = 1; W < T - 1; W++) {
						var iv = 0,
							kq = 1e9;
						for (var A = 0; A < 9; A++) {
							var eE = H * T + W + u[A],
								jq = $[eE];
							if (jq < kq) {
								kq = jq;
								iv = O[eE]
							}
						}
						h[H * T + W] = iv
					}
				O.set(h)
			}
			PixelUtil.writeChannelToRgba(h, Q.buffer, gX)
		}
	}
	if (l == "adaptCorrect") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			g = T * j,
			c = g * 4,
			e8 = G.sdwM.v,
			aI = e8.Amnt.v.val / 100,
			dK = e8.Wdth.v.val / 100,
			jC = e8.Rds.v,
			d7 = G.hglM.v,
			hS = d7.Amnt.v.val / 100,
			eH = d7.Wdth.v.val / 100,
			kA = d7.Rds.v;
		PixelUtil.tp.kt(d.buffer, Q.buffer, T, j, aI, dK, jC, hS, eH, kA, G.ClrC.v / 100, G.Cntr.v / 100)
	}
	if (l == "denoise") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			gq = G.channelDenoise.v[0].v;
		PixelUtil.YW.a9U(d.buffer, T, j, Q.buffer, gq.Amnt.v / 10, gq.EdgF.v / 100)
	}
	if (l == "HsbP") {
		var hb = G.Inpt.v.ClrS,
			ex = G.Otpt.v.ClrS,
			r = d.rect,
			T = r.m,
			j = r.n,
			g = T * j;
		for (var A = 0; A < g; A++) {
			var B = A * 4,
				_ = d.buffer[B] * (1 / 255),
				fs = d.buffer[B + 1] * (1 / 255),
				f_ = d.buffer[B + 2] * (1 / 255);
			if (hb == "RGBC") {} else if (hb == "HSLC") {
				var h = PixelUtil.hslToRgb(_, fs, f_);
				_ = h.o;
				fs = h.J;
				f_ = h.k
			} else if (hb == "HSBl") {
				var h = PixelUtil.hsvToRgb(_, fs, f_);
				_ = h.o;
				fs = h.J;
				f_ = h.k
			}
			var bD = _,
				ae = fs,
				em = f_;
			if (ex == "RGBC") {} else if (ex == "HSLC") {
				var h = PixelUtil.rgbToHsl(_, fs, f_);
				bD = h.Tq;
				ae = h.Lm;
				em = h._Z
			} else if (ex == "HSBl") {
				var h = PixelUtil.rgbToHsv(_, fs, f_);
				bD = h.Tq;
				ae = h.Lm;
				em = h.k
			}
			Q.buffer[B] = ~~(255 * bD);
			Q.buffer[B + 1] = ~~(255 * ae);
			Q.buffer[B + 2] = ~~(255 * em)
		}
	}
	if (l == "Fbrs") {
		var r = d.rect,
			T = r.m,
			j = r.n;
		PixelUtil.fx.xq(d.buffer, T, j, Q.buffer, [G.Vrnc.v, G.Strg.v, I]);
		var dY = PixelUtil.allocBytes(T * j);
		PixelUtil.extractChannelFromRgba(Q.buffer, dY, 0);
		PixelUtil.invertUint32Buffer(dY);
		TextStyleHelper.fo(dY, Q.buffer, b, V)
	}
	if (l == "Frgm") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			f7 = d.buffer.slice(0);
		PixelUtil.premultiplyAlphaRgb(f7);
		PixelUtil.fx.aiH(f7, T, j, Q.buffer);
		PixelUtil.unpremultiplyAlphaRgb(Q.buffer)
	}
	if (l == "Flam") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			bM = G.Clr.v,
			iP = {
				type: G.Type.v + 1,
				length: G.Leng.v,
				asA: G.RndL.v,
				n_: G.Widt.v,
				aiG: G.Angl.v,
				a0r: G.Intr.v,
				ajU: G.Adpt.v,
				color: {
					o: bM.Rd.v,
					J: bM.Grn.v,
					k: bM.Bl.v
				},
				Pp: G.Qual.v + 1,
				Om: G.Turb.v,
				H2: G.Jag.v,
				opacity: G.Opct.v.val,
				AF: G.Lins.v,
				apz: G.Botm.v,
				style: G.Styl.v + 1,
				shape: G.Shap.v + 1,
				a2J: G.RnSh.v,
				amT: G.Arng.v,
				apF: !1
			},
			jp = t[3],
			hG = jp[0],
			hf = jp[1],
			d2 = hG[hf.length != 0 ? hf[0] : 0];
		if (d2 == null) {
			alert("Make a path first");
			return
		}
		var gu = d2.add.vmsk.i,
			jt = PixelUtil.path.Mh(gu),
			ip = [];
		for (var p = 0; p < jt; p++) {
			var aQ = PixelUtil.path.W7(gu, p),
				iL = gu[aQ];
			if (iL.length < 2) continue;
			var jx = [];
			ip.push(jx);
			var ep = iL.length - (iL.type == 3 ? 1 : 0);
			for (var jI = 0; jI < ep; jI++) {
				var gz = gu[aQ + 1 + jI],
					ed = jI == iL.length - 1 ? gu[aQ + 1] : gu[aQ + 1 + jI + 1],
					bo = gz.H,
					d0 = gz.UU,
					S = ed.Wf,
					c0 = ed.H,
					cv = Math.round(Point2D.yZ(bo, c0) / 5);
				for (var iH = 0; iH < cv; iH++) {
					var bS = iH / cv,
						gg = 1 - bS,
						W = gg * gg * gg * bo.x + 3 * gg * gg * bS * d0.x + 3 * gg * bS * bS * S.x + bS * bS * bS * c0.x,
						H = gg * gg * gg * bo.y + 3 * gg * gg * bS * d0.y + 3 * gg * bS * bS * S.y + bS * bS * bS * c0.y;
					jx.push(W, H)
				}
			}
		}
		var bG = [ip, iP],
			jj = Date.now(),
			ay = jM(bG);
		bB(d.buffer, T, j, Q.buffer, ay, bG)
	}
	if (l == "Dfs ") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			cH = ["Nrml", "DrkO", "LghO", "anisotropic"].indexOf(G.Md.v.DfsM);
		if (cH < 3) PixelUtil.fx.ag_(d.buffer, T, j, Q.buffer, [cH]);
		else {
			var bG = [1.4, 1.6, 1, 4, !1, 2, [0, 0, .001]],
				r = d.rect.clone();
			r.x = r.y = 0;
			PixelUtil.GJ.filter(d.buffer, r, Q.buffer, bG)
		}
	}
	if (l == "TrcC") {
		var r = d.rect,
			T = r.m,
			e6 = T << 2,
			j = r.n,
			fi = G.Lvl.v,
			et = G.Edg.v.CntE == "Lwr",
			aD = d.buffer,
			c7 = Q.buffer;
		PixelUtil.andMaskUint32(c7, 16777215, 4278190080);

		function ga(gP, gB) {
			i4(gP, gB);
			i4(gP + 1, gB + 1);
			i4(gP + 2, gB + 2)
		}

		function cY(gP, gB) {
			jS(gP, gB);
			jS(gP + 1, gB + 1);
			jS(gP + 2, gB + 2)
		}

		function i4(gP, gB) {
			var bD = aD[gP],
				ae = aD[gB];
			if (bD >= fi && ae < fi) c7[gP] = 0;
			if (bD < fi && ae >= fi) c7[gB] = 0
		}

		function jS(gP, gB) {
			var bD = aD[gP],
				ae = aD[gB];
			if (bD > fi && ae <= fi) c7[gB] = 0;
			if (bD <= fi && ae > fi) c7[gP] = 0
		}
		if (et)
			for (var H = 1; H < j; H++)
				for (var W = 1; W < T; W++) {
					var B = H * T + W << 2;
					ga(B, B - 4);
					ga(B, B - e6)
				} else
					for (var H = 1; H < j; H++)
						for (var W = 1; W < T; W++) {
							var B = H * T + W << 2;
							cY(B, B - 4);
							cY(B, B - e6)
						}
	}
	if (l == "Embs") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			e7 = -G.Angl.v * Math.PI / 180,
			ct = G.Hght.v,
			bj = G.Amnt.v / 100;
		ct /= 2;
		var a = Math.cos(e7) * ct,
			m = Math.sin(e7) * ct,
			aD = d.buffer,
			c7 = Q.buffer;
		c7.fill(0);
		var jo = new Uint32Array(aD.buffer),
			h = new Uint8Array(4),
			er = new Uint32Array(h.buffer);
		for (var H = 0; H < j; H++)
			for (var W = 0; W < T; W++) {
				var iV = 0,
					h_ = 0,
					i2 = 0;
				if (0 <= W + a && W + a < T && 0 <= H + m && H + m < j) {
					PixelUtil.canvas.Wu(W + a + .5, H + m + .5, jo, T, j, er, 0, 0);
					iV += h[0] - 128;
					h_ += h[1] - 128;
					i2 += h[2] - 128
				}
				if (0 <= W - a && W - a < T && 0 <= H - m && H - m < j) {
					PixelUtil.canvas.Wu(W - a + .5, H - m + .5, jo, T, j, er, 0, 0);
					iV -= h[0] - 128;
					h_ -= h[1] - 128;
					i2 -= h[2] - 128
				}
				var B = H * T + W << 2;
				c7[B] = Math.max(0, Math.min(255, iV * bj + 128));
				c7[B + 1] = Math.max(0, Math.min(255, h_ * bj + 128));
				c7[B + 2] = Math.max(0, Math.min(255, i2 * bj + 128));
				c7[B + 3] = aD[B + 3]
			}
	}
	if (l == "ShrE") {
		var r = d.rect,
			T = r.m,
			j = r.n;
		PixelUtil.fx.aik(d.buffer, T, j, Q.buffer)
	}
	if (l == "Dspc") {
		var r = d.rect,
			T = r.m,
			j = r.n;
		PixelUtil.fx.a1g(d.buffer, T, j, Q.buffer)
	}
	if (l == "Slrz") {
		var kj = Q.buffer,
			a3 = 128;
		for (var A = 0; A < kj.length; A += 4) {
			if (kj[A] > a3) kj[A] = 255 - kj[A];
			if (kj[A + 1] > a3) kj[A + 1] = 255 - kj[A + 1];
			if (kj[A + 2] > a3) kj[A + 2] = 255 - kj[A + 2]
		}
	}
	if (l == "Wnd ") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			ke = ["Wnd", "Blst", "Stgr"],
			b1 = G.WndM.v.WndM;
		PixelUtil.fx.GU(d.buffer, T, j, Q.buffer, [ke.indexOf(b1), G.Drct.v.Drct != "Left"])
	}
	if (l == "Bokh") {
		var r = d.rect,
			T = r.m,
			j = r.n,
			g = T * j,
			c = g * 4,
			fb = d.buffer.slice(0),
			eg = G.BkDi.v.BtDi,
			gK = G.BkDc,
			cN = G.BkDs.v,
			iO = G.BkDp.v / 255;
		if (eg == "BeIn") iO = 0;
		var b6 = 57 * (.3 + .7 * ((T + j) / 2) / 1750) * (G.BkIb.v / 100) * (1 + .2 * Math.pow(iO, .1)),
			hZ = parseInt(G.BkIs.v.BtIs.slice(3)),
			j7 = -G.BkIr.v * Math.PI / 180,
			iM = [];
		for (var A = 0; A < 8; A++) {
			var jr = j7 + A * (Math.TAU / hZ),
				bH = j7 + (A + 1) * (Math.TAU / hZ),
				gi = Math.cos(jr),
				cj = Math.sin(jr),
				iA = Math.cos(bH),
				g9 = Math.sin(bH),
				h1 = [0, 0, 0];
			PixelUtil.mat3.vS([
				[gi, cj, 1, 0],
				[iA, g9, 1, 0],
				[1, 1, 1, 1]
			], h1);
			if (h1[2] > 0) {
				h1[0] *= -1;
				h1[1] *= -1;
				h1[2] *= -1
			}
			iM.push(h1[0], h1[1], h1[2], 0)
		}
		if (eg == "BeIn") {
			PixelUtil.andMaskUint32(fb, 0, 16777215);
			iO = 1
		} else if (eg == "BeIt" && gK.v.BtDc == "BeCt") {} else {
			var a0;
			if (eg == "BeIt" && gK.v.BtDc == "BeCm") a0 = t[1];
			else if (eg == "BeIa") a0 = t[2][gK.v];
			if (a0 == null) {
				PixelUtil.andMaskUint32(fb, 0, 16777215)
			} else {
				var O;
				if (a0.rect.XB(r)) O = a0.channel;
				else O = a0.Ua(r);
				PixelUtil.writeChannelToRgba(O, fb, 3)
			}
		}
		if (cN)
			for (var A = 0; A < c; A += 4) fb[A + 3] = 255 - fb[A + 3];
		if (WebGLContext.webglAvailable) {
			var g5 = fb,
				dj = T,
				ef = j,
				jA = 1,
				jb = (G.BkSb.v == 0 || G.BkSt.v == 255) && eg == "BeIn";
			if (!jb) {
				var jv = 0;
				for (var A = 0; A < c; A += 4) jv += Math.abs(iO - fb[A + 3] * (1 / 255));
				jv = jv / g * b6;
				var cz = 3.14 * jv * jv * T * j / 3e6;
				if (cz > 2e3) {
					alert("too large radius");
					return
				}
			}
			while (jb && 3 * (b6 / jA) * (b6 / jA) * T * j > 500 * 2e3 * 2e3) {
				var fB = PixelUtil.downsampleRgbaMean(fb, new Rect(0, 0, dj, ef));
				fb = fB.QI;
				dj = fB.rect.m;
				ef = fB.rect.n;
				jA *= 2
			}
			var jj = Date.now(),
				Y = WebGLContext.getOrCreateTexture(0, dj, ef);
			Y.set(fb);
			var eC = WebGLContext.getOrCreateTexture(1, T, j);
			WebGLContext.setFramebufferViewport(eC);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.apv,
				wl: new Float32Array([1 / dj, 1 / ef]),
				a3T: iO,
				vf: b6 / jA,
				al4: new Float32Array([G.BkSb.v / 100, G.BkSt.v / 255]),
				a9p: new Float32Array([G.BkNa.v / 100, G.BkNt.v.BtNt == "BeNu" ? 0 : 1, G.BkNm.v ? 1 : 0]),
				ant: new Float32Array(iM.slice(0, 16)),
				a38: new Float32Array(iM.slice(16))
			}, Y.glTexture);
			eC.get(Q.buffer);
			var iW = Q.buffer;
			for (var A = 0; A < c; A += 4) iW[A + 3] = d.buffer[A + 3]
		}
	}
	if (l == "rigidTransform") {
		var jj = Date.now(),
			jf = FilterHelper.agY,
			Y = d.buffer.slice(0),
			ac = 0,
			j$ = 0;
		PixelUtil.premultiplyAlphaRgb(Y);
		PixelUtil.andMaskUint32(Q.buffer, 0);
		var T = d.rect.m,
			j = d.rect.n,
			f9 = G.puppetShapeList.v,
			iC = [],
			fP = [],
			at = [],
			cg = [];
		for (var jI = 0; jI < f9.length; jI++) {
			var bw = f9[jI].v,
				Z = ac * 2,
				P = j$ * 3,
				ca = bw.originalVertexArray.v.length >>> 2,
				fX = bw.indexArray.v.length >>> 2,
				bb = new Float32Array(jf(bw.originalVertexArray.v));
			for (var A = 0; A < ca; A++) iC[Z + A] = bb[A];
			var eh = new Float32Array(jf(bw.deformedVertexArray.v));
			for (var A = 0; A < ca; A++) fP[Z + A] = eh[A];
			var fI = new Uint32Array(jf(bw.indexArray.v));
			for (var A = 0; A < fX; A++) at[P + A] = ac + fI[A];
			var fd = [],
				dS = [],
				eX = bw.PnDp.v;
			for (var A = 0; A < eX.length; A++) {
				fd.push(bw.pinVertexIndices.v[A].v);
				dS.push(eX[A].v)
			}
			var hp = PixelUtil.WB.aaS(bb, fI, fd, dS);
			for (var A = 0; A < hp.length; A++) cg[ac + A] = hp[A];
			ac += ca >>> 1;
			j$ += ~~(fX / 3)
		}
		var _ = d.rect,
			T = _.m,
			j = _.n;
		PixelUtil.WB.wK(Y, T, j, Q.buffer, T, j, iC, fP, cg, at);
		PixelUtil.unpremultiplyAlphaRgb(Q.buffer)
	}
	if (l == "lightFilterGradient") {
		function ks(bo) {
			var b8 = 1 / Math.sqrt(bo[0] * bo[0] + bo[1] * bo[1] + bo[2] * bo[2]);
			bo[0] *= b8;
			bo[1] *= b8;
			bo[2] *= b8
		}
		var T = d.rect.m,
			j = d.rect.n,
			g = T * j,
			jj = Date.now(),
			dU = PixelUtil.allocBytes(g),
			ae = .3,
			em = .7;
		PixelUtil.rgbaToGrayPlane(Q.buffer, dU);
		var eK = PixelUtil.allocBytes(g);
		PixelUtil.sX.Dj(dU, eK, Q.rect, 16);
		var hr = PixelUtil.allocBytes(g);
		PixelUtil.sX.Dj(dU, hr, Q.rect, 8);
		var aK = dU,
			h9 = new Float32Array(g),
			g1 = G.Dtl.v,
			f4 = g1[2].v,
			cs = g1[1].v,
			iT = g1[0].v,
			dL = G.Scl.v * 40 * G.textureScale.v / (f4 + cs + iT);
		f4 *= dL;
		cs *= dL;
		iT *= dL;
		for (var A = 0; A < g; A++) {
			var hD = eK[A] * (1 / 255),
				hP = hr[A] * (1 / 255),
				fD = aK[A] * (1 / 255);
			fD = fD * fD;
			h9[A] = f4 * hD + cs * hP + iT * fD
		}
		var c3 = G.blur.v;
		if (c3 != 0) {
			var cX = h9.slice(0);
			PixelUtil.sX.sU(cX, h9, Q.rect, c3)
		}
		var as = T - 1,
			gO = j - 1;
		for (var H = 0; H < j; H++)
			for (var W = 0; W < T; W++) {
				var A = H * T + W,
					B = A * 4,
					dn = h9[A],
					a = ae * (h9[A + (W == as ? 0 : 1)] - dn) + em * (dn - h9[A - (W == 0 ? 0 : 1)]),
					m = ae * (h9[A + (H == gO ? 0 : T)] - dn) + em * (dn - h9[A - (H == 0 ? 0 : T)]),
					bo = [1, 0, a],
					d0 = [0, 1, m];
				ks(bo);
				ks(d0);
				var bH = bo[0],
					c6 = bo[2],
					fY = d0[1],
					e0 = d0[2],
					e4 = -c6 * fY,
					aV = -bH * e0,
					ey = bH * fY;
				Q.buffer[B] = ~~(127.5 + e4 * 127.5);
				Q.buffer[B + 1] = ~~(127.5 + aV * 127.5);
				Q.buffer[B + 2] = ~~(127.5 + ey * 127.5)
			}
	}
	if (l == "defr") {
		var T = d.rect.m,
			j = d.rect.n;
		fc(d.buffer, T, j, Q.buffer)
	}
	if (l == "dDFT" || l == "iDFT") {
		function cE(hZ) {
			if (hZ == 0) return 1;
			hZ--;
			hZ |= hZ >> 1;
			hZ |= hZ >> 2;
			hZ |= hZ >> 4;
			hZ |= hZ >> 8;
			hZ |= hZ >> 16;
			return hZ + 1
		}
		var T = d.rect.m,
			j = d.rect.n,
			kd = cE(Math.max(T, j)),
			dN = kd >>> 1,
			fA = new Rect(0, 0, kd, kd),
			fC = new Rect(0, 0, T, j);
		fC.y = kd - j >>> 1;
		var f3 = T >>> 1,
			iI = new Rect(0, fC.y, f3, j),
			ch = new WebGLContext.RgbaFloatPlanes(T * j);
		PixelUtil.rgbaToChannelPlanes(d.buffer, ch);
		var jH = new Float64Array(kd * kd),
			e3 = new Float64Array(kd * kd),
			O = PixelUtil.allocBytes(kd * kd);
		FFT.init(kd);
		var bT = [ch.o, ch.J, ch.k];
		for (var A = 0; A < 3; A++) {
			var cU = bT[A];
			O.fill(0);
			if (l == "dDFT") {
				PixelUtil.copyBufferRect(cU, fC, O, fA);
				FilterHelper.am8(O, kd, jH, e3);
				PixelUtil.copyBufferRect(O, fA, cU, fC, iI);
				iI.x += f3;
				fA.x -= dN - f3;
				PixelUtil.copyBufferRect(O, fA, cU, fC, iI);
				iI.x -= f3;
				fA.x += dN - f3
			} else {
				PixelUtil.copyBufferRect(cU, fC, O, fA, iI);
				iI.x += dN;
				fC.x += dN - f3;
				PixelUtil.copyBufferRect(cU, fC, O, fA, iI);
				iI.x -= dN;
				fC.x -= dN - f3;
				FilterHelper.a55(O, kd, jH, e3);
				PixelUtil.copyBufferRect(O, fA, cU, fC)
			}
		}
		PixelUtil.channelPlanesToRgba(ch, Q.buffer)
	}
	if (l == "Avrg") {
		var ho = 0,
			gR = 0,
			fq = 0,
			gx = 0,
			bn = 1;
		for (var A = 0; A < d.buffer.length; A += 4) {
			var k = d.buffer[A + 3];
			fq += d.buffer[A] * k;
			gR += d.buffer[A + 1] * k;
			ho += d.buffer[A + 2] * k;
			gx += k
		}
		var hq = 1 / gx;
		ho = Math.round(bn * (ho * hq) + (1 - bn) * 255);
		gR = Math.round(bn * (gR * hq) + (1 - bn) * 255);
		fq = Math.round(bn * (fq * hq) + (1 - bn) * 255);
		PixelUtil.andMaskUint32(Q.buffer, ho << 16 | gR << 8 | fq, 4278190080)
	}
	if (["GsnB", "boxblur", "smartSharpen", "UnsM", "HghP"].indexOf(l) != -1) {
		var ah = G.Rds ? G.Rds.v.val : 1,
			fV = l == "boxblur" ? PixelUtil.sX.Eh : PixelUtil.sX.Ej;
		FilterHelper.OR(ah, fV, Q.buffer, Q.rect);
		if (l == "UnsM" || l == "smartSharpen") {
			var bj = (G.Amnt ? G.Amnt.v.val : 200) / 100,
				fZ = 0;
			if (l == "UnsM") fZ = G.Thsh.v;
			else bj *= .75;
			for (var A = 0; A < d.buffer.length; A++) {
				if ((A & 3) == 3) {
					Q.buffer[A] = d.buffer[A];
					continue
				}
				var iw = d.buffer[A],
					hn = Q.buffer[A],
					gm = bj * (iw - hn);
				if (gm > 0) gm = Math.max(0, gm - fZ);
				else gm = Math.min(0, gm + fZ);
				Q.buffer[A] = Math.max(0, Math.min(255, iw + gm))
			}
		}
		if (l == "HghP")
			for (var A = 0; A < d.buffer.length; A++) {
				if ((A & 3) == 3) {
					Q.buffer[A] = d.buffer[A];
					continue
				}
				var iw = d.buffer[A],
					hn = Q.buffer[A];
				Q.buffer[A] = Math.max(0, Math.min(255, 128 + iw - hn))
			}
	}
	if (l == "AdNs") {
		var h8 = new Uint8ClampedArray(Q.buffer.buffer),
			fp = 255 * G.Nose.v.val / 100,
			iY;
		if (G.Dstr.v.Dstr == "Gsn") iY = function() {
			return (Math.random() + Math.random() + Math.random() + Math.random() - 2) * 2
		};
		else iY = function() {
			return Math.random() * 2 - 1
		};
		for (var A = 0; A < h8.length; A += 4) {
			var _ = h8[A],
				fs = h8[A + 1],
				f_ = h8[A + 2],
				eP, f1, it;
			if (G.Mnch.v) {
				eP = f1 = it = iY()
			} else {
				eP = iY();
				f1 = iY();
				it = iY()
			}
			_ += fp * eP;
			fs += fp * f1;
			f_ += fp * it;
			h8[A] = _;
			h8[A + 1] = fs;
			h8[A + 2] = f_
		}
	}
	var jj = Date.now();
	if (l == "Mdn " || l == "DstS" || l == "Mxm " || l == "Mnm " || l == "surfaceBlur") {
		var _ = 0,
			dT = G.Thsh,
			bw = 0;
		if (dT) dT = dT.v;
		else dT = 0;
		if (l == "Mdn " || l == "Mxm " || l == "Mnm " || l == "surfaceBlur") _ = G.Rds.v.val;
		else _ = G.Rds.v;
		var fE = 10 * Math.ceil(_ / 10),
			T = d.rect.m,
			j = d.rect.n,
			fa = ["Mnm ", "Mxm ", "surfaceBlur"].indexOf(l),
			dV = (bw == 0 ? 1 : .75) * [.73, .73, 1.2][fa] * (T * j * Math.pow(fE * fE, 1.05)) / 6022387,
			al = .6 * (T * j * Math.pow(_, 1 / 2.6)) / 6500;
		if (l == "Mxm " || l == "Mnm ") al = T * j / 13e3;
		var kp = G.preserveShape;
		if (kp && kp.v.preserveShape == "Rndn") bw = 1;
		if (WebGLContext.webglAvailable && fa != -1 && (dV < al || bw == 1) && dV < 500) {
			var Y = WebGLContext.getOrCreateTexture(0, T, j);
			Y.set(d.buffer);
			var R = WebGLContext.getOrCreateTexture(1, T, j);
			WebGLContext.setFramebufferViewport(R);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.a2n,
				wl: new Float32Array([1 / T, 1 / j]),
				vf: _,
				aeY: dT / 255,
				Ye: [bw, fa, fE]
			}, Y.glTexture);
			R.get(Q.buffer)
		} else if (l == "Mxm " || l == "Mnm ") {
			var T = d.rect.m,
				j = d.rect.n;
			PixelUtil.u5.a7l(d.buffer, Q.buffer, T, j, 1 + Math.floor(G.Rds.v.val) * 2, l == "Mxm ")
		} else {
			_ = Math.round(_);
			PixelUtil.g6.bJ = .5;
			PixelUtil.g6.ic = dT;
			var fV = l == "surfaceBlur" ? 1 : 0;
			PixelUtil.g6.nl(d.buffer, Q.buffer, T, j, _, fV);
			if (l == "DstS")
				for (var A = 0; A < T * j * 4; A++) {
					var hV = Math.abs(d.buffer[A] - Q.buffer[A]);
					if (hV <= dT) Q.buffer[A] = d.buffer[A]
				}
		}
	}
	if (l == "ClrH") {
		var iI = d.rect.clone();
		iI.x = iI.y = 0;
		var _ = G.Rds.v;
		_ = Math.round(_ * Math.sqrt(2));
		var T = iI.m,
			j = iI.n,
			ch = new WebGLContext.RgbaFloatPlanes(T * j);
		PixelUtil.rgbaToChannelPlanes(d.buffer, ch);
		PixelUtil.invertUint32Buffer(ch.o);
		PixelUtil.invertUint32Buffer(ch.J);
		PixelUtil.invertUint32Buffer(ch.k);
		var gH = PixelUtil.getScratch2dContext(T, j),
			iW = PixelUtil.allocBytes(T * j * 4);
		for (var i_ = 0; i_ < 3; i_++) {
			var O = i_ == 0 ? ch.o : i_ == 1 ? ch.J : ch.k,
				e7 = Math.PI * G["Ang" + (i_ + 1)].v / 180,
				by = new Matrix2D(1 / _, 0, 0, 1 / _, 0, 0);
			by.rotate(e7);
			PixelUtil.writeChannelToRgba(O, iW, 3);
			var h = f.NH.eJ([iW, iI], by, !0),
				fC = h.rect;
			gH.clearRect(0, 0, T, j);
			var bd = Math.sin(e7),
				kc = Math.cos(e7);
			for (var A = 0; A < fC.n; A++)
				for (var iH = 0; iH < fC.m; iH++) {
					var W = (iH + fC.x + .5) * _,
						H = (A + fC.y + .5) * _,
						aH = W,
						eZ = H;
					W = kc * aH - bd * eZ;
					H = bd * aH + kc * eZ;
					var g = h.buffer[(A * fC.m + iH << 2) + 3] * (1 / 255),
						ah = _ * Math.sqrt(g * (1 / Math.PI));
					gH.beginPath();
					gH.arc(W, H, ah, 0, 2 * Math.PI);
					gH.fill()
				}
			var gs = gH.getImageData(0, 0, T, j);
			PixelUtil.extractChannelFromRgba(gs.data, O, 3)
		}
		PixelUtil.invertUint32Buffer(ch.o);
		PixelUtil.invertUint32Buffer(ch.J);
		PixelUtil.invertUint32Buffer(ch.k);
		PixelUtil.channelPlanesToRgba(ch, Q.buffer)
	}
	if (l == "Crst") {
		var T = d.rect.m,
			j = d.rect.n;
		PixelUtil.e0.anJ(d.buffer, T, j, Q.buffer, G.ClSz.v, null, null, 0);
	}
	if (l == "Pntl") {
		var T = d.rect.m,
			j = d.rect.n;
		PixelUtil.e0.amz(d.buffer, T, j, Q.buffer, G.ClSz.v, [Math.round(V.o), Math.round(V.J), Math.round(V.k)])
	}
	if (l == "Mztn") {
		var T = d.rect.m,
			j = d.rect.n,
			g = T * j,
			ch = new WebGLContext.RgbaFloatPlanes(g),
			fk = [ch.o, ch.J, ch.k];
		PixelUtil.rgbaToChannelPlanes(d.buffer, ch);
		var b1 = G.MztT.v.MztT,
			i6 = {
				FnDt: [.1, 0, .3, 1.4],
				MdmD: [.9, 0, .1, 1.4],
				GrnD: [3, 0, .2, 1.4],
				CrsD: [7, 0, .1, 1.4],
				ShrL: [0, 10, .16, 3],
				MdmL: [0, 22, .06, 3],
				LngL: [0, 25, .01, 4.5],
				ShSt: [3, 10, .05, 4.4],
				MdmS: [4, 25, .15, 4],
				LngS: [4, 30, .05, 4]
			}[b1],
			jj = Date.now(),
			eM = [];
		for (var A = 0; A < g; A++) {
			eM[A] = Math.random()
		}
		var g = T * j,
			jE = Math.round(g * i6[0]),
			hQ = g - T - 1;
		for (var A = 0; A < jE; A++) {
			var bQ = Math.random(),
				dP = 1;
			if (bQ < .5) {
				dP = T;
				bQ *= 2
			} else bQ = 2 * (bQ - .5);
			var gP = Math.floor(bQ * hQ),
				gB = gP + dP;
			eM[gP] = eM[gB]
		}
		var bE = Math.round(T * i6[1]);
		for (var H = 0; H < j; H++)
			for (var A = 0; A < bE; A++) {
				var bQ = PixelUtil.blend.b_(H * g + A),
					gP = H * T + Math.floor(bQ * (T - 1));
				eM[gP] = eM[gP + 1]
			}
		var bL = new Float64Array(256);
		for (var A = 0; A < 256; A++) {
			var kz = A / 255,
				ge = 2 * (kz < .5 ? kz : 1 - kz);
			ge = i6[2] + Math.pow(ge, i6[3]) * (1 - i6[2]);
			kz = kz < .5 ? ge * .5 : 1 - ge * .5;
			bL[A] = kz
		}
		for (var gX = 0; gX < 3; gX++) {
			var O = fk[gX];
			for (var H = 0; H < j; H++) {
				for (var W = 0; W < T; W++) {
					var A = H * T + W,
						jD = O[A],
						kz = bL[jD],
						bQ = eM[A];
					O[A] = bQ > kz ? 0 : 255
				}
			}
		}
		PixelUtil.channelPlanesToRgba(ch, Q.buffer)
	}
	if (l == "Msc ") {
		var jt = G.ClSz.v.val,
			T = d.rect.m,
			j = d.rect.n,
			fU = Math.ceil(T / jt),
			c8 = Math.ceil(j / jt),
			gZ = PixelUtil.allocBytes(fU * c8 * 4);
		PixelUtil.scale.Pf(d.buffer, T, j, gZ, fU, c8, 1 / jt);
		PixelUtil.scale.Pf(gZ, fU, c8, Q.buffer, T, j, jt)
	}
	if (l == "Clds" || l == "DfrC") {
		var T = Q.rect.m,
			j = Q.rect.n,
			g = T * j,
			bF = PixelUtil.allocBytes(g);
		if (l == "Clds") PixelUtil.andMaskUint32(Q.buffer, 4278190080);
		var iE = PixelUtil.allocBytes(256 * 4);
		for (var A = 0; A < 256; A++) {
			var B = A << 2,
				b5 = A / 255,
				fI = 1 - b5;
			iE[B] = Math.round(b5 * b.o + fI * V.o);
			iE[B + 1] = Math.round(b5 * b.J + fI * V.J);
			iE[B + 2] = Math.round(b5 * b.k + fI * V.k)
		}
		PixelUtil.fx.ap$(d.buffer, T, j, bF);
		var am = Q.buffer;
		for (var A = 0; A < g; A++) {
			var B = A << 2,
				gX = bF[A] << 2,
				_ = iE[gX],
				fs = iE[gX + 1],
				f_ = iE[gX + 2];
			if (l == "Clds") {
				am[B] = _;
				am[B + 1] = fs;
				am[B + 2] = f_
			} else {
				am[B] = Math.abs(am[4 * A] - _);
				am[B + 1] = Math.abs(am[4 * A + 1] - fs);
				am[B + 2] = Math.abs(am[4 * A + 2] - f_)
			}
		}
	}
	if (l == "LnsF") {
		var T = d.rect.m,
			j = d.rect.n,
			b1 = ["Zm", "Nkn", "Nkn1", "PnVs"].indexOf(G.Lns.v.Lns),
			eY = G.FlrC.v,
			gC = [Math.min(b1, 2), G.Brgh.v / 100, eY.Hrzn.v, eY.Vrtc.v],
			jj = Date.now();
		PixelUtil.ax$(d.buffer, T, j, Q.buffer, gC)
	}
	var bV = ["Blr ", "BlrM", "Shrp", "ShrM"].indexOf(l);
	if (bV != -1) {
		var il = bV > 1,
			T = d.rect.m,
			j = d.rect.n,
			hv = PixelUtil.s9.f7[bV],
			ir = d.buffer.slice(0);
		if (!il) PixelUtil.premultiplyAlphaRgb(ir);
		PixelUtil.s9.iZ(ir, Q.buffer, T, j, hv, 255, !1, il);
		if (!il) PixelUtil.unpremultiplyAlphaRgb(Q.buffer)
	}
	if (l == "MtnB") {
		var hK = -G.Angl.v * Math.PI / 180,
			ik = G.Dstn.v.val / 2,
			jj = Date.now(),
			T = d.rect.m,
			j = d.rect.n,
			r = d.rect.clone();
		r.x = r.y = 0;
		if (WebGLContext.webglAvailable) {
			var jj = Date.now(),
				en = Q.buffer;
			en.set(d.buffer);
			PixelUtil.premultiplyAlphaRgb(en);
			var kt = WebGLContext.getOrCreateTexture(0, T, j);
			kt.set(en);
			var aD = PixelUtil.allocBytes(4);
			aD[0] = Math.round(128 + 127 * Math.cos(hK));
			aD[1] = Math.round(128 + 127 * Math.sin(hK));
			new Uint32Array(en.buffer).fill(new Uint32Array(aD.buffer)[0]);
			var jZ = WebGLContext.getOrCreateTexture(1, T, j);
			jZ.set(en);
			WebGLContext.setFramebufferViewport(kt, r);
			kt.copyToAuxTexture(r);
			WebGLContext.filter.wF({
				type: WebGLContext.filter.ET,
				qY: jZ.glTexture,
				wl: new Float32Array([1 / T, 1 / j]),
				acr: ik / 2,
				a0W: 1
			}, kt.auxTexture);
			kt.get(en);
			PixelUtil.unpremultiplyAlphaRgb(en)
		} else {
			var by = new Matrix2D;
			by.rotate(hK);
			var h = f.NH.eJ([d.buffer, d.rect], by, !1, null, !0);
			FilterHelper.OR(ik, PixelUtil.sX.a2, h.buffer, h.rect);
			by.hI();
			h = f.NH.eJ([h.buffer, h.rect], by, !1, Q.buffer.buffer, !0, Q.rect)
		}
	}
	if (l == "RdlB") {
		var T = d.rect.m,
			j = d.rect.n,
			bj = G.Amnt.v,
			hA = G.BlrM.v.BlrM == "Zm",
			i_ = G.Cntr.v,
			gY = i_.Hrzn.v,
			jh = i_.Vrtc.v,
			a = Math.max(gY, 1 - gY) * T,
			m = Math.max(jh, 1 - jh) * j,
			ah = Math.sqrt(a * a + m * m),
			eJ = 2 * Math.PI * ah * 1.5,
			gt = Math.round(eJ),
			eR = Math.round(ah),
			iI = new Rect(0, 0, gt, eR),
			gF = PixelUtil.allocBytes(gt * eR * 4),
			hu = hA ? 4 : 1,
			bt = hA ? .6 : 8 * ((T + j) / 2) / 1400,
			jW = .1,
			jA = 1,
			dM = 1;
		PixelUtil.canvas.Rb(d.buffer, T, j, gF, gt, eR, gY, jh, hu, jW, jA, dM);
		var ce = hA ? PixelUtil.allocBytes(gt * eR * 4) : null;
		if (hA) {
			PixelUtil.canvas.Bo(gF, ce, gt, eR);
			var bS = ce;
			ce = gF;
			gF = bS;
			iI.m = eR;
			iI.n = gt
		}
		FilterHelper.OR(bt * bj, PixelUtil.sX.a2, gF, iI);
		if (hA) {
			PixelUtil.canvas.Bo(gF, ce, eR, gt);
			var bS = ce;
			ce = gF;
			gF = bS;
			iI.m = gt;
			iI.n = eR
		}
		PixelUtil.canvas.VE(gF, gt, eR, Q.buffer, T, j, gY, jh, hu, jW, jA, dM)
	}
	if (l == "Plr ") {
		var T = d.rect.m,
			j = d.rect.n;
		if (G.Cnvr.v.Cnvr == "RctP") PixelUtil.canvas.VE(d.buffer, T, j, Q.buffer, T, j, .5, .5, 1, 0, 2, T / j);
		else PixelUtil.canvas.Rb(d.buffer, T, j, Q.buffer, T, j, .5, .5, 1, 0, 2, T / j)
	}
	if (l == "FndE") {
		var T = d.rect.m,
			j = d.rect.n;
		PixelUtil.s9.n3(d.buffer, Q.buffer, T, j)
	}
	if (l == "oilPaint") {
		var e7 = G.LghD.v * Math.PI / 180,
			kk = [Math.cos(e7), Math.sin(e7), .001],
			bG = [G.stylization.v, G.cleanliness.v, G.brushScale.v, G.microBrush.v, G.lightingOn.v, G.specularity.v, kk],
			r = d.rect.clone();
		r.x = r.y = 0;
		PixelUtil.GJ.filter(d.buffer, r, Q.buffer, bG)
	}
	if (l == "Ofst") {
		var T = d.rect.m,
			j = d.rect.n,
			d4 = new Uint32Array(d.buffer.buffer),
			fH = new Uint32Array(Q.buffer.buffer),
			aH = G.Hrzn.v,
			eZ = G.Vrtc.v,
			iG = G.Fl.v.FlMd;
		PixelUtil.andMaskUint32(fH, 0);
		if (iG == "Bckg" || iG == "Rpt") {
			var iI = d.rect.clone();
			iI.offset(aH, eZ);
			PixelUtil.blitRgbaRect(d4, iI, fH, Q.rect)
		}
		if (iG == "Rpt") {
			var gi, cj, iA, g9, a$;
			aH = Math.max(-T, Math.min(T, aH));
			eZ = Math.max(-j, Math.min(j, eZ));
			gi = aH > 0 ? aH : 0;
			iA = aH > 0 ? T : T + aH;
			cj = eZ > 0 ? 0 : eZ + j;
			g9 = eZ > 0 ? eZ : j;
			a$ = eZ > 0 ? 0 : T * (j - 1);
			for (var H = cj; H < g9; H++)
				for (var W = gi; W < iA; W++) fH[H * T + W] = d4[a$ + W - aH];
			gi = aH > 0 ? 0 : T + aH;
			iA = aH > 0 ? aH : T;
			cj = eZ > 0 ? eZ : 0;
			g9 = eZ > 0 ? j : j + eZ;
			a$ = aH > 0 ? 0 : T - 1;
			for (var H = cj; H < g9; H++)
				for (var W = gi; W < iA; W++) fH[H * T + W] = d4[a$ + T * (H - eZ)];
			if (aH >= 0 && eZ >= 0) {
				gi = 0;
				iA = aH;
				cj = 0;
				g9 = eZ;
				a$ = 0
			}
			if (aH >= 0 && eZ < 0) {
				gi = 0;
				iA = aH;
				cj = j + eZ;
				g9 = j;
				a$ = T * (j - 1)
			}
			if (aH < 0 && eZ >= 0) {
				gi = T + aH;
				iA = T;
				cj = 0;
				g9 = eZ;
				a$ = T - 1
			}
			if (aH < 0 && eZ < 0) {
				gi = T + aH;
				iA = T;
				cj = j + eZ;
				g9 = j;
				a$ = T * j - 1
			}
			for (var H = cj; H < g9; H++)
				for (var W = gi; W < iA; W++) fH[H * T + W] = d4[a$]
		}
		if (iG == "Wrp") {
			aH = (aH + 100 * T) % T;
			eZ = (eZ + 100 * j) % j;
			var iI = new Rect(aH - T, eZ - j, T, j);
			PixelUtil.blitRgbaRect(d4, iI, fH, Q.rect);
			iI.offset(T, 0);
			PixelUtil.blitRgbaRect(d4, iI, fH, Q.rect);
			iI.offset(0, j);
			PixelUtil.blitRgbaRect(d4, iI, fH, Q.rect);
			iI.offset(-T, 0);
			PixelUtil.blitRgbaRect(d4, iI, fH, Q.rect)
		}
	}
	if (l == "Rept") {
		var g6 = G.Rsft.v.val / 100,
			fR = G.SpcX.v.val / 100;
		fR = Math.max(fR, -.99);
		var ao = G.SpcY.v.val / 100;
		ao = Math.max(ao, -.99);
		var jA = G.Scl.v.val / 100,
			by = new Matrix2D;
		by.rotate(G.Angl.v * Math.PI / 180);
		by.scale(jA, jA);
		var hh = {
			buffer: d.buffer,
			rect: d.rect
		};
		PixelUtil.cropRgbaAlphaOpaque(hh);
		if (hh.rect.W6()) {
			hh.buffer = d.buffer;
			hh.rect = d.rect
		}
		var am = hh.buffer,
			iI = hh.rect,
			cB = PixelUtil.tightBoundsFromRgba(am, iI, 0),
			hx = new Uint32Array(am.buffer)[0];
		if (!cB.W6() && !cB.XB(iI)) {
			var cJ = PixelUtil.allocBytes(cB.O() * 4);
			PixelUtil.blitRgbaRect(am, iI, cJ, cB);
			am = cJ;
			iI = cB
		}
		iI.x = iI.y = 0;
		hx = fR == 0 && ao == 0 || G.SpcC.v ? hx : 0;

		function av(W) {
			return W < 0 ? Math.ceil(W) : Math.floor(W)
		}
		var ec = by.kD(new Point2D(iI.m, 0));
		ec.x = av(ec.x);
		ec.y = av(ec.y);
		var aU = by.kD(new Point2D(0, iI.n));
		aU.x = av(aU.x);
		aU.y = av(aU.y);
		var h = f.NH.eJ([am, iI], by, !1),
			fC = h.rect,
			c7 = h.buffer,
			aS = Math.round(fC.x),
			cw = Math.round(fC.y),
			bx = Math.max(Q.rect.m, Q.rect.n) / Math.min(iI.m * jA * (1 + fR), iI.n * jA * (1 + ao));
		bx = Math.ceil(bx * 1.7);
		PixelUtil.andMaskUint32(Q.buffer, hx);
		for (var H = -bx; H < bx; H++) {
			for (var W = -bx; W < bx; W++) {
				var ic = (W + H * g6) * (1 + fR),
					aX = H * (1 + ao);
				fC.x = aS + Math.round(ic * ec.x + aX * aU.x);
				fC.y = cw + Math.round(ic * ec.y + aX * aU.y);
				if (fC.N1(Q.rect)) PixelUtil.blend.compositeBlend("norm", c7, fC, Q.buffer, Q.rect, fC, 1)
			}
		}
	}
	if (l == "Ctoa") {
		var V = PixelUtil.color.sampleGradientColor(G.Clr.v),
			dT = G.Trsp.v.val / 100,
			gT = G.Opct.v.val / 100;
		dT = gT == 0 ? 0 : dT / gT;
		var T = d.rect.m,
			j = d.rect.n,
			hI = ~~V.o,
			g7 = ~~V.J,
			bK = ~~V.k,
			a$ = d.buffer,
			eE = Q.buffer;
		for (var H = 0; H < j; H++)
			for (var W = 0; W < T; W++) {
				var A = H * T + W,
					B = A << 2,
					iI = a$[B],
					eq = a$[B + 1],
					am = a$[B + 2],
					jw = Math.abs(hI - iI),
					dJ = Math.abs(g7 - eq),
					jy = Math.abs(bK - am),
					h0 = Math.max(jw, dJ, jy) * (1 / 255);
				h0 = Math.max(0, Math.min(1, h0 / gT));
				var fg = h0 == 0 ? 0 : 1 / h0,
					e_ = dT == 1 ? 1 : Math.max(0, Math.min(1, (h0 - dT) / (1 - dT)));
				eE[B] = Math.max(0, Math.min(255, (iI - hI * (1 - h0)) * fg));
				eE[B + 1] = Math.max(0, Math.min(255, (eq - g7 * (1 - h0)) * fg));
				eE[B + 2] = Math.max(0, Math.min(255, (am - bK * (1 - h0)) * fg));
				eE[B + 3] = ~~(.5 + e_ * 255)
			}
	}
	if (l == "Dthr") {
		function jK(W) {
			return ~~(.5 + 255 * PixelUtil.srgbToLinear(W / 255))
		}
		var jI = G.Plte.v,
			dw;
		if (jI == 0) dw = [4278190080, 4294967295];
		else {
			var bv = [
					[1, 1, 1],
					[2, 2, 2],
					[3, 3, 2]
				][jI - 1],
				b7 = [1 << bv[0], 1 << bv[1], 1 << bv[2]],
				b2 = [~~(255 / (b7[0] - 1)), ~~(255 / (b7[1] - 1)), ~~(255 / (b7[2] - 1))];
			dw = [];
			for (var _ = 0; _ < b7[0]; _++)
				for (var fs = 0; fs < b7[1]; fs++)
					for (var f_ = 0; f_ < b7[2]; f_++) dw.push(255 << 24 | jK(f_ * b2[2]) << 16 | jK(fs * b2[1]) << 8 | jK(_ * b2[0]))
		}
		var T = d.rect.m,
			j = d.rect.n,
			g = T * j,
			j_ = g * 4,
			i2 = d.buffer.slice(0),
			gD = Q.buffer;
		for (var A = 0; A < j_; A++) i2[A] = ~~(.5 + 255 * PixelUtil.srgbToLinear(i2[A] / 255));
		var co = PixelUtil.allocBytes(T * j);
		UPNG.encode.dither(i2, T, j, dw, gD, co, G.Mthd ? G.Mthd.v : 1);
		for (var A = 0; A < j_; A++) gD[A] = ~~(.5 + 255 * PixelUtil.linearToSrgb(gD[A] / 255))
	}
	if (l == "Part") {
		var gU = [G.RndS.v, G.Cont.v / 100, G.Size.v, G.Dpth.v / 100, G.Brgh.v / 100, PixelUtil.color.sampleGradientColor(G.Clr.v), G.Time.v, G.Blnk.v, G.Fall.v, G.Turb.v / 100];
		PixelUtil.fd.Q6(Q.buffer, d.rect.m, d.rect.n, gU)
	}
	if ("LqFy,Dspl,Pnch,Sphr,Twrl,Rple,Shr ,Wave,LnCr,ZgZg,Kale".split(",").indexOf(l) != -1) {
		var jP = t[0],
			T = d.rect.m,
			j = d.rect.n,
			bL, bl = 0;
		if (l == "LqFy") bL = ei.Cd(new Uint8Array(G.LqMe.v).buffer);
		else {
			var cC = 3;
			bL = {
				iJ: Math.floor(T / cC),
				Tq: Math.floor(j / cC)
			};
			bL.map = new Float32Array(bL.iJ * bL.Tq * 2);
			if (l == "LnCr") {
				var gY = .5 * (bL.iJ - 1),
					jh = .5 * (bL.Tq - 1),
					kw = Math.max(Math.abs(0 - gY), Math.abs(1 - gY)),
					dX = Math.max(Math.abs(0 - jh), Math.abs(1 - jh)),
					c9 = Math.sqrt(kw * kw + dX * dX),
					jR = 0,
					gv = 0,
					aE = -1,
					iS = 2,
					jA = G.LnSi.v / 100,
					hA = 1 / jA,
					dW = G.LnIa.v / 100,
					f8 = dW == 0 ? 1e-6 : dW * 4.6,
					iu = hA / c9;
				for (var H = 0; H < bL.Tq; H++) {
					for (var W = 0; W < bL.iJ; W++) {
						var a = (W - gY) * iu,
							m = (H - jh) * iu,
							_ = Math.sqrt(a * a + m * m) * f8,
							he = Math.atan(_),
							ku = dW > 0 ? he / _ : _ / he,
							dM = gY + c9 * ku * a,
							iR = jh + c9 * ku * m,
							A = H * bL.iJ + W << 1;
						bL.map[A] = dM - W;
						bL.map[A + 1] = iR - H
					}
				}
			} else if (l == "Kale") {
				var fU = bL.iJ,
					c8 = bL.Tq,
					gh = (fU - 1) * .5,
					gO = (c8 - 1) * .5,
					bW = G.MRot.v * Math.PI / 180 + Math.PI / 2 + 4 * Math.PI,
					kl = G.Mirr.v,
					gM = Math.TAU / kl,
					iz = .5 * gM;
				for (var H = 0; H < c8; H++)
					for (var W = 0; W < fU; W++) {
						var a = W - gh,
							m = H - gO,
							cF = Math.sqrt(a * a + m * m),
							e7 = Math.atan2(m, a) + bW;
						e7 = e7 % gM;
						if (e7 > iz) e7 = gM - e7;
						var dM = gh + Math.cos(e7 - bW) * cF,
							iR = gO + Math.sin(e7 - bW) * cF,
							A = (H * fU + W) * 2;
						bL.map[A] = dM - W;
						bL.map[A + 1] = iR - H
					}
			} else if (l == "Dspl" && jP.length != 0) {
				bl = G.UndA.v.UndA == "WrpA" ? 2 : 1;
				var ap = G.DspF.v.pth,
					bm;
				for (var A = 0; A < jP.length; A++)
					if (jP[A].AN == ap) bm = jP[A];
				if (bm == null) bm = jP[0];
				bm.LT();
				var jw = bm.hF[1],
					kx = PixelUtil.allocBytes(jw.O());
				PixelUtil.rgbaToGrayPlane(bm.hF[0], kx);
				var fj = jw.m,
					gl = jw.n;
				bL = {
					iJ: fj,
					Tq: gl
				};
				bL.map = new Float32Array(bL.iJ * bL.Tq * 2);
				var aF = 2.54 * G.HrzS.v * fj / T,
					a4 = 2.54 * G.VrtS.v * gl / j;
				for (var H = 0; H < bL.Tq; H++) {
					for (var W = 0; W < bL.iJ; W++) {
						var hV = -.5 + kx[H * fj + W] * (1 / 255),
							A = H * bL.iJ + W << 1;
						bL.map[A] = hV * aF;
						bL.map[A + 1] = hV * a4
					}
				}
			} else if (l == "Pnch" || l == "Twrl" || l == "Sphr" || l == "ZgZg") {
				var bj = 1,
					hK = Math.PI,
					fy = 0,
					eW = 1,
					eA = 0,
					i_ = 3,
					jt = 1.53,
					ku = 1;
				if (l == "Pnch" || l == "Sphr" || l == "ZgZg") bj = G.Amnt.v / 100;
				if (l == "ZgZg") {
					eW = G.NmbR.v;
					eA = ["ArnC", "OtFr", "PndR"].indexOf(G.ZZTy.v.ZZTy)
				}
				if (l == "Twrl") hK = G.Angl.v * Math.PI / 180;
				if (l == "Sphr") fy = ["Nrml", "HrzO", "VrtO"].indexOf(G.SphM.v.SphM);

				function fV(W) {
					W = Math.pow(W, 1 - W * .3 - W * W * (W * W) * .5);
					return -.225 * Math.sin(W * Math.PI)
				}

				function bX(j, b8, _, gi, cj, iA, g9, ku) {
					var a = iA - gi,
						m = g9 - cj,
						cQ = gi - j,
						fQ = cj - b8,
						b5 = a * a + m * m,
						f_ = 2 * (a * cQ + m * fQ),
						i_ = cQ * cQ + fQ * fQ - _ * _,
						eG = Math.sqrt(f_ * f_ - 4 * b5 * i_),
						jc = ku / (2 * b5),
						j8 = (-f_ + eG) * jc,
						fW = (-f_ - eG) * jc;
					return ku * Math.min(j8, fW)
				}
				var fU = bL.iJ,
					c8 = bL.Tq,
					gh = bL.iJ / 2,
					gO = bL.Tq / 2,
					dC = 1 / gh,
					_ = Math.sqrt(i_ * i_ + 1) / i_,
					cU = i_ + Math.sqrt(1 / (i_ * i_));
				if (bj < 0) {
					i_ = 1.72;
					_ = 1;
					cU = i_;
					jt = -1;
					ku = -1
				}
				for (var H = 0; H < c8; H++) {
					var m = (H - gO) / gO;
					for (var W = 0; W < fU; W++) {
						var a = (W - gh) * dC;
						if (fy == 1) m = 0;
						else if (fy == 2) a = 0;
						var hL = Math.sqrt(a * a + m * m);
						if (hL < 1 && hL != 0) {
							var A = H * bL.iJ + W << 1;
							if (l == "Pnch") {
								var aw = -bj * fV(hL) / hL;
								bL.map[A] = a * aw * gh;
								bL.map[A + 1] = m * aw * gO
							} else if (l == "Sphr") {
								var bS = bX(0, cU, _, 0, 0, hL, i_, ku),
									e$ = jt * bj * (bS - 1);
								bL.map[A] = a * e$ * gh;
								bL.map[A + 1] = m * e$ * gO
							} else if (l == "Twrl") {
								var e7 = Math.atan2(m, a) - hK * (1 - hL) * (1 - hL),
									gn = Math.cos(e7),
									hz = Math.sin(e7);
								bL.map[A] = (hL * gn - a) * gh;
								bL.map[A + 1] = (hL * hz - m) * gO
							} else if (l == "ZgZg") {
								var gn = 0,
									hz = 0,
									dZ = bj * (.5 - .5 * Math.cos(hL * eW * 2 * Math.PI)) * (1 - hL);
								if (eA == 0) {
									var e7 = Math.atan2(m, a) - 3.5 * dZ;
									gn = hL * Math.cos(e7);
									hz = hL * Math.sin(e7)
								}
								if (eA == 1) {
									dZ = 100 / T * dZ / hL;
									gn = (1 - dZ) * a;
									hz = (1 - dZ) * m
								}
								if (eA == 2) {
									var x = 512 / T * dZ * Math.PI / 4;
									gn = x + a;
									hz = x + m
								}
								bL.map[A] = (gn - a) * gh;
								bL.map[A + 1] = (hz - m) * gO
							}
						}
					}
				}
			} else if (l == "Shr ") {
				var gu = JSON.parse(JSON.stringify(G.ShrP.v));
				PixelUtil.presetThumb.D(gu, new Matrix2D(0, 255 / 127, 255 / 127, 0, -2, 0));
				var dO = PixelUtil.presetThumb.j0(gu, bL.Tq, !0);
				bl = G.UndA.v.UndA == "WrpA" ? 2 : 1;
				for (var H = 0; H < bL.Tq; H++) {
					var a = -dO[H] * bL.iJ;
					for (var W = 0; W < bL.iJ; W++) {
						var A = H * bL.iJ + W << 1;
						bL.map[A] = a
					}
				}
			} else if (l == "Wave") {
				var bf = G.NmbG.v,
					gV = G.WLMn.v,
					dv = G.WLMx.v,
					jg = G.AmMn.v * (Math.PI / 4),
					ff = G.AmMx.v * (Math.PI / 4),
					cD = G.SclH.v / 100,
					cd = G.SclV.v / 100,
					b1 = G.Wvtp.v.Wvtp,
					dZ = Math.sin;
				if (b1 == "WvTr") dZ = function(W) {
					W *= 2 / Math.PI;
					return -.5 + Math.abs(W % 2 - 1)
				};
				if (b1 == "WvSq") dZ = function(W) {
					W *= 2 / Math.PI;
					return 1 + 2 * Math.floor(W % 2 - 1)
				};
				var bO = [],
					h5 = new PixelUtil.blend.IR(G.RndS.v);
				for (var A = 0; A < bf; A++) {
					bO.push(h5.get() * 10);
					bO.push(Math.PI * cC / (gV + h5.get() * (dv - gV)));
					bO.push(cD * (jg + h5.get() * (ff - jg)) / cC);
					bO.push(h5.get() * 10);
					bO.push(Math.PI * cC / (gV + h5.get() * (dv - gV)));
					bO.push(cd * (jg + h5.get() * (ff - jg)) / cC)
				}
				var da = [],
					b0 = [],
					eT = Math.max(bL.iJ, bL.Tq);
				for (var A = 0; A < eT; A++) {
					var a = 0,
						m = 0;
					for (var iH = 0; iH < bf; iH++) {
						var hH = iH * 6;
						a += bO[hH + 2] * dZ(bO[hH] + A * bO[hH + 1]);
						m += bO[hH + 5] * dZ(bO[hH + 3] + A * bO[hH + 4])
					}
					da[A] = m;
					b0[A] = a
				}
				for (var H = 0; H < bL.Tq; H++) {
					for (var W = 0; W < bL.iJ; W++) {
						var A = H * bL.iJ + W << 1;
						bL.map[A] = b0[H];
						bL.map[A + 1] = da[W]
					}
				}
				bl = G.UndA.v.UndA == "WrpA" ? 2 : 1
			} else if (l == "Rple") {
				bl = 1;
				var bj = G.Amnt.v / 100,
					gW = 4,
					jQ = [0, -.19, -.29, -.32, .92, .37, .93, .54, -.54, .42, -.29, -.58, -.67, .85, 0, .64],
					h2 = 1,
					dd = 1,
					cQ = 0,
					bu = ["Sml", "Mdm", "Lrg"].indexOf(G.RplS.v.RplS);
				if (bu == 0) {
					h2 = 1;
					dd = .2;
					cQ = 3
				}
				if (bu == 2) {
					h2 = 1;
					dd = 2;
					cQ = -1;
					jQ = jQ.reverse()
				}
				var cM = function(W, H) {
						var i_ = Math.cos,
							dL = 0;
						for (var A = 0; A < gW; A++)
							for (var iH = 0; iH < gW; iH++) dL += jQ[A * gW + iH] * i_(W * (A + cQ) - H * (iH + cQ));
						return dL
					},
					hO = Math.floor(50 / cC),
					k9 = new Float32Array(hO * hO * 2),
					dD = dd * bj * .5 / cC;
				for (var H = 0; H < hO; H++)
					for (var W = 0; W < hO; W++) {
						var gY = h2 * W * 2 * Math.PI / hO,
							jh = h2 * H * 2 * Math.PI / hO,
							cu = cM(gY, jh),
							a = (cM(gY + .01, jh) - cu) * 100,
							m = (cM(gY, jh + .01) - cu) * 100,
							A = (H * hO + W) * 2;
						k9[A] = a * dD;
						k9[A + 1] = m * dD
					}
				for (var H = 0; H < bL.Tq; H++)
					for (var W = 0; W < bL.iJ; W++) {
						var hz = H % hO,
							gn = W % hO,
							A = H * bL.iJ + W << 1,
							dh = hz * hO + gn << 1;
						bL.map[A] = k9[dh];
						bL.map[A + 1] = k9[dh + 1]
					}
			}
		}
		PixelUtil.Ad.Dq(d.buffer, Q.buffer, T, j, null, bL.map, bL.iJ, bL.Tq, bl)
	}
	return Q
};
