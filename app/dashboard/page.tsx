"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ChefHat,
  Search,
  Heart,
  Clock,
  Star,
  ShoppingCart,
  User,
  Bell,
  Settings,
  LogOut,
  Utensils,
  TrendingUp,
  Award,
  Brain,
  ImageIcon,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Sample recommended foods data
const recommendedFoods = [
  {
    id: 1,
    name: "Diabetga mos salat",
    restaurant: "Sog'lom Ovqat",
    price: 25000,
    rating: 4.8,
    time: "20-30 min",
    image: "/healthy-salad.png",
    tags: ["Diabet uchun xavfsiz", "Kam uglevod", "Yuqori oqsil"],
    calories: 180,
    carbs: 12,
    protein: 15,
    fat: 8,
  },
  {
    id: 2,
    name: "Grilled tovuq ko'kragi",
    restaurant: "Fit Kitchen",
    price: 35000,
    rating: 4.9,
    time: "25-35 min",
    image: "/grilled-chicken.png",
    tags: ["Yuqori oqsil", "Kam yog'", "Gluten-free"],
    calories: 250,
    carbs: 5,
    protein: 45,
    fat: 6,
  },
  {
    id: 3,
    name: "Quinoa bowl",
    restaurant: "Green Life",
    price: 28000,
    rating: 4.7,
    time: "15-25 min",
    image: "/colorful-quinoa-bowl.png",
    tags: ["Vegan", "Gluten-free", "Superfood"],
    calories: 320,
    carbs: 45,
    protein: 12,
    fat: 10,
  },
  {
    id: 4,
    name: "Baliq bilan sabzavot",
    restaurant: "Ocean Fresh",
    price: 42000,
    rating: 4.6,
    time: "30-40 min",
    image: "/fish-and-vegetables.png",
    tags: ["Omega-3", "Kam kaloriya", "Yurak uchun foydali"],
    calories: 280,
    carbs: 15,
    protein: 35,
    fat: 12,
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<any[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("nutri_user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      // Redirect to onboarding if profile not completed
      if (parsedUser.isNewUser && !parsedUser.profileCompleted) {
        router.push("/onboarding")
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("nutri_user")
    toast({
      title: "Tizimdan chiqdingiz",
      description: "Xayr! Yana ko'rishguncha.",
    })
    router.push("/")
  }

  const addToCart = (food: any) => {
    setCart((prev) => [...prev, food])
    toast({
      title: "Savatga qo'shildi!",
      description: `${food.name} savatga qo'shildi.`,
    })
  }

  const getHealthScore = () => {
    if (!user?.healthProfile) return 85

    const conditions = user.healthProfile.healthConditions?.length || 0
    const allergies = user.healthProfile.allergies?.length || 0
    return Math.max(60, 100 - conditions * 5 - allergies * 3)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Nutri
              </span>
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Ovqat, restoran yoki taom qidiring..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Sog'lik darajasi: {getHealthScore()}%</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Health Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Sog'lik holati
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sog'lik darajasi</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {getHealthScore()}%
                      </Badge>
                    </div>

                    {user.healthProfile?.healthConditions?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Kasalliklar:</p>
                        <div className="flex flex-wrap gap-1">
                          {user.healthProfile.healthConditions.slice(0, 2).map((condition: string) => (
                            <Badge key={condition} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link href="/profile">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Settings className="w-4 h-4 mr-2" />
                        Profilni tahrirlash
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                    Bu hafta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Buyurtmalar</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sog'lom ovqatlar</span>
                      <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tejagan pul</span>
                      <span className="font-medium">45,000 so'm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* File Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <ImageIcon className="w-5 h-5 mr-2 text-purple-500" />
                    Fayllar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/gallery">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Galereyani ko'rish
                      </Button>
                    </Link>
                    <Link href="/upload">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Fayl yuklash
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Yutuq
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏆</div>
                    <p className="text-sm font-medium">Sog'lom ovqatlanish chempioni</p>
                    <p className="text-xs text-gray-500 mt-1">7 kun ketma-ket sog'lom ovqat buyurtma qildingiz!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Welcome Message */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Xush kelibsiz, {user.name}! 👋</h1>
                <p className="text-green-100">
                  Bugun sizga {recommendedFoods.length} ta sog'lom va xavfsiz ovqat tavsiya qilamiz. Sizning sog'lik
                  profilingizga mos keladi!
                </p>
              </div>

              {/* AI Recommendations */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Sizga tavsiya qilingan ovqatlar</h2>
                  <Badge className="bg-blue-100 text-blue-700">
                    <Brain className="w-4 h-4 mr-1" />
                    AI tavsiyasi
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedFoods.map((food) => (
                    <Card
                      key={food.id}
                      className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative">
                        <img
                          src={food.image || "/placeholder.svg"}
                          alt={food.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {food.rating}
                        </Badge>
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-bold text-lg">{food.name}</h3>
                            <p className="text-gray-600 text-sm">{food.restaurant}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {food.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div className="text-center">
                              <p className="font-medium">{food.calories}</p>
                              <p>Kaloriya</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">{food.protein}g</p>
                              <p>Oqsil</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">{food.carbs}g</p>
                              <p>Uglevod</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-4">
                              <span className="font-bold text-lg">{food.price.toLocaleString()} so'm</span>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="w-4 h-4 mr-1" />
                                {food.time}
                              </div>
                            </div>
                            <Button
                              onClick={() => addToCart(food)}
                              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Qo'shish
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategoriyalar</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Diabet uchun", icon: "🩺", color: "bg-red-100 text-red-700" },
                    { name: "Yurak uchun", icon: "❤️", color: "bg-pink-100 text-pink-700" },
                    { name: "Vegan", icon: "🌱", color: "bg-green-100 text-green-700" },
                    { name: "Keto", icon: "🥑", color: "bg-yellow-100 text-yellow-700" },
                    { name: "Gluten-free", icon: "🌾", color: "bg-orange-100 text-orange-700" },
                    { name: "Kam kaloriya", icon: "⚖️", color: "bg-blue-100 text-blue-700" },
                    { name: "Yuqori oqsil", icon: "💪", color: "bg-purple-100 text-purple-700" },
                    { name: "Shirinliklar", icon: "🍰", color: "bg-indigo-100 text-indigo-700" },
                  ].map((category, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <Badge className={`${category.color} text-xs`}>{category.name}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">So'nggi buyurtmalar</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sog'lom salat",
                      restaurant: "Green Kitchen",
                      date: "2024-01-15",
                      status: "Yetkazildi",
                      price: 25000,
                    },
                    {
                      name: "Grilled tovuq",
                      restaurant: "Fit Food",
                      date: "2024-01-14",
                      status: "Yetkazildi",
                      price: 35000,
                    },
                    {
                      name: "Quinoa bowl",
                      restaurant: "Healthy Life",
                      date: "2024-01-13",
                      status: "Yetkazildi",
                      price: 28000,
                    },
                  ].map((order, index) => (
                    <Card key={index} className="border hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                              <Utensils className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{order.name}</h3>
                              <p className="text-sm text-gray-600">
                                {order.restaurant} • {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{order.price.toLocaleString()} so'm</p>
                            <Badge variant="outline" className="text-xs text-green-600">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Link href="/orders">
                    <Button variant="outline">Barcha buyurtmalarni ko'rish</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
