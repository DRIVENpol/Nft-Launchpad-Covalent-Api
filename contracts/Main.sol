// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NftMintyFactory is Ownable {

    // VARIABLES
    uint256 public createFee;
    address[] public collections;
    NftSmartContract[] public collectionsObject;

    struct MyCollection {
        address _address;
        string _name;
        string _symbol;
        string _cBanner;
        string _description;
        address _owner;
        string _website;
        string _twitterLink;
        string _discordLink;
        uint256 _totalSupply;
        bool _revealed;
   }

   MyCollection[] public theCollections;

    // CONSTRUCTOR 
    constructor() {
        createFee = 1 ether;
    }

    // ONLY-OWNER FUNCTIONS
    function setNewFee(uint256 _newFee) public onlyOwner {
        uint256 _n = _newFee * 1 ether;
        createFee = _n;
    }

    function withdrawMaticFees() public onlyOwner() {
        uint256 cBalance = payable(address(this)).balance;
        payable(address(owner())).transfer(cBalance);
    }

        function _withdrawMaticFees() private {
        uint256 cBalance = payable(address(this)).balance;
        payable(address(owner())).transfer(cBalance);
    }


    function withdrawErc20Tokens(IERC20 _tAddress) public onlyOwner() {
        address _to = owner();
        uint256 _tBalance = _tAddress.balanceOf(address(this));
        _tAddress.transferFrom(address(this), _to, _tBalance);
    }

    // ALOW SC TO RECEIVE MATIC
    receive() external payable {
       _withdrawMaticFees();
    }

    // PUBLIC FUNCTIONS
    function createCollection(
        string memory _name,
        string memory _symbol,
        string memory _cBanner,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _fee,
        uint256 _maxSupply,
        bool _revealed,
        string memory _description,
        string memory _website,
        string memory _twitterLink,
        string memory _discordLink
        ) public {
        // require(msg.value == createFee, "Pay the fee!");

        address newCollection = address(new NftSmartContract(
            _name,
            _symbol,
            _cBanner,
            _initBaseURI,
            _initNotRevealedUri,
            _fee,
            _maxSupply,
            _revealed,
            msg.sender
        ));

        collections.push(newCollection);
        collectionsObject.push(NftSmartContract(newCollection));
        theCollections.push(MyCollection(newCollection, _name, _symbol, _cBanner, _description, msg.sender, _website, _twitterLink, _discordLink, _maxSupply, _revealed));
    }

    // GETTERS
    function getLengthOfCollections() public view returns(uint256) {
        uint256 _v = collections.length;
        return _v;
        }

    function getCollectionObject() public view returns(NftSmartContract[] memory) {
        return collectionsObject;
    }

    function getCollectionAddress(uint256 _i) public view returns(address) {
        return collections[_i];
    }

    function getCollectionProps(uint256 index) public view returns(address, string memory, string memory, string memory, string memory, address, string memory, string memory, string memory, uint256, bool){
        MyCollection memory myColl;

        myColl = theCollections[index];
        
        return (
            myColl._address,
            myColl._name,
            myColl._symbol,
            myColl._cBanner,
            myColl._description,
            myColl._owner,
            myColl._website,
            myColl._twitterLink,
            myColl._discordLink,
            myColl._totalSupply,
            myColl._revealed
        );
    }
}


contract NftSmartContract is ERC721Enumerable, Ownable {

    // USING LIBRARIES
    using Strings for uint256;
    using SafeMath for uint256;


    // VARIABLES
    address public caller;

    string public cName;
    string public cSymbol;
    string public cBanner;

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
        string memory _cBanner,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        uint256 _fee,
        uint256 _maxSupply,
        bool _revealed,
        address _caller
    ) ERC721(_name, _symbol) {

        cName = _name;
        cSymbol = _symbol;
        cBanner = _cBanner;

        fee = _fee;
        revealed = _revealed;
        maxSupply = _maxSupply;
        pause = false;

        counter = 1;

        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        transferOwnership(_caller);
        // Mint 1 NFT to the owner
        _mint(_caller, 0);

    }

    // INTERNAL FUNCTIONS
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // MINT FUNCTION
    function mintNft(uint256 _mintAmount) public payable {
        require(_mintAmount != 0);
        // uint256 _counter = counter.add(_mintAmount);
        uint256 supply = totalSupply();
        require(pause != true, "The smart contract is paused!");
        require(blacklist[msg.sender] != true, "You are blacklisted!");
        require(supply + _mintAmount < maxSupply, "No more NFTs available!");

        if(msg.sender == owner()) {
            // MINT
             for (uint256 i = 1; i <= _mintAmount; i++){
                 _safeMint(msg.sender, supply + 1);
            }
            

        } else {
            // require(msg.value == fee * _mintAmount, "Pay the fee for mint!"); REMOVED FOR TESTING
                for (uint256 i = 1; i <= _mintAmount; i++){
                        _safeMint(msg.sender, supply + i);
                    }
        }
    }

        function airdropNfts(address airdropWallets) public onlyOwner() {
        // require(_mintAmount != 0);
        // uint256 _counter = counter.add(_mintAmount);
        uint256 supply = totalSupply();
        // require(pause != true, "The smart contract is paused!");
        // require(blacklist[msg.sender] != true, "You are blacklisted!");
        // require(supply + airdropWallets.length < maxSupply, "No more NFTs available!");

        //     // MINT
        //      for(uint256 i = 0; i < airdropWallets.length; i++) {
        //          address wallet = airdropWallets[i];
                 _safeMint(airdropWallets, supply + 1);
            // }
    
        }

    // WALLET OF THE OWNER
    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    // DISPLAY URI
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

    function newBanner(string memory _newBanner) public onlyOwner {
        cBanner = _newBanner;
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
 
    function setBlacklistedAddress(address _who) public onlyOwner {
        blacklist[_who] = true;
    }

    // GETTER
    function getOwner() public view returns(address) {
        return owner();
    }

    function getCollectionDetails() public view returns(address, string memory, string memory, string memory, uint256, uint256) {
        return(
            address(this),
            cName,
            cSymbol,
            cBanner,
            maxSupply,
            counter
        );
    }

    function getMintedAmount() public view returns(uint256) {
        uint256 _sup = totalSupply();
        return _sup;
    }
}
