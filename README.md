# Load Folders

Install usage: `npm i folder-requires`

```js
const folderRequires = require("folder-requires");

(async () => {
    console.log(await folderRequires(`${__dirname}/func`));
})();
```

Fork of: https://github.com/real2two/load-folders/