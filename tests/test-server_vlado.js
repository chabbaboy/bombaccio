
var assert = require('assert');

$http.post({ method: 'POST',
        url: 'https://api.bimeye.com/rest/oauth',
        json: true,
        headers:
        { authorization: 'Basic YmltZXllY2xpZW50OnRlc3RwYXNz',
            'content-type': 'multipart/form-data;' },
        formData: { grant_type: 'client_credentials' }
    },
    // Callback
    function (err, response, body) {
        if (err) throw new Error('Authentication error: ' + err.message);

        assert.ok(response.statusCode == 200, 'Expected 200 OK response from Auth');

        // Extract an API token from the JSON response to use as a header in
        // subsequent requests

        var token = body.access_token;

        $http.get({ method: 'GET',
            url: 'https://api.bimeye.com/rest/room?access_token='+token+'&guid=apps_7bktzm4r-rct1-np9g-8ezmyotui6rb4zpt',
            json: true,
            headers: { 'content-type': 'application/json' }
        }, function (err, response, body) {
            if (err) throw new Error('Error getting items: ' + err.message);

            // Validate the response code
            assert.ok(response.statusCode == 200, 'Expected 200 OK from Room response');

            // Expect at least 10 widgets
            var objects = Object.keys(body);
            assert.ok(objects.length >= 10, 'Received more than one Room object');

            // Test fetching single room
            $http.get({ method: 'GET',
                url: 'https://api.bimeye.com/rest/room/'+objects[0]+'?access_token='+token+'&guid=apps_7bktzm4r-rct1-np9g-8ezmyotui6rb4zpt',
                json: true,
                headers: { 'content-type': 'application/json' }
            }, function (err, response, body) {
                if (err) throw new Error('Error getting items: ' + err.message);

                // Validate the response code
                assert.ok(response.statusCode == 200, 'Expected 200 OK from Single room response');

                // Expect at least 10 widgets
                var objects = Object.keys(body);
                assert.ok(objects.length >= 10, 'Received more than one parameter in room object');
            });
        });

        // Test fetch multiple projects
        $http.get({ method: 'GET',
            url: 'https://api.bimeye.com/rest/project?access_token='+token,
            json: true,
            headers: { 'content-type': 'application/json' }
        }, function (err, response, body) {
            if (err) throw new Error('Error getting items: ' + err.message);

            // Validate the response code
            assert.ok(response.statusCode == 200, 'Expected 200 OK from Project response');

            // Expect at least 10 widgets
            assert.ok(body.length >= 1, 'Received more than one Projects');

            var project = body[0].GUID;
            var name = body[0].Name;

            // Test fetch single projects
            $http.get({ method: 'GET',
                url: 'https://api.bimeye.com/rest/project/'+project+'?access_token='+token,
                json: true,
                headers: { 'content-type': 'application/json' }
            }, function (err, response, body) {
                if (err) throw new Error('Error getting items: ' + err.message);

                // Validate the response code
                assert.ok(response.statusCode == 200, 'Expected 200 OK from Single project response');
                assert.ok(body.GUID == project, 'Received GUID from project is good');
                assert.ok(body.Name == name, 'Received Name from project is good');
            });

        });
    }
);