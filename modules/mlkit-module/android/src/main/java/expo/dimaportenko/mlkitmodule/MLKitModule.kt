package expo.dimaportenko.mlkitmodule

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.ByteArrayOutputStream
import java.net.HttpURLConnection
import java.net.URL

class MLKitModule : Module() {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('MLKitModule')` in JavaScript.
        Name("MLKitModule")

        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants(
            "PI" to Math.PI
        )

        // Defines event names that the module can send to JavaScript.
        Events("onChange")

        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("hello") {
            "Hello world! 👋"
        }

        // Defines a JavaScript function that always returns a Promise and whose native code
        // is by default dispatched on the different thread than the JavaScript runtime runs on.
        AsyncFunction("process") { imgSrc: String, promise: Promise ->
            // Send an event to JavaScript.
            try {
                val url = URL(imgSrc)
                val connection = url.openConnection() as HttpURLConnection
                connection.doInput = true
                connection.connect()

                val input = connection.inputStream
                val bitmap = BitmapFactory.decodeStream(input)
                val imageWidth = bitmap.width.toFloat()
                val imageHeight = bitmap.height.toFloat()
//                val stream = ByteArrayOutputStream()
//                bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream)
//                val byteArray = stream.toByteArray()
                InputImage.fromBitmap(bitmap, 0).also {
//                    promise.resolve(it)

                    // When using Latin script library
                    val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
                    val result = recognizer.process(it)
                        .addOnSuccessListener { visionText ->
                            // Task completed successfully
                            val blocksData = mutableListOf<Map<String, Any>>()

                            for (block in visionText.textBlocks) {
                                val frame = block.boundingBox
                                val blockData = mapOf(
                                    "text" to block.text,
                                    "x" to (frame?.left ?: 0) / imageWidth,
                                    "y" to (frame?.top ?: 0) / imageHeight,
                                    "width" to (frame?.width() ?: 0) / imageWidth,
                                    "height" to (frame?.height() ?: 0) / imageHeight
                                )
                                blocksData.add(blockData)
                            }

                            val resultData = mapOf(
                                "width" to imageWidth,
                                "height" to imageHeight,
                                "blocks" to blocksData
                            )

                            promise.resolve(resultData)   // ...
                        }
                        .addOnFailureListener { e ->
                            // Task failed with an exception
                            // ...
                            promise.reject(CodedException("ERR_IMAGE_PROCESSING", e))
                        }
                }

                // Use the byte array
            } catch (e: Exception) {
                promise.reject(CodedException("ERR_IMAGE_PROCESSING", e))
            }
        }

        // Enables the module to be used as a native view. Definition components that are accepted as part of
        // the view definition: Prop, Events.
        View(MLKitModuleView::class) {
            // Defines a setter for the `name` prop.
            Prop("name") { view: MLKitModuleView, prop: String ->
                println(prop)
            }
        }
    }
}
