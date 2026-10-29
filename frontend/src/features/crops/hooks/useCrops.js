import { toast } from "react-toastify";
import { addCultivationStep, addHarvestStep, createNewCrop, getAllCrop, getCropsById } from "../service/crops.api";
import { getSavedCrops, removeSavedCrops, savedCrops } from "../service/crops.saved.api";
import { useDispatch, useSelector } from "react-redux";
import { setSavedCrops } from "../../auth/state/auth.slice";

export const useCrops = ()=>{
    const dispatch = useDispatch();
    

    const handleCreateNewCrops = async (imageData, cropData) => {
        try {
            const crops = await createNewCrop(imageData, cropData);
            console.log(crops);
        } catch (error) {
            throw error;
        }
    }

    const handleGetAllCrops = async (pageNo, pageSize) => {
        try {
            const crops = await getAllCrop(pageNo, pageSize);
            console.log(crops);
            return crops;

        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const handleGetCropsById = async (id) => {
        try {
            const crop = await getCropsById(id);
            return crop.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleSaveCrops = async (id) => {
        try {
            const savCrops = await savedCrops(id);
            console.log("Saved: ", savCrops);
            toast.success(savCrops.message); 
            await handleGetAllSavedCrops();
        } catch (error) {
            toast.error(error);           
        }
    }

    const handleGetAllSavedCrops  = async () => {
        try {
            const crops = await getSavedCrops();
            console.log("Crops:", crops.data.data)
            dispatch(setSavedCrops(crops.data.data));
    
        } catch (error) {
            console.log("Error: ", error);
        }
    }


    const handleRemoveSavedCrops = async (id) => {
        try {
            const crops = await removeSavedCrops(id);
            toast.success("Crops removed successfully");
            handleGetAllSavedCrops();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCropCultivationCreation = async (id, data) =>{

        console.log(id, data);


        try {
            const response = await addCultivationStep(id, data);
            console.log("Cultivation Data: ", response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCropHarvestCreation = async (id, data) =>{
        console.log(id, data);

        try {
            const response = await addHarvestStep(id, data);
            console.log("Harvest Data: ", response);
        }
        catch (error) {
            console.log(error);
        }   

    }



    return {handleCreateNewCrops, handleGetAllCrops, handleGetCropsById, handleSaveCrops, handleGetAllSavedCrops, handleCropCultivationCreation, handleRemoveSavedCrops, handleCropHarvestCreation}
}
