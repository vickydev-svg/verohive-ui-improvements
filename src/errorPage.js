import React from "react";
import { Component } from "react";


class ErroPage extends Component{

  componentDidMount=()=>{
    window.onload=()=>{
      window.setTimeout(()=> { 
        this.props.history.push("/error");
      }, 3); 
      window.onbeforeunload = null;
    }

    window.addEventListener("popstate", () => {
		  window.history.go(1);
		});
    window.onbeforeunload = ()=> {
    window.setTimeout(()=> { 
      this.props.history.push("/error");
    }, 3); 
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
}
  }
  render(){
    return(
      <div>
      <h1>
        You Are Disconnected From Your Meeting Room Due to The Page Being Refreshed/Reloaded the page
      </h1>
      <h3>
      Please Close This Window and Use The Link That You are Provided In Your Email To rejoin Your Meeting
      </h3>
     
    </div>
    )
  }
}

export default ErroPage;
