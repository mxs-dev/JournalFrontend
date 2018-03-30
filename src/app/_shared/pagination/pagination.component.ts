import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
  styles: [`
    :host{
      display: flex;
    }
  `]
})
export class PaginationComponent {
  @Input() pager: any;
  
  public setPage (page: number) {
    this.pager.setPage(page);
  }
} 
