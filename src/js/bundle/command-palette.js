
function CommandPalette() {
	UIComponent.call(this);
	this.e = s.createElement("div", "cmanager");
	window.alert = function (b, V) {
		this.adp(b, V);
		console.log("Alert: " + b);
	}.bind(this);
	window.onblur = function (b) {
		var _local4656 = this;
		_local4656.iO();
	}.bind(this);
	this.iJ = 0;
	this.Tq = 0;
	this.Ry = [];
	this.Wd = {};
	this.uE = s.createElement("div", "alertcont");
	this.e.appendChild(this.uE);
	this.af5 = s.createElement("div", "alertcont");
	this.e.appendChild(this.af5);
	this.LV = s.createElement("div", "alertcont");
	this.afA = 0;
	this.sP = -1;
	this.a2N = null;
	this.$c = null;
	var _local4655 = this.ag8 = s.createElement("div", "alertpanel");
	_local4655.setAttribute("style", "padding:0.7em 1em 0.1em 1em;");
	this.LV.appendChild(_local4655);
	var _local4654 = this.I6 = s.createElement("input");
	_local4654.setAttribute("type", "text");
	s.addKeydownBlocker(_local4654);
	_local4654.setAttribute("style", "background-color:white; color:black; font-size:1.2em; width:100%;  margin:0;");
	_local4654.addEventListener("input", this.as6.bind(this), !1);
	_local4654.addEventListener("keydown", this.acE.bind(this), !1);
	_local4655.appendChild(_local4654);
	var _local4653 = this.asf = s.createElement("div", "contextpanel scrollable");
	_local4653.setAttribute("style", "text-align:left; box-shadow:none; margin:0.5em 0 1em 0;color:#888;");
	_local4653.addEventListener("click", this.a0i.bind(this), !1);
	_local4655.appendChild(_local4653);
	s.addPointerDown(document.body, this.az1.bind(this));
}

CommandPalette.prototype = new UIComponent();
CommandPalette.prototype.EP = function () {
	if (s.isInDocument(this.LV)) this.e.removeChild(this.LV);
};

CommandPalette.prototype.a1U = function (l, d) {
	var _local4658 = this.a2N = [],
		_local4662 = d.ae2;
	for (var _local4657 = 0; _local4657 < TopBar.data.length; _local4657++) {
		var _local4661 = TopBar.data[_local4657],
			_local4660 = [languageManager.get(_local4661.name)],
			_local4663 = [_local4657];
		CommandPalette.anj(_local4661.items, _local4660, _local4663, _local4658, l, d, _local4662 == null ? null : _local4662[_local4657] == null ? 0 : _local4662[_local4657]);
	}
	var _local4659 = KeyboardShortcutsDialog.d;
	for (var _local4657 = 0; _local4657 < _local4659.length; _local4657 += 3) {
		if (d.df && d.df.indexOf(_local4659[_local4657 + 2]) == -1) continue;
		_local4658.push([
		["Tools", languageManager.get(_local4659[_local4657])],
		[-1, _local4659[_local4657 + 2]], _local4659[_local4657 + 1]]
		);
	}
	this.e.appendChild(this.LV);
	var _local4664 = this.I6;
	_local4664.focus();
	_local4664.select();
	this.VP();
};

CommandPalette.prototype.as6 = function (l) {
	this.sP = -1;
	this.VP();
};

CommandPalette.prototype.VP = function () {
	var _local4682 = this.I6.value.toLowerCase().trim().replace(/  +/g, " "),
		_local4677 = this.a2N,
		_local4667 = [],
		_local4676 = [],
		_local4674 = _local4682.split(" ");
	if (_local4682 != "")
	for (var _local4665 = 0; _local4665 < _local4677.length; _local4665++) {
		var _local4671 = _local4677[_local4665][0],
			_local4685 = [],
			_local4668 = 0;
		for (var _local4686 = 0; _local4686 < _local4671.length; _local4686++) _local4685[_local4686] = -1;
		for (var _local4678 = 0; _local4678 < _local4674.length; _local4678++)
		for (var _local4686 = 0; _local4686 < _local4671.length; _local4686++) {
			var _local4670 = _local4671[_local4686].toLowerCase().indexOf(_local4674[_local4678]);
			if (_local4670 != -1) {
				_local4685[_local4686] = [_local4670, _local4670 + _local4674[_local4678].length];
				_local4668++;
				break;
			}
		}
		if (_local4668 == _local4674.length) {
			_local4667.push(_local4677[_local4665]);
			_local4676.push(_local4685);
		}
	}
	var _local4672 = [],
		_local4669 = this.asf;
	s.clearChildren(_local4669);
	for (var _local4665 = 0; _local4665 < _local4667.length; _local4665++) {
		var _local4683 = _local4667[_local4665],
			_local4684 = _local4683[0],
			_local4670 = _local4676[_local4665],
			_local4673 = "enab",
			_local4679 = "";
		if (_local4665 == this.sP) _local4673 += " active";
		var _local4680 = s.createElement("div", _local4673);
		_local4672.push(_local4680);
		_local4669.appendChild(_local4680);
		for (var _local4686 = 0; _local4686 < _local4684.length; _local4686++) {
			var _local4675 = _local4670[_local4686],
				_local4681 = _local4674[_local4686],
				_local4666 = _local4684[_local4686];
			if (_local4675 != -1) _local4666 = _local4666.slice(0, _local4675[0]) + "<span style=\"color:black\">" + _local4666.slice(_local4675[0], _local4675[1]) + "</span>" + _local4666.slice(_local4675[1]);
			_local4679 += _local4666;
			if (_local4686 < _local4684.length - 1) _local4679 += " \uFE65 ";
		}
		if (_local4683[2] && (typeof _local4683[2] != "string" || _local4683[2].length == 1)) _local4679 += " <span style=\"border:1px solid; margin-left:16px; padding:1px 5px; border-radius:5px; background-color:#f4f4f4;\">" + KeyboardHandler.nc(_local4683[2]) + "</span>";
		_local4680.innerHTML = _local4679;
	}
	this.$c = [_local4667, _local4672];
};

