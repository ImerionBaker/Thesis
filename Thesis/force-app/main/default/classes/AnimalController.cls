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
        if (searchTerm == '' || color == 'Select') {
            return getAllAnimals();
        }

        if (color != 'Select'){
            query += ' AND Color__c = \'' + color + '\'';
        }

        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';

        String resultQuery = 'SELECT Id, Name, Age__c, Sex__c, Height__c, Weight__c, KindAnimal__c, Color__c FROM Animal__c WHERE Name LIKE \''+ searchTerm + '\'' + query +' ORDER BY Name';

        System.debug(resultQuery);

        // List<Animal__c> animals = (List<Animal__c>)Database.query(resultQuery);
        // Execute search query
        return (List<Animal__c>)Database.query(resultQuery);
        
    }


    // @AuraEnabled
    // public static Animal__c[] searchAnimalsWithFiltr(String color){
    //     return[
    //         SELECT Id,
    //             Name,
    //             Age__c,
    //             Sex__c,
    //             Height__c,
    //             Weight__c,
    //             KindAnimal__c,
    //             Color__c
    //         FROM Animal__c
    //         WHERE Color__c LIKE :color
    //         ORDER BY Name
    //     ];
    // }
}


// public with sharing class BearController {
//     @AuraEnabled(cacheable=true scope='global')
//     public static Bear__c[] getAllBears() {
//         return [
//             SELECT
//                 Id,
//                 Name,
//                 Age__c,
//                 Sex__c,
//                 Height__c,
//                 Weight__c,
//                 Location__Latitude__s,
//                 Location__Longitude__s,
//                 Supervisor__r.Name
//             FROM Bear__c
//             WITH SECURITY_ENFORCED
//             ORDER BY Name
//             LIMIT 50
//         ];
//     }

//     @AuraEnabled(cacheable=true scope='global')
//     public static Bear__c[] searchBears(String searchTerm) {
//         // Return all bears when no search term
//         searchTerm = searchTerm.trim();
//         if (searchTerm == '') {
//             return getAllBears();
//         }
//         // Prepare query paramters
//         searchTerm = '%' + searchTerm + '%';
//         // Execute search query
//         return [
//             SELECT
//                 Id,
//                 Name,
//                 Age__c,
//                 Sex__c,
//                 Height__c,
//                 Weight__c,
//                 Location__Latitude__s,
//                 Location__Longitude__s,
//                 Supervisor__r.Name
//             FROM Bear__c
//             WHERE Name LIKE :searchTerm
//             WITH SECURITY_ENFORCED
//             ORDER BY Name
//             LIMIT 50
//         ];
//     }
// }