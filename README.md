# BHMB-Extensions

This is a list of extensions for the [Blockheads MessageBot](https://github.com/Blockheads-MessageBot/MessageBot). If you want to add your extension, review the instructions below and submit a pull request.

## Adding an extension

For extensions to be added to this list, they must be publicly available on GitHub. Stable releases can be added to `extensions.json` and must include a stable commit link. Beta extensions can be added to `extensions_beta.json` and may use branches such as `master` as the version of the extension. When adding extensions, please keep them sorted alphabetically by `title`.

```json
{
    "user": "Bibliophile",
    "id": "slash-op",
    "package": "https://gitcdn.xyz/repo/Bibliofile/BHMB-Slash-OP/master/biblio_op.js",
    "title": "OP Messages",
    "description": "Let players use /op to send a message to you.",
    "env": "all"
}
```

| Entry | Description |
| --- | --- |
| `user` | Your GitHub username |
| `id` | The ID of the extension that will be registered. Must be lowercase. |
| `package` | The URL, github repo, or npm package name of the extension. See the loading procedure below for details. |
| `title` | The title to display to users of the bot. |
| `description` | The description to display to users of the bot. |
| `env` | The environments the extension supports. More below. |

#### The `env` field
The `env` property can contain any of the following values, which can be combined with a `+` to specify more than one. Whitespace is ignored.

- `all` - All bot environments are supported. (Can be specified if you use only the bot's api)
- `browser` - Supports browsers
- `cli` - Supports command lines.
- `cloud` - Supports cloud servers.
- `mac` - Supports Mac servers.

If neither `cloud` nor `mac` is specified, it is assumed that both are supported.

Examples:
- `browser+cloud` - Will only be loaded if in a browser for cloud servers.
- `cli + mac` - Will only be loaded if in a cli environment on a Mac

## Loading procedure

When an extension is installed, extension managers take the following steps: 
1. If `package` ends in `.js`, `.mjs`, or `.es`, take the `package` field to be a JS file and load directly.
1. If the `package` field is not a JS file, install as a dependency using `npm`, or error if not possible.
