import Vector3Uniform from "./Vector3Uniform.js";

/**
 * A floating-point 3D vector global variable in a shader program.
 * @internal
 */
export default class FloatVector3Uniform extends Vector3Uniform {
	/**
	 * Set the value of this uniform if the value is iterable.
	 * @param value - The value to pass to the uniform.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/uniform | uniform[1234][uif][v]}
	 * @internal
	 */
	public override iterableSetterInternal(value: Iterable<number>): void {
		this.gl.uniform3fv(
			this.location,
			value,
			this.sourceOffset,
			this.sourceLength
		);
	}
}
