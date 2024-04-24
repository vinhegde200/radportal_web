export class TestData {
    loginresponse_success = {
        "data": {
            "id": 1,
            "username": "Test User",
            "email": "testuser@abc.com",
            "roles": [
                {
                    "id": 1,
                    "name": "admin",
                    "description": null
                }
            ],
            "password": null,
            "accesstoken": "fake_access_token"
        }
    };

    loginresponse_error = {
        "code": 100,
        "message": "Invalid username or password"
    };

}

