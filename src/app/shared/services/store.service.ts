import { Injectable } from '@angular/core';

import { pdv } from '../models/pdv';

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    data: Array<pdv> = [];

}
