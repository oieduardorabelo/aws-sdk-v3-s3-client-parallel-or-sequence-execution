const { config } = require('dotenv');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

// Using Promise.all() to get 1000 files in parallel
(async () => {
    const start = Date.now();
    const files = Array.from({ length: 1000 }, (_, i) => i++);
    await Promise.all(
        files.map(async (i) => {
            console.log(`Getting file ${i} [...]`);
            const data = await client.send(
                new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: `test-${i}.txt`,
                }),
            );
            const str = await data.Body.transformToString();
            console.log(str);
            console.log(`File ${i} got! [OK]`);
        }),
    );
    const end = Date.now();
    console.log('All files got!');
    console.log(`Time taken: ${end - start} ms`);
})();
