using System.Diagnostics;
using System.Text;

namespace TestGenAI.Tool;

class Program
{
    static async Task<int> Main(string[] args)
    {
        if (args.Length == 0)
        {
            ShowHelp();
            return 0;
        }

        var command = args[0].ToLower();

        return command switch
        {
            "init" => await HandleInit(args),
            "generate" => await HandleGenerate(args),
            "run" => HandleRun(args),
            "help" or "--help" or "-h" => ShowHelp(),
            _ => ShowHelp()
        };
    }

    static int ShowHelp()
    {
        var help = """
            TestGen AI - AI-powered unit test generator for .NET

            Usage:
              testgen init              Initialize testgen in your project
              testgen generate <type>   Generate test prompt (xunit, nunit, auto)
              testgen run               Show how to run tests
              testgen help              Show this help message

            Examples:
              testgen init
              testgen generate xunit
              testgen generate nunit
              testgen generate auto    # Auto-detect framework

            For more information, visit: https://github.com/DivyamPant2803/testgen-ai
            """;

        Console.WriteLine(help);
        return 0;
    }

    static Task<int> HandleInit(string[] args)
    {
        Console.WriteLine("🚀 Initializing TestGen AI...\n");

        var projectRoot = Directory.GetCurrentDirectory();
        var detectedFramework = DetectFramework(projectRoot);
        var testDir = detectedFramework switch
        {
            "xunit" or "nunit" => "Tests",
            _ => "__tests__"
        };

        Console.WriteLine($"📋 Detected framework: {detectedFramework}");
        Console.WriteLine($"📁 Test directory: {testDir}\n");

        // Create test directory if it doesn't exist
        if (!Directory.Exists(testDir))
        {
            Directory.CreateDirectory(testDir);
            Console.WriteLine($"✅ Created test directory: {testDir}");
        }
        else
        {
            Console.WriteLine($"✅ Test directory already exists: {testDir}");
        }

        Console.WriteLine("\n✅ Setup complete!");
        Console.WriteLine("\n📝 Next steps:");
        Console.WriteLine("   1. Use prompts in your AI IDE:");
        Console.WriteLine("      \"Using TestGen AI prompts, generate unit tests for ClassName\"");
        Console.WriteLine("   2. Or generate a prompt:");
        Console.WriteLine("      testgen generate xunit");
        Console.WriteLine("\n💡 Tip: Install the npm package for full features:");
        Console.WriteLine("   npm install -D testgen-ai-cli");

        return Task.FromResult(0);
    }

    static Task<int> HandleGenerate(string[] args)
    {
        if (args.Length < 2)
        {
            Console.WriteLine("❌ Please specify a framework: xunit, nunit, or auto");
            Console.WriteLine("   Example: testgen generate xunit");
            return Task.FromResult(1);
        }

        var frameworkArg = args[1].ToLower();
        var projectRoot = Directory.GetCurrentDirectory();
        var detectedFramework = DetectFramework(projectRoot);

        var framework = frameworkArg switch
        {
            "auto" => detectedFramework,
            "xunit" => "xunit",
            "nunit" => "nunit",
            _ => detectedFramework
        };

        if (framework == "unknown")
        {
            Console.WriteLine("❌ Could not detect testing framework.");
            Console.WriteLine("   Please specify: testgen generate xunit or testgen generate nunit");
            return Task.FromResult(1);
        }

        if (frameworkArg == "auto" && framework != "unknown")
        {
            Console.WriteLine($"📋 Auto-detected: {framework}\n");
        }

        var prompt = GeneratePrompt(framework);
        
        Console.WriteLine("📝 Unit Test Generation Prompt:\n");
        Console.WriteLine(new string('─', 60));
        Console.WriteLine(prompt);
        Console.WriteLine(new string('─', 60));
        Console.WriteLine("\n💡 Copy this prompt and use it with your AI assistant");
        Console.WriteLine("   Example: \"Using this prompt, generate unit tests for ClassName\"");
        Console.WriteLine($"\n📚 Framework: {framework}");

        return Task.FromResult(0);
    }

    static int HandleRun(string[] args)
    {
        Console.WriteLine("🧪 Running unit tests...\n");
        Console.WriteLine("💡 Run tests using:");
        Console.WriteLine("   dotnet test");
        Console.WriteLine("\n   Or for specific projects:");
        Console.WriteLine("   dotnet test Tests/YourProject.Tests.csproj");
        return 0;
    }

    static string DetectFramework(string projectRoot)
    {
        // Check for .csproj files
        var csprojFiles = Directory.GetFiles(projectRoot, "*.csproj", SearchOption.AllDirectories);
        
        foreach (var file in csprojFiles)
        {
            var content = File.ReadAllText(file);
            if (content.Contains("xunit", StringComparison.OrdinalIgnoreCase) || 
                content.Contains("Xunit", StringComparison.OrdinalIgnoreCase))
            {
                return "xunit";
            }
            if (content.Contains("nunit", StringComparison.OrdinalIgnoreCase) || 
                content.Contains("NUnit", StringComparison.OrdinalIgnoreCase))
            {
                return "nunit";
            }
            if (content.Contains("MSTest", StringComparison.OrdinalIgnoreCase) || 
                content.Contains("mstest", StringComparison.OrdinalIgnoreCase))
            {
                return "mstest";
            }
        }

        // Check test directories
        var testDirs = new[] { "Tests", "tests", "Test", "test" };
        foreach (var dir in testDirs)
        {
            var testDir = Path.Combine(projectRoot, dir);
            if (Directory.Exists(testDir))
            {
                var testCsproj = Directory.GetFiles(testDir, "*.csproj", SearchOption.AllDirectories);
                foreach (var file in testCsproj)
                {
                    var content = File.ReadAllText(file);
                    if (content.Contains("xunit", StringComparison.OrdinalIgnoreCase))
                        return "xunit";
                    if (content.Contains("nunit", StringComparison.OrdinalIgnoreCase))
                        return "nunit";
                }
            }
        }

        return "unknown";
    }

    static string GeneratePrompt(string framework)
    {
        return framework switch
        {
            "xunit" => GetXUnitPrompt(),
            "nunit" => GetNUnitPrompt(),
            _ => GetGenericPrompt()
        };
    }

    static string GetXUnitPrompt()
    {
        return """
            You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET class/method using xUnit.

            **Source Information:**
            - Source File: {SOURCE_FILE}
            - Class Name: {CLASS_NAME}
            - Method Name: {METHOD_NAME}
            - Description: {DESCRIPTION}

            **Test Requirements:**
            1. Use xUnit as the testing framework
            2. Test all public methods
            3. Test edge cases, error scenarios, and boundary conditions
            4. Use Moq or NSubstitute for mocking dependencies
            5. Follow xUnit and .NET testing best practices

            **xUnit Best Practices:**
            - Use `[Fact]` for parameterless tests
            - Use `[Theory]` with `[InlineData]` for parameterized tests
            - Use `IClassFixture<T>` for shared test context
            - Mock dependencies using Moq: `var mock = new Mock<IDependency>()`
            - Use `Assert` class methods: `Assert.Equal`, `Assert.NotNull`, etc.
            - Use `Assert.Throws` for exception testing
            - Follow Arrange-Act-Assert (AAA) pattern

            **Test Structure:**
            ```csharp
            using Xunit;
            using Moq;

            namespace Tests
            {
                public class ClassNameTests
                {
                    private readonly Mock<IDependency> _mockDependency;
                    private readonly ClassName _sut;

                    public ClassNameTests()
                    {
                        _mockDependency = new Mock<IDependency>();
                        _sut = new ClassName(_mockDependency.Object);
                    }

                    [Fact]
                    public void MethodName_Should_ExpectedBehavior()
                    {
                        // Arrange
                        // Act
                        // Assert
                    }
                }
            }
            ```

            Generate comprehensive unit tests following xUnit and .NET best practices.
            """;
    }

    static string GetNUnitPrompt()
    {
        return """
            You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET class/method using NUnit.

            **Source Information:**
            - Source File: {SOURCE_FILE}
            - Class Name: {CLASS_NAME}
            - Method Name: {METHOD_NAME}
            - Description: {DESCRIPTION}

            **Test Requirements:**
            1. Use NUnit as the testing framework
            2. Test all public methods
            3. Test edge cases, error scenarios, and boundary conditions
            4. Use Moq or NSubstitute for mocking dependencies
            5. Follow NUnit and .NET testing best practices

            **NUnit Best Practices:**
            - Use `[Test]` attribute for test methods
            - Use `[TestCase]` for parameterized tests
            - Use `[SetUp]` and `[TearDown]` for test setup/cleanup
            - Use `Assert` class: `Assert.AreEqual`, `Assert.IsNotNull`, etc.
            - Use `Assert.Throws` for exception testing
            - Follow Arrange-Act-Assert pattern

            **Test Structure:**
            ```csharp
            using NUnit.Framework;
            using Moq;

            namespace Tests
            {
                [TestFixture]
                public class ClassNameTests
                {
                    private Mock<IDependency> _mockDependency;
                    private ClassName _sut;

                    [SetUp]
                    public void SetUp()
                    {
                        _mockDependency = new Mock<IDependency>();
                        _sut = new ClassName(_mockDependency.Object);
                    }

                    [Test]
                    public void MethodName_Should_ExpectedBehavior()
                    {
                        // Arrange, Act, Assert
                    }
                }
            }
            ```

            Generate comprehensive unit tests following NUnit best practices.
            """;
    }

    static string GetGenericPrompt()
    {
        return """
            You are an expert test automation engineer. Generate comprehensive unit tests for the following .NET code.

            **Source Information:**
            - Source File: {SOURCE_FILE}
            - Class Name: {CLASS_NAME}
            - Method Name: {METHOD_NAME}
            - Description: {DESCRIPTION}

            **Test Requirements:**
            1. Test all public methods
            2. Test edge cases and error scenarios
            3. Use proper mocking
            4. Follow .NET testing best practices

            Generate comprehensive unit tests.
            """;
    }
}
