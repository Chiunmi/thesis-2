import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/register', {
                username,
                password
            });

            if (response) {
                navigate('/'); 
            }
            
        } catch (err) {
            toast.error(err.response.data.error)
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
                <button type='submit'>Register</button>
            </form>
            <div>
                <Link to="/login">
                <button>Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Register