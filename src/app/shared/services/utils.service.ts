import { Injectable } from '@angular/core';

import { pdv } from '../models/pdv';
import { pdv_request } from '../models/pdv_request';
import { VILLES_ID } from '../assets/villes_id';
import { PDV_NOMS } from '../assets/pdv_noms';
import { PDV_ADDONS } from '../assets/pdv_addons';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    mapPDV_RequestToPDV(pdv_request: pdv_request): pdv {
        return <pdv>{
            id: !!pdv_request.ID[0] ? pdv_request.ID[0] : '',
            cp: !!pdv_request.CP[0] ? pdv_request.CP[0] : '',
            latitude: !!pdv_request.LATITUDE[0] ? parseInt(pdv_request.LATITUDE[0]) : 0,
            longitude: !!pdv_request.LONGITUDE[0] ? parseInt(pdv_request.LONGITUDE[0]) : 0,
            adresse: !!pdv_request.adresse[0] ? this.getAdress(pdv_request) : '',
            ville: !!pdv_request.ville && !!pdv_request.ville[0] ? this.getTown(pdv_request) : '',
            horaires: pdv_request.horaires,
            services: pdv_request.services,
            prix: !!pdv_request.prix ? this.getPrice(pdv_request.prix) : 0,
            maj: !!pdv_request.prix ? this.getMAJ(pdv_request.prix) : 'NA',
            nom: this.getName(pdv_request)
        };
    }

    filterResults(unfiltered_results: Array<pdv_request>): Array<pdv_request> {
        let results: Array<pdv_request> = [];
        results = unfiltered_results.filter((pdv: pdv_request) => {
            if (VILLES_ID.findIndex(id => id === pdv.ID[0]) !== -1) {
                return pdv;
            }
            else {
                return null;
            }
        });
        return results;
    }

    private getPrice(prices: Array<any>): number {
        let result: number = 0;
        prices.map(price => {
            if (price.NOM[0] === 'E10') {
                const tempValue: string = price.VALEUR[0];
                if (tempValue.includes('.') || tempValue.includes(',')) {
                    result = parseFloat(tempValue);
                }
                else {
                    result = parseInt(tempValue)/1000;
                }
            }
        });
        return result;
    }

    private getMAJ(prices: Array<any>): string {
        let result: string = '';
        prices.map(price => {
            if (price.NOM[0] === 'E10') {
                result = price.MAJ[0];
            }
        });
        return result;
    }

    private getAdress(pdv_request: pdv_request): string {
        let address: string|undefined = pdv_request.adresse[0];
        PDV_ADDONS.map(addon => {
            if (addon.ID === pdv_request.ID[0]) {
                Object.keys(addon).forEach(key => {
                    if (key === 'adresse') {
                        address = addon[key];
                    }
                });
            }
        });
        return address;
    }

    private getTown(pdv_request: pdv_request): string {
        let town: string|undefined = pdv_request.ville[0];
        PDV_ADDONS.map(addon => {
            if (addon.ID === pdv_request.ID[0]) {
                Object.keys(addon).forEach(key => {
                    if (key === 'ville') {
                        town = addon[key];
                    }
                });
            }
        });
        return town;
    }

    private getName(pdv_request: pdv_request): string {
        let name: string = '';
        Object.keys(PDV_NOMS).forEach(key => {
            if (key === pdv_request.ID[0]) {
                name = PDV_NOMS[key];
            }
        });
        return name;
    }

}
