import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ProfessionalCard } from "@/components/professional-card";
import { CATEGORIES, PROFESSIONALS } from "@/constants/data";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ClientHomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = PROFESSIONALS.filter((p) => {
    const matchCat =
      selectedCategory === "Todos" || p.category === selectedCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Olá, Cliente!
          </Text>
          <Text style={[styles.subGreeting, { color: colors.subtext }]}>
            Encontre seu profissional
          </Text>

          {/* Search Bar */}
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.subtext}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar profissional ou serviço..."
              placeholderTextColor={colors.subtext}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  selectedCategory === cat && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: colors.subtext },
                    selectedCategory === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Professionals List */}
        <View style={styles.listSection}>
          {filtered.map((pro) => (
            <ProfessionalCard key={pro.id} professional={pro} colors={colors} />
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
  headerCard: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 100,
    borderWidth: 1.5,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: "#6C5CE7",
    borderColor: "#6C5CE7",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#fff",
  },
  listSection: {
    padding: 16,
    gap: 12,
  },
});
