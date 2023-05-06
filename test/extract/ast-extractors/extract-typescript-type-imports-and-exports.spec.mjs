import { expect } from "chai";
import extractTypescript from "./extract-typescript.utl.mjs";

describe("[U] ast-extractors/extract-typescript - type imports and exports", () => {
  it("extracts type imports in const declarations", async () => {
    expect(
      await extractTypescript("const tiepetjes: import('./types').T;")
    ).to.deep.equal([
      {
        module: "./types",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
      },
    ]);
  });

  it("extracts type imports in const declarations (template literal argument)", async () => {
    expect(
      await extractTypescript("const tiepetjes: import(`./types`).T;")
    ).to.deep.equal([
      {
        module: "./types",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
      },
    ]);
  });

  it("extracts type imports in parameter declarations", async () => {
    expect(
      await extractTypescript(
        "function f(snort: import('./vypes').T){console.log(snort.bla)}"
      )
    ).to.deep.equal([
      {
        module: "./vypes",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
      },
    ]);
  });

  it("extracts type imports in class members", async () => {
    expect(
      await extractTypescript(
        "class Klass{ private membert: import('./wypes').T; constructor() { membert = 'x'}}"
      )
    ).to.deep.equal([
      {
        module: "./wypes",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
      },
    ]);
  });

  it("leaves type imports with template literals with placeholders alone", async () => {
    expect(
      // typescript/lib/protocol.d.ts has this thing

      await extractTypescript(
        "const tiepetjes: import(`./types/${lalala()}`).T;"
      )
    ).to.deep.equal([]);
  });

  it("leaves 'import equals' of variables alone", async () => {
    expect(
      // typescript/lib/protocol.d.ts has this thing
      await extractTypescript("import protocol = ts.server.protocol")
    ).to.deep.equal([]);
  });

  it("extracts imports that explicitly state they only import a type - default import", async () => {
    expect(
      await extractTypescript("import type slork from './ts-typical';")
    ).to.deep.equal([
      {
        module: "./ts-typical",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
        dependencyTypes: ["type-only"],
      },
    ]);
  });

  it("extracts imports that explicitly state they only import a type - just a part of the module", async () => {
    expect(
      await extractTypescript("import type {IZwabbernoot} from './ts-typical';")
    ).to.deep.equal([
      {
        module: "./ts-typical",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
        dependencyTypes: ["type-only"],
      },
    ]);
  });

  it("extracts imports that explicitly state they only import a type - default import plus parts", async () => {
    expect(
      await extractTypescript(
        "import type Robbedoes, {IZwabbernoot} from './ts-typical';"
      )
    ).to.deep.equal([
      {
        module: "./ts-typical",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
        dependencyTypes: ["type-only"],
      },
    ]);
  });

  it("extracts re-exports that explicitly state they only re-export a type", async () => {
    expect(
      await extractTypescript("export type * as vehicles from './vehicles';")
    ).to.deep.equal([
      {
        module: "./vehicles",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
        dependencyTypes: ["type-only"],
      },
    ]);
  });

  it("extracts re-exports that explicitly state they only re-export a type (without aliases)", async () => {
    expect(
      await extractTypescript("export type * from './vehicles';")
    ).to.deep.equal([
      {
        module: "./vehicles",
        moduleSystem: "es6",
        dynamic: false,
        exoticallyRequired: false,
        dependencyTypes: ["type-only"],
      },
    ]);
  });
});
