import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
    import { toast } from 'react-hot-toast';

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            //sends request to backend
            const response = await axios.post('/login', {
                username,
                password
            });

            if (response) {
                navigate('/'); 
            }
            
        }catch(err){
            toast.error(err.response.data.error)
        }
    }

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };


    return (
    <>
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with google</button>
        </div>

        <div>
            <h1>Login manual</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text"
                        value={username} 
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <div>
                <Link to="/register">
                <button>Register</button>
                </Link>
            </div>
        </div>
    </>
    )
}

export default Login