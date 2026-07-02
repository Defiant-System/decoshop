
var DescriptorMapper = {};

DescriptorMapper.decodeDescriptor = function(l) {
	return DescriptorMapper.al(l, DescriptorMapper.c9, 0)
};

DescriptorMapper.encodeDescriptor = function(l) {
	return DescriptorMapper.k4(l, DescriptorMapper.c9)
};

DescriptorMapper.al = function(l, d, G) {
	var b;
	if (typeof l == "string") return l;
	if (l instanceof Array) {
		b = [];
		for (var A = 0; A < l.length; A++) b[A] = DescriptorMapper.al(l[A], d, G + 1)
	} else {
		b = {};
		var V = {};
		for (var Q in d) {
			var t = d[Q],
				I = "_" + t[0];
			if (l[I] != null) {
				b[Q] = t[1] ? DescriptorMapper.al(l[I], t[1], G + 1) : l[I];
				V[I] = !0
			}
		}
		for (var Q in l) {
			if (V[Q] == null) {
				if (Q.length > 3) continue;
				console.log(d, V);
				console.log(Q, l);
				throw "e"
			}
		}
	}
	return b
};

DescriptorMapper.k4 = function(l, d) {
	var G;
	if (typeof l == "string") return l;
	else if (l instanceof Array) {
		G = [];
		for (var A = 0; A < l.length; A++) G[A] = DescriptorMapper.k4(l[A], d)
	} else {
		G = {};
		var b = {};
		for (var V in d) {
			var Q = d[V],
				t = "_" + Q[0];
			if (l[V] != null) {
				G[t] = Q[1] ? DescriptorMapper.k4(l[V], Q[1]) : l[V];
				b[V] = !0
			}
		}
		for (var V in l) {
			if (b[V] == null) {
				console.log(d, b);
				console.log(V, l);
				throw "e"
			}
		}
	}
	return G
};

DescriptorMapper.hi = {
	_Color: [0, {
		_Type: [0],
		_Values: [1]
	}],
	_CAIKnownStyleID: [5],
	_StreamTag: [99]
};

DescriptorMapper.Point2D = {
	_Font: [0],
	_FontSize: [1],
	_FauxBold: [2],
	_FauxItalic: [3],
	_AutoLeading: [4],
	_Leading: [5],
	_HorizontalScale: [6],
	_VerticalScale: [7],
	_Tracking: [8],
	_BaselineShift: [9],
	_CharacterRotation: [10],
	_AutoKern: [11],
	_FontCaps: [12],
	_FontBaseline: [13],
	_FontOTPosition: [14],
	_StrikethroughPosition: [15],
	_UnderlinePosition: [16],
	_UnderlineOffset: [17],
	_Ligatures: [18],
	_DiscretionaryLigatures: [19],
	_ContextualLigatures: [20],
	_AlternateLigatures: [21],
	_OldStyle: [22],
	_Fractions: [23],
	_Ordinals: [24],
	_Swash: [25],
	_Titling: [26],
	_ConnectionForms: [27],
	_StylisticAlternates: [28],
	_Ornaments: [29],
	_FigureStyle: [30],
	_ProportionalMetrics: [31],
	_Kana: [32],
	_Italics: [33],
	_Ruby: [34],
	_BaselineDirection: [35],
	_Tsume: [36],
	_StyleRunAlignment: [37],
	_Language: [38],
	_JapaneseAlternateFeature: [39],
	_EnableWariChu: [40],
	_WariChuLineCount: [41],
	_WariChuLineGap: [42],
	_WariChuSubLineAmount: [43, {
		_WariChuSubLineScale: [0]
	}],
	_WariChuWidowAmount: [44],
	_WariChuOrphanAmount: [45],
	_WariChuJustification: [46],
	_TCYUpDownAdjustment: [47],
	_TCYLeftRightAdjustment: [48],
	_LeftAki: [49],
	_RightAki: [50],
	_JiDori: [51],
	_NoBreak: [52],
	_FillColor: [53, DescriptorMapper.hi],
	_StrokeColor: [54, DescriptorMapper.hi],
	_Blend: [55, {
		_1: [1],
		_3: [3],
		_Knockout: [4],
		_StreamTag: [99]
	}],
	_FillFlag: [56],
	_StrokeFlag: [57],
	_FillFirst: [58],
	_FillOverPrint: [59],
	_StrokeOverPrint: [60],
	_LineCap: [61],
	_LineJoin: [62],
	_LineWidth: [63],
	_MiterLimit: [64],
	_LineDashOffset: [65],
	_LineDashArray: [66],
	_Type1EncodingNames: [67],
	_Kashidas: [68],
	_DirOverride: [69],
	_DigitSet: [70],
	_DiacVPos: [71],
	_DiacXOffset: [72],
	_DiacYOffset: [73],
	_OverlapSwash: [74],
	_JustificationAlternates: [75],
	_StretchedAlternates: [76],
	_FillVisibleFlag: [77],
	_StrokeVisibleFlag: [78],
	_FillBackgroundColor: [79, DescriptorMapper.hi],
	_FillBackgroundFlag: [80],
	_UnderlineStyle: [81],
	_DashedUnderlineGapLength: [82],
	_DashedUnderlineDashLength: [83],
	_SlashedZero: [84],
	_StylisticSets: [85],
	_CustomFeature: [86, {
		_StreamTag: [99]
	}],
	_MarkYDistFromBaseline: [87],
	_AutoMydfb: [88],
	_RefFontSize: [89],
	_FontSizeRefType: [90]
};

