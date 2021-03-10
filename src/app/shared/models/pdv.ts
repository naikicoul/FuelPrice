export interface pdv {
    id: string;
    cp: string;
    latitude: number;
    longitude: number;
    adresse: string;
    horaires: any;
    prix: number | Array<number>;
    maj: string | Array<string>;
    services: any;
    ville: string;
    nom?: string;
}
