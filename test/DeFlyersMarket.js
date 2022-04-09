const AureusFactory = artifacts.require("AureusFactory");
const DeFlyers = artifacts.require("DeFlyers");
const DeFlyersMarket = artifacts.require("DeFlyersMarket");
const utils = require("./helper/utils") ;
const flyerNames = ["Flyer 1","Flyer 2"];
const flyerDesc = ["Description 1", "Description 2"];
const flyerImg = ["Img 1", "Img 2"];
const flyerPrice = [2000,50000];

contract("DeflyersMarket", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    let deflyersInstance;
    let aureusInstance;
    beforeEach(async () => {
        contractInstance = await DeFlyersMarket.new();
        deflyersInstance = await DeFlyers.new();
        aureusInstance = await AureusFactory.new();

    });


    context("with valid market", async () => {
        it("should be able to exchange", async () => {
            await contractInstance.setCurrencyAddress(aureusInstance.address, {from: alice});
            await contractInstance.setTokenAddress(deflyersInstance.address, {from: alice});
            const flyerResult = await deflyersInstance.createFlyer(flyerNames[0],flyerDesc[0],flyerImg[0],flyerPrice[0] , {from:alice});
            let flyerId = flyerResult.logs[0].args.id;
            await deflyersInstance.changeSaleStatus(flyerId, {from: alice});
            await aureusInstance.faucet({from:bob});
            await deflyersInstance.manageMarket(contractInstance.address,true, {from: alice});
            await aureusInstance.manageMarket(contractInstance.address,true, {from: alice});

            amount = await deflyersInstance.getPrice(flyerId, {from: alice});
            amountValue = amount.words[0];
            await aureusInstance.loadTransaction(amountValue, {from: bob});
            await contractInstance.exchange(flyerId,amountValue, {from: bob});
            balamount = await aureusInstance.balanceOf(bob, {from: alice});
            newOwner = await deflyersInstance.ownerOf(flyerId,{from: alice});
            assert.equal(bob,newOwner);
        })
        it("should not be able to exchange", async () => {
            await contractInstance.setCurrencyAddress(aureusInstance.address, {from: alice});
            await contractInstance.setTokenAddress(deflyersInstance.address, {from: alice});
            const flyerResult = await deflyersInstance.createFlyer(flyerNames[1],flyerDesc[1],flyerImg[1],flyerPrice[1] , {from:alice});
            let flyerId = flyerResult.logs[0].args.id;
            await deflyersInstance.changeSaleStatus(flyerId, {from: alice});
            await aureusInstance.faucet({from:bob});
            await deflyersInstance.manageMarket(contractInstance.address,true, {from: alice});
            await aureusInstance.manageMarket(contractInstance.address,true, {from: alice});

            amount = await deflyersInstance.getPrice(flyerId, {from: alice});
            amountValue = amount.words[0];
            await aureusInstance.loadTransaction(amountValue, {from: bob});
            await utils.shouldThrow(contractInstance.exchange(flyerId,amountValue, {from: bob}));
        })
        it("should be able to exchange when price is ajusted", async () => {
            await contractInstance.setCurrencyAddress(aureusInstance.address, {from: alice});
            await contractInstance.setTokenAddress(deflyersInstance.address, {from: alice});
            const flyerResult = await deflyersInstance.createFlyer(flyerNames[1],flyerDesc[1],flyerImg[1],flyerPrice[1] , {from:alice});
            let flyerId = flyerResult.logs[0].args.id;
            await deflyersInstance.changeSaleStatus(flyerId, {from: alice});
            await aureusInstance.faucet({from:bob});
            await deflyersInstance.manageMarket(contractInstance.address,true, {from: alice});
            await aureusInstance.manageMarket(contractInstance.address,true, {from: alice});

            amount = await deflyersInstance.getPrice(flyerId, {from: alice});
            amountValue = amount.words[0];
            await aureusInstance.loadTransaction(amountValue, {from: bob});
            await utils.shouldThrow(contractInstance.exchange(flyerId,amountValue, {from: bob}));
            await deflyersInstance.setPrice(flyerId, 5000,{from: alice});

            await contractInstance.exchange(flyerId,5000, {from: bob});
            balamount = await aureusInstance.balanceOf(bob, {from: alice});
            newOwner = await deflyersInstance.ownerOf(flyerId,{from: alice});
            assert.equal(bob,newOwner);
            
        })
    })
    context("with unvalid market", async () => {
        it("should not be able to exchange", async () => {
            await contractInstance.setCurrencyAddress(aureusInstance.address, {from: alice});
            await contractInstance.setTokenAddress(deflyersInstance.address, {from: alice});
            const flyerResult = await deflyersInstance.createFlyer(flyerNames[0],flyerDesc[0],flyerImg[0],flyerPrice[0] , {from:alice});
            let flyerId = flyerResult.logs[0].args.id;
            await deflyersInstance.changeSaleStatus(flyerId, {from: alice});
            await aureusInstance.faucet({from:bob});

            amount = await deflyersInstance.getPrice(flyerId, {from: alice});
            amountValue = amount.words[0];
            await aureusInstance.loadTransaction(amountValue, {from: bob});
            await utils.shouldThrow(contractInstance.exchange(flyerId,amountValue, {from: bob}));
        })
    })
 //   xit("should not be able to exchange", async () => {
 //       const result = await aureusInstance.faucet({from:alice});
 //       assert.equal(result.receipt.status,true);
 //       assert.equal(result.logs[0].args.value,5000);
 //       var amount = await aureusInstance.balanceOf(alice, {from: alice});
 //       console.log(amount.words[0]);
 //   })
 //   xit("should not be able to credit Aureus from Faucet", async () => {
 //       await aureusInstance.faucet({from:alice});
 //       await utils.shouldThrow(aureusInstance.faucet({from:alice}));
 //   })
 //   xcontext("with single-step transfer scenario", async () => {
 //       xit("should be able to transfer Aureus", async () => {
 //           await aureusInstance.faucet({from:alice});
 //           const result = await aureusInstance.transfer(bob,200, {from: alice});
 //           assert.equal(result.logs[0].args.value.words[0],200);
 //           const bobBalance = await aureusInstance.balanceOf(bob, {from: alice});
 //           assert.equal(bobBalance.words[0],200);
 //  
 //       })
 //    })
 //   xcontext("with double-step transfer scenario", async () => {
 //       xit("should be able to transfer Aureus", async () => {
 //           await aureusInstance.faucet({from:alice});
 //           await aureusInstance.approve(bob,200, {from: alice});
 //           const result = await aureusInstance.transferFrom(alice,bob,200, {from: bob});
 //           assert.equal(result.logs[1].args.value.words[0],200);
 //           const bobBalance = await aureusInstance.balanceOf(bob, {from: alice});
 //           assert.equal(bobBalance.words[0],200);
 //  
 //       })
 //    })
})
