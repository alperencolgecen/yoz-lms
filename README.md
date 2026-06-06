# YOZ-LMS - AI-Powered Learning Management System

> **IMPORTANT LEGAL NOTICE**: This project uses enhanced MIT license with commercial restrictions. Read [LEGAL_NOTICE.md](LEGAL_NOTICE.md) before using.

Modern ASP.NET Core ve Google Gemini API ile güçlendirilmiş, çok dilli akıllı öğrenme yönetim sistemi.

---

## Hakkinda

YOZ-LMS, Google Gemini AI tarafindan desteklenen bir ogrenme yonetim sistemidir. Otomatik icerik uretimi, kisisellestirilmis ogrenme yollari ve gercek zamanli analiz sunar.

### Ozellikler

- **AI Destekli Icerik Uretimi:** Gemini API ile otomatik ders materyali olusturma
- **Cok Dilli Destek:** 20+ dil desteği
- **Seviye Bazli:** 4 farkli ogrenme seviyesi (Beginner -> Expert)
- **Akilli Test Sistemi:** Otomatik soru uretimi, coklu format, anlik feedback
- **Modern UI:** Tailwind CSS ile responsive tasarim
- **Gercek Zamanli:** SignalR ile canli icerik guncellemeleri

---

## Teknoloji Yigini

### Backend
- ASP.NET Core 10.0
- C# 10.0
- Entity Framework Core
- SignalR

### Frontend
- Blazor WebAssembly
- Tailwind CSS
- JavaScript ES6+

### AI & API
- Google Gemini API
- RESTful API
- JSON Serialization

### Altyapi
- Docker
- Azure/AWS
- GitHub Actions

---

## Kurulum

### Gereksinimler
- [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) veya [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### Adimlar

```bash
# Repository'yi klonla
git clone https://github.com/username/YOZ-LMS.git
cd YOZ-LMS

# API Key yapilandirmasi
# Google AI Studio'dan ucretsiz API key al: https://makersuite.google.com/app/apikey
# YOZ-LMS.Server/appsettings.json dosyasina ekle:
```

```json
{
  "Gemini": {
    "ApiKey": "API_KEYINIZI_BURAYA_YAZIN"
  }
}
```

```bash
# Projeyi calistir
dotnet run --project YOZ-LMS.Server
# Ayri terminalde:
dotnet run --project YOZ-LMS.Client
```

Tarayicida ac: [http://localhost:5034](http://localhost:5034)

### Build & Deploy

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

## Proje Yapisi

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

### API Endpoints

| Method | Endpoint | Aciklama |
|--------|----------|----------|
| POST | `/api/learning/generate` | Icerik uretimi |
| GET | `/api/learning/languages` | Desteklenen diller |
| GET | `/api/learning/levels` | Ogrenme seviyeleri |
| GET | `/health` | Health check |

### API Kullanimi

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

## Lisans

Bu proje [Enhanced MIT License](LICENSE-ENHANCED.md) altinda dagitilmaktadir. Standart MIT lisansi DEGILDIR, ek ticari kullanim kisitlamalari icerir.

---

Prepared by Alperen Colgecen
