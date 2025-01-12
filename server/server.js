import express from 'express'
import cors from 'cors' 
import 'dotenv/config'
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRouter.js'
import uploadFile from './routes/userRouter.js'
import userAuth from './middleware/Auth.js' 

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/invoices', express.static('invoices')); 

await connectDB();

app.use('/api/user' ,userRouter );
 

app.get('/' , 
    (req,res)=>
        res.send( "server connected" )
)

app.listen(PORT , 
     ()=> console.log(`Server running on  ${PORT}`)
)

