import './App.css'
import jackie from './assets/jackie.png';
import { cn } from './utils/cn.js';
// import { BorderTrail } from './components/ui/BorderTrail.jsx'; // Optional if not used
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../src/components/ui/InputGroup.jsx";
import { Send, Paperclip } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from './components/ui/Sidebar.jsx';
import { AppSidebar } from './components/ui/AppSidebar.jsx';
import { AiCall } from './utils/fetchCalls.js';
import React, { useRef, useState, useEffect } from 'react';

function App() {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const scrollAreaRef = useRef(null); // Ref for the scrollable container

  // Auto-scroll to bottom when responses change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [responses]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      let newHeight = textarea.scrollHeight;
      const maxHeight = 200;
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
      textarea.style.height = `${newHeight}px`;
    }
  }

  const handleInput = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message immediately for better UX
      const currentMessage = message;
      setResponses(prev => [...prev, { question: currentMessage, answer: "Ruk ja bhidu... sochne de..." }]);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.value = '';
        textareaRef.current.style.height = 'auto'; // Reset height
      }

      // Fetch AI response
      const reply = await AiCall(currentMessage);
      
      // Update the last message with the real answer
      setResponses(prev => {
        const newArr = [...prev];
        newArr[newArr.length - 1].answer = reply.response;
        return newArr;
      });
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col h-screen w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 relative">
        
        {/* Header / Sidebar Trigger */}
        <div className="absolute top-4 left-4 z-20">
          <SidebarTrigger />
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div 
          ref={scrollAreaRef} 
          className="flex-1 overflow-y-auto w-full p-4 pt-16 scroll-smooth"
        >
          {responses.length === 0 ? (
            /* Empty State / Hero */
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <span className="text-2xl md:text-4xl font-bold text-center px-4 font-display text-neutral-800 dark:text-neutral-200">
                Bol na bhidu, teri kya madat karu?
              </span>
              <div className="relative overflow-hidden rounded-full border-4 border-yellow-500/20">
                <img
                  src={jackie}
                  alt="Jackie Shroff"
                  className="w-40 h-40 md:w-60 md:h-60 object-cover"
                />
              </div>
            </div>
          ) : (
            /* Chat History */
            <div className="w-full max-w-3xl mx-auto space-y-6 pb-4">
              {responses.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                      <div className="text-sm">{item.question}</div>
                    </div>
                  </div>

                  {/* AI Message */}
                  <div className="flex justify-start items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img src={jackie} alt="AI" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
                      <div className="font-bold text-xs mb-1 text-yellow-600 dark:text-yellow-500 uppercase tracking-wider">Jackie</div>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{item.answer}</div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- STICKY FOOTER INPUT AREA --- */}
        <div className="w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <InputGroup className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-sm">
                <InputGroupAddon align="inline-start">
                  <InputGroupButton size="icon-sm" type="button">
                    <Paperclip className="h-4 w-4 text-neutral-500" />
                  </InputGroupButton>
                </InputGroupAddon>
                
                <InputGroupTextarea
                  ref={textareaRef}
                  onInput={handleInput}
                  onKeyPress={handleEnter}
                  placeholder="Message Hinglish AI..."
                  rows={1}
                  className="max-h-[200px] text-neutral-900 dark:text-white placeholder:text-neutral-400"
                />
                
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-sm"
                    type="submit"
                    variant="default"
                    className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
                  >
                    <Send className="h-4 w-4" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <p className="text-[10px] text-neutral-400 mt-2 text-center">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>

      </main>
    </SidebarProvider>
  );
}

export default App;

