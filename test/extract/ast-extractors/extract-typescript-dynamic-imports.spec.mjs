import { expect } from "chai";
import extractTypescript from "./extract-typescript.utl.mjs";

describe("[U] ast-extractors/extract-typescript - dynamic imports", () => {
  it("correctly detects a dynamic import statement", async () => {
    expect(
      await extractTypescript(
        "import('judeljo').then(judeljo => { judeljo.hochik() })"
      )
    ).to.deep.equal([
      {
        module: "judeljo",
        moduleSystem: "es6",
        dynamic: true,
        exoticallyRequired: false,
      },
    ]);
  });

  it("correctly detects a dynamic import statement with a template that has no placeholders", async () => {
    expect(
      await extractTypescript(
        "import(`judeljo`).then(judeljo => { judeljo.hochik() })"
      )
    ).to.deep.equal([
      {
        module: "judeljo",
        moduleSystem: "es6",
        dynamic: true,
        exoticallyRequired: false,
      },
    ]);
  });

  it("ignores dynamic import statements with a template that has placeholders", async () => {
    expect(
      await extractTypescript(
        // eslint-disable-next-line no-template-curly-in-string
        "import(`judeljo/${vlap}`).then(judeljo => { judeljo.hochik() })"
      )
    ).to.deep.equal([]);
  });

  it("ignores dynamic import statements with a non-string parameter", async () => {
    expect(
      await extractTypescript(
        "import(elaborateFunctionCall()).then(judeljo => { judeljo.hochik() })"
      )
    ).to.deep.equal([]);
  });

  it("ignores dynamic import statements without a parameter", async () => {
    expect(
      await extractTypescript(
        "import(/* nothing */).then(judeljo => { judeljo.hochik() })"
      )
    ).to.deep.equal([]);
  });
});
