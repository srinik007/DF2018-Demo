({
	helperMethod : function(component, event) {
        action.setParams({
            "str" : component.get("v.nameOfVar3")
        });
        action.setCallback(this,function(res){
            var state=res.getState();
            if(state==="SUCCESS"){
                var resp=res.getReturnValue();
                component.set("v.nameOfVar2",resp);
            }
        });
        $A.enqueueAction(action);
	}
})