
# Crud App api

Provides endpoints for a simple crud api

api is consumed via REST clients and testing tools eg Postman
## API Reference

#### Get all users

```http
  GET https://desolate-wildwood-35191.herokuapp.com/api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


#### Get user

```http
  GET https://desolate-wildwood-35191.herokuapp.com/api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |


#### Create user

```http
  POST https://desolate-wildwood-35191.herokuapp.com/api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required**. name, email and country of user to create


#### Update user

```http
  PUT https://desolate-wildwood-35191.herokuapp.com/api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to update


#### Delete user

```http
  POST https://desolate-wildwood-35191.herokuapp.com/api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete
  
