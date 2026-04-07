import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type UserType = "Cliente" | "Profissional";

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();

  const [userType, setUserType] = useState<UserType>("Cliente");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleCreateAccount = () => {
    // Validação básica
    if (!name.trim()) {
      alert("Por favor, insira seu nome completo");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      alert("Por favor, insira um email válido");
      return;
    }
    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    // Se passou na validação, criar conta (por enquanto apenas mostra sucesso)
    alert(`Conta criada com sucesso!\nUsuário: ${userType}\nEmail: ${email}`);
    // TODO: Integrar com API de registro
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fff" }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color={colors.text} />
            <Text style={[styles.backText, { color: colors.text }]}>
              Voltar
            </Text>
          </TouchableOpacity>

          {/* Logo & Title */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Ionicons name="calendar" size={36} color="#fff" />
            </View>
            <Text style={[styles.appName, { color: colors.text }]}>
              AgendaFácil
            </Text>
            <Text style={[styles.appTagline, { color: colors.subtext }]}>
              Agende serviços de forma rápida e prática
            </Text>
          </View>

          {/* Type Toggle */}
          <View
            style={[styles.typeToggle, { backgroundColor: colors.background }]}
          >
            {(["Cliente", "Profissional"] as UserType[]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeOption,
                  userType === type && styles.typeOptionActive,
                ]}
                onPress={() => setUserType(type)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.typeText,
                    { color: colors.subtext },
                    userType === type && styles.typeTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Nome */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Nome completo
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={colors.subtext}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Seu nome"
                  placeholderTextColor={colors.subtext}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                E-mail
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={colors.subtext}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="seu@email.com"
                  placeholderTextColor={colors.subtext}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Senha */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Senha
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={colors.subtext}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="•••••"
                  placeholderTextColor={colors.subtext}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPass ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.subtext}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirmar senha */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Confirmar senha
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={colors.subtext}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="•••••"
                  placeholderTextColor={colors.subtext}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPass}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPass(!showConfirmPass)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showConfirmPass ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.subtext}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.createBtn}
            activeOpacity={0.85}
            onPress={handleCreateAccount}
          >
            <Text style={styles.createBtnText}>Criar conta</Text>
          </TouchableOpacity>

          {/* Login link */}
          <View style={styles.loginRow}>
            <Text style={[styles.loginText, { color: colors.subtext }]}>
              Já tem uma conta?
            </Text>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Fazer login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
  },
  logoSection: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#6C5CE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  typeToggle: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  typeOptionActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  typeTextActive: {
    color: "#6C5CE7",
  },
  form: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  createBtn: {
    marginHorizontal: 20,
    backgroundColor: "#6C5CE7",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  createBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 4,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
