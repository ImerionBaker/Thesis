import { LightningElement, api } from 'lwc';
import START_DATE_FILED from '@salesforce/schema/Animal__c.AdoptationStartDate__c';
import END_DATE_FILED from '@salesforce/schema/Animal__c.AdoptationalEndDate__c';
import RECOMENDATIONS_FILED from '@salesforce/schema/Animal__c.AdaptationRecomendations__c';
import FIRST_NAME_FILED from '@salesforce/schema/Animal__c.PetOwnerFirstName__c';
import LAST_NAME_FIELD from '@salesforce/schema/Animal__c.PetOwnerLastName__c';
import EMAIL_FIELD from '@salesforce/schema/Animal__c.PetOwnerEmail__c';
import PHONE_FIELD from '@salesforce/schema/Animal__c.PetOwnerPhone__c';
import ADDRESS_FIELD from '@salesforce/schema/Animal__c.PetOwnerAddress__c';





export default class AdaptationForm extends LightningElement {
    fields = [START_DATE_FILED, END_DATE_FILED, RECOMENDATIONS_FILED, FIRST_NAME_FILED, LAST_NAME_FIELD, EMAIL_FIELD, PHONE_FIELD, ADDRESS_FIELD];
    @api recordId;
    @api objectApiName;

}