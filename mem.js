const { exec } = require('child_process');
const os = require('os');
const totalMem = os.totalmem();
const freeMem = os.freemem();

/**
 * Format memory in GB, MB, KB, B
 * @param { number } mem memory in bytes
 */
function dealMem(mem) {
  let G = 0,
      M = 0,
      KB = 0;
  (mem>(1<<30))&&(G=(mem/(1<<30)).toFixed(2));
  (mem>(1<<20))&&(mem<(1<<30))&&(M=(mem/(1<<20)).toFixed(2));
  (mem>(1<<10))&&(mem>(1<<20))&&(KB=(mem/(1<<10)).toFixed(2));
  return G>0?G+'GB':M>0?M+'MB':KB>0?KB+'KB':mem+'B';
};

console.log("内存大小："+dealMem(totalMem)+' 空闲内存：'+dealMem(freeMem));

exec('Get-WmiObject win32_physicalmemory', {'shell':'powershell.exe'}, (error, stdout, stderr)=> {
  let jsonResult = [];
  let result = stdout
    .replace(/["]+/g, "")
    .replace(/[ ]+[:]+[ ]+/g, "\":\"")
    .replace(/[ ]+/g, '')
    .replace(/Activecodepage:/, "Activecodepage\":\"")
    .replace(/\r\n\r\n\r\n/, "\"},\&{\"")
    .replace(/\r\n\r\n/, "\"},\&{\"")
    .replace(/[\r\n]+/g, "\",\"")
    .replace(/[\\]+/g, "\/");
  result = "{\"" + result.substr(0,result.length-2) + "}";
  result.split(/,\&+/g).forEach((res) => {
    let json = JSON.parse(res);
    jsonResult.push(json);
  });
  console.log(jsonResult);
})

console.log(dealMem(17179869184));