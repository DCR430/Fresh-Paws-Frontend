import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Text,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Animated,
    TouchableOpacity
  } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import { ListItem, Avatar } from 'react-native-elements'
import moment from 'moment';
import { Rating, AirbnbRating } from 'react-native-elements';


export class ReviewScreen extends Component {

    state={
        reviewsArray: [],
        review: "",
        rating: null
    }

    componentDidMount(){
        this.fetchReviews()
    }

    fetchReviews() {
        fetch("http://localhost:3000/reviews")
          .then((response) => response.json())
          .then((json) => {
            this.setState({ 
              reviewsArray: json
            });
          })
      }

      postReviews = () => {
          const time = Date.now()
        fetch("http://localhost:3000/reviews", {
          method: "POST",
          headers: {
            accepts: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            time: time,
            groomer_id: this.props.route.params.otherParam.id,
            user_id: this.props.user.uid,
            text: this.state.review,
            rating:this.state.rating
          }),
        }).then(resp => resp.json())
        this.fetchReviews()
      };
    
    render() {
        const review = this.state.reviewsArray.map((review) => {
        if (review.groomer_id === this.props.route.params.otherParam.id) {
            return(
            <ListItem>
        <ListItem.Content>
        <ListItem.Title>{review.text}</ListItem.Title>
        <Rating imageSize={20} readonly startingValue={review.rating} />
        <ListItem.Subtitle>  reviewed {moment(review.time).fromNow()}</ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
            )
        }
    })
  
        return (
            <View>
            <ScrollView>
            {review}
            </ScrollView>
            <TextInput
                label="Review"
                value={this.state.review}
                onChangeText={text => this.setState({
                    review: text
                })}
            />
            <Button  mode="contained" color="#ffa375" onPress={() => this.postReviews()}>
            Add a Review🐾
            </Button>
            <AirbnbRating
                count={5}
                reviews={["Terrible", "Meh", "OK", "Great!", "😻So Fresh, So Clean🐶"]}
                defaultRating={0}
                size={20}
                onFinishRating={rate => this.setState({
                    rating: rate
                })}
            />
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return {
      user: state.user
    };
  };



export default connect(mapStateToProps)(ReviewScreen)
