import Typography from "./Typography"

export default function Button ({ text, ...params }) {
    return (
        <div>
            <button>{text}</button>
            <Typography paragraph="Texto del párrafo"/>
        </div>
    )
}