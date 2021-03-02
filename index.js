'use strict';

module.exports = {
    clientId: '',
    clientSecret: '',
    authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
    accessTokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
    redirectURI: 'http://localhost:3000/callback',
    sessionName: '',
    sessionKeys: ['', '']
};
'use strict';

const request = require('request');
const { clientId, clientSecret, authorizationURL, redirectURI, accessTokenURL } = require('../config');

class API {

}
// create Port for Heroku
let port = process.env.PORT||9000
module.exports = API;
getAuthorizationUrl() 
        const state = Buffer.from(Math.round( Math.random() * Date.now() ).toString() ).toString('hex');
        const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
        const url = `${authorizationURL}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectURI)}&state=${state}&scope=${scope}`;
        return url;
    
    app.get('/auth', (req, res) => {
    res.redirect(API.getAuthorizationUrl());
});
 
app.get('/callback', async (req, res) => {
    if(!req.query.code) {
        res.redirect('/');
        return;
    }
    try {
        const data = await API.getAccessToken(req);
        if(data.access_token) {
            req.session.token = data.access_token;
            req.session.authorized = true;
        }
        res.redirect('/');
    } catch(err) {
        res.json(err);
    }
})
 getLinkedinId(req) 
        return new Promise((resolve, reject) => {
            const url = 'https://api.linkedin.com/v2/me';
            const headers = {
                'Authorization': 'Bearer ' + req.session.token,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0' 
            };

            request.get({ url: url, headers: headers }, (err, response, body) => {
                if(err) {
                    reject(err);
                }
                resolve(JSON.parse(body).id);
            });
        });
    
    app.get('/', async (req, res) => {
    const isAuthorized = (req.session.authorized);
    if(!isAuthorized) {
        res.render('index', { isAuthorized, id: '' });
    } else {
        try {
            const id = await API.getLinkedinId(req);
            res.render('index', { isAuthorized, id });
        } catch(err) {
            res.send(err);
        }
    }    
});
publishContent(req, linkedinId, content) 
        const END_POINT = 'https://api.linkedin.com/v2/shares';
        const { title, text, shareUrl, shareThumbnailUrl } = content;
        const body = {
            owner: 'urn:li:person:' + linkedinId,
            subject: title,
            text: {
                text: text
            },
            content: {
                contentEntities: [{
                    entityLocation: shareUrl,
                    thumbnails: [{
                        resolvedUrl: shareThumbnailUrl
                    }]
                }],
                title: title
            },
            distribution: {
                linkedInDistributionTarget: {}
            }
        };
        const headers = {
            'Authorization': 'Bearer ' + req.session.token,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'x-li-format': 'json'
        };

        return new Promise((resolve, reject) => {
            request.post({ url: url, json: body, headers: headers}, (err, response, body) => {
                if(err) {
                    reject(err);
                }
                resolve(body);
            });
        });

    
    app.post('/publish', async (req, res) => {
    const { title, text, url, thumb, id } = req.body;
    const errors = [];

    if(validator.isEmpty(title)) {
        errors.push({ param: 'title', msg: 'Invalid value.'});
    }
    if(validator.isEmpty(text)) {
        errors.push({ param: 'text', msg: 'Invalid value.'});
    }
    if(!validator.isURL(url)) {
        errors.push({ param: 'url', msg: 'Invalid value.'});
    }
    if(!validator.isURL(thumb)) {
        errors.push({ param: 'thumb', msg: 'Invalid value.'});
    }

    if(errors.length > 0) {
        res.json({ errors });
    } else {
        const content = {
            title: title,
            text: text,
            shareUrl: url,
            shareThumbnailUrl: thumb
        };

        try {
            const response = await API.publishContent(req, id, content);
            res.json({ success: 'Post published successfully.' });
        } catch(err) {
            res.json({ error: 'Unable to publish your post.' });
        }
    }
});
// Listen Server
app.listen(port, () => {
    console.log("Server running on port " + port);
});