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

const Signup = ({navigation}: any) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSignup = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password !== repeatPassword) {
      setError('Passwords do not match');
    } else {
      const user = {
        email,
        password,
        name,
      };
      appwrite
        .createAccount(user)
        .then((response: any) => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Signup success',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(e => {
          console.log(e);
          setError(e.message);
        });
    }
  };

  const handleGoogleSignup = (navigation:any) =>{
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
        <Text style={styles.heading}>Create your new account</Text>
        <Text style={styles.headingText}>
          Create an account to start looking for the food you like
        </Text>

        {/* Email */}
        <View>
          <Text style={styles.labelText}>Email Address</Text>
          <TextInput
            value={email}
            keyboardType="email-address"
            onChangeText={text => {
              setError('');
              setEmail(text);
            }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Email"
            style={styles.input}
          />
        </View>

        {/* Name */}
        <View>
          <Text style={styles.labelText}>User Name</Text>
          <TextInput
            value={name}
            onChangeText={text => {
              setError('');
              setName(text);
            }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Name"
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            value={password}
            onChangeText={text => {
              setError('');
              setPassword(text);
            }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Repeat password */}
        <View>
          <Text style={styles.labelText}>Confirm Password</Text>
        <TextInput
          secureTextEntry
          value={repeatPassword}
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repeat Password"
          style={styles.input}
        />
        </View>

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Signup button */}
        <Pressable
          onPress={handleSignup}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Register</Text>
        </Pressable>

        <View style={styles.googleImageContainer}>
          <Image
          source={require('../assets/Separator.png')}
          resizeMode="contain"
        />
        </View>

        <View style={styles.googleImageContainer}>
        <Pressable onPress={()=> handleGoogleSignup(navigation)}>
          <Image
          source={require('../assets/Glogo.png')}
          resizeMode="stretch"
        />
        </Pressable>
        </View>

        {/* Login navigation */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.loginLabel}>Sign In</Text>
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
  labelText: {
    fontFamily:'Inter',
    marginHorizontal: '10%',
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  heading: {
    color: '#101010',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: '9%',
  },
  headingText: {
    marginHorizontal: '10%',
    color: '#878787',
    fontWeight: '500',
    fontSize: 14,
    marginBottom:30,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 0.2,
    padding: 10,
    height: 40,
    marginBottom: 10,
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
  loginContainer: {
    marginTop: 20,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#FE8C00',
  },
  googleImageContainer:{
    display:'flex',
    alignItems:'center',
    marginTop:40,
    width:'100%',
  }
});

export default Signup;
