class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        
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
    
        }
        else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
   
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
    
        }
        
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    

    /**
     * Clears transition history
     */
  

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

            },
        },
    }
};


(function(){

           
           
})()
