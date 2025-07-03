export const formController = async(req,res)=> {
    console.log('file',req.file);
    console.log(req.body);
    res.send({message: "new issue form is submitted successfully"})
}