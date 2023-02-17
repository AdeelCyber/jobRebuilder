<<<<<<< HEAD
import React, { Component } from "react";
import { Modal, ActivityIndicator, View, Text, StyleSheet } from "react-native";
=======
import React, { Component } from 'react'
import { Modal, ActivityIndicator, View, Text, StyleSheet } from 'react-native'
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: "center",
=======
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0
    padding: 20,
  },
  indicator: {
    marginBottom: 15,
  },
  message: {
<<<<<<< HEAD
    color: "#fff",
    fontSize: 24,
    fontWeight: "400",
  },
});

const SIZES = ["small", "normal", "large"];

export default class Loader extends Component {
  constructor(props) {
    super(props);
=======
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
  },
})

const SIZES = ['small', 'normal', 'large']

export default class Loader extends Component {
  constructor(props) {
    super(props)
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0
  }

  static defaultProps = {
    visible: false,
<<<<<<< HEAD
    color: "white",
    indicatorSize: "large",
    messageFontSize: 24,
    message: "",
  };
=======
    color: 'white',
    indicatorSize: 'large',
    messageFontSize: 24,
    message: '',
  }
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0

  render() {
    const messageStyle = {
      color: this.props.color,
      fontSize: this.props.messageFontSize,
<<<<<<< HEAD
    };
    if (typeof this.props.children !== "undefined") {
      return (
        <Modal
          onRequestClose={() => {}}
          animationType={"fade"}
          transparent={true}
          visible={this.props.visible}
          supportedOrientations={["portrait", "landscape"]}
=======
    }
    if (typeof this.props.children !== 'undefined') {
      return (
        <Modal
          onRequestClose={() => {}}
          animationType={'fade'}
          transparent={true}
          visible={this.props.visible}
          supportedOrientations={['portrait', 'landscape']}
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0
          onOrientationChange={(evt) =>
            this.setState({ currentOrientation: evt.nativeEvent.orientation })
          }
        >
          <View style={[styles.container]}>
            <View style={[styles.innerContainer]}>{this.props.children}</View>
          </View>
        </Modal>
<<<<<<< HEAD
      );
=======
      )
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0
    } else {
      return (
        <Modal
          onRequestClose={() => {}}
<<<<<<< HEAD
          animationType={"fade"}
          transparent={true}
          visible={this.props.visible}
          supportedOrientations={["portrait", "landscape"]}
=======
          animationType={'fade'}
          transparent={true}
          visible={this.props.visible}
          supportedOrientations={['portrait', 'landscape']}
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0
          onOrientationChange={(evt) =>
            this.setState({ currentOrientation: evt.nativeEvent.orientation })
          }
        >
          <View style={[styles.container]}>
            <View style={[styles.innerContainer]}>
              <ActivityIndicator
                style={[styles.indicator]}
                size={this.props.indicatorSize}
                color={this.props.color}
              />
              <Text style={[styles.message, messageStyle]}>
                {this.props.message}
              </Text>
            </View>
          </View>
        </Modal>
<<<<<<< HEAD
      );
=======
      )
>>>>>>> 785da23c7481f2bb36a828e27942ed426d3919f0
    }
  }
}
