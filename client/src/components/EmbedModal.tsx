import {
  Dialog,
  DialogContent,

  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function EmbedModal() {
  const [copied, setCopied] = useState(false);
  
  // Use current origin, or fallback to a placeholder if server-side (though this is client-only)
  const origin = typeof window !== "undefined" ? window.location.origin : "https://your-app-url.com";
  
  const iframeCode = `<iframe 
  src="${origin}" 
  style="width: 100%; height: 800px; border: none; border-radius: 12px;" 
  title="GHL Specialization Quiz"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 backdrop-blur-sm">
          <Code className="w-4 h-4" />
          Embed
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel border-white/10 text-foreground max-w-lg">
        <DialogHeader>
          <DialogTitle>Embed on your GHL Site</DialogTitle>
          <DialogDescription>
            Copy this code and paste it into a "Custom HTML" element in your GoHighLevel funnel builder.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="embed-code">Iframe Code</Label>
            <div className="relative">
              <Textarea 
                id="embed-code" 
                readOnly 
                value={iframeCode} 
                className="font-mono text-xs bg-black/40 border-white/10 pr-12 h-24 resize-none"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 hover:bg-white/10"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground bg-primary/10 p-3 rounded-lg border border-primary/20">
            <strong>Tip:</strong> You may need to adjust the <code>height: 800px</code> value in the code to fit your page layout perfectly.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
