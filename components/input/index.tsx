import { TextInput, TextInputProps } from "react-native";
import { style } from "./styles";

export function Input({...rest}: TextInputProps){
    return(
        <TextInput style={style.input} {...rest}/>       
    )
}