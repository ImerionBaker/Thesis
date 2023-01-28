public with sharing class AnimalController {
    @AuraEnabled(cacheable=true scope='global')
    public static Animal__c[] getAllAnimals() {
        return [
            SELECT Id, Name, Age__c, Sex__c, Height__c, Weight__c, KindAnimal__c FROM Animal__c ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true scope='global')
    public static Animal__c[] searchAnimals(String searchTerm, String color) {
        // Return all animals when no search term
        String query = '';
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllAnimals();
        }


        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        String resultQuery = 'SELECT Id, Name, Age__c, Sex__c, Height__c, Weight__c, KindAnimal__c FROM Animal__c WHERE Name LIKE \''+ searchTerm + '\'' + ' ORDER BY Name';

        // Execute search query
        return (List<Animal__c>)Database.query(resultQuery);
        
    }

}