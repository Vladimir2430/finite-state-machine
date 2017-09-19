class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states=config.states;
        this.curState=config.initial;
        //history
        this.histArray=[this.curState];
        this.tailIndex=0;
        this.wasCalled;
        this.redoDisabled;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.curState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states.hasOwnProperty(state)){
            this.curState=state;
            this.histArray.push(this.curState);
            this.redoDisabled=true;
        }
        else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for(let transition in this.states[this.curState].transitions){
            if(transition===event){
                this.curState=this.states[this.curState].transitions[event];
                this.histArray.push(this.curState);
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
        this.curState="normal";
        this.histArray=[this.curState];
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
        if((this.histArray.length-this.tailIndex)>1){
            this.tailIndex++;
            this.curState=this.histArray[this.histArray.length-1-this.tailIndex];
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
                this.curState=this.histArray[this.histArray.length-1-this.tailIndex];
                return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {this.histArray=[];this.tailIndex=0;}
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
