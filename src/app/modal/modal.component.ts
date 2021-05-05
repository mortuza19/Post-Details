import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title: string= '';
  body: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  addPost() {
    let newPost = {
      userId: 11,
      id: 101,
      title: this.title,
      body: this.body
    };
    this.title = '';
    this.body = '';
    this.activeModal.close(newPost);
  }

}
