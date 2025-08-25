
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Youtube, Download, Share2, Play, Search, Filter, Upload, Lock, Eye } from "lucide-react";

const MediaHub = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for documents
  const documents = [
    {
      id: 1,
      title: "BNI FELIX Chapter Introduction",
      titleEn: "BNI FELIX Chapter Introduction", 
      type: "PDF",
      category: "introduction",
      isPublic: true,
      downloadUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
    },
    {
      id: 2,
      title: "Hướng dẫn thành viên mới",
      titleEn: "New Member Onboarding Guide",
      type: "Video",
      category: "onboarding", 
      isPublic: false,
      downloadUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400"
    }
  ];

  // Mock data for photos
  const photoAlbums = [
    {
      id: 1,
      title: "Họp tuần 15/06/2024",
      titleEn: "Weekly Meeting 15/06/2024",
      year: "2024",
      event: "weekly",
      photos: 25,
      coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400"
    },
    {
      id: 2, 
      title: "FELIX Gala Night 2024",
      titleEn: "FELIX Gala Night 2024",
      year: "2024",
      event: "gala",
      photos: 150,
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400"
    }
  ];

  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: "Diễn giả: Nguyễn Văn A - Digital Marketing",
      titleEn: "Speaker: Nguyen Van A - Digital Marketing",
      speaker: "Nguyễn Văn A",
      date: "15/06/2024",
      duration: "45:30",
      videoUrl: "#",
      slideUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Tất cả', labelEn: 'All' },
    { value: 'introduction', label: 'Giới thiệu', labelEn: 'Introduction' },
    { value: 'onboarding', label: 'Tài liệu mới', labelEn: 'Onboarding' },
    { value: 'training', label: 'Đào tạo', labelEn: 'Training' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Header */}
      <div className="bni-professional-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              📺 MEDIA HUB
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-gray-100">
              TRUYỀN THÔNG & TÀI NGUYÊN
            </p>
            <p className="text-lg text-gray-200">
              Media & Resources Center
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="🔍 Tìm kiếm tài liệu, video, hình ảnh..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D71920] focus:border-[#D71920]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value)}
                  className={selectedFilter === option.value ? "bg-[#D71920] hover:bg-[#8B0000]" : "hover:bg-[#D71920] hover:text-white"}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="documents" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="documents" className="data-[state=active]:bg-[#D71920] data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              📚 Kho tài liệu
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-[#D71920] data-[state=active]:text-white">
              <Image className="w-4 h-4 mr-2" />
              🖼️ Thư viện ảnh
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-[#D71920] data-[state=active]:text-white">
              <Youtube className="w-4 h-4 mr-2" />
              🎬 Video & Slide
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover-scale hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#D71920]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-[#D71920] text-white">
                        {doc.type}
                      </Badge>
                      {!doc.isPublic && <Lock className="w-4 h-4 text-[#8B0000]" />}
                    </div>
                    <div className="relative mb-4">
                      <img 
                        src={doc.thumbnail} 
                        alt={doc.title}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                    <CardTitle className="text-lg text-[#2E2E2E]">{doc.title}</CardTitle>
                    <CardDescription className="text-gray-600">{doc.titleEn}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#D71920] hover:bg-[#8B0000] text-white flex-1"
                        disabled={!doc.isPublic}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        📥 Tải về
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-[#D71920] hover:text-white">
                        <Share2 className="w-4 h-4 mr-1" />
                        Chia sẻ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoAlbums.map((album) => (
                <Card key={album.id} className="hover-scale hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={album.coverImage} 
                      alt={album.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#D71920] text-white">
                        {album.photos} ảnh
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#2E2E2E]">{album.title}</CardTitle>
                    <CardDescription className="text-gray-600">{album.titleEn}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#D71920] hover:bg-[#8B0000] text-white flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        🖼️ Xem album
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-[#D71920] hover:text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Tải về
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="hover-scale hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Button size="lg" className="bg-[#D71920] hover:bg-[#8B0000] rounded-full">
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black bg-opacity-70 text-white">
                        ⏱️ {video.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-[#2E2E2E]">{video.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {video.titleEn} • {video.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#D71920] hover:bg-[#8B0000] text-white"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        ▶️ Xem Video
                      </Button>
                      <Button size="sm" variant="outline" className="hover:bg-[#D71920] hover:text-white">
                        <Download className="w-4 h-4 mr-1" />
                        📥 Tải Slide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Main CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#D71920] to-[#8B0000] rounded-xl text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">📲 Truy cập nhanh tài nguyên FELIX</h3>
          <p className="text-lg mb-6 text-gray-100">Quick Access to FELIX Resources</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="hover-scale bg-white text-[#D71920] hover:bg-gray-100"
            >
              📎 Tải tài liệu FELIX
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="hover-scale bg-white text-[#D71920] hover:bg-gray-100"
            >
              🎬 Xem video diễn giả
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="hover-scale bg-white text-[#D71920] hover:bg-gray-100"
            >
              🖼️ Xem thư viện ảnh
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="hover-scale bg-white text-[#D71920] hover:bg-gray-100"
            >
              <Upload className="w-4 h-4 mr-1" />
              📤 Gửi tài liệu mới
            </Button>
          </div>
        </div>

        {/* Access Rights Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>🔐 Lưu ý quyền truy cập:</strong> Thành viên đăng nhập mới xem được tài liệu nội bộ. Khách chỉ xem được tài liệu công khai.
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                <strong>Access Rights:</strong> Members only can access internal documents. Guests can only view public materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaHub;
