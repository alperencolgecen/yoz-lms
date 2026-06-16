using YOZ_LMS.Shared.Models;
using Microsoft.Extensions.Configuration;

namespace YOZ_LMS.Shared.Services
{
    public interface IOpenRouterService
    {
        Task<LearningResponse> GenerateLearningContentAsync(LearningRequest request);
    }

    public class OpenRouterService : IOpenRouterService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _model;

        public OpenRouterService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["HuggingFace:ApiKey"] ??
                      throw new ArgumentNullException("HuggingFace API key not found in configuration");
            _model = configuration["HuggingFace:Model"] ?? "mistralai/Mistral-7B-Instruct-v0.3";
            _httpClient.BaseAddress = new Uri("https://router.huggingface.co/");
        }

        public async Task<LearningResponse> GenerateLearningContentAsync(LearningRequest request)
        {
            var prompt = GeneratePrompt(request.Prompt, request.Language, request.Level);

            var hfRequest = new
            {
                model = _model,
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                max_tokens = 4096,
                temperature = 0.7
            };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(hfRequest);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, "hf/v1/chat/completions")
            {
                Content = content
            };
            requestMessage.Headers.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.SendAsync(requestMessage);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"HuggingFace API error: {response.StatusCode} - {errorContent}");
            }

            var responseJson = await response.Content.ReadAsStringAsync();
            var responseObject = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseJson);

            if (responseObject?.choices == null)
            {
                throw new Exception("Invalid response from HuggingFace API");
            }

            var contentText = responseObject.choices[0].message.content.ToString();

            contentText = contentText.Replace("```json", "").Replace("```", "").Trim();

            try
            {
                return Newtonsoft.Json.JsonConvert.DeserializeObject<LearningResponse>(contentText)
                       ?? throw new Exception("Failed to parse learning response");
            }
            catch
            {
                throw new Exception("Failed to parse HuggingFace response as learning content");
            }
        }

        private string GeneratePrompt(string search, string language, string level)
        {
            var randomSeed = new Random().Next(10000);

            return $@"[INST] Lütfen aşağıdaki JSON formatına uyan bir çıktı üret. Yanıtınızda ekstra açıklama, yorum veya metin bulunmasın; sadece belirtilen JSON yapısını kullan.

ÖNEMLİ: TÜM YANITIN {language} DİLİNDE OLMALIDIR!
REFERANS KODU: {randomSeed} (Bu içerik her seferinde benzersiz olmalıdır).
SADECE JSON FORMATI VERİLECEK, kesinlikle ``` gibi içine koyulmayacaktır. Sadece raw JSON olsun.

JSON formatında dikkat edilmesi gerekenler:
- DİL: Tüm içerik, sorular, cevaplar {language} dilinde olmalıdır.
- ZORLUK SEVİYESİ: İçerik {level} seviyesine uygun olmalıdır.
- detail alanı: Konuyla ilgili kapsamlı, öğretici ve derinlemesine bir açıklama içermelidir. Metin en az 300 kelime uzunluğunda olmalıdır.
- questions alanı: İlk soru klasik soru formatında, ikinci soru test formatında (5 şık) olmalıdır.

JSON Formatı:
{{
    ""search"": ""{search}"",
    ""level"": ""{level}"",
    ""language"": ""{language}"",
    ""results"": {{
        ""content"": {{
            ""header"": ""<özet veya başlık>"",
            ""detail"": ""<kapsamlı açıklama>"",
            ""sources"": [""<Kaynak>"", ""<Kaynak>""],
            ""questions"": {{
                ""0"": {{
                    ""questionText"": ""<klasik soru>"",
                    ""answer"": ""<doğru cevap>"",
                    ""explanation"": ""<açıklama>""
                }},
                ""1"": {{
                    ""questionText"": ""<test sorusu>"",
                    ""answers"": {{
                        ""0"": ""<şık 1>"",
                        ""1"": ""<şık 2>"",
                        ""2"": ""<şık 3>"",
                        ""3"": ""<şık 4>"",
                        ""4"": ""<şık 5>""
                    }},
                    ""correctAnswer"": 0,
                    ""explanation"": ""<açıklama>""
                }}
            }}
        }}
    }}
}} [/INST]";
        }
    }
}
