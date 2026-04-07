import { Ionicons } from "@expo/vector-icons";
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

const STATUS_FILTERS = ["Todos", "Confirmados", "Pendentes", "Cancelados"];

const APPOINTMENTS = [
  {
    id: "b1",
    professional: "Carlos Silva",
    specialty: "Barbeiro",
    service: "Corte + Barba",
    date: "4 de mar. de 2026",
    time: "14:00",
    price: "R$ 60",
    status: "Confirmado",
  },
  {
    id: "b2",
    professional: "Mariana Santos",
    specialty: "Manicure",
    service: "Unhas Decoradas",
    date: "7 de mar. de 2026",
    time: "10:00",
    price: "R$ 80",
    status: "Pendente",
  },
];

interface StatusConfig {
  bg: string;
  text: string;
  icon: string;
  iconColor: string;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, StatusConfig> = {
    Confirmado: {
      bg: "#DCFCE7",
      text: "#16A34A",
      icon: "checkmark-circle-outline",
      iconColor: "#16A34A",
    },
    Pendente: {
      bg: "#FEF9C3",
      text: "#CA8A04",
      icon: "time-outline",
      iconColor: "#CA8A04",
    },
    Cancelado: {
      bg: "#FEE2E2",
      text: "#DC2626",
      icon: "close-circle-outline",
      iconColor: "#DC2626",
    },
  };
  const c = config[status] ?? config["Pendente"];
  return (
    <View style={[styles.statusBadge, { backgroundColor: c.bg }]}>
      <Ionicons name={c.icon as any} size={13} color={c.iconColor} />
      <Text style={[styles.statusText, { color: c.text }]}>{status}</Text>
    </View>
  );
}

export default function MyAppointmentsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const [filter, setFilter] = useState("Todos");

  const filtered = APPOINTMENTS.filter((a) => {
    if (filter === "Todos") return true;
    if (filter === "Confirmados") return a.status === "Confirmado";
    if (filter === "Pendentes") return a.status === "Pendente";
    if (filter === "Cancelados") return a.status === "Cancelado";
    return true;
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Top Bar */}
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            Meus Agendamentos
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.subtext }]}>
            Gerencie seus compromissos
          </Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterChip,
              { backgroundColor: colors.card, borderColor: colors.border },
              filter === f && styles.filterChipActive,
            ]}
            onPress={() => setFilter(f)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                { color: colors.subtext },
                filter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {filtered.map((apt) => (
          <View
            key={apt.id}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <StatusBadge status={apt.status} />
              <Text style={[styles.aptId, { color: colors.subtext }]}>
                ID: {apt.id}
              </Text>
            </View>

            <Text style={[styles.proName, { color: colors.text }]}>
              {apt.professional}
            </Text>
            <Text style={[styles.proSpecialty, { color: colors.subtext }]}>
              {apt.specialty}
            </Text>

            {/* Service Box */}
            <View
              style={[
                styles.serviceBox,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={[styles.serviceLabel, { color: colors.subtext }]}>
                Serviço
              </Text>
              <Text style={[styles.serviceName, { color: colors.text }]}>
                {apt.service}
              </Text>
            </View>

            {/* Date & Time */}
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
            <View style={styles.dateTimeRow}>
              <View style={styles.metaItem}>
                <Ionicons
                  name="calendar-outline"
                  size={15}
                  color={colors.subtext}
                />
                <Text style={[styles.metaText, { color: colors.text }]}>
                  {apt.date}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color={colors.subtext}
                />
                <Text style={[styles.metaText, { color: colors.text }]}>
                  {apt.time}
                </Text>
              </View>
            </View>
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            {/* Footer */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={[styles.valorLabel, { color: colors.subtext }]}>
                  Valor
                </Text>
                <Text style={[styles.valorText, { color: colors.primary }]}>
                  {apt.price}
                </Text>
              </View>
              <View style={styles.footerActions}>
                {apt.status === "Confirmado" && (
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                )}
                {apt.status === "Pendente" && (
                  <>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.confirmBtnText}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelBtn}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.cancelBtnText}>Recusar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 13,
    marginTop: 1,
  },
  filtersScroll: {
    maxHeight: 52,
    marginBottom: 4,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1.5,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#6C5CE7",
    borderColor: "#6C5CE7",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#fff",
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  aptId: {
    fontSize: 12,
    fontWeight: "500",
  },
  proName: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  proSpecialty: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 12,
  },
  serviceBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  serviceLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valorLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 2,
  },
  valorText: {
    fontSize: 18,
    fontWeight: "700",
  },
  footerActions: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#FF6B6B",
  },
  cancelBtnText: {
    color: "#FF6B6B",
    fontSize: 13,
    fontWeight: "600",
  },
  confirmBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#6C5CE7",
  },
  confirmBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
