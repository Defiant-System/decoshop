
// Memory usage panel: drill-down tree of RAM/GPU bytes per open document, layer, and asset.
// Built as an IIFE so navigation state (stack, DOM refs) stays in a closure shared by helpers.
const Memory = (() => {
	var navStack = [],    // drill-down breadcrumb stack of memory tree nodes
	listEl = null,        // scrollable row container
	backBtn = null,
	openDocs = null,      // pp.Mt — array of open PsdDocument instances
	// Background tint per node category (index = node.Ts)
	categoryColors = [
		[100, 180, 255],   // 0 = document
		[100, 255, 100],   // 1 = layer
		[255, 200, 100],   // 2 = final composite
		[200, 100, 255],   // 3 = layer effect
		[255, 100, 200]
	];  // 4 = smart object / linked file

	
})();
