const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAIRTQRSJP7YEVEYCQ',
  secretAccessKey: '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',
});

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'ap-northeast-2',
});

exports.checkBucket = async () => {
  const params = {
    Bucket: 'snowboard-tricks',
  };
  s3.headBucket(params, (err, data) => {
    if (err) {
      console.log('An error occurred');
      console.log(err, err.stack);
    } else {
      console.log('Successful response');
      console.log(data);
    }
  });
};

exports.checkFile = async ({ fileName }) => {
  const params = {
    Bucket: 'snowboard-tricks',
    Key: fileName,
  };
  s3.headObject(params, (err, data) => {
    if (err) {
      console.log('An error occurred');
      console.log(err, err.stack);
    } else {
      console.log('Successful response');
      console.log(data);
    }
  });
};

exports.getSignedUrlForPut = async ({ fileName }) => {
  if (fileName.length < 5) throw new Error('File name has error!');
  const params = {
    Bucket: 'snowboard-tricks',
    Key: fileName,
    // Expires: 60 // expires in 60 seconds
  };
  return s3.getSignedUrl('putObject', params);
};

exports.getSignedUrlForGet = async ({ fileName }) => {
  if (fileName.length < 5) throw new Error('File name has error!');
  const params = {
    Bucket: 'snowboard-tricks',
    Key: fileName,
  };
  return s3.getSignedUrl('getObject', params);
};
