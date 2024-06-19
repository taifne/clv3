import { cx } from "class-variance-authority"
import { getColorByName, getName } from "@/components/Avatar/LetterAvatar.Util"
import { FC, HTMLProps } from "react"

type LetterAvatarProps = HTMLProps<HTMLDivElement> & {
    label: string
    size: number
}

const LetterAvatar: FC<LetterAvatarProps> = ({ className, label, size }) => {
    const name = getName(label)

    return (
        <div
            style={{ width: size, height: size, backgroundColor: getColorByName(name) }}
            className={cx("inline-flex overflow-hidden cursor-pointer rounded-full capitalize text-white items-center justify-center", className)}
            data-label={label}
            data-name={name}
        >
            <span
                data-label={label}
                data-name={name}
                style={{ fontSize: 0.45 * size, lineHeight: `${0.45 * size}px` }}
                className="select-none font-medium"
            >
                {name}
            </span>
        </div>
    )
}

export default LetterAvatar