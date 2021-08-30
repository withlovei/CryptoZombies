import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'change-address',
  templateUrl: './change-address.component.html',
})
export class ChangeAddressComponent {
  newName:string;

  editForm = this.fb.group({
    newName: [null, [Validators.required, Validators.maxLength(100)]]

  });

  constructor(private modal: NgbActiveModal, protected fb: FormBuilder) {

  }

  transfer() {
    this.newName = this.editForm.get(['newName']).value;
    if(!this.newName)
      return;
    console.log(this.newName);
    this.modal.close(this.newName);
  }


  close() {
    this.modal.dismiss();
  }
}
