module.exports.stringify = url => {
    const keys = Object.keys(url);
    const vals = Object.values(url);
    let str = '';
    for (let i = 0; i < keys.length; i += 1) {
        str += `${keys[i]}=${vals[i]}&`;
    }
    return str.slice(0, -1);
};
