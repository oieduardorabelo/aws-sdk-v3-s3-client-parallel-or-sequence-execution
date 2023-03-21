const { config } = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

// Using while loop to upload 1000 files in sequence
(async () => {
    const start = Date.now();
    let i = 1;
    while (i <= 1000) {
        const file = i;
        console.log(`Uploading file ${file} [...]`);
        await client.send(
            new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: `test-${file}.txt`,
                Body: `Hello World! ${file}`,
            }),
        );
        console.log(`File ${file} uploaded! [OK]`);
        i++;
    }
    const end = Date.now();
    console.log('All files uploaded!');
    console.log(`Time taken: ${end - start} ms`);
})();
