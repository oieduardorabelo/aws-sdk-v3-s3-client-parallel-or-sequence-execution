const { config } = require('dotenv');
const { S3Client, CreateBucketCommand } = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

(async () => {
    await client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`Bucket created! Name: ${BUCKET_NAME}`);
})();
