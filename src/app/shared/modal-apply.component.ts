import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
export class ModalApply{
  searchText = "";
  @Output()
  closeModal = new EventEmitter()

  apply(id){
    // this.searchText = ''
    this.closeModal.emit(id)
    this.searchText = ""
  }
  inputChangeEvent(event:any){
    this.searchText = event
  }
}