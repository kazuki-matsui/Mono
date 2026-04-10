const AdmZip = require("adm-zip");

const data = new AdmZip("World.mono");
const item = JSON.parse(data.getEntry("citrus/item/apple.json").getData());

console.log(item);