const userReducerDefaultState = {
    'user_id': 0,
    'name': "Guest",
    'email': undefined,
    'token' : undefined
}

export default (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return action.user
        default:
            return state;
    }
}