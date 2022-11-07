const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Menu =require('../model/menu')
const Contact = require('../model/contact')
router.get('/dashboard',auth,async(req,res)=>{
  let contact = await Contact.find().lean()
    res.render('pages/dashboard',{
        isHome:true,
        contact,
    })
})

router.get("/", async(req, res) => {
    let menu = await Menu.find({status:1}).sort({order:1}).lean()
    res.render("pages/index",{
        layout:'front',
        title:'Home page',
        active:true,
        menu   
    });  
});


router.get("/about", async (req, res) => {
        res.render("pages/about", {
        layout: "front",
        title: "About",
        about: true,
        });
});


router.get("/portfolio", async (req, res) => {
    res.render("pages/portfolio", {
      layout: "front",
      title: "Portfolio",
      portfolio: true,
    });
});

router.get("/contact", async (req, res) => {
  res.render("pages/contact", {
    layout: "front",
    title: "Contact",
    contact: true,
  });
});

router.post("/contact", async (req, res) => {
  let { name, text, phone,email } = req.body;
  let newContact = await Contact({ name, text, phone, email });
  await newContact.save();
  res.render("pages/contact", {
    layout: "front",
    title: "Contact",
    contact: true,
  });
});

router.post("/phone", async (req, res) => {
  let {  phone } = req.body;
  let newPhone = await Contact({phone});
  await newPhone.save();
  res.render("pages/index", {
    layout: "front",
    contact: true,
  });
});


router.get("/service", async (req, res) => {
  res.render("pages/service", {
    layout: "front",
    title: "Service",
    contact: true,
  });
}); 


router.get("/servicedetale", async (req, res) => {
  res.render("pages/servicedetale", {
    layout: "front",
    title: "ServiceDetale",
    contact: true,
  });
});

router.get("/clients", async (req, res) => {
  res.render("pages/clients", {
    layout: "front",
    title: "Clients",
    contact: true,
  });
});


router.get("/privacy", async (req, res) => {
  res.render("pages/privacy", {
    layout: "front",
    title: "Privacy",
    contact: true,
  });
});


router.get("/team", async (req, res) => {
  res.render("pages/team", {
    layout: "front",
    title: "Team",
    contact: true,
  });
});
module.exports = router  