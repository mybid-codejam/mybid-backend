# MyBid Backend

## Migrations

- Configuration for `development`
  ```json
  "development": {
    "username": "root",
    "password": null,
    "database": "mybid_backend",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  ```
- Migrate database
  ```bash
  > npm run migrate
  ```
- Delete all table
  ```bash
  > npm run migrate:clean
  ```
