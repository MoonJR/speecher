"use strict";describe("Controller: MainCtrl",function(){beforeEach(module("aaApp"));var e,t;beforeEach(inject(function(o,n){t=n.$new(),e=o("MainCtrl",{$scope:t})})),it("should attach a list of awesomeThings to the scope",function(){expect(e.awesomeThings.length).toBe(3)})});