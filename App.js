import React from 'react';
import { StyleSheet, Image, ActivityIndicator, View, AppRegistry, ScrollView , AsyncStorage , Alert} from 'react-native';
import { Button, Header, Card, Text, Rating, List, ListItem } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';
import RateScreen from './components/RateScreen';
import queryString from 'query-string';

/*
class Buttons extends React.Component {
  render() {
    const {fetchImage, like, email} = this.props;
    return (
      <View>
        <Button buttonStyle={styles.button} backgroundColor='#6699ff' title="I want another!" onPress={fetchImage} />
        <Button buttonStyle={styles.button} backgroundColor='#ff6699' title="I love it!" onPress={like} />
        <Button buttonStyle={styles.button} backgroundColor='#99ff66' title="Share it!" onPress={email} />
      </View>
      );
  }
}



Old CardBundle which takes entire screen
class CardBundle extends React.Component {

  constructor(props){
    super(props);
    this.state = {imageUrl: '', loading: '' };
  }

  componentWillMount(){
    this.handlePress();
  }

  handlePress = () => {
    this.setState({ loading: true })
    fetch('http://thecatapi.com/api/images/get')
      .then(response => {
        this.setState({ imageUrl: response.url, loading: false });
      });
  }

  handleLike = () => {
    console.log("I like " + this.state.imageUrl); 
  }

  handleEmail = () => {
    //Custom email feature
    this.setState({ emailing: true }); // Mark beginning of load
    const apiKey = 'key-ae1f6f860d25b28a2de63f76ad55758e';
    const body = {
      from: 'Something original <postmaster@sambalana.com>',
      to: ['Sam <sambalana247@gmail.com>'],
      subject: 'MOM! GET THE CAMERSA!',
      html: `I found something really cool: <img src=${this.state.imageUrl} />`,
    };


const options = {
  method: 'POST',
  headers: {
    'content-type': 'x-www-form-urlencoded',
    'Authorization': `api:${apiKey}`,
  },
  body: queryString.stringify(body),

};

fetch('https://api.mailgun.net/v3/sambalana.com/message', options).then((response) => {
  return response.json();
}).then((json) => {
  console.log(json);
  console.log(options);
  this.setState({ emailing: false });
})

    console.log("Hey mom! I found something really cool " + this.state.imageUrl);
  }

  render() {
    const title = this.props.title;
    const { loading } = this.state;
    return(
      <View>
      <StatusBarBackground />
        {loading === true ? (
            <ActivityIndicator />
          ) : (
            <Image source={{ uri: this.state.imageUrl }} style={{ width: 300, height: 300 }}/>
          )}
        <Text style={styles.text}>{title}</Text>
        <Buttons 
          fetchImage={this.handlePress}
          like={this.handleLike}
          email={this.handleEmail}
        />
      </View>
      );
  }
}
*/

//NEW STUFFZ

class CardLeft extends React.Component {

  constructor(props){
    super(props);
    this.state = {imageUrl: '', loading: ''};
  }

  componentWillMount(){
    this.handlePress();
  }

  handlePress = () => {
    this.setState({ loading: true })
    fetch('http://thecatapi.com/api/images/get')
      .then(response => {
        this.setState({ imageUrl: response.url, loading: false });
      });
  }

