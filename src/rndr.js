var rndr = (function() {

    /********************************************************
     *                   RENDER JS
     *                 Version 0.1.0
     *             Nate Vaughan 2018-2019
     * A simple library for rendering dynamic HTML elements
     ********************************************************/

    var rndr = {};

        /**
         * Constants to ease minification
         */
    var undefinedType = 'undefined';
    var stringType = 'string';
    var boolType = 'boolean';
    var objectType = 'object';
    var numberType = 'number';
    var httpGet = 'Get';
    var httpPost = 'Post';
    var httpPut = 'Put';
    var httpPatch = 'Patch';
    var httpDelete = 'Delete';

    /**
     * Make a rest call
     * @param method: the HTTP method e.g. "Get", "Post", "Put", "Patch", or "Delete"
     * @param path: the fully qualified request path
     * @param successCallback: function invoked with the response body (if one exists) in case of response status is 200
     * @param errorCallback: function invoked with the response body (if one exists) in case response status is not 200
     * @param headers: request headers to be set
     * @param body: object to be serialized to JSON
     */
    function rest(method, path, successCallback, errorCallback, headers, body) {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            4 === xhr.readyState && (200 === xhr.status ? successCallback(JSON.parse(xhr.responseText)) : errorCallback(xhr))
        };
        xhr.open(method, path, !0);
        if (typeof headers === objectType) {
            var propNames = Object.getOwnPropertyNames(headers);
            propNames.forEach(function(name) {
                xhr.setRequestHeader(name, headers[name]);
            });
        }
        if (typeof body !== undefinedType) {
            xhr.send(JSON.stringify(body))
        } else {
            xhr.send()
        }
    }

    /**
     * Create a DOM element
     * @param tag - the type of HTML element
     * @param children - nodes to be inserted in the element
     * @param attrs - a map of attributes e.g. type="radio" would be expressed as {type: "radio"}
     * @param listeners - a map of event listeners to attach e.g. onclick="someFunction()" would be expressed as {click: someFunction}
     */
    function createNode(tag, children, attrs, listeners) {
        if (typeof tag === undefinedType) {
            throw "bad tag"
        }
        var newNode = document.createElement(tag);
        if (typeof attrs === objectType) {
            var propNames = Object.getOwnPropertyNames(attrs);
            propNames.forEach(function(name) {
                newNode.setAttribute(name, attrs[name]);
            });
        }
        setChildren(newNode, children);
        if (typeof listeners === objectType) {
            var eventNames = Object.getOwnPropertyNames(listeners);
            eventNames.forEach(function(name) {
                newNode.addEventListener(name, listeners[name]);
            });
        }

        return newNode;
    }

    /**
     * Clear and set the children of a DOM element
     * @param destination - the DOM node to be set
     * @param children - a string, DOM node, or array of DOM nodes
     */
    function setChildren(destination, children) {
        if (typeof destination !== objectType || destination === null) {
            throw 'bad destination';
        }
        while (destination.firstChild) {
            destination.removeChild(destination.firstChild);
        }
        if (typeof children === stringType || typeof children === numberType) {
            destination.appendChild(text(children));
        } else if (typeof children === objectType && children !== null) {
            if (Array.isArray(children)) {
                children.forEach(function(child) {
                    destination.appendChild(child);
                });
            } else {
                destination.appendChild(children);
            }
        }
    }

    /**
     * Cast to a type based on string
     */
    function cast(value, type) {
        switch (type) {
            case numberType:
                return Number(value);
            case stringType:
                return String(value);
            case boolType:
                return (value == 'true');
            default:
                return value;
        }
    }

    /**
     * Alias for document.getElementById(name) to allow minification
     * @param id - the id
     * @returns {Element}
     */
    function byId(id) {
        return document.getElementById(id)
    }

    /**
     * Aliases to create specific nodes to ease readability and allow minification
     */
    rndr.createNode = createNode;
    rndr.setChildren = setChildren;
    rndr.byId = byId;
    rndr.get = function (path, successCallback, errorCallback, headers) {
        return rest(httpGet, path, successCallback, errorCallback, headers);
    };
    rndr.post = function (path, successCallback, errorCallback, headers, data) {
        return rest(httpPost, path, successCallback, errorCallback, headers, data);
    };
    rndr.put = function (path, successCallback, errorCallback, headers, data) {
        return rest(httpPut, path, successCallback, errorCallback, headers, data);
    };
    rndr.patch = function (path, successCallback, errorCallback, headers, data) {
        return rest(httpPatch, path, successCallback, errorCallback, headers, data);
    };
    rndr.delete = function (path, successCallback, errorCallback, headers) {
        return rest(httpDelete, path, successCallback, errorCallback, headers);
    };
    rndr.asNumber = function(value) {
        return cast(value, numberType)
    };
    rndr.asBool = function(value) {
        return cast(value, boolType)
    };
    rndr.asString = function(value) {
        return cast(value, stringType)
    };
    rndr.a = function(children, attrs, listeners) { return createNode('a', children, attrs, listeners) };
    rndr.p = function(children, attrs, listeners) { return createNode('p', children, attrs, listeners) };
    rndr.span = function(children, attrs, listeners) { return createNode('span', children, attrs, listeners) };
    rndr.div = function(children, attrs, listeners) { return createNode('div', children, attrs, listeners) };
    rndr.ul = function(children, attrs, listeners) { return createNode('ul', children, attrs, listeners) };
    rndr.ol = function(children, attrs, listeners) { return createNode('ol', children, attrs, listeners) };
    rndr.li = function(children, attrs, listeners) { return createNode('li', children, attrs, listeners) };
    rndr.table = function(children, attrs, listeners) { return createNode('table', children, attrs, listeners) };
    rndr.tr = function(children, attrs, listeners) { return createNode('tr', children, attrs, listeners) };
    rndr.td = function(children, attrs, listeners) { return createNode('td', children, attrs, listeners) };
    rndr.form = function(children, attrs, listeners) { return createNode('form', children, attrs, listeners) };
    rndr.button = function(children, attrs, listeners) { return createNode('button', children, attrs, listeners) };
    rndr.input = function(attrs, listeners) { return createNode('input', null, attrs, listeners) };
    rndr.img = function(attrs, listeners) { return createNode('img', null, attrs, listeners) };
    rndr.text = function(t) { return document.createTextNode(t) };
    rndr.h1 = function(children, attrs, listeners) { return createNode('h1', children, attrs, listeners) };
    rndr.h2 = function(children, attrs, listeners) { return createNode('h2', children, attrs, listeners) };
    rndr.h3 = function(children, attrs, listeners) { return createNode('h3', children, attrs, listeners) };
    return rndr
})();
