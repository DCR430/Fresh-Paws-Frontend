// import React from 'react'
// import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
// import Firebase from '../config/firebase'

// class Signup extends React.Component {

//     handleSignUp = () => {
//         const { email, password } = this.state
//         Firebase.auth()
//             .createUserWithEmailAndPassword(email, password)
//             .then(() => this.props.navigation.navigate('Profile'))
//             .catch(error => console.log(error))
//     }


//     render() {
//         return (
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.inputBox}
//                     value={this.state.name}
//                     onChangeText={name => this.setState({ name })}
//                     placeholder='Full Name'
//                 />
//                 <TextInput
//                     style={styles.inputBox}
//                     value={this.state.email}
//                     onChangeText={email => this.setState({ email })}
//                     placeholder='Email'
//                     autoCapitalize='none'
//                 />
//                 <TextInput
//                     style={styles.inputBox}
//                     value={this.state.password}
//                     onChangeText={password => this.setState({ password })}
//                     placeholder='Password'
//                     secureTextEntry={true}
//                 />
//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.buttonText}>Signup</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     inputBox: {
//         width: '85%',
//         margin: 10,
//         padding: 15,
//         fontSize: 16,
//         borderColor: '#d3d3d3',
//         borderBottomWidth: 1,
//         textAlign: 'center'
//     },
//     button: {
//         marginTop: 30,
//         marginBottom: 20,
//         paddingVertical: 5,
//         alignItems: 'center',
//         backgroundColor: '#FFA611',
//         borderColor: '#FFA611',
//         borderWidth: 1,
//         borderRadius: 5,
//         width: 200
//     },
//     buttonText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#fff'
//     },
//     buttonSignup: {
//         fontSize: 12
//     }
// })

// export default Signup

///////////////////////////////////////////////////////////////////////

import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateName,
  signup
} from "../Redux/actions/user";
  import { Header } from 'react-native-elements';


class Signup extends React.Component {
  handleSignUp = () => {
    this.props.signup();
    this.props.navigation.navigate("TabNavigator");
  };

  render() {
    return (
      <>
      <Header
      placement="left"
      leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.navigate("Login") }}
      backgroundColor="#396bb5"
    />
      <View style={styles.container}>
          <Image
               style={ {
                 width: 250,
                 borderRadius: 10,
                 height: 180,
                 padding: 20,
                 marginLeft: 10,
                 marginRight: 15,
                 marginTop: 10,
                 marginBottom: 20}}
               source={{
                  uri: 'file:///Users/danielreyes/Downloads/IMG_70A476B62DF5-1.jpeg',
                  
               }}
             />
        <TextInput
          style={styles.inputBox}
          value={this.props.user.name}
          onChangeText={(name) => this.props.updateName(name)}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.inputBox}
          value={this.props.user.email}
          onChangeText={(email) => this.props.updateEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.props.user.password}
          onChangeText={(password) => this.props.updatePassword(password)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
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
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "white",
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, updateName, signup }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);