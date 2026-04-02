import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { currencyFormat, formatDate } from "@/lib/utils";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";
import { useUser } from "@clerk/expo";

const SafeAreaView = styled(RNSafeAreaView)

export default function Index() {

  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null)
  const { user } = useUser();

   const displayName = user?.firstName || user?.fullName || user?.emailAddresses[0]?.emailAddress || 'User';

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View className="home-header">
                <View className="home-user">
                  <Image
                    source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                    className="home-avatar"
                  />
                  <Text className="home-user-name">{displayName}</Text>
                </View>
                <Image source={icons.add} className="home-add-icon" />
              </View>

              <View className="home-balance-card">
                <Text className="home-balance-label">Balance</Text>
                <View className="home-balance-row">
                  <Text className="home-balance-amount">{currencyFormat(HOME_BALANCE.amount)}</Text>
                  <Text className="home-balance-date">{formatDate(HOME_BALANCE.nextRenewalDate, "MM/DD")}</Text>
                </View>
              </View>

              <View className="mb-5">
                <ListHeading title="Upcoming" />
                <FlatList 
                  data={UPCOMING_SUBSCRIPTIONS}
                  renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<Text className="home-empty-state">No upcoming subscriptions yet.</Text>}
                />
              </View>

              <ListHeading title="All Subscriptions" />
            </>
          )}
          data={HOME_SUBSCRIPTIONS}
          renderItem={({ item }) => (
            <SubscriptionCard 
              expanded={expandedSubscriptionId === item.id} 
              onPress={() => setExpandedSubscriptionId((currentId) => currentId === item.id ? null : item.id)} {...item}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          extraData={expandedSubscriptionId}
          contentContainerClassName="pb-20"
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListEmptyComponent={<Text className="home-empty-state">No subscriptions yet.</Text>}
        />
      <StatusBar style="dark" />
    </SafeAreaView>
  );  
}
