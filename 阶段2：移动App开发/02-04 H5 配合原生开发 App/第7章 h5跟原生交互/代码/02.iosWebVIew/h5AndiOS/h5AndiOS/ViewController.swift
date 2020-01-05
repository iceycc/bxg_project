//
//  ViewController.swift
//  h5AndiOS
//
//  Created by itheima on 2019/4/13.
//  Copyright © 2019 heima. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController,WKNavigationDelegate,WKScriptMessageHandler {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        // webview相关代码
        let webView = WKWebView(frame: self.view.bounds);
        // 设置代理
        webView.navigationDelegate = self;
        // 添加到页面上
        self.view.addSubview(webView);
        
        // 设置url
        let url = URL(string:"http://127.0.0.1:5500/index.html");
        // 创建requrest对象
        let request = URLRequest(url:url!);
        // 加载url
        webView.load(request);
        
        // 为webView添加方法名检测
        webView.configuration.userContentController.add(self as WKScriptMessageHandler,name:"useNative")
    }
    
    // 监听h5端
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("传来的数据为:",message.body)
    }
    
    // webView加载触发
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // 调用JS代码
        webView.evaluateJavaScript("changeBackgroundColor()");
    }
    // 实现代理方法
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        // 获取url
        let url = navigationAction.request.url?.absoluteString;
        print(url)
        if(url=="heima://click"){
            print("调用对应方法");
            decisionHandler(.cancel);
        }else{
            decisionHandler(.allow);
        }
    }


}

