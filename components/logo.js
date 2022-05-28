import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      style={{ height: 35, width: 35, marginBottom: 10 }}
      source={require("../assets/Airbnb-Embleme.jpeg")}
    />
  );
};

export default Logo;
