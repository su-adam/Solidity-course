const { assert } = require("chai")
const { deployments, ethers, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", async function () {
          let basicNFt, deployer

          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["mocks", "basicnft"])
              basicNft = await ethers.getContract("BasicNft")
          })

          it("Allows users to mint an NFT, and updates appropiately", async function () {
            const txResponse = await basicNft.mintNft()
            await txResponse.wait(1)
            const tokenURI = await basicNft.tokenURI(0)
            const tokenCounter = await basicNFt.getTokenCounter()

            assert.equal(tokenCounter.toString(), "1")
            assert.equal(tokenURI, await basicNft.TOKEN_URI())
          })
      })
