import './App.css'
import jackie from './assets/jackie.png';
import { BorderTrail } from './components/ui/BorderTrail.jsx';
import { Input } from '../src/components/ui/Input.jsx';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../src/components/ui/InputGroup.jsx";
import { Send, Paperclip } from "lucide-react";

function App() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
      {/* Theme Toggle Button */}
      
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <span className="text-black dark:text-white text-center md:text-3xl text-xl px-4 py-2 font-display">
          Bol na bhidu, teri kya madat karu?
        </span>
        <div className="relative overflow-hidden"> {/* Add rounded-full for circular effect */}
          <img 
            src={jackie} 
            alt="Jackie Shroff" 
            className="md:w-96 w-52"
          />
        </div>
        <div className="w-full max-w-3xl mx-auto p-4">
          <form >
            <InputGroup>
              {/* Optional: Attach files button on the left */}
              <InputGroupAddon align="inline-start">
                <InputGroupButton size="icon-sm" type="button">
                  <Paperclip className="dark:text-white" />
                </InputGroupButton>
              </InputGroupAddon>
    
              {/* Main textarea input */}
              <InputGroupTextarea
                placeholder="Message Jackie AI..."
                rows={1}
              />
    
              {/* Send button on the right */}
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
    
          {/* Helper text */}
          <p className="text-xs text-muted-foreground md:block hidden mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
        {/*Conditionally render this Border Trail only when the screen is loading*/}
        {/* <BorderTrail  */}
        {/*   size={70} // Adjust size based on your image */}
        {/*   className="bg-white" // Change color if you want */}
        {/* /> */}
    </div>
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
