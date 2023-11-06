const { default: axios } = require("axios");

const ID = '5E225251-78EB-4F4C-B0D8-C00BD926BDA1';

const url = `https://api-${ID}.sendbird.com/v3/users`;
const query = '?token=e091cf239c7eaf295b2caf3f06a9d8e5b5fa4a40&limit=3&metadatakey=font_color&metadatavalues_in=black';

async function test () {
    try {
        const result = await axios.get(url + query);
    } catch (e) {
        console.error(e)
    }       
}

test();