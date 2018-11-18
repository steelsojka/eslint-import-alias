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
    "import-alias/import-alias": [ "always", "error", { "relativeDepth": 0 } ]
  }
}
```