  render(){
    const { marginRight, marginLeft } = this.props;
    const { navigate } = this.props.navigation;
    return(
      <View>
      {(this.state.loading == true ? (
        <Card containerStyle={{marginRight: 7, marginLeft: 15}} >
        <ActivityIndicator />
          <Button
            icon={{name: 'details'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 15}}
            title='RATE ME' />
        </Card>
      ) : (
        <Card containerStyle={{marginRight: 7, marginLeft: 15}} 
        image={{ uri: this.state.imageUrl}} >
          <Button
            icon={{name: 'details'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={() => navigate("Rate", { url: this.state.imageUrl } )}
            title='RATE ME' />
        </Card>
      
      )
        )}
      </View>
      );
  }
}

class CardRight extends React.Component {

  constructor(props){
    super(props);
    this.state = {imageUrl: '', loading: ''};
  } 

  componentWillMount(){
    this.handlePress();
  }

  handlePress = () => {
    this.setState({ loading: true })
    fetch('http://thecatapi.com/api/images/get')
      .then(response => {
        this.setState({ imageUrl: response.url, loading: false });
      });
  }

  render(){
    const { marginRight, marginLeft } = this.props;
    const { navigate } = this.props.navigation;
    return(
      <View>
      {(this.state.loading == true ? (
        <Card containerStyle={{marginRight: 15, marginLeft: 7}} >
        <ActivityIndicator />
          <Button
            icon={{name: 'details'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 15}}
            title='RATE ME' />
        </Card>
      ) : (
        <Card containerStyle={{marginRight: 15, marginLeft: 7}} 
        image={{ uri: this.state.imageUrl}} >
          <Button
            icon={{name: 'details'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={() => navigate("Rate", { url: this.state.imageUrl } )}
            title='RATE ME' />
        </Card>
      )
        )}
      </View>
      );
  }
}

class CardStack extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.lineSet}>
        <CardLeft navigation={this.props.navigation} />
        <CardRight navigation={this.props.navigation} />
      </View>
      );
  }
}

  class App extends React.Component {

  static navigationOptions = {
    title: 'View Cats',
  }

  clearData = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear ALL data? There will be no way to recover this data',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Confirm', onPress: () => AsyncStorage.clear()},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/*} <StatusBarBackground /> */}
        <ScrollView style={{ width: 375 }}>
        <Button title="Clear data" onPress={() =>
        this.clearData()
        } />
          <CardStack navigation={this.props.navigation} />
          <CardStack navigation={this.props.navigation} />
          <CardStack navigation={this.props.navigation} />
          <CardStack navigation={this.props.navigation} />
          <CardStack navigation={this.props.navigation} />
          </ScrollView>
      </View>
    );
  }
}

class Rankings extends React.Component {

  static navigationOptions = {
    title: 'Rankings',
  }

  clearData = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear ALL data? There will be no way to recover this data',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Confirm', onPress: () => AsyncStorage.clear()},
      ],
      { cancelable: false }
    )
  }

  list = [];

  refreshData = () => {
    this.setState({ loading: true })
    AsyncStorage.getItem("map").then((obj) =>{
        if(obj != null){
          //Exists
          console.log("parsing")
          console.log(JSON.parse(obj))
          tmplist = Array.from(JSON.parse(obj));
          this.list = tmplist.sort(function(a, b) {
            return b[1] - a[1];
          });
          this.setState({ loading: false })
        }else{
          this.setState({ loading: false })
          console.log("NULL")
        }
     })
  }

  constructor(props){
    super(props);
    this.state = { loading: true,}
    AsyncStorage.getItem("map").then((obj) =>{
        if(obj != null){
          //Exists
          console.log("parsing")
          console.log(JSON.parse(obj))
          tmplist = Array.from(JSON.parse(obj));
          this.list = tmplist.sort(function(a, b) {
            return b[1] - a[1];
          });
          this.setState({ loading: false })
        }else{
          this.setState({ loading: false })
          console.log("NULL")
        }
     })
  }

  render() {
    const { navigation } = this.props;
    /*
    AsyncStorage.getItem("map").then((map) => {
    console.log("ASYNC START")

    })
    */
    if(this.state.loading){
      return (<ActivityIndicator style={styles.container} />);
    }else if(this.list.length == 0){
      return(
          <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', width: 375, alignItems: 'center', }}>
              <Button title="Clear data" onPress={() => this.clearData() } />
              <Button title="Refresh data" onPress={() => this.refreshData() } />
            </View>
            <Text>You have no voted for any cats!</Text>
            <Text>Return to View Cats and choose your favorite!</Text>
          </View>
        );
    }else{
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: 375 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
            <Button title="Clear data" onPress={() => this.clearData() } />
            <Button title="Refresh data" onPress={() => this.refreshData() } />
          </View>
          <List containerStyle={{marginBottom: 20 }}>
          {console.log(this.list)}
            {
             this.list.map((l, i) => (
                <ListItem
                  roundAvatar
                  avatar={{ uri: l[0] }}
                  key={i}
                  onPress={() => navigation.navigate("Rate", { url: l[0] } )}
                  title={l[0]}
                  subtitle={l[1]}
                    />
                ))
            }
          </List>
        </ScrollView>
      </View>
      );
    }
  }
}

const StackRoutes = StackNavigator({
  Home: { screen: App },
  Rate: { screen: RateScreen},
});

const StackRanking = StackNavigator({
  Rankings: { screen: Rankings }
});

const TabRoutes = TabNavigator({
  CatView: { screen: StackRoutes },
  Rankings: { screen: StackRanking },
});

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

export default TabRoutes;