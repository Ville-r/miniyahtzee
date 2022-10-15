// Needed imports for this app
import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from "../style/style";
import { useFonts } from 'expo-font';

// Global variables
let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const MAX_SPOT = 6;
const BONUS_POINTS_LIMIT = 63;

export default function Gameboard() {
// Variables and arrays needed in Gameboard and rendering
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices.');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(6).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(6).fill(0));
  const points = dicePointsTotal.reduce((partialSum, a) => partialSum + a, 0);
  const [bonus, setBonus] = useState('You are 63 points away from bonus');

// Dices 
  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        key={"row" + i}
        onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          key={"row" + i}
          name={board[i]}
          size={65}
          color={selectedDices[i] ? "orange" : "lightgreen"}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

// Points row and icons for points
  const pointsRow = [];
  for (let i = 0; i < MAX_SPOT; i++) {
    pointsRow.push(
      <Pressable
        key={"pointsRow" + i}
        onPress={() => selectPoints(i)}>
        <Text style={styles.points}>{dicePointsTotal[i]}</Text>
        <MaterialCommunityIcons
          name={"numeric-" + (i + 1) + "-circle"}
          key={"pointsRow" + i}
          size={55}
          color={selectedDicePoints[i] ? "orange" : "lightgreen"}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

// Function for throwing dices, called when user press the button.
  function throwDices() {
    if (gameEndStatus === true) {
      NewGame();
    }
    else if (nbrOfThrowsLeft === 0 && selectedDicePoints.some(element => element === false)) {
      setStatus('Select your points before next throw.');
      return;
    } else {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setStatus('Select and throw dices again.');
    }
  }

// This function is called when user chooses the dices from the boar.
  function selectDice(i) {
    if (nbrOfThrowsLeft === NBR_OF_THROWS || gameEndStatus === true) {
      setStatus('You have to throw dices first.');
      return;
    } else {
      let dicesSelected = [...selectedDices];
      dicesSelected[i] = selectedDices[i] ? false : true;
      setSelectedDices(dicesSelected);
    }
  }

// This function is called when user chooses the points after three throws. Function checks if the points for chosen spot has already been set.
  function selectPoints(i) {

    if (nbrOfThrowsLeft > 0 && nbrOfThrowsLeft <= NBR_OF_THROWS) {
      setStatus('Throw 3 times before setting points');
      return;
    }
    else if (nbrOfThrowsLeft === 0 && gameEndStatus === false) {
      let points = [...selectedDicePoints];
      let pointsAmount = [...dicePointsTotal];
      if (points[i] === false) {
        let sum = 0;
        for (let x = 0; x < NBR_OF_DICES; x++) {
          if (board[x] === "dice-" + (i + 1)) {
            sum += (i + 1);
          }
        }
        points[i] = true;
        pointsAmount[i] = sum;
        setSelectedDicePoints(points);
        setDicePointsTotal(pointsAmount);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setNbrOfThrowsLeft(3);
        setStatus('Throw dices.');
      } else {
        setStatus('You have already selected points for ' + (i + 1) + '.');
        return;
      }
    } else {
      setStatus('Throw 3 times before setting points')
    }
  }

// Function for checking if the user gets the bonus or not. Called afted points have set.
  function checkBonusPoints() {
    const bonusPoints = BONUS_POINTS_LIMIT - points;

    if (points >= BONUS_POINTS_LIMIT && selectedDicePoints.some(element => element === false)) {
      setBonus('You got the bonus!');
    }
    else if (points >= BONUS_POINTS_LIMIT && selectedDicePoints.every(element => element === true)) {
      setStatus('Game over. All points selected.');
      setNbrOfThrowsLeft(0);
      setGameEndStatus(true);
      setBonus('You got the bonus!');
    }
    else if (points < BONUS_POINTS_LIMIT && selectedDicePoints.every(element => element === true)) {
      setStatus('Game over. All points selected.');
      setNbrOfThrowsLeft(0);
      setGameEndStatus(true);
      setBonus('You are ' + bonusPoints + ' points away from bonus');
    }
    else {
      setBonus('You are ' + bonusPoints + ' points away from bonus');
    }
  }

// Function for the new game. This function is called after game has ended and user press the "throw dices" -button. Puts all the values back like they was at the start of the game first time.
  function NewGame() {
    board = [];
    setNbrOfThrowsLeft(3);
    setStatus('Throw dices.');
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSelectedDicePoints(new Array(6).fill(false));
    setDicePointsTotal(new Array(6).fill(0));
    setGameEndStatus(false);
  }
// Hook for setting the status, if there are throws left.
  useEffect(() => {
    if (nbrOfThrowsLeft <= 0 && gameEndStatus === false) {
      setStatus('Select your points.')
    }
  }, [nbrOfThrowsLeft])
// Hook for checking bonus points after user has set the points for some of the dice spots. 
  useEffect(() => {
    checkBonusPoints();
  }, [dicePointsTotal])

// Fonts
  const [loaded] = useFonts({
    'Cairo-ExtraBold': require('../assets/fonts/Cairo-ExtraBold.ttf'),
    'Cairo-Bold': require('../assets/fonts/Cairo-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }
// Rendering
  return (
    <View style={styles.gameboard}>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>{status}</Text>
      <Text style={styles.total}>Total: {points}</Text>
      <Text style={styles.gameinfo}>{bonus}</Text>
      <View style={styles.flex}>{pointsRow}</View>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
        <Text style={styles.buttonText}>Throw dices</Text>
      </Pressable>
    </View>
  )
}