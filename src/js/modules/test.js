
let Test = {
	init(APP) {
		// return;

		// reset content view "animations"
		// APP.els.content.removeClass("no-anim");

		// setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);


		PP.addEventListener(ActionTypes.E.L, event => {
			switch (event.data.a) {
				case ActionTypes.$.h73: // APP init
					setTimeout(() => {
						// Open PSD file (same flow as File > Open from URL)
						let action = new Action(ActionTypes.E.L, true);
						action.data = {
							a: ActionTypes.$.ub,
							Oo: { url: "/cdn/img/2d-samples/casey-lee.jpg" }
							// Oo: { url: "/cdn/img/2d-samples/robert-collins.jpg" }
							// Oo: { url: "/cdn/img/2d-samples/matthew-brodeur.jpg" }
							// Oo: { url: "/cdn/img/2d-samples/girl.psd" }
							// Oo: { url: "~/img/combo.webp" }
							// Oo: { url: "~/img/font-sheet.png" }
						};
						PP.dispatch(action);
					}, 300);
					break;
				case ActionTypes.$.ub: // open file (URL / path)
					setTimeout(() => {
						var doc = PP.fk();
						console.log(doc);
					}, 1);
					break;
				default:
					// console.log(1111, event);
			}
		});

		PP.addEventListener(ActionTypes.E.v, event => {
					console.log(event);
			// switch (event.data.a) {
			// 	case ActionTypes.$.ub: // file open
			// 		console.log(event);

			// 		// var doc = PP.fk();
			// 		// var history = doc.history;
			// 		// var currentIndex = doc.historyIndex;
			// 		// var currentState = doc.history[doc.historyIndex];

			// 		console.log( event.target.fk() );

			// 		break;
			// 	default:
			// 		// console.log(event);
			// }
		});


		// setTimeout(() => {
		// 	let doc = PP.fk();
		// 	if (!doc) return;
		// 	let u = doc.u,
		// 		dpr = s.getDevicePixelRatio(),
		// 		panX = 300 * dpr - u.Vm.m / 2,
		// 		panY = 500 * dpr - u.Vm.n / 2;
		// 	u.R.T6(panX, panY);
		// 	doc.bV = true;
		// 	// PP.update();
		// }, 1500);

		// stops RAF
		// setTimeout(() => { decoshop._stopped = true; }, 2000);
		


		setTimeout(() => APP.els.content.find(`.tool-hand`).trigger("click"), 500);
		// setTimeout(() => APP.els.content.find(`.option[data-options="pop-font-selector"] span`).get(0).trigger("click"), 600);
		// setTimeout(() => APP.els.content.find(`.font-explorer .icon-burger`).trigger("click"), 800);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);
		// setTimeout(() => APP.els.content.find(`.box-content-list .row`).get(0).trigger("click"), 500);


		// setTimeout(() => APP.els.content.find(`.extras-bar .tool`).get(3).trigger("click"), 500);

		// setTimeout(() => APP.els.content.find(`.box-head div[data-content="adjustments"]`).trigger("click"), 520);
		// setTimeout(() => APP.els.content.find(`.adjustments-wrapper .tool[data-target="dlgHueSaturation"]`).trigger("click"), 750);
		// setTimeout(() => APP.els.content.find(`.panel-head .opt-group li[data-id="mask"]`).trigger("click"), 800);
		
		// setTimeout(() => APP.els.content.find(`.field[data-click="select-tip-options"] > div`).get(4).trigger("click"), 800);

		/* 
		 * 
		 */
		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgScaleEffects" }), 600);
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

