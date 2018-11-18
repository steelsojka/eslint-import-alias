export const meta = {
  docs: {
    description: 'Restrict imports to path aliases or relative imports limited by a depth',
    category: 'Possible Errors',
    recommended: true
  },
  fixable: 'code',
  schema: [ {
    type: 'object',
    properties: {
      relativeDepth: { type: 'number' }
    },
    additionalProperties: false
  } ]
};

const RELATIVE_MATCHER = /^(?:\.{1,2}\/)+/;

/**
 * @param {string} matchedPath
 */
function getDepthCount(matchedPath) {
  return matchedPath.split('/').reduce((depth, segment) => segment === '..' ? depth + 1 : depth, 0);
}

export function create(context) {
  const { relativeDepth = -1 } = context.options[0] || {};

  return {
    ImportDeclaration(node) {
      const matches = node.source.value.match(RELATIVE_MATCHER);

      if (matches) {
        const depth = getDepthCount(matches[0]);

        if (depth > relativeDepth) {
          context.report({
            node,
            message: `import statement must be an alias or no more than ${relativeDepth} levels deep`
          });
        }
      }
    }
  }
}
