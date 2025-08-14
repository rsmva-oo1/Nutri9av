"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, ArrowLeft, Clock, CheckCircle, Truck, Star, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Sample orders data
const sampleOrders = [
  {
    id: 1,
    orderNumber: "ORD-001",
    date: "2024-01-15",
    time: "14:30",
    status: "delivered",
    total: 67000,
    items: [
      { name: "Diabetga mos salat", quantity: 1, price: 25000 },
      { name: "Grilled tovuq ko'kragi", quantity: 1, price: 35000 },
      { name: "Mineral suv", quantity: 1, price: 7000 },
    ],
    restaurant: "Sog'lom Ovqat",
    deliveryTime: "25 min",
    rating: 4.8,
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    date: "2024-01-14",
    time: "19:15",
    status: "delivered",
    total: 45000,
    items: [
      { name: "Quinoa bowl", quantity: 1, price: 28000 },
      { name: "Fresh juice", quantity: 1, price: 17000 },
    ],
    restaurant: "Green Life",
    deliveryTime: "30 min",
    rating: 4.9,
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    date: "2024-01-13",
    time: "12:45",
    status: "delivered",
    total: 52000,
    items: [
      { name: "Baliq bilan sabzavot", quantity: 1, price: 42000 },
      { name: "Limonad", quantity: 1, price: 10000 },
    ],
    restaurant: "Ocean Fresh",
    deliveryTime: "35 min",
    rating: 4.7,
  },
  {
    id: 4,
    orderNumber: "ORD-004",
    date: "2024-01-12",
    time: "18:20",
    status: "cancelled",
    total: 38000,
    items: [{ name: "Vegan burger", quantity: 2, price: 19000 }],
    restaurant: "Plant Kitchen",
    deliveryTime: "Bekor qilindi",
    rating: null,
  },
]

const getStatusInfo = (status: string) => {
  switch (status) {
    case "delivered":
      return {
        text: "Yetkazildi",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      }
    case "preparing":
      return {
        text: "Tayyorlanmoqda",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
      }
    case "on_way":
      return {
        text: "Yo'lda",
        color: "bg-blue-100 text-blue-800",
        icon: Truck,
      }
    case "cancelled":
      return {
        text: "Bekor qilindi",
        color: "bg-red-100 text-red-800",
        icon: RotateCcw,
      }
    default:
      return {
        text: "Noma'lum",
        color: "bg-gray-100 text-gray-800",
        icon: Clock,
      }
  }
}

export default function OrdersPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("nutri_user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
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
            <h1 className="text-xl font-bold text-gray-800">Buyurtmalar tarixi</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Jami buyurtmalar</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-sm text-gray-600">Yetkazildi</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">540,000</div>
                <div className="text-sm text-gray-600">Jami summa</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">4.8</div>
                <div className="text-sm text-gray-600">O'rtacha reyting</div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {sampleOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon

              return (
                <Card key={order.id} className="border hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-lg">#{order.orderNumber}</h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.text}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {order.restaurant} • {order.date} • {order.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{order.total.toLocaleString()} so'm</p>
                        {order.rating && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            {order.rating}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>{item.price.toLocaleString()} so'm</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {order.deliveryTime}
                      </div>
                      <div className="flex space-x-2">
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Qayta buyurtma qilish
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Batafsil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">Ko'proq yuklash</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