DescriptorMapper.ac_ = {
	_Justification: [0],
	_FirstLineIndent: [1],
	_StartIndent: [2],
	_EndIndent: [3],
	_SpaceBefore: [4],
	_SpaceAfter: [5],
	_DropCaps: [6],
	_AutoLeading: [7],
	_LeadingType: [8],
	_AutoHyphenate: [9],
	_HyphenatedWordSize: [10],
	_PreHyphen: [11],
	_PostHyphen: [12],
	_ConsecutiveHyphens: [13],
	_Zone: [14],
	_HyphenateCapitalized: [15],
	_HyphenationPreference: [16],
	_WordSpacing: [17],
	_LetterSpacing: [18],
	_GlyphSpacing: [19],
	_SingleWordJustification: [20],
	_Hanging: [21],
	_AutoTCY: [22],
	_KeepTogether: [23],
	_BurasagariType: [24],
	_KinsokuOrder: [25],
	_Kinsoku: [27],
	_KurikaeshiMojiShori: [26],
	_MojiKumiTable: [28],
	_EveryLineComposer: [29],
	_TabStops: [30],
	_DefaultTabWidth: [31],
	_DefaultStyle: [32, DescriptorMapper.Point2D],
	_ParagraphDirection: [33],
	_JustificationMethod: [34],
	_ComposerEngine: [35],
	_ListStyle: [36],
	_ListTier: [37],
	_ListSkip: [38],
	_ListOffset: [39],
	_KashidaWidth: [40]
};

DescriptorMapper.akv = {
	_Name: [0],
	_Features: [5, DescriptorMapper.ac_],
	_Parent: [6],
	_UUID: [97]
};

DescriptorMapper.adO = {
	_Name: [0],
	_Parent: [5],
	_Features: [6, DescriptorMapper.Point2D],
	_UUID: [97]
};

