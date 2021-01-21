import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, FormButton, FormGroup, Card, Image, Icon} from "semantic-ui-react";

function App() {

    const [name, setName] = useState('');
    const [userName, setUsername] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');
    const [repos, setRepos] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');

    //  useEffect(() => { fetch('https://api.github.com/users/example').then(res => res.json()).then(data => {setData(data);},[])});

    const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
        setName(name);
        setUsername(login);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
    };

    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = () => {
        fetch('http://api.github.com/users/' + userInput)
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                    console.log('errro is'+error)
                } else {
                    setData(data)
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
            {error ? (<div>{error}</div>) : (<div className="">
                <Card>
                    <Image src={avatar} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>
                            <span>{userName}</span>
                            <span>{repos}</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <a>followers
                            <Icon name='user'/>
                            {followers}
                        </a>
                        <a>following
                            <Icon name='user'/>
                            {following}
                        </a>
                    </Card.Content>
                </Card>
            </div>)}
        </div>
    );
}

export default App;
