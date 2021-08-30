import { Component } from '@angular/core';
import {ZombieService} from "./service/zombie.service";
import {CONST} from "../environments/environment";
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ChangeNameComponent} from "./modal/change-name.component";
import {ConfirmDialogComponent} from "./confirm/confirm-dialog.component";
import {ChangeAddressComponent} from "./address-modal/change-address.component";



interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ZombieService]
})
export class AppComponent {
  title = 'bookfe2';

  userBalance;
  userAccount;

  zombieName: string = '';

  countries = COUNTRIES;
  myZombies : any[];

  protected ngbModalRef: NgbModalRef;

  constructor(private zombieService : ZombieService, private modalService: NgbModal) {
    var accountInterval = setInterval(function() {

      // console.log("interval call", this.userAccount);
      // if(zombieService.checkChangeAccount()) {
      //   console.log(zombieService.checkChangeAccount());
      //   this.getUserBalance();
      // }
    }, 100);

    this.getUserBalance();

  }

  displayZombies(ids) {
    // $("#zombies").empty();
    console.log("zombieId:" + ids);
    for (let id of ids) {
      this.zombieService.getZombieDetails(id).then(res => {
        console.log("zombie detail");
        console.log(res);
        res.id = id;
        res.timeReadyDate = this.toDateTime(res.readyTime);
        this.myZombies.push(res);
      });
    }
  }

  toDateTime(secs) {
    if(!secs)
    if(!secs)
      return null;
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  public getZombieDetails(id) : Promise<any>{
    console.log("get zombie detail: " + id);
    return Promise.resolve(this.zombieService.getZombieDetails(id));
  }

  createNewZombie() {
    console.log("create zombie with name: " + this.zombieName);
    this.zombieService.createRandomZombie(this.zombieName).then(res => {
      console.log("create zombie success");
      console.log(res);
      this.getZombieList();
    }, error => {
      console.log("creat zombie fail");
      console.log(error);
    });
  }

  getZombieList() {
    this.myZombies = [];
    this.zombieService.getZombiesByOwner(this.userAccount)
      .then(res => {
        this.displayZombies(res);
      });
  }

  getUserBalance() {
    this.zombieService.getUserBalance().then(res => {
      console.log("success");
      console.log(res);
      this.userBalance = res.balance/CONST.WEI;
      this.userAccount = res.account;
      this.getZombieList();
    }, error => {
      console.log("error");
      console.log(error);
    })
  }

  upLevel(zombie: any) {
    this.ngbModalRef = this.modalService.open(ConfirmDialogComponent as Component, {
      backdrop: 'static'
    });
    this.ngbModalRef.componentInstance.message ='You need 0.5 ETH to upgrade Level!';
    this.ngbModalRef.result.then(
      result => {
        this.ngbModalRef = null;
        this.zombieService.upLevel(zombie.id).then(res => {
          console.log(res);
          this.getZombieList();
        });
      },
      reason => {
        this.ngbModalRef = null;
      }
    );


  }

  changeName(zombie: any) {

    this.ngbModalRef = this.modalService.open(ConfirmDialogComponent as Component, {
      backdrop: 'static'
    });
    this.ngbModalRef.componentInstance.message ='You need 0.25 ETH to Change Zombie Name!';
    this.ngbModalRef.result.then(
      result => {
        this.ngbModalRef = null;
        this.confirmChangeName(zombie);
      },
      reason => {
        this.ngbModalRef = null;
      }
    );



  }

  confirmChangeName(zombie: any) {
    this.modalService.open(ChangeNameComponent as Component, {backdrop: 'static',size: 'md', keyboard: false, centered: true})
      .result.then((result) => {
      console.log(result);
      this.zombieService.changeName(zombie.id, result).then(res => {
        console.log(res);
        this.getZombieList();
      });
    }, (reason) => {

    });
  }

  transfer(zombie: any) {
    this.ngbModalRef = this.modalService.open(ChangeAddressComponent as Component, {
      backdrop: 'static'
    });
    // this.ngbModalRef.componentInstance.message ='Are you sure to change';
    this.ngbModalRef.result.then(
      result => {
        this.ngbModalRef = null;
        console.log("address" + result);
        this.confirmTransder(zombie, result);
      },
      reason => {
        this.ngbModalRef = null;
      }
    );
  }

  confirmTransder(zombie: any, address: string) {
    this.zombieService.transfer(zombie.id, address).then(res => {
      console.log(res);
      this.getZombieList();
    })
  }

}
