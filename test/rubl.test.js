const { accounts, contract } = require("@openzeppelin/test-environment");
require("@openzeppelin/test-helpers");

const { expect } = require('chai');
const { describe, it } = require('mocha');

const RublTokenV0_UpgradeSafe = contract.fromArtifact('RublTokenV0_UpgradeSafe');

describe("RUBL Token", function () {
  const [owner, userA, userB] = accounts;

  this.beforeEach(async function () {
    console.log(RublTokenV0_UpgradeSafe);
    this.token = await RublTokenV0_UpgradeSafe.new();
    await this.token.initialize("RUBL Token", "RUBL");
  })

  it("try to create", async function () {
    console.log(this.token);
  })
})
