import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, FormButton, FormGroup} from "semantic-ui-react";
import Results from './components/Results'
import loadingImage from './images/preloader.gif'
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Header from './components/Header';

function App() {

    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await axios("https://api.github.com/search/users?q=" + userInput).catch((err) => {
                setError(err);
                console.log(err);
            }
        );
        if (response) {
            console.log('got responce, responce is');
            console.log(response.data);
            setUsers(response.data);
            setLoaded(true);
            console.log("loading status" + loaded);
        }
        setIsLoading(false);
    };

    return (
        <Router>
            <div className="container-fluid w-100">
                <div className="navbar row">
                    <p className="h1 mx-auto"> Git hub user search</p>
                </div>
                <div className="search row">
                    <Form onSubmit={handleSubmit} className="mx-auto my-5">
                        <FormGroup>
                            <Form.Input palacholder='name' name="name" onChange={handleSearch} className="col-8"/>
                            <FormButton content="submit" className="col-4"/>
                        </FormGroup>
                    </Form>
                </div>
                {isLoading === true ? (<img src={loadingImage}/>) : (<div></div>)}
                {loaded === true ? (<Results users={users} className="row"/>) : (<div></div>)}
            </div>
        </Router>
    );
}

;

export default App;
