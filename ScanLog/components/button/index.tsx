import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { styles } from "./styles"

type Props =  TouchableOpacityProps & {
    title: string
}

export function Button({title, ...rest}: Props){
    return(
    <TouchableOpacity activeOpacity={0.5} style={styles.Button} {...rest}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    )
}