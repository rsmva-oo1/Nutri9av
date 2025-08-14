"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChefHat, ArrowLeft, Search, ImageIcon, Download, ExternalLink, Grid, List } from "lucide-react"
import Link from "next/link"

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    // Load images from localStorage (in real app, fetch from API)
    const loadImages = () => {
      const sampleImages = [
        {
          id: 1,
          name: "Sog'lom salat",
          url: "/healthy-salad.png",
          category: "Salatlar",
          uploadedAt: "2024-01-15T10:30:00Z",
          size: 245760,
          restaurant: "Sog'lom Ovqat",
        },
        {
          id: 2,
          name: "Grilled tovuq",
          url: "/grilled-chicken.png",
          category: "Asosiy taomlar",
          uploadedAt: "2024-01-14T15:45:00Z",
          size: 312480,
          restaurant: "Fit Kitchen",
        },
        {
          id: 3,
          name: "Quinoa bowl",
          url: "/colorful-quinoa-bowl.png",
          category: "Sog'lom ovqatlar",
          uploadedAt: "2024-01-13T09:20:00Z",
          size: 198720,
          restaurant: "Green Life",
        },
        {
          id: 4,
          name: "Baliq bilan sabzavot",
          url: "/fish-and-vegetables.png",
          category: "Dengiz mahsulotlari",
          uploadedAt: "2024-01-12T14:15:00Z",
          size: 287360,
          restaurant: "Ocean Fresh",
        },
      ]
      setImages(sampleImages)
      setLoading(false)
    }

    loadImages()
  }, [])

  const filteredImages = images.filter(
    (image) =>
      image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.restaurant.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
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

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rasmlarni qidiring..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Link href="/upload">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Fayl yuklash
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Rasm galereyasi</h1>
          <p className="text-gray-600">{filteredImages.length} ta rasm topildi</p>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <img src={image.url || "/placeholder.svg"} alt={image.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => window.open(image.url, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = image.url
                          link.download = image.name
                          link.click()
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{image.name}</h3>
                  <p className="text-sm text-gray-600">{image.restaurant}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(image.size)} • {new Date(image.uploadedAt).toLocaleDateString("uz-UZ")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredImages.map((image) => (
              <Card key={image.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <ImageIcon
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{image.name}</h3>
                      <p className="text-sm text-gray-600">
                        {image.restaurant} • {image.category}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(image.size)} • {new Date(image.uploadedAt).toLocaleDateString("uz-UZ")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => window.open(image.url, "_blank")}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ko'rish
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = image.url
                          link.download = image.name
                          link.click()
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Yuklab olish
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Hech qanday rasm topilmadi</h3>
            <p className="text-gray-500 mb-4">Qidiruv so'zini o'zgartiring yoki yangi rasm yuklang</p>
            <Link href="/upload">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Birinchi rasmni yuklash
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
