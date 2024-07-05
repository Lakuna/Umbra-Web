import MatrixUniform from "#MatrixUniform";

/**
 * A floating-point 2x2 matrix global variable in a shader program.
 * @internal
 */
export default class FloatMatrix2x2Uniform extends MatrixUniform {
	/**
	 * Set the value of this uniform if the value is iterable.
	 * @param value - The value to pass to the uniform.
	 * @see [`uniformMatrix[234]x[234]fv`](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/uniformMatrix)
	 * @internal
	 */
	public override iterableSetter(value: Iterable<number>) {
		this.gl.uniformMatrix2fv(
			this.location,
			this.transpose ?? false,
			value,
			this.sourceOffset,
			this.sourceLength
		);
	}
}
