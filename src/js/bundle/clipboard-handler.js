
function ClipboardHandler(l) {
	UIComponent.call(this);
	ClipboardHandler.pa = this;
	ClipboardHandler.oy = l;
	this.mN = null;
	this.Bc = s.createElement("input", "");
	this.Bc.setAttribute("type", "file");
	this.Bc.setAttribute("multiple", "");
	this.Bc.addEventListener("change", function (d) {
		this.lI(d.target.files, null, this.xc, null);
		this.xc = null;
	}.bind(this), !1);
	document.body.appendChild(this.Bc);
	this.Bc.setAttribute("style", "display:none");
	this.a6b = [];
	this.HG = !1;
	this.au9 = [];
	this.yg = !1;
	this.aA9 = {};
	this.xc = null;
}

ClipboardHandler.prototype = new UIComponent();
ClipboardHandler.oy = null;
ClipboardHandler.W4 = function (l) {
	try {
		var _local4739 = {};
		_local4739[l.type] = l;
		navigator.clipboard.write([new ClipboardItem(_local4739)]);
	} catch (dk) {
		console.error(dk, languageManager.message);
	}
};

ClipboardHandler.Wy = function (l, d) {
	navigator.clipboard.read().then(function (G) {
		for (var _local4740 = 0; _local4740 < G.length; _local4740++) {
			try {
				var _local4744 = G[_local4740],
					_local4743 = {},
					_local4742 = 0,
					_local4745 = 0;
				for (var _local4741 = 0; _local4741 < _local4744.types.length; _local4741++) {
					var _local4746 = _local4744.types[_local4741];
					_local4742++;
					_local4744.getType(_local4746).then(function (e) {
						var _local4747 = _local4746;
						new Response(e).arrayBuffer().then(function (R) {
							_local4743[this.Ts] = R;
							_local4745++;
							if (_local4745 == _local4742) ClipboardHandler.awR(_local4743, l, d);
						}.bind({
							Ts: this.Ts
						}));
					}.bind({
						Ts: _local4746
					}));
				}
			} catch (dk) {
				console.error(dk, languageManager.message);
			}
		}
	}).catch(function (G) {});
};

ClipboardHandler.ays = function (l) {
	navigator.permissions.query({
		name: "clipboard-read"
	}).then(function (d) {
		l(d.state);
	});
};

ClipboardHandler.awR = function (l, d, G) {
	var _local4754 = ["text/plain", "image/png", "text/html", "text/plain"];
	for (var _local4753 in l) console.log(_local4753, _local4753.startsWith("text") ? X.Kw(new Uint8Array(l[_local4753])).slice(0, 100) + "..." : l[_local4753]);
	for (var _local4751 = 0; _local4751 < _local4754.length; _local4751++) {
		var _local4756 = _local4754[_local4751],
			_local4748 = l[_local4756];
		if (_local4748 == null) continue;
		if (_local4756 == "image/png") {
			ClipboardHandler.oy({
				name: "image.png"
			}, _local4748, d, G);
			return;
		}
		if (_local4756 == "text/plain") {
			var _local4757 = X.Kw(new Uint8Array(_local4748));
			if (_local4751 == 0)
			if (!_local4757.startsWith("<!--") && !_local4757.startsWith("<svg")) continue;
			if (G && _local4757.startsWith("<svg")) continue;
			var _local4755 = new Action(ActionTypes.E.L, !0);
			_local4755.data = {
				a: ActionTypes.$.azm,
				Z: _local4757
			};
			d.dispatch(_local4755);
			return;
		}
		if (_local4756 == "text/html") {
			var _local4757 = X.Kw(new Uint8Array(_local4748)),
				_local4750 = _local4757.indexOf("src=\"");
			if (_local4750 != -1 && _local4757.slice(_local4750 + 5, _local4750 + 9) != "http") {
				var _local4752 = _local4750 + 10;
				while (_local4757[_local4752] != "\"") _local4752++;
				var _local4749 = _local4757.slice(_local4750 + 5, _local4752);
				ClipboardHandler.oy({
					name: "chart.png"
				}, FormatHandler.LE(_local4749).buffer, d, G);
				return;
			}
		}
	}
};

