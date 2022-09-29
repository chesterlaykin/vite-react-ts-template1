import { useState } from "react"

interface ITopic{
    title: string
    text?: string
    posts?: ITopicPost[]
}
interface ITopicPost{
    title: string
    text?: string
    image?: ''
}

export const SomeTest = () => {
    const [{ title, text, posts }, setTopic] = useState<ITopic>({
        title: '',
        text: '',
        posts: [] 
    });

    return <h1>Test!</h1>
}