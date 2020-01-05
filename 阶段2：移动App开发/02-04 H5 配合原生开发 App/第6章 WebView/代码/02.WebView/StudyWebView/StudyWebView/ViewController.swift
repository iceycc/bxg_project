//
//  ViewController.swift
//  StudyWebView
//
//  Created by itheima on 2019/4/12.
//  Copyright © 2019 heima. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController,WKNavigationDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        // 创建WebView
        var webView = WKWebView(frame: self.view.bounds)
        // 设置自己为WebView的代理
        webView.navigationDelegate = self
        // 添加到页面上
        self.view.addSubview(webView)
        
        // 创建URL对象
        var url = URL(string: "https://www.baidu.com/")
        // 创建URLRequest对象
        var request = URLRequest(url: url!)
        // 加载URL
        webView.load(request)
    }


}

