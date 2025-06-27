var os=require ('os')
function info(req,res,init){

    res.json({
        hostname: os.hostname
    })
}
module.exports={info}