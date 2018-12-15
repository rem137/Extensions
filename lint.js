const { readFileSync, readdirSync, writeFileSync } = require('fs')
const assert = require('assert')

let keys = [
    'user',
    'id',
    'package',
    'title',
    'description',
    'env'
]

function isValidEnv(env) {
    return env.replace(/\s|\+|all|browser|cli|cloud|mac|/g, '').length === 0
}

function validateJSON(json) {
    assert.ok(Array.isArray(json), 'JSON must be an array')

    let seen = []

    json.forEach(ex => {
        let id = ex.id || JSON.stringify(ex)

        assert.deepEqual(Object.keys(ex), keys, `Missing key or extra key for ${id}`)
        assert.ok(isValidEnv(ex.env), `Invalid env for ${id}`)
        assert.ok(!ex.package.includes('github.com'), `package should not link directly to github, ${id}`)
        assert.ok(!ex.package.includes('gitcdn.xyz/cdn'), 'gitcdn.xyz links should use /repo not /cdn')

        if (seen.includes(id)) {
            assert.fail(`Duplicate id ${id}`)
        }
        seen.push(id)
    })
}

function sortExtensions(json) {
    return json.sort((a, b) => a.title.localeCompare(b.title, 'standard', { sensitivity: 'base' }))
}

readdirSync('.')
    .filter(file => file.endsWith('.json'))
    .forEach(file => {
        try {
            let content = JSON.parse(readFileSync(file))
            validateJSON(content)
            writeFileSync(file, JSON.stringify(sortExtensions(content), null, 4) + '\n')
            console.log(`OK [${file}]: Lint passed, formatted file.`)
        } catch (error) {
            console.log(`ERROR [${file}]: `, error.message)
        }
    })
