import * as React from "react";
import { Text, View, Image, ScrollView, Button, Icon } from "react-native";
import { Header, Card } from "react-native-elements";
import { webWeights } from "react-native-typography";




class AppointmentInfo extends React.Component {

	state={
		servicesArray :[],
		cartsArray: []
	}

	componentDidMount() {
		fetch(`http://localhost:3000/service_appointments/${this.props.route.params.otherParam.id}`)
			.then((response) => response.json())
			.then(serviceappointment=>this.fetchServices(serviceappointment.service_id))
	}
	
	fetchServices=(id)=> {
		fetch(`http://localhost:3000/services/${id}`)
		.then((response) => response.json())
		.then((json) => {
			this.setState({ 
				servicesArray: json
			});
		})
	}

 deleteAppointment = () => {
		fetch(`http://localhost:3000/appointments/${this.props.route.params.otherParam.id}`, { method: "DELETE" })
		.then(()=>this.props.navigation.popToTop())
  };

    render(){
        console.log(this.state.servicesArray)
			return(
				<View style={{ justifyContent: "center" }}>
				<Image
					 style={ {
						width: 400,
						height: 150,
					}}
					source={{
						uri: this.props.route.params.groomerParam.image,
					}}
					/>
				<ScrollView >
				<Card>
					<Text style={webWeights.bold}>{this.props.route.params.groomerParam.name}</Text>
					<Text>{this.props.route.params.groomerParam.address}</Text>
					<Text>{this.props.route.params.groomerParam.phone}</Text>
					<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
					<Text>
						Date: {this.props.route.params.otherParam.date}</Text>
						<Text>
						Time: {this.props.route.params.otherParam.time}</Text>
					</View>

					<Text style={webWeights.bold}>Appointment Summary:</Text>
				<Text style={webWeights.regular}>{this.state.servicesArray.name}  Total: ${this.state.servicesArray.price}.00 </Text>
					<Text></Text>
					</Card>
					<Button      
					title='Edit this Appointment'
                    onPress={()=> this.props.navigation.navigate("Edit",{
                        otherParam: this.props.route.params
                    })}
					/>
					<Button      
					title='Delete Appointment'
					color = 'red'
					onPress={this.deleteAppointment}
					/>
			
			</ScrollView>		
			</View>	
		)
	}
}

export default AppointmentInfo