eslint-import-alias
===================

An ESLint rule for forcing import path aliases.

Install
-------

```shell
npm install --dev eslint-import-alias
```

Usage
-----

```javascript
import { test } from '@src/test'; // valid
import { test } from './test'; // invalid
import { test } from '../test'; // invalid

// Optional relative depth can be specified.
import { test } from './test'; // valid, { relativeDepth: 0 }
import { test } from '../test'; // valid, { relativeDepth: 1 }
import { test } from '../../test'; // invalid, { relativeDepth: 1 }
```

Configure
---------

```json
{
  "rules": {
    "import-alias/import-alias": [
      "error",
      {
        "relativeDepth": 0,
        "aliases": [
          { "alias": "@src", "matcher": "^src" }, // src/modules/app/test -> @src/modules/app/test
          { "alias": "@test", "matcher": "^test\/unit" }, // test/unit/modules/app -> @test/modules/app
          { "alias": "@testRoot", "matcher": "^(test)\/e2e" } // test/e2e/modules/app -> @testRoot/e2e/modules/app
        ]
      }
    ]
  }
}
```

Aliases can be configured to fix the path and rewrite to an aliased path. Each alias has the alias text and a regex matcher that will match against the resolved path from the root directory of the eslint process (usually the project root). For example, if the resolved file path is in the 'src' folder (src/modules/app/test) then 'src' will be replaced with '@src'.
Optionally, you can define a capture group to replace only the part within the capture group, but still match against the whole regex.