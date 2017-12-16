import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalService {
    public apiHost :string;
    public settings = {};

    public constructor () {
        if (environment.production == true) {
            this.apiHost = 'http://192.168.33.10/v1';
        } else {
            this.apiHost = 'http://192.168.33.10/v1';
        }
    }

    public loadGlobalSettings () :void {
        if (sessionStorage.getItem('frontend-settings') != null){
            this.settings = JSON.parse(sessionStorage.getItem('frontend-setting'));
        }
    }
}