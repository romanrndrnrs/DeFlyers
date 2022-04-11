const AureusFactory = artifacts.require("AureusFactory");
const utils = require("./helper/utils") ;

contract("AureusFactory", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await AureusFactory.new();
    });
    it("should be able to credit Aureus from Faucet", async () => {
        const result = await contractInstance.faucet({from:alice});
        assert.equal(result.receipt.status,true);
        assert.equal(result.logs[0].args.value,5000);
        var amount = await contractInstance.balanceOf(alice, {from: alice});
        console.log(amount.words[0]);
    })
    it("should not be able to credit Aureus from Faucet", async () => {
        await contractInstance.faucet({from:alice});
        await utils.shouldThrow(contractInstance.faucet({from:alice}));
    })
    context("with single-step transfer scenario", async () => {
        it("should be able to transfer Aureus", async () => {
            await contractInstance.faucet({from:alice});
            const result = await contractInstance.transfer(bob,200, {from: alice});
            assert.equal(result.logs[0].args.value.words[0],200);
            const bobBalance = await contractInstance.balanceOf(bob, {from: alice});
            assert.equal(bobBalance.words[0],200);
   
        })
     })
    context("with double-step transfer scenario", async () => {
        it("should be able to transfer Aureus", async () => {
            await contractInstance.faucet({from:alice});
            await contractInstance.approve(bob,200, {from: alice});
            const result = await contractInstance.transferFrom(alice,bob,200, {from: bob});
            assert.equal(result.logs[1].args.value.words[0],200);
            const bobBalance = await contractInstance.balanceOf(bob, {from: alice});
            assert.equal(bobBalance.words[0],200);
   
        })
     })
})

