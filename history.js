import { Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles.js';
import { useSelector } from 'react-redux';


export default function HistoryScreen ({navigation}) {
    const messages = useSelector((state) => state.history.messages);
    console.log(messages);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black'}}>Here is your history of messages ciphered</Text>
            <Text style={{ fontSize: 15,  marginBottom: 30, color: 'black'}}>Press on the message to see its details</Text>
            <FlatList
                data = {messages}
                renderItem ={({ item }) => (
                    <TouchableOpacity
                        onPress={ () => { navigation.navigate('Details', {detailID: item.id}) } }
                    > 
                        <Text style={{marginBottom: 15}}>
                            Message {item.id}: {item.message}
                        </Text>
                    </TouchableOpacity>
                    
                    
                    
                )}
                keyExtractor={(item) => item.id}
                />
            
            <Button title='To Cipher'
                onPress ={() => {navigation.navigate('Home'); 
                }}
            />
        </View>
        
      );
}
