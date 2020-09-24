import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ScrollView } from "react-native";
import { SearchBar, Card } from "react-native-elements";


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      search: "",
      groomerArray: [],
      filteredArray: []
   };
    this.fetchGroomers();
  }

  updateSearch = (search) => {
    this.setState({
      search: search,
      filteredArray: this.filteredGroomers(),
    });
  };

  fetchGroomers() {
    fetch("http://localhost:3000/groomers")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ 
          groomerArray: json,
          filteredArray: json});
      })
  }

  filteredGroomers = () => {
    return this.state.groomerArray.filter((groomer) =>
      groomer.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };
  
  render() {
    const { search } = this.state;
    const Groomer = this.state.filteredArray.map((groomer) => (
      <View style={styles.card} key={groomer.id}>
        <TouchableOpacity activeOpacity={0.7}  onPress={() =>
            this.props.navigation.navigate("ServicesScreen", {
              otherParam: groomer
            })
          }>
          <View style={styles.container}>
            <View>
              <Image style={styles.image} source={{ uri: groomer.image }} />
            </View>
            <Text style={styles.title}>{groomer.name}</Text>
            <Text style={styles.description}>{groomer.address}</Text>
            <Text style={styles.description}></Text>

          </View>
        </TouchableOpacity>
      </View>
    ));
    return (
      <>
          <SearchBar
            platform="ios"
            placeholder="Find a Groomer"
            onChangeText={this.updateSearch}
            value={search}
            

          />
          <ScrollView>
            <View>
            {/* <MyCarousel /> */}
            {Groomer}
            </View>
          </ScrollView>
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: 360,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    shadowColor: '#396bb5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10,
    shadowRadius: 5,
    borderRadius:25
    
  },
  image: {
    height: 150
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 25,
    marginTop: 10
  },
  description: {
    color: '#396bb5',
    marginTop: 5,
    fontSize: 17
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 15
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffa375',

  }
})