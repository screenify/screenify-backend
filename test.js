const { readFileSync, writeFileSync } = require("fs");
// const path =require('path')
(async () => {
  const output = await readFileSync(
    "/home/adam/Downloads/LRM_EXPORT_133408325172445_20181117_220946218-removebg-preview (1).png",
    { encoding: "base64" }
  );
  await writeFileSync("./phote.txt", output);
  //   console.log(output);
})();
