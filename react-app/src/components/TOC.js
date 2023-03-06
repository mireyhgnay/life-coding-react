import React, { Component } from 'react';

class TOC extends Component {	
	// React 내장함수
	shouldComponentUpdate(newProps, newState){
		console.log('===> TOC render shouldComponentUpdate',
			newProps.data,
			this.props.data,
		);
		if(this.props.data === newProps.data){ // 이전 데이터와 새로운 변경된 데이터가 같다면 render() 하지마라!
			return false;
		}
		return true;
	}
	render(){
		console.log('TOC render');
		var lists = [];
		var data = this.props.data;
		var i = 0;
		while(i < data.length){
			lists.push(
				<li key = {data[i].id}>
					<a 
						href={"/content/" + data[i].id} 
						data-id = {data[i].id}
						onClick={function(e){
							e.preventDefault();
							this.props.onChangePage(e.target.dataset.id); // 함수 호출
					}}>{data[i].title}</a> 
				</li>
			);
			i = i + 1;
		}
		return (
			<nav>
				<ul>
					{lists}
				</ul>
			</nav>
		);
	}
}

export default TOC;