import { Buffer } from "./Buffer.js";
import { BufferDataType } from "./WebGLConstant.js";
import { Program } from "./Program.js";
import { Attribute } from "./Attribute.js";

/** Information about how to access data in a buffer. */
export class AttributeState {
  /**
   * Creates an attribute.
   * @param name - The name of the attribute in the WebGL program.
   * @param buffer - The buffer which supplies data to the attribute.
   * @param size - The number of components per vertex attribute.
   * @param normalized - Whether to normalize the data after getting it from the buffer.
   * @param stride - The offset in bytes between the beginning of consecutive vertex attributes. Must not exceed `255`.
   * @param offset - The offset in bytes of the first component in the buffer.
   */
  constructor(name: string, buffer: Buffer, size: 1 | 2 | 3 | 4 = 3, normalized = false, stride = 0, offset = 0) {
    this.name = name;
    this.buffer = buffer;
    this.size = size;
    this.normalized = normalized;
    this.stride = stride;
    this.offset = offset;

    this.gl = buffer.gl;
  }

  /** The rendering context of this buffer. */
  readonly gl: WebGL2RenderingContext;

  /** The name of this attribute in a shader program. */
  readonly name: string;

  /** The buffer which supplies data to the attribute. */
  readonly buffer: Buffer;

  /** The number of components per vertex attribute. */
  size: 1 | 2 | 3 | 4;

  /** Whether to normalize data after getting it from this buffer. */
  normalized: boolean;

  /** The offset in bytes between the beginning of consecutive vertex attributes. Must not exceed `255`. */
  stride: number;

  /** The offset in bytes of the first component in the buffer. */
  offset: number;

  /** The type of each component in this buffer. */
  get type(): BufferDataType {
    return this.buffer.type;
  }

  /**
   * Uses this attribute in a program.
   * @param program - The program to use this attribute in.
   */
  use(program: Program): void {
    const attribute: Attribute | undefined = program.attributes.get(this.name);
    if (!attribute) { throw new Error("Attribute not found."); }
    attribute.value = this;
  }
}
