

const getReadableDate = (timestamp, options) => {
    const date = new Date(timestamp);
    const pad = n => (n < 10 ? "0" + n : n);
    if (options === undefined) {
        return date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) + "_" + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds());
    } else if (options.date === true) {
        return date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
    } else if (options.time === true) {
        return date.getFullYear() + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds());
    }
};

const dateTime = date => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(9, 11);
    const minute = date.substring(11, 13);
    const second = date.substring(13, 15);
    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
};

const pause = timeout => new Promise(resolve => setTimeout(() => resolve(), timeout));

const getTimestampAt = (date, time) => {
    const d = new Date();
    if (date !== undefined) {
        date = date.split("/");
        if (date[0] !== undefined) d.setFullYear(date[0]);
        if (date[1] !== undefined) d.setMonth(date[1]);
        if (date[2] !== undefined) d.setDate(date[2]);
    }
    if (time !== undefined) {
        time = time.split(":");
        if (time[0] !== undefined) d.setHours(time[0]);
        if (time[1] !== undefined) d.setMinutes(time[1]);
        if (time[2] !== undefined) d.setSeconds(time[2]);
    }
    return +d;
};

const schedule = timestamp => new Promise(resolve => setTimeout(() => resolve(), timestamp - Date.now()));

const minute = m => m * 60000;

const second = s => s * 1000;

const getIP = () => bash("curl ipinfo.io/ip");

const getTemp = () => bash("cat /sys/class/thermal/thermal_zone0/temp");


module.exports = {
    getReadableDate,
    pause,
    minute,
    second,
    dateTime,
    getIP,
    getTemp,
    schedule,
    getTimestampAt
};