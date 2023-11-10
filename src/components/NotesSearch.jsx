import React from 'react'

class NotesSearch extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            search: ''
        }

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(event){
        this.setState({
            search: event.target.value
        })
        this.props.onSearch(event.target.value);
    }

    render(){
        return(
            <div className='note-search'>
                <input type='text' placeholder='Search Notes Here...' value={this.state.search} onChange={this.onSearchChange}/>
            </div>
        );
    }
}

export default NotesSearch;