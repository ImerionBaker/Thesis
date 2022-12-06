import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getAllExaminationDates from '@salesforce/apex/HealthController.getAllExaminationDates';
import ANIMAL_ID from '@salesforce/schema/Animal__c.Id'


export default class NextMedicalDate extends LightningElement {
    @api recordId;
    vaccineName;
    daysBefore;
    

    //get Medical Examinates of current animal and calculate dates before next examinate/vaccine
    @wire(getAllExaminationDates, { animalId: '$recordId' })
    wiredExaminations({ error, data }) {
        if (data && data.length != 0) {
            console.log(data);
            this.examinations = data;
            this.error = undefined;
            const today = new Date();
            let tmpDiff = 0;

            let min = new Date(data[0].NextExaminationDate__c) - today;
            let index = 0;
            for(let i = 0; i < data.length; i++){
                tmpDiff = new Date(data[i].NextExaminationDate__c) - today;
                if (tmpDiff < min){
                    min = tmpDiff;
                    index = i;
                }
            }

            this.vaccineName = data[index].Name;
            let daysTmp = 0;
            daysTmp = Math.ceil((new Date(data[index].NextExaminationDate__c).getTime() - today.getTime()) / (1000*3600*24));
            if (daysTmp >= 0){
                this.daysBefore = daysTmp;
            }else{
                this.daysBefore = '-';
            }
        } else {
            this.vaccineName = '-';
            this.daysBefore = '-';
        }
    }


}