import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const Login = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(true);
 // const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        navigation.navigate('tabs');
      } else {
        Alert.alert('Login Failed', result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoidView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.gray}
                keyboardType="email-address"
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={isPasswordShow}
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordShow(!isPasswordShow)}
                  style={styles.eyeIcon}
                >
                  {isPasswordShow ? (
                    <Ionicons name="eye-off" size={24} color={COLORS.gray} />
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.gray} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or Login with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity
                onPress={() => console.log('Facebook Pressed')}
                style={[styles.socialButton, { backgroundColor: '#3b5998' }]}
              >
                <Image
                  source={{
                    uri: 'https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png',
                  }}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => console.log('Google Pressed')}
                style={[styles.socialButton, { backgroundColor: '#db4437' }]}
              >
                <Image
                  source={{
                    uri: 'https://yt3.googleusercontent.com/viNp17XpEF-AwWwOZSj_TvgobO1CGmUUgcTtQoAG40YaYctYMoUqaRup0rTxxxfQvWw3MvhXesw=s900-c-k-c0x00ffffff-no-rj',
                  }}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={styles.registerLink}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color to black
  },
  avoidView: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: 'white',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  dividerText: {
    color: 'white',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    elevation: 2, // Add shadow effect
  },
  socialIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  socialText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  registerText: {
    fontSize: 16,
    color: 'white',
  },
  registerLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default Login;
