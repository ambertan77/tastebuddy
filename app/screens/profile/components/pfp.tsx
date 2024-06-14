import { Image } from "react-native";

const ProfilePic = () => {
    return <Image
        source={require('../components/user.png')}
        style={{width: 100, height: 100}}
    />
};

export default ProfilePic;