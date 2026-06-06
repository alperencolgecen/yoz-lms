# YOZ-LMS - AI-Powered Learning Management System

> **IMPORTANT LEGAL NOTICE**: This project uses enhanced MIT license with commercial restrictions. Read [LEGAL_NOTICE.md](LEGAL_NOTICE.md) before using.

Modern ASP.NET Core ve Google Gemini API ile güçlendirilmiş, çok dilli akıllı öğrenme yönetim sistemi.

---

## 📖 Hakkında

YOZ-LMS, Google Gemini AI tarafından desteklenen bir öğrenme yönetim sistemidir. Otomatik içerik üretimi, kişiselleştirilmiş öğrenme yolları ve gerçek zamanlı analiz sunar.

### ✨ Özellikler

- **AI Destekli İçerik Üretimi:** Gemini API ile otomatik ders materyali oluşturma
- **Çok Dilli Destek:** 20+ dil desteği
- **Seviye Bazlı:** 4 farklı öğrenme seviyesi (Beginner -> Expert)
- **Akıllı Test Sistemi:** Otomatik soru üretimi, çoklu format, anlık feedback
- **Modern UI:** Tailwind CSS ile responsive tasarım
- **Gerçek Zamanlı:** SignalR ile canlı içerik güncellemeleri

---

## 🛠 Teknoloji Yığını

### 🔧 Backend
- ASP.NET Core 10.0
- C# 10.0
- Entity Framework Core
- SignalR

### 🎨 Frontend
- Blazor WebAssembly
- Tailwind CSS
- JavaScript ES6+

### 🤖 AI & API
- Google Gemini API
- RESTful API
- JSON Serialization

### 📦 Altyapı
- Docker
- Azure/AWS
- GitHub Actions

---

## ⚡ Kurulum

### 📋 Gereksinimler
- [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) veya [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### 🚀 Adımlar

```bash
# Repository'yi klonla
git clone https://github.com/username/YOZ-LMS.git
cd YOZ-LMS

# API Key yapılandırması
# Google AI Studio'dan ücretsiz API key al: https://makersuite.google.com/app/apikey
# YOZ-LMS.Server/appsettings.json dosyasına ekle:
```

```json
{
  "Gemini": {
    "ApiKey": "API_KEYINIZI_BURAYA_YAZIN"
  }
}
```

```bash
# Projeyi çalıştır
dotnet run --project YOZ-LMS.Server
# Ayrı terminalde:
dotnet run --project YOZ-LMS.Client
```

Tarayıcıda aç: [http://localhost:5034](http://localhost:5034)

### 📦 Build & Deploy

```bash
# Solution build
dotnet build YOZ-LMS.sln

# Production publish
dotnet publish -c Release -o ./publish

# Docker
docker build -t yoz-lms .
docker run -p 80:80 yoz-lms
```

---

## 📂 Proje Yapısı

```
YOZ-LMS/
  YOZ-LMS.Server/          # ASP.NET Core Web API
    Controllers/           # API Controllers
    Program.cs             # Server configuration
    appsettings.json       # Configuration
  YOZ-LMS.Client/          # Blazor WebAssembly
    Pages/                 # Razor Components
    wwwroot/               # Static files
    Program.cs             # Client configuration
  YOZ-LMS.Shared/          # Shared Library
    Models/                # Data Models
    Services/              # Gemini Service
  README.md
  LICENSE
  YOZ-LMS.slnx
```

### 🔌 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/learning/generate` | İçerik üretimi |
| GET | `/api/learning/languages` | Desteklenen diller |
| GET | `/api/learning/levels` | Öğrenme seviyeleri |
| GET | `/health` | Health check |

### 📝 API Kullanımı

```bash
curl -X POST http://localhost:5223/api/learning/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Python programlama temelleri",
    "language": "Turkish",
    "level": "Beginner"
  }'
```

---

## 📄 Lisans

Bu proje [Enhanced MIT License](LICENSE-ENHANCED.md) altında dağıtılmaktadır. Standart MIT lisansı DEĞİLDİR, ek ticari kullanım kısıtlamaları içerir.

---

✍️ Prepared by Alperen Çölgeçen
