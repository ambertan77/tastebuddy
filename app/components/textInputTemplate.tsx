import { TouchableOpacity, Text, TextInput } from "react-native";
import tw from 'twrnc';

type TextProps = {
    type: "1" | "2";
    text: string;
    setText: () => void;
    value: string;
};

const TextInputTemplate = ({ type, text, setText, value }: TextProps) => {
    const secure = type === "1" ? true : false;
    return (
        <TextInput
            style={tw`w-4/5 p-4 bg-white rounded-lg mb-3 border border-gray-400`}
            placeholder={text}
            secureTextEntry={secure}
            onChangeText={setText}
            value={value}
        />
    );
};

export default TextInputTemplate;