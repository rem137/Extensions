const { readFileSync, readdirSync, writeFileSync } = require('fs')
const assert = require('assert')

const keys = [
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

function validateJSON(json, file) {
    assert.ok(Array.isArray(json), 'JSON must be an array')

    const seen = new Set()

    json.forEach(ex => {
        const id = ex.id

        assert.deepEqual(Object.keys(ex), keys, `Missing key or extra key for ${id}`)
        assert.ok(isValidEnv(ex.env), `Invalid env for ${id}`)
        assert.ok(!ex.package.includes('github.com'), `package should not link directly to github, ${id}`)

        if (ex.package.includes('gitcdn.xyz')) {
            console.log(`WARN [${file}]: gitcdn.xyz links should not be used due to stability, ${id}`)
        }

        if (seen.has(id)) {
            assert.fail(`Duplicate id ${id}`)
        }
        seen.add(id)
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
            validateJSON(content, file)
            writeFileSync(file, JSON.stringify(sortExtensions(content), null, 4) + '\n')
            console.log(`OK [${file}]: Lint passed, formatted file.`)
        } catch (error) {
            console.log(`ERROR [${file}]: `, error.message)
        }
    })
