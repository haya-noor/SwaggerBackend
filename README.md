# Typesafe Server 

## Project Overview
This project aims to create and manage API routes using TSOA, while automating the process of uploading schema files to Google Drive. It supports multiple developers working on different branches, ensuring efficient schema handling by appending branch names and hashes to schema files.

## Table of Contents
1. Installation
2. Usage
3. Schema Upload Process
4. Branch-specific Schema Handling
5. Schema Hashing
6. Middleware

## Installation

Clone the repository:

```bash
git clone https://github.com/haya-noor/SwaggerBackend.git
```

Install the dependencies:

```bash
npm install
```

## Usage

1. **Create controller functions using TSOA decorators.**
2. **Generate routes and schema files:**
   ```bash
   npm run generate-swagger
   ```
3. **Upload to Google Drive:**
   ```bash
   npm run upload-swagger
   ```
4. **Start the server:**
   ```bash
   npm run dev
   ```
5. **Build the code:**
   ```bash
   npm run build
   ```

## Schema Upload Process
After generating the schema using TSOA, the `UploadSwagger.ts` script uploads the generated `schema.json` to Google Drive. This script runs before every commit or build using Husky.

### Step-by-Step Process

1. **Generate Schema:** Generate the `schema.json` file with TSOA, containing all API routes and definitions.
2. **Husky Hook:** Configure Husky to run a script before every commit or build, automating the schema upload to Google Drive.
3. **Upload Script:** The `UploadSwagger.ts` script uses the Google Drive API to upload `schema.json` to a specific folder, ensuring the latest schema is always accessible to the frontend.

## Branch-specific Schema Handling
To differentiate schemas from different branches, the schema file name includes the branch name. The `UploadSwagger.ts` script fetches the current branch and appends it to the schema file name before uploading.

### Step-by-Step Process

1. **Fetch Current Branch:** The `UploadSwagger.ts` script fetches the current Git branch.
2. **Append Branch Name:** Append the branch name to the `schema.json` file name (e.g., `schema-main.json` for the main branch).
3. **Upload with Branch Name:** Upload the schema file with the appended branch name to Google Drive, allowing multiple schemas from different branches to coexist without overwriting each other.

## Schema Hashing
To minimize unnecessary uploads, the schema file name includes a checksum. The `UploadSwagger.ts` script calculates the MD5 checksum of the schema file and compares it to avoid uploading identical files.

### Step-by-Step Process

1. **Calculate MD5 Checksum:** Calculate the MD5 checksum of the local `schema.json` file before uploading.
2. **Compare with Remote:** Retrieve the checksum of the existing schema file on Google Drive and compare.
3. **Conditional Upload:** If the checksums differ, append the checksum to the file name and upload the updated schema. Skip the upload if they match, avoiding redundant uploads.

## Middleware
A custom middleware checks for a specific token in the headers.

### Step-by-Step Process

1. **Create Middleware:** Define a middleware function using TSOA to check for a specific token in the request headers.
2. **Apply Middleware:** Use TSOA decorators to apply the middleware to routes, ensuring every request to protected routes includes the required token.
3. **Token Verification:** Verify the token in the middleware function. If valid, proceed with the request; otherwise, return an unauthorized error.

