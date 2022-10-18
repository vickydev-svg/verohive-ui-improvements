import axios from 'axios';


export const uploadImageToAwsS3 = async (photo) => {
 
const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

const response=await axios.post('/api/v1/upload', photo, config)
 
  // const { data } = response;
  console.log("dd",response.data)
  // const { status } = data;
  // if(status !== "success") {
  //   throw new Error(status);
  // }
  return response.data;
}