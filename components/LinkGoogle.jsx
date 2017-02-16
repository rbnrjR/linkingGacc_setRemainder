import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import request from 'superagent';
export default class LinkGoogle extends Component {
    constructor(props) {
        super(props);
        //this.handleClick=this.handleClick.bind(this);
    }

    // handleClick(){
    // 	request.get("http://172.23.238.189:3000/createEvent").end((err,res)=>{
    // 		console.log(err);
    // 		//console.log(res);
    // 	})
    // }

    render() {
        return (
            <div>
                <a href="https://accounts.google.com/o/oauth2/auth?redirect_uri=http://localhost:3000/oauth2callback&response_type=code&client_id=616007233163-g0rk4o8g107upgrmcuji5a8jpnbkd228.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/calendar+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&approval_prompt=force&access_type=offline"><RaisedButton label="Link your Google Account" primary={true}/></a>
            </div>
        );
    }
}
