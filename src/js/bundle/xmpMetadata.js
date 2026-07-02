
	function xmpMetadata() {}
	xmpMetadata.xmpPropertySchema = {
		"dc:Title": ["", null, "dc:title"],
		"tiff:Artist": ["", 315, "dc:creator"],
		"tiff:ImageDescription": ["", 270, "dc:description"],
		"dc:Keywords": ["", null, "dc:subject"],
		"tiff:Copyright": ["", 33432],
		"tiff:Make": ["", 271],
		"tiff:Model": ["", 272],
		"exif:ExposureTime": [
			[1, 200], 33434
		],
		"exif:FNumber": [
			[16, 1], 33437
		],
		"exif:ExposureProgram": [1, 34850],
		"exif:ISOSpeedRatings": [200, 34855],
		"exif:DateTimeOriginal": ["", 36867],
		"exif:ShutterSpeedValue": [
			[1, 1], 37377
		],
		"exif:ApertureValue": [
			[8, 1], 37378
		],
		"exif:ExposureBiasValue": [
			[1, 1], 37380
		],
		"exif:MaxApertureValue": [
			[1, 1], 37381
		],
		"exif:MeteringMode": [5, 37383],
		"exif:LightSource": [0, 37384],
		"exif:Flash": [0, 37385],
		"exif:FocalLength": [
			[60, 1], 37386
		],
		"exif:PixelXDimension": [1, 40962],
		"exif:PixelYDimension": [1, 40963],
		"exif:FocalPlaneXResolution": [
			[1, 1], 41486
		],
		"exif:FocalPlaneYResolution": [
			[1, 1], 41487
		],
		"exif:FocalPlaneResolutionUnit": [2, 41488],
		"exif:DigitalZoomRatio": [
			[100, 100], 41988
		],
		"exif:FocalLengthIn35mmFilm": [1, 41989],
		"exif:SceneCaptureType": [0, 41990],
		"exif:LensInfo": ["", 42034],
		"exif:Lens": ["", 42036],
		"exif:LensSerialNumber": ["", 42037],
		"exif:SensitivityType": [2, 34864],
		"exif:RecommendedExposureIndex": [100, 34866],
		"exif:GPSVersionID": ["2.3.0.0", 0],
		"exif:GPSLatitude": ["48,35,57.646N", 2],
		"exif:GPSLongitude": ["22,56,42.238E", 4],
		"exif:GPSAltitudeRef": [0, 5],
		"exif:GPSAltitude": [
			[1, 1], 6
		],
		"exif:GPSStatus": ["A", 9],
		"exif:GPSMapDatum": ["", 18],
		"Iptc4xmpCore:IntellectualGenre": [""],
		"Iptc4xmpCore:Location": [""],
		"Iptc4xmpCore:CountryCode": [""],
		"photoshop:Instructions": [""],
		"photoshop:AuthorsPosition": [""],
		"photoshop:City": [""],
		"photoshop:State": [""],
		"photoshop:Country": [""],
		"photoshop:TransmissionReference": [""],
		"photoshop:Headline": [""],
		"photoshop:Credit": [""],
		"photoshop:Source": [""],
		"dc:rights": [""],
		"photoshop:CaptionWriter": [""]
	};
	xmpMetadata.iptcTagToXmpProperty = {
		"4": "Iptc4xmpCore:IntellectualGenre",
		"5": "dc:Title",
		"40": "photoshop:Instructions",
		"80": "tiff:Artist",
		"85": "photoshop:AuthorsPosition",
		"90": "photoshop:City",
		"92": "Iptc4xmpCore:Location",
		"95": "photoshop:State",
		"100": "Iptc4xmpCore:CountryCode",
		"101": "photoshop:Country",
		"103": "photoshop:TransmissionReference",
		"105": "photoshop:Headline",
		"110": "photoshop:Credit",
		"115": "photoshop:Source",
		"116": "dc:rights",
		"120": "tiff:ImageDescription",
		"122": "photoshop:CaptionWriter"
	};
	xmpMetadata.mergeIptcIntoMetadata = function(l, d) {
		if (d == null) d = {};
		var G = xmpMetadata.iptcTagToXmpProperty,
			b = [],
			V = [],
			Q = "";
		for (var A = 0; A < l.length; A++) {
			var t = l[A],
				I = G[t[0] + ""];
			if (I && d[I] == null) d[I] = t[1];
			else if (t[0] == 12) V.push(t[1]);
			else if (t[0] == 25) b.push(t[1]);
			else if (t[0] == 55) Q = t[1];
			else if (t[0] == 60) Q += ";" + t[1]
		}
		if (Q != "" && d["exif:DateTimeOriginal"] == null) d["exif:DateTimeOriginal"] = Q;
		if (V.length != 0 && d["Iptc4xmpCore:SubjectCode"] == null) d["Iptc4xmpCore:SubjectCode"] = V.join(";");
		if (b.length != 0 && d["dc:Keywords"] == null) d["dc:Keywords"] = b.join(";");
		return d
	};
	xmpMetadata.metadataToIptcArray = function(l) {
		var d = xmpMetadata.iptcTagToXmpProperty,
			G = [];
		for (var b in d)
			if (l[d[b]]) G.push([parseInt(b), l[d[b]]]);
		if (l["Iptc4xmpCore:SubjectCode"]) {
			var V = l["Iptc4xmpCore:SubjectCode"].split(";");
			for (var A = 0; A < V.length; A++) G.push([12, V[A].trim()])
		}
		if (l["dc:Keywords"]) {
			var V = l["dc:Keywords"].split(";");
			for (var A = 0; A < V.length; A++) G.push([25, V[A].trim()])
		}
		G.sort(function(Q, t) {
			return Q[0] - t[0]
		});
		return G
	};
	xmpMetadata.parseXmpXmlToMetadata = function(l, d) {
		if (d == null) d = {};
		var G = new DOMParser,
			b = G.parseFromString(l, "image/svg+xml"),
			V = b.getElementsByTagName("rdf:Description")[0];
		if (V == null) return d;
		var Q = xmpMetadata.xmpPropertySchema;
		for (var t in Q) {
			var I = Q[t][2];
			if (I == null) continue;
			var y = V.getElementsByTagName(I)[0];
			if (y == null) continue;
			var e = y.getElementsByTagName("rdf:li"),
				M = [];
			for (var A = 0; A < e.length; A++) M.push(e[A].textContent);
			d[t] = M.join("; ")
		}
		return d
	};
	xmpMetadata.buildXmpXml = function(l) {
		var d = ["<?xpacket begin=\"\uFEFF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>", "<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c145 79.163499, 2018/08/13-16:40:22\">", "<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">", "<rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\">"],
			G = xmpMetadata.xmpPropertySchema;
		for (var b in G) {
			var V = l[b],
				Q = G[b][2],
				t = "Seq",
				I = "";
			if (V == null || Q == null) continue;
			if (Q == "dc:title" || Q == "dc:description") {
				t = "Alt";
				I = " xml:lang=\"x-default\""
			}
			if (Q == "dc:subject") t = "Bag";
			d.push("\t<" + Q + "><rdf:" + t + ">");
			var y = Q == "dc:subject" ? V.split(";").join(",").split(",") : [V];
			for (var A = 0; A < y.length; A++) d.push("\t\t<rdf:li" + I + ">" + y[A].trim() + "</rdf:li>");
			d.push("\t</rdf:" + t + "></" + Q + ">")
		}
		d.push("</rdf:Description>", "</rdf:RDF>", "</x:xmpmeta>", "<?xpacket end=\"w\"?>");
		return d.join("\n")
	};
	xmpMetadata.rationalsToNumbers = function(l) {
		var d = [];
		for (var A = 0; A < l.length; A++) d[A] = l[A][1] == 0 ? 0 : l[A][0] / l[A][1];
		return d
	};
	xmpMetadata.numbersToRationals = function(l) {
		var d = [];
		for (var A = 0; A < l.length; A++) {
			var G = l[A],
				b = 1;
			if (G != Math.round(G)) {
				b = 1e3;
				G = Math.round(G * b)
			}
			d[A] = [G, b]
		}
		return d
	};
	xmpMetadata.exifIfdToMetadata = function(l, d) {
		var G = xmpMetadata.xmpPropertySchema;
		if (d == null) d = {};
		for (var b in G) {
			var V = G[b][1],
				Q = "t" + V;
			if (V != null && l[Q] != null) {
				var t = l[Q];
				if (V == 0) t = t.join(".");
				else if (V == 2 || V == 4) {
					var I = l["t" + (V - 1)];
					if (I == null) I = [V == 2 ? "N" : "E"];
					t = xmpMetadata.rationalsToNumbers(t).join(",") + I[0]
				} else if (V == 42034) t = xmpMetadata.rationalsToNumbers(t).join(" ");
				else if (V == 270 || V == 315) {
					var y = t[0],
						e = new Uint8Array(y.length);
					X.KQ(e, 0, y);
					t = X.Kw(e)
				} else t = t[0];
				d[b] = t
			}
		}
		if (l.exifIFD) xmpMetadata.exifIfdToMetadata(l.exifIFD, d);
		if (l.gpsiIFD) xmpMetadata.exifIfdToMetadata(l.gpsiIFD, d);
		return d
	};
	xmpMetadata.metadataToExifIfd = function(l, d, G) {
		var b = xmpMetadata.xmpPropertySchema,
			Q = 0,
			I = 0;
		if (d == null) d = {};
		var V = {},
			t = {};
		for (var y in b) {
			if (l[y] == null || b[y][1] == null) continue;
			var e = b[y][1],
				M = "t" + e,
				R = d;
			if (y.startsWith("exif:")) {
				R = V;
				Q++;
				if (y.startsWith("exif:GPS")) {
					R = t;
					I++
				}
			}
			var J = l[y];
			if (e == 0) J = new Uint8Array(J.split(".").map(parseFloat));
			else if (e == 2 || e == 4) {
				var n = J.length;
				R["t" + (e - 1)] = [J.slice(J.length - 1)];
				J = xmpMetadata.numbersToRationals(J.split(",").map(parseFloat))
			} else if (e == 42034) J = xmpMetadata.numbersToRationals(J.split(" ").map(parseFloat));
			else if (e == 270 || e == 315) {
				var r = X.zE(J);
				J = [X.Ko(r, 0, r.length)]
			} else J = [J];
			R[M] = J
		}
		if (Q != 0) {
			d.exifIFD = V;
			d.t34665 = [0]
		}
		if (I != 0) {
			d.gpsiIFD = t;
			d.t34853 = [0]
		}
		var T = new Date,
			j = [T.getFullYear(), T.getMonth() + 1, T.getDate(), T.getHours(), T.getMinutes(), T.getSeconds()];
		for (var A = 0; A < 6; A++) j[A] = (j[A] + "").padStart(2, "0");
		d.t305 = ["Photopea Editor (www.photopea.com)"];
		if (G != !0) d.t306 = [j[0] + ":" + j[1] + ":" + j[2] + " " + j[3] + ":" + j[4] + ":" + j[5]];
		return d
	};

	function csvParser() {}
	csvParser.parse = function(l) {
		var d = {
				ai6: ",",
				Vo: "\r\n",
				Co: "\""
			},
			G = [
				[""]
			],
			b, V, Q, t, I;
		for (b = V = Q = t = 0; Q < l.length; Q++) {
			switch (I = l.charAt(Q)) {
				case d.Co:
					if (t && l.charAt(Q + 1) == d.Co) {
						G[b][V] += d.Co;
						++Q
					} else {
						t ^= 1
					}
					break;
				case d.ai6:
					if (!t) {
						G[b][++V] = ""
					} else {
						G[b][V] += I
					}
					break;
				case d.Vo.charAt(0):
					if (!t && (!d.Vo.charAt(1) || d.Vo.charAt(1) && d.Vo.charAt(1) == l.charAt(Q + 1))) {
						G[++b] = [""];
						G[b][V = 0] = "";
						if (d.Vo.charAt(1)) {
							++Q
						}
					} else {
						G[b][V] += I
					}
					break;
				default:
					G[b][V] += I
			}
		}
		if (G[G.length - 1].length < G[0].length) G.pop();
		return G
	};
