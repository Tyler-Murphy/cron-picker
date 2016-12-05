### Install

```
npm install --save cron-picker
```

### Use

```js
cron = require('cron-picker')

document.body.appendChild(cron({
  cronExpression: '* * * * *',
  onChange: expression => {
  	// do something with the new cron expression
  }
}))
```

A standalone version is also included in `dist/`:

```html
<script src="node_modules/cron-picker/dist/index.js"></script>
<script>
  document.body.appendChild(cron({ ... }))
</script> 
```

