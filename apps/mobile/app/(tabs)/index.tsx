import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView)

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-7xl font-sans-extrabold">Home</Text>
      <Link href="/onboarding" className="mt-4 font-sans-bold rounded-lg bg-primary p-4 text-white">Onboarding</Link>
      <Link href="/(auth)/sign-in" className="mt-4 font-sans-bold rounded-lg bg-primary p-4 text-white">Sign In</Link>
      <Link href="/(auth)/sign-up" className="mt-4 font-sans-bold rounded-lg bg-primary p-4 text-white">Create Account</Link>
    </SafeAreaView>
  );
}