CommandPalette.prototype.acE = function (l) {
	var _local4691 = KeyboardHandler._Q,
		_local4687 = l.code;
	if (_local4691(_local4687, KeyboardHandler.mp)) this.EP();
	var _local4690 = _local4691(_local4687, KeyboardHandler.ZZ),
		_local4689 = _local4691(_local4687, KeyboardHandler.Wz),
		_local4688 = _local4691(_local4687, KeyboardHandler.lm);
	if (_local4690 || _local4689) {
		this.sP = Math.max(0, Math.min(this.$c[0].length - 1, this.sP + (_local4690 ? -1 : 1)));
		this.VP();
	}
	if (_local4688 && this.sP != -1) this.aco(this.sP);
};

CommandPalette.anj = function (l, d, G, b, V, Q, t) {
	if (typeof t == "number") {
		if (t == 0) return;
		if (t == 1) t = null;
	}
	for (var _local4692 = 0; _local4692 < l.length; _local4692++) {
		if (t != null && (t[_local4692] == 0 || t[_local4692] == null)) continue;
		var _local4693 = l[_local4692],
			_local4697 = d.slice(0),
			_local4696 = G.slice(0),
			_local4694 = languageManager.get(_local4693.name);
		if (_local4693.p) {
			var _local4695 = _local4693.p(V, Q, _local4692);
			if (_local4695.iH) _local4694 = _local4695.iH;
			if (_local4695.p == !1) continue;
		}
		_local4697.push(_local4694);
		_local4696.push(_local4692);
		if (_local4693.sub) CommandPalette.anj(_local4693.sub, _local4697, _local4696, b, V, Q, t ? t[_local4692] : null);else
		b.push([_local4697, _local4696, _local4693.C0]);
	}
};

CommandPalette.prototype.a0i = function (l) {
	var _local4699 = l.target;
	if (_local4699.tagName.toLowerCase() == "span") _local4699 = _local4699.parentNode;
	var _local4698 = this.$c[1].indexOf(_local4699);
	if (_local4698 != -1) this.aco(_local4698);
};

CommandPalette.prototype.aco = function (l) {
	var _local4704 = this.$c[0][l][1];
	if (_local4704[0] == -1) {
		var _local4701 = new Action(ActionTypes.E.L, !0);
		_local4701.data = {
			a: ActionTypes.$.yb,
			G: _local4704[1]
		};
		this.dispatch(_local4701);
	} else {
		var _local4703 = TopBar.data[_local4704[0]].iD[_local4704[1]];
		for (var _local4700 = 2; _local4700 < _local4704.length; _local4700++) _local4703 = _local4703.sub[_local4704[_local4700]];
		var _local4702 = new Action(_local4703.Y, !0);
		_local4702.G = _local4703.G;
		_local4702.data = _local4703.W;
		this.dispatch(_local4702);
	}
	this.EP();
};

CommandPalette.prototype.resize = function (l, d) {
	this.iJ = l;
	this.Tq = d;
	this.asf.style["max-height"] = d - 120 + "px";
};

CommandPalette.prototype.a5C = function (l) {
	var _local4705 = s.createElement("div", "alertpanel");
	_local4705.textContent = languageManager.get(l);
	this.uE.appendChild(_local4705);
	this.Wd[JSON.stringify(l)] = _local4705;
};

CommandPalette.prototype.acm = function (l) {
	var _local4706 = this.Wd[JSON.stringify(l)];
	this.uE.removeChild(_local4706);
	delete this.Wd[JSON.stringify(l)];
};

CommandPalette.prototype.adp = function (l, d) {
	var _local4708 = this.af5;
	for (var _local4707 = 0; _local4707 < _local4708.children.length; _local4707++)
	if (_local4708.children[_local4707].textContent == l) return;
	var _local4711 = s.createElement("div", "alertpanel tpanel");
	_local4711.textContent = l;
	_local4711.setAttribute("style", "opacity:0.5; transform:scale(0.9)\t");
	_local4708.appendChild(_local4711);
	if (d == null) d = 1500;
	var _local4710 = d,
		_local4709 = Math.max(Date.now() + _local4710, this.afA + _local4710);
	setTimeout(function () {
		_local4711.setAttribute("style", "transform:scale(1); opacity:1;");
	}, 10);
	setTimeout(function () {
		_local4708.setAttribute("style", "margin-top: -3.6em; transform: translateY(3.6em);");
	}, _local4709 - Date.now() - 30);
	setTimeout(function () {
		_local4708.removeChild(_local4708.firstChild);
		_local4708.setAttribute("style", "transition: transform 0.7s;  margin-top: 1em;  transform: translateY(0em);");
	}, _local4709 - Date.now());
	this.afA = _local4709;
};

