import axios from "axios";

const cropsApiInstance = axios.create({
    baseURL: "http://localhost:8080/api/crops",
    withCredentials: true
})

export const createNewCrop = async (imageData, cropsData) => {
  const formData = new FormData();

  // Crop JSON data
formData.append(
    "crop",
    new Blob([JSON.stringify(cropsData)], {
        type: "application/json"
    })
);

  // Images
  imageData.forEach((image) => {
    formData.append("image", image);
  });

  const response = await cropsApiInstance.post("",
    formData
  );

  return response.data;
};

export const getAllCrop = async (pageNo, pageSize) => {


  console.log(pageNo);
  console.log(pageSize);

  const response = await cropsApiInstance.get("", {
    params: {
      page: pageNo,
      size: pageSize
    }
  });

  return response.data;
}


export const getCropsById = async (id) =>{
  const response = await cropsApiInstance.get(`/${id}`);

  return response.data;
}

export const addCultivationStep = async (id, data) => {
  const response = await cropsApiInstance.post(`/${id}/cultivation`, data);

  return response.data;
}

export const addHarvestStep = async (id, data) => {
  const response = await cropsApiInstance.post(`/${id}/harvesting`, data);
  return response.data;
}
