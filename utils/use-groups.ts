import { minimatch } from 'minimatch'

export const useGroups = (groups: (string[] | string)[]) => {
  let group: undefined | string

  const defineGroup = (value: string) => {
    if (!group && groups.flat().includes(value)) {
      group = value
    }
  }

  const setCustomGroups = (
    customGroups:
      | {
          [key: string]: string[] | string
        }
      | undefined,
    name: string,
  ) => {
    if (customGroups) {
      for (const [key, pattern] of Object.entries(customGroups)) {
        if (
          Array.isArray(pattern) &&
          pattern.some(patternValue =>
            minimatch(name, patternValue, {
              nocomment: true,
            }),
          )
        ) {
          defineGroup(key)
        }

        if (
          typeof pattern === 'string' &&
          minimatch(name, pattern, {
            nocomment: true,
          })
        ) {
          defineGroup(key)
        }
      }
    }
  }

  return {
    getGroup: () => group ?? 'unknown',
    setCustomGroups,
    defineGroup,
  }
}
