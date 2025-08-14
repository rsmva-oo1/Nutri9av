"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChefHat, User, Heart, AlertTriangle, Target, Save, ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    weight: "",
    height: "",
    goals: "",
    additionalInfo: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("nutri_user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        age: parsedUser.healthProfile?.age || "",
        weight: parsedUser.healthProfile?.weight || "",
        height: parsedUser.healthProfile?.height || "",
        goals: parsedUser.healthProfile?.goals || "",
        additionalInfo: parsedUser.healthProfile?.additionalInfo || "",
      })
    }
  }, [router])

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      healthProfile: {
        ...user.healthProfile,
        age: formData.age,
        weight: formData.weight,
        height: formData.height,
        goals: formData.goals,
        additionalInfo: formData.additionalInfo,
      },
    }

    localStorage.setItem("nutri_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)

    toast({
      title: "Profil yangilandi!",
      description: "Ma'lumotlaringiz muvaffaqiyatli saqlandi.",
    })
  }

  const getBMI = () => {
    if (formData.weight && formData.height) {
      const heightInM = Number.parseInt(formData.height) / 100
      const bmi = Number.parseInt(formData.weight) / (heightInM * heightInM)
      return bmi.toFixed(1)
    }
    return null
  }

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: "Kam vazn", color: "text-blue-600" }
    if (bmi < 25) return { text: "Normal", color: "text-green-600" }
    if (bmi < 30) return { text: "Ortiqcha vazn", color: "text-yellow-600" }
    return { text: "Semizlik", color: "text-red-600" }
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>
  }

  const bmi = getBMI()
  const bmiStatus = bmi ? getBMIStatus(Number.parseFloat(bmi)) : null

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

            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Saqlash
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Tahrirlash
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bmi && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">BMI</p>
                        <p className="text-2xl font-bold">{bmi}</p>
                        <p className={`text-sm ${bmiStatus?.color}`}>{bmiStatus?.text}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Sog'lik holati</h3>
                      {user.healthProfile?.healthConditions?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.healthProfile.healthConditions.map((condition: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Ma'lumot kiritilmagan</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Allergiyalar</h3>
                      {user.healthProfile?.allergies?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {user.healthProfile.allergies.map((allergy: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Allergiya yo'q</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Shaxsiy ma'lumotlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">To'liq ism</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Yosh</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-600" />
                      Sog'lik ma'lumotlari
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Vazn (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Bo'y (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={formData.height}
                          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Goals & Additional Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-purple-600" />
                      Maqsadlar va qo'shimcha ma'lumot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="goals">Ovqatlanish maqsadlari</Label>
                        <Textarea
                          id="goals"
                          value={formData.goals}
                          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Qo'shimcha ma'lumot</Label>
                        <Textarea
                          id="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health Profile Update */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                      Sog'lik profilini yangilash
                    </CardTitle>
                    <CardDescription>
                      Kasalliklar, allergiyalar va ovqatlanish talablaringizni yangilash uchun
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/onboarding">
                      <Button variant="outline" className="w-full bg-transparent">
                        Sog'lik profilini qayta to'ldirish
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
