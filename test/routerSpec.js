describe('Router', function() {
	describe('options', function() {

		it('mode', function() {
			expect(Router.mode).toEqual(null);
		});

		it('routes', function() {
			expect(Router.routes).toEqual([]);
		});

		it('name', function() {
			expect(Router.name).toEqual('Router');
		});

		it('root', function() {
			expect(Router.root).toEqual('/');
		});
		
	});

	it('config', function() {
        expect(Router.config({ mode: 'hash'})).toEqual(jasmine.objectContaining({mode: 'hash'}));
        expect(Router.config({ mode: 'history'})).toEqual(jasmine.objectContaining({mode: 'history'}));
	});

	describe('add route', function() {
    
		beforeEach(function() {
        	Router.add('/contact');
    	});

		it('add', function() {
			expect(Router.routes).toContain(jasmine.objectContaining({re : '/contact' }));
		});
	});


	describe('check', function() {
		var arg;

		beforeEach(function() {
			Router.add(/category\/(\d+)\/edit\/(\d+)/, function() {
    			arg = arguments;
			});
		});


		it('array', function() {

			Router.check('/category/55/edit/1025');

			expect(arg).toEqual(jasmine.objectContaining({0: jasmine.any(String), 1: jasmine.any(String)}))

		});

		
	});

	describe('navigate', function() {
		var url;

		it('/ routes to contact', function(){
		    Router.navigate('/contact');
		    url = window.location.href.replace(/#(.*)$/, '');
		    
		    expect(url).toContain('/contact');
		});
		it("if content /contact in Router.routes", function() {
		   expect(Router.routes).toContain(jasmine.objectContaining({re : window.location.pathname }));	
		});
	});

});

