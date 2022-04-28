import { ViewWriter } from "./ViewWriter";
import { ValueBlock } from "./ValueBlock";
import { BaseBlock, BaseBlockParams } from "./BaseBlock";
import { typeStore } from "./TypeStore";

export type NullParams = BaseBlockParams;

export class Null extends BaseBlock<ValueBlock> {

  static {
    typeStore.Null = this;
  }

  public static override NAME = "NULL";

  constructor(parameters: NullParams = {}) {
    super(parameters, ValueBlock); // We will not have a call to "Null value block" because of specified FROM_BER and TO_BER functions

    this.idBlock.tagClass = 1; // UNIVERSAL
    this.idBlock.tagNumber = 5; // Null
  }

  public override fromBER(inputBuffer: ArrayBuffer, inputOffset: number, inputLength: number): number {
    if (this.lenBlock.length > 0)
      this.warnings.push("Non-zero length of value block for Null type");

    if (this.idBlock.error.length === 0)
      this.blockLength += this.idBlock.blockLength;

    if (this.lenBlock.error.length === 0)
      this.blockLength += this.lenBlock.blockLength;

    this.blockLength += inputLength;

    if ((inputOffset + inputLength) > inputBuffer.byteLength) {
      this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";

      return -1;
    }

    return (inputOffset + inputLength);
  }

  public override toBER(sizeOnly?: boolean, writer?: ViewWriter): ArrayBuffer {
    const retBuf = new ArrayBuffer(2);

    if (!sizeOnly) {
      const retView = new Uint8Array(retBuf);
      retView[0] = 0x05;
      retView[1] = 0x00;
    }

    if (writer) {
      writer.write(retBuf);
    }

    return retBuf;
  }

  public override toString(): string {
    return `${(this.constructor as typeof Null).NAME}`;
  }

}
