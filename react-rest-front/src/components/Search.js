import React, { Component } from "react";
import "../css/App.css";

class Search extends Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="row navbar navbar-toggleable-md navbar-inverse bg-inverse">
          <span>
          </span>

            <form className="form-inline" onSubmit={this.props.submit_button}>
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="eg: City"
                onChange={this.props.handleTextChange}
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0 form-submit"
                type="submit"
              >
                Search
              </button>
            </form>
        </nav>
      </div>
    );
  }
}

export default Search;
