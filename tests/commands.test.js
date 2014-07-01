'use strict';
 
describe('Controller : CommandController', function(){
    var scope, $httpBackend, CommandController;//we'll use these in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('myApp'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        /*$httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'Users/users.json').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);
 */
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        CommandController = $controller('CommandController', {$scope: scope});
    }));
    // tests start here
    it('should have variable text = "Hello World!"', function(){
        expect(scope.text).toBe('Hello World!');
    });
    it('should fetch list of users', function(){
        $httpBackend.flush();
        expect(scope.users.length).toBe(2);
        expect(scope.users[0].name).toBe('Bob');
    });
});