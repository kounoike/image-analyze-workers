This repository is the zoo of image processing webworkers for javascript. 
You can use these workers as npm package.

Note. some module is not provided as webworker for safari because of it's restriction.

<a href="https://www.buymeacoffee.com/wokad" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

# Webworkers
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Webworkers](#webworkers)
  - [bodypix](#bodypix)
    - [installation and usage](#installation-and-usage)
    - [demo](#demo)
  - [facemesh](#facemesh)
    - [installation and usage](#installation-and-usage-1)
    - [demo](#demo-1)
  - [asciiart](#asciiart)
    - [installation and usage](#installation-and-usage-2)
    - [demo](#demo-2)
  - [opencv](#opencv)
    - [installation and usage](#installation-and-usage-3)
    - [demo](#demo-3)
  - [PoseNet](#posenet)
    - [installation and usage](#installation-and-usage-4)
    - [demo](#demo-4)
  - [HandPose](#handpose)
    - [installation and usage](#installation-and-usage-5)
    - [demo](#demo-5)
  - [White-Box-Cartoon](#white-box-cartoon)
    - [installation and usage](#installation-and-usage-6)
    - [demo](#demo-6)
    - [License](#license)
    - [Citation](#citation)
  - [BiseNetv2 Celeb A Mask](#bisenetv2-celeb-a-mask)
    - [installation and usage](#installation-and-usage-7)
    - [demo](#demo-7)
    - [reference](#reference)
  - [U^2-Net Portrait Drawing](#u2-net-portrait-drawing)
    - [installation and usage](#installation-and-usage-8)
    - [demo](#demo-8)
  - [MODNet](#modnet)
    - [installation and usage](#installation-and-usage-9)
    - [demo](#demo-9)
    - [Licnece](#licnece)
  - [Google meet person segmentation](#google-meet-person-segmentation)
    - [installation and usage](#installation-and-usage-10)
    - [demo](#demo-10)
  - [Google meet person segmentation(TFLite)](#google-meet-person-segmentationtflite)
    - [installation and usage](#installation-and-usage-11)
    - [demo](#demo-11)
  - [Multi Barcode Scanner](#multi-barcode-scanner)
    - [installation and usage](#installation-and-usage-12)
    - [demo](#demo-12)
    - [demo(movie)](#demomovie)
    - [Licnece](#licnece-1)
- [TFLite Wasm](#tflite-wasm)
  - [Google meet person segmentation(TFLite wasm)](#google-meet-person-segmentationtflite-wasm)
    - [demo](#demo-13)
  - [White-Box-Cartoon(TFLite wasm)](#white-box-cartoontflite-wasm)
    - [demo](#demo-14)
    - [License](#license-1)
  - [ESPCN (TFLite wasm)](#espcn-tflite-wasm)
    - [demo](#demo-15)
- [Libs](#libs)
  - [FaceSwap](#faceswap)
    - [demo](#demo-16)
- [Experiments](#experiments)
  - [Exp.1 Multi-version based tfjs model](#exp1-multi-version-based-tfjs-model)
    - [demo](#demo-17)
    - [src](#src)
    - [Citation](#citation-1)
  - [Exp.2 Performance improvement](#exp2-performance-improvement)
    - [demo](#demo-18)
    - [src](#src-1)
    - [Citation](#citation-2)
- [Reference](#reference-1)

<!-- /code_chunk_output -->


## bodypix
![image](https://user-images.githubusercontent.com/48346627/95987700-be773780-0e62-11eb-9645-40b7c0adb826.png)


### installation and usage 
[See here](/001_bodypix-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t01_bodypix/index.html


## facemesh
![image](https://user-images.githubusercontent.com/48346627/98291984-534afc00-1fef-11eb-9e89-33b5f267b28c.png)

### installation and usage 
[See here](/002_facemesh-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t02_facemesh/index.html

## asciiart
![image](https://user-images.githubusercontent.com/48346627/95987874-fc745b80-0e62-11eb-95ac-43b3d998d50f.png)


### installation and usage 
[See here](/003_ascii-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t03_asciiart/index.html

## opencv
![image](https://user-images.githubusercontent.com/48346627/95988031-40676080-0e63-11eb-81a6-0262a24f685e.png)

### installation and usage 
[See here](/004_opencv-worker-js)


### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t04_opencv/index.html


## PoseNet
![image](https://user-images.githubusercontent.com/48346627/95988122-6260e300-0e63-11eb-9b1e-8712b47410dd.png)


### installation and usage 
[See here](/005_posenet-worker-js)


### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t05_posenet/index.html


## HandPose
![image](https://user-images.githubusercontent.com/48346627/95988209-88868300-0e63-11eb-809a-35a52b7f77fe.png)


### installation and usage 
[See here](/006_handpose-worker-js)


### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t06_handpose/index.html


## White-Box-Cartoon
![image](https://user-images.githubusercontent.com/48346627/96987969-aab48b00-155e-11eb-8b81-cd0e522ac974.png)

### installation and usage 
[See here](/007_white-box-cartoonization-worker-js)


### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t07_white-box-cartoonization/index.html

Note: very heavy process. It will take 40second or more to process one frame. be patient...

### License

White-box CartoonGAN

```
Copyright (C) Xinrui Wang All rights reserved. Licensed under the CC BY-NC-SA 4.0
license (https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
Commercial application is prohibited, please remain this license if you clone this repo
```

### Citation
- [Cartoonize your video on your browser](https://dannadori.medium.com/cartoonize-your-video-on-your-browser-1db8d1c18e4)
- [ブラウザ上で画像をアニメ化する。](https://note.com/wokwok/n/nef799e9a7d46)


## BiseNetv2 Celeb A Mask

![image](https://user-images.githubusercontent.com/48346627/97803282-822e3e80-1c8c-11eb-8635-74d937e5a8f6.png)

### installation and usage 
[See here](/008_bisenetv2-celebamask-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t08_bisenetv2-celebamask/index.html

### reference
[Enable arbitry resolution](https://github.com/w-okada/bisenetv2-tensorflow)

## U^2-Net Portrait Drawing

![image](https://user-images.githubusercontent.com/48346627/101999201-fba25d80-3d1d-11eb-8e63-445cb6abf204.png)

### installation and usage 
[See here](/009_u2net-portrait-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t09_u2net-portrait/index.html


## MODNet
![image](https://user-images.githubusercontent.com/48346627/113265897-9c3d7d00-930f-11eb-95ca-98529cccb7a6.png)

### installation and usage 
[See here](/010_modnet-worker-js)

### demo

Note: Very heavy processing to open.

https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t10_modnet/index.html

### Licnece
This project (code, pre-trained models, demos, etc.) is released under the Creative Commons Attribution NonCommercial ShareAlike 4.0 license.

NOTE: The license will be changed to allow commercial use after this work is accepted by a conference or a journal.


## Google meet person segmentation

![image](https://user-images.githubusercontent.com/48346627/104487132-0b101180-5610-11eb-8182-b1be3470c9c9.png)

### installation and usage 
[See here](/011_googlemeet-segmentation-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t11_googlemeet-segmentation/index.html


## Google meet person segmentation(TFLite)
![image](https://user-images.githubusercontent.com/48346627/110603124-03ad5480-81ca-11eb-993f-f7bf1f857b42.png)

### installation and usage 
[See here](/011a_googlemeet-segmentation-tflite-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t11a_googlemeet-segmentation-tflite/index.html



## Multi Barcode Scanner
![image](https://user-images.githubusercontent.com/48346627/118266526-b1ecb780-b4f5-11eb-9c25-d32a42e852ce.gif)


### installation and usage 
[See here](/012_barcode-scanner-worker-js)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/t12_barcode-scanner/index.html

### demo(movie)
- Pixel3
https://youtu.be/IrPLMUuWaJk

- Pixel4
https://youtu.be/Xxz1hFUAnKk




### Licnece
This project (code, pre-trained models, demos, etc.) is released under the Creative Commons Attribution NonCommercial ShareAlike 4.0 license.


# TFLite Wasm
## Google meet person segmentation(TFLite wasm)
[see here](https://github.com/w-okada/image-analyze-workers/tree/master/tfl001_google-meet-segmentation)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/tfl001_google-meet-segmentation/index.html

Added Selfie Segmentation[modelcard](https://developers.google.com/ml-kit/images/vision/selfie-segmentation/selfie-model-card.pdf)


##  White-Box-Cartoon(TFLite wasm)
[see here](https://github.com/w-okada/image-analyze-workers/tree/master/tfl002_white-box-cartoonization)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/tfl002_white-box-cartoonization/index.html

### License

White-box CartoonGAN

```
Copyright (C) Xinrui Wang All rights reserved. Licensed under the CC BY-NC-SA 4.0
license (https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
Commercial application is prohibited, please remain this license if you clone this repo
```

## ESPCN (TFLite wasm)
[see here](https://github.com/w-okada/image-analyze-workers/tree/master/tfl004_super_resolution)

### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/tfl004_super_resolution/index.html


# Libs
## FaceSwap
Faceswap by using facemesh worker
### demo
https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/lib001_faceswap/index.html

# Experiments
## Exp.1 Multi-version based tfjs model
With webworker, we can use models which based on the differenct tfjs models.

### demo

https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/exp01_multi-worker-performance/index.html

### src
[here](/exp01_multi-worker-performance)

### Citation
- [Faceswap and Virtual Background on your brower](https://medium.com/@dannadori/faceswap-and-virtual-background-on-your-brower-ada0e8042746)

- [ブラウザ上で顔入れ替えと背景入れ替えをするアプリを作った。](https://note.com/wokwok/n/n5626c8ca5295)


## Exp.2 Performance improvement
With webworker, we can improve performance when we use multiple models.

### demo

https://flect-lab-web.s3-us-west-2.amazonaws.com/P01_wokers/exp02_multi-worker-performance_sub/index.html



### src
[src](/exp02_multi-tfjs-worker-performance)

### Citation
- Same as Exp.1

# Reference

This repository was inspired by this site.

https://github.com/terryky/tfjs_webgl_app

Demo images are from pakutaso

http://www.pakutaso.com





