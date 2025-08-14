"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChefHat, ArrowLeft, Brain, Sparkles, Clock, Star, CheckCircle, Zap, Heart, Shield } from "lucide-react"
import Link from "next/link"

const demoHealthConditions = [
  { id: "diabetes", name: "Diabet", icon: "🩺" },
  { id: "hypertension", name: "Yuqori bosim", icon: "💓" },
  { id: "heart_disease", name: "Yurak kasalligi", icon: "❤️" },
  { id: "none", name: "Hech qanday kasallik yo'q", icon: "✅" },
]

const demoAllergies = [
  { id: "nuts", name: "Yong'oq", icon: "🥜" },
  { id: "dairy", name: "Sut mahsulotlari", icon: "🥛" },
  { id: "gluten", name: "Gluten", icon: "🌾" },
  { id: "none", name: "Allergiyam yo'q", icon: "✅" },
]

const getAIRecommendations = (healthConditions: string[], allergies: string[], preferences: string) => {
  // Simulate AI processing
  const recommendations = []

  if (healthConditions.includes("diabetes")) {
    recommendations.push({
      id: 1,
      name: "Diabetga mos quinoa salat",
      restaurant: "Sog'lom Ovqat",
      price: 28000,
      rating: 4.9,
      time: "20-25 min",
      image: "/healthy-salad.png",
      tags: ["Kam uglevod", "Yuqori tolali", "Diabet uchun xavfsiz"],
      calories: 220,
      carbs: 15,
      protein: 18,
      fat: 8,
      aiReason:
        "Diabetingiz uchun kam glikemik indeksli va yuqori tolali ovqat. Qand darajasini barqaror ushlab turadi.",
      safetyScore: 95,
    })

    recommendations.push({
      id: 2,
      name: "Grilled tovuq ko'kragi bilan sabzavot",
      restaurant: "Fit Kitchen",
      price: 35000,
      rating: 4.8,
      time: "25-30 min",
      image: "/grilled-chicken.png",
      tags: ["Yuqori oqsil", "Kam uglevod", "Gluten-free"],
      calories: 280,
      carbs: 8,
      protein: 42,
      fat: 9,
      aiReason: "Yuqori oqsil va kam uglevod tarkibi qand darajasini oshirmaydi. Diabetga mos.",
      safetyScore: 98,
    })
  }

  if (healthConditions.includes("heart_disease")) {
    recommendations.push({
      id: 3,
      name: "Omega-3 boy baliq bilan sabzavot",
      restaurant: "Ocean Fresh",
      price: 42000,
      rating: 4.7,
      time: "30-35 min",
      image: "/fish-and-vegetables.png",
      tags: ["Omega-3", "Kam tuz", "Yurak uchun foydali"],
      calories: 260,
      carbs: 12,
      protein: 35,
      fat: 11,
      aiReason: "Omega-3 yog' kislotalari yurak sog'ligini yaxshilaydi. Kam natriy tarkibi bosimni kamaytiradi.",
      safetyScore: 96,
    })
  }

  if (allergies.includes("gluten")) {
    recommendations.forEach((rec) => {
      if (!rec.tags.includes("Gluten-free")) {
        rec.tags.push("Gluten-free")
        rec.aiReason += " Gluten-free tarkibi sizning allergiyangizga mos."
      }
    })
  }

  if (allergies.includes("dairy")) {
    recommendations.push({
      id: 4,
      name: "Vegan protein bowl",
      restaurant: "Plant Kitchen",
      price: 32000,
      rating: 4.6,
      time: "20-25 min",
      image: "/colorful-quinoa-bowl.png",
      tags: ["Vegan", "Sut mahsulotisiz", "Yuqori oqsil"],
      calories: 310,
      carbs: 35,
      protein: 20,
      fat: 12,
      aiReason: "Sut mahsulotlari allergiyangiz uchun to'liq vegan ovqat. O'simlik oqsillari bilan boy.",
      safetyScore: 94,
    })
  }

  if (healthConditions.includes("none") && allergies.includes("none")) {
    recommendations.push(
      {
        id: 5,
        name: "Muvozanatli Mediterranean salat",
        restaurant: "Healthy Choice",
        price: 30000,
        rating: 4.8,
        time: "15-20 min",
        image: "/healthy-salad.png",
        tags: ["Muvozanatli", "Antioksidant", "Sog'lom yog'lar"],
        calories: 290,
        carbs: 22,
        protein: 16,
        fat: 18,
        aiReason: "Sizning sog'lik holatingizdagi uchun ideal muvozanatli ovqat. Barcha kerakli ozuqalar mavjud.",
        safetyScore: 92,
      },
      {
        id: 6,
        name: "Protein smoothie bowl",
        restaurant: "Fresh Start",
        price: 25000,
        rating: 4.9,
        time: "10-15 min",
        image: "/colorful-quinoa-bowl.png",
        tags: ["Energiya beruvchi", "Vitamin boy", "Tabiiy"],
        calories: 240,
        carbs: 28,
        protein: 22,
        fat: 8,
        aiReason: "Energiya va vitaminlar bilan to'la. Kun boshida yoki mashqdan keyin ideal.",
        safetyScore: 90,
      },
    )
  }

  return recommendations.slice(0, 4) // Return max 4 recommendations
}

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [formData, setFormData] = useState({
    healthConditions: [] as string[],
    allergies: [] as string[],
    preferences: "",
  })

  const handleArrayToggle = (field: "healthConditions" | "allergies", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const analyzeAndRecommend = async () => {
    setIsAnalyzing(true)
    setStep(2)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const aiRecommendations = getAIRecommendations(formData.healthConditions, formData.allergies, formData.preferences)
    setRecommendations(aiRecommendations)
    setIsAnalyzing(false)
    setStep(3)
  }

  const resetDemo = () => {
    setStep(1)
    setRecommendations([])
    setFormData({
      healthConditions: [],
      allergies: [],
      preferences: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
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
            <Badge className="bg-blue-100 text-blue-700">
              <Brain className="w-4 h-4 mr-1" />
              AI Demo
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Input Form */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Nutri AI Demo</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Sun'iy intellekt qanday ishlashini ko'ring. Bir necha savollarga javob bering va sizga mos ovqatlarni
                  tavsiya qilishimizni kuzating.
                </p>
              </div>

              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Sog'lik ma'lumotlaringiz
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Health Conditions */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Sog'lik holatingiz</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {demoHealthConditions.map((condition) => (
                        <Badge
                          key={condition.id}
                          variant={formData.healthConditions.includes(condition.id) ? "default" : "outline"}
                          className={`p-3 cursor-pointer transition-all hover:scale-105 ${
                            formData.healthConditions.includes(condition.id)
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleArrayToggle("healthConditions", condition.id)}
                        >
                          <span className="mr-2">{condition.icon}</span>
                          {condition.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Allergiyalaringiz</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {demoAllergies.map((allergy) => (
                        <Badge
                          key={allergy.id}
                          variant={formData.allergies.includes(allergy.id) ? "default" : "outline"}
                          className={`p-3 cursor-pointer transition-all hover:scale-105 ${
                            formData.allergies.includes(allergy.id)
                              ? "bg-red-100 text-red-800 border-red-300"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleArrayToggle("allergies", allergy.id)}
                        >
                          <span className="mr-2">{allergy.icon}</span>
                          {allergy.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <Label htmlFor="preferences" className="text-base font-semibold">
                      Qo'shimcha talablar (ixtiyoriy)
                    </Label>
                    <Textarea
                      id="preferences"
                      placeholder="Masalan: Kam kaloriyali ovqat, vegetarian, halal..."
                      value={formData.preferences}
                      onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={analyzeAndRecommend}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg py-6"
                    disabled={formData.healthConditions.length === 0 && formData.allergies.length === 0}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Tahlil Qilsin
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: AI Processing */}
          {step === 2 && (
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Brain className="w-12 h-12 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">AI tahlil qilmoqda...</h2>
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                    <span>Sog'lik ma'lumotlaringiz tahlil qilinmoqda</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span>Xavfsiz ovqatlar qidirilmoqda</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span>Shaxsiylashtirilgan tavsiyalar yaratilmoqda</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
                <p className="text-blue-800">
                  <strong>AI qanday ishlaydi:</strong> Sizning sog'lik ma'lumotlaringiz asosida 10,000+ ovqat
                  ma'lumotlari bazasidan eng xavfsiz va foydali variantlarni tanlaymiz. Har bir tavsiya uchun xavfsizlik
                  darajasi va sababi ko'rsatiladi.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: AI Recommendations */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">AI Tavsiyalari Tayyor!</h2>
                <p className="text-xl text-gray-600">
                  Sizning sog'lik profilingizga mos {recommendations.length} ta ovqat topildi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((food) => (
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
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        {food.safetyScore}% xavfsiz
                      </Badge>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg">{food.name}</h3>
                          <p className="text-gray-600 text-sm">{food.restaurant}</p>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {food.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* AI Reasoning */}
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Brain className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-blue-800 mb-1">AI Tavsiya Sababi:</p>
                              <p className="text-xs text-blue-700">{food.aiReason}</p>
                            </div>
                          </div>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center space-y-4">
                <div className="bg-green-50 p-6 rounded-lg max-w-2xl mx-auto">
                  <h3 className="font-bold text-green-800 mb-2">Demo yakunlandi! 🎉</h3>
                  <p className="text-green-700">
                    Bu Nutri AI tizimining qanday ishlashini ko'rsatish uchun demo edi. Haqiqiy tizimda 10,000+ ovqat va
                    yanada aniq tavsiyalar mavjud.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={resetDemo} variant="outline" className="bg-transparent">
                    <Zap className="w-4 h-4 mr-2" />
                    Qayta sinab ko'rish
                  </Button>
                  <Link href="/auth/register">
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      Haqiqiy tizimni ishlatish
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
