import Uniform from "./Uniform.js";

/**
 * A floating-point global variable in a shader program.
 * @internal
 */
export default class FloatUniform extends Uniform {
	/**
	 * Set the value of this uniform if the value is iterable.
	 * @param value - The value to pass to the uniform.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/uniform | uniform[1234][uif][v]}
	 * @internal
	 */
	public override iterableSetter(value: Iterable<number>) {
		this.gl.uniform1fv(
			this.location,
			value,
			this.sourceOffset,
			this.sourceLength
		);
	}

	/**
	 * Set the value of this uniform if the value is not iterable.
	 * @param value - The value to pass to the uniform.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/uniform | uniform[1234][uif][v]}
	 * @internal
	 */
	public override setter(value: number) {
		this.gl.uniform1f(this.location, value);
	}
}
