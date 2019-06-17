//
//  AppDelegate.swift
//  tray
//
//  Created by xiangwenwen on 2018/6/11.
//  Copyright © 2018 xiangwenwen. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    var statusItem:NSStatusItem?
    var window:NSWindow?
    var mainWindowController:NSWindowController?
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        // Insert code here to initialize your application
        self.addStatusItem()
        self.addStatusItemMenu()
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }

    func addStatusItem(){
        let statusBar = NSStatusBar.system
        let statusItem = statusBar.statusItem(withLength:NSStatusItem.squareLength)
        self.statusItem = statusItem
        statusItem.highlightMode = true
        statusItem.image = NSImage(named: NSImage.Name("statusIcon"))
        statusItem.toolTip = "Tray"
    }
    
    func addStatusItemMenu(){
        let subMenu = NSMenu.init(title: "Load_TEXT")
        subMenu.addItem(withTitle: "Save", action: nil, keyEquivalent: "S")
        subMenu.addItem(NSMenuItem.separator())
        subMenu.addItem(withTitle: "Quit", action: #selector(AppDelegate.quit), keyEquivalent: "Q")
        self.statusItem?.menu = subMenu
    }
    
    @objc public func quit(){
        print("quit")
    }
}

