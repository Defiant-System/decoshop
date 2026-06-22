
function HistoryState(l, d, G) {
	if (G == null) G = !1;
	this.name = l;   // display name (e.g. "Open", "Brush", or id array)
	this.G = d;      // handler object (implements applyUndo / applyRedo)
	this.skipInHistoryPanel = G;     // if true, step is not shown in History panel and not counted toward history limit
	this.data = null; // state payload passed to applyUndo/applyRedo
	this.aod = Date.now()
}
