class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.aaa=config.aaa;
        this.bbb=config.initial;
        this.arr=[this.bbb];
        this.ccc=0;
        this.ddd;
        this.eee;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.bbb;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.aaa.hasOwnProperty(state)){
            this.bbb=state;
            this.arr.push(this.bbb);
            this.eee=true;
        }
        else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for(let hhh in this.aaa[this.bbb].transitions){
            if(hhh===event){
                this.bbb=this.aaa[this.bbb].transitions[event];
                this.arr.push(this.bbb);
                this.eee=true;
                return;
            }
        }
        throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.bbb="normal";
        this.arr=[this.bbb];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr2=[];
        if(arguments.length!=0){
            for(let sss in this.aaa){
                if(this.aaa[sss].transitions.hasOwnProperty(event)){
                    arr2.push(sss);                }
            }
        }
        else
            for(let sss in this.aaa){
                arr2.push(sss);
            }

        return arr2;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if((this.arr.length-this.ccc)>1){
            this.ccc++;
            this.bbb=this.arr[this.arr.length-1-this.ccc];
            this.eee=false;
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
       if((!this.eee)&&(this.ccc>0)) {
                this.ccc--;
                this.bbb=this.arr[this.arr.length-1-this.ccc];
                return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arr=[];this.ccc=0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/


