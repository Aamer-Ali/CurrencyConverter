import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

// Constants
import {currencyByRupee} from './constants';

//Component
import CurrencyButton from './components/CurrencyButton';
const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (selectedTargetValue: Currency) => {
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedVAlue = inputAmount * selectedTargetValue.value;
      const result = `${selectedTargetValue.symbol}${convertedVAlue.toFixed(
        2,
      )}`;
      setResultValue(result);
      setTargetCurrency(selectedTargetValue.name);
    }
  };

  const handleChangeText = (text: string) => {
    if (text === '') {
      setInputValue('');
      setTargetCurrency('');
      setResultValue('');
    } else {
      setInputValue(text);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.mainContainer}>
        <Text style={styles.headingText}> Currency Converter</Text>
        <View style={styles.textInputFieldContainer}>
          <TextInput
            numberOfLines={1}
            value={inputValue}
            placeholder="Enter the amount"
            clearButtonMode="always"
            keyboardType="number-pad"
            onChangeText={handleChangeText}
          />
        </View>
        <View style={styles.mainFeature}>
          {resultValue && (
            <Text style={styles.resultText}>
              {inputValue} Rupees is {resultValue} {targetCurrency} 🤑
            </Text>
          )}
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.pressableCountryCard,
                  targetCurrency === item.name &&
                    styles.selectedPressableCountryCard,
                ]}
                onPress={() => buttonPressed(item)}>
                <CurrencyButton flag={item.flag} name={item.name} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 20,
  },
  pressableCountryCard: {
    marginTop: 40,
    width: screenWidth / 3.5,
    backgroundColor: 'lightblue',
    borderRadius: 4,
    marginHorizontal: 8,
    padding: 8,
  },
  mainFeature: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputFieldContainer: {
    justifyContent: 'flex-start',
    marginHorizontal: 24,
    marginTop: 40,
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
  },
  selectedPressableCountryCard: {backgroundColor: 'yellow'},
  mainContainer: {marginVertical: 30},
});
