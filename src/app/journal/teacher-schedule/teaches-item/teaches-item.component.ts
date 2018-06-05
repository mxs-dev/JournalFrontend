import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { Teaches } from '../../../_shared/models';


@Component({
  selector: `app-teaches-item`,
  templateUrl: 'teaches-item.component.html'
})
export class TeachesItemComponent implements OnInit, OnDestroy {
  @Input() teaches: Teaches;
  @Input() moderAccess: boolean;

  public ngOnInit () {

  }


  public ngOnDestroy () {

  }
}

