import { Dispatch, useReducer } from 'react'

function mergeStateReducer<T>(state: T, newState: Partial<T>): T {
    return { ...state, ...newState } as T
}

export default function useMergeState<T>(initialState: T): [T, Dispatch<Partial<T>>] {
    const [state, dispatch] = useReducer(mergeStateReducer, initialState as Partial<T>) as [T, Dispatch<Partial<T>>]
    return [state, dispatch]
}