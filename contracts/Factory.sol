// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./NftSmartContract.sol";


contract NftMintyFactory is Ownable {

    // VARIABLES
    uint256 public createFee;
    address[] public collections;
    NftSmartContract[] public collectionsObject;

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
        bool _revealed
        ) public payable {
        require(msg.value == createFee, "Pay the fee!");

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
    }

    // GETTERS
    function getLengthOfCollections() public view returns(uint256) {
        uint256 _v = collections.length;
        return _v;
        }

    function getCollectionObject() public view returns(NftSmartContract[] memory) {
        return collectionsObject;
    }
}

