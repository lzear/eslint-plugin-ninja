import * as uuid from 'uuid'
import fs from 'node:fs'

/**
 * Tie up execution for at-least the given number of millis.  This is not efficient.
 * @param millis Min number of millis to wait
 */
export const sleepSync = (millis: number) => {
  if (millis <= 0) return
  const proceedAt = Date.now() + millis
  while (Date.now() < proceedAt) fs.existsSync(uuid.v4())
}
