const phrtime = require('pretty-hrtime');

export default ({ app }, inject) => {
    inject('prettyTime', (time) => {
        return phrtime(time);
    })
}
