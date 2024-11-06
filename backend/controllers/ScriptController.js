const saveScript = require('../services/ScriptService')


const save = async (req,res)=>{
    try {
        const savedData = await saveScript(req.body);
        res.status(200).json({success: true, message: 'Data saved successfully', data: savedData});
    } catch (error) {
        res.status(500).json({success: false, message: 'An error occurred while saving data', error: error.message});
    }
}

module.exports = {save};