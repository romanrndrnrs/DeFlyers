const DeFlyers = artifacts.require("DeFlyers");

const flyerNames = ["Flyer 1","Flyer 2"];
const flyerDesc = ["Description 1", "Description 2"];
const flyerImg = ["Img 1", "Img 2"];
const flyerPrice = [200000,50000];
contract("DeFlyers", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await DeFlyers.new();
    });
    it("should be able to create a Flyer", async () => {
        const result = await contractInstance.createFlyer(flyerNames[0],flyerDesc[0],flyerImg[0],flyerPrice[0] , {from:alice});
        assert.equal(result.receipt.status,true);
        assert.equal(result.logs[0].args.name,flyerNames[0]);
    })
    it("should be able to transfer a Flyer", async () => {
        const result = await contractInstance.createFlyer(flyerNames[0],flyerDesc[0],flyerImg[0],flyerPrice[0] , {from:alice});
        flyerId = result.logs[0].args.id;
        await contractInstance.transferFrom(alice,bob,flyerId, {from: alice});
        newOwner = await contractInstance.ownerOf(flyerId,{from: alice});
        assert.equal(bob,newOwner);
    })
})
