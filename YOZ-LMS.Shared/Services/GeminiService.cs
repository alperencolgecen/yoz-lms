using YOZ_LMS.Shared.Models;
using Microsoft.Extensions.Configuration;

namespace YOZ_LMS.Shared.Services
{
    public interface IGeminiService
    {
        Task<LearningResponse> GenerateLearningContentAsync(LearningRequest request);
    }

    public class GeminiService : IGeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public GeminiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Gemini:ApiKey"] ??
                      throw new ArgumentNullException("Gemini API key not found in configuration");
            _httpClient.BaseAddress = new Uri("https://generativelanguage.googleapis.com/");
        }

        public async Task<LearningResponse> GenerateLearningContentAsync(LearningRequest request)
        {
            var prompt = GeneratePrompt(request.Prompt, request.Language, request.Level);

            var geminiRequest = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(geminiRequest);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"v1/models/gemini-pro:generateContent?key={_apiKey}", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Gemini API error: {response.StatusCode} - {errorContent}");
            }

            var responseJson = await response.Content.ReadAsStringAsync();

            // Parse the response dynamically
            var responseObject = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseJson);

            if (responseObject?.candidates == null)
            {
                throw new Exception("Invalid response from Gemini API");
            }

            var contentText = responseObject.candidates[0].content.parts[0].text.ToString();

            // Clean the response and parse as JSON
            contentText = contentText.Replace("```json", "").Replace("```", "").Trim();

            try
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<LearningResponse>(contentText)
                       ?? throw new Exception("Failed to parse learning response");
            }
            catch
            {
                throw new Exception("Failed to parse Gemini response as learning content");
            }
        }

        private string GeneratePrompt(string search, string language, string level)
        {
            var randomSeed = new Random().Next(10000);

            return $@"
Lütfen aşağıdaki JSON formatına uyan bir çıktı üret. Yanıtınızda ekstra açıklama, yorum veya metin bulunmasın; sadece belirtilen JSON yapısını kullan. 

**ÖNEMLİ: TÜM YANITIN {language} DİLİNDE OLMALIDIR!**
**REFERANS KODU: {randomSeed}** (Bu içerik her seferinde benzersiz olmalıdır).
** SADECE JSON FORMATI VERİLECEK {{}} ŞEKİLDE kesinlikle ``` gibi içine koyulmuyacaktır. Sadece raw JSON olsun. Başka hiçbir yazı vb. olmayacak
**YARATICILIK VE ÇEŞİTLİLİK TALİMATI:**
- Eğer bu konu hakkında daha önce bilgi verdiysen, bu sefer konunun **farklı bir yönüne, spesifik bir alt dalına veya az bilinen ilginç detaylarına** odaklan.
- Soruları daha önce sorulmamış, farklı mantıklar yürüten ve {level} seviyesine uygun şekilde çeşitlendir.
- Asla bir önceki yanıtın kelimesi kelimesine aynısını üretme.
Kullanıcının 'search', 'language' ve 'level' verilerini giriş olarak al ve bu verilere göre **{language} dilinde** ve **{level} zorluk seviyesinde** tek bir içerik oluştur.
'search' verisi,kullanıcı hakkında önemli detaylar içerebilir. Soruyu sorma tarzını, cevap verirken değerlendir.
Oluşturduğun içerik TTS kuralarına uygun bir şekilde olsun, parantez içinde veriler ve kısaltmalar içermesin. Ayrıca kanunlara ve genel ahlaka aykırı;insanlara, 
hayvanlara veya bitkilere zararı olabilecek verileri asla vermeyeceksin.

JSON'da tek tırnak (') kullanılmaz, çift tırnak ("") kullanılır.

**JSON formatında dikkat edilmesi gerekenler:**  
- **DİL:** Tüm içerik, sorular, cevaplar {language} dilinde olmalıdır.
- **ZORLUK SEVİYESİ:** İçerik {level} seviyesine uygun olmalıdır.
- **""detail"" alanı:**  
  - Konuyla ilgili **kapsamlı, öğretici ve derinlemesine bir açıklama** içermelidir ({language} dilinde)
  - Açıklamada **tarihçe, kullanım alanları, örnekler ve önemli noktalar** yer almalıdır.
  - Metin **en az 300 kelime uzunluğunda** olmalıdır.
  - İçerik {level} seviyesine göre ayarlanmalıdır (Beginner = basit, Expert = ileri seviye)
  
- **""questions"" alanı:**  
  - **İlk soru:** {language} dilinde tek kelimelik ve kısa cevap gerektiren boşluk doldurma formatında oluşturun. Yazımı kolay, anlaşılır ve net bir şekilde hazırlanmalıdır
  - **İkinci soru:** {language} dilinde test formatında olmalı, **birden fazla seçenek içermeli** ve doğru cevabın indeks numarası belirtilmelidir.
  - Her iki soru da {level} seviyesine uygun zorlukta olmalıdır.
  - **explanation alanı:** Her soru için, yanlış cevap durumunda kullanıcıya konuyu açıklayacak kısa ve net bir bilgi notu ekle.

---

**JSON Formatı:**  

{{
    ""search"": ""{search}"",
    ""level"": ""{level}"",
    ""language"": ""{language}"",
    ""results"": {{
        ""content"": {{
            ""header"": ""<{language} dilinde özet veya başlık bilgisi>"",
            ""detail"": ""<{language} dilinde kapsamlı ve öğretici açıklama - {level} seviyesine uygun>"",
            ""sources"": [""<Kaynak URL 1>"", ""<Kaynak URL 2>""],
            ""questions"": {{
                ""0"": {{
                    ""questionText"": ""<{language} dilinde klasik soru - {level} seviyesi>"",
                    ""answer"": ""<{language} dilinde doğru cevap>"",
                    ""explanation"": ""<{language} dilinde açıklama>""
                }},
                ""1"": {{
                    ""questionText"": ""<{language} dilinde test sorusu - {level} seviyesi>"",
                    ""answers"": {{
                        ""0"": ""<{language} dilinde şık 1>"",
                        ""1"": ""<{language} dilinde şık 2>"",
                        ""2"": ""<{language} dilinde şık 3>"",
                        ""3"": ""<{language} dilinde şık 4>"",
                        ""4"": ""<{language} dilinde şık 5>""
                    }},
                    ""correctAnswer"": 0,
                    ""explanation"": ""<{language} dilinde açıklama>""
                }}
            }}
        }}
    }}
}}

**TEKRAR HATIRLATMA:** Tüm yanıt {language} dilinde ve {level} seviyesinde olmalıdır!";
        }
    }
}
