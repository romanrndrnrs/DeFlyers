import json
BUILDPATH = "./build/contracts/"
PUBLICPATH = "./website/public/"

_listbuild = ["DeFlyers.json", "DeFlyersMarket.json", "AureusFactory.json"]
_listaddresspublic = ["deflyers_address.js", "deflyersmarket_address.js", "aureusfactory_address.js"]
_listabipublic = ["deflyers_abi.js", "deflyersmarket_abi.js","aureusfactory_abi.js"]
_listvaraddress = ["deflyersAddresses","deflyersmarketAddresses","aureusfactoryAddresses"]
_listvarabiaddress = ["deflyersABI","deflyersmarketABI","aureusfactoryABI"]

for i  in range(len(_listbuild)):
    with open(BUILDPATH + _listbuild[i],"r") as f:
        data = json.load(f)
        abi = data["abi"]
        network = data["networks"]
        netkeys = list(network.keys())
        networkaddress = data["networks"][netkeys[-1]]["address"]
        with open(PUBLICPATH + _listaddresspublic[i],"w") as f2:
            f2.write("var {} = [\"{}\"]".format(_listvaraddress[i],str(networkaddress)))
        f2.close()
        with open(PUBLICPATH + _listabipublic[i],"w") as f2:
            f2.write("var {} = ".format(_listvarabiaddress[i]))
            json.dump(abi,f2)
        f2.close()
    f.close()


        


