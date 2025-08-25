import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import businessOpportunityImage from "../assets/business-opportunity.jpg";

const formSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  company: z.string().min(2, "Công ty/Ngành nghề phải có ít nhất 2 ký tự"),
  businessNeeds: z.string().min(10, "Yêu cầu kinh doanh phải có ít nhất 10 ký tự"),
});

const Referral = () => {
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      businessNeeds: "",
    },
  });

  // Detect browser language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) {
      setLanguage('vi');
    } else {
      setLanguage('en');
    }
  }, []);

  const content = {
    vi: {
      title: "Đề Xuất Referral",
      subtitle: "Giới thiệu đối tác hoặc khách hàng tiềm năng cho cộng đồng FELIX - Cùng nhau phát triển kinh doanh bền vững",
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      company: "Công ty hoặc Ngành nghề",
      businessNeeds: "Yêu cầu kinh doanh",
      businessNeedsPlaceholder: "Ví dụ: Tôi cần tư vấn doanh nghiệp, tôi muốn tìm hiểu dịch vụ tiếng anh, cần hỗ trợ marketing...",
      submit: "Gửi đề xuất",
      back: "Quay lại",
      success: "Gửi đề xuất thành công!",
      successDesc: "Chúng tôi sẽ kết nối bạn với thành viên phù hợp sớm nhất có thể."
    },
    en: {
      title: "Referral Proposal",
      subtitle: "Introduce potential partners or customers to the FELIX community - Growing sustainable business together",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      company: "Company or Industry",
      businessNeeds: "Business Requirements",
      businessNeedsPlaceholder: "Example: I need business consulting, I want to learn about English services, need marketing support...",
      submit: "Send Proposal",
      back: "Go Back",
      success: "Proposal Sent Successfully!",
      successDesc: "We will connect you with suitable members as soon as possible."
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Referral data:', values);
    
    toast({
      title: content[language].success,
      description: content[language].successDesc,
    });
    
    form.reset();
    
    // Navigate back after 2 seconds
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hero Image */}
      <div className="relative bg-gradient-to-r from-[#D71920] via-[#8B0000] to-[#2E2E2E] text-white py-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{
          backgroundImage: `url(${businessOpportunityImage})`
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#D71920]/80 to-[#8B0000]/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {language === 'vi' ? '🇺🇸 English' : '🇻🇳 Tiếng Việt'}
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Handshake className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
              {t.subtitle}
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg text-white/95">
                {language === 'vi' 
                  ? '🤝 Kết nối các cơ hội kinh doanh chất lượng - Tạo dựng mối quan hệ bền vững'
                  : '🤝 Connecting quality business opportunities - Building sustainable relationships'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-[#D71920]/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-[#D71920] rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#D71920]">{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.name}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'vi' ? "Nhập họ và tên" : "Enter full name"} 
                              {...field} 
                              className="focus:border-[#D71920] focus:ring-[#D71920]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.email}</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder={language === 'vi' ? "Nhập email" : "Enter email"} 
                              {...field} 
                              className="focus:border-[#D71920] focus:ring-[#D71920]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.phone}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'vi' ? "Nhập số điện thoại" : "Enter phone number"} 
                              {...field} 
                              className="focus:border-[#D71920] focus:ring-[#D71920]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.company}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === 'vi' ? "Nhập công ty hoặc ngành nghề" : "Enter company or industry"} 
                              {...field} 
                              className="focus:border-[#D71920] focus:ring-[#D71920]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="businessNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.businessNeeds}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t.businessNeedsPlaceholder}
                            {...field} 
                            rows={4}
                            className="focus:border-[#D71920] focus:ring-[#D71920]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#D71920] hover:bg-[#8B0000] transition-all duration-300"
                  >
                    {t.submit}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Referral;