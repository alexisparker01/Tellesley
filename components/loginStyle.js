
import { StyleSheet} from 'react-native';

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
        buttonText: {
            color: 'white',
        },
        subuttons: {
         backgroundColor: "#919191",
         color:'#000000',
         marginBottom: 15,
         marginTop: 0,
         marginLeft: 0,
         marginRight: 0,
         padding: 5,
         //width: '50%',
      },
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(6,12,51)",
        flexDirection: "row",
    },
    textFields: {
        marginBottom: 15,
        height: 30,
        borderColor: 'rgb(207, 208, 210)',
        borderWidth: 1
    },
    view: {
       width: "70%",
    },
    appTitle: {
        margin: 24,
       fontSize: 50,
       fontFamily: "Times New Roman",
       textAlign: 'center',
       color: "white",
     },
     littleText:  {
         color: "white",
         fontFamily: "Times New Roman",
         fontSize: 20,
     },
     accentText: {
         color: 'rgb(6,12,51)',
         textAlign: 'center'
     }
})

//////////////////////////////////////////////////////////////////////////////////////////
//SIGN UP PAGE STYLES
 export const signUpStyle = StyleSheet.create({
  content: {
        justifyContent: "center",
        alignItems: "center",
        height: "200%",
        //flexDirections: "row",
  }, 
  TextInputStyle: {
      backgroundColor: "transparent",
      opacity: 100,
      color: "black",


  },
  signUpBtn: {
    backgroundColor: "rgb(8,58,129)",
    height: 50,
    marginBottom: 15,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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
      //flexDirections: "row",
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