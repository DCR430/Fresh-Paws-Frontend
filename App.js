// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Fresh Paws</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react'
// import Login from './screens/Login'
// import Signup from './screens/Signup'
import SwitchNavigator from './navigation/SwitchNavigator'

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./Redux/reducers";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer,middleware);

export default class App extends React.Component {
    render() {
      
      return (
        <>
        <Provider store={store}>
          <SwitchNavigator/>
        </Provider>
      </>
      )
      
      
       
      }
}
