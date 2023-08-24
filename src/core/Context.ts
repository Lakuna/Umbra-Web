import { ACTIVE_TEXTURE, TEXTURE0, BLEND_COLOR } from "#constants";
import ApiInterface from "#ApiInterface";
import type { Canvas } from "#Canvas";
import UnsupportedOperationError from "#UnsupportedOperationError";
import type { ExperimentalRawContext } from "#ExperimentalRawContext";
import type Color from "#Color";

/**
 * A WebGL2 rendering context.
 * @see [`WebGL2RenderingContext`](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext)
 */
export default class Context extends ApiInterface {
	/**
	 * Creates a wrapper for a WebGL2 rendering context.
	 * @param gl The rendering context.
	 */
	public constructor(gl: WebGL2RenderingContext);

	/**
	 * Creates a WebGL2 rendering context.
	 * @param canvas The canvas of the rendering context.
	 * @throws {@link UnsupportedOperationError} if the environment does not
	 * support WebGL2.
	 * @see [`getContext`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)
	 */
	public constructor(canvas: Canvas, options?: WebGLContextAttributes);

	public constructor(
		source: WebGL2RenderingContext | Canvas,
		options?: WebGLContextAttributes
	) {
		if (source instanceof WebGL2RenderingContext) {
			super(source);
		} else {
			const gl: WebGL2RenderingContext | null = source.getContext(
				"webgl2",
				options
			) as WebGL2RenderingContext | null;
			if (gl == null) {
				throw new UnsupportedOperationError(
					"The environment does not support WebGL2."
				);
			}
			super(gl);
		}

		this.canvas = this.gl.canvas;
	}

	/**
	 * The canvas of this rendering context.
	 * @see [`canvas`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/canvas)
	 */
	public readonly canvas: Canvas;

	/**
	 * The color space of the drawing buffer of this rendering context.
	 * @see [`drawingBufferColorSpace`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferColorSpace)
	 * @internal
	 */
	private drawingBufferColorSpaceCache?: PredefinedColorSpace;

	/**
	 * The color space of the drawing buffer of this rendering context.
	 * @see [`drawingBufferColorSpace`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferColorSpace)
	 */
	public get drawingBufferColorSpace(): PredefinedColorSpace {
		if (typeof this.drawingBufferColorSpaceCache == "undefined") {
			this.drawingBufferColorSpaceCache = this.gl.drawingBufferColorSpace;
		}
		return this.drawingBufferColorSpaceCache;
	}

	/**
	 * The color space of the drawing buffer of this rendering context.
	 * @see [`drawingBufferColorSpace`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferColorSpace)
	 */
	public set drawingBufferColorSpace(value: PredefinedColorSpace) {
		if (this.drawingBufferColorSpaceCache == value) {
			return;
		}
		this.gl.drawingBufferColorSpace = value;
		this.drawingBufferColorSpaceCache = value;
	}

	/**
	 * The actual height of the drawing buffer of this rendering context.
	 * @see [`drawingBufferHeight`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferHeight)
	 */
	public get drawingBufferHeight(): number {
		return this.gl.drawingBufferHeight;
	}

	/**
	 * The actual width of the drawing buffer of this rendering context.
	 * @see [`drawingBufferWidth`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawingBufferWidth)
	 */
	public get drawingBufferWidth(): number {
		return this.gl.drawingBufferWidth;
	}

	/**
	 * The color space to convert to when importing textures.
	 * @see [`unpackColorSpace`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/unpackColorSpace)
	 * @experimental
	 * @internal
	 */
	private unpackColorSpaceCache?: PredefinedColorSpace;

	/**
	 * The color space to convert to when importing textures.
	 * @see [`unpackColorSpace`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/unpackColorSpace)
	 * @experimental
	 */
	public get unpackColorSpace(): PredefinedColorSpace {
		if (typeof this.unpackColorSpaceCache == "undefined") {
			this.unpackColorSpaceCache = (
				this.gl as ExperimentalRawContext
			).unpackColorSpace;
		}
		return this.unpackColorSpaceCache;
	}

	/**
	 * The color space to convert to when importing textures.
	 * @see [`unpackColorSpace`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/unpackColorSpace)
	 * @experimental
	 */
	public set unpackColorSpace(value: PredefinedColorSpace) {
		if (this.unpackColorSpaceCache == value) {
			return;
		}
		(this.gl as ExperimentalRawContext).unpackColorSpace = value;
		this.unpackColorSpaceCache = value;
	}

	/**
	 * The active texture unit.
	 * @see [`activeTexture`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture)
	 * @internal
	 */
	private activeTextureCache?: number;

	/**
	 * The active texture unit.
	 * @see [`activeTexture`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture)
	 */
	public get activeTexture(): number {
		if (typeof this.activeTextureCache == "undefined") {
			this.activeTextureCache = this.gl.getParameter(ACTIVE_TEXTURE) - TEXTURE0;
		}
		return this.activeTextureCache;
	}

	/**
	 * The active texture unit.
	 * @see [`activeTexture`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/activeTexture)
	 */
	public set activeTexture(value: number) {
		// TODO: Ensure that this is between `0` and `MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1`.
		if (this.activeTextureCache == value) {
			return;
		}
		this.gl.activeTexture(value + TEXTURE0);
		this.activeTextureCache = value;
	}

	/**
	 * The blend color.
	 * @see [`blendColor`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor)
	 * @internal
	 */
	private blendColorCache?: Color;

	/**
	 * The blend color.
	 * @see [`blendColor`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor)
	 */
	public get blendColor(): Color {
		if (typeof this.blendColorCache == "undefined") {
			this.blendColorCache = this.gl.getParameter(BLEND_COLOR) as Color;
		}
		return this.blendColorCache;
	}

	/**
	 * The blend color.
	 * @see [`blendColor`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendColor)
	 */
	public set blendColor(value: Color) {
		if (
			typeof this.blendColorCache != "undefined" &&
			this.blendColorCache[0] == value[0] &&
			this.blendColorCache[1] == value[1] &&
			this.blendColorCache[2] == value[2] &&
			this.blendColorCache[3] == value[3]
		) {
			return;
		}
		this.gl.blendColor(value[0], value[1], value[2], value[3]);
		this.blendColorCache = value;
	}
}