ClipboardHandler.prototype.sV = function (l) {
	if (l == null) l = [23, 5];
	var _local4760 = JSON.stringify(l),
		_local4758 = this.aA9;
	if (_local4758[_local4760] == null) _local4758[_local4760] = 0;
	if (_local4758[_local4760] == 0) {
		var _local4759 = new Action(ActionTypes.E.L, !0);
		_local4759.data = {
			a: ActionTypes.$.B8,
			wh: l
		};
		this.dispatch(_local4759);
	}
	_local4758[_local4760]++;
};

ClipboardHandler.prototype.V1 = function (l) {
	if (l == null) l = [23, 5];
	var _local4763 = JSON.stringify(l),
		_local4761 = this.aA9;
	if (_local4761[_local4763] == null) _local4761[_local4763] = 0;
	_local4761[_local4763]--;
	if (_local4761[_local4763] == 0) {
		var _local4762 = new Action(ActionTypes.E.L, !0);
		_local4762.data = {
			a: ActionTypes.$.jn,
			wh: l
		};
		this.dispatch(_local4762);
	}
};

ClipboardHandler.prototype.anB = function (l, d) {
	this.xc = l;
	var _local4764 = window.showOpenFilePicker;
	if (_local4764 && window.self == window.top) {
		var _local4767 = this;
		_local4764({
			multiple: !0
		}).then(function (t) {
			var _local4768 = [];

			function _local4769(e) {
				_local4768.push(e);
				if (_local4768.length == t.length) {
					_local4767.lI(_local4768, null, _local4767.xc, null, t);
					_local4767.xc = null;
				} else t[_local4768.length].getFile().then(_local4769);
			}
			t[_local4768.length].getFile().then(_local4769);
		});
		return;
	}
	var _local4766 = this.Bc;
	if (d) _local4766.setAttribute("accept", d);else
	_local4766.removeAttribute("accept");
	var _local4765 = document.createEvent("MouseEvents");
	_local4765.initMouseEvent("click", !0, !0, document.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
	_local4766.dispatchEvent(_local4765);
};

ClipboardHandler.prototype.SP = function (l) {
	if (l.url.indexOf("photopea.com#i") != -1 || l.url.indexOf("photopea.com/#i") != -1) {
		this.wq(l.url.split("#i").pop());
		return;
	}
	this.a6b.push(l);
	this.aov();
};

ClipboardHandler.prototype.aov = function () {
	var _local4774 = this.a6b;
	if (_local4774.length == 0 || this.HG) return;
	this.HG = !0;
	var _local4773 = _local4774.shift();
	this.sV();
	if (_local4773.pb == null) _local4773.pb = {};
	var _local4770 = new XMLHttpRequest();
	_local4770.Ul = _local4773;
	var _local4772 = _local4773.url;
	if (_local4773.FZ && !_local4772.startsWith("data:image")) _local4772 = "mirror.php?url=" + encodeURIComponent(_local4772);
	_local4770.open("GET", _local4772);
	if (_local4773.sE)
	for (var _local4771 in _local4773.sE) _local4770.setRequestHeader(_local4771, _local4773.sE[_local4771]);
	_local4770.responseType = "arraybuffer";
	_local4770.onload = this.a18.bind(this);
	_local4770.send();
};

ClipboardHandler.prototype.lI = function (l, d, G, b, V) {
	for (var _local4775 = 0; _local4775 < l.length; _local4775++) {
		this.sV();
		var _local4776 = l[_local4775],
			_local4777 = new FileReader();
		_local4777.Ul = _local4776;
		_local4777.Ul.lh = G;
		_local4777.Ul.cz = b;
		_local4777.afi = d;
		if (V) _local4777.Ul.vG = V[_local4775];
		_local4777.onload = this.a18.bind(this);
		_local4777.onerror = function (I) {
			this.V1();
		}.bind(this);
		this.au9.push([_local4777, _local4776]);
	}
	this.Bc.value = null;
	this.aab();
};

ClipboardHandler.prototype.aab = function () {
	var _local4779 = this.au9;
	if (_local4779.length == 0 || this.yg) return;
	this.yg = !0;
	var _local4778 = _local4779.shift();
	_local4778[0].readAsArrayBuffer(_local4778[1]);
};

ClipboardHandler.prototype.a5Q = function (l, d, G) {
	this.sV("Saving ...");
	this.mN = d;
	setTimeout(G.bind({
		e9: l,
		caller: this
	}), 50);
};

ClipboardHandler.ID = function (l) {
	var _local4787 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		_local4781 = new Uint8Array(l),
		_local4786 = _local4781.length,
		_local4785 = _local4786 % 3,
		_local4784 = _local4786 - _local4785,
		_local4789 = [],
		_local4782 = 0,
		_local4790 = 0,
		_local4788 = 0;
	for (var _local4780 = 0; _local4780 < _local4784; _local4780 += 3) {
		_local4782 = _local4781[_local4780];
		_local4790 = _local4781[_local4780 + 1];
		_local4788 = _local4781[_local4780 + 2];
		_local4789.push(_local4787[_local4782 >> 2] + _local4787[(_local4782 & 3) << 4 | _local4790 >> 4] + _local4787[(_local4790 & 15) << 2 | _local4788 >> 6] + _local4787[_local4788 & 63]);
	}
	if (_local4785 == 1) {
		_local4782 = _local4781[_local4784];
		_local4789.push(_local4787[_local4782 >> 2] + _local4787[(_local4782 & 3) << 4] + "==");
	}
	if (_local4785 == 2) {
		_local4782 = _local4781[_local4784];
		_local4790 = _local4781[_local4784 + 1];
		_local4789.push(_local4787[_local4782 >> 2] + _local4787[(_local4782 & 3) << 4 | _local4790 >> 4] + _local4787[(_local4790 & 15) << 2] + "=");
	}
	var _local4783 = _local4789.join("");
	return _local4783;
};

ClipboardHandler.a0$ = function (l, d) {
	var _local4792 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		_local4798 = new Uint8Array(64),
		_local4793 = 0,
		_local4801 = 0,
		_local4799 = 0,
		_local4796 = 0;
	for (var _local4791 = 0; _local4791 < 64; _local4791++) _local4798[_local4791] = _local4792.charCodeAt(_local4791);
	var _local4797 = new Uint8Array(l),
		_local4795 = d % 3,
		_local4800 = d - _local4795,
		_local4794 = new Uint8Array(Math.floor(d / 3) * 4 + (_local4795 == 0 ? 0 : 4));
	for (var _local4791 = 0; _local4791 < _local4800; _local4791 += 3) {
		_local4793 = _local4797[_local4791];
		_local4801 = _local4797[_local4791 + 1];
		_local4799 = _local4797[_local4791 + 2];
		_local4794[_local4796] = _local4798[_local4793 >>> 2];
		_local4794[_local4796 + 1] = _local4798[(_local4793 & 3) << 4 | _local4801 >>> 4];
		_local4794[_local4796 + 2] = _local4798[(_local4801 & 15) << 2 | _local4799 >>> 6];
		_local4794[_local4796 + 3] = _local4798[_local4799 & 63];
		_local4796 += 4;
	}
	if (_local4795 == 1) {
		_local4793 = _local4797[_local4800];
		_local4794[_local4796] = _local4798[_local4793 >> 2];
		_local4794[_local4796 + 1] = _local4798[(_local4793 & 3) << 4];
		_local4794[_local4796 + 2] = 61;
		_local4794[_local4796 + 3] = 61;
	}
	if (_local4795 == 2) {
		_local4793 = _local4797[_local4800];
		_local4801 = _local4797[_local4800 + 1];
		_local4794[_local4796] = _local4798[_local4793 >> 2];
		_local4794[_local4796 + 1] = _local4798[(_local4793 & 3) << 4 | _local4801 >> 4];
		_local4794[_local4796 + 2] = _local4798[(_local4801 & 15) << 2];
		_local4794[_local4796 + 3] = 61;
	}
	return _local4794;
};

ClipboardHandler.prototype.a18 = function (l) {
	var _local4803,_local4802 = l.target.Ul;
	if (l.target instanceof XMLHttpRequest) _local4803 = l.target.response;else
	_local4803 = l.target.result;
	ClipboardHandler.oy(_local4802, _local4803, this, l.target.afi);
	this.V1();
	if (l.target instanceof XMLHttpRequest) {
		this.HG = !1;
		this.aov();
	} else {
		this.yg = !1;
		this.aab();
	}
};

ClipboardHandler.a7o = function (l, d) {
	var _local4804 = new XMLHttpRequest();
	_local4804.open("POST", "https://api.imgur.com/3/image", !0);
	_local4804.B9 = d;
	_local4804.setRequestHeader("Authorization", "Client-ID 3ad80d2d9969219");
	_local4804.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	_local4804.setRequestHeader("Accept", "application/json");
	_local4804.addEventListener("load", ClipboardHandler.a5T);
	_local4804.send("type=base64&image=" + encodeURIComponent(ClipboardHandler.ID(l)));
	alert("Saving to Imgur ...", 4e3);
};

ClipboardHandler.a5T = function (l) {
	var _local4805 = JSON.parse(l.target.response);
	if (_local4805.success) {
		if (l.target.B9) l.target.B9(_local4805.data.link);else
		window.open(_local4805.data.link, "Imgur");
	}
};

ClipboardHandler.prototype.wq = function (l, d, G) {
	this.sV();
	var _local4806 = new XMLHttpRequest();
	_local4806.responseType = "arraybuffer";
	_local4806.open("GET", "https://f000.backblazeb2.com/file/" + (G ? "pp-resources" : "psdshared") + "/" + l);
	_local4806.onload = this.a0z.bind(this);
	_local4806.send();
	_local4806.a9 = [Date.now(), l, d ? l : null, G];
};

ClipboardHandler.prototype.a0z = function (l) {
	var _local4810 = l.target.a9,
		_local4808 = new Uint8Array(l.target.response);
	console.log(_local4808.length + " B,", Date.now() - _local4810[0] + " ms");
	for (var _local4807 = 0; _local4807 < _local4808.length; _local4807++) _local4808[_local4807] = 255 - _local4808[_local4807];
	_local4808 = pako.inflateRaw(_local4808);
	var _local4809 = JSON.parse(X.Kw(_local4808, 0, 2e3));
	ClipboardHandler.oy({
		name: _local4809.name,
		vs: _local4810[2]
	}, _local4808.slice(2e3).buffer, this);
	this.V1();
	if (!_local4810[3]) ClipboardHandler.OC("act=0&id=" + _local4810[1]);
};

ClipboardHandler.prototype.acQ = function (l, d, G, b) {
	if (!(l instanceof ArrayBuffer)) throw "e";
	l = new Uint8Array(l);
	var _local4818 = new Uint8Array(l.length + 2e3),
		_local4813 = "";
	for (var _local4811 = 0; _local4811 < 2e3; _local4811++) _local4818[_local4811] = 32;
	X.nR(JSON.stringify({
		name: d
	}), _local4818, 0);
	_local4818.set(l, 2e3);
	l = _local4818;
	l = pako.deflateRaw(l);
	for (var _local4811 = 0; _local4811 < l.length; _local4811++) l[_local4811] = 255 - l[_local4811];
	l = l.buffer;
	var _local4815 = l.byteLength,
		_local4822 = SaveForWebDialog.fa(_local4815),
		_local4812 = ~~(609e5 / 2),
		_local4823 = ~~(209e5 / 2);
	if (_local4815 > _local4812) {
		confirm("Your file is " + _local4822 + ". Our limit is " + SaveForWebDialog.fa(_local4812) + ". Delete some layers and try again.");
		return;
	}
	if (_local4815 > _local4823) {
		var _local4819 = confirm("Your file is quite large (" + _local4822 + "). Opening it will take a lot of time. Do you still want to proceed?");
		if (!_local4819) return;
	}
	var _local4814 = sha1(l),
		_local4816 = [];
	for (var _local4811 = 0; _local4811 < 20; _local4811++) {
		var _local4820 = parseInt(_local4814.slice(_local4811 * 2, _local4811 * 2 + 2), 16);
		_local4816.push(_local4820);
		_local4813 += String.fromCharCode(_local4820);
	}
	var _local4821 = btoa(_local4813).replace(/\+/g, "-").replace(/\//g, "_").slice(0, 8);
	if (ClipboardHandler.atR(_local4821, b)) {
		console.log("file already exists");
		if (G) G(_local4821);else
		window.open("https://www.photopea.com#i" + _local4821 + ".psd");
		return;
	}
	this.sV("Publishing ...");
	var _local4817 = new XMLHttpRequest();
	_local4817.a9 = [l, _local4814, _local4821, G, b];
	_local4817.open("GET", "/papi/img/publish.php?rnd=" + Math.random() + "&id=" + _local4821 + "&size=" + _local4815 + "&bname=" + b);
	_local4817.onload = this.anR.bind(this);
	_local4817.send();
};

ClipboardHandler.atR = function (l, d) {
	try {
		var _local4824 = new XMLHttpRequest();
		_local4824.open("HEAD", "https://f000.backblazeb2.com/file/" + d + "/" + l, !1);
		_local4824.send();
		if (_local4824.status == 200) return !0;
	} catch (dk) {
		return !1;
	}
	return !1;
};

ClipboardHandler.prototype.anR = function (l) {
	console.log(l.target.response);
	var _local4827 = JSON.parse(l.target.response),
		_local4825 = l.target.a9,
		_local4826 = new XMLHttpRequest();
	_local4826.open("POST", _local4827.uploadUrl);
	_local4826.setRequestHeader("Authorization", _local4827.authorizationToken);
	_local4826.setRequestHeader("X-Bz-File-Name", _local4825[2]);
	_local4826.setRequestHeader("Content-Type", "b2/x-auto");
	_local4826.setRequestHeader("X-Bz-Content-Sha1", _local4825[1]);
	_local4826.send(new Blob([_local4825[0]]));
	_local4826.onload = this.awo.bind({
		QF: this,
		a9: _local4825
	});
};

ClipboardHandler.prototype.awo = function (l) {
	this.QF.V1("Publishing ...");
	if (this.a9[3]) this.a9[3](this.a9[2]);else
	window.open("https://www.photopea.com#i" + this.a9[2] + ".psd");
	if (this.a9[4] == "psdshared") ClipboardHandler.OC("act=2&id=" + this.a9[2] + "&fileId=" + JSON.parse(l.target.response).fileId);
};

ClipboardHandler.OC = function (l) {
	var _local4828 = new XMLHttpRequest();
	_local4828.open("GET", "/papi/img/update.php?" + l + "&rnd=" + Math.random());
	_local4828.send();
};

ClipboardHandler.save = function (l, d) {
	var _local4829 = new Uint8Array(l),
		_local4832 = document.createElement("a");
	if (typeof _local4832.download == "string") {
		var _local4831 = new Blob([_local4829]),
			_local4830 = window.URL.createObjectURL(_local4831);
		_local4832.href = _local4830;
		_local4832.download = d;
		document.body.appendChild(_local4832);
		_local4832.click();
		document.body.removeChild(_local4832);
	} else {
		var _local4833 = "data:application/octet-stream;base64," + ClipboardHandler.ID(l);
		window.open(_local4833);
	}
};
