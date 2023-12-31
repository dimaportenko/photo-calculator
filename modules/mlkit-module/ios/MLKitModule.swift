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

        AsyncFunction("process") { (imgSrc: String, promise: Promise) in
            guard let url = URL(string: imgSrc) else {
                throw NSError(domain: "", code: 200, userInfo: nil)
            }

            let task = URLSession.shared.dataTask(with: url) { [weak self] data, _, error in
                if let error = error {
                    promise.reject(error)
                } else if let data = data, let image = UIImage(data: data) {
                    self?.recognizeFromImage(image: image, completion: { result, error in
                        if let error = error {
                            promise.reject(error)
                        } else if let result = result {
                            promise.resolve(result)
                        }
                    })
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

    public func recognizeFromImage(image: UIImage, completion: @escaping ([String: Any]?, Error?) -> Void) {
        let latinOptions = TextRecognizerOptions()
        let textRecognizer = TextRecognizer.textRecognizer(options: latinOptions)
        let visionImage = VisionImage(image: image)

        textRecognizer.process(visionImage) { result, error in
            if let error = error {
                completion(nil, error)
            } else if let result = result {
                let imageWidth = image.size.width
                let imageHeight = image.size.height
                var blocksData = [Any]()

                for block in result.blocks {
                    let frame = block.frame
                    let blockData: [String: Any] = [
                        "text": block.text,
                        "x": frame.origin.x / imageWidth,
                        "y": frame.origin.y / imageHeight,
                        "width": frame.width / imageWidth,
                        "height": frame.height / imageHeight,
                    ]
                    blocksData.append(blockData)
                }

                let resultData: [String: Any] = [
                    "width": imageWidth,
                    "height": imageHeight,
                    "blocks": blocksData,
                ]

                completion(resultData, nil)
            }
        }
    }
}
