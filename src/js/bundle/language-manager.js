/**
 * languageManager (de-obfuscated partial from rest.js)
 * Lines 235-388. Original identifier: languageManager
 */

var languageManager = {};

languageManager.currentLanguageIndex = 0;
languageManager.cachedPhrases = {};

languageManager.ensureTableParsed = function(l) {
	var d = LNG.tables,
		G = d[l];
	if (G == null) G = d[0];
	if (typeof G == "string") {
		G = d[l] = languageManager.parseTableString(G)
	}
	return G
};

languageManager.parseTableString = function(l) {
	var d = [],
		G = 0,
		b = 0,
		V = [],
		Q = l.length;
	while (b != Q) {
		var t = l[b];
		if (t == "[") {
			d.push(V);
			V = [];
			b = G = b + 1
		} else if (t == "]") {
			V.push(G == b ? null : l.substring(G, b));
			var I = V;
			V = d.pop();
			V.push(I);
			b = G = b + 1
		} else if (t == ";") {
			if (l[b - 1] != "]") V.push(G == b ? null : l.substring(G, b));
			b = G = b + 1
		} else b++
	}
	return V
};

// hbi add
// window.i = str => languageManager.get(str);

window.arr = [];
// setTimeout(() => {
//     let str = [];

//     arr.map(entry => {
//         let name = `[${entry.name.join(", ")}]`,
//             row = `${name}\t${entry.value}`;
//         if (!str.includes(row)) str.push(row);
//     });

//     console.log(str.join("\n"))
// }, 500);

languageManager.get = function(l) {
	if (typeof l == "string") return l;
	var d = typeof l[0];
	if (d == "number") {
		for (var A = 1; A < l.length; A++)
			if (typeof l[A] != "number") {
				throw "e"
			}

		let B = languageManager.aeU(l);
		// hbi edit
		window.arr.push({ name: l, value: B });
		return B;
	}
	var G = languageManager.get(l[0]);
	for (var A = 1; A < l.length; A++) {
		var b = languageManager.get(l[A]),
			V = G.indexOf("VAR" + (A - 1));
		G = G.slice(0, V) + b + G.slice(V + 4)
	}
	// hbi edit
	window.arr.push({ name: l, value: G });
	return G
};

languageManager.aeU = function(l) {
	var d = JSON.stringify(l);
	if (languageManager.cachedPhrases[d] != null) return languageManager.cachedPhrases[d];
	var G = languageManager.ensureTableParsed(0),
		b = languageManager.ensureTableParsed(languageManager.currentLanguageIndex),
		V = languageManager.resolvePath(l, b);
	if (V == null) V = languageManager.resolvePath(l, G);
	return V
};

languageManager.resolvePath = function(l, d) {
	for (var A = 0; A < l.length; A++) {
		d = d[l[A]];
		if (d == null) return null;
		else if (typeof d == "string") break
	}
	if (d instanceof Array) d = d[0];
	return d.split("::")[0]
};

languageManager.getSortedLanguages = function() {
	var l = function(G, b) {
			var V = G.code,
				Q = b.code;
			if (V == "en") return -1;
			if (Q == "en") return 1;
			var t = navigator.languages,
				I = t.indexOf(V) != -1,
				y = t.indexOf(Q) != -1;
			if (I && y) return V > Q ? 1 : -1;
			if (I) return -1;
			if (y) return 1;
			return V > Q ? 1 : -1
		},
		d = LNG.langs.slice(0);
	d.sort(l);
	return d
};

languageManager.loadLanguageByIndex = function(l, d) {
	languageManager.currentLanguageIndex = l;
	if (LNG.tables[l]) d();
	else {
		var G = new XMLHttpRequest;
		G.open("GET", "code/lang/" + l + ".js");
		G.onreadystatechange = function() {
			LNG.tables[l] = G.responseText;
			d()
		};
		G.send()
	}
};

languageManager.loadLanguageByCode = function(l, d) {
	for (var G = 0; G < 2; G++) {
		var b = !1;
		for (var A = 0; A < LNG.langs.length; A++)
			if (LNG.langs[A].code == l) {
				languageManager.loadLanguageByIndex(A, d);
				b = !0
			}
		if (b) break;
		l = l.split("-")[0]
	}
};

languageManager.getCurrentLanguageCode = function() {
	return LNG.langs[languageManager.currentLanguageIndex].code
};

