import './App.css'
import jackie from './assets/jackie.png';
import { cn } from './utils/cn.js';
import { BorderTrail } from './components/ui/BorderTrail.jsx';
import { Input } from '../src/components/ui/Input.jsx';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../src/components/ui/InputGroup.jsx";
import { Send, Paperclip } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from './components/ui/Sidebar.jsx';
import { AppSidebar } from './components/ui/AppSidebar.jsx';
import React, { useRef, useCallback } from 'react';

function App() {
  const textareaRef = useRef(null);

  const adjustTextareHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if(textarea) {
      textarea.style.height = 'auto';
      let newHeight = textarea.scrollHeight;
      const maxHeight = 200;
      if(newHeight > maxHeight){
        newHeight = maxHeight;
        textarea.style.overflowY = 'auto';
      }else{
        textarea.style.overflowY = 'hidden';
      }
      textarea.style.height = `${newHeight}px`;
    }
  }, [])

  const handleInput = useCallback((e) => {
    setTimeout(adjustTextareHeight, 0);
  }, [adjustTextareHeight]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main 
        className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
        <div className="absolute top-4 left-4 z-10">
          <SidebarTrigger />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
          <span className="text-black dark:text-white text-center md:text-3xl text-xl px-4 py-2 font-display">
            Bol na bhidu, teri kya madat karu?
          </span>
          <div className="relative overflow-hidden">
            <img
              src={jackie}
              alt="Jackie Shroff"
              className="md:w-96 w-52"
            />
          </div>
          <div className="w-full max-w-3xl mx-auto p-4">
            <form >
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <InputGroupButton size="icon-sm" type="button">
                    <Paperclip className="dark:text-white" />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupTextarea
                  ref={textareaRef}
                  onInput={handleInput}
                  placeholder="Message Hinglish AI..."
                  rows={1}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-sm"
                    type="submit"
                    variant="default"
                  >
                    <Send />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <p className="text-xs text-muted-foreground md:block hidden mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App

// export default function ChatbotInput() {
//   const [message, setMessage] = useState("");
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       console.log("Sending message:", message);
//       // Add your send logic here
//       setMessage("");
//     }
//   };
//
//   const handleKeyDown = (e) => {
//     // Submit on Enter, new line on Shift+Enter
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };
//
//   return (
//     <div className="w-full max-w-3xl mx-auto p-4">
//       <form onSubmit={handleSubmit}>
//         <InputGroup>
//           {/* Optional: Attach files button on the left */}
//           <InputGroupAddon align="inline-start">
//             <InputGroupButton size="icon-sm" type="button">
//               <Paperclip />
//             </InputGroupButton>
//           </InputGroupAddon>
//
//           {/* Main textarea input */}
//           <InputGroupTextarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Message AI..."
//             rows={1}
//             className="min-h-[40px] max-h-[200px] resize-none"
//           />
//
//           {/* Send button on the right */}
//           <InputGroupAddon align="inline-end">
//             <InputGroupButton
//               size="icon-sm"
//               type="submit"
//               disabled={!message.trim()}
//               variant="default"
//             >
//               <Send />
//             </InputGroupButton>
//           </InputGroupAddon>
//         </InputGroup>
//       </form>
//
//       {/* Helper text */}
//       <p className="text-xs text-muted-foreground mt-2 text-center">
//         Press Enter to send, Shift+Enter for new line
//       </p>
//     </div>
//   );
// }
