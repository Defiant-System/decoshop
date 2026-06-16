
let Test = {
	init(APP) {
		// return;

		// reset content view "animations"
		// APP.els.content.removeClass("no-anim");

		// setTimeout(() => APP.els.content.find(`.sidebar-wrapper .box-head > div`).get(3).trigger("click"), 100);

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="type"]`).trigger("click"), 500);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);
		setTimeout(() => APP.els.content.find(`.box-content-list .row`).get(0).trigger("click"), 500);


		// setTimeout(() => APP.els.content.find(`.extras-bar .tool`).get(6).trigger("click"), 500);

		// setTimeout(() => APP.els.content.find(`.box-head div[data-content="adjustments"]`).trigger("click"), 520);
		// setTimeout(() => APP.els.content.find(`.adjustments-wrapper .tool[data-target="dlgHueSaturation"]`).trigger("click"), 750);
		// setTimeout(() => APP.els.content.find(`.panel-head .opt-group li[data-id="mask"]`).trigger("click"), 800);
		
		// setTimeout(() => APP.els.content.find(`.field[data-click="select-tip-options"] > div`).get(4).trigger("click"), 800);

		/* 
		 * 
		 */
		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgWarp" }), 600);
		// setTimeout(() => APP.els.content.find(`.active-filters .icon-arrow`).get(0).trigger("click"), 1000);
		// setTimeout(() => APP.els.content.find(`.active-filters .filter`).get(0).trigger("click"), 1400);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Drop Shadow" }), 600);
		// setTimeout(() => APP.els.content.find(`.value[data-options="contours"]`).trigger("click"), 1200);
		// setTimeout(() => APP.els.content.find(`.value[data-options="patterns"]`).trigger("click"), 1200);


		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Contour" }), 600);
		// setTimeout(() => APP.els.content.find(`div[data-name="Contour"] .option .value[data-options="contours"]`).trigger("click"), 1200);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgQuickMaskOptions" }), 400);

		// karaqu.shell("fs -up '~/help/toc.md'"); // 'Select/magic-cut.md'
		
		// setTimeout(() => APP.els.content.find(`.grid-arrow:nth(4)`).trigger("click"), 900);
		// setTimeout(() => APP.els.content.find(`.liq-tool:nth(0)`).trigger("click"), 900);
	}
};

