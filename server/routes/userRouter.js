import express from 'express'
import {loginUser , registerUser, updatePassword, updatePhoneNumber}  from  '../controllers/userController.js'
import {uploadfile,fetchFiles,deleteFile,} from '../controllers/fileController.js'
import {generatePdfByPAN} from '../controllers/pdfController.js'
import multer from 'multer';        
 

// Setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });     

const userRouter = express.Router();

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.post('/upload', upload.single('file'), uploadfile);
userRouter.get('/user-files/:userId' , fetchFiles)
userRouter.post('/generate-pdf', generatePdfByPAN);
// userRouter.get('/person' , fetchPersonByPAN)
userRouter.delete('/delete-campaign/:userFileId' , deleteFile)
userRouter.post('/update/phoneNumber', updatePhoneNumber);
userRouter.post('/update/password', updatePassword);
 

export default userRouter;