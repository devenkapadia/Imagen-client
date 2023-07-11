import { React } from 'react'
import "./askq.css"
import bot from "../../assets/bot.svg"
import user from "../../assets/user.svg"
import send from "../../assets/send.svg"
import { useState } from 'react'

const Askques = () => {

    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let chatlogNew = [...chatLog, { user: "me", message: `${input}` }]
        setChatLog(chatlogNew)
        setInput("")
        try {
            const messeges = chatlogNew.map((message) => message.message).join("\n")
            const response = await fetch('http://localhost:8080/api/v1/askq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messeges
                }),
            });
            const data = await response.json();
            setChatLog([...chatlogNew, { user: "gpt", message: `${data.message}` }])
            console.log(data.message)
        } catch (error) {
            setChatLog([...chatlogNew, { user: "gpt", message: "Server is not responding" }])
            console.log(error)
        }

    }
    const clearChat = () => {
        setChatLog([])
    }

    return (
        <div className='askqcont'>
            <aside className='sidemenu'>
                <div className="newchat" onClick={clearChat}>
                    <span>+</span> New Chat
                </div>
            </aside>
            <section className='chats'>
                <div className="chatlog">
                    {chatLog.map((message, index) =>
                        <ChatMessage key={index} message={message} />
                    )}
                </div>
                <div className="chat-input-holder">
                    <form className='textform' onSubmit={handleSubmit}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            name="name"
                            className="chat-input-text" placeholder='Type your query here' />
                        <button disabled={!input.trim()} type="submit"><img src={send} alt="send" /></button>
                    </form>
                </div>
            </section>
        </div>
    )
}

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-msg ${message.user === "gpt" && "chatgpt"}`}>
            <div className="chat-msg-center">
                <div className="avtar">
                    {message.user === "gpt" ?
                        <img src={bot} alt="bot" />
                        : <img src={user} alt="user" />}
                </div>
                <div className="msg">
                    {message.message}
                </div>
            </div>
        </div>
    )
}

export default Askques
