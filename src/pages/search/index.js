import React from 'react';
class Search extends React.Component {
	
	constructor(props) {
		super();
		this.state = {
			searchs: {
				data: null, loading: true
			},
			search: ""
		};
    }

	render(){
		return (
			<div>

				<h1 style={{color: "#51bb57"}}>
					Search engine
				</h1>

				<input type="text" className="Search-input"
				 placeholder="put a github:" size="100"
				 onChange={this.props.methods.searchChangeHandle}
				 onKeyPress={this.props.methods.keyPressed}/>

				<button className="Big-button"
				 onClick={this.props.methods.searchHandler}>
					Search
				</button>

			</div>
		);
	}
}

export default Search;