const sessionCheck = (req, res, next) => {
    if (req.session.userID) {
        return res.json({valid:true, userId:req.session.userId})
        // next()
    } else {
        return res.json({valid:false})
    }
}

export default sessionCheck