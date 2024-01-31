import { Dimensions , StyleSheet } from "react-native";


const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: "#00000030",
    alignItems: "baseline",
  },
  emojiesContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginVertical: 10,
  },
  inputContainer: {
    width: "100%",
    marginTop : 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 25,
    paddingVertical: 5,
    marginRight: 10,
  },

  containerTextInput: {
    width: windowWidth - 100,
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 16,
    paddingVertical: 5,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    marginBottom: 5,
    fontWeight: "600",
  },
});