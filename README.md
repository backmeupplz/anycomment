# Anycomment backend code

## Installation and local launch

1. Clone this repo: `git clone https://github.com/backmeupplz/anycomment`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn install` in the root folder
5. Run `yarn develop`

And you should be good to go! Feel free to fork and submit pull requests. Documentation is [also available](https://github.com/backmeupplz/anycomment/tree/master/docs) in this repo.

## Environment variables

| Name    | Description               |
| ------- | ------------------------- |
| `MONGO` | URL of the mongo database |
| `JWT`   | secret for JWT            |

Also, please, consider looking at `.env.sample`.

## Continuous integration

Any commit pushed to master gets deployed to [backend.anycomment.org](https://backend.anycomment.org) via [CI Ninja](https://github.com/backmeupplz/ci-ninja).
