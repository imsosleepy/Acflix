
import React from 'react';
import { moviesApi, tvApi } from '../../api';
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm:"",
        loading: false,
        error: null
    };

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByterm();
        }
    }

    searchByterm = async() => { 
        const { searchTerm } = this.state;
        this.setState({loading: true});
        try {
            const {data: {results: movieResults }} = await moviesApi.search(searchTerm);
            const {data: {results: tvResults }} = await tvApi.search(searchTerm);
            this.setState({movieResults, tvResults});
            
        } catch {
            this.setState({error: "Cant'find results"});
        } finally {
            this.setState({loading: false});
        }
    }

    render(){
        const { movieResults, tvResults, serachTerm, loading, error } = this.state;
        return ( 
            <SearchPresenter 
                movieResults= {movieResults}
                tvResults= {tvResults}
                serachTerm= {serachTerm}
                loading= {loading}
                error= {error}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}