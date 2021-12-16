
import {StyleSheet} from 'react-native';

//////////////////////////////////////////////////////////////////////////////////////////
//LOG IN PAGE STYLES
export const loginStyle = StyleSheet.create({
        buttons: {
           backgroundColor: "rgb(8,58,129)",
           marginBottom: 15,
           marginTop: 0,
           marginLeft: 0,
           marginRight: 0,
           padding: 5,
        },
        subuttons: {
         backgroundColor: "#919191",
         marginBottom: 15,
         marginTop: 0,
         marginLeft: 0,
         marginRight: 0,
         padding: 5,
         //width: '50%',
      },
      buttonText: {
         color: "white",
      },
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "rgb(6,12,51)",
    },
    textFields: {
        marginBottom: 15,
        height: 30,
        borderColor: 'rgb(207, 208, 210)',
        borderWidth: 1
    },
    view: {
       width: "80%",
    },
    appTitle: {
        margin: 24,
       fontSize: 50,
       fontFamily: "Times New Roman",
       textAlign: 'center',
       color: "white",
     },
     text1: {
         color: 'rgb(6,12,51)',
         textAlign: 'center',
         fontSize: 13,
         textTransform: 'uppercase',
     },
     text2: {
      color: 'rgb(6,12,51)',
      textAlign: 'center',
      fontSize: 13,
     }
})

//////////////////////////////////////////////////////////////////////////////////////////
//SIGN UP PAGE STYLES
 export const signUpStyle = StyleSheet.create({
  content: {
        justifyContent: "center",
        alignItems: "center",
        height: "200%",
  }, 
  TextInputStyle: {
      backgroundColor: "transparent",
      opacity: 100,
      color: "black",


  }
}) 

//////////////////////////////////////////////////////////////////////////////////////////
//EDIT PROFILE STYLES
export const editProfileStyle = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#002776',
     borderWidth: 1
  },
  button: {
     backgroundColor: '#002776',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  },
  
  hidden: {
     opacity: 0, height: 0
  },
  pageTitle: {
    margin: 24,
   fontSize: 50,
   fontFamily: "Times New Roman",
   textAlign: 'center',
   color: "rgb(8,58,129)",
 },
})

//////////////////////////////////////////////////////////////////////////
/* make post style */

export const makePostStyle = StyleSheet.create({
   content: {
      justifyContent: "center",
      alignItems: "center",
      height: "200%",
}, 
textInputArea: {
   backgroundColor: "white",
   fontSize: 20,
   borderRadius: 1,
   borderColor: "black",
},
composeButton: {
   backgroundColor: '#002776',
   padding: 10,
   margin: 15,
   height: 40,
},
button:{
   color: 'white',
},
text: {
   fontSize:50,
   color:'black',
},
title: {
  fontSize:50,
   color:'black',
}
})