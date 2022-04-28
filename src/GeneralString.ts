import { LocalSimpleStringBlockParams, LocalSimpleStringBlock } from "./internals/LocalSimpleStringBlock";
import { typeStore } from "./TypeStore";

export type GeneralStringParams = LocalSimpleStringBlockParams;

export class GeneralString extends LocalSimpleStringBlock {

  static {
    typeStore.GeneralString = this;
  }

  public static override NAME = "GeneralString";

  constructor(parameters: GeneralStringParams = {}) {
    super(parameters);

    this.idBlock.tagClass = 1; // UNIVERSAL
    this.idBlock.tagNumber = 27; // GeneralString
  }

}
