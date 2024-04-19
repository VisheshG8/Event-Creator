import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  Image
} from 'react-native';
import React, {useContext, useState} from 'react';
//Snackbar
import Snackbar from 'react-native-snackbar';

//context API
import {AppwriteContext} from '../appwrite/AppwriteContext';

const Login = ({navigation}: any) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Login Success',
              duration: Snackbar.LENGTH_SHORT,
            });
            navigation.reset({index: 0, routes: [{ name: 'Home' }]})
          }

        })
        .catch(e => {
          console.log(e);
          setEmail('Incorrect email or password');
        });
    }
  };
  const handleGoogleLogin = (navigation:any) =>{
  appwrite
  .oAuthLogin(navigation)
  .then(response => {
    if (response!) {
      setIsLoggedIn(true);
      Snackbar.show({
        text: 'Login Success',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

  })
  .catch(e => {
    console.log(e);
    setEmail('Incorrect email or password');
  });

}
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Login to your account.</Text>
        <Text style={styles.headingText}>Please sign in to your account</Text>

        {/* Email */}
        <View>
          <Text style={styles.labelText}>Email Address</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Email"
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
        </View>

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Sign In</Text>
        </Pressable>

        
        <View style={styles.googleImageContainer}>
          <Image
          source={require('../assets/Separator.png')}
          resizeMode="contain"
        />
        </View>

        <View style={styles.googleImageContainer}>
        <Pressable onPress={() => handleGoogleLogin(navigation)}>
          <Image
          source={require('../assets/Glogo.png')}
          resizeMode="stretch"
        />
        </Pressable>
        </View>


        {/* Sign up navigation */}
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account?{'  '}
            <Text style={styles.signUpLabel}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  heading: {
    color: '#101010',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal:'9%'
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor:'#000000',
    borderWidth:0.2,
    padding: 10,
    height: 40,
    marginBottom:10,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    color: '#000000',
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#FE8C00',
    padding: 10,
    height: 45,
    alignSelf: 'center',
    borderRadius: 100,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  signUpContainer: {
    marginTop: 40,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#FE8C00',
  },
  labelText: {
    fontFamily:'Inter',
    marginHorizontal: '10%',
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
  },
  headingText: {
    marginHorizontal: '10%',
    color: '#878787',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 40,
  },
  googleImageContainer:{
    display:'flex',
    alignItems:'center',
    marginTop:40,
    width:'100%',
  }
});

export default Login;
