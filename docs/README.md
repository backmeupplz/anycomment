# General notes

- API runs at https://backend.anycomment.org
- After obtaining `token` at `/login` you should sign all private requests with it putting it into `token` header

# API documentation

# `/login`

## [Public] POST `/google`

Returns you the [User](#user) object

### Parameters

| field       | Required | type   | description                   |
| ----------- | -------- | ------ | ----------------------------- |
| accessToken | yes      | string | Access token to sign requests |

# `/comments`

## POST `/`

Add a comment to the database

### Parameters

| field | Required | type   | description         |
| ----- | -------- | ------ | ------------------- |
| text  | yes      | string | Text of the comment |
| url   | yes      | string | URL of the website  |

## [Public] GET `/`

Get a list of [Comments](#comment) for the url

### Parameters

| field | Required | type   | description                      |
| ----- | -------- | ------ | -------------------------------- |
| url   | yes      | string | URL of the website               |
| skip  | no       | number | Pagination skip, defaults to 0   |
| limit | no       | number | Pagination limit, defaults to 20 |

# Data models

### User

| field | type   | description                                   |
| ----- | ------ | --------------------------------------------- |
| \_id  | string | Database ID                                   |
| email | string | _Optional_ User's email                       |
| name  | string | _Optional_ User's access token for anycomment |

### Comment

| field | type          | description           |
| ----- | ------------- | --------------------- |
| text  | string        | Text of the comment   |
| user  | [User](#user) | Author of the comment |
