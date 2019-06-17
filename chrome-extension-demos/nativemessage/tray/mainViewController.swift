//
//  mainViewController.swift
//  tray
//
//  Created by xiangwenwen on 2018/6/11.
//  Copyright © 2018 xiangwenwen. All rights reserved.
//

import Cocoa

class mainViewController: NSViewController {
    @IBOutlet weak var showMesg: NSTextField!
    @IBOutlet weak var inputMsg: NSTextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do view setup here.
        let mainQueue = DispatchQueue.global()
        mainQueue.async {
            self.recvMessage()
        }
    }
    
    @IBAction func sendMsg(_ sender: NSButton) {
        self.sendMessage(msg: self.inputMsg.stringValue)
    }
    
    func sendMessage(msg: String){
        let data = "{\"echo\":\"\(msg)\"}"
        let len = data.characters.count
        print(Character(UnicodeScalar((UInt8)((len >> 0) & 0xff))), terminator:"")
        print(Character(UnicodeScalar((UInt8)((len >> 8) & 0xff))), terminator:"")
        print(Character(UnicodeScalar((UInt8)((len >> 16) & 0xff))), terminator:"")
        print(Character(UnicodeScalar((UInt8)((len >> 24) & 0xff))), terminator:"")
        print(data, terminator:"")
        fflush(__stdoutp)
    }
    
    func recvMessage(){
        while true {
            let message_stdin = FileHandle.standardInput
            let message = String(data: message_stdin.availableData , encoding: .utf8)!
            let start = message.index(message.startIndex, offsetBy: 4)
            let text = message.substring(from: start)
            DispatchQueue.main.async {
                self.showMesg.stringValue = text
            }
        }
    }
}
