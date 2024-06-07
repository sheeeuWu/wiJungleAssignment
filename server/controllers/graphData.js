import GraphData from "../models/GrapgData.js";


export const getGraphData = async (req,res) => {
    try{
        console.log("inside GraphData");
        const graphData  = await GraphData.find();
        

        res.status(200).json(graphData);

    }catch(error){
        res.status(404).json({ message: error.message })
    }
}