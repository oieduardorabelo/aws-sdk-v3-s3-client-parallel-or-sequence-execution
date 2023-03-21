const { config } = require('dotenv');
const { S3Client, DeleteBucketCommand } = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

(async () => {
    await client.send(new DeleteBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`Bucket deleted! Name: ${BUCKET_NAME}`);
})();
