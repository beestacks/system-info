const OSUtils = require('./index');
const os = new OSUtils();
setInterval(()=>{os.getCPUUsage({ percentage: true }).then((res) => console.log(res))}, 10)