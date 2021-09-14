import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGame = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numperInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue('');
  };

  const confirmInputHandler = () => {
    const chooseNumber = parseInt(enteredValue);
    if (!chooseNumber || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chooseNumber);
    Keyboard.dismiss();
  };

  let confirmedNumber = confirmed && (
    <Card style={styles.selectedNumberCard}>
      <BodyText>Choose Number:</BodyText>
      <NumberContainer style={styles.selectedNumber}>
        {selectedNumber}
      </NumberContainer>
      <MainButton
        style={styles.mainButton}
        onPress={() => onStartGame(selectedNumber)}
      >
        Start Game
      </MainButton>
    </Card>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText>start a new game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select A Number</BodyText>
          <Input
            autoCorrect={false}
            maxLength={2}
            keyboardType="numeric"
            blurOnSubmit
            style={styles.input}
            onChangeText={numperInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedNumber}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGame;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: 50,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  selectedNumberCard: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  selectedNumber: {
    width: 50,
    textAlign: 'center',
  },
  mainButton: {
    marginTop: 10,
  },
});
