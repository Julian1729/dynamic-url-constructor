# dynamic-url-constructor
Construct dynamic URL strings to be used all around your application.

Github repo:
https://github.com/Julian1729/urlconstructor

# Installation
Using npm:
```
npm i --save dynamic-url-constructor
```

# Usage
Require `dynamic-url-constructor` and instantiate new constructor
```javascript
const URLConstructor = require('dynamic-url-constructor');
let AppUrlConstructor = new URLConstructor();
```

Set url base/domain and create routes
```javascript
// set constructor base
AppUrlConstructor.setBase('http://example.com');
// create routes
AppUrlConstructor.addRoute('dashboard', '/:username/dashboard');
AppUrlConstructor.addRoute('add-post', '/:username/post/add?date=:date');
AppUrlConstructor.addRoute('view-post', '/:username/post/:title');
```

Set global parameters to be used by all routes
```javascript
AppUrlConstructor.setGlobal('username', 'michaelscott');
```

Render URL
```javascript
let dashboardRoute = AppUrlConstructor.getRoute('dashboard');
dashboard.url(); // http://example.com/michaelscott/dashboard
```

Inject route specific params
```javascript
let addPost = AppUrlConstructor.getRoute('add-post');
addPost.setParam('date', '2019-05-03');
let addPostURL = addPost.url();
// http://example.com/michaelscott/post/add?date=2019-05-03
```

Override parameters on render
```javascript
let addPostURL = addPost.url({'username': 'littlekidlover'});
// http://example.com/littlekidlover/post/add?date=2019-05-03
```

Add query params on render
```javascript
let addPostURL = addPost.url(null, {'preview': 'true'});
// http://example.com/michaelscott/post/add?date=2019-05-03&preview=true
```

# Coming Soon
- set parameters with an arbitrary object
- utilize global configuration object
- add URL protocol to configuration and add dynamically
