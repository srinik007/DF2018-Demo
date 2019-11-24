public class TestClass {
    @AuraEnabled
    public static Contact[] method1(){
        return [Select name from contact];
    }
    @AuraEnabled
    public static List<String> getSkillSet()
    {
        List<String> options = new List<String>();
        
        Schema.DescribeFieldResult fieldResult =Employee__c.Skill_Set__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry f : ple)
        {
            options.add(f.getValue());
        }       
        return options;
    }
}