import * as  React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { CheckMark } from '../CkeckMark';
import { Feather , Fontisto} from '@expo/vector-icons';
import { URL_TODO_APP } from '@env';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import  SharedTodoModalContent  from '../SharedTodoModalContent/SharedTodoModalContent';
import TodoModalContent from '../TodoModalContent/TodoModalContent';
import { styles } from './task.styles';






export function Task({
    id,
    title,
    shared_with_id,
    completed,
    clearTodo,
    toggleTodo,
}) {

  const [isDelectedActive, setIsDelectedActive] = React.useState(false);

  const bottomSheetModalRef = React.useRef(null);
  const sharedBottomSheetRef = React.useRef(null);
  const snapPoints = ["25%" , "48%" , "75%"];
  const snapPointsShared = ["40%"];  


  function handlePresentModal(){
    bottomSheetModalRef.current?.present();
  }

  function handlePresentShared(){
     sharedBottomSheetRef.current?.present();
  }

  async function deleteTodo(){
    const response = await fetch(`${URL_TODO_APP}/todos/${id}` , {
      method : "DELETE", 
    });
    clearTodo(id);
    console.log(response.status);
  }
  return (
   <TouchableOpacity
   onLongPress = {() => setIsDelectedActive(true)}
   onPress = {() => setIsDelectedActive(false)}
   activeOpacity = {.8}
   style = {styles.container}
   >
    <View style = {styles.containerTextCheckBox}>
        <CheckMark id = {id} completed={completed} toggleTodo={toggleTodo}/>
        <Text style = {styles.text}>{title}</Text>
    </View>
     {
      shared_with_id !== null ? (
        <Feather 
        onPress={handlePresentShared}
        name = "users"
        size = {20}
        color = '#383839'
        />
      ):(
        <Feather 
        onPress={handlePresentModal}
        name = "share"
        size = {20}
        color = '#383839'
        />
      )
     }

     {isDelectedActive && (
      <Pressable onPress = {deleteTodo} style = { styles.deleteButton }>
        <Fontisto name='close-a' size={10} color= "#fff"/>
      </Pressable>
     )}

     <BottomSheetModal
     ref = {sharedBottomSheetRef}
     snapPoints = {snapPointsShared}
     backgroundStyle = {{ borderRadius : 50 , borderWidth : .5}}
     >
   <SharedTodoModalContent 
   id={id}
   title={title}
   shared_with_id={shared_with_id}
   completed={completed}
   />
     </BottomSheetModal>

     <BottomSheetModal
     ref = {bottomSheetModalRef}
     index = {2}
     snapPoints = {snapPoints}
     backgroundStyle={{ borderRadius: 50, borderWidth: .5 }}
     >
     <TodoModalContent id={id} title={title}/>
     </BottomSheetModal>

   </TouchableOpacity>
  )
}


