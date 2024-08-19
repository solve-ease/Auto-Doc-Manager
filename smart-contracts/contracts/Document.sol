// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Document {
    using Counters for Counters.Counter;
    Counters.Counter private _documentIds;

    struct DocumentInfo {
        uint256 id;
        string ipfsHash;
        address issuingAuthority;
        address individualOwner;
        string documentType;
        uint256 issueDate;
        bool isVerified;
    }

    mapping(uint256 => DocumentInfo) public documents;
    mapping(address => uint256[]) public individualDocuments;

    event DocumentIssued(
        uint256 indexed documentId,
        address indexed issuingAuthority,
        address indexed individualOwner
    );
    event DocumentVerified(
        uint256 indexed documentId,
        address indexed verifyingAuthority
    );

    function issueDocument(
        string memory _ipfsHash,
        address _individualOwner,
        string memory _documentType
    ) public returns (uint256) {
        _documentIds.increment();
        uint256 newDocumentId = _documentIds.current();

        documents[newDocumentId] = DocumentInfo({
            id: newDocumentId,
            ipfsHash: _ipfsHash,
            issuingAuthority: msg.sender,
            individualOwner: _individualOwner,
            documentType: _documentType,
            issueDate: block.timestamp,
            isVerified: false
        });

        individualDocuments[_individualOwner].push(newDocumentId);

        emit DocumentIssued(newDocumentId, msg.sender, _individualOwner);

        return newDocumentId;
    }

    function verifyDocument(uint256 _documentId) public {
        require(
            !documents[_documentId].isVerified,
            "Document is already verified"
        );
        documents[_documentId].isVerified = true;
        emit DocumentVerified(_documentId, msg.sender);
    }

    function getDocument(
        uint256 _documentId
    ) public view returns (DocumentInfo memory) {
        return documents[_documentId];
    }

    function getIndividualDocuments(
        address _individual
    ) public view returns (uint256[] memory) {
        return individualDocuments[_individual];
    }
}
