import { LightningElement,track, wire } from 'lwc';
import { registerListener,unregisterAllListeners } from 'c/pubSubLib'
import { CurrentPageReference } from 'lightning/navigation';

export default class QkartHeader extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track skey;
    @track cart=0;
    @track cartItemStore=[];

    handleKeyUp(event){
        const isEnterKey = event.keyCode === 13;
        if(isEnterKey){
            this.skey=event.target.value;
        }
    }
    myOrders(event){
        window.console.log(event.target.value);
    }
    myCart(event){
        window.console.log(event.target.value);
    }
    connectedCallback(){
        registerListener('pushItem',this.handlePushItem,this);
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    handlePushItem(inValue){
        this.cartItemStore=inValue;
        window.console.log('in cart value==>'+inValue);
    }
}