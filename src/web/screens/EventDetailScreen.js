import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Button
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Calendar from "expo-calendar";
import * as Permissions from 'expo-permissions';

export default class EventDetailScreen extends React.Component {
  /* static navigationOptions = {
    title: "Nos évènements"
  };*/

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: {
        id: "1",
        date: "01/12/2019",
        start: "9h30",
        end: "12h30",
        title: "Culte du dimanche",
        eventDay: "Dimanche",
        theme: "la guérison",
        desciption:
          "His cognitis Gallus ut serpens adpetitus telo vel saxo iamque spes extremas opperiens et succurrens saluti suae quavis ratione colligi omnes iussit armatos et cum starent attoniti, districta dentium acie stridens adeste inquit viri fortes mihi periclitanti vobiscum.",
        image:
          "http://www.jeanbertot.com/wp-content/uploads/2016/06/healthy-cure-healing.jpg",
        speakers: [
          {
            id: "1",
            firstName: "Jean-daniel",
            lastName: "Bertot",
            avatar:
              "data:image/jpeg;base64,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"
          }
        ]
      }
    };
  }

  _handleAddToCalendar = async () => {
    console.log("clicked");

    const hasCalendarPermission = await Permissions.askAsync(
      Permissions.CALENDAR
    ); 
    console.log(hasCalendarPermission);
    if (hasCalendarPermission.status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
      console.log(calendars);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>
            {navigation.getParam("id")} - {navigation.getParam("name")}
          </Text>

          <Image
            style={styles.avatar}
            source={{
              uri: this.state.data.image
            }}
          />

          <Text>
            {this.state.data.eventDay} - {this.state.data.date}
          </Text>
          <Text>{this.state.data.title}</Text>
          <Text>
            {this.state.data.start} - {this.state.data.end}
          </Text>

          <Text>{this.state.data.theme}</Text>
          <Text>{this.state.data.desciption}</Text>

          {this.state.data.speakers.map((el, i, arr) => (
            <View key={el.id}>
              <Image style={styles.avatar} source={{ uri: el.avatar }} />
              <Text>
                {el.firstName} {el.lastName}
              </Text>
            </View>
          ))}

          <Button
            onPress={this._handleAddToCalendar}
            title="Calendrier"
            color="#e88f00"
          />
        </View>
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
