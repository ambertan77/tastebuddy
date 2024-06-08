import { TouchableOpacity, Text } from "react-native";
import tw from 'twrnc';

type ButtonProps = {
    type: "green" | "orange" | "yellow";
    size: "sm" | "med" | "big" ;
    text: string;
    onPress: () => void ;
};

const ButtonTemplate = ({ type, size, text, onPress }: ButtonProps) => {
    const backgroundColour = type === "green" ? "bg-green-700" : type === "orange" ? "bg-amber-600" : "bg-yellow-500";
    const textColour = "text-white"
    const textSize = size === "sm" ? "text-sm" : size === "med" ? "text-base" : "text-xl";
    const width = size === "sm" ? "w-1/4" : size === "med" ? "w-2/3" : "w-4/5";
    const height = size === "sm" ? "h-8" : size === "med" ? "h-10" : "h-13";
    const marginTop = size === "sm" ? "mt-0" : size === "med" ? "mt-1" : "mt-2";
    const marginBottom = size === "sm" ? "mb-0" : size === "med" ? "mb-1" : "mb-2";
    return (
        <TouchableOpacity
            onPress={onPress}
            style={tw`${width} ${marginBottom} ${marginTop} rounded-lg justify-center ${backgroundColour} ${height}`}
        >
            <Text style={tw`${textColour} ${textSize} font-bold text-center`}>
                {text}
            </Text>

        </TouchableOpacity>
    );
};

export default ButtonTemplate;