module.exports = (req,res,next)=>{
        res.locals.isAuthed = req.session.isAuthed
        res.locals.csrf = req.csrfToken();
        res.locals.user = req.session.user
    next()
}  