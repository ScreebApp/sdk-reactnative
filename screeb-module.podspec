require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "screeb-module"
  s.version      = package["0.1.0"]
  s.summary      = package["A react-native module to integrate Screeb mobile sdk for Android and/or iOS."]
  s.homepage     = package["https://github.com/ScreebApp/sdk-reactnative#readme"]
  s.license      = package["MIT"]
  s.authors      = package["clement@screeb.app"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/ScreebApp/sdk-reactnative.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency "Screeb", '~> 1.1.0'
end
