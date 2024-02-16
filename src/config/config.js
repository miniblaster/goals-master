let environment = 'production';

let config = {}
if( environment ==="development"){
    config = {
        "base_url":'http://localhost:3000/',
        "api_url":'http://localhost:7999/api/v1/',
        "django_url":  'http://62.171.152.115:8001/',
    }
}
else{
    config = {
        "base_url":'http://62.171.152.115:5000/',
        "api_url": 'http://62.171.152.115:7999/api/v1/',
        "django_url":  'http://62.171.152.115:8001/',
    }
}
export default config;
