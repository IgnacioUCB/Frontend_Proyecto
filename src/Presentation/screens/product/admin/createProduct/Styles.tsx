import { StyleSheet, Dimensions } from "react-native";
import { CustomColors } from "../../../../theme/AppTheme";
const { height, width } = Dimensions.get("screen");

const CreateStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.background,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.04,
    marginTop: height * 0.05,
  },
  imageBackground: {
    bottom: 30,
    width: "100%",
    height: "70%",
    opacity: 0.4,
  },
  form: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "80%",
    padding: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  formText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formInput: {
    flexDirection: "row",
    marginTop: 30,
  },
  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    marginLeft: 15,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  formRegisterText: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    color: "orange",
    fontStyle: "italic",
    fontWeight: "bold",
    marginLeft: 10,
  },
  goBackButton: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
  },
  formIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  formError: {
    marginTop: 10,
    backgroundColor: '#ff7f7f',
    borderLeftWidth: 3,
    borderColor: '#993235',
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    top: "5%",
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  logoBack: {
    width: 80,
    height: 80,
  },
  loading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default CreateStyles;
