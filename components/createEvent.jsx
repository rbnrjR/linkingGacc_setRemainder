import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import request from 'superagent';
export default class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          path : "http://localhost:3000/createEvent?summary="+this.props.params.summary+"&location="+this.props.params.location
        }
        //this.handleClick=this.handleClick.bind(this);
    }

    // handleClick(){
    // 	request.get("http://localhost:8000/login").end((err,res)=>{
    // 		console.log(err);
    // 		//console.log(res);
    // 	})
    // }

    render() {
      console.log('paaaaaaaaaath : ',this.state.path);
        return (
            <div>
                <a href={this.state.path}><RaisedButton label="Create an Event" primary={true}/></a>
            </div>
        );
    }
}
