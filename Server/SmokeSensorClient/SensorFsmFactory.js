const sensorDataMap = {};
const {getAllRoomInfo} = require('../DB/DBRouter');
let timeClock = undefined;
let senderClock = undefined;
function initSensorData() {
    var room_no = 1;
                sensorDataMap[room_no] = {
                    roomNo: +room_no,
                    pm2p5CC: '未测出',
                    temperature: '未测出',
                    humidity: '未测出',
                    pm10CC: '未测出'
                };
        module.exports.startUpdateSensorData();
    console.log("function");
}

module.exports = {
    initSensorData: initSensorData,
    startUpdateSensorData: () => {
        console.log('开始发送查询消息');
        const {queryData} = require('./SensorMsgHandler');
        let roomNoList = Object.keys(sensorDataMap);
        //如果已经存在定时器则先清除，保证同时只能存在一个定时器
        if (timeClock !== undefined) {
            clearInterval(timeClock);
            clearInterval(senderClock);
        }
        let roomNo = 1;
        let maxRoomNo = roomNoList.length;
        senderClock = setInterval(() => {
            queryData(roomNo);
            if (roomNo === maxRoomNo) {
                roomNo = 1;
            } else {
                roomNo += 1
            }
        }, 500);
    },
    closeclock:()=>{
        if (timeClock !== undefined && senderClock !== undefined) {
            clearInterval(timeClock);
            clearInterval(senderClock);
            console.log(' ===   close timer when client disconnect  === = ');
        }
    },
    /**
     *
     * @param roomNo
     * @param data {pm2p5CC,temperature,humidity,pm10CC}这四个值其中一个
     */
    updateSensorData: (roomNo, data) => {
        global.temp = data;
        if (sensorDataMap.hasOwnProperty(`${roomNo}`)) {
            sensorDataMap[roomNo] = {
                ...sensorDataMap[roomNo],
                ...data
            };

        } else {
            console.log('不存在此房间');
        }
    },

    getRoomSensorData: (roomNo) => {
        console.log(sensorDataMap);
        console.log("sensorDataMap");
        if (sensorDataMap.hasOwnProperty(`${roomNo}`)) {
            return sensorDataMap[roomNo];
        } else {
            console.log('无此房间传感器数据');
            return {
                pm2p5CC: '未测出',
                temperature: '未测出',
                humidity: '未测出',
                pm10CC: '未测出'
            };
        }
    }
};
