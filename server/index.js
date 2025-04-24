const express = require('express');
const app = express();


// import require configs
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');


// import all routes
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const herbRoutes = require('./routes/Herbs');
const noteRoutes = require('./routes/Note');
const contactRoutes = require('./routes/Contact');
const chatBotRoutes = require('./routes/ChatBot');


// import required middlewares
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();


// database connect
dbConnect();
// connect with cloudinary
cloudinaryConnect();

// use required middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));


// routes mapping
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/herb', herbRoutes);
app.use('/api/v1/note', noteRoutes);
app.use('/api/v1', contactRoutes);
app.use('/api/v1/ai', chatBotRoutes);


// get port and start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server started at ${PORT}`)) 

// testing route
app.get('/', (req, res) => res.send(`<h1>Hello world</h1>`));