import { Component, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {
  message: string;
  id: number;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  confirm() {
    this.activeModal.close('close');
  }

  hide() {
    this.activeModal.dismiss();
  }
}
