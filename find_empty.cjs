const fs = require('fs');
const path = require('path');

function findEmpty(dir) {
    let emptyDirs = [];
    let emptyFiles = [];

    function traverse(currentDir) {
        if (currentDir.includes('node_modules') || currentDir.includes('.git')) return false;

        const files = fs.readdirSync(currentDir);
        if (files.length === 0) {
            emptyDirs.push(currentDir);
            return true;
        }

        let isEmpty = true;
        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                const childEmpty = traverse(fullPath);
                if (!childEmpty) isEmpty = false;
            } else {
                isEmpty = false;
                if (stat.size === 0) {
                    emptyFiles.push(fullPath);
                }
            }
        }
        if (isEmpty) {
            emptyDirs.push(currentDir);
        }
        return isEmpty;
    }

    traverse(dir);
    return { emptyDirs, emptyFiles };
}

const result = findEmpty('.');
console.log(JSON.stringify(result, null, 2));
