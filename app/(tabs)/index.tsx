import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const WEEK_DAYS = [
  { label: "QUA.", day: 4 },
  { label: "QUI.", day: 5 },
  { label: "SEX.", day: 6 },
  { label: "SÁB.", day: 7 },
  { label: "DOM.", day: 8 },
];

const APPOINTMENTS_TODAY = [
  {
    id: "b1",
    client: "Cliente",
    service: "Corte + Barba",
    time: "14:00",
    price: "R$ 60",
    status: "Confirmado",
  },
];

export default function ProfessionalDashboard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(4);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Card with Gradient */}
        <LinearGradient
          colors={["#5C6BC0", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          {/* Top Row */}
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.helloText}>Olá, Carlos!</Text>
              <Text style={styles.roleText}>Barbeiro Profissional</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Hoje</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>13</Text>
              <Text style={styles.statLabel}>Esta semana</Text>
            </View>
            <View style={[styles.statCard, styles.statCardHighlight]}>
              <Text style={styles.statValueHighlight}>R$ 5</Text>
              <Text style={styles.statLabelHighlight}>Receita</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Agenda do dia */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Agenda do dia
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {WEEK_DAYS.map((d) => (
              <TouchableOpacity
                key={d.day}
                style={[
                  styles.dayCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedDay === d.day && styles.dayCardActive,
                ]}
                onPress={() => setSelectedDay(d.day)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    { color: colors.subtext },
                    selectedDay === d.day && styles.dayLabelActive,
                  ]}
                >
                  {d.label}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    { color: colors.text },
                    selectedDay === d.day && styles.dayNumberActive,
                  ]}
                >
                  {d.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            activeOpacity={0.8}
          >
            <Ionicons name="time-outline" size={22} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              Definir Horários
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/new-appointment")}
          >
            <Ionicons name="add" size={22} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              Novo Agendamento
            </Text>
          </TouchableOpacity>
        </View>

        {/* Agendamentos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Agendamentos ({APPOINTMENTS_TODAY.length})
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/calendar")}
              activeOpacity={0.7}
            >
              <Text style={[styles.verTodos, { color: colors.text }]}>
                Ver todos
              </Text>
            </TouchableOpacity>
          </View>

          {APPOINTMENTS_TODAY.map((apt) => (
            <View
              key={apt.id}
              style={[
                styles.aptCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              {/* Client Row */}
              <View style={styles.aptClientRow}>
                <View style={[styles.avatarCircle, { backgroundColor: "#E8E8F0" }]}>
                  <Ionicons name="person-outline" size={20} color="#6C5CE7" />
                </View>
                <View style={styles.aptClientInfo}>
                  <Text style={[styles.aptClientName, { color: colors.text }]}>
                    {apt.client}
                  </Text>
                  <Text style={[styles.aptService, { color: colors.subtext }]}>
                    {apt.service}
                  </Text>
                </View>
                <View style={styles.confirmedBadge}>
                  <Text style={styles.confirmedBadgeText}>{apt.status}</Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Time & Price */}
              <View style={styles.aptFooter}>
                <View style={styles.aptTimeRow}>
                  <Ionicons name="time-outline" size={14} color={colors.subtext} />
                  <Text style={[styles.aptTime, { color: colors.subtext }]}>
                    {apt.time}
                  </Text>
                </View>
                <Text style={[styles.aptPrice, { color: colors.primary }]}>
                  {apt.price}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    margin: 16,
    borderRadius: 24,
    padding: 20,
    paddingBottom: 24,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  helloText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  roleText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },
  statCardHighlight: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  statValueHighlight: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  statLabelHighlight: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  verTodos: {
    fontSize: 14,
    fontWeight: "600",
  },
  dayCard: {
    width: 64,
    height: 72,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    gap: 4,
  },
  dayCardActive: {
    borderColor: "#6C5CE7",
    backgroundColor: "#fff",
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: "600",
  },
  dayLabelActive: {
    color: "#6C5CE7",
  },
  dayNumber: {
    fontSize: 22,
    fontWeight: "800",
  },
  dayNumberActive: {
    color: "#6C5CE7",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  aptCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aptClientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  aptClientInfo: {
    flex: 1,
  },
  aptClientName: {
    fontSize: 15,
    fontWeight: "700",
  },
  aptService: {
    fontSize: 13,
    marginTop: 2,
  },
  confirmedBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  confirmedBadgeText: {
    color: "#16A34A",
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginBottom: 12,
  },
  aptFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aptTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  aptTime: {
    fontSize: 13,
    fontWeight: "500",
  },
  aptPrice: {
    fontSize: 15,
    fontWeight: "700",
  },
});
