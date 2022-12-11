import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import COUNTRY_FIELD from '@salesforce/schema/Shelter__c.ShelterCountry__c';
import CITY_FIELD from '@salesforce/schema/Shelter__c.ShelterCity__c';
import STREET_FIELD from '@salesforce/schema/Shelter__c.ShelterStreet__c';
import POSTAL_CODE_FIELD from '@salesforce/schema/Shelter__c.ShelterPostalCode__c';



export default class Map extends LightningElement {
    @api recordId;
    address;
    mapMarkers;
    zoomLevel;
    listView;



    @wire(getRecord, { recordId: '$recordId', fields: [COUNTRY_FIELD, CITY_FIELD, STREET_FIELD, POSTAL_CODE_FIELD] })
    getAddress({error, data}){
        if(data){
            this.address = data.fields;
            console.log(this.address.ShelterCity__c.value);
            this.mapMarkers = [
                {
                    location: {
                        City: data.fields.ShelterCity__c.value,
                        Country: data.fields.ShelterCountry__c.value,
                        PostalCode: data.fields.ShelterPostalCode__c.value,
                        Street: data.fields.ShelterStreet__c.value,
                    },
                },
            ];
            this.zoomLevel = 15;
            this.listView = "visible";
        }else if (error){
            this.address = undefined;
        }
    }



}