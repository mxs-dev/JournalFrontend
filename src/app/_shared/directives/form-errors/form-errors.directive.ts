import { Directive, ComponentFactoryResolver, ElementRef, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';

import { FormErrorComponent } from './form-error.component';

import { Subject } from 'rxjs';

@Directive({
  selector: '[FormErrors]',
})
export class FormErrorsDirective implements OnInit, OnDestroy {

  public errors: any[];

  protected errorComponents: FormErrorComponent[];

  protected componentDestroyed = new Subject<void>();

  public constructor (
    private element: ViewContainerRef,
    private factoryResolver: ComponentFactoryResolver
  ) {}


  public ngOnInit () {
    const componentFactory = this.factoryResolver.resolveComponentFactory(FormErrorComponent);

    this.errors.forEach(error => {
      const errorComponent = this.element.createComponent(componentFactory);
      this.errorComponents.push(errorComponent);
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
