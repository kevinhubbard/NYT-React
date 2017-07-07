var React = require('react');
var Main = require('../Main');
var helpers = require('../utils/helpers.js')
var SavedArticles = require("./SavedArticles.js");

var Search = React.createClass({
    getInitialState: function() {
        return {
            currentArticles: []
        }
    },
    articleSearch: function(topic, startDate, endDate) {
        helpers.getArticles(topic, startDate, endDate)
        .then(function(result) {

            var nytArticles = result.data.response.docs;

            for (var i = 0; i < nytArticles.length; i++) {
                var newState = {
                    title: '',
                    date: '',
                    url: '',
                    key: ''
                };
                
                newState.title = nytArticles[i].headline.main;
                newState.date = nytArticles[i].pub_date;
                newState.url = nytArticles[i].web_url;
                newState.key = Date.now() + i;
                
                this.setState({
                    currentArticles: this.state.currentArticles.concat(newState)
                })                
            }
            this.renderResults();
        }.bind(this));
    },
    handleSubmit(event) {
        event.preventDefault();

        var a = this.refs.topic.value;
        var b = this.refs.startDate.value;
        var c = this.refs.endDate.value;
        
        this.articleSearch(a,b,c);
    },
    handleSave: function(article) {

        console.log("save hit: " + article.title);
        helpers.saveArticle({
            title: article.title, 
            date: article.date, 
            url: article.url
        }).then(function() {
            console.log("Posted to MongoDB");

        //update parent state
        this.props.showSavedArticles();

        }.bind(this));

    },
    renderResults: function() {
        return (
            <div>
                {this.state.currentArticles.map(function(article) {
                    return (
                        <div className="resultArticle" key={article.key} data-key={article.key}>
                            <h3>{article.title}</h3>
                            <button className="btn btn-primary float-right" data-article={article}
                            onClick={() => this.handleSave(article)} data-key={article.key}>Save</button>
                        </div>
                    );
                },this)}
            </div>
        );

    },
    render: function() {
        return (
            <div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        Search
                    </div>
                    <div className="panel-body">
                        <form className ="col-xs-12" onSubmit={this.handleSubmit}>
                            <div className="searchParams">
                                <label htmlFor="topic">Topic:  </label>
                                <br />
                                <input
                                type="text" 
                                placeholder="ex: SPORTS" 
                                name="topic" ref="topic"/>
                            </div>
                            <div className="searchParams">
                                <label htmlFor="startDate">Start Year:  </label>
                                <br />
                                <input 
                                type="text" 
                                placeholder="YYYYMMDD" 
                                name="startDate" ref="startDate"/>
                            </div>
                            <div className="searchParams">
                            <label htmlFor="endDate">End Year: </label>
                            <br />
                            <input 
                            type="text" 
                            placeholder="YYYYMMDD" 
                            name="endDate" ref="endDate"/>
                            </div>
                            <input type="submit" value="Search" id="searchBtn" onSubmit={this.handleSubmit}/>
                        </form>
                    </div>
                </div>
                
                {/* Results */}
                <div>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Results
                        </div>
                        <div className="panel-body" id="results">
                            {this.renderResults()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Search;