import { LightningElement, api } from 'lwc';
import START_DATE_FILED from '@salesforce/schema/Animal__c.AdoptationStartDate__c';
import END_DATE_FILED from '@salesforce/schema/Animal__c.AdoptationalEndDate__c';
import RECOMENDATIONS_FILED from '@salesforce/schema/Animal__c.AdaptationRecomendations__c';



export default class AdaptationForm extends LightningElement {
    fields = [START_DATE_FILED, END_DATE_FILED, RECOMENDATIONS_FILED];
    @api recordId;
    @api objectApiName;

}
