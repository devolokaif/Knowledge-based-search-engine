import Upload from "./components/Upload";
import Chat from "./components/Chat";

export default function App() {
  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-[#020617] border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
         <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
  Knowledge Based Search Engine
</h1>

<p className="text-xs text-gray-400 mt-1">
  AI-powered document assistant
</p>
        </div>

        <Upload />

        <div className="mt-auto p-4 text-xs text-gray-500">
          Built by Kaif ⚡
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <Chat />
      </div>
    </div>
  );
}