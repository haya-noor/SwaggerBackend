"use strict";
const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const [major, minor, patch] = packageJson.version.split('.').map(Number);
const newVersion = process.argv[2];
let newVersionNumber;
switch (newVersion) {
    case 'major':
        newVersionNumber = `${major + 1}.0.0`;
        break;
    case 'minor':
        newVersionNumber = `${major}.${minor + 1}.0`;
        break;
    case 'patch':
        newVersionNumber = `${major}.${minor}.${patch + 1}`;
        break;
    default:
        console.error('Usage: node version-bump.js [major|minor|patch]');
        process.exit(1);
}
packageJson.version = newVersionNumber;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8');
console.log(`Version bumped to ${newVersionNumber}`);
