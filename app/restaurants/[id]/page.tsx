"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChefHat,
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Phone,
  Heart,
  Shield,
  ShoppingCart,
  Plus,
  Minus,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Sample restaurant data
const restaurantData = {
  1: {
    name: "Sog'lom Ovqat",
    cuisine: "Sog'lom ovqatlar",
    rating: 4.8,
    reviewCount: 324,
    deliveryTime: "20-30 min",
    deliveryFee: 5000,
    image: "/restaurant-healthy.png",
    tags: ["Diabet uchun", "Organic", "Kam kaloriya"],
    healthScore: 95,
    distance: "1.2 km",
    phone: "+998 90 123 45 67",
    address: "Toshkent sh., Yunusobod t., Abdulla Qodiriy ko'chasi 12",
    description:
      "Diabetga chalingan va sog'lom turmush tarzini qo'llab-quvvatlovchi odamlar uchun maxsus tayyorlangan ovqatlar. Barcha taomlarimiz dietologlar nazorati ostida tayyorlanadi.",
    menu: [
      {
        id: 1,
        name: "Diabetga mos quinoa salat",
        description: "Quinoa, yangi sabzavot, yong'oq va olive oil bilan",
        price: 28000,
        image: "/healthy-salad.png",
        category: "Salatlar",
        calories: 220,
        carbs: 15,
        protein: 18,
        fat: 8,
        tags: ["Diabet uchun xavfsiz", "Gluten-free", "Yuqori tolali"],
        aiRecommended: true,
        safetyScore: 95,
      },
      {
        id: 2,
        name: "Grilled tovuq ko'kragi",
        description: "Bug'da pishirilgan sabzavot bilan birga",
        price: 35000,
        image: "/grilled-chicken.png",
        category: "Asosiy taomlar",
        calories: 280,
        carbs: 8,
        protein: 42,
        fat: 9,
        tags: ["Yuqori oqsil", "Kam uglevod", "Keto-friendly"],
        aiRecommended: true,
        safetyScore: 98,
      },
      {
        id: 3,
        name: "Avokado smoothie",
        description: "Avokado, ispanaq, limon va chia urug'i bilan",
        price: 18000,
        image: "/green-smoothie.png",
        category: "Ichimliklar",
        calories: 180,
        carbs: 12,
        protein: 6,
        fat: 14,
        tags: ["Detoks", "Vitamin boy", "Sog'lom yog'lar"],
        aiRecommended: false,
        safetyScore: 88,
      },
    ],
  },
}

export default function RestaurantDetailPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]
  const [cart, setCart] = useState<any[]>([])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const { toast } = useToast()

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Restoran topilmadi</h2>
          <Link href="/restaurants">
            <Button>Restoranlar ro'yxatiga qaytish</Button>
          </Link>
        </div>
      </div>
    )
  }

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }))
  }

  const addToCart = (item: any) => {
    const quantity = quantities[item.id] || 1
    setCart((prev) => [...prev, { ...item, quantity }])
    toast({
      title: "Savatga qo'shildi!",
      description: `${item.name} (${quantity}x) savatga qo'shildi.`,
    })
  }

  const categories = [...new Set(restaurant.menu.map((item) => item.category))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/restaurants">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Orqaga
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Nutri
                </span>
              </div>
            </div>

            <Button className="relative bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Savat
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Restaurant Header */}
          <div className="mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img
                src={restaurant.image || "/placeholder.svg?height=300&width=800&text=Restaurant"}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge className="bg-green-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Nutri Partner
                    </Badge>
                    <Badge className="bg-blue-500 text-white">
                      <Heart className="w-3 h-3 mr-1" />
                      {restaurant.healthScore}% sog'lom
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                  <p className="text-lg opacity-90">{restaurant.cuisine}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-bold">{restaurant.rating}</span>
                    <span className="text-gray-600 ml-1">({restaurant.reviewCount} sharh)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.distance}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-600 mb-4">{restaurant.description}</p>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Aloqa ma'lumotlari</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3 text-gray-400" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                      <span className="text-sm">{restaurant.address}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Yetkazib berish:{" "}
                        <span className="font-medium">{restaurant.deliveryFee.toLocaleString()} so'm</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Menu */}
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {restaurant.menu
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <Card
                        key={item.id}
                        className={`border-2 transition-all duration-300 hover:shadow-lg ${
                          item.aiRecommended ? "border-green-200 bg-green-50" : "hover:border-gray-200"
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg?height=200&width=400&text=Food"}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {item.aiRecommended && (
                            <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                              <Brain className="w-3 h-3 mr-1" />
                              AI tavsiya
                            </Badge>
                          )}
                          <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
                            <Shield className="w-3 h-3 mr-1" />
                            {item.safetyScore}%
                          </Badge>
                        </div>

                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-bold text-lg">{item.name}</h3>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div className="text-center">
                                <p className="font-medium">{item.calories}</p>
                                <p>Kaloriya</p>
                              </div>
                              <div className="text-center">
                                <p className="font-medium">{item.protein}g</p>
                                <p>Oqsil</p>
                              </div>
                              <div className="text-center">
                                <p className="font-medium">{item.carbs}g</p>
                                <p>Uglevod</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <span className="font-bold text-lg">{item.price.toLocaleString()} so'm</span>

                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={(quantities[item.id] || 0) <= 0}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center">{quantities[item.id] || 1}</span>
                                  <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>

                                <Button
                                  onClick={() => addToCart(item)}
                                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Qo'shish
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
