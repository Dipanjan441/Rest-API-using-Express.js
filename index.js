import express from 'express';
//import user router
import useRouter from './routers/user.router.js';
//import form router
import useFormRouter from './routers/form.router.js';
//import session router
import useSessionRouter from './routers/session.router.js';
import { connectDb } from './db.js';
//import cookie-parser
import cookieParser from 'cookie-parser'; 
//import session  
import session from 'express-session';

//db connection
connectDb();
export const users = [];

const app = express();

const PORT = 3000;

//set cookie & session
app.use(cookieParser());
app.use(session({
    secret: 'secret session',
    resave: false,
    saveUninitialized: false
}))

app.get('/',(req,res)=> {
    res.cookie('name','express-app',{httpOnly:true,secure:true,maxAge:36000})
    res.send('Welcome to express app');
})
app.get('/fetch',(req,res)=>{
    // console.log(req.cookies);
    res.send('data fetched');
})
app.get('/remove-cookie',(req,res)=>{
    res.clearCookie('name');
    res.send('remove cookie route');
})
//session check route
app.use('/session',useSessionRouter);

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//user routes
app.use('/user',useRouter)
//form routes
app.use('/form',useFormRouter);



//invalid route
app.get('*',(req,res)=>{
    res.send("sorry invalid request")
})

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`);
})