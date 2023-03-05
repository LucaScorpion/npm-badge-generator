# npmbadge.com

[![Publish](https://github.com/LucaScorpion/npmbadge.com/actions/workflows/publish.yml/badge.svg)](https://github.com/LucaScorpion/npmbadge.com/actions/workflows/publish.yml)
[![Checks](https://github.com/LucaScorpion/npmbadge.com/actions/workflows/checks.yml/badge.svg)](https://github.com/LucaScorpion/npmbadge.com/actions/workflows/checks.yml)

Classy NPM badges.
The spiritual successor to nodei.co.

## Development

To start the server locally, simply run these commands:

```shell
npm i
npm start
```

The server will run on port 3000.
You can now generate a badge by going to `http://localhost:3000/npm/{package-name}`,
for example: http://localhost:3000/npm/express.

### References

NPM registry API docs: https://github.com/npm/registry/tree/master/docs
