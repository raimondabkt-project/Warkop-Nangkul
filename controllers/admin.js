const admin_controller = (req, res, next) =>{
    let user = req.session.user || ""
    let admin = req.session.admin || ""

    if(user)
        next('route')
    else if(admin)
        next()
    else
        res.send("No Access")
}

export default admin_controller