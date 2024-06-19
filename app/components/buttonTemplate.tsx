import { TouchableOpacity, Text } from "react-native";
import tw from 'twrnc';

type ButtonProps = {
    type: "green" | "logout" | "add" | "search" | "filter" | "no-bg" | "filter-clicked";
    size: "sm" | "med" | "big" ;
    text: string;
    onPress: () => void;
};

const ButtonTemplate = ({ type, size, text, onPress }: ButtonProps) => {
    const backgroundColour = type === "green" ? "bg-green-700" : type === "filter" ? "bg-transparent rounded-xl" : type === "filter-clicked" ? "bg-green-700 rounded-xl" : type === "logout" ? "bg-amber-600" : type === "add" ? "bg-transparent" : "bg-transparent";
    const textColour = type === "no-bg" ? "text-green-700" : type === "filter" ? "text-green-700" : type === "add" ? "text-gray-500" : "text-white";
    const textSize = size === "sm" ? "text-sm" : size === "med" ? "text-base" : "text-2xl";
    const width = size === "sm" ? "" : size === "med" ? "w-fit px-3" : "w-4/5";
    const height = size === "sm" ? "" : size === "med" ? "h-8" : "h-13";
    const marginTop = size === "sm" ? "" : size === "med" ? "mt-1" : "mt-2";
    const marginBottom = size === "sm" ? "" : size === "med" ? "mb-1" : "mb-2";
    const bold = size === "sm" ? "" : "font-bold";
    const border = type === "add" ? "border border-gray-500" : type === "filter" ? "border border-green-700" : type === "filter-clicked" ? "border border-green-700" : type === "search" ? "border border-white" : "";
    return (
        <TouchableOpacity
            onPress={onPress}
            style={tw`${width} ${marginBottom} ${marginTop} ${border} shadow-sm rounded-lg justify-center ${backgroundColour} ${height}`}
        >
            <Text style={tw`${textColour} ${textSize} ${bold} text-center`}>
                {text}
            </Text>

        </TouchableOpacity>
    );
};

export default ButtonTemplate;