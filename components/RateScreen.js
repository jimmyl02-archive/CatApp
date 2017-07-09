import React from 'react';
import { StyleSheet, Image, ActivityIndicator, View, AppRegistry, ScrollView , AsyncStorage , Alert} from 'react-native';
import { Button, Header, Card, Text, Rating, List, ListItem } from 'react-native-elements';

class RateScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { rating: '0', };
  }  

  static navigationOptions = {
    title: 'Rate this cat',
  };

  ratingCompleted = (rating) => {
    this.setState({rating: rating});
  };

  toJSON(map){
    return JSON.stringify([...map]);
  }

  fromJSON(JSONstr){
    return new Map(JSON.parse(JSONstr));
  }

  handlePress = (url, rating) => {
    //console.log(rating)
    AsyncStorage.getItem("map").then((map) => {
      if(map != null){
        //map exists
        let newMap = this.fromJSON(map);
        newMap.set(url, rating);
        //console.log(newMap);
        console.log(newMap);
        AsyncStorage.setItem("map", this.toJSON(newMap));
      }else{
        //map doesn't exist
        let map = new Map();
        map.set(url, rating);
        //console.log(map);
        AsyncStorage.setItem("map", this.toJSON(map));
      }
      })
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image style={{ width: 200, height: 200 }} source={{uri: params.url}} />
        <Text>Rate this image:</Text>
        <Rating
        showRating
        onFinishRating={this.ratingCompleted}
        style={{ paddingVertical: 10 }}
        startingValue={0}
        type="star"
        />
        <Button raised title='Submit your rating' onPress={() => 
          this.handlePress(params.url, this.state.rating)
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 15
  },
  lineSet: {
    flex: 1,
    flexDirection: 'row'
  },
});

export default RateScreen;