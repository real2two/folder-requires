const fs = require("fs").promises;

/**
 * 
 * @param {string} parentFolder The folder to load.
 * @returns An array containing all require()s.
 */

module.exports = async parentFolder => {
    if (typeof parentFolder !== "string") throw "The parent folder must be a string";
    if (parentFolder.length === 0) throw "The parent folder cannot be empty";

    const object = [];

    try {
        await loadFolder();

        return object;
    } catch(err) {
        console.log(err);

        return null;
    }

    async function loadFolder(structure = []) {
        const subFolder = `${parentFolder}${structure.length === 0 ? "" : `\\${structure.join("\\")}`}`;
        const files = await fs.readdir(subFolder, { withFileTypes: true });
    
        const folders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        const scripts = files.filter(dirent => !dirent.isDirectory() && dirent.name.endsWith(".js")).map(dirent => dirent.name);
        
        for (const folder of folders) {
            await loadFolder([ ...structure, folder ]); 
        };
    
        for (const script of scripts) {
            object.push(require(`${subFolder}\\${script}`));
        };
    }
}