({
    doInit : function(component, event, helper) {
        var options=[];
        var action=component.get("c.getSkillSet");
        action.setCallback(this,function(respose){
            var state=respose.getState();
            if(state==="SUCCESS"){
                var resp=respose.getReturnValue();
                for(var key in resp){
                    options.push({'Id':key+1,'Name':resp[key]});
                }
                component.set("v.options",options);
                component.set("v.skillSet",resp);
            }
        });
        $A.enqueueAction(action);
    },
	ClickHere : function(component, event, helper) {
        var va=component.find("in").get("v.value");
        console.log("con==>"+component.find("in").value);
		component.set("v.Name",va);
        //console.log(component.get("v.Name"));
	}
})