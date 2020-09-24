// import React from 'react'
// import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'

// class Login extends React.Component {
//     state = {
//         email: '',
//         password: ''
//     }

    

//     render() {
//         console.log(this.props.navigation)
//         return (
            
//             <View style={styles.container}>
//                 <Text>
//                     Fresh Paws
//                 </Text>
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
//                     <Text style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>
//                 <Button title="Don't have an account yet? Sign up" onPress={() => this.props.navigation.navigate('Signup')}/>
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
//         backgroundColor: '#F6820D',
//         borderColor: '#F6820D',
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

// export default Login


//////////////////////////////////////////////

import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Image
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login, getUser } from '../Redux/actions/user'
import Firebase from '../config/firebase'


class Login extends React.Component {
  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.props.getUser(user.uid)
            if (this.props.user != null) {
                this.props.navigation.navigate('TabNavigator')
            }
        }
    })
  }

  render() {
    return (
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
        <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button
          title="Sign up for Fresh Paws 🐾"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa374",
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
    fontSize: 15,
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);