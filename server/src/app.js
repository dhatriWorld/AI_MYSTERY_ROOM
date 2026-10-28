import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import cases from './routes/cases.js';
import { errorHandler, notFound } from './middleware/errors.js';
const app=express();
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'))
  .split(',').map(origin => origin.trim()).filter(Boolean);
app.use(cors({origin(origin, callback) { callback(null, !origin || allowedOrigins.includes(origin)); },allowedHeaders:['Content-Type','x-session-id']}));
app.use(express.json({limit:'32kb'}));
app.get('/api/v1/health',(req,res)=>res.json({success:true,data:{status:'ok'}}));
app.use('/api/v1/cases',rateLimit({windowMs:60_000,limit:15,standardHeaders:true,legacyHeaders:false}),(req,res,next)=>{
  const id=req.get('x-session-id');
  if(!id||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return res.status(400).json({success:false,error:{code:'INVALID_SESSION',message:'A valid guest session is required.'}});
  req.sessionId=id;
  next();
},cases);
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist');
  app.use(express.static(clientDist));
  app.get('*',(req,res,next)=>{
    if(req.path.startsWith('/api/'))return next();
    res.sendFile(path.join(clientDist,'index.html'));
  });
}
app.use(notFound);app.use(errorHandler);
export default app;
