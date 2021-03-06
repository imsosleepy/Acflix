import React from "react";
import DetailPresenter from "./DetailPresenter"
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component{
    constructor(props){
        super(props);
        const {location: {pathname}} = props;
        this.state = {
            result: null,
            external: null,
            loading: true,
            error: null,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
      const { 
          match: 
          {
              params: {id}
          }, 
          history: {push}
      } = this.props;
      const { isMovie } = this.state;
      const parseId = parseInt(id);
      if(isNaN(parseId)) {
        return push("/");
      }

      let result = null;
      let external = null;
      try{
        if(isMovie){
            ({data: result} = await moviesApi.movieDetail(parseId));
            ({data: external} = await moviesApi.getExternal(parseId));
        } else {
            ({data: result} = await tvApi.showDetail(parseId));
            ({data: external} = await tvApi.getExternal(parseId));
        }
      } catch {
        this.setState({error: "Can't find anything."});
      } finally {
        this.setState({loading:false, result, external});
      }
      
    }

    render() {
        const { result , external, error, loading } = this.state;
        return (<DetailPresenter 
        result={result}
        external= {external}
        error={error}
        loading={loading}
        />
        );
    }
}