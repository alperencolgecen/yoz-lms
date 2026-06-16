namespace YOZ_LMS.Shared.Models;

public class LearningRequest
{
    public string Prompt { get; set; } = string.Empty;
    public string Language { get; set; } = "Turkish";
    public string Level { get; set; } = "Beginner";
}

public class LearningResponse
{
    public string Search { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public LearningResults Results { get; set; } = new();
}

public class LearningResults
{
    public LearningContent Content { get; set; } = new();
}

public class LearningContent
{
    public string Header { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
    public List<string> Sources { get; set; } = new();
    public Dictionary<string, Question> Questions { get; set; } = new();
}

public class Question
{
    public string QuestionText { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public Dictionary<string, string> Answers { get; set; } = new();
    public int CorrectAnswer { get; set; }
    public string Explanation { get; set; } = string.Empty;
}


