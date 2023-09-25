import { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import { styles } from './styles';

//functions to encrypt text by shifting with a caesar cipher, parameters the text to be ciphered, and the shift key
export default function CipherScreen() {
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('0')
  const shift = parseInt(key, 10)
  const [ciphered, setCiphered] = useState('')

  let cipheredText = ''
  let accShift = 0

  function isValidKey(key) {
    const parsedKey = parseInt(key, 10);
    return !isNaN(parsedKey) && Number.isInteger(parsedKey);
  }

  function enCipher(text, shift){
    //encrypts via caesar cipher
    accShift = shift % 26
    if (typeof shift != 'number'){
      setCiphered('You must enter a number for your key!');
      return;
    }
    for (let i=0; i < text.length; i++){
      if ((text.charCodeAt(i) + accShift == text.charCodeAt(i)) && (accShift != 0)){
        setCiphered('You must enter a number for your key!')
        //exits function if user input for shift is not a number.
        return; 
      }
      if(text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90){
        //uppercase alphabet encryption
        if((text.charCodeAt(i) + accShift) > 90){
          //for shifts that wrap to start of alphabet
          cipheredText += String.fromCharCode(64 + ((text.charCodeAt(i) + accShift) % 90))
        }
        else if((text.charCodeAt(i) + accShift) < 65){
          //for negative shifts that wrap to end of alphabet
          cipheredText += String.fromCharCode(91 - (65 % (text.charCodeAt(i) + accShift)))
        }
        else{
          //concatenates any non alphabet letter back to the decrypted message.
          cipheredText += String.fromCharCode(text.charCodeAt(i) + accShift)
        }
      }
      else if(text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122){
        //lowercase alphabet encryption
        if ((text.charCodeAt(i) + accShift) > 122){
          //for shifts that wrap to start of alphabet
          cipheredText += String.fromCharCode(96 + ((text.charCodeAt(i) + accShift) % 122))
        }
        else if((text.charCodeAt(i) + accShift) < 97){
          //for negative shifts that wrap to end of alphabet
          cipheredText += String.fromCharCode(123 - (97 % (text.charCodeAt(i) + accShift)))
        }
        else{
          //concatenates any non alphabet letter back to the decrypted message.
          cipheredText += String.fromCharCode(text.charCodeAt(i) + accShift)
        }
      }
      else{
        cipheredText += text.charAt(i)
      }
    }
    setCiphered(cipheredText)
    cipheredText = ''
  }
  function deCipher(text, index){
    //decrypts via caesar cipher
    accShift = index % 26
    for (let i=0; i < text.length; i++) {
      if ((text.charCodeAt(i) + accShift == text.charCodeAt(i)) && accShift != 0){
        setCiphered('You must enter a number for your key!')
        return; 
      }
      if(text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90){
        //uppercase alphabet decryption
        if((text.charCodeAt(i) - accShift) < 65){
          //for shifts that wrap to end of alphabet
          cipheredText += String.fromCharCode(91 - (65 % (text.charCodeAt(i) - accShift)))
        }
        else if((text.charCodeAt(i) - accShift) > 90){
          //for negative shifts that wrap to beginning of alphabet
          cipheredText += String.fromCharCode(64 + ((text.charCodeAt(i) - accShift) % 90))
        }
        else{
          //concatenates any non alphabet letter back to the decrypted message.
          cipheredText += String.fromCharCode(text.charCodeAt(i) - accShift)
        }
      }
      else if(text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122){
        //lowercase alphabet decryption by caesar cipher
        if ((text.charCodeAt(i) - accShift) < 97){
          //for shifts that wrap to end of alphabet
          cipheredText += String.fromCharCode(123 - (97 % (text.charCodeAt(i) - accShift)))
        }
        else if((text.charCodeAt(i) - accShift) > 122){
          //for negative shifts that wrap to beginning of alphabet
          cipheredText += String.fromCharCode(96 + ((text.charCodeAt(i) - accShift) % 122))
        }
        else{
          //concatenates any non alphabet letter back to the decrypted message.
          cipheredText += String.fromCharCode(text.charCodeAt(i) - accShift)
        }
      }
      else{
        cipheredText += text.charAt(i)
      }
    }
    setCiphered(cipheredText)
    cipheredText = ''
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 55, fontWeight: 'bold', marginBottom: 40, color: 'black'}}>Caesar Cipher Machine</Text>
      <Image style={{resizeMode: 'contain', width: 300, height: 300, marginBottom: 25}} 
      source={require('./assets/Caesar.png')}/>

      <View style={{marginBottom: 10}}>
        <TextInput placeholder= 'Input your message to encrypt/decrypt here.' 
        style={{width: 450, height: 25, padding: '8', backgroundColor: '#857b69', color: 'white'}}
        onChangeText={text => setMessage(text)}
        />
      </View> 

      <View style={{marginBottom: 10}}>
      <TextInput placeholder= 'Enter your encryption key here, you must enter a number!' 
      style={{width: 450, height: 25, padding: '8', backgroundColor: '#857b69', color: 'white'}}
      onChangeText={text => setKey(text)
      }
      />
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Button title='Encrypt' style={{marginRight: 10}} 
        onPress={() => enCipher(message, shift)}
        disabled={!isValidKey(key)}/>
        &nbsp;&nbsp;&nbsp;
        <Button title='Decrypt' style={{marginLeft: 10}} 
        onPress={() => deCipher(message, shift)}
        disabled={!isValidKey(key)}/>
      </View>
        <Text>Your message will appear here: {ciphered}</Text>
    </View>
  );
}


