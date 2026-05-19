
let Test = {
	init(APP) {
		// return;

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);

		/* 
		 * dlgExportAs	dlgPrint	dlgExportLayers	dlgExportColorLookUp	dlgFileInfo
		 * dlgFill	dlgStroke	dlgPresetManager	dlgPreferences
		 * dlgCanvasSize	dlgImageSize	dlgTrim	dlgApplyImage	dlgVariables
		 * dlgBrightnessContrast	dlgLevels	dlgCurves
		   dlgExposure 	dlgVibrance 	dlgHueSaturation 	dlgColorBalance 	dlgBlackWhite 	dlgPhotoFilter
		   dlgChannelMixer 	dlgColorLookup 	dlgThreshold 	dlgGradientMap 	dlgSelectiveColor 	dlgShadowHighlights
		   dlgMatchColor	dlgReplaceColor	
		 * dlgDuplicateInfo	dlgArtboard	dlgArtboardFromLayer
		 * dlgSelectColorRange	dlgSelectMagicCut	dlgSelectRefineEdge
		 * dlgSelectModifyBorder	dlgSelectModifySmooth	dlgSelectModifyExpand	dlgSelectModifyContract	dlgSelectModifyFeather
		 * dlgFilterGallery	dlgLensCorrection	dlgCameraRaw	dlgLiquify	dlgPixelator
		 * dlgNormalMap	dlgTextureDilation
		 * dlgBoxBlur	dlgGaussianBlur	dlgLensBlur	dlgMotionBlur	dlgRadialBlur	dlgSurfaceBlur
		 * dlgDisplace	dlgKaleidoscope	dlgPinch	dlgPolarCoordinates	dlgRipple	dlgShear	dlgSpherize	dlgTwirl	dlgWave	dlgZigZag
		 * dlgAddNoise	dlgDustScratches	dlgMedian	dlgReduceNoise
		 * dlgColorHalftone	dlgCrystallize	dlgMezzoint	dlgMosaic	dlgPointillize
		 * dlgFlame	dlgFibers	dlgLensFlare
		 * dlgSmartSharpen	dlgUnsharpMask
		 * dlgDiffuse	dlgEmboss	dlgOilPaint	dlgTraceContour	dlgWind
		 * dlgHighPass	dlgHsbHsl	dlgMaximum	dlgMinimum	dlgOffset	dlgRepeat	dlgColorToAlpha	dlgDither	dlgParticles
		 * dlgAddGuides
		 */
		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgFilterGallery" }), 600);
		// setTimeout(() => APP.els.content.find(`.active-filters .icon-arrow`).get(0).trigger("click"), 1000);
		// setTimeout(() => APP.els.content.find(`.active-filters .filter`).get(0).trigger("click"), 1400);

		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Stroke" }), 600);
		// setTimeout(() => APP.els.content.find(`.value[data-options="contours"]`).trigger("click"), 1200);
		// setTimeout(() => APP.els.content.find(`.value[data-options="patterns"]`).trigger("click"), 1200);
	}
};
