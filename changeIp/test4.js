var callfile = require('child_process');
const path = require('path');
const fs = require('fs');
/** callfile.exec("/bin/bash net_config.sh",function (err, stdout, stderr) {
    // callback(err, stdout, stderr);
	console.log("ok")
}); **/
//setTimeout(() => {
  //函数路口
function netplan(ip,gateway4) {
    fs.readFile(path.join(__dirname, '../../50-cloud-init.yaml'), 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data.toString())
        console.log("readsuccess")
        // 把 IP 改为 127.0.0.2
        //if(data.toString().indexOf('15.200.19.127')>=0){
        let result = data.replace('15.200.19.127', ip)

        // }else{
        //   let result = data.replace('15.200.19.127', '192.168.0.18')
        // }
        let result3 = result.replace('15.200.19.1', gateway4)
        let result2 = result3.replace('15.200.19.1', gateway4)

        console.log(result2)
        fs.writeFile(path.join(__dirname, '../../50-cloud-init.yaml'), result2, 'utf8', function (err) {
            if (err) throw err;
            console.log('success done')
            console.log(result2);
            // setTimeout(() => {
            //	callfile.exec("/bin/bash apply.sh",function (err,stdout,stderr) {
            //          console.log('apply successful')
            //       });
            // },6*1000);
        })
    });
    callfile.exec("/bin/bash apply.sh", function (err, stdout, stderr) {
        console.log('apply successful')
    });
}
module.exports.netplan = netplan;
//	}, 10* 1000);
//});

// ubuntu123
