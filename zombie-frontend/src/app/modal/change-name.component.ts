import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'change-name',
  templateUrl: './change-name.component.html',
})
export class ChangeNameComponent {
  newName:string;

  editForm = this.fb.group({
    newName: [null, [Validators.required, Validators.maxLength(100)]]

  });

  constructor(private modal: NgbActiveModal, protected fb: FormBuilder) {

  }

  changeName() {
    this.newName = this.editForm.get(['newName']).value;
    console.log(this.newName);
    this.modal.close(this.newName);
  }


  close() {
    this.modal.dismiss();
  }
}