DescriptorMapper.c9 = {
	_98: [98, {
		_0: [0]
	}],
	_DocumentResources: [0, {
		_0: [0],
		_FontSet: [1, {
			_Resources: [0, {
				_Resource: [0, {
					_StreamTag: [99],
					_Identifier: [0, {
						_Name: [0],
						_ScriptType: [1],
						_Type: [2],
						_Synthetic: [3],
						_4: [4],
						_MMAxis: [5]
					}],
					_UUID: [97]
				}]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}],
		_MojiKumiCodeToClassSet: [2, {
			_Resources: [0, {
				_Resource: [0, {
					_Name: [0],
					_Members: [5],
					_UUID: [97]
				}]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}],
		_MojiKumiTableSet: [3, {
			_Resources: [0, {
				_Resource: [0, {
					_Name: [0],
					_Members: [5, {
						_CodeToClass: [0],
						_AutoTsume: [1, {
							_TsumeMappings: [0, {
								_Before: [0],
								_After: [1],
								_Code: [2]
							}]
						}],
						_Table: [2, {
							_DataArray: [0, {
								_SparseArray: [0, {
									_Index: [0],
									_Elements: [1, {
										_P: [0],
										_Data: [1, {
											_A: [0, {
												_R: [0],
												_P: [1]
											}],
											_B: [1, {
												_R: [0],
												_P: [1]
											}]
										}]
									}]
								}]
							}]
						}],
						_PredefinedTag: [3]
					}],
					_UUID: [97]
				}]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}],
		_KinsokuSet: [4, {
			_Resources: [0, {
				_Resource: [0, {
					_Name: [0],
					_Data: [5, {
						_NoStart: [0],
						_NoEnd: [1],
						_Keep: [2],
						_Hanging: [3],
						_PredefinedTag: [4]
					}],
					_UUID: [97]
				}]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}],
		_StyleSheetSet: [5, {
			_Resources: [0, {
				_Resource: [0, DescriptorMapper.adO]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}],
		_ParagraphSheetSet: [6, {
			_Resources: [0, {
				_Resource: [0, DescriptorMapper.akv]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}],
		_7: [7, {
			_Resources: [0, {
				_Resource: [0, {
					_0: [0, {
						_0: [0],
						_1: [1, {
							_0: [0]
						}]
					}],
					_1: [1]
				}]
			}]
		}],
		_TextFrameSet: [8, {
			_Resources: [0, {
				_Resource: [0, {
					_0: [0],
					_Bezier: [1, {
						_Points: [0]
					}],
					_Data: [2, {
						_Type: [0],
						_LineOrientation: [1],
						_FrameMatrix: [2],
						_4: [4],
						_TextOnPathTRange: [6],
						_RowGutter: [7],
						_ColumnGutter: [8],
						_9: [9],
						_FirstBaselineAlignment: [10, {
							_Flag: [0],
							_Min: [1]
						}],
						_PathData: [11, {
							_1: [1],
							_Reversed: [0],
							_2: [2],
							_3: [3],
							_Spacing: [4],
							_5: [5],
							_6: [6],
							_7: [7],
							_18: [18]
						}],
						_12: [12],
						_13: [13]
					}],
					_3: [3, {
						_0: [0]
					}],
					_UUID: [97]
				}]
			}]
		}],
		_ListStyleSet: [9, {
			_Resources: [0, {
				_Resource: [0, {
					_Name: [0],
					_LevelStyle: [5, {
						_IndentUnits: [0],
						_TextIndent: [1],
						_LabelIndent: [2],
						_LabelAlignment: [3],
						_SequenceGenerator: [5, {
							_Prefix: [0],
							_Postfix: [1],
							_2: [2],
							_CaseType: [3],
							_Bullet: [9],
							_StreamTag: [99]
						}],
						_Font: [6],
						_7: [7]
					}],
					_PredefinedTag: [6],
					_UUID: [97]
				}]
			}],
			_DisplayList: [1, {
				_Resource: [0]
			}]
		}]
	}],
	_DocumentObjects: [1, {
		_DocumentSettings: [0, {
			_HiddenGlyphFont: [0, {
				_AlternateGlyphFont: [0],
				_WhitespaceCharacterMapping: [1, {
					_WhitespaceCharacter: [0],
					_AlternateCharacter: [1]
				}]
			}],
			_NormalStyleSheet: [1],
			_NormalParagraphSheet: [2],
			_SuperscriptSize: [3],
			_SuperscriptPosition: [4],
			_SubscriptSize: [5],
			_SubscriptPosition: [6],
			_SmallCapSize: [7],
			_UseSmartQuotes: [8],
			_SmartQuoteSets: [9, {
				_Language: [0],
				_OpenDoubleQuote: [1],
				_CloseDoubleQuote: [2],
				_OpenSingleQuote: [3],
				_CloseSingleQuote: [4]
			}],
			_10: [10],
			_11: [11],
			_LinguisticSettings: [15, {
				_PreferredProvider: [0],
				_LinguisticProviderInfo: [1]
			}],
			_13: [13],
			_UseSmartLists: [16],
			_DefaultStoryDir: [17],
			_18: [18],
			_GreekingSize: [20]
		}],
		_TextObjects: [1, {
			_Model: [0, {
				_Text: [0],
				_ParagraphRun: [5, {
					_RunArray: [0, {
						_RunData: [0, {
							_ParagraphSheet: [0, DescriptorMapper.akv]
						}],
						_Length: [1]
					}]
				}],
				_StyleRun: [6, {
					_RunArray: [0, {
						_RunData: [0, {
							_StyleSheet: [0, DescriptorMapper.adO]
						}],
						_Length: [1]
					}]
				}],
				_FirstKern: [7],
				_8: [8],
				_AlternateGlyphRun: [9, {
					_RunArray: [0, {
						_RunData: [0, {
							_AlternateGlyphSheet: [0, {
								_Glyph: [0],
								_Name: [1],
								_2: [2]
							}]
						}],
						_Length: [1]
					}]
				}],
				_StorySheet: [10, {
					_AntiAlias: [0],
					_1: [1],
					_UseFractionalGlyphWidths: [2],
					_3: [3],
					_4: [4]
				}],
				_KernRun: [15],
				_HyperlinkRun: [16]
			}],
			_View: [1, {
				_Frames: [0, {
					_Resource: [0]
				}],
				_RenderedData: [1, {
					_RunArray: [0, {
						_RunData: [0, {
							_0: [0],
							_LineCount: [1]
						}],
						_Length: [1]
					}]
				}],
				_Strikes: [2]
			}],
			_OpticalAlignment: [2]
		}],
		_OriginalNormalStyleFeatures: [2, DescriptorMapper.Point2D],
		_OriginalNormalParagraphFeatures: [3, DescriptorMapper.ac_]
	}]
};
