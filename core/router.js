(function (APP) {
    var Router = APP.Router === APP.Router || {};
    Router = (function (mod, window) {

        var Private = {},
            options = {
                mode: null,
                routes: [],
                root: '/',
                name: "APP.Router",
                version: "0.0.1",
                listen  : function() {
                    var current = Private.getFragment(), fn;
                    fn = function() {
                        if(current !== Private.getFragment()) {
                            current = Private.getFragment();
                            Private.check(current);
                        }
                    }
                    clearInterval(this.interval);
                    this.interval = setInterval(fn, 50);
                    return this;
                }
            };

        /**
         * [Public description]
         * @type {[type]}
         */
        Public = window.APP.extend(mod, options);
       
        /**
         * [config description]
         * @param  {[type]} option [description]
         * @return {[type]}        [description]
         */
        Public.config = function(option) {
            options.mode = option && option.mode && option.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
            options.root = option && option.root ? '/' + Private.clearSlashes(option.root) + '/' : '/';

            return options;
        };

        /**
         * [flush description]
         * @return {[type]} [description]
         */
        Public.flush = function() {
            options.routes = [];
            options.mode = null;
            options.root = '/';
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
                re = '';
            }

            options.routes.push({ re: re, handler: handler});
            return options;
        };
        /**
         * [getFragment description]
         * @return {[type]} [description]
         */
        Private.getFragment = function() {
            var fragment = '';
            if(options.mode === 'history') {
                fragment = Private.clearSlashes(decodeURI(location.pathname + location.search));
                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = options.root != '/' ? fragment.replace(options.root, '') : fragment;
            } else {
                var match = window.location.href.match(/#(.*)$/);
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
            return options;
        };
        /**
         * [navigate description]
         * @param  {[type]} path [description]
         * @return {[type]}      [description]
         */
        Public.navigate  = function(path) {
            path = path ? path : '';
            console.log(options.mode)
            if(options.mode === 'history') {
                console.log(null, null, options.root + Private.clearSlashes(path))
                history.pushState(null, null, options.root + Private.clearSlashes(path));
            } else {
                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            }
            return options;
        };


        return Public;
        

    })(APP.Router, window);
    APP.Router = Router;

})(window.APP);