# RUBL Token API Reference

## Call methods

### `MINTER_ROLE()`

Returns binary representation of `MINTER_ROLE` which requires to execute some methods on token

### `PAUSER_ROLE()`

Returns binary representation of `PAUSER_ROLE` which requires to execute some methods on token

### `allowance(owner, spender)`

Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through [`transferFrom`](#transferFromspender-recipient-amount).

This is zero by default.

This value changes when [`approve`](#approvespender-amount) or [`transferFrom`](#transferFromspender-recipient-amount) are called.

### `balanceOf(account)`

Returns the amount of tokens owned by `account`

### `decimals()`

Returns the number of decimals used to get its user representation.

For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5,05` (`505 / 10 ** 2`).

> **NOTE**: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including [`balanceOf`](#balanceOfaccount) and [`transfer`](#transferrecipient-amount).

### `getRoleAdmin(role)`

Returns the admin role that controls `role`. See [`grantRole`](#grantRolerole-account) and [`revokeRole`](#revokeRolerole-account).

### `getRoleMember(role, index)`

Returns one of the accounts that have `role`. `index` must be a value between 0 and [`getRoleMemberCount`](#getRoleMemberCountrole), non-inclusive.

Role bearers are not sorted in any particular way, and their ordering may change at any point.

> **WARNING**: When using [`getRoleMember`](#getRoleMemberrole-index) and [`role-indexCount`](#getRoleMemberCountrole), make sure you perform all queries on the same block. See the following [forum post](https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296) for more information.

### `getRoleMemberCount(role)`

Returns the number of accounts that have `role`. Can be used together with [`getRoleMember`](#getRoleMemberrole-index) to enumerate all bearers of a role.

### `hasRole(role, account)`

Returns `true` if `account` has been granted `role`

### `name()`

Returns the name of the token

### `paused()`

Returns `true` if the contract is paused, and `false` otherwise

### `symbol()`

Returns the symbol of the token, usually a shorter version of the [`name`](#name)

### `totalSupply()`

Returns the amount of tokens in existence

## Transaction methods

### `approve(spender, amount)`

Sets `amount` as the allowance of `spender` over the caller's tokens.

Returns a boolean value indicating whether the operation succeeded.
Emits an `Approval` event.

> IMPORTANT: Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: [EIP20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)

### `burn(uint256 amount)`

Destroys `amount` tokens from the caller. Caller must have at least `amount` tokens.

Emits a {Transfer} event with `to` set to the zero address

### `burnFrom(account, amount)`

Destroys `amount` tokens from `account`, deducting from the caller's allowance. The caller must have allowance for `accounts`'s tokens of at least `amount`. The `account` must have at least `amount` tokens.

### `decreaseAllowance(spender, subtractedValue)`

@Atomically decreases the allowance granted to `spender` by the caller.

This is an alternative to [`approve`](#approvespender-amount) that can be used as a mitigation for problems described in [`approve`](#approvespender-amount).

Emits an `Approval` event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.
- `spender` must have allowance for the caller of at least
  `subtractedValue`.

### `grantRole(role, account)`

Grants `role` to `account`.
If `account` had not been already granted `role`, emits a `RoleGranted` event.

Requirements:

- the caller must have `role`'s admin role.

### `increaseAllowance(spender, addedValue)`

Atomically increases the allowance granted to `spender` by the caller.

This is an alternative to [`approve`](#approvespender-amount) that can be used as a mitigation for problems described in [`approve`](#approvespender-amount).

Emits an `Approval` event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.

### `initialize(name, symbol)`

Calls at the begining of the live cycle of the contract

Setups:

1. Token name and symbol
2. Roles to the creator

### `mint(to, amount)`

Creates `amount` new tokens for `to` and increasing the total supply.

Emits a `Transfer` event with `from` set to the zero address.

Requirements:

- the caller must have the `MINTER_ROLE`.

### `renounceRole(role, account)`

Revokes `role` from the calling account.

Roles are often managed via [`grantRole`](#grantRolerole-account) and [`revokeRole`](#grantRolerole-account): this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised _(such as when a trusted device is misplaced)_.

If the calling account had been granted `role`, emits a `RoleRevoked` event.

Requirements:

- the caller must be `account`.

### `revokeRole(role, account)`

Revokes `role` from `account`.

If `account` had been granted `role`, emits a `RoleRevoked` event.

Requirements:

- the caller must have `role`'s admin role.

### `transfer(recipient, amount)`

Moves `amount` tokens from the caller's account to `recipient`.
Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event.

Requirements:

- `recipient` cannot be the zero address.
- the caller must have a balance of at least `amount`.

### `transferFrom(sender, recipient, amount)`

Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance.

Emits a `Transfer` event.

Requirements:

- `recipient` cannot be the zero address.
- `sender` must have a balance of at least `amount`.
- `sender` must have a balance of at least `amount`.
- The caller must have allowance for `sender`'s tokens of at least `amount`

### `pause()`

Pauses all token transfers.

Emits a `Paused` event.

Requirements:

- the caller must have the `PAUSER_ROLE`.

### `unpause()`

Unpauses all token transfers.

Emits a `Unpaused` event.

Requirements:

- the caller must have the `PAUSER_ROLE`.
