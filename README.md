# BHMB-Extensions

This is a list of extensions for the [Blockheads MessageBot](https://github.com/Bibliofile/Blockheads-MessageBot). If you want to add your extension, review the instructions below and submit a pull request.

## Adding an extension

For extensions to be added to this list, they must be publicly available on GitHub. Stable releases can be added to `extensions.json` and must include a stable commit link. Beta extensions can be added to `extensions_beta.json` and may use branches such as `master` as the version of the extension. When adding extensions, please keep them sorted alphabetically by `title`.

```json
{
    "user": "Bibliofile",
    "repo": "BHMB-Slash-OP",
    "file": "biblio_op.js",
    "version": "v1.2.1",
    "title": "OP Messages",
    "description": "Let players use /op to send a message to you.",
    "env": "all"
}
```

| Entry | Description |
| --- | --- |
| `user` | Your GitHub username |
| `repo` | The Repo your extension lives in |
| `file` | The file (or path to a file) that the extension is contained in |
| `version` | The tag or commit ish that should be used to get the correct version of your extension |
| `title` | The title to display to users of the bot. |
| `description` | The description to display to users of the bot. |
| `env` | The environments the extension supports. More below. |

The `env` property can contain any of the following values, which can be combined with a `+` to specify more than one. Whitespace is ignored.

- `all` - All bot environments are supported.
- `browser` - Any browser, does not include Electron.
- `cli` - Any command line.
- `electron` - Only supported in Electron.
- `cloud` - Only cloud servers are supported.
- `mac` - Only Mac servers are supported.

Examples:
- `browser+electron` - Will only be loaded if in a browser (launched with a bookmarklet), or in Electron
- `electron + mac` - Will only be loaded if in Electron on a Mac