import React from "react";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Home from "../Routes/Home"
import TV from "../Routes/TV"
import Search from "../Routes/Search"
import Detail from "../Routes/Detail"
import Header from "./Header";


export default() => (
    <Router>
        <Header />
        <Switch> {/* 한번에 하나의 Route만 호출한다. */}
            <Route path ="/" exact component = {Home} />
            <Route path ="/tv" exact component = {TV} />
            <Route path ="/tv/popular" render = {() => <h1>Popular</h1>} />
            <Route path ="/search" component = {Search} />
            <Route path ="/movie/:id" component = {Detail} />
            <Route path ="/show/:id" component = {Detail} />
            <Redirect from="*" to= "/"/>  {/* 위쪽에 매치되는 Route가 없으면 이걸 호출 */}
        </Switch>
    </Router>
)