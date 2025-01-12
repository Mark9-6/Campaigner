import userModel from "../models/UserModel.js";
import UserFile from "../models/UserFileModel.js";
import multer from "multer";
import csvtojson from 'csvtojson'
 

const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;  

const uploadfile = async(req,res) => {
  try {
    const userId = req.body.userId;  
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success:false , message: 'No file uploaded' });
    }

    // Convert CSV to JSON
    const csvData = await csvtojson().fromString(file.buffer.toString());

    const invalidPANs = csvData.filter((row) => {
      const panCardNumber = row['PAN Number']?.trim();
      return !panCardRegex.test(panCardNumber);
    }); 

    if (invalidPANs.length > 0) {
      return res.status(400).json({
        success:false,
        message: 'Invalid PAN card numbers found in the file',
        invalidPANs,
      });
    }

    // Save the uploaded CSV data to the database
    const userFile = new UserFile({
      userId,
      fileName: file.originalname,
      data: csvData,
    });

    await userFile.save();

    // Generate invoices for each person
 

    res.status(200).json({ success: true, message: 'File uploaded successfully', userFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error uploading file', error });
  }
};
  
  const fetchFiles = async(req,res)=>{
    try {
      const userId = req.params.userId;
  
      const files = await UserFile.find({ userId });
      res.status(200).json({success: true , message:"file fetched successfully", files });
      // console.log(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success:false , message: 'Error fetching files', error });
    }
  }
  
  const deleteFile = async(req,res)=>{
    try {
      const userFileId = req.params.userFileId;
      const userFile = await UserFile.findByIdAndDelete(userFileId);
      if(!userFile){
        return  res.status(404).json({success:false , message:"File not found"});
      }
      res.status(200).json({success:true,message:"file deleted sucessfully" , userFile} )
    } catch (error) {
      console.log(error);
      res.status(500).json({ success:false , message: 'Error deleteing file', error });
    }
  }

  
export { uploadfile,fetchFiles, deleteFile}