languageManager.addCustomPhrases = function(l) {
	for (var A = 0; A < l.length; A += 2)
		if (l[A + 1].indexOf(">") == -1) languageManager.cachedPhrases[JSON.stringify(l[A])] = l[A + 1]
};

languageManager.findLanguageIndexByCode = function(l) {
	var d = -1,
		G = LNG.langs;
	for (var A = 0; A < G.length; A++)
		if (G[A].code == l) d = A;
	return d
};

var LNG = {
	"langs": [
		{
			"name": "English",
			"code": "en",
			"table": 0
		},
		{
			"name": "ÄŒesky",
			"code": "cs",
			"table": 1
		},
		{
			"name": "EspaÃ±ol",
			"code": "es",
			"table": 2
		},
		{
			"name": "Deutsch",
			"code": "de",
			"table": 3
		},
		{
			"name": "FranÃ§ais",
			"code": "fr",
			"table": 4
		},
		{
			"name": "Î•Î»Î»Î·Î½Î¹ÎºÎ¬",
			"code": "el",
			"table": 5
		},
		{
			"name": "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©",
			"code": "ar",
			"table": 6
		},
		{
			"name": "PortuguÃªs",
			"code": "pt",
			"table": 7
		},
		{
			"name": "Ð ÑƒÑÑÐºÐ¸Ð¹",
			"code": "ru",
			"table": 8
		},
		{
			"name": "Ð£ÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ°",
			"code": "uk",
			"table": 9
		},
		{
			"name": "×¢×‘×¨×™×ª",
			"code": "he",
			"table": 10
		},
		{
			"name": "Hrvatski",
			"code": "hr",
			"table": 11
		},
		{
			"name": "Italiano",
			"code": "it",
			"table": 12
		},
		{
			"name": "RomÃ¢nÄƒ",
			"code": "ro",
			"table": 13
		},
		{
			"name": "Nederlands",
			"code": "nl",
			"table": 14
		},
		{
			"name": "Svenska",
			"code": "sv",
			"table": 15
		},
		{
			"name": "Dansk",
			"code": "da",
			"table": 16
		},
		{
			"name": "Suomi",
			"code": "fi",
			"table": 17
		},
		{
			"name": "SlovenÅ¡Äina",
			"code": "sl",
			"table": 18
		},
		{
			"name": "TÃ¼rkÃ§e",
			"code": "tr",
			"table": 19
		},
		{
			"name": "Polski",
			"code": "pl",
			"table": 20
		},
		{
			"name": "Bahasa Indonesia",
			"code": "id",
			"table": 21
		},
		{
			"name": "ç®€ä½“ä¸­æ–‡",
			"code": "zh-CN",
			"table": 22
		},
		{
			"name": "ç¹ä½“ä¸­æ–‡",
			"code": "zh-HK",
			"table": 23
		},
		{
			"name": "à¸ à¸²à¸©à¸²à¹„à¸—à¸¢",
			"code": "th",
			"table": 24
		},
		{
			"name": "æ—¥æœ¬èªž",
			"code": "ja",
			"table": 25
		},
		{
			"name": "í•œêµ­ì–´",
			"code": "ko",
			"table": 26
		},
		{
			"name": "PortuguÃªs do Brasil",
			"code": "pt-BR",
			"table": 27
		},
		{
			"name": "Magyar",
			"code": "hu",
			"table": 28
		},
		{
			"name": "SlovenÄina",
			"code": "sk",
			"table": 29
		},
		{
			"name": "Tiáº¿ng Viá»‡t",
			"code": "vi",
			"table": 30
		},
		{
			"name": "Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ ÐµÐ·Ð¸Ðº",
			"code": "bg",
			"table": 31
		},
		{
			"name": "Ð¡Ñ€Ð¿ÑÐºÐ¸ Ñ˜ÐµÐ·Ð¸Ðº",
			"code": "sr",
			"table": 32
		},
		{
			"name": "Shqip",
			"code": "sq",
			"table": 33
		},
		{
			"name": "à®¤à®®à®¿à®´à¯",
			"code": "ta",
			"table": 34
		},
		{
			"name": "à½–à½¼à½‘à¼‹à½¡à½²à½‚",
			"code": "bo",
			"table": 35
		},
		{
			"name": "CatalÃ ",
			"code": "ca",
			"table": 36
		},
		{
			"name": "Norsk",
			"code": "no",
			"table": 37
		},
		{
			"name": "Eesti",
			"code": "et",
			"table": 38
		},
		{
			"name": "LietuviÅ³",
			"code": "lt",
			"table": 39
		},
		{
			"name": "ÙØ§Ø±Ø³ÛŒ",
			"code": "fa",
			"table": 40
		},
		{
			"name": "Esperanto",
			"code": "eo",
			"table": 41
		},
		{
			"name": "ß’ßžß",
			"code": "nqo",
			"table": 42
		}
	],
	"tables": [
		"[File;Edit;Image;Layer;Folder;Select;Filter;View::noun (Top Menu);Window;Language;Log In;Log Out;Create translation::Click it to get to www.Photopea.com/translate;[Account;Terms of Service;Back;About::\"About a program\" - the orange button at the top;Report a bug;Learn];More;Theme;Use WebGL;[Photopea: advanced image editor::The header at the top of the page;Free online editor supporting PSD, XCF, Sketch, XD and CDR formats.::Will be at the top of the page;Create a new image or open existing files from your computer. Save your work as PSD (File - Save as PSD) or as JPG / PNG / SVG (File - Export as).::Will be at the top of the page;Suggest new features at our <GitHub> or <Facebook>. Our goal is to create <the most advanced and affordable photo editor>.::Parts between < and > will become links.;Sponsor links open in a new window.;This feature is not available.;Install Photopea]];[Open::verb;Publish online;Save::verb;Save as PSD;Print::Press to print on a printer;Open from URL;Open From Computer;Connect With Google Drive;Export as;Export Layers;Script;Open & Place::Open a document and insert it into a current document;[Close;OK::if you keep it empty, \"OK\" will be used;Reset::if you keep it empty, \"Reset\" will be used];Local Storage;File Info;Preset Manager;[Artboard;Artboards;New Artboard;Artboard from Layers];Automate];[Step Forward::In history of changes;Step Backward::In history of changes;Clear::Verb, press to clear the selected area;Fill::Verb, press to fill the selected area;Transform::Transform the image;Rotate;Flip VAR0::VAR0 will be replaced with Horizontally/Vertically;Scale VAR0::VAR0 will be replaced with Horizontally/Vertically;Undo / Redo;Perspective;[Auto-Blend::Auto-Blend layers together;Auto-Align::Auto-Align layers against each other];Fade;Apply Image;Defringe;Variables];Adjustments;[Brightness/Contrast;Levels::Levels adjustment;Curves::Curves adjustment;Exposure;Vibrance;Hue/Saturation;Color Balance;Black & White;Photo Filter;Channel Mixer;Color Lookup;Invert;Posterize;Threshold;Gradient Map;Selective Color;[Auto Tone;Auto Contrast;Auto Color];Replace Color;Match Color];[Cut;Copy;Paste::like \"insert\", not like \"toothpaste\";New;Delete;Enable;Disable;Copy Merged::Copy not from a layer, but from all layers (all merged together);Apply::Apply Mask - \"combine\" it with a layer;Again::Repeat the same aciton one more time;Update::A verb];[Duplicate Layer;New Adjustment Layer;Raster Mask;Vector Mask;Add (Reveal All)::Add a mask;[Add (Hide All)::Add a mask;Reveal Selection;Hide Selection;From Transparency];[Clipping Mask;Quick Mask Mode];[Convert to Smart Object;Smart Object];Rasterize::Convert Text layer/vector layer to pixels;Group Layers::Put selected layers into a new group;Merge Down::Merge a layer with one below it;Merge Up::Merge a layer with one above it;[Merge Layers::Merge selected layers;Flatten Image::Merge all layers in a document into one];New Layer;Enable Raster Mask;Disable Raster Mask;Enable Vector Mask;Disable Vector Mask;Enable Clipping Mask;Disable Clipping Mask;New Folder;Add Raster Mask;Delete Raster Mask;Add Vector Mask;Delete Vector Mask;Link Raster Mask;Unlink Raster Mask;Link Vector Mask;Unlink Vector Mask;Enable Layer Effects;[Disable Layer Effects;Scale Effects];Delete Layer;Layer Opacity Change;Blending Change;Rasterize Layer Style;Layer Order::Name of the step, when reordering layers;[Creating Smart Object;Updating Smart Object;Placing Smart Object;Source (Smart Object);Stack Mode::the mode of combining (stacking) multiple images into one];Name Change;Color Change;Edit Adjustment Layer;Convert to Shape;Enable Filter Mask;Disable Filter Mask;Enable Smart Filters;Disable Smart Filters;Add Filter Mask;Delete Filter Mask;Clear Smart Filters;[[Color Fill;Gradient Fill;Pattern Fill;Content Aware];New Fill Layer;Modify Fill Layer];[Layer Via Copy;Layer Via Cut];Filter Mask;Delete Layer Style;Move Smart Filter;Delete Smart Filter;[Link Layers;Unlink Layers];Arrange::Arrange layers;[Bring to Front;Bring Forward;Send Backward;Send to Back];[This layer is Locked.;Lock Change;Lock::noun - a lock on a layer];Animation];[All::As in Select - All;Deselect;Inverse;Modify;Expand::Expand Selection;Contract;Feather::Feather (blur) a Selection;Move Selection;Color Range;Border::The border of a Selection;Transform Selection;Refine Edge::A tool for improving the edge of a selection;Heal Selection;Magic Cut];[Zoom In;Zoom Out;Guides::Vertical and horizontal lines over the image, to help us be more precise;Rulers;Grid;Snap::When moving objects, they will \"stick\" to other objects, guides, etc.;Snap To;[Document Bounds;All Documents];Pixel Grid;Paths::Elements of vector graphics;Snap to Pixels;[Slices;Slice Options;Clear Slices;Slices from Guides];Show::A verb: to show.;Extras::Visual elements, that are not printed (guides, grid, selections ...);Pattern Preview];[History::History of steps;Layers;Properties;Brush::A brush tool;Character::= a Letter (like a, b, c, ...);Paragraph;Info;Layer Comps::Compositions of layers;Swatches::Gallery of colors;Actions;Histogram::Usually the same in other languages;Navigator;Tool Presets;Glyphs;Notes];[Brush Tool;Clone Tool;Crop Tool;Eraser Tool;Ellipse Select;Eyedropper::A tool to pick color from the image;Gradient Tool;Hand Tool::To move (pan) across the image area;Type Tool;Lasso Select;Magnetic Lasso Select;Move Tool;Magic Wand;Paint Bucket Tool;Polygonal Lasso Select;Rectangle Select;Free Transform;Zoom Tool;Blur Tool;Sharpen Tool;Smudge Tool;Dodge Tool::Make Brighter;Burn Tool::Make Darker;Sponge Tool::Desaturate;Spot Healing Brush Tool;Healing Brush Tool;Patch Tool::Cut from one place and put to another place;Path Select::a tool to select / move paths;Direct Select::a tool to select / move knots of paths;Pen;Free Pen::Draw freely with this pen;Custom Shape;Rectangle;Ellipse;Parametric Shape;Line;Ruler::A ruler tool to measure distances;Quick Selection;Pencil Tool;Perspective Crop;Slice Tool;Slice Select Tool;Color Replacement;Red Eye Tool;Object Selection;Background Eraser;Puppet Warp;Rotate View;Content-Aware Scale;Content-Aware Move Tool;Artboard Tool;Curvature Pen];[Take a picture::Press the button to take a picture;Color Picker;Contour Editor;Canvas Size;Duplicate Into ...;Gradient Editor;Layer Style;New Project;Save for web;Warp;Image Size;[Vectorize Bitmap::Convert raster pixels into vector paths;Reduce Colors::Reduce the number of colors in the image (Edit - Reduce Colors)];[Trim::cut away an empty area around the object;Crop::(verb) Crop the image;Reveal All];Keyboard Shortcuts;Add Guides;[Clear Guides;Guides from Layer;Lock Guides]];[Opacity;Effects;Brightness;[Contrast;Use Legacy];Channel::Color Channel;Exposure;Offset;Gamma correction;Hue;Saturation;Lightness;Colorize;Range;Vibrance;[Size;Interpolation;Nearest Neighbor;Bilinear;Bicubic Sharper];Angle;Roundness;Hardness;Spacing;[Blend Mode;Blend If::Specifies a tonal range for blending];[Sample Size;Sampling Ring];Contour;Style;[Reverse;Relative::When ON, you only write a number, which will be added to the original value;Anchor::To which side the object should be anchored;Dither::Enable dithering];Tolerance;[Contiguous;Anti-alias;Sample All Layers;Resample;Continuous::adapt continuously, while moving;Once::one time];Fill::Noun, the content (filling) of something.;Use global angle;Distance;Spread::Spread the effected area;Noise::add random image noise;Knock out drop shadow::No drop shadow behind the object;Technique;Direction;Depth;Soften;Mode::One of possible modes of the effect;Gradient::from one color to another;Scale::scale the content - 10% or even 200%;Align with layer;Position::Position of the effect;Width;Height;Destination;Type;Foreground;Background;Custom::Color: not foreground or background, but a custom color;Name::Name of something;Create;Format;Keep Aspect Ratio;[Quality;Pages];Duplicate;Move::When you move layers, the Move step will be added to History;Smart Filters;Radius;Amount::Strength of the effect (0 ... 100);Distribution;[Uniform::uniform random distribution;Gaussian];Monochromatic;Cell Size::Mosaic filter creates \"cells\";Pattern;Flow::A brush has the opacity and the flow;Strength;Protect Detail;Fill Type;Texture;Jitter::Add Noise in Outer Glow;Edge::The inner glow is either from the center, or from the Edge;Source;Target;Channels;Mask::A noun, e.g. a vector mask or a raster mask ;Density;Aligned;[Path;Shape;Pixels;Inches;Centimeters;Millimeters;Percent;Current Path];Shapes;Sides;Preferences;[Length;Ratio;Any::Any ratio of a rectangle;Grid Type;Isometric;Grid Gap;Ruler Units];Reduce noise;Colors;Distances;Rate::Liquify filter: Rate of modification;Auto-Select::Move tool option: click the object to select its layer;Find;Define New;[Photo;Screen::computer screen;Mobile::Mobile device;Ads::Advertisement;Print::A noun];[Free::Not Restricted / Not Limited;Fixed Ratio;Fixed Size];Help;[Live Shape::Shape, that can be reconstructed from parameters at any time;Edit Live Shape;Same Radii::all radiuses of a rectangle should be the same];Fuzziness;[Polygon;Star;Spiral;Square;Arrow];[Corner Radius;Inner Radius];[Sharp;Crisp;Strong;Smooth]];[Color;[None::No Color;Red;Orange;Yellow;Green;Blue;Purple;Gray;White;Transparent;Black;Cyan::A color;Magenta::A color;Neutral::Apply to neutral colors];Total;Absolute;Preserve Luminosity;Preserve Transparency;Profile::Color Profile];[Drop Shadow;Inner Shadow;Outer Glow;Inner Glow;Bevel and Emboss;Color Overlay;Gradient Overlay;Pattern Overlay;Satin;Stroke::Thick line around an object;Blending Options;Select Pixels];[Tip Shape;Tip Dynamics;Scatter::dont put brush exactly, but randomly around the target spot;Color Dynamics;[Size Jitter::change the size randomly;Minimal Diameter;Angle Jitter::change the angle randomly;Roundness Jitter::change the roundness randomly;Minimal Roundness];[Position Jitter;Count::The number of brush tips;Count Jitter];[Foreground/Background Jitter;Hue Jitter;Saturation Jitter;Brightness Jitter];[Select clone source by holding Alt (or K) and clicking on the image.;Mark Foreground with White, Background with Black, and the unknown area with Gray.;Layer is not editable.;Text Layer must be rasterized first;Smart Object must be rasterized first;Select multiple layers;Straighten Layer::Will rotate the layer, so that the horizon is horizontal;Open a document first.;Close the current window first.;Current Tool Only::Tool Presets only for the current tool;Delete Cropped Pixels];[Record::To record actions;New Action Set;New Action];[Stylus Pressure controls Opacity;Stylus Pressure controls Size];[Normal::One of Blend Modes (when empty, English version will be used);Dissolve::One of Blend Modes (when empty, English version will be used);Darken::...;Multiply::...;Color Burn::...;Linear Burn::...;Darker Color::...;Lighten;Screen;Color Dodge;Linear Dodge;Lighter Color;Overlay;Soft Light;Hard Light;Vivid Light;Linear Light;Pin Light;Hard Mix;Difference;Exclusion;Subtract;Divide;Hue;Saturation;Color;Luminosity;Pass Through::Blend Mode only for Folders;Add::Mathematically]];[Leading::Text style - vertical distance between lines;Tracking::Text style - horizontal spacing between characters;Baseline shift::Move the bottom line of the text;[Convert to Point Text;Convert to Paragraph Text]];[All Layers;Current Layer;Selection;Current & Below::Current layers and all layers below it];[Replace::The new thing replaces the old one;Unite;Subtract;Intersect;Exclude;Merge];[[Linear;Radial;Angle;Reflected;Diamond;Shape Burst];[Softer;Precise];[Outer Bevel;Inner Bevel;Emboss;Pillow Emboss;Stroke Emboss;Stroke Width::The thickness of the stroke line (contour)];[Smooth::A verb: to smooth something;Chisel Hard;Chisel Soft;Smoothness];[Up;Down];[Outside;Center;Inside;From Center::Draw an object from the center];[Shadows;Midtones;Highlights];[Desaturate;Saturate];[Small;Medium;Large];[Caps;Corners;Dashes]];[Choose the object under the cursor;Transform controls;Pixel to Pixel::Zoom the image to 100% (1 image pixel = 1 screen pixel);Fit The Area;[Align Left Edges;Center Horizontally;Align Right Edges;Align Top Edges;Center Vertically;Align Bottom Edges;Equal Gaps::Equal spacing between objects]];[Place into::Place the new photo into:;Current Project;New Project;Resolution;Added into the current project.;A new project was created.;Access to the camera was denied.];[Orientation::Vertical or horizontal;Bend::Text warping: bend the text to a wave, etc.;Horizontal Distortion;Vertical Distortion;[Horizontal;Vertical;Horizontally;Vertically];[None::No Warp;Arc;Arc Lower;Arc Upper;Arch;Bulge;Shell Lower;Shell Upper;Flag;Wave;Fish;Rise;Fish Eye;Inflate;Squeeze;Twist;Custom];[Font;is not available;Will be rendered using;There is unsaved work in::File name will be added after this;Do you really want to close it?];[Swap Colors;Default: White and Black]];[loaded::File was loaded;added::Font was added;Move Guide;Delete Guide;Add Guide;Loading;Load VAR0::Keep VAR0 in a phrase, it will be replaced with a Noun when used];[Filter Gallery;[[Liquify::A filter;[Smudge::Draw over image to spread colors along your stroke;Reconstruct::Recover to original state;Smoothen::Make the effect more smooth;Twirl::Rotate in a spiral;Shrink::Make smaller;Blow::Make bigger;Push Left::ush colors to the left along the stroke;Freeze;Unfreeze]];[Lens Correction]];Blur::A noun;[Average::Average filter - fills the image with an average color;Blur:: A verb;Blur More;Box Blur;Gaussian Blur;Lens Blur;Motion Blur;Radial Blur;Shape Blur;Smart Blur;Surface Blur];Distort;[Displace::Filter: move parts of image according to the brightness from another image;Pinch::Blow or shring around the center;Polar Coordinates;Ripple::Add tiny waves to the image;Shear;Spherize;Wave;ZigZag;Kaleidoscope];Noise::Filetr => Noise;[Add Noise;Despeckle;Dust & Scratches;Median;Reduce Noise];Pixelate;[Color Halftone;Crystallize;Facet;Fragment;Mezzotint;Mosaic;Pointillize];Render;[Clouds;Difference Clouds;Lens Flare;Flame;Fibers];Sharpen;[Sharpen;Sharpen Edges;Sharpen More;Smart Sharpen;Unsharp Mask];Stylize;[Diffuse;Emboss;Extrude;Find Edges;Oil Paint;Solarize;Trace Contour;Wind];Other;[Custom::A Custom kernel of the convolution;High Pass;Maximum;Minimum;Offset::Filter: shift the image horizontally and vertically;Repeat::Filter: Repeat the image many times;Color to Alpha::this filter makes a specific color transparent;Particles;Normal Map];[Undefined Area;Set to Transparent;Repeat Edge Pixels;Wrap Around;Last Filter;Preview];[Artistic;Brush Strokes;Sketch];[Colored Pencil::Following phrases are Filters in the Filter Gallery. Keep them empty to keep the English version in Photopea.;Cutout;Dry Brush;Film Grain;Fresco;Neon Glow;Paint Daubs;Palette Knife;Plastic Wrap;Poster Edges;Rough Pastels;Smudge Stick;Sponge;Underpainting;Watercolor;Accented Edges;Angled Strokes;Crosshatch;Dark Strokes;Ink Outlines;Spatter;Sprayed Strokes;Sumi-e;Diffuse Glow;Glass;Ocean Ripple;Bas Relief;Chalk & Charcoal;Charcoal;Chrome;ContÃ© Crayon;Graphic Pen;Halftone Pattern;Note Paper;Photocopy;Plaster;Reticulation;Stamp;Torn Edges;Water Paper;Glowing Edges;Craquelure;Grain;Mosaic Tiles;Patchwork;Stained Glass;Texturizer::The last filter in the Filter Gallery.]];[Templates;[Font Filter;Keywords;Randomize];[With Symbols;With Photo];[Thumbnails;List]]"
	]
}
