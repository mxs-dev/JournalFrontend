import { IOverlay } from './i.overlay';
import { Subject } from 'rxjs/Rx';
import { Component, OnDestroy } from '@angular/core';

@Component({
    selector: `overlay-test`,
    template: `
        <div class="head">Popup Window Header</div>
        <div class="content">
            <div class="img-container"><img src="http://positime.ru/wp-content/uploads/2016/12/full-maxresdefault-1472485492.jpg" alt="test image"></div>
            <div class="comments"> PopupWidow Comments (for photos)</div>
        </div>
    `,
    styles: [`
        :host{
            display: flex;
            flex-direction: column;

            height: 90%; 
            width: 80%;
            min-height: 500px;
            min-width: 600px;

            background-color: #eee;
            border-radius: 5px;
            padding: 5px;
        }
        .head{
            height: 30px;
            width: 100%;
        }
        .content{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
        }
        .img-container{
            width: 70%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .img-container img{
            width: 100%;
        }
        .comments{
            width: 30%;
            height: 100%;
        }
    `]
})
export class OverlayTestComponent implements IOverlay, OnDestroy{

    public onClose = new Subject<any>();

    public data :any;
    
    public ngOnDestroy(){
        console.log(`OverlayTest destroy!`);
    }
}