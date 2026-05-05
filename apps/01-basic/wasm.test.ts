import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it, vi } from "vitest";

// 01-basic ships a hand-written `simple.wasm` whose documented contract
// (see `index.html`) is:
//   - exports an `exported_func` taking no arguments
//   - that calls `imports.imported_func(42)` exactly once
//
// These tests load the actual `.wasm` binary and assert that contract,
// so the demo can't silently drift from what the README claims.

const wasmPath = resolve(fileURLToPath(import.meta.url), "../simple.wasm");
const wasmBytes = readFileSync(wasmPath);

const instantiate = async (importedFunc: (n: number) => void) => {
  const module = await WebAssembly.instantiate(wasmBytes, {
    imports: { imported_func: importedFunc },
  });
  return module.instance.exports as { exported_func: () => void };
};

describe("simple.wasm", () => {
  it("instantiates without error against the documented import shape", async () => {
    await expect(instantiate(() => {})).resolves.toBeDefined();
  });

  it("exports `exported_func`", async () => {
    const exports = await instantiate(() => {});
    expect(typeof exports.exported_func).toBe("function");
  });

  it("calls the imported function exactly once when `exported_func` runs", async () => {
    const importedFunc = vi.fn();
    const exports = await instantiate(importedFunc);
    exports.exported_func();
    expect(importedFunc).toHaveBeenCalledTimes(1);
  });

  it("passes `42` as the argument to the imported function", async () => {
    const importedFunc = vi.fn();
    const exports = await instantiate(importedFunc);
    exports.exported_func();
    expect(importedFunc).toHaveBeenCalledWith(42);
  });
});
