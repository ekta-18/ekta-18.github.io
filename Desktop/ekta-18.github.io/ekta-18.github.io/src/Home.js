import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import {BrowserRouter as BR, Route} from 'react-router-dom';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import img1 from './image/code1.jpg';
import img2 from './image/code2.jpg';
import Editor from './Editor';
import Data from './Data';
import {Link} from 'react-router-dom';
import * as M from 'materialize-css';


class Home extends Component {
	state={isSignedIn:false}

	authenticate() {
	    var provider = new firebase.auth.GoogleAuthProvider();
	    provider.addScope('profile');
	    provider.addScope('email');
	    fire.auth().signInWithPopup(provider).then(function(result) {
	     // This gives you a Google Access Token.
	     var token = result.credential.accessToken;
	     // The signed-in user info.
	     var user = result.user;
	    });
  	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged(user=>{
			this.setState({isSignedIn: !!user})
			this.userId=user.uid
			console.log("user", user)
		});
		document.addEventListener('DOMContentLoaded', function() {
    		var elems = document.querySelectorAll('.parallax');
    		var instances = M.Parallax.init(elems, {});
  		});
	}



  	render() {
    	return (
      		<BR>
        		<div>
          			{this.state.isSignedIn ?
          				(
          					<div>
          						<Data></Data>
          					</div>
          				)
          				:
          				(
				            <div>
          						<div className="parallax-container">
      								<div className="parallax">
      									<img src={img1} alt="Image cannot be displyed."/> 
      								</div>
    	  						</div>
    							<div className="section white">
	      							<div className="row container">
	        							<h2 className="header">Collab Editor</h2>
	        							<p className="grey-text text-darken-3 lighten-3">Collab Editor is an online code editor that lets people collaborate their codes in real-time. It works in your web browser so no installation is needed. All you need is just to login to save your work. To use it as a GUEST and give it a try please click <Link to="/editor/test">here</Link>. </p>
	        							<h2 className="header">Features</h2>
	        							<ol>
		        							<li>text editor</li>
		        							<li>chat (Under development)</li>
			     			   				<li>document history</li>
		        							<li>syntax highlighting for programming languages (Only JAVA supported for now)</li>
	        							</ol>
	        							<br/>
	        							<br/>
	        							<button className="waves-effect waves-light red btn" onClick={this.authenticate.bind(this)}>
	        								<i className="material-icons right">person</i>SIGN-IN WITH GOOGLE</button>
	      							</div>
    							</div>
    							<div className="parallax-container">
      								<div className="parallax">
      									<img src={img2} alt="Image cannot be displyed."/>
      								</div>
    							</div>
        					</div>
          				)
          			}
        		</div>
      		</BR>
      	);
  	}
}

export default Home;