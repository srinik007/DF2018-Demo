({
    dropList : function(component, event, helper) {
        var dropStatus=component.get("v.showList");
        if(dropStatus==true){
            component.set("v.showList",false);
        }else{
            component.set("v.showList",true);
        }
    },
    chkBox : function(component, event, helper) {
        var chkStatus=event.getSource().get("v.checked");
        var chkName=event.getSource().get("v.name");
        console.log(chkName)
        var selectedChkList=component.get("v.selectedList");
        var selectedChkVal=event.getSource().get("v.value");
        var finalList=[];
        var newOrderList=[];
        if(chkStatus==true){
            event.getSource().set("v.checked",true);
            selectedChkList.push(selectedChkVal);
            selectedChkList.forEach(function(record){
                finalList.push(record);
                newOrderList.push(record);
            });
        }else{
            if(selectedChkList.includes(selectedChkVal)){
                selectedChkList.forEach(function(record){
                    if(record!=selectedChkVal){
                        finalList.push(record);
                        newOrderList.push(record);
                    }
                });
            }
        }
        var totalList=component.get("v.pickListData");
        if(finalList.length>0){
            totalList.forEach(function(record){
                if(!finalList.includes(record)){
                    newOrderList.push(record);
                }
            });
        }else{
            newOrderList=totalList;
        }
        component.set("v.pickListData",newOrderList);
        component.set("v.selectedList",finalList);
        component.set("v.count",finalList.length);
    },
})