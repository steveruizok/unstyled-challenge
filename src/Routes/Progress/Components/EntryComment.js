import React from "react";
import styled, { css } from "react-emotion";

export default class Component extends React.Component {
  textContent = React.createRef();
  maxHeight;

  state = {
    overflowing: false,
    open: false,
    initial: true
  };

  static defaultProps = {};

  componentWillMount() {}

  componentDidMount() {
    this.maxHeight = this.textContent.current.offsetHeight;
    this.setState(
      {
        initial: false
      },
      this.setOverflowing
    );
  }

  componentDidUpdate() {}

  setOverflowing = () => {
    this.setState({
      overflowing: this.textContent.current.scrollHeight > this.maxHeight
    });
  };

  handleSeeMoreOrLessClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { children } = this.props;
    const { overflowing, open, initial } = this.state;
    return (
      <div
        ref={this.textContent}
        className={css`
          grid-column: 2;
        `}
      >
        <div
          className={css`
            max-height: ${open ? "auto" : "1.2em"};
            overflow: hidden;
          `}
        >
          {overflowing &&
            !open && (
              <SeeMoreContainer
                alt="See more"
                onClick={this.handleSeeMoreOrLessClick}
              >
                <a href="seemore" onClick={preventDefault}>
                  See More
                </a>
              </SeeMoreContainer>
            )}
          {initial ? "." : children}
          {overflowing &&
            open && (
              <SeeLessContainer
                alt="See less"
                onClick={this.handleSeeMoreOrLessClick}
              >
                <br />
                <a href="seeless" onClick={preventDefault}>
                  See Less
                </a>
              </SeeLessContainer>
            )}
        </div>
      </div>
    );
  }
}

const SeeMoreContainer = styled("div")`
  display: inline-block;
  float: right;
`;

const SeeLessContainer = styled("div")`
  display: inline-block;
  float: right;
`;

const preventDefault = ev => {
  ev.preventDefault();
};
