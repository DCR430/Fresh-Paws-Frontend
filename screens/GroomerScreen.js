/////////////////

import * as React from "react";
import {
  Text,
  View,
  requireNativeComponent,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as groomerActions from "../Redux/actions/groomers";

const actions = {
  ...groomerActions,
};


class GroomerScreen extends React.Component {

  componentDidMount() {
    this.props.actions.fetchGroomers();
  } 

  render() {
    const Groomer = this.props.groomers.data.map((groomer) => (
      <Marker
          coordinate={{
            latitude: groomer.latitude,
            longitude: groomer.longitude,
            
          }}
        >
          <Callout
          onPress={() =>
            this.props.navigation.navigate("ServicesScreen", {
              otherParam: groomer,
            })
          }>
            <Button
                title={groomer.name}
                // title={groomer.address}
            />
          </Callout>
        </Marker>
    ));
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 40.720200,
          longitude:-73.950050 ,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
       {Groomer}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});     

const mapStateToProps = (state) => {
  return {
    user: state.user,
    groomers: state.groomers,
  };
};

export default connect(mapStateToProps, mapDispatchToProps,
  )(GroomerScreen);