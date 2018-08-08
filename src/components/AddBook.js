import React , {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';



class AddBook extends Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    onChangeBookName = (e) => {
        this.setState({name: e.target.value}); 
    };

    onChangeGenre = (e) => {
        this.setState({genre: e.target.value});
    };

    onChangeAuthorId = (e) => {
        this.setState({authorId: e.target.value});
    };

    onSubmit(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name : this.state.name,
                genre : this.state.genre,
                authorId : this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return (<option disabled>Loading Authors...</option>)
        } else{
            return data.authors.map(author => {
                return(
                    <option key = {author.id} value = {author.id}> {author.name} </option>
                );
            })
        }
    }

    render(){
        return(
            <form id = 'add-book' onSubmit ={ this.onSubmit }> 
                <div className="field">
                    <label>Book Name </label>
                    <input type = 'text' onChange = {this.onChangeBookName}/>
                </div>
                <div className="field">
                    <label> Genre: </label>
                    <input type = 'text'  onChange = {this.onChangeGenre}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <input type = 'text' />
                    <select  onChange = {this.onChangeAuthorId}>
                        <option> Select Author </option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }

}



export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation,{name: "addBookMutation"})
)(AddBook);