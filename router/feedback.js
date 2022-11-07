const { Router } = require("express");
const auth = require("../middleware/auth");
const Feedback = require("../model/feedback");
const Contact = require("../model/contact");
const router = Router();


router.get("/",auth, async(req,res) => {
    let feedback = await Feedback.find().sort({_id:1}).lean()
    let contact = await Contact.find().lean()
    contact = contact.map((contact,index) =>{
        contact.createdAt = contact.createdAt.toLocaleString()
        contact.index = index + 1;
        contact.status = contact.status == 1
        ? '<span class="badge bg-success">Ответчино</span>'
        : '<span class="badge bg-danger">В ожидании</span>'; 
        
        return contact
    })
    
        res.render("feedback/index", {
            isFeedback: true,
            feedback,
            contact,
            title: "Список обращения",
        });


});

router.get('/get/:id',auth,async(req,res)=>{
        let _id = req.params.id
        let contact = await Contact.findOne({_id}).lean()
        res.send(contact)

})

router.get('/menu/:id',auth,async(req,res)=>{
    try {
        let _id = req.params.id
        let contact = await Contact.findOne({_id})
        contact.menu = contact.menu == 1 ? 0:1
        await contact.save()
        res.redirect('/feedback')
    } catch (error) {
        console.log(error);  
    }
})   

router.get("/status/:id", auth, async (req, res) => {
    try {
        let _id = req.params.id;
        let contact = await Contact.findOne({ _id });
        contact.status = contact.status == 1 ? 0 : 1;
        await contact.save();
        res.redirect("/feedback");
    } catch (error) {  
        console.log(error);   
    }
});




router.get("/delete/:id",auth, async(req, res) => {
        let _id = req.params.id
        await Contact.findByIdAndDelete({_id})
        res.redirect("/feedback");
});


router.post('/',auth,  async(req,res)=>{
    let { name, text, phone, email, callme } = req.body;
    let newFeedback = await new Feedback({ name, text, phone, email, callme });
    await newFeedback.save()
    res.send('ok')
})


module.exports = router;
