const  AWS = require('aws-sdk');
const rekog = new AWS.Rekognition();

exports.handler = function(event, context, callback) {
    //console.log(event)
    let s3 = event.Records[0].s3;
    rekog.detectLabels({
        Image: {
            S3Object: {
                Bucket: s3.bucket.name,
                Name:  s3.object.key
            }
        },
        MaxLabels: 1
    }).promise()
    .then(data => {
        console.log(data);
        callback(null, {});
    })
    .catch(callback);


    callback(null, {"message": "Successfully executed"});
}