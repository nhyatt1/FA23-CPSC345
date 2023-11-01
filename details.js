import { View, Button } from 'react-native';
import { styles } from './styles.js';
import { useDispatch, useSelector } from 'react-redux';

export default function DetailsScreen ({route, navigation}) {
    const encryptionView = (arrdata) => {
        return(
            <>
                
        
            </>
        );
    }
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.history.messages);

    return(
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'black'}}>Here are the details of this Cipher:</Text>
                <View>
                    <Text>
                        Your original message was: {messages.filter((objElement) => {return objElement.id == route.params.detailID}).message}<br/>
                        The Cipher key was: {messages.filter((objElement) => {return objElement.id == route.params.detailID}).shift}<br/>
                        You performed a {messages.filter((objElement) => {return objElement.id == route.params.detailID}).type}<br/>
                        The result was {messages.filter((objElement) => {return objElement.id == route.params.detailID}).result}
                    </Text>
                </View>
                <Button name='DELETE?' onPress={()=>dispatch(removeMessage(route.params.detailID))}/>
            <Button name='To History' onPress={()=>{navigation.navigate('History')}}/>

        </View>
    );
}