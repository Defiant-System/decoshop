
let Test = {
	init(APP) {

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		/* 
		 * dlgExportAs	dlgPrint	dlgExportLayers	dlgExportColorLookUp	dlgFileInfo
		 * dlgFill	dlgStroke	dlgPresetManager	dlgPreferences
		 * dlgCanvasSize	dlgImageSize	dlgTrim	dlgApplyImage	dlgVariables
		 * dlgBrightnessContrast	dlgLevels	dlgCurves
		   dlgExposure 	dlgVibrance 	dlgHueSaturation 	dlgColorBalance 	dlgBlackWhite 	dlgPhotoFilter
		   dlgChannelMixer 	dlgColorLookup 	dlgThreshold 	dlgGradientMap 	dlgSelectiveColor 	dlgShadowHighlights
		   dlgMatchColor	dlgReplaceColor	
		 * dlgSelectColorRange	dlgSelectMagicCut	dlgSelectRefineEdge	dlgSelectModifyBorder
		 * dlgSelectModifySmooth	dlgSelectModifyExpand	dlgSelectModifyContract	dlgSelectModifyFeather

		 * dlgFilterGallery	dlgLensCorrection	dlgCameraRaw	dlgLiquify	dlgPixelator
		 * dlgNormalMap	dlgTextureDilation

		 * dlgBoxBlur	dlgGaussianBlur	dlgLensBlur	dlgMotionBlur	dlgRadialBlur	dlgSurfaceBlur
		 * dlgDisplace	dlgKaleidoscope	dlgPinch	dlgPolarCoordinates	dlgRipple	dlgShear	dlgSpherize	dlgTwirl	dlgWave	dlgZigZag
		 * dlgAddNoise	dlgDustScratches	dlgMedian	dlgReduceNoise
		 * dlgColorHalftone	dlgCrystallize	dlgMezzoint	dlgMosaic	dlgPointillize
		 * dlgFlame	dlgFibers	dlgLensFlare
		 * dlgSmartSharpen	dlgUnshartMask

		 * dlgDiffuse	dlgEmboss	dlgOilPaint	dlgTraceContour	dlgWind
		 * dlgHighPass	dlgHsbHsl	dlgMaximum	dlgMinimum	dlgOffset	dlgRepeat	dlgColorToAlpha	dlgDither	dlgParticles
		 * dlgAddGuides
		 */
		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgPreferences" }), 800);

	}
};
