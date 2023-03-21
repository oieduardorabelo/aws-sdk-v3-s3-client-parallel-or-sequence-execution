# Parallel or Sequence exectution of AWS SDK v3 S3 Client

Example of how to use the AWS SDK v3 S3 client to upload files to S3 in parallel or sequence execution.

## Requirements

-   Run `npm install` to install the dependencies.
-   Set the `BUCKET` environment variable to a random bucket name.
-   Run `node bucket-create.js` to create the bucket.
-   After you run this experiment you can run `node bucket-delete.js` to delete the bucket.

## Parallel

Using `Promise.all` to upload files in parallel.

-   [Create 1000 files in parallel](./thousand-files-create-promise-all.js)
-   [Delete 1000 files in parallel](./thousand-files-delete-promise-all.js)
-   [Get 1000 files in parallel](./thousand-files-get-promise-all.js)

[Thousand Get Video](https://user-images.githubusercontent.com/829902/226739543-d7647c45-6894-4ff9-abe0-76d2b3d9e1eb.webm)

## Sequence

Using `while` loop to upload files in parallel.

-   [Create 1000 files in sequence](./thousand-files-create-while-loop.js)
-   [Delete 1000 files in sequence](./thousand-files-delete-while-loop.js)
