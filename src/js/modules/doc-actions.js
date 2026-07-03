
// Thin facade over Photopea ActionTypes.E.v dispatches for document edits with history.
const DocActions = {
	HistoryState: null,

	dispatchLayer(data) {
		let action = new Action(ActionTypes.E.v, true);
		action.G = CanvasTools.yS;
		action.data = data;
		PP.dispatch(action);
		PP.update(true);
	},

	dispatchHistory(name) {
		let action = new Action(ActionTypes.E.v, true);
		action.G = CanvasTools.lv;
		action.data = { a: name };
		PP.dispatch(action);
		PP.update(true);
	},

	toggleLayerVisibility(layerIndex) {
		this.dispatchLayer({ a: LayerRecord.mH, j: layerIndex });
	},

	setLayerVisibility(layerIndex, visible) {
		let doc = PP.fk();
		if (!doc) return;
		let layer = doc.B[layerIndex];
		if (!layer || layer.zD() === visible) return;
		this.toggleLayerVisibility(layerIndex);
	},

	toggleFxMaster(layerIndex) {
		this.dispatchLayer({ a: LayerRecord.M0, j: layerIndex });
	},

	setFxMasterVisibility(layerIndex, enabled) {
		let doc = PP.fk();
		if (!doc) return;
		let layer = doc.B[layerIndex];
		let lmfx = layer?.add?.lmfx;
		if (!lmfx || lmfx.masterFXSwitch.v === enabled) return;
		this.toggleFxMaster(layerIndex);
	},

	toggleFxVisibility(layerIndex, typeIndex, instanceIndex) {
		this.dispatchLayer({
			a: LayerRecord.f0,
			j: layerIndex,
			index: [typeIndex, instanceIndex],
		});
	},

	setFxVisibility(layerIndex, typeIndex, instanceIndex, enabled) {
		let doc = PP.fk();
		if (!doc) return;
		let layer = doc.B[layerIndex];
		let fx = layer?.add?.lmfx?.[LayerStyleConstants.effectMultiKeys[typeIndex]]?.v?.[instanceIndex]?.v;
		if (!fx || fx.enab.v === enabled) return;
		this.toggleFxVisibility(layerIndex, typeIndex, instanceIndex);
	},

	undo() {
		this.dispatchHistory("h_stepbck");
	},

	redo() {
		this.dispatchHistory("h_stepfwd");
	},

	undoRedo() {
		this.dispatchHistory("h_undoredo");
	},

	pushCustom(doc, name, data, apply, revert) {
		let handler = {
			applyRedo(d, g) {
				apply(d, g);
				g.U();
				g.bV = true;
			},
			applyUndo(d, g) {
				revert(d, g);
				g.U();
				g.bV = true;
			},
		};
		let state = new DocActions.HistoryState(name, handler);
		state.data = data;
		doc.pushHistoryState(state);
		handler.applyRedo(state.data, doc);
		PP.update(true);
	},
};
