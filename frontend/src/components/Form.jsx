import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'
import LoadingIndicator from "../pages/LoadingIndicator";

function Form({route, method}) {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()
    
    const name = method === 'login' ? 'Login' : 'Register'
    
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
    
    return <form 
        onSubmit={handleSubmit} 
        className="form-container"
    >
        <h1>{name}</h1>
        <input 
            type="text" 
            className="form-input" 
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
        />
        <input 
            type="password" 
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
        />
        {loading && <LoadingIndicator/> }
        <button type="submit" className="form-button">
            {name}
        </button>
    </form>
}

export default Form