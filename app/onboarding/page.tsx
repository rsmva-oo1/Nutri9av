"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Heart, AlertTriangle, Target, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const healthConditions = [
  { id: "diabetes", name: "Diabet", icon: "🩺" },
  { id: "hypertension", name: "Yuqori bosim", icon: "💓" },
  { id: "heart_disease", name: "Yurak kasalligi", icon: "❤️" },
  { id: "kidney_disease", name: "Buyrak kasalligi", icon: "🫘" },
  { id: "obesity", name: "Semizlik", icon: "⚖️" },
  { id: "none", name: "Hech qanday kasallik yo'q", icon: "✅" },
]

const allergies = [
  { id: "nuts", name: "Yong'oq", icon: "🥜" },
  { id: "dairy", name: "Sut mahsulotlari", icon: "🥛" },
  { id: "eggs", name: "Tuxum", icon: "🥚" },
  { id: "seafood", name: "Dengiz mahsulotlari", icon: "🦐" },
  { id: "gluten", name: "Gluten", icon: "🌾" },
  { id: "soy", name: "Soya", icon: "🫘" },
  { id: "none", name: "Allergiyam yo'q", icon: "✅" },
]

const dietaryPreferences = [
  { id: "vegetarian", name: "Vegetarian", icon: "🥬" },
  { id: "vegan", name: "Vegan", icon: "🌱" },
  { id: "halal", name: "Halal", icon: "☪️" },
  { id: "keto", name: "Keto", icon: "🥑" },
  { id: "low_carb", name: "Kam uglevod", icon: "🥩" },
  { id: "none", name: "Maxsus talabim yo'q", icon: "🍽️" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    healthConditions: [] as string[],
    allergies: [] as string[],
    dietaryPreferences: [] as string[],
    goals: "",
    additionalInfo: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("nutri_user")
    if (!user) {
      router.push("/auth/login")
    }
  }, [router])

  const handleArrayToggle = (field: "healthConditions" | "allergies" | "dietaryPreferences", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleSubmit = async () => {
    // Save health profile
    const user = JSON.parse(localStorage.getItem("nutri_user") || "{}")
    const updatedUser = {
      ...user,
      healthProfile: formData,
      isNewUser: false,
      profileCompleted: true,
    }
    localStorage.setItem("nutri_user", JSON.stringify(updatedUser))

    toast({
      title: "Profil muvaffaqiyatli saqlandi!",
      description: "Endi sizga mos ovqatlarni tavsiya qila olamiz.",
    })

    router.push("/dashboard")
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Nutri
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sog'lik profilingizni yarating</h1>
          <p className="text-gray-600">
            Sizga eng mos ovqatlarni tavsiya qilish uchun bir necha savollarga javob bering
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Qadam {currentStep} / 4</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-2 shadow-xl">
          <CardContent className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Asosiy ma'lumotlar</h2>
                  <p className="text-gray-600">Yosh, vazn va bo'y ma'lumotlaringizni kiriting</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Yosh</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Vazn (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Bo'y (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Health Conditions */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Sog'lik holati</h2>
                  <p className="text-gray-600">Sizda mavjud kasalliklarni belgilang</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {healthConditions.map((condition) => (
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
            )}

            {/* Step 3: Allergies & Diet */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Allergiya va ovqatlanish</h2>
                  <p className="text-gray-600">Allergiyalaringiz va ovqatlanish talablaringizni belgilang</p>
                </div>

                {/* Allergies */}
                <div>
                  <h3 className="font-semibold mb-3">Allergiyalar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allergies.map((allergy) => (
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

                {/* Dietary Preferences */}
                <div>
                  <h3 className="font-semibold mb-3">Ovqatlanish talablari</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dietaryPreferences.map((pref) => (
                      <Badge
                        key={pref.id}
                        variant={formData.dietaryPreferences.includes(pref.id) ? "default" : "outline"}
                        className={`p-3 cursor-pointer transition-all hover:scale-105 ${
                          formData.dietaryPreferences.includes(pref.id)
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleArrayToggle("dietaryPreferences", pref.id)}
                      >
                        <span className="mr-2">{pref.icon}</span>
                        {pref.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Goals & Additional Info */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Maqsadlar va qo'shimcha ma'lumot</h2>
                  <p className="text-gray-600">Ovqatlanish maqsadlaringiz va qo'shimcha ma'lumotlar</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goals">Ovqatlanish maqsadlaringiz</Label>
                    <Textarea
                      id="goals"
                      placeholder="Masalan: Vazn yo'qotish, sog'lom ovqatlanish, energiya oshirish..."
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Qo'shimcha ma'lumot</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Boshqa muhim ma'lumotlar, maxsus talablar yoki izohlar..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Orqaga
              </Button>

              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex items-center"
              >
                {currentStep === 4 ? "Yakunlash" : "Keyingisi"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
