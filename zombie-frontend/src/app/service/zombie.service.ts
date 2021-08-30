import { Injectable } from '@angular/core';
import {CONST} from "../../environments/environment";
const Web3 = require('web3');
// const fs = require('fs');

declare let require: any;
declare let window: any;
const tokenAbi = require('../../contracts/ZombieOwnership.json');
// const zombieAbi = fs.readFileSync('../../contracts/ZombieOwnership.json', 'utf8');
// const abi = JSON.parse(tokenAbi);
@Injectable({
  providedIn: 'root'
})
export class ZombieService {

  web3: any;
  enable: any;
  account: any;

  cryptoZombies;
  userAccount;


  constructor() {
    console.log(tokenAbi);
    // console.log(abi);
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      console.log('transfer.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();

      // var cryptoZombiesAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
      var cryptoZombiesAddress = CONST.ZOMBIE_CONTRACT;

      this.cryptoZombies = new window.web3.eth.Contract(tokenAbi.abi, cryptoZombiesAddress);

    }
  }

  checkChangeAccount() {
    if(!this.userAccount)
      return false;
    const account = this.getAccount();
    if(account !== this.userAccount) {
      return true;
    }
    return false;
  }

  createRandomZombie(name) : Promise<any>{
    // This is going to take a while, so update the UI to let the user know
    // the transaction has been sent
    // $("#txStatus").text("Creating new zombie on the blockchain. This may take a while...");
    // Send the tx to our contract:
    console.log("create zombie form: " + this.userAccount);
    return this.cryptoZombies.methods.createRandomZombie(name)
      .send({ from: this.userAccount })
      .on("receipt", function(receipt) {
        console.log(receipt);
        // $("#txStatus").text("Successfully created " + name + "!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        // getZombiesByOwner(userAccount).then(displayZombies);
        return Promise.resolve(receipt);

      })
      .on("error", function(error) {
        // Do something to alert the user their transaction has failed
        // $("#txStatus").text(error);
        return Promise.resolve(error);
      });
  }

  // feedOnKitty(zombieId, kittyId) {
  //   // $("#txStatus").text("Eating a kitty. This may take a while...");
  //   return this.cryptoZombies.methods.feedOnKitty(zombieId, kittyId)
  //     .send({ from: this.userAccount })
  //     .on("receipt", function(receipt) {
  //       // $("#txStatus").text("Ate a kitty and spawned a new Zombie!");
  //       this.getZombiesByOwner(this.userAccount).then(displayZombies);
  //     })
  //     .on("error", function(error) {
  //       // $("#txStatus").text(error);
  //     });
  // }

  // function levelUp(zombieId) {
  //   // $("#txStatus").text("Leveling up your zombie...");
  //   return this.cryptoZombies.methods.levelUp(zombieId)
  //     .send({ from: this.userAccount, value: this.web3.utils.toWei("0.001", "ether") })
  //     .on("receipt", function(receipt) {
  //       // $("#txStatus").text("Power overwhelming! Zombie successfully leveled up");
  //     })
  //     .on("error", function(error) {
  //       // $("#txStatus").text(error);
  //     });
  // }

  getZombieDetails(id) {
    return this.cryptoZombies.methods.zombies(id).call()
  }

  zombieToOwner(id) {
    return this.cryptoZombies.methods.zombieToOwner(id).call()
  }

  public getZombiesByOwner(owner: any) {
    return this.cryptoZombies.methods.getZombiesByOwner(owner).call()
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    // if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);

        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    // }
    return Promise.resolve(this.account);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    this.userAccount = account;
    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err, balance) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        console.log(balance);
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          };
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }

  upLevel(id: any) : Promise<any> {
    return this.cryptoZombies.methods.levelUp(id).
    send({ from: this.userAccount ,
    value: CONST.WEI_UPLEVEL})
      .on("receipt", function(receipt) {
        console.log(receipt);
        // $("#txStatus").text("Successfully created " + name + "!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        // getZombiesByOwner(userAccount).then(displayZombies);
        return Promise.resolve(receipt);

      })
      .on("error", function(error) {
        // Do something to alert the user their transaction has failed
        // $("#txStatus").text(error);
        return Promise.resolve(error);
      });
  }

  changeName(id: any, name: string) : Promise<any> {
    return this.cryptoZombies.methods.changeName(id, name).
    send({ from: this.userAccount ,
      value: CONST.WEI_CHANGE_NAME})
      .on("receipt", function(receipt) {
        console.log(receipt);
        // $("#txStatus").text("Successfully created " + name + "!");
        // Transaction was accepted into the blockchain, let's redraw the UI
        // getZombiesByOwner(userAccount).then(displayZombies);
        return Promise.resolve(receipt);

      })
      .on("error", function(error) {
        // Do something to alert the user their transaction has failed
        // $("#txStatus").text(error);
        return Promise.resolve(error);
      });
  }

  transfer(id: any, address: string) : Promise<any> {
    return this.cryptoZombies.methods.transferTo(address, id).
    send({ from: this.userAccount})
      .on("receipt", function(receipt) {
        console.log(receipt);
        return Promise.resolve(receipt);
      })
      .on("error", function(error) {

        return Promise.resolve(error);
      });
  }
}
