
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

[
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/ForegroundToBackground=Foreground to Background"
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
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "FrgC"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "BckC"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/ForegroundToTransparent=Foreground to Transparent"
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
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "FrgC"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "FrgC"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/BlackWhite=Black, White"
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
								"classID": "CMYC",
								"Cyn": {
									"t": "doub",
									"v": 75.02
								},
								"Mgnt": {
									"t": "doub",
									"v": 68.01
								},
								"Ylw": {
									"t": "doub",
									"v": 67
								},
								"Blck": {
									"t": "doub",
									"v": 90.19
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "CMYC",
								"Cyn": {
									"t": "doub",
									"v": 0
								},
								"Mgnt": {
									"t": "doub",
									"v": 0
								},
								"Ylw": {
									"t": "doub",
									"v": 0
								},
								"Blck": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/RedGreen=Red, Green"
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
								"Rd": {
									"t": "doub",
									"v": 225.00000178813934
								},
								"Grn": {
									"t": "doub",
									"v": 0
								},
								"Bl": {
									"t": "doub",
									"v": 25.00389140099287
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 0
								},
								"Grn": {
									"t": "doub",
									"v": 96.00000187754631
								},
								"Bl": {
									"t": "doub",
									"v": 27.00389128178358
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/VioletOrange=Violet, Orange"
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
								"Rd": {
									"t": "doub",
									"v": 41.003892347216606
								},
								"Grn": {
									"t": "doub",
									"v": 10.000000353902578
								},
								"Bl": {
									"t": "doub",
									"v": 89.00389328598976
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 255
								},
								"Grn": {
									"t": "doub",
									"v": 124.00000020861626
								},
								"Bl": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/BlueRedYellow=Blue, Red, Yellow"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 243.226318359375
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 69.80392156862744
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 359.9945068359375
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2048
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 59.293212890625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/BlueYellowBlue=Blue, Yellow, Blue"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 243.226318359375
									}
								},
								"Strt": {
									"t": "doub",
									"v": 99.2156862745098
								},
								"Brgh": {
									"t": "doub",
									"v": 72.15686274509804
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 410
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 59.293212890625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 98.82352941176471
								},
								"Brgh": {
									"t": "doub",
									"v": 99.2156862745098
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2048
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 243.226318359375
									}
								},
								"Strt": {
									"t": "doub",
									"v": 98.82352941176471
								},
								"Brgh": {
									"t": "doub",
									"v": 66.66666666666667
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3686
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/OrangeYellowOrange=Orange, Yellow, Orange"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 25.675048828125
									}
								},
								"Strt": {
									"t": "doub",
									"v": 99.2156862745098
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 59.996337890625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2048
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 25.675048828125
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 47
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/VioletGreenOrange=Violet, Green, Orange"
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
								"Rd": {
									"t": "doub",
									"v": 111.00389197468758
								},
								"Grn": {
									"t": "doub",
									"v": 21.00389163941145
								},
								"Bl": {
									"t": "doub",
									"v": 108.00000116229057
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 0
								},
								"Grn": {
									"t": "doub",
									"v": 96.00000187754631
								},
								"Bl": {
									"t": "doub",
									"v": 27.00389128178358
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2048
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 253.0000001192093
								},
								"Grn": {
									"t": "doub",
									"v": 124.00000020861626
								},
								"Bl": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
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
								"Rd": {
									"t": "doub",
									"v": 249.00000035762787
								},
								"Grn": {
									"t": "doub",
									"v": 229.99611049890518
								},
								"Bl": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 205
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 111.00389197468758
								},
								"Grn": {
									"t": "doub",
									"v": 21.00389163941145
								},
								"Bl": {
									"t": "doub",
									"v": 108.00000116229057
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1434
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 253.0000001192093
								},
								"Grn": {
									"t": "doub",
									"v": 124.00000020861626
								},
								"Bl": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2662
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 0
								},
								"Grn": {
									"t": "doub",
									"v": 40.00000141561031
								},
								"Bl": {
									"t": "doub",
									"v": 116.00000068545341
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3891
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/Copper=Copper"
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
								"Rd": {
									"t": "doub",
									"v": 151.00000619888306
								},
								"Grn": {
									"t": "doub",
									"v": 70.00000342726707
								},
								"Bl": {
									"t": "doub",
									"v": 26.000000350177288
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 21.11572265625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 21.568627450980394
								},
								"Brgh": {
									"t": "doub",
									"v": 98.43137254901961
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1229
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 108.00000116229057
								},
								"Grn": {
									"t": "doub",
									"v": 46.000001057982445
								},
								"Bl": {
									"t": "doub",
									"v": 22.000000588595867
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3400
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 239.00000095367432
								},
								"Grn": {
									"t": "doub",
									"v": 219.0000021457672
								},
								"Bl": {
									"t": "doub",
									"v": 205.00000298023224
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 60
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/Chrome=Chrome"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 204.7027587890625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 80
								},
								"Brgh": {
									"t": "doub",
									"v": 80
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 255
								},
								"Grn": {
									"t": "doub",
									"v": 255
								},
								"Bl": {
									"t": "doub",
									"v": 255
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2048
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 44.05517578125
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 56.470588235294116
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2130
						},
						"Mdpn": {
							"t": "long",
							"v": 13
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 44.05517578125
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 85.09803921568627
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2621
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 255
								},
								"Grn": {
									"t": "doub",
									"v": 255
								},
								"Bl": {
									"t": "doub",
									"v": 255
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/Spectrum=Spectrum"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 0
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 255
								},
								"Grn": {
									"t": "doub",
									"v": 0
								},
								"Bl": {
									"t": "doub",
									"v": 255
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 614
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 0
								},
								"Grn": {
									"t": "doub",
									"v": 0
								},
								"Bl": {
									"t": "doub",
									"v": 255
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1352
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 0
								},
								"Grn": {
									"t": "doub",
									"v": 255
								},
								"Bl": {
									"t": "doub",
									"v": 255
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2007
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 0
								},
								"Grn": {
									"t": "doub",
									"v": 255
								},
								"Bl": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2744
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
								"Rd": {
									"t": "doub",
									"v": 255
								},
								"Grn": {
									"t": "doub",
									"v": 255
								},
								"Bl": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3441
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 0
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/TransparentRainbow=Transparent Rainbow"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 359.9945068359375
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 492
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 59.293212890625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1147
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 138.988037109375
									}
								},
								"Strt": {
									"t": "doub",
									"v": 99.6078431372549
								},
								"Brgh": {
									"t": "doub",
									"v": 70.58823529411765
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1843
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 184.9383544921875
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2458
						},
						"Mdpn": {
							"t": "long",
							"v": 60
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 238.5845947265625
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 56.470588235294116
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3072
						},
						"Mdpn": {
							"t": "long",
							"v": 35
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 313.406982421875
									}
								},
								"Strt": {
									"t": "doub",
									"v": 100
								},
								"Brgh": {
									"t": "doub",
									"v": 100
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3604
						},
						"Mdpn": {
							"t": "long",
							"v": 60
						}
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
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 80
							}
						},
						"Lctn": {
							"t": "long",
							"v": 287
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 451
						},
						"Mdpn": {
							"t": "long",
							"v": 70
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3604
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 80
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3809
						},
						"Mdpn": {
							"t": "long",
							"v": 20
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/TransparentStripes=Transparent Stripes"
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
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "FrgC"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "FrgC"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 369
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 410
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 778
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 819
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1188
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1229
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1597
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 1638
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2007
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2048
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2417
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2458
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2826
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 2867
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3236
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3277
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 100
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3645
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 3686
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	},
	{
		"__name": "Gradient",
		"classID": "Grdn",
		"Nm": {
			"t": "TEXT",
			"v": "$$$/DefaultGradient/NeutralDensity=Neutral Density"
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
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 353.3367919921875
									}
								},
								"Strt": {
									"t": "doub",
									"v": 0
								},
								"Brgh": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "Clrt",
						"Clr": {
							"t": "Objc",
							"v": {
								"classID": "HSBC",
								"H": {
									"t": "UntF",
									"v": {
										"type": "#Ang",
										"val": 136.8731689453125
									}
								},
								"Strt": {
									"t": "doub",
									"v": 0
								},
								"Brgh": {
									"t": "doub",
									"v": 0
								}
							}
						},
						"Type": {
							"t": "enum",
							"v": {
								"Clry": "UsrS"
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
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
							"v": {
								"type": "#Prc",
								"val": 60
							}
						},
						"Lctn": {
							"t": "long",
							"v": 0
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				},
				{
					"t": "Objc",
					"v": {
						"classID": "TrnS",
						"Opct": {
							"t": "UntF",
							"v": {
								"type": "#Prc",
								"val": 0
							}
						},
						"Lctn": {
							"t": "long",
							"v": 4096
						},
						"Mdpn": {
							"t": "long",
							"v": 50
						}
					}
				}
			]
		}
	}
]
