import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    stateName: { 
        type: String, 
        required: true 
    },
    stateCode: { 
        type: String, 
        required: true 
    },
    countryCode: { 
        type: String, 
        required: true 
    }
});

const State = mongoose.model("State", stateSchema);

export default State;