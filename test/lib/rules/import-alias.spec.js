const rule = require('../../../src/lib/rules/import-alias');
const RuleTester = require('eslint').RuleTester;
const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } });

tester.run('import-alias', rule, {
  valid: [ {
    code: `import { test } from '@src/my-test-package';`,
    options: []
  }, {
    code: `import Test from '@src/my-test-package';`,
    options: []
  }, {
    code: `import * as _ from 'lodash';`,
    options: []
  }, {
    code: `import Blorg, { Blorgy } from 'my-test-package';`,
    options: []
  }, {
    code: `import { test } from './test';`,
    options: [ { relativeDepth: 0 } ]
  }, {
    code: `import { test } from '../test';`,
    options: [ { relativeDepth: 1 } ]
  }, {
    code: `import { test } from '.././test';`,
    options: [ { relativeDepth: 1 } ]
  }, {
    code: `import { test } from '././../test';`,
    options: [ { relativeDepth: 1 } ]
  }, {
    code: `import { test } from '@src/test';`,
    options: [ { relativeDepth: 1 } ]
  }, {
    code: `import { test } from '../../test';`,
    options: [ { relativeDepth: 2 } ]
  } ],
  invalid: [ {
    code: `import { test } from './test';`,
    options: [],
    errors: 1
  }, {
    code: `import { test } from '../test';`,
    options: [],
    errors: 1
  }, {
    code: `import { test } from '../../../test';`,
    options: [ { relativeDepth: 2 } ],
    errors: 1
  } ]
});