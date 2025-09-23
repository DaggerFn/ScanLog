import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { styles } from "./styles"
import AntDesign from '@expo/vector-icons/AntDesign';

type Props =  TouchableOpacityProps & {
    title: string
}

export function ButtonQR({title, ...rest}: Props){
    return(
    <TouchableOpacity activeOpacity={0.5} style={styles.Button} {...rest}>
        <AntDesign name="qrcode" size={24} color="black" />
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    )
} 