const sharp = require('sharp');
const validateFilePickupPhoto = (req,res,next) => {
    
  const base64Image = req.body.photo;
  let parts = base64Image.split(';');
  let mimType = parts[0].split(':')[1];
  let imageData = parts[1].split(',')[1];
  var img = new Buffer.from(imageData, 'base64');

  sharp(img)
 // .extract({ left: req.body.left, top: req.body.top, width: req.body.width, height: req.body.height })
  //.toBuffer()
 // .resize(req.body.width,req.body.height)
  .jpeg({quality : 50})
  .toFile(
    `public/images-pickup/${req.params.id}-photo.jpg`)
  .catch(error => {
    return next(
      new ErrorResponse(`No User with the if of ${req.params.id}`),
      404
  );
  
  })


next();
}

module.exports = {
  validateFilePickupPhoto
}