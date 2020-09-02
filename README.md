# RUBL Payment Token
Russian Rubble collateralized ERC20 stablecoin based on the Ethereum network.

## Smart Contract
RUBL is an ERC20 token that is Centrally Minted and Burned by the Issuer, representing the trusted party backing the token with Russian Ruble.

### ERC20 Token
The public interface of RUBL is the ERC20 interface specified by [EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md).

- `name()`
- `symbol()`
- `decimals()`
- `totalSupply()`
- `balanceOf(address who)`
- `transfer(address to, uint256 value)`
- `approve(address spender, uint256 value)`
- `allowance(address owner, address spender)`
- `transferFrom(address from, address to, uint256 value)`


### Additional Functionality
RUBL contract extends ERC20 specification to allow holders and issue to:
 *  the ability for holders to burn (destroy) their tokens
 *  a minter role that allows for token minting (creation)
 *  a pauser role that allows stopping all token transfers
 

The contract uses [AccessControl](https://github.com/OpenZeppelin/openzeppelin-contracts-ethereum-package/blob/master/contracts/access/AccessControl.sol) approach from well-known framework [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts-ethereum-package) to lock permissioned functions using the different roles - head to its documentation for details.

The account that deploys the contract will be granted the minter and pauser roles, as well as the default admin role, which will let it grant both minter and pauser roles to another accounts

### Contract upgrade

#### Upgradeability Proxy
To facilitate upgradeability on the immutable blockchain we follow a standard two-contract delegation pattern: a proxy contract represents the token, while all calls not involving upgrading the contract are delegated to an implementation contract.

The delegation uses delegatecall, which runs the code of the implementation contract in the context of the proxy storage. This way the implementation pointer can be changed to a different implementation contract while still keeping the same data and BUSD contract address, which are really for the proxy contract.

The proxy used here is AdminUpgradeabilityProxy from OpenZeppelin.

#### Upgrade Process
The implementation contract is only used for the logic of the non-admin methods. A new implementation contract can be set by calling `upgradeTo()` or `upgradeToAndCall()` on the proxy, where the latter is used for upgrades requiring a new initialization or data migration so that it can all be done in one transaction. You must first deploy a copy of the new implementation contract, which is automatically paused by its constructor to help avoid accidental calls directly to the proxy contract.


### GSN Compability 
RUBL is a fully GSN compatible contract (and the token as well) to provide easiest UX for the holders.

Ethereum Gas Station Network (GSN) abstracts away gas to minimize onboarding & UX friction for Dapps. With GSN, gasless clients can interact with Ethereum contracts without users needing ETH for transaction fees. The GSN is a decentralized system that improves Dapp usability without sacrificing security.


## External API

### Call methods
* [`MINTER_ROLE()`](API.md#MINTER_ROLE)
* [`PAUSER_ROLE()`](API.md#PAUSER_ROLE)
* [`allowance(owner, spender)`](API.md#allowanceowner-spender)
* [`balanceOf(account)`](API.md#balanceOfaccount)
* [`decimals()`](API.md#decimals)
* [`getRoleAdmin(role)`](API.md#getRoleAdminrole)
* [`getRoleMember(role, index)`](API.md#getRoleMemberrole-index)
* [`getRoleMemberCount(role)`](API.md#getRoleMemberCountrole)
* [`hasRole(role, account)`](API.md#hasRolerole-account)
* [`name()`](API.md#name)
* [`paused()`](API.md#paused)
* [`symbol()`](API.md#symbol)
* [`totalSupply()`](API.md#totalSupply)

### Transaction methods
* [`approve(spender, amount)`](API.md#approvespender-amount)
* [`burn(uint256 amount)`](API.md#burnamount)
* [`burnFrom(account, amount)`](API.md#burnFromaccount-amount)
* [`decreaseAllowance(spender, subtractedValue)`](API.md#decreaseAllowancespender-subtractedValue)
* [`grantRole(role, account)`](API.md#grantRolerole-account)
* [`increaseAllowance(spender, addedValue)`](API.md#increaseAllowancespender-addedValue)
* [`initialize(name, symbol)`](API.md#initializename-symbol)
* [`mint(to, amount)`](API.md#mintto-amount)
* [`renounceRole(role, account)`](API.md#renounceRolerole-account)
* [`revokeRole(role, account)`](API.md#revokeRolerole-account)
* [`transfer(recipient, amount)`](API.md#transferrecipient-amount)
* [`transferFrom(sender, recipient, amount)`](API.md#transferFromsender-recipient-amount)
* [`pause()`](API.md#pause)
* [`unpause()`](API.md#unpause)


## Interaction and usage
To interact with RUBL Token smart-contracts ensure about OpenZeppelin SDK installation. 

```bash
oz --version # should be at least 2.8.2 or higher.
``` 

If OpenZeppelin SDK is available go to the root of the current repository and execute compilation:

```bash
oz compile && ls build/contracts
# Should prints this:
# AccessControlUpgradeSafe.json
# ContextUpgradeSafe.json
# ERC20PausableUpgradeSafe.json
# EnumerableSet.json
# Initializable.json
# RublTokenV0_UpgradeSafe.json
# Address.json
# ERC20BurnableUpgradeSafe.json
# ERC20UpgradeSafe.json
# IERC20.json
# PausableUpgradeSafe.json
# SafeMath.json
```

Create `env.sh` file in root of project and paste next inside:
```bash
#!/bin/bash
export PRIVATE_KEY=<YOUR_PRIVATE_KEY>
export INFURA_ROPSTEN=<INFURA_ROPSTEN_PROJECT_KEY>
export INFURA_MAINNET=<INFURA_MAINNET_PROJECT_KEY>
```

Setup permissions to execute it with `chmod +x env.sh` and run:

```bash
source env.sh
```

Now you're ready to interact with contracts:

```bash
oz [call|send-tx] # to execute\call some methods
```
