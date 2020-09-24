import * as React from "react";
import { Text, View, Image, Button } from "react-native";
import { Header } from "react-native-elements";
import LottieView from 'lottie-react-native';
import { material, webWeights } from "react-native-typography";


class ConfirmationScreen extends React.Component {
  render() {
    console.log(this.props)
    return (
      <View style={{backgroundColor:"#ffa475", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={webWeights.bold} >Your Appointment is Confirmed</Text>
          <LottieView source={require('../animation.json')} style={{height: 150, width: 150}} autoPlay loop={false} />
        <Button title="Go Back to Home" onPress={()=>this.props.navigation.popToTop()} />
      </View>
    );
  }
}

export default ConfirmationScreen;