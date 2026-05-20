
let Test = {
	init(APP) {
		// return;

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);

		/* 
		 * dlgExportAs	dlgPrint	dlgExportLayers	dlgExportColorLookUp	dlgFileInfo
		 * dlgFill	dlgPresetManager	dlgPreferences
		 * dlgCanvasSize	dlgImageSize	dlgTrim	dlgApplyImage	dlgVariables
		 * dlgBrightnessContrast	dlgLevels	dlgCurves
		   dlgExposure 	dlgVibrance 	dlgHueSaturation 	dlgColorBalance 	dlgBlackWhite 	dlgPhotoFilter
		   dlgChannelMixer 	dlgColorLookup 	 	dlgGradientMap 	dlgSelectiveColor 	dlgShadowHighlights
		   dlgMatchColor	dlgReplaceColor
		   dlgGradientEditor		
		 * dlgDuplicateInfo	dlgArtboard	dlgArtboardFromLayer
		 * dlgSelectColorRange	dlgSelectMagicCut	dlgSelectRefineEdge
		 * dlgSelectModifyBorder	dlgSelectModifySmooth	dlgSelectModifyExpand	dlgSelectModifyContract	dlgSelectModifyFeather
		 * 		dlgCameraRaw	dlgLiquify	
		 * dlgNormalMap	dlgTextureDilation
		 * dlgBoxBlur		dlgLensBlur	dlgMotionBlur	dlgRadialBlur	dlgSurfaceBlur
		 * dlgDisplace	dlgKaleidoscope	dlgPinch	dlgPolarCoordinates	dlgRipple	dlgShear	dlgSpherize	dlgTwirl	dlgWave	dlgZigZag
		 * dlgAddNoise	dlgDustScratches	dlgMedian	dlgReduceNoise
		 * 				
		 * dlgFlame	dlgFibers	dlgLensFlare
		 * dlgSmartSharpen	dlgUnsharpMask
		 * dlgDiffuse	dlgEmboss	dlgOilPaint	dlgTraceContour	dlgWind
		 * dlgHighPass	dlgHsbHsl	dlgMaximum	dlgMinimum	dlgOffset	dlgRepeat	dlgColorToAlpha	dlgDither	dlgParticles
		 * dlgAddGuides
		 */
		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgFilterGallery" }), 600);
		// setTimeout(() => APP.els.content.find(`.active-filters .icon-arrow`).get(0).trigger("click"), 1000);
		// setTimeout(() => APP.els.content.find(`.active-filters .filter`).get(0).trigger("click"), 1400);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Drop Shadow" }), 600);
		// setTimeout(() => APP.els.content.find(`.value[data-options="contours"]`).trigger("click"), 1200);
		// setTimeout(() => APP.els.content.find(`.value[data-options="patterns"]`).trigger("click"), 1200);

		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgColorHalftone" }), 600);
	}
};

/* 
dlgContourEditor	dlgFilterGallery	dlgLensCorrection	dlgPixelator	dlgLayerStyle	dlgBrightnessContrast
dlgStroke	dlgGaussianBlur	dlgThreshold	dlgCrystallize	dlgPointillize	dlgMosaic	dlgMezzoint	dlgColorHalftone
 */
