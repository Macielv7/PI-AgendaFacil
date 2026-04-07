import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  tags: string[];
  image: string;
  category: string;
}

interface ProfessionalCardProps {
  professional: Professional;
  colors: {
    text: string;
    background: string;
    card: string;
    subtext: string;
    primary: string;
    border: string;
  };
  onPress?: () => void;
}

export function ProfessionalCard({
  professional: pro,
  colors,
  onPress,
}: ProfessionalCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.proCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.proCardTop}>
        <Image source={{ uri: pro.image }} style={styles.proImage} />
        <View style={styles.proInfo}>
          <View style={styles.proNameRow}>
            <Text style={[styles.proName, { color: colors.text }]}>
              {pro.name}
            </Text>
            <View style={styles.priceBlock}>
              <Text style={[styles.fromLabel, { color: colors.subtext }]}>
                A partir de
              </Text>
              <Text style={[styles.priceText, { color: colors.primary }]}>
                {pro.price}
              </Text>
            </View>
          </View>
          <Text style={[styles.proSpecialty, { color: colors.subtext }]}>
            {pro.specialty}
          </Text>
          <View style={styles.proMeta}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={[styles.proRating, { color: colors.text }]}>
              {" "}
              {pro.rating} ({pro.reviews}){"  "}
            </Text>
            <Ionicons name="time-outline" size={14} color={colors.subtext} />
            <Text style={[styles.proDuration, { color: colors.subtext }]}>
              {"  "}
              {pro.duration}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {pro.tags.map((tag) => (
          <View
            key={tag}
            style={[
              styles.tag,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
          </View>
        ))}
      </ScrollView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  proCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  proCardTop: {
    flexDirection: "row",
    gap: 12,
  },
  proImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  proInfo: {
    flex: 1,
  },
  proNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  proName: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    letterSpacing: -0.3,
  },
  priceBlock: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  fromLabel: {
    fontSize: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
  },
  proSpecialty: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 8,
  },
  proMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  proRating: {
    fontSize: 13,
    fontWeight: "500",
  },
  proDuration: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
