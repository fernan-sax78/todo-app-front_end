import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  todo : {
    fontWeight: "500",
    letterSpacing: 0.5,
    fontSize: 18,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  btn : {
    backgroundColor : "#171717",
    padding : 10,
    borderRadius: 15,
  },
  share : {
    color : "#fff",
    fontSize : 20,
    textAlign : "center",
  }
});