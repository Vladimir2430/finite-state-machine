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
        if(this.states.hasOwnProperty(state)){
            this.bbb=state;
            this.arr.push(this.curState);
            this.eee=true;
        }
        else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for(let hhh in this.states[this.bbb].transitions){
            if(hhh===event){
                this.bbb=this.states[this.bbb].transitions[event];
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
            for(let sss in this.states){
                if(this.states[sss].transitions.hasOwnProperty(event)){
                    ar.push(sss);                }
            }
        }
        else
            for(let sss in this.states){
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

const config = {
    initial: 'normal',
    aaa: {
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
