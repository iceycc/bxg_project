### 一、 Flutter介绍与配置

##### 1. Flutter介绍

Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。
Flutter的目标是使同一套代码同时运行在iOS和Android系统上，并且拥有媲美原生应用的性能，Flutter甚至提供了两套控件来适配Android和iOS（滚动效果、字体和控件图标等等），为了让App在细节处看起来更像原生应用。

##### 2. 下载

* https://flutter.io/docs/get-started/install

##### 3. 更新环境变量

mac

```
export PATH=`pwd`/flutter/bin:$PATH
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

windows 

* 转到 “控制面板>用户帐户>用户帐户>更改我的环境变量”
* 在“用户变量”下检查是否有名为“Path”的条目:
	* 如果该条目存在, 追加 flutter\bin的全路径，使用 ; 作为分隔符.
	* 如果条目不存在, 创建一个新用户变量 Path ，然后将 flutter\bin的全路径作为它的值.
* 在“用户变量”下检查是否有名为”PUB_HOSTED_URL”和”FLUTTER_STORAGE_BASE_URL”的条目，如果没有，也添加它们。
* 重启Windows以应用此更改

##### 4. 运行 flutter doctor

##### 5. 编辑器

* VScode
	
	* 启动 VS Code
	* 调用 View>Command Palette…
	* 输入 ‘install’, 然后选择 Extensions: Install Extension action
	* 在搜索框输入 flutter , 在搜索结果列表中选择 ‘Flutter’, 然后点击 Install
	* 选择 ‘OK’ 重新启动 VS Code

* Android Studio

	* 启动Android Studio.
	* 打开插件首选项 (Preferences>Plugins on macOS, File>Settings>Plugins on Windows & Linux).
	* 选择 Browse repositories…, 选择 Flutter 插件并点击 install.
	* 重启Android Studio后插件生效.

##### 6. 模拟器

* IOS 模拟器设置
	* 安装 Xcode
	* Xcode-open Developer tool- Simulator
* Android 模拟器设置
	* 在机器上启用 VM acceleration .
	* 启动 Android Studio>Tools>Android>AVD Manager 并选择 Create Virtual Device.
	* 选择一个设备并选择 Next。
	* 为要模拟的Android版本选择一个或多个系统映像，然后选择 Next. 建议使用 x86 或 x86_64 image .
	* 在 Emulated Performance下, 选择 Hardware - GLES 2.0 以启用 硬件加速.
	* 验证AVD配置是否正确，然后选择 Finish。

