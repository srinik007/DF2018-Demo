import { LightningElement,track, wire } from 'lwc';
import { registerListener,unregisterAllListeners,fireEvent } from 'c/pubSubLib'
import { CurrentPageReference } from 'lightning/navigation';

export default class QkartItem extends LightningElement {
    @track isAddCart=false;
    @track cartStore=[];
    @track value = '1';
    @wire(CurrentPageReference) pageRef;

    get options() {
        return [
            { label: '1', value: '1' },
            { label: '2', value: '2' }
        ];
    }
    handleChange(event) {
        this.value = event.detail.value;
    }
    connectedCallback(){
        registerListener('isKartItem',this.isItemHandler,this);
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    isItemHandler(selectedValue){
        this.isAddCart=false;
        this.cartStore=[];
        this.isAddCart=JSON.parse(selectedValue).isCart;
        window.console.log('1==>'+JSON.parse(selectedValue).cIt);
        this.cartStore.push(JSON.parse(selectedValue).cIt);
        window.console.log('2==>'+this.cartStore);
    }
    addKart(){
        fireEvent(this.pageRef,'pushItem',this.cartStore);
    }/*
    buyNow(event){
        
    }*/
}