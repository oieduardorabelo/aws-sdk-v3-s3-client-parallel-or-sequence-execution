const { config } = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

// Using Promise.all() to upload 1000 files in parallel
(async () => {
    const start = Date.now();
    const files = Array.from({ length: 1000 }, (_, i) => i++);
    await Promise.all(
        files.map(async (i) => {
            console.log(`Uploading file ${i} [...]`);
            await client.send(
                new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: `test-${i}.txt`,
                    Body: `Hello World! ${i}`,
                }),
            );
            console.log(`File ${i} uploaded! [OK]`);
        }),
    );
    const end = Date.now();
    console.log('All files uploaded!');
    console.log(`Time taken: ${end - start} ms`);
})();
