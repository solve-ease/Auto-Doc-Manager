// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract UserRoles is AccessControl {
    bytes32 public constant ISSUING_AUTHORITY_ROLE =
        keccak256("ISSUING_AUTHORITY_ROLE");
    bytes32 public constant VERIFYING_AUTHORITY_ROLE =
        keccak256("VERIFYING_AUTHORITY_ROLE");
    bytes32 public constant INDIVIDUAL_ROLE = keccak256("INDIVIDUAL_ROLE");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addIssuingAuthority(
        address account
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ISSUING_AUTHORITY_ROLE, account);
    }

    function addVerifyingAuthority(
        address account
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(VERIFYING_AUTHORITY_ROLE, account);
    }

    function addIndividual(address account) public {
        grantRole(INDIVIDUAL_ROLE, account);
    }

    function removeRole(
        bytes32 role,
        address account
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(role, account);
    }
}
