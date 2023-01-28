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
            this.examinations = data;
            this.error = undefined;
            const today = new Date();
            let tmpDiff = 0;
            let tmpDiff2 = 0;

            let min = 1000000;
            let index = 0;
            for(let i = 0; i < data.length; i++){
                tmpDiff = Math.ceil((new Date(data[i].ExaminationDate__c).getTime() - today.getTime()) / (1000*3600*24));
                tmpDiff2 = Math.ceil((new Date(data[i].NextExaminationDate__c).getTime() - today.getTime()) / (1000*3600*24));
                
                // tmpDiff = Math.min((new Date(data[i].ExaminationDate__c) - today), (new Date(data[i].NextExaminationDate__c) - today));
                
                // tmpDiff2 = new Date(data[i].NextExaminationDate__c) - today;
                if (tmpDiff < min && tmpDiff >=0){
                    min = tmpDiff;
                    index = i;
                }else if (tmpDiff2 < min && tmpDiff2 >= 0){
                    min = tmpDiff2;
                    index = i;
                }
            }
            console.log('MIN: ' + min);
            this.vaccineName = data[index].Name;
            let daysTmp = 0;
            daysTmp = Math.ceil((new Date(data[index].ExaminationDate__c).getTime() - today.getTime()) / (1000*3600*24));
            console.log(daysTmp);
            if (daysTmp < 0){
                daysTmp = Math.ceil((new Date(data[index].NextExaminationDate__c).getTime() - today.getTime()) / (1000*3600*24));
                console.log('МЕНЬШЕ');
                console.log(daysTmp);
                this.daysBefore = daysTmp;
            }
            else if (daysTmp >= 0){
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