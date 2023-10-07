
const projectId = 'irma-sql';

const {Storage} = require('@google-cloud/storage');

async function renameFiles() {

  const storage = new Storage({
    projectId,
  });

  let bucket = await storage.bucket('irma_photos');

 const [files] = await bucket.getFiles({
  autoPaginate: true,
  prefix: 'appsheet/data/ComponentReceivingManagement_225876/Pickup_Images/'
 });
 let count = files.length;
 let numProcessed = 0;
 console.log(count);
  files.forEach(async file => {
    let oldName = file.name;
    let nameStep1 = file.name.replaceAll('-','_');
    let newName = nameStep1.replaceAll(' ','_');
    try { await bucket.file(oldName).rename(newName);
    numProcessed++
    if (numProcessed % 1000 == 0) {console.log(`renamed ${numProcessed} / ${count}`)}
    } catch (error) {
      console.error(error);
    }
  })
}
renameFiles();

function automate() {
  console.log('focus on the things that matter.');
}