const Token = artifacts.require("Token");
const dBank = artifacts.require("dBank");

//truffle console - interact with the deployed token

//await - function calls for async functions 
//BLockchains slow by function -- can just call token.deployed 
//Handle return value of async functions in variety of ways

module.exports = async function(deployer) {
	//deploy Token
	await deployer.deploy(Token)
	//assign token into variable to get it's address
	const token = await Token.deployed()        //Fetch the token just like in the console 
	
	//pass token address for dBank contract(for future minting)
	await deployer.deploy(dBank, token.address)

	//assign dBank contract into variable to get it's address
	const dbank = await dBank.deployed()

	//change token's owner/minter from deployer to dBank
	await token.passMinterRole(dbank.address)          // pass minter role to bank address
};