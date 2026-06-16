using Microsoft.AspNetCore.Mvc;
using YOZ_LMS.Shared.Services;
using YOZ_LMS.Shared.Models;

namespace YOZ_LMS.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LearningController : ControllerBase
{
    private readonly IOpenRouterService _openRouterService;
    private readonly ILogger<LearningController> _logger;

    public LearningController(IOpenRouterService openRouterService, ILogger<LearningController> logger)
    {
        _openRouterService = openRouterService;
        _logger = logger;
    }

    [HttpPost("generate")]
    public async Task<ActionResult<LearningResponse>> GenerateContent([FromBody] LearningRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.Prompt))
            {
                return BadRequest(new { error = "Prompt is required" });
            }

            _logger.LogInformation("Generating content for: {Prompt}, Language: {Language}, Level: {Level}", 
                request.Prompt, request.Language, request.Level);

            var response = await _openRouterService.GenerateLearningContentAsync(request);
            
            _logger.LogInformation("Successfully generated content for: {Prompt}", request.Prompt);
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating content for prompt: {Prompt}", request.Prompt);
            return StatusCode(500, new { error = "Internal server error", message = ex.Message });
        }
    }

    [HttpGet("languages")]
    public ActionResult<List<string>> GetSupportedLanguages()
    {
        var languages = new List<string>
        {
            "Turkish", "English", "German", "French", "Spanish", "Italian",
            "Portuguese", "Russian", "Japanese", "Korean", "Chinese", "Arabic",
            "Hindi", "Greek", "Polish", "Swedish", "Norwegian", "Finnish", 
            "Danish", "Dutch"
        };

        return Ok(languages);
    }

    [HttpGet("levels")]
    public ActionResult<List<string>> GetSupportedLevels()
    {
        var levels = new List<string> { "Beginner", "Intermediate", "Advanced", "Expert" };
        return Ok(levels);
    }
}
