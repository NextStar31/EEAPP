import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Linking
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Calendar from "expo-calendar";
import * as Permissions from "expo-permissions";
import moment from 'moment-timezone';

export default class EventDetailScreen extends React.Component {
  /* static navigationOptions = {
    title: "Nos évènements"
  };*/

  constructor(props) {
    super(props);

    this.state = {
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
      const calendar = calendars.find(({ isPrimary }) => isPrimary);
      console.log(calendar);

      var begin = new Date(2019, 11, 18, 9, 30);
      console.log(begin);
      var m = moment(begin).tz("Europe/Paris").format();
      console.log(m);
      var eventi = await Calendar.createEventAsync("1", {
        alarms:
          Array[
          ({
            relativeOffset: -60
          },
          {
            relativeOffset: -3600
          })
          ],
        allDay: false,
        availability: "busy",
        startDate: m,
        endDate: new Date("2019-12-18"),
        title: "push",
        timeZone: "Europe/Paris"
      })
        .then(event => {
          console.log("success", event);
        })
        .catch(error => {
          console.log("failure", error);
        });
    }
  };

  render() {
    const { navigation, route } = this.props;
    const { item } = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: item.uri
            }}
          />

          <Text>
            {item.date}
          </Text>
          <Text>{item.title}</Text>
          <Text>
            {item.start} - {item.end}
          </Text>

          <Text>{item.theme}</Text>
          <Text>{item.desciption}</Text>

          {item.speakers.map((el, i, arr) => (
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
