// const { open } = require('node:fs/promises');

// Execution time: 23s
// CPU Usage: 115%
// Memory Usage: 50MB
// (async () => {
//   let filehandle;
//   try {
//     filehandle = await open('thefile.txt', 'w');
//     console.time('write-time');
//     for (let i = 0; i < 1000000; i++) {
//       await filehandle.write(i.toString());
//     }
//     console.timeEnd('write-time');
//   } catch(e) {
//     console.log(e);
//   }
//   finally {
//     await filehandle?.close();
//   } 
// })();

// Execution time: 1.66s
// CPU Usage: 11%
// Memory Usage: 1GB
const fs = require('node:fs');
(async () => {
  let filehandle;
  
    console.time('write-time');
    fs.open('thefile.txt', 'w', (err, fd) => {
      for (let i = 0; i < 1000000; i++) {
        fs.write(fd, i.toString(), () => {});
      }
      console.timeEnd('write-time');
    }); 
})();