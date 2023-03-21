const { config } = require('dotenv');
const {
    S3Client,
    ListObjectsV2Command,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

config();

const { BUCKET_NAME } = process.env;

const client = new S3Client();

// Using while loop to delete 1000 files in sequence
(async () => {
    const start = Date.now();

    console.log('Listing bucket objects [...]');
    const objects = await client.send(
        new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
        }),
    );
    console.log('Bucket objects listed! [OK]');

    let i = 0;
    while (i < objects.Contents.length) {
        const obj = objects.Contents[i];
        console.log(`Deleting file ${obj.Key} [...]`);
        await client.send(
            new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: obj.Key,
            }),
        );
        console.log(`File ${obj.Key} deleted! [OK]`);
        i++;
    }
    const end = Date.now();
    console.log('All files deleted!');
    console.log(`Time taken: ${end - start} ms`);
})();
