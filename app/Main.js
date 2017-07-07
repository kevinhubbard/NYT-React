var React = require('react');
var Search = require("./Components/Search.js");
var SavedArticles = require("./Components/SavedArticles.js");
var helpers = require('./utils/helpers.js')

var Main = React.createClass({
    getInitialState: function() {
        return {
            mainArticles: []
        }
    },
    showSavedArticles: function() {
        console.log("i ran")
        this.setState({
            mainArticles: []
        });
        helpers.getSavedArticles()
        .then(function(response) {
            // console.log('response: ' + response)
            for(var i=0; i < response.data.length; i++) {
                this.setState({
                    mainArticles: this.state.mainArticles.concat(response.data[i])
                });
            }
        }.bind(this));
    },
    //  On load display the articles
    componentDidMount: function() {
        console.log("COMPONENT MOUNTED -Main");
        this.showSavedArticles();
    },
  // Whenever our component updates, the code inside componentDidUpdate is run
    componentDidUpdate: function(prevState) {
        if (prevState.mainArticles !== this.state.mainArticles) {
            console.log("COMPONENT UPDATED");
         }
    },
    render: function() {
        return (
            <div>
                <div className="container-fluid header jumbotron">
                    <h1 id="title" className="text-center">New York Times web-scrapper</h1>
                    <p id="subtext" className="text-center">Search for articles that interest you!</p>
                </div>

                {/* Search Component*/}
                <div className="col-xs-8 col-xs-offset-2">
                    <Search showSavedArticles={this.showSavedArticles} />
                </div>

                {/* Saved Articles Component*/}
                <div className="col-xs-8 col-xs-offset-2">
                    <SavedArticles 
                        mainArticles={this.state.mainArticles}
                        showSavedArticles={this.showSavedArticles}
                    />
                </div>

            </div>
        );
    }
})

module.exports = Main;