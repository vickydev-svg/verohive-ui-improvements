const aws = require('aws-sdk');
// const config = require('../config');
const md5 = require('md5');
// const S3_BUCKET = process.env.S3_BUCKET;

aws.config.update({
  secretAccessKey: '5bV/+2U+ph1bksgLtfShi+VjSjWMhcnsXL9lq+49',
  accessKeyId: 'AKIAJCJJOQXKCCHDEKMQ',
  region: 'ap-south-1'
});

const s3 = new aws.S3();

// rename a file
const renameImage = file => md5(Date.now()) + '.' + file.name.replace(/ /g, '-').split('.').pop()
// Upload your image to S3
const uploadToS3 = (file,res) => {
  console.log("rohan",file)

  s3.createBucket( () => {
      var params = {
        Bucket: 'farma-consumer',
        Key: renameImage(file),
        Body: file.data
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err.message);
          res.status(422).send(err);
        }
        // return the S3's path to the image
        res.json(data.Location);
      });
  });
}

exports.uploadImage = ( req, res, next ) => {
   uploadToS3(req.files.photo,res);
};