import ExpoModulesCore
import MLKitTextRecognition
import MLKitVision

public class MLKitModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('MLKitModule')` in JavaScript.
        Name("MLKitModule")

        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants([
            "PI": Double.pi,
        ])

        // Defines event names that the module can send to JavaScript.
        Events("onChange")

        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("hello") {
            "Hello world! 👋"
        }

        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("setValueAsync") { (value: String) in
            // Send an event to JavaScript.
            self.sendEvent("onChange", [
                "value": value,
            ])
        }

        AsyncFunction("process") { (imgSrc: String) in
            guard let url = URL(string: imgSrc) else {
                throw NSError(domain: "", code: 200, userInfo: nil)
            }

            let task = URLSession.shared.dataTask(with: url) { data, _, error in
                if let error = error {
                    print("Error: \(error)")
                } else if let data = data {
                    let image = UIImage(data: data)
                    // Use the image
                    self.recognizeFromImage(image: image!)
                }
            }

            task.resume()
        }
        // Enables the module to be used as a native view. Definition components that are accepted as part of the
        // view definition: Prop, Events.
        View(MLKitModuleView.self) {
            // Defines a setter for the `name` prop.
            Prop("name") { (_: MLKitModuleView, prop: String) in
                print(prop)
            }
        }
    }

    public func recognizeFromImage(image: UIImage) {
        let latinOptions = TextRecognizerOptions()
        let textRecognizer = TextRecognizer.textRecognizer(options: latinOptions)
        let visionImage = VisionImage(image: image)

        textRecognizer.process(visionImage) { result, error in
            guard error == nil, let result = result else {
                // Error handling
                return
            }

            // Recognized text
            for block in result.blocks {
                let blockText = block.text
                for line in block.lines {
                    let lineText = line.text
                    for element in line.elements {
                        let elementText = element.text
                        print(elementText)
                    }
                }
            }
        }
    }
}
