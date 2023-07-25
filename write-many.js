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
// const fs = require('node:fs');
// (async () => {
//   let filehandle;
  
//     console.time('write-time');
//     fs.open('thefile.txt', 'w', (err, fd) => {
//       for (let i = 0; i < 1000000; i++) {
//         fs.write(fd, i.toString(), () => {});
//       }
//       console.timeEnd('write-time');
//     }); 
// })();

// const fs = require('node:fs/promises');

// Execution time: 555ms
// CPU Usage: cant benchmark due to quick exe time
// Memory Usage: cant benchmark due to quick exe time
// not a production ready code
// (async () => {
//   try {
//     console.time('write-time');
//     const filehandle = await fs.open('thefile.txt', 'w');
//     const stream = filehandle.createWriteStream();
//     for (let i = 0; i < 1000000; i++) {
//       const buffer = Buffer.from(` ${i} `, 'utf-8');
//       stream.write(buffer);
//     }
//     console.timeEnd('write-time');
//   } catch(e) {
//     console.log(e);
//   } 
// })();


const fs = require('node:fs/promises');

// Execution time: 750ms
// CPU Usage: cant benchmark due to quick exe time
// Memory Usage: cant benchmark due to quick exe time
// not a production ready code
(async () => {
  let i = 0;
  console.time('write-time');
  const filehandle = await fs.open('thefile.txt', 'w');
  const stream = filehandle.createWriteStream();

  const write = () => {
    while (i < 1000000) {
      const buffer = Buffer.from(` ${i} `, 'utf-8');

      // last write
      if (i === 999999) {
        stream.end(buffer);
        return;
      }

      // stream full, wait for drain
      if (!stream.write(buffer)) break;

      i++;
    }
  };

  write();

  stream.on('drain', () => {
    write();
  });

  stream.on('finish', () => {
    console.timeEnd('write-time');
    filehandle.close();
  });
  
})();