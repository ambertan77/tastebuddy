import { TouchableOpacity, Text, TextInput } from "react-native";
import tw from 'twrnc';

type TextProps = {
    type: "1" | "2" | "3" ;
    text: string;
    setText: () => void;
    value: string;
    testId?: string;
};

const TextInputTemplate = ({ type, text, setText, value, testId }: TextProps) => {
    const secure = type === "1" ? true : false;
    const lines = type === "3" ? true : false;
    const styling = type === "3" ? "w-full h-15 p-2 bg-white rounded-lg mb-3" : "w-4/5 p-4 bg-white rounded-lg mb-3";
    return (
        
        <TextInput
            style={tw`${styling} border border-gray-400`}
            placeholder={text}
            secureTextEntry={secure}
            onChangeText={setText}
            autoCapitalize="none"
            value={value}
            multiline={lines}
            testID={testId}
        />
    );
};

export default TextInputTemplate;