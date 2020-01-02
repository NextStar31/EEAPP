import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  View,
  Linking,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import I18n from "../constants/i18n/i18n";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require("../../../assets/images/fond_short.png")}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.getStartedContainer}>
          <Text style={styles.title}>BIENVENUE A PAC31 -</Text>
          <Text style={styles.subtitle}>
            EGLISE EVANGELIQUE APOSTOLIQUE DE TOULOUSE
          </Text>
        </View>
        <View style={{ height: "38%" }}>
          <ScrollView scrollEnabled={true} scrollEventThrottle={30}>
            <View style={styles.paragraphStyle}>
              <Text style={styles.ptitleStyle}>{I18n.t("adress")} :</Text>
              <Text style={styles.psubtitle}>
                27 ter rue Jules Tellier 31100 Toulouse
              </Text>
              <TouchableHighlight
                onPress={this._handleClickMap}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <Icon name="map" size={20} color="white" />
                  <Text style={styles.btnText}>Visitez nous</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.paragraphStyle}>
              <Text style={styles.ptitleStyle}>Contact :</Text>
              <TouchableHighlight
                onPress={this._handleCallPress}
                style={styles.btnClickContain}
              >
                <View style={styles.btnContainer}>
                  <Icon name="phone" size={20} color="white" />
                  <Text style={styles.btnText}>0615085201</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this._handleEmailPress}
                style={[styles.btnClickContain, styles.large]}
              >
                <View style={styles.btnContainer}>
                  <Icon name="envelope" size={20} color="white" />
                  <Text style={styles.btnText}>support@example.com</Text>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Pour plus d'info, suivez nous sur les réseaux :
          </Text>
          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <Button
              onPress={this._handleFacebookPress}
              title="Facebook"
              color="#e88f00"
            />
            <Button
              onPress={this._handleHelpPress}
              title="Site"
              color="#e88f00"
            />
          </View>
        </View>
      </View>
    );
  }

  _handleCallPress = () => {
    Linking.canOpenURL("tel:0615085201").then(supported => {
      if (supported) {
        Linking.openURL("tel:0615085201");
      } else {
        console.log("Don't know how to open URI: " + "tel:0615085201");
      }
    });
  };

  _handleEmailPress = () => {
    Linking.canOpenURL("mailto:support@example.com").then(supported => {
      if (supported) {
        Linking.openURL("mailto:support@example.com");
      } else {
        console.log(
          "Don't know how to open URI: " + "mailto:support@example.com"
        );
      }
    });
  };

  _handleHelpPress = () => {
    Linking.canOpenURL(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    ).then(supported => {
      if (supported) {
        Linking.openURL(
          "https://docs.expo.io/versions/latest/guides/development-mode"
        );
      } else {
        console.log(
          "Don't know how to open URI: " +
            "https://docs.expo.io/versions/latest/guides/development-mode"
        );
      }
    });
  };

  _handleFacebookPress = () => {
    Linking.canOpenURL("https://fr-fr.facebook.com/eeachurch/").then(
      supported => {
        if (supported) {
          Linking.openURL("https://fr-fr.facebook.com/eeachurch/");
        } else {
          console.log("Don't know how to open URI: " + "fb://page/PAGE_ID");
        }
      }
    );
  };

  _handleClickMap = () => {
    const scheme = Platform.select({
      ios: "maps:",
      android: "geo:"
    });
    const latitude = 43.587342;
    const longitude = 1.41173;
    const latLng = `${latitude},${longitude}`;
    const label = "Église+évangélique+apostolique+Toulouse";
    const url = Platform.select({
      ios: `${scheme}${latLng}` + "?q=" + label,
      android: `${scheme}${latLng}` + "?q=" + label
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url).catch(error => console.log(error));
      } else {
        browser_url =
          "https://www.google.de/maps/@" +
          latitude +
          "," +
          longitude +
          "?q=" +
          label;
        return Linking.openURL(browser_url).catch(error => console.log(error));
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcomeContainer: {
    alignItems: "center",
    width: "100%",
    height: "23%"
  },
  btnClickContain: {
    alignSelf: "center",
    backgroundColor: "#e88f00",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    width: "60%"
  },
  large: {
    width: "70%"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 18,
    color: "white",
    lineHeight: 30,
    marginLeft: 10
  },
  welcomeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  getStartedContainer: {
    alignItems: "center",
    paddingTop: "8%",
    paddingBottom: "4%",
    marginBottom: "2%"
    /*borderBottomColor:'#ADADAD',
    borderBottomWidth:1*/
  },
  paragraphStyle: {
    flex: 1,
    marginHorizontal: "5%",
    marginTop: "2%",
    marginBottom: "3%"
  },
  ptitleStyle: {
    fontSize: 24,
    color: "rgba(96,100,109, 1)",
    lineHeight: 30,
    fontWeight: "bold"
  },
  psubtitle: {
    textAlign: "center",
    fontSize: 18,
    color: "#e88f00",
    lineHeight: 24
  },
  mapButton: {
    marginVertical: 10,
    marginHorizontal: "auto"
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  title: {
    fontSize: 32,
    color: "rgba(96,100,109, 1)",
    lineHeight: 42,
    textAlign: "center",
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 24,
    color: "#e88f00",
    lineHeight: 34,
    textAlign: "center",
    marginTop: "5%",
    fontWeight: "bold"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-around"
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
