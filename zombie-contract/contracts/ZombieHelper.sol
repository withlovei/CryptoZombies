pragma solidity >=0.5.0 <0.6.0;

import "./ZombieFeeding.sol";

contract ZombieHelper is ZombieFeeding {

    uint levelUpFee = 0.5 ether;

    modifier aboveLevel(uint _level, uint _zombieId) {
        require(zombies[_zombieId].level >= _level);
        _;
    }

//    function withdraw() external onlyOwner {
//        address payable _owner = owner();
//        _owner.transfer(address(this).balance);
////        payable(_owner).transfer(address(this).balance);
//    }

    function transfer(address payable _address, uint value) payable public{
        _address.transfer(value);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function levelUp(uint _zombieId) public payable {
        require(msg.value == levelUpFee, 'You dont enough Ether value');
        zombies[_zombieId].level = zombies[_zombieId].level.add(1);
//        transfer(msg.sender, levelUpFee);
    }

    function changeName(uint _zombieId, string memory _newName) public payable aboveLevel(2, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].name = _newName;
    }

    function changeDna(uint _zombieId, uint _newDna) external aboveLevel(10, _zombieId) onlyOwnerOf(_zombieId) {
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerZombieCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getZombiesNotOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](10);
        uint counter = 0;
        for (uint i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] != _owner) {
                result[counter] = i;
                counter++;
            }
            if(counter >= 10)
                break;
        }
        return result;
    }

}
