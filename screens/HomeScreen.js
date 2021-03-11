import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ScrollView,Button } from "react-native";
import { SearchBar, Card } from "react-native-elements";
import { Rating, AirbnbRating } from 'react-native-elements';

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

//   fetchGroomers=()=>{
//     fetch(`https://api.yelp.com/v3/businesses/search?term=${this.state.search}&latitude=40.708497166&longitude=-73.951996192`,{
//         method: 'GET',
//         headers: {
//             "Authorization": "Bearer EybZ0JZJgIsstKKwcng2DzFtb7sNNvGjhd0TXVx3sP8_eyUaeWRBSZQpbI2_XwqNkTBzY3vnhwS_H0MF1nzGC1a42Bu40BozbPhk8mZeFKSm3anDg5NZFU6Tg_O3X3Yx"
//         },
//         // redirect: 'follow'
//     })
//     .then(response => response.json())
//     .then(result => this.setState({
//         groomerArray: result.businesses
       
//     }),
//     this.setState({
//         search: ""
//     })
// )
// }







  filteredGroomers = () => {
    return this.state.groomerArray.filter((groomer) =>
      (groomer.name.toLowerCase()|| groomer.zip).includes(typeof this.state.search == "number" ? this.state.search : this.state.search.toLowerCase())
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
            <Text style={styles.description}>{groomer.zip}</Text>
            <Rating style={styles.rating} imageSize={15} readonly startingValue={Math.random()* 6 } />
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

  },
  rating: {
    alignItems: "flex-start"
  }
})