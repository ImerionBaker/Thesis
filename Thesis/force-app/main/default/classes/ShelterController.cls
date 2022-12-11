public with sharing class ShelterController {
    @AuraEnabled
    public static Shelter getAddress(){
        return [SELECT ShelterCity__c, ShelterCountry__c, ShelterPostalCode__c, Shelter_Street__c FROM Shelter__c WHERE Id =:recordId LIMIT 1];
    }
}
