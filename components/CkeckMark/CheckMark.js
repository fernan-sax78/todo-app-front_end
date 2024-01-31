import * as React from 'react';
import { View, Text , Pressable , StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { URL_TODO_APP } from '@env';

//console.log(URL_TODO_APP);


export function CheckMark({id , completed , toggleTodo}) {
  

    async function toggle() {
          const response = await fetch(`${URL_TODO_APP}/todos/${id}` , {
            method : "PUT",
            headers : {
              "Content-type" : "application/json",
            },
            body : JSON.stringify({
                value : completed ? false : true ,
            })
          });



         const data = await response.json();
         toggleTodo(id);
         //console.log(data);
    }
    

  return (
    <Pressable
    onPress = {toggle}
    style = {[styles.checkMark , {backgroundColor : completed === 0 ? "#e9e9ef" : "#dddd"}]}
    >
      {completed !== 0 ? <Entypo name='check' color= "green" size={30} style = {styles.checkIcon}/> : null }
    </Pressable>
  )
}


const styles = StyleSheet.create({
  checkMark: {
    width: 25,
    height: 25,
    borderRadius: 7,
  },
  checkIcon : {
    position : "absolute",
    top : -8,
    left : 0,
  }
})