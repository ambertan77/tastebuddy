import { TouchableOpacity, Text } from "react-native";
import tw from 'twrnc';

type ButtonProps = {
    type: "green" | "orange" | "yellow" | "no-bg";
    size: "sm" | "med" | "big" ;
    text: string;
    onPress: () => void;
};

const ButtonTemplate = ({ type, size, text, onPress }: ButtonProps) => {
    const backgroundColour = type === "green" ? "bg-green-700" : type === "orange" ? "bg-amber-600" : type === "yellow" ? "bg-yellow-500" : "bg-transparent";
    const textColour = type === "no-bg" ? "text-green-700" : "text-white";
    const textSize = size === "sm" ? "text-sm" : size === "med" ? "text-base" : "text-2xl";
    const width = size === "sm" ? "" : size === "med" ? "w-1/5" : "w-4/5";
    const height = size === "sm" ? "" : size === "med" ? "h-8" : "h-13";
    const marginTop = size === "sm" ? "" : size === "med" ? "mt-1" : "mt-2";
    const marginBottom = size === "sm" ? "" : size === "med" ? "mb-1" : "mb-2";
    const bold = size === "sm" ? "" : "font-bold";
    return (
        <TouchableOpacity
            onPress={onPress}
            style={tw`${width} ${marginBottom} ${marginTop} rounded-lg justify-center ${backgroundColour} ${height}`}
        >
            <Text style={tw`${textColour} ${textSize} ${bold} text-center`}>
                {text}
            </Text>

        </TouchableOpacity>
    );
};

export default ButtonTemplate;