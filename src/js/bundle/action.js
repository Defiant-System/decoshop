
// Base event-like action object.
let Action = function(type, bubbles) {
	if (!bubbles) bubbles = !1;
	this.type = type;
	this.target = null;
	this.currentTarget = null;
	this.bubbles = bubbles;
	this.G = null;
	this.Fj = !1
};

// Enum-like registry of action types.
let ActionTypes = {
	E: {
		v: "0",      // tool / document command (routed to active tool)
		L: "1",      // app-level command (PhotopeaApp.$e)
		g5: "1.5",   // descriptor / history step
		A: "2",      // document tab activated
		Ax: "3",     // document tab close
		azc: "4"     // duplicate document to another tab (drag)
	},
	$: {
		to: "10",        // resize layout (window / panels)
		dY: "11",        // show floating / context panel
		qH: "12",        // reposition floating panel
		xt: "13",        // close floating panels
		e5: "14",        // push workspace cursor style
		a10: "14.1",     // pop workspace cursor style
		ub: "15",        // open file (URL / path)
		Um: "16",        // open file picker dialog
		a1: "17",        // save as PSD
		mb: "18",        // publish online (Imgur / Photopea)
		WD: "19",        // save / export document
		ay5: "19.5",     // print
		aw3: "20",       // edit smart object contents
		a2O: "20.1",     // export smart object contents
		ajq: "20.5",     // open file from local storage
		asn: "20.6",     // save to local storage
		Yq: "21",        // cut selection or delete
		n4: "22",        // copy
		EZ: "23",        // paste
		B_: "24",        // set UI zoom level
		SN: "25",        // show modal dialog
		hK: "26",        // download file blob
		lr: "27",        // open document (add tab)
		gL: "28",        // place opened image into document
		a7q: "28.5",     // open plugin panel
		amK: "29",       // toggle WebGL
		dw: "30",        // open dropped files
		yb: "31",        // select tool
		PN: "32",        // restore previous tool
		kl: "33",        // tool settings change
		vq: "34",        // panel command
		kI: "35",        // add / set / delete global resource
		agL: "35.5",     // synthetic keyboard event
		dG: "37",        // open external link
		asj: "38",       // refresh UI
		B8: "39",        // show alert banner
		jn: "40",        // hide alert banner
		WM: "41",        // run script
		QT: "41.5",      // embed notification (postMessage)
		at7: "42",       // PWA install prompt
		kc: "43",        // make pattern / brush / path from selection
		ab8: "43.5",     // switch document tab
		jN: "44",        // close document tab
		a3e: "45",       // duplicate document to tab
		Bs: "46",        // export preset / resource
		bs: "47",        // cache file in local storage
		V7: "48",        // command palette
		du: "49",        // play descriptor action
		azm: "50",       // paste special (text / paths / layers)
		Mc: "51"         // fullscreen or theme
	}
};
