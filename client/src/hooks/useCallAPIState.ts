import { isUndefined } from "lodash"
import { useCallback, useState } from "react"

type State<T = any> = {
    idle: boolean
    success: boolean
    error: boolean
    loading: boolean
    data: T
}

function useCallAPIState<T = any>(initial: { data: T }): [State<T>, (action: "start" | "success" | "error" | "idle", data?: T) => void] {

    const [state, setState] = useState<State<T>>(
        () => {
            const { data } = initial
            return {
                idle: true,
                success: false,
                error: false,
                loading: false,
                data: data
            }
        }
    )

    const updateState = useCallback((action: "start" | "success" | "error" | "idle", data?: T) => {
        setState(prevState => ({
            idle: action === "idle",
            success: action === "success",
            error: action === "error",
            loading: action === "start",
            data: isUndefined(data) ? prevState.data : data
        }))
    }, [])

    return [state, updateState]
}

export default useCallAPIState
