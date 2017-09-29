class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states=config.states;
        this.bbb=config.initial;
        this.arr=[this.bbb];
        this.tailIndex=0;
        this.wasCalled;
        this.redoDisabled;
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
        if(this.states.hasOwnProperty(state)){
            this.bbb=state;
            this.arr.push(this.bbb);
            this.redoDisabled=true;
        }
        else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for(let transition in this.states[this.bbb].transitions){
            if(transition===event){
                this.bbb=this.states[this.bbb].transitions[event];
                this.arr.push(this.bbb);
                this.redoDisabled=true;
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
        let ar=[];
        if(arguments.length!=0){
            for(let stateName in this.states){
                if(this.states[stateName].transitions.hasOwnProperty(event)){
                    ar.push(stateName);                }
            }
        }
        else
            for(let stateName in this.states){
                ar.push(stateName);
            }

        return ar;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if((this.arr.length-this.tailIndex)>1){
            this.tailIndex++;
            this.bbb=this.arr[this.arr.length-1-this.tailIndex];
            this.redoDisabled=false;
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
        if((!this.redoDisabled)&&(this.tailIndex>0)) {
                this.tailIndex--;
                this.bbb=this.arr[this.arr.length-1-this.tailIndex];
                return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {this.arr=[];this.tailIndex=0;}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};


(function(){

            const student = new FSM(config);

            student.trigger('study');
            console.log(student.getState()+'busy');
})()
