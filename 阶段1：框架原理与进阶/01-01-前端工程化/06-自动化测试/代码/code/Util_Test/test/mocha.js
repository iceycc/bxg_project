const {add,mul,cover} = require('../src/math.js')

const assert = require("assert");

describe("#math",()=>{
    describe("#add()", function() {
        it("add(2,3) equal 5", function() {
            assert.equal(add(2,3),5);
        });
        // it.only("add(2,3) equal 5", function() {
        //     assert.equal(add(2,3),5);
        // });
    
        // it.skip("add(2,-3) equal -1", function() {
        //     assert.equal(add(2,-3),-1);
        // });
        // it("add(2,2) equal 4", function() {
        //     assert.equal(add(2,2),4);
        // });
    })

    describe("#mul()", function() {
        it("mul(2,3) equal 6", function() {
            assert.equal(mul(2,3),6);
        });
    })

    describe("#cover()",function(){
        it("cover(3,2) equal 1", function() {
            assert.equal(cover(3,2),1);
        });

        it("cover(3,3) equal 3", function() {
            assert.equal(cover(3,3),3);
        });

        it("cover(2,4) equal 6", function() {
            assert.equal(cover(2,4),6);
        });
    })
})
