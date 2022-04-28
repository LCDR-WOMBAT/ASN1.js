import { LocalSimpleStringBlockParams, LocalSimpleStringBlock } from "./internals/LocalSimpleStringBlock";
import { typeStore } from "./TypeStore";

export type CharacterStringParams = LocalSimpleStringBlockParams;

export class CharacterString extends LocalSimpleStringBlock {

  static {
    typeStore.CharacterString = this;
  }

  public static override NAME = "CharacterString";

  constructor(parameters: CharacterStringParams = {}) {
    super(parameters);

    this.idBlock.tagClass = 1; // UNIVERSAL
    this.idBlock.tagNumber = 29; // CharacterString
  }

}
