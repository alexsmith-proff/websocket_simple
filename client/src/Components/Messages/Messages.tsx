import { FC } from 'react'

interface MessagesProps {
    messages: string[]
}

const Messages: FC<MessagesProps> = ({ messages }) => {
    return (
        <ul>
            {
                messages.map((message, index) => <li key={index}>{message}</li>)
            }
        </ul>
    )
}

export default Messages