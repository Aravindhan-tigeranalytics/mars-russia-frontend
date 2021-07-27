import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
export class ModalApply{
  searchText = "";
  @Output()
  closeModal = new EventEmitter()

  apply(id){
    this.closeModal.emit(id)
  }
  inputChangeEvent(event:any){
    this.searchText = event
  }
}