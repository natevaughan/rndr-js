# rndr.js: a small JS library for making rest calls and rendering dom nodes

By Nate Vaughan

Version 0.1.1

## Justification

None. This is likely just a subset of much better libraries. However, I find it useful for prototyping and creating simple, self-contained, standalone HTML pages with dynamic elements.

Current weight (minified) is ~3kb.

## Usage
Import the minified or un-minified library:

```
<script type='text/javascript' src='/js/rndr.min.js'></script>
```

Importing the library adds a `rndr`object to the global scope.

The global `rndr` object has a function with the same name as most DOM tags. These functions take 3 arguments: `childNodes`, `attributes`, and `eventHandlers`.

For example, to create a div with the attribute `class="my-content"` and the click handler `myClickHandler`:
```
rndr.div(myChildNode, {'class': 'my-content'}, {'click': myClickHandler});
```

Or to create a link with the href to `https://www.github.com`:
```
rndr.a('Github', {'href': 'https://www.github.com'});
```

These functions return (but do not append) a DOM node, ready to be attached to any other DOM node using the built in `appendChild` method. To retrieve an existing DOM node, use `rndr.byId('my-node-id')`. For example, to retrieve a DOM element with the id `blog-content` and append an `<h1>` tag with the text "My Blog": 

```
rndr.byId('blog-content').appendChild(rndr.h1('My Blog'));
```

### Perform rest calls
Perform HTTP Get (assumes response will be JSON) and execute a custom function with the data: 

```
rndr.get("/path/to/data", mySuccessCallback, myErrorCallback, myHeaders); 
```

