import { LightningElement,wire,api } from 'lwc';
import productItems from '@salesforce/apex/QuicKartController.prodRecords'
import { fireEvent } from 'c/pubSubLib'
import { CurrentPageReference } from 'lightning/navigation';

export default class QkartPage extends LightningElement {
    i=0;
    @api cartStore;
    @api cartStore1={};
    cartStore2;
    
    @api selectedItemId;
    @api isAddCart=false;
    @wire(CurrentPageReference) pageRef;

    eachRec;

    @wire(productItems)
    prodRecords

    addToCart(event){
        this.isAddCart=true;
        this.selectedItemId=event.target.name;
        for(let i=0;i<this.prodRecords.data.length;i++){
            if(this.prodRecords.data[i].Id===this.selectedItemId){
                this.cartStore=this.prodRecords.data[i];
                this.cartStore1={'cIt':this.prodRecords.data[i],'isCart':true};
                fireEvent(this.pageRef,'isKartItem',JSON.stringify(this.cartStore1));
            }
        }
        /*this.cartStore.forEach(function(value){
            window.console.log('cart items==>'+value);
        });*/
        /*
        for(let vals in this.prodRecords){
            if (this.prodRecords.hasOwnProperty(vals)) {
                window.console.log('val3'+vals.data.value.Name);
             }
        }*/
    }
    cancelCart(){
        this.cartStore=[];
        this.isAddCart=false;
    }

    
}