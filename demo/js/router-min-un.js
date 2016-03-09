var window={};var Router=window.Router===window.Router||{};Router=function(mod,window){var Private={},options={mode:null,routes:[],root:"/",name:"Router",version:"1.0.0",listen:function(){var current=Private.getFragment(),fn;fn=function(){if(current!==Private.getFragment()){current=Private.getFragment();Public.check(current)}};clearInterval(this.interval);this.interval=setInterval(fn,50);return this}};Private.extend=function(defaults,options){var extended={};var prop;for(prop in defaults){if(Object.prototype.hasOwnProperty.call(defaults,prop)){extended[prop]=defaults[prop]}}for(prop in options){if(Object.prototype.hasOwnProperty.call(options,prop)){extended[prop]=options[prop]}}return extended};Public=Private.extend(mod,options);Public.config=function(option){options.mode=option&&option.mode&&option.mode=="history"&&!!history.pushState?"history":"hash";options.root=option&&option.root?"/"+Private.clearSlashes(option.root)+"/":"/";return options};Private.clearSlashes=function(path){return path.toString().replace(/\/$/,"").replace(/^\//,"")};Public.add=function(re,handler){if(typeof re==="function"){handler=re}options.routes.push({re:re,handler:handler});return options};Private.getFragment=function(){var fragment="",match;if(options.mode==="history"){fragment=Private.clearSlashes(decodeURI(location.pathname+location.search));fragment=fragment.replace(/\?(.*)$/,"");fragment=options.root!="/"?fragment.replace(options.root,""):fragment}else{match=window.location.href.match(/#(.*)$/);fragment=match?match[1]:""}return Private.clearSlashes(fragment)};Public.check=function(f){var fragment=f||Private.getFragment();for(var i=0;i<options.routes.length;i++){var match=fragment.match(this.routes[i].re);if(match){match.shift();options.routes[i].handler.apply({},match);return options}}};Public.navigate=function(path){path=path?path:"";if(options.mode==="history"){history.pushState(null,null,options.root+Private.clearSlashes(path))}else{window.location.href=window.location.href.replace(/#(.*)$/,"")+"#"+path}return options};Public.extend=Private.extend;return Public}(Router,window);