import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: "Nos évènements"
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      events: []
    };
  }

  componentDidMount() {
    this._importDataFormService();
  }

  _importDataFormService = () => {
    fetch("http://192.168.1.26:8080/api/events", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == "success") {

          this.setState({
            events: response.data, loading: false
          })
        }
      });
  };


  _formatDate(date) {

    const d = new Date(date);
    var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    var dayName = days[d.getDay()];
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    return `${dayName} - ${day}/${month}/${year}`;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.events}
          keyExtractor={item => item.id}
          onRefresh={() => {
            this._importDataFormService();
          }}
          refreshing={this.state.loading}
          progressViewOffset={100}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigate("EventDetails", { item });
              }}
            >
              <View style={styles.header}>
                <Text>
                  {this._formatDate(item.date)}
                </Text>
                <View
                  style={{
                    flexGrow: 1,
                    height: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#CCCCCC",
                    marginLeft: 10
                  }}
                />
              </View>
              <View style={styles.card}>
                <View>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: item.uri || item.speakers[0].avatar
                    }}
                  />
                </View>
                <View style={styles.description}>
                  <Text>{item.title}</Text>
                  <Text>
                    {item.start} - {item.end}
                  </Text>
                  <Text>
                    Orateur :
                    {item.speakers.map((el, i, arr) => {
                    let name = " " + el.firstName + " " + el.lastName;
                    if (arr.length - 1 !== i) {
                      name += " /";
                    }
                    return name;
                  })}
                  </Text>
                </View>
                <View>
                  <Icon name="angle-right" size={30} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  header: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center"
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: "#f0f0f5",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center"
  },
  avatar: {
    padding: 10,
    width: 50,
    height: 50
  },
  description: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column"
  }
});
