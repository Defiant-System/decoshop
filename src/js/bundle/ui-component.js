
function UIComponent() {
	EventEmitter.call(this);
	this.parent = null;
	this.e = null;
	this.iJ = 0;
	this.Tq = 0;
	this.acn = !1;
}

UIComponent.prototype = new EventEmitter();
UIComponent.prototype.isDescendantOf = function (component) {
	var _local3 = this;
	while (_local3 != null) {
		if (_local3 == component) return !0;
		_local3 = _local3.parent;
	}
	return !1;
};

UIComponent.prototype.getMeasuredWidth = function () {
	var _local4 = this.e;
	return _local4.offsetWidth + _local4.clientLeft;
};

UIComponent.prototype.getMeasuredHeight = function () {
	var _local5 = this.e;
	return _local5.offsetHeight + _local5.clientTop;
};

UIComponent.prototype.update = function (l) {};
UIComponent.prototype.dispatch = function (l) {
	EventEmitter.prototype.dispatch.call(this, l);
	if (l.bubbles && this.parent != null) this.parent.dispatch(l);
};

UIComponent.prototype.refresh = function () {};
UIComponent.prototype.resize = function (l, d) {};
UIComponent.prototype.disable = function () {
	s.addClass(this.e, "disabled");
};

UIComponent.prototype.enable = function () {
	s.removeClass(this.e, "disabled");
};

UIComponent.prototype.setEnabled = function (enabled) {
	if (enabled) this.enable();else
	this.disable();
};

UIComponent.prototype.useBlockLabel = function () {
	this.acn = !0;
};

UIComponent.prototype.updateLabel = function () {
	var _local8 = this.$w,
		_local6 = this.acn,
		_local7 = this.IL;
	if (_local8) {
		var _local9 = languageManager.get(this.$w);
		if (!_local6) _local9 += ":";
		_local7.textContent = _local9;
		if (_local6) {
			_local7.style.display = "block";
			_local7.style.lineHeight = "1.6em";
			_local7.style.marginLeft = "3px";
			s.removeClass(_local7, "flabel");
		}
	}
	if (_local6) {
		this.I6.style.fontSize = "1.15em";
	}
};
