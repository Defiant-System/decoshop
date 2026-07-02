
// to be part of bundle
@import "bundle/ext/pako.js"
@import "bundle/ext/upng.js"
@import "bundle/ext/uzip.js"
@import "bundle/ext/utif.js"
@import "bundle/ext/typr.js"
@import "bundle/dbs.js"

@import "modules/misc.js"
@import "bundle/fnts.js"

@import "bundle/rect.js"
@import "bundle/point-2d.js"
@import "bundle/matrix-2d.js"
@import "bundle/event-emitter.js"
@import "bundle/ui-component.js"
@import "bundle/export-helper.js"
@import "bundle/style-helper.js"
@import "bundle/font-helper.js"
@import "bundle/format-handler.js"
@import "bundle/keyboard-handler.js"
@import "bundle/clipboard-handler.js"
@import "bundle/link-bar.js"
@import "bundle/command-palette.js"
@import "bundle/dialog-manager.js"
@import "bundle/descriptor-mapper.js"
@import "bundle/language-manager.js"
@import "bundle/app-state.js"
@import "bundle/pixel-util.js"
@import "bundle/webgl-context.js";
@import "bundle/pattern-helper.js";
@import "bundle/lab-color-data.js"
@import "bundle/layer-record.js"
@import "bundle/layer-effects-helper.js"
@import "bundle/history-state.js"
@import "bundle/document-view-state.js"
@import "bundle/psd-document.js"
@import "bundle/psd-descriptor-helper.js"
@import "bundle/psd-resource-types.js"
@import "bundle/xmpMetadata.js"
@import "bundle/canvas-tools.js"
@import "bundle/riff-chunk-parser.js"
@import "bundle/filter-helper.js"
@import "bundle/text-style-helper.js"
@import "bundle/action.js"

@import "bundle/dom-ui-helper.js"
@import "bundle/photopea.js"


Promise.all(Object.keys(BINDB).map(async key => {
	let res = await window.fetch(BINDB[key], { responseType: "arrayBuffer" });
	let ab = await res.arrayBuffer();
	BINDB_DATA[key] = new Uint8Array(ab);
})).then(async () => {

	var b1 = FormatHandler.RT.get("wasm/jpg").buffer;
	var d1 = await WebAssembly.instantiate(b1);
	FormatHandler.na.nT = d1;

	var b2 = FormatHandler.RT.get("wasm/webp").buffer;
	var d2 = await WebAssembly.instantiate(b2);
	FormatHandler.zV.exp = d2.instance.exports;

	var b3 = FormatHandler.RT.get("wasm/zstd").buffer;
	var d3 = await WebAssembly.instantiate(b3);
	FormatHandler.R5.aqZ = d3.instance.exports;

	FormatHandler.ap_ = FormatHandler.ap_();
	FormatHandler.aAB = FormatHandler.aAB();
	i5 = i5();
	FormatHandler.SM.gR = FormatHandler.SM.gR();
	FormatHandler.a6t = FormatHandler.a6t();
	FormatHandler.a3C = FormatHandler.a3C();
	FormatHandler.a6Y = FormatHandler.a6Y();
	FormatHandler.tI.gR = FormatHandler.tI.gR();
	FormatHandler.sZ.gR = FormatHandler.sZ.gR();
	FormatHandler.Wb.gR = FormatHandler.Wb.gR();

	// hbi: init event
	var event = new Action(ActionTypes.E.hbi);
	event.data = { type: "app-init" };
	PP.dispatch(event);
});

const PP = new PhotopeaApp;

module.exports = {
	PP,
	Action,
	ActionTypes,
	CanvasTools,
	LayerSectionType,
	PixelUtil,
	Point2D,
	Rect,
	exportHelper,
	languageManager,
	Misc,
};
