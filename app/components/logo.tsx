import { Image } from "react-native";

const TBLogo = () => {
    return <Image
        source={require('../assets/images/logo.png')}
        style={{width: 250, height: 250}}
    />
};

export default TBLogo;