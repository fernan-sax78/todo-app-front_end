import { useState  , useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { URL_TODO_APP } from '@env';
import { Task } from './components/Task';
import  InputTask  from "./components/InputTask/InputTask";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [todos, setTodos] = useState([]);
  

useEffect(() => {
  fetchData();
}, [])



async function fetchData() {
  const response = await fetch(`${URL_TODO_APP}/todos/1`);
  const data = await response.json();
  setTodos(data);

}

function clearTodo(id){
  setTodos(todos.filter((todo) => todo.id !== id))
}

function toggleTodo(id) {
  setTodos(
    todos.map((todo) => todo.id === id 
      ? {...todo , completed : todo.completed === 1 ? 0 : 1 } : todo)
  )
}


  return (
    <GestureHandlerRootView style = {styles.gesture}>
   <BottomSheetModalProvider>

      <SafeAreaView style={styles.container}>
        <FlatList 
         data = {todos}
         keyExtractor = {(todo) => todo.id}
         renderItem = {({ item }) => <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo}/>}
         ListHeaderComponent = {() => <Text  style = {styles.title}>Today's Stuff</Text>}
         contentContainerStyle = {styles.contentContainerStyle}
        />
        <InputTask todos = {todos} setTodos = {setTodos}/>
      </SafeAreaView>
      <StatusBar style="auto" />
     
   </BottomSheetModalProvider>      
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ef',
  },
  gesture : {
    flex : 1 ,
  },
  contentContainerStyle : {
    padding : 15,
  },
  title : {
    fontWeight : '800',
    fontSize : 28,
    marginTop : 15 ,
    marginBottom : 15,
  }
});
