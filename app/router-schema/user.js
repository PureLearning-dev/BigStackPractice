// user.js
module.exports = {
    'POST /api/user/login': {
        type: 'object',
        properties: {
            username: { type: 'string', minLength: 3 },
            password: { type: 'string', minLength: 6 }
        },
        required: ['username', 'password']
    },
    'GET /api/user/:id': {
        type: 'object',
        properties: {
            id: { type: 'string', pattern: '^[a-f0-9]{24}$' }
        }
    }
}