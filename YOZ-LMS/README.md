# YOZ-LMS - Akıllı Öğrenme Yönetim Sistemi

Modern ASP.NET Core ve Blazor tabanlı, Gemini destekli öğrenme yönetim sistemi.

## 🚀 Özellikler

- **Otomatik İçerik Üretimi** - Google Gemini API ile ders içeriği oluşturma
- **Çok Dilli Destek** - 20+ dil (Türkçe, İngilizce, Almanca, vb.)
- **Seviye Bazlı Öğrenme** - 4 farklı seviye (Beginner → Expert)
- **Akıllı Soru-Cevap Sistemi** - Otomatik soru üretimi ve anlık feedback
- **Modern Tasarım** - Tailwind CSS ile responsive, gradient UI
- **Real-time Loading** - Smooth loading states ve error handling

## 🛠 Teknolojiler

- **Backend:** ASP.NET Core 10.0
- **Frontend:** Blazor WebAssembly
- **Content API:** Google Gemini API
- **UI:** Tailwind CSS
- **Language:** C# 10.0

## 📋 Kurulum

### Gereksinimler
- .NET 10.0 SDK
- Visual Studio 2022 veya VS Code
- **Kendi Gemini API Key'iniz**

### ⚠️ ÖNEMLİ: API Key Yapılandırması

**Bu proje kendi Gemini API key'inizi gerektirir:**

1. [Google AI Studio](https://makersuite.google.com/app/apikey) gidin
2. Ücretsiz API key oluşturun
3. `YOZ-LMS.Server/appsettings.json` dosyasında güncelleyin:

```json
{
  "Gemini": {
    "ApiKey": "BURAYA_KENDI_API_KEYINIZI_YAZIN"
  }
}
```

**Not:** API key olmadan uygulama çalışmaz!

### Adımlar

1. **Repository klonlayın:**
   ```bash
   git clone https://github.com/kullanici-adiniz/YOZ-LMS.git
   cd YOZ-LMS
   ```

2. **API Key'i yapılandırın:**
   - `YOZ-LMS.Server/appsettings.json` dosyasını açın
   - `Gemini:ApiKey` değerini kendi API key'inizle değiştirin:
   ```json
   "Gemini": {
     "ApiKey": "BURAYA_KENDI_API_KEYINIZI_YAZIN"
   }
   ```

3. **Projeyi çalıştırın:**
   ```bash
   # Backend'i başlat
   dotnet run --project YOZ-LMS.Server
   
   # Frontend'i başlat (ayrı terminal)
   dotnet run --project YOZ-LMS.Client
   ```

4. **Uygulamayı açın:**
   - Frontend: http://localhost:5034
   - Backend API: http://localhost:5223

## 🔧 Yapılandırma

### API Key Alma
1. [Google AI Studio](https://makersuite.google.com/app/apikey) gidin
2. Yeni API key oluşturun
3. `appsettings.json` dosyasında güncelleyin

### Port Değiştirme
- `YOZ-LMS.Server/Properties/launchSettings.json`
- `YOZ-LMS.Client/Properties/launchSettings.json`

## 📱 Kullanım

1. Ana sayfada öğrenmek istediğiniz konuyu girin
2. Dil ve seviye seçin
3. "Öğren" butonuna tıklayın
4. Gemini içerik üretsin
5. Test sorularını çözün

## 🏗 Proje Yapısı

```
YOZ-LMS/
├── YOZ-LMS.Server/          # ASP.NET Core Web API
│   ├── Controllers/        # API Controllers
│   ├── Program.cs          # Server başlangıç
│   └── appsettings.json    # Konfigürasyon
├── YOZ-LMS.Client/         # Blazor WebAssembly
│   ├── Pages/              # Razor Components
│   ├── wwwroot/            # Static files
│   └── Program.cs          # Client başlangıç
├── YOZ-LMS.Shared/         # Shared Library
│   ├── Models/             # Data Models
│   └── Services/           # Shared Services
└── YOZ-LMS.sln             # Solution file
```

## 🔒 Güvenlik

- ✅ API keys `appsettings.json` içinde
- ✅ Sensitive dosyalar `.gitignore`'da
- ✅ CORS policy yapılandırılmış
- ✅ HTTPS redirection aktif

## 🤝 Katkı

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında dağıtılmaktadır.

## 🙏 Teşekkürler

- [Google Gemini API](https://ai.google.dev/) - Otomatik içerik üretimi
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core/) - Modern web framework
- [Blazor](https://blazor.net/) - WebAssembly framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 İletişim

- [GitHub Issues](https://github.com/kullanici-adiniz/YOZ-LMS/issues) - Bug ve feature requests
- [Discussions](https://github.com/kullanici-adiniz/YOZ-LMS/discussions) - Genel tartışmalar

---

**⭐ Eğer bu proje hoşunuza gittiyse star vermeyi unutmayın!**
