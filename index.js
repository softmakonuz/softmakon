const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");

const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const varMiddle = require('./middleware/var')


///////////////////////////////////Sessiya
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

///////////////////////////////ROUTER ULASH

const userRouter = require('./router/users')
const pageRouter = require("./router/page");
const productRouter = require('./router/product')
const attributeRouter = require("./router/attribute");
const blogRouter = require("./router/blog");
const categoryRouter = require("./router/category");
const feedbackRouter = require("./router/feedback");
const vacancyRouter = require("./router/vacancy");
const sliderRouter = require("./router/slider");
const key = require("./key/pro");








///////////////////////////////EXPRESS
const  app = express();

////////////////////////////////HENDLEBARS  
const hbs = exphbs.create({
    // defaultLayout: "main", 
    extname: ".hbs",
});



//////////////////////////////PABLIC PAPKA
app.use(express.static('public'));
app.use('/uploads',express.static('uploads'))


//////////////////////////////INPUTS Jonatish uchun
app.use(express.urlencoded({extended: true}))

////////////////////////////////////////////////
// const MONGODB_URI  = 'mongodb://127.0.0.1:27017/workers'
let store = new MongoDBStore({
    uri: key.MONGODB_URI,
    collection: "mySessions",
});

////////////////////////////////Sessiya saqlash
app.use(
  session({
    secret: key.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
    store,
  })
);   

/////////////////////////////////

app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(flash());

/////////////////////////////
app.use(varMiddle)



app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views') 

////////////////////////////////ROUTER


/////////////////////////////////Router use


app.use('/', pageRouter);
app.use('/users',userRouter);
app.use('/product', productRouter)
app.use("/userprofile", productRouter);
app.use("/attribute", attributeRouter);
app.use("/blog", blogRouter);
app.use("/category", categoryRouter);
app.use("/feedback", feedbackRouter);
app.use("/vacancy", vacancyRouter);
app.use("/slider", sliderRouter);






// app.use("/about", aboutRouter);




//////////////////////SERVER RUNNING
// app.listen(3000,()=>{
//     console.log("server is running ==> http://localhost:3000/");
// })


//////////////////////////MONGOSE RUNNING

async function dev(){
    try {      
        await mongoose.connect(key.MONGODB_URI, { useNewUrlParser: true });
        app.listen(process.env.PORT || 3000, () => {
          console.log("Server is running ==> http://localhost:3000/");
        });
    } catch (error) {
        console.log(error);
    }
}


dev(); 
// async function dev() {
//   try {
//     await mongoose.connect(key.MONGODB_URI, { useNewUrlParser: true });
//     app.listen(3000, () => {
//       console.log("Server is running ==> http://localhost:3000/");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// dev(); 
