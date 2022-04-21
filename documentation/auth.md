# Authentication 

## Backend
The backend offers a JWT-based authentication. The routes can be found in Swagger.

- The JWT token is valid 10 hours
- The refresh token is valid up to one month

At the moment, all routes but the ones below require a valid token in the `Authorization` header (in the form of `Bearer XYZ`). 

- `/docs`: (*)Access to the swagger UI
- `/token/get`: (*) Authentication
- `/token/refresh`: (*) Token refresh
- `/app_users`: (POST) User creation (for sign-up)

At the moment, no OAuth through Google or any other provider is possible. 

Password requirement: The password should

- At least have one special char (non alphanum)
- At least have one uppercase char
- At least have one digit
- Be at least 8 chars long

This can be modified in `App\DataPersisters\AppUserDataPersister` (maybe we could add a configuration for that later)