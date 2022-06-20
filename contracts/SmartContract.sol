// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20//utils/SafeERC20.sol";

contract NftSmartContract is ERC721Enumerable, Ownable {

    using Strings for uint256;

    // VARIABLES
    address public caller;
    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    uint256 public maxSupply;
    uint256 public fee; // COST FOR MINT
    uint256 public counter;
   
    bool public pause;
    // BOOL REVEAL
    bool public revealed; // THE NFTs ARE REVEALED?

    // MAPPINGS
    mapping(address => bool) public blacklist; // THE ADDRESS IS BLACKLISTED?

    // CONSTRUCTOR
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _fee,
        uint256 _maxSupply,
        bool _revealed
    ) ERC721(_name, _symbol) {
        fee = _fee;
        revealed = _revealed;
        maxSupply = _maxSupply;
        pause = false;

        counter = 1;

        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        transferOwnership(caller);
        // Mint 1 NFT to the owner
        _mint(caller, 1);

    }

    // INTERNAL FUNCTIONS
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // MINT FUNCTION
    function mint(uint256 _mintAmount) public payable {
        counter = counter.mul(_mintAmount);
        require(pause != true, "The smart contract is paused!");
        require(blacklist[msg.sender] != true, "You are blacklisted!");
        require(counter < maxSupply, "no more NFTs available!");

        if(msg.sender == owner()) {
            // MINT
             _mint(msg.sender, _mintAmount);

        } else {
            require(msg.value == fee, "Pay the fee for mint!");
            _mint(msg.sender, _mintAmount);
        }
    }

        function airdropNfts(address[] memory wallets) public onlyOwner() {
        for(uint256 i = 0; i < wallets.length; i++) {
            address who = wallets[i];
            uint256 _counter = counter;
            counter++;
            _mint(who, 1);
            }
        }

    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
    {
        require(
        _exists(tokenId),
        "ERC721Metadata: URI query for nonexistent token"
        );
        
        if(revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }

    function _transfer(address from, address to, uint256 tokenId) internal virtual override {
    
        require(blacklist[from] == false || from == address(0), "You are blacklisted!");
        require(pause == false || from == address(0), "The transfer function is paused!");

        super._transfer(from,to,tokenId);
    }

    // REVEAL
    function reveal() public onlyOwner {
        require(revealed == false, "You can't reveal the collection");
        revealed = true;
    }

    function setCost(uint256 _cost) public onlyOwner {
        fee = _cost * 1 ether;
    }

    // SETTERS
    function pauseTheSmartContract(bool _pause) public onlyOwner {
        pause = _pause;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }
  
    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }
 
    function setBlacklistedAddress(address _who, bool _isBlacklisted) public onlyOwner {
        blacklist[_who] = _isBlacklisted;
    }
}