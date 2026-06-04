
let Test = {
	init(APP) {
		// return;

		setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sample:nth(0)`).trigger("click"), 100);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);

		/* 
		 * 
		 */
		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgFilterGallery" }), 600);
		// setTimeout(() => APP.els.content.find(`.active-filters .icon-arrow`).get(0).trigger("click"), 1000);
		// setTimeout(() => APP.els.content.find(`.active-filters .filter`).get(0).trigger("click"), 1400);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Drop Shadow" }), 600);
		// setTimeout(() => APP.els.content.find(`.value[data-options="contours"]`).trigger("click"), 1200);
		// setTimeout(() => APP.els.content.find(`.value[data-options="patterns"]`).trigger("click"), 1200);


		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Contour" }), 600);
		// setTimeout(() => APP.els.content.find(`div[data-name="Contour"] .option .value[data-options="contours"]`).trigger("click"), 1200);

		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgGradientEditor" }), 400);
		
		// setTimeout(() => APP.els.content.find(`.grid-arrow:nth(4)`).trigger("click"), 900);
		// setTimeout(() => APP.els.content.find(`.liq-tool:nth(0)`).trigger("click"), 900);
	}
};


/*
Field		Type			Meaning
-----------------------------------
Lctn.v		long			Position 0–4096 (0 = left, 4096 = right; UI uses × 100 / 4096 as %)
Mdpn.v		long			Midpoint 0–100 (blend between this stop and the previous)
Type.v.Clry	enum			"UsrS" (custom RGB), "FrgC", or "BckC"
Clr.v		RGBC object		Only when Clry === "UsrS"


Example color stop (from defaults):
{
  "t": "Objc",
  "v": {
    "classID": "Clrt",
    "Type": { "t": "enum", "v": { "Clry": "UsrS" } },
    "Lctn": { "t": "long", "v": 0 },
    "Mdpn": { "t": "long", "v": 50 },
    "Clr": {
      "t": "Objc",
      "v": {
        "classID": "RGBC",
        "Rd": { "t": "doub", "v": 0 },
        "Grn": { "t": "doub", "v": 0 },
        "Bl": { "t": "doub", "v": 0 }
      }
    }
  }
}


Opacity stops — KG.Trns.v
Each entry: { t: "Objc", v: { classID: "TrnS", ... } }

Field		Type			Meaning
Lctn.v		long			Position 0–4096
Mdpn.v		long			Midpoint 0–100
Opct.v		UntF #Prc		Opacity 0–100 (val)


Example opacity stop:
{
  "t": "Objc",
  "v": {
    "classID": "TrnS",
    "Opct": { "t": "UntF", "v": { "type": "#Prc", "val": 100 } },
    "Lctn": { "t": "long", "v": 4096 },
    "Mdpn": { "t": "long", "v": 50 }
  }
}
*/

let TMP_gradient = {
    "__name": "Gradient",
    "classID": "Grdn",
    "Nm": {
        "t": "TEXT",
        "v": "$$$/DefaultGradient/YellowVioletOrangeBlue=Yellow, Violet, Orange, Blue"
    },
    "GrdF": {
        "t": "enum",
        "v": {
            "GrdF": "CstS"
        }
    },
    "Intr": {
        "t": "doub",
        "v": 4096
    },
    "Clrs": {
        "t": "VlLs",
        "v": [
            {
                "t": "Objc",
                "v": {
                    "classID": "Clrt",
                    "Clr": {
                        "t": "Objc",
                        "v": {
                            "classID": "RGBC",
                            "Rd": { "t": "doub", "v": 249.00000035762787 },
                            "Grn": { "t": "doub", "v": 229.99611049890518 },
                            "Bl": { "t": "doub", "v": 0 }
                        }
                    },
                    "Type": { "t": "enum", "v": { "Clry": "UsrS" } },
                    "Lctn": { "t": "long", "v": 205 },
                    "Mdpn": { "t": "long", "v": 50 }
                }
            },
            {
                "t": "Objc",
                "v": {
                    "classID": "Clrt",
                    "Clr": {
                        "t": "Objc",
                        "v": {
                            "classID": "RGBC",
                            "Rd": { "t": "doub", "v": 111.00389197468758 },
                            "Grn": { "t": "doub", "v": 21.00389163941145 },
                            "Bl": { "t": "doub", "v": 108.00000116229057 }
                        }
                    },
                    "Type": { "t": "enum", "v": { "Clry": "UsrS" } },
                    "Lctn": { "t": "long", "v": 1434 },
                    "Mdpn": { "t": "long", "v": 50 }
                }
            },
            {
                "t": "Objc",
                "v": {
                    "classID": "Clrt",
                    "Clr": {
                        "t": "Objc",
                        "v": {
                            "classID": "RGBC",
                            "Rd": { "t": "doub", "v": 253.0000001192093 },
                            "Grn": { "t": "doub", "v": 124.00000020861626 },
                            "Bl": { "t": "doub", "v": 0 }
                        }
                    },
                    "Type": { "t": "enum", "v": { "Clry": "UsrS" } },
                    "Lctn": { "t": "long", "v": 2662 },
                    "Mdpn": { "t": "long", "v": 50 }
                }
            },
            {
                "t": "Objc",
                "v": {
                    "classID": "Clrt",
                    "Clr": {
                        "t": "Objc",
                        "v": {
                            "classID": "RGBC",
                            "Rd": { "t": "doub", "v": 0 },
                            "Grn": { "t": "doub", "v": 40.00000141561031 },
                            "Bl": { "t": "doub", "v": 116.00000068545341 }
                        }
                    },
                    "Type": { "t": "enum", "v": { "Clry": "UsrS" } },
                    "Lctn": { "t": "long", "v": 3891 },
                    "Mdpn": { "t": "long", "v": 50 }
                }
            }
        ]
    },
    "Trns": {
        "t": "VlLs",
        "v": [
            {
                "t": "Objc",
                "v": {
                    "classID": "TrnS",
                    "Opct": {
                        "t": "UntF",
                        "v": { "type": "#Prc", "val": 100 }
                    },
                    "Lctn": { "t": "long", "v": 0 },
                    "Mdpn": { "t": "long", "v": 50 }
                }
            },
            {
                "t": "Objc",
                "v": {
                    "classID": "TrnS",
                    "Opct": {
                        "t": "UntF",
                        "v": { "type": "#Prc", "val": 100 }
                    },
                    "Lctn": { "t": "long", "v": 4096 },
                    "Mdpn": { "t": "long", "v": 50 }
                }
            }
        ]
    }
};
