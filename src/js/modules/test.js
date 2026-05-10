
let Test = {
	init(APP) {

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		/* dlgBrightnessContrast
		 * dlgStroke
		 * dlgGaussianBlur
		 * dlgThreshold
		 * dlgCrystallize
		 * dlgPointillize
		 * dlgMosaic
		 * dlgSponge
		 * dlgPixelator
		 * dlgColors
		 */
		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgColors" }), 800);

	}
};
