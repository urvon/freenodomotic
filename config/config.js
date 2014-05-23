var channels = {
    change : 'app.event.sensor.object.behavior.change'
}
var config = {
    freedomoticIP: '127.0.0.1',
    freedomoticRestPort: '8111',

    jsonSuffix:'?media=json',
    urlEnvironment: 'http://127.0.0.1:8111/v2/environments/',
    urlObject: 'http://127.0.0.1:8111/v2/objects/',
    urlPlugin: 'http://127.0.0.1:8111/v2/plugins/',
    urlCommandUser: 'http://127.0.0.1:8111/v2/commands/user/',
    urlCommandHard:'http://localhost:8111/v2/commands/hardware/',
    urlTrigger: 'http://127.0.0.1:8111/v2/triggers/'
    }

module.exports = config;