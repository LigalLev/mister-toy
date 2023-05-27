export const SET_TOYS = 'SET_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_LABELS = 'SET_LABELS'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: {},
    isLoading: false,
    labels: []
}

export function toyReducer(state = initialState, action) {
    let toys
    let toysToDisplay
    switch (action.type) {
        // Toys
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toysToDisplay = state.toys.toysToDisplay.filter(c => c._id !== action.toyId)
            return { ...state, toys: { ...state.toys, toysToDisplay } }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toysToDisplay = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys: { ...state.toys, toysToDisplay } }
        case SET_LABELS:
            return { ...state, labels: action.labels }
        default:
            return state
    }
}