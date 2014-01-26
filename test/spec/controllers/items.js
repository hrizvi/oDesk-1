'use strict';

describe('Controller: ItemsCtrl', function () {

    beforeEach(module('testApp'));

    var ItemsCtrl,
        scope,
        $httpBackend;

    var items = [
        { name: 'Item 1',       toggle: true,  _id: 1 },
        { name: 'AngularJS',    toggle: false, _id: 2 },
        { name: 'Karma',        toggle: false, _id: 3 },
        { name: 'Express',      toggle: true,  _id: 4 }
    ];

    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/api/items')
            .respond(items);
        scope = $rootScope.$new();
        ItemsCtrl = $controller('ItemsCtrl', {
            $scope: scope
        });
    }));

    it('should get a list of toggle items', function () {
        $httpBackend.flush();
        expect(scope.items.length).toBe(4);
        expect(scope.items[0].toggle).toBe(true);
        expect(scope.items[1].toggle).toBe(false);
        expect(scope.items[2].toggle).toBe(false);
        expect(scope.items[3].toggle).toBe(true);

        scope.toggleAll();
        expect(scope.items[0].toggle).toBe(false);
        expect(scope.items[1].toggle).toBe(true);
        expect(scope.items[2].toggle).toBe(true);
        expect(scope.items[3].toggle).toBe(false);

    });
});
