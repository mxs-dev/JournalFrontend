import { IOverlay } from './i.overlay';
import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

import { Subject } from 'rxjs/Rx';

@Component({
    selector: `overlay`,
    template: `
        <div (click)="onCloseListener()" class="close-btn"><i class="fa fa-times"></i></div>
        <ng-template #container></ng-template>
    `,
    styles: [`
        :host{
            z-index: 999;

            position: fixed;
            width: 100%;
            height: 100%;

            background-color: rgba(0, 0, 0, 0.5);

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .close-btn{
            position: absolute;
            top: 10px;
            right: 10px;
        }
        i{
            color: #444;
            margin: 0px;
            font-size: 30px;
        }
        i:hover{
            color: #000;
            cursor: pointer;
        }
    `] 
})
export class OverlayComponent implements IOverlay, OnDestroy{
    
    public onClose = new Subject<any>();

    @ViewChild('container', {read: ViewContainerRef}) private container :ViewContainerRef;

    public constructor( private componentFactoryResolver :ComponentFactoryResolver ){ }   

    public ngAfterViewInit(){
        console.log(this.container);
    }

    public insertComponent(componentType :Type<any>, data ?: any){
        let popupComponentFactory   = this.componentFactoryResolver.resolveComponentFactory(componentType);
        
        let popupComponentRef :ComponentRef<any> = this.container.createComponent(popupComponentFactory);
        popupComponentRef.instance.onClose.subscribe( () => {
            this.onClose.next();
        });
        popupComponentRef.instance.data = data;

        return popupComponentRef;
    }
    
    public ngOnDestroy(){
        console.log(`OverlayComponent Destroy!`);
    }

    public onCloseListener(){
        this.onClose.next(true);
    }    
}