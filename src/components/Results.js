import React from "react";
import '../App.css';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom';

const Results = (props) => {
    const {users} = props;
    console.log("users from results:" + users.items);
    //console.log("user1"+users[0].login);
    const listUsers = users.items;
    //  console.log(users.items[0].login);

    // console.log(listUsers.find(u => u.login === 'mia'));

    // const listUsers = users.length !== 0 ? (users.data.map((item) => <li key={item.id}>{item.name}</li> )): (<li>no users found</li>);
    //   return(<ul>{listUsers}</ul>);
    const User = ({userid}) => {
        const selectedUser = listUsers.find(u => u.id == userid);
       // console.log('selectedUser'+selectedUser.id);
        return (<div>cool</div>);
    };

    return (
        <>
            <ol className="mx-auto w-50 removeBullets">
                {listUsers.map(user =>
                    <li className="border-1 bg-light mb-4" key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            <div className="w-100 d-flex justify-content-between"><img src={user.avatar_url}
                                                                                       className="col-2 p-3 mr-0"/>
                                <div className="col-10 h5 pl-0 my-auto">{user.login}</div>
                            </div>
                        </Link>
                    </li>)}
            </ol>
            <div className="w-100 d-flex justify-content-center">
                <p className="ml-5">i'm in</p>

                <Route path="/users/:user" render={({match}) => (<User userid={match.params.user}/>)}/>
            </div>
        </>);
};

export default Results;
