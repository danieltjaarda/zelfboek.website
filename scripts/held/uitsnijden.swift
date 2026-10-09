import Foundation
import Vision
import CoreImage

// Gebruik: uitsnijden <bron.jpg> <voorgrond.png> <masker.png>
// Haalt het onderwerp (persoon + wat Vision als voorgrond ziet) uit de foto en bewaart het met transparante achtergrond.
let args = CommandLine.arguments
let bron = URL(fileURLWithPath: args[1])
guard let beeld = CIImage(contentsOf: bron) else { fputs("kan beeld niet laden\n", stderr); exit(1) }
let verzoek = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: beeld, options: [:])
try handler.perform([verzoek])
guard let res = verzoek.results?.first else { fputs("geen voorgrond gevonden\n", stderr); exit(2) }
print("instanties:", res.allInstances.count)
let uitgesneden = try res.generateMaskedImage(ofInstances: res.allInstances, from: handler, croppedToInstancesExtent: false)
let masker = try res.generateScaledMaskForImage(forInstances: res.allInstances, from: handler)
let ctx = CIContext()
let srgb = CGColorSpace(name: CGColorSpace.sRGB)!
let uit = CIImage(cvPixelBuffer: uitgesneden)
try ctx.pngRepresentation(of: uit, format: .RGBA8, colorSpace: srgb)!.write(to: URL(fileURLWithPath: args[2]))
let m = CIImage(cvPixelBuffer: masker)
try ctx.pngRepresentation(of: m, format: .RGBA8, colorSpace: srgb)!.write(to: URL(fileURLWithPath: args[3]))
print("klaar", Int(uit.extent.width), "x", Int(uit.extent.height))
