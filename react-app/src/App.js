import React, { Component } from "react";
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
      selected_content_id: 2, // id 2번인 CSS가 디폴트값으로 설정
      subject: { title: "WEB", sub: "World Wid Web!" },
      welcome: {title: 'Welcome', desc: 'Hello, React!!!'}, // mode 가 welcome일 경우의 state 설정
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  render() {
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      // welcome 모드일때의 기본 노출
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }

      // 모든 조건이 아닐때도 ReadContent 로 보여지도록
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create') { // create mode 추가
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents

        /* 비효율적인 방법(push - 원본 배열을 바꿈)
        this.max_content_id = this.max_content_id + 1; // 1씩 증가
        this.state.contents.push({
          id : this.max_content_id,
          title: _title,
          desc: _desc
        });
        */

        /* 효율적인 방법 (concat - 원본 배열을 복사하여 새로운 배열을 만듬)
        var _contents = this.state.contents.concat(
          {
            id : this.max_content_id,
            title: _title,
            desc: _desc
          }
        )
        */

        // 더더 효율적인 방법 (Array.from)
        var newContents = Array.from(this.state.contents);
        newContents.push({
          id : this.max_content_id,
          title: _title,
          desc: _desc
        })
        this.setState({
          contents: newContents
        })
      }.bind(this)}></CreateContent>
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage = {function(){
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Subject>
        <TOC 
          onChangePage={function(id){
            setState = ({ 
              mode : 'read',
              selected_content_id: Number(id)
            })
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={(_mode) => {
          this.setState({
            mode : _mode
          })
        }}></Control>        
         {/* _article 변수 사용하여 모드에 따라 변경될 수 있도록 */}
        {_article}
      </div>
    );
  }
}

export default App;