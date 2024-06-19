import { partition } from "lodash"
import { Children, FC, PropsWithChildren, isValidElement } from "react"

type WhenProps = PropsWithChildren & {
    isTrue: boolean
}

const When: FC<WhenProps> = ({ isTrue, children }) => isTrue && children

const Else: FC<PropsWithChildren> = ({ children }) => children

const Conditional: FC<PropsWithChildren> = ({ children }) => {

    const [conditionalElements, elements] = partition(
        Children.toArray(children),
        (child) => isValidElement(child) && (child.type === When || child.type === Else)
    )

    const when = conditionalElements.find(
        (child) => isValidElement(child) && child.type === When && child.props.isTrue
    )

    const otherwise = conditionalElements.find(
        (child) => isValidElement(child) && child.type === Else
    )

    return (
        <>
            {when || otherwise}
            {elements}
        </>
    )
}

const Rendering = {
    Else,
    When,
    Conditional,
}

export default Rendering 