import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Editor from './Editor';
import {BrowserRouter as BR, Route} from 'react-router-dom';
import fire from './fire';
import {Link} from 'react-router-dom';
import firebase from 'firebase'

var database = fire.database();

class Data extends Component {

	logout(){
		firebase.auth().signOut().then(function() {
        	// Sign-out successful.
      	}).catch(function(error) {
        	// An error happened.
      	});
	}

	constructor(props){
		super(props);
		this.state={
			doc:[],
			docid:"",
			accessid:""
		};	
	}

	sendId(){
    	database.ref("/doc/"+this.state.docid).set({
    		docid: this.state.docid,
      		userid: this.userId,
    	});
    	this.setState({
      		docid:""
    	});
    	window.location.href='/profile/'+this.userId+'/editor/'+this.state.docid
  	}

  	sendUid(){
  		this.state.doc.map((docs, i)=>{
  			let ai = 'docid';
  			let key = "accessid";
  			console.log(this.state.accessid);
            database.ref('/doc').orderByChild(ai).equalTo(this.state.accessid)
            .on('value', snapshot=>{
            	let idJson = snapshot.val();
            	console.log(idJson);
            	if (idJson){
            		console.log(this.state.accessid);
            		database.ref("/doc/"+this.state.accessid).child("accessid").set(this.userId);
		            this.setState({
				      	accessid:""
				    });
            	}
            	else{
            		console.log("Getting nothing");
            	}
            	// let id = idJson? console.log(accessid):console.log("Getting Nothing");
            });
        })
    	window.location.href='/profile/'+this.userId+'/editor/'+this.state.accessid
  	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged(user=>{
			this.setState({isSignedIn: !!user})
			this.userId=user.uid
			// console.log("user", user)
			let ui = 'userid';
    		database.ref('/doc').orderByChild(ui).equalTo(this.userId)
			.on('value', snapshot=>{
				let docsJson = snapshot.val();
				let doc = docsJson? Object.values(docsJson): [];
				// let groups = Object.values(groupJson).map((k)=>{
				// 	return groupJson[k];
				// });
				this.setState({
					doc: doc
				})
			});
		});
  	}

	render() {
		return(
			<div>
				{this.state.isSignedIn ?
					(
						<div>
							<div className="navbar-fixed">
								<nav>
	    							<div className="nav-wrapper green darken-1">
	      								<a href="#" className="brand-logo center">Collaborative Code Editor</a>
	    							</div>
	  							</nav>
							</div>
							<br/>
							<div className="row">
								<div className="col s1"></div>
								<div className="col s6">
									<h3>Welcome {firebase.auth().currentUser.displayName}</h3>
									<h5>Your saved documents are:</h5>
									<div>
          								<div>
          									{
            									this.state.doc.map((docs, i)=>{
              										return(
                										<div key={i}><Link to={'/profile/'+this.userId+'/editor/'+docs.docid}>{docs.docid}</Link></div>
              										);
            									})
          									}
        								</div>
        							</div>
        							<br/>
        							<br/>
        							<br/>
        							<br/>
									<input placeholder="Enter an ID for new document." value={this.state.docid} 
	          							onChange={(e)=>{
	            							this.setState({
	              								docid: e.target.value
	            							})
	          							}}>
	          						</input>
	          						<p>Note: Use anything other than the name 'test'</p>
	          						&nbsp;&nbsp;
	        						<a className="waves-effect waves-light blue lighten-1 btn" onClick={()=>{this.sendId();}}>CREATE NEW DOCUMENT</a>
	        						<br/>
	        						<br/>
	        						<br/>
	        						<br/>
	        						<br/>
	        						<input placeholder="Enter the document ID" value={this.state.accessid} 
	          							onChange={(e)=>{
	            							this.setState({
	              								accessid: e.target.value
	            							})
	          							}}>
	          						</input>
	        						<a className="waves-effect waves-light blue lighten-1 btn" onClick={()=>{this.sendUid();}}>ACCESS DOCUMENT</a>
								</div>
								<div className="col s3">
									<img alt="profile picture" src={firebase.auth().currentUser.photoURL} className="circle"/>
								</div>
								<div className="col s2"></div>
							</div>
							<br/>
							<br/>
							<br/>
							<br/>
							<div className="container">
								<button className="waves-effect waves-light red btn" onClick={this.logout.bind(this)}>SIGNOUT</button>
							</div>
							<br/>
							<br/>
						</div>
					) 
					: 
					(
						<div>
						You must login first to see your profile.
						<br/>
						<br/>
						<br/>
						Go to <Link to={'/'}>HOME</Link> page to login.
						</div>
					)
				}
			</div>
		);
	}
}

export default Data;
