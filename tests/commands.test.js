'use strict';
 
describe('Controller : CommandController', function(){
    var scope, $httpBackend, CommandController;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(module('myApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller,$injector){
        $httpBackend = $injector.get('$httpBackend');
		
        $httpBackend.when('POST', '/restApi/commands').respond({datas:[{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]});
 
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        CommandController = $controller('CommandController', {$scope: scope});
    }));
	
	afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
	
    // tests start here
    /*it('should have variable text = "Hello World!"', function(){
        expect(scope.title).toBe('Composants');	
		$httpBackend.flush();		
    });*/
    it('should fetch list of users', function(){
        $httpBackend.expect('POST', '/restApi/commands')
            .respond({
                "success": true,
                "links": ["http://www.google.com", "http://angularjs.org", "http://amazon.com"]
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply(function() {		
            //scope.runTest();
        });
		
		$httpBackend.flush();
		
		
    });
});