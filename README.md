## install

```bash
# deprecated
# npm install joke-cli -g
```

## usage

if you want to use the default function, use the following command:

```bash
joke create <projectName>
```

⚠️ NOTE: if you are interested in the internal operating principle, it's better to use `npm link`:

1. `git clone ...`
2. `npm link`

then, back to your project and use `npm link joke-cli` to link it to your project.

## Change log

### 1.0.3

1. replace `webpack.config.js` with `joke.config.js`
2. provide different config for develop and production mode


## License

[MIT](https://github.com/ThinkMars/joke-cli/blob/main/LICENSE)