
//////////////////////////
import * as React from "react";
import { Text, View, Image, ScrollView, Button, Icon, StyleSheet } from "react-native";
import { Header, Card } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as groomerActions from "../Redux/actions/groomers";
import { material, webWeights } from "react-native-typography";
import LottieView from 'lottie-react-native';


const actions = {
  ...groomerActions,
};

class AppointmentsScreen extends React.Component {
  state = {
    appointmentsArray: [],
  };

  componentDidMount = () => {
    this.props.navigation.addListener("focus", this.fetchAppointments);
    this.props.actions.fetchGroomers();
  };

  fetchAppointments = () => {
    fetch("http://localhost:3000/appointments")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ appointmentsArray: json });
      });
  };

  render() {
    const Appointment = this.state.appointmentsArray.map((appointment) => {
      const groomer = this.props.groomers.data[appointment.groomer_id - 1];
      if (appointment.user_id == this.props.user.uid) {
        return (
          <Card style={styles.container} key={appointment.id}>
            <Text style={material.title3}>{groomer.name}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text>Date: {appointment.date}</Text>
            <Text>Time: {appointment.time}</Text>
            </View>
            <Button
              title=" Appointment Details"
              onPress={() =>
                this.props.navigation.navigate("AppointmentInfo", {
                  otherParam: appointment,
                  groomerParam: groomer,
                })
              }
            />
          </Card>
        );
      }
    });
    return (
      <View>
        {this.state.appointmentsArray.length == 0 ? (
           <Text style={webWeights.medium, {textAlign: "center"}}> </Text>
        ) : (
          <ScrollView>{Appointment}</ScrollView>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    groomers: state.groomers,
  };
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffa375",
      alignItems: "center",
      justifyContent: "center",
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsScreen);