# ÖNEMLİ: BU DOSYAYI GITHUB'A YÜKLEMEYİN!

# YOZ-LMS Kurulum Talimatları

## 1. API Key Yapılandırması

`YOZ-LMS.Server/appsettings.json` dosyasında Gemini API key'i güncelleyin:

```json
{
  "Gemini": {
    "ApiKey": "BURAYA_KENDI_API_KEYINIZI_YAZIN",
    "BaseUrl": "https://generativelanguage.googleapis.com/"
  }
}
```

## 2. Port Ayarları (İsteğe Bağlı)

Backend portunu değiştirmek için:
`YOZ-LMS.Server/Properties/launchSettings.json`

Frontend portunu değiştirmek için:
`YOZ-LMS.Client/Properties/launchSettings.json`

## 3. Ek Konfigürasyon

- Production ortamı için `appsettings.Production.json` oluşturun
- User Secrets kullanın: `dotnet user-secrets set "Gemini:ApiKey" "your-key"`
- Environment variables kullanabilirsiniz

## 4. Güvenlik Notları

- ✅ API key asla GitHub'a yüklenmemeli
- ✅ Production'da User Secrets veya Environment Variables kullanın
- ✅ HTTPS her zaman aktif olmalı
- ✅ CORS policy'i kısıtlayın

## 5. Deployment

### Azure App Service
```bash
dotnet publish -c Release -o ./publish
```

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0
COPY ./publish /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["dotnet", "YOZ-LMS.Server.dll"]
```

### IIS
- Web.config yapılandırın
- Application Pool ayarlayın
- HTTPS sertifikası ekleyin
