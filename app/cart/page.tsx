"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ChefHat,
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Sample cart data
const sampleCartItems = [
  {
    id: 1,
    name: "Diabetga mos quinoa salat",
    restaurant: "Sog'lom Ovqat",
    price: 28000,
    quantity: 2,
    image: "/healthy-salad.png",
    tags: ["Diabet uchun xavfsiz", "Gluten-free"],
  },
  {
    id: 2,
    name: "Grilled tovuq ko'kragi",
    restaurant: "Sog'lom Ovqat",
    price: 35000,
    quantity: 1,
    image: "/grilled-chicken.png",
    tags: ["Yuqori oqsil", "Kam uglevod"],
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(sampleCartItems)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Mahsulot o'chirildi",
      description: "Mahsulot savatdan o'chirildi.",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5000
  const total = subtotal + deliveryFee

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      toast({
        title: "Xatolik!",
        description: "Yetkazib berish manzilini kiriting.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    const order = {
      id: Date.now(),
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      address: deliveryAddress,
      instructions: specialInstructions,
      paymentMethod,
      status: "confirmed",
      estimatedTime: "25-35 min",
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
    }

    // Save order (in real app, send to backend)
    const existingOrders = JSON.parse(localStorage.getItem("nutri_orders") || "[]")
    localStorage.setItem("nutri_orders", JSON.stringify([order, ...existingOrders]))

    toast({
      title: "Buyurtma tasdiqlandi! 🎉",
      description: `Buyurtma raqami: ${order.orderNumber}`,
    })

    // Clear cart and redirect
    setCartItems([])
    router.push(`/orders/${order.id}`)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
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
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Savatingiz bo'sh</h2>
            <p className="text-gray-600 mb-6">Sog'lom va mazali ovqatlarni qo'shib, buyurtma bering!</p>
            <Link href="/restaurants">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Ovqat tanlash
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
            <h1 className="text-xl font-bold">Savat ({cartItems.length})</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Buyurtma tafsilotlari</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg?height=80&width=80&text=Food"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.restaurant}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} so'm</p>
                          <p className="text-sm text-gray-600">
                            {item.price.toLocaleString()} so'm x {item.quantity}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Buyurtma xulosasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Mahsulotlar ({cartItems.length})</span>
                        <span>{subtotal.toLocaleString()} so'm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Yetkazib berish</span>
                        <span>{deliveryFee.toLocaleString()} so'm</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Jami</span>
                          <span>{total.toLocaleString()} so'm</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Yetkazib berish
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Manzil *</Label>
                        <Textarea
                          id="address"
                          placeholder="To'liq manzilni kiriting..."
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="instructions">Qo'shimcha izoh</Label>
                        <Textarea
                          id="instructions"
                          placeholder="Maxsus ko'rsatmalar..."
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Taxminiy vaqt: 25-35 daqiqa
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      To'lov usuli
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="cash"
                          name="payment"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Label htmlFor="cash">Naqd pul</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Label htmlFor="card">Plastik karta</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="online"
                          name="payment"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Label htmlFor="online">Online to'lov</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing || !deliveryAddress.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-6 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Buyurtma berilmoqda...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Buyurtma berish ({total.toLocaleString()} so'm)
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>Buyurtma berish orqali siz bizning</p>
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Foydalanish shartlari
                  </Link>
                  ni qabul qilasiz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
