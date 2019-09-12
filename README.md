# rndr.js: a small JS library for making rest calls and rendering dom nodes

By Nate Vaughan

## Justification

None. This is likely just a subset of much better libraries. However, I find it useful for prototyping and creating simple, self-contained, standalone HTML pages with dynamic elements.

## Usage

Adds a `rndr` variable to the global scope.

Import the minified or un-minified library:

```
<script type='text/javascript' src='/js/rndr.min.js'></script>
```

### Perform rest calls
Perform HTTP Get (assumes response will be JSON): 

```
rndr.get("/path/to/data", mySuccessCallback, myErrorCallback, myHeaders); 
```
