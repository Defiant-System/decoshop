// Slim FilterEffectPanel stubs for decoshop — no Photopea dialog UI.
// Bundle code (f.u2.j1, menu checks, etc.) expects a global FilterEffectPanel[key].
// These stubs expose descriptor ↔ flat-value helpers used by custom dialogs.

function FilterEffectPanel(key) {
	this.JI = key;
	this.cC = null;
}

FilterEffectPanel.prototype.c = function (descriptor) {
	var values = [],
		read = FilterHelper.It["s" + this.JI];
	if (read) read(descriptor, values);
	else this.KJ(descriptor, values);
	if (descriptor && descriptor.RndS) this.cC = descriptor.RndS.v;
	return values;
};

FilterEffectPanel.prototype.b = function (values) {
	var descriptor = FilterHelper.oT(this.JI);
	if (descriptor == null) return null;
	values = values || [];
	var write = FilterHelper.It["g" + this.JI];
	if (write) write(descriptor, values);
	else this.PY(descriptor, values);
	if (descriptor.RndS && this.cC != null) descriptor.RndS.v = this.cC;
	return descriptor;
};

// Optional per-filter overrides (stock panels define these when FilterHelper.It has no entry).
FilterEffectPanel.prototype.KJ = function (descriptor, values) {};
FilterEffectPanel.prototype.PY = function (descriptor, values) {};

// Tool/panel capability flags — stock UI uses these; keep safe defaults.
FilterEffectPanel.prototype.ba = function () {
	return false;
};
FilterEffectPanel.prototype.ZW = function () {
	return false;
};

FilterEffectPanel.define = function (key) {
	if (FilterEffectPanel[key] != null) return;

	function Entry() {
		FilterEffectPanel.call(this, key);
	}
	Entry.prototype = FilterEffectPanel.prototype;
	Entry.prototype.constructor = Entry;
	FilterEffectPanel[key] = Entry;
};

FilterEffectPanel.register = function (keys) {
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (key) FilterEffectPanel.define(key);
	}
};

// (function () {
// 	var keys = {};
// 	var key;
// 	for (key in FilterHelper.Tb) keys[key] = 1;
// 	for (key in FilterHelper.names) keys[key] = 1;
// 	for (key in FilterHelper.It)
// 		if (key.charAt(0) === "s") keys[key.slice(1)] = 1;
// 	FilterEffectPanel.register(Object.keys(keys));
// })();

// Do not bulk-register FilterEffectPanel[key] entries.
// f.uY "start" treats a registered key + qv:null as "open Photopea DialogManager
// (afw_<key>)". Decoshop uses custom HTML dialogs and direct edit/confirm instead.
// FilterEffectPanel.define() remains available if a specific stub is ever needed.
