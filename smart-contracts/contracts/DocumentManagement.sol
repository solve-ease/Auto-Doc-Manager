// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserRoles.sol";
import "./Document.sol";

contract DocumentManagement is UserRoles, Document {
    constructor() UserRoles() {}

    function issueDocument(
        string memory _ipfsHash,
        address _individualOwner,
        string memory _documentType
    ) public onlyRole(ISSUING_AUTHORITY_ROLE) returns (uint256) {
        return super.issueDocument(_ipfsHash, _individualOwner, _documentType);
    }

    function verifyDocument(
        uint256 _documentId
    ) public onlyRole(VERIFYING_AUTHORITY_ROLE) {
        super.verifyDocument(_documentId);
    }

    function getDocument(
        uint256 _documentId
    )
        public
        view
        onlyRole(VERIFYING_AUTHORITY_ROLE)
        returns (DocumentInfo memory)
    {
        return super.getDocument(_documentId);
    }

    function getMyDocuments()
        public
        view
        onlyRole(INDIVIDUAL_ROLE)
        returns (uint256[] memory)
    {
        return super.getIndividualDocuments(msg.sender);
    }
}
