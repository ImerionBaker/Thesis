public with sharing class HealthController {
    
    @AuraEnabled(cacheable=true scope='global')
    public static MedicalExamination__c[] getAllExaminationDates(String animalId) {
        return [
            SELECT Id, Animal__r.Name,Animal__r.Id, Animal__c, Name, ExaminationDate__c, NextExaminationDate__c FROM MedicalExamination__c WHERE Animal__r.Id =:animalId AND (ExaminationDate__c >= TODAY OR NextExaminationDate__c >= TODAY)
        ];
    }
}