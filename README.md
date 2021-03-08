# Url short node

Is a nodejs/typescript api for url short.

## Installation

Use the npm or yarn to install dependencies for project and docker-compose to up a database.

```bash
npm install
docker-compose up -d
```

## Up app on dev

```bash
npm run start:dev
```
## Build and start
```bash
npm start
```
## Build
```bash
npm run build
```
## Run tests
```bash
npm run test
```

## Free Routes
GET /:urlCode [redirect to original url]

POST /companies [Create a new company and return apikey]

## Secure routes [Send apikey in header eg: apikey: "s5ad4asd65a4d56a"]
POST /redirects [Create a new url short]
```json
{
"original_url": "https://google.com",
"external_id": optional,
"url_code": optional
}
```

GET /redirects [Return all rdirects created by company]


## License
[MIT](https://choosealicense.com/licenses/mit/)