import { Image } from "react-native";

const ProfilePic = () => {
    return <Image
        source={require('../components/user.png')}
        style={{width: 80, height: 80}}
    />
};

export default ProfilePic;