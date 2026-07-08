
let Test = {
	init(APP) {
		this.debug = !1;
		this.xLayers = xLayersSimple;
		this.xChannels = xChannelsSimple;
		this.xMemoryFiles = xMemoryFiles;

		// return;

		// reset content view "animations"
		// APP.els.content.removeClass("no-anim");

		// setTimeout(() => APP.els.content.find(`.preset:nth(0)`).trigger("click"), 100);
		setTimeout(() => APP.els.content.find(`.sample:nth(4)`).trigger("click"), 100);
		// APP.statusbar.dispatch({ type: "load-sample", names: ["/cdn/img/2d-samples/girl.psd"] });
		// APP.statusbar.dispatch({ type: "load-sample", names: ["/cdn/img/2d-samples/beyond-2.psd"] });
		// APP.statusbar.dispatch({ type: "load-sample", names: ["//localhost:8000/photopea/samples/filter-gallery.png"] });
		// APP.statusbar.dispatch({ type: "load-sample", names: ["//localhost:8000/photopea/samples/logo-xslt.psd"] });
		// APP.statusbar.dispatch({ type: "load-sample", names: ["//localhost:8000/photopea/samples/beyond.psd"] });


		// setTimeout(() => APP.els.content.find(`.tool[data-click="toggle-layers-panel"]`).trigger("click"), 1500);
		// setTimeout(() => APP.els.content.find(`.tool[data-click="toggle-sidebar"]`).trigger("click"), 100);
		// setTimeout(() => APP.els.content.find(`.sidebar-bar .tool[data-target="color"]`).trigger("click"), 700);

		// setTimeout(() => APP.els.content.find(`.sidebar-wrapper div[data-box="layers"] .icon[data-click="remove-layer"]`).trigger("click"), 1000);

		// stops RAF
		// setTimeout(() => { decoshop._stopped = true; }, 2000);
		
		// setTimeout(() => APP.tools.zoom.dispatch({ type: "center-fit" }), 1200);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="zoom"]`).trigger("click"), 1500);
		// setTimeout(() => APP.els.content.find(`.icon[data-click="zoom-in"]`).trigger("click"), 1500);
		// setTimeout(() => APP.els.content.find(`.icon[data-click="zoom-in"]`).trigger("click"), 1700);

		// setTimeout(() => APP.els.content.find(`.layer-row-body[data-id="1"] .icon-eye-on`).trigger("click"), 1700);

		/*
		setTimeout(() => {
			// CanvasTools.Mi.if(APP.file.doc, 0, 0);
			// PP.update();

			// let { x, y } = APP.file.doc.u.R;
			// // x += 250;
			// // y += 0;
			// console.log( x, y );

			// let x = 17-((445-230) >> 1);
			// let y = 72+17-((454-345) >> 1);

			let x = 0;
			let y = 0;
			// APP.file.doc.u.R.T6(x, y);
			// APP.file.doc.u.q8.T6(x, y); 
			CanvasTools.Mi.if(APP.file.doc, x, y);
			APP.file.doc.bV = true;
			PP.update();

		}, 2000);
		*/

		// setTimeout(() => APP.els.content.find(`.tool-hand`).trigger("click"), 500);
		// setTimeout(() => APP.els.content.find(`.option[data-options="pop-font-selector"] span`).get(0).trigger("click"), 600);
		// setTimeout(() => APP.els.content.find(`.font-explorer .icon-burger`).trigger("click"), 800);

		// setTimeout(() => APP.els.content.find(`.tool[data-content="brush"]`).trigger("click"), 500);
		// setTimeout(() => APP.els.content.find(`.box-content-list .row`).get(0).trigger("click"), 500);


		// setTimeout(() => APP.els.content.find(`.extras-bar .tool`).get(2).trigger("click"), 1500);
		// setTimeout(() => APP.els.content.find(`.tool[data-target="memory"]`).trigger("click"), 500);
		// setTimeout(() => APP.els.content.find(`.inline-menu[data-match="//PanelLayers"]`).trigger("click"), 1200);

		// setTimeout(() => APP.els.content.find(`.box-head div[data-content="histogram"]`).trigger("click"), 500);
		// setTimeout(() => APP.els.content.find(`.adjustments-wrapper .tool[data-target="dlgHueSaturation"]`).trigger("click"), 750);
		// setTimeout(() => APP.els.content.find(`.panel-head .opt-group li[data-id="mask"]`).trigger("click"), 800);
		
		// setTimeout(() => APP.els.content.find(`.field[data-click="select-tip-options"] > div`).get(4).trigger("click"), 800);

		/* 
		 * 
		 */
		setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgGaussianBlur" }), 1600);
		// setTimeout(() => APP.els.content.find(`.active-filters .icon-arrow`).get(0).trigger("click"), 1000);
		// setTimeout(() => APP.els.content.find(`.active-filters .filter`).get(0).trigger("click"), 1400);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Drop Shadow" }), 600);
		// setTimeout(() => APP.els.content.find(`.value[data-options="contours"]`).trigger("click"), 1200);
		// setTimeout(() => APP.els.content.find(`.value[data-options="patterns"]`).trigger("click"), 1200);


		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgLayerStyle,Contour" }), 600);
		// setTimeout(() => APP.els.content.find(`div[data-name="Contour"] .option .value[data-options="contours"]`).trigger("click"), 1200);

		// setTimeout(() => APP.dispatch({ type: "open-dialog", arg: "dlgQuickMaskOptions" }), 400);

		// karaqu.shell("fs -up '~/help/toc.md'"); // 'Select/magic-cut.md'
		
		// setTimeout(() => APP.els.content.find(`.grid-arrow:nth(4)`).trigger("click"), 900);
		// setTimeout(() => APP.els.content.find(`.liq-tool:nth(0)`).trigger("click"), 900);
	}
};


