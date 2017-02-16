import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ajax from 'superagent';
import request from 'superagent';
import {Link} from 'react-router';


export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
                value:'',
                path:'',
                summary: '',
                location: ''
              }
    this.handleChange=this.handleChange.bind(this);
    this.ajaxCall=this.ajaxCall.bind(this);
  }


  handleChange(e){
    this.setState({
      value:e.target.value
    })
  }

  ajaxCall(){
    console.log(this.state.value);
    let url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/976f7fd6-6a76-46c0-9857-6fcc99a99d8b?subscription-key=efd01e4bf7dc443180fcf9145ec03a0b"+"&q="+this.state.value+"&verbose=true";
    ajax.get(url).end((error,response)=>{
      if(response){

        console.log(response.body);
        console.log("Summary",response.body.entities[0].entity,response.body.entities[0].type);
        this.setState({summary : response.body.entities[0].entity, location: response.body.entities[1].entity});
        //console.log("Entities location",response.body.entities[1].entity,response.body.entities[1].type);
        //console.log("Entities date and time",response.body.entities[2].entity,response.body.entities[2].type);
        console.log('status : ',response.body.dialog.status);
        if(response.body.dialog.status.toUpperCase()==="FINISHED"){
          console.log("Before calling");
          // request.get("http://localhost:3000/middlepath").end((err,res)=>{
          //    console.log("errrrrrrr : ",err);
          //    console.log("resssssss : ",res);
          // })
          let pathed = "/dash/"+this.state.summary+'/'+this.state.location;
          this.setState({path:pathed});
        }
      }
      else {
        console.log("There was an error fetching from API");
      }
    });
  }

  render() {
    return (<div>
              <TextField hintText="Enter the word" value={this.state.value} onChange={this.handleChange}/>
              <Link to={this.state.path}><RaisedButton label="search" primary={true} onClick={this.ajaxCall}/></Link>
            </div>);
  }
}
