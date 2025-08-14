"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChefHat, Search, Star, Clock, MapPin, Filter, Heart, Shield } from "lucide-react"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "Sog'lom Ovqat",
    cuisine: "Sog'lom ovqatlar",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: 5000,
    image: "/restaurant-healthy.png",
    tags: ["Diabet uchun", "Organic", "Kam kaloriya"],
    specialties: ["Diabetga mos salatlar", "Protein bowls", "Fresh juices"],
    healthScore: 95,
    distance: "1.2 km",
    isPartner: true,
  },
  {
    id: 2,
    name: "Fit Kitchen",
    cuisine: "Fitness ovqatlari",
    rating: 4.9,
    deliveryTime: "25-35 min",
    deliveryFee: 7000,
    image: "/restaurant-fit.png",
    tags: ["Yuqori oqsil", "Keto", "Gluten-free"],
    specialties: ["Grilled tovuq", "Protein smoothies", "Keto meals"],
    healthScore: 92,
    distance: "2.1 km",
    isPartner: true,
  },
  {
    id: 3,
    name: "Green Life",
    cuisine: "Vegan & Vegetarian",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: 6000,
    image: "/restaurant-vegan.png",
    tags: ["Vegan", "Organic", "Raw food"],
    specialties: ["Quinoa bowls", "Vegan burgers", "Smoothie bowls"],
    healthScore: 88,
    distance: "0.8 km",
    isPartner: true,
  },
  {
    id: 4,
    name: "Ocean Fresh",
    cuisine: "Dengiz mahsulotlari",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: 8000,
    image: "/restaurant-seafood.png",
    tags: ["Omega-3", "Yurak uchun foydali", "Fresh"],
    specialties: ["Grilled fish", "Seafood salads", "Sushi bowls"],
    healthScore: 90,
    distance: "3.5 km",
    isPartner: false,
  },
  {
    id: 5,
    name: "Plant Kitchen",
    cuisine: "O'simlik asosidagi",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: 5500,
    image: "/restaurant-plant.png",
    tags: ["Plant-based", "Sut mahsulotisiz", "Eco-friendly"],
    specialties: ["Buddha bowls", "Plant protein", "Nut-free options"],
    healthScore: 87,
    distance: "1.8 km",
    isPartner: true,
  },
  {
    id: 6,
    name: "Mediterranean Delight",
    cuisine: "O'rta er dengizi",
    rating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 7500,
    image: "/restaurant-mediterranean.png",
    tags: ["Sog'lom yog'lar", "Antioksidant", "Traditional"],
    specialties: ["Greek salads", "Hummus bowls", "Olive oil dishes"],
    healthScore: 85,
    distance: "2.7 km",
    isPartner: false,
  },
]

const categories = [
  { name: "Barchasi", count: 6, active: true },
  { name: "Diabet uchun", count: 3, active: false },
  { name: "Vegan", count: 2, active: false },
  { name: "Yuqori oqsil", count: 4, active: false },
  { name: "Gluten-free", count: 3, active: false },
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")
  const [sortBy, setSortBy] = useState("rating")

  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "Barchasi" ||
        restaurant.tags.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase()))

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "time":
          return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        default:
          return 0
      }
    })

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
                  placeholder="Restoran yoki ovqat qidiring..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="rating">Reyting bo'yicha</option>
                <option value="time">Vaqt bo'yicha</option>
                <option value="distance">Masofa bo'yicha</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Kategoriyalar</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${
                  selectedCategory === category.name ? "bg-green-500 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{filteredRestaurants.length} ta restoran topildi</h2>
          <p className="text-gray-600">Sizning sog'lik profilingizga mos restoranlar</p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg cursor-pointer"
            >
              <div className="relative">
                <img
                  src={restaurant.image || "/placeholder.svg?height=200&width=400&text=Restaurant"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {restaurant.isPartner && (
                    <Badge className="bg-green-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Nutri Partner
                    </Badge>
                  )}
                  <Badge className="bg-blue-500 text-white">
                    <Heart className="w-3 h-3 mr-1" />
                    {restaurant.healthScore}% sog'lom
                  </Badge>
                </div>
                <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {restaurant.rating}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {restaurant.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Maxsus taomlar:</p>
                    <p className="text-xs text-gray-600">{restaurant.specialties.join(", ")}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {restaurant.deliveryTime}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {restaurant.distance}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">
                      Yetkazib berish: {restaurant.deliveryFee.toLocaleString()} so'm
                    </span>
                    <Link href={`/restaurants/${restaurant.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        Ko'rish
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Hech narsa topilmadi</h3>
            <p className="text-gray-500">Qidiruv so'zini o'zgartiring yoki boshqa kategoriyani tanlang</p>
          </div>
        )}
      </div>
    </div>
  )
}
