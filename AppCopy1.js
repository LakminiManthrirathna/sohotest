import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, FormButton, FormGroup, Card, Image, Icon} from "semantic-ui-react";
import Results from './components/Results'
import axios from 'axios';

function App() {

    const [name, setName] = useState('');
    const [userName, setUsername] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [repos, setRepos] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState('');

    //  useEffect(() => { fetch('https://api.github.com/users/example').then(res => res.json()).then(data => {setData(data);},[])});
    /*
        const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
            setName(name);
            setUsername(login);
            setFollowers(followers);
            setFollowing(following);
            setRepos(public_repos);
            setAvatar(avatar_url);
        };*/

    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }
    /*
        const handleSubmit = async () => {
            try {
                const u = await axios("https://api.github.com/search/users?q="+userInput);
                console.log("https://api.github.com/search/users?q="+userInput);
                setUsers(u);
                console.log('users after submitting:'+users)
            } catch (err) {
                console.log(err);
            }
        }*/

    const handleSubmit = () => {
        fetch(`https://api.github.com/search/users?q=${userInput}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                    console.log('errro is' + error)
                } else {
                    setUsers(data)
                    const p=users.items;
                    console.log(typeof p);
                    // console.log(p.toString());
                }
            });
    }

    return (
        <div>
            <div className="navbar">
                Git hub user search
            </div>
            <div className="search">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Form.Input palacholder='name' name="name" onChange={handleSearch}/>
                        <FormButton content="submit"/>
                    </FormGroup>
                </Form>
            </div>
            <Results users={users.items}/>
        </div>
    );
};

export default App;
