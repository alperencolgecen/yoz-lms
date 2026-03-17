# Contributing to YOZ-LMS

Thank you for your interest in contributing to YOZ-LMS! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that the bug is already known. If the issue doesn't exist, create a new issue using the bug report template.

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide a clear and detailed description of the enhancement you have in mind.

### Pull Requests

Pull requests are the primary way to contribute code to YOZ-LMS. Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Ensure all tests pass**
6. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Create a Pull Request**

## 📋 Development Setup

### Prerequisites

- .NET 10.0 SDK
- Visual Studio 2022 or VS Code
- Git

### Setup Steps

1. Clone your forked repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOZ-LMS.git
   cd YOZ-LMS
   ```

2. Navigate to the solution directory
   ```bash
   cd YOZ-LMS
   ```

3. Restore dependencies
   ```bash
   dotnet restore
   ```

4. Build the solution
   ```bash
   dotnet build
   ```

5. Run the application
   ```bash
   # Start the server
   dotnet run --project YOZ-LMS.Server
   
   # Start the client (in another terminal)
   dotnet run --project YOZ-LMS.Client
   ```

## 🏗 Project Structure

```
YOZ-LMS/
├── YOZ-LMS.Server/          # ASP.NET Core Web API
│   ├── Controllers/         # API controllers
│   ├── Models/             # Server models
│   └── Program.cs          # Server startup
├── YOZ-LMS.Client/          # Blazor WebAssembly
│   ├── Pages/              # Razor components
│   ├── Components/         # Reusable components
│   └── Program.cs          # Client startup
├── YOZ-LMS.Shared/         # Shared models and services
│   ├── Models/             # Shared data models
│   └── Services/           # Shared services
└── Tests/                  # Test projects
```

## 📝 Coding Standards

### C# Guidelines

We follow the [Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions):

- Use PascalCase for type names and method names
- Use camelCase for parameters and local variables
- Use meaningful variable and method names
- Add XML documentation for public methods and classes

### Example

```csharp
/// <summary>
/// Generates learning content using the Gemini API.
/// </summary>
/// <param name="request">The learning request containing prompt, language, and level.</param>
/// <returns>A task that represents the asynchronous operation containing the learning response.</returns>
public async Task<LearningResponse> GenerateLearningContentAsync(LearningRequest request)
{
    // Implementation here
}
```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Examples

```bash
feat: add multi-language support for content generation
fix: resolve API timeout issue with large prompts
docs: update API documentation
test: add unit tests for GeminiService
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
dotnet test

# Run tests with coverage
dotnet test --collect:"XPlat Code Coverage"

# Run specific test project
dotnet test YOZ-LMS.Tests
```

### Writing Tests

- Write unit tests for all new features
- Aim for high code coverage (>80%)
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

### Example

```csharp
[Test]
public async Task GenerateLearningContentAsync_WithValidRequest_ReturnsLearningResponse()
{
    // Arrange
    var request = new LearningRequest
    {
        Prompt = "Test prompt",
        Language = "English",
        Level = "Beginner"
    };
    
    // Act
    var result = await _geminiService.GenerateLearningContentAsync(request);
    
    // Assert
    Assert.IsNotNull(result);
    Assert.AreEqual(request.Language, result.Language);
    Assert.AreEqual(request.Level, result.Level);
}
```

## 📖 Documentation

### API Documentation

- Use XML comments for all public APIs
- Update README.md for user-facing changes
- Add inline comments for complex logic

### Code Examples

Provide clear examples in your documentation:

```csharp
// Example usage
var service = new GeminiService(httpClient, configuration);
var request = new LearningRequest 
{ 
    Prompt = "Learn C#", 
    Language = "English", 
    Level = "Beginner" 
};
var response = await service.GenerateLearningContentAsync(request);
```

## 🔍 Code Review Process

### Before Submitting

1. **Self-review your code**
2. **Ensure all tests pass**
3. **Update documentation**
4. **Follow coding standards**
5. **Keep changes small and focused**

### Review Guidelines

Reviewers will check for:

- Code quality and maintainability
- Adherence to coding standards
- Test coverage
- Documentation completeness
- Performance implications

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped
- [ ] Release notes are prepared

## 💡 Getting Help

If you need help with contributing:

1. Check existing [Issues](https://github.com/username/YOZ-LMS/issues)
2. Start a [Discussion](https://github.com/username/YOZ-LMS/discussions)
3. Contact maintainers

## 📜 License

By contributing to YOZ-LMS, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## 🙏 Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- Annual contributor appreciation post

---

Thank you for contributing to YOZ-LMS! 🎉
