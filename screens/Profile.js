// import React, { Component } from 'react'

// export default class Profile extends Component {
//     render() {
//         return (
//             <div>
//                 Profile
                
//             </div>
//         )
//     }
// }

////////////////////////////////

import React from "react";
import { View, Text, StyleSheet, Button, DevSettings } from "react-native";
import { Header } from 'react-native-elements';

import { connect } from "react-redux";
import Firebase from "../config/firebase";


class Profile extends React.Component {
  handleSignout = () => {
    Firebase.auth().signOut();
    // this.props.navigation.navigate("Login")
  };


  render() {
    
    
    return (
      <>
      <Header
      backgroundColor="#396bb5"
      centerComponent={{ text: 'Log Out', style: { color: '#fff', fontWeight: 'bold' } }}
    />
      <View style={styles.container}>
        <Text style={{fontSize:30,
            color:"#396bb5"}}>Thanks for using Fresh Paws🐾</Text>
        <Text>{this.props.user.email}</Text>
        <Button title="Logout" onPress={this.handleSignout} />
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa375",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#396bb5",
    borderColor: "#396bb5",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});


const mapStateToProps = (state) => {
  return {
    user: state.user,
    groomers: state.groomers,
  };
};

export default connect(mapStateToProps,
  )(Profile);
