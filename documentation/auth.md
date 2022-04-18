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