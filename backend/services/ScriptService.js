const Script = require('../models/ScriptModel')

const saveScript = async(data)=>{
    try{
        const script = new Script(data);
        await script.save();
        return script;
    }catch(err){
        console.error('Error saving script:', err);
        throw err;
    }
}


module.exports = saveScript