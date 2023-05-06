import extractTypescript from "../../../src/extract/ast-extractors/extract-typescript-deps.mjs";
import { getASTFromSource } from "../../../src/extract/parse/to-typescript-ast.mjs";

export default async (pTypesScriptSource, pExoticRequireStrings = []) =>
  extractTypescript(
    await getASTFromSource({ source: pTypesScriptSource }),
    pExoticRequireStrings
  );
