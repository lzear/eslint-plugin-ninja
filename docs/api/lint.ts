import type {VercelRequest, VercelResponse} from '@vercel/node';
import {lintLocal} from "../src/lint";
import {isRuleName, reqSchema} from "../src/types";

const lintServerless = async (req: VercelRequest, res: VercelResponse) => {
  const parsed = reqSchema.safeParse(JSON.parse(req.body))
  if (!parsed.success) return res.status(400).send({error: 'Invalid payload'})
  const {code, rule, options} = parsed.data
  if (!isRuleName(rule)) return res.status(400).send({error: 'invalid rule name'})
  const lintResults = lintLocal(code, rule, options)
  res.status(200).send(lintResults);
};

export default lintServerless
