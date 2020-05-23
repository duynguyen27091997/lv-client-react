export const toTime = function (seconds) {
    let h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    let m = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
    let s = String(Math.floor(seconds % 3600 % 60)).padStart(2, '0');
    return h + ':' + m + ':' + s;

};