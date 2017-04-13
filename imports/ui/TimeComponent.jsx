import React, { Component } from 'react';

class TimedComponentClass extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      timeNow: Date.now()
    };
    console.log(this.props)
  }

  componentDidMount() {
    this._mounted = true;
    console.log(this.props)

    this.interval = setInterval(
      () => {
        if (this._mounted) {
          this.setState({ timeNow: Date.now() });
        }
      },
      this.props.interval || 3000
    );
  }

  componentWillUnmount() {
    this._mounted = false;
    window.clearInterval(this.interval);
  }

  render() {
    console.log(this.props)
    return (
      <this.props.component
        timeNow={this.state.timeNow}
        {...this.props.props}
      />
    );
  }
}

export default (component, interval) =>
  (props) => (
    <TimedComponentClass
      component={component}
      interval={interval}
      props={props}
    />
  );
