import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const BASE_API_URL = "https://icanhazdadjoke.com";

export default class DadJoke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: null
    };
    this.loadJoke = this.loadJoke.bind(this);
  }

  componentDidMount() {
    this.loadJoke();
  }

  loadJoke() {
    let url = BASE_API_URL;

    if (this.props.jokeID) {
      url += `/j/${ this.props.jokeID }`;
    }
    axios.get(url, {
      headers: {
        "Accept": "application/json"
      }
    }).then((res) => {
      this.setState({ joke: { id: res.data.id, text: res.data.joke }});
    });
  }

  render() {
    const { className, img, refreshButton, refreshButtonClassName } = this.props;
    const { joke } = this.state;
    if (!joke) {
      <div className={ className } />;
    }
    return (
      img ?
      <img className={ className } src={ `${ BASE_API_URL }/j/${ joke.id }.png` } /> :
      <div className={ className }>
        { joke.text }
        {
          refreshButton &&
          <button className={ refreshButtonClassName } onClick={ this.loadJoke }>Refresh</button>
        }
      </div>
    );
  }
}

DadJoke.propTypes = {
  className: PropTypes.string,
  jokeID: PropTypes.string,
  img: PropTypes.bool,
  refreshButton: PropTypes.bool,
  refreshButtonClassName: PropTypes.string
};

DadJoke.defaultProps = {
  className: "dad-joke",
  jokeID: null,
  img: false,
  refreshButton: false,
  refreshButtonClassName: "dad-joke__refresh-button"
};
