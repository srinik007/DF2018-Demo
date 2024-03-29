//import { LightningElement } from 'lwc';

//export default class PubSubLib extends LightningElement {
/*const callbacks={};

//Registering callback for event
const register=(eventName,callback)=>{
    if(!callbacks[eventName]){
        callbacks[eventName]=new Set();
    }
    callbacks[eventName].add(callback);
};
//Unregistering callback for event
const unregister=(eventName,callback)=>{
    if(callbacks[eventName]){
        callbacks[eventName].delete(callback);
    }
};
//Fires an event to listeners
const fire=(eventName,payload)=>{
    if(callbacks[eventName]){
        callbacks[eventName].forEach(callback => {
            try {
                callback(payload);
            } catch (error) {
                //
            }
        });
    }
};

export default{
    register,
    unregister,
    fire
};*/

const events = {};
const samePageRef = (pageRef1, pageRef2) => {
    const obj1 = pageRef1.attributes;
    const obj2 = pageRef2.attributes;
    return Object.keys(obj1)
        .concat(Object.keys(obj2))
        .every(key => {
            return obj1[key] === obj2[key];
        });
};
const registerListener = (eventName, callback, thisArg) => {
    // Checking that the listener has a pageRef property. We rely on that property for filtering purpose in fireEvent()
    if (!thisArg.pageRef) {
        throw new Error(
            'pubsub listeners need a "@wire(CurrentPageReference) pageRef" property'
        );
    }

    if (!events[eventName]) {
        events[eventName] = [];
    }
    const duplicate = events[eventName].find(listener => {
        return listener.callback === callback && listener.thisArg === thisArg;
    });
    if (!duplicate) {
        events[eventName].push({ callback, thisArg });
    }
};
const unregisterListener = (eventName, callback, thisArg) => {
    if (events[eventName]) {
        events[eventName] = events[eventName].filter(
            listener =>
                listener.callback !== callback || listener.thisArg !== thisArg
        );
    }
};
const unregisterAllListeners = thisArg => {
    Object.keys(events).forEach(eventName => {
        events[eventName] = events[eventName].filter(
            listener => listener.thisArg !== thisArg
        );
    });
};
const fireEvent = (pageRef, eventName, payload) => {
    if (events[eventName]) {
        const listeners = events[eventName];
        listeners.forEach(listener => {
            if (samePageRef(pageRef, listener.thisArg.pageRef)) {
                try {
                    listener.callback.call(listener.thisArg, payload);
                } catch (error) {
                    // fail silently
                }
            }
        });
    }
};

export {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent
};
//}