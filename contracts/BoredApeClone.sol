// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

interface IBoredApeClone {
    function setMinter(address _minter) external;

    function mint(address to, uint256 quantity) external;

    function setBaseURI(string memory _baseURI) external;
}

contract BoredApeClone is IBoredApeClone, Ownable, ERC721A {
    using Strings for uint256;
    address public minter;
    uint256 maxTotalSupply = 10000;
    string public baseURI;

    constructor() ERC721A("Bored Ape Clone", "BAC") {
        minter = msg.sender;
    }

    // MODIFIER
    modifier onlyMinter() {
        require(msg.sender == minter, "only minter");
        _;
    }

    // MINTER FUNCTIONS
    function mint(address to, uint256 quantity) external onlyMinter {
        require(
            totalSupply() + quantity <= maxTotalSupply,
            "exceeds total supply"
        );
        _safeMint(to, quantity);
    }

    // ADMIN FUNCTIONS
    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }

    function setBaseURI(string memory __baseURI) external onlyOwner {
        baseURI = __baseURI;
    }

    // USER FUNCTIONS
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for non existent token"
        );
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }
}
