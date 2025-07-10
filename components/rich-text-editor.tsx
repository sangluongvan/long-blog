"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState<Record<string, boolean>>({})

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    updateActiveStates()
  }

  const updateActiveStates = () => {
    const commands = ["bold", "italic", "underline"]
    const newStates: Record<string, boolean> = {}

    commands.forEach((command) => {
      newStates[command] = document.queryCommandState(command)
    })

    setIsActive(newStates)
  }

  const insertImage = () => {
    const url = prompt("Nhập URL ảnh:")
    if (url) {
      formatText("insertImage", url)
    }
  }

  const insertLink = () => {
    const url = prompt("Nhập URL liên kết:")
    if (url) {
      formatText("createLink", url)
    }
  }

  const toolbarGroups = [
    {
      name: "Heading",
      buttons: [
        { icon: Heading1, command: "formatBlock", value: "h1", tooltip: "Heading 1" },
        { icon: Heading2, command: "formatBlock", value: "h2", tooltip: "Heading 2" },
        { icon: Heading3, command: "formatBlock", value: "h3", tooltip: "Heading 3" },
      ],
    },
    {
      name: "Format",
      buttons: [
        { icon: Bold, command: "bold", tooltip: "Bold (Ctrl+B)" },
        { icon: Italic, command: "italic", tooltip: "Italic (Ctrl+I)" },
        { icon: Underline, command: "underline", tooltip: "Underline (Ctrl+U)" },
      ],
    },
    {
      name: "Lists",
      buttons: [
        { icon: List, command: "insertUnorderedList", tooltip: "Bullet List" },
        { icon: ListOrdered, command: "insertOrderedList", tooltip: "Numbered List" },
      ],
    },
    {
      name: "Align",
      buttons: [
        { icon: AlignLeft, command: "justifyLeft", tooltip: "Align Left" },
        { icon: AlignCenter, command: "justifyCenter", tooltip: "Align Center" },
        { icon: AlignRight, command: "justifyRight", tooltip: "Align Right" },
      ],
    },
    {
      name: "Insert",
      buttons: [
        { icon: Link, command: "custom", action: insertLink, tooltip: "Insert Link" },
        { icon: ImageIcon, command: "custom", action: insertImage, tooltip: "Insert Image" },
        { icon: Quote, command: "formatBlock", value: "blockquote", tooltip: "Quote" },
        { icon: Code, command: "formatBlock", value: "pre", tooltip: "Code Block" },
      ],
    },
    {
      name: "History",
      buttons: [
        { icon: Undo, command: "undo", tooltip: "Undo (Ctrl+Z)" },
        { icon: Redo, command: "redo", tooltip: "Redo (Ctrl+Y)" },
      ],
    },
  ]

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Enhanced Toolbar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {toolbarGroups.map((group, groupIndex) => (
            <div key={group.name} className="flex items-center">
              {group.buttons.map((button, buttonIndex) => (
                <Button
                  key={buttonIndex}
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (button.action) {
                      button.action()
                    } else {
                      formatText(button.command, button.value)
                    }
                  }}
                  className={`h-9 w-9 p-0 hover:bg-white hover:shadow-sm transition-all duration-200 ${
                    isActive[button.command] ? "bg-orange-100 text-orange-600 shadow-sm" : ""
                  }`}
                  title={button.tooltip}
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
              {groupIndex < toolbarGroups.length - 1 && <div className="w-px h-6 bg-gray-300 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[400px] p-6 focus:outline-none prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={(e) => {
            const target = e.target as HTMLDivElement
            onChange(target.innerHTML)
            updateActiveStates()
          }}
          onBlur={(e) => {
            const target = e.target as HTMLDivElement
            onChange(target.innerHTML)
          }}
          onFocus={updateActiveStates}
          onKeyUp={updateActiveStates}
          onMouseUp={updateActiveStates}
          style={{
            minHeight: "400px",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
          data-placeholder={placeholder}
        />

        {/* Placeholder */}
        {!value && <div className="absolute top-6 left-6 text-gray-400 pointer-events-none text-lg">{placeholder}</div>}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-2 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>
            Từ:{" "}
            {
              value
                .replace(/<[^>]*>/g, "")
                .split(" ")
                .filter((word) => word.length > 0).length
            }
          </span>
          <span>Ký tự: {value.replace(/<[^>]*>/g, "").length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Đã lưu</span>
        </div>
      </div>
    </div>
  )
}