let xMemoryFiles = `<Memory>
		<i type="file" name="beyond.psd" ram="960000" gpu="960000" desc="Final Image">
		    <i type="layer" name="casey-lee" ram="269664" gpu="269664" desc="Layer pixels" icon="icon-smart-object"/>
		    <i type="layer" name="This is a TEXT" ram="34680" gpu="34680" desc="Layer pixels">
		        <i type="data" name="Blending Data" ram="8672" gpu="104040"/>
		        <i type="data" icon="icon-layer-fx" name="Drop Shadow" ram="0" gpu="50568"/>
		        <i type="data" icon="icon-layer-fx" name="Gradient Overlay" ram="0" gpu="37248"/>
		    </i>
		    <i type="layer" name="Shape 1" ram="71288" gpu="71288" desc="Layer pixels">
		        <i type="data" icon="icon-vector-layer" name="Vector Mask" ram="17822" gpu="0"/>
		    </i>
		    <i type="layer" name="Layer 2" ram="111296" gpu="111296" desc="Layer pixels">
		        <i type="data" name="Blending Data" ram="27824" gpu="333888"/>
		        <i type="data" icon="icon-layer-fx" name="Drop Shadow" ram="0" gpu="133824"/>
		        <i type="data" icon="icon-layer-fx" name="Bevel and Emboss" ram="0" gpu="233472"/>
		    </i>
		    <i type="layer" name="Color Fill 1" ram="960000" gpu="960000" desc="Layer pixels">
		        <i type="data" icon="icon-layer-mask" name="Raster Mask" ram="240000" gpu="0"/>
		    </i>
		    <i type="layer" name="Pattern Fill 1" ram="250368" gpu="250368" desc="Layer pixels">
		        <i type="data" icon="icon-layer-mask" name="Raster Mask" ram="62592" gpu="0"/>
		    </i>
		    <i type="layer" name="Gradient Fill 1" ram="294000" gpu="294000" desc="Layer pixels">
		        <i type="data" icon="icon-layer-mask" name="Raster Mask" ram="73500" gpu="0"/>
		    </i>
		    <i type="layer" name="Channel Mixer 1" ram="0" gpu="0">
		        <i type="data" icon="icon-layer-mask" name="Raster Mask" ram="240000" gpu="0"/>
		    </i>
		    <i type="layer" name="Background" ram="960000" gpu="960000" desc="Layer pixels"/>
		</i>
		<i type="file" name="File 2">
			<i type="layer" name="Background" ram="524288" gpu="524288"/>
		</i>
	</Memory>`;

