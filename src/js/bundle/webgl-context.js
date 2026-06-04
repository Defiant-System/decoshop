/**
 * webglContext (de-obfuscated partial from rest.js)
 * Lines 823-19639. Original identifier: webglContext
 */

	var WebGLContext = {};
	WebGLContext.webglAvailable = false;
	WebGLContext.webglEnabled = false;
	WebGLContext.debugMemory = false;
	WebGLContext.canvas = document.createElement("canvas");
	WebGLContext.gl = null;
	WebGLContext.defaultFramebuffer = null;
	WebGLContext.textureMemoryBytes = 0;

	// Initialize WebGL context and fullscreen quad buffer
	(function initWebGL() {
		var contextOptions = {
				alpha: true,
				antialias: false,
				depth: false,
				premultipliedAlpha: false
			},
			gl;
		if (!gl) gl = WebGLContext.canvas.getContext("webgl", contextOptions);
		if (!gl) gl = WebGLContext.canvas.getContext("experimental-webgl", contextOptions);
		if (gl) {
			WebGLContext.webglAvailable = true;
			WebGLContext.webglEnabled = true;
			WebGLContext.gl = gl;
			WebGLContext.defaultFramebuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLContext.defaultFramebuffer);
			gl.disable(gl.BLEND);
			gl.disable(gl.DEPTH_TEST);
			var quadBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(0);
			gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		}
	}());
	/** Strip unnecessary spaces from shader source string. */
	WebGLContext.minifyShaderCode = function(shaderSource) {
		shaderSource = shaderSource.replace(/\s\s+/g, " ");
		shaderSource = shaderSource.replace(/; /g, ";");
		shaderSource = shaderSource.replace(/} /g, "}");
		shaderSource = shaderSource.replace(/ }/g, "}");
		shaderSource = shaderSource.replace(/{ /g, "{");
		shaderSource = shaderSource.replace(/ {/g, "{");
		shaderSource = shaderSource.replace(/= /g, "=");
		shaderSource = shaderSource.replace(/ =/g, "=");
		shaderSource = shaderSource.replace(/\| /g, "|");
		shaderSource = shaderSource.replace(/ \|/g, "|");
		return shaderSource;
	};

	WebGLContext.checkMaxTextureSize = function(size) {
		var gl = WebGLContext.gl;
		if (size > gl.getParameter(gl.MAX_TEXTURE_SIZE)) {
			WebGLContext.webglAvailable = false;
			alert("Disabling WebGL");
		}
	};

	/** Map rect to normalized coordinates [x, y, width, height] relative to bounds. */
	WebGLContext.rectToNormalized = function(rect, bounds) {
		return new Float32Array([(rect.x - bounds.x) / bounds.m, (rect.y - bounds.y) / bounds.n, rect.m / bounds.m, rect.n / bounds.n]);
	};
	WebGLContext.getCanvas = function() {
		return this.canvas;
	};
	/** Bind texture to framebuffer and set viewport; optional scissor rect. */
	WebGLContext.setFramebufferViewport = function(textureTarget, scissorRect) {
		var gl = WebGLContext.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLContext.defaultFramebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureTarget.glTexture, 0);
		gl.viewport(0, 0, textureTarget.m, textureTarget.n);
		if (scissorRect) {
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(scissorRect.x, scissorRect.y, scissorRect.m, scissorRect.n);
		} else {
			gl.disable(gl.SCISSOR_TEST);
		}
	};

	WebGLContext.setViewport = function(width, height, scissorRect) {
		if (scissorRect) throw "error";
		var gl = WebGLContext.gl;
		gl.disable(gl.SCISSOR_TEST);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0, 0, width, height);
		if (scissorRect) {
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(scissorRect.x, scissorRect.y, Math.round(scissorRect.m), Math.round(scissorRect.n));
		} else {
			gl.disable(gl.SCISSOR_TEST);
		}
	};

	WebGLContext.clear = function() {
		var gl = WebGLContext.gl;
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	};

	/** Clear with color and optional channel mask (ARGB bytes). */
	WebGLContext.clearWithColorMask = function(color, mask) {
		if (mask == null) mask = 0;
		var maskR = (mask >>> 0 & 255) == 0,
			maskG = (mask >>> 8 & 255) == 0,
			maskB = (mask >>> 16 & 255) == 0,
			maskA = (mask >>> 24 & 255) == 0,
			r = (color >>> 0 & 255) * (1 / 255),
			g = (color >>> 8 & 255) * (1 / 255),
			b = (color >>> 16 & 255) * (1 / 255),
			a = (color >>> 24 & 255) * (1 / 255),
			gl = WebGLContext.gl;
		gl.colorMask(maskR, maskG, maskB, maskA);
		gl.clearColor(r, g, b, a);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.colorMask(true, true, true, true);
	};
	WebGLContext.copyTexSubImage = function(l, d, G, b, V) {
		var Q = d.wD(b);
		if (V) Q = Q.wD(V);
		if (Q.W6()) return;
		var t = WebGLContext.gl;
		WebGLContext.setFramebufferViewport(l);
		t.bindTexture(t.TEXTURE_2D, G.glTexture);
		t.copyTexSubImage2D(t.TEXTURE_2D, 0, Q.x - b.x, Q.y - b.y, Q.x - d.x, Q.y - d.y, Q.m, Q.n)
	};
	/** Get or create a cached RGBA texture by cache key and dimensions. */
	WebGLContext.getOrCreateTexture = function(cacheKey, width, height) {
		var tex = WebGLContext.textureCache[cacheKey];
		if (tex == null || tex.m != width || tex.n != height) {
			if (tex) tex.delete();
			tex = new WebGLContext.RgbaTexture(width, height);
		}
		WebGLContext.textureCache[cacheKey] = tex;
		return tex;
	};
	WebGLContext.textureCache = [];

	/** Base shader program: compiles vertex+fragment shaders and manages uniforms. */
	WebGLContext.ShaderProgram = function() {
		this.program = null;
		this.uniformLocations = null;
	};
	WebGLContext.ShaderProgram.currentProgram = null;
	WebGLContext.ShaderProgram.prototype.initUniformLocations = function(l) {
		if (this.uniformLocations) return;
		this.uniformLocations = {};
		var d = WebGLContext.gl,
			G = this.program,
			b = this.uniformLocations;
		for (var A = 0; A < l.length; A++) {
			var V = l[A];
			b[V] = d.getUniformLocation(G, V)
		}
	};
	WebGLContext.ShaderProgram.prototype.draw = function() {};
	WebGLContext.ShaderProgram.prototype.bindTextures = function(l) {
		var d = WebGLContext.gl;
		for (var A = 0; A < l.length; A += 2) {
			d.uniform1i(l[A], A >>> 1);
			d.activeTexture(d["TEXTURE" + (A >>> 1)]);
			d.bindTexture(d.TEXTURE_2D, l[A + 1])
		}
		d.activeTexture(d.TEXTURE0)
	};
	WebGLContext.ShaderProgram.prototype.compileProgram = function(l, d) {
		var G = WebGLContext.gl,
			b = G.createShader(G.FRAGMENT_SHADER);
		G.shaderSource(b, l);
		G.compileShader(b);
		if (!G.getShaderParameter(b, G.COMPILE_STATUS)) {
			console.log(G.getShaderInfoLog(b));
			G.deleteShader(b);
			this.program = null;
			return !1
		}
		var V = G.createShader(G.VERTEX_SHADER);
		G.shaderSource(V, d);
		G.compileShader(V);
		if (!G.getShaderParameter(V, G.COMPILE_STATUS)) {
			console.log(G.getShaderInfoLog(V));
			G.deleteShader(b);
			G.deleteShader(V);
			this.program = null;
			return !1
		}
		var Q = G.createProgram();
		G.attachShader(Q, V);
		G.attachShader(Q, b);
		G.linkProgram(Q);
		if (!G.getProgramParameter(Q, G.LINK_STATUS)) {
			console.log(G.getProgramInfoLog(Q));
			G.deleteProgram(Q);
			this.program = null;
			return !1
		}
		this.program = Q;
		return !0
	};
	WebGLContext.ShaderProgram.prototype.useProgram = function() {
		if (this.program == null) return !1;
		if (WebGLContext.ShaderProgram.currentProgram !== this) {
			WebGLContext.gl.useProgram(this.program);
			WebGLContext.ShaderProgram.currentProgram = this
		}
		return !0
	};
	WebGLContext.AlphaChannel = function(l, d) {
		WebGLContext.channelInstanceCount++;
		WebGLContext.textureMemoryBytes += l * d;
		if (WebGLContext.debugMemory) console.log("GL.Channels instances: " + WebGLContext.channelInstanceCount + ", memory: " + WebGLContext.textureMemoryBytes);
		var G = WebGLContext.gl;
		this.m = l;
		this.n = d;
		this.glTexture = G.createTexture();
		this.auxTexture = null;
		this.initTextureParams(this.glTexture, l, d)
	};
	WebGLContext.AlphaChannel.prototype.initTextureParams = function(l, d, G) {
		var b = WebGLContext.gl;
		b.bindTexture(b.TEXTURE_2D, l);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
		b.texImage2D(b.TEXTURE_2D, 0, b.ALPHA, d, G, 0, b.ALPHA, b.UNSIGNED_BYTE, null)
	};
	WebGLContext.AlphaChannel.prototype.set = function(l, d) {
		var G = WebGLContext.gl;
		G.bindTexture(G.TEXTURE_2D, this.glTexture);
		G.pixelStorei(G.UNPACK_ALIGNMENT, 1);
		var b = this.m * this.n;
		if (d == null || d.O() * 10 > b) G.texImage2D(G.TEXTURE_2D, 0, G.ALPHA, this.m, this.n, 0, G.ALPHA, G.UNSIGNED_BYTE, l);
		else {
			var V = new Rect(0, 0, this.m, this.n),
				Q = PixelUtil.allocBytes(d.O());
			PixelUtil.copyBufferRect(l, V, Q, d);
			G.texSubImage2D(G.TEXTURE_2D, 0, d.x, d.y, d.m, d.n, G.ALPHA, G.UNSIGNED_BYTE, Q)
		}
		G.pixelStorei(G.UNPACK_ALIGNMENT, 4)
	};
	WebGLContext.AlphaChannel.prototype.delete = function() {
		var l = WebGLContext.gl;
		if (this.glTexture) {
			l.deleteTexture(this.glTexture);
			WebGLContext.channelInstanceCount--;
			WebGLContext.textureMemoryBytes -= this.m * this.n
		}
		if (WebGLContext.debugMemory)
			if (WebGLContext.debugMemory) console.log("GL.Channels instances: " + WebGLContext.channelInstanceCount + ", memory: " + WebGLContext.textureMemoryBytes * 4)
	};
	WebGLContext.channelInstanceCount = 0;
	WebGLContext.RgbaTexture = function(l, d, G) {
		if (G == null) G = false;
		WebGLContext.channelInstanceCount++;
		WebGLContext.textureMemoryBytes += l * d * 4;
		if (WebGLContext.debugMemory) console.log("GL.Channels instances: " + WebGLContext.channelInstanceCount + ", memory: " + WebGLContext.textureMemoryBytes);
		var b = WebGLContext.gl;
		this.ahM = G;
		this.m = l;
		this.n = d;
		this.glTexture = b.createTexture();
		this.auxTexture = null;
		this.initTextureParams(this.glTexture, l, d)
	};
	WebGLContext.RgbaTexture.prototype.set = function(l, d) {
		var G = WebGLContext.gl;
		G.disable(G.SCISSOR_TEST);
		G.bindTexture(G.TEXTURE_2D, this.glTexture);
		if (l == null || l instanceof Uint8Array) {
			var b = this.m * this.n;
			if (d == null || d.O() * 10 > b) G.texImage2D(G.TEXTURE_2D, 0, G.RGBA, this.m, this.n, 0, G.RGBA, G.UNSIGNED_BYTE, l);
			else {
				var V = PixelUtil.allocBytes(d.O() * 4);
				PixelUtil.blitRgbaRect(l, new Rect(0, 0, this.m, this.n), V, d);
				G.texSubImage2D(G.TEXTURE_2D, 0, d.x, d.y, d.m, d.n, G.RGBA, G.UNSIGNED_BYTE, V)
			}
		} else G.texImage2D(G.TEXTURE_2D, 0, G.RGBA, G.RGBA, G.UNSIGNED_BYTE, l)
	};
	WebGLContext.RgbaTexture.prototype.get = function(l) {
		var d = WebGLContext.gl;
		WebGLContext.setFramebufferViewport(this);
		d.readPixels(0, 0, this.m, this.n, d.RGBA, d.UNSIGNED_BYTE, l)
	};
	WebGLContext.RgbaTexture.prototype.copyToAuxTexture = function(l) {
		if (l.W6()) return;
		var d = WebGLContext.gl;
		if (this.auxTexture == null) {
			this.auxTexture = d.createTexture();
			this.initTextureParams(this.auxTexture, this.m, this.n);
			WebGLContext.channelInstanceCount++;
			WebGLContext.textureMemoryBytes += this.m * this.n * 4
		}
		d.bindFramebuffer(d.FRAMEBUFFER, WebGLContext.defaultFramebuffer);
		d.bindTexture(d.TEXTURE_2D, this.auxTexture);
		if (l) {
			var G = Math.max(l.x, 0),
				b = Math.max(l.y, 0);
			d.copyTexSubImage2D(d.TEXTURE_2D, 0, G, b, G, b, l.m, l.n)
		} else d.copyTexImage2D(d.TEXTURE_2D, 0, d.RGBA, 0, 0, this.m, this.n, 0)
	};
	WebGLContext.RgbaTexture.prototype.initTextureParams = function(l, d, G) {
		var b = WebGLContext.gl;
		b.bindTexture(b.TEXTURE_2D, l);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, this.ahM ? b.LINEAR : b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
		b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
		b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, d, G, 0, b.RGBA, b.UNSIGNED_BYTE, null)
	};
	WebGLContext.RgbaTexture.prototype.delete = function() {
		var l = WebGLContext.gl;
		if (this.glTexture) {
			l.deleteTexture(this.glTexture);
			WebGLContext.channelInstanceCount--;
			WebGLContext.textureMemoryBytes -= this.m * this.n * 4
		}
		if (this.auxTexture) {
			l.deleteTexture(this.auxTexture);
			WebGLContext.channelInstanceCount--;
			WebGLContext.textureMemoryBytes -= this.m * this.n * 4
		}
		if (WebGLContext.debugMemory)
			if (WebGLContext.debugMemory) console.log("GL.Channels instances: " + WebGLContext.channelInstanceCount + ", memory: " + WebGLContext.textureMemoryBytes)
	};
	WebGLContext.RgbaTexture.prototype.clone = function() {
		var l = WebGLContext.gl,
			d = new WebGLContext.RgbaTexture(this.m, this.n);
		WebGLContext.setFramebufferViewport(this);
		l.bindTexture(l.TEXTURE_2D, d.glTexture);
		l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, 0, 0, this.m, this.n, 0);
		return d
	};
	/**
	 * Four parallel Float32Arrays for per-channel image math (CPU). Distinct from {@link WebGLContext.RgbaTexture} (GPU texture).
	 * Field names follow legacy layout: o, J, k are RGB; aS is alpha in rgba() string builders.
	 */
	WebGLContext.RgbaFloatPlanes = function(length) {
		this.aS = PixelUtil.allocBytes(length);
		this.o = PixelUtil.allocBytes(length);
		this.J = PixelUtil.allocBytes(length);
		this.k = PixelUtil.allocBytes(length)
	};
	WebGLContext.RgbaFloatPlanes.prototype.clone = function() {
		var copy = new WebGLContext.RgbaFloatPlanes(1);
		copy.aS = this.aS.slice(0);
		copy.o = this.o.slice(0);
		copy.J = this.J.slice(0);
		copy.k = this.k.slice(0);
		return copy
	};
	WebGLContext.Li = {
		aey: "  vec3 ocbrn(vec3 a, vec3 b, float f) {  vec3 d = (a*vec3(f)+ONE3-vec3(f));  return mix(ONE3 - min(ONE3,(ONE3-b)/d), ZERO3, vec3(vec3(greaterThan(vec3(0.001),d))) );  }  ",
		acc: "  vec3 ocddg(vec3 a, vec3 b, float f) {  return mix(        min(ONE3,       b/(ONE3 - a*f))    ,   ONE3   , vec3(equal(a*f,ONE3 )) );  }  ",
		Wo: "const vec3 ZERO3 = vec3(0.0,0.0,0.0) ;\t\t\tconst vec3 QUAR3 = vec3(0.25,0.25,0.25) ;\t\t\tconst vec3 HALF3 = vec3(0.5,0.5,0.5) ;\t\t\tconst vec3 ONE3  = vec3(1.0,1.0,1.0) ;",
		Rc: " float hueDiff(float shue, float hue) { \t\t\t\tfloat df = hue-shue, adf=abs(df), df0 = df-1.0, df1 = df+1.0; \t\t\t\tif(abs(df0) < adf)  df = df0; \t\t\t\telse if(abs(df1) < adf)  df = df1; \t\t\t\treturn df; \t\t\t}",
		ro: " float hueCF(float hueS, float hue0) { \t\t\t\tfloat df = hueDiff(hue0, hueS)*6.0; \t\t\t\treturn   max(0.0, min(1.0,  (df<0.0) ? 1.0+df : 1.0-df  ));  } ",
		Uj: "float sat(vec3 c) { return max(c.x,max(c.y,c.z)) - min(c.x,min(c.y,c.z)); }",
		aC: "float lum(vec3 c) { return dot(c, vec3(0.3,0.59,0.11)); } ",
		HM: "vec3  D  (vec3 x) { return mix( sqrt(x), ((16.0*x-12.0)*x+4.0)*x  , vec3(lessThanEqual(x,QUAR3))  ); }",
		af3: "float midSat (vec3 v, float s) { return ((v.y-v.z)*s)/(v.x-v.z); }",
		bv: "vec3 setSat (vec3 c, float s) \t\t\t{\t\t\t\tvec3 o;\t\t\t\tif(c.r==c.g && c.g==c.b) o = ZERO3;\t\t\t\telse if(c.r>c.g)  {\t\t\t\t\tif(c.r>c.b) {\t\t\t\t\t\tif(c.g>c.b)\to = vec3(s, midSat(c.rgb,s), 0.0); \t\t\t\t\t\telse\to = vec3(s, 0.0, midSat(c.rbg,s)); \t\t\t\t\t}\t\t\t\t\telse\t\to = vec3(midSat(c.brg,s), 0.0, s); \t\t\t\t} else  {\t\t\t\t\tif(c.r<c.b) {\t\t\t\t\t\tif(c.g>c.b)\to = vec3(0.0, s, midSat(c.gbr,s)); \t\t\t\t\t\telse\t    o = vec3(0.0, midSat(c.bgr,s), s); \t\t\t\t\t}\t\t\t\t\telse\t\t    o = vec3(midSat(c.grb,s), s, 0.0);\t\t\t\t}\t\t\t\treturn o;\t\t\t}",
		agi: "vec3 clipCol(vec3 c) \t\t\t{ \t\t\t\tvec3 o = c;  float l = lum(c); \t\t\t\tfloat n = min(c.r,min(c.g,c.b)); \t\t\t\tfloat x = max(c.r,max(c.g,c.b)); \t\t\t\tif(n<0.0) o = l + (o-l)*(l/(l-n));\t\t\t\tif(x>1.0) o = l + (o-l)*(1.0-l)/(x-l);\t\t\t\treturn o;\t\t\t}",
		hP: "vec3 setLum (vec3 c, float l) { return clipCol(c+l-lum(c)); } ",
		Qy: "bool in01(vec2 c) { return (0.0<=c.x) && (c.x<=1.0) && (0.0<=c.y) && (c.y<=1.0); }",
		hash: "float hash(vec2 v) { return fract(sin(dot(v ,vec2(12.9898,78.233))) * 43758.5453); }",
		zx: "vec3 rgbToHsl (vec3 rgb) {\t\t\t\tfloat r = rgb.r, g = rgb.g, b = rgb.b; \t\t\t\tfloat mx = max(r, max(g, b)), mn = min(r, min(g, b)); \t\t\t\tfloat h, s, l = (mx + mn) * 0.5;\t\t\t\t\t\t\t\tif(mx == mn) h = s = 0.0; \t\t\t\telse{ \t\t\t\t\tfloat d = mx - mn; \t\t\t\t\ts = l > 0.5 ? d / (2.0 - mx - mn) : d / (mx + mn);  \t\t\t\t\t\t\t\t\t\tif(mx==r) h = (g - b) / d + (g < b ? 6.0 : 0.0);  \t\t\t\t\telse if(mx==g) h = (b - r) / d + 2.0; \t\t\t\t\telse if(mx==b) h = (r - g) / d + 4.0; \t\t\t\t\t\t\t\t\t\th /= 6.0; \t\t\t\t}  \t\t\t\treturn vec3(h,s,l); }",
		xN: "vec3 hslToRgb (float h, float s, float l){\t\t\t\tfloat r, g, b;\t\t\t\t\t\t\t\tif(s == 0.0)  r = g = b = l; \t\t\t\telse{ \t\t\t\t\tfloat q = l < 0.5 ? l * (1.0 + s) : l + s - l * s; \t\t\t\t\tfloat p = 2.0 * l - q; \t\t\t\t\tr = hue2rgb(p, q, h + 1.0/3.0); \t\t\t\t\tg = hue2rgb(p, q, h); \t\t\t\t\tb = hue2rgb(p, q, h - 1.0/3.0); \t\t\t\t} \t\t\t\treturn vec3(r,g,b); } ",
		Vq: "float hue2rgb(float p, float q, float t){ \t\t\t\tif(t < 0.0) t += 1.0;\t\t\t\tif(t > 1.0) t -= 1.0;\t\t\t\tif(t < 1.0/6.0) return p + (q - p) * 6.0 * t; \t\t\t\tif(t < 1.0/2.0) return q; \t\t\t\tif(t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0; \t\t\t\treturn p;\t}",
		_5: "vec3 rgbToHsv(vec3 rgb){\t\t\t\t\tfloat r = rgb.r, g = rgb.g, b = rgb.b; \t\t\t\tfloat mx = max(r, max(g, b)), mn = min(r, min(g, b)); \t\t\t\tfloat h, s, v = mx; \t\t\t\t\t\t\t\tfloat d = mx - mn; \t\t\t\ts = mx == 0.0 ? 0.0 : d / mx; \t\t\t\t\t\t\t\tif(mx == mn) h = 0.0;  \t\t\t\telse if(mx==r) h = (g - b) / d + (g < b ? 6.0 : 0.0);  \t\t\t\telse if(mx==g) h = (b - r) / d + 2.0; \t\t\t\telse if(mx==b) h = (r - g) / d + 4.0; \t\t\t\t\t\t\t\th /= 6.0; \t\t\t\treturn vec3(h,s,v);  }",
		hp: "vec3 hsvToRgb(float h, float s, float v)  { \t\t\t\tfloat r, g, b, f, p, q, t, i; \t\t\t\ti = floor(h * 6.0); \t\t\t\tf = h * 6.0 - i; \t\t\t\tp = v * (1.0 - s); \t\t\t\tq = v * (1.0 - f * s); \t\t\t\tt = v * (1.0 - (1.0 - f) * s); \t\t\t\t\t\t\t\tif     (i==0.0) { r = v, g = t, b = p; }\t\t\t\telse if(i==1.0) { r = q, g = v, b = p; }\t\t\t\telse if(i==2.0) { r = p, g = v, b = t; }\t\t\t\telse if(i==3.0) { r = p, g = q, b = v; }\t\t\t\telse if(i==4.0) { r = t, g = p, b = v; }\t\t\t\telse if(i==5.0) { r = v, g = p, b = q; }\t\t\t\t\t\t\t\treturn vec3(r,g,b); }",
		FG: "\t\tfloat srgbUngamma(float x) {\t\t\treturn (x<0.04045) ? (x / 12.92) : pow( ( x + 0.055 ) / 1.055,  2.4);\t\t}\t\tfloat xyzScale(float x) {\t\t\treturn (x>0.008856) ? pow(x,1.0/3.0) : (903.3*x+16.0)*(1.0/116.0); \t\t}\t\tvec3 rgbToLab(vec3 rgb) {\t\t\tbool ok = true;\t\t\trgb.r = srgbUngamma(rgb.r); \t\t\trgb.g = srgbUngamma(rgb.g); \t\t\trgb.b = srgbUngamma(rgb.b); \t\t\tok = ok && 0.0318<=rgb.r && rgb.r<=0.0319; \t\t\tok = ok && 0.127 <=rgb.g && rgb.g<=0.128 ; \t\t\tok = ok && 0.3047<=rgb.b && rgb.b<=0.305; \t\t\t\t\t\tmat3 srgb2xyz = mat3(0.4360747164307918, 0.222504478679176, 0.013932173981751634,    0.3850649153329662, 0.7168786002139355, 0.09710452396580642,    0.14308038098632878, 0.06061692340677909, 0.7141732835334675); \t\t\t\t\t\tvec3 xyz = srgb2xyz*rgb; \t\t\tok = ok && 0.106<=xyz[0] && xyz[0]<=0.107;  \t\t\t\t\t\txyz=xyz*vec3(100.0/96.72, 100.0/100.0, 100.0/81.427);  \t\t\txyz.x = xyzScale(xyz.x); \t\t\txyz.y = xyzScale(xyz.y); \t\t\txyz.z = xyzScale(xyz.z); \t\t\t\t\t\treturn vec3(116.0*xyz.y-16.0, 500.0*(xyz.x-xyz.y), 200.0*(xyz.y-xyz.z));  \t\t} \t\tfloat labSimilar(vec3 lab, vec3 mnm, vec3 mxm, float lim)  {\t\t\tfloat L=lab.x, a=lab.y, b=lab.z; \t\t\tfloat dl = ((L<mnm.x) ? (mnm.x-L) : ((mxm.x<L) ? (mxm.x-L) : 0.0))*(1.0/100.0); \t\t\tfloat da = ((a<mnm.y) ? (mnm.y-a) : ((mxm.y<a) ? (mxm.y-a) : 0.0))*(1.0/116.0); \t\t\tfloat db = ((b<mnm.z) ? (mnm.z-b) : ((mxm.z<b) ? (mxm.z-b) : 0.0))*(1.0/116.0); \t\t\t/*float dl  = (slab.x-lab.x)*(1.0/100.0), da=(slab.y-lab.y)*(1.0/116.0), db=(slab.z-lab.z)*(1.0/116.0);*/ \t\t\tfloat dst = sqrt(dl*dl+da*da+db*db)*1.35; \t\t\treturn (dst<=lim) ? min(1.0,1.17*(1.0 - (dst/lim))) : 0.0; \t\t}",
		a0y: "  mat3 rgbToYuv = mat3(0.299, -0.147, 0.615,    0.587,  -0.289,  -0.515,   0.114, 0.436, -0.100 );  ",
		aiK: "  mat3 yuvToRgb = mat3(1.0, 1.0, 1.0,   0.0, -0.3946, 2.03199,    1.1398, -0.5805, -0.00048  ); ",
		DC: "\t\tfloat _blendIf(float c, vec4 br) {  return min((c-br.x)*br.y,  (c-br.w)*br.z);  }  \t\tfloat blendIf(vec4 sc, vec4 tc, vec4 br[10]) {  \t\t\tfloat sg = lum(sc.rgb); \t\t\tfloat tg = lum(tc.rgb); \t\t\tfloat ms = _blendIf(sg,br[0]); \t\t\tms = min(ms, _blendIf(sc.r,br[2])); \t\t\tms = min(ms, _blendIf(sc.g,br[4])); \t\t\tms = min(ms, _blendIf(sc.b,br[6])); \t\t\t\t\t\tfloat mt = _blendIf(tg,br[1]); \t\t\tmt = min(mt, _blendIf(tc.r,br[3])); \t\t\tmt = min(mt, _blendIf(tc.g,br[5])); \t\t\tmt = min(mt, _blendIf(tc.b,br[7])); \t\t\tmt=max(mt,1.0-tc.w);\t\t\t\t\t\tfloat mi=min(ms,mt);\t\t\treturn clamp(mi,0.0,1.0);\t\t}",
		z7: "\t\t\tvec4 mapLut(vec4 src, sampler2D lut, float N) {\t\t\t\tfloat Matrix2D = 1.0/N; \t\t\t\tfloat fb = 0.5*Matrix2D + src.b*(1.0-Matrix2D); \t\t\t\tfloat fg = 0.5*Matrix2D + src.g*(1.0-Matrix2D); \t\t\t\tfloat R  = src.r*(N-1.0)*0.999999; \t\t\t\tfloat ir = floor(R)*Matrix2D;  \t\t\t\t\t\t\t\tvec4 c0 = texture2D(lut, vec2(fb, ir   +( fg   )*Matrix2D)); \t\t\t\tvec4 c1 = texture2D(lut, vec2(fb, ir+Matrix2D+( fg   )*Matrix2D)); \t\t\t\tvec4 rs = mix(c0,c1,R-floor(R));  \t\t\t\treturn rs;  \t\t\t}"
	};
	WebGLContext.s = {};
	WebGLContext.s.Bg = {};
	WebGLContext.s.KH = null;
	WebGLContext.s.hk = null;
	WebGLContext.s.wy = null;
	WebGLContext.s.ow = function(l, d, G, b, V, Q, t, I) {
		if (I == null) I = PatternHelper.Ip();
		if ("idiv,lbrn,div ,lddg,vLit,lLit,hMix,diff".split(",").indexOf(l) == -1) {
			t = t * I.fill;
			I.fill = 1;
			I.style = false
		}
		var y = l + (I.bc ? "1" : "");
		if (WebGLContext.s.Bg[y] == null) WebGLContext.s.Bg[y] = new WebGLContext.s.Js(l, I.bc != null);
		var e = WebGLContext.s.Bg[y],
			M = G.wD(V).wD(Q);
		M.offset(-V.x, -V.y);
		if (M.W6()) return;
		var R = WebGLContext.gl;
		WebGLContext.setFramebufferViewport(b, M);
		b.copyToAuxTexture(M);
		e.useProgram();
		e.draw(d.glTexture, b.auxTexture, WebGLContext.rectToNormalized(G, V), t, I.fill, I.style ? 1 : 0, I.x4 ? 1 : 0, I.bc ? new Float32Array(I.bc) : null);
		R.drawArrays(R.TRIANGLES, 0, 6)
	};
	WebGLContext.s.yp = function(l, d, G, b, V, Q, t, I, y, e, M) {
		if (WebGLContext.s.KH == null) WebGLContext.s.KH = new WebGLContext.s.dF(true, true);
		if (WebGLContext.s.hk == null) WebGLContext.s.hk = new WebGLContext.s.dF(true, false);
		if (WebGLContext.s.wy == null) WebGLContext.s.wy = new WebGLContext.s.dF(false, true);
		var R = e ? 1 : 0,
			J = l ? V ? WebGLContext.s.KH : WebGLContext.s.hk : WebGLContext.s.wy,
			n = new Float32Array(M ? [M[0], M[1], M[2], 1] : [1, 1, 1, 1]),
			r = d ? d.wD(b).wD(I) : b.wD(I);
		if (r.W6()) return;
		r.offset(-b.x, -b.y);
		var T = WebGLContext.gl;
		WebGLContext.setFramebufferViewport(G, r);
		G.copyToAuxTexture(r);
		J.useProgram();
		if (l == null) J.draw(null, G.auxTexture, V.glTexture, WebGLContext.rectToNormalized(b, b), WebGLContext.rectToNormalized(Q, b), t / 255, y, R, n);
		else if (V) J.draw(l.glTexture, G.auxTexture, V.glTexture, WebGLContext.rectToNormalized(d, b), WebGLContext.rectToNormalized(Q, b), t / 255, y, R, n);
		else J.draw(l.glTexture, G.auxTexture, null, WebGLContext.rectToNormalized(d, b), null, t / 255, y, R, n);
		T.drawArrays(T.TRIANGLES, 0, 6)
	};
	WebGLContext.s.ay4 = function(l, d, G) {
		if (WebGLContext.s.agO == null) WebGLContext.s.agO = new WebGLContext.s.dj;
		var b = WebGLContext.s.agO,
			V = new Rect(0, 0, l.m, l.n),
			Q = WebGLContext.gl;
		WebGLContext.setFramebufferViewport(d);
		d.copyToAuxTexture(V);
		b.useProgram();
		b.draw(V, l.glTexture, d.auxTexture, G.glTexture);
		Q.drawArrays(Q.TRIANGLES, 0, 6)
	};
	WebGLContext.s.vW = {
		norm: "return a;",
		diss: "return a;",
		dark: "return min(a,b);",
		"mul ": "return a*b;",
		idiv: "  vec3 d = (a*vec3(f)+ONE3-vec3(f));  return mix(mix(ONE3-((ONE3-b)/max(d,vec3(1e-6))), ZERO3, vec3(greaterThanEqual(ONE3-b,d)) ), ONE3   ,   vec3(equal(b,ONE3) ));   ",
		lbrn: "return max(ZERO3, a*f+b-f);",
		dkCl: "return ( lum(a)<lum(b) ? a : b );",
		lite: "return max(a,b);",
		scrn: "return b+a-b*a;",
		"div ": "a*=f;  return mix(    mix(  min(ONE3,b/(1.0-a)), ONE3,  step(1.0-a, b))     , ZERO3, vec3(equal(b,ZERO3)) );",
		lddg: "a*=f;  return min(ONE3,a+b);",
		lgCl: "return ( lum(a)>lum(b) ? a : b );",
		over: "return mix( a+(2.0*b -1.0)-a*(2.0*b-1.0) ,  2.0*b*a , step(-HALF3,-b) );",
		sLit: "return mix( b+(2.0*a -1.0)*(D(b)-b)  , b-(1.0-2.0*a)*b*(1.0-b) , step(-HALF3,-a) );",
		hLit: "return mix( b+(2.0*a -1.0)-b*(2.0*a-1.0) ,  2.0*a*b , step(-HALF3,-a) );",
		vLit: " return mix( ocddg(2.0*a-1.0,b,f)  ,  ocbrn(2.0*a,b,f)  ,  vec3(greaterThanEqual(HALF3,a))); ",
		lLit: "return mix( min(ONE3, (2.0*a-1.0)*f+b) , max(ZERO3, 2.0*a*f+b-f)  , step(-HALF3,-a));",
		pLit: "return mix( max(2.0*a-1.0,b) , min(2.0*a, b) , step(-HALF3,-a)  );",
		hMix: "if(f>0.99) return vec3(greaterThanEqual(a+b,ONE3));   return  min( ONE3, max(ZERO3,  (b+a*f-f)/(1.0-f+1e-6)  ))  ;  ",
		diff: "return abs(a*f-b);",
		smud: "return a+b-2.0*a*b;",
		fsub: "return max(b-a, ZERO3);",
		fdiv: "return min(b/a, ONE3);",
		"hue ": "return  setLum( setSat(a, sat(b)) , lum(b) ); ",
		"sat ": "return  setLum( setSat(b, sat(a)) , lum(b) ); ",
		colr: "return  setLum( a, lum(b) ); ",
		"lum ": "return  setLum( b, lum(a) ); "
	};
	WebGLContext.s.Js = function(l, d) {
		WebGLContext.ShaderProgram.call(this);
		var G = "\t\t\tprecision highp float;\t\t\t" + WebGLContext.Li.Wo + "\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform sampler2D target;\t\t\tuniform float alpha;\t\t\tuniform float fill;\t\t\tuniform float style;\t\t\tuniform float keepBGA;\t\t\t" + (d ? "uniform vec4 blIf[10];" : "") + "\t\t\t\t\t\tvarying vec2 tCoord;\t\t\tvarying vec2 sCoord;\t\t\t\t\t\t\t\t\t" + WebGLContext.Li.Uj + "\t\t\t" + WebGLContext.Li.aC + "\t\t\t" + WebGLContext.Li.HM + "\t\t\t" + WebGLContext.Li.aey + "\t\t\t" + WebGLContext.Li.acc + "\t\t\t" + WebGLContext.Li.af3 + "\t\t\t" + WebGLContext.Li.bv + "\t\t\t" + WebGLContext.Li.agi + "\t\t\t" + WebGLContext.Li.hP + "\t\t\t" + WebGLContext.Li.hash + "\t\t\t" + (d ? WebGLContext.Li.DC : "") + "\t\t\t\t\t\tvec3  BB(vec3  a, vec3  b, float f) { " + WebGLContext.s.vW[l] + " } \t\t\t\t\t\tvoid main(void) {\t\t\t\tvec4 tgt = texture2D(target, tCoord);\t\t\t\tvec4 src = texture2D(source, sCoord);",
			b = "\t\t\tattribute vec2 verPos;\t\t\tuniform vec4 srct;\t\t\tvarying vec2 tCoord;\t\t\tvarying vec2 sCoord;\t\t\tvoid main(void) {\t\t\t\ttCoord = verPos;\t\t\t\tsCoord = (verPos-srct.xy)/srct.zw;\t\t\t\tgl_Position = vec4(vec2(-1.0,-1.0) + 2.0*verPos, 0.0, 1.0);\t\t\t}";
		if (l == "diss") G += "\t\t\t\t\tgl_FragColor = (hash(tCoord) >= (keepBGA + (1.0-keepBGA)*src.w)*alpha ? tgt : vec4(src.xyz, keepBGA*tgt.w + (1.0-keepBGA)));  }";
		else G += "  \t\t\t\t\tfloat as = (keepBGA + (1.0-keepBGA)*src.w) * alpha, at = keepBGA + (1.0-keepBGA)*tgt.w; \t\t\t\t\t" + (d ? "  as*=blendIf(src,tgt,blIf);  " : "") + "\t\t\t\t\tfloat ats = at * (1.0-as), ao = as + ats, iao = (ao==0.0) ? 0.0 : (1.0/ao); \t\t\t\t\tfloat ccf = (style==1.0) ? 1.0 : as; \t\t\t\t\tvec3 ncl = ( (1.0-at)*as*src.xyz + (1.0-ccf)*at*tgt.xyz + ccf*at*BB(src.xyz, tgt.xyz, (1.0+as-ccf)*fill)  ) * iao;\t\t\t\t\tgl_FragColor = vec4(ncl, keepBGA*tgt.w + (1.0-keepBGA)*(as*fill + at*(1.0-as*fill)));\t\t\t\t\t\t\t}";
		this.compileProgram(G, b)
	};
	WebGLContext.s.Js.prototype = new WebGLContext.ShaderProgram;
	WebGLContext.s.Js.prototype.draw = function(l, d, G, b, V, Q, t, I) {
		this.initUniformLocations("srct alpha source target fill style keepBGA blIf".split(" "));
		var y = WebGLContext.gl,
			e = this.uniformLocations;
		y.uniform4fv(e.srct, G);
		y.uniform1f(e.alpha, b);
		y.uniform1f(e.fill, V);
		y.uniform1f(e.style, Q);
		y.uniform1f(e.keepBGA, t);
		if (I) y.uniform4fv(e.blIf, I);
		this.bindTextures([e.source, l, e.target, d])
	};
	WebGLContext.s.dF = function(l, d) {
		WebGLContext.ShaderProgram.call(this);
		this.a0T = l;
		this.m$ = d;
		var G = "\t\t\tprecision mediump float;\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform sampler2D target;\t\t\tuniform sampler2D weight;\t\t\tuniform vec4 cswitch;\t\t\tuniform float wcolor;\t\t\tuniform float awg; /* additional weight */\t\t\tuniform float dissv;\t\t\t\t\t\tvarying vec2 tCoord;\t\t\tvarying vec2 sCoord;\t\t\tvarying vec2 wCoord;\t\t\t\t\t\t" + WebGLContext.Li.Qy + "\t\t\t" + WebGLContext.Li.hash + "\t\t\t\t\t\tvoid main(void) {\t\t\t\tvec4 tgt = texture2D(target, tCoord);\t\t\t\tvec4 src = " + (l ? "texture2D(source, sCoord)" : "vec4(0.0)") + "; \t\t\t\tfloat wg = awg " + (d ? "* (in01(wCoord) ? texture2D(weight, wCoord).w : wcolor)" : "") + ";\t\t\t\t" + (l ? "" : "wg = 1.0-wg;") + "\t\t\t\tfloat hwg = hash(tCoord)>=wg ? 0.0 : 1.0;  wg = dissv*hwg + (1.0-dissv)*wg; \t\t\t\tfloat as = wg*src.w, at = (1.0-wg)*tgt.w, ao = as+at;\t\t\t\t\t\t\t\tvec4 nc = vec4( (as*src.xyz + at*tgt.xyz)/ao, ao );  \t\t\t\tgl_FragColor =  " + (d ? "nc" : "cswitch*nc + (1.0- cswitch)*tgt") + ";    \t\t\t}",
			b = "\t\t\tattribute vec2 verPos;\t\t\tvarying vec2 tCoord;\t\t\tvarying vec2 sCoord;\t\t\tvarying vec2 wCoord;\t\t\t\t\t\tuniform vec4 srct;\t\t\tuniform vec4 wrct;\t\t\tvoid main(void) {\t\t\t\ttCoord = verPos;\t\t\t\tsCoord = (verPos-srct.xy)/srct.zw;\t\t\t\twCoord = (verPos-wrct.xy)/wrct.zw;\t\t\t\tgl_Position = vec4(vec2(-1.0,-1.0) + 2.0*verPos, 0.0, 1.0);\t\t\t}";
		this.compileProgram(G, b)
	};
	WebGLContext.s.dF.prototype = new WebGLContext.ShaderProgram;
	WebGLContext.s.dF.prototype.draw = function(l, d, G, b, V, Q, t, I, y) {
		if (this.m$) this.initUniformLocations("srct wrct wcolor awg dissv source target weight cswitch".split(" "));
		else this.initUniformLocations("srct awg dissv source target cswitch".split(" "));
		var e = WebGLContext.gl,
			M = this.uniformLocations;
		e.uniform4fv(M.srct, b);
		if (this.m$) {
			e.uniform4fv(M.wrct, V);
			e.uniform1f(M.wcolor, Q)
		} else {
			e.uniform4fv(M.cswitch, y)
		}
		e.uniform1f(M.awg, t);
		e.uniform1f(M.dissv, I);
		var R = [M.source, l, M.target, d];
		if (this.m$) R.push(M.weight, G);
		this.bindTextures(R)
	};
	WebGLContext.s.dj = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = "\t\t\tprecision mediump float;\t\t\t\t\t\tuniform sampler2D prev;\t\t\tuniform sampler2D next;\t\t\tuniform sampler2D alpha;\t\t\t\t\t\tvarying vec2 coord;\t\t\t\t\t\t\t\t\tvoid main(void) {\t\t\t\tvec3 or = texture2D(prev , coord).rgb;\t\t\t\tvec3 ir = texture2D(next , coord).rgb; \t\t\t\tfloat al = texture2D(alpha, coord).w; \t\t\t\tgl_FragColor =  vec4(  (ir-(1.0-al)*or)*(1.0/al)   ,1.0 );  \t\t\t}",
			d = "\t\t\tattribute vec2 verPos;\t\t\tvarying vec2 coord;\t\t\t\t\t\tuniform vec4 rct;\t\t\tvoid main(void) {\t\t\t\tcoord = verPos;\t\t\t\tgl_Position = vec4(vec2(-1.0,-1.0) + 2.0*verPos, 0.0, 1.0);\t\t\t}";
		this.compileProgram(l, d)
	};
	WebGLContext.s.dj.prototype = new WebGLContext.ShaderProgram;
	WebGLContext.s.dj.prototype.draw = function(l, d, G, b) {
		this.initUniformLocations(["rct", "prev", "next", "alpha"]);
		var V = WebGLContext.gl,
			Q = this.uniformLocations;
		V.uniform4fv(Q.rct, [0, 0, 1, 1]);
		this.bindTextures([Q.prev, d, Q.next, G, Q.alpha, b])
	};
	WebGLContext.ce = {
		IZ: {},
		NP: "\t\t\tattribute vec2 verPos;\t\t\tvarying vec2 sCoord;\t\t\tvoid main(void) {\t\t\t\tsCoord = verPos;\t\t\t\tgl_Position = vec4(vec2(-1.0,-1.0) + 2.0*verPos, 0.0, 1.0);\t\t\t}"
	};
	WebGLContext.ce.wF = function(l, d) {
		var G = LayerEffectsHelper.PO,
			b = [G.TF, G.YZ, G.fn, G.Tu, G.uI, G.KM, G.Jn, G.ac].indexOf(l.type),
			V = WebGLContext.ce.IZ[l.type];
		if (V == null) V = WebGLContext.ce.IZ[l.type] = new WebGLContext.IZ[b];
		V.useProgram();
		V.draw(d, l);
		WebGLContext.gl.drawArrays(WebGLContext.gl.TRIANGLES, 0, 6)
	};
	WebGLContext.IZ = [];
	WebGLContext.IZ[0] = function() {
		WebGLContext.ShaderProgram.call(this);
		this.BZ = {};
		var l = "\t\t\tprecision mediump float;\t\t\t" + WebGLContext.Li.aC + "\t\t\t" + WebGLContext.Li.Wo + "\t\t\tuniform sampler2D source;\t\t\tuniform sampler2D map;\t\t\tuniform float toGray;\t\t\tuniform float presLum;\t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\tvoid main(void) {\t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\tfloat olum = lum(src.rgb); \t\t\t\tsrc.rgb = toGray * vec3(olum) + (1.0-toGray)*src.rgb; \t\t\t\tfloat r = texture2D(map, vec2(src.r, 0)).r;\t\t\t\tfloat g = texture2D(map, vec2(src.g, 0)).g;\t\t\t\tfloat b = texture2D(map, vec2(src.b, 0)).b;\t\t\t\tvec3 col = vec3(r,g,b); \t\t\t\tif(presLum==1.0) { \t\t\t\t\tfloat nlum = lum(col); \t\t\t\t\tif(olum>nlum) col += (olum-nlum)/(1.0-nlum)*(ONE3-col); \t\t\t\t\telse if(nlum==0.0) col = ZERO3; \t\t\t\t\telse col = (olum/nlum) * col; \t\t\t\t}\t\t\t\tgl_FragColor = vec4(col,src.w);\t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[0].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[0].prototype.draw = function(l, d) {
		var G = {
				o: d.mK,
				J: d._J,
				k: d.xm,
				aS: PixelUtil.allocBytes(d.mK.length)
			},
			b = G.o.length;
		if (this.BZ["m" + b] == null) {
			this.BZ["m" + b] = {
				at5: new WebGLContext.RgbaTexture(b, 1),
				QI: PixelUtil.allocBytes(b * 4)
			}
		}
		var V = this.BZ["m" + b];
		PixelUtil.channelPlanesToRgba(G, V.QI, 0);
		var Q = V.at5;
		Q.set(V.QI);
		this.initUniformLocations(["source", "map", "toGray", "presLum"]);
		var t = WebGLContext.gl,
			I = this.uniformLocations;
		t.uniform1f(I.toGray, d.RC ? 1 : 0);
		t.uniform1f(I.presLum, d.mf ? 1 : 0);
		this.bindTextures([I.source, l, I.map, Q.glTexture])
	};
	WebGLContext.IZ[1] = function() {
		WebGLContext.ShaderProgram.call(this);
		this.au6 = new WebGLContext.RgbaTexture(256, 1);
		this.a7t = PixelUtil.allocBytes(256 * 4);
		var l = "\t\t\t\tprecision mediump float;\t\t\t\t" + WebGLContext.Li.Vq + "\t\t\t\t" + WebGLContext.Li.zx + "\t\t\t\t" + WebGLContext.Li.xN + "\t\t\t\t\t\t\t\tuniform sampler2D source;\t\t\t\tuniform sampler2D map;\t\t\t\tuniform float cfa; \t\t\t\tuniform float cfb; \t\t\t\tuniform int colorize; \t\t\t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\t\t\tvoid main(void) { \t\t\t\t\tvec4 src = texture2D(source, sCoord);\t\t\t\t\tvec3 rgb = src.rgb;\t\t\t\t\tfloat mn=min(rgb.r,min(rgb.g,rgb.b)), mx = max(rgb.r,max(rgb.g,rgb.b));\t\t\t\t\t\t\t\t\t\tvec3 hsl = rgbToHsl(rgb); \t\t\t\t\tfloat h = hsl.r, s = hsl.g, l = hsl.b; \t\t\t\t\t\t\t\t\t\tvec4 mapv = texture2D(map, vec2(h, 0));\t\t\t\t\tfloat nh = mapv.r; \t\t\t\t\tfloat sc = mapv.g*2.0-1.0; \t\t\t\t\tfloat lc = mapv.b*2.0-1.0; \t\t\t\t\t\t\t\t\t\tfloat cf = -lc, tv=mn;\t\t\t\t\tif(0.0<lc) {  cf=lc;  tv=mx;  }\t\t\t\t\t\t\t\t\t\tfloat a0 = cfa + cfb*cf*tv, a1 = cfb*(1.0-cf);\t\t\t\t\trgb = a0 + a1 * rgb;\t\t\t\t\t\t\t\t\t\thsl = rgbToHsl(rgb);  s = hsl.g;  l = hsl.b; \t\t\t\t\tfloat ns = sc; \t\t\t\t\tif(colorize==0) {\t\t\t\t\t\tif(sc>0.0) sc = pow(tan((3.14159265359/2.0)*sc),1.3);\t\t\t\t\t\tns = min(s * (1.0 + sc), 1.0); \t\t\t\t\t} \t\t\t\t\t\t\t\t\t\tgl_FragColor = vec4(hslToRgb(nh,ns,l),src.w); \t\t\t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[1].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[1].prototype.draw = function(l, d) {
		PixelUtil.channelPlanesToRgba({
			o: d.abI,
			J: d.CG,
			k: d.agk,
			aS: PixelUtil.allocBytes(256)
		}, this.a7t);
		this.au6.set(this.a7t);
		this.initUniformLocations(["source", "map", "cfa", "cfb", "colorize"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform1f(b.cfa, d.a1H);
		G.uniform1f(b.cfb, d.Jp);
		G.uniform1i(b.colorize, d.abS);
		this.bindTextures([b.source, l, b.map, this.au6.glTexture])
	};
	WebGLContext.IZ[2] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = "\t\t\tprecision mediump float;\t\t\t" + WebGLContext.Li.Vq + "\t\t\t" + WebGLContext.Li._5 + "\t\t\t" + WebGLContext.Li.hp + "\t\t\t" + WebGLContext.Li.zx + "\t\t\t" + WebGLContext.Li.xN + "\t\t\t" + WebGLContext.Li.a0y + "\t\t\t" + WebGLContext.Li.aiK + "\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform float vib; \t\t\tuniform float sat; \t\t\tuniform vec3  yF; \t\t\tconst float PI = 3.141592653; \t\t\t\t\t\tvarying vec2 sCoord;\t\t\tvec3 vibrate(vec3 rgb) {  \t\t\t\tvec3 yuv = rgbToYuv * rgb; \t\t\t\treturn yuvToRgb * (yuv * yF); \t\t\t} \t\t\t\t\t\tvoid main(void) { \t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\tvec3 rgb = src.rgb; \t\t\t\trgb = pow(rgb,vec3(2.4)); \t\t\t\t\t\t\t\trgb = clamp(vibrate(rgb), 0.0, 1.0); \t\t\t\t\t\t\t\trgb = pow(rgb,vec3(1.0/2.4)); \t\t\t\t\t\t\t\tvec3 hsl = rgbToHsl(rgb);  \t\t\t\tfloat nsat = max(0.0, min(1.0, hsl.y*(1.0+sat)));  \t\t\t\trgb = hslToRgb(hsl.x, nsat, hsl.z);  \t\t\t\t\t\t\t\tgl_FragColor = vec4(rgb,src.w); \t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[2].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[2].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "vib", "sat", "yF"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform1f(b.vib, d.Oo[0]);
		G.uniform1f(b.sat, d.Oo[1]);
		G.uniform3fv(b.yF, new Float32Array([d.Oo[2], d.Oo[3], d.Oo[3]]));
		this.bindTextures([b.source, l])
	};
	WebGLContext.IZ[3] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = "\t\t\tprecision mediump float;\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform mat4  trf; \t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\tvoid main(void) { \t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\tvec4 nsr = vec4(src.rgb,1.0); \t\t\t\tgl_FragColor = vec4((trf*nsr).rgb,src.w); \t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[3].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[3].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "trf"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniformMatrix4fv(b.trf, false, new Float32Array(PixelUtil.mat4.Bo(d.lV)));
		this.bindTextures([b.source, l])
	};
	WebGLContext.IZ[4] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = "\t\t\tprecision mediump float; \t\t\t" + WebGLContext.Li.FG + "\t\t\t" + WebGLContext.Li.Vq + "\t\t\t" + WebGLContext.Li.xN + "\t\t\t" + WebGLContext.Li.zx + "\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform vec3 mnm;\t  \t\t\tuniform vec3 mxm;\t  \t\t\tuniform vec3 shift;   \t\t\tuniform float lim;    \t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\tvoid main(void) { \t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\t\t\t\t\tvec3 lab = rgbToLab(src.rgb);\t\t\t\tfloat scl = labSimilar(lab, mnm,mxm, lim);\t\t\t\t\t\t\t\tvec3 hsv = rgbToHsl(src.rgb); \t\t\t\tfloat nh = 2.0 + hsv[0]+shift[0]; \t\t\t\thsv[0] = fract(nh); \t\t\t\thsv[1] = max(0.0, min(1.0, hsv[1] + shift[1])); \t\t\t\thsv[2] = max(0.0, min(1.0, hsv[2] + shift[2])); \t\t\t\t\t\t\t\tvec3 rgb = hslToRgb(hsv[0], hsv[1], hsv[2]); \t\t\t\t\t\t\t\tgl_FragColor = vec4(mix(src.rgb,rgb,scl),src.w); \t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[4].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[4].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "mnm", "mxm", "shift", "lim"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform3fv(b.mnm, new Float32Array(d.V5));
		G.uniform3fv(b.mxm, new Float32Array(d.Mp));
		G.uniform3fv(b.shift, new Float32Array(d.shift));
		G.uniform1f(b.lim, d.Zl);
		this.bindTextures([b.source, l])
	};
	WebGLContext.IZ[5] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = "\t\t\tprecision mediump float;\t\t\t" + WebGLContext.Li.Wo + "\t\t\t" + WebGLContext.Li.Rc + "\t\t\t" + WebGLContext.Li.ro + "\t\t\t" + WebGLContext.Li.zx + "\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform vec3 cfs[18]; \t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\tvoid main(void) { \t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\tvec3 rgb = src.rgb; \t\t\t\tvec3 hsl = rgbToHsl(rgb); \t\t\t\tfloat mx = max(rgb.r, max(rgb.g, rgb.b)); \t\t\t\tfloat mn = min(rgb.r, min(rgb.g, rgb.b)); \t\t\t\t\t\t\t\tvec3 CMY = ONE3 - rgb; \t\t\t\tvec3 d = ZERO3; \t\t\t\t\t\t\t\tfor(int j=0; j<9; j++) \t\t\t\t{ \t\t\t\t    vec3 NCMY = CMY * cfs[j+j] + cfs[j+j+1]; \t\t\t\t\t\t\t\t\t\tfloat cfK = 0.0;\t\t\t\t\tif     (j< 6) { \t\t\t\t\t\tcfK = hueCF(float(j)*(1.0/6.0), hsl.x); \t\t\t\t\t\tcfK = cfK * hsl.y * 2.0*min(hsl.z, 1.0-hsl.z); \t\t\t\t\t} \t\t\t\t\telse if(j==6) cfK = max(0.0,mn-0.5)*2.0;\t\t\t\t\telse if(j==7) cfK = 1.0-(abs(mx-0.5)+abs(mn-0.5));\t\t\t\t\telse          cfK = max(0.0,0.5-mx)*2.0;\t\t\t\t\t\t\t\t\t\td += (max(ZERO3, min(ONE3, NCMY))-CMY)*cfK; \t\t\t\t} \t\t\t\t\t\t\t\tCMY = max(ZERO3, min(ONE3, CMY+d)); \t\t\t\trgb = ONE3 - CMY; \t\t\t\t\t\t\t\tgl_FragColor = vec4(rgb,src.w); \t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[5].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[5].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "cfs"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform3fv(b.cfs, d.adB);
		this.bindTextures([b.source, l])
	};
	WebGLContext.IZ[6] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = "\t\t\tprecision mediump float;\t\t\t" + WebGLContext.Li.Vq + "\t\t\t" + WebGLContext.Li.Rc + "\t\t\t" + WebGLContext.Li.ro + "\t\t\t" + WebGLContext.Li.zx + "\t\t\t" + WebGLContext.Li.xN + "\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform float wght[6]; \t\t\tuniform float prms[6]; \t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\tvoid main(void) { \t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\tvec3 rgb = src.rgb; \t\t\t\t\t\t\t\tfloat tint=prms[0], hue=prms[1], lum=prms[2], mcf=prms[3], x0=prms[4], x1=prms[5]; \t\t\t\tvec3 hsl = rgbToHsl(rgb); \t\t\t\t\t\t\t\tfloat cf = 0.0;\t\t\t\tfor(int j=0; j<6; j++) cf += min(1.0, 1.7*(1.0-hsl.z)) * hsl.y *  wght[j] * hueCF(hsl.x, float(j)*(1.0/6.0));\t\t\t\t\t\t\t\tfloat lig = max(0.0, min(1.0, hsl.z*(1.0+cf)));\t\t\t\tif(tint==1.0) {  \t\t\t\t\tfloat totl = 0.0;\t\t\t\t\tif     (lig<x0) totl = lig*(0.5/lum); \t\t\t\t\telse if(lig<x1) totl = lig + (mcf)*(0.5 - lum); \t\t\t\t\telse            totl = 1.0 - (1.0-lig)*0.5/(1.0-lum); \t\t\t\t\t\t\t\t\t\thsl.x = hue;  \t\t\t\t\thsl.y = min(1.0, mcf + 3.0*mcf*abs(lig-0.5*(x0+x1))); \t\t\t\t\thsl.z = totl; \t\t\t\t} \t\t\t\telse {  hsl.x=0.0;  hsl.y=0.0;  hsl.z=lig;  } \t\t\t\t\t\t\t\trgb = hslToRgb(hsl.x, hsl.y, hsl.z); \t\t\t\t\t\t\t\tgl_FragColor = vec4(rgb,src.w); \t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[6].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[6].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "wght", "prms"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations,
			V = [d.Mr, d.a5z, d.aC, d.akX, d.qm, d.ajp];
		G.uniform1fv(b.wght, new Float32Array(d.a8V));
		G.uniform1fv(b.prms, new Float32Array(V));
		this.bindTextures([b.source, l])
	};
	WebGLContext.IZ[7] = function() {
		WebGLContext.ShaderProgram.call(this);
		this.CC = {};
		var l = "\t\t\tprecision mediump float;\t\t\t" + WebGLContext.Li.z7 + "\t\t\t\t\t\tuniform sampler2D source;\t\t\tuniform sampler2D lut;\t\t\tuniform float N;\t\t\t\t\t\tvarying vec2 sCoord;\t\t\t\t\t\tvoid main(void) { \t\t\t\tvec4 src = texture2D(source, sCoord); \t\t\t\tvec4 rs = mapLut(src, lut, N); \t\t\t\tgl_FragColor = vec4(rs.rgb,src.w); \t\t\t\t\t\t\t}";
		this.compileProgram(l, WebGLContext.ce.NP)
	};
	WebGLContext.IZ[7].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.IZ[7].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "lut", "N"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations,
			V = d.q5,
			Q = d.XO;
		if (this.CC["m" + V] == null) this.CC["m" + V] = new WebGLContext.RgbaTexture(V, V * V);
		var t = this.CC["m" + V];
		t.set(Q);
		G.uniform1f(b.N, V);
		this.bindTextures([b.source, l, b.lut, t.glTexture]);
		G.activeTexture(G.TEXTURE1);
		var I = G.LINEAR;
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MIN_FILTER, I);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MAG_FILTER, I);
		G.activeTexture(G.TEXTURE0)
	};
	WebGLContext.filter = {
		qr: {},
		NP: `attribute vec2 verPos;
varying vec2 sCoord;

void main(void) {
	sCoord = verPos;
	gl_Position = vec4(vec2(-1.0,-1.0) + 2.0*verPos, 0.0, 1.0);
}`,
		apw: 0,
		axl: 1,
		ET: 2,
		apv: 3,
		a2n: 4,
		atu: 5,
		Yx: 6,
		a5O: 7
	};
	WebGLContext.filter.wF = function(l, d) {
		var G = WebGLContext.filter,
			b, V = l.type + ":" + (l.Ye ? l.Ye.join(",") : ""),
			b = WebGLContext.filter.qr[V];
		if (b == null) b = WebGLContext.filter.qr[V] = new WebGLContext.qr[l.type](l.Ye);
		if (!b.useProgram()) return !1;
		b.draw(d, l);
		WebGLContext.gl.drawArrays(WebGLContext.gl.TRIANGLES, 0, 6);
		return !0
	};
	WebGLContext.qr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	WebGLContext.qr[7] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = `precision highp float;
uniform sampler2D source;
uniform vec2 iwh;
uniform float kern[9];
varying vec2 sCoord;

void main(void){
	vec4 sum=vec4(0,0,0,0);
	float cnt=0.0;
	for(float y=0.0;y<=3.0;y++) {
		for(float x=0.0;x<=3.0;x++){
			vec4 clr=texture2D(source, sCoord+vec2(x-1.0,y-1.0)*iwh);
			clr.rgb*=clr.a;
			sum +=clr*kern[int(y*3.0+x)];
		}
	}
	sum.rgb/=sum.a;
	gl_FragColor=sum;
}`;
		this.compileProgram(l, WebGLContext.filter.NP)
	};
	WebGLContext.qr[7].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[7].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "iwh", "kern"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1fv(b.kern, d.ajP);
		this.bindTextures([b.source, l])
	};
	WebGLContext.qr[6] = function(l) {
		WebGLContext.ShaderProgram.call(this);
		var d = l[0],
			G = l[1],
			b = l[2],
			Q = `precision highp float;
uniform sampler2D source;
uniform vec2 iwh;
uniform float rad;
varying vec2 sCoord;

void main(void){
	vec4 sum=vec4(0,0,0,0);
	float cnt=0.0;
	for(float x=-PRC;x<=PRC;x++){
		if(x<-rad||x>rad) continue;
		vec4 clr=texture2D(source, sCoord+vec2(DIR)*iwh);
		clr.rgb*=clr.a;
		sum +=clr;
		cnt++;
	}

	sum/=cnt;
	sum.rgb/=sum.a;
	gl_FragColor=sum;
}`;
		Q = Q.replaceAll("PRC", b + ".0");
		Q = Q.replaceAll("DIR", ["x,0", "0,x"][G]);
		this.compileProgram(Q, WebGLContext.ce.NP)
	};
	WebGLContext.qr[6].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[6].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "iwh", "rad"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1f(b.rad, d.kr);
		this.bindTextures([b.source, l])
	};
	WebGLContext.qr[4] = function(l) {
		WebGLContext.ShaderProgram.call(this);
		var d = l[0],
			G = l[1],
			b = "\t\t\tprecision highp float;\t\t\tuniform sampler2D source;\t\t\tuniform vec2 iwh;\t\t\tuniform float rrad;\t\t\tuniform float tr;\t\t\t\t\t\tvarying vec2 sCoord;\t\t\tconst float PRC=" + l[2] + ".0; \t\t\t\t\t\tvoid main(void) {\t\t\t\tvec4 sclr = texture2D(source, sCoord);\t\t\t\tfloat rad = rrad; \t\t\t\tif(rad!=0.0) {\t\t\t\t\tvec4 sum=vec4(" + ["1.0,1.0,1.0,0.0", "0.0,0.0,0.0,1.0", "0.0"][G] + "); vec4 cnt = vec4(0.0);\t\t\t\t\tfor(float y=-PRC; y<=PRC; y++) {\t\t\t\t\t\tif(y<-rad || y>rad) continue; \t\t\t\t\t\tfor(float x=-PRC; x<=PRC; x++) { \t\t\t\t\t\t\tif(" + ["x<-rad || x>rad", "(x*x+y*y)>rad*rad"][d] + ") continue; \t\t\t\t\t\t\tvec4 clr = texture2D(source, sCoord+vec2(x,y)*iwh);  \t\t\t\t\t\t\t" + ["if(clr.w!=0.0) sum.rgb=min(sum.rgb,clr.rgb);  sum.w=max(sum.w,clr.w)", "sum.rgb=max(sum.rgb,clr.rgb);  sum.w=min(sum.w,clr.w)", "if(abs(sclr.r-clr.r)<tr) {  sum.r+=clr.r;  cnt.r+=1.0;  };if(abs(sclr.g-clr.g)<tr) {  sum.g+=clr.g;  cnt.g+=1.0;  };if(abs(sclr.b-clr.b)<tr) {  sum.b+=clr.b;  cnt.b+=1.0;  };"][G] + "; \t\t\t\t\t\t\t\t\t\t\t\t\t}\t\t\t\t\t}\t\t\t\t\t\t\t\t\t\tsclr = " + (G == 2 ? "vec4(sum.rgb/cnt.rgb, sclr.w)" : "sum") + ";\t\t\t\t}\t\t\t\tgl_FragColor=sclr; \t\t\t}";
		this.compileProgram(b, WebGLContext.ce.NP)
	};
	WebGLContext.qr[4].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[4].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "iwh", "rrad", "tr"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1f(b.rrad, d.vf);
		G.uniform1f(b.tr, d.aeY);
		this.bindTextures([b.source, l]);
		var V = G.LINEAR;
		V = G.NEAREST;
		G.activeTexture(G.TEXTURE0);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MIN_FILTER, V);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MAG_FILTER, V);
		G.activeTexture(G.TEXTURE0)
	};
	WebGLContext.qr[5] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = `precision highp float;
uniform sampler2D source;
uniform sampler2D ssum;
uniform vec2 iwh;
uniform float amnt;
uniform float edgf;
varying vec2 sCoord;

const float R=5.0;

void main(void){
	vec4 oclr=vec4(0.0);
	float wsum=0.0;
	vec4 lB=texture2D(ssum, sCoord);
	for(float y=-R;y<=R;y++){
		for(float x=-R;x<=R;x++){
			vec2 nc=sCoord+vec2(x,y)*iwh;
			vec4 ds=texture2D(ssum, nc)-lB;
			float E=dot(ds*ds, vec4(0.125,0.25,0.5,1.0));
			float wg=exp(-E*(100.0 + (1.0-amnt)*(1.0-amnt)*10000.0));
			wsum +=wg;
			oclr +=wg*texture2D(source, nc);
		}
	}

	gl_FragColor=mix(oclr/wsum, texture2D(source, sCoord), edgf);
}`;
		this.compileProgram(l, WebGLContext.filter.NP)
	};
	WebGLContext.qr[5].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[5].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "ssum", "iwh", "amnt", "edgf"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1f(b.amnt, d.agI);
		G.uniform1f(b.edgf, d.acd);
		this.bindTextures([b.source, l, b.ssum, d.acO])
	};
	WebGLContext.qr[3] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = `precision mediump float;
uniform sampler2D source;
uniform vec2 iwh;
uniform float tdep;
uniform float rrad;
uniform vec2 spec;
uniform vec3 nois;
uniform mat4 poly0;
uniform mat4 poly1;
varying vec2 sCoord;

bool inPoly(vec4 v){
	vec4 p=max(v*poly0,v*poly1);
	return max(max(p.x,p.y),max(p.z,p.w))<=0.0;
}

vec3 rand3(vec3 px, vec3 py){
	vec3 rawVal=sin(px*11.697096+py*73.32456) * 12157.47691;
	return rawVal - floor(rawVal);
}

vec3 gaus3(vec3 px, vec3 py){
	return (rand3(px,py)+rand3(1.21*px,1.7*py)+rand3(3.1*py,4.7*px)+rand3(0.67*py,0.81*px) -2.0 )*1.5;
}

vec3 unif3(vec3 px, vec3 py){
	return rand3(px,py)*2.0-1.0;
}

const float PRC=70.0;

void main(void){
	vec4 sclr=texture2D(source, sCoord);
	float depth=abs(tdep-sclr.w);
	float rad=depth*rrad;
	if(rad!=0.0){
		vec3 sum;
		float sw=0.0, inc=1.0;

		for(float y=-PRC;y<=PRC;y++){
			inc=1.0-inc;
			if(y<-rad||y>rad) continue;

			for(float x=-PRC;x<=PRC;x+=2.0){
				float cx=x+inc;
				if(x<-rad||x>rad) continue;
				if(!inPoly(vec4(cx,y,rad,0.0))) continue;
				vec4 clr=texture2D(source, sCoord+vec2(cx,y)*iwh);
				float cd=abs(tdep-clr.w);
				float avg=0.3*clr.r+0.59*clr.g+0.11*clr.b;
				float frc=spec.x*cd*cd;
				if(avg>spec.y) clr.rgb=(1.0-frc)*clr.rgb + frc*vec3(7.0);
				float prt=(cd<depth ? ((depth-cd)/depth) : (cd==0.0?0.0:(cd-depth)/cd));
				float cw=1.0-prt;
				sw+=cw;
				sum+=cw*clr.rgb;
			}
		}
		/*gl_FragColor=inPoly(vec4(-1.0+sCoord.x*2.0,-1.0+sCoord.y*2.0,1,0))?vec4(1,1,1,1):vec4(0,0,0,1);*/
		sclr=vec4(sum/sw,1.0);
	}
	vec3 pa=vec3(sCoord.x,sCoord.y,2.1*sCoord.x);
	vec3 pb=vec3(sCoord.y,3.235*sCoord.x,2.3*sCoord.y);
	vec3 nose=nois.y==0.0 ? unif3(pa,pb) : gaus3(pa,pb);
	if(nois.z==1.0) nose.x=nose.y=nose.z;
	sclr.rgb +=(depth*nois.x)*nose;
	gl_FragColor=sclr;
}`;
		this.compileProgram(l, WebGLContext.filter.NP)
	};
	WebGLContext.qr[3].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[3].prototype.draw = function(l, d) {
		this.initUniformLocations("source iwh tdep rrad spec nois poly0 poly1".split(" "));
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1f(b.tdep, d.a3T);
		G.uniform1f(b.rrad, d.vf);
		G.uniform2fv(b.spec, d.al4);
		G.uniform3fv(b.nois, d.a9p);
		G.uniformMatrix4fv(b.poly0, false, d.ant);
		G.uniformMatrix4fv(b.poly1, false, d.a38);
		this.bindTextures([b.source, l]);
		var V = G.LINEAR;
		G.activeTexture(G.TEXTURE0);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MIN_FILTER, V);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MAG_FILTER, V);
		G.activeTexture(G.TEXTURE0)
	};
	WebGLContext.qr[0] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = `precision mediump float;
uniform sampler2D source;
uniform vec2 iwh;
uniform vec3 ld;
uniform float shine;
varying vec2 sCoord;

float getShadow(vec2 p) {
	float x1 = texture2D(source, p+vec2(-1.0, 0.0)*iwh).w;
	float x2 = texture2D(source, p+vec2( 1.0, 0.0)*iwh).w;
	float y1 = texture2D(source, p+vec2( 0.0,-1.0)*iwh).w;
	float y2 = texture2D(source, p+vec2( 0.0, 1.0)*iwh).w;
	float dx0 = 0.7, dx2 = (x2-x1);
	float dy1 = 0.7, dy2 = (y2-y1);
	vec3 n = normalize(vec3(-dx2*dy1, -dx0*dy2, dx0*dy1));
	return dot(ld,n);
}

void main(void) {
	float wh = 1.0 + getShadow(sCoord)*shine;
	gl_FragColor = texture2D(source, sCoord)*wh;
}`;
		this.compileProgram(l, WebGLContext.filter.NP)
	};
	WebGLContext.qr[0].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[0].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "iwh", "ld", "shine"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform3fv(b.ld, d.a7M);
		G.uniform1f(b.shine, d.arm);
		this.bindTextures([b.source, l, b.tang, d.qY])
	};
	WebGLContext.qr[1] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = `precision mediump float;
uniform sampler2D source;
uniform vec2 iwh;
uniform float isc;
uniform float bristle;
varying vec2 sCoord;

float hash(float px, float py) {
	float rawVal = sin(px*11.697096+py*73.32456) * 12157.47691;
	return rawVal - floor(rawVal);
}

float getNoise(vec2 o) {
	vec2 p = (o+vec2(613.0,117.0))*isc;
	vec2 np = floor(p);
	vec2 nrP = p-np;
	float s11=sin(11.0);
	vec2 c0 = cos(np)*s11;
	vec2 c1 = cos(np+vec2(1.0,1.0))*s11;
	float n = hash(c0.x,c0.y);
	float nr = hash(c1.x,c0.y);
	float nd = hash(c0.x,c1.y);
	float nrd = hash(c1.x,c1.y);
	float h1 = mix(n , nr,nrP.x);
	float h2 = mix(nd,nrd,nrP.x);
	float v = mix(h1, h2,nrP.y);
	v = (v < 0.5) ? 0.0:1.0;
	float rslt = v + bristle * hash(cos(p.x)*s11,cos(p.y)*s11);
	return rslt*(1.0/3.0);
}

void main(void) {
	vec2 xy = sCoord/iwh;
	vec4 col = texture2D(source, sCoord);
	col.a = getNoise(xy);
	gl_FragColor = col;
}`;
		this.compileProgram(l, WebGLContext.filter.NP)
	};
	WebGLContext.qr[1].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[1].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "iwh", "isc", "bristle"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1f(b.isc, d.azE);
		G.uniform1f(b.bristle, d.a8_);
		this.bindTextures([b.source, l])
	};
	WebGLContext.qr[2] = function() {
		WebGLContext.ShaderProgram.call(this);
		var l = ` precision mediump float;
uniform sampler2D source;
uniform sampler2D tang;
uniform vec2 iwh;
uniform float sigma;
uniform float expo;
varying vec2 sCoord;

float weight (float x) {
	return exp( -pow(x,expo)/(2.0*sigma*sigma) );
}

void main(void) {
	float hw=sigma+sigma;
	float sw = 1.0;
	vec4 sum = texture2D(source, sCoord);
	vec2 fp = 2.0*(texture2D(tang, sCoord).xy-vec2(0.5,0.5));
	vec2 d = fp; 

	for(int i=0; i<2; i++) {
		vec2 p = sCoord;
		for(float r=0.0; r<2000.0; r++) {
			vec2 md = 2.0*(texture2D(tang, p).xy-vec2(0.5,0.5));
			if(dot(md,d)<0.0) {
				md=-md;
			}
			d = md;
			p += md*iwh;
			float w = weight(r);
			sum += w*texture2D(source, p);
			sw+=w;
			if(r>=hw) break;
		}
		d=-fp;
	}
	gl_FragColor = sum*(1.0/sw);
}`;
		this.compileProgram(l, WebGLContext.filter.NP)
	};
	WebGLContext.qr[2].prototype = new WebGLContext.ShaderProgram;
	WebGLContext.qr[2].prototype.draw = function(l, d) {
		this.initUniformLocations(["source", "tang", "iwh", "sigma", "expo"]);
		var G = WebGLContext.gl,
			b = this.uniformLocations;
		G.uniform2fv(b.iwh, d.wl);
		G.uniform1f(b.sigma, d.acr);
		G.uniform1f(b.expo, d.a0W);
		this.bindTextures([b.source, l, b.tang, d.qY]);
		var V = G.LINEAR;
		G.activeTexture(G.TEXTURE0);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MIN_FILTER, V);
		G.texParameteri(G.TEXTURE_2D, G.TEXTURE_MAG_FILTER, V);
		G.activeTexture(G.TEXTURE0)
	};
