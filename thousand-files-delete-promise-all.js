const { config } = require('dotenv');
const {
    S3Client,
    ListObjectsV2Command,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

// Using Promise.all() to delete 1000 files in parallel
(async () => {
    const start = Date.now();

    console.log('Listing bucket objects [...]');
    const objects = await client.send(
        new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
        }),
    );
    console.log('Bucket objects listed! [OK]');

    const files = objects.Contents.map((obj) => obj.Key);
    await Promise.all(
        files.map(async (file) => {
            console.log(`Deleting file ${file} [...]`);
            await client.send(
                new DeleteObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: file,
                }),
            );
            console.log(`File ${file} deleted! [OK]`);
        }),
    );
    const end = Date.now();
    console.log('All files deleted!');
    console.log(`Time taken: ${end - start} ms`);
})();
