import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Empty notifications screen
export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.topBar}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Notificações
        </Text>
      </View>
      <View style={styles.emptyState}>
        <View style={[styles.emptyIcon, { backgroundColor: colors.card }]}>
          <Ionicons
            name="notifications-outline"
            size={40}
            color={colors.subtext}
          />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Nenhuma notificação
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.subtext }]}>
          Você não tem notificações no momento
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
