import { handlePostData } from "@/components/api/postApi";
import { fetchPosts } from "@/components/api/getAPi";
import { Button } from "@/components/button";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function Test() {
    
    return(
        <View style={styles.page}> 
            <Button title="Post" onPress={handlePostData}/>
            <Button title="Get" onPress={fetchPosts}/>
            <Button title="Update"/>
            <Button title="delete"/>
        </View>
)}


const styles = StyleSheet.create({
    page: {
     flex: 1,
     padding: 32,
     justifyContent: "center",
     gap: 8,
    }
})