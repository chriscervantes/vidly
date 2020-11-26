const config = require('config');

module.exports = function(){
console.log('test',config.get('jwtPrivateKey'))
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}