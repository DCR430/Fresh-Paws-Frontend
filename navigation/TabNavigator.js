import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreenNavigator from "./HomeScreenNavigator";
// import GroomerScreen from "../screens/GroomerScreen";
import AppointmentScreenNavigator from "./AppointmetScreenNavigator";
// import LoginNavigator from "./LoginNavigator";
import GroomerNavigator from "./GroomerNavigator";
import Profile from '../screens/Profile'
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

export default class TabNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "ios-home";
              } else if (route.name === "Map") {
                iconName = "ios-pin";
              } else if (route.name === "Appointments") {
                iconName = "ios-book";
              } else if (route.name === "Log Out") {
                iconName = "ios-log-out";
              } else if (route.name === "Settings") {
                iconName = "ios-settings";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: "#396bb5",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeScreenNavigator} />
          <Tab.Screen name="Appointments" component={AppointmentScreenNavigator} />
          <Tab.Screen name="Map" component={GroomerNavigator} />
          <Tab.Screen name="Log Out" component={Profile} />
          <Tab.Screen name="Settings" component={Login} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}