// import './App.css'
// import jackie from './assets/jackie.png';
// import { cn } from './utils/cn.js';
// import { BorderTrail } from './components/ui/BorderTrail.jsx';
// import { Input } from '../src/components/ui/Input.jsx';
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton,
//   InputGroupTextarea,
// } from "../src/components/ui/InputGroup.jsx";
// import { Send, Paperclip } from "lucide-react";
// import { SidebarProvider, SidebarTrigger } from './components/ui/Sidebar.jsx';
// import { AppSidebar } from './components/ui/AppSidebar.jsx';
// import { AiCall } from './utils/fetchCalls.js';
// import React, { useRef, useCallback, useState, useEffect } from 'react';
//
// function App() {
//   const textareaRef = useRef(null);
//   const [ message , setMessage ] = useState('');
//   const [ responses , setResponses ] = useState([]);
//   const messageRef = useRef(null);
//   const scrollAreaRef = useRef(null);
//
//   useEffect(() => {
//     if(scrollAreaRef.current){
//      scrollAreaRef.current.scrollTo({
//        top: scrollAreaRef.current.scrollHeight,
//        behavior: 'smooth'
//      })
//     }
//   }, [responses]);
//
//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     if(textarea) {
//       textarea.style.height = 'auto';
//       let newHeight = textarea.scrollHeight;
//       const maxHeight = 200;
//       if(newHeight > maxHeight){
//         newHeight = maxHeight;
//         textarea.style.overflowY = 'auto';
//       }else{
//         textarea.style.overflowY = 'hidden';
//       }
//       textarea.style.height = `${newHeight}px`;
//     }
//   }
//
//   const handleInput = (e) => {
//       setMessage(e.target.value);
//       adjustTextareaHeight();
//   }
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(message.trim()){
//       const currentMessage = message;
//       setResponses(prev => [...prev, { question: currentMessage, answer: "Ruk ja bhidu... sochne de..." }]);
//       setMessage('');
//       if(textareaRef.current) {
//         textareaRef.current.value = '';
//         textareaRef.current.style.height = 'auto';
//       }
//       console.log(`Fetch call to the backend for message = ${message}`);
//       const reply = await AiCall(currentMessage);
//       console.log(`This is the received message : ${JSON.stringify(reply)}`);
//
//       if(reply.response) setResponses(prevResponses => [
//         const newArr = [...prev];
//         newArr[newArr.length - 1].answer = reply.response;
//         return newArr;
//       ]);
//       adjustTextareaHeight();
//     }
//   }
//
//   const handleEnter = (e) => {
//     if(e.key === 'Enter' && !e.shiftKey){
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   }
//
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main 
//         className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950 ">
//         <div className="absolute top-4 left-4 z-10">
//           <SidebarTrigger />
//         </div>
//
//         { responses.length > 0 
//           ? 
//         ( <div>
//             {responses.map((item, index) => (
//               <div key={index} className="mb-2"> 
//                     {/* User Question */}
//                     <div className="flex justify-end mb-2">
//                       <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg max-w-[80%]">
//                         <strong className="text-blue-700 dark:text-blue-300">You:</strong>
//                         <div className="mt-1">{item.question}</div>
//                       </div>
//                     </div>
//
//                     {/* AI Answer */}
//                     <div className="flex justify-start mb-2">
//                       <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
//                         <strong className="text-gray-700 dark:text-gray-300">Jackie:</strong>
//                         <div className="mt-1">{item.answer}</div>
//                       </div>
//                     </div>
//               </div>
//             ))}
//               <div ref={messageRef}/>
//               <div className="w-full max-w-3xl mx-auto p-4">
//                 <form onSubmit={handleSubmit}>
//                   <InputGroup>
//                     <InputGroupAddon align="inline-start">
//                       <InputGroupButton size="icon-sm" type="button">
//                         <Paperclip className="dark:text-white" />
//                       </InputGroupButton>
//                     </InputGroupAddon>
//                     <InputGroupTextarea
//                       ref={textareaRef}
//                       onInput={handleInput}
//                       onKeyPress={handleEnter}
//                       placeholder="Message Hinglish AI..."
//                       rows={1}
//                     />
//                     <InputGroupAddon align="inline-end">
//                       <InputGroupButton
//                         size="icon-sm"
//                         type="submit"
//                         variant="default"
//                       >
//                         <Send />
//                       </InputGroupButton>
//                     </InputGroupAddon>
//                   </InputGroup>
//                 </form>
//                 <p className="text-xs text-muted-foreground md:block hidden mt-2 text-center">
//                   Press Enter to send, Shift+Enter for new line
//                 </p>
//               </div>
//             </div> )
//           : 
//         ( <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
//           <span className="text-black dark:text-white text-center md:text-3xl text-xl px-4 py-2 font-display">
//             Bol na bhidu, teri kya madat karu?
//           </span>
//           <div className="relative overflow-hidden">
//             <img
//               src={jackie}
//               alt="Jackie Shroff"
//               className="md:w-96 w-52"
//             />
//           </div>
//           <div className="w-full max-w-3xl mx-auto p-4">
//             <form onSubmit={handleSubmit}>
//               <InputGroup>
//                 <InputGroupAddon align="inline-start">
//                   <InputGroupButton size="icon-sm" type="button">
//                     <Paperclip className="dark:text-white" />
//                   </InputGroupButton>
//                 </InputGroupAddon>
//                 <InputGroupTextarea
//                   ref={textareaRef}
//                   onInput={handleInput}
//                   onKeyPress={handleEnter}
//                   placeholder="Message Hinglish AI..."
//                   rows={1}
//                 />
//                 <InputGroupAddon align="inline-end">
//                   <InputGroupButton
//                     size="icon-sm"
//                     type="submit"
//                     variant="default"
//                   >
//                     <Send />
//                   </InputGroupButton>
//                 </InputGroupAddon>
//               </InputGroup>
//             </form>
//             <p className="text-xs text-muted-foreground md:block hidden mt-2 text-center">
//               Press Enter to send, Shift+Enter for new line
//             </p>
//           </div>
//         </div> )
//         }
//       </main>
//     </SidebarProvider>
//   );
// }
//
// export default App
