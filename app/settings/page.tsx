"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChefHat, ArrowLeft, Bell, Shield, User, CreditCard, Globe, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: false,
      healthTips: true,
      newRestaurants: false,
    },
    privacy: {
      shareHealthData: true,
      allowAnalytics: false,
      publicProfile: false,
    },
    preferences: {
      darkMode: false,
      language: "uz",
      currency: "UZS",
    },
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("nutri_user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(userData))
      // Load saved settings
      const savedSettings = localStorage.getItem("nutri_settings")
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    }
  }, [router])

  const updateSetting = (category: string, key: string, value: any) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [key]: value,
      },
    }
    setSettings(newSettings)
    localStorage.setItem("nutri_settings", JSON.stringify(newSettings))

    toast({
      title: "Sozlamalar saqlandi",
      description: "O'zgarishlar muvaffaqiyatli saqlandi.",
    })
  }

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
            <h1 className="text-xl font-bold text-gray-800">Sozlamalar</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Hisob sozlamalari
              </CardTitle>
              <CardDescription>Shaxsiy ma'lumotlar va hisob boshqaruvi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Profilni tahrirlash</Label>
                  <p className="text-sm text-gray-600">Ism, email va boshqa ma'lumotlarni o'zgartirish</p>
                </div>
                <Link href="/profile">
                  <Button variant="outline">Tahrirlash</Button>
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Sog'lik profili</Label>
                  <p className="text-sm text-gray-600">Kasalliklar, allergiyalar va ovqatlanish talablari</p>
                </div>
                <Link href="/onboarding">
                  <Button variant="outline">Yangilash</Button>
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Parolni o'zgartirish</Label>
                  <p className="text-sm text-gray-600">Hisobingiz xavfsizligini ta'minlash</p>
                </div>
                <Button variant="outline">O'zgartirish</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-600" />
                Bildirishnomalar
              </CardTitle>
              <CardDescription>Qaysi bildirishnomalarni olishni tanlang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Buyurtma yangilanishlari</Label>
                  <p className="text-sm text-gray-600">Buyurtma holati haqida xabarlar</p>
                </div>
                <Switch
                  checked={settings.notifications.orderUpdates}
                  onCheckedChange={(checked) => updateSetting("notifications", "orderUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Aksiyalar va chegirmalar</Label>
                  <p className="text-sm text-gray-600">Maxsus takliflar haqida xabarlar</p>
                </div>
                <Switch
                  checked={settings.notifications.promotions}
                  onCheckedChange={(checked) => updateSetting("notifications", "promotions", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Sog'lik maslahatlari</Label>
                  <p className="text-sm text-gray-600">Foydali sog'lik va ovqatlanish maslahatlari</p>
                </div>
                <Switch
                  checked={settings.notifications.healthTips}
                  onCheckedChange={(checked) => updateSetting("notifications", "healthTips", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Yangi restoranlar</Label>
                  <p className="text-sm text-gray-600">Yangi qo'shilgan restoranlar haqida</p>
                </div>
                <Switch
                  checked={settings.notifications.newRestaurants}
                  onCheckedChange={(checked) => updateSetting("notifications", "newRestaurants", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Maxfiylik va xavfsizlik
              </CardTitle>
              <CardDescription>Ma'lumotlaringizni qanday ishlatishimizni boshqaring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Sog'lik ma'lumotlarini ulashish</Label>
                  <p className="text-sm text-gray-600">AI tavsiyalarini yaxshilash uchun</p>
                </div>
                <Switch
                  checked={settings.privacy.shareHealthData}
                  onCheckedChange={(checked) => updateSetting("privacy", "shareHealthData", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Analitika ma'lumotlari</Label>
                  <p className="text-sm text-gray-600">Ilovani yaxshilash uchun foydalanish ma'lumotlari</p>
                </div>
                <Switch
                  checked={settings.privacy.allowAnalytics}
                  onCheckedChange={(checked) => updateSetting("privacy", "allowAnalytics", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Ochiq profil</Label>
                  <p className="text-sm text-gray-600">Boshqa foydalanuvchilar profilingizni ko'rishi</p>
                </div>
                <Switch
                  checked={settings.privacy.publicProfile}
                  onCheckedChange={(checked) => updateSetting("privacy", "publicProfile", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-600" />
                Ilova sozlamalari
              </CardTitle>
              <CardDescription>Til, valyuta va boshqa sozlamalar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Qorong'u rejim</Label>
                  <p className="text-sm text-gray-600">Ko'zlaringizni himoya qilish uchun</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4" />
                  <Switch
                    checked={settings.preferences.darkMode}
                    onCheckedChange={(checked) => updateSetting("preferences", "darkMode", checked)}
                  />
                  <Moon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Til</Label>
                  <p className="text-sm text-gray-600">Ilova tili</p>
                </div>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => updateSetting("preferences", "language", e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="uz">O'zbek</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Valyuta</Label>
                  <p className="text-sm text-gray-600">Narxlarni ko'rsatish uchun</p>
                </div>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => updateSetting("preferences", "currency", e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="UZS">UZS (So'm)</option>
                  <option value="USD">USD (Dollar)</option>
                  <option value="EUR">EUR (Evro)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                To'lov sozlamalari
              </CardTitle>
              <CardDescription>To'lov usullari va hisob-kitob</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Saqlangan kartalar</Label>
                  <p className="text-sm text-gray-600">Tez to'lov uchun kartalarni boshqarish</p>
                </div>
                <Button variant="outline">Boshqarish</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">To'lov tarixi</Label>
                  <p className="text-sm text-gray-600">Barcha to'lovlar va kvitansiyalar</p>
                </div>
                <Button variant="outline">Ko'rish</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Avtomatik to'lov</Label>
                  <p className="text-sm text-gray-600">Buyurtmalar uchun avtomatik to'lov</p>
                </div>
                <Button variant="outline">Sozlash</Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Xavfli zona</CardTitle>
              <CardDescription>Bu amallar qaytarib bo'lmaydi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Ma'lumotlarni eksport qilish</Label>
                  <p className="text-sm text-gray-600">Barcha ma'lumotlaringizni yuklab olish</p>
                </div>
                <Button variant="outline">Eksport</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Hisobni o'chirish</Label>
                  <p className="text-sm text-gray-600">Hisobingizni butunlay o'chirish</p>
                </div>
                <Button variant="destructive">O'chirish</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
