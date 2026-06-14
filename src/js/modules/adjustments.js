
const Adjustments = {
	init() {
		// init sub objects
		Object.keys(this)
			.filter(i => !["init"].includes(i))
			.map(i => this[i]({
				type: "init-panel",
				el: window.find(`div[data-box="${i}"]`),
			}));
	},
	dlgBrightnessContrast(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgLevels(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgCurves(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgExposure(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgVibrance(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgHueSaturation(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgColorBalance(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgBlackWhite(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgPhotoFilter(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgChannelMixer(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgColorLookup(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgInvert(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgPosterize(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgThreshold(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgGradientMap(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgSelectiveColor(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
	dlgReplaceColor(event) {
		let APP = decoshop,
			Self = Panels,
			el;
		// console.log(event);
		switch (event.type) {
			case "init-panel": break;
		}
	},
};
