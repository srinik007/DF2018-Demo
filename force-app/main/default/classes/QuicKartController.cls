public with sharing class QuicKartController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> prodRecords(){
        return [Select Id,ProductCode,Name from Product2];
    }
}