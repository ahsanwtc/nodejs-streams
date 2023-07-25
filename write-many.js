const { open } = require('node:fs/promises');

(async () => {
  let filehandle;
  try {
    filehandle = await open('thefile.txt', 'w');
    console.time('write-time');
    for (let i = 0; i < 1000000; i++) {
      await filehandle.write(i.toString());
    }
    console.timeEnd('write-time');
  } catch(e) {
    console.log(e);
  }
  finally {
    await filehandle?.close();
  } 
})();