let xLayersSimple = `<Layers>
					<i type="adj" target="dlgLevels" name="Hue Saturation" w="{{w}}" h="{{h}}" mask="shape-1"/>
					<i type="image" name="Flower" w="{{w}}" h="{{h}}" mask="shape-1">
						<fx name="Inner Glow" hidden="1"/>
						<fx name="Drop Shadow"/>
					</i>
					<i type="adj" target="dlgColorBalance" name="Hue Saturation" w="{{w}}" h="{{h}}" mask="shape-1"/>
					<i type="adj" target="dlgBrightnessContrast" name="Hue Saturation" w="{{w}}" h="{{h}}" mask="shape-1"/>
					<i type="adj" target="dlgFillColor" color="#f00" name="Color Fill" w="{{w}}" h="{{h}}" mask="shape-1"/>
					<i type="adj" target="dlgFillGradient" gradient="#f00" name="Gradient Fill" w="{{w}}" h="{{h}}" mask="shape-1"/>
					<i type="adj" target="dlgFillPattern" pattern="#f00" name="Pattern Fill" w="{{w}}" h="{{h}}" mask="shape-1"/>
					<i type="image" name="Clipping Mask" w="{{w}}" h="{{h}}" clip="1"/>
					<i type="image" name="Flower" w="{{w}}" h="{{h}}"/>
				</Layers>`;
let xLayersMid = `<Layers>
					<i type="image" name="Background" w="{{w}}" h="{{h}}">
						<fx name="Inner Shadow"/>
						<fx name="Inner Glow" hidden="1"/>
						<fx name="Color Overlay"/>
						<fx name="Gradient Overlay"/>
						<fx name="Drop Shadow"/>
					</i>
					<i type="group" name="Folder" expanded="1">
						<i type="text" name="Some Text 1"/>
						<i type="group" name="Folder 1" expanded="1">
							<i type="group" name="Folder 4" />
							<i type="group" name="Folder 3">
								<i type="text" name="Some Text 2"/>
							</i>
						</i>
						<i type="group" name="Folder 2" />
					</i>
					<i type="image" name="Flower" w="{{w}}" h="{{h}}" mask="shape-1">
						<fx name="Inner Glow" hidden="1"/>
						<fx name="Drop Shadow"/>
					</i>
				</Layers>`;
let xLayersBig = `<Layers>
			<i type="group" name="Landscape" expanded="1">
				<i type="smart" name="Flower1" bg="/cdn/img/2d-samples/robert-collins.jpg" w="{{w}}" h="{{h}}"/>
				<i type="shape" name="Star Shape Very long name here" hidden="1"/>
				<i type="group" name="Sub folder" hidden="1">
					<i type="text" name="Some Text Very long name here"/>
				</i>
				<i type="text" name="Some Text">
					<fx name="Inner Shadow"/>
					<fx name="Inner Glow" hidden="1"/>
					<fx name="Color Overlay"/>
					<fx name="Gradient Overlay"/>
					<fx name="Drop Shadow"/>
				</i>
			</i>
			<i type="group" name="Folder" expanded="1">
				<i type="text" name="Some Text 2"/>
				<i type="group" name="Sub folder 1" expanded="1">
					<i type="group" name="Sub folder 2" expanded="1">
						<i type="group" name="Sub folder 3" expanded="1">
							<i type="group" name="Sub folder 4" expanded="1">
								<i type="text" name="Some Text Very long name here"/>
							</i>
							<i type="text" name="Some Text Very long name here"/>
						</i>
					</i>
					<i type="text" name="Some Text Very long name here"/>
				</i>
			</i>
			<i type="group" name="Folder" expanded="1">
				<i type="text" name="Some Text 1"/>
				<i type="group" name="Folder 1" expanded="1">
					<i type="group" name="Folder 4" />
					<i type="group" name="Folder 3">
						<i type="text" name="Some Text 2"/>
					</i>
				</i>
				<i type="group" name="Folder 2" />
			</i>
		</Layers>`;

let xChannelsSimple = `<Channels>
		<i type="channel" name="RGB"/>
		<i type="channel" name="Red"/>
		<i type="channel" name="Green"/>
		<i type="channel" name="Blue"/>
	</Channels>`;


