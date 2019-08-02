import React, { Component } from 'react';
import fire from './fire';
import { render } from 'react-dom';
import brace from 'brace';
import {Link} from 'react-router-dom';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';
import firebase from 'firebase'

var database = fire.database();


class Editor extends Component {

  constructor(props){
    super(props);
    this.state={  
      code:""
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({isSignedIn: !!user})
      this.userId=user.uid
    });
    var {docid} = this.props.match.params;
    database.ref("/doc/"+docid).on("value", (snapshot)=>{
      let valJson = snapshot.val();
      // let val = valJson? Object.values(valJson) : [];
      this.setState({
        code: valJson.code
      })

    })
  }

  goBack(){
    window.location.href='/profile/'
  }

  handleChange(data){
    var {docid} = this.props.match.params;
    console.log(docid);
    console.log(data)
    database.ref("/doc/"+docid).set({
      userid: this.userId,
      docid: docid,
      code: data
    });
  }

  handleChangeGuest(codes){
    var {docid} = this.props.match.params;
    console.log(docid);
    console.log(codes)
    database.ref("/doc/"+docid).set({
      docid: docid,
      code: codes
    });
  }
  
  render(){
    return(
      <div>
        {this.state.isSignedIn?
          (
            <div>
              <h1>Document ID: </h1>
              <p>Shared with:</p>
              <div>Name of all the people according to their User ID</div>
              <AceEditor
                    mode="java"
                    theme="github"
                    value={this.state.code}
                    onChange={(data)=>{this.handleChange(data)}}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                  />
              <br/>
              <br/>
              <a className="waves-effect waves-light red btn" onClick={()=>{this.goBack();}}>SAVE & EXIT</a>
              <br/>
              <br/>
            </div>
          )
          :
          (
            <div>
            <h1>Editor</h1>
            <p>Please note that you are working in guest mode so your code might get change if you visit next. In order to save your code please make sure that you <Link to="/">login</Link> before coding.</p>
            <AceEditor
                  mode="java"
                  theme="github"
                  value={this.state.code}
                  onChange={(codes)=>{this.handleChangeGuest(codes)}}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{$blockScrolling: true}}
            />
            </div>
          )
        }
      </div>
      );
  }
}

export default Editor;