CommandPalette.prototype.az1 = function (l) {
	var _local4716 = this.Ry;
	for (var _local4712 = _local4716.length - 1; _local4712 >= 0; _local4712--) {
		var _local4713 = _local4716[_local4712],
			_local4715 = l.target;
		while (_local4715 != null) {
			if (_local4715 == _local4713.e) {
				this.iO(_local4713);
				return;
			}
			_local4715 = _local4715.parentNode;
		}
	}
	this.iO();
	var _local4714 = l.target;
	while (_local4714 != this.LV && _local4714 != document.body) _local4714 = _local4714.parentNode;
	if (_local4714 != this.LV) this.EP();
};

CommandPalette.prototype.iO = function (l) {
	var _local4719 = this.Ry;
	for (var _local4717 = 0; _local4717 < _local4719.length; _local4717++) {
		if (l && l.isDescendantOf(_local4719[_local4717])) continue;
		var _local4718 = _local4719[_local4717].e;
		if (!(_local4719[_local4717] instanceof ContextPanel)) s.hideWithTransition(_local4719[_local4717], this.e);else
		this.e.removeChild(_local4718);
		_local4718.style.height = "auto";
		s.removeClass(_local4718, "scrollable");
		_local4719.splice(_local4717, 1);
		_local4717--;
	}
};

CommandPalette.prototype.awF = function (l) {
	this.iO(l.A3);
	var _local4728 = l.A3,
		_local4720 = _local4728.e;
	if (this.Ry.indexOf(_local4728) != -1) return;
	this.Ry.push(_local4728);
	this.e.appendChild(_local4720);
	var _local4727 = this.iJ,
		_local4726 = this.Tq,
		_local4724 = l.x,
		_local4732 = l.y,
		_local4721 = this.e.getBoundingClientRect(),
		_local4734 = _local4728 instanceof ContextPanel,
		_local4729 = -1,
		_local4723 = _local4726 - 2;
	if (_local4734 || l.XC) {
		var _local4725 = _local4728.getMeasuredWidth(),
			_local4722 = _local4728.getMeasuredHeight();
		if (_local4734) _local4725 = Math.min(_local4725, 200);
		var _local4730 = _local4727 - _local4725 - 2,
			_local4731 = _local4726 - _local4722 - 2;
		if (_local4732 < _local4731) _local4729 = 2;else
		if (_local4724 < _local4730) _local4729 = 1;else
		if (0 < _local4732 - _local4722 - 2) _local4729 = 0;else
		_local4729 = 3;
		if (l.a8G) _local4729 = 0;
		if (l.amW) _local4729 = 2;
		if (_local4729 == 2) {
			_local4724 = Math.min(_local4724, _local4730);
		} else if (_local4729 == 1) {
			_local4732 = Math.min(_local4732, _local4731);
		} else if (_local4729 == 0) {
			_local4732 = _local4732 - _local4722 - 2;
			_local4724 = Math.min(_local4724, _local4730);
			_local4723 = l.y;
		} else if (_local4729 == 3) {
			_local4724 = _local4724 - _local4725 - 2;
			_local4732 = Math.min(_local4732, _local4731);
		}
	}
	_local4732 = Math.max(2, _local4732);
	var _local4733 = Math.round(_local4732 - _local4721.y + this.e.offsetTop);
	_local4720.style.position = "absolute";
	_local4720.style["z-index"] = 10;
	if (_local4732 + _local4728.getMeasuredHeight() > _local4723) {
		_local4720.style.height = _local4723 - _local4732 + "px";
		s.addClass(_local4720, "scrollable");
		if (_local4729 == 3) _local4724 -= 10;
	}
	_local4720.style.left = Math.round(_local4724) + "px";
	_local4720.style.top = _local4733 + "px";
	if (!(_local4728 instanceof ContextPanel)) s.showWithTransition(_local4728);
};

CommandPalette.prototype.a9X = function (l) {
	var _local4737 = l.A3,
		_local4735 = this.Ry.indexOf(_local4737);
	if (_local4735 == -1) return;
	this.Ry.splice(_local4735, 1);
	var _local4736 = _local4737.e;
	if (!(_local4737 instanceof ContextPanel)) s.hideWithTransition(_local4737, this.e);else
	this.e.removeChild(_local4737.e);
};

CommandPalette.prototype.Uf = function () {
	var _local4738 = this.Ry;
	return _local4738.length == 0 ? null : _local4738[_local4738.length - 1];
};

CommandPalette.prototype.ac6 = function () {
	this.a9X({
		A3: this.Uf()
	});
};
