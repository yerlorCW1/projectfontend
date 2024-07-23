import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

const Signup = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !phoneNumber) {
      Alert.alert("Validation Error", "Please enter email, password, and phone number");
      return;
    }

    try {
      const response = await fetch("http://172.20.10.2:3000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phoneNumber, password }),
      });

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (response.ok) {
        const result = JSON.parse(responseText);
        console.log("Response:", result);
        navigation.navigate("Tabs");
      } else {
        const result = JSON.parse(responseText);
        Alert.alert("Signup Failed", result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Signup Failed", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          style={{ padding: 20 }}
        >
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: COLORS.primary }}>
              Create Account
            </Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.gray}
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="+856"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                style={styles.countryCodeInput}
              />
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.gray}
                secureTextEntry={isPasswordShow}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={isPasswordShow ? "eye-off" : "eye"}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text style={{ color: COLORS.gray }}>
              I agree to the terms and conditions
            </Text>
          </View>

          <Button
            title="Sign Up"
            onPress={handleSignup}
            color={COLORS.primary}
          />

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={{ color: COLORS.gray }}>Or Sign up with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={styles.socialButton}
            >
              <Image
                source={{
                  uri: "https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png",
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={styles.socialButton}
            >
              <Image
                source={{
                  uri: "https://yt3.googleusercontent.com/viNp17XpEF-AwWwOZSj_TvgobO1CGmUUgcTtQoAG40YaYctYMoUqaRup0rTxxxfQvWw3MvhXesw=s900-c-k-c0x00ffffff-no-rj",
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={{ color: COLORS.gray }}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.primary,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: COLORS.darkGray,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  countryCodeInput: {
    width: "20%",
    borderRightWidth: 1,
    borderRightColor: COLORS.primary,
    height: "100%",
    paddingHorizontal: 12,
    color: COLORS.darkGray,
  },
  passwordContainer: {
    width: "100%",
    height: 48,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
  },
  socialIcon: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  socialText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6,
  },
};

export default Signup;
