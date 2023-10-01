import { Linter } from "eslint";

import plugin from "../../index";
import type {RuleName} from "./types";

export const lintLocal = (code: string, rule: RuleName, options?: unknown) => {
  const linter = new Linter();
  linter.defineRule(rule, plugin.rules[rule])
  return linter.verify(code, {rules: {[rule]: [2, options]}}, {filename: "foo.js"})
}
