
let Test = {
	init(APP) {

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 600);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 600);

		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgColors", value: "#ff0000" }), 1000);

	}
};
