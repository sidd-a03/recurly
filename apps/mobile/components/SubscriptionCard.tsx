import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { currencyFormat, formatDate, formatStatusLabel } from '@/lib/utils'
import { cn } from '@/lib/cn'

const SubscriptionCard = ({ name, price, currency, icon, billing, color, category, plan, renewalDate, onPress, expanded, paymentMethod, startDate, status }: SubscriptionCardProps) => {

  const fallback = "Not provided";

  return (
    <Pressable 
     onPress={onPress}
     className={cn('sub-card', expanded ? 'bg-subscription' : 'bg-card')} 
     style={color && !expanded ? { backgroundColor: color } : undefined}>
      <View className='sub-head'>
        <View className='sub-main'>
          <Image source={icon} className='sub-icon' />
          <View className='sub-copy'>
            <Text className='sub-title' numberOfLines={1}>{name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className='sub-meta'>
                {category?.trim() || plan?.trim() || (renewalDate ? formatDate(renewalDate, "DD/MM") : "")}
            </Text>
          </View>
        </View>

        <View className='sub-price-box'>
            <Text className='sub-price'>{currencyFormat(price, currency)}</Text>
            <Text className='sub-billing'>{billing}</Text>
        </View>
      </View>

      {expanded && (
        <View className='sub-body'>
            <View className='sub-details'>
                <View className='sub-row'>
                    <View className='sub-row-copy'>
                        <Text className='sub-label'>Payment</Text>
                        <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                            {paymentMethod?.trim() ?? fallback}
                        </Text>
                    </View>
                </View>
                <View className='sub-row'>
                    <View className='sub-row-copy'>
                        <Text className='sub-label'>Category</Text>
                        <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                            {category?.trim() ?? fallback}
                        </Text>
                    </View>
                </View>
                <View className='sub-row'>
                    <View className='sub-row-copy'>
                        <Text className='sub-label'>Started</Text>
                        <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                            {startDate ? formatDate(startDate, "DD/MM") : fallback}
                        </Text>
                    </View>
                </View>
                <View className='sub-row'>
                    <View className='sub-row-copy'>
                        <Text className='sub-label'>Next Renewal</Text>
                        <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                            {renewalDate ? formatDate(renewalDate, "DD/MM") : fallback}
                        </Text>
                    </View>
                </View>
                <View className='sub-row'>
                    <View className='sub-row-copy'>
                        <Text className='sub-label'>Status</Text>
                        <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                            {status ? formatStatusLabel(status) : fallback}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
      )}
    </Pressable>
  )
}

export default SubscriptionCard     