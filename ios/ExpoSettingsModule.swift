import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")

    // Define the events your module can emit
    Events("onChangeTheme")

    // Function to set the theme
    Function("setTheme") { (theme: Theme) -> Void in
      UserDefaults.standard.set(theme.rawValue, forKey: "theme")
      sendEvent("onChangeTheme", [
        "theme": theme.rawValue
      ])
    }

    // Function to get the current theme
    Function("getTheme") { () -> String in
      return UserDefaults.standard.string(forKey: "theme") ?? Theme.system.rawValue
    }

    // New function to generate a random number between min and max
    Function("generateRandomNumber") { (min: Int, max: Int) -> Int in
      // Ensure min is less than max
      guard min < max else {
        return min // Or handle the error as appropriate
      }
      return Int.random(in: min...max)
    }
  }

  // Enum to define possible themes
  enum Theme: String, Enumerable {
    case light
    case dark
    case system
  }
}
