import * as React from 'react';
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity
} from 'react-native'
import { connect } from "react-redux";


class ServicesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0)
    this.state = { 
      servicesArray: [],
   };
    this.fetchServices();
  }

  fetchServices() {
    fetch("http://localhost:3000/services")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ 
          servicesArray: json
        });
      })
  }
  pressHandler=(service)=>{
    this.props.navigation.navigate("GroomerCard",
      {otherParam: this.props.route.params.otherParam,
      servicesParam: service});
  };
  

  render() {
    const Service = this.state.servicesArray.map((service) => {
      if(service.groomer_id == this.props.route.params.otherParam.id)
     { return(
      <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>this.pressHandler(service)}>
        <View style={styles.cardcontainer}>
          <Text style={styles.cardtitle}>{service.name}</Text>
          <Text style={styles.carddescription}>{service.description}</Text>
          <View style={styles.cardtagContainer}>
          <Text>Price: ${service.price}.00</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
     )}})
     
    const headerContainerWidth = this.scrollY.interpolate({
      inputRange: [0, 125],
      outputRange: ['90%', '100%'],
      extrapolate: 'clamp'
    })

    const imageContainerHeight = this.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: [450, 250],
      extrapolate: 'extend'
    })

    return (
      <>
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, { height: imageContainerHeight }]}>
          <Image style={styles.image} source={{ uri: this.props.route.params.otherParam.image }} />
        </Animated.View>
        <ScrollView onScroll={Animated.event([{ useNativeDriver: true, nativeEvent: { contentOffset: { y: this.scrollY } } }])}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          style={styles.scrollViewContainer}
        >
          <View style={styles.contentContainer}>
  
          {Service}
       
      </View>
          <View style={styles.stickyHeaderContainer}>
            <Animated.View style={[styles.headerContainer, { width: headerContainerWidth }]}>
            <View style={styles.cardheadercontainer}>
            <Text style={styles.cardtitle} >{this.props.route.params.otherParam.name}</Text>
            <Text style={styles.carddescription}>{this.props.route.params.otherParam.address}</Text>
            <Text style={styles.carddescription}>{this.props.route.params.otherParam.phone}</Text>
            </View>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa375'
  },
  scrollViewContainer: {
    flex: 1
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    backgroundColor: '#fff'
  },
  stickyHeaderContainer: {
    position: 'absolute',
    top: 125,
    left: 0,
    right: 0,
    
  },
  headerContainer: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
  
  },
  contentContainer: {
    marginTop: 290,
    backgroundColor: '#ffa375'
  },
  image: {
    flex: 1
  },
  item: {
    alignItems: "center",
    justifyContent: "center"
  },
  
  cardcontainer: {
    width: 380,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    shadowColor: '#396bb5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius:25
   
    
  },
  cardimage: {
    height: 150
  },
  cardtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardtitle: {
    fontSize: 20,
    marginTop: 10
  },
  carddescription: {
    color: '#396bb5',
    marginTop: 5,
    fontSize:15
  },
  card: {
    alignItems: "center",
    justifyContent: "center"
  },
  headertitle: {
    alignItems: "center",
    fontSize: 20,
    marginTop: 10
  },
  cardheadercontainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 25
  }

})
  
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ServicesScreen);