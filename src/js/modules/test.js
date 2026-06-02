
let Test = {
	init(APP) {
		// return;

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);

		/* 
		 * 
		 */
		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgFilterGallery" }), 600);
		// setTimeout(() => APP.els.content.find(`.active-filters .icon-arrow`).get(0).trigger("click"), 1000);
		// setTimeout(() => APP.els.content.find(`.active-filters .filter`).get(0).trigger("click"), 1400);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Drop Shadow" }), 600);
		// setTimeout(() => APP.els.content.find(`.value[data-options="contours"]`).trigger("click"), 1200);
		// setTimeout(() => APP.els.content.find(`.value[data-options="patterns"]`).trigger("click"), 1200);


		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Contour" }), 600);
		// setTimeout(() => APP.els.content.find(`div[data-name="Contour"] .option .value[data-options="contours"]`).trigger("click"), 1200);

		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgPresetManager,Layer Style" }), 700);
		
		// setTimeout(() => APP.els.content.find(`.grid-arrow:nth(4)`).trigger("click"), 900);
		// setTimeout(() => APP.els.content.find(`.liq-tool:nth(0)`).trigger("click"), 900);
	}
};
