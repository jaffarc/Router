/*!
 * Router JavaScript v1.0.1
 *
 *
 * Date: Fri 09/03/2016
 */
/**
 * @namespace Router
 * @class
 * @version 1.0.1
 */
var window = {};
var Router = window.Router === window.Router || {};
Router = (function (mod, window) {
    var Private = {},
        options = {
            mode: null,
            routes: [],
            root: '/',
            name: "Router",
            version: "1.0.1"
        };

    Private.extend = function(defaults, options) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };


    /**
     * [Public description]
     * @type {[type]}
     */
    Public = Private.extend(mod, options);
   
    /**
     * [config description]
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     */
    Public.config = function(option) {
        options.mode = option && option.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
        options.root = option && option.root ? '/' + Private.clearSlashes(option.root) + '/' : '/';

        return options;
    };

    /**
     * [clearSlashes description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    Private.clearSlashes  = function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    };
    /**
     * [add description]
     * @param {[type]} re      [description]
     * @param {[type]} handler [description]
     */
    Public.add = function(re, handler) {
        if(typeof re === 'function') {
            handler = re;
            //re = null;
        }

        options.routes.push({ re: re, handler: handler});
        return options;
    };
    /**
     * [getFragment description]
     * @return {[type]} [description]
     */
    Private.getFragment = function() {
        var fragment = '', match;
        if(options.mode === 'history') {
            fragment = Private.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = options.root != '/' ? fragment.replace(options.root, '') : fragment;
        } else {
            match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return Private.clearSlashes(fragment);
    };
    /**
     * [check description]
     * @param  {[type]} f [description]
     * @return {[type]}   [description]
     */
    Public.check = function(f) {
        var fragment = f || Private.getFragment();
        for(var i=0; i<options.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                options.routes[i].handler.apply({}, match);
                return options;
            }           
        }
    };
    /**
     * [navigate description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    Public.navigate  = function(path) {
        path = path ? path : '';
        if(options.mode === 'history') {
            history.pushState(null, null, options.root + Private.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return options;
    };

    /**
     * [extend description]
     * 
     */
    Public.extend = Private.extend;

    return Public;

    

})(Router, window);

