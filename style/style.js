import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90ee90',
  },
  header: {
    marginTop: 50,
    marginBottom: 15,
    flexDirection: 'row',
  },
  footer: {
    margin: 20,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  author: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Cairo-Bold'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row",
  },
  points: {
    textAlign: 'center',
    fontFamily: 'Cairo-Bold'
  },
  total: {
    fontSize: 30,
    fontFamily: 'Cairo-ExtraBold',

  },
  button: {
    margin: 30,
    height: 70,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#00ff00",
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#2B2B52",
    fontSize: 27,
    fontFamily: 'Cairo-ExtraBold'
  }
});