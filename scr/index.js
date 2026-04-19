const AdmZip = require("adm-zip");

const data = new AdmZip("World.mono");
const apple = JSON.parse(data.getEntry("citrus/item/apple.json").getData());

const item = require('./World/citrus/item/apple.json');
console.log(apple.